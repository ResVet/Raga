// Landmark kinds, colours and decal sizes. The kind comes from the Latin and/or English name, so it
// works for every landmark in db.landmarks without extra data. The palette is categorical, reads on
// ivory bone, keeps the kinds apart for the common colour-vision deficiencies (orange / lavender /
// yellow / cyan / green / blue differ in lightness as well as hue) and stays clear of the eosin
// selection rim.

export type LandmarkKind = 'process' | 'fossa' | 'line' | 'surface' | 'foramen' | 'part';

export const LANDMARK_KINDS: LandmarkKind[] = ['process', 'fossa', 'line', 'surface', 'foramen', 'part'];

export const LANDMARK_COLORS: Record<LandmarkKind, string> = {
  process: '#ffa94d', // processes, tubercles, tuberosities, trochanters, condyles, epicondyles, heads, malleoli, spines
  fossa: '#9b8cff', // fossae, notches, impressions, sinuses
  line: '#ffe066', // lines, crests, borders, ridges, lips, grooves (sulci)
  surface: '#3ddcf0', // articular facets and surfaces, trochlea, capitulum, areas
  foramen: '#4ade80', // foramina, canals, apertures, foveae and small pits
  part: '#2f7bd6', // bodies, necks, rami, angles, bases of a bone
};

/** Legend text for each kind (Latin, English, Indonesian). */
export const LANDMARK_KIND_LABELS: Record<LandmarkKind, { la: string; en: string; id: string }> = {
  process: { la: 'Processus, tubercula, capita', en: 'Processes, tubercles, heads', id: 'Prosesus, tuberkulum, kaput' },
  fossa: { la: 'Fossae et incisurae', en: 'Fossae and notches', id: 'Fossa dan insisura' },
  line: { la: 'Lineae, cristae, margines, sulci', en: 'Lines, crests, borders, grooves', id: 'Linea, krista, margo, sulkus' },
  surface: { la: 'Facies et facies articulares', en: 'Surfaces and articular facets', id: 'Permukaan dan faset sendi' },
  foramen: { la: 'Foramina et canales', en: 'Foramina and canals', id: 'Foramen dan kanalis' },
  part: { la: 'Partes', en: 'Parts such as bodies, necks and bases', id: 'Bagian seperti korpus, kolum, dan basis' },
};

/** Decal radius range in metres (min for small bones, max for long bones). */
export const LANDMARK_RADIUS: Record<LandmarkKind, [number, number]> = {
  process: [0.009, 0.014],
  fossa: [0.012, 0.02],
  surface: [0.012, 0.02],
  line: [0.006, 0.008],
  foramen: [0.004, 0.006],
  part: [0.012, 0.02],
};

const RX: [LandmarkKind, RegExp][] = [
  ['foramen', /foram|canal|apertur|hiatus|porus|meatus|ostium|opening|fovea|foveol|\bpits?\b|orific/i],
  ['line', /\bline|linea|crest|crista|border|margo|margin|ridge|\blip\b|labium|groove|sulc|lineae|spiral|arcuate/i],
  ['surface', /facet|facies|surface|articular|trochlea|capitul|plateau|\barea\b|acetabul|lunate surface|circumferen/i],
  ['fossa', /fossa|notch|incisur|impress|depress|cavit|recess|sinus|hollow|concav|groove of|vallecul/i],
  ['process', /process|tubercl|tubercul|tuberos|trochanter|condyl|epicondyl|\bhead\b|caput|capitis|malleol|spine\b|spina|spinous|protuber|eminen|apex|hamul|hook|styloid|coracoid|acromi|olecran|horn|cornu|promin|sustentacul|tuber\b|dens\b/i],
  ['part', /body|corpus|neck|collum|shaft|ramus|\bala\b|wing|angle|angul|base\b|basis/i],
];

/** Kind of a landmark from its English and/or Latin name. */
export function landmarkKind(name: string): LandmarkKind {
  for (const [k, re] of RX) if (re.test(name)) return k;
  return 'part';
}

/** Decal radius (m) for a landmark kind on a bone of bounding radius `boneRadius` (m). */
export function landmarkRadius(kind: LandmarkKind, boneRadius: number): number {
  const [a, b] = LANDMARK_RADIUS[kind];
  const t = Math.max(0, Math.min(1, (boneRadius - 0.012) / 0.2));
  return a + (b - a) * t;
}
