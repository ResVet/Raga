import type { PackId, StructureRec } from '../data/types';

export type LayerId =
  | 'skeleton' | 'joints' | 'muscles' | 'fasciae' | 'heart' | 'arteries' | 'veins'
  | 'nerves' | 'respiratory' | 'organs' | 'lymphoid' | 'skin';

export interface LayerDef {
  id: LayerId;
  pack: PackId;
  la: string;
  en: string;
  idn: string;
  swatch: string;
}

export const LAYERS: LayerDef[] = [
  { id: 'skeleton', pack: 'skeleton', la: 'Ossa', en: 'Bones', idn: 'Tulang', swatch: '#e4d7bd' },
  { id: 'joints', pack: 'joints', la: 'Juncturae', en: 'Joints and ligaments', idn: 'Sendi dan ligamen', swatch: '#ddd6c4' },
  { id: 'muscles', pack: 'muscles', la: 'Musculi', en: 'Muscles and tendons', idn: 'Otot dan tendo', swatch: '#9a2f2a' },
  { id: 'fasciae', pack: 'muscles', la: 'Fasciae et bursae', en: 'Fasciae, bursae, sheaths', idn: 'Fascia, bursa, selubung', swatch: '#ece8de' },
  { id: 'heart', pack: 'vessels', la: 'Cor', en: 'Heart', idn: 'Jantung', swatch: '#9a3430' },
  { id: 'arteries', pack: 'vessels', la: 'Arteriae', en: 'Arteries', idn: 'Arteri', swatch: '#b3232e' },
  { id: 'veins', pack: 'vessels', la: 'Venae', en: 'Veins', idn: 'Vena', swatch: '#2e4f9c' },
  { id: 'nerves', pack: 'nerves', la: 'Nervi', en: 'Nerves', idn: 'Saraf', swatch: '#efcf68' },
  { id: 'respiratory', pack: 'viscera', la: 'Systema respiratorium', en: 'Airways and lungs', idn: 'Saluran napas dan paru', swatch: '#d8a3a1' },
  { id: 'organs', pack: 'viscera', la: 'Viscera', en: 'Other organs', idn: 'Organ lain', swatch: '#b9715f' },
  { id: 'lymphoid', pack: 'lymphoid', la: 'Organa lymphoidea', en: 'Lymphoid organs', idn: 'Organ limfoid', swatch: '#98bd4a' },
  { id: 'skin', pack: 'skin', la: 'Regiones corporis', en: 'Skin and regions', idn: 'Kulit dan regio', swatch: '#d6a385' },
];

const RESP = /bronch|lung|pleura|trache|laryn|pharyn|nasal|epiglott|soft palate|uvula|nasopharynx|oropharynx|laryngopharynx/i;

export function layerOf(s: StructureRec): LayerId | 'attachments' {
  switch (s.pack) {
    case 'skeleton':
      return 'skeleton';
    case 'joints':
      return 'joints';
    case 'attachments':
      return 'attachments';
    case 'muscles':
      if (s.mats.includes('muscle')) return 'muscles';
      if (s.mats.length === 1 && s.mats[0] === 'tendon') return 'muscles';
      return 'fasciae';
    case 'vessels': {
      const inHeart = s.path.some((p) => /^Heart$|Valves of heart|Chambers|heart/i.test(p)) || s.mats.includes('myocardium');
      if (inHeart && !s.mats.includes('artery') && !s.mats.includes('vein')) return 'heart';
      if (s.mats.includes('vein') || s.mats.includes('pulmonary_vein')) return 'veins';
      return 'arteries';
    }
    case 'nerves':
      return 'nerves';
    case 'viscera':
      return RESP.test(s.en) || s.path.some((p) => /respiratory|lung|bronch/i.test(p)) ? 'respiratory' : 'organs';
    case 'lymphoid':
      return 'lymphoid';
    case 'skin':
      return 'skin';
  }
}

export type RegionId = 'body' | 'upper-limb' | 'shoulder' | 'arm' | 'forearm-hand' | 'hand' | 'lower-limb' | 'hip' | 'knee' | 'leg-foot' | 'foot' | 'thorax' | 'heart' | 'larynx' | 'head-neck' | 'trunk';

export interface RegionDef {
  id: RegionId;
  en: string;
  idn: string;
  layers: LayerId[];
  /** Bones whose bounding box defines the region (right side unless noted). */
  bones?: RegExp;
  /** model hierarchy groups that always belong to the region */
  path?: RegExp;
  pad?: number;
  side?: 'r' | 'l' | null;
}

export const REGIONS: RegionDef[] = [
  { id: 'body', en: 'Whole body', idn: 'Seluruh tubuh', layers: ['skeleton'] },
  { id: 'upper-limb', en: 'Upper limb', idn: 'Ekstremitas atas', layers: ['skeleton', 'muscles'], path: /upper limb|pectoral girdle/i, bones: /(clavicle|scapula|humerus|radius|ulna|metacarpal-bone|of-hand|scaphoid-bone|lunate-bone|triquetrum-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone)-r$/, pad: 0.05, side: 'r' },
  { id: 'shoulder', en: 'Shoulder', idn: 'Bahu', layers: ['skeleton', 'joints'], bones: /^(clavicle|scapula)-r$/, pad: 0.06, side: 'r' },
  { id: 'arm', en: 'Arm and elbow', idn: 'Lengan atas dan siku', layers: ['skeleton', 'muscles'], bones: /^humerus-r$/, pad: 0.05, side: 'r' },
  { id: 'forearm-hand', en: 'Forearm', idn: 'Lengan bawah', layers: ['skeleton', 'muscles'], bones: /^(radius|ulna)-r$/, pad: 0.05, side: 'r' },
  { id: 'hand', en: 'Hand and wrist', idn: 'Tangan dan pergelangan', layers: ['skeleton', 'joints'], bones: /(metacarpal-bone|of-hand|scaphoid-bone|lunate-bone|triquetrum-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone)-r$/, pad: 0.025, side: 'r' },
  { id: 'lower-limb', en: 'Lower limb', idn: 'Ekstremitas bawah', layers: ['skeleton', 'muscles'], path: /lower limb|pelvic girdle/i, bones: /(hip-bone|femur|patella|tibia|fibula|talus|calcaneus|navicular-bone|cuboid-bone|cuneiform-bone|metatarsal-bone|of-foot)-r$/, pad: 0.05, side: 'r' },
  { id: 'hip', en: 'Hip and pelvis', idn: 'Panggul', layers: ['skeleton', 'joints'], bones: /^(hip-bone-r|hip-bone-l|sacrum|coccyx)$/, pad: 0.04, side: null },
  { id: 'knee', en: 'Knee', idn: 'Lutut', layers: ['skeleton', 'joints'], bones: /^patella-r$/, pad: 0.09, side: 'r' },
  { id: 'leg-foot', en: 'Leg', idn: 'Tungkai bawah', layers: ['skeleton', 'muscles'], bones: /^(tibia|fibula)-r$/, pad: 0.05, side: 'r' },
  { id: 'foot', en: 'Ankle and foot', idn: 'Pergelangan kaki dan kaki', layers: ['skeleton', 'joints'], bones: /(talus|calcaneus|navicular-bone|cuboid-bone|cuneiform-bone|metatarsal-bone|of-foot)-r$/, pad: 0.03, side: 'r' },
  { id: 'thorax', en: 'Thorax', idn: 'Toraks', layers: ['skeleton', 'muscles'], bones: /(rib-[lr]|costal-cartilage|sternum|xiphoid-process|vertebra-t\d+)/, pad: 0.02, side: null },
  { id: 'heart', en: 'Heart', idn: 'Jantung', layers: ['heart', 'arteries', 'veins'], pad: 0.03, side: null },
  { id: 'larynx', en: 'Larynx', idn: 'Laring', layers: ['skeleton', 'joints', 'muscles'], bones: /^(thyroid-cartilage|cricoid-cartilage|arytenoid-cartilage-[lr]|corniculate-cartilage-[lr]|hyoid-bone)$/, pad: 0.015, side: null },
  { id: 'head-neck', en: 'Head and neck', idn: 'Kepala dan leher', layers: ['skeleton'], bones: /^(frontal-bone|occipital-bone|mandible|sphenoid-bone|parietal-bone-[lr]|temporal-bone-[lr]|maxilla-[lr]|zygomatic-bone-[lr]|vertebra-c\d|atlas-c1|axis-c2|hyoid-bone)$/, pad: 0.03, side: null },
];
