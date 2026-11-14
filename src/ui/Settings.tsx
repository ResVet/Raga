import { useEffect, useRef } from 'react';
import { useApp, EFFECT_KEYS, QUALITIES, type Effects } from './ctx';
import { IconClose } from './icons';
import { switchTier, tierName } from './Header';
import { SecondsInput } from './SecondsInput';
import { autoTier } from './tier';
import type { Strings } from '../i18n';

const FX_LABEL: Record<keyof Effects, [keyof Strings, keyof Strings]> = {
  shadows: ['fxShadows', 'fxShadowsHelp'],
  dof: ['fxDof', 'fxDofHelp'],
  bloom: ['fxBloom', 'fxBloomHelp'],
  ao: ['fxAo', 'fxAoHelp'],
  adaptive: ['fxAdaptive', 'fxAdaptiveHelp'],
};

export function SettingsDialog({ open, onClose, onAbout }: { open: boolean; onClose: () => void; onAbout?: () => void }) {
  const { t, settings, setSettings, fxDefaults, fxSupported } = useApp();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const fx = { ...fxDefaults, ...settings.effects };
  const help = (q: (typeof QUALITIES)[number]) => (q === 'ultra' ? t.tierUltraHelp : q === 'high' ? t.tierHighHelp : t.tierLiteHelp);
  return (
    <dialog ref={ref} className="dialog glass" onClose={onClose} onCancel={onClose} aria-labelledby="set-title">
      <header className="dialog-head">
        <h2 id="set-title">{t.settings}</h2>
        <button className="icon-btn" aria-label={t.close} onClick={onClose}>
          <IconClose />
        </button>
      </header>
      <div className="dialog-body">
        <fieldset>
          <legend>{t.language}</legend>
          <div className="seg" role="radiogroup" aria-label={t.language}>
            {(['en', 'id'] as const).map((l) => (
              <button key={l} role="radio" aria-checked={settings.lang === l} onClick={() => setSettings({ lang: l })}>
                {l === 'en' ? t.langNameEn : t.langNameId}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>{t.graphics}</legend>
          <div className="tiers" role="radiogroup" aria-label={t.graphics}>
            <button role="radio" aria-checked={settings.autoQuality} className="tier" onClick={() => !settings.autoQuality && switchTier(settings, setSettings, 'auto')}>
              <b>{t.tierAuto}</b>
              <small>
                {t.tierAutoHelp} ({tierName(t, autoTier())})
              </small>
            </button>
            {QUALITIES.map((q) => {
              const on = !settings.autoQuality && settings.quality === q;
              return (
                <button key={q} role="radio" aria-checked={on} className="tier" onClick={() => !on && switchTier(settings, setSettings, q)}>
                  <b>{tierName(t, q)}</b>
                  <small>{help(q)}</small>
                </button>
              );
            })}
          </div>
          <p className="note">{t.tierReload}</p>
          <h3 className="sub-legend">{t.effects}</h3>
          {!fxSupported && <p className="note">{t.fxUnavailable}</p>}
          {EFFECT_KEYS.map((k) => (
            <label className="switch wide" key={k}>
              <input
                type="checkbox"
                role="switch"
                checked={fx[k]}
                disabled={!fxSupported}
                onChange={(e) => {
                  const next = { ...settings.effects, [k]: e.target.checked };
                  if (next[k] === fxDefaults[k]) delete next[k];
                  setSettings({ effects: next });
                }}
              />
              <span className="switch-track" aria-hidden="true" />
              <span>
                {t[FX_LABEL[k][0]]}
                <small>{t[FX_LABEL[k][1]]}</small>
              </span>
            </label>
          ))}
          {fxSupported && Object.keys(settings.effects).length > 0 && (
            <button className="link" onClick={() => setSettings({ effects: {} })}>
              {t.fxReset}
            </button>
          )}
        </fieldset>
        <fieldset>
          <legend>{t.quizSettings}</legend>
          <label className="switch wide">
            <input type="checkbox" role="switch" checked={settings.acceptEnglish} onChange={(e) => setSettings({ acceptEnglish: e.target.checked })} />
            <span className="switch-track" aria-hidden="true" />
            <span>{t.acceptEnglish}</span>
          </label>
          <label className="switch wide">
            <input type="checkbox" role="switch" checked={settings.requireSide} onChange={(e) => setSettings({ requireSide: e.target.checked })} />
            <span className="switch-track" aria-hidden="true" />
            <span>{t.requireSide}</span>
          </label>
          <label className="field-row">
            <span>{t.secondsPerStation}</span>
            <SecondsInput value={settings.examSeconds} onChange={(n) => setSettings({ examSeconds: n })} />
          </label>
        </fieldset>
        {onAbout && (
          <p className="dialog-foot">
            <button
              className="link"
              onClick={() => {
                onClose();
                onAbout();
              }}
            >
              {t.aboutTitle}
            </button>
          </p>
        )}
      </div>
    </dialog>
  );
}
