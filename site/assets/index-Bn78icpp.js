import { C as Controls, V as Vector3, M as MOUSE, T as TOUCH, Q as Quaternion, S as Spherical, a as Vector2, R as Ray, P as Plane, b as MathUtils, c as TrianglesDrawMode, d as TriangleFanDrawMode, e as TriangleStripDrawMode, L as Loader, f as LoaderUtils, F as FileLoader, g as MeshPhysicalMaterial, h as Color, i as LinearSRGBColorSpace, j as SRGBColorSpace, k as SpotLight, l as PointLight, D as DirectionalLight, m as Matrix4, I as InstancedMesh, n as InstancedBufferAttribute, O as Object3D, o as TextureLoader, p as ImageBitmapLoader, B as BufferAttribute, q as InterleavedBuffer, r as LinearMipmapLinearFilter, N as NearestMipmapLinearFilter, s as LinearMipmapNearestFilter, t as NearestMipmapNearestFilter, u as LinearFilter, v as NearestFilter, w as RepeatWrapping, x as MirroredRepeatWrapping, y as ClampToEdgeWrapping, z as PointsMaterial, A as Material, E as LineBasicMaterial, G as MeshStandardMaterial, H as DoubleSide, J as MeshBasicMaterial, K as PropertyBinding, U as BufferGeometry, W as SkinnedMesh, X as Mesh, Y as LineSegments, Z as Line, _ as LineLoop, $ as Points, a0 as Group, a1 as PerspectiveCamera, a2 as OrthographicCamera, a3 as Skeleton, a4 as AnimationClip, a5 as Bone, a6 as InterpolateDiscrete, a7 as InterpolateLinear, a8 as InterleavedBufferAttribute, a9 as Texture, aa as VectorKeyframeTrack, ab as NumberKeyframeTrack, ac as QuaternionKeyframeTrack, ad as ColorManagement, ae as FrontSide, af as Interpolant, ag as Box3, ah as Sphere, ai as Scene, aj as BoxGeometry, ak as BackSide, al as MeshDepthMaterial, am as RGBADepthPacking, an as Vector4, ao as MeshNormalMaterial, ap as Matrix3, aq as Float32BufferAttribute, ar as DataTexture, as as WebGLRenderTarget, at as HalfFloatType, au as ShaderMaterial, av as NoBlending, aw as UniformsUtils, ax as AddEquation, ay as ZeroFactor, az as DstAlphaFactor, aA as DstColorFactor, aB as CustomBlending, aC as DepthTexture, aD as DepthStencilFormat, aE as UnsignedInt248Type, aF as RGBAFormat, aG as UnsignedByteType, aH as UnsignedIntType, aI as AdditiveBlending, aJ as PlaneGeometry, aK as CanvasTexture, aL as Raycaster, aM as WebGLRenderer, aN as NeutralToneMapping, aO as PCFShadowMap, aP as PMREMGenerator, aQ as SphereGeometry, aR as CylinderGeometry, aS as computeBoundsTree, aT as disposeBoundsTree, aU as acceleratedRaycast } from "./three-BZT79BOs.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
  function A(a) {
    if (null === a || "object" !== typeof a) return null;
    a = z && a[z] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var B = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C = Object.assign, D = {};
  function E(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D;
    this.updater = e || B;
  }
  E.prototype.isReactComponent = {};
  E.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  E.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function F2() {
  }
  F2.prototype = E.prototype;
  function G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D;
    this.updater = e || B;
  }
  var H = G.prototype = new F2();
  H.constructor = G;
  C(H, E.prototype);
  H.isPureReactComponent = true;
  var I = Array.isArray, J2 = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
  function M(a, b, e) {
    var d, c = {}, k = null, h = null;
    if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J2.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
      for (var f2 = Array(g), m = 0; m < g; m++) f2[m] = arguments[m + 2];
      c.children = f2;
    }
    if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
    return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
  }
  function N(a, b) {
    return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l;
  }
  function escape(a) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b[a2];
    });
  }
  var P2 = /\/+/g;
  function Q(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
  }
  function R(a, b, e, d, c) {
    var k = typeof a;
    if ("undefined" === k || "boolean" === k) a = null;
    var h = false;
    if (null === a) h = true;
    else switch (k) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l:
          case n:
            h = true;
        }
    }
    if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P2, "$&/") + "/"), R(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P2, "$&/") + "/") + a)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I(a)) for (var g = 0; g < a.length; g++) {
      k = a[g];
      var f2 = d + Q(k, g);
      h += R(k, b, e, f2, c);
    }
    else if (f2 = A(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f2 = d + Q(k, g++), h += R(k, b, e, f2, c);
    else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S2(a, b, e) {
    if (null == a) return a;
    var d = [], c = 0;
    R(a, d, "", "", function(a2) {
      return b.call(e, a2, c++);
    });
    return d;
  }
  function T(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      b.then(function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
      }, function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
      });
      -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
  }
  var U = { current: null }, V2 = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V2, ReactCurrentOwner: K };
  function X() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S2, forEach: function(a, b, e) {
    S2(a, function() {
      b.apply(this, arguments);
    }, e);
  }, count: function(a) {
    var b = 0;
    S2(a, function() {
      b++;
    });
    return b;
  }, toArray: function(a) {
    return S2(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } };
  react_production_min.Component = E;
  react_production_min.Fragment = p;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G;
  react_production_min.StrictMode = q;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
  react_production_min.act = X;
  react_production_min.cloneElement = function(a, b, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
    if (null != b) {
      void 0 !== b.ref && (k = b.ref, h = K.current);
      void 0 !== b.key && (c = "" + b.key);
      if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
      for (f2 in b) J2.call(b, f2) && !L.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d.children = e;
    else if (1 < f2) {
      g = Array(f2);
      for (var m = 0; m < f2; m++) g[m] = arguments[m + 2];
      d.children = g;
    }
    return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
  };
  react_production_min.createContext = function(a) {
    a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a.Provider = { $$typeof: t, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = M;
  react_production_min.createFactory = function(a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: v, render: a };
  };
  react_production_min.isValidElement = O;
  react_production_min.lazy = function(a) {
    return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
  };
  react_production_min.memo = function(a, b) {
    return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a) {
    var b = V2.transition;
    V2.transition = {};
    try {
      a();
    } finally {
      V2.transition = b;
    }
  };
  react_production_min.unstable_act = X;
  react_production_min.useCallback = function(a, b) {
    return U.current.useCallback(a, b);
  };
  react_production_min.useContext = function(a) {
    return U.current.useContext(a);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a) {
    return U.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function(a, b) {
    return U.current.useEffect(a, b);
  };
  react_production_min.useId = function() {
    return U.current.useId();
  };
  react_production_min.useImperativeHandle = function(a, b, e) {
    return U.current.useImperativeHandle(a, b, e);
  };
  react_production_min.useInsertionEffect = function(a, b) {
    return U.current.useInsertionEffect(a, b);
  };
  react_production_min.useLayoutEffect = function(a, b) {
    return U.current.useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function(a, b) {
    return U.current.useMemo(a, b);
  };
  react_production_min.useReducer = function(a, b, e) {
    return U.current.useReducer(a, b, e);
  };
  react_production_min.useRef = function(a) {
    return U.current.useRef(a);
  };
  react_production_min.useState = function(a) {
    return U.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function(a, b, e) {
    return U.current.useSyncExternalStore(a, b, e);
  };
  react_production_min.useTransition = function() {
    return U.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  return react_production_min;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production_min();
  }
  return react.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f2 = requireReact(), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var reactExports = requireReact();
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredScheduler_production_min;
function requireScheduler_production_min() {
  if (hasRequiredScheduler_production_min) return scheduler_production_min;
  hasRequiredScheduler_production_min = 1;
  (function(exports) {
    function f2(a, b) {
      var c = a.length;
      a.push(b);
      a: for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
      }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k(a) {
      if (0 === a.length) return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
          var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
          if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
          else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
          else break a;
        }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      var p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    var r = [], t = [], u = 1, v = null, y = 3, z = false, A = false, B = false, D = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G(a) {
      for (var b = h(t); null !== b; ) {
        if (null === b.callback) k(t);
        else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f2(r, b);
        else break;
        b = h(t);
      }
    }
    function H(a) {
      B = false;
      G(a);
      if (!A) if (null !== h(r)) A = true, I(J2);
      else {
        var b = h(t);
        null !== b && K(H, b.startTime - a);
      }
    }
    function J2(a, b) {
      A = false;
      B && (B = false, E(L), L = -1);
      z = true;
      var c = y;
      try {
        G(b);
        for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
          var d = v.callback;
          if ("function" === typeof d) {
            v.callback = null;
            y = v.priorityLevel;
            var e = d(v.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v.callback = e : v === h(r) && k(r);
            G(b);
          } else k(r);
          v = h(r);
        }
        if (null !== v) var w = true;
        else {
          var m = h(t);
          null !== m && K(H, m.startTime - b);
          w = false;
        }
        return w;
      } finally {
        v = null, y = c, z = false;
      }
    }
    var N = false, O = null, L = -1, P2 = 5, Q = -1;
    function M() {
      return exports.unstable_now() - Q < P2 ? false : true;
    }
    function R() {
      if (null !== O) {
        var a = exports.unstable_now();
        Q = a;
        var b = true;
        try {
          b = O(true, a);
        } finally {
          b ? S2() : (N = false, O = null);
        }
      } else N = false;
    }
    var S2;
    if ("function" === typeof F2) S2 = function() {
      F2(R);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T = new MessageChannel(), U = T.port2;
      T.port1.onmessage = R;
      S2 = function() {
        U.postMessage(null);
      };
    } else S2 = function() {
      D(R, 0);
    };
    function I(a) {
      O = a;
      N || (N = true, S2());
    }
    function K(a, b) {
      L = D(function() {
        a(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A || z || (A = true, I(J2));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r);
    };
    exports.unstable_next = function(a) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y;
      }
      var c = y;
      y = b;
      try {
        return a();
      } finally {
        y = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y;
      y = a;
      try {
        return b();
      } finally {
        y = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f2(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f2(r, a), A || z || (A = true, I(J2)));
      return a;
    };
    exports.unstable_shouldYield = M;
    exports.unstable_wrapCallback = function(a) {
      var b = y;
      return function() {
        var c = y;
        y = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y = c;
        }
      };
    };
  })(scheduler_production_min);
  return scheduler_production_min;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production_min();
  }
  return scheduler.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production_min;
function requireReactDom_production_min() {
  if (hasRequiredReactDom_production_min) return reactDom_production_min;
  hasRequiredReactDom_production_min = 1;
  var aa = requireReact(), ca = requireScheduler();
  function p(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a, b) {
    ha(a, b);
    ha(a + "Capture", b);
  }
  function ha(a, b) {
    ea[a] = b;
    for (a = 0; a < b.length; a++) da.add(b[a]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a) {
    if (ja.call(ma, a)) return true;
    if (ja.call(la, a)) return false;
    if (ka.test(a)) return ma[a] = true;
    la[a] = true;
    return false;
  }
  function pa(a, b, c, d) {
    if (null !== c && 0 === c.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d) return false;
        if (null !== c) return !c.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function qa(a, b, c, d) {
    if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
    if (d) return false;
    if (null !== c) switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function v(a, b, c, d, e, f2, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = f2;
    this.removeEmptyString = g;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    z[a] = new v(a, 0, false, a, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b = a[0];
    z[b] = new v(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    z[a] = new v(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    z[a] = new v(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function(a) {
    z[a] = new v(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    z[a] = new v(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a) {
    z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(
      ra,
      sa
    );
    z[b] = new v(b, 1, false, a, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
  });
  function ta(a, b, c, d) {
    var e = z.hasOwnProperty(b) ? z[b] : null;
    if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ja && a[Ja] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var A = Object.assign, La;
  function Ma(a) {
    if (void 0 === La) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
    return "\n" + La + a;
  }
  var Na = false;
  function Oa(a, b) {
    if (!a || Na) return "";
    Na = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l) {
          var d = l;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l) {
          d = l;
        }
        a.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l) {
          d = l;
        }
        a();
      }
    } catch (l) {
      if (l && d && "string" === typeof l.stack) {
        for (var e = l.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
        for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f2[h]) {
                var k = "\n" + e[g].replace(" at new ", " at ");
                a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                return k;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
  }
  function Pa(a) {
    switch (a.tag) {
      case 5:
        return Ma(a.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Oa(a.type, false), a;
      case 11:
        return a = Oa(a.type.render, false), a;
      case 1:
        return a = Oa(a.type, true), a;
      default:
        return "";
    }
  }
  function Qa(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a) switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
      case Ha:
        b = a._payload;
        a = a._init;
        try {
          return Qa(a(b));
        } catch (c) {
        }
    }
    return null;
  }
  function Ra(a) {
    var b = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a) {
    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
    if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
      var e = c.get, f2 = c.set;
      Object.defineProperty(a, b, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d = "" + a2;
        f2.call(this, a2);
      } });
      Object.defineProperty(a, b, { enumerable: c.enumerable });
      return { getValue: function() {
        return d;
      }, setValue: function(a2) {
        d = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null;
        delete a[b];
      } };
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a) return false;
    var b = a._valueTracker;
    if (!b) return true;
    var c = b.getValue();
    var d = "";
    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d;
    return a !== c ? (b.setValue(a), true) : false;
  }
  function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a) return null;
    try {
      return a.activeElement || a.body;
    } catch (b) {
      return a.body;
    }
  }
  function Ya(a, b) {
    var c = b.checked;
    return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
  }
  function Za(a, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a, b) {
    b = b.checked;
    null != b && ta(a, "checked", b, false);
  }
  function bb(a, b) {
    ab(a, b);
    var c = Sa(b.value), d = b.type;
    if (null != c) if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
    else if ("submit" === d || "reset" === d) {
      a.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
  }
  function db(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
      b = "" + a._wrapperState.initialValue;
      c || b === a.value || (a.value = b);
      a.defaultValue = b;
    }
    c = a.name;
    "" !== c && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c && (a.name = c);
  }
  function cb(a, b, c) {
    if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
  }
  var eb = Array.isArray;
  function fb(a, b, c, d) {
    a = a.options;
    if (b) {
      b = {};
      for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
      for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
    } else {
      c = "" + Sa(c);
      b = null;
      for (e = 0; e < a.length; e++) {
        if (a[e].value === c) {
          a[e].selected = true;
          d && (a[e].defaultSelected = true);
          return;
        }
        null !== b || a[e].disabled || (b = a[e]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
    return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function hb(a, b) {
    var c = b.value;
    if (null == c) {
      c = b.children;
      b = b.defaultValue;
      if (null != c) {
        if (null != b) throw Error(p(92));
        if (eb(c)) {
          if (1 < c.length) throw Error(p(93));
          c = c[0];
        }
        b = c;
      }
      null == b && (b = "");
      c = b;
    }
    a._wrapperState = { initialValue: Sa(c) };
  }
  function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
    null != d && (a.defaultValue = "" + d);
  }
  function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
  }
  function kb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
  }
  var mb, nb = (function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  })(function(a, b) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
      for (; b.firstChild; ) a.appendChild(b.firstChild);
    }
  });
  function ob(a, b) {
    if (b) {
      var c = a.firstChild;
      if (c && c === a.lastChild && 3 === c.nodeType) {
        c.nodeValue = b;
        return;
      }
    }
    a.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a) {
    qb.forEach(function(b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      pb[b] = pb[a];
    });
  });
  function rb(a, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
  }
  function sb(a, b) {
    a = a.style;
    for (var c in b) if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
  var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a, b) {
    if (b) {
      if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(p(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
    }
  }
  function vb(a, b) {
    if (-1 === a.indexOf("-")) return "string" === typeof b.is;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if ("function" !== typeof yb) throw Error(p(280));
      var b = a.stateNode;
      b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b = Ab;
      Ab = zb = null;
      Bb(a);
      if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
    }
  }
  function Gb(a, b) {
    return a(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a, b, c) {
    if (Ib) return a(b, c);
    Ib = true;
    try {
      return Gb(a, b, c);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a, b) {
    var c = a.stateNode;
    if (null === c) return null;
    var d = Db(c);
    if (null === d) return null;
    c = d[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
    if (a) return null;
    if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
    return c;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
  function Nb(a, b, c, d, e, f2, g, h, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l);
    } catch (m) {
      this.onError(m);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
    Ob = true;
    Pb = a;
  } };
  function Tb(a, b, c, d, e, f2, g, h, k) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a, b, c, d, e, f2, g, h, k) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p(198));
      Qb || (Qb = true, Rb = l);
    }
  }
  function Vb(a) {
    var b = a, c = a;
    if (a.alternate) for (; b.return; ) b = b.return;
    else {
      a = b;
      do
        b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
      while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function Wb(a) {
    if (13 === a.tag) {
      var b = a.memoizedState;
      null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function Xb(a) {
    if (Vb(a) !== a) throw Error(p(188));
  }
  function Yb(a) {
    var b = a.alternate;
    if (!b) {
      b = Vb(a);
      if (null === b) throw Error(p(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (null === e) break;
      var f2 = e.alternate;
      if (null === f2) {
        d = e.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f2.child) {
        for (f2 = e.child; f2; ) {
          if (f2 === c) return Xb(e), a;
          if (f2 === d) return Xb(e), b;
          f2 = f2.sibling;
        }
        throw Error(p(188));
      }
      if (c.return !== d.return) c = e, d = f2;
      else {
        for (var g = false, h = e.child; h; ) {
          if (h === c) {
            g = true;
            c = e;
            d = f2;
            break;
          }
          if (h === d) {
            g = true;
            d = e;
            c = f2;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f2.child; h; ) {
            if (h === c) {
              g = true;
              c = f2;
              d = e;
              break;
            }
            if (h === d) {
              g = true;
              d = f2;
              c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g) throw Error(p(189));
        }
      }
      if (c.alternate !== d) throw Error(p(190));
    }
    if (3 !== c.tag) throw Error(p(188));
    return c.stateNode.current === c ? a : b;
  }
  function Zb(a) {
    a = Yb(a);
    return null !== a ? $b(a) : null;
  }
  function $b(a) {
    if (5 === a.tag || 6 === a.tag) return a;
    for (a = a.child; null !== a; ) {
      var b = $b(a);
      if (null !== b) return b;
      a = a.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function uc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return 0;
    var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
    } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function vc(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
      var g = 31 - oc(f2), h = 1 << g, k = e[g];
      if (-1 === k) {
        if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
      } else k <= b && (a.expiredLanes |= h);
      f2 &= ~h;
    }
  }
  function xc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a;
  }
  function zc(a) {
    for (var b = [], c = 0; 31 > c; c++) b.push(a);
    return b;
  }
  function Ac(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - oc(b);
    a[b] = c;
  }
  function Bc(a, b) {
    var c = a.pendingLanes & ~b;
    a.pendingLanes = b;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b;
    a.mutableReadLanes &= b;
    a.entangledLanes &= b;
    b = a.entanglements;
    var d = a.eventTimes;
    for (a = a.expirationTimes; 0 < c; ) {
      var e = 31 - oc(c), f2 = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f2;
    }
  }
  function Cc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c; ) {
      var d = 31 - oc(c), e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C = 0;
  function Dc(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a, b) {
    switch (a) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a, b, c, d, e, f2) {
    if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
    a.eventSystemFlags |= d;
    b = a.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a;
  }
  function Uc(a, b, c, d, e) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a, b, c, d, e), true;
      case "dragenter":
        return Mc = Tc(Mc, a, b, c, d, e), true;
      case "mouseover":
        return Nc = Tc(Nc, a, b, c, d, e), true;
      case "pointerover":
        var f2 = e.pointerId;
        Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
        return true;
      case "gotpointercapture":
        return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
    }
    return false;
  }
  function Vc(a) {
    var b = Wc(a.target);
    if (null !== b) {
      var c = Vb(b);
      if (null !== c) {
        if (b = c.tag, 13 === b) {
          if (b = Wb(c), null !== b) {
            a.blockedOn = b;
            Ic(a.priority, function() {
              Gc(c);
            });
            return;
          }
        } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Xc(a) {
    if (null !== a.blockedOn) return false;
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (null === c) {
        c = a.nativeEvent;
        var d = new c.constructor(c.type, c);
        wb = d;
        c.target.dispatchEvent(d);
        wb = null;
      } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
      b.shift();
    }
    return true;
  }
  function Zc(a, b, c) {
    Xc(a) && c.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a, b) {
    a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a) {
    function b(b2) {
      return ad(b2, a);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a);
      for (var c = 1; c < Kc.length; c++) {
        var d = Kc[c];
        d.blockedOn === a && (d.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a);
    null !== Mc && ad(Mc, a);
    null !== Nc && ad(Nc, a);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
    for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a, b, c, d) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 1, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function gd(a, b, c, d) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 4, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function fd(a, b, c, d) {
    if (dd) {
      var e = Yc(a, b, c, d);
      if (null === e) hd(a, b, d, id2, c), Sc(a, d);
      else if (Uc(e, a, b, c, d)) d.stopPropagation();
      else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
        for (; null !== e; ) {
          var f2 = Cb(e);
          null !== f2 && Ec(f2);
          f2 = Yc(a, b, c, d);
          null === f2 && hd(a, b, d, id2, c);
          if (f2 === e) break;
          e = f2;
        }
        null !== e && d.stopPropagation();
      } else hd(a, b, d, null, c);
    }
  }
  var id2 = null;
  function Yc(a, b, c, d) {
    id2 = null;
    a = xb(d);
    a = Wc(a);
    if (null !== a) if (b = Vb(a), null === b) a = null;
    else if (c = b.tag, 13 === c) {
      a = Wb(b);
      if (null !== a) return a;
      a = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
      a = null;
    } else b !== a && (a = null);
    id2 = a;
    return null;
  }
  function jd(a) {
    switch (a) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
    for (a = 0; a < c && b[a] === e[a]; a++) ;
    var g = c - a;
    for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
    return md = e.slice(a, 1 < d ? 1 - d : void 0);
  }
  function od(a) {
    var b = a.keyCode;
    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
    10 === a && (a = 13);
    return 32 <= a || 13 === a ? a : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a) {
    function b(b2, d, e, f2, g) {
      this._reactName = b2;
      this._targetInst = e;
      this.type = d;
      this.nativeEvent = f2;
      this.target = g;
      this.currentTarget = null;
      for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
      this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A({}, ud, { key: function(a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return "keypress" === a.type ? od(a) : 0;
  }, keyCode: function(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function(a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a, b) {
    switch (a) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a) {
    a = a.detail;
    return "object" === typeof a && "data" in a ? a.data : null;
  }
  var ie = false;
  function je(a, b) {
    switch (a) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a = b.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b) {
    if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
  }
  function ne(a, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b = ue(a);
    if (Wa(b)) return a;
  }
  function ve(a, b) {
    if ("change" === a) return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if ("value" === a.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a, xb(a));
      Jb(re, b);
    }
  }
  function Ce(a, b, c) {
    "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
  }
  function De(a) {
    if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
  }
  function Ee(a, b) {
    if ("click" === a) return te(b);
  }
  function Fe(a, b) {
    if ("input" === a || "change" === a) return te(b);
  }
  function Ge(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a, b) {
    if (He(a, b)) return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length) return false;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!ja.call(b, e) || !He(a[e], b[e])) return false;
    }
    return true;
  }
  function Je(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Ke(a, b) {
    var c = Je(a);
    a = 0;
    for (var d; c; ) {
      if (3 === c.nodeType) {
        d = a + c.textContent.length;
        if (a <= b && d >= b) return { node: c, offset: b - a };
        a = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Je(c);
    }
  }
  function Le(a, b) {
    return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
      try {
        var c = "string" === typeof b.contentWindow.location.href;
      } catch (d) {
        c = false;
      }
      if (c) a = b.contentWindow;
      else break;
      b = Xa(a.document);
    }
    return b;
  }
  function Ne(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
  }
  function Oe(a) {
    var b = Me(), c = a.focusedElem, d = a.selectionRange;
    if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
      if (null !== d && Ne(c)) {
        if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
        else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
          a = a.getSelection();
          var e = c.textContent.length, f2 = Math.min(d.start, e);
          d = void 0 === d.end ? f2 : Math.min(d.end, e);
          !a.extend && f2 > d && (e = d, d = f2, f2 = e);
          e = Ke(c, f2);
          var g = Ke(
            c,
            d
          );
          e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
        }
      }
      b = [];
      for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      "function" === typeof c.focus && c.focus();
      for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
  }
  function Ve(a, b) {
    var c = {};
    c[a.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a] = "webkit" + b;
    c["Moz" + a] = "moz" + b;
    return c;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a) {
    if (Xe[a]) return Xe[a];
    if (!We[a]) return a;
    var b = We[a], c;
    for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
    return a;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a, b) {
    df.set(a, b);
    fa(b, [a]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a, b, c) {
    var d = a.type || "unknown-event";
    a.currentTarget = c;
    Ub(d, b, void 0, a);
    a.currentTarget = null;
  }
  function se(a, b) {
    b = 0 !== (b & 4);
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = d.event;
      d = d.listeners;
      a: {
        var f2 = void 0;
        if (b) for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k = h.instance, l = h.currentTarget;
          h = h.listener;
          if (k !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l);
          f2 = k;
        }
        else for (g = 0; g < d.length; g++) {
          h = d[g];
          k = h.instance;
          l = h.currentTarget;
          h = h.listener;
          if (k !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l);
          f2 = k;
        }
      }
    }
    if (Qb) throw a = Rb, Qb = false, Rb = null, a;
  }
  function D(a, b) {
    var c = b[of];
    void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
    var d = a + "__bubble";
    c.has(d) || (pf(b, a, 2, false), c.add(d));
  }
  function qf(a, b, c) {
    var d = 0;
    b && (d |= 4);
    pf(c, a, d, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a) {
    if (!a[rf]) {
      a[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
      });
      var b = 9 === a.nodeType ? a : a.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a, b, c, d) {
    switch (jd(b)) {
      case 1:
        var e = ed;
        break;
      case 4:
        e = gd;
        break;
      default:
        e = fd;
    }
    c = e.bind(null, b, c, a);
    e = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
    d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
  }
  function hd(a, b, c, d, e) {
    var f2 = d;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
      if (null === d) return;
      var g = d.tag;
      if (3 === g || 4 === g) {
        var h = d.stateNode.containerInfo;
        if (h === e || 8 === h.nodeType && h.parentNode === e) break;
        if (4 === g) for (g = d.return; null !== g; ) {
          var k = g.tag;
          if (3 === k || 4 === k) {
            if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
          }
          g = g.return;
        }
        for (; null !== h; ) {
          g = Wc(h);
          if (null === g) return;
          k = g.tag;
          if (5 === k || 6 === k) {
            d = f2 = g;
            continue a;
          }
          h = h.parentNode;
        }
      }
      d = d.return;
    }
    Jb(function() {
      var d2 = f2, e2 = xb(c), g2 = [];
      a: {
        var h2 = df.get(a);
        if (void 0 !== h2) {
          var k2 = td, n = a;
          switch (a) {
            case "keypress":
              if (0 === od(c)) break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              n = "focus";
              k2 = Fd;
              break;
            case "focusout":
              n = "blur";
              k2 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k2 = Fd;
              break;
            case "click":
              if (2 === c.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k2 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k2 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k2 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k2 = Hd;
              break;
            case cf:
              k2 = Xd;
              break;
            case "scroll":
              k2 = vd;
              break;
            case "wheel":
              k2 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k2 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k2 = Td;
          }
          var t = 0 !== (b & 4), J2 = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
          t = [];
          for (var w = d2, u; null !== w; ) {
            u = w;
            var F2 = u.stateNode;
            5 === u.tag && null !== F2 && (u = F2, null !== x && (F2 = Kb(w, x), null != F2 && t.push(tf(w, F2, u))));
            if (J2) break;
            w = w.return;
          }
          0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a || "pointerover" === a;
          k2 = "mouseout" === a || "pointerout" === a;
          if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
          if (k2 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k2) {
              if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J2 = Vb(n), n !== J2 || 5 !== n.tag && 6 !== n.tag)) n = null;
            } else k2 = null, n = d2;
            if (k2 !== n) {
              t = Bd;
              F2 = "onMouseLeave";
              x = "onMouseEnter";
              w = "mouse";
              if ("pointerout" === a || "pointerover" === a) t = Td, F2 = "onPointerLeave", x = "onPointerEnter", w = "pointer";
              J2 = null == k2 ? h2 : ue(k2);
              u = null == n ? h2 : ue(n);
              h2 = new t(F2, w + "leave", k2, c, e2);
              h2.target = J2;
              h2.relatedTarget = u;
              F2 = null;
              Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J2, F2 = t);
              J2 = F2;
              if (k2 && n) b: {
                t = k2;
                x = n;
                w = 0;
                for (u = t; u; u = vf(u)) w++;
                u = 0;
                for (F2 = x; F2; F2 = vf(F2)) u++;
                for (; 0 < w - u; ) t = vf(t), w--;
                for (; 0 < u - w; ) x = vf(x), u--;
                for (; w--; ) {
                  if (t === x || null !== x && t === x.alternate) break b;
                  t = vf(t);
                  x = vf(x);
                }
                t = null;
              }
              else t = null;
              null !== k2 && wf(g2, h2, k2, t, false);
              null !== n && null !== J2 && wf(g2, J2, n, t, true);
            }
          }
        }
        a: {
          h2 = d2 ? ue(d2) : window;
          k2 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
          else if (me(h2)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
          if (na && (na = na(a, d2))) {
            ne(g2, na, c, e2);
            break a;
          }
          xa && xa(a, h2, d2);
          "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
        }
        xa = d2 ? ue(d2) : window;
        switch (a) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c, e2);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e2);
        }
        var $a;
        if (ae) b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
      }
      se(g2, b);
    });
  }
  function tf(a, b, c) {
    return { instance: a, listener: b, currentTarget: c };
  }
  function oe(a, b) {
    for (var c = b + "Capture", d = []; null !== a; ) {
      var e = a, f2 = e.stateNode;
      5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
      a = a.return;
    }
    return d;
  }
  function vf(a) {
    if (null === a) return null;
    do
      a = a.return;
    while (a && 5 !== a.tag);
    return a ? a : null;
  }
  function wf(a, b, c, d, e) {
    for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
      var h = c, k = h.alternate, l = h.stateNode;
      if (null !== k && k === d) break;
      5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f2), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f2), null != k && g.push(tf(c, k, h))));
      c = c.return;
    }
    0 !== g.length && a.push({ event: b, listeners: g });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a) {
    return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
  }
  function Af(a, b, c) {
    b = zf(b);
    if (zf(a) !== b && c) throw Error(p(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a, b) {
    return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
  function If(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function Kf(a, b) {
    var c = b, d = 0;
    do {
      var e = c.nextSibling;
      a.removeChild(c);
      if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
        if (0 === d) {
          a.removeChild(e);
          bd(b);
          return;
        }
        d--;
      } else "$" !== c && "$?" !== c && "$!" !== c || d++;
      c = e;
    } while (c);
    bd(b);
  }
  function Lf(a) {
    for (; null != a; a = a.nextSibling) {
      var b = a.nodeType;
      if (1 === b || 3 === b) break;
      if (8 === b) {
        b = a.data;
        if ("$" === b || "$!" === b || "$?" === b) break;
        if ("/$" === b) return null;
      }
    }
    return a;
  }
  function Mf(a) {
    a = a.previousSibling;
    for (var b = 0; a; ) {
      if (8 === a.nodeType) {
        var c = a.data;
        if ("$" === c || "$!" === c || "$?" === c) {
          if (0 === b) return a;
          b--;
        } else "/$" === c && b++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a) {
    var b = a[Of];
    if (b) return b;
    for (var c = a.parentNode; c; ) {
      if (b = c[uf] || c[Of]) {
        c = b.alternate;
        if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
          if (c = a[Of]) return c;
          a = Mf(a);
        }
        return b;
      }
      a = c;
      c = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    a = a[Of] || a[uf];
    return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
  }
  function ue(a) {
    if (5 === a.tag || 6 === a.tag) return a.stateNode;
    throw Error(p(33));
  }
  function Db(a) {
    return a[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a) {
    return { current: a };
  }
  function E(a) {
    0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a, b) {
    Tf++;
    Sf[Tf] = a.current;
    a.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Vf;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f2;
    for (f2 in c) e[f2] = b[f2];
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Zf(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function $f() {
    E(Wf);
    E(H);
  }
  function ag(a, b, c) {
    if (H.current !== Vf) throw Error(p(168));
    G(H, b);
    G(Wf, c);
  }
  function bg(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
    return A({}, c, d);
  }
  function cg(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(p(169));
    c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
    G(Wf, c);
  }
  var eg = null, fg = false, gg = false;
  function hg(a) {
    null === eg ? eg = [a] : eg.push(a);
  }
  function ig(a) {
    fg = true;
    hg(a);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a = 0, b = C;
      try {
        var c = eg;
        for (C = 1; a < c.length; a++) {
          var d = c[a];
          do
            d = d(true);
          while (null !== d);
        }
        eg = null;
        fg = false;
      } catch (e) {
        throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
      } finally {
        C = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a;
    ng = b;
  }
  function ug(a, b, c) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a;
    var d = rg;
    a = sg;
    var e = 32 - oc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f2 = 32 - oc(b) + e;
    if (30 < f2) {
      var g = e - e % 5;
      f2 = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      rg = 1 << 32 - oc(b) + e | c << e | d;
      sg = f2 + a;
    } else rg = 1 << f2 | c << e | d, sg = a;
  }
  function vg(a) {
    null !== a.return && (tg(a, 1), ug(a, 1, 0));
  }
  function wg(a) {
    for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I = false, zg = null;
  function Ag(a, b) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c.return = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function Cg(a, b) {
    switch (a.tag) {
      case 5:
        var c = a.type;
        b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function Eg(a) {
    if (I) {
      var b = yg;
      if (b) {
        var c = b;
        if (!Cg(a, b)) {
          if (Dg(a)) throw Error(p(418));
          b = Lf(c.nextSibling);
          var d = xg;
          b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
        }
      } else {
        if (Dg(a)) throw Error(p(418));
        a.flags = a.flags & -4097 | 2;
        I = false;
        xg = a;
      }
    }
  }
  function Fg(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
    xg = a;
  }
  function Gg(a) {
    if (a !== xg) return false;
    if (!I) return Fg(a), I = true, false;
    var b;
    (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a)) throw Hg(), Error(p(418));
      for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
    }
    Fg(a);
    if (13 === a.tag) {
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(p(317));
      a: {
        a = a.nextSibling;
        for (b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("/$" === c) {
              if (0 === b) {
                yg = Lf(a.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c && "$!" !== c && "$?" !== c || b++;
          }
          a = a.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a = yg; a; ) a = Lf(a.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I = false;
  }
  function Jg(a) {
    null === zg ? zg = [a] : zg.push(a);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(p(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(p(147, a));
        var e = d, f2 = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
        b = function(a2) {
          var b2 = e.refs;
          null === a2 ? delete b2[f2] : b2[f2] = a2;
        };
        b._stringRef = f2;
        return b;
      }
      if ("string" !== typeof a) throw Error(p(284));
      if (!c._owner) throw Error(p(290, a));
    }
    return a;
  }
  function Mg(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function Ng(a) {
    var b = a._init;
    return b(a._payload);
  }
  function Og(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.deletions;
        null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
      }
    }
    function c(c2, d2) {
      if (!a) return null;
      for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      a2 = Pg(a2, b2);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f2(b2, c2, d2) {
      b2.index = d2;
      if (!a) return b2.flags |= 1048576, c2;
      d2 = b2.alternate;
      if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
      b2.flags |= 2;
      return c2;
    }
    function g(b2) {
      a && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a2, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function k(a2, b2, c2, d2) {
      var f3 = c2.type;
      if (f3 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
      if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
      d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
      d2.ref = Lg(a2, b2, c2);
      d2.return = a2;
      return d2;
    }
    function l(a2, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2.children || []);
      b2.return = a2;
      return b2;
    }
    function m(a2, b2, c2, d2, f3) {
      if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function q(a2, b2, c2) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
          case wa:
            return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
          case Ha:
            var d2 = b2._init;
            return q(a2, d2(b2._payload), c2);
        }
        if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
        Mg(a2, b2);
      }
      return null;
    }
    function r(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case va:
            return c2.key === e2 ? k(a2, b2, c2, d2) : null;
          case wa:
            return c2.key === e2 ? l(a2, b2, c2, d2) : null;
          case Ha:
            return e2 = c2._init, r(
              a2,
              b2,
              e2(c2._payload),
              d2
            );
        }
        if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
        Mg(a2, c2);
      }
      return null;
    }
    function y(a2, b2, c2, d2, e2) {
      if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case va:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
          case wa:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
          case Ha:
            var f3 = d2._init;
            return y(a2, b2, c2, f3(d2._payload), e2);
        }
        if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
        Mg(b2, d2);
      }
      return null;
    }
    function n(e2, g2, h2, k2) {
      for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
        u.index > w ? (x = u, u = null) : x = u.sibling;
        var n2 = r(e2, u, h2[w], k2);
        if (null === n2) {
          null === u && (u = x);
          break;
        }
        a && u && null === n2.alternate && b(e2, u);
        g2 = f2(n2, g2, w);
        null === m2 ? l2 = n2 : m2.sibling = n2;
        m2 = n2;
        u = x;
      }
      if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
      if (null === u) {
        for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f2(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
        I && tg(e2, w);
        return l2;
      }
      for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f2(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
      a && u.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w);
      return l2;
    }
    function t(e2, g2, h2, k2) {
      var l2 = Ka(h2);
      if ("function" !== typeof l2) throw Error(p(150));
      h2 = l2.call(h2);
      if (null == h2) throw Error(p(151));
      for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
        m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
        var t2 = r(e2, m2, n2.value, k2);
        if (null === t2) {
          null === m2 && (m2 = x);
          break;
        }
        a && m2 && null === t2.alternate && b(e2, m2);
        g2 = f2(t2, g2, w);
        null === u ? l2 = t2 : u.sibling = t2;
        u = t2;
        m2 = x;
      }
      if (n2.done) return c(
        e2,
        m2
      ), I && tg(e2, w), l2;
      if (null === m2) {
        for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f2(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
        I && tg(e2, w);
        return l2;
      }
      for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f2(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
      a && m2.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w);
      return l2;
    }
    function J2(a2, d2, f3, h2) {
      "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case va:
            a: {
              for (var k2 = f3.key, l2 = d2; null !== l2; ) {
                if (l2.key === k2) {
                  k2 = f3.type;
                  if (k2 === ya) {
                    if (7 === l2.tag) {
                      c(a2, l2.sibling);
                      d2 = e(l2, f3.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                  } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                    c(a2, l2.sibling);
                    d2 = e(l2, f3.props);
                    d2.ref = Lg(a2, l2, f3);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                  c(a2, l2);
                  break;
                } else b(a2, l2);
                l2 = l2.sibling;
              }
              f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
            }
            return g(a2);
          case wa:
            a: {
              for (l2 = f3.key; null !== d2; ) {
                if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
                else b(a2, d2);
                d2 = d2.sibling;
              }
              d2 = Sg(f3, a2.mode, h2);
              d2.return = a2;
              a2 = d2;
            }
            return g(a2);
          case Ha:
            return l2 = f3._init, J2(a2, d2, l2(f3._payload), h2);
        }
        if (eb(f3)) return n(a2, d2, f3, h2);
        if (Ka(f3)) return t(a2, d2, f3, h2);
        Mg(a2, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
    }
    return J2;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a) {
    var b = Wg.current;
    E(Wg);
    a._currentValue = b;
  }
  function bh(a, b, c) {
    for (; null !== a; ) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c) break;
      a = a.return;
    }
  }
  function ch(a, b) {
    Xg = a;
    Zg = Yg = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
  }
  function eh(a) {
    var b = a._currentValue;
    if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg) throw Error(p(308));
      Yg = a;
      Xg.dependencies = { lanes: 0, firstContext: a };
    } else Yg = Yg.next = a;
    return b;
  }
  var fh = null;
  function gh(a) {
    null === fh ? fh = [a] : fh.push(a);
  }
  function hh(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return ih(a, d);
  }
  function ih(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  var jh = false;
  function kh(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function mh(a, b) {
    return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a, b, c) {
    var d = a.updateQueue;
    if (null === d) return null;
    d = d.shared;
    if (0 !== (K & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return ih(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return ih(a, c);
  }
  function oh(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  function ph(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null, f2 = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f2 ? e = f2 = g : f2 = f2.next = g;
          c = c.next;
        } while (null !== c);
        null === f2 ? e = f2 = b : f2 = f2.next = b;
      } else e = f2 = b;
      c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
      a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }
  function qh(a, b, c, d) {
    var e = a.updateQueue;
    jh = false;
    var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k = h, l = k.next;
      k.next = null;
      null === g ? f2 = l : g.next = l;
      g = k;
      var m = a.alternate;
      null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
    }
    if (null !== f2) {
      var q = e.baseState;
      g = 0;
      m = l = k = null;
      h = f2;
      do {
        var r = h.lane, y = h.eventTime;
        if ((d & r) === r) {
          null !== m && (m = m.next = {
            eventTime: y,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n = a, t = h;
            r = b;
            y = c;
            switch (t.tag) {
              case 1:
                n = t.payload;
                if ("function" === typeof n) {
                  q = n.call(y, q, r);
                  break a;
                }
                q = n;
                break a;
              case 3:
                n.flags = n.flags & -65537 | 128;
              case 0:
                n = t.payload;
                r = "function" === typeof n ? n.call(y, q, r) : n;
                if (null === r || void 0 === r) break a;
                q = A({}, q, r);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
        } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;
        else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
      } while (1);
      null === m && (k = q);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = m;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do
          g |= e.lane, e = e.next;
        while (e !== b);
      } else null === f2 && (e.shared.lanes = 0);
      rh |= g;
      a.lanes = g;
      a.memoizedState = q;
    }
  }
  function sh(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(p(191, e));
        e.call(d);
      }
    }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a) {
    if (a === th) throw Error(p(174));
    return a;
  }
  function yh(a, b) {
    G(wh, b);
    G(vh, a);
    G(uh, th);
    a = b.nodeType;
    switch (a) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
    }
    E(uh);
    G(uh, b);
  }
  function zh() {
    E(uh);
    E(vh);
    E(wh);
  }
  function Ah(a) {
    xh(wh.current);
    var b = xh(uh.current);
    var c = lb(b, a.type);
    b !== c && (G(vh, a), G(uh, c));
  }
  function Bh(a) {
    vh.current === a && (E(uh), E(vh));
  }
  var L = Uf(0);
  function Ch(a) {
    for (var b = a; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P2() {
    throw Error(p(321));
  }
  function Mh(a, b) {
    if (null === b) return false;
    for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
    return true;
  }
  function Nh(a, b, c, d, e, f2) {
    Hh = f2;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
    a = c(d, e);
    if (Jh) {
      f2 = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f2) throw Error(p(301));
        f2 += 1;
        O = N = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a = c(d, e);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b) throw Error(p(300));
    return a;
  }
  function Sh() {
    var a = 0 !== Kh;
    Kh = 0;
    return a;
  }
  function Th() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a = M.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = N.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N = a;
    else {
      if (null === a) throw Error(p(310));
      N = a;
      a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
    }
    return O;
  }
  function Vh(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Wh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = N, e = d.baseQueue, f2 = c.pending;
    if (null !== f2) {
      if (null !== e) {
        var g = e.next;
        e.next = f2.next;
        f2.next = g;
      }
      d.baseQueue = e = f2;
      c.pending = null;
    }
    if (null !== e) {
      f2 = e.next;
      d = d.baseState;
      var h = g = null, k = null, l = f2;
      do {
        var m = l.lane;
        if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
        else {
          var q = {
            lane: m,
            action: l.action,
            hasEagerState: l.hasEagerState,
            eagerState: l.eagerState,
            next: null
          };
          null === k ? (h = k = q, g = d) : k = k.next = q;
          M.lanes |= m;
          rh |= m;
        }
        l = l.next;
      } while (null !== l && l !== f2);
      null === k ? g = d : k.next = h;
      He(d, b.memoizedState) || (dh = true);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do
        f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
      while (e !== a);
    } else null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function Xh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
    if (null !== e) {
      c.pending = null;
      var g = e = e.next;
      do
        f2 = a(f2, g.action), g = g.next;
      while (g !== e);
      He(f2, b.memoizedState) || (dh = true);
      b.memoizedState = f2;
      null === b.baseQueue && (b.baseState = f2);
      c.lastRenderedState = f2;
    }
    return [f2, d];
  }
  function Yh() {
  }
  function Zh(a, b) {
    var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
    f2 && (d.memoizedState = e, dh = true);
    d = d.queue;
    $h(ai.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
      c.flags |= 2048;
      bi(9, ci.bind(null, c, d, e, b), void 0, null);
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(c, b, e);
    }
    return e;
  }
  function di(a, b, c) {
    a.flags |= 16384;
    a = { getSnapshot: b, value: c };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function ci(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    ei(b) && fi(a);
  }
  function ai(a, b, c) {
    return c(function() {
      ei(b) && fi(a);
    });
  }
  function ei(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !He(a, c);
    } catch (d) {
      return true;
    }
  }
  function fi(a) {
    var b = ih(a, 1);
    null !== b && gi(b, a, 1, -1);
  }
  function hi(a) {
    var b = Th();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
    b.queue = a;
    a = a.dispatch = ii.bind(null, M, a);
    return [b.memoizedState, a];
  }
  function bi(a, b, c, d) {
    a = { tag: a, create: b, destroy: c, deps: d, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a, b, c, d) {
    var e = Th();
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function li(a, b, c, d) {
    var e = Uh();
    d = void 0 === d ? null : d;
    var f2 = void 0;
    if (null !== N) {
      var g = N.memoizedState;
      f2 = g.destroy;
      if (null !== d && Mh(d, g.deps)) {
        e.memoizedState = bi(b, c, f2, d);
        return;
      }
    }
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, f2, d);
  }
  function mi(a, b) {
    return ki(8390656, 8, a, b);
  }
  function $h(a, b) {
    return li(2048, 8, a, b);
  }
  function ni(a, b) {
    return li(4, 2, a, b);
  }
  function oi(a, b) {
    return li(4, 4, a, b);
  }
  function pi(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
      b.current = null;
    };
  }
  function qi(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return li(4, 4, pi.bind(null, b, a), c);
  }
  function ri() {
  }
  function si(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function ti(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function ui(a, b, c) {
    if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
    He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
    return b;
  }
  function vi(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(true);
    var d = Gh.transition;
    Gh.transition = {};
    try {
      a(false), b();
    } finally {
      C = c, Gh.transition = d;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a, b, c) {
    var d = yi(a);
    c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, c);
    else if (c = hh(a, b, c, d), null !== c) {
      var e = R();
      gi(c, a, d, e);
      Bi(c, b, d);
    }
  }
  function ii(a, b, c) {
    var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, e);
    else {
      var f2 = a.alternate;
      if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
        var g = b.lastRenderedState, h = f2(g, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g)) {
          var k = b.interleaved;
          null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l) {
      } finally {
      }
      c = hh(a, b, e, d);
      null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
    }
  }
  function zi(a) {
    var b = a.alternate;
    return a === M || null !== b && b === M;
  }
  function Ai(a, b) {
    Jh = Ih = true;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Bi(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  var Rh = { readContext: eh, useCallback: P2, useContext: P2, useEffect: P2, useImperativeHandle: P2, useInsertionEffect: P2, useLayoutEffect: P2, useMemo: P2, useReducer: P2, useRef: P2, useState: P2, useDebugValue: P2, useDeferredValue: P2, useTransition: P2, useMutableSource: P2, useSyncExternalStore: P2, useId: P2, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
    Th().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a),
      c
    );
  }, useLayoutEffect: function(a, b) {
    return ki(4194308, 4, a, b);
  }, useInsertionEffect: function(a, b) {
    return ki(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Th();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  }, useReducer: function(a, b, c) {
    var d = Th();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
    d.queue = a;
    a = a.dispatch = xi.bind(null, M, a);
    return [d.memoizedState, a];
  }, useRef: function(a) {
    var b = Th();
    a = { current: a };
    return b.memoizedState = a;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
    return Th().memoizedState = a;
  }, useTransition: function() {
    var a = hi(false), b = a[0];
    a = vi.bind(null, a[1]);
    Th().memoizedState = a;
    return [b, a];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a, b, c) {
    var d = M, e = Th();
    if (I) {
      if (void 0 === c) throw Error(p(407));
      c = c();
    } else {
      c = b();
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(d, b, c);
    }
    e.memoizedState = c;
    var f2 = { value: c, getSnapshot: b };
    e.queue = f2;
    mi(ai.bind(
      null,
      d,
      f2,
      a
    ), [a]);
    d.flags |= 2048;
    bi(9, ci.bind(null, d, f2, c, b), void 0, null);
    return c;
  }, useId: function() {
    var a = Th(), b = Q.identifierPrefix;
    if (I) {
      var c = sg;
      var d = rg;
      c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
      b = ":" + b + "R" + c;
      c = Kh++;
      0 < c && (b += "H" + c.toString(32));
      b += ":";
    } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
    return a.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a) {
      var b = Uh();
      return ui(b, N.memoizedState, a);
    },
    useTransition: function() {
      var a = Wh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a) {
    var b = Uh();
    return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
  }, useTransition: function() {
    var a = Xh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a, b) {
    if (a && a.defaultProps) {
      b = A({}, b);
      a = a.defaultProps;
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  function Di(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : A({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var Ei = { isMounted: function(a) {
    return (a = a._reactInternals) ? Vb(a) === a : false;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f2 = mh(d, e);
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a, f2, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f2 = mh(d, e);
    f2.tag = 1;
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a, f2, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = R(), d = yi(a), e = mh(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = nh(a, e, d);
    null !== b && (gi(b, a, d, c), oh(b, a, d));
  } };
  function Fi(a, b, c, d, e, f2, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
  }
  function Gi(a, b, c) {
    var d = false, e = Vf;
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
    b = new b(c, f2);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
    return b;
  }
  function Hi(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = {};
    kh(a);
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
    e.state = a.memoizedState;
    f2 = b.getDerivedStateFromProps;
    "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function Ji(a, b) {
    try {
      var c = "", d = b;
      do
        c += Pa(d), d = d.return;
      while (d);
      var e = c;
    } catch (f2) {
      e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a, source: b, stack: e, digest: null };
  }
  function Ki(a, b, c) {
    return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
  }
  function Li(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Oi || (Oi = true, Pi = d);
      Li(a, b);
    };
    return c;
  }
  function Qi(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function() {
        return d(e);
      };
      c.callback = function() {
        Li(a, b);
      };
    }
    var f2 = a.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
      Li(a, b);
      "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  function Si(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new Mi();
      var e = /* @__PURE__ */ new Set();
      d.set(b, e);
    } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
  }
  function Ui(a) {
    do {
      var b;
      if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b) return a;
      a = a.return;
    } while (null !== a);
    return null;
  }
  function Vi(a, b, c, d, e) {
    if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a, b, c, d) {
    b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
  }
  function Yi(a, b, c, d, e) {
    c = c.render;
    var f2 = b.ref;
    ch(b, e);
    d = Nh(a, b, c, d, f2, e);
    c = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && c && vg(b);
    b.flags |= 1;
    Xi(a, b, d, e);
    return b.child;
  }
  function $i(a, b, c, d, e) {
    if (null === a) {
      var f2 = c.type;
      if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
      a = Rg(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    f2 = a.child;
    if (0 === (a.lanes & e)) {
      var g = f2.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Ie;
      if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
    }
    b.flags |= 1;
    a = Pg(f2, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  function bj(a, b, c, d, e) {
    if (null !== a) {
      var f2 = a.memoizedProps;
      if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
      else return b.lanes = a.lanes, Zi(a, b, e);
    }
    return cj(a, b, c, d, e);
  }
  function dj(a, b, c) {
    var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
    else {
      if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f2 ? f2.baseLanes : c;
      G(ej, fj);
      fj |= d;
    }
    else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
    Xi(a, b, e, c);
    return b.child;
  }
  function gj(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a, b, c, d, e) {
    var f2 = Zf(c) ? Xf : H.current;
    f2 = Yf(b, f2);
    ch(b, e);
    c = Nh(a, b, c, d, f2, e);
    d = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && d && vg(b);
    b.flags |= 1;
    Xi(a, b, c, e);
    return b.child;
  }
  function hj(a, b, c, d, e) {
    if (Zf(c)) {
      var f2 = true;
      cg(b);
    } else f2 = false;
    ch(b, e);
    if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
    else if (null === a) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k = g.context, l = c.contextType;
      "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
      var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
      q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
      jh = false;
      var r = b.memoizedState;
      g.state = r;
      qh(b, d, g, e);
      k = b.memoizedState;
      h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      lh(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : Ci(b.type, h);
      g.props = l;
      q = b.pendingProps;
      r = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
      var y = c.getDerivedStateFromProps;
      (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
      jh = false;
      r = b.memoizedState;
      g.state = r;
      qh(b, d, g, e);
      var n = b.memoizedState;
      h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
    }
    return jj(a, b, c, d, f2, e);
  }
  function jj(a, b, c, d, e, f2) {
    gj(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
    d = b.stateNode;
    Wi.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
    b.memoizedState = d.state;
    e && dg(b, c, true);
    return b.child;
  }
  function kj(a) {
    var b = a.stateNode;
    b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
    yh(a, b.containerInfo);
  }
  function lj(a, b, c, d, e) {
    Ig();
    Jg(e);
    b.flags |= 256;
    Xi(a, b, c, d);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a) {
    return { baseLanes: a, cachePool: null, transitions: null };
  }
  function oj(a, b, c) {
    var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
    (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    if (h) f2 = true, b.flags &= -129;
    else if (null === a || null !== a.memoizedState) e |= 1;
    G(L, e & 1);
    if (null === a) {
      Eg(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
    if (f2) {
      f2 = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k = { mode: "hidden", children: d.children };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
      f2.return = b;
      d.return = b;
      d.sibling = f2;
      b.child = d;
      d = f2;
      f2 = b.child;
      g = a.child.memoizedState;
      g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
      f2.memoizedState = g;
      f2.childLanes = a.childLanes & ~c;
      b.memoizedState = mj;
      return d;
    }
    f2 = a.child;
    a = f2.sibling;
    d = Pg(f2, { mode: "visible", children: d.children });
    0 === (b.mode & 1) && (d.lanes = c);
    d.return = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function qj(a, b) {
    b = pj({ mode: "visible", children: b }, a.mode, 0, null);
    b.return = a;
    return a.child = b;
  }
  function sj(a, b, c, d) {
    null !== d && Jg(d);
    Ug(b, a.child, null, c);
    a = qj(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function rj(a, b, c, d, e, f2, g) {
    if (c) {
      if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
      if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
      f2 = d.fallback;
      e = b.mode;
      d = pj({ mode: "visible", children: d.children }, e, 0, null);
      f2 = Tg(f2, e, g, null);
      f2.flags |= 2;
      d.return = b;
      f2.return = b;
      d.sibling = f2;
      b.child = d;
      0 !== (b.mode & 1) && Ug(b, a.child, null, g);
      b.child.memoizedState = nj(g);
      b.memoizedState = mj;
      return f2;
    }
    if (0 === (b.mode & 1)) return sj(a, b, g, null);
    if ("$!" === e.data) {
      d = e.nextSibling && e.nextSibling.dataset;
      if (d) var h = d.dgst;
      d = h;
      f2 = Error(p(419));
      d = Ki(f2, d, void 0);
      return sj(a, b, g, d);
    }
    h = 0 !== (g & a.childLanes);
    if (dh || h) {
      d = Q;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
      }
      tj();
      d = Ki(Error(p(421)));
      return sj(a, b, g, d);
    }
    if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
    a = f2.treeContext;
    yg = Lf(e.nextSibling);
    xg = b;
    I = true;
    zg = null;
    null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
    b = qj(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    bh(a.return, b, c);
  }
  function wj(a, b, c, d, e) {
    var f2 = a.memoizedState;
    null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
  }
  function xj(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
    Xi(a, b, d.children, c);
    d = L.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
    else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
        if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
        else if (19 === a.tag) vj(a, c, b);
        else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === b) break a;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === b) break a;
          a = a.return;
        }
        a.sibling.return = a.return;
        a = a.sibling;
      }
      d &= 1;
    }
    G(L, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;
    else switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        wj(b, false, e, c, f2);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Ch(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        wj(b, true, c, null, f2);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function ij(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    rh |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a && b.child !== a.child) throw Error(p(153));
    if (null !== b.child) {
      a = b.child;
      c = Pg(a, a.pendingProps);
      b.child = c;
      for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  function yj(a, b, c) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d = b.type._context, e = b.memoizedProps.value;
        G(Wg, d._currentValue);
        d._currentValue = e;
        break;
      case 13:
        d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
          G(L, L.current & 1);
          a = Zi(a, b, c);
          return null !== a ? a.sibling : null;
        }
        G(L, L.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d) return xj(a, b, c);
          b.flags |= 128;
        }
        e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        G(L, L.current);
        if (d) break;
        else return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a, b, c);
    }
    return Zi(a, b, c);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a, b) {
    for (var c = b.child; null !== c; ) {
      if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
      else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b) return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a, b, c, d) {
    var e = a.memoizedProps;
    if (e !== d) {
      a = b.stateNode;
      xh(uh.current);
      var f2 = null;
      switch (c) {
        case "input":
          e = Ya(a, e);
          d = Ya(a, d);
          f2 = [];
          break;
        case "select":
          e = A({}, e, { value: void 0 });
          d = A({}, d, { value: void 0 });
          f2 = [];
          break;
        case "textarea":
          e = gb(a, e);
          d = gb(a, d);
          f2 = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
      }
      ub(c, d);
      var g;
      c = null;
      for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
        var h = e[l];
        for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
      } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f2 || (f2 = []) : (f2 = f2 || []).push(l, null));
      for (l in d) {
        var k = d[l];
        h = null != e ? e[l] : void 0;
        if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
          for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
        } else c || (f2 || (f2 = []), f2.push(
          l,
          c
        )), c = k;
        else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f2 = f2 || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f2 = f2 || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f2 || h === k || (f2 = [])) : (f2 = f2 || []).push(l, k));
      }
      c && (f2 = f2 || []).push("style", c);
      var l = f2;
      if (b.updateQueue = l) b.flags |= 4;
    }
  };
  Cj = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Dj(a, b) {
    if (!I) switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }
  function S2(a) {
    var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
    if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
    else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
    a.subtreeFlags |= d;
    a.childLanes = c;
    return b;
  }
  function Ej(a, b, c) {
    var d = b.pendingProps;
    wg(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S2(b), null;
      case 1:
        return Zf(b.type) && $f(), S2(b), null;
      case 3:
        d = b.stateNode;
        zh();
        E(Wf);
        E(H);
        Eh();
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a, b);
        S2(b);
        return null;
      case 5:
        Bh(b);
        var e = xh(wh.current);
        c = b.type;
        if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d) {
            if (null === b.stateNode) throw Error(p(166));
            S2(b);
            return null;
          }
          a = xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.type;
            var f2 = b.memoizedProps;
            d[Of] = b;
            d[Pf] = f2;
            a = 0 !== (b.mode & 1);
            switch (c) {
              case "dialog":
                D("cancel", d);
                D("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d);
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], d);
                break;
              case "source":
                D("error", d);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d
                );
                D("load", d);
                break;
              case "details":
                D("toggle", d);
                break;
              case "input":
                Za(d, f2);
                D("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!f2.multiple };
                D("invalid", d);
                break;
              case "textarea":
                hb(d, f2), D("invalid", d);
            }
            ub(c, f2);
            e = null;
            for (var g in f2) if (f2.hasOwnProperty(g)) {
              var h = f2[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
            }
            switch (c) {
              case "input":
                Va(d);
                db(d, f2, true);
                break;
              case "textarea":
                Va(d);
                jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f2.onClick && (d.onclick = Bf);
            }
            d = e;
            b.updateQueue = d;
            null !== d && (b.flags |= 4);
          } else {
            g = 9 === e.nodeType ? e : e.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
            "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
            a[Of] = b;
            a[Pf] = d;
            zj(a, b, false, false);
            b.stateNode = a;
            a: {
              g = vb(c, d);
              switch (c) {
                case "dialog":
                  D("cancel", a);
                  D("close", a);
                  e = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a);
                  e = d;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], a);
                  e = d;
                  break;
                case "source":
                  D("error", a);
                  e = d;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a
                  );
                  D("load", a);
                  e = d;
                  break;
                case "details":
                  D("toggle", a);
                  e = d;
                  break;
                case "input":
                  Za(a, d);
                  e = Ya(a, d);
                  D("invalid", a);
                  break;
                case "option":
                  e = d;
                  break;
                case "select":
                  a._wrapperState = { wasMultiple: !!d.multiple };
                  e = A({}, d, { value: void 0 });
                  D("invalid", a);
                  break;
                case "textarea":
                  hb(a, d);
                  e = gb(a, d);
                  D("invalid", a);
                  break;
                default:
                  e = d;
              }
              ub(c, e);
              h = e;
              for (f2 in h) if (h.hasOwnProperty(f2)) {
                var k = h[f2];
                "style" === f2 ? sb(a, k) : "dangerouslySetInnerHTML" === f2 ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f2 ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k && "onScroll" === f2 && D("scroll", a) : null != k && ta(a, f2, k, g));
              }
              switch (c) {
                case "input":
                  Va(a);
                  db(a, d, false);
                  break;
                case "textarea":
                  Va(a);
                  jb(a);
                  break;
                case "option":
                  null != d.value && a.setAttribute("value", "" + Sa(d.value));
                  break;
                case "select":
                  a.multiple = !!d.multiple;
                  f2 = d.value;
                  null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                    a,
                    !!d.multiple,
                    d.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e.onClick && (a.onclick = Bf);
              }
              switch (c) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break a;
                case "img":
                  d = true;
                  break a;
                default:
                  d = false;
              }
            }
            d && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S2(b);
        return null;
      case 6:
        if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
          c = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.memoizedProps;
            d[Of] = b;
            if (f2 = d.nodeValue !== c) {
              if (a = xg, null !== a) switch (a.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
              }
            }
            f2 && (b.flags |= 4);
          } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
        }
        S2(b);
        return null;
      case 13:
        E(L);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
          else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!f2) throw Error(p(318));
              f2 = b.memoizedState;
              f2 = null !== f2 ? f2.dehydrated : null;
              if (!f2) throw Error(p(317));
              f2[Of] = b;
            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S2(b);
            f2 = false;
          } else null !== zg && (Fj(zg), zg = null), f2 = true;
          if (!f2) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        d = null !== d;
        d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S2(b);
        return null;
      case 4:
        return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S2(b), null;
      case 10:
        return ah(b.type._context), S2(b), null;
      case 17:
        return Zf(b.type) && $f(), S2(b), null;
      case 19:
        E(L);
        f2 = b.memoizedState;
        if (null === f2) return S2(b), null;
        d = 0 !== (b.flags & 128);
        g = f2.rendering;
        if (null === g) if (d) Dj(f2, false);
        else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
            g = Ch(a);
            if (null !== g) {
              b.flags |= 128;
              Dj(f2, false);
              d = g.updateQueue;
              null !== d && (b.updateQueue = d, b.flags |= 4);
              b.subtreeFlags = 0;
              d = c;
              for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
              G(L, L.current & 1 | 2);
              return b.child;
            }
            a = a.sibling;
          }
          null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        }
        else {
          if (!d) if (a = Ch(g), null !== a) {
            if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S2(b), null;
          } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
          f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
        }
        if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
        S2(b);
        return null;
      case 22:
      case 23:
        return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S2(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S2(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, b.tag));
  }
  function Ij(a, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E(L);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate) throw Error(p(340));
          Ig();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return E(L), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V2 = null;
  function Lj(a, b) {
    var c = a.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      W(a, b, d);
    }
    else c.current = null;
  }
  function Mj(a, b, c) {
    try {
      c();
    } catch (d) {
      W(a, b, d);
    }
  }
  var Nj = false;
  function Oj(a, b) {
    Cf = dd;
    a = Me();
    if (Ne(a)) {
      if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
      else a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f2.nodeType;
          } catch (F2) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
          b: for (; ; ) {
            for (var y; ; ) {
              q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
              q !== f2 || 0 !== d && 3 !== q.nodeType || (k = g + d);
              3 === q.nodeType && (g += q.nodeValue.length);
              if (null === (y = q.firstChild)) break;
              r = q;
              q = y;
            }
            for (; ; ) {
              if (q === a) break b;
              r === c && ++l === e && (h = g);
              r === f2 && ++m === d && (k = g);
              if (null !== (y = q.nextSibling)) break;
              q = r;
              r = q.parentNode;
            }
            q = y;
          }
          c = -1 === h || -1 === k ? null : { start: h, end: k };
        } else c = null;
      }
      c = c || { start: 0, end: 0 };
    } else c = null;
    Df = { focusedElem: a, selectionRange: c };
    dd = false;
    for (V2 = b; null !== V2; ) if (b = V2, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V2 = a;
    else for (; null !== V2; ) {
      b = V2;
      try {
        var n = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n) {
              var t = n.memoizedProps, J2 = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J2);
              x.__reactInternalSnapshotBeforeUpdate = w;
            }
            break;
          case 3:
            var u = b.stateNode.containerInfo;
            1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p(163));
        }
      } catch (F2) {
        W(b, b.return, F2);
      }
      a = b.sibling;
      if (null !== a) {
        a.return = b.return;
        V2 = a;
        break;
      }
      V2 = b.return;
    }
    n = Nj;
    Nj = false;
    return n;
  }
  function Pj(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f2 = e.destroy;
          e.destroy = void 0;
          void 0 !== f2 && Mj(b, c, f2);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Qj(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Rj(a) {
    var b = a.ref;
    if (null !== b) {
      var c = a.stateNode;
      switch (a.tag) {
        case 5:
          a = c;
          break;
        default:
          a = c;
      }
      "function" === typeof b ? b(a) : b.current = a;
    }
  }
  function Sj(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Sj(b));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a.stateNode = null;
    a.return = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Tj(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Uj(a) {
    a: for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Tj(a.return)) return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2) continue a;
        if (null === a.child || 4 === a.tag) continue a;
        else a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function Vj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
  }
  function Wj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
    else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
  }
  var X = null, Xj = false;
  function Yj(a, b, c) {
    for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
  }
  function Zj(a, b, c) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
    switch (c.tag) {
      case 5:
        U || Lj(c, b);
      case 6:
        var d = X, e = Xj;
        X = null;
        Yj(a, b, c);
        X = d;
        Xj = e;
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
        break;
      case 4:
        d = X;
        e = Xj;
        X = c.stateNode.containerInfo;
        Xj = true;
        Yj(a, b, c);
        X = d;
        Xj = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f2 = e, g = f2.destroy;
            f2 = f2.tag;
            void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Yj(a, b, c);
        break;
      case 1:
        if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W(c, b, h);
        }
        Yj(a, b, c);
        break;
      case 21:
        Yj(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
        break;
      default:
        Yj(a, b, c);
    }
  }
  function ak(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Kj());
      b.forEach(function(b2) {
        var d = bk.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function ck(a, b) {
    var c = b.deletions;
    if (null !== c) for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f2 = a, g = b, h = g;
        a: for (; null !== h; ) {
          switch (h.tag) {
            case 5:
              X = h.stateNode;
              Xj = false;
              break a;
            case 3:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h = h.return;
        }
        if (null === X) throw Error(p(160));
        Zj(f2, g, e);
        X = null;
        Xj = false;
        var k = e.alternate;
        null !== k && (k.return = null);
        e.return = null;
      } catch (l) {
        W(e, b, l);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
  }
  function dk(a, b) {
    var c = a.alternate, d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a);
        ek(a);
        if (d & 4) {
          try {
            Pj(3, a, a.return), Qj(3, a);
          } catch (t) {
            W(a, a.return, t);
          }
          try {
            Pj(5, a, a.return);
          } catch (t) {
            W(a, a.return, t);
          }
        }
        break;
      case 1:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        break;
      case 5:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        if (a.flags & 32) {
          var e = a.stateNode;
          try {
            ob(e, "");
          } catch (t) {
            W(a, a.return, t);
          }
        }
        if (d & 4 && (e = a.stateNode, null != e)) {
          var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k = a.updateQueue;
          a.updateQueue = null;
          if (null !== k) try {
            "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
            vb(h, g);
            var l = vb(h, f2);
            for (g = 0; g < k.length; g += 2) {
              var m = k[g], q = k[g + 1];
              "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
            }
            switch (h) {
              case "input":
                bb(e, f2);
                break;
              case "textarea":
                ib(e, f2);
                break;
              case "select":
                var r = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y = f2.value;
                null != y ? fb(e, !!f2.multiple, y, false) : r !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t) {
            W(a, a.return, t);
          }
        }
        break;
      case 6:
        ck(b, a);
        ek(a);
        if (d & 4) {
          if (null === a.stateNode) throw Error(p(162));
          e = a.stateNode;
          f2 = a.memoizedProps;
          try {
            e.nodeValue = f2;
          } catch (t) {
            W(a, a.return, t);
          }
        }
        break;
      case 3:
        ck(b, a);
        ek(a);
        if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t) {
          W(a, a.return, t);
        }
        break;
      case 4:
        ck(b, a);
        ek(a);
        break;
      case 13:
        ck(b, a);
        ek(a);
        e = a.child;
        e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
        d & 4 && ak(a);
        break;
      case 22:
        m = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
        ek(a);
        if (d & 8192) {
          l = null !== a.memoizedState;
          if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V2 = a, m = a.child; null !== m; ) {
            for (q = V2 = m; null !== V2; ) {
              r = V2;
              y = r.child;
              switch (r.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r, r.return);
                  break;
                case 1:
                  Lj(r, r.return);
                  var n = r.stateNode;
                  if ("function" === typeof n.componentWillUnmount) {
                    d = r;
                    c = r.return;
                    try {
                      b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                    } catch (t) {
                      W(d, c, t);
                    }
                  }
                  break;
                case 5:
                  Lj(r, r.return);
                  break;
                case 22:
                  if (null !== r.memoizedState) {
                    gk(q);
                    continue;
                  }
              }
              null !== y ? (y.return = r, V2 = y) : gk(q);
            }
            m = m.sibling;
          }
          a: for (m = null, q = a; ; ) {
            if (5 === q.tag) {
              if (null === m) {
                m = q;
                try {
                  e = q.stateNode, l ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                } catch (t) {
                  W(a, a.return, t);
                }
              }
            } else if (6 === q.tag) {
              if (null === m) try {
                q.stateNode.nodeValue = l ? "" : q.memoizedProps;
              } catch (t) {
                W(a, a.return, t);
              }
            } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
              q.child.return = q;
              q = q.child;
              continue;
            }
            if (q === a) break a;
            for (; null === q.sibling; ) {
              if (null === q.return || q.return === a) break a;
              m === q && (m = null);
              q = q.return;
            }
            m === q && (m = null);
            q.sibling.return = q.return;
            q = q.sibling;
          }
        }
        break;
      case 19:
        ck(b, a);
        ek(a);
        d & 4 && ak(a);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a
        ), ek(a);
    }
  }
  function ek(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        a: {
          for (var c = a.return; null !== c; ) {
            if (Tj(c)) {
              var d = c;
              break a;
            }
            c = c.return;
          }
          throw Error(p(160));
        }
        switch (d.tag) {
          case 5:
            var e = d.stateNode;
            d.flags & 32 && (ob(e, ""), d.flags &= -33);
            var f2 = Uj(a);
            Wj(a, f2, e);
            break;
          case 3:
          case 4:
            var g = d.stateNode.containerInfo, h = Uj(a);
            Vj(a, h, g);
            break;
          default:
            throw Error(p(161));
        }
      } catch (k) {
        W(a, a.return, k);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function hk(a, b, c) {
    V2 = a;
    ik(a);
  }
  function ik(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== V2; ) {
      var e = V2, f2 = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Jj;
        if (!g) {
          var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
          h = Jj;
          var l = U;
          Jj = g;
          if ((U = k) && !l) for (V2 = e; null !== V2; ) g = V2, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V2 = k) : jk(e);
          for (; null !== f2; ) V2 = f2, ik(f2), f2 = f2.sibling;
          V2 = e;
          Jj = h;
          U = l;
        }
        kk(a);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V2 = f2) : kk(a);
    }
  }
  function kk(a) {
    for (; null !== V2; ) {
      var b = V2;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Qj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
              else {
                var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f2 = b.updateQueue;
              null !== f2 && sh(b, f2, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c = b.child.stateNode;
                    break;
                  case 1:
                    c = b.child.stateNode;
                }
                sh(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k.autoFocus && c.focus();
                    break;
                  case "img":
                    k.src && (c.src = k.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l = b.alternate;
                if (null !== l) {
                  var m = l.memoizedState;
                  if (null !== m) {
                    var q = m.dehydrated;
                    null !== q && bd(q);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
          U || b.flags & 512 && Rj(b);
        } catch (r) {
          W(b, b.return, r);
        }
      }
      if (b === a) {
        V2 = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V2 = c;
        break;
      }
      V2 = b.return;
    }
  }
  function gk(a) {
    for (; null !== V2; ) {
      var b = V2;
      if (b === a) {
        V2 = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V2 = c;
        break;
      }
      V2 = b.return;
    }
  }
  function jk(a) {
    for (; null !== V2; ) {
      var b = V2;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b.return;
            try {
              Qj(4, b);
            } catch (k) {
              W(b, c, k);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b.return;
              try {
                d.componentDidMount();
              } catch (k) {
                W(b, e, k);
              }
            }
            var f2 = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, f2, k);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, g, k);
            }
        }
      } catch (k) {
        W(b, b.return, k);
      }
      if (b === a) {
        V2 = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        V2 = h;
        break;
      }
      V2 = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a = C;
    if (0 !== a) return a;
    a = window.event;
    a = void 0 === a ? 16 : jd(a.type);
    return a;
  }
  function gi(a, b, c, d) {
    if (50 < yk) throw yk = 0, zk = null, Error(p(185));
    Ac(a, c, d);
    if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a, b) {
    var c = a.callbackNode;
    wc(a, b);
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
    else if (b = d & -d, a.callbackPriority !== b) {
      null != c && bc(c);
      if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
        0 === (K & 6) && jg();
      }), c = null;
      else {
        switch (Dc(d)) {
          case 1:
            c = fc;
            break;
          case 4:
            c = gc;
            break;
          case 16:
            c = hc;
            break;
          case 536870912:
            c = jc;
            break;
          default:
            c = hc;
        }
        c = Fk(c, Gk.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Gk(a, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6)) throw Error(p(327));
    var c = a.callbackNode;
    if (Hk() && a.callbackNode !== c) return null;
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
    else {
      b = d;
      var e = K;
      K |= 2;
      var f2 = Jk();
      if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
      do
        try {
          Lk();
          break;
        } catch (h) {
          Mk(a, h);
        }
      while (1);
      $g();
      mk.current = f2;
      K = e;
      null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
    }
    if (0 !== b) {
      2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
      if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      if (6 === b) Ck(a, d);
      else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            Pk(a, tk, uk);
            break;
          case 3:
            Ck(a, d);
            if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
              if (0 !== uc(a, 0)) break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                R();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 4:
            Ck(a, d);
            if ((d & 4194240) === d) break;
            b = a.eventTimes;
            for (e = -1; 0 < d; ) {
              var g = 31 - oc(d);
              f2 = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f2;
            }
            d = e;
            d = B() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 5:
            Pk(a, tk, uk);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    Dk(a, B());
    return a.callbackNode === c ? Gk.bind(null, a) : null;
  }
  function Nk(a, b) {
    var c = sk;
    a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
    a = Ik(a, b);
    2 !== a && (b = tk, tk = c, null !== b && Fj(b));
    return a;
  }
  function Fj(a) {
    null === tk ? tk = a : tk.push.apply(tk, a);
  }
  function Ok(a) {
    for (var b = a; ; ) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e = c[d], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f2(), e)) return false;
          } catch (g) {
            return false;
          }
        }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
      else {
        if (b === a) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a) return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a, b) {
    b &= ~rk;
    b &= ~qk;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b; ) {
      var c = 31 - oc(b), d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Ek(a) {
    if (0 !== (K & 6)) throw Error(p(327));
    Hk();
    var b = uc(a, 0);
    if (0 === (b & 1)) return Dk(a, B()), null;
    var c = Ik(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = xc(a);
      0 !== d && (b = d, c = Nk(a, d));
    }
    if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
    if (6 === c) throw Error(p(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Pk(a, tk, uk);
    Dk(a, B());
    return null;
  }
  function Qk(a, b) {
    var c = K;
    K |= 1;
    try {
      return a(b);
    } finally {
      K = c, 0 === K && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c = ok.transition, d = C;
    try {
      if (ok.transition = null, C = 1, a) return a();
    } finally {
      C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E(ej);
  }
  function Kk(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    -1 !== c && (a.timeoutHandle = -1, Gf(c));
    if (null !== Y) for (c = Y.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          zh();
          E(Wf);
          E(H);
          Eh();
          break;
        case 5:
          Bh(d);
          break;
        case 4:
          zh();
          break;
        case 13:
          E(L);
          break;
        case 19:
          E(L);
          break;
        case 10:
          ah(d.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c = c.return;
    }
    Q = a;
    Y = a = Pg(a.current, null);
    Z = fj = b;
    T = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e = d.next, f2 = c.pending;
        if (null !== f2) {
          var g = f2.next;
          f2.next = e;
          d.next = g;
        }
        c.pending = d;
      }
      fh = null;
    }
    return a;
  }
  function Mk(a, b) {
    do {
      var c = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d = M.memoizedState; null !== d; ) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c || null === c.return) {
          T = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f2 = a, g = c.return, h = c, k = b;
          b = Z;
          h.flags |= 32768;
          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l = k, m = h, q = m.tag;
            if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
              var r = m.alternate;
              r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
            }
            var y = Ui(g);
            if (null !== y) {
              y.flags &= -257;
              Vi(y, g, h, f2, b);
              y.mode & 1 && Si(f2, l, b);
              b = y;
              k = l;
              var n = b.updateQueue;
              if (null === n) {
                var t = /* @__PURE__ */ new Set();
                t.add(k);
                b.updateQueue = t;
              } else n.add(k);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f2, l, b);
                tj();
                break a;
              }
              k = Error(p(426));
            }
          } else if (I && h.mode & 1) {
            var J2 = Ui(g);
            if (null !== J2) {
              0 === (J2.flags & 65536) && (J2.flags |= 256);
              Vi(J2, g, h, f2, b);
              Jg(Ji(k, h));
              break a;
            }
          }
          f2 = k = Ji(k, h);
          4 !== T && (T = 2);
          null === sk ? sk = [f2] : sk.push(f2);
          f2 = g;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var x = Ni(f2, k, b);
                ph(f2, x);
                break a;
              case 1:
                h = k;
                var w = f2.type, u = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var F2 = Qi(f2, h, b);
                  ph(f2, F2);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Sk(c);
      } catch (na) {
        b = na;
        Y === c && null !== c && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a = mk.current;
    mk.current = Rh;
    return null === a ? Rh : a;
  }
  function tj() {
    if (0 === T || 3 === T || 2 === T) T = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
  }
  function Ik(a, b) {
    var c = K;
    K |= 2;
    var d = Jk();
    if (Q !== a || Z !== b) uk = null, Kk(a, b);
    do
      try {
        Tk();
        break;
      } catch (e) {
        Mk(a, e);
      }
    while (1);
    $g();
    K = c;
    mk.current = d;
    if (null !== Y) throw Error(p(261));
    Q = null;
    Z = 0;
    return T;
  }
  function Tk() {
    for (; null !== Y; ) Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); ) Uk(Y);
  }
  function Uk(a) {
    var b = Vk(a.alternate, a, fj);
    a.memoizedProps = a.pendingProps;
    null === b ? Sk(a) : Y = b;
    nk.current = null;
  }
  function Sk(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b.return;
      if (0 === (b.flags & 32768)) {
        if (c = Ej(c, b, fj), null !== c) {
          Y = c;
          return;
        }
      } else {
        c = Ij(c, b);
        if (null !== c) {
          c.flags &= 32767;
          Y = c;
          return;
        }
        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
        else {
          T = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a;
    } while (null !== b);
    0 === T && (T = 5);
  }
  function Pk(a, b, c) {
    var d = C, e = ok.transition;
    try {
      ok.transition = null, C = 1, Wk(a, b, c, d);
    } finally {
      ok.transition = e, C = d;
    }
    return null;
  }
  function Wk(a, b, c, d) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6)) throw Error(p(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(p(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f2 = c.lanes | c.childLanes;
    Bc(a, f2);
    a === Q && (Y = Q = null, Z = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f2 = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f2) {
      f2 = ok.transition;
      ok.transition = null;
      var g = C;
      C = 1;
      var h = K;
      K |= 4;
      nk.current = null;
      Oj(a, c);
      dk(c, a);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a.current = c;
      hk(c);
      dc();
      K = h;
      C = g;
      ok.transition = f2;
    } else a.current = c;
    vk && (vk = false, wk = a, xk = e);
    f2 = a.pendingLanes;
    0 === f2 && (Ri = null);
    mc(c.stateNode);
    Dk(a, B());
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
    if (Oi) throw Oi = false, a = Pi, Pi = null, a;
    0 !== (xk & 1) && 0 !== a.tag && Hk();
    f2 = a.pendingLanes;
    0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a = Dc(xk), b = ok.transition, c = C;
      try {
        ok.transition = null;
        C = 16 > a ? 16 : a;
        if (null === wk) var d = false;
        else {
          a = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6)) throw Error(p(331));
          var e = K;
          K |= 4;
          for (V2 = a.current; null !== V2; ) {
            var f2 = V2, g = f2.child;
            if (0 !== (V2.flags & 16)) {
              var h = f2.deletions;
              if (null !== h) {
                for (var k = 0; k < h.length; k++) {
                  var l = h[k];
                  for (V2 = l; null !== V2; ) {
                    var m = V2;
                    switch (m.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m, f2);
                    }
                    var q = m.child;
                    if (null !== q) q.return = m, V2 = q;
                    else for (; null !== V2; ) {
                      m = V2;
                      var r = m.sibling, y = m.return;
                      Sj(m);
                      if (m === l) {
                        V2 = null;
                        break;
                      }
                      if (null !== r) {
                        r.return = y;
                        V2 = r;
                        break;
                      }
                      V2 = y;
                    }
                  }
                }
                var n = f2.alternate;
                if (null !== n) {
                  var t = n.child;
                  if (null !== t) {
                    n.child = null;
                    do {
                      var J2 = t.sibling;
                      t.sibling = null;
                      t = J2;
                    } while (null !== t);
                  }
                }
                V2 = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V2 = g;
            else b: for (; null !== V2; ) {
              f2 = V2;
              if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f2, f2.return);
              }
              var x = f2.sibling;
              if (null !== x) {
                x.return = f2.return;
                V2 = x;
                break b;
              }
              V2 = f2.return;
            }
          }
          var w = a.current;
          for (V2 = w; null !== V2; ) {
            g = V2;
            var u = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V2 = u;
            else b: for (g = w; null !== V2; ) {
              h = V2;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h);
                }
              } catch (na) {
                W(h, h.return, na);
              }
              if (h === g) {
                V2 = null;
                break b;
              }
              var F2 = h.sibling;
              if (null !== F2) {
                F2.return = h.return;
                V2 = F2;
                break b;
              }
              V2 = h.return;
            }
          }
          K = e;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
          d = true;
        }
        return d;
      } finally {
        C = c, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a, b, c) {
    b = Ji(c, b);
    b = Ni(a, b, 1);
    a = nh(a, b, 1);
    b = R();
    null !== a && (Ac(a, 1, b), Dk(a, b));
  }
  function W(a, b, c) {
    if (3 === a.tag) Xk(a, a, c);
    else for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
          a = Ji(c, a);
          a = Qi(b, a, 1);
          b = nh(b, a, 1);
          a = R();
          null !== b && (Ac(b, 1, a), Dk(b, a));
          break;
        }
      }
      b = b.return;
    }
  }
  function Ti(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    b = R();
    a.pingedLanes |= a.suspendedLanes & c;
    Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
    Dk(a, b);
  }
  function Yk(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c = R();
    a = ih(a, b);
    null !== a && (Ac(a, b, c), Dk(a, c));
  }
  function uj(a) {
    var b = a.memoizedState, c = 0;
    null !== b && (c = b.retryLane);
    Yk(a, c);
  }
  function bk(a, b) {
    var c = 0;
    switch (a.tag) {
      case 13:
        var d = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c = e.retryLane);
        break;
      case 19:
        d = a.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    null !== d && d.delete(b);
    Yk(a, c);
  }
  var Vk;
  Vk = function(a, b, c) {
    if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
      dh = 0 !== (a.flags & 131072) ? true : false;
    }
    else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        ij(a, b);
        a = b.pendingProps;
        var e = Yf(b, H.current);
        ch(b, c);
        e = Nh(null, b, d, a, e, c);
        var f2 = Sh();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          ij(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = Zk(d);
          a = Ci(d, a);
          switch (e) {
            case 0:
              b = cj(null, b, d, a, c);
              break a;
            case 1:
              b = hj(null, b, d, a, c);
              break a;
            case 11:
              b = Yi(null, b, d, a, c);
              break a;
            case 14:
              b = $i(null, b, d, Ci(d.type, a), c);
              break a;
          }
          throw Error(p(
            306,
            d,
            ""
          ));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
      case 3:
        a: {
          kj(b);
          if (null === a) throw Error(p(387));
          d = b.pendingProps;
          f2 = b.memoizedState;
          e = f2.element;
          lh(a, b);
          qh(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e = Ji(Error(p(423)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ji(Error(p(424)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
          else {
            Ig();
            if (d === e) {
              b = Zi(a, b, c);
              break a;
            }
            Xi(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
      case 6:
        return null === a && Eg(b), null;
      case 13:
        return oj(a, b, c);
      case 4:
        return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
      case 7:
        return Xi(a, b, b.pendingProps, c), b.child;
      case 8:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f2 = b.memoizedProps;
          g = e.value;
          G(Wg, d._currentValue);
          d._currentValue = g;
          if (null !== f2) if (He(f2.value, g)) {
            if (f2.children === e.children && !Wf.current) {
              b = Zi(a, b, c);
              break a;
            }
          } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
            var h = f2.dependencies;
            if (null !== h) {
              g = f2.child;
              for (var k = h.firstContext; null !== k; ) {
                if (k.context === d) {
                  if (1 === f2.tag) {
                    k = mh(-1, c & -c);
                    k.tag = 2;
                    var l = f2.updateQueue;
                    if (null !== l) {
                      l = l.shared;
                      var m = l.pending;
                      null === m ? k.next = k : (k.next = m.next, m.next = k);
                      l.pending = k;
                    }
                  }
                  f2.lanes |= c;
                  k = f2.alternate;
                  null !== k && (k.lanes |= c);
                  bh(
                    f2.return,
                    c,
                    b
                  );
                  h.lanes |= c;
                  break;
                }
                k = k.next;
              }
            } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
            else if (18 === f2.tag) {
              g = f2.return;
              if (null === g) throw Error(p(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              bh(g, c, b);
              g = f2.sibling;
            } else g = f2.child;
            if (null !== g) g.return = f2;
            else for (g = f2; null !== g; ) {
              if (g === b) {
                g = null;
                break;
              }
              f2 = g.sibling;
              if (null !== f2) {
                f2.return = g.return;
                g = f2;
                break;
              }
              g = g.return;
            }
            f2 = g;
          }
          Xi(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
      case 15:
        return bj(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
      case 19:
        return xj(a, b, c);
      case 22:
        return dj(a, b, c);
    }
    throw Error(p(156, b.tag));
  };
  function Fk(a, b) {
    return ac(a, b);
  }
  function $k(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a, b, c, d) {
    return new $k(a, b, c, d);
  }
  function aj(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function Zk(a) {
    if ("function" === typeof a) return aj(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === Da) return 11;
      if (a === Ga) return 14;
    }
    return 2;
  }
  function Pg(a, b) {
    var c = a.alternate;
    null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a.flags & 14680064;
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }
  function Rg(a, b, c, d, e, f2) {
    var g = 2;
    d = a;
    if ("function" === typeof a) aj(a) && (g = 1);
    else if ("string" === typeof a) g = 5;
    else a: switch (a) {
      case ya:
        return Tg(c.children, e, f2, b);
      case za:
        g = 8;
        e |= 8;
        break;
      case Aa:
        return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
      case Ea:
        return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
      case Fa:
        return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
      case Ia:
        return pj(c, e, f2, b);
      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case Ba:
            g = 10;
            break a;
          case Ca:
            g = 9;
            break a;
          case Da:
            g = 11;
            break a;
          case Ga:
            g = 14;
            break a;
          case Ha:
            g = 16;
            d = null;
            break a;
        }
        throw Error(p(130, null == a ? a : typeof a, ""));
    }
    b = Bg(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f2;
    return b;
  }
  function Tg(a, b, c, d) {
    a = Bg(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function pj(a, b, c, d) {
    a = Bg(22, a, d, b);
    a.elementType = Ia;
    a.lanes = c;
    a.stateNode = { isHidden: false };
    return a;
  }
  function Qg(a, b, c) {
    a = Bg(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function Sg(a, b, c) {
    b = Bg(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b;
  }
  function al(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a, b, c, d, e, f2, g, h, k) {
    a = new al(a, b, c, h, k);
    1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
    f2 = Bg(3, null, null, b);
    a.current = f2;
    f2.stateNode = a;
    f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f2);
    return a;
  }
  function cl(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  }
  function dl(a) {
    if (!a) return Vf;
    a = a._reactInternals;
    a: {
      if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
      var b = a;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (Zf(c)) return bg(a, c, b);
    }
    return b;
  }
  function el(a, b, c, d, e, f2, g, h, k) {
    a = bl(c, d, true, a, e, f2, g, h, k);
    a.context = dl(null);
    c = a.current;
    d = R();
    e = yi(c);
    f2 = mh(d, e);
    f2.callback = void 0 !== b && null !== b ? b : null;
    nh(c, f2, e);
    a.current.lanes = e;
    Ac(a, e, d);
    Dk(a, d);
    return a;
  }
  function fl(a, b, c, d) {
    var e = b.current, f2 = R(), g = yi(e);
    c = dl(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = mh(f2, g);
    b.payload = { element: a };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = nh(e, b, g);
    null !== a && (gi(a, e, g, f2), oh(a, e, g));
    return g;
  }
  function gl(a) {
    a = a.current;
    if (!a.child) return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function hl(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function il(a, b) {
    hl(a, b);
    (a = a.alternate) && hl(a, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a) {
    console.error(a);
  };
  function ll(a) {
    this._internalRoot = a;
  }
  ml.prototype.render = ll.prototype.render = function(a) {
    var b = this._internalRoot;
    if (null === b) throw Error(p(409));
    fl(a, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a = this._internalRoot;
    if (null !== a) {
      this._internalRoot = null;
      var b = a.containerInfo;
      Rk(function() {
        fl(null, a, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a) {
    this._internalRoot = a;
  }
  ml.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var b = Hc();
      a = { blockedOn: null, target: a, priority: b };
      for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
      Qc.splice(c, 0, a);
      0 === c && Vc(a);
    }
  };
  function nl(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
  }
  function ol(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
  }
  function pl() {
  }
  function ql(a, b, c, d, e) {
    if (e) {
      if ("function" === typeof d) {
        var f2 = d;
        d = function() {
          var a2 = gl(g);
          f2.call(a2);
        };
      }
      var g = el(b, d, a, 0, null, false, false, "", pl);
      a._reactRootContainer = g;
      a[uf] = g.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk();
      return g;
    }
    for (; e = a.lastChild; ) a.removeChild(e);
    if ("function" === typeof d) {
      var h = d;
      d = function() {
        var a2 = gl(k);
        h.call(a2);
      };
    }
    var k = bl(a, 0, false, null, null, false, false, "", pl);
    a._reactRootContainer = k;
    a[uf] = k.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk(function() {
      fl(b, k, c, d);
    });
    return k;
  }
  function rl(a, b, c, d, e) {
    var f2 = c._reactRootContainer;
    if (f2) {
      var g = f2;
      if ("function" === typeof e) {
        var h = e;
        e = function() {
          var a2 = gl(g);
          h.call(a2);
        };
      }
      fl(b, g, a, e);
    } else g = ql(c, b, a, e, d);
    return gl(g);
  }
  Ec = function(a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = tc(b.pendingLanes);
          0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a, 1);
          if (null !== b2) {
            var c2 = R();
            gi(b2, a, 1, c2);
          }
        }), il(a, 1);
    }
  };
  Fc = function(a) {
    if (13 === a.tag) {
      var b = ih(a, 134217728);
      if (null !== b) {
        var c = R();
        gi(b, a, 134217728, c);
      }
      il(a, 134217728);
    }
  };
  Gc = function(a) {
    if (13 === a.tag) {
      var b = yi(a), c = ih(a, b);
      if (null !== c) {
        var d = R();
        gi(c, a, b, d);
      }
      il(a, b);
    }
  };
  Hc = function() {
    return C;
  };
  Ic = function(a, b) {
    var c = C;
    try {
      return C = a, b();
    } finally {
      C = c;
    }
  };
  yb = function(a, b, c) {
    switch (b) {
      case "input":
        bb(a, c);
        b = c.name;
        if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode; ) c = c.parentNode;
          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a && d.form === a.form) {
              var e = Db(d);
              if (!e) throw Error(p(90));
              Wa(d);
              bb(d, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c);
        break;
      case "select":
        b = c.value, null != b && fb(a, !!c.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p(200));
    return cl(a, b, null, c);
  };
  reactDom_production_min.createRoot = function(a, b) {
    if (!nl(a)) throw Error(p(299));
    var c = false, d = "", e = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
    b = bl(a, 1, false, null, null, c, false, d, e);
    a[uf] = b.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(p(188));
      a = Object.keys(a).join(",");
      throw Error(p(268, a));
    }
    a = Zb(b);
    a = null === a ? null : a.stateNode;
    return a;
  };
  reactDom_production_min.flushSync = function(a) {
    return Rk(a);
  };
  reactDom_production_min.hydrate = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, true, c);
  };
  reactDom_production_min.hydrateRoot = function(a, b, c) {
    if (!nl(a)) throw Error(p(405));
    var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
    null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
    b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
    a[uf] = b.current;
    sf(a);
    if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
      c,
      e
    );
    return new ml(b);
  };
  reactDom_production_min.render = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!ol(a)) throw Error(p(40));
    return a._reactRootContainer ? (Rk(function() {
      rl(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!ol(c)) throw Error(p(200));
    if (null == a || void 0 === a._reactInternals) throw Error(p(38));
    return rl(a, b, c, false, d);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  return reactDom_production_min;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production_min();
  }
  return reactDom.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  var m = requireReactDom();
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  return client;
}
var clientExports = requireClient();
const _changeEvent = { type: "change" };
const _startEvent = { type: "start" };
const _endEvent = { type: "end" };
const _ray = new Ray();
const _plane = new Plane();
const _TILT_LIMIT = Math.cos(70 * MathUtils.DEG2RAD);
const _v = new Vector3();
const _twoPI = 2 * Math.PI;
const _STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
};
const _EPS = 1e-6;
class OrbitControls extends Controls {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(object, domElement = null) {
    super(object, domElement);
    this.state = _STATE.NONE;
    this.target = new Vector3();
    this.cursor = new Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minTargetRadius = 0;
    this.maxTargetRadius = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.05;
    this.enableZoom = true;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.keyRotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.zoomToCursor = false;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" };
    this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };
    this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this._domElementKeyEvents = null;
    this._lastPosition = new Vector3();
    this._lastQuaternion = new Quaternion();
    this._lastTargetPosition = new Vector3();
    this._quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
    this._quatInverse = this._quat.clone().invert();
    this._spherical = new Spherical();
    this._sphericalDelta = new Spherical();
    this._scale = 1;
    this._panOffset = new Vector3();
    this._rotateStart = new Vector2();
    this._rotateEnd = new Vector2();
    this._rotateDelta = new Vector2();
    this._panStart = new Vector2();
    this._panEnd = new Vector2();
    this._panDelta = new Vector2();
    this._dollyStart = new Vector2();
    this._dollyEnd = new Vector2();
    this._dollyDelta = new Vector2();
    this._dollyDirection = new Vector3();
    this._mouse = new Vector2();
    this._performCursorZoom = false;
    this._pointers = [];
    this._pointerPositions = {};
    this._controlActive = false;
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerUp = onPointerUp.bind(this);
    this._onContextMenu = onContextMenu.bind(this);
    this._onMouseWheel = onMouseWheel.bind(this);
    this._onKeyDown = onKeyDown.bind(this);
    this._onTouchStart = onTouchStart.bind(this);
    this._onTouchMove = onTouchMove.bind(this);
    this._onMouseDown = onMouseDown.bind(this);
    this._onMouseMove = onMouseMove.bind(this);
    this._interceptControlDown = interceptControlDown.bind(this);
    this._interceptControlUp = interceptControlUp.bind(this);
    if (this.domElement !== null) {
      this.connect(this.domElement);
    }
    this.update();
  }
  connect(element) {
    super.connect(element);
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointercancel", this._onPointerUp);
    this.domElement.addEventListener("contextmenu", this._onContextMenu);
    this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false });
    const document2 = this.domElement.getRootNode();
    document2.addEventListener("keydown", this._interceptControlDown, { passive: true, capture: true });
    this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.domElement.removeEventListener("pointercancel", this._onPointerUp);
    this.domElement.removeEventListener("wheel", this._onMouseWheel);
    this.domElement.removeEventListener("contextmenu", this._onContextMenu);
    this.stopListenToKeyEvents();
    const document2 = this.domElement.getRootNode();
    document2.removeEventListener("keydown", this._interceptControlDown, { capture: true });
    this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLDOMElement} domElement - The DOM element
   */
  listenToKeyEvents(domElement) {
    domElement.addEventListener("keydown", this._onKeyDown);
    this._domElementKeyEvents = domElement;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    if (this._domElementKeyEvents !== null) {
      this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown);
      this._domElementKeyEvents = null;
    }
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target);
    this.position0.copy(this.object.position);
    this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0);
    this.object.position.copy(this.position0);
    this.object.zoom = this.zoom0;
    this.object.updateProjectionMatrix();
    this.dispatchEvent(_changeEvent);
    this.update();
    this.state = _STATE.NONE;
  }
  update(deltaTime = null) {
    const position = this.object.position;
    _v.copy(position).sub(this.target);
    _v.applyQuaternion(this._quat);
    this._spherical.setFromVector3(_v);
    if (this.autoRotate && this.state === _STATE.NONE) {
      this._rotateLeft(this._getAutoRotationAngle(deltaTime));
    }
    if (this.enableDamping) {
      this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor;
      this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor;
    } else {
      this._spherical.theta += this._sphericalDelta.theta;
      this._spherical.phi += this._sphericalDelta.phi;
    }
    let min = this.minAzimuthAngle;
    let max = this.maxAzimuthAngle;
    if (isFinite(min) && isFinite(max)) {
      if (min < -Math.PI) min += _twoPI;
      else if (min > Math.PI) min -= _twoPI;
      if (max < -Math.PI) max += _twoPI;
      else if (max > Math.PI) max -= _twoPI;
      if (min <= max) {
        this._spherical.theta = Math.max(min, Math.min(max, this._spherical.theta));
      } else {
        this._spherical.theta = this._spherical.theta > (min + max) / 2 ? Math.max(min, this._spherical.theta) : Math.min(max, this._spherical.theta);
      }
    }
    this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
    this._spherical.makeSafe();
    if (this.enableDamping === true) {
      this.target.addScaledVector(this._panOffset, this.dampingFactor);
    } else {
      this.target.add(this._panOffset);
    }
    this.target.sub(this.cursor);
    this.target.clampLength(this.minTargetRadius, this.maxTargetRadius);
    this.target.add(this.cursor);
    let zoomChanged = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) {
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    } else {
      const prevRadius = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale);
      zoomChanged = prevRadius != this._spherical.radius;
    }
    _v.setFromSpherical(this._spherical);
    _v.applyQuaternion(this._quatInverse);
    position.copy(this.target).add(_v);
    this.object.lookAt(this.target);
    if (this.enableDamping === true) {
      this._sphericalDelta.theta *= 1 - this.dampingFactor;
      this._sphericalDelta.phi *= 1 - this.dampingFactor;
      this._panOffset.multiplyScalar(1 - this.dampingFactor);
    } else {
      this._sphericalDelta.set(0, 0, 0);
      this._panOffset.set(0, 0, 0);
    }
    if (this.zoomToCursor && this._performCursorZoom) {
      let newRadius = null;
      if (this.object.isPerspectiveCamera) {
        const prevRadius = _v.length();
        newRadius = this._clampDistance(prevRadius * this._scale);
        const radiusDelta = prevRadius - newRadius;
        this.object.position.addScaledVector(this._dollyDirection, radiusDelta);
        this.object.updateMatrixWorld();
        zoomChanged = !!radiusDelta;
      } else if (this.object.isOrthographicCamera) {
        const mouseBefore = new Vector3(this._mouse.x, this._mouse.y, 0);
        mouseBefore.unproject(this.object);
        const prevZoom = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
        this.object.updateProjectionMatrix();
        zoomChanged = prevZoom !== this.object.zoom;
        const mouseAfter = new Vector3(this._mouse.x, this._mouse.y, 0);
        mouseAfter.unproject(this.object);
        this.object.position.sub(mouseAfter).add(mouseBefore);
        this.object.updateMatrixWorld();
        newRadius = _v.length();
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
        this.zoomToCursor = false;
      }
      if (newRadius !== null) {
        if (this.screenSpacePanning) {
          this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(newRadius).add(this.object.position);
        } else {
          _ray.origin.copy(this.object.position);
          _ray.direction.set(0, 0, -1).transformDirection(this.object.matrix);
          if (Math.abs(this.object.up.dot(_ray.direction)) < _TILT_LIMIT) {
            this.object.lookAt(this.target);
          } else {
            _plane.setFromNormalAndCoplanarPoint(this.object.up, this.target);
            _ray.intersectPlane(_plane, this.target);
          }
        }
      }
    } else if (this.object.isOrthographicCamera) {
      const prevZoom = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
      if (prevZoom !== this.object.zoom) {
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      }
    }
    this._scale = 1;
    this._performCursorZoom = false;
    if (zoomChanged || this._lastPosition.distanceToSquared(this.object.position) > _EPS || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > _EPS || this._lastTargetPosition.distanceToSquared(this.target) > _EPS) {
      this.dispatchEvent(_changeEvent);
      this._lastPosition.copy(this.object.position);
      this._lastQuaternion.copy(this.object.quaternion);
      this._lastTargetPosition.copy(this.target);
      return true;
    }
    return false;
  }
  _getAutoRotationAngle(deltaTime) {
    if (deltaTime !== null) {
      return _twoPI / 60 * this.autoRotateSpeed * deltaTime;
    } else {
      return _twoPI / 60 / 60 * this.autoRotateSpeed;
    }
  }
  _getZoomScale(delta) {
    const normalizedDelta = Math.abs(delta * 0.01);
    return Math.pow(0.95, this.zoomSpeed * normalizedDelta);
  }
  _rotateLeft(angle) {
    this._sphericalDelta.theta -= angle;
  }
  _rotateUp(angle) {
    this._sphericalDelta.phi -= angle;
  }
  _panLeft(distance, objectMatrix) {
    _v.setFromMatrixColumn(objectMatrix, 0);
    _v.multiplyScalar(-distance);
    this._panOffset.add(_v);
  }
  _panUp(distance, objectMatrix) {
    if (this.screenSpacePanning === true) {
      _v.setFromMatrixColumn(objectMatrix, 1);
    } else {
      _v.setFromMatrixColumn(objectMatrix, 0);
      _v.crossVectors(this.object.up, _v);
    }
    _v.multiplyScalar(distance);
    this._panOffset.add(_v);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(deltaX, deltaY) {
    const element = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const position = this.object.position;
      _v.copy(position).sub(this.target);
      let targetDistance = _v.length();
      targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
      this._panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
      this._panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
    } else if (this.object.isOrthographicCamera) {
      this._panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
      this._panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
      this.enablePan = false;
    }
  }
  _dollyOut(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale /= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _dollyIn(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale *= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _updateZoomParameters(x, y) {
    if (!this.zoomToCursor) {
      return;
    }
    this._performCursorZoom = true;
    const rect = this.domElement.getBoundingClientRect();
    const dx = x - rect.left;
    const dy = y - rect.top;
    const w = rect.width;
    const h = rect.height;
    this._mouse.x = dx / w * 2 - 1;
    this._mouse.y = -(dy / h) * 2 + 1;
    this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(dist) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, dist));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(event) {
    this._rotateStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownDolly(event) {
    this._updateZoomParameters(event.clientX, event.clientX);
    this._dollyStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownPan(event) {
    this._panStart.set(event.clientX, event.clientY);
  }
  _handleMouseMoveRotate(event) {
    this._rotateEnd.set(event.clientX, event.clientY);
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
    this.update();
  }
  _handleMouseMoveDolly(event) {
    this._dollyEnd.set(event.clientX, event.clientY);
    this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart);
    if (this._dollyDelta.y > 0) {
      this._dollyOut(this._getZoomScale(this._dollyDelta.y));
    } else if (this._dollyDelta.y < 0) {
      this._dollyIn(this._getZoomScale(this._dollyDelta.y));
    }
    this._dollyStart.copy(this._dollyEnd);
    this.update();
  }
  _handleMouseMovePan(event) {
    this._panEnd.set(event.clientX, event.clientY);
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
    this.update();
  }
  _handleMouseWheel(event) {
    this._updateZoomParameters(event.clientX, event.clientY);
    if (event.deltaY < 0) {
      this._dollyIn(this._getZoomScale(event.deltaY));
    } else if (event.deltaY > 0) {
      this._dollyOut(this._getZoomScale(event.deltaY));
    }
    this.update();
  }
  _handleKeyDown(event) {
    let needsUpdate = false;
    switch (event.code) {
      case this.keys.UP:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.BOTTOM:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, -this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.LEFT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.RIGHT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(-this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
    }
    if (needsUpdate) {
      event.preventDefault();
      this.update();
    }
  }
  _handleTouchStartRotate(event) {
    if (this._pointers.length === 1) {
      this._rotateStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateStart.set(x, y);
    }
  }
  _handleTouchStartPan(event) {
    if (this._pointers.length === 1) {
      this._panStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panStart.set(x, y);
    }
  }
  _handleTouchStartDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyStart.set(0, distance);
  }
  _handleTouchStartDollyPan(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enablePan) this._handleTouchStartPan(event);
  }
  _handleTouchStartDollyRotate(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enableRotate) this._handleTouchStartRotate(event);
  }
  _handleTouchMoveRotate(event) {
    if (this._pointers.length == 1) {
      this._rotateEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateEnd.set(x, y);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(event) {
    if (this._pointers.length === 1) {
      this._panEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panEnd.set(x, y);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyEnd.set(0, distance);
    this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed));
    this._dollyOut(this._dollyDelta.y);
    this._dollyStart.copy(this._dollyEnd);
    const centerX = (event.pageX + position.x) * 0.5;
    const centerY = (event.pageY + position.y) * 0.5;
    this._updateZoomParameters(centerX, centerY);
  }
  _handleTouchMoveDollyPan(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enablePan) this._handleTouchMovePan(event);
  }
  _handleTouchMoveDollyRotate(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enableRotate) this._handleTouchMoveRotate(event);
  }
  // pointers
  _addPointer(event) {
    this._pointers.push(event.pointerId);
  }
  _removePointer(event) {
    delete this._pointerPositions[event.pointerId];
    for (let i = 0; i < this._pointers.length; i++) {
      if (this._pointers[i] == event.pointerId) {
        this._pointers.splice(i, 1);
        return;
      }
    }
  }
  _isTrackingPointer(event) {
    for (let i = 0; i < this._pointers.length; i++) {
      if (this._pointers[i] == event.pointerId) return true;
    }
    return false;
  }
  _trackPointer(event) {
    let position = this._pointerPositions[event.pointerId];
    if (position === void 0) {
      position = new Vector2();
      this._pointerPositions[event.pointerId] = position;
    }
    position.set(event.pageX, event.pageY);
  }
  _getSecondPointerPosition(event) {
    const pointerId = event.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[pointerId];
  }
  //
  _customWheelEvent(event) {
    const mode = event.deltaMode;
    const newEvent = {
      clientX: event.clientX,
      clientY: event.clientY,
      deltaY: event.deltaY
    };
    switch (mode) {
      case 1:
        newEvent.deltaY *= 16;
        break;
      case 2:
        newEvent.deltaY *= 100;
        break;
    }
    if (event.ctrlKey && !this._controlActive) {
      newEvent.deltaY *= 10;
    }
    return newEvent;
  }
}
function onPointerDown(event) {
  if (this.enabled === false) return;
  if (this._pointers.length === 0) {
    this.domElement.setPointerCapture(event.pointerId);
    this.domElement.addEventListener("pointermove", this._onPointerMove);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  if (this._isTrackingPointer(event)) return;
  this._addPointer(event);
  if (event.pointerType === "touch") {
    this._onTouchStart(event);
  } else {
    this._onMouseDown(event);
  }
}
function onPointerMove(event) {
  if (this.enabled === false) return;
  if (event.pointerType === "touch") {
    this._onTouchMove(event);
  } else {
    this._onMouseMove(event);
  }
}
function onPointerUp(event) {
  this._removePointer(event);
  switch (this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(event.pointerId);
      this.domElement.removeEventListener("pointermove", this._onPointerMove);
      this.domElement.removeEventListener("pointerup", this._onPointerUp);
      this.dispatchEvent(_endEvent);
      this.state = _STATE.NONE;
      break;
    case 1:
      const pointerId = this._pointers[0];
      const position = this._pointerPositions[pointerId];
      this._onTouchStart({ pointerId, pageX: position.x, pageY: position.y });
      break;
  }
}
function onMouseDown(event) {
  let mouseAction;
  switch (event.button) {
    case 0:
      mouseAction = this.mouseButtons.LEFT;
      break;
    case 1:
      mouseAction = this.mouseButtons.MIDDLE;
      break;
    case 2:
      mouseAction = this.mouseButtons.RIGHT;
      break;
    default:
      mouseAction = -1;
  }
  switch (mouseAction) {
    case MOUSE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(event);
      this.state = _STATE.DOLLY;
      break;
    case MOUSE.ROTATE:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      }
      break;
    case MOUSE.PAN:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onMouseMove(event) {
  switch (this.state) {
    case _STATE.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(event);
      break;
    case _STATE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(event);
      break;
    case _STATE.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(event);
      break;
  }
}
function onMouseWheel(event) {
  if (this.enabled === false || this.enableZoom === false || this.state !== _STATE.NONE) return;
  event.preventDefault();
  this.dispatchEvent(_startEvent);
  this._handleMouseWheel(this._customWheelEvent(event));
  this.dispatchEvent(_endEvent);
}
function onKeyDown(event) {
  if (this.enabled === false) return;
  this._handleKeyDown(event);
}
function onTouchStart(event) {
  this._trackPointer(event);
  switch (this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case TOUCH.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(event);
          this.state = _STATE.TOUCH_ROTATE;
          break;
        case TOUCH.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(event);
          this.state = _STATE.TOUCH_PAN;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case TOUCH.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(event);
          this.state = _STATE.TOUCH_DOLLY_PAN;
          break;
        case TOUCH.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(event);
          this.state = _STATE.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onTouchMove(event) {
  this._trackPointer(event);
  switch (this.state) {
    case _STATE.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(event);
      this.update();
      break;
    case _STATE.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(event);
      this.update();
      break;
    default:
      this.state = _STATE.NONE;
  }
}
function onContextMenu(event) {
  if (this.enabled === false) return;
  event.preventDefault();
}
function interceptControlDown(event) {
  if (event.key === "Control") {
    this._controlActive = true;
    const document2 = this.domElement.getRootNode();
    document2.addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}
function interceptControlUp(event) {
  if (event.key === "Control") {
    this._controlActive = false;
    const document2 = this.domElement.getRootNode();
    document2.removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}
function toTrianglesDrawMode(geometry, drawMode) {
  if (drawMode === TrianglesDrawMode) {
    console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.");
    return geometry;
  }
  if (drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode) {
    let index = geometry.getIndex();
    if (index === null) {
      const indices = [];
      const position = geometry.getAttribute("position");
      if (position !== void 0) {
        for (let i = 0; i < position.count; i++) {
          indices.push(i);
        }
        geometry.setIndex(indices);
        index = geometry.getIndex();
      } else {
        console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
        return geometry;
      }
    }
    const numberOfTriangles = index.count - 2;
    const newIndices = [];
    if (drawMode === TriangleFanDrawMode) {
      for (let i = 1; i <= numberOfTriangles; i++) {
        newIndices.push(index.getX(0));
        newIndices.push(index.getX(i));
        newIndices.push(index.getX(i + 1));
      }
    } else {
      for (let i = 0; i < numberOfTriangles; i++) {
        if (i % 2 === 0) {
          newIndices.push(index.getX(i));
          newIndices.push(index.getX(i + 1));
          newIndices.push(index.getX(i + 2));
        } else {
          newIndices.push(index.getX(i + 2));
          newIndices.push(index.getX(i + 1));
          newIndices.push(index.getX(i));
        }
      }
    }
    if (newIndices.length / 3 !== numberOfTriangles) {
      console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    }
    const newGeometry = geometry.clone();
    newGeometry.setIndex(newIndices);
    newGeometry.clearGroups();
    return newGeometry;
  } else {
    console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", drawMode);
    return geometry;
  }
}
class GLTFLoader extends Loader {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
    this.dracoLoader = null;
    this.ktx2Loader = null;
    this.meshoptDecoder = null;
    this.pluginCallbacks = [];
    this.register(function(parser) {
      return new GLTFMaterialsClearcoatExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsDispersionExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureBasisUExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureWebPExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureAVIFExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSheenExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsTransmissionExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsVolumeExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIorExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsEmissiveStrengthExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSpecularExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIridescenceExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsAnisotropyExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsBumpExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFLightsExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMeshoptCompression(parser);
    });
    this.register(function(parser) {
      return new GLTFMeshGpuInstancing(parser);
    });
  }
  /**
   * Starts loading from the given URL and passes the loaded glTF asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    let resourcePath;
    if (this.resourcePath !== "") {
      resourcePath = this.resourcePath;
    } else if (this.path !== "") {
      const relativeUrl = LoaderUtils.extractUrlBase(url);
      resourcePath = LoaderUtils.resolveURL(relativeUrl, this.path);
    } else {
      resourcePath = LoaderUtils.extractUrlBase(url);
    }
    this.manager.itemStart(url);
    const _onError = function(e) {
      if (onError) {
        onError(e);
      } else {
        console.error(e);
      }
      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    };
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(data) {
      try {
        scope.parse(data, resourcePath, function(gltf) {
          onLoad(gltf);
          scope.manager.itemEnd(url);
        }, _onError);
      } catch (e) {
        _onError(e);
      }
    }, onProgress, _onError);
  }
  /**
   * Sets the given Draco loader to this loader. Required for decoding assets
   * compressed with the `KHR_draco_mesh_compression` extension.
   *
   * @param {DRACOLoader} dracoLoader - The Draco loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setDRACOLoader(dracoLoader) {
    this.dracoLoader = dracoLoader;
    return this;
  }
  /**
   * Sets the given KTX2 loader to this loader. Required for loading KTX2
   * compressed textures.
   *
   * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setKTX2Loader(ktx2Loader) {
    this.ktx2Loader = ktx2Loader;
    return this;
  }
  /**
   * Sets the given meshopt decoder. Required for decoding assets
   * compressed with the `EXT_meshopt_compression` extension.
   *
   * @param {Object} meshoptDecoder - The meshopt decoder to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setMeshoptDecoder(meshoptDecoder) {
    this.meshoptDecoder = meshoptDecoder;
    return this;
  }
  /**
   * Registers a plugin callback. This API is internally used to implement the various
   * glTF extensions but can also used by third-party code to add additional logic
   * to the loader.
   *
   * @param {function(parser:GLTFParser)} callback - The callback function to register.
   * @return {GLTFLoader} A reference to this loader.
   */
  register(callback) {
    if (this.pluginCallbacks.indexOf(callback) === -1) {
      this.pluginCallbacks.push(callback);
    }
    return this;
  }
  /**
   * Unregisters a plugin callback.
   *
   * @param {Function} callback - The callback function to unregister.
   * @return {GLTFLoader} A reference to this loader.
   */
  unregister(callback) {
    if (this.pluginCallbacks.indexOf(callback) !== -1) {
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
    }
    return this;
  }
  /**
   * Parses the given FBX data and returns the resulting group.
   *
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(data, path, onLoad, onError) {
    let json2;
    const extensions = {};
    const plugins = {};
    const textDecoder = new TextDecoder();
    if (typeof data === "string") {
      json2 = JSON.parse(data);
    } else if (data instanceof ArrayBuffer) {
      const magic = textDecoder.decode(new Uint8Array(data, 0, 4));
      if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
        try {
          extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
        } catch (error) {
          if (onError) onError(error);
          return;
        }
        json2 = JSON.parse(extensions[EXTENSIONS.KHR_BINARY_GLTF].content);
      } else {
        json2 = JSON.parse(textDecoder.decode(data));
      }
    } else {
      json2 = data;
    }
    if (json2.asset === void 0 || json2.asset.version[0] < 2) {
      if (onError) onError(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const parser = new GLTFParser(json2, {
      path: path || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    parser.fileLoader.setRequestHeader(this.requestHeader);
    for (let i = 0; i < this.pluginCallbacks.length; i++) {
      const plugin = this.pluginCallbacks[i](parser);
      if (!plugin.name) console.error("THREE.GLTFLoader: Invalid plugin found: missing name");
      plugins[plugin.name] = plugin;
      extensions[plugin.name] = true;
    }
    if (json2.extensionsUsed) {
      for (let i = 0; i < json2.extensionsUsed.length; ++i) {
        const extensionName = json2.extensionsUsed[i];
        const extensionsRequired = json2.extensionsRequired || [];
        switch (extensionName) {
          case EXTENSIONS.KHR_MATERIALS_UNLIT:
            extensions[extensionName] = new GLTFMaterialsUnlitExtension();
            break;
          case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
            extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json2, this.dracoLoader);
            break;
          case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
            extensions[extensionName] = new GLTFTextureTransformExtension();
            break;
          case EXTENSIONS.KHR_MESH_QUANTIZATION:
            extensions[extensionName] = new GLTFMeshQuantizationExtension();
            break;
          default:
            if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === void 0) {
              console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
            }
        }
      }
    }
    parser.setExtensions(extensions);
    parser.setPlugins(plugins);
    parser.parse(onLoad, onError);
  }
  /**
   * Async version of {@link GLTFLoader#parse}.
   *
   * @async
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @return {Promise<GLTFLoader~LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
   */
  parseAsync(data, path) {
    const scope = this;
    return new Promise(function(resolve, reject) {
      scope.parse(data, path, resolve, reject);
    });
  }
}
function GLTFRegistry() {
  let objects = {};
  return {
    get: function(key) {
      return objects[key];
    },
    add: function(key, object) {
      objects[key] = object;
    },
    remove: function(key) {
      delete objects[key];
    },
    removeAll: function() {
      objects = {};
    }
  };
}
const EXTENSIONS = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class GLTFLightsExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;
    this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const parser = this.parser;
    const nodeDefs = this.parser.json.nodes || [];
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== void 0) {
        parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
      }
    }
  }
  _loadLight(lightIndex) {
    const parser = this.parser;
    const cacheKey = "light:" + lightIndex;
    let dependency = parser.cache.get(cacheKey);
    if (dependency) return dependency;
    const json2 = parser.json;
    const extensions = json2.extensions && json2.extensions[this.name] || {};
    const lightDefs = extensions.lights || [];
    const lightDef = lightDefs[lightIndex];
    let lightNode;
    const color = new Color(16777215);
    if (lightDef.color !== void 0) color.setRGB(lightDef.color[0], lightDef.color[1], lightDef.color[2], LinearSRGBColorSpace);
    const range = lightDef.range !== void 0 ? lightDef.range : 0;
    switch (lightDef.type) {
      case "directional":
        lightNode = new DirectionalLight(color);
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      case "point":
        lightNode = new PointLight(color);
        lightNode.distance = range;
        break;
      case "spot":
        lightNode = new SpotLight(color);
        lightNode.distance = range;
        lightDef.spot = lightDef.spot || {};
        lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== void 0 ? lightDef.spot.innerConeAngle : 0;
        lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== void 0 ? lightDef.spot.outerConeAngle : Math.PI / 4;
        lightNode.angle = lightDef.spot.outerConeAngle;
        lightNode.penumbra = 1 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + lightDef.type);
    }
    lightNode.position.set(0, 0, 0);
    assignExtrasToUserData(lightNode, lightDef);
    if (lightDef.intensity !== void 0) lightNode.intensity = lightDef.intensity;
    lightNode.name = parser.createUniqueName(lightDef.name || "light_" + lightIndex);
    dependency = Promise.resolve(lightNode);
    parser.cache.add(cacheKey, dependency);
    return dependency;
  }
  getDependency(type, index) {
    if (type !== "light") return;
    return this._loadLight(index);
  }
  createNodeAttachment(nodeIndex) {
    const self2 = this;
    const parser = this.parser;
    const json2 = parser.json;
    const nodeDef = json2.nodes[nodeIndex];
    const lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
    const lightIndex = lightDef.light;
    if (lightIndex === void 0) return null;
    return this._loadLight(lightIndex).then(function(light) {
      return parser._getNodeRef(self2.cache, lightIndex, light);
    });
  }
}
class GLTFMaterialsUnlitExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(materialParams, materialDef, parser) {
    const pending = [];
    materialParams.color = new Color(1, 1, 1);
    materialParams.opacity = 1;
    const metallicRoughness = materialDef.pbrMetallicRoughness;
    if (metallicRoughness) {
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
      }
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsEmissiveStrengthExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const emissiveStrength = materialDef.extensions[this.name].emissiveStrength;
    if (emissiveStrength !== void 0) {
      materialParams.emissiveIntensity = emissiveStrength;
    }
    return Promise.resolve();
  }
}
class GLTFMaterialsClearcoatExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.clearcoatFactor !== void 0) {
      materialParams.clearcoat = extension.clearcoatFactor;
    }
    if (extension.clearcoatTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatMap", extension.clearcoatTexture));
    }
    if (extension.clearcoatRoughnessFactor !== void 0) {
      materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
    }
    if (extension.clearcoatRoughnessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatRoughnessMap", extension.clearcoatRoughnessTexture));
    }
    if (extension.clearcoatNormalTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatNormalMap", extension.clearcoatNormalTexture));
      if (extension.clearcoatNormalTexture.scale !== void 0) {
        const scale = extension.clearcoatNormalTexture.scale;
        materialParams.clearcoatNormalScale = new Vector2(scale, scale);
      }
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsDispersionExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const extension = materialDef.extensions[this.name];
    materialParams.dispersion = extension.dispersion !== void 0 ? extension.dispersion : 0;
    return Promise.resolve();
  }
}
class GLTFMaterialsIridescenceExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.iridescenceFactor !== void 0) {
      materialParams.iridescence = extension.iridescenceFactor;
    }
    if (extension.iridescenceTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "iridescenceMap", extension.iridescenceTexture));
    }
    if (extension.iridescenceIor !== void 0) {
      materialParams.iridescenceIOR = extension.iridescenceIor;
    }
    if (materialParams.iridescenceThicknessRange === void 0) {
      materialParams.iridescenceThicknessRange = [100, 400];
    }
    if (extension.iridescenceThicknessMinimum !== void 0) {
      materialParams.iridescenceThicknessRange[0] = extension.iridescenceThicknessMinimum;
    }
    if (extension.iridescenceThicknessMaximum !== void 0) {
      materialParams.iridescenceThicknessRange[1] = extension.iridescenceThicknessMaximum;
    }
    if (extension.iridescenceThicknessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "iridescenceThicknessMap", extension.iridescenceThicknessTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsSheenExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    materialParams.sheenColor = new Color(0, 0, 0);
    materialParams.sheenRoughness = 0;
    materialParams.sheen = 1;
    const extension = materialDef.extensions[this.name];
    if (extension.sheenColorFactor !== void 0) {
      const colorFactor = extension.sheenColorFactor;
      materialParams.sheenColor.setRGB(colorFactor[0], colorFactor[1], colorFactor[2], LinearSRGBColorSpace);
    }
    if (extension.sheenRoughnessFactor !== void 0) {
      materialParams.sheenRoughness = extension.sheenRoughnessFactor;
    }
    if (extension.sheenColorTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "sheenColorMap", extension.sheenColorTexture, SRGBColorSpace));
    }
    if (extension.sheenRoughnessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "sheenRoughnessMap", extension.sheenRoughnessTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsTransmissionExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.transmissionFactor !== void 0) {
      materialParams.transmission = extension.transmissionFactor;
    }
    if (extension.transmissionTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "transmissionMap", extension.transmissionTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsVolumeExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.thickness = extension.thicknessFactor !== void 0 ? extension.thicknessFactor : 0;
    if (extension.thicknessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "thicknessMap", extension.thicknessTexture));
    }
    materialParams.attenuationDistance = extension.attenuationDistance || Infinity;
    const colorArray = extension.attenuationColor || [1, 1, 1];
    materialParams.attenuationColor = new Color().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
    return Promise.all(pending);
  }
}
class GLTFMaterialsIorExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IOR;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const extension = materialDef.extensions[this.name];
    materialParams.ior = extension.ior !== void 0 ? extension.ior : 1.5;
    return Promise.resolve();
  }
}
class GLTFMaterialsSpecularExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.specularIntensity = extension.specularFactor !== void 0 ? extension.specularFactor : 1;
    if (extension.specularTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "specularIntensityMap", extension.specularTexture));
    }
    const colorArray = extension.specularColorFactor || [1, 1, 1];
    materialParams.specularColor = new Color().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
    if (extension.specularColorTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "specularColorMap", extension.specularColorTexture, SRGBColorSpace));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsBumpExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_MATERIALS_BUMP;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.bumpScale = extension.bumpFactor !== void 0 ? extension.bumpFactor : 1;
    if (extension.bumpTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "bumpMap", extension.bumpTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsAnisotropyExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.anisotropyStrength !== void 0) {
      materialParams.anisotropy = extension.anisotropyStrength;
    }
    if (extension.anisotropyRotation !== void 0) {
      materialParams.anisotropyRotation = extension.anisotropyRotation;
    }
    if (extension.anisotropyTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "anisotropyMap", extension.anisotropyTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFTextureBasisUExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
  }
  loadTexture(textureIndex) {
    const parser = this.parser;
    const json2 = parser.json;
    const textureDef = json2.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[this.name]) {
      return null;
    }
    const extension = textureDef.extensions[this.name];
    const loader = parser.options.ktx2Loader;
    if (!loader) {
      if (json2.extensionsRequired && json2.extensionsRequired.indexOf(this.name) >= 0) {
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      } else {
        return null;
      }
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
}
class GLTFTextureWebPExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
  }
  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json2 = parser.json;
    const textureDef = json2.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }
    const extension = textureDef.extensions[name];
    const source = json2.images[extension.source];
    let loader = parser.textureLoader;
    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
}
class GLTFTextureAVIFExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_AVIF;
  }
  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json2 = parser.json;
    const textureDef = json2.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }
    const extension = textureDef.extensions[name];
    const source = json2.images[extension.source];
    let loader = parser.textureLoader;
    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
}
class GLTFMeshoptCompression {
  constructor(parser) {
    this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
    this.parser = parser;
  }
  loadBufferView(index) {
    const json2 = this.parser.json;
    const bufferView = json2.bufferViews[index];
    if (bufferView.extensions && bufferView.extensions[this.name]) {
      const extensionDef = bufferView.extensions[this.name];
      const buffer = this.parser.getDependency("buffer", extensionDef.buffer);
      const decoder = this.parser.options.meshoptDecoder;
      if (!decoder || !decoder.supported) {
        if (json2.extensionsRequired && json2.extensionsRequired.indexOf(this.name) >= 0) {
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        } else {
          return null;
        }
      }
      return buffer.then(function(res) {
        const byteOffset = extensionDef.byteOffset || 0;
        const byteLength = extensionDef.byteLength || 0;
        const count = extensionDef.count;
        const stride = extensionDef.byteStride;
        const source = new Uint8Array(res, byteOffset, byteLength);
        if (decoder.decodeGltfBufferAsync) {
          return decoder.decodeGltfBufferAsync(count, stride, source, extensionDef.mode, extensionDef.filter).then(function(res2) {
            return res2.buffer;
          });
        } else {
          return decoder.ready.then(function() {
            const result = new ArrayBuffer(count * stride);
            decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
            return result;
          });
        }
      });
    } else {
      return null;
    }
  }
}
class GLTFMeshGpuInstancing {
  constructor(parser) {
    this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
    this.parser = parser;
  }
  createNodeMesh(nodeIndex) {
    const json2 = this.parser.json;
    const nodeDef = json2.nodes[nodeIndex];
    if (!nodeDef.extensions || !nodeDef.extensions[this.name] || nodeDef.mesh === void 0) {
      return null;
    }
    const meshDef = json2.meshes[nodeDef.mesh];
    for (const primitive of meshDef.primitives) {
      if (primitive.mode !== WEBGL_CONSTANTS.TRIANGLES && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN && primitive.mode !== void 0) {
        return null;
      }
    }
    const extensionDef = nodeDef.extensions[this.name];
    const attributesDef = extensionDef.attributes;
    const pending = [];
    const attributes = {};
    for (const key in attributesDef) {
      pending.push(this.parser.getDependency("accessor", attributesDef[key]).then((accessor) => {
        attributes[key] = accessor;
        return attributes[key];
      }));
    }
    if (pending.length < 1) {
      return null;
    }
    pending.push(this.parser.createNodeMesh(nodeIndex));
    return Promise.all(pending).then((results) => {
      const nodeObject = results.pop();
      const meshes = nodeObject.isGroup ? nodeObject.children : [nodeObject];
      const count = results[0].count;
      const instancedMeshes = [];
      for (const mesh of meshes) {
        const m = new Matrix4();
        const p = new Vector3();
        const q = new Quaternion();
        const s = new Vector3(1, 1, 1);
        const instancedMesh = new InstancedMesh(mesh.geometry, mesh.material, count);
        for (let i = 0; i < count; i++) {
          if (attributes.TRANSLATION) {
            p.fromBufferAttribute(attributes.TRANSLATION, i);
          }
          if (attributes.ROTATION) {
            q.fromBufferAttribute(attributes.ROTATION, i);
          }
          if (attributes.SCALE) {
            s.fromBufferAttribute(attributes.SCALE, i);
          }
          instancedMesh.setMatrixAt(i, m.compose(p, q, s));
        }
        for (const attributeName in attributes) {
          if (attributeName === "_COLOR_0") {
            const attr = attributes[attributeName];
            instancedMesh.instanceColor = new InstancedBufferAttribute(attr.array, attr.itemSize, attr.normalized);
          } else if (attributeName !== "TRANSLATION" && attributeName !== "ROTATION" && attributeName !== "SCALE") {
            mesh.geometry.setAttribute(attributeName, attributes[attributeName]);
          }
        }
        Object3D.prototype.copy.call(instancedMesh, mesh);
        this.parser.assignFinalMaterial(instancedMesh);
        instancedMeshes.push(instancedMesh);
      }
      if (nodeObject.isGroup) {
        nodeObject.clear();
        nodeObject.add(...instancedMeshes);
        return nodeObject;
      }
      return instancedMeshes[0];
    });
  }
}
const BINARY_EXTENSION_HEADER_MAGIC = "glTF";
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 1313821514, BIN: 5130562 };
class GLTFBinaryExtension {
  constructor(data) {
    this.name = EXTENSIONS.KHR_BINARY_GLTF;
    this.content = null;
    this.body = null;
    const headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
    const textDecoder = new TextDecoder();
    this.header = {
      magic: textDecoder.decode(new Uint8Array(data.slice(0, 4))),
      version: headerView.getUint32(4, true),
      length: headerView.getUint32(8, true)
    };
    if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    } else if (this.header.version < 2) {
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    }
    const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
    const chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
    let chunkIndex = 0;
    while (chunkIndex < chunkContentsLength) {
      const chunkLength = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      const chunkType = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
        const contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
        this.content = textDecoder.decode(contentArray);
      } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
        const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
        this.body = data.slice(byteOffset, byteOffset + chunkLength);
      }
      chunkIndex += chunkLength;
    }
    if (this.content === null) {
      throw new Error("THREE.GLTFLoader: JSON content not found.");
    }
  }
}
class GLTFDracoMeshCompressionExtension {
  constructor(json2, dracoLoader) {
    if (!dracoLoader) {
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    }
    this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
    this.json = json2;
    this.dracoLoader = dracoLoader;
    this.dracoLoader.preload();
  }
  decodePrimitive(primitive, parser) {
    const json2 = this.json;
    const dracoLoader = this.dracoLoader;
    const bufferViewIndex = primitive.extensions[this.name].bufferView;
    const gltfAttributeMap = primitive.extensions[this.name].attributes;
    const threeAttributeMap = {};
    const attributeNormalizedMap = {};
    const attributeTypeMap = {};
    for (const attributeName in gltfAttributeMap) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
    }
    for (const attributeName in primitive.attributes) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      if (gltfAttributeMap[attributeName] !== void 0) {
        const accessorDef = json2.accessors[primitive.attributes[attributeName]];
        const componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
        attributeTypeMap[threeAttributeName] = componentType.name;
        attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;
      }
    }
    return parser.getDependency("bufferView", bufferViewIndex).then(function(bufferView) {
      return new Promise(function(resolve, reject) {
        dracoLoader.decodeDracoFile(bufferView, function(geometry) {
          for (const attributeName in geometry.attributes) {
            const attribute = geometry.attributes[attributeName];
            const normalized = attributeNormalizedMap[attributeName];
            if (normalized !== void 0) attribute.normalized = normalized;
          }
          resolve(geometry);
        }, threeAttributeMap, attributeTypeMap, LinearSRGBColorSpace, reject);
      });
    });
  }
}
class GLTFTextureTransformExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(texture, transform) {
    if ((transform.texCoord === void 0 || transform.texCoord === texture.channel) && transform.offset === void 0 && transform.rotation === void 0 && transform.scale === void 0) {
      return texture;
    }
    texture = texture.clone();
    if (transform.texCoord !== void 0) {
      texture.channel = transform.texCoord;
    }
    if (transform.offset !== void 0) {
      texture.offset.fromArray(transform.offset);
    }
    if (transform.rotation !== void 0) {
      texture.rotation = transform.rotation;
    }
    if (transform.scale !== void 0) {
      texture.repeat.fromArray(transform.scale);
    }
    texture.needsUpdate = true;
    return texture;
  }
}
class GLTFMeshQuantizationExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
  }
}
class GLTFCubicSplineInterpolant extends Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  copySampleValue_(index) {
    const result = this.resultBuffer, values = this.sampleValues, valueSize = this.valueSize, offset = index * valueSize * 3 + valueSize;
    for (let i = 0; i !== valueSize; i++) {
      result[i] = values[offset + i];
    }
    return result;
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;
    const stride2 = stride * 2;
    const stride3 = stride * 3;
    const td = t1 - t0;
    const p = (t - t0) / td;
    const pp = p * p;
    const ppp = pp * p;
    const offset1 = i1 * stride3;
    const offset0 = offset1 - stride3;
    const s2 = -2 * ppp + 3 * pp;
    const s3 = ppp - pp;
    const s0 = 1 - s2;
    const s1 = s3 - pp + p;
    for (let i = 0; i !== stride; i++) {
      const p0 = values[offset0 + i + stride];
      const m0 = values[offset0 + i + stride2] * td;
      const p1 = values[offset1 + i + stride];
      const m1 = values[offset1 + i] * td;
      result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
    }
    return result;
  }
}
const _quaternion = new Quaternion();
class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
  interpolate_(i1, t0, t, t1) {
    const result = super.interpolate_(i1, t0, t, t1);
    _quaternion.fromArray(result).normalize().toArray(result);
    return result;
  }
}
const WEBGL_CONSTANTS = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
};
const WEBGL_COMPONENT_TYPES = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
const WEBGL_FILTERS = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
const WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
const WEBGL_TYPE_SIZES = {
  "SCALAR": 1,
  "VEC2": 2,
  "VEC3": 3,
  "VEC4": 4,
  "MAT2": 4,
  "MAT3": 9,
  "MAT4": 16
};
const ATTRIBUTES = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
const PATH_PROPERTIES = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
const INTERPOLATION = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
const ALPHA_MODES = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function createDefaultMaterial(cache2) {
  if (cache2["DefaultMaterial"] === void 0) {
    cache2["DefaultMaterial"] = new MeshStandardMaterial({
      color: 16777215,
      emissive: 0,
      metalness: 1,
      roughness: 1,
      transparent: false,
      depthTest: true,
      side: FrontSide
    });
  }
  return cache2["DefaultMaterial"];
}
function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
  for (const name in objectDef.extensions) {
    if (knownExtensions[name] === void 0) {
      object.userData.gltfExtensions = object.userData.gltfExtensions || {};
      object.userData.gltfExtensions[name] = objectDef.extensions[name];
    }
  }
}
function assignExtrasToUserData(object, gltfDef) {
  if (gltfDef.extras !== void 0) {
    if (typeof gltfDef.extras === "object") {
      Object.assign(object.userData, gltfDef.extras);
    } else {
      console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + gltfDef.extras);
    }
  }
}
function addMorphTargets(geometry, targets, parser) {
  let hasMorphPosition = false;
  let hasMorphNormal = false;
  let hasMorphColor = false;
  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];
    if (target.POSITION !== void 0) hasMorphPosition = true;
    if (target.NORMAL !== void 0) hasMorphNormal = true;
    if (target.COLOR_0 !== void 0) hasMorphColor = true;
    if (hasMorphPosition && hasMorphNormal && hasMorphColor) break;
  }
  if (!hasMorphPosition && !hasMorphNormal && !hasMorphColor) return Promise.resolve(geometry);
  const pendingPositionAccessors = [];
  const pendingNormalAccessors = [];
  const pendingColorAccessors = [];
  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];
    if (hasMorphPosition) {
      const pendingAccessor = target.POSITION !== void 0 ? parser.getDependency("accessor", target.POSITION) : geometry.attributes.position;
      pendingPositionAccessors.push(pendingAccessor);
    }
    if (hasMorphNormal) {
      const pendingAccessor = target.NORMAL !== void 0 ? parser.getDependency("accessor", target.NORMAL) : geometry.attributes.normal;
      pendingNormalAccessors.push(pendingAccessor);
    }
    if (hasMorphColor) {
      const pendingAccessor = target.COLOR_0 !== void 0 ? parser.getDependency("accessor", target.COLOR_0) : geometry.attributes.color;
      pendingColorAccessors.push(pendingAccessor);
    }
  }
  return Promise.all([
    Promise.all(pendingPositionAccessors),
    Promise.all(pendingNormalAccessors),
    Promise.all(pendingColorAccessors)
  ]).then(function(accessors) {
    const morphPositions = accessors[0];
    const morphNormals = accessors[1];
    const morphColors = accessors[2];
    if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
    if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
    if (hasMorphColor) geometry.morphAttributes.color = morphColors;
    geometry.morphTargetsRelative = true;
    return geometry;
  });
}
function updateMorphTargets(mesh, meshDef) {
  mesh.updateMorphTargets();
  if (meshDef.weights !== void 0) {
    for (let i = 0, il = meshDef.weights.length; i < il; i++) {
      mesh.morphTargetInfluences[i] = meshDef.weights[i];
    }
  }
  if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
    const targetNames = meshDef.extras.targetNames;
    if (mesh.morphTargetInfluences.length === targetNames.length) {
      mesh.morphTargetDictionary = {};
      for (let i = 0, il = targetNames.length; i < il; i++) {
        mesh.morphTargetDictionary[targetNames[i]] = i;
      }
    } else {
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
    }
  }
}
function createPrimitiveKey(primitiveDef) {
  let geometryKey;
  const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
  if (dracoExtension) {
    geometryKey = "draco:" + dracoExtension.bufferView + ":" + dracoExtension.indices + ":" + createAttributesKey(dracoExtension.attributes);
  } else {
    geometryKey = primitiveDef.indices + ":" + createAttributesKey(primitiveDef.attributes) + ":" + primitiveDef.mode;
  }
  if (primitiveDef.targets !== void 0) {
    for (let i = 0, il = primitiveDef.targets.length; i < il; i++) {
      geometryKey += ":" + createAttributesKey(primitiveDef.targets[i]);
    }
  }
  return geometryKey;
}
function createAttributesKey(attributes) {
  let attributesKey = "";
  const keys = Object.keys(attributes).sort();
  for (let i = 0, il = keys.length; i < il; i++) {
    attributesKey += keys[i] + ":" + attributes[keys[i]] + ";";
  }
  return attributesKey;
}
function getNormalizedComponentScale(constructor) {
  switch (constructor) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function getImageURIMimeType(uri) {
  if (uri.search(/\.jpe?g($|\?)/i) > 0 || uri.search(/^data\:image\/jpeg/) === 0) return "image/jpeg";
  if (uri.search(/\.webp($|\?)/i) > 0 || uri.search(/^data\:image\/webp/) === 0) return "image/webp";
  if (uri.search(/\.ktx2($|\?)/i) > 0 || uri.search(/^data\:image\/ktx2/) === 0) return "image/ktx2";
  return "image/png";
}
const _identityMatrix = new Matrix4();
class GLTFParser {
  constructor(json2 = {}, options = {}) {
    this.json = json2;
    this.extensions = {};
    this.plugins = {};
    this.options = options;
    this.cache = new GLTFRegistry();
    this.associations = /* @__PURE__ */ new Map();
    this.primitiveCache = {};
    this.nodeCache = {};
    this.meshCache = { refs: {}, uses: {} };
    this.cameraCache = { refs: {}, uses: {} };
    this.lightCache = { refs: {}, uses: {} };
    this.sourceCache = {};
    this.textureCache = {};
    this.nodeNamesUsed = {};
    let isSafari = false;
    let safariVersion = -1;
    let isFirefox = false;
    let firefoxVersion = -1;
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent;
      isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) === true;
      const safariMatch = userAgent.match(/Version\/(\d+)/);
      safariVersion = isSafari && safariMatch ? parseInt(safariMatch[1], 10) : -1;
      isFirefox = userAgent.indexOf("Firefox") > -1;
      firefoxVersion = isFirefox ? userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    if (typeof createImageBitmap === "undefined" || isSafari && safariVersion < 17 || isFirefox && firefoxVersion < 98) {
      this.textureLoader = new TextureLoader(this.options.manager);
    } else {
      this.textureLoader = new ImageBitmapLoader(this.options.manager);
    }
    this.textureLoader.setCrossOrigin(this.options.crossOrigin);
    this.textureLoader.setRequestHeader(this.options.requestHeader);
    this.fileLoader = new FileLoader(this.options.manager);
    this.fileLoader.setResponseType("arraybuffer");
    if (this.options.crossOrigin === "use-credentials") {
      this.fileLoader.setWithCredentials(true);
    }
  }
  setExtensions(extensions) {
    this.extensions = extensions;
  }
  setPlugins(plugins) {
    this.plugins = plugins;
  }
  parse(onLoad, onError) {
    const parser = this;
    const json2 = this.json;
    const extensions = this.extensions;
    this.cache.removeAll();
    this.nodeCache = {};
    this._invokeAll(function(ext) {
      return ext._markDefs && ext._markDefs();
    });
    Promise.all(this._invokeAll(function(ext) {
      return ext.beforeRoot && ext.beforeRoot();
    })).then(function() {
      return Promise.all([
        parser.getDependencies("scene"),
        parser.getDependencies("animation"),
        parser.getDependencies("camera")
      ]);
    }).then(function(dependencies) {
      const result = {
        scene: dependencies[0][json2.scene || 0],
        scenes: dependencies[0],
        animations: dependencies[1],
        cameras: dependencies[2],
        asset: json2.asset,
        parser,
        userData: {}
      };
      addUnknownExtensionsToUserData(extensions, result, json2);
      assignExtrasToUserData(result, json2);
      return Promise.all(parser._invokeAll(function(ext) {
        return ext.afterRoot && ext.afterRoot(result);
      })).then(function() {
        for (const scene of result.scenes) {
          scene.updateMatrixWorld();
        }
        onLoad(result);
      });
    }).catch(onError);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   *
   * @private
   */
  _markDefs() {
    const nodeDefs = this.json.nodes || [];
    const skinDefs = this.json.skins || [];
    const meshDefs = this.json.meshes || [];
    for (let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {
      const joints = skinDefs[skinIndex].joints;
      for (let i = 0, il = joints.length; i < il; i++) {
        nodeDefs[joints[i]].isBone = true;
      }
    }
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.mesh !== void 0) {
        this._addNodeRef(this.meshCache, nodeDef.mesh);
        if (nodeDef.skin !== void 0) {
          meshDefs[nodeDef.mesh].isSkinnedMesh = true;
        }
      }
      if (nodeDef.camera !== void 0) {
        this._addNodeRef(this.cameraCache, nodeDef.camera);
      }
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   *
   * @private
   * @param {Object} cache
   * @param {Object3D} index
   */
  _addNodeRef(cache2, index) {
    if (index === void 0) return;
    if (cache2.refs[index] === void 0) {
      cache2.refs[index] = cache2.uses[index] = 0;
    }
    cache2.refs[index]++;
  }
  /**
   * Returns a reference to a shared resource, cloning it if necessary.
   *
   * @private
   * @param {Object} cache
   * @param {number} index
   * @param {Object} object
   * @return {Object}
   */
  _getNodeRef(cache2, index, object) {
    if (cache2.refs[index] <= 1) return object;
    const ref = object.clone();
    const updateMappings = (original, clone) => {
      const mappings = this.associations.get(original);
      if (mappings != null) {
        this.associations.set(clone, mappings);
      }
      for (const [i, child] of original.children.entries()) {
        updateMappings(child, clone.children[i]);
      }
    };
    updateMappings(object, ref);
    ref.name += "_instance_" + cache2.uses[index]++;
    return ref;
  }
  _invokeOne(func) {
    const extensions = Object.values(this.plugins);
    extensions.push(this);
    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result) return result;
    }
    return null;
  }
  _invokeAll(func) {
    const extensions = Object.values(this.plugins);
    extensions.unshift(this);
    const pending = [];
    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result) pending.push(result);
    }
    return pending;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(type, index) {
    const cacheKey = type + ":" + index;
    let dependency = this.cache.get(cacheKey);
    if (!dependency) {
      switch (type) {
        case "scene":
          dependency = this.loadScene(index);
          break;
        case "node":
          dependency = this._invokeOne(function(ext) {
            return ext.loadNode && ext.loadNode(index);
          });
          break;
        case "mesh":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMesh && ext.loadMesh(index);
          });
          break;
        case "accessor":
          dependency = this.loadAccessor(index);
          break;
        case "bufferView":
          dependency = this._invokeOne(function(ext) {
            return ext.loadBufferView && ext.loadBufferView(index);
          });
          break;
        case "buffer":
          dependency = this.loadBuffer(index);
          break;
        case "material":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMaterial && ext.loadMaterial(index);
          });
          break;
        case "texture":
          dependency = this._invokeOne(function(ext) {
            return ext.loadTexture && ext.loadTexture(index);
          });
          break;
        case "skin":
          dependency = this.loadSkin(index);
          break;
        case "animation":
          dependency = this._invokeOne(function(ext) {
            return ext.loadAnimation && ext.loadAnimation(index);
          });
          break;
        case "camera":
          dependency = this.loadCamera(index);
          break;
        default:
          dependency = this._invokeOne(function(ext) {
            return ext != this && ext.getDependency && ext.getDependency(type, index);
          });
          if (!dependency) {
            throw new Error("Unknown type: " + type);
          }
          break;
      }
      this.cache.add(cacheKey, dependency);
    }
    return dependency;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(type) {
    let dependencies = this.cache.get(type);
    if (!dependencies) {
      const parser = this;
      const defs = this.json[type + (type === "mesh" ? "es" : "s")] || [];
      dependencies = Promise.all(defs.map(function(def, index) {
        return parser.getDependency(type, index);
      }));
      this.cache.add(type, dependencies);
    }
    return dependencies;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(bufferIndex) {
    const bufferDef = this.json.buffers[bufferIndex];
    const loader = this.fileLoader;
    if (bufferDef.type && bufferDef.type !== "arraybuffer") {
      throw new Error("THREE.GLTFLoader: " + bufferDef.type + " buffer type is not supported.");
    }
    if (bufferDef.uri === void 0 && bufferIndex === 0) {
      return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
    }
    const options = this.options;
    return new Promise(function(resolve, reject) {
      loader.load(LoaderUtils.resolveURL(bufferDef.uri, options.path), resolve, void 0, function() {
        reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(bufferViewIndex) {
    const bufferViewDef = this.json.bufferViews[bufferViewIndex];
    return this.getDependency("buffer", bufferViewDef.buffer).then(function(buffer) {
      const byteLength = bufferViewDef.byteLength || 0;
      const byteOffset = bufferViewDef.byteOffset || 0;
      return buffer.slice(byteOffset, byteOffset + byteLength);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   *
   * @private
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(accessorIndex) {
    const parser = this;
    const json2 = this.json;
    const accessorDef = this.json.accessors[accessorIndex];
    if (accessorDef.bufferView === void 0 && accessorDef.sparse === void 0) {
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
      const normalized = accessorDef.normalized === true;
      const array = new TypedArray(accessorDef.count * itemSize);
      return Promise.resolve(new BufferAttribute(array, itemSize, normalized));
    }
    const pendingBufferViews = [];
    if (accessorDef.bufferView !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.bufferView));
    } else {
      pendingBufferViews.push(null);
    }
    if (accessorDef.sparse !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.indices.bufferView));
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.values.bufferView));
    }
    return Promise.all(pendingBufferViews).then(function(bufferViews) {
      const bufferView = bufferViews[0];
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
      const elementBytes = TypedArray.BYTES_PER_ELEMENT;
      const itemBytes = elementBytes * itemSize;
      const byteOffset = accessorDef.byteOffset || 0;
      const byteStride = accessorDef.bufferView !== void 0 ? json2.bufferViews[accessorDef.bufferView].byteStride : void 0;
      const normalized = accessorDef.normalized === true;
      let array, bufferAttribute;
      if (byteStride && byteStride !== itemBytes) {
        const ibSlice = Math.floor(byteOffset / byteStride);
        const ibCacheKey = "InterleavedBuffer:" + accessorDef.bufferView + ":" + accessorDef.componentType + ":" + ibSlice + ":" + accessorDef.count;
        let ib = parser.cache.get(ibCacheKey);
        if (!ib) {
          array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);
          ib = new InterleavedBuffer(array, byteStride / elementBytes);
          parser.cache.add(ibCacheKey, ib);
        }
        bufferAttribute = new InterleavedBufferAttribute(ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
      } else {
        if (bufferView === null) {
          array = new TypedArray(accessorDef.count * itemSize);
        } else {
          array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
        }
        bufferAttribute = new BufferAttribute(array, itemSize, normalized);
      }
      if (accessorDef.sparse !== void 0) {
        const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
        const TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
        const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
        const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
        const sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
        const sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);
        if (bufferView !== null) {
          bufferAttribute = new BufferAttribute(bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
        }
        bufferAttribute.normalized = false;
        for (let i = 0, il = sparseIndices.length; i < il; i++) {
          const index = sparseIndices[i];
          bufferAttribute.setX(index, sparseValues[i * itemSize]);
          if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
          if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
          if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
          if (itemSize >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        bufferAttribute.normalized = normalized;
      }
      return bufferAttribute;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   *
   * @private
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(textureIndex) {
    const json2 = this.json;
    const options = this.options;
    const textureDef = json2.textures[textureIndex];
    const sourceIndex = textureDef.source;
    const sourceDef = json2.images[sourceIndex];
    let loader = this.textureLoader;
    if (sourceDef.uri) {
      const handler = options.manager.getHandler(sourceDef.uri);
      if (handler !== null) loader = handler;
    }
    return this.loadTextureImage(textureIndex, sourceIndex, loader);
  }
  loadTextureImage(textureIndex, sourceIndex, loader) {
    const parser = this;
    const json2 = this.json;
    const textureDef = json2.textures[textureIndex];
    const sourceDef = json2.images[sourceIndex];
    const cacheKey = (sourceDef.uri || sourceDef.bufferView) + ":" + textureDef.sampler;
    if (this.textureCache[cacheKey]) {
      return this.textureCache[cacheKey];
    }
    const promise = this.loadImageSource(sourceIndex, loader).then(function(texture) {
      texture.flipY = false;
      texture.name = textureDef.name || sourceDef.name || "";
      if (texture.name === "" && typeof sourceDef.uri === "string" && sourceDef.uri.startsWith("data:image/") === false) {
        texture.name = sourceDef.uri;
      }
      const samplers = json2.samplers || {};
      const sampler = samplers[textureDef.sampler] || {};
      texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || LinearFilter;
      texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || LinearMipmapLinearFilter;
      texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || RepeatWrapping;
      texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || RepeatWrapping;
      texture.generateMipmaps = !texture.isCompressedTexture && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
      parser.associations.set(texture, { textures: textureIndex });
      return texture;
    }).catch(function() {
      return null;
    });
    this.textureCache[cacheKey] = promise;
    return promise;
  }
  loadImageSource(sourceIndex, loader) {
    const parser = this;
    const json2 = this.json;
    const options = this.options;
    if (this.sourceCache[sourceIndex] !== void 0) {
      return this.sourceCache[sourceIndex].then((texture) => texture.clone());
    }
    const sourceDef = json2.images[sourceIndex];
    const URL2 = self.URL || self.webkitURL;
    let sourceURI = sourceDef.uri || "";
    let isObjectURL = false;
    if (sourceDef.bufferView !== void 0) {
      sourceURI = parser.getDependency("bufferView", sourceDef.bufferView).then(function(bufferView) {
        isObjectURL = true;
        const blob2 = new Blob([bufferView], { type: sourceDef.mimeType });
        sourceURI = URL2.createObjectURL(blob2);
        return sourceURI;
      });
    } else if (sourceDef.uri === void 0) {
      throw new Error("THREE.GLTFLoader: Image " + sourceIndex + " is missing URI and bufferView");
    }
    const promise = Promise.resolve(sourceURI).then(function(sourceURI2) {
      return new Promise(function(resolve, reject) {
        let onLoad = resolve;
        if (loader.isImageBitmapLoader === true) {
          onLoad = function(imageBitmap) {
            const texture = new Texture(imageBitmap);
            texture.needsUpdate = true;
            resolve(texture);
          };
        }
        loader.load(LoaderUtils.resolveURL(sourceURI2, options.path), onLoad, void 0, reject);
      });
    }).then(function(texture) {
      if (isObjectURL === true) {
        URL2.revokeObjectURL(sourceURI);
      }
      assignExtrasToUserData(texture, sourceDef);
      texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType(sourceDef.uri);
      return texture;
    }).catch(function(error) {
      console.error("THREE.GLTFLoader: Couldn't load texture", sourceURI);
      throw error;
    });
    this.sourceCache[sourceIndex] = promise;
    return promise;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   *
   * @private
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @param {string} [colorSpace]
   * @return {Promise<Texture>}
   */
  assignTexture(materialParams, mapName, mapDef, colorSpace) {
    const parser = this;
    return this.getDependency("texture", mapDef.index).then(function(texture) {
      if (!texture) return null;
      if (mapDef.texCoord !== void 0 && mapDef.texCoord > 0) {
        texture = texture.clone();
        texture.channel = mapDef.texCoord;
      }
      if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
        const transform = mapDef.extensions !== void 0 ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : void 0;
        if (transform) {
          const gltfReference = parser.associations.get(texture);
          texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);
          parser.associations.set(texture, gltfReference);
        }
      }
      if (colorSpace !== void 0) {
        texture.colorSpace = colorSpace;
      }
      materialParams[mapName] = texture;
      return texture;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   *
   * @private
   * @param {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(mesh) {
    const geometry = mesh.geometry;
    let material = mesh.material;
    const useDerivativeTangents = geometry.attributes.tangent === void 0;
    const useVertexColors = geometry.attributes.color !== void 0;
    const useFlatShading = geometry.attributes.normal === void 0;
    if (mesh.isPoints) {
      const cacheKey = "PointsMaterial:" + material.uuid;
      let pointsMaterial = this.cache.get(cacheKey);
      if (!pointsMaterial) {
        pointsMaterial = new PointsMaterial();
        Material.prototype.copy.call(pointsMaterial, material);
        pointsMaterial.color.copy(material.color);
        pointsMaterial.map = material.map;
        pointsMaterial.sizeAttenuation = false;
        this.cache.add(cacheKey, pointsMaterial);
      }
      material = pointsMaterial;
    } else if (mesh.isLine) {
      const cacheKey = "LineBasicMaterial:" + material.uuid;
      let lineMaterial = this.cache.get(cacheKey);
      if (!lineMaterial) {
        lineMaterial = new LineBasicMaterial();
        Material.prototype.copy.call(lineMaterial, material);
        lineMaterial.color.copy(material.color);
        lineMaterial.map = material.map;
        this.cache.add(cacheKey, lineMaterial);
      }
      material = lineMaterial;
    }
    if (useDerivativeTangents || useVertexColors || useFlatShading) {
      let cacheKey = "ClonedMaterial:" + material.uuid + ":";
      if (useDerivativeTangents) cacheKey += "derivative-tangents:";
      if (useVertexColors) cacheKey += "vertex-colors:";
      if (useFlatShading) cacheKey += "flat-shading:";
      let cachedMaterial = this.cache.get(cacheKey);
      if (!cachedMaterial) {
        cachedMaterial = material.clone();
        if (useVertexColors) cachedMaterial.vertexColors = true;
        if (useFlatShading) cachedMaterial.flatShading = true;
        if (useDerivativeTangents) {
          if (cachedMaterial.normalScale) cachedMaterial.normalScale.y *= -1;
          if (cachedMaterial.clearcoatNormalScale) cachedMaterial.clearcoatNormalScale.y *= -1;
        }
        this.cache.add(cacheKey, cachedMaterial);
        this.associations.set(cachedMaterial, this.associations.get(material));
      }
      material = cachedMaterial;
    }
    mesh.material = material;
  }
  getMaterialType() {
    return MeshStandardMaterial;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(materialIndex) {
    const parser = this;
    const json2 = this.json;
    const extensions = this.extensions;
    const materialDef = json2.materials[materialIndex];
    let materialType;
    const materialParams = {};
    const materialExtensions = materialDef.extensions || {};
    const pending = [];
    if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
      const kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
      materialType = kmuExtension.getMaterialType();
      pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
    } else {
      const metallicRoughness = materialDef.pbrMetallicRoughness || {};
      materialParams.color = new Color(1, 1, 1);
      materialParams.opacity = 1;
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
      }
      materialParams.metalness = metallicRoughness.metallicFactor !== void 0 ? metallicRoughness.metallicFactor : 1;
      materialParams.roughness = metallicRoughness.roughnessFactor !== void 0 ? metallicRoughness.roughnessFactor : 1;
      if (metallicRoughness.metallicRoughnessTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "metalnessMap", metallicRoughness.metallicRoughnessTexture));
        pending.push(parser.assignTexture(materialParams, "roughnessMap", metallicRoughness.metallicRoughnessTexture));
      }
      materialType = this._invokeOne(function(ext) {
        return ext.getMaterialType && ext.getMaterialType(materialIndex);
      });
      pending.push(Promise.all(this._invokeAll(function(ext) {
        return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
      })));
    }
    if (materialDef.doubleSided === true) {
      materialParams.side = DoubleSide;
    }
    const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;
    if (alphaMode === ALPHA_MODES.BLEND) {
      materialParams.transparent = true;
      materialParams.depthWrite = false;
    } else {
      materialParams.transparent = false;
      if (alphaMode === ALPHA_MODES.MASK) {
        materialParams.alphaTest = materialDef.alphaCutoff !== void 0 ? materialDef.alphaCutoff : 0.5;
      }
    }
    if (materialDef.normalTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "normalMap", materialDef.normalTexture));
      materialParams.normalScale = new Vector2(1, 1);
      if (materialDef.normalTexture.scale !== void 0) {
        const scale = materialDef.normalTexture.scale;
        materialParams.normalScale.set(scale, scale);
      }
    }
    if (materialDef.occlusionTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "aoMap", materialDef.occlusionTexture));
      if (materialDef.occlusionTexture.strength !== void 0) {
        materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
      }
    }
    if (materialDef.emissiveFactor !== void 0 && materialType !== MeshBasicMaterial) {
      const emissiveFactor = materialDef.emissiveFactor;
      materialParams.emissive = new Color().setRGB(emissiveFactor[0], emissiveFactor[1], emissiveFactor[2], LinearSRGBColorSpace);
    }
    if (materialDef.emissiveTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "emissiveMap", materialDef.emissiveTexture, SRGBColorSpace));
    }
    return Promise.all(pending).then(function() {
      const material = new materialType(materialParams);
      if (materialDef.name) material.name = materialDef.name;
      assignExtrasToUserData(material, materialDef);
      parser.associations.set(material, { materials: materialIndex });
      if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);
      return material;
    });
  }
  /**
   * When Object3D instances are targeted by animation, they need unique names.
   *
   * @private
   * @param {string} originalName
   * @return {string}
   */
  createUniqueName(originalName) {
    const sanitizedName = PropertyBinding.sanitizeNodeName(originalName || "");
    if (sanitizedName in this.nodeNamesUsed) {
      return sanitizedName + "_" + ++this.nodeNamesUsed[sanitizedName];
    } else {
      this.nodeNamesUsed[sanitizedName] = 0;
      return sanitizedName;
    }
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @private
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(primitives) {
    const parser = this;
    const extensions = this.extensions;
    const cache2 = this.primitiveCache;
    function createDracoPrimitive(primitive) {
      return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function(geometry) {
        return addPrimitiveAttributes(geometry, primitive, parser);
      });
    }
    const pending = [];
    for (let i = 0, il = primitives.length; i < il; i++) {
      const primitive = primitives[i];
      const cacheKey = createPrimitiveKey(primitive);
      const cached2 = cache2[cacheKey];
      if (cached2) {
        pending.push(cached2.promise);
      } else {
        let geometryPromise;
        if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
          geometryPromise = createDracoPrimitive(primitive);
        } else {
          geometryPromise = addPrimitiveAttributes(new BufferGeometry(), primitive, parser);
        }
        cache2[cacheKey] = { primitive, promise: geometryPromise };
        pending.push(geometryPromise);
      }
    }
    return Promise.all(pending);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(meshIndex) {
    const parser = this;
    const json2 = this.json;
    const extensions = this.extensions;
    const meshDef = json2.meshes[meshIndex];
    const primitives = meshDef.primitives;
    const pending = [];
    for (let i = 0, il = primitives.length; i < il; i++) {
      const material = primitives[i].material === void 0 ? createDefaultMaterial(this.cache) : this.getDependency("material", primitives[i].material);
      pending.push(material);
    }
    pending.push(parser.loadGeometries(primitives));
    return Promise.all(pending).then(function(results) {
      const materials = results.slice(0, results.length - 1);
      const geometries = results[results.length - 1];
      const meshes = [];
      for (let i = 0, il = geometries.length; i < il; i++) {
        const geometry = geometries[i];
        const primitive = primitives[i];
        let mesh;
        const material = materials[i];
        if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === void 0) {
          mesh = meshDef.isSkinnedMesh === true ? new SkinnedMesh(geometry, material) : new Mesh(geometry, material);
          if (mesh.isSkinnedMesh === true) {
            mesh.normalizeSkinWeights();
          }
          if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleStripDrawMode);
          } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleFanDrawMode);
          }
        } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
          mesh = new LineSegments(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
          mesh = new Line(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
          mesh = new LineLoop(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
          mesh = new Points(geometry, material);
        } else {
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + primitive.mode);
        }
        if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
          updateMorphTargets(mesh, meshDef);
        }
        mesh.name = parser.createUniqueName(meshDef.name || "mesh_" + meshIndex);
        assignExtrasToUserData(mesh, meshDef);
        if (primitive.extensions) addUnknownExtensionsToUserData(extensions, mesh, primitive);
        parser.assignFinalMaterial(mesh);
        meshes.push(mesh);
      }
      for (let i = 0, il = meshes.length; i < il; i++) {
        parser.associations.set(meshes[i], {
          meshes: meshIndex,
          primitives: i
        });
      }
      if (meshes.length === 1) {
        if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, meshes[0], meshDef);
        return meshes[0];
      }
      const group = new Group();
      if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, group, meshDef);
      parser.associations.set(group, { meshes: meshIndex });
      for (let i = 0, il = meshes.length; i < il; i++) {
        group.add(meshes[i]);
      }
      return group;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   *
   * @private
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(cameraIndex) {
    let camera;
    const cameraDef = this.json.cameras[cameraIndex];
    const params = cameraDef[cameraDef.type];
    if (!params) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    if (cameraDef.type === "perspective") {
      camera = new PerspectiveCamera(MathUtils.radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
    } else if (cameraDef.type === "orthographic") {
      camera = new OrthographicCamera(-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
    }
    if (cameraDef.name) camera.name = this.createUniqueName(cameraDef.name);
    assignExtrasToUserData(camera, cameraDef);
    return Promise.resolve(camera);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   *
   * @private
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(skinIndex) {
    const skinDef = this.json.skins[skinIndex];
    const pending = [];
    for (let i = 0, il = skinDef.joints.length; i < il; i++) {
      pending.push(this._loadNodeShallow(skinDef.joints[i]));
    }
    if (skinDef.inverseBindMatrices !== void 0) {
      pending.push(this.getDependency("accessor", skinDef.inverseBindMatrices));
    } else {
      pending.push(null);
    }
    return Promise.all(pending).then(function(results) {
      const inverseBindMatrices = results.pop();
      const jointNodes = results;
      const bones = [];
      const boneInverses = [];
      for (let i = 0, il = jointNodes.length; i < il; i++) {
        const jointNode = jointNodes[i];
        if (jointNode) {
          bones.push(jointNode);
          const mat = new Matrix4();
          if (inverseBindMatrices !== null) {
            mat.fromArray(inverseBindMatrices.array, i * 16);
          }
          boneInverses.push(mat);
        } else {
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[i]);
        }
      }
      return new Skeleton(bones, boneInverses);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   *
   * @private
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(animationIndex) {
    const json2 = this.json;
    const parser = this;
    const animationDef = json2.animations[animationIndex];
    const animationName = animationDef.name ? animationDef.name : "animation_" + animationIndex;
    const pendingNodes = [];
    const pendingInputAccessors = [];
    const pendingOutputAccessors = [];
    const pendingSamplers = [];
    const pendingTargets = [];
    for (let i = 0, il = animationDef.channels.length; i < il; i++) {
      const channel = animationDef.channels[i];
      const sampler = animationDef.samplers[channel.sampler];
      const target = channel.target;
      const name = target.node;
      const input = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.input] : sampler.input;
      const output = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.output] : sampler.output;
      if (target.node === void 0) continue;
      pendingNodes.push(this.getDependency("node", name));
      pendingInputAccessors.push(this.getDependency("accessor", input));
      pendingOutputAccessors.push(this.getDependency("accessor", output));
      pendingSamplers.push(sampler);
      pendingTargets.push(target);
    }
    return Promise.all([
      Promise.all(pendingNodes),
      Promise.all(pendingInputAccessors),
      Promise.all(pendingOutputAccessors),
      Promise.all(pendingSamplers),
      Promise.all(pendingTargets)
    ]).then(function(dependencies) {
      const nodes = dependencies[0];
      const inputAccessors = dependencies[1];
      const outputAccessors = dependencies[2];
      const samplers = dependencies[3];
      const targets = dependencies[4];
      const tracks = [];
      for (let i = 0, il = nodes.length; i < il; i++) {
        const node = nodes[i];
        const inputAccessor = inputAccessors[i];
        const outputAccessor = outputAccessors[i];
        const sampler = samplers[i];
        const target = targets[i];
        if (node === void 0) continue;
        if (node.updateMatrix) {
          node.updateMatrix();
        }
        const createdTracks = parser._createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target);
        if (createdTracks) {
          for (let k = 0; k < createdTracks.length; k++) {
            tracks.push(createdTracks[k]);
          }
        }
      }
      return new AnimationClip(animationName, void 0, tracks);
    });
  }
  createNodeMesh(nodeIndex) {
    const json2 = this.json;
    const parser = this;
    const nodeDef = json2.nodes[nodeIndex];
    if (nodeDef.mesh === void 0) return null;
    return parser.getDependency("mesh", nodeDef.mesh).then(function(mesh) {
      const node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh);
      if (nodeDef.weights !== void 0) {
        node.traverse(function(o) {
          if (!o.isMesh) return;
          for (let i = 0, il = nodeDef.weights.length; i < il; i++) {
            o.morphTargetInfluences[i] = nodeDef.weights[i];
          }
        });
      }
      return node;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   *
   * @private
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(nodeIndex) {
    const json2 = this.json;
    const parser = this;
    const nodeDef = json2.nodes[nodeIndex];
    const nodePending = parser._loadNodeShallow(nodeIndex);
    const childPending = [];
    const childrenDef = nodeDef.children || [];
    for (let i = 0, il = childrenDef.length; i < il; i++) {
      childPending.push(parser.getDependency("node", childrenDef[i]));
    }
    const skeletonPending = nodeDef.skin === void 0 ? Promise.resolve(null) : parser.getDependency("skin", nodeDef.skin);
    return Promise.all([
      nodePending,
      Promise.all(childPending),
      skeletonPending
    ]).then(function(results) {
      const node = results[0];
      const children = results[1];
      const skeleton = results[2];
      if (skeleton !== null) {
        node.traverse(function(mesh) {
          if (!mesh.isSkinnedMesh) return;
          mesh.bind(skeleton, _identityMatrix);
        });
      }
      for (let i = 0, il = children.length; i < il; i++) {
        node.add(children[i]);
      }
      return node;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(nodeIndex) {
    const json2 = this.json;
    const extensions = this.extensions;
    const parser = this;
    if (this.nodeCache[nodeIndex] !== void 0) {
      return this.nodeCache[nodeIndex];
    }
    const nodeDef = json2.nodes[nodeIndex];
    const nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : "";
    const pending = [];
    const meshPromise = parser._invokeOne(function(ext) {
      return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
    });
    if (meshPromise) {
      pending.push(meshPromise);
    }
    if (nodeDef.camera !== void 0) {
      pending.push(parser.getDependency("camera", nodeDef.camera).then(function(camera) {
        return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
      }));
    }
    parser._invokeAll(function(ext) {
      return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
    }).forEach(function(promise) {
      pending.push(promise);
    });
    this.nodeCache[nodeIndex] = Promise.all(pending).then(function(objects) {
      let node;
      if (nodeDef.isBone === true) {
        node = new Bone();
      } else if (objects.length > 1) {
        node = new Group();
      } else if (objects.length === 1) {
        node = objects[0];
      } else {
        node = new Object3D();
      }
      if (node !== objects[0]) {
        for (let i = 0, il = objects.length; i < il; i++) {
          node.add(objects[i]);
        }
      }
      if (nodeDef.name) {
        node.userData.name = nodeDef.name;
        node.name = nodeName;
      }
      assignExtrasToUserData(node, nodeDef);
      if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);
      if (nodeDef.matrix !== void 0) {
        const matrix = new Matrix4();
        matrix.fromArray(nodeDef.matrix);
        node.applyMatrix4(matrix);
      } else {
        if (nodeDef.translation !== void 0) {
          node.position.fromArray(nodeDef.translation);
        }
        if (nodeDef.rotation !== void 0) {
          node.quaternion.fromArray(nodeDef.rotation);
        }
        if (nodeDef.scale !== void 0) {
          node.scale.fromArray(nodeDef.scale);
        }
      }
      if (!parser.associations.has(node)) {
        parser.associations.set(node, {});
      }
      parser.associations.get(node).nodes = nodeIndex;
      return node;
    });
    return this.nodeCache[nodeIndex];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   *
   * @private
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(sceneIndex) {
    const extensions = this.extensions;
    const sceneDef = this.json.scenes[sceneIndex];
    const parser = this;
    const scene = new Group();
    if (sceneDef.name) scene.name = parser.createUniqueName(sceneDef.name);
    assignExtrasToUserData(scene, sceneDef);
    if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);
    const nodeIds = sceneDef.nodes || [];
    const pending = [];
    for (let i = 0, il = nodeIds.length; i < il; i++) {
      pending.push(parser.getDependency("node", nodeIds[i]));
    }
    return Promise.all(pending).then(function(nodes) {
      for (let i = 0, il = nodes.length; i < il; i++) {
        scene.add(nodes[i]);
      }
      const reduceAssociations = (node) => {
        const reducedAssociations = /* @__PURE__ */ new Map();
        for (const [key, value] of parser.associations) {
          if (key instanceof Material || key instanceof Texture) {
            reducedAssociations.set(key, value);
          }
        }
        node.traverse((node2) => {
          const mappings = parser.associations.get(node2);
          if (mappings != null) {
            reducedAssociations.set(node2, mappings);
          }
        });
        return reducedAssociations;
      };
      parser.associations = reduceAssociations(scene);
      return scene;
    });
  }
  _createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target) {
    const tracks = [];
    const targetName = node.name ? node.name : node.uuid;
    const targetNames = [];
    if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
      node.traverse(function(object) {
        if (object.morphTargetInfluences) {
          targetNames.push(object.name ? object.name : object.uuid);
        }
      });
    } else {
      targetNames.push(targetName);
    }
    let TypedKeyframeTrack;
    switch (PATH_PROPERTIES[target.path]) {
      case PATH_PROPERTIES.weights:
        TypedKeyframeTrack = NumberKeyframeTrack;
        break;
      case PATH_PROPERTIES.rotation:
        TypedKeyframeTrack = QuaternionKeyframeTrack;
        break;
      case PATH_PROPERTIES.translation:
      case PATH_PROPERTIES.scale:
        TypedKeyframeTrack = VectorKeyframeTrack;
        break;
      default:
        switch (outputAccessor.itemSize) {
          case 1:
            TypedKeyframeTrack = NumberKeyframeTrack;
            break;
          case 2:
          case 3:
          default:
            TypedKeyframeTrack = VectorKeyframeTrack;
            break;
        }
        break;
    }
    const interpolation = sampler.interpolation !== void 0 ? INTERPOLATION[sampler.interpolation] : InterpolateLinear;
    const outputArray = this._getArrayFromAccessor(outputAccessor);
    for (let j = 0, jl = targetNames.length; j < jl; j++) {
      const track = new TypedKeyframeTrack(
        targetNames[j] + "." + PATH_PROPERTIES[target.path],
        inputAccessor.array,
        outputArray,
        interpolation
      );
      if (sampler.interpolation === "CUBICSPLINE") {
        this._createCubicSplineTrackInterpolant(track);
      }
      tracks.push(track);
    }
    return tracks;
  }
  _getArrayFromAccessor(accessor) {
    let outputArray = accessor.array;
    if (accessor.normalized) {
      const scale = getNormalizedComponentScale(outputArray.constructor);
      const scaled = new Float32Array(outputArray.length);
      for (let j = 0, jl = outputArray.length; j < jl; j++) {
        scaled[j] = outputArray[j] * scale;
      }
      outputArray = scaled;
    }
    return outputArray;
  }
  _createCubicSplineTrackInterpolant(track) {
    track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
      const interpolantType = this instanceof QuaternionKeyframeTrack ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;
      return new interpolantType(this.times, this.values, this.getValueSize() / 3, result);
    };
    track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
  }
}
function computeBounds(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const box = new Box3();
  if (attributes.POSITION !== void 0) {
    const accessor = parser.json.accessors[attributes.POSITION];
    const min = accessor.min;
    const max = accessor.max;
    if (min !== void 0 && max !== void 0) {
      box.set(
        new Vector3(min[0], min[1], min[2]),
        new Vector3(max[0], max[1], max[2])
      );
      if (accessor.normalized) {
        const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
        box.min.multiplyScalar(boxScale);
        box.max.multiplyScalar(boxScale);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else {
    return;
  }
  const targets = primitiveDef.targets;
  if (targets !== void 0) {
    const maxDisplacement = new Vector3();
    const vector = new Vector3();
    for (let i = 0, il = targets.length; i < il; i++) {
      const target = targets[i];
      if (target.POSITION !== void 0) {
        const accessor = parser.json.accessors[target.POSITION];
        const min = accessor.min;
        const max = accessor.max;
        if (min !== void 0 && max !== void 0) {
          vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
          vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
          vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));
          if (accessor.normalized) {
            const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
            vector.multiplyScalar(boxScale);
          }
          maxDisplacement.max(vector);
        } else {
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        }
      }
    }
    box.expandByVector(maxDisplacement);
  }
  geometry.boundingBox = box;
  const sphere = new Sphere();
  box.getCenter(sphere.center);
  sphere.radius = box.min.distanceTo(box.max) / 2;
  geometry.boundingSphere = sphere;
}
function addPrimitiveAttributes(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const pending = [];
  function assignAttributeAccessor(accessorIndex, attributeName) {
    return parser.getDependency("accessor", accessorIndex).then(function(accessor) {
      geometry.setAttribute(attributeName, accessor);
    });
  }
  for (const gltfAttributeName in attributes) {
    const threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();
    if (threeAttributeName in geometry.attributes) continue;
    pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
  }
  if (primitiveDef.indices !== void 0 && !geometry.index) {
    const accessor = parser.getDependency("accessor", primitiveDef.indices).then(function(accessor2) {
      geometry.setIndex(accessor2);
    });
    pending.push(accessor);
  }
  if (ColorManagement.workingColorSpace !== LinearSRGBColorSpace && "COLOR_0" in attributes) {
    console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ColorManagement.workingColorSpace}" not supported.`);
  }
  assignExtrasToUserData(geometry, primitiveDef);
  computeBounds(geometry, primitiveDef, parser);
  return Promise.all(pending).then(function() {
    return primitiveDef.targets !== void 0 ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
  });
}
var MeshoptDecoder = (function() {
  var wasm_base = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb";
  var wasm_simd = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb";
  var detector = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]);
  var wasmpack = new Uint8Array([32, 0, 65, 2, 1, 106, 34, 33, 3, 128, 11, 4, 13, 64, 6, 253, 10, 7, 15, 116, 127, 5, 8, 12, 40, 16, 19, 54, 20, 9, 27, 255, 113, 17, 42, 67, 24, 23, 146, 148, 18, 14, 22, 45, 70, 69, 56, 114, 101, 21, 25, 63, 75, 136, 108, 28, 118, 29, 73, 115]);
  if (typeof WebAssembly !== "object") {
    return {
      supported: false
    };
  }
  var wasm = WebAssembly.validate(detector) ? wasm_simd : wasm_base;
  var instance;
  var ready = WebAssembly.instantiate(unpack(wasm), {}).then(function(result) {
    instance = result.instance;
    instance.exports.__wasm_call_ctors();
  });
  function unpack(data) {
    var result = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
    }
    var write = 0;
    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function decode(fun, target, count, size, source, filter) {
    var sbrk = instance.exports.sbrk;
    var count4 = count + 3 & -4;
    var tp = sbrk(count4 * size);
    var sp = sbrk(source.length);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(source, sp);
    var res = fun(tp, count, size, sp, source.length);
    if (res == 0 && filter) {
      filter(tp, count4, size);
    }
    target.set(heap.subarray(tp, tp + count * size));
    sbrk(tp - sbrk(0));
    if (res != 0) {
      throw new Error("Malformed buffer data: " + res);
    }
  }
  var filters = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  };
  var decoders = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  };
  var workers = [];
  var requestId = 0;
  function createWorker(url) {
    var worker = {
      object: new Worker(url),
      pending: 0,
      requests: {}
    };
    worker.object.onmessage = function(event) {
      var data = event.data;
      worker.pending -= data.count;
      worker.requests[data.id][data.action](data.value);
      delete worker.requests[data.id];
    };
    return worker;
  }
  function initWorkers(count) {
    var source = "var instance; var ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(unpack(wasm)) + "]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;" + decode.toString() + workerProcess.toString();
    var blob2 = new Blob([source], { type: "text/javascript" });
    var url = URL.createObjectURL(blob2);
    for (var i = 0; i < count; ++i) {
      workers[i] = createWorker(url);
    }
    URL.revokeObjectURL(url);
  }
  function decodeWorker(count, size, source, mode, filter) {
    var worker = workers[0];
    for (var i = 1; i < workers.length; ++i) {
      if (workers[i].pending < worker.pending) {
        worker = workers[i];
      }
    }
    return new Promise(function(resolve, reject) {
      var data = new Uint8Array(source);
      var id2 = requestId++;
      worker.pending += count;
      worker.requests[id2] = { resolve, reject };
      worker.object.postMessage({ id: id2, count, size, source: data, mode, filter }, [data.buffer]);
    });
  }
  function workerProcess(event) {
    ready.then(function() {
      var data = event.data;
      try {
        var target = new Uint8Array(data.count * data.size);
        decode(instance.exports[data.mode], target, data.count, data.size, data.source, instance.exports[data.filter]);
        self.postMessage({ id: data.id, count: data.count, action: "resolve", value: target }, [target.buffer]);
      } catch (error) {
        self.postMessage({ id: data.id, count: data.count, action: "reject", value: error });
      }
    });
  }
  return {
    ready,
    supported: true,
    useWorkers: function(count) {
      initWorkers(count);
    },
    decodeVertexBuffer: function(target, count, size, source, filter) {
      decode(instance.exports.meshopt_decodeVertexBuffer, target, count, size, source, instance.exports[filters[filter]]);
    },
    decodeIndexBuffer: function(target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
    },
    decodeIndexSequence: function(target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
    },
    decodeGltfBuffer: function(target, count, size, source, mode, filter) {
      decode(instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
    },
    decodeGltfBufferAsync: function(count, size, source, mode, filter) {
      if (workers.length > 0) {
        return decodeWorker(count, size, source, decoders[mode], filters[filter]);
      }
      return ready.then(function() {
        var target = new Uint8Array(count * size);
        decode(instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
        return target;
      });
    }
  };
})();
class RoomEnvironment extends Scene {
  constructor() {
    super();
    const geometry = new BoxGeometry();
    geometry.deleteAttribute("uv");
    const roomMaterial = new MeshStandardMaterial({ side: BackSide });
    const boxMaterial = new MeshStandardMaterial();
    const mainLight = new PointLight(16777215, 900, 28, 2);
    mainLight.position.set(0.418, 16.199, 0.3);
    this.add(mainLight);
    const room = new Mesh(geometry, roomMaterial);
    room.position.set(-0.757, 13.219, 0.717);
    room.scale.set(31.713, 28.305, 28.591);
    this.add(room);
    const boxes = new InstancedMesh(geometry, boxMaterial, 6);
    const transform = new Object3D();
    transform.position.set(-10.906, 2.009, 1.846);
    transform.rotation.set(0, -0.195, 0);
    transform.scale.set(2.328, 7.905, 4.651);
    transform.updateMatrix();
    boxes.setMatrixAt(0, transform.matrix);
    transform.position.set(-5.607, -0.754, -0.758);
    transform.rotation.set(0, 0.994, 0);
    transform.scale.set(1.97, 1.534, 3.955);
    transform.updateMatrix();
    boxes.setMatrixAt(1, transform.matrix);
    transform.position.set(6.167, 0.857, 7.803);
    transform.rotation.set(0, 0.561, 0);
    transform.scale.set(3.927, 6.285, 3.687);
    transform.updateMatrix();
    boxes.setMatrixAt(2, transform.matrix);
    transform.position.set(-2.017, 0.018, 6.124);
    transform.rotation.set(0, 0.333, 0);
    transform.scale.set(2.002, 4.566, 2.064);
    transform.updateMatrix();
    boxes.setMatrixAt(3, transform.matrix);
    transform.position.set(2.291, -0.756, -2.621);
    transform.rotation.set(0, -0.286, 0);
    transform.scale.set(1.546, 1.552, 1.496);
    transform.updateMatrix();
    boxes.setMatrixAt(4, transform.matrix);
    transform.position.set(-2.193, -0.369, -5.547);
    transform.rotation.set(0, 0.516, 0);
    transform.scale.set(3.875, 3.487, 2.986);
    transform.updateMatrix();
    boxes.setMatrixAt(5, transform.matrix);
    this.add(boxes);
    const light1 = new Mesh(geometry, createAreaLightMaterial(50));
    light1.position.set(-16.116, 14.37, 8.208);
    light1.scale.set(0.1, 2.428, 2.739);
    this.add(light1);
    const light2 = new Mesh(geometry, createAreaLightMaterial(50));
    light2.position.set(-16.109, 18.021, -8.207);
    light2.scale.set(0.1, 2.425, 2.751);
    this.add(light2);
    const light3 = new Mesh(geometry, createAreaLightMaterial(17));
    light3.position.set(14.904, 12.198, -1.832);
    light3.scale.set(0.15, 4.265, 6.331);
    this.add(light3);
    const light4 = new Mesh(geometry, createAreaLightMaterial(43));
    light4.position.set(-0.462, 8.89, 14.52);
    light4.scale.set(4.38, 5.441, 0.088);
    this.add(light4);
    const light5 = new Mesh(geometry, createAreaLightMaterial(20));
    light5.position.set(3.235, 11.486, -12.541);
    light5.scale.set(2.5, 2, 0.1);
    this.add(light5);
    const light6 = new Mesh(geometry, createAreaLightMaterial(100));
    light6.position.set(0, 20, 0);
    light6.scale.set(1, 0.1, 1);
    this.add(light6);
  }
  /**
   * Frees internal resources. This method should be called
   * when the environment is no longer required.
   */
  dispose() {
    const resources = /* @__PURE__ */ new Set();
    this.traverse((object) => {
      if (object.isMesh) {
        resources.add(object.geometry);
        resources.add(object.material);
      }
    });
    for (const resource of resources) {
      resource.dispose();
    }
  }
}
function createAreaLightMaterial(intensity) {
  const material = new MeshBasicMaterial();
  material.color.setScalar(intensity);
  return material;
}
const NOISE_GLSL = (
  /* glsl */
  `
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
`
);
const RIG_GLSL = (
  /* glsl */
  `
attribute vec4 rigW; // how far this vertex follows each of the four joints of its limb (rigWeights.ts)
attribute vec4 rigP; // pull toward the insertion: fibre direction * sqrt(share) in xyz, straight share in w
uniform float uRigOn;
uniform vec4 uJP[4]; // pivot xyz
uniform vec4 uJA[4]; // rotation axis, angle (rad)
uniform vec3 uPull;      // how far the insertion of this muscle has moved from rest
uniform vec4 uBulge;     // belly centre xyz, half length
uniform vec4 uBulgeAxis; // belly axis xyz, radial swelling
uniform float uShorten;  // axial shortening of the belly
vec3 rig_rot(vec3 v, vec3 a, float ang){
  float c=cos(ang), s=sin(ang);
  return v*c + cross(a,v)*s + a*dot(a,v)*(1.0-c);
}
void rig_apply(inout vec3 p, inout vec3 n){
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
    float w = rigW[j];
    if (w > 0.0005) {
      float ang = uJA[j].w * w;
      p = uJP[j].xyz + rig_rot(p - uJP[j].xyz, uJA[j].xyz, ang);
      n = rig_rot(n, uJA[j].xyz, ang);
    }
  }
  p += rigP.xyz * dot(rigP.xyz, uPull) + uPull * rigP.w;
}
`
);
function makeRigUniforms() {
  const v4 = () => [0, 1, 2, 3].map(() => new Vector4());
  return {
    uRigOn: { value: 0 },
    uJP: { value: v4() },
    uJA: { value: v4() },
    uPull: { value: new Vector3() },
    uBulge: { value: new Vector4(0, 0, 0, 1) },
    uBulgeAxis: { value: new Vector4(0, 1, 0, 0) },
    uShorten: { value: 0 }
  };
}
const VERT_RIG_FULL = (
  /* glsl */
  `#include <beginnormal_vertex>
  vec3 rigRest = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 rigWorld = rigRest;
  vec3 rigNW = vec3(0.0, 1.0, 0.0);
  if (uRigOn > 0.5) {
    rigNW = normalize((vec4(normalMatrix * objectNormal, 0.0) * viewMatrix).xyz);
    rig_apply(rigWorld, rigNW);
  }`
);
const VERT_RIG_POS = (
  /* glsl */
  `#include <begin_vertex>
  vec3 rigRest = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 rigWorld = rigRest;
  vec3 rigNW = vec3(0.0, 1.0, 0.0);
  if (uRigOn > 0.5) rig_apply(rigWorld, rigNW);`
);
const VERT_PROJECT = (
  /* glsl */
  `vec4 mvPosition = uRigOn > 0.5 ? viewMatrix * vec4(rigWorld, 1.0) : modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;`
);
const VERT_WORLDPOS = (
  /* glsl */
  `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
  vec4 worldPosition = uRigOn > 0.5 ? vec4(rigWorld, 1.0) : modelMatrix * vec4(transformed, 1.0);
#endif`
);
function patchRigVertex(shader, withNormal) {
  let v = shader.vertexShader.replace("#include <common>", `#include <common>
${RIG_GLSL}`);
  if (withNormal && v.includes("#include <beginnormal_vertex>")) {
    v = v.replace("#include <beginnormal_vertex>", VERT_RIG_FULL).replace("#include <defaultnormal_vertex>", "#include <defaultnormal_vertex>\n  if (uRigOn > 0.5) transformedNormal = normalize(mat3(viewMatrix) * rigNW);");
  } else {
    v = v.replace("#include <begin_vertex>", VERT_RIG_POS);
  }
  v = v.replace("#include <project_vertex>", VERT_PROJECT).replace("#include <worldpos_vertex>", VERT_WORLDPOS);
  shader.vertexShader = v;
}
function patchOrganic(shader, u) {
  Object.assign(shader.uniforms, u);
  patchRigVertex(shader, true);
  shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vOrgPos;\nvarying vec3 vOrgN;\nvarying float vAO;\nattribute float aoBake;\nuniform mat4 uRestModel;\nuniform mat3 uRestNormal;").replace("#include <fog_vertex>", "#include <fog_vertex>\n  vOrgPos = (uRestModel * vec4(position, 1.0)).xyz;\n  vOrgN = normalize(uRestNormal * objectNormal);\n  vAO = aoBake;");
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
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
}`
  ).replace(
    "#include <color_fragment>",
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
  }`
  ).replace(
    "#include <normal_fragment_maps>",
    `#include <normal_fragment_maps>
  if (uOrgBump > 0.0 || uMicroBump > 0.0) {
    float hgt = orgH * uOrgBump + orgMicro * uMicroBump;
    vec2 dH = vec2(dFdx(hgt), dFdy(hgt));
    normal = org_perturb(-vViewPosition, normal, dH, faceDirection);
  }`
  ).replace(
    "#include <emissivemap_fragment>",
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
  if (uStretch > 0.0) totalEmissiveRadiance += uViolet * (0.02 + 0.3 * rimFres) * uStretch;`
  ).replace(
    "#include <lights_fragment_end>",
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
#endif`
  ).replace(
    "#include <aomap_fragment>",
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
  }`
  ).replace(
    "#include <dithering_fragment>",
    `#include <dithering_fragment>
#ifdef OPAQUE
  gl_FragColor.a = 1.0 + ragaGlow;
#endif
  if (!gl_FrontFacing) { gl_FragColor.rgb = uCutColor; gl_FragColor.a = max(min(gl_FragColor.a, 1.0), 0.92); }`
  );
}
function makeGBufferMaterial(rig) {
  const m = new MeshNormalMaterial();
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, rig);
    patchRigVertex(shader, true);
  };
  m.customProgramCacheKey = () => "raga-gbuf-v1";
  return m;
}
function makeRigDepthMaterial(rig) {
  const m = new MeshDepthMaterial({ depthPacking: RGBADepthPacking });
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, rig);
    patchRigVertex(shader, false);
  };
  m.customProgramCacheKey = () => "raga-depth-v1";
  return m;
}
const __vite_glob_1_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NOISE_GLSL,
  RIG_GLSL,
  makeGBufferMaterial,
  makeRigDepthMaterial,
  makeRigUniforms,
  patchOrganic
}, Symbol.toStringTag, { value: "Module" }));
const ISO = (scale, colorVar, bump, fine = 0.6) => ({ scale, colorVar, bump, stretch: 1, fine });
const FIB = (scale, colorVar, bump, stretch = 0.07) => ({ scale, colorVar, bump, stretch, fine: 0.8 });
const KINDS = {
  bone: { color: "#e6d9be", roughness: 0.58, clearcoat: 0.06, clearcoatRoughness: 0.5, organic: ISO(160, 0.08, 6e-5, 0.7), micro: { type: 1, amt: 0.1, bump: 35e-6 }, sss: ["#ffb68a", 0.18, 0.25], ao: [1, 0.55] },
  suture: { color: "#b9a582", roughness: 0.7, organic: ISO(260, 0.1, 4e-5), micro: { type: 1, amt: 0.08, bump: 2e-5 }, ao: [1, 0.5] },
  cartilage: { color: "#d4e3e6", roughness: 0.26, clearcoat: 0.9, clearcoatRoughness: 0.12, organic: ISO(90, 0.05, 2e-5), sss: ["#bfe3ff", 0.45, 0.45], ao: [0.9, 0.4] },
  enamel: { color: "#f4f0e6", roughness: 0.18, clearcoat: 0.8, clearcoatRoughness: 0.08, organic: ISO(160, 0.03, 1e-5), ao: [0.9, 0.4] },
  dentine: { color: "#e5d29e", roughness: 0.5, organic: ISO(160, 0.05, 2e-5), ao: [0.9, 0.4] },
  muscle: { color: "#8a2420", roughness: 0.46, clearcoat: 0.32, clearcoatRoughness: 0.32, sheen: 0.3, sheenColor: "#ff8a78", organic: FIB(380, 0.2, 5e-5, 0.06), micro: { type: 2, amt: 0.22, bump: 32e-6 }, fiber: true, sss: ["#ff3020", 0.55, 0.5], ao: [1, 0.6] },
  tendon: { color: "#ece4d4", roughness: 0.24, clearcoat: 0.85, clearcoatRoughness: 0.14, sheen: 0.55, sheenColor: "#ffffff", organic: FIB(480, 0.06, 2e-5, 0.05), micro: { type: 3, amt: 0.08, bump: 14e-6 }, fiber: true, sss: ["#ffd9c0", 0.25, 0.35], ao: [1, 0.5] },
  ligament: { color: "#e0d8c5", roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.2, sheen: 0.4, sheenColor: "#ffffff", organic: FIB(440, 0.07, 2e-5, 0.08), micro: { type: 3, amt: 0.08, bump: 14e-6 }, fiber: true, sss: ["#ffd9c0", 0.2, 0.3], ao: [1, 0.5] },
  capsule: { color: "#e9e3d6", roughness: 0.4, clearcoat: 0.45, clearcoatRoughness: 0.2, opacity: 0.62, organic: FIB(380, 0.05, 1e-5, 0.2), fiber: true, ao: [0.6, 0.2] },
  fascia: { color: "#ece8de", roughness: 0.38, clearcoat: 0.45, clearcoatRoughness: 0.2, opacity: 0.5, organic: FIB(420, 0.05, 1e-5, 0.15), fiber: true, ao: [0.5, 0.2] },
  bursa: { color: "#a3c9d9", roughness: 0.22, clearcoat: 0.8, clearcoatRoughness: 0.1, opacity: 0.55, organic: ISO(120, 0.04, 1e-5), ao: [0.5, 0.2] },
  fat: { color: "#e8cc6c", roughness: 0.45, clearcoat: 0.4, organic: ISO(260, 0.1, 4e-5), sss: ["#ffcc55", 0.5, 0.5], ao: [1, 0.5] },
  artery: { color: "#b8242f", roughness: 0.28, clearcoat: 0.7, clearcoatRoughness: 0.18, organic: ISO(160, 0.06, 1e-5), sss: ["#ff2a1a", 0.45, 0.4], ao: [1, 0.55] },
  vein: { color: "#2f509f", roughness: 0.3, clearcoat: 0.65, clearcoatRoughness: 0.2, organic: ISO(160, 0.06, 1e-5), sss: ["#5a6cff", 0.3, 0.4], ao: [1, 0.55] },
  pulmonary_artery: { color: "#4258b6", roughness: 0.3, clearcoat: 0.65, organic: ISO(160, 0.06, 1e-5), sss: ["#5a6cff", 0.3, 0.4], ao: [1, 0.55] },
  pulmonary_vein: { color: "#c13a49", roughness: 0.3, clearcoat: 0.65, organic: ISO(160, 0.06, 1e-5), sss: ["#ff2a1a", 0.4, 0.4], ao: [1, 0.55] },
  myocardium: { color: "#9e3530", roughness: 0.44, clearcoat: 0.4, clearcoatRoughness: 0.3, sheen: 0.4, sheenColor: "#ff9a8a", organic: ISO(300, 0.14, 4e-5), micro: { type: 2, amt: 0.12, bump: 2e-5 }, fiber: true, sss: ["#ff3020", 0.55, 0.5], ao: [1, 0.6] },
  nerve: { color: "#efd06c", roughness: 0.36, clearcoat: 0.45, clearcoatRoughness: 0.25, sheen: 0.35, sheenColor: "#fff3c4", organic: FIB(520, 0.08, 2e-5, 0.12), micro: { type: 3, amt: 0.06, bump: 1e-5 }, fiber: true, sss: ["#ffd27a", 0.35, 0.4], ao: [1, 0.5] },
  lymph: { color: "#98bd4a", roughness: 0.38, clearcoat: 0.45, organic: ISO(260, 0.1, 3e-5), sss: ["#c8ff70", 0.35, 0.4], ao: [1, 0.5] },
  gland: { color: "#c77b55", roughness: 0.44, clearcoat: 0.35, organic: ISO(320, 0.12, 4e-5), sss: ["#ff8a5a", 0.45, 0.45], ao: [1, 0.55] },
  mucosa: { color: "#c65d65", roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.18, organic: ISO(260, 0.1, 3e-5), sss: ["#ff5a5a", 0.45, 0.45], ao: [1, 0.55] },
  bronchus: { color: "#e6cdbb", roughness: 0.36, clearcoat: 0.5, organic: ISO(240, 0.06, 3e-5), sss: ["#ffd0b8", 0.3, 0.4], ao: [1, 0.5] },
  lung: { color: "#d8a3a1", roughness: 0.5, clearcoat: 0.35, organic: ISO(340, 0.14, 4e-5), sss: ["#ff9a9a", 0.5, 0.5], ao: [1, 0.55] },
  duct: { color: "#d6b36b", roughness: 0.36, clearcoat: 0.5, organic: ISO(200, 0.06, 2e-5), ao: [1, 0.5] },
  intestine: { color: "#cf917d", roughness: 0.4, clearcoat: 0.5, organic: ISO(220, 0.1, 3e-5), sss: ["#ff8a70", 0.45, 0.45], ao: [1, 0.55] },
  peritoneum: { color: "#ecdccc", roughness: 0.36, clearcoat: 0.5, opacity: 0.5, organic: ISO(200, 0.05, 1e-5), ao: [0.5, 0.2] },
  gallbladder: { color: "#5f8d4e", roughness: 0.32, clearcoat: 0.6, organic: ISO(200, 0.08, 2e-5), sss: ["#9aff70", 0.3, 0.4], ao: [1, 0.5] },
  organ: { color: "#b9715f", roughness: 0.44, clearcoat: 0.35, organic: ISO(260, 0.1, 3e-5), sss: ["#ff7a5a", 0.45, 0.45], ao: [1, 0.55] },
  skin: { color: "#d6a385", roughness: 0.5, clearcoat: 0.12, sheen: 0.3, sheenColor: "#ffd9c7", opacity: 0.38, organic: ISO(400, 0.06, 1e-5), sss: ["#ff7a5a", 0.5, 0.5], ao: [0.6, 0.3] },
  hair: { color: "#2b211b", roughness: 0.7, organic: ISO(900, 0.1, 1e-5), ao: [0.6, 0.3] },
  nail: { color: "#efd6cc", roughness: 0.28, clearcoat: 0.6, organic: ISO(200, 0.04, 1e-5), ao: [0.8, 0.4] },
  origin: { color: "#e5484d", roughness: 0.42, clearcoat: 0.4, organic: ISO(200, 0.05, 0), emissive: 0.45, rimBase: 0.9 },
  insertion: { color: "#3b82f6", roughness: 0.42, clearcoat: 0.4, organic: ISO(200, 0.05, 0), emissive: 0.45, rimBase: 0.9 }
};
const FUNCTION_COLORS = {
  Flexion: "#c0392b",
  "Flexion fingers": "#e0614f",
  "Flexion hand/foot": "#a93226",
  Extension: "#2e86c1",
  "Extensor extremities": "#5dade2",
  "Extension hand/foot": "#1f618d",
  Abductor: "#27ae60",
  Adductor: "#8e44ad",
  "External rotation": "#f39c12",
  "Internal rotator": "#d35400",
  Levator: "#16a085",
  Depressor: "#7f8c8d",
  Biarticular: "#c71585",
  "Orbicularis/Constrictor": "#b7950b",
  Superficial: "#839192",
  Trapezius: "#2874a6",
  Diaphragm: "#a04000",
  Masticator: "#6c3483",
  Ingestion: "#ca6f1e",
  Phonation: "#1abc9c"
};
function kindOf(name) {
  return name in KINDS ? name : "organ";
}
const ACCENT = {
  eosin: { value: new Color("#ff5d8f") },
  violet: { value: new Color("#7b6cff") }
};
const LM_SLOTS = 32;
const v4s = () => Array.from({ length: LM_SLOTS }, () => new Vector4());
const LM = {
  pos: { value: v4s() },
  col: { value: v4s() },
  nrm: { value: v4s() },
  time: { value: 0 }
};
const ORGANIC_KEY = "raga-organic-v2";
function makeTissueMaterial(kind, opts = {}) {
  const def = KINDS[kind];
  const lite = !!opts.lite;
  const translucent = (def.opacity ?? 1) < 1;
  const m = new MeshPhysicalMaterial({
    color: new Color(def.color),
    roughness: def.roughness,
    metalness: 0,
    clearcoat: lite ? 0 : def.clearcoat ?? 0,
    clearcoatRoughness: def.clearcoatRoughness ?? 0.4,
    sheen: lite ? 0 : def.sheen ?? 0,
    sheenColor: new Color(def.sheenColor ?? "#ffffff"),
    sheenRoughness: 0.55,
    specularIntensity: def.specular ?? 1,
    transparent: translucent,
    opacity: def.opacity ?? 1,
    depthWrite: !translucent,
    side: FrontSide
  });
  if (kind === "origin" || kind === "insertion") {
    m.polygonOffset = true;
    m.polygonOffsetFactor = -2;
    m.polygonOffsetUnits = -6;
    m.side = DoubleSide;
  }
  const rig = opts.rig ?? makeRigUniforms();
  const sss = def.sss;
  const micro = def.micro;
  const org = {
    ...rig,
    uOrgScale: { value: def.organic.scale },
    uOrgVar: { value: lite ? def.organic.colorVar * 0.8 : def.organic.colorVar },
    uOrgBump: { value: lite ? 0 : def.organic.bump },
    uOrgStretch: { value: def.organic.stretch },
    uOrgFine: { value: def.organic.fine ?? 0.6 },
    uFiberDir: { value: new Vector3(0, 1, 0) },
    uMicro: { value: lite || !micro ? 0 : micro.type },
    uMicroAmt: { value: micro?.amt ?? 0 },
    uMicroBump: { value: lite || !micro ? 0 : micro.bump },
    uCutColor: { value: new Color(kind === "bone" ? "#b8956a" : kind === "muscle" ? "#5a1512" : "#7a6f62") },
    uTint: { value: new Color("#000000") },
    uTintAmt: { value: 0 },
    uRim: { value: new Vector4(0, 0, 0, 0) },
    uGlow: { value: 0 },
    uAOOn: { value: opts.ao ? 1 : 0 },
    uAOStr: { value: def.ao?.[0] ?? 0.8 },
    uAODir: { value: def.ao?.[1] ?? 0.4 },
    uSSS: { value: sss && !lite ? (() => {
      const c = new Color(sss[0]);
      return new Vector4(c.r, c.g, c.b, sss[1]);
    })() : new Vector4(0, 0, 0, 0) },
    uSSSWrap: { value: sss?.[2] ?? 0.4 },
    uContract: { value: 0 },
    uStretch: { value: 0 },
    uEosin: ACCENT.eosin,
    uViolet: ACCENT.violet,
    uRestModel: { value: new Matrix4() },
    uRestNormal: { value: new Matrix3() },
    uLmBits: { value: 0 },
    uLmPos: LM.pos,
    uLmCol: LM.col,
    uLmNrm: LM.nrm,
    uLmTime: LM.time
  };
  const bc = new Color(def.color);
  const rimBase = def.rimBase ? new Vector4(Math.min(1, bc.r * 1.6 + 0.1), Math.min(1, bc.g * 1.6 + 0.1), Math.min(1, bc.b * 1.6 + 0.1), def.rimBase) : new Vector4(0, 0, 0, 0);
  m.userData = { kind, baseColor: m.color.clone(), baseOpacity: m.opacity, org, rig, emissive: lite ? (def.emissive ?? 0) * 0.7 : def.emissive ?? 0, rimBase };
  m.onBeforeCompile = (shader) => patchOrganic(shader, org);
  m.customProgramCacheKey = () => ORGANIC_KEY;
  return m;
}
function gbufferFor(m) {
  if (!m.userData.gbuf) {
    const g = makeGBufferMaterial(m.userData.rig);
    g.side = m.side;
    m.userData.gbuf = g;
  }
  m.userData.gbuf.side = m.side;
  return m.userData.gbuf;
}
function makePinMaterial(color) {
  return new MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.1, emissive: new Color(color), emissiveIntensity: 0.25 });
}
const __vite_glob_1_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ACCENT,
  FUNCTION_COLORS,
  KINDS,
  LM,
  LM_SLOTS,
  gbufferFor,
  kindOf,
  makePinMaterial,
  makeRigDepthMaterial,
  makeRigUniforms,
  makeTissueMaterial
}, Symbol.toStringTag, { value: "Module" }));
const LANDMARK_KINDS = ["process", "fossa", "line", "surface", "foramen", "part"];
const LANDMARK_COLORS = {
  process: "#ffa94d",
  // processes, tubercles, tuberosities, trochanters, condyles, epicondyles, heads, malleoli, spines
  fossa: "#9b8cff",
  // fossae, notches, impressions, sinuses
  line: "#ffe066",
  // lines, crests, borders, ridges, lips, grooves (sulci)
  surface: "#3ddcf0",
  // articular facets and surfaces, trochlea, capitulum, areas
  foramen: "#4ade80",
  // foramina, canals, apertures, foveae and small pits
  part: "#2f7bd6"
  // bodies, necks, rami, angles, bases of a bone
};
const LANDMARK_KIND_LABELS = {
  process: { la: "Processus, tubercula, capita", en: "Processes, tubercles, heads", id: "Prosesus, tuberkulum, kaput" },
  fossa: { la: "Fossae et incisurae", en: "Fossae and notches", id: "Fossa dan insisura" },
  line: { la: "Lineae, cristae, margines, sulci", en: "Lines, crests, borders, grooves", id: "Linea, krista, margo, sulkus" },
  surface: { la: "Facies et facies articulares", en: "Surfaces and articular facets", id: "Permukaan dan faset sendi" },
  foramen: { la: "Foramina et canales", en: "Foramina and canals", id: "Foramen dan kanalis" },
  part: { la: "Partes", en: "Parts such as bodies, necks and bases", id: "Bagian seperti korpus, kolum, dan basis" }
};
const LANDMARK_RADIUS = {
  process: [9e-3, 0.014],
  fossa: [0.012, 0.02],
  surface: [0.012, 0.02],
  line: [6e-3, 8e-3],
  foramen: [4e-3, 6e-3],
  part: [0.012, 0.02]
};
const RX = [
  ["foramen", /foram|canal|apertur|hiatus|porus|meatus|ostium|opening|fovea|foveol|\bpits?\b|orific/i],
  ["line", /\bline|linea|crest|crista|border|margo|margin|ridge|\blip\b|labium|groove|sulc|lineae|spiral|arcuate/i],
  ["surface", /facet|facies|surface|articular|trochlea|capitul|plateau|\barea\b|acetabul|lunate surface|circumferen/i],
  ["fossa", /fossa|notch|incisur|impress|depress|cavit|recess|sinus|hollow|concav|groove of|vallecul/i],
  ["process", /process|tubercl|tubercul|tuberos|trochanter|condyl|epicondyl|\bhead\b|caput|capitis|malleol|spine\b|spina|spinous|protuber|eminen|apex|hamul|hook|styloid|coracoid|acromi|olecran|horn|cornu|promin|sustentacul|tuber\b|dens\b/i],
  ["part", /body|corpus|neck|collum|shaft|ramus|\bala\b|wing|angle|angul|base\b|basis/i]
];
function landmarkKind(name) {
  for (const [k, re] of RX) if (re.test(name)) return k;
  return "part";
}
function landmarkRadius(kind, boneRadius) {
  const [a, b] = LANDMARK_RADIUS[kind];
  const t = Math.max(0, Math.min(1, (boneRadius - 0.012) / 0.2));
  return a + (b - a) * t;
}
const __vite_glob_1_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LANDMARK_COLORS,
  LANDMARK_KINDS,
  LANDMARK_KIND_LABELS,
  LANDMARK_RADIUS,
  landmarkKind,
  landmarkRadius
}, Symbol.toStringTag, { value: "Module" }));
const LAYERS = [
  { id: "skeleton", pack: "skeleton", la: "Ossa", en: "Bones", idn: "Tulang", swatch: "#e4d7bd" },
  { id: "joints", pack: "joints", la: "Juncturae", en: "Joints and ligaments", idn: "Sendi dan ligamen", swatch: "#ddd6c4" },
  { id: "muscles", pack: "muscles", la: "Musculi", en: "Muscles and tendons", idn: "Otot dan tendo", swatch: "#9a2f2a" },
  { id: "fasciae", pack: "muscles", la: "Fasciae et bursae", en: "Fasciae, bursae, sheaths", idn: "Fascia, bursa, selubung", swatch: "#ece8de" },
  { id: "heart", pack: "vessels", la: "Cor", en: "Heart", idn: "Jantung", swatch: "#9a3430" },
  { id: "arteries", pack: "vessels", la: "Arteriae", en: "Arteries", idn: "Arteri", swatch: "#b3232e" },
  { id: "veins", pack: "vessels", la: "Venae", en: "Veins", idn: "Vena", swatch: "#2e4f9c" },
  { id: "nerves", pack: "nerves", la: "Nervi", en: "Nerves", idn: "Saraf", swatch: "#efcf68" },
  { id: "respiratory", pack: "viscera", la: "Systema respiratorium", en: "Airways and lungs", idn: "Saluran napas dan paru", swatch: "#d8a3a1" },
  { id: "organs", pack: "viscera", la: "Viscera", en: "Other organs", idn: "Organ lain", swatch: "#b9715f" },
  { id: "lymphoid", pack: "lymphoid", la: "Organa lymphoidea", en: "Lymphoid organs", idn: "Organ limfoid", swatch: "#98bd4a" },
  { id: "skin", pack: "skin", la: "Regiones corporis", en: "Skin and regions", idn: "Kulit dan regio", swatch: "#d6a385" }
];
const RESP = /bronch|lung|pleura|trache|laryn|pharyn|nasal|epiglott|soft palate|uvula|nasopharynx|oropharynx|laryngopharynx/i;
function layerOf(s) {
  switch (s.pack) {
    case "skeleton":
      return "skeleton";
    case "joints":
      return "joints";
    case "attachments":
      return "attachments";
    case "muscles":
      if (s.mats.includes("muscle")) return "muscles";
      if (s.mats.length === 1 && s.mats[0] === "tendon") return "muscles";
      return "fasciae";
    case "vessels": {
      const inHeart = s.path.some((p) => /^Heart$|Valves of heart|Chambers|heart/i.test(p)) || s.mats.includes("myocardium");
      if (inHeart && !s.mats.includes("artery") && !s.mats.includes("vein")) return "heart";
      if (s.mats.includes("vein") || s.mats.includes("pulmonary_vein")) return "veins";
      return "arteries";
    }
    case "nerves":
      return "nerves";
    case "viscera":
      return RESP.test(s.en) || s.path.some((p) => /respiratory|lung|bronch/i.test(p)) ? "respiratory" : "organs";
    case "lymphoid":
      return "lymphoid";
    case "skin":
      return "skin";
  }
}
const REGIONS = [
  { id: "body", en: "Whole body", idn: "Seluruh tubuh", layers: ["skeleton"] },
  { id: "upper-limb", en: "Upper limb", idn: "Ekstremitas atas", layers: ["skeleton", "muscles"], path: /upper limb|pectoral girdle/i, bones: /(clavicle|scapula|humerus|radius|ulna|metacarpal-bone|of-hand|scaphoid-bone|lunate-bone|triquetrum-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone)-r$/, pad: 0.05, side: "r" },
  { id: "shoulder", en: "Shoulder", idn: "Bahu", layers: ["skeleton", "joints"], bones: /^(clavicle|scapula)-r$/, pad: 0.06, side: "r" },
  { id: "arm", en: "Arm and elbow", idn: "Lengan atas dan siku", layers: ["skeleton", "muscles"], bones: /^humerus-r$/, pad: 0.05, side: "r" },
  { id: "forearm-hand", en: "Forearm", idn: "Lengan bawah", layers: ["skeleton", "muscles"], bones: /^(radius|ulna)-r$/, pad: 0.05, side: "r" },
  { id: "hand", en: "Hand and wrist", idn: "Tangan dan pergelangan", layers: ["skeleton", "joints"], bones: /(metacarpal-bone|of-hand|scaphoid-bone|lunate-bone|triquetrum-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone)-r$/, pad: 0.025, side: "r" },
  { id: "lower-limb", en: "Lower limb", idn: "Ekstremitas bawah", layers: ["skeleton", "muscles"], path: /lower limb|pelvic girdle/i, bones: /(hip-bone|femur|patella|tibia|fibula|talus|calcaneus|navicular-bone|cuboid-bone|cuneiform-bone|metatarsal-bone|of-foot)-r$/, pad: 0.05, side: "r" },
  { id: "hip", en: "Hip and pelvis", idn: "Panggul", layers: ["skeleton", "joints"], bones: /^(hip-bone-r|hip-bone-l|sacrum|coccyx)$/, pad: 0.04, side: null },
  { id: "knee", en: "Knee", idn: "Lutut", layers: ["skeleton", "joints"], bones: /^patella-r$/, pad: 0.09, side: "r" },
  { id: "leg-foot", en: "Leg", idn: "Tungkai bawah", layers: ["skeleton", "muscles"], bones: /^(tibia|fibula)-r$/, pad: 0.05, side: "r" },
  { id: "foot", en: "Ankle and foot", idn: "Pergelangan kaki dan kaki", layers: ["skeleton", "joints"], bones: /(talus|calcaneus|navicular-bone|cuboid-bone|cuneiform-bone|metatarsal-bone|of-foot)-r$/, pad: 0.03, side: "r" },
  { id: "thorax", en: "Thorax", idn: "Toraks", layers: ["skeleton", "muscles"], bones: /(rib-[lr]|costal-cartilage|sternum|xiphoid-process|vertebra-t\d+)/, pad: 0.02, side: null },
  { id: "heart", en: "Heart", idn: "Jantung", layers: ["heart", "arteries", "veins"], pad: 0.03, side: null },
  { id: "larynx", en: "Larynx", idn: "Laring", layers: ["skeleton", "joints", "muscles"], bones: /^(thyroid-cartilage|cricoid-cartilage|arytenoid-cartilage-[lr]|corniculate-cartilage-[lr]|hyoid-bone)$/, pad: 0.015, side: null },
  { id: "head-neck", en: "Head and neck", idn: "Kepala dan leher", layers: ["skeleton"], bones: /^(frontal-bone|occipital-bone|mandible|sphenoid-bone|parietal-bone-[lr]|temporal-bone-[lr]|maxilla-[lr]|zygomatic-bone-[lr]|vertebra-c\d|atlas-c1|axis-c2|hyoid-bone)$/, pad: 0.03, side: null }
];
const __vite_glob_1_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LAYERS,
  REGIONS,
  layerOf
}, Symbol.toStringTag, { value: "Module" }));
class Pass {
  /**
   * Constructs a new pass.
   */
  constructor() {
    this.isPass = true;
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;
    this.renderToScreen = false;
  }
  /**
   * Sets the size of the pass.
   *
   * @abstract
   * @param {number} width - The width to set.
   * @param {number} height - The width to set.
   */
  setSize() {
  }
  /**
   * This method holds the render logic of a pass. It must be implemented in all derived classes.
   *
   * @abstract
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   *
   * @abstract
   */
  dispose() {
  }
}
const _camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
class FullscreenTriangleGeometry extends BufferGeometry {
  constructor() {
    super();
    this.setAttribute("position", new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
    this.setAttribute("uv", new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
  }
}
const _geometry = new FullscreenTriangleGeometry();
class FullScreenQuad {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(material) {
    this._mesh = new Mesh(_geometry, material);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the instance is no longer used in your app.
   */
  dispose() {
    this._mesh.geometry.dispose();
  }
  /**
   * Renders the full screen quad.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  render(renderer) {
    renderer.render(this._mesh, _camera);
  }
  /**
   * The quad's material.
   *
   * @type {?Material}
   */
  get material() {
    return this._mesh.material;
  }
  set material(value) {
    this._mesh.material = value;
  }
}
const GTAOShader = {
  defines: {
    PERSPECTIVE_CAMERA: 1,
    SAMPLES: 16,
    NORMAL_VECTOR_TYPE: 1,
    DEPTH_SWIZZLING: "x",
    SCREEN_SPACE_RADIUS: 0,
    SCREEN_SPACE_RADIUS_SCALE: 100,
    SCENE_CLIP_BOX: 0
  },
  uniforms: {
    tNormal: { value: null },
    tDepth: { value: null },
    tNoise: { value: null },
    resolution: { value: new Vector2() },
    cameraNear: { value: null },
    cameraFar: { value: null },
    cameraProjectionMatrix: { value: new Matrix4() },
    cameraProjectionMatrixInverse: { value: new Matrix4() },
    cameraWorldMatrix: { value: new Matrix4() },
    radius: { value: 0.25 },
    distanceExponent: { value: 1 },
    thickness: { value: 1 },
    distanceFallOff: { value: 1 },
    scale: { value: 1 },
    sceneBoxMin: { value: new Vector3(-1, -1, -1) },
    sceneBoxMax: { value: new Vector3(1, 1, 1) }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`
  ),
  fragmentShader: (
    /* glsl */
    `
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`
  )
};
const GTAODepthShader = {
  defines: {
    PERSPECTIVE_CAMERA: 1
  },
  uniforms: {
    tDepth: { value: null },
    cameraNear: { value: null },
    cameraFar: { value: null }
  },
  vertexShader: (
    /* glsl */
    `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`
  ),
  fragmentShader: (
    /* glsl */
    `
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`
  )
};
const GTAOBlendShader = {
  uniforms: {
    tDiffuse: { value: null },
    intensity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`
  ),
  fragmentShader: (
    /* glsl */
    `
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`
  )
};
function generateMagicSquareNoise(size = 5) {
  const noiseSize = Math.floor(size) % 2 === 0 ? Math.floor(size) + 1 : Math.floor(size);
  const magicSquare = generateMagicSquare(noiseSize);
  const noiseSquareSize = magicSquare.length;
  const data = new Uint8Array(noiseSquareSize * 4);
  for (let inx = 0; inx < noiseSquareSize; ++inx) {
    const iAng = magicSquare[inx];
    const angle = 2 * Math.PI * iAng / noiseSquareSize;
    const randomVec = new Vector3(
      Math.cos(angle),
      Math.sin(angle),
      0
    ).normalize();
    data[inx * 4] = (randomVec.x * 0.5 + 0.5) * 255;
    data[inx * 4 + 1] = (randomVec.y * 0.5 + 0.5) * 255;
    data[inx * 4 + 2] = 127;
    data[inx * 4 + 3] = 255;
  }
  const noiseTexture = new DataTexture(data, noiseSize, noiseSize);
  noiseTexture.wrapS = RepeatWrapping;
  noiseTexture.wrapT = RepeatWrapping;
  noiseTexture.needsUpdate = true;
  return noiseTexture;
}
function generateMagicSquare(size) {
  const noiseSize = Math.floor(size) % 2 === 0 ? Math.floor(size) + 1 : Math.floor(size);
  const noiseSquareSize = noiseSize * noiseSize;
  const magicSquare = Array(noiseSquareSize).fill(0);
  let i = Math.floor(noiseSize / 2);
  let j = noiseSize - 1;
  for (let num = 1; num <= noiseSquareSize; ) {
    if (i === -1 && j === noiseSize) {
      j = noiseSize - 2;
      i = 0;
    } else {
      if (j === noiseSize) {
        j = 0;
      }
      if (i < 0) {
        i = noiseSize - 1;
      }
    }
    if (magicSquare[i * noiseSize + j] !== 0) {
      j -= 2;
      i++;
      continue;
    } else {
      magicSquare[i * noiseSize + j] = num++;
    }
    j++;
    i--;
  }
  return magicSquare;
}
const PoissonDenoiseShader = {
  defines: {
    "SAMPLES": 16,
    "SAMPLE_VECTORS": generatePdSamplePointInitializer(16, 2, 1),
    "NORMAL_VECTOR_TYPE": 1,
    "DEPTH_VALUE_SOURCE": 0
  },
  uniforms: {
    "tDiffuse": { value: null },
    "tNormal": { value: null },
    "tDepth": { value: null },
    "tNoise": { value: null },
    "resolution": { value: new Vector2() },
    "cameraProjectionMatrixInverse": { value: new Matrix4() },
    "lumaPhi": { value: 5 },
    "depthPhi": { value: 5 },
    "normalPhi": { value: 5 },
    "radius": { value: 4 },
    "index": { value: 0 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`
  )
};
function generatePdSamplePointInitializer(samples, rings, radiusExponent) {
  const poissonDisk = generateDenoiseSamples(
    samples,
    rings,
    radiusExponent
  );
  let glslCode = "vec3[SAMPLES](";
  for (let i = 0; i < samples; i++) {
    const sample = poissonDisk[i];
    glslCode += `vec3(${sample.x}, ${sample.y}, ${sample.z})${i < samples - 1 ? "," : ")"}`;
  }
  return glslCode;
}
function generateDenoiseSamples(numSamples, numRings, radiusExponent) {
  const samples = [];
  for (let i = 0; i < numSamples; i++) {
    const angle = 2 * Math.PI * numRings * i / numSamples;
    const radius = Math.pow(i / (numSamples - 1), radiusExponent);
    samples.push(new Vector3(Math.cos(angle), Math.sin(angle), radius));
  }
  return samples;
}
const CopyShader = {
  uniforms: {
    "tDiffuse": { value: null },
    "opacity": { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class SimplexNoise {
  /**
   * Constructs a new simplex noise object.
   *
   * @param {Object} [r=Math] - A math utility class that holds a `random()` method. This makes it
   * possible to pass in custom random number generator.
   */
  constructor(r = Math) {
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1]
    ];
    this.grad4 = [
      [0, 1, 1, 1],
      [0, 1, 1, -1],
      [0, 1, -1, 1],
      [0, 1, -1, -1],
      [0, -1, 1, 1],
      [0, -1, 1, -1],
      [0, -1, -1, 1],
      [0, -1, -1, -1],
      [1, 0, 1, 1],
      [1, 0, 1, -1],
      [1, 0, -1, 1],
      [1, 0, -1, -1],
      [-1, 0, 1, 1],
      [-1, 0, 1, -1],
      [-1, 0, -1, 1],
      [-1, 0, -1, -1],
      [1, 1, 0, 1],
      [1, 1, 0, -1],
      [1, -1, 0, 1],
      [1, -1, 0, -1],
      [-1, 1, 0, 1],
      [-1, 1, 0, -1],
      [-1, -1, 0, 1],
      [-1, -1, 0, -1],
      [1, 1, 1, 0],
      [1, 1, -1, 0],
      [1, -1, 1, 0],
      [1, -1, -1, 0],
      [-1, 1, 1, 0],
      [-1, 1, -1, 0],
      [-1, -1, 1, 0],
      [-1, -1, -1, 0]
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(r.random() * 256);
    }
    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
    this.simplex = [
      [0, 1, 2, 3],
      [0, 1, 3, 2],
      [0, 0, 0, 0],
      [0, 2, 3, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 3, 0],
      [0, 2, 1, 3],
      [0, 0, 0, 0],
      [0, 3, 1, 2],
      [0, 3, 2, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 3, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 0, 3],
      [0, 0, 0, 0],
      [1, 3, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 3, 0, 1],
      [2, 3, 1, 0],
      [1, 0, 2, 3],
      [1, 0, 3, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 3, 1],
      [0, 0, 0, 0],
      [2, 1, 3, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 1, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 0, 1, 2],
      [3, 0, 2, 1],
      [0, 0, 0, 0],
      [3, 1, 2, 0],
      [2, 1, 0, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 1, 0, 2],
      [0, 0, 0, 0],
      [3, 2, 0, 1],
      [3, 2, 1, 0]
    ];
  }
  /**
   * A 2D simplex noise method.
   *
   * @param {number} xin - The x coordinate.
   * @param {number} yin - The y coordinate.
   * @return {number} The noise value.
   */
  noise(xin, yin) {
    let n0;
    let n1;
    let n2;
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    let i1;
    let j1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.perm[ii + this.perm[jj]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
    const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) n0 = 0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this._dot(this.grad3[gi0], x0, y0);
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) n1 = 0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this._dot(this.grad3[gi1], x1, y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) n2 = 0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this._dot(this.grad3[gi2], x2, y2);
    }
    return 70 * (n0 + n1 + n2);
  }
  /**
   * A 3D simplex noise method.
   *
   * @param {number} xin - The x coordinate.
   * @param {number} yin - The y coordinate.
   * @param {number} zin - The z coordinate.
   * @return {number} The noise value.
   */
  noise3d(xin, yin, zin) {
    let n0;
    let n1;
    let n2;
    let n3;
    const F3 = 1 / 3;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const G3 = 1 / 6;
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;
    let i1;
    let j1;
    let k1;
    let i2;
    let j2;
    let k2;
    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    }
    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this._dot3(this.grad3[gi0], x0, y0, z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this._dot3(this.grad3[gi1], x1, y1, z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this._dot3(this.grad3[gi2], x2, y2, z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0;
    else {
      t3 *= t3;
      n3 = t3 * t3 * this._dot3(this.grad3[gi3], x3, y3, z3);
    }
    return 32 * (n0 + n1 + n2 + n3);
  }
  /**
   * A 4D simplex noise method.
   *
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @param {number} z - The z coordinate.
   * @param {number} w - The w coordinate.
   * @return {number} The noise value.
   */
  noise4d(x, y, z, w) {
    const grad4 = this.grad4;
    const simplex = this.simplex;
    const perm = this.perm;
    const F4 = (Math.sqrt(5) - 1) / 4;
    const G4 = (5 - Math.sqrt(5)) / 20;
    let n0;
    let n1;
    let n2;
    let n3;
    let n4;
    const s = (x + y + z + w) * F4;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const l = Math.floor(w + s);
    const t = (i + j + k + l) * G4;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const W0 = l - t;
    const x0 = x - X0;
    const y0 = y - Y0;
    const z0 = z - Z0;
    const w0 = w - W0;
    const c1 = x0 > y0 ? 32 : 0;
    const c2 = x0 > z0 ? 16 : 0;
    const c3 = y0 > z0 ? 8 : 0;
    const c4 = x0 > w0 ? 4 : 0;
    const c5 = y0 > w0 ? 2 : 0;
    const c6 = z0 > w0 ? 1 : 0;
    const c = c1 + c2 + c3 + c4 + c5 + c6;
    const i1 = simplex[c][0] >= 3 ? 1 : 0;
    const j1 = simplex[c][1] >= 3 ? 1 : 0;
    const k1 = simplex[c][2] >= 3 ? 1 : 0;
    const l1 = simplex[c][3] >= 3 ? 1 : 0;
    const i2 = simplex[c][0] >= 2 ? 1 : 0;
    const j2 = simplex[c][1] >= 2 ? 1 : 0;
    const k2 = simplex[c][2] >= 2 ? 1 : 0;
    const l2 = simplex[c][3] >= 2 ? 1 : 0;
    const i3 = simplex[c][0] >= 1 ? 1 : 0;
    const j3 = simplex[c][1] >= 1 ? 1 : 0;
    const k3 = simplex[c][2] >= 1 ? 1 : 0;
    const l3 = simplex[c][3] >= 1 ? 1 : 0;
    const x1 = x0 - i1 + G4;
    const y1 = y0 - j1 + G4;
    const z1 = z0 - k1 + G4;
    const w1 = w0 - l1 + G4;
    const x2 = x0 - i2 + 2 * G4;
    const y2 = y0 - j2 + 2 * G4;
    const z2 = z0 - k2 + 2 * G4;
    const w2 = w0 - l2 + 2 * G4;
    const x3 = x0 - i3 + 3 * G4;
    const y3 = y0 - j3 + 3 * G4;
    const z3 = z0 - k3 + 3 * G4;
    const w3 = w0 - l3 + 3 * G4;
    const x4 = x0 - 1 + 4 * G4;
    const y4 = y0 - 1 + 4 * G4;
    const z4 = z0 - 1 + 4 * G4;
    const w4 = w0 - 1 + 4 * G4;
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const ll = l & 255;
    const gi0 = perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32;
    const gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32;
    const gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32;
    const gi3 = perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32;
    const gi4 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
    if (t0 < 0) n0 = 0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this._dot4(grad4[gi0], x0, y0, z0, w0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
    if (t1 < 0) n1 = 0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this._dot4(grad4[gi1], x1, y1, z1, w1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
    if (t2 < 0) n2 = 0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this._dot4(grad4[gi2], x2, y2, z2, w2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
    if (t3 < 0) n3 = 0;
    else {
      t3 *= t3;
      n3 = t3 * t3 * this._dot4(grad4[gi3], x3, y3, z3, w3);
    }
    let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
    if (t4 < 0) n4 = 0;
    else {
      t4 *= t4;
      n4 = t4 * t4 * this._dot4(grad4[gi4], x4, y4, z4, w4);
    }
    return 27 * (n0 + n1 + n2 + n3 + n4);
  }
  // private
  _dot(g, x, y) {
    return g[0] * x + g[1] * y;
  }
  _dot3(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }
  _dot4(g, x, y, z, w) {
    return g[0] * x + g[1] * y + g[2] * z + g[3] * w;
  }
}
class GTAOPass extends Pass {
  /**
   * Constructs a new GTAO pass.
   *
   * @param {Scene} scene - The scene to compute the AO for.
   * @param {Camera} camera - The camera.
   * @param {number} [width=512] - The width of the effect.
   * @param {number} [height=512] - The height of the effect.
   * @param {Object} [parameters] - The pass parameters.
   * @param {Object} [aoParameters] - The AO parameters.
   * @param {Object} [pdParameters] - The denoise parameters.
   */
  constructor(scene, camera, width = 512, height = 512, parameters, aoParameters, pdParameters) {
    super();
    this.width = width;
    this.height = height;
    this.clear = true;
    this.camera = camera;
    this.scene = scene;
    this.output = 0;
    this._renderGBuffer = true;
    this._visibilityCache = /* @__PURE__ */ new Map();
    this.blendIntensity = 1;
    this.pdRings = 2;
    this.pdRadiusExponent = 2;
    this.pdSamples = 16;
    this.gtaoNoiseTexture = generateMagicSquareNoise();
    this.pdNoiseTexture = this._generateNoise();
    this.gtaoRenderTarget = new WebGLRenderTarget(this.width, this.height, { type: HalfFloatType });
    this.pdRenderTarget = this.gtaoRenderTarget.clone();
    this.gtaoMaterial = new ShaderMaterial({
      defines: Object.assign({}, GTAOShader.defines),
      uniforms: UniformsUtils.clone(GTAOShader.uniforms),
      vertexShader: GTAOShader.vertexShader,
      fragmentShader: GTAOShader.fragmentShader,
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
    this.gtaoMaterial.defines.PERSPECTIVE_CAMERA = this.camera.isPerspectiveCamera ? 1 : 0;
    this.gtaoMaterial.uniforms.tNoise.value = this.gtaoNoiseTexture;
    this.gtaoMaterial.uniforms.resolution.value.set(this.width, this.height);
    this.gtaoMaterial.uniforms.cameraNear.value = this.camera.near;
    this.gtaoMaterial.uniforms.cameraFar.value = this.camera.far;
    this.normalMaterial = new MeshNormalMaterial();
    this.normalMaterial.blending = NoBlending;
    this.pdMaterial = new ShaderMaterial({
      defines: Object.assign({}, PoissonDenoiseShader.defines),
      uniforms: UniformsUtils.clone(PoissonDenoiseShader.uniforms),
      vertexShader: PoissonDenoiseShader.vertexShader,
      fragmentShader: PoissonDenoiseShader.fragmentShader,
      depthTest: false,
      depthWrite: false
    });
    this.pdMaterial.uniforms.tDiffuse.value = this.gtaoRenderTarget.texture;
    this.pdMaterial.uniforms.tNoise.value = this.pdNoiseTexture;
    this.pdMaterial.uniforms.resolution.value.set(this.width, this.height);
    this.pdMaterial.uniforms.lumaPhi.value = 10;
    this.pdMaterial.uniforms.depthPhi.value = 2;
    this.pdMaterial.uniforms.normalPhi.value = 3;
    this.pdMaterial.uniforms.radius.value = 8;
    this.depthRenderMaterial = new ShaderMaterial({
      defines: Object.assign({}, GTAODepthShader.defines),
      uniforms: UniformsUtils.clone(GTAODepthShader.uniforms),
      vertexShader: GTAODepthShader.vertexShader,
      fragmentShader: GTAODepthShader.fragmentShader,
      blending: NoBlending
    });
    this.depthRenderMaterial.uniforms.cameraNear.value = this.camera.near;
    this.depthRenderMaterial.uniforms.cameraFar.value = this.camera.far;
    this.copyMaterial = new ShaderMaterial({
      uniforms: UniformsUtils.clone(CopyShader.uniforms),
      vertexShader: CopyShader.vertexShader,
      fragmentShader: CopyShader.fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blendSrc: DstColorFactor,
      blendDst: ZeroFactor,
      blendEquation: AddEquation,
      blendSrcAlpha: DstAlphaFactor,
      blendDstAlpha: ZeroFactor,
      blendEquationAlpha: AddEquation
    });
    this.blendMaterial = new ShaderMaterial({
      uniforms: UniformsUtils.clone(GTAOBlendShader.uniforms),
      vertexShader: GTAOBlendShader.vertexShader,
      fragmentShader: GTAOBlendShader.fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: CustomBlending,
      blendSrc: DstColorFactor,
      blendDst: ZeroFactor,
      blendEquation: AddEquation,
      blendSrcAlpha: DstAlphaFactor,
      blendDstAlpha: ZeroFactor,
      blendEquationAlpha: AddEquation
    });
    this._fsQuad = new FullScreenQuad(null);
    this._originalClearColor = new Color();
    this.setGBuffer(parameters ? parameters.depthTexture : void 0, parameters ? parameters.normalTexture : void 0);
    if (aoParameters !== void 0) {
      this.updateGtaoMaterial(aoParameters);
    }
    if (pdParameters !== void 0) {
      this.updatePdMaterial(pdParameters);
    }
  }
  /**
   * Sets the size of the pass.
   *
   * @param {number} width - The width to set.
   * @param {number} height - The width to set.
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.gtaoRenderTarget.setSize(width, height);
    this.normalRenderTarget.setSize(width, height);
    this.pdRenderTarget.setSize(width, height);
    this.gtaoMaterial.uniforms.resolution.value.set(width, height);
    this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix);
    this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse);
    this.pdMaterial.uniforms.resolution.value.set(width, height);
    this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   */
  dispose() {
    this.gtaoNoiseTexture.dispose();
    this.pdNoiseTexture.dispose();
    this.normalRenderTarget.dispose();
    this.gtaoRenderTarget.dispose();
    this.pdRenderTarget.dispose();
    this.normalMaterial.dispose();
    this.pdMaterial.dispose();
    this.copyMaterial.dispose();
    this.depthRenderMaterial.dispose();
    this._fsQuad.dispose();
  }
  /**
   * A texture holding the computed AO.
   *
   * @type {Texture}
   * @readonly
   */
  get gtaoMap() {
    return this.pdRenderTarget.texture;
  }
  /**
   * Configures the GBuffer of this pass. If no arguments are passed,
   * the pass creates an internal render target for holding depth
   * and normal data.
   *
   * @param {DepthTexture} [depthTexture] - The depth texture.
   * @param {DepthTexture} [normalTexture] - The normal texture.
   */
  setGBuffer(depthTexture, normalTexture) {
    if (depthTexture !== void 0) {
      this.depthTexture = depthTexture;
      this.normalTexture = normalTexture;
      this._renderGBuffer = false;
    } else {
      this.depthTexture = new DepthTexture();
      this.depthTexture.format = DepthStencilFormat;
      this.depthTexture.type = UnsignedInt248Type;
      this.normalRenderTarget = new WebGLRenderTarget(this.width, this.height, {
        minFilter: NearestFilter,
        magFilter: NearestFilter,
        type: HalfFloatType,
        depthTexture: this.depthTexture
      });
      this.normalTexture = this.normalRenderTarget.texture;
      this._renderGBuffer = true;
    }
    const normalVectorType = this.normalTexture ? 1 : 0;
    const depthValueSource = this.depthTexture === this.normalTexture ? "w" : "x";
    this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE = normalVectorType;
    this.gtaoMaterial.defines.DEPTH_SWIZZLING = depthValueSource;
    this.gtaoMaterial.uniforms.tNormal.value = this.normalTexture;
    this.gtaoMaterial.uniforms.tDepth.value = this.depthTexture;
    this.pdMaterial.defines.NORMAL_VECTOR_TYPE = normalVectorType;
    this.pdMaterial.defines.DEPTH_SWIZZLING = depthValueSource;
    this.pdMaterial.uniforms.tNormal.value = this.normalTexture;
    this.pdMaterial.uniforms.tDepth.value = this.depthTexture;
    this.depthRenderMaterial.uniforms.tDepth.value = this.normalRenderTarget.depthTexture;
  }
  /**
   * Configures the clip box of the GTAO shader with the given AABB.
   *
   * @param {?Box3} box - The AABB enclosing the scene that should receive AO. When passing
   * `null`, to clip box is used.
   */
  setSceneClipBox(box) {
    if (box) {
      this.gtaoMaterial.needsUpdate = this.gtaoMaterial.defines.SCENE_CLIP_BOX !== 1;
      this.gtaoMaterial.defines.SCENE_CLIP_BOX = 1;
      this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(box.min);
      this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(box.max);
    } else {
      this.gtaoMaterial.needsUpdate = this.gtaoMaterial.defines.SCENE_CLIP_BOX === 0;
      this.gtaoMaterial.defines.SCENE_CLIP_BOX = 0;
    }
  }
  /**
   * Updates the GTAO material from the given parameter object.
   *
   * @param {Object} parameters - The GTAO material parameters.
   */
  updateGtaoMaterial(parameters) {
    if (parameters.radius !== void 0) {
      this.gtaoMaterial.uniforms.radius.value = parameters.radius;
    }
    if (parameters.distanceExponent !== void 0) {
      this.gtaoMaterial.uniforms.distanceExponent.value = parameters.distanceExponent;
    }
    if (parameters.thickness !== void 0) {
      this.gtaoMaterial.uniforms.thickness.value = parameters.thickness;
    }
    if (parameters.distanceFallOff !== void 0) {
      this.gtaoMaterial.uniforms.distanceFallOff.value = parameters.distanceFallOff;
      this.gtaoMaterial.needsUpdate = true;
    }
    if (parameters.scale !== void 0) {
      this.gtaoMaterial.uniforms.scale.value = parameters.scale;
    }
    if (parameters.samples !== void 0 && parameters.samples !== this.gtaoMaterial.defines.SAMPLES) {
      this.gtaoMaterial.defines.SAMPLES = parameters.samples;
      this.gtaoMaterial.needsUpdate = true;
    }
    if (parameters.screenSpaceRadius !== void 0 && (parameters.screenSpaceRadius ? 1 : 0) !== this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS) {
      this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS = parameters.screenSpaceRadius ? 1 : 0;
      this.gtaoMaterial.needsUpdate = true;
    }
  }
  /**
   * Updates the Denoise material from the given parameter object.
   *
   * @param {Object} parameters - The denoise parameters.
   */
  updatePdMaterial(parameters) {
    let updateShader = false;
    if (parameters.lumaPhi !== void 0) {
      this.pdMaterial.uniforms.lumaPhi.value = parameters.lumaPhi;
    }
    if (parameters.depthPhi !== void 0) {
      this.pdMaterial.uniforms.depthPhi.value = parameters.depthPhi;
    }
    if (parameters.normalPhi !== void 0) {
      this.pdMaterial.uniforms.normalPhi.value = parameters.normalPhi;
    }
    if (parameters.radius !== void 0 && parameters.radius !== this.radius) {
      this.pdMaterial.uniforms.radius.value = parameters.radius;
    }
    if (parameters.radiusExponent !== void 0 && parameters.radiusExponent !== this.pdRadiusExponent) {
      this.pdRadiusExponent = parameters.radiusExponent;
      updateShader = true;
    }
    if (parameters.rings !== void 0 && parameters.rings !== this.pdRings) {
      this.pdRings = parameters.rings;
      updateShader = true;
    }
    if (parameters.samples !== void 0 && parameters.samples !== this.pdSamples) {
      this.pdSamples = parameters.samples;
      updateShader = true;
    }
    if (updateShader) {
      this.pdMaterial.defines.SAMPLES = this.pdSamples;
      this.pdMaterial.defines.SAMPLE_VECTORS = generatePdSamplePointInitializer(this.pdSamples, this.pdRings, this.pdRadiusExponent);
      this.pdMaterial.needsUpdate = true;
    }
  }
  /**
   * Performs the GTAO pass.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(renderer, writeBuffer, readBuffer) {
    if (this._renderGBuffer) {
      this._overrideVisibility();
      this._renderOverride(renderer, this.normalMaterial, this.normalRenderTarget, 7829503, 1);
      this._restoreVisibility();
    }
    this.gtaoMaterial.uniforms.cameraNear.value = this.camera.near;
    this.gtaoMaterial.uniforms.cameraFar.value = this.camera.far;
    this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix);
    this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse);
    this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld);
    this._renderPass(renderer, this.gtaoMaterial, this.gtaoRenderTarget, 16777215, 1);
    this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse);
    this._renderPass(renderer, this.pdMaterial, this.pdRenderTarget, 16777215, 1);
    switch (this.output) {
      case GTAOPass.OUTPUT.Off:
        break;
      case GTAOPass.OUTPUT.Diffuse:
        this.copyMaterial.uniforms.tDiffuse.value = readBuffer.texture;
        this.copyMaterial.blending = NoBlending;
        this._renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;
      case GTAOPass.OUTPUT.AO:
        this.copyMaterial.uniforms.tDiffuse.value = this.gtaoRenderTarget.texture;
        this.copyMaterial.blending = NoBlending;
        this._renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;
      case GTAOPass.OUTPUT.Denoise:
        this.copyMaterial.uniforms.tDiffuse.value = this.pdRenderTarget.texture;
        this.copyMaterial.blending = NoBlending;
        this._renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;
      case GTAOPass.OUTPUT.Depth:
        this.depthRenderMaterial.uniforms.cameraNear.value = this.camera.near;
        this.depthRenderMaterial.uniforms.cameraFar.value = this.camera.far;
        this._renderPass(renderer, this.depthRenderMaterial, this.renderToScreen ? null : writeBuffer);
        break;
      case GTAOPass.OUTPUT.Normal:
        this.copyMaterial.uniforms.tDiffuse.value = this.normalRenderTarget.texture;
        this.copyMaterial.blending = NoBlending;
        this._renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        break;
      case GTAOPass.OUTPUT.Default:
        this.copyMaterial.uniforms.tDiffuse.value = readBuffer.texture;
        this.copyMaterial.blending = NoBlending;
        this._renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
        this.blendMaterial.uniforms.intensity.value = this.blendIntensity;
        this.blendMaterial.uniforms.tDiffuse.value = this.pdRenderTarget.texture;
        this._renderPass(renderer, this.blendMaterial, this.renderToScreen ? null : writeBuffer);
        break;
      default:
        console.warn("THREE.GTAOPass: Unknown output type.");
    }
  }
  // internals
  _renderPass(renderer, passMaterial, renderTarget, clearColor, clearAlpha) {
    renderer.getClearColor(this._originalClearColor);
    const originalClearAlpha = renderer.getClearAlpha();
    const originalAutoClear = renderer.autoClear;
    renderer.setRenderTarget(renderTarget);
    renderer.autoClear = false;
    if (clearColor !== void 0 && clearColor !== null) {
      renderer.setClearColor(clearColor);
      renderer.setClearAlpha(clearAlpha || 0);
      renderer.clear();
    }
    this._fsQuad.material = passMaterial;
    this._fsQuad.render(renderer);
    renderer.autoClear = originalAutoClear;
    renderer.setClearColor(this._originalClearColor);
    renderer.setClearAlpha(originalClearAlpha);
  }
  _renderOverride(renderer, overrideMaterial, renderTarget, clearColor, clearAlpha) {
    renderer.getClearColor(this._originalClearColor);
    const originalClearAlpha = renderer.getClearAlpha();
    const originalAutoClear = renderer.autoClear;
    renderer.setRenderTarget(renderTarget);
    renderer.autoClear = false;
    clearColor = overrideMaterial.clearColor || clearColor;
    clearAlpha = overrideMaterial.clearAlpha || clearAlpha;
    if (clearColor !== void 0 && clearColor !== null) {
      renderer.setClearColor(clearColor);
      renderer.setClearAlpha(clearAlpha || 0);
      renderer.clear();
    }
    this.scene.overrideMaterial = overrideMaterial;
    renderer.render(this.scene, this.camera);
    this.scene.overrideMaterial = null;
    renderer.autoClear = originalAutoClear;
    renderer.setClearColor(this._originalClearColor);
    renderer.setClearAlpha(originalClearAlpha);
  }
  _overrideVisibility() {
    const scene = this.scene;
    const cache2 = this._visibilityCache;
    scene.traverse(function(object) {
      cache2.set(object, object.visible);
      if (object.isPoints || object.isLine) object.visible = false;
    });
  }
  _restoreVisibility() {
    const scene = this.scene;
    const cache2 = this._visibilityCache;
    scene.traverse(function(object) {
      const visible = cache2.get(object);
      object.visible = visible;
    });
    cache2.clear();
  }
  _generateNoise(size = 64) {
    const simplex = new SimplexNoise();
    const arraySize = size * size * 4;
    const data = new Uint8Array(arraySize);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x = i;
        const y = j;
        data[(i * size + j) * 4] = (simplex.noise(x, y) * 0.5 + 0.5) * 255;
        data[(i * size + j) * 4 + 1] = (simplex.noise(x + size, y) * 0.5 + 0.5) * 255;
        data[(i * size + j) * 4 + 2] = (simplex.noise(x, y + size) * 0.5 + 0.5) * 255;
        data[(i * size + j) * 4 + 3] = (simplex.noise(x + size, y + size) * 0.5 + 0.5) * 255;
      }
    }
    const noiseTexture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
    noiseTexture.wrapS = RepeatWrapping;
    noiseTexture.wrapT = RepeatWrapping;
    noiseTexture.needsUpdate = true;
    return noiseTexture;
  }
}
GTAOPass.OUTPUT = {
  "Off": -1,
  "Default": 0,
  "Diffuse": 1,
  "Depth": 2,
  "Normal": 3,
  "AO": 4,
  "Denoise": 5
};
const QUAD_VERT = (
  /* glsl */
  `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`
);
class PostChain {
  constructor(renderer, camera, scene, bg, samples) {
    this.renderer = renderer;
    this.camera = camera;
    this.bloomRT = [];
    this.quad = new FullScreenQuad();
    this.w = 1;
    this.h = 1;
    this.gw = 1;
    this.gh = 1;
    this.black = new DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    this.black.needsUpdate = true;
    this.sceneRT = new WebGLRenderTarget(1, 1, { type: HalfFloatType, samples, depthBuffer: true, stencilBuffer: false });
    this.sceneRT.texture.name = "raga.scene";
    const depth = new DepthTexture(1, 1, UnsignedIntType);
    this.gbuf = new WebGLRenderTarget(1, 1, { type: HalfFloatType, depthTexture: depth, minFilter: NearestFilter, magFilter: NearestFilter });
    this.gtao = new GTAOPass(scene, camera, 1, 1);
    this.gtao.setGBuffer(depth, this.gbuf.texture);
    this.gtao.output = GTAOPass.OUTPUT.Off;
    this.gtao.updateGtaoMaterial({ radius: 0.035, distanceExponent: 1.6, thickness: 0.012, distanceFallOff: 1, scale: 1.15, samples: 16 });
    this.gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 7, radiusExponent: 1.6, rings: 2, samples: 16 });
    for (let i = 0; i < 4; i++) this.bloomRT.push(new WebGLRenderTarget(1, 1, { type: HalfFloatType, depthBuffer: false }));
    this.extractMat = new ShaderMaterial({
      uniforms: { tScene: { value: null }, uScale: { value: 1 } },
      vertexShader: QUAD_VERT,
      fragmentShader: (
        /* glsl */
        `uniform sampler2D tScene; uniform float uScale; varying vec2 vUv;
        void main(){
          vec4 s = texture2D(tScene, vUv * uScale);
          float g = max(s.a - 1.0, 0.0);
          float cov = clamp(s.a, 0.0, 1.0);
          vec3 c = s.rgb / max(cov, 1e-3);
          gl_FragColor = vec4(min(c * g, vec3(6.0)), 1.0);
        }`
      ),
      depthTest: false,
      depthWrite: false
    });
    this.downMat = new ShaderMaterial({
      uniforms: { tSrc: { value: null }, uTexel: { value: new Vector2() } },
      vertexShader: QUAD_VERT,
      fragmentShader: (
        /* glsl */
        `uniform sampler2D tSrc; uniform vec2 uTexel; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
          c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
          c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
          c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
          c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
          gl_FragColor = vec4(c / 8.0, 1.0);
        }`
      ),
      depthTest: false,
      depthWrite: false
    });
    this.upMat = new ShaderMaterial({
      uniforms: { tSrc: { value: null }, uTexel: { value: new Vector2() } },
      vertexShader: QUAD_VERT,
      fragmentShader: (
        /* glsl */
        `uniform sampler2D tSrc; uniform vec2 uTexel; varying vec2 vUv;
        void main(){
          // wider levels add less, so the glow hugs the rim instead of hazing the whole specimen
          vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
          c += (texture2D(tSrc, vUv + vec2(uTexel.x, 0.0)).rgb + texture2D(tSrc, vUv - vec2(uTexel.x, 0.0)).rgb
              + texture2D(tSrc, vUv + vec2(0.0, uTexel.y)).rgb + texture2D(tSrc, vUv - vec2(0.0, uTexel.y)).rgb) * 2.0;
          c += texture2D(tSrc, vUv + uTexel).rgb + texture2D(tSrc, vUv - uTexel).rgb
             + texture2D(tSrc, vUv + vec2(uTexel.x, -uTexel.y)).rgb + texture2D(tSrc, vUv + vec2(-uTexel.x, uTexel.y)).rgb;
          gl_FragColor = vec4(c / 16.0 * 0.55, 1.0);
        }`
      ),
      blending: AdditiveBlending,
      depthTest: false,
      depthWrite: false
    });
    this.compMat = new ShaderMaterial({
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
        uRes: { value: new Vector2(1, 1) },
        uBgRect: { value: new Vector4(1, 1, 0, 0) },
        uFocusZ: { value: 1 },
        uFocusRange: { value: 0.05 },
        uMaxCoc: { value: 4 },
        uNear: { value: 0.01 },
        uFar: { value: 30 },
        uNeutral: { value: 1 },
        toneMappingExposure: { value: 1 }
      },
      vertexShader: QUAD_VERT,
      fragmentShader: (
        /* glsl */
        `
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
        }`
      ),
      depthTest: false,
      depthWrite: false,
      toneMapped: false
      // tone mapping is done here, not by the program prefix
    });
  }
  setSize(w, h, aoScale) {
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
  setBackgroundRect(r) {
    this.compMat.uniforms.uBgRect.value.copy(r);
  }
  setToneMapping(neutral, exposure) {
    this.compMat.uniforms.uNeutral.value = neutral ? 1 : 0;
    this.compMat.uniforms.toneMappingExposure.value = exposure;
  }
  /** Bind the G-buffer target; the engine then draws the opaque tissue with the G-buffer materials. */
  beginGBuffer() {
    const r = this.renderer;
    r.setRenderTarget(this.gbuf);
    r.setClearColor(8421631, 1);
    r.clear(true, true, false);
  }
  runAO(radius) {
    this.gtao.gtaoMaterial.uniforms.radius.value = radius;
    this.gtao.render(this.renderer, null, null, 0, false);
  }
  /** Bind the scene target at `scale` of full resolution. */
  beginScene(scale) {
    const r = this.renderer;
    const sw = Math.max(1, Math.round(this.w * scale)), sh = Math.max(1, Math.round(this.h * scale));
    this.sceneRT.viewport.set(0, 0, sw, sh);
    this.sceneRT.scissor.set(0, 0, sw, sh);
    this.sceneRT.scissorTest = scale < 0.999;
    r.setRenderTarget(this.sceneRT);
    r.setClearColor(0, 0);
    r.clear(true, true, false);
  }
  finish(o) {
    const r = this.renderer;
    const scale = Math.min(1, o.scale);
    const effScale = Math.round(this.w * scale) / this.w;
    let bloomTex = this.black;
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
  pass(mat, target, clear = true) {
    const r = this.renderer;
    r.setRenderTarget(target);
    if (clear) {
      r.setClearColor(0, 0);
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
const __vite_glob_1_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PostChain
}, Symbol.toStringTag, { value: "Module" }));
function makeMicrographCanvas(w = 1600, h = 1e3) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const g = cv.getContext("2d");
  let seed = 20261108;
  const rnd = () => {
    seed = seed * 1664525 + 1013904223 >>> 0;
    return seed / 4294967296;
  };
  g.fillStyle = "#0f0c24";
  g.fillRect(0, 0, w, h);
  const blob2 = (x, y, r, color, a) => {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, color.replace("A", String(a)));
    gr.addColorStop(0.55, color.replace("A", String(a * 0.45)));
    gr.addColorStop(1, color.replace("A", "0"));
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  };
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 26; i++) blob2(rnd() * w, rnd() * h, 160 + rnd() * 360, "rgba(255,93,143,A)", 0.035 + rnd() * 0.05);
  for (let i = 0; i < 14; i++) blob2(rnd() * w, rnd() * h, 140 + rnd() * 300, "rgba(150,40,110,A)", 0.04 + rnd() * 0.05);
  for (let i = 0; i < 18; i++) blob2(rnd() * w, rnd() * h, 120 + rnd() * 260, "rgba(70,52,170,A)", 0.05 + rnd() * 0.06);
  for (let i = 0; i < 260; i++) blob2(rnd() * w, rnd() * h, 18 + rnd() * 46, "rgba(255,120,170,A)", 0.02 + rnd() * 0.035);
  for (let i = 0; i < 190; i++) {
    const x = rnd() * w, y = rnd() * h;
    const r = 5 + Math.pow(rnd(), 2.2) * 42;
    const a = (0.05 + rnd() * 0.12) * (r > 25 ? 0.6 : 1);
    const gr = g.createRadialGradient(x, y, r * 0.2, x, y, r);
    gr.addColorStop(0, `rgba(110,92,255,${a * 0.55})`);
    gr.addColorStop(0.78, `rgba(123,108,255,${a * 0.8})`);
    gr.addColorStop(0.9, `rgba(150,136,255,${a})`);
    gr.addColorStop(1, "rgba(123,108,255,0)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  g.globalCompositeOperation = "source-over";
  try {
    const tmp = document.createElement("canvas");
    tmp.width = w;
    tmp.height = h;
    const t = tmp.getContext("2d");
    t.drawImage(cv, 0, 0);
    g.filter = "blur(7px)";
    g.drawImage(tmp, 0, 0);
    g.filter = "none";
  } catch {
  }
  const v = g.createRadialGradient(w * 0.5, h * 0.48, h * 0.18, w * 0.5, h * 0.5, Math.hypot(w, h) * 0.56);
  v.addColorStop(0, "rgba(10,8,26,0.42)");
  v.addColorStop(0.45, "rgba(10,8,26,0.18)");
  v.addColorStop(1, "rgba(4,3,14,0.88)");
  g.fillStyle = v;
  g.fillRect(0, 0, w, h);
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
function makeMicrographTexture() {
  const t = new CanvasTexture(makeMicrographCanvas());
  t.colorSpace = SRGBColorSpace;
  t.minFilter = LinearFilter;
  t.magFilter = LinearFilter;
  t.generateMipmaps = false;
  return t;
}
function coverRect(texAspect, aspect) {
  if (aspect > texAspect) {
    const s2 = texAspect / aspect;
    return new Vector4(1, s2, 0, (1 - s2) / 2);
  }
  const s = aspect / texAspect;
  return new Vector4(s, 1, (1 - s) / 2, 0);
}
function makeBackdropMesh(tex) {
  const mat = new ShaderMaterial({
    uniforms: { tBg: { value: tex }, uRect: { value: new Vector4(1, 1, 0, 0) } },
    vertexShader: (
      /* glsl */
      `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }`
    ),
    fragmentShader: (
      /* glsl */
      `uniform sampler2D tBg; uniform vec4 uRect; varying vec2 vUv;
      void main(){ gl_FragColor = texture2D(tBg, vUv * uRect.xy + uRect.zw);
      #include <colorspace_fragment>
      }`
    ),
    depthTest: false,
    depthWrite: false,
    toneMapped: false
  });
  const m = new Mesh(new PlaneGeometry(2, 2), mat);
  m.frustumCulled = false;
  m.renderOrder = -1e3;
  m.userData.backdrop = true;
  return m;
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coverRect,
  makeBackdropMesh,
  makeMicrographCanvas,
  makeMicrographTexture
}, Symbol.toStringTag, { value: "Module" }));
function fold(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/æ/gi, "ae").replace(/œ/gi, "oe").toLowerCase();
}
function norm(s) {
  return fold(s).replace(/[^a-z0-9]+/g, " ").trim();
}
function slug(s) {
  return s.trim().replace(/'/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}
function editDistance(a, b, cap = 6) {
  if (a === b) return 0;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > cap) return cap + 1;
  let prev2 = new Array(lb + 1).fill(0);
  let prev = new Array(lb + 1);
  let cur = new Array(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;
  for (let i = 1; i <= la; i++) {
    cur[0] = i;
    let rowMin = cur[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > cap) return cap + 1;
    [prev2, prev, cur] = [prev, cur, prev2];
  }
  return prev[lb];
}
const RANGE = {
  shoulder: { flexion: 90, extension: 50, abduction: 90, adduction: 90, "medial-rotation": 70, "lateral-rotation": 60 },
  elbow: { flexion: 145, extension: 140 },
  radioulnar: { pronation: 80, supination: 80 },
  wrist: { flexion: 75, extension: 65, "radial-deviation": 20, "ulnar-deviation": 30 },
  hip: { flexion: 90, extension: 20, abduction: 40, adduction: 35, "medial-rotation": 35, "lateral-rotation": 45 },
  knee: { flexion: 130, extension: 90 },
  ankle: { dorsiflexion: 20, plantarflexion: 45 },
  subtalar: { inversion: 30, eversion: 15 }
};
const START = {
  "shoulder:adduction": { movement: "abduction", deg: 90 },
  "elbow:extension": { movement: "flexion", deg: 140 },
  "radioulnar:pronation": { movement: "pronation", deg: 80 },
  "radioulnar:supination": { movement: "pronation", deg: 80 },
  "hip:adduction": { movement: "abduction", deg: 35 },
  "knee:extension": { movement: "flexion", deg: 90 }
};
const START_ALSO = {
  "shoulder:medial-rotation": { joint: "elbow", movement: "flexion", deg: 90 },
  "shoulder:lateral-rotation": { joint: "elbow", movement: "flexion", deg: 90 },
  "hip:medial-rotation": { joint: "knee", movement: "flexion", deg: 90 },
  "hip:lateral-rotation": { joint: "knee", movement: "flexion", deg: 90 }
};
const J = (joint, movement, deg) => ({ joint, movement, deg });
const LABEL = {
  "shoulder:flexion": { la: "Flexio articulationis humeri", en: "Shoulder flexion", id: "Fleksi sendi bahu" },
  "shoulder:extension": { la: "Extensio articulationis humeri", en: "Shoulder extension", id: "Ekstensi sendi bahu" },
  "shoulder:abduction": { la: "Abductio articulationis humeri", en: "Shoulder abduction", id: "Abduksi sendi bahu" },
  "shoulder:adduction": { la: "Adductio articulationis humeri", en: "Shoulder adduction", id: "Adduksi sendi bahu" },
  "shoulder:medial-rotation": { la: "Rotatio medialis articulationis humeri", en: "Medial rotation of the shoulder", id: "Rotasi medial sendi bahu" },
  "shoulder:lateral-rotation": { la: "Rotatio lateralis articulationis humeri", en: "Lateral rotation of the shoulder", id: "Rotasi lateral sendi bahu" },
  "elbow:flexion": { la: "Flexio articulationis cubiti", en: "Elbow flexion", id: "Fleksi sendi siku" },
  "elbow:extension": { la: "Extensio articulationis cubiti", en: "Elbow extension", id: "Ekstensi sendi siku" },
  "radioulnar:pronation": { la: "Pronatio antebrachii", en: "Pronation of the forearm", id: "Pronasi lengan bawah" },
  "radioulnar:supination": { la: "Supinatio antebrachii", en: "Supination of the forearm", id: "Supinasi lengan bawah" },
  "wrist:flexion": { la: "Flexio articulationis radiocarpalis", en: "Wrist flexion", id: "Fleksi pergelangan tangan" },
  "wrist:extension": { la: "Extensio articulationis radiocarpalis", en: "Wrist extension", id: "Ekstensi pergelangan tangan" },
  "wrist:radial-deviation": { la: "Abductio radialis manus", en: "Radial deviation of the wrist", id: "Deviasi radial pergelangan tangan" },
  "wrist:ulnar-deviation": { la: "Adductio ulnaris manus", en: "Ulnar deviation of the wrist", id: "Deviasi ulnar pergelangan tangan" },
  "hip:flexion": { la: "Flexio articulationis coxae", en: "Hip flexion", id: "Fleksi sendi panggul" },
  "hip:extension": { la: "Extensio articulationis coxae", en: "Hip extension", id: "Ekstensi sendi panggul" },
  "hip:abduction": { la: "Abductio articulationis coxae", en: "Hip abduction", id: "Abduksi sendi panggul" },
  "hip:adduction": { la: "Adductio articulationis coxae", en: "Hip adduction", id: "Adduksi sendi panggul" },
  "hip:medial-rotation": { la: "Rotatio medialis articulationis coxae", en: "Medial rotation of the hip", id: "Rotasi medial sendi panggul" },
  "hip:lateral-rotation": { la: "Rotatio lateralis articulationis coxae", en: "Lateral rotation of the hip", id: "Rotasi lateral sendi panggul" },
  "knee:flexion": { la: "Flexio articulationis genus", en: "Knee flexion", id: "Fleksi sendi lutut" },
  "knee:extension": { la: "Extensio articulationis genus", en: "Knee extension", id: "Ekstensi sendi lutut" },
  "ankle:dorsiflexion": { la: "Dorsiflexio articulationis talocruralis", en: "Dorsiflexion of the ankle", id: "Dorsofleksi sendi pergelangan kaki" },
  "ankle:plantarflexion": { la: "Flexio plantaris articulationis talocruralis", en: "Plantar flexion of the ankle", id: "Plantarfleksi sendi pergelangan kaki" },
  "subtalar:inversion": { la: "Inversio pedis", en: "Inversion of the foot", id: "Inversi kaki" },
  "subtalar:eversion": { la: "Eversio pedis", en: "Eversion of the foot", id: "Eversi kaki" }
};
const BICEPS = ["long-head-of-biceps-brachii", "short-head-of-biceps-brachii"];
const TRICEPS = ["long-head-of-triceps-brachii", "lateral-head-of-triceps-brachii", "medial-head-of-triceps-brachii"];
const DELT_A = ["acromial-part-of-deltoid-muscle"];
const DELT_C = ["clavicular-part-of-deltoid-muscle"];
const DELT_S = ["scapular-spinal-part-of-deltoid-muscle"];
const PEC = ["clavicular-head-of-pectoralis-major-muscle", "sternocostal-head-of-pectoralis-major-muscle", "abdominal-part-of-pectoralis-major-muscle"];
const PRON_TERES = ["superficial-head-of-pronator-teres", "deep-head-of-pronator-teres"];
const FCU = ["humeral-head-of-flexor-carpi-ulnaris", "ulnar-head-of-flexor-carpi-ulnaris"];
const ECU = ["humeral-head-of-extensor-carpi-ulnaris", "ulnar-head-of-extensor-carpi-ulnaris"];
const FDS = ["humero-ulnar-head-of-flexor-digitorum-superficialis", "radial-head-of-flexor-digitorum-superficialis"];
const QUAD = ["rectus-femoris-muscle", "vastus-lateralis-muscle", "vastus-medialis-muscle", "vastus-intermedius-muscle"];
const HAM = ["long-head-of-biceps-femoris", "short-head-of-biceps-femoris", "semitendinosus-muscle", "semimembranosus-muscle"];
const GASTRO = ["medial-head-of-gastrocnemius", "lateral-head-of-gastrocnemius"];
const ADDUCT = ["adductor-longus", "adductor-brevis", "adductor-magnus", "adductor-minimus", "pectineus-muscle", "gracilis-muscle"];
const LAT_ROT_HIP = ["piriformis-muscle", "obturator-internus", "superior-gemellus-muscle", "inferior-gemellus-muscle", "quadratus-femoris-muscle", "obturator-externus"];
const ILIOPSOAS = ["psoas-major", "iliacus-muscle"];
const MOVERS = {
  "shoulder:flexion": { agonists: [...DELT_C, PEC[0], "coracobrachialis-muscle", ...BICEPS], antagonists: [...DELT_S, "latissimus-dorsi-muscle", TRICEPS[0], "teres-major-muscle"] },
  "shoulder:extension": { agonists: [...DELT_S, "latissimus-dorsi-muscle", "teres-major-muscle", TRICEPS[0]], antagonists: [...DELT_C, PEC[0], "coracobrachialis-muscle", ...BICEPS] },
  "shoulder:abduction": { agonists: [...DELT_A, "supraspinatus-muscle"], antagonists: [...PEC, "latissimus-dorsi-muscle", "teres-major-muscle"] },
  "shoulder:adduction": { agonists: [...PEC, "latissimus-dorsi-muscle", "teres-major-muscle"], antagonists: [...DELT_A, "supraspinatus-muscle"] },
  "shoulder:medial-rotation": { agonists: ["subscapularis-muscle", ...PEC, "latissimus-dorsi-muscle", "teres-major-muscle", ...DELT_C], antagonists: ["infraspinatus-muscle", "teres-minor-muscle", ...DELT_S] },
  "shoulder:lateral-rotation": { agonists: ["infraspinatus-muscle", "teres-minor-muscle", ...DELT_S], antagonists: ["subscapularis-muscle", ...PEC, "latissimus-dorsi-muscle", "teres-major-muscle"] },
  "elbow:flexion": { agonists: ["brachialis-muscle", ...BICEPS, "brachioradialis-muscle"], antagonists: [...TRICEPS, "anconeus-muscle"] },
  "elbow:extension": { agonists: [...TRICEPS, "anconeus-muscle"], antagonists: ["brachialis-muscle", ...BICEPS, "brachioradialis-muscle"] },
  "radioulnar:pronation": { agonists: ["pronator-quadratus", ...PRON_TERES], antagonists: ["supinator", ...BICEPS] },
  "radioulnar:supination": { agonists: ["supinator", ...BICEPS], antagonists: ["pronator-quadratus", ...PRON_TERES] },
  "wrist:flexion": { agonists: ["flexor-carpi-radialis", ...FCU, "palmaris-longus-muscle", ...FDS], antagonists: ["extensor-carpi-radialis-longus", "extensor-carpi-radialis-brevis", ...ECU, "extensor-digitorum"] },
  "wrist:extension": { agonists: ["extensor-carpi-radialis-longus", "extensor-carpi-radialis-brevis", ...ECU, "extensor-digitorum"], antagonists: ["flexor-carpi-radialis", ...FCU, "palmaris-longus-muscle", ...FDS] },
  "wrist:radial-deviation": { agonists: ["flexor-carpi-radialis", "extensor-carpi-radialis-longus", "extensor-carpi-radialis-brevis"], antagonists: [...FCU, ...ECU] },
  "wrist:ulnar-deviation": { agonists: [...FCU, ...ECU], antagonists: ["flexor-carpi-radialis", "extensor-carpi-radialis-longus", "extensor-carpi-radialis-brevis"] },
  "hip:flexion": { agonists: [...ILIOPSOAS, "rectus-femoris-muscle", "sartorius-muscle", "tensor-fasciae-latae", "pectineus-muscle"], antagonists: ["gluteus-maximus-muscle", ...HAM] },
  "hip:extension": { agonists: ["gluteus-maximus-muscle", HAM[0], HAM[2], HAM[3]], antagonists: [...ILIOPSOAS, "rectus-femoris-muscle"] },
  "hip:abduction": { agonists: ["gluteus-medius-muscle", "gluteus-minimus-muscle", "tensor-fasciae-latae"], antagonists: ADDUCT },
  "hip:adduction": { agonists: ADDUCT, antagonists: ["gluteus-medius-muscle", "gluteus-minimus-muscle", "tensor-fasciae-latae"] },
  "hip:medial-rotation": { agonists: ["gluteus-minimus-muscle", "gluteus-medius-muscle", "tensor-fasciae-latae"], antagonists: [...LAT_ROT_HIP, "gluteus-maximus-muscle"] },
  "hip:lateral-rotation": { agonists: [...LAT_ROT_HIP, "gluteus-maximus-muscle"], antagonists: ["gluteus-minimus-muscle", "tensor-fasciae-latae"] },
  "knee:flexion": { agonists: [...HAM, "gracilis-muscle", "sartorius-muscle", ...GASTRO], antagonists: QUAD },
  "knee:extension": { agonists: QUAD, antagonists: [...HAM, ...GASTRO] },
  "ankle:dorsiflexion": { agonists: ["tibialis-anterior-muscle", "extensor-digitorum-longus", "extensor-hallucis-longus", "fibularis-tertius-muscle"], antagonists: [...GASTRO, "soleus-muscle"] },
  "ankle:plantarflexion": { agonists: [...GASTRO, "soleus-muscle", "plantaris-muscle", "calcaneal-tendon"], antagonists: ["tibialis-anterior-muscle", "extensor-digitorum-longus", "extensor-hallucis-longus"] },
  "subtalar:inversion": { agonists: ["tibialis-posterior-muscle", "tibialis-anterior-muscle"], antagonists: ["fibularis-longus-muscle", "fibularis-brevis-muscle"] },
  "subtalar:eversion": { agonists: ["fibularis-longus-muscle", "fibularis-brevis-muscle", "fibularis-tertius-muscle"], antagonists: ["tibialis-posterior-muscle", "tibialis-anterior-muscle"] }
};
const one = (...moves2) => moves2.map((m) => [m]);
const MUSCLES = {
  // shoulder
  "deltoid-muscle": { parts: [...DELT_A, ...DELT_C, ...DELT_S], clips: one(J("shoulder", "abduction"), J("shoulder", "flexion"), J("shoulder", "extension")) },
  "acromial-part-of-deltoid-muscle": { clips: one(J("shoulder", "abduction")) },
  "clavicular-part-of-deltoid-muscle": { clips: one(J("shoulder", "flexion"), J("shoulder", "medial-rotation")) },
  "scapular-spinal-part-of-deltoid-muscle": { clips: one(J("shoulder", "extension"), J("shoulder", "lateral-rotation")) },
  "supraspinatus-muscle": { clips: one(J("shoulder", "abduction")) },
  "infraspinatus-muscle": { clips: one(J("shoulder", "lateral-rotation")) },
  "teres-minor-muscle": { clips: one(J("shoulder", "lateral-rotation")) },
  "subscapularis-muscle": { clips: one(J("shoulder", "medial-rotation")) },
  "rotator-cuff-muscles": { parts: ["supraspinatus-muscle", "infraspinatus-muscle", "teres-minor-muscle", "subscapularis-muscle"], clips: one(J("shoulder", "abduction"), J("shoulder", "lateral-rotation"), J("shoulder", "medial-rotation")) },
  "teres-major-muscle": { clips: one(J("shoulder", "adduction"), J("shoulder", "medial-rotation"), J("shoulder", "extension")) },
  "latissimus-dorsi-muscle": { clips: one(J("shoulder", "adduction"), J("shoulder", "extension"), J("shoulder", "medial-rotation")) },
  "pectoralis-major-muscle": { parts: PEC, clips: one(J("shoulder", "adduction"), J("shoulder", "medial-rotation"), J("shoulder", "flexion")) },
  "clavicular-head-of-pectoralis-major-muscle": { clips: one(J("shoulder", "flexion"), J("shoulder", "adduction")) },
  "sternocostal-head-of-pectoralis-major-muscle": { clips: one(J("shoulder", "adduction"), J("shoulder", "medial-rotation")) },
  "abdominal-part-of-pectoralis-major-muscle": { clips: one(J("shoulder", "adduction")) },
  "coracobrachialis-muscle": { clips: [[J("shoulder", "flexion", 60)], [J("shoulder", "adduction")]] },
  // arm
  "biceps-brachii-muscle": { parts: BICEPS, clips: [[J("elbow", "flexion")], [J("radioulnar", "supination")], [J("shoulder", "flexion", 45)]] },
  "long-head-of-biceps-brachii": { clips: [[J("elbow", "flexion")], [J("radioulnar", "supination")], [J("shoulder", "flexion", 45)]] },
  "short-head-of-biceps-brachii": { clips: [[J("elbow", "flexion")], [J("radioulnar", "supination")], [J("shoulder", "flexion", 45)]] },
  "brachialis-muscle": { clips: one(J("elbow", "flexion")) },
  "triceps-brachii-muscle": { parts: TRICEPS, clips: [[J("elbow", "extension")], [J("shoulder", "extension", 30)]] },
  "long-head-of-triceps-brachii": { clips: [[J("elbow", "extension")], [J("shoulder", "extension", 30)]] },
  "lateral-head-of-triceps-brachii": { clips: one(J("elbow", "extension")) },
  "medial-head-of-triceps-brachii": { clips: one(J("elbow", "extension")) },
  "anconeus-muscle": { clips: one(J("elbow", "extension")) },
  // forearm
  "brachioradialis-muscle": { clips: one(J("elbow", "flexion")) },
  "pronator-teres": { parts: PRON_TERES, clips: one(J("radioulnar", "pronation"), J("elbow", "flexion", 90)) },
  "superficial-head-of-pronator-teres": { clips: one(J("radioulnar", "pronation")) },
  "deep-head-of-pronator-teres": { clips: one(J("radioulnar", "pronation")) },
  "pronator-quadratus": { clips: one(J("radioulnar", "pronation")) },
  supinator: { clips: one(J("radioulnar", "supination")) },
  "flexor-carpi-radialis": { clips: one(J("wrist", "flexion"), J("wrist", "radial-deviation")) },
  "flexor-carpi-ulnaris": { parts: FCU, clips: one(J("wrist", "flexion"), J("wrist", "ulnar-deviation")) },
  "humeral-head-of-flexor-carpi-ulnaris": { clips: one(J("wrist", "flexion"), J("wrist", "ulnar-deviation")) },
  "ulnar-head-of-flexor-carpi-ulnaris": { clips: one(J("wrist", "flexion"), J("wrist", "ulnar-deviation")) },
  "palmaris-longus-muscle": { clips: one(J("wrist", "flexion")) },
  "flexor-digitorum-superficialis": { parts: FDS, clips: one(J("wrist", "flexion")) },
  "humero-ulnar-head-of-flexor-digitorum-superficialis": { clips: one(J("wrist", "flexion")) },
  "radial-head-of-flexor-digitorum-superficialis": { clips: one(J("wrist", "flexion")) },
  "flexor-digitorum-profundus": { clips: one(J("wrist", "flexion")) },
  "extensor-carpi-radialis-longus": { clips: one(J("wrist", "extension"), J("wrist", "radial-deviation")) },
  "extensor-carpi-radialis-brevis": { clips: one(J("wrist", "extension"), J("wrist", "radial-deviation")) },
  "extensor-carpi-ulnaris": { parts: ECU, clips: one(J("wrist", "extension"), J("wrist", "ulnar-deviation")) },
  "humeral-head-of-extensor-carpi-ulnaris": { clips: one(J("wrist", "extension"), J("wrist", "ulnar-deviation")) },
  "ulnar-head-of-extensor-carpi-ulnaris": { clips: one(J("wrist", "extension"), J("wrist", "ulnar-deviation")) },
  "extensor-digitorum": { clips: one(J("wrist", "extension")) },
  // hip
  "iliopsoas-muscle": { parts: ILIOPSOAS, clips: one(J("hip", "flexion")) },
  "psoas-major": { clips: one(J("hip", "flexion")) },
  "iliacus-muscle": { clips: one(J("hip", "flexion")) },
  "gluteus-maximus-muscle": { clips: one(J("hip", "extension"), J("hip", "lateral-rotation")) },
  "gluteus-medius-muscle": { clips: one(J("hip", "abduction"), J("hip", "medial-rotation")) },
  "gluteus-minimus-muscle": { clips: one(J("hip", "abduction"), J("hip", "medial-rotation")) },
  "tensor-fasciae-latae": { clips: one(J("hip", "abduction"), J("hip", "flexion", 45), J("hip", "medial-rotation")) },
  "piriformis-muscle": { clips: one(J("hip", "lateral-rotation")) },
  "obturator-internus": { clips: one(J("hip", "lateral-rotation")) },
  "superior-gemellus-muscle": { clips: one(J("hip", "lateral-rotation")) },
  "inferior-gemellus-muscle": { clips: one(J("hip", "lateral-rotation")) },
  "quadratus-femoris-muscle": { clips: one(J("hip", "lateral-rotation")) },
  "obturator-externus": { clips: one(J("hip", "lateral-rotation")) },
  "deep-gluteal-muscles": { parts: LAT_ROT_HIP.slice(0, 5), clips: one(J("hip", "lateral-rotation")) },
  // thigh
  "sartorius-muscle": { clips: [[J("hip", "flexion", 45), J("hip", "abduction", 25), J("hip", "lateral-rotation", 30), J("knee", "flexion", 70)], [J("knee", "flexion")]] },
  "rectus-femoris-muscle": { clips: one(J("knee", "extension"), J("hip", "flexion", 45)) },
  "vastus-lateralis-muscle": { clips: one(J("knee", "extension")) },
  "vastus-medialis-muscle": { clips: one(J("knee", "extension")) },
  "vastus-intermedius-muscle": { clips: one(J("knee", "extension")) },
  "quadriceps-femoris-muscle": { parts: QUAD, clips: one(J("knee", "extension")) },
  "quadriceps-femoris": { parts: QUAD, clips: one(J("knee", "extension")) },
  "adductor-longus": { clips: one(J("hip", "adduction")) },
  "adductor-brevis": { clips: one(J("hip", "adduction")) },
  "adductor-magnus": { clips: one(J("hip", "adduction"), J("hip", "extension")) },
  "adductor-minimus": { clips: one(J("hip", "adduction")) },
  "pectineus-muscle": { clips: one(J("hip", "adduction"), J("hip", "flexion", 45)) },
  "gracilis-muscle": { clips: one(J("hip", "adduction"), J("knee", "flexion", 90)) },
  "long-head-of-biceps-femoris": { clips: [[J("knee", "flexion")], [J("hip", "extension")]] },
  "short-head-of-biceps-femoris": { clips: one(J("knee", "flexion")) },
  "biceps-femoris-muscle": { parts: HAM.slice(0, 2), clips: [[J("knee", "flexion")], [J("hip", "extension")]] },
  "semitendinosus-muscle": { clips: [[J("knee", "flexion")], [J("hip", "extension")]] },
  "semimembranosus-muscle": { clips: [[J("knee", "flexion")], [J("hip", "extension")]] },
  "posterior-compartment-of-thigh": { parts: HAM, clips: [[J("knee", "flexion")], [J("hip", "extension")]] },
  // leg
  "gastrocnemius-muscle": { parts: GASTRO, clips: one(J("ankle", "plantarflexion"), J("knee", "flexion", 60)) },
  "gastrocnemius": { parts: GASTRO, clips: one(J("ankle", "plantarflexion"), J("knee", "flexion", 60)) },
  "medial-head-of-gastrocnemius": { clips: one(J("ankle", "plantarflexion"), J("knee", "flexion", 60)) },
  "lateral-head-of-gastrocnemius": { clips: one(J("ankle", "plantarflexion"), J("knee", "flexion", 60)) },
  "soleus-muscle": { clips: one(J("ankle", "plantarflexion")) },
  "plantaris-muscle": { clips: one(J("ankle", "plantarflexion")) },
  "triceps-surae-muscle": { parts: [...GASTRO, "soleus-muscle", "calcaneal-tendon"], clips: one(J("ankle", "plantarflexion")) },
  "superficial-part-of-posterior-compartment-of-leg": { parts: [...GASTRO, "soleus-muscle", "plantaris-muscle", "calcaneal-tendon"], clips: one(J("ankle", "plantarflexion")) },
  "tibialis-anterior-muscle": { clips: one(J("ankle", "dorsiflexion"), J("subtalar", "inversion")) },
  "extensor-digitorum-longus": { clips: one(J("ankle", "dorsiflexion"), J("subtalar", "eversion")) },
  "extensor-hallucis-longus": { clips: one(J("ankle", "dorsiflexion")) },
  "fibularis-tertius-muscle": { clips: one(J("ankle", "dorsiflexion"), J("subtalar", "eversion")) },
  "anterior-compartment-of-leg": { parts: ["tibialis-anterior-muscle", "extensor-digitorum-longus", "extensor-hallucis-longus", "fibularis-tertius-muscle"], clips: one(J("ankle", "dorsiflexion")) },
  "fibularis-longus-muscle": { clips: one(J("subtalar", "eversion"), J("ankle", "plantarflexion")) },
  "fibularis-brevis-muscle": { clips: one(J("subtalar", "eversion"), J("ankle", "plantarflexion")) },
  "lateral-compartment-of-leg": { parts: ["fibularis-longus-muscle", "fibularis-brevis-muscle"], clips: one(J("subtalar", "eversion")) },
  "tibialis-posterior-muscle": { clips: one(J("subtalar", "inversion"), J("ankle", "plantarflexion")) },
  "flexor-digitorum-longus": { clips: one(J("ankle", "plantarflexion"), J("subtalar", "inversion")) },
  "flexor-hallucis-longus": { clips: one(J("ankle", "plantarflexion")) }
};
const JOINT_KEYS = {
  "glenohumeral-joint": "shoulder",
  "elbow-joint": "elbow",
  "humero-ulnar-joint": "elbow",
  "humeroradial-joint": "elbow",
  "proximal-radio-ulnar-joint": "radioulnar",
  "distal-radio-ulnar-joint": "radioulnar",
  "radio-ulnar-syndesmoses": "radioulnar",
  "radiocarpal-joint": "wrist",
  "midcarpal-joint": "wrist",
  "hip-joint": "hip",
  "knee-joint": "knee",
  "ankle-joint": "ankle",
  "talocrural-joint": "ankle",
  "subtalar-joint": "subtalar",
  "talocalcaneal-joint": "subtalar",
  "talocalcaneonavicular-joint": "subtalar"
};
const JOINT_MOVES = {
  shoulder: ["flexion", "extension", "abduction", "adduction", "medial-rotation", "lateral-rotation"],
  elbow: ["flexion", "extension"],
  radioulnar: ["pronation", "supination"],
  wrist: ["flexion", "extension", "radial-deviation", "ulnar-deviation"],
  hip: ["flexion", "extension", "abduction", "adduction", "medial-rotation", "lateral-rotation"],
  knee: ["flexion", "extension"],
  ankle: ["dorsiflexion", "plantarflexion"],
  subtalar: ["inversion", "eversion"]
};
const __vite_glob_1_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JOINT_KEYS,
  JOINT_MOVES,
  LABEL,
  MOVERS,
  MUSCLES,
  RANGE,
  START,
  START_ALSO
}, Symbol.toStringTag, { value: "Module" }));
const FAR = 0.255;
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
function edt1d(f2, n, d, v, z) {
  let k = 0;
  v[0] = 0;
  z[0] = -Infinity;
  z[1] = Infinity;
  for (let q = 1; q < n; q++) {
    let s = 0;
    for (; ; ) {
      const p = v[k];
      s = (f2[q] + q * q - (f2[p] + p * p)) / (2 * q - 2 * p);
      if (s > z[k] || k === 0) break;
      k--;
    }
    if (s <= z[k]) {
      k = 0;
      v[0] = q;
      z[0] = -Infinity;
      z[1] = Infinity;
      continue;
    }
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = Infinity;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    const p = v[k];
    d[q] = (q - p) * (q - p) + f2[p];
  }
}
function buildField(clouds, box, voxel) {
  const nx = Math.max(2, Math.ceil((box[3] - box[0]) / voxel) + 1);
  const ny = Math.max(2, Math.ceil((box[4] - box[1]) / voxel) + 1);
  const nz = Math.max(2, Math.ceil((box[5] - box[2]) / voxel) + 1);
  const INF = 1e12;
  const g = new Float32Array(nx * ny * nz).fill(INF);
  const ox = box[0], oy = box[1], oz = box[2];
  const mark = (x, y, z2) => {
    const ix = Math.round((x - ox) / voxel), iy = Math.round((y - oy) / voxel), iz = Math.round((z2 - oz) / voxel);
    if (ix < 0 || iy < 0 || iz < 0 || ix >= nx || iy >= ny || iz >= nz) return;
    g[(iz * ny + iy) * nx + ix] = 0;
  };
  for (const c of clouds) {
    const p = c.pos;
    for (let i = 0; i < p.length; i += 3) mark(p[i], p[i + 1], p[i + 2]);
    const idx = c.index;
    if (!idx) continue;
    for (let t = 0; t + 2 < idx.length; t += 3) {
      const a = idx[t] * 3, b = idx[t + 1] * 3, cc = idx[t + 2] * 3;
      const ax = p[a], ay = p[a + 1], az = p[a + 2];
      const ux = p[b] - ax, uy = p[b + 1] - ay, uz = p[b + 2] - az;
      const wx = p[cc] - ax, wy = p[cc + 1] - ay, wz = p[cc + 2] - az;
      const e = Math.max(Math.hypot(ux, uy, uz), Math.hypot(wx, wy, wz), Math.hypot(ux - wx, uy - wy, uz - wz));
      const m = Math.min(12, Math.ceil(e / voxel));
      if (m < 2) continue;
      for (let i = 0; i <= m; i++)
        for (let j = 0; j <= m - i; j++) {
          const s = i / m, r = j / m;
          mark(ax + ux * s + wx * r, ay + uy * s + wy * r, az + uz * s + wz * r);
        }
    }
  }
  const L = Math.max(nx, ny, nz);
  const f2 = new Float32Array(L), d = new Float32Array(L), v = new Int32Array(L), z = new Float32Array(L + 1);
  for (let k = 0; k < nz; k++)
    for (let j = 0; j < ny; j++) {
      const o = (k * ny + j) * nx;
      for (let i = 0; i < nx; i++) f2[i] = g[o + i];
      edt1d(f2, nx, d, v, z);
      for (let i = 0; i < nx; i++) g[o + i] = d[i];
    }
  for (let k = 0; k < nz; k++)
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) f2[j] = g[(k * ny + j) * nx + i];
      edt1d(f2, ny, d, v, z);
      for (let j = 0; j < ny; j++) g[(k * ny + j) * nx + i] = d[j];
    }
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      for (let k = 0; k < nz; k++) f2[k] = g[(k * ny + j) * nx + i];
      edt1d(f2, nz, d, v, z);
      for (let k = 0; k < nz; k++) g[(k * ny + j) * nx + i] = d[k];
    }
  const out = new Uint8Array(nx * ny * nz);
  for (let i = 0; i < out.length; i++) out[i] = Math.min(255, Math.round(Math.sqrt(g[i]) * voxel * 1e3));
  return { nx, ny, nz, ox, oy, oz, voxel, d: out };
}
function sampleField(F2, x, y, z) {
  const fx = (x - F2.ox) / F2.voxel, fy = (y - F2.oy) / F2.voxel, fz = (z - F2.oz) / F2.voxel;
  if (fx < 0 || fy < 0 || fz < 0 || fx > F2.nx - 1 || fy > F2.ny - 1 || fz > F2.nz - 1) return FAR;
  const ix = Math.min(F2.nx - 2, fx | 0), iy = Math.min(F2.ny - 2, fy | 0), iz = Math.min(F2.nz - 2, fz | 0);
  const tx = fx - ix, ty = fy - iy, tz = fz - iz;
  const d = F2.d, sy = F2.nx, sz = F2.nx * F2.ny, o = (iz * F2.ny + iy) * F2.nx + ix;
  const c00 = d[o] * (1 - tx) + d[o + 1] * tx;
  const c10 = d[o + sy] * (1 - tx) + d[o + sy + 1] * tx;
  const c01 = d[o + sz] * (1 - tx) + d[o + sz + 1] * tx;
  const c11 = d[o + sz + sy] * (1 - tx) + d[o + sz + sy + 1] * tx;
  return ((c00 * (1 - ty) + c10 * ty) * (1 - tz) + (c01 * (1 - ty) + c11 * ty) * tz) / 1e3;
}
const BAND = { T: [0.45, 0.85], N: [0.3, 0.7], L: [0.12, 0.45] };
const FAR0 = 0.12, FAR1 = 0.16;
const GAMMA = 1.3;
const TIP0 = 0.55, TIP1 = 0.95;
const BINS = 72;
function skin(parts, distal, proximal, hinges, muscle) {
  const rho = [], far = [];
  const sampleRho = [];
  const coreOnly = parts.some((p) => p.core);
  for (const p of parts) {
    const n = p.pos.length / 3;
    const r = new Float32Array(n), fd = new Float32Array(n);
    const step = Math.max(1, Math.floor(n / 400));
    for (let i = 0; i < n; i++) {
      const x = p.pos[i * 3], y = p.pos[i * 3 + 1], z = p.pos[i * 3 + 2];
      const dD = sampleField(distal, x, y, z), dP = sampleField(proximal, x, y, z);
      r[i] = dP / (dP + dD + 1e-5);
      fd[i] = 1 - smooth(FAR0, FAR1, dD);
      if (i % step === 0 && (!coreOnly || p.core)) sampleRho.push(r[i]);
    }
    rho.push(r);
    far.push(fd);
  }
  sampleRho.sort((a, b) => a - b);
  const median = sampleRho.length ? sampleRho[sampleRho.length >> 1] : 0;
  const cls = !muscle ? "N" : median < 0.3 ? "T" : median > 0.7 ? "L" : "N";
  const [lo, hi] = BAND[cls];
  const w = [];
  const h0 = [];
  let moved = false;
  parts.forEach((p, k) => {
    const n = p.pos.length / 3;
    const out = new Uint8Array(n * 4), h = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let v = smooth(lo, hi, rho[k][i]) * far[k][i];
      h[i] = v;
      out[i * 4] = Math.round(v * 255);
      if (out[i * 4] > 0) moved = true;
      const x = p.pos[i * 3], y = p.pos[i * 3 + 1], z = p.pos[i * 3 + 2];
      for (let j = 0; j < hinges.length && j < 3; j++) {
        const q = hinges[j];
        v *= smooth(-q.band, q.band, (x - q.px) * q.nx + (y - q.py) * q.ny + (z - q.pz) * q.nz - q.off);
        out[i * 4 + 1 + j] = Math.round(v * 255);
      }
    }
    w.push(out);
    h0.push(h);
  });
  const res = { w, pull: null, insertion: null, insertionW: [1, 0, 0, 0], moved, cls };
  if (cls !== "T" || !moved) return res;
  let sx = 0, sy = 0, sz = 0, sw = 0, count = 0, total = 0;
  let cx = 0, cy = 0, cz = 0;
  parts.forEach((p, k) => {
    const h = h0[k];
    for (let i = 0; i < h.length; i++) {
      const x = p.pos[i * 3], y = p.pos[i * 3 + 1], z = p.pos[i * 3 + 2];
      cx += x;
      cy += y;
      cz += z;
      total++;
      if (h[i] < 0.8) continue;
      sx += x * h[i];
      sy += y * h[i];
      sz += z * h[i];
      sw += h[i];
      count++;
    }
  });
  if (count < 3 || total < 8) return res;
  const I = [sx / sw, sy / sw, sz / sw];
  cx /= total;
  cy /= total;
  cz /= total;
  const iw = [1, 0, 0, 0];
  for (let j = 0; j < hinges.length && j < 3; j++) {
    const q = hinges[j];
    iw[j + 1] = iw[j] * smooth(-q.band, q.band, (I[0] - q.px) * q.nx + (I[1] - q.py) * q.ny + (I[2] - q.pz) * q.nz - q.off);
  }
  let xx = 0, xy = 0, xz = 0, yy = 0, yz = 0, zz = 0;
  for (const p of parts)
    for (let i = 0; i < p.pos.length; i += 3) {
      const x = p.pos[i] - cx, y = p.pos[i + 1] - cy, z = p.pos[i + 2] - cz;
      xx += x * x;
      xy += x * y;
      xz += x * z;
      yy += y * y;
      yz += y * z;
      zz += z * z;
    }
  const power = (v) => {
    for (let k = 0; k < 40; k++) {
      const a = xx * v[0] + xy * v[1] + xz * v[2], b = xy * v[0] + yy * v[1] + yz * v[2], c = xz * v[0] + yz * v[1] + zz * v[2];
      const n = Math.hypot(a, b, c);
      if (n < 1e-20) break;
      v = [a / n, b / n, c / n];
    }
    return v;
  };
  const e1 = power([0.3, 1, 0.2]);
  const l1 = e1[0] * (xx * e1[0] + xy * e1[1] + xz * e1[2]) + e1[1] * (xy * e1[0] + yy * e1[1] + yz * e1[2]) + e1[2] * (xz * e1[0] + yz * e1[1] + zz * e1[2]);
  xx -= l1 * e1[0] * e1[0];
  xy -= l1 * e1[0] * e1[1];
  xz -= l1 * e1[0] * e1[2];
  yy -= l1 * e1[1] * e1[1];
  yz -= l1 * e1[1] * e1[2];
  zz -= l1 * e1[2] * e1[2];
  let e2 = power([1, 0.2, 0.3]);
  const dd = e2[0] * e1[0] + e2[1] * e1[1] + e2[2] * e1[2];
  e2 = [e2[0] - dd * e1[0], e2[1] - dd * e1[1], e2[2] - dd * e1[2]];
  const n2 = Math.hypot(e2[0], e2[1], e2[2]) || 1;
  e2 = [e2[0] / n2, e2[1] / n2, e2[2] / n2];
  const angle = (dx, dy, dz) => (Math.atan2(dx * e2[0] + dy * e2[1] + dz * e2[2], dx * e1[0] + dy * e1[1] + dz * e1[2]) + Math.PI) / (2 * Math.PI) * BINS;
  const bins = new Float32Array(BINS);
  for (const p of parts)
    for (let i = 0; i < p.pos.length; i += 3) {
      const dx = p.pos[i] - I[0], dy = p.pos[i + 1] - I[1], dz = p.pos[i + 2] - I[2];
      const s = Math.hypot(dx, dy, dz);
      const b = Math.min(BINS - 1, Math.floor(angle(dx, dy, dz)));
      if (s > bins[b]) bins[b] = s;
    }
  for (let pass = 0; pass < BINS; pass++) {
    let changed = false;
    for (let b = 0; b < BINS; b++)
      if (bins[b] === 0) {
        const m = Math.max(bins[(b + 1) % BINS], bins[(b + BINS - 1) % BINS]);
        if (m > 0) {
          bins[b] = m;
          changed = true;
        }
      }
    if (!changed) break;
  }
  let cur = new Float32Array(BINS);
  for (let b = 0; b < BINS; b++) cur[b] = Math.max(bins[b], bins[(b + 1) % BINS], bins[(b + BINS - 1) % BINS]);
  for (let it = 0; it < 3; it++) {
    const nx = new Float32Array(BINS);
    for (let b = 0; b < BINS; b++) nx[b] = 0.25 * cur[(b + BINS - 1) % BINS] + 0.5 * cur[b] + 0.25 * cur[(b + 1) % BINS];
    cur = nx;
  }
  const lengthAt = (dx, dy, dz) => {
    const a = angle(dx, dy, dz) - 0.5, b0 = Math.floor(a), t = a - b0;
    return cur[(b0 % BINS + BINS) % BINS] * (1 - t) + cur[((b0 + 1) % BINS + BINS) % BINS] * t;
  };
  const pull = [];
  parts.forEach((p, k) => {
    const h = h0[k], n = h.length;
    const out = new Int16Array(n * 4);
    for (let i = 0; i < n; i++) {
      const dx = p.pos[i * 3] - I[0], dy = p.pos[i * 3 + 1] - I[1], dz = p.pos[i * 3 + 2] - I[2];
      const s = Math.hypot(dx, dy, dz);
      const u = Math.max(0, 1 - s / Math.max(0.02, lengthAt(dx, dy, dz)));
      const g = Math.pow(u, GAMMA) * (1 - h[i]);
      if (g < 1e-3) continue;
      let fx = -dx / (s + 1e-9), fy = -dy / (s + 1e-9), fz = -dz / (s + 1e-9);
      if (p.nrm) {
        const nx = p.nrm[i * 3], ny = p.nrm[i * 3 + 1], nz = p.nrm[i * 3 + 2];
        const d = fx * nx + fy * ny + fz * nz;
        const tx = fx - d * nx, ty = fy - d * ny, tz = fz - d * nz;
        const tl = Math.hypot(tx, ty, tz);
        if (tl > 0.2) {
          fx = tx / tl;
          fy = ty / tl;
          fz = tz / tl;
        }
      }
      const tip = smooth(TIP0, TIP1, u);
      const along = Math.sqrt(g * (1 - tip));
      out[i * 4] = Math.round(fx * along * 32767);
      out[i * 4 + 1] = Math.round(fy * along * 32767);
      out[i * 4 + 2] = Math.round(fz * along * 32767);
      out[i * 4 + 3] = Math.round(g * tip * 32767);
    }
    pull.push(out);
  });
  res.pull = pull;
  res.insertion = I;
  res.insertionW = iw;
  return res;
}
const __vite_glob_1_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildField,
  sampleField,
  skin
}, Symbol.toStringTag, { value: "Module" }));
const CYCLE = 2.6;
const PRE = 0.55;
const UPPER = ["shoulder", "elbow", "radioulnar", "wrist"];
const LOWER = ["hip", "knee", "ankle", "subtalar"];
const DOF_COUNT = { shoulder: 3, elbow: 1, radioulnar: 1, wrist: 2, hip: 3, knee: 1, ankle: 1, subtalar: 1 };
const DOF = {
  flexion: [0, 1],
  extension: [0, -1],
  abduction: [1, 1],
  adduction: [1, -1],
  "medial-rotation": [2, 1],
  "lateral-rotation": [2, -1],
  pronation: [0, 1],
  supination: [0, -1],
  "radial-deviation": [1, 1],
  "ulnar-deviation": [1, -1],
  dorsiflexion: [0, 1],
  plantarflexion: [0, -1],
  inversion: [0, 1],
  eversion: [0, -1]
};
const TRUNK_TO_HUMERUS = /^(clavicular-head|sternocostal-head|abdominal-part)-of-pectoralis-major-muscle-[lr]$|^latissimus-dorsi-muscle-[lr]$/;
const HAND$1 = /^(scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate)-bone-[lr]$|metacarpal-bone-[lr]$|-of-hand-[lr]$|sesamoid-bones-of-hand/;
const FOOT$1 = /^(calcaneus|navicular-bone|cuboid-bone|(medial|intermediate|lateral)-cuneiform-bone)-[lr]$|metatarsal-bone-[lr]$|-of-foot-[lr]$|sesamoid-bones-of-foot/;
let lastDB = null;
const clipDB = /* @__PURE__ */ new WeakMap();
function idsFor(db, keys, side) {
  const out = /* @__PURE__ */ new Set();
  for (const k of keys)
    for (const id2 of db.idsForKey(k)) {
      const r = db.byId.get(id2);
      if (r && r.pack !== "attachments" && r.side === side) out.add(id2);
    }
  return [...out];
}
function labelFor(moves2) {
  const ls = moves2.map((m) => LABEL[`${m.joint}:${m.movement}`]);
  return { la: ls.map((l) => l.la).join(" et "), en: ls.map((l) => l.en).join(" and "), id: ls.map((l) => l.id).join(" dan ") };
}
function build(db, id2, side, moves2, muscles, extraStretch = []) {
  const full = moves2.map((m) => ({ joint: m.joint, movement: m.movement, deg: m.deg ?? RANGE[m.joint][m.movement] ?? 30 }));
  const mus = new Set(muscles);
  const stretch = /* @__PURE__ */ new Set();
  for (const m of full) for (const s of idsFor(db, MOVERS[`${m.joint}:${m.movement}`]?.antagonists ?? [], side)) if (!mus.has(s)) stretch.add(s);
  for (const s of extraStretch) if (!mus.has(s)) stretch.add(s);
  const clip = { id: id2, side, moves: full, muscles: [...mus], stretch: [...stretch], label: labelFor(full), packs: ["skeleton", "muscles"] };
  clipDB.set(clip, db);
  return clip;
}
function clipsForKey(db, key, side) {
  lastDB = db;
  const joint = JOINT_KEYS[key];
  if (joint) return jointClips(db, side).filter((c) => c.moves[0].joint === joint);
  let k = key;
  let entry = MUSCLES[k];
  if (!entry) {
    const rec = db.byKey.get(key)?.[0];
    if (rec)
      for (let i = rec.path.length - 1; i >= 0 && !entry; i--) {
        const pk = slug(rec.path[i]);
        if (MUSCLES[pk]) {
          entry = MUSCLES[pk];
          k = pk;
        }
      }
  }
  if (!entry) return [];
  const muscles = idsFor(db, entry.parts ?? [k], side);
  if (!muscles.length) return [];
  return entry.clips.map((moves2, i) => build(db, i === 0 ? `m:${k}-${side}` : `m:${k}:${moves2[0].joint}-${moves2[0].movement}-${side}`, side, moves2, muscles));
}
function jointClips(db, side) {
  lastDB = db;
  const out = [];
  for (const j of [...UPPER, ...LOWER])
    for (const mv of JOINT_MOVES[j]) out.push(build(db, `${j}-${mv}-${side}`, side, [{ joint: j, movement: mv }], idsFor(db, MOVERS[`${j}:${mv}`]?.agonists ?? [], side)));
  return out;
}
const V = (a) => new Vector3(a[0], a[1], a[2]);
function solve(A, b) {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-14) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f2 = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f2 * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / r[i]);
}
function fitSphere(pts) {
  if (pts.length < 12) return null;
  const A = [0, 1, 2, 3].map(() => [0, 0, 0, 0]);
  const b = [0, 0, 0, 0];
  for (const p of pts) {
    const row = [2 * p.x, 2 * p.y, 2 * p.z, 1];
    const rhs = p.lengthSq();
    for (let i = 0; i < 4; i++) {
      b[i] += row[i] * rhs;
      for (let j = 0; j < 4; j++) A[i][j] += row[i] * row[j];
    }
  }
  const s = solve(A, b);
  if (!s) return null;
  const c = new Vector3(s[0], s[1], s[2]);
  return { c, r: Math.sqrt(Math.max(0, s[3] + c.lengthSq())) };
}
function fitCircle(pts) {
  if (pts.length < 10) return null;
  const A = [0, 1, 2].map(() => [0, 0, 0]);
  const b = [0, 0, 0];
  for (const p of pts) {
    const row = [2 * p.x, 2 * p.y, 1];
    const rhs = p.lengthSq();
    for (let i = 0; i < 3; i++) {
      b[i] += row[i] * rhs;
      for (let j = 0; j < 3; j++) A[i][j] += row[i] * row[j];
    }
  }
  const s = solve(A, b);
  if (!s) return null;
  const c = new Vector2(s[0], s[1]);
  return { c, r: Math.sqrt(Math.max(0, s[2] + c.lengthSq())) };
}
function restVerts(o, cb, kinds) {
  const p = new Vector3(), n = new Vector3(), nm = new Matrix3(), m = new Matrix4();
  o.meshes.forEach((mesh, i) => {
    if (kinds && !kinds.has(o.mats[i].userData.kind)) return;
    m.copy(o.restMatrix);
    if (mesh !== o.root) m.multiply(mesh.matrix);
    nm.getNormalMatrix(m);
    const g = mesh.geometry;
    const pa = g.getAttribute("position"), na = g.getAttribute("normal");
    const step = Math.max(1, Math.floor(pa.count / 12e3));
    for (let k = 0; k < pa.count; k += step) {
      p.fromBufferAttribute(pa, k).applyMatrix4(m);
      if (na) n.fromBufferAttribute(na, k).applyMatrix3(nm).normalize();
      cb(p, n);
    }
  });
}
const FIELD_MARGIN = 0.14;
const FIELD_VOXELS = 11e5;
function restArrays(o, mesh, normals) {
  const m = new Matrix4().copy(o.restMatrix);
  if (mesh !== o.root) m.multiply(mesh.matrix);
  const g = mesh.geometry;
  const pa = g.getAttribute("position");
  const na = normals ? g.getAttribute("normal") : void 0;
  const n = pa.count, e = m.elements;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i);
    pos[i * 3] = e[0] * x + e[4] * y + e[8] * z + e[12];
    pos[i * 3 + 1] = e[1] * x + e[5] * y + e[9] * z + e[13];
    pos[i * 3 + 2] = e[2] * x + e[6] * y + e[10] * z + e[14];
  }
  let nrm = null;
  if (na) {
    const k = new Matrix3().getNormalMatrix(m).elements;
    nrm = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const x = na.getX(i), y = na.getY(i), z = na.getZ(i);
      const a = k[0] * x + k[3] * y + k[6] * z, b = k[1] * x + k[4] * y + k[7] * z, c = k[2] * x + k[5] * y + k[8] * z;
      const l = Math.hypot(a, b, c) || 1;
      nrm[i * 3] = a / l;
      nrm[i * 3 + 1] = b / l;
      nrm[i * 3 + 2] = c / l;
    }
  }
  return { pos, nrm, index: g.index ? g.index.array : null };
}
function computeRightFrames(db, objects) {
  const lm = (k) => {
    const l = db.lmByKey.get(k)?.find((x) => x.side === "r");
    return l ? { p: V(l.p), n: V(l.n).normalize() } : null;
  };
  const need = ["head-of-humerus", "medial-epicondyle-of-humerus", "lateral-epicondyle-of-humerus", "head-of-radius", "head-of-ulna", "radial-styloid-process", "ulnar-styloid-process", "head-of-femur", "medial-epicondyle-of-femur", "lateral-epicondyle-of-femur", "medial-malleolus", "lateral-malleolus"];
  const L = {};
  for (const k of need) {
    const x = lm(k);
    if (!x) return null;
    L[k] = x;
  }
  const posX = (v) => (v.x < 0 ? v.negate() : v).normalize();
  const head = (boneId, l, r0) => {
    let c = l.p.clone().addScaledVector(l.n, -r0);
    const o = objects.get(boneId);
    if (!o) return c;
    for (let it = 0; it < 3; it++) {
      const pts = [];
      const d = new Vector3();
      restVerts(o, (p, n) => {
        d.subVectors(p, c);
        const len = d.length();
        if (len > r0 * 0.55 && len < r0 * 1.35 && n.dot(d) > 0.75 * len) pts.push(p.clone());
      });
      const f2 = fitSphere(pts);
      if (!f2 || f2.r < 0.014 || f2.r > 0.034 || f2.c.distanceTo(c) > 0.015) break;
      c = f2.c;
    }
    return c;
  };
  const hinge = (boneId, mid, e, down, sel, rMin, rMax) => {
    const o = objects.get(boneId);
    if (!o) return mid.clone();
    const b1 = down.clone().sub(e.clone().multiplyScalar(down.dot(e))).normalize();
    const b2 = new Vector3().crossVectors(e, b1);
    const pts = [];
    const d = new Vector3();
    restVerts(o, (p, n) => {
      if (Math.abs(n.dot(e)) > 0.45 || !sel(p, n)) return;
      d.subVectors(p, mid);
      pts.push(new Vector2(d.dot(b1), d.dot(b2)));
    });
    const f2 = fitCircle(pts);
    if (!f2 || f2.r < rMin || f2.r > rMax || f2.c.length() > 0.03) return mid.clone();
    return mid.clone().addScaledVector(b1, f2.c.x).addScaledVector(b2, f2.c.y);
  };
  const sh = head("humerus-r", L["head-of-humerus"], 0.023);
  const eEl = posX(L["medial-epicondyle-of-humerus"].p.clone().sub(L["lateral-epicondyle-of-humerus"].p));
  const midEl = L["medial-epicondyle-of-humerus"].p.clone().add(L["lateral-epicondyle-of-humerus"].p).multiplyScalar(0.5);
  const uHum0 = midEl.clone().sub(sh).normalize();
  const el = hinge("humerus-r", midEl, eEl, uHum0, (p) => p.clone().sub(midEl).dot(uHum0) > 0 && p.distanceTo(midEl) < 0.032, 6e-3, 0.03);
  const rh = L["head-of-radius"].p.clone().addScaledVector(L["head-of-radius"].n, -0.011);
  const uh = L["head-of-ulna"].p.clone().addScaledVector(L["head-of-ulna"].n, -8e-3);
  const eWr = posX(L["radial-styloid-process"].p.clone().sub(L["ulnar-styloid-process"].p));
  const midWr = L["radial-styloid-process"].p.clone().add(L["ulnar-styloid-process"].p).multiplyScalar(0.5);
  const uFore0 = midWr.clone().sub(el).normalize();
  const wr = midWr.clone().addScaledVector(uFore0, 6e-3);
  const hip = head("femur-r", L["head-of-femur"], 0.024);
  const eKn = posX(L["medial-epicondyle-of-femur"].p.clone().sub(L["lateral-epicondyle-of-femur"].p));
  const midKn = L["medial-epicondyle-of-femur"].p.clone().add(L["lateral-epicondyle-of-femur"].p).multiplyScalar(0.5);
  const uFem0 = midKn.clone().sub(hip).normalize();
  const kn = hinge("femur-r", midKn, eKn, uFem0, (p) => p.clone().sub(midKn).dot(uFem0) > 0 && p.distanceTo(midKn) < 0.045, 0.012, 0.04);
  const eAn = posX(L["medial-malleolus"].p.clone().sub(L["lateral-malleolus"].p));
  const midAn = L["medial-malleolus"].p.clone().add(L["lateral-malleolus"].p).multiplyScalar(0.5);
  const uTib0 = midAn.clone().sub(kn).normalize();
  const up = uTib0.clone().negate();
  const an = hinge("talus-r", midAn, eAn, uTib0, (p, n) => n.dot(up) > 0.55 && Math.hypot(p.x - midAn.x, p.z - midAn.z) < 0.028, 0.012, 0.035);
  const stA = lm("lateral-process-of-calcaneal-tuberosity")?.p ?? midAn.clone().add(new Vector3(-0.01, -0.06, -0.035));
  const stB = lm("neck-of-talus")?.p ?? midAn.clone().add(new Vector3(0.02, -0.015, 0.025));
  const aSt = stB.clone().sub(stA).normalize();
  const st = stA.clone().add(stB).multiplyScalar(0.5);
  return { sh, el, eEl, rh, uh, wr, eWr, hip, kn, eKn, an, eAn, st, aSt };
}
function mirrorFrames(f2) {
  const P2 = (v) => new Vector3(-v.x, v.y, v.z);
  const A = (v) => new Vector3(v.x, -v.y, -v.z);
  return { sh: P2(f2.sh), el: P2(f2.el), eEl: A(f2.eEl), rh: P2(f2.rh), uh: P2(f2.uh), wr: P2(f2.wr), eWr: A(f2.eWr), hip: P2(f2.hip), kn: P2(f2.kn), eKn: A(f2.eKn), an: P2(f2.an), eAn: A(f2.eAn), st: P2(f2.st), aSt: P2(f2.aSt) };
}
function makeLimb(f2, side, upper) {
  const L = side === "r" ? -1 : 1;
  let joints;
  let axes;
  if (upper) {
    const uHum = f2.el.clone().sub(f2.sh).normalize();
    const uFore = f2.wr.clone().sub(f2.el).normalize();
    const uRU = f2.uh.clone().sub(f2.rh).normalize();
    const mid = f2.el.clone().add(f2.wr).multiplyScalar(0.5);
    joints = [
      { pivot: f2.sh, plane: uHum, offset: 0, band: 0.04 },
      { pivot: f2.el, plane: uHum, offset: 0, band: 0.035 },
      { pivot: f2.rh, plane: uFore, offset: mid.clone().sub(f2.rh).dot(uFore), band: 0.42 * f2.wr.distanceTo(f2.el) },
      { pivot: f2.wr, plane: uFore, offset: 0, band: 0.025 }
    ];
    axes = { long: uHum, eEl: f2.eEl, uRU, eWr: f2.eWr, ap: new Vector3().crossVectors(uFore, f2.eWr).normalize() };
  } else {
    const uFem = f2.kn.clone().sub(f2.hip).normalize();
    const uTib = f2.an.clone().sub(f2.kn).normalize();
    joints = [
      { pivot: f2.hip, plane: uFem, offset: 0, band: 0.045 },
      { pivot: f2.kn, plane: uFem, offset: 0, band: 0.045 },
      { pivot: f2.an, plane: uTib, offset: 0, band: 0.03 },
      { pivot: f2.st, plane: uTib, offset: f2.an.clone().sub(f2.st).dot(uTib), band: 0.03 }
    ];
    axes = { long: uFem, eKn: f2.eKn, eAn: f2.eAn, aSt: f2.aSt };
  }
  const v4 = () => [0, 1, 2, 3].map(() => new Vector4());
  const shared = { uJP: v4(), uJA: v4() };
  joints.forEach((j, i) => shared.uJP[i].set(j.pivot.x, j.pivot.y, j.pivot.z, 0));
  return { side, upper, L, joints, axes, shared };
}
const zeroPose = () => ({ shoulder: [0, 0, 0], elbow: [0], radioulnar: [0], wrist: [0, 0], hip: [0, 0, 0], knee: [0], ankle: [0], subtalar: [0] });
const D2R = Math.PI / 180;
function jointQuats(limb, pose) {
  const q = (axis, deg) => new Quaternion().setFromAxisAngle(axis, deg * D2R);
  const X = new Vector3(1, 0, 0), Z = new Vector3(0, 0, 1);
  const L = limb.L, a = limb.axes;
  if (limb.upper) {
    const [f22, ab2, r2] = pose.shoulder;
    return [
      q(X, -f22).multiply(q(Z, L * ab2)).multiply(q(a.long, L * r2)),
      q(a.eEl, -pose.elbow[0]),
      q(a.uRU, L * pose.radioulnar[0]),
      q(a.eWr, -pose.wrist[0]).multiply(q(a.ap, L * pose.wrist[1]))
    ];
  }
  const [f2, ab, r] = pose.hip;
  return [q(X, -f2).multiply(q(Z, L * ab)).multiply(q(a.long, L * r)), q(a.eKn, pose.knee[0]), q(a.eAn, -pose.ankle[0]), q(a.aSt, -L * pose.subtalar[0])];
}
function pivotMatrix(pivot, q, out = new Matrix4()) {
  const t = new Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z);
  const r = new Matrix4().makeRotationFromQuaternion(q);
  const ti = new Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z);
  return out.copy(t).multiply(r).multiply(ti);
}
class Motion {
  constructor(host) {
    this.host = host;
    this.clip = null;
    this.playing = false;
    this.loopOn = true;
    this.speed = 1;
    this.t = 0;
    this.phase = "idle";
    this.preT = 0;
    this.from = zeroPose();
    this.to = zeroPose();
    this.pose = zeroPose();
    this.last = 0;
    this.dirty = false;
    this.frames = /* @__PURE__ */ new Map();
    this.limbs = /* @__PURE__ */ new Map();
    this.active = null;
    this.bones = [];
    this.soft = [];
    this.pulled = [];
    this.fields = /* @__PURE__ */ new Map();
    this.skins = /* @__PURE__ */ new Map();
    this.contract = [];
    this.stretchSet = [];
    this.bellies = /* @__PURE__ */ new Map();
    this.boneM = /* @__PURE__ */ new Map();
    this.tickL = /* @__PURE__ */ new Set();
  }
  // ---------------------------------------------------------------- public API (ENGINE_API.md)
  play(clip, opts = {}) {
    const db = clipDB.get(clip) ?? lastDB;
    if (opts.loop !== void 0) this.loopOn = opts.loop;
    if (opts.speed !== void 0) this.speed = Math.max(0.05, opts.speed);
    if (!db) return;
    const upper = UPPER.includes(clip.moves[0]?.joint);
    const limb = this.limb(db, clip.side, upper);
    if (!limb) return;
    this.unbindLooks();
    if (this.active && this.active !== limb) {
      this.pose = zeroPose();
      this.applyPose();
      this.unbindRig();
    }
    this.clip = clip;
    this.bind(limb, clip);
    this.from = this.clonePose(this.pose);
    this.to = this.clipPose(clip, 0);
    this.preT = 0;
    this.phase = "pre";
    this.t = 0;
    this.playing = true;
    this.last = performance.now();
    this.host.setMotionActive(true);
    this.dirty = true;
    this.host.invalidate();
  }
  pause() {
    this.playing = false;
  }
  resume() {
    if (this.clip) {
      if (this.phase === "cycle" && this.t >= 1 && !this.loopOn) this.t = 0;
      this.playing = true;
      this.last = performance.now();
      this.host.invalidate();
    }
  }
  stop() {
    if (!this.clip && this.phase === "idle") return;
    this.clip = null;
    this.playing = false;
    this.from = this.clonePose(this.pose);
    this.to = zeroPose();
    this.preT = 0;
    this.phase = "stop";
    this.last = performance.now();
    this.unbindLooks();
    this.dirty = true;
    this.host.invalidate();
  }
  scrub(t) {
    if (!this.clip) return;
    this.playing = false;
    this.phase = "cycle";
    this.t = Math.max(0, Math.min(1, t));
    this.pose = this.clipPose(this.clip, this.progress());
    this.applyPose();
    this.fireTick();
    this.host.invalidate();
  }
  setSpeed(x) {
    this.speed = Math.max(0.05, x);
  }
  setLoop(on) {
    this.loopOn = on;
  }
  state() {
    const p = this.phase === "cycle" ? this.progress() : 0;
    return { clip: this.clip, t: this.t, playing: this.playing && !!this.clip, angles: this.clip ? this.clip.moves.map((m) => Math.round(m.deg * p * 10) / 10) : [] };
  }
  onTick(cb) {
    this.tickL.add(cb);
    return () => this.tickL.delete(cb);
  }
  // ---------------------------------------------------------------- engine side
  /** True while a pose is applied (a clip is loaded or easing back). */
  get busy() {
    return this.phase !== "idle";
  }
  /** True while the pose changes from frame to frame. */
  get animating() {
    return this.phase === "pre" || this.phase === "stop" || this.phase === "cycle" && this.playing;
  }
  /** Rigid motion of a bone (or of an origin/insertion patch on it), for landmarks and pins. */
  boneMatrix(id2) {
    return this.boneM.get(id2) ?? null;
  }
  /** Advance the clock; returns true when the pose changed and a frame is needed. */
  update(now) {
    const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1e3));
    this.last = now;
    if (this.phase === "idle") return false;
    let changed = this.dirty;
    this.dirty = false;
    if (this.phase === "pre") {
      this.preT = Math.min(1, this.preT + dt / PRE);
      this.pose = this.lerpPose(this.from, this.to, ease(this.preT));
      changed = true;
      if (this.preT >= 1) this.phase = "cycle";
    } else if (this.phase === "cycle" && this.clip) {
      if (this.playing) {
        this.t += dt * this.speed / CYCLE;
        if (this.t >= 1) {
          if (this.loopOn) this.t -= Math.floor(this.t);
          else {
            this.t = 1;
            this.playing = false;
          }
        }
        changed = true;
      }
      if (changed) this.pose = this.clipPose(this.clip, this.progress());
    } else if (this.phase === "stop") {
      this.preT = Math.min(1, this.preT + dt / 0.6);
      this.pose = this.lerpPose(this.from, this.to, ease(this.preT));
      changed = true;
      if (this.preT >= 1) {
        this.applyPose();
        this.unbindRig();
        this.phase = "idle";
        this.host.setMotionActive(false);
        this.host.onPose();
        return true;
      }
    }
    if (changed) this.applyPose();
    if (this.clip) this.fireTick();
    return changed;
  }
  // ---------------------------------------------------------------- internals
  fireTick() {
    this.tickL.forEach((f2) => f2());
  }
  progress() {
    return 0.5 - 0.5 * Math.cos(2 * Math.PI * this.t);
  }
  clonePose(p) {
    const o = zeroPose();
    for (const k of Object.keys(o)) o[k] = [...p[k]];
    return o;
  }
  lerpPose(a, b, f2) {
    const o = zeroPose();
    for (const k of Object.keys(o)) o[k] = a[k].map((v, i) => v + (b[k][i] - v) * f2);
    return o;
  }
  clipPose(clip, p) {
    const pose = zeroPose();
    for (const m of clip.moves) {
      const s = START[`${m.joint}:${m.movement}`];
      if (s) {
        const [i, sg] = DOF[s.movement];
        pose[m.joint][i] = sg * s.deg;
      }
    }
    if (clip.moves.length === 1) {
      const also = START_ALSO[`${clip.moves[0].joint}:${clip.moves[0].movement}`];
      if (also) {
        const [i, sg] = DOF[also.movement];
        pose[also.joint][i] = sg * also.deg;
      }
    }
    for (const m of clip.moves) {
      const [i, sg] = DOF[m.movement];
      if (i < DOF_COUNT[m.joint]) pose[m.joint][i] += sg * m.deg * p;
    }
    return pose;
  }
  limb(db, side, upper) {
    const key = side + (upper ? "u" : "d");
    let limb = this.limbs.get(key);
    if (limb) return limb;
    let fr = this.frames.get("r");
    if (!fr) {
      const f2 = computeRightFrames(db, this.host.objects);
      if (!f2) return null;
      fr = f2;
      this.frames.set("r", f2);
      this.frames.set("l", mirrorFrames(f2));
    }
    limb = makeLimb(side === "r" ? fr : this.frames.get("l"), side, upper);
    this.limbs.set(key, limb);
    return limb;
  }
  bind(limb, clip) {
    const objs = this.host.objects;
    if (this.active !== limb) {
      this.unbindRig();
      this.active = limb;
      this.bones = [];
      this.bindRigid(limb);
      this.soft = [];
      this.pulled = [];
      this.bindSoft(limb);
    }
    this.contract = clip.muscles.map((id2) => objs.get(id2)).filter((o) => !!o);
    this.stretchSet = clip.stretch.map((id2) => objs.get(id2)).filter((o) => !!o);
    for (const o of this.contract) {
      const b = this.belly(o);
      o.rig.uBulge.value.set(b.c.x, b.c.y, b.c.z, b.half);
      o.rig.uBulgeAxis.value.set(b.a.x, b.a.y, b.a.z, 0);
    }
  }
  /** A pack finished loading: let its structures join the limb that is posed. */
  packLoaded() {
    const limb = this.active;
    if (!limb) return;
    this.bindRigid(limb);
    this.bindSoft(limb);
    this.applyPose();
    this.host.invalidate();
  }
  /** Rigid parts of the limb and the weight each joint has on them. Adds only what is not bound yet. */
  bindRigid(limb) {
    const objs = this.host.objects;
    const s = limb.side;
    const have = new Set(this.bones.map((b) => b.o));
    const add = (o, w) => {
      if (!o || have.has(o)) return;
      have.add(o);
      o.root.matrixAutoUpdate = false;
      this.bones.push({ o, w });
    };
    for (const o of objs.values()) {
      const id2 = o.rec.id;
      if (o.rec.pack !== "skeleton" || o.rec.side !== s) continue;
      if (limb.upper) {
        if (id2 === `humerus-${s}`) add(o, [1, 0, 0, 0]);
        else if (id2 === `ulna-${s}`) add(o, [1, 1, 0, 0]);
        else if (id2 === `radius-${s}`) add(o, [1, 1, 1, 0]);
        else if (HAND$1.test(id2)) add(o, [1, 1, 1, 1]);
      } else {
        if (id2 === `femur-${s}`) add(o, [1, 0, 0, 0]);
        else if (id2 === `patella-${s}`) add(o, [1, 0.7, 0, 0]);
        else if (id2 === `tibia-${s}` || id2 === `fibula-${s}`) add(o, [1, 1, 0, 0]);
        else if (id2 === `talus-${s}`) add(o, [1, 1, 1, 0]);
        else if (FOOT$1.test(id2)) add(o, [1, 1, 1, 1]);
      }
    }
    const boneW = new Map(this.bones.filter((b) => b.o.rec.pack === "skeleton").map((b) => [b.o.rec.id, b.w]));
    for (const [att, bone] of this.host.attachBoneMap()) {
      const w = boneW.get(bone);
      if (w) add(objs.get(att), w);
    }
  }
  /** Soft tissue of the limb: who belongs, per-vertex weights, shader uniforms. Adds only what is not bound yet. */
  bindSoft(limb) {
    const s = limb.side;
    const key = s + (limb.upper ? "u" : "d");
    const sh = limb.joints[0].pivot;
    const have = new Set(this.soft);
    let cache2 = this.skins.get(key);
    if (!cache2) this.skins.set(key, cache2 = /* @__PURE__ */ new Map());
    for (const o of this.host.objects.values()) {
      if (have.has(o)) continue;
      const r = o.rec;
      if (r.side !== s || r.pack === "skeleton" || r.pack === "attachments" || r.pack === "viscera" || r.pack === "lymphoid") continue;
      const path = r.path.join("|");
      let member = false;
      if (r.pack === "muscles" || r.pack === "skin") {
        member = limb.upper ? /upper limb/i.test(path) || TRUNK_TO_HUMERUS.test(r.id) : /lower limb/i.test(path);
      } else if (r.pack === "joints") {
        member = limb.upper ? /free upper limb/i.test(path) : /free lower limb/i.test(path);
      } else {
        const c = o.center;
        member = limb.upper ? Math.abs(c.x) > Math.abs(sh.x) - 0.012 && c.y < sh.y + 0.03 && c.y > 0.5 : c.y < sh.y - 0.03 && Math.abs(c.x) > 0.02;
      }
      if (!member) continue;
      let sk = cache2.get(r.id);
      if (sk === void 0) {
        sk = this.skinFor(limb, key, o);
        cache2.set(r.id, sk);
      }
      if (!sk) continue;
      const rig = o.rig;
      rig.uJP.value = limb.shared.uJP;
      rig.uJA.value = limb.shared.uJA;
      rig.uPull.value.set(0, 0, 0);
      const weights = sk;
      o.meshes.forEach((mesh, i) => {
        const g = mesh.geometry;
        g.setAttribute("rigW", weights.w[i]);
        if (weights.pull) g.setAttribute("rigP", weights.pull[i]);
        if (!mesh.customDepthMaterial) mesh.customDepthMaterial = makeRigDepthMaterial(rig);
      });
      rig.uRigOn.value = 1;
      this.soft.push(o);
      if (sk.pull && sk.insertion) this.pulled.push({ o, at: sk.insertion, w: sk.insertionW });
    }
  }
  /** Distance fields to the bones this limb moves and to the bones that stay, built once per limb. */
  fieldsFor(limb, key) {
    let F2 = this.fields.get(key);
    if (F2) return F2;
    const moving = new Set(this.bones.filter((b) => b.o.rec.pack === "skeleton" && b.w[0] === 1).map((b) => b.o));
    const pv = limb.joints[0].pivot;
    const box = [pv.x - 0.2, pv.y - 0.2, pv.z - 0.2, pv.x + 0.2, pv.y + 0.2, pv.z + 0.2];
    const distal = [];
    for (const o of moving) for (const mesh of o.meshes) distal.push(restArrays(o, mesh, false));
    for (const c of distal)
      for (let i = 0; i < c.pos.length; i += 3)
        for (let a = 0; a < 3; a++) {
          const v = c.pos[i + a];
          if (v < box[a]) box[a] = v;
          if (v > box[a + 3]) box[a + 3] = v;
        }
    for (let a = 0; a < 3; a++) {
      box[a] -= FIELD_MARGIN;
      box[a + 3] += FIELD_MARGIN;
    }
    const proximal = [];
    for (const o of this.host.objects.values()) {
      if (o.rec.pack !== "skeleton" || moving.has(o)) continue;
      const b = o.box;
      if (b.max.x < box[0] || b.min.x > box[3] || b.max.y < box[1] || b.min.y > box[4] || b.max.z < box[2] || b.min.z > box[5]) continue;
      for (const mesh of o.meshes) proximal.push(restArrays(o, mesh, false));
    }
    const voxel = Math.max(5e-3, Math.cbrt((box[3] - box[0]) * (box[4] - box[1]) * (box[5] - box[2]) / FIELD_VOXELS));
    F2 = { distal: buildField(distal, box, voxel), proximal: buildField(proximal, box, voxel) };
    this.fields.set(key, F2);
    return F2;
  }
  skinFor(limb, key, o) {
    const F2 = this.fieldsFor(limb, key);
    const hinges = limb.joints.slice(1).map((j) => ({ px: j.pivot.x, py: j.pivot.y, pz: j.pivot.z, nx: j.plane.x, ny: j.plane.y, nz: j.plane.z, off: j.offset, band: j.band }));
    const parts = o.meshes.map((mesh, i) => ({ ...restArrays(o, mesh, true), core: o.mats[i].userData.kind === "muscle" }));
    const res = skin(parts, F2.distal, F2.proximal, hinges, o.rec.pack === "muscles");
    if (!res.moved) return null;
    return {
      w: res.w.map((a) => new BufferAttribute(a, 4, true)),
      pull: res.pull ? res.pull.map((a) => new BufferAttribute(a, 4, true)) : null,
      insertion: res.insertion ? new Vector3(res.insertion[0], res.insertion[1], res.insertion[2]) : null,
      insertionW: res.insertionW
    };
  }
  belly(o) {
    const hit = this.bellies.get(o.rec.id);
    if (hit) return hit;
    const pts = [];
    const kinds = /* @__PURE__ */ new Set(["muscle", "myocardium"]);
    restVerts(o, (p) => pts.push(p.clone()), kinds);
    if (pts.length < 8) restVerts(o, (p) => pts.push(p.clone()));
    const c = new Vector3();
    for (const p of pts) c.add(p);
    c.divideScalar(Math.max(1, pts.length));
    let xx = 0, xy = 0, xz = 0, yy = 0, yz = 0, zz = 0;
    for (const p of pts) {
      const x = p.x - c.x, y = p.y - c.y, z = p.z - c.z;
      xx += x * x;
      xy += x * y;
      xz += x * z;
      yy += y * y;
      yz += y * z;
      zz += z * z;
    }
    const a = new Vector3(0.2, 1, 0.1).normalize();
    const t = new Vector3();
    for (let k = 0; k < 32; k++) {
      t.set(xx * a.x + xy * a.y + xz * a.z, xy * a.x + yy * a.y + yz * a.z, xz * a.x + yz * a.y + zz * a.z);
      if (t.lengthSq() < 1e-24) break;
      a.copy(t.normalize());
    }
    let lo = Infinity, hi = -Infinity;
    for (const p of pts) {
      const d = t.subVectors(p, c).dot(a);
      lo = Math.min(lo, d);
      hi = Math.max(hi, d);
    }
    c.addScaledVector(a, (lo + hi) / 2);
    const b = { c, a, half: Math.max(0.01, (hi - lo) / 2) };
    this.bellies.set(o.rec.id, b);
    return b;
  }
  applyPose() {
    const limb = this.active;
    if (!limb) return;
    const qs = jointQuats(limb, this.pose);
    const axis = new Vector3();
    qs.forEach((q, i) => {
      const w = Math.max(-1, Math.min(1, q.w));
      const ang = 2 * Math.acos(w);
      const sn = Math.sqrt(Math.max(0, 1 - w * w));
      if (sn < 1e-6) axis.set(1, 0, 0);
      else axis.set(q.x / sn, q.y / sn, q.z / sn);
      limb.shared.uJA[i].set(axis.x, axis.y, axis.z, ang > Math.PI ? ang - 2 * Math.PI : ang);
    });
    this.boneM.clear();
    const m = new Matrix4(), part = new Matrix4(), qq = new Quaternion(), id2 = new Quaternion();
    for (const b of this.bones) {
      m.identity();
      for (let j = 0; j < 4; j++) {
        if (!b.w[j]) continue;
        qq.copy(id2).slerp(qs[j], b.w[j]);
        m.multiply(pivotMatrix(limb.joints[j].pivot, qq, part));
      }
      b.o.root.matrix.multiplyMatrices(m, b.o.restMatrix);
      b.o.root.matrixWorldNeedsUpdate = true;
      b.o.root.updateMatrixWorld(true);
      this.boneM.set(b.o.rec.id, m.clone());
    }
    for (const pl of this.pulled) {
      m.identity();
      for (let j = 0; j < 4; j++) {
        if (!pl.w[j]) continue;
        qq.copy(id2).slerp(qs[j], pl.w[j]);
        m.multiply(pivotMatrix(limb.joints[j].pivot, qq, part));
      }
      pl.o.rig.uPull.value.copy(pl.at).applyMatrix4(m).sub(pl.at);
    }
    const p = this.phase === "cycle" ? this.progress() : this.phase === "pre" ? 0 : 0;
    const concentric = this.t < 0.5;
    const glow = this.clip ? concentric ? 0.28 + 0.72 * p : 0.18 + 0.62 * p : 0;
    for (const o of this.contract) {
      o.rig.uBulgeAxis.value.w = 0.17 * p;
      o.rig.uShorten.value = (concentric ? 0.09 : 0.06) * p;
      for (const mt of o.mats) mt.userData.org.uContract.value = glow;
    }
    for (const o of this.stretchSet) for (const mt of o.mats) mt.userData.org.uStretch.value = this.clip ? 0.25 + 0.75 * p : 0;
    this.host.onPose();
  }
  unbindLooks() {
    for (const o of this.contract) {
      o.rig.uBulgeAxis.value.w = 0;
      o.rig.uShorten.value = 0;
      for (const mt of o.mats) mt.userData.org.uContract.value = 0;
    }
    for (const o of this.stretchSet) for (const mt of o.mats) mt.userData.org.uStretch.value = 0;
    this.contract = [];
    this.stretchSet = [];
  }
  unbindRig() {
    for (const o of this.soft) {
      o.rig.uRigOn.value = 0;
      o.rig.uPull.value.set(0, 0, 0);
    }
    this.pulled = [];
    for (const b of this.bones) {
      b.o.root.matrix.copy(b.o.restMatrix);
      b.o.root.matrix.decompose(b.o.root.position, b.o.root.quaternion, b.o.root.scale);
      b.o.root.matrixAutoUpdate = true;
      b.o.root.updateMatrixWorld(true);
    }
    this.soft = [];
    this.bones = [];
    this.boneM.clear();
    this.active = null;
  }
}
function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
const __vite_glob_1_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Motion,
  clipsForKey,
  jointClips
}, Symbol.toStringTag, { value: "Module" }));
BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
const _sphere = new Sphere();
Mesh.prototype.raycast = function(raycaster, hits) {
  const g = this.geometry;
  if (!g.boundsTree && g.attributes.position && g.attributes.position.count > 400 && !this.isInstancedMesh) {
    if (!g.boundingSphere) g.computeBoundingSphere();
    _sphere.copy(g.boundingSphere).applyMatrix4(this.matrixWorld);
    if (raycaster.ray.intersectsSphere(_sphere)) g.computeBoundsTree();
  }
  return acceleratedRaycast.call(this, raycaster, hits);
};
const EFFECT_DEFAULTS = {
  ultra: { shadows: true, dof: true, bloom: true, ao: true, adaptive: true },
  high: { shadows: false, dof: false, bloom: true, ao: true, adaptive: true },
  lite: { shadows: false, dof: false, bloom: false, ao: false, adaptive: false }
};
const TINTS = {
  hover: { color: "#ffc3d5", amt: 0.06, rim: 0.4, glow: 0 },
  select: { color: "#ff5d8f", amt: 0.14, rim: 1.35, glow: 1.3 },
  target: { color: "#ff5d8f", amt: 0.18, rim: 1.6, glow: 1.5 },
  right: { color: "#6ff0c4", amt: 0.16, rim: 1.1, glow: 0.9 },
  wrong: { color: "#ff8a3d", amt: 0.16, rim: 1.1, glow: 0.9 },
  related: { color: "#7b6cff", amt: 0.1, rim: 1, glow: 0.7 }
};
const PIN = "#ff5d8f";
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function withGlow(m, glow, instanceEmissive = false) {
  m.onBeforeCompile = (s) => {
    if (instanceEmissive) s.fragmentShader = s.fragmentShader.replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n  totalEmissiveRadiance *= vColor;");
    s.fragmentShader = s.fragmentShader.replace("#include <dithering_fragment>", `#include <dithering_fragment>
#ifdef OPAQUE
  gl_FragColor.a = ${(1 + glow).toFixed(3)};
#endif`);
  };
  m.customProgramCacheKey = () => `raga-glow-${glow}-${instanceEmissive}`;
  return m;
}
class Engine {
  constructor(container, opts) {
    this.scene = new Scene();
    this.world = new Group();
    this.objects = /* @__PURE__ */ new Map();
    this.post = null;
    this.dirty = true;
    this.raf = 0;
    this.loadingPacks = /* @__PURE__ */ new Map();
    this.loadedPacks = /* @__PURE__ */ new Set();
    this.backdrop = null;
    this.keyDir = new Vector3(-0.42, 0.72, 0.56).normalize();
    this.plainNormal = new MeshNormalMaterial();
    this.lost = false;
    this.lostL = /* @__PURE__ */ new Set();
    this.restoredL = /* @__PURE__ */ new Set();
    this.layerOn = /* @__PURE__ */ new Map();
    this.layerOpacity = /* @__PURE__ */ new Map();
    this.hidden = /* @__PURE__ */ new Set();
    this.isolate = null;
    this.side = "both";
    this.xray = false;
    this.focusSet = null;
    this.attachmentsShown = /* @__PURE__ */ new Set();
    this.colorMode = "real";
    this.explode = 0;
    this.explodeWanted = 0;
    this.explodeAnim = null;
    this.explodePivot = new Vector3();
    this.clip = null;
    this.clipPlane = new Plane();
    this.sceneBox = new Box3();
    this.pickables = [];
    this.pickablesDirty = true;
    this.regionBoxes = null;
    this.regionPath = null;
    this.insets = { left: 0, right: 0, bottom: 0, top: 0 };
    this.batching = 0;
    this.pendingApply = false;
    this.visVersion = 0;
    this.poseVersion = 0;
    this.motionActive = false;
    this.lastMove = -1e9;
    this.refining = false;
    this.fade = 1;
    this.fastScale = 1;
    this.frameEMA = 16.7;
    this.frameSamples = 0;
    this.lastFrameAt = 0;
    this.lastWasFast = false;
    this.basePR = 1;
    this.litePR = 1;
    this.shadowKey = "";
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();
    this.pointerInside = false;
    this.pointerMoved = false;
    this.downAt = null;
    this.hoverId = null;
    this.lastTap = 0;
    this.camTween = null;
    this.reducedMotion = false;
    this.lmMesh = null;
    this.lmList = [];
    this.lmHighlight = null;
    this.pin = null;
    this.pinHead = new Vector3();
    this.areaList = [];
    this.areaHi = null;
    this.areaOwners = [];
    this.areaKey = "";
    this.areaHiShown = false;
    this.pulseUntil = 0;
    this.lastPulse = 0;
    this.hoverL = /* @__PURE__ */ new Set();
    this.pickL = /* @__PURE__ */ new Set();
    this.dblL = /* @__PURE__ */ new Set();
    this.frameL = /* @__PURE__ */ new Set();
    this.tintMap = /* @__PURE__ */ new Map();
    this._v = new Vector3();
    this.attachBone = /* @__PURE__ */ new Map();
    this.lastPointer = null;
    this.container = container;
    const q = opts.quality === "high" || opts.quality === "lite" ? opts.quality : "ultra";
    this.quality = q;
    this.effects = { ...EFFECT_DEFAULTS[q] };
    this.base = opts.base;
    this.reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const usePost = q !== "lite";
    const r = new WebGLRenderer({ antialias: !usePost, powerPreference: "high-performance", preserveDrawingBuffer: false, alpha: false, stencil: false });
    r.outputColorSpace = SRGBColorSpace;
    r.toneMapping = NeutralToneMapping;
    r.toneMappingExposure = 1;
    r.localClippingEnabled = false;
    r.shadowMap.enabled = this.effects.shadows;
    r.shadowMap.type = PCFShadowMap;
    r.shadowMap.autoUpdate = false;
    r.domElement.className = "viewport-canvas";
    r.domElement.setAttribute("aria-label", "3D anatomy model");
    r.domElement.setAttribute("role", "img");
    container.appendChild(r.domElement);
    this.renderer = r;
    r.domElement.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
      cancelAnimationFrame(this.raf);
      this.lostL.forEach((f2) => f2());
    });
    r.domElement.addEventListener("webglcontextrestored", () => {
      if (!this.lost) return;
      this.lost = false;
      this.buildEnvironment();
      this.shadowKey = "";
      this.pickablesDirty = true;
      this.invalidate();
      this.raf = requestAnimationFrame(this.loop);
      this.restoredL.forEach((f2) => f2());
    });
    this.camera = new PerspectiveCamera(32, 1, 0.01, 30);
    this.camera.position.set(0, 1, 3.6);
    this.scene.add(this.camera);
    this.scene.add(this.world);
    this.buildEnvironment();
    this.scene.environmentIntensity = 0.42;
    this.key = new DirectionalLight("#fff1e2", 2.7);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(q === "ultra" ? 2048 : 1536, q === "ultra" ? 2048 : 1536);
    this.key.shadow.radius = 3.5;
    this.key.shadow.bias = -8e-5;
    this.scene.add(this.key, this.key.target);
    const fill = new DirectionalLight("#dfe7ff", 0.55);
    fill.position.set(1.8, -0.3, 1.2);
    fill.target.position.set(0, 0, -1);
    const rim = new DirectionalLight("#ffe9f1", 1.35);
    rim.position.set(1, 1.3, -2.3);
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
    c.addEventListener("change", () => this.invalidate());
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
      }
    });
    this.__motionModule = { clipsForKey, jointClips };
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
  setEffects(e) {
    const prevShadows = this.effects.shadows;
    this.effects = { ...this.effects, ...e };
    if (this.quality === "lite") this.effects = { ...this.effects, ao: false, dof: false, bloom: false };
    if (this.effects.shadows !== prevShadows) {
      this.renderer.shadowMap.enabled = this.effects.shadows;
      this.shadowKey = "";
      for (const o of this.objects.values()) for (const m of o.mats) m.needsUpdate = true;
    }
    if (!this.effects.adaptive) {
      this.fastScale = 1;
      if (this.quality === "lite") this.applyLitePR(1);
    }
    this.invalidate();
  }
  getEffects() {
    return { ...this.effects };
  }
  /** Called if the WebGL context is lost (the interface steps the graphics tier down or waits for it to come back). */
  onContextLost(cb) {
    this.lostL.add(cb);
    return () => this.lostL.delete(cb);
  }
  /** Called when a lost WebGL context has been restored and drawing has resumed. */
  onContextRestored(cb) {
    this.restoredL.add(cb);
    return () => this.restoredL.delete(cb);
  }
  /** True while the WebGL context is lost. */
  get contextLost() {
    return this.lost;
  }
  buildEnvironment() {
    const old = this.scene.environment;
    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    old?.dispose();
  }
  computeBasePR(w, h) {
    const dpr = window.devicePixelRatio || 1;
    if (this.quality === "lite") return Math.min(dpr, 1.5);
    let pr = Math.min(dpr, 2);
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    if (this.quality === "ultra" && !coarse) pr = Math.max(pr, Math.min(2, Math.sqrt(1920 * 1080 / Math.max(1, w * h))));
    const budget = 3840 * 2160;
    if (w * h * pr * pr > budget) pr = Math.sqrt(budget / (w * h));
    return pr;
  }
  resize() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.basePR = this.computeBasePR(w, h);
    const pr = this.quality === "lite" ? this.basePR * this.litePR : this.basePR;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.applyViewOffset();
    const rect = coverRect(1600 / 1e3, w / h);
    if (this.post) {
      const dw = Math.round(w * pr), dh = Math.round(h * pr);
      this.post.setSize(dw, dh, Math.min(1, Math.sqrt(22e5 / (dw * dh))));
      this.post.setBackgroundRect(rect);
    } else if (this.backdrop) {
      this.backdrop.material.uniforms.uRect.value.copy(rect);
    }
    this.invalidate();
  }
  applyLitePR(s) {
    if (Math.abs(s - this.litePR) < 0.04) return;
    this.litePR = s;
    this.resize();
  }
  invalidate() {
    this.dirty = true;
  }
  // ------------------------------------------------------------------ loading
  isLoaded(p) {
    return this.loadedPacks.has(p);
  }
  loadPack(pack, recs, onProgress) {
    if (this.loadedPacks.has(pack)) return Promise.resolve();
    const existing = this.loadingPacks.get(pack);
    if (existing) return existing;
    const folder = this.quality === "ultra" ? "ultra/" : this.quality === "lite" ? "lite/" : "";
    const url = `${this.base}models/${folder}${pack}.glb`;
    const p = new Promise((resolve, reject) => {
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
        (err) => reject(err)
      );
    });
    this.loadingPacks.set(pack, p);
    p.catch(() => this.loadingPacks.delete(pack));
    return p;
  }
  ingest(root, recs) {
    root.updateMatrixWorld(true);
    const lite = this.quality === "lite";
    const nodes = [...root.children];
    for (const node of nodes) {
      const rec = recs.get(node.name);
      if (!rec) continue;
      this.world.add(node);
      node.updateMatrix();
      node.updateMatrixWorld(true);
      const meshes = [];
      node.traverse((o) => {
        if (o.isMesh) meshes.push(o);
      });
      const mats = [];
      const rig = makeRigUniforms();
      let fiberAxis = null;
      meshes.forEach((mesh, mi) => {
        const g = mesh.geometry;
        const pos = g.getAttribute("position");
        if (pos && (pos.normalized || !(pos.array instanceof Float32Array))) {
          const arr = new Float32Array(pos.count * 3);
          for (let i = 0; i < pos.count; i++) {
            arr[i * 3] = pos.getX(i);
            arr[i * 3 + 1] = pos.getY(i);
            arr[i * 3 + 2] = pos.getZ(i);
          }
          g.setAttribute("position", new BufferAttribute(arr, 3));
        }
        const ao = g.getAttribute("_ao");
        if (ao) {
          g.setAttribute("aoBake", ao);
          g.deleteAttribute("_ao");
        }
        g.computeBoundingBox();
        g.computeBoundingSphere();
        const glbName = mesh.material.name;
        const srcName = rec.mats.length === 1 ? rec.mats[0] : glbName && rec.mats.includes(glbName) ? glbName : rec.mats[Math.min(mi, rec.mats.length - 1)] || glbName || "organ";
        mesh.material.dispose();
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
        mesh.renderOrder = KINDS[kind].opacity !== void 0 ? 2 : 0;
        mesh.castShadow = KINDS[kind].opacity === void 0;
        mesh.receiveShadow = true;
        mats.push(m);
      });
      const box = new Box3().setFromObject(node);
      const sphere = box.getBoundingSphere(new Sphere());
      const obj = {
        rec,
        root: node,
        meshes,
        mats,
        layer: layerOf(rec),
        box,
        center: sphere.center.clone(),
        radius: sphere.radius,
        basePos: node.position.clone(),
        tint: "none",
        rig,
        restMatrix: node.matrix.clone()
      };
      this.objects.set(rec.id, obj);
    }
  }
  // ------------------------------------------------------------------ visibility & look
  setLayer(layer, on) {
    this.layerOn.set(layer, on);
    this.applyAll();
  }
  layerVisible(layer) {
    return this.layerOn.get(layer) ?? false;
  }
  setLayerOpacity(layer, v) {
    this.layerOpacity.set(layer, v);
    this.applyAll();
  }
  setHidden(ids) {
    this.hidden = new Set(ids);
    this.applyAll();
  }
  setIsolate(ids) {
    this.isolate = ids ? new Set(ids) : null;
    this.applyAll();
  }
  setSide(s) {
    this.side = s;
    this.applyAll();
  }
  /** X-ray: everything outside `focus` becomes a faint ghost. */
  setXray(on, focus) {
    this.xray = on;
    this.focusSet = focus ? new Set(focus) : null;
    this.applyAll();
  }
  /** Run several setters and recompute visibility once at the end. */
  batch(fn) {
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
  setRegion(boxes, path = null) {
    this.regionBoxes = boxes && boxes.length ? boxes.map((b) => b.clone()) : null;
    this.regionPath = this.regionBoxes ? path : null;
    this.applyAll();
  }
  inRegion(o) {
    if (!this.regionBoxes) return true;
    if (this.regionPath && o.rec.path.some((p) => this.regionPath.test(p))) return true;
    return this.regionBoxes.some((b) => b.containsPoint(o.center));
  }
  /** Panels covering the left/right edge of the canvas (CSS px); framing centres on the free area. */
  /** Space the panels take on each side of the view, in CSS pixels. The specimen is centred in what is left. */
  setInsets(left, right, bottom = 0, top = 0) {
    const cur = this.insets;
    if (cur.left === left && cur.right === right && cur.bottom === bottom && cur.top === top) return;
    this.insets = { left, right, bottom, top };
    this.applyViewOffset();
    this.invalidate();
  }
  applyViewOffset() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    const shift = (this.insets.left - this.insets.right) / 2;
    const shiftY = (this.insets.bottom - this.insets.top) / 2;
    if (Math.abs(shift) < 1 && Math.abs(shiftY) < 1) this.camera.clearViewOffset();
    else this.camera.setViewOffset(w, h, -shift, shiftY, w, h);
    this.camera.updateProjectionMatrix();
  }
  setAttachments(ids) {
    this.attachmentsShown = new Set(ids);
    this.applyAll();
  }
  setColorMode(m) {
    this.colorMode = m;
    this.applyAll();
  }
  setTints(map) {
    this.tintMap = map;
    for (const o of this.objects.values()) {
      const t = map.get(o.rec.id) ?? (o.rec.id === this.hoverId ? "hover" : "none");
      if (o.tint !== t) {
        o.tint = t;
        this.applyLook(o);
      }
    }
    this.invalidate();
  }
  setTint(map) {
    this.tintMap = map;
    this.setTints(map);
  }
  isVisible(id2) {
    const o = this.objects.get(id2);
    return !!o && o.root.visible;
  }
  visibleFor(o) {
    if (o.layer === "attachments") return this.attachmentsShown.has(o.rec.id);
    if (!(this.layerOn.get(o.layer) ?? false)) return false;
    if (this.hidden.has(o.rec.id)) return false;
    if (this.side !== "both" && o.rec.side && o.rec.side !== this.side) return false;
    if (this.isolate && !this.isolate.has(o.rec.id)) return false;
    if (this.regionBoxes && !this.inRegion(o) && !(this.focusSet?.has(o.rec.id) ?? false)) return false;
    return true;
  }
  applyAll() {
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
  applyLook(o) {
    const layerOp = o.layer === "attachments" ? 1 : this.layerOpacity.get(o.layer) ?? 1;
    const ghost = this.xray && this.focusSet !== null && !this.focusSet.has(o.rec.id) && o.layer !== "attachments";
    const tint = o.tint === "none" ? null : TINTS[o.tint];
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
      const side = clipping && !transparent ? DoubleSide : ud.kind === "origin" || ud.kind === "insertion" ? DoubleSide : FrontSide;
      if (m.side !== side) {
        m.side = side;
        m.needsUpdate = true;
      }
      if (this.colorMode === "function" && ud.kind === "muscle" && o.rec.fn && FUNCTION_COLORS[o.rec.fn]) m.color.set(FUNCTION_COLORS[o.rec.fn]);
      else m.color.copy(ud.baseColor);
      const org = ud.org;
      if (tint) {
        org.uTint.value.set(tint.color);
        org.uTintAmt.value = o.rec.pack === "skeleton" && (o.tint === "select" || o.tint === "target") ? 0.035 : tint.amt;
        const c = new Color(tint.color);
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
  setExplode(f2, animate = true) {
    f2 = Math.max(0, Math.min(1, f2));
    this.explodeWanted = f2;
    if (this.motionActive) f2 = 0;
    if (!animate || this.reducedMotion) {
      this.explode = f2;
      this.explodeAnim = null;
      this.positionExploded();
      return;
    }
    this.explodeAnim = { from: this.explode, to: f2, t0: performance.now(), dur: 450 };
    this.invalidate();
  }
  setMotionActive(on) {
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
  updateExplodeTargets() {
    const box = new Box3();
    for (const o of this.objects.values()) if (o.root.visible && o.layer !== "attachments") box.union(o.box);
    if (!box.isEmpty()) {
      box.getCenter(this.explodePivot);
      this.sceneBox.copy(box);
    }
    this.positionExploded();
  }
  positionExploded() {
    const f2 = this.explode;
    for (const o of this.objects.values()) {
      if (!o.root.matrixAutoUpdate) continue;
      if (f2 === 0) {
        o.root.position.copy(o.basePos);
      } else {
        const d = this._v.copy(o.center).sub(this.explodePivot);
        let src = o;
        if (o.layer === "attachments" && o.rec.path) {
          const bone = this.boneOf(o);
          if (bone) src = bone;
          d.copy(src.center).sub(this.explodePivot);
        }
        o.root.position.copy(o.basePos).addScaledVector(d, f2 * 1.15);
      }
      o.root.updateMatrixWorld(true);
    }
    this.shadowKey = "";
    this.invalidate();
  }
  registerAttachmentBone(attId, boneId) {
    this.attachBone.set(attId, boneId);
  }
  boneOf(o) {
    const b = this.attachBone.get(o.rec.id);
    return b ? this.objects.get(b) : void 0;
  }
  /** Current world position of a point on a structure, taking explode offset and motion into account. */
  worldPointOn(id2, p) {
    const m = this.motion.boneMatrix(id2);
    if (m) return p.clone().applyMatrix4(m);
    const o = this.objects.get(id2);
    if (!o) return p.clone();
    return p.clone().add(this._v.copy(o.root.position).sub(o.basePos));
  }
  // ------------------------------------------------------------------ clipping
  setClip(c) {
    const was = this.clip !== null;
    this.clip = c;
    this.updateClip();
    if (was !== (c !== null)) for (const o of this.objects.values()) this.applyLook(o);
    this.shadowKey = "";
    this.invalidate();
  }
  updateClip() {
    if (!this.clip) {
      this.renderer.clippingPlanes = [];
      return;
    }
    const b = this.sceneBox.isEmpty() ? new Box3(new Vector3(-0.5, 0, -0.2), new Vector3(0.5, 1.8, 0.2)) : this.sceneBox;
    const axis = this.clip.axis === "sagittal" ? 0 : this.clip.axis === "transverse" ? 1 : 2;
    const n = new Vector3();
    n.setComponent(axis, this.clip.flip ? 1 : -1);
    const lo = b.min.getComponent(axis), hi = b.max.getComponent(axis);
    const at = lo + (hi - lo) * this.clip.t;
    this.clipPlane.set(n, this.clip.flip ? -at : at);
    this.renderer.clippingPlanes = [this.clipPlane];
  }
  // ------------------------------------------------------------------ camera
  frameIds(ids, opts = {}) {
    const box = new Box3();
    for (const id2 of ids) {
      const o = this.objects.get(id2);
      if (!o) continue;
      const b = o.box.clone().translate(this._v.copy(o.root.position).sub(o.basePos));
      box.union(b);
    }
    if (box.isEmpty()) return;
    this.frameBox(box, opts);
  }
  frameVisible(opts = {}) {
    const box = new Box3();
    for (const o of this.objects.values()) if (o.root.visible && o.layer !== "attachments") box.union(o.box.clone().translate(this._v.copy(o.root.position).sub(o.basePos)));
    if (!box.isEmpty()) this.frameBox(box, opts);
  }
  frameBox(box, opts = {}) {
    const sphere = box.getBoundingSphere(new Sphere());
    const r = Math.max(sphere.radius * (opts.pad ?? 1.08), 0.02);
    const freeH = Math.max(120, this.container.clientHeight - this.insets.bottom - this.insets.top);
    const vfov = 2 * Math.atan(Math.tan(MathUtils.degToRad(this.camera.fov) / 2) * (freeH / Math.max(1, this.container.clientHeight)));
    const freeW = Math.max(120, this.container.clientWidth - this.insets.left - this.insets.right);
    const hfov = 2 * Math.atan(Math.tan(MathUtils.degToRad(this.camera.fov) / 2) * (freeW / Math.max(1, this.container.clientHeight)));
    const fov = Math.min(vfov, hfov);
    const dist = r / Math.sin(fov / 2);
    const dir = (opts.dir ?? this.camera.position.clone().sub(this.controls.target)).clone().normalize();
    if (dir.lengthSq() < 1e-6) dir.set(0, 0, 1);
    this.flyTo(sphere.center.clone().addScaledVector(dir, dist), sphere.center.clone(), opts.instant);
  }
  /** Look at a surface point along its normal (used for landmark pins). Returns where the camera ends up. */
  framePoint(p, n, dist = 0.16, instant = false) {
    const dir = n.clone().normalize();
    if (Math.abs(dir.y) > 0.85) dir.y = Math.sign(dir.y) * 0.85;
    dir.normalize();
    const freeH = Math.max(120, this.container.clientHeight - this.insets.bottom - this.insets.top);
    const freeW = Math.max(120, this.container.clientWidth - this.insets.left - this.insets.right);
    const d = dist * Math.min(2.4, Math.max(1, freeH / freeW));
    const eye = p.clone().addScaledVector(dir, d);
    this.flyTo(eye, p.clone(), instant);
    return eye;
  }
  /**
   * Whether another visible structure stands between a point and an eye position. `own` is the structure the
   * point lies on, which never counts.
   */
  covered(p, eye, own) {
    const back = p.clone().sub(eye);
    const dist = back.length();
    if (dist < 1e-4) return false;
    const cover = this.getPickables().filter((m) => m.userData.sid !== own);
    this.raycaster.firstHitOnly = true;
    this.raycaster.near = 0;
    this.raycaster.far = Math.max(0, dist - 2e-3);
    this.raycaster.set(eye, back.normalize());
    const hit = this.raycaster.intersectObjects(cover, false).length > 0;
    this.raycaster.far = Infinity;
    return hit;
  }
  view(name) {
    const t = this.controls.target.clone();
    const d = this.camera.position.distanceTo(t);
    const dir = {
      anterior: new Vector3(0, 0, 1),
      posterior: new Vector3(0, 0, -1),
      left: new Vector3(1, 0, 0),
      right: new Vector3(-1, 0, 0),
      superior: new Vector3(0, 1, 1e-3),
      inferior: new Vector3(0, -1, 1e-3)
    }[name];
    this.flyTo(t.clone().addScaledVector(dir, d), t);
  }
  flyTo(pos, target, instant = false) {
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
  setLandmarks(list, highlightKey = null) {
    if (this.lmMesh) {
      this.world.remove(this.lmMesh);
      this.lmMesh.geometry.dispose();
      this.lmMesh.material.dispose();
      this.lmMesh = null;
    }
    this.lmList = list;
    this.lmHighlight = highlightKey;
    this.setLandmarkAreas(list, highlightKey);
    if (!list.length) {
      this.invalidate();
      return;
    }
    const geo = new SphereGeometry(21e-4, 16, 12);
    const mat = withGlow(new MeshStandardMaterial({ color: "#ffffff", roughness: 0.3, metalness: 0, emissive: "#ffffff", emissiveIntensity: 0.55 }), 0.25, true);
    const im = new InstancedMesh(geo, mat, list.length);
    im.renderOrder = 5;
    this.lmMesh = im;
    this.updateLandmarkMatrices();
    this.world.add(im);
    this.invalidate();
  }
  updateLandmarkMatrices() {
    if (!this.lmMesh) return;
    const m = new Matrix4();
    const c = new Color();
    const nv = new Vector3();
    this.lmList.forEach((l, i) => {
      const bm = this.motion.boneMatrix(l.on);
      nv.set(l.n[0], l.n[1], l.n[2]);
      if (bm) nv.transformDirection(bm);
      const hi = l.k === this.lmHighlight;
      const p = this.worldPointOn(l.on, new Vector3(...l.p)).addScaledVector(nv, 12e-4);
      const s = hi ? 1.5 : 1;
      m.makeScale(s, s, s).setPosition(p);
      this.lmMesh.setMatrixAt(i, m);
      this.lmMesh.setColorAt(i, c.set(LANDMARK_COLORS[landmarkKind(`${l.en} ${l.la ?? ""}`)]));
    });
    this.lmMesh.instanceMatrix.needsUpdate = true;
    if (this.lmMesh.instanceColor) this.lmMesh.instanceColor.needsUpdate = true;
    this.lmMesh.computeBoundingSphere();
    this.invalidate();
  }
  highlightLandmark(key) {
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
  setLandmarkAreas(list, highlightKey = null) {
    this.areaList = list;
    if (highlightKey !== this.areaHi) this.pulseUntil = performance.now() + 6e3;
    this.areaHi = highlightKey;
    this.areaKey = "";
    this.invalidate();
  }
  updateLandmarkAreas() {
    const t = this.controls.target;
    const key = `${this.areaList.length}:${this.areaHi}:${t.x.toFixed(2)},${t.y.toFixed(2)},${t.z.toFixed(2)}:${this.visVersion}`;
    if (key === this.areaKey) return;
    this.areaKey = key;
    for (const o of this.areaOwners) for (const m of o.mats) m.userData.org.uLmBits.value = 0;
    this.areaOwners = [];
    this.areaHiShown = false;
    if (!this.areaList.length) return;
    const tv = new Vector3(), pv = new Vector3();
    tv.copy(t);
    const cand = this.areaList.filter((l) => this.objects.get(l.on)?.root.visible).map((l) => ({ l, d: l.k === this.areaHi ? -1 : pv.set(l.p[0], l.p[1], l.p[2]).distanceToSquared(tv) })).sort((a, b) => a.d - b.d).slice(0, LM_SLOTS);
    const bits = /* @__PURE__ */ new Map();
    const col = new Color();
    cand.forEach(({ l }, i) => {
      const o = this.objects.get(l.on);
      const kind = landmarkKind(`${l.en} ${l.la ?? ""}`);
      const hi = l.k === this.areaHi;
      if (hi) this.areaHiShown = true;
      LM.pos.value[i].set(l.p[0], l.p[1], l.p[2], landmarkRadius(kind, o.radius) * (hi ? 1.1 : this.areaHi ? 0.7 : 0.85));
      col.set(LANDMARK_COLORS[kind]);
      LM.col.value[i].set(col.r, col.g, col.b, hi ? 1 : 0);
      const n = pv.set(l.n[0], l.n[1], l.n[2]);
      const ok = n.lengthSq() > 0.5;
      n.normalize();
      LM.nrm.value[i].set(n.x, n.y, n.z, ok ? 1 : 0);
      bits.set(o, (bits.get(o) ?? 0) | 1 << i);
    });
    for (const [o, b] of bits) {
      for (const m of o.mats) m.userData.org.uLmBits.value = b | 0;
      this.areaOwners.push(o);
    }
  }
  /** OSPE-style pin stuck into a surface point. */
  setPin(p, n, color = PIN, size = 1) {
    if (this.pin) {
      this.world.remove(this.pin);
      this.pin.traverse((o) => {
        const m = o;
        if (m.isMesh) {
          m.geometry.dispose();
          m.material.dispose();
        }
      });
      this.pin = null;
    }
    if (!p || !n) {
      this.invalidate();
      return;
    }
    const len = 0.028 * size;
    const g = new Group();
    const needle = new Mesh(
      new CylinderGeometry(45e-5 * size, 25e-5 * size, len, 12),
      new MeshStandardMaterial({ color: "#dfe3ea", metalness: 1, roughness: 0.22 })
    );
    needle.position.y = len / 2 - 2e-3;
    const head = new Mesh(
      new SphereGeometry(34e-4 * size, 28, 20),
      withGlow(new MeshPhysicalMaterial({ color, roughness: 0.25, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08, emissive: color, emissiveIntensity: 0.6 }), 0.9)
    );
    head.position.y = len;
    g.add(needle, head);
    g.position.copy(p);
    g.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), n.clone().normalize());
    g.renderOrder = 6;
    this.world.add(g);
    this.pin = g;
    g.updateMatrixWorld(true);
    this.pinHead.copy(head.getWorldPosition(new Vector3()));
    this.invalidate();
  }
  getPinHead() {
    return this.pin ? this.pinHead.clone() : null;
  }
  /** Screen position (CSS px) of a world point and whether something blocks the view of it. */
  project(p, testOcclusion = false) {
    const v = p.clone().project(this.camera);
    const w = this.container.clientWidth, h = this.container.clientHeight;
    const out = { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h, behind: v.z > 1, occluded: false };
    if (testOcclusion && !out.behind) {
      const dir = p.clone().sub(this.camera.position);
      const dist = dir.length();
      this.raycaster.set(this.camera.position, dir.normalize());
      if (this.clip && this.clipPlane.distanceToPoint(p) < -2e-3) out.occluded = true;
      else if (this.limitRayToCut()) {
        this.raycaster.far = Math.min(this.raycaster.far, dist - 4e-3);
        if (this.raycaster.far > this.raycaster.near) {
          this.raycaster.firstHitOnly = !this.clip;
          const hits = this.raycaster.intersectObjects(this.getPickables(), false);
          out.occluded = hits.some((h2) => this.keptByCut(h2.point) && !this.isGhostMesh(h2.object));
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
  limitRayToCut() {
    this.raycaster.near = 0;
    this.raycaster.far = Infinity;
    if (!this.clip) return true;
    const ray = this.raycaster.ray;
    const d0 = this.clipPlane.distanceToPoint(ray.origin);
    const dn = this.clipPlane.normal.dot(ray.direction);
    if (Math.abs(dn) < 1e-9) return d0 >= 0;
    const t = -d0 / dn;
    if (d0 >= 0) {
      if (dn < 0) this.raycaster.far = t;
    } else {
      if (dn < 0) return false;
      this.raycaster.near = t;
    }
    return true;
  }
  keptByCut(p) {
    return !this.clip || this.clipPlane.distanceToPoint(p) >= -1e-4;
  }
  // ------------------------------------------------------------------ picking
  getPickables() {
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
  visibleShare(ids, dir, solid, samples = 30) {
    const target = new Set(ids);
    const meshes = [];
    for (const id2 of target) {
      const o = this.objects.get(id2);
      if (o && o.root.visible) meshes.push(...o.meshes);
    }
    if (!meshes.length) return 0;
    const pts = [];
    const per = Math.max(2, Math.ceil(samples / meshes.length));
    for (const m of meshes) {
      const pos = m.geometry.getAttribute("position");
      if (!pos) continue;
      m.updateMatrixWorld();
      const step = Math.max(1, Math.floor(pos.count / per));
      for (let i = step >> 1; i < pos.count && pts.length < samples * 2; i += step) pts.push(new Vector3().fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld));
    }
    if (!pts.length) return 0;
    const d = dir.clone().normalize();
    const back = d.clone().negate();
    const reach = 4;
    const cover = this.getPickables().filter((m) => {
      const sid = m.userData.sid;
      return !target.has(sid) && (!solid || solid(sid));
    });
    let seen2 = 0;
    this.raycaster.firstHitOnly = true;
    this.raycaster.near = 0;
    this.raycaster.far = reach - 3e-3;
    for (const p of pts) {
      this.raycaster.set(this._v.copy(p).addScaledVector(d, reach), back);
      if (!this.raycaster.intersectObjects(cover, false).length) seen2++;
    }
    this.raycaster.far = Infinity;
    return seen2 / pts.length;
  }
  isGhostMesh(obj) {
    const m = obj.material;
    return !!m && m.opacity < 0.2;
  }
  pickAt(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set((clientX - rect.left) / rect.width * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (!this.limitRayToCut()) {
      this.raycaster.near = 0;
      this.raycaster.far = Infinity;
      return null;
    }
    this.raycaster.firstHitOnly = !this.clip;
    const hits = this.raycaster.intersectObjects(this.getPickables(), false).filter((h) => this.keptByCut(h.point));
    const solid = hits.find((h) => !this.isGhostMesh(h.object)) ?? hits[0] ?? null;
    let lm = null;
    if (this.lmMesh) {
      this.raycaster.firstHitOnly = false;
      const lh = this.raycaster.intersectObject(this.lmMesh, false).filter((h) => this.keptByCut(h.point));
      if (lh.length && lh[0].instanceId !== void 0 && (!solid || this.isGhostMesh(solid.object) || lh[0].distance <= solid.distance + 4e-3)) lm = lh[0];
    }
    this.raycaster.near = 0;
    this.raycaster.far = Infinity;
    if (lm) {
      const l = this.lmList[lm.instanceId];
      return { id: l.on, point: lm.point, landmark: l };
    }
    if (!solid) return null;
    return { id: solid.object.userData.sid, point: solid.point };
  }
  bindPointer() {
    const el = this.renderer.domElement;
    el.addEventListener("pointerdown", (e) => {
      this.downAt = { x: e.clientX, y: e.clientY, t: performance.now() };
      this.camTween = null;
    });
    el.addEventListener("pointermove", (e) => {
      this.pointerInside = true;
      this.lastPointer = { x: e.clientX, y: e.clientY, type: e.pointerType };
      this.pointerMoved = true;
    });
    el.addEventListener("pointerleave", () => {
      this.pointerInside = false;
      this.emitHover(null, 0, 0);
    });
    el.addEventListener("pointerup", (e) => {
      const d = this.downAt;
      this.downAt = null;
      if (!d) return;
      const moved = Math.hypot(e.clientX - d.x, e.clientY - d.y);
      if (moved > 7 || performance.now() - d.t > 600) return;
      const hit = this.pickAt(e.clientX, e.clientY);
      const now = performance.now();
      if (now - this.lastTap < 320 && hit) {
        this.dblL.forEach((f2) => f2(hit));
        this.lastTap = 0;
        return;
      }
      this.lastTap = now;
      this.pickL.forEach((f2) => f2(hit));
    });
  }
  emitHover(id2, x, y, landmark) {
    const prev = this.hoverId;
    this.hoverId = id2;
    if (prev !== id2) {
      for (const pid of [prev, id2]) {
        if (!pid) continue;
        const o = this.objects.get(pid);
        if (!o) continue;
        const t = this.tintMap.get(pid) ?? (pid === id2 ? "hover" : "none");
        if (o.tint !== t) {
          o.tint = t;
          this.applyLook(o);
        }
      }
      this.invalidate();
    }
    this.hoverL.forEach((f2) => f2({ id: id2, x, y, landmark }));
  }
  onHover(f2) {
    this.hoverL.add(f2);
    return () => this.hoverL.delete(f2);
  }
  onPick(f2) {
    this.pickL.add(f2);
    return () => this.pickL.delete(f2);
  }
  onDoublePick(f2) {
    this.dblL.add(f2);
    return () => this.dblL.delete(f2);
  }
  onFrame(f2) {
    this.frameL.add(f2);
    return () => this.frameL.delete(f2);
  }
  // ------------------------------------------------------------------ rendering
  loop(now) {
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
    if (this.pointerMoved && this.pointerInside && !this.downAt && this.lastPointer && this.lastPointer.type === "mouse") {
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
    LM.time.value = now / 1e3;
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
    this.frameL.forEach((f2) => f2());
  }
  /** Frame-time feedback: step the resolution of moving frames down below ~45 fps, back up above ~57. */
  measure(now) {
    if (!this.effects.adaptive) return;
    if (this.lastWasFast && now - this.lastFrameAt < 150) {
      const dt = now - this.lastFrameAt;
      this.frameEMA += (dt - this.frameEMA) * 0.12;
      this.frameSamples++;
      if (this.frameSamples >= 24) {
        let s = this.fastScale;
        if (this.frameEMA > 1e3 / 45) s = Math.max(0.5, s * 0.86);
        else if (this.frameEMA < 1e3 / 57 && s < 1) s = Math.min(1, s * 1.08);
        this.frameSamples = 0;
        if (s !== this.fastScale) {
          this.fastScale = s;
          if (this.quality === "lite") this.applyLitePR(s);
        }
      }
    }
  }
  updateKeyLight() {
    const dir = this.keyDir.clone().applyQuaternion(this.camera.quaternion);
    const center = new Vector3();
    let radius = 1;
    if (!this.sceneBox.isEmpty()) {
      const s = this.sceneBox.getBoundingSphere(new Sphere());
      const camDist = this.camera.position.distanceTo(this.controls.target);
      const viewR = camDist * Math.tan(MathUtils.degToRad(this.camera.fov) / 2) * 1.6;
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
      cam.near = 5e-3;
      cam.far = reach * 2 + 0.1;
      cam.updateProjectionMatrix();
      const texel = 2 * radius / this.key.shadow.mapSize.x;
      this.key.shadow.normalBias = texel * 1.6;
    } else {
      this.key.position.copy(dir).multiplyScalar(3);
      this.key.target.position.set(0, 0, 0);
    }
    this.key.updateMatrixWorld();
    this.key.target.updateMatrixWorld();
  }
  renderFrame(full) {
    const r = this.renderer;
    this.camera.updateMatrixWorld();
    this.updateLandmarkAreas();
    this.updateKeyLight();
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
      if (!full && !live) this.shadowKey = "";
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
      if (ao > 0) this.post.runAO(MathUtils.clamp(camDist * 0.022, 6e-3, 0.05));
      r.shadowMap.needsUpdate = needShadow;
    }
    this.post.beginScene(full ? 1 : this.fastScale);
    r.render(this.scene, this.camera);
    const focus = this.focusPoint();
    const viewDir = new Vector3();
    this.camera.getWorldDirection(viewDir);
    const focusZ = Math.max(0.02, focus.p.clone().sub(this.camera.position).dot(viewDir));
    this.post.finish({
      scale: full ? 1 : this.fastScale,
      ao: ao * 0.85,
      dof: dof * 0.8,
      bloom: this.effects.bloom && this.hasGlow() ? 0.55 : 0,
      focusZ,
      focusRange: Math.max(focus.r, camDist * 0.03)
    });
  }
  focusPoint() {
    const box = new Box3();
    for (const [id2, t] of this.tintMap) {
      if (t !== "select" && t !== "target") continue;
      const o = this.objects.get(id2);
      if (o && o.root.visible) box.union(o.box.clone().translate(this._v.copy(o.root.position).sub(o.basePos)));
    }
    if (!box.isEmpty()) {
      const s = box.getBoundingSphere(new Sphere());
      return { p: s.center, r: s.radius * 0.8 };
    }
    return { p: this.controls.target.clone(), r: 0 };
  }
  hasGlow() {
    if (this.pin) return true;
    for (const t of this.tintMap.values()) if (t !== "hover" && t !== "none") return true;
    return false;
  }
  renderGBuffer() {
    const swaps = [];
    const hide = [];
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
    const extra = [];
    if (this.lmMesh) extra.push(this.lmMesh);
    this.pin?.traverse((x) => x.isMesh && extra.push(x));
    for (const m of extra) {
      swaps.push([m, m.material]);
      m.material = this.plainNormal;
    }
    this.post.beginGBuffer();
    this.renderer.render(this.scene, this.camera);
    for (const [m, mat] of swaps) m.material = mat;
    for (const h of hide) h.visible = true;
  }
  screenshot() {
    const f2 = this.fade;
    this.fade = 1;
    this.renderFrame(true);
    this.fade = f2;
    return this.renderer.domElement.toDataURL("image/png");
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
function principalAxis(mesh) {
  const pos = mesh.geometry.getAttribute("position");
  const n = pos.count;
  const step = Math.max(1, Math.floor(n / 1500));
  const v = new Vector3();
  const mean = new Vector3();
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
    xx += v.x * v.x;
    xy += v.x * v.y;
    xz += v.x * v.z;
    yy += v.y * v.y;
    yz += v.y * v.z;
    zz += v.z * v.z;
  }
  const a = new Vector3(0.3, 1, 0.2).normalize();
  const b = new Vector3();
  for (let k = 0; k < 24; k++) {
    b.set(xx * a.x + xy * a.y + xz * a.z, xy * a.x + yy * a.y + yz * a.z, xz * a.x + yz * a.y + zz * a.z);
    if (b.lengthSq() < 1e-20) break;
    a.copy(b.normalize());
  }
  return a;
}
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Engine,
  LANDMARK_COLORS,
  LANDMARK_KINDS,
  LANDMARK_KIND_LABELS,
  landmarkKind,
  landmarkRadius
}, Symbol.toStringTag, { value: "Module" }));
const json = async (url) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.json();
};
class DB {
  constructor(base) {
    this.structures = [];
    this.byId = /* @__PURE__ */ new Map();
    this.byKey = /* @__PURE__ */ new Map();
    this.groups = /* @__PURE__ */ new Map();
    this.groupByKey = /* @__PURE__ */ new Map();
    this.groupMembers = /* @__PURE__ */ new Map();
    this.landmarks = [];
    this.lmByBone = /* @__PURE__ */ new Map();
    this.lmByKey = /* @__PURE__ */ new Map();
    this.attachments = [];
    this.attByMuscle = /* @__PURE__ */ new Map();
    this.attByBone = /* @__PURE__ */ new Map();
    this.content = /* @__PURE__ */ new Map();
    this.cases = [];
    this.search = [];
    this.defs = null;
    this.i18n = null;
    this.parents = /* @__PURE__ */ new Map();
    this.parts = null;
    this.base = base;
  }
  async load() {
    const [cat, lms, atts, content, cases] = await Promise.all([
      json(`${this.base}data/catalog.json`),
      json(`${this.base}data/landmarks.json`),
      json(`${this.base}data/attachments.json`),
      json(`${this.base}data/content.json`).catch(() => []),
      json(`${this.base}data/cases.json`).catch(() => [])
    ]);
    this.ingest(cat, lms, atts, content, cases);
  }
  /** Fill the tables from the parsed data files. The tests call this with files read from disk. */
  ingest(cat, lms, atts, content, cases = []) {
    this.structures = cat.structures.map((s) => ({ ...s, en: fixParen(s.en) }));
    for (const s of this.structures) {
      this.byId.set(s.id, s);
      const arr = this.byKey.get(s.k) ?? [];
      arr.push(s);
      this.byKey.set(s.k, arr);
      for (const g of s.path) {
        const m = this.groupMembers.get(g) ?? [];
        m.push(s.id);
        this.groupMembers.set(g, m);
      }
    }
    for (const [name, g] of Object.entries(cat.groups)) {
      this.groups.set(name, g);
      this.groupByKey.set(g.k, name);
    }
    this.landmarks = lms.map((l) => ({ ...l, en: fixParen(l.en) }));
    for (const l of this.landmarks) {
      push(this.lmByBone, l.on, l);
      push(this.lmByKey, l.k, l);
    }
    this.attachments = atts;
    for (const a of atts) {
      push(this.attByMuscle, a.m, a);
      if (a.bone) push(this.attByBone, a.bone, a);
    }
    for (const c of content) this.content.set(c.key, c);
    this.cases = Array.isArray(cases) ? cases : [];
    this.buildSearch();
  }
  // ------------------------------------------------------------------ names
  /** Best Latin name for a concept key. */
  latin(key) {
    const c = this.content.get(key);
    if (c?.la) return c.la;
    const s = this.byKey.get(key)?.[0];
    if (s?.la) return cleanLatin(s.la);
    const g = this.groupByKey.get(key);
    if (g && this.groups.get(g)?.la) return cleanLatin(this.groups.get(g).la);
    const l = this.lmByKey.get(key)?.[0];
    if (l?.la) return cleanLatin(l.la);
    return s?.en ?? l?.en ?? g ?? key;
  }
  english(key) {
    const c = this.content.get(key);
    if (c?.en) return c.en;
    return this.byKey.get(key)?.[0]?.en ?? this.lmByKey.get(key)?.[0]?.en ?? this.groupByKey.get(key) ?? key;
  }
  /** The "whole" concept a mesh belongs to: a muscle for a muscle head, a joint for a ligament. */
  parentConcept(s) {
    const known = this.parents.get(s.id);
    if (known !== void 0) return known;
    let found = null;
    const whole = this.content.get(s.k)?.kind === "muscle-part" ? this.content.get(s.k).facts?.muscle : void 0;
    if (typeof whole === "string" && this.content.get(whole)?.kind === "muscle") found = whole;
    for (let i = s.path.length - 1; !found && i >= Math.max(0, s.path.length - 2); i--) {
      const k = slug(s.path[i]);
      const c = this.content.get(k);
      if (c && (c.kind === "muscle" || c.kind === "joint" || c.kind === "bone" || c.kind === "organ") || i === s.path.length - 1 && /muscle$|^Gastrocnemius|^Quadriceps|^Triceps|joint$/i.test(s.path[i])) found = k;
    }
    this.parents.set(s.id, found);
    return found;
  }
  /** Meshes that are parts of a whole (the heads of a muscle, the ligaments of a joint). */
  partsOf(key) {
    if (!this.parts) {
      const m = /* @__PURE__ */ new Map();
      for (const s of this.structures) {
        if (s.pack === "attachments") continue;
        const p = this.parentConcept(s);
        if (p) push(m, p, s);
      }
      this.parts = m;
    }
    return this.parts.get(key) ?? [];
  }
  /** Name shown for a clicked mesh: the whole muscle for a muscle head, otherwise the mesh's own structure. */
  clickedName(s) {
    const p = this.parentConcept(s);
    return this.latin(p && this.content.get(p)?.kind === "muscle" ? p : s.k);
  }
  idsForKey(key) {
    const direct = this.byKey.get(key);
    if (direct?.length) return direct.map((s) => s.id);
    const g = this.groupByKey.get(key);
    if (g) return this.groupMembers.get(g) ?? [];
    return [];
  }
  /** Accepted Latin answers for a concept key (and its parent, when asked about a part). */
  answersFor(key, opts = {}) {
    const out = /* @__PURE__ */ new Set();
    const add = (k) => {
      const c = this.content.get(k);
      if (c) {
        out.add(c.la);
        c.alt?.forEach((a) => out.add(a));
        if (opts.english && c.en) out.add(c.en);
      }
      const s = this.byKey.get(k)?.[0];
      if (s?.la) out.add(cleanLatin(s.la));
      const l = this.lmByKey.get(k)?.[0];
      if (l?.la) out.add(cleanLatin(l.la));
      const g = this.groupByKey.get(k);
      if (g && this.groups.get(g)?.la) out.add(cleanLatin(this.groups.get(g).la));
      if (opts.english) {
        if (s?.en) out.add(s.en);
        if (l?.en) out.add(l.en);
      }
    };
    add(key);
    if (opts.includeParent) add(opts.includeParent);
    return [...out].filter(Boolean);
  }
  // ------------------------------------------------------------------ lazy extras
  async definitions() {
    if (!this.defs) this.defs = await json(`${this.base}data/definitions.json`).catch(() => ({}));
    return this.defs;
  }
  async otherLanguages() {
    if (!this.i18n) this.i18n = await json(`${this.base}data/names-i18n.json`).catch(() => ({}));
    return this.i18n;
  }
  // ------------------------------------------------------------------ search
  buildSearch() {
    const items = [];
    const seen2 = /* @__PURE__ */ new Set();
    const mk = (type, key, ids, kind) => {
      if (seen2.has(type + ":" + key)) return;
      seen2.add(type + ":" + key);
      const c = this.content.get(key);
      const la = this.latin(key);
      const en2 = this.english(key);
      const alt = c?.alt ?? [];
      const hay = [
        { s: norm(la), w: 3 },
        { s: norm(en2), w: 2.2 },
        ...alt.map((a) => ({ s: norm(a), w: 2.6 }))
      ];
      const s0 = this.byKey.get(key)?.[0];
      if (s0?.la && norm(cleanLatin(s0.la)) !== hay[0].s) hay.push({ s: norm(cleanLatin(s0.la)), w: 2.8 });
      items.push({ type, key, ids, la, en: en2, alt, kind: c?.kind ?? kind, hay });
    };
    for (const [k, list] of this.byKey) {
      const s = list[0];
      if (s.pack === "attachments") continue;
      mk("structure", k, list.map((x) => x.id), s.pack);
    }
    for (const [name, g] of this.groups) {
      const members = (this.groupMembers.get(name) ?? []).filter((id2) => this.byId.get(id2)?.pack !== "attachments");
      if (!members.length || members.length > 400) continue;
      if (this.byKey.has(g.k)) continue;
      mk("group", g.k, members, "group");
    }
    for (const [k, list] of this.lmByKey) mk("landmark", k, [...new Set(list.map((l) => l.on))], "landmark");
    for (const [k, c] of this.content) if (!this.byKey.has(k) && !this.lmByKey.has(k) && !this.groupByKey.has(k)) mk("concept", k, [], c.kind);
    this.search = items;
  }
  find(query, limit = 24) {
    const q = norm(query);
    if (!q) return [];
    const qt = q.split(" ");
    const scored = [];
    for (const it of this.search) {
      let best = 0;
      for (const h of it.hay) {
        if (!h.s) continue;
        let sc = 0;
        if (h.s === q) sc = 100;
        else if (h.s.startsWith(q)) sc = 80;
        else {
          const ft = h.s.split(" ");
          const allPrefix = qt.every((t) => ft.some((f2) => f2.startsWith(t)));
          if (allPrefix) sc = 62;
          else if (h.s.includes(q)) sc = 45;
          else if (q.length >= 4) {
            const fuzzy = qt.every((t) => t.length < 4 ? ft.some((f2) => f2.startsWith(t)) : ft.some((f2) => editDistance(f2.slice(0, t.length), t, 1) <= 1));
            if (fuzzy) sc = 28;
          }
        }
        if (sc) best = Math.max(best, sc * h.w - h.s.length * 0.05);
      }
      if (best > 0) {
        if (it.type === "structure" || it.type === "group") best += 4;
        if (this.content.has(it.key)) best += 6;
        scored.push({ it, sc: best });
      }
    }
    scored.sort((a, b) => b.sc - a.sc);
    return scored.slice(0, limit).map((x) => x.it);
  }
}
function push(m, k, v) {
  const a = m.get(k);
  if (a) a.push(v);
  else m.set(k, [v]);
}
function fixParen(n) {
  return n.split("(").length > n.split(")").length ? n + ")" : n;
}
function cleanLatin(s) {
  return s.replace(/^\(|\)$/g, "").replace(/\s+/g, " ").trim();
}
const en = {
  // navigation
  atlas: "Atlas",
  motion: "Motion",
  quiz: "Quiz",
  progress: "Progress",
  about: "About",
  menu: "Menu",
  mainNav: "Sections",
  // search
  searchPlaceholder: "Search the body",
  searchLabel: "Search structures in Latin, English or Indonesian",
  searchOpen: "Search",
  searchClose: "Close search",
  noResults: "Nothing matches. Try the Latin or the English name.",
  // header
  settings: "Settings",
  language: "Language",
  langNameEn: "English",
  langNameId: "Bahasa Indonesia",
  langSwitch: "Switch to Bahasa Indonesia",
  graphics: "Graphics",
  graphicsNow: "Graphics: {x}",
  tierUltra: "Ultra",
  tierHigh: "High",
  tierLite: "Lite",
  tierUltraHelp: "Full-resolution models with every effect",
  tierHighHelp: "Lighter models with soft shading",
  tierLiteHelp: "Simplest models, for older phones",
  tierReload: "Changing graphics reloads Raga.",
  effects: "Effects",
  fxShadows: "Shadows",
  fxShadowsHelp: "Structures cast soft shadows on one another.",
  fxDof: "Depth of field",
  fxDofHelp: "Softens what lies in front of and behind the focus.",
  fxBloom: "Glow",
  fxBloomHelp: "Selected and moving structures glow.",
  fxAo: "Ambient occlusion",
  fxAoHelp: "Darkens creases and contact points so depth reads better.",
  fxAdaptive: "Adaptive performance",
  fxAdaptiveHelp: "Lowers detail for a moment when the frame rate drops.",
  fxReset: "Use the defaults for this tier",
  fxUnavailable: "This version of the 3D engine has no separate effect switches yet.",
  tierAuto: "Auto",
  tierAutoHelp: "Picks the level this device can run smoothly",
  tierAutoNow: "Auto, now {x}",
  ctxLostStep: "The 3D view crashed, so Raga switched to {x} graphics. You can change this at the top of the page.",
  ctxLost: "The browser stopped the 3D view. Reload the page to bring it back.",
  ctxBack: "The 3D view is back.",
  reload: "Reload",
  // loading
  loadingModel: "Loading the skeleton",
  loadingLayer: "Loading",
  noWebgl: "This browser cannot draw 3D (WebGL is off or missing). Raga needs it to show the body.",
  hint: "Drag to turn the body. Scroll or pinch to zoom, right-drag or use two fingers to pan. Click a structure to read about it.",
  // depth gauge
  gauge: "Dissection depth",
  surface: "Surface",
  deep: "Deep",
  peelDepth: "Peel depth",
  peeledTo: "Peeled to {x}",
  adjust: "Adjust {x}",
  opacity: "Opacity",
  opacityOf: "Opacity of {x}",
  colourByAction: "Colour muscles by action",
  shown: "shown",
  hidden: "hidden",
  partly: "partly shown",
  loadedPct: "{n} percent loaded",
  layerFailed: "That layer did not load. Check the connection and try again.",
  // body map
  bodyMap: "Body map",
  regions: "Regions",
  wholeBody: "Whole body",
  showWholeBody: "Show the whole body",
  // instrument tray
  tools: "Instruments",
  explode: "Explode",
  explodeSpread: "Spread the parts apart",
  explodeLocked: "Explode is off while a movement is loaded.",
  cut: "Cut",
  cutPlane: "Cut plane",
  cutOff: "Off",
  sagittal: "Sagittal",
  coronal: "Coronal",
  transverse: "Transverse",
  cutPos: "Position of the cut",
  flip: "Flip side",
  xray: "X-ray",
  xrayHelp: "Fade everything except the selection",
  isolate: "Isolate",
  isolateHelp: "Show only the selection",
  endIsolate: "Show the rest again",
  side: "Side",
  both: "Both sides",
  rightOnly: "Right only",
  leftOnly: "Left only",
  views: "Views",
  anterior: "Front",
  posterior: "Back",
  lateralR: "Right side",
  lateralL: "Left side",
  superior: "Top",
  reset: "Reset",
  resetView: "Reset the view",
  undo: "Undo",
  undoHelp: "Undo the last hide, isolate or region",
  showAll: "Show all",
  showAllHelp: "Show everything again",
  photo: "Photo",
  photoHelp: "Save the view as an image",
  // specimen tag
  close: "Close",
  focus: "Focus",
  hide: "Hide",
  attachments: "Origin and insertion",
  quizMe: "Quiz me on this",
  playAction: "Play action",
  sheetHandle: "Resize the panel",
  showMore: "Show more",
  showLess: "Show less",
  rightSide: "right side (dexter)",
  leftSide: "left side (sinister)",
  landmarks: "Landmarks",
  lmLegend: "Colour key for landmarks",
  kindProcess: "Processes and tubercles",
  kindFossa: "Fossae and notches",
  kindLine: "Lines, borders and grooves",
  kindArticular: "Surfaces and facets",
  kindForamen: "Foramina",
  kindOther: "Other landmarks",
  attachLegend: "Colour key for muscle attachments",
  originLegend: "Origin",
  insertionLegend: "Insertion",
  parts: "Part",
  onBone: "On",
  partOf: "Part of",
  definition: "Encyclopedia text",
  definitionSource: "From Wikipedia, via Z-Anatomy (CC BY-SA).",
  otherLanguages: "Other languages",
  verifyFlag: "This entry is still being checked against the textbooks.",
  latin: "Latin",
  english: "English",
  origin: "Origin",
  insertion: "Insertion",
  action: "Action",
  nerve: "Innervation",
  blood: "Blood supply",
  group: "Group",
  type: "Type",
  skeleton: "Skeleton",
  articulates: "Articulates with",
  joint: "Joint",
  class: "Class",
  subtype: "Shape",
  axes: "Axes",
  surfaces: "Articular surfaces",
  movements: "Movements",
  ligaments: "Ligaments",
  roots: "Roots",
  from: "Arises from",
  course: "Course",
  branches: "Branches",
  supplies: "Supplies",
  drains: "Drains",
  motor: "Motor",
  sensory: "Sensory",
  lesion: "Lesion",
  location: "Location",
  features: "Features",
  relations: "Relations",
  clinical: "Clinical note",
  note: "Note",
  attach: "Attachments",
  function: "Function",
  // motion
  motionTitle: "Movements",
  motionIntro: "Choose a movement to see the muscles that produce it.",
  motionSide: "Side of the body",
  sideRight: "Right",
  sideLeft: "Left",
  play: "Play",
  pause: "Pause",
  stop: "Stop",
  loop: "Loop",
  speed: "Speed",
  scrub: "Point in the movement",
  angle: "Joint angle",
  upTo: "to {n}°",
  contracts: "Contracts",
  lengthens: "Lengthens",
  motionLoading: "Loading the muscles for this movement",
  motionBar: "Movement controls",
  // quiz
  chooseDeck: "Choose a practical",
  deckLede: "The decks follow the Blok 4 anatomy practicals at FK Unsri. Type the Latin name or switch to multiple choice. A small spelling slip still counts, with a note.",
  questions: "questions",
  dueShort: "due",
  mastered: "mastered",
  reviewDue: "Review due cards",
  reviewDueHelp: "Cards from every practical that are due again today.",
  mixedSession: "Mixed session",
  resumeTitle: "You have an unfinished session",
  resumeInfo: "{deck}, station {n} of {m}",
  resume: "Continue",
  discard: "Discard",
  resumeGone: "That session can no longer be opened.",
  practice: "Practice",
  exam: "OSPE simulation",
  practiceHelp: "Untimed. Cards you miss come back sooner.",
  examHelp: "Timed stations, no hints, results at the end.",
  mode: "Mode",
  answerMode: "Answer by",
  answerType: "Typing",
  answerTypeHelp: "Write the answer yourself, as in the OSPE.",
  answerChoice: "Multiple choice",
  answerChoiceHelp: "Pick one of the options. Easier on a phone.",
  questionTypes: "Question types",
  howMany: "Number of questions",
  start: "Start",
  startExam: "Start the OSPE",
  backToDecks: "Back to the practicals",
  station: "Station",
  of: "of",
  secondsLeft: "{n} seconds left",
  submit: "Check answer",
  next: "Next station",
  skip: "Skip",
  hintBtn: "Hint",
  finish: "See results",
  typeLatin: "Type the Latin name",
  typeAnswer: "Type the answer",
  chooseAnswer: "Choose the answer",
  stationLoading: "Loading the models for this station",
  stationFailed: "The models for this station did not load. Check the connection.",
  retry: "Try again",
  skipStation: "Skip this station",
  correct: "Correct",
  almost: "Correct, but check the spelling",
  wrong: "Not quite",
  timeUp: "Time is up",
  answerWas: "Answer",
  anyOf: "Any one of",
  youWrote: "You wrote",
  youChose: "You chose",
  explanation: "Explanation",
  seeInAtlas: "See it in the atlas",
  iWasRight: "Count it as correct",
  findWrong: "You clicked",
  clickModel: "Click the structure on the model.",
  results: "Results",
  score: "Score",
  percent: "{n} percent",
  answeredOf: "You answered {n} of {m} stations.",
  notScored: "not scored",
  reviewMistakes: "Practise the misses",
  emptyDeck: "This practical has no questions yet.",
  noQuestionsHere: "There are no questions about this structure yet.",
  qName: "Name the structure",
  qLandmark: "Name the landmark",
  qFind: "Find it on the model",
  qOrigin: "Origin",
  qInsertion: "Insertion",
  qNerve: "Innervation",
  qAction: "Action",
  qJoint: "Joint type",
  qBoneType: "Bone type",
  qRoots: "Nerve roots",
  qLmBone: "Bone of a landmark",
  qArticulates: "Articulating bones",
  qLigament: "Ligaments",
  qAxes: "Axes of movement",
  qFrom: "Parent vessel or nerve",
  qDrains: "Venous drainage",
  qContinues: "Continuation",
  qLobe: "Lobe of a segment",
  qCase: "Clinical case",
  promptName: "Name the highlighted structure.",
  promptLandmark: "Name the landmark at the pin.",
  promptFind: "Find this structure on the model.",
  promptOrigin: "Where does this muscle originate?",
  promptInsertion: "Where does this muscle insert?",
  promptNerve: "Which nerve supplies this muscle?",
  promptAction: "What is the main action of this muscle?",
  promptJoint: "What type of joint is this?",
  promptBoneType: "What type of bone is this, by shape?",
  promptRoots: "Which spinal roots form this nerve?",
  promptLmBone: "Which bone carries this landmark?",
  promptArticulates: "Name one bone that articulates with this bone.",
  promptLigament: "Name one ligament of this joint.",
  promptAxes: "Around how many axes does this joint move?",
  promptFromArtery: "What does this artery arise from?",
  promptFromNerve: "What does this nerve arise from?",
  promptFromBronchus: "What does this bronchus arise from?",
  promptDrains: "Into which vessel does this vein drain?",
  promptContinues: "What does this vessel continue as?",
  promptLobe: "Which lobe contains this segment?",
  quizSettings: "Answers",
  secondsPerStation: "Seconds per OSPE station",
  acceptEnglish: "Accept English answers",
  requireSide: "Require the side (dexter or sinister)",
  // progress
  progressTitle: "Your progress",
  progressEmpty: "Answer a few questions and your progress shows up here.",
  accuracy: "Accuracy",
  practical: "Practical",
  colQuestions: "Questions",
  colDue: "Due",
  colNew: "New",
  colMastered: "Mastered",
  weakest: "Cards you miss most",
  resetProgress: "Reset progress",
  resetConfirm: "Delete all quiz progress on this device?",
  // about
  aboutTitle: "About Raga",
  credits: "Sources and licences",
  sourceCode: "Source code on GitHub"
};
const id = {
  atlas: "Atlas",
  motion: "Gerak",
  quiz: "Kuis",
  progress: "Kemajuan",
  about: "Tentang",
  menu: "Menu",
  mainNav: "Bagian",
  searchPlaceholder: "Cari bagian tubuh",
  searchLabel: "Cari struktur dalam bahasa Latin, Inggris, atau Indonesia",
  searchOpen: "Cari",
  searchClose: "Tutup pencarian",
  noResults: "Tidak ada yang cocok. Coba nama Latin atau nama Inggrisnya.",
  settings: "Pengaturan",
  language: "Bahasa",
  langNameEn: "English",
  langNameId: "Bahasa Indonesia",
  langSwitch: "Ganti ke bahasa Inggris",
  graphics: "Grafis",
  graphicsNow: "Grafis: {x}",
  tierUltra: "Ultra",
  tierHigh: "Tinggi",
  tierLite: "Ringan",
  tierUltraHelp: "Model resolusi penuh dengan semua efek",
  tierHighHelp: "Model lebih ringan dengan bayangan halus",
  tierLiteHelp: "Model paling sederhana, untuk ponsel lama",
  tierReload: "Mengganti grafis akan memuat ulang Raga.",
  effects: "Efek",
  fxShadows: "Bayangan",
  fxShadowsHelp: "Struktur saling memberi bayangan lembut.",
  fxDof: "Kedalaman fokus",
  fxDofHelp: "Bagian di depan dan di belakang titik fokus dibuat lembut.",
  fxBloom: "Pendar",
  fxBloomHelp: "Struktur yang dipilih dan yang bergerak tampak berpendar.",
  fxAo: "Oklusi ambien",
  fxAoHelp: "Celah dan titik temu digelapkan agar kedalaman lebih jelas.",
  fxAdaptive: "Performa adaptif",
  fxAdaptiveHelp: "Detail diturunkan sesaat bila gambar mulai tersendat.",
  fxReset: "Kembalikan ke bawaan tingkat ini",
  fxUnavailable: "Versi mesin 3D ini belum memiliki pengaturan efek terpisah.",
  tierAuto: "Otomatis",
  tierAutoHelp: "Memilih tingkat yang dapat dijalankan perangkat ini dengan lancar",
  tierAutoNow: "Otomatis, sekarang {x}",
  ctxLostStep: "Tampilan 3D berhenti, sehingga Raga beralih ke grafis {x}. Anda dapat mengubahnya di bagian atas halaman.",
  ctxLost: "Peramban menghentikan tampilan 3D. Muat ulang halaman untuk menampilkannya kembali.",
  ctxBack: "Tampilan 3D sudah kembali.",
  reload: "Muat ulang",
  loadingModel: "Memuat kerangka",
  loadingLayer: "Memuat",
  noWebgl: "Peramban ini tidak dapat menampilkan 3D (WebGL mati atau tidak tersedia). Raga memerlukannya untuk menampilkan tubuh.",
  hint: "Seret untuk memutar tubuh. Gulir atau cubit untuk memperbesar, seret dengan tombol kanan atau dua jari untuk menggeser. Klik sebuah struktur untuk membaca penjelasannya.",
  gauge: "Kedalaman diseksi",
  surface: "Permukaan",
  deep: "Dalam",
  peelDepth: "Kedalaman kupasan",
  peeledTo: "Dikupas sampai {x}",
  adjust: "Atur {x}",
  opacity: "Opasitas",
  opacityOf: "Opasitas {x}",
  colourByAction: "Warnai otot menurut aksinya",
  shown: "tampil",
  hidden: "tersembunyi",
  partly: "tampil sebagian",
  loadedPct: "{n} persen dimuat",
  layerFailed: "Lapisan ini gagal dimuat. Periksa koneksi, lalu coba lagi.",
  bodyMap: "Peta tubuh",
  regions: "Regio",
  wholeBody: "Seluruh tubuh",
  showWholeBody: "Tampilkan seluruh tubuh",
  tools: "Instrumen",
  explode: "Urai",
  explodeSpread: "Renggangkan bagian-bagiannya",
  explodeLocked: "Urai tidak aktif selama sebuah gerakan dimuat.",
  cut: "Potong",
  cutPlane: "Bidang potong",
  cutOff: "Mati",
  sagittal: "Sagital",
  coronal: "Koronal",
  transverse: "Transversal",
  cutPos: "Letak potongan",
  flip: "Balik sisi",
  xray: "Tembus",
  xrayHelp: "Pudarkan semua kecuali yang dipilih",
  isolate: "Isolasi",
  isolateHelp: "Tampilkan yang dipilih saja",
  endIsolate: "Tampilkan kembali sisanya",
  side: "Sisi",
  both: "Kedua sisi",
  rightOnly: "Kanan saja",
  leftOnly: "Kiri saja",
  views: "Arah",
  anterior: "Depan",
  posterior: "Belakang",
  lateralR: "Sisi kanan",
  lateralL: "Sisi kiri",
  superior: "Atas",
  reset: "Awal",
  resetView: "Kembalikan tampilan awal",
  undo: "Urungkan",
  undoHelp: "Urungkan sembunyi, isolasi, atau regio terakhir",
  showAll: "Semua",
  showAllHelp: "Tampilkan semuanya kembali",
  photo: "Foto",
  photoHelp: "Simpan tampilan sebagai gambar",
  close: "Tutup",
  focus: "Fokus",
  hide: "Sembunyikan",
  attachments: "Origo dan insersio",
  quizMe: "Kuis tentang struktur ini",
  playAction: "Putar aksi",
  sheetHandle: "Ubah tinggi panel",
  showMore: "Tampilkan lebih banyak",
  showLess: "Ringkas",
  rightSide: "sisi kanan (dexter)",
  leftSide: "sisi kiri (sinister)",
  landmarks: "Penanda",
  lmLegend: "Keterangan warna penanda",
  kindProcess: "Prosesus dan tuberkulum",
  kindFossa: "Fossa dan insisura",
  kindLine: "Linea, margo, dan sulkus",
  kindArticular: "Permukaan (facies) dan faset",
  kindForamen: "Foramen",
  kindOther: "Penanda lain",
  attachLegend: "Keterangan warna perlekatan otot",
  originLegend: "Origo",
  insertionLegend: "Insersio",
  parts: "Bagian",
  onBone: "Pada",
  partOf: "Bagian dari",
  definition: "Teks ensiklopedia",
  definitionSource: "Dari Wikipedia, melalui Z-Anatomy (CC BY-SA).",
  otherLanguages: "Bahasa lain",
  verifyFlag: "Entri ini masih diperiksa ulang dengan buku ajar.",
  latin: "Latin",
  english: "Inggris",
  origin: "Origo",
  insertion: "Insersio",
  action: "Aksi",
  nerve: "Persarafan",
  blood: "Perdarahan",
  group: "Kelompok",
  type: "Jenis",
  skeleton: "Skeleton",
  articulates: "Bersendi dengan",
  joint: "Sendi",
  class: "Golongan",
  subtype: "Bentuk",
  axes: "Sumbu",
  surfaces: "Permukaan sendi",
  movements: "Gerakan",
  ligaments: "Ligamen",
  roots: "Radiks",
  from: "Berasal dari",
  course: "Perjalanan",
  branches: "Cabang",
  supplies: "Mendarahi",
  drains: "Mengalirkan",
  motor: "Motorik",
  sensory: "Sensorik",
  lesion: "Lesi",
  location: "Letak",
  features: "Ciri",
  relations: "Hubungan",
  clinical: "Catatan klinis",
  note: "Catatan",
  attach: "Perlekatan",
  function: "Fungsi",
  motionTitle: "Gerakan",
  motionIntro: "Pilih sebuah gerakan untuk melihat otot yang menghasilkannya.",
  motionSide: "Sisi tubuh",
  sideRight: "Kanan",
  sideLeft: "Kiri",
  play: "Putar",
  pause: "Jeda",
  stop: "Hentikan",
  loop: "Ulangi",
  speed: "Kecepatan",
  scrub: "Titik dalam gerakan",
  angle: "Sudut sendi",
  upTo: "sampai {n}°",
  contracts: "Berkontraksi",
  lengthens: "Memanjang",
  motionLoading: "Memuat otot untuk gerakan ini",
  motionBar: "Kendali gerakan",
  chooseDeck: "Pilih materi praktikum",
  deckLede: "Materi mengikuti praktikum anatomi Blok 4 FK Unsri. Ketik nama Latinnya atau gunakan pilihan ganda. Salah eja yang kecil tetap dihitung benar, disertai catatan.",
  questions: "soal",
  dueShort: "perlu diulang",
  mastered: "dikuasai",
  reviewDue: "Ulangi kartu yang perlu diulang",
  reviewDueHelp: "Kartu dari semua praktikum yang sudah waktunya diulang hari ini.",
  mixedSession: "Sesi campuran",
  resumeTitle: "Ada sesi yang belum selesai",
  resumeInfo: "{deck}, stase {n} dari {m}",
  resume: "Lanjutkan",
  discard: "Buang",
  resumeGone: "Sesi itu tidak dapat dibuka lagi.",
  practice: "Latihan",
  exam: "Simulasi OSPE",
  practiceHelp: "Tanpa batas waktu. Soal yang salah akan muncul lagi lebih cepat.",
  examHelp: "Stase berwaktu, tanpa petunjuk, hasil diberikan di akhir.",
  mode: "Mode",
  answerMode: "Cara menjawab",
  answerType: "Mengetik",
  answerTypeHelp: "Tulis sendiri jawabannya, seperti pada OSPE.",
  answerChoice: "Pilihan ganda",
  answerChoiceHelp: "Pilih salah satu jawaban. Lebih mudah di ponsel.",
  questionTypes: "Jenis soal",
  howMany: "Jumlah soal",
  start: "Mulai",
  startExam: "Mulai OSPE",
  backToDecks: "Kembali ke daftar praktikum",
  station: "Stase",
  of: "dari",
  secondsLeft: "sisa {n} detik",
  submit: "Periksa jawaban",
  next: "Stase berikutnya",
  skip: "Lewati",
  hintBtn: "Petunjuk",
  finish: "Lihat hasil",
  typeLatin: "Ketik nama Latinnya",
  typeAnswer: "Ketik jawabannya",
  chooseAnswer: "Pilih jawabannya",
  stationLoading: "Memuat model untuk stase ini",
  stationFailed: "Model untuk stase ini gagal dimuat. Periksa koneksi Anda.",
  retry: "Coba lagi",
  skipStation: "Lewati stase ini",
  correct: "Benar",
  almost: "Benar, tetapi periksa ejaannya",
  wrong: "Belum tepat",
  timeUp: "Waktu habis",
  answerWas: "Jawaban",
  anyOf: "Salah satu dari",
  youWrote: "Jawaban Anda",
  youChose: "Pilihan Anda",
  explanation: "Penjelasan",
  seeInAtlas: "Lihat di atlas",
  iWasRight: "Hitung sebagai benar",
  findWrong: "Yang Anda klik",
  clickModel: "Klik strukturnya pada model.",
  results: "Hasil",
  score: "Nilai",
  percent: "{n} persen",
  answeredOf: "Anda menjawab {n} dari {m} stase.",
  notScored: "tidak dinilai",
  reviewMistakes: "Latih yang salah",
  emptyDeck: "Praktikum ini belum memiliki soal.",
  noQuestionsHere: "Belum ada soal tentang struktur ini.",
  qName: "Sebutkan strukturnya",
  qLandmark: "Sebutkan penanda tulangnya",
  qFind: "Temukan pada model",
  qOrigin: "Origo",
  qInsertion: "Insersio",
  qNerve: "Persarafan",
  qAction: "Aksi",
  qJoint: "Jenis sendi",
  qBoneType: "Jenis tulang",
  qRoots: "Radiks saraf",
  qLmBone: "Tulang tempat penanda",
  qArticulates: "Tulang yang bersendi",
  qLigament: "Ligamen",
  qAxes: "Sumbu gerak",
  qFrom: "Asal percabangan",
  qDrains: "Muara vena",
  qContinues: "Lanjutan pembuluh",
  qLobe: "Lobus segmen",
  qCase: "Kasus klinis",
  promptName: "Sebutkan struktur yang ditandai.",
  promptLandmark: "Sebutkan penanda tulang yang ditunjuk jarum.",
  promptFind: "Temukan struktur ini pada model.",
  promptOrigin: "Di mana origo otot ini?",
  promptInsertion: "Di mana insersio otot ini?",
  promptNerve: "Saraf apa yang mempersarafi otot ini?",
  promptAction: "Apa aksi utama otot ini?",
  promptJoint: "Termasuk jenis sendi apakah ini?",
  promptBoneType: "Menurut bentuknya, termasuk jenis tulang apakah ini?",
  promptRoots: "Dari radiks mana saraf ini berasal?",
  promptLmBone: "Penanda ini terdapat pada tulang apa?",
  promptArticulates: "Sebutkan satu tulang yang bersendi dengan tulang ini.",
  promptLigament: "Sebutkan satu ligamen pada sendi ini.",
  promptAxes: "Sendi ini bergerak pada berapa sumbu?",
  promptFromArtery: "Arteri ini berasal dari mana?",
  promptFromNerve: "Saraf ini berasal dari mana?",
  promptFromBronchus: "Bronkus ini berasal dari mana?",
  promptDrains: "Vena ini bermuara ke pembuluh apa?",
  promptContinues: "Pembuluh ini berlanjut sebagai apa?",
  promptLobe: "Segmen ini termasuk lobus yang mana?",
  quizSettings: "Jawaban",
  secondsPerStation: "Detik per stase OSPE",
  acceptEnglish: "Terima jawaban dalam bahasa Inggris",
  requireSide: "Wajib menyebut sisi (dexter atau sinister)",
  progressTitle: "Kemajuan Anda",
  progressEmpty: "Jawablah beberapa soal, lalu kemajuan Anda akan tampil di sini.",
  accuracy: "Ketepatan",
  practical: "Praktikum",
  colQuestions: "Soal",
  colDue: "Perlu diulang",
  colNew: "Baru",
  colMastered: "Dikuasai",
  weakest: "Soal yang paling sering salah",
  resetProgress: "Hapus kemajuan",
  resetConfirm: "Hapus semua kemajuan kuis di perangkat ini?",
  aboutTitle: "Tentang Raga",
  credits: "Sumber dan lisensi",
  sourceCode: "Kode sumber di GitHub"
};
const STRINGS = { en, id };
function fmt(s, vars) {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
function gpuName() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return "";
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = String(info && gl.getParameter(info.UNMASKED_RENDERER_WEBGL) || gl.getParameter(gl.RENDERER) || "");
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return name.toLowerCase();
  } catch {
    return "";
  }
}
function deviceHints() {
  const nav = navigator;
  return {
    gpu: gpuName(),
    memory: typeof nav.deviceMemory === "number" ? nav.deviceMemory : void 0,
    cores: nav.hardwareConcurrency || 4,
    touch: !!window.matchMedia?.("(pointer: coarse)").matches,
    shortSide: Math.min(window.screen?.width || 1024, window.screen?.height || 768)
  };
}
const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render/;
const STRONG = /nvidia|geforce|rtx|gtx|quadro|radeon (rx|pro)|radeon\(tm\) (rx|pro)|apple m\d|arc\(tm\) a\d|arc a\d/;
function tierFor(h) {
  if (SOFTWARE.test(h.gpu)) return "lite";
  const lowMemory = h.memory !== void 0 && h.memory <= 4;
  if (h.touch) {
    if (lowMemory || h.cores <= 4 || h.shortSide < 600 && h.cores <= 6) return "lite";
    return "high";
  }
  if (lowMemory || h.cores <= 4) return "high";
  if (STRONG.test(h.gpu)) return "ultra";
  return h.cores >= 12 && (h.memory ?? 0) >= 8 ? "ultra" : "high";
}
let cached = null;
function autoTier() {
  if (cached) return cached;
  try {
    cached = tierFor(deviceHints());
  } catch {
    cached = "high";
  }
  return cached;
}
function lowerTier(q) {
  return q === "ultra" ? "high" : q === "high" ? "lite" : null;
}
const QUALITIES = ["ultra", "high", "lite"];
const EFFECT_KEYS = ["shadows", "dof", "bloom", "ao", "adaptive"];
const TIER_EFFECTS = {
  ultra: { shadows: true, dof: true, bloom: true, ao: true, adaptive: true },
  high: { shadows: true, dof: false, bloom: true, ao: true, adaptive: true },
  lite: { shadows: false, dof: false, bloom: false, ao: false, adaptive: true }
};
const Ctx = reactExports.createContext(null);
function useApp() {
  const c = reactExports.useContext(Ctx);
  if (!c) throw new Error("App context missing");
  return c;
}
const SKEY = "raga.settings.v1";
const NOTICE = "raga.notice.v1";
function loadSettings() {
  const def = {
    lang: typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("id") ? "id" : "en",
    quality: "high",
    autoQuality: true,
    effects: {},
    acceptEnglish: false,
    requireSide: false,
    examSeconds: 60,
    answerMode: "type"
  };
  let s = def;
  try {
    const raw = JSON.parse(localStorage.getItem(SKEY) || "{}");
    s = { ...def, ...raw };
    if (typeof raw.autoQuality !== "boolean") s.autoQuality = !raw.quality || raw.quality === "ultra";
    if (!QUALITIES.includes(s.quality)) s.autoQuality = true;
    if (s.lang !== "en" && s.lang !== "id") s.lang = def.lang;
    if (!s.effects || typeof s.effects !== "object") s.effects = {};
    if (s.answerMode !== "choice") s.answerMode = "type";
    if (!Number.isFinite(s.examSeconds)) s.examSeconds = 60;
    s.examSeconds = Math.max(15, Math.min(300, Math.round(s.examSeconds)));
  } catch {
    s = def;
  }
  if (s.autoQuality) s.quality = autoTier();
  return s;
}
function saveSettings(s) {
  try {
    localStorage.setItem(SKEY, JSON.stringify(s));
  } catch {
  }
}
function setNotice(key) {
  try {
    localStorage.setItem(NOTICE, key);
  } catch {
  }
}
function takeNotice() {
  try {
    const v = localStorage.getItem(NOTICE);
    if (v) localStorage.removeItem(NOTICE);
    return v;
  } catch {
    return null;
  }
}
const COMPACT_QUERY = "(max-width: 720px), (max-height: 520px)";
function useMedia(query) {
  const get = () => typeof window !== "undefined" && !!window.matchMedia?.(query).matches;
  const [on, setOn] = reactExports.useState(get);
  reactExports.useEffect(() => {
    const m = window.matchMedia?.(query);
    if (!m) return;
    const f2 = () => setOn(m.matches);
    f2();
    m.addEventListener?.("change", f2);
    return () => m.removeEventListener?.("change", f2);
  }, [query]);
  return on;
}
function useDismiss(open, close, refs) {
  const cb = reactExports.useRef(close);
  cb.current = close;
  reactExports.useEffect(() => {
    if (!open) return;
    const down = (e) => {
      const tgt = e.target;
      if (refs.some((r) => r.current?.contains(tgt))) return;
      cb.current();
    };
    const key = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        cb.current();
      }
    };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("keydown", key, true);
    return () => {
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("keydown", key, true);
    };
  }, [open]);
}
function useLongPress(onLong, ms = 480) {
  const timer = reactExports.useRef(null);
  const start = reactExports.useRef(null);
  const fired = reactExports.useRef(false);
  const clear = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };
  return {
    fired,
    handlers: {
      onPointerDown: (e) => {
        if (e.pointerType === "mouse") return;
        fired.current = false;
        start.current = { x: e.clientX, y: e.clientY };
        clear();
        timer.current = window.setTimeout(() => {
          fired.current = true;
          onLong();
        }, ms);
      },
      onPointerMove: (e) => {
        if (!start.current) return;
        if (Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > 8) clear();
      },
      onPointerUp: clear,
      onPointerCancel: clear,
      onContextMenu: (e) => {
        if (fired.current) e.preventDefault();
      }
    }
  };
}
const prefersReducedMotion = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const F = { fill: "currentColor", stroke: "none" };
const S = ({ children, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: className ?? "ico", "aria-hidden": "true", focusable: "false", children });
const IconSearch = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10.5", cy: "10.5", r: "6", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 15l4.8 4.8", ...P })
] });
const IconClose = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(S, { ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.5 6.5l11 11M17.5 6.5l-11 11", ...P }) });
const IconSliders = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 8h3.2M10.8 8H20M4 16h9.2M16.8 16H20", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "8", r: "1.9", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "15", cy: "16", r: "1.9", ...P })
] });
const IconChevron = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(S, { ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 10l5 5 5-5", ...P }) });
const IconExplode = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "5.5", height: "5.5", rx: "1.4", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "15.5", y: "3", width: "5.5", height: "5.5", rx: "1.4", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "15.5", width: "5.5", height: "5.5", rx: "1.4", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "15.5", y: "15.5", width: "5.5", height: "5.5", rx: "1.4", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "1.3", ...F })
] });
const IconCut = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12.5a7 7 0 0 1 14 0", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "12", cy: "12.5", rx: "7", ry: "2.6", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.5 12.5h1M20.5 12.5h1", ...P })
] });
const IconXray = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "8", ...P, strokeDasharray: "1.6 2.6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3.2", ...F })
] });
const IconIsolate = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "2.6", ...F })
] });
const IconSide = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "8", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 4a8 8 0 0 0 0 16z", fill: "currentColor", opacity: ".38" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 4v16", ...P })
] });
const IconViews = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 3.2l7.6 4.3v9L12 20.8l-7.6-4.3v-9z", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.4 7.5L12 11.8l7.6-4.3M12 11.8v9", ...P })
] });
const IconReset = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5.2 13.5A7 7 0 1 0 7 7.3", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.6 3.8L7 7.3l3.4-.5", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "1.4", ...F })
] });
const IconUndo = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 6.5L5 10.5l4 4", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 10.5h9.5a4.5 4.5 0 0 1 0 9H12", ...P })
] });
const IconEye = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6z", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "2.8", ...P })
] });
const IconEyeOff = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6z", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.5 19.5l15-15", ...P })
] });
const IconCamera = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 8.5h3.2l1.6-2.5h6.4l1.6 2.5H20v10H4z", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "13.2", r: "3.3", ...P })
] });
const IconFigure = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "4.6", r: "2.1", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8.2 9.2c1.2-.8 2.4-1.1 3.8-1.1s2.6.3 3.8 1.1M7.4 14.5l.8-5.3M16.6 14.5l-.8-5.3M10 8.3l-.6 6.4L10 21M14 8.3l.6 6.4L14 21M12 15v6", ...P })
] });
const IconPlay = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(S, { ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8.5 5.8v12.4a.8.8 0 0 0 1.2.7l10-6.2a.8.8 0 0 0 0-1.4l-10-6.2a.8.8 0 0 0-1.2.7z", ...F }) });
const IconPause = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "7", y: "5.5", width: "3.4", height: "13", rx: "1", ...F }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "13.6", y: "5.5", width: "3.4", height: "13", rx: "1", ...F })
] });
const IconStop = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(S, { ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "6.5", y: "6.5", width: "11", height: "11", rx: "2", ...F }) });
const IconLoop = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.5 4.5l3 3-3 3", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.5 7.5H9a5 5 0 0 0-5 5", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7.5 19.5l-3-3 3-3", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.5 16.5H15a5 5 0 0 0 5-5", ...P })
] });
const IconCheck = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(S, { ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12.8l4.4 4.2L19 7.4", ...P, strokeWidth: 2 }) });
const IconCross = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(S, { ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 7l10 10M17 7L7 17", ...P, strokeWidth: 2 }) });
const IconFocus = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "5.5", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.8v3.4M12 17.8v3.4M2.8 12h3.4M17.8 12h3.4", ...P })
] });
const IconAttach = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "5.8", cy: "17.6", r: "2", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18.2", cy: "6.4", r: "2", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7.4 16.1c1.6-1.2 2.2-4.3 4.4-5.6 2.2-1.3 3.4-1.4 4.8-2.7", ...P })
] });
const IconPin = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(S, { ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "16.2", cy: "7.8", r: "3.4", ...P }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.8 10.2L5 19", ...P })
] });
const IconGithub = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(S, { ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3.4a3 3 0 00-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.6 4.6 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6 0C6.1 2.6 5.1 2.9 5.1 2.9a4.3 4.3 0 00-.1 3.2 4.6 4.6 0 00-1.3 3.2c0 4.6 2.8 5.6 5.5 6a3 3 0 00-.8 2.3V21", ...P }) });
const Mark = ({ className }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 28 28", className: className ?? "mark", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "rotate(-22 14 14)", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2.6", y: "8.6", width: "22.8", height: "10.8", rx: "1.7", fill: "rgba(246,243,255,.08)", stroke: "#d2cbf2", strokeWidth: "1.1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.3 8.6h4.9v10.8H4.3a1.7 1.7 0 0 1-1.7-1.7v-7.4a1.7 1.7 0 0 1 1.7-1.7z", fill: "#d2cbf2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "17.4", cy: "14", rx: "4.4", ry: "2.9", fill: "#ff5d8f" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18.7", cy: "13.3", r: "1.15", fill: "#2a2178" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "15.6", cy: "14.9", r: ".8", fill: "#2a2178" })
] }) });
const tierName = (t, q) => q === "ultra" ? t.tierUltra : q === "high" ? t.tierHigh : t.tierLite;
const tierHelp = (t, q) => q === "ultra" ? t.tierUltraHelp : q === "high" ? t.tierHighHelp : t.tierLiteHelp;
function switchTier(settings, setSettings, q) {
  const next = q === "auto" ? autoTier() : q;
  if (next === settings.quality) {
    setSettings({ autoQuality: q === "auto" });
    return;
  }
  setSettings({ quality: next, autoQuality: q === "auto", effects: {} });
  window.setTimeout(() => window.location.reload(), 60);
}
function QualitySwitch({ t, settings, setSettings }) {
  const [open, setOpen] = reactExports.useState(false);
  const btn = reactExports.useRef(null);
  const menu = reactExports.useRef(null);
  useDismiss(open, () => setOpen(false), [btn, menu]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "qswitch", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ref: btn,
        className: "hdr-btn",
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-label": fmt(t.graphicsNow, { x: settings.autoQuality ? fmt(t.tierAutoNow, { x: tierName(t, settings.quality) }) : tierName(t, settings.quality) }),
        onClick: () => setOpen(!open),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "q-pips", "aria-hidden": "true", "data-q": settings.quality, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", {})
          ] }),
          settings.autoQuality ? t.tierAuto : tierName(t, settings.quality)
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: menu, className: "menu glass", role: "menu", "aria-label": t.graphics, children: [
      ["auto", ...QUALITIES].map((q) => {
        const on = q === "auto" ? settings.autoQuality : !settings.autoQuality && settings.quality === q;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            role: "menuitemradio",
            "aria-checked": on,
            className: "menu-item",
            onClick: () => {
              setOpen(false);
              if (!on) switchTier(settings, setSettings, q);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-mark", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                q === "auto" ? t.tierAuto : tierName(t, q),
                /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: q === "auto" ? `${t.tierAutoHelp} (${tierName(t, autoTier())})` : tierHelp(t, q) })
              ] })
            ]
          },
          q
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "menu-note", children: t.tierReload })
    ] })
  ] });
}
function Header(p) {
  const { t, settings } = p;
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const menuBtn = reactExports.useRef(null);
  const menuRef = reactExports.useRef(null);
  useDismiss(menuOpen, () => setMenuOpen(false), [menuBtn, menuRef]);
  const modes = ["atlas", ...p.motionAvailable ? ["motion"] : [], "quiz", "progress", "about"];
  const label = (m) => t[m];
  const langBtn = /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "hdr-btn lang", onClick: () => p.setSettings({ lang: settings.lang === "en" ? "id" : "en" }), "aria-label": `${t.language}: ${settings.lang === "en" ? t.langNameEn : t.langNameId}. ${t.langSwitch}`, children: settings.lang === "en" ? "EN" : "ID" });
  if (p.compact)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "hdr glass settle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { ref: menuBtn, className: "wordmark", "aria-haspopup": "menu", "aria-expanded": menuOpen, onClick: () => setMenuOpen(!menuOpen), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mark, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wordmark-name", children: "Raga" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wordmark-mode", children: label(p.mode) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconChevron, { className: "ico chev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hdr-space" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "hdr-btn icon", "aria-label": t.searchOpen, onClick: p.onSearchOpen, disabled: !p.search, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QualitySwitch, { t, settings, setSettings: p.setSettings }),
      menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: menuRef, className: "menu glass nav-menu", role: "menu", "aria-label": t.mainNav, children: [
        modes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            role: "menuitemradio",
            "aria-checked": p.mode === m,
            className: "menu-item",
            onClick: () => {
              setMenuOpen(false);
              p.onMode(m);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-mark", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label(m) })
            ]
          },
          m
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "menu-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn small",
              role: "menuitem",
              onClick: () => {
                setMenuOpen(false);
                p.onSettings();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IconSliders, {}),
                " ",
                t.settings
              ]
            }
          ),
          langBtn
        ] })
      ] })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "hdr glass settle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "wordmark", onClick: () => p.onMode("atlas"), "aria-label": `Raga, ${t.atlas}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mark, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wordmark-name", children: "Raga" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hdr-nav", "aria-label": t.mainNav, children: modes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "nav-item", "aria-current": p.mode === m ? "page" : void 0, onClick: () => p.onMode(m), children: label(m) }, m)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hdr-search", children: p.search }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QualitySwitch, { t, settings, setSettings: p.setSettings }),
    langBtn,
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "hdr-btn icon", "aria-label": t.settings, title: t.settings, onClick: p.onSettings, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSliders, {}) })
  ] });
}
const KIND_LABEL$1 = {
  skeleton: { en: "Bone", id: "Tulang" },
  bone: { en: "Bone", id: "Tulang" },
  landmark: { en: "Landmark", id: "Penanda" },
  joints: { en: "Joint part", id: "Bagian sendi" },
  joint: { en: "Joint", id: "Sendi" },
  ligament: { en: "Ligament", id: "Ligamen" },
  muscles: { en: "Muscle", id: "Otot" },
  muscle: { en: "Muscle", id: "Otot" },
  "muscle-part": { en: "Muscle part", id: "Bagian otot" },
  vessels: { en: "Vessel", id: "Pembuluh" },
  artery: { en: "Artery", id: "Arteri" },
  vein: { en: "Vein", id: "Vena" },
  nerves: { en: "Nerve", id: "Saraf" },
  nerve: { en: "Nerve", id: "Saraf" },
  viscera: { en: "Organ", id: "Organ" },
  organ: { en: "Organ", id: "Organ" },
  lymphoid: { en: "Lymphoid", id: "Limfoid" },
  skin: { en: "Region", id: "Regio" },
  group: { en: "Group", id: "Kelompok" },
  cartilage: { en: "Cartilage", id: "Kartilago" }
};
function Search({ onPick, overlay, onClose }) {
  const { db, t, settings } = useApp();
  const [q, setQ] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState(0);
  const listId = reactExports.useId();
  const inputRef = reactExports.useRef(null);
  const results = reactExports.useMemo(() => q.trim().length >= 2 ? db.find(q, 24) : [], [q, db]);
  reactExports.useEffect(() => setActive(0), [q]);
  reactExports.useEffect(() => {
    if (overlay) inputRef.current?.focus();
  }, [overlay]);
  reactExports.useEffect(() => {
    if (overlay) return;
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlay]);
  const choose = (it) => {
    onPick(it);
    setOpen(false);
    setQ("");
    inputRef.current?.blur();
    onClose?.();
  };
  const expanded = open && q.trim().length >= 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `search ${overlay ? "overlay" : ""}`, role: "search", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, { className: "ico search-ico" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "search",
        value: q,
        placeholder: t.searchPlaceholder,
        "aria-label": t.searchLabel,
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-expanded": expanded,
        "aria-controls": listId,
        "aria-activedescendant": expanded && results[active] ? `${listId}-${active}` : void 0,
        autoComplete: "off",
        autoCapitalize: "off",
        spellCheck: false,
        onChange: (e) => {
          setQ(e.target.value);
          setOpen(true);
        },
        onFocus: () => setOpen(true),
        onBlur: () => window.setTimeout(() => setOpen(false), 150),
        onKeyDown: (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(results.length - 1, a + 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          } else if (e.key === "Enter" && results[active]) {
            e.preventDefault();
            choose(results[active]);
          } else if (e.key === "Escape") {
            if (q) setQ("");
            else {
              setOpen(false);
              e.target.blur();
              onClose?.();
            }
          }
        }
      }
    ),
    !overlay && !q && /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "search-key", "aria-hidden": "true", children: "/" }),
    overlay && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn search-close", "aria-label": t.searchClose, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClose, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "results glass", id: listId, role: "listbox", "aria-label": t.searchLabel, hidden: !expanded, children: [
      expanded && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "results-empty", children: t.noResults }),
      expanded && results.map((it, i) => {
        const k = KIND_LABEL$1[it.kind] ?? KIND_LABEL$1[it.type] ?? { en: "", id: "" };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            id: `${listId}-${i}`,
            role: "option",
            "aria-selected": i === active,
            className: "result",
            onMouseDown: (e) => e.preventDefault(),
            onClick: () => choose(it),
            onMouseEnter: () => setActive(i),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: it.la }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "result-kind", children: settings.lang === "id" ? k.id : k.en }),
              it.en && it.en !== it.la && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "result-en", children: it.en })
            ]
          },
          it.type + it.key
        );
      })
    ] })
  ] });
}
const STOPS = [
  { id: "cutis", la: "Cutis", en: "Skin", idn: "Kulit", layers: ["skin"], peel: { en: "Cover with skin", id: "Tutup dengan kulit" } },
  { id: "fasciae", la: "Fasciae", en: "Fasciae", idn: "Fascia", layers: ["fasciae"], peel: { en: "Peel to fasciae", id: "Kupas sampai fascia" } },
  { id: "musculi", la: "Musculi", en: "Muscles", idn: "Otot", layers: ["muscles"], peel: { en: "Peel to muscles", id: "Kupas sampai otot" } },
  { id: "vasa", la: "Vasa", en: "Vessels", idn: "Pembuluh", layers: ["arteries", "veins"], peel: { en: "Peel to vessels", id: "Kupas sampai pembuluh" } },
  { id: "nervi", la: "Nervi", en: "Nerves", idn: "Saraf", layers: ["nerves"], peel: { en: "Peel to nerves", id: "Kupas sampai saraf" } },
  { id: "viscera", la: "Viscera", en: "Organs", idn: "Organ dalam", layers: ["heart", "respiratory", "organs", "lymphoid"], peel: { en: "Peel to organs", id: "Kupas sampai organ dalam" } },
  { id: "juncturae", la: "Juncturae", en: "Joints", idn: "Sendi", layers: ["joints"], peel: { en: "Peel to joints", id: "Kupas sampai sendi" } },
  { id: "ossa", la: "Ossa", en: "Bones", idn: "Tulang", layers: ["skeleton"], peel: { en: "Peel to bones", id: "Kupas sampai tulang" } }
];
function stopState(layers, s) {
  const n = s.layers.filter((l) => layers[l]).length;
  return n === 0 ? "off" : n === s.layers.length ? "on" : "partial";
}
function depthOf(layers) {
  const i = STOPS.findIndex((s) => s.layers.some((l) => layers[l]));
  return i < 0 ? STOPS.length - 1 : i;
}
function peelPatch(layers, h) {
  const patch = {};
  STOPS.forEach((s, i) => {
    if (i < h) s.layers.forEach((l) => patch[l] = false);
  });
  const target = STOPS[h];
  if (!target.layers.some((l) => layers[l])) target.layers.forEach((l) => patch[l] = true);
  return patch;
}
function togglePatch(layers, s) {
  const on = s.layers.some((l) => layers[l]);
  return Object.fromEntries(s.layers.map((l) => [l, !on]));
}
function stopSwatch(s) {
  const cols = s.layers.map((l) => LAYERS.find((x) => x.id === l).swatch);
  if (cols.length === 1) return cols[0];
  const step = 360 / cols.length;
  return `conic-gradient(${cols.map((c, i) => `${c} ${i * step}deg ${(i + 1) * step}deg`).join(", ")})`;
}
const layerName = (id2, lang) => {
  const l = LAYERS.find((x) => x.id === id2);
  return lang === "id" ? l.idn : l.en;
};
const clamp$1 = (v, a, b) => Math.max(a, Math.min(b, v));
function DepthGauge(p) {
  const { t, settings, packProgress, compact } = useApp();
  const lang = settings.lang;
  const row = compact ? 34 : 40;
  const n = STOPS.length;
  const depth = depthOf(p.layers);
  const listRef = reactExports.useRef(null);
  const rootRef = reactExports.useRef(null);
  const popRef = reactExports.useRef(null);
  const layersRef = reactExports.useRef(p.layers);
  layersRef.current = p.layers;
  const [dragY, setDragY] = reactExports.useState(null);
  const lastPeel = reactExports.useRef(null);
  const pending = reactExports.useRef(null);
  const [pop, setPop] = reactExports.useState(null);
  const [flag, setFlag] = reactExports.useState(null);
  const flagTimer = reactExports.useRef(null);
  useDismiss(pop !== null, () => setPop(null), [popRef, rootRef]);
  const showFlag = (i, ms = 1300) => {
    if (!compact) return;
    setFlag(i);
    if (flagTimer.current) window.clearTimeout(flagTimer.current);
    flagTimer.current = window.setTimeout(() => setFlag(null), ms);
  };
  reactExports.useEffect(() => () => {
    if (flagTimer.current) window.clearTimeout(flagTimer.current);
  }, []);
  const peel = (h) => {
    const patch = peelPatch(layersRef.current, h);
    if (Object.keys(patch).length) p.onLayers(patch);
  };
  const dragTo = (clientY) => {
    const r = listRef.current.getBoundingClientRect();
    const y = clamp$1(clientY - r.top, 0, (n - 1) * row);
    setDragY(y);
    const h = clamp$1(Math.round(y / row), 0, n - 1);
    if (h !== lastPeel.current) {
      lastPeel.current = h;
      if (compact) setFlag(h);
      if (h >= depthOf(layersRef.current)) {
        peel(h);
        pending.current = null;
      } else pending.current = h;
    }
  };
  const onDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPeel.current = depth;
    dragTo(e.clientY);
  };
  const onMove = (e) => {
    if (dragY !== null) dragTo(e.clientY);
  };
  const onUp = () => {
    if (pending.current !== null) peel(pending.current);
    pending.current = null;
    setDragY(null);
    lastPeel.current = null;
    if (compact) showFlag(depthOf(layersRef.current), 900);
  };
  const onKey = (e) => {
    const go = (h) => {
      e.preventDefault();
      peel(clamp$1(h, 0, n - 1));
      showFlag(clamp$1(h, 0, n - 1));
    };
    if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") go(depth + 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") go(depth - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(n - 1);
  };
  const vern = (i) => lang === "id" ? STOPS[i].idn : STOPS[i].en;
  const handleY = dragY ?? depth * row;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: rootRef, className: "gauge glass settle", "aria-label": t.gauge, style: { ["--row"]: `${row}px` }, children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "gauge-end", children: t.surface }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gauge-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gauge-track", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "peeled", style: { top: row / 2, height: Math.max(0, handleY - row / 2) } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "kept", style: { top: Math.max(handleY, row / 2), height: Math.max(0, (n - 1) * row + row / 2 - Math.max(handleY, row / 2)) } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { ref: listRef, className: "gauge-stops", children: STOPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StopRow,
        {
          i,
          peeled: i < depth,
          state: stopState(p.layers, s),
          loading: s.layers.some((l) => p.layers[l] && (packProgress[LAYERS.find((x) => x.id === l).pack] ?? 1) < 1),
          progress: Math.min(...s.layers.map((l) => packProgress[LAYERS.find((x) => x.id === l).pack] ?? 1)),
          open: pop === i,
          compact,
          vern: vern(i),
          labels: { shown: t.shown, partly: t.partly, hidden: t.hidden, loadedPct: t.loadedPct, adjust: t.adjust },
          onToggle: () => {
            p.onLayers(togglePatch(layersRef.current, s));
            showFlag(i);
          },
          onAdjust: () => setPop((cur) => cur === i ? null : i)
        },
        s.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `gauge-handle ${dragY !== null ? "dragging" : ""}`,
          role: "slider",
          tabIndex: 0,
          "aria-label": t.peelDepth,
          "aria-orientation": "vertical",
          "aria-valuemin": 0,
          "aria-valuemax": n - 1,
          "aria-valuenow": depth,
          "aria-valuetext": fmt(t.peeledTo, { x: `${STOPS[depth].la}, ${vern(depth)}` }),
          style: { transform: `translateY(${handleY}px)` },
          onPointerDown: onDown,
          onPointerMove: onMove,
          onPointerUp: onUp,
          onPointerCancel: onUp,
          onKeyDown: onKey,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grip", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "blade", "aria-hidden": "true" })
          ]
        }
      ),
      flag !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gauge-flag glass", style: { top: flag * row + row / 2 }, "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: STOPS[flag].la }),
        " ",
        vern(flag)
      ] }),
      pop !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: popRef, className: "gauge-pop glass", role: "dialog", "aria-label": `${STOPS[pop].la}, ${vern(pop)}`, style: { top: pop * row }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pop-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: STOPS[pop].la }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vern(pop) })
        ] }),
        STOPS[pop].layers.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pop-layer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", role: "switch", checked: p.layers[l], onChange: (e) => p.onLayers({ [l]: e.target.checked }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "switch-track", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: layerName(l, lang) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              className: "range",
              min: 0.08,
              max: 1,
              step: 0.01,
              value: p.opacity[l],
              disabled: !p.layers[l],
              "aria-label": fmt(t.opacityOf, { x: layerName(l, lang) }),
              onChange: (e) => p.onOpacity(l, parseFloat(e.target.value))
            }
          )
        ] }, l)),
        STOPS[pop].id === "musculi" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", role: "switch", checked: p.colorMode === "function", onChange: (e) => p.onColorMode(e.target.checked ? "function" : "real") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "switch-track", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.colourByAction })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn",
            onClick: () => {
              peel(pop);
              setPop(null);
            },
            children: STOPS[pop].peel[lang]
          }
        )
      ] })
    ] }),
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "gauge-end", children: t.deep })
  ] });
}
function StopRow(r) {
  const s = STOPS[r.i];
  const long = useLongPress(r.onAdjust);
  const stateTxt = r.state === "on" ? r.labels.shown : r.state === "partial" ? r.labels.partly : r.labels.hidden;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "stop", "data-state": r.state, "data-peeled": r.peeled || void 0, "data-loading": r.loading || void 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "stop-btn",
        "aria-pressed": r.state !== "off",
        "aria-label": `${s.la}, ${r.vern}: ${stateTxt}${r.loading ? `, ${fmt(r.labels.loadedPct, { n: Math.round(r.progress * 100) })}` : ""}`,
        ...long.handlers,
        onClick: () => {
          if (long.fired.current) {
            long.fired.current = false;
            return;
          }
          r.onToggle();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stop-dot", style: { ["--sw"]: stopSwatch(s), ["--p"]: r.progress }, "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stop-names", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: s.la }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: r.vern })
          ] })
        ]
      }
    ),
    !r.compact && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "stop-adjust", "aria-label": fmt(r.labels.adjust, { x: s.la }), "aria-expanded": r.open, "aria-haspopup": "dialog", onClick: r.onAdjust, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSliders, {}) })
  ] });
}
const f = (n) => +n.toFixed(2);
function run(pts, move) {
  let d = move ? `M${f(pts[0][0])} ${f(pts[0][1])}` : "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}
const mirror = (pts) => pts.map(([x, y]) => [120 - x, y]);
const NECK = [[65.2, 29], [65.6, 34], [66.2, 38.6]];
const SHOULDER = [[66.2, 38.6], [72, 41.4], [79, 43.8], [84.2, 47.4], [86.6, 53]];
const ARM_LAT = [[86.6, 53], [88, 62], [89.2, 74], [90.6, 88], [93.2, 104], [95.8, 118], [97.6, 130]];
const THUMB = [[97.6, 130], [100.4, 134.6], [102.2, 140.4]];
const HAND = [[102.2, 140.4], [100.6, 141.8], [100.4, 147.5], [99.2, 154], [96.4, 158.2], [93.2, 156.8], [91.8, 149], [91.4, 140], [91.6, 132]];
const ARM_MED = [[91.6, 132], [89.6, 120], [86.8, 106], [84.6, 94], [82.6, 80], [80.6, 67], [78.6, 60.5]];
const TORSO = [[78.6, 60.5], [78.4, 70], [77, 82], [74.8, 94], [75.6, 104], [77.8, 114], [78.4, 124]];
const LEG_LAT = [[78.4, 124], [77.8, 138], [76.4, 152], [74.8, 166], [73.8, 176], [74.6, 188], [73.2, 202], [70.8, 214], [69.8, 219]];
const FOOT = [[69.8, 219], [71.4, 225], [74.6, 229.4], [74.4, 232.2], [68, 232.8], [63.2, 231.8], [62.6, 226], [63, 219]];
const LEG_MED = [[63, 219], [63.4, 206], [62.6, 192], [63.4, 178], [63.6, 164], [62.8, 150], [61.6, 138], [60, 131.5]];
const RIGHT_HALF = [NECK, SHOULDER, ARM_LAT, THUMB, HAND, ARM_MED, TORSO, LEG_LAT, FOOT, LEG_MED];
const OUTLINE = RIGHT_HALF.map((r, i) => run(r, i === 0)).join("") + [...RIGHT_HALF].reverse().map((r) => run(mirror([...r].reverse()), false)).join("");
const ARM_AREA = run(mirror([[79, 43.8], [84.2, 47.4], [86.6, 53]]), true) + run(mirror(ARM_LAT), false) + run(mirror(THUMB), false) + run(mirror(HAND), false) + run(mirror(ARM_MED), false) + "Z";
const LEG_AREA = run(mirror(LEG_LAT), true) + run(mirror(FOOT), false) + run(mirror(LEG_MED), false) + "L41.6 124Z";
const DETAIL = [
  "M61.6 42.4C67 41.4 74 43.6 80.4 45.6",
  "M58.4 42.4C53 41.4 46 43.6 39.6 45.6",
  // clavicles
  "M48.6 89.6Q54 79.6 60 77.2Q66 79.6 71.4 89.6",
  // costal margin
  "M77 113.6Q70 122 63.6 128.8",
  "M43 113.6Q50 122 56.4 128.8",
  // inguinal ligaments
  "M65.6 172.6q3-3.4 6 0",
  "M48.4 172.6q3-3.4 6 0"
  // patellae
];
const SPOTS = [
  { id: "head-neck", x: 60, y: 17 },
  { id: "larynx", x: 60, y: 35.6 },
  { id: "shoulder", x: 36, y: 50 },
  { id: "thorax", x: 55.2, y: 65.5 },
  { id: "heart", x: 65.2, y: 80 },
  { id: "arm", x: 32.8, y: 86 },
  { id: "forearm-hand", x: 28.6, y: 112 },
  { id: "hip", x: 60, y: 118 },
  { id: "hand", x: 24.2, y: 147.5 },
  { id: "knee", x: 51.3, y: 174 },
  { id: "leg-foot", x: 51.5, y: 196 },
  { id: "foot", x: 51.4, y: 227 }
];
function BodyMap({ region, onRegion, className }) {
  const { t, settings } = useApp();
  const [hover, setHover] = reactExports.useState(null);
  const name = (id2) => {
    const r = REGIONS.find((x) => x.id === id2);
    return settings.lang === "id" ? r.idn : r.en;
  };
  const active = region ?? "body";
  const key = (id2) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRegion(id2);
    }
  };
  const hot = (id2) => ({
    role: "button",
    tabIndex: 0,
    "aria-label": name(id2),
    "aria-pressed": active === id2,
    onClick: () => onRegion(id2),
    onKeyDown: key(id2),
    onPointerEnter: () => setHover(id2),
    onPointerLeave: () => setHover((h) => h === id2 ? null : h),
    onFocus: () => setHover(id2),
    onBlur: () => setHover((h) => h === id2 ? null : h)
  });
  const shown = hover ?? active;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `bodymap ${className ?? ""}`, "aria-label": t.bodyMap, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 120 240", className: "bodymap-fig", role: "group", "aria-label": t.regions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "60", cy: "19", rx: "9.6", ry: "12.2", className: "fig-line" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: OUTLINE, className: "fig-line" }),
      DETAIL.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d, className: "fig-detail" }, d)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: ARM_AREA, className: `limb ${active === "upper-limb" ? "on" : ""} ${hover === "upper-limb" ? "hover" : ""}`, ...hot("upper-limb") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: LEG_AREA, className: `limb ${active === "lower-limb" ? "on" : ""} ${hover === "lower-limb" ? "hover" : ""}`, ...hot("lower-limb") }),
      SPOTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: `spot ${active === s.id ? "on" : ""} ${hover === s.id ? "hover" : ""}`, ...hot(s.id), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: s.x, cy: s.y, r: "7.5", className: "spot-hit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: s.x, cy: s.y, r: "3.6", className: "spot-dot" })
      ] }, s.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bodymap-cap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bodymap-name", "aria-live": "polite", children: name(shown) }),
      active !== "body" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => onRegion("body"), children: t.showWholeBody })
    ] })
  ] });
}
const ORDER = ["peek", "half", "full"];
function Sheet({ h, onH, label, className, children, onRef }) {
  const el = reactExports.useRef(null);
  const drag = reactExports.useRef(null);
  const [live, setLive] = reactExports.useState(null);
  const heights = () => {
    const box = el.current;
    const cs = getComputedStyle(box);
    const px = (v) => parseFloat(cs.getPropertyValue(v)) || 0;
    return { peek: px("--sheet-peek"), half: px("--sheet-half"), full: px("--sheet-full") };
  };
  const down = (e) => {
    if (!el.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, h0: el.current.getBoundingClientRect().height, moved: false };
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const dy = d.y - e.clientY;
    if (Math.abs(dy) > 6) d.moved = true;
    if (!d.moved) return;
    const hs = heights();
    setLive(Math.max(hs.peek * 0.8, Math.min(hs.full, d.h0 + dy)));
  };
  const up = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      onH(ORDER[(ORDER.indexOf(h) + 1) % ORDER.length]);
      setLive(null);
      return;
    }
    const hs = heights();
    const cur = live ?? d.h0;
    const best = ORDER.reduce((a, b) => Math.abs(hs[b] - cur) < Math.abs(hs[a] - cur) ? b : a, h);
    onH(best);
    setLive(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      ref: (n) => {
        el.current = n;
        onRef?.(n);
      },
      className: `sheet glass ${className ?? ""} ${live !== null ? "dragging" : ""}`,
      "data-h": h,
      style: live !== null ? { height: live } : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "sheet-grip",
            "aria-label": label,
            "aria-expanded": h !== "peek",
            onPointerDown: down,
            onPointerMove: move,
            onPointerUp: up,
            onPointerCancel: up,
            onKeyDown: (e) => {
              if (e.key === "ArrowUp") onH(ORDER[Math.min(2, ORDER.indexOf(h) + 1)]);
              else if (e.key === "ArrowDown") onH(ORDER[Math.max(0, ORDER.indexOf(h) - 1)]);
              else return;
              e.preventDefault();
            },
            onClick: (e) => {
              if (e.detail === 0) onH(ORDER[(ORDER.indexOf(h) + 1) % ORDER.length]);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true" })
          }
        ),
        children
      ]
    }
  );
}
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/Raga/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const extras = (e) => e;
function motionPlayer(e) {
  if (!e) return null;
  try {
    const m = extras(e).motion;
    return m && typeof m.play === "function" && typeof m.state === "function" && typeof m.onTick === "function" ? m : null;
  } catch {
    return null;
  }
}
const motionFiles = /* @__PURE__ */ Object.assign({ "../engine/motion.ts": () => __vitePreload(() => Promise.resolve().then(() => __vite_glob_1_5), true ? void 0 : void 0) });
let motionModule = null;
function loadMotionModule() {
  if (!motionModule) {
    const load2 = motionFiles["../engine/motion.ts"];
    motionModule = load2 ? load2().then((m) => m && typeof m.clipsForKey === "function" && typeof m.jointClips === "function" ? m : null).catch(() => null) : Promise.resolve(null);
  }
  return motionModule;
}
function onContextLost(e, cb) {
  const f2 = extras(e).onContextLost;
  if (typeof f2 !== "function") return () => {
  };
  const off = f2.call(e, cb);
  return typeof off === "function" ? off : () => {
  };
}
function supportsEffects(e) {
  return !!e && typeof extras(e).setEffects === "function";
}
function tierEffects(e, q, fallback) {
  const base = { ...fallback[q] };
  if (!e) return base;
  try {
    const f2 = extras(e).getEffects;
    const got = typeof f2 === "function" ? f2.call(e) : void 0;
    if (got) {
      for (const k of Object.keys(base)) if (typeof got[k] === "boolean") base[k] = got[k];
    }
  } catch {
  }
  return base;
}
function applyEffects(e, fx) {
  if (!e) return;
  const f2 = extras(e).setEffects;
  if (typeof f2 === "function") {
    try {
      f2.call(e, fx);
    } catch {
    }
  }
}
const LM_KINDS = ["process", "fossa", "line", "articular", "foramen"];
const FALLBACK_COLORS = {
  process: "#f2b33d",
  fossa: "#3fc5e8",
  line: "#e07cf0",
  articular: "#9bd94b",
  foramen: "#f4f1ea",
  other: "#b3abdc"
};
const engineModules = Object.values([__vite_glob_1_0, __vite_glob_0_0, __vite_glob_1_2, __vite_glob_1_3, __vite_glob_1_4, __vite_glob_1_5, __vite_glob_1_6, __vite_glob_1_7, __vite_glob_1_8, __vite_glob_1_9]);
const kindModule = engineModules.find((m) => m && typeof m.landmarkKind === "function");
const colorTable = engineModules.find((m) => m && m.LANDMARK_COLORS && typeof m.LANDMARK_COLORS === "object")?.LANDMARK_COLORS;
function normKind(k) {
  const s = String(k ?? "").toLowerCase();
  if (!s) return null;
  if (/foram|canal|hole|meatus/.test(s)) return "foramen";
  if (/artic|joint|facet|surface/.test(s)) return "articular";
  if (/foss|notch|fovea|sulc|groove|depress|incis/.test(s)) return "fossa";
  if (/line|border|margin|crest|ridge|labi/.test(s)) return "line";
  if (/process|tuber|spine|promin|trochant|epicon|malleol|eminen/.test(s)) return "process";
  if (s === "other" || s === "none" || s === "part") return "other";
  return null;
}
function classifyByName(name) {
  const n = name.toLowerCase();
  if (/foramen|foramina|canalis|\bcanal\b|meatus|porus|hiatus|apertura|ostium/.test(n)) return "foramen";
  if (/epicondyl/.test(n)) return "process";
  if (/articular|condyl|trochlea|capitul|glenoid|acetabul|facet|caput (humeri|femoris|radii|ulnae|fibulae|costae|mandibulae|tali)|\bhead of|incisura (trochlearis|radialis|ulnaris)|(trochlear|radial|ulnar) notch/.test(n)) return "articular";
  if (/fossa|fovea|incisura|notch|sulcus|groove|impressio|recessus|depression/.test(n)) return "fossa";
  if (/linea|\bline\b|margo|margin|border|crista|crest|labium|\blip\b|angulus|\bangle\b|ridge/.test(n)) return "line";
  if (/process|tubercul|tubercle|tuberositas|tuberosity|\btuber\b|spina|spine|trochanter|malleol|protuberan|eminen|hamulus|cornu|\bhorn\b|olecranon|acromion|apex|styloid|coracoid/.test(n)) return "process";
  return "other";
}
function landmarkKindOf(lm, latin) {
  if (kindModule?.landmarkKind) {
    try {
      const k = normKind(kindModule.landmarkKind(`${lm.en} ${lm.la ?? ""}`));
      if (k) return k;
    } catch {
    }
  }
  return classifyByName(`${latin} ${lm.en}`);
}
function landmarkColor(kind) {
  if (colorTable) {
    for (const [k, v] of Object.entries(colorTable)) if (typeof v === "string" && normKind(k) === kind) return v;
  }
  return FALLBACK_COLORS[kind];
}
function setLandmarkAreas(e, list, highlight) {
  if (!e) return;
  const f2 = extras(e).setLandmarkAreas;
  if (typeof f2 === "function") {
    try {
      f2.call(e, list, highlight);
    } catch {
    }
  }
}
const KIND_LABEL = {
  process: "kindProcess",
  fossa: "kindFossa",
  line: "kindLine",
  articular: "kindArticular",
  foramen: "kindForamen",
  other: "kindOther"
};
function KindSwatch({ kind }) {
  const c = landmarkColor(kind);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 12 12", className: "swatch", "aria-hidden": "true", focusable: "false", children: [
    kind === "process" && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 1.4L10.8 10.2H1.2z", fill: c }),
    kind === "fossa" && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1.5 3.2a4.5 4.5 0 0 0 9 0z", fill: c }),
    kind === "line" && /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "4.6", width: "10", height: "2.8", rx: "1.4", fill: c }),
    kind === "articular" && /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1.6", y: "1.6", width: "8.8", height: "8.8", rx: "2.6", fill: c }),
    kind === "foramen" && /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "6", r: "3.7", fill: "none", stroke: c, strokeWidth: "2.2" }),
    kind === "other" && /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "6", r: "3.4", fill: c })
  ] });
}
function LandmarkLegend({ kinds }) {
  const { t } = useApp();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "key", "aria-label": t.lmLegend, children: (kinds ?? LM_KINDS).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(KindSwatch, { kind: k }),
    t[KIND_LABEL[k]]
  ] }, k)) });
}
function LandmarkGroups({ items, activeKey, onHover, onPick }) {
  const { db, t } = useApp();
  const dwell = reactExports.useRef(null);
  const groups = reactExports.useMemo(() => {
    const by = /* @__PURE__ */ new Map();
    for (const lm of items) {
      const k = landmarkKindOf(lm, db.latin(lm.k));
      by.set(k, [...by.get(k) ?? [], lm]);
    }
    return [...LM_KINDS, "other"].filter((k) => by.has(k)).map((k) => ({ kind: k, items: by.get(k).sort((a, b) => db.latin(a.k).localeCompare(db.latin(b.k))) }));
  }, [items, db]);
  if (!items.length) return null;
  const enter = (lm) => {
    onHover(lm, false);
    if (dwell.current) window.clearTimeout(dwell.current);
    dwell.current = window.setTimeout(() => onHover(lm, true), 480);
  };
  const leave = () => {
    if (dwell.current) window.clearTimeout(dwell.current);
    dwell.current = null;
    onHover(null, false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lm-groups", "aria-label": t.landmarks, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: t.landmarks }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LandmarkLegend, { kinds: groups.map((g) => g.kind).filter((k) => k !== "other") }),
    groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lm-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "lm-kind", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KindSwatch, { kind: g.kind }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t[KIND_LABEL[g.kind]] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: g.items.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chips", children: g.items.map((lm) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "chip lm latin",
          style: { ["--k"]: landmarkColor(g.kind) },
          "aria-pressed": activeKey === lm.k,
          onPointerEnter: (e) => e.pointerType === "mouse" && enter(lm),
          onPointerLeave: (e) => e.pointerType === "mouse" && leave(),
          onFocus: () => onHover(lm, false),
          onBlur: leave,
          onClick: () => {
            leave();
            onPick(lm);
          },
          children: db.latin(lm.k)
        },
        lm.k
      )) })
    ] }, g.kind))
  ] });
}
const KIND_NAMES = {
  bone: { en: "Bone", id: "Tulang" },
  landmark: { en: "Bone landmark", id: "Penanda tulang" },
  joint: { en: "Joint", id: "Sendi" },
  ligament: { en: "Ligament", id: "Ligamen" },
  membrane: { en: "Membrane", id: "Membran" },
  muscle: { en: "Muscle", id: "Otot" },
  "muscle-part": { en: "Part of a muscle", id: "Bagian otot" },
  tendon: { en: "Tendon", id: "Tendo" },
  bursa: { en: "Bursa", id: "Bursa" },
  fascia: { en: "Fascia", id: "Fascia" },
  artery: { en: "Artery", id: "Arteri" },
  vein: { en: "Vein", id: "Vena" },
  nerve: { en: "Nerve", id: "Saraf" },
  "plexus-part": { en: "Part of a plexus", id: "Bagian pleksus" },
  organ: { en: "Organ", id: "Organ" },
  "organ-part": { en: "Part of an organ", id: "Bagian organ" },
  cartilage: { en: "Cartilage", id: "Kartilago" },
  group: { en: "Group of structures", id: "Kelompok struktur" },
  skeleton: { en: "Bone", id: "Tulang" },
  joints: { en: "Joint structure", id: "Struktur sendi" },
  muscles: { en: "Muscle", id: "Otot" },
  vessels: { en: "Blood vessel", id: "Pembuluh darah" },
  nerves: { en: "Nerve", id: "Saraf" },
  viscera: { en: "Organ", id: "Organ" },
  lymphoid: { en: "Lymphoid organ", id: "Organ limfoid" },
  skin: { en: "Surface region", id: "Regio permukaan" },
  attachments: { en: "Muscle attachment", id: "Perlekatan otot" }
};
const FACT_ORDER = [
  ["group", "group"],
  ["type", "type"],
  ["skeleton", "skeleton"],
  ["class", "class"],
  ["subtype", "subtype"],
  ["complexity", "class"],
  ["axes", "axes"],
  ["bone", "onBone"],
  ["joint", "joint"],
  ["muscle", "partOf"],
  ["surfaces", "surfaces"],
  ["origin", "origin"],
  ["insertion", "insertion"],
  ["action", "action"],
  ["movements", "movements"],
  ["nerve", "nerve"],
  ["roots", "roots"],
  ["from", "from"],
  ["course", "course"],
  ["continues", "course"],
  ["branches", "branches"],
  ["motor", "motor"],
  ["sensory", "sensory"],
  ["supplies", "supplies"],
  ["drains", "drains"],
  ["blood", "blood"],
  ["articulates", "articulates"],
  ["ligaments", "ligaments"],
  ["discs", "surfaces"],
  ["attach", "attach"],
  ["function", "function"],
  ["location", "location"],
  ["features", "features"],
  ["relations", "relations"],
  ["stability", "note"],
  ["region", "location"],
  ["lesion", "lesion"],
  ["clinical", "clinical"],
  ["note", "note"]
];
const LATIN_VALUES = ["type", "skeleton", "class", "subtype", "complexity", "blood", "from", "continues", "surfaces", "discs"];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function SpecimenTag(p) {
  const { db, t, settings, engine, compact } = useApp();
  const lang = settings.lang;
  const [defs, setDefs] = reactExports.useState(null);
  const [i18n, setI18n] = reactExports.useState(null);
  const tagRef = reactExports.useRef(null);
  const lineRef = reactExports.useRef(null);
  const haloRef = reactExports.useRef(null);
  const dotRef = reactExports.useRef(null);
  const svgRef = reactExports.useRef(null);
  const sel = p.sel;
  reactExports.useEffect(() => {
    if (!sel) return;
    db.definitions().then(setDefs);
    db.otherLanguages().then(setI18n);
  }, [sel, db]);
  reactExports.useEffect(() => {
    const anchor = p.anchor;
    const svg = svgRef.current;
    if (!svg) return;
    let lastOcc = 0;
    let occluded = false;
    let lastTop = null;
    const hideLine = () => svg.classList.add("off");
    const update = () => {
      const tag = tagRef.current;
      const line = lineRef.current, halo = haloRef.current, dot = dotRef.current;
      if (!tag || !line || !halo || !dot) return;
      const stage = (svg.parentElement ?? svg).getBoundingClientRect();
      const vw = stage.width, vh = stage.height;
      let pt = null;
      if (anchor) {
        const o = engine.objects.get(anchor.id);
        if (o && o.root.visible) {
          const wp = o.root.localToWorld(anchor.local.clone());
          const now = performance.now();
          const test = anchor.surface && now - lastOcc > 140;
          const pr = engine.project(wp, test);
          if (test) {
            lastOcc = now;
            occluded = pr.occluded;
          }
          if (!pr.behind && pr.x > 2 && pr.x < vw - 2 && pr.y > 2 && pr.y < vh - 2) pt = { x: pr.x, y: pr.y };
        }
      }
      const r = tag.getBoundingClientRect();
      if (!compact) {
        const hdr = document.querySelector(".hdr")?.getBoundingClientRect();
        const minTop = (hdr ? hdr.bottom - stage.top : 64) + 12;
        let bottom = vh - 16;
        const tray = document.querySelector(".tray-dock")?.getBoundingClientRect();
        if (tray && tray.right > r.left && tray.left < r.right) bottom = Math.min(bottom, tray.top - stage.top - 12);
        const h = r.height;
        const desired = pt ? pt.y - 46 : lastTop ?? minTop;
        const top = clamp(desired, minTop, Math.max(minTop, bottom - h));
        lastTop = top;
        tag.style.transform = `translate3d(0, ${top.toFixed(1)}px, 0)`;
        tag.style.maxHeight = `${Math.max(160, bottom - minTop)}px`;
        const left = r.left - stage.left;
        if (pt && pt.x < left - 36) {
          const ey = clamp(pt.y, top + 30, top + h - 30);
          const kx = left - 30;
          const d = `M${pt.x.toFixed(1)} ${pt.y.toFixed(1)}L${kx.toFixed(1)} ${ey.toFixed(1)}L${left.toFixed(1)} ${ey.toFixed(1)}`;
          line.setAttribute("d", d);
          halo.setAttribute("d", d);
          dot.setAttribute("cx", pt.x.toFixed(1));
          dot.setAttribute("cy", pt.y.toFixed(1));
          svg.classList.remove("off");
          svg.classList.toggle("occluded", occluded);
        } else hideLine();
      } else {
        const sheetTop = r.top - stage.top;
        if (pt && pt.y < sheetTop - 28) {
          const ex = clamp(pt.x, 48, vw - 48);
          const ky = sheetTop - 22;
          const d = `M${pt.x.toFixed(1)} ${pt.y.toFixed(1)}L${ex.toFixed(1)} ${ky.toFixed(1)}L${ex.toFixed(1)} ${sheetTop.toFixed(1)}`;
          line.setAttribute("d", d);
          halo.setAttribute("d", d);
          dot.setAttribute("cx", pt.x.toFixed(1));
          dot.setAttribute("cy", pt.y.toFixed(1));
          svg.classList.remove("off");
          svg.classList.toggle("occluded", occluded);
        } else hideLine();
      }
    };
    const off = engine.onFrame(update);
    const ro = new ResizeObserver(() => engine.invalidate());
    if (tagRef.current) ro.observe(tagRef.current);
    engine.invalidate();
    requestAnimationFrame(update);
    if (!prefersReducedMotion()) {
      svg.classList.remove("draw");
      void svg.getBoundingClientRect();
      svg.classList.add("draw");
    }
    return () => {
      off();
      ro.disconnect();
    };
  }, [p.anchor, compact, engine, sel]);
  if (!sel) return null;
  let key;
  let partKey = null;
  let kindFallback = "organ";
  let sideTxt = "";
  let onBone = null;
  let enName = "";
  if (sel.type === "structure") {
    const rec = db.byId.get(sel.id);
    if (!rec) return null;
    const parent = db.parentConcept(rec);
    const pc = parent ? db.content.get(parent) : void 0;
    if (pc && pc.kind === "muscle" && parent !== rec.k) {
      key = parent;
      partKey = rec.k;
    } else key = rec.k;
    kindFallback = rec.pack;
    enName = rec.en;
    sideTxt = rec.side === "r" ? t.rightSide : rec.side === "l" ? t.leftSide : "";
  } else if (sel.type === "landmark") {
    key = sel.lm.k;
    kindFallback = "landmark";
    onBone = sel.lm.on;
    enName = sel.lm.en;
    sideTxt = sel.lm.side === "r" ? t.rightSide : sel.lm.side === "l" ? t.leftSide : "";
  } else {
    key = sel.key;
    kindFallback = db.content.get(key)?.kind ?? "group";
    enName = db.english(key);
  }
  const c = db.content.get(key);
  const part = partKey ? db.content.get(partKey) : void 0;
  const kind = c?.kind ?? kindFallback;
  const onOrgan = kind === "landmark" && !!onBone && db.byId.get(onBone)?.pack !== "skeleton";
  const kindName = onOrgan ? { en: "Landmark", id: "Penanda" } : KIND_NAMES[kind] ?? KIND_NAMES[kindFallback] ?? { en: "", id: "" };
  const latin = db.latin(key);
  const english = c?.en ?? (partKey ? db.english(key) : enName);
  const rec0 = sel.type === "structure" ? db.byId.get(sel.id) : void 0;
  const crumb = rec0 ? rec0.path.slice(-3) : [];
  const def = defs ? defs[slug(partKey ? db.english(partKey) : english)] ?? defs[key] : null;
  const other = i18n?.[partKey ?? key];
  const bi = (b) => typeof b === "string" ? b : b ? b[lang] ?? b.en ?? b.id ?? "" : "";
  const isBone = kind === "bone" || kindFallback === "skeleton";
  const isMuscle = kind === "muscle" || kind === "muscle-part" || kindFallback === "muscles";
  const boneId = sel.type === "structure" && isBone ? sel.id : sel.type === "landmark" ? sel.lm.on : null;
  const boneKey = boneId ? db.byId.get(boneId)?.k : void 0;
  const lmList = boneId ? dedupe((db.lmByBone.get(boneId) ?? []).filter((l) => !l.variant && l.k !== boneKey)) : [];
  const kindLine = [lang === "id" ? kindName.id : kindName.en, sideTxt].filter(Boolean).join(", ");
  const renderVal = (k, v) => {
    if (v === null || v === void 0 || v === "") return null;
    if (k === "origin" || k === "insertion") {
      const o = v;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        o.la && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: o.la }),
        o.en && lang === "en" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dd-sub", children: o.en })
      ] });
    }
    if (k === "nerve" && typeof v === "object" && !Array.isArray(v)) {
      const nv = v;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: nv.la }),
        nv.roots ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "num", children: [
          " (",
          nv.roots,
          ")"
        ] }) : ""
      ] });
    }
    if (k === "features" && Array.isArray(v)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chips", children: v.map((fk) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chip latin", onClick: () => sel.type === "structure" ? p.onLandmark(fk, sel.id) : p.onKey(fk), children: db.latin(fk) }, fk)) });
    }
    if ((k === "parts" || k === "joint" || k === "muscle" || k === "bone") && typeof v === "string") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link latin", onClick: () => p.onKey(v), children: db.latin(v) });
    }
    if (Array.isArray(v)) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ["motor", "branches", "ligaments", "articulates"].includes(k) ? "latin" : "", children: v.join(", ") });
    if (typeof v === "object") return bi(v) || null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: LATIN_VALUES.includes(k) ? "latin" : "", children: String(v) });
  };
  const facts = [];
  const fx = c?.facts ?? {};
  if (part?.facts) {
    const pf = part.facts;
    for (const k of ["origin", "insertion"]) {
      if (pf[k])
        facts.push(
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fact ${k}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { children: [
              t[k],
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "latin", children: [
                "(",
                db.latin(partKey),
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: renderVal(k, pf[k]) })
          ] }, "part-" + k)
        );
    }
  }
  for (const [k, labelKey] of FACT_ORDER) {
    if (!(k in fx)) continue;
    if (k === "bone" && sel.type === "landmark") continue;
    if (k === "features" && lmList.length) continue;
    const node = renderVal(k, fx[k]);
    if (!node) continue;
    facts.push(
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fact ${k}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: t[labelKey] ?? k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: node })
      ] }, k)
    );
  }
  const head = /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "tag-head", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "tag-title latin", children: latin }),
    english && english !== latin && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tag-en", children: english }),
    kindLine && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tag-kind", children: kindLine }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn tag-close", "aria-label": t.close, onClick: p.onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClose, {}) })
  ] });
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tag-body", children: [
    (partKey || onBone || crumb.length > 0 && !partKey) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tag-crumb", children: [
      partKey && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        t.parts,
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: db.latin(partKey) })
      ] }),
      onBone && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        t.onBone,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link latin", onClick: () => p.onKey(db.byId.get(onBone)?.k ?? onBone), children: db.latin(db.byId.get(onBone)?.k ?? onBone) })
      ] }),
      !partKey && !onBone && crumb.map((g, i) => {
        const gr = db.groups.get(g);
        const label = gr?.la ? cleanLatin(gr.la) : g;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "crumb", children: [
          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "crumb-sep", "aria-hidden": "true", children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link latin", onClick: () => p.onKey(slug(g)), children: label })
        ] }, g);
      })
    ] }),
    p.clips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tag-motion", children: p.clips.map((clip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "clip-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", "aria-pressed": p.playingId === clip.id, onClick: () => p.onPlayClip(clip), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlay, {}),
        " ",
        t.playAction
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin clip-name", children: clip.label.la })
    ] }, clip.id)) }),
    c?.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc", children: bi(c.desc) }),
    part?.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc sub", children: bi(part.desc) }),
    !c && english !== latin && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc sub", children: english }),
    lmList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(LandmarkGroups, { items: lmList, activeKey: sel.type === "landmark" ? sel.lm.k : null, onHover: p.onLandmarkHover, onPick: (lm) => p.onLandmark(lm.k, lm.on) }),
    p.attachOn && (isMuscle || isBone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "key", "aria-label": t.attachLegend, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "dot o", "aria-hidden": "true" }),
        t.originLegend
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "dot i", "aria-hidden": "true" }),
        t.insertionLegend
      ] })
    ] }),
    facts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "facts", children: facts }),
    c?.verify && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "verify", children: t.verifyFlag }),
    def && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "more", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { children: t.definition }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: def.t.replace(/https?:\/\/\S+/g, "").trim() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "source", children: [
        t.definitionSource,
        def.src && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: def.src, target: "_blank", rel: "noreferrer", children: def.src.replace(/^https?:\/\//, "") })
        ] })
      ] })
    ] }),
    other && Object.keys(other).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "more", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { children: t.otherLanguages }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "langs", children: Object.entries(other).map(([lg, nm]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: lg.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: nm })
      ] }, lg)) })
    ] })
  ] });
  const actions = /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "tag-actions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "tool", onClick: p.onFocus, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconFocus, {}),
      " ",
      t.focus
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "tool", onClick: p.onIsolate, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconIsolate, {}),
      " ",
      t.isolate
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "tool", onClick: p.onHide, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconEyeOff, {}),
      " ",
      t.hide
    ] }),
    (isMuscle || isBone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "tool", "aria-pressed": p.attachOn, onClick: p.onToggleAttach, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconAttach, {}),
      " ",
      t.attachments
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "tool", onClick: () => p.onQuiz(key), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconPin, {}),
      " ",
      t.quizMe
    ] })
  ] });
  const leader = /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ref: svgRef, className: "leader off", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { ref: haloRef, className: "leader-halo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { ref: lineRef, className: "leader-line" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { ref: dotRef, className: "leader-dot", r: "4.5" })
  ] });
  if (compact)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      leader,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { h: p.sheet, onH: p.onSheet, label: t.sheetHandle, className: "tag-sheet", onRef: (n) => tagRef.current = n, children: [
        head,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sheet-scroll", children: body }),
        actions
      ] })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    leader,
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { ref: (n) => tagRef.current = n, className: "tag glass", "aria-label": latin, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tag-in", children: [
      head,
      body,
      actions
    ] }, key + (sel.type === "structure" ? sel.id : "")) })
  ] });
}
function dedupe(a) {
  const s = /* @__PURE__ */ new Set();
  return a.filter((x) => s.has(x.k) ? false : (s.add(x.k), true));
}
function InstrumentTray(p) {
  const { t, compact } = useApp();
  const [pop, setPop] = reactExports.useState(null);
  const [popX, setPopX] = reactExports.useState(0);
  const dockRef = reactExports.useRef(null);
  const popRef = reactExports.useRef(null);
  useDismiss(pop !== null, () => setPop(null), [popRef, dockRef]);
  const a = p.atlas;
  const groups = [
    [
      ...p.onRegions ? [{ id: "regions", Icon: IconFigure, label: t.regions, title: t.bodyMap, run: p.onRegions, pressed: !!p.regionsOpen }] : [],
      { id: "explode", Icon: IconExplode, label: t.explode, title: p.motionLoaded ? t.explodeLocked : t.explodeSpread, pop: "explode", active: a.explode > 0, disabled: p.motionLoaded },
      { id: "cut", Icon: IconCut, label: t.cut, title: t.cutPlane, pop: "cut", active: !!a.clip },
      { id: "xray", Icon: IconXray, label: t.xray, title: t.xrayHelp, run: () => p.onChange({ xray: !a.xray }), pressed: a.xray },
      { id: "isolate", Icon: IconIsolate, label: t.isolate, title: p.isolated ? t.endIsolate : t.isolateHelp, run: p.onIsolate, pressed: p.isolated, disabled: !p.hasSel && !p.isolated }
    ],
    [
      { id: "side", Icon: IconSide, label: t.side, title: t.side, pop: "side", active: a.side !== "both" },
      { id: "views", Icon: IconViews, label: t.views, title: t.views, pop: "views" },
      { id: "reset", Icon: IconReset, label: t.reset, title: t.resetView, run: p.onReset }
    ],
    [
      { id: "undo", Icon: IconUndo, label: t.undo, title: t.undoHelp, run: p.onUndo, disabled: !p.canUndo },
      { id: "showall", Icon: IconEye, label: t.showAll, title: t.showAllHelp, run: p.onShowAll },
      { id: "photo", Icon: IconCamera, label: t.photo, title: t.photoHelp, run: p.onShot }
    ]
  ];
  const open = (id2, btn) => {
    if (pop === id2) return setPop(null);
    const dock = dockRef.current.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const half = Math.min(170, dock.width / 2);
    setPopX(Math.max(half, Math.min(dock.width - half, b.left + b.width / 2 - dock.left)));
    setPop(id2);
  };
  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const btns = [...e.currentTarget.querySelectorAll("button.inst:not(:disabled)")];
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    btns[(i + (e.key === "ArrowRight" ? 1 : -1) + btns.length) % btns.length].focus();
  };
  const axes = [null, "sagittal", "coronal", "transverse"];
  const axisName = (x) => x === null ? t.cutOff : x === "sagittal" ? t.sagittal : x === "coronal" ? t.coronal : t.transverse;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tray-dock-inner", ref: dockRef, children: [
    pop && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: popRef,
        className: "tray-pop glass",
        role: "dialog",
        "aria-label": pop === "explode" ? t.explode : pop === "cut" ? t.cutPlane : pop === "side" ? t.side : t.views,
        style: compact ? void 0 : { left: popX },
        children: [
          pop === "explode" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "field-label", children: t.explodeSpread }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "field-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", className: "range", min: 0, max: 1, step: 0.01, value: a.explode, onChange: (e) => p.onChange({ explode: parseFloat(e.target.value) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("output", { className: "num", children: [
                Math.round(a.explode * 100),
                "%"
              ] })
            ] })
          ] }),
          pop === "cut" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "field-label", id: "cut-axis", children: t.cutPlane }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", role: "radiogroup", "aria-labelledby": "cut-axis", children: axes.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                role: "radio",
                "aria-checked": (a.clip?.axis ?? null) === x,
                onClick: () => p.onChange({ clip: x ? { axis: x, t: a.clip?.t ?? 0.5, flip: a.clip?.flip ?? false } : null }),
                children: axisName(x)
              },
              x ?? "off"
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "field-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  className: "range",
                  min: 0,
                  max: 1,
                  step: 5e-3,
                  disabled: !a.clip,
                  value: a.clip?.t ?? 0.5,
                  "aria-label": t.cutPos,
                  onChange: (e) => a.clip && p.onChange({ clip: { ...a.clip, t: parseFloat(e.target.value) } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", disabled: !a.clip, "aria-pressed": !!a.clip?.flip, onClick: () => a.clip && p.onChange({ clip: { ...a.clip, flip: !a.clip.flip } }), children: t.flip })
            ] })
          ] }),
          pop === "side" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg vertical", role: "radiogroup", "aria-label": t.side, children: ["both", "r", "l"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { role: "radio", "aria-checked": a.side === v, onClick: () => p.onChange({ side: v }), children: v === "both" ? t.both : v === "r" ? t.rightOnly : t.leftOnly }, v)) }),
          pop === "views" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "views-grid", children: [
            ["anterior", t.anterior],
            ["posterior", t.posterior],
            ["right", t.lateralR],
            ["left", t.lateralL],
            ["superior", t.superior]
          ].map(([v, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn small",
              onClick: () => {
                p.onView(v);
                setPop(null);
              },
              children: label
            },
            v
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tray glass settle", role: "toolbar", "aria-label": t.tools, onKeyDown: onKey, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tray-scroll", children: groups.map((g, gi) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tray-group", children: g.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `inst ${it.active ? "active" : ""}`,
        title: it.title,
        disabled: it.disabled,
        "aria-pressed": it.pressed,
        "aria-expanded": it.pop ? pop === it.pop : void 0,
        "aria-haspopup": it.pop ? "dialog" : void 0,
        onClick: (e) => it.pop ? open(it.pop, e.currentTarget) : it.run?.(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(it.Icon, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inst-label", children: it.label })
        ]
      },
      it.id
    )) }, gi)) }) })
  ] });
}
const JOINTS = {
  shoulder: { la: "Articulatio humeri", en: "Shoulder joint", id: "Sendi bahu" },
  elbow: { la: "Articulatio cubiti", en: "Elbow joint", id: "Sendi siku" },
  radioulnar: { la: "Articulationes radioulnares", en: "Radioulnar joints", id: "Sendi radioulnar" },
  wrist: { la: "Articulatio radiocarpalis", en: "Wrist joint", id: "Sendi pergelangan tangan" },
  hip: { la: "Articulatio coxae", en: "Hip joint", id: "Sendi panggul" },
  knee: { la: "Articulatio genus", en: "Knee joint", id: "Sendi lutut" },
  ankle: { la: "Articulatio talocruralis", en: "Ankle joint", id: "Sendi pergelangan kaki" },
  subtalar: { la: "Articulatio subtalaris", en: "Subtalar joint", id: "Sendi subtalar" }
};
const MOVES$1 = {
  flexion: { la: "Flexio", en: "Flexion", id: "Fleksi" },
  extension: { la: "Extensio", en: "Extension", id: "Ekstensi" },
  abduction: { la: "Abductio", en: "Abduction", id: "Abduksi" },
  adduction: { la: "Adductio", en: "Adduction", id: "Adduksi" },
  "medial-rotation": { la: "Rotatio medialis", en: "Medial rotation", id: "Rotasi medial" },
  "lateral-rotation": { la: "Rotatio lateralis", en: "Lateral rotation", id: "Rotasi lateral" },
  pronation: { la: "Pronatio", en: "Pronation", id: "Pronasi" },
  supination: { la: "Supinatio", en: "Supination", id: "Supinasi" },
  "radial-deviation": { la: "Abductio radialis", en: "Radial deviation", id: "Deviasi radial" },
  "ulnar-deviation": { la: "Abductio ulnaris", en: "Ulnar deviation", id: "Deviasi ulnar" },
  dorsiflexion: { la: "Dorsiflexio", en: "Dorsiflexion", id: "Dorsofleksi" },
  plantarflexion: { la: "Flexio plantaris", en: "Plantarflexion", id: "Plantarfleksi" },
  inversion: { la: "Inversio", en: "Inversion", id: "Inversi" },
  eversion: { la: "Eversio", en: "Eversion", id: "Eversi" }
};
const JOINT_ORDER = ["shoulder", "elbow", "radioulnar", "wrist", "hip", "knee", "ankle", "subtalar"];
function MotionPanel(p) {
  const { t, settings } = useApp();
  const lang = settings.lang;
  const groups = JOINT_ORDER.map((j) => ({ j, clips: p.clips.filter((c) => c.moves[0]?.joint === j) })).filter((g) => g.clips.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "motion-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: t.motionTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t.motionIntro }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", role: "radiogroup", "aria-label": t.motionSide, children: ["r", "l"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { role: "radio", "aria-checked": p.side === s, onClick: () => p.onSide(s), children: s === "r" ? t.sideRight : t.sideLeft }, s)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "motion-list", children: groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "joint", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: JOINTS[g.j].la }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: JOINTS[g.j][lang] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: g.clips.map((c) => {
        const mv = c.moves[0];
        const nm = MOVES$1[mv.movement] ?? { la: c.label.la, en: c.label.en, id: c.label.id };
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "move", "aria-pressed": p.currentId === c.id, "aria-busy": p.loadingId === c.id, onClick: () => p.onPlay(c), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: nm.la }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: nm[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "move-deg num", children: fmt(t.upTo, { n: Math.round(Math.abs(mv.deg)) }) })
        ] }) }, c.id);
      }) })
    ] }, g.j)) })
  ] });
}
function MotionBar({ player, clip, onStop }) {
  const { t, settings } = useApp();
  const lang = settings.lang;
  const [playing, setPlaying] = reactExports.useState(true);
  const [speed, setSpeed] = reactExports.useState(1);
  const [loop, setLoop] = reactExports.useState(true);
  const rangeRef = reactExports.useRef(null);
  const angleRef = reactExports.useRef(null);
  const scrubbing = reactExports.useRef(false);
  const max = Math.round(Math.abs(clip.moves[0]?.deg ?? 0));
  reactExports.useEffect(() => {
    const read = () => {
      let s;
      try {
        s = player.state();
      } catch {
        return;
      }
      if (!scrubbing.current && rangeRef.current) rangeRef.current.value = String(s.t);
      if (angleRef.current) angleRef.current.textContent = `${Math.round(Math.abs(s.angles[0] ?? 0))}°`;
      setPlaying(s.playing);
    };
    read();
    const off = player.onTick(read);
    return () => {
      if (typeof off === "function") off();
    };
  }, [player, clip]);
  const toggle = () => {
    if (playing) player.pause();
    else player.resume();
    setPlaying(!playing);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "motion-bar glass", role: "group", "aria-label": t.motionBar, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mb-play", onClick: toggle, "aria-label": playing ? t.pause : t.play, children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlay, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-title", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: clip.label.la }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-legend", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "c", "aria-hidden": "true" }),
        t.contracts,
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "s", "aria-hidden": "true" }),
        t.lengthens
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-scrub", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 100 16", preserveAspectRatio: "none", className: "mb-profile", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 15C22 15 26 1 50 1S78 15 100 15" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-peak num", "aria-hidden": "true", children: [
        max,
        "°"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: rangeRef,
          type: "range",
          className: "range",
          min: 0,
          max: 1,
          step: 1e-3,
          defaultValue: 0,
          "aria-label": t.scrub,
          onPointerDown: () => scrubbing.current = true,
          onPointerUp: () => scrubbing.current = false,
          onChange: (e) => {
            player.scrub(parseFloat(e.target.value));
            setPlaying(false);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-ends num", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0°" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0°" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("output", { ref: angleRef, className: "mb-angle num", "aria-label": t.angle, "aria-live": "off", children: "0°" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg mb-speed", role: "radiogroup", "aria-label": t.speed, children: [0.5, 1, 2].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        role: "radio",
        "aria-checked": speed === x,
        onClick: () => {
          setSpeed(x);
          player.setSpeed(x);
        },
        children: [
          x,
          "×"
        ]
      },
      x
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "icon-btn",
        "aria-pressed": loop,
        "aria-label": t.loop,
        title: t.loop,
        onClick: () => {
          setLoop(!loop);
          player.setLoop(!loop);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLoop, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", "aria-label": t.stop, title: t.stop, onClick: onStop, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconStop, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: lang === "id" ? clip.label.id : clip.label.en })
  ] });
}
const KEY$1 = "raga.srs.v1";
const DAY = 864e5;
let cache$1 = null;
function load() {
  if (cache$1) return cache$1;
  try {
    cache$1 = JSON.parse(localStorage.getItem(KEY$1) || "{}");
  } catch {
    cache$1 = {};
  }
  return cache$1;
}
function save() {
  try {
    localStorage.setItem(KEY$1, JSON.stringify(cache$1 ?? {}));
  } catch {
  }
}
function getCard(id2) {
  return load()[id2];
}
function allCards() {
  return load();
}
function review(id2, correct, typo = false) {
  const db = load();
  const now = Date.now();
  const c = db[id2] ?? { due: now, ivl: 0, ease: 2.5, reps: 0, lapses: 0, seen: 0, right: 0, last: 0 };
  c.seen += 1;
  c.last = now;
  if (correct) {
    c.right += 1;
    c.reps += 1;
    const q = typo ? 3 : 4;
    c.ease = Math.max(1.3, c.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    c.ivl = c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(c.ivl * c.ease);
    c.due = now + c.ivl * DAY;
  } else {
    c.lapses += 1;
    c.reps = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.ivl = 0;
    c.due = now + 10 * 6e4;
  }
  db[id2] = c;
  save();
  return c;
}
function resetAll() {
  cache$1 = {};
  save();
}
const UPPER_BONE = /(clavicle|scapula|humerus|radius|ulna|metacarpal-bone|of-hand|scaphoid-bone|lunate-bone|triquetrum-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone)-[lr]$/;
const LOWER_BONE = /(hip-bone|femur|patella|tibia|fibula|talus|calcaneus|navicular-bone|cuboid-bone|cuneiform-bone|metatarsal-bone|of-foot)-[lr]$/;
const THORAX_BONE = /(rib-[lr]|costal-cartilage-of-.*|manubrium-of-sternum|body-of-sternum|xiphoid-process|vertebra-t\d+)$/;
const SKIP_BONE = /tooth|incisor|canine|premolar|molar|alar|septal|cells-of-ethmoid|sinus-of|sesamoid/;
const UPPER_AXIAL_MUSCLES = /^(pectoralis|subclavius|serratus-anterior|trapezius|latissimus|levator-scapulae|rhomboid|clavicular-head-of-pectoralis|sternocostal-head|abdominal-part-of-pectoralis|ascending-part-of-trapezius|descending-part-of-trapezius|transverse-part-of-trapezius)/;
const sideRank = (s) => s === "r" ? 0 : s === null ? 1 : 2;
function oneSide(list) {
  const best = /* @__PURE__ */ new Map();
  for (const s of list) {
    const r = sideRank(s.side);
    const cur = best.get(s.k);
    if (cur === void 0 || r < cur) best.set(s.k, r);
  }
  return list.filter((s) => best.get(s.k) === sideRank(s.side));
}
function conceptOf(db, s) {
  const p = db.parentConcept(s);
  if (p && (s.pack === "muscles" || s.pack === "joints")) {
    const c = db.content.get(p);
    if (!c || c.kind === "muscle") return p;
  }
  return s.k;
}
function meshesFor(db, key, side) {
  const merged = /* @__PURE__ */ new Map();
  for (const id2 of db.idsForKey(key)) {
    const s = db.byId.get(id2);
    if (s && s.pack !== "attachments") merged.set(s.id, s);
  }
  for (const s of db.partsOf(key)) merged.set(s.id, s);
  const list = [...merged.values()];
  if (!list.length) return [];
  const want = side ?? list.reduce((a, b) => sideRank(b.side) < sideRank(a.side) ? b : a).side;
  return list.filter((s) => s.side === want || want !== null && s.side === null).map((s) => s.id);
}
function groupOf(db, key, s) {
  const g = db.content.get(key)?.facts?.group;
  return g?.en ?? s.path[s.path.length - 1] ?? s.pack;
}
function nameQuestions(db, english, deck, structs, layers, packs, ghost, region, group) {
  const seen2 = /* @__PURE__ */ new Set();
  const out = [];
  for (const s of structs) {
    const key = conceptOf(db, s);
    if (seen2.has(key)) continue;
    seen2.add(key);
    const side = s.side;
    const ids = meshesFor(db, key, side);
    if (!ids.length) continue;
    const parent = key === s.k ? db.parentConcept(s) : null;
    const answers = db.answersFor(key, { includeParent: parent && db.content.get(parent)?.kind === "muscle" ? parent : null, english });
    if (!answers.length) continue;
    const display = db.latin(key);
    const base = { key, ids, side, answers, display, layers, packs, ghost, region, deck, group: group?.(key) ?? groupOf(db, key, s), kind: db.content.get(key)?.kind };
    out.push({ ...base, id: `name:${key}`, type: "name" });
    out.push({ ...base, id: `find:${key}`, type: "find" });
  }
  return out;
}
function landmarkQuestions(db, english, deck, boneIds, region) {
  const out = [];
  const seen2 = /* @__PURE__ */ new Set();
  for (const l of db.landmarks) {
    if (!boneIds.has(l.on) || l.variant) continue;
    const bone = db.byId.get(l.on);
    if (!bone || l.k === bone.k || norm2(l.en) === norm2(bone.en)) continue;
    if (seen2.has(l.k)) continue;
    seen2.add(l.k);
    const answers = db.answersFor(l.k, { english });
    if (!answers.length) continue;
    const base = { key: l.k, ids: [l.on], side: l.side, landmark: l, layers: ["skeleton"], packs: ["skeleton"], ghost: false, region, deck, kind: "landmark" };
    out.push({ ...base, id: `lm:${l.k}`, type: "landmark", answers, display: db.latin(l.k), group: l.on });
    const onBone = db.content.get(l.k)?.quiz?.bone;
    if (onBone?.length) out.push({ ...base, id: `lmBone:${l.k}`, type: "lmBone", answers: onBone, display: onBone[0], group: region });
  }
  return out;
}
const QUIZ_FIELD = { joint: "type", boneType: "type" };
const GHOSTED = ["muscles", "nerves", "arteries", "veins"];
function factQuestions(db, deck, keys, types, layers, packs, region, group) {
  const out = [];
  for (const key of keys) {
    const c = db.content.get(key);
    if (!c?.quiz) continue;
    const ids = meshesFor(db, key, "r");
    for (const t of types) {
      const ans = c.quiz[QUIZ_FIELD[t] ?? t];
      if (!ans?.length) continue;
      out.push({
        id: `${t}:${key}`,
        type: t,
        key,
        ids,
        side: "r",
        answers: ans,
        display: ans[0],
        layers,
        packs,
        ghost: layers.some((l) => GHOSTED.includes(l)),
        region,
        deck,
        group: group?.(key) ?? c.facts?.group?.en ?? c.kind,
        kind: c.kind
      });
    }
  }
  return out;
}
function splitNames(raw) {
  const main = [], all = [];
  const add = (list, s) => {
    if (s && !list.includes(s)) list.push(s);
  };
  if (!Array.isArray(raw)) return { main, all };
  for (const item of raw) {
    if (typeof item !== "string") continue;
    const m = /^([^(]+?)\s*(?:\(([^)]*)\))?$/.exec(item.trim());
    if (!m) continue;
    const name = m[1].trim();
    add(main, name);
    add(all, name);
    add(all, name.replace(/\s+contralateral(e|is)$/i, "").trim());
    for (const inner of (m[2] ?? "").split(/\s+et\s+/)) if (/^(Ligamentum|Ligamenta|Os|Ossa)\s/.test(inner.trim())) add(all, inner.trim());
  }
  return { main, all };
}
function listQuestions(db, deck, keys, type, layers, packs, region) {
  const out = [];
  for (const key of keys) {
    const c = db.content.get(key);
    const { main, all } = splitNames(c?.facts?.[type === "articulates" ? "articulates" : "ligaments"]);
    if (!c || !main.length) continue;
    out.push({
      id: `${type}:${key}`,
      type,
      key,
      ids: meshesFor(db, key, "r"),
      side: "r",
      answers: all,
      display: main.join(", "),
      oneOf: main,
      layers,
      packs,
      ghost: false,
      region,
      deck,
      group: c.kind,
      kind: c.kind
    });
  }
  return out;
}
function lobeQuestions(db, deck, lobeIds) {
  const out = [];
  const seen2 = /* @__PURE__ */ new Set();
  for (const l of db.landmarks) {
    if (!lobeIds.has(l.on) || seen2.has(l.k)) continue;
    const lobe = db.content.get(l.k)?.quiz?.lobe;
    if (!lobe?.length) continue;
    seen2.add(l.k);
    out.push({
      // both lungs have a segment of the same name, so the lung is part of the question
      label: `${db.latin(l.k)} pulmonis ${/left-lung/.test(l.on) ? "sinistri" : "dextri"}`,
      id: `lobe:${l.k}`,
      type: "lobe",
      key: l.k,
      ids: [l.on],
      side: l.side,
      landmark: l,
      answers: lobe,
      display: lobe[0],
      layers: ["respiratory"],
      packs: ["viscera"],
      ghost: false,
      region: "thorax",
      deck,
      group: "lobe",
      kind: "landmark"
    });
  }
  return out;
}
const CASE_REGION = { upper: "upper-limb", lower: "lower-limb", thorax: "thorax", heart: "thorax" };
function optionText(o, lang = "en") {
  return typeof o === "string" ? o : o[lang] ?? o.en ?? o.id ?? "";
}
function caseQuestions(db, deck) {
  const out = [];
  for (const c of db.cases) {
    if (!c?.id || !Array.isArray(c.options) || c.options.length < 3 || !c.stem?.en) continue;
    const reveal = [];
    const packs = /* @__PURE__ */ new Set(["skeleton"]);
    const layers = /* @__PURE__ */ new Set(["skeleton"]);
    let lead = 0;
    for (const key of c.focus ?? []) {
      for (const id2 of meshesFor(db, key, "r")) {
        const s = db.byId.get(id2);
        const layer = s && layerOf(s);
        if (!s || !layer || layer === "attachments" || reveal.includes(id2)) continue;
        reveal.push(id2);
        packs.add(s.pack);
        layers.add(layer);
      }
      if (!lead) lead = reveal.length;
    }
    const right = optionText(c.options[0]);
    const side = c.area === "upper" || c.area === "lower" ? "r" : null;
    out.push({
      id: `case:${c.id}`,
      type: "case",
      key: c.focus?.[0] ?? c.id,
      ids: [],
      reveal,
      lead,
      side,
      answers: [right],
      display: right,
      layers: [...layers],
      packs: [...packs],
      ghost: true,
      region: CASE_REGION[c.area] ?? "thorax",
      deck,
      group: c.area,
      kind: "case",
      case: c
    });
  }
  return out;
}
function norm2(s) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}
function contentKeys(db, pred) {
  return [...db.content.values()].filter(pred).map((c) => c.key);
}
function musclesWhere(db, pred) {
  return oneSide(db.structures.filter((s) => s.pack === "muscles" && layerOf(s) === "muscles" && pred(s)));
}
function muscleConcepts(db, structs) {
  return [...new Set(structs.map((s) => conceptOf(db, s)))];
}
const keysOf = (structs) => [...new Set(structs.map((s) => s.k))];
const LOWER_VN = /foot|plantar|tars|tibial|fibular|femoral|genicul|glute|iliac|saphen|poplite|obturator|sciatic|sural|pudend|crural|lumb|sacral|coccyg|piriformis|quadratus-femoris|perforating|calcane|malleol|inguinal|genitofemoral|hypogastric|arcuate|patell|toe|penis|clunial/;
const limbOf = (kind) => (key) => `${kind} ${LOWER_VN.test(key) ? "lower" : "upper"}`;
const DECKS = [
  {
    id: "pa1",
    code: "PA1",
    en: "General osteology",
    idn: "Osteologi umum",
    blurb: { en: "Every bone of the skeleton, its shape class and the bones it meets.", id: "Semua tulang rangka, jenisnya menurut bentuk, dan tulang yang bersendi dengannya." },
    types: ["name", "find", "boneType", "articulates"],
    packs: ["skeleton"],
    build: (db, english) => {
      const bones = oneSide(db.structures.filter((s) => s.pack === "skeleton" && !SKIP_BONE.test(s.id) && !/cartilage/.test(s.id)));
      const keys = keysOf(bones);
      return [
        ...nameQuestions(db, english, "pa1", bones, ["skeleton"], ["skeleton"], false),
        ...factQuestions(db, "pa1", keys, ["boneType"], ["skeleton"], ["skeleton"]),
        ...listQuestions(db, "pa1", keys, "articulates", ["skeleton"], ["skeleton"])
      ];
    }
  },
  {
    id: "pa2",
    code: "PA2",
    en: "Skeleton of the upper limb",
    idn: "Skeletal ekstremitas superior",
    blurb: { en: "Bones, landmarks, joints and ligaments from the clavicle to the fingertips.", id: "Tulang, penanda tulang, sendi, dan ligamen dari clavicula sampai ujung jari." },
    types: ["name", "landmark", "find", "lmBone", "articulates", "joint", "axes", "ligament"],
    packs: ["skeleton", "joints"],
    region: "upper-limb",
    build: (db, english) => {
      const bones = db.structures.filter((s) => s.pack === "skeleton" && s.side === "r" && UPPER_BONE.test(s.id));
      const jointKeys = contentKeys(db, (c) => c.kind === "joint" && c.domain === "upper");
      return [
        ...nameQuestions(db, english, "pa2", bones, ["skeleton"], ["skeleton"], false, "upper-limb"),
        ...landmarkQuestions(db, english, "pa2", new Set(bones.map((b) => b.id)), "upper-limb"),
        ...listQuestions(db, "pa2", keysOf(bones), "articulates", ["skeleton"], ["skeleton"], "upper-limb"),
        ...factQuestions(db, "pa2", jointKeys, ["joint", "axes"], ["skeleton", "joints"], ["skeleton", "joints"], "upper-limb"),
        ...listQuestions(db, "pa2", jointKeys, "ligament", ["skeleton", "joints"], ["skeleton", "joints"], "upper-limb")
      ];
    }
  },
  {
    id: "pa3",
    code: "PA3",
    en: "Skeleton of the lower limb",
    idn: "Skeletal ekstremitas inferior",
    blurb: { en: "Hip bone to toes: bones, landmarks, joints and ligaments.", id: "Dari os coxae sampai jari kaki: tulang, penanda, sendi, dan ligamen." },
    types: ["name", "landmark", "find", "lmBone", "articulates", "joint", "axes", "ligament"],
    packs: ["skeleton", "joints"],
    region: "lower-limb",
    build: (db, english) => {
      const bones = db.structures.filter((s) => s.pack === "skeleton" && s.side === "r" && LOWER_BONE.test(s.id));
      const jointKeys = contentKeys(db, (c) => c.kind === "joint" && c.domain === "lower");
      return [
        ...nameQuestions(db, english, "pa3", bones, ["skeleton"], ["skeleton"], false, "lower-limb"),
        ...landmarkQuestions(db, english, "pa3", new Set(bones.map((b) => b.id)), "lower-limb"),
        ...listQuestions(db, "pa3", keysOf(bones), "articulates", ["skeleton"], ["skeleton"], "lower-limb"),
        ...factQuestions(db, "pa3", jointKeys, ["joint", "axes"], ["skeleton", "joints"], ["skeleton", "joints"], "lower-limb"),
        ...listQuestions(db, "pa3", jointKeys, "ligament", ["skeleton", "joints"], ["skeleton", "joints"], "lower-limb")
      ];
    }
  },
  {
    id: "pa4",
    code: "PA4",
    en: "Muscles of the upper limb",
    idn: "Otot ekstremitas superior",
    blurb: { en: "Names, origin, insertion, action and innervation.", id: "Nama, origo, insersio, aksi, dan persarafan." },
    types: ["name", "find", "origin", "insertion", "nerve", "action"],
    packs: ["skeleton", "muscles"],
    region: "upper-limb",
    build: (db, english) => {
      const ms = musclesWhere(db, (s) => s.path.some((p) => /upper limb/i.test(p)) || UPPER_AXIAL_MUSCLES.test(s.k));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, english, "pa4", ms, ["skeleton", "muscles"], ["skeleton", "muscles"], true, "upper-limb"),
        ...factQuestions(db, "pa4", keys, ["origin", "insertion", "nerve", "action"], ["skeleton", "muscles"], ["skeleton", "muscles"], "upper-limb")
      ];
    }
  },
  {
    id: "pa5",
    code: "PA5",
    en: "Muscles of the lower limb",
    idn: "Otot ekstremitas inferior",
    blurb: { en: "Gluteal region, thigh, leg and foot.", id: "Regio glutea, paha, tungkai bawah, dan kaki." },
    types: ["name", "find", "origin", "insertion", "nerve", "action"],
    packs: ["skeleton", "muscles"],
    region: "lower-limb",
    build: (db, english) => {
      const ms = musclesWhere(db, (s) => s.path.some((p) => /lower limb/i.test(p)));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, english, "pa5", ms, ["skeleton", "muscles"], ["skeleton", "muscles"], true, "lower-limb"),
        ...factQuestions(db, "pa5", keys, ["origin", "insertion", "nerve", "action"], ["skeleton", "muscles"], ["skeleton", "muscles"], "lower-limb")
      ];
    }
  },
  {
    id: "pa6",
    code: "PA6",
    en: "Thoracic wall, larynx and airways",
    idn: "Dinding toraks, laring, dan saluran napas",
    blurb: { en: "Sternum, ribs, thoracic muscles, larynx, trachea and bronchi.", id: "Sternum, costae, otot toraks, laring, trakea, dan bronkus." },
    types: ["name", "landmark", "find", "lmBone", "origin", "insertion", "nerve", "from"],
    packs: ["skeleton", "muscles", "viscera"],
    region: "thorax",
    build: (db, english) => {
      const bones = oneSide(db.structures.filter((s) => s.pack === "skeleton" && (THORAX_BONE.test(s.id) || /thyroid-cartilage|cricoid|arytenoid|corniculate|hyoid/.test(s.id))));
      const ms = musclesWhere(db, (s) => s.path.some((p) => /thorax|thoracic|laryngeal/i.test(p)) && !UPPER_AXIAL_MUSCLES.test(s.k));
      const resp = oneSide(db.structures.filter((s) => s.pack === "viscera" && layerOf(s) === "respiratory"));
      const keys = muscleConcepts(db, ms);
      return [
        ...nameQuestions(db, english, "pa6", bones, ["skeleton"], ["skeleton"], false, "thorax"),
        ...landmarkQuestions(db, english, "pa6", new Set(bones.map((b) => b.id)), "thorax"),
        ...nameQuestions(db, english, "pa6", ms, ["skeleton", "muscles"], ["skeleton", "muscles"], true, "thorax"),
        ...nameQuestions(db, english, "pa6", resp, ["skeleton", "respiratory"], ["skeleton", "viscera"], true, "thorax"),
        ...factQuestions(db, "pa6", keys, ["origin", "insertion", "nerve"], ["skeleton", "muscles"], ["skeleton", "muscles"], "thorax"),
        ...factQuestions(db, "pa6", keysOf(resp).filter((k) => /bronch/.test(k)), ["from"], ["skeleton", "respiratory"], ["skeleton", "viscera"], "thorax")
      ];
    }
  },
  {
    id: "pa7",
    code: "PA7",
    en: "Heart and lungs",
    idn: "Cor dan pulmo",
    blurb: { en: "Chambers, valves, coronary vessels, lobes and segments.", id: "Ruang jantung, katup, pembuluh koroner, lobus, dan segmen." },
    types: ["name", "find", "landmark", "from", "drains", "lobe"],
    packs: ["vessels", "viscera"],
    region: "heart",
    build: (db, english) => {
      const heart = db.structures.filter((s) => s.pack === "vessels" && layerOf(s) === "heart");
      const great = db.structures.filter((s) => s.pack === "vessels" && layerOf(s) !== "heart" && /aorta|aortic-arch|pulmonary-trunk|pulmonary-arter|pulmonary-vein|vena-cava|brachiocephalic|coronary|cardiac-vein|coronary-sinus|interventricular|circumflex-artery-of-heart/.test(s.id));
      const lungs = oneSide(db.structures.filter((s) => s.pack === "viscera" && /lobe-of|lung|bronch|trachea|pleura/.test(s.id)));
      const heartIds = new Set(heart.map((s) => s.id));
      const vesselKeys = keysOf(great);
      return [
        ...nameQuestions(db, english, "pa7", heart, ["heart"], ["vessels"], true, "heart"),
        ...nameQuestions(db, english, "pa7", great, ["heart", "arteries", "veins"], ["vessels"], true, "heart"),
        ...nameQuestions(db, english, "pa7", lungs, ["respiratory"], ["viscera"], true, "thorax"),
        ...landmarkQuestions(db, english, "pa7", heartIds, "heart").filter((q) => q.type === "landmark").map((q) => ({ ...q, layers: ["heart"], packs: ["vessels"] })),
        ...factQuestions(db, "pa7", vesselKeys.filter((k) => db.content.get(k)?.kind === "artery"), ["from"], ["heart", "arteries", "veins"], ["vessels"], "heart"),
        ...factQuestions(db, "pa7", vesselKeys.filter((k) => db.content.get(k)?.kind === "vein"), ["drains"], ["heart", "arteries", "veins"], ["vessels"], "heart"),
        ...lobeQuestions(db, "pa7", new Set(lungs.map((s) => s.id)))
      ];
    }
  },
  {
    id: "pa8",
    code: "PA8",
    en: "Vessels and nerves of the limbs",
    idn: "Vaskularisasi dan inervasi ekstremitas",
    blurb: { en: "Arteries, veins and nerves of the limbs, with their origins and roots.", id: "Arteri, vena, dan saraf ekstremitas, beserta asal dan radiksnya." },
    types: ["name", "find", "roots", "from", "drains", "continues"],
    packs: ["skeleton", "vessels", "nerves"],
    build: (db, english) => {
      const vn = oneSide(db.structures.filter((s) => (s.pack === "vessels" || s.pack === "nerves") && layerOf(s) !== "heart" && db.content.get(s.k)?.domain === "vn"));
      const arteries = vn.filter((s) => layerOf(s) === "arteries");
      const veins = vn.filter((s) => layerOf(s) === "veins");
      const nerves = vn.filter((s) => layerOf(s) === "nerves");
      return [
        ...nameQuestions(db, english, "pa8", arteries, ["skeleton", "arteries"], ["skeleton", "vessels"], true, void 0, limbOf("artery")),
        ...nameQuestions(db, english, "pa8", veins, ["skeleton", "veins"], ["skeleton", "vessels"], true, void 0, limbOf("vein")),
        ...nameQuestions(db, english, "pa8", nerves, ["skeleton", "nerves"], ["skeleton", "nerves"], true, void 0, limbOf("nerve")),
        ...factQuestions(db, "pa8", keysOf(nerves), ["roots", "from"], ["skeleton", "nerves"], ["skeleton", "nerves"], void 0, limbOf("nerve")),
        ...factQuestions(db, "pa8", keysOf(arteries), ["from", "continues"], ["skeleton", "arteries"], ["skeleton", "vessels"], void 0, limbOf("artery")),
        ...factQuestions(db, "pa8", keysOf(veins), ["drains", "continues"], ["skeleton", "veins"], ["skeleton", "vessels"], void 0, limbOf("vein"))
      ];
    }
  },
  {
    id: "dx",
    code: "Dx",
    en: "Clinical cases",
    idn: "Kasus klinis",
    blurb: {
      en: "Nerve injuries, fractures and chest cases, each with one best answer.",
      id: "Cedera saraf, fraktur, dan kasus toraks, masing-masing dengan satu jawaban terbaik."
    },
    types: ["case"],
    packs: ["skeleton"],
    build: (db) => caseQuestions(db, "dx")
  }
];
const built = /* @__PURE__ */ new WeakMap();
function buildDeck(db, d, english) {
  let m = built.get(db);
  if (!m) built.set(db, m = /* @__PURE__ */ new Map());
  const k = d.id + (english ? ":en" : "");
  let qs = m.get(k);
  if (!qs) {
    qs = [...new Map(d.build(db, english).map((q) => [q.id, q])).values()];
    m.set(k, qs);
  }
  return qs;
}
function questionIndex(db, english, prefer) {
  const out = /* @__PURE__ */ new Map();
  const order = prefer ? [...DECKS.filter((d) => d.id === prefer), ...DECKS.filter((d) => d.id !== prefer)] : DECKS;
  for (const d of order) for (const q of buildDeck(db, d, english)) if (!out.has(q.id)) out.set(q.id, q);
  return out;
}
function shuffle(a) {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
function makeSession(all, o) {
  const pool = all.filter((q) => o.types.includes(q.type));
  if (o.mode === "exam") return shuffle(pool).slice(0, o.size);
  const now = Date.now();
  const due = [], fresh = [], later = [];
  for (const q of pool) {
    const c = getCard(q.id);
    if (!c) fresh.push(q);
    else if (c.due <= now) due.push(q);
    else later.push(q);
  }
  due.sort((a, b) => getCard(a.id).due - getCard(b.id).due);
  later.sort((a, b) => getCard(a.id).due - getCard(b.id).due);
  const ordered = o.onlyDue ? due : [...due, ...shuffle(fresh), ...later];
  return ordered.slice(0, o.size);
}
function dueQuestions(db, english) {
  const now = Date.now();
  const out = [];
  for (const q of questionIndex(db, english).values()) {
    const c = getCard(q.id);
    if (c && c.due <= now) out.push(q);
  }
  return out.sort((a, b) => getCard(a.id).due - getCard(b.id).due);
}
function deckStats(all) {
  const now = Date.now();
  let due = 0, fresh = 0, mastered = 0;
  for (const q of all) {
    const c = getCard(q.id);
    if (!c) fresh++;
    else {
      if (c.due <= now) due++;
      if (c.ivl >= 7) mastered++;
    }
  }
  return { total: all.length, due, fresh, mastered };
}
const KEY = "raga.quiz.session.v1";
const MAX_AGE = 3 * 864e5;
function loadSession(now = Date.now()) {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!s || s.v !== 1 || !Array.isArray(s.ids) || !s.ids.length || !Array.isArray(s.answers)) return null;
    if (s.ids.some((x) => typeof x !== "string") || s.answers.some((a) => !a || typeof a.id !== "string")) return null;
    if (s.answers.length >= s.ids.length || now - (s.at || 0) > MAX_AGE) return null;
    return { ...s, mode: s.mode === "exam" ? "exam" : "practice", choice: !!s.choice, seed: String(s.seed ?? "") };
  } catch {
    return null;
  }
}
function saveSession(s) {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch {
  }
}
const PREFIX$1 = /* @__PURE__ */ new Set([
  "os",
  "ossa",
  "musculus",
  "musculi",
  "m",
  "mm",
  "nervus",
  "nervi",
  "n",
  "nn",
  "arteria",
  "arteriae",
  "a",
  "aa",
  "vena",
  "venae",
  "v",
  "vv",
  "ligamentum",
  "ligamenta",
  "lig",
  "ligg",
  "articulatio",
  "articulationes",
  "art",
  "artic",
  "the",
  "otot",
  "tulang",
  "saraf",
  "sendi",
  "pars",
  "caput"
]);
const SIDE = /* @__PURE__ */ new Set(["dexter", "dextra", "dextrum", "dextri", "dextrae", "sinister", "sinistra", "sinistrum", "sinistri", "sinistrae", "right", "left", "kanan", "kiri", "dx", "sin"]);
const QUAL = /* @__PURE__ */ new Set([
  "humeri",
  "femoris",
  "tibiae",
  "fibulae",
  "radii",
  "ulnae",
  "scapulae",
  "claviculae",
  "sterni",
  "costae",
  "vertebrae",
  "sacri",
  "coccygis",
  "patellae",
  "tali",
  "calcanei",
  "ossis",
  "coxae",
  "ilii",
  "ischii",
  "pubis",
  "metacarpi",
  "metatarsi",
  "phalangis",
  "manus",
  "pedis",
  "cranii",
  "mandibulae",
  "maxillae",
  "hyoidei",
  "cordis",
  "pulmonis",
  "laryngis",
  "humeralis",
  "brachii",
  "antebrachii",
  "cruris",
  "carpi",
  "tarsi",
  "digiti",
  "digitorum",
  "pollicis",
  "hallucis"
]);
const ROMAN = { i: "1", ii: "2", iii: "3", iv: "4", v: "5", vi: "6", vii: "7", viii: "8", ix: "9", x: "10", xi: "11", xii: "12" };
const SYN = [
  [/\bperone/g, "fibular"],
  [/\bfibulari/g, "fibulari"],
  [/\bpraecox/g, "precox"],
  [/\bcoeli/g, "celi"],
  [/\boesoph/g, "esoph"],
  [/ae\b/g, "ae"]
];
function tokens(s, keepSide) {
  let t = norm(s);
  for (const [re, rep] of SYN) t = t.replace(re, rep);
  let out = t.split(" ").filter(Boolean);
  while (out.length > 1 && PREFIX$1.has(out[0])) out.shift();
  if (!keepSide) out = out.filter((w) => !SIDE.has(w));
  out = out.map((w, i) => i > 0 && ROMAN[w] ? ROMAN[w] : w);
  return out;
}
const CRITICAL = [
  "externus",
  "internus",
  "externa",
  "interna",
  "externi",
  "interni",
  "externae",
  "internae",
  "superior",
  "inferior",
  "superius",
  "inferius",
  "superiores",
  "inferiores",
  "anterior",
  "posterior",
  "anterius",
  "posterius",
  "anteriores",
  "posteriores",
  "medialis",
  "lateralis",
  "mediale",
  "laterale",
  "medius",
  "media",
  "medium",
  "major",
  "minor",
  "majus",
  "minus",
  "longus",
  "brevis",
  "longum",
  "breve",
  "longa",
  "profundus",
  "superficialis",
  "profunda",
  "profundum",
  "superficiale",
  "proximalis",
  "distalis",
  "proximale",
  "distale",
  "ulnaris",
  "radialis",
  "ulnare",
  "radiale",
  "magnus",
  "maximus",
  "minimus",
  "tertius",
  "primus",
  "secundus",
  "flexor",
  "extensor",
  "abductor",
  "adductor",
  "pronator",
  "supinator",
  "tibialis",
  "fibularis",
  "palmaris",
  "plantaris",
  "dorsalis",
  "palmares",
  "plantares",
  "dorsales",
  "capitis",
  "colli",
  "thoracis",
  "lumborum",
  "carpi",
  "digitorum",
  "pollicis",
  "hallucis",
  "indicis",
  "minimi",
  "dexter",
  "sinister",
  "dextra",
  "sinistra",
  "ascendens",
  "descendens",
  "transversus",
  "obliquus",
  "rectus",
  "teres",
  "quadratus",
  "humeri",
  "femoris",
  "tibiae",
  "fibulae",
  "radii",
  "ulnae",
  "cranialis",
  "caudalis",
  "arteria",
  "vena",
  "nervus",
  "cubiti",
  "genus",
  "coxae",
  "pubis",
  "ilii",
  "ischii",
  "mediana",
  "medianus",
  "coracoideus",
  "coronoideus",
  "coracoidea",
  "coronoidea",
  "coracoideum",
  "ilium",
  "ileum",
  "metacarpi",
  "metatarsi",
  "metacarpalis",
  "metatarsalis",
  "metacarpale",
  "metatarsale",
  "metacarpeae",
  "metatarseae",
  "malleus",
  "malleolus",
  "trochlea",
  "trochlearis",
  "humeralis",
  "femoralis",
  "cervicalis",
  "thoracica",
  "lumbalis",
  "sacralis",
  "costalis",
  "vertebralis",
  "sternalis",
  "acromialis"
];
const SAME = { majus: "major", major: "majus", minus: "minor", minor: "minus" };
function sameStem(a, b) {
  if (SAME[a] === b) return true;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i >= 5 && i >= Math.min(a.length, b.length) - 3;
}
const CRIT = new Set(CRITICAL);
function tokThreshold(len) {
  if (len <= 4) return 0;
  if (len <= 8) return 1;
  return 2;
}
function tokenClose(u, e) {
  if (u === e) return 0;
  if ((CRIT.has(u) || CRIT.has(e)) && sameStem(u, e)) return 1;
  const d = editDistance(u, e, 3);
  if (d > tokThreshold(e.length)) return -1;
  if (CRIT.has(e) || CRIT.has(u)) {
    if (CRIT.has(u)) return -1;
    for (const c of CRITICAL) if (c !== e && editDistance(u, c, 2) <= d) return -1;
  }
  return d;
}
function onlyQualifiers(ws) {
  return ws.length <= 2 && ws.every((w) => QUAL.has(w));
}
function grade(input, accepted, opts = {}) {
  const ui = tokens(input, !!opts.requireSide);
  const none = { ok: false, typo: false, matched: null, distance: 99 };
  if (!ui.length || ui.join("").length < 2) return none;
  if (opts.requireSide && opts.side) {
    const raw = norm(input).split(" ");
    const wantsR = opts.side === "r";
    const saysR = raw.some((w) => ["dexter", "dextra", "dextrum", "dextri", "dextrae", "right", "kanan", "dx"].includes(w));
    const saysL = raw.some((w) => ["sinister", "sinistra", "sinistrum", "sinistri", "sinistrae", "left", "kiri", "sin"].includes(w));
    if (wantsR && !saysR || !wantsR && !saysL) return none;
  }
  const u = ui.filter((w) => !SIDE.has(w));
  let best = none;
  for (const a of accepted) {
    const e = tokens(a, false);
    if (!e.length) continue;
    if (u.join(" ") === e.join(" ")) return { ok: true, typo: false, matched: a, distance: 0 };
    const shorter = u.length <= e.length ? u : e;
    const longer = u.length <= e.length ? e : u;
    if (shorter.every((w, i) => longer[i] === w) && onlyQualifiers(longer.slice(shorter.length))) {
      return { ok: true, typo: false, matched: a, distance: 0 };
    }
    const tryAligned = (uu, ee) => {
      if (uu.length !== ee.length) return -1;
      let total = 0;
      for (let i = 0; i < ee.length; i++) {
        const d2 = tokenClose(uu[i], ee[i]);
        if (d2 < 0) return -1;
        total += d2;
      }
      return total;
    };
    let d = tryAligned(u, e);
    if (d < 0 && u.length > e.length && onlyQualifiers(u.slice(e.length))) d = tryAligned(u.slice(0, e.length), e);
    if (d < 0 && e.length > u.length && onlyQualifiers(e.slice(u.length))) d = tryAligned(u, e.slice(0, u.length));
    if (d < 0 && u.length !== e.length) {
      const dj = editDistance(u.join(""), e.join(""), 2);
      const critOk = e.filter((w) => CRIT.has(w)).every((w) => u.join("").includes(w));
      if (dj <= 1 && critOk) d = dj;
    }
    if (d >= 0 && d < best.distance) best = { ok: true, typo: d > 0, matched: a, distance: d };
  }
  return best;
}
function seeded(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  let a = h >>> 0;
  return () => {
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function shuffled(list, rand) {
  const r = list.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
const FILLER = /* @__PURE__ */ new Set(["musculus", "musculi", "nervus", "nervi", "arteria", "arteriae", "vena", "venae", "ramus", "rami", "os", "ossis", "pars", "caput", "et", "dan", "and", "of", "the"]);
function words(s) {
  return new Set(norm(s).split(" ").filter((w) => w && !FILLER.has(w)));
}
function overlaps(a, b) {
  if (!a.size || !b.size) return false;
  let both = 0;
  for (const w of a) if (b.has(w)) both++;
  if (both === a.size || both === b.size) return true;
  return both / (a.size + b.size - both) >= 0.6;
}
const MOVES = [
  ["flex", /fle[xk]s?/],
  ["ext", /e[xk]s?ten[sd]/],
  ["abd", /abdu[ck]/],
  ["add", /addu[ck]/],
  ["rot", /rota[ts]/],
  ["pron", /prona[ts]/],
  ["sup", /supina[ts]/],
  ["protr", /protra[ck]/],
  ["retr", /retra[ck]/],
  ["elev", /eleva[ts]/],
  ["depr", /depres/],
  ["opp", /op+o[sn]/],
  ["inv", /inver[st]/],
  ["ev", /e[vw]er[st]/]
];
function moves(text) {
  const t = norm(text);
  const out = /* @__PURE__ */ new Set();
  for (const [code, re] of MOVES) if (re.test(t)) out.add(code);
  return out;
}
const CLOSE_TYPES = ["origin", "insertion", "nerve", "from", "drains", "continues"];
function choicesFor(q, pool, seed, o = {}) {
  if (q.type === "find") return null;
  const rand = seeded(`${seed}|${q.id}`);
  if (q.case) {
    const list = q.case.options.map((opt, i) => ({ text: optionText(opt, o.lang ?? "en"), ok: i === 0 })).filter((c) => c.text);
    return list.length >= 3 ? shuffled(list, rand) : null;
  }
  const want = (o.count ?? 4) - 1;
  const right = q.oneOf?.length ? q.oneOf[Math.floor(rand() * q.oneOf.length)] : q.display;
  const taken = /* @__PURE__ */ new Set([norm(right), ...(o.exclude ?? []).map(norm)]);
  const rightWords = words(right);
  const rightMoves = q.type === "action" ? moves([q.answers.join(" "), o.context ?? ""].join(" ")) : null;
  const cands = [];
  for (const other of pool) {
    if (other.type !== q.type || other.key === q.key) continue;
    for (const text of other.oneOf ?? [other.display]) {
      const n = norm(text);
      if (!n || taken.has(n)) continue;
      taken.add(n);
      const r = rand();
      if (grade(text, q.answers).ok) continue;
      if (CLOSE_TYPES.includes(q.type) && overlaps(words(text), rightWords)) continue;
      if (rightMoves) {
        const m = moves(text);
        if (m.size && [...m].every((x) => rightMoves.has(x))) continue;
      }
      cands.push({ text, near: !!q.group && other.group === q.group, r });
    }
  }
  if (cands.length < 2) return null;
  cands.sort((a, b) => Number(b.near) - Number(a.near) || a.r - b.r);
  const wrong = cands.slice(0, want).map((c) => ({ text: c.text, ok: false }));
  return shuffled([{ text: right, ok: true }, ...wrong], rand);
}
const TYPE_LABEL = {
  name: "qName",
  landmark: "qLandmark",
  find: "qFind",
  origin: "qOrigin",
  insertion: "qInsertion",
  nerve: "qNerve",
  action: "qAction",
  joint: "qJoint",
  boneType: "qBoneType",
  roots: "qRoots",
  lmBone: "qLmBone",
  articulates: "qArticulates",
  ligament: "qLigament",
  axes: "qAxes",
  from: "qFrom",
  drains: "qDrains",
  continues: "qContinues",
  lobe: "qLobe",
  case: "qCase"
};
const PREFIX = { lm: "landmark" };
function promptFor(q, t, lang) {
  switch (q.type) {
    case "name":
      return t.promptName;
    case "landmark":
      return t.promptLandmark;
    case "find":
      return t.promptFind;
    case "origin":
      return t.promptOrigin;
    case "insertion":
      return t.promptInsertion;
    case "nerve":
      return t.promptNerve;
    case "action":
      return t.promptAction;
    case "joint":
      return t.promptJoint;
    case "boneType":
      return t.promptBoneType;
    case "roots":
      return t.promptRoots;
    case "lmBone":
      return t.promptLmBone;
    case "articulates":
      return t.promptArticulates;
    case "ligament":
      return t.promptLigament;
    case "axes":
      return t.promptAxes;
    case "from":
      return q.kind === "artery" ? t.promptFromArtery : q.kind === "organ-part" ? t.promptFromBronchus : t.promptFromNerve;
    case "drains":
      return t.promptDrains;
    case "continues":
      return t.promptContinues;
    case "lobe":
      return t.promptLobe;
    case "case":
      return q.case?.stem[lang] ?? q.case?.stem.en ?? "";
  }
}
function showsName(q) {
  return q.type !== "name" && q.type !== "landmark" && q.type !== "case";
}
function cardLabel(db, t, lang, cardId) {
  const cut = cardId.indexOf(":");
  const raw = cardId.slice(0, cut);
  const key = cardId.slice(cut + 1);
  const type = PREFIX[raw] ?? raw;
  const label = TYPE_LABEL[type];
  if (type === "case") {
    const c = db.cases.find((x) => x.id === key);
    const stem = c ? c.stem[lang] ?? c.stem.en ?? "" : key;
    return { type: t.qCase, name: stem.length > 90 ? stem.slice(0, 88).trimEnd() + "…" : stem, latin: false };
  }
  return { type: label ? t[label] : raw, name: db.latin(key), latin: true };
}
const cache = /* @__PURE__ */ new Map();
function regionBoxes(engine, id2) {
  const key = id2 + ":" + engine.objects.size;
  const hit = cache.get(key);
  if (hit) return hit;
  const def = REGIONS.find((r) => r.id === id2);
  if (!def) return [];
  const out = [];
  const pad = def.pad ?? 0.03;
  for (const o of engine.objects.values()) {
    const use = id2 === "heart" ? o.layer === "heart" : def.bones ? o.rec.pack === "skeleton" && def.bones.test(o.rec.id) : false;
    if (use) out.push(o.box.clone().expandByScalar(pad));
  }
  cache.set(key, out);
  return out;
}
function inRegion(engine, id2, region) {
  const o = engine.objects.get(id2);
  if (!o) return false;
  const def = REGIONS.find((r) => r.id === region);
  if (def?.path && o.rec.path.some((p) => def.path.test(p))) return true;
  return regionBoxes(engine, region).some((b) => b.containsPoint(o.center));
}
function idsInRegion(engine, region) {
  const out = [];
  for (const o of engine.objects.values()) if (o.layer !== "attachments" && inRegion(engine, o.rec.id, region)) out.push(o.rec.id);
  return out;
}
const FRONT = new Vector3(0, 0.12, 1);
function clearStage(engine) {
  engine.batch(() => {
    for (const l of LAYERS) engine.setLayer(l.id, false);
    engine.setLayer("attachments", false);
    engine.setTint(/* @__PURE__ */ new Map());
    engine.setLandmarks([]);
    engine.setIsolate(null);
    engine.setXray(false, null);
    engine.setClip(null);
    engine.setRegion(null);
  });
  engine.setPin(null);
}
function clearMarks(engine) {
  engine.setTint(/* @__PURE__ */ new Map());
  engine.setXray(false, null);
  engine.setPin(null);
}
const hidesTarget = (q) => q.type === "find" || q.type === "lmBone" || q.type === "lobe" || q.type === "case";
function skeletonOf(engine, q) {
  return q.region ? idsInRegion(engine, q.region).filter((id2) => engine.objects.get(id2)?.layer === "skeleton") : [];
}
function pinLandmark(engine, q, close) {
  const l = q.landmark;
  if (!l) return false;
  const pnt = engine.worldPointOn(l.on, new Vector3(...l.p));
  const n = new Vector3(...l.n);
  const bone = engine.objects.get(l.on);
  const out = bone ? pnt.clone().sub(bone.center).normalize() : n.clone();
  const dir = n.clone().multiplyScalar(0.65).add(out.multiplyScalar(0.35)).normalize();
  const dist = close ? Math.max(0.15, (bone?.radius ?? 0.1) * 1.3) : (bone?.radius ?? 0.1) * 4.5;
  const scale = Math.min(close ? 1.4 : 3, Math.max(0.4, dist / 0.3));
  if (close || !bone) {
    engine.setPin(pnt, dir, "#ff5d8f", scale);
    return engine.covered(pnt, engine.framePoint(pnt, dir, dist), l.on);
  }
  const size = bone.box.getSize(new Vector3()).toArray();
  const long = size.indexOf(Math.max(...size));
  if (size[long] <= 1.8 * Math.max(...size.filter((_, i) => i !== long))) {
    engine.setPin(pnt, dir, "#ff5d8f", scale);
    engine.frameIds([l.on], { dir, pad: 1.4 });
    return false;
  }
  const along = dir.getComponent(long);
  const view = dir.clone().setComponent(long, 0);
  if (view.length() < 0.25) view.set(0, long === 2 ? 1 : 0, long === 2 ? 0 : 1);
  view.normalize().setComponent(long, MathUtils.clamp(along, -0.35, 0.35));
  view.normalize();
  const axis = new Vector3().setComponent(long, 1);
  const across = axis.clone().cross(view).normalize();
  if (across.dot(dir) < 0) across.negate();
  across.addScaledVector(axis, 0.4 * Math.sign(along)).normalize();
  engine.setPin(pnt, across, "#ff5d8f", scale);
  engine.frameIds([l.on], { dir: view, pad: 1.5 });
  return false;
}
function clearestSide(engine, ids, dir, solid) {
  let best = dir;
  let share = engine.visibleShare(ids, dir, solid);
  if (share >= 0.6) return dir;
  const up = new Vector3(0, 1, 0);
  for (const deg of [60, -60, 120, -120, 180]) {
    const alt = dir.clone().applyAxisAngle(up, MathUtils.degToRad(deg));
    const s = engine.visibleShare(ids, alt, solid);
    if (s > share + 0.12) {
      best = alt;
      share = s;
      if (s >= 0.8) break;
    }
  }
  return best;
}
function stageQuestion(engine, q) {
  const hidden = hidesTarget(q);
  engine.batch(() => {
    for (const l of LAYERS) engine.setLayer(l.id, q.layers.includes(l.id));
    for (const l of LAYERS) engine.setLayerOpacity(l.id, 1);
    engine.setLayer("attachments", true);
    engine.setAttachments([]);
    engine.setColorMode("real");
    engine.setClip(null);
    engine.setLandmarks([]);
    engine.setHidden([]);
    engine.setRegion(null);
  });
  engine.setExplode(0, false);
  engine.setSide(q.type === "find" ? "both" : q.side ?? "both");
  let iso = null;
  if (q.type === "case") iso = new Set(skeletonOf(engine, q));
  else if (q.region) {
    iso = new Set(idsInRegion(engine, q.region));
    q.ids.forEach((id2) => iso.add(id2));
    if (q.landmark) iso.add(q.landmark.on);
  }
  engine.setIsolate(iso);
  const tints = /* @__PURE__ */ new Map();
  if (!hidden && q.type !== "landmark") q.ids.forEach((id2) => tints.set(id2, "target"));
  engine.setTint(tints);
  if (q.ghost && !hidden) {
    const focus = new Set(q.ids);
    for (const o of engine.objects.values()) if (o.layer === "skeleton") focus.add(o.rec.id);
    engine.setXray(true, focus);
  } else engine.setXray(false, null);
  engine.setPin(null);
  if (q.type === "landmark") {
    if (pinLandmark(engine, q, true) && q.landmark) engine.setXray(true, /* @__PURE__ */ new Set([q.landmark.on]));
    return;
  }
  if (hidden) {
    engine.frameVisible({ dir: FRONT });
    return;
  }
  const box = new Box3();
  for (const id2 of q.ids) {
    const o = engine.objects.get(id2);
    if (o) box.union(o.box);
  }
  if (box.isEmpty()) {
    engine.frameVisible({ dir: FRONT });
    return;
  }
  const c = box.getCenter(new Vector3());
  let ref = new Vector3(0, c.y, 0);
  if (q.region) {
    const rb = new Box3();
    for (const id2 of iso ?? []) {
      const o = engine.objects.get(id2);
      if (o && o.layer === "skeleton") rb.union(o.box);
    }
    if (!rb.isEmpty()) ref = rb.getCenter(new Vector3());
  }
  const d = c.clone().sub(ref);
  d.y *= 0.25;
  const dir = d.lengthSq() > 1e-5 ? d.normalize().multiplyScalar(0.8).add(new Vector3(0, 0.1, 0.35)).normalize() : FRONT;
  const pad = q.layers.some((l) => l === "muscles" || l === "arteries" || l === "veins" || l === "nerves") ? 1.5 : 1.9;
  const solid = q.ghost ? (id2) => engine.objects.get(id2)?.layer === "skeleton" : void 0;
  engine.frameBox(box, { dir: clearestSide(engine, q.ids, dir, solid), pad });
}
function casePlace(engine, ids, lead) {
  const boxOf = (list) => {
    const b = new Box3();
    for (const id2 of list) {
      const o = engine.objects.get(id2);
      if (o) b.union(o.box);
    }
    return b;
  };
  const spans = ids.map((id2) => Math.max(...boxOf([id2]).getSize(new Vector3()).toArray()));
  const longest = Math.max(...spans);
  const small = ids.filter((_, i) => spans[i] <= 0.3 * longest);
  const all = boxOf(ids).getBoundingSphere(new Sphere());
  if (!small.length) return { box: boxOf(ids), look: ids.slice(0, Math.max(1, lead)) };
  const spot = boxOf(small).getBoundingSphere(new Sphere());
  const r = Math.max(spot.radius, 0.45 * all.radius, Math.min(all.radius, 0.07));
  const half = r / Math.sqrt(3);
  return { box: new Box3().setFromCenterAndSize(spot.center, new Vector3(2 * half, 2 * half, 2 * half)), look: small };
}
function sideOf(engine, q, place) {
  const frame = new Box3();
  for (const id2 of skeletonOf(engine, q)) {
    const o = engine.objects.get(id2);
    if (o && o.root.visible) frame.union(o.box);
  }
  if (frame.isEmpty()) return FRONT.clone();
  const d = place.getCenter(new Vector3()).sub(frame.getCenter(new Vector3()));
  d.y *= 0.25;
  return d.lengthSq() > 1e-5 ? d.normalize().multiplyScalar(0.8).add(new Vector3(0, 0.1, 0.35)).normalize() : FRONT.clone();
}
function revealAnswer(engine, q, ok, pickedId) {
  const tints = /* @__PURE__ */ new Map();
  if (q.type === "case") {
    const ids = (q.reveal ?? []).filter((id2) => engine.objects.has(id2));
    if (!ids.length) return;
    engine.setIsolate(/* @__PURE__ */ new Set([...skeletonOf(engine, q), ...ids]));
    ids.forEach((id2) => tints.set(id2, ok ? "right" : "target"));
    engine.setTint(tints);
    engine.setXray(true, new Set(ids));
    const { box, look } = casePlace(engine, ids, q.lead ?? ids.length);
    const dir = q.side ? sideOf(engine, q, box) : engine.camera.position.clone().sub(engine.controls.target).normalize();
    const shown = new Set(ids);
    engine.frameBox(box, { dir: clearestSide(engine, look, dir, (id2) => shown.has(id2)), pad: 1.25 });
    return;
  }
  if (q.type !== "landmark") q.ids.forEach((id2) => tints.set(id2, ok ? "right" : "target"));
  if (q.type === "find" && !ok && pickedId) tints.set(pickedId, "wrong");
  engine.setTint(tints);
  if (q.type === "find" && !ok) {
    const focus = new Set(q.ids);
    for (const o of engine.objects.values()) if (o.layer === "skeleton") focus.add(o.rec.id);
    engine.setXray(true, focus);
    engine.frameIds(q.ids, { pad: 1.8 });
  }
  if (q.type === "lmBone" || q.type === "lobe") {
    const focus = new Set(q.ids);
    if (q.landmark) focus.add(q.landmark.on);
    engine.setXray(true, focus);
    pinLandmark(engine, q, false);
  }
}
const WRONG = { ok: false, typo: false, matched: null, distance: 99 };
const RIGHT = { ok: true, typo: false, matched: null, distance: 0 };
const NEXT_GUARD_MS = 350;
function hintFor(ans) {
  return ans.split(" ").map((w) => w.length <= 2 ? w : w.slice(0, 2) + "_".repeat(Math.min(8, w.length - 2))).join("  ");
}
function Station({ q, idx, total, exam, choice, seed, marks, onDone, onQuit, onAtlas }) {
  const { engine, db, t, settings, ensurePacks, packProgress, compact } = useApp();
  const lang = settings.lang;
  const [input, setInput] = reactExports.useState("");
  const [given, setGiven] = reactExports.useState("");
  const [verdict, setVerdict] = reactExports.useState(null);
  const [override, setOverride] = reactExports.useState(false);
  const [picked, setPicked] = reactExports.useState(null);
  const [chosen, setChosen] = reactExports.useState(null);
  const [hint, setHint] = reactExports.useState(false);
  const [left, setLeft] = reactExports.useState(settings.examSeconds);
  const [load2, setLoad] = reactExports.useState("loading");
  const [attempt, setAttempt] = reactExports.useState(0);
  const wrapRef = reactExports.useRef(null);
  const placardRef = reactExports.useRef(null);
  const bottomRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const tagRef = reactExports.useRef(null);
  const pinLine = reactExports.useRef(null);
  const band = reactExports.useRef({ top: 0, bottom: 0 });
  const answered = reactExports.useRef(false);
  const shownAt = reactExports.useRef(0);
  const advance = reactExports.useRef(null);
  const done = verdict !== null;
  const ready = load2 === "ready";
  const isCase = q.type === "case";
  const choices = reactExports.useMemo(() => {
    if (!choice && !isCase) return null;
    const deck = DECKS.find((d) => d.id === q.deck);
    const act = db.content.get(q.key)?.facts?.action;
    return choicesFor(q, deck ? buildDeck(db, deck, settings.acceptEnglish) : [], seed, {
      lang,
      exclude: [db.latin(q.key)],
      context: act ? `${act.en ?? ""} ${act.id ?? ""}` : ""
    });
  }, [q, choice, isCase, seed, lang, db, settings.acceptEnglish]);
  reactExports.useEffect(() => {
    let gone = false;
    clearMarks(engine);
    setLoad("loading");
    ensurePacks(q.packs).then(
      () => {
        if (gone) return;
        stageQuestion(engine, q);
        setLoad("ready");
      },
      () => {
        if (!gone) setLoad("failed");
      }
    );
    return () => {
      gone = true;
    };
  }, [attempt]);
  reactExports.useEffect(
    () => () => {
      if (advance.current !== null) window.clearTimeout(advance.current);
      engine.setPin(null);
    },
    [engine]
  );
  const measure = reactExports.useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.getBoundingClientRect();
    const top = placardRef.current ? Math.max(0, Math.round(placardRef.current.getBoundingClientRect().bottom - w.top + 8)) : 0;
    let bottom2 = bottomRef.current ? Math.max(0, Math.round(w.bottom - bottomRef.current.getBoundingClientRect().top + 8)) : 0;
    bottom2 = Math.max(0, Math.min(bottom2, w.height - 140 - top));
    band.current = { top, bottom: bottom2 };
    engine.setInsets(0, 0, bottom2, top);
  }, [engine]);
  reactExports.useLayoutEffect(() => {
    measure();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    if (placardRef.current) ro?.observe(placardRef.current);
    if (bottomRef.current) ro?.observe(bottomRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, done, load2, compact]);
  reactExports.useEffect(() => {
    const vv = window.visualViewport;
    const wrap = wrapRef.current;
    if (!vv || !wrap) return;
    const apply = () => {
      const zoomed = Math.abs(vv.scale - 1) > 0.01;
      const kb = zoomed ? 0 : Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      const open = kb > 80;
      wrap.style.setProperty("--kb", `${open ? kb : 0}px`);
      wrap.classList.toggle("kb", open);
      measure();
    };
    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    return () => {
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
    };
  }, [measure]);
  reactExports.useEffect(() => {
    if (!ready || choices || q.type === "find") return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    const tm = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
    return () => window.clearTimeout(tm);
  }, [ready, choices, q.type]);
  reactExports.useEffect(() => {
    const off = engine.onFrame(() => {
      const el = tagRef.current, svg = pinLine.current;
      const head = engine.getPinHead();
      if (!el || !svg) return;
      if (!head) {
        el.style.display = "none";
        svg.style.visibility = "hidden";
        return;
      }
      const pr = engine.project(head, true);
      if (pr.behind) {
        el.style.display = "none";
        svg.style.visibility = "hidden";
        return;
      }
      const box = (svg.parentElement ?? svg).getBoundingClientRect();
      const lm = q.landmark;
      const bone = lm ? engine.objects.get(lm.on) : void 0;
      let dx = 0.75, dy = -0.66;
      if (bone) {
        const c2 = engine.project(engine.worldPointOn(bone.rec.id, bone.center));
        const vx = pr.x - c2.x, vy = pr.y - c2.y;
        const len = Math.hypot(vx, vy);
        if (len > 4) {
          dx = vx / len;
          dy = vy / len;
        }
      }
      const reach = 78;
      let x = pr.x + dx * reach, y = pr.y + dy * reach;
      const lo = band.current.top + 14, hi = box.height - band.current.bottom - 28;
      if (y < lo || y > hi) {
        y = Math.max(lo, Math.min(hi, y));
        x = pr.x + (dx < 0 ? -1 : 1) * Math.max(Math.abs(dx) * reach, Math.sqrt(Math.max(0, reach * reach - (y - pr.y) ** 2)));
      }
      x = Math.max(36, Math.min(box.width - 36, x));
      el.style.display = "grid";
      svg.style.visibility = "visible";
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
      el.classList.toggle("dim", pr.occluded);
      const d = `M${pr.x.toFixed(1)} ${pr.y.toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}`;
      svg.querySelectorAll("path").forEach((pth) => pth.setAttribute("d", d));
      const dot = svg.querySelector("circle");
      dot?.setAttribute("cx", pr.x.toFixed(1));
      dot?.setAttribute("cy", pr.y.toFixed(1));
    });
    return () => {
      off();
    };
  }, [engine, q]);
  const finish = (v, typed) => {
    if (answered.current) return;
    answered.current = true;
    shownAt.current = performance.now();
    setGiven(typed);
    setVerdict(v);
    if (exam) advance.current = window.setTimeout(() => onDone({ q, input: typed, ok: v.ok, typo: v.typo }), 320);
  };
  const submit = () => {
    if (done || !ready || !input.trim()) return;
    finish(grade(input, q.answers, { requireSide: settings.requireSide && q.type === "name", side: q.side }), input);
  };
  const choose = (i) => {
    if (done || !ready || !choices || !choices[i]) return;
    setChosen(i);
    finish(choices[i].ok ? RIGHT : WRONG, choices[i].text);
  };
  const timeUp = () => {
    if (q.type !== "find" && !choices && input.trim()) finish(grade(input, q.answers, { requireSide: settings.requireSide && q.type === "name", side: q.side }), input);
    else finish(WRONG, "");
  };
  const commit = () => {
    if (!verdict) return;
    onDone({ q, input: given, ok: override || verdict.ok, typo: verdict.typo && !override, overridden: override || void 0 });
  };
  reactExports.useEffect(() => {
    if (q.type !== "find" || done || !ready) return;
    const off = engine.onPick((hit) => {
      if (!hit) return;
      const rec = db.byId.get(hit.id);
      if (!rec) return;
      const ok = q.ids.includes(hit.id) || rec.k === q.key || db.parentConcept(rec) === q.key;
      setPicked(hit.id);
      finish(ok ? RIGHT : WRONG, db.clickedName(rec));
    });
    return () => {
      off();
    };
  }, [done, ready]);
  reactExports.useEffect(() => {
    if (!choices || done || !ready) return;
    const onKey = (e) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const i = e.key.length === 1 ? "1234".indexOf(e.key) : -1;
      if (i < 0 || i >= choices.length) return;
      e.preventDefault();
      choose(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choices, done, ready]);
  reactExports.useEffect(() => {
    if (!exam || done || !ready) return;
    const end = performance.now() + settings.examSeconds * 1e3;
    const tick = () => {
      const s = Math.max(0, Math.ceil((end - performance.now()) / 1e3));
      setLeft(s);
      if (s <= 0) timeUp();
    };
    const iv = window.setInterval(tick, 250);
    return () => window.clearInterval(iv);
  }, [exam, done, ready]);
  reactExports.useEffect(() => {
    if (!verdict || exam) return;
    measure();
    revealAnswer(engine, q, verdict.ok, picked);
  }, [verdict]);
  const c = db.content.get(q.key);
  const f2 = c?.facts ?? {};
  const card = getCard(q.id);
  const latinAnswer = q.type === "name" || q.type === "landmark";
  const state = override || verdict?.ok && !verdict.typo ? "right" : verdict?.ok ? "almost" : "wrong";
  const rightText = choices?.find((x) => x.ok)?.text;
  const answerText = isCase ? rightText ?? q.display : latinAnswer || q.type === "find" ? db.latin(q.key) : q.display;
  const note = isCase ? void 0 : f2.clinical ?? f2.lesion;
  const factTypes = ["origin", "insertion", "nerve", "action", "joint", "boneType", "roots"];
  const total0 = settings.examSeconds;
  const R = 27, C = 2 * Math.PI * R;
  const progress = q.packs.length ? Math.round(q.packs.reduce((a, p) => a + (engine.isLoaded(p) ? 1 : packProgress[p] ?? 0), 0) / q.packs.length * 100) : 0;
  const oneColumn = isCase || compact || !!choices?.some((x) => x.text.length > 34);
  const setBottom = (el) => {
    bottomRef.current = el;
  };
  let bottom;
  if (load2 === "failed")
    bottom = /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "answer glass settle", ref: setBottom, role: "alert", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "answer-find", children: t.stationFailed }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "answer-retry", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn primary", onClick: () => setAttempt((a) => a + 1), children: t.retry }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn ghost", onClick: () => onDone({ q, input: "", ok: false, typo: false, unscored: true }), children: t.skipStation })
      ] })
    ] });
  else if (load2 === "loading")
    bottom = /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "answer glass", ref: setBottom, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "answer-wait", role: "status", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spinner", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.stationLoading }),
      progress > 0 && progress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "num", children: [
        progress,
        "%"
      ] })
    ] }) });
  else if (!verdict || exam)
    bottom = choices ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "answer glass settle", ref: setBottom, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `choices${oneColumn ? " one" : ""}`, role: "group", "aria-label": t.chooseAnswer, children: choices.map((ch, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "choice", "data-s": chosen === i ? "picked" : void 0, disabled: done, onClick: () => choose(i), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "choice-key num", "aria-hidden": "true", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isCase ? "choice-text" : "choice-text latin", children: ch.text })
      ] }, ch.text)) }),
      !exam && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "answer-aux", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link", onClick: () => finish(WRONG, ""), children: t.skip })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        className: "answer glass settle",
        ref: setBottom,
        onSubmit: (e) => {
          e.preventDefault();
          submit();
        },
        children: [
          hint && !done && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint-text latin", children: hintFor(q.oneOf?.[0] ?? q.display) }),
          q.type !== "find" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "answer-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                className: latinAnswer ? "latin" : "",
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && e.repeat) e.preventDefault();
                },
                placeholder: latinAnswer ? t.typeLatin : t.typeAnswer,
                "aria-label": latinAnswer ? t.typeLatin : t.typeAnswer,
                autoComplete: "off",
                autoCapitalize: "off",
                autoCorrect: "off",
                spellCheck: false,
                enterKeyHint: "done",
                lang: "la",
                disabled: done
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", type: "submit", disabled: !input.trim() || done, children: t.submit })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "answer-find", children: t.clickModel }),
          !exam && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "answer-aux", children: [
            q.type !== "find" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link", onClick: () => setHint(true), disabled: hint, children: t.hintBtn }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link", onClick: () => finish(WRONG, ""), children: t.skip })
          ] })
        ]
      }
    );
  else
    bottom = /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "feedback glass", "data-v": state, role: "status", ref: setBottom, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "verdict", children: [
        state === "wrong" ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconCross, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, {}),
        override ? t.correct : verdict.ok ? verdict.typo ? t.almost : t.correct : q.type === "find" && picked ? `${t.wrong}. ${t.findWrong}: ${given}` : t.wrong
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "fb-answer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: q.oneOf && q.oneOf.length > 1 ? t.anyOf : t.answerWas }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isCase ? "plain" : q.oneOf && q.oneOf.length > 2 ? "latin list" : "latin", children: answerText })
      ] }),
      q.type !== "find" && given && (!choices || !verdict.ok) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "fb-you", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: choices ? t.youChose : t.youWrote }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isCase ? "plain" : "latin", children: given })
      ] }),
      factTypes.includes(q.type) && /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "facts", children: [
        q.type === "origin" && f2.origin ? /* @__PURE__ */ jsxRuntimeExports.jsx(Fact, { label: t.origin, v: f2.origin.la }) : null,
        q.type === "insertion" && f2.insertion ? /* @__PURE__ */ jsxRuntimeExports.jsx(Fact, { label: t.insertion, v: f2.insertion.la }) : null,
        q.type === "nerve" && f2.nerve ? /* @__PURE__ */ jsxRuntimeExports.jsx(Fact, { label: t.nerve, v: `${f2.nerve.la ?? ""} ${f2.nerve.roots ? "(" + f2.nerve.roots + ")" : ""}` }) : null,
        q.type === "action" && f2.action ? /* @__PURE__ */ jsxRuntimeExports.jsx(Fact, { label: t.action, v: f2.action[lang] ?? f2.action.en, plain: true }) : null,
        q.type === "joint" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Fact, { label: t.joint, v: [f2.class, f2.subtype, f2.axes].filter(Boolean).join(", ") }) : null
      ] }),
      isCase && q.case && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "desc", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          t.explanation,
          "."
        ] }),
        " ",
        q.case.explain[lang] ?? q.case.explain.en
      ] }),
      !isCase && !factTypes.includes(q.type) && c?.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc", children: c.desc[lang] ?? c.desc.en }),
      note && (note[lang] ?? note.en) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "desc note", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          f2.clinical ? t.clinical : t.lesion,
          "."
        ] }),
        " ",
        note[lang] ?? note.en
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fb-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fb-links", children: [
          !verdict.ok && !override && q.type !== "find" && !choices && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link", onClick: () => setOverride(true), children: t.iWasRight }),
          onAtlas && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "link",
              onClick: () => {
                commit();
                onAtlas(q.landmark?.k ?? q.key);
              },
              children: t.seeInAtlas
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "btn primary",
            autoFocus: true,
            onKeyDown: (e) => {
              if (e.repeat) e.preventDefault();
            },
            onClick: () => {
              if (performance.now() - shownAt.current < NEXT_GUARD_MS) return;
              commit();
            },
            children: idx + 1 >= total ? t.finish : t.next
          }
        )
      ] })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `quiz-wrap run${isCase ? " case" : ""}`, ref: wrapRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ref: pinLine, className: "leader pin-leader", style: { visibility: "hidden" }, "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "leader-halo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "leader-line" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "leader-dot", r: "3.5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: tagRef, className: "pin-tag glass num", style: { display: "none" }, "aria-hidden": "true", children: idx + 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "placard glass settle", "aria-live": "polite", ref: placardRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `placard-num ${exam ? "timed" : ""} ${exam && left <= 10 ? "low" : ""}`, children: [
        exam && /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 64 64", className: "ring", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: R, className: "ring-bg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: R, className: "ring-fg", strokeDasharray: C, strokeDashoffset: C * (1 - Math.max(0, left) / total0) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num big", children: idx + 1 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "placard-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "placard-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            t.station,
            " ",
            idx + 1,
            " ",
            t.of,
            " ",
            total
          ] }),
          exam ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `num timer ${left <= 10 ? "low" : ""}`, children: fmt(t.secondsLeft, { n: Math.max(0, left) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link", onClick: onQuit, children: t.finish })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: isCase ? "placard-prompt stem" : "placard-prompt", children: promptFor(q, t, lang) }),
        showsName(q) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "placard-latin latin", children: q.label ?? db.latin(q.key) }),
        !exam && card && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "placard-card num", children: [
          card.right,
          "/",
          card.seen
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "placard-track", "aria-hidden": "true", children: marks.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { "data-s": i === idx ? "c" : m === null ? void 0 : m ? "r" : "w" }, i)) })
    ] }),
    bottom
  ] });
}
function Fact({ label, v, plain }) {
  if (!v) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fact", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: plain ? "" : "latin", children: String(v) })
  ] });
}
function SecondsInput({ value, onChange, min = 15, max = 300 }) {
  const [text, setText] = reactExports.useState(String(value));
  reactExports.useEffect(() => setText(String(value)), [value]);
  const commit = () => {
    const n = parseInt(text, 10);
    const v = Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : value;
    setText(String(v));
    if (v !== value) onChange(v);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "number",
      inputMode: "numeric",
      className: "num-input",
      min,
      max,
      step: 5,
      value: text,
      onChange: (e) => setText(e.target.value),
      onBlur: commit,
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        }
      }
    }
  );
}
let parked = null;
const deckName = (d, lang) => `${d.code} ${lang === "id" ? d.idn : d.en}`;
function Quiz({ focusKey, onFocusDone, onAtlas }) {
  const app = useApp();
  const { engine, db, t, settings, ensurePacks } = app;
  const english = settings.acceptEnglish;
  const [start0] = reactExports.useState(() => parked);
  const [phase, setPhase] = reactExports.useState(start0?.phase ?? "decks");
  const [run2, setRun] = reactExports.useState(start0?.run ?? null);
  const [saved, setSaved] = reactExports.useState(() => start0 ? null : loadSession());
  const [deck, setDeck] = reactExports.useState(null);
  const pool = reactExports.useMemo(() => deck ? buildDeck(db, deck, english) : [], [db, deck, english]);
  const [mode, setMode] = reactExports.useState("practice");
  const [types, setTypes] = reactExports.useState([]);
  const [size, setSize] = reactExports.useState(20);
  const [version, setVersion] = reactExports.useState(0);
  const live = reactExports.useRef({ phase: start0?.phase ?? "decks", run: start0?.run ?? null });
  const go = reactExports.useCallback((p, r) => {
    live.current = { phase: p, run: r };
    setPhase(p);
    setRun(r);
  }, []);
  reactExports.useEffect(() => {
    parked = null;
    return () => {
      const { phase: p, run: r } = live.current;
      parked = r && (p === "run" || p === "results") ? { phase: p, run: r } : null;
    };
  }, []);
  reactExports.useEffect(() => {
    if (phase !== "run") clearStage(engine);
  }, [phase, engine]);
  reactExports.useEffect(() => {
    if (phase === "run" && run2)
      saveSession({
        v: 1,
        deck: run2.deck,
        mode: run2.mode,
        choice: run2.choice,
        ids: run2.session.map((q) => q.id),
        answers: run2.answers.map((a) => ({ id: a.q.id, ok: a.ok, typo: a.typo, input: a.input, overridden: a.overridden, unscored: a.unscored })),
        seed: run2.seed,
        at: Date.now()
      });
    else if (phase === "results") saveSession(null);
  }, [phase, run2]);
  const startRun = reactExports.useCallback(
    (o) => {
      setSaved(null);
      go("run", { deck: o.deck, mode: o.mode, choice: o.choice ?? settings.answerMode === "choice", session: o.session, idx: 0, answers: [], seed: Date.now().toString(36) });
    },
    [go, settings.answerMode]
  );
  reactExports.useEffect(() => {
    if (!focusKey) return;
    onFocusDone();
    const list = [];
    for (const q of questionIndex(db, english).values()) {
      const own = q.key === focusKey && q.type !== "case";
      const onIt = !!q.landmark && q.type !== "lmBone" && db.byId.get(q.landmark.on)?.k === focusKey;
      if (own || onIt || q.case?.focus.includes(focusKey)) list.push(q);
    }
    if (!list.length) {
      app.toast(t.noQuestionsHere);
      return;
    }
    startRun({ deck: null, mode: "practice", session: list.slice(0, 30) });
  }, [focusKey]);
  const openDeck = (d) => {
    const qs = buildDeck(db, d, english);
    setDeck(d);
    setTypes(d.types.filter((ty) => qs.some((q) => q.type === ty)));
    go("setup", null);
    ensurePacks(d.packs).catch(() => {
    });
  };
  const onDone = reactExports.useCallback(
    (a) => {
      const { phase: p, run: r } = live.current;
      if (p !== "run" || !r || r.session[r.idx]?.id !== a.q.id) return;
      if (!a.unscored) review(a.q.id, a.ok, a.typo);
      const answers = [...r.answers, a];
      if (r.idx + 1 >= r.session.length) {
        go("results", { ...r, answers });
        setVersion((v) => v + 1);
      } else go("run", { ...r, answers, idx: r.idx + 1 });
    },
    [go]
  );
  const quit = () => {
    const r = live.current.run;
    if (r && r.answers.length) go("results", r);
    else {
      saveSession(null);
      go("decks", null);
    }
    setVersion((v) => v + 1);
  };
  const resume = (s) => {
    const index = questionIndex(db, english, s.deck);
    const session = s.ids.map((id2) => index.get(id2)).filter((q) => !!q);
    const answers = [];
    for (const a of s.answers) {
      const q = index.get(a.id);
      if (q) answers.push({ q, input: a.input, ok: a.ok, typo: a.typo, overridden: a.overridden, unscored: a.unscored });
    }
    setSaved(null);
    if (!session.length || answers.length >= session.length) {
      saveSession(null);
      app.toast(t.resumeGone);
      return;
    }
    go("run", { deck: s.deck, mode: s.mode, choice: s.choice, session, idx: answers.length, answers, seed: s.seed || Date.now().toString(36) });
  };
  if (phase === "setup" && deck)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Setup,
      {
        deck,
        pool,
        mode,
        setMode,
        types,
        setTypes,
        size,
        setSize,
        onStart: () => {
          const session = makeSession(pool, { types, size, mode });
          if (!session.length) app.toast(t.emptyDeck);
          else startRun({ deck: deck.id, mode, session });
        },
        onBack: () => go("decks", null)
      }
    );
  if (phase === "run" && run2 && run2.session[run2.idx]) {
    const q = run2.session[run2.idx];
    const exam = run2.mode === "exam";
    const marks = run2.session.map((_, i) => {
      const a = run2.answers[i];
      return exam || !a || a.unscored ? null : a.ok;
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Station,
      {
        q,
        idx: run2.idx,
        total: run2.session.length,
        exam,
        choice: run2.choice,
        seed: run2.seed,
        marks,
        onDone,
        onQuit: quit,
        onAtlas: exam ? void 0 : onAtlas
      },
      `${run2.seed}:${run2.idx}:${q.id}`
    );
  }
  if (phase === "results" && run2)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Results,
      {
        run: run2,
        onMisses: (misses) => startRun({ deck: run2.deck, mode: "practice", session: misses, choice: run2.choice }),
        onBack: () => {
          go("decks", null);
          setVersion((v) => v + 1);
        }
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DeckPicker,
    {
      onOpen: openDeck,
      version,
      saved,
      onResume: () => saved && resume(saved),
      onDiscard: () => {
        saveSession(null);
        setSaved(null);
      },
      onReviewDue: () => {
        const list = dueQuestions(db, english).slice(0, 30);
        if (list.length) startRun({ deck: null, mode: "practice", session: list });
      }
    }
  );
}
function DeckPicker({ onOpen, version, saved, onResume, onDiscard, onReviewDue }) {
  const { db, t, settings } = useApp();
  const lang = settings.lang;
  const { rows, due } = reactExports.useMemo(() => {
    const list = DECKS.map((d) => ({ d, s: deckStats(buildDeck(db, d, false)) })).filter((x) => x.s.total > 0);
    return { rows: list, due: dueQuestions(db, false).length };
  }, [db, version]);
  const savedDeck = saved ? DECKS.find((d) => d.id === saved.deck) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz-scroll", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "deck-intro", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: t.chooseDeck }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t.deckLede })
    ] }),
    (saved || due > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "deck-now", children: [
      saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "now-card glass settle", "aria-label": t.resumeTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.resumeTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(t.resumeInfo, { deck: savedDeck ? deckName(savedDeck, lang) : t.mixedSession, n: saved.answers.length + 1, m: saved.ids.length }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "now-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: onResume, children: t.resume }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn ghost", onClick: onDiscard, children: t.discard })
        ] })
      ] }),
      due > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "now-card glass settle", "aria-label": t.reviewDue, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
            t.reviewDue,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "num", children: [
              "(",
              due,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.reviewDueHelp })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "now-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: saved ? "btn" : "btn primary", onClick: onReviewDue, children: t.start }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "slides", children: rows.map(({ d, s }, i) => {
      const pct = Math.round(s.mastered / s.total * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "settle", style: { ["--i"]: i }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "slide", onClick: () => onOpen(d), "aria-label": `${d.code}, ${lang === "id" ? d.idn : d.en}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "slide-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slide-code", children: d.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slide-title", children: lang === "id" ? d.idn : d.en })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "slide-clear", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slide-cover", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smear, { seed: i + 3 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "slide-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slide-blurb", children: d.blurb[lang] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "slide-stats", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "num", children: s.total }),
                " ",
                t.questions
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "num", children: s.due }),
                " ",
                t.dueShort
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "num", children: s.mastered }),
                " ",
                t.mastered
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slide-meter", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { width: `${pct}%` } }) })
          ] })
        ] })
      ] }) }, d.id);
    }) })
  ] }) });
}
function Smear({ seed }) {
  let s = seed * 9301 + 49297;
  const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const cells = Array.from({ length: 18 }, () => ({ x: 14 + r() * 72, y: 14 + r() * 72, rr: 7 + r() * 9 }));
  const nuclei = Array.from({ length: 16 }, () => ({ x: 18 + r() * 64, y: 18 + r() * 64, rr: 1.6 + r() * 1.6 }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "smear", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: `sm${seed}`, x: "-20%", y: "-20%", width: "140%", height: "140%", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2.2" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: `sc${seed}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M50 ${8 + r() * 6}C${80 + r() * 10} 10 ${92} ${40 + r() * 10} ${86} 66C${80} 90 ${40} ${94} 22 80C6 66 8 30 50 ${8 + r() * 6}Z` }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { clipPath: `url(#sc${seed})`, filter: `url(#sm${seed})`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100", height: "100", fill: "rgba(255,93,143,.16)" }),
      cells.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: c.x, cy: c.y, r: c.rr, fill: "rgba(255,120,170,.28)" }, i)),
      nuclei.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: c.x, cy: c.y, r: c.rr, fill: "rgba(123,108,255,.75)" }, "n" + i))
    ] })
  ] });
}
function Setup(p) {
  const { t, settings, setSettings } = useApp();
  const lang = settings.lang;
  const d = p.deck;
  const typed = d.types.some((ty) => ty !== "case");
  const available = p.pool.filter((q) => p.types.includes(q.type)).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz-scroll", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "setup glass", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setup-slide", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slide-code", children: d.code }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: lang === "id" ? d.idn : d.en }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: d.blurb[lang] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "modes", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.mode }),
      ["practice", "exam"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mode-opt", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "mode", checked: p.mode === m, onChange: () => p.setMode(m) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: m === "practice" ? t.practice : t.exam }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: m === "practice" ? t.practiceHelp : t.examHelp })
        ] })
      ] }, m))
    ] }),
    typed && /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "modes", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.answerMode }),
      ["type", "choice"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mode-opt", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "answer", checked: settings.answerMode === m, onChange: () => setSettings({ answerMode: m }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: m === "type" ? t.answerType : t.answerChoice }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: m === "type" ? t.answerTypeHelp : t.answerChoiceHelp })
        ] })
      ] }, m))
    ] }),
    d.types.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.questionTypes }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chips", children: d.types.map((ty) => {
        const n = p.pool.filter((q) => q.type === ty).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "chip check", "data-off": !n || void 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", disabled: !n, checked: p.types.includes(ty), onChange: (e) => p.setTypes((cur) => e.target.checked ? [...cur, ty] : cur.filter((x) => x !== ty)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t[TYPE_LABEL[ty]] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num count", children: n })
        ] }, ty);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.howMany }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", className: "range", min: 5, max: 60, step: 5, value: p.size, onChange: (e) => p.setSize(parseInt(e.target.value, 10)), "aria-label": t.howMany }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("output", { className: "num big-num", children: Math.min(p.size, Math.max(available, 0)) })
      ] })
    ] }),
    (typed || p.mode === "exam") && /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.quizSettings }),
      typed && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", role: "switch", checked: settings.acceptEnglish, onChange: (e) => setSettings({ acceptEnglish: e.target.checked }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "switch-track", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.acceptEnglish })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", role: "switch", checked: settings.requireSide, onChange: (e) => setSettings({ requireSide: e.target.checked }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "switch-track", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.requireSide })
        ] })
      ] }),
      p.mode === "exam" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.secondsPerStation }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondsInput, { value: settings.examSeconds, onChange: (n) => setSettings({ examSeconds: n }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: p.onStart, disabled: !available, children: p.mode === "exam" ? t.startExam : t.start }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn ghost", onClick: p.onBack, children: t.backToDecks })
    ] })
  ] }) }) });
}
function Results({ run: run2, onMisses, onBack }) {
  const { db, t, settings } = useApp();
  const lang = settings.lang;
  const scored = run2.answers.filter((a) => !a.unscored);
  const right = scored.filter((a) => a.ok).length;
  const misses = scored.filter((a) => !a.ok).map((a) => a.q);
  const total = scored.length;
  const label = (q) => {
    if (q.case) return q.case.stem[lang] ?? q.case.stem.en ?? "";
    return q.type === "name" || q.type === "landmark" || q.type === "find" ? db.latin(q.key) : `${q.label ?? db.latin(q.key)}: ${q.display}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quiz-scroll", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "results glass", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: t.results }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "score", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num big", children: right }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "num of", children: [
        "/",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "lede", children: [
      t.score,
      " ",
      fmt(t.percent, { n: total ? Math.round(right / total * 100) : 0 }),
      run2.mode === "exam" ? `, ${t.exam}` : ""
    ] }),
    run2.answers.length < run2.session.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: fmt(t.answeredOf, { n: run2.answers.length, m: run2.session.length }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "res-list", children: run2.answers.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { "data-ok": a.ok || void 0, "data-void": a.unscored || void 0, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mark", children: a.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconCross, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: a.q.case ? "res-stem" : "latin", children: label(a.q) }),
        a.q.case && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
          t.answerWas,
          ": ",
          optionText(a.q.case.options[0], lang)
        ] }),
        a.unscored ? /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: t.notScored }) : a.input && !(a.q.case && a.ok) && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
          run2.choice || a.q.case ? t.youChose : t.youWrote,
          ": ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: a.q.case ? "" : "latin", children: a.input })
        ] })
      ] })
    ] }, a.q.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", children: [
      misses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", onClick: () => onMisses(misses), children: [
        t.reviewMistakes,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "num", children: [
          "(",
          misses.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn ghost", onClick: onBack, children: t.backToDecks })
    ] })
  ] }) }) });
}
function ProgressPage() {
  const { db, t, settings } = useApp();
  const [v, setV] = reactExports.useState(0);
  const rows = reactExports.useMemo(() => {
    return DECKS.map((d) => ({ d, s: deckStats(buildDeck(db, d, false)) })).filter((x) => x.s.total > 0);
  }, [db, v]);
  const cards = allCards();
  const ids = Object.keys(cards);
  const seen2 = ids.reduce((a, k) => a + cards[k].seen, 0);
  const right = ids.reduce((a, k) => a + cards[k].right, 0);
  const hardest = ids.filter((k) => cards[k].lapses > 0).sort((a, b) => cards[b].lapses - cards[a].lapses || cards[a].right / cards[a].seen - cards[b].right / cards[b].seen).slice(0, 15);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "doc glass settle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: t.progressTitle }),
    !ids.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: t.progressEmpty }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "stat-line", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "num big", children: [
        seen2 ? Math.round(right / seen2 * 100) : 0,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        t.accuracy,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "num", children: [
          right,
          "/",
          seen2
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", children: t.practical }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", children: t.colQuestions }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", children: t.colDue }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", children: t.colNew }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", children: t.colMastered })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map(({ d, s }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { scope: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "code", children: d.code }),
          settings.lang === "id" ? d.idn : d.en
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: s.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: s.due }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: s.fresh }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: s.mastered })
      ] }, d.id)) })
    ] }) }),
    hardest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: t.weakest }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: hardest.map((k) => {
        const l = cardLabel(db, t, settings.lang, k);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "row", className: l.latin ? "latin" : void 0, children: l.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: l.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "num", children: [
            cards[k].right,
            "/",
            cards[k].seen
          ] })
        ] }, k);
      }) }) }) })
    ] }),
    ids.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "doc-foot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "btn ghost",
        onClick: () => {
          if (window.confirm(t.resetConfirm)) {
            resetAll();
            setV(v + 1);
          }
        },
        children: t.resetProgress
      }
    ) })
  ] }) });
}
function AboutPage() {
  const { settings, t } = useApp();
  const id2 = settings.lang === "id";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "doc glass settle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: t.aboutTitle }),
    id2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "Raga adalah atlas anatomi 3D dan kuis isian singkat yang gratis dan terbuka. Raga dibuat oleh Resvet untuk belajar Blok 4 (tulang, sendi, otot, pembuluh darah, saraf, jantung, dan paru) dan untuk siapa saja yang sedang mempelajari anatomi. Pendidikan semestinya dapat diakses semua orang." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Cara memakai" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Di Atlas, klik sebuah struktur untuk membaca nama Latin, origo, insersio, aksi, persarafan, dan penanda tulangnya. Geser pengukur kedalaman di kiri untuk mengupas lapisan dari kulit sampai tulang, dan pilih regio pada peta tubuh. Di Gerak, pilih gerakan sendi untuk melihat otot yang berkontraksi. Di Kuis, pilih materi praktikum lalu jawab dengan mengetik nama Latin atau memilih dari pilihan ganda. Soal yang salah akan muncul lagi lebih cepat, simulasi OSPE memberi waktu per stase seperti ujian sebenarnya, dan kasus klinis melatih penerapan anatomi pada pasien. Sesi yang terputus dapat dilanjutkan." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Penting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Isi Raga disusun dari buku ajar standar (Moore, Gray, Netter, Sobotta) dan modul praktikum, lalu diperiksa ulang. Kesalahan tetap mungkin ada. Bila menemukan yang keliru atau berbeda dengan materi dosen, ikuti dosen Anda dan laporkan melalui GitHub agar dapat diperbaiki. Kemajuan kuis hanya tersimpan di perangkat Anda. Raga tidak mengirim data apa pun." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "Raga is a free, open-source 3D anatomy atlas with Latin short-answer quizzes. It was made by Resvet for Blok 4 (bones, joints, muscles, vessels, nerves, heart and lungs) and for anyone else learning anatomy. Education should be free." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How to use it" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In the Atlas, click a structure to read its Latin name, origin, insertion, action, innervation and landmarks. Drag the depth gauge on the left to peel the layers from skin to bone, and pick a region on the body map. In Motion, choose a joint movement to see which muscles contract. In the Quiz, pick a practical and answer by typing the Latin name or by multiple choice. Cards you miss come back sooner, the OSPE simulation times each station like the real exam, and the clinical cases apply the anatomy to patients. A session you leave halfway can be picked up again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Please note" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The content was written from standard textbooks (Moore, Gray, Netter, Sobotta) and the course module, then checked again. Mistakes can still slip through. If something is wrong or differs from what your lecturer teaches, follow your lecturer and report it on GitHub so it can be fixed. Quiz progress stays on your device. Raga sends no data anywhere." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: t.credits }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "credits", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        id2 ? "Model 3D" : "3D models",
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/Z-Anatomy/The-blend", children: "Z-Anatomy" }),
        " ",
        id2 ? "oleh" : "by",
        " Gauthier Kervyn, Marcin Zielinski ",
        id2 ? "dan" : "and",
        " Lluís Vinent (CC BY-SA 4.0), ",
        id2 ? "berdasarkan" : "based on",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html", children: "BodyParts3D" }),
        ", The Database Center for Life Science (CC BY-SA 2.1 JP).",
        " ",
        id2 ? "Dikonversi, disederhanakan, dan dikompresi untuk web oleh Raga. Struktur yang diambil Z-Anatomy dari sumber nonkomersial (telinga dalam, ginjal) tidak disertakan." : "Converted, simplified and compressed for the web by Raga. Structures that Z-Anatomy took from non-commercial sources (inner ear, kidney) are left out."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: id2 ? "Nama Latin dan nama dalam berbagai bahasa: tabel Terminologia Anatomica 2 yang disertakan Z-Anatomy." : "Latin and multilingual names: the Terminologia Anatomica 2 table shipped with Z-Anatomy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: id2 ? "Teks ensiklopedia: Wikipedia (CC BY-SA), sebagaimana dikemas Z-Anatomy." : "Encyclopedia texts: Wikipedia (CC BY-SA), as packaged by Z-Anatomy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        id2 ? "Huruf" : "Fonts",
        ": Schibsted Grotesk (The Schibsted Grotesk Project Authors, OFL) ",
        id2 ? "dan" : "and",
        " Brygada 1918 (The Brygada 1918 Project Authors, OFL)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        id2 ? "Perender" : "Rendering",
        ": three.js (MIT), three-mesh-bvh (MIT). ",
        id2 ? "Kompresi mesh" : "Mesh compression",
        ": meshoptimizer (MIT)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: id2 ? "Kode Raga: lisensi MIT. Model dan data Raga: CC BY-SA 4.0." : "Raga code: MIT licence. Raga models and data: CC BY-SA 4.0." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "doc-foot", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "btn", href: "https://github.com/ResVet/Raga", target: "_blank", rel: "noreferrer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconGithub, {}),
      " ",
      t.sourceCode
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sr-only", children: fmt(t.graphicsNow, { x: settings.quality }) })
  ] }) });
}
const FX_LABEL = {
  shadows: ["fxShadows", "fxShadowsHelp"],
  dof: ["fxDof", "fxDofHelp"],
  bloom: ["fxBloom", "fxBloomHelp"],
  ao: ["fxAo", "fxAoHelp"],
  adaptive: ["fxAdaptive", "fxAdaptiveHelp"]
};
function SettingsDialog({ open, onClose, onAbout }) {
  const { t, settings, setSettings, fxDefaults, fxSupported } = useApp();
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const fx = { ...fxDefaults, ...settings.effects };
  const help = (q) => q === "ultra" ? t.tierUltraHelp : q === "high" ? t.tierHighHelp : t.tierLiteHelp;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("dialog", { ref, className: "dialog glass", onClose, onCancel: onClose, "aria-labelledby": "set-title", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "dialog-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "set-title", children: t.settings }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", "aria-label": t.close, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClose, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dialog-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.language }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", role: "radiogroup", "aria-label": t.language, children: ["en", "id"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { role: "radio", "aria-checked": settings.lang === l, onClick: () => setSettings({ lang: l }), children: l === "en" ? t.langNameEn : t.langNameId }, l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.graphics }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tiers", role: "radiogroup", "aria-label": t.graphics, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "radio", "aria-checked": settings.autoQuality, className: "tier", onClick: () => !settings.autoQuality && switchTier(settings, setSettings, "auto"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.tierAuto }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
              t.tierAutoHelp,
              " (",
              tierName(t, autoTier()),
              ")"
            ] })
          ] }),
          QUALITIES.map((q) => {
            const on = !settings.autoQuality && settings.quality === q;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "radio", "aria-checked": on, className: "tier", onClick: () => !on && switchTier(settings, setSettings, q), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: tierName(t, q) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: help(q) })
            ] }, q);
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "note", children: t.tierReload }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "sub-legend", children: t.effects }),
        !fxSupported && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "note", children: t.fxUnavailable }),
        EFFECT_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              role: "switch",
              checked: fx[k],
              disabled: !fxSupported,
              onChange: (e) => {
                const next = { ...settings.effects, [k]: e.target.checked };
                if (next[k] === fxDefaults[k]) delete next[k];
                setSettings({ effects: next });
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "switch-track", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            t[FX_LABEL[k][0]],
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: t[FX_LABEL[k][1]] })
          ] })
        ] }, k)),
        fxSupported && Object.keys(settings.effects).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => setSettings({ effects: {} }), children: t.fxReset })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: t.quizSettings }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", role: "switch", checked: settings.acceptEnglish, onChange: (e) => setSettings({ acceptEnglish: e.target.checked }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "switch-track", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.acceptEnglish })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", role: "switch", checked: settings.requireSide, onChange: (e) => setSettings({ requireSide: e.target.checked }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "switch-track", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.requireSide })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.secondsPerStation }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecondsInput, { value: settings.examSeconds, onChange: (n) => setSettings({ examSeconds: n }) })
        ] })
      ] }),
      onAbout && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "dialog-foot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "link",
          onClick: () => {
            onClose();
            onAbout();
          },
          children: t.aboutTitle
        }
      ) })
    ] })
  ] });
}
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = s + 1831565813 >>> 0;
    let t = s;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
function blob(g, x, y, r, c, a, soft = 0.5) {
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, rgba(c, a));
  gr.addColorStop(soft, rgba(c, a * 0.62));
  gr.addColorStop(1, rgba(c, 0));
  g.fillStyle = gr;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
function ellipse(g, x, y, rx, ry, rot, c, a) {
  g.save();
  g.translate(x, y);
  g.rotate(rot);
  g.scale(1, ry / rx);
  blob(g, 0, 0, rx, c, a, 0.7);
  g.restore();
}
function makeMicrograph(w, h, seed = 1918) {
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const g = out.getContext("2d");
  if (!g) return out;
  const R = rng(seed);
  const k = 3;
  const tw = Math.ceil(w / k), th = Math.ceil(h / k);
  const t = document.createElement("canvas");
  t.width = tw;
  t.height = th;
  const tg = t.getContext("2d");
  const S2 = Math.max(tw, th) / 360;
  tg.fillStyle = "#110c29";
  tg.fillRect(0, 0, tw, th);
  const lobes = Array.from({ length: 7 }, () => ({ x: R() * tw, y: R() * th, r: (70 + R() * 80) * S2, w: 0.55 + R() * 0.6 }));
  const holes = Array.from({ length: 8 }, () => ({ x: R() * tw, y: R() * th, r: (16 + R() * 30) * S2 }));
  const density = (x, y) => {
    let d = 0.18;
    for (const l of lobes) d += l.w * Math.exp(-((x - l.x) ** 2 + (y - l.y) ** 2) / (2 * l.r * l.r));
    for (const hl of holes) d *= 1 - 0.95 * Math.exp(-((x - hl.x) ** 2 + (y - hl.y) ** 2) / (2 * hl.r * hl.r));
    return Math.min(1, d);
  };
  const eosin = [[204, 72, 140], [184, 60, 132], [222, 96, 150], [168, 52, 122]];
  const hema = [[112, 86, 242], [96, 72, 222], [132, 104, 250]];
  for (let i = 0; i < 9; i++) {
    const x0 = R() * tw, y0 = R() * th;
    const a = R() * Math.PI * 2;
    const len = (90 + R() * 150) * S2;
    const bend = (R() - 0.5) * 2.2;
    const c = eosin[i % eosin.length];
    const n = Math.round(len / (2.2 * S2));
    for (let j = 0; j <= n; j++) {
      const u = j / n;
      const ang = a + bend * (u - 0.5);
      const x = x0 + Math.cos(ang) * len * u + Math.sin(u * 9 + i) * 3 * S2;
      const y = y0 + Math.sin(ang) * len * u + Math.cos(u * 7 + i) * 3 * S2;
      blob(tg, x, y, (2.6 + R() * 2.4) * S2, c, 0.07 + R() * 0.06);
    }
  }
  const step = 14.5 * S2;
  for (let y = -step; y < th + step; y += step * 0.87) {
    const row = Math.round(y / step);
    for (let x = -step + row % 2 * step * 0.5; x < tw + step; x += step) {
      const cx = x + (R() - 0.5) * step * 0.7, cy = y + (R() - 0.5) * step * 0.7;
      const d = density(cx, cy);
      if (d < 0.3 || R() > 0.3 + d) continue;
      const c = eosin[Math.floor(R() * eosin.length)];
      blob(tg, cx, cy, step * (0.6 + R() * 0.28), c, 0.14 + d * 0.3);
      if (R() < 0.72) {
        const nc = hema[Math.floor(R() * hema.length)];
        const nr = (2.1 + R() * 1.5) * S2;
        ellipse(tg, cx + (R() - 0.5) * 4 * S2, cy + (R() - 0.5) * 4 * S2, nr, nr * (0.6 + R() * 0.35), R() * Math.PI, nc, 0.34 + d * 0.4);
      }
    }
  }
  for (let i = 0; i < 2; i++) {
    const vx = R() * tw, vy = R() * th, vr = (9 + R() * 8) * S2;
    tg.strokeStyle = rgba([214, 84, 146], 0.42);
    tg.lineWidth = 2.4 * S2;
    tg.beginPath();
    tg.ellipse(vx, vy, vr, vr * 0.72, R() * Math.PI, 0, Math.PI * 2);
    tg.stroke();
    blob(tg, vx, vy, vr * 0.8, [17, 12, 41], 0.9, 0.8);
    for (let j = 0; j < 5; j++) blob(tg, vx + (R() - 0.5) * vr, vy + (R() - 0.5) * vr * 0.6, 1.6 * S2, [236, 104, 150], 0.55);
    for (let j = 0; j < 4; j++) {
      const a = j / 4 * Math.PI * 2 + R();
      ellipse(tg, vx + Math.cos(a) * vr, vy + Math.sin(a) * vr * 0.72, 2.6 * S2, 1 * S2, a + Math.PI / 2, hema[0], 0.8);
    }
  }
  const sg = tg.createLinearGradient(0, 0, tw, th);
  sg.addColorStop(0, "rgba(222,86,150,0.10)");
  sg.addColorStop(0.55, "rgba(160,70,170,0.03)");
  sg.addColorStop(1, "rgba(104,84,236,0.09)");
  tg.fillStyle = sg;
  tg.fillRect(0, 0, tw, th);
  for (let i = 0; i < 16; i++) blob(tg, R() * tw, R() * th, (12 + R() * 26) * S2, R() < 0.6 ? [214, 90, 156] : [120, 96, 246], 0.05 + R() * 0.06, 0.3);
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  const canFilter = typeof g.filter === "string";
  if (canFilter) g.filter = `blur(${Math.max(3, Math.round(w / 190))}px)`;
  g.drawImage(t, 0, 0, w, h);
  if (canFilter) g.filter = "none";
  const v = g.createRadialGradient(w * 0.5, h * 0.44, Math.min(w, h) * 0.1, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
  v.addColorStop(0, "rgba(15,12,36,0.10)");
  v.addColorStop(1, "rgba(9,7,24,0.78)");
  g.fillStyle = v;
  g.fillRect(0, 0, w, h);
  g.fillStyle = "rgba(15,12,36,0.30)";
  g.fillRect(0, 0, w, h);
  return out;
}
function micrographSize() {
  const vw = Math.max(320, window.innerWidth), vh = Math.max(320, window.innerHeight);
  const s = 1100 / Math.max(vw, vh);
  return { w: Math.round(vw * s), h: Math.round(vh * s) };
}
const engineBackdrop = Object.values([__vite_glob_0_0])[0];
function backdropCanvas(w, h) {
  const f2 = engineBackdrop?.makeMicrographCanvas;
  if (typeof f2 === "function") {
    try {
      return f2(w, h);
    } catch {
    }
  }
  return makeMicrograph(w, h);
}
function applyBackdrop(engine, canvas) {
  const bg = engine.scene.background;
  const img = bg && bg.isTexture ? bg.image : void 0;
  if (!img || img.width !== 512 || img.height !== 512) return false;
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  engine.scene.background = tex;
  bg.dispose();
  engine.invalidate();
  return true;
}
const initialAtlas = () => ({
  layers: Object.fromEntries(LAYERS.map((l) => [l.id, l.id === "skeleton"])),
  opacity: Object.fromEntries(LAYERS.map((l) => [l.id, 1])),
  region: null,
  explode: 0,
  clip: null,
  side: "both",
  xray: false,
  colorMode: "real"
});
const PACK_LAYERS = {
  skeleton: ["skeleton"],
  joints: ["joints"],
  muscles: ["muscles"],
  vessels: ["arteries", "veins"],
  nerves: ["nerves"],
  viscera: ["respiratory", "organs"],
  lymphoid: ["lymphoid"],
  skin: ["skin"]
};
const GUTTER = 16;
const GAUGE_W = 176;
const TRAY_H = 70;
const BAR_H = 64;
function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
function App() {
  const base = "/Raga/";
  const [settings, setSettingsState] = reactExports.useState(loadSettings);
  const t = STRINGS[settings.lang];
  const compact = useMedia(COMPACT_QUERY);
  const holder = reactExports.useRef(null);
  const probe = reactExports.useRef(null);
  const [engine, setEngine] = reactExports.useState(null);
  const [db, setDb] = reactExports.useState(null);
  const [boot, setBoot] = reactExports.useState({ p: 0, err: null, done: false });
  const [bootGone, setBootGone] = reactExports.useState(false);
  const [intro, setIntro] = reactExports.useState(false);
  const [microUrl, setMicroUrl] = reactExports.useState(null);
  const [packProgress, setPackProgress] = reactExports.useState({});
  const [mode, setModeState] = reactExports.useState("atlas");
  const modeRef = reactExports.useRef("atlas");
  modeRef.current = mode;
  const [atlas, setAtlas] = reactExports.useState(initialAtlas);
  const [sel, setSel] = reactExports.useState(null);
  const [anchor, setAnchor] = reactExports.useState(null);
  const pickPoint = reactExports.useRef(null);
  const lmShown = reactExports.useRef({ list: [], hl: null });
  const [hidden, setHidden] = reactExports.useState([]);
  const [isolate, setIsolate] = reactExports.useState(null);
  const [undo, setUndo] = reactExports.useState([]);
  const [attachOn, setAttachOn] = reactExports.useState(false);
  const [sheet, setSheet] = reactExports.useState("peek");
  const [regionsOpen, setRegionsOpen] = reactExports.useState(false);
  const [hover, setHover] = reactExports.useState(null);
  const [toasts, setToasts] = reactExports.useState([]);
  const [settingsOpen, setSettingsOpen] = reactExports.useState(false);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [quizFocus, setQuizFocus] = reactExports.useState(null);
  const [touched, setTouched] = reactExports.useState(false);
  const [fxDefaults, setFxDefaults] = reactExports.useState(TIER_EFFECTS[settings.quality]);
  const [fxSupported, setFxSupported] = reactExports.useState(false);
  const [motionMod, setMotionMod] = reactExports.useState(null);
  const [motionSide, setMotionSide] = reactExports.useState("r");
  const [loadedClip, setLoadedClip] = reactExports.useState(null);
  const [loadingClip, setLoadingClip] = reactExports.useState(null);
  const player = reactExports.useMemo(() => motionPlayer(engine), [engine]);
  const motionAvailable = !!motionMod && !!player;
  const setSettings = reactExports.useCallback((p) => {
    setSettingsState((s) => {
      const n = { ...s, ...p };
      saveSettings(n);
      return n;
    });
  }, []);
  reactExports.useEffect(() => {
    document.documentElement.lang = settings.lang;
  }, [settings.lang]);
  const toastId = reactExports.useRef(0);
  const toast = reactExports.useCallback((msg, action) => {
    const id2 = ++toastId.current;
    setToasts((cur) => [...cur.filter((x) => x.msg !== msg).slice(-2), { id: id2, msg, action }]);
    window.setTimeout(() => setToasts((cur) => cur.filter((x) => x.id !== id2)), action ? 9e3 : 4800);
  }, []);
  const setMode = reactExports.useCallback((m) => {
    setModeState(m);
    setSearchOpen(false);
    setRegionsOpen(false);
  }, []);
  reactExports.useEffect(() => {
    if (!holder.current) return;
    const size = micrographSize();
    const micro = backdropCanvas(size.w, size.h);
    try {
      setMicroUrl(micro.toDataURL("image/jpeg", 0.86));
    } catch {
    }
    if (!webglOK()) {
      setBoot({ p: 0, err: STRINGS[loadSettings().lang].noWebgl, done: false });
      return;
    }
    const s0 = loadSettings();
    const e = new Engine(holder.current, { quality: s0.quality, base });
    applyBackdrop(e, micro);
    const defaults = tierEffects(e, s0.quality, TIER_EFFECTS);
    setFxDefaults(defaults);
    setFxSupported(supportsEffects(e));
    applyEffects(e, { ...defaults, ...s0.effects });
    setEngine(e);
    let lostTimer = 0;
    const offLost = onContextLost(e, () => {
      window.clearTimeout(lostTimer);
      lostTimer = window.setTimeout(() => {
        if (!e.contextLost) return;
        const s = loadSettings();
        const tt = STRINGS[s.lang];
        const lower = lowerTier(s.quality);
        if (lower) {
          saveSettings({ ...s, quality: lower, autoQuality: false, effects: {} });
          setNotice(`ctxLost:${lower}`);
          window.location.reload();
        } else toast(tt.ctxLost, { label: tt.reload, run: () => window.location.reload() });
      }, 2500);
    });
    const offBack = e.onContextRestored(() => {
      window.clearTimeout(lostTimer);
      toast(STRINGS[loadSettings().lang].ctxBack);
    });
    const d = new DB(base);
    d.load().then(() => {
      setDb(d);
      window.__raga = { engine: e, db: d };
    }).catch((err) => setBoot({ p: 0, err: String(err), done: false }));
    loadMotionModule().then(setMotionMod);
    return () => {
      window.clearTimeout(lostTimer);
      offLost();
      offBack();
      e.dispose();
    };
  }, []);
  reactExports.useEffect(() => {
    if (engine) applyEffects(engine, { ...fxDefaults, ...settings.effects });
  }, [engine, fxDefaults, settings.effects]);
  const ensurePacks = reactExports.useCallback(
    async (packs) => {
      if (!engine || !db) return;
      const need = [...new Set(packs)].filter((p) => !engine.isLoaded(p));
      await Promise.all(
        need.map(
          (p) => engine.loadPack(p, db.byId, (f2) => setPackProgress((cur) => ({ ...cur, [p]: f2 }))).then(() => {
            setPackProgress((cur) => ({ ...cur, [p]: 1 }));
            if (p === "attachments") {
              for (const a of db.attachments) if (a.bone) engine.registerAttachmentBone(a.id, a.bone);
            }
          })
        )
      );
    },
    [engine, db]
  );
  const ensureLayers = reactExports.useCallback(async (layers) => ensurePacks(layers.map((l) => LAYERS.find((x) => x.id === l).pack)), [ensurePacks]);
  reactExports.useEffect(() => {
    if (!engine || !db) return;
    let alive = true;
    engine.loadPack("skeleton", db.byId, (f2) => alive && setBoot((b) => ({ ...b, p: f2 }))).then(() => {
      if (!alive) return;
      setPackProgress((c) => ({ ...c, skeleton: 1 }));
      engine.batch(() => {
        engine.setLayer("skeleton", true);
        engine.setLayer("attachments", true);
      });
      engine.frameVisible({ dir: new Vector3(0, 0.08, 1), instant: true });
      setBoot({ p: 1, err: null, done: true });
      setIntro(true);
      window.setTimeout(() => setIntro(false), 1800);
      window.setTimeout(() => setBootGone(true), 1100);
      const notice = takeNotice();
      if (notice?.startsWith("ctxLost:")) {
        const s2 = loadSettings();
        toast(fmt(STRINGS[s2.lang].ctxLostStep, { x: tierName(STRINGS[s2.lang], s2.quality) }));
      }
      const h = new URLSearchParams(window.location.hash.slice(1));
      const s = h.get("s");
      if (s && db.byId.has(s)) {
        const rec = db.byId.get(s);
        ensurePacks([rec.pack]).then(() => {
          const l = layerOf(rec);
          if (l !== "attachments") setAtlas((a) => ({ ...a, layers: { ...a.layers, [l]: true } }));
          setSel({ type: "structure", id: s });
          setSheet("half");
          engine.frameIds([s], { pad: 2 });
        });
      }
      const coarse = window.matchMedia?.("(pointer: coarse)").matches;
      if (loadSettings().quality !== "lite" && !coarse) {
        const idle = (cb) => {
          const w = window;
          if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 4e3 });
          else window.setTimeout(cb, 1500);
        };
        idle(() => ensurePacks(["joints", "attachments"]).then(() => idle(() => ensurePacks(["muscles"]))));
      }
    }).catch((err) => setBoot({ p: 0, err: String(err), done: false }));
    return () => {
      alive = false;
    };
  }, [engine, db]);
  const siblingsOf = reactExports.useCallback(
    (rec) => {
      if (!db) return [rec.id];
      const parent = db.parentConcept(rec);
      if (!parent || db.content.get(parent)?.kind !== "muscle") return [rec.id];
      return db.structures.filter((s) => s.pack !== "attachments" && s.side === rec.side && db.parentConcept(s) === parent).map((s) => s.id);
    },
    [db]
  );
  const selIds = reactExports.useMemo(() => {
    if (!db || !sel) return [];
    if (sel.type === "structure") {
      const rec = db.byId.get(sel.id);
      return rec ? siblingsOf(rec) : [];
    }
    if (sel.type === "landmark") return [sel.lm.on];
    return sel.ids;
  }, [sel, db, siblingsOf]);
  const muscleKeyOf = reactExports.useCallback(
    (rec) => {
      if (!db) return rec.k;
      const p = db.parentConcept(rec);
      return p && db.content.get(p)?.kind === "muscle" ? p : rec.k;
    },
    [db]
  );
  reactExports.useEffect(() => {
    if (!engine || !sel) {
      setAnchor(null);
      return;
    }
    const make = (id2, world) => {
      const o = engine.objects.get(id2);
      if (!o) return null;
      o.root.updateMatrixWorld(true);
      const w = world ?? engine.worldPointOn(id2, o.center);
      return { id: id2, local: o.root.worldToLocal(w.clone()), surface: !!world };
    };
    const pp = pickPoint.current;
    pickPoint.current = null;
    if (sel.type === "structure") setAnchor(make(sel.id, pp && pp.id === sel.id ? pp.p : null));
    else if (sel.type === "landmark") setAnchor(make(sel.lm.on, engine.worldPointOn(sel.lm.on, new Vector3(...sel.lm.p))));
    else setAnchor(sel.ids[0] ? make(sel.ids[0], null) : null);
  }, [sel, engine]);
  const selClips = reactExports.useMemo(() => {
    if (!motionMod || !db || sel?.type !== "structure") return [];
    const rec = db.byId.get(sel.id);
    if (!rec || rec.pack !== "muscles" && rec.pack !== "joints") return [];
    try {
      const key = rec.pack === "muscles" ? muscleKeyOf(rec) : db.parentConcept(rec) ?? rec.k;
      let list = motionMod.clipsForKey(db, key, rec.side ?? "r");
      if ((!Array.isArray(list) || !list.length) && key !== rec.k) list = motionMod.clipsForKey(db, rec.k, rec.side ?? "r");
      return Array.isArray(list) ? list.slice(0, 4) : [];
    } catch {
      return [];
    }
  }, [motionMod, db, sel, muscleKeyOf]);
  const jointClips2 = reactExports.useMemo(() => {
    if (!motionMod || !db) return [];
    try {
      const list = motionMod.jointClips(db, motionSide);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }, [motionMod, db, motionSide]);
  const inAtlas = mode === "atlas" || mode === "motion";
  reactExports.useEffect(() => {
    if (!engine || !db || !boot.done || !inAtlas) return;
    engine.batch(() => {
      for (const l of LAYERS) {
        engine.setLayer(l.id, atlas.layers[l.id]);
        engine.setLayerOpacity(l.id, atlas.opacity[l.id]);
      }
      engine.setLayer("attachments", true);
      engine.setSide(atlas.side);
      engine.setColorMode(atlas.colorMode);
      engine.setClip(atlas.clip);
      engine.setHidden(hidden);
      engine.setIsolate(isolate);
      if (atlas.region && atlas.region !== "body") {
        const def = REGIONS.find((r) => r.id === atlas.region);
        engine.setRegion(regionBoxes(engine, atlas.region), def.path ?? null);
      } else engine.setRegion(null);
      const tints = /* @__PURE__ */ new Map();
      if (sel?.type === "structure") {
        for (const id2 of selIds) tints.set(id2, id2 === sel.id ? "select" : "related");
      } else if (sel?.type === "concept") {
        for (const id2 of sel.ids) tints.set(id2, "select");
      }
      engine.setTint(tints);
      const focus = new Set(selIds);
      engine.setXray(atlas.xray && focus.size > 0, focus);
      let lms = [];
      let hl = null;
      if (sel?.type === "structure" && db.byId.get(sel.id)?.pack === "skeleton") lms = (db.lmByBone.get(sel.id) ?? []).filter((l) => !l.variant && l.k !== db.byId.get(sel.id).k);
      if (sel?.type === "landmark") {
        lms = (db.lmByBone.get(sel.lm.on) ?? []).filter((l) => !l.variant);
        hl = sel.lm.k;
      }
      engine.setLandmarks(lms, hl);
      setLandmarkAreas(engine, lms, hl);
      lmShown.current = { list: lms, hl };
      let att = [];
      if (attachOn && sel?.type === "structure") {
        const rec = db.byId.get(sel.id);
        if (rec.pack === "skeleton") att = (db.attByBone.get(rec.id) ?? []).map((a) => a.id);
        else if (rec.pack === "muscles") {
          const mk = muscleKeyOf(rec);
          const keys = /* @__PURE__ */ new Set([mk, rec.k, ...siblingsOf(rec).map((id2) => db.byId.get(id2).k)]);
          att = db.attachments.filter((a) => keys.has(a.m) && a.side === (rec.side ?? "r")).map((a) => a.id);
        }
      }
      engine.setAttachments(att);
    });
    engine.setExplode(loadedClip ? 0 : atlas.explode);
  }, [engine, db, boot.done, inAtlas, atlas, hidden, isolate, sel, selIds, attachOn, muscleKeyOf, siblingsOf, loadedClip]);
  reactExports.useEffect(() => {
    if (attachOn) ensurePacks(["attachments"]);
  }, [attachOn, ensurePacks]);
  const rightPanel = inAtlas && (!!sel || mode === "motion" && motionAvailable);
  reactExports.useEffect(() => {
    if (!engine || mode === "quiz") return;
    const apply = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const safeB = probe.current ? parseFloat(getComputedStyle(probe.current).paddingBottom) || 0 : 0;
      let left = 0, right = 0, bottom = 0;
      if (inAtlas) {
        const bar = loadedClip ? BAR_H + 10 : 0;
        if (!compact) {
          left = GUTTER * 2 + GAUGE_W;
          right = rightPanel ? GUTTER * 2 + (w >= 1200 ? 372 : 336) : 0;
          bottom = GUTTER + TRAY_H + 8 + bar;
        } else {
          left = GUTTER + 44;
          const sheetH = rightPanel ? sheet === "peek" ? 112 : Math.round(h * 0.5) : 0;
          bottom = GUTTER + 64 + safeB + 8 + sheetH + bar;
        }
      }
      engine.setInsets(left, right, bottom);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [engine, mode, inAtlas, rightPanel, sheet, compact, loadedClip]);
  reactExports.useEffect(() => {
    if (!inAtlas) return;
    const h = sel?.type === "structure" ? `#s=${sel.id}` : "";
    if (window.location.hash !== h) history.replaceState(null, "", h || window.location.pathname + window.location.search);
  }, [sel, inAtlas]);
  reactExports.useEffect(() => {
    if (!engine || !db) return;
    const active = () => modeRef.current === "atlas" || modeRef.current === "motion";
    const offPick = engine.onPick((hit) => {
      if (!active()) return;
      if (!hit) {
        setSel(null);
        return;
      }
      if (hit.landmark) {
        setSel({ type: "landmark", lm: hit.landmark });
        return;
      }
      const rec = db.byId.get(hit.id);
      if (!rec) return;
      if (rec.pack === "attachments") {
        const a = db.attachments.find((x) => x.id === rec.id);
        const ids = a ? db.structures.filter((s) => s.pack === "muscles" && s.side === a.side && (s.k === a.m || db.parentConcept(s) === a.m)).map((s) => s.id) : [];
        if (ids.length) setSel({ type: "structure", id: ids[0] });
        return;
      }
      pickPoint.current = { id: rec.id, p: hit.point.clone() };
      setSel({ type: "structure", id: rec.id });
      setSheet("peek");
    });
    const offDbl = engine.onDoublePick((hit) => {
      if (!active()) return;
      const rec = db.byId.get(hit.id);
      if (rec) engine.frameIds(siblingsOf(rec), { pad: 1.6 });
    });
    const offHover = engine.onHover(({ id: id2, x, y, landmark }) => {
      if (!active() || !id2) {
        setHover(null);
        return;
      }
      if (landmark) {
        setHover({ x, y, label: db.latin(landmark.k), sub: landmark.en });
        return;
      }
      const rec = db.byId.get(id2);
      if (!rec) return setHover(null);
      if (rec.pack === "attachments") {
        const a = db.attachments.find((z) => z.id === id2);
        if (a) setHover({ x, y, label: db.latin(a.m), sub: a.kind === "origin" ? t.originLegend : t.insertionLegend });
        return;
      }
      const mk = muscleKeyOf(rec);
      setHover({ x, y, label: db.latin(mk), sub: mk !== rec.k ? db.latin(rec.k) : rec.en });
    });
    return () => {
      offPick();
      offDbl();
      offHover();
    };
  }, [engine, db, t, muscleKeyOf, siblingsOf]);
  const pushUndo = () => setUndo((u) => [...u.slice(-30), { hidden, isolate, region: atlas.region }]);
  const setLayers = async (patch) => {
    setAtlas((a) => ({ ...a, layers: { ...a.layers, ...patch } }));
    const on = Object.keys(patch).filter((l) => patch[l]);
    if (!on.length) return;
    try {
      await ensureLayers(on);
    } catch {
      toast(t.layerFailed);
      setAtlas((a) => ({ ...a, layers: { ...a.layers, ...Object.fromEntries(on.map((l) => [l, false])) } }));
    }
  };
  const showLayerFor = async (rec) => {
    const layer = layerOf(rec);
    if (layer === "attachments") return;
    await ensurePacks([rec.pack]);
    setAtlas((a) => a.layers[layer] ? a : { ...a, layers: { ...a.layers, [layer]: true } });
  };
  const revealIds = (ids) => {
    if (isolate && ids.some((id2) => !isolate.includes(id2))) setIsolate(null);
    if (hidden.some((h) => ids.includes(h))) setHidden(hidden.filter((h) => !ids.includes(h)));
    if (atlas.region && engine && ids.some((id2) => engine.objects.get(id2) && !inRegion(engine, id2, atlas.region))) setAtlas((a) => ({ ...a, region: null }));
  };
  const pickSearch = async (it) => {
    if (!engine || !db) return;
    if (modeRef.current !== "atlas" && modeRef.current !== "motion") setMode("atlas");
    if (it.type === "landmark") {
      const list = db.lmByKey.get(it.key) ?? [];
      const lm = list.find((l) => l.side === "r") ?? list[0];
      if (!lm) return;
      const bone = db.byId.get(lm.on);
      if (bone) await showLayerFor(bone);
      revealIds([lm.on]);
      setSel({ type: "landmark", lm });
      setSheet("half");
      const p = engine.worldPointOn(lm.on, new Vector3(...lm.p));
      const o = engine.objects.get(lm.on);
      const out = o ? p.clone().sub(o.center).normalize() : new Vector3(...lm.n);
      engine.framePoint(p, new Vector3(...lm.n).multiplyScalar(0.6).add(out.multiplyScalar(0.4)), Math.max(0.2, (o?.radius ?? 0.1) * 1.5));
      return;
    }
    if (!it.ids.length) {
      setSel({ type: "concept", key: it.key, ids: [] });
      setSheet("half");
      return;
    }
    const recs = it.ids.map((id2) => db.byId.get(id2)).filter(Boolean);
    const right = recs.filter((r) => r.side === "r");
    const chosen = right.length ? right : recs.filter((r) => r.side === null).length ? recs.filter((r) => r.side === null) : recs;
    for (const r of chosen.slice(0, 1)) await showLayerFor(r);
    await ensurePacks([...new Set(chosen.map((r) => r.pack))]);
    const layers = new Set(chosen.map((r) => layerOf(r)).filter((l) => l !== "attachments"));
    setAtlas((a) => ({ ...a, layers: { ...a.layers, ...Object.fromEntries([...layers].map((l) => [l, true])) } }));
    const ids = chosen.map((r) => r.id);
    revealIds(ids);
    if (it.type === "structure" && ids.length === 1) setSel({ type: "structure", id: ids[0] });
    else setSel({ type: "concept", key: it.key, ids });
    setSheet("half");
    window.setTimeout(() => engine.frameIds(ids, { pad: 1.7 }), 30);
  };
  const onKey = (key) => {
    if (!db) return;
    const it = db.search.find((s) => s.key === key && s.type !== "landmark") ?? db.search.find((s) => s.key === key);
    if (it) pickSearch(it);
    else setSel({ type: "concept", key, ids: [] });
  };
  const onLandmark = (key, boneId) => {
    if (!db || !engine) return;
    const lm = (db.lmByKey.get(key) ?? []).find((l) => l.on === boneId) ?? db.lmByKey.get(key)?.[0];
    if (!lm) return onKey(key);
    setSel({ type: "landmark", lm });
    const p = engine.worldPointOn(lm.on, new Vector3(...lm.p));
    engine.framePoint(p, new Vector3(...lm.n), 0.18);
  };
  const onLandmarkHover = (lm, fly) => {
    if (!engine) return;
    const { list, hl } = lmShown.current;
    const key = lm?.k ?? hl;
    engine.highlightLandmark(key);
    setLandmarkAreas(engine, list, key);
    if (lm && fly) {
      const p = engine.worldPointOn(lm.on, new Vector3(...lm.p));
      engine.framePoint(p, new Vector3(...lm.n), 0.2);
    }
  };
  const onRegion = async (r) => {
    if (!engine) return;
    const def = REGIONS.find((x) => x.id === r);
    setRegionsOpen(false);
    try {
      await ensureLayers(def.layers);
    } catch {
      toast(t.layerFailed);
      return;
    }
    pushUndo();
    setIsolate(null);
    setHidden([]);
    setAtlas((a) => ({ ...a, region: r === "body" ? null : r, layers: { ...a.layers, ...Object.fromEntries(def.layers.map((l) => [l, true])) } }));
    window.setTimeout(() => {
      engine.frameVisible({ dir: def.side === "r" ? new Vector3(-0.45, 0.12, 1) : new Vector3(0, 0.1, 1) });
    }, 60);
  };
  const focusSel = () => {
    if (!engine || !sel) return;
    if (sel.type === "landmark") {
      const p = engine.worldPointOn(sel.lm.on, new Vector3(...sel.lm.p));
      engine.framePoint(p, new Vector3(...sel.lm.n), 0.16);
    } else engine.frameIds(selIds, { pad: 1.6 });
  };
  const isolateSel = () => {
    if (!selIds.length) return;
    pushUndo();
    setIsolate(selIds);
    window.setTimeout(() => engine?.frameIds(selIds, { pad: 1.5 }), 30);
  };
  const toggleIsolate = () => {
    if (isolate) {
      pushUndo();
      setIsolate(null);
    } else isolateSel();
  };
  const hideSel = () => {
    if (!selIds.length) return;
    pushUndo();
    setHidden([.../* @__PURE__ */ new Set([...hidden, ...selIds])]);
    setSel(null);
  };
  const showAll = () => {
    pushUndo();
    setHidden([]);
    setIsolate(null);
    setAtlas((a) => ({ ...a, region: null, explode: 0, clip: null }));
  };
  const doUndo = () => {
    const last = undo[undo.length - 1];
    if (!last) return;
    setUndo(undo.slice(0, -1));
    setHidden(last.hidden);
    setIsolate(last.isolate);
    setAtlas((a) => ({ ...a, region: last.region }));
  };
  const resetView = () => engine?.frameVisible({ dir: new Vector3(0, 0.08, 1) });
  const view = (v) => engine?.view(v);
  const shot = () => {
    if (!engine) return;
    const url = engine.screenshot();
    const a = document.createElement("a");
    a.href = url;
    a.download = `raga-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;
    a.click();
  };
  const playClip = async (clip, frame) => {
    if (!player) return;
    setLoadingClip(clip.id);
    try {
      await ensurePacks(clip.packs);
      const layers = clip.packs.flatMap((pk) => PACK_LAYERS[pk] ?? []);
      setAtlas((a) => ({ ...a, explode: 0, layers: { ...a.layers, ...Object.fromEntries(layers.map((l) => [l, true])) } }));
      player.play(clip, { loop: true, speed: 1 });
      setLoadedClip(clip);
      if (frame && engine) window.setTimeout(() => engine.frameIds([...clip.muscles, ...clip.stretch], { pad: 1.5 }), 40);
    } catch {
      toast(t.layerFailed);
    } finally {
      setLoadingClip(null);
    }
  };
  const stopClip = reactExports.useCallback(() => {
    try {
      player?.stop();
    } catch {
    }
    setLoadedClip(null);
  }, [player]);
  reactExports.useEffect(() => {
    if (mode !== "atlas" && mode !== "motion" && loadedClip) stopClip();
  }, [mode, loadedClip, stopClip]);
  reactExports.useEffect(() => {
    const onKeyDown2 = (e) => {
      if (!inAtlas || settingsOpen) return;
      const tag2 = e.target?.tagName;
      if (tag2 === "INPUT" || tag2 === "SELECT" || tag2 === "TEXTAREA" || e.defaultPrevented) return;
      if (e.key === "Escape") setSel(null);
      else if (e.key === "f") focusSel();
      else if (e.key === "i") isolateSel();
      else if (e.key === "h") hideSel();
      else if (e.key === "x") setAtlas((a) => ({ ...a, xray: !a.xray }));
      else if ((e.ctrlKey || e.metaKey) && e.key === "z") doUndo();
    };
    window.addEventListener("keydown", onKeyDown2);
    return () => window.removeEventListener("keydown", onKeyDown2);
  });
  reactExports.useEffect(() => {
    if (!engine) return;
    if (!inAtlas) {
      setHover(null);
      engine.batch(() => {
        engine.setLandmarks([]);
        engine.setAttachments([]);
        engine.setRegion(null);
        if (mode !== "quiz") for (const l of LAYERS) engine.setLayer(l.id, false);
      });
    }
  }, [inAtlas, mode, engine]);
  const ctx = reactExports.useMemo(
    () => engine && db ? { engine, db, t, settings, setSettings, ensureLayers, ensurePacks, packProgress, toast, base, compact, fxDefaults, fxSupported } : null,
    [engine, db, t, settings, setSettings, ensureLayers, ensurePacks, packProgress, toast, base, compact, fxDefaults, fxSupported]
  );
  const ready = !!ctx && boot.done;
  const tag = /* @__PURE__ */ jsxRuntimeExports.jsx(
    SpecimenTag,
    {
      sel,
      anchor,
      sheet,
      onSheet: setSheet,
      onClose: () => setSel(null),
      onFocus: focusSel,
      onIsolate: isolateSel,
      onHide: hideSel,
      onKey,
      onLandmark,
      onLandmarkHover,
      attachOn,
      onToggleAttach: () => setAttachOn((v) => !v),
      onQuiz: (k) => {
        setQuizFocus(k);
        setMode("quiz");
      },
      clips: player ? selClips : [],
      onPlayClip: (c) => playClip(c, false),
      playingId: loadedClip?.id ?? null
    }
  );
  const motionPanel = motionAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(MotionPanel, { clips: jointClips2, side: motionSide, onSide: setMotionSide, onPlay: (c) => playClip(c, true), currentId: loadedClip?.id ?? null, loadingId: loadingClip });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app", "data-quality": settings.quality, "data-mode": mode, "data-intro": intro || void 0, "data-compact": compact || void 0, onPointerDownCapture: () => boot.done && !touched && setTouched(true), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "viewport", ref: holder, onPointerDown: () => setTouched(true) }),
    ready && /* @__PURE__ */ jsxRuntimeExports.jsxs(Ctx.Provider, { value: ctx, children: [
      inAtlas && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        !compact ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leftcol", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DepthGauge,
            {
              layers: atlas.layers,
              opacity: atlas.opacity,
              colorMode: atlas.colorMode,
              onLayers: setLayers,
              onOpacity: (l, v) => setAtlas((a) => ({ ...a, opacity: { ...a.opacity, [l]: v } })),
              onColorMode: (m) => setAtlas((a) => ({ ...a, colorMode: m }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BodyMap, { region: atlas.region, onRegion, className: "glass settle" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          DepthGauge,
          {
            layers: atlas.layers,
            opacity: atlas.opacity,
            colorMode: atlas.colorMode,
            onLayers: setLayers,
            onOpacity: (l, v) => setAtlas((a) => ({ ...a, opacity: { ...a.opacity, [l]: v } })),
            onColorMode: (m) => setAtlas((a) => ({ ...a, colorMode: m }))
          }
        ),
        sel ? tag : mode === "motion" && motionPanel ? compact ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { h: sheet, onH: setSheet, label: t.sheetHandle, className: "motion-sheet", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sheet-scroll", children: motionPanel }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "side-panel glass settle", children: motionPanel }) : null,
        compact && regionsOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { h: "half", onH: (h) => h === "peek" && setRegionsOpen(false), label: t.sheetHandle, className: "regions-sheet", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sheet-scroll", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BodyMap, { region: atlas.region, onRegion }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `tray-dock ${rightPanel ? "with-right" : ""}`, children: [
          loadedClip && player && /* @__PURE__ */ jsxRuntimeExports.jsx(MotionBar, { player, clip: loadedClip, onStop: stopClip }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InstrumentTray,
            {
              atlas,
              onChange: (patch) => setAtlas((a) => ({ ...a, ...patch })),
              hasSel: selIds.length > 0,
              isolated: !!isolate,
              onIsolate: toggleIsolate,
              canUndo: undo.length > 0,
              onUndo: doUndo,
              onShowAll: showAll,
              onReset: resetView,
              onView: view,
              onShot: shot,
              motionLoaded: !!loadedClip,
              onRegions: compact ? () => setRegionsOpen((v) => !v) : void 0,
              regionsOpen
            }
          )
        ] }),
        !sel && !touched && !compact && mode === "atlas" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint-line glass", children: t.hint }),
        hover && !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tip glass", style: { transform: `translate(${hover.x}px, ${hover.y}px)` }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "latin", children: hover.label }),
          hover.sub && hover.sub !== hover.label && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: hover.sub })
        ] })
      ] }),
      mode === "quiz" && /* @__PURE__ */ jsxRuntimeExports.jsx(Quiz, { focusKey: quizFocus, onFocusDone: () => setQuizFocus(null), onAtlas: onKey }),
      mode === "progress" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressPage, {}),
      mode === "about" && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutPage, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsDialog, { open: settingsOpen, onClose: () => setSettingsOpen(false), onAbout: () => setMode("about") })
    ] }),
    boot.done && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Header,
      {
        t,
        settings,
        setSettings,
        mode,
        onMode: setMode,
        motionAvailable,
        compact,
        search: ctx && !compact ? /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { onPick: pickSearch }) }) : ctx ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) : null,
        onSearchOpen: () => setSearchOpen(true),
        onSettings: () => setSettingsOpen(true)
      }
    ),
    searchOpen && ctx && compact && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-layer glass", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { overlay: true, onPick: pickSearch, onClose: () => setSearchOpen(false) }) }) }),
    !bootGone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `boot ${boot.done ? "leaving" : ""}`, role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "boot-micro", style: microUrl ? { backgroundImage: `url(${microUrl})` } : void 0, "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "boot-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "boot-mark", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mark, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Raga" })
        ] }),
        boot.err ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "boot-err", children: boot.err }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "boot-msg", children: t.loadingModel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "boot-bar", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { transform: `scaleX(${Math.max(0.04, boot.p)})` } }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toasts", role: "status", "aria-live": "polite", children: toasts.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast glass", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: x.msg }),
      x.action && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: x.action.run, children: x.action.label })
    ] }, x.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "safe-probe", ref: probe, "aria-hidden": "true" })
  ] }) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
if ("serviceWorker" in navigator && true) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${"/Raga/"}sw.js`).catch(() => {
    });
  });
}
//# sourceMappingURL=index-Bn78icpp.js.map
