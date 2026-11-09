import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useApp } from './ctx';
import type { SearchItem } from '../data/db';
import { IconClose, IconSearch } from './icons';

const KIND_LABEL: Record<string, { en: string; id: string }> = {
  skeleton: { en: 'Bone', id: 'Tulang' }, bone: { en: 'Bone', id: 'Tulang' },
  landmark: { en: 'Landmark', id: 'Penanda' }, joints: { en: 'Joint part', id: 'Bagian sendi' },
  joint: { en: 'Joint', id: 'Sendi' }, ligament: { en: 'Ligament', id: 'Ligamen' },
  muscles: { en: 'Muscle', id: 'Otot' }, muscle: { en: 'Muscle', id: 'Otot' }, 'muscle-part': { en: 'Muscle part', id: 'Bagian otot' },
  vessels: { en: 'Vessel', id: 'Pembuluh' }, artery: { en: 'Artery', id: 'Arteri' }, vein: { en: 'Vein', id: 'Vena' },
  nerves: { en: 'Nerve', id: 'Saraf' }, nerve: { en: 'Nerve', id: 'Saraf' }, viscera: { en: 'Organ', id: 'Organ' },
  organ: { en: 'Organ', id: 'Organ' }, lymphoid: { en: 'Lymphoid', id: 'Limfoid' }, skin: { en: 'Region', id: 'Regio' },
  group: { en: 'Group', id: 'Kelompok' }, cartilage: { en: 'Cartilage', id: 'Kartilago' },
};

/** Search combobox. `overlay` is the full-width phone version, which focuses itself and can be closed. */
export function Search({ onPick, overlay, onClose }: { onPick: (it: SearchItem) => void; overlay?: boolean; onClose?: () => void }) {
  const { db, t, settings } = useApp();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => (q.trim().length >= 2 ? db.find(q, 24) : []), [q, db]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    if (overlay) inputRef.current?.focus();
  }, [overlay]);
  useEffect(() => {
    if (overlay) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlay]);

  const choose = (it: SearchItem) => {
    onPick(it);
    setOpen(false);
    setQ('');
    inputRef.current?.blur();
    onClose?.();
  };
  const expanded = open && q.trim().length >= 2;

  return (
    <div className={`search ${overlay ? 'overlay' : ''}`} role="search">
      <IconSearch className="ico search-ico" />
      <input
        ref={inputRef}
        type="search"
        value={q}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchLabel}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-activedescendant={expanded && results[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(results.length - 1, a + 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          } else if (e.key === 'Enter' && results[active]) {
            e.preventDefault();
            choose(results[active]);
          } else if (e.key === 'Escape') {
            if (q) setQ('');
            else {
              setOpen(false);
              (e.target as HTMLInputElement).blur();
              onClose?.();
            }
          }
        }}
      />
      {!overlay && !q && (
        <kbd className="search-key" aria-hidden="true">
          /
        </kbd>
      )}
      {overlay && (
        <button className="icon-btn search-close" aria-label={t.searchClose} onClick={onClose}>
          <IconClose />
        </button>
      )}
      <div className="results glass" id={listId} role="listbox" aria-label={t.searchLabel} hidden={!expanded}>
        {expanded && results.length === 0 && <p className="results-empty">{t.noResults}</p>}
        {expanded &&
          results.map((it, i) => {
            const k = KIND_LABEL[it.kind] ?? KIND_LABEL[it.type] ?? { en: '', id: '' };
            return (
              <div
                key={it.type + it.key}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className="result"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(it)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="latin">{it.la}</span>
                <span className="result-kind">{settings.lang === 'id' ? k.id : k.en}</span>
                {it.en && it.en !== it.la && <span className="result-en">{it.en}</span>}
              </div>
            );
          })}
      </div>
    </div>
  );
}
