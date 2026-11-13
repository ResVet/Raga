// What the 3D view shows for a quiz station: before the answer, and once it is known.
import * as THREE from 'three';
import type { Engine, Tint } from '../engine/Engine';
import { LAYERS, type LayerId } from '../engine/layers';
import type { Question } from '../quiz/decks';
import { idsInRegion } from './regions';

const FRONT = new THREE.Vector3(0, 0.12, 1);

/** Clear the specimen so the slides lie on the bare micrograph. */
export function clearStage(engine: Engine) {
  engine.batch(() => {
    for (const l of LAYERS) engine.setLayer(l.id, false);
    engine.setLayer('attachments', false);
    engine.setTint(new Map());
    engine.setLandmarks([]);
    engine.setIsolate(null);
    engine.setXray(false, null);
    engine.setClip(null);
    engine.setRegion(null);
  });
  engine.setPin(null);
}

/** Take the marks of the last station off the model while the next one loads, so its answer does not linger. */
export function clearMarks(engine: Engine) {
  engine.setTint(new Map());
  engine.setXray(false, null);
  engine.setPin(null);
}

/** Question types that keep the target unmarked until the answer is in. */
const hidesTarget = (q: Question) => q.type === 'find' || q.type === 'lmBone' || q.type === 'lobe' || q.type === 'case';

function skeletonOf(engine: Engine, q: Question): string[] {
  return q.region ? idsInRegion(engine, q.region).filter((id) => engine.objects.get(id)?.layer === 'skeleton') : [];
}

/**
 * Pin the landmark of a question. `close` moves in on the pin, for naming the landmark itself. Otherwise the
 * whole bone or lobe stays in view with the pin on it, which is what an answer about that bone needs.
 */
function pinLandmark(engine: Engine, q: Question, close: boolean) {
  const l = q.landmark;
  if (!l) return;
  const pnt = engine.worldPointOn(l.on, new THREE.Vector3(...l.p));
  const n = new THREE.Vector3(...l.n);
  const bone = engine.objects.get(l.on);
  const out = bone ? pnt.clone().sub(bone.center).normalize() : n.clone();
  const dir = n.clone().multiplyScalar(0.65).add(out.multiplyScalar(0.35)).normalize();
  // the pin is sized for the distance it is seen from
  const dist = close ? Math.max(0.15, (bone?.radius ?? 0.1) * 1.3) : (bone?.radius ?? 0.1) * 4.5;
  engine.setPin(pnt, dir, '#ff5d8f', Math.min(close ? 1.4 : 3, Math.max(0.4, dist / 0.3)));
  if (close || !bone) {
    engine.framePoint(pnt, dir, dist);
    return;
  }
  // a long bone is looked at from the side the landmark is on, never along its shaft
  const view = dir.clone();
  const size = bone.box.getSize(new THREE.Vector3()).toArray();
  const long = size.indexOf(Math.max(...size));
  if (size[long] > 1.8 * Math.max(...size.filter((_, i) => i !== long))) {
    view.setComponent(long, 0);
    if (view.length() > 0.25) view.normalize();
    else view.copy(dir);
  }
  engine.frameIds([l.on], { dir: view, pad: 1.25 });
}

/**
 * The side to look from. `dir` is kept unless the target is mostly hidden from there and turning around
 * the body shows clearly more of it (a carpal bone seen from the wrong side sits behind its neighbours).
 */
function clearestSide(engine: Engine, ids: string[], dir: THREE.Vector3, solid?: (id: string) => boolean): THREE.Vector3 {
  let best = dir;
  let share = engine.visibleShare(ids, dir, solid);
  if (share >= 0.6) return dir;
  const up = new THREE.Vector3(0, 1, 0);
  for (const deg of [60, -60, 120, -120, 180]) {
    const alt = dir.clone().applyAxisAngle(up, THREE.MathUtils.degToRad(deg));
    const s = engine.visibleShare(ids, alt, solid);
    if (s > share + 0.12) {
      best = alt;
      share = s;
      if (s >= 0.8) break;
    }
  }
  return best;
}

/** Set up the model for a station. Call once the packs of the question are loaded. */
export function stageQuestion(engine: Engine, q: Question) {
  const hidden = hidesTarget(q);
  engine.batch(() => {
    for (const l of LAYERS) engine.setLayer(l.id, q.layers.includes(l.id as LayerId));
    for (const l of LAYERS) engine.setLayerOpacity(l.id, 1);
    engine.setLayer('attachments', true);
    engine.setAttachments([]);
    engine.setColorMode('real');
    engine.setClip(null);
    engine.setLandmarks([]);
    engine.setHidden([]);
    engine.setRegion(null);
  });
  engine.setExplode(0, false);
  engine.setSide(q.type === 'find' ? 'both' : (q.side ?? 'both'));
  let iso: Set<string> | null = null;
  if (q.type === 'case') iso = new Set(skeletonOf(engine, q));
  else if (q.region) {
    iso = new Set(idsInRegion(engine, q.region));
    q.ids.forEach((id) => iso!.add(id));
    if (q.landmark) iso.add(q.landmark.on);
  }
  engine.setIsolate(iso);
  const tints = new Map<string, Tint>();
  if (!hidden && q.type !== 'landmark') q.ids.forEach((id) => tints.set(id, 'target'));
  engine.setTint(tints);
  if (q.ghost && !hidden) {
    const focus = new Set(q.ids);
    for (const o of engine.objects.values()) if (o.layer === 'skeleton') focus.add(o.rec.id);
    engine.setXray(true, focus);
  } else engine.setXray(false, null);
  engine.setPin(null);
  if (q.type === 'landmark') {
    pinLandmark(engine, q, true);
    return;
  }
  if (hidden) {
    engine.frameVisible({ dir: FRONT });
    return;
  }
  const box = new THREE.Box3();
  for (const id of q.ids) {
    const o = engine.objects.get(id);
    if (o) box.union(o.box);
  }
  if (box.isEmpty()) {
    engine.frameVisible({ dir: FRONT });
    return;
  }
  const c = box.getCenter(new THREE.Vector3());
  let ref = new THREE.Vector3(0, c.y, 0);
  if (q.region) {
    const rb = new THREE.Box3();
    for (const id of iso ?? []) {
      const o = engine.objects.get(id);
      if (o && o.layer === 'skeleton') rb.union(o.box);
    }
    if (!rb.isEmpty()) ref = rb.getCenter(new THREE.Vector3());
  }
  // look at the structure from the side it lies on, with a little of the front in view
  const d = c.clone().sub(ref);
  d.y *= 0.25;
  const dir = d.lengthSq() > 1e-5 ? d.normalize().multiplyScalar(0.8).add(new THREE.Vector3(0, 0.1, 0.35)).normalize() : FRONT;
  const pad = q.layers.some((l) => l === 'muscles' || l === 'arteries' || l === 'veins' || l === 'nerves') ? 1.5 : 1.9;
  // faded structures do not hide anything; with the X-ray on, only bone can be in the way
  const solid = q.ghost ? (id: string) => engine.objects.get(id)?.layer === 'skeleton' : undefined;
  engine.frameBox(box, { dir: clearestSide(engine, q.ids, dir, solid), pad });
}

/** Show the answer on the model: colour the target, mark a wrong pick, bring hidden targets into view. */
export function revealAnswer(engine: Engine, q: Question, ok: boolean, pickedId: string | null) {
  const tints = new Map<string, Tint>();
  if (q.type === 'case') {
    const ids = (q.reveal ?? []).filter((id) => engine.objects.has(id));
    if (!ids.length) return;
    engine.setIsolate(new Set([...skeletonOf(engine, q), ...ids]));
    ids.forEach((id) => tints.set(id, ok ? 'right' : 'target'));
    engine.setTint(tints);
    // fade the bones so that what lies behind them (the heart, a nerve under the clavicle) can be seen
    engine.setXray(true, new Set(ids));
    engine.frameIds(ids, { pad: 1.7 });
    return;
  }
  if (q.type !== 'landmark') q.ids.forEach((id) => tints.set(id, ok ? 'right' : 'target'));
  if (q.type === 'find' && !ok && pickedId) tints.set(pickedId, 'wrong');
  engine.setTint(tints);
  if (q.type === 'find' && !ok) {
    const focus = new Set(q.ids);
    for (const o of engine.objects.values()) if (o.layer === 'skeleton') focus.add(o.rec.id);
    engine.setXray(true, focus);
    engine.frameIds(q.ids, { pad: 1.8 });
  }
  if (q.type === 'lmBone' || q.type === 'lobe') pinLandmark(engine, q, false);
}
