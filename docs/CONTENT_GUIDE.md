# Raga content guide (read fully before writing)

Raga is a free, open-source 3D anatomy atlas and quiz built on the Z-Anatomy model (CC BY-SA 4.0).
First audience: medical students at FK Universitas Sriwijaya (Indonesia), Blok 4 "Struktur Jaringan dan
Organ Tubuh Manusia I" (osteology, joints, muscles of upper and lower limb, thoracic wall, larynx and airways,
heart and lungs, vessels and nerves of the limbs). Second audience: anyone in the world, so every text is
bilingual (English + Bahasa Indonesia) and names are Latin (Terminologia Anatomica).

Students will be graded on this material in an OSPE (practical exam with cadaver/models) where they must
write the Latin name of a pinned structure, plus written exams on origin, insertion, action, innervation and
joint classification. A wrong fact in this dataset means a student learns something wrong. Accuracy beats
coverage: if you are not sure about a fact, verify it (WebSearch / WebFetch on Kenhub, TeachMeAnatomy,
Radiopaedia, Wikipedia, IMAIOS e-Anatomy) or leave the field out and add "verify": true to the entry.

## Reference standard

- Facts: Moore's Clinically Oriented Anatomy (8th/9th ed.), Gray's Anatomy for Students, Netter's Atlas.
- Latin: Terminologia Anatomica 1998 (TA98), the form used in Indonesian lectures and in Sobotta.
  TA2 (2019) variants go into `alt` when they differ (example: TA98 "Cavitas glenoidalis",
  TA2 "Fossa glenoidea"; TA98 "Femur", TA2 "Os femoris").
- The FK Unsri module text is in /home/claude/work/ref/modul_praktikum_anatomi_blok4.txt. Every structure,
  landmark, joint and muscle it names must have an entry. Where the module spells a term in a non-standard
  way (for example "Facies articularis acromia", "Os Fibuka", "Linea musculi scapulae"), put the module
  spelling into `alt` so the quiz accepts it, but keep `la` correct. If the module states a fact that
  disagrees with the standard references, follow the references and mention the difference in
  `facts.note` (both languages).

## File format

Write UTF-8 JSON files into /home/claude/work/content/ named `<domain>-<part>.json` (for example
`upper-bones.json`, `upper-muscles.json`). Each file is a JSON array of entries. Write in several files or
chunks; never one giant write. After writing, validate every file with
`python3 -c "import json,sys; json.load(open(sys.argv[1]))" FILE` and fix errors.

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

- `key`: copy it exactly from the first column of your domain TSV (/home/claude/work/ref/keys_<domain>.tsv).
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

## Writing style (strict)

The texts must read like a careful human teacher wrote them.

- No em dashes or en dashes anywhere in prose. Use commas, periods, colons or parentheses. For number or
  segment ranges use a hyphen: "C5-C6", "T1-T12".
- No "not X but Y" contrasts, no "not only... but also", no one-line dramatic closers.
- No filler or hype words: crucial, pivotal, vital, key (as adjective), robust, intricate, delve, showcase,
  highlight (verb), underscore, testament, landscape, plays a key/crucial role, serves as, stands as.
  Use plain verbs: is, has, lies, runs, attaches, supplies.
- Do not group things in threes for rhythm. List what the anatomy actually has.
- No bold, no emojis, no rhetorical questions, no "In summary".
- Vary sentence length. Concrete facts beat adjectives.
- Indonesian: natural sentences, formal but simple, as in an Indonesian anatomy handout. Latin terms stay
  Latin (in Indonesian text you can write "melekat pada tuberculum majus humeri").

## Final step

When done, print a short summary: files written, entry counts by kind, and the keys you marked
`"verify": true`.
