import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import type { PackId, StructureRec, LandmarkRec } from '../data/types';
import { makeTissueMaterial, kindOf, KINDS, FUNCTION_COLORS, type TissueMaterial } from './materials';
import { layerOf, type LayerId } from './layers';

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

export type Quality = 'high' | 'lite';
export type Tint = 'none' | 'hover' | 'select' | 'target' | 'right' | 'wrong' | 'related';
export type ColorMode = 'real' | 'function';
export type ClipAxis = 'sagittal' | 'coronal' | 'transverse';

const TINTS: Record<Exclude<Tint, 'none'>, { color: string; amt: number; emissive: number }> = {
  hover: { color: '#fff4c7', amt: 0.2, emissive: 0.05 },
  select: { color: '#f2c230', amt: 0.42, emissive: 0.12 },
  target: { color: '#f2b705', amt: 0.66, emissive: 0.22 },
  right: { color: '#6fe0a8', amt: 0.5, emissive: 0.14 },
  wrong: { color: '#ff5a5f', amt: 0.5, emissive: 0.14 },
  related: { color: '#9fd8ff', amt: 0.32, emissive: 0.06 },
};

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

export class Engine {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly controls: OrbitControls;
  readonly world = new THREE.Group();
  readonly objects = new Map<string, SObj>();
  private composer: EffectComposer | null = null;
  private container: HTMLElement;
  private quality: Quality;
  private dirty = true;
  private raf = 0;
  private loader: GLTFLoader;
  private loadingPacks = new Map<PackId, Promise<void>>();
  readonly loadedPacks = new Set<PackId>();
  private base: string;
  private ro: ResizeObserver;

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
  private explodeAnim: { from: number; to: number; t0: number; dur: number } | null = null;
  private explodePivot = new THREE.Vector3();
  private clip: { axis: ClipAxis; t: number; flip: boolean } | null = null;
  private clipPlane = new THREE.Plane();
  private sceneBox = new THREE.Box3();
  private pickables: THREE.Object3D[] = [];
  private pickablesDirty = true;
  private regionBoxes: THREE.Box3[] | null = null;
  private regionPath: RegExp | null = null;
  private insets = { left: 0, right: 0, bottom: 0 };
  private batching = 0;
  private pendingApply = false;

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

  // events
  private hoverL = new Set<Listener<{ id: string | null; x: number; y: number; landmark?: LandmarkRec }>>();
  private pickL = new Set<Listener<PickResult | null>>();
  private dblL = new Set<Listener<PickResult>>();
  private frameL = new Set<Listener<void>>();

  constructor(container: HTMLElement, opts: { quality: Quality; base: string }) {
    this.container = container;
    this.quality = opts.quality;
    this.base = opts.base;
    this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const r = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: false });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.quality === 'lite' ? 1.5 : 2));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.08;
    r.localClippingEnabled = false;
    r.domElement.className = 'viewport-canvas';
    r.domElement.setAttribute('aria-label', '3D anatomy model');
    r.domElement.setAttribute('role', 'img');
    container.appendChild(r.domElement);
    this.renderer = r;

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.01, 30);
    this.camera.position.set(0, 1.0, 3.6);
    this.scene.add(this.camera);
    this.scene.add(this.world);

    // lighting: a warm key lamp and cool rim that travel with the camera, plus soft image-based light
    const pmrem = new THREE.PMREMGenerator(r);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    (this.scene as any).environmentIntensity = 0.55;
    const key = new THREE.DirectionalLight('#fff0dc', 2.3);
    key.position.set(-1.4, 1.6, 2.2);
    key.target.position.set(0, 0, -1);
    const fill = new THREE.DirectionalLight('#d9ecff', 0.55);
    fill.position.set(1.8, -0.4, 1.0);
    fill.target.position.set(0, 0, -1);
    const rim = new THREE.DirectionalLight('#cfe9e3', 1.1);
    rim.position.set(1.2, 1.4, -2.2);
    rim.target.position.set(0, 0, -1);
    this.camera.add(key, key.target, fill, fill.target, rim, rim.target);
    this.scene.add(new THREE.HemisphereLight('#fff6ea', '#1f4a43', 0.35));

    this.scene.background = this.makeBackdrop();

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

    this.setupPost();
    this.bindPointer();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.resize();
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  // ------------------------------------------------------------------ setup
  private makeBackdrop() {
    const cv = document.createElement('canvas');
    cv.width = 512;
    cv.height = 512;
    const g = cv.getContext('2d')!;
    const grad = g.createRadialGradient(256, 210, 30, 256, 256, 400);
    grad.addColorStop(0, '#2a5d55');
    grad.addColorStop(0.55, '#184039');
    grad.addColorStop(1, '#0c2522');
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 512);
    // faint woven texture, like a surgical drape
    const img = g.getImageData(0, 0, 512, 512);
    for (let i = 0; i < img.data.length; i += 4) {
      const x = (i / 4) % 512, y = Math.floor(i / 4 / 512);
      const w = ((x % 4 < 2) !== (y % 4 < 2) ? 1.5 : -1.5) + (Math.random() - 0.5) * 2.5;
      img.data[i] += w; img.data[i + 1] += w; img.data[i + 2] += w;
    }
    g.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  private setupPost() {
    if (this.quality !== 'high') {
      this.composer = null;
      return;
    }
    const size = this.renderer.getSize(new THREE.Vector2());
    const composer = new EffectComposer(this.renderer);
    composer.addPass(new RenderPass(this.scene, this.camera));
    const gtao = new GTAOPass(this.scene, this.camera, Math.max(1, size.x), Math.max(1, size.y));
    gtao.output = GTAOPass.OUTPUT.Default;
    gtao.blendIntensity = 0.85;
    gtao.updateGtaoMaterial({ radius: 0.05, distanceExponent: 1.4, thickness: 0.6, scale: 1, samples: 12 });
    gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    composer.addPass(gtao);
    composer.addPass(new OutputPass());
    this.composer = composer;
  }

  setQuality(q: Quality) {
    if (q === this.quality) return;
    this.quality = q;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q === 'lite' ? 1.5 : 2));
    this.composer?.dispose();
    this.setupPost();
    this.resize();
  }

  getQuality() {
    return this.quality;
  }

  private resize() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.applyViewOffset();
    this.composer?.setSize(w, h);
    this.invalidate();
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
    const url = `${this.base}models/${this.quality === 'lite' ? 'lite/' : ''}${pack}.glb`;
    const p = new Promise<void>((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          try {
            this.ingest(gltf.scene, recs);
            this.loadedPacks.add(pack);
            this.pickablesDirty = true;
            this.applyAll();
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
      node.updateMatrixWorld(true);
      const meshes: THREE.Mesh[] = [];
      node.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
      });
      const mats: TissueMaterial[] = [];
      let fiberAxis: THREE.Vector3 | null = null;
      for (const mesh of meshes) {
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
        g.computeBoundingBox();
        g.computeBoundingSphere();
        const srcName = (mesh.material as THREE.Material).name || rec.mats[0] || 'organ';
        (mesh.material as THREE.Material).dispose();
        const kind = kindOf(srcName);
        const m = makeTissueMaterial(kind, { lite });
        if (KINDS[kind].fiber) {
          if (!fiberAxis) fiberAxis = principalAxis(mesh);
          m.userData.org.uFiberDir.value.copy(fiberAxis);
        }
        mesh.material = m;
        mesh.userData.sid = rec.id;
        mesh.renderOrder = KINDS[kind].opacity !== undefined ? 2 : 0;
        mats.push(m);
      }
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
  setInsets(left: number, right: number, bottom = 0) {
    this.insets = { left, right, bottom };
    this.applyViewOffset();
    this.invalidate();
  }

  private applyViewOffset() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    const shift = (this.insets.left - this.insets.right) / 2;
    const shiftY = this.insets.bottom / 2;
    if (Math.abs(shift) < 1 && shiftY < 1) this.camera.clearViewOffset();
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
    this.updateExplodeTargets();
    this.updateClip();
    this.invalidate();
  }

  private applyLook(o: SObj) {
    const layerOp = o.layer === 'attachments' ? 1 : this.layerOpacity.get(o.layer) ?? 1;
    const ghost = this.xray && this.focusSet !== null && !this.focusSet.has(o.rec.id) && o.layer !== 'attachments';
    const tint = o.tint === 'none' ? null : TINTS[o.tint];
    const clipping = this.clip !== null;
    for (const m of o.mats) {
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
      const side = clipping && !transparent ? THREE.DoubleSide : ud.kind === 'origin' || ud.kind === 'insertion' ? THREE.DoubleSide : THREE.FrontSide;
      if (m.side !== side) {
        m.side = side;
        m.needsUpdate = true;
      }
      // base colour (function view recolours muscles by action group)
      if (this.colorMode === 'function' && ud.kind === 'muscle' && o.rec.fn && FUNCTION_COLORS[o.rec.fn]) m.color.set(FUNCTION_COLORS[o.rec.fn]);
      else m.color.copy(ud.baseColor);
      if (tint) {
        ud.org.uTint.value.set(tint.color);
        ud.org.uTintAmt.value = tint.amt;
        m.emissive.set(tint.color);
        m.emissiveIntensity = tint.emissive;
      } else {
        ud.org.uTintAmt.value = 0;
        m.emissive.setRGB(0, 0, 0);
        m.emissiveIntensity = 0;
      }
    }
  }

  // ------------------------------------------------------------------ explode
  setExplode(f: number, animate = true) {
    f = Math.max(0, Math.min(1, f));
    if (!animate || this.reducedMotion) {
      this.explode = f;
      this.explodeAnim = null;
      this.positionExploded();
      return;
    }
    this.explodeAnim = { from: this.explode, to: f, t0: performance.now(), dur: 450 };
    this.invalidate();
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

  /** Current world position of a point on a structure, taking explode offset into account. */
  worldPointOn(id: string, p: THREE.Vector3) {
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
    const freeH = Math.max(120, this.container.clientHeight - this.insets.bottom);
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
    this.flyTo(p.clone().addScaledVector(dir, dist), p.clone(), instant);
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
    if (!list.length) {
      this.invalidate();
      return;
    }
    const geo = new THREE.SphereGeometry(0.0021, 12, 8);
    const mat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.35, metalness: 0, emissive: '#ffffff', emissiveIntensity: 0.18 });
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
    this.lmList.forEach((l, i) => {
      const p = this.worldPointOn(l.on, new THREE.Vector3(...l.p)).addScaledVector(new THREE.Vector3(...l.n), 0.0012);
      m.makeTranslation(p.x, p.y, p.z);
      this.lmMesh!.setMatrixAt(i, m);
      this.lmMesh!.setColorAt(i, c.set(l.k === this.lmHighlight ? '#f2c230' : '#f4efe2'));
    });
    this.lmMesh.instanceMatrix.needsUpdate = true;
    if (this.lmMesh.instanceColor) this.lmMesh.instanceColor.needsUpdate = true;
    this.lmMesh.computeBoundingSphere();
  }

  highlightLandmark(key: string | null) {
    this.lmHighlight = key;
    this.updateLandmarkMatrices();
    this.invalidate();
  }

  /** OSPE-style pin stuck into a surface point. */
  setPin(p: THREE.Vector3 | null, n?: THREE.Vector3, color = '#f2c230', size = 1) {
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
      new THREE.CylinderGeometry(0.00045 * size, 0.00025 * size, len, 8),
      new THREE.MeshStandardMaterial({ color: '#d9dde0', metalness: 0.9, roughness: 0.25 }),
    );
    needle.position.y = len / 2 - 0.002;
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.0034 * size, 20, 14),
      new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.05, emissive: color, emissiveIntensity: 0.25 }),
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
      this.raycaster.far = dist - 0.004;
      (this.raycaster as any).firstHitOnly = true;
      const hits = this.raycaster.intersectObjects(this.getPickables(), false);
      out.occluded = hits.some((h) => !this.isGhostMesh(h.object));
      this.raycaster.far = Infinity;
    }
    return out;
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

  private isGhostMesh(obj: THREE.Object3D) {
    const m = (obj as THREE.Mesh).material as TissueMaterial | undefined;
    return !!m && m.opacity < 0.2;
  }

  pickAt(clientX: number, clientY: number): PickResult | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    (this.raycaster as any).firstHitOnly = false;
    if (this.lmMesh) {
      const lh = this.raycaster.intersectObject(this.lmMesh, false);
      if (lh.length && lh[0].instanceId !== undefined) {
        const l = this.lmList[lh[0].instanceId];
        return { id: l.on, point: lh[0].point, landmark: l };
      }
    }
    (this.raycaster as any).firstHitOnly = true;
    const hits = this.raycaster.intersectObjects(this.getPickables(), false);
    if (!hits.length) return null;
    const solid = hits.find((h) => !this.isGhostMesh(h.object)) ?? hits[0];
    const sid = solid.object.userData.sid as string;
    return { id: sid, point: solid.point };
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

  // ------------------------------------------------------------------ loop
  private loop(now: number) {
    this.raf = requestAnimationFrame(this.loop);
    if (this.camTween) {
      const t = Math.min(1, (now - this.camTween.start) / this.camTween.dur);
      const e = easeInOut(t);
      this.camera.position.lerpVectors(this.camTween.p0, this.camTween.p1, e);
      this.controls.target.lerpVectors(this.camTween.t0v, this.camTween.t1v, e);
      if (t >= 1) this.camTween = null;
      this.dirty = true;
    }
    if (this.explodeAnim) {
      const a = this.explodeAnim;
      const t = Math.min(1, (now - a.t0) / a.dur);
      this.explode = a.from + (a.to - a.from) * easeInOut(t);
      this.positionExploded();
      if (this.lmMesh) this.updateLandmarkMatrices();
      if (t >= 1) this.explodeAnim = null;
    }
    const moved = this.controls.update();
    if (moved) this.dirty = true;
    if (this.pointerMoved && this.pointerInside && !this.downAt && this.lastPointer && this.lastPointer.type === 'mouse') {
      this.pointerMoved = false;
      const hit = this.pickAt(this.lastPointer.x, this.lastPointer.y);
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.emitHover(hit?.id ?? null, this.lastPointer.x - rect.left, this.lastPointer.y - rect.top, hit?.landmark);
    }
    if (!this.dirty) return;
    this.dirty = false;
    if (this.composer && this.quality === 'high') this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    this.frameL.forEach((f) => f());
  }

  screenshot(): string {
    if (this.composer && this.quality === 'high') this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL('image/png');
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.controls.dispose();
    this.composer?.dispose();
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
