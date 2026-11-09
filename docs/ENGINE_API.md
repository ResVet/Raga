# Engine contract (shared by the engine work and the interface work)

File ownership while two people work in parallel:
- Engine side owns `src/engine/**`, `src/data/**`, `pipeline/**`, `public/models/**`, `public/data/*` except content.json.
- Interface side owns `src/App.tsx`, `src/ui/**`, `src/i18n.ts`, `src/styles.css`, `src/main.tsx`, `index.html`, `public/icons/**`, `public/manifest.webmanifest`.
- `window.__raga = { engine, db }` must stay exposed by App.tsx (used by automated visual tests).

## Quality tiers

`type Quality = 'ultra' | 'high' | 'lite'`
- `ultra` (default on every device): full-resolution source meshes from `public/models/ultra/*.glb` with baked
  per-vertex ambient occlusion, MSAA post chain, GTAO, device pixel ratio up to 2, all material features.
- `high`: `public/models/*.glb` (simplified), GTAO, DPR up to 2.
- `lite`: `public/models/lite/*.glb`, no post-processing, DPR up to 1.5, cheap materials.
- `new Engine(container, { quality, base })` picks the model folder from the tier. Changing tier needs a reload
  (the interface stores the choice and reloads). The engine fires `onContextLost(cb)` if WebGL is lost so the
  interface can fall back to `high` and tell the user.

## Existing API that stays

`loadPack, isLoaded, batch, setLayer, setLayerOpacity, setHidden, setIsolate, setSide, setXray, setRegion,
setAttachments, setColorMode, setTint(Map<id, 'hover'|'select'|'target'|'right'|'wrong'|'related'>),
setExplode, setClip, frameIds, frameVisible, frameBox, framePoint, view, setInsets(left, right, bottom),
setLandmarks, highlightLandmark, setPin, getPinHead, project, pickAt, onHover, onPick, onDoublePick, onFrame,
worldPointOn, registerAttachmentBone, screenshot, objects, dispose`.
Visual meaning changes only: `select`/`target` render as an eosin (#ff5d8f) rim glow plus light tint,
`related` as a violet (#7b6cff) rim, `right` mint (#6ff0c4), `wrong` orange (#ff8a3d).

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
`engine.onContextLost(cb): () => void` fires once if the WebGL context is lost (the interface stores
`high` and reloads). The settings default (`loadSettings` in `src/ui/ctx.ts`) is interface-owned and should
default to `'ultra'`.

## Motion notes

`clipsForKey(db, key, side)` accepts a muscle, a muscle part or head, a muscle group (e.g.
`biceps-brachii-muscle`, `deltoid-muscle`, `quadriceps-femoris`) or a joint key (`elbow-joint`,
`glenohumeral-joint`, `knee-joint`...). The first clip is the most typical action. Movements whose range
starts away from the anatomical position ease into a start pose first (about 0.5 s): elbow and knee
extension start flexed, shoulder and hip adduction start abducted, pronation and supination start
mid-prone (ranges measured from there, as in clinical goniometry). `angles` report degrees moved from
that start. Picking during motion hits the posed bones; soft tissue is picked at rest.
