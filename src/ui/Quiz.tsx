import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from './ctx';
import { DECKS, deckStats, makeSession, type DeckDef, type QType, type Question } from '../quiz/decks';
import { grade, type Verdict } from '../quiz/grader';
import { review, getCard } from '../quiz/srs';
import { LAYERS, type LayerId } from '../engine/layers';
import type { Engine, Tint } from '../engine/Engine';
import { idsInRegion, inRegion } from './regions';
import type { PackId } from '../data/types';
import { fmt, type Strings } from '../i18n';
import { IconCheck, IconCross } from './icons';

type Phase = 'decks' | 'setup' | 'run' | 'results';

interface Answer {
  q: Question;
  input: string;
  verdict: Verdict;
  pickedId?: string | null;
  overridden?: boolean;
}

const TYPE_LABEL: Record<QType, keyof Strings> = {
  name: 'qName', landmark: 'qLandmark', find: 'qFind', origin: 'qOrigin', insertion: 'qInsertion', nerve: 'qNerve',
  action: 'qAction', joint: 'qJoint', boneType: 'qBoneType', roots: 'qNerve',
};

/** Clear the specimen so the slides lie on the bare micrograph. */
function clearStage(engine: Engine) {
  engine.batch(() => {
    for (const l of LAYERS) engine.setLayer(l.id, false);
    engine.setLayer('attachments', false);
    engine.setTint(new Map());
    engine.setLandmarks([]);
    engine.setIsolate(null);
    engine.setXray(false, null);
    engine.setClip(null);
    engine.setRegion(null);
  });
  engine.setPin(null);
}

export function Quiz({ focusKey, onFocusDone }: { focusKey: string | null; onFocusDone: () => void }) {
  const app = useApp();
  const { engine, db, t, settings, ensurePacks } = app;
  const [phase, setPhase] = useState<Phase>('decks');
  const [deck, setDeck] = useState<DeckDef | null>(null);
  const [pool, setPool] = useState<Question[]>([]);
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [types, setTypes] = useState<QType[]>([]);
  const [size, setSize] = useState(20);
  const [session, setSession] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const ctx = useMemo(() => ({ inRegion: (id: string, r: Parameters<typeof inRegion>[2]) => inRegion(engine, id, r), english: settings.acceptEnglish }), [engine, settings.acceptEnglish]);

  useEffect(() => {
    if (phase !== 'run') clearStage(engine);
  }, [phase, engine]);

  const buildDeck = useCallback(
    async (d: DeckDef) => {
      setBusy(t.loadingDeck);
      try {
        await ensurePacks(d.packs);
      } finally {
        setBusy(null);
      }
      return d.build(db, ctx);
    },
    [db, ctx, ensurePacks, t.loadingDeck],
  );

  // "Quiz me on this" from the atlas: every question about one structure.
  useEffect(() => {
    if (!focusKey) return;
    const all: Question[] = [];
    for (const d of DECKS) {
      if (!d.packs.every((pk) => engine.isLoaded(pk))) continue;
      for (const q of d.build(db, ctx)) if (q.key === focusKey || (q.landmark && db.byId.get(q.landmark.on)?.k === focusKey)) all.push(q);
    }
    const uniq = [...new Map(all.map((q) => [q.id, q])).values()];
    onFocusDone();
    if (!uniq.length) {
      app.toast(t.emptyDeck);
      return;
    }
    setDeck(null);
    setMode('practice');
    setSession(uniq.slice(0, 30));
    setIdx(0);
    setAnswers([]);
    setPhase('run');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey]);

  const openDeck = async (d: DeckDef) => {
    const qs = await buildDeck(d);
    setDeck(d);
    setPool(qs);
    setTypes(d.types.filter((ty) => qs.some((q) => q.type === ty)));
    setPhase('setup');
  };

  const start = (onlyMisses?: Question[]) => {
    const list = onlyMisses ?? makeSession(pool, { types, size, mode });
    if (!list.length) {
      app.toast(t.emptyDeck);
      return;
    }
    setSession(list);
    setIdx(0);
    setAnswers([]);
    setPhase('run');
  };

  if (busy)
    return (
      <div className="quiz-wrap">
        <div className="quiz-scroll center">
          <p className="busy" role="status">
            <span className="spinner" aria-hidden="true" />
            {busy}
          </p>
        </div>
      </div>
    );

  if (phase === 'setup' && deck)
    return <Setup deck={deck} pool={pool} mode={mode} setMode={setMode} types={types} setTypes={setTypes} size={size} setSize={setSize} onStart={() => start()} onBack={() => setPhase('decks')} />;
  if (phase === 'run' && session.length)
    return (
      <Runner
        key={session.map((q) => q.id).join('|')}
        session={session}
        idx={idx}
        exam={mode === 'exam'}
        onAnswer={(a) => setAnswers((cur) => [...cur.filter((x) => x.q.id !== a.q.id), a])}
        onNext={() => {
          if (idx + 1 >= session.length) {
            setPhase('results');
            setVersion((v) => v + 1);
          } else setIdx(idx + 1);
        }}
        onQuit={() => {
          setPhase(answers.length ? 'results' : 'decks');
          setVersion((v) => v + 1);
        }}
      />
    );
  if (phase === 'results')
    return (
      <Results
        answers={answers}
        total={session.length}
        exam={mode === 'exam'}
        onMisses={() => {
          const miss = answers.filter((a) => !a.verdict.ok && !a.overridden).map((a) => a.q);
          setMode('practice');
          start(miss);
        }}
        onBack={() => {
          setPhase('decks');
          setVersion((v) => v + 1);
        }}
      />
    );
  return <DeckPicker onOpen={openDeck} version={version} />;
}

// ------------------------------------------------------------------ deck picker: slides on the backdrop
function DeckPicker({ onOpen, version }: { onOpen: (d: DeckDef) => void; version: number }) {
  const { db, engine, t, settings } = useApp();
  const lang = settings.lang;
  const stats = useMemo(() => {
    const out = new Map<string, ReturnType<typeof deckStats>>();
    for (const d of DECKS) {
      if (!d.packs.every((pk) => engine.isLoaded(pk))) continue;
      out.set(d.id, deckStats(d.build(db, { inRegion: (id, r) => inRegion(engine, id, r), english: false })));
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, engine, version]);
  return (
    <div className="quiz-wrap">
      <div className="quiz-scroll">
        <header className="deck-intro">
          <h1>{t.chooseDeck}</h1>
          <p>{t.deckLede}</p>
        </header>
        <ul className="slides">
          {DECKS.map((d, i) => {
            const s = stats.get(d.id);
            const pct = s && s.total ? Math.round((s.mastered / s.total) * 100) : 0;
            return (
              <li key={d.id} className="settle" style={{ ['--i' as string]: i }}>
                <button className="slide" onClick={() => onOpen(d)} aria-label={`${d.code}, ${lang === 'id' ? d.idn : d.en}`}>
                  <span className="slide-label">
                    <span className="slide-code">{d.code}</span>
                    <span className="slide-title">{lang === 'id' ? d.idn : d.en}</span>
                  </span>
                  <span className="slide-clear">
                    <span className="slide-cover" aria-hidden="true">
                      <Smear seed={i + 3} />
                    </span>
                    <span className="slide-info">
                      <span className="slide-blurb">{d.blurb[lang]}</span>
                      {s ? (
                        <span className="slide-stats">
                          <span>
                            <b className="num">{s.total}</b> {t.questions}
                          </span>
                          <span>
                            <b className="num">{s.due}</b> {t.dueShort}
                          </span>
                          <span>
                            <b className="num">{s.mastered}</b> {t.mastered}
                          </span>
                        </span>
                      ) : (
                        <span className="slide-stats muted">{t.loadsWhenOpened}</span>
                      )}
                      <span className="slide-meter" aria-hidden="true">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** A small stained section under the cover slip, different on every slide. */
function Smear({ seed }: { seed: number }) {
  let s = seed * 9301 + 49297;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const cells = Array.from({ length: 18 }, () => ({ x: 14 + r() * 72, y: 14 + r() * 72, rr: 7 + r() * 9 }));
  const nuclei = Array.from({ length: 16 }, () => ({ x: 18 + r() * 64, y: 18 + r() * 64, rr: 1.6 + r() * 1.6 }));
  return (
    <svg viewBox="0 0 100 100" className="smear">
      <defs>
        <filter id={`sm${seed}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id={`sc${seed}`}>
          <path d={`M50 ${8 + r() * 6}C${80 + r() * 10} 10 ${92} ${40 + r() * 10} ${86} 66C${80} 90 ${40} ${94} 22 80C6 66 8 30 50 ${8 + r() * 6}Z`} />
        </clipPath>
      </defs>
      <g clipPath={`url(#sc${seed})`} filter={`url(#sm${seed})`}>
        <rect width="100" height="100" fill="rgba(255,93,143,.16)" />
        {cells.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.rr} fill="rgba(255,120,170,.28)" />
        ))}
        {nuclei.map((c, i) => (
          <circle key={'n' + i} cx={c.x} cy={c.y} r={c.rr} fill="rgba(123,108,255,.75)" />
        ))}
      </g>
    </svg>
  );
}

// ------------------------------------------------------------------ setup
function Setup(p: {
  deck: DeckDef;
  pool: Question[];
  mode: 'practice' | 'exam';
  setMode: (m: 'practice' | 'exam') => void;
  types: QType[];
  setTypes: (f: (cur: QType[]) => QType[]) => void;
  size: number;
  setSize: (n: number) => void;
  onStart: () => void;
  onBack: () => void;
}) {
  const { t, settings, setSettings } = useApp();
  const lang = settings.lang;
  const d = p.deck;
  return (
    <div className="quiz-wrap">
      <div className="quiz-scroll">
        <section className="setup glass">
          <div className="setup-slide" aria-hidden="true">
            <span className="slide-code">{d.code}</span>
          </div>
          <h1>{lang === 'id' ? d.idn : d.en}</h1>
          <p className="lede">{d.blurb[lang]}</p>
          <fieldset className="modes">
            <legend>{t.mode}</legend>
            {(['practice', 'exam'] as const).map((m) => (
              <label className="mode-opt" key={m}>
                <input type="radio" name="mode" checked={p.mode === m} onChange={() => p.setMode(m)} />
                <span>
                  <b>{m === 'practice' ? t.practice : t.exam}</b>
                  <small>{m === 'practice' ? t.practiceHelp : t.examHelp}</small>
                </span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>{t.questionTypes}</legend>
            <div className="chips">
              {d.types.map((ty) => {
                const n = p.pool.filter((q) => q.type === ty).length;
                return (
                  <label className="chip check" key={ty} data-off={!n || undefined}>
                    <input type="checkbox" disabled={!n} checked={p.types.includes(ty)} onChange={(e) => p.setTypes((cur) => (e.target.checked ? [...cur, ty] : cur.filter((x) => x !== ty)))} />
                    <span>{t[TYPE_LABEL[ty]]}</span>
                    <span className="num count">{n}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <legend>{t.howMany}</legend>
            <div className="field-row">
              <input type="range" className="range" min={5} max={60} step={5} value={p.size} onChange={(e) => p.setSize(parseInt(e.target.value, 10))} aria-label={t.howMany} />
              <output className="num big-num">{p.size}</output>
            </div>
          </fieldset>
          <fieldset>
            <legend>{t.quizSettings}</legend>
            <label className="switch">
              <input type="checkbox" role="switch" checked={settings.acceptEnglish} onChange={(e) => setSettings({ acceptEnglish: e.target.checked })} />
              <span className="switch-track" aria-hidden="true" />
              <span>{t.acceptEnglish}</span>
            </label>
            <label className="switch">
              <input type="checkbox" role="switch" checked={settings.requireSide} onChange={(e) => setSettings({ requireSide: e.target.checked })} />
              <span className="switch-track" aria-hidden="true" />
              <span>{t.requireSide}</span>
            </label>
            {p.mode === 'exam' && (
              <label className="field-row">
                <span>{t.secondsPerStation}</span>
                <input
                  type="number"
                  className="num-input"
                  min={15}
                  max={300}
                  step={5}
                  value={settings.examSeconds}
                  onChange={(e) => setSettings({ examSeconds: Math.max(15, Math.min(300, parseInt(e.target.value || '60', 10))) })}
                />
              </label>
            )}
          </fieldset>
          <div className="btn-row">
            <button className="btn primary" onClick={p.onStart} disabled={!p.types.length}>
              {p.mode === 'exam' ? t.startExam : t.start}
            </button>
            <button className="btn ghost" onClick={p.onBack}>
              {t.backToDecks}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ runner
interface RunnerProps {
  session: Question[];
  idx: number;
  exam: boolean;
  onAnswer: (a: Answer) => void;
  onNext: () => void;
  onQuit: () => void;
}

function hintFor(ans: string) {
  return ans
    .split(' ')
    .map((w) => (w.length <= 2 ? w : w.slice(0, 2) + '_'.repeat(Math.min(8, w.length - 2))))
    .join('  ');
}

function Runner({ session, idx, exam, onAnswer, onNext, onQuit }: RunnerProps) {
  const app = useApp();
  const { engine, db, t, settings, ensurePacks } = app;
  const q = session[idx];
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [override, setOverride] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [left, setLeft] = useState(settings.examSeconds);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const pinLine = useRef<SVGSVGElement>(null);
  const done = verdict !== null;
  const results = useRef<Map<string, boolean>>(new Map());

  // stage the scene for this station
  useEffect(() => {
    let cancelled = false;
    setInput('');
    setVerdict(null);
    setOverride(false);
    setPicked(null);
    setHint(false);
    setLeft(settings.examSeconds);
    setReady(false);
    (async () => {
      await ensurePacks(q.packs as PackId[]);
      if (cancelled) return;
      engine.batch(() => {
        for (const l of LAYERS) engine.setLayer(l.id, q.layers.includes(l.id as LayerId));
        for (const l of LAYERS) engine.setLayerOpacity(l.id, 1);
        engine.setLayer('attachments', true);
        engine.setAttachments([]);
        engine.setColorMode('real');
        engine.setClip(null);
        engine.setLandmarks([]);
        engine.setHidden([]);
        engine.setRegion(null);
      });
      engine.setExplode(0, false);
      const side = q.side ?? 'both';
      engine.setSide(q.type === 'find' ? 'both' : side);
      let iso: Set<string> | null = null;
      if (q.region) {
        iso = new Set(idsInRegion(engine, q.region));
        q.ids.forEach((id) => iso!.add(id));
        if (q.landmark) iso.add(q.landmark.on);
      }
      engine.setIsolate(iso);
      const tints = new Map<string, Tint>();
      if (q.type !== 'find' && q.type !== 'landmark') q.ids.forEach((id) => tints.set(id, 'target'));
      engine.setTint(tints);
      if (q.ghost && q.type !== 'find') {
        const focus = new Set(q.ids);
        for (const o of engine.objects.values()) if (o.layer === 'skeleton') focus.add(o.rec.id);
        engine.setXray(true, focus);
      } else engine.setXray(false, null);
      if (q.type === 'landmark' && q.landmark) {
        const l = q.landmark;
        const pnt = engine.worldPointOn(l.on, new THREE.Vector3(...l.p));
        const n = new THREE.Vector3(...l.n);
        const bone = engine.objects.get(l.on);
        const out = bone ? pnt.clone().sub(bone.center).normalize() : n.clone();
        const dir = n.clone().multiplyScalar(0.65).add(out.multiplyScalar(0.35)).normalize();
        const dist = Math.max(0.15, (bone?.radius ?? 0.1) * 1.3);
        engine.setPin(pnt, dir, '#ff5d8f', Math.min(1.4, Math.max(0.4, dist / 0.3)));
        engine.framePoint(pnt, dir, dist);
      } else {
        engine.setPin(null);
        if (q.type === 'find') engine.frameVisible({ dir: new THREE.Vector3(0, 0.12, 1) });
        else {
          const box = new THREE.Box3();
          for (const id of q.ids) {
            const o = engine.objects.get(id);
            if (o) box.union(o.box);
          }
          if (!box.isEmpty()) {
            const c = box.getCenter(new THREE.Vector3());
            let ref = new THREE.Vector3(0, c.y, 0);
            if (q.region) {
              const rb = new THREE.Box3();
              for (const id of iso ?? []) {
                const o = engine.objects.get(id);
                if (o && o.layer === 'skeleton') rb.union(o.box);
              }
              if (!rb.isEmpty()) ref = rb.getCenter(new THREE.Vector3());
            }
            const d = c.clone().sub(ref);
            d.y *= 0.25;
            const dir = d.lengthSq() > 1e-5 ? d.normalize().multiplyScalar(0.8).add(new THREE.Vector3(0, 0.1, 0.35)).normalize() : new THREE.Vector3(0, 0.12, 1);
            const ctxPad = q.layers.includes('muscles') || q.layers.includes('arteries') || q.layers.includes('nerves') ? 1.5 : 1.9;
            engine.frameBox(box, { dir, pad: ctxPad });
          }
        }
      }
      setReady(true);
      if (q.type !== 'find') window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  // the station number sits in a glass chip beside the pin, joined to the pin head by a leader line,
  // pushed away from the bone so it never covers the landmark being asked about
  useEffect(() => {
    const off = engine.onFrame(() => {
      const el = tagRef.current, svg = pinLine.current;
      const head = engine.getPinHead();
      if (!el || !svg) return;
      if (!head) {
        el.style.display = 'none';
        svg.style.visibility = 'hidden';
        return;
      }
      const pr = engine.project(head, true);
      if (pr.behind) {
        el.style.display = 'none';
        svg.style.visibility = 'hidden';
        return;
      }
      const box = (svg.parentElement ?? svg).getBoundingClientRect();
      const lm = q.landmark;
      const bone = lm ? engine.objects.get(lm.on) : undefined;
      let dx = 0.75, dy = -0.66;
      if (bone) {
        const c = engine.project(engine.worldPointOn(bone.rec.id, bone.center));
        const vx = pr.x - c.x, vy = pr.y - c.y;
        const len = Math.hypot(vx, vy);
        if (len > 4) {
          dx = vx / len;
          dy = vy / len;
        }
      }
      const reach = 78;
      const x = Math.max(36, Math.min(box.width - 36, pr.x + dx * reach));
      const y = Math.max(box.height * 0.22, Math.min(box.height * 0.72, pr.y + dy * reach));
      el.style.display = 'grid';
      svg.style.visibility = 'visible';
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
      el.classList.toggle('dim', pr.occluded);
      const d = `M${pr.x.toFixed(1)} ${pr.y.toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}`;
      svg.querySelectorAll('path').forEach((pth) => pth.setAttribute('d', d));
      const dot = svg.querySelector('circle');
      dot?.setAttribute('cx', pr.x.toFixed(1));
      dot?.setAttribute('cy', pr.y.toFixed(1));
    });
    return () => {
      off();
      engine.setPin(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, q.id]);

  // find-it questions are answered by clicking the model
  useEffect(() => {
    if (q.type !== 'find' || done) return;
    const off = engine.onPick((hit) => {
      if (!hit) return;
      const rec = db.byId.get(hit.id);
      if (!rec) return;
      const ok = q.ids.includes(hit.id) || rec.k === q.key || db.parentConcept(rec) === q.key;
      const v: Verdict = { ok, typo: false, matched: null, distance: ok ? 0 : 99 };
      setPicked(hit.id);
      finish(v, db.clickedName(rec), hit.id);
    });
    return () => {
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id, done]);

  // OSPE timer
  useEffect(() => {
    if (!exam || done || !ready) return;
    if (left <= 0) {
      submit(true);
      return;
    }
    const tm = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(tm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, done, left, ready]);

  const finish = (v: Verdict, typed: string, pickedId: string | null = null) => {
    setVerdict(v);
    results.current.set(q.id, v.ok);
    onAnswer({ q, input: typed, verdict: v, pickedId });
    const tints = new Map<string, Tint>();
    if (q.type !== 'landmark') q.ids.forEach((id) => tints.set(id, v.ok ? 'right' : 'target'));
    if (q.type === 'find' && !v.ok && pickedId) tints.set(pickedId, 'wrong');
    engine.setTint(tints);
    if (q.type === 'find' && !v.ok) {
      engine.setXray(true, new Set([...q.ids, ...[...engine.objects.values()].filter((o) => o.layer === 'skeleton').map((o) => o.rec.id)]));
      engine.frameIds(q.ids, { pad: 1.8 });
    }
    if (exam) window.setTimeout(() => commitAndNext(v.ok, v.typo), 250);
  };

  const submit = (timeUp = false) => {
    if (done) return;
    if (q.type === 'find') {
      if (timeUp) finish({ ok: false, typo: false, matched: null, distance: 99 }, '');
      return;
    }
    if (!input.trim() && !timeUp) return;
    const v = grade(input, q.answers, { requireSide: settings.requireSide && q.type === 'name', side: q.side });
    finish(v, input);
  };

  const commitAndNext = (ok: boolean, typo: boolean) => {
    review(q.id, ok, typo);
    onNext();
  };

  const overrideRight = () => {
    setOverride(true);
    onAnswer({ q, input, verdict: { ok: true, typo: false, matched: null, distance: 0 }, overridden: true });
  };

  const c = db.content.get(q.key);
  const f = (c?.facts ?? {}) as Record<string, unknown>;
  const lang = settings.lang;
  const promptText = {
    name: t.promptName, landmark: t.promptLandmark, find: t.promptFind, origin: t.promptOrigin, insertion: t.promptInsertion,
    nerve: t.promptNerve, action: t.promptAction, joint: t.promptJoint, boneType: t.promptBoneType, roots: t.promptRoots,
  }[q.type];
  const showsName = ['origin', 'insertion', 'nerve', 'action', 'joint', 'boneType', 'roots', 'find'].includes(q.type);
  const card = getCard(q.id);
  const correctDisplay = q.type === 'find' || q.type === 'name' || q.type === 'landmark' ? db.latin(q.key) : q.display;
  const total = settings.examSeconds;
  const R = 27, C = 2 * Math.PI * R;
  const state = override || (verdict?.ok && !verdict.typo) ? 'right' : verdict?.ok ? 'almost' : 'wrong';
  const latinAnswer = q.type === 'name' || q.type === 'landmark';

  return (
    <div className="quiz-wrap run">
      <svg ref={pinLine} className="leader pin-leader" style={{ visibility: 'hidden' }} aria-hidden="true">
        <path className="leader-halo" />
        <path className="leader-line" />
        <circle className="leader-dot" r="3.5" />
      </svg>
      <div ref={tagRef} className="pin-tag glass num" style={{ display: 'none' }} aria-hidden="true">
        {idx + 1}
      </div>
      <section className="placard glass settle" aria-live="polite">
        <div className={`placard-num ${exam ? 'timed' : ''} ${exam && left <= 10 ? 'low' : ''}`}>
          {exam && (
            <svg viewBox="0 0 64 64" className="ring" aria-hidden="true">
              <circle cx="32" cy="32" r={R} className="ring-bg" />
              <circle cx="32" cy="32" r={R} className="ring-fg" strokeDasharray={C} strokeDashoffset={C * (1 - Math.max(0, left) / total)} />
            </svg>
          )}
          <span className="num big">{idx + 1}</span>
        </div>
        <div className="placard-body">
          <p className="placard-meta">
            <span>
              {t.station} {idx + 1} {t.of} {session.length}
            </span>
            {exam ? (
              <span className={`num timer ${left <= 10 ? 'low' : ''}`}>{fmt(t.secondsLeft, { n: Math.max(0, left) })}</span>
            ) : (
              <button className="link" onClick={onQuit}>
                {t.finish}
              </button>
            )}
          </p>
          <p className="placard-prompt">{promptText}</p>
          {showsName && <p className="placard-latin latin">{db.latin(q.key)}</p>}
          {!exam && card && (
            <p className="placard-card num">
              {card.right}/{card.seen}
            </p>
          )}
        </div>
        <ol className="placard-track" aria-hidden="true">
          {session.map((s, i) => (
            <li key={s.id} data-s={i === idx ? 'c' : results.current.has(s.id) && !exam ? (results.current.get(s.id) ? 'r' : 'w') : undefined} />
          ))}
        </ol>
      </section>

      {!done || exam ? (
        <form
          className="answer glass settle"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          {hint && !done && <p className="hint-text latin">{hintFor(q.display)}</p>}
          {q.type !== 'find' ? (
            <div className="answer-row">
              <input
                ref={inputRef}
                className={latinAnswer ? 'latin' : ''}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={latinAnswer ? t.typeLatin : t.typeAnswer}
                aria-label={latinAnswer ? t.typeLatin : t.typeAnswer}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                lang="la"
              />
              <button className="btn primary" type="submit" disabled={!input.trim() || !ready || done}>
                {t.submit}
              </button>
            </div>
          ) : (
            <p className="answer-find">{t.clickModel}</p>
          )}
          {!exam && (
            <div className="answer-aux">
              {q.type !== 'find' ? (
                <button type="button" className="link" onClick={() => setHint(true)} disabled={hint}>
                  {t.hintBtn}
                </button>
              ) : (
                <span />
              )}
              <button type="button" className="link" onClick={() => finish({ ok: false, typo: false, matched: null, distance: 99 }, '')}>
                {t.skip}
              </button>
            </div>
          )}
        </form>
      ) : (
        verdict && (
          <section className="feedback glass" data-v={state} role="status">
            <p className="verdict">
              {state === 'wrong' ? <IconCross /> : <IconCheck />}
              {override
                ? t.correct
                : verdict.ok
                  ? verdict.typo
                    ? t.almost
                    : t.correct
                  : q.type === 'find' && picked
                    ? `${t.wrong}. ${t.findWrong}: ${db.clickedName(db.byId.get(picked)!)}`
                    : t.wrong}
            </p>
            <p className="fb-answer">
              <small>{t.answerWas}</small>
              <span className="latin">{correctDisplay}</span>
            </p>
            {q.type !== 'find' && input && (
              <p className="fb-you">
                <small>{t.youWrote}</small>
                <span className="latin">{input}</span>
              </p>
            )}
            {['origin', 'insertion', 'nerve', 'action', 'joint', 'boneType', 'roots'].includes(q.type) && (
              <dl className="facts">
                {q.type === 'origin' && f.origin ? <Fact label={t.origin} v={(f.origin as { la?: string }).la} /> : null}
                {q.type === 'insertion' && f.insertion ? <Fact label={t.insertion} v={(f.insertion as { la?: string }).la} /> : null}
                {q.type === 'nerve' && f.nerve ? (
                  <Fact label={t.nerve} v={`${(f.nerve as { la?: string }).la ?? ''} ${(f.nerve as { roots?: string }).roots ? '(' + (f.nerve as { roots?: string }).roots + ')' : ''}`} />
                ) : null}
                {q.type === 'action' && f.action ? <Fact label={t.action} v={((f.action as Record<string, string>)[lang] ?? (f.action as Record<string, string>).en) as string} plain /> : null}
                {q.type === 'joint' ? <Fact label={t.joint} v={[f.class, f.subtype, f.axes].filter(Boolean).join(', ')} /> : null}
              </dl>
            )}
            {latinAnswer && c?.desc && <p className="desc">{c.desc[lang] ?? c.desc.en}</p>}
            <div className="fb-actions">
              {!verdict.ok && !override && q.type !== 'find' ? (
                <button className="link" onClick={overrideRight}>
                  {t.iWasRight}
                </button>
              ) : (
                <span />
              )}
              <button className="btn primary" onClick={() => commitAndNext(override || verdict.ok, verdict.typo && !override)} autoFocus>
                {idx + 1 >= session.length ? t.finish : t.next}
              </button>
            </div>
          </section>
        )
      )}
    </div>
  );
}

function Fact({ label, v, plain }: { label: string; v?: unknown; plain?: boolean }) {
  if (!v) return null;
  return (
    <div className="fact">
      <dt>{label}</dt>
      <dd className={plain ? '' : 'latin'}>{String(v)}</dd>
    </div>
  );
}

// ------------------------------------------------------------------ results
function Results({ answers, total, exam, onMisses, onBack }: { answers: Answer[]; total: number; exam: boolean; onMisses: () => void; onBack: () => void }) {
  const { db, t } = useApp();
  const right = answers.filter((a) => a.verdict.ok || a.overridden).length;
  const misses = answers.filter((a) => !a.verdict.ok && !a.overridden).length;
  return (
    <div className="quiz-wrap">
      <div className="quiz-scroll">
        <section className="results glass">
          <h1>{t.results}</h1>
          <p className="score">
            <span className="num big">{right}</span>
            <span className="num of">/{total}</span>
          </p>
          <p className="lede">
            {t.score} {fmt(t.percent, { n: total ? Math.round((right / total) * 100) : 0 })}
            {exam ? `, ${t.exam}` : ''}
          </p>
          <ol className="res-list">
            {answers.map((a) => {
              const ok = a.verdict.ok || a.overridden;
              return (
                <li key={a.q.id} data-ok={ok || undefined}>
                  <span className="mark">{ok ? <IconCheck /> : <IconCross />}</span>
                  <span>
                    <span className="latin">{a.q.type === 'name' || a.q.type === 'landmark' || a.q.type === 'find' ? db.latin(a.q.key) : `${db.latin(a.q.key)}: ${a.q.display}`}</span>
                    {a.input && (
                      <small>
                        {t.youWrote}: <span className="latin">{a.input}</span>
                      </small>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="btn-row">
            {misses > 0 && (
              <button className="btn primary" onClick={onMisses}>
                {t.reviewMistakes} <span className="num">({misses})</span>
              </button>
            )}
            <button className="btn ghost" onClick={onBack}>
              {t.backToDecks}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
