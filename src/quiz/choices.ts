// Multiple-choice options for a question: the right answer plus wrong ones taken from the other questions of the deck.
import { norm } from '../data/text';
import { grade } from './grader';
import { optionText, type QType, type Question } from './decks';

export interface Choice {
  text: string;
  ok: boolean;
}

/** A small seeded generator (mulberry32), so a station shows the same options again after a reload. */
export function seeded(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(list: T[], rand: () => number): T[] {
  const r = list.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Words that say what kind of thing a name is, not which one.
const FILLER = new Set(['musculus', 'musculi', 'nervus', 'nervi', 'arteria', 'arteriae', 'vena', 'venae', 'ramus', 'rami', 'os', 'ossis', 'pars', 'caput', 'et', 'dan', 'and', 'of', 'the']);

function words(s: string): Set<string> {
  return new Set(norm(s).split(' ').filter((w) => w && !FILLER.has(w)));
}

/** Two attachment or nerve answers that share most of their words are too close for one to be plainly wrong. */
function overlaps(a: Set<string>, b: Set<string>): boolean {
  if (!a.size || !b.size) return false;
  let both = 0;
  for (const w of a) if (b.has(w)) both++;
  if (both === a.size || both === b.size) return true;
  return both / (a.size + b.size - both) >= 0.6;
}

// Movements, written the Latin, English and Indonesian way. A muscle that flexes cannot have "flexio ..." as a wrong option.
const MOVES: [string, RegExp][] = [
  ['flex', /fle[xk]s?/],
  ['ext', /e[xk]s?ten[sd]/],
  ['abd', /abdu[ck]/],
  ['add', /addu[ck]/],
  ['rot', /rota[ts]/],
  ['pron', /prona[ts]/],
  ['sup', /supina[ts]/],
  ['protr', /protra[ck]/],
  ['retr', /retra[ck]/],
  ['elev', /eleva[ts]/],
  ['depr', /depres/],
  ['opp', /op+o[sn]/],
  ['inv', /inver[st]/],
  ['ev', /e[vw]er[st]/],
];

function moves(text: string): Set<string> {
  const t = norm(text);
  const out = new Set<string>();
  for (const [code, re] of MOVES) if (re.test(t)) out.add(code);
  return out;
}

const CLOSE_TYPES: QType[] = ['origin', 'insertion', 'nerve', 'from', 'drains', 'continues'];

export interface ChoiceOpts {
  /** Language of the case options. */
  lang?: 'en' | 'id';
  /** Names that must not show up as an option (the structure the question is about). */
  exclude?: string[];
  /** Everything known about the right answer, to keep arguable options out (the full action text of a muscle). */
  context?: string;
  count?: number;
}

/**
 * Options for `q`, or null when the question has to be typed (find-it questions, or too few usable wrong answers).
 * `pool` is the deck the question comes from. The same seed gives the same options in the same order.
 */
export function choicesFor(q: Question, pool: Question[], seed: string, o: ChoiceOpts = {}): Choice[] | null {
  if (q.type === 'find') return null;
  const rand = seeded(`${seed}|${q.id}`);
  if (q.case) {
    const list = q.case.options.map((opt, i) => ({ text: optionText(opt, o.lang ?? 'en'), ok: i === 0 })).filter((c) => c.text);
    return list.length >= 3 ? shuffled(list, rand) : null;
  }
  const want = (o.count ?? 4) - 1;
  const right = q.oneOf?.length ? q.oneOf[Math.floor(rand() * q.oneOf.length)] : q.display;
  const taken = new Set<string>([norm(right), ...(o.exclude ?? []).map(norm)]);
  const rightWords = words(right);
  const rightMoves = q.type === 'action' ? moves([q.answers.join(' '), o.context ?? ''].join(' ')) : null;
  const cands: { text: string; near: boolean; r: number }[] = [];
  for (const other of pool) {
    if (other.type !== q.type || other.key === q.key) continue;
    for (const text of other.oneOf ?? [other.display]) {
      const n = norm(text);
      if (!n || taken.has(n)) continue;
      taken.add(n);
      const r = rand();
      if (grade(text, q.answers).ok) continue;
      if (CLOSE_TYPES.includes(q.type) && overlaps(words(text), rightWords)) continue;
      if (rightMoves) {
        const m = moves(text);
        if (m.size && [...m].every((x) => rightMoves.has(x))) continue;
      }
      cands.push({ text, near: !!q.group && other.group === q.group, r });
    }
  }
  if (cands.length < 2) return null;
  cands.sort((a, b) => Number(b.near) - Number(a.near) || a.r - b.r);
  const wrong = cands.slice(0, want).map((c) => ({ text: c.text, ok: false }));
  return shuffled([{ text: right, ok: true }, ...wrong], rand);
}
