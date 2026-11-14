import { useRef, useState, type ReactNode } from 'react';
import type { Strings } from '../i18n';
import { fmt } from '../i18n';
import { QUALITIES, type Quality, type Settings } from './ctx';
import { useDismiss } from './hooks';
import { IconChevron, IconSearch, IconSliders, Mark } from './icons';

export type Mode = 'atlas' | 'motion' | 'quiz' | 'progress' | 'about';

interface Props {
  t: Strings;
  settings: Settings;
  setSettings: (s: Partial<Settings>) => void;
  mode: Mode;
  onMode: (m: Mode) => void;
  motionAvailable: boolean;
  compact: boolean;
  search: ReactNode | null;
  onSearchOpen: () => void;
  onSettings: () => void;
}

export const tierName = (t: Strings, q: Quality) => (q === 'ultra' ? t.tierUltra : q === 'high' ? t.tierHigh : t.tierLite);
const tierHelp = (t: Strings, q: Quality) => (q === 'ultra' ? t.tierUltraHelp : q === 'high' ? t.tierHighHelp : t.tierLiteHelp);

/** Store a new graphics tier and reload, since the engine picks its models at start-up. */
export function switchTier(setSettings: (s: Partial<Settings>) => void, q: Quality) {
  setSettings({ quality: q, effects: {} });
  window.setTimeout(() => window.location.reload(), 60);
}

function QualitySwitch({ t, settings, setSettings }: { t: Strings; settings: Settings; setSettings: Props['setSettings'] }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useDismiss(open, () => setOpen(false), [btn, menu]);
  return (
    <div className="qswitch">
      <button ref={btn} className="hdr-btn" aria-haspopup="menu" aria-expanded={open} aria-label={fmt(t.graphicsNow, { x: tierName(t, settings.quality) })} onClick={() => setOpen(!open)}>
        <span className="q-pips" aria-hidden="true" data-q={settings.quality}>
          <i />
          <i />
          <i />
        </span>
        {tierName(t, settings.quality)}
      </button>
      {open && (
        <div ref={menu} className="menu glass" role="menu" aria-label={t.graphics}>
          {QUALITIES.map((q) => (
            <button
              key={q}
              role="menuitemradio"
              aria-checked={settings.quality === q}
              className="menu-item"
              onClick={() => {
                setOpen(false);
                if (q !== settings.quality) switchTier(setSettings, q);
              }}
            >
              <span className="menu-mark" aria-hidden="true" />
              <span>
                {tierName(t, q)}
                <small>{tierHelp(t, q)}</small>
              </span>
            </button>
          ))}
          <p className="menu-note">{t.tierReload}</p>
        </div>
      )}
    </div>
  );
}

export function Header(p: Props) {
  const { t, settings } = p;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useDismiss(menuOpen, () => setMenuOpen(false), [menuBtn, menuRef]);
  const modes: Mode[] = ['atlas', ...(p.motionAvailable ? (['motion'] as Mode[]) : []), 'quiz', 'progress', 'about'];
  const label = (m: Mode) => t[m];
  const langBtn = (
    <button className="hdr-btn lang" onClick={() => p.setSettings({ lang: settings.lang === 'en' ? 'id' : 'en' })} aria-label={`${t.language}: ${settings.lang === 'en' ? t.langNameEn : t.langNameId}. ${t.langSwitch}`}>
      {settings.lang === 'en' ? 'EN' : 'ID'}
    </button>
  );

  if (p.compact)
    return (
      <header className="hdr glass settle">
        <button ref={menuBtn} className="wordmark" aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Mark />
          <span className="wordmark-name">Raga</span>
          <span className="wordmark-mode">{label(p.mode)}</span>
          <IconChevron className="ico chev" />
        </button>
        <span className="hdr-space" />
        <button className="hdr-btn icon" aria-label={t.searchOpen} onClick={p.onSearchOpen} disabled={!p.search}>
          <IconSearch />
        </button>
        <QualitySwitch t={t} settings={settings} setSettings={p.setSettings} />
        {menuOpen && (
          <div ref={menuRef} className="menu glass nav-menu" role="menu" aria-label={t.mainNav}>
            {modes.map((m) => (
              <button
                key={m}
                role="menuitemradio"
                aria-checked={p.mode === m}
                className="menu-item"
                onClick={() => {
                  setMenuOpen(false);
                  p.onMode(m);
                }}
              >
                <span className="menu-mark" aria-hidden="true" />
                <span>{label(m)}</span>
              </button>
            ))}
            <div className="menu-row">
              <button
                className="btn small"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  p.onSettings();
                }}
              >
                <IconSliders /> {t.settings}
              </button>
              {langBtn}
            </div>
          </div>
        )}
      </header>
    );

  return (
    <header className="hdr glass settle">
      <button className="wordmark" onClick={() => p.onMode('atlas')} aria-label={`Raga, ${t.atlas}`}>
        <Mark />
        <span className="wordmark-name">Raga</span>
      </button>
      <nav className="hdr-nav" aria-label={t.mainNav}>
        {modes.map((m) => (
          <button key={m} className="nav-item" aria-current={p.mode === m ? 'page' : undefined} onClick={() => p.onMode(m)}>
            {label(m)}
          </button>
        ))}
      </nav>
      <div className="hdr-search">{p.search}</div>
      <QualitySwitch t={t} settings={settings} setSettings={p.setSettings} />
      {langBtn}
      <button className="hdr-btn icon" aria-label={t.settings} title={t.settings} onClick={p.onSettings}>
        <IconSliders />
      </button>
    </header>
  );
}
