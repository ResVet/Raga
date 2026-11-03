import { useEffect, useRef } from 'react';
import { useApp } from './ctx';
import { IconClose } from './icons';

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, settings, setSettings } = useApp();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="settings" onClose={onClose} onCancel={onClose}>
      <div className="settings-head">
        <h2>{t.settings}</h2>
        <button className="icon-btn" aria-label={t.close} onClick={onClose}>
          <IconClose />
        </button>
      </div>
      <div className="settings-body">
        <div className="row">
          <label htmlFor="set-lang">{t.language}</label>
          <select id="set-lang" value={settings.lang} onChange={(e) => setSettings({ lang: e.target.value as 'en' | 'id' })}>
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="set-q">{t.quality}</label>
          <select
            id="set-q"
            value={settings.quality}
            onChange={(e) => {
              setSettings({ quality: e.target.value as 'high' | 'lite' });
              window.setTimeout(() => window.location.reload(), 50);
            }}
          >
            <option value="high">{t.qualityHigh}</option>
            <option value="lite">{t.qualityLite}</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="set-en">{t.acceptEnglish}</label>
          <input id="set-en" type="checkbox" checked={settings.acceptEnglish} onChange={(e) => setSettings({ acceptEnglish: e.target.checked })} style={{ accentColor: 'var(--pin)', width: 18, height: 18 }} />
        </div>
        <div className="row">
          <label htmlFor="set-side">{t.requireSide}</label>
          <input id="set-side" type="checkbox" checked={settings.requireSide} onChange={(e) => setSettings({ requireSide: e.target.checked })} style={{ accentColor: 'var(--pin)', width: 18, height: 18 }} />
        </div>
        <div className="row">
          <label htmlFor="set-sec">{t.examSeconds}</label>
          <input
            id="set-sec"
            type="number"
            min={15}
            max={300}
            step={5}
            value={settings.examSeconds}
            onChange={(e) => setSettings({ examSeconds: Math.max(15, Math.min(300, parseInt(e.target.value || '60', 10))) })}
            style={{ width: 80 }}
          />
        </div>
      </div>
    </dialog>
  );
}
