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

// Words that tell neighbouring structures apart. A slip is only forgiven when it does not
// turn one of these into another (externus/internus, major/minor, longus/brevis ...).
const CRITICAL = [
  'externus', 'internus', 'externa', 'interna', 'externi', 'interni', 'externae', 'internae', 'superior', 'inferior', 'superius',
  'inferius', 'superiores', 'inferiores', 'anterior', 'posterior', 'anterius', 'posterius', 'anteriores', 'posteriores', 'medialis',
  'lateralis', 'mediale', 'laterale', 'medius', 'media', 'medium', 'major', 'minor', 'majus', 'minus', 'longus', 'brevis', 'longum',
  'breve', 'longa', 'profundus', 'superficialis', 'profunda', 'profundum', 'superficiale', 'proximalis', 'distalis', 'proximale',
  'distale', 'ulnaris', 'radialis', 'ulnare', 'radiale', 'magnus', 'maximus', 'minimus', 'tertius', 'primus', 'secundus', 'flexor',
  'extensor', 'abductor', 'adductor', 'pronator', 'supinator', 'tibialis', 'fibularis', 'palmaris', 'plantaris', 'dorsalis',
  'palmares', 'plantares', 'dorsales', 'capitis', 'colli', 'thoracis', 'lumborum', 'carpi', 'digitorum', 'pollicis', 'hallucis',
  'indicis', 'minimi', 'dexter', 'sinister', 'dextra', 'sinistra', 'ascendens', 'descendens', 'transversus', 'obliquus', 'rectus',
  'teres', 'quadratus', 'humeri', 'femoris', 'tibiae', 'fibulae', 'radii', 'ulnae', 'cranialis', 'caudalis', 'arteria', 'vena',
  'nervus', 'cubiti', 'genus', 'coxae', 'pubis', 'ilii', 'ischii', 'mediana', 'medianus', 'coracoideus', 'coronoideus',
  'coracoidea', 'coronoidea', 'coracoideum', 'ilium', 'ileum', 'metacarpi', 'metatarsi', 'metacarpalis', 'metatarsalis',
  'metacarpale', 'metatarsale', 'metacarpeae', 'metatarseae', 'malleus', 'malleolus', 'trochlea', 'trochlearis', 'humeralis',
  'femoralis', 'cervicalis', 'thoracica', 'lumbalis', 'sacralis', 'costalis', 'vertebralis', 'sternalis', 'acromialis',
];
// same structure, different (or wrong) ending: still the right answer
const SAME: Record<string, string> = { majus: 'major', major: 'majus', minus: 'minor', minor: 'minus' };

function sameStem(a: string, b: string) {
  if (SAME[a] === b) return true;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i >= 5 && i >= Math.min(a.length, b.length) - 3;
}
const CRIT = new Set(CRITICAL);

function tokThreshold(len: number) {
  if (len <= 4) return 0;
  if (len <= 8) return 1;
  return 2;
}

/** Can user token `u` be read as a misspelling of expected token `e`? */
function tokenClose(u: string, e: string): number {
  if (u === e) return 0;
  if ((CRIT.has(u) || CRIT.has(e)) && sameStem(u, e)) return 1;
  const d = editDistance(u, e, 3);
  if (d > tokThreshold(e.length)) return -1;
  // a slip must not land on, or near, a different discriminating word
  if (CRIT.has(e) || CRIT.has(u)) {
    if (CRIT.has(u)) return -1;
    for (const c of CRITICAL) if (c !== e && editDistance(u, c, 2) <= d) return -1;
  }
  return d;
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
  const u = ui.filter((w) => !SIDE.has(w));
  let best: Verdict = none;
  for (const a of accepted) {
    const e = tokens(a, false);
    if (!e.length) continue;
    if (u.join(' ') === e.join(' ')) return { ok: true, typo: false, matched: a, distance: 0 };
    // optional trailing genitive ("tuberculum majus humeri" or "tuberculum majus")
    const shorter = u.length <= e.length ? u : e;
    const longer = u.length <= e.length ? e : u;
    if (shorter.every((w, i) => longer[i] === w) && onlyQualifiers(longer.slice(shorter.length))) {
      return { ok: true, typo: false, matched: a, distance: 0 };
    }
    // word-by-word spelling tolerance
    const tryAligned = (uu: string[], ee: string[]) => {
      if (uu.length !== ee.length) return -1;
      let total = 0;
      for (let i = 0; i < ee.length; i++) {
        const d = tokenClose(uu[i], ee[i]);
        if (d < 0) return -1;
        total += d;
      }
      return total;
    };
    let d = tryAligned(u, e);
    if (d < 0 && u.length > e.length && onlyQualifiers(u.slice(e.length))) d = tryAligned(u.slice(0, e.length), e);
    if (d < 0 && e.length > u.length && onlyQualifiers(e.slice(u.length))) d = tryAligned(u, e.slice(0, u.length));
    // spacing differences ("aryepiglotticus" vs "ary epiglotticus"): one slip at most
    if (d < 0 && u.length !== e.length) {
      const dj = editDistance(u.join(''), e.join(''), 2);
      const critOk = e.filter((w) => CRIT.has(w)).every((w) => u.join('').includes(w));
      if (dj <= 1 && critOk) d = dj;
    }
    if (d >= 0 && d < best.distance) best = { ok: true, typo: d > 0, matched: a, distance: d };
  }
  return best;
}
