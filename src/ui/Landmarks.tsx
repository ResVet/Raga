import { useMemo, useRef } from 'react';
import type { LandmarkRec } from '../data/types';
import type { Strings } from '../i18n';
import { useApp } from './ctx';
import { LM_KINDS, landmarkColor, landmarkKindOf, type LmKind } from './engineExtras';

const KIND_LABEL: Record<LmKind, keyof Strings> = {
  process: 'kindProcess',
  fossa: 'kindFossa',
  line: 'kindLine',
  articular: 'kindArticular',
  foramen: 'kindForamen',
  other: 'kindOther',
};

/** Colour and shape together, so the key still works for colour-blind readers. */
export function KindSwatch({ kind }: { kind: LmKind }) {
  const c = landmarkColor(kind);
  return (
    <svg viewBox="0 0 12 12" className="swatch" aria-hidden="true" focusable="false">
      {kind === 'process' && <path d="M6 1.4L10.8 10.2H1.2z" fill={c} />}
      {kind === 'fossa' && <path d="M1.5 3.2a4.5 4.5 0 0 0 9 0z" fill={c} />}
      {kind === 'line' && <rect x="1" y="4.6" width="10" height="2.8" rx="1.4" fill={c} />}
      {kind === 'articular' && <rect x="1.6" y="1.6" width="8.8" height="8.8" rx="2.6" fill={c} />}
      {kind === 'foramen' && <circle cx="6" cy="6" r="3.7" fill="none" stroke={c} strokeWidth="2.2" />}
      {kind === 'other' && <circle cx="6" cy="6" r="3.4" fill={c} />}
    </svg>
  );
}

export function LandmarkLegend({ kinds }: { kinds?: LmKind[] }) {
  const { t } = useApp();
  return (
    <ul className="key" aria-label={t.lmLegend}>
      {(kinds ?? LM_KINDS).map((k) => (
        <li key={k}>
          <KindSwatch kind={k} />
          {t[KIND_LABEL[k]]}
        </li>
      ))}
    </ul>
  );
}

/** A bone's landmarks, grouped by kind. Hovering highlights the area (and flies there after a short
 *  pause); choosing one selects it. */
export function LandmarkGroups({ items, activeKey, onHover, onPick }: { items: LandmarkRec[]; activeKey: string | null; onHover: (lm: LandmarkRec | null, fly: boolean) => void; onPick: (lm: LandmarkRec) => void }) {
  const { db, t } = useApp();
  const dwell = useRef<number | null>(null);
  const groups = useMemo(() => {
    const by = new Map<LmKind, LandmarkRec[]>();
    for (const lm of items) {
      const k = landmarkKindOf(lm, db.latin(lm.k));
      by.set(k, [...(by.get(k) ?? []), lm]);
    }
    return [...LM_KINDS, 'other' as LmKind].filter((k) => by.has(k)).map((k) => ({ kind: k, items: by.get(k)!.sort((a, b) => db.latin(a.k).localeCompare(db.latin(b.k))) }));
  }, [items, db]);
  if (!items.length) return null;
  const enter = (lm: LandmarkRec) => {
    onHover(lm, false);
    if (dwell.current) window.clearTimeout(dwell.current);
    dwell.current = window.setTimeout(() => onHover(lm, true), 480);
  };
  const leave = () => {
    if (dwell.current) window.clearTimeout(dwell.current);
    dwell.current = null;
    onHover(null, false);
  };
  return (
    <section className="lm-groups" aria-label={t.landmarks}>
      <h3>{t.landmarks}</h3>
      <LandmarkLegend kinds={groups.map((g) => g.kind).filter((k) => k !== 'other')} />
      {groups.map((g) => (
        <div className="lm-group" key={g.kind}>
          <p className="lm-kind">
            <KindSwatch kind={g.kind} />
            <span>{t[KIND_LABEL[g.kind]]}</span>
            <span className="num">{g.items.length}</span>
          </p>
          <div className="chips">
            {g.items.map((lm) => (
              <button
                key={lm.k}
                className="chip lm latin"
                style={{ ['--k' as string]: landmarkColor(g.kind) }}
                aria-pressed={activeKey === lm.k}
                onPointerEnter={(e) => e.pointerType === 'mouse' && enter(lm)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && leave()}
                onFocus={() => onHover(lm, false)}
                onBlur={leave}
                onClick={() => {
                  leave();
                  onPick(lm);
                }}
              >
                {db.latin(lm.k)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
