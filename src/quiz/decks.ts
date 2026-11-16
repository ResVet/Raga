import type { DB } from '../data/db';
import type { ContentEntry, LandmarkRec, PackId, StructureRec } from '../data/types';
import { layerOf, type LayerId, type RegionId } from '../engine/layers';
import { getCard } from './srs';

export type QType = 'name' | 'landmark' | 'find' | 'origin' | 'insertion' | 'nerve' | 'action' | 'joint' | 'boneType' | 'roots';

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
}

export interface DeckDef {
  id: string;
  code: string; // FK Unsri practical code
  en: string;
  idn: string;
  blurb: { en: string; id: string };
  types: QType[];
  packs: PackId[];
  region?: RegionId;
  build: (db: DB, ctx: DeckContext) => Question[];
}

export interface DeckContext {
  inRegion: (id: string, region: RegionId) => boolean;
  english: boolean;
}

const UPPER_BONE = /(clavicle|scapula|humerus|radius|ulna|metacarpal-bone|of-hand|scaphoid-bone|lunate-bone|triquetrum-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone)-[lr]$/;
const LOWER_BONE = /(hip-bone|femur|patella|tibia|fibula|talus|calcaneus|navicular-bone|cuboid-bone|cuneiform-bone|metatarsal-bone|of-foot)-[lr]$/;
const THORAX_BONE = /(rib-[lr]|costal-cartilage-of-.*|manubrium-of-sternum|body-of-sternum|xiphoid-process|vertebra-t\d+)$/;
const SKIP_BONE = /tooth|incisor|canine|premolar|molar|alar|septal|cells-of-ethmoid|sinus-of|sesamoid/;
const UPPER_AXIAL_MUSCLES = /^(pectoralis|subclavius|serratus-anterior|trapezius|latissimus|levator-scapulae|rhomboid|clavicular-head-of-pectoralis|sternocostal-head|abdominal-part-of-pectoralis|ascending-part-of-trapezius|descending-part-of-trapezius|transverse-part-of-trapezius)/;

function pickSide<T extends { side: 'l' | 'r' | null }>(list: T[]): T[] {
  const r = list.filter((x) => x.side === 'r');
  if (r.length) return r;
  const n = list.filter((x) => x.side === null);
  if (n.length) return n;
  return list.filter((x) => x.side === 'l');
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
  const all = db.idsForKey(key).map((id) => db.byId.get(id)!).filter(Boolean).filter((s) => s.pack !== 'attachments');
  const byParent = db.structures.filter((s) => s.pack !== 'attachments' && db.parentConcept(s) === key);
  const merged = new Map<string, StructureRec>();
  for (const s of [...all, ...byParent]) merged.set(s.id, s);
  const list = [...merged.values()];
  if (!list.length) return [];
  const want = side ?? pickSide(list)[0]?.side ?? null;
  return list.filter((s) => s.side === want || (want !== null && s.side === null)).map((s) => s.id);
}

function nameQuestions(db: DB, ctx: DeckContext, deck: string, structs: StructureRec[], layers: LayerId[], packs: PackId[], ghost: boolean, region?: RegionId, alsoFind = true): Question[] {
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
    const answers = db.answersFor(key, { includeParent: parent && db.content.get(parent)?.kind === 'muscle' ? parent : null, english: ctx.english });
    if (!answers.length) continue;
    const display = db.latin(key);
    out.push({ id: `name:${key}`, type: 'name', key, ids, side, answers, display, layers, packs, ghost, region, deck });
    if (alsoFind) out.push({ id: `find:${key}`, type: 'find', key, ids, side, answers, display, layers, packs, ghost, region, deck });
  }
  return out;
}

function landmarkQuestions(db: DB, ctx: DeckContext, deck: string, boneIds: Set<string>, region?: RegionId): Question[] {
  const out: Question[] = [];
  const seen = new Set<string>();
  for (const l of db.landmarks) {
    if (!boneIds.has(l.on) || l.variant) continue;
    const bone = db.byId.get(l.on);
    if (!bone || l.k === bone.k || norm2(l.en) === norm2(bone.en)) continue;
    if (seen.has(l.k)) continue;
    seen.add(l.k);
    const answers = db.answersFor(l.k, { english: ctx.english });
    if (!answers.length) continue;
    out.push({
      id: `lm:${l.k}`, type: 'landmark', key: l.k, ids: [l.on], side: l.side, landmark: l, answers, display: db.latin(l.k),
      layers: ['skeleton'], packs: ['skeleton'], ghost: false, region, deck,
    });
  }
  return out;
}

function factQuestions(db: DB, deck: string, keys: string[], types: QType[], layers: LayerId[], packs: PackId[], region?: RegionId): Question[] {
  const out: Question[] = [];
  for (const key of keys) {
    const c = db.content.get(key);
    if (!c?.quiz) continue;
    const ids = meshesFor(db, key, 'r');
    for (const t of types) {
      const field = t === 'joint' ? 'type' : t === 'boneType' ? 'type' : t;
      const ans = c.quiz[field];
      if (!ans?.length) continue;
      out.push({ id: `${t}:${key}`, type: t, key, ids, side: 'r', answers: ans, display: ans[0], layers, packs, ghost: layers.includes('muscles') || layers.includes('nerves'), region, deck });
    }
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
  return pickSide(db.structures.filter((s) => s.pack === 'muscles' && layerOf(s) === 'muscles' && pred(s)));
}

function muscleConcepts(db: DB, structs: StructureRec[]) {
  return [...new Set(structs.map((s) => conceptOf(db, s)))];
}

export const DECKS: DeckDef[] = [
  {
    id: 'pa1', code: 'PA1', en: 'General osteology', idn: 'Osteologi umum',
    blurb: { en: 'Every bone of the skeleton and its shape class.', id: 'Semua tulang rangka dan jenisnya menurut bentuk.' },
    types: ['name', 'find', 'boneType'], packs: ['skeleton'],
    build: (db, ctx) => {
      const bones = pickSide(db.structures.filter((s) => s.pack === 'skeleton' && !SKIP_BONE.test(s.id) && !/cartilage/.test(s.id)));
      const both = db.structures.filter((s) => s.pack === 'skeleton' && s.side === 'l' && !SKIP_BONE.test(s.id) && !/cartilage/.test(s.id));
      const qs = nameQuestions(db, ctx, 'pa1', [...bones, ...both.filter((s) => !bones.some((b) => b.k === s.k))], ['skeleton'], ['skeleton'], false);
      const keys = [...new Set(bones.map((b) => b.k))];
      return [...qs, ...factQuestions(db, 'pa1', keys, ['boneType'], ['skeleton'], ['skeleton'])];
    },
  },
  {
    id: 'pa2', code: 'PA2', en: 'Skeleton of the upper limb', idn: 'Skeletal ekstremitas superior',
    blurb: { en: 'Bones, landmarks and joints from the clavicle to the fingertips.', id: 'Tulang, penanda tulang, dan sendi dari clavicula sampai ujung jari.' },
    types: ['name', 'landmark', 'find', 'joint'], packs: ['skeleton', 'joints'], region: 'upper-limb',
    build: (db, ctx) => {
      const bones = db.structures.filter((s) => s.pack === 'skeleton' && s.side === 'r' && UPPER_BONE.test(s.id));
      const jointKeys = contentKeys(db, (c) => c.kind === 'joint' && (c.domain === 'upper'));
      return [
        ...nameQuestions(db, ctx, 'pa2', bones, ['skeleton'], ['skeleton'], false, 'upper-limb'),
        ...landmarkQuestions(db, ctx, 'pa2', new Set(bones.map((b) => b.id)), 'upper-limb'),
        ...factQuestions(db, 'pa2', jointKeys, ['joint'], ['skeleton', 'joints'], ['skeleton', 'joints'], 'upper-limb'),
      ];
    },
  },
  {
    id: 'pa3', code: 'PA3', en: 'Skeleton of the lower limb', idn: 'Skeletal ekstremitas inferior',
    blurb: { en: 'Hip bone to toes: bones, landmarks and joints.', id: 'Dari os coxae sampai jari kaki: tulang, penanda, dan sendi.' },
    types: ['name', 'landmark', 'find', 'joint'], packs: ['skeleton', 'joints'], region: 'lower-limb',
    build: (db, ctx) => {
      const bones = db.structures.filter((s) => s.pack === 'skeleton' && s.side === 'r' && LOWER_BONE.test(s.id));
      const jointKeys = contentKeys(db, (c) => c.kind === 'joint' && c.domain === 'lower');
      return [
        ...nameQuestions(db, ctx, 'pa3', bones, ['skeleton'], ['skeleton'], false, 'lower-limb'),
        ...landmarkQuestions(db, ctx, 'pa3', new Set(bones.map((b) => b.id)), 'lower-limb'),
        ...factQuestions(db, 'pa3', jointKeys, ['joint'], ['skeleton', 'joints'], ['skeleton', 'joints'], 'lower-limb'),
      ];
    },
  },
  {
    id: 'pa4', code: 'PA4', en: 'Muscles of the upper limb', idn: 'Otot ekstremitas superior',
    blurb: { en: 'Names, origin, insertion, action and innervation.', id: 'Nama, origo, insersio, aksi, dan persarafan.' },
    types: ['name', 'find', 'origin', 'insertion', 'nerve', 'action'], packs: ['skeleton', 'muscles'], region: 'upper-limb',
    build: (db, ctx) => {
      const ms = musclesWhere(db, (s) => s.path.some((p) => /upper limb/i.test(p)) || UPPER_AXIAL_MUSCLES.test(s.k));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, ctx, 'pa4', ms, ['skeleton', 'muscles'], ['skeleton', 'muscles'], true, 'upper-limb'),
        ...factQuestions(db, 'pa4', keys, ['origin', 'insertion', 'nerve', 'action'], ['skeleton', 'muscles'], ['skeleton', 'muscles'], 'upper-limb'),
      ];
    },
  },
  {
    id: 'pa5', code: 'PA5', en: 'Muscles of the lower limb', idn: 'Otot ekstremitas inferior',
    blurb: { en: 'Gluteal region, thigh, leg and foot.', id: 'Regio glutea, paha, tungkai bawah, dan kaki.' },
    types: ['name', 'find', 'origin', 'insertion', 'nerve', 'action'], packs: ['skeleton', 'muscles'], region: 'lower-limb',
    build: (db, ctx) => {
      const ms = musclesWhere(db, (s) => s.path.some((p) => /lower limb/i.test(p)));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, ctx, 'pa5', ms, ['skeleton', 'muscles'], ['skeleton', 'muscles'], true, 'lower-limb'),
        ...factQuestions(db, 'pa5', keys, ['origin', 'insertion', 'nerve', 'action'], ['skeleton', 'muscles'], ['skeleton', 'muscles'], 'lower-limb'),
      ];
    },
  },
  {
    id: 'pa6', code: 'PA6', en: 'Thoracic wall, larynx and airways', idn: 'Dinding toraks, laring, dan saluran napas',
    blurb: { en: 'Sternum, ribs, thoracic muscles, larynx, trachea and bronchi.', id: 'Sternum, costae, otot toraks, laring, trakea, dan bronkus.' },
    types: ['name', 'landmark', 'find', 'origin', 'insertion', 'nerve'], packs: ['skeleton', 'muscles', 'viscera'], region: 'thorax',
    build: (db, ctx) => {
      const bones = pickSide(db.structures.filter((s) => s.pack === 'skeleton' && (THORAX_BONE.test(s.id) || /thyroid-cartilage|cricoid|arytenoid|corniculate|hyoid/.test(s.id))));
      const ms = musclesWhere(db, (s) => s.path.some((p) => /thorax|thoracic|laryngeal|diaphragm/i.test(p)) && !UPPER_AXIAL_MUSCLES.test(s.k));
      const resp = pickSide(db.structures.filter((s) => s.pack === 'viscera' && layerOf(s) === 'respiratory'));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, ctx, 'pa6', bones, ['skeleton'], ['skeleton'], false, 'thorax'),
        ...landmarkQuestions(db, ctx, 'pa6', new Set(bones.map((b) => b.id)), 'thorax'),
        ...nameQuestions(db, ctx, 'pa6', ms, ['skeleton', 'muscles'], ['skeleton', 'muscles'], true, 'thorax'),
        ...nameQuestions(db, ctx, 'pa6', resp, ['skeleton', 'respiratory'], ['skeleton', 'viscera'], true, 'thorax'),
        ...factQuestions(db, 'pa6', keys, ['origin', 'insertion', 'nerve'], ['skeleton', 'muscles'], ['skeleton', 'muscles'], 'thorax'),
      ];
    },
  },
  {
    id: 'pa7', code: 'PA7', en: 'Heart and lungs', idn: 'Cor dan pulmo',
    blurb: { en: 'Chambers, valves, coronary vessels, lobes and segments.', id: 'Ruang jantung, katup, pembuluh koroner, lobus, dan segmen.' },
    types: ['name', 'find', 'landmark'], packs: ['vessels', 'viscera'], region: 'heart',
    build: (db, ctx) => {
      const heart = db.structures.filter((s) => s.pack === 'vessels' && layerOf(s) === 'heart');
      const great = db.structures.filter((s) => s.pack === 'vessels' && /aorta|aortic-arch|pulmonary-trunk|pulmonary-arter|pulmonary-vein|vena-cava|brachiocephalic|coronary|cardiac-vein|coronary-sinus|interventricular|circumflex-artery-of-heart/.test(s.id));
      const lungs = pickSide(db.structures.filter((s) => s.pack === 'viscera' && /lobe-of|lung|bronch|trachea|pleura/.test(s.id)));
      const heartIds = new Set(heart.map((s) => s.id));
      return [
        ...nameQuestions(db, ctx, 'pa7', heart, ['heart'], ['vessels'], true, 'heart'),
        ...nameQuestions(db, ctx, 'pa7', great, ['heart', 'arteries', 'veins'], ['vessels'], true, 'heart'),
        ...nameQuestions(db, ctx, 'pa7', lungs, ['respiratory'], ['viscera'], true, 'thorax'),
        ...landmarkQuestions(db, ctx, 'pa7', heartIds, 'heart').map((q) => ({ ...q, layers: ['heart'] as LayerId[], packs: ['vessels'] as PackId[] })),
      ];
    },
  },
  {
    id: 'pa8', code: 'PA8', en: 'Vessels and nerves of the limbs', idn: 'Vaskularisasi dan inervasi ekstremitas',
    blurb: { en: 'Arteries, veins and nerves of the arm and leg, with nerve roots.', id: 'Arteri, vena, dan saraf lengan dan tungkai, beserta radiksnya.' },
    types: ['name', 'find', 'roots'], packs: ['skeleton', 'vessels', 'nerves'],
    build: (db, ctx) => {
      const inLimb = (s: StructureRec) => ctx.inRegion(s.id, 'upper-limb') || ctx.inRegion(s.id, 'lower-limb');
      const vn = pickSide(db.structures.filter((s) => (s.pack === 'vessels' || s.pack === 'nerves') && layerOf(s) !== 'heart' && inLimb(s)));
      const arteries = vn.filter((s) => layerOf(s) === 'arteries');
      const veins = vn.filter((s) => layerOf(s) === 'veins');
      const nerves = vn.filter((s) => layerOf(s) === 'nerves');
      const nerveKeys = [...new Set(nerves.map((s) => s.k))];
      return [
        ...nameQuestions(db, ctx, 'pa8', arteries, ['skeleton', 'arteries'], ['skeleton', 'vessels'], true),
        ...nameQuestions(db, ctx, 'pa8', veins, ['skeleton', 'veins'], ['skeleton', 'vessels'], true),
        ...nameQuestions(db, ctx, 'pa8', nerves, ['skeleton', 'nerves'], ['skeleton', 'nerves'], true),
        ...factQuestions(db, 'pa8', nerveKeys, ['roots'], ['skeleton', 'nerves'], ['skeleton', 'nerves']),
      ];
    },
  },
];

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
