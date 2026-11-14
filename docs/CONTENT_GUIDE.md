# Raga content guide

Raga is a free, open-source 3D anatomy atlas and quiz built on the Z-Anatomy model (CC BY-SA 4.0).
First audience: medical students at FK Universitas Sriwijaya (Indonesia), Blok 4 "Struktur Jaringan dan
Organ Tubuh Manusia I" (osteology, joints, muscles of upper and lower limb, thoracic wall, larynx and airways,
heart and lungs, vessels and nerves of the limbs). Second audience: anyone in the world, so every text is
bilingual (English + Bahasa Indonesia) and names are Latin (Terminologia Anatomica).

Students will be graded on this material in an OSPE (practical exam with cadaver/models) where they must
write the Latin name of a pinned structure, plus written exams on origin, insertion, action, innervation and
joint classification. A wrong fact in this dataset means a student learns something wrong. Accuracy beats
coverage: if you are not sure about a fact, check it against a second source (Kenhub, TeachMeAnatomy,
Radiopaedia, Wikipedia, IMAIOS e-Anatomy) or leave the field out and add "verify": true to the entry.

## Reference standard

- Facts: Moore's Clinically Oriented Anatomy (8th/9th ed.), Gray's Anatomy for Students, Netter's Atlas.
- Latin: Terminologia Anatomica 1998 (TA98), the form used in Indonesian lectures and in Sobotta.
  TA2 (2019) variants go into `alt` when they differ (example: TA98 "Cavitas glenoidalis",
  TA2 "Fossa glenoidea"; TA98 "Femur", TA2 "Os femoris").
- The FK Unsri practical module (Modul Praktikum Anatomi Blok 4) sets the scope. Every structure,
  landmark, joint and muscle it names must have an entry. Where the module spells a term in a non-standard
  way (for example "Facies articularis acromia", "Os Fibuka", "Linea musculi scapulae"), put the module
  spelling into `alt` so the quiz accepts it, but keep `la` correct. If the module states a fact that
  disagrees with the standard references, follow the references and mention the difference in
  `facts.note` (both languages).

## File format

Entries live in `content/` as UTF-8 JSON files named `<domain>-<part>.json` (for example
`upper-bones.json`, `upper-muscles.json`). Each file is a JSON array of entries. Keep a file to one part
of a domain, which makes it easier to review. After editing, check that every file still parses:
`python3 -c "import json,sys; json.load(open(sys.argv[1]))" FILE`.

### Common fields (every entry)

```json
{
  "key": "biceps-brachii-muscle",
  "kind": "muscle",
  "la": "Musculus biceps brachii",
  "alt": ["M. biceps brachii", "Biceps brachii"],
  "en": "Biceps brachii",
  "desc": {"en": "...", "id": "..."},
  "facts": {},
  "quiz": {}
}
```

- `key`: copy it exactly from the first column of your domain TSV (`docs/keys/keys_<domain>.tsv`).
  The TSV lists what exists in the 3D model: meshes, `[GROUP]` rows (a whole muscle or joint made of several
  meshes) and `landmark` rows. For a muscle split into heads or parts in the model, write one full `muscle`
  entry on the `[GROUP]` key (e.g. `biceps-brachii-muscle`) and short `muscle-part` entries on each head key
  (e.g. `long-head-of-biceps-brachii`). For a joint use the joint `[GROUP]` key (e.g. `glenohumeral-joint`).
  If something the module needs is not in the TSV, still write it with a sensible lowercase-hyphen key and
  add `"model": false`.
- `kind`: one of `bone`, `landmark`, `joint`, `ligament`, `muscle`, `muscle-part`, `tendon`, `bursa`,
  `fascia`, `artery`, `vein`, `nerve`, `plexus-part`, `organ`, `organ-part`, `cartilage`, `membrane`.
- `la`: the canonical Latin answer, TA98 style, written the way it is answered in an OSPE.
  Bones without "Os" when TA98 has none ("Humerus", "Scapula", "Clavicula", "Femur", "Tibia"), with "Os"
  when TA98 has it ("Os coxae", "Os scaphoideum", "Os hyoideum"). Muscles start with "Musculus"
  (or "Musculi" for groups), nerves "Nervus", arteries "Arteria", veins "Vena", ligaments "Ligamentum".
  Landmarks are bare ("Tuberculum majus", "Processus coracoideus").
- `alt`: every other answer that must be accepted: abbreviations (M., Mm., N., A., V., Lig., Art.),
  TA2 forms, common synonyms (fibularis/peroneus, "articulatio humeri" for glenohumeral), module spellings,
  and the form with the bone name added for landmarks ("Tuberculum majus humeri"). Latin only, no English.
- `en`: the usual English name.
- `desc`: 1 to 3 sentences per language. What it is, where it is, and the one or two facts a student must
  know. The Indonesian text must read like an Indonesian lecturer wrote it (use the terms used in Indonesian
  FK teaching: tulang, sendi, otot, persarafan, perdarahan, origo, insersio, aksi), not a word-for-word
  translation.
- `quiz`: short answers used for auto-graded short-answer questions. Each value is an array; the first item
  is the canonical answer, the rest are accepted alternatives. Keep each answer short (a Latin term or
  short phrase, no full sentences). Use these keys when they apply:
  - muscle: `origin`, `insertion`, `nerve`, `action` (action answers may be Latin or Indonesian movement
    words, e.g. ["flexio articulationis cubiti", "fleksi siku", "flexio cubiti"]).
  - joint: `type` (e.g. ["Articulatio sellaris", "sellaris", "saddle joint"... no English: use
    ["Articulatio sellaris", "sellaris", "sellaris (saddle)"]), `class` (["Articulatio synovialis", "synovialis"]),
    `axes` (["biaxial", "biaksial"]).
  - bone: `type` (["Os longum", "longum"]), `skeleton` (["Skeleton appendiculare", "appendiculare"]).
  - nerve: `roots` (["C5-C6", "C5, C6"]), `from` (source cord/plexus).
  - artery/vein: `from` / `continues` / `drains` as relevant.
  - landmark: `bone` (["Humerus"]) when helpful.

### Kind-specific `facts`

All free-text facts are objects `{"en": "...", "id": "..."}`; Latin-only facts are plain strings or arrays.

- bone: `type` ("Os longum" | "Os breve" | "Os planum" | "Os irregulare" | "Os sesamoideum" | "Os pneumaticum"),
  `skeleton` ("Skeleton axiale" | "Skeleton appendiculare"), `articulates` (Latin bone names),
  `features` (landmark keys from your TSV), `region` {en,id}, optional `clinical` {en,id}.
- landmark: `bone` (bone key), optional `attach` {en,id} (muscles/ligaments attached here, Latin names
  inside the text are fine), optional `clinical` {en,id}.
- joint: `class` (Latin), `subtype` (Latin shape: Articulatio plana / ginglymus / trochoidea / bicondylaris /
  ellipsoidea / sellaris / spheroidea / cotylica, or Sutura / Syndesmosis / Gomphosis / Synchondrosis /
  Symphysis), `complexity` ("Articulatio simplex" | "Articulatio composita"), `axes` ("uniaxial" |
  "biaxial" | "multiaxial"), `surfaces` (Latin text), `movements` {en,id}, `ligaments` (Latin list),
  `discs` (Latin, if any), `parts` (keys of component joints, if composita), optional `stability` {en,id},
  optional `clinical` {en,id}.
- ligament / membrane: `joint` (key), `attach` {en,id}, `function` {en,id}.
- muscle: `group` {en,id} (compartment / layer as taught), `origin` {la, en}, `insertion` {la, en},
  `action` {en,id}, `nerve` {la, roots} (roots as "C5-C6"), `blood` (Latin arteries), `parts`
  (keys of heads/parts), optional `clinical` {en,id}, optional `note` {en,id}.
- muscle-part: `muscle` (parent key), `origin` {la,en}, optional `insertion` {la,en}.
- artery / vein: `from` (Latin parent vessel), `course` {en,id}, `branches` (Latin list), `supplies` or
  `drains` {en,id}, `continues` (Latin), optional `clinical` {en,id}.
- nerve / plexus-part: `roots` ("C5-T1"), `from` (Latin), `course` {en,id}, `motor` (Latin muscle list),
  `sensory` {en,id}, `lesion` {en,id}.
- organ / organ-part / cartilage: `location` {en,id}, `features` {en,id}, optional `relations` {en,id},
  `blood`, `nerve`, optional `clinical` {en,id}.

## What the quiz reads

The quiz decks are built from these files alone, so a field that is missing means a question that is never
asked. This is where each kind of question comes from:

| Question | Field |
| --- | --- |
| Name the pinned structure, find the named structure | `la` and `alt` |
| Origin, insertion, innervation, action of a muscle | `quiz.origin`, `quiz.insertion`, `quiz.nerve`, `quiz.action` |
| Type of a joint, type of a bone | `quiz.type` |
| Axes of a joint | `quiz.axes` |
| Ligaments of a joint | `facts.ligaments` |
| Bones a bone articulates with | `facts.articulates` |
| Bone a landmark belongs to | `quiz.bone` on the landmark |
| Roots of a nerve | `quiz.roots` |
| Where a vessel, nerve or bronchus comes from | `quiz.from` |
| Where a vein drains, what a vessel continues as | `quiz.drains`, `quiz.continues` |
| Lobe of a bronchopulmonary segment | `quiz.lobe` on the segment |

For the two list questions (`facts.articulates`, `facts.ligaments`) the student gives any one item of the
list, so every item must be a name that can stand alone. Write the name first and any remark in brackets
after it, for example "Ligamentum collaterale ulnare (pars anterior)": the quiz shows and grades the name and
drops the bracket. Names inside the bracket that begin with Ligamentum, Ligamenta, Os or Ossa and are joined
by "et" are accepted as answers as well, as in "Ligamentum deltoideum (Ligamentum tibionaviculare et
Ligamentum tibiocalcaneum)".

The wrong options of a multiple-choice question are the right answers of other cards in the same deck. A
card whose first answer is a full sentence, or English where the others are Latin, stands out among them, so
keep the first item of every `quiz` array a short Latin term or phrase.

A muscle whose heads are separate meshes is asked as one muscle. The link is the `facts.muscle` field of
each `muscle-part` entry: it must hold the key of the `muscle` entry with the facts. Without it the heads
are asked by name only and the origin, insertion, nerve and action of the whole muscle are never asked.

## Clinical cases

Cases live in `content/cases/upper.json`, `lower.json`, `thorax.json` and `heart.json`. Each file is a JSON
array, and `python3 pipeline/build_cases.py` (or `npm run cases`) checks them and writes
`public/data/cases.json`.

```json
{
  "id": "axillary-nerve-surgical-neck",
  "stem": {"en": "A 24-year-old man falls from a motorcycle and ... Which nerve is injured?", "id": "..."},
  "options": ["Nervus axillaris", "Nervus radialis", "Nervus suprascapularis", "Nervus musculocutaneus"],
  "explain": {"en": "...", "id": "..."},
  "focus": ["axillary-nerve", "deltoid-muscle", "teres-minor-muscle"]
}
```

- `id`: lowercase words joined by hyphens, unique across all four files. The student's progress is stored
  under it, so do not rename a case once it is published.
- `stem`: a short clinical story that ends in one question. Give the findings a student could use to reason
  to the answer (mechanism, what the patient cannot do, where sensation is lost). The stem must not contain
  the answer itself; `npm test` fails when it does.
- `options`: three to five, the correct one first. The app shuffles them. An option is a Latin term, or
  `{"en": "...", "id": "..."}` when the answer is a statement. Wrong options should be things a student
  could confuse with the answer: the neighbouring nerve, the other head, the vessel of the next compartment.
- `explain`: two to four sentences per language that say why the answer is right and, where it helps, why
  the nearest wrong option is wrong.
- `focus`: keys of the structures to show on the model after the answer, the most important one first. The
  builder stops when a key has no mesh. For the limbs the right side is shown.

Cases follow the same sources and the same writing rules as the rest of the content. Keep to anatomy a
Blok 4 student can reason out from the structures: nerve injuries, fractures and what they endanger,
compartments, pulses, surface anatomy, auscultation points, coronary territories. Drug doses, laboratory
values and management belong to later blocks.

## Writing style (strict)

Write the way a careful teacher explains a structure to a first-year student.

- No em dashes or en dashes anywhere in prose. Use commas, periods, colons or parentheses. For number or
  segment ranges use a hyphen: "C5-C6", "T1-T12".
- Say what a structure is and does. Skip sentences that only announce that it matters ("plays a crucial
  role", "is of vital importance") and use plain verbs: is, has, lies, runs, attaches, supplies.
- List what the anatomy has, in the order a student would meet it on the specimen.
- No bold, no emojis, no rhetorical questions, no closing summary sentence.
- Vary sentence length. Concrete facts beat adjectives.
- Indonesian: natural sentences, formal but simple, as in an Indonesian anatomy handout. Latin terms stay
  Latin (in Indonesian text you can write "melekat pada tuberculum majus humeri").

## Checking your work

- `python3 pipeline/build_content.py content` rebuilds `public/data/content.json`. It counts the entries by
  domain and lists keys that match nothing in the model, entries with a problem and entries that still
  contain dashes.
- `python3 pipeline/build_cases.py` checks the clinical cases (ids, both languages, three to five options,
  focus keys that exist in the model) and writes `public/data/cases.json`. It writes nothing while a case
  has a problem.
- `npm test` builds every quiz deck from the data. It fails on duplicate cards, on a wrong option that would
  be accepted as right when typed and on a case whose stem gives the answer away.
- In the pull request, list the keys you marked `"verify": true` and say what the sources disagree on.
