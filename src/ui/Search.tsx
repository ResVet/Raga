import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useApp } from './ctx';
import type { SearchItem } from '../data/db';
import { IconSearch } from './icons';

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

export function Search({ onPick }: { onPick: (it: SearchItem) => void }) {
  const { db, t, settings } = useApp();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => (q.trim().length >= 2 ? db.find(q, 24) : []), [q, db]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const choose = (it: SearchItem) => {
    onPick(it);
    setOpen(false);
    setQ('');
    inputRef.current?.blur();
  };

  return (
    <div className="search" role="search">
      <IconSearch />
      <input
        ref={inputRef}
        type="search"
        value={q}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchLabel}
        role="combobox"
        aria-expanded={open && q.length >= 2}
        aria-controls={listId}
        aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(results.length - 1, a + 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          } else if (e.key === 'Enter' && results[active]) {
            choose(results[active]);
          } else if (e.key === 'Escape') {
            setOpen(false);
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      {open && q.trim().length >= 2 && (
        <div className="results" id={listId} role="listbox">
          {results.length === 0 && <div className="results-empty">{t.noResults}</div>}
          {results.map((it, i) => {
            const k = KIND_LABEL[it.kind] ?? KIND_LABEL[it.type] ?? { en: '', id: '' };
            return (
              <button
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
                <span className="result-en">{it.en}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
