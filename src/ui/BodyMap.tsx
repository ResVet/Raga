import { useState, type KeyboardEvent } from 'react';
import { REGIONS, type RegionId } from '../engine/layers';
import { useApp } from './ctx';

// A calm line drawing of a standing figure in the anatomical position, seen from the front.
// The subject's right side is on the viewer's left, so the hotspots for right-sided regions sit there.

type Pt = [number, number];
const f = (n: number) => +n.toFixed(2);

/** Smooth a run of points with Catmull-Rom splines written as cubic Beziers. */
function run(pts: Pt[], move: boolean) {
  let d = move ? `M${f(pts[0][0])} ${f(pts[0][1])}` : '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}
const mirror = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [120 - x, y]);

// Outline of the viewer's right half (the subject's left), from the neck down to the crotch.
const NECK: Pt[] = [[65.2, 29], [65.6, 34], [66.2, 38.6]];
const SHOULDER: Pt[] = [[66.2, 38.6], [72, 41.4], [79, 43.8], [84.2, 47.4], [86.6, 53]];
const ARM_LAT: Pt[] = [[86.6, 53], [88, 62], [89.2, 74], [90.6, 88], [93.2, 104], [95.8, 118], [97.6, 130]];
const THUMB: Pt[] = [[97.6, 130], [100.4, 134.6], [102.2, 140.4]];
const HAND: Pt[] = [[102.2, 140.4], [100.6, 141.8], [100.4, 147.5], [99.2, 154], [96.4, 158.2], [93.2, 156.8], [91.8, 149], [91.4, 140], [91.6, 132]];
const ARM_MED: Pt[] = [[91.6, 132], [89.6, 120], [86.8, 106], [84.6, 94], [82.6, 80], [80.6, 67], [78.6, 60.5]];
const TORSO: Pt[] = [[78.6, 60.5], [78.4, 70], [77, 82], [74.8, 94], [75.6, 104], [77.8, 114], [78.4, 124]];
const LEG_LAT: Pt[] = [[78.4, 124], [77.8, 138], [76.4, 152], [74.8, 166], [73.8, 176], [74.6, 188], [73.2, 202], [70.8, 214], [69.8, 219]];
const FOOT: Pt[] = [[69.8, 219], [71.4, 225], [74.6, 229.4], [74.4, 232.2], [68, 232.8], [63.2, 231.8], [62.6, 226], [63, 219]];
const LEG_MED: Pt[] = [[63, 219], [63.4, 206], [62.6, 192], [63.4, 178], [63.6, 164], [62.8, 150], [61.6, 138], [60, 131.5]];
const RIGHT_HALF = [NECK, SHOULDER, ARM_LAT, THUMB, HAND, ARM_MED, TORSO, LEG_LAT, FOOT, LEG_MED];

const OUTLINE =
  RIGHT_HALF.map((r, i) => run(r, i === 0)).join('') +
  [...RIGHT_HALF].reverse().map((r) => run(mirror([...r].reverse()), false)).join('');

// Hit areas for the whole right limbs (drawn on the viewer's left).
const ARM_AREA = run(mirror([[79, 43.8], [84.2, 47.4], [86.6, 53]]), true) + run(mirror(ARM_LAT), false) + run(mirror(THUMB), false) + run(mirror(HAND), false) + run(mirror(ARM_MED), false) + 'Z';
const LEG_AREA = run(mirror(LEG_LAT), true) + run(mirror(FOOT), false) + run(mirror(LEG_MED), false) + 'L41.6 124Z';

const DETAIL = [
  'M61.6 42.4C67 41.4 74 43.6 80.4 45.6', 'M58.4 42.4C53 41.4 46 43.6 39.6 45.6', // clavicles
  'M48.6 89.6Q54 79.6 60 77.2Q66 79.6 71.4 89.6', // costal margin
  'M77 113.6Q70 122 63.6 128.8', 'M43 113.6Q50 122 56.4 128.8', // inguinal ligaments
  'M65.6 172.6q3-3.4 6 0', 'M48.4 172.6q3-3.4 6 0', // patellae
];

const SPOTS: { id: RegionId; x: number; y: number }[] = [
  { id: 'head-neck', x: 60, y: 17 },
  { id: 'larynx', x: 60, y: 35.6 },
  { id: 'shoulder', x: 36, y: 50 },
  { id: 'thorax', x: 55.2, y: 65.5 },
  { id: 'heart', x: 65.2, y: 80 },
  { id: 'arm', x: 32.8, y: 86 },
  { id: 'forearm-hand', x: 28.6, y: 112 },
  { id: 'hip', x: 60, y: 118 },
  { id: 'hand', x: 24.2, y: 147.5 },
  { id: 'knee', x: 51.3, y: 174 },
  { id: 'leg-foot', x: 51.5, y: 196 },
  { id: 'foot', x: 51.4, y: 227 },
];

export function BodyMap({ region, onRegion, className }: { region: RegionId | null; onRegion: (r: RegionId) => void; className?: string }) {
  const { t, settings } = useApp();
  const [hover, setHover] = useState<RegionId | null>(null);
  const name = (id: RegionId) => {
    const r = REGIONS.find((x) => x.id === id)!;
    return settings.lang === 'id' ? r.idn : r.en;
  };
  const active = region ?? 'body';
  const key = (id: RegionId) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRegion(id);
    }
  };
  const hot = (id: RegionId) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': name(id),
    'aria-pressed': active === id,
    onClick: () => onRegion(id),
    onKeyDown: key(id),
    onPointerEnter: () => setHover(id),
    onPointerLeave: () => setHover((h) => (h === id ? null : h)),
    onFocus: () => setHover(id),
    onBlur: () => setHover((h) => (h === id ? null : h)),
  });
  const shown = hover ?? active;
  return (
    <section className={`bodymap ${className ?? ''}`} aria-label={t.bodyMap}>
      <svg viewBox="0 0 120 240" className="bodymap-fig" role="group" aria-label={t.regions}>
        <ellipse cx="60" cy="19" rx="9.6" ry="12.2" className="fig-line" />
        <path d={OUTLINE} className="fig-line" />
        {DETAIL.map((d) => (
          <path key={d} d={d} className="fig-detail" />
        ))}
        <path d={ARM_AREA} className={`limb ${active === 'upper-limb' ? 'on' : ''} ${hover === 'upper-limb' ? 'hover' : ''}`} {...hot('upper-limb')} />
        <path d={LEG_AREA} className={`limb ${active === 'lower-limb' ? 'on' : ''} ${hover === 'lower-limb' ? 'hover' : ''}`} {...hot('lower-limb')} />
        {SPOTS.map((s) => (
          <g key={s.id} className={`spot ${active === s.id ? 'on' : ''} ${hover === s.id ? 'hover' : ''}`} {...hot(s.id)}>
            <circle cx={s.x} cy={s.y} r="7.5" className="spot-hit" />
            <circle cx={s.x} cy={s.y} r="3.6" className="spot-dot" />
          </g>
        ))}
      </svg>
      <div className="bodymap-cap">
        <span className="bodymap-name" aria-live="polite">{name(shown)}</span>
        {active !== 'body' && (
          <button className="link" onClick={() => onRegion('body')}>
            {t.showWholeBody}
          </button>
        )}
      </div>
    </section>
  );
}
