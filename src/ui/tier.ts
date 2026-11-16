// Picks a graphics tier for the device when the user has not chosen one.
// Ultra draws about nine million triangles and is what makes weak GPUs drop the 3D view, so it is
// only chosen where the hardware clearly allows it. Anyone can still switch tiers by hand.
import type { Quality } from './ctx';

function gpuName(): string {
  try {
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return '';
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String((info && gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return name.toLowerCase();
  } catch {
    return '';
  }
}

export interface DeviceHints {
  gpu: string;
  /** Device memory in GB as Chrome reports it (capped at 8), or undefined elsewhere. */
  memory?: number;
  cores: number;
  touch: boolean;
  /** Shorter side of the screen in CSS pixels. */
  shortSide: number;
}

export function deviceHints(): DeviceHints {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return {
    gpu: gpuName(),
    memory: typeof nav.deviceMemory === 'number' ? nav.deviceMemory : undefined,
    cores: nav.hardwareConcurrency || 4,
    touch: !!window.matchMedia?.('(pointer: coarse)').matches,
    shortSide: Math.min(window.screen?.width || 1024, window.screen?.height || 768),
  };
}

const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render/;
const STRONG = /nvidia|geforce|rtx|gtx|quadro|radeon (rx|pro)|radeon\(tm\) (rx|pro)|apple m\d|arc\(tm\) a\d|arc a\d/;

/** The tier a device with these hints starts on. Kept free of browser calls so it can be tested. */
export function tierFor(h: DeviceHints): Quality {
  if (SOFTWARE.test(h.gpu)) return 'lite';
  const lowMemory = h.memory !== undefined && h.memory <= 4;
  if (h.touch) {
    // phones and tablets share their memory with the GPU, and the browser gives a page only part of it
    if (lowMemory || h.cores <= 4 || (h.shortSide < 600 && h.cores <= 6)) return 'lite';
    return 'high';
  }
  if (lowMemory || h.cores <= 4) return 'high';
  if (STRONG.test(h.gpu)) return 'ultra';
  // unknown or integrated graphics: Ultra only with plenty of cores and memory behind it
  return h.cores >= 12 && (h.memory ?? 0) >= 8 ? 'ultra' : 'high';
}

let cached: Quality | null = null;

export function autoTier(): Quality {
  if (cached) return cached;
  try {
    cached = tierFor(deviceHints());
  } catch {
    cached = 'high';
  }
  return cached;
}

/** The next tier down, or null on the lowest. */
export function lowerTier(q: Quality): Quality | null {
  return q === 'ultra' ? 'high' : q === 'high' ? 'lite' : null;
}
