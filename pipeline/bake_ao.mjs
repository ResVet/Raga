#!/usr/bin/env node
// Bake per-vertex ambient occlusion into a Raga model pack (.glb).
//
//   node pipeline/bake_ao.mjs <in.glb> <out.glb> [--dist 0.03] [--rays 40] [--threads 2] [--smooth 2]
//                            [--method auto|filter|quantize] [--materials raw-export.glb]
//
// All meshes of the pack are put into one bounding volume hierarchy in world space. Every vertex
// then casts cosine-weighted rays over its normal hemisphere; a hit closer than --dist (metres)
// occludes with a linear falloff. The result is smoothed once or twice over the mesh topology and
// stored as a normalized uint8 vertex attribute `_AO` (three.js reads it as `_ao`), then the file is
// written back with meshopt compression. Translucent sheets (capsules, fasciae, bursae, tendon
// sheaths, peritoneum) receive AO but do not occlude, otherwise everything they wrap turns black.
//
// Module resolution: three and three-mesh-bvh come from the app (raga/node_modules); gltf-transform
// and meshoptimizer come from the model tools folder (RAGA_TOOLS, default ../../tools/node_modules
// next to the app), the same place pipeline/optimize.mjs runs from.
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXCLUDE = new Set(['capsule', 'fascia', 'bursa', 'peritoneum']);

// ------------------------------------------------------------------ worker: cast rays
if (!isMainThread) {
  const { bvhData, posShared, idxShared, vtx, out, start, end, rays, dist, seed } = workerData;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(posShared), 3));
  geo.setIndex(new THREE.BufferAttribute(new Uint32Array(idxShared), 1));
  const bvh = MeshBVH.deserialize(bvhData, geo, { setIndex: false });
  const V = new Float32Array(vtx);
  const O = new Float32Array(out);
  const dirs = hemisphere(rays);
  const ray = new THREE.Ray();
  const t = new THREE.Vector3(), b = new THREE.Vector3(), n = new THREE.Vector3(), p = new THREE.Vector3();
  const eps = 1.2e-4;
  let last = performance.now();
  for (let i = start; i < end; i++) {
    const o = i * 6;
    p.set(V[o], V[o + 1], V[o + 2]);
    n.set(V[o + 3], V[o + 4], V[o + 5]);
    if (n.lengthSq() < 0.5) {
      O[i] = 1;
      continue;
    }
    // tangent frame, randomly rotated about the normal so neighbouring vertices use different rays
    if (Math.abs(n.x) < 0.9) t.set(1, 0, 0);
    else t.set(0, 1, 0);
    t.sub(n.clone().multiplyScalar(t.dot(n))).normalize();
    b.crossVectors(n, t);
    const ang = hash(i + seed) * Math.PI * 2;
    const ca = Math.cos(ang), sa = Math.sin(ang);
    let occ = 0;
    for (let k = 0; k < dirs.length; k += 3) {
      const lx = dirs[k] * ca - dirs[k + 1] * sa;
      const ly = dirs[k] * sa + dirs[k + 1] * ca;
      const lz = dirs[k + 2];
      ray.direction.set(t.x * lx + b.x * ly + n.x * lz, t.y * lx + b.y * ly + n.y * lz, t.z * lx + b.z * ly + n.z * lz);
      ray.origin.copy(p).addScaledVector(n, eps);
      const hit = bvh.raycastFirst(ray, THREE.DoubleSide, 0, dist);
      if (hit) occ += 1 - hit.distance / dist;
    }
    O[i] = 1 - occ / rays;
    if ((i & 8191) === 0 && performance.now() - last > 5000) {
      last = performance.now();
      parentPort.postMessage({ progress: (i - start) / (end - start) });
    }
  }
  parentPort.postMessage({ done: true });
}

function hemisphere(k) {
  // cosine-weighted Hammersley points on the +z hemisphere
  const out = new Float32Array(k * 3);
  for (let i = 0; i < k; i++) {
    const u1 = (i + 0.5) / k;
    let bits = i, inv = 0, f = 0.5;
    while (bits) {
      if (bits & 1) inv += f;
      bits >>= 1;
      f *= 0.5;
    }
    const r = Math.sqrt(u1), phi = 2 * Math.PI * inv;
    out[i * 3] = r * Math.cos(phi);
    out[i * 3 + 1] = r * Math.sin(phi);
    out[i * 3 + 2] = Math.sqrt(Math.max(0, 1 - u1));
  }
  return out;
}

function hash(i) {
  let x = (i ^ 61) ^ (i >>> 16);
  x = Math.imul(x, 9);
  x ^= x >>> 4;
  x = Math.imul(x, 0x27d4eb2d);
  x ^= x >>> 15;
  return (x >>> 0) / 4294967296;
}

// ------------------------------------------------------------------ main
async function main() {
  const args = process.argv.slice(2);
  const opt = (name, def) => {
    const i = args.indexOf('--' + name);
    if (i < 0) return def;
    const v = args[i + 1];
    args.splice(i, 2);
    return v;
  };
  const dist = parseFloat(opt('dist', '0.03'));
  const rays = parseInt(opt('rays', '40'), 10);
  const threads = parseInt(opt('threads', String(Math.max(1, Math.min(4, os.cpus().length)))), 10);
  const smoothIter = parseInt(opt('smooth', '2'), 10);
  const methodArg = opt('method', 'auto');
  const matSrc = opt('materials', '');
  const [input, output] = args;
  if (!input || !output) {
    console.error('usage: node bake_ao.mjs <in.glb> <out.glb> [--dist m] [--rays n] [--threads n] [--smooth n]');
    process.exit(2);
  }
  const tools = process.env.RAGA_TOOLS ?? path.resolve(HERE, '../../tools');
  const req = createRequire(path.join(tools, 'package.json'));
  const load = async (name) => import(pathToFileURL(req.resolve(name)).href);
  const { NodeIO } = await load('@gltf-transform/core');
  const { ALL_EXTENSIONS, EXTMeshoptCompression } = await load('@gltf-transform/extensions');
  const { MeshoptDecoder, MeshoptEncoder } = await load('meshoptimizer');
  await MeshoptDecoder.ready;
  await MeshoptEncoder.ready;
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
  const t0 = performance.now();
  const doc = await io.read(input);
  const root = doc.getRoot();

  // Restore per-primitive tissue names from the raw export: older optimiser runs let dedup() merge
  // every material of a pack into one, so all vessels were called "ligament", all nerves "fascia".
  if (matSrc) {
    const raw = await io.read(matSrc);
    const names = new Map();
    for (const m of raw.getRoot().listMeshes()) names.set(m.getName(), m.listPrimitives().map((p) => p.getMaterial()?.getName() ?? 'organ'));
    const byName = new Map(root.listMaterials().map((m) => [m.getName(), m]));
    const proto = root.listMaterials()[0];
    const matFor = (n) => {
      let m = byName.get(n);
      if (!m) {
        m = proto ? proto.clone().setName(n) : doc.createMaterial(n);
        byName.set(n, m);
      }
      return m;
    };
    let fixed = 0, missing = 0;
    for (const m of root.listMeshes()) {
      const list = names.get(m.getName());
      const prims = m.listPrimitives();
      if (!list || list.length !== prims.length) {
        missing++;
        continue;
      }
      prims.forEach((p, i) => {
        if (p.getMaterial()?.getName() !== list[i]) fixed++;
        p.setMaterial(matFor(list[i]));
      });
    }
    for (const m of root.listMaterials()) if (!m.listParents().some((p) => p.propertyType === 'Primitive')) m.dispose();
    console.log(`materials restored from ${path.basename(matSrc)}: ${fixed} primitives renamed, ${missing} meshes unmatched`);
  }

  // vertex sets keyed by POSITION accessor (primitives of one mesh may share vertices)
  const sets = new Map();
  const tmp = [0, 0, 0];
  const m4 = new THREE.Matrix4(), nm = new THREE.Matrix3(), v = new THREE.Vector3();
  for (const node of root.listNodes()) {
    const mesh = node.getMesh();
    if (!mesh) continue;
    m4.fromArray(node.getWorldMatrix());
    nm.getNormalMatrix(m4);
    for (const prim of mesh.listPrimitives()) {
      const pa = prim.getAttribute('POSITION');
      const na = prim.getAttribute('NORMAL');
      if (!pa) continue;
      let s = sets.get(pa);
      if (!s) {
        const n = pa.getCount();
        const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          pa.getElement(i, tmp);
          v.set(tmp[0], tmp[1], tmp[2]).applyMatrix4(m4);
          pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
          if (na) {
            na.getElement(i, tmp);
            v.set(tmp[0], tmp[1], tmp[2]).applyMatrix3(nm).normalize();
            nor[i * 3] = v.x; nor[i * 3 + 1] = v.y; nor[i * 3 + 2] = v.z;
          }
        }
        s = { pa, pos, nor, prims: [], offset: 0, ao: null };
        sets.set(pa, s);
      }
      s.prims.push(prim);
    }
  }
  const list = [...sets.values()];
  let nv = 0;
  for (const s of list) {
    s.offset = nv;
    nv += s.pa.getCount();
  }

  // occluder geometry
  let nOccIdx = 0;
  for (const s of list) for (const prim of s.prims) if (!EXCLUDE.has(prim.getMaterial()?.getName() ?? '')) nOccIdx += prim.getIndices()?.getCount() ?? 0;
  const posShared = new SharedArrayBuffer(nv * 3 * 4);
  const P = new Float32Array(posShared);
  const vtxShared = new SharedArrayBuffer(nv * 6 * 4);
  const VX = new Float32Array(vtxShared);
  for (const s of list) {
    P.set(s.pos, s.offset * 3);
    const n = s.pa.getCount();
    for (let i = 0; i < n; i++) {
      const o = (s.offset + i) * 6;
      VX[o] = s.pos[i * 3]; VX[o + 1] = s.pos[i * 3 + 1]; VX[o + 2] = s.pos[i * 3 + 2];
      VX[o + 3] = s.nor[i * 3]; VX[o + 4] = s.nor[i * 3 + 1]; VX[o + 5] = s.nor[i * 3 + 2];
    }
  }
  const idxShared = new SharedArrayBuffer(Math.max(3, nOccIdx) * 4);
  const I = new Uint32Array(idxShared);
  let w = 0;
  for (const s of list)
    for (const prim of s.prims) {
      if (EXCLUDE.has(prim.getMaterial()?.getName() ?? '')) continue;
      const ia = prim.getIndices();
      if (!ia) continue;
      const arr = ia.getArray();
      for (let i = 0; i < arr.length; i++) I[w++] = arr[i] + s.offset;
    }
  if (nOccIdx === 0) I.fill(0);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(P, 3));
  geo.setIndex(new THREE.BufferAttribute(I, 1));
  const bvh = new MeshBVH(geo, { maxLeafTris: 8, useSharedArrayBuffer: true });
  const bvhData = MeshBVH.serialize(bvh, { cloneBuffers: false });
  console.log(`${path.basename(input)}: ${nv} vertices, ${nOccIdx / 3} occluder triangles, BVH ${((performance.now() - t0) / 1000).toFixed(1)} s`);

  // cast rays in workers
  const outShared = new SharedArrayBuffer(nv * 4);
  const AO = new Float32Array(outShared);
  const chunk = Math.ceil(nv / threads);
  const progress = new Array(threads).fill(0);
  let lastLog = 0;
  await Promise.all(
    Array.from({ length: threads }, (_, k) =>
      new Promise((resolve, reject) => {
        const wk = new Worker(fileURLToPath(import.meta.url), {
          workerData: { bvhData, posShared, idxShared, vtx: vtxShared, out: outShared, start: k * chunk, end: Math.min(nv, (k + 1) * chunk), rays, dist, seed: 17 },
        });
        wk.on('message', (m) => {
          if (m.progress !== undefined) {
            progress[k] = m.progress;
            const now = performance.now();
            if (now - lastLog > 15000) {
              lastLog = now;
              console.log(`  ${(100 * progress.reduce((a, b) => a + b, 0) / threads).toFixed(0)}%`);
            }
          }
          if (m.done) resolve();
        });
        wk.on('error', reject);
        wk.on('exit', (c) => (c ? reject(new Error('worker exit ' + c)) : resolve()));
      }),
    ),
  );

  // smooth over the topology and store
  const buffer = root.listBuffers()[0];
  let sum = 0;
  for (const s of list) {
    const n = s.pa.getCount();
    let ao = AO.slice(s.offset, s.offset + n);
    for (let it = 0; it < smoothIter; it++) {
      const acc = new Float32Array(n), cnt = new Float32Array(n);
      for (const prim of s.prims) {
        const ia = prim.getIndices();
        if (!ia) continue;
        const arr = ia.getArray();
        for (let i = 0; i < arr.length; i += 3) {
          const a = arr[i], b = arr[i + 1], c = arr[i + 2];
          acc[a] += ao[b] + ao[c]; cnt[a] += 2;
          acc[b] += ao[a] + ao[c]; cnt[b] += 2;
          acc[c] += ao[a] + ao[b]; cnt[c] += 2;
        }
      }
      const nx = new Float32Array(n);
      for (let i = 0; i < n; i++) nx[i] = cnt[i] ? 0.5 * ao[i] + 0.5 * (acc[i] / cnt[i]) : ao[i];
      ao = nx;
    }
    const u8 = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      const a = Math.min(1, Math.max(0, ao[i]));
      u8[i] = Math.round(a * 255);
      sum += a;
    }
    const acc = doc.createAccessor().setType('SCALAR').setArray(u8).setNormalized(true).setBuffer(buffer);
    for (const prim of s.prims) {
      const old = prim.getAttribute('_AO');
      prim.setAttribute('_AO', acc);
      if (old && old !== acc && old.listParents().length <= 1) old.dispose();
    }
  }
  // keep the input's precision: 8-bit normals were written with meshopt filters (high, lite),
  // 16-bit normals with plain quantization (ultra)
  let method = methodArg;
  if (method === 'auto') {
    const n0 = list.find((s) => s.prims[0].getAttribute('NORMAL'))?.prims[0].getAttribute('NORMAL');
    method = n0 && n0.getComponentType() === 5120 ? 'filter' : 'quantize';
  }
  const ext = root.listExtensionsUsed().find((e) => e.extensionName === 'EXT_meshopt_compression') ?? doc.createExtension(EXTMeshoptCompression);
  ext.setRequired(true).setEncoderOptions({ method: method === 'filter' ? EXTMeshoptCompression.EncoderMethod.FILTER : EXTMeshoptCompression.EncoderMethod.QUANTIZE });
  fs.writeFileSync(output, await io.writeBinary(doc));
  console.log(
    `${path.basename(output)}: mean AO ${(sum / Math.max(1, nv)).toFixed(3)}, ${((performance.now() - t0) / 1000).toFixed(1)} s, ${(fs.statSync(output).size / 1048576).toFixed(2)} MB`,
  );
}

if (isMainThread) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
