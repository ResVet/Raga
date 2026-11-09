// Shader additions that turn the untextured Z-Anatomy meshes into tissue.
// Positions are in metres and the noise is evaluated in rest-pose world space, so no UVs are needed and
// the texture stays glued to the tissue while the motion rig bends it. For fibrous tissue the noise is
// stretched along a per-mesh fibre axis (muscle striation, tendon fibres).
//
// One patch serves three materials that share uniforms: the colour material (MeshPhysicalMaterial),
// the G-buffer material used for GTAO and depth of field (MeshNormalMaterial) and the shadow depth
// material (MeshDepthMaterial). All three run the same vertex rig, so AO, shadows and the picture agree
// while a limb moves.
import * as THREE from 'three';

export const NOISE_GLSL = /* glsl */ `
vec3 org_mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 org_mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 org_perm(vec4 x){return org_mod289(((x*34.0)+10.0)*x);}
vec4 org_taylor(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float org_snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=org_mod289(i);
  vec4 p=org_perm(org_perm(org_perm(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=org_taylor(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 org_perturb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDir){
  vec3 sx=dFdx(surf_pos.xyz);
  vec3 sy=dFdy(surf_pos.xyz);
  vec3 r1=cross(sy,surf_norm);
  vec3 r2=cross(surf_norm,sx);
  float det=dot(sx,r1)*faceDir;
  vec3 grad=sign(det)*(dHdxy.x*r1+dHdxy.y*r2);
  return normalize(abs(det)*surf_norm-grad);
}
`;

/** Vertex rig: muscle bulge plus up to four chained joint rotations, all in world space. */
export const RIG_GLSL = /* glsl */ `
uniform float uRigOn;
uniform vec4 uJP[4]; // pivot xyz, blend band half-width (m)
uniform vec4 uJN[4]; // joint plane normal (towards the distal segment), plane offset along it
uniform vec4 uJA[4]; // rotation axis, angle (rad)
uniform vec4 uJL[4]; // radial limit axis direction (from the pivot along the segment)
uniform vec4 uJR[4]; // outer radius (0 = no radial limit), mask, inner radius, capsule length (0 = infinite line)
uniform vec4 uBulge;     // belly centre xyz, half length
uniform vec4 uBulgeAxis; // belly axis xyz, radial swelling
uniform float uShorten;  // axial shortening of the belly
vec3 rig_rot(vec3 v, vec3 a, float ang){
  float c=cos(ang), s=sin(ang);
  return v*c + cross(a,v)*s + a*dot(a,v)*(1.0-c);
}
float rig_weight(int j, vec3 p){
  if (uJR[j].y < 0.5) return 0.0;
  vec3 d = p - uJP[j].xyz;
  float s = dot(d, uJN[j].xyz) - uJN[j].w;
  float w = smoothstep(-uJP[j].w, uJP[j].w, s);
  if (uJR[j].x > 0.0) {
    vec3 L = uJL[j].xyz;
    float a = dot(d, L);
    if (uJR[j].w > 0.0) a = clamp(a, 0.0, uJR[j].w);
    float r = length(d - L*a);
    w *= 1.0 - smoothstep(uJR[j].z, uJR[j].x, r);
  }
  return w;
}
void rig_apply(inout vec3 p, inout vec3 n){
  vec3 p0 = p;
  if (uBulgeAxis.w > 0.0 || uShorten > 0.0) {
    vec3 a = uBulgeAxis.xyz;
    vec3 d = p - uBulge.xyz;
    float z = dot(d, a);
    float s = z / max(uBulge.w, 1e-4);
    float prof = max(0.0, 1.0 - s*s);
    vec3 rv = d - a*z;
    float rho = length(rv);
    if (rho > 1e-5 && abs(s) < 1.0) n = normalize(n + a*dot(n, rv/rho)*rho*uBulgeAxis.w*2.0*s/max(uBulge.w,1e-4));
    p += rv*(uBulgeAxis.w*prof) - a*(z*uShorten*prof);
  }
  for (int j = 3; j >= 0; j--) {
    float w = rig_weight(j, p0);
    if (w > 0.0005) {
      float ang = uJA[j].w * w;
      p = uJP[j].xyz + rig_rot(p - uJP[j].xyz, uJA[j].xyz, ang);
      n = rig_rot(n, uJA[j].xyz, ang);
    }
  }
}
`;

export interface OrganicParams {
  scale: number; // noise frequency in 1/m
  colorVar: number; // +/- albedo variation
  bump: number; // bump strength
  stretch: number; // 1 = isotropic, <1 = fibres along uFiberDir
  fine?: number; // weight of a second, finer octave
}

type U<T> = { value: T };
export interface RigUniforms {
  uRigOn: U<number>;
  uJP: U<THREE.Vector4[]>;
  uJN: U<THREE.Vector4[]>;
  uJA: U<THREE.Vector4[]>;
  uJL: U<THREE.Vector4[]>;
  uJR: U<THREE.Vector4[]>;
  uBulge: U<THREE.Vector4>;
  uBulgeAxis: U<THREE.Vector4>;
  uShorten: U<number>;
}

export interface OrganicUniforms extends RigUniforms {
  uOrgScale: U<number>;
  uOrgVar: U<number>;
  uOrgBump: U<number>;
  uOrgStretch: U<number>;
  uOrgFine: U<number>;
  uFiberDir: U<THREE.Vector3>;
  uMicro: U<number>; // 0 none, 1 bone porosity, 2 muscle striation, 3 tendon/ligament fibres
  uMicroAmt: U<number>;
  uMicroBump: U<number>;
  uCutColor: U<THREE.Color>;
  uTint: U<THREE.Color>;
  uTintAmt: U<number>;
  uRim: U<THREE.Vector4>; // rim colour (linear) and strength
  uGlow: U<number>; // bloom amount of the rim, written to alpha
  uAOOn: U<number>;
  uAOStr: U<number>; // baked AO on ambient light
  uAODir: U<number>; // baked AO on direct diffuse
  uSSS: U<THREE.Vector4>; // scatter colour and strength
  uSSSWrap: U<number>;
  uContract: U<number>;
  uStretch: U<number>;
  uEosin: U<THREE.Color>;
  uViolet: U<THREE.Color>;
  uRestModel: U<THREE.Matrix4>; // rest-pose world matrix of the mesh: noise and decals stay glued on
  uRestNormal: U<THREE.Matrix3>;
  uLmBits: U<number>; // which of the 32 landmark decals sit on this structure (bit mask)
  uLmPos: U<THREE.Vector4[]>; // rest position xyz, radius
  uLmCol: U<THREE.Vector4[]>; // linear colour, highlighted flag
  uLmNrm: U<THREE.Vector4[]>; // surface normal, 1 when valid
  uLmTime: U<number>;
}

export function makeRigUniforms(): RigUniforms {
  const v4 = () => [0, 1, 2, 3].map(() => new THREE.Vector4());
  return {
    uRigOn: { value: 0 },
    uJP: { value: v4() },
    uJN: { value: v4() },
    uJA: { value: v4() },
    uJL: { value: v4() },
    uJR: { value: v4() },
    uBulge: { value: new THREE.Vector4(0, 0, 0, 1) },
    uBulgeAxis: { value: new THREE.Vector4(0, 1, 0, 0) },
    uShorten: { value: 0 },
  };
}

const VERT_RIG_FULL = /* glsl */ `#include <beginnormal_vertex>
  vec3 rigRest = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 rigWorld = rigRest;
  vec3 rigNW = vec3(0.0, 1.0, 0.0);
  if (uRigOn > 0.5) {
    rigNW = normalize((vec4(normalMatrix * objectNormal, 0.0) * viewMatrix).xyz);
    rig_apply(rigWorld, rigNW);
  }`;
const VERT_RIG_POS = /* glsl */ `#include <begin_vertex>
  vec3 rigRest = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 rigWorld = rigRest;
  vec3 rigNW = vec3(0.0, 1.0, 0.0);
  if (uRigOn > 0.5) rig_apply(rigWorld, rigNW);`;
const VERT_PROJECT = /* glsl */ `vec4 mvPosition = uRigOn > 0.5 ? viewMatrix * vec4(rigWorld, 1.0) : modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;`;
const VERT_WORLDPOS = /* glsl */ `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
  vec4 worldPosition = uRigOn > 0.5 ? vec4(rigWorld, 1.0) : modelMatrix * vec4(transformed, 1.0);
#endif`;

type Shader = { vertexShader: string; fragmentShader: string; uniforms: Record<string, unknown> };

function patchRigVertex(shader: Shader, withNormal: boolean) {
  let v = shader.vertexShader.replace('#include <common>', `#include <common>\n${RIG_GLSL}`);
  if (withNormal && v.includes('#include <beginnormal_vertex>')) {
    v = v
      .replace('#include <beginnormal_vertex>', VERT_RIG_FULL)
      .replace('#include <defaultnormal_vertex>', '#include <defaultnormal_vertex>\n  if (uRigOn > 0.5) transformedNormal = normalize(mat3(viewMatrix) * rigNW);');
  } else {
    v = v.replace('#include <begin_vertex>', VERT_RIG_POS);
  }
  v = v.replace('#include <project_vertex>', VERT_PROJECT).replace('#include <worldpos_vertex>', VERT_WORLDPOS);
  shader.vertexShader = v;
}

/** Patch the colour material. Call from material.onBeforeCompile. */
export function patchOrganic(shader: Shader, u: OrganicUniforms) {
  Object.assign(shader.uniforms, u);
  patchRigVertex(shader, true);
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vOrgPos;\nvarying vec3 vOrgN;\nvarying float vAO;\nattribute float aoBake;\nuniform mat4 uRestModel;\nuniform mat3 uRestNormal;')
    .replace('#include <fog_vertex>', '#include <fog_vertex>\n  vOrgPos = (uRestModel * vec4(position, 1.0)).xyz;\n  vOrgN = normalize(uRestNormal * objectNormal);\n  vAO = aoBake;');
  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      `#include <common>
varying vec3 vOrgPos;
varying float vAO;
uniform float uOrgScale; uniform float uOrgVar; uniform float uOrgBump; uniform float uOrgStretch; uniform float uOrgFine;
uniform vec3 uFiberDir; uniform float uMicro; uniform float uMicroAmt; uniform float uMicroBump;
uniform vec3 uCutColor; uniform vec3 uTint; uniform float uTintAmt; uniform vec4 uRim; uniform float uGlow;
uniform float uAOOn; uniform float uAOStr; uniform float uAODir; uniform vec4 uSSS; uniform float uSSSWrap;
uniform float uContract; uniform float uStretch; uniform vec3 uEosin; uniform vec3 uViolet;
varying vec3 vOrgN;
uniform int uLmBits; uniform vec4 uLmPos[32]; uniform vec4 uLmCol[32]; uniform vec4 uLmNrm[32]; uniform float uLmTime;
${NOISE_GLSL}
float org_field(vec3 p, out float micro){
  vec3 d = normalize(uFiberDir + vec3(1e-6));
  float along = dot(p, d);
  vec3 q = p + d * along * (uOrgStretch - 1.0);
  float n = org_snoise(q * uOrgScale) * 0.65;
  n += org_snoise(q * uOrgScale * 3.1 + 7.3) * 0.35 * uOrgFine;
  micro = 0.0;
  if (uMicro < 0.5) return n;
  float fp = length(fwidth(p));
  if (uMicro < 1.5) {
    float f = 2300.0;
    float lod = 1.0 - smoothstep(0.3, 0.7, fp * f);
    if (lod > 0.0) {
      float pits = smoothstep(0.42, 0.82, org_snoise(p * f));
      float grain = org_snoise(p * f * 2.7 + 3.1);
      micro = (grain * 0.3 - pits) * lod;
    }
  } else if (uMicro < 2.5) {
    vec3 qs = p + d * along * (0.035 - 1.0);
    float f = 1500.0;
    float lod = 1.0 - smoothstep(0.3, 0.7, fp * f);
    if (lod > 0.0) {
      float fasc = org_snoise(qs * f);
      float ridge = 1.0 - abs(org_snoise(qs * f * 0.42 + 11.0));
      micro = (fasc * 0.55 - pow(ridge, 7.0) * 0.9) * lod;
    }
  } else {
    vec3 qs = p + d * along * (0.025 - 1.0);
    float f = 2400.0;
    float lod = 1.0 - smoothstep(0.3, 0.7, fp * f);
    if (lod > 0.0) micro = (org_snoise(qs * f) * 0.6 + org_snoise(qs * f * 2.3 + 5.0) * 0.25) * lod;
  }
  return n;
}`,
    )
    .replace(
      '#include <color_fragment>',
      `#include <color_fragment>
  float orgMicro;
  float orgH = org_field(vOrgPos, orgMicro);
  diffuseColor.rgb *= 1.0 + uOrgVar * orgH + uMicroAmt * orgMicro;
  // a structure carrying landmark decals keeps only a faint wash of the selection tint
  diffuseColor.rgb = mix(diffuseColor.rgb, uTint, uTintAmt * (uLmBits != 0 ? 0.3 : 1.0));
  diffuseColor.rgb = mix(diffuseColor.rgb, uViolet * 0.55, uStretch * 0.5);
  diffuseColor.rgb *= 1.0 + 0.12 * uContract;
  // landmark area decals: soft fill plus a thin bright ring, only on the bone the landmark sits on
  vec3 lmEmit = vec3(0.0);
  float lmGlow = 0.0;
  if (uLmBits != 0) {
    vec3 lmN = normalize(vOrgN);
    float fwp = length(fwidth(vOrgPos));
    for (int i = 0; i < 32; i++) {
      if (((uLmBits >> i) & 1) == 0) continue;
      vec4 P = uLmPos[i];
      float d = distance(vOrgPos, P.xyz);
      if (d > P.w * 1.15) continue;
      vec4 C = uLmCol[i];
      float face = uLmNrm[i].w > 0.5 ? smoothstep(-0.25, 0.3, dot(lmN, uLmNrm[i].xyz)) : 1.0;
      float hi = step(0.5, C.w);
      float fill = (1.0 - smoothstep(P.w * 0.45, P.w * 0.95, d)) * face;
      float ringW = max(P.w * 0.075, fwp * 1.6);
      float ring = (1.0 - smoothstep(ringW * 0.45, ringW, abs(d - P.w * 0.96))) * face;
      float pulse = mix(1.0, 0.55 + 0.45 * sin(uLmTime * 5.0), hi);
      diffuseColor.rgb = mix(diffuseColor.rgb, C.rgb, fill * mix(0.34, 0.78, hi));
      lmEmit += C.rgb * (fill * mix(0.05, 0.22, hi) + ring * mix(0.6, 1.8, hi) * pulse);
      lmGlow = max(lmGlow, ring * mix(0.0, 0.8, hi) * pulse);
    }
  }`,
    )
    .replace(
      '#include <normal_fragment_maps>',
      `#include <normal_fragment_maps>
  if (uOrgBump > 0.0 || uMicroBump > 0.0) {
    float hgt = orgH * uOrgBump + orgMicro * uMicroBump;
    vec2 dH = vec2(dFdx(hgt), dFdy(hgt));
    normal = org_perturb(-vViewPosition, normal, dH, faceDirection);
  }`,
    )
    .replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
  float rimFres = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.4);
  float ragaGlow = 0.0;
  if (uRim.w > 0.0) {
    totalEmissiveRadiance += uRim.rgb * ((uLmBits != 0 ? 0.0 : 0.05) + rimFres * 1.25) * uRim.w;
    ragaGlow = uGlow * rimFres * 0.7;
  }
  totalEmissiveRadiance += lmEmit;
  ragaGlow = max(ragaGlow, lmGlow);
  if (uContract > 0.0) totalEmissiveRadiance += uEosin * (0.05 + 0.55 * rimFres) * uContract;
  if (uStretch > 0.0) totalEmissiveRadiance += uViolet * (0.02 + 0.3 * rimFres) * uStretch;`,
    )
    .replace(
      '#include <lights_fragment_end>',
      `#include <lights_fragment_end>
#if NUM_DIR_LIGHTS > 0
  if (uSSS.w > 0.0) {
    vec3 sssAcc = vec3(0.0);
    for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
      vec3 L = directionalLights[i].direction;
      float ndl = dot(normal, L);
      float wrap = max(0.0, (ndl + uSSSWrap) / (1.0 + uSSSWrap)) - max(ndl, 0.0);
      float back = pow(clamp(dot(geometryViewDir, -normalize(L + normal * 0.4)), 0.0, 1.0), 3.0);
      sssAcc += directionalLights[i].color * (wrap + back * 0.55);
    }
    reflectedLight.directDiffuse += sssAcc * material.diffuseColor * uSSS.rgb * (uSSS.w * RECIPROCAL_PI);
  }
#endif`,
    )
    .replace(
      '#include <aomap_fragment>',
      `#include <aomap_fragment>
  if (uAOOn > 0.5) {
    float aoI = mix(1.0, vAO, uAOStr);
    float aoD = mix(1.0, vAO, uAODir);
    reflectedLight.indirectDiffuse *= aoI;
    reflectedLight.indirectSpecular *= mix(1.0, aoI, 0.8);
    reflectedLight.directDiffuse *= aoD;
    reflectedLight.directSpecular *= mix(1.0, aoD, 0.6);
#ifdef USE_CLEARCOAT
    clearcoatSpecularIndirect *= aoI;
#endif
#ifdef USE_SHEEN
    sheenSpecularIndirect *= aoI;
#endif
  }`,
    )
    .replace(
      '#include <dithering_fragment>',
      `#include <dithering_fragment>
#ifdef OPAQUE
  gl_FragColor.a = 1.0 + ragaGlow;
#endif
  if (!gl_FrontFacing) { gl_FragColor.rgb = uCutColor; gl_FragColor.a = max(min(gl_FragColor.a, 1.0), 0.92); }`,
    );
}

/** G-buffer material (packed view-space normals plus depth) that bends with the rig. */
export function makeGBufferMaterial(rig: RigUniforms): THREE.MeshNormalMaterial {
  const m = new THREE.MeshNormalMaterial();
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, rig);
    patchRigVertex(shader as unknown as Shader, true);
  };
  m.customProgramCacheKey = () => 'raga-gbuf-v1';
  return m;
}

/** Shadow depth material that bends with the rig. */
export function makeRigDepthMaterial(rig: RigUniforms): THREE.MeshDepthMaterial {
  const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, rig);
    patchRigVertex(shader as unknown as Shader, false);
  };
  m.customProgramCacheKey = () => 'raga-depth-v1';
  return m;
}
