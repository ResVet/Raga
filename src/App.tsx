import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Engine, type Tint } from './engine/Engine';
import { DB, type SearchItem } from './data/db';
import { STRINGS } from './i18n';
import { Ctx, loadSettings, saveSettings, setNotice, takeNotice, TIER_EFFECTS, type AppCtx, type AtlasState, type Effects, type Selection, type Settings } from './ui/ctx';
import { LAYERS, REGIONS, layerOf, type LayerId, type RegionId } from './engine/layers';
import type { LandmarkRec, PackId, StructureRec } from './data/types';
import { Header, type Mode } from './ui/Header';
import { Search } from './ui/Search';
import { DepthGauge } from './ui/DepthGauge';
import { BodyMap } from './ui/BodyMap';
import { SpecimenTag, type Anchor } from './ui/SpecimenTag';
import { InstrumentTray, type ViewName } from './ui/InstrumentTray';
import { MotionBar, MotionPanel } from './ui/Motion';
import { Sheet, type SheetH } from './ui/Sheet';
import { Quiz } from './ui/Quiz';
import { AboutPage, ProgressPage } from './ui/Pages';
import { SettingsDialog } from './ui/Settings';
import { Mark } from './ui/icons';
import { regionBoxes, inRegion } from './ui/regions';
import { applyBackdrop, backdropCanvas, micrographSize } from './ui/micrograph';
import { applyEffects, loadMotionModule, motionPlayer, onContextLost, setLandmarkAreas, supportsEffects, tierEffects, type MotionClip, type MotionModule } from './ui/engineExtras';
import { COMPACT_QUERY, useMedia } from './ui/hooks';

type EngineQuality = ConstructorParameters<typeof Engine>[1]['quality'];

const initialAtlas = (): AtlasState => ({
  layers: Object.fromEntries(LAYERS.map((l) => [l.id, l.id === 'skeleton'])) as Record<LayerId, boolean>,
  opacity: Object.fromEntries(LAYERS.map((l) => [l.id, 1])) as Record<LayerId, number>,
  region: null,
  explode: 0,
  clip: null,
  side: 'both',
  xray: false,
  colorMode: 'real',
});

const PACK_LAYERS: Partial<Record<PackId, LayerId[]>> = {
  skeleton: ['skeleton'], joints: ['joints'], muscles: ['muscles'], vessels: ['arteries', 'veins'], nerves: ['nerves'],
  viscera: ['respiratory', 'organs'], lymphoid: ['lymphoid'], skin: ['skin'],
};

// layout constants shared with styles.css
const GUTTER = 16;
const GAUGE_W = 176;
const TRAY_H = 70;
const BAR_H = 64;

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

interface Toast {
  id: number;
  msg: string;
  action?: { label: string; run: () => void };
}

export default function App() {
  const base = import.meta.env.BASE_URL;
  const [settings, setSettingsState] = useState<Settings>(loadSettings);
  const t = STRINGS[settings.lang];
  const compact = useMedia(COMPACT_QUERY);
  const holder = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<Engine | null>(null);
  const [db, setDb] = useState<DB | null>(null);
  const [boot, setBoot] = useState<{ p: number; err: string | null; done: boolean }>({ p: 0, err: null, done: false });
  const [bootGone, setBootGone] = useState(false);
  const [intro, setIntro] = useState(false);
  const [microUrl, setMicroUrl] = useState<string | null>(null);
  const [packProgress, setPackProgress] = useState<Partial<Record<PackId, number>>>({});
  const [mode, setModeState] = useState<Mode>('atlas');
  const modeRef = useRef<Mode>('atlas');
  modeRef.current = mode;
  const [atlas, setAtlas] = useState<AtlasState>(initialAtlas);
  const [sel, setSel] = useState<Selection>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const pickPoint = useRef<{ id: string; p: THREE.Vector3 } | null>(null);
  const lmShown = useRef<{ list: LandmarkRec[]; hl: string | null }>({ list: [], hl: null });
  const [hidden, setHidden] = useState<string[]>([]);
  const [isolate, setIsolate] = useState<string[] | null>(null);
  const [undo, setUndo] = useState<{ hidden: string[]; isolate: string[] | null; region: RegionId | null }[]>([]);
  const [attachOn, setAttachOn] = useState(false);
  const [sheet, setSheet] = useState<SheetH>('peek');
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [hover, setHover] = useState<{ x: number; y: number; label: string; sub?: string } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quizFocus, setQuizFocus] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [fxDefaults, setFxDefaults] = useState<Effects>(TIER_EFFECTS[settings.quality]);
  const [fxSupported, setFxSupported] = useState(false);
  // motion
  const [motionMod, setMotionMod] = useState<MotionModule | null>(null);
  const [motionSide, setMotionSide] = useState<'l' | 'r'>('r');
  const [loadedClip, setLoadedClip] = useState<MotionClip | null>(null);
  const [loadingClip, setLoadingClip] = useState<string | null>(null);
  const player = useMemo(() => motionPlayer(engine), [engine]);
  const motionAvailable = !!motionMod && !!player;

  const setSettings = useCallback((p: Partial<Settings>) => {
    setSettingsState((s) => {
      const n = { ...s, ...p };
      saveSettings(n);
      return n;
    });
  }, []);
  useEffect(() => {
    document.documentElement.lang = settings.lang;
  }, [settings.lang]);

  const toastId = useRef(0);
  const toast = useCallback((msg: string, action?: Toast['action']) => {
    const id = ++toastId.current;
    setToasts((cur) => [...cur.filter((x) => x.msg !== msg).slice(-2), { id, msg, action }]);
    window.setTimeout(() => setToasts((cur) => cur.filter((x) => x.id !== id)), action ? 9000 : 4800);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    setSearchOpen(false);
    setRegionsOpen(false);
  }, []);

  // ------------------------------------------------------------------ boot
  useEffect(() => {
    if (!holder.current) return;
    const size = micrographSize();
    const micro = backdropCanvas(size.w, size.h);
    try {
      setMicroUrl(micro.toDataURL('image/jpeg', 0.86));
    } catch {
      /* the plain colour stays behind the loader */
    }
    if (!webglOK()) {
      setBoot({ p: 0, err: STRINGS[loadSettings().lang].noWebgl, done: false });
      return;
    }
    const s0 = loadSettings();
    const e = new Engine(holder.current, { quality: s0.quality as unknown as EngineQuality, base });
    applyBackdrop(e, micro);
    const defaults = tierEffects(e, s0.quality, TIER_EFFECTS);
    setFxDefaults(defaults);
    setFxSupported(supportsEffects(e));
    applyEffects(e, { ...defaults, ...s0.effects });
    setEngine(e);
    const offLost = onContextLost(e, () => {
      const s = loadSettings();
      const tt = STRINGS[s.lang];
      if (s.quality === 'ultra') {
        saveSettings({ ...s, quality: 'high', effects: {} });
        setNotice('ctxLostUltra');
        window.location.reload();
      } else toast(tt.ctxLost, { label: tt.reload, run: () => window.location.reload() });
    });
    const d = new DB(base);
    d.load()
      .then(() => {
        setDb(d);
        // handle for debugging and automated visual tests
        (window as unknown as { __raga: unknown }).__raga = { engine: e, db: d };
      })
      .catch((err) => setBoot({ p: 0, err: String(err), done: false }));
    loadMotionModule().then(setMotionMod);
    return () => {
      offLost();
      e.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // effect switches follow the settings
  useEffect(() => {
    if (engine) applyEffects(engine, { ...fxDefaults, ...settings.effects });
  }, [engine, fxDefaults, settings.effects]);

  const ensurePacks = useCallback(
    async (packs: PackId[]) => {
      if (!engine || !db) return;
      const need = [...new Set(packs)].filter((p) => !engine.isLoaded(p));
      await Promise.all(
        need.map((p) =>
          engine
            .loadPack(p, db.byId, (f) => setPackProgress((cur) => ({ ...cur, [p]: f })))
            .then(() => {
              setPackProgress((cur) => ({ ...cur, [p]: 1 }));
              if (p === 'attachments') for (const a of db.attachments) if (a.bone) engine.registerAttachmentBone(a.id, a.bone);
            }),
        ),
      );
    },
    [engine, db],
  );

  const ensureLayers = useCallback(async (layers: LayerId[]) => ensurePacks(layers.map((l) => LAYERS.find((x) => x.id === l)!.pack)), [ensurePacks]);

  useEffect(() => {
    if (!engine || !db) return;
    let alive = true;
    engine
      .loadPack('skeleton', db.byId, (f) => alive && setBoot((b) => ({ ...b, p: f })))
      .then(() => {
        if (!alive) return;
        setPackProgress((c) => ({ ...c, skeleton: 1 }));
        engine.batch(() => {
          engine.setLayer('skeleton', true);
          engine.setLayer('attachments', true);
        });
        engine.frameVisible({ dir: new THREE.Vector3(0.0, 0.08, 1), instant: true });
        setBoot({ p: 1, err: null, done: true });
        setIntro(true);
        window.setTimeout(() => setIntro(false), 1800);
        window.setTimeout(() => setBootGone(true), 1100);
        if (takeNotice() === 'ctxLostUltra') toast(STRINGS[loadSettings().lang].ctxLostUltra);
        // open a deep link if there is one
        const h = new URLSearchParams(window.location.hash.slice(1));
        const s = h.get('s');
        if (s && db.byId.has(s)) {
          const rec = db.byId.get(s)!;
          ensurePacks([rec.pack]).then(() => {
            const l = layerOf(rec);
            if (l !== 'attachments') setAtlas((a) => ({ ...a, layers: { ...a.layers, [l]: true } }));
            setSel({ type: 'structure', id: s });
            setSheet('half');
            engine.frameIds([s], { pad: 2 });
          });
        }
        // warm the most used packs while the user looks around (fine pointers only)
        const coarse = window.matchMedia?.('(pointer: coarse)').matches;
        if (loadSettings().quality !== 'lite' && !coarse) {
          const idle = (cb: () => void) => {
            const w = window as unknown as { requestIdleCallback?: (f: () => void, o: { timeout: number }) => void };
            if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 4000 });
            else window.setTimeout(cb, 1500);
          };
          idle(() => ensurePacks(['joints', 'attachments']).then(() => idle(() => ensurePacks(['muscles']))));
        }
      })
      .catch((err) => setBoot({ p: 0, err: String(err), done: false }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, db]);

  // ------------------------------------------------------------------ selection helpers
  const siblingsOf = useCallback(
    (rec: StructureRec): string[] => {
      if (!db) return [rec.id];
      const parent = db.parentConcept(rec);
      if (!parent || db.content.get(parent)?.kind !== 'muscle') return [rec.id];
      return db.structures.filter((s) => s.pack !== 'attachments' && s.side === rec.side && db.parentConcept(s) === parent).map((s) => s.id);
    },
    [db],
  );

  const selIds = useMemo((): string[] => {
    if (!db || !sel) return [];
    if (sel.type === 'structure') {
      const rec = db.byId.get(sel.id);
      return rec ? siblingsOf(rec) : [];
    }
    if (sel.type === 'landmark') return [sel.lm.on];
    return sel.ids;
  }, [sel, db, siblingsOf]);

  const muscleKeyOf = useCallback(
    (rec: StructureRec) => {
      if (!db) return rec.k;
      const p = db.parentConcept(rec);
      return p && db.content.get(p)?.kind === 'muscle' ? p : rec.k;
    },
    [db],
  );

  // the point the specimen tag points at: the picked surface point, or the centre of the structure
  useEffect(() => {
    if (!engine || !sel) {
      setAnchor(null);
      return;
    }
    const make = (id: string, world: THREE.Vector3 | null): Anchor | null => {
      const o = engine.objects.get(id);
      if (!o) return null;
      o.root.updateMatrixWorld(true);
      const w = world ?? engine.worldPointOn(id, o.center);
      return { id, local: o.root.worldToLocal(w.clone()), surface: !!world };
    };
    const pp = pickPoint.current;
    pickPoint.current = null;
    if (sel.type === 'structure') setAnchor(make(sel.id, pp && pp.id === sel.id ? pp.p : null));
    else if (sel.type === 'landmark') setAnchor(make(sel.lm.on, engine.worldPointOn(sel.lm.on, new THREE.Vector3(...sel.lm.p))));
    else setAnchor(sel.ids[0] ? make(sel.ids[0], null) : null);
  }, [sel, engine]);

  // clips the selected muscle or joint can play
  const selClips = useMemo((): MotionClip[] => {
    if (!motionMod || !db || sel?.type !== 'structure') return [];
    const rec = db.byId.get(sel.id);
    if (!rec || (rec.pack !== 'muscles' && rec.pack !== 'joints')) return [];
    try {
      const key = rec.pack === 'muscles' ? muscleKeyOf(rec) : db.parentConcept(rec) ?? rec.k;
      const list = motionMod.clipsForKey(db, key, rec.side ?? 'r');
      return Array.isArray(list) ? list.slice(0, 4) : [];
    } catch {
      return [];
    }
  }, [motionMod, db, sel, muscleKeyOf]);

  const jointClips = useMemo((): MotionClip[] => {
    if (!motionMod || !db) return [];
    try {
      const list = motionMod.jointClips(db, motionSide);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }, [motionMod, db, motionSide]);

  // ------------------------------------------------------------------ push atlas state into the engine
  const inAtlas = mode === 'atlas' || mode === 'motion';
  useEffect(() => {
    if (!engine || !db || !boot.done || !inAtlas) return;
    engine.batch(() => {
      for (const l of LAYERS) {
        engine.setLayer(l.id, atlas.layers[l.id]);
        engine.setLayerOpacity(l.id, atlas.opacity[l.id]);
      }
      engine.setLayer('attachments', true);
      engine.setSide(atlas.side);
      engine.setColorMode(atlas.colorMode);
      engine.setClip(atlas.clip);
      engine.setHidden(hidden);
      engine.setIsolate(isolate);
      if (atlas.region && atlas.region !== 'body') {
        const def = REGIONS.find((r) => r.id === atlas.region)!;
        engine.setRegion(regionBoxes(engine, atlas.region), def.path ?? null);
      } else engine.setRegion(null);
      const tints = new Map<string, Tint>();
      if (sel?.type === 'structure') {
        for (const id of selIds) tints.set(id, id === sel.id ? 'select' : 'related');
      } else if (sel?.type === 'concept') {
        for (const id of sel.ids) tints.set(id, 'select');
      }
      engine.setTint(tints);
      const focus = new Set<string>(selIds);
      engine.setXray(atlas.xray && focus.size > 0, focus);
      let lms: LandmarkRec[] = [];
      let hl: string | null = null;
      if (sel?.type === 'structure' && db.byId.get(sel.id)?.pack === 'skeleton') lms = (db.lmByBone.get(sel.id) ?? []).filter((l) => !l.variant && l.k !== db.byId.get(sel.id)!.k);
      if (sel?.type === 'landmark') {
        lms = (db.lmByBone.get(sel.lm.on) ?? []).filter((l) => !l.variant);
        hl = sel.lm.k;
      }
      engine.setLandmarks(lms, hl);
      setLandmarkAreas(engine, lms, hl);
      lmShown.current = { list: lms, hl };
      let att: string[] = [];
      if (attachOn && sel?.type === 'structure') {
        const rec = db.byId.get(sel.id)!;
        if (rec.pack === 'skeleton') att = (db.attByBone.get(rec.id) ?? []).map((a) => a.id);
        else if (rec.pack === 'muscles') {
          const mk = muscleKeyOf(rec);
          const keys = new Set([mk, rec.k, ...siblingsOf(rec).map((id) => db.byId.get(id)!.k)]);
          att = db.attachments.filter((a) => keys.has(a.m) && a.side === (rec.side ?? 'r')).map((a) => a.id);
        }
      }
      engine.setAttachments(att);
    });
    engine.setExplode(loadedClip ? 0 : atlas.explode);
  }, [engine, db, boot.done, inAtlas, atlas, hidden, isolate, sel, selIds, attachOn, muscleKeyOf, siblingsOf, loadedClip]);

  useEffect(() => {
    if (attachOn) ensurePacks(['attachments']);
  }, [attachOn, ensurePacks]);

  // the engine centres the specimen in the area the glass leaves free
  const rightPanel = inAtlas && (!!sel || (mode === 'motion' && motionAvailable));
  useEffect(() => {
    if (!engine) return;
    const apply = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const safeB = probe.current ? parseFloat(getComputedStyle(probe.current).paddingBottom) || 0 : 0;
      let left = 0, right = 0, bottom = 0;
      if (inAtlas) {
        const bar = loadedClip ? BAR_H + 10 : 0;
        if (!compact) {
          left = GUTTER * 2 + GAUGE_W;
          right = rightPanel ? GUTTER * 2 + (w >= 1200 ? 372 : 336) : 0;
          bottom = GUTTER + TRAY_H + 8 + bar;
        } else {
          left = GUTTER + 44;
          const sheetH = rightPanel ? (sheet === 'peek' ? 112 : Math.round(h * 0.5)) : 0;
          bottom = GUTTER + 64 + safeB + 8 + sheetH + bar;
        }
      } else if (mode === 'quiz') bottom = compact ? 150 : 120;
      engine.setInsets(left, right, bottom);
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [engine, mode, inAtlas, rightPanel, sheet, compact, loadedClip]);

  // keep the URL pointing at the selection
  useEffect(() => {
    if (!inAtlas) return;
    const h = sel?.type === 'structure' ? `#s=${sel.id}` : '';
    if (window.location.hash !== h) history.replaceState(null, '', h || window.location.pathname + window.location.search);
  }, [sel, inAtlas]);

  // ------------------------------------------------------------------ picking and hover
  useEffect(() => {
    if (!engine || !db) return;
    const active = () => modeRef.current === 'atlas' || modeRef.current === 'motion';
    const offPick = engine.onPick((hit) => {
      if (!active()) return;
      if (!hit) {
        setSel(null);
        return;
      }
      if (hit.landmark) {
        setSel({ type: 'landmark', lm: hit.landmark });
        return;
      }
      const rec = db.byId.get(hit.id);
      if (!rec) return;
      if (rec.pack === 'attachments') {
        const a = db.attachments.find((x) => x.id === rec.id);
        const ids = a ? db.structures.filter((s) => s.pack === 'muscles' && s.side === a.side && (s.k === a.m || db.parentConcept(s) === a.m)).map((s) => s.id) : [];
        if (ids.length) setSel({ type: 'structure', id: ids[0] });
        return;
      }
      pickPoint.current = { id: rec.id, p: hit.point.clone() };
      setSel({ type: 'structure', id: rec.id });
      setSheet('peek');
    });
    const offDbl = engine.onDoublePick((hit) => {
      if (!active()) return;
      const rec = db.byId.get(hit.id);
      if (rec) engine.frameIds(siblingsOf(rec), { pad: 1.6 });
    });
    const offHover = engine.onHover(({ id, x, y, landmark }) => {
      if (!active() || !id) {
        setHover(null);
        return;
      }
      if (landmark) {
        setHover({ x, y, label: db.latin(landmark.k), sub: landmark.en });
        return;
      }
      const rec = db.byId.get(id);
      if (!rec) return setHover(null);
      if (rec.pack === 'attachments') {
        const a = db.attachments.find((z) => z.id === id);
        if (a) setHover({ x, y, label: db.latin(a.m), sub: a.kind === 'origin' ? t.originLegend : t.insertionLegend });
        return;
      }
      const mk = muscleKeyOf(rec);
      setHover({ x, y, label: db.latin(mk), sub: mk !== rec.k ? db.latin(rec.k) : rec.en });
    });
    return () => {
      offPick();
      offDbl();
      offHover();
    };
  }, [engine, db, t, muscleKeyOf, siblingsOf]);

  // ------------------------------------------------------------------ actions
  const pushUndo = () => setUndo((u) => [...u.slice(-30), { hidden, isolate, region: atlas.region }]);

  const setLayers = async (patch: Partial<Record<LayerId, boolean>>) => {
    setAtlas((a) => ({ ...a, layers: { ...a.layers, ...patch } }));
    const on = (Object.keys(patch) as LayerId[]).filter((l) => patch[l]);
    if (!on.length) return;
    try {
      await ensureLayers(on);
    } catch {
      toast(t.layerFailed);
      setAtlas((a) => ({ ...a, layers: { ...a.layers, ...Object.fromEntries(on.map((l) => [l, false])) } }));
    }
  };

  const showLayerFor = async (rec: StructureRec) => {
    const layer = layerOf(rec);
    if (layer === 'attachments') return;
    await ensurePacks([rec.pack]);
    setAtlas((a) => (a.layers[layer] ? a : { ...a, layers: { ...a.layers, [layer]: true } }));
  };

  const revealIds = (ids: string[]) => {
    if (isolate && ids.some((id) => !isolate.includes(id))) setIsolate(null);
    if (hidden.some((h) => ids.includes(h))) setHidden(hidden.filter((h) => !ids.includes(h)));
    if (atlas.region && engine && ids.some((id) => engine.objects.get(id) && !inRegion(engine, id, atlas.region!))) setAtlas((a) => ({ ...a, region: null }));
  };

  const pickSearch = async (it: SearchItem) => {
    if (!engine || !db) return;
    if (modeRef.current !== 'atlas' && modeRef.current !== 'motion') setMode('atlas');
    if (it.type === 'landmark') {
      const list = db.lmByKey.get(it.key) ?? [];
      const lm = list.find((l) => l.side === 'r') ?? list[0];
      if (!lm) return;
      const bone = db.byId.get(lm.on);
      if (bone) await showLayerFor(bone);
      revealIds([lm.on]);
      setSel({ type: 'landmark', lm });
      setSheet('half');
      const p = engine.worldPointOn(lm.on, new THREE.Vector3(...lm.p));
      const o = engine.objects.get(lm.on);
      const out = o ? p.clone().sub(o.center).normalize() : new THREE.Vector3(...lm.n);
      engine.framePoint(p, new THREE.Vector3(...lm.n).multiplyScalar(0.6).add(out.multiplyScalar(0.4)), Math.max(0.2, (o?.radius ?? 0.1) * 1.5));
      return;
    }
    if (!it.ids.length) {
      setSel({ type: 'concept', key: it.key, ids: [] });
      setSheet('half');
      return;
    }
    const recs = it.ids.map((id) => db.byId.get(id)!).filter(Boolean);
    const right = recs.filter((r) => r.side === 'r');
    const chosen = right.length ? right : recs.filter((r) => r.side === null).length ? recs.filter((r) => r.side === null) : recs;
    for (const r of chosen.slice(0, 1)) await showLayerFor(r);
    await ensurePacks([...new Set(chosen.map((r) => r.pack))]);
    const layers = new Set(chosen.map((r) => layerOf(r)).filter((l) => l !== 'attachments') as LayerId[]);
    setAtlas((a) => ({ ...a, layers: { ...a.layers, ...Object.fromEntries([...layers].map((l) => [l, true])) } }));
    const ids = chosen.map((r) => r.id);
    revealIds(ids);
    if (it.type === 'structure' && ids.length === 1) setSel({ type: 'structure', id: ids[0] });
    else setSel({ type: 'concept', key: it.key, ids });
    setSheet('half');
    window.setTimeout(() => engine.frameIds(ids, { pad: 1.7 }), 30);
  };

  const onKey = (key: string) => {
    if (!db) return;
    const it = db.search.find((s) => s.key === key && s.type !== 'landmark') ?? db.search.find((s) => s.key === key);
    if (it) pickSearch(it);
    else setSel({ type: 'concept', key, ids: [] });
  };

  const onLandmark = (key: string, boneId: string) => {
    if (!db || !engine) return;
    const lm = (db.lmByKey.get(key) ?? []).find((l) => l.on === boneId) ?? db.lmByKey.get(key)?.[0];
    if (!lm) return onKey(key);
    setSel({ type: 'landmark', lm });
    const p = engine.worldPointOn(lm.on, new THREE.Vector3(...lm.p));
    engine.framePoint(p, new THREE.Vector3(...lm.n), 0.18);
  };

  // hovering a landmark in the tag lights up its area; after a short pause the camera flies to it
  const onLandmarkHover = (lm: LandmarkRec | null, fly: boolean) => {
    if (!engine) return;
    const { list, hl } = lmShown.current;
    const key = lm?.k ?? hl;
    engine.highlightLandmark(key);
    setLandmarkAreas(engine, list, key);
    if (lm && fly) {
      const p = engine.worldPointOn(lm.on, new THREE.Vector3(...lm.p));
      engine.framePoint(p, new THREE.Vector3(...lm.n), 0.2);
    }
  };

  const onRegion = async (r: RegionId) => {
    if (!engine) return;
    const def = REGIONS.find((x) => x.id === r)!;
    setRegionsOpen(false);
    try {
      await ensureLayers(def.layers);
    } catch {
      toast(t.layerFailed);
      return;
    }
    pushUndo();
    setIsolate(null);
    setHidden([]);
    setAtlas((a) => ({ ...a, region: r === 'body' ? null : r, layers: { ...a.layers, ...Object.fromEntries(def.layers.map((l) => [l, true])) } }));
    window.setTimeout(() => {
      engine.frameVisible({ dir: def.side === 'r' ? new THREE.Vector3(-0.45, 0.12, 1) : new THREE.Vector3(0, 0.1, 1) });
    }, 60);
  };

  const focusSel = () => {
    if (!engine || !sel) return;
    if (sel.type === 'landmark') {
      const p = engine.worldPointOn(sel.lm.on, new THREE.Vector3(...sel.lm.p));
      engine.framePoint(p, new THREE.Vector3(...sel.lm.n), 0.16);
    } else engine.frameIds(selIds, { pad: 1.6 });
  };

  const isolateSel = () => {
    if (!selIds.length) return;
    pushUndo();
    setIsolate(selIds);
    window.setTimeout(() => engine?.frameIds(selIds, { pad: 1.5 }), 30);
  };

  const toggleIsolate = () => {
    if (isolate) {
      pushUndo();
      setIsolate(null);
    } else isolateSel();
  };

  const hideSel = () => {
    if (!selIds.length) return;
    pushUndo();
    setHidden([...new Set([...hidden, ...selIds])]);
    setSel(null);
  };

  const showAll = () => {
    pushUndo();
    setHidden([]);
    setIsolate(null);
    setAtlas((a) => ({ ...a, region: null, explode: 0, clip: null }));
  };

  const doUndo = () => {
    const last = undo[undo.length - 1];
    if (!last) return;
    setUndo(undo.slice(0, -1));
    setHidden(last.hidden);
    setIsolate(last.isolate);
    setAtlas((a) => ({ ...a, region: last.region }));
  };

  const resetView = () => engine?.frameVisible({ dir: new THREE.Vector3(0, 0.08, 1) });
  const view = (v: ViewName) => engine?.view(v);

  const shot = () => {
    if (!engine) return;
    const url = engine.screenshot();
    const a = document.createElement('a');
    a.href = url;
    a.download = `raga-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.png`;
    a.click();
  };

  // ------------------------------------------------------------------ motion
  const playClip = async (clip: MotionClip, frame: boolean) => {
    if (!player) return;
    setLoadingClip(clip.id);
    try {
      await ensurePacks(clip.packs);
      const layers = clip.packs.flatMap((pk) => PACK_LAYERS[pk] ?? []);
      setAtlas((a) => ({ ...a, explode: 0, layers: { ...a.layers, ...Object.fromEntries(layers.map((l) => [l, true])) } }));
      player.play(clip, { loop: true, speed: 1 });
      setLoadedClip(clip);
      if (frame && engine) window.setTimeout(() => engine.frameIds([...clip.muscles, ...clip.stretch], { pad: 1.5 }), 40);
    } catch {
      toast(t.layerFailed);
    } finally {
      setLoadingClip(null);
    }
  };

  const stopClip = useCallback(() => {
    try {
      player?.stop();
    } catch {
      /* already stopped */
    }
    setLoadedClip(null);
  }, [player]);

  useEffect(() => {
    if (mode !== 'atlas' && mode !== 'motion' && loadedClip) stopClip();
  }, [mode, loadedClip, stopClip]);

  // keyboard shortcuts in the atlas
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!inAtlas || settingsOpen) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || e.defaultPrevented) return;
      if (e.key === 'Escape') setSel(null);
      else if (e.key === 'f') focusSel();
      else if (e.key === 'i') isolateSel();
      else if (e.key === 'h') hideSel();
      else if (e.key === 'x') setAtlas((a) => ({ ...a, xray: !a.xray }));
      else if ((e.ctrlKey || e.metaKey) && e.key === 'z') doUndo();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // leaving the atlas: clear atlas-only decorations
  useEffect(() => {
    if (!engine) return;
    if (!inAtlas) {
      setHover(null);
      engine.batch(() => {
        engine.setLandmarks([]);
        engine.setAttachments([]);
        engine.setRegion(null);
        if (mode !== 'quiz') for (const l of LAYERS) engine.setLayer(l.id, false);
      });
    }
  }, [inAtlas, mode, engine]);

  const ctx: AppCtx | null = useMemo(
    () => (engine && db ? { engine, db, t, settings, setSettings, ensureLayers, ensurePacks, packProgress, toast, base, compact, fxDefaults, fxSupported } : null),
    [engine, db, t, settings, setSettings, ensureLayers, ensurePacks, packProgress, toast, base, compact, fxDefaults, fxSupported],
  );

  const ready = !!ctx && boot.done;
  const tag = (
    <SpecimenTag
      sel={sel}
      anchor={anchor}
      sheet={sheet}
      onSheet={setSheet}
      onClose={() => setSel(null)}
      onFocus={focusSel}
      onIsolate={isolateSel}
      onHide={hideSel}
      onKey={onKey}
      onLandmark={onLandmark}
      onLandmarkHover={onLandmarkHover}
      attachOn={attachOn}
      onToggleAttach={() => setAttachOn((v) => !v)}
      onQuiz={(k) => {
        setQuizFocus(k);
        setMode('quiz');
      }}
      clips={player ? selClips : []}
      onPlayClip={(c) => playClip(c, false)}
      playingId={loadedClip?.id ?? null}
    />
  );
  const motionPanel = motionAvailable && (
    <MotionPanel clips={jointClips} side={motionSide} onSide={setMotionSide} onPlay={(c) => playClip(c, true)} currentId={loadedClip?.id ?? null} loadingId={loadingClip} />
  );

  return (
    <div className="app" data-quality={settings.quality} data-mode={mode} data-intro={intro || undefined} data-compact={compact || undefined} onPointerDownCapture={() => boot.done && !touched && setTouched(true)}>
      <div className="stage">
        <div className="viewport" ref={holder} onPointerDown={() => setTouched(true)} />
        {ready && (
          <Ctx.Provider value={ctx!}>
            {inAtlas && (
              <>
                {!compact ? (
                  <div className="leftcol">
                    <DepthGauge
                      layers={atlas.layers}
                      opacity={atlas.opacity}
                      colorMode={atlas.colorMode}
                      onLayers={setLayers}
                      onOpacity={(l, v) => setAtlas((a) => ({ ...a, opacity: { ...a.opacity, [l]: v } }))}
                      onColorMode={(m) => setAtlas((a) => ({ ...a, colorMode: m }))}
                    />
                    <BodyMap region={atlas.region} onRegion={onRegion} className="glass settle" />
                  </div>
                ) : (
                  <DepthGauge
                    layers={atlas.layers}
                    opacity={atlas.opacity}
                    colorMode={atlas.colorMode}
                    onLayers={setLayers}
                    onOpacity={(l, v) => setAtlas((a) => ({ ...a, opacity: { ...a.opacity, [l]: v } }))}
                    onColorMode={(m) => setAtlas((a) => ({ ...a, colorMode: m }))}
                  />
                )}
                {sel ? (
                  tag
                ) : mode === 'motion' && motionPanel ? (
                  compact ? (
                    <Sheet h={sheet} onH={setSheet} label={t.sheetHandle} className="motion-sheet">
                      <div className="sheet-scroll">{motionPanel}</div>
                    </Sheet>
                  ) : (
                    <aside className="side-panel glass settle">{motionPanel}</aside>
                  )
                ) : null}
                {compact && regionsOpen && (
                  <Sheet h="half" onH={(h) => h === 'peek' && setRegionsOpen(false)} label={t.sheetHandle} className="regions-sheet">
                    <div className="sheet-scroll">
                      <BodyMap region={atlas.region} onRegion={onRegion} />
                    </div>
                  </Sheet>
                )}
                <div className={`tray-dock ${rightPanel ? 'with-right' : ''}`}>
                  {loadedClip && player && <MotionBar player={player} clip={loadedClip} onStop={stopClip} />}
                  <InstrumentTray
                    atlas={atlas}
                    onChange={(patch) => setAtlas((a) => ({ ...a, ...patch }))}
                    hasSel={selIds.length > 0}
                    isolated={!!isolate}
                    onIsolate={toggleIsolate}
                    canUndo={undo.length > 0}
                    onUndo={doUndo}
                    onShowAll={showAll}
                    onReset={resetView}
                    onView={view}
                    onShot={shot}
                    motionLoaded={!!loadedClip}
                    onRegions={compact ? () => setRegionsOpen((v) => !v) : undefined}
                    regionsOpen={regionsOpen}
                  />
                </div>
                {!sel && !touched && !compact && mode === 'atlas' && <p className="hint-line glass">{t.hint}</p>}
                {hover && !compact && (
                  <div className="tip glass" style={{ transform: `translate(${hover.x}px, ${hover.y}px)` }}>
                    <span className="latin">{hover.label}</span>
                    {hover.sub && hover.sub !== hover.label && <small>{hover.sub}</small>}
                  </div>
                )}
              </>
            )}
            {mode === 'quiz' && <Quiz focusKey={quizFocus} onFocusDone={() => setQuizFocus(null)} />}
            {mode === 'progress' && <ProgressPage />}
            {mode === 'about' && <AboutPage />}
            <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} onAbout={() => setMode('about')} />
          </Ctx.Provider>
        )}
        {boot.done && (
          <Header
            t={t}
            settings={settings}
            setSettings={setSettings}
            mode={mode}
            onMode={setMode}
            motionAvailable={motionAvailable}
            compact={compact}
            search={ctx && !compact ? (
              <Ctx.Provider value={ctx}>
                <Search onPick={pickSearch} />
              </Ctx.Provider>
            ) : ctx ? <span /> : null}
            onSearchOpen={() => setSearchOpen(true)}
            onSettings={() => setSettingsOpen(true)}
          />
        )}
        {searchOpen && ctx && compact && (
          <div className="search-layer glass">
            <Ctx.Provider value={ctx}>
              <Search overlay onPick={pickSearch} onClose={() => setSearchOpen(false)} />
            </Ctx.Provider>
          </div>
        )}
        {!bootGone && (
          <div className={`boot ${boot.done ? 'leaving' : ''}`} role="status" aria-live="polite">
            <div className="boot-micro" style={microUrl ? { backgroundImage: `url(${microUrl})` } : undefined} aria-hidden="true" />
            <div className="boot-inner">
              <p className="boot-mark">
                <Mark />
                <span>Raga</span>
              </p>
              {boot.err ? (
                <p className="boot-err">{boot.err}</p>
              ) : (
                <>
                  <p className="boot-msg">{t.loadingModel}</p>
                  <span className="boot-bar" aria-hidden="true">
                    <i style={{ transform: `scaleX(${Math.max(0.04, boot.p)})` }} />
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        <div className="toasts" role="status" aria-live="polite">
          {toasts.map((x) => (
            <div key={x.id} className="toast glass">
              <span>{x.msg}</span>
              {x.action && (
                <button className="btn small" onClick={x.action.run}>
                  {x.action.label}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="safe-probe" ref={probe} aria-hidden="true" />
      </div>
    </div>
  );
}
