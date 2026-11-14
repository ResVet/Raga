// Decks, multiple-choice options, clinical cases, the stored session and the graphics tier, checked against the real data files.
import { readFileSync } from 'node:fs';

const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => void store.set(k, String(v)),
  removeItem: (k) => void store.delete(k),
};

const { DB, DECKS, buildDeck, questionIndex, makeSession, choicesFor, grade, optionText, loadSession, saveSession, tierFor, lowerTier } = await import('../.cache/app.mjs');

const data = (f) => JSON.parse(readFileSync(new URL(`../public/data/${f}`, import.meta.url), 'utf8'));
const db = new DB('/');
db.ingest(data('catalog.json'), data('landmarks.json'), data('attachments.json'), data('content.json'), data('cases.json'));

let failed = 0;
let checks = 0;
const check = (ok, msg) => {
  checks++;
  if (!ok) {
    failed++;
    console.log('FAIL', msg);
  }
};

// ---------------------------------------------------------------- decks
const decks = new Map(DECKS.map((d) => [d.id, buildDeck(db, d, false)]));
for (const d of DECKS) {
  const qs = decks.get(d.id);
  check(qs.length > 0, `${d.code}: has questions`);
  check(new Set(qs.map((q) => q.id)).size === qs.length, `${d.code}: card ids are unique`);
  check(buildDeck(db, d, false) === qs, `${d.code}: the built deck is cached`);
  for (const q of qs) {
    const ok = q.answers.length > 0 && !!q.display && q.packs.length > 0 && q.layers.length > 0 && d.types.includes(q.type) && q.deck === d.id;
    if (!ok) check(false, `${d.code}: ${q.id} is incomplete`);
    if (q.type !== 'case' && !q.landmark && q.type !== 'joint' && q.type !== 'axes' && q.type !== 'ligament' && !q.ids.length) check(false, `${d.code}: ${q.id} has no mesh to show`);
  }
  console.log(`ok   ${d.code.padEnd(4)} ${String(qs.length).padStart(4)} questions`);
}
const has = (deck, id) => decks.get(deck).some((q) => q.id === id);
// unpaired bones belong to general osteology (they were once dropped because the right side was preferred)
for (const k of ['frontal-bone', 'mandible', 'sacrum', 'vertebra-t5', 'manubrium-of-sternum', 'humerus']) check(has('pa1', `name:${k}`), `PA1 asks ${k}`);
check(has('pa6', 'name:diaphragm') && has('pa6', 'name:trachea') && has('pa6', 'name:thyroid-cartilage'), 'PA6 holds the unpaired thoracic and laryngeal structures');
check(!decks.get('pa6').some((q) => /coccygeus|levator-ani|pubo/.test(q.key)), 'PA6 holds no muscles of the pelvic floor');
// a muscle whose heads are separate meshes is asked as one muscle, with its facts
for (const k of ['gastrocnemius-muscle', 'biceps-femoris-muscle']) check(has('pa5', `name:${k}`) && has('pa5', `origin:${k}`) && has('pa5', `nerve:${k}`), `PA5 asks ${k} as a whole`);
for (const k of ['flexor-carpi-ulnaris-muscle', 'pronator-teres-muscle', 'biceps-brachii-muscle']) check(has('pa4', `name:${k}`) && has('pa4', `action:${k}`), `PA4 asks ${k} as a whole`);
check(!has('pa5', 'name:lateral-head-of-gastrocnemius'), 'a muscle head is not asked apart from its muscle');
// the limb deck is built from the written vessel and nerve entries
check(has('pa8', 'name:median-nerve') && has('pa8', 'roots:median-nerve') && has('pa8', 'from:deep-brachial-artery') && has('pa8', 'drains:great-saphenous-vein'), 'PA8 asks names, roots, parent vessels and drainage');
check(decks.get('pa8').every((q) => db.content.get(q.key)?.domain === 'vn'), 'every PA8 card has a written entry');
check(questionIndex(db, false).size >= 2500, 'the index holds every card once');

// ---------------------------------------------------------------- multiple choice
let withOptions = 0, typedOnly = 0;
for (const d of DECKS) {
  const qs = decks.get(d.id);
  for (const q of qs) {
    if (q.type === 'find') continue;
    const act = db.content.get(q.key)?.facts?.action;
    const opts = { exclude: [db.latin(q.key)], context: act ? `${act.en ?? ''} ${act.id ?? ''}` : '' };
    const a = choicesFor(q, qs, 'seed-a', opts);
    if (!a) {
      typedOnly++;
      continue;
    }
    withOptions++;
    const right = a.filter((c) => c.ok);
    if (right.length !== 1) check(false, `${q.id}: ${right.length} right options`);
    if (new Set(a.map((c) => c.text.toLowerCase())).size !== a.length) check(false, `${q.id}: an option appears twice`);
    if (a.length < 3 || a.length > 5) check(false, `${q.id}: ${a.length} options`);
    if (JSON.stringify(choicesFor(q, qs, 'seed-a', opts)) !== JSON.stringify(a)) check(false, `${q.id}: the same seed gave different options`);
    if (q.type === 'case') continue;
    if (!grade(right[0].text, q.answers).ok) check(false, `${q.id}: the right option "${right[0].text}" is not an accepted answer`);
    for (const c of a) if (!c.ok && grade(c.text, q.answers).ok) check(false, `${q.id}: the wrong option "${c.text}" would be accepted when typed`);
  }
}
check(withOptions > 2300, `most questions have options (${withOptions})`);
check(typedOnly < 30, `few questions fall back to typing (${typedOnly})`);
console.log(`ok   options for ${withOptions} questions, ${typedOnly} typed only`);

// ---------------------------------------------------------------- clinical cases
const cases = decks.get('dx');
check(cases.length >= 70, `clinical cases (${cases.length})`);
for (const q of cases) {
  const c = q.case;
  const ok = c && c.options.length >= 3 && c.stem.en && c.stem.id && c.explain.en && c.explain.id;
  if (!ok) check(false, `${q.id}: incomplete case`);
  if (!q.reveal?.length) check(false, `${q.id}: nothing to show on the model`);
  if (!q.packs.includes('skeleton')) check(false, `${q.id}: the skeleton is not staged`);
  for (const lang of ['en', 'id']) {
    const texts = c.options.map((o) => optionText(o, lang));
    if (texts.some((x) => !x) || new Set(texts).size !== texts.length) check(false, `${q.id}: options in ${lang}`);
    // a stem must not give the answer away by naming it
    const answer = texts[0].toLowerCase();
    if (answer.length > 12 && c.stem[lang].toLowerCase().includes(answer)) check(false, `${q.id}: the stem contains the answer (${lang})`);
  }
}
console.log(`ok   ${cases.length} clinical cases`);

// ---------------------------------------------------------------- sessions
const exam = makeSession(decks.get('pa4'), { types: ['origin', 'nerve'], size: 20, mode: 'exam' });
check(exam.length === 20 && new Set(exam.map((q) => q.id)).size === 20 && exam.every((q) => q.type === 'origin' || q.type === 'nerve'), 'an exam is a sample of the chosen types without repeats');
const practice = makeSession(decks.get('pa2'), { types: ['name'], size: 10, mode: 'practice' });
check(practice.length === 10 && practice.every((q) => q.type === 'name'), 'a practice session keeps to the chosen types');

const now = Date.now();
const saved = { v: 1, deck: 'pa4', mode: 'exam', choice: true, ids: exam.map((q) => q.id), answers: [{ id: exam[0].id, ok: true, typo: false, input: 'x' }], seed: 's1', at: now };
saveSession(saved);
check(JSON.stringify(loadSession(now)) === JSON.stringify(saved), 'a stored session comes back unchanged');
check(loadSession(now + 4 * 86_400_000) === null, 'a session older than three days is dropped');
saveSession({ ...saved, answers: saved.ids.map((id) => ({ id, ok: true, typo: false, input: '' })) });
check(loadSession(now) === null, 'a finished session is not offered again');
store.set('raga.quiz.session.v1', '{"v":1,"ids":"nope"}');
check(loadSession(now) === null, 'a damaged session is ignored');
saveSession(null);
check(loadSession(now) === null, 'a cleared session is gone');

// ---------------------------------------------------------------- graphics tier
const hint = (o) => ({ gpu: '', memory: undefined, cores: 8, touch: false, shortSide: 900, ...o });
check(tierFor(hint({ gpu: 'google swiftshader' })) === 'lite', 'software rendering starts on Lite');
check(tierFor(hint({ touch: true, memory: 4, shortSide: 390 })) === 'lite', 'a phone with little memory starts on Lite');
check(tierFor(hint({ touch: true, memory: 8, shortSide: 412 })) === 'high', 'a strong phone starts on High');
check(tierFor(hint({ touch: true, cores: 6, shortSide: 390 })) === 'lite', 'a six-core phone starts on Lite');
check(tierFor(hint({ gpu: 'angle (nvidia geforce rtx 3060)', memory: 8, cores: 12 })) === 'ultra', 'a desktop with a dedicated GPU starts on Ultra');
check(tierFor(hint({ gpu: 'angle (apple, angle metal renderer: apple m2)', memory: 8 })) === 'ultra', 'Apple silicon starts on Ultra');
check(tierFor(hint({ gpu: 'angle (intel(r) uhd graphics 620)', memory: 8 })) === 'high', 'integrated graphics start on High');
check(tierFor(hint({ gpu: 'angle (intel(r) uhd graphics 620)', memory: 4, cores: 4 })) === 'high', 'a small laptop starts on High');
check(lowerTier('ultra') === 'high' && lowerTier('high') === 'lite' && lowerTier('lite') === null, 'tiers step down one at a time');

console.log(failed ? `${failed} of ${checks} checks failing` : `all ${checks} checks passing`);
process.exit(failed ? 1 : 0);
