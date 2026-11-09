import { LAYERS, type LayerId } from '../engine/layers';

// The dissection depth gauge groups the engine layers into eight stops, from superficial to deep.
export interface Stop {
  id: string;
  la: string;
  en: string;
  idn: string;
  layers: LayerId[];
  peel: { en: string; id: string };
}

export const STOPS: Stop[] = [
  { id: 'cutis', la: 'Cutis', en: 'Skin', idn: 'Kulit', layers: ['skin'], peel: { en: 'Cover with skin', id: 'Tutup dengan kulit' } },
  { id: 'fasciae', la: 'Fasciae', en: 'Fasciae', idn: 'Fascia', layers: ['fasciae'], peel: { en: 'Peel to fasciae', id: 'Kupas sampai fascia' } },
  { id: 'musculi', la: 'Musculi', en: 'Muscles', idn: 'Otot', layers: ['muscles'], peel: { en: 'Peel to muscles', id: 'Kupas sampai otot' } },
  { id: 'vasa', la: 'Vasa', en: 'Vessels', idn: 'Pembuluh', layers: ['arteries', 'veins'], peel: { en: 'Peel to vessels', id: 'Kupas sampai pembuluh' } },
  { id: 'nervi', la: 'Nervi', en: 'Nerves', idn: 'Saraf', layers: ['nerves'], peel: { en: 'Peel to nerves', id: 'Kupas sampai saraf' } },
  { id: 'viscera', la: 'Viscera', en: 'Organs', idn: 'Organ dalam', layers: ['heart', 'respiratory', 'organs', 'lymphoid'], peel: { en: 'Peel to organs', id: 'Kupas sampai organ dalam' } },
  { id: 'juncturae', la: 'Juncturae', en: 'Joints', idn: 'Sendi', layers: ['joints'], peel: { en: 'Peel to joints', id: 'Kupas sampai sendi' } },
  { id: 'ossa', la: 'Ossa', en: 'Bones', idn: 'Tulang', layers: ['skeleton'], peel: { en: 'Peel to bones', id: 'Kupas sampai tulang' } },
];

export type LayerMap = Record<LayerId, boolean>;
export type StopState = 'on' | 'off' | 'partial';

export function stopState(layers: LayerMap, s: Stop): StopState {
  const n = s.layers.filter((l) => layers[l]).length;
  return n === 0 ? 'off' : n === s.layers.length ? 'on' : 'partial';
}

/** Index of the most superficial stop that shows anything (the handle sits just above it). */
export function depthOf(layers: LayerMap): number {
  const i = STOPS.findIndex((s) => s.layers.some((l) => layers[l]));
  return i < 0 ? STOPS.length - 1 : i;
}

/** Peel to stop h: everything above it goes, stop h is shown, deeper stops keep their own state. */
export function peelPatch(layers: LayerMap, h: number): Partial<LayerMap> {
  const patch: Partial<LayerMap> = {};
  STOPS.forEach((s, i) => {
    if (i < h) s.layers.forEach((l) => (patch[l] = false));
  });
  const target = STOPS[h];
  if (!target.layers.some((l) => layers[l])) target.layers.forEach((l) => (patch[l] = true));
  return patch;
}

export function togglePatch(layers: LayerMap, s: Stop): Partial<LayerMap> {
  const on = s.layers.some((l) => layers[l]);
  return Object.fromEntries(s.layers.map((l) => [l, !on])) as Partial<LayerMap>;
}

/** Colour chip for a stop: the swatches of its layers as slices of one dot. */
export function stopSwatch(s: Stop) {
  const cols = s.layers.map((l) => LAYERS.find((x) => x.id === l)!.swatch);
  if (cols.length === 1) return cols[0];
  const step = 360 / cols.length;
  return `conic-gradient(${cols.map((c, i) => `${c} ${i * step}deg ${(i + 1) * step}deg`).join(', ')})`;
}

export const layerName = (id: LayerId, lang: 'en' | 'id') => {
  const l = LAYERS.find((x) => x.id === id)!;
  return lang === 'id' ? l.idn : l.en;
};
