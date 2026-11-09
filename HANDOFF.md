# Handoff: what is done and what is left

## Working now
- 3D atlas (three.js) from Z-Anatomy: 3,506 structures, 1,110 landmarks, 705 origin and insertion areas, layers, regions, explode, cut plane, x-ray, isolate, colour by action, photo, deep links, EN/ID, PWA offline.
- Three graphics tiers. Ultra is the default (full source geometry in `public/models/ultra/`, shadows, GTAO, bloom, depth of field), High is `public/models/`, Lite is `public/models/lite/`. All tiers have baked vertex AO. If the WebGL context is lost on Ultra the app saves High and reloads.
- Landmark areas painted on the bone, coloured by kind (`src/engine/landmarks.ts`). The side panel list uses the same palette.
- Motion rig (`src/engine/motion.ts`, `src/engine/motionTable.ts`): 26 movements per side on 8 joints, 97 muscle keys with clips, prime movers glow and shorten, antagonists turn violet.
- Interface: "stained glass" design in `docs/DESIGN.md` (depth gauge, body map, specimen tag, instrument tray, motion bar, slide-style quiz decks).
- Quiz decks PA1-PA8 (`src/quiz/decks.ts`), Latin short-answer grader with word-level typo rules (`src/quiz/grader.ts`, `npm test`), spaced repetition, OSPE timer, results and progress pages.
- Deploy: GitHub Actions builds `main` into the `gh-pages` branch. Pages serves gh-pages / root.

## Content still missing
Write JSON files into `content/`, then run `python3 pipeline/build_content.py content`. Follow `docs/CONTENT_GUIDE.md` (its paths point to the old workspace: use `content/` and `docs/keys/*.tsv`; the FK Unsri module PDF is not in the repo and must not be added).
- Upper limb ligaments: `upper-ligaments.json` (sternoclavicular, acromioclavicular and coracoclavicular, glenohumeral, elbow, radioulnar, wrist, carpal and hand ligaments). Keys: `keys_upper.tsv`, type `joints`.
- Heart and great vessels: `thorax-heart.json` (chambers, valves and leaflets, papillary muscles, surface landmarks of the heart, coronary arteries, cardiac veins), `thorax-vessels.json` (aorta and its arch branches, pulmonary trunk and veins, venae cavae, brachiocephalic veins, azygos system), plus the pleura. Keys: `keys_thorax.tsv`.
- Trunk: `axial-joints.json` (joints and ligaments of the vertebral column and ribs), `axial-muscles.json` (muscles of the thoracic wall). Keys: `keys_axial.tsv`.
- Vessels: `vn-thoracic-wall.json` (intercostal arteries and nerves, internal thoracic vessels). Keys: `keys_vn.tsv`.
- To list what is still missing, compare the keys in `docs/keys/*.tsv` with the `key` fields in `public/data/content.json`. Keys for the abdomen, pelvis and head that show up in those lists are outside Blok 4.

## Fact check (do this before telling students the data is final)
1. `python3 pipeline/extract_review.py review/batch.tsv 'content/*.json'` makes a compact table of exam-critical fields.
2. Have a reviewer who did not write the entries check it and output fixes as `[{file, key, path, new, why}]`.
3. `python3 pipeline/apply_fixes.py content fixes.json`, then rebuild `content.json`. Entries with `"verify": true` show a notice in the app.

## Known limits of the engine
- Wrist, subtalar and hip rotation clips have not been checked visually; elbow flexion has only been checked from a distance at Ultra.
- In large shoulder movements pectoralis major and latissimus dorsi stretch into a broad sheet with a few sharp triangles. There is no muscle sliding or collision.
- The scapula and pelvis stay still, so shoulder and hip ranges are the glenohumeral and hip joint alone. Finger, thumb and scapular muscles have no clip.
- While a clip plays, clicking soft tissue picks it at its rest position. Bones pick correctly.
- While the camera moves only the baked AO is shown; the live AO and shadows come back when the view settles.

## Rebuilding the models
`pipeline/build_models.sh` re-runs the optimizer and the AO bake for all tiers. The Blender export needs the `bpy` module and about 7 GB of RAM per pack, so run one pack per process (`RAGA_TIER=ultra` for the ultra tier).

## Polish ideas
- Test Ultra on a few real phones and note which ones fall back to High.
- Hand and scapular motion (needs the carpus, fingers and scapulothoracic joint in the rig).
- Histology slide quiz for the Blok 4 OSPE histologi.
