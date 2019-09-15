// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.10';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"node_modules/vue-google-signin-button-directive/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _vue.default.directive('google-signin-button', {
  bind: function (el, binding, vnode) {
    CheckComponentMethods();
    let clientId = binding.value;
    let googleSignInAPI = document.createElement('script');
    googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js');
    document.head.appendChild(googleSignInAPI);
    googleSignInAPI.onload = InitGoogleButton;

    function InitGoogleButton() {
      gapi.load('auth2', () => {
        const auth2 = gapi.auth2.init({
          client_id: clientId,
          cookiepolicy: 'single_host_origin'
        });
        auth2.attachClickHandler(el, {}, OnSuccess, Onfail);
      });
    }

    function OnSuccess(googleUser) {
      vnode.context.OnGoogleAuthSuccess(googleUser.getAuthResponse().id_token);
      googleUser.disconnect();
    }

    function Onfail(error) {
      vnode.context.OnGoogleAuthFail(error);
    }

    function CheckComponentMethods() {
      if (!vnode.context.OnGoogleAuthSuccess) {
        throw new Error('The method OnGoogleAuthSuccess must be defined on the component');
      }

      if (!vnode.context.OnGoogleAuthFail) {
        throw new Error('The method OnGoogleAuthFail must be defined on the component');
      }
    }
  }
});

exports.default = _default;
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      // prevent record.options._Ctor from being overwritten accidentally
      newCtor.options._Ctor = record.options._Ctor
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"src/components/loginForm.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueGoogleSigninButtonDirective = _interopRequireDefault(require("vue-google-signin-button-directive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var baseurl = "http://34.87.55.207"; // let baseurl = "http://localhost:3000"

var _default = {
  directives: {
    GoogleSignInButton: _vueGoogleSigninButtonDirective.default
  },
  component: {
    GoogleSignInButton: _vueGoogleSigninButtonDirective.default
  },
  data: function data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      clientId: "438038077921-oq06ri3hdpqfcli143cctko30kiim07i.apps.googleusercontent.com"
    };
  },
  methods: {
    clickRegister: function clickRegister() {
      console.log("click register bisa");
      this.$emit("changeToRegister");
    },
    trylogin: function trylogin() {
      var _this = this;

      console.log("masuk login client");
      Swal.fire({
        title: 'Loggin in...',
        allowOutsideClick: function allowOutsideClick() {
          return !Swal.isLoading();
        }
      });
      Swal.showLoading();
      axios({
        method: 'POST',
        url: "".concat(baseurl, "/user/signin"),
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      }).then(function (response) {
        console.log(response.data);
        Swal.close();
        Swal.fire("Success!", "Your are Logged in!", "success");
        localStorage.setItem('token', response.data.token);
        _this.emailLogin = "";
        _this.passwordLogin = "";

        _this.$emit("signin");
      }).catch(function (error) {
        return console.log(error.response);
      });
    },
    OnGoogleAuthSuccess: function OnGoogleAuthSuccess(idToken) {
      var _this2 = this;

      axios({
        method: "POST",
        url: "".concat(baseurl, "/users/Gsignin"),
        data: {
          idToken: idToken
        }
      }).then(function (data) {
        Swal.fire({
          position: "center",
          type: "success",
          title: "Successfully login",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("token", data.data.token);

        _this2.$emit('pageGIn');
      });
    },
    OnGoogleAuthFail: function OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
exports.default = _default;
        var $9e2ccc = exports.default || module.exports;
      
      if (typeof $9e2ccc === 'function') {
        $9e2ccc = $9e2ccc.options;
      }
    
        /* template */
        Object.assign($9e2ccc, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "wrapper fadeInDown" }, [
      _c("div", { attrs: { id: "formContent" } }, [
        _c("h2", { staticClass: "active" }, [_vm._v(" Sign In ")]),
        _vm._v(" "),
        _c(
          "h2",
          {
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.clickRegister($event)
              }
            }
          },
          [_vm._v(" Sign Up ")]
        ),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _c(
          "form",
          {
            attrs: { id: "login-form" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.trylogin($event)
              }
            }
          },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.emailLogin,
                  expression: "emailLogin"
                }
              ],
              staticClass: "fadeIn second",
              attrs: {
                type: "text",
                id: "login",
                name: "login",
                placeholder: "email"
              },
              domProps: { value: _vm.emailLogin },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.emailLogin = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.passwordLogin,
                  expression: "passwordLogin"
                }
              ],
              staticClass: "fadeIn third",
              attrs: {
                type: "password",
                id: "password",
                name: "login",
                placeholder: "password"
              },
              domProps: { value: _vm.passwordLogin },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.passwordLogin = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("input", {
              staticClass: "fadeIn fourth",
              attrs: { type: "submit", value: "Log In" }
            })
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            directives: [
              {
                name: "google-signin-button",
                rawName: "v-google-signin-button",
                value: _vm.clientId,
                expression: "clientId"
              }
            ],
            staticClass: "google-signin-button"
          },
          [_c("i", { staticClass: "fab fa-google" })]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "fadeIn first" }, [
      _c("img", {
        attrs: {
          src: "/logo.b5a5adc6.png",
          id: "icons",
          alt: "Logo Icon"
        }
      })
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-9e2ccc",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$9e2ccc', $9e2ccc);
          } else {
            api.reload('$9e2ccc', $9e2ccc);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"vue-google-signin-button-directive":"node_modules/vue-google-signin-button-directive/index.js","./logo.png":[["logo.b5a5adc6.png","src/components/logo.png"],"src/components/logo.png"],"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/registerForm.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// let baseurl = "http://localhost:3000"
var baseurl = "http://34.87.55.207";
var _default = {
  data: function data() {
    return {
      usernameRegis: "",
      emailRegis: "",
      passwordRegis: ""
    };
  },
  methods: {
    clickLogin: function clickLogin() {
      this.$emit("changeToLogin");
    },
    tryregis: function tryregis() {
      var _this = this;

      axios({
        method: 'POST',
        url: "".concat(baseurl, "/user/register"),
        data: {
          name: this.usernameRegis,
          email: this.emailRegis,
          password: this.passwordRegis
        }
      }).then(function (response) {
        console.log("regis bisa nih");
        console.log(response.data);
        _this.usernameRegis = "";
        _this.emailRegis = "";
        _this.passwordRegis = "";
        Swal.fire('You success register');

        _this.$emit("changeToLogin");
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }
};
exports.default = _default;
        var $435ff3 = exports.default || module.exports;
      
      if (typeof $435ff3 === 'function') {
        $435ff3 = $435ff3.options;
      }
    
        /* template */
        Object.assign($435ff3, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "wrapper fadeInDown" }, [
      _c("div", { attrs: { id: "formContent" } }, [
        _c(
          "h2",
          {
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.clickLogin($event)
              }
            }
          },
          [_vm._v(" Sign In ")]
        ),
        _vm._v(" "),
        _c("h2", { staticClass: "active" }, [_vm._v("Sign Up ")]),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _c(
          "form",
          {
            attrs: { id: "login-form" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.tryregis($event)
              }
            }
          },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.usernameRegis,
                  expression: "usernameRegis"
                }
              ],
              staticClass: "fadeIn second",
              attrs: {
                type: "text",
                id: "username",
                name: "login",
                placeholder: "username"
              },
              domProps: { value: _vm.usernameRegis },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.usernameRegis = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.emailRegis,
                  expression: "emailRegis"
                }
              ],
              staticClass: "fadeIn second",
              attrs: {
                type: "email",
                id: "email",
                name: "login",
                placeholder: "email"
              },
              domProps: { value: _vm.emailRegis },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.emailRegis = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.passwordRegis,
                  expression: "passwordRegis"
                }
              ],
              staticClass: "fadeIn third",
              attrs: {
                type: "password",
                id: "password",
                name: "login",
                placeholder: "password"
              },
              domProps: { value: _vm.passwordRegis },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.passwordRegis = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("input", {
              staticClass: "fadeIn fourth",
              attrs: { type: "submit", value: "Register" }
            })
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "fadeIn first" }, [
      _c("img", {
        attrs: {
          src: "/logo.b5a5adc6.png",
          id: "icons",
          alt: "Logo Icon"
        }
      })
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-435ff3",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$435ff3', $435ff3);
          } else {
            api.reload('$435ff3', $435ff3);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./logo.png":[["logo.b5a5adc6.png","src/components/logo.png"],"src/components/logo.png"],"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/sidebar.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  methods: {
    goToHome: function goToHome() {
      this.$emit("goToHome");
    },
    goToCreate: function goToCreate() {
      this.$emit("goToCreate");
    }
  }
};
exports.default = _default;
        var $8ea407 = exports.default || module.exports;
      
      if (typeof $8ea407 === 'function') {
        $8ea407 = $8ea407.options;
      }
    
        /* template */
        Object.assign($8ea407, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("aside", [
      _c("div", { staticClass: "sidebar" }, [
        _c(
          "a",
          {
            attrs: { href: "" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.goToHome($event)
              }
            }
          },
          [_vm._v("Home")]
        ),
        _vm._v(" "),
        _c(
          "a",
          {
            attrs: { href: "", id: "create-article" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.goToCreate($event)
              }
            }
          },
          [_vm._v("Create article")]
        ),
        _vm._v(" "),
        _c("a", { attrs: { href: "#about" } }, [_vm._v("About")])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-8ea407",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$8ea407', $8ea407);
          } else {
            api.reload('$8ea407', $8ea407);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/navbar.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  methods: {
    logout: function logout() {
      var _this = this;

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
      }).then(function (result) {
        if (result.value) {
          _this.$emit("signout");

          localStorage.removeItem("token");
          Swal.fire("Success!", "Successfully LoggedOut!", "success");
        } else {
          Swal.close();
        }
      }).catch(function (error) {
        var message = error.response.data && error.response.data.message || "failed to logout something wrong with our server";
        Swal.fire("Error!", message, "error");
      });
    }
  }
};
exports.default = _default;
        var $f1d270 = exports.default || module.exports;
      
      if (typeof $f1d270 === 'function') {
        $f1d270 = $f1d270.options;
      }
    
        /* template */
        Object.assign($f1d270, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { attrs: { id: "after-login" } }, [
      _c(
        "div",
        { staticClass: "container", attrs: { id: "container-navbar" } },
        [
          _vm._m(0),
          _vm._v(" "),
          _c("h3", { attrs: { id: "tagline" } }, [
            _vm._v("Yuk Cerita-cerita Sore")
          ]),
          _vm._v(" "),
          _c("input", {
            attrs: {
              type: "text",
              id: "mySearch",
              placeholder: "Search..",
              title: "Type in a category"
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "item-navbar",
              attrs: { id: "login-logout" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.logout($event)
                }
              }
            },
            [_vm._m(1)]
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "item-navbar", attrs: { id: "logo-navbar" } },
      [
        _c("img", {
          attrs: {
            src: "/logo.b5a5adc6.png",
            id: "logo-navbar"
          }
        })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "button" }, [
      _c("span", [_vm._v("Logout")])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-f1d270",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$f1d270', $f1d270);
          } else {
            api.reload('$f1d270', $f1d270);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./logo.png":[["logo.b5a5adc6.png","src/components/logo.png"],"src/components/logo.png"],"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/listcontent.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// let baseurl = "http://localhost:3000"
var baseurl = "http://34.87.55.207";
var _default = {
  props: ["articles"],
  methods: {
    deleteData: function deleteData(id) {
      var _this = this;

      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(function (result) {
        if (result.value) {
          axios({
            method: 'DELETE',
            url: "".concat(baseurl, "/miniWp/") + id,
            headers: {
              token: localStorage.getItem('token')
            }
          }).then(function (response) {
            Swal.fire("Success Delete");

            _this.$emit("successDelete");
          }).catch(function (error) {
            return console.log(error);
          });
        } else {
          Swal.close();
        }
      }).catch(function (error) {
        var message = error.response.data && error.response.data.message || "failed to Delete";
        Swal.fire("Error!", message, "error");
      });
    },
    clickEdit: function clickEdit(input) {
      this.$emit("updateFile", input);
    }
  }
};
exports.default = _default;
        var $060e32 = exports.default || module.exports;
      
      if (typeof $060e32 === 'function') {
        $060e32 = $060e32.options;
      }
    
        /* template */
        Object.assign($060e32, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "content-container-outside" } }, [
    _c("div", { attrs: { id: "content-container" } }, [
      _c("div", { staticClass: "content" }, [
        _c(
          "div",
          { staticClass: "center" },
          [
            _vm._m(0),
            _vm._v(" "),
            _vm._l(_vm.articles, function(article, index) {
              return _c("div", { key: index, staticClass: "list-article" }, [
                _c("div", { attrs: { id: "name-article" } }, [
                  _c("div", { staticClass: "photo-container" }, [
                    _c("img", {
                      attrs: {
                        src: article.featured_image,
                        alt: "foto",
                        id: "photo"
                      }
                    }),
                    _vm._v(" "),
                    _c("h4", [_vm._v(_vm._s(article.title))]),
                    _vm._v(" "),
                    _c("p", {
                      domProps: {
                        innerHTML: _vm._s(
                          String(article.content).substr(0, 500)
                        )
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("h5", [_vm._v("Created by: " + _vm._s(article.author))]),
                  _vm._v(" "),
                  _c("h6", [
                    _vm._v(
                      _vm._s(String(new Date(article.createdAt)).substr(0, 21))
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h6", [_vm._v("tags:")]),
                      _vm._v(" "),
                      _vm._l(article.articletags, function(tag, index) {
                        return _c(
                          "a",
                          { key: index, attrs: { href: "#" } },
                          [_c("vs-chip", [_vm._v(_vm._s(tag))])],
                          1
                        )
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "btn-group" }, [
                    _c(
                      "button",
                      {
                        staticClass: "button",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.clickEdit(article)
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "fa fa-pencil" }),
                        _vm._v(" Edit")
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "button",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.deleteData(article._id)
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "fa fa-trash" }),
                        _vm._v(" Trash")
                      ]
                    )
                  ])
                ])
              ])
            })
          ],
          2
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "published-drafts" }, [
      _c("div", { attrs: { id: "container-pod" } }, [
        _c("div", { staticClass: "btn-group" }, [
          _c("button", { staticClass: "button" }, [_vm._v("Published")]),
          _vm._v(" "),
          _c("button", { staticClass: "button" }, [_vm._v("Drafts")])
        ])
      ]),
      _vm._v(" "),
      _c("div", [
        _c("input", {
          attrs: {
            type: "text",
            id: "search-article",
            placeholder: "Search..",
            title: "Type in a category"
          }
        })
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-060e32",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$060e32', $060e32);
          } else {
            api.reload('$060e32', $060e32);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js":[function(require,module,exports) {
var define;
!function (A, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.vueTagsInput = t() : A.vueTagsInput = t();
}(window, function () {
  return function (A) {
    var t = {};

    function e(n) {
      if (t[n]) return t[n].exports;
      var i = t[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return A[n].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }

    return e.m = A, e.c = t, e.d = function (A, t, n) {
      e.o(A, t) || Object.defineProperty(A, t, {
        enumerable: !0,
        get: n
      });
    }, e.r = function (A) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(A, "__esModule", {
        value: !0
      });
    }, e.t = function (A, t) {
      if (1 & t && (A = e(A)), 8 & t) return A;
      if (4 & t && "object" == typeof A && A && A.__esModule) return A;
      var n = Object.create(null);
      if (e.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: A
      }), 2 & t && "string" != typeof A) for (var i in A) e.d(n, i, function (t) {
        return A[t];
      }.bind(null, i));
      return n;
    }, e.n = function (A) {
      var t = A && A.__esModule ? function () {
        return A.default;
      } : function () {
        return A;
      };
      return e.d(t, "a", t), t;
    }, e.o = function (A, t) {
      return Object.prototype.hasOwnProperty.call(A, t);
    }, e.p = "/dist/", e(e.s = 6);
  }([function (A, t, e) {
    var n = e(8);
    "string" == typeof n && (n = [[A.i, n, ""]]), n.locals && (A.exports = n.locals);
    (0, e(4).default)("7ec05f6c", n, !1, {});
  }, function (A, t, e) {
    var n = e(10);
    "string" == typeof n && (n = [[A.i, n, ""]]), n.locals && (A.exports = n.locals);
    (0, e(4).default)("3453d19d", n, !1, {});
  }, function (A, t, e) {
    "use strict";

    A.exports = function (A) {
      var t = [];
      return t.toString = function () {
        return this.map(function (t) {
          var e = function (A, t) {
            var e = A[1] || "",
                n = A[3];
            if (!n) return e;

            if (t && "function" == typeof btoa) {
              var i = (r = n, ""),
                  a = n.sources.map(function (A) {
                return "/*# sourceURL=" + n.sourceRoot + A + " */";
              });
              return [e].concat(a).concat([i]).join("\n");
            }

            var r;
            return [e].join("\n");
          }(t, A);

          return t[2] ? "@media " + t[2] + "{" + e + "}" : e;
        }).join("");
      }, t.i = function (A, e) {
        "string" == typeof A && (A = [[null, A, ""]]);

        for (var n = {}, i = 0; i < this.length; i++) {
          var a = this[i][0];
          null != a && (n[a] = !0);
        }

        for (i = 0; i < A.length; i++) {
          var r = A[i];
          null != r[0] && n[r[0]] || (e && !r[2] ? r[2] = e : e && (r[2] = "(" + r[2] + ") and (" + e + ")"), t.push(r));
        }
      }, t;
    };
  }, function (A, t) {
    A.exports = "data:application/vnd.ms-fontobject;base64,aAUAAMQEAAABAAIAAAAAAAAAAAAAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAUdPJHwAAAAAAAAAAAAAAAAAAAAAAAA4AaQBjAG8AbQBvAG8AbgAAAA4AUgBlAGcAdQBsAGEAcgAAABYAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAADgBpAGMAbwBtAG8AbwBuAAAAAAAAAQAAAAsAgAADADBPUy8yDxIFrAAAALwAAABgY21hcBdW0okAAAEcAAAAVGdhc3AAAAAQAAABcAAAAAhnbHlmpZ+jMAAAAXgAAAD8aGVhZA/FmAgAAAJ0AAAANmhoZWEHgAPIAAACrAAAACRobXR4EgABvgAAAtAAAAAcbG9jYQCSAOIAAALsAAAAEG1heHAACQAfAAAC/AAAACBuYW1lmUoJ+wAAAxwAAAGGcG9zdAADAAAAAASkAAAAIAADA4ABkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOkCA8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAMAAAAcAAMAAQAAABwABAA4AAAACgAIAAIAAgABACDpAv/9//8AAAAAACDpAP/9//8AAf/jFwQAAwABAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAVgEBA74CgQAcAAABMhceARcWFwcmJy4BJyYjIgYHFyERFzY3PgE3NgIWSkNDbykpF2QQIB9VMzQ5P3AtnP6AmB0iIkspKAJVFxhSODlCIDMrKz4REislmgGAmhkVFBwICAABANYAgQMqAtUACwAAAQcXBycHJzcnNxc3Ayru7jzu7jzu7jzu7gKZ7u487u487u487u4AAQCSAIEDgAK9AAUAACUBFwEnNwGAAcQ8/gDuPPkBxDz+AO48AAAAAAEAAAAAAAAfydNRXw889QALBAAAAAAA1nUqGwAAAADWdSobAAAAAAO+AtUAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAA74AAQAAAAAAAAAAAAAAAAAAAAcEAAAAAAAAAAAAAAACAAAABAAAVgQAANYEAACSAAAAAAAKABQAHgBQAGoAfgABAAAABwAdAAEAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
  }, function (A, t, e) {
    "use strict";

    function n(A, t) {
      for (var e = [], n = {}, i = 0; i < t.length; i++) {
        var a = t[i],
            r = a[0],
            o = {
          id: A + ":" + i,
          css: a[1],
          media: a[2],
          sourceMap: a[3]
        };
        n[r] ? n[r].parts.push(o) : e.push(n[r] = {
          id: r,
          parts: [o]
        });
      }

      return e;
    }

    e.r(t), e.d(t, "default", function () {
      return g;
    });
    var i = "undefined" != typeof document;
    if ("undefined" != typeof DEBUG && DEBUG && !i) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");

    var a = {},
        r = i && (document.head || document.getElementsByTagName("head")[0]),
        o = null,
        s = 0,
        u = !1,
        c = function () {},
        d = null,
        l = "data-vue-ssr-id",
        p = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

    function g(A, t, e, i) {
      u = e, d = i || {};
      var r = n(A, t);
      return f(r), function (t) {
        for (var e = [], i = 0; i < r.length; i++) {
          var o = r[i];
          (s = a[o.id]).refs--, e.push(s);
        }

        t ? f(r = n(A, t)) : r = [];

        for (i = 0; i < e.length; i++) {
          var s;

          if (0 === (s = e[i]).refs) {
            for (var u = 0; u < s.parts.length; u++) s.parts[u]();

            delete a[s.id];
          }
        }
      };
    }

    function f(A) {
      for (var t = 0; t < A.length; t++) {
        var e = A[t],
            n = a[e.id];

        if (n) {
          n.refs++;

          for (var i = 0; i < n.parts.length; i++) n.parts[i](e.parts[i]);

          for (; i < e.parts.length; i++) n.parts.push(v(e.parts[i]));

          n.parts.length > e.parts.length && (n.parts.length = e.parts.length);
        } else {
          var r = [];

          for (i = 0; i < e.parts.length; i++) r.push(v(e.parts[i]));

          a[e.id] = {
            id: e.id,
            refs: 1,
            parts: r
          };
        }
      }
    }

    function B() {
      var A = document.createElement("style");
      return A.type = "text/css", r.appendChild(A), A;
    }

    function v(A) {
      var t,
          e,
          n = document.querySelector("style[" + l + '~="' + A.id + '"]');

      if (n) {
        if (u) return c;
        n.parentNode.removeChild(n);
      }

      if (p) {
        var i = s++;
        n = o || (o = B()), t = C.bind(null, n, i, !1), e = C.bind(null, n, i, !0);
      } else n = B(), t = function (A, t) {
        var e = t.css,
            n = t.media,
            i = t.sourceMap;
        n && A.setAttribute("media", n);
        d.ssrId && A.setAttribute(l, t.id);
        i && (e += "\n/*# sourceURL=" + i.sources[0] + " */", e += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
        if (A.styleSheet) A.styleSheet.cssText = e;else {
          for (; A.firstChild;) A.removeChild(A.firstChild);

          A.appendChild(document.createTextNode(e));
        }
      }.bind(null, n), e = function () {
        n.parentNode.removeChild(n);
      };

      return t(A), function (n) {
        if (n) {
          if (n.css === A.css && n.media === A.media && n.sourceMap === A.sourceMap) return;
          t(A = n);
        } else e();
      };
    }

    var m,
        h = (m = [], function (A, t) {
      return m[A] = t, m.filter(Boolean).join("\n");
    });

    function C(A, t, e, n) {
      var i = e ? "" : n.css;
      if (A.styleSheet) A.styleSheet.cssText = h(t, i);else {
        var a = document.createTextNode(i),
            r = A.childNodes;
        r[t] && A.removeChild(r[t]), r.length ? A.insertBefore(a, r[t]) : A.appendChild(a);
      }
    }
  }, function (A, t, e) {
    "use strict";

    var n = Array.isArray,
        i = Object.keys,
        a = Object.prototype.hasOwnProperty;

    A.exports = function A(t, e) {
      if (t === e) return !0;

      if (t && e && "object" == typeof t && "object" == typeof e) {
        var r,
            o,
            s,
            u = n(t),
            c = n(e);

        if (u && c) {
          if ((o = t.length) != e.length) return !1;

          for (r = o; 0 != r--;) if (!A(t[r], e[r])) return !1;

          return !0;
        }

        if (u != c) return !1;
        var d = t instanceof Date,
            l = e instanceof Date;
        if (d != l) return !1;
        if (d && l) return t.getTime() == e.getTime();
        var p = t instanceof RegExp,
            g = e instanceof RegExp;
        if (p != g) return !1;
        if (p && g) return t.toString() == e.toString();
        var f = i(t);
        if ((o = f.length) !== i(e).length) return !1;

        for (r = o; 0 != r--;) if (!a.call(e, f[r])) return !1;

        for (r = o; 0 != r--;) if (!A(t[s = f[r]], e[s])) return !1;

        return !0;
      }

      return t != t && e != e;
    };
  }, function (A, t, e) {
    A.exports = e(14);
  }, function (A, t, e) {
    "use strict";

    var n = e(0);
    e.n(n).a;
  }, function (A, t, e) {
    (A.exports = e(2)(!0)).push([A.i, ".ti-tag-input[data-v-108f4f13] {\n  background-color: transparent;\n  color: inherit;\n  border: none;\n  padding: 0px;\n  margin: 0px;\n  display: flex;\n  top: 0px;\n  position: absolute;\n  width: 100%;\n  line-height: inherit;\n}\n.ti-tag-input[data-v-108f4f13]::-ms-clear {\n  display: none;\n}\ninput[data-v-108f4f13]:focus {\n  outline: none;\n}\ninput[disabled][data-v-108f4f13] {\n  background-color: transparent;\n}\n", "", {
      version: 3,
      sources: ["C:/Users/johan/dev/vue-tags-input/vue-tags-input/C:/Users/johan/dev/vue-tags-input/vue-tags-input/tag-input.vue"],
      names: [],
      mappings: "AAAA;EACE,8BAA8B;EAC9B,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,cAAc;EACd,SAAS;EACT,mBAAmB;EACnB,YAAY;EACZ,qBAAqB;CAAE;AAEzB;EACE,cAAc;CAAE;AAElB;EACE,cAAc;CAAE;AAElB;EACE,8BAA8B;CAAE",
      file: "tag-input.vue?vue&type=style&index=0&id=108f4f13&lang=css&scoped=true&",
      sourcesContent: [".ti-tag-input {\n  background-color: transparent;\n  color: inherit;\n  border: none;\n  padding: 0px;\n  margin: 0px;\n  display: flex;\n  top: 0px;\n  position: absolute;\n  width: 100%;\n  line-height: inherit; }\n\n.ti-tag-input::-ms-clear {\n  display: none; }\n\ninput:focus {\n  outline: none; }\n\ninput[disabled] {\n  background-color: transparent; }\n"],
      sourceRoot: ""
    }]);
  }, function (A, t, e) {
    "use strict";

    var n = e(1);
    e.n(n).a;
  }, function (A, t, e) {
    t = A.exports = e(2)(!0);
    var n = e(11),
        i = n(e(3)),
        a = n(e(3) + "#iefix"),
        r = n(e(12)),
        o = n(e(13));
    t.push([A.i, "@font-face {\n  font-family: 'icomoon';\n  src: url(" + i + ");\n  src: url(" + a + ') format("embedded-opentype"), url(' + r + ') format("truetype"), url(' + o + ') format("woff");\n  font-weight: normal;\n  font-style: normal;\n}\n[class^="ti-icon-"][data-v-61d92e31], [class*=" ti-icon-"][data-v-61d92e31] {\n  font-family: \'icomoon\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.ti-icon-check[data-v-61d92e31]:before {\n  content: "\\e902";\n}\n.ti-icon-close[data-v-61d92e31]:before {\n  content: "\\e901";\n}\n.ti-icon-undo[data-v-61d92e31]:before {\n  content: "\\e900";\n}\nul[data-v-61d92e31] {\n  margin: 0px;\n  padding: 0px;\n  list-style-type: none;\n}\n*[data-v-61d92e31], *[data-v-61d92e31]:before, *[data-v-61d92e31]:after {\n  box-sizing: border-box;\n}\ninput[data-v-61d92e31]:focus {\n  outline: none;\n}\ninput[disabled][data-v-61d92e31] {\n  background-color: transparent;\n}\n.vue-tags-input[data-v-61d92e31] {\n  max-width: 450px;\n  position: relative;\n  background-color: #fff;\n}\ndiv.vue-tags-input.disabled[data-v-61d92e31] {\n  opacity: 0.5;\n}\ndiv.vue-tags-input.disabled *[data-v-61d92e31] {\n    cursor: default;\n}\n.ti-input[data-v-61d92e31] {\n  border: 1px solid #ccc;\n  display: flex;\n  padding: 4px;\n  flex-wrap: wrap;\n}\n.ti-tags[data-v-61d92e31] {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  line-height: 1em;\n}\n.ti-tag[data-v-61d92e31] {\n  background-color: #5C6BC0;\n  color: #fff;\n  border-radius: 2px;\n  display: flex;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em;\n}\n.ti-tag[data-v-61d92e31]:focus {\n    outline: none;\n}\n.ti-tag .ti-content[data-v-61d92e31] {\n    display: flex;\n    align-items: center;\n}\n.ti-tag .ti-tag-center[data-v-61d92e31] {\n    position: relative;\n}\n.ti-tag span[data-v-61d92e31] {\n    line-height: .85em;\n}\n.ti-tag span.ti-hidden[data-v-61d92e31] {\n    padding-left: 14px;\n    visibility: hidden;\n    height: 0px;\n    white-space: pre;\n}\n.ti-tag .ti-actions[data-v-61d92e31] {\n    margin-left: 2px;\n    display: flex;\n    align-items: center;\n    font-size: 1.15em;\n}\n.ti-tag .ti-actions i[data-v-61d92e31] {\n      cursor: pointer;\n}\n.ti-tag[data-v-61d92e31]:last-child {\n    margin-right: 4px;\n}\n.ti-tag.ti-invalid[data-v-61d92e31], .ti-tag.ti-tag.ti-deletion-mark[data-v-61d92e31] {\n    background-color: #e54d42;\n}\n.ti-new-tag-input-wrapper[data-v-61d92e31] {\n  display: flex;\n  flex: 1 0 auto;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em;\n}\n.ti-new-tag-input-wrapper input[data-v-61d92e31] {\n    flex: 1 0 auto;\n    min-width: 100px;\n    border: none;\n    padding: 0px;\n    margin: 0px;\n}\n.ti-new-tag-input[data-v-61d92e31] {\n  line-height: initial;\n}\n.ti-autocomplete[data-v-61d92e31] {\n  border: 1px solid #ccc;\n  border-top: none;\n  position: absolute;\n  width: 100%;\n  background-color: #fff;\n  z-index: 20;\n}\n.ti-item > div[data-v-61d92e31] {\n  cursor: pointer;\n  padding: 3px 6px;\n  width: 100%;\n}\n.ti-selected-item[data-v-61d92e31] {\n  background-color: #5C6BC0;\n  color: #fff;\n}\n', "", {
      version: 3,
      sources: ["C:/Users/johan/dev/vue-tags-input/vue-tags-input/C:/Users/johan/dev/vue-tags-input/vue-tags-input/vue-tags-input.scss"],
      names: [],
      mappings: "AAAA;EACE,uBAAuB;EACvB,mCAA8C;EAC9C,+JAAuM;EACvM,oBAAoB;EACpB,mBAAmB;CAAE;AAEvB;EACE,kCAAkC;EAClC,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,qBAAqB;EACrB,qBAAqB;EACrB,eAAe;EACf,oCAAoC;EACpC,mCAAmC;CAAE;AAEvC;EACE,iBAAiB;CAAE;AAErB;EACE,iBAAiB;CAAE;AAErB;EACE,iBAAiB;CAAE;AAErB;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;CAAE;AAE1B;EACE,uBAAuB;CAAE;AAE3B;EACE,cAAc;CAAE;AAElB;EACE,8BAA8B;CAAE;AAElC;EACE,iBAAiB;EACjB,mBAAmB;EACnB,uBAAuB;CAAE;AAE3B;EACE,aAAa;CAAE;AACf;IACE,gBAAgB;CAAE;AAEtB;EACE,uBAAuB;EACvB,cAAc;EACd,aAAa;EACb,gBAAgB;CAAE;AAEpB;EACE,cAAc;EACd,gBAAgB;EAChB,YAAY;EACZ,iBAAiB;CAAE;AAErB;EACE,0BAA0B;EAC1B,YAAY;EACZ,mBAAmB;EACnB,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAAE;AACnB;IACE,cAAc;CAAE;AAClB;IACE,cAAc;IACd,oBAAoB;CAAE;AACxB;IACE,mBAAmB;CAAE;AACvB;IACE,mBAAmB;CAAE;AACvB;IACE,mBAAmB;IACnB,mBAAmB;IACnB,YAAY;IACZ,iBAAiB;CAAE;AACrB;IACE,iBAAiB;IACjB,cAAc;IACd,oBAAoB;IACpB,kBAAkB;CAAE;AACpB;MACE,gBAAgB;CAAE;AACtB;IACE,kBAAkB;CAAE;AACtB;IACE,0BAA0B;CAAE;AAEhC;EACE,cAAc;EACd,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAAE;AACnB;IACE,eAAe;IACf,iBAAiB;IACjB,aAAa;IACb,aAAa;IACb,YAAY;CAAE;AAElB;EACE,qBAAqB;CAAE;AAEzB;EACE,uBAAuB;EACvB,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,uBAAuB;EACvB,YAAY;CAAE;AAEhB;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CAAE;AAEhB;EACE,0BAA0B;EAC1B,YAAY;CAAE",
      file: "vue-tags-input.scss?vue&type=style&index=0&id=61d92e31&lang=scss&scoped=true&",
      sourcesContent: ['@font-face {\n  font-family: \'icomoon\';\n  src: url("./assets/fonts/icomoon.eot?7grlse");\n  src: url("./assets/fonts/icomoon.eot?7grlse#iefix") format("embedded-opentype"), url("./assets/fonts/icomoon.ttf?7grlse") format("truetype"), url("./assets/fonts/icomoon.woff?7grlse") format("woff");\n  font-weight: normal;\n  font-style: normal; }\n\n[class^="ti-icon-"], [class*=" ti-icon-"] {\n  font-family: \'icomoon\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.ti-icon-check:before {\n  content: "\\e902"; }\n\n.ti-icon-close:before {\n  content: "\\e901"; }\n\n.ti-icon-undo:before {\n  content: "\\e900"; }\n\nul {\n  margin: 0px;\n  padding: 0px;\n  list-style-type: none; }\n\n*, *:before, *:after {\n  box-sizing: border-box; }\n\ninput:focus {\n  outline: none; }\n\ninput[disabled] {\n  background-color: transparent; }\n\n.vue-tags-input {\n  max-width: 450px;\n  position: relative;\n  background-color: #fff; }\n\ndiv.vue-tags-input.disabled {\n  opacity: 0.5; }\n  div.vue-tags-input.disabled * {\n    cursor: default; }\n\n.ti-input {\n  border: 1px solid #ccc;\n  display: flex;\n  padding: 4px;\n  flex-wrap: wrap; }\n\n.ti-tags {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  line-height: 1em; }\n\n.ti-tag {\n  background-color: #5C6BC0;\n  color: #fff;\n  border-radius: 2px;\n  display: flex;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em; }\n  .ti-tag:focus {\n    outline: none; }\n  .ti-tag .ti-content {\n    display: flex;\n    align-items: center; }\n  .ti-tag .ti-tag-center {\n    position: relative; }\n  .ti-tag span {\n    line-height: .85em; }\n  .ti-tag span.ti-hidden {\n    padding-left: 14px;\n    visibility: hidden;\n    height: 0px;\n    white-space: pre; }\n  .ti-tag .ti-actions {\n    margin-left: 2px;\n    display: flex;\n    align-items: center;\n    font-size: 1.15em; }\n    .ti-tag .ti-actions i {\n      cursor: pointer; }\n  .ti-tag:last-child {\n    margin-right: 4px; }\n  .ti-tag.ti-invalid, .ti-tag.ti-tag.ti-deletion-mark {\n    background-color: #e54d42; }\n\n.ti-new-tag-input-wrapper {\n  display: flex;\n  flex: 1 0 auto;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em; }\n  .ti-new-tag-input-wrapper input {\n    flex: 1 0 auto;\n    min-width: 100px;\n    border: none;\n    padding: 0px;\n    margin: 0px; }\n\n.ti-new-tag-input {\n  line-height: initial; }\n\n.ti-autocomplete {\n  border: 1px solid #ccc;\n  border-top: none;\n  position: absolute;\n  width: 100%;\n  background-color: #fff;\n  z-index: 20; }\n\n.ti-item > div {\n  cursor: pointer;\n  padding: 3px 6px;\n  width: 100%; }\n\n.ti-selected-item {\n  background-color: #5C6BC0;\n  color: #fff; }\n'],
      sourceRoot: ""
    }]);
  }, function (A, t, e) {
    "use strict";

    A.exports = function (A) {
      return "string" != typeof A ? A : (/^['"].*['"]$/.test(A) && (A = A.slice(1, -1)), /["'() \t\n]/.test(A) ? '"' + A.replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"' : A);
    };
  }, function (A, t) {
    A.exports = "data:font/ttf;base64,AAEAAAALAIAAAwAwT1MvMg8SBawAAAC8AAAAYGNtYXAXVtKJAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZqWfozAAAAF4AAAA/GhlYWQPxZgIAAACdAAAADZoaGVhB4ADyAAAAqwAAAAkaG10eBIAAb4AAALQAAAAHGxvY2EAkgDiAAAC7AAAABBtYXhwAAkAHwAAAvwAAAAgbmFtZZlKCfsAAAMcAAABhnBvc3QAAwAAAAAEpAAAACAAAwOAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpAgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6QL//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAFYBAQO+AoEAHAAAATIXHgEXFhcHJicuAScmIyIGBxchERc2Nz4BNzYCFkpDQ28pKRdkECAfVTM0OT9wLZz+gJgdIiJLKSgCVRcYUjg5QiAzKys+ERIrJZoBgJoZFRQcCAgAAQDWAIEDKgLVAAsAAAEHFwcnByc3JzcXNwMq7u487u487u487u4Cme7uPO7uPO7uPO7uAAEAkgCBA4ACvQAFAAAlARcBJzcBgAHEPP4A7jz5AcQ8/gDuPAAAAAABAAAAAAAAH8nTUV8PPPUACwQAAAAAANZ1KhsAAAAA1nUqGwAAAAADvgLVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAO+AAEAAAAAAAAAAAAAAAAAAAAHBAAAAAAAAAAAAAAAAgAAAAQAAFYEAADWBAAAkgAAAAAACgAUAB4AUABqAH4AAQAAAAcAHQABAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGljb21vb24AaQBjAG8AbQBvAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGljb21vb24AaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcmljb21vb24AaQBjAG8AbQBvAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }, function (A, t) {
    A.exports = "data:font/woff;base64,d09GRgABAAAAAAUQAAsAAAAABMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFrGNtYXAAAAFoAAAAVAAAAFQXVtKJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAPwAAAD8pZ+jMGhlYWQAAALAAAAANgAAADYPxZgIaGhlYQAAAvgAAAAkAAAAJAeAA8hobXR4AAADHAAAABwAAAAcEgABvmxvY2EAAAM4AAAAEAAAABAAkgDibWF4cAAAA0gAAAAgAAAAIAAJAB9uYW1lAAADaAAAAYYAAAGGmUoJ+3Bvc3QAAATwAAAAIAAAACAAAwAAAAMDgAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QIDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkC//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQBWAQEDvgKBABwAAAEyFx4BFxYXByYnLgEnJiMiBgcXIREXNjc+ATc2AhZKQ0NvKSkXZBAgH1UzNDk/cC2c/oCYHSIiSykoAlUXGFI4OUIgMysrPhESKyWaAYCaGRUUHAgIAAEA1gCBAyoC1QALAAABBxcHJwcnNyc3FzcDKu7uPO7uPO7uPO7uApnu7jzu7jzu7jzu7gABAJIAgQOAAr0ABQAAJQEXASc3AYABxDz+AO48+QHEPP4A7jwAAAAAAQAAAAAAAB/J01FfDzz1AAsEAAAAAADWdSobAAAAANZ1KhsAAAAAA74C1QAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADvgABAAAAAAAAAAAAAAAAAAAABwQAAAAAAAAAAAAAAAIAAAAEAABWBAAA1gQAAJIAAAAAAAoAFAAeAFAAagB+AAEAAAAHAB0AAQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  }, function (A, t, e) {
    "use strict";

    e.r(t);

    var n = function () {
      var A = this,
          t = A.$createElement,
          e = A._self._c || t;
      return e("div", {
        staticClass: "vue-tags-input",
        class: [{
          "ti-disabled": A.disabled
        }, {
          "ti-focus": A.focused
        }]
      }, [e("div", {
        staticClass: "ti-input"
      }, [A.tagsCopy ? e("ul", {
        staticClass: "ti-tags"
      }, [A._l(A.tagsCopy, function (t, n) {
        return e("li", {
          key: n,
          staticClass: "ti-tag",
          class: [{
            "ti-editing": A.tagsEditStatus[n]
          }, t.tiClasses, t.classes, {
            "ti-deletion-mark": A.isMarked(n)
          }],
          style: t.style,
          attrs: {
            tabindex: "0"
          },
          on: {
            click: function (e) {
              return A.$emit("tag-clicked", {
                tag: t,
                index: n
              });
            }
          }
        }, [e("div", {
          staticClass: "ti-content"
        }, [A.$scopedSlots["tag-left"] ? e("div", {
          staticClass: "ti-tag-left"
        }, [A._t("tag-left", null, {
          tag: t,
          index: n,
          edit: A.tagsEditStatus[n],
          performSaveEdit: A.performSaveTag,
          performDelete: A.performDeleteTag,
          performCancelEdit: A.cancelEdit,
          performOpenEdit: A.performEditTag,
          deletionMark: A.isMarked(n)
        })], 2) : A._e(), A._v(" "), e("div", {
          ref: "tagCenter",
          refInFor: !0,
          staticClass: "ti-tag-center"
        }, [A.$scopedSlots["tag-center"] ? A._e() : e("span", {
          class: {
            "ti-hidden": A.tagsEditStatus[n]
          },
          on: {
            click: function (t) {
              return A.performEditTag(n);
            }
          }
        }, [A._v(A._s(t.text))]), A._v(" "), A.$scopedSlots["tag-center"] ? A._e() : e("tag-input", {
          attrs: {
            scope: {
              edit: A.tagsEditStatus[n],
              maxlength: A.maxlength,
              tag: t,
              index: n,
              validateTag: A.createChangedTag,
              performCancelEdit: A.cancelEdit,
              performSaveEdit: A.performSaveTag
            }
          }
        }), A._v(" "), A._t("tag-center", null, {
          tag: t,
          index: n,
          maxlength: A.maxlength,
          edit: A.tagsEditStatus[n],
          performSaveEdit: A.performSaveTag,
          performDelete: A.performDeleteTag,
          performCancelEdit: A.cancelEdit,
          validateTag: A.createChangedTag,
          performOpenEdit: A.performEditTag,
          deletionMark: A.isMarked(n)
        })], 2), A._v(" "), A.$scopedSlots["tag-right"] ? e("div", {
          staticClass: "ti-tag-right"
        }, [A._t("tag-right", null, {
          tag: t,
          index: n,
          edit: A.tagsEditStatus[n],
          performSaveEdit: A.performSaveTag,
          performDelete: A.performDeleteTag,
          performCancelEdit: A.cancelEdit,
          performOpenEdit: A.performEditTag,
          deletionMark: A.isMarked(n)
        })], 2) : A._e()]), A._v(" "), e("div", {
          staticClass: "ti-actions"
        }, [A.$scopedSlots["tag-actions"] ? A._e() : e("i", {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: A.tagsEditStatus[n],
            expression: "tagsEditStatus[index]"
          }],
          staticClass: "ti-icon-undo",
          on: {
            click: function (t) {
              return A.cancelEdit(n);
            }
          }
        }), A._v(" "), A.$scopedSlots["tag-actions"] ? A._e() : e("i", {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: !A.tagsEditStatus[n],
            expression: "!tagsEditStatus[index]"
          }],
          staticClass: "ti-icon-close",
          on: {
            click: function (t) {
              return A.performDeleteTag(n);
            }
          }
        }), A._v(" "), A.$scopedSlots["tag-actions"] ? A._t("tag-actions", null, {
          tag: t,
          index: n,
          edit: A.tagsEditStatus[n],
          performSaveEdit: A.performSaveTag,
          performDelete: A.performDeleteTag,
          performCancelEdit: A.cancelEdit,
          performOpenEdit: A.performEditTag,
          deletionMark: A.isMarked(n)
        }) : A._e()], 2)]);
      }), A._v(" "), e("li", {
        staticClass: "ti-new-tag-input-wrapper"
      }, [e("input", A._b({
        ref: "newTagInput",
        staticClass: "ti-new-tag-input",
        class: [A.createClasses(A.newTag, A.tags, A.validation, A.isDuplicate)],
        attrs: {
          placeholder: A.placeholder,
          maxlength: A.maxlength,
          disabled: A.disabled,
          type: "text",
          size: "1"
        },
        domProps: {
          value: A.newTag
        },
        on: {
          keydown: [function (t) {
            return A.performAddTags(A.filteredAutocompleteItems[A.selectedItem] || A.newTag, t);
          }, function (t) {
            return t.type.indexOf("key") || 8 === t.keyCode ? A.invokeDelete(t) : null;
          }, function (t) {
            return t.type.indexOf("key") || 9 === t.keyCode ? A.performBlur(t) : null;
          }, function (t) {
            return t.type.indexOf("key") || 38 === t.keyCode ? A.selectItem(t, "before") : null;
          }, function (t) {
            return t.type.indexOf("key") || 40 === t.keyCode ? A.selectItem(t, "after") : null;
          }],
          paste: A.addTagsFromPaste,
          input: A.updateNewTag,
          blur: function (t) {
            return A.$emit("blur", t);
          },
          focus: function (t) {
            A.focused = !0, A.$emit("focus", t);
          },
          click: function (t) {
            !A.addOnlyFromAutocomplete && (A.selectedItem = null);
          }
        }
      }, "input", A.$attrs, !1))])], 2) : A._e()]), A._v(" "), A._t("between-elements"), A._v(" "), A.autocompleteOpen ? e("div", {
        staticClass: "ti-autocomplete",
        on: {
          mouseout: function (t) {
            A.selectedItem = null;
          }
        }
      }, [A._t("autocomplete-header"), A._v(" "), e("ul", A._l(A.filteredAutocompleteItems, function (t, n) {
        return e("li", {
          key: n,
          staticClass: "ti-item",
          class: [t.tiClasses, t.classes, {
            "ti-selected-item": A.isSelected(n)
          }],
          style: t.style,
          on: {
            mouseover: function (t) {
              !A.disabled && (A.selectedItem = n);
            }
          }
        }, [A.$scopedSlots["autocomplete-item"] ? A._t("autocomplete-item", null, {
          item: t,
          index: n,
          performAdd: function (t) {
            return A.performAddTags(t, void 0, "autocomplete");
          },
          selected: A.isSelected(n)
        }) : e("div", {
          on: {
            click: function (e) {
              return A.performAddTags(t, void 0, "autocomplete");
            }
          }
        }, [A._v("\n          " + A._s(t.text) + "\n        ")])], 2);
      }), 0), A._v(" "), A._t("autocomplete-footer")], 2) : A._e()], 2);
    };

    n._withStripped = !0;

    var i = e(5),
        a = e.n(i),
        r = function (A) {
      return JSON.parse(JSON.stringify(A));
    },
        o = function (A, t) {
      var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
          n = arguments.length > 3 ? arguments[3] : void 0;
      void 0 === A.text && (A = {
        text: A
      });

      var i = function (A, t) {
        return t.filter(function (t) {
          var e = A.text;
          return "string" == typeof t.rule ? !new RegExp(t.rule).test(e) : t.rule instanceof RegExp ? !t.rule.test(e) : "[object Function]" === {}.toString.call(t.rule) ? t.rule(A) : void 0;
        }).map(function (A) {
          return A.classes;
        });
      }(A, e),
          a = function (A, t) {
        for (var e = 0; e < A.length;) {
          if (t(A[e], e, A)) return e;
          e++;
        }

        return -1;
      }(t, function (t) {
        return t === A;
      }),
          o = r(t),
          s = -1 !== a ? o.splice(a, 1)[0] : r(A);

      return (n ? n(o, s) : -1 !== o.map(function (A) {
        return A.text;
      }).indexOf(s.text)) && i.push("ti-duplicate"), 0 === i.length ? i.push("ti-valid") : i.push("ti-invalid"), i;
    },
        s = function (A) {
      void 0 === A.text && (A = {
        text: A
      });

      for (var t = r(A), e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) n[i - 1] = arguments[i];

      return t.tiClasses = o.apply(void 0, [A].concat(n)), t;
    },
        u = function (A) {
      for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) e[n - 1] = arguments[n];

      return A.map(function (t) {
        return s.apply(void 0, [t, A].concat(e));
      });
    },
        c = function () {
      var A = this,
          t = A.$createElement,
          e = A._self._c || t;
      return A.scope.edit ? e("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: A.scope.tag.text,
          expression: "scope.tag.text"
        }],
        staticClass: "ti-tag-input",
        attrs: {
          maxlength: A.scope.maxlength,
          type: "text",
          size: "1"
        },
        domProps: {
          value: A.scope.tag.text
        },
        on: {
          input: [function (t) {
            t.target.composing || A.$set(A.scope.tag, "text", t.target.value);
          }, function (t) {
            return A.scope.validateTag(A.scope.index, t);
          }],
          blur: function (t) {
            return A.scope.performCancelEdit(A.scope.index);
          },
          keydown: function (t) {
            return A.scope.performSaveEdit(A.scope.index, t);
          }
        }
      }) : A._e();
    };

    c._withStripped = !0;
    var d = {
      name: "TagInput",
      props: {
        scope: {
          type: Object
        }
      }
    };
    e(7);

    function l(A, t, e, n, i, a, r, o) {
      var s,
          u = "function" == typeof A ? A.options : A;
      if (t && (u.render = t, u.staticRenderFns = e, u._compiled = !0), n && (u.functional = !0), a && (u._scopeId = "data-v-" + a), r ? (s = function (A) {
        (A = A || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (A = __VUE_SSR_CONTEXT__), i && i.call(this, A), A && A._registeredComponents && A._registeredComponents.add(r);
      }, u._ssrRegister = s) : i && (s = o ? function () {
        i.call(this, this.$root.$options.shadowRoot);
      } : i), s) if (u.functional) {
        u._injectStyles = s;
        var c = u.render;

        u.render = function (A, t) {
          return s.call(t), c(A, t);
        };
      } else {
        var d = u.beforeCreate;
        u.beforeCreate = d ? [].concat(d, s) : [s];
      }
      return {
        exports: A,
        options: u
      };
    }

    var p = l(d, c, [], !1, null, "108f4f13", null);
    p.options.__file = "vue-tags-input/tag-input.vue";

    var g = p.exports,
        f = function (A) {
      return !A.some(function (A) {
        var t = !A.text;
        t && console.warn('Missing property "text"', A);
        var e = !1;
        return A.classes && (e = "string" != typeof A.classes), e && console.warn('Property "classes" must be type of string', A), t || e;
      });
    },
        B = function (A) {
      return !A.some(function (A) {
        if ("number" == typeof A) {
          var t = isFinite(A) && Math.floor(A) === A;
          return t || console.warn("Only numerics are allowed for this prop. Found:", A), !t;
        }

        if ("string" == typeof A) {
          var e = /\W|[a-z]|!\d/i.test(A);
          return e || console.warn("Only alpha strings are allowed for this prop. Found:", A), !e;
        }

        return console.warn("Only numeric and string values are allowed. Found:", A), !1;
      });
    },
        v = {
      value: {
        type: String,
        default: "",
        required: !0
      },
      tags: {
        type: Array,
        default: function () {
          return [];
        },
        validator: f
      },
      autocompleteItems: {
        type: Array,
        default: function () {
          return [];
        },
        validator: f
      },
      allowEditTags: {
        type: Boolean,
        default: !1
      },
      autocompleteFilterDuplicates: {
        default: !0,
        type: Boolean
      },
      addOnlyFromAutocomplete: {
        type: Boolean,
        default: !1
      },
      autocompleteMinLength: {
        type: Number,
        default: 1
      },
      autocompleteAlwaysOpen: {
        type: Boolean,
        default: !1
      },
      disabled: {
        type: Boolean,
        default: !1
      },
      placeholder: {
        type: String,
        default: "Add Tag"
      },
      addOnKey: {
        type: Array,
        default: function () {
          return [13];
        },
        validator: B
      },
      saveOnKey: {
        type: Array,
        default: function () {
          return [13];
        },
        validator: B
      },
      maxTags: {
        type: Number
      },
      maxlength: {
        type: Number
      },
      validation: {
        type: Array,
        default: function () {
          return [];
        },
        validator: function (A) {
          return !A.some(function (A) {
            var t = !A.rule;
            t && console.warn('Property "rule" is missing', A);
            var e = A.rule && ("string" == typeof A.rule || A.rule instanceof RegExp || "[object Function]" === {}.toString.call(A.rule));
            e || console.warn("A rule must be type of string, RegExp or function. Found:", JSON.stringify(A.rule));
            var n = !A.classes;
            n && console.warn('Property "classes" is missing', A);
            var i = A.type && "string" != typeof A.type;
            return i && console.warn('Property "type" must be type of string. Found:', A), !e || t || n || i;
          });
        }
      },
      separators: {
        type: Array,
        default: function () {
          return [";"];
        },
        validator: function (A) {
          return !A.some(function (A) {
            var t = "string" != typeof A;
            return t && console.warn("Separators must be type of string. Found:", A), t;
          });
        }
      },
      avoidAddingDuplicates: {
        type: Boolean,
        default: !0
      },
      addOnBlur: {
        type: Boolean,
        default: !0
      },
      isDuplicate: {
        type: Function,
        default: null
      },
      addFromPaste: {
        type: Boolean,
        default: !0
      },
      deleteOnBackspace: {
        default: !0,
        type: Boolean
      }
    };

    function m(A) {
      return (m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (A) {
        return typeof A;
      } : function (A) {
        return A && "function" == typeof Symbol && A.constructor === Symbol && A !== Symbol.prototype ? "symbol" : typeof A;
      })(A);
    }

    var h = {
      name: "VueTagsInput",
      components: {
        TagInput: g
      },
      props: v,
      data: function () {
        return {
          newTag: null,
          tagsCopy: null,
          tagsEditStatus: null,
          deletionMark: null,
          deletionMarkTime: null,
          selectedItem: null,
          focused: null
        };
      },
      computed: {
        autocompleteOpen: function () {
          return !!this.autocompleteAlwaysOpen || null !== this.newTag && this.newTag.length >= this.autocompleteMinLength && this.filteredAutocompleteItems.length > 0 && this.focused;
        },
        filteredAutocompleteItems: function () {
          var A = this,
              t = this.autocompleteItems.map(function (t) {
            return s(t, A.tags, A.validation, A.isDuplicate);
          });
          return this.autocompleteFilterDuplicates ? t.filter(this.duplicateFilter) : t;
        }
      },
      methods: {
        createClasses: o,
        getSelectedIndex: function (A) {
          var t = this.filteredAutocompleteItems,
              e = this.selectedItem,
              n = t.length - 1;
          if (0 !== t.length) return null === e ? 0 : "before" === A && 0 === e ? n : "after" === A && e === n ? 0 : "after" === A ? e + 1 : e - 1;
        },
        selectDefaultItem: function () {
          this.addOnlyFromAutocomplete && this.filteredAutocompleteItems.length > 0 ? this.selectedItem = 0 : this.selectedItem = null;
        },
        selectItem: function (A, t) {
          A.preventDefault(), this.selectedItem = this.getSelectedIndex(t);
        },
        isSelected: function (A) {
          return this.selectedItem === A;
        },
        isMarked: function (A) {
          return this.deletionMark === A;
        },
        invokeDelete: function () {
          var A = this;

          if (this.deleteOnBackspace && !(this.newTag.length > 0)) {
            var t = this.tagsCopy.length - 1;
            null === this.deletionMark ? (this.deletionMarkTime = setTimeout(function () {
              return A.deletionMark = null;
            }, 1e3), this.deletionMark = t) : this.performDeleteTag(t);
          }
        },
        addTagsFromPaste: function () {
          var A = this;
          this.addFromPaste && setTimeout(function () {
            return A.performAddTags(A.newTag);
          }, 10);
        },
        performEditTag: function (A) {
          var t = this;
          this.allowEditTags && (this._events["before-editing-tag"] || this.editTag(A), this.$emit("before-editing-tag", {
            index: A,
            tag: this.tagsCopy[A],
            editTag: function () {
              return t.editTag(A);
            }
          }));
        },
        editTag: function (A) {
          this.allowEditTags && (this.toggleEditMode(A), this.focus(A));
        },
        toggleEditMode: function (A) {
          this.allowEditTags && !this.disabled && this.$set(this.tagsEditStatus, A, !this.tagsEditStatus[A]);
        },
        createChangedTag: function (A, t) {
          var e = this.tagsCopy[A];
          e.text = t ? t.target.value : this.tagsCopy[A].text, this.$set(this.tagsCopy, A, s(e, this.tagsCopy, this.validation, this.isDuplicate));
        },
        focus: function (A) {
          var t = this;
          this.$nextTick(function () {
            var e = t.$refs.tagCenter[A].querySelector("input.ti-tag-input");
            e && e.focus();
          });
        },
        quote: function (A) {
          return A.replace(/([()[{*+.$^\\|?])/g, "\\$1");
        },
        cancelEdit: function (A) {
          this.tags[A] && (this.tagsCopy[A] = r(s(this.tags[A], this.tags, this.validation, this.isDuplicate)), this.$set(this.tagsEditStatus, A, !1));
        },
        hasForbiddingAddRule: function (A) {
          var t = this;
          return A.some(function (A) {
            var e = t.validation.find(function (t) {
              return A === t.classes;
            });
            return !!e && e.disableAdd;
          });
        },
        createTagTexts: function (A) {
          var t = this,
              e = new RegExp(this.separators.map(function (A) {
            return t.quote(A);
          }).join("|"));
          return A.split(e).map(function (A) {
            return {
              text: A
            };
          });
        },
        performDeleteTag: function (A) {
          var t = this;
          this._events["before-deleting-tag"] || this.deleteTag(A), this.$emit("before-deleting-tag", {
            index: A,
            tag: this.tagsCopy[A],
            deleteTag: function () {
              return t.deleteTag(A);
            }
          });
        },
        deleteTag: function (A) {
          this.disabled || (this.deletionMark = null, clearTimeout(this.deletionMarkTime), this.tagsCopy.splice(A, 1), this._events["update:tags"] && this.$emit("update:tags", this.tagsCopy), this.$emit("tags-changed", this.tagsCopy));
        },
        noTriggerKey: function (A, t) {
          var e = -1 !== this[t].indexOf(A.keyCode) || -1 !== this[t].indexOf(A.key);
          return e && A.preventDefault(), !e;
        },
        performAddTags: function (A, t, e) {
          var n = this;

          if (!(this.disabled || t && this.noTriggerKey(t, "addOnKey"))) {
            var i = [];
            "object" === m(A) && (i = [A]), "string" == typeof A && (i = this.createTagTexts(A)), (i = i.filter(function (A) {
              return A.text.trim().length > 0;
            })).forEach(function (A) {
              A = s(A, n.tags, n.validation, n.isDuplicate), n._events["before-adding-tag"] || n.addTag(A, e), n.$emit("before-adding-tag", {
                tag: A,
                addTag: function () {
                  return n.addTag(A, e);
                }
              });
            });
          }
        },
        duplicateFilter: function (A) {
          return this.isDuplicate ? !this.isDuplicate(this.tagsCopy, A) : !this.tagsCopy.find(function (t) {
            return t.text === A.text;
          });
        },
        addTag: function (A) {
          var t = this,
              e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "new-tag-input",
              n = this.filteredAutocompleteItems.map(function (A) {
            return A.text;
          });
          this.addOnlyFromAutocomplete && -1 === n.indexOf(A.text) || this.$nextTick(function () {
            return t.maxTags && t.maxTags <= t.tagsCopy.length ? t.$emit("max-tags-reached", A) : t.avoidAddingDuplicates && !t.duplicateFilter(A) ? t.$emit("adding-duplicate", A) : void (t.hasForbiddingAddRule(A.tiClasses) || (t.$emit("input", ""), t.tagsCopy.push(A), t._events["update:tags"] && t.$emit("update:tags", t.tagsCopy), "autocomplete" === e && t.$refs.newTagInput.focus(), t.$emit("tags-changed", t.tagsCopy)));
          });
        },
        performSaveTag: function (A, t) {
          var e = this,
              n = this.tagsCopy[A];
          this.disabled || t && this.noTriggerKey(t, "addOnKey") || 0 !== n.text.trim().length && (this._events["before-saving-tag"] || this.saveTag(A, n), this.$emit("before-saving-tag", {
            index: A,
            tag: n,
            saveTag: function () {
              return e.saveTag(A, n);
            }
          }));
        },
        saveTag: function (A, t) {
          if (this.avoidAddingDuplicates) {
            var e = r(this.tagsCopy),
                n = e.splice(A, 1)[0];
            if (this.isDuplicate ? this.isDuplicate(e, n) : -1 !== e.map(function (A) {
              return A.text;
            }).indexOf(n.text)) return this.$emit("saving-duplicate", t);
          }

          this.hasForbiddingAddRule(t.tiClasses) || (this.$set(this.tagsCopy, A, t), this.toggleEditMode(A), this._events["update:tags"] && this.$emit("update:tags", this.tagsCopy), this.$emit("tags-changed", this.tagsCopy));
        },
        tagsEqual: function () {
          var A = this;
          return !this.tagsCopy.some(function (t, e) {
            return !a()(t, A.tags[e]);
          });
        },
        updateNewTag: function (A) {
          var t = A.target.value;
          this.newTag = t, this.$emit("input", t);
        },
        initTags: function () {
          this.tagsCopy = u(this.tags, this.validation, this.isDuplicate), this.tagsEditStatus = r(this.tags).map(function () {
            return !1;
          }), this._events["update:tags"] && !this.tagsEqual() && this.$emit("update:tags", this.tagsCopy);
        },
        blurredOnClick: function (A) {
          this.$el.contains(A.target) || this.$el.contains(document.activeElement) || this.performBlur(A);
        },
        performBlur: function () {
          this.addOnBlur && this.focused && this.performAddTags(this.newTag), this.focused = !1;
        }
      },
      watch: {
        value: function (A) {
          this.addOnlyFromAutocomplete || (this.selectedItem = null), this.newTag = A;
        },
        tags: {
          handler: function () {
            this.initTags();
          },
          deep: !0
        },
        autocompleteOpen: "selectDefaultItem"
      },
      created: function () {
        this.newTag = this.value, this.initTags();
      },
      mounted: function () {
        this.selectDefaultItem(), document.addEventListener("click", this.blurredOnClick);
      },
      destroyed: function () {
        document.removeEventListener("click", this.blurredOnClick);
      }
    },
        C = (e(9), l(h, n, [], !1, null, "61d92e31", null));
    C.options.__file = "vue-tags-input/vue-tags-input.vue";
    var E = C.exports;
    e.d(t, "VueTagsInput", function () {
      return E;
    }), e.d(t, "createClasses", function () {
      return o;
    }), e.d(t, "createTag", function () {
      return s;
    }), e.d(t, "createTags", function () {
      return u;
    }), e.d(t, "TagInput", function () {
      return g;
    }), E.install = function (A) {
      return A.component(E.name, E);
    }, "undefined" != typeof window && window.Vue && window.Vue.use(E);
    t.default = E;
  }]);
});
},{}],"src/components/createcontent.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueTagsInput = _interopRequireDefault(require("@johmun/vue-tags-input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import wysiwyg from ""
// let baseurl = "http://localhost:3000"
var baseurl = "http://34.87.55.207";
var _default = {
  components: {
    VueTagsInput: _vueTagsInput.default
  },
  data: function data() {
    return {
      title: "",
      content: "",
      image: "",
      tag: "",
      tags: []
    };
  },
  methods: {
    handlefileupload: function handlefileupload() {
      var file = event.target.files || event.dataTransfer.files;
      this.image = file[0];
    },
    saveArticle: function saveArticle() {
      var _this = this;

      console.log("masuk ke savearticle");
      var taggs = [];

      for (var i = 0; i < this.tags.length; i++) {
        taggs.push(this.tags[i].text);
      }

      console.log(taggs);
      console.log(this.image);
      var formData = new FormData();
      formData.set("featured_image", this.image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      formData.set("tagku", taggs);
      console.log(formData);
      Swal.showLoading();
      axios({
        method: "POST",
        url: "".concat(baseurl, "/miniWp/"),
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      }).then(function (response) {
        console.log(response.data);
        Swal.close();
        _this.title = "";
        _this.content = "";
        _this.tags = [];
        _this.image = "";

        _this.$emit("successCreate");

        Swal.fire("Good job, Success Create Article");
      }).catch(function (error) {
        var message = error.response.data && error.response.data.message || 'Failed to Create';
        Swal.fire("Error!", message, "error");
      });
    }
  }
};
exports.default = _default;
        var $3c0a6f = exports.default || module.exports;
      
      if (typeof $3c0a6f === 'function') {
        $3c0a6f = $3c0a6f.options;
      }
    
        /* template */
        Object.assign($3c0a6f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { attrs: { id: "createPost" } }, [
      _c(
        "form",
        { attrs: { action: "", enctype: "multipart/form-data" } },
        [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.title,
                expression: "title"
              }
            ],
            attrs: {
              type: "text",
              id: "postTitleInput",
              placeholder: "Your title here"
            },
            domProps: { value: _vm.title },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.title = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { id: "tagcontainer" } },
            [
              _c("vue-tags-input", {
                attrs: { id: "insidetag", tags: _vm.tags },
                on: {
                  "tags-changed": function(newTags) {
                    return (_vm.tags = newTags)
                  }
                },
                model: {
                  value: _vm.tag,
                  callback: function($$v) {
                    _vm.tag = $$v
                  },
                  expression: "tag"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "filess" }, [
            _c("input", {
              ref: "file",
              attrs: { type: "file", id: "imagepost" },
              on: {
                change: function($event) {
                  return _vm.handlefileupload($event)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("wysiwyg", {
            model: {
              value: _vm.content,
              callback: function($$v) {
                _vm.content = $$v
              },
              expression: "content"
            }
          }),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "button",
              attrs: { id: "savePost" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.saveArticle($event)
                }
              }
            },
            [_c("i", { staticClass: "fa fa-send" }), _vm._v(" Submit")]
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3c0a6f",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3c0a6f', $3c0a6f);
          } else {
            api.reload('$3c0a6f', $3c0a6f);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"@johmun/vue-tags-input":"node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/editcontent.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueTagsInput = _interopRequireDefault(require("@johmun/vue-tags-input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import wysiwyg from ""
// let baseurl = "http://localhost:3000"
var baseurl = "http://34.87.55.207";
var _default = {
  props: {
    editarticle: Object
  },
  components: {
    VueTagsInput: _vueTagsInput.default
  },
  data: function data() {
    return {
      title: "",
      content: "",
      image: "",
      tag: "",
      tags: []
    };
  },
  methods: {
    test: function test() {
      this.$emit("aa");
    },
    handlefileupload: function handlefileupload() {
      var file = event.target.files || event.dataTransfer.files;
      this.image = file[0];
    },
    editArticle: function editArticle() {
      var _this = this;

      //this.$emit("aa")
      console.log("masuk ke editarticle");
      var id = this.editarticle._id;
      var taggs = [];

      for (var i = 0; i < this.tags.length; i++) {
        taggs.push(this.tags[i].text);
      }

      console.log(taggs);
      console.log(this.image);
      var formData = new FormData();
      formData.set("featured_image", this.image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      formData.set("tagku", taggs);
      console.log("><<<<<<<<<<<<");
      console.log(formData);
      Swal.showLoading();
      axios({
        method: "PATCH",
        url: "".concat(baseurl, "/miniWp/").concat(id),
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      }).then(function (response) {
        console.log("<<<<<<<<<<<====");
        console.log(response.data);
        Swal.close();
        _this.title = "";
        _this.content = "";
        _this.tags = [];
        _this.image = "";

        _this.$emit("successEdit");

        Swal.fire("Good job, Success Edit Article");
      }).catch(function (error) {
        var message = error.response.data && error.response.data.message || 'Failed to Create';
        Swal.fire("Error!", message, "error");
      });
    }
  },
  created: function created() {
    console.log("masuk ke form edit");
    this.title = this.editarticle.title;
    this.content = this.editarticle.content;
    this.image = this.editarticle.featured_image;
    var myTag = [];

    for (var i = 0; i < this.editarticle.articletags.length; i++) {
      var tag = this.editarticle.articletags[i];
      var updateTag = {};
      updateTag.text = tag;
      myTag.push(updateTag);
    }

    console.log(myTag);
    this.tags = myTag;
  }
};
exports.default = _default;
        var $98314c = exports.default || module.exports;
      
      if (typeof $98314c === 'function') {
        $98314c = $98314c.options;
      }
    
        /* template */
        Object.assign($98314c, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { attrs: { id: "createPost" } }, [
      _c(
        "form",
        { attrs: { action: "", enctype: "multipart/form-data" } },
        [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.title,
                expression: "title"
              }
            ],
            attrs: {
              type: "text",
              id: "postTitleInput",
              placeholder: "Your title here"
            },
            domProps: { value: _vm.title },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.title = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { id: "tagcontainer" } },
            [
              _c("vue-tags-input", {
                attrs: { id: "insidetag", tags: _vm.tags },
                on: {
                  "tags-changed": function(newTags) {
                    return (_vm.tags = newTags)
                  }
                },
                model: {
                  value: _vm.tag,
                  callback: function($$v) {
                    _vm.tag = $$v
                  },
                  expression: "tag"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "filess" }, [
            _c("input", {
              ref: "file",
              attrs: { type: "file", id: "imagepost" },
              on: {
                change: function($event) {
                  return _vm.handlefileupload($event)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("wysiwyg", {
            model: {
              value: _vm.content,
              callback: function($$v) {
                _vm.content = $$v
              },
              expression: "content"
            }
          }),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "button",
              attrs: { id: "savePost" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.editArticle($event)
                }
              }
            },
            [_c("i", { staticClass: "fa fa-send" }), _vm._v(" Submit")]
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-98314c",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$98314c', $98314c);
          } else {
            api.reload('$98314c', $98314c);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"@johmun/vue-tags-input":"node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loginForm = _interopRequireDefault(require("./components/loginForm"));

var _registerForm = _interopRequireDefault(require("./components/registerForm"));

var _sidebar = _interopRequireDefault(require("./components/sidebar"));

var _navbar = _interopRequireDefault(require("./components/navbar"));

var _listcontent = _interopRequireDefault(require("./components/listcontent"));

var _createcontent = _interopRequireDefault(require("./components/createcontent"));

var _editcontent = _interopRequireDefault(require("./components/editcontent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// let baseurl = "http://localhost:3000"
var baseurl = "http://34.87.55.207";
var _default = {
  //props: ['registerprop'],
  data: function data() {
    return {
      // selectedpost :{},
      // image_wp,
      // title : "",
      // content: "",
      // email: "",
      // password: "",
      // username: "",
      createcontent: false,
      editcontent: false,
      articles: [],
      beforeLogin: true,
      register: false,
      editarticle: {},
      // loginform:true,
      // login:false,
      // clicksignin:true,
      // clickregister: false,
      // search_article: "",
      listcontent: true
    };
  },
  components: {
    loginForm: _loginForm.default,
    registerForm: _registerForm.default,
    sidebar: _sidebar.default,
    navbar: _navbar.default,
    listcontent: _listcontent.default,
    createcontent: _createcontent.default,
    editcontent: _editcontent.default
  },
  methods: {
    loggingout: function loggingout() {
      this.beforeLogin = true;
      this.register = false;
    },
    changeToHome: function changeToHome() {
      // console.log(cond)
      console.log("=================");
      console.log("masuk ke changeToHome");
      this.createcontent = false;
      this.editcontent = false;
      this.listcontent = true;
      this.fetchData();
    },
    changeToCreate: function changeToCreate() {
      this.createcontent = true;
      this.editcontent = false;
      this.listcontent = false;
    },
    changeToEdit: function changeToEdit(article) {
      console.log(article);
      this.editarticle = article;
      this.createcontent = false;
      this.editcontent = true;
      this.listcontent = false;
    },
    goToLogin: function goToLogin() {
      console.log("App masuk gotToLogin");
      this.register = false;
    },
    goToRegister: function goToRegister() {
      console.log("App masuk gotToRegister");
      this.register = true;
    },
    goToMain: function goToMain() {
      console.log("masuk ke goToMain root");
      this.beforeLogin = false; //this.fetchMyArticle()

      this.fetchData();
    },
    goEdit: function goEdit() {
      this.createcontent = false;
      this.editcontent = true;
      this.listcontent = false;
      this.fetchData();
    },
    goDelete: function goDelete() {
      console.log("mau after delete");
      this.fetchData();
    },
    fetchMyArticle: function fetchMyArticle() {
      var _this = this;

      axios({
        method: 'GET',
        url: "".concat(baseurl, "/miniWp/myArticle"),
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (response) {
        console.log(response.data);
        _this.articles = response.data;
      }).catch(function (error) {
        return console.log(error);
      });
    },
    fetchData: function fetchData() {
      var _this2 = this;

      axios({
        method: 'GET',
        url: "".concat(baseurl, "/miniWp"),
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (response) {
        console.log(response.data);
        _this2.articles = response.data;
      }).catch(function (error) {
        return console.log(error);
      });
    }
  },
  created: function created() {
    var token = localStorage.getItem("token");

    if (token) {
      this.beforeLogin = false;
      this.fetchData();
    } else {
      this.beforeLogin = true;
    }
  }
};
exports.default = _default;
        var $d2095a = exports.default || module.exports;
      
      if (typeof $d2095a === 'function') {
        $d2095a = $d2095a.options;
      }
    
        /* template */
        Object.assign($d2095a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.beforeLogin === true,
            expression: "beforeLogin === true"
          }
        ]
      },
      [
        _c("loginForm", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.register === false,
              expression: "register === false"
            }
          ],
          on: {
            changeToRegister: function($event) {
              return _vm.goToRegister()
            },
            signin: function($event) {
              return _vm.goToMain()
            },
            pageGIn: function($event) {
              return _vm.goToMain()
            }
          }
        }),
        _vm._v(" "),
        _c("registerForm", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.register === true,
              expression: "register === true"
            }
          ],
          on: {
            changeToLogin: function($event) {
              return _vm.goToLogin()
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.beforeLogin === false,
            expression: "beforeLogin === false"
          }
        ]
      },
      [
        _c("navbar", { on: { signout: _vm.loggingout } }),
        _vm._v(" "),
        _c("sidebar", {
          on: { goToHome: _vm.changeToHome, goToCreate: _vm.changeToCreate }
        }),
        _vm._v(" "),
        _vm.listcontent === true
          ? _c("listcontent", {
              attrs: { articles: _vm.articles },
              on: {
                successDelete: function($event) {
                  return _vm.goDelete()
                },
                updateFile: _vm.changeToEdit
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _c("createcontent", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.createcontent === true,
              expression: "createcontent === true"
            }
          ],
          on: { successCreate: _vm.changeToHome }
        }),
        _vm._v(" "),
        _vm.editcontent === true
          ? _c("editcontent", {
              attrs: { editarticle: _vm.editarticle },
              on: { successEdit: _vm.changeToHome, aa: _vm.changeToHome }
            })
          : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-d2095a",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$d2095a', $d2095a);
          } else {
            api.reload('$d2095a', $d2095a);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./components/loginForm":"src/components/loginForm.vue","./components/registerForm":"src/components/registerForm.vue","./components/sidebar":"src/components/sidebar.vue","./components/navbar":"src/components/navbar.vue","./components/listcontent":"src/components/listcontent.vue","./components/createcontent":"src/components/createcontent.vue","./components/editcontent":"src/components/editcontent.vue","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/vuesax/dist/vuesax.common.js":[function(require,module,exports) {
var global = arguments[3];
var define;
module.exports =
/******/
function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __webpack_require__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = "9bf4");
  /******/
}(
/************************************************************************/

/******/
{
  /***/
  "048e":
  /***/
  function (module, exports, __webpack_require__) {
    var global = __webpack_require__("9a60");

    var core = __webpack_require__("e3a0");

    var hide = __webpack_require__("59ee");

    var redefine = __webpack_require__("baca");

    var ctx = __webpack_require__("2eb4");

    var PROTOTYPE = 'prototype';

    var $export = function (type, name, source) {
      var IS_FORCED = type & $export.F;
      var IS_GLOBAL = type & $export.G;
      var IS_STATIC = type & $export.S;
      var IS_PROTO = type & $export.P;
      var IS_BIND = type & $export.B;
      var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
      var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
      var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
      var key, own, out, exp;
      if (IS_GLOBAL) source = name;

      for (key in source) {
        // contains in native
        own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

        out = (own ? target : source)[key]; // bind timers to global for call from export context

        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // extend global

        if (target) redefine(target, key, out, type & $export.U); // export

        if (exports[key] != out) hide(exports, key, exp);
        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
      }
    };

    global.core = core; // type bitmap

    $export.F = 1; // forced

    $export.G = 2; // global

    $export.S = 4; // static

    $export.P = 8; // proto

    $export.B = 16; // bind

    $export.W = 32; // wrap

    $export.U = 64; // safe

    $export.R = 128; // real proto method for `library`

    module.exports = $export;
    /***/
  },

  /***/
  "0666":
  /***/
  function (module, exports, __webpack_require__) {
    // 7.1.1 ToPrimitive(input [, PreferredType])
    var isObject = __webpack_require__("1d2f"); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string


    module.exports = function (it, S) {
      if (!isObject(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };
    /***/

  },

  /***/
  "099f":
  /***/
  function (module, exports, __webpack_require__) {
    // 7.1.13 ToObject(argument)
    var defined = __webpack_require__("50c4");

    module.exports = function (it) {
      return Object(defined(it));
    };
    /***/

  },

  /***/
  "0bb9":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var global = __webpack_require__("9a60");

    var has = __webpack_require__("571a");

    var cof = __webpack_require__("ebbd");

    var inheritIfRequired = __webpack_require__("be76");

    var toPrimitive = __webpack_require__("0666");

    var fails = __webpack_require__("c213");

    var gOPN = __webpack_require__("3402").f;

    var gOPD = __webpack_require__("0f2e").f;

    var dP = __webpack_require__("d528").f;

    var $trim = __webpack_require__("7bee").trim;

    var NUMBER = 'Number';
    var $Number = global[NUMBER];
    var Base = $Number;
    var proto = $Number.prototype; // Opera ~12 has broken Object#toString

    var BROKEN_COF = cof(__webpack_require__("aecc")(proto)) == NUMBER;
    var TRIM = 'trim' in String.prototype; // 7.1.3 ToNumber(argument)

    var toNumber = function (argument) {
      var it = toPrimitive(argument, false);

      if (typeof it == 'string' && it.length > 2) {
        it = TRIM ? it.trim() : $trim(it, 3);
        var first = it.charCodeAt(0);
        var third, radix, maxCode;

        if (first === 43 || first === 45) {
          third = it.charCodeAt(2);
          if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
        } else if (first === 48) {
          switch (it.charCodeAt(1)) {
            case 66:
            case 98:
              radix = 2;
              maxCode = 49;
              break;
            // fast equal /^0b[01]+$/i

            case 79:
            case 111:
              radix = 8;
              maxCode = 55;
              break;
            // fast equal /^0o[0-7]+$/i

            default:
              return +it;
          }

          for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
            code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
            // but ToNumber should return NaN if a string contains unavailable symbols

            if (code < 48 || code > maxCode) return NaN;
          }

          return parseInt(digits, radix);
        }
      }

      return +it;
    };

    if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
      $Number = function Number(value) {
        var it = arguments.length < 1 ? 0 : value;
        var that = this;
        return that instanceof $Number // check on 1..constructor(foo) case
        && (BROKEN_COF ? fails(function () {
          proto.valueOf.call(that);
        }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
      };

      for (var keys = __webpack_require__("9baa") ? gOPN(Base) : ( // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
        if (has(Base, key = keys[j]) && !has($Number, key)) {
          dP($Number, key, gOPD(Base, key));
        }
      }

      $Number.prototype = proto;
      proto.constructor = $Number;

      __webpack_require__("baca")(global, NUMBER, $Number);
    }
    /***/

  },

  /***/
  "0d98":
  /***/
  function (module, exports) {
    // IE 8- don't enum bug keys
    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
    /***/
  },

  /***/
  "0dd6":
  /***/
  function (module, exports) {
    // document.currentScript polyfill by Adam Miller
    // MIT license
    (function (document) {
      var currentScript = "currentScript",
          scripts = document.getElementsByTagName('script'); // Live NodeList collection
      // If browser needs currentScript polyfill, add get currentScript() to the document object

      if (!(currentScript in document)) {
        Object.defineProperty(document, currentScript, {
          get: function () {
            // IE 6-10 supports script readyState
            // IE 10+ support stack trace
            try {
              throw new Error();
            } catch (err) {
              // Find the second match for the "at" string to get file src url from stack.
              // Specifically works with the format of stack traces in IE.
              var i,
                  res = (/.*at [^\(]*\((.*):.+:.+\)$/ig.exec(err.stack) || [false])[1]; // For all scripts on the page, if src matches or if ready state is interactive, return the script tag

              for (i in scripts) {
                if (scripts[i].src == res || scripts[i].readyState == "interactive") {
                  return scripts[i];
                }
              } // If no match, return null


              return null;
            }
          }
        });
      }
    })(document);
    /***/

  },

  /***/
  "0e7a":
  /***/
  function (module, exports, __webpack_require__) {
    var getKeys = __webpack_require__("98b7");

    var toIObject = __webpack_require__("96da");

    var isEnum = __webpack_require__("45aa").f;

    module.exports = function (isEntries) {
      return function (it) {
        var O = toIObject(it);
        var keys = getKeys(O);
        var length = keys.length;
        var i = 0;
        var result = [];
        var key;

        while (length > i) if (isEnum.call(O, key = keys[i++])) {
          result.push(isEntries ? [key, O[key]] : O[key]);
        }

        return result;
      };
    };
    /***/

  },

  /***/
  "0f2e":
  /***/
  function (module, exports, __webpack_require__) {
    var pIE = __webpack_require__("45aa");

    var createDesc = __webpack_require__("b7f6");

    var toIObject = __webpack_require__("96da");

    var toPrimitive = __webpack_require__("0666");

    var has = __webpack_require__("571a");

    var IE8_DOM_DEFINE = __webpack_require__("baa3");

    var gOPD = Object.getOwnPropertyDescriptor;
    exports.f = __webpack_require__("9baa") ? gOPD : function getOwnPropertyDescriptor(O, P) {
      O = toIObject(O);
      P = toPrimitive(P, true);
      if (IE8_DOM_DEFINE) try {
        return gOPD(O, P);
      } catch (e) {
        /* empty */
      }
      if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
    /***/
  },

  /***/
  "11db":
  /***/
  function (module, exports) {
    // 20.2.2.28 Math.sign(x)
    module.exports = Math.sign || function sign(x) {
      // eslint-disable-next-line no-self-compare
      return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
    };
    /***/

  },

  /***/
  "1707":
  /***/
  function (module, exports, __webpack_require__) {
    var ITERATOR = __webpack_require__("24aa")('iterator');

    var SAFE_CLOSING = false;

    try {
      var riter = [7][ITERATOR]();

      riter['return'] = function () {
        SAFE_CLOSING = true;
      }; // eslint-disable-next-line no-throw-literal


      Array.from(riter, function () {
        throw 2;
      });
    } catch (e) {
      /* empty */
    }

    module.exports = function (exec, skipClosing) {
      if (!skipClosing && !SAFE_CLOSING) return false;
      var safe = false;

      try {
        var arr = [7];
        var iter = arr[ITERATOR]();

        iter.next = function () {
          return {
            done: safe = true
          };
        };

        arr[ITERATOR] = function () {
          return iter;
        };

        exec(arr);
      } catch (e) {
        /* empty */
      }

      return safe;
    };
    /***/

  },

  /***/
  "1797":
  /***/
  function (module, exports, __webpack_require__) {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    var has = __webpack_require__("571a");

    var toObject = __webpack_require__("099f");

    var IE_PROTO = __webpack_require__("8629")('IE_PROTO');

    var ObjectProto = Object.prototype;

    module.exports = Object.getPrototypeOf || function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO)) return O[IE_PROTO];

      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }

      return O instanceof Object ? ObjectProto : null;
    };
    /***/

  },

  /***/
  "1850":
  /***/
  function (module, exports, __webpack_require__) {
    var MATCH = __webpack_require__("24aa")('match');

    module.exports = function (KEY) {
      var re = /./;

      try {
        '/./'[KEY](re);
      } catch (e) {
        try {
          re[MATCH] = false;
          return !'/./'[KEY](re);
        } catch (f) {
          /* empty */
        }
      }

      return true;
    };
    /***/

  },

  /***/
  "1ab8":
  /***/
  function (module, exports, __webpack_require__) {
    var $iterators = __webpack_require__("db1a");

    var getKeys = __webpack_require__("98b7");

    var redefine = __webpack_require__("baca");

    var global = __webpack_require__("9a60");

    var hide = __webpack_require__("59ee");

    var Iterators = __webpack_require__("45bf");

    var wks = __webpack_require__("24aa");

    var ITERATOR = wks('iterator');
    var TO_STRING_TAG = wks('toStringTag');
    var ArrayValues = Iterators.Array;
    var DOMIterables = {
      CSSRuleList: true,
      // TODO: Not spec compliant, should be false.
      CSSStyleDeclaration: false,
      CSSValueList: false,
      ClientRectList: false,
      DOMRectList: false,
      DOMStringList: false,
      DOMTokenList: true,
      DataTransferItemList: false,
      FileList: false,
      HTMLAllCollection: false,
      HTMLCollection: false,
      HTMLFormElement: false,
      HTMLSelectElement: false,
      MediaList: true,
      // TODO: Not spec compliant, should be false.
      MimeTypeArray: false,
      NamedNodeMap: false,
      NodeList: true,
      PaintRequestList: false,
      Plugin: false,
      PluginArray: false,
      SVGLengthList: false,
      SVGNumberList: false,
      SVGPathSegList: false,
      SVGPointList: false,
      SVGStringList: false,
      SVGTransformList: false,
      SourceBufferList: false,
      StyleSheetList: true,
      // TODO: Not spec compliant, should be false.
      TextTrackCueList: false,
      TextTrackList: false,
      TouchList: false
    };

    for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
      var NAME = collections[i];
      var explicit = DOMIterables[NAME];
      var Collection = global[NAME];
      var proto = Collection && Collection.prototype;
      var key;

      if (proto) {
        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = ArrayValues;
        if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
      }
    }
    /***/

  },

  /***/
  "1c96":
  /***/
  function (module, exports, __webpack_require__) {// extracted by mini-css-extract-plugin

    /***/
  },

  /***/
  "1d2f":
  /***/
  function (module, exports) {
    module.exports = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };
    /***/

  },

  /***/
  "2004":
  /***/
  function (module, exports) {
    module.exports = function (it) {
      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
      return it;
    };
    /***/

  },

  /***/
  "2436":
  /***/
  function (module, exports, __webpack_require__) {
    var dP = __webpack_require__("d528");

    var anObject = __webpack_require__("3fa7");

    var getKeys = __webpack_require__("98b7");

    module.exports = __webpack_require__("9baa") ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = getKeys(Properties);
      var length = keys.length;
      var i = 0;
      var P;

      while (length > i) dP.f(O, P = keys[i++], Properties[P]);

      return O;
    };
    /***/
  },

  /***/
  "24aa":
  /***/
  function (module, exports, __webpack_require__) {
    var store = __webpack_require__("6ae5")('wks');

    var uid = __webpack_require__("329e");

    var Symbol = __webpack_require__("9a60").Symbol;

    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
    };

    $exports.store = store;
    /***/
  },

  /***/
  "2583":
  /***/
  function (module, exports, __webpack_require__) {
    // 22.1.3.31 Array.prototype[@@unscopables]
    var UNSCOPABLES = __webpack_require__("24aa")('unscopables');

    var ArrayProto = Array.prototype;
    if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("59ee")(ArrayProto, UNSCOPABLES, {});

    module.exports = function (key) {
      ArrayProto[UNSCOPABLES][key] = true;
    };
    /***/

  },

  /***/
  "26f8":
  /***/
  function (module, exports, __webpack_require__) {
    // getting tag from 19.1.3.6 Object.prototype.toString()
    var cof = __webpack_require__("ebbd");

    var TAG = __webpack_require__("24aa")('toStringTag'); // ES3 wrong here


    var ARG = cof(function () {
      return arguments;
    }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (e) {
        /* empty */
      }
    };

    module.exports = function (it) {
      var O, T, B;
      return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
      : ARG ? cof(O) // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
    /***/

  },

  /***/
  "2eb4":
  /***/
  function (module, exports, __webpack_require__) {
    // optional / simple context binding
    var aFunction = __webpack_require__("2004");

    module.exports = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;

      switch (length) {
        case 1:
          return function (a) {
            return fn.call(that, a);
          };

        case 2:
          return function (a, b) {
            return fn.call(that, a, b);
          };

        case 3:
          return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
      }

      return function ()
      /* ...args */
      {
        return fn.apply(that, arguments);
      };
    };
    /***/

  },

  /***/
  "2ee2":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict"; // B.2.3.6 String.prototype.fixed()

    __webpack_require__("f549")('fixed', function (createHTML) {
      return function fixed() {
        return createHTML(this, 'tt', '', '');
      };
    });
    /***/

  },

  /***/
  "2f50":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var regexpExec = __webpack_require__("adaf");

    __webpack_require__("048e")({
      target: 'RegExp',
      proto: true,
      forced: regexpExec !== /./.exec
    }, {
      exec: regexpExec
    });
    /***/

  },

  /***/
  "3136":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var $at = __webpack_require__("730c")(true); // 21.1.3.27 String.prototype[@@iterator]()


    __webpack_require__("9884")(String, 'String', function (iterated) {
      this._t = String(iterated); // target

      this._i = 0; // next index
      // 21.1.5.2.1 %StringIteratorPrototype%.next()
    }, function () {
      var O = this._t;
      var index = this._i;
      var point;
      if (index >= O.length) return {
        value: undefined,
        done: true
      };
      point = $at(O, index);
      this._i += point.length;
      return {
        value: point,
        done: false
      };
    });
    /***/

  },

  /***/
  "329e":
  /***/
  function (module, exports) {
    var id = 0;
    var px = Math.random();

    module.exports = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };
    /***/

  },

  /***/
  "3402":
  /***/
  function (module, exports, __webpack_require__) {
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    var $keys = __webpack_require__("dcf5");

    var hiddenKeys = __webpack_require__("0d98").concat('length', 'prototype');

    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return $keys(O, hiddenKeys);
    };
    /***/

  },

  /***/
  "341c":
  /***/
  function (module, exports, __webpack_require__) {
    // 7.2.8 IsRegExp(argument)
    var isObject = __webpack_require__("1d2f");

    var cof = __webpack_require__("ebbd");

    var MATCH = __webpack_require__("24aa")('match');

    module.exports = function (it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
    };
    /***/

  },

  /***/
  "356a":
  /***/
  function (module, exports, __webpack_require__) {
    var dP = __webpack_require__("d528").f;

    var FProto = Function.prototype;
    var nameRE = /^\s*function ([^ (]*)/;
    var NAME = 'name'; // 19.2.4.2 name

    NAME in FProto || __webpack_require__("9baa") && dP(FProto, NAME, {
      configurable: true,
      get: function () {
        try {
          return ('' + this).match(nameRE)[1];
        } catch (e) {
          return '';
        }
      }
    });
    /***/
  },

  /***/
  "38fd":
  /***/
  function (module, exports, __webpack_require__) {
    // 7.1.15 ToLength
    var toInteger = __webpack_require__("d35e");

    var min = Math.min;

    module.exports = function (it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };
    /***/

  },

  /***/
  "3db9":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var create = __webpack_require__("aecc");

    var descriptor = __webpack_require__("b7f6");

    var setToStringTag = __webpack_require__("a602");

    var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

    __webpack_require__("59ee")(IteratorPrototype, __webpack_require__("24aa")('iterator'), function () {
      return this;
    });

    module.exports = function (Constructor, NAME, next) {
      Constructor.prototype = create(IteratorPrototype, {
        next: descriptor(1, next)
      });
      setToStringTag(Constructor, NAME + ' Iterator');
    };
    /***/

  },

  /***/
  "3fa7":
  /***/
  function (module, exports, __webpack_require__) {
    var isObject = __webpack_require__("1d2f");

    module.exports = function (it) {
      if (!isObject(it)) throw TypeError(it + ' is not an object!');
      return it;
    };
    /***/

  },

  /***/
  "45aa":
  /***/
  function (module, exports) {
    exports.f = {}.propertyIsEnumerable;
    /***/
  },

  /***/
  "45bf":
  /***/
  function (module, exports) {
    module.exports = {};
    /***/
  },

  /***/
  "45dc":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict"; // 21.2.5.3 get RegExp.prototype.flags

    var anObject = __webpack_require__("3fa7");

    module.exports = function () {
      var that = anObject(this);
      var result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };
    /***/

  },

  /***/
  "4811":
  /***/
  function (module, exports, __webpack_require__) {
    var classof = __webpack_require__("26f8");

    var ITERATOR = __webpack_require__("24aa")('iterator');

    var Iterators = __webpack_require__("45bf");

    module.exports = __webpack_require__("e3a0").getIteratorMethod = function (it) {
      if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
    /***/

  },

  /***/
  "4a0d":
  /***/
  function (module, exports, __webpack_require__) {
    var global = __webpack_require__("9a60");

    var inheritIfRequired = __webpack_require__("be76");

    var dP = __webpack_require__("d528").f;

    var gOPN = __webpack_require__("3402").f;

    var isRegExp = __webpack_require__("341c");

    var $flags = __webpack_require__("45dc");

    var $RegExp = global.RegExp;
    var Base = $RegExp;
    var proto = $RegExp.prototype;
    var re1 = /a/g;
    var re2 = /a/g; // "new" creates a new object, old webkit buggy here

    var CORRECT_NEW = new $RegExp(re1) !== re1;

    if (__webpack_require__("9baa") && (!CORRECT_NEW || __webpack_require__("c213")(function () {
      re2[__webpack_require__("24aa")('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

      return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
    }))) {
      $RegExp = function RegExp(p, f) {
        var tiRE = this instanceof $RegExp;
        var piRE = isRegExp(p);
        var fiU = f === undefined;
        return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
      };

      var proxy = function (key) {
        key in $RegExp || dP($RegExp, key, {
          configurable: true,
          get: function () {
            return Base[key];
          },
          set: function (it) {
            Base[key] = it;
          }
        });
      };

      for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);

      proto.constructor = $RegExp;
      $RegExp.prototype = proto;

      __webpack_require__("baca")(global, 'RegExp', $RegExp);
    }

    __webpack_require__("8465")('RegExp');
    /***/

  },

  /***/
  "4e8e":
  /***/
  function (module, exports, __webpack_require__) {
    // check on default Array iterator
    var Iterators = __webpack_require__("45bf");

    var ITERATOR = __webpack_require__("24aa")('iterator');

    var ArrayProto = Array.prototype;

    module.exports = function (it) {
      return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
    /***/

  },

  /***/
  "4eb1":
  /***/
  function (module, exports, __webpack_require__) {
    // 7.3.20 SpeciesConstructor(O, defaultConstructor)
    var anObject = __webpack_require__("3fa7");

    var aFunction = __webpack_require__("2004");

    var SPECIES = __webpack_require__("24aa")('species');

    module.exports = function (O, D) {
      var C = anObject(O).constructor;
      var S;
      return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
    };
    /***/

  },

  /***/
  "50c4":
  /***/
  function (module, exports) {
    // 7.2.1 RequireObjectCoercible(argument)
    module.exports = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };
    /***/

  },

  /***/
  "571a":
  /***/
  function (module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;

    module.exports = function (it, key) {
      return hasOwnProperty.call(it, key);
    };
    /***/

  },

  /***/
  "59ee":
  /***/
  function (module, exports, __webpack_require__) {
    var dP = __webpack_require__("d528");

    var createDesc = __webpack_require__("b7f6");

    module.exports = __webpack_require__("9baa") ? function (object, key, value) {
      return dP.f(object, key, createDesc(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };
    /***/
  },

  /***/
  "5b58":
  /***/
  function (module, exports, __webpack_require__) {
    // 21.2.5.3 get RegExp.prototype.flags()
    if (__webpack_require__("9baa") && /./g.flags != 'g') __webpack_require__("d528").f(RegExp.prototype, 'flags', {
      configurable: true,
      get: __webpack_require__("45dc")
    });
    /***/
  },

  /***/
  "5df1":
  /***/
  function (module, exports, __webpack_require__) {
    // most Object methods by ES6 should accept primitives
    var $export = __webpack_require__("048e");

    var core = __webpack_require__("e3a0");

    var fails = __webpack_require__("c213");

    module.exports = function (KEY, exec) {
      var fn = (core.Object || {})[KEY] || Object[KEY];
      var exp = {};
      exp[KEY] = exec(fn);
      $export($export.S + $export.F * fails(function () {
        fn(1);
      }), 'Object', exp);
    };
    /***/

  },

  /***/
  "696d":
  /***/
  function (module, exports, __webpack_require__) {
    // 20.2.2.28 Math.sign(x)
    var $export = __webpack_require__("048e");

    $export($export.S, 'Math', {
      sign: __webpack_require__("11db")
    });
    /***/
  },

  /***/
  "6ae5":
  /***/
  function (module, exports, __webpack_require__) {
    var core = __webpack_require__("e3a0");

    var global = __webpack_require__("9a60");

    var SHARED = '__core-js_shared__';
    var store = global[SHARED] || (global[SHARED] = {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: core.version,
      mode: __webpack_require__("d3ae") ? 'pure' : 'global',
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
    /***/
  },

  /***/
  "6e24":
  /***/
  function (module, exports, __webpack_require__) {
    var isObject = __webpack_require__("1d2f");

    var isArray = __webpack_require__("e2c8");

    var SPECIES = __webpack_require__("24aa")('species');

    module.exports = function (original) {
      var C;

      if (isArray(original)) {
        C = original.constructor; // cross-realm fallback

        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;

        if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      }

      return C === undefined ? Array : C;
    };
    /***/

  },

  /***/
  "730c":
  /***/
  function (module, exports, __webpack_require__) {
    var toInteger = __webpack_require__("d35e");

    var defined = __webpack_require__("50c4"); // true  -> String#at
    // false -> String#codePointAt


    module.exports = function (TO_STRING) {
      return function (that, pos) {
        var s = String(defined(that));
        var i = toInteger(pos);
        var l = s.length;
        var a, b;
        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
      };
    };
    /***/

  },

  /***/
  "7527":
  /***/
  function (module, exports, __webpack_require__) {
    var toInteger = __webpack_require__("d35e");

    var max = Math.max;
    var min = Math.min;

    module.exports = function (index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    };
    /***/

  },

  /***/
  "78c7":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var at = __webpack_require__("730c")(true); // `AdvanceStringIndex` abstract operation
    // https://tc39.github.io/ecma262/#sec-advancestringindex


    module.exports = function (S, index, unicode) {
      return index + (unicode ? at(S, index).length : 1);
    };
    /***/

  },

  /***/
  "7b53":
  /***/
  function (module, exports, __webpack_require__) {
    // 0 -> Array#forEach
    // 1 -> Array#map
    // 2 -> Array#filter
    // 3 -> Array#some
    // 4 -> Array#every
    // 5 -> Array#find
    // 6 -> Array#findIndex
    var ctx = __webpack_require__("2eb4");

    var IObject = __webpack_require__("b1b7");

    var toObject = __webpack_require__("099f");

    var toLength = __webpack_require__("38fd");

    var asc = __webpack_require__("dede");

    module.exports = function (TYPE, $create) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      var create = $create || asc;
      return function ($this, callbackfn, that) {
        var O = toObject($this);
        var self = IObject(O);
        var f = ctx(callbackfn, that, 3);
        var length = toLength(self.length);
        var index = 0;
        var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
        var val, res;

        for (; length > index; index++) if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);

          if (TYPE) {
            if (IS_MAP) result[index] = res; // map
            else if (res) switch (TYPE) {
                case 3:
                  return true;
                // some

                case 5:
                  return val;
                // find

                case 6:
                  return index;
                // findIndex

                case 2:
                  result.push(val);
                // filter
              } else if (IS_EVERY) return false; // every
          }
        }

        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
      };
    };
    /***/

  },

  /***/
  "7bee":
  /***/
  function (module, exports, __webpack_require__) {
    var $export = __webpack_require__("048e");

    var defined = __webpack_require__("50c4");

    var fails = __webpack_require__("c213");

    var spaces = __webpack_require__("a0f5");

    var space = '[' + spaces + ']';
    var non = '\u200b\u0085';
    var ltrim = RegExp('^' + space + space + '*');
    var rtrim = RegExp(space + space + '*$');

    var exporter = function (KEY, exec, ALIAS) {
      var exp = {};
      var FORCE = fails(function () {
        return !!spaces[KEY]() || non[KEY]() != non;
      });
      var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
      if (ALIAS) exp[ALIAS] = fn;
      $export($export.P + $export.F * FORCE, 'String', exp);
    }; // 1 -> String#trimLeft
    // 2 -> String#trimRight
    // 3 -> String#trim


    var trim = exporter.trim = function (string, TYPE) {
      string = String(defined(string));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };

    module.exports = exporter;
    /***/
  },

  /***/
  "8465":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var global = __webpack_require__("9a60");

    var dP = __webpack_require__("d528");

    var DESCRIPTORS = __webpack_require__("9baa");

    var SPECIES = __webpack_require__("24aa")('species');

    module.exports = function (KEY) {
      var C = global[KEY];
      if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    };
    /***/

  },

  /***/
  "8549":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict"; // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

    var $export = __webpack_require__("048e");

    var $find = __webpack_require__("7b53")(5);

    var KEY = 'find';
    var forced = true; // Shouldn't skip holes

    if (KEY in []) Array(1)[KEY](function () {
      forced = false;
    });
    $export($export.P + $export.F * forced, 'Array', {
      find: function find(callbackfn
      /* , that = undefined */
      ) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    __webpack_require__("2583")(KEY);
    /***/

  },

  /***/
  "8629":
  /***/
  function (module, exports, __webpack_require__) {
    var shared = __webpack_require__("6ae5")('keys');

    var uid = __webpack_require__("329e");

    module.exports = function (key) {
      return shared[key] || (shared[key] = uid(key));
    };
    /***/

  },

  /***/
  "8a9b":
  /***/
  function (module, exports, __webpack_require__) {
    // helper for String#{startsWith, endsWith, includes}
    var isRegExp = __webpack_require__("341c");

    var defined = __webpack_require__("50c4");

    module.exports = function (that, searchString, NAME) {
      if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
      return String(defined(that));
    };
    /***/

  },

  /***/
  "8b23":
  /***/
  function (module, exports, __webpack_require__) {
    // https://github.com/tc39/proposal-object-values-entries
    var $export = __webpack_require__("048e");

    var $values = __webpack_require__("0e7a")(false);

    $export($export.S, 'Object', {
      values: function values(it) {
        return $values(it);
      }
    });
    /***/
  },

  /***/
  "8bbf":
  /***/
  function (module, exports) {
    module.exports = require("vue");
    /***/
  },

  /***/
  "8c9d":
  /***/
  function (module, exports, __webpack_require__) {
    var isObject = __webpack_require__("1d2f");

    var document = __webpack_require__("9a60").document; // typeof document.createElement is 'object' in old IE


    var is = isObject(document) && isObject(document.createElement);

    module.exports = function (it) {
      return is ? document.createElement(it) : {};
    };
    /***/

  },

  /***/
  "96da":
  /***/
  function (module, exports, __webpack_require__) {
    // to indexed object, toObject with fallback for non-array-like ES3 strings
    var IObject = __webpack_require__("b1b7");

    var defined = __webpack_require__("50c4");

    module.exports = function (it) {
      return IObject(defined(it));
    };
    /***/

  },

  /***/
  "9884":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var LIBRARY = __webpack_require__("d3ae");

    var $export = __webpack_require__("048e");

    var redefine = __webpack_require__("baca");

    var hide = __webpack_require__("59ee");

    var Iterators = __webpack_require__("45bf");

    var $iterCreate = __webpack_require__("3db9");

    var setToStringTag = __webpack_require__("a602");

    var getPrototypeOf = __webpack_require__("1797");

    var ITERATOR = __webpack_require__("24aa")('iterator');

    var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

    var FF_ITERATOR = '@@iterator';
    var KEYS = 'keys';
    var VALUES = 'values';

    var returnThis = function () {
      return this;
    };

    module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
      $iterCreate(Constructor, NAME, next);

      var getMethod = function (kind) {
        if (!BUGGY && kind in proto) return proto[kind];

        switch (kind) {
          case KEYS:
            return function keys() {
              return new Constructor(this, kind);
            };

          case VALUES:
            return function values() {
              return new Constructor(this, kind);
            };
        }

        return function entries() {
          return new Constructor(this, kind);
        };
      };

      var TAG = NAME + ' Iterator';
      var DEF_VALUES = DEFAULT == VALUES;
      var VALUES_BUG = false;
      var proto = Base.prototype;
      var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
      var $default = $native || getMethod(DEFAULT);
      var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
      var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
      var methods, key, IteratorPrototype; // Fix native

      if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));

        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
          // Set @@toStringTag to native iterators
          setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

          if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
        }
      } // fix Array#{values, @@iterator}.name in V8 / FF


      if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;

        $default = function values() {
          return $native.call(this);
        };
      } // Define iterator


      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        hide(proto, ITERATOR, $default);
      } // Plug for library


      Iterators[NAME] = $default;
      Iterators[TAG] = returnThis;

      if (DEFAULT) {
        methods = {
          values: DEF_VALUES ? $default : getMethod(VALUES),
          keys: IS_SET ? $default : getMethod(KEYS),
          entries: $entries
        };
        if (FORCED) for (key in methods) {
          if (!(key in proto)) redefine(proto, key, methods[key]);
        } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
      }

      return methods;
    };
    /***/

  },

  /***/
  "98b7":
  /***/
  function (module, exports, __webpack_require__) {
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    var $keys = __webpack_require__("dcf5");

    var enumBugKeys = __webpack_require__("0d98");

    module.exports = Object.keys || function keys(O) {
      return $keys(O, enumBugKeys);
    };
    /***/

  },

  /***/
  "99c0":
  /***/
  function (module, exports, __webpack_require__) {// extracted by mini-css-extract-plugin

    /***/
  },

  /***/
  "9a60":
  /***/
  function (module, exports) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

    /***/
  },

  /***/
  "9baa":
  /***/
  function (module, exports, __webpack_require__) {
    // Thank's IE8 for his funny defineProperty
    module.exports = !__webpack_require__("c213")(function () {
      return Object.defineProperty({}, 'a', {
        get: function () {
          return 7;
        }
      }).a != 7;
    });
    /***/
  },

  /***/
  "9bf4":
  /***/
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);

    var components_namespaceObject = {};

    __webpack_require__.r(components_namespaceObject);

    __webpack_require__.d(components_namespaceObject, "vsButton", function () {
      return components_vsButton;
    });

    __webpack_require__.d(components_namespaceObject, "vsSelect", function () {
      return components_vsSelect;
    });

    __webpack_require__.d(components_namespaceObject, "vsSwitch", function () {
      return components_vsSwitch;
    });

    __webpack_require__.d(components_namespaceObject, "vsCheckbox", function () {
      return components_vsCheckBox;
    });

    __webpack_require__.d(components_namespaceObject, "vsRadio", function () {
      return components_vsRadio;
    });

    __webpack_require__.d(components_namespaceObject, "vsInput", function () {
      return components_vsInput;
    });

    __webpack_require__.d(components_namespaceObject, "vsTabs", function () {
      return components_vsTabs;
    });

    __webpack_require__.d(components_namespaceObject, "vsSlider", function () {
      return components_vsSlider;
    });

    __webpack_require__.d(components_namespaceObject, "vsInputNumber", function () {
      return components_vsInputNumber;
    });

    __webpack_require__.d(components_namespaceObject, "vsTooltip", function () {
      return components_vsTooltip;
    });

    __webpack_require__.d(components_namespaceObject, "vsUpload", function () {
      return components_vsUpload;
    });

    __webpack_require__.d(components_namespaceObject, "vsPopup", function () {
      return components_vsPopup;
    });

    __webpack_require__.d(components_namespaceObject, "vsAlert", function () {
      return components_vsAlert;
    });

    __webpack_require__.d(components_namespaceObject, "vsChip", function () {
      return components_vsChip;
    });

    __webpack_require__.d(components_namespaceObject, "vsProgress", function () {
      return components_vsProgress;
    });

    __webpack_require__.d(components_namespaceObject, "vsCard", function () {
      return components_vsCard;
    });

    __webpack_require__.d(components_namespaceObject, "vsList", function () {
      return components_vsList;
    });

    __webpack_require__.d(components_namespaceObject, "vsAvatar", function () {
      return components_vsAvatar;
    });

    __webpack_require__.d(components_namespaceObject, "vsPagination", function () {
      return components_vsPagination;
    });

    __webpack_require__.d(components_namespaceObject, "vsBreadcrumb", function () {
      return components_vsBreadcrumb;
    });

    __webpack_require__.d(components_namespaceObject, "vsPrompt", function () {
      return vsPrompt;
    });

    __webpack_require__.d(components_namespaceObject, "vsDivider", function () {
      return components_vsDivider;
    });

    __webpack_require__.d(components_namespaceObject, "vsSpacer", function () {
      return components_vsSpacer;
    });

    __webpack_require__.d(components_namespaceObject, "vsIcon", function () {
      return components_vsIcon;
    });

    __webpack_require__.d(components_namespaceObject, "vsNavbar", function () {
      return components_vsNavbar;
    });

    __webpack_require__.d(components_namespaceObject, "vsSideBar", function () {
      return vsSideBar;
    });

    __webpack_require__.d(components_namespaceObject, "vsDropDown", function () {
      return components_vsDropDown;
    });

    __webpack_require__.d(components_namespaceObject, "vsTable", function () {
      return components_vsTable;
    });

    __webpack_require__.d(components_namespaceObject, "vsTextarea", function () {
      return components_vsTextarea;
    });

    __webpack_require__.d(components_namespaceObject, "vsCollapse", function () {
      return components_vsCollapse;
    });

    __webpack_require__.d(components_namespaceObject, "vsImages", function () {
      return components_vsImages;
    });

    __webpack_require__.d(components_namespaceObject, "vsRow", function () {
      return layout_vsRow;
    });

    __webpack_require__.d(components_namespaceObject, "vsCol", function () {
      return layout_vsCol;
    }); // CONCATENATED MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
    // This file is imported into lib/wc client bundles.


    if (typeof window !== 'undefined') {
      if (true) {
        __webpack_require__("0dd6");
      }

      var setPublicPath_i;

      if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
        __webpack_require__.p = setPublicPath_i[1]; // eslint-disable-line
      }
    } // Indicate to webpack that this file can be concatenated

    /* harmony default export */


    var setPublicPath = null; // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.array.iterator.js

    var es6_array_iterator = __webpack_require__("db1a"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es7.object.values.js


    var es7_object_values = __webpack_require__("8b23"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/web.dom.iterable.js


    var web_dom_iterable = __webpack_require__("1ab8"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.function.name.js


    var es6_function_name = __webpack_require__("356a"); // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsButton/vsButton.vue?vue&type=template&id=74000496&lang=html&


    var render = function () {
      var _obj;

      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('button', _vm._g(_vm._b({
        ref: "btn",
        staticClass: "vs-component vs-button",
        class: ["vs-button-" + (_vm.isColor() ? _vm.color : null), "vs-button-" + _vm.type, {
          'isActive': _vm.isActive,
          'includeIcon': _vm.icon,
          'includeIconOnly': _vm.icon && !_vm.$slots.default,
          'vs-radius': _vm.radius
        }, _vm.size],
        style: [_vm.styles, {
          'width': /[px]/.test(_vm.size) ? "" + _vm.size : null,
          'height': /[px]/.test(_vm.size) ? "" + _vm.size : null
        }],
        attrs: {
          "type": _vm.button,
          "name": "button"
        }
      }, 'button', _vm.$attrs, false), _vm.listeners), [!_vm.is('line') && !_vm.is('gradient') && !_vm.is('relief') ? _c('span', {
        ref: "backgroundx",
        staticClass: "vs-button-backgroundx vs-button--background",
        style: _vm.stylesBackGround
      }) : _vm._e(), _vm.icon ? _c('vs-icon', {
        staticClass: "vs-button--icon ",
        style: (_obj = {
          'order': _vm.iconAfter ? 2 : 0
        }, _obj['margin-' + _vm.isRTL('left')] = _vm.$slots.default && !_vm.iconAfter ? '5px' : '0px', _obj['margin-' + _vm.isRTL('right')] = _vm.$slots.default && _vm.iconAfter ? '5px' : '0px', _obj),
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      }) : _vm._e(), _vm.$slots.default ? _c('span', {
        staticClass: "vs-button-text vs-button--text"
      }, [_vm._t("default")], 2) : _vm._e(), _c('span', {
        ref: "linex",
        staticClass: "vs-button-linex",
        style: _vm.styleLine
      })], 1);
    };

    var staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsButton/vsButton.vue?vue&type=template&id=74000496&lang=html&
    // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js


    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }

        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }

      return target;
    } // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es7.array.includes.js


    var es7_array_includes = __webpack_require__("d3fe"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.regexp.replace.js


    var es6_regexp_replace = __webpack_require__("dad7"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.regexp.search.js


    var es6_regexp_search = __webpack_require__("fa13"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.regexp.split.js


    var es6_regexp_split = __webpack_require__("ad0e"); // CONCATENATED MODULE: ./src/utils/color.js

    /* harmony default export */


    var utils_color = {
      darken: function darken(color, percent) {
        var f = color.split(","),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = parseInt(f[0].slice(4)),
            G = parseInt(f[1]),
            B = parseInt(f[2]);
        return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
      },
      getColor: function getColor(colorx) {
        var alphax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var defaultx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true; // change color hex to RGB

        if (/^[#]/.test(colorx)) {
          var c = this.hexToRgb(colorx);

          if (alphax == 1) {
            colorx = "rgb(".concat(c.r, ",").concat(c.g, ",").concat(c.b, ")");
          } else {
            colorx = "rgba(".concat(c.r, ",").concat(c.g, ",").concat(c.b, ",").concat(alphax, ")");
          }
        } else if (/^rgba/.test(colorx)) {
          if (colorx.search(/.([0-9]\))$/) == -1 && !defaultx) {
            colorx = colorx.replace(/.?([0-9]\))$/, "".concat(alphax, ")"));
          }
        } else if (/^(rgb)/.test(colorx)) {
          // change rgb and rgba
          if (alphax != 1) {
            colorx = colorx.replace(/^(rgb)/, "rgba");
            colorx = colorx.replace(/\)$/, ",".concat(alphax, ")"));
          }
        }

        return colorx;
      },
      isColor: function isColor(colorx) {
        var vscolors = ['primary', 'secondary', 'success', 'danger', 'warning', 'dark', 'light'];
        return vscolors.includes(colorx);
      },
      RandomColor: function RandomColor() {
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }

        return "rgb(".concat(getRandomInt(0, 255), ",").concat(getRandomInt(0, 255), ",").concat(getRandomInt(0, 255), ")");
      },
      rColor: function rColor(colorx) {
        var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (/^[#]/.test(colorx)) {
          var c = this.hexToRgb(colorx);
          colorx = "rgba(".concat(c.r, ",").concat(c.g, ",").concat(c.b, ",").concat(opacity, ")");
        } else if (/^[rgb]/.test(colorx)) {
          var colorSplit = colorx.split(')')[0];

          if (!/^[rgba]/.test(colorx)) {
            colorSplit.replace('rgb', 'rgba');
            colorSplit += ",".concat(opacity, ")");
          } else {
            // colorSplit.replace('rgb','rgba')
            colorSplit += ")";
          }

          colorx = colorSplit;
        }

        var vscolors = ['primary', 'success', 'danger', 'warning', 'dark'];

        if (colorx) {
          if (/[#()]/.test(colorx)) {
            return colorx;
          } else {
            if (vscolors.includes(colorx)) {
              return "rgba(var(--vs-".concat(colorx, "),").concat(opacity, ")");
            } else {
              return "rgba(var(--vs-primary),".concat(opacity, ")");
            }
          }
        } else {
          return "rgba(var(--vs-primary),".concat(opacity, ")");
        }
      },
      contrastColor: function contrastColor(elementx) {
        var c = elementx;

        if (/[#]/g.test(elementx)) {
          var rgbx = this.hexToRgb(elementx);
          c = "rgb(".concat(rgbx.r, ",").concat(rgbx.g, ",").concat(rgbx.b, ")");
        }

        var rgb = c.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');
        var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

        if (yiq >= 128) {
          return true;
        } else {
          return false;
        }
      },
      setCssVariable: function setCssVariable(propertyName, value) {
        if (typeof window !== 'undefined') {
          document.documentElement.style.setProperty(propertyName, value);
        }
      },
      hexToRgb: function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
          return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      },
      getVariable: function getVariable(styles, propertyName) {
        return String(styles.getPropertyValue(propertyName)).trim();
      },
      changeColor: function changeColor(colorInicial) {
        var colores = ['primary', 'success', 'danger', 'warning', 'dark'];
        var colorx;

        if (colores.includes(colorInicial)) {
          var style = getComputedStyle(document.documentElement);
          colorx = this.getVariable(style, '--vs-' + colorInicial);
        } else {
          if (/[rgb()]/g.test(colorInicial)) {
            colorx = colorInicial.replace(/[rgb()]/g, '');
          } else if (/[#]/g.test(colorInicial)) {
            var rgbx = this.hexToRgb(colorInicial);
            colorx = "".concat(rgbx.r, ",").concat(rgbx.g, ",").concat(rgbx.b);
          } else {
            colorx = '--vs-' + colorInicial;
          }
        }

        return colorx; // this.setCssVariable('--vs-'+clave,colorx)
      }
    }; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsButton/vsButton.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsButtonvue_type_script_lang_js_ = {
      name: 'VsButton',
      inheritAttrs: false,
      props: {
        type: {
          default: 'filled',
          type: String
        },
        color: {
          default: 'primary',
          type: String
        },
        textColor: {
          default: null,
          type: String
        },
        lineOrigin: {
          default: 'center',
          type: String
        },
        linePosition: {
          default: 'bottom',
          type: String
        },
        gradientDirection: {
          default: '30deg',
          type: String
        },
        gradientColorSecondary: {
          default: 'primary',
          type: String
        },
        size: {
          type: String,
          default: null
        },
        icon: {
          type: String,
          default: null
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        },
        iconAfter: {
          default: false,
          type: Boolean
        },
        radius: {
          default: false,
          type: Boolean
        },
        to: {
          default: false,
          type: String | Object
        },
        href: {
          default: '',
          type: String | Object
        },
        target: {
          default: false,
          type: [Boolean, String]
        },
        button: {
          default: 'button',
          type: String
        }
      },
      data: function data() {
        return {
          isActive: false,
          hoverx: false,
          leftBackgorund: 20,
          topBackgorund: 20,
          radio: 0,
          time: 0.3,
          timeOpacity: 0.3,
          opacity: 1
        };
      },
      computed: {
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            click: function click(event) {
              return _this.clickButton(event);
            },
            blur: function blur(event) {
              return _this.blurButton(event);
            },
            mouseover: function mouseover(event) {
              return _this.mouseoverx(event);
            },
            mouseout: function mouseout(event) {
              return _this.mouseoutx(event);
            }
          });
        },
        styles: function styles() {
          if (this.is('filled')) {
            return {
              color: utils_color.getColor(this.textColor, 1),
              background: utils_color.getColor(this.color, 1),
              boxShadow: this.hoverx ? "0px 8px 25px -8px ".concat(utils_color.getColor(this.color, 1)) : null
            };
          } else if (this.is('border') || this.is('flat')) {
            return {
              border: "".concat(this.is('flat') ? 0 : 1, "px solid ").concat(utils_color.getColor(this.color, 1)),
              background: this.hoverx ? utils_color.getColor(this.color, .1) : 'transparent',
              color: utils_color.getColor(this.textColor, 1) || utils_color.getColor(this.color, 1)
            };
          } else if (this.is('line')) {
            return {
              color: utils_color.getColor(this.textColor, 1) || utils_color.getColor(this.color, 1),
              borderBottomWidth: this.linePosition == 'bottom' ? "2px" : null,
              borderColor: "".concat(utils_color.getColor(this.color, .2)),
              borderTopWidth: this.linePosition == 'top' ? "2px" : null
            };
          } else if (this.is('gradient')) {
            var backgroundx = "linear-gradient(".concat(this.gradientDirection, ", ").concat(utils_color.getColor(this.color), " 0%, ").concat(utils_color.getColor(this.gradientColorSecondary, 1), " 100%)");
            return {
              background: backgroundx
            };
          } else if (this.is('relief')) {
            var color = utils_color.getColor(this.color, 1);
            return {
              background: utils_color.getColor(this.color, 1),
              boxShadow: "0 3px 0 0 ".concat(utils_color.darken(color, -0.4))
            };
          }
        },
        stylesBackGround: function stylesBackGround() {
          var styles = {
            background: this.is('flat') || this.is('border') ? utils_color.getColor(this.color, 1, false) : null,
            opacity: this.opacity,
            left: "".concat(this.leftBackgorund, "px"),
            top: "".concat(this.topBackgorund, "px"),
            width: "".concat(this.radio, "px"),
            height: "".concat(this.radio, "px"),
            transition: "width ".concat(this.time, "s ease, height ").concat(this.time, "s ease, opacity ").concat(this.timeOpacity, "s ease")
          };
          return styles;
        },
        styleLine: function styleLine() {
          var lineOrigin = '50%';

          if (this.lineOrigin == 'left') {
            lineOrigin = '0%';
          } else if (this.lineOrigin == 'right') {
            lineOrigin = 'auto';
          }

          var styles = {
            top: this.linePosition == 'top' ? '-2px' : 'auto',
            bottom: this.linePosition == 'bottom' ? '-2px' : 'auto',
            background: utils_color.getColor(this.color, 1),
            left: lineOrigin,
            right: lineOrigin == 'auto' ? '0px' : null,
            transform: lineOrigin == '50%' ? 'translate(-50%)' : null
          };
          return styles;
        }
      },
      methods: {
        isRTL: function isRTL(value) {
          if (this.$vs.rtl) {
            return value;
          } else {
            if (value === 'right') {
              return 'left';
            }

            if (value === 'left') {
              return 'right';
            }
          }
        },
        routerPush: function routerPush() {
          this.$router.push(this.to);
        },
        is: function is(which) {
          var type = this.type;
          return type == which;
        },
        mouseoverx: function mouseoverx(event) {
          this.$emit('mouseover', event);
          this.hoverx = true;
        },
        mouseoutx: function mouseoutx(event) {
          this.$emit('mouseout', event);
          this.hoverx = false;
        },
        blurButton: function blurButton(event) {
          var _this2 = this;

          this.$emit('blur', event);

          if (this.type == 'border' || this.type == 'flat') {
            this.opacity = 0;
            setTimeout(function () {
              _this2.radio = 0;
            }, 150);
            this.isActive = false;
          }
        },
        clickButton: function clickButton(event) {
          var _this3 = this;

          this.$emit('click', event);

          if (this.isActive) {
            return;
          }

          if (this.to) {
            this.routerPush();
          }

          if (this.href) {
            if (typeof this.href == 'string') {
              this.target ? window.open(this.href) : window.location.href = this.href;
            } else {
              this.target ? window.open(this.href.url) : window.location.href = this.href.url;
            }
          }

          this.isActive = true;
          var btn = this.$refs.btn;
          var xEvent = event.offsetX;
          var yEvent = event.offsetY;
          var radio = btn.clientWidth * 3;
          this.time = btn.clientWidth / (btn.clientWidth + (this.is('border') || this.is('flat') ? 70 : 20));

          if (this.is('filled')) {
            this.timeOpacity = this.time;
          }

          if (event.srcElement ? event.srcElement != btn : false) {
            xEvent += event.target.offsetLeft;
            yEvent += event.target.offsetTop;
          }

          this.leftBackgorund = xEvent;
          this.topBackgorund = yEvent;
          this.radio = radio;

          if (this.is('filled')) {
            this.opacity = 0;
          } else {
            this.opacity = 1;
          }

          if (this.is('filled')) {
            setTimeout(function () {
              _this3.time = _this3.timeOpacity = _this3.radio = 0;
              _this3.opacity = 1;
              _this3.isActive = false;
            }, this.time * 1100);
          } else {
            setTimeout(function () {
              _this3.timeOpacity = .15;
            }, this.time * 1100);
          }
        },
        isColor: function isColor() {
          return utils_color.isColor(this.color);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsButton/vsButton.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsButton_vsButtonvue_type_script_lang_js_ = vsButtonvue_type_script_lang_js_; // CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js

    /* globals __VUE_SSR_CONTEXT__ */
    // IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
    // This module is a runtime utility for cleaner component module output and will
    // be included in the final webpack user bundle.

    function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier,
    /* server only */
    shadowMode
    /* vue-cli only */
    ) {
      // Vue.extend constructor export interop
      var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports; // render functions

      if (render) {
        options.render = render;
        options.staticRenderFns = staticRenderFns;
        options._compiled = true;
      } // functional template


      if (functionalTemplate) {
        options.functional = true;
      } // scopedId


      if (scopeId) {
        options._scopeId = 'data-v-' + scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function (context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (injectStyles) {
            injectStyles.call(this, context);
          } // register component module identifier for async chunk inferrence


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (injectStyles) {
        hook = shadowMode ? function () {
          injectStyles.call(this, this.$root.$options.shadowRoot);
        } : injectStyles;
      }

      if (hook) {
        if (options.functional) {
          // for template-only hot-reload because in that case the render fn doesn't
          // go through the normalizer
          options._injectStyles = hook; // register for functioal component in vue file

          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return {
        exports: scriptExports,
        options: options
      };
    } // CONCATENATED MODULE: ./src/components/vsButton/vsButton.vue

    /* normalize component */


    var component = normalizeComponent(vsButton_vsButtonvue_type_script_lang_js_, render, staticRenderFns, false, null, null, null);
    component.options.__file = "vsButton.vue";
    /* harmony default export */

    var vsButton = component.exports; // CONCATENATED MODULE: ./src/components/vsButton/index.js

    /* harmony default export */

    var components_vsButton = function (Vue) {
      Vue.component(vsButton.name, vsButton);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSelect/vsSelect.vue?vue&type=template&id=478ebb44&lang=html&


    var vsSelectvue_type_template_id_478ebb44_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "con-select",
        class: {
          'autocompletex': _vm.autocomplete,
          'activeOptions': _vm.active,
          'input-select-validate-success': _vm.success,
          'input-select-validate-danger': _vm.danger,
          'input-select-validate-warning': _vm.warning
        },
        style: _vm.getWidth
      }, [_vm.label ? _c('label', {
        ref: "inputSelectLabel",
        staticClass: "vs-select--label",
        attrs: {
          "for": ""
        }
      }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _c('div', {
        staticClass: "input-select-con"
      }, [_c('input', _vm._g(_vm._b({
        ref: "inputselect",
        staticClass: "input-select vs-select--input",
        attrs: {
          "readonly": !_vm.autocomplete,
          "type": "text"
        },
        on: {
          "click": function ($event) {
            $event.stopPropagation();
          },
          "keydown": function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
              return null;
            }

            $event.stopPropagation();
            $event.preventDefault();
            return _vm.closeOptions($event);
          }
        }
      }, 'input', _vm.$attrs, false), _vm.listeners)), _c('button', {
        staticClass: "icon-select-clear vs-select--icon-clear",
        class: {
          'activeBtnClear': _vm.activeBtnClear
        },
        on: {
          "click": _vm.clearValue
        }
      }, [_c('i', {
        staticClass: "material-icons"
      }, [_vm._v("\n        close\n      ")])]), !_vm.activeBtnClear ? _c('vs-icon', {
        staticClass: "icon-select vs-select--icon",
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        },
        on: {
          "~click": function ($event) {}
        }
      }) : _vm._e(), _c('transition', {
        attrs: {
          "name": "fadeselect"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.active,
          expression: "active"
        }],
        ref: "vsSelectOptions",
        staticClass: "vs-select--options",
        class: ["vs-select-" + _vm.color, {
          'scrollx': _vm.scrollx
        }],
        style: _vm.cords
      }, [_c('ul', {
        ref: "ulx"
      }, [_vm._t("default")], 2), _c('ul', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.clear,
          expression: "clear"
        }]
      }, [_c('li', {
        on: {
          "click": function ($event) {
            _vm.filterItems(''), _vm.changeValue();
          }
        }
      }, [_vm._v("\n            " + _vm._s(_vm.noData) + "\n          ")])])])])], 1), _c('transition-group', {
        on: {
          "before-enter": _vm.beforeEnter,
          "enter": _vm.enter,
          "leave": _vm.leave
        }
      }, [_vm.success ? _c('div', {
        key: "success",
        staticClass: "con-text-validation"
      }, [_c('span', {
        staticClass: "span-text-validation span-text-validation-success"
      }, [_vm._v("\n        " + _vm._s(_vm.successText) + "\n      ")])]) : _vm.danger ? _c('div', {
        key: "danger",
        staticClass: "con-text-validation span-text-validation-danger"
      }, [_c('span', {
        staticClass: "span-text-validation"
      }, [_vm._v("\n        " + _vm._s(_vm.dangerText) + "\n      ")])]) : _vm.warning ? _c('div', {
        key: "warning",
        staticClass: "con-text-validation span-text-validation-warning"
      }, [_c('span', {
        staticClass: "span-text-validation"
      }, [_vm._v("\n        " + _vm._s(_vm.warningText) + "\n      ")])]) : _vm._e(), _vm.descriptionText ? _c('div', {
        key: "description",
        staticClass: "con-text-validation span-text-validation"
      }, [_c('span', {
        staticClass: "span-text-validation"
      }, [_vm._v("\n        " + _vm._s(_vm.descriptionText) + "\n      ")])]) : _vm._e()])], 1);
    };

    var vsSelectvue_type_template_id_478ebb44_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelect.vue?vue&type=template&id=478ebb44&lang=html&
    // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/arrayWithoutHoles.js

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }
    } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/iterableToArray.js


    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/nonIterableSpread.js


    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/toConsumableArray.js


    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    } // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.string.includes.js


    var es6_string_includes = __webpack_require__("ed20"); // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/arrayWithHoles.js


    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/iterableToArrayLimit.js


    function _iterableToArrayLimit(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/nonIterableRest.js


    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/slicedToArray.js


    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    } // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.number.constructor.js


    var es6_number_constructor = __webpack_require__("0bb9"); // CONCATENATED MODULE: ./src/utils/index.js

    /* harmony default export */


    var utils = {
      insertBody: function insertBody(elx, parent) {
        var bodyx = parent ? parent : document.body;
        bodyx.insertBefore(elx, bodyx.firstChild);
      },
      removeBody: function removeBody(element, parent) {
        var bodyx = parent ? parent : document.body;
        bodyx.removeChild(element);
      },
      changePosition: function changePosition(elx, content, conditional) {
        var topx = 0;
        var leftx = 0;
        var widthx = 0;
        var scrollTopx = window.pageYOffset || document.documentElement.scrollTop;

        if (elx.getBoundingClientRect().top + 300 >= window.innerHeight) {
          setTimeout(function () {
            if (conditional) {
              topx = elx.getBoundingClientRect().top - content.clientHeight + scrollTopx;
            } else {
              topx = elx.getBoundingClientRect().top - content.clientHeight + elx.clientHeight + scrollTopx;
            }
          }, 1);
        } else {
          topx = conditional ? elx.getBoundingClientRect().top + elx.clientHeight + scrollTopx + 5 : elx.getBoundingClientRect().top + scrollTopx;
        }

        leftx = elx.getBoundingClientRect().left;
        widthx = elx.offsetWidth;
        var cords = {
          left: "".concat(leftx, "px"),
          top: "".concat(topx, "px"),
          width: "".concat(widthx, "px")
        };
        return cords;
      }
    }; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSelect/vsSelect.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsSelectvue_type_script_lang_js_ = {
      name: 'VsSelect',
      props: {
        value: {},
        noData: {
          default: 'data no available',
          type: String
        },
        maxSelected: {
          default: null,
          type: [Number, String]
        },
        autocomplete: {
          default: false,
          type: Boolean
        },
        color: {
          default: 'primary',
          type: String
        },
        multiple: {
          default: false,
          type: Boolean
        },
        label: {
          default: null,
          type: [String]
        },
        success: {
          default: false,
          type: Boolean
        },
        danger: {
          default: false,
          type: Boolean
        },
        warning: {
          default: false,
          type: Boolean
        },
        successText: {
          default: null,
          type: String
        },
        dangerText: {
          default: null,
          type: String
        },
        warningText: {
          default: null,
          type: String
        },
        descriptionText: {
          default: null,
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        icon: {
          default: 'keyboard_arrow_down',
          type: String
        },
        iconClear: {
          default: 'close',
          type: String
        },
        width: {
          default: null,
          type: String
        }
      },
      data: function data() {
        return {
          valueFilter: '',
          active: false,
          valuex: '',
          clear: false,
          scrollx: false,
          cords: {},
          filterx: false
        };
      },
      computed: {
        activeBtnClear: function activeBtnClear() {
          return this.autocomplete && this.filterx;
        },
        getWidth: function getWidth() {
          return this.width ? "width:".concat(this.width, ";") : null;
        },
        parent: function parent() {
          return this;
        },
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            blur: function blur(event) {
              if (_this.autocomplete && event.relatedTarget ? !event.relatedTarget.closest('.vs-select--options') : false) {
                _this.closeOptions();
              }

              _this.$emit('blur', event);
            },
            focus: function focus(event) {
              _this.$emit('focus', event); //document.removeEventListener('click',this.clickBlur)


              _this.focus(event);
            },
            input: function input(event) {
              if (_this.autocomplete) {
                _this.$emit('input-change', event);
              }
            },
            keyup: function keyup(event) {
              if (event.key == 'ArrowDown' || event.key == 'ArrowUp') {
                event.preventDefault();

                var childrens = _this.$children.filter(function (item) {
                  return item.visible;
                });

                childrens[0].$el.querySelector('.vs-select--item').focus();
              } else {
                if (_this.autocomplete) {
                  _this.filterItems(event.target.value);
                }
              }

              _this.$children.map(function (item) {
                item.valueInputx = _this.$refs.inputselect.value;
              });
            }
          });
        }
      },
      watch: {
        value: function value(event) {
          this.valuex = this.value;
          this.$emit('change', event);
        },
        active: function active() {
          var _this2 = this;

          this.$nextTick(function () {
            if (_this2.active) {
              utils.insertBody(_this2.$refs.vsSelectOptions);
              setTimeout(function () {
                _this2.$children.forEach(function (item) {
                  if (item.focusValue) {
                    item.focusValue();
                  }
                });

                if (_this2.$refs.ulx.scrollHeight >= 260) _this2.scrollx = true;
              }, 100);
            } else {
              var _document$getElements = document.getElementsByTagName('body'),
                  _document$getElements2 = _slicedToArray(_document$getElements, 1),
                  parent = _document$getElements2[0];

              parent.removeChild(_this2.$refs.vsSelectOptions);
            }
          });
        }
      },
      mounted: function mounted() {
        // this.$refs.inputselect.value = this.value
        this.changeValue();

        if (this.active) {
          utils.insertBody(this.$refs.vsSelectOptions);
        }
      },
      beforeDestroy: function beforeDestroy() {
        var _document$getElements3 = document.getElementsByTagName('body'),
            _document$getElements4 = _slicedToArray(_document$getElements3, 1),
            parent = _document$getElements4[0];

        if (parent && this.$refs.vsSelectOptions && this.$refs.vsSelectOptions.parentNode === parent) {
          parent.removeChild(this.$refs.vsSelectOptions);
        }
      },
      updated: function updated() {
        if (!this.active) {
          this.changeValue();
        }
      },
      methods: {
        clearValue: function clearValue() {
          this.focus();
          this.filterItems('');
          this.changeValue();
        },
        addMultiple: function addMultiple(value) {
          var currentValues = this.value ? this.value : [];

          if (currentValues.includes(value)) {
            currentValues.splice(currentValues.indexOf(value), 1);
            this.$emit('input', currentValues);
            this.changeValue();

            if (this.autocomplete) {
              this.$refs.inputselect.focus();
            }
          } else {
            if (this.autocomplete) {
              currentValues.push(value);
              this.$emit('input', currentValues);
              this.filterItems('');
              this.changeValue(); // this.$refs.inputselect.value += ','

              this.$refs.inputselect.focus();
            } else {
              currentValues.push(value);
              this.$emit('input', currentValues);
              this.changeValue();
            }
          }
        },
        filterItems: function filterItems(value) {
          var _this3 = this;

          if (value) {
            this.filterx = true;
          } else {
            this.filterx = false;
          }

          var items = this.$children;
          items.forEach(function (item) {
            if (item.$children.length > 0) {
              items = [].concat(_toConsumableArray(items), _toConsumableArray(item.$children));
            }
          });
          items.map(function (item) {
            if (!('text' in item)) return;
            var text = item.text;

            if (_this3.multiple) {
              var valuesx = value.split(',');
              valuesx.forEach(function (value_multi) {
                if (text.toUpperCase().indexOf(value_multi.toUpperCase()) == -1) {
                  item.visible = false;
                } else {
                  item.visible = true;
                }
              });
            } else {
              if (text.toUpperCase().indexOf(value.toUpperCase()) == -1) {
                item.visible = false;
              } else {
                item.visible = true;
              }
            }
          });
          var lengthx = items.filter(function (item) {
            return item.visible;
          });

          if (lengthx.length == 0) {
            this.clear = true;
          } else {
            this.clear = false;
          }

          this.$nextTick(function () {
            _this3.cords = _this3.changePosition();
          });
        },
        changeValue: function changeValue() {
          this.filterx = false;

          if (this.multiple) {
            var values = this.value ? this.value : [];
            var options = this.$children;
            options.forEach(function (item) {
              if (item.$children.length > 0) {
                options = [].concat(_toConsumableArray(options), _toConsumableArray(item.$children));
              }
            });
            var optionsValues = [];
            values.forEach(function (item) {
              options.forEach(function (item_option) {
                if (item_option.value == item) {
                  var text = item_option.text;
                  text = text.replace('check_circle', '');
                  optionsValues.push(text.trim());
                }
              });
            });
            this.$refs.inputselect.value = optionsValues.toString();
          } else {
            if (this.$refs.inputselect) {
              this.$refs.inputselect.value = this.valuex;
            }
          }
        },
        focus: function focus() {
          var _this4 = this;

          this.active = true;
          this.setLabelClass(this.$refs.inputSelectLabel, true);
          var inputx = this.$refs.inputselect; // setTimeout( ()=> {
          //   document.addEventListener('click',this.clickBlur)
          // }, 100);

          if (this.autocomplete && this.multiple) {
            setTimeout(function () {
              if (inputx.value) {
                _this4.$refs.inputselect.value = inputx.value += ',';
              }

              inputx.selectionStart = inputx.selectionEnd = 10000;
            }, 10);
          } else if (this.autocomplete && !this.multiple) {
            this.$refs.inputselect.select();
          }

          if (!this.autocomplete) {
            if (this.multiple ? this.value.length == 0 : !this.value || this.multiple) {
              setTimeout(function () {
                var el = _this4.$children[0].$el.querySelector('.vs-select--item');

                if (el) el.focus();
              }, 50);
            }
          }

          this.$nextTick(function () {
            _this4.cords = _this4.changePosition();
          });
        },
        clickBlur: function clickBlur(event) {
          var closestx = event.target.closest('.vs-select--options');

          if (!closestx) {
            this.closeOptions();

            if (this.autocomplete) {
              this.filterItems('');
            }

            this.changeValue();
          }
        },
        closeOptions: function closeOptions() {
          // this.$refs.inputselect.blur()
          this.active = false;
          this.setLabelClass(this.$refs.inputSelectLabel, false);
          document.removeEventListener('click', this.clickBlur);
        },
        changePosition: function changePosition() {
          var elx = this.$refs.inputselect;
          var content = this.$refs.vsSelectOptions;
          var conditional = this.autocomplete;
          var topx = 0;
          var leftx = 0;
          var widthx = 0;
          var scrollTopx = window.pageYOffset || document.documentElement.scrollTop;

          if (elx.getBoundingClientRect().top + content.scrollHeight + 20 >= window.innerHeight) {
            topx = elx.getBoundingClientRect().top + elx.clientHeight + scrollTopx - content.scrollHeight;

            if (conditional) {
              topx = topx - elx.clientHeight - 5;
            }
          } else {
            topx = conditional ? elx.getBoundingClientRect().top + elx.clientHeight + scrollTopx + 5 : elx.getBoundingClientRect().top + scrollTopx;
          }

          leftx = elx.getBoundingClientRect().left;
          widthx = elx.offsetWidth;
          var cords = {
            left: "".concat(leftx, "px"),
            top: "".concat(topx, "px"),
            width: "".concat(widthx, "px")
          };
          return cords;
        },
        beforeEnter: function beforeEnter(el) {
          el.style.height = 0;
        },
        enter: function enter(el, done) {
          var h = el.scrollHeight;
          el.style.height = h + 'px';
          done();
        },
        leave: function leave(el) {
          el.style.height = 0 + 'px';
        },
        setLabelClass: function setLabelClass(label, focusing) {
          if (!label) {
            return;
          }

          if (focusing) {
            label.classList.add('input-select-label-' + this.color + '--active');
            return;
          }

          label.classList.remove('input-select-label-' + this.color + '--active');
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelect.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSelect_vsSelectvue_type_script_lang_js_ = vsSelectvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelect.vue

    /* normalize component */

    var vsSelect_component = normalizeComponent(vsSelect_vsSelectvue_type_script_lang_js_, vsSelectvue_type_template_id_478ebb44_lang_html_render, vsSelectvue_type_template_id_478ebb44_lang_html_staticRenderFns, false, null, null, null);
    vsSelect_component.options.__file = "vsSelect.vue";
    /* harmony default export */

    var vsSelect = vsSelect_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSelect/vsSelectItem.vue?vue&type=template&id=58671676&lang=html&

    var vsSelectItemvue_type_template_id_58671676_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', _vm._g({
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visible,
          expression: "visible"
        }],
        staticClass: "vs-component",
        attrs: {
          "data-text": _vm.text
        }
      }, _vm.listeners), [_c('button', _vm._b({
        ref: "item",
        staticClass: "vs-select--item",
        class: {
          'activex': _vm.$parent.parent.multiple ? _vm.getValue.indexOf(_vm.value) != -1 : _vm.getValue == _vm.value,
          'con-icon': _vm.$parent.parent.multiple,
          'disabledx': _vm.disabledx
        },
        style: _vm.styles,
        attrs: {
          "disabled": _vm.disabled,
          "type": "button",
          "name": "button"
        },
        on: {
          "keydown": [function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "backspace", undefined, $event.key, undefined)) {
              return null;
            }

            $event.preventDefault();
            return _vm.backspace($event);
          }, function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
              return null;
            }

            $event.preventDefault();
            return _vm.navigateOptions('next');
          }, function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
              return null;
            }

            $event.preventDefault();
            return _vm.navigateOptions('prev');
          }, function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }

            $event.preventDefault();
            return _vm.clickOption();
          }]
        }
      }, 'button', _vm.$attrs, false), [_vm.$parent.parent.multiple ? _c('vs-icon', {
        staticClass: "icon-item vs-select--item-icon",
        attrs: {
          "icon": "check_circle"
        }
      }) : _vm._e(), _c('span', {
        domProps: {
          "innerHTML": _vm._s(_vm.getText)
        }
      })], 1)]);
    };

    var vsSelectItemvue_type_template_id_58671676_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelectItem.vue?vue&type=template&id=58671676&lang=html&
    // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.regexp.constructor.js

    var es6_regexp_constructor = __webpack_require__("4a0d"); // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSelect/vsSelectItem.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */


    var vsSelectItemvue_type_script_lang_js_ = {
      name: 'VsSelectItem',
      inheritAttrs: false,
      props: {
        disabled: {
          type: Boolean,
          default: false
        },
        value: {
          default: null
        },
        text: {
          default: null
        }
      },
      data: function data() {
        return {
          hoverx: false,
          visible: true,
          getText: null,
          valueInputx: ''
        };
      },
      computed: {
        disabledx: function disabledx() {
          if (this.$parent.parent.multiple) {
            if (this.isActive) {
              return false;
            } else {
              return this.$parent.parent.maxSelected == this.$parent.parent.value.length;
            }
          } else {
            return false;
          }
        },
        isActive: function isActive() {
          return this.$parent.parent.multiple ? this.getValue.indexOf(this.value) != -1 : this.getValue == this.value;
        },
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            blur: function blur(event) {
              if (event.relatedTarget ? !event.relatedTarget.closest('.vs-select--options') : true) {
                _this.$parent.parent.closeOptions();
              }
            },
            click: function click(event) {
              return _this.clickOption(event);
            },
            mouseover: function mouseover(event) {
              _this.$emit('mouseover', event);

              _this.changeHover(true);
            },
            mouseout: function mouseout(event) {
              _this.$emit('mouseover', event);

              _this.changeHover(false);
            }
          });
        },
        styles: function styles() {
          return {
            background: this.isActive ? utils_color.getColor(this.$parent.parent.color, .1) : null,
            color: this.isActive ? utils_color.getColor(this.$parent.parent.color, 1) : null,
            fontWeight: this.isActive ? 'bold' : null
          };
        },
        getValue: function getValue() {
          return this.$parent.parent.value;
        }
      },
      watch: {
        '$parent.parent.active': function $parentParentActive() {
          var _this2 = this;

          this.$nextTick(function () {
            if (_this2.$parent.parent.multiple ? _this2.getValue.indexOf(_this2.value) != -1 : _this2.getValue == _this2.value) {
              _this2.$emit('update:isSelected', true);

              _this2.getText = _this2.text;

              _this2.putValue();
            } else {
              _this2.$emit('update:isSelected', false);

              _this2.getText = _this2.text;

              _this2.putValue();
            }
          });
        },
        valueInputx: function valueInputx() {
          if (this.visible) {
            var valueInputx = this.valueInputx.split(',');

            if (valueInputx[valueInputx.length - 1] == '') {
              this.getText = this.text;
              return;
            }

            var valuex = valueInputx[valueInputx.length - 1];
            var re = new RegExp(valuex, "i");

            if (this.text.toUpperCase().indexOf(valuex.toUpperCase()) == 0) {
              valuex = this.MaysPrimera(valuex);
            }

            var text = this.text.replace(re, "<span class=\"searchx\">".concat(valuex, "</span>"));
            this.getText = text;
          } else {
            this.getText = this.text;
          }
        }
      },
      created: function created() {
        var _this3 = this;

        this.putValue();
        this.$nextTick(function () {
          if (_this3.$parent.parent.multiple ? _this3.getValue.indexOf(_this3.value) != -1 : _this3.getValue == _this3.value) {
            _this3.$emit('update:isSelected', true);

            _this3.getText = _this3.text;

            _this3.putValue();
          } else {
            _this3.$emit('update:isSelected', false);

            _this3.getText = _this3.text;

            _this3.putValue();
          }
        });
      },
      updated: function updated() {
        this.putValue();
      },
      methods: {
        changeHover: function changeHover(booleanx) {
          this.hoverx = booleanx;
        },
        MaysPrimera: function MaysPrimera(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        },
        backspace: function backspace() {
          if (this.$parent.parent.autocomplete) {
            var valueInput = this.$parent.parent.$refs.inputselect.value;
            this.$parent.parent.$refs.inputselect.value = valueInput.substr(0, valueInput.length - 1);
            this.$parent.parent.$refs.inputselect.focus();
          }
        },
        navigateOptions: function navigateOptions(orientation) {
          var orientationObject = 'nextSibling',
              lengthx = 0;

          function getNextLi(li, orientationObject) {
            if (li && li.localName == 'li') {
              var lix = li[orientationObject];

              if (li.style) {
                if (li.style.display == 'none') {
                  return getNextLi(lix, orientationObject);
                } else {
                  return li;
                }
              } else {
                return li;
              }
            } else {
              return false;
            }
          }

          var children = this.$parent.parent.$children;
          children.forEach(function (item) {
            if (item.$children.length > 0) {
              children = [].concat(_toConsumableArray(children), _toConsumableArray(item.$children));
            }
          });
          children = children.filter(function (item) {
            return item.$children.length == 0 && item.$el.localName != 'span';
          });

          if (orientation == 'prev') {
            orientationObject = 'previousSibling';
            lengthx = children.length;
          }

          var nextElement = getNextLi(this.$el[orientationObject], orientationObject);

          if (nextElement) {
            nextElement.querySelector('.vs-select--item').focus();
          } else {
            if (lengthx === children.length) lengthx--;
            getNextLi(children[lengthx == 0 ? 1 : lengthx].$el, orientationObject).querySelector('.vs-select--item').focus();
          }
        },
        focusValue: function focusValue(index) {
          var _this4 = this;

          if (this.$parent.parent.multiple ? this.$parent.parent.value.indexOf(this.value) != -1 : this.value == this.$parent.parent.value) {
            if (!this.$parent.parent.autocomplete) {
              setTimeout(function () {
                _this4.$refs.item.focus();
              }, 50);
            }
          } else if (index === 0) {
            if (!this.$parent.parent.autocomplete) {
              setTimeout(function () {
                _this4.$refs.item.focus();
              }, 50);
            }
          }
        },
        putValue: function putValue() {
          if (this.value == this.$parent.parent.value) {
            this.$parent.parent.valuex = this.text;
          }
        },
        clickOption: function clickOption() {
          if (this.disabledx) {
            return;
          }

          var text = this.text;

          if (!this.$parent.parent.multiple) {
            this.$parent.parent.active = false;
            document.removeEventListener('click', this.$parent.parent.clickBlur);
            this.$parent.parent.valuex = text;
            this.$parent.parent.$emit('input', this.value);
            this.$parent.parent.changeValue();
          } else if (this.$parent.parent.multiple) {
            this.$parent.parent.valuex = text;
            this.$parent.parent.addMultiple(this.value);
          }

          this.$parent.parent.$children.map(function (item) {
            item.valueInputx = '';
          });
        },
        // methods colors
        isColor: function isColor() {
          return utils_color.isColor(this.color);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelectItem.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSelect_vsSelectItemvue_type_script_lang_js_ = vsSelectItemvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelectItem.vue

    /* normalize component */

    var vsSelectItem_component = normalizeComponent(vsSelect_vsSelectItemvue_type_script_lang_js_, vsSelectItemvue_type_template_id_58671676_lang_html_render, vsSelectItemvue_type_template_id_58671676_lang_html_staticRenderFns, false, null, null, null);
    vsSelectItem_component.options.__file = "vsSelectItem.vue";
    /* harmony default export */

    var vsSelectItem = vsSelectItem_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSelect/vsSelectGroup.vue?vue&type=template&id=e3d354fc&

    var vsSelectGroupvue_type_template_id_e3d354fc_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-select-group"
      }, [!_vm.filterx ? _c('h4', [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._t("default")], 2);
    };

    var vsSelectGroupvue_type_template_id_e3d354fc_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelectGroup.vue?vue&type=template&id=e3d354fc&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSelect/vsSelectGroup.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsSelectGroupvue_type_script_lang_js_ = {
      name: 'VsSelectGroup',
      props: {
        title: {
          default: 'Group',
          type: String
        }
      },
      data: function data() {
        return {
          activeTitle: true
        };
      },
      computed: {
        filterx: function filterx() {
          return this.$parent.filterx;
        },
        parent: function parent() {
          return this.$parent;
        }
      },
      methods: {
        focusValue: function focusValue(index) {
          this.$children[0].focusValue(index);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelectGroup.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSelect_vsSelectGroupvue_type_script_lang_js_ = vsSelectGroupvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSelect/vsSelectGroup.vue

    /* normalize component */

    var vsSelectGroup_component = normalizeComponent(vsSelect_vsSelectGroupvue_type_script_lang_js_, vsSelectGroupvue_type_template_id_e3d354fc_render, vsSelectGroupvue_type_template_id_e3d354fc_staticRenderFns, false, null, null, null);
    vsSelectGroup_component.options.__file = "vsSelectGroup.vue";
    /* harmony default export */

    var vsSelectGroup = vsSelectGroup_component.exports; // CONCATENATED MODULE: ./src/components/vsSelect/index.js

    /* harmony default export */

    var components_vsSelect = function (Vue) {
      Vue.component(vsSelect.name, vsSelect);
      Vue.component(vsSelectItem.name, vsSelectItem);
      Vue.component(vsSelectGroup.name, vsSelectGroup);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSwitch/vsSwitch.vue?vue&type=template&id=b82d5bd0&lang=html&


    var vsSwitchvue_type_template_id_b82d5bd0_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('button', _vm._b({
        staticClass: "vs-component vs-switch",
        class: ["vs-switch-" + _vm.color, {
          'vs-switch-active': _vm.isChecked || _vm.$attrs.checked
        }],
        style: _vm.style
      }, 'button', _vm.$attrs, false), [_c('input', _vm._g(_vm._b({
        ref: "inputCheckbox",
        staticClass: "input-switch vs-switch--input",
        attrs: {
          "disabled": _vm.$attrs.disabled,
          "type": "checkbox"
        },
        domProps: {
          "value": _vm.value
        }
      }, 'input', _vm.$attrs, false), _vm.listeners)), _c('span', {
        ref: "on",
        staticClass: "text-on text-switch vs-switch--text",
        class: {
          'active-text': _vm.isChecked || _vm.$attrs.checked
        }
      }, [_vm._t("on"), _c('vs-icon', {
        staticClass: "icons-switch vs-switch--icon",
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.vsIconOn || _vm.vsIcon
        }
      })], 2), _c('span', {
        ref: "off",
        staticClass: "text-off text-switch vs-switch--text",
        class: {
          'active-text': !_vm.isChecked && !_vm.$attrs.checked
        }
      }, [_vm._t("off"), _c('vs-icon', {
        staticClass: "icons-switch vs-switch--icon",
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.vsIconOff || _vm.vsIcon
        }
      })], 2), _c('span', {
        staticClass: "vs-circle-switch vs-switch--circle"
      })]);
    };

    var vsSwitchvue_type_template_id_b82d5bd0_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSwitch/vsSwitch.vue?vue&type=template&id=b82d5bd0&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSwitch/vsSwitch.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsSwitchvue_type_script_lang_js_ = {
      name: 'VsSwitch',
      inheritAttrs: false,
      props: {
        value: {},
        color: {
          default: 'primary',
          type: String
        },
        vsIcon: {
          default: null,
          type: String
        },
        vsIconOn: {
          default: null,
          type: String
        },
        vsIconOff: {
          default: null,
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        vsValue: {}
      },
      data: function data() {
        return {
          widthx: 42,
          checkboxClicked: false
        };
      },
      computed: {
        style: function style() {
          return {
            background: this.value ? utils_color.getColor(this.color, 1) : null,
            width: "".concat(this.widthx, "px")
          };
        },
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            input: function input(evt) {
              _this.toggleValue(evt);
            }
          });
        },
        isChecked: function isChecked() {
          return this.isArrayx() ? this.isArrayIncludes() : this.value;
        }
      },
      mounted: function mounted() {
        var _this2 = this;

        this.$nextTick(function () {
          var w = _this2.$refs.on.clientWidth > _this2.$refs.off.clientWidth ? _this2.$refs.on.clientWidth : _this2.$refs.off.clientWidth;
          _this2.widthx = w + 24;
        });
      },
      methods: {
        toggleValue: function toggleValue(evt) {
          if (Array.isArray(this.value)) {
            this.setArray(evt);
          } else {
            this.$emit('input', !this.value);
            this.$emit('change', evt);
          }
        },
        setArray: function setArray(evt) {
          var value = this.value.slice(0); // Copy Array.

          if (this.isArrayIncludes()) {
            value.splice(value.indexOf(this.vsValue), 1); // delete value

            this.$emit('input', value);
            this.$emit('change', evt);
          } else {
            value.push(this.vsValue); // add value new

            this.$emit('input', value);
            this.$emit('change', evt);
          }
        },
        isArrayIncludes: function isArrayIncludes() {
          var modelx = this.value;
          var value = this.vsValue;
          return modelx.includes(value);
        },
        isArrayx: function isArrayx() {
          return Array.isArray(this.value);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSwitch/vsSwitch.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSwitch_vsSwitchvue_type_script_lang_js_ = vsSwitchvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSwitch/vsSwitch.vue

    /* normalize component */

    var vsSwitch_component = normalizeComponent(vsSwitch_vsSwitchvue_type_script_lang_js_, vsSwitchvue_type_template_id_b82d5bd0_lang_html_render, vsSwitchvue_type_template_id_b82d5bd0_lang_html_staticRenderFns, false, null, null, null);
    vsSwitch_component.options.__file = "vsSwitch.vue";
    /* harmony default export */

    var vsSwitch = vsSwitch_component.exports; // CONCATENATED MODULE: ./src/components/vsSwitch/index.js

    /* harmony default export */

    var components_vsSwitch = function (Vue) {
      Vue.component(vsSwitch.name, vsSwitch);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCheckBox/vsCheckBox.vue?vue&type=template&id=63a26ace&lang=html&


    var vsCheckBoxvue_type_template_id_63a26ace_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-component con-vs-checkbox",
        class: ["vs-checkbox-" + _vm.color, "vs-checkbox-" + _vm.size]
      }, [_c('input', _vm._g(_vm._b({
        staticClass: "vs-checkbox--input",
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "checked": _vm.isChecked || _vm.$attrs.checked,
          "value": _vm.value
        }
      }, 'input', _vm.$attrs, false), _vm.listeners)), _c('span', {
        staticClass: "checkbox_x vs-checkbox",
        style: _vm.style
      }, [_c('span', {
        staticClass: "vs-checkbox--check",
        style: _vm.style_check
      }, [_c('vs-icon', {
        staticClass: "vs-checkbox--icon ",
        attrs: {
          "icon": _vm.icon,
          "icon-pack": _vm.iconPack
        }
      })], 1)]), _c('span', {
        staticClass: "con-slot-label"
      }, [_vm._t("default")], 2)]);
    };

    var vsCheckBoxvue_type_template_id_63a26ace_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsCheckBox/vsCheckBox.vue?vue&type=template&id=63a26ace&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCheckBox/vsCheckBox.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsCheckBoxvue_type_script_lang_js_ = {
      name: 'VsCheckbox',
      inheritAttrs: false,
      props: {
        color: {
          default: 'primary',
          type: String
        },
        value: {},
        icon: {
          default: 'check',
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        vsValue: {
          type: [Boolean, Array, String, Number, Object],
          default: false
        },
        size: {
          default: 'default',
          type: String
        }
      },
      computed: {
        style_check: function style_check() {
          return {
            background: this.isChecked ? utils_color.getColor(this.color, 1) : null
          };
        },
        style: function style() {
          return {
            border: "2px solid ".concat(this.isChecked ? utils_color.getColor(this.color, 1) : 'rgb(180, 180, 180)')
          };
        },
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            // change: (evt) => {
            //   this.toggleValue(evt)
            // },
            input: function input(evt) {
              _this.toggleValue(evt);
            }
          });
        },
        isChecked: function isChecked() {
          return this.isArrayx() ? this.isArrayIncludes() : this.value;
        }
      },
      methods: {
        giveColor: function giveColor(color) {
          return utils_color.rColor(color);
        },
        toggleValue: function toggleValue(evt) {
          if (this.isArrayx()) {
            this.setArray();
          } else if (typeof this.vsValue == 'string') {
            this.setValueString();
          } else {
            this.$emit('input', !this.value);
            this.$emit('change', evt);
          }
        },
        setArray: function setArray() {
          // Copy Array
          var value = this.value.slice(0);

          if (this.isArrayIncludes()) {
            value.splice(value.indexOf(this.vsValue), 1);
            this.$emit('input', value);
            this.$emit('change', value);
          } else {
            value.push(this.vsValue);
            this.$emit('input', value);
            this.$emit('change', value);
          }
        },
        setValueString: function setValueString() {
          if (this.value == this.vsValue) {
            this.$emit('input', null);
            this.$emit('change', null);
          } else {
            this.$emit('input', this.vsValue);
            this.$emit('change', this.vsValue);
          }
        },
        isArrayIncludes: function isArrayIncludes() {
          var modelx = this.value;
          var value = this.vsValue;
          return modelx.includes(value);
        },
        isArrayx: function isArrayx() {
          return Array.isArray(this.value);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsCheckBox/vsCheckBox.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsCheckBox_vsCheckBoxvue_type_script_lang_js_ = vsCheckBoxvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsCheckBox/vsCheckBox.vue

    /* normalize component */

    var vsCheckBox_component = normalizeComponent(vsCheckBox_vsCheckBoxvue_type_script_lang_js_, vsCheckBoxvue_type_template_id_63a26ace_lang_html_render, vsCheckBoxvue_type_template_id_63a26ace_lang_html_staticRenderFns, false, null, null, null);
    vsCheckBox_component.options.__file = "vsCheckBox.vue";
    /* harmony default export */

    var vsCheckBox = vsCheckBox_component.exports; // CONCATENATED MODULE: ./src/components/vsCheckBox/index.js

    /* harmony default export */

    var components_vsCheckBox = function (Vue) {
      Vue.component(vsCheckBox.name, vsCheckBox);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsRadio/vsRadio.vue?vue&type=template&id=dc7b8490&lang=html&


    var vsRadiovue_type_template_id_dc7b8490_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('label', {
        staticClass: "vs-component con-vs-radio",
        class: ["vs-radio-" + _vm.color]
      }, [_c('input', _vm._g(_vm._b({
        staticClass: "vs-radio--input",
        attrs: {
          "name": _vm.vsName || _vm.value,
          "type": "radio"
        },
        domProps: {
          "checked": _vm.isChecked,
          "value": _vm.value
        }
      }, 'input', _vm.$attrs, false), _vm.listeners)), _c('span', {
        staticClass: "vs-radio"
      }, [_c('span', {
        staticClass: "vs-radio--borde",
        style: _vm.styles
      }), _c('span', {
        staticClass: "vs-radio--circle",
        style: _vm.styleCircle
      })]), _c('span', {
        staticClass: "vs-radio--label"
      }, [_vm._t("default")], 2)]);
    };

    var vsRadiovue_type_template_id_dc7b8490_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsRadio/vsRadio.vue?vue&type=template&id=dc7b8490&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsRadio/vsRadio.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsRadiovue_type_script_lang_js_ = {
      name: 'VsRadio',
      inheritAttrs: false,
      props: {
        value: {},
        vsValue: {},
        vsName: {},
        color: {
          default: 'primary',
          type: String
        }
      },
      computed: {
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            input: function input() {
              return _this.$emit('input', _this.vsValue);
            },
            click: function click() {
              return _this.$emit('input', _this.vsValue);
            }
          });
        },
        attrs: function attrs() {
          var attrsx = JSON.parse(JSON.stringify(this.$attrs));
          return {
            attrsx: attrsx
          };
        },
        isChecked: function isChecked() {
          return this.vsValue == this.value;
        },
        styles: function styles() {
          return {
            'border': "2px solid ".concat(this.isChecked ? utils_color.getColor(this.color, 1) : 'rgb(200, 200, 200)')
          };
        },
        styleCircle: function styleCircle() {
          return {
            'background': utils_color.getColor(this.color, 1),
            'box-shadow': "0px 3px 12px 0px ".concat(utils_color.getColor(this.color, .4))
          };
        }
      },
      methods: {
        giveColor: function giveColor(color, opacity) {
          return utils_color.rColor(color, opacity);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsRadio/vsRadio.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsRadio_vsRadiovue_type_script_lang_js_ = vsRadiovue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsRadio/vsRadio.vue

    /* normalize component */

    var vsRadio_component = normalizeComponent(vsRadio_vsRadiovue_type_script_lang_js_, vsRadiovue_type_template_id_dc7b8490_lang_html_render, vsRadiovue_type_template_id_dc7b8490_lang_html_staticRenderFns, false, null, null, null);
    vsRadio_component.options.__file = "vsRadio.vue";
    /* harmony default export */

    var vsRadio = vsRadio_component.exports; // CONCATENATED MODULE: ./src/components/vsRadio/index.js

    /* harmony default export */

    var components_vsRadio = function (Vue) {
      Vue.component(vsRadio.name, vsRadio);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsInput/vsInput.vue?vue&type=template&id=0943733c&lang=html&


    var vsInputvue_type_template_id_0943733c_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        ref: "coninput",
        staticClass: "vs-component vs-con-input-label vs-input",
        class: ["vs-input-" + _vm.color, {
          'isFocus': _vm.isFocus,
          'input-icon-validate-success': _vm.success,
          'input-icon-validate-danger': _vm.danger,
          'input-icon-validate-warning': _vm.warning,
          'is-label-placeholder': _vm.labelPlaceholder
        }],
        style: _vm.styleLabel
      }, [(_vm.labelPlaceholder ? false : _vm.label) ? _c('label', {
        staticClass: "vs-input--label",
        attrs: {
          "for": ""
        },
        on: {
          "click": _vm.focusInput
        }
      }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _c('div', {
        staticClass: "vs-con-input"
      }, [_c('input', _vm._g(_vm._b({
        ref: "vsinput",
        staticClass: "vs-inputx vs-input--input",
        class: [_vm.size, {
          'hasValue': _vm.value !== '',
          'hasIcon': _vm.icon,
          'icon-after-input': _vm.iconAfter
        }],
        style: _vm.style,
        attrs: {
          "autofocus": _vm.autofocus,
          "placeholder": null,
          "type": _vm.$attrs.type ? _vm.$attrs.type : 'text'
        },
        domProps: {
          "value": _vm.value
        }
      }, 'input', _vm.$attrs, false), _vm.listeners)), _c('transition', {
        attrs: {
          "name": "placeholderx"
        }
      }, [_vm.isValue && (_vm.labelPlaceholder || _vm.$attrs.placeholder) ? _c('span', {
        ref: "spanplaceholder",
        staticClass: "input-span-placeholder vs-input--placeholder",
        class: [_vm.labelPlaceholder && _vm.size, _vm.size, {
          'vs-placeholder-label': _vm.labelPlaceholder
        }],
        style: _vm.styleLabel,
        on: {
          "click": _vm.focusInput
        }
      }, [_vm._v("\n        " + _vm._s(_vm.$attrs.placeholder || _vm.labelPlaceholder) + "\n      ")]) : _vm._e()]), _vm.icon ? _c('vs-icon', {
        staticClass: "icon-inputx notranslate vs-input--icon",
        class: {
          'icon-after': _vm.iconAfter,
          'icon-no-border': _vm.iconNoBorder
        },
        attrs: {
          "iconPack": _vm.iconPack,
          "icon": _vm.icon
        },
        on: {
          "click": _vm.focusInput
        }
      }) : _vm._e(), _c('transition', {
        attrs: {
          "name": "icon-validate"
        }
      }, [_vm.success || _vm.danger || _vm.warning ? _c('span', {
        staticClass: "input-icon-validate vs-input--icon-validate",
        class: {
          'icon-before': _vm.iconAfter
        }
      }, [_c('vs-icon', {
        class: {
          'icon-before': _vm.iconAfter
        },
        attrs: {
          "valIconPack": _vm.valIconPack,
          "icon": _vm.getIcon
        }
      })], 1) : _vm._e()])], 1), _c('transition-group', {
        on: {
          "before-enter": _vm.beforeEnter,
          "enter": _vm.enter,
          "leave": _vm.leave
        }
      }, [_vm.success ? _c('div', {
        key: "success",
        staticClass: "con-text-validation vs-input--text-validation"
      }, [_c('span', {
        staticClass: "span-text-validation span-text-validation-success vs-input--text-validation-span"
      }, [_vm._v("\n        " + _vm._s(_vm.successText) + "\n      ")])]) : _vm.danger ? _c('div', {
        key: "danger",
        staticClass: "con-text-validation span-text-validation-danger vs-input--text-validation-span"
      }, [_c('span', {
        staticClass: "span-text-validation"
      }, [_vm._v("\n        " + _vm._s(_vm.dangerText) + "\n      ")])]) : _vm.warning ? _c('div', {
        key: "warning",
        staticClass: "con-text-validation span-text-validation-warning vs-input--text-validation-span"
      }, [_c('span', {
        staticClass: "span-text-validation"
      }, [_vm._v("\n        " + _vm._s(_vm.warningText) + "\n      ")])]) : _vm._e(), _vm.descriptionText ? _c('div', {
        key: "description",
        staticClass: "con-text-validation span-text-validation vs-input--text-validation-span"
      }, [_c('span', {
        staticClass: "span-text-validation"
      }, [_vm._v("\n        " + _vm._s(_vm.descriptionText) + "\n      ")])]) : _vm._e()])], 1);
    };

    var vsInputvue_type_template_id_0943733c_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsInput/vsInput.vue?vue&type=template&id=0943733c&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsInput/vsInput.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsInputvue_type_script_lang_js_ = {
      name: 'VsInput',
      inheritAttrs: false,
      props: {
        value: {
          default: '',
          type: [String, Number]
        },
        labelPlaceholder: {
          default: null,
          type: [String, Number]
        },
        label: {
          default: null,
          type: [String, Number]
        },
        autofocus: {
          default: false,
          type: [Boolean, String]
        },
        icon: {
          default: null,
          type: String
        },
        iconAfter: {
          default: false,
          type: [Boolean, String]
        },
        iconNoBorder: {
          default: false,
          type: Boolean
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        color: {
          default: 'primary',
          type: String
        },
        success: {
          default: false,
          type: Boolean
        },
        danger: {
          default: false,
          type: Boolean
        },
        warning: {
          default: false,
          type: Boolean
        },
        successText: {
          default: null,
          type: String
        },
        dangerText: {
          default: null,
          type: String
        },
        warningText: {
          default: null,
          type: String
        },
        descriptionText: {
          default: null,
          type: String
        },
        size: {
          default: 'normal',
          type: String
        },
        valIconPack: {
          default: 'material-icons',
          type: String
        },
        valIconSuccess: {
          default: null,
          type: String
        },
        valIconDanger: {
          default: null,
          type: String
        },
        valIconWarning: {
          default: null,
          type: String
        }
      },
      inject: {
        elForm: {
          default: ''
        },
        elFormItem: {
          default: ''
        }
      },
      data: function data() {
        return {
          isFocus: false
        };
      },
      computed: {
        style: function style() {
          return {
            border: "1px solid ".concat(this.isFocus ? utils_color.getColor(this.color, 1) : 'rgba(0, 0, 0,.2)')
          };
        },
        styleLabel: function styleLabel() {
          return {
            color: this.isFocus ? utils_color.getColor(this.color, 1) : null
          };
        },
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            input: function input(evt) {
              _this.$emit('input', evt.target.value);
            },
            focus: function focus(evt) {
              _this.$emit('focus', evt);

              _this.changeFocus(true);
            },
            blur: function blur(evt) {
              _this.$emit('blur', evt);

              _this.changeFocus(false);
            }
          });
        },
        isValue: function isValue() {
          return this.labelPlaceholder ? true : !this.value;
        },
        getIcon: function getIcon() {
          return this.danger ? this.valIconDanger : this.warning ? this.valIconWarning : this.success ? this.valIconSuccess : '';
        }
      },
      methods: {
        // animation
        changeFocus: function changeFocus(booleanx) {
          this.isFocus = booleanx;
        },
        beforeEnter: function beforeEnter(el) {
          el.style.height = 0;
        },
        enter: function enter(el, done) {
          var h = el.scrollHeight;
          el.style.height = h + 'px';
          done();
        },
        leave: function leave(el) {
          el.style.height = 0 + 'px';
        },
        focusInput: function focusInput() {
          this.$refs.vsinput.focus();
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsInput/vsInput.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsInput_vsInputvue_type_script_lang_js_ = vsInputvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsInput/vsInput.vue

    /* normalize component */

    var vsInput_component = normalizeComponent(vsInput_vsInputvue_type_script_lang_js_, vsInputvue_type_template_id_0943733c_lang_html_render, vsInputvue_type_template_id_0943733c_lang_html_staticRenderFns, false, null, null, null);
    vsInput_component.options.__file = "vsInput.vue";
    /* harmony default export */

    var vsInput = vsInput_component.exports; // CONCATENATED MODULE: ./src/components/vsInput/index.js

    /* harmony default export */

    var components_vsInput = function (Vue) {
      Vue.component(vsInput.name, vsInput);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTabs/vsTabs.vue?vue&type=template&id=7ed4f590&lang=html&


    var vsTabsvue_type_template_id_7ed4f590_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "con-vs-tabs vs-tabs",
        class: ["vs-tabs-" + _vm.color, "vs-tabs-position-" + _vm.position]
      }, [_c('div', {
        staticClass: "con-ul-tabs"
      }, [_c('ul', {
        ref: "ul",
        staticClass: "ul-tabs vs-tabs--ul",
        class: ["ul-tabs-" + _vm.alignment]
      }, _vm._l(_vm.children, function (child, index) {
        return _c('li', {
          ref: "li",
          refInFor: true,
          staticClass: "vs-tabs--li",
          class: {
            'activeChild': _vm.childActive == index
          },
          style: _vm.childActive == index ? _vm.styleTab : {},
          on: {
            "mouseover": function ($event) {
              _vm.hover = true;
            },
            "mouseout": function ($event) {
              _vm.hover = false;
            }
          }
        }, [_c('button', _vm._g(_vm._b({
          staticClass: "vs-tabs--btn",
          style: _vm.styleAlignIcon(child.icon),
          attrs: {
            "type": "button"
          },
          on: {
            "click": function ($event) {
              return _vm.activeChild(index);
            }
          }
        }, 'button', child.attrs, false), child.listeners), [child.icon ? _c('vs-icon', {
          staticClass: "vs-tabs--btn-icon",
          attrs: {
            "icon-pack": child.iconPack,
            "icon": child.icon,
            "color": _vm.color
          }
        }) : _vm._e(), _c('span', [_vm._v(_vm._s(child.label))])], 1), child.tag ? _c('button', {
          staticClass: "vs-tabs--btn-tag",
          on: {
            "click": function ($event) {
              return _vm.clickTag(child);
            }
          }
        }, [_c('vs-icon', {
          attrs: {
            "icon-pack": child.iconPack,
            "icon": child.tag,
            "color": child.tagColor
          }
        })], 1) : _vm._e()]);
      }), 0), _c('span', {
        staticClass: "line-vs-tabs",
        style: _vm.stylex
      })]), _c('div', {
        staticClass: "con-slot-tabs"
      }, [_vm._t("default")], 2)]);
    };

    var vsTabsvue_type_template_id_7ed4f590_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTabs/vsTabs.vue?vue&type=template&id=7ed4f590&lang=html&
    // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsIcon/vsIcon.vue?vue&type=template&id=791767ed&

    var vsIconvue_type_template_id_791767ed_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('i', _vm._g(_vm._b({
        staticClass: "vs-icon notranslate icon-scale",
        class: [_vm.iconPack, _vm.iconPack != 'material-icons' ? _vm.icon : '', _vm.iconClass, _vm.getBg, _vm.getBgSize, {
          'round': _vm.round
        }],
        style: _vm.iconStyle
      }, 'i', _vm.$attrs, false), _vm.$listeners), [_vm._t("default", [_vm._v(_vm._s(_vm.iconPack == 'material-icons' ? _vm.icon : ''))])], 2);
    };

    var vsIconvue_type_template_id_791767ed_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsIcon/vsIcon.vue?vue&type=template&id=791767ed&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsIcon/vsIcon.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsIconvue_type_script_lang_js_ = {
      name: 'VsIcon',
      props: {
        icon: {
          default: null,
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        color: {
          default: null,
          type: String
        },
        bg: {
          default: null,
          type: String
        },
        size: {
          default: null,
          type: String
        },
        round: {
          default: false,
          type: Boolean
        }
      },
      computed: {
        iconClass: function iconClass() {
          var classes = {};
          classes[this.size] = true;

          if (utils_color.isColor(this.color)) {
            classes["vs-icon-".concat(this.color)] = true;
          }

          return classes;
        },
        iconStyle: function iconStyle() {
          var style = {
            width: /(px)/.test(this.size) ? this.size : /(em)/.test(this.size) ? this.size : null,
            height: /(px)/.test(this.size) ? this.size : /(em)/.test(this.size) ? this.size : null,
            'font-size': /(px)/.test(this.size) ? this.size : /(em)/.test(this.size) ? this.size : null,
            color: this.getColor,
            background: this.getBgColor
          };
          return style;
        },
        getBg: function getBg() {
          var classes = {};

          if (utils_color.isColor(this.bg)) {
            classes["con-vs-icon-bg-".concat(this.bg)] = true;
          }

          return classes;
        },
        getBgSize: function getBgSize() {
          var classes = {};

          if (['small', 'medium', 'large'].includes(this.size)) {
            classes["bg-".concat(this.size)] = true;
            classes['vs-icon-bg'] = true;
          }

          return classes;
        },
        getColor: function getColor() {
          return utils_color.isColor(this.color) ? this.color : this.color;
        },
        getBgColor: function getBgColor() {
          return utils_color.isColor(this.bg) ? this.bg : this.bg;
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsIcon/vsIcon.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsIcon_vsIconvue_type_script_lang_js_ = vsIconvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsIcon/vsIcon.vue

    /* normalize component */

    var vsIcon_component = normalizeComponent(vsIcon_vsIconvue_type_script_lang_js_, vsIconvue_type_template_id_791767ed_render, vsIconvue_type_template_id_791767ed_staticRenderFns, false, null, null, null);
    vsIcon_component.options.__file = "vsIcon.vue";
    /* harmony default export */

    var vsIcon = vsIcon_component.exports; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTabs/vsTabs.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsTabsvue_type_script_lang_js_ = {
      name: 'VsTabs',
      components: {
        vsIcon: vsIcon
      },
      props: {
        value: {
          default: 0,
          type: [Number, String]
        },
        color: {
          default: 'primary',
          type: String
        },
        tagColor: {
          default: 'primary',
          type: String
        },
        alignment: {
          default: 'left',
          type: String
        },
        position: {
          default: 'top',
          type: String
        }
      },
      data: function data() {
        return {
          topx: 'auto',
          heightx: 2,
          hover: false,
          children: [],
          childActive: 0,
          leftx: 0,
          widthx: 0,
          these: false
        };
      },
      computed: {
        styleTab: function styleTab() {
          return {
            color: utils_color.getColor(this.color, 1)
          };
        },
        stylex: function stylex() {
          return {
            top: "".concat(this.topx, "px"),
            left: "".concat(this.leftx, "px"),
            width: "".concat(this.widthx, "px"),
            height: "".concat(this.heightx, "px"),
            background: "linear-gradient(30deg, ".concat(utils_color.getColor(this.color, 1), " 0%, ").concat(utils_color.getColor(this.color, .5), " 100%)"),
            boxShadow: "0px 0px 8px 0px ".concat(utils_color.getColor(this.color, .5)),
            transform: "scaleX(".concat(this.these ? 1.3 : 1, ")")
          };
        }
      },
      watch: {
        value: function value(index) {
          var activeIndex = this.parseIndex(index);
          this.activeChild(activeIndex);
        }
      },
      mounted: function mounted() {
        var _this = this;

        var activeIndex = this.parseIndex(this.value);
        this.childActive = activeIndex;
        this.$nextTick(function () {
          _this.activeChild(activeIndex, true);
        });
      },
      methods: {
        clickTag: function clickTag(child) {
          this.$emit('click-tag', child);
        },
        styleAlignIcon: function styleAlignIcon(icon) {
          return icon ? 'display:flex;align-items:center' : '';
        },
        parseIndex: function parseIndex(index) {
          var activeIndex = this.childActive;

          if (index < 0) {
            activeIndex = 0;
          } else if (index >= this.$children.length) {
            activeIndex = this.$children.length - 1;
          } else if (typeof this.$children[index].$attrs.disabled === 'undefined') {
            activeIndex = parseInt(index);
          }

          return activeIndex;
        },
        activeChild: function activeChild(index, initialAnimation) {
          var _this2 = this;

          initialAnimation = !!initialAnimation;
          var elem = this.$refs.li[index];

          if (this.childActive == index && !initialAnimation) {
            this.these = true;
            elem.classList.add('isActive');
            setTimeout(function () {
              elem.classList.remove('isActive');
              _this2.these = false;
            }, 200);
          }

          this.$children.map(function (item, item_index) {
            if (item_index != index) {
              item.active = false;
            }
          });

          if (this.childActive > index) {
            this.$children[index].invert = true;
            this.$children[this.childActive].invert = false;
          } else {
            this.$children[this.childActive].invert = true;
            this.$children[index].invert = false;
          }

          this.$children[index].active = true;
          this.childActive = index;
          this.$emit('input', this.childActive);

          if (this.position == 'left' || this.position == 'right') {
            this.$children[index].vertical = true;
          }

          this.changePositionLine(elem, initialAnimation);
        },
        changePositionLine: function changePositionLine(elem, initialAnimation) {
          var _this3 = this;

          if (this.position == 'left' || this.position == 'right') {
            this.topx = elem.offsetTop;
            this.heightx = elem.offsetHeight;
            this.widthx = 2;
          } else {
            var update = function update() {
              _this3.leftx = elem.offsetLeft;
              _this3.widthx = elem.offsetWidth;
            };

            if (!initialAnimation) {
              update();
            } else {
              setTimeout(update, 100);
            }
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsTabs/vsTabs.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTabs_vsTabsvue_type_script_lang_js_ = vsTabsvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTabs/vsTabs.vue

    /* normalize component */

    var vsTabs_component = normalizeComponent(vsTabs_vsTabsvue_type_script_lang_js_, vsTabsvue_type_template_id_7ed4f590_lang_html_render, vsTabsvue_type_template_id_7ed4f590_lang_html_staticRenderFns, false, null, null, null);
    vsTabs_component.options.__file = "vsTabs.vue";
    /* harmony default export */

    var vsTabs = vsTabs_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTabs/vsTab.vue?vue&type=template&id=b4de5d00&lang=html&

    var vsTabvue_type_template_id_b4de5d00_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": _vm.invert ? _vm.vertical ? 'fade-tab-vertical-invert' : 'fade-tab-invert' : _vm.vertical ? 'fade-tab-vertical' : 'fade-tab'
        }
      }, [_vm.active ? _c('div', {
        staticClass: "con-tab vs-tabs--content"
      }, [_vm._t("default")], 2) : _vm._e()]);
    };

    var vsTabvue_type_template_id_b4de5d00_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTabs/vsTab.vue?vue&type=template&id=b4de5d00&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTabs/vsTab.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsTabvue_type_script_lang_js_ = {
      name: 'VsTab',
      inheritAttrs: false,
      props: {
        label: {
          default: 'Label',
          type: String
        },
        icon: {
          default: '',
          type: String
        },
        tag: {
          default: '',
          type: String
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        }
      },
      data: function data() {
        return {
          vertical: false,
          active: false,
          id: null,
          invert: false
        };
      },
      mounted: function mounted() {
        this.id = this.$parent.children.length;
        this.$parent.children.push({
          label: this.label,
          icon: this.icon,
          iconPack: this.iconPack,
          tag: this.tag,
          id: this.$parent.children.length,
          listeners: this.$listeners,
          attrs: this.$attrs
        });
      }
    }; // CONCATENATED MODULE: ./src/components/vsTabs/vsTab.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTabs_vsTabvue_type_script_lang_js_ = vsTabvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTabs/vsTab.vue

    /* normalize component */

    var vsTab_component = normalizeComponent(vsTabs_vsTabvue_type_script_lang_js_, vsTabvue_type_template_id_b4de5d00_lang_html_render, vsTabvue_type_template_id_b4de5d00_lang_html_staticRenderFns, false, null, null, null);
    vsTab_component.options.__file = "vsTab.vue";
    /* harmony default export */

    var vsTab = vsTab_component.exports; // CONCATENATED MODULE: ./src/components/vsTabs/index.js

    /* harmony default export */

    var components_vsTabs = function (Vue) {
      Vue.component(vsTabs.name, vsTabs);
      Vue.component(vsTab.name, vsTab);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSlider/vsSlider.vue?vue&type=template&id=2e194883&lang=html&


    var vsSlidervue_type_template_id_2e194883_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "con-vs-slider",
        class: ["vs-slider-" + _vm.color, {
          'disabledx': _vm.disabled
        }],
        on: {
          "mousewheel": function ($event) {
            $event.preventDefault();
            return _vm.mousewheelx($event);
          },
          "keydown": [function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) {
              return null;
            }

            if ('button' in $event && $event.button !== 0) {
              return null;
            }

            return _vm.keydownLeft($event);
          }, function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) {
              return null;
            }

            if ('button' in $event && $event.button !== 2) {
              return null;
            }

            return _vm.keydownRight($event);
          }]
        }
      }, [_c('button', {
        ref: "slider",
        staticClass: "vs-slider",
        attrs: {
          "disabled": _vm.disabled
        },
        on: {
          "click": function ($event) {
            _vm.clickSlider($event), _vm.actived = true;
          }
        }
      }, [_c('span', {
        staticClass: "vs-slider-line-one",
        class: {
          'hasTransition': _vm.effect
        },
        style: _vm.styleLineOne
      }), _c('span', {
        staticClass: "vs-slider-line-two"
      }), _c('span', {
        staticClass: "vs-slider-line-efect",
        class: {
          'run-effect': _vm.effect
        },
        style: _vm.styleEfect
      }), _vm._l(_vm.countTicks, function (tick, index) {
        return _vm.ticks && tick ? _c('span', {
          staticClass: "vs-slider--tick",
          class: {
            'isEnd': index == _vm.countTicks - 1
          },
          style: _vm.styleTicks(index)
        }) : _vm._e();
      })], 2), _c('button', {
        ref: "circle1",
        staticClass: "vs-circle-slider vs-circles-slider vs-slider--circles vs-slider--circle",
        class: {
          'hasTransition': _vm.effect,
          'isEquals': _vm.isEquals,
          'changeValue': _vm.changeValue,
          'isEndValue': _vm.value == _vm.max
        },
        style: _vm.styleCircle,
        attrs: {
          "disabled": _vm.disabled
        },
        on: {
          "touchstart": function ($event) {
            _vm.activeFocus($event), _vm.actived = true;
          },
          "mousedown": function ($event) {
            _vm.activeFocus($event), _vm.actived = true;
          }
        }
      }, [_c('span', {
        staticClass: "text-circle-slider vs-slider--circle-text",
        style: _vm.styleText
      }, [_vm._v("\n      " + _vm._s(_vm.valueCircle1) + "\n      "), _vm.textFixed ? _c('span', [_vm._v("\n       " + _vm._s(_vm.textFixed) + "\n      ")]) : _vm._e(), _c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      })], 1)]), Array.isArray(_vm.value) ? _c('button', {
        ref: "circle2",
        staticClass: "vs-circle-slider-two vs-circles-slider vs-slider--circles vs-slider--circle-two",
        class: {
          'hasTransition': _vm.effect,
          'isEquals': _vm.isEquals,
          'changeValue': _vm.changeValue,
          'isEndValue': _vm.value == _vm.max
        },
        style: _vm.styleCircleTwo,
        attrs: {
          "disabled": _vm.disabled
        },
        on: {
          "touchstart": function ($event) {
            _vm.activeFocus($event), _vm.two = true, _vm.actived = true;
          },
          "mousedown": function ($event) {
            _vm.activeFocus($event), _vm.two = true, _vm.actived = true;
          }
        }
      }, [_c('span', {
        staticClass: "text-circle-slider vs-slider--circle-text",
        style: _vm.styleText
      }, [_vm._v("\n      " + _vm._s(_vm.valueCircle2) + "\n      "), _vm.textFixed ? _c('span', [_vm._v("\n        " + _vm._s(_vm.textFixed) + "\n      ")]) : _vm._e(), _vm.icon ? _c('i', {
        staticClass: "material-icons notranslate",
        attrs: {
          "translate": "no"
        }
      }, [_vm._v("\n        " + _vm._s(_vm.icon) + "\n      ")]) : _vm._e()])]) : _vm._e()]);
    };

    var vsSlidervue_type_template_id_2e194883_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSlider/vsSlider.vue?vue&type=template&id=2e194883&lang=html&
    // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.math.sign.js

    var es6_math_sign = __webpack_require__("696d"); // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSlider/vsSlider.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */


    var vsSlidervue_type_script_lang_js_ = {
      name: "VsSlider",
      props: {
        value: {},
        disabled: {
          default: false,
          type: [Boolean, String]
        },
        color: {
          default: "primary",
          type: String
        },
        max: {
          default: 100,
          type: [Number, String]
        },
        min: {
          default: 0,
          type: Number
        },
        ticks: {
          default: false,
          type: Boolean
        },
        step: {
          default: 1,
          type: [Number, String]
        },
        stepDecimals: {
          type: Boolean,
          required: false,
          default: false
        },
        icon: {
          default: null,
          type: String
        },
        iconPack: {
          default: "material-icons",
          type: String
        },
        textFixed: {
          default: null,
          type: String
        }
      },
      data: function data() {
        return {
          leftx: 0,
          leftTwo: 0,
          effect: false,
          two: false,
          actived: false,
          changeValue: false,
          valueCircle1: 0,
          valueCircle2: 0
        };
      },
      computed: {
        isEquals: function isEquals() {
          return Array.isArray(this.value) ? this.value[0] == this.value[1] : false;
        },
        countTicks: function countTicks() {
          return this.max + 1;
        },

        /*
         * styles component
         */
        styleSlider: function styleSlider() {
          return {
            background: utils_color.getColor(this.color, 1)
          };
        },
        styleLineOne: function styleLineOne() {
          var widthx = this.leftTwo - this.leftx;
          var leftx = this.leftx;

          if (this.leftx > this.leftTwo) {
            widthx = this.leftx - this.leftTwo;
            leftx = this.leftTwo;
          }

          return {
            width: "".concat(widthx, "%"),
            left: "".concat(leftx, "%"),
            background: utils_color.getColor(this.color, 1)
          };
        },
        styleCircle: function styleCircle() {
          return {
            left: "".concat(this.leftx, "%"),
            border: "2px solid ".concat(utils_color.getColor(this.color, 1))
          };
        },
        styleCircleTwo: function styleCircleTwo() {
          return {
            left: "".concat(this.leftTwo, "%"),
            border: "2px solid ".concat(utils_color.getColor(this.color, 1))
          };
        },
        styleEfect: function styleEfect() {
          return {
            left: "".concat(this.leftx, "%"),
            background: utils_color.getColor(this.color, 1)
          };
        },
        styleText: function styleText() {
          return {
            background: utils_color.getColor(this.color, 1)
          };
        }
      },
      watch: {
        value: function value() {
          var _this = this;

          if (!this.actived) {
            this.changePosition();
          }

          this.changeValue = true;
          setTimeout(function () {
            _this.changeValue = false;
          }, 300);
          this.$emit("change", this.value);
        },
        leftx: function leftx() {
          if (Array.isArray(this.value)) {
            if (this.leftx > this.leftTwo) {
              this.valueCircle1 = this.value[1];
            } else {
              this.valueCircle1 = this.value[0];
            }
          } else {
            this.valueCircle1 = this.value;
          }
        },
        leftTwo: {
          handler: function handler() {
            if (this.leftTwo > this.leftx) {
              this.valueCircle2 = this.value[1];
            } else {
              this.valueCircle2 = this.value[0];
            }
          },
          deep: true
        }
      },
      mounted: function mounted() {
        this.changePosition();
      },
      methods: {
        mousewheelx: function mousewheelx(evt) {
          if (!Array.isArray(this.value)) {
            if (evt.wheelDelta > 0) {
              var val = parseFloat(this.value) + parseFloat(this.step);
              val = this.stepDecimals ? this.toDecimal(val) : Math.round(val);

              if (this.value >= this.max) {
                val = this.max;
              }

              this.leftx = val;
              this.$emit("input", val);
            } else {
              var _val = parseFloat(this.value) - parseFloat(this.step);

              _val = this.stepDecimals ? this.toDecimal(_val) : Math.round(_val);

              if (this.value <= this.min) {
                _val = this.min;
              }

              this.leftx = _val;
              this.$emit("input", _val);
            }
          }
        },
        keydownLeft: function keydownLeft() {
          if (!Array.isArray(this.value)) {
            var val = parseFloat(this.value) - parseFloat(this.step);
            val = this.stepDecimals ? this.toDecimal(val) : Math.round(val);

            if (this.value == this.min) {
              val = this.min;
            }

            this.leftx = val;
            this.$emit("input", val);
          }
        },
        keydownRight: function keydownRight() {
          if (!Array.isArray(this.value)) {
            var val = parseFloat(this.value) + parseFloat(this.step);
            val = this.stepDecimals ? this.toDecimal(val) : Math.round(val);

            if (this.value >= this.max) {
              val = this.max;
            }

            this.leftx = val;
            this.$emit("input", val);
          }
        },
        changePosition: function changePosition() {
          if (Array.isArray(this.value)) {
            this.leftx = (this.value[1] - this.min) / (this.max - this.min) * 100;
            this.leftTwo = (this.value[0] - this.min) / (this.max - this.min) * 100;
          } else {
            this.leftx = (this.value - this.min) / (this.max - this.min) * 100;
          }
        },
        styleTicks: function styleTicks(index) {
          var lengthPerStep = 100 / ((this.max - this.min) / this.step);
          var steps = index / lengthPerStep;
          return {
            left: steps * lengthPerStep + "%"
          };
        },
        activeFocus: function activeFocus() {
          window.addEventListener("mousemove", this.mouseMovex);
          window.addEventListener("mouseup", this.removeEvents);
          window.addEventListener("touchmove", this.mouseMovex);
          window.addEventListener("touchend", this.removeEvents);
        },
        mouseMovex: function mouseMovex(evt) {
          var slider = this.$refs.slider;
          var leftx;
          /*
           * change position left circle and bar
           */

          if (evt.type == "touchmove") {
            leftx = event.targetTouches[0].clientX - slider.getBoundingClientRect().left;
          } else {
            leftx = evt.clientX - slider.getBoundingClientRect().left;
          }

          if (Math.sign(leftx) == -1) {
            leftx = 0;
          } else if (leftx > slider.clientWidth) {
            leftx = slider.clientWidth;
          }

          this.changeLeft(leftx);
        },
        removeEvents: function removeEvents() {
          this.two = this.actived = false;
          window.removeEventListener("mouseup", this.removeEvents);
          window.removeEventListener("mousemove", this.mouseMovex);
          window.removeEventListener("touchmove", this.mouseMovex);
          window.removeEventListener("touchend", this.removeEvents);
        },
        clickSlider: function clickSlider(evt) {
          var _this2 = this;

          var slider = this.$refs.slider;
          var leftx = evt.clientX - slider.getBoundingClientRect().left;
          this.effect = true;
          setTimeout(function () {
            _this2.effect = false;
          }, 200);
          var percentX = Math.round(leftx / slider.clientWidth * 100);

          if (Array.isArray(this.value)) {
            if (Math.abs(percentX - this.leftx) > Math.abs(percentX - this.leftTwo)) {
              this.two = true;
            } else {
              this.two = false;
            }
          }

          this.changeLeft(leftx);
        },
        changeLeft: function changeLeft(leftx) {
          var slider = this.$refs.slider;
          var percentX = leftx / slider.clientWidth * 100;
          var lengthPerStep = 100 / ((this.max - this.min) / this.step);
          var steps = Math.round(percentX / lengthPerStep);
          var val = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
          val = this.stepDecimals ? this.toDecimal(val) : Math.round(val);

          if (this.ticks) {
            if (val > this.max) {
              val = this.max;
              this[this.two ? "leftTwo" : "leftx"] = 100;
            } else {
              this[this.two ? "leftTwo" : "leftx"] = steps * lengthPerStep;
            }
          } else {
            this[this.two ? "leftTwo" : "leftx"] = Math.round(steps * lengthPerStep);
          }

          if (Array.isArray(this.value)) {
            var valueNew = val;

            if (val == this.max) {
              valueNew = this.max;
            }

            var vals = this.value;
            var min = Math.round(this.leftTwo / 100 * (this.max / this.step)) * this.step;
            var max = Math.round(this.leftx / 100 * (this.max / this.step)) * this.step;

            if (this.two) {
              if (min < max) {
                this.$emit("input", [valueNew, vals[1]]);
              } else if (min > max) {
                this.$emit("input", [vals[0], valueNew]);
              } else {
                this.$emit("input", [valueNew, valueNew]);
              }
            } else {
              if (min > max) {
                this.$emit("input", [valueNew, vals[1]]);
              } else if (min < max) {
                this.$emit("input", [vals[0], valueNew]);
              } else {
                this.$emit("input", [valueNew, valueNew]);
              }
            }
          } else {
            this.$emit("input", val);
          }
        },
        toDecimal: function toDecimal(value) {
          return parseFloat(value.toFixed(1));
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSlider/vsSlider.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSlider_vsSlidervue_type_script_lang_js_ = vsSlidervue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSlider/vsSlider.vue

    /* normalize component */

    var vsSlider_component = normalizeComponent(vsSlider_vsSlidervue_type_script_lang_js_, vsSlidervue_type_template_id_2e194883_lang_html_render, vsSlidervue_type_template_id_2e194883_lang_html_staticRenderFns, false, null, null, null);
    vsSlider_component.options.__file = "vsSlider.vue";
    /* harmony default export */

    var vsSlider = vsSlider_component.exports; // CONCATENATED MODULE: ./src/components/vsSlider/index.js

    /* harmony default export */

    var components_vsSlider = function (Vue) {
      Vue.component(vsSlider.name, vsSlider);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsInputNumber/vsInputNumber.vue?vue&type=template&id=ecaa5d0a&lang=html&


    var vsInputNumbervue_type_template_id_ecaa5d0a_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-input-number",
        class: ["vs-input-number-size-" + _vm.size, "vs-input-number-" + _vm.color, {
          'isChangeValue': _vm.isChangeValue
        }]
      }, [_c('button', {
        directives: [{
          name: "repeat-click",
          rawName: "v-repeat-click",
          value: _vm.less,
          expression: "less"
        }],
        staticClass: "btn-less vs-input-number--button-less",
        class: {
          limit: _vm.value <= _vm.min
        },
        style: {
          background: _vm.getColor
        },
        attrs: {
          "disabled": _vm.$attrs.disabled,
          "type": "button"
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.iconDec
        }
      })], 1), _vm.label ? _c('span', [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _c('input', _vm._g(_vm._b({
        ref: "input",
        staticClass: "vs-input-number--input",
        style: _vm.styleInput,
        attrs: {
          "type": "number"
        },
        domProps: {
          "value": _vm.value
        }
      }, 'input', _vm.$attrs, false), _vm.listeners)), _c('button', {
        directives: [{
          name: "repeat-click",
          rawName: "v-repeat-click",
          value: _vm.plus,
          expression: "plus"
        }],
        staticClass: "btn-plus vs-input-number--button-plus",
        class: {
          limit: _vm.value >= _vm.max && _vm.max !== null
        },
        style: {
          background: _vm.getColor
        },
        attrs: {
          "disabled": _vm.$attrs.disabled,
          "type": "button"
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.iconInc
        }
      })], 1)]);
    };

    var vsInputNumbervue_type_template_id_ecaa5d0a_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsInputNumber/vsInputNumber.vue?vue&type=template&id=ecaa5d0a&lang=html&
    // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.regexp.to-string.js

    var es6_regexp_to_string = __webpack_require__("b5d7"); // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsInputNumber/vsInputNumber.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */


    var vsInputNumbervue_type_script_lang_js_ = {
      name: 'VsInputNumber',
      directives: {
        repeatClick: {
          bind: function bind(el, binding, vnode) {
            var intervalx = null;
            var startT;

            var functionx = function functionx() {
              return vnode.context[binding.expression].apply();
            };

            var bucle = function bucle() {
              if (new Date() - startT < 100) {
                functionx();
              }

              clearInterval(intervalx);
              intervalx = null;
            };

            var eventx = function eventx(e) {
              if (e.button !== 0) return;
              startT = new Date();

              var escuchando = function escuchando() {
                if (bucle) {
                  bucle.apply(this, arguments);
                }

                el.removeEventListener('mouseup', escuchando, false);
              };

              el.addEventListener('mouseleave', escuchando, false);
              el.addEventListener('mouseup', escuchando, false);
              clearInterval(intervalx);
              intervalx = setInterval(functionx, 100);
            };

            el.addEventListener('mousedown', eventx, false);
          }
        }
      },
      inheritAttrs: false,
      props: {
        value: {},
        color: {
          default: 'primary',
          type: String
        },
        label: {
          default: null,
          type: String
        },
        max: {
          default: null,
          type: [Number, String]
        },
        min: {
          default: 0,
          type: [Number, String]
        },
        size: {
          default: null,
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        iconDec: {
          default: 'remove',
          type: String
        },
        iconInc: {
          default: 'add',
          type: String
        },
        step: {
          default: 1,
          type: [Number, String]
        }
      },
      data: function data() {
        return {
          isChangeValue: false
        };
      },
      computed: {
        styleInput: function styleInput() {
          return {
            width: "".concat(this.getLength, "px")
          };
        },
        getLength: function getLength() {
          if (this.value) {
            return this.value.toString().length * 9.1;
          } else {
            return 0;
          }
        },
        getColor: function getColor() {
          return utils_color.getColor(this.color, 1);
        },
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            blur: function blur(evt) {
              if (parseFloat(_this.value) > parseFloat(_this.max)) {
                _this.$emit('input', _this.max);
              } else if (parseFloat(_this.value) < parseFloat(_this.min)) {
                _this.$emit('input', _this.min);

                _this.$emit('blur', evt);
              }
            },
            input: function input(evt) {
              _this.$emit('input', evt.target.value);
            }
          });
        }
      },
      watch: {
        value: function value() {
          var _this2 = this;

          this.isChangeValue = true;
          setTimeout(function () {
            _this2.isChangeValue = false;
          }, 200);
        }
      },
      methods: {
        plus: function plus() {
          var newValue;

          if (!this.value) {
            newValue = 0;
          }

          if (this.max ? parseFloat(this.value) < parseFloat(this.max) : true) {
            newValue = parseFloat(this.value) + parseFloat(this.step);
            this.$emit('input', newValue);
          }
        },
        less: function less() {
          var newValue;

          if (!this.value) {
            newValue = 0;
          }

          if (this.min ? parseFloat(this.value) > parseFloat(this.min) : true) {
            newValue = parseFloat(this.value) - parseFloat(this.step);
            this.$emit('input', newValue);
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsInputNumber/vsInputNumber.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsInputNumber_vsInputNumbervue_type_script_lang_js_ = vsInputNumbervue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsInputNumber/vsInputNumber.vue

    /* normalize component */

    var vsInputNumber_component = normalizeComponent(vsInputNumber_vsInputNumbervue_type_script_lang_js_, vsInputNumbervue_type_template_id_ecaa5d0a_lang_html_render, vsInputNumbervue_type_template_id_ecaa5d0a_lang_html_staticRenderFns, false, null, null, null);
    vsInputNumber_component.options.__file = "vsInputNumber.vue";
    /* harmony default export */

    var vsInputNumber = vsInputNumber_component.exports; // CONCATENATED MODULE: ./src/components/vsInputNumber/index.js

    /* harmony default export */

    var components_vsInputNumber = function (Vue) {
      Vue.component(vsInputNumber.name, vsInputNumber);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTooltip/vsTooltip.vue?vue&type=template&id=cd60883c&


    var vsTooltipvue_type_template_id_cd60883c_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        ref: "convstooltip",
        staticClass: "con-vs-tooltip",
        on: {
          "mouseleave": _vm.mouseleavex,
          "mouseenter": _vm.mouseenterx
        }
      }, [_c('transition', {
        attrs: {
          "name": "tooltip-fade"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.activeTooltip,
          expression: "activeTooltip"
        }],
        ref: "vstooltip",
        staticClass: "vs-tooltip",
        class: ["vs-tooltip-" + (_vm.positionx || _vm.position), "vs-tooltip-" + _vm.color, {
          'after-none': _vm.noneAfter
        }],
        style: _vm.style
      }, [_vm.title ? _c('h4', [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v("\n      " + _vm._s(_vm.text) + "\n    ")])]), _vm._t("default")], 2);
    };

    var vsTooltipvue_type_template_id_cd60883c_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTooltip/vsTooltip.vue?vue&type=template&id=cd60883c&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTooltip/vsTooltip.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsTooltipvue_type_script_lang_js_ = {
      name: 'VsTooltip',
      props: {
        title: {
          default: null,
          type: [String, Number]
        },
        text: {
          default: null,
          type: [String, Number]
        },
        color: {
          default: null,
          type: String
        },
        position: {
          default: 'top',
          type: String
        },
        delay: {
          default: '0s',
          type: [Number, String]
        },
        active: {
          default: true,
          type: [Boolean]
        }
      },
      data: function data() {
        return {
          cords: {},
          activeTooltip: false,
          widthx: 'auto',
          positionx: null,
          noneAfter: false
        };
      },
      computed: {
        style: function style() {
          return {
            left: this.cords.left,
            top: this.cords.top,
            transitionDelay: this.activeTooltip ? this.delay : '0s',
            background: utils_color.getColor(this.color, 1),
            width: this.widthx
          };
        }
      },
      mounted: function mounted() {// utils.insertBody(this.$refs.vstooltip)
      },
      updated: function updated() {
        var nodes = this.$refs.convstooltip.childNodes.length;

        if (nodes === 1) {
          this.activeTooltip = false;
        }
      },
      methods: {
        mouseenterx: function mouseenterx() {
          var _this = this;

          if (this.active) {
            this.activeTooltip = true;
            this.$nextTick(function () {
              utils.insertBody(_this.$refs.vstooltip);

              _this.changePosition(_this.$refs.convstooltip, _this.$refs.vstooltip);
            });
          }
        },
        mouseleavex: function mouseleavex() {
          this.activeTooltip = false;

          if (this.$refs.vstooltip) {
            utils.removeBody(this.$refs.vstooltip);
          }
        },
        changePosition: function changePosition(elxEvent, tooltip) {
          this.noneAfter = false;
          this.positionx = null;
          var elx = elxEvent.closest('.con-vs-tooltip');
          var scrollTopx = window.pageYOffset || document.documentElement.scrollTop;
          var topx = elx.getBoundingClientRect().top + scrollTopx - tooltip.clientHeight - 4;
          var leftx = elx.getBoundingClientRect().left - tooltip.clientWidth / 2 + elx.clientWidth / 2;
          var widthx = elx.clientWidth;

          if (this.position === 'bottom') {
            topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight + 4;
          } else if (this.position === 'left') {
            leftx = elx.getBoundingClientRect().left - tooltip.clientWidth - 4;
            topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight / 2 - tooltip.clientHeight / 2;

            if (Math.sign(leftx) === -1) {
              leftx = elx.getBoundingClientRect().left;
              topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight + 4;
              this.positionx = 'bottom';
              this.noneAfter = true;
            }
          } else if (this.position === 'right') {
            leftx = elx.getBoundingClientRect().left + elx.clientWidth + 4;
            topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight / 2 - tooltip.clientHeight / 2;

            if (window.innerWidth - (leftx + tooltip.clientWidth) <= 20) {
              leftx = elx.getBoundingClientRect().left - tooltip.clientWidth / 2 - 10;
              topx = elx.getBoundingClientRect().top + scrollTopx + elx.clientHeight + 4;
              this.positionx = 'bottom';
              this.noneAfter = true;
            }
          }

          this.cords = {
            left: "".concat(leftx, "px"),
            top: "".concat(topx, "px"),
            width: "".concat(widthx, "px")
          };
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsTooltip/vsTooltip.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTooltip_vsTooltipvue_type_script_lang_js_ = vsTooltipvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTooltip/vsTooltip.vue

    /* normalize component */

    var vsTooltip_component = normalizeComponent(vsTooltip_vsTooltipvue_type_script_lang_js_, vsTooltipvue_type_template_id_cd60883c_render, vsTooltipvue_type_template_id_cd60883c_staticRenderFns, false, null, null, null);
    vsTooltip_component.options.__file = "vsTooltip.vue";
    /* harmony default export */

    var vsTooltip = vsTooltip_component.exports; // CONCATENATED MODULE: ./src/components/vsTooltip/index.js

    /* harmony default export */

    var components_vsTooltip = function (Vue) {
      Vue.component(vsTooltip.name, vsTooltip);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsUpload/vsUpload.vue?vue&type=template&id=6717fc70&


    var vsUploadvue_type_template_id_6717fc70_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "con-upload"
      }, [_vm.viewActive ? _c('view-upload', {
        attrs: {
          "src": _vm.viewSrc
        }
      }) : _vm._e(), _c('div', {
        staticClass: "con-img-upload"
      }, [_vm._l(_vm.getFilesFilter, function (img, index) {
        return _c('div', {
          key: index,
          staticClass: "img-upload",
          class: {
            'fileError': img.error,
            'removeItem': _vm.itemRemove.includes(index)
          }
        }, [_c('button', {
          staticClass: "btn-x-file",
          attrs: {
            "type": "button"
          },
          on: {
            "click": function ($event) {
              return _vm.removeFile(index);
            }
          }
        }, [_c('i', {
          staticClass: "material-icons notranslate",
          attrs: {
            "translate": "no"
          }
        }, [_vm._v("\n            clear\n          ")])]), _vm.showUploadButton ? _c('button', {
          staticClass: "btn-upload-file",
          class: {
            'on-progress': img.percent,
            'ready-progress': img.percent >= 100
          },
          style: {
            height: img.percent + "%"
          },
          on: {
            "click": function ($event) {
              return _vm.upload(index);
            }
          }
        }, [_c('i', {
          staticClass: "material-icons notranslate",
          attrs: {
            "translate": "no"
          }
        }, [_vm._v("\n            " + _vm._s(img.percent >= 100 ? img.error ? 'report_problem' : 'cloud_done' : 'cloud_upload') + "\n          ")]), _c('span', [_vm._v(_vm._s(img.percent) + " %")])]) : _vm._e(), img.src ? _c('img', {
          key: index,
          style: {
            maxWidth: img.orientation == 'h' ? '100%' : 'none',
            maxHeight: img.orientation == 'w' ? '100%' : 'none'
          },
          attrs: {
            "src": img.src
          },
          on: {
            "touchend": function ($event) {
              return _vm.viewImage(img.src, $event);
            },
            "click": function ($event) {
              return _vm.viewImage(img.src, $event);
            }
          }
        }) : _vm._e(), !img.src ? _c('h4', {
          staticClass: "text-archive"
        }, [_c('i', {
          staticClass: "material-icons notranslate",
          attrs: {
            "translate": "no"
          }
        }, [_vm._v("\n            description\n          ")]), _c('span', [_vm._v("\n            " + _vm._s(img.name) + "\n          ")])]) : _vm._e()]);
      }), _c('div', {
        staticClass: "con-input-upload",
        class: {
          'on-progress-all-upload': _vm.percent != 0,
          'is-ready-all-upload': _vm.percent >= 100,
          'disabled-upload': _vm.$attrs.hasOwnProperty('disabled') || _vm.limit ? _vm.srcs.length - _vm.itemRemove.length >= Number(_vm.limit) : false
        }
      }, [_c('input', _vm._b({
        ref: "fileInput",
        attrs: {
          "disabled": _vm.$attrs.disabled || _vm.limit ? _vm.srcs.length - _vm.itemRemove.length >= Number(_vm.limit) : false,
          "type": "file"
        },
        on: {
          "change": _vm.getFiles
        }
      }, 'input', _vm.$attrs, false)), _c('span', {
        staticClass: "text-input"
      }, [_vm._v("\n        " + _vm._s(_vm.text) + "\n      ")]), _c('span', {
        staticClass: "input-progress",
        style: {
          width: _vm.percent + "%"
        }
      }), _vm.showUploadButton ? _c('button', {
        staticClass: "btn-upload-all vs-upload--button-upload",
        attrs: {
          "disabled": _vm.filesx.length == 0,
          "type": "button",
          "title": "Upload"
        },
        on: {
          "click": function ($event) {
            return _vm.upload('all');
          }
        }
      }, [_c('i', {
        staticClass: "material-icons notranslate",
        attrs: {
          "translate": "no"
        }
      }, [_vm._v("\n          cloud_upload\n        ")])]) : _vm._e()])], 2)], 1);
    };

    var vsUploadvue_type_template_id_6717fc70_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsUpload/vsUpload.vue?vue&type=template&id=6717fc70&
    // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.math.trunc.js

    var es6_math_trunc = __webpack_require__("b9ae"); // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsUpload/viewUpload.vue?vue&type=template&id=31591ed5&


    var viewUploadvue_type_template_id_31591ed5_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "view-upload"
        }
      }, [_c('div', {
        ref: "view",
        staticClass: "view-upload",
        on: {
          "click": _vm.closeView
        }
      }, [_c('img', {
        attrs: {
          "src": _vm.src,
          "alt": "image"
        }
      })])]);
    };

    var viewUploadvue_type_template_id_31591ed5_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsUpload/viewUpload.vue?vue&type=template&id=31591ed5&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsUpload/viewUpload.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var viewUploadvue_type_script_lang_js_ = {
      name: 'ViewUpload',
      props: {
        active: {
          default: false,
          type: Boolean
        },
        src: {
          default: null,
          type: String
        }
      },
      mounted: function mounted() {
        utils.insertBody(this.$refs.view);
      },
      upload: function upload() {
        utils.insertBody(this.$refs.view);
      },
      methods: {
        closeView: function closeView(evt) {
          if (evt.target.tagName != 'IMG') {
            this.$parent.viewActive = false;
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsUpload/viewUpload.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsUpload_viewUploadvue_type_script_lang_js_ = viewUploadvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsUpload/viewUpload.vue

    /* normalize component */

    var viewUpload_component = normalizeComponent(vsUpload_viewUploadvue_type_script_lang_js_, viewUploadvue_type_template_id_31591ed5_render, viewUploadvue_type_template_id_31591ed5_staticRenderFns, false, null, null, null);
    viewUpload_component.options.__file = "viewUpload.vue";
    /* harmony default export */

    var viewUpload = viewUpload_component.exports; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsUpload/vsUpload.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var lastTap = 0;
    /* harmony default export */

    var vsUploadvue_type_script_lang_js_ = {
      name: 'VsUpload',
      components: {
        viewUpload: viewUpload
      },
      inheritAttrs: false,
      props: {
        fileName: {
          default: null,
          type: String
        },
        text: {
          default: 'Upload File',
          type: String
        },
        textMax: {
          default: 'Maximum of files reached',
          type: String
        },
        limit: {
          default: null,
          type: [Number, String]
        },
        action: {
          default: null,
          type: String
        },
        headers: {
          default: null,
          type: Object
        },
        data: {
          default: null,
          type: Object
        },
        automatic: {
          default: false,
          type: Boolean
        },
        showUploadButton: {
          default: true,
          type: Boolean
        },
        singleUpload: {
          default: false,
          type: Boolean
        }
      },
      data: function data() {
        return {
          inputValue: null,
          type: null,
          srcs: [],
          filesx: [],
          itemRemove: [],
          percent: 0,
          viewActive: false,
          viewSrc: null
        };
      },
      computed: {
        getFilesFilter: function getFilesFilter() {
          var files = this.srcs.filter(function (item) {
            return !item.remove;
          });
          return files;
        },
        postFiles: function postFiles() {
          var postFiles = Array.prototype.slice.call(this.filesx);
          postFiles = postFiles.filter(function (item) {
            return !item.hasOwnProperty('remove');
          });
          return postFiles.length;
        }
      },
      watch: {
        percent: function percent() {
          var _this2 = this;

          if (this.percent >= 100) {
            this.srcs.forEach(function (file) {
              file.percent = 100;
            });
            setTimeout(function () {
              _this2.percent = 0;
            }, 1000);
          }
        }
      },
      methods: {
        viewImage: function viewImage(src, evt) {
          var timeout;
          var eventx = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch ? 'touchstart' : 'click';

          if (eventx == 'click') {
            this.viewActive = true;
            this.viewSrc = src;
          } else {
            if (evt.type == 'touchend') {
              var currentTime = new Date().getTime();
              var tapLength = currentTime - lastTap;
              clearTimeout(timeout);

              if (tapLength < 500 && tapLength > 0) {
                this.viewActive = true;
                this.viewSrc = src;
                event.preventDefault();
              }

              lastTap = currentTime;
            }
          }
        },
        removeFile: function removeFile(index) {
          var _this3 = this;

          this.itemRemove.push(index);
          this.$emit('on-delete', this.filesx[index]);
          setTimeout(function () {
            _this3.filesx[index].remove = true;
          }, 301);
        },
        getFiles: function getFiles(e) {
          this.$emit('update:vsFile', e.target.value);

          var _this = this;

          function uploadImage(e) {
            var orientation = 'h';
            var image = new Image();
            image.src = e.target.result;

            image.onload = function () {
              if (this.width > this.height) {
                orientation = 'w';
              }

              switchImage(this, orientation);
            };
          }

          function switchImage(image, orientation) {
            _this.srcs.push({
              src: image.src,
              orientation: orientation,
              type: _this.typex,
              percent: null,
              error: false,
              remove: null
            });
          }

          var files = e.target.files;
          var count = this.srcs.length - this.itemRemove.length;

          for (var file in files) {
            if (files.hasOwnProperty(file)) {
              if (this.limit) {
                count++;

                if (count > Number(this.limit)) {
                  break;
                }
              }

              var reader = new FileReader();
              var filex = files[file];

              if (/image.*/.test(filex.type)) {
                this.typex = 'image';
                this.filesx.push(filex);
                reader.onload = uploadImage;
                reader.readAsDataURL(filex);
              } else if (/video.*/.test(filex.type)) {
                this.typex = 'video';
                this.filesx.push(filex);

                _this.srcs.push({
                  src: null,
                  name: filex.name,
                  type: 'video',
                  percent: null,
                  error: false,
                  remove: null
                });
              } else {
                this.filesx.push(filex);

                _this.srcs.push({
                  src: null,
                  name: filex.name,
                  percent: null,
                  error: false,
                  remove: null
                });
              }

              this.$emit('change', e.target.value, this.filesx);
            }
          }

          var input = this.$refs.fileInput;
          input.type = 'text';
          input.type = 'file';

          if (this.automatic) {
            this.upload('all');
          }
        },
        upload: function upload(index) {
          var _this4 = this;

          var formData = new FormData();
          var postFiles = Array.prototype.slice.call(this.filesx);

          if (typeof index == 'number') {
            postFiles = [postFiles[index]];
          } else if (index == 'all') {
            postFiles = postFiles.filter(function (item) {
              return !item.hasOwnProperty('remove');
            });
          }

          var data = this.data || {};

          for (var key in data) {
            formData.append(key, data[key]);
          }

          if (this.singleUpload) {
            postFiles.forEach(function (filex) {
              var formData = new FormData();

              for (var key in data) {
                formData.append(key, data[key]);
              }

              formData.append(_this4.fileName, filex, filex.name);

              _this4.uploadx(index, formData);
            });
          } else {
            postFiles.forEach(function (filex) {
              formData.append(_this4.fileName, filex, filex.name);
            });
            this.uploadx(index, formData);
          }
        },
        uploadx: function uploadx(index, formData) {
          var self = this;
          var xhr = new XMLHttpRequest();

          xhr.onerror = function error(e) {
            self.$emit('on-error', e);

            if (typeof index == 'number') {
              self.srcs[index].error = true;
            }
          };

          xhr.onload = function onload(e) {
            if (xhr.status < 200 || xhr.status >= 300) {
              self.$emit('on-error', e);

              if (typeof index == 'number') {
                self.srcs[index].error = true;
              }
            } else {
              self.$emit('on-success', e);
            }
          };

          if (xhr.upload) {
            xhr.upload.onprogress = function progress(e) {
              if (e.total > 0) {
                var percent = e.loaded / e.total * 100;

                if (typeof index == 'number') {
                  self.srcs[index].percent = Math.trunc(percent);
                } else {
                  self.percent = Math.trunc(percent);
                }
              }
            };
          }

          xhr.withCredentials = true;
          xhr.open('POST', this.action);
          var headers = this.headers || {};

          for (var head in headers) {
            if (headers.hasOwnProperty(head) && headers[head] !== null) {
              xhr.setRequestHeader(head, headers[head]);
            }
          }

          xhr.send(formData);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsUpload/vsUpload.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsUpload_vsUploadvue_type_script_lang_js_ = vsUploadvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsUpload/vsUpload.vue

    /* normalize component */

    var vsUpload_component = normalizeComponent(vsUpload_vsUploadvue_type_script_lang_js_, vsUploadvue_type_template_id_6717fc70_render, vsUploadvue_type_template_id_6717fc70_staticRenderFns, false, null, null, null);
    vsUpload_component.options.__file = "vsUpload.vue";
    /* harmony default export */

    var vsUpload = vsUpload_component.exports; // CONCATENATED MODULE: ./src/components/vsUpload/index.js

    /* harmony default export */

    var components_vsUpload = function (Vue) {
      Vue.component(vsUpload.name, vsUpload);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsPopup/vsPopup.vue?vue&type=template&id=6af6c7fd&lang=html&


    var vsPopupvue_type_template_id_6af6c7fd_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "popup-t"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.active,
          expression: "active"
        }],
        ref: "con",
        staticClass: "vs-component con-vs-popup",
        class: ["vs-popup-" + _vm.color, {
          'fullscreen': _vm.fullscreen
        }],
        on: {
          "click": function ($event) {
            return _vm.close($event, true);
          }
        }
      }, [_c('div', {
        staticClass: "vs-popup--background",
        style: _vm.styleCon
      }), _c('div', {
        ref: "popupx",
        staticClass: "vs-popup",
        style: _vm.stylePopup
      }, [_c('header', {
        staticClass: "vs-popup--header",
        style: _vm.styleHeader
      }, [_c('div', {
        staticClass: "vs-popup--title"
      }, [_c('h3', [_vm._v(_vm._s(_vm.title))])]), !_vm.buttonCloseHidden ? _c('vs-icon', {
        ref: "btnclose",
        staticClass: "vs-popup--close vs-popup--close--icon",
        style: _vm.stylePopup,
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.iconClose
        },
        on: {
          "click": _vm.close
        }
      }) : _vm._e()], 1), _c('div', {
        staticClass: "vs-popup--content",
        class: _vm.classContent,
        style: _vm.styleContent
      }, [_vm._t("default")], 2)])])]);
    };

    var vsPopupvue_type_template_id_6af6c7fd_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsPopup/vsPopup.vue?vue&type=template&id=6af6c7fd&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsPopup/vsPopup.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsPopupvue_type_script_lang_js_ = {
      name: 'VsPopup',
      props: {
        color: {
          default: 'primary',
          type: String
        },
        active: {
          default: false,
          type: Boolean
        },
        title: {
          default: 'popup',
          type: String
        },
        buttonCloseHidden: {
          default: false,
          type: Boolean
        },
        fullscreen: {
          default: false,
          type: Boolean
        },
        backgroundColor: {
          default: null,
          type: String
        },
        backgroundColorPopup: {
          default: 'rgb(255,255,255)',
          type: String
        },
        styleContent: {
          default: null,
          type: String
        },
        classContent: {
          default: null,
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        iconClose: {
          default: 'close',
          type: String
        }
      },
      computed: {
        styleHeader: function styleHeader() {
          return {
            color: utils_color.getColor(this.color, 1)
          };
        },
        styleAfter: function styleAfter() {
          return {
            background: utils_color.getColor(this.color, 1)
          };
        },
        styleCon: function styleCon() {
          return {
            background: utils_color.getColor(this.backgroundColor, 1)
          };
        },
        stylePopup: function stylePopup() {
          return {
            background: utils_color.getColor(this.backgroundColorPopup, 1)
          };
        }
      },
      mounted: function mounted() {
        this.insertBody();
      },
      methods: {
        giveColor: function giveColor(color) {
          return utils_color.rColor(color);
        },
        close: function close(event, con) {
          if (con) {
            if (event.target.className.indexOf('vs-popup--background') != -1) {
              this.$emit('update:active', false);
              this.$emit('close', false);
            } else if (event.srcElement == this.$refs.btnclose.$el) {
              this.$emit('update:active', false);
              this.$emit('close', false);
            }
          }
        },
        insertBody: function insertBody() {
          var elx = this.$refs.con;
          document.body.insertBefore(elx, document.body.firstChild);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsPopup/vsPopup.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsPopup_vsPopupvue_type_script_lang_js_ = vsPopupvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsPopup/vsPopup.vue

    /* normalize component */

    var vsPopup_component = normalizeComponent(vsPopup_vsPopupvue_type_script_lang_js_, vsPopupvue_type_template_id_6af6c7fd_lang_html_render, vsPopupvue_type_template_id_6af6c7fd_lang_html_staticRenderFns, false, null, null, null);
    vsPopup_component.options.__file = "vsPopup.vue";
    /* harmony default export */

    var vsPopup = vsPopup_component.exports; // CONCATENATED MODULE: ./src/components/vsPopup/index.js

    /* harmony default export */

    var components_vsPopup = function (Vue) {
      Vue.component(vsPopup.name, vsPopup);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsAlert/vsAlert.vue?vue&type=template&id=863593c0&lang=html&


    var vsAlertvue_type_template_id_863593c0_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        on: {
          "before-enter": _vm.beforeEnter,
          "enter": _vm.enter,
          "leave": _vm.leave
        }
      }, [_vm.active ? _c('div', _vm._g(_vm._b({
        ref: "alert",
        staticClass: "con-vs-alert",
        class: ["con-vs-alert-" + _vm.color, {
          'con-icon': _vm.icon
        }],
        style: _vm.styleAlert
      }, 'div', _vm.$attrs, false), _vm.$listeners), [_vm.closable ? _c('div', {
        staticClass: "con-x vs-alert--close",
        on: {
          "click": function ($event) {
            return _vm.$emit('update:active', false);
          }
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.closeIcon
        }
      })], 1) : _vm._e(), _vm.title ? _c('h4', {
        staticClass: "titlex vs-alert--title",
        style: _vm.styleTitle
      }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _c('div', {
        staticClass: "vs-alert",
        class: {
          'con-icon': _vm.icon
        }
      }, [_vm.icon ? _c('vs-icon', {
        staticClass: "icon-alert",
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      }) : _vm._e(), _vm._t("default")], 2)]) : _vm._e()]);
    };

    var vsAlertvue_type_template_id_863593c0_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsAlert/vsAlert.vue?vue&type=template&id=863593c0&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsAlert/vsAlert.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsAlertvue_type_script_lang_js_ = {
      name: 'VsAlert',
      props: {
        active: {
          type: [Boolean, String],
          default: true
        },
        title: {
          type: String,
          default: null
        },
        closable: {
          type: Boolean,
          default: false
        },
        color: {
          type: String,
          default: 'primary'
        },
        margin: {
          type: [String, Boolean],
          default: '10px'
        },
        icon: {
          type: String,
          default: null
        },
        closeIcon: {
          type: String,
          default: 'close'
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        }
      },
      computed: {
        styleAlert: function styleAlert() {
          return {
            background: utils_color.getColor(this.color, .15),
            boxShadow: "0px 0px 25px 0px ".concat(utils_color.getColor(this.color, .15)),
            color: utils_color.getColor(this.color, 1)
          };
        },
        styleTitle: function styleTitle() {
          return {
            boxShadow: "0px 6px 15px -7px ".concat(utils_color.getColor(this.color, .4))
          };
        }
      },
      mounted: function mounted() {
        var _this = this;

        if (this.$refs.alert) {
          this.$nextTick(function () {
            var h = _this.$refs.alert.scrollHeight;
            _this.$refs.alert.style.height = h + 'px';
          });
        }
      },
      methods: {
        beforeEnter: function beforeEnter(el) {
          el.style.height = 0;
          el.style.opacity = 0;
        },
        enter: function enter(el, done) {
          var h = this.$refs.alert.scrollHeight;
          this.$refs.alert.style.height = h + 'px';
          el.style.opacity = 1;
          done();
        },
        leave: function leave(el) {
          this.$refs.alert.style.height = 0 + 'px';
          el.style.opacity = 0;
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsAlert/vsAlert.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsAlert_vsAlertvue_type_script_lang_js_ = vsAlertvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsAlert/vsAlert.vue

    /* normalize component */

    var vsAlert_component = normalizeComponent(vsAlert_vsAlertvue_type_script_lang_js_, vsAlertvue_type_template_id_863593c0_lang_html_render, vsAlertvue_type_template_id_863593c0_lang_html_staticRenderFns, false, null, null, null);
    vsAlert_component.options.__file = "vsAlert.vue";
    /* harmony default export */

    var vsAlert = vsAlert_component.exports; // CONCATENATED MODULE: ./src/components/vsAlert/index.js

    /* harmony default export */

    var components_vsAlert = function (Vue) {
      Vue.component(vsAlert.name, vsAlert);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsChip/vsChip.vue?vue&type=template&id=02e82a4c&lang=html&


    var vsChipvue_type_template_id_02e82a4c_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "con-vs-chip",
        class: ["vs-chip-" + _vm.color, {
          'closable': _vm.closable,
          'con-color': _vm.color
        }],
        style: _vm.styleChip
      }, [_c('span', {
        staticClass: "text-chip vs-chip--text"
      }, [_vm._t("default")], 2), _vm.closable ? _c('button', {
        staticClass: "btn-close vs-chip--close",
        on: {
          "click": _vm.closeChip
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.closeIcon
        }
      })], 1) : _vm._e()]);
    };

    var vsChipvue_type_template_id_02e82a4c_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsChip/vsChip.vue?vue&type=template&id=02e82a4c&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsChip/vsChip.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsChipvue_type_script_lang_js_ = {
      name: 'VsChip',
      props: {
        item: {
          type: Boolean
        },
        value: {},
        active: {
          type: Boolean,
          default: true
        },
        text: {
          type: String,
          default: null
        },
        closable: {
          type: [Boolean, String],
          default: false
        },
        color: {
          type: String,
          default: null
        },
        icon: {
          type: String,
          default: null
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        },
        closeIcon: {
          type: String,
          default: 'clear'
        }
      },
      computed: {
        styleChip: function styleChip() {
          return {
            background: utils_color.getColor(this.color, 1),
            color: this.color ? 'rgba(255,255,255,.9)' : 'rgba(0,0,0,.7)'
          };
        },
        eliminado: function eliminado() {
          if (this.item) {
            return true;
          } else {
            if (this.vsClosable) {
              return this.value;
            } else {
              return true;
            }
          }
        }
      },
      methods: {
        closeChip: function closeChip() {
          this.$emit('input', false);
          this.$emit('click');
        },
        remove: function remove() {
          this.$emit('vs-remove', false);
          this.$emit('input', false);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsChip/vsChip.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsChip_vsChipvue_type_script_lang_js_ = vsChipvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsChip/vsChip.vue

    /* normalize component */

    var vsChip_component = normalizeComponent(vsChip_vsChipvue_type_script_lang_js_, vsChipvue_type_template_id_02e82a4c_lang_html_render, vsChipvue_type_template_id_02e82a4c_lang_html_staticRenderFns, false, null, null, null);
    vsChip_component.options.__file = "vsChip.vue";
    /* harmony default export */

    var vsChip = vsChip_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsChip/vsChips.vue?vue&type=template&id=08c01eb6&lang=html&

    var vsChipsvue_type_template_id_08c01eb6_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {}, [_c('div', {
        staticClass: "con-chips",
        class: {
          'no-items': _vm.value.length == 0
        }
      }, [_vm._t("default"), _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.newChip,
          expression: "newChip"
        }],
        staticClass: "con-chips--input",
        attrs: {
          "placeholder": _vm.value.length > 0 ? null : _vm.placeholder,
          "type": "text"
        },
        domProps: {
          "value": _vm.newChip
        },
        on: {
          "keypress": function ($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }

            return _vm.addItem($event);
          },
          "input": function ($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.newChip = $event.target.value;
          }
        }
      }), _c('div', {
        staticClass: "x-global con-chips--remove-all",
        on: {
          "click": _vm.removeTotalItems
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.removeIcon
        }
      })], 1)], 2)]);
    };

    var vsChipsvue_type_template_id_08c01eb6_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsChip/vsChips.vue?vue&type=template&id=08c01eb6&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsChip/vsChips.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsChipsvue_type_script_lang_js_ = {
      name: 'VsChips',
      components: {
        vsChip: vsChip
      },
      props: {
        value: {},
        vsColor: {
          type: String,
          default: 'primary'
        },
        placeholder: {
          type: String,
          default: ''
        },
        items: {
          type: Array
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        },
        removeIcon: {
          type: String,
          default: 'close'
        }
      },
      data: function data() {
        return {
          newChip: '',
          chip1: true,
          itemsx: this.items
        };
      },
      methods: {
        addItem: function addItem() {
          // this.itemsx.push(this.newChip)
          var valueOld = this.value;
          valueOld.push(this.newChip);
          this.$emit('input', valueOld);
          this.newChip = '';
        },
        removeTotalItems: function removeTotalItems() {
          var valueOld = this.value;
          valueOld.splice(0, this.value.length);
          this.$emit('input', valueOld);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsChip/vsChips.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsChip_vsChipsvue_type_script_lang_js_ = vsChipsvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsChip/vsChips.vue

    /* normalize component */

    var vsChips_component = normalizeComponent(vsChip_vsChipsvue_type_script_lang_js_, vsChipsvue_type_template_id_08c01eb6_lang_html_render, vsChipsvue_type_template_id_08c01eb6_lang_html_staticRenderFns, false, null, null, null);
    vsChips_component.options.__file = "vsChips.vue";
    /* harmony default export */

    var vsChips = vsChips_component.exports; // CONCATENATED MODULE: ./src/components/vsChip/index.js

    /* harmony default export */

    var components_vsChip = function (Vue) {
      Vue.component(vsChip.name, vsChip);
      Vue.component(vsChips.name, vsChips);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsProgress/vsProgress.vue?vue&type=template&id=df48fcfc&lang=html&


    var vsProgressvue_type_template_id_df48fcfc_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-progress--background",
        class: ["vs-progress-" + _vm.color, {
          'indeterminate': _vm.indeterminate
        }],
        style: _vm.styleConProgress
      }, [_c('div', {
        staticClass: "vs-progress--foreground",
        style: _vm.styleProgress
      }), _vm.indeterminate ? _c('div', {
        staticClass: "vs-progress--indeterminate",
        style: _vm.styleProgress
      }) : _vm._e()]);
    };

    var vsProgressvue_type_template_id_df48fcfc_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsProgress/vsProgress.vue?vue&type=template&id=df48fcfc&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsProgress/vsProgress.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsProgressvue_type_script_lang_js_ = {
      name: 'VsProgress',
      props: {
        height: {
          type: [Number, String],
          default: 5
        },
        indeterminate: {
          type: Boolean,
          default: false
        },
        percent: {
          type: Number,
          default: 0
        },
        color: {
          type: String,
          default: 'primary'
        }
      },
      data: function data() {
        return {
          percentx: 0
        };
      },
      computed: {
        styleConProgress: function styleConProgress() {
          return {
            background: utils_color.getColor(this.color, .1),
            height: "".concat(this.height, "px")
          };
        },
        styleProgress: function styleProgress() {
          return {
            background: utils_color.getColor(this.color),
            width: "".concat(this.percentx, "%")
          };
        }
      },
      watch: {
        percent: function percent() {
          this.percentx = this.percent;
        }
      },
      created: function created() {
        this.percentx = 0;
      },
      mounted: function mounted() {
        var _this = this;

        setTimeout(function () {
          _this.percentx = _this.percent; // to force animation
        }, 600);
      }
    }; // CONCATENATED MODULE: ./src/components/vsProgress/vsProgress.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsProgress_vsProgressvue_type_script_lang_js_ = vsProgressvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsProgress/vsProgress.vue

    /* normalize component */

    var vsProgress_component = normalizeComponent(vsProgress_vsProgressvue_type_script_lang_js_, vsProgressvue_type_template_id_df48fcfc_lang_html_render, vsProgressvue_type_template_id_df48fcfc_lang_html_staticRenderFns, false, null, null, null);
    vsProgress_component.options.__file = "vsProgress.vue";
    /* harmony default export */

    var vsProgress = vsProgress_component.exports; // CONCATENATED MODULE: ./src/components/vsProgress/index.js

    /* harmony default export */

    var components_vsProgress = function (Vue) {
      Vue.component(vsProgress.name, vsProgress);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCard/vsCard.vue?vue&type=template&id=32732618&


    var vsCardvue_type_template_id_32732618_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "con-vs-card",
        class: {
          'withHover': _vm.actionable,
          'fixedHeight': _vm.fixedHeight
        }
      }, [_vm.hasSlot('header') ? _c('header', {
        staticClass: "vs-card--header"
      }, [_vm._t("header")], 2) : _vm._e(), _vm.hasSlot('media') ? _c('div', {
        staticClass: "vs-card--media"
      }, [_vm._t("media")], 2) : _vm._e(), _vm.hasSlot('default') ? _c('div', {
        staticClass: "vs-card--content",
        class: {
          'fixedHeight': _vm.fixedHeight
        }
      }, [_vm._t("default")], 2) : _vm._e(), _vm.hasSlot('extra-content') ? _c('div', {
        staticClass: "vs-card-extra--content"
      }, [_vm._t("extra-content")], 2) : _vm._e(), _vm.hasSlot('footer') ? _c('footer', {
        staticClass: "vs-card--footer",
        class: {
          'fixedHeight': _vm.fixedHeight
        }
      }, [_vm._t("footer")], 2) : _vm._e()]);
    };

    var vsCardvue_type_template_id_32732618_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsCard/vsCard.vue?vue&type=template&id=32732618&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCard/vsCard.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsCardvue_type_script_lang_js_ = {
      name: 'VsCard',
      props: {
        actionable: {
          default: false,
          type: Boolean
        },
        fixedHeight: {
          default: false,
          type: Boolean
        }
      },
      methods: {
        hasSlot: function hasSlot(slot) {
          return this.$slots[slot];
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsCard/vsCard.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsCard_vsCardvue_type_script_lang_js_ = vsCardvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsCard/vsCard.vue

    /* normalize component */

    var vsCard_component = normalizeComponent(vsCard_vsCardvue_type_script_lang_js_, vsCardvue_type_template_id_32732618_render, vsCardvue_type_template_id_32732618_staticRenderFns, false, null, null, null);
    vsCard_component.options.__file = "vsCard.vue";
    /* harmony default export */

    var vsCard = vsCard_component.exports; // CONCATENATED MODULE: ./src/components/vsCard/index.js

    /* harmony default export */

    var components_vsCard = function (Vue) {
      Vue.component(vsCard.name, vsCard);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsList/vsList.vue?vue&type=template&id=38998322&lang=html&


    var vsListvue_type_template_id_38998322_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-list"
      }, [_vm._t("default")], 2);
    };

    var vsListvue_type_template_id_38998322_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsList/vsList.vue?vue&type=template&id=38998322&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsList/vsList.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsListvue_type_script_lang_js_ = {
      name: 'VsList'
    }; // CONCATENATED MODULE: ./src/components/vsList/vsList.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsList_vsListvue_type_script_lang_js_ = vsListvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsList/vsList.vue

    /* normalize component */

    var vsList_component = normalizeComponent(vsList_vsListvue_type_script_lang_js_, vsListvue_type_template_id_38998322_lang_html_render, vsListvue_type_template_id_38998322_lang_html_staticRenderFns, false, null, null, null);
    vsList_component.options.__file = "vsList.vue";
    /* harmony default export */

    var vsList = vsList_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsList/vsListItem.vue?vue&type=template&id=1ad15fd9&lang=html&

    var vsListItemvue_type_template_id_1ad15fd9_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-list--item"
      }, [_vm.$slots.avatar ? _c('div', {
        staticClass: "vs-list--avatar"
      }, [_vm._t("avatar")], 2) : _vm._e(), _vm.icon ? _c('div', {
        staticClass: "vs-list--icon"
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      })], 1) : _vm._e(), _c('div', {
        staticClass: "list-titles"
      }, [_vm.title ? _c('div', {
        staticClass: "vs-list--title"
      }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm.subtitle ? _c('div', {
        staticClass: "vs-list--subtitle"
      }, [_vm._v(_vm._s(_vm.subtitle))]) : _vm._e()]), _c('div', {
        staticClass: "vs-list--slot"
      }, [_vm._t("default")], 2)]);
    };

    var vsListItemvue_type_template_id_1ad15fd9_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsList/vsListItem.vue?vue&type=template&id=1ad15fd9&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsList/vsListItem.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsListItemvue_type_script_lang_js_ = {
      name: 'VsListItem',
      props: {
        vsAvatar: {
          type: [Boolean, String],
          default: false
        },
        title: {
          type: String,
          default: null
        },
        subtitle: {
          type: String,
          default: null
        },
        icon: {
          type: String,
          default: null
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsList/vsListItem.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsList_vsListItemvue_type_script_lang_js_ = vsListItemvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsList/vsListItem.vue

    /* normalize component */

    var vsListItem_component = normalizeComponent(vsList_vsListItemvue_type_script_lang_js_, vsListItemvue_type_template_id_1ad15fd9_lang_html_render, vsListItemvue_type_template_id_1ad15fd9_lang_html_staticRenderFns, false, null, null, null);
    vsListItem_component.options.__file = "vsListItem.vue";
    /* harmony default export */

    var vsListItem = vsListItem_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsList/vsListHeader.vue?vue&type=template&id=c17f0c74&lang=html&

    var vsListHeadervue_type_template_id_c17f0c74_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-list--header",
        class: ["vs-header-list-" + _vm.color, {
          'with-icon': _vm.icon
        }],
        style: _vm.styleHeader
      }, [_vm.icon ? _c('div', {
        staticClass: "vs-list--icon"
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      })], 1) : _vm._e(), _c('div', {
        staticClass: "list-titles"
      }, [_vm.title ? _c('div', {
        staticClass: "vs-list--title"
      }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()])]);
    };

    var vsListHeadervue_type_template_id_c17f0c74_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsList/vsListHeader.vue?vue&type=template&id=c17f0c74&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsList/vsListHeader.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsListHeadervue_type_script_lang_js_ = {
      name: 'VsListHeader',
      props: {
        color: {
          type: String,
          default: 'primary'
        },
        title: {
          type: String,
          default: null
        },
        subtitle: {
          type: String,
          default: null
        },
        icon: {
          type: String,
          default: null
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        }
      },
      computed: {
        styleHeader: function styleHeader() {
          return {
            color: utils_color.getColor(this.color)
          };
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsList/vsListHeader.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsList_vsListHeadervue_type_script_lang_js_ = vsListHeadervue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsList/vsListHeader.vue

    /* normalize component */

    var vsListHeader_component = normalizeComponent(vsList_vsListHeadervue_type_script_lang_js_, vsListHeadervue_type_template_id_c17f0c74_lang_html_render, vsListHeadervue_type_template_id_c17f0c74_lang_html_staticRenderFns, false, null, null, null);
    vsListHeader_component.options.__file = "vsListHeader.vue";
    /* harmony default export */

    var vsListHeader = vsListHeader_component.exports; // CONCATENATED MODULE: ./src/components/vsList/index.js

    /* harmony default export */

    var components_vsList = function (Vue) {
      Vue.component(vsList.name, vsList);
      Vue.component(vsListItem.name, vsListItem);
      Vue.component(vsListHeader.name, vsListHeader);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsAvatar/vsAvatar.vue?vue&type=template&id=330149ee&lang=html&


    var vsAvatarvue_type_template_id_330149ee_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', _vm._g(_vm._b({
        staticClass: "con-vs-avatar",
        class: _vm.avatarClass,
        style: _vm.avatarStyle
      }, 'div', _vm.$attrs, false), _vm.$listeners), [_vm.badge && _vm.badge > 0 ? _c('div', {
        staticClass: "dot-count vs-avatar--count",
        class: _vm.badgeClass,
        style: _vm.badgeStyle
      }, [_vm._v("\n    " + _vm._s(typeof _vm.badge != 'boolean' ? _vm.badge : null) + "\n  ")]) : _vm._e(), _vm.src ? _c('div', {
        staticClass: "con-img vs-avatar--con-img"
      }, [_c('img', {
        attrs: {
          "src": _vm.src,
          "alt": ""
        }
      })]) : _c('span', {
        staticClass: "vs-avatar--text notranslate",
        class: [_vm.text ? '' : _vm.iconPack, _vm.text ? '' : _vm.icon, _vm.textClass],
        style: _vm.textStyle,
        attrs: {
          "title": _vm.text,
          "translate": "no"
        }
      }, [_vm._v("\n    " + _vm._s(_vm.text ? _vm.returnText : _vm.iconPack == 'material-icons' ? _vm.icon : '') + "\n  ")])]);
    };

    var vsAvatarvue_type_template_id_330149ee_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsAvatar/vsAvatar.vue?vue&type=template&id=330149ee&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsAvatar/vsAvatar.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsAvatarvue_type_script_lang_js_ = {
      name: 'VsAvatar',
      props: {
        badge: {
          type: [Boolean, String, Number],
          default: false
        },
        badgeColor: {
          default: 'danger',
          type: String
        },
        size: {
          type: String,
          default: null
        },
        src: {
          type: String,
          default: null
        },
        icon: {
          type: String,
          default: 'person'
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        },
        textColor: {
          type: String,
          default: 'rgb(255, 255, 255)'
        },
        text: {
          type: [String, Number],
          default: null
        },
        color: {
          type: String,
          default: 'rgb(195, 195, 195)'
        }
      },
      computed: {
        avatarClass: function avatarClass() {
          var classes = {};
          classes[this.size] = true;

          if (utils_color.isColor(this.color)) {
            classes["con-vs-avatar-".concat(this.color)] = true;
          }

          return classes;
        },
        avatarStyle: function avatarStyle() {
          var style = {
            width: /[px]/.test(this.size) ? this.size : null,
            height: /[px]/.test(this.size) ? this.size : null
          };

          if (!utils_color.isColor(this.color)) {
            style.background = utils_color.getColor(this.color);
          }

          return style;
        },
        badgeClass: function badgeClass() {
          var classes = {
            badgeNumber: typeof badge != 'boolean'
          };

          if (utils_color.isColor(this.badgeColor)) {
            classes["dot-count-".concat(this.badgeColor)] = true;
          }

          return classes;
        },
        badgeStyle: function badgeStyle() {
          var style = {};

          if (!utils_color.isColor(this.badgeColor)) {
            style.background = utils_color.getColor(this.badgeColor);
          }

          return style;
        },
        textClass: function textClass() {
          var classes = {
            'material-icons': !this.text
          };

          if (utils_color.isColor(this.textColor)) {
            classes["vs-avatar-text-".concat(this.textColor)] = true;
          }

          return classes;
        },
        textStyle: function textStyle() {
          var style = {
            transform: "translate(-50%,-50%) scale(".concat(this.returnScale, ")")
          };

          if (!utils_color.isColor(this.textColor)) {
            style.color = utils_color.getColor(this.textColor);
          }

          return style;
        },
        returnText: function returnText() {
          if (this.text.length <= 5) {
            return this.text;
          }

          var exp = /\s/g;
          var letras = '';

          if (exp.test(this.text)) {
            this.text.split(exp).forEach(function (word) {
              letras += word[0].toUpperCase();
            });
          } else {
            letras = this.text[0].toUpperCase();
          }

          return letras.length > 5 ? letras[0] : letras;
        },
        returnScale: function returnScale() {
          if (!this.text) {
            return 1;
          }

          var lengthx = this.returnText.length;

          if (lengthx <= 5 && lengthx > 1) {
            return lengthx / (lengthx * 1.50);
          } else {
            return 1;
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsAvatar/vsAvatar.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsAvatar_vsAvatarvue_type_script_lang_js_ = vsAvatarvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsAvatar/vsAvatar.vue

    /* normalize component */

    var vsAvatar_component = normalizeComponent(vsAvatar_vsAvatarvue_type_script_lang_js_, vsAvatarvue_type_template_id_330149ee_lang_html_render, vsAvatarvue_type_template_id_330149ee_lang_html_staticRenderFns, false, null, null, null);
    vsAvatar_component.options.__file = "vsAvatar.vue";
    /* harmony default export */

    var vsAvatar = vsAvatar_component.exports; // CONCATENATED MODULE: ./src/components/vsAvatar/index.js

    /* harmony default export */

    var components_vsAvatar = function (Vue) {
      Vue.component(vsAvatar.name, vsAvatar);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsPagination/vsPagination.vue?vue&type=template&id=cc53a59a&


    var vsPaginationvue_type_template_id_cc53a59a_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "con-vs-pagination",
        class: ["vs-pagination-" + _vm.color],
        style: _vm.stylePagination
      }, [_c('nav', {
        staticClass: "vs-pagination--nav"
      }, [_c('button', {
        staticClass: "vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev",
        class: {
          disabled: _vm.current <= 1 ? 'disabled' : null
        },
        attrs: {
          "disabled": _vm.current === 1
        },
        on: {
          "click": _vm.prevPage
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.prevIcon ? _vm.prevIcon : _vm.defaultPrevIcon
        }
      })], 1), _c('ul', {
        staticClass: "vs-pagination--ul"
      }, _vm._l(_vm.pages, function (page, index) {
        return _c('li', {
          key: index,
          staticClass: "item-pagination vs-pagination--li",
          class: {
            'is-current': page == _vm.current
          },
          on: {
            "click": function ($event) {
              return _vm.goTo(page);
            }
          }
        }, [_c('span', [_vm._v("\n          " + _vm._s(page) + "\n        ")]), _c('div', {
          staticClass: "effect"
        })]);
      }), 0), _c('button', {
        staticClass: "vs-pagination--buttons btn-next-pagination vs-pagination--button-next",
        class: {
          disabled: _vm.current === _vm.total ? 'disabled' : null
        },
        attrs: {
          "disabled": _vm.current === _vm.total
        },
        on: {
          "click": _vm.nextPage
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.nextIcon ? _vm.nextIcon : _vm.defaultNextIcon
        }
      })], 1), _vm.goto ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.go,
          expression: "go"
        }],
        staticClass: "vs-pagination--input-goto",
        attrs: {
          "max": _vm.total,
          "min": "1",
          "type": "number"
        },
        domProps: {
          "value": _vm.go
        },
        on: {
          "change": _vm.goTo,
          "input": function ($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.go = $event.target.value;
          }
        }
      }) : _vm._e()])]);
    };

    var vsPaginationvue_type_template_id_cc53a59a_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsPagination/vsPagination.vue?vue&type=template&id=cc53a59a&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsPagination/vsPagination.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsPaginationvue_type_script_lang_js_ = {
      name: 'VsPagination',
      props: {
        color: {
          type: String,
          default: 'primary'
        },
        total: {
          type: Number,
          required: true
        },
        value: {
          type: Number,
          required: true,
          default: 1
        },
        max: {
          type: Number,
          default: 9
        },
        goto: {
          type: Boolean
        },
        type: {
          type: String
        },
        prevIcon: {
          type: String
        },
        nextIcon: {
          type: String
        },
        iconPack: {
          type: String,
          default: 'material-icons'
        }
      },
      data: function data() {
        return {
          pages: [],
          current: 0,
          go: 0,
          prevRange: '',
          nextRange: '',
          hoverBtn1: false
        };
      },
      computed: {
        defaultNextIcon: function defaultNextIcon() {
          if (this.$vs.rtl) return 'chevron_left';
          return 'chevron_right';
        },
        defaultPrevIcon: function defaultPrevIcon() {
          if (this.$vs.rtl) return 'chevron_right';
          return 'chevron_left';
        },
        stylePagination: function stylePagination() {
          var style = {};

          if (!utils_color.isColor(this.color)) {
            style = {
              '--vs-color-pagination': utils_color.getColor(this.color),
              '--vs-color-pagination-alpha': utils_color.getColor(this.color, .5)
            };
          }

          return style;
        }
      },
      watch: {
        current: function current() {
          this.getPages();
          this.$emit('input', this.current);
          this.$emit('change', this.current);
        },
        total: function total() {
          this.getPages();
        },
        max: function max() {
          this.getPages();
        },
        value: function value(val) {
          var pageNum = val < 1 ? 1 : val <= this.total ? val : this.total;
          this.goTo(pageNum);
        }
      },
      mounted: function mounted() {
        this.current = this.go = this.value;
        this.getPages();
      },
      methods: {
        isEllipsis: function isEllipsis(page) {
          return page === '...';
        },
        goTo: function goTo(page) {
          if (page === '...') {
            return;
          }

          if (typeof page.target === 'undefined') {
            this.current = page;
          } else {
            var value = parseInt(page.target.value, 10);
            this.go = value < 1 ? 1 : value <= this.total ? value : this.total;
            this.current = this.go;
          }
        },
        getPages: function getPages() {
          if (this.total <= this.max) {
            var pages = this.setPages(1, this.total);
            this.pages = pages;
          }

          var even = this.max % 2 === 0 ? 1 : 0;

          if (this.total < 6) {
            this.prevRange = Math.floor(this.max / (this.max / 2));
          } else {
            this.prevRange = Math.floor(this.max / 2);
          }

          this.nextRange = this.total - this.prevRange + 1 + even;

          if (this.current >= this.prevRange && this.current <= this.nextRange) {
            var start = this.current - this.prevRange + 2;
            var end = this.current + this.prevRange - 2 - even;
            this.pages = [1, '...'].concat(_toConsumableArray(this.setPages(start, end)), ['...', this.total]);
          } else if (this.total < 6) {
            this.pages = _toConsumableArray(this.setPages(1, this.total));
          } else {
            this.pages = [].concat(_toConsumableArray(this.setPages(1, this.prevRange)), ['...'], _toConsumableArray(this.setPages(this.nextRange, this.total)));
          }
        },
        setPages: function setPages(start, end) {
          var setPages = [];

          for (start > 0 ? start : 1; start <= end; start++) {
            setPages.push(start);
          }

          return setPages;
        },
        nextPage: function nextPage() {
          if (this.current < this.total) {
            this.current++;
          }
        },
        prevPage: function prevPage() {
          if (this.current > 1) {
            this.current--;
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsPagination/vsPagination.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsPagination_vsPaginationvue_type_script_lang_js_ = vsPaginationvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsPagination/vsPagination.vue

    /* normalize component */

    var vsPagination_component = normalizeComponent(vsPagination_vsPaginationvue_type_script_lang_js_, vsPaginationvue_type_template_id_cc53a59a_render, vsPaginationvue_type_template_id_cc53a59a_staticRenderFns, false, null, null, null);
    vsPagination_component.options.__file = "vsPagination.vue";
    /* harmony default export */

    var vsPagination = vsPagination_component.exports; // CONCATENATED MODULE: ./src/components/vsPagination/index.js

    /* harmony default export */

    var components_vsPagination = function (Vue) {
      Vue.component(vsPagination.name, vsPagination);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsBreadcrumb/vsBreadcrumb.vue?vue&type=template&id=a0040c92&lang=html&


    var vsBreadcrumbvue_type_template_id_a0040c92_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('nav', _vm._g(_vm._b({
        staticClass: "vs-breadcrumb",
        class: "vs-align-" + _vm.align,
        attrs: {
          "aria-label": "breadcrumb"
        }
      }, 'nav', _vm.$attrs, false), _vm.$listeners), [_c('ol', {
        staticClass: "vs-breadcrumb--ol"
      }, [_vm._t("default"), _vm._l(_vm.items, function (item) {
        return _c('li', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: !_vm.hasSlot,
            expression: "!hasSlot"
          }],
          key: item.title,
          class: {
            'vs-active': item.active,
            'disabled-link': item.disabled
          },
          attrs: {
            "aria-current": item.active ? 'page' : null
          }
        }, [!item.active ? _c('a', {
          staticClass: "vs-breadcrumb--link",
          attrs: {
            "href": item.url ? item.url : '#',
            "title": item.title
          }
        }, [_vm._v("\n        " + _vm._s(item.title) + "\n      ")]) : [_c('span', {
          staticClass: "vs-breadcrumb--text",
          class: _vm.textClass,
          style: _vm.textStyle
        }, [_vm._v("\n          " + _vm._s(item.title) + "\n        ")])], !item.active ? _c('span', {
          staticClass: "separator notranslate vs-breadcrum--separator",
          class: _vm.separator.length > 1 ? 'material-icons' : null,
          attrs: {
            "translate": "no",
            "aria-hidden": "true"
          }
        }, [_vm._v(_vm._s(_vm.separator))]) : _vm._e()], 2);
      })], 2)]);
    };

    var vsBreadcrumbvue_type_template_id_a0040c92_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsBreadcrumb/vsBreadcrumb.vue?vue&type=template&id=a0040c92&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsBreadcrumb/vsBreadcrumb.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsBreadcrumbvue_type_script_lang_js_ = {
      name: 'VsBreadcrumb',
      props: {
        items: {
          type: Array
        },
        separator: {
          type: String,
          default: '/'
        },
        color: {
          type: String,
          default: 'primary'
        },
        align: {
          type: String,
          default: 'left'
        }
      },
      computed: {
        textClass: function textClass() {
          var classes = {};

          if (utils_color.isColor(this.color)) {
            classes["vs-breadcrumb-text-".concat(this.color)] = true;
          }

          return classes;
        },
        textStyle: function textStyle() {
          var style = {};

          if (!utils_color.isColor(this.color)) {
            style.color = utils_color.getColor(this.color);
          }

          return style;
        },
        hasSlot: function hasSlot() {
          return !!this.$slots.default;
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsBreadcrumb/vsBreadcrumb.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsBreadcrumb_vsBreadcrumbvue_type_script_lang_js_ = vsBreadcrumbvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsBreadcrumb/vsBreadcrumb.vue

    /* normalize component */

    var vsBreadcrumb_component = normalizeComponent(vsBreadcrumb_vsBreadcrumbvue_type_script_lang_js_, vsBreadcrumbvue_type_template_id_a0040c92_lang_html_render, vsBreadcrumbvue_type_template_id_a0040c92_lang_html_staticRenderFns, false, null, null, null);
    vsBreadcrumb_component.options.__file = "vsBreadcrumb.vue";
    /* harmony default export */

    var vsBreadcrumb = vsBreadcrumb_component.exports; // CONCATENATED MODULE: ./src/components/vsBreadcrumb/index.js

    /* harmony default export */

    var components_vsBreadcrumb = function (Vue) {
      Vue.component(vsBreadcrumb.name, vsBreadcrumb);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/functions/vsDialog/index.vue?vue&type=template&id=4762135a&lang=html&


    var vsDialogvue_type_template_id_4762135a_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "dialog-t"
        }
      }, [(_vm.isPrompt ? _vm.active : _vm.fActive) ? _c('div', {
        ref: "con",
        staticClass: "vs-component con-vs-dialog",
        class: ["vs-dialog-" + _vm.color]
      }, [_c('div', {
        staticClass: "vs-dialog-dark",
        on: {
          "click": function ($event) {
            return _vm.handleClose($event, true);
          }
        }
      }), _c('div', {
        ref: "dialogx",
        staticClass: "vs-dialog"
      }, [_c('header', {
        style: _vm.styleHeader
      }, [_c('div', {
        staticClass: "con-title-after"
      }, [_c('span', {
        staticClass: "after",
        style: _vm.styleAfter
      }), _c('h3', {
        staticClass: "dialog-title"
      }, [_vm._v(_vm._s(_vm.title) + " ")])]), _vm.type == 'alert' ? _c('vs-icon', {
        staticClass: "vs-dialog-cancel vs-dialog-cancel--icon notranslate",
        attrs: {
          "icon": _vm.closeIcon,
          "icon-pack": _vm.iconPack
        },
        nativeOn: {
          "click": function ($event) {
            return _vm.handleClose($event);
          }
        }
      }) : _vm._e()], 1), _c('div', {
        staticClass: "vs-dialog-text"
      }, [_vm._t("default"), _vm._v("\n        " + _vm._s(_vm.text) + "\n      ")], 2), (_vm.buttonsHidden ? false : _vm.isPrompt || _vm.type == 'confirm') ? _c('footer', [_c('vs-button', {
        attrs: {
          "disabled": _vm.isValid == 'none' ? false : !_vm.isValid,
          "color": _vm.color,
          "type": _vm.buttonAccept
        },
        on: {
          "click": _vm.acceptDialog
        }
      }, [_vm._v(_vm._s(_vm.acceptText))]), _c('vs-button', {
        attrs: {
          "text-color": 'rgba(0,0,0,.5)',
          "type": _vm.buttonCancel
        },
        on: {
          "click": _vm.cancelClose
        }
      }, [_vm._v(_vm._s(_vm.cancelText))])], 1) : _vm._e(), _vm.type == 'alert' && !_vm.isPrompt ? _c('footer', [_c('vs-button', {
        attrs: {
          "color": _vm.color,
          "type": _vm.buttonAccept
        },
        on: {
          "click": _vm.acceptDialog
        }
      }, [_vm._v(_vm._s(_vm.acceptText))])], 1) : _vm._e()])]) : _vm._e()]);
    };

    var vsDialogvue_type_template_id_4762135a_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/functions/vsDialog/index.vue?vue&type=template&id=4762135a&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/functions/vsDialog/index.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsDialogvue_type_script_lang_js_ = {
      name: 'VsPrompt',
      props: {
        color: {
          default: 'primary',
          type: String
        },
        active: {
          default: false,
          type: Boolean
        },
        buttonAccept: {
          default: 'filled',
          type: String
        },
        buttonCancel: {
          default: 'flat',
          type: String
        },
        isValid: {
          default: 'none',
          type: [Boolean, String]
        },
        buttonsHidden: {
          default: false,
          type: Boolean
        },
        acceptText: {
          default: 'Accept',
          type: String
        },
        cancelText: {
          default: 'Cancel',
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        closeIcon: {
          default: 'close',
          type: String
        },
        text: {
          default: null,
          type: String
        },
        title: {
          default: 'Dialog',
          type: String
        },
        type: {
          default: 'alert',
          type: String
        },
        parent: {
          default: null
        }
      },
      data: function data() {
        return {
          isPrompt: true,
          fActive: false,
          parameters: null
        };
      },
      computed: {
        styleHeader: function styleHeader() {
          return {
            color: utils_color.getColor(this.color, 1)
          };
        },
        styleAfter: function styleAfter() {
          return {
            background: utils_color.getColor(this.color, 1)
          };
        }
      },
      watch: {
        active: function active() {
          var _this2 = this;

          this.$nextTick(function () {
            if (_this2.active) {
              _this2.insertBody();
            }
          });
        },
        fActive: function fActive() {
          var _this3 = this;

          this.$nextTick(function () {
            if (_this3.fActive) {
              _this3.insertBody();
            }
          });
        }
      },
      mounted: function mounted() {
        if (this.active && this.isPrompt) {
          this.insertBody();
        }

        this.fActive = this.active;
      },
      methods: {
        giveColor: function giveColor(color) {
          return utils_color.rColor(color);
        },
        acceptDialog: function acceptDialog() {
          var _this = this;

          if (!this.isPrompt) {
            this.accept ? this.accept(this.parameters) : null;
            this.fActive = false;
            this.$emit('update:active', false);
            this.$emit('accept', this.parameters);
          } else {
            if (this.isValid || this.isValid == 'none') {
              this.accept ? this.accept() : null;
              this.fActive = false;
              this.$emit('update:active', false);
              this.$emit('accept', this.parameters);
            }
          }
        },
        rebound: function rebound() {
          var _this4 = this;

          this.$refs.dialogx.classList.add('locked');
          setTimeout(function () {
            _this4.$refs.dialogx.classList.remove('locked');
          }, 200);
        },
        handleClose: function handleClose(event, con) {
          if (con) {
            if (event.target.className.indexOf('vs-dialog-dark') != -1 && this.type == 'alert') {
              this.factive = false;
              this.$emit('update:active', false);
            } else if (event.target.className.indexOf('vs-dialog-dark') != -1) {
              this.rebound();
            }
          } else {
            if (event ? event.target.className.indexOf('vs-dialog-cancel') != -1 : event ? event.target.className.indexOf('vs-dialog-cancel--icon') != -1 : false) {
              this.fActive = false;
              this.$emit('update:active', false);
            }
          }

          this.$emit('close');
        },
        cancelClose: function cancelClose() {
          this.fActive = false;
          this.$emit('update:active', false);
          this.$emit('cancel'); // this.$emit('cancel')

          this.cancel ? this.cancel(this.parameters) : null;
        },
        insertBody: function insertBody() {
          var elx = this.$refs.con;
          var parentx = this.parent ? this.parent : document.body;
          parentx.insertBefore(elx, parentx.firstChild);
        }
      }
    }; // CONCATENATED MODULE: ./src/functions/vsDialog/index.vue?vue&type=script&lang=js&

    /* harmony default export */

    var functions_vsDialogvue_type_script_lang_js_ = vsDialogvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/functions/vsDialog/index.vue

    /* normalize component */

    var vsDialog_component = normalizeComponent(functions_vsDialogvue_type_script_lang_js_, vsDialogvue_type_template_id_4762135a_lang_html_render, vsDialogvue_type_template_id_4762135a_lang_html_staticRenderFns, false, null, null, null);
    vsDialog_component.options.__file = "index.vue";
    /* harmony default export */

    var vsDialog = vsDialog_component.exports; // CONCATENATED MODULE: ./src/components/vsPrompt/index.js

    /* harmony default export */

    var vsPrompt = function (Vue) {
      Vue.component(vsDialog.name, vsDialog);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDivider/vsDivider.vue?vue&type=template&id=317f4e11&lang=html&


    var vsDividervue_type_template_id_317f4e11_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-component vs-divider"
      }, [_c('span', {
        staticClass: "vs-divider-border after",
        class: _vm.borderClass,
        style: _vm.afterStyle
      }), _vm.icon || _vm.$slots.default ? _c('span', {
        staticClass: "vs-divider--text",
        class: _vm.textClass,
        style: {
          'color': _vm.textColor
        }
      }, [!_vm.icon ? [_vm._t("default")] : _c('vs-icon', {
        staticClass: "icon-divider notranslate vs-divider--icon",
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      })], 2) : _vm._e(), _c('span', {
        staticClass: "vs-divider-border before",
        class: _vm.borderClass,
        style: _vm.beforeStyle
      })]);
    };

    var vsDividervue_type_template_id_317f4e11_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsDivider/vsDivider.vue?vue&type=template&id=317f4e11&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDivider/vsDivider.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsDividervue_type_script_lang_js_ = {
      name: "VsDivider",
      props: {
        color: {
          type: String,
          default: 'rgba(0, 0, 0,.1)'
        },
        icon: {
          default: null,
          type: String
        },
        borderStyle: {
          default: 'solid',
          type: String
        },
        borderHeight: {
          default: '1px',
          type: String
        },
        position: {
          default: 'center',
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        }
      },
      computed: {
        getWidthAfter: function getWidthAfter() {
          var widthx = '100%';

          if (this.position == 'left') {
            widthx = '0%';
          } else if (this.position == 'left-center') {
            widthx = '25%';
          } else if (this.position == 'right-center') {
            widthx = '75%';
          } else if (this.position == 'right') {
            widthx = '100%';
          }

          return widthx;
        },
        getWidthBefore: function getWidthBefore() {
          var widthx = '100%';

          if (this.position == 'left') {
            widthx = '100%';
          } else if (this.position == 'left-center') {
            widthx = '75%';
          } else if (this.position == 'right-center') {
            widthx = '25%';
          } else if (this.position == 'right') {
            widthx = '0%';
          }

          return widthx;
        },
        borderColor: function borderColor() {
          if (!utils_color.isColor(this.color)) {
            return utils_color.getColor(this.color);
          }
        },
        afterStyle: function afterStyle() {
          var classes = {
            width: this.getWidthAfter,
            'border-top-width': this.borderHeight,
            'border-top-style': this.borderStyle
          };

          if (!utils_color.isColor(this.color)) {
            classes['border-top-color'] = this.borderColor;
          }

          return classes;
        },
        beforeStyle: function beforeStyle() {
          var classes = {
            width: this.getWidthBefore,
            'border-top-width': this.borderHeight,
            'border-top-style': this.borderStyle
          };

          if (!utils_color.isColor(this.color)) {
            classes['border-top-color'] = this.borderColor;
          }

          return classes;
        },
        borderClass: function borderClass() {
          var classes = {};
          var borderColor = utils_color.isColor(this.color) ? this.color : "default";
          classes["vs-divider-border-".concat(borderColor)] = true;
          return classes;
        },
        textColor: function textColor() {
          if (!utils_color.isColor(this.color)) {
            return utils_color.getColor(this.color === 'rgba(0, 0, 0,.1)' ? 'rgba(0,0,0,0.8)' : this.color);
          }
        },
        textClass: function textClass() {
          var classes = {};
          var textColor = utils_color.isColor(this.color) ? this.color : "default";
          classes["vs-divider-text-".concat(textColor)] = true;
          return classes;
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsDivider/vsDivider.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsDivider_vsDividervue_type_script_lang_js_ = vsDividervue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsDivider/vsDivider.vue

    /* normalize component */

    var vsDivider_component = normalizeComponent(vsDivider_vsDividervue_type_script_lang_js_, vsDividervue_type_template_id_317f4e11_lang_html_render, vsDividervue_type_template_id_317f4e11_lang_html_staticRenderFns, false, null, null, null);
    vsDivider_component.options.__file = "vsDivider.vue";
    /* harmony default export */

    var vsDivider = vsDivider_component.exports; // CONCATENATED MODULE: ./src/components/vsDivider/index.js

    /* harmony default export */

    var components_vsDivider = function (Vue) {
      Vue.component(vsDivider.name, vsDivider);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSpacer/vsSpacer.vue?vue&type=template&id=44914ac6&


    var vsSpacervue_type_template_id_44914ac6_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-spacer"
      });
    };

    var vsSpacervue_type_template_id_44914ac6_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSpacer/vsSpacer.vue?vue&type=template&id=44914ac6&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSpacer/vsSpacer.vue?vue&type=script&lang=js&
    //
    //
    //

    /* harmony default export */

    var vsSpacervue_type_script_lang_js_ = {
      name: 'VsSpacer'
    }; // CONCATENATED MODULE: ./src/components/vsSpacer/vsSpacer.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSpacer_vsSpacervue_type_script_lang_js_ = vsSpacervue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSpacer/vsSpacer.vue

    /* normalize component */

    var vsSpacer_component = normalizeComponent(vsSpacer_vsSpacervue_type_script_lang_js_, vsSpacervue_type_template_id_44914ac6_render, vsSpacervue_type_template_id_44914ac6_staticRenderFns, false, null, null, null);
    vsSpacer_component.options.__file = "vsSpacer.vue";
    /* harmony default export */

    var vsSpacer = vsSpacer_component.exports; // CONCATENATED MODULE: ./src/components/vsSpacer/index.js

    /* harmony default export */

    var components_vsSpacer = function (Vue) {
      Vue.component(vsSpacer.name, vsSpacer);
    }; // CONCATENATED MODULE: ./src/components/vsIcon/index.js

    /* harmony default export */


    var components_vsIcon = function (Vue) {
      Vue.component(vsIcon.name, vsIcon);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavbar.vue?vue&type=template&id=02a86abb&lang=html&


    var vsNavbarvue_type_template_id_02a86abb_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('header', {
        staticClass: "vs-navbar",
        class: ["vs-navbar-" + _vm.type, "vs-navbar-color-" + _vm.color, {
          'collapse': _vm.collapse
        }],
        style: [_vm.styleNavbar]
      }, [_c('div', {
        staticClass: "vs-navbar--header"
      }, [_c('button', {
        staticClass: "vs-navbar--btn-responsive",
        class: {
          'active-menu': _vm.activeMenuResponsive
        },
        on: {
          "click": function ($event) {
            _vm.activeMenuResponsive = !_vm.activeMenuResponsive;
          }
        }
      }, [_c('span', {
        staticClass: "btn-responsive-line line--1"
      }), _c('span', {
        staticClass: "btn-responsive-line line--2"
      }), _c('span', {
        staticClass: "btn-responsive-line line--3"
      })]), _vm._t("title")], 2), _c('div', {
        staticClass: "vs-con-items",
        class: {
          'activeMenuResponsive': _vm.activeMenuResponsive
        }
      }, [_vm._t("default")], 2)]);
    };

    var vsNavbarvue_type_template_id_02a86abb_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbar.vue?vue&type=template&id=02a86abb&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavbar.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsNavbarvue_type_script_lang_js_ = {
      name: 'VsNavbar',
      props: {
        value: {},
        type: {
          default: null,
          type: String
        },
        collapse: {
          default: false,
          type: Boolean
        },
        color: {
          type: String,
          default: 'transparent'
        },
        activeTextColor: {
          type: String,
          default: 'primary'
        },
        textColor: {
          type: String,
          default: 'rgb(40,40,40)'
        }
      },
      data: function data() {
        return {
          activeMenuResponsive: false
        };
      },
      computed: {
        styleNavbar: function styleNavbar() {
          if (utils_color.isColor(this.color)) {
            return {
              background: "rgb(".concat(utils_color.changeColor(this.color), ")")
            };
          }

          return {
            background: utils_color.getColor(this.color)
          };
        }
      },
      methods: {
        changeIndex: function changeIndex(index) {
          this.$emit('input', index);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbar.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsNavbar_vsNavbarvue_type_script_lang_js_ = vsNavbarvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbar.vue

    /* normalize component */

    var vsNavbar_component = normalizeComponent(vsNavbar_vsNavbarvue_type_script_lang_js_, vsNavbarvue_type_template_id_02a86abb_lang_html_render, vsNavbarvue_type_template_id_02a86abb_lang_html_staticRenderFns, false, null, null, null);
    vsNavbar_component.options.__file = "vsNavbar.vue";
    /* harmony default export */

    var vsNavbar = vsNavbar_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavItem.vue?vue&type=template&id=6f341d00&

    var vsNavItemvue_type_template_id_6f341d00_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        staticClass: "vs-navbar--item",
        class: [{
          'is-active-item': _vm.isActiveItem
        }, "vs-navbar-item-" + _vm.getActiveTextColor],
        style: [_vm.styleHover],
        on: {
          "click": function ($event) {
            return _vm.clickItem();
          },
          "mouseout": _vm.mouseout,
          "mouseover": _vm.mouseover
        }
      }, [_vm._t("default"), _c('span', {
        staticClass: "vs-navbar-after",
        style: [_vm.styleAfter]
      })], 2);
    };

    var vsNavItemvue_type_template_id_6f341d00_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavItem.vue?vue&type=template&id=6f341d00&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavItem.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsNavItemvue_type_script_lang_js_ = {
      name: 'VsNavbarItem',
      props: {
        index: {
          type: [Number, String],
          default: null
        }
      },
      data: function data() {
        return {
          hover: false
        };
      },
      computed: {
        getActiveTextColor: function getActiveTextColor() {
          return this.$parent.$props.activeTextColor;
        },
        isActiveItem: function isActiveItem() {
          return this.$parent.value == this.index;
        },
        styleAfter: function styleAfter() {
          return {
            background: utils_color.getColor(this.getActiveTextColor)
          };
        },
        styleHover: function styleHover() {
          if (this.isActiveItem) {
            return {
              color: utils_color.getColor(this.getActiveTextColor)
            };
          } else {
            return {
              color: this.hover ? utils_color.getColor(this.getActiveTextColor) : utils_color.getColor(this.$parent.$props.textColor)
            };
          }
        }
      },
      methods: {
        clickItem: function clickItem() {
          this.$parent.changeIndex(this.index);
        },
        mouseout: function mouseout() {
          this.hover = false;
        },
        mouseover: function mouseover() {
          this.hover = true;
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavItem.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsNavbar_vsNavItemvue_type_script_lang_js_ = vsNavItemvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavItem.vue

    /* normalize component */

    var vsNavItem_component = normalizeComponent(vsNavbar_vsNavItemvue_type_script_lang_js_, vsNavItemvue_type_template_id_6f341d00_render, vsNavItemvue_type_template_id_6f341d00_staticRenderFns, false, null, null, null);
    vsNavItem_component.options.__file = "vsNavItem.vue";
    /* harmony default export */

    var vsNavItem = vsNavItem_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavGroup.vue?vue&type=template&id=2d6da28e&

    var vsNavGroupvue_type_template_id_2d6da28e_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        staticClass: "vs-nav-item"
      }, [_c('div', {
        staticClass: "vs-nav-item-slot"
      }, [_vm._t("default")], 2), _c('ul', {
        staticClass: "vs-nav-submenu"
      }, [_vm._t("submenu")], 2)]);
    };

    var vsNavGroupvue_type_template_id_2d6da28e_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavGroup.vue?vue&type=template&id=2d6da28e&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavGroup.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsNavGroupvue_type_script_lang_js_ = {
      name: 'VsNavbarGroup'
    }; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavGroup.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsNavbar_vsNavGroupvue_type_script_lang_js_ = vsNavGroupvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavGroup.vue

    /* normalize component */

    var vsNavGroup_component = normalizeComponent(vsNavbar_vsNavGroupvue_type_script_lang_js_, vsNavGroupvue_type_template_id_2d6da28e_render, vsNavGroupvue_type_template_id_2d6da28e_staticRenderFns, false, null, null, null);
    vsNavGroup_component.options.__file = "vsNavGroup.vue";
    /* harmony default export */

    var vsNavGroup = vsNavGroup_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavbarTitle.vue?vue&type=template&id=abff2492&

    var vsNavbarTitlevue_type_template_id_abff2492_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('h3', {
        staticClass: "vs-navbar--title"
      }, [_vm._t("default")], 2);
    };

    var vsNavbarTitlevue_type_template_id_abff2492_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbarTitle.vue?vue&type=template&id=abff2492&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavbarTitle.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsNavbarTitlevue_type_script_lang_js_ = {
      name: 'VsNavbarTitle'
    }; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbarTitle.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsNavbar_vsNavbarTitlevue_type_script_lang_js_ = vsNavbarTitlevue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbarTitle.vue

    /* normalize component */

    var vsNavbarTitle_component = normalizeComponent(vsNavbar_vsNavbarTitlevue_type_script_lang_js_, vsNavbarTitlevue_type_template_id_abff2492_render, vsNavbarTitlevue_type_template_id_abff2492_staticRenderFns, false, null, null, null);
    vsNavbarTitle_component.options.__file = "vsNavbarTitle.vue";
    /* harmony default export */

    var vsNavbarTitle = vsNavbarTitle_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavbarItems.vue?vue&type=template&id=fd9aae46&

    var vsNavbarItemsvue_type_template_id_fd9aae46_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-navbar--items"
      }, [_vm._t("default")], 2);
    };

    var vsNavbarItemsvue_type_template_id_fd9aae46_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbarItems.vue?vue&type=template&id=fd9aae46&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsNavbar/vsNavbarItems.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsNavbarItemsvue_type_script_lang_js_ = {
      name: 'VsNavbarItems'
    }; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbarItems.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsNavbar_vsNavbarItemsvue_type_script_lang_js_ = vsNavbarItemsvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsNavbar/vsNavbarItems.vue

    /* normalize component */

    var vsNavbarItems_component = normalizeComponent(vsNavbar_vsNavbarItemsvue_type_script_lang_js_, vsNavbarItemsvue_type_template_id_fd9aae46_render, vsNavbarItemsvue_type_template_id_fd9aae46_staticRenderFns, false, null, null, null);
    vsNavbarItems_component.options.__file = "vsNavbarItems.vue";
    /* harmony default export */

    var vsNavbarItems = vsNavbarItems_component.exports; // CONCATENATED MODULE: ./src/components/vsNavbar/index.js

    /* harmony default export */

    var components_vsNavbar = function (Vue) {
      Vue.component(vsNavbar.name, vsNavbar);
      Vue.component(vsNavItem.name, vsNavItem);
      Vue.component(vsNavGroup.name, vsNavGroup);
      Vue.component(vsNavbarTitle.name, vsNavbarTitle);
      Vue.component(vsNavbarItems.name, vsNavbarItems);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSideBar/vsSidebar.vue?vue&type=template&id=6ab76ff0&


    var vsSidebarvue_type_template_id_6ab76ff0_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "vs-sidebar-animate"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.staticPosition || _vm.value,
          expression: "staticPosition || value"
        }],
        ref: "sidebarbackground",
        staticClass: "vs-content-sidebar"
      }, [!_vm.hiddenBackground ? _c('div', {
        staticClass: "vs-sidebar--background"
      }) : _vm._e(), _c('div', {
        ref: "sidebarContainer",
        staticClass: "vs-sidebar",
        class: ["vs-sidebar-" + _vm.color, {
          'vs-sidebar-parent': _vm.parent != 'body',
          'vs-sidebar-staticPosition': _vm.staticPosition,
          'vs-sidebar-position-right': _vm.positionRight,
          'vs-sidebar-reduce': _vm.reduce,
          'vs-sidebar-reduceNotRebound': _vm.reduceNotRebound,
          'vs-sidebar-reduceNotHoverExpand': _vm.reduceNotHoverExpand
        }]
      }, [_vm.$slots.header ? _c('header', {
        staticClass: "vs-sidebar--header"
      }, [_vm._t("header")], 2) : _vm._e(), _c('div', {
        staticClass: "vs-sidebar--items"
      }, [_vm._t("default")], 2), _vm.spacer ? _c('vs-spacer') : _vm._e(), _vm.$slots.footer ? _c('footer', {
        staticClass: "vs-sidebar--footer"
      }, [_vm._t("footer")], 2) : _vm._e()], 1)])]);
    };

    var vsSidebarvue_type_template_id_6ab76ff0_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebar.vue?vue&type=template&id=6ab76ff0&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSideBar/vsSidebar.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsSidebarvue_type_script_lang_js_ = {
      name: 'VsSidebar',
      props: {
        value: {
          default: false
        },
        defaultIndex: {
          default: null,
          type: [String, Number]
        },
        color: {
          default: 'primary',
          type: String
        },
        parent: {
          default: null,
          type: [String, Object]
        },
        spacer: {
          default: false,
          type: Boolean
        },
        staticPosition: {
          default: false,
          type: Boolean
        },
        positionRight: {
          default: false,
          type: Boolean
        },
        clickNotClose: {
          default: false,
          type: Boolean
        },
        reduce: {
          default: false,
          type: Boolean
        },
        reduceNotRebound: {
          default: false,
          type: Boolean
        },
        reduceNotHoverExpand: {
          default: false,
          type: Boolean
        },
        hiddenBackground: {
          default: false,
          type: Boolean
        }
      },
      data: function data() {
        return {
          currentIndex: 0
        };
      },
      created: function created() {
        this.currentIndex = this.defaultIndex;
      },
      mounted: function mounted() {
        this.insertBody();
      },
      watch: {
        value: function value() {
          if (!this.clickNotClose) this.addEventClick();
        }
      },
      methods: {
        getActive: function getActive() {
          return this.currentIndex;
        },
        setIndexActive: function setIndexActive(index) {
          this.currentIndex = index;
        },
        addEventClick: function addEventClick() {
          var _this = this;

          this.$nextTick(function () {
            var parentx = typeof _this.parent == 'string' ? document.querySelector(_this.parent) : _this.parent;
            var element = parentx || window;

            if (_this.value) {
              setTimeout(function () {
                element.addEventListener('click', _this.closeSidebar);
              }, 300);
            }
          });
        },
        closeSidebar: function closeSidebar(evt) {
          var parent = evt.target.closest('.vs-sidebar');

          if (!parent) {
            this.$emit('input', false);
            var parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent;
            var element = parentx || window;
            element.removeEventListener('click', this.closeSidebar);
          }
        },
        insertBody: function insertBody() {
          if (this.parent) {
            var elx = this.$refs.sidebarbackground;
            var parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent;
            parentx.insertBefore(elx, parentx.firstChild);
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebar.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSideBar_vsSidebarvue_type_script_lang_js_ = vsSidebarvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebar.vue

    /* normalize component */

    var vsSidebar_component = normalizeComponent(vsSideBar_vsSidebarvue_type_script_lang_js_, vsSidebarvue_type_template_id_6ab76ff0_render, vsSidebarvue_type_template_id_6ab76ff0_staticRenderFns, false, null, null, null);
    vsSidebar_component.options.__file = "vsSidebar.vue";
    /* harmony default export */

    var vsSidebar = vsSidebar_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSideBar/vsSidebarItem.vue?vue&type=template&id=74ad8ff9&

    var vsSidebarItemvue_type_template_id_74ad8ff9_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-sidebar--item",
        class: {
          'vs-sidebar-item-active': _vm.getActive
        },
        on: {
          "click": _vm.setIndexActive
        }
      }, [_vm.to ? _c('router-link', {
        attrs: {
          "to": _vm.to
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      }), _vm._t("default")], 2) : _c('a', {
        attrs: {
          "href": _vm.href
        }
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      }), _vm._t("default")], 2)], 1);
    };

    var vsSidebarItemvue_type_template_id_74ad8ff9_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebarItem.vue?vue&type=template&id=74ad8ff9&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSideBar/vsSidebarItem.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsSidebarItemvue_type_script_lang_js_ = {
      name: 'VsSidebarItem',
      props: {
        icon: {
          default: null,
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        },
        href: {
          default: '#',
          type: String
        },
        to: {
          default: null,
          type: [String, Object]
        },
        index: {
          default: null,
          type: [String, Number]
        }
      },
      computed: {
        getActive: function getActive() {
          return this.$parent.getActive() == this.index;
        }
      },
      methods: {
        setIndexActive: function setIndexActive() {
          this.$parent.setIndexActive(this.index);
          this.$emit('click');
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebarItem.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSideBar_vsSidebarItemvue_type_script_lang_js_ = vsSidebarItemvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebarItem.vue

    /* normalize component */

    var vsSidebarItem_component = normalizeComponent(vsSideBar_vsSidebarItemvue_type_script_lang_js_, vsSidebarItemvue_type_template_id_74ad8ff9_render, vsSidebarItemvue_type_template_id_74ad8ff9_staticRenderFns, false, null, null, null);
    vsSidebarItem_component.options.__file = "vsSidebarItem.vue";
    /* harmony default export */

    var vsSidebarItem = vsSidebarItem_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSideBar/vsSidebarGroup.vue?vue&type=template&id=03dfb3d2&

    var vsSidebarGroupvue_type_template_id_03dfb3d2_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-sidebar-group",
        class: {
          'vs-sidebar-group-open': _vm.openItems
        },
        on: {
          "mouseover": _vm.mouseover,
          "mouseout": _vm.mouseout
        }
      }, [_c('h4', {
        on: {
          "click": _vm.clickGroup
        }
      }, [_vm._v(_vm._s(_vm.title) + " "), _c('vs-icon', [_vm._v("keyboard_arrow_down")])], 1), _c('span', {
        staticClass: "vs-sidebar--tooltip"
      }, [_vm._v(_vm._s(_vm.title))]), _c('ul', {
        ref: "items",
        staticClass: "vs-sidebar--group-items",
        style: _vm.styleItems
      }, [_vm._t("default")], 2)]);
    };

    var vsSidebarGroupvue_type_template_id_03dfb3d2_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebarGroup.vue?vue&type=template&id=03dfb3d2&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsSideBar/vsSidebarGroup.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsSidebarGroupvue_type_script_lang_js_ = {
      name: 'VsSidebarGroup',
      props: {
        collapsed: {
          default: false,
          type: Boolean
        },
        title: {
          default: null,
          type: String
        },
        openHover: {
          default: false,
          type: Boolean
        },
        open: {
          default: false,
          type: Boolean
        }
      },
      data: function data() {
        return {
          maxHeight: '0px',
          openItems: false
        };
      },
      computed: {
        styleItems: function styleItems() {
          return {
            maxHeight: this.maxHeight
          };
        }
      },
      watch: {
        maxHeight: function maxHeight() {
          this.openItems = this.maxHeight != '0px';
        }
      },
      mounted: function mounted() {
        this.openItems = this.open;

        if (this.open) {
          this.maxHeight = 'none';
        }
      },
      methods: {
        getActive: function getActive() {
          return this.$parent.getActive();
        },
        setIndexActive: function setIndexActive(index) {
          this.$parent.setIndexActive(index);
        },
        clickGroup: function clickGroup() {
          var _this = this;

          if (!this.openHover) {
            var scrollHeight = this.$refs.items.scrollHeight;

            if (this.maxHeight == '0px') {
              this.maxHeight = "".concat(scrollHeight, "px");
              setTimeout(function () {
                _this.maxHeight = 'none';
              }, 300);
            } else {
              this.maxHeight = "".concat(scrollHeight, "px");
              setTimeout(function () {
                _this.maxHeight = "".concat(0, "px");
              }, 50);
            }
          }
        },
        mouseover: function mouseover() {
          if (this.openHover) {
            var scrollHeight = this.$refs.items.scrollHeight;
            this.maxHeight = "".concat(scrollHeight, "px");
          }
        },
        mouseout: function mouseout() {
          if (this.openHover) {
            var scrollHeight = 0;
            this.maxHeight = "".concat(scrollHeight, "px");
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebarGroup.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsSideBar_vsSidebarGroupvue_type_script_lang_js_ = vsSidebarGroupvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsSideBar/vsSidebarGroup.vue

    /* normalize component */

    var vsSidebarGroup_component = normalizeComponent(vsSideBar_vsSidebarGroupvue_type_script_lang_js_, vsSidebarGroupvue_type_template_id_03dfb3d2_render, vsSidebarGroupvue_type_template_id_03dfb3d2_staticRenderFns, false, null, null, null);
    vsSidebarGroup_component.options.__file = "vsSidebarGroup.vue";
    /* harmony default export */

    var vsSidebarGroup = vsSidebarGroup_component.exports; // CONCATENATED MODULE: ./src/components/vsSideBar/index.js

    /* harmony default export */

    var vsSideBar = function (Vue) {
      Vue.component(vsSidebar.name, vsSidebar);
      Vue.component(vsSidebarItem.name, vsSidebarItem);
      Vue.component(vsSidebarGroup.name, vsSidebarGroup);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDown.vue?vue&type=template&id=66cbb999&lang=html&


    var vsDropDownvue_type_template_id_66cbb999_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('button', _vm._g(_vm._b({
        ref: "dropdown",
        staticClass: "vs-con-dropdown parent-dropdown",
        attrs: {
          "type": "button"
        }
      }, 'button', _vm.$attrs, false), _vm.listeners), [_vm._t("default")], 2);
    };

    var vsDropDownvue_type_template_id_66cbb999_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDown.vue?vue&type=template&id=66cbb999&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDown.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsDropDownvue_type_script_lang_js_ = {
      name: "VsDropdown",
      inheritAttrs: false,
      props: {
        vsTriggerClick: {
          default: false,
          type: Boolean
        },
        vsTriggerContextmenu: {
          default: false,
          type: Boolean
        },
        color: {
          default: 'primary',
          type: String
        },
        vsCustomContent: {
          default: false,
          type: Boolean
        },
        vsDropRight: {
          default: false,
          type: Boolean
        }
      },
      data: function data() {
        return {
          vsDropdownVisible: false,
          rightx: false
        };
      },
      computed: {
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            contextmenu: function contextmenu(evt) {
              return _this.vsTriggerContextmenu ? _this.clickToogleMenu(evt, true) : {};
            },
            click: function click(evt) {
              return _this.vsTriggerContextmenu ? {} : _this.clickToogleMenu(evt);
            },
            mouseout: function mouseout(evt) {
              return _this.toggleMenu('out', evt);
            },
            mouseover: function mouseover(evt) {
              return _this.toggleMenu('over', evt);
            }
          });
        }
      },
      watch: {
        vsDropdownVisible: function vsDropdownVisible() {
          this.changePositionMenu();

          if (this.vsDropdownVisible) {
            this.$emit('focus');
            document.addEventListener('click', this.clickx);
          } else {
            this.$emit('blur');
          }
        }
      },
      mounted: function mounted() {
        this.changeColor();
        document.addEventListener('click', this.clickx);
      },
      beforeDestroy: function beforeDestroy() {
        document.removeEventListener('click', this.clickx);
      },
      methods: {
        clickx: function clickx(evt) {
          var _this$$children$filte = this.$children.filter(function (item) {
            return item.hasOwnProperty('dropdownVisible');
          }),
              _this$$children$filte2 = _slicedToArray(_this$$children$filte, 1),
              dropdownMenu = _this$$children$filte2[0];

          dropdownMenu.vsCustomContent = this.vsCustomContent;
          dropdownMenu.vsTriggerClick = this.vsTriggerClick;
          dropdownMenu.vsDropRight = this.vsDropRight;

          if ((this.vsTriggerClick || this.vsCustomContent) && this.vsDropdownVisible) {
            if (evt.target !== this.$refs.dropdown && evt.target.parentNode !== this.$refs.dropdown && evt.target.parentNode.parentNode !== this.$refs.dropdown) {
              if (!evt.target.closest('.vs-dropdown--menu')) {
                dropdownMenu.dropdownVisible = this.vsDropdownVisible = false;
                document.removeEventListener('click', this.clickx);
              }
            }
          }
        },
        changeColor: function changeColor() {
          var _this2 = this;

          var child = this.$children;
          child.forEach(function (item) {
            if (item.$vnode.tag.indexOf('dropdown') != -1) {
              item.color = _this2.color;
            }
          });
        },
        changePositionMenu: function changePositionMenu() {
          var _this3 = this;

          var _this$$children$filte3 = this.$children.filter(function (item) {
            return item.hasOwnProperty('dropdownVisible');
          }),
              _this$$children$filte4 = _slicedToArray(_this$$children$filte3, 1),
              dropdownMenu = _this$$children$filte4[0];

          var scrollTopx = window.pageYOffset || document.documentElement.scrollTop;

          if (this.$refs.dropdown.getBoundingClientRect().top + 300 >= window.innerHeight) {
            this.$nextTick(function () {
              dropdownMenu.topx = _this3.$refs.dropdown.getBoundingClientRect().top - dropdownMenu.$el.clientHeight - 7 + scrollTopx;
              dropdownMenu.notHeight = true;
            });
          } else {
            dropdownMenu.notHeight = false;
            dropdownMenu.topx = this.$refs.dropdown.getBoundingClientRect().top + this.$refs.dropdown.clientHeight + scrollTopx - 5;
          }

          this.$nextTick(function () {
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            if (_this3.$refs.dropdown.getBoundingClientRect().left + dropdownMenu.$el.offsetWidth >= w - 25) {
              _this3.rightx = true;
            }

            dropdownMenu.leftx = _this3.$refs.dropdown.getBoundingClientRect().left + (_this3.vsDropRight ? dropdownMenu.$el.clientWidth : _this3.$refs.dropdown.clientWidth);
          });
        },
        clickToogleMenu: function clickToogleMenu(evt) {
          var _this4 = this;

          if (evt.type == 'contextmenu') {
            evt.preventDefault();
          }

          var _this$$children$filte5 = this.$children.filter(function (item) {
            return item.hasOwnProperty('dropdownVisible');
          }),
              _this$$children$filte6 = _slicedToArray(_this$$children$filte5, 1),
              dropdownMenu = _this$$children$filte6[0];

          if (this.vsTriggerClick || this.vsTriggerContextmenu) {
            if (this.vsDropdownVisible && !evt.target.closest('.vs-dropdown--menu')) {
              dropdownMenu.dropdownVisible = this.vsDropdownVisible = false;
            } else {
              dropdownMenu.dropdownVisible = this.vsDropdownVisible = true;
              window.addEventListener('click', function () {
                if (!evt.target.closest('.vs-con-dropdown') && !evt.target.closest('.vs-dropdown--menu')) {
                  dropdownMenu.dropdownVisible = _this4.vsDropdownVisible = false;
                }
              });
            }
          }
        },
        toggleMenu: function toggleMenu(typex, evt) {
          var _this$$children$filte7 = this.$children.filter(function (item) {
            return item.hasOwnProperty('dropdownVisible');
          }),
              _this$$children$filte8 = _slicedToArray(_this$$children$filte7, 1),
              dropdownMenu = _this$$children$filte8[0];

          if (!this.vsTriggerClick && !this.vsTriggerContextmenu) {
            if (typex == 'over') {
              dropdownMenu.dropdownVisible = this.vsDropdownVisible = true;
            } else {
              if (!evt.relatedTarget.classList.contains('vs-dropdown-menu')) {
                dropdownMenu.dropdownVisible = this.vsDropdownVisible = false;
              }
            }
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDown.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsDropDown_vsDropDownvue_type_script_lang_js_ = vsDropDownvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDown.vue

    /* normalize component */

    var vsDropDown_component = normalizeComponent(vsDropDown_vsDropDownvue_type_script_lang_js_, vsDropDownvue_type_template_id_66cbb999_lang_html_render, vsDropDownvue_type_template_id_66cbb999_lang_html_staticRenderFns, false, null, null, null);
    vsDropDown_component.options.__file = "vsDropDown.vue";
    /* harmony default export */

    var vsDropDown = vsDropDown_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDownMenu.vue?vue&type=template&id=48bec936&lang=html&

    var vsDropDownMenuvue_type_template_id_48bec936_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "dropdownx"
        }
      }, [_vm.dropdownVisible ? _c('div', {
        ref: "options",
        staticClass: "con-vs-dropdown--menu vs-dropdown-menu",
        class: {
          'rightx': _vm.rightx,
          'notHeight': _vm.notHeight
        },
        style: {
          'left': _vm.leftx + 'px',
          'top': _vm.topx + 'px'
        },
        on: {
          "mouseleave": _vm.mouseleavex,
          "mouseenter": _vm.mouseenterx
        }
      }, [!_vm.vsCustomContent ? _c('ul', {
        staticClass: "vs-component vs-dropdown--menu"
      }, [_vm._t("default")], 2) : _c('div', {
        staticClass: "vs-dropdown--custom vs-dropdown--menu"
      }, [_vm._t("default")], 2), _c('div', {
        ref: "menuAfter",
        class: [_vm.vsDropRight ? 'vs-dropdown-right--menu--after' : 'vs-dropdown--menu--after']
      })]) : _vm._e()]);
    };

    var vsDropDownMenuvue_type_template_id_48bec936_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownMenu.vue?vue&type=template&id=48bec936&lang=html&
    // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.array.find.js

    var es6_array_find = __webpack_require__("8549"); // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDownMenu.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */


    var vsDropDownMenuvue_type_script_lang_js_ = {
      name: "VsDropdownMenu",
      data: function data() {
        return {
          dropdownVisible: false,
          leftAfter: 20,
          leftx: 0,
          topx: 0,
          rightx: true,
          vsTriggerClick: false,
          vsDropRight: false,
          widthx: 0,
          notHeight: false,
          vsCustomContent: false,
          parentNode: null
        };
      },
      watch: {
        dropdownVisible: function dropdownVisible() {
          var dropdownGroup = this.$children.filter(function (item) {
            return item.hasOwnProperty('activeGroup');
          });
          dropdownGroup.forEach(function (item_group) {
            item_group.activeGroup = false;
          });
          this.setDirection();
        }
      },
      mounted: function mounted() {
        this.insertBody();
      },
      beforeDestroy: function beforeDestroy() {
        this.$el.parentNode.removeChild(this.$el);
      },
      methods: {
        mouseenterx: function mouseenterx() {
          if (!this.vsTriggerClick) {
            this.dropdownVisible = true;
            this.widthx = this.$el.clientWidth;
          }
        },
        mouseleavex: function mouseleavex() {
          if (!this.vsTriggerClick) {
            this.dropdownVisible = false;
            this.widthx = this.$el.clientWidth;
          }
        },
        setDirection: function setDirection() {
          var _this = this;

          setTimeout(function () {
            var dropdown = _this.parentNode;
            var menuAfter = _this.$refs.menuAfter;
            if (!menuAfter) return;

            if (dropdown && menuAfter && dropdown.getBoundingClientRect().top + 300 >= window.innerHeight) {
              var hasGroup = _this.$children.find(function (it) {
                return it.hasOwnProperty('activeGroup');
              });

              menuAfter.style.bottom = '-5px';
              menuAfter.style.transform = 'rotate(225deg)';
              return;
            }

            menuAfter.style.top = '10px';
          }, 100);
        },
        toggleMenu: function toggleMenu(event) {
          if (event.type == 'mouseover' && !this.vsTriggerClick) {
            this.dropdownVisible = true;
          } else if (!this.vsTriggerClick) {
            this.dropdownVisible = false;
          }

          this.widthx = this.$el.clientWidth;
        },
        insertBody: function insertBody() {
          var elp = this.$el;
          this.parentNode = this.$el.parentNode;
          document.body.insertBefore(elp, document.body.firstChild);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownMenu.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsDropDown_vsDropDownMenuvue_type_script_lang_js_ = vsDropDownMenuvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownMenu.vue

    /* normalize component */

    var vsDropDownMenu_component = normalizeComponent(vsDropDown_vsDropDownMenuvue_type_script_lang_js_, vsDropDownMenuvue_type_template_id_48bec936_lang_html_render, vsDropDownMenuvue_type_template_id_48bec936_lang_html_staticRenderFns, false, null, null, null);
    vsDropDownMenu_component.options.__file = "vsDropDownMenu.vue";
    /* harmony default export */

    var vsDropDownMenu = vsDropDownMenu_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDownItem.vue?vue&type=template&id=0fb0319c&lang=html&

    var vsDropDownItemvue_type_template_id_0fb0319c_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        staticClass: "vs-component vs-dropdown--item",
        class: {
          'divider': _vm.divider
        },
        style: {
          'color': _vm.hoverx ? _vm.giveColor() + ' !important' : null,
          'background': _vm.hoverx ? _vm.giveColor(.01) + ' !important' : null
        },
        on: {
          "click": _vm.closeParent,
          "mouseover": function ($event) {
            _vm.hoverx = true;
          },
          "mouseout": function ($event) {
            _vm.hoverx = false;
          }
        }
      }, [_vm.to ? _c('router-link', _vm._g(_vm._b({
        staticClass: "vs-dropdown--item-link",
        class: {
          'disabled': _vm.disabled
        },
        attrs: {
          "to": _vm.to
        }
      }, 'router-link', _vm.$attrs, false), _vm.$listeners), [_vm._v("\n    " + _vm._s(_vm.$attrs.disabled) + "\n    "), _vm._t("default")], 2) : _c('a', _vm._g(_vm._b({
        staticClass: "vs-dropdown--item-link",
        class: {
          'disabled': _vm.disabled
        }
      }, 'a', _vm.$attrs, false), _vm.$listeners), [_vm._t("default")], 2)], 1);
    };

    var vsDropDownItemvue_type_template_id_0fb0319c_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownItem.vue?vue&type=template&id=0fb0319c&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDownItem.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsDropDownItemvue_type_script_lang_js_ = {
      name: "VsDropdownItem",
      inheritAttrs: false,
      props: {
        to: {},
        disabled: {
          default: false,
          type: Boolean
        },
        divider: {
          default: false,
          type: Boolean
        }
      },
      data: function data() {
        return {
          hoverx: false,
          vsDropDownItem: true,
          color: null
        };
      },
      mounted: function mounted() {
        this.changeColor();
      },
      updated: function updated() {
        this.changeColor();
      },
      methods: {
        closeParent: function closeParent() {
          if (this.disabled) {
            return;
          }

          searchParent(this);

          function searchParent(_this) {
            var parent = _this.$parent;

            if (!parent.$el.className) {
              return;
            }

            if (parent.$el.className.indexOf('parent-dropdown') == -1) {
              searchParent(parent);
            } else {
              var _parent$$children$fil = parent.$children.filter(function (item) {
                return item.hasOwnProperty('dropdownVisible');
              }),
                  _parent$$children$fil2 = _slicedToArray(_parent$$children$fil, 1),
                  dropdownMenu = _parent$$children$fil2[0];

              dropdownMenu.dropdownVisible = parent.vsDropdownVisible = false;
            }
          }
        },
        changeColor: function changeColor() {
          var _self = this;

          searchParent(this);

          function searchParent(_this) {
            var parent = _this.$parent;

            if (!parent.$el.className) {
              return;
            }

            if (parent.$el.className.indexOf('parent-dropdown') == -1) {
              searchParent(parent);
            } else {
              _self.color = parent.color;
            }
          }
        },
        giveColor: function giveColor() {
          var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
          return utils_color.rColor(this.color, opacity);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownItem.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsDropDown_vsDropDownItemvue_type_script_lang_js_ = vsDropDownItemvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownItem.vue

    /* normalize component */

    var vsDropDownItem_component = normalizeComponent(vsDropDown_vsDropDownItemvue_type_script_lang_js_, vsDropDownItemvue_type_template_id_0fb0319c_lang_html_render, vsDropDownItemvue_type_template_id_0fb0319c_lang_html_staticRenderFns, false, null, null, null);
    vsDropDownItem_component.options.__file = "vsDropDownItem.vue";
    /* harmony default export */

    var vsDropDownItem = vsDropDownItem_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDownGroup.vue?vue&type=template&id=4ec54ab7&lang=html&

    var vsDropDownGroupvue_type_template_id_4ec54ab7_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        ref: "group",
        staticClass: "vs-component vs-dropdown--group",
        class: {
          'marginIcon': _vm.vsCollapse,
          'no-cascading': !_vm.vsCollapse,
          'group-rightx': _vm.rightx
        },
        on: {
          "click": _vm.clickGroup
        }
      }, [_vm.vsCollapse ? _c('span', {
        staticClass: "span vs-dropdown--group-label"
      }, [_vm._v(_vm._s(_vm.vsLabel))]) : _c('h3', [_vm._v(_vm._s(_vm.vsLabel))]), _vm.vsCollapse ? _c('vs-icon', {
        staticClass: "icon-group notranslate vs-dropdown--group-icon",
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.vsIcon
        }
      }) : _vm._e(), _c('div', {
        ref: "ulx",
        staticClass: "con-dropdown--group-con-ul",
        class: {
          'con-dropdown-group-no-cascading': !_vm.vsCollapse
        },
        style: _vm.styleItems
      }, [_c('ul', {
        staticClass: "con-dropdown--group-ul"
      }, [_vm._t("default")], 2)])], 1);
    };

    var vsDropDownGroupvue_type_template_id_4ec54ab7_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownGroup.vue?vue&type=template&id=4ec54ab7&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsDropDown/vsDropDownGroup.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsDropDownGroupvue_type_script_lang_js_ = {
      name: 'VsDropdownGroup',
      props: {
        vsLabel: {
          default: 'Options',
          type: String
        },
        vsCollapse: {
          default: false,
          type: Boolean
        },
        vsIcon: {
          default: 'keyboard_arrow_right',
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        }
      },
      data: function data() {
        return {
          activeGroup: false,
          rightx: false,
          widthx: 0,
          maxHeight: '0px'
        };
      },
      computed: {
        styleItems: function styleItems() {
          return {
            maxHeight: this.vsCollapse ? this.maxHeight : 'auto'
          };
        }
      },
      methods: {
        clickGroup: function clickGroup(evt) {
          var _this2 = this;

          if (evt.target != this.$refs.group) return;

          if (!this.openHover) {
            var scrollHeight = this.$refs.ulx.scrollHeight;

            if (this.maxHeight == '0px') {
              this.maxHeight = "".concat(scrollHeight, "px");
              setTimeout(function () {
                _this2.maxHeight = 'none';
              }, 300);
            } else {
              this.maxHeight = "".concat(scrollHeight, "px");
              setTimeout(function () {
                _this2.maxHeight = "".concat(0, "px");
              }, 50);
            }
          }
        },
        beforeEnter: function beforeEnter(el) {
          el.style.height = 0;
          el.style.opacity = 0;
        },
        enter: function enter(el, done) {
          // let h = this.$refs.ulx.scrollHeight
          // this.$refs.ulx.style.height = h + 'px'
          // el.style.opacity = 1
          // parents(this)
          // function parents(_this){
          //   if(_this.$parent.$el.className.search('vs-dropdown--group')!=-1){
          //     // this.$parent.$el
          //     let hp = _this.$parent.$refs.ulx.scrollHeight
          //     _this.$parent.$refs.ulx.style.height = hp + h + 'px'
          //     parents(_this.$parent)
          //   }
          // }
          done();
        },
        leave: function leave(el) {
          var __this = this;

          addParents(this);

          function addParents(_this) {
            if (_this.$parent.$refs.ulx) {
              var hp = _this.$parent.$refs.ulx.scrollHeight - __this.$refs.ulx.scrollHeight;
              _this.$parent.$refs.ulx.style.height = hp + 'px';
              addParents(_this.$parent);
            }
          }

          if (!this.$parent.$refs.ulx) {
            this.$refs.ulx.style.height = 0 + 'px';
          }

          this.$refs.ulx.style.height = 0 + 'px';
          el.style.opacity = 0;
        },
        toggleGroup: function toggleGroup(evt) {
          if (evt.target == this.$refs.group) {
            this.activeGroup = !this.activeGroup;
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownGroup.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsDropDown_vsDropDownGroupvue_type_script_lang_js_ = vsDropDownGroupvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsDropDown/vsDropDownGroup.vue

    /* normalize component */

    var vsDropDownGroup_component = normalizeComponent(vsDropDown_vsDropDownGroupvue_type_script_lang_js_, vsDropDownGroupvue_type_template_id_4ec54ab7_lang_html_render, vsDropDownGroupvue_type_template_id_4ec54ab7_lang_html_staticRenderFns, false, null, null, null);
    vsDropDownGroup_component.options.__file = "vsDropDownGroup.vue";
    /* harmony default export */

    var vsDropDownGroup = vsDropDownGroup_component.exports; // CONCATENATED MODULE: ./src/components/vsDropDown/index.js

    /* harmony default export */

    var components_vsDropDown = function (Vue) {
      Vue.component(vsDropDown.name, vsDropDown);
      Vue.component(vsDropDownMenu.name, vsDropDownMenu);
      Vue.component(vsDropDownItem.name, vsDropDownItem);
      Vue.component(vsDropDownGroup.name, vsDropDownGroup);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTable.vue?vue&type=template&id=24791894&


    var vsTablevue_type_template_id_24791894_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-component vs-con-table",
        class: [{
          'stripe': _vm.stripe,
          'hoverFlat': _vm.hoverFlat
        }, "vs-table-" + _vm.color]
      }, [_c('header', {
        staticClass: "header-table vs-table--header"
      }, [_vm._t("header"), _vm.search ? _c('div', {
        staticClass: "con-input-search vs-table--search"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.searchx,
          expression: "searchx"
        }],
        staticClass: "input-search vs-table--search-input",
        attrs: {
          "type": "text"
        },
        domProps: {
          "value": _vm.searchx
        },
        on: {
          "input": function ($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.searchx = $event.target.value;
          }
        }
      }), _c('vs-icon', {
        attrs: {
          "icon": "search"
        }
      })], 1) : _vm._e()], 2), _c('div', {
        staticClass: "con-tablex vs-table--content"
      }, [_c('div', {
        staticClass: "vs-con-tbody vs-table--tbody ",
        style: _vm.styleConTbody
      }, [_c('table', {
        ref: "table",
        staticClass: "vs-table vs-table--tbody-table"
      }, [_c('thead', {
        ref: "thead",
        staticClass: "vs-table--thead"
      }, [_c('tr', [_vm.multiple || _vm.hasExpadableData ? _c('th', {
        staticClass: "td-check"
      }, [_vm.multiple ? _c('span', {
        staticClass: "con-td-check"
      }, [_c('vs-checkbox', {
        key: _vm.isCheckedLine ? 'remove' : 'check',
        attrs: {
          "icon": _vm.isCheckedLine ? 'remove' : 'check',
          "checked": _vm.isCheckedMultiple,
          "size": "small"
        },
        on: {
          "click": _vm.changeCheckedMultiple
        }
      })], 1) : _vm._e()]) : _vm._e(), _vm._t("thead")], 2)]), _vm._t("default", null, {
        "data": _vm.datax
      })], 2)]), _vm.isNoData ? _c('div', {
        staticClass: "not-data-table vs-table--not-data"
      }, [_vm._v("\n      " + _vm._s(_vm.noDataText) + "\n    ")]) : _vm._e(), _vm.pagination ? _c('div', {
        staticClass: "con-pagination-table vs-table--pagination"
      }, [_c('vs-pagination', {
        attrs: {
          "total": _vm.searchx && !_vm.sst ? _vm.getTotalPagesSearch : _vm.getTotalPages
        },
        model: {
          value: _vm.currentx,
          callback: function ($$v) {
            _vm.currentx = $$v;
          },
          expression: "currentx"
        }
      })], 1) : _vm._e()])]);
    };

    var vsTablevue_type_template_id_24791894_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTable/vsTable.vue?vue&type=template&id=24791894&
    // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.array.sort.js

    var es6_array_sort = __webpack_require__("bca1"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.object.keys.js


    var es6_object_keys = __webpack_require__("eda4"); // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/typeof.js


    function _typeof2(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof2(obj) {
          return typeof obj;
        };
      } else {
        _typeof2 = function _typeof2(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof2(obj);
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    } // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTable.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */


    var vsTablevue_type_script_lang_js_ = {
      name: "VsTable",
      props: {
        value: {},
        color: {
          default: 'primary',
          type: String
        },
        noDataText: {
          default: 'No data Available',
          type: String
        },
        stripe: {
          default: false,
          type: Boolean
        },
        hoverFlat: {
          default: false,
          type: Boolean
        },
        maxHeight: {
          default: 'auto',
          type: String
        },
        multiple: {
          default: false,
          type: Boolean
        },
        data: {
          default: null
        },
        notSpacer: {
          default: false,
          type: Boolean
        },
        search: {
          default: false,
          type: Boolean
        },
        maxItems: {
          default: 5,
          type: [Number, String]
        },
        pagination: {
          default: false,
          type: Boolean
        },
        currentPage: {
          default: 1,
          type: Number | String
        },
        sst: {
          default: false,
          type: Boolean
        },
        total: {
          type: Number,
          default: 0
        }
      },
      data: function data() {
        return {
          headerWidth: '100%',
          trs: [],
          datax: [],
          searchx: null,
          currentx: 1,
          hasExpadableData: false
        };
      },
      computed: {
        getTotalPages: function getTotalPages() {
          if (this.total) return Math.ceil(this.total / this.maxItems);
          return Math.ceil(this.data.length / this.maxItems);
        },
        getTotalPagesSearch: function getTotalPagesSearch() {
          return Math.ceil(this.queriedResults.length / this.maxItems);
        },
        isNoData: function isNoData() {
          if (_typeof(this.datax) == Object) {
            return this.datax ? Object.keys(this.datax).length == 0 : false && false;
          } else {
            return this.datax ? this.datax.length == 0 : false && false;
          }
        },
        isCheckedLine: function isCheckedLine() {
          var lengthx = this.data.length;
          var lengthSelected = this.value.length;
          return lengthx !== lengthSelected;
        },
        isCheckedMultiple: function isCheckedMultiple() {
          return this.value.length > 0;
        },
        styleConTbody: function styleConTbody() {
          return {
            maxHeight: this.maxHeight,
            overflow: this.maxHeight != 'auto' ? 'auto' : null
          };
        },
        getThs: function getThs() {
          var ths = this.$slots.thead.filter(function (item) {
            return item.tag;
          });
          return ths.length;
        },
        tableHeaderStyle: function tableHeaderStyle() {
          return {
            width: this.headerWidth
          };
        },
        queriedResults: function queriedResults() {
          var _this = this;

          var queriedResults = this.data;

          if (this.searchx && this.search) {
            var dataBase = this.data;
            queriedResults = dataBase.filter(function (tr) {
              var values = _this.getValues(tr).toString().toLowerCase();

              return values.indexOf(_this.searchx.toLowerCase()) != -1;
            });
          }

          return queriedResults;
        }
      },
      watch: {
        currentPage: function currentPage() {
          this.currentx = this.currentPage;
        },
        currentx: function currentx() {
          if (this.sst) {
            this.$emit('change-page', this.currentx);
          } else {
            this.loadData();
          }
        },
        maxItems: function maxItems() {
          this.loadData();
        },
        data: function data() {
          var _this2 = this;

          this.loadData();
          this.$nextTick(function () {
            if (_this2.datax.length > 0) {
              _this2.changeTdsWidth();
            }
          });
        },
        searchx: function searchx() {
          if (this.sst) {
            this.$emit('search', this.searchx);
          } else {
            this.loadData();
            this.currentx = 1;
          }
        }
      },
      mounted: function mounted() {
        window.addEventListener('resize', this.listenerChangeWidth);
        this.loadData(); // this.$nextTick(() => {
        //   if(this.datax.length > 0) {
        //     this.changeTdsWidth()
        //   }
        // })
      },
      destroyed: function destroyed() {
        window.removeEventListener('resize', this.listenerChangeWidth);
      },
      methods: {
        loadData: function loadData() {
          var max = this.maxItems;
          var min = 0;

          if (!this.searchx || this.sst) {
            this.datax = this.pagination ? this.getItems(min, max) : this.data || [];
          } else {
            this.datax = this.pagination ? this.getItemsSearch(true, min, max) : this.getItemsSearch(false, min, max) || [];
          }
        },
        getItems: function getItems(min, max) {
          var items = [];
          this.data.forEach(function (item, index) {
            if (index >= min && index < max) {
              items.push(item);
            }
          });
          return items;
        },
        getItemsSearch: function getItemsSearch() {
          var _this3 = this;

          var pagination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var min = arguments.length > 1 ? arguments[1] : undefined;
          var max = arguments.length > 2 ? arguments[2] : undefined;
          var dataBase = this.data;
          var filterx = dataBase.filter(function (tr) {
            var values = _this3.getValues(tr).toString().toLowerCase();

            return values.indexOf(_this3.searchx.toLowerCase()) != -1;
          });
          var items = [];
          filterx.forEach(function (item, index) {
            if (index >= min && index < max) {
              items.push(item);
            }
          });
          return items;
        },
        sort: function sort(key, active) {
          if (this.sst) {
            this.$emit('sort', key, active);
            return;
          }

          var datax = this.pagination ? this.data : this.datax;

          function compare(a, b) {
            if (a[key] < b[key]) return active ? 1 : -1;
            if (a[key] > b[key]) return active ? -1 : 1;
            return 0;
          }

          this.datax = datax.sort(compare);
        },
        getValues: function getValues(obj) {
          var valuesx = Object.values(obj);
          var strings = [];

          function getStrings(obj) {
            if (Array.isArray(obj)) {
              strings = [].concat(_toConsumableArray(strings), _toConsumableArray(obj));
              obj.forEach(function (item) {
                getStrings(item);
              });
            } else if (_typeof(obj) == 'object' && obj != null) {
              var subObj = Object.values(obj);
              strings = [].concat(_toConsumableArray(strings), _toConsumableArray(subObj));
              getStrings(subObj);
            }
          }

          getStrings(valuesx);
          strings = strings.filter(function (item) {
            return typeof item == 'string' || typeof item == 'number';
          });
          return valuesx;
        },
        getStrings: function getStrings(obj, valuesx) {
          var stringsx = Object.values(obj);
          valuesx.forEach(function (item) {
            if (item && _typeof(item) == 'object') {
              valuesx = [].concat(_toConsumableArray(valuesx), _toConsumableArray(Object.values(item)));
            }
          }); // return [...valuesx,...Object.values(item)]

          return stringsx;
        },
        changeCheckedMultiple: function changeCheckedMultiple() {
          var lengthx = this.data.length;
          var lengthSelected = this.value.length;
          var selectedx = lengthx - lengthSelected;

          if (selectedx == 0) {
            this.$emit('input', []);
          } else {
            this.$emit('input', this.data);
          }
        },
        clicktr: function clicktr(tr, isTr) {
          if (this.multiple && isTr) {
            var val = this.value.slice(0);

            if (val.includes(tr)) {
              val.splice(val.indexOf(tr), 1);
            } else {
              val.push(tr);
            }

            this.$emit('input', val);
            this.$emit('selected', tr);
          } else if (isTr) {
            this.$emit('input', tr);
            this.$emit('selected', tr);
          }
        },
        listenerChangeWidth: function listenerChangeWidth() {
          this.headerWidth = "".concat(this.$refs.table.offsetWidth, "px");
          this.changeTdsWidth();
        },
        changeTdsWidth: function changeTdsWidth() {
          if (!this.value) return;
          var tbody = this.$refs.table.querySelector('tbody'); // Adding condition removes querySelector none error - if tbody isnot present

          if (tbody) {
            var trvs = tbody.querySelector('.tr-values');
            if (trvs === undefined || trvs === null) return;
            var tds = trvs.querySelectorAll('.td');
            var tdsx = [];
            tds.forEach(function (td, index) {
              tdsx.push({
                index: index,
                widthx: td.offsetWidth
              });
            });
            var colgrouptable = this.$refs.colgrouptable;

            if (colgrouptable !== undefined && colgrouptable !== null) {
              var colsTable = colgrouptable.querySelectorAll('.col');
              colsTable.forEach(function (col, index) {
                col.setAttribute('width', tdsx[index].widthx);
              });
            }
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsTable/vsTable.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTable_vsTablevue_type_script_lang_js_ = vsTablevue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTable/vsTable.vue

    /* normalize component */

    var vsTable_component = normalizeComponent(vsTable_vsTablevue_type_script_lang_js_, vsTablevue_type_template_id_24791894_render, vsTablevue_type_template_id_24791894_staticRenderFns, false, null, null, null);
    vsTable_component.options.__file = "vsTable.vue";
    /* harmony default export */

    var vsTable = vsTable_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTh.vue?vue&type=template&id=58268fd2&

    var vsThvue_type_template_id_58268fd2_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('th', {
        staticClass: "col-0 col",
        attrs: {
          "colspan": "1",
          "rowspan": "1"
        }
      }, [_c('div', {
        staticClass: "vs-table-text"
      }, [_vm.sortKey ? _c('span', {
        staticClass: "sort-th"
      }, [_c('i', {
        staticClass: "material-icons up-sort",
        on: {
          "click": function ($event) {
            return _vm.sortValue(false);
          }
        }
      }, [_vm._v("\n        expand_less\n      ")]), _c('i', {
        staticClass: "material-icons down-sort",
        on: {
          "click": function ($event) {
            return _vm.sortValue(true);
          }
        }
      }, [_vm._v("\n        expand_more\n      ")])]) : _vm._e(), _vm._t("default")], 2)]);
    };

    var vsThvue_type_template_id_58268fd2_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTable/vsTh.vue?vue&type=template&id=58268fd2&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTh.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsThvue_type_script_lang_js_ = {
      name: 'VsTh',
      props: {
        sortKey: {
          default: null,
          type: String
        }
      },
      data: function data() {
        return {
          thIndex: 0,
          thwidth: '100%',
          sortActive: false
        };
      },
      computed: {
        styleth: function styleth() {
          return {
            width: this.thwidth
          };
        }
      },
      methods: {
        sortValue: function sortValue(direction) {
          this.$parent.sort(this.sortKey, direction);
          this.sortActive = direction;
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsTable/vsTh.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTable_vsThvue_type_script_lang_js_ = vsThvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTable/vsTh.vue

    /* normalize component */

    var vsTh_component = normalizeComponent(vsTable_vsThvue_type_script_lang_js_, vsThvue_type_template_id_58268fd2_render, vsThvue_type_template_id_58268fd2_staticRenderFns, false, null, null, null);
    vsTh_component.options.__file = "vsTh.vue";
    /* harmony default export */

    var vsTh = vsTh_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTr.vue?vue&type=template&id=3851cde6&

    var vsTrvue_type_template_id_3851cde6_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('tr', {
        ref: "tableTr",
        staticClass: "tr-values vs-table--tr",
        class: ["tr-table-state-" + _vm.state, {
          'is-selected': _vm.isSelected,
          'selected': _vm.data,
          'is-expand': _vm.maxHeight != '0px',
          'activeEdit': _vm.activeEdit,
          'hoverFlat': _vm.$parent.hoverFlat
        }],
        on: {
          "click": _vm.clicktr
        }
      }, [_vm.$parent.multiple || _vm.$slots.expand ? _c('td', {
        staticClass: "td-check",
        class: {
          'active-expanded': this.expanded
        }
      }, [_vm.$parent.multiple ? _c('vs-checkbox', {
        attrs: {
          "checked": _vm.isSelected,
          "size": "small"
        }
      }) : _vm._e(), _vm.$slots.expand ? _c('vs-icon', [_vm._v("keyboard_arrow_down")]) : _vm._e()], 1) : _vm._e(), _vm._t("default")], 2);
    };

    var vsTrvue_type_template_id_3851cde6_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTable/vsTr.vue?vue&type=template&id=3851cde6&
    // EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}

    var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

    var external_commonjs_vue_commonjs2_vue_root_Vue_default =
    /*#__PURE__*/
    __webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_); // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTrExpand.vue?vue&type=template&id=26524141&


    var vsTrExpandvue_type_template_id_26524141_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "tr-expand"
        }
      }, [_vm.active ? _c('tr', {
        staticClass: "tr-expand"
      }, [_c('td', {
        attrs: {
          "colspan": _vm.colspan
        }
      }, [_c('div', {
        staticClass: "content-tr-expand"
      }, [_vm._t("default"), _vm.close ? _c('button', {
        staticClass: "tr-expand--close",
        on: {
          "click": function ($event) {
            return _vm.$emit('click', $event);
          }
        }
      }, [_c('i', {
        staticClass: "material-icons"
      }, [_vm._v("\n          clear\n        ")])]) : _vm._e()], 2)])]) : _vm._e()]);
    };

    var vsTrExpandvue_type_template_id_26524141_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTable/vsTrExpand.vue?vue&type=template&id=26524141&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTrExpand.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsTrExpandvue_type_script_lang_js_ = {
      props: {
        close: {
          type: Boolean,
          default: false
        },
        colspan: {
          default: 1,
          type: Number
        }
      },
      data: function data() {
        return {
          active: false
        };
      },
      mounted: function mounted() {
        this.active = true;
      }
    }; // CONCATENATED MODULE: ./src/components/vsTable/vsTrExpand.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTable_vsTrExpandvue_type_script_lang_js_ = vsTrExpandvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTable/vsTrExpand.vue

    /* normalize component */

    var vsTrExpand_component = normalizeComponent(vsTable_vsTrExpandvue_type_script_lang_js_, vsTrExpandvue_type_template_id_26524141_render, vsTrExpandvue_type_template_id_26524141_staticRenderFns, false, null, null, null);
    vsTrExpand_component.options.__file = "vsTrExpand.vue";
    /* harmony default export */

    var vsTrExpand = vsTrExpand_component.exports; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTr.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsTrvue_type_script_lang_js_ = {
      name: 'VsTr',
      props: {
        state: {
          type: String,
          default: null
        },
        data: {
          default: null
        }
      },
      data: function data() {
        return {
          colspan: 0,
          expanded: false,
          maxHeight: '0px',
          activeEdit: false
        };
      },
      watch: {
        '$parent.datax': function $parentDatax() {
          this.collapseExpandedData();
        }
      },
      computed: {
        styleExpand: function styleExpand() {
          return {
            maxHeight: this.maxHeight
          };
        },
        getColspanExpand: function getColspanExpand() {
          var lengthx = this.$parent.$refs.colgroup.querySelectorAll('th').length;
          return lengthx;
        },
        isSelected: function isSelected() {
          if (this.$parent.multiple && this.$parent.value) {
            return this.data ? this.$parent.value.includes(this.data) : false;
          } else {
            return this.data ? this.$parent.value == this.data : false;
          }
        }
      },
      mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
          _this.colspan = _this.$parent.$refs.thead.querySelectorAll('th').length;

          if (_this.$slots.expand) {
            _this.colspan++;
          }
        });
      },
      created: function created() {
        if (this.$slots.expand) this.$parent.hasExpadableData = true;
      },
      methods: {
        insertAfter: function insertAfter(e, i) {
          if (e.nextSibling) {
            e.parentNode.insertBefore(i, e.nextSibling);
          } else {
            e.parentNode.appendChild(i);
          }
        },
        clicktr: function clicktr(evt) {
          this.$parent.clicktr(this.data, true);

          if (this.$slots.expand) {
            this.clicktd(evt);
          }
        },
        clicktd: function clicktd(evt) {
          if (this.$parent.multiple || !this.$slots.expand) return;
          var tr = evt.target.closest('tr');

          if (this.expanded) {
            tr.parentNode.removeChild(tr.nextSibling);
            tr.classList.remove('tr-expandedx');
            this.expanded = false;
          } else {
            tr.classList.add('tr-expandedx');
            var trx = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend(vsTrExpand);
            var instance = new trx();
            instance.$props.colspan = this.colspan;
            instance.$slots.default = this.$slots.expand;
            instance.vm = instance.$mount();
            var newTR = document.createElement('tr').appendChild(instance.vm.$el);
            this.insertAfter(tr, newTR);
            this.expanded = true;
          } // this.$parent.clicktr(this.data, false)
          // if(this.$parent.multiple) {
          //   return
          // }
          // let scrollHeight = this.$refs.td.scrollHeight
          // if(this.maxHeight == '0px') {
          //   this.maxHeight = `${scrollHeight}px`
          //   setTimeout(() => {
          //     this.maxHeight = 'none'
          //   },300)
          // } else {
          //   this.maxHeight = `${scrollHeight}px`
          //   setTimeout(() => {
          //     this.maxHeight = `${0}px`
          //   }, 50)
          // }

        },
        collapseExpandedData: function collapseExpandedData() {
          if (this.expanded) {
            var tr = this.$refs.tableTr;
            tr.parentNode.removeChild(tr.nextSibling);
            tr.classList.remove('tr-expandedx');
            this.expanded = false;
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsTable/vsTr.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTable_vsTrvue_type_script_lang_js_ = vsTrvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTable/vsTr.vue

    /* normalize component */

    var vsTr_component = normalizeComponent(vsTable_vsTrvue_type_script_lang_js_, vsTrvue_type_template_id_3851cde6_render, vsTrvue_type_template_id_3851cde6_staticRenderFns, false, null, null, null);
    vsTr_component.options.__file = "vsTr.vue";
    /* harmony default export */

    var vsTr = vsTr_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTd.vue?vue&type=template&id=41b62260&

    var vsTdvue_type_template_id_41b62260_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('td', {
        ref: "td",
        staticClass: "td vs-table--td",
        class: {
          'td-edit': _vm.$slots.edit
        }
      }, [_c('span', {
        on: {
          "click": _vm.clicktd
        }
      }, [_vm.$slots.edit ? _c('vs-icon', {
        staticClass: "icon-edit",
        attrs: {
          "icon": "edit"
        }
      }) : _vm._e(), _vm._t("default"), _vm.$slots.edit ? _c('span', {
        staticClass: "empty"
      }, [_vm._v("\n      " + _vm._s(_vm.data ? '' : 'Empty') + "\n    ")]) : _vm._e()], 2)]);
    };

    var vsTdvue_type_template_id_41b62260_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTable/vsTd.vue?vue&type=template&id=41b62260&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTable/vsTd.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsTdvue_type_script_lang_js_ = {
      name: 'VsTd',
      props: {
        data: {
          default: null
        }
      },
      data: function data() {
        return {
          activeEdit: false
        };
      },
      watch: {
        activeEdit: function activeEdit() {
          this.$parent.activeEdit = this.activeEdit;
        }
      },
      methods: {
        insertAfter: function insertAfter(e, i) {
          if (e.nextSibling) {
            e.parentNode.insertBefore(i, e.nextSibling);
          } else {
            e.parentNode.appendChild(i);
          }
        },
        clicktd: function clicktd(evt) {
          var _this = this;

          if (this.$slots.edit) {
            var tr = evt.target.closest('tr');

            if (!this.activeEdit) {
              var trx = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend(vsTrExpand);
              var instance = new trx();
              instance.$props.colspan = 5;
              instance.$props.close = true;
              instance.$slots.default = this.$slots.edit;
              instance.vm = instance.$mount();
              instance.$on('click', this.close);
              var nuevo_parrafo = document.createElement('tr').appendChild(instance.vm.$el);
              this.insertAfter(tr, nuevo_parrafo);
              this.activeEdit = true;
              setTimeout(function () {
                window.addEventListener('click', _this.closeEdit);
              }, 20);
            }
          }
        },
        closeEdit: function closeEdit(evt) {
          if (!evt.target.closest('.tr-expand') && !evt.target.closest('.vs-select--options')) {
            this.close();
          }
        },
        close: function close() {
          var tr = this.$refs.td.closest('tr');
          this.activeEdit = false;
          tr.parentNode.removeChild(tr.nextSibling);
          window.removeEventListener('click', this.closeEdit);
        },
        saveEdit: function saveEdit() {
          this.activeEdit = false;
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsTable/vsTd.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTable_vsTdvue_type_script_lang_js_ = vsTdvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTable/vsTd.vue

    /* normalize component */

    var vsTd_component = normalizeComponent(vsTable_vsTdvue_type_script_lang_js_, vsTdvue_type_template_id_41b62260_render, vsTdvue_type_template_id_41b62260_staticRenderFns, false, null, null, null);
    vsTd_component.options.__file = "vsTd.vue";
    /* harmony default export */

    var vsTd = vsTd_component.exports; // CONCATENATED MODULE: ./src/components/vsTable/index.js

    /* harmony default export */

    var components_vsTable = function (Vue) {
      Vue.component(vsTable.name, vsTable);
      Vue.component(vsTh.name, vsTh);
      Vue.component(vsTr.name, vsTr);
      Vue.component(vsTd.name, vsTd);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTextarea/vsTextarea.vue?vue&type=template&id=638b6b1a&lang=html&


    var vsTextareavue_type_template_id_638b6b1a_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-component vs-con-textarea",
        class: ["vs-textarea-" + _vm.color, {
          'textarea-danger': _vm.counter ? _vm.value && _vm.value.length > _vm.counter : false,
          'focusx': _vm.isFocus
        }],
        style: _vm.style
      }, [_vm.label ? _c('h4', [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]) : _vm._e(), _c('textarea', _vm._g(_vm._b({
        staticClass: "vs-textarea",
        style: _vm.getStyle,
        domProps: {
          "value": _vm.value
        }
      }, 'textarea', _vm.$attrs, false), _vm.listeners)), _vm.counter ? _c('div', {
        staticClass: "count vs-textarea--count"
      }, [_vm._v("\n    " + _vm._s(_vm.value ? _vm.value.length : 0) + " / " + _vm._s(_vm.counter) + "\n  ")]) : _vm._e()]);
    };

    var vsTextareavue_type_template_id_638b6b1a_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsTextarea/vsTextarea.vue?vue&type=template&id=638b6b1a&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsTextarea/vsTextarea.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsTextareavue_type_script_lang_js_ = {
      name: "VsTextarea",
      inheritAttrs: false,
      props: {
        value: {},
        label: {
          default: null,
          type: String
        },
        color: {
          default: 'primary',
          type: String
        },
        counter: {
          default: null,
          type: [Number, String]
        },
        counterDanger: {
          default: false,
          type: Boolean
        },
        height: {
          default: null,
          type: String
        },
        width: {
          default: null,
          type: String
        }
      },
      data: function data() {
        return {
          isFocus: false
        };
      },
      computed: {
        style: function style() {
          var style = {};
          style.border = "1px solid ".concat(this.isFocus ? utils_color.getColor(this.color, 1) : 'rgba(0, 0, 0,.08)');
          return style;
        },
        getStyle: function getStyle() {
          var style = {};

          if (this.height) {
            style.height = "".concat(this.height, "px");
          }

          if (this.width) {
            style.width = "".concat(this.width, "px");
          }

          return style;
        },
        listeners: function listeners() {
          var _this = this;

          return _objectSpread({}, this.$listeners, {
            input: function input(evt) {
              _this.$emit('input', evt.target.value);
            },
            focus: function focus() {
              _this.focus();
            },
            blur: function blur() {
              _this.blur();
            }
          });
        }
      },
      watch: {
        value: function value() {
          if (this.value && this.value.length > this.counter) {
            this.$emit('update:counterDanger', true);
          } else {
            this.$emit('update:counterDanger', false);
          }
        }
      },
      methods: {
        focus: function focus() {
          this.isFocus = true;
          this.$emit('focus');
        },
        blur: function blur() {
          this.isFocus = false;
          this.$emit('blur');
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsTextarea/vsTextarea.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsTextarea_vsTextareavue_type_script_lang_js_ = vsTextareavue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsTextarea/vsTextarea.vue

    /* normalize component */

    var vsTextarea_component = normalizeComponent(vsTextarea_vsTextareavue_type_script_lang_js_, vsTextareavue_type_template_id_638b6b1a_lang_html_render, vsTextareavue_type_template_id_638b6b1a_lang_html_staticRenderFns, false, null, null, null);
    vsTextarea_component.options.__file = "vsTextarea.vue";
    /* harmony default export */

    var vsTextarea = vsTextarea_component.exports; // CONCATENATED MODULE: ./src/components/vsTextarea/index.js

    /* harmony default export */

    var components_vsTextarea = function (Vue) {
      Vue.component(vsTextarea.name, vsTextarea);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCollapse/vsCollapse.vue?vue&type=template&id=612664fc&


    var vsCollapsevue_type_template_id_612664fc_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-collapse",
        class: [_vm.type]
      }, [_vm._t("default")], 2);
    };

    var vsCollapsevue_type_template_id_612664fc_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsCollapse/vsCollapse.vue?vue&type=template&id=612664fc&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCollapse/vsCollapse.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsCollapsevue_type_script_lang_js_ = {
      name: 'VsCollapse',
      props: {
        accordion: {
          default: false,
          type: Boolean
        },
        type: {
          default: 'default',
          type: String
        },
        openHover: {
          default: false,
          type: Boolean
        }
      },
      methods: {
        emitChange: function emitChange() {
          this.$emit('change');
        },
        closeAllItems: function closeAllItems(el) {
          var children = this.$children;
          children.map(function (item) {
            if (item.$el !== el) {
              item.maxHeight = '0px';
            }
          });
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsCollapse/vsCollapse.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsCollapse_vsCollapsevue_type_script_lang_js_ = vsCollapsevue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsCollapse/vsCollapse.vue

    /* normalize component */

    var vsCollapse_component = normalizeComponent(vsCollapse_vsCollapsevue_type_script_lang_js_, vsCollapsevue_type_template_id_612664fc_render, vsCollapsevue_type_template_id_612664fc_staticRenderFns, false, null, null, null);
    vsCollapse_component.options.__file = "vsCollapse.vue";
    /* harmony default export */

    var vsCollapse = vsCollapse_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCollapse/vsCollapseItem.vue?vue&type=template&id=7cc2f0e9&

    var vsCollapseItemvue_type_template_id_7cc2f0e9_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-collapse-item",
        class: {
          'open-item': _vm.maxHeight != '0px',
          'disabledx': _vm.disabled
        },
        on: {
          "mouseover": _vm.mouseover,
          "mouseout": _vm.mouseout
        }
      }, [_c('header', {
        staticClass: "vs-collapse-item--header",
        on: {
          "click": _vm.toggleContent
        }
      }, [_vm._t("header"), !_vm.notArrow ? _c('span', {
        staticClass: "icon-header vs-collapse-item--icon-header"
      }, [_c('vs-icon', {
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.iconArrow
        }
      })], 1) : _vm._e()], 2), _c('div', {
        ref: "content",
        staticClass: "vs-collapse-item--content",
        style: _vm.styleContent
      }, [_c('div', {
        staticClass: "con-content--item"
      }, [_vm._t("default")], 2)])]);
    };

    var vsCollapseItemvue_type_template_id_7cc2f0e9_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsCollapse/vsCollapseItem.vue?vue&type=template&id=7cc2f0e9&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsCollapse/vsCollapseItem.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsCollapseItemvue_type_script_lang_js_ = {
      name: 'VsCollapseItem',
      components: {
        vsicon: components_vsIcon
      },
      props: {
        open: {
          default: false,
          type: Boolean
        },
        disabled: {
          default: false,
          type: Boolean
        },
        notArrow: {
          default: false,
          type: Boolean
        },
        iconArrow: {
          default: 'keyboard_arrow_down',
          type: String
        },
        iconPack: {
          default: 'material-icons',
          type: String
        }
      },
      data: function data() {
        return {
          maxHeight: '0px'
        };
      },
      computed: {
        accordion: function accordion() {
          return this.$parent.accordion;
        },
        openHover: function openHover() {
          return this.$parent.openHover;
        },
        styleContent: function styleContent() {
          return {
            maxHeight: this.maxHeight
          };
        }
      },
      watch: {
        maxHeight: function maxHeight() {
          this.$parent.emitChange();
        }
      },
      mounted: function mounted() {
        window.addEventListener('resize', this.changeHeight);
        var maxHeightx = this.$refs.content.scrollHeight;

        if (this.open) {
          this.maxHeight = "".concat(maxHeightx, "px");
        }
      },
      methods: {
        changeHeight: function changeHeight() {
          var maxHeightx = this.$refs.content.scrollHeight;

          if (this.maxHeight != '0px') {
            this.maxHeight = "".concat(maxHeightx, "px");
          }
        },
        toggleContent: function toggleContent() {
          if (this.openHover || this.disabled) {
            return;
          }

          if (this.accordion) {
            this.$parent.closeAllItems(this.$el);
          }

          var maxHeightx = this.$refs.content.scrollHeight;

          if (this.maxHeight == '0px') {
            this.maxHeight = "".concat(maxHeightx, "px");
          } else {
            this.maxHeight = "0px";
          }
        },
        mouseover: function mouseover() {
          if (this.disabled) {
            return;
          }

          var maxHeightx = this.$refs.content.scrollHeight;

          if (this.openHover) {
            this.maxHeight = "".concat(maxHeightx, "px");
          }
        },
        mouseout: function mouseout() {
          if (this.openHover) {
            this.maxHeight = "0px";
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsCollapse/vsCollapseItem.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsCollapse_vsCollapseItemvue_type_script_lang_js_ = vsCollapseItemvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsCollapse/vsCollapseItem.vue

    /* normalize component */

    var vsCollapseItem_component = normalizeComponent(vsCollapse_vsCollapseItemvue_type_script_lang_js_, vsCollapseItemvue_type_template_id_7cc2f0e9_render, vsCollapseItemvue_type_template_id_7cc2f0e9_staticRenderFns, false, null, null, null);
    vsCollapseItem_component.options.__file = "vsCollapseItem.vue";
    /* harmony default export */

    var vsCollapseItem = vsCollapseItem_component.exports; // CONCATENATED MODULE: ./src/components/vsCollapse/index.js

    /* harmony default export */

    var components_vsCollapse = function (Vue) {
      Vue.component(vsCollapse.name, vsCollapse);
      Vue.component(vsCollapseItem.name, vsCollapseItem);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsImages/vsImages.vue?vue&type=template&id=436ca6f9&lang=html&


    var vsImagesvue_type_template_id_436ca6f9_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-component vs-images",
        class: ["vs-images-hover-" + _vm.hover, {
          'alternating': _vm.alternating,
          'notBorderRadius': _vm.notBorderRadius,
          'notMargin': _vm.notMargin
        }]
      }, [_c('ul', {
        staticClass: "vs-ul-images vs-images--ul"
      }, [_vm._t("default")], 2)]);
    };

    var vsImagesvue_type_template_id_436ca6f9_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsImages/vsImages.vue?vue&type=template&id=436ca6f9&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsImages/vsImages.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsImagesvue_type_script_lang_js_ = {
      name: "VsImages",
      inheritAttrs: false,
      props: {
        hover: {
          default: 'default',
          type: String
        },
        alternating: {
          default: false,
          type: Boolean
        },
        notBorderRadius: {
          default: false,
          type: Boolean
        },
        notMargin: {
          default: false,
          type: Boolean
        }
      },
      data: function data() {
        return {};
      }
    }; // CONCATENATED MODULE: ./src/components/vsImages/vsImages.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsImages_vsImagesvue_type_script_lang_js_ = vsImagesvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsImages/vsImages.vue

    /* normalize component */

    var vsImages_component = normalizeComponent(vsImages_vsImagesvue_type_script_lang_js_, vsImagesvue_type_template_id_436ca6f9_lang_html_render, vsImagesvue_type_template_id_436ca6f9_lang_html_staticRenderFns, false, null, null, null);
    vsImages_component.options.__file = "vsImages.vue";
    /* harmony default export */

    var vsImages = vsImages_component.exports; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsImages/vsImage.vue?vue&type=template&id=347c0686&

    var vsImagevue_type_template_id_347c0686_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        staticClass: "vs-image"
      }, [_c('div', {
        staticClass: "con-vs-image"
      }, [_c('div', {
        staticClass: "vs-image--img",
        style: _vm.styleImage,
        attrs: {
          "v-bind": _vm.$attrs
        }
      })]), _c('img', {
        staticClass: "imag-blur",
        attrs: {
          "src": _vm.src,
          "alt": ""
        }
      })]);
    };

    var vsImagevue_type_template_id_347c0686_staticRenderFns = []; // CONCATENATED MODULE: ./src/components/vsImages/vsImage.vue?vue&type=template&id=347c0686&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vsImages/vsImage.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsImagevue_type_script_lang_js_ = {
      name: 'VsImage',
      inheritAttrs: false,
      props: {
        src: {
          default: null,
          type: String
        }
      },
      computed: {
        styleImage: function styleImage() {
          return {
            backgroundImage: "url(".concat(this.src, ")")
          };
        }
      }
    }; // CONCATENATED MODULE: ./src/components/vsImages/vsImage.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsImages_vsImagevue_type_script_lang_js_ = vsImagevue_type_script_lang_js_; // CONCATENATED MODULE: ./src/components/vsImages/vsImage.vue

    /* normalize component */

    var vsImage_component = normalizeComponent(vsImages_vsImagevue_type_script_lang_js_, vsImagevue_type_template_id_347c0686_render, vsImagevue_type_template_id_347c0686_staticRenderFns, false, null, null, null);
    vsImage_component.options.__file = "vsImage.vue";
    /* harmony default export */

    var vsImage = vsImage_component.exports; // CONCATENATED MODULE: ./src/components/vsImages/index.js

    /* harmony default export */

    var components_vsImages = function (Vue) {
      Vue.component(vsImages.name, vsImages);
      Vue.component(vsImage.name, vsImage);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/vsRow/vsRow.vue?vue&type=template&id=512757c0&lang=html&


    var vsRowvue_type_template_id_512757c0_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-row",
        style: {
          'align-items': _vm.vsAlign,
          'justify-content': _vm.vsJustify,
          'display': _vm.vsType,
          'overflow': _vm.vsType === 'block' ? 'hidden' : null,
          'width': _vm.vsW * 100 / 12 + '%'
        }
      }, [_vm._t("default")], 2);
    };

    var vsRowvue_type_template_id_512757c0_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/layout/vsRow/vsRow.vue?vue&type=template&id=512757c0&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/vsRow/vsRow.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsRowvue_type_script_lang_js_ = {
      name: 'VsRow',
      props: {
        vsType: {
          default: 'flex',
          type: String
        },
        vsW: {
          type: [Number, String],
          default: 12
        },
        vsJustify: {
          type: String,
          default: null
        },
        vsAlign: {
          type: String,
          default: null
        }
      }
    }; // CONCATENATED MODULE: ./src/layout/vsRow/vsRow.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsRow_vsRowvue_type_script_lang_js_ = vsRowvue_type_script_lang_js_; // EXTERNAL MODULE: ./src/layout/vsRow/vsRow.vue?vue&type=style&index=0&lang=css&

    var vsRowvue_type_style_index_0_lang_css_ = __webpack_require__("dc51"); // CONCATENATED MODULE: ./src/layout/vsRow/vsRow.vue

    /* normalize component */


    var vsRow_component = normalizeComponent(vsRow_vsRowvue_type_script_lang_js_, vsRowvue_type_template_id_512757c0_lang_html_render, vsRowvue_type_template_id_512757c0_lang_html_staticRenderFns, false, null, null, null);
    vsRow_component.options.__file = "vsRow.vue";
    /* harmony default export */

    var vsRow = vsRow_component.exports; // CONCATENATED MODULE: ./src/layout/vsRow/index.js

    /* harmony default export */

    var layout_vsRow = function (Vue) {
      Vue.component(vsRow.name, vsRow);
    }; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/vsCol/vsCol.vue?vue&type=template&id=68e4485c&lang=html&


    var vsColvue_type_template_id_68e4485c_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "vs-col",
        class: ['vs-xs-' + _vm.vsXs, 'vs-sm-' + _vm.vsSm, 'vs-lg-' + _vm.vsLg],
        style: {
          'order': _vm.vsOrder,
          'justify-content': _vm.vsJustify,
          'display': _vm.vsType,
          'align-items': _vm.vsAlign,
          'margin-left': _vm.vsOffset * 100 / 12 + '%',
          'width': _vm.vsW * 100 / 12 + '%'
        }
      }, [_vm._t("default")], 2);
    };

    var vsColvue_type_template_id_68e4485c_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/layout/vsCol/vsCol.vue?vue&type=template&id=68e4485c&lang=html&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/vsCol/vsCol.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsColvue_type_script_lang_js_ = {
      name: 'VsCol',
      props: {
        vsW: {
          type: [Number, String],
          default: 12
        },
        vsXs: {
          type: [Number, String],
          default: ''
        },
        vsSm: {
          type: [Number, String],
          default: ''
        },
        vsLg: {
          type: [Number, String],
          default: ''
        },
        vsOffset: {
          type: [Number, String],
          default: 0
        },
        vsType: {
          type: String,
          default: null
        },
        vsJustify: {
          type: String,
          default: null
        },
        vsAlign: {
          type: String,
          default: null
        },
        vsOrder: {
          default: null,
          type: [String, Number]
        }
      }
    }; // CONCATENATED MODULE: ./src/layout/vsCol/vsCol.vue?vue&type=script&lang=js&

    /* harmony default export */

    var vsCol_vsColvue_type_script_lang_js_ = vsColvue_type_script_lang_js_; // EXTERNAL MODULE: ./src/layout/vsCol/vsCol.vue?vue&type=style&index=0&lang=css&

    var vsColvue_type_style_index_0_lang_css_ = __webpack_require__("f2fe"); // CONCATENATED MODULE: ./src/layout/vsCol/vsCol.vue

    /* normalize component */


    var vsCol_component = normalizeComponent(vsCol_vsColvue_type_script_lang_js_, vsColvue_type_template_id_68e4485c_lang_html_render, vsColvue_type_template_id_68e4485c_lang_html_staticRenderFns, false, null, null, null);
    vsCol_component.options.__file = "vsCol.vue";
    /* harmony default export */

    var vsCol = vsCol_component.exports; // CONCATENATED MODULE: ./src/layout/vsCol/index.js

    /* harmony default export */

    var layout_vsCol = function (Vue) {
      Vue.component(vsCol.name, vsCol);
    }; // CONCATENATED MODULE: ./src/components/index.js
    //New Component import
    //layout
    // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/functions/vsNotifications/index.vue?vue&type=template&id=1ed524c6&lang=html&


    var vsNotificationsvue_type_template_id_1ed524c6_lang_html_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "noti"
        },
        on: {
          "before-enter": _vm.beforeEnter,
          "enter": _vm.enter,
          "leave": _vm.leave
        }
      }, [_vm.active ? _c('div', {
        ref: "noti",
        staticClass: "vs-component vs-notifications",
        class: ["vs-noti-" + _vm.position, "vs-noti-" + _vm.color, {
          'activeNoti': _vm.active
        }],
        style: _vm.stylex,
        on: {
          "click": _vm.clickNoti
        }
      }, [_c('div', {
        staticClass: "content-noti"
      }, [_c('div', {
        staticClass: "con-text-noti"
      }, [_c('h3', {
        domProps: {
          "innerHTML": _vm._s(_vm.title)
        }
      }), _c('p', {
        domProps: {
          "innerHTML": _vm._s(_vm.text)
        }
      }), _vm._t("default")], 2), _vm.icon ? _c('vs-icon', {
        staticClass: "vs-icon-noti",
        attrs: {
          "icon-pack": _vm.iconPack,
          "icon": _vm.icon
        }
      }) : _vm._e()], 1), _c('span', {
        staticClass: "filling",
        style: _vm.fillingStyle
      })]) : _vm._e()]);
    };

    var vsNotificationsvue_type_template_id_1ed524c6_lang_html_staticRenderFns = []; // CONCATENATED MODULE: ./src/functions/vsNotifications/index.vue?vue&type=template&id=1ed524c6&lang=html&
    // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.string.fixed.js

    var es6_string_fixed = __webpack_require__("2ee2"); // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/functions/vsNotifications/index.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */


    var vsNotificationsvue_type_script_lang_js_ = {
      data: function data() {
        return {
          fullWidth: false,
          icon: null,
          iconPack: 'material-icons',
          color: 'primary',
          colorText: 'rgb(255, 255, 255)',
          active: true,
          text: null,
          title: null,
          position: 'bottom-right',
          time: 3000,
          cords: {
            top: null,
            left: null,
            right: null,
            bottom: null
          },
          widthx: 0,
          fixed: false
        };
      },
      computed: {
        fillingStyle: function fillingStyle() {
          return {
            left: this.cords.left ? '-100px' : null,
            right: this.cords.right ? '-100px' : null,
            background: this.color,
            height: "".concat(this.widthx * 2, "px"),
            width: "".concat(this.widthx * 2, "px")
          };
        },
        stylex: function stylex() {
          return _objectSpread({}, this.cords, {
            color: this.colorText,
            width: this.fullWidth ? "calc(100% - 14px)" : "",
            maxWidth: this.fullWidth ? 'none' : "350px"
          });
        }
      },
      created: function created() {
        var _this = this;

        setTimeout(function () {
          _this.moverNotis();
        }, 0);
        this.changeCords();
      },
      mounted: function mounted() {
        var _this2 = this;

        setTimeout(function () {
          _this2.widthx = _this2.$refs.noti.clientWidth;
        }, 0);

        if (!this.fixed) {
          setTimeout(function () {
            _this2.closeNoti();
          }, this.time);
        }
      },
      methods: {
        clickNoti: function clickNoti() {
          this.active = false;
          this.click ? this.click() : null;
        },
        beforeEnter: function beforeEnter(el) {
          el.style.opacity = 0;
        },
        enter: function enter(el, done) {
          el.style.opacity = 1;
          done();
        },
        leave: function leave(el, done) {
          var _this3 = this;

          el.style.opacity = 0;
          var transformx = el.style.transform;

          if (this.cords.left == '50%' || this.fullWidth) {
            transformx += " translateY(".concat(this.cords.top ? '-' : '', "100%)");
          } else {
            transformx += " translateX(".concat(this.cords.left ? '-' : '', "100%)");
          }

          el.style.transform = transformx;
          setTimeout(function () {
            done();

            _this3.moverNotis();
          }, 150);
        },
        closeNoti: function closeNoti() {
          this.active = false;
        },
        changeCords: function changeCords() {
          var positions = this.position.split('-');

          var search = function search(text) {
            return positions.indexOf(text) != -1;
          };

          if (search('top')) {
            this.cords.top = '0px';
          }

          if (search('bottom')) {
            this.cords.bottom = '0px';
          }

          if (search('right')) {
            this.cords.right = '0px';
          }

          if (search('left')) {
            this.cords.left = '0px';
          }

          if (search('center')) {
            this.cords.left = '50%';
          }
        },
        moverNotis: function moverNotis() {
          var notisx = document.querySelectorAll('.vs-noti-' + this.position);

          for (var i = 0; i < notisx.length; i++) {
            var hx = 10;

            for (var i2 = 0; i2 < i; i2++) {
              hx += notisx[i2].clientHeight + 6;
            }

            if (this.position.search('center') == -1) {
              if (this.position.search('top') != -1) {
                notisx[i].style.transform = "translatey(".concat(hx, "px)");
              } else if (this.position.search('bottom') != -1) {
                notisx[i].style.transform = "translatey(-".concat(hx, "px)");
              }
            }

            if (this.position.search('top') != -1 && this.position.search('center') != -1) {
              notisx[i].style.transform = "translate(-50%,".concat(hx, "px)");
              notisx[i].style.zIndex = 10000 - i;
            }

            if (this.position.search('bottom') != -1 && this.position.search('center') != -1) {
              notisx[i].style.transform = "translate(-50%,-".concat(hx, "px)");
              notisx[i].style.zIndex = 10000 - i;
            }
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/functions/vsNotifications/index.vue?vue&type=script&lang=js&

    /* harmony default export */

    var functions_vsNotificationsvue_type_script_lang_js_ = vsNotificationsvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/functions/vsNotifications/index.vue

    /* normalize component */

    var vsNotifications_component = normalizeComponent(functions_vsNotificationsvue_type_script_lang_js_, vsNotificationsvue_type_template_id_1ed524c6_lang_html_render, vsNotificationsvue_type_template_id_1ed524c6_lang_html_staticRenderFns, false, null, null, null);
    vsNotifications_component.options.__file = "index.vue";
    /* harmony default export */

    var vsNotifications = vsNotifications_component.exports; // CONCATENATED MODULE: ./src/functions/vsNotifications/index.js

    var NotiConstructor = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend(vsNotifications);
    var vsNotifications_instance;
    /* harmony default export */

    var functions_vsNotifications = {
      name: 'notify',
      vsfunction: function vsfunction(parameters) {
        if (parameters.fullWidth) {
          if (parameters.position) {
            parameters.position = parameters.position.replace('right', 'left');
          }
        }

        vsNotifications_instance = new NotiConstructor({
          data: parameters
        });
        vsNotifications_instance.vm = vsNotifications_instance.$mount();
        parameters.click ? vsNotifications_instance.vm.$on('click', parameters.click) : null;
        utils.insertBody(vsNotifications_instance.vm.$el);
      }
    }; // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.array.from.js

    var es6_array_from = __webpack_require__("b2fb"); // EXTERNAL MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.string.iterator.js


    var es6_string_iterator = __webpack_require__("3136"); // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e1152-vue-loader-template"}!C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/functions/vsLoading/index.vue?vue&type=template&id=6dfeeb48&


    var vsLoadingvue_type_template_id_6dfeeb48_render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "fade"
        }
      }, [_vm.active ? _c('div', {
        staticClass: "con-vs-loading",
        class: ["vs-loading-background-" + _vm.background, "vs-loading-color-" + _vm.color, {
          'textAfter': _vm.textAfter
        }],
        style: _vm.style,
        on: {
          "click": _vm.effectClick
        }
      }, [_c('transition', {
        attrs: {
          "name": "effect-click"
        }
      }, [_vm.activeEffectClick && _vm.clickEffect ? _c('div', {
        staticClass: "effect-click",
        style: _vm.styleEffectClick
      }) : _vm._e()]), _vm.text ? _c('h4', {
        staticClass: "title-loading"
      }, [_vm._v(_vm._s(_vm.text))]) : _vm._e(), _c('div', {
        staticClass: "vs-loading",
        class: [_vm.type],
        style: {
          transform: "scale(" + _vm.scale + ")"
        }
      }, [_vm.type != 'material' ? _c('div', {
        staticClass: "effect-1 effects",
        style: _vm.styleEffect1
      }) : _vm._e(), _vm.type != 'material' ? _c('div', {
        staticClass: "effect-2 effects",
        style: _vm.styleEffect2
      }) : _vm._e(), _vm.type != 'material' ? _c('div', {
        staticClass: "effect-3 effects",
        style: _vm.styleEffect3
      }) : _vm._e(), _c('img', {
        attrs: {
          "src": _vm.src
        }
      }), _vm.type == 'material' ? _c('svg', {
        staticClass: "spinner",
        attrs: {
          "width": "50px",
          "height": "50px",
          "viewBox": "0 0 66 66",
          "xmlns": "http://www.w3.org/2000/svg"
        }
      }, [_c('circle', {
        staticClass: "path",
        attrs: {
          "fill": "none",
          "stroke-width": "5",
          "stroke-linecap": "round",
          "cx": "33",
          "cy": "33",
          "r": "30"
        }
      })]) : _vm._e()])], 1) : _vm._e()]);
    };

    var vsLoadingvue_type_template_id_6dfeeb48_staticRenderFns = []; // CONCATENATED MODULE: ./src/functions/vsLoading/index.vue?vue&type=template&id=6dfeeb48&
    // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/functions/vsLoading/index.vue?vue&type=script&lang=js&
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    /* harmony default export */

    var vsLoadingvue_type_script_lang_js_ = {
      data: function data() {
        return {
          active: false,
          type: 'default',
          color: null,
          background: 'rgba(255,255,255,.6)',
          src: '',
          leftx: 0,
          topx: 0,
          clickEffect: false,
          activeEffectClick: false,
          scale: 1,
          textAfter: false,
          text: null
        };
      },
      computed: {
        styleEffectClick: function styleEffectClick() {
          return {
            left: "".concat(this.leftx, "px"),
            top: "".concat(this.topx, "px")
          };
        },
        styleEffect1: function styleEffect1() {
          var style = {
            borderLeft: "3px solid ".concat(utils_color.getColor(this.color, 1))
          };

          if (this.type == 'border') {
            style = {
              borderLeft: "1px solid ".concat(utils_color.getColor(this.color, 1))
            };
          }

          if (this.type == 'point') {
            style = {
              background: utils_color.getColor(this.color, .4)
            };
          }

          if (this.type == 'radius') {
            style = {
              border: "3px solid ".concat(utils_color.getColor(this.color, 1))
            };
          }

          if (this.type == 'corners') {
            style = {
              border: "3px solid ".concat(utils_color.getColor(this.color, 1))
            };
          }

          if (this.type == 'sound') {
            style = {
              background: utils_color.getColor(this.color, 1)
            };
          }

          return style;
        },
        styleEffect2: function styleEffect2() {
          var style = {
            borderLeft: "3px solid ".concat(utils_color.getColor(this.color, 1))
          };

          if (this.type == 'border') {
            style = {
              borderLeft: "1px solid ".concat(utils_color.getColor(this.color, 1))
            };
          }

          if (this.type == 'point') {
            style = {
              background: utils_color.getColor(this.color, .4)
            };
          }

          if (this.type == 'radius') {
            style = {
              border: "3px solid ".concat(utils_color.getColor(this.color, 1))
            };
          }

          if (this.type == 'corners') {
            style = {};
          }

          if (this.type == 'sound') {
            style = {
              background: utils_color.getColor(this.color, 1)
            };
          }

          return style;
        },
        styleEffect3: function styleEffect3() {
          var style = {
            borderLeft: "3px solid ".concat(utils_color.getColor(this.color, 1))
          };

          if (this.type == 'border') {
            style = {
              borderLeft: "1px solid ".concat(utils_color.getColor(this.color, 1))
            };
          }

          if (this.type == 'point') {
            style = {
              background: utils_color.getColor(this.color, .4)
            };
          }

          if (this.type == 'radius') {
            style = {
              border: "3px solid ".concat(utils_color.getColor(this.color, 1))
            };
          }

          if (this.type == 'corners') {
            style = {};
          }

          if (this.type == 'sound') {
            style = {
              background: utils_color.getColor(this.color, 1)
            };
          }

          return style;
        },
        style: function style() {
          return {
            background: utils_color.getColor(this.background, 1)
          };
        }
      },
      mounted: function mounted() {
        this.active = true;
      },
      methods: {
        effectClick: function effectClick(evt) {
          var _this = this;

          this.leftx = evt.offsetX;
          this.topx = evt.offsetY;
          this.activeEffectClick = true;
          setTimeout(function () {
            _this.activeEffectClick = false;
          }, 50);
        },
        close: function close() {
          this.active = false;
        }
      }
    }; // CONCATENATED MODULE: ./src/functions/vsLoading/index.vue?vue&type=script&lang=js&

    /* harmony default export */

    var functions_vsLoadingvue_type_script_lang_js_ = vsLoadingvue_type_script_lang_js_; // CONCATENATED MODULE: ./src/functions/vsLoading/index.vue

    /* normalize component */

    var vsLoading_component = normalizeComponent(functions_vsLoadingvue_type_script_lang_js_, vsLoadingvue_type_template_id_6dfeeb48_render, vsLoadingvue_type_template_id_6dfeeb48_staticRenderFns, false, null, null, null);
    vsLoading_component.options.__file = "index.vue";
    /* harmony default export */

    var vsLoading = vsLoading_component.exports; // CONCATENATED MODULE: ./src/functions/vsLoading/index.js

    var loadingConstructor = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend(vsLoading);
    /* harmony default export */

    var functions_vsLoading = {
      name: 'loading',
      vsfunction: function vsfunction(parameters) {
        var instance = new loadingConstructor();
        var containerx = document.body;

        if (parameters) {
          instance.$data.type = parameters.type || 'default';
          instance.$data.background = parameters.background;
          instance.$data.color = parameters.color;
          instance.$data.scale = parameters.scale;
          instance.$data.text = parameters.text;
          instance.$data.clickEffect = parameters.clickEffect;

          if (parameters.container) {
            containerx = parameters.container instanceof Element ? parameters.container : document.querySelector(parameters.container);
          }
        }

        instance.vm = instance.$mount();
        containerx.insertBefore(instance.vm.$el, containerx.firstChild);
      },
      close: function close(elx) {
        var loadings;

        if (elx instanceof Element) {
          // Mimicking the behavior of doing `elx.querySelectorAll('> con-vs-loading')` but `>` is not well supported.
          // We are doing this because we can only add the respective classes to .con-vs-loading
          loadings = Array.from(elx.children).filter(function (el) {
            return el.classList.contains('con-vs-loading');
          });
        } else {
          loadings = document.querySelectorAll(elx || 'body > .con-vs-loading');
        }

        loadings.forEach(function (loading) {
          loading.classList.add('beforeRemove');
          setTimeout(function () {
            loading.remove();
          }, 300);
        });
      }
    }; // CONCATENATED MODULE: ./src/functions/vsDialog/index.js

    var dialogConstructor = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend(vsDialog);
    var vsDialog_instance;
    /* harmony default export */

    var functions_vsDialog = {
      name: 'dialog',
      vsfunction: function vsfunction(props) {
        vsDialog_instance = new dialogConstructor();
        vsDialog_instance.$props.text = props.text;
        vsDialog_instance.$props.title = props.title || 'Dialog';
        vsDialog_instance.$props.color = props.color;
        vsDialog_instance.$props.type = props.type || 'alert';
        vsDialog_instance.$props.buttonAccept = props.buttonAccept || 'filled';
        vsDialog_instance.$props.buttonCancel = props.buttonCancel || 'flat';
        vsDialog_instance.$props.acceptText = props.acceptText || 'Accept';
        vsDialog_instance.$props.cancelText = props.cancelText || 'Cancel';
        vsDialog_instance.$props.closeIcon = props.closeIcon || 'close';
        vsDialog_instance.$props.iconPack = props.iconPack || 'material-icons';
        vsDialog_instance.$props.isValid = props.isValid || 'none';
        vsDialog_instance.$data.isPrompt = false;
        vsDialog_instance.vm = vsDialog_instance.$mount();
        props.accept ? vsDialog_instance.vm.$on('accept', props.accept) : null;
        props.cancel ? vsDialog_instance.vm.$on('cancel', props.cancel) : null;
        utils.insertBody(vsDialog_instance.vm.$el, props.parent);
        external_commonjs_vue_commonjs2_vue_root_Vue_default.a.nextTick(function () {
          vsDialog_instance.$data.fActive = true;
          vsDialog_instance.$data.parameters = props.parameters;
        });
      }
    }; // CONCATENATED MODULE: ./src/utils/theme.js

    /* harmony default export */

    var theme = {
      name: 'theme',
      vsfunction: function vsfunction(json) {
        for (var clave in json) {
          var colorx = void 0;

          if (/^[rgb(]/g.test(json[clave])) {
            colorx = json[clave].replace(/[rgb()]/g, '');
          } else if (/[#]/g.test(json[clave])) {
            var rgbx = utils_color.hexToRgb(json[clave]);
            colorx = "".concat(rgbx.r, ",").concat(rgbx.g, ",").concat(rgbx.b);
          } else {
            colorx = json[clave];
          }

          utils_color.setCssVariable('--vs-' + clave, colorx);
        }
      }
    }; // CONCATENATED MODULE: ./src/functions/index.js
    // Functions
    //theme

    var vsFunctions = {
      vsNotifications: functions_vsNotifications,
      vsLoading: functions_vsLoading,
      vsTheme: theme,
      vsDialog: functions_vsDialog
    };
    /* harmony default export */

    var functions = function (Vue) {
      Object.values(vsFunctions).forEach(function (vsFunctions) {
        if (vsFunctions.hasOwnProperty('subName')) {
          Vue.prototype.$vs[vsFunctions.name][vsFunctions.subName] = vsFunctions.vsfunction;
        } else {
          Vue.prototype.$vs[vsFunctions.name] = vsFunctions.vsfunction;
        }
      });
      Vue.prototype.$vs.loading.close = functions_vsLoading.close;
    }; // EXTERNAL MODULE: ./src/style/vuesax.styl


    var vuesax = __webpack_require__("99c0"); // CONCATENATED MODULE: ./src/utils/rtl.js

    /**
     * @injectDirectionClass 
     * will inject 'vuesax-app-is-ltr' (ltr case) or 'vuexsax-app-is-rtl' (rtl case) in the html tag
     */


    var injectDirectionClass = function injectDirectionClass(dir) {
      if (dir) {
        document.documentElement.classList.remove('vuesax-app-is-ltr');
        document.documentElement.classList.add('vuesax-app-is-rtl');
      } else {
        document.documentElement.classList.add('vuesax-app-is-ltr');
        document.documentElement.classList.remove('vuesax-app-is-rtl');
      }
    };

    var DefineRTL = function DefineRTL(Vue, options, vm) {
      // if rtl option passed, inject the appropriate class
      if (options.hasOwnProperty('rtl')) {
        injectDirectionClass(options.rtl);
      } // Define reactive $vs.rtl property


      Vue.util.defineReactive(vm.$vs, 'rtl', options.rtl, function () {
        vm.$nextTick(function () {
          if (options.rtl !== vm.$vs.rtl) {
            options.rtl = vm.$vs.rtl; // if value change

            injectDirectionClass(vm.$vs.rtl);
          }
        });
      });
    }; // CONCATENATED MODULE: ./src/override.js

    /**
     * Override the main init sequence. This is called for every instance
     */

    /* harmony default export */


    var override = function (Vue, options) {
      var _init = Vue.prototype._init;

      Vue.prototype._init = function () {
        var op = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // Define $vs.rtl for every instance

        DefineRTL(Vue, options, this);

        _init.call(this, op);
      };
    }; // CONCATENATED MODULE: ./src/index.js


    var src_install = function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        rtl: false
      }; // Define Vuesax main identifier

      Vue.prototype.$vs = {}; // Use Components

      Object.values(components_namespaceObject).forEach(function (vsComponent) {
        Vue.use(vsComponent);
      });

      if (options) {
        if (options.hasOwnProperty('theme')) {
          if (options.theme.hasOwnProperty('colors')) {
            if (typeof window !== 'undefined') {
              theme.vsfunction(options.theme.colors, options.server);
            }
          }
        }
      } // Override the the Vue._init function


      override(Vue, options);
      functions(Vue);
      window.addEventListener('scroll', function () {
        document.querySelectorAll('*[class*="vx-"]').forEach(function (item) {
          item.parentElement.removeChild(item);
        });
      });
    };

    if (typeof window !== 'undefined' && window.Vue) {
      src_install(window.Vue);
    }
    /* harmony default export */


    var src = src_install; //New Component import
    //layout
    // CONCATENATED MODULE: C:/Users/DELL/AppData/Roaming/npm/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js

    /* concated harmony reexport vsButton */

    __webpack_require__.d(__webpack_exports__, "vsButton", function () {
      return components_vsButton;
    });
    /* concated harmony reexport vsSelect */


    __webpack_require__.d(__webpack_exports__, "vsSelect", function () {
      return components_vsSelect;
    });
    /* concated harmony reexport vsSwitch */


    __webpack_require__.d(__webpack_exports__, "vsSwitch", function () {
      return components_vsSwitch;
    });
    /* concated harmony reexport vsCheckbox */


    __webpack_require__.d(__webpack_exports__, "vsCheckbox", function () {
      return components_vsCheckBox;
    });
    /* concated harmony reexport vsRadio */


    __webpack_require__.d(__webpack_exports__, "vsRadio", function () {
      return components_vsRadio;
    });
    /* concated harmony reexport vsInput */


    __webpack_require__.d(__webpack_exports__, "vsInput", function () {
      return components_vsInput;
    });
    /* concated harmony reexport vsTabs */


    __webpack_require__.d(__webpack_exports__, "vsTabs", function () {
      return components_vsTabs;
    });
    /* concated harmony reexport vsSlider */


    __webpack_require__.d(__webpack_exports__, "vsSlider", function () {
      return components_vsSlider;
    });
    /* concated harmony reexport vsInputNumber */


    __webpack_require__.d(__webpack_exports__, "vsInputNumber", function () {
      return components_vsInputNumber;
    });
    /* concated harmony reexport vsTooltip */


    __webpack_require__.d(__webpack_exports__, "vsTooltip", function () {
      return components_vsTooltip;
    });
    /* concated harmony reexport vsUpload */


    __webpack_require__.d(__webpack_exports__, "vsUpload", function () {
      return components_vsUpload;
    });
    /* concated harmony reexport vsPopup */


    __webpack_require__.d(__webpack_exports__, "vsPopup", function () {
      return components_vsPopup;
    });
    /* concated harmony reexport vsAlert */


    __webpack_require__.d(__webpack_exports__, "vsAlert", function () {
      return components_vsAlert;
    });
    /* concated harmony reexport vsChip */


    __webpack_require__.d(__webpack_exports__, "vsChip", function () {
      return components_vsChip;
    });
    /* concated harmony reexport vsProgress */


    __webpack_require__.d(__webpack_exports__, "vsProgress", function () {
      return components_vsProgress;
    });
    /* concated harmony reexport vsCard */


    __webpack_require__.d(__webpack_exports__, "vsCard", function () {
      return components_vsCard;
    });
    /* concated harmony reexport vsList */


    __webpack_require__.d(__webpack_exports__, "vsList", function () {
      return components_vsList;
    });
    /* concated harmony reexport vsAvatar */


    __webpack_require__.d(__webpack_exports__, "vsAvatar", function () {
      return components_vsAvatar;
    });
    /* concated harmony reexport vsPagination */


    __webpack_require__.d(__webpack_exports__, "vsPagination", function () {
      return components_vsPagination;
    });
    /* concated harmony reexport vsBreadcrumb */


    __webpack_require__.d(__webpack_exports__, "vsBreadcrumb", function () {
      return components_vsBreadcrumb;
    });
    /* concated harmony reexport vsPrompt */


    __webpack_require__.d(__webpack_exports__, "vsPrompt", function () {
      return vsPrompt;
    });
    /* concated harmony reexport vsDivider */


    __webpack_require__.d(__webpack_exports__, "vsDivider", function () {
      return components_vsDivider;
    });
    /* concated harmony reexport vsSpacer */


    __webpack_require__.d(__webpack_exports__, "vsSpacer", function () {
      return components_vsSpacer;
    });
    /* concated harmony reexport vsIcon */


    __webpack_require__.d(__webpack_exports__, "vsIcon", function () {
      return components_vsIcon;
    });
    /* concated harmony reexport vsNavbar */


    __webpack_require__.d(__webpack_exports__, "vsNavbar", function () {
      return components_vsNavbar;
    });
    /* concated harmony reexport vsSideBar */


    __webpack_require__.d(__webpack_exports__, "vsSideBar", function () {
      return vsSideBar;
    });
    /* concated harmony reexport vsDropDown */


    __webpack_require__.d(__webpack_exports__, "vsDropDown", function () {
      return components_vsDropDown;
    });
    /* concated harmony reexport vsTable */


    __webpack_require__.d(__webpack_exports__, "vsTable", function () {
      return components_vsTable;
    });
    /* concated harmony reexport vsTextarea */


    __webpack_require__.d(__webpack_exports__, "vsTextarea", function () {
      return components_vsTextarea;
    });
    /* concated harmony reexport vsCollapse */


    __webpack_require__.d(__webpack_exports__, "vsCollapse", function () {
      return components_vsCollapse;
    });
    /* concated harmony reexport vsImages */


    __webpack_require__.d(__webpack_exports__, "vsImages", function () {
      return components_vsImages;
    });
    /* concated harmony reexport vsRow */


    __webpack_require__.d(__webpack_exports__, "vsRow", function () {
      return layout_vsRow;
    });
    /* concated harmony reexport vsCol */


    __webpack_require__.d(__webpack_exports__, "vsCol", function () {
      return layout_vsCol;
    });
    /* harmony default export */


    var entry_lib = __webpack_exports__["default"] = src;
    /***/
  },

  /***/
  "9d82":
  /***/
  function (module, exports, __webpack_require__) {// extracted by mini-css-extract-plugin

    /***/
  },

  /***/
  "a0f5":
  /***/
  function (module, exports) {
    module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
    /***/
  },

  /***/
  "a602":
  /***/
  function (module, exports, __webpack_require__) {
    var def = __webpack_require__("d528").f;

    var has = __webpack_require__("571a");

    var TAG = __webpack_require__("24aa")('toStringTag');

    module.exports = function (it, tag, stat) {
      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
        configurable: true,
        value: tag
      });
    };
    /***/

  },

  /***/
  "ad0e":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var isRegExp = __webpack_require__("341c");

    var anObject = __webpack_require__("3fa7");

    var speciesConstructor = __webpack_require__("4eb1");

    var advanceStringIndex = __webpack_require__("78c7");

    var toLength = __webpack_require__("38fd");

    var callRegExpExec = __webpack_require__("c829");

    var regexpExec = __webpack_require__("adaf");

    var fails = __webpack_require__("c213");

    var $min = Math.min;
    var $push = [].push;
    var $SPLIT = 'split';
    var LENGTH = 'length';
    var LAST_INDEX = 'lastIndex';
    var MAX_UINT32 = 0xffffffff; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

    var SUPPORTS_Y = !fails(function () {
      RegExp(MAX_UINT32, 'y');
    }); // @@split logic

    __webpack_require__("b905")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
      var internalSplit;

      if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
        // based on es5-shim implementation, need to rework it
        internalSplit = function (separator, limit) {
          var string = String(this);
          if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

          if (!isRegExp(separator)) return $split.call(string, separator, limit);
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var match, lastIndex, lastLength;

          while (match = regexpExec.call(separatorCopy, string)) {
            lastIndex = separatorCopy[LAST_INDEX];

            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
              lastLength = match[0][LENGTH];
              lastLastIndex = lastIndex;
              if (output[LENGTH] >= splitLimit) break;
            }

            if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
          }

          if (lastLastIndex === string[LENGTH]) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));

          return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
        }; // Chakra, V8

      } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
        internalSplit = function (separator, limit) {
          return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
        };
      } else {
        internalSplit = $split;
      }

      return [// `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = defined(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
      }, // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
        if (res.done) return res.value;
        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);
        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.

        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];

        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;

          if (z === null || (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;

            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }

            q = p = e;
          }
        }

        A.push(S.slice(p));
        return A;
      }];
    });
    /***/

  },

  /***/
  "adaf":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var regexpFlags = __webpack_require__("45dc");

    var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
    // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
    // which loads this file before patching the method.

    var nativeReplace = String.prototype.replace;
    var patchedExec = nativeExec;
    var LAST_INDEX = 'lastIndex';

    var UPDATES_LAST_INDEX_WRONG = function () {
      var re1 = /a/,
          re2 = /b*/g;
      nativeExec.call(re1, 'a');
      nativeExec.call(re2, 'a');
      return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
    }(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


    var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

    if (PATCH) {
      patchedExec = function exec(str) {
        var re = this;
        var lastIndex, reCopy, match, i;

        if (NPCG_INCLUDED) {
          reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
        }

        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
        match = nativeExec.call(re, str);

        if (UPDATES_LAST_INDEX_WRONG && match) {
          re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
        }

        if (NPCG_INCLUDED && match && match.length > 1) {
          // Fix browsers whose `exec` methods don't consistently return `undefined`
          // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
          // eslint-disable-next-line no-loop-func
          nativeReplace.call(match[0], reCopy, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
        }

        return match;
      };
    }

    module.exports = patchedExec;
    /***/
  },

  /***/
  "aeae":
  /***/
  function (module, exports, __webpack_require__) {
    // Works with __proto__ only. Old v8 can't work with null proto objects.

    /* eslint-disable no-proto */
    var isObject = __webpack_require__("1d2f");

    var anObject = __webpack_require__("3fa7");

    var check = function (O, proto) {
      anObject(O);
      if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
    };

    module.exports = {
      set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = __webpack_require__("2eb4")(Function.call, __webpack_require__("0f2e").f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) {
          buggy = true;
        }

        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
      check: check
    };
    /***/
  },

  /***/
  "aecc":
  /***/
  function (module, exports, __webpack_require__) {
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    var anObject = __webpack_require__("3fa7");

    var dPs = __webpack_require__("2436");

    var enumBugKeys = __webpack_require__("0d98");

    var IE_PROTO = __webpack_require__("8629")('IE_PROTO');

    var Empty = function () {
      /* empty */
    };

    var PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

    var createDict = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = __webpack_require__("8c9d")('iframe');

      var i = enumBugKeys.length;
      var lt = '<';
      var gt = '>';
      var iframeDocument;
      iframe.style.display = 'none';

      __webpack_require__("c20c").appendChild(iframe);

      iframe.src = 'javascript:'; // eslint-disable-line no-script-url
      // createDict = iframe.contentWindow.Object;
      // html.removeChild(iframe);

      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
      iframeDocument.close();
      createDict = iframeDocument.F;

      while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];

      return createDict();
    };

    module.exports = Object.create || function create(O, Properties) {
      var result;

      if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

        result[IE_PROTO] = O;
      } else result = createDict();

      return Properties === undefined ? result : dPs(result, Properties);
    };
    /***/

  },

  /***/
  "b0e8":
  /***/
  function (module, exports) {
    // 7.2.9 SameValue(x, y)
    module.exports = Object.is || function is(x, y) {
      // eslint-disable-next-line no-self-compare
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };
    /***/

  },

  /***/
  "b1b7":
  /***/
  function (module, exports, __webpack_require__) {
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var cof = __webpack_require__("ebbd"); // eslint-disable-next-line no-prototype-builtins


    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
    /***/
  },

  /***/
  "b2fb":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var ctx = __webpack_require__("2eb4");

    var $export = __webpack_require__("048e");

    var toObject = __webpack_require__("099f");

    var call = __webpack_require__("f80b");

    var isArrayIter = __webpack_require__("4e8e");

    var toLength = __webpack_require__("38fd");

    var createProperty = __webpack_require__("d63a");

    var getIterFn = __webpack_require__("4811");

    $export($export.S + $export.F * !__webpack_require__("1707")(function (iter) {
      Array.from(iter);
    }), 'Array', {
      // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
      from: function from(arrayLike
      /* , mapfn = undefined, thisArg = undefined */
      ) {
        var O = toObject(arrayLike);
        var C = typeof this == 'function' ? this : Array;
        var aLen = arguments.length;
        var mapfn = aLen > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var index = 0;
        var iterFn = getIterFn(O);
        var length, result, step, iterator;
        if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

        if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
          for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
            createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
          }
        } else {
          length = toLength(O.length);

          for (result = new C(length); length > index; index++) {
            createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
          }
        }

        result.length = index;
        return result;
      }
    });
    /***/
  },

  /***/
  "b5d7":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    __webpack_require__("5b58");

    var anObject = __webpack_require__("3fa7");

    var $flags = __webpack_require__("45dc");

    var DESCRIPTORS = __webpack_require__("9baa");

    var TO_STRING = 'toString';
    var $toString = /./[TO_STRING];

    var define = function (fn) {
      __webpack_require__("baca")(RegExp.prototype, TO_STRING, fn, true);
    }; // 21.2.5.14 RegExp.prototype.toString()


    if (__webpack_require__("c213")(function () {
      return $toString.call({
        source: 'a',
        flags: 'b'
      }) != '/a/b';
    })) {
      define(function toString() {
        var R = anObject(this);
        return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
      }); // FF44- RegExp#toString has a wrong name
    } else if ($toString.name != TO_STRING) {
      define(function toString() {
        return $toString.call(this);
      });
    }
    /***/

  },

  /***/
  "b7f6":
  /***/
  function (module, exports) {
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
    /***/

  },

  /***/
  "b905":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    __webpack_require__("2f50");

    var redefine = __webpack_require__("baca");

    var hide = __webpack_require__("59ee");

    var fails = __webpack_require__("c213");

    var defined = __webpack_require__("50c4");

    var wks = __webpack_require__("24aa");

    var regexpExec = __webpack_require__("adaf");

    var SPECIES = wks('species');
    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
      // #replace needs built-in support for named groups.
      // #match works fine because it just return the exec results, even if it has
      // a "grops" property.
      var re = /./;

      re.exec = function () {
        var result = [];
        result.groups = {
          a: '7'
        };
        return result;
      };

      return ''.replace(re, '$<a>') !== '7';
    });

    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
      // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
      var re = /(?:)/;
      var originalExec = re.exec;

      re.exec = function () {
        return originalExec.apply(this, arguments);
      };

      var result = 'ab'.split(re);
      return result.length === 2 && result[0] === 'a' && result[1] === 'b';
    }();

    module.exports = function (KEY, length, exec) {
      var SYMBOL = wks(KEY);
      var DELEGATES_TO_SYMBOL = !fails(function () {
        // String methods call symbol-named RegEp methods
        var O = {};

        O[SYMBOL] = function () {
          return 7;
        };

        return ''[KEY](O) != 7;
      });
      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        re.exec = function () {
          execCalled = true;
          return null;
        };

        if (KEY === 'split') {
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};

          re.constructor[SPECIES] = function () {
            return re;
          };
        }

        re[SYMBOL]('');
        return !execCalled;
      }) : undefined;

      if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
        var nativeRegExpMethod = /./[SYMBOL];
        var fns = exec(defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2)
              };
            }

            return {
              done: true,
              value: nativeMethod.call(str, regexp, arg2)
            };
          }

          return {
            done: false
          };
        });
        var strfn = fns[0];
        var rxfn = fns[1];
        redefine(String.prototype, KEY, strfn);
        hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) {
          return rxfn.call(string, this, arg);
        } // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) {
          return rxfn.call(string, this);
        });
      }
    };
    /***/

  },

  /***/
  "b9ae":
  /***/
  function (module, exports, __webpack_require__) {
    // 20.2.2.34 Math.trunc(x)
    var $export = __webpack_require__("048e");

    $export($export.S, 'Math', {
      trunc: function trunc(it) {
        return (it > 0 ? Math.floor : Math.ceil)(it);
      }
    });
    /***/
  },

  /***/
  "baa3":
  /***/
  function (module, exports, __webpack_require__) {
    module.exports = !__webpack_require__("9baa") && !__webpack_require__("c213")(function () {
      return Object.defineProperty(__webpack_require__("8c9d")('div'), 'a', {
        get: function () {
          return 7;
        }
      }).a != 7;
    });
    /***/
  },

  /***/
  "baca":
  /***/
  function (module, exports, __webpack_require__) {
    var global = __webpack_require__("9a60");

    var hide = __webpack_require__("59ee");

    var has = __webpack_require__("571a");

    var SRC = __webpack_require__("329e")('src');

    var $toString = __webpack_require__("ca25");

    var TO_STRING = 'toString';
    var TPL = ('' + $toString).split(TO_STRING);

    __webpack_require__("e3a0").inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) has(val, 'name') || hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

      if (O === global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        hide(O, key, val);
      } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
    /***/
  },

  /***/
  "bca1":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var $export = __webpack_require__("048e");

    var aFunction = __webpack_require__("2004");

    var toObject = __webpack_require__("099f");

    var fails = __webpack_require__("c213");

    var $sort = [].sort;
    var test = [1, 2, 3];
    $export($export.P + $export.F * (fails(function () {
      // IE8-
      test.sort(undefined);
    }) || !fails(function () {
      // V8 bug
      test.sort(null); // Old WebKit
    }) || !__webpack_require__("ccdc")($sort)), 'Array', {
      // 22.1.3.25 Array.prototype.sort(comparefn)
      sort: function sort(comparefn) {
        return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
      }
    });
    /***/
  },

  /***/
  "be76":
  /***/
  function (module, exports, __webpack_require__) {
    var isObject = __webpack_require__("1d2f");

    var setPrototypeOf = __webpack_require__("aeae").set;

    module.exports = function (that, target, C) {
      var S = target.constructor;
      var P;

      if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
        setPrototypeOf(that, P);
      }

      return that;
    };
    /***/

  },

  /***/
  "c20c":
  /***/
  function (module, exports, __webpack_require__) {
    var document = __webpack_require__("9a60").document;

    module.exports = document && document.documentElement;
    /***/
  },

  /***/
  "c213":
  /***/
  function (module, exports) {
    module.exports = function (exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
    /***/

  },

  /***/
  "c829":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var classof = __webpack_require__("26f8");

    var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
    // https://tc39.github.io/ecma262/#sec-regexpexec

    module.exports = function (R, S) {
      var exec = R.exec;

      if (typeof exec === 'function') {
        var result = exec.call(R, S);

        if (typeof result !== 'object') {
          throw new TypeError('RegExp exec method returned something other than an Object or null');
        }

        return result;
      }

      if (classof(R) !== 'RegExp') {
        throw new TypeError('RegExp#exec called on incompatible receiver');
      }

      return builtinExec.call(R, S);
    };
    /***/

  },

  /***/
  "ca25":
  /***/
  function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__("6ae5")('native-function-to-string', Function.toString);
    /***/
  },

  /***/
  "ccdc":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var fails = __webpack_require__("c213");

    module.exports = function (method, arg) {
      return !!method && fails(function () {
        // eslint-disable-next-line no-useless-call
        arg ? method.call(null, function () {
          /* empty */
        }, 1) : method.call(null);
      });
    };
    /***/

  },

  /***/
  "d35e":
  /***/
  function (module, exports) {
    // 7.1.4 ToInteger
    var ceil = Math.ceil;
    var floor = Math.floor;

    module.exports = function (it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
    /***/

  },

  /***/
  "d3ae":
  /***/
  function (module, exports) {
    module.exports = false;
    /***/
  },

  /***/
  "d3fe":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict"; // https://github.com/tc39/Array.prototype.includes

    var $export = __webpack_require__("048e");

    var $includes = __webpack_require__("dd00")(true);

    $export($export.P, 'Array', {
      includes: function includes(el
      /* , fromIndex = 0 */
      ) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    __webpack_require__("2583")('includes');
    /***/

  },

  /***/
  "d528":
  /***/
  function (module, exports, __webpack_require__) {
    var anObject = __webpack_require__("3fa7");

    var IE8_DOM_DEFINE = __webpack_require__("baa3");

    var toPrimitive = __webpack_require__("0666");

    var dP = Object.defineProperty;
    exports.f = __webpack_require__("9baa") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP(O, P, Attributes);
      } catch (e) {
        /* empty */
      }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };
    /***/
  },

  /***/
  "d63a":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var $defineProperty = __webpack_require__("d528");

    var createDesc = __webpack_require__("b7f6");

    module.exports = function (object, index, value) {
      if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
    };
    /***/

  },

  /***/
  "d758":
  /***/
  function (module, exports) {
    module.exports = function (done, value) {
      return {
        value: value,
        done: !!done
      };
    };
    /***/

  },

  /***/
  "dad7":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var anObject = __webpack_require__("3fa7");

    var toObject = __webpack_require__("099f");

    var toLength = __webpack_require__("38fd");

    var toInteger = __webpack_require__("d35e");

    var advanceStringIndex = __webpack_require__("78c7");

    var regExpExec = __webpack_require__("c829");

    var max = Math.max;
    var min = Math.min;
    var floor = Math.floor;
    var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

    var maybeToString = function (it) {
      return it === undefined ? it : String(it);
    }; // @@replace logic


    __webpack_require__("b905")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
      return [// `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative($replace, regexp, this, replaceValue);
        if (res.done) return res.value;
        var rx = anObject(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);
        var global = rx.global;

        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }

        var results = [];

        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;
          results.push(result);
          if (!global) break;
          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;

        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max(min(toInteger(result.index), S.length), 0);
          var captures = []; // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

          var namedCaptures = result.groups;

          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }

          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }

        return accumulatedResult + S.slice(nextSourcePosition);
      }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

      function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

        if (namedCaptures !== undefined) {
          namedCaptures = toObject(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }

        return $replace.call(replacement, symbols, function (match, ch) {
          var capture;

          switch (ch.charAt(0)) {
            case '$':
              return '$';

            case '&':
              return matched;

            case '`':
              return str.slice(0, position);

            case "'":
              return str.slice(tailPos);

            case '<':
              capture = namedCaptures[ch.slice(1, -1)];
              break;

            default:
              // \d\d?
              var n = +ch;
              if (n === 0) return match;

              if (n > m) {
                var f = floor(n / 10);
                if (f === 0) return match;
                if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                return match;
              }

              capture = captures[n - 1];
          }

          return capture === undefined ? '' : capture;
        });
      }
    });
    /***/

  },

  /***/
  "db1a":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var addToUnscopables = __webpack_require__("2583");

    var step = __webpack_require__("d758");

    var Iterators = __webpack_require__("45bf");

    var toIObject = __webpack_require__("96da"); // 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()


    module.exports = __webpack_require__("9884")(Array, 'Array', function (iterated, kind) {
      this._t = toIObject(iterated); // target

      this._i = 0; // next index

      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    }, function () {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;

      if (!O || index >= O.length) {
        this._t = undefined;
        return step(1);
      }

      if (kind == 'keys') return step(0, index);
      if (kind == 'values') return step(0, O[index]);
      return step(0, [index, O[index]]);
    }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

    Iterators.Arguments = Iterators.Array;
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');
    /***/
  },

  /***/
  "dc51":
  /***/
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */

    var _AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsRow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1c96");
    /* harmony import */


    var _AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsRow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default =
    /*#__PURE__*/
    __webpack_require__.n(_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsRow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
    /* unused harmony reexport * */

    /* unused harmony default export */


    var _unused_webpack_default_export = _AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsRow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a;
    /***/
  },

  /***/
  "dcf5":
  /***/
  function (module, exports, __webpack_require__) {
    var has = __webpack_require__("571a");

    var toIObject = __webpack_require__("96da");

    var arrayIndexOf = __webpack_require__("dd00")(false);

    var IE_PROTO = __webpack_require__("8629")('IE_PROTO');

    module.exports = function (object, names) {
      var O = toIObject(object);
      var i = 0;
      var result = [];
      var key;

      for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key); // Don't enum bug & hidden keys


      while (names.length > i) if (has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
      }

      return result;
    };
    /***/

  },

  /***/
  "dd00":
  /***/
  function (module, exports, __webpack_require__) {
    // false -> Array#indexOf
    // true  -> Array#includes
    var toIObject = __webpack_require__("96da");

    var toLength = __webpack_require__("38fd");

    var toAbsoluteIndex = __webpack_require__("7527");

    module.exports = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value; // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare

        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++]; // eslint-disable-next-line no-self-compare

          if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
        } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
      };
    };
    /***/

  },

  /***/
  "dede":
  /***/
  function (module, exports, __webpack_require__) {
    // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
    var speciesConstructor = __webpack_require__("6e24");

    module.exports = function (original, length) {
      return new (speciesConstructor(original))(length);
    };
    /***/

  },

  /***/
  "e2c8":
  /***/
  function (module, exports, __webpack_require__) {
    // 7.2.2 IsArray(argument)
    var cof = __webpack_require__("ebbd");

    module.exports = Array.isArray || function isArray(arg) {
      return cof(arg) == 'Array';
    };
    /***/

  },

  /***/
  "e3a0":
  /***/
  function (module, exports) {
    var core = module.exports = {
      version: '2.6.5'
    };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

    /***/
  },

  /***/
  "ebbd":
  /***/
  function (module, exports) {
    var toString = {}.toString;

    module.exports = function (it) {
      return toString.call(it).slice(8, -1);
    };
    /***/

  },

  /***/
  "ed20":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict"; // 21.1.3.7 String.prototype.includes(searchString, position = 0)

    var $export = __webpack_require__("048e");

    var context = __webpack_require__("8a9b");

    var INCLUDES = 'includes';
    $export($export.P + $export.F * __webpack_require__("1850")(INCLUDES), 'String', {
      includes: function includes(searchString
      /* , position = 0 */
      ) {
        return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
    /***/
  },

  /***/
  "eda4":
  /***/
  function (module, exports, __webpack_require__) {
    // 19.1.2.14 Object.keys(O)
    var toObject = __webpack_require__("099f");

    var $keys = __webpack_require__("98b7");

    __webpack_require__("5df1")('keys', function () {
      return function keys(it) {
        return $keys(toObject(it));
      };
    });
    /***/

  },

  /***/
  "f2fe":
  /***/
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */

    var _AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsCol_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9d82");
    /* harmony import */


    var _AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsCol_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default =
    /*#__PURE__*/
    __webpack_require__.n(_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsCol_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
    /* unused harmony reexport * */

    /* unused harmony default export */


    var _unused_webpack_default_export = _AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_AppData_Roaming_npm_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vsCol_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a;
    /***/
  },

  /***/
  "f549":
  /***/
  function (module, exports, __webpack_require__) {
    var $export = __webpack_require__("048e");

    var fails = __webpack_require__("c213");

    var defined = __webpack_require__("50c4");

    var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)

    var createHTML = function (string, tag, attribute, value) {
      var S = String(defined(string));
      var p1 = '<' + tag;
      if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
      return p1 + '>' + S + '</' + tag + '>';
    };

    module.exports = function (NAME, exec) {
      var O = {};
      O[NAME] = exec(createHTML);
      $export($export.P + $export.F * fails(function () {
        var test = ''[NAME]('"');
        return test !== test.toLowerCase() || test.split('"').length > 3;
      }), 'String', O);
    };
    /***/

  },

  /***/
  "f80b":
  /***/
  function (module, exports, __webpack_require__) {
    // call something on iterator step with safe closing on error
    var anObject = __webpack_require__("3fa7");

    module.exports = function (iterator, fn, value, entries) {
      try {
        return entries ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
      } catch (e) {
        var ret = iterator['return'];
        if (ret !== undefined) anObject(ret.call(iterator));
        throw e;
      }
    };
    /***/

  },

  /***/
  "fa13":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var anObject = __webpack_require__("3fa7");

    var sameValue = __webpack_require__("b0e8");

    var regExpExec = __webpack_require__("c829"); // @@search logic


    __webpack_require__("b905")('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
      return [// `String.prototype.search` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[SEARCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      }, // `RegExp.prototype[@@search]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
      function (regexp) {
        var res = maybeCallNative($search, regexp, this);
        if (res.done) return res.value;
        var rx = anObject(regexp);
        var S = String(this);
        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regExpExec(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }];
    });
    /***/

  }
  /******/

});
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/vuesax/dist/vuesax.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/vue-wysiwyg/dist/vueWysiwyg.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define("vueWysiwyg", [], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.vueWysiwyg = t() : e.vueWysiwyg = t();
}("undefined" != typeof self ? self : this, function () {
  return function (e) {
    var t = {};

    function n(i) {
      if (t[i]) return t[i].exports;
      var o = t[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = e, n.c = t, n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, {
        configurable: !1,
        enumerable: !0,
        get: i
      });
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "/vue-wysiwyg/", n(n.s = 18);
  }([function (e, t, n) {
    "use strict";

    t.a = function (e, t, n, i, o, r, s, a) {
      var l = _typeof((e = e || {}).default);

      "object" !== l && "function" !== l || (e = e.default);
      var u,
          c = "function" == typeof e ? e.options : e;
      t && (c.render = t, c.staticRenderFns = n, c._compiled = !0);
      i && (c.functional = !0);
      r && (c._scopeId = r);
      s ? (u = function (e) {
        (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), o && o.call(this, e), e && e._registeredComponents && e._registeredComponents.add(s);
      }, c._ssrRegister = u) : o && (u = a ? function () {
        o.call(this, this.$root.$options.shadowRoot);
      } : o);
      if (u) if (c.functional) {
        c._injectStyles = u;
        var d = c.render;

        c.render = function (e, t) {
          return u.call(t), d(e, t);
        };
      } else {
        var p = c.beforeCreate;
        c.beforeCreate = p ? [].concat(p, u) : [u];
      }
      return {
        exports: e,
        options: c
      };
    };
  }, function (e, t, n) {
    "use strict";

    var i = new function () {
      var e = {
        listeners: {},
        on: function (t, n) {
          void 0 === e.listeners[t] && (e.listeners[t] = []), e.listeners[t].push(n);
        },
        emit: function (t) {
          for (var n = arguments.length, i = Array(1 < n ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];

          void 0 !== e.listeners[t] && e.listeners[t].forEach(function (e) {
            return e.apply(i);
          });
        }
      };
      return e;
    }();
    i.options = {
      image: {
        uploadURL: "None",
        dropzoneOptions: {}
      },
      hideModules: {},
      paragraphSeparator: "div",
      maxHeight: void 0,
      customModules: []
    }, i.utils = {
      getHTMLOfSelection: function () {
        if (void 0 !== window.getSelection) {
          var e = window.getSelection();

          if (0 < e.rangeCount) {
            var t = e.getRangeAt(0).cloneContents(),
                n = document.createElement("div");
            return n.appendChild(t), n.innerHTML;
          }
        }

        return "";
      }
    }, t.a = i;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = !0;
    var i,
        o = n(20),
        r = (i = o) && i.__esModule ? i : {
      default: i
    };

    t.default = r.default || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }

      return e;
    };
  }, function (e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n);
  }, function (e, t) {
    e.exports = function (e) {
      return "object" == _typeof(e) ? null !== e : "function" == typeof e;
    };
  }, function (e, t, n) {
    e.exports = !n(6)(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function () {
          return 7;
        }
      }).a;
    });
  }, function (e, t) {
    e.exports = function (e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  }, function (e, t) {
    var n = e.exports = {
      version: "2.5.3"
    };
    "number" == typeof __e && (__e = n);
  }, function (e, t, n) {
    var i = n(9),
        o = n(10);

    e.exports = function (e) {
      return i(o(e));
    };
  }, function (e, t, n) {
    var i = n(37);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
      return "String" == i(e) ? e.split("") : Object(e);
    };
  }, function (e, t) {
    e.exports = function (e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e;
    };
  }, function (e, t) {
    var n = Math.ceil,
        i = Math.floor;

    e.exports = function (e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? i : n)(e);
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(2),
        o = n.n(i),
        r = n(1),
        s = n(50),
        a = n.n(s),
        l = n(51),
        u = n(53),
        c = n.n(u),
        d = n(54),
        p = n.n(d),
        h = n(55),
        f = n.n(h),
        v = n(56),
        m = n.n(v),
        g = n(57),
        b = n.n(g),
        w = n(58),
        y = n.n(w),
        q = n(59),
        k = n(61),
        z = n(63),
        x = n.n(z),
        F = n(64),
        E = n.n(F),
        _ = n(65),
        C = n.n(_),
        S = n(66),
        L = n(72),
        M = n(75),
        T = n.n(M),
        A = n(76),
        O = n.n(A),
        D = [c.a, p.a, f.a, O.a, m.a, b.a, y.a, O.a, q.a, k.a, x.a, E.a, C.a, O.a, S.a, L.a, O.a, T.a];

    t.a = {
      model: {
        prop: "html",
        event: "html"
      },
      props: {
        html: {
          type: String,
          default: ""
        },
        placeholder: {
          type: String,
          default: "Enter text..."
        },
        options: Object
      },
      components: {
        Btn: l.a
      },
      data: function () {
        return {
          selection: ""
        };
      },
      computed: {
        mergedOptions: function () {
          return o()({}, r.a.options, this.options);
        },
        modules: function () {
          var e = this,
              t = this.mergedOptions.iconOverrides;
          return D.filter(function (t) {
            return void 0 === e.mergedOptions.hideModules || !e.mergedOptions.hideModules[t.title];
          }).map(function (e) {
            return void 0 !== t && void 0 !== t[e.title] && (e.icon = t[e.title]), e;
          }).concat(this.mergedOptions.customModules);
        },
        btnsWithDashboards: function () {
          return this.modules ? this.modules.filter(function (e) {
            return e.render;
          }) : [];
        },
        innerHTML: {
          get: function () {
            return this.$refs.content.innerHTML;
          },
          set: function (e) {
            this.$refs.content.innerHTML !== e && (this.$refs.content.innerHTML = e);
          }
        }
      },
      methods: {
        saveSelection: function () {
          if (void 0 !== window.getSelection) {
            if (this.selection = window.getSelection(), this.selection.getRangeAt && this.selection.rangeCount) return this.selection.getRangeAt(0);
          } else if (document.selection && document.selection.createRange) return document.selection.createRange();

          return null;
        },
        restoreSelection: function (e) {
          e && (void 0 === window.getSelection ? document.selection && e.select && e.select() : (this.selection = window.getSelection(), this.selection.removeAllRanges(), this.selection.addRange(e)));
        },
        clearSelection: function () {
          this.selection = null;
          var e = window.getSelection();
          e && (void 0 !== e.empty && e.empty(), void 0 !== e.removeAllRanges && e.removeAllRanges());
        },
        exec: function (e, t, n) {
          !1 !== n && this.selection && this.restoreSelection(this.selection), document.execCommand(e, !1, t || ""), this.clearSelection(), this.$nextTick(this.emit);
        },
        onDocumentClick: function (e) {
          for (var t, n = 0; n < this.btnsWithDashboards.length; n++) (t = this.$refs["btn-" + this.btnsWithDashboards[n].title][0]) && t.showDashboard && !t.$el.contains(e.target) && t.closeDashboard();
        },
        emit: function () {
          this.$emit("html", this.$refs.content.innerHTML), this.$emit("change", this.$refs.content.innerHTML);
        },
        onInput: a()(function () {
          this.emit();
        }, 300),
        onFocus: function () {
          document.execCommand("defaultParagraphSeparator", !1, this.mergedOptions.paragraphSeparator);
        },
        onContentBlur: function () {
          this.selection = this.saveSelection();
        },
        syncHTML: function () {
          this.html !== this.$refs.content.innerHTML && (this.innerHTML = this.html);
        }
      },
      mounted: function () {
        this.unwatch = this.$watch("html", this.syncHTML, {
          immediate: !0
        }), document.addEventListener("click", this.onDocumentClick), this.$refs.content.addEventListener("focus", this.onFocus), this.$refs.content.addEventListener("input", this.onInput), this.$refs.content.addEventListener("blur", this.onContentBlur, {
          capture: !0
        }), this.$refs.content.style.maxHeight = this.mergedOptions.maxHeight;
      },
      beforeDestroy: function () {
        this.unwatch(), document.removeEventListener("click", this.onDocumentClick), this.$refs.content.removeEventListener("blur", this.onContentBlur), this.$refs.content.removeEventListener("input", this.onInput), this.$refs.content.removeEventListener("focus", this.onFocus);
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(1);
    t.a = {
      props: ["module", "options"],
      data: function () {
        return {
          showDashboard: !1
        };
      },
      computed: {
        uid: function () {
          return this.$parent._uid;
        }
      },
      methods: {
        closeDashboard: function () {
          this.showDashboard = !1;
        },
        openDashboard: function () {
          this.showDashboard = !0;
        },
        exec: function () {
          this.$parent.exec.apply(null, arguments);
        },
        onBtnClick: function (e) {
          var t = this;
          if (e.preventDefault(), void 0 !== this.module.action) this.exec.apply(null, this.module.action);else if (void 0 !== this.module.customAction) this.module.customAction(i.a.utils).forEach(function (e) {
            return t.exec.apply(null, e);
          });else if (!(void 0 === this.module.render || this.$refs.dashboard && this.$refs.dashboard.contains(e.target))) return this.showDashboard = !this.showDashboard, void i.a.emit(this.uid + "_" + (this.showDashboard ? "show" : "hide") + "_dashboard_" + this.module.title);
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    t.a = {
      title: "headings",
      description: "Headings (h1-h6)",
      icon: '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1682 1664q-44 0-132.5-3.5t-133.5-3.5q-44 0-132 3.5t-132 3.5q-24 0-37-20.5t-13-45.5q0-31 17-46t39-17 51-7 45-15q33-21 33-140l-1-391q0-21-1-31-13-4-50-4h-675q-38 0-51 4-1 10-1 31l-1 371q0 142 37 164 16 10 48 13t57 3.5 45 15 20 45.5q0 26-12.5 48t-36.5 22q-47 0-139.5-3.5t-138.5-3.5q-43 0-128 3.5t-127 3.5q-23 0-35.5-21t-12.5-45q0-30 15.5-45t36-17.5 47.5-7.5 42-15q33-23 33-143l-1-57v-813q0-3 .5-26t0-36.5-1.5-38.5-3.5-42-6.5-36.5-11-31.5-16-18q-15-10-45-12t-53-2-41-14-18-45q0-26 12-48t36-22q46 0 138.5 3.5t138.5 3.5q42 0 126.5-3.5t126.5-3.5q25 0 37.5 22t12.5 48q0 30-17 43.5t-38.5 14.5-49.5 4-43 13q-35 21-35 160l1 320q0 21 1 32 13 3 39 3h699q25 0 38-3 1-11 1-32l1-320q0-139-35-160-18-11-58.5-12.5t-66-13-25.5-49.5q0-26 12.5-48t37.5-22q44 0 132 3.5t132 3.5q43 0 129-3.5t129-3.5q25 0 37.5 22t12.5 48q0 30-17.5 44t-40 14.5-51.5 3-44 12.5q-35 23-35 161l1 943q0 119 34 140 16 10 46 13.5t53.5 4.5 41.5 15.5 18 44.5q0 26-12 48t-36 22z"/></svg>',
      methods: {
        insertHeading: function (e) {
          this.$parent.closeDashboard(), this.$emit("exec", "formatBlock", e.target.textContent);
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(1);
    t.a = {
      title: "link",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"/></svg>',
      description: "Hyperlink",
      props: {
        uid: null
      },
      data: function () {
        return {
          url: "",
          title: ""
        };
      },
      methods: {
        insertLink: function () {
          this.$emit("exec", "insertHTML", "<a href='" + this.url + "'>" + this.title + "</a>"), this.$parent.closeDashboard(), this.url = "", this.title = "";
        }
      },
      created: function () {
        var e = this;
        i.a.on(this.uid + "_show_dashboard_link", function () {
          e.$nextTick(function () {
            e.$refs.url.focus();
          });
        });
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(2),
        o = n.n(i),
        r = n(67),
        s = n.n(r),
        a = (n(1), n(70));
    n.n(a);
    t.a = {
      title: "image",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M576 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"/></svg>',
      description: "Insert Image",
      props: ["options"],
      components: {
        Dropzone: s.a
      },
      computed: {
        uploadURL: function () {
          return this.options.image.uploadURL;
        },
        dropzoneOptions: function () {
          return o()({}, this.options.image.dropzoneOptions, {
            id: this._uid + "vwdropzone",
            url: this.uploadURL,
            autoProcessQueue: "None" !== this.uploadURL,
            dictDefaultMessage: '<i class="fa"><svg fill="#666" width="26" height="24" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1344 864q0-14-9-23l-352-352q-9-9-23-9t-23 9l-351 351q-10 12-10 24 0 14 9 23t23 9h224v352q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5v-352h224q13 0 22.5-9.5t9.5-22.5zm640 288q0 159-112.5 271.5t-271.5 112.5h-1088q-185 0-316.5-131.5t-131.5-316.5q0-130 70-240t188-165q-2-30-2-43 0-212 150-362t362-150q156 0 285.5 87t188.5 231q71-62 166-62 106 0 181 75t75 181q0 76-41 138 130 31 213.5 135.5t83.5 238.5z"/></svg></i><br>Click here to upload...'
          });
        }
      },
      methods: {
        fileUploaded: function (e, t) {
          t && this.$emit("exec", "insertHTML", "<img src=" + t + ">");
        },
        fileAdded: function (e) {
          var t = this;

          if (!e || "None" === this.uploadURL) {
            var n = new FileReader();
            n.addEventListener("load", function () {
              t.$emit("exec", "insertHTML", "<img src=" + n.result + ">");
            }, !1), n.readAsDataURL(e);
          }
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    t.a = {
      title: "table",
      description: "Insert Table",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"/></svg>',
      data: function () {
        return {
          rows: 2,
          cols: 2
        };
      },
      methods: {
        insertTable: function () {
          var e = ("<tr>" + "<td></td>".repeat(this.cols) + "</tr>").repeat(this.rows);
          this.$emit("exec", "insertHTML", "<table><tbody>" + e + "</tbody></table>"), this.$parent.closeDashboard();
        }
      }
    };
  }, function (e, t, n) {
    e.exports = n(19);
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(2),
        o = n.n(i),
        r = n(48),
        s = n(1);
    t.default = {
      install: function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        s.a.options = o()({}, s.a.options, t), e.component("wysiwyg", r.a);
      },
      component: r.a
    };
  }, function (e, t, n) {
    e.exports = {
      default: n(21),
      __esModule: !0
    };
  }, function (e, t, n) {
    n(22), e.exports = n(7).Object.assign;
  }, function (e, t, n) {
    var i = n(23);
    i(i.S + i.F, "Object", {
      assign: n(33)
    });
  }, function (e, t, n) {
    var i = n(3),
        o = n(7),
        r = n(24),
        s = n(26),
        a = function (e, t, n) {
      var l,
          u,
          c,
          d = e & a.F,
          p = e & a.G,
          h = e & a.S,
          f = e & a.P,
          v = e & a.B,
          m = e & a.W,
          g = p ? o : o[t] || (o[t] = {}),
          b = g.prototype,
          w = p ? i : h ? i[t] : (i[t] || {}).prototype;

      for (l in p && (n = t), n) (u = !d && w && void 0 !== w[l]) && l in g || (c = u ? w[l] : n[l], g[l] = p && "function" != typeof w[l] ? n[l] : v && u ? r(c, i) : m && w[l] == c ? function (e) {
        var t = function (t, n, i) {
          if (this instanceof e) {
            switch (arguments.length) {
              case 0:
                return new e();

              case 1:
                return new e(t);

              case 2:
                return new e(t, n);
            }

            return new e(t, n, i);
          }

          return e.apply(this, arguments);
        };

        return t.prototype = e.prototype, t;
      }(c) : f && "function" == typeof c ? r(Function.call, c) : c, f && ((g.virtual || (g.virtual = {}))[l] = c, e & a.R && b && !b[l] && s(b, l, c)));
    };

    a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, e.exports = a;
  }, function (e, t, n) {
    var i = n(25);

    e.exports = function (e, t, n) {
      if (i(e), void 0 === t) return e;

      switch (n) {
        case 1:
          return function (n) {
            return e.call(t, n);
          };

        case 2:
          return function (n, i) {
            return e.call(t, n, i);
          };

        case 3:
          return function (n, i, o) {
            return e.call(t, n, i, o);
          };
      }

      return function () {
        return e.apply(t, arguments);
      };
    };
  }, function (e, t) {
    e.exports = function (e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e;
    };
  }, function (e, t, n) {
    var i = n(27),
        o = n(32);
    e.exports = n(5) ? function (e, t, n) {
      return i.f(e, t, o(1, n));
    } : function (e, t, n) {
      return e[t] = n, e;
    };
  }, function (e, t, n) {
    var i = n(28),
        o = n(29),
        r = n(31),
        s = Object.defineProperty;
    t.f = n(5) ? Object.defineProperty : function (e, t, n) {
      if (i(e), t = r(t, !0), i(n), o) try {
        return s(e, t, n);
      } catch (e) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
      return "value" in n && (e[t] = n.value), e;
    };
  }, function (e, t, n) {
    var i = n(4);

    e.exports = function (e) {
      if (!i(e)) throw TypeError(e + " is not an object!");
      return e;
    };
  }, function (e, t, n) {
    e.exports = !n(5) && !n(6)(function () {
      return 7 != Object.defineProperty(n(30)("div"), "a", {
        get: function () {
          return 7;
        }
      }).a;
    });
  }, function (e, t, n) {
    var i = n(4),
        o = n(3).document,
        r = i(o) && i(o.createElement);

    e.exports = function (e) {
      return r ? o.createElement(e) : {};
    };
  }, function (e, t, n) {
    var i = n(4);

    e.exports = function (e, t) {
      if (!i(e)) return e;
      var n, o;
      if (t && "function" == typeof (n = e.toString) && !i(o = n.call(e))) return o;
      if ("function" == typeof (n = e.valueOf) && !i(o = n.call(e))) return o;
      if (!t && "function" == typeof (n = e.toString) && !i(o = n.call(e))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function (e, t) {
    e.exports = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      };
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(34),
        o = n(45),
        r = n(46),
        s = n(47),
        a = n(9),
        l = Object.assign;
    e.exports = !l || n(6)(function () {
      var e = {},
          t = {},
          n = Symbol(),
          i = "abcdefghijklmnopqrst";
      return e[n] = 7, i.split("").forEach(function (e) {
        t[e] = e;
      }), 7 != l({}, e)[n] || Object.keys(l({}, t)).join("") != i;
    }) ? function (e, t) {
      for (var n = s(e), l = arguments.length, u = 1, c = o.f, d = r.f; l > u;) for (var p, h = a(arguments[u++]), f = c ? i(h).concat(c(h)) : i(h), v = f.length, m = 0; v > m;) d.call(h, p = f[m++]) && (n[p] = h[p]);

      return n;
    } : l;
  }, function (e, t, n) {
    var i = n(35),
        o = n(44);

    e.exports = Object.keys || function (e) {
      return i(e, o);
    };
  }, function (e, t, n) {
    var i = n(36),
        o = n(8),
        r = n(38)(!1),
        s = n(41)("IE_PROTO");

    e.exports = function (e, t) {
      var n,
          a = o(e),
          l = 0,
          u = [];

      for (n in a) n != s && i(a, n) && u.push(n);

      for (; t.length > l;) i(a, n = t[l++]) && (~r(u, n) || u.push(n));

      return u;
    };
  }, function (e, t) {
    var n = {}.hasOwnProperty;

    e.exports = function (e, t) {
      return n.call(e, t);
    };
  }, function (e, t) {
    var n = {}.toString;

    e.exports = function (e) {
      return n.call(e).slice(8, -1);
    };
  }, function (e, t, n) {
    var i = n(8),
        o = n(39),
        r = n(40);

    e.exports = function (e) {
      return function (t, n, s) {
        var a,
            l = i(t),
            u = o(l.length),
            c = r(s, u);

        if (e && n != n) {
          for (; u > c;) if ((a = l[c++]) != a) return !0;
        } else for (; u > c; c++) if ((e || c in l) && l[c] === n) return e || c || 0;

        return !e && -1;
      };
    };
  }, function (e, t, n) {
    var i = n(11),
        o = Math.min;

    e.exports = function (e) {
      return e > 0 ? o(i(e), 9007199254740991) : 0;
    };
  }, function (e, t, n) {
    var i = n(11),
        o = Math.max,
        r = Math.min;

    e.exports = function (e, t) {
      return (e = i(e)) < 0 ? o(e + t, 0) : r(e, t);
    };
  }, function (e, t, n) {
    var i = n(42)("keys"),
        o = n(43);

    e.exports = function (e) {
      return i[e] || (i[e] = o(e));
    };
  }, function (e, t, n) {
    var i = n(3),
        o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});

    e.exports = function (e) {
      return o[e] || (o[e] = {});
    };
  }, function (e, t) {
    var n = 0,
        i = Math.random();

    e.exports = function (e) {
      return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + i).toString(36));
    };
  }, function (e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (e, t) {
    t.f = Object.getOwnPropertySymbols;
  }, function (e, t) {
    t.f = {}.propertyIsEnumerable;
  }, function (e, t, n) {
    var i = n(10);

    e.exports = function (e) {
      return Object(i(e));
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(12),
        o = n(77),
        r = n(0);

    var s = function (e) {
      n(49);
    },
        a = Object(r.a)(i.a, o.a, o.b, !1, s, null, null);

    t.a = a.exports;
  }, function (e, t) {}, function (e, t) {
    e.exports = function (e, t, n) {
      var i, o, r, s, a;

      function l() {
        var u = Date.now() - s;
        u < t && u >= 0 ? i = setTimeout(l, t - u) : (i = null, n || (a = e.apply(r, o), r = o = null));
      }

      null == t && (t = 100);

      var u = function () {
        r = this, o = arguments, s = Date.now();
        var u = n && !i;
        return i || (i = setTimeout(l, t)), u && (a = e.apply(r, o), r = o = null), a;
      };

      return u.clear = function () {
        i && (clearTimeout(i), i = null);
      }, u.flush = function () {
        i && (a = e.apply(r, o), r = o = null, clearTimeout(i), i = null);
      }, u;
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(13),
        o = n(52),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        on: {
          mousedown: e.onBtnClick
        }
      }, [n("a", {
        class: "vw-btn-" + e.module.title,
        domProps: {
          innerHTML: e._s(e.module.icon)
        }
      }), n("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showDashboard,
          expression: "showDashboard"
        }],
        ref: "dashboard",
        staticClass: "dashboard"
      }, [e.module.render ? e._m(0) : e._e()], 1)]);
    },
        o = [function () {
      var e = this.$createElement;
      return (this._self._c || e)(this.module, {
        ref: "moduleDashboard",
        tag: "component",
        attrs: {
          uid: this.uid,
          options: this.options
        },
        on: {
          exec: this.exec
        }
      });
    }];
  }, function (e, t) {
    e.exports = {
      title: "bold",
      action: ["bold"],
      description: "Bold",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M747 1521q74 32 140 32 376 0 376-335 0-114-41-180-27-44-61.5-74t-67.5-46.5-80.5-25-84-10.5-94.5-2q-73 0-101 10 0 53-.5 159t-.5 158q0 8-1 67.5t-.5 96.5 4.5 83.5 12 66.5zm-14-746q42 7 109 7 82 0 143-13t110-44.5 74.5-89.5 25.5-142q0-70-29-122.5t-79-82-108-43.5-124-14q-50 0-130 13 0 50 4 151t4 152q0 27-.5 80t-.5 79q0 46 1 69zm-541 889l2-94q15-4 85-16t106-27q7-12 12.5-27t8.5-33.5 5.5-32.5 3-37.5.5-34v-65.5q0-982-22-1025-4-8-22-14.5t-44.5-11-49.5-7-48.5-4.5-30.5-3l-4-83q98-2 340-11.5t373-9.5q23 0 68.5.5t67.5.5q70 0 136.5 13t128.5 42 108 71 74 104.5 28 137.5q0 52-16.5 95.5t-39 72-64.5 57.5-73 45-84 40q154 35 256.5 134t102.5 248q0 100-35 179.5t-93.5 130.5-138 85.5-163.5 48.5-176 14q-44 0-132-3t-132-3q-106 0-307 11t-231 12z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "italic",
      description: "Italic",
      action: ["italic"],
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M384 1662l17-85q6-2 81.5-21.5t111.5-37.5q28-35 41-101 1-7 62-289t114-543.5 52-296.5v-25q-24-13-54.5-18.5t-69.5-8-58-5.5l19-103q33 2 120 6.5t149.5 7 120.5 2.5q48 0 98.5-2.5t121-7 98.5-6.5q-5 39-19 89-30 10-101.5 28.5t-108.5 33.5q-8 19-14 42.5t-9 40-7.5 45.5-6.5 42q-27 148-87.5 419.5t-77.5 355.5q-2 9-13 58t-20 90-16 83.5-6 57.5l1 18q17 4 185 31-3 44-16 99-11 0-32.5 1.5t-32.5 1.5q-29 0-87-10t-86-10q-138-2-206-2-51 0-143 9t-121 11z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "underline",
      action: ["underline"],
      description: "Underline",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M176 223q-37-2-45-4l-3-88q13-1 40-1 60 0 112 4 132 7 166 7 86 0 168-3 116-4 146-5 56 0 86-2l-1 14 2 64v9q-60 9-124 9-60 0-79 25-13 14-13 132 0 13 .5 32.5t.5 25.5l1 229 14 280q6 124 51 202 35 59 96 92 88 47 177 47 104 0 191-28 56-18 99-51 48-36 65-64 36-56 53-114 21-73 21-229 0-79-3.5-128t-11-122.5-13.5-159.5l-4-59q-5-67-24-88-34-35-77-34l-100 2-14-3 2-86h84l205 10q76 3 196-10l18 2q6 38 6 51 0 7-4 31-45 12-84 13-73 11-79 17-15 15-15 41 0 7 1.5 27t1.5 31q8 19 22 396 6 195-15 304-15 76-41 122-38 65-112 123-75 57-182 89-109 33-255 33-167 0-284-46-119-47-179-122-61-76-83-195-16-80-16-237v-333q0-188-17-213-25-36-147-39zm1488 1409v-64q0-14-9-23t-23-9h-1472q-14 0-23 9t-9 23v64q0 14 9 23t23 9h1472q14 0 23-9t9-23z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "justifyLeft",
      action: ["justifyLeft"],
      description: "Justify Left",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "justifyCenter",
      action: ["justifyCenter"],
      description: "Center",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h896q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-640q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h640q26 0 45 19t19 45z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "justifyRight",
      action: ["justifyRight"],
      description: "Justify Right",
      icon: '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z"/></svg>'
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(14),
        o = n(60),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", [n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H1")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H2")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H3")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H4")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H5")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H6")])]);
    },
        o = [];
  }, function (e, t, n) {
    "use strict";

    var i = n(15),
        o = n(62),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("form", {
        on: {
          submit: function (t) {
            t.preventDefault(), e.insertLink(t);
          }
        }
      }, [n("label", [e._v("\n        URL\n        "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.url,
          expression: "url"
        }],
        ref: "url",
        staticStyle: {
          width: "40%"
        },
        attrs: {
          type: "text"
        },
        domProps: {
          value: e.url
        },
        on: {
          input: function (t) {
            t.target.composing || (e.url = t.target.value);
          }
        }
      })]), e._v(" "), n("label", [e._v("\n        Link Title\n        "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.title,
          expression: "title"
        }],
        staticStyle: {
          width: "40%"
        },
        attrs: {
          type: "text"
        },
        domProps: {
          value: e.title
        },
        on: {
          input: function (t) {
            t.target.composing || (e.title = t.target.value);
          }
        }
      })]), e._v(" "), n("button", {
        attrs: {
          type: "submit"
        }
      }, [e._v("Insert")])]);
    },
        o = [];
  }, function (e, t) {
    e.exports = {
      title: "code",
      icon: '<svg height="1792" viewBox="0 0 1792 1792" width="1792" xmlns="http://www.w3.org/2000/svg"><path d="M553 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z"/></svg>',
      description: "Code",
      action: ["formatBlock", "pre"]
    };
  }, function (e, t) {
    e.exports = {
      title: "orderedList",
      action: ["insertOrderedList"],
      description: "Ordered List (1, 2, 3)",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M381 1620q0 80-54.5 126t-135.5 46q-106 0-172-66l57-88q49 45 106 45 29 0 50.5-14.5t21.5-42.5q0-64-105-56l-26-56q8-10 32.5-43.5t42.5-54 37-38.5v-1q-16 0-48.5 1t-48.5 1v53h-106v-152h333v88l-95 115q51 12 81 49t30 88zm2-627v159h-362q-6-36-6-54 0-51 23.5-93t56.5-68 66-47.5 56.5-43.5 23.5-45q0-25-14.5-38.5t-39.5-13.5q-46 0-81 58l-85-59q24-51 71.5-79.5t105.5-28.5q73 0 123 41.5t50 112.5q0 50-34 91.5t-75 64.5-75.5 50.5-35.5 52.5h127v-60h105zm1409 319v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm-1408-899v99h-335v-99h107q0-41 .5-122t.5-121v-12h-2q-8 17-50 54l-71-76 136-127h106v404h108zm1408 387v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "unorderedList",
      action: ["insertUnorderedList"],
      description: "Bullet List",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"/></svg>'
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(16),
        o = n(71),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    var i;
    i = function () {
      "use strict";

      var e = {
        getSignedURL: function (e, t) {
          var n = {
            filePath: e.name,
            contentType: e.type
          };
          return new Promise(function (i, o) {
            var r = new FormData(),
                s = new XMLHttpRequest(),
                a = "function" == typeof t.signingURL ? t.signingURL(e) : t.signingURL;
            s.open("POST", a), s.onload = function () {
              200 == s.status ? i(JSON.parse(s.response)) : o(s.statusText);
            }, s.onerror = function (e) {
              console.error("Network Error : Could not send request to AWS (Maybe CORS errors)"), o(e);
            }, Object.entries(t.headers || {}).forEach(function (e) {
              var t = e[0],
                  n = e[1];
              s.setRequestHeader(t, n);
            }), n = Object.assign(n, t.params || {}), Object.entries(n).forEach(function (e) {
              var t = e[0],
                  n = e[1];
              r.append(t, n);
            }), s.send(r);
          });
        },
        sendFile: function (e, t) {
          var n = new FormData();
          return this.getSignedURL(e, t).then(function (t) {
            var i = t.signature;
            return Object.keys(i).forEach(function (e) {
              n.append(e, i[e]);
            }), n.append("file", e), new Promise(function (e, i) {
              var o = new XMLHttpRequest();
              o.open("POST", t.postEndpoint), o.onload = function () {
                if (201 == o.status) {
                  var t = new window.DOMParser().parseFromString(o.response, "text/xml").firstChild.children[0].innerHTML;
                  e({
                    success: !0,
                    message: t
                  });
                } else {
                  var n = new window.DOMParser().parseFromString(o.response, "text/xml").firstChild.children[0].innerHTML;
                  i({
                    success: !1,
                    message: n + ". Request is marked as resolved when returns as status 201"
                  });
                }
              }, o.onerror = function (e) {
                var t = new window.DOMParser().parseFromString(o.response, "text/xml").firstChild.children[1].innerHTML;
                i({
                  success: !1,
                  message: t
                });
              }, o.send(n);
            });
          }).catch(function (e) {
            return e;
          });
        }
      };
      return {
        render: function () {
          var e = this,
              t = e.$createElement;
          return (e._self._c || t)("div", {
            ref: "dropzoneElement",
            class: {
              "vue-dropzone dropzone": e.includeStyling
            },
            attrs: {
              id: e.id
            }
          });
        },
        staticRenderFns: [],
        props: {
          id: {
            type: String,
            required: !0
          },
          options: {
            type: Object,
            required: !0
          },
          includeStyling: {
            type: Boolean,
            default: !0,
            required: !1
          },
          awss3: {
            type: Object,
            required: !1,
            default: null
          },
          destroyDropzone: {
            type: Boolean,
            default: !0,
            required: !1
          }
        },
        data: function () {
          return {
            isS3: !1,
            wasQueueAutoProcess: !0
          };
        },
        computed: {
          dropzoneSettings: function () {
            var e = {
              thumbnailWidth: 200,
              thumbnailHeight: 200
            };
            return Object.keys(this.options).forEach(function (t) {
              e[t] = this.options[t];
            }, this), null !== this.awss3 && (e.autoProcessQueue = !1, this.isS3 = !0, void 0 !== this.options.autoProcessQueue && (this.wasQueueAutoProcess = this.options.autoProcessQueue)), e;
          }
        },
        methods: {
          manuallyAddFile: function (e, t) {
            e.manuallyAdded = !0, this.dropzone.emit("addedfile", e), t && this.dropzone.emit("thumbnail", e, t);

            for (var n = e.previewElement.querySelectorAll("[data-dz-thumbnail]"), i = 0; i < n.length; i++) n[i].style.width = this.dropzoneSettings.thumbnailWidth + "px", n[i].style.height = this.dropzoneSettings.thumbnailHeight + "px", n[i].style["object-fit"] = "contain";

            this.dropzone.emit("complete", e), this.dropzone.options.maxFiles && this.dropzone.options.maxFiles--, this.dropzone.files.push(e), this.$emit("vdropzone-file-added-manually", e);
          },
          setOption: function (e, t) {
            this.dropzone.options[e] = t;
          },
          removeAllFiles: function (e) {
            this.dropzone.removeAllFiles(e);
          },
          processQueue: function () {
            var e = this,
                t = this.dropzone;
            this.isS3 && !this.wasQueueAutoProcess ? this.getQueuedFiles().forEach(function (t) {
              e.getSignedAndUploadToS3(t);
            }) : this.dropzone.processQueue(), this.dropzone.on("success", function () {
              t.options.autoProcessQueue = !0;
            }), this.dropzone.on("queuecomplete", function () {
              t.options.autoProcessQueue = !1;
            });
          },
          init: function () {
            return this.dropzone.init();
          },
          destroy: function () {
            return this.dropzone.destroy();
          },
          updateTotalUploadProgress: function () {
            return this.dropzone.updateTotalUploadProgress();
          },
          getFallbackForm: function () {
            return this.dropzone.getFallbackForm();
          },
          getExistingFallback: function () {
            return this.dropzone.getExistingFallback();
          },
          setupEventListeners: function () {
            return this.dropzone.setupEventListeners();
          },
          removeEventListeners: function () {
            return this.dropzone.removeEventListeners();
          },
          disable: function () {
            return this.dropzone.disable();
          },
          enable: function () {
            return this.dropzone.enable();
          },
          filesize: function (e) {
            return this.dropzone.filesize(e);
          },
          accept: function (e, t) {
            return this.dropzone.accept(e, t);
          },
          addFile: function (e) {
            return this.dropzone.addFile(e);
          },
          removeFile: function (e) {
            this.dropzone.removeFile(e);
          },
          getAcceptedFiles: function () {
            return this.dropzone.getAcceptedFiles();
          },
          getRejectedFiles: function () {
            return this.dropzone.getRejectedFiles();
          },
          getFilesWithStatus: function () {
            return this.dropzone.getFilesWithStatus();
          },
          getQueuedFiles: function () {
            return this.dropzone.getQueuedFiles();
          },
          getUploadingFiles: function () {
            return this.dropzone.getUploadingFiles();
          },
          getAddedFiles: function () {
            return this.dropzone.getAddedFiles();
          },
          getActiveFiles: function () {
            return this.dropzone.getActiveFiles();
          },
          getSignedAndUploadToS3: function (t) {
            var n = this;
            e.sendFile(t, this.awss3).then(function (e) {
              e.success ? (t.s3ObjectLocation = e.message, setTimeout(function () {
                return n.dropzone.processFile(t);
              }), n.$emit("vdropzone-s3-upload-success", e.message)) : "undefined" != typeof message ? n.$emit("vdropzone-s3-upload-error", e.message) : n.$emit("vdropzone-s3-upload-error", "Network Error : Could not send request to AWS. (Maybe CORS error)");
            }).catch(function (e) {
              alert(e);
            });
          },
          setAWSSigningURL: function (e) {
            this.isS3 && (this.awss3.signingURL = e);
          }
        },
        mounted: function () {
          if (!this.$isServer || !this.hasBeenMounted) {
            this.hasBeenMounted = !0;
            var e = n(68);
            e.autoDiscover = !1, this.dropzone = new e(this.$refs.dropzoneElement, this.dropzoneSettings);
            var t = this;
            this.dropzone.on("thumbnail", function (e, n) {
              t.$emit("vdropzone-thumbnail", e, n);
            }), this.dropzone.on("addedfile", function (e) {
              t.duplicateCheck && this.files.length && this.files.forEach(function (n) {
                n.name === e.name && (this.removeFile(e), t.$emit("duplicate-file", e));
              }, this), t.$emit("vdropzone-file-added", e), t.isS3 && t.wasQueueAutoProcess && t.getSignedAndUploadToS3(e);
            }), this.dropzone.on("addedfiles", function (e) {
              t.$emit("vdropzone-files-added", e);
            }), this.dropzone.on("removedfile", function (e) {
              t.$emit("vdropzone-removed-file", e), e.manuallyAdded && t.dropzone.options.maxFiles++;
            }), this.dropzone.on("success", function (e, n) {
              t.$emit("vdropzone-success", e, n), t.isS3 && t.wasQueueAutoProcess && t.setOption("autoProcessQueue", !1);
            }), this.dropzone.on("successmultiple", function (e, n) {
              t.$emit("vdropzone-success-multiple", e, n);
            }), this.dropzone.on("error", function (e, n, i) {
              t.$emit("vdropzone-error", e, n, i);
            }), this.dropzone.on("errormultiple", function (e, n, i) {
              t.$emit("vdropzone-error-multiple", e, n, i);
            }), this.dropzone.on("sending", function (e, n, i) {
              t.isS3 && i.append("s3ObjectLocation", e.s3ObjectLocation), t.$emit("vdropzone-sending", e, n, i);
            }), this.dropzone.on("sendingmultiple", function (e, n, i) {
              t.$emit("vdropzone-sending-multiple", e, n, i);
            }), this.dropzone.on("complete", function (e) {
              t.$emit("vdropzone-complete", e);
            }), this.dropzone.on("completemultiple", function (e) {
              t.$emit("vdropzone-complete-multiple", e);
            }), this.dropzone.on("canceled", function (e) {
              t.$emit("vdropzone-canceled", e);
            }), this.dropzone.on("canceledmultiple", function (e) {
              t.$emit("vdropzone-canceled-multiple", e);
            }), this.dropzone.on("maxfilesreached", function (e) {
              t.$emit("vdropzone-max-files-reached", e);
            }), this.dropzone.on("maxfilesexceeded", function (e) {
              t.$emit("vdropzone-max-files-exceeded", e);
            }), this.dropzone.on("processing", function (e) {
              t.$emit("vdropzone-processing", e);
            }), this.dropzone.on("processing", function (e) {
              t.$emit("vdropzone-processing", e);
            }), this.dropzone.on("processingmultiple", function (e) {
              t.$emit("vdropzone-processing-multiple", e);
            }), this.dropzone.on("uploadprogress", function (e, n, i) {
              t.$emit("vdropzone-upload-progress", e, n, i);
            }), this.dropzone.on("totaluploadprogress", function (e, n, i) {
              t.$emit("vdropzone-total-upload-progress", e, n, i);
            }), this.dropzone.on("reset", function () {
              t.$emit("vdropzone-reset");
            }), this.dropzone.on("queuecomplete", function () {
              t.$emit("vdropzone-queue-complete");
            }), this.dropzone.on("drop", function (e) {
              t.$emit("vdropzone-drop", e);
            }), this.dropzone.on("dragstart", function (e) {
              t.$emit("vdropzone-drag-start", e);
            }), this.dropzone.on("dragend", function (e) {
              t.$emit("vdropzone-drag-end", e);
            }), this.dropzone.on("dragenter", function (e) {
              t.$emit("vdropzone-drag-enter", e);
            }), this.dropzone.on("dragover", function (e) {
              t.$emit("vdropzone-drag-over", e);
            }), this.dropzone.on("dragleave", function (e) {
              t.$emit("vdropzone-drag-leave", e);
            }), t.$emit("vdropzone-mounted");
          }
        },
        beforeDestroy: function () {
          this.destroyDropzone && this.dropzone.destroy();
        }
      };
    }, e.exports = i();
  }, function (e, t, n) {
    "use strict";

    (function (e) {
      var t = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
          }
        }

        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      }();

      function n(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
      }

      function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }

      var o = function () {
        function e() {
          i(this, e);
        }

        return t(e, [{
          key: "on",
          value: function (e, t) {
            return this._callbacks = this._callbacks || {}, this._callbacks[e] || (this._callbacks[e] = []), this._callbacks[e].push(t), this;
          }
        }, {
          key: "emit",
          value: function (e) {
            this._callbacks = this._callbacks || {};
            var t = this._callbacks[e];

            if (t) {
              for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];

              for (var r = 0, s = s = t;;) {
                if (r >= s.length) break;
                s[r++].apply(this, i);
              }
            }

            return this;
          }
        }, {
          key: "off",
          value: function (e, t) {
            if (!this._callbacks || 0 === arguments.length) return this._callbacks = {}, this;
            var n = this._callbacks[e];
            if (!n) return this;
            if (1 === arguments.length) return delete this._callbacks[e], this;

            for (var i = 0; i < n.length; i++) {
              if (n[i] === t) {
                n.splice(i, 1);
                break;
              }
            }

            return this;
          }
        }]), e;
      }(),
          r = function (e) {
        function r(e, t) {
          i(this, r);
          var o,
              s = n(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this)),
              a = void 0;
          if (s.element = e, s.version = r.version, s.defaultOptions.previewTemplate = s.defaultOptions.previewTemplate.replace(/\n*/g, ""), s.clickableElements = [], s.listeners = [], s.files = [], "string" == typeof s.element && (s.element = document.querySelector(s.element)), !s.element || null == s.element.nodeType) throw new Error("Invalid dropzone element.");
          if (s.element.dropzone) throw new Error("Dropzone already attached.");
          r.instances.push(s), s.element.dropzone = s;
          var l,
              u = null != (o = r.optionsForElement(s.element)) ? o : {};
          if (s.options = r.extend({}, s.defaultOptions, u, null != t ? t : {}), s.options.forceFallback || !r.isBrowserSupported()) return l = s.options.fallback.call(s), n(s, l);
          if (null == s.options.url && (s.options.url = s.element.getAttribute("action")), !s.options.url) throw new Error("No URL provided.");
          if (s.options.acceptedFiles && s.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
          if (s.options.uploadMultiple && s.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
          return s.options.acceptedMimeTypes && (s.options.acceptedFiles = s.options.acceptedMimeTypes, delete s.options.acceptedMimeTypes), null != s.options.renameFilename && (s.options.renameFile = function (e) {
            return s.options.renameFilename.call(s, e.name, e);
          }), s.options.method = s.options.method.toUpperCase(), (a = s.getExistingFallback()) && a.parentNode && a.parentNode.removeChild(a), !1 !== s.options.previewsContainer && (s.options.previewsContainer ? s.previewsContainer = r.getElement(s.options.previewsContainer, "previewsContainer") : s.previewsContainer = s.element), s.options.clickable && (!0 === s.options.clickable ? s.clickableElements = [s.element] : s.clickableElements = r.getElements(s.options.clickable, "clickable")), s.init(), s;
        }

        return function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
        }(r, o), t(r, null, [{
          key: "initClass",
          value: function () {
            this.prototype.Emitter = o, this.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"], this.prototype.defaultOptions = {
              url: null,
              method: "post",
              withCredentials: !1,
              timeout: 3e4,
              parallelUploads: 2,
              uploadMultiple: !1,
              chunking: !1,
              forceChunking: !1,
              chunkSize: 2e6,
              parallelChunkUploads: !1,
              retryChunks: !1,
              retryChunksLimit: 3,
              maxFilesize: 256,
              paramName: "file",
              createImageThumbnails: !0,
              maxThumbnailFilesize: 10,
              thumbnailWidth: 120,
              thumbnailHeight: 120,
              thumbnailMethod: "crop",
              resizeWidth: null,
              resizeHeight: null,
              resizeMimeType: null,
              resizeQuality: .8,
              resizeMethod: "contain",
              filesizeBase: 1e3,
              maxFiles: null,
              headers: null,
              clickable: !0,
              ignoreHiddenFiles: !0,
              acceptedFiles: null,
              acceptedMimeTypes: null,
              autoProcessQueue: !0,
              autoQueue: !0,
              addRemoveLinks: !1,
              previewsContainer: null,
              hiddenInputContainer: "body",
              capture: null,
              renameFilename: null,
              renameFile: null,
              forceFallback: !1,
              dictDefaultMessage: "Drop files here to upload",
              dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
              dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
              dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
              dictInvalidFileType: "You can't upload files of this type.",
              dictResponseError: "Server responded with {{statusCode}} code.",
              dictCancelUpload: "Cancel upload",
              dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
              dictRemoveFile: "Remove file",
              dictRemoveFileConfirmation: null,
              dictMaxFilesExceeded: "You can not upload any more files.",
              dictFileSizeUnits: {
                tb: "TB",
                gb: "GB",
                mb: "MB",
                kb: "KB",
                b: "b"
              },
              init: function () {},
              params: function (e, t, n) {
                if (n) return {
                  dzuuid: n.file.upload.uuid,
                  dzchunkindex: n.index,
                  dztotalfilesize: n.file.size,
                  dzchunksize: this.options.chunkSize,
                  dztotalchunkcount: n.file.upload.totalChunkCount,
                  dzchunkbyteoffset: n.index * this.options.chunkSize
                };
              },
              accept: function (e, t) {
                return t();
              },
              chunksUploaded: function (e, t) {
                t();
              },
              fallback: function () {
                var e = void 0;
                this.element.className = this.element.className + " dz-browser-not-supported";

                for (var t = 0, n = n = this.element.getElementsByTagName("div");;) {
                  if (t >= n.length) break;
                  var i = n[t++];

                  if (/(^| )dz-message($| )/.test(i.className)) {
                    e = i, i.className = "dz-message";
                    break;
                  }
                }

                e || (e = r.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(e));
                var o = e.getElementsByTagName("span")[0];
                return o && (null != o.textContent ? o.textContent = this.options.dictFallbackMessage : null != o.innerText && (o.innerText = this.options.dictFallbackMessage)), this.element.appendChild(this.getFallbackForm());
              },
              resize: function (e, t, n, i) {
                var o = {
                  srcX: 0,
                  srcY: 0,
                  srcWidth: e.width,
                  srcHeight: e.height
                },
                    r = e.width / e.height;
                null == t && null == n ? (t = o.srcWidth, n = o.srcHeight) : null == t ? t = n * r : null == n && (n = t / r);
                var s = (t = Math.min(t, o.srcWidth)) / (n = Math.min(n, o.srcHeight));
                if (o.srcWidth > t || o.srcHeight > n) if ("crop" === i) r > s ? (o.srcHeight = e.height, o.srcWidth = o.srcHeight * s) : (o.srcWidth = e.width, o.srcHeight = o.srcWidth / s);else {
                  if ("contain" !== i) throw new Error("Unknown resizeMethod '" + i + "'");
                  r > s ? n = t / r : t = n * r;
                }
                return o.srcX = (e.width - o.srcWidth) / 2, o.srcY = (e.height - o.srcHeight) / 2, o.trgWidth = t, o.trgHeight = n, o;
              },
              transformFile: function (e, t) {
                return (this.options.resizeWidth || this.options.resizeHeight) && e.type.match(/image.*/) ? this.resizeImage(e, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, t) : t(e);
              },
              previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',
              drop: function (e) {
                return this.element.classList.remove("dz-drag-hover");
              },
              dragstart: function (e) {},
              dragend: function (e) {
                return this.element.classList.remove("dz-drag-hover");
              },
              dragenter: function (e) {
                return this.element.classList.add("dz-drag-hover");
              },
              dragover: function (e) {
                return this.element.classList.add("dz-drag-hover");
              },
              dragleave: function (e) {
                return this.element.classList.remove("dz-drag-hover");
              },
              paste: function (e) {},
              reset: function () {
                return this.element.classList.remove("dz-started");
              },
              addedfile: function (e) {
                var t = this;

                if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
                  e.previewElement = r.createElement(this.options.previewTemplate.trim()), e.previewTemplate = e.previewElement, this.previewsContainer.appendChild(e.previewElement);

                  for (var n = 0, i = i = e.previewElement.querySelectorAll("[data-dz-name]");;) {
                    if (n >= i.length) break;
                    var o = i[n++];
                    o.textContent = e.name;
                  }

                  for (var s = 0, a = a = e.previewElement.querySelectorAll("[data-dz-size]"); !(s >= a.length);) (o = a[s++]).innerHTML = this.filesize(e.size);

                  this.options.addRemoveLinks && (e._removeLink = r.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), e.previewElement.appendChild(e._removeLink));

                  for (var l = function (n) {
                    return n.preventDefault(), n.stopPropagation(), e.status === r.UPLOADING ? r.confirm(t.options.dictCancelUploadConfirmation, function () {
                      return t.removeFile(e);
                    }) : t.options.dictRemoveFileConfirmation ? r.confirm(t.options.dictRemoveFileConfirmation, function () {
                      return t.removeFile(e);
                    }) : t.removeFile(e);
                  }, u = 0, c = c = e.previewElement.querySelectorAll("[data-dz-remove]");;) {
                    if (u >= c.length) break;
                    c[u++].addEventListener("click", l);
                  }
                }
              },
              removedfile: function (e) {
                return null != e.previewElement && null != e.previewElement.parentNode && e.previewElement.parentNode.removeChild(e.previewElement), this._updateMaxFilesReachedClass();
              },
              thumbnail: function (e, t) {
                if (e.previewElement) {
                  e.previewElement.classList.remove("dz-file-preview");

                  for (var n = 0, i = i = e.previewElement.querySelectorAll("[data-dz-thumbnail]");;) {
                    if (n >= i.length) break;
                    var o = i[n++];
                    o.alt = e.name, o.src = t;
                  }

                  return setTimeout(function () {
                    return e.previewElement.classList.add("dz-image-preview");
                  }, 1);
                }
              },
              error: function (e, t) {
                if (e.previewElement) {
                  e.previewElement.classList.add("dz-error"), "String" != typeof t && t.error && (t = t.error);

                  for (var n = 0, i = i = e.previewElement.querySelectorAll("[data-dz-errormessage]");;) {
                    if (n >= i.length) break;
                    i[n++].textContent = t;
                  }
                }
              },
              errormultiple: function () {},
              processing: function (e) {
                if (e.previewElement && (e.previewElement.classList.add("dz-processing"), e._removeLink)) return e._removeLink.textContent = this.options.dictCancelUpload;
              },
              processingmultiple: function () {},
              uploadprogress: function (e, t, n) {
                if (e.previewElement) for (var i = 0, o = o = e.previewElement.querySelectorAll("[data-dz-uploadprogress]");;) {
                  if (i >= o.length) break;
                  var r = o[i++];
                  "PROGRESS" === r.nodeName ? r.value = t : r.style.width = t + "%";
                }
              },
              totaluploadprogress: function () {},
              sending: function () {},
              sendingmultiple: function () {},
              success: function (e) {
                if (e.previewElement) return e.previewElement.classList.add("dz-success");
              },
              successmultiple: function () {},
              canceled: function (e) {
                return this.emit("error", e, "Upload canceled.");
              },
              canceledmultiple: function () {},
              complete: function (e) {
                if (e._removeLink && (e._removeLink.textContent = this.options.dictRemoveFile), e.previewElement) return e.previewElement.classList.add("dz-complete");
              },
              completemultiple: function () {},
              maxfilesexceeded: function () {},
              maxfilesreached: function () {},
              queuecomplete: function () {},
              addedfiles: function () {}
            }, this.prototype._thumbnailQueue = [], this.prototype._processingThumbnail = !1;
          }
        }, {
          key: "extend",
          value: function (e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];

            for (var o = 0, r = r = n;;) {
              if (o >= r.length) break;
              var s = r[o++];

              for (var a in s) {
                var l = s[a];
                e[a] = l;
              }
            }

            return e;
          }
        }]), t(r, [{
          key: "getAcceptedFiles",
          value: function () {
            return this.files.filter(function (e) {
              return e.accepted;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "getRejectedFiles",
          value: function () {
            return this.files.filter(function (e) {
              return !e.accepted;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "getFilesWithStatus",
          value: function (e) {
            return this.files.filter(function (t) {
              return t.status === e;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "getQueuedFiles",
          value: function () {
            return this.getFilesWithStatus(r.QUEUED);
          }
        }, {
          key: "getUploadingFiles",
          value: function () {
            return this.getFilesWithStatus(r.UPLOADING);
          }
        }, {
          key: "getAddedFiles",
          value: function () {
            return this.getFilesWithStatus(r.ADDED);
          }
        }, {
          key: "getActiveFiles",
          value: function () {
            return this.files.filter(function (e) {
              return e.status === r.UPLOADING || e.status === r.QUEUED;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "init",
          value: function () {
            var e = this;

            if ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(r.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length) {
              !function t() {
                return e.hiddenFileInput && e.hiddenFileInput.parentNode.removeChild(e.hiddenFileInput), e.hiddenFileInput = document.createElement("input"), e.hiddenFileInput.setAttribute("type", "file"), (null === e.options.maxFiles || e.options.maxFiles > 1) && e.hiddenFileInput.setAttribute("multiple", "multiple"), e.hiddenFileInput.className = "dz-hidden-input", null !== e.options.acceptedFiles && e.hiddenFileInput.setAttribute("accept", e.options.acceptedFiles), null !== e.options.capture && e.hiddenFileInput.setAttribute("capture", e.options.capture), e.hiddenFileInput.style.visibility = "hidden", e.hiddenFileInput.style.position = "absolute", e.hiddenFileInput.style.top = "0", e.hiddenFileInput.style.left = "0", e.hiddenFileInput.style.height = "0", e.hiddenFileInput.style.width = "0", document.querySelector(e.options.hiddenInputContainer).appendChild(e.hiddenFileInput), e.hiddenFileInput.addEventListener("change", function () {
                  var n = e.hiddenFileInput.files;
                  if (n.length) for (var i = 0, o = o = n; !(i >= o.length);) {
                    var r = o[i++];
                    e.addFile(r);
                  }
                  return e.emit("addedfiles", n), t();
                });
              }();
            }

            this.URL = null !== window.URL ? window.URL : window.webkitURL;

            for (var t = 0, n = n = this.events;;) {
              if (t >= n.length) break;
              var i = n[t++];
              this.on(i, this.options[i]);
            }

            this.on("uploadprogress", function () {
              return e.updateTotalUploadProgress();
            }), this.on("removedfile", function () {
              return e.updateTotalUploadProgress();
            }), this.on("canceled", function (t) {
              return e.emit("complete", t);
            }), this.on("complete", function (t) {
              if (0 === e.getAddedFiles().length && 0 === e.getUploadingFiles().length && 0 === e.getQueuedFiles().length) return setTimeout(function () {
                return e.emit("queuecomplete");
              }, 0);
            });

            var o = function (e) {
              return e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            };

            return this.listeners = [{
              element: this.element,
              events: {
                dragstart: function (t) {
                  return e.emit("dragstart", t);
                },
                dragenter: function (t) {
                  return o(t), e.emit("dragenter", t);
                },
                dragover: function (t) {
                  var n = void 0;

                  try {
                    n = t.dataTransfer.effectAllowed;
                  } catch (e) {}

                  return t.dataTransfer.dropEffect = "move" === n || "linkMove" === n ? "move" : "copy", o(t), e.emit("dragover", t);
                },
                dragleave: function (t) {
                  return e.emit("dragleave", t);
                },
                drop: function (t) {
                  return o(t), e.drop(t);
                },
                dragend: function (t) {
                  return e.emit("dragend", t);
                }
              }
            }], this.clickableElements.forEach(function (t) {
              return e.listeners.push({
                element: t,
                events: {
                  click: function (n) {
                    return (t !== e.element || n.target === e.element || r.elementInside(n.target, e.element.querySelector(".dz-message"))) && e.hiddenFileInput.click(), !0;
                  }
                }
              });
            }), this.enable(), this.options.init.call(this);
          }
        }, {
          key: "destroy",
          value: function () {
            return this.disable(), this.removeAllFiles(!0), (null != this.hiddenFileInput ? this.hiddenFileInput.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, r.instances.splice(r.instances.indexOf(this), 1);
          }
        }, {
          key: "updateTotalUploadProgress",
          value: function () {
            var e = void 0,
                t = 0,
                n = 0;

            if (this.getActiveFiles().length) {
              for (var i = 0, o = o = this.getActiveFiles();;) {
                if (i >= o.length) break;
                var r = o[i++];
                t += r.upload.bytesSent, n += r.upload.total;
              }

              e = 100 * t / n;
            } else e = 100;

            return this.emit("totaluploadprogress", e, n, t);
          }
        }, {
          key: "_getParamName",
          value: function (e) {
            return "function" == typeof this.options.paramName ? this.options.paramName(e) : this.options.paramName + (this.options.uploadMultiple ? "[" + e + "]" : "");
          }
        }, {
          key: "_renameFile",
          value: function (e) {
            return "function" != typeof this.options.renameFile ? e.name : this.options.renameFile(e);
          }
        }, {
          key: "getFallbackForm",
          value: function () {
            var e,
                t = void 0;
            if (e = this.getExistingFallback()) return e;
            var n = '<div class="dz-fallback">';
            this.options.dictFallbackText && (n += "<p>" + this.options.dictFallbackText + "</p>"), n += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>';
            var i = r.createElement(n);
            return "FORM" !== this.element.tagName ? (t = r.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>')).appendChild(i) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != t ? t : i;
          }
        }, {
          key: "getExistingFallback",
          value: function () {
            for (var e = function (e) {
              for (var t = 0, n = n = e;;) {
                if (t >= n.length) break;
                var i = n[t++];
                if (/(^| )fallback($| )/.test(i.className)) return i;
              }
            }, t = ["div", "form"], n = 0; n < t.length; n++) {
              var i,
                  o = t[n];
              if (i = e(this.element.getElementsByTagName(o))) return i;
            }
          }
        }, {
          key: "setupEventListeners",
          value: function () {
            return this.listeners.map(function (e) {
              return function () {
                var t = [];

                for (var n in e.events) {
                  var i = e.events[n];
                  t.push(e.element.addEventListener(n, i, !1));
                }

                return t;
              }();
            });
          }
        }, {
          key: "removeEventListeners",
          value: function () {
            return this.listeners.map(function (e) {
              return function () {
                var t = [];

                for (var n in e.events) {
                  var i = e.events[n];
                  t.push(e.element.removeEventListener(n, i, !1));
                }

                return t;
              }();
            });
          }
        }, {
          key: "disable",
          value: function () {
            var e = this;
            return this.clickableElements.forEach(function (e) {
              return e.classList.remove("dz-clickable");
            }), this.removeEventListeners(), this.files.map(function (t) {
              return e.cancelUpload(t);
            });
          }
        }, {
          key: "enable",
          value: function () {
            return this.clickableElements.forEach(function (e) {
              return e.classList.add("dz-clickable");
            }), this.setupEventListeners();
          }
        }, {
          key: "filesize",
          value: function (e) {
            var t = 0,
                n = "b";

            if (e > 0) {
              for (var i = ["tb", "gb", "mb", "kb", "b"], o = 0; o < i.length; o++) {
                var r = i[o];

                if (e >= Math.pow(this.options.filesizeBase, 4 - o) / 10) {
                  t = e / Math.pow(this.options.filesizeBase, 4 - o), n = r;
                  break;
                }
              }

              t = Math.round(10 * t) / 10;
            }

            return "<strong>" + t + "</strong> " + this.options.dictFileSizeUnits[n];
          }
        }, {
          key: "_updateMaxFilesReachedClass",
          value: function () {
            return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached");
          }
        }, {
          key: "drop",
          value: function (e) {
            if (e.dataTransfer) {
              this.emit("drop", e);
              var t = e.dataTransfer.files;

              if (this.emit("addedfiles", t), t.length) {
                var n = e.dataTransfer.items;
                n && n.length && null != n[0].webkitGetAsEntry ? this._addFilesFromItems(n) : this.handleFiles(t);
              }
            }
          }
        }, {
          key: "paste",
          value: function (e) {
            if (null != (void 0 !== (t = null != e ? e.clipboardData : void 0) && null !== t ? function (e) {
              return e.items;
            }(t) : void 0)) {
              var t;
              this.emit("paste", e);
              var n = e.clipboardData.items;
              return n.length ? this._addFilesFromItems(n) : void 0;
            }
          }
        }, {
          key: "handleFiles",
          value: function (e) {
            var t = this;
            return e.map(function (e) {
              return t.addFile(e);
            });
          }
        }, {
          key: "_addFilesFromItems",
          value: function (e) {
            var t = this;
            return function () {
              for (var n = [], i = 0, o = o = e;;) {
                if (i >= o.length) break;
                var r,
                    s = o[i++];
                null != s.webkitGetAsEntry && (r = s.webkitGetAsEntry()) ? r.isFile ? n.push(t.addFile(s.getAsFile())) : r.isDirectory ? n.push(t._addFilesFromDirectory(r, r.name)) : n.push(void 0) : null != s.getAsFile && (null == s.kind || "file" === s.kind) ? n.push(t.addFile(s.getAsFile())) : n.push(void 0);
              }

              return n;
            }();
          }
        }, {
          key: "_addFilesFromDirectory",
          value: function (e, t) {
            var n = this,
                i = e.createReader(),
                o = function (e) {
              return t = console, n = "log", i = function (t) {
                return t.log(e);
              }, void 0 !== t && null !== t && "function" == typeof t[n] ? i(t, n) : void 0;
              var t, n, i;
            };

            return function e() {
              return i.readEntries(function (i) {
                if (i.length > 0) {
                  for (var o = 0, r = r = i; !(o >= r.length);) {
                    var s = r[o++];
                    s.isFile ? s.file(function (e) {
                      if (!n.options.ignoreHiddenFiles || "." !== e.name.substring(0, 1)) return e.fullPath = t + "/" + e.name, n.addFile(e);
                    }) : s.isDirectory && n._addFilesFromDirectory(s, t + "/" + s.name);
                  }

                  e();
                }

                return null;
              }, o);
            }();
          }
        }, {
          key: "accept",
          value: function (e, t) {
            return e.size > 1024 * this.options.maxFilesize * 1024 ? t(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(e.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : r.isValidFile(e, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", e)) : this.options.accept.call(this, e, t) : t(this.options.dictInvalidFileType);
          }
        }, {
          key: "addFile",
          value: function (e) {
            var t = this;
            return e.upload = {
              uuid: r.uuidv4(),
              progress: 0,
              total: e.size,
              bytesSent: 0,
              filename: this._renameFile(e),
              chunked: this.options.chunking && (this.options.forceChunking || e.size > this.options.chunkSize),
              totalChunkCount: Math.ceil(e.size / this.options.chunkSize)
            }, this.files.push(e), e.status = r.ADDED, this.emit("addedfile", e), this._enqueueThumbnail(e), this.accept(e, function (n) {
              return n ? (e.accepted = !1, t._errorProcessing([e], n)) : (e.accepted = !0, t.options.autoQueue && t.enqueueFile(e)), t._updateMaxFilesReachedClass();
            });
          }
        }, {
          key: "enqueueFiles",
          value: function (e) {
            for (var t = 0, n = n = e;;) {
              if (t >= n.length) break;
              var i = n[t++];
              this.enqueueFile(i);
            }

            return null;
          }
        }, {
          key: "enqueueFile",
          value: function (e) {
            var t = this;
            if (e.status !== r.ADDED || !0 !== e.accepted) throw new Error("This file can't be queued because it has already been processed or was rejected.");
            if (e.status = r.QUEUED, this.options.autoProcessQueue) return setTimeout(function () {
              return t.processQueue();
            }, 0);
          }
        }, {
          key: "_enqueueThumbnail",
          value: function (e) {
            var t = this;
            if (this.options.createImageThumbnails && e.type.match(/image.*/) && e.size <= 1024 * this.options.maxThumbnailFilesize * 1024) return this._thumbnailQueue.push(e), setTimeout(function () {
              return t._processThumbnailQueue();
            }, 0);
          }
        }, {
          key: "_processThumbnailQueue",
          value: function () {
            var e = this;

            if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length) {
              this._processingThumbnail = !0;

              var t = this._thumbnailQueue.shift();

              return this.createThumbnail(t, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, !0, function (n) {
                return e.emit("thumbnail", t, n), e._processingThumbnail = !1, e._processThumbnailQueue();
              });
            }
          }
        }, {
          key: "removeFile",
          value: function (e) {
            if (e.status === r.UPLOADING && this.cancelUpload(e), this.files = s(this.files, e), this.emit("removedfile", e), 0 === this.files.length) return this.emit("reset");
          }
        }, {
          key: "removeAllFiles",
          value: function (e) {
            null == e && (e = !1);

            for (var t = 0, n = n = this.files.slice();;) {
              if (t >= n.length) break;
              var i = n[t++];
              (i.status !== r.UPLOADING || e) && this.removeFile(i);
            }

            return null;
          }
        }, {
          key: "resizeImage",
          value: function (e, t, n, i, o) {
            var s = this;
            return this.createThumbnail(e, t, n, i, !1, function (t, n) {
              if (null === n) return o(e);
              var i = s.options.resizeMimeType;
              null == i && (i = e.type);
              var a = n.toDataURL(i, s.options.resizeQuality);
              return "image/jpeg" !== i && "image/jpg" !== i || (a = u.restore(e.dataURL, a)), o(r.dataURItoBlob(a));
            });
          }
        }, {
          key: "createThumbnail",
          value: function (e, t, n, i, o, r) {
            var s = this,
                a = new FileReader();
            return a.onload = function () {
              if (e.dataURL = a.result, "image/svg+xml" !== e.type) return s.createThumbnailFromUrl(e, t, n, i, o, r);
              null != r && r(a.result);
            }, a.readAsDataURL(e);
          }
        }, {
          key: "createThumbnailFromUrl",
          value: function (e, t, n, i, o, r, s) {
            var a = this,
                u = document.createElement("img");
            return s && (u.crossOrigin = s), u.onload = function () {
              var s = function (e) {
                return e(1);
              };

              return "undefined" != typeof EXIF && null !== EXIF && o && (s = function (e) {
                return EXIF.getData(u, function () {
                  return e(EXIF.getTag(this, "Orientation"));
                });
              }), s(function (o) {
                e.width = u.width, e.height = u.height;
                var s = a.options.resize.call(a, e, t, n, i),
                    c = document.createElement("canvas"),
                    d = c.getContext("2d");

                switch (c.width = s.trgWidth, c.height = s.trgHeight, o > 4 && (c.width = s.trgHeight, c.height = s.trgWidth), o) {
                  case 2:
                    d.translate(c.width, 0), d.scale(-1, 1);
                    break;

                  case 3:
                    d.translate(c.width, c.height), d.rotate(Math.PI);
                    break;

                  case 4:
                    d.translate(0, c.height), d.scale(1, -1);
                    break;

                  case 5:
                    d.rotate(.5 * Math.PI), d.scale(1, -1);
                    break;

                  case 6:
                    d.rotate(.5 * Math.PI), d.translate(0, -c.height);
                    break;

                  case 7:
                    d.rotate(.5 * Math.PI), d.translate(c.width, -c.height), d.scale(-1, 1);
                    break;

                  case 8:
                    d.rotate(-.5 * Math.PI), d.translate(-c.width, 0);
                }

                l(d, u, null != s.srcX ? s.srcX : 0, null != s.srcY ? s.srcY : 0, s.srcWidth, s.srcHeight, null != s.trgX ? s.trgX : 0, null != s.trgY ? s.trgY : 0, s.trgWidth, s.trgHeight);
                var p = c.toDataURL("image/png");
                if (null != r) return r(p, c);
              });
            }, null != r && (u.onerror = r), u.src = e.dataURL;
          }
        }, {
          key: "processQueue",
          value: function () {
            var e = this.options.parallelUploads,
                t = this.getUploadingFiles().length,
                n = t;

            if (!(t >= e)) {
              var i = this.getQueuedFiles();

              if (i.length > 0) {
                if (this.options.uploadMultiple) return this.processFiles(i.slice(0, e - t));

                for (; n < e;) {
                  if (!i.length) return;
                  this.processFile(i.shift()), n++;
                }
              }
            }
          }
        }, {
          key: "processFile",
          value: function (e) {
            return this.processFiles([e]);
          }
        }, {
          key: "processFiles",
          value: function (e) {
            for (var t = 0, n = n = e;;) {
              if (t >= n.length) break;
              var i = n[t++];
              i.processing = !0, i.status = r.UPLOADING, this.emit("processing", i);
            }

            return this.options.uploadMultiple && this.emit("processingmultiple", e), this.uploadFiles(e);
          }
        }, {
          key: "_getFilesWithXhr",
          value: function (e) {
            return this.files.filter(function (t) {
              return t.xhr === e;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "cancelUpload",
          value: function (e) {
            if (e.status === r.UPLOADING) {
              for (var t = this._getFilesWithXhr(e.xhr), n = 0, i = i = t;;) {
                if (n >= i.length) break;
                i[n++].status = r.CANCELED;
              }

              void 0 !== e.xhr && e.xhr.abort();

              for (var o = 0, s = s = t;;) {
                if (o >= s.length) break;
                var a = s[o++];
                this.emit("canceled", a);
              }

              this.options.uploadMultiple && this.emit("canceledmultiple", t);
            } else e.status !== r.ADDED && e.status !== r.QUEUED || (e.status = r.CANCELED, this.emit("canceled", e), this.options.uploadMultiple && this.emit("canceledmultiple", [e]));

            if (this.options.autoProcessQueue) return this.processQueue();
          }
        }, {
          key: "resolveOption",
          value: function (e) {
            if ("function" == typeof e) {
              for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];

              return e.apply(this, n);
            }

            return e;
          }
        }, {
          key: "uploadFile",
          value: function (e) {
            return this.uploadFiles([e]);
          }
        }, {
          key: "uploadFiles",
          value: function (e) {
            var t = this;

            this._transformFiles(e, function (n) {
              if (e[0].upload.chunked) {
                var i = e[0],
                    o = n[0];
                i.upload.chunks = [];

                var s = function () {
                  for (var n = 0; void 0 !== i.upload.chunks[n];) n++;

                  if (!(n >= i.upload.totalChunkCount)) {
                    0;
                    var s = n * t.options.chunkSize,
                        a = Math.min(s + t.options.chunkSize, i.size),
                        l = {
                      name: t._getParamName(0),
                      data: o.webkitSlice ? o.webkitSlice(s, a) : o.slice(s, a),
                      filename: i.upload.filename,
                      chunkIndex: n
                    };
                    i.upload.chunks[n] = {
                      file: i,
                      index: n,
                      dataBlock: l,
                      status: r.UPLOADING,
                      progress: 0,
                      retries: 0
                    }, t._uploadData(e, [l]);
                  }
                };

                if (i.upload.finishedChunkUpload = function (n) {
                  var o = !0;
                  n.status = r.SUCCESS, n.dataBlock = null;

                  for (var a = 0; a < i.upload.totalChunkCount; a++) {
                    if (void 0 === i.upload.chunks[a]) return s();
                    i.upload.chunks[a].status !== r.SUCCESS && (o = !1);
                  }

                  o && t.options.chunksUploaded(i, function () {
                    t._finished(e, "", null);
                  });
                }, t.options.parallelChunkUploads) for (var a = 0; a < i.upload.totalChunkCount; a++) s();else s();
              } else {
                for (var l = [], u = 0; u < e.length; u++) l[u] = {
                  name: t._getParamName(u),
                  data: n[u],
                  filename: e[u].upload.filename
                };

                t._uploadData(e, l);
              }
            });
          }
        }, {
          key: "_getChunk",
          value: function (e, t) {
            for (var n = 0; n < e.upload.totalChunkCount; n++) if (void 0 !== e.upload.chunks[n] && e.upload.chunks[n].xhr === t) return e.upload.chunks[n];
          }
        }, {
          key: "_uploadData",
          value: function (e, t) {
            for (var n = this, i = new XMLHttpRequest(), o = 0, s = s = e;;) {
              if (o >= s.length) break;
              s[o++].xhr = i;
            }

            e[0].upload.chunked && (e[0].upload.chunks[t[0].chunkIndex].xhr = i);
            var a = this.resolveOption(this.options.method, e),
                l = this.resolveOption(this.options.url, e);
            i.open(a, l, !0), i.timeout = this.resolveOption(this.options.timeout, e), i.withCredentials = !!this.options.withCredentials, i.onload = function (t) {
              n._finishedUploading(e, i, t);
            }, i.onerror = function () {
              n._handleUploadError(e, i);
            }, (null != i.upload ? i.upload : i).onprogress = function (t) {
              return n._updateFilesUploadProgress(e, i, t);
            };
            var u = {
              Accept: "application/json",
              "Cache-Control": "no-cache",
              "X-Requested-With": "XMLHttpRequest"
            };

            for (var c in this.options.headers && r.extend(u, this.options.headers), u) {
              var d = u[c];
              d && i.setRequestHeader(c, d);
            }

            var p = new FormData();

            if (this.options.params) {
              var h = this.options.params;

              for (var f in "function" == typeof h && (h = h.call(this, e, i, e[0].upload.chunked ? this._getChunk(e[0], i) : null)), h) {
                var v = h[f];
                p.append(f, v);
              }
            }

            for (var m = 0, g = g = e;;) {
              if (m >= g.length) break;
              var b = g[m++];
              this.emit("sending", b, i, p);
            }

            this.options.uploadMultiple && this.emit("sendingmultiple", e, i, p), this._addFormElementData(p);

            for (var w = 0; w < t.length; w++) {
              var y = t[w];
              p.append(y.name, y.data, y.filename);
            }

            this.submitRequest(i, p, e);
          }
        }, {
          key: "_transformFiles",
          value: function (e, t) {
            for (var n = this, i = [], o = 0, r = function (r) {
              n.options.transformFile.call(n, e[r], function (n) {
                i[r] = n, ++o === e.length && t(i);
              });
            }, s = 0; s < e.length; s++) r(s);
          }
        }, {
          key: "_addFormElementData",
          value: function (e) {
            if ("FORM" === this.element.tagName) for (var t = 0, n = n = this.element.querySelectorAll("input, textarea, select, button");;) {
              if (t >= n.length) break;
              var i = n[t++],
                  o = i.getAttribute("name"),
                  r = i.getAttribute("type");
              if (r && (r = r.toLowerCase()), void 0 !== o && null !== o) if ("SELECT" === i.tagName && i.hasAttribute("multiple")) for (var s = 0, a = a = i.options;;) {
                if (s >= a.length) break;
                var l = a[s++];
                l.selected && e.append(o, l.value);
              } else (!r || "checkbox" !== r && "radio" !== r || i.checked) && e.append(o, i.value);
            }
          }
        }, {
          key: "_updateFilesUploadProgress",
          value: function (e, t, n) {
            var i = void 0;

            if (void 0 !== n) {
              if (i = 100 * n.loaded / n.total, e[0].upload.chunked) {
                var o = e[0],
                    r = this._getChunk(o, t);

                r.progress = i, r.total = n.total, r.bytesSent = n.loaded;
                o.upload.progress = 0, o.upload.total = 0, o.upload.bytesSent = 0;

                for (var s = 0; s < o.upload.totalChunkCount; s++) void 0 !== o.upload.chunks[s] && void 0 !== o.upload.chunks[s].progress && (o.upload.progress += o.upload.chunks[s].progress, o.upload.total += o.upload.chunks[s].total, o.upload.bytesSent += o.upload.chunks[s].bytesSent);

                o.upload.progress = o.upload.progress / o.upload.totalChunkCount;
              } else for (var a = 0, l = l = e;;) {
                if (a >= l.length) break;
                var u = l[a++];
                u.upload.progress = i, u.upload.total = n.total, u.upload.bytesSent = n.loaded;
              }

              for (var c = 0, d = d = e;;) {
                if (c >= d.length) break;
                var p = d[c++];
                this.emit("uploadprogress", p, p.upload.progress, p.upload.bytesSent);
              }
            } else {
              var h = !0;
              i = 100;

              for (var f = 0, v = v = e;;) {
                if (f >= v.length) break;
                var m = v[f++];
                100 === m.upload.progress && m.upload.bytesSent === m.upload.total || (h = !1), m.upload.progress = i, m.upload.bytesSent = m.upload.total;
              }

              if (h) return;

              for (var g = 0, b = b = e;;) {
                if (g >= b.length) break;
                var w = b[g++];
                this.emit("uploadprogress", w, i, w.upload.bytesSent);
              }
            }
          }
        }, {
          key: "_finishedUploading",
          value: function (e, t, n) {
            var i = void 0;

            if (e[0].status !== r.CANCELED && 4 === t.readyState) {
              if ("arraybuffer" !== t.responseType && "blob" !== t.responseType && (i = t.responseText, t.getResponseHeader("content-type") && ~t.getResponseHeader("content-type").indexOf("application/json"))) try {
                i = JSON.parse(i);
              } catch (e) {
                n = e, i = "Invalid JSON response from server.";
              }
              this._updateFilesUploadProgress(e), 200 <= t.status && t.status < 300 ? e[0].upload.chunked ? e[0].upload.finishedChunkUpload(this._getChunk(e[0], t)) : this._finished(e, i, n) : this._handleUploadError(e, t, i);
            }
          }
        }, {
          key: "_handleUploadError",
          value: function (e, t, n) {
            if (e[0].status !== r.CANCELED) {
              if (e[0].upload.chunked && this.options.retryChunks) {
                var i = this._getChunk(e[0], t);

                if (i.retries++ < this.options.retryChunksLimit) return void this._uploadData(e, [i.dataBlock]);
                console.warn("Retried this chunk too often. Giving up.");
              }

              for (var o = 0, s = s = e;;) {
                if (o >= s.length) break;
                s[o++];

                this._errorProcessing(e, n || this.options.dictResponseError.replace("{{statusCode}}", t.status), t);
              }
            }
          }
        }, {
          key: "submitRequest",
          value: function (e, t, n) {
            e.send(t);
          }
        }, {
          key: "_finished",
          value: function (e, t, n) {
            for (var i = 0, o = o = e;;) {
              if (i >= o.length) break;
              var s = o[i++];
              s.status = r.SUCCESS, this.emit("success", s, t, n), this.emit("complete", s);
            }

            if (this.options.uploadMultiple && (this.emit("successmultiple", e, t, n), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue();
          }
        }, {
          key: "_errorProcessing",
          value: function (e, t, n) {
            for (var i = 0, o = o = e;;) {
              if (i >= o.length) break;
              var s = o[i++];
              s.status = r.ERROR, this.emit("error", s, t, n), this.emit("complete", s);
            }

            if (this.options.uploadMultiple && (this.emit("errormultiple", e, t, n), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue();
          }
        }], [{
          key: "uuidv4",
          value: function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
              var t = 16 * Math.random() | 0;
              return ("x" === e ? t : 3 & t | 8).toString(16);
            });
          }
        }]), r;
      }();

      r.initClass(), r.version = "5.3.0", r.options = {}, r.optionsForElement = function (e) {
        return e.getAttribute("id") ? r.options[a(e.getAttribute("id"))] : void 0;
      }, r.instances = [], r.forElement = function (e) {
        if ("string" == typeof e && (e = document.querySelector(e)), null == (null != e ? e.dropzone : void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return e.dropzone;
      }, r.autoDiscover = !0, r.discover = function () {
        var e = void 0;
        if (document.querySelectorAll) e = document.querySelectorAll(".dropzone");else {
          e = [];

          var t = function (t) {
            return function () {
              for (var n = [], i = 0, o = o = t;;) {
                if (i >= o.length) break;
                var r = o[i++];
                /(^| )dropzone($| )/.test(r.className) ? n.push(e.push(r)) : n.push(void 0);
              }

              return n;
            }();
          };

          t(document.getElementsByTagName("div")), t(document.getElementsByTagName("form"));
        }
        return function () {
          for (var t = [], n = 0, i = i = e;;) {
            if (n >= i.length) break;
            var o = i[n++];
            !1 !== r.optionsForElement(o) ? t.push(new r(o)) : t.push(void 0);
          }

          return t;
        }();
      }, r.blacklistedBrowsers = [/opera.*(Macintosh|Windows Phone).*version\/12/i], r.isBrowserSupported = function () {
        var e = !0;
        if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
          if ("classList" in document.createElement("a")) for (var t = 0, n = n = r.blacklistedBrowsers;;) {
            if (t >= n.length) break;
            n[t++].test(navigator.userAgent) && (e = !1);
          } else e = !1;
        } else e = !1;
        return e;
      }, r.dataURItoBlob = function (e) {
        for (var t = atob(e.split(",")[1]), n = e.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), o = new Uint8Array(i), r = 0, s = t.length, a = 0 <= s; a ? r <= s : r >= s; a ? r++ : r--) o[r] = t.charCodeAt(r);

        return new Blob([i], {
          type: n
        });
      };

      var s = function (e, t) {
        return e.filter(function (e) {
          return e !== t;
        }).map(function (e) {
          return e;
        });
      },
          a = function (e) {
        return e.replace(/[\-_](\w)/g, function (e) {
          return e.charAt(1).toUpperCase();
        });
      };

      r.createElement = function (e) {
        var t = document.createElement("div");
        return t.innerHTML = e, t.childNodes[0];
      }, r.elementInside = function (e, t) {
        if (e === t) return !0;

        for (; e = e.parentNode;) if (e === t) return !0;

        return !1;
      }, r.getElement = function (e, t) {
        var n = void 0;
        if ("string" == typeof e ? n = document.querySelector(e) : null != e.nodeType && (n = e), null == n) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector or a plain HTML element.");
        return n;
      }, r.getElements = function (e, t) {
        var n = void 0,
            i = void 0;

        if (e instanceof Array) {
          i = [];

          try {
            for (var o = 0, r = r = e; !(o >= r.length);) n = r[o++], i.push(this.getElement(n, t));
          } catch (e) {
            i = null;
          }
        } else if ("string" == typeof e) {
          i = [];

          for (var s = 0, a = a = document.querySelectorAll(e); !(s >= a.length);) n = a[s++], i.push(n);
        } else null != e.nodeType && (i = [e]);

        if (null == i || !i.length) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        return i;
      }, r.confirm = function (e, t, n) {
        return window.confirm(e) ? t() : null != n ? n() : void 0;
      }, r.isValidFile = function (e, t) {
        if (!t) return !0;
        t = t.split(",");

        for (var n = e.type, i = n.replace(/\/.*$/, ""), o = 0, r = r = t;;) {
          if (o >= r.length) break;
          var s = r[o++];

          if ("." === (s = s.trim()).charAt(0)) {
            if (-1 !== e.name.toLowerCase().indexOf(s.toLowerCase(), e.name.length - s.length)) return !0;
          } else if (/\/\*$/.test(s)) {
            if (i === s.replace(/\/.*$/, "")) return !0;
          } else if (n === s) return !0;
        }

        return !1;
      }, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function (e) {
        return this.each(function () {
          return new r(this, e);
        });
      }), void 0 !== e && null !== e ? e.exports = r : window.Dropzone = r, r.ADDED = "added", r.QUEUED = "queued", r.ACCEPTED = r.QUEUED, r.UPLOADING = "uploading", r.PROCESSING = r.UPLOADING, r.CANCELED = "canceled", r.ERROR = "error", r.SUCCESS = "success";

      var l = function (e, t, n, i, o, r, s, a, l, u) {
        var c = function (e) {
          e.naturalWidth;
          var t = e.naturalHeight,
              n = document.createElement("canvas");
          n.width = 1, n.height = t;
          var i = n.getContext("2d");
          i.drawImage(e, 0, 0);

          for (var o = i.getImageData(1, 0, 1, t).data, r = 0, s = t, a = t; a > r;) 0 === o[4 * (a - 1) + 3] ? s = a : r = a, a = s + r >> 1;

          var l = a / t;
          return 0 === l ? 1 : l;
        }(t);

        return e.drawImage(t, n, i, o, r, s, a, l, u / c);
      },
          u = function () {
        function e() {
          i(this, e);
        }

        return t(e, null, [{
          key: "initClass",
          value: function () {
            this.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          }
        }, {
          key: "encode64",
          value: function (e) {
            for (var t = "", n = void 0, i = void 0, o = "", r = void 0, s = void 0, a = void 0, l = "", u = 0; r = (n = e[u++]) >> 2, s = (3 & n) << 4 | (i = e[u++]) >> 4, a = (15 & i) << 2 | (o = e[u++]) >> 6, l = 63 & o, isNaN(i) ? a = l = 64 : isNaN(o) && (l = 64), t = t + this.KEY_STR.charAt(r) + this.KEY_STR.charAt(s) + this.KEY_STR.charAt(a) + this.KEY_STR.charAt(l), n = i = o = "", r = s = a = l = "", u < e.length;);

            return t;
          }
        }, {
          key: "restore",
          value: function (e, t) {
            if (!e.match("data:image/jpeg;base64,")) return t;
            var n = this.decode64(e.replace("data:image/jpeg;base64,", "")),
                i = this.slice2Segments(n),
                o = this.exifManipulation(t, i);
            return "data:image/jpeg;base64," + this.encode64(o);
          }
        }, {
          key: "exifManipulation",
          value: function (e, t) {
            var n = this.getExifArray(t),
                i = this.insertExif(e, n);
            return new Uint8Array(i);
          }
        }, {
          key: "getExifArray",
          value: function (e) {
            for (var t = void 0, n = 0; n < e.length;) {
              if (255 === (t = e[n])[0] & 225 === t[1]) return t;
              n++;
            }

            return [];
          }
        }, {
          key: "insertExif",
          value: function (e, t) {
            var n = e.replace("data:image/jpeg;base64,", ""),
                i = this.decode64(n),
                o = i.indexOf(255, 3),
                r = i.slice(0, o),
                s = i.slice(o),
                a = r;
            return a = (a = a.concat(t)).concat(s);
          }
        }, {
          key: "slice2Segments",
          value: function (e) {
            for (var t = 0, n = [];;) {
              if (255 === e[t] & 218 === e[t + 1]) break;
              if (255 === e[t] & 216 === e[t + 1]) t += 2;else {
                var i = t + (256 * e[t + 2] + e[t + 3]) + 2,
                    o = e.slice(t, i);
                n.push(o), t = i;
              }
              if (t > e.length) break;
            }

            return n;
          }
        }, {
          key: "decode64",
          value: function (e) {
            var t = void 0,
                n = void 0,
                i = "",
                o = void 0,
                r = void 0,
                s = "",
                a = 0,
                l = [];

            for (/[^A-Za-z0-9\+\/\=]/g.exec(e) && console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); t = this.KEY_STR.indexOf(e.charAt(a++)) << 2 | (o = this.KEY_STR.indexOf(e.charAt(a++))) >> 4, n = (15 & o) << 4 | (r = this.KEY_STR.indexOf(e.charAt(a++))) >> 2, i = (3 & r) << 6 | (s = this.KEY_STR.indexOf(e.charAt(a++))), l.push(t), 64 !== r && l.push(n), 64 !== s && l.push(i), t = n = i = "", o = r = s = "", a < e.length;);

            return l;
          }
        }]), e;
      }();

      u.initClass();
      r._autoDiscoverFunction = function () {
        if (r.autoDiscover) return r.discover();
      }, function (e, t) {
        var n = !1,
            i = !0,
            o = e.document,
            r = o.documentElement,
            s = o.addEventListener ? "addEventListener" : "attachEvent",
            a = o.addEventListener ? "removeEventListener" : "detachEvent",
            l = o.addEventListener ? "" : "on",
            u = function i(r) {
          if ("readystatechange" !== r.type || "complete" === o.readyState) return ("load" === r.type ? e : o)[a](l + r.type, i, !1), !n && (n = !0) ? t.call(e, r.type || r) : void 0;
        };

        if ("complete" !== o.readyState) {
          if (o.createEventObject && r.doScroll) {
            try {
              i = !e.frameElement;
            } catch (e) {}

            i && function e() {
              try {
                r.doScroll("left");
              } catch (t) {
                return void setTimeout(e, 50);
              }

              return u("poll");
            }();
          }

          o[s](l + "DOMContentLoaded", u, !1), o[s](l + "readystatechange", u, !1), e[s](l + "load", u, !1);
        }
      }(window, r._autoDiscoverFunction);
    }).call(t, n(69)(e));
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
        enumerable: !0,
        get: function () {
          return e.l;
        }
      }), Object.defineProperty(e, "id", {
        enumerable: !0,
        get: function () {
          return e.i;
        }
      }), e.webpackPolyfill = 1), e;
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function () {
      var e = this.$createElement;
      return (this._self._c || e)("Dropzone", {
        ref: "dropzone",
        attrs: {
          options: this.dropzoneOptions,
          id: this._uid + "vwdropzone"
        },
        on: {
          "vdropzone-success": this.fileUploaded,
          "vdropzone-file-added": this.fileAdded
        }
      });
    },
        o = [];
  }, function (e, t, n) {
    "use strict";

    var i = n(17),
        o = n(74),
        r = n(0);

    var s = function (e) {
      n(73);
    },
        a = Object(r.a)(i.a, o.a, o.b, !1, s, "data-v-ebce4d12", null);

    t.a = a.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("form", {
        staticClass: "form",
        on: {
          submit: function (t) {
            t.preventDefault(), e.insertTable(t);
          }
        }
      }, [n("label", [n("div", [e._v("Rows")]), e._v(" "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.rows,
          expression: "rows"
        }],
        staticStyle: {
          width: "60px"
        },
        attrs: {
          type: "number",
          min: "2"
        },
        domProps: {
          value: e.rows
        },
        on: {
          input: function (t) {
            t.target.composing || (e.rows = t.target.value);
          }
        }
      })]), e._v(" "), n("label", [n("div", [e._v("Columns")]), e._v(" "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.cols,
          expression: "cols"
        }],
        staticStyle: {
          width: "60px"
        },
        attrs: {
          type: "number",
          min: "2"
        },
        domProps: {
          value: e.cols
        },
        on: {
          input: function (t) {
            t.target.composing || (e.cols = t.target.value);
          }
        }
      })]), e._v(" "), n("button", {
        attrs: {
          type: "submit"
        }
      }, [e._v("Insert")])]);
    },
        o = [];
  }, function (e, t) {
    e.exports = {
      title: "removeFormat",
      action: ["removeFormat"],
      description: "Remove formatting.\nClears headings, bold, italic, underlined text, etc.",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M832 1408l336-384h-768l-336 384h768zm1013-1077q15 34 9.5 71.5t-30.5 65.5l-896 1024q-38 44-96 44h-768q-38 0-69.5-20.5t-47.5-54.5q-15-34-9.5-71.5t30.5-65.5l896-1024q38-44 96-44h768q38 0 69.5 20.5t47.5 54.5z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "separator",
      icon: "<i class='vw-separator'></i>"
    };
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "editr"
      }, [n("div", {
        staticClass: "editr--toolbar"
      }, e._l(e.modules, function (t, i) {
        return n("Btn", {
          key: t.title + i,
          ref: "btn-" + t.title,
          refInFor: !0,
          attrs: {
            module: t,
            options: e.mergedOptions,
            title: t.description || ""
          }
        });
      })), n("div", {
        ref: "content",
        staticClass: "editr--content",
        attrs: {
          contenteditable: "true",
          tabindex: "1",
          placeholder: e.placeholder
        }
      })]);
    },
        o = [];
  }]);
});
},{}],"node_modules/vue-google-signin-button/dist/vue-google-signin-button.min.js":[function(require,module,exports) {
var define;
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&'function'==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};(function(){function a(c){'undefined'!=typeof console&&console.error('[g-signin-button] '+c)}function b(c){c.component('g-signin-button',{name:'g-signin-button',render:function render(d){return d('div',{attrs:{class:'g-signin-button'},ref:'signinBtn'},this.$slots.default)},props:{params:{type:Object,required:!0,default:function _default(){return{}}}},mounted:function mounted(){var _this=this;return window.gapi?this.params.client_id?void window.gapi.load('auth2',function(){var d=window.gapi.auth2.init(_this.params);d.attachClickHandler(_this.$refs.signinBtn,{},function(e){_this.$emit('success',e)},function(e){_this.$emit('error',e),_this.$emit('failure',e)})}):void a('params.client_id must be specified.'):void a('"https://apis.google.com/js/api:client.js" needs to be included as a <script>.')}})}'object'==('undefined'==typeof exports?'undefined':_typeof(exports))?module.exports=b:'function'==typeof define&&define.amd?define([],function(){return b}):window.Vue&&window.Vue.use(b)})();

},{}],"src/main.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _vuesax = _interopRequireDefault(require("vuesax"));

require("vuesax/dist/vuesax.css");

var _vueWysiwyg = _interopRequireDefault(require("vue-wysiwyg"));

var _vueGoogleSigninButton = _interopRequireDefault(require("vue-google-signin-button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Vuesax styles
_vue.default.use(_vueGoogleSigninButton.default);

_vue.default.use(_vuesax.default);

_vue.default.use(_vueWysiwyg.default, {
  hideModules: {
    "table": true,
    "image": false
  },
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  },
  maxHeight: "500px",
  forcePlainTextOnPaste: false
});

new _vue.default(_App.default).$mount('#app');
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./App.vue":"src/App.vue","vuesax":"node_modules/vuesax/dist/vuesax.common.js","vuesax/dist/vuesax.css":"node_modules/vuesax/dist/vuesax.css","vue-wysiwyg":"node_modules/vue-wysiwyg/dist/vueWysiwyg.js","vue-google-signin-button":"node_modules/vue-google-signin-button/dist/vue-google-signin-button.min.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56927" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map