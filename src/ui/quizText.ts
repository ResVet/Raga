import type { DB } from '../data/db';
import type { Lang } from '../data/types';
import type { Strings } from '../i18n';
import type { QType, Question } from '../quiz/decks';

/** Short name of each question type, for the chips in the setup and the progress table. */
export const TYPE_LABEL: Record<QType, keyof Strings> = {
  name: 'qName', landmark: 'qLandmark', find: 'qFind', origin: 'qOrigin', insertion: 'qInsertion', nerve: 'qNerve',
  action: 'qAction', joint: 'qJoint', boneType: 'qBoneType', roots: 'qRoots', lmBone: 'qLmBone', articulates: 'qArticulates',
  ligament: 'qLigament', axes: 'qAxes', from: 'qFrom', drains: 'qDrains', continues: 'qContinues', lobe: 'qLobe', case: 'qCase',
};

// Card ids start with the question type, except landmark cards, which were stored as "lm:" from the first version on.
const PREFIX: Record<string, QType> = { lm: 'landmark' };

/** The question a station asks. Clinical cases carry their own text. */
export function promptFor(q: Question, t: Strings, lang: Lang): string {
  switch (q.type) {
    case 'name': return t.promptName;
    case 'landmark': return t.promptLandmark;
    case 'find': return t.promptFind;
    case 'origin': return t.promptOrigin;
    case 'insertion': return t.promptInsertion;
    case 'nerve': return t.promptNerve;
    case 'action': return t.promptAction;
    case 'joint': return t.promptJoint;
    case 'boneType': return t.promptBoneType;
    case 'roots': return t.promptRoots;
    case 'lmBone': return t.promptLmBone;
    case 'articulates': return t.promptArticulates;
    case 'ligament': return t.promptLigament;
    case 'axes': return t.promptAxes;
    case 'from': return q.kind === 'artery' ? t.promptFromArtery : q.kind === 'organ-part' ? t.promptFromBronchus : t.promptFromNerve;
    case 'drains': return t.promptDrains;
    case 'continues': return t.promptContinues;
    case 'lobe': return t.promptLobe;
    case 'case': return q.case?.stem[lang] ?? q.case?.stem.en ?? '';
  }
}

/** Question types that name the structure in the prompt (the rest show it and ask for its name). */
export function showsName(q: Question): boolean {
  return q.type !== 'name' && q.type !== 'landmark' && q.type !== 'case';
}

/** What a stored card is about, for the progress page: the type label and the structure or case. */
export function cardLabel(db: DB, t: Strings, lang: Lang, cardId: string): { type: string; name: string; latin: boolean } {
  const cut = cardId.indexOf(':');
  const raw = cardId.slice(0, cut);
  const key = cardId.slice(cut + 1);
  const type = PREFIX[raw] ?? (raw as QType);
  const label = TYPE_LABEL[type];
  if (type === 'case') {
    const c = db.cases.find((x) => x.id === key);
    const stem = c ? (c.stem[lang] ?? c.stem.en ?? '') : key;
    return { type: t.qCase, name: stem.length > 90 ? stem.slice(0, 88).trimEnd() + '…' : stem, latin: false };
  }
  return { type: label ? t[label] : raw, name: db.latin(key), latin: true };
}
