// Small spaced-repetition store (SM-2 style) kept in localStorage on this device.

export interface CardState {
  due: number; // ms timestamp
  ivl: number; // days
  ease: number;
  reps: number;
  lapses: number;
  seen: number;
  right: number;
  last: number;
}

const KEY = 'raga.srs.v1';
const DAY = 86_400_000;

let cache: Record<string, CardState> | null = null;

function load(): Record<string, CardState> {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    cache = {};
  }
  return cache!;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache ?? {}));
  } catch {
    /* storage can be blocked (private mode); progress then lives for this session only */
  }
}

export function getCard(id: string): CardState | undefined {
  return load()[id];
}

export function allCards() {
  return load();
}

export function review(id: string, correct: boolean, typo = false) {
  const db = load();
  const now = Date.now();
  const c: CardState = db[id] ?? { due: now, ivl: 0, ease: 2.5, reps: 0, lapses: 0, seen: 0, right: 0, last: 0 };
  c.seen += 1;
  c.last = now;
  if (correct) {
    c.right += 1;
    c.reps += 1;
    const q = typo ? 3 : 4;
    c.ease = Math.max(1.3, c.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    c.ivl = c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(c.ivl * c.ease);
    c.due = now + c.ivl * DAY;
  } else {
    c.lapses += 1;
    c.reps = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.ivl = 0;
    c.due = now + 10 * 60_000;
  }
  db[id] = c;
  save();
  return c;
}

export function resetAll() {
  cache = {};
  save();
}

export function isDue(id: string, now = Date.now()) {
  const c = load()[id];
  return !!c && c.due <= now;
}

export function mastered(c?: CardState) {
  return !!c && c.ivl >= 7;
}
