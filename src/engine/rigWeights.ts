// Skin weights for the motion rig, worked out once per limb from the geometry alone.
//
// Shoulder and hip. A vertex follows the limb by how close it lies to the bones that move (humerus and
// below, femur and below) compared with the bones that stay (trunk and girdle). Both distances come from
// voxel distance fields, so the weight is smooth and needs no hand-made list of muscles: the belly of
// latissimus dorsi rests on the ribs and stays there, its tendon lies on the humerus and goes with it.
//
// Muscles whose bulk stays on the trunk but which insert on the limb (latissimus dorsi, pectoralis major,
// the short rotators of the hip) also get a pull: every vertex slides along its own fibre toward the
// insertion by a share of how far the insertion has moved, so the whole muscle lengthens or shortens
// instead of only its last few centimetres. The fibre direction is laid flat on the muscle surface, which
// keeps a sheet of muscle on the chest wall while it stretches.
//
// Elbow, knee, wrist and the other hinges keep a plane weight, limited to tissue that already follows the
// joint above. Nothing here depends on three.js; the motion player feeds it plain arrays.

export interface Cloud {
  pos: Float32Array;
  index: ArrayLike<number> | null;
}

/** Distance to the nearest surface sample, in millimetres, capped at 255. */
export interface Field {
  nx: number;
  ny: number;
  nz: number;
  ox: number;
  oy: number;
  oz: number;
  voxel: number;
  d: Uint8Array;
}

export interface Hinge {
  px: number;
  py: number;
  pz: number;
  nx: number;
  ny: number;
  nz: number;
  off: number;
  band: number;
}

export interface SkinPart {
  /** World-space rest positions, xyz per vertex. */
  pos: Float32Array;
  /** World-space unit normals, xyz per vertex (optional, used to lay fibres flat). */
  nrm: Float32Array | null;
}

export interface SkinResult {
  /** Four joint weights per vertex, 0..255, one array per part. */
  w: Uint8Array[];
  /** Pull per vertex: fibre direction scaled by sqrt(share) in xyz, straight share in w; null without a pull. */
  pull: Int16Array[] | null;
  /** Rest position of the insertion the pull follows, and the joint weights at that point. */
  insertion: [number, number, number] | null;
  insertionW: [number, number, number, number];
  /** False when no vertex follows any joint. */
  moved: boolean;
  /** T: bulk on the trunk, L: bulk on the limb, N: in between or not a muscle. */
  cls: 'T' | 'L' | 'N';
}

const FAR = 0.255;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// One pass of the Felzenszwalb and Huttenlocher squared distance transform.
function edt1d(f: Float32Array, n: number, d: Float32Array, v: Int32Array, z: Float32Array) {
  let k = 0;
  v[0] = 0;
  z[0] = -Infinity;
  z[1] = Infinity;
  for (let q = 1; q < n; q++) {
    let s = 0;
    for (;;) {
      const p = v[k];
      s = (f[q] + q * q - (f[p] + p * p)) / (2 * q - 2 * p);
      if (s > z[k] || k === 0) break;
      k--;
    }
    if (s <= z[k]) {
      // q beats every parabola kept so far
      k = 0;
      v[0] = q;
      z[0] = -Infinity;
      z[1] = Infinity;
      continue;
    }
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = Infinity;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    const p = v[k];
    d[q] = (q - p) * (q - p) + f[p];
  }
}

/** Voxel distance field of a set of surfaces inside `box` = [minx, miny, minz, maxx, maxy, maxz]. */
export function buildField(clouds: Cloud[], box: ArrayLike<number>, voxel: number): Field {
  const nx = Math.max(2, Math.ceil((box[3] - box[0]) / voxel) + 1);
  const ny = Math.max(2, Math.ceil((box[4] - box[1]) / voxel) + 1);
  const nz = Math.max(2, Math.ceil((box[5] - box[2]) / voxel) + 1);
  const INF = 1e12;
  const g = new Float32Array(nx * ny * nz).fill(INF);
  const ox = box[0], oy = box[1], oz = box[2];
  const mark = (x: number, y: number, z: number) => {
    const ix = Math.round((x - ox) / voxel), iy = Math.round((y - oy) / voxel), iz = Math.round((z - oz) / voxel);
    if (ix < 0 || iy < 0 || iz < 0 || ix >= nx || iy >= ny || iz >= nz) return;
    g[(iz * ny + iy) * nx + ix] = 0;
  };
  for (const c of clouds) {
    const p = c.pos;
    for (let i = 0; i < p.length; i += 3) mark(p[i], p[i + 1], p[i + 2]);
    const idx = c.index;
    if (!idx) continue;
    // large triangles would leave holes between their corners: sample their inside too
    for (let t = 0; t + 2 < idx.length; t += 3) {
      const a = idx[t] * 3, b = idx[t + 1] * 3, cc = idx[t + 2] * 3;
      const ax = p[a], ay = p[a + 1], az = p[a + 2];
      const ux = p[b] - ax, uy = p[b + 1] - ay, uz = p[b + 2] - az;
      const wx = p[cc] - ax, wy = p[cc + 1] - ay, wz = p[cc + 2] - az;
      const e = Math.max(Math.hypot(ux, uy, uz), Math.hypot(wx, wy, wz), Math.hypot(ux - wx, uy - wy, uz - wz));
      const m = Math.min(12, Math.ceil(e / voxel));
      if (m < 2) continue;
      for (let i = 0; i <= m; i++)
        for (let j = 0; j <= m - i; j++) {
          const s = i / m, r = j / m;
          mark(ax + ux * s + wx * r, ay + uy * s + wy * r, az + uz * s + wz * r);
        }
    }
  }
  const L = Math.max(nx, ny, nz);
  const f = new Float32Array(L), d = new Float32Array(L), v = new Int32Array(L), z = new Float32Array(L + 1);
  for (let k = 0; k < nz; k++)
    for (let j = 0; j < ny; j++) {
      const o = (k * ny + j) * nx;
      for (let i = 0; i < nx; i++) f[i] = g[o + i];
      edt1d(f, nx, d, v, z);
      for (let i = 0; i < nx; i++) g[o + i] = d[i];
    }
  for (let k = 0; k < nz; k++)
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) f[j] = g[(k * ny + j) * nx + i];
      edt1d(f, ny, d, v, z);
      for (let j = 0; j < ny; j++) g[(k * ny + j) * nx + i] = d[j];
    }
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      for (let k = 0; k < nz; k++) f[k] = g[(k * ny + j) * nx + i];
      edt1d(f, nz, d, v, z);
      for (let k = 0; k < nz; k++) g[(k * ny + j) * nx + i] = d[k];
    }
  const out = new Uint8Array(nx * ny * nz);
  for (let i = 0; i < out.length; i++) out[i] = Math.min(255, Math.round(Math.sqrt(g[i]) * voxel * 1000));
  return { nx, ny, nz, ox, oy, oz, voxel, d: out };
}

/** Distance in metres at a point (trilinear); 0.255 outside the grid. */
export function sampleField(F: Field, x: number, y: number, z: number): number {
  const fx = (x - F.ox) / F.voxel, fy = (y - F.oy) / F.voxel, fz = (z - F.oz) / F.voxel;
  if (fx < 0 || fy < 0 || fz < 0 || fx > F.nx - 1 || fy > F.ny - 1 || fz > F.nz - 1) return FAR;
  const ix = Math.min(F.nx - 2, fx | 0), iy = Math.min(F.ny - 2, fy | 0), iz = Math.min(F.nz - 2, fz | 0);
  const tx = fx - ix, ty = fy - iy, tz = fz - iz;
  const d = F.d, sy = F.nx, sz = F.nx * F.ny, o = (iz * F.ny + iy) * F.nx + ix;
  const c00 = d[o] * (1 - tx) + d[o + 1] * tx;
  const c10 = d[o + sy] * (1 - tx) + d[o + sy + 1] * tx;
  const c01 = d[o + sz] * (1 - tx) + d[o + sz + 1] * tx;
  const c11 = d[o + sz + sy] * (1 - tx) + d[o + sz + sy + 1] * tx;
  return ((c00 * (1 - ty) + c10 * ty) * (1 - tz) + (c01 * (1 - ty) + c11 * ty) * tz) / 1000;
}

// Thresholds on rho = dProximal / (dProximal + dDistal), by where the bulk of the structure lies.
const BAND = { T: [0.45, 0.85], N: [0.3, 0.7], L: [0.12, 0.45] } as const;
const FAR0 = 0.12, FAR1 = 0.16; // nothing farther than this from the moving bones follows them
const GAMMA = 1.3; // how the pull falls off from the insertion to the origin
const TIP0 = 0.55, TIP1 = 0.95; // share of the fibre, counted from the origin, where the pull turns into a plain carry
const BINS = 72;

/**
 * Joint weights (and the pull, for trunk muscles that insert on the limb) for one structure.
 * `hinges` are the joints after the first one, in chain order.
 */
export function skin(parts: SkinPart[], distal: Field, proximal: Field, hinges: Hinge[], muscle: boolean): SkinResult {
  // how far along the way from the fixed bones to the moving bones each vertex lies
  const rho: Float32Array[] = [], far: Float32Array[] = [];
  const sampleRho: number[] = [];
  for (const p of parts) {
    const n = p.pos.length / 3;
    const r = new Float32Array(n), fd = new Float32Array(n);
    const step = Math.max(1, Math.floor(n / 400));
    for (let i = 0; i < n; i++) {
      const x = p.pos[i * 3], y = p.pos[i * 3 + 1], z = p.pos[i * 3 + 2];
      const dD = sampleField(distal, x, y, z), dP = sampleField(proximal, x, y, z);
      r[i] = dP / (dP + dD + 1e-5);
      fd[i] = 1 - smooth(FAR0, FAR1, dD);
      if (i % step === 0) sampleRho.push(r[i]);
    }
    rho.push(r);
    far.push(fd);
  }
  sampleRho.sort((a, b) => a - b);
  const median = sampleRho.length ? sampleRho[sampleRho.length >> 1] : 0;
  const cls: SkinResult['cls'] = !muscle ? 'N' : median < 0.3 ? 'T' : median > 0.7 ? 'L' : 'N';
  const [lo, hi] = BAND[cls];

  const w: Uint8Array[] = [];
  const h0: Float32Array[] = [];
  let moved = false;
  parts.forEach((p, k) => {
    const n = p.pos.length / 3;
    const out = new Uint8Array(n * 4), h = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let v = smooth(lo, hi, rho[k][i]) * far[k][i];
      h[i] = v;
      out[i * 4] = Math.round(v * 255);
      if (out[i * 4] > 0) moved = true;
      const x = p.pos[i * 3], y = p.pos[i * 3 + 1], z = p.pos[i * 3 + 2];
      for (let j = 0; j < hinges.length && j < 3; j++) {
        const q = hinges[j];
        v *= smooth(-q.band, q.band, (x - q.px) * q.nx + (y - q.py) * q.ny + (z - q.pz) * q.nz - q.off);
        out[i * 4 + 1 + j] = Math.round(v * 255);
      }
    }
    w.push(out);
    h0.push(h);
  });

  const res: SkinResult = { w, pull: null, insertion: null, insertionW: [1, 0, 0, 0], moved, cls };
  if (cls !== 'T' || !moved) return res;

  // the insertion: where the muscle is carried by the limb
  let sx = 0, sy = 0, sz = 0, sw = 0, count = 0, total = 0;
  let cx = 0, cy = 0, cz = 0;
  parts.forEach((p, k) => {
    const h = h0[k];
    for (let i = 0; i < h.length; i++) {
      const x = p.pos[i * 3], y = p.pos[i * 3 + 1], z = p.pos[i * 3 + 2];
      cx += x; cy += y; cz += z; total++;
      if (h[i] < 0.8) continue;
      sx += x * h[i]; sy += y * h[i]; sz += z * h[i]; sw += h[i]; count++;
    }
  });
  if (count < 3 || total < 8) return res;
  const I: [number, number, number] = [sx / sw, sy / sw, sz / sw];
  cx /= total; cy /= total; cz /= total;
  const iw: [number, number, number, number] = [1, 0, 0, 0];
  for (let j = 0; j < hinges.length && j < 3; j++) {
    const q = hinges[j];
    iw[j + 1] = iw[j] * smooth(-q.band, q.band, (I[0] - q.px) * q.nx + (I[1] - q.py) * q.ny + (I[2] - q.pz) * q.nz - q.off);
  }

  // the plane the muscle lies in (two largest principal axes), to measure direction around the insertion
  let xx = 0, xy = 0, xz = 0, yy = 0, yz = 0, zz = 0;
  for (const p of parts)
    for (let i = 0; i < p.pos.length; i += 3) {
      const x = p.pos[i] - cx, y = p.pos[i + 1] - cy, z = p.pos[i + 2] - cz;
      xx += x * x; xy += x * y; xz += x * z; yy += y * y; yz += y * z; zz += z * z;
    }
  const power = (v: number[]) => {
    for (let k = 0; k < 40; k++) {
      const a = xx * v[0] + xy * v[1] + xz * v[2], b = xy * v[0] + yy * v[1] + yz * v[2], c = xz * v[0] + yz * v[1] + zz * v[2];
      const n = Math.hypot(a, b, c);
      if (n < 1e-20) break;
      v = [a / n, b / n, c / n];
    }
    return v;
  };
  const e1 = power([0.3, 1, 0.2]);
  const l1 = e1[0] * (xx * e1[0] + xy * e1[1] + xz * e1[2]) + e1[1] * (xy * e1[0] + yy * e1[1] + yz * e1[2]) + e1[2] * (xz * e1[0] + yz * e1[1] + zz * e1[2]);
  xx -= l1 * e1[0] * e1[0]; xy -= l1 * e1[0] * e1[1]; xz -= l1 * e1[0] * e1[2];
  yy -= l1 * e1[1] * e1[1]; yz -= l1 * e1[1] * e1[2]; zz -= l1 * e1[2] * e1[2];
  let e2 = power([1, 0.2, 0.3]);
  const dd = e2[0] * e1[0] + e2[1] * e1[1] + e2[2] * e1[2];
  e2 = [e2[0] - dd * e1[0], e2[1] - dd * e1[1], e2[2] - dd * e1[2]];
  const n2 = Math.hypot(e2[0], e2[1], e2[2]) || 1;
  e2 = [e2[0] / n2, e2[1] / n2, e2[2] / n2];
  const angle = (dx: number, dy: number, dz: number) => ((Math.atan2(dx * e2[0] + dy * e2[1] + dz * e2[2], dx * e1[0] + dy * e1[1] + dz * e1[2]) + Math.PI) / (2 * Math.PI)) * BINS;

  // fibre length in each direction: the far edge of the muscle seen from the insertion is its origin
  const bins = new Float32Array(BINS);
  for (const p of parts)
    for (let i = 0; i < p.pos.length; i += 3) {
      const dx = p.pos[i] - I[0], dy = p.pos[i + 1] - I[1], dz = p.pos[i + 2] - I[2];
      const s = Math.hypot(dx, dy, dz);
      const b = Math.min(BINS - 1, Math.floor(angle(dx, dy, dz)));
      if (s > bins[b]) bins[b] = s;
    }
  for (let pass = 0; pass < BINS; pass++) {
    let changed = false;
    for (let b = 0; b < BINS; b++)
      if (bins[b] === 0) {
        const m = Math.max(bins[(b + 1) % BINS], bins[(b + BINS - 1) % BINS]);
        if (m > 0) {
          bins[b] = m;
          changed = true;
        }
      }
    if (!changed) break;
  }
  let cur = new Float32Array(BINS);
  for (let b = 0; b < BINS; b++) cur[b] = Math.max(bins[b], bins[(b + 1) % BINS], bins[(b + BINS - 1) % BINS]);
  for (let it = 0; it < 3; it++) {
    const nx = new Float32Array(BINS);
    for (let b = 0; b < BINS; b++) nx[b] = 0.25 * cur[(b + BINS - 1) % BINS] + 0.5 * cur[b] + 0.25 * cur[(b + 1) % BINS];
    cur = nx;
  }
  const lengthAt = (dx: number, dy: number, dz: number) => {
    const a = angle(dx, dy, dz) - 0.5, b0 = Math.floor(a), t = a - b0;
    return cur[((b0 % BINS) + BINS) % BINS] * (1 - t) + cur[(((b0 + 1) % BINS) + BINS) % BINS] * t;
  };

  const pull: Int16Array[] = [];
  parts.forEach((p, k) => {
    const h = h0[k], n = h.length;
    const out = new Int16Array(n * 4);
    for (let i = 0; i < n; i++) {
      const dx = p.pos[i * 3] - I[0], dy = p.pos[i * 3 + 1] - I[1], dz = p.pos[i * 3 + 2] - I[2];
      const s = Math.hypot(dx, dy, dz);
      const u = Math.max(0, 1 - s / Math.max(0.02, lengthAt(dx, dy, dz)));
      const g = Math.pow(u, GAMMA) * (1 - h[i]);
      if (g < 0.001) continue;
      let fx = -dx / (s + 1e-9), fy = -dy / (s + 1e-9), fz = -dz / (s + 1e-9);
      if (p.nrm) {
        const nx = p.nrm[i * 3], ny = p.nrm[i * 3 + 1], nz = p.nrm[i * 3 + 2];
        const d = fx * nx + fy * ny + fz * nz;
        const tx = fx - d * nx, ty = fy - d * ny, tz = fz - d * nz;
        const tl = Math.hypot(tx, ty, tz);
        if (tl > 0.2) {
          fx = tx / tl; fy = ty / tl; fz = tz / tl;
        }
      }
      const tip = smooth(TIP0, TIP1, u);
      const along = Math.sqrt(g * (1 - tip));
      out[i * 4] = Math.round(fx * along * 32767);
      out[i * 4 + 1] = Math.round(fy * along * 32767);
      out[i * 4 + 2] = Math.round(fz * along * 32767);
      out[i * 4 + 3] = Math.round(g * tip * 32767);
    }
    pull.push(out);
  });
  res.pull = pull;
  res.insertion = I;
  res.insertionW = iw;
  return res;
}
