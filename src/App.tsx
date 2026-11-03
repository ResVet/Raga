import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Engine, type Tint } from './engine/Engine';
import { DB, type SearchItem } from './data/db';
import { STRINGS } from './i18n';
import { Ctx, loadSettings, saveSettings, type AppCtx, type Selection, type Settings } from './ui/ctx';
import { LAYERS, REGIONS, layerOf, type LayerId, type RegionId } from './engine/layers';
import type { LandmarkRec, PackId, StructureRec } from './data/types';
import { Search } from './ui/Search';
import { Rail, type AtlasState } from './ui/Rail';
import { InfoCard } from './ui/InfoCard';
import { Quiz } from './ui/Quiz';
import { AboutPage, ProgressPage } from './ui/Pages';
import { SettingsDialog } from './ui/Settings';
import { IconGear, IconLayers, Mark } from './ui/icons';
import { regionBoxes, inRegion } from './ui/regions';

type Mode = 'atlas' | 'quiz' | 'progress' | 'about';

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

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function App() {
  const base = import.meta.env.BASE_URL;
  const [settings, setSettingsState] = useState<Settings>(loadSettings);
  const t = STRINGS[settings.lang];
  const holder = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<Engine | null>(null);
  const [db, setDb] = useState<DB | null>(null);
  const [boot, setBoot] = useState<{ p: number; err: string | null; done: boolean }>({ p: 0, err: null, done: false });
  const [packProgress, setPackProgress] = useState<Partial<Record<PackId, number>>>({});
  const [mode, setMode] = useState<Mode>('atlas');
  const modeRef = useRef<Mode>('atlas');
  modeRef.current = mode;
  const [atlas, setAtlas] = useState<AtlasState>(initialAtlas);
  const [sel, setSel] = useState<Selection>(null);
  const [hidden, setHidden] = useState<string[]>([]);
  const [isolate, setIsolate] = useState<string[] | null>(null);
  const [undo, setUndo] = useState<{ hidden: string[]; isolate: string[] | null; region: RegionId | null }[]>([]);
  const [attachOn, setAttachOn] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const [hover, setHover] = useState<{ x: number; y: number; label: string; sub?: string } | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quizFocus, setQuizFocus] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

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

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    window.setTimeout(() => setToastMsg((cur) => (cur === m ? null : cur)), 2600);
  }, []);

  // ------------------------------------------------------------------ boot
  useEffect(() => {
    if (!holder.current) return;
    if (!webglOK()) {
      setBoot({ p: 0, err: 'WebGL is not available in this browser. Raga needs WebGL to draw the 3D model.', done: false });
      return;
    }
    const e = new Engine(holder.current, { quality: settings.quality, base });
    setEngine(e);
    const d = new DB(base);
    d.load()
      .then(() => setDb(d))
      .catch((err) => setBoot({ p: 0, err: String(err), done: false }));
    return () => e.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        // open a deep link if there is one
        const h = new URLSearchParams(window.location.hash.slice(1));
        const s = h.get('s');
        if (s && db.byId.has(s)) {
          const rec = db.byId.get(s)!;
          ensurePacks([rec.pack]).then(() => {
            setAtlas((a) => ({ ...a, layers: { ...a.layers, [layerOf(rec) as LayerId]: true } }));
            setSel({ type: 'structure', id: s });
            engine.frameIds([s], { pad: 2 });
          });
        }
        // warm the most used packs while the user looks around (desktop only)
        if (settings.quality === 'high') {
          const idle = (cb: () => void) => ((window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 4000 }) : setTimeout(cb, 1500));
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

  // ------------------------------------------------------------------ push atlas state into the engine
  useEffect(() => {
    if (!engine || !db || !boot.done || mode !== 'atlas') return;
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
      // selection look
      const tints = new Map<string, Tint>();
      if (sel?.type === 'structure') {
        for (const id of selIds) tints.set(id, id === sel.id ? 'select' : 'related');
      } else if (sel?.type === 'concept') {
        for (const id of sel.ids) tints.set(id, 'select');
      }
      engine.setTint(tints);
      const focus = new Set<string>(selIds);
      engine.setXray(atlas.xray && focus.size > 0, focus);
      // landmarks on a selected bone
      let lms: LandmarkRec[] = [];
      let hl: string | null = null;
      if (sel?.type === 'structure' && db.byId.get(sel.id)?.pack === 'skeleton') lms = (db.lmByBone.get(sel.id) ?? []).filter((l) => !l.variant && l.k !== db.byId.get(sel.id)!.k);
      if (sel?.type === 'landmark') {
        lms = (db.lmByBone.get(sel.lm.on) ?? []).filter((l) => !l.variant);
        hl = sel.lm.k;
      }
      engine.setLandmarks(lms, hl);
      // origin and insertion patches
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
    engine.setExplode(atlas.explode);
  }, [engine, db, boot.done, mode, atlas, hidden, isolate, sel, selIds, attachOn, muscleKeyOf, siblingsOf]);

  useEffect(() => {
    if (attachOn) ensurePacks(['attachments']);
  }, [attachOn, ensurePacks]);

  useEffect(() => {
    if (!engine) return;
    const apply = () => {
      const wide = window.innerWidth > 860;
      const h = window.innerHeight;
      const left = wide && mode === 'atlas' ? 300 : 0;
      const right = wide && mode === 'atlas' && sel ? 396 : 0;
      let bottom = 0;
      if (mode === 'quiz') bottom = wide ? 170 : 230;
      else if (!wide && mode === 'atlas' && sel) bottom = peek ? 150 : Math.round(h * 0.45);
      engine.setInsets(left, right, bottom);
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [engine, mode, sel, peek]);

  // keep the URL pointing at the selection
  useEffect(() => {
    if (mode !== 'atlas') return;
    const h = sel?.type === 'structure' ? `#s=${sel.id}` : '';
    if (window.location.hash !== h) history.replaceState(null, '', h || window.location.pathname + window.location.search);
  }, [sel, mode]);

  // ------------------------------------------------------------------ picking and hover
  useEffect(() => {
    if (!engine || !db) return;
    const offPick = engine.onPick((hit) => {
      if (modeRef.current !== 'atlas') return;
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
      setSel({ type: 'structure', id: rec.id });
      setPeek(true);
    });
    const offDbl = engine.onDoublePick((hit) => {
      if (modeRef.current !== 'atlas') return;
      const rec = db.byId.get(hit.id);
      if (rec) engine.frameIds(siblingsOf(rec), { pad: 1.6 });
    });
    const offHover = engine.onHover(({ id, x, y, landmark }) => {
      if (modeRef.current !== 'atlas' || !id) {
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
    setMode('atlas');
    if (it.type === 'landmark') {
      const list = db.lmByKey.get(it.key) ?? [];
      const lm = list.find((l) => l.side === 'r') ?? list[0];
      if (!lm) return;
      const bone = db.byId.get(lm.on);
      if (bone) await showLayerFor(bone);
      revealIds([lm.on]);
      setSel({ type: 'landmark', lm });
      const p = engine.worldPointOn(lm.on, new THREE.Vector3(...lm.p));
      const o = engine.objects.get(lm.on);
      const out = o ? p.clone().sub(o.center).normalize() : new THREE.Vector3(...lm.n);
      engine.framePoint(p, new THREE.Vector3(...lm.n).multiplyScalar(0.6).add(out.multiplyScalar(0.4)), Math.max(0.2, (o?.radius ?? 0.1) * 1.5));
      return;
    }
    if (!it.ids.length) {
      setSel({ type: 'concept', key: it.key, ids: [] });
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
    setPeek(false);
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

  const onRegion = async (r: RegionId) => {
    if (!engine) return;
    const def = REGIONS.find((x) => x.id === r)!;
    await ensureLayers(def.layers);
    pushUndo();
    setIsolate(null);
    setHidden([]);
    setAtlas((a) => ({ ...a, region: r === 'body' ? null : r, layers: { ...a.layers, ...Object.fromEntries(def.layers.map((l) => [l, true])) } }));
    window.setTimeout(() => {
      const side = def.side;
      engine.frameVisible({ dir: side === 'r' ? new THREE.Vector3(-0.45, 0.12, 1) : new THREE.Vector3(0, 0.1, 1) });
    }, 60);
    setRailOpen(false);
  };

  const onLayer = async (l: LayerId, on: boolean) => {
    if (on) {
      const pack = LAYERS.find((x) => x.id === l)!.pack;
      setAtlas((a) => ({ ...a, layers: { ...a.layers, [l]: true } }));
      try {
        await ensurePacks([pack]);
      } catch {
        toast('Could not load that layer. Check your connection and try again.');
        setAtlas((a) => ({ ...a, layers: { ...a.layers, [l]: false } }));
      }
    } else setAtlas((a) => ({ ...a, layers: { ...a.layers, [l]: false } }));
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

  const shot = () => {
    if (!engine) return;
    const url = engine.screenshot();
    const a = document.createElement('a');
    a.href = url;
    a.download = `raga-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.png`;
    a.click();
  };

  // keyboard shortcuts in the atlas
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'atlas') return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
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

  // entering the quiz: clear atlas-only decorations
  useEffect(() => {
    if (!engine) return;
    if (mode !== 'atlas') {
      setHover(null);
      engine.batch(() => {
        engine.setLandmarks([]);
        engine.setAttachments([]);
        engine.setRegion(null);
      });
    }
  }, [mode, engine]);

  const ctx: AppCtx | null = useMemo(
    () => (engine && db ? { engine, db, t, settings, setSettings, ensureLayers, ensurePacks, packProgress, toast, base } : null),
    [engine, db, t, settings, setSettings, ensureLayers, ensurePacks, packProgress, toast, base],
  );

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setMode('atlas'); }} aria-label="Raga">
          <Mark />
          <span className="brand-name">Raga</span>
          <span className="brand-sub">{settings.lang === 'id' ? 'atlas anatomi 3D' : '3D anatomy atlas'}</span>
        </a>
        {ctx && (
          <Ctx.Provider value={ctx}>
            <Search onPick={pickSearch} />
          </Ctx.Provider>
        )}
        <nav className="tabs" role="tablist" aria-label="Raga">
          {(['atlas', 'quiz', 'progress', 'about'] as Mode[]).map((m) => (
            <button key={m} role="tab" className="tab" aria-selected={mode === m} onClick={() => setMode(m)}>
              {t[m]}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button className="icon-btn lang-btn" onClick={() => setSettings({ lang: settings.lang === 'en' ? 'id' : 'en' })} aria-label={t.language}>
            {settings.lang === 'en' ? 'ID' : 'EN'}
          </button>
          <button className="icon-btn" onClick={() => setSettingsOpen(true)} aria-label={t.settings}>
            <IconGear />
          </button>
        </div>
      </header>

      <div className="stage">
        <div className="viewport" ref={holder} onPointerDown={() => setTouched(true)} />
        {!boot.done && (
          <div className="boot" role="status">
            <div className="boot-inner">
              <h1>Raga</h1>
              {boot.err ? <p className="err">{boot.err}</p> : <p>{t.loadingModel}</p>}
              {!boot.err && (
                <div className="bar" aria-hidden="true">
                  <i style={{ width: `${Math.round(boot.p * 100)}%` }} />
                </div>
              )}
            </div>
          </div>
        )}
        {ctx && boot.done && (
          <Ctx.Provider value={ctx}>
            {mode === 'atlas' && (
              <>
                <Rail
                  state={atlas}
                  open={railOpen}
                  onLayer={onLayer}
                  onOpacity={(l, v) => setAtlas((a) => ({ ...a, opacity: { ...a.opacity, [l]: v } }))}
                  onRegion={onRegion}
                  onChange={(patch) => setAtlas((a) => ({ ...a, ...patch }))}
                  onShowAll={showAll}
                  onUndo={doUndo}
                  canUndo={undo.length > 0}
                  onReset={resetView}
                  onShot={shot}
                />
                <InfoCard
                  sel={sel}
                  peek={peek}
                  onTogglePeek={() => setPeek((p) => !p)}
                  onClose={() => setSel(null)}
                  onFocus={focusSel}
                  onIsolate={isolateSel}
                  onHide={hideSel}
                  onKey={onKey}
                  onLandmark={onLandmark}
                  attachOn={attachOn}
                  onToggleAttach={() => setAttachOn((v) => !v)}
                  onQuiz={(k) => {
                    setQuizFocus(k);
                    setMode('quiz');
                  }}
                />
                <div className="viewbar" role="toolbar" aria-label="Camera">
                  <button onClick={() => engine!.view('anterior')}>{t.anterior}</button>
                  <button onClick={() => engine!.view('posterior')}>{t.posterior}</button>
                  <button className="opt-desktop" onClick={() => engine!.view('right')}>{t.lateralR}</button>
                  <button className="opt-desktop" onClick={() => engine!.view('left')}>{t.lateralL}</button>
                  <button className="opt-desktop" onClick={() => engine!.view('superior')}>{t.superior}</button>
                  <span className="sep" />
                  <button onClick={resetView}>{t.resetView}</button>
                </div>
                <div className="fab-row">
                  <button className="btn" aria-expanded={railOpen} onClick={() => setRailOpen((v) => !v)}>
                    <IconLayers /> {t.layers}
                  </button>
                </div>
                {!sel && !touched && <p className="hint-line">{t.hint}</p>}
                {hover && (
                  <div className="tip" style={{ left: hover.x, top: hover.y }}>
                    {hover.label}
                    {hover.sub && hover.sub !== hover.label && <small>{hover.sub}</small>}
                  </div>
                )}
              </>
            )}
            {mode === 'quiz' && <Quiz focusKey={quizFocus} onFocusDone={() => setQuizFocus(null)} />}
            {mode === 'progress' && <ProgressPage />}
            {mode === 'about' && <AboutPage />}
            <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
          </Ctx.Provider>
        )}
        {toastMsg && (
          <div className="toast" role="status">
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
}
