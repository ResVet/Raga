# Handoff: what is done and what is left

## Working now
- 3D atlas (three.js) from Z-Anatomy: 3,506 structures, 1,111 landmarks, 705 origin and insertion areas, layers, regions, explode, cut plane, x-ray, isolate, colour by action, photo, deep links, EN/ID, PWA offline.
- Three graphics tiers. Ultra is the full source geometry in `public/models/ultra/` with shadows, GTAO, bloom and depth of field, High is `public/models/`, Lite is `public/models/lite/`. All tiers have baked vertex AO. The app picks the tier for the device on first load (`src/ui/tier.ts`) until the user chooses one. If the WebGL context is lost and does not come back within 2.5 s, the app saves the next tier down and reloads.
- Cut plane: clicks, hover and landmark dots only see what the plane keeps, so a click on the cut surface selects the structure that is visible there.
- Landmark areas painted on the bone, coloured by kind (`src/engine/landmarks.ts`). The side panel list uses the same palette.
- Motion rig (`src/engine/motion.ts`, `src/engine/motionTable.ts`, `src/engine/rigWeights.ts`): 26 movements per side on 8 joints, 97 muscle keys with clips, prime movers glow and shorten, antagonists turn violet. Soft tissue follows the bones through per-vertex weights worked out from the distance to the moving and the fixed bones, and broad trunk muscles are pulled along their fibres toward the insertion. `docs/ENGINE_API.md` has the details.
- Interface: "stained glass" design in `docs/DESIGN.md` (depth gauge, body map, specimen tag, instrument tray, motion bar, slide-style quiz decks).
- Quiz (`src/quiz/`, `src/ui/Quiz.tsx`, `src/ui/QuizStation.tsx`, `src/ui/quizStage.ts`): decks PA1 to PA8 and a deck of 76 clinical cases, 2,994 cards of 19 question types. Answers are typed in Latin and graded with word-level typo rules, or picked from four options. Spaced repetition with a "review due cards" session across decks, OSPE mode with a timer, results and progress pages. A session survives a reload and a trip to the atlas.
- Content: 1,832 entries in `content/*.json`, built into `public/data/content.json` by `python3 pipeline/build_content.py content`, and 76 cases in `content/cases/*.json`, built into `public/data/cases.json` by `python3 pipeline/build_cases.py`. All eight practicals are covered, including the upper limb ligaments, the heart and great vessels, pleura and mediastinum, the joints of the vertebral column and thorax, the thoracic wall muscles and the intercostal vessels and nerves.
- Tests: `npm test` runs the grader, the decks and options (every card of every deck), the cases, the saved session, the tier choice and the rig weights. It needs only node and esbuild.
- Deploy: GitHub Actions runs the tests, builds `main` and publishes the `gh-pages` branch. Pages serves gh-pages / root.

## Checks done
- Muscle facts of both limbs (origin, insertion, action, nerve and roots) and all joint classifications were read through a second time. No errors found.
- New thorax, trunk and ligament entries were spot-checked against Moore and Gray's.
- Heart landmarks were measured on the ultra meshes and corrected (`pipeline/landmark_fixes.json`): Z-Anatomy had the right and left pulmonary surfaces swapped, the inferior border on the same point as the inferior interventricular sulcus, and no left border.
- Motion clips were played to their peak at High and Lite from the front, the back and the side. Directions and antagonists are right, and latissimus dorsi and pectoralis major follow the arm in abduction and flexion.
- The quiz was played through in a browser on a desktop and a phone layout: typed answers, options, cases, OSPE, due cards, leaving for the atlas and coming back, reloading in the middle of a session, and losing the WebGL context during a station.

## Still open
- 31 entries carry `"verify": true` because sources disagree or are thin (list them with `python3 -c "import json;print([e['key'] for e in json.load(open('public/data/content.json')) if e.get('verify')])"`). Each shows a notice in the app.
- A full line-by-line review of every entry and every clinical case by a second person would still be worth doing before telling students the data is final. `pipeline/extract_review.py` makes a compact table for that and `pipeline/apply_fixes.py` applies the fixes.
- Keys for the abdomen, pelvis and head that appear in `docs/keys/*.tsv` without content are outside Blok 4.

## Known limits of the engine
- There is no muscle sliding or collision. At 90 degrees of shoulder abduction the tendons of pectoralis major and latissimus dorsi are stretched, and in 90 degrees of flexion pectoralis major shows a fold under the arm.
- The scapula and pelvis stay still, so shoulder and hip ranges are the glenohumeral and hip joint alone. Finger, thumb and scapular muscles have no clip.
- While a clip plays, clicking soft tissue picks it at its rest position. Bones pick correctly.
- While the camera moves only the baked AO is shown; the live AO and shadows come back when the view settles.
- The tier choice is a guess from what the browser reports (memory, cores, screen, GPU name). It has been tested in headless Chrome only.

## Rebuilding the models
`pipeline/build_models.sh` re-runs the optimizer and the AO bake for all tiers. The Blender export needs the `bpy` module and about 7 GB of RAM per pack, so run one pack per process (`RAGA_TIER=ultra` for the ultra tier). After `export_meta.py`, run `python3 pipeline/fix_landmarks.py`.

## Polish ideas
- Try the automatic tier on a few real phones and laptops and adjust `tierFor` in `src/ui/tier.ts` where it guesses wrong.
- Hand and scapular motion (needs the carpus, fingers and scapulothoracic joint in the rig).
- Histology slide quiz for the Blok 4 OSPE histologi.
- More clinical cases for the larynx and the vertebral column, which have few.
- A case could name the exact spot to look at (a landmark), so that the view after the answer closes in on it. Today the view is worked out from the sizes of the structures in `focus`.
