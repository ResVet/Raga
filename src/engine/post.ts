import * as THREE from 'three';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';

/**
 * Post chain for the ultra and high tiers.
 *
 *  1. G-buffer (packed view normals + depth, opaque tissue only, rendered by the engine with the rig
 *     materials) -> GTAO (three's GTAOPass, denoised) at up to ~1080p.
 *  2. Scene into a multisampled half-float target. Colour is premultiplied over a transparent clear;
 *     alpha > 1 marks selection-rim / pin glow for the bloom (written by the tissue shader).
 *  3. Selective bloom from that glow channel (half-res dual-filter pyramid).
 *  4. Composite to the canvas: optional gentle depth of field (gather from the G-buffer depth), AO,
 *     tone mapping, the procedural micrograph behind the specimen (not tone mapped), bloom, sRGB, dither.
 *
 * Fast frames (camera or motion moving) render the scene into a sub-rectangle of the same targets
 * (`scale` < 1) and skip the G-buffer, so no reallocation happens when quality steps.
 */
export interface FrameOpts {
  scale: number;
  ao: number; // GTAO amount (0 skips)
  dof: number; // depth of field amount (0 skips)
  bloom: number; // bloom amount (0 skips)
  focusZ: number; // view distance of the focus point (m)
  focusRange: number; // half depth range kept sharp (m)
}

const QUAD_VERT = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

export class PostChain {
  readonly sceneRT: THREE.WebGLRenderTarget;
  readonly gbuf: THREE.WebGLRenderTarget;
  readonly gtao: GTAOPass;
  private bloomRT: THREE.WebGLRenderTarget[] = [];
  private quad = new FullScreenQuad();
  private extractMat: THREE.ShaderMaterial;
  private downMat: THREE.ShaderMaterial;
  private upMat: THREE.ShaderMaterial;
  private compMat: THREE.ShaderMaterial;
  private w = 1;
  private h = 1;
  private gw = 1;
  private gh = 1;
  private black = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);

  constructor(
    private renderer: THREE.WebGLRenderer,
    private camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    bg: THREE.Texture,
    samples: number,
  ) {
    this.black.needsUpdate = true;
    this.sceneRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples, depthBuffer: true, stencilBuffer: false });
    this.sceneRT.texture.name = 'raga.scene';
    const depth = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
    this.gbuf = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthTexture: depth, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    // GTAOPass reads its own normal target inside setGBuffer(), so create it first, then hand it our
    // G-buffer (its internal target is never rendered into and so never allocated on the GPU)
    this.gtao = new GTAOPass(scene, camera, 1, 1);
    this.gtao.setGBuffer(depth, this.gbuf.texture);
    this.gtao.output = GTAOPass.OUTPUT.Off;
    this.gtao.updateGtaoMaterial({ radius: 0.035, distanceExponent: 1.6, thickness: 0.012, distanceFallOff: 1, scale: 1.15, samples: 16 });
    this.gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 7, radiusExponent: 1.6, rings: 2, samples: 16 });
    for (let i = 0; i < 4; i++) this.bloomRT.push(new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false }));

    this.extractMat = new THREE.ShaderMaterial({
      uniforms: { tScene: { value: null }, uScale: { value: 1 } },
      vertexShader: QUAD_VERT,
      fragmentShader: /* glsl */ `uniform sampler2D tScene; uniform float uScale; varying vec2 vUv;
        void main(){
          vec4 s = texture2D(tScene, vUv * uScale);
          float g = max(s.a - 1.0, 0.0);
          float cov = clamp(s.a, 0.0, 1.0);
          vec3 c = s.rgb / max(cov, 1e-3);
          gl_FragColor = vec4(min(c * g, vec3(6.0)), 1.0);
        }`,
      depthTest: false,
      depthWrite: false,
    });
    this.downMat = new THREE.ShaderMaterial({
      uniforms: { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() } },
      vertexShader: QUAD_VERT,
      fragmentShader: /* glsl */ `uniform sampler2D tSrc; uniform vec2 uTexel; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
          c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
          c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
          c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
          c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
          gl_FragColor = vec4(c / 8.0, 1.0);
        }`,
      depthTest: false,
      depthWrite: false,
    });
    this.upMat = new THREE.ShaderMaterial({
      uniforms: { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() } },
      vertexShader: QUAD_VERT,
      fragmentShader: /* glsl */ `uniform sampler2D tSrc; uniform vec2 uTexel; varying vec2 vUv;
        void main(){
          // wider levels add less, so the glow hugs the rim instead of hazing the whole specimen
          vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
          c += (texture2D(tSrc, vUv + vec2(uTexel.x, 0.0)).rgb + texture2D(tSrc, vUv - vec2(uTexel.x, 0.0)).rgb
              + texture2D(tSrc, vUv + vec2(0.0, uTexel.y)).rgb + texture2D(tSrc, vUv - vec2(0.0, uTexel.y)).rgb) * 2.0;
          c += texture2D(tSrc, vUv + uTexel).rgb + texture2D(tSrc, vUv - uTexel).rgb
             + texture2D(tSrc, vUv + vec2(uTexel.x, -uTexel.y)).rgb + texture2D(tSrc, vUv + vec2(-uTexel.x, uTexel.y)).rgb;
          gl_FragColor = vec4(c / 16.0 * 0.55, 1.0);
        }`,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
    this.compMat = new THREE.ShaderMaterial({
      uniforms: {
        tScene: { value: null },
        tAO: { value: this.black },
        tDepth: { value: depth },
        tBloom: { value: this.black },
        tBg: { value: bg },
        uSceneScale: { value: 1 },
        uAOAmt: { value: 0 },
        uDof: { value: 0 },
        uBloom: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uBgRect: { value: new THREE.Vector4(1, 1, 0, 0) },
        uFocusZ: { value: 1 },
        uFocusRange: { value: 0.05 },
        uMaxCoc: { value: 4 },
        uNear: { value: 0.01 },
        uFar: { value: 30 },
        uNeutral: { value: 1 },
        toneMappingExposure: { value: 1 },
      },
      vertexShader: QUAD_VERT,
      fragmentShader: /* glsl */ `
        uniform sampler2D tScene; uniform sampler2D tAO; uniform sampler2D tDepth; uniform sampler2D tBloom; uniform sampler2D tBg;
        uniform float uSceneScale; uniform float uAOAmt; uniform float uDof; uniform float uBloom; uniform vec2 uRes; uniform vec4 uBgRect;
        uniform float uFocusZ; uniform float uFocusRange; uniform float uMaxCoc; uniform float uNear; uniform float uFar; uniform float uNeutral;
        varying vec2 vUv;
        #include <tonemapping_pars_fragment>
        float linZ(float d){ float z = d * 2.0 - 1.0; return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear)); }
        float depthAt(vec2 uv){ float d = texture2D(tDepth, uv).x; return d >= 0.99999 ? uFar : linZ(d); }
        float cocAt(float z){ return uMaxCoc * uDof * clamp(1.5 * max(abs(z - uFocusZ) - uFocusRange, 0.0) / z, 0.0, 1.0); }
        vec4 sceneAt(vec2 uv){
          vec4 s = texture2D(tScene, uv * uSceneScale);
          if (uAOAmt > 0.0) s.rgb *= mix(1.0, texture2D(tAO, uv).r, uAOAmt);
          return s;
        }
        vec3 srgb(vec3 c){ c = clamp(c, 0.0, 1.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec4 s;
          if (uDof > 0.001) {
            float z0 = depthAt(vUv);
            float c0 = cocAt(z0);
            vec4 acc = vec4(0.0); float wsum = 0.0;
            for (int i = 0; i < 28; i++) {
              float r = sqrt((float(i) + 0.5) / 28.0);
              float a = float(i) * 2.39996323;
              float dist = r * uMaxCoc * uDof;
              vec2 tuv = vUv + vec2(cos(a), sin(a)) * dist / uRes;
              float zt = depthAt(tuv);
              float ct = cocAt(zt);
              float eff = zt < z0 - 0.002 ? ct : min(ct, c0);
              float w = clamp(eff - dist + 1.0, 0.0, 1.0);
              acc += sceneAt(tuv) * w; wsum += w;
            }
            s = wsum > 0.0 ? acc / wsum : sceneAt(vUv);
          } else {
            s = sceneAt(vUv);
          }
          float cov = clamp(s.a, 0.0, 1.0);
          vec3 c = s.rgb / max(cov, 1e-3) * toneMappingExposure;
          vec3 tm = uNeutral > 0.5 ? NeutralToneMapping(c) : AgXToneMapping(c);
          vec3 bg = texture2D(tBg, vUv * uBgRect.xy + uBgRect.zw).rgb;
          vec3 o = tm * cov + bg * (1.0 - cov);
          if (uBloom > 0.0) { vec3 b = texture2D(tBloom, vUv).rgb * uBloom; o += b / (1.0 + max(max(b.r, b.g), b.b) * 0.35); }
          o = srgb(o) + (hash(gl_FragCoord.xy) - 0.5) / 255.0;
          gl_FragColor = vec4(o, 1.0);
        }`,
      depthTest: false,
      depthWrite: false,
      toneMapped: false, // tone mapping is done here, not by the program prefix
    });
  }

  setSize(w: number, h: number, aoScale: number) {
    this.w = Math.max(1, Math.round(w));
    this.h = Math.max(1, Math.round(h));
    this.sceneRT.setSize(this.w, this.h);
    this.gw = Math.max(1, Math.round(this.w * aoScale));
    this.gh = Math.max(1, Math.round(this.h * aoScale));
    this.gbuf.setSize(this.gw, this.gh);
    this.gtao.setSize(this.gw, this.gh);
    let bw = Math.max(1, this.w >> 1), bh = Math.max(1, this.h >> 1);
    for (const rt of this.bloomRT) {
      rt.setSize(bw, bh);
      bw = Math.max(1, bw >> 1);
      bh = Math.max(1, bh >> 1);
    }
    this.compMat.uniforms.uRes.value.set(this.w, this.h);
  }

  setBackgroundRect(r: THREE.Vector4) {
    this.compMat.uniforms.uBgRect.value.copy(r);
  }

  setToneMapping(neutral: boolean, exposure: number) {
    this.compMat.uniforms.uNeutral.value = neutral ? 1 : 0;
    this.compMat.uniforms.toneMappingExposure.value = exposure;
  }

  /** Bind the G-buffer target; the engine then draws the opaque tissue with the G-buffer materials. */
  beginGBuffer() {
    const r = this.renderer;
    r.setRenderTarget(this.gbuf);
    r.setClearColor(0x8080ff, 1);
    r.clear(true, true, false);
  }

  runAO(radius: number) {
    this.gtao.gtaoMaterial.uniforms.radius.value = radius;
    this.gtao.render(this.renderer, null as never, null as never, 0, false);
  }

  /** Bind the scene target at `scale` of full resolution. */
  beginScene(scale: number) {
    const r = this.renderer;
    const sw = Math.max(1, Math.round(this.w * scale)), sh = Math.max(1, Math.round(this.h * scale));
    this.sceneRT.viewport.set(0, 0, sw, sh);
    this.sceneRT.scissor.set(0, 0, sw, sh);
    this.sceneRT.scissorTest = scale < 0.999;
    r.setRenderTarget(this.sceneRT);
    r.setClearColor(0x000000, 0);
    r.clear(true, true, false);
  }

  finish(o: FrameOpts) {
    const r = this.renderer;
    const scale = Math.min(1, o.scale);
    const effScale = Math.round(this.w * scale) / this.w;
    let bloomTex: THREE.Texture = this.black;
    if (o.bloom > 0) {
      this.extractMat.uniforms.tScene.value = this.sceneRT.texture;
      this.extractMat.uniforms.uScale.value = effScale;
      this.pass(this.extractMat, this.bloomRT[0]);
      for (let i = 1; i < this.bloomRT.length; i++) {
        const src = this.bloomRT[i - 1];
        this.downMat.uniforms.tSrc.value = src.texture;
        this.downMat.uniforms.uTexel.value.set(1 / src.width, 1 / src.height);
        this.pass(this.downMat, this.bloomRT[i]);
      }
      for (let i = this.bloomRT.length - 1; i > 0; i--) {
        const src = this.bloomRT[i];
        this.upMat.uniforms.tSrc.value = src.texture;
        this.upMat.uniforms.uTexel.value.set(1 / src.width, 1 / src.height);
        this.pass(this.upMat, this.bloomRT[i - 1], false);
      }
      bloomTex = this.bloomRT[0].texture;
    }
    const u = this.compMat.uniforms;
    u.tScene.value = this.sceneRT.texture;
    u.uSceneScale.value = effScale;
    u.tAO.value = o.ao > 0 ? this.gtao.pdRenderTarget.texture : this.black;
    u.uAOAmt.value = o.ao;
    u.uDof.value = o.dof;
    u.uFocusZ.value = o.focusZ;
    u.uFocusRange.value = o.focusRange;
    u.uMaxCoc.value = 4.5 * Math.max(0.75, this.h / 1080);
    u.uNear.value = this.camera.near;
    u.uFar.value = this.camera.far;
    u.tBloom.value = bloomTex;
    u.uBloom.value = o.bloom;
    r.setRenderTarget(null);
    this.quad.material = this.compMat;
    this.quad.render(r);
  }

  private pass(mat: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget, clear = true) {
    const r = this.renderer;
    r.setRenderTarget(target);
    if (clear) {
      r.setClearColor(0x000000, 0);
      r.clear(true, false, false);
    }
    this.quad.material = mat;
    this.quad.render(r);
  }

  dispose() {
    this.sceneRT.dispose();
    this.gbuf.dispose();
    this.gbuf.depthTexture?.dispose();
    this.gtao.dispose();
    for (const rt of this.bloomRT) rt.dispose();
    this.extractMat.dispose();
    this.downMat.dispose();
    this.upMat.dispose();
    this.compMat.dispose();
    this.quad.dispose();
    this.black.dispose();
  }
}
