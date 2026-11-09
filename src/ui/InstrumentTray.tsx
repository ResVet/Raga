import { useRef, useState, type ComponentType, type KeyboardEvent } from 'react';
import type { ClipAxis } from '../engine/Engine';
import { useApp, type AtlasState } from './ctx';
import { useDismiss } from './hooks';
import { IconCamera, IconCut, IconExplode, IconEye, IconFigure, IconIsolate, IconReset, IconSide, IconUndo, IconViews, IconXray } from './icons';

export type ViewName = 'anterior' | 'posterior' | 'left' | 'right' | 'superior';
type Pop = 'explode' | 'cut' | 'side' | 'views';

interface Props {
  atlas: AtlasState;
  onChange: (patch: Partial<AtlasState>) => void;
  hasSel: boolean;
  isolated: boolean;
  onIsolate: () => void;
  canUndo: boolean;
  onUndo: () => void;
  onShowAll: () => void;
  onReset: () => void;
  onView: (v: ViewName) => void;
  onShot: () => void;
  motionLoaded: boolean;
  onRegions?: () => void;
  regionsOpen?: boolean;
}

interface Inst {
  id: string;
  Icon: ComponentType<{ className?: string }>;
  label: string;
  title: string;
  pop?: Pop;
  run?: () => void;
  pressed?: boolean;
  active?: boolean;
  disabled?: boolean;
}

/** The instrument tray: global tools for the specimen, laid out in small groups. */
export function InstrumentTray(p: Props) {
  const { t, compact } = useApp();
  const [pop, setPop] = useState<Pop | null>(null);
  const [popX, setPopX] = useState(0);
  const dockRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  useDismiss(pop !== null, () => setPop(null), [popRef, dockRef]);
  const a = p.atlas;

  const groups: Inst[][] = [
    [
      ...(p.onRegions ? [{ id: 'regions', Icon: IconFigure, label: t.regions, title: t.bodyMap, run: p.onRegions, pressed: !!p.regionsOpen }] : []),
      { id: 'explode', Icon: IconExplode, label: t.explode, title: p.motionLoaded ? t.explodeLocked : t.explodeSpread, pop: 'explode', active: a.explode > 0, disabled: p.motionLoaded },
      { id: 'cut', Icon: IconCut, label: t.cut, title: t.cutPlane, pop: 'cut', active: !!a.clip },
      { id: 'xray', Icon: IconXray, label: t.xray, title: t.xrayHelp, run: () => p.onChange({ xray: !a.xray }), pressed: a.xray },
      { id: 'isolate', Icon: IconIsolate, label: t.isolate, title: p.isolated ? t.endIsolate : t.isolateHelp, run: p.onIsolate, pressed: p.isolated, disabled: !p.hasSel && !p.isolated },
    ],
    [
      { id: 'side', Icon: IconSide, label: t.side, title: t.side, pop: 'side', active: a.side !== 'both' },
      { id: 'views', Icon: IconViews, label: t.views, title: t.views, pop: 'views' },
      { id: 'reset', Icon: IconReset, label: t.reset, title: t.resetView, run: p.onReset },
    ],
    [
      { id: 'undo', Icon: IconUndo, label: t.undo, title: t.undoHelp, run: p.onUndo, disabled: !p.canUndo },
      { id: 'showall', Icon: IconEye, label: t.showAll, title: t.showAllHelp, run: p.onShowAll },
      { id: 'photo', Icon: IconCamera, label: t.photo, title: t.photoHelp, run: p.onShot },
    ],
  ];

  const open = (id: Pop, btn: HTMLElement) => {
    if (pop === id) return setPop(null);
    const dock = dockRef.current!.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const half = Math.min(170, dock.width / 2);
    setPopX(Math.max(half, Math.min(dock.width - half, b.left + b.width / 2 - dock.left)));
    setPop(id);
  };

  // arrow keys move along the toolbar, as the toolbar pattern expects
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const btns = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('button.inst:not(:disabled)')];
    const i = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    btns[(i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length].focus();
  };

  const axes: (ClipAxis | null)[] = [null, 'sagittal', 'coronal', 'transverse'];
  const axisName = (x: ClipAxis | null) => (x === null ? t.cutOff : x === 'sagittal' ? t.sagittal : x === 'coronal' ? t.coronal : t.transverse);

  return (
    <div className="tray-dock-inner" ref={dockRef}>
      {pop && (
        <div
          ref={popRef}
          className="tray-pop glass"
          role="dialog"
          aria-label={pop === 'explode' ? t.explode : pop === 'cut' ? t.cutPlane : pop === 'side' ? t.side : t.views}
          style={compact ? undefined : { left: popX }}
        >
          {pop === 'explode' && (
            <label className="field">
              <span className="field-label">{t.explodeSpread}</span>
              <span className="field-row">
                <input type="range" className="range" min={0} max={1} step={0.01} value={a.explode} onChange={(e) => p.onChange({ explode: parseFloat(e.target.value) })} />
                <output className="num">{Math.round(a.explode * 100)}%</output>
              </span>
            </label>
          )}
          {pop === 'cut' && (
            <div className="field">
              <span className="field-label" id="cut-axis">{t.cutPlane}</span>
              <div className="seg" role="radiogroup" aria-labelledby="cut-axis">
                {axes.map((x) => (
                  <button
                    key={x ?? 'off'}
                    role="radio"
                    aria-checked={(a.clip?.axis ?? null) === x}
                    onClick={() => p.onChange({ clip: x ? { axis: x, t: a.clip?.t ?? 0.5, flip: a.clip?.flip ?? false } : null })}
                  >
                    {axisName(x)}
                  </button>
                ))}
              </div>
              <span className="field-row">
                <input
                  type="range"
                  className="range"
                  min={0}
                  max={1}
                  step={0.005}
                  disabled={!a.clip}
                  value={a.clip?.t ?? 0.5}
                  aria-label={t.cutPos}
                  onChange={(e) => a.clip && p.onChange({ clip: { ...a.clip, t: parseFloat(e.target.value) } })}
                />
                <button className="btn small" disabled={!a.clip} aria-pressed={!!a.clip?.flip} onClick={() => a.clip && p.onChange({ clip: { ...a.clip, flip: !a.clip.flip } })}>
                  {t.flip}
                </button>
              </span>
            </div>
          )}
          {pop === 'side' && (
            <div className="seg vertical" role="radiogroup" aria-label={t.side}>
              {(['both', 'r', 'l'] as const).map((v) => (
                <button key={v} role="radio" aria-checked={a.side === v} onClick={() => p.onChange({ side: v })}>
                  {v === 'both' ? t.both : v === 'r' ? t.rightOnly : t.leftOnly}
                </button>
              ))}
            </div>
          )}
          {pop === 'views' && (
            <div className="views-grid">
              {(
                [
                  ['anterior', t.anterior],
                  ['posterior', t.posterior],
                  ['right', t.lateralR],
                  ['left', t.lateralL],
                  ['superior', t.superior],
                ] as [ViewName, string][]
              ).map(([v, label]) => (
                <button
                  key={v}
                  className="btn small"
                  onClick={() => {
                    p.onView(v);
                    setPop(null);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="tray glass settle" role="toolbar" aria-label={t.tools} onKeyDown={onKey}>
        <div className="tray-scroll">
          {groups.map((g, gi) => (
            <div className="tray-group" key={gi}>
              {g.map((it) => (
                <button
                  key={it.id}
                  className={`inst ${it.active ? 'active' : ''}`}
                  title={it.title}
                  disabled={it.disabled}
                  aria-pressed={it.pressed}
                  aria-expanded={it.pop ? pop === it.pop : undefined}
                  aria-haspopup={it.pop ? 'dialog' : undefined}
                  onClick={(e) => (it.pop ? open(it.pop, e.currentTarget) : it.run?.())}
                >
                  <it.Icon />
                  <span className="inst-label">{it.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
