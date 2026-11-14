import type { DB } from '../data/db';
import type { Bi, ClinicalCase, ContentEntry, LandmarkRec, PackId, StructureRec } from '../data/types';
import { layerOf, type LayerId, type RegionId } from '../engine/layers';
import { getCard } from './srs';

export type QType =
  | 'name' | 'landmark' | 'find' | 'origin' | 'insertion' | 'nerve' | 'action' | 'joint' | 'boneType' | 'roots'
  | 'lmBone' | 'articulates' | 'ligament' | 'axes' | 'from' | 'drains' | 'continues' | 'lobe' | 'case';

export interface Question {
  id: string; // SRS card id
  type: QType;
  key: string;
  ids: string[]; // meshes that make up the target (one side)
  side: 'l' | 'r' | null;
  landmark?: LandmarkRec;
  answers: string[];
  display: string;
  layers: LayerId[];
  packs: PackId[];
  ghost: boolean;
  region?: RegionId;
  deck: string;
  /** Questions of one group make the closest wrong options in multiple choice (a compartment, a bone, a vessel tree). */
  group?: string;
  /** Kind of structure in the written content (artery, nerve ...), for prompts that depend on it. */
  kind?: string;
  /** "Name one of these" questions: the names that count, without their spelling variants. */
  oneOf?: string[];
  /** Name shown on the placard when the plain Latin name is not enough (a lung segment needs its side). */
  label?: string;
  /** Clinical case: the vignette this question shows. */
  case?: ClinicalCase;
  /** Meshes shown once the question is answered (clinical cases). */
  reveal?: string[];
  /** How many of the first `reveal` meshes belong to the structure the case is about. */
  lead?: number;
}

export interface DeckDef {
  id: string;
  code: string; // FK Unsri practical code
  en: string;
  idn: string;
  blurb: { en: string; id: string };
  types: QType[];
  /** Model packs loaded before the first station. A station loads anything else it needs itself. */
  packs: PackId[];
  region?: RegionId;
  build: (db: DB, english: boolean) => Question[];
}

const UPPER_BONE = /(clavicle|scapula|humerus|radius|ulna|metacarpal-bone|of-hand|scaphoid-bone|lunate-bone|triquetrum-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone)-[lr]$/;
const LOWER_BONE = /(hip-bone|femur|patella|tibia|fibula|talus|calcaneus|navicular-bone|cuboid-bone|cuneiform-bone|metatarsal-bone|of-foot)-[lr]$/;
const THORAX_BONE = /(rib-[lr]|costal-cartilage-of-.*|manubrium-of-sternum|body-of-sternum|xiphoid-process|vertebra-t\d+)$/;
const SKIP_BONE = /tooth|incisor|canine|premolar|molar|alar|septal|cells-of-ethmoid|sinus-of|sesamoid/;
const UPPER_AXIAL_MUSCLES = /^(pectoralis|subclavius|serratus-anterior|trapezius|latissimus|levator-scapulae|rhomboid|clavicular-head-of-pectoralis|sternocostal-head|abdominal-part-of-pectoralis|ascending-part-of-trapezius|descending-part-of-trapezius|transverse-part-of-trapezius)/;

const sideRank = (s: 'l' | 'r' | null) => (s === 'r' ? 0 : s === null ? 1 : 2);

/** One mesh set per concept: the right side of a paired structure, otherwise the unpaired one, otherwise the left. */
function oneSide(list: StructureRec[]): StructureRec[] {
  const best = new Map<string, number>();
  for (const s of list) {
    const r = sideRank(s.side);
    const cur = best.get(s.k);
    if (cur === undefined || r < cur) best.set(s.k, r);
  }
  return list.filter((s) => best.get(s.k) === sideRank(s.side));
}

/** Concept key a mesh is asked under (a muscle head is asked as its whole muscle). */
function conceptOf(db: DB, s: StructureRec): string {
  const p = db.parentConcept(s);
  if (p && (s.pack === 'muscles' || s.pack === 'joints')) {
    const c = db.content.get(p);
    if (!c || c.kind === 'muscle') return p;
  }
  return s.k;
}

function meshesFor(db: DB, key: string, side: 'l' | 'r' | null): string[] {
  const merged = new Map<string, StructureRec>();
  for (const id of db.idsForKey(key)) {
    const s = db.byId.get(id);
    if (s && s.pack !== 'attachments') merged.set(s.id, s);
  }
  for (const s of db.partsOf(key)) merged.set(s.id, s);
  const list = [...merged.values()];
  if (!list.length) return [];
  const want = side ?? list.reduce((a, b) => (sideRank(b.side) < sideRank(a.side) ? b : a)).side;
  return list.filter((s) => s.side === want || (want !== null && s.side === null)).map((s) => s.id);
}

/** What a wrong option should resemble: the compartment of a muscle, otherwise the group the mesh sits in. */
function groupOf(db: DB, key: string, s: StructureRec): string {
  const g = db.content.get(key)?.facts?.group as Bi | undefined;
  return g?.en ?? s.path[s.path.length - 1] ?? s.pack;
}

type GroupFn = (key: string) => string | undefined;

function nameQuestions(db: DB, english: boolean, deck: string, structs: StructureRec[], layers: LayerId[], packs: PackId[], ghost: boolean, region?: RegionId, group?: GroupFn): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const s of structs) {
    const key = conceptOf(db, s);
    if (seen.has(key)) continue;
    seen.add(key);
    const side = s.side;
    const ids = meshesFor(db, key, side);
    if (!ids.length) continue;
    const parent = key === s.k ? db.parentConcept(s) : null;
    const answers = db.answersFor(key, { includeParent: parent && db.content.get(parent)?.kind === 'muscle' ? parent : null, english });
    if (!answers.length) continue;
    const display = db.latin(key);
    const base = { key, ids, side, answers, display, layers, packs, ghost, region, deck, group: group?.(key) ?? groupOf(db, key, s), kind: db.content.get(key)?.kind };
    out.push({ ...base, id: `name:${key}`, type: 'name' });
    out.push({ ...base, id: `find:${key}`, type: 'find' });
  }
  return out;
}

function landmarkQuestions(db: DB, english: boolean, deck: string, boneIds: Set<string>, region?: RegionId): Question[] {
  const out: Question[] = [];
  const seen = new Set<string>();
  for (const l of db.landmarks) {
    if (!boneIds.has(l.on) || l.variant) continue;
    const bone = db.byId.get(l.on);
    if (!bone || l.k === bone.k || norm2(l.en) === norm2(bone.en)) continue;
    if (seen.has(l.k)) continue;
    seen.add(l.k);
    const answers = db.answersFor(l.k, { english });
    if (!answers.length) continue;
    const base = { key: l.k, ids: [l.on], side: l.side, landmark: l, layers: ['skeleton'] as LayerId[], packs: ['skeleton'] as PackId[], ghost: false, region, deck, kind: 'landmark' };
    out.push({ ...base, id: `lm:${l.k}`, type: 'landmark', answers, display: db.latin(l.k), group: l.on });
    // the same landmark asked the other way round: its name is given and the bone is the answer
    const onBone = db.content.get(l.k)?.quiz?.bone;
    if (onBone?.length) out.push({ ...base, id: `lmBone:${l.k}`, type: 'lmBone', answers: onBone, display: onBone[0], group: region });
  }
  return out;
}

/** Field of the `quiz` block that holds the accepted answers of a question type. */
const QUIZ_FIELD: Partial<Record<QType, string>> = { joint: 'type', boneType: 'type' };
const GHOSTED: LayerId[] = ['muscles', 'nerves', 'arteries', 'veins'];

function factQuestions(db: DB, deck: string, keys: string[], types: QType[], layers: LayerId[], packs: PackId[], region?: RegionId, group?: GroupFn): Question[] {
  const out: Question[] = [];
  for (const key of keys) {
    const c = db.content.get(key);
    if (!c?.quiz) continue;
    const ids = meshesFor(db, key, 'r');
    for (const t of types) {
      const ans = c.quiz[QUIZ_FIELD[t] ?? t];
      if (!ans?.length) continue;
      out.push({
        id: `${t}:${key}`, type: t, key, ids, side: 'r', answers: ans, display: ans[0], layers, packs,
        ghost: layers.some((l) => GHOSTED.includes(l)), region, deck, group: group?.(key) ?? (c.facts?.group as Bi | undefined)?.en ?? c.kind, kind: c.kind,
      });
    }
  }
  return out;
}

/**
 * "Ligamentum A (Ligamentum B et Ligamentum C)" counts as A, B or C, and a note in brackets is dropped.
 * "Os parietale contralaterale" (the same bone of the other side) is shown in full and also accepted without the last word.
 */
function splitNames(raw: unknown): { main: string[]; all: string[] } {
  const main: string[] = [], all: string[] = [];
  const add = (list: string[], s: string) => {
    if (s && !list.includes(s)) list.push(s);
  };
  if (!Array.isArray(raw)) return { main, all };
  for (const item of raw) {
    if (typeof item !== 'string') continue;
    const m = /^([^(]+?)\s*(?:\(([^)]*)\))?$/.exec(item.trim());
    if (!m) continue;
    const name = m[1].trim();
    add(main, name);
    add(all, name);
    add(all, name.replace(/\s+contralateral(e|is)$/i, '').trim());
    for (const inner of (m[2] ?? '').split(/\s+et\s+/)) if (/^(Ligamentum|Ligamenta|Os|Ossa)\s/.test(inner.trim())) add(all, inner.trim());
  }
  return { main, all };
}

/** Questions answered by any one name from a list in the facts: the bones a bone meets, the ligaments of a joint. */
function listQuestions(db: DB, deck: string, keys: string[], type: 'articulates' | 'ligament', layers: LayerId[], packs: PackId[], region?: RegionId): Question[] {
  const out: Question[] = [];
  for (const key of keys) {
    const c = db.content.get(key);
    const { main, all } = splitNames(c?.facts?.[type === 'articulates' ? 'articulates' : 'ligaments']);
    if (!c || !main.length) continue;
    out.push({
      id: `${type}:${key}`, type, key, ids: meshesFor(db, key, 'r'), side: 'r', answers: all, display: main.join(', '), oneOf: main,
      layers, packs, ghost: false, region, deck, group: c.kind, kind: c.kind,
    });
  }
  return out;
}

/** Lung segments: the segment is named and the lobe is the answer. The pin appears with the answer. */
function lobeQuestions(db: DB, deck: string, lobeIds: Set<string>): Question[] {
  const out: Question[] = [];
  const seen = new Set<string>();
  for (const l of db.landmarks) {
    if (!lobeIds.has(l.on) || seen.has(l.k)) continue;
    const lobe = db.content.get(l.k)?.quiz?.lobe;
    if (!lobe?.length) continue;
    seen.add(l.k);
    out.push({
      // both lungs have a segment of the same name, so the lung is part of the question
      label: `${db.latin(l.k)} pulmonis ${/left-lung/.test(l.on) ? 'sinistri' : 'dextri'}`,
      id: `lobe:${l.k}`, type: 'lobe', key: l.k, ids: [l.on], side: l.side, landmark: l, answers: lobe, display: lobe[0],
      layers: ['respiratory'], packs: ['viscera'], ghost: false, region: 'thorax', deck, group: 'lobe', kind: 'landmark',
    });
  }
  return out;
}

const CASE_REGION: Record<ClinicalCase['area'], RegionId> = { upper: 'upper-limb', lower: 'lower-limb', thorax: 'thorax', heart: 'thorax' };

/** The text of a case option in English (options that are Latin terms are the same in both languages). */
export function optionText(o: string | Bi, lang: 'en' | 'id' = 'en'): string {
  return typeof o === 'string' ? o : (o[lang] ?? o.en ?? o.id ?? '');
}

function caseQuestions(db: DB, deck: string): Question[] {
  const out: Question[] = [];
  for (const c of db.cases) {
    if (!c?.id || !Array.isArray(c.options) || c.options.length < 3 || !c.stem?.en) continue;
    const reveal: string[] = [];
    const packs = new Set<PackId>(['skeleton']);
    const layers = new Set<LayerId>(['skeleton']);
    let lead = 0;
    for (const key of c.focus ?? []) {
      for (const id of meshesFor(db, key, 'r')) {
        const s = db.byId.get(id);
        const layer = s && layerOf(s);
        if (!s || !layer || layer === 'attachments' || reveal.includes(id)) continue;
        reveal.push(id);
        packs.add(s.pack);
        layers.add(layer);
      }
      if (!lead) lead = reveal.length;
    }
    const right = optionText(c.options[0]);
    // a limb is shown on the right side only, like the limb decks; the chest is shown whole
    const side = c.area === 'upper' || c.area === 'lower' ? 'r' : null;
    out.push({
      id: `case:${c.id}`, type: 'case', key: c.focus?.[0] ?? c.id, ids: [], reveal, lead, side, answers: [right], display: right,
      layers: [...layers], packs: [...packs], ghost: true, region: CASE_REGION[c.area] ?? 'thorax', deck, group: c.area, kind: 'case', case: c,
    });
  }
  return out;
}

function norm2(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, '');
}

function contentKeys(db: DB, pred: (c: ContentEntry) => boolean) {
  return [...db.content.values()].filter(pred).map((c) => c.key);
}

function musclesWhere(db: DB, pred: (s: StructureRec) => boolean) {
  return oneSide(db.structures.filter((s) => s.pack === 'muscles' && layerOf(s) === 'muscles' && pred(s)));
}

function muscleConcepts(db: DB, structs: StructureRec[]) {
  return [...new Set(structs.map((s) => conceptOf(db, s)))];
}

const keysOf = (structs: StructureRec[]) => [...new Set(structs.map((s) => s.k))];

// Names that place a vessel or nerve in the lower limb. Only used to pick wrong options from the same limb.
const LOWER_VN = /foot|plantar|tars|tibial|fibular|femoral|genicul|glute|iliac|saphen|poplite|obturator|sciatic|sural|pudend|crural|lumb|sacral|coccyg|piriformis|quadratus-femoris|perforating|calcane|malleol|inguinal|genitofemoral|hypogastric|arcuate|patell|toe|penis|clunial/;
const limbOf = (kind: string): GroupFn => (key) => `${kind} ${LOWER_VN.test(key) ? 'lower' : 'upper'}`;

export const DECKS: DeckDef[] = [
  {
    id: 'pa1', code: 'PA1', en: 'General osteology', idn: 'Osteologi umum',
    blurb: { en: 'Every bone of the skeleton, its shape class and the bones it meets.', id: 'Semua tulang rangka, jenisnya menurut bentuk, dan tulang yang bersendi dengannya.' },
    types: ['name', 'find', 'boneType', 'articulates'], packs: ['skeleton'],
    build: (db, english) => {
      const bones = oneSide(db.structures.filter((s) => s.pack === 'skeleton' && !SKIP_BONE.test(s.id) && !/cartilage/.test(s.id)));
      const keys = keysOf(bones);
      return [
        ...nameQuestions(db, english, 'pa1', bones, ['skeleton'], ['skeleton'], false),
        ...factQuestions(db, 'pa1', keys, ['boneType'], ['skeleton'], ['skeleton']),
        ...listQuestions(db, 'pa1', keys, 'articulates', ['skeleton'], ['skeleton']),
      ];
    },
  },
  {
    id: 'pa2', code: 'PA2', en: 'Skeleton of the upper limb', idn: 'Skeletal ekstremitas superior',
    blurb: { en: 'Bones, landmarks, joints and ligaments from the clavicle to the fingertips.', id: 'Tulang, penanda tulang, sendi, dan ligamen dari clavicula sampai ujung jari.' },
    types: ['name', 'landmark', 'find', 'lmBone', 'articulates', 'joint', 'axes', 'ligament'], packs: ['skeleton', 'joints'], region: 'upper-limb',
    build: (db, english) => {
      const bones = db.structures.filter((s) => s.pack === 'skeleton' && s.side === 'r' && UPPER_BONE.test(s.id));
      const jointKeys = contentKeys(db, (c) => c.kind === 'joint' && c.domain === 'upper');
      return [
        ...nameQuestions(db, english, 'pa2', bones, ['skeleton'], ['skeleton'], false, 'upper-limb'),
        ...landmarkQuestions(db, english, 'pa2', new Set(bones.map((b) => b.id)), 'upper-limb'),
        ...listQuestions(db, 'pa2', keysOf(bones), 'articulates', ['skeleton'], ['skeleton'], 'upper-limb'),
        ...factQuestions(db, 'pa2', jointKeys, ['joint', 'axes'], ['skeleton', 'joints'], ['skeleton', 'joints'], 'upper-limb'),
        ...listQuestions(db, 'pa2', jointKeys, 'ligament', ['skeleton', 'joints'], ['skeleton', 'joints'], 'upper-limb'),
      ];
    },
  },
  {
    id: 'pa3', code: 'PA3', en: 'Skeleton of the lower limb', idn: 'Skeletal ekstremitas inferior',
    blurb: { en: 'Hip bone to toes: bones, landmarks, joints and ligaments.', id: 'Dari os coxae sampai jari kaki: tulang, penanda, sendi, dan ligamen.' },
    types: ['name', 'landmark', 'find', 'lmBone', 'articulates', 'joint', 'axes', 'ligament'], packs: ['skeleton', 'joints'], region: 'lower-limb',
    build: (db, english) => {
      const bones = db.structures.filter((s) => s.pack === 'skeleton' && s.side === 'r' && LOWER_BONE.test(s.id));
      const jointKeys = contentKeys(db, (c) => c.kind === 'joint' && c.domain === 'lower');
      return [
        ...nameQuestions(db, english, 'pa3', bones, ['skeleton'], ['skeleton'], false, 'lower-limb'),
        ...landmarkQuestions(db, english, 'pa3', new Set(bones.map((b) => b.id)), 'lower-limb'),
        ...listQuestions(db, 'pa3', keysOf(bones), 'articulates', ['skeleton'], ['skeleton'], 'lower-limb'),
        ...factQuestions(db, 'pa3', jointKeys, ['joint', 'axes'], ['skeleton', 'joints'], ['skeleton', 'joints'], 'lower-limb'),
        ...listQuestions(db, 'pa3', jointKeys, 'ligament', ['skeleton', 'joints'], ['skeleton', 'joints'], 'lower-limb'),
      ];
    },
  },
  {
    id: 'pa4', code: 'PA4', en: 'Muscles of the upper limb', idn: 'Otot ekstremitas superior',
    blurb: { en: 'Names, origin, insertion, action and innervation.', id: 'Nama, origo, insersio, aksi, dan persarafan.' },
    types: ['name', 'find', 'origin', 'insertion', 'nerve', 'action'], packs: ['skeleton', 'muscles'], region: 'upper-limb',
    build: (db, english) => {
      const ms = musclesWhere(db, (s) => s.path.some((p) => /upper limb/i.test(p)) || UPPER_AXIAL_MUSCLES.test(s.k));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, english, 'pa4', ms, ['skeleton', 'muscles'], ['skeleton', 'muscles'], true, 'upper-limb'),
        ...factQuestions(db, 'pa4', keys, ['origin', 'insertion', 'nerve', 'action'], ['skeleton', 'muscles'], ['skeleton', 'muscles'], 'upper-limb'),
      ];
    },
  },
  {
    id: 'pa5', code: 'PA5', en: 'Muscles of the lower limb', idn: 'Otot ekstremitas inferior',
    blurb: { en: 'Gluteal region, thigh, leg and foot.', id: 'Regio glutea, paha, tungkai bawah, dan kaki.' },
    types: ['name', 'find', 'origin', 'insertion', 'nerve', 'action'], packs: ['skeleton', 'muscles'], region: 'lower-limb',
    build: (db, english) => {
      const ms = musclesWhere(db, (s) => s.path.some((p) => /lower limb/i.test(p)));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, english, 'pa5', ms, ['skeleton', 'muscles'], ['skeleton', 'muscles'], true, 'lower-limb'),
        ...factQuestions(db, 'pa5', keys, ['origin', 'insertion', 'nerve', 'action'], ['skeleton', 'muscles'], ['skeleton', 'muscles'], 'lower-limb'),
      ];
    },
  },
  {
    id: 'pa6', code: 'PA6', en: 'Thoracic wall, larynx and airways', idn: 'Dinding toraks, laring, dan saluran napas',
    blurb: { en: 'Sternum, ribs, thoracic muscles, larynx, trachea and bronchi.', id: 'Sternum, costae, otot toraks, laring, trakea, dan bronkus.' },
    types: ['name', 'landmark', 'find', 'lmBone', 'origin', 'insertion', 'nerve', 'from'], packs: ['skeleton', 'muscles', 'viscera'], region: 'thorax',
    build: (db, english) => {
      const bones = oneSide(db.structures.filter((s) => s.pack === 'skeleton' && (THORAX_BONE.test(s.id) || /thyroid-cartilage|cricoid|arytenoid|corniculate|hyoid/.test(s.id))));
      const ms = musclesWhere(db, (s) => s.path.some((p) => /thorax|thoracic|laryngeal/i.test(p)) && !UPPER_AXIAL_MUSCLES.test(s.k));
      const resp = oneSide(db.structures.filter((s) => s.pack === 'viscera' && layerOf(s) === 'respiratory'));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, english, 'pa6', bones, ['skeleton'], ['skeleton'], false, 'thorax'),
        ...landmarkQuestions(db, english, 'pa6', new Set(bones.map((b) => b.id)), 'thorax'),
        ...nameQuestions(db, english, 'pa6', ms, ['skeleton', 'muscles'], ['skeleton', 'muscles'], true, 'thorax'),
        ...nameQuestions(db, english, 'pa6', resp, ['skeleton', 'respiratory'], ['skeleton', 'viscera'], true, 'thorax'),
        ...factQuestions(db, 'pa6', keys, ['origin', 'insertion', 'nerve'], ['skeleton', 'muscles'], ['skeleton', 'muscles'], 'thorax'),
        ...factQuestions(db, 'pa6', keysOf(resp).filter((k) => /bronch/.test(k)), ['from'], ['skeleton', 'respiratory'], ['skeleton', 'viscera'], 'thorax'),
      ];
    },
  },
  {
    id: 'pa7', code: 'PA7', en: 'Heart and lungs', idn: 'Cor dan pulmo',
    blurb: { en: 'Chambers, valves, coronary vessels, lobes and segments.', id: 'Ruang jantung, katup, pembuluh koroner, lobus, dan segmen.' },
    types: ['name', 'find', 'landmark', 'from', 'drains', 'lobe'], packs: ['vessels', 'viscera'], region: 'heart',
    build: (db, english) => {
      const heart = db.structures.filter((s) => s.pack === 'vessels' && layerOf(s) === 'heart');
      const great = db.structures.filter((s) => s.pack === 'vessels' && layerOf(s) !== 'heart' && /aorta|aortic-arch|pulmonary-trunk|pulmonary-arter|pulmonary-vein|vena-cava|brachiocephalic|coronary|cardiac-vein|coronary-sinus|interventricular|circumflex-artery-of-heart/.test(s.id));
      const lungs = oneSide(db.structures.filter((s) => s.pack === 'viscera' && /lobe-of|lung|bronch|trachea|pleura/.test(s.id)));
      const heartIds = new Set(heart.map((s) => s.id));
      const vesselKeys = keysOf(great);
      return [
        ...nameQuestions(db, english, 'pa7', heart, ['heart'], ['vessels'], true, 'heart'),
        ...nameQuestions(db, english, 'pa7', great, ['heart', 'arteries', 'veins'], ['vessels'], true, 'heart'),
        ...nameQuestions(db, english, 'pa7', lungs, ['respiratory'], ['viscera'], true, 'thorax'),
        ...landmarkQuestions(db, english, 'pa7', heartIds, 'heart')
          .filter((q) => q.type === 'landmark')
          .map((q) => ({ ...q, layers: ['heart'] as LayerId[], packs: ['vessels'] as PackId[] })),
        ...factQuestions(db, 'pa7', vesselKeys.filter((k) => db.content.get(k)?.kind === 'artery'), ['from'], ['heart', 'arteries', 'veins'], ['vessels'], 'heart'),
        ...factQuestions(db, 'pa7', vesselKeys.filter((k) => db.content.get(k)?.kind === 'vein'), ['drains'], ['heart', 'arteries', 'veins'], ['vessels'], 'heart'),
        ...lobeQuestions(db, 'pa7', new Set(lungs.map((s) => s.id))),
      ];
    },
  },
  {
    id: 'pa8', code: 'PA8', en: 'Vessels and nerves of the limbs', idn: 'Vaskularisasi dan inervasi ekstremitas',
    blurb: { en: 'Arteries, veins and nerves of the limbs, with their origins and roots.', id: 'Arteri, vena, dan saraf ekstremitas, beserta asal dan radiksnya.' },
    types: ['name', 'find', 'roots', 'from', 'drains', 'continues'], packs: ['skeleton', 'vessels', 'nerves'],
    build: (db, english) => {
      // the deck holds the vessels and nerves the course text was written for, so every card has an explanation
      const vn = oneSide(db.structures.filter((s) => (s.pack === 'vessels' || s.pack === 'nerves') && layerOf(s) !== 'heart' && db.content.get(s.k)?.domain === 'vn'));
      const arteries = vn.filter((s) => layerOf(s) === 'arteries');
      const veins = vn.filter((s) => layerOf(s) === 'veins');
      const nerves = vn.filter((s) => layerOf(s) === 'nerves');
      return [
        ...nameQuestions(db, english, 'pa8', arteries, ['skeleton', 'arteries'], ['skeleton', 'vessels'], true, undefined, limbOf('artery')),
        ...nameQuestions(db, english, 'pa8', veins, ['skeleton', 'veins'], ['skeleton', 'vessels'], true, undefined, limbOf('vein')),
        ...nameQuestions(db, english, 'pa8', nerves, ['skeleton', 'nerves'], ['skeleton', 'nerves'], true, undefined, limbOf('nerve')),
        ...factQuestions(db, 'pa8', keysOf(nerves), ['roots', 'from'], ['skeleton', 'nerves'], ['skeleton', 'nerves'], undefined, limbOf('nerve')),
        ...factQuestions(db, 'pa8', keysOf(arteries), ['from', 'continues'], ['skeleton', 'arteries'], ['skeleton', 'vessels'], undefined, limbOf('artery')),
        ...factQuestions(db, 'pa8', keysOf(veins), ['drains', 'continues'], ['skeleton', 'veins'], ['skeleton', 'vessels'], undefined, limbOf('vein')),
      ];
    },
  },
  {
    id: 'dx', code: 'Dx', en: 'Clinical cases', idn: 'Kasus klinis',
    blurb: {
      en: 'Nerve injuries, fractures and chest cases, each with one best answer.',
      id: 'Cedera saraf, fraktur, dan kasus toraks, masing-masing dengan satu jawaban terbaik.',
    },
    types: ['case'], packs: ['skeleton'],
    build: (db) => caseQuestions(db, 'dx'),
  },
];

const built = new WeakMap<DB, Map<string, Question[]>>();

/** The questions of a deck. Built once per answer language setting; the data never changes after loading. */
export function buildDeck(db: DB, d: DeckDef, english: boolean): Question[] {
  let m = built.get(db);
  if (!m) built.set(db, (m = new Map()));
  const k = d.id + (english ? ':en' : '');
  let qs = m.get(k);
  if (!qs) {
    // two rules of one deck can reach the same structure; a card is asked once
    qs = [...new Map(d.build(db, english).map((q) => [q.id, q] as const)).values()];
    m.set(k, qs);
  }
  return qs;
}

/** Every question of every deck by card id. A card that sits in two decks keeps the staging of `prefer`, else of the first deck. */
export function questionIndex(db: DB, english: boolean, prefer?: string | null): Map<string, Question> {
  const out = new Map<string, Question>();
  const order = prefer ? [...DECKS.filter((d) => d.id === prefer), ...DECKS.filter((d) => d.id !== prefer)] : DECKS;
  for (const d of order) for (const q of buildDeck(db, d, english)) if (!out.has(q.id)) out.set(q.id, q);
  return out;
}

export interface SessionOpts {
  types: QType[];
  size: number;
  mode: 'practice' | 'exam';
  onlyDue?: boolean;
}

function shuffle<T>(a: T[]): T[] {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Due cards first, then new ones, then the rest by due date. Exams are a random sample. */
export function makeSession(all: Question[], o: SessionOpts): Question[] {
  const pool = all.filter((q) => o.types.includes(q.type));
  if (o.mode === 'exam') return shuffle(pool).slice(0, o.size);
  const now = Date.now();
  const due: Question[] = [], fresh: Question[] = [], later: Question[] = [];
  for (const q of pool) {
    const c = getCard(q.id);
    if (!c) fresh.push(q);
    else if (c.due <= now) due.push(q);
    else later.push(q);
  }
  due.sort((a, b) => getCard(a.id)!.due - getCard(b.id)!.due);
  later.sort((a, b) => getCard(a.id)!.due - getCard(b.id)!.due);
  const ordered = o.onlyDue ? due : [...due, ...shuffle(fresh), ...later];
  return ordered.slice(0, o.size);
}

/** Cards from every deck that are due for review now, the most overdue first. */
export function dueQuestions(db: DB, english: boolean): Question[] {
  const now = Date.now();
  const out: Question[] = [];
  for (const q of questionIndex(db, english).values()) {
    const c = getCard(q.id);
    if (c && c.due <= now) out.push(q);
  }
  return out.sort((a, b) => getCard(a.id)!.due - getCard(b.id)!.due);
}

export function deckStats(all: Question[]) {
  const now = Date.now();
  let due = 0, fresh = 0, mastered = 0;
  for (const q of all) {
    const c = getCard(q.id);
    if (!c) fresh++;
    else {
      if (c.due <= now) due++;
      if (c.ivl >= 7) mastered++;
    }
  }
  return { total: all.length, due, fresh, mastered };
}
