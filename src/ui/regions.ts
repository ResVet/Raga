import * as THREE from 'three';
import type { Engine } from '../engine/Engine';
import { REGIONS, type RegionId } from '../engine/layers';

const cache = new Map<string, THREE.Box3[]>();

/** Boxes that make up a region: each defining bone (or heart part) padded a little. */
export function regionBoxes(engine: Engine, id: RegionId): THREE.Box3[] {
  const key = id + ':' + engine.objects.size;
  const hit = cache.get(key);
  if (hit) return hit;
  const def = REGIONS.find((r) => r.id === id);
  if (!def) return [];
  const out: THREE.Box3[] = [];
  const pad = def.pad ?? 0.03;
  for (const o of engine.objects.values()) {
    const use = id === 'heart' ? o.layer === 'heart' : def.bones ? o.rec.pack === 'skeleton' && def.bones.test(o.rec.id) : false;
    if (use) out.push(o.box.clone().expandByScalar(pad));
  }
  cache.set(key, out);
  return out;
}

/** One box around the whole region (used for camera framing). */
export function regionBox(engine: Engine, id: RegionId): THREE.Box3 | null {
  const boxes = regionBoxes(engine, id);
  if (!boxes.length) return null;
  const b = new THREE.Box3();
  boxes.forEach((x) => b.union(x));
  return b;
}

export function inRegion(engine: Engine, id: string, region: RegionId): boolean {
  const o = engine.objects.get(id);
  if (!o) return false;
  const def = REGIONS.find((r) => r.id === region);
  if (def?.path && o.rec.path.some((p) => def.path!.test(p))) return true;
  return regionBoxes(engine, region).some((b) => b.containsPoint(o.center));
}

/** Ids of loaded structures that belong to a region. */
export function idsInRegion(engine: Engine, region: RegionId): string[] {
  const out: string[] = [];
  for (const o of engine.objects.values()) if (o.layer !== 'attachments' && inRegion(engine, o.rec.id, region)) out.push(o.rec.id);
  return out;
}
