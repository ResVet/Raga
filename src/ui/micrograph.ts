import * as THREE from 'three';
import type { Engine } from '../engine/Engine';

// The backdrop behind the specimen: an out-of-focus H&E micrograph. Eosin stains the cytoplasm and
// the connective strands pink, hematoxylin stains the nuclei violet, and the lumens stay empty. It is
// kept dark so the body and the glass panels read clearly in front of it.

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type RGB = [number, number, number];
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;

function blob(g: CanvasRenderingContext2D, x: number, y: number, r: number, c: RGB, a: number, soft = 0.5) {
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, rgba(c, a));
  gr.addColorStop(soft, rgba(c, a * 0.62));
  gr.addColorStop(1, rgba(c, 0));
  g.fillStyle = gr;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}

function ellipse(g: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, rot: number, c: RGB, a: number) {
  g.save();
  g.translate(x, y);
  g.rotate(rot);
  g.scale(1, ry / rx);
  blob(g, 0, 0, rx, c, a, 0.7);
  g.restore();
}

/** Draw the micrograph into a new canvas of the given size. */
export function makeMicrograph(w: number, h: number, seed = 1918): HTMLCanvasElement {
  const out = document.createElement('canvas');
  out.width = w;
  out.height = h;
  const g = out.getContext('2d');
  if (!g) return out;
  const R = rng(seed);

  // Tissue is drawn at a third of the size and scaled up, which already softens it like a defocused lens.
  const k = 3;
  const tw = Math.ceil(w / k), th = Math.ceil(h / k);
  const t = document.createElement('canvas');
  t.width = tw;
  t.height = th;
  const tg = t.getContext('2d')!;
  const S = Math.max(tw, th) / 360;

  tg.fillStyle = '#110c29';
  tg.fillRect(0, 0, tw, th);

  // Lobules: a low-frequency density field. Cells crowd where it is high; lumens open where it is low.
  const lobes = Array.from({ length: 7 }, () => ({ x: R() * tw, y: R() * th, r: (70 + R() * 80) * S, w: 0.55 + R() * 0.6 }));
  const holes = Array.from({ length: 8 }, () => ({ x: R() * tw, y: R() * th, r: (16 + R() * 30) * S }));
  const density = (x: number, y: number) => {
    let d = 0.18;
    for (const l of lobes) d += l.w * Math.exp(-((x - l.x) ** 2 + (y - l.y) ** 2) / (2 * l.r * l.r));
    for (const hl of holes) d *= 1 - 0.95 * Math.exp(-((x - hl.x) ** 2 + (y - hl.y) ** 2) / (2 * hl.r * hl.r));
    return Math.min(1, d);
  };

  const eosin: RGB[] = [[204, 72, 140], [184, 60, 132], [222, 96, 150], [168, 52, 122]];
  const hema: RGB[] = [[112, 86, 242], [96, 72, 222], [132, 104, 250]];

  // connective strands between the lobules, laid down as soft beads so they never look ruled
  for (let i = 0; i < 9; i++) {
    const x0 = R() * tw, y0 = R() * th;
    const a = R() * Math.PI * 2;
    const len = (90 + R() * 150) * S;
    const bend = (R() - 0.5) * 2.2;
    const c = eosin[i % eosin.length];
    const n = Math.round(len / (2.2 * S));
    for (let j = 0; j <= n; j++) {
      const u = j / n;
      const ang = a + bend * (u - 0.5);
      const x = x0 + Math.cos(ang) * len * u + Math.sin(u * 9 + i) * 3 * S;
      const y = y0 + Math.sin(ang) * len * u + Math.cos(u * 7 + i) * 3 * S;
      blob(tg, x, y, (2.6 + R() * 2.4) * S, c, 0.07 + R() * 0.06);
    }
  }

  // cells on a jittered grid: pink cytoplasm with a violet nucleus off centre
  const step = 14.5 * S;
  for (let y = -step; y < th + step; y += step * 0.87) {
    const row = Math.round(y / step);
    for (let x = -step + (row % 2) * step * 0.5; x < tw + step; x += step) {
      const cx = x + (R() - 0.5) * step * 0.7, cy = y + (R() - 0.5) * step * 0.7;
      const d = density(cx, cy);
      if (d < 0.3 || R() > 0.3 + d) continue;
      const c = eosin[Math.floor(R() * eosin.length)];
      blob(tg, cx, cy, step * (0.6 + R() * 0.28), c, 0.14 + d * 0.3);
      if (R() < 0.72) {
        const nc = hema[Math.floor(R() * hema.length)];
        const nr = (2.1 + R() * 1.5) * S;
        ellipse(tg, cx + (R() - 0.5) * 4 * S, cy + (R() - 0.5) * 4 * S, nr, nr * (0.6 + R() * 0.35), R() * Math.PI, nc, 0.34 + d * 0.4);
      }
    }
  }

  // a small vessel cut across: eosin wall, empty lumen, a few red cells
  for (let i = 0; i < 2; i++) {
    const vx = R() * tw, vy = R() * th, vr = (9 + R() * 8) * S;
    tg.strokeStyle = rgba([214, 84, 146], 0.42);
    tg.lineWidth = 2.4 * S;
    tg.beginPath();
    tg.ellipse(vx, vy, vr, vr * 0.72, R() * Math.PI, 0, Math.PI * 2);
    tg.stroke();
    blob(tg, vx, vy, vr * 0.8, [17, 12, 41], 0.9, 0.8);
    for (let j = 0; j < 5; j++) blob(tg, vx + (R() - 0.5) * vr, vy + (R() - 0.5) * vr * 0.6, 1.6 * S, [236, 104, 150], 0.55);
    for (let j = 0; j < 4; j++) {
      const a = (j / 4) * Math.PI * 2 + R();
      ellipse(tg, vx + Math.cos(a) * vr, vy + Math.sin(a) * vr * 0.72, 2.6 * S, 1 * S, a + Math.PI / 2, hema[0], 0.8);
    }
  }

  // staining is never even across a slide: pinker on one side, more violet on the other
  const sg = tg.createLinearGradient(0, 0, tw, th);
  sg.addColorStop(0, 'rgba(222,86,150,0.10)');
  sg.addColorStop(0.55, 'rgba(160,70,170,0.03)');
  sg.addColorStop(1, 'rgba(104,84,236,0.09)');
  tg.fillStyle = sg;
  tg.fillRect(0, 0, tw, th);

  // out-of-focus bokeh from cells in another plane
  for (let i = 0; i < 16; i++) blob(tg, R() * tw, R() * th, (12 + R() * 26) * S, R() < 0.6 ? [214, 90, 156] : [120, 96, 246], 0.05 + R() * 0.06, 0.3);

  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = 'high';
  const canFilter = typeof (g as { filter?: string }).filter === 'string';
  if (canFilter) g.filter = `blur(${Math.max(3, Math.round(w / 190))}px)`;
  g.drawImage(t, 0, 0, w, h);
  if (canFilter) g.filter = 'none';

  // darken the edges and the whole field so the specimen and the glass stay legible in front of it
  const v = g.createRadialGradient(w * 0.5, h * 0.44, Math.min(w, h) * 0.1, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
  v.addColorStop(0, 'rgba(15,12,36,0.10)');
  v.addColorStop(1, 'rgba(9,7,24,0.78)');
  g.fillStyle = v;
  g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(15,12,36,0.30)';
  g.fillRect(0, 0, w, h);
  return out;
}

/** Size of the backdrop texture for this screen (it is soft, so it does not need full resolution). */
export function micrographSize() {
  const vw = Math.max(320, window.innerWidth), vh = Math.max(320, window.innerHeight);
  const s = 1100 / Math.max(vw, vh);
  return { w: Math.round(vw * s), h: Math.round(vh * s) };
}

// The engine may ship its own micrograph (src/engine/backdrop.ts). When it does, the loading screen uses the
// same image so the body fades in from exactly what will sit behind it. The glob keeps the build independent.
type BackdropModule = { makeMicrographCanvas?: (w?: number, h?: number) => HTMLCanvasElement };
const engineBackdrop = Object.values(import.meta.glob<BackdropModule>('../engine/backdrop.ts', { eager: true }))[0];

export function backdropCanvas(w: number, h: number): HTMLCanvasElement {
  const f = engineBackdrop?.makeMicrographCanvas;
  if (typeof f === 'function') {
    try {
      return f(w, h);
    } catch {
      /* fall back to the interface's own drawing */
    }
  }
  return makeMicrograph(w, h);
}

/** Replace only the engine's old green drape (a 512 px canvas); an engine with its own backdrop is left alone. */
export function applyBackdrop(engine: Engine, canvas: HTMLCanvasElement) {
  const bg = engine.scene.background as THREE.Texture | null;
  const img = bg && bg.isTexture ? (bg.image as { width?: number; height?: number } | undefined) : undefined;
  if (!img || img.width !== 512 || img.height !== 512) return false;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  engine.scene.background = tex;
  bg!.dispose();
  engine.invalidate();
  return true;
}
