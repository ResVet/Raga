import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useApp } from './ctx';
import { DECKS, buildDeck, type Question } from '../quiz/decks';
import { choicesFor } from '../quiz/choices';
import { grade, type Verdict } from '../quiz/grader';
import { getCard } from '../quiz/srs';
import type { Bi } from '../data/types';
import { fmt } from '../i18n';
import { IconCheck, IconCross } from './icons';
import { promptFor, showsName } from './quizText';
import { clearMarks, revealAnswer, stageQuestion } from './quizStage';

export interface Answer {
  q: Question;
  /** What was typed, or the text of the option or structure that was picked. */
  input: string;
  ok: boolean;
  typo: boolean;
  overridden?: boolean;
  /** The station could not be shown, so it counts neither way. */
  unscored?: boolean;
}

interface StationProps {
  q: Question;
  idx: number;
  total: number;
  exam: boolean;
  /** Offer options instead of a text field. */
  choice: boolean;
  seed: string;
  /** How the stations so far went, for the track under the placard. */
  marks: (boolean | null)[];
  onDone: (a: Answer) => void;
  onQuit: () => void;
  onAtlas?: (key: string) => void;
}

const WRONG: Verdict = { ok: false, typo: false, matched: null, distance: 99 };
const RIGHT: Verdict = { ok: true, typo: false, matched: null, distance: 0 };
// A second Enter or tap that lands this soon after the feedback appears was meant for the answer, not for "Next".
const NEXT_GUARD_MS = 350;

function hintFor(ans: string) {
  return ans
    .split(' ')
    .map((w) => (w.length <= 2 ? w : w.slice(0, 2) + '_'.repeat(Math.min(8, w.length - 2))))
    .join('  ');
}

/** One station: the placard, the answer field or options, and the feedback. Mounted fresh for every question. */
export function Station({ q, idx, total, exam, choice, seed, marks, onDone, onQuit, onAtlas }: StationProps) {
  const { engine, db, t, settings, ensurePacks, packProgress, compact } = useApp();
  const lang = settings.lang;
  const [input, setInput] = useState('');
  const [given, setGiven] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [override, setOverride] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [left, setLeft] = useState(settings.examSeconds);
  const [load, setLoad] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [attempt, setAttempt] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const placardRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const pinLine = useRef<SVGSVGElement>(null);
  const answered = useRef(false);
  const shownAt = useRef(0);
  const advance = useRef<number | null>(null);
  const done = verdict !== null;
  const ready = load === 'ready';
  const isCase = q.type === 'case';

  const choices = useMemo(() => {
    if (!choice && !isCase) return null;
    const deck = DECKS.find((d) => d.id === q.deck);
    const act = db.content.get(q.key)?.facts?.action as Bi | undefined;
    return choicesFor(q, deck ? buildDeck(db, deck, settings.acceptEnglish) : [], seed, {
      lang,
      exclude: [db.latin(q.key)],
      context: act ? `${act.en ?? ''} ${act.id ?? ''}` : '',
    });
  }, [q, choice, isCase, seed, lang, db, settings.acceptEnglish]);

  // ---------------------------------------------------------------- the model
  useEffect(() => {
    let gone = false;
    clearMarks(engine);
    setLoad('loading');
    ensurePacks(q.packs).then(
      () => {
        if (gone) return;
        stageQuestion(engine, q);
        setLoad('ready');
      },
      () => {
        if (!gone) setLoad('failed');
      },
    );
    return () => {
      gone = true;
    };
    // the station is remounted for every question, so only a retry runs this again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  useEffect(
    () => () => {
      if (advance.current !== null) window.clearTimeout(advance.current);
      engine.setPin(null);
    },
    [engine],
  );

  // keep the model clear of the placard above and the answer panel below
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.getBoundingClientRect();
    const top = placardRef.current ? Math.max(0, Math.round(placardRef.current.getBoundingClientRect().bottom - w.top + 8)) : 0;
    let bottom = bottomRef.current ? Math.max(0, Math.round(w.bottom - bottomRef.current.getBoundingClientRect().top + 8)) : 0;
    bottom = Math.max(0, Math.min(bottom, w.height - 140 - top));
    engine.setInsets(0, 0, bottom, top);
  }, [engine]);

  useLayoutEffect(() => {
    measure();
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    if (placardRef.current) ro?.observe(placardRef.current);
    if (bottomRef.current) ro?.observe(bottomRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, done, load, compact]);

  // a phone keyboard covers the bottom of the page without resizing it: lift the answer panel above it
  useEffect(() => {
    const vv = window.visualViewport;
    const wrap = wrapRef.current;
    if (!vv || !wrap) return;
    const apply = () => {
      const zoomed = Math.abs(vv.scale - 1) > 0.01;
      const kb = zoomed ? 0 : Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      const open = kb > 80;
      wrap.style.setProperty('--kb', `${open ? kb : 0}px`);
      wrap.classList.toggle('kb', open);
      measure();
    };
    apply();
    vv.addEventListener('resize', apply);
    vv.addEventListener('scroll', apply);
    return () => {
      vv.removeEventListener('resize', apply);
      vv.removeEventListener('scroll', apply);
    };
  }, [measure]);

  // with a real keyboard the field is ready to type in; on a touch screen the model stays in view until it is tapped
  useEffect(() => {
    if (!ready || choices || q.type === 'find') return;
    if (!window.matchMedia?.('(pointer: fine)').matches) return;
    const tm = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
    return () => window.clearTimeout(tm);
  }, [ready, choices, q.type]);

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
    };
  }, [engine, q]);

  // ---------------------------------------------------------------- answering
  /** Record the verdict. Only the first call counts, so a click and a timeout cannot both answer. */
  const finish = (v: Verdict, typed: string) => {
    if (answered.current) return;
    answered.current = true;
    shownAt.current = performance.now();
    setGiven(typed);
    setVerdict(v);
    // the OSPE gives no feedback: move on after a moment, results come at the end
    if (exam) advance.current = window.setTimeout(() => onDone({ q, input: typed, ok: v.ok, typo: v.typo }), 320);
  };

  const submit = () => {
    if (done || !ready || !input.trim()) return;
    finish(grade(input, q.answers, { requireSide: settings.requireSide && q.type === 'name', side: q.side }), input);
  };

  const choose = (i: number) => {
    if (done || !ready || !choices || !choices[i]) return;
    setChosen(i);
    finish(choices[i].ok ? RIGHT : WRONG, choices[i].text);
  };

  const timeUp = () => {
    if (q.type !== 'find' && !choices && input.trim()) finish(grade(input, q.answers, { requireSide: settings.requireSide && q.type === 'name', side: q.side }), input);
    else finish(WRONG, '');
  };

  const commit = () => {
    if (!verdict) return;
    onDone({ q, input: given, ok: override || verdict.ok, typo: verdict.typo && !override, overridden: override || undefined });
  };

  // find-it questions are answered by clicking the model
  useEffect(() => {
    if (q.type !== 'find' || done || !ready) return;
    const off = engine.onPick((hit) => {
      if (!hit) return;
      const rec = db.byId.get(hit.id);
      if (!rec) return;
      const ok = q.ids.includes(hit.id) || rec.k === q.key || db.parentConcept(rec) === q.key;
      setPicked(hit.id);
      finish(ok ? RIGHT : WRONG, db.clickedName(rec));
    });
    return () => {
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, ready]);

  // number keys pick an option
  useEffect(() => {
    if (!choices || done || !ready) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const i = e.key.length === 1 ? '1234'.indexOf(e.key) : -1;
      if (i < 0 || i >= choices.length) return;
      e.preventDefault();
      choose(i);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices, done, ready]);

  // OSPE clock. It runs against the real time, so a tab left in the background does not stop it.
  useEffect(() => {
    if (!exam || done || !ready) return;
    const end = performance.now() + settings.examSeconds * 1000;
    const tick = () => {
      const s = Math.max(0, Math.ceil((end - performance.now()) / 1000));
      setLeft(s);
      if (s <= 0) timeUp();
    };
    const iv = window.setInterval(tick, 250);
    return () => window.clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, done, ready]);

  // once the answer is in (practice only), show it on the model, after making room for the taller feedback panel
  useEffect(() => {
    if (!verdict || exam) return;
    measure();
    revealAnswer(engine, q, verdict.ok, picked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verdict]);

  // ---------------------------------------------------------------- what to show
  const c = db.content.get(q.key);
  const f = (c?.facts ?? {}) as Record<string, unknown>;
  const card = getCard(q.id);
  const latinAnswer = q.type === 'name' || q.type === 'landmark';
  const state = override || (verdict?.ok && !verdict.typo) ? 'right' : verdict?.ok ? 'almost' : 'wrong';
  const rightText = choices?.find((x) => x.ok)?.text;
  const answerText = isCase ? (rightText ?? q.display) : latinAnswer || q.type === 'find' ? db.latin(q.key) : q.display;
  const note = isCase ? undefined : ((f.clinical ?? f.lesion) as Bi | undefined);
  const factTypes = ['origin', 'insertion', 'nerve', 'action', 'joint', 'boneType', 'roots'];
  const total0 = settings.examSeconds;
  const R = 27, C = 2 * Math.PI * R;
  const progress = q.packs.length ? Math.round((q.packs.reduce((a, p) => a + (engine.isLoaded(p) ? 1 : (packProgress[p] ?? 0)), 0) / q.packs.length) * 100) : 0;
  const oneColumn = isCase || compact || !!choices?.some((x) => x.text.length > 34);
  const setBottom = (el: HTMLElement | null) => {
    bottomRef.current = el;
  };

  let bottom: JSX.Element;
  if (load === 'failed')
    bottom = (
      <section className="answer glass settle" ref={setBottom} role="alert">
        <p className="answer-find">{t.stationFailed}</p>
        <div className="answer-retry">
          <button type="button" className="btn primary" onClick={() => setAttempt((a) => a + 1)}>
            {t.retry}
          </button>
          <button type="button" className="btn ghost" onClick={() => onDone({ q, input: '', ok: false, typo: false, unscored: true })}>
            {t.skipStation}
          </button>
        </div>
      </section>
    );
  else if (load === 'loading')
    bottom = (
      <section className="answer glass" ref={setBottom}>
        <p className="answer-wait" role="status">
          <span className="spinner" aria-hidden="true" />
          <span>{t.stationLoading}</span>
          {progress > 0 && progress < 100 && <span className="num">{progress}%</span>}
        </p>
      </section>
    );
  else if (!verdict || exam)
    bottom = choices ? (
      <section className="answer glass settle" ref={setBottom}>
        <div className={`choices${oneColumn ? ' one' : ''}`} role="group" aria-label={t.chooseAnswer}>
          {choices.map((ch, i) => (
            <button key={ch.text} type="button" className="choice" data-s={chosen === i ? 'picked' : undefined} disabled={done} onClick={() => choose(i)}>
              <span className="choice-key num" aria-hidden="true">
                {i + 1}
              </span>
              <span className={isCase ? 'choice-text' : 'choice-text latin'}>{ch.text}</span>
            </button>
          ))}
        </div>
        {!exam && (
          <div className="answer-aux">
            <span />
            <button type="button" className="link" onClick={() => finish(WRONG, '')}>
              {t.skip}
            </button>
          </div>
        )}
      </section>
    ) : (
      <form
        className="answer glass settle"
        ref={setBottom}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {hint && !done && <p className="hint-text latin">{hintFor(q.oneOf?.[0] ?? q.display)}</p>}
        {q.type !== 'find' ? (
          <div className="answer-row">
            <input
              ref={inputRef}
              className={latinAnswer ? 'latin' : ''}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // a held Enter key must not answer a station the student has not read yet
                if (e.key === 'Enter' && e.repeat) e.preventDefault();
              }}
              placeholder={latinAnswer ? t.typeLatin : t.typeAnswer}
              aria-label={latinAnswer ? t.typeLatin : t.typeAnswer}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="done"
              lang="la"
              disabled={done}
            />
            <button className="btn primary" type="submit" disabled={!input.trim() || done}>
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
            <button type="button" className="link" onClick={() => finish(WRONG, '')}>
              {t.skip}
            </button>
          </div>
        )}
      </form>
    );
  else
    bottom = (
      <section className="feedback glass" data-v={state} role="status" ref={setBottom}>
        <p className="verdict">
          {state === 'wrong' ? <IconCross /> : <IconCheck />}
          {override
            ? t.correct
            : verdict.ok
              ? verdict.typo
                ? t.almost
                : t.correct
              : q.type === 'find' && picked
                ? `${t.wrong}. ${t.findWrong}: ${given}`
                : t.wrong}
        </p>
        <p className="fb-answer">
          <small>{q.oneOf && q.oneOf.length > 1 ? t.anyOf : t.answerWas}</small>
          <span className={isCase ? 'plain' : q.oneOf && q.oneOf.length > 2 ? 'latin list' : 'latin'}>{answerText}</span>
        </p>
        {q.type !== 'find' && given && (!choices || !verdict.ok) && (
          <p className="fb-you">
            <small>{choices ? t.youChose : t.youWrote}</small>
            <span className={isCase ? 'plain' : 'latin'}>{given}</span>
          </p>
        )}
        {factTypes.includes(q.type) && (
          <dl className="facts">
            {q.type === 'origin' && f.origin ? <Fact label={t.origin} v={(f.origin as { la?: string }).la} /> : null}
            {q.type === 'insertion' && f.insertion ? <Fact label={t.insertion} v={(f.insertion as { la?: string }).la} /> : null}
            {q.type === 'nerve' && f.nerve ? (
              <Fact label={t.nerve} v={`${(f.nerve as { la?: string }).la ?? ''} ${(f.nerve as { roots?: string }).roots ? '(' + (f.nerve as { roots?: string }).roots + ')' : ''}`} />
            ) : null}
            {q.type === 'action' && f.action ? <Fact label={t.action} v={(f.action as Bi)[lang] ?? (f.action as Bi).en} plain /> : null}
            {q.type === 'joint' ? <Fact label={t.joint} v={[f.class, f.subtype, f.axes].filter(Boolean).join(', ')} /> : null}
          </dl>
        )}
        {isCase && q.case && (
          <p className="desc">
            <b>{t.explanation}.</b> {q.case.explain[lang] ?? q.case.explain.en}
          </p>
        )}
        {!isCase && !factTypes.includes(q.type) && c?.desc && <p className="desc">{c.desc[lang] ?? c.desc.en}</p>}
        {note && (note[lang] ?? note.en) && (
          <p className="desc note">
            <b>{f.clinical ? t.clinical : t.lesion}.</b> {note[lang] ?? note.en}
          </p>
        )}
        <div className="fb-actions">
          <span className="fb-links">
            {!verdict.ok && !override && q.type !== 'find' && !choices && (
              <button type="button" className="link" onClick={() => setOverride(true)}>
                {t.iWasRight}
              </button>
            )}
            {onAtlas && (
              <button
                type="button"
                className="link"
                onClick={() => {
                  // the answer is recorded first, so the session carries on from the next station afterwards
                  commit();
                  onAtlas(q.landmark?.k ?? q.key);
                }}
              >
                {t.seeInAtlas}
              </button>
            )}
          </span>
          <button
            type="button"
            className="btn primary"
            autoFocus
            onKeyDown={(e) => {
              if (e.repeat) e.preventDefault();
            }}
            onClick={() => {
              if (performance.now() - shownAt.current < NEXT_GUARD_MS) return;
              commit();
            }}
          >
            {idx + 1 >= total ? t.finish : t.next}
          </button>
        </div>
      </section>
    );

  return (
    <div className={`quiz-wrap run${isCase ? ' case' : ''}`} ref={wrapRef}>
      <svg ref={pinLine} className="leader pin-leader" style={{ visibility: 'hidden' }} aria-hidden="true">
        <path className="leader-halo" />
        <path className="leader-line" />
        <circle className="leader-dot" r="3.5" />
      </svg>
      <div ref={tagRef} className="pin-tag glass num" style={{ display: 'none' }} aria-hidden="true">
        {idx + 1}
      </div>
      <section className="placard glass settle" aria-live="polite" ref={placardRef}>
        <div className={`placard-num ${exam ? 'timed' : ''} ${exam && left <= 10 ? 'low' : ''}`}>
          {exam && (
            <svg viewBox="0 0 64 64" className="ring" aria-hidden="true">
              <circle cx="32" cy="32" r={R} className="ring-bg" />
              <circle cx="32" cy="32" r={R} className="ring-fg" strokeDasharray={C} strokeDashoffset={C * (1 - Math.max(0, left) / total0)} />
            </svg>
          )}
          <span className="num big">{idx + 1}</span>
        </div>
        <div className="placard-body">
          <p className="placard-meta">
            <span>
              {t.station} {idx + 1} {t.of} {total}
            </span>
            {exam ? (
              <span className={`num timer ${left <= 10 ? 'low' : ''}`}>{fmt(t.secondsLeft, { n: Math.max(0, left) })}</span>
            ) : (
              <button type="button" className="link" onClick={onQuit}>
                {t.finish}
              </button>
            )}
          </p>
          <p className={isCase ? 'placard-prompt stem' : 'placard-prompt'}>{promptFor(q, t, lang)}</p>
          {showsName(q) && <p className="placard-latin latin">{q.label ?? db.latin(q.key)}</p>}
          {!exam && card && (
            <p className="placard-card num">
              {card.right}/{card.seen}
            </p>
          )}
        </div>
        <ol className="placard-track" aria-hidden="true">
          {marks.map((m, i) => (
            <li key={i} data-s={i === idx ? 'c' : m === null ? undefined : m ? 'r' : 'w'} />
          ))}
        </ol>
      </section>
      {bottom}
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
