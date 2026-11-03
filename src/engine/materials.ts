import * as THREE from 'three';
import { patchOrganic, type OrganicParams, type OrganicUniforms } from './organic';

export type TissueKind =
  | 'bone' | 'suture' | 'cartilage' | 'enamel' | 'dentine'
  | 'muscle' | 'tendon' | 'ligament' | 'capsule' | 'fascia' | 'bursa' | 'fat'
  | 'artery' | 'vein' | 'pulmonary_artery' | 'pulmonary_vein' | 'myocardium'
  | 'nerve' | 'lymph' | 'gland' | 'mucosa' | 'bronchus' | 'lung' | 'duct' | 'intestine'
  | 'peritoneum' | 'gallbladder' | 'organ' | 'skin' | 'hair' | 'nail'
  | 'origin' | 'insertion';

interface KindDef {
  color: string;
  roughness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
  sheenColor?: string;
  opacity?: number; // < 1 means translucent by default
  organic: OrganicParams;
  fiber?: boolean; // use per-mesh principal axis as fibre direction
  functional?: string; // colour in "function" view (muscles use their own table)
}

const ISO = (scale: number, colorVar: number, bump: number, fine = 0.6): OrganicParams => ({ scale, colorVar, bump, stretch: 1, fine });
const FIB = (scale: number, colorVar: number, bump: number, stretch = 0.07): OrganicParams => ({ scale, colorVar, bump, stretch, fine: 0.8 });

export const KINDS: Record<TissueKind, KindDef> = {
  bone: { color: '#e4d7bd', roughness: 0.62, clearcoat: 0.08, organic: ISO(190, 0.09, 0.0026, 0.7) },
  suture: { color: '#b9a582', roughness: 0.7, organic: ISO(260, 0.1, 0.002) },
  cartilage: { color: '#cfdfe3', roughness: 0.3, clearcoat: 0.55, clearcoatRoughness: 0.25, organic: ISO(90, 0.05, 0.0007) },
  enamel: { color: '#f4f0e6', roughness: 0.22, clearcoat: 0.8, organic: ISO(160, 0.03, 0.0004) },
  dentine: { color: '#e5d29e', roughness: 0.5, organic: ISO(160, 0.05, 0.0006) },
  muscle: { color: '#7c211d', roughness: 0.5, clearcoat: 0.22, clearcoatRoughness: 0.45, sheen: 0.25, sheenColor: '#ff7a6a', organic: FIB(420, 0.24, 0.0018, 0.06), fiber: true },
  tendon: { color: '#e6dfd1', roughness: 0.3, clearcoat: 0.4, clearcoatRoughness: 0.3, sheen: 0.6, sheenColor: '#ffffff', organic: FIB(520, 0.07, 0.0008, 0.05), fiber: true },
  ligament: { color: '#ddd6c4', roughness: 0.36, clearcoat: 0.3, sheen: 0.4, sheenColor: '#ffffff', organic: FIB(460, 0.07, 0.0007, 0.08), fiber: true },
  capsule: { color: '#e9e3d6', roughness: 0.45, clearcoat: 0.25, opacity: 0.62, organic: FIB(380, 0.05, 0.0004, 0.2), fiber: true },
  fascia: { color: '#ece8de', roughness: 0.42, clearcoat: 0.3, opacity: 0.5, organic: FIB(420, 0.05, 0.0004, 0.15), fiber: true },
  bursa: { color: '#a3c9d9', roughness: 0.28, clearcoat: 0.6, opacity: 0.55, organic: ISO(120, 0.04, 0.0003) },
  fat: { color: '#e8cc6c', roughness: 0.5, clearcoat: 0.3, organic: ISO(260, 0.1, 0.0012) },
  artery: { color: '#b3232e', roughness: 0.3, clearcoat: 0.55, clearcoatRoughness: 0.3, organic: ISO(160, 0.06, 0.0004) },
  vein: { color: '#2e4f9c', roughness: 0.32, clearcoat: 0.5, clearcoatRoughness: 0.3, organic: ISO(160, 0.06, 0.0004) },
  pulmonary_artery: { color: '#4258b6', roughness: 0.32, clearcoat: 0.5, organic: ISO(160, 0.06, 0.0004) },
  pulmonary_vein: { color: '#c13a49', roughness: 0.32, clearcoat: 0.5, organic: ISO(160, 0.06, 0.0004) },
  myocardium: { color: '#9a3430', roughness: 0.48, clearcoat: 0.3, sheen: 0.4, sheenColor: '#ff9a8a', organic: ISO(300, 0.14, 0.0012) },
  nerve: { color: '#efcf68', roughness: 0.42, clearcoat: 0.2, sheen: 0.3, sheenColor: '#fff3c4', organic: ISO(520, 0.08, 0.0005) },
  lymph: { color: '#98bd4a', roughness: 0.42, clearcoat: 0.3, organic: ISO(260, 0.1, 0.0008) },
  gland: { color: '#c77b55', roughness: 0.5, clearcoat: 0.2, organic: ISO(320, 0.12, 0.0012) },
  mucosa: { color: '#c65d65', roughness: 0.38, clearcoat: 0.4, organic: ISO(260, 0.1, 0.0008) },
  bronchus: { color: '#e6cdbb', roughness: 0.4, clearcoat: 0.35, organic: ISO(240, 0.06, 0.0007) },
  lung: { color: '#d8a3a1', roughness: 0.55, clearcoat: 0.25, organic: ISO(340, 0.14, 0.0011) },
  duct: { color: '#d6b36b', roughness: 0.4, clearcoat: 0.3, organic: ISO(200, 0.06, 0.0005) },
  intestine: { color: '#cf917d', roughness: 0.45, clearcoat: 0.3, organic: ISO(220, 0.1, 0.0009) },
  peritoneum: { color: '#ecdccc', roughness: 0.4, clearcoat: 0.3, opacity: 0.5, organic: ISO(200, 0.05, 0.0003) },
  gallbladder: { color: '#5f8d4e', roughness: 0.38, clearcoat: 0.4, organic: ISO(200, 0.08, 0.0005) },
  organ: { color: '#b9715f', roughness: 0.48, clearcoat: 0.25, organic: ISO(260, 0.1, 0.0009) },
  skin: { color: '#d6a385', roughness: 0.55, clearcoat: 0.1, sheen: 0.3, sheenColor: '#ffd9c7', opacity: 0.38, organic: ISO(400, 0.06, 0.0005) },
  hair: { color: '#2b211b', roughness: 0.7, organic: ISO(900, 0.1, 0.0003) },
  nail: { color: '#efd6cc', roughness: 0.3, clearcoat: 0.5, organic: ISO(200, 0.04, 0.0003) },
  origin: { color: '#d63c33', roughness: 0.5, organic: ISO(200, 0.05, 0) },
  insertion: { color: '#2d6ed6', roughness: 0.5, organic: ISO(200, 0.05, 0) },
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
  };
}

const ORGANIC_KEY = 'raga-organic-v1';

export function makeTissueMaterial(kind: TissueKind, opts: { lite?: boolean } = {}): TissueMaterial {
  const def = KINDS[kind];
  const translucent = (def.opacity ?? 1) < 1;
  const m = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(def.color),
    roughness: def.roughness,
    metalness: 0,
    clearcoat: opts.lite ? 0 : def.clearcoat ?? 0,
    clearcoatRoughness: def.clearcoatRoughness ?? 0.4,
    sheen: opts.lite ? 0 : def.sheen ?? 0,
    sheenColor: new THREE.Color(def.sheenColor ?? '#ffffff'),
    sheenRoughness: 0.6,
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
  const org: OrganicUniforms = {
    uOrgScale: { value: def.organic.scale },
    uOrgVar: { value: opts.lite ? def.organic.colorVar * 0.8 : def.organic.colorVar },
    uOrgBump: { value: opts.lite ? 0 : def.organic.bump },
    uOrgStretch: { value: def.organic.stretch },
    uOrgFine: { value: def.organic.fine ?? 0.6 },
    uFiberDir: { value: new THREE.Vector3(0, 1, 0) },
    uCutColor: { value: new THREE.Color(kind === 'bone' ? '#c9a77a' : kind === 'muscle' ? '#6e1d1a' : '#8a7f72') },
    uTint: { value: new THREE.Color('#000000') },
    uTintAmt: { value: 0 },
  };
  m.userData = { kind, baseColor: m.color.clone(), baseOpacity: m.opacity, org };
  m.onBeforeCompile = (shader) => patchOrganic(shader as never, org);
  m.customProgramCacheKey = () => ORGANIC_KEY;
  return m;
}

/** Simple, cheap material for the GPU-limited path and for pins. */
export function makePinMaterial(color: string) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.1, emissive: new THREE.Color(color), emissiveIntensity: 0.25 });
}
