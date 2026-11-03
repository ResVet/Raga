import { editDistance, norm } from '../data/text';

// Category words students may or may not write in front of a name.
const PREFIX = new Set([
  'os', 'ossa', 'musculus', 'musculi', 'm', 'mm', 'nervus', 'nervi', 'n', 'nn', 'arteria', 'arteriae', 'a', 'aa',
  'vena', 'venae', 'v', 'vv', 'ligamentum', 'ligamenta', 'lig', 'ligg', 'articulatio', 'articulationes', 'art', 'artic',
  'the', 'otot', 'tulang', 'saraf', 'sendi', 'pars', 'caput',
]);
// Sides, which only count when the "require side" setting is on.
const SIDE = new Set(['dexter', 'dextra', 'dextrum', 'dextri', 'dextrae', 'sinister', 'sinistra', 'sinistrum', 'sinistri', 'sinistrae', 'right', 'left', 'kanan', 'kiri', 'dx', 'sin']);
// Genitive qualifiers that may trail a landmark name ("tuberculum majus humeri").
const QUAL = new Set([
  'humeri', 'femoris', 'tibiae', 'fibulae', 'radii', 'ulnae', 'scapulae', 'claviculae', 'sterni', 'costae', 'vertebrae', 'sacri',
  'coccygis', 'patellae', 'tali', 'calcanei', 'ossis', 'coxae', 'ilii', 'ischii', 'pubis', 'metacarpi', 'metatarsi', 'phalangis',
  'manus', 'pedis', 'cranii', 'mandibulae', 'maxillae', 'hyoidei', 'cordis', 'pulmonis', 'laryngis', 'humeralis', 'brachii',
  'antebrachii', 'cruris', 'carpi', 'tarsi', 'digiti', 'digitorum', 'pollicis', 'hallucis',
]);
const ROMAN: Record<string, string> = { i: '1', ii: '2', iii: '3', iv: '4', v: '5', vi: '6', vii: '7', viii: '8', ix: '9', x: '10', xi: '11', xii: '12' };
// Spelling variants that are both correct.
const SYN: [RegExp, string][] = [
  [/\bperone/g, 'fibular'],
  [/\bfibulari/g, 'fibulari'],
  [/\bpraecox/g, 'precox'],
  [/\bcoeli/g, 'celi'],
  [/\boesoph/g, 'esoph'],
  [/ae\b/g, 'ae'],
];

function tokens(s: string, keepSide: boolean): string[] {
  let t = norm(s);
  for (const [re, rep] of SYN) t = t.replace(re, rep);
  let out = t.split(' ').filter(Boolean);
  while (out.length > 1 && PREFIX.has(out[0])) out.shift();
  if (!keepSide) out = out.filter((w) => !SIDE.has(w));
  out = out.map((w, i) => (i > 0 && ROMAN[w] ? ROMAN[w] : w));
  return out;
}

export interface Verdict {
  ok: boolean;
  typo: boolean;
  matched: string | null;
  distance: number;
}

function threshold(len: number) {
  if (len <= 4) return 0;
  if (len <= 8) return 1;
  if (len <= 16) return 2;
  return 3;
}

function onlyQualifiers(ws: string[]) {
  return ws.length <= 2 && ws.every((w) => QUAL.has(w));
}

export function grade(input: string, accepted: string[], opts: { requireSide?: boolean; side?: 'l' | 'r' | null } = {}): Verdict {
  const ui = tokens(input, !!opts.requireSide);
  const none: Verdict = { ok: false, typo: false, matched: null, distance: 99 };
  if (!ui.length || ui.join('').length < 2) return none;
  if (opts.requireSide && opts.side) {
    const raw = norm(input).split(' ');
    const wantsR = opts.side === 'r';
    const saysR = raw.some((w) => ['dexter', 'dextra', 'dextrum', 'dextri', 'dextrae', 'right', 'kanan', 'dx'].includes(w));
    const saysL = raw.some((w) => ['sinister', 'sinistra', 'sinistrum', 'sinistri', 'sinistrae', 'left', 'kiri', 'sin'].includes(w));
    if ((wantsR && !saysR) || (!wantsR && !saysL)) return none;
  }
  const uiNoSide = ui.filter((w) => !SIDE.has(w));
  let best: Verdict = none;
  for (const a of accepted) {
    const at = tokens(a, false);
    if (!at.length) continue;
    const us = uiNoSide.join(' ');
    const as = at.join(' ');
    if (us === as) return { ok: true, typo: false, matched: a, distance: 0 };
    // qualifier tolerance: "tuberculum majus humeri" vs "tuberculum majus"
    const shorter = uiNoSide.length <= at.length ? uiNoSide : at;
    const longer = uiNoSide.length <= at.length ? at : uiNoSide;
    if (shorter.every((w, i) => longer[i] === w) && onlyQualifiers(longer.slice(shorter.length))) {
      return { ok: true, typo: false, matched: a, distance: 0 };
    }
    const uj = uiNoSide.join('');
    const aj = at.join('');
    const d = editDistance(uj, aj, 4);
    const thr = threshold(aj.length);
    if (d <= thr && d < best.distance) best = { ok: true, typo: d > 0, matched: a, distance: d };
    // typo plus trailing qualifier
    if (!best.ok && uiNoSide.length > at.length && onlyQualifiers(uiNoSide.slice(at.length))) {
      const d2 = editDistance(uiNoSide.slice(0, at.length).join(''), aj, 4);
      if (d2 <= thr && d2 < best.distance) best = { ok: true, typo: d2 > 0, matched: a, distance: d2 };
    }
  }
  return best;
}
