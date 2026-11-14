// The quiz session in progress, kept on this device so a reload or a closed tab does not throw it away.

export interface SavedAnswer {
  id: string; // card id of the question
  ok: boolean;
  typo: boolean;
  input: string;
  overridden?: boolean;
  /** The station could not be shown (its models did not load), so it is not scored. */
  unscored?: boolean;
}

export interface SavedSession {
  v: 1;
  /** Deck the session was started from, or null for a mixed one (due cards, one structure). */
  deck: string | null;
  mode: 'practice' | 'exam';
  /** Multiple choice instead of typing. */
  choice: boolean;
  ids: string[];
  answers: SavedAnswer[];
  /** Fixes the order of the multiple-choice options. */
  seed: string;
  /** When it was last touched (ms). */
  at: number;
}

const KEY = 'raga.quiz.session.v1';
const MAX_AGE = 3 * 86_400_000;

export function loadSession(now = Date.now()): SavedSession | null {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null') as SavedSession | null;
    if (!s || s.v !== 1 || !Array.isArray(s.ids) || !s.ids.length || !Array.isArray(s.answers)) return null;
    if (s.ids.some((x) => typeof x !== 'string') || s.answers.some((a) => !a || typeof a.id !== 'string')) return null;
    if (s.answers.length >= s.ids.length || now - (s.at || 0) > MAX_AGE) return null;
    return { ...s, mode: s.mode === 'exam' ? 'exam' : 'practice', choice: !!s.choice, seed: String(s.seed ?? '') };
  } catch {
    return null;
  }
}

export function saveSession(s: SavedSession | null) {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch {
    /* storage can be blocked (private mode); the session then lasts until the page closes */
  }
}
