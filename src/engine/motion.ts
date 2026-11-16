// Motion rig: joints moving and muscles visibly contracting on the separate Z-Anatomy meshes.
//
// Joint frames come from landmarks in db.landmarks (epicondyles, styloids, malleoli, heads), refined on
// the bone geometry: the humeral and femoral head centres by a sphere fit around the head landmark
// (backed off along its normal as the first guess), the elbow, knee and ankle axes pass through the
// centre of a circle fitted to the trochlea/capitulum, femoral condyles and talar dome, projected along
// the epicondylar/malleolar line. Frames are computed for the right side and mirrored for the left.
//
// Bones move rigidly (node matrices, chained: moving the elbow carries the radius and the hand).
// Soft tissue of the same limb (muscles, tendons, ligaments, capsules, fasciae, vessels, nerves, skin)
// bends in the vertex shader (organic.ts RIG_GLSL) with per-vertex joint weights worked out once per limb
// in rigWeights.ts: at the shoulder and hip from how close a vertex lies to the moving bones compared
// with the fixed ones, at the hinges from the joint planes. Trunk muscles that insert on the limb
// (latissimus dorsi, pectoralis major) also slide along their fibres toward the insertion, so the whole
// muscle lengthens. Structures outside the limb never move. Contracting muscles glow eosin and bulge;
// antagonists tint violet while lengthening.
import * as THREE from 'three';
import type { DB } from '../data/db';
import type { PackId } from '../data/types';
import { slug } from '../data/text';
import type { SObj } from './Engine';
import { makeRigDepthMaterial, type TissueMaterial } from './materials';
import { MUSCLES, MOVERS, LABEL, RANGE, START, START_ALSO, JOINT_MOVES, JOINT_KEYS, type Move } from './motionTable';
import { buildField, skin, type Cloud, type Field, type Hinge, type SkinPart } from './rigWeights';

export type JointId = 'shoulder' | 'elbow' | 'radioulnar' | 'wrist' | 'hip' | 'knee' | 'ankle' | 'subtalar';
export type MovementId =
  | 'flexion' | 'extension' | 'abduction' | 'adduction' | 'medial-rotation' | 'lateral-rotation'
  | 'pronation' | 'supination' | 'radial-deviation' | 'ulnar-deviation'
  | 'dorsiflexion' | 'plantarflexion' | 'inversion' | 'eversion';

export interface MotionClip {
  id: string;
  side: 'l' | 'r';
  moves: { joint: JointId; movement: MovementId; deg: number }[];
  muscles: string[];
  stretch: string[];
  label: { la: string; en: string; id: string };
  packs: PackId[];
}

const CYCLE = 2.6; // seconds per rest -> full -> rest at speed 1
const PRE = 0.55; // seconds to ease into a clip's start pose
const UPPER: JointId[] = ['shoulder', 'elbow', 'radioulnar', 'wrist'];
const LOWER: JointId[] = ['hip', 'knee', 'ankle', 'subtalar'];
const DOF_COUNT: Record<JointId, number> = { shoulder: 3, elbow: 1, radioulnar: 1, wrist: 2, hip: 3, knee: 1, ankle: 1, subtalar: 1 };
const DOF: Record<MovementId, [number, number]> = {
  flexion: [0, 1], extension: [0, -1], abduction: [1, 1], adduction: [1, -1], 'medial-rotation': [2, 1], 'lateral-rotation': [2, -1],
  pronation: [0, 1], supination: [0, -1], 'radial-deviation': [1, 1], 'ulnar-deviation': [1, -1],
  dorsiflexion: [0, 1], plantarflexion: [0, -1], inversion: [0, 1], eversion: [0, -1],
};
const TRUNK_TO_HUMERUS = /^(clavicular-head|sternocostal-head|abdominal-part)-of-pectoralis-major-muscle-[lr]$|^latissimus-dorsi-muscle-[lr]$/;
const HAND = /^(scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate)-bone-[lr]$|metacarpal-bone-[lr]$|-of-hand-[lr]$|sesamoid-bones-of-hand/;
const FOOT = /^(calcaneus|navicular-bone|cuboid-bone|(medial|intermediate|lateral)-cuneiform-bone)-[lr]$|metatarsal-bone-[lr]$|-of-foot-[lr]$|sesamoid-bones-of-foot/;

// ------------------------------------------------------------------ clips
let lastDB: DB | null = null;
const clipDB = new WeakMap<MotionClip, DB>();

function idsFor(db: DB, keys: string[], side: 'l' | 'r'): string[] {
  const out = new Set<string>();
  for (const k of keys)
    for (const id of db.idsForKey(k)) {
      const r = db.byId.get(id);
      if (r && r.pack !== 'attachments' && r.side === side) out.add(id);
    }
  return [...out];
}

function labelFor(moves: { joint: JointId; movement: MovementId }[]) {
  const ls = moves.map((m) => LABEL[`${m.joint}:${m.movement}`]);
  return { la: ls.map((l) => l.la).join(' et '), en: ls.map((l) => l.en).join(' and '), id: ls.map((l) => l.id).join(' dan ') };
}

function build(db: DB, id: string, side: 'l' | 'r', moves: Move[], muscles: string[], extraStretch: string[] = []): MotionClip {
  const full = moves.map((m) => ({ joint: m.joint, movement: m.movement, deg: m.deg ?? RANGE[m.joint][m.movement] ?? 30 }));
  const mus = new Set(muscles);
  const stretch = new Set<string>();
  for (const m of full) for (const s of idsFor(db, MOVERS[`${m.joint}:${m.movement}`]?.antagonists ?? [], side)) if (!mus.has(s)) stretch.add(s);
  for (const s of extraStretch) if (!mus.has(s)) stretch.add(s);
  const clip: MotionClip = { id, side, moves: full, muscles: [...mus], stretch: [...stretch], label: labelFor(full), packs: ['skeleton', 'muscles'] };
  clipDB.set(clip, db);
  return clip;
}

/** Clips for a muscle (or muscle part/group) or joint concept key; [] when the key has no clear action. */
export function clipsForKey(db: DB, key: string, side: 'l' | 'r'): MotionClip[] {
  lastDB = db;
  const joint = JOINT_KEYS[key];
  if (joint) return jointClips(db, side).filter((c) => c.moves[0].joint === joint);
  let k = key;
  let entry = MUSCLES[k];
  if (!entry) {
    const rec = db.byKey.get(key)?.[0];
    if (rec)
      for (let i = rec.path.length - 1; i >= 0 && !entry; i--) {
        const pk = slug(rec.path[i]);
        if (MUSCLES[pk]) {
          entry = MUSCLES[pk];
          k = pk;
        }
      }
  }
  if (!entry) return [];
  const muscles = idsFor(db, entry.parts ?? [k], side);
  if (!muscles.length) return [];
  return entry.clips.map((moves, i) => build(db, i === 0 ? `m:${k}-${side}` : `m:${k}:${moves[0].joint}-${moves[0].movement}-${side}`, side, moves, muscles));
}

/** Every movement of the eight joints, with prime movers contracting and antagonists lengthening. */
export function jointClips(db: DB, side: 'l' | 'r'): MotionClip[] {
  lastDB = db;
  const out: MotionClip[] = [];
  for (const j of [...UPPER, ...LOWER])
    for (const mv of JOINT_MOVES[j]) out.push(build(db, `${j}-${mv}-${side}`, side, [{ joint: j, movement: mv }], idsFor(db, MOVERS[`${j}:${mv}`]?.agonists ?? [], side)));
  return out;
}

// ------------------------------------------------------------------ geometry helpers
const V = (a: ArrayLike<number>) => new THREE.Vector3(a[0], a[1], a[2]);

function solve(A: number[][], b: number[]): number[] | null {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-14) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / r[i]);
}

function fitSphere(pts: THREE.Vector3[]): { c: THREE.Vector3; r: number } | null {
  if (pts.length < 12) return null;
  const A = [0, 1, 2, 3].map(() => [0, 0, 0, 0]);
  const b = [0, 0, 0, 0];
  for (const p of pts) {
    const row = [2 * p.x, 2 * p.y, 2 * p.z, 1];
    const rhs = p.lengthSq();
    for (let i = 0; i < 4; i++) {
      b[i] += row[i] * rhs;
      for (let j = 0; j < 4; j++) A[i][j] += row[i] * row[j];
    }
  }
  const s = solve(A, b);
  if (!s) return null;
  const c = new THREE.Vector3(s[0], s[1], s[2]);
  return { c, r: Math.sqrt(Math.max(0, s[3] + c.lengthSq())) };
}

function fitCircle(pts: THREE.Vector2[]): { c: THREE.Vector2; r: number } | null {
  if (pts.length < 10) return null;
  const A = [0, 1, 2].map(() => [0, 0, 0]);
  const b = [0, 0, 0];
  for (const p of pts) {
    const row = [2 * p.x, 2 * p.y, 1];
    const rhs = p.lengthSq();
    for (let i = 0; i < 3; i++) {
      b[i] += row[i] * rhs;
      for (let j = 0; j < 3; j++) A[i][j] += row[i] * row[j];
    }
  }
  const s = solve(A, b);
  if (!s) return null;
  const c = new THREE.Vector2(s[0], s[1]);
  return { c, r: Math.sqrt(Math.max(0, s[2] + c.lengthSq())) };
}

/** World-space rest vertices (and normals) of a structure. */
function restVerts(o: SObj, cb: (p: THREE.Vector3, n: THREE.Vector3) => void, kinds?: Set<string>) {
  const p = new THREE.Vector3(), n = new THREE.Vector3(), nm = new THREE.Matrix3(), m = new THREE.Matrix4();
  o.meshes.forEach((mesh, i) => {
    if (kinds && !kinds.has((o.mats[i] as TissueMaterial).userData.kind)) return;
    m.copy(o.restMatrix);
    if (mesh !== o.root) m.multiply(mesh.matrix);
    nm.getNormalMatrix(m);
    const g = mesh.geometry as THREE.BufferGeometry;
    const pa = g.getAttribute('position'), na = g.getAttribute('normal');
    const step = Math.max(1, Math.floor(pa.count / 12000));
    for (let k = 0; k < pa.count; k += step) {
      p.fromBufferAttribute(pa, k).applyMatrix4(m);
      if (na) n.fromBufferAttribute(na, k).applyMatrix3(nm).normalize();
      cb(p, n);
    }
  });
}

const FIELD_MARGIN = 0.14; // the distance fields reach this far past the bones the limb moves (m)
const FIELD_VOXELS = 1.1e6;

/** World-space rest positions (and unit normals) of one mesh of a structure, as plain arrays. */
function restArrays(o: SObj, mesh: THREE.Mesh, normals: boolean): { pos: Float32Array; nrm: Float32Array | null; index: ArrayLike<number> | null } {
  const m = new THREE.Matrix4().copy(o.restMatrix);
  if (mesh !== o.root) m.multiply(mesh.matrix);
  const g = mesh.geometry as THREE.BufferGeometry;
  const pa = g.getAttribute('position');
  const na = normals ? g.getAttribute('normal') : undefined;
  const n = pa.count, e = m.elements;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i);
    pos[i * 3] = e[0] * x + e[4] * y + e[8] * z + e[12];
    pos[i * 3 + 1] = e[1] * x + e[5] * y + e[9] * z + e[13];
    pos[i * 3 + 2] = e[2] * x + e[6] * y + e[10] * z + e[14];
  }
  let nrm: Float32Array | null = null;
  if (na) {
    const k = new THREE.Matrix3().getNormalMatrix(m).elements;
    nrm = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const x = na.getX(i), y = na.getY(i), z = na.getZ(i);
      const a = k[0] * x + k[3] * y + k[6] * z, b = k[1] * x + k[4] * y + k[7] * z, c = k[2] * x + k[5] * y + k[8] * z;
      const l = Math.hypot(a, b, c) || 1;
      nrm[i * 3] = a / l;
      nrm[i * 3 + 1] = b / l;
      nrm[i * 3 + 2] = c / l;
    }
  }
  return { pos, nrm, index: g.index ? (g.index.array as ArrayLike<number>) : null };
}

interface Frames {
  sh: THREE.Vector3; el: THREE.Vector3; eEl: THREE.Vector3; rh: THREE.Vector3; uh: THREE.Vector3; wr: THREE.Vector3; eWr: THREE.Vector3;
  hip: THREE.Vector3; kn: THREE.Vector3; eKn: THREE.Vector3; an: THREE.Vector3; eAn: THREE.Vector3; st: THREE.Vector3; aSt: THREE.Vector3;
}

function computeRightFrames(db: DB, objects: Map<string, SObj>): Frames | null {
  const lm = (k: string) => {
    const l = db.lmByKey.get(k)?.find((x) => x.side === 'r');
    return l ? { p: V(l.p), n: V(l.n).normalize() } : null;
  };
  const need = ['head-of-humerus', 'medial-epicondyle-of-humerus', 'lateral-epicondyle-of-humerus', 'head-of-radius', 'head-of-ulna', 'radial-styloid-process', 'ulnar-styloid-process', 'head-of-femur', 'medial-epicondyle-of-femur', 'lateral-epicondyle-of-femur', 'medial-malleolus', 'lateral-malleolus'];
  const L: Record<string, { p: THREE.Vector3; n: THREE.Vector3 }> = {};
  for (const k of need) {
    const x = lm(k);
    if (!x) return null;
    L[k] = x;
  }
  const posX = (v: THREE.Vector3) => (v.x < 0 ? v.negate() : v).normalize();

  const head = (boneId: string, l: { p: THREE.Vector3; n: THREE.Vector3 }, r0: number) => {
    let c = l.p.clone().addScaledVector(l.n, -r0);
    const o = objects.get(boneId);
    if (!o) return c;
    for (let it = 0; it < 3; it++) {
      const pts: THREE.Vector3[] = [];
      const d = new THREE.Vector3();
      restVerts(o, (p, n) => {
        d.subVectors(p, c);
        const len = d.length();
        if (len > r0 * 0.55 && len < r0 * 1.35 && n.dot(d) > 0.75 * len) pts.push(p.clone());
      });
      const f = fitSphere(pts);
      if (!f || f.r < 0.014 || f.r > 0.034 || f.c.distanceTo(c) > 0.015) break;
      c = f.c;
    }
    return c;
  };
  const hinge = (boneId: string, mid: THREE.Vector3, e: THREE.Vector3, down: THREE.Vector3, sel: (p: THREE.Vector3, n: THREE.Vector3) => boolean, rMin: number, rMax: number) => {
    const o = objects.get(boneId);
    if (!o) return mid.clone();
    const b1 = down.clone().sub(e.clone().multiplyScalar(down.dot(e))).normalize();
    const b2 = new THREE.Vector3().crossVectors(e, b1);
    const pts: THREE.Vector2[] = [];
    const d = new THREE.Vector3();
    restVerts(o, (p, n) => {
      if (Math.abs(n.dot(e)) > 0.45 || !sel(p, n)) return;
      d.subVectors(p, mid);
      pts.push(new THREE.Vector2(d.dot(b1), d.dot(b2)));
    });
    const f = fitCircle(pts);
    if (!f || f.r < rMin || f.r > rMax || f.c.length() > 0.03) return mid.clone();
    return mid.clone().addScaledVector(b1, f.c.x).addScaledVector(b2, f.c.y);
  };

  const sh = head('humerus-r', L['head-of-humerus'], 0.023);
  const eEl = posX(L['medial-epicondyle-of-humerus'].p.clone().sub(L['lateral-epicondyle-of-humerus'].p));
  const midEl = L['medial-epicondyle-of-humerus'].p.clone().add(L['lateral-epicondyle-of-humerus'].p).multiplyScalar(0.5);
  const uHum0 = midEl.clone().sub(sh).normalize();
  const el = hinge('humerus-r', midEl, eEl, uHum0, (p) => p.clone().sub(midEl).dot(uHum0) > 0.0 && p.distanceTo(midEl) < 0.032, 0.006, 0.03);
  const rh = L['head-of-radius'].p.clone().addScaledVector(L['head-of-radius'].n, -0.011);
  const uh = L['head-of-ulna'].p.clone().addScaledVector(L['head-of-ulna'].n, -0.008);
  const eWr = posX(L['radial-styloid-process'].p.clone().sub(L['ulnar-styloid-process'].p));
  const midWr = L['radial-styloid-process'].p.clone().add(L['ulnar-styloid-process'].p).multiplyScalar(0.5);
  const uFore0 = midWr.clone().sub(el).normalize();
  const wr = midWr.clone().addScaledVector(uFore0, 0.006);

  const hip = head('femur-r', L['head-of-femur'], 0.024);
  const eKn = posX(L['medial-epicondyle-of-femur'].p.clone().sub(L['lateral-epicondyle-of-femur'].p));
  const midKn = L['medial-epicondyle-of-femur'].p.clone().add(L['lateral-epicondyle-of-femur'].p).multiplyScalar(0.5);
  const uFem0 = midKn.clone().sub(hip).normalize();
  const kn = hinge('femur-r', midKn, eKn, uFem0, (p) => p.clone().sub(midKn).dot(uFem0) > 0.0 && p.distanceTo(midKn) < 0.045, 0.012, 0.04);
  const eAn = posX(L['medial-malleolus'].p.clone().sub(L['lateral-malleolus'].p));
  const midAn = L['medial-malleolus'].p.clone().add(L['lateral-malleolus'].p).multiplyScalar(0.5);
  const uTib0 = midAn.clone().sub(kn).normalize();
  const up = uTib0.clone().negate();
  const an = hinge('talus-r', midAn, eAn, uTib0, (p, n) => n.dot(up) > 0.55 && Math.hypot(p.x - midAn.x, p.z - midAn.z) < 0.028, 0.012, 0.035);
  const stA = lm('lateral-process-of-calcaneal-tuberosity')?.p ?? midAn.clone().add(new THREE.Vector3(-0.01, -0.06, -0.035));
  const stB = lm('neck-of-talus')?.p ?? midAn.clone().add(new THREE.Vector3(0.02, -0.015, 0.025));
  const aSt = stB.clone().sub(stA).normalize();
  const st = stA.clone().add(stB).multiplyScalar(0.5);
  return { sh, el, eEl, rh, uh, wr, eWr, hip, kn, eKn, an, eAn, st, aSt };
}

function mirrorFrames(f: Frames): Frames {
  const P = (v: THREE.Vector3) => new THREE.Vector3(-v.x, v.y, v.z);
  const A = (v: THREE.Vector3) => new THREE.Vector3(v.x, -v.y, -v.z); // mirrored hinge axis re-oriented to +x
  return { sh: P(f.sh), el: P(f.el), eEl: A(f.eEl), rh: P(f.rh), uh: P(f.uh), wr: P(f.wr), eWr: A(f.eWr), hip: P(f.hip), kn: P(f.kn), eKn: A(f.eKn), an: P(f.an), eAn: A(f.eAn), st: P(f.st), aSt: P(f.aSt) };
}

// ------------------------------------------------------------------ rig per limb and side
interface JointRig {
  pivot: THREE.Vector3;
  /** Hinges only: plane through the pivot that separates the two segments, its offset and blend half-width. */
  plane: THREE.Vector3;
  offset: number;
  band: number;
}

/** Per-vertex weights of one structure for one limb, ready to attach to its meshes. */
interface Skin {
  w: THREE.BufferAttribute[];
  pull: THREE.BufferAttribute[] | null;
  insertion: THREE.Vector3 | null;
  insertionW: number[];
}

interface Limb {
  side: 'l' | 'r';
  upper: boolean;
  L: number; // +1 left, -1 right (direction of lateral along x)
  joints: JointRig[];
  axes: Record<string, THREE.Vector3>;
  shared: { uJP: THREE.Vector4[]; uJA: THREE.Vector4[] };
}

function makeLimb(f: Frames, side: 'l' | 'r', upper: boolean): Limb {
  const L = side === 'r' ? -1 : 1;
  let joints: JointRig[];
  let axes: Record<string, THREE.Vector3>;
  if (upper) {
    const uHum = f.el.clone().sub(f.sh).normalize();
    const uFore = f.wr.clone().sub(f.el).normalize();
    const uRU = f.uh.clone().sub(f.rh).normalize();
    const mid = f.el.clone().add(f.wr).multiplyScalar(0.5);
    joints = [
      { pivot: f.sh, plane: uHum, offset: 0, band: 0.04 },
      { pivot: f.el, plane: uHum, offset: 0, band: 0.035 },
      { pivot: f.rh, plane: uFore, offset: mid.clone().sub(f.rh).dot(uFore), band: 0.42 * f.wr.distanceTo(f.el) },
      { pivot: f.wr, plane: uFore, offset: 0, band: 0.025 },
    ];
    axes = { long: uHum, eEl: f.eEl, uRU, eWr: f.eWr, ap: new THREE.Vector3().crossVectors(uFore, f.eWr).normalize() };
  } else {
    const uFem = f.kn.clone().sub(f.hip).normalize();
    const uTib = f.an.clone().sub(f.kn).normalize();
    joints = [
      { pivot: f.hip, plane: uFem, offset: 0, band: 0.045 },
      { pivot: f.kn, plane: uFem, offset: 0, band: 0.045 },
      { pivot: f.an, plane: uTib, offset: 0, band: 0.03 },
      { pivot: f.st, plane: uTib, offset: f.an.clone().sub(f.st).dot(uTib), band: 0.03 },
    ];
    axes = { long: uFem, eKn: f.eKn, eAn: f.eAn, aSt: f.aSt };
  }
  const v4 = () => [0, 1, 2, 3].map(() => new THREE.Vector4());
  const shared = { uJP: v4(), uJA: v4() };
  joints.forEach((j, i) => shared.uJP[i].set(j.pivot.x, j.pivot.y, j.pivot.z, 0));
  return { side, upper, L, joints, axes, shared };
}

type Pose = Record<JointId, number[]>;
const zeroPose = (): Pose => ({ shoulder: [0, 0, 0], elbow: [0], radioulnar: [0], wrist: [0, 0], hip: [0, 0, 0], knee: [0], ankle: [0], subtalar: [0] });
const D2R = Math.PI / 180;

/** Joint rotations (quaternions, rest frame) of a limb for a pose. */
function jointQuats(limb: Limb, pose: Pose): THREE.Quaternion[] {
  const q = (axis: THREE.Vector3, deg: number) => new THREE.Quaternion().setFromAxisAngle(axis, deg * D2R);
  const X = new THREE.Vector3(1, 0, 0), Z = new THREE.Vector3(0, 0, 1);
  const L = limb.L, a = limb.axes;
  if (limb.upper) {
    const [f, ab, r] = pose.shoulder;
    return [
      q(X, -f).multiply(q(Z, L * ab)).multiply(q(a.long, L * r)),
      q(a.eEl, -pose.elbow[0]),
      q(a.uRU, L * pose.radioulnar[0]),
      q(a.eWr, -pose.wrist[0]).multiply(q(a.ap, L * pose.wrist[1])),
    ];
  }
  const [f, ab, r] = pose.hip;
  return [q(X, -f).multiply(q(Z, L * ab)).multiply(q(a.long, L * r)), q(a.eKn, pose.knee[0]), q(a.eAn, -pose.ankle[0]), q(a.aSt, -L * pose.subtalar[0])];
}

function pivotMatrix(pivot: THREE.Vector3, q: THREE.Quaternion, out = new THREE.Matrix4()) {
  const t = new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z);
  const r = new THREE.Matrix4().makeRotationFromQuaternion(q);
  const ti = new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z);
  return out.copy(t).multiply(r).multiply(ti);
}

export interface MotionHost {
  objects: Map<string, SObj>;
  attachBoneMap(): Map<string, string>;
  invalidate(): void;
  setMotionActive(on: boolean): void;
  onPose(): void;
}

interface Belly {
  c: THREE.Vector3;
  a: THREE.Vector3;
  half: number;
}

// ------------------------------------------------------------------ player
export class Motion {
  private clip: MotionClip | null = null;
  private playing = false;
  private loopOn = true;
  private speed = 1;
  private t = 0;
  private phase: 'idle' | 'pre' | 'cycle' | 'stop' = 'idle';
  private preT = 0;
  private from: Pose = zeroPose();
  private to: Pose = zeroPose();
  private pose: Pose = zeroPose();
  private last = 0;
  private dirty = false;
  private frames = new Map<'l' | 'r', Frames>();
  private limbs = new Map<string, Limb>();
  private active: Limb | null = null;
  private bones: { o: SObj; w: number[] }[] = [];
  private soft: SObj[] = [];
  private pulled: { o: SObj; at: THREE.Vector3; w: number[] }[] = [];
  private fields = new Map<string, { distal: Field; proximal: Field }>();
  private skins = new Map<string, Map<string, Skin | null>>();
  private contract: SObj[] = [];
  private stretchSet: SObj[] = [];
  private bellies = new Map<string, Belly>();
  private boneM = new Map<string, THREE.Matrix4>();
  private tickL = new Set<() => void>();

  constructor(private host: MotionHost) {}

  // ---------------------------------------------------------------- public API (ENGINE_API.md)
  play(clip: MotionClip, opts: { loop?: boolean; speed?: number } = {}) {
    const db = clipDB.get(clip) ?? lastDB;
    if (opts.loop !== undefined) this.loopOn = opts.loop;
    if (opts.speed !== undefined) this.speed = Math.max(0.05, opts.speed);
    if (!db) return;
    const upper = UPPER.includes(clip.moves[0]?.joint);
    const limb = this.limb(db, clip.side, upper);
    if (!limb) return;
    this.unbindLooks();
    if (this.active && this.active !== limb) {
      // another limb was posed: put it back at rest at once
      this.pose = zeroPose();
      this.applyPose();
      this.unbindRig();
    }
    this.clip = clip;
    this.bind(limb, clip);
    this.from = this.clonePose(this.pose);
    this.to = this.clipPose(clip, 0);
    this.preT = 0;
    this.phase = 'pre';
    this.t = 0;
    this.playing = true;
    this.last = performance.now();
    this.host.setMotionActive(true);
    this.dirty = true;
    this.host.invalidate();
  }

  pause() {
    this.playing = false;
  }

  resume() {
    if (this.clip) {
      if (this.phase === 'cycle' && this.t >= 1 && !this.loopOn) this.t = 0;
      this.playing = true;
      this.last = performance.now();
      this.host.invalidate();
    }
  }

  stop() {
    if (!this.clip && this.phase === 'idle') return;
    this.clip = null;
    this.playing = false;
    this.from = this.clonePose(this.pose);
    this.to = zeroPose();
    this.preT = 0;
    this.phase = 'stop';
    this.last = performance.now();
    this.unbindLooks();
    this.dirty = true;
    this.host.invalidate();
  }

  scrub(t: number) {
    if (!this.clip) return;
    this.playing = false;
    this.phase = 'cycle';
    this.t = Math.max(0, Math.min(1, t));
    this.pose = this.clipPose(this.clip, this.progress());
    this.applyPose();
    this.fireTick();
    this.host.invalidate();
  }

  setSpeed(x: number) {
    this.speed = Math.max(0.05, x);
  }

  setLoop(on: boolean) {
    this.loopOn = on;
  }

  state(): { clip: MotionClip | null; t: number; playing: boolean; angles: number[] } {
    const p = this.phase === 'cycle' ? this.progress() : 0;
    return { clip: this.clip, t: this.t, playing: this.playing && !!this.clip, angles: this.clip ? this.clip.moves.map((m) => Math.round(m.deg * p * 10) / 10) : [] };
  }

  onTick(cb: () => void): () => void {
    this.tickL.add(cb);
    return () => this.tickL.delete(cb);
  }

  // ---------------------------------------------------------------- engine side
  /** True while a pose is applied (a clip is loaded or easing back). */
  get busy() {
    return this.phase !== 'idle';
  }

  /** True while the pose changes from frame to frame. */
  get animating() {
    return this.phase === 'pre' || this.phase === 'stop' || (this.phase === 'cycle' && this.playing);
  }

  /** Rigid motion of a bone (or of an origin/insertion patch on it), for landmarks and pins. */
  boneMatrix(id: string): THREE.Matrix4 | null {
    return this.boneM.get(id) ?? null;
  }

  /** Advance the clock; returns true when the pose changed and a frame is needed. */
  update(now: number): boolean {
    const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    if (this.phase === 'idle') return false;
    let changed = this.dirty;
    this.dirty = false;
    if (this.phase === 'pre') {
      this.preT = Math.min(1, this.preT + dt / PRE);
      this.pose = this.lerpPose(this.from, this.to, ease(this.preT));
      changed = true;
      if (this.preT >= 1) this.phase = 'cycle';
    } else if (this.phase === 'cycle' && this.clip) {
      if (this.playing) {
        this.t += (dt * this.speed) / CYCLE;
        if (this.t >= 1) {
          if (this.loopOn) this.t -= Math.floor(this.t);
          else {
            this.t = 1;
            this.playing = false;
          }
        }
        changed = true;
      }
      if (changed) this.pose = this.clipPose(this.clip, this.progress());
    } else if (this.phase === 'stop') {
      this.preT = Math.min(1, this.preT + dt / 0.6);
      this.pose = this.lerpPose(this.from, this.to, ease(this.preT));
      changed = true;
      if (this.preT >= 1) {
        this.applyPose();
        this.unbindRig();
        this.phase = 'idle';
        this.host.setMotionActive(false);
        this.host.onPose();
        return true;
      }
    }
    if (changed) this.applyPose();
    if (this.clip) this.fireTick();
    return changed;
  }

  // ---------------------------------------------------------------- internals
  private fireTick() {
    this.tickL.forEach((f) => f());
  }

  private progress() {
    return 0.5 - 0.5 * Math.cos(2 * Math.PI * this.t);
  }

  private clonePose(p: Pose): Pose {
    const o = zeroPose();
    for (const k of Object.keys(o) as JointId[]) o[k] = [...p[k]];
    return o;
  }

  private lerpPose(a: Pose, b: Pose, f: number): Pose {
    const o = zeroPose();
    for (const k of Object.keys(o) as JointId[]) o[k] = a[k].map((v, i) => v + (b[k][i] - v) * f);
    return o;
  }

  private clipPose(clip: MotionClip, p: number): Pose {
    const pose = zeroPose();
    for (const m of clip.moves) {
      const s = START[`${m.joint}:${m.movement}`];
      if (s) {
        const [i, sg] = DOF[s.movement];
        pose[m.joint][i] = sg * s.deg;
      }
    }
    // a single-joint clip may hold a neighbouring joint bent so the movement can be seen
    // (rotation of the shoulder or hip shows best with the elbow or knee at a right angle)
    if (clip.moves.length === 1) {
      const also = START_ALSO[`${clip.moves[0].joint}:${clip.moves[0].movement}`];
      if (also) {
        const [i, sg] = DOF[also.movement];
        pose[also.joint][i] = sg * also.deg;
      }
    }
    for (const m of clip.moves) {
      const [i, sg] = DOF[m.movement];
      if (i < DOF_COUNT[m.joint]) pose[m.joint][i] += sg * m.deg * p;
    }
    return pose;
  }

  private limb(db: DB, side: 'l' | 'r', upper: boolean): Limb | null {
    const key = side + (upper ? 'u' : 'd');
    let limb = this.limbs.get(key);
    if (limb) return limb;
    let fr = this.frames.get('r');
    if (!fr) {
      const f = computeRightFrames(db, this.host.objects);
      if (!f) return null;
      fr = f;
      this.frames.set('r', f);
      this.frames.set('l', mirrorFrames(f));
    }
    limb = makeLimb(side === 'r' ? fr : this.frames.get('l')!, side, upper);
    this.limbs.set(key, limb);
    return limb;
  }

  private bind(limb: Limb, clip: MotionClip) {
    const objs = this.host.objects;
    if (this.active !== limb) {
      this.unbindRig();
      this.active = limb;
      this.bones = [];
      this.bindRigid(limb);
      // soft tissue of this limb bends in the shader
      this.soft = [];
      this.pulled = [];
      this.bindSoft(limb);
    }
    // looks for this clip
    this.contract = clip.muscles.map((id) => objs.get(id)).filter((o): o is SObj => !!o);
    this.stretchSet = clip.stretch.map((id) => objs.get(id)).filter((o): o is SObj => !!o);
    for (const o of this.contract) {
      const b = this.belly(o);
      o.rig.uBulge.value.set(b.c.x, b.c.y, b.c.z, b.half);
      o.rig.uBulgeAxis.value.set(b.a.x, b.a.y, b.a.z, 0);
    }
  }

  /** A pack finished loading: let its structures join the limb that is posed. */
  packLoaded() {
    const limb = this.active;
    if (!limb) return;
    this.bindRigid(limb);
    this.bindSoft(limb);
    this.applyPose();
    this.host.invalidate();
  }

  /** Rigid parts of the limb and the weight each joint has on them. Adds only what is not bound yet. */
  private bindRigid(limb: Limb) {
    const objs = this.host.objects;
    const s = limb.side;
    const have = new Set(this.bones.map((b) => b.o));
    const add = (o: SObj | undefined, w: number[]) => {
      if (!o || have.has(o)) return;
      have.add(o);
      o.root.matrixAutoUpdate = false;
      this.bones.push({ o, w });
    };
    for (const o of objs.values()) {
      const id = o.rec.id;
      if (o.rec.pack !== 'skeleton' || o.rec.side !== s) continue;
      if (limb.upper) {
        if (id === `humerus-${s}`) add(o, [1, 0, 0, 0]);
        else if (id === `ulna-${s}`) add(o, [1, 1, 0, 0]);
        else if (id === `radius-${s}`) add(o, [1, 1, 1, 0]);
        else if (HAND.test(id)) add(o, [1, 1, 1, 1]);
      } else {
        if (id === `femur-${s}`) add(o, [1, 0, 0, 0]);
        else if (id === `patella-${s}`) add(o, [1, 0.7, 0, 0]);
        else if (id === `tibia-${s}` || id === `fibula-${s}`) add(o, [1, 1, 0, 0]);
        else if (id === `talus-${s}`) add(o, [1, 1, 1, 0]);
        else if (FOOT.test(id)) add(o, [1, 1, 1, 1]);
      }
    }
    // origin/insertion patches ride on their bone
    const boneW = new Map(this.bones.filter((b) => b.o.rec.pack === 'skeleton').map((b) => [b.o.rec.id, b.w]));
    for (const [att, bone] of this.host.attachBoneMap()) {
      const w = boneW.get(bone);
      if (w) add(objs.get(att), w);
    }
  }

  /** Soft tissue of the limb: who belongs, per-vertex weights, shader uniforms. Adds only what is not bound yet. */
  private bindSoft(limb: Limb) {
    const s = limb.side;
    const key = s + (limb.upper ? 'u' : 'd');
    const sh = limb.joints[0].pivot;
    const have = new Set(this.soft);
    let cache = this.skins.get(key);
    if (!cache) this.skins.set(key, (cache = new Map()));
    for (const o of this.host.objects.values()) {
      if (have.has(o)) continue;
      const r = o.rec;
      if (r.side !== s || r.pack === 'skeleton' || r.pack === 'attachments' || r.pack === 'viscera' || r.pack === 'lymphoid') continue;
      const path = r.path.join('|');
      let member = false;
      if (r.pack === 'muscles' || r.pack === 'skin') {
        member = limb.upper ? /upper limb/i.test(path) || TRUNK_TO_HUMERUS.test(r.id) : /lower limb/i.test(path);
      } else if (r.pack === 'joints') {
        member = limb.upper ? /free upper limb/i.test(path) : /free lower limb/i.test(path);
      } else {
        const c = o.center;
        // vessels and nerves have no limb grouping: lateral to the glenoid (arm) or below the hip joint (leg)
        member = limb.upper ? Math.abs(c.x) > Math.abs(sh.x) - 0.012 && c.y < sh.y + 0.03 && c.y > 0.5 : c.y < sh.y - 0.03 && Math.abs(c.x) > 0.02;
      }
      if (!member) continue;
      let sk = cache.get(r.id);
      if (sk === undefined) {
        sk = this.skinFor(limb, key, o);
        cache.set(r.id, sk);
      }
      if (!sk) continue; // no part of it follows this limb
      const rig = o.rig;
      rig.uJP.value = limb.shared.uJP;
      rig.uJA.value = limb.shared.uJA;
      rig.uPull.value.set(0, 0, 0);
      const weights = sk;
      o.meshes.forEach((mesh, i) => {
        const g = mesh.geometry as THREE.BufferGeometry;
        g.setAttribute('rigW', weights.w[i]);
        if (weights.pull) g.setAttribute('rigP', weights.pull[i]);
        if (!mesh.customDepthMaterial) mesh.customDepthMaterial = makeRigDepthMaterial(rig);
      });
      rig.uRigOn.value = 1;
      this.soft.push(o);
      if (sk.pull && sk.insertion) this.pulled.push({ o, at: sk.insertion, w: sk.insertionW });
    }
  }

  /** Distance fields to the bones this limb moves and to the bones that stay, built once per limb. */
  private fieldsFor(limb: Limb, key: string) {
    let F = this.fields.get(key);
    if (F) return F;
    const moving = new Set(this.bones.filter((b) => b.o.rec.pack === 'skeleton' && b.w[0] === 1).map((b) => b.o));
    const pv = limb.joints[0].pivot;
    const box = [pv.x - 0.2, pv.y - 0.2, pv.z - 0.2, pv.x + 0.2, pv.y + 0.2, pv.z + 0.2];
    const distal: Cloud[] = [];
    for (const o of moving) for (const mesh of o.meshes) distal.push(restArrays(o, mesh, false));
    for (const c of distal)
      for (let i = 0; i < c.pos.length; i += 3)
        for (let a = 0; a < 3; a++) {
          const v = c.pos[i + a];
          if (v < box[a]) box[a] = v;
          if (v > box[a + 3]) box[a + 3] = v;
        }
    for (let a = 0; a < 3; a++) {
      box[a] -= FIELD_MARGIN;
      box[a + 3] += FIELD_MARGIN;
    }
    const proximal: Cloud[] = [];
    for (const o of this.host.objects.values()) {
      if (o.rec.pack !== 'skeleton' || moving.has(o)) continue;
      const b = o.box;
      if (b.max.x < box[0] || b.min.x > box[3] || b.max.y < box[1] || b.min.y > box[4] || b.max.z < box[2] || b.min.z > box[5]) continue;
      for (const mesh of o.meshes) proximal.push(restArrays(o, mesh, false));
    }
    const voxel = Math.max(0.005, Math.cbrt(((box[3] - box[0]) * (box[4] - box[1]) * (box[5] - box[2])) / FIELD_VOXELS));
    F = { distal: buildField(distal, box, voxel), proximal: buildField(proximal, box, voxel) };
    this.fields.set(key, F);
    return F;
  }

  private skinFor(limb: Limb, key: string, o: SObj): Skin | null {
    const F = this.fieldsFor(limb, key);
    const hinges: Hinge[] = limb.joints.slice(1).map((j) => ({ px: j.pivot.x, py: j.pivot.y, pz: j.pivot.z, nx: j.plane.x, ny: j.plane.y, nz: j.plane.z, off: j.offset, band: j.band }));
    const parts: SkinPart[] = o.meshes.map((mesh, i) => ({ ...restArrays(o, mesh, true), core: (o.mats[i] as TissueMaterial).userData.kind === 'muscle' }));
    const res = skin(parts, F.distal, F.proximal, hinges, o.rec.pack === 'muscles');
    if (!res.moved) return null;
    return {
      w: res.w.map((a) => new THREE.BufferAttribute(a, 4, true)),
      pull: res.pull ? res.pull.map((a) => new THREE.BufferAttribute(a, 4, true)) : null,
      insertion: res.insertion ? new THREE.Vector3(res.insertion[0], res.insertion[1], res.insertion[2]) : null,
      insertionW: res.insertionW,
    };
  }

  private belly(o: SObj): Belly {
    const hit = this.bellies.get(o.rec.id);
    if (hit) return hit;
    const pts: THREE.Vector3[] = [];
    const kinds = new Set(['muscle', 'myocardium']);
    restVerts(o, (p) => pts.push(p.clone()), kinds);
    if (pts.length < 8) restVerts(o, (p) => pts.push(p.clone()));
    const c = new THREE.Vector3();
    for (const p of pts) c.add(p);
    c.divideScalar(Math.max(1, pts.length));
    let xx = 0, xy = 0, xz = 0, yy = 0, yz = 0, zz = 0;
    for (const p of pts) {
      const x = p.x - c.x, y = p.y - c.y, z = p.z - c.z;
      xx += x * x; xy += x * y; xz += x * z; yy += y * y; yz += y * z; zz += z * z;
    }
    const a = new THREE.Vector3(0.2, 1, 0.1).normalize();
    const t = new THREE.Vector3();
    for (let k = 0; k < 32; k++) {
      t.set(xx * a.x + xy * a.y + xz * a.z, xy * a.x + yy * a.y + yz * a.z, xz * a.x + yz * a.y + zz * a.z);
      if (t.lengthSq() < 1e-24) break;
      a.copy(t.normalize());
    }
    let lo = Infinity, hi = -Infinity;
    for (const p of pts) {
      const d = t.subVectors(p, c).dot(a);
      lo = Math.min(lo, d);
      hi = Math.max(hi, d);
    }
    c.addScaledVector(a, (lo + hi) / 2);
    const b = { c, a, half: Math.max(0.01, (hi - lo) / 2) };
    this.bellies.set(o.rec.id, b);
    return b;
  }

  private applyPose() {
    const limb = this.active;
    if (!limb) return;
    const qs = jointQuats(limb, this.pose);
    const axis = new THREE.Vector3();
    qs.forEach((q, i) => {
      const w = Math.max(-1, Math.min(1, q.w));
      const ang = 2 * Math.acos(w);
      const sn = Math.sqrt(Math.max(0, 1 - w * w));
      if (sn < 1e-6) axis.set(1, 0, 0);
      else axis.set(q.x / sn, q.y / sn, q.z / sn);
      limb.shared.uJA[i].set(axis.x, axis.y, axis.z, ang > Math.PI ? ang - 2 * Math.PI : ang);
    });
    // rigid bones: chained rotations, proximal first in the product (distal applied first to points)
    this.boneM.clear();
    const m = new THREE.Matrix4(), part = new THREE.Matrix4(), qq = new THREE.Quaternion(), id = new THREE.Quaternion();
    for (const b of this.bones) {
      m.identity();
      for (let j = 0; j < 4; j++) {
        if (!b.w[j]) continue;
        qq.copy(id).slerp(qs[j], b.w[j]);
        m.multiply(pivotMatrix(limb.joints[j].pivot, qq, part));
      }
      b.o.root.matrix.multiplyMatrices(m, b.o.restMatrix);
      b.o.root.matrixWorldNeedsUpdate = true;
      b.o.root.updateMatrixWorld(true);
      this.boneM.set(b.o.rec.id, m.clone());
    }
    // trunk muscles that insert on the limb: tell the shader where their insertion has gone
    for (const pl of this.pulled) {
      m.identity();
      for (let j = 0; j < 4; j++) {
        if (!pl.w[j]) continue;
        qq.copy(id).slerp(qs[j], pl.w[j]);
        m.multiply(pivotMatrix(limb.joints[j].pivot, qq, part));
      }
      pl.o.rig.uPull.value.copy(pl.at).applyMatrix4(m).sub(pl.at);
    }
    // contraction looks: activation follows the joint excursion; the belly works hardest while shortening
    const p = this.phase === 'cycle' ? this.progress() : this.phase === 'pre' ? 0 : 0;
    const concentric = this.t < 0.5;
    const glow = this.clip ? (concentric ? 0.28 + 0.72 * p : 0.18 + 0.62 * p) : 0;
    for (const o of this.contract) {
      o.rig.uBulgeAxis.value.w = 0.17 * p;
      o.rig.uShorten.value = (concentric ? 0.09 : 0.06) * p;
      for (const mt of o.mats) (mt as TissueMaterial).userData.org.uContract.value = glow;
    }
    for (const o of this.stretchSet) for (const mt of o.mats) (mt as TissueMaterial).userData.org.uStretch.value = this.clip ? 0.25 + 0.75 * p : 0;
    this.host.onPose();
  }

  private unbindLooks() {
    for (const o of this.contract) {
      o.rig.uBulgeAxis.value.w = 0;
      o.rig.uShorten.value = 0;
      for (const mt of o.mats) (mt as TissueMaterial).userData.org.uContract.value = 0;
    }
    for (const o of this.stretchSet) for (const mt of o.mats) (mt as TissueMaterial).userData.org.uStretch.value = 0;
    this.contract = [];
    this.stretchSet = [];
  }

  private unbindRig() {
    for (const o of this.soft) {
      o.rig.uRigOn.value = 0;
      o.rig.uPull.value.set(0, 0, 0);
    }
    this.pulled = [];
    for (const b of this.bones) {
      b.o.root.matrix.copy(b.o.restMatrix);
      b.o.root.matrix.decompose(b.o.root.position, b.o.root.quaternion, b.o.root.scale);
      b.o.root.matrixAutoUpdate = true;
      b.o.root.updateMatrixWorld(true);
    }
    this.soft = [];
    this.bones = [];
    this.boneM.clear();
    this.active = null;
  }
}

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
