import * as THREE from 'three';

/**
 * Out-of-focus H&E micrograph drawn procedurally: deep hematoxylin base, soft eosin clouds,
 * violet nuclei as bokeh discs and a vignette. Kept dark so ivory bone and red muscle stand out.
 * Deterministic (seeded), drawn once.
 */
export function makeMicrographCanvas(w = 1600, h = 1000): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const g = cv.getContext('2d')!;
  let seed = 20261108;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  g.fillStyle = '#0f0c24';
  g.fillRect(0, 0, w, h);

  const blob = (x: number, y: number, r: number, color: string, a: number) => {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, color.replace('A', String(a)));
    gr.addColorStop(0.55, color.replace('A', String(a * 0.45)));
    gr.addColorStop(1, color.replace('A', '0'));
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  };
  // stroma: broad eosin fields and hematoxylin-rich patches
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 26; i++) blob(rnd() * w, rnd() * h, 160 + rnd() * 360, 'rgba(255,93,143,A)', 0.035 + rnd() * 0.05);
  for (let i = 0; i < 14; i++) blob(rnd() * w, rnd() * h, 140 + rnd() * 300, 'rgba(150,40,110,A)', 0.04 + rnd() * 0.05);
  for (let i = 0; i < 18; i++) blob(rnd() * w, rnd() * h, 120 + rnd() * 260, 'rgba(70,52,170,A)', 0.05 + rnd() * 0.06);
  // cells: small pink cytoplasm puffs
  for (let i = 0; i < 260; i++) blob(rnd() * w, rnd() * h, 18 + rnd() * 46, 'rgba(255,120,170,A)', 0.02 + rnd() * 0.035);
  // nuclei as bokeh: soft discs with a faintly brighter rim, larger ones more out of focus
  for (let i = 0; i < 190; i++) {
    const x = rnd() * w, y = rnd() * h;
    const r = 5 + Math.pow(rnd(), 2.2) * 42;
    const a = (0.05 + rnd() * 0.12) * (r > 25 ? 0.6 : 1);
    const gr = g.createRadialGradient(x, y, r * 0.2, x, y, r);
    gr.addColorStop(0, `rgba(110,92,255,${a * 0.55})`);
    gr.addColorStop(0.78, `rgba(123,108,255,${a * 0.8})`);
    gr.addColorStop(0.9, `rgba(150,136,255,${a})`);
    gr.addColorStop(1, 'rgba(123,108,255,0)');
    g.fillStyle = gr;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  g.globalCompositeOperation = 'source-over';
  // defocus everything a little more (where the 2D filter is supported)
  try {
    const tmp = document.createElement('canvas');
    tmp.width = w;
    tmp.height = h;
    const t = tmp.getContext('2d')!;
    t.drawImage(cv, 0, 0);
    g.filter = 'blur(7px)';
    g.drawImage(tmp, 0, 0);
    g.filter = 'none';
  } catch {
    /* no canvas filter support: the discs are soft already */
  }
  // keep the centre (where the specimen sits) calm and dark, vignette the edges
  const v = g.createRadialGradient(w * 0.5, h * 0.48, h * 0.18, w * 0.5, h * 0.5, Math.hypot(w, h) * 0.56);
  v.addColorStop(0, 'rgba(10,8,26,0.42)');
  v.addColorStop(0.45, 'rgba(10,8,26,0.18)');
  v.addColorStop(1, 'rgba(4,3,14,0.88)');
  g.fillStyle = v;
  g.fillRect(0, 0, w, h);
  // film grain against banding
  const img = g.getImageData(0, 0, w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rnd() - 0.5) * 3;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  return cv;
}

export function makeMicrographTexture(): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(makeMicrographCanvas());
  t.colorSpace = THREE.SRGBColorSpace;
  t.minFilter = THREE.LinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return t;
}

/** UV scale/offset that makes a w x h texture cover a viewport of aspect `aspect` (like CSS cover). */
export function coverRect(texAspect: number, aspect: number): THREE.Vector4 {
  if (aspect > texAspect) {
    const s = texAspect / aspect;
    return new THREE.Vector4(1, s, 0, (1 - s) / 2);
  }
  const s = aspect / texAspect;
  return new THREE.Vector4(s, 1, (1 - s) / 2, 0);
}

/** Full-screen backdrop for the tier without post-processing (drawn first, not tone mapped). */
export function makeBackdropMesh(tex: THREE.Texture): THREE.Mesh {
  const mat = new THREE.ShaderMaterial({
    uniforms: { tBg: { value: tex }, uRect: { value: new THREE.Vector4(1, 1, 0, 0) } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }`,
    fragmentShader: /* glsl */ `uniform sampler2D tBg; uniform vec4 uRect; varying vec2 vUv;
      void main(){ gl_FragColor = texture2D(tBg, vUv * uRect.xy + uRect.zw);
      #include <colorspace_fragment>
      }`,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  m.frustumCulled = false;
  m.renderOrder = -1000;
  m.userData.backdrop = true;
  return m;
}
