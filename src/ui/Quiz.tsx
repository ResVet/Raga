import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from './ctx';
import { DECKS, deckStats, makeSession, type DeckDef, type QType, type Question } from '../quiz/decks';
import { grade, type Verdict } from '../quiz/grader';
import { review, getCard } from '../quiz/srs';
import { LAYERS, type LayerId } from '../engine/layers';
import type { Tint } from '../engine/Engine';
import { idsInRegion, inRegion } from './regions';
import type { PackId } from '../data/types';

type Phase = 'decks' | 'setup' | 'run' | 'results';

interface Answer {
  q: Question;
  input: string;
  verdict: Verdict;
  pickedId?: string | null;
  overridden?: boolean;
}

const TYPE_LABEL: Record<QType, keyof ReturnType<typeof labels>> = {
  name: 'qName', landmark: 'qLandmark', find: 'qFind', origin: 'qOrigin', insertion: 'qInsertion', nerve: 'qNerve',
  action: 'qAction', joint: 'qJoint', boneType: 'qBoneType', roots: 'qNerve',
};
function labels(t: Record<string, string>) {
  return t as unknown as { qName: string; qLandmark: string; qFind: string; qOrigin: string; qInsertion: string; qNerve: string; qAction: string; qJoint: string; qBoneType: string };
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

  const buildDeck = useCallback(
    async (d: DeckDef) => {
      setBusy(t.loadingModel);
      try {
        await ensurePacks(d.packs);
      } finally {
        setBusy(null);
      }
      return d.build(db, ctx);
    },
    [db, ctx, ensurePacks, t.loadingModel],
  );

  // "Quiz me on this" from the atlas: every question about one structure.
  useEffect(() => {
    if (!focusKey) return;
    (async () => {
      const all: Question[] = [];
      for (const d of DECKS) {
        if (!d.packs.every((p) => engine.isLoaded(p))) continue;
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
    })();
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

  if (busy) {
    return (
      <div className="quiz-wrap">
        <div className="decks" style={{ display: 'grid', placeItems: 'center' }}>
          <p>{busy}</p>
        </div>
      </div>
    );
  }

  if (phase === 'decks') return <DeckList onOpen={openDeck} version={version} />;
  if (phase === 'setup' && deck)
    return (
      <div className="quiz-wrap">
        <div className="decks">
          <div className="setup">
            <p className="deck-code">{deck.code}</p>
            <h1>{settings.lang === 'id' ? deck.idn : deck.en}</h1>
            <p className="lede">{deck.blurb[settings.lang]}</p>
            <fieldset>
              <legend>{t.practice} / {t.exam}</legend>
              {(['practice', 'exam'] as const).map((m) => (
                <label className="opt" key={m}>
                  <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} />
                  <span>
                    {m === 'practice' ? t.practice : t.exam}
                    <small>{m === 'practice' ? t.practiceHelp : t.examHelp}</small>
                  </span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>{t.questionTypes}</legend>
              {deck.types.map((ty) => {
                const n = pool.filter((q) => q.type === ty).length;
                return (
                  <label className="opt" key={ty}>
                    <input
                      type="checkbox"
                      disabled={!n}
                      checked={types.includes(ty)}
                      onChange={(e) => setTypes((cur) => (e.target.checked ? [...cur, ty] : cur.filter((x) => x !== ty)))}
                    />
                    <span>
                      {labels(t as never)[TYPE_LABEL[ty]]}
                      <small>
                        {n} {t.questions}
                      </small>
                    </span>
                  </label>
                );
              })}
            </fieldset>
            <fieldset>
              <legend>
                {size} {t.questions}
              </legend>
              <input type="range" min={5} max={60} step={5} value={size} onChange={(e) => setSize(parseInt(e.target.value, 10))} aria-label={t.questions} />
            </fieldset>
            <div className="btn-row">
              <button className="btn primary" onClick={() => start()} disabled={!types.length}>
                {t.start}
              </button>
              <button className="btn ghost" onClick={() => setPhase('decks')}>
                {t.backToDecks}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
  return <DeckList onOpen={openDeck} version={version} />;
}

// ------------------------------------------------------------------ deck list
function DeckList({ onOpen }: { onOpen: (d: DeckDef) => void; version: number }) {
  const { db, engine, t, settings } = useApp();
  const stats = useMemo(() => {
    const out = new Map<string, ReturnType<typeof deckStats>>();
    for (const d of DECKS) {
      if (!d.packs.every((p) => engine.isLoaded(p))) continue;
      out.set(d.id, deckStats(d.build(db, { inRegion: (id, r) => inRegion(engine, id, r), english: false })));
    }
    return out;
  }, [db, engine]);
  return (
    <div className="quiz-wrap">
      <div className="decks">
        <h1>{t.chooseDeck}</h1>
        <p className="lede">
          {settings.lang === 'id'
            ? 'Materi disusun mengikuti praktikum anatomi Blok 4 FK Unsri. Jawab dengan nama Latin; ejaan yang hampir benar tetap dihitung, dengan catatan.'
            : 'Decks follow the Blok 4 anatomy practicals at FK Unsri. Answer with the Latin name; near misses in spelling still count, with a note.'}
        </p>
        <div className="deck-grid">
          {DECKS.map((d) => {
            const s = stats.get(d.id);
            const pct = s && s.total ? Math.round((s.mastered / s.total) * 100) : 0;
            return (
              <button key={d.id} className="deck" onClick={() => onOpen(d)}>
                <span className="deck-code">{d.code}</span>
                <h3 className="deck-title">{settings.lang === 'id' ? d.idn : d.en}</h3>
                <p className="deck-sub">{d.blurb[settings.lang]}</p>
                {s ? (
                  <>
                    <span className="deck-stats">
                      <span>
                        <b>{s.total}</b> {t.questions}
                      </span>
                      <span>
                        <b>{s.due}</b> {t.dueShort}
                      </span>
                      <span>
                        <b>{s.mastered}</b> {t.mastered}
                      </span>
                    </span>
                    <span className="meter" aria-hidden="true">
                      <i style={{ width: `${pct}%` }} />
                    </span>
                  </>
                ) : (
                  <span className="deck-stats">{t.tapToLoad}</span>
                )}
              </button>
            );
          })}
        </div>
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
      for (const l of LAYERS) engine.setLayer(l.id, q.layers.includes(l.id as LayerId));
      for (const l of LAYERS) engine.setLayerOpacity(l.id, 1);
      engine.setLayer('attachments', true);
      engine.setAttachments([]);
      engine.setColorMode('real');
      engine.setClip(null);
      engine.setExplode(0, false);
      engine.setLandmarks([]);
      engine.setHidden([]);
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
        const p = engine.worldPointOn(l.on, new THREE.Vector3(...l.p));
        const n = new THREE.Vector3(...l.n);
        const bone = engine.objects.get(l.on);
        const out = bone ? p.clone().sub(bone.center).normalize() : n.clone();
        const dir = n.clone().multiplyScalar(0.65).add(out.multiplyScalar(0.35)).normalize();
        const dist = Math.max(0.15, (bone?.radius ?? 0.1) * 1.3);
        engine.setPin(p, dir, '#f2c230', Math.min(1.4, Math.max(0.4, dist / 0.3)));
        engine.framePoint(p, dir, dist);
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
      if (q.type !== 'find') setTimeout(() => inputRef.current?.focus(), 60);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  // keep the pin's number tag glued to the pin head
  useEffect(() => {
    const off = engine.onFrame(() => {
      const el = tagRef.current;
      const head = engine.getPinHead();
      if (!el) return;
      if (!head) {
        el.style.display = 'none';
        return;
      }
      const pr = engine.project(head, true);
      el.style.display = pr.behind ? 'none' : 'grid';
      el.style.left = `${pr.x}px`;
      el.style.top = `${pr.y}px`;
      el.classList.toggle('dim', pr.occluded);
    });
    return () => {
      off();
      engine.setPin(null);
    };
  }, [engine]);

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
      finish(v, db.latin(db.parentConcept(rec) ?? rec.k), hit.id);
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
    const tm = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(tm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, done, left, ready]);

  const finish = (v: Verdict, typed: string, pickedId: string | null = null) => {
    setVerdict(v);
    results.current.set(q.id, v.ok);
    onAnswer({ q, input: typed, verdict: v, pickedId });
    // reveal on the model
    const tints = new Map<string, Tint>();
    if (q.type !== 'landmark') q.ids.forEach((id) => tints.set(id, v.ok ? 'right' : 'target'));
    if (q.type === 'find' && !v.ok && pickedId) tints.set(pickedId, 'wrong');
    engine.setTint(tints);
    if (q.type === 'find' && !v.ok) {
      engine.setXray(true, new Set([...q.ids, ...[...engine.objects.values()].filter((o) => o.layer === 'skeleton').map((o) => o.rec.id)]));
      engine.frameIds(q.ids, { pad: 1.8 });
    }
    if (exam) setTimeout(() => commitAndNext(v.ok, v.typo), 250);
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
    nerve: t.promptNerve, action: t.promptAction, joint: t.promptJoint, boneType: t.promptBoneType, roots: lang === 'id' ? 'Dari radiks mana saraf ini berasal?' : 'Which spinal roots form this nerve?',
  }[q.type];
  const showsName = ['origin', 'insertion', 'nerve', 'action', 'joint', 'boneType', 'roots', 'find'].includes(q.type);
  const card = getCard(q.id);
  const correctDisplay = q.type === 'find' || q.type === 'name' || q.type === 'landmark' ? db.latin(q.key) : q.display;

  return (
    <div className="quiz-wrap">
      <div ref={tagRef} className="pin-tag" style={{ display: 'none' }} aria-hidden="true">
        {idx + 1}
      </div>
      <section className="station panel" aria-live="polite">
        <div className="station-top">
          <span>
            <span className="num">
              {t.station} {idx + 1}
            </span>{' '}
            {t.of} {session.length}
          </span>
          <span className="dots" aria-hidden="true">
            {session.map((s, i) => (
              <i key={s.id} className={i === idx ? 'c' : results.current.has(s.id) && !exam ? (results.current.get(s.id) ? 'r' : 'w') : ''} />
            ))}
          </span>
          {exam ? (
            <span className={`timer ${left <= 10 ? 'low' : ''}`}>
              {left} {t.timeLeft}
            </span>
          ) : (
            <button className="linkish" onClick={onQuit}>
              {t.finish}
            </button>
          )}
        </div>
        <p className="prompt">
          {promptText}
          {showsName && <span className="latin">{db.latin(q.key)}</span>}
          {!exam && card && <small style={{ display: 'block', color: 'var(--gauze-3)', fontSize: 12.5 }}>{card.right}/{card.seen}</small>}
        </p>
        {q.type !== 'find' && !done && (
          <form
            className="answer-row"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={q.type === 'name' || q.type === 'landmark' ? t.typeLatin : t.typeAnswer}
              aria-label={q.type === 'name' || q.type === 'landmark' ? t.typeLatin : t.typeAnswer}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              lang="la"
            />
            <button className="btn primary" type="submit" disabled={!input.trim() || !ready}>
              {t.submit}
            </button>
          </form>
        )}
        {!done && !exam && (
          <div className="feedback-actions" style={{ marginTop: 8 }}>
            {q.type !== 'find' ? (
              <button className="linkish" onClick={() => setHint(true)}>{t.hintBtn}</button>
            ) : (
              <span />
            )}
            <button className="linkish" onClick={() => finish({ ok: false, typo: false, matched: null, distance: 99 }, '')}>{t.skip}</button>
          </div>
        )}
        {hint && !done && <p className="hint-text latin">{hintFor(q.display)}</p>}
        {done && !exam && verdict && (
          <div className="feedback">
            <p className={`verdict ${override || (verdict.ok && !verdict.typo) ? 'r' : verdict.ok ? 'a' : 'w'}`}>
              {override ? t.correct : verdict.ok ? (verdict.typo ? t.almost : t.correct) : q.type === 'find' && picked ? `${t.wrong}. ${t.findWrong} ${db.latin(db.parentConcept(db.byId.get(picked)!) ?? db.byId.get(picked)!.k)}` : t.wrong}
            </p>
            <p className="answer-line">
              <small>{t.answerWas}</small>
              <span className="latin">{correctDisplay}</span>
            </p>
            {q.type !== 'find' && input && (
              <p className="answer-line">
                <small>{t.youWrote}</small>
                <span className="latin">{input}</span>
              </p>
            )}
            {['origin', 'insertion', 'nerve', 'action', 'joint', 'boneType', 'roots'].includes(q.type) && (
              <dl className="facts">
                {q.type === 'origin' && f.origin ? <Fact label={t.origin} v={(f.origin as { la?: string }).la} /> : null}
                {q.type === 'insertion' && f.insertion ? <Fact label={t.insertion} v={(f.insertion as { la?: string }).la} /> : null}
                {q.type === 'nerve' && f.nerve ? <Fact label={t.nerve} v={`${(f.nerve as { la?: string }).la ?? ''} ${(f.nerve as { roots?: string }).roots ? '(' + (f.nerve as { roots?: string }).roots + ')' : ''}`} /> : null}
                {q.type === 'action' && f.action ? <Fact label={t.action} v={((f.action as Record<string, string>)[lang] ?? (f.action as Record<string, string>).en) as string} plain /> : null}
                {q.type === 'joint' ? <Fact label={t.joint} v={[f.class, f.subtype, f.axes].filter(Boolean).join(', ')} /> : null}
              </dl>
            )}
            {(q.type === 'name' || q.type === 'landmark') && c?.desc && <p className="desc" style={{ fontSize: 14, color: 'var(--gauze-2)', margin: '6px 0 0' }}>{c.desc[lang] ?? c.desc.en}</p>}
            <div className="feedback-actions">
              {!verdict.ok && !override && q.type !== 'find' ? (
                <button className="linkish" onClick={overrideRight}>{t.iWasRight}</button>
              ) : (
                <span />
              )}
              <button className="btn primary" onClick={() => commitAndNext(override || verdict.ok, verdict.typo && !override)} autoFocus>
                {idx + 1 >= session.length ? t.finish : t.next}
              </button>
            </div>
          </div>
        )}
      </section>
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
      <div className="decks">
        <div className="results-page">
          <h1>{t.results}</h1>
          <p className="score-big">
            {right}/{total}
          </p>
          <p className="lede">
            {t.score}: {total ? Math.round((right / total) * 100) : 0}%{exam ? ` (${t.exam})` : ''}
          </p>
          <ul className="res-list">
            {answers.map((a) => (
              <li key={a.q.id}>
                <span className={`mark ${a.verdict.ok || a.overridden ? 'r' : 'w'}`}>{a.verdict.ok || a.overridden ? '✓' : '✗'}</span>
                <span>
                  <span className="latin">{a.q.type === 'name' || a.q.type === 'landmark' || a.q.type === 'find' ? db.latin(a.q.key) : `${db.latin(a.q.key)}: ${a.q.display}`}</span>
                  {a.input && (
                    <small>
                      {' '}
                      {t.youWrote}: {a.input}
                    </small>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            {misses > 0 && (
              <button className="btn primary" onClick={onMisses}>
                {t.reviewMistakes} ({misses})
              </button>
            )}
            <button className="btn ghost" onClick={onBack}>
              {t.backToDecks}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
