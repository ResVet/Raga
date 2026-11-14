# Engine contract

The engine and the interface are kept apart, so that either side can change without breaking the other.
- Engine side owns `src/engine/**`, `src/data/**`, `pipeline/**`, `public/models/**`, `public/data/*` except content.json.
- Interface side owns `src/App.tsx`, `src/ui/**`, `src/i18n.ts`, `src/styles.css`, `src/main.tsx`, `index.html`, `public/icons/**`, `public/manifest.webmanifest`.
- `window.__raga = { engine, db }` must stay exposed by App.tsx (used by automated visual tests).

## Quality tiers

`type Quality = 'ultra' | 'high' | 'lite'`
- `ultra`: full-resolution source meshes from `public/models/ultra/*.glb` with baked
  per-vertex ambient occlusion, MSAA post chain, GTAO, device pixel ratio up to 2, all material features.
- `high`: `public/models/*.glb` (simplified), GTAO, DPR up to 2.
- `lite`: `public/models/lite/*.glb`, no post-processing, DPR up to 1.5, cheap materials.
- `new Engine(container, { quality, base })` picks the model folder from the tier. Changing tier needs a reload
  (the interface stores the choice and reloads). The interface decides which tier a device starts on
  (`src/ui/tier.ts`): software rendering and small phones get `lite`, other phones, tablets and laptops with
  integrated graphics get `high`, and `ultra` is kept for dedicated GPUs and Apple silicon.
- The engine fires `onContextLost(cb)` when WebGL is lost and `onContextRestored(cb)` when the browser hands
  the context back (it rebuilds the environment map and shadow state itself). `engine.contextLost` tells
  which state it is in. The interface waits 2.5 s after a loss; if the context is still gone it stores the
  next tier down and reloads.

## Existing API that stays

`loadPack, isLoaded, batch, setLayer, setLayerOpacity, setHidden, setIsolate, setSide, setXray, setRegion,
setAttachments, setColorMode, setTint(Map<id, 'hover'|'select'|'target'|'right'|'wrong'|'related'>),
setExplode, setClip, frameIds, frameVisible, frameBox, framePoint, view, setInsets(left, right, bottom, top),
setLandmarks, highlightLandmark, setPin, getPinHead, project, pickAt, onHover, onPick, onDoublePick, onFrame,
worldPointOn, registerAttachmentBone, screenshot, objects, dispose`.
Visual meaning changes only: `select`/`target` render as an eosin (#ff5d8f) rim glow plus light tint,
`related` as a violet (#7b6cff) rim, `right` mint (#6ff0c4), `wrong` orange (#ff8a3d).

- `setInsets` takes the space the panels cover on each side, in CSS pixels. The specimen is centred in what is
  left and the frame calls fit it there. The quiz station measures its placard and answer panel and passes
  both a top and a bottom inset.
- With a cut plane on (`setClip`), picking and `project()` only see what the plane keeps. A click passes through
  the removed half and lands on the first structure behind the cut surface, and a landmark dot on the removed
  side cannot be picked.
- `visibleShare(ids, dir, solid?)` returns how much of some structures can be seen from a direction (0 to 1):
  the share of sample points on their surfaces that no other visible structure covers. `solid` narrows what
  counts as cover, for example to bone only while the X-ray fades everything else. The quiz uses it to look at
  a small or deep target from the side where it is not hidden.
- `framePoint(p, n, dist)` returns the position the camera flies to, and `covered(p, eye, own?)` tells whether
  another visible structure stands between a point and that position. The quiz uses the pair for landmark
  questions: a joint surface faces the neighbouring bone, so when that bone is in the way everything except
  the bone of the landmark is faded with `setXray`.

## Motion API (new, `src/engine/motion.ts`, reachable as `engine.motion`)

```ts
export type JointId = 'shoulder' | 'elbow' | 'radioulnar' | 'wrist' | 'hip' | 'knee' | 'ankle' | 'subtalar';
export type MovementId =
  | 'flexion' | 'extension' | 'abduction' | 'adduction' | 'medial-rotation' | 'lateral-rotation'
  | 'pronation' | 'supination' | 'radial-deviation' | 'ulnar-deviation'
  | 'dorsiflexion' | 'plantarflexion' | 'inversion' | 'eversion';

export interface MotionClip {
  id: string;                       // e.g. 'elbow-flexion-r' or 'm:biceps-brachii-muscle-r'
  side: 'l' | 'r';
  moves: { joint: JointId; movement: MovementId; deg: number }[]; // all played together, rest -> deg
  muscles: string[];                // structure ids that contract (glow + bulge)
  stretch: string[];                // antagonist structure ids (violet tint while lengthening)
  label: { la: string; en: string; id: string }; // e.g. 'Flexio articulationis cubiti'
  packs: PackId[];                  // packs that must be loaded before play (e.g. ['skeleton','muscles'])
}

clipsForKey(db: DB, key: string, side: 'l' | 'r'): MotionClip[]   // muscle or joint concept key; [] if none
jointClips(db: DB, side: 'l' | 'r'): MotionClip[]                  // every joint movement, for Motion mode

engine.motion.play(clip, opts?: { loop?: boolean; speed?: number }) // caller loads clip.packs first
engine.motion.pause(); engine.motion.resume(); engine.motion.stop()  // stop eases back to the rest pose
engine.motion.scrub(t: number)        // 0..1 along one contract-and-relax cycle; pauses playback
engine.motion.setSpeed(x: number); engine.motion.setLoop(on: boolean)
engine.motion.state(): { clip: MotionClip | null; t: number; playing: boolean; angles: number[] } // degrees per move
engine.motion.onTick(cb): () => void  // every frame while a clip is loaded
```
One cycle goes rest -> full movement -> rest (about 2.6 s at speed 1). `angles` are the live joint angles for the
read-out. While a clip is loaded, explode is forced to 0.

## Effects

```ts
export interface Effects { shadows: boolean; dof: boolean; bloom: boolean; ao: boolean; adaptive: boolean }
engine.setEffects(e: Partial<Effects>)   // takes effect on the next frame, no reload
engine.getEffects(): Effects
```
Defaults by tier: `ultra` all true (depth of field is subtle); `high` ao, bloom, adaptive (no shadows, no
depth of field); `lite` none (ao, dof and bloom need the post chain and stay off in lite; shadows and
adaptive can be switched on). Turning shadows on or off recompiles materials once (short hitch).
- `shadows`: one camera-relative key light with soft PCF shadows (17-tap, radius-scaled); the shadow camera is
  fitted to the visible structures around the view and refreshed only when the light, the visible set,
  explode or a motion pose changes.
- `ao`: GTAO tuned for body scale on top of the baked per-vertex AO (baked AO is always on).
- `dof`: gentle depth of field focused on the selected structure (or the orbit target).
- `bloom`: only the selection rim, the highlighted landmark ring and the quiz pin glow.
- `adaptive`: while the camera or a motion clip moves, frames are rendered cheaper (lower resolution,
  no GTAO or depth of field, shadows hidden on slow devices); about 200 ms after the view settles the
  full-quality frame fades in. Moving-frame resolution steps down below ~45 fps and back up above ~57 fps.
Rendering is on demand only. Ultra renders at device pixel ratio (cap 2), never below a 1080p drawing
buffer on desktop, capped at 3840x2160 pixels.

## Landmark areas and colours

```ts
import { landmarkKind, LANDMARK_COLORS, LANDMARK_KINDS, LANDMARK_KIND_LABELS, landmarkRadius,
         type LandmarkKind } from './engine/Engine';   // also exported from './engine/landmarks'
type LandmarkKind = 'process' | 'fossa' | 'line' | 'surface' | 'foramen' | 'part';
landmarkKind(name: string): LandmarkKind   // pass `${rec.en} ${rec.la ?? ''}`
LANDMARK_COLORS: Record<LandmarkKind, string>            // for the colour legend
LANDMARK_KIND_LABELS: Record<LandmarkKind, { la: string; en: string; id: string }>
engine.setLandmarkAreas(list: LandmarkRec[], highlightKey: string | null)
```
Each landmark is drawn as a surface decal on the bone it sits on (moves with explode and motion): a soft
fill in its kind colour with a thin bright outline ring; at most 32 per frame (the highlighted one, then
those nearest the orbit target). The highlighted landmark gets a stronger fill and a pulsing, glowing ring.
`setLandmarks(list, key)` keeps drawing the dots (now in the kind colour) and also sets the areas to the
same list; `highlightLandmark(key)` updates both. Call `setLandmarkAreas([], null)` to show dots only.
Palette (kept apart from the eosin selection rim): processes, tubercles, heads, condyles #ffa94d; fossae
and notches #9b8cff; lines, crests, borders, grooves #ffe066; articular facets and surfaces #3ddcf0;
foramina, canals, pits #4ade80; parts of a bone (body, neck, ramus, angle) #2f7bd6. Decal radius: processes 9-14 mm, fossae and surfaces 12-20 mm, lines 6-8 mm,
foramina 4-6 mm, scaled by bone size. Origin (#e5484d) and insertion (#3b82f6) patches are emissive with
an outline rim.

## Tier switch

`new Engine(container, { quality, base })` with `quality` omitted means `'ultra'`. Models load from
`models/ultra/`, `models/` (high) or `models/lite/`. `engine.getQuality()` returns the tier.
`engine.onContextLost(cb): () => void` fires if the WebGL context is lost, `engine.onContextRestored(cb)` if it
comes back. The settings (`loadSettings` in `src/ui/ctx.ts`) are interface-owned: `autoQuality` is on until the
user picks a tier, and while it is on `quality` holds the tier chosen for the device by `autoTier()`.

## Motion notes

`clipsForKey(db, key, side)` accepts a muscle, a muscle part or head, a muscle group (e.g.
`biceps-brachii-muscle`, `deltoid-muscle`, `quadriceps-femoris`) or a joint key (`elbow-joint`,
`glenohumeral-joint`, `knee-joint`...). The first clip is the most typical action. Movements whose range
starts away from the anatomical position ease into a start pose first (about 0.5 s): elbow and knee
extension start flexed, shoulder and hip adduction start abducted, pronation and supination start
mid-prone (ranges measured from there, as in clinical goniometry). `angles` report degrees moved from
that start. Picking during motion hits the posed bones; soft tissue is picked at rest. Rotation of the
shoulder and hip is shown with the elbow or knee held at 90 degrees (`START_ALSO` in `motionTable.ts`), so the
forearm or leg works as a pointer.

### How soft tissue follows the bones

The weights live in `src/engine/rigWeights.ts`, which has no dependency on three.js and is covered by
`tests/rig.test.mjs`. The first time a limb moves, `motion.ts` builds two distance fields for each joint on a
voxel grid (5 mm or coarser): the distance to the bones the joint moves, and the distance to the bones that
stay still. Every vertex of every muscle, tendon, vessel and nerve of the limb then gets a weight from the
ratio of the two distances, so tissue lying on the moving bone follows it fully, tissue on the fixed bones
stays, and the part in between blends. The joints further down the limb (elbow, wrist) multiply a hinge
weight on top. This takes 0.2 to 0.4 s per limb once and is stored in two vertex attributes: `rigW` (how far
the vertex follows each of the four joints of the limb) and `rigP` (see below).

A muscle is classed by where most of its fleshy part lies. One that lies mostly on the fixed side but inserts
on the moving bone (latissimus dorsi, pectoralis major, the gluteal muscles) would be stretched into a thin
web by rotation alone. For these the rig finds the insertion, the vertices that follow the bone fully, and
adds a pull: each vertex slides along the direction of its fibres by a share of the distance the insertion
has travelled, large near the insertion and zero at the origin. The vertex shader applies the joint rotations
first and the pull after them (`RIG_GLSL` in `organic.ts`, uniform `uPull` per structure).
