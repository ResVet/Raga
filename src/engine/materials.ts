import * as THREE from 'three';
import { patchOrganic, makeRigUniforms, makeGBufferMaterial, makeRigDepthMaterial, type OrganicParams, type OrganicUniforms, type RigUniforms } from './organic';

export type TissueKind =
  | 'bone' | 'suture' | 'cartilage' | 'enamel' | 'dentine'
  | 'muscle' | 'tendon' | 'ligament' | 'capsule' | 'fascia' | 'bursa' | 'fat'
  | 'artery' | 'vein' | 'pulmonary_artery' | 'pulmonary_vein' | 'myocardium'
  | 'nerve' | 'lymph' | 'gland' | 'mucosa' | 'bronchus' | 'lung' | 'duct' | 'intestine'
  | 'peritoneum' | 'gallbladder' | 'organ' | 'skin' | 'hair' | 'nail'
  | 'origin' | 'insertion';

/** micro: 0 none, 1 bone porosity, 2 muscle fibre striation, 3 tendon/ligament fibres */
interface Micro {
  type: 0 | 1 | 2 | 3;
  amt: number; // albedo modulation
  bump: number; // height in metres
}

interface KindDef {
  color: string;
  roughness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
  sheenColor?: string;
  opacity?: number; // < 1 means translucent by default
  organic: OrganicParams; // bump = macro height in metres
  micro?: Micro;
  fiber?: boolean; // use per-mesh principal axis as fibre direction
  sss?: [string, number, number]; // scatter colour, strength, wrap
  ao?: [number, number]; // baked AO strength on ambient and on direct diffuse
  specular?: number;
  emissive?: number; // self-illumination in the base colour (origin/insertion patches)
  rimBase?: number; // permanent rim outline in the base colour
}

const ISO = (scale: number, colorVar: number, bump: number, fine = 0.6): OrganicParams => ({ scale, colorVar, bump, stretch: 1, fine });
const FIB = (scale: number, colorVar: number, bump: number, stretch = 0.07): OrganicParams => ({ scale, colorVar, bump, stretch, fine: 0.8 });

export const KINDS: Record<TissueKind, KindDef> = {
  bone: { color: '#e6d9be', roughness: 0.58, clearcoat: 0.06, clearcoatRoughness: 0.5, organic: ISO(160, 0.08, 0.00006, 0.7), micro: { type: 1, amt: 0.1, bump: 0.000035 }, sss: ['#ffb68a', 0.18, 0.25], ao: [1, 0.55] },
  suture: { color: '#b9a582', roughness: 0.7, organic: ISO(260, 0.1, 0.00004), micro: { type: 1, amt: 0.08, bump: 0.00002 }, ao: [1, 0.5] },
  cartilage: { color: '#d4e3e6', roughness: 0.26, clearcoat: 0.9, clearcoatRoughness: 0.12, organic: ISO(90, 0.05, 0.00002), sss: ['#bfe3ff', 0.45, 0.45], ao: [0.9, 0.4] },
  enamel: { color: '#f4f0e6', roughness: 0.18, clearcoat: 0.8, clearcoatRoughness: 0.08, organic: ISO(160, 0.03, 0.00001), ao: [0.9, 0.4] },
  dentine: { color: '#e5d29e', roughness: 0.5, organic: ISO(160, 0.05, 0.00002), ao: [0.9, 0.4] },
  muscle: { color: '#8a2420', roughness: 0.46, clearcoat: 0.32, clearcoatRoughness: 0.32, sheen: 0.3, sheenColor: '#ff8a78', organic: FIB(380, 0.2, 0.00005, 0.06), micro: { type: 2, amt: 0.22, bump: 0.000032 }, fiber: true, sss: ['#ff3020', 0.55, 0.5], ao: [1, 0.6] },
  tendon: { color: '#ece4d4', roughness: 0.24, clearcoat: 0.85, clearcoatRoughness: 0.14, sheen: 0.55, sheenColor: '#ffffff', organic: FIB(480, 0.06, 0.00002, 0.05), micro: { type: 3, amt: 0.08, bump: 0.000014 }, fiber: true, sss: ['#ffd9c0', 0.25, 0.35], ao: [1, 0.5] },
  ligament: { color: '#e0d8c5', roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.2, sheen: 0.4, sheenColor: '#ffffff', organic: FIB(440, 0.07, 0.00002, 0.08), micro: { type: 3, amt: 0.08, bump: 0.000014 }, fiber: true, sss: ['#ffd9c0', 0.2, 0.3], ao: [1, 0.5] },
  capsule: { color: '#e9e3d6', roughness: 0.4, clearcoat: 0.45, clearcoatRoughness: 0.2, opacity: 0.62, organic: FIB(380, 0.05, 0.00001, 0.2), fiber: true, ao: [0.6, 0.2] },
  fascia: { color: '#ece8de', roughness: 0.38, clearcoat: 0.45, clearcoatRoughness: 0.2, opacity: 0.5, organic: FIB(420, 0.05, 0.00001, 0.15), fiber: true, ao: [0.5, 0.2] },
  bursa: { color: '#a3c9d9', roughness: 0.22, clearcoat: 0.8, clearcoatRoughness: 0.1, opacity: 0.55, organic: ISO(120, 0.04, 0.00001), ao: [0.5, 0.2] },
  fat: { color: '#e8cc6c', roughness: 0.45, clearcoat: 0.4, organic: ISO(260, 0.1, 0.00004), sss: ['#ffcc55', 0.5, 0.5], ao: [1, 0.5] },
  artery: { color: '#b8242f', roughness: 0.28, clearcoat: 0.7, clearcoatRoughness: 0.18, organic: ISO(160, 0.06, 0.00001), sss: ['#ff2a1a', 0.45, 0.4], ao: [1, 0.55] },
  vein: { color: '#2f509f', roughness: 0.3, clearcoat: 0.65, clearcoatRoughness: 0.2, organic: ISO(160, 0.06, 0.00001), sss: ['#5a6cff', 0.3, 0.4], ao: [1, 0.55] },
  pulmonary_artery: { color: '#4258b6', roughness: 0.3, clearcoat: 0.65, organic: ISO(160, 0.06, 0.00001), sss: ['#5a6cff', 0.3, 0.4], ao: [1, 0.55] },
  pulmonary_vein: { color: '#c13a49', roughness: 0.3, clearcoat: 0.65, organic: ISO(160, 0.06, 0.00001), sss: ['#ff2a1a', 0.4, 0.4], ao: [1, 0.55] },
  myocardium: { color: '#9e3530', roughness: 0.44, clearcoat: 0.4, clearcoatRoughness: 0.3, sheen: 0.4, sheenColor: '#ff9a8a', organic: ISO(300, 0.14, 0.00004), micro: { type: 2, amt: 0.12, bump: 0.00002 }, fiber: true, sss: ['#ff3020', 0.55, 0.5], ao: [1, 0.6] },
  nerve: { color: '#efd06c', roughness: 0.36, clearcoat: 0.45, clearcoatRoughness: 0.25, sheen: 0.35, sheenColor: '#fff3c4', organic: FIB(520, 0.08, 0.00002, 0.12), micro: { type: 3, amt: 0.06, bump: 0.00001 }, fiber: true, sss: ['#ffd27a', 0.35, 0.4], ao: [1, 0.5] },
  lymph: { color: '#98bd4a', roughness: 0.38, clearcoat: 0.45, organic: ISO(260, 0.1, 0.00003), sss: ['#c8ff70', 0.35, 0.4], ao: [1, 0.5] },
  gland: { color: '#c77b55', roughness: 0.44, clearcoat: 0.35, organic: ISO(320, 0.12, 0.00004), sss: ['#ff8a5a', 0.45, 0.45], ao: [1, 0.55] },
  mucosa: { color: '#c65d65', roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.18, organic: ISO(260, 0.1, 0.00003), sss: ['#ff5a5a', 0.45, 0.45], ao: [1, 0.55] },
  bronchus: { color: '#e6cdbb', roughness: 0.36, clearcoat: 0.5, organic: ISO(240, 0.06, 0.00003), sss: ['#ffd0b8', 0.3, 0.4], ao: [1, 0.5] },
  lung: { color: '#d8a3a1', roughness: 0.5, clearcoat: 0.35, organic: ISO(340, 0.14, 0.00004), sss: ['#ff9a9a', 0.5, 0.5], ao: [1, 0.55] },
  duct: { color: '#d6b36b', roughness: 0.36, clearcoat: 0.5, organic: ISO(200, 0.06, 0.00002), ao: [1, 0.5] },
  intestine: { color: '#cf917d', roughness: 0.4, clearcoat: 0.5, organic: ISO(220, 0.1, 0.00003), sss: ['#ff8a70', 0.45, 0.45], ao: [1, 0.55] },
  peritoneum: { color: '#ecdccc', roughness: 0.36, clearcoat: 0.5, opacity: 0.5, organic: ISO(200, 0.05, 0.00001), ao: [0.5, 0.2] },
  gallbladder: { color: '#5f8d4e', roughness: 0.32, clearcoat: 0.6, organic: ISO(200, 0.08, 0.00002), sss: ['#9aff70', 0.3, 0.4], ao: [1, 0.5] },
  organ: { color: '#b9715f', roughness: 0.44, clearcoat: 0.35, organic: ISO(260, 0.1, 0.00003), sss: ['#ff7a5a', 0.45, 0.45], ao: [1, 0.55] },
  skin: { color: '#d6a385', roughness: 0.5, clearcoat: 0.12, sheen: 0.3, sheenColor: '#ffd9c7', opacity: 0.38, organic: ISO(400, 0.06, 0.00001), sss: ['#ff7a5a', 0.5, 0.5], ao: [0.6, 0.3] },
  hair: { color: '#2b211b', roughness: 0.7, organic: ISO(900, 0.1, 0.00001), ao: [0.6, 0.3] },
  nail: { color: '#efd6cc', roughness: 0.28, clearcoat: 0.6, organic: ISO(200, 0.04, 0.00001), ao: [0.8, 0.4] },
  origin: { color: '#e5484d', roughness: 0.42, clearcoat: 0.4, organic: ISO(200, 0.05, 0), emissive: 0.45, rimBase: 0.9 },
  insertion: { color: '#3b82f6', roughness: 0.42, clearcoat: 0.4, organic: ISO(200, 0.05, 0), emissive: 0.45, rimBase: 0.9 },
};

/** Muscle colours for the "function" view, keyed by Z-Anatomy's functional material names. */
export const FUNCTION_COLORS: Record<string, string> = {
  Flexion: '#c0392b', 'Flexion fingers': '#e0614f', 'Flexion hand/foot': '#a93226',
  Extension: '#2e86c1', 'Extensor extremities': '#5dade2', 'Extension hand/foot': '#1f618d',
  Abductor: '#27ae60', Adductor: '#8e44ad', 'External rotation': '#f39c12', 'Internal rotator': '#d35400',
  Levator: '#16a085', Depressor: '#7f8c8d', Biarticular: '#c71585', 'Orbicularis/Constrictor': '#b7950b',
  Superficial: '#839192', Trapezius: '#2874a6', Diaphragm: '#a04000', Masticator: '#6c3483', Ingestion: '#ca6f1e', Phonation: '#1abc9c',
};

export function kindOf(name: string): TissueKind {
  return (name in KINDS ? name : 'organ') as TissueKind;
}

export interface TissueMaterial extends THREE.MeshPhysicalMaterial {
  userData: {
    kind: TissueKind;
    baseColor: THREE.Color;
    baseOpacity: number;
    org: OrganicUniforms;
    rig: RigUniforms;
    gbuf?: THREE.MeshNormalMaterial;
    emissive: number;
    rimBase: THREE.Vector4;
  };
}

/** Accent colours shared by every tissue material (linear, set from sRGB hex). */
export const ACCENT = {
  eosin: { value: new THREE.Color('#ff5d8f') },
  violet: { value: new THREE.Color('#7b6cff') },
};

/** Landmark decal slots shared by every tissue material; each structure owns some via uLmBits. */
export const LM_SLOTS = 32;
const v4s = () => Array.from({ length: LM_SLOTS }, () => new THREE.Vector4());
export const LM = {
  pos: { value: v4s() },
  col: { value: v4s() },
  nrm: { value: v4s() },
  time: { value: 0 },
};

const ORGANIC_KEY = 'raga-organic-v2';

/**
 * Tissue material. `rig` uniforms may be shared by all meshes of one structure (they bend together);
 * pass none to get a private set.
 */
export function makeTissueMaterial(kind: TissueKind, opts: { lite?: boolean; ao?: boolean; rig?: RigUniforms } = {}): TissueMaterial {
  const def = KINDS[kind];
  const lite = !!opts.lite;
  const translucent = (def.opacity ?? 1) < 1;
  const m = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(def.color),
    roughness: def.roughness,
    metalness: 0,
    clearcoat: lite ? 0 : def.clearcoat ?? 0,
    clearcoatRoughness: def.clearcoatRoughness ?? 0.4,
    sheen: lite ? 0 : def.sheen ?? 0,
    sheenColor: new THREE.Color(def.sheenColor ?? '#ffffff'),
    sheenRoughness: 0.55,
    specularIntensity: def.specular ?? 1,
    transparent: translucent,
    opacity: def.opacity ?? 1,
    depthWrite: !translucent,
    side: THREE.FrontSide,
  }) as TissueMaterial;
  if (kind === 'origin' || kind === 'insertion') {
    m.polygonOffset = true;
    m.polygonOffsetFactor = -2;
    m.polygonOffsetUnits = -6;
    m.side = THREE.DoubleSide;
  }
  const rig = opts.rig ?? makeRigUniforms();
  const sss = def.sss;
  const micro = def.micro;
  const org: OrganicUniforms = {
    ...rig,
    uOrgScale: { value: def.organic.scale },
    uOrgVar: { value: lite ? def.organic.colorVar * 0.8 : def.organic.colorVar },
    uOrgBump: { value: lite ? 0 : def.organic.bump },
    uOrgStretch: { value: def.organic.stretch },
    uOrgFine: { value: def.organic.fine ?? 0.6 },
    uFiberDir: { value: new THREE.Vector3(0, 1, 0) },
    uMicro: { value: lite || !micro ? 0 : micro.type },
    uMicroAmt: { value: micro?.amt ?? 0 },
    uMicroBump: { value: lite || !micro ? 0 : micro.bump },
    uCutColor: { value: new THREE.Color(kind === 'bone' ? '#b8956a' : kind === 'muscle' ? '#5a1512' : '#7a6f62') },
    uTint: { value: new THREE.Color('#000000') },
    uTintAmt: { value: 0 },
    uRim: { value: new THREE.Vector4(0, 0, 0, 0) },
    uGlow: { value: 0 },
    uAOOn: { value: opts.ao ? 1 : 0 },
    uAOStr: { value: def.ao?.[0] ?? 0.8 },
    uAODir: { value: def.ao?.[1] ?? 0.4 },
    uSSS: { value: sss && !lite ? (() => { const c = new THREE.Color(sss[0]); return new THREE.Vector4(c.r, c.g, c.b, sss[1]); })() : new THREE.Vector4(0, 0, 0, 0) },
    uSSSWrap: { value: sss?.[2] ?? 0.4 },
    uContract: { value: 0 },
    uStretch: { value: 0 },
    uEosin: ACCENT.eosin,
    uViolet: ACCENT.violet,
    uRestModel: { value: new THREE.Matrix4() },
    uRestNormal: { value: new THREE.Matrix3() },
    uLmBits: { value: 0 },
    uLmPos: LM.pos,
    uLmCol: LM.col,
    uLmNrm: LM.nrm,
    uLmTime: LM.time,
  };
  const bc = new THREE.Color(def.color);
  const rimBase = def.rimBase ? new THREE.Vector4(Math.min(1, bc.r * 1.6 + 0.1), Math.min(1, bc.g * 1.6 + 0.1), Math.min(1, bc.b * 1.6 + 0.1), def.rimBase) : new THREE.Vector4(0, 0, 0, 0);
  m.userData = { kind, baseColor: m.color.clone(), baseOpacity: m.opacity, org, rig, emissive: lite ? (def.emissive ?? 0) * 0.7 : def.emissive ?? 0, rimBase };
  m.onBeforeCompile = (shader) => patchOrganic(shader as never, org);
  m.customProgramCacheKey = () => ORGANIC_KEY;
  return m;
}

/** G-buffer twin of a tissue material: same rig, so GTAO and depth of field follow the motion. */
export function gbufferFor(m: TissueMaterial): THREE.MeshNormalMaterial {
  if (!m.userData.gbuf) {
    const g = makeGBufferMaterial(m.userData.rig);
    g.side = m.side;
    m.userData.gbuf = g;
  }
  m.userData.gbuf.side = m.side;
  return m.userData.gbuf;
}

export { makeRigDepthMaterial, makeRigUniforms };

/** Simple, cheap material for the GPU-limited path and for pins. */
export function makePinMaterial(color: string) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.1, emissive: new THREE.Color(color), emissiveIntensity: 0.25 });
}
