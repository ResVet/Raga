import type { AttachmentRec, ContentEntry, Definition, GroupRec, LandmarkRec, StructureRec } from './types';
import { editDistance, norm, slug } from './text';

export interface SearchItem {
  type: 'structure' | 'group' | 'landmark' | 'concept';
  key: string;
  ids: string[];
  la: string;
  en: string;
  alt: string[];
  kind: string;
  hay: { s: string; w: number }[];
}

const json = async <T,>(url: string): Promise<T> => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.json() as Promise<T>;
};

export class DB {
  base: string;
  structures: StructureRec[] = [];
  byId = new Map<string, StructureRec>();
  byKey = new Map<string, StructureRec[]>();
  groups = new Map<string, GroupRec>();
  groupByKey = new Map<string, string>(); // key -> group name
  groupMembers = new Map<string, string[]>(); // group name -> structure ids
  landmarks: LandmarkRec[] = [];
  lmByBone = new Map<string, LandmarkRec[]>();
  lmByKey = new Map<string, LandmarkRec[]>();
  attachments: AttachmentRec[] = [];
  attByMuscle = new Map<string, AttachmentRec[]>();
  attByBone = new Map<string, AttachmentRec[]>();
  content = new Map<string, ContentEntry>();
  search: SearchItem[] = [];
  private defs: Record<string, Definition> | null = null;
  private i18n: Record<string, Record<string, string>> | null = null;

  constructor(base: string) {
    this.base = base;
  }

  async load() {
    const [cat, lms, atts] = await Promise.all([
      json<{ structures: StructureRec[]; groups: Record<string, GroupRec> }>(`${this.base}data/catalog.json`),
      json<LandmarkRec[]>(`${this.base}data/landmarks.json`),
      json<AttachmentRec[]>(`${this.base}data/attachments.json`),
    ]);
    let content: ContentEntry[] = [];
    try {
      content = await json<ContentEntry[]>(`${this.base}data/content.json`);
    } catch {
      content = [];
    }
    this.structures = cat.structures.map((s) => ({ ...s, en: fixParen(s.en) }));
    for (const s of this.structures) {
      this.byId.set(s.id, s);
      const arr = this.byKey.get(s.k) ?? [];
      arr.push(s);
      this.byKey.set(s.k, arr);
      for (const g of s.path) {
        const m = this.groupMembers.get(g) ?? [];
        m.push(s.id);
        this.groupMembers.set(g, m);
      }
    }
    for (const [name, g] of Object.entries(cat.groups)) {
      this.groups.set(name, g);
      this.groupByKey.set(g.k, name);
    }
    this.landmarks = lms.map((l) => ({ ...l, en: fixParen(l.en) }));
    for (const l of this.landmarks) {
      push(this.lmByBone, l.on, l);
      push(this.lmByKey, l.k, l);
    }
    this.attachments = atts;
    for (const a of atts) {
      push(this.attByMuscle, a.m, a);
      if (a.bone) push(this.attByBone, a.bone, a);
    }
    for (const c of content) this.content.set(c.key, c);
    this.buildSearch();
  }

  // ------------------------------------------------------------------ names
  /** Best Latin name for a concept key. */
  latin(key: string): string {
    const c = this.content.get(key);
    if (c?.la) return c.la;
    const s = this.byKey.get(key)?.[0];
    if (s?.la) return cleanLatin(s.la);
    const g = this.groupByKey.get(key);
    if (g && this.groups.get(g)?.la) return cleanLatin(this.groups.get(g)!.la!);
    const l = this.lmByKey.get(key)?.[0];
    if (l?.la) return cleanLatin(l.la);
    return s?.en ?? l?.en ?? g ?? key;
  }

  english(key: string): string {
    const c = this.content.get(key);
    if (c?.en) return c.en;
    return this.byKey.get(key)?.[0]?.en ?? this.lmByKey.get(key)?.[0]?.en ?? this.groupByKey.get(key) ?? key;
  }

  /** The "whole" concept a mesh belongs to: a muscle for a muscle head, a joint for a ligament. */
  parentConcept(s: StructureRec): string | null {
    for (let i = s.path.length - 1; i >= Math.max(0, s.path.length - 2); i--) {
      const k = slug(s.path[i]);
      const c = this.content.get(k);
      if (c && (c.kind === 'muscle' || c.kind === 'joint' || c.kind === 'bone' || c.kind === 'organ')) return k;
      if (i === s.path.length - 1 && /muscle$|^Gastrocnemius|^Quadriceps|^Triceps|joint$/i.test(s.path[i])) return k;
    }
    return null;
  }

  idsForKey(key: string): string[] {
    const direct = this.byKey.get(key);
    if (direct?.length) return direct.map((s) => s.id);
    const g = this.groupByKey.get(key);
    if (g) return this.groupMembers.get(g) ?? [];
    return [];
  }

  /** Accepted Latin answers for a concept key (and its parent, when asked about a part). */
  answersFor(key: string, opts: { includeParent?: string | null; english?: boolean } = {}): string[] {
    const out = new Set<string>();
    const add = (k: string) => {
      const c = this.content.get(k);
      if (c) {
        out.add(c.la);
        c.alt?.forEach((a) => out.add(a));
        if (opts.english && c.en) out.add(c.en);
      }
      const s = this.byKey.get(k)?.[0];
      if (s?.la) out.add(cleanLatin(s.la));
      const l = this.lmByKey.get(k)?.[0];
      if (l?.la) out.add(cleanLatin(l.la));
      const g = this.groupByKey.get(k);
      if (g && this.groups.get(g)?.la) out.add(cleanLatin(this.groups.get(g)!.la!));
      if (opts.english) {
        if (s?.en) out.add(s.en);
        if (l?.en) out.add(l.en);
      }
    };
    add(key);
    if (opts.includeParent) add(opts.includeParent);
    return [...out].filter(Boolean);
  }

  // ------------------------------------------------------------------ lazy extras
  async definitions() {
    if (!this.defs) this.defs = await json<Record<string, Definition>>(`${this.base}data/definitions.json`).catch(() => ({}));
    return this.defs;
  }

  async otherLanguages() {
    if (!this.i18n) this.i18n = await json<Record<string, Record<string, string>>>(`${this.base}data/names-i18n.json`).catch(() => ({}));
    return this.i18n;
  }

  // ------------------------------------------------------------------ search
  private buildSearch() {
    const items: SearchItem[] = [];
    const seen = new Set<string>();
    const mk = (type: SearchItem['type'], key: string, ids: string[], kind: string) => {
      if (seen.has(type + ':' + key)) return;
      seen.add(type + ':' + key);
      const c = this.content.get(key);
      const la = this.latin(key);
      const en = this.english(key);
      const alt = c?.alt ?? [];
      const hay = [
        { s: norm(la), w: 3 },
        { s: norm(en), w: 2.2 },
        ...alt.map((a) => ({ s: norm(a), w: 2.6 })),
      ];
      const s0 = this.byKey.get(key)?.[0];
      if (s0?.la && norm(cleanLatin(s0.la)) !== hay[0].s) hay.push({ s: norm(cleanLatin(s0.la)), w: 2.8 });
      items.push({ type, key, ids, la, en, alt, kind: c?.kind ?? kind, hay });
    };
    for (const [k, list] of this.byKey) {
      const s = list[0];
      if (s.pack === 'attachments') continue;
      mk('structure', k, list.map((x) => x.id), s.pack);
    }
    for (const [name, g] of this.groups) {
      const members = (this.groupMembers.get(name) ?? []).filter((id) => this.byId.get(id)?.pack !== 'attachments');
      if (!members.length || members.length > 400) continue;
      if (this.byKey.has(g.k)) continue;
      mk('group', g.k, members, 'group');
    }
    for (const [k, list] of this.lmByKey) mk('landmark', k, [...new Set(list.map((l) => l.on))], 'landmark');
    for (const [k, c] of this.content) if (!this.byKey.has(k) && !this.lmByKey.has(k) && !this.groupByKey.has(k)) mk('concept', k, [], c.kind);
    this.search = items;
  }

  find(query: string, limit = 24): SearchItem[] {
    const q = norm(query);
    if (!q) return [];
    const qt = q.split(' ');
    const scored: { it: SearchItem; sc: number }[] = [];
    for (const it of this.search) {
      let best = 0;
      for (const h of it.hay) {
        if (!h.s) continue;
        let sc = 0;
        if (h.s === q) sc = 100;
        else if (h.s.startsWith(q)) sc = 80;
        else {
          const ft = h.s.split(' ');
          const allPrefix = qt.every((t) => ft.some((f) => f.startsWith(t)));
          if (allPrefix) sc = 62;
          else if (h.s.includes(q)) sc = 45;
          else if (q.length >= 4) {
            const fuzzy = qt.every((t) => t.length < 4 ? ft.some((f) => f.startsWith(t)) : ft.some((f) => editDistance(f.slice(0, t.length), t, 1) <= 1));
            if (fuzzy) sc = 28;
          }
        }
        if (sc) best = Math.max(best, sc * h.w - h.s.length * 0.05);
      }
      if (best > 0) {
        if (it.type === 'structure' || it.type === 'group') best += 4;
        if (this.content.has(it.key)) best += 6;
        scored.push({ it, sc: best });
      }
    }
    scored.sort((a, b) => b.sc - a.sc);
    return scored.slice(0, limit).map((x) => x.it);
  }
}

function push<K, V>(m: Map<K, V[]>, k: K, v: V) {
  const a = m.get(k);
  if (a) a.push(v);
  else m.set(k, [v]);
}

function fixParen(n: string) {
  return n.split('(').length > n.split(')').length ? n + ')' : n;
}

/** Z-Anatomy/TA2 Latin sometimes carries parentheses for inconstant structures. */
export function cleanLatin(s: string) {
  return s.replace(/^\(|\)$/g, '').replace(/\s+/g, ' ').trim();
}
