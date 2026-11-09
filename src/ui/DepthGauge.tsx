import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { ColorMode } from '../engine/Engine';
import { LAYERS, type LayerId } from '../engine/layers';
import { fmt } from '../i18n';
import { useApp } from './ctx';
import { STOPS, depthOf, layerName, peelPatch, stopState, stopSwatch, togglePatch, type LayerMap } from './stops';
import { IconSliders } from './icons';
import { useDismiss, useLongPress } from './hooks';

interface Props {
  layers: LayerMap;
  opacity: Record<LayerId, number>;
  colorMode: ColorMode;
  onLayers: (patch: Partial<LayerMap>) => void;
  onOpacity: (l: LayerId, v: number) => void;
  onColorMode: (m: ColorMode) => void;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Dissection depth gauge: one stop per tissue layer, skin at the top, bone at the bottom.
 *  Dragging the handle peels every stop above it; each stop can also be switched on its own. */
export function DepthGauge(p: Props) {
  const { t, settings, packProgress, compact } = useApp();
  const lang = settings.lang;
  const row = compact ? 34 : 40;
  const n = STOPS.length;
  const depth = depthOf(p.layers);
  const listRef = useRef<HTMLOListElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef(p.layers);
  layersRef.current = p.layers;
  const [dragY, setDragY] = useState<number | null>(null);
  const lastPeel = useRef<number | null>(null);
  const pending = useRef<number | null>(null);
  const [pop, setPop] = useState<number | null>(null);
  const [flag, setFlag] = useState<number | null>(null);
  const flagTimer = useRef<number | null>(null);
  useDismiss(pop !== null, () => setPop(null), [popRef, rootRef]);

  const showFlag = (i: number, ms = 1300) => {
    if (!compact) return;
    setFlag(i);
    if (flagTimer.current) window.clearTimeout(flagTimer.current);
    flagTimer.current = window.setTimeout(() => setFlag(null), ms);
  };
  useEffect(() => () => {
    if (flagTimer.current) window.clearTimeout(flagTimer.current);
  }, []);

  const peel = (h: number) => {
    const patch = peelPatch(layersRef.current, h);
    if (Object.keys(patch).length) p.onLayers(patch);
  };

  const dragTo = (clientY: number) => {
    const r = listRef.current!.getBoundingClientRect();
    const y = clamp(clientY - r.top, 0, (n - 1) * row);
    setDragY(y);
    const h = clamp(Math.round(y / row), 0, n - 1);
    if (h !== lastPeel.current) {
      lastPeel.current = h;
      if (compact) setFlag(h);
      // peeling deeper happens live; restoring layers waits for the release, so passing over a stop
      // does not switch it on (and does not start loading its models)
      if (h >= depthOf(layersRef.current)) {
        peel(h);
        pending.current = null;
      } else pending.current = h;
    }
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPeel.current = depth;
    dragTo(e.clientY);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragY !== null) dragTo(e.clientY);
  };
  const onUp = () => {
    if (pending.current !== null) peel(pending.current);
    pending.current = null;
    setDragY(null);
    lastPeel.current = null;
    if (compact) showFlag(depthOf(layersRef.current), 900);
  };
  const onKey = (e: KeyboardEvent) => {
    const go = (h: number) => {
      e.preventDefault();
      peel(clamp(h, 0, n - 1));
      showFlag(clamp(h, 0, n - 1));
    };
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') go(depth + 1);
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') go(depth - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(n - 1);
  };

  const vern = (i: number) => (lang === 'id' ? STOPS[i].idn : STOPS[i].en);
  const handleY = dragY ?? depth * row;

  return (
    <section ref={rootRef} className="gauge glass settle" aria-label={t.gauge} style={{ ['--row' as string]: `${row}px` }}>
      {!compact && <p className="gauge-end">{t.surface}</p>}
      <div className="gauge-body">
        <div className="gauge-track" aria-hidden="true">
          <i className="peeled" style={{ top: row / 2, height: Math.max(0, handleY - row / 2) }} />
          <i className="kept" style={{ top: Math.max(handleY, row / 2), height: Math.max(0, (n - 1) * row + row / 2 - Math.max(handleY, row / 2)) }} />
        </div>
        <ol ref={listRef} className="gauge-stops">
          {STOPS.map((s, i) => (
            <StopRow
              key={s.id}
              i={i}
              peeled={i < depth}
              state={stopState(p.layers, s)}
              loading={s.layers.some((l) => p.layers[l] && (packProgress[LAYERS.find((x) => x.id === l)!.pack] ?? 1) < 1)}
              progress={Math.min(...s.layers.map((l) => packProgress[LAYERS.find((x) => x.id === l)!.pack] ?? 1))}
              open={pop === i}
              compact={compact}
              vern={vern(i)}
              labels={{ shown: t.shown, partly: t.partly, hidden: t.hidden, loadedPct: t.loadedPct, adjust: t.adjust }}
              onToggle={() => {
                p.onLayers(togglePatch(layersRef.current, s));
                showFlag(i);
              }}
              onAdjust={() => setPop((cur) => (cur === i ? null : i))}
            />
          ))}
        </ol>
        <div
          className={`gauge-handle ${dragY !== null ? 'dragging' : ''}`}
          role="slider"
          tabIndex={0}
          aria-label={t.peelDepth}
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={n - 1}
          aria-valuenow={depth}
          aria-valuetext={fmt(t.peeledTo, { x: `${STOPS[depth].la}, ${vern(depth)}` })}
          style={{ transform: `translateY(${handleY}px)` }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKey}
        >
          <span className="grip" aria-hidden="true" />
          <span className="blade" aria-hidden="true" />
        </div>
        {flag !== null && (
          <div className="gauge-flag glass" style={{ top: flag * row + row / 2 }} aria-hidden="true">
            <span className="latin">{STOPS[flag].la}</span> {vern(flag)}
          </div>
        )}
        {pop !== null && (
          <div ref={popRef} className="gauge-pop glass" role="dialog" aria-label={`${STOPS[pop].la}, ${vern(pop)}`} style={{ top: pop * row }}>
            <p className="pop-title">
              <span className="latin">{STOPS[pop].la}</span>
              <span>{vern(pop)}</span>
            </p>
            {STOPS[pop].layers.map((l) => (
              <div className="pop-layer" key={l}>
                <label className="switch">
                  <input type="checkbox" role="switch" checked={p.layers[l]} onChange={(e) => p.onLayers({ [l]: e.target.checked })} />
                  <span className="switch-track" aria-hidden="true" />
                  <span>{layerName(l, lang)}</span>
                </label>
                <input
                  type="range"
                  className="range"
                  min={0.08}
                  max={1}
                  step={0.01}
                  value={p.opacity[l]}
                  disabled={!p.layers[l]}
                  aria-label={fmt(t.opacityOf, { x: layerName(l, lang) })}
                  onChange={(e) => p.onOpacity(l, parseFloat(e.target.value))}
                />
              </div>
            ))}
            {STOPS[pop].id === 'musculi' && (
              <label className="switch">
                <input type="checkbox" role="switch" checked={p.colorMode === 'function'} onChange={(e) => p.onColorMode(e.target.checked ? 'function' : 'real')} />
                <span className="switch-track" aria-hidden="true" />
                <span>{t.colourByAction}</span>
              </label>
            )}
            <button
              className="btn"
              onClick={() => {
                peel(pop);
                setPop(null);
              }}
            >
              {STOPS[pop].peel[lang]}
            </button>
          </div>
        )}
      </div>
      {!compact && <p className="gauge-end">{t.deep}</p>}
    </section>
  );
}

interface RowProps {
  i: number;
  peeled: boolean;
  state: 'on' | 'off' | 'partial';
  loading: boolean;
  progress: number;
  open: boolean;
  compact: boolean;
  vern: string;
  labels: { shown: string; partly: string; hidden: string; loadedPct: string; adjust: string };
  onToggle: () => void;
  onAdjust: () => void;
}

function StopRow(r: RowProps) {
  const s = STOPS[r.i];
  const long = useLongPress(r.onAdjust);
  const stateTxt = r.state === 'on' ? r.labels.shown : r.state === 'partial' ? r.labels.partly : r.labels.hidden;
  return (
    <li className="stop" data-state={r.state} data-peeled={r.peeled || undefined} data-loading={r.loading || undefined}>
      <button
        className="stop-btn"
        aria-pressed={r.state !== 'off'}
        aria-label={`${s.la}, ${r.vern}: ${stateTxt}${r.loading ? `, ${fmt(r.labels.loadedPct, { n: Math.round(r.progress * 100) })}` : ''}`}
        {...long.handlers}
        onClick={() => {
          if (long.fired.current) {
            long.fired.current = false;
            return;
          }
          r.onToggle();
        }}
      >
        <span className="stop-dot" style={{ ['--sw' as string]: stopSwatch(s), ['--p' as string]: r.progress }} aria-hidden="true" />
        <span className="stop-names" aria-hidden="true">
          <span className="latin">{s.la}</span>
          <small>{r.vern}</small>
        </span>
      </button>
      {!r.compact && (
        <button className="stop-adjust" aria-label={fmt(r.labels.adjust, { x: s.la })} aria-expanded={r.open} aria-haspopup="dialog" onClick={r.onAdjust}>
          <IconSliders />
        </button>
      )}
    </li>
  );
}
