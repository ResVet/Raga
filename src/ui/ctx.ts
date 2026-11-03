import { createContext, useContext } from 'react';
import type { Engine } from '../engine/Engine';
import type { DB } from '../data/db';
import type { Strings } from '../i18n';
import type { Lang, LandmarkRec, PackId } from '../data/types';
import type { LayerId } from '../engine/layers';

export interface Settings {
  lang: Lang;
  quality: 'high' | 'lite';
  acceptEnglish: boolean;
  requireSide: boolean;
  examSeconds: number;
}

export type Selection =
  | { type: 'structure'; id: string }
  | { type: 'landmark'; lm: LandmarkRec }
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
  toast: (msg: string) => void;
  base: string;
}

export const Ctx = createContext<AppCtx | null>(null);

export function useApp(): AppCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('App context missing');
  return c;
}

const SKEY = 'raga.settings.v1';

export function loadSettings(): Settings {
  const coarse = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
  const small = typeof window !== 'undefined' && Math.min(window.innerWidth, window.innerHeight) < 700;
  const mem = (navigator as any).deviceMemory as number | undefined;
  const def: Settings = {
    lang: navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en',
    quality: (coarse && small) || (mem !== undefined && mem <= 4) ? 'lite' : 'high',
    acceptEnglish: false,
    requireSide: false,
    examSeconds: 60,
  };
  try {
    return { ...def, ...JSON.parse(localStorage.getItem(SKEY) || '{}') };
  } catch {
    return def;
  }
}

export function saveSettings(s: Settings) {
  try {
    localStorage.setItem(SKEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}
