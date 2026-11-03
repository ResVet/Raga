// Shader additions that give the untextured BodyParts3D meshes a tissue-like surface.
// Positions are in metres. Noise is evaluated in world space, so no UVs are needed.
// For fibrous tissue the noise is stretched along a per-mesh "fiber" axis, which gives
// muscles and tendons visible striation without textures.

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
  vec3 sx=normalize(dFdx(surf_pos.xyz));
  vec3 sy=normalize(dFdy(surf_pos.xyz));
  vec3 r1=cross(sy,surf_norm);
  vec3 r2=cross(surf_norm,sx);
  float det=dot(sx,r1)*faceDir;
  vec3 grad=sign(det)*(dHdxy.x*r1+dHdxy.y*r2);
  return normalize(abs(det)*surf_norm-grad);
}
`;

export interface OrganicParams {
  scale: number; // noise frequency in 1/m
  colorVar: number; // +/- albedo variation
  bump: number; // bump strength
  stretch: number; // 1 = isotropic, <1 = fibres along uFiberDir
  fine?: number; // weight of a second, finer octave
}

export interface OrganicUniforms {
  uOrgScale: { value: number };
  uOrgVar: { value: number };
  uOrgBump: { value: number };
  uOrgStretch: { value: number };
  uOrgFine: { value: number };
  uFiberDir: { value: import('three').Vector3 };
  uCutColor: { value: import('three').Color };
  uTint: { value: import('three').Color };
  uTintAmt: { value: number };
}

/** Patch a MeshStandard/Physical shader. Call from material.onBeforeCompile. */
export function patchOrganic(shader: { vertexShader: string; fragmentShader: string; uniforms: Record<string, unknown> }, u: OrganicUniforms) {
  Object.assign(shader.uniforms, u);
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vOrgPos;')
    .replace('#include <fog_vertex>', '#include <fog_vertex>\n  vOrgPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      `#include <common>
varying vec3 vOrgPos;
uniform float uOrgScale; uniform float uOrgVar; uniform float uOrgBump; uniform float uOrgStretch; uniform float uOrgFine;
uniform vec3 uFiberDir; uniform vec3 uCutColor; uniform vec3 uTint; uniform float uTintAmt;
${NOISE_GLSL}
float org_field(vec3 p){
  vec3 d = normalize(uFiberDir + vec3(1e-6));
  float along = dot(p, d);
  vec3 q = p + d * along * (uOrgStretch - 1.0);
  float n = org_snoise(q * uOrgScale) * 0.65;
  n += org_snoise(q * uOrgScale * 3.1 + 7.3) * 0.35 * uOrgFine;
  return n;
}`,
    )
    .replace(
      '#include <color_fragment>',
      `#include <color_fragment>
  float orgH = org_field(vOrgPos);
  diffuseColor.rgb *= 1.0 + uOrgVar * orgH;
  diffuseColor.rgb = mix(diffuseColor.rgb, uTint, uTintAmt);`,
    )
    .replace(
      '#include <normal_fragment_maps>',
      `#include <normal_fragment_maps>
  if (uOrgBump > 0.0) {
    vec2 dH = vec2(dFdx(orgH), dFdy(orgH)) * uOrgBump;
    normal = org_perturb(-vViewPosition, normal, dH, faceDirection);
  }`,
    )
    .replace(
      '#include <dithering_fragment>',
      `#include <dithering_fragment>
  if (!gl_FrontFacing) { gl_FragColor.rgb = uCutColor; gl_FragColor.a = max(gl_FragColor.a, 0.92); }`,
    );
}
