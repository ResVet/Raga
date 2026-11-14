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

function pinLandmark(engine: Engine, q: Question) {
  const l = q.landmark;
  if (!l) return;
  const pnt = engine.worldPointOn(l.on, new THREE.Vector3(...l.p));
  const n = new THREE.Vector3(...l.n);
  const bone = engine.objects.get(l.on);
  const out = bone ? pnt.clone().sub(bone.center).normalize() : n.clone();
  const dir = n.clone().multiplyScalar(0.65).add(out.multiplyScalar(0.35)).normalize();
  const dist = Math.max(0.15, (bone?.radius ?? 0.1) * 1.3);
  engine.setPin(pnt, dir, '#ff5d8f', Math.min(1.4, Math.max(0.4, dist / 0.3)));
  engine.framePoint(pnt, dir, dist);
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
  engine.setSide(q.type === 'find' || q.type === 'case' ? 'both' : (q.side ?? 'both'));
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
    pinLandmark(engine, q);
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
  engine.frameBox(box, { dir, pad });
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
    engine.frameIds(ids, { pad: 1.8 });
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
  if (q.type === 'lmBone' || q.type === 'lobe') pinLandmark(engine, q);
}
