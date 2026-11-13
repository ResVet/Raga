// Skin weights of the motion rig on a made-up limb: a fixed plate (the trunk), a rod that moves (the arm bone)
// and a sheet of muscle that runs from one to the other, the way latissimus dorsi does.
const { buildField, sampleField, skin } = await import('../.cache/app.mjs');

let failed = 0;
const check = (ok, msg) => {
  console.log(ok ? 'ok  ' : 'FAIL', msg);
  if (!ok) failed++;
};

const pts = (list) => ({ pos: new Float32Array(list.flat()), index: null });
const plate = [];
for (let x = -0.15; x <= 0.0501; x += 0.01) for (let y = -0.4; y <= 0.1001; y += 0.01) plate.push([x, y, 0]);
const rod = [];
for (let y = -0.35; y <= 0.0001; y += 0.005) rod.push([0.25, y, 0]);
const box = [-0.3, -0.5, -0.2, 0.4, 0.2, 0.2];
const proximal = buildField([pts(plate)], box, 0.01);
const distal = buildField([pts(rod)], box, 0.01);

check(sampleField(distal, 0.25, -0.2, 0) < 0.012, 'the field is near zero on the bone');
check(Math.abs(sampleField(distal, 0.15, -0.2, 0) - 0.1) < 0.015, 'the field measures the distance to the bone');
check(sampleField(distal, 5, 5, 5) >= 0.25, 'far outside the box counts as far away');

const cols = 36, rows = 11;
const sheet = [], normals = [];
for (let r = 0; r < rows; r++)
  for (let c = 0; c < cols; c++) {
    sheet.push([-0.1 + (0.35 * c) / (cols - 1), -0.3 + (0.2 * r) / (rows - 1), 0.03]);
    normals.push([0, 0, 1]);
  }
const part = { pos: new Float32Array(sheet.flat()), nrm: new Float32Array(normals.flat()), core: true };
const hinge = { px: 0.25, py: -0.2, pz: 0, nx: 0, ny: -1, nz: 0, off: 0, band: 0.03 };
const res = skin([part], distal, proximal, [hinge], true);
const w = res.w[0];
const at = (r, c) => (r * cols + c) * 4;

check(res.cls === 'T', 'a muscle that lies mostly on the trunk is classed as a trunk muscle');
check(res.moved, 'part of the muscle follows the limb');
check(w[at(5, 0)] === 0, 'the end on the trunk stays put');
check(w[at(5, cols - 1)] === 255, 'the end on the moving bone follows it fully');
let rising = true;
for (let r = 0; r < rows; r++) for (let c = 1; c < cols; c++) if (w[at(r, c)] < w[at(r, c - 1)]) rising = false;
check(rising, 'the weight never falls on the way from the trunk to the limb');
let hingeOk = true;
for (let i = 0; i < rows * cols; i++) if (w[i * 4 + 1] > w[i * 4]) hingeOk = false;
check(hingeOk, 'a joint further down never moves a vertex more than the joint above it');
check(w[at(0, cols - 1) + 1] > 200 && w[at(rows - 1, cols - 1) + 1] < 60, 'the hinge weight changes across its plane');

check(!!res.pull && !!res.insertion, 'a trunk muscle gets a pull toward its insertion');
if (res.pull && res.insertion) {
  check(res.insertion[0] > 0.18, 'the insertion lies at the limb end of the muscle');
  const p = res.pull[0];
  const mid = at(5, 20);
  check(p[mid] > 0 && Math.abs(p[mid + 2]) < 200, 'the pull runs along the sheet toward the insertion, not out of it');
  const share = (i) => (p[i] * p[i] + p[i + 1] * p[i + 1] + p[i + 2] * p[i + 2]) / (32767 * 32767) + p[i + 3] / 32767;
  check(share(at(5, 1)) < share(at(5, 20)), 'the pull is weaker near the origin');
}

const loose = skin([{ pos: part.pos, nrm: null }], distal, proximal, [], false);
check(loose.cls === 'N' && loose.pull === null, 'anything that is not a muscle gets plain weights and no pull');

console.log(failed ? `${failed} failing` : 'all passing');
process.exit(failed ? 1 : 0);
