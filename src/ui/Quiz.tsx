import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from './ctx';
import { DECKS, buildDeck, deckStats, dueQuestions, makeSession, optionText, questionIndex, type DeckDef, type QType, type Question } from '../quiz/decks';
import { review } from '../quiz/srs';
import { loadSession, saveSession, type SavedSession } from '../quiz/session';
import type { Lang } from '../data/types';
import { fmt } from '../i18n';
import { IconCheck, IconCross } from './icons';
import { Station, type Answer } from './QuizStation';
import { SecondsInput } from './SecondsInput';
import { TYPE_LABEL } from './quizText';
import { clearStage } from './quizStage';

type Phase = 'decks' | 'setup' | 'run' | 'results';

/** A session from its first station to its results. */
interface Run {
  /** Deck it was started from, or null for a mixed one (due cards, one structure). */
  deck: string | null;
  mode: 'practice' | 'exam';
  choice: boolean;
  session: Question[];
  idx: number;
  /** One entry per finished station, in order. */
  answers: Answer[];
  seed: string;
}

// The session a student left for another tab of the app. It is picked up again when they come back,
// for as long as the page stays open. A reload goes through the stored copy instead (quiz/session.ts).
let parked: { phase: 'run' | 'results'; run: Run } | null = null;

const deckName = (d: DeckDef, lang: Lang) => `${d.code} ${lang === 'id' ? d.idn : d.en}`;

export function Quiz({ focusKey, onFocusDone, onAtlas }: { focusKey: string | null; onFocusDone: () => void; onAtlas?: (key: string) => void }) {
  const app = useApp();
  const { engine, db, t, settings, ensurePacks } = app;
  const english = settings.acceptEnglish;
  const [start0] = useState(() => parked);
  const [phase, setPhase] = useState<Phase>(start0?.phase ?? 'decks');
  const [run, setRun] = useState<Run | null>(start0?.run ?? null);
  const [saved, setSaved] = useState<SavedSession | null>(() => (start0 ? null : loadSession()));
  const [deck, setDeck] = useState<DeckDef | null>(null);
  // built from the current settings every time, so "Accept English answers" switched on in the setup applies at once
  const pool = useMemo(() => (deck ? buildDeck(db, deck, english) : []), [db, deck, english]);
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [types, setTypes] = useState<QType[]>([]);
  const [size, setSize] = useState(20);
  const [version, setVersion] = useState(0);
  // the latest phase and run, readable from callbacks that fire between renders (a timer, a late click)
  const live = useRef<{ phase: Phase; run: Run | null }>({ phase: start0?.phase ?? 'decks', run: start0?.run ?? null });

  const go = useCallback((p: Phase, r: Run | null) => {
    live.current = { phase: p, run: r };
    setPhase(p);
    setRun(r);
  }, []);

  useEffect(() => {
    parked = null;
    return () => {
      const { phase: p, run: r } = live.current;
      parked = r && (p === 'run' || p === 'results') ? { phase: p, run: r } : null;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'run') clearStage(engine);
  }, [phase, engine]);

  // keep a copy of the running session on the device; the results screen ends it
  useEffect(() => {
    if (phase === 'run' && run)
      saveSession({
        v: 1,
        deck: run.deck,
        mode: run.mode,
        choice: run.choice,
        ids: run.session.map((q) => q.id),
        answers: run.answers.map((a) => ({ id: a.q.id, ok: a.ok, typo: a.typo, input: a.input, overridden: a.overridden, unscored: a.unscored })),
        seed: run.seed,
        at: Date.now(),
      });
    else if (phase === 'results') saveSession(null);
  }, [phase, run]);

  const startRun = useCallback(
    (o: { deck: string | null; mode: 'practice' | 'exam'; session: Question[]; choice?: boolean }) => {
      setSaved(null);
      go('run', { deck: o.deck, mode: o.mode, choice: o.choice ?? settings.answerMode === 'choice', session: o.session, idx: 0, answers: [], seed: Date.now().toString(36) });
    },
    [go, settings.answerMode],
  );

  // "Quiz me on this" from the atlas: every question about one structure, its landmarks and its clinical cases
  useEffect(() => {
    if (!focusKey) return;
    onFocusDone();
    const list: Question[] = [];
    for (const q of questionIndex(db, english).values()) {
      const own = q.key === focusKey && q.type !== 'case';
      const onIt = !!q.landmark && q.type !== 'lmBone' && db.byId.get(q.landmark.on)?.k === focusKey;
      if (own || onIt || q.case?.focus.includes(focusKey)) list.push(q);
    }
    if (!list.length) {
      app.toast(t.noQuestionsHere);
      return;
    }
    startRun({ deck: null, mode: 'practice', session: list.slice(0, 30) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey]);

  const openDeck = (d: DeckDef) => {
    const qs = buildDeck(db, d, english);
    setDeck(d);
    setTypes(d.types.filter((ty) => qs.some((q) => q.type === ty)));
    go('setup', null);
    // fetch the models while the options are being chosen; a station waits for whatever is still missing
    ensurePacks(d.packs).catch(() => {});
  };

  const onDone = useCallback(
    (a: Answer) => {
      const { phase: p, run: r } = live.current;
      // a station that is already gone can still call in (its timer, a second click): only the current one counts
      if (p !== 'run' || !r || r.session[r.idx]?.id !== a.q.id) return;
      if (!a.unscored) review(a.q.id, a.ok, a.typo);
      const answers = [...r.answers, a];
      if (r.idx + 1 >= r.session.length) {
        go('results', { ...r, answers });
        setVersion((v) => v + 1);
      } else go('run', { ...r, answers, idx: r.idx + 1 });
    },
    [go],
  );

  const quit = () => {
    const r = live.current.run;
    if (r && r.answers.length) go('results', r);
    else {
      saveSession(null);
      go('decks', null);
    }
    setVersion((v) => v + 1);
  };

  const resume = (s: SavedSession) => {
    const index = questionIndex(db, english, s.deck);
    const session = s.ids.map((id) => index.get(id)).filter((q): q is Question => !!q);
    const answers: Answer[] = [];
    for (const a of s.answers) {
      const q = index.get(a.id);
      if (q) answers.push({ q, input: a.input, ok: a.ok, typo: a.typo, overridden: a.overridden, unscored: a.unscored });
    }
    setSaved(null);
    if (!session.length || answers.length >= session.length) {
      saveSession(null);
      app.toast(t.resumeGone);
      return;
    }
    go('run', { deck: s.deck, mode: s.mode, choice: s.choice, session, idx: answers.length, answers, seed: s.seed || Date.now().toString(36) });
  };

  if (phase === 'setup' && deck)
    return (
      <Setup
        deck={deck}
        pool={pool}
        mode={mode}
        setMode={setMode}
        types={types}
        setTypes={setTypes}
        size={size}
        setSize={setSize}
        onStart={() => {
          const session = makeSession(pool, { types, size, mode });
          if (!session.length) app.toast(t.emptyDeck);
          else startRun({ deck: deck.id, mode, session });
        }}
        onBack={() => go('decks', null)}
      />
    );

  if (phase === 'run' && run && run.session[run.idx]) {
    const q = run.session[run.idx];
    const exam = run.mode === 'exam';
    const marks = run.session.map((_, i) => {
      const a = run.answers[i];
      return exam || !a || a.unscored ? null : a.ok;
    });
    return (
      <Station
        key={`${run.seed}:${run.idx}:${q.id}`}
        q={q}
        idx={run.idx}
        total={run.session.length}
        exam={exam}
        choice={run.choice}
        seed={run.seed}
        marks={marks}
        onDone={onDone}
        onQuit={quit}
        onAtlas={exam ? undefined : onAtlas}
      />
    );
  }

  if (phase === 'results' && run)
    return (
      <Results
        run={run}
        onMisses={(misses) => startRun({ deck: run.deck, mode: 'practice', session: misses, choice: run.choice })}
        onBack={() => {
          go('decks', null);
          setVersion((v) => v + 1);
        }}
      />
    );

  return (
    <DeckPicker
      onOpen={openDeck}
      version={version}
      saved={saved}
      onResume={() => saved && resume(saved)}
      onDiscard={() => {
        saveSession(null);
        setSaved(null);
      }}
      onReviewDue={() => {
        const list = dueQuestions(db, english).slice(0, 30);
        if (list.length) startRun({ deck: null, mode: 'practice', session: list });
      }}
    />
  );
}

// ------------------------------------------------------------------ deck picker: slides on the backdrop
interface PickerProps {
  onOpen: (d: DeckDef) => void;
  version: number;
  saved: SavedSession | null;
  onResume: () => void;
  onDiscard: () => void;
  onReviewDue: () => void;
}

function DeckPicker({ onOpen, version, saved, onResume, onDiscard, onReviewDue }: PickerProps) {
  const { db, t, settings } = useApp();
  const lang = settings.lang;
  const { rows, due } = useMemo(() => {
    const list = DECKS.map((d) => ({ d, s: deckStats(buildDeck(db, d, false)) })).filter((x) => x.s.total > 0);
    return { rows: list, due: dueQuestions(db, false).length };
    // `version` changes when a session ends, which is when the numbers move
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, version]);
  const savedDeck = saved ? DECKS.find((d) => d.id === saved.deck) : undefined;
  return (
    <div className="quiz-wrap">
      <div className="quiz-scroll">
        <header className="deck-intro">
          <h1>{t.chooseDeck}</h1>
          <p>{t.deckLede}</p>
        </header>
        {(saved || due > 0) && (
          <div className="deck-now">
            {saved && (
              <section className="now-card glass settle" aria-label={t.resumeTitle}>
                <p>
                  <b>{t.resumeTitle}</b>
                  <span>{fmt(t.resumeInfo, { deck: savedDeck ? deckName(savedDeck, lang) : t.mixedSession, n: saved.answers.length + 1, m: saved.ids.length })}</span>
                </p>
                <span className="now-actions">
                  <button className="btn primary" onClick={onResume}>
                    {t.resume}
                  </button>
                  <button className="btn ghost" onClick={onDiscard}>
                    {t.discard}
                  </button>
                </span>
              </section>
            )}
            {due > 0 && (
              <section className="now-card glass settle" aria-label={t.reviewDue}>
                <p>
                  <b>
                    {t.reviewDue} <span className="num">({due})</span>
                  </b>
                  <span>{t.reviewDueHelp}</span>
                </p>
                <span className="now-actions">
                  <button className={saved ? 'btn' : 'btn primary'} onClick={onReviewDue}>
                    {t.start}
                  </button>
                </span>
              </section>
            )}
          </div>
        )}
        <ul className="slides">
          {rows.map(({ d, s }, i) => {
            const pct = Math.round((s.mastered / s.total) * 100);
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
  // clinical cases are always multiple choice, so the options about typed answers do not apply to them
  const typed = d.types.some((ty) => ty !== 'case');
  const available = p.pool.filter((q) => p.types.includes(q.type)).length;
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
          {typed && (
            <fieldset className="modes">
              <legend>{t.answerMode}</legend>
              {(['type', 'choice'] as const).map((m) => (
                <label className="mode-opt" key={m}>
                  <input type="radio" name="answer" checked={settings.answerMode === m} onChange={() => setSettings({ answerMode: m })} />
                  <span>
                    <b>{m === 'type' ? t.answerType : t.answerChoice}</b>
                    <small>{m === 'type' ? t.answerTypeHelp : t.answerChoiceHelp}</small>
                  </span>
                </label>
              ))}
            </fieldset>
          )}
          {d.types.length > 1 && (
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
          )}
          <fieldset>
            <legend>{t.howMany}</legend>
            <div className="field-row">
              <input type="range" className="range" min={5} max={60} step={5} value={p.size} onChange={(e) => p.setSize(parseInt(e.target.value, 10))} aria-label={t.howMany} />
              <output className="num big-num">{Math.min(p.size, Math.max(available, 0))}</output>
            </div>
          </fieldset>
          {(typed || p.mode === 'exam') && (
            <fieldset>
              <legend>{t.quizSettings}</legend>
              {typed && (
                <>
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
                </>
              )}
              {p.mode === 'exam' && (
                <label className="field-row">
                  <span>{t.secondsPerStation}</span>
                  <SecondsInput value={settings.examSeconds} onChange={(n) => setSettings({ examSeconds: n })} />
                </label>
              )}
            </fieldset>
          )}
          <div className="btn-row">
            <button className="btn primary" onClick={p.onStart} disabled={!available}>
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

// ------------------------------------------------------------------ results
function Results({ run, onMisses, onBack }: { run: Run; onMisses: (misses: Question[]) => void; onBack: () => void }) {
  const { db, t, settings } = useApp();
  const lang = settings.lang;
  const scored = run.answers.filter((a) => !a.unscored);
  const right = scored.filter((a) => a.ok).length;
  const misses = scored.filter((a) => !a.ok).map((a) => a.q);
  const total = scored.length;
  const label = (q: Question) => {
    if (q.case) return q.case.stem[lang] ?? q.case.stem.en ?? '';
    return q.type === 'name' || q.type === 'landmark' || q.type === 'find' ? db.latin(q.key) : `${q.label ?? db.latin(q.key)}: ${q.display}`;
  };
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
            {run.mode === 'exam' ? `, ${t.exam}` : ''}
          </p>
          {run.answers.length < run.session.length && <p className="lede">{fmt(t.answeredOf, { n: run.answers.length, m: run.session.length })}</p>}
          <ol className="res-list">
            {run.answers.map((a) => (
              <li key={a.q.id} data-ok={a.ok || undefined} data-void={a.unscored || undefined}>
                <span className="mark">{a.ok ? <IconCheck /> : <IconCross />}</span>
                <span>
                  <span className={a.q.case ? 'res-stem' : 'latin'}>{label(a.q)}</span>
                  {a.q.case && (
                    <small>
                      {t.answerWas}: {optionText(a.q.case.options[0], lang)}
                    </small>
                  )}
                  {a.unscored ? (
                    <small>{t.notScored}</small>
                  ) : (
                    a.input &&
                    !(a.q.case && a.ok) && (
                      <small>
                        {run.choice || a.q.case ? t.youChose : t.youWrote}: <span className={a.q.case ? '' : 'latin'}>{a.input}</span>
                      </small>
                    )
                  )}
                </span>
              </li>
            ))}
          </ol>
          <div className="btn-row">
            {misses.length > 0 && (
              <button className="btn primary" onClick={() => onMisses(misses)}>
                {t.reviewMistakes} <span className="num">({misses.length})</span>
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
