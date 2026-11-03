# Handoff: what is done and what is left

## Working now
- 3D atlas (three.js) from Z-Anatomy: ~3,500 structures, 1,100 landmarks, origin/insertion patches, layers, regions, explode, cut plane, x-ray, muscle colour by action, screenshot, deep links, EN/ID, PWA offline, light mode for phones.
- Quiz decks PA1-PA8 (src/quiz/decks.ts), Latin short-answer grader with word-level typo rules (src/quiz/grader.ts, `npm test`), spaced repetition, OSPE timer, results page, progress page.
- Deploy: GitHub Actions builds `main` into the `gh-pages` branch. Enable once: Settings > Pages > Deploy from a branch > gh-pages / root.

## Content still missing (write JSON files into content/, then `python3 pipeline/build_content.py`)
Follow docs/CONTENT_GUIDE.md exactly (paths in it point to the old workspace: use content/ and docs/keys/*.tsv; the FK Unsri module PDF is not in the repo).
- Upper limb muscles: content/upper-muscles-shoulder|arm|forearm|hand.json, upper-misc.json (bursae, sheaths, fasciae). Keys: docs/keys/keys_upper.tsv.
- Lower limb, everything: lower-bones, lower-landmarks, lower-joints, lower-ligaments, lower-muscles-hip|thigh|leg|foot, lower-misc. Keys: keys_lower.tsv.
- Thorax: thorax-lungs, thorax-cavity, thorax-heart, thorax-vessels. Keys: keys_thorax.tsv.
- Trunk: axial-joints (vertebral, costal, sternal, TMJ joints and ligaments), axial-muscles (intercostals, diaphragm, serratus posterior, levatores costarum). Keys: keys_axial.tsv.
- Vessels: vn-lower-veins, vn-thoracic-wall. Keys: keys_vn.tsv.
Some of these files may already exist (partly written when the session ended): check them before rewriting.

## Fact check (do this before telling students the data is final)
1. `python3 pipeline/extract_review.py review/batch.tsv 'content/*.json'` makes a compact table of exam-critical fields.
2. Have a separate reviewer (who did not write the entries) check it and output fixes as [{file, key, path, new, why}].
3. `python3 pipeline/apply_fixes.py content fixes.json`, then rebuild content.json. Entries with "verify": true show a notice in the app.

## Polish ideas
- Retake docs/screenshot.png once the muscle content is in.
- Test on a real phone (light mode) and check quiz question counts per deck.
- Optional: atlas-plate label mode for landmarks, histology slide quiz (Blok 4 OSPE histologi), more regions.
