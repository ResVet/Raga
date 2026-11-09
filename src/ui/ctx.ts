import { createContext, useContext } from 'react';
import type { Engine } from '../engine/Engine';
import type { DB } from '../data/db';
import type { Strings } from '../i18n';
import type { Lang, PackId } from '../data/types';
import type { LayerId, RegionId } from '../engine/layers';
import type { ClipAxis, ColorMode } from '../engine/Engine';

export type Quality = 'ultra' | 'high' | 'lite';
export const QUALITIES: Quality[] = ['ultra', 'high', 'lite'];

/** Effect switches the engine exposes through `setEffects` (see docs/ENGINE_API.md, Effects). */
export interface Effects {
  shadows: boolean;
  dof: boolean;
  bloom: boolean;
  ao: boolean;
  adaptive: boolean;
}
export const EFFECT_KEYS: (keyof Effects)[] = ['shadows', 'dof', 'bloom', 'ao', 'adaptive'];

/** Fallback defaults per tier, used only when the engine cannot report its own. */
export const TIER_EFFECTS: Record<Quality, Effects> = {
  ultra: { shadows: true, dof: true, bloom: true, ao: true, adaptive: true },
  high: { shadows: true, dof: false, bloom: true, ao: true, adaptive: true },
  lite: { shadows: false, dof: false, bloom: false, ao: false, adaptive: true },
};

export interface Settings {
  lang: Lang;
  quality: Quality;
  /** Switches the user changed on top of the tier defaults. Cleared when the tier changes. */
  effects: Partial<Effects>;
  acceptEnglish: boolean;
  requireSide: boolean;
  examSeconds: number;
}

export type Selection =
  | { type: 'structure'; id: string }
  | { type: 'landmark'; lm: import('../data/types').LandmarkRec }
  | { type: 'concept'; key: string; ids: string[] }
  | null;

export interface AppCtx {
  engine: Engine;
  db: DB;
  t: Strings;
  settings: Settings;
  setSettings: (s: Partial<Settings>) => void;
  ensureLayers: (layers: LayerId[]) => Promise<void>;
  ensurePacks: (packs: PackId[]) => Promise<void>;
  packProgress: Partial<Record<PackId, number>>;
  toast: (msg: string, action?: { label: string; run: () => void }) => void;
  base: string;
  compact: boolean;
  /** Effect defaults of the running graphics tier, and whether the engine can switch them. */
  fxDefaults: Effects;
  fxSupported: boolean;
}

export interface AtlasState {
  layers: Record<LayerId, boolean>;
  opacity: Record<LayerId, number>;
  region: RegionId | null;
  explode: number;
  clip: { axis: ClipAxis; t: number; flip: boolean } | null;
  side: 'both' | 'l' | 'r';
  xray: boolean;
  colorMode: ColorMode;
}

export const Ctx = createContext<AppCtx | null>(null);

export function useApp(): AppCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('App context missing');
  return c;
}

const SKEY = 'raga.settings.v1';
const NOTICE = 'raga.notice.v1';

export function loadSettings(): Settings {
  const def: Settings = {
    lang: typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en',
    quality: 'ultra',
    effects: {},
    acceptEnglish: false,
    requireSide: false,
    examSeconds: 60,
  };
  try {
    const raw = JSON.parse(localStorage.getItem(SKEY) || '{}') as Partial<Settings>;
    const s: Settings = { ...def, ...raw };
    if (!QUALITIES.includes(s.quality)) s.quality = 'ultra';
    if (s.lang !== 'en' && s.lang !== 'id') s.lang = def.lang;
    if (!s.effects || typeof s.effects !== 'object') s.effects = {};
    return s;
  } catch {
    return def;
  }
}

export function saveSettings(s: Settings) {
  try {
    localStorage.setItem(SKEY, JSON.stringify(s));
  } catch {
    /* storage can be blocked; settings then last for this visit */
  }
}

/** A message to show once after the next reload (used when the graphics tier had to drop). */
export function setNotice(key: string) {
  try {
    localStorage.setItem(NOTICE, key);
  } catch {
    /* ignore */
  }
}

export function takeNotice(): string | null {
  try {
    const v = localStorage.getItem(NOTICE);
    if (v) localStorage.removeItem(NOTICE);
    return v;
  } catch {
    return null;
  }
}
