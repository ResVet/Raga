// Instrument icons drawn for Raga on a 24px grid. Strokes use currentColor so they follow the text.
import type { ReactNode } from 'react';

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const F = { fill: 'currentColor', stroke: 'none' };
type IP = { className?: string };
const S = ({ children, className }: { children: ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'ico'} aria-hidden="true" focusable="false">
    {children}
  </svg>
);

export const IconSearch = (p: IP) => (
  <S {...p}><circle cx="10.5" cy="10.5" r="6" {...P} /><path d="M15 15l4.8 4.8" {...P} /></S>
);
export const IconClose = (p: IP) => (
  <S {...p}><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" {...P} /></S>
);
export const IconSliders = (p: IP) => (
  <S {...p}>
    <path d="M4 8h3.2M10.8 8H20M4 16h9.2M16.8 16H20" {...P} />
    <circle cx="9" cy="8" r="1.9" {...P} />
    <circle cx="15" cy="16" r="1.9" {...P} />
  </S>
);
export const IconChevron = (p: IP) => (
  <S {...p}><path d="M7 10l5 5 5-5" {...P} /></S>
);
// four parts pushed away from a common centre
export const IconExplode = (p: IP) => (
  <S {...p}>
    <rect x="3" y="3" width="5.5" height="5.5" rx="1.4" {...P} />
    <rect x="15.5" y="3" width="5.5" height="5.5" rx="1.4" {...P} />
    <rect x="3" y="15.5" width="5.5" height="5.5" rx="1.4" {...P} />
    <rect x="15.5" y="15.5" width="5.5" height="5.5" rx="1.4" {...P} />
    <circle cx="12" cy="12" r="1.3" {...F} />
  </S>
);
// a sphere cut through, with the cut face showing
export const IconCut = (p: IP) => (
  <S {...p}>
    <path d="M5 12.5a7 7 0 0 1 14 0" {...P} />
    <ellipse cx="12" cy="12.5" rx="7" ry="2.6" {...P} />
    <path d="M2.5 12.5h1M20.5 12.5h1" {...P} />
  </S>
);
// solid focus inside a ghosted outline
export const IconXray = (p: IP) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8" {...P} strokeDasharray="1.6 2.6" />
    <circle cx="12" cy="12" r="3.2" {...F} />
  </S>
);
export const IconIsolate = (p: IP) => (
  <S {...p}>
    <path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15" {...P} />
    <circle cx="12" cy="12" r="2.6" {...F} />
  </S>
);
export const IconSide = (p: IP) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8" {...P} />
    <path d="M12 4a8 8 0 0 0 0 16z" fill="currentColor" opacity=".38" />
    <path d="M12 4v16" {...P} />
  </S>
);
export const IconViews = (p: IP) => (
  <S {...p}>
    <path d="M12 3.2l7.6 4.3v9L12 20.8l-7.6-4.3v-9z" {...P} />
    <path d="M4.4 7.5L12 11.8l7.6-4.3M12 11.8v9" {...P} />
  </S>
);
export const IconReset = (p: IP) => (
  <S {...p}>
    <path d="M5.2 13.5A7 7 0 1 0 7 7.3" {...P} />
    <path d="M6.6 3.8L7 7.3l3.4-.5" {...P} />
    <circle cx="12" cy="12" r="1.4" {...F} />
  </S>
);
export const IconUndo = (p: IP) => (
  <S {...p}>
    <path d="M9 6.5L5 10.5l4 4" {...P} />
    <path d="M5 10.5h9.5a4.5 4.5 0 0 1 0 9H12" {...P} />
  </S>
);
export const IconEye = (p: IP) => (
  <S {...p}>
    <path d="M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6z" {...P} />
    <circle cx="12" cy="12" r="2.8" {...P} />
  </S>
);
export const IconEyeOff = (p: IP) => (
  <S {...p}>
    <path d="M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6z" {...P} />
    <path d="M4.5 19.5l15-15" {...P} />
  </S>
);
export const IconCamera = (p: IP) => (
  <S {...p}>
    <path d="M4 8.5h3.2l1.6-2.5h6.4l1.6 2.5H20v10H4z" {...P} />
    <circle cx="12" cy="13.2" r="3.3" {...P} />
  </S>
);
export const IconFigure = (p: IP) => (
  <S {...p}>
    <circle cx="12" cy="4.6" r="2.1" {...P} />
    <path d="M8.2 9.2c1.2-.8 2.4-1.1 3.8-1.1s2.6.3 3.8 1.1M7.4 14.5l.8-5.3M16.6 14.5l-.8-5.3M10 8.3l-.6 6.4L10 21M14 8.3l.6 6.4L14 21M12 15v6" {...P} />
  </S>
);
export const IconPlay = (p: IP) => (
  <S {...p}><path d="M8.5 5.8v12.4a.8.8 0 0 0 1.2.7l10-6.2a.8.8 0 0 0 0-1.4l-10-6.2a.8.8 0 0 0-1.2.7z" {...F} /></S>
);
export const IconPause = (p: IP) => (
  <S {...p}>
    <rect x="7" y="5.5" width="3.4" height="13" rx="1" {...F} />
    <rect x="13.6" y="5.5" width="3.4" height="13" rx="1" {...F} />
  </S>
);
export const IconStop = (p: IP) => (
  <S {...p}><rect x="6.5" y="6.5" width="11" height="11" rx="2" {...F} /></S>
);
export const IconLoop = (p: IP) => (
  <S {...p}>
    <path d="M16.5 4.5l3 3-3 3" {...P} />
    <path d="M19.5 7.5H9a5 5 0 0 0-5 5" {...P} />
    <path d="M7.5 19.5l-3-3 3-3" {...P} />
    <path d="M4.5 16.5H15a5 5 0 0 0 5-5" {...P} />
  </S>
);
export const IconCheck = (p: IP) => (
  <S {...p}><path d="M5 12.8l4.4 4.2L19 7.4" {...P} strokeWidth={2} /></S>
);
export const IconCross = (p: IP) => (
  <S {...p}><path d="M7 7l10 10M17 7L7 17" {...P} strokeWidth={2} /></S>
);
export const IconFocus = (p: IP) => (
  <S {...p}>
    <circle cx="12" cy="12" r="5.5" {...P} />
    <path d="M12 2.8v3.4M12 17.8v3.4M2.8 12h3.4M17.8 12h3.4" {...P} />
  </S>
);
// a muscle belly running from origin to insertion
export const IconAttach = (p: IP) => (
  <S {...p}>
    <circle cx="5.8" cy="17.6" r="2" {...P} />
    <circle cx="18.2" cy="6.4" r="2" {...P} />
    <path d="M7.4 16.1c1.6-1.2 2.2-4.3 4.4-5.6 2.2-1.3 3.4-1.4 4.8-2.7" {...P} />
  </S>
);
// an OSPE pin
export const IconPin = (p: IP) => (
  <S {...p}>
    <circle cx="16.2" cy="7.8" r="3.4" {...P} />
    <path d="M13.8 10.2L5 19" {...P} />
  </S>
);
export const IconGithub = (p: IP) => (
  <S {...p}>
    <path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3.4a3 3 0 00-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.6 4.6 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6 0C6.1 2.6 5.1 2.9 5.1 2.9a4.3 4.3 0 00-.1 3.2 4.6 4.6 0 00-1.3 3.2c0 4.6 2.8 5.6 5.5 6a3 3 0 00-.8 2.3V21" {...P} />
  </S>
);

/** Raga mark: a microscope slide with its frosted label end and an eosin-stained section. */
export const Mark = ({ className }: IP) => (
  <svg viewBox="0 0 28 28" className={className ?? 'mark'} aria-hidden="true" focusable="false">
    <g transform="rotate(-22 14 14)">
      <rect x="2.6" y="8.6" width="22.8" height="10.8" rx="1.7" fill="rgba(246,243,255,.08)" stroke="#d2cbf2" strokeWidth="1.1" />
      <path d="M4.3 8.6h4.9v10.8H4.3a1.7 1.7 0 0 1-1.7-1.7v-7.4a1.7 1.7 0 0 1 1.7-1.7z" fill="#d2cbf2" />
      <ellipse cx="17.4" cy="14" rx="4.4" ry="2.9" fill="#ff5d8f" />
      <circle cx="18.7" cy="13.3" r="1.15" fill="#2a2178" />
      <circle cx="15.6" cy="14.9" r=".8" fill="#2a2178" />
    </g>
  </svg>
);
