// Minimal stroke icons drawn for Raga (24px grid, currentColor).
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const IconSearch = () => (
  <svg viewBox="0 0 24 24" className="search-icon" aria-hidden="true"><circle cx="11" cy="11" r="6.5" {...P} /><path d="M16 16l4.5 4.5" {...P} /></svg>
);
export const IconClose = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" {...P} /></svg>
);
export const IconLayers = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" {...P} /><path d="M3 13l9 5 9-5" {...P} /></svg>
);
export const IconGear = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" {...P} /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" {...P} /></svg>
);
export const IconCamera = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-2.5h6L17 8h3v11H4z" {...P} /><circle cx="12" cy="13" r="3.5" {...P} /></svg>
);
export const IconUndo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7L4 12l5 5" {...P} /><path d="M4 12h10a6 6 0 010 12" {...P} transform="translate(0 -6)" /></svg>
);
export const IconReset = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7" {...P} /><path d="M4 4v4h4" {...P} /></svg>
);
export const IconGithub = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3.4a3 3 0 00-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.6 4.6 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6 0C6.1 2.6 5.1 2.9 5.1 2.9a4.3 4.3 0 00-.1 3.2 4.6 4.6 0 00-1.3 3.2c0 4.6 2.8 5.6 5.5 6a3 3 0 00-.8 2.3V21" {...P} /></svg>
);

/** Raga mark: a long bone with an exam pin in it. */
export const Mark = () => (
  <svg viewBox="0 0 32 32" className="brand-mark" aria-hidden="true">
    <g transform="rotate(-38 16 17)" fill="#e4d7bd">
      <rect x="7.5" y="15" width="17" height="4.4" rx="2.2" />
      <circle cx="7.6" cy="14.9" r="3.1" />
      <circle cx="7.6" cy="19.5" r="3.1" />
      <circle cx="24.4" cy="14.9" r="3.1" />
      <circle cx="24.4" cy="19.5" r="3.1" />
    </g>
    <path d="M16.6 16.4L22.4 6.6" stroke="#cfd6d4" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="23" cy="5.6" r="3.2" fill="#f2c230" />
  </svg>
);
