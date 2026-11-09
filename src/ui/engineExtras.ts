// Parts of the engine contract that are being built in parallel (docs/ENGINE_API.md): the motion player,
// context-loss events and effect switches. Every access is guarded, so the interface builds and runs with
// or without them, and simply hides what the engine cannot do yet.
import type { Engine } from '../engine/Engine';
import type { DB } from '../data/db';
import type { LandmarkRec, PackId } from '../data/types';
import type { Effects, Quality } from './ctx';

export type JointId = 'shoulder' | 'elbow' | 'radioulnar' | 'wrist' | 'hip' | 'knee' | 'ankle' | 'subtalar';
export type MovementId =
  | 'flexion' | 'extension' | 'abduction' | 'adduction' | 'medial-rotation' | 'lateral-rotation'
  | 'pronation' | 'supination' | 'radial-deviation' | 'ulnar-deviation'
  | 'dorsiflexion' | 'plantarflexion' | 'inversion' | 'eversion';

export interface MotionClip {
  id: string;
  side: 'l' | 'r';
  moves: { joint: JointId; movement: MovementId; deg: number }[];
  muscles: string[];
  stretch: string[];
  label: { la: string; en: string; id: string };
  packs: PackId[];
}

export interface MotionState {
  clip: MotionClip | null;
  t: number;
  playing: boolean;
  angles: number[];
}

export interface MotionPlayer {
  play(clip: MotionClip, opts?: { loop?: boolean; speed?: number }): void;
  pause(): void;
  resume(): void;
  stop(): void;
  scrub(t: number): void;
  setSpeed(x: number): void;
  setLoop(on: boolean): void;
  state(): MotionState;
  onTick(cb: () => void): () => void;
}

export interface MotionModule {
  clipsForKey(db: DB, key: string, side: 'l' | 'r'): MotionClip[];
  jointClips(db: DB, side: 'l' | 'r'): MotionClip[];
}

interface Extras {
  motion?: MotionPlayer;
  onContextLost?: (cb: () => void) => (() => void) | void;
  setEffects?: (e: Partial<Effects>) => void;
  getEffects?: () => Partial<Effects> | undefined;
  setLandmarkAreas?: (list: LandmarkRec[], highlight?: string | null) => void;
}

const extras = (e: Engine) => e as unknown as Extras;

export function motionPlayer(e: Engine | null): MotionPlayer | null {
  if (!e) return null;
  try {
    const m = extras(e).motion;
    return m && typeof m.play === 'function' && typeof m.state === 'function' && typeof m.onTick === 'function' ? m : null;
  } catch {
    return null;
  }
}

// The motion module is looked up with a glob, so the build passes whether or not the file exists yet.
const motionFiles = import.meta.glob<MotionModule>('../engine/motion.ts');
let motionModule: Promise<MotionModule | null> | null = null;

export function loadMotionModule(): Promise<MotionModule | null> {
  if (!motionModule) {
    const load = motionFiles['../engine/motion.ts'];
    motionModule = load
      ? load()
          .then((m) => (m && typeof m.clipsForKey === 'function' && typeof m.jointClips === 'function' ? m : null))
          .catch(() => null)
      : Promise.resolve(null);
  }
  return motionModule;
}

export function onContextLost(e: Engine, cb: () => void): () => void {
  const f = extras(e).onContextLost;
  if (typeof f !== 'function') return () => {};
  const off = f.call(e, cb);
  return typeof off === 'function' ? off : () => {};
}

export function supportsEffects(e: Engine | null) {
  return !!e && typeof extras(e).setEffects === 'function';
}

/** Defaults of the running tier: what the engine reports, or the fallback table. */
export function tierEffects(e: Engine | null, q: Quality, fallback: Record<Quality, Effects>): Effects {
  const base = { ...fallback[q] };
  if (!e) return base;
  try {
    const f = extras(e).getEffects;
    const got = typeof f === 'function' ? f.call(e) : undefined;
    if (got) for (const k of Object.keys(base) as (keyof Effects)[]) if (typeof got[k] === 'boolean') base[k] = got[k]!;
  } catch {
    /* keep the fallback */
  }
  return base;
}

export function applyEffects(e: Engine | null, fx: Effects) {
  if (!e) return;
  const f = extras(e).setEffects;
  if (typeof f === 'function') {
    try {
      f.call(e, fx);
    } catch {
      /* an engine that rejects a switch keeps its own settings */
    }
  }
}

// ------------------------------------------------------------------ landmark kinds and colours
// The engine paints coloured areas for landmarks and exports its classifier and palette. Until it does,
// the same groups come from the Latin and English names, with a fallback palette.
export type LmKind = 'process' | 'fossa' | 'line' | 'articular' | 'foramen' | 'other';
export const LM_KINDS: LmKind[] = ['process', 'fossa', 'line', 'articular', 'foramen'];
const FALLBACK_COLORS: Record<LmKind, string> = {
  process: '#f2b33d',
  fossa: '#3fc5e8',
  line: '#e07cf0',
  articular: '#9bd94b',
  foramen: '#f4f1ea',
  other: '#b3abdc',
};

type LmModule = { landmarkKind?: (x: unknown) => unknown; LANDMARK_COLORS?: Record<string, unknown> };
const engineModules = Object.values(import.meta.glob<LmModule>('../engine/*.ts', { eager: true }));
const kindModule = engineModules.find((m) => m && typeof m.landmarkKind === 'function');
const colorTable = engineModules.find((m) => m && m.LANDMARK_COLORS && typeof m.LANDMARK_COLORS === 'object')?.LANDMARK_COLORS;

/** Map whatever id the engine uses for a kind onto the five groups of the legend. */
function normKind(k: unknown): LmKind | null {
  const s = String(k ?? '').toLowerCase();
  if (!s) return null;
  if (/foram|canal|hole|meatus/.test(s)) return 'foramen';
  if (/artic|joint|facet|surface/.test(s)) return 'articular';
  if (/foss|notch|fovea|sulc|groove|depress|incis/.test(s)) return 'fossa';
  if (/line|border|margin|crest|ridge|labi/.test(s)) return 'line';
  if (/process|tuber|spine|promin|trochant|epicon|malleol|eminen/.test(s)) return 'process';
  if (s === 'other' || s === 'none' || s === 'part') return 'other';
  return null;
}

function classifyByName(name: string): LmKind {
  const n = name.toLowerCase();
  if (/foramen|foramina|canalis|\bcanal\b|meatus|porus|hiatus|apertura|ostium/.test(n)) return 'foramen';
  if (/epicondyl/.test(n)) return 'process';
  if (/articular|condyl|trochlea|capitul|glenoid|acetabul|facet|caput (humeri|femoris|radii|ulnae|fibulae|costae|mandibulae|tali)|\bhead of|incisura (trochlearis|radialis|ulnaris)|(trochlear|radial|ulnar) notch/.test(n)) return 'articular';
  if (/fossa|fovea|incisura|notch|sulcus|groove|impressio|recessus|depression/.test(n)) return 'fossa';
  if (/linea|\bline\b|margo|margin|border|crista|crest|labium|\blip\b|angulus|\bangle\b|ridge/.test(n)) return 'line';
  if (/process|tubercul|tubercle|tuberositas|tuberosity|\btuber\b|spina|spine|trochanter|malleol|protuberan|eminen|hamulus|cornu|\bhorn\b|olecranon|acromion|apex|styloid|coracoid/.test(n)) return 'process';
  return 'other';
}

export function landmarkKindOf(lm: LandmarkRec, latin: string): LmKind {
  if (kindModule?.landmarkKind) {
    try {
      // the same string the engine uses for its decals, so the list and the model agree on colour
      const k = normKind(kindModule.landmarkKind(`${lm.en} ${lm.la ?? ''}`));
      if (k) return k;
    } catch {
      /* fall back to the names */
    }
  }
  return classifyByName(`${latin} ${lm.en}`);
}

export function landmarkColor(kind: LmKind): string {
  if (colorTable) for (const [k, v] of Object.entries(colorTable)) if (typeof v === 'string' && normKind(k) === kind) return v;
  return FALLBACK_COLORS[kind];
}

export function setLandmarkAreas(e: Engine | null, list: LandmarkRec[], highlight: string | null) {
  if (!e) return;
  const f = extras(e).setLandmarkAreas;
  if (typeof f === 'function') {
    try {
      f.call(e, list, highlight);
    } catch {
      /* areas are optional */
    }
  }
}
