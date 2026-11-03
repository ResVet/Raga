import { useEffect, useState, type ReactNode } from 'react';
import { useApp, type Selection } from './ctx';
import type { Bi, ContentEntry, Definition } from '../data/types';
import { slug } from '../data/text';
import { cleanLatin } from '../data/db';
import { IconClose } from './icons';

interface Props {
  sel: Selection;
  peek: boolean;
  onTogglePeek: () => void;
  onClose: () => void;
  onFocus: () => void;
  onIsolate: () => void;
  onHide: () => void;
  onKey: (key: string) => void;
  onLandmark: (key: string, onBone: string) => void;
  attachOn: boolean;
  onToggleAttach: () => void;
  onQuiz: (key: string) => void;
}

const KIND_NAMES: Record<string, { en: string; id: string }> = {
  bone: { en: 'Bone', id: 'Tulang' }, landmark: { en: 'Bone landmark', id: 'Penanda tulang' }, joint: { en: 'Joint', id: 'Sendi' },
  ligament: { en: 'Ligament', id: 'Ligamen' }, membrane: { en: 'Membrane', id: 'Membran' }, muscle: { en: 'Muscle', id: 'Otot' },
  'muscle-part': { en: 'Part of a muscle', id: 'Bagian otot' }, tendon: { en: 'Tendon', id: 'Tendo' }, bursa: { en: 'Bursa', id: 'Bursa' },
  fascia: { en: 'Fascia', id: 'Fascia' }, artery: { en: 'Artery', id: 'Arteri' }, vein: { en: 'Vein', id: 'Vena' }, nerve: { en: 'Nerve', id: 'Saraf' },
  'plexus-part': { en: 'Plexus part', id: 'Bagian pleksus' }, organ: { en: 'Organ', id: 'Organ' }, 'organ-part': { en: 'Part of an organ', id: 'Bagian organ' },
  cartilage: { en: 'Cartilage', id: 'Kartilago' },
  skeleton: { en: 'Bone', id: 'Tulang' }, joints: { en: 'Joint structure', id: 'Struktur sendi' }, muscles: { en: 'Muscle', id: 'Otot' },
  vessels: { en: 'Blood vessel', id: 'Pembuluh darah' }, nerves: { en: 'Nerve', id: 'Saraf' }, viscera: { en: 'Organ', id: 'Organ' },
  lymphoid: { en: 'Lymphoid organ', id: 'Organ limfoid' }, skin: { en: 'Surface region', id: 'Regio permukaan' }, attachments: { en: 'Muscle attachment', id: 'Perlekatan otot' },
};

// Display order and label key for each fact field.
const FACT_ORDER: [string, string][] = [
  ['group', 'group'], ['type', 'type'], ['skeleton', 'skeleton'], ['class', 'class'], ['subtype', 'subtype'], ['complexity', 'class'],
  ['axes', 'axes'], ['bone', 'onBone'], ['joint', 'joint'], ['muscle', 'partOf'], ['surfaces', 'surfaces'], ['origin', 'origin'],
  ['insertion', 'insertion'], ['action', 'action'], ['movements', 'movements'], ['nerve', 'nerve'], ['roots', 'roots'], ['from', 'from'],
  ['course', 'course'], ['continues', 'course'], ['branches', 'branches'], ['motor', 'motor'], ['sensory', 'sensory'], ['supplies', 'supplies'],
  ['drains', 'drains'], ['blood', 'blood'], ['articulates', 'articulates'], ['ligaments', 'ligaments'], ['discs', 'surfaces'], ['attach', 'attach'],
  ['function', 'function'], ['location', 'location'], ['features', 'features'], ['relations', 'relations'], ['stability', 'note'],
  ['region', 'location'], ['lesion', 'lesion'], ['clinical', 'clinical'], ['note', 'note'],
];

export function InfoCard(p: Props) {
  const { db, t, settings, engine } = useApp();
  const lang = settings.lang;
  const [defs, setDefs] = useState<Record<string, Definition> | null>(null);
  const [i18n, setI18n] = useState<Record<string, Record<string, string>> | null>(null);
  const sel = p.sel;
  useEffect(() => {
    if (!sel) return;
    db.definitions().then(setDefs);
    db.otherLanguages().then(setI18n);
  }, [sel, db]);
  if (!sel) return null;

  // Resolve what we are describing
  let key: string;
  let partKey: string | null = null;
  let kindFallback = 'organ';
  let sideTxt = '';
  let onBone: string | null = null;
  let enName = '';
  if (sel.type === 'structure') {
    const rec = db.byId.get(sel.id);
    if (!rec) return null;
    const parent = db.parentConcept(rec);
    const pc = parent ? db.content.get(parent) : undefined;
    if (pc && (pc.kind === 'muscle') && parent !== rec.k) {
      key = parent!;
      partKey = rec.k;
    } else key = rec.k;
    kindFallback = rec.pack;
    enName = rec.en;
    sideTxt = rec.side === 'r' ? (lang === 'id' ? 'kanan (dexter)' : 'right (dexter)') : rec.side === 'l' ? (lang === 'id' ? 'kiri (sinister)' : 'left (sinister)') : '';
  } else if (sel.type === 'landmark') {
    key = sel.lm.k;
    kindFallback = 'landmark';
    onBone = sel.lm.on;
    enName = sel.lm.en;
  } else {
    key = sel.key;
    kindFallback = db.content.get(key)?.kind ?? 'group';
    enName = db.english(key);
  }
  const c = db.content.get(key);
  const part = partKey ? db.content.get(partKey) : undefined;
  const kind = c?.kind ?? kindFallback;
  const kindName = KIND_NAMES[kind] ?? { en: '', id: '' };
  const latin = db.latin(key);
  const english = c?.en ?? (partKey ? db.english(key) : enName);
  const rec0 = sel.type === 'structure' ? db.byId.get(sel.id) : undefined;
  const crumb = rec0 ? rec0.path.slice(-3) : [];
  const def = defs ? defs[slug(partKey ? db.english(partKey) : english)] ?? defs[key] : null;
  const other = i18n?.[partKey ?? key];
  const bi = (b?: Bi | string) => (typeof b === 'string' ? b : b ? b[lang] ?? b.en ?? b.id ?? '' : '');
  const isBone = kind === 'bone' || kindFallback === 'skeleton';
  const isMuscle = kind === 'muscle' || kind === 'muscle-part' || kindFallback === 'muscles';
  const lmForBone = sel.type === 'structure' && isBone ? db.lmByBone.get(sel.id) ?? [] : [];

  const renderVal = (k: string, v: unknown): ReactNode => {
    if (v === null || v === undefined || v === '') return null;
    if (k === 'origin' || k === 'insertion') {
      const o = v as { la?: string; en?: string };
      return (
        <>
          {o.la && <div className="latin">{o.la}</div>}
          {o.en && lang === 'en' && <div style={{ color: 'var(--gauze-2)', fontSize: 13.5 }}>{o.en}</div>}
        </>
      );
    }
    if (k === 'nerve' && typeof v === 'object' && !Array.isArray(v)) {
      const n = v as { la?: string; roots?: string };
      return (
        <span>
          <span className="latin">{n.la}</span>
          {n.roots ? ` (${n.roots})` : ''}
        </span>
      );
    }
    if (k === 'features' && Array.isArray(v)) {
      return (
        <div className="lm-list">
          {(v as string[]).map((fk) => (
            <button key={fk} onClick={() => (sel.type === 'structure' ? p.onLandmark(fk, sel.id) : p.onKey(fk))}>{db.latin(fk)}</button>
          ))}
        </div>
      );
    }
    if ((k === 'parts' || k === 'joint' || k === 'muscle' || k === 'bone') && typeof v === 'string') {
      return (
        <button className="linkish latin" style={{ fontSize: 15 }} onClick={() => p.onKey(v)}>
          {db.latin(v)}
        </button>
      );
    }
    if (Array.isArray(v)) return <span className={k === 'motor' || k === 'branches' || k === 'ligaments' || k === 'articulates' ? 'latin' : ''}>{(v as string[]).join(', ')}</span>;
    if (typeof v === 'object') return bi(v as Bi) || null;
    return <span className={['type', 'skeleton', 'class', 'subtype', 'complexity', 'blood', 'from', 'continues', 'surfaces', 'discs'].includes(k) ? 'latin' : ''}>{String(v)}</span>;
  };

  const facts: ReactNode[] = [];
  const f = (c?.facts ?? {}) as Record<string, unknown>;
  for (const [k, labelKey] of FACT_ORDER) {
    if (!(k in f)) continue;
    if (k === 'bone' && sel.type === 'landmark') continue;
    const node = renderVal(k, f[k]);
    if (!node) continue;
    facts.push(
      <div key={k} className={`fact ${k}`}>
        <dt>{(t as unknown as Record<string, string>)[labelKey] ?? k}</dt>
        <dd>{node}</dd>
      </div>,
    );
  }
  if (part?.facts) {
    const pf = part.facts as Record<string, unknown>;
    for (const k of ['origin', 'insertion'] as const) {
      if (pf[k]) {
        facts.unshift(
          <div key={'part-' + k} className={`fact ${k}`}>
            <dt>{`${t[k]} (${db.latin(partKey!)})`}</dt>
            <dd>{renderVal(k, pf[k])}</dd>
          </div>,
        );
      }
    }
  }

  return (
    <aside className={`card panel ${p.peek ? 'peek' : ''}`} aria-label={latin}>
      <header className="card-head" onClick={(e) => { if ((e.target as HTMLElement).closest('button')) return; p.onTogglePeek(); }}>
        <p className="card-kind">
          {lang === 'id' ? kindName.id : kindName.en}
          {sideTxt ? `, ${sideTxt}` : ''}
        </p>
        <h2 className="card-title">{latin}</h2>
        {english && english !== latin && <p className="card-en">{english}</p>}
        {partKey && (
          <p className="card-crumb">
            {t.parts}: <span className="latin" style={{ color: 'var(--gauze)' }}>{db.latin(partKey)}</span>
          </p>
        )}
        {onBone && (
          <p className="card-crumb">
            {t.onBone}: <button onClick={() => p.onKey(db.byId.get(onBone!)?.k ?? onBone!)}>{db.latin(db.byId.get(onBone)?.k ?? onBone)}</button>
          </p>
        )}
        {crumb.length > 0 && !partKey && (
          <p className="card-crumb">
            {crumb.map((g, i) => {
              const gr = db.groups.get(g);
              const label = gr?.la ? cleanLatin(gr.la) : g;
              return (
                <span key={g}>
                  {i > 0 ? ' / ' : ''}
                  <button onClick={() => p.onKey(slug(g))}>{label}</button>
                </span>
              );
            })}
          </p>
        )}
        <button className="icon-btn card-close" aria-label={t.close} onClick={p.onClose}>
          <IconClose />
        </button>
      </header>
      <div className="card-actions">
        <button className="btn" onClick={p.onFocus}>{t.focus}</button>
        <button className="btn ghost" onClick={p.onIsolate}>{t.isolate}</button>
        <button className="btn ghost" onClick={p.onHide}>{t.hide}</button>
        {(isMuscle || isBone) && (
          <button className="btn ghost" aria-pressed={p.attachOn} onClick={p.onToggleAttach}>{t.attachments}</button>
        )}
        <button className="btn ghost" onClick={() => p.onQuiz(key)}>{t.quizMe}</button>
      </div>
      {p.attachOn && (
        <div className="legend" aria-hidden="true">
          <span className="o">{t.originLegend}</span>
          <span className="i">{t.insertionLegend}</span>
        </div>
      )}
      <div className="card-body">
        {c?.desc && <p className="desc">{bi(c.desc)}</p>}
        {part?.desc && <p className="desc" style={{ color: 'var(--gauze-2)' }}>{bi(part.desc)}</p>}
        {facts.length > 0 && <dl className="facts">{facts}</dl>}
        {lmForBone.length > 0 && !(c?.facts && 'features' in (c.facts as object)) && (
          <div className="fact" style={{ borderTop: '1px solid var(--line)', marginTop: 8 }}>
            <dt style={{ fontSize: 12.5, color: 'var(--gauze-3)', fontWeight: 700 }}>{t.landmarks}</dt>
            <div className="lm-list">
              {dedupe(lmForBone.filter((l) => !l.variant && l.k !== rec0?.k)).map((l) => (
                <button key={l.k} onClick={() => p.onLandmark(l.k, l.on)}>{db.latin(l.k)}</button>
              ))}
            </div>
          </div>
        )}
        {c?.verify && <p className="verify">{t.verifyFlag}</p>}
        {!c && <p className="desc" style={{ color: 'var(--gauze-2)' }}>{english}</p>}
        {def && (
          <details className="more">
            <summary>{t.definition}</summary>
            <p>{def.t.replace(/https?:\/\/\S+/g, '').trim()}</p>
            <p className="source">
              {t.definitionSource}
              {def.src && (
                <>
                  {' '}
                  <a href={def.src} target="_blank" rel="noreferrer">{def.src.replace(/^https?:\/\//, '')}</a>
                </>
              )}
            </p>
          </details>
        )}
        {other && Object.keys(other).length > 0 && (
          <details className="more">
            <summary>{t.otherLanguages}</summary>
            <p>
              {Object.entries(other).map(([lg, name]) => (
                <span key={lg} style={{ display: 'block' }}>
                  <b style={{ color: 'var(--gauze-3)', marginRight: 8 }}>{lg.toUpperCase()}</b>
                  {name}
                </span>
              ))}
            </p>
          </details>
        )}
      </div>
      <span className="sr-only">{engine ? '' : ''}</span>
    </aside>
  );
}

function dedupe<T extends { k: string }>(a: T[]): T[] {
  const s = new Set<string>();
  return a.filter((x) => (s.has(x.k) ? false : (s.add(x.k), true)));
}

export type { ContentEntry };
