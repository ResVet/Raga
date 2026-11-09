import { useEffect, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { useApp, type Selection } from './ctx';
import type { Bi, Definition, LandmarkRec } from '../data/types';
import { slug } from '../data/text';
import { cleanLatin } from '../data/db';
import { Sheet, type SheetH } from './Sheet';
import type { MotionClip } from './engineExtras';
import { IconAttach, IconClose, IconEyeOff, IconFocus, IconIsolate, IconPin, IconPlay } from './icons';
import { prefersReducedMotion } from './hooks';
import { LandmarkGroups } from './Landmarks';

export interface Anchor {
  id: string;
  /** point in the object's local space, so it follows explode and motion */
  local: THREE.Vector3;
  /** true for a picked surface point (worth an occlusion test), false for an object centre */
  surface: boolean;
}

interface Props {
  sel: Selection;
  anchor: Anchor | null;
  sheet: SheetH;
  onSheet: (h: SheetH) => void;
  onClose: () => void;
  onFocus: () => void;
  onIsolate: () => void;
  onHide: () => void;
  onKey: (key: string) => void;
  onLandmark: (key: string, onBone: string) => void;
  onLandmarkHover: (lm: LandmarkRec | null, fly: boolean) => void;
  attachOn: boolean;
  onToggleAttach: () => void;
  onQuiz: (key: string) => void;
  clips: MotionClip[];
  onPlayClip: (c: MotionClip) => void;
  playingId: string | null;
}

const KIND_NAMES: Record<string, { en: string; id: string }> = {
  bone: { en: 'Bone', id: 'Tulang' }, landmark: { en: 'Bone landmark', id: 'Penanda tulang' }, joint: { en: 'Joint', id: 'Sendi' },
  ligament: { en: 'Ligament', id: 'Ligamen' }, membrane: { en: 'Membrane', id: 'Membran' }, muscle: { en: 'Muscle', id: 'Otot' },
  'muscle-part': { en: 'Part of a muscle', id: 'Bagian otot' }, tendon: { en: 'Tendon', id: 'Tendo' }, bursa: { en: 'Bursa', id: 'Bursa' },
  fascia: { en: 'Fascia', id: 'Fascia' }, artery: { en: 'Artery', id: 'Arteri' }, vein: { en: 'Vein', id: 'Vena' }, nerve: { en: 'Nerve', id: 'Saraf' },
  'plexus-part': { en: 'Part of a plexus', id: 'Bagian pleksus' }, organ: { en: 'Organ', id: 'Organ' }, 'organ-part': { en: 'Part of an organ', id: 'Bagian organ' },
  cartilage: { en: 'Cartilage', id: 'Kartilago' }, group: { en: 'Group of structures', id: 'Kelompok struktur' },
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
const LATIN_VALUES = ['type', 'skeleton', 'class', 'subtype', 'complexity', 'blood', 'from', 'continues', 'surfaces', 'discs'];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function SpecimenTag(p: Props) {
  const { db, t, settings, engine, compact } = useApp();
  const lang = settings.lang;
  const [defs, setDefs] = useState<Record<string, Definition> | null>(null);
  const [i18n, setI18n] = useState<Record<string, Record<string, string>> | null>(null);
  const tagRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sel = p.sel;

  useEffect(() => {
    if (!sel) return;
    db.definitions().then(setDefs);
    db.otherLanguages().then(setI18n);
  }, [sel, db]);

  // Follow the selection every frame: dock the tag beside it and draw the leader line to the picked point.
  useEffect(() => {
    const anchor = p.anchor;
    const svg = svgRef.current;
    if (!svg) return;
    let lastOcc = 0;
    let occluded = false;
    let lastTop: number | null = null;
    const hideLine = () => svg.classList.add('off');
    const update = () => {
      const tag = tagRef.current;
      const line = lineRef.current, halo = haloRef.current, dot = dotRef.current;
      if (!tag || !line || !halo || !dot) return;
      const stage = (svg.parentElement ?? svg).getBoundingClientRect();
      const vw = stage.width, vh = stage.height;
      let pt: { x: number; y: number } | null = null;
      if (anchor) {
        const o = engine.objects.get(anchor.id);
        if (o && o.root.visible) {
          const wp = o.root.localToWorld(anchor.local.clone());
          const now = performance.now();
          const test = anchor.surface && now - lastOcc > 140;
          const pr = engine.project(wp, test);
          if (test) {
            lastOcc = now;
            occluded = pr.occluded;
          }
          if (!pr.behind && pr.x > 2 && pr.x < vw - 2 && pr.y > 2 && pr.y < vh - 2) pt = { x: pr.x, y: pr.y };
        }
      }
      const r = tag.getBoundingClientRect();
      if (!compact) {
        const hdr = document.querySelector('.hdr')?.getBoundingClientRect();
        const minTop = (hdr ? hdr.bottom - stage.top : 64) + 12;
        let bottom = vh - 16;
        const tray = document.querySelector('.tray-dock')?.getBoundingClientRect();
        if (tray && tray.right > r.left && tray.left < r.right) bottom = Math.min(bottom, tray.top - stage.top - 12);
        const h = r.height;
        const desired = pt ? pt.y - 46 : lastTop ?? minTop;
        const top = clamp(desired, minTop, Math.max(minTop, bottom - h));
        lastTop = top;
        tag.style.transform = `translate3d(0, ${top.toFixed(1)}px, 0)`;
        tag.style.maxHeight = `${Math.max(160, bottom - minTop)}px`;
        const left = r.left - stage.left;
        if (pt && pt.x < left - 36) {
          const ey = clamp(pt.y, top + 30, top + h - 30);
          const kx = left - 30;
          const d = `M${pt.x.toFixed(1)} ${pt.y.toFixed(1)}L${kx.toFixed(1)} ${ey.toFixed(1)}L${left.toFixed(1)} ${ey.toFixed(1)}`;
          line.setAttribute('d', d);
          halo.setAttribute('d', d);
          dot.setAttribute('cx', pt.x.toFixed(1));
          dot.setAttribute('cy', pt.y.toFixed(1));
          svg.classList.remove('off');
          svg.classList.toggle('occluded', occluded);
        } else hideLine();
      } else {
        const sheetTop = r.top - stage.top;
        if (pt && pt.y < sheetTop - 28) {
          const ex = clamp(pt.x, 48, vw - 48);
          const ky = sheetTop - 22;
          const d = `M${pt.x.toFixed(1)} ${pt.y.toFixed(1)}L${ex.toFixed(1)} ${ky.toFixed(1)}L${ex.toFixed(1)} ${sheetTop.toFixed(1)}`;
          line.setAttribute('d', d);
          halo.setAttribute('d', d);
          dot.setAttribute('cx', pt.x.toFixed(1));
          dot.setAttribute('cy', pt.y.toFixed(1));
          svg.classList.remove('off');
          svg.classList.toggle('occluded', occluded);
        } else hideLine();
      }
    };
    const off = engine.onFrame(update);
    const ro = new ResizeObserver(() => engine.invalidate());
    if (tagRef.current) ro.observe(tagRef.current);
    engine.invalidate();
    requestAnimationFrame(update);
    if (!prefersReducedMotion()) {
      svg.classList.remove('draw');
      void svg.getBoundingClientRect();
      svg.classList.add('draw');
    }
    return () => {
      off();
      ro.disconnect();
    };
  }, [p.anchor, compact, engine, sel]);

  if (!sel) return null;

  // ---------------------------------------------------------------- resolve what we describe
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
    if (pc && pc.kind === 'muscle' && parent !== rec.k) {
      key = parent!;
      partKey = rec.k;
    } else key = rec.k;
    kindFallback = rec.pack;
    enName = rec.en;
    sideTxt = rec.side === 'r' ? t.rightSide : rec.side === 'l' ? t.leftSide : '';
  } else if (sel.type === 'landmark') {
    key = sel.lm.k;
    kindFallback = 'landmark';
    onBone = sel.lm.on;
    enName = sel.lm.en;
    sideTxt = sel.lm.side === 'r' ? t.rightSide : sel.lm.side === 'l' ? t.leftSide : '';
  } else {
    key = sel.key;
    kindFallback = db.content.get(key)?.kind ?? 'group';
    enName = db.english(key);
  }
  const c = db.content.get(key);
  const part = partKey ? db.content.get(partKey) : undefined;
  const kind = c?.kind ?? kindFallback;
  const kindName = KIND_NAMES[kind] ?? KIND_NAMES[kindFallback] ?? { en: '', id: '' };
  const latin = db.latin(key);
  const english = c?.en ?? (partKey ? db.english(key) : enName);
  const rec0 = sel.type === 'structure' ? db.byId.get(sel.id) : undefined;
  const crumb = rec0 ? rec0.path.slice(-3) : [];
  const def = defs ? defs[slug(partKey ? db.english(partKey) : english)] ?? defs[key] : null;
  const other = i18n?.[partKey ?? key];
  const bi = (b?: Bi | string) => (typeof b === 'string' ? b : b ? b[lang] ?? b.en ?? b.id ?? '' : '');
  const isBone = kind === 'bone' || kindFallback === 'skeleton';
  const isMuscle = kind === 'muscle' || kind === 'muscle-part' || kindFallback === 'muscles';
  const boneId = sel.type === 'structure' && isBone ? sel.id : sel.type === 'landmark' ? sel.lm.on : null;
  const boneKey = boneId ? db.byId.get(boneId)?.k : undefined;
  const lmList = boneId ? dedupe((db.lmByBone.get(boneId) ?? []).filter((l) => !l.variant && l.k !== boneKey)) : [];
  const kindLine = [lang === 'id' ? kindName.id : kindName.en, sideTxt].filter(Boolean).join(', ');

  const renderVal = (k: string, v: unknown): ReactNode => {
    if (v === null || v === undefined || v === '') return null;
    if (k === 'origin' || k === 'insertion') {
      const o = v as { la?: string; en?: string };
      return (
        <>
          {o.la && <span className="latin">{o.la}</span>}
          {o.en && lang === 'en' && <span className="dd-sub">{o.en}</span>}
        </>
      );
    }
    if (k === 'nerve' && typeof v === 'object' && !Array.isArray(v)) {
      const nv = v as { la?: string; roots?: string };
      return (
        <span>
          <span className="latin">{nv.la}</span>
          {nv.roots ? <span className="num"> ({nv.roots})</span> : ''}
        </span>
      );
    }
    if (k === 'features' && Array.isArray(v)) {
      return (
        <span className="chips">
          {(v as string[]).map((fk) => (
            <button key={fk} className="chip latin" onClick={() => (sel.type === 'structure' ? p.onLandmark(fk, sel.id) : p.onKey(fk))}>
              {db.latin(fk)}
            </button>
          ))}
        </span>
      );
    }
    if ((k === 'parts' || k === 'joint' || k === 'muscle' || k === 'bone') && typeof v === 'string') {
      return (
        <button className="link latin" onClick={() => p.onKey(v)}>
          {db.latin(v)}
        </button>
      );
    }
    if (Array.isArray(v)) return <span className={['motor', 'branches', 'ligaments', 'articulates'].includes(k) ? 'latin' : ''}>{(v as string[]).join(', ')}</span>;
    if (typeof v === 'object') return bi(v as Bi) || null;
    return <span className={LATIN_VALUES.includes(k) ? 'latin' : ''}>{String(v)}</span>;
  };

  const facts: ReactNode[] = [];
  const fx = (c?.facts ?? {}) as Record<string, unknown>;
  if (part?.facts) {
    const pf = part.facts as Record<string, unknown>;
    for (const k of ['origin', 'insertion'] as const) {
      if (pf[k])
        facts.push(
          <div key={'part-' + k} className={`fact ${k}`}>
            <dt>
              {t[k]} <span className="latin">({db.latin(partKey!)})</span>
            </dt>
            <dd>{renderVal(k, pf[k])}</dd>
          </div>,
        );
    }
  }
  for (const [k, labelKey] of FACT_ORDER) {
    if (!(k in fx)) continue;
    if (k === 'bone' && sel.type === 'landmark') continue;
    if (k === 'features' && lmList.length) continue;
    const node = renderVal(k, fx[k]);
    if (!node) continue;
    facts.push(
      <div key={k} className={`fact ${k}`}>
        <dt>{(t as unknown as Record<string, string>)[labelKey] ?? k}</dt>
        <dd>{node}</dd>
      </div>,
    );
  }

  const head = (
    <header className="tag-head">
      <h2 className="tag-title latin">{latin}</h2>
      {english && english !== latin && <p className="tag-en">{english}</p>}
      {kindLine && <p className="tag-kind">{kindLine}</p>}
      <button className="icon-btn tag-close" aria-label={t.close} onClick={p.onClose}>
        <IconClose />
      </button>
    </header>
  );

  const body = (
    <div className="tag-body">
      {(partKey || onBone || (crumb.length > 0 && !partKey)) && (
        <p className="tag-crumb">
          {partKey && (
            <>
              {t.parts}: <span className="latin">{db.latin(partKey)}</span>
            </>
          )}
          {onBone && (
            <>
              {t.onBone}{' '}
              <button className="link latin" onClick={() => p.onKey(db.byId.get(onBone!)?.k ?? onBone!)}>
                {db.latin(db.byId.get(onBone)?.k ?? onBone)}
              </button>
            </>
          )}
          {!partKey &&
            !onBone &&
            crumb.map((g, i) => {
              const gr = db.groups.get(g);
              const label = gr?.la ? cleanLatin(gr.la) : g;
              return (
                <span key={g} className="crumb">
                  {i > 0 && (
                    <span className="crumb-sep" aria-hidden="true">
                      /
                    </span>
                  )}
                  <button className="link latin" onClick={() => p.onKey(slug(g))}>
                    {label}
                  </button>
                </span>
              );
            })}
        </p>
      )}
      {p.clips.length > 0 && (
        <div className="tag-motion">
          {p.clips.map((clip) => (
            <div className="clip-row" key={clip.id}>
              <button className="btn primary" aria-pressed={p.playingId === clip.id} onClick={() => p.onPlayClip(clip)}>
                <IconPlay /> {t.playAction}
              </button>
              <span className="latin clip-name">{clip.label.la}</span>
            </div>
          ))}
        </div>
      )}
      {c?.desc && <p className="desc">{bi(c.desc)}</p>}
      {part?.desc && <p className="desc sub">{bi(part.desc)}</p>}
      {!c && english !== latin && <p className="desc sub">{english}</p>}
      {lmList.length > 0 && (
        <LandmarkGroups items={lmList} activeKey={sel.type === 'landmark' ? sel.lm.k : null} onHover={p.onLandmarkHover} onPick={(lm) => p.onLandmark(lm.k, lm.on)} />
      )}
      {p.attachOn && (isMuscle || isBone) && (
        <ul className="key" aria-label={t.attachLegend}>
          <li>
            <i className="dot o" aria-hidden="true" />
            {t.originLegend}
          </li>
          <li>
            <i className="dot i" aria-hidden="true" />
            {t.insertionLegend}
          </li>
        </ul>
      )}
      {facts.length > 0 && <dl className="facts">{facts}</dl>}
      {c?.verify && <p className="verify">{t.verifyFlag}</p>}
      {def && (
        <details className="more">
          <summary>{t.definition}</summary>
          <p>{def.t.replace(/https?:\/\/\S+/g, '').trim()}</p>
          <p className="source">
            {t.definitionSource}
            {def.src && (
              <>
                {' '}
                <a href={def.src} target="_blank" rel="noreferrer">
                  {def.src.replace(/^https?:\/\//, '')}
                </a>
              </>
            )}
          </p>
        </details>
      )}
      {other && Object.keys(other).length > 0 && (
        <details className="more">
          <summary>{t.otherLanguages}</summary>
          <dl className="langs">
            {Object.entries(other).map(([lg, nm]) => (
              <div key={lg}>
                <dt>{lg.toUpperCase()}</dt>
                <dd>{nm}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </div>
  );

  const actions = (
    <footer className="tag-actions">
      <button className="tool" onClick={p.onFocus}>
        <IconFocus /> {t.focus}
      </button>
      <button className="tool" onClick={p.onIsolate}>
        <IconIsolate /> {t.isolate}
      </button>
      <button className="tool" onClick={p.onHide}>
        <IconEyeOff /> {t.hide}
      </button>
      {(isMuscle || isBone) && (
        <button className="tool" aria-pressed={p.attachOn} onClick={p.onToggleAttach}>
          <IconAttach /> {t.attachments}
        </button>
      )}
      <button className="tool" onClick={() => p.onQuiz(key)}>
        <IconPin /> {t.quizMe}
      </button>
    </footer>
  );

  const leader = (
    <svg ref={svgRef} className="leader off" aria-hidden="true">
      <path ref={haloRef} className="leader-halo" />
      <path ref={lineRef} className="leader-line" />
      <circle ref={dotRef} className="leader-dot" r="4.5" />
    </svg>
  );

  if (compact)
    return (
      <>
        {leader}
        <Sheet h={p.sheet} onH={p.onSheet} label={t.sheetHandle} className="tag-sheet" onRef={(n) => (tagRef.current = n)}>
          {head}
          <div className="sheet-scroll">{body}</div>
          {actions}
        </Sheet>
      </>
    );

  return (
    <>
      {leader}
      <aside ref={(n) => (tagRef.current = n)} className="tag glass" aria-label={latin}>
        <div className="tag-in" key={key + (sel.type === 'structure' ? sel.id : '')}>
          {head}
          {body}
          {actions}
        </div>
      </aside>
    </>
  );
}

function dedupe<T extends { k: string }>(a: T[]): T[] {
  const s = new Set<string>();
  return a.filter((x) => (s.has(x.k) ? false : (s.add(x.k), true)));
}
