import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import type { PackId, StructureRec, LandmarkRec } from '../data/types';
import { makeTissueMaterial, kindOf, KINDS, FUNCTION_COLORS, gbufferFor, makeRigUniforms, LM, LM_SLOTS, type TissueMaterial } from './materials';
import { landmarkKind, landmarkRadius, LANDMARK_COLORS } from './landmarks';
export { landmarkKind, landmarkRadius, LANDMARK_COLORS, LANDMARK_KINDS, LANDMARK_KIND_LABELS, type LandmarkKind } from './landmarks';
import type { RigUniforms } from './organic';
import { layerOf, type LayerId } from './layers';
import { PostChain } from './post';
import { makeMicrographTexture, makeBackdropMesh, coverRect } from './backdrop';
import { Motion, clipsForKey, jointClips } from './motion';

(THREE.BufferGeometry.prototype as any).computeBoundsTree = computeBoundsTree;
(THREE.BufferGeometry.prototype as any).disposeBoundsTree = disposeBoundsTree;
const _sphere = new THREE.Sphere();
THREE.Mesh.prototype.raycast = function (this: THREE.Mesh, raycaster: THREE.Raycaster, hits: THREE.Intersection[]) {
  const g = this.geometry as THREE.BufferGeometry & { boundsTree?: unknown; computeBoundsTree?: () => void };
  if (!g.boundsTree && g.attributes.position && g.attributes.position.count > 400 && !(this as any).isInstancedMesh) {
    if (!g.boundingSphere) g.computeBoundingSphere();
    _sphere.copy(g.boundingSphere!).applyMatrix4(this.matrixWorld);
    if (raycaster.ray.intersectsSphere(_sphere)) g.computeBoundsTree!();
  }
  return acceleratedRaycast.call(this, raycaster, hits);
};

export type Quality = 'ultra' | 'high' | 'lite';
export type Tint = 'none' | 'hover' | 'select' | 'target' | 'right' | 'wrong' | 'related';
export type ColorMode = 'real' | 'function';
export type ClipAxis = 'sagittal' | 'coronal' | 'transverse';
export interface Effects {
  shadows: boolean;
  dof: boolean;
  bloom: boolean;
  ao: boolean;
  adaptive: boolean;
}

const EFFECT_DEFAULTS: Record<Quality, Effects> = {
  ultra: { shadows: true, dof: true, bloom: true, ao: true, adaptive: true },
  high: { shadows: false, dof: false, bloom: true, ao: true, adaptive: true },
  lite: { shadows: false, dof: false, bloom: false, ao: false, adaptive: false },
};

// Selection looks (DESIGN.md): eosin rim glow for select/target, violet rim for related, mint/orange for quiz feedback.
const TINTS: Record<Exclude<Tint, 'none'>, { color: string; amt: number; rim: number; glow: number }> = {
  hover: { color: '#ffc3d5', amt: 0.06, rim: 0.4, glow: 0 },
  select: { color: '#ff5d8f', amt: 0.14, rim: 1.35, glow: 1.3 },
  target: { color: '#ff5d8f', amt: 0.18, rim: 1.6, glow: 1.5 },
  right: { color: '#6ff0c4', amt: 0.16, rim: 1.1, glow: 0.9 },
  wrong: { color: '#ff8a3d', amt: 0.16, rim: 1.1, glow: 0.9 },
  related: { color: '#7b6cff', amt: 0.1, rim: 1.0, glow: 0.7 },
};
const PIN = '#ff5d8f';

export interface SObj {
  rec: StructureRec;
  root: THREE.Object3D;
  meshes: THREE.Mesh[];
  mats: TissueMaterial[];
  layer: LayerId | 'attachments';
  box: THREE.Box3; // world, unexploded
  center: THREE.Vector3;
  radius: number;
  basePos: THREE.Vector3;
  tint: Tint;
  rig: RigUniforms; // shared by every mesh of the structure (motion rig)
  restMatrix: THREE.Matrix4; // node matrix at rest, unexploded
}

export interface PickResult {
  id: string;
  point: THREE.Vector3;
  landmark?: LandmarkRec;
}

type Listener<T> = (v: T) => void;

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Make a standard material write a bloom amount into alpha (alpha > 1 marks glow for the post chain). */
function withGlow<T extends THREE.Material>(m: T, glow: number, instanceEmissive = false): T {
  m.onBeforeCompile = (s) => {
    if (instanceEmissive) s.fragmentShader = s.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n  totalEmissiveRadiance *= vColor;');
    s.fragmentShader = s.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>\n#ifdef OPAQUE\n  gl_FragColor.a = ${(1 + glow).toFixed(3)};\n#endif`);
  };
  m.customProgramCacheKey = () => `raga-glow-${glow}-${instanceEmissive}`;
  return m;
}

export class Engine {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly controls: OrbitControls;
  readonly world = new THREE.Group();
  readonly objects = new Map<string, SObj>();
  readonly motion: Motion;
  private post: PostChain | null = null;
  private container: HTMLElement;
  private quality: Quality;
  private effects: Effects;
  private dirty = true;
  private raf = 0;
  private loader: GLTFLoader;
  private loadingPacks = new Map<PackId, Promise<void>>();
  readonly loadedPacks = new Set<PackId>();
  private base: string;
  private ro: ResizeObserver;
  private bgTex: THREE.CanvasTexture;
  private backdrop: THREE.Mesh | null = null;
  private key: THREE.DirectionalLight;
  private keyDir = new THREE.Vector3(-0.42, 0.72, 0.56).normalize();
  private plainNormal = new THREE.MeshNormalMaterial();
  private lost = false;
  private lostL = new Set<() => void>();
  private restoredL = new Set<() => void>();

  // view state
  private layerOn = new Map<string, boolean>();
  private layerOpacity = new Map<string, number>();
  private hidden = new Set<string>();
  private isolate: Set<string> | null = null;
  private side: 'both' | 'l' | 'r' = 'both';
  private xray = false;
  private focusSet: Set<string> | null = null;
  private attachmentsShown = new Set<string>();
  private colorMode: ColorMode = 'real';
  private explode = 0;
  private explodeWanted = 0;
  private explodeAnim: { from: number; to: number; t0: number; dur: number } | null = null;
  private explodePivot = new THREE.Vector3();
  private clip: { axis: ClipAxis; t: number; flip: boolean } | null = null;
  private clipPlane = new THREE.Plane();
  private sceneBox = new THREE.Box3();
  private pickables: THREE.Object3D[] = [];
  private pickablesDirty = true;
  private regionBoxes: THREE.Box3[] | null = null;
  private regionPath: RegExp | null = null;
  private insets = { left: 0, right: 0, bottom: 0, top: 0 };
  private batching = 0;
  private pendingApply = false;
  private visVersion = 0;
  private poseVersion = 0;
  private motionActive = false;

  // frame scheduling (render on demand, progressive refinement, adaptive resolution)
  private lastMove = -1e9;
  private refining = false;
  private fade = 1; // 0..1 fade-in of AO, depth of field and shadows after the view settles
  private fastScale = 1;
  private frameEMA = 16.7;
  private frameSamples = 0;
  private lastFrameAt = 0;
  private lastWasFast = false;
  private basePR = 1;
  private litePR = 1;
  private shadowKey = '';

  // interaction
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerInside = false;
  private pointerMoved = false;
  private downAt: { x: number; y: number; t: number } | null = null;
  private hoverId: string | null = null;
  private lastTap = 0;
  private camTween: { p0: THREE.Vector3; p1: THREE.Vector3; t0v: THREE.Vector3; t1v: THREE.Vector3; start: number; dur: number } | null = null;
  reducedMotion = false;

  // markers
  private lmMesh: THREE.InstancedMesh | null = null;
  private lmList: LandmarkRec[] = [];
  private lmHighlight: string | null = null;
  private pin: THREE.Group | null = null;
  private pinHead = new THREE.Vector3();
  private areaList: LandmarkRec[] = [];
  private areaHi: string | null = null;
  private areaOwners: SObj[] = [];
  private areaKey = '';
  private areaHiShown = false;
  private pulseUntil = 0;
  private lastPulse = 0;

  // events
  private hoverL = new Set<Listener<{ id: string | null; x: number; y: number; landmark?: LandmarkRec }>>();
  private pickL = new Set<Listener<PickResult | null>>();
  private dblL = new Set<Listener<PickResult>>();
  private frameL = new Set<Listener<void>>();

  constructor(container: HTMLElement, opts: { quality?: Quality; base: string }) {
    this.container = container;
    const q: Quality = opts.quality === 'high' || opts.quality === 'lite' ? opts.quality : 'ultra';
    this.quality = q;
    this.effects = { ...EFFECT_DEFAULTS[q] };
    this.base = opts.base;
    this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const usePost = q !== 'lite';

    const r = new THREE.WebGLRenderer({ antialias: !usePost, powerPreference: 'high-performance', preserveDrawingBuffer: false, alpha: false, stencil: false });
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.NeutralToneMapping;
    r.toneMappingExposure = 1.0;
    r.localClippingEnabled = false;
    r.shadowMap.enabled = this.effects.shadows;
    r.shadowMap.type = THREE.PCFShadowMap;
    r.shadowMap.autoUpdate = false;
    r.domElement.className = 'viewport-canvas';
    r.domElement.setAttribute('aria-label', '3D anatomy model');
    r.domElement.setAttribute('role', 'img');
    container.appendChild(r.domElement);
    this.renderer = r;
    r.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.lost = true;
      cancelAnimationFrame(this.raf);
      this.lostL.forEach((f) => f());
    });
    // The browser may hand the context back (after a GPU reset, or once memory frees up). three.js
    // re-uploads meshes and textures by itself; the baked environment map has to be made again.
    r.domElement.addEventListener('webglcontextrestored', () => {
      if (!this.lost) return;
      this.lost = false;
      this.buildEnvironment();
      this.shadowKey = '';
      this.pickablesDirty = true;
      this.invalidate();
      this.raf = requestAnimationFrame(this.loop);
      this.restoredL.forEach((f) => f());
    });

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.01, 30);
    this.camera.position.set(0, 1.0, 3.6);
    this.scene.add(this.camera);
    this.scene.add(this.world);

    // Light rig: a warm key that casts soft shadows, a cool fill and a back rim, all placed relative to
    // the camera so every view is lit like a studio plate, plus soft image-based light from a room.
    this.buildEnvironment();
    (this.scene as any).environmentIntensity = 0.42;
    this.key = new THREE.DirectionalLight('#fff1e2', 2.7);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(q === 'ultra' ? 2048 : 1536, q === 'ultra' ? 2048 : 1536);
    this.key.shadow.radius = 3.5;
    this.key.shadow.bias = -0.00008;
    this.scene.add(this.key, this.key.target);
    const fill = new THREE.DirectionalLight('#dfe7ff', 0.55);
    fill.position.set(1.8, -0.3, 1.2);
    fill.target.position.set(0, 0, -1);
    const rim = new THREE.DirectionalLight('#ffe9f1', 1.35);
    rim.position.set(1.0, 1.3, -2.3);
    rim.target.position.set(0, 0, -1);
    this.camera.add(fill, fill.target, rim, rim.target);

    this.bgTex = makeMicrographTexture();
    if (usePost) {
      this.scene.background = null;
      r.autoClear = false;
      this.post = new PostChain(r, this.camera, this.scene, this.bgTex, 4);
      this.post.setToneMapping(true, r.toneMappingExposure);
    } else {
      this.backdrop = makeBackdropMesh(this.bgTex);
      this.scene.add(this.backdrop);
    }

    const c = new OrbitControls(this.camera, r.domElement);
    c.enableDamping = true;
    c.dampingFactor = 0.09;
    c.zoomToCursor = true;
    c.screenSpacePanning = true;
    c.minDistance = 0.04;
    c.maxDistance = 7;
    c.rotateSpeed = 0.75;
    c.zoomSpeed = 1.1;
    c.target.set(0, 0.95, 0);
    c.addEventListener('change', () => this.invalidate());
    this.controls = c;

    this.loader = new GLTFLoader();
    this.loader.setMeshoptDecoder(MeshoptDecoder);

    this.motion = new Motion({
      objects: this.objects,
      attachBoneMap: () => this.attachBone,
      invalidate: () => this.invalidate(),
      setMotionActive: (on) => this.setMotionActive(on),
      onPose: () => {
        this.poseVersion++;
        if (this.lmMesh) this.updateLandmarkMatrices();
      },
    });

    // clip builders for automated visual tests (window.__raga.engine.__motionModule)
    (this as unknown as { __motionModule: unknown }).__motionModule = { clipsForKey, jointClips };

    this.bindPointer();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.resize();
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  // ------------------------------------------------------------------ quality, effects, sizing
  getQuality() {
    return this.quality;
  }

  /** Toggle effects at run time. Tier changes still need a reload (contract). */
  setEffects(e: Partial<Effects>) {
    const prevShadows = this.effects.shadows;
    this.effects = { ...this.effects, ...e };
    if (this.quality === 'lite') this.effects = { ...this.effects, ao: false, dof: false, bloom: false };
    if (this.effects.shadows !== prevShadows) {
      this.renderer.shadowMap.enabled = this.effects.shadows;
      this.shadowKey = '';
      for (const o of this.objects.values()) for (const m of o.mats) m.needsUpdate = true;
    }
    if (!this.effects.adaptive) {
      this.fastScale = 1;
      if (this.quality === 'lite') this.applyLitePR(1);
    }
    this.invalidate();
  }

  getEffects(): Effects {
    return { ...this.effects };
  }

  /** Called if the WebGL context is lost (the interface steps the graphics tier down or waits for it to come back). */
  onContextLost(cb: () => void) {
    this.lostL.add(cb);
    return () => this.lostL.delete(cb);
  }

  /** Called when a lost WebGL context has been restored and drawing has resumed. */
  onContextRestored(cb: () => void) {
    this.restoredL.add(cb);
    return () => this.restoredL.delete(cb);
  }

  /** True while the WebGL context is lost. */
  get contextLost() {
    return this.lost;
  }

  private buildEnvironment() {
    const old = this.scene.environment;
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    old?.dispose();
  }

  private computeBasePR(w: number, h: number) {
    const dpr = window.devicePixelRatio || 1;
    if (this.quality === 'lite') return Math.min(dpr, 1.5);
    let pr = Math.min(dpr, 2);
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    // ultra on desktop never drops below a 1080p drawing buffer
    if (this.quality === 'ultra' && !coarse) pr = Math.max(pr, Math.min(2, Math.sqrt((1920 * 1080) / Math.max(1, w * h))));
    const budget = 3840 * 2160;
    if (w * h * pr * pr > budget) pr = Math.sqrt(budget / (w * h));
    return pr;
  }

  private resize() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.basePR = this.computeBasePR(w, h);
    const pr = this.quality === 'lite' ? this.basePR * this.litePR : this.basePR;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.applyViewOffset();
    const rect = coverRect(1600 / 1000, w / h);
    if (this.post) {
      const dw = Math.round(w * pr), dh = Math.round(h * pr);
      this.post.setSize(dw, dh, Math.min(1, Math.sqrt(2.2e6 / (dw * dh))));
      this.post.setBackgroundRect(rect);
    } else if (this.backdrop) {
      ((this.backdrop.material as THREE.ShaderMaterial).uniforms.uRect.value as THREE.Vector4).copy(rect);
    }
    this.invalidate();
  }

  private applyLitePR(s: number) {
    if (Math.abs(s - this.litePR) < 0.04) return;
    this.litePR = s;
    this.resize();
  }

  invalidate() {
    this.dirty = true;
  }

  // ------------------------------------------------------------------ loading
  isLoaded(p: PackId) {
    return this.loadedPacks.has(p);
  }

  loadPack(pack: PackId, recs: Map<string, StructureRec>, onProgress?: (f: number) => void): Promise<void> {
    if (this.loadedPacks.has(pack)) return Promise.resolve();
    const existing = this.loadingPacks.get(pack);
    if (existing) return existing;
    const folder = this.quality === 'ultra' ? 'ultra/' : this.quality === 'lite' ? 'lite/' : '';
    const url = `${this.base}models/${folder}${pack}.glb`;
    const p = new Promise<void>((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          try {
            this.ingest(gltf.scene, recs);
            this.loadedPacks.add(pack);
            this.pickablesDirty = true;
            this.applyAll();
            this.motion.packLoaded();
            resolve();
          } catch (e) {
            reject(e);
          }
        },
        (ev) => {
          if (onProgress && ev.total) onProgress(ev.loaded / ev.total);
        },
        (err) => reject(err),
      );
    });
    this.loadingPacks.set(pack, p);
    p.catch(() => this.loadingPacks.delete(pack));
    return p;
  }

  private ingest(root: THREE.Object3D, recs: Map<string, StructureRec>) {
    root.updateMatrixWorld(true);
    const lite = this.quality === 'lite';
    const nodes = [...root.children];
    for (const node of nodes) {
      const rec = recs.get(node.name);
      if (!rec) continue;
      this.world.add(node);
      node.updateMatrix();
      node.updateMatrixWorld(true);
      const meshes: THREE.Mesh[] = [];
      node.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
      });
      const mats: TissueMaterial[] = [];
      const rig = makeRigUniforms();
      let fiberAxis: THREE.Vector3 | null = null;
      meshes.forEach((mesh, mi) => {
        const g = mesh.geometry as THREE.BufferGeometry;
        const pos = g.getAttribute('position') as THREE.BufferAttribute;
        if (pos && (pos.normalized || !(pos.array instanceof Float32Array))) {
          const arr = new Float32Array(pos.count * 3);
          for (let i = 0; i < pos.count; i++) {
            arr[i * 3] = pos.getX(i);
            arr[i * 3 + 1] = pos.getY(i);
            arr[i * 3 + 2] = pos.getZ(i);
          }
          g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        }
        const ao = g.getAttribute('_ao');
        if (ao) {
          g.setAttribute('aoBake', ao);
          g.deleteAttribute('_ao');
        }
        g.computeBoundingBox();
        g.computeBoundingSphere();
        // tissue kind: the pack's material name, else the catalogue (one kind per primitive in order)
        // (packs cached from older builds call every primitive by one merged name, so the catalogue wins
        // whenever the pack's name is not one of the structure's tissues)
        const glbName = (mesh.material as THREE.Material).name;
        const srcName = rec.mats.length === 1 ? rec.mats[0] : glbName && rec.mats.includes(glbName) ? glbName : rec.mats[Math.min(mi, rec.mats.length - 1)] || glbName || 'organ';
        (mesh.material as THREE.Material).dispose();
        const kind = kindOf(srcName);
        const m = makeTissueMaterial(kind, { lite, ao: !!ao, rig });
        if (KINDS[kind].fiber) {
          if (!fiberAxis) fiberAxis = principalAxis(mesh);
          m.userData.org.uFiberDir.value.copy(fiberAxis);
        }
        m.userData.org.uRestModel.value.copy(mesh.matrixWorld);
        m.userData.org.uRestNormal.value.getNormalMatrix(mesh.matrixWorld);
        mesh.material = m;
        mesh.userData.sid = rec.id;
        mesh.renderOrder = KINDS[kind].opacity !== undefined ? 2 : 0;
        mesh.castShadow = KINDS[kind].opacity === undefined;
        mesh.receiveShadow = true;
        mats.push(m);
      });
      const box = new THREE.Box3().setFromObject(node);
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const obj: SObj = {
        rec,
        root: node,
        meshes,
        mats,
        layer: layerOf(rec),
        box,
        center: sphere.center.clone(),
        radius: sphere.radius,
        basePos: node.position.clone(),
        tint: 'none',
        rig,
        restMatrix: node.matrix.clone(),
      };
      this.objects.set(rec.id, obj);
    }
  }

  // ------------------------------------------------------------------ visibility & look
  setLayer(layer: LayerId | 'attachments', on: boolean) {
    this.layerOn.set(layer, on);
    this.applyAll();
  }

  layerVisible(layer: string) {
    return this.layerOn.get(layer) ?? false;
  }

  setLayerOpacity(layer: LayerId, v: number) {
    this.layerOpacity.set(layer, v);
    this.applyAll();
  }

  setHidden(ids: Iterable<string>) {
    this.hidden = new Set(ids);
    this.applyAll();
  }

  setIsolate(ids: Iterable<string> | null) {
    this.isolate = ids ? new Set(ids) : null;
    this.applyAll();
  }

  setSide(s: 'both' | 'l' | 'r') {
    this.side = s;
    this.applyAll();
  }

  /** X-ray: everything outside `focus` becomes a faint ghost. */
  setXray(on: boolean, focus?: Iterable<string> | null) {
    this.xray = on;
    this.focusSet = focus ? new Set(focus) : null;
    this.applyAll();
  }

  /** Run several setters and recompute visibility once at the end. */
  batch(fn: () => void) {
    this.batching++;
    try {
      fn();
    } finally {
      this.batching--;
      if (!this.batching && this.pendingApply) {
        this.pendingApply = false;
        this.applyAll();
      }
    }
  }

  /** Limit the view to a body region: structures whose centre lies in one of the boxes,
   *  or whose model hierarchy matches `path` (e.g. "Muscles of upper limb"). */
  setRegion(boxes: THREE.Box3[] | null, path: RegExp | null = null) {
    this.regionBoxes = boxes && boxes.length ? boxes.map((b) => b.clone()) : null;
    this.regionPath = this.regionBoxes ? path : null;
    this.applyAll();
  }

  inRegion(o: SObj) {
    if (!this.regionBoxes) return true;
    if (this.regionPath && o.rec.path.some((p) => this.regionPath!.test(p))) return true;
    return this.regionBoxes.some((b) => b.containsPoint(o.center));
  }

  /** Panels covering the left/right edge of the canvas (CSS px); framing centres on the free area. */
  /** Space the panels take on each side of the view, in CSS pixels. The specimen is centred in what is left. */
  setInsets(left: number, right: number, bottom = 0, top = 0) {
    const cur = this.insets;
    if (cur.left === left && cur.right === right && cur.bottom === bottom && cur.top === top) return;
    this.insets = { left, right, bottom, top };
    this.applyViewOffset();
    this.invalidate();
  }

  private applyViewOffset() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    const shift = (this.insets.left - this.insets.right) / 2;
    const shiftY = (this.insets.bottom - this.insets.top) / 2;
    if (Math.abs(shift) < 1 && Math.abs(shiftY) < 1) this.camera.clearViewOffset();
    else this.camera.setViewOffset(w, h, -shift, shiftY, w, h);
    this.camera.updateProjectionMatrix();
  }

  setAttachments(ids: Iterable<string>) {
    this.attachmentsShown = new Set(ids);
    this.applyAll();
  }

  setColorMode(m: ColorMode) {
    this.colorMode = m;
    this.applyAll();
  }

  setTints(map: Map<string, Tint>) {
    this.tintMap = map;
    for (const o of this.objects.values()) {
      const t = map.get(o.rec.id) ?? (o.rec.id === this.hoverId ? 'hover' : 'none');
      if (o.tint !== t) {
        o.tint = t;
        this.applyLook(o);
      }
    }
    this.invalidate();
  }

  private tintMap = new Map<string, Tint>();
  setTint(map: Map<string, Tint>) {
    this.tintMap = map;
    this.setTints(map);
  }

  isVisible(id: string) {
    const o = this.objects.get(id);
    return !!o && o.root.visible;
  }

  private visibleFor(o: SObj) {
    if (o.layer === 'attachments') return this.attachmentsShown.has(o.rec.id);
    if (!(this.layerOn.get(o.layer) ?? false)) return false;
    if (this.hidden.has(o.rec.id)) return false;
    if (this.side !== 'both' && o.rec.side && o.rec.side !== this.side) return false;
    if (this.isolate && !this.isolate.has(o.rec.id)) return false;
    if (this.regionBoxes && !this.inRegion(o) && !(this.focusSet?.has(o.rec.id) ?? false)) return false;
    return true;
  }

  private applyAll() {
    if (this.batching) {
      this.pendingApply = true;
      return;
    }
    for (const o of this.objects.values()) {
      o.root.visible = this.visibleFor(o);
      this.applyLook(o);
    }
    this.pickablesDirty = true;
    this.visVersion++;
    this.updateExplodeTargets();
    this.updateClip();
    this.invalidate();
  }

  private applyLook(o: SObj) {
    const layerOp = o.layer === 'attachments' ? 1 : this.layerOpacity.get(o.layer) ?? 1;
    const ghost = this.xray && this.focusSet !== null && !this.focusSet.has(o.rec.id) && o.layer !== 'attachments';
    const tint = o.tint === 'none' ? null : TINTS[o.tint];
    const clipping = this.clip !== null;
    o.mats.forEach((m, i) => {
      const ud = m.userData;
      let op = ud.baseOpacity * layerOp;
      if (ghost) op = Math.min(op, 0.1);
      if (tint && op < 0.5) op = Math.max(op, 0.75);
      const transparent = op < 0.995;
      if (m.transparent !== transparent) {
        m.transparent = transparent;
        m.needsUpdate = true;
      }
      m.opacity = op;
      m.depthWrite = !transparent || op > 0.7;
      o.meshes[i].castShadow = !transparent;
      const side = clipping && !transparent ? THREE.DoubleSide : ud.kind === 'origin' || ud.kind === 'insertion' ? THREE.DoubleSide : THREE.FrontSide;
      if (m.side !== side) {
        m.side = side;
        m.needsUpdate = true;
      }
      // base colour (function view recolours muscles by action group)
      if (this.colorMode === 'function' && ud.kind === 'muscle' && o.rec.fn && FUNCTION_COLORS[o.rec.fn]) m.color.set(FUNCTION_COLORS[o.rec.fn]);
      else m.color.copy(ud.baseColor);
      const org = ud.org;
      if (tint) {
        org.uTint.value.set(tint.color);
        // selected bones keep the eosin rim but only a faint fill, so landmark decals stay readable
        org.uTintAmt.value = o.rec.pack === 'skeleton' && (o.tint === 'select' || o.tint === 'target') ? 0.035 : tint.amt;
        const c = new THREE.Color(tint.color);
        org.uRim.value.set(c.r, c.g, c.b, tint.rim);
        org.uGlow.value = tint.glow;
      } else {
        org.uTintAmt.value = 0;
        org.uRim.value.copy(ud.rimBase);
        org.uGlow.value = 0;
      }
      if (ud.emissive > 0) {
        m.emissive.copy(m.color);
        m.emissiveIntensity = ud.emissive;
      } else {
        m.emissive.setRGB(0, 0, 0);
        m.emissiveIntensity = 0;
      }
    });
  }

  // ------------------------------------------------------------------ explode
  setExplode(f: number, animate = true) {
    f = Math.max(0, Math.min(1, f));
    this.explodeWanted = f;
    if (this.motionActive) f = 0;
    if (!animate || this.reducedMotion) {
      this.explode = f;
      this.explodeAnim = null;
      this.positionExploded();
      return;
    }
    this.explodeAnim = { from: this.explode, to: f, t0: performance.now(), dur: 450 };
    this.invalidate();
  }

  private setMotionActive(on: boolean) {
    if (this.motionActive === on) return;
    this.motionActive = on;
    const want = this.explodeWanted;
    if (on) {
      this.explodeAnim = null;
      this.explode = 0;
      this.positionExploded();
      this.explodeWanted = want;
    } else {
      this.setExplode(want);
    }
  }

  private updateExplodeTargets() {
    const box = new THREE.Box3();
    for (const o of this.objects.values()) if (o.root.visible && o.layer !== 'attachments') box.union(o.box);
    if (!box.isEmpty()) {
      box.getCenter(this.explodePivot);
      this.sceneBox.copy(box);
    }
    this.positionExploded();
  }

  private _v = new THREE.Vector3();
  private positionExploded() {
    const f = this.explode;
    for (const o of this.objects.values()) {
      if (!o.root.matrixAutoUpdate) continue; // posed by the motion rig
      if (f === 0) {
        o.root.position.copy(o.basePos);
      } else {
        const d = this._v.copy(o.center).sub(this.explodePivot);
        // structures attached to a bone (origin/insertion patches) travel with the bone
        let src: SObj = o;
        if (o.layer === 'attachments' && o.rec.path) {
          const bone = this.boneOf(o);
          if (bone) src = bone;
          d.copy(src.center).sub(this.explodePivot);
        }
        o.root.position.copy(o.basePos).addScaledVector(d, f * 1.15);
      }
      o.root.updateMatrixWorld(true);
    }
    this.shadowKey = '';
    this.invalidate();
  }

  private attachBone = new Map<string, string>();
  registerAttachmentBone(attId: string, boneId: string) {
    this.attachBone.set(attId, boneId);
  }
  private boneOf(o: SObj) {
    const b = this.attachBone.get(o.rec.id);
    return b ? this.objects.get(b) : undefined;
  }

  /** Current world position of a point on a structure, taking explode offset and motion into account. */
  worldPointOn(id: string, p: THREE.Vector3) {
    const m = this.motion.boneMatrix(id);
    if (m) return p.clone().applyMatrix4(m);
    const o = this.objects.get(id);
    if (!o) return p.clone();
    return p.clone().add(this._v.copy(o.root.position).sub(o.basePos));
  }

  // ------------------------------------------------------------------ clipping
  setClip(c: { axis: ClipAxis; t: number; flip: boolean } | null) {
    const was = this.clip !== null;
    this.clip = c;
    this.updateClip();
    if (was !== (c !== null)) for (const o of this.objects.values()) this.applyLook(o);
    this.shadowKey = '';
    this.invalidate();
  }

  private updateClip() {
    if (!this.clip) {
      this.renderer.clippingPlanes = [];
      return;
    }
    const b = this.sceneBox.isEmpty() ? new THREE.Box3(new THREE.Vector3(-0.5, 0, -0.2), new THREE.Vector3(0.5, 1.8, 0.2)) : this.sceneBox;
    const axis = this.clip.axis === 'sagittal' ? 0 : this.clip.axis === 'transverse' ? 1 : 2;
    const n = new THREE.Vector3();
    n.setComponent(axis, this.clip.flip ? 1 : -1);
    const lo = b.min.getComponent(axis), hi = b.max.getComponent(axis);
    const at = lo + (hi - lo) * this.clip.t;
    // keep the side where n·p + c >= 0
    this.clipPlane.set(n, this.clip.flip ? -at : at);
    this.renderer.clippingPlanes = [this.clipPlane];
  }

  // ------------------------------------------------------------------ camera
  frameIds(ids: Iterable<string>, opts: { dir?: THREE.Vector3; pad?: number; instant?: boolean } = {}) {
    const box = new THREE.Box3();
    for (const id of ids) {
      const o = this.objects.get(id);
      if (!o) continue;
      const b = o.box.clone().translate(this._v.copy(o.root.position).sub(o.basePos));
      box.union(b);
    }
    if (box.isEmpty()) return;
    this.frameBox(box, opts);
  }

  frameVisible(opts: { dir?: THREE.Vector3; instant?: boolean } = {}) {
    const box = new THREE.Box3();
    for (const o of this.objects.values()) if (o.root.visible && o.layer !== 'attachments') box.union(o.box.clone().translate(this._v.copy(o.root.position).sub(o.basePos)));
    if (!box.isEmpty()) this.frameBox(box, opts);
  }

  frameBox(box: THREE.Box3, opts: { dir?: THREE.Vector3; pad?: number; instant?: boolean } = {}) {
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const r = Math.max(sphere.radius * (opts.pad ?? 1.08), 0.02);
    const freeH = Math.max(120, this.container.clientHeight - this.insets.bottom - this.insets.top);
    const vfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * (freeH / Math.max(1, this.container.clientHeight)));
    const freeW = Math.max(120, this.container.clientWidth - this.insets.left - this.insets.right);
    const hfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * (freeW / Math.max(1, this.container.clientHeight)));
    const fov = Math.min(vfov, hfov);
    const dist = r / Math.sin(fov / 2);
    const dir = (opts.dir ?? this.camera.position.clone().sub(this.controls.target)).clone().normalize();
    if (dir.lengthSq() < 1e-6) dir.set(0, 0, 1);
    this.flyTo(sphere.center.clone().addScaledVector(dir, dist), sphere.center.clone(), opts.instant);
  }

  /** Look at a surface point along its normal (used for landmark pins). */
  framePoint(p: THREE.Vector3, n: THREE.Vector3, dist = 0.16, instant = false) {
    const dir = n.clone().normalize();
    // keep a little elevation so the view does not look straight up or down
    if (Math.abs(dir.y) > 0.85) dir.y = Math.sign(dir.y) * 0.85;
    dir.normalize();
    // `dist` is meant for a view at least as wide as it is tall; a portrait phone shows a narrower
    // slice at the same distance, so step back until the same width fits
    const freeH = Math.max(120, this.container.clientHeight - this.insets.bottom - this.insets.top);
    const freeW = Math.max(120, this.container.clientWidth - this.insets.left - this.insets.right);
    const d = dist * Math.min(2.4, Math.max(1, freeH / freeW));
    this.flyTo(p.clone().addScaledVector(dir, d), p.clone(), instant);
  }

  view(name: 'anterior' | 'posterior' | 'left' | 'right' | 'superior' | 'inferior') {
    const t = this.controls.target.clone();
    const d = this.camera.position.distanceTo(t);
    const dir = {
      anterior: new THREE.Vector3(0, 0, 1),
      posterior: new THREE.Vector3(0, 0, -1),
      left: new THREE.Vector3(1, 0, 0),
      right: new THREE.Vector3(-1, 0, 0),
      superior: new THREE.Vector3(0, 1, 0.001),
      inferior: new THREE.Vector3(0, -1, 0.001),
    }[name];
    this.flyTo(t.clone().addScaledVector(dir, d), t);
  }

  flyTo(pos: THREE.Vector3, target: THREE.Vector3, instant = false) {
    if (instant || this.reducedMotion) {
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.camTween = null;
      this.controls.update();
      this.invalidate();
      return;
    }
    this.camTween = { p0: this.camera.position.clone(), p1: pos, t0v: this.controls.target.clone(), t1v: target, start: performance.now(), dur: 650 };
    this.invalidate();
  }

  // ------------------------------------------------------------------ markers
  setLandmarks(list: LandmarkRec[], highlightKey: string | null = null) {
    if (this.lmMesh) {
      this.world.remove(this.lmMesh);
      this.lmMesh.geometry.dispose();
      (this.lmMesh.material as THREE.Material).dispose();
      this.lmMesh = null;
    }
    this.lmList = list;
    this.lmHighlight = highlightKey;
    this.setLandmarkAreas(list, highlightKey);
    if (!list.length) {
      this.invalidate();
      return;
    }
    const geo = new THREE.SphereGeometry(0.0021, 16, 12);
    const mat = withGlow(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3, metalness: 0, emissive: '#ffffff', emissiveIntensity: 0.55 }), 0.25, true);
    const im = new THREE.InstancedMesh(geo, mat, list.length);
    im.renderOrder = 5;
    this.lmMesh = im;
    this.updateLandmarkMatrices();
    this.world.add(im);
    this.invalidate();
  }

  private updateLandmarkMatrices() {
    if (!this.lmMesh) return;
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    const nv = new THREE.Vector3();
    this.lmList.forEach((l, i) => {
      const bm = this.motion.boneMatrix(l.on);
      nv.set(l.n[0], l.n[1], l.n[2]);
      if (bm) nv.transformDirection(bm);
      const hi = l.k === this.lmHighlight;
      const p = this.worldPointOn(l.on, new THREE.Vector3(...l.p)).addScaledVector(nv, 0.0012);
      const s = hi ? 1.5 : 1;
      m.makeScale(s, s, s).setPosition(p);
      this.lmMesh!.setMatrixAt(i, m);
      this.lmMesh!.setColorAt(i, c.set(LANDMARK_COLORS[landmarkKind(`${l.en} ${l.la ?? ''}`)]));
    });
    this.lmMesh.instanceMatrix.needsUpdate = true;
    if (this.lmMesh.instanceColor) this.lmMesh.instanceColor.needsUpdate = true;
    this.lmMesh.computeBoundingSphere();
    this.invalidate();
  }

  highlightLandmark(key: string | null) {
    this.lmHighlight = key;
    this.updateLandmarkMatrices();
    if (this.areaList === this.lmList) this.setLandmarkAreas(this.areaList, key);
    this.invalidate();
  }

  /**
   * Landmark area decals: a soft coloured spot with a thin bright ring, drawn on the bone the landmark
   * sits on (moves with explode and motion). Colour and size come from the landmark kind
   * (landmarkKind / LANDMARK_COLORS / landmarkRadius). At most 32 are drawn per frame: the highlighted
   * one first, then those nearest the orbit target. setLandmarks() calls this with the same list.
   */
  setLandmarkAreas(list: LandmarkRec[], highlightKey: string | null = null) {
    this.areaList = list;
    if (highlightKey !== this.areaHi) this.pulseUntil = performance.now() + 6000;
    this.areaHi = highlightKey;
    this.areaKey = '';
    this.invalidate();
  }

  private updateLandmarkAreas() {
    const t = this.controls.target;
    const key = `${this.areaList.length}:${this.areaHi}:${t.x.toFixed(2)},${t.y.toFixed(2)},${t.z.toFixed(2)}:${this.visVersion}`;
    if (key === this.areaKey) return;
    this.areaKey = key;
    for (const o of this.areaOwners) for (const m of o.mats) m.userData.org.uLmBits.value = 0;
    this.areaOwners = [];
    this.areaHiShown = false;
    if (!this.areaList.length) return;
    const tv = new THREE.Vector3(), pv = new THREE.Vector3();
    tv.copy(t);
    const cand = this.areaList
      .filter((l) => this.objects.get(l.on)?.root.visible)
      .map((l) => ({ l, d: l.k === this.areaHi ? -1 : pv.set(l.p[0], l.p[1], l.p[2]).distanceToSquared(tv) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, LM_SLOTS);
    const bits = new Map<SObj, number>();
    const col = new THREE.Color();
    cand.forEach(({ l }, i) => {
      const o = this.objects.get(l.on)!;
      const kind = landmarkKind(`${l.en} ${l.la ?? ''}`);
      const hi = l.k === this.areaHi;
      if (hi) this.areaHiShown = true;
      LM.pos.value[i].set(l.p[0], l.p[1], l.p[2], landmarkRadius(kind, o.radius) * (hi ? 1.1 : this.areaHi ? 0.7 : 0.85));
      col.set(LANDMARK_COLORS[kind]);
      LM.col.value[i].set(col.r, col.g, col.b, hi ? 1 : 0);
      const n = pv.set(l.n[0], l.n[1], l.n[2]);
      const ok = n.lengthSq() > 0.5;
      n.normalize();
      LM.nrm.value[i].set(n.x, n.y, n.z, ok ? 1 : 0);
      bits.set(o, (bits.get(o) ?? 0) | (1 << i));
    });
    for (const [o, b] of bits) {
      for (const m of o.mats) m.userData.org.uLmBits.value = b | 0;
      this.areaOwners.push(o);
    }
  }

  /** OSPE-style pin stuck into a surface point. */
  setPin(p: THREE.Vector3 | null, n?: THREE.Vector3, color = PIN, size = 1) {
    if (this.pin) {
      this.world.remove(this.pin);
      this.pin.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        }
      });
      this.pin = null;
    }
    if (!p || !n) {
      this.invalidate();
      return;
    }
    const len = 0.028 * size;
    const g = new THREE.Group();
    const needle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.00045 * size, 0.00025 * size, len, 12),
      new THREE.MeshStandardMaterial({ color: '#dfe3ea', metalness: 1, roughness: 0.22 }),
    );
    needle.position.y = len / 2 - 0.002;
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.0034 * size, 28, 20),
      withGlow(new THREE.MeshPhysicalMaterial({ color, roughness: 0.25, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08, emissive: color, emissiveIntensity: 0.6 }), 0.9),
    );
    head.position.y = len;
    g.add(needle, head);
    g.position.copy(p);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n.clone().normalize());
    g.renderOrder = 6;
    this.world.add(g);
    this.pin = g;
    g.updateMatrixWorld(true);
    this.pinHead.copy(head.getWorldPosition(new THREE.Vector3()));
    this.invalidate();
  }

  getPinHead(): THREE.Vector3 | null {
    return this.pin ? this.pinHead.clone() : null;
  }

  /** Screen position (CSS px) of a world point and whether something blocks the view of it. */
  project(p: THREE.Vector3, testOcclusion = false) {
    const v = p.clone().project(this.camera);
    const w = this.container.clientWidth, h = this.container.clientHeight;
    const out = { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h, behind: v.z > 1, occluded: false };
    if (testOcclusion && !out.behind) {
      const dir = p.clone().sub(this.camera.position);
      const dist = dir.length();
      this.raycaster.set(this.camera.position, dir.normalize());
      if (this.clip && this.clipPlane.distanceToPoint(p) < -0.002) out.occluded = true; // the point itself was cut away
      else if (this.limitRayToCut()) {
        this.raycaster.far = Math.min(this.raycaster.far, dist - 0.004);
        if (this.raycaster.far > this.raycaster.near) {
          (this.raycaster as any).firstHitOnly = !this.clip;
          const hits = this.raycaster.intersectObjects(this.getPickables(), false);
          out.occluded = hits.some((h) => this.keptByCut(h.point) && !this.isGhostMesh(h.object));
        }
      }
      this.raycaster.near = 0;
      this.raycaster.far = Infinity;
    }
    return out;
  }

  /**
   * Shortens the ray to the stretch that lies on the side the cut plane keeps, so picking sees what
   * the renderer draws. Returns false when the whole ray runs through the part that was cut away.
   */
  private limitRayToCut(): boolean {
    this.raycaster.near = 0;
    this.raycaster.far = Infinity;
    if (!this.clip) return true;
    const ray = this.raycaster.ray;
    const d0 = this.clipPlane.distanceToPoint(ray.origin);
    const dn = this.clipPlane.normal.dot(ray.direction);
    if (Math.abs(dn) < 1e-9) return d0 >= 0;
    const t = -d0 / dn;
    if (d0 >= 0) {
      if (dn < 0) this.raycaster.far = t; // leaves the kept side at t
    } else {
      if (dn < 0) return false;
      this.raycaster.near = t; // enters the kept side at t
    }
    return true;
  }

  private keptByCut(p: THREE.Vector3) {
    return !this.clip || this.clipPlane.distanceToPoint(p) >= -1e-4;
  }

  // ------------------------------------------------------------------ picking
  private getPickables() {
    if (this.pickablesDirty) {
      this.pickables = [];
      for (const o of this.objects.values()) if (o.root.visible) for (const m of o.meshes) this.pickables.push(m);
      this.pickablesDirty = false;
    }
    return this.pickables;
  }

  /**
   * How much of some structures can be seen from a direction: the share of sample points on their
   * surfaces that no other visible structure covers. `solid` narrows what counts as cover (leave
   * faded structures out). The quiz uses this to pick the side to look from.
   */
  visibleShare(ids: Iterable<string>, dir: THREE.Vector3, solid?: (id: string) => boolean, samples = 30): number {
    const target = new Set(ids);
    const meshes: THREE.Mesh[] = [];
    for (const id of target) {
      const o = this.objects.get(id);
      if (o && o.root.visible) meshes.push(...o.meshes);
    }
    if (!meshes.length) return 0;
    const pts: THREE.Vector3[] = [];
    const per = Math.max(2, Math.ceil(samples / meshes.length));
    for (const m of meshes) {
      const pos = (m.geometry as THREE.BufferGeometry).getAttribute('position');
      if (!pos) continue;
      m.updateMatrixWorld();
      const step = Math.max(1, Math.floor(pos.count / per));
      for (let i = step >> 1; i < pos.count && pts.length < samples * 2; i += step) pts.push(new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld));
    }
    if (!pts.length) return 0;
    const d = dir.clone().normalize();
    const back = d.clone().negate();
    const reach = 4;
    const cover = this.getPickables().filter((m) => {
      const sid = m.userData.sid as string;
      return !target.has(sid) && (!solid || solid(sid));
    });
    let seen = 0;
    (this.raycaster as any).firstHitOnly = true;
    this.raycaster.near = 0;
    this.raycaster.far = reach - 0.003;
    for (const p of pts) {
      this.raycaster.set(this._v.copy(p).addScaledVector(d, reach), back);
      if (!this.raycaster.intersectObjects(cover, false).length) seen++;
    }
    this.raycaster.far = Infinity;
    return seen / pts.length;
  }

  private isGhostMesh(obj: THREE.Object3D) {
    const m = (obj as THREE.Mesh).material as TissueMaterial | undefined;
    return !!m && m.opacity < 0.2;
  }

  pickAt(clientX: number, clientY: number): PickResult | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (!this.limitRayToCut()) {
      this.raycaster.near = 0;
      this.raycaster.far = Infinity;
      return null;
    }
    // With a cut plane the nearest triangle of a mesh may be one that is not drawn, so take every hit
    // and drop those on the removed side; without a cut the first hit per mesh is enough.
    (this.raycaster as any).firstHitOnly = !this.clip;
    const hits = this.raycaster.intersectObjects(this.getPickables(), false).filter((h) => this.keptByCut(h.point));
    const solid = hits.find((h) => !this.isGhostMesh(h.object)) ?? hits[0] ?? null;
    let lm: THREE.Intersection | null = null;
    if (this.lmMesh) {
      (this.raycaster as any).firstHitOnly = false;
      const lh = this.raycaster.intersectObject(this.lmMesh, false).filter((h) => this.keptByCut(h.point));
      // a landmark dot counts only when nothing solid lies in front of it
      if (lh.length && lh[0].instanceId !== undefined && (!solid || this.isGhostMesh(solid.object) || lh[0].distance <= solid.distance + 0.004)) lm = lh[0];
    }
    this.raycaster.near = 0;
    this.raycaster.far = Infinity;
    if (lm) {
      const l = this.lmList[lm.instanceId!];
      return { id: l.on, point: lm.point, landmark: l };
    }
    if (!solid) return null;
    return { id: solid.object.userData.sid as string, point: solid.point };
  }

  private bindPointer() {
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', (e) => {
      this.downAt = { x: e.clientX, y: e.clientY, t: performance.now() };
      this.camTween = null;
    });
    el.addEventListener('pointermove', (e) => {
      this.pointerInside = true;
      this.lastPointer = { x: e.clientX, y: e.clientY, type: e.pointerType };
      this.pointerMoved = true;
    });
    el.addEventListener('pointerleave', () => {
      this.pointerInside = false;
      this.emitHover(null, 0, 0);
    });
    el.addEventListener('pointerup', (e) => {
      const d = this.downAt;
      this.downAt = null;
      if (!d) return;
      const moved = Math.hypot(e.clientX - d.x, e.clientY - d.y);
      if (moved > 7 || performance.now() - d.t > 600) return;
      const hit = this.pickAt(e.clientX, e.clientY);
      const now = performance.now();
      if (now - this.lastTap < 320 && hit) {
        this.dblL.forEach((f) => f(hit));
        this.lastTap = 0;
        return;
      }
      this.lastTap = now;
      this.pickL.forEach((f) => f(hit));
    });
  }

  private lastPointer: { x: number; y: number; type: string } | null = null;

  private emitHover(id: string | null, x: number, y: number, landmark?: LandmarkRec) {
    const prev = this.hoverId;
    this.hoverId = id;
    if (prev !== id) {
      for (const pid of [prev, id]) {
        if (!pid) continue;
        const o = this.objects.get(pid);
        if (!o) continue;
        const t = this.tintMap.get(pid) ?? (pid === id ? 'hover' : 'none');
        if (o.tint !== t) {
          o.tint = t;
          this.applyLook(o);
        }
      }
      this.invalidate();
    }
    this.hoverL.forEach((f) => f({ id, x, y, landmark }));
  }

  onHover(f: Listener<{ id: string | null; x: number; y: number; landmark?: LandmarkRec }>) {
    this.hoverL.add(f);
    return () => this.hoverL.delete(f);
  }
  onPick(f: Listener<PickResult | null>) {
    this.pickL.add(f);
    return () => this.pickL.delete(f);
  }
  onDoublePick(f: Listener<PickResult>) {
    this.dblL.add(f);
    return () => this.dblL.delete(f);
  }
  onFrame(f: Listener<void>) {
    this.frameL.add(f);
    return () => this.frameL.delete(f);
  }

  // ------------------------------------------------------------------ rendering
  private loop(now: number) {
    if (this.lost) return;
    this.raf = requestAnimationFrame(this.loop);
    let moving = false;
    if (this.camTween) {
      const t = Math.min(1, (now - this.camTween.start) / this.camTween.dur);
      const e = easeInOut(t);
      this.camera.position.lerpVectors(this.camTween.p0, this.camTween.p1, e);
      this.controls.target.lerpVectors(this.camTween.t0v, this.camTween.t1v, e);
      if (t >= 1) this.camTween = null;
      moving = true;
    }
    if (this.explodeAnim) {
      const a = this.explodeAnim;
      const t = Math.min(1, (now - a.t0) / a.dur);
      this.explode = a.from + (a.to - a.from) * easeInOut(t);
      this.positionExploded();
      if (this.lmMesh) this.updateLandmarkMatrices();
      if (t >= 1) this.explodeAnim = null;
      moving = true;
    }
    if (this.controls.update()) moving = true;
    if (this.motion.update(now)) moving = true;
    if (this.motion.animating) moving = true;
    if (this.pointerMoved && this.pointerInside && !this.downAt && this.lastPointer && this.lastPointer.type === 'mouse') {
      this.pointerMoved = false;
      const hit = this.pickAt(this.lastPointer.x, this.lastPointer.y);
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.emitHover(hit?.id ?? null, this.lastPointer.x - rect.left, this.lastPointer.y - rect.top, hit?.landmark);
    }
    if (moving) {
      this.lastMove = now;
      this.dirty = true;
      this.refining = true;
      this.fade = 0;
    }
    const still = now - this.lastMove > 200;
    if (this.areaHiShown && still && !this.refining && (now < this.pulseUntil || this.fastScale >= 0.85) && now - this.lastPulse > 66) {
      this.lastPulse = now;
      this.dirty = true;
    }
    LM.time.value = now / 1000;
    if (!this.dirty && !(still && this.refining)) {
      this.lastWasFast = false;
      return;
    }
    this.dirty = false;
    if (!still) {
      this.measure(now);
      this.renderFrame(false);
      this.lastWasFast = true;
    } else {
      this.lastWasFast = false;
      if (this.refining) {
        this.fade = this.reducedMotion ? 1 : Math.min(1, (now - this.lastMove - 200) / 320);
        if (this.fade >= 1) this.refining = false;
      }
      this.renderFrame(true);
    }
    this.lastFrameAt = now;
    this.frameL.forEach((f) => f());
  }

  /** Frame-time feedback: step the resolution of moving frames down below ~45 fps, back up above ~57. */
  private measure(now: number) {
    if (!this.effects.adaptive) return;
    if (this.lastWasFast && now - this.lastFrameAt < 150) {
      const dt = now - this.lastFrameAt;
      this.frameEMA += (dt - this.frameEMA) * 0.12;
      this.frameSamples++;
      if (this.frameSamples >= 24) {
        let s = this.fastScale;
        if (this.frameEMA > 1000 / 45) s = Math.max(0.5, s * 0.86);
        else if (this.frameEMA < 1000 / 57 && s < 1) s = Math.min(1, s * 1.08);
        this.frameSamples = 0;
        if (s !== this.fastScale) {
          this.fastScale = s;
          if (this.quality === 'lite') this.applyLitePR(s);
        }
      }
    }
  }

  private updateKeyLight() {
    // camera-relative key direction
    const dir = this.keyDir.clone().applyQuaternion(this.camera.quaternion);
    const center = new THREE.Vector3();
    let radius = 1;
    if (!this.sceneBox.isEmpty()) {
      const s = this.sceneBox.getBoundingSphere(new THREE.Sphere());
      const camDist = this.camera.position.distanceTo(this.controls.target);
      const viewR = camDist * Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * 1.6;
      if (viewR < s.radius) {
        center.copy(this.controls.target);
        radius = viewR;
      } else {
        center.copy(s.center);
        radius = s.radius;
      }
      const reach = s.radius + center.distanceTo(s.center) + 0.05;
      this.key.position.copy(center).addScaledVector(dir, reach);
      this.key.target.position.copy(center);
      const cam = this.key.shadow.camera;
      cam.left = -radius;
      cam.right = radius;
      cam.top = radius;
      cam.bottom = -radius;
      cam.near = 0.005;
      cam.far = reach * 2 + 0.1;
      cam.updateProjectionMatrix();
      const texel = (2 * radius) / this.key.shadow.mapSize.x;
      this.key.shadow.normalBias = texel * 1.6;
    } else {
      this.key.position.copy(dir).multiplyScalar(3);
      this.key.target.position.set(0, 0, 0);
    }
    this.key.updateMatrixWorld();
    this.key.target.updateMatrixWorld();
  }

  private renderFrame(full: boolean) {
    const r = this.renderer;
    this.camera.updateMatrixWorld();
    this.updateLandmarkAreas();
    this.updateKeyLight();
    // shadows: refreshed when the light, the visible set, explode or the pose changed; while moving only
    // on devices that keep up (otherwise faded out and refined once the view settles)
    let shadowAmt = 0;
    if (this.effects.shadows && r.shadowMap.enabled) {
      const live = this.fastScale >= 0.85;
      const q = this.camera.quaternion;
      const key = `${q.x.toFixed(3)},${q.y.toFixed(3)},${q.z.toFixed(3)},${this.controls.target.x.toFixed(3)},${this.controls.target.y.toFixed(3)},${this.camera.position.distanceTo(this.controls.target).toFixed(2)},${this.visVersion},${this.poseVersion}`;
      if (full || live) {
        if (key !== this.shadowKey) {
          r.shadowMap.needsUpdate = true;
          this.shadowKey = key;
        }
        shadowAmt = full && !live ? this.fade : 1;
      }
      if (!full && !live) this.shadowKey = '';
    }
    this.key.shadow.intensity = shadowAmt;

    if (!this.post) {
      r.render(this.scene, this.camera);
      return;
    }
    const camDist = this.camera.position.distanceTo(this.controls.target);
    const ao = full && this.effects.ao ? this.fade : 0;
    const dof = full && this.effects.dof ? this.fade : 0;
    const needShadow = r.shadowMap.needsUpdate;
    if (ao > 0 || dof > 0) {
      r.shadowMap.needsUpdate = false;
      this.renderGBuffer();
      if (ao > 0) this.post.runAO(THREE.MathUtils.clamp(camDist * 0.022, 0.006, 0.05));
      r.shadowMap.needsUpdate = needShadow;
    }
    this.post.beginScene(full ? 1 : this.fastScale);
    r.render(this.scene, this.camera);
    // focus: the selection, else the orbit target
    const focus = this.focusPoint();
    const viewDir = new THREE.Vector3();
    this.camera.getWorldDirection(viewDir);
    const focusZ = Math.max(0.02, focus.p.clone().sub(this.camera.position).dot(viewDir));
    this.post.finish({
      scale: full ? 1 : this.fastScale,
      ao: ao * 0.85,
      dof: dof * 0.8,
      bloom: this.effects.bloom && this.hasGlow() ? 0.55 : 0,
      focusZ,
      focusRange: Math.max(focus.r, camDist * 0.03),
    });
  }

  private focusPoint() {
    const box = new THREE.Box3();
    for (const [id, t] of this.tintMap) {
      if (t !== 'select' && t !== 'target') continue;
      const o = this.objects.get(id);
      if (o && o.root.visible) box.union(o.box.clone().translate(this._v.copy(o.root.position).sub(o.basePos)));
    }
    if (!box.isEmpty()) {
      const s = box.getBoundingSphere(new THREE.Sphere());
      return { p: s.center, r: s.radius * 0.8 };
    }
    return { p: this.controls.target.clone(), r: 0 };
  }

  private hasGlow() {
    if (this.pin) return true;
    for (const t of this.tintMap.values()) if (t !== 'hover' && t !== 'none') return true;
    return false;
  }

  private renderGBuffer() {
    const swaps: [THREE.Mesh, THREE.Material | THREE.Material[]][] = [];
    const hide: THREE.Object3D[] = [];
    for (const o of this.objects.values()) {
      if (!o.root.visible) continue;
      o.meshes.forEach((mesh, i) => {
        if (!mesh.visible) return;
        const m = o.mats[i];
        if (m.transparent) {
          mesh.visible = false;
          hide.push(mesh);
          return;
        }
        swaps.push([mesh, mesh.material]);
        mesh.material = gbufferFor(m);
      });
    }
    const extra: THREE.Mesh[] = [];
    if (this.lmMesh) extra.push(this.lmMesh);
    this.pin?.traverse((x) => (x as THREE.Mesh).isMesh && extra.push(x as THREE.Mesh));
    for (const m of extra) {
      swaps.push([m, m.material]);
      m.material = this.plainNormal;
    }
    this.post!.beginGBuffer();
    this.renderer.render(this.scene, this.camera);
    for (const [m, mat] of swaps) m.material = mat;
    for (const h of hide) h.visible = true;
  }

  screenshot(): string {
    const f = this.fade;
    this.fade = 1;
    this.renderFrame(true);
    this.fade = f;
    return this.renderer.domElement.toDataURL('image/png');
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.controls.dispose();
    this.motion.stop();
    this.post?.dispose();
    this.bgTex.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

function principalAxis(mesh: THREE.Mesh): THREE.Vector3 {
  const pos = (mesh.geometry as THREE.BufferGeometry).getAttribute('position') as THREE.BufferAttribute;
  const n = pos.count;
  const step = Math.max(1, Math.floor(n / 1500));
  const v = new THREE.Vector3();
  const mean = new THREE.Vector3();
  let cnt = 0;
  for (let i = 0; i < n; i += step) {
    v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
    mean.add(v);
    cnt++;
  }
  mean.divideScalar(Math.max(1, cnt));
  let xx = 0, xy = 0, xz = 0, yy = 0, yz = 0, zz = 0;
  for (let i = 0; i < n; i += step) {
    v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld).sub(mean);
    xx += v.x * v.x; xy += v.x * v.y; xz += v.x * v.z; yy += v.y * v.y; yz += v.y * v.z; zz += v.z * v.z;
  }
  const a = new THREE.Vector3(0.3, 1, 0.2).normalize();
  const b = new THREE.Vector3();
  for (let k = 0; k < 24; k++) {
    b.set(xx * a.x + xy * a.y + xz * a.z, xy * a.x + yy * a.y + yz * a.z, xz * a.x + yz * a.y + zz * a.z);
    if (b.lengthSq() < 1e-20) break;
    a.copy(b.normalize());
  }
  return a;
}
