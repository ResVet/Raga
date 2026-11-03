import { LAYERS, REGIONS, type LayerId, type RegionId } from '../engine/layers';
import type { ClipAxis, ColorMode } from '../engine/Engine';
import { useApp } from './ctx';

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

interface Props {
  state: AtlasState;
  open: boolean;
  onLayer: (l: LayerId, on: boolean) => void;
  onOpacity: (l: LayerId, v: number) => void;
  onRegion: (r: RegionId) => void;
  onChange: (patch: Partial<AtlasState>) => void;
  onShowAll: () => void;
  onUndo: () => void;
  canUndo: boolean;
  onReset: () => void;
  onShot: () => void;
}

export function Rail(p: Props) {
  const { t, settings, packProgress } = useApp();
  const lang = settings.lang;
  const s = p.state;
  return (
    <aside className={`rail panel ${p.open ? 'open' : ''}`} aria-label={t.layers}>
      <div className="rail-scroll">
        <section className="section">
          <div className="section-head">
            <h2>{t.layers}</h2>
          </div>
          {LAYERS.map((l) => {
            const prog = packProgress[l.pack];
            const loading = prog !== undefined && prog < 1;
            return (
              <div key={l.id}>
                <div className="layer" style={{ ['--swatch' as string]: l.swatch }}>
                  <input
                    id={`layer-${l.id}`}
                    type="checkbox"
                    checked={s.layers[l.id]}
                    onChange={(e) => p.onLayer(l.id, e.target.checked)}
                  />
                  <label className="layer-name" htmlFor={`layer-${l.id}`}>
                    <span className="latin">{l.la}</span>
                    <small>{lang === 'id' ? l.idn : l.en}</small>
                  </label>
                  <span className="layer-load" aria-live="polite">
                    {loading ? `${Math.round((prog ?? 0) * 100)}%` : ''}
                  </span>
                  {s.layers[l.id] && (
                    <input
                      className="layer-opacity"
                      type="range"
                      min={0.08}
                      max={1}
                      step={0.01}
                      value={s.opacity[l.id]}
                      aria-label={`${l.en} opacity`}
                      onChange={(e) => p.onOpacity(l.id, parseFloat(e.target.value))}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </section>

        <section className="section">
          <div className="section-head">
            <h2>{t.regions}</h2>
          </div>
          <div className="chips">
            {REGIONS.map((r) => (
              <button key={r.id} className="chip" aria-pressed={s.region === r.id} onClick={() => p.onRegion(r.id)}>
                {lang === 'id' ? r.idn : r.en}
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>{t.tools}</h2>
          </div>
          <div className="row">
            <label htmlFor="explode">{t.explode}</label>
          </div>
          <input id="explode" type="range" min={0} max={1} step={0.01} value={s.explode} onChange={(e) => p.onChange({ explode: parseFloat(e.target.value) })} />

          <div className="row">
            <span>{t.cut}</span>
            <div className="seg" role="group" aria-label={t.cut}>
              {([null, 'sagittal', 'coronal', 'transverse'] as (ClipAxis | null)[]).map((a) => (
                <button
                  key={a ?? 'off'}
                  aria-pressed={(s.clip?.axis ?? null) === a}
                  onClick={() => p.onChange({ clip: a ? { axis: a, t: s.clip?.t ?? 0.5, flip: s.clip?.flip ?? false } : null })}
                >
                  {a === null ? t.cutOff : a === 'sagittal' ? t.sagittal.slice(0, 3) : a === 'coronal' ? t.coronal.slice(0, 3) : t.transverse.slice(0, 5)}
                </button>
              ))}
            </div>
          </div>
          {s.clip && (
            <>
              <input type="range" min={0} max={1} step={0.005} value={s.clip.t} aria-label={t.cut} onChange={(e) => p.onChange({ clip: { ...s.clip!, t: parseFloat(e.target.value) } })} />
              <button className="linkish" onClick={() => p.onChange({ clip: { ...s.clip!, flip: !s.clip!.flip } })}>
                {t.flip}
              </button>
            </>
          )}

          <div className="row">
            <span>{t.side}</span>
            <div className="seg" role="group" aria-label={t.side}>
              {(['both', 'r', 'l'] as const).map((v) => (
                <button key={v} aria-pressed={s.side === v} onClick={() => p.onChange({ side: v })}>
                  {v === 'both' ? t.both : v === 'r' ? t.right : t.left}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            <span>{t.colorMode}</span>
            <div className="seg" role="group" aria-label={t.colorMode}>
              <button aria-pressed={s.colorMode === 'real'} onClick={() => p.onChange({ colorMode: 'real' })}>{t.colorReal}</button>
              <button aria-pressed={s.colorMode === 'function'} onClick={() => p.onChange({ colorMode: 'function' })}>{t.colorFunction}</button>
            </div>
          </div>

          <div className="row">
            <label htmlFor="xray">{t.xray}</label>
            <input id="xray" type="checkbox" checked={s.xray} onChange={(e) => p.onChange({ xray: e.target.checked })} style={{ accentColor: 'var(--pin)', width: 18, height: 18 }} />
          </div>

          <div className="btn-row" style={{ marginTop: 12 }}>
            <button className="btn" onClick={p.onShowAll}>{t.showAll}</button>
            <button className="btn ghost" onClick={p.onUndo} disabled={!p.canUndo}>{t.undo}</button>
            <button className="btn ghost" onClick={p.onReset}>{t.resetView}</button>
            <button className="btn ghost" onClick={p.onShot}>{t.screenshot}</button>
          </div>
        </section>
      </div>
    </aside>
  );
}
