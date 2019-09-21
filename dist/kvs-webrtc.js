/* Amazon Kinesis Video Streams WebRTC SDK for JavaScript v0.0.1
Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

This product includes software developed at
Amazon Web Services, Inc. (http://aws.amazon.com/).

License at kvs-webrtc.LICENSE */
window["KVSWebRTC"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/Role.ts":
/*!*********************!*\
  !*** ./src/Role.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Signaling client role.
 */
var Role;
(function (Role) {
    Role["MASTER"] = "MASTER";
    Role["VIEWER"] = "VIEWER";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./src/SignalingClient.ts":
/*!********************************!*\
  !*** ./src/SignalingClient.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var Role_1 = __webpack_require__(/*! kvs-webrtc/Role */ "./src/Role.ts");
var SigV4RequestSigner_1 = __webpack_require__(/*! kvs-webrtc/internal/SigV4RequestSigner */ "./src/internal/SigV4RequestSigner.ts");
var utils_1 = __webpack_require__(/*! kvs-webrtc/internal/utils */ "./src/internal/utils.ts");
var MessageType;
(function (MessageType) {
    MessageType["SDP_ANSWER"] = "SDP_ANSWER";
    MessageType["SDP_OFFER"] = "SDP_OFFER";
    MessageType["ICE_CANDIDATE"] = "ICE_CANDIDATE";
})(MessageType || (MessageType = {}));
/**
 * Client for sending and receiving messages from a KVS Signaling Channel. The client can operate as either the 'MASTER' or a 'VIEWER'.
 *
 * Typically, the 'MASTER' listens for ICE candidates and SDP offers and responds with and SDP answer and its own ICE candidates.
 *
 * Typically, the 'VIEWER' sends an SDP offer and its ICE candidates and then listens for ICE candidates and SDP answers from the 'MASTER'.
 */
var SignalingClient = /** @class */ (function (_super) {
    tslib_1.__extends(SignalingClient, _super);
    /**
     * Creates a new SignalingClient. The connection with the signaling service must be opened with the 'open' method.
     * @param {WebSocketClientConfig} config - Configuration options and parameters.
     * @param {WebSocketClientDependencies} [dependencies] - Dependencies that are needed for the SignalingClient to function properly. If a required dependency
     * is not provided, it will be loaded from the global scope.
     */
    function SignalingClient(config, dependencies) {
        var _this = _super.call(this) || this;
        _this.websocket = null;
        _this.pendingIceCandidatesByClientId = {};
        _this.hasReceivedRemoteSDPByClientId = {};
        // Validate config
        utils_1.validateValueNonNil(config, 'WebSocketClientConfig');
        utils_1.validateValueNonNil(config.role, 'role');
        if (config.role === Role_1.Role.VIEWER) {
            utils_1.validateValueNonNil(config.clientId, 'clientId');
        }
        else {
            utils_1.validateValueNil(config.clientId, 'clientId');
        }
        utils_1.validateValueNonNil(config.channelName, 'channelName');
        utils_1.validateValueNonNil(config.region, 'region');
        utils_1.validateValueNonNil(config.credentials, 'credentials');
        utils_1.validateValueNonNil(config.credentials.accessKeyId, 'credentials.accessKeyId');
        utils_1.validateValueNonNil(config.credentials.secretAccessKey, 'credentials.secretAccessKey');
        // Get dependencies from config or global scope. Thrown an error if any dependencies are not found.
        var dependenciesWithGlobals = {};
        if (dependencies && dependencies.iso8601) {
            dependenciesWithGlobals.iso8601 = dependencies.iso8601;
        }
        else if (AWS && AWS.util && AWS.util.date && AWS.util.date.iso8601) {
            dependenciesWithGlobals.iso8601 = AWS.util.date.iso8601;
        }
        else {
            SignalingClient.throwMissingDependencyError('AWS.util.date.iso8601');
        }
        if (dependencies && dependencies.hmac) {
            dependenciesWithGlobals.hmac = dependencies.hmac;
        }
        else if (AWS && AWS.util && AWS.util.crypto && AWS.util.crypto.hmac) {
            dependenciesWithGlobals.hmac = AWS.util.crypto.hmac;
        }
        else {
            SignalingClient.throwMissingDependencyError('AWS.util.crypto.hmac');
        }
        if (dependencies && dependencies.sha256) {
            dependenciesWithGlobals.sha256 = dependencies.sha256;
        }
        else if (AWS && AWS.util && AWS.util.crypto && AWS.util.crypto.sha256) {
            dependenciesWithGlobals.sha256 = AWS.util.crypto.sha256;
        }
        else {
            SignalingClient.throwMissingDependencyError('AWS.util.crypto.sha256');
        }
        _this.config = config;
        _this.requestSigner = new SigV4RequestSigner_1.SigV4RequestSigner(dependenciesWithGlobals, config.region, config.credentials);
        // Bind event handlers
        _this.onOpen = _this.onOpen.bind(_this);
        _this.onMessage = _this.onMessage.bind(_this);
        _this.onError = _this.onError.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }
    /**
     * Opens the connection with the signaling service. Listen to the 'open' event to be notified when the connection has been opened.
     *
     * An error is thrown if the connection is already open or being opened.
     */
    SignalingClient.prototype.open = function () {
        if (this.websocket !== null) {
            throw new Error('Client is already open or opening');
        }
        var queryParams = {
            'X-Amz-ChannelName': this.config.channelName,
        };
        if (this.config.role === Role_1.Role.VIEWER) {
            queryParams['X-Amz-ClientId'] = this.config.clientId;
        }
        this.websocket = new WebSocket(this.requestSigner.getSignedURL(this.config.channelEndpoint, queryParams, this.config.role));
        this.websocket.addEventListener('open', this.onOpen);
        this.websocket.addEventListener('message', this.onMessage);
        this.websocket.addEventListener('error', this.onError);
        this.websocket.addEventListener('close', this.onClose);
    };
    /**
     * Closes the connection to the KVS Signaling Service. If already closed or closing, no action is taken. Listen to the 'close' event to be notified when the
     * connection has been closed.
     */
    SignalingClient.prototype.close = function () {
        if (this.websocket === null) {
            return;
        }
        if (this.websocket.readyState !== WebSocket.CLOSING && this.websocket.readyState !== WebSocket.CLOSED) {
            this.websocket.close();
        }
    };
    /**
     * Sends the given SDP offer to the signaling service.
     *
     * Typically, only the 'VIEWER' role should send an SDP offer.
     * @param {RTCSessionDescription} sdpOffer - SDP offer to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     */
    SignalingClient.prototype.sendSdpOffer = function (sdpOffer, recipientClientId) {
        this.sendMessage(MessageType.SDP_OFFER, sdpOffer.toJSON(), recipientClientId);
    };
    /**
     * Sends the given SDP answer to the signaling service.
     *
     * Typically, only the 'MASTER' role should send an SDP offer.
     * @param {RTCSessionDescription} sdpAnswer - SDP answer to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     */
    SignalingClient.prototype.sendSdpAnswer = function (sdpAnswer, recipientClientId) {
        this.sendMessage(MessageType.SDP_ANSWER, sdpAnswer.toJSON(), recipientClientId);
    };
    /**
     * Sends the given ICE candidate to the signaling service.
     *
     * Typically, both the 'VIEWER' role and 'MASTER' role should send ICE candidates.
     * @param {RTCIceCandidate} iceCandidate - ICE candidate to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     */
    SignalingClient.prototype.sendIceCandidate = function (iceCandidate, recipientClientId) {
        this.sendMessage(MessageType.ICE_CANDIDATE, iceCandidate.toJSON(), recipientClientId);
    };
    /**
     * Validates the WebSocket connection is open and that the recipient client id is present if sending as the 'MASTER'. Encodes the given message payload
     * and sends the message to the signaling service.
     */
    SignalingClient.prototype.sendMessage = function (action, messagePayload, recipientClientId) {
        if (this.websocket === null || this.websocket.readyState !== WebSocket.OPEN) {
            throw new Error('Could not send message because the connection to the signaling service is not open.');
        }
        this.validateRecipientClientId(recipientClientId);
        this.websocket.send(JSON.stringify({
            action: action,
            messagePayload: SignalingClient.serializeJSONObjectAsBase64String(messagePayload),
            recipientClientId: recipientClientId || undefined,
        }));
    };
    /**
     * Removes all event listeners from the WebSocket and removes the reference to the WebSocket object.
     */
    SignalingClient.prototype.cleanupWebSocket = function () {
        if (this.websocket === null) {
            return;
        }
        this.websocket.removeEventListener('open', this.onOpen);
        this.websocket.removeEventListener('message', this.onMessage);
        this.websocket.removeEventListener('error', this.onError);
        this.websocket.removeEventListener('close', this.onClose);
        this.websocket = null;
    };
    /**
     * WebSocket 'open' event handler. Forwards the event on to listeners.
     */
    SignalingClient.prototype.onOpen = function () {
        this.emit('open');
    };
    /**
     * WebSocket 'message' event handler. Attempts to parse the message and handle it according to the message type.
     */
    SignalingClient.prototype.onMessage = function (event) {
        try {
            var _a = JSON.parse(event.data), messageType = _a.messageType, messagePayload = _a.messagePayload, senderClientId = _a.senderClientId;
            switch (messageType) {
                case MessageType.SDP_OFFER:
                    this.emit('sdpOffer', SignalingClient.parseJSONObjectFromBase64String(messagePayload), senderClientId);
                    this.emitPendingIceCandidates(senderClientId);
                    return;
                case MessageType.SDP_ANSWER:
                    this.emit('sdpAnswer', SignalingClient.parseJSONObjectFromBase64String(messagePayload), senderClientId);
                    this.emitPendingIceCandidates(senderClientId);
                    return;
                case MessageType.ICE_CANDIDATE:
                    this.emitOrQueueIceCandidate(SignalingClient.parseJSONObjectFromBase64String(messagePayload), senderClientId);
                    return;
            }
        }
        catch (e) {
            console.error(e); // TODO: Improve error handling
        }
        this.emit('message');
    };
    /**
     * Takes the given base64 encoded string and decodes it into a JSON object.
     */
    SignalingClient.parseJSONObjectFromBase64String = function (base64EncodedString) {
        return JSON.parse(atob(base64EncodedString));
    };
    /**
     * Takes the given JSON object and encodes it into a base64 string.
     */
    SignalingClient.serializeJSONObjectAsBase64String = function (object) {
        return btoa(JSON.stringify(object));
    };
    /**
     * If an SDP offer or answer has already been received from the given client, then the given ICE candidate is emitted. Otherwise, it is queued up for when
     * an SDP offer or answer is received.
     */
    SignalingClient.prototype.emitOrQueueIceCandidate = function (iceCandidate, clientId) {
        if (!clientId) {
            clientId = SignalingClient.DEFAULT_CLIENT_ID;
        }
        if (this.hasReceivedRemoteSDPByClientId[clientId]) {
            this.emit('iceCandidate', iceCandidate, clientId);
        }
        else {
            if (!this.pendingIceCandidatesByClientId[clientId]) {
                this.pendingIceCandidatesByClientId[clientId] = [];
            }
            this.pendingIceCandidatesByClientId[clientId].push(iceCandidate);
        }
    };
    /**
     * Emits any pending ICE candidates for the given client and records that an SDP offer or answer has been received from the client.
     */
    SignalingClient.prototype.emitPendingIceCandidates = function (clientId) {
        var _this = this;
        if (!clientId) {
            clientId = SignalingClient.DEFAULT_CLIENT_ID;
        }
        this.hasReceivedRemoteSDPByClientId[clientId] = true;
        var pendingIceCandidates = this.pendingIceCandidatesByClientId[clientId];
        if (!pendingIceCandidates) {
            return;
        }
        delete this.pendingIceCandidatesByClientId[clientId];
        pendingIceCandidates.forEach(function (iceCandidate) {
            _this.emit('iceCandidate', iceCandidate, clientId);
        });
    };
    /**
     * Throws an error if the recipient client id is null and the current role is 'MASTER' as all messages sent as 'MASTER' should have a recipient client id.
     */
    SignalingClient.prototype.validateRecipientClientId = function (recipientClientId) {
        if (this.config.role === Role_1.Role.MASTER && !recipientClientId) {
            throw new Error('Missing recipient client id. As the MASTER, all messages must be sent with a recipient client id.');
        }
        else if (this.config.role === Role_1.Role.VIEWER && recipientClientId) {
            throw new Error('Unexpected recipient client id. As the VIEWER, messages must not be sent with a recipient client id.');
        }
    };
    /**
     * Throw an error with a message indicating that a dependency with the given name is not found.
     */
    SignalingClient.throwMissingDependencyError = function (name) {
        throw new Error("Could not locate \"" + name + "\". It must be provided as a dependency or as a global variable.");
    };
    /**
     * 'error' event handler. Forwards the error onto listeners.
     */
    SignalingClient.prototype.onError = function () {
        this.emit('error');
    };
    /**
     * 'close' event handler. Forwards the error onto listeners and cleans up the connection.
     */
    SignalingClient.prototype.onClose = function () {
        this.cleanupWebSocket();
        this.emit('close');
    };
    SignalingClient.DEFAULT_CLIENT_ID = 'MASTER';
    return SignalingClient;
}(events_1.EventEmitter));
exports.SignalingClient = SignalingClient;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*!
Amazon Kinesis Video Streams WebRTC SDK for JavaScript
Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

This product includes software developed at
Amazon Web Services, Inc. (http://aws.amazon.com/).
*/
var Role_1 = __webpack_require__(/*! kvs-webrtc/Role */ "./src/Role.ts");
exports.Role = Role_1.Role;
var SignalingClient_1 = __webpack_require__(/*! kvs-webrtc/SignalingClient */ "./src/SignalingClient.ts");
exports.SignalingClient = SignalingClient_1.SignalingClient;
exports.VERSION = "0.0.1";


/***/ }),

/***/ "./src/internal/SigV4RequestSigner.ts":
/*!********************************************!*\
  !*** ./src/internal/SigV4RequestSigner.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = __webpack_require__(/*! kvs-webrtc/Role */ "./src/Role.ts");
/**
 * Utility class for SigV4 signing requests. The AWS SDK cannot be used for this purpose because it does not have support for WebSocket endpoints.
 */
var SigV4RequestSigner = /** @class */ (function () {
    function SigV4RequestSigner(dependencies, region, credentials, service) {
        if (service === void 0) { service = SigV4RequestSigner.DEFAULT_SERVICE; }
        this.dependencies = dependencies;
        this.region = region;
        this.credentials = credentials;
        this.service = service;
    }
    /**
     * Creates a SigV4 signed WebSocket URL for the given host/endpoint with the given query params.
     *
     * @param endpoint The WebSocket service domain name. TODO: Take in a complete endpoint (e.g. wss://host:port/path) and parse out the host
     * @param queryParams Query parameters to include in the URL.
     * @param role TODO: Private Beta Only
     *
     * Implementation note: Query parameters should be in alphabetical order.
     *
     * Note from AWS docs: "When you add the X-Amz-Security-Token parameter to the query string, some services require that you include this parameter in the
     * canonical (signed) request. For other services, you add this parameter at the end, after you calculate the signature. For details, see the API reference
     * documentation for that service." KVS Signaling Service requires that the session token is added to the canonical request.
     *
     * Note for Private Beta: The method, path, and host used for signing are special overrides until a long-term authentication solution is established.
     *
     * @see https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
     * @see https://gist.github.com/prestomation/24b959e51250a8723b9a5a4f70dcae08
     */
    SigV4RequestSigner.prototype.getSignedURL = function (endpoint, queryParams, role) {
        // Prepare date strings
        var datetimeString = this.dependencies.iso8601(new Date()).replace(/[:\-]|\.\d{3}/g, '');
        var dateString = datetimeString.substr(0, 8);
        // Validate and parse endpoint
        var protocol = 'wss';
        var urlProtocol = protocol + "://";
        if (!endpoint.startsWith(urlProtocol)) {
            throw new Error("Endpoint '" + endpoint + "' is not a secure WebSocket endpoint. It should start with '" + urlProtocol + "'.");
        }
        if (endpoint.includes('?')) {
            throw new Error("Endpoint '" + endpoint + "' should not contain any query parameters.");
        }
        var pathStartIndex = endpoint.indexOf('/', urlProtocol.length);
        var host;
        var path;
        if (pathStartIndex < 0) {
            host = endpoint.substring(urlProtocol.length);
            path = '';
        }
        else {
            host = endpoint.substring(urlProtocol.length, pathStartIndex);
            path = endpoint.substring(pathStartIndex);
        }
        var signingHost = '63xqwdo880.execute-api.us-west-2.amazonaws.com'; // TODO: Private Beta Only
        var signingPath = role === Role_1.Role.MASTER ? '/prod/v1/connect-as-master' : '/prod/v1/connect-as-viewer'; // TODO: Private Beta Only
        var signedHeaders = ['host'].join(';');
        // Prepare method
        // const method = 'GET'; // Method is always GET for signed URLs
        var signingMethod = 'POST'; // TODO: Private Beta Only; Method is always GET for signed URLs
        // Prepare canonical query string
        var credentialScope = dateString + '/' + this.region + '/' + this.service + '/' + 'aws4_request';
        var canonicalQueryParams = Object.assign({}, queryParams, {
            'X-Amz-Algorithm': SigV4RequestSigner.DEFAULT_ALGORITHM,
            'X-Amz-Credential': encodeURIComponent(this.credentials.accessKeyId + '/' + credentialScope),
            'X-Amz-Date': datetimeString,
            'X-Amz-SignedHeaders': signedHeaders,
        });
        if (this.credentials.sessionToken) {
            Object.assign(canonicalQueryParams, {
                'X-Amz-Security-Token': encodeURIComponent(this.credentials.sessionToken),
            });
        }
        var canonicalQueryString = SigV4RequestSigner.createQueryString(canonicalQueryParams);
        // Prepare canonical headers
        var canonicalHeaders = {
            host: signingHost,
        };
        var canonicalHeadersString = SigV4RequestSigner.createHeadersString(canonicalHeaders);
        // Prepare payload hash
        var payloadHash = this.dependencies.sha256('', 'hex');
        // Combine canonical request parts into a canonical request string and hash
        var canonicalRequest = [signingMethod, signingPath, canonicalQueryString, canonicalHeadersString, signedHeaders, payloadHash].join('\n');
        var canonicalRequestHash = this.dependencies.sha256(canonicalRequest, 'hex');
        // Create signature
        var stringToSign = [SigV4RequestSigner.DEFAULT_ALGORITHM, datetimeString, credentialScope, canonicalRequestHash].join('\n');
        var signingKey = this.getSignatureKey(dateString);
        var signature = this.dependencies.hmac(signingKey, stringToSign, 'hex');
        // Add signature to query params
        var signedQueryParams = Object.assign({}, canonicalQueryParams, {
            'X-Amz-Signature': signature,
        });
        // Create signed URL
        return protocol + '://' + host + path + '?' + SigV4RequestSigner.createQueryString(signedQueryParams);
    };
    /**
     * Utility method for generating the key to use for calculating the signature. This combines together the date string, region, service name, and secret
     * access key.
     *
     * @see https://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
     */
    SigV4RequestSigner.prototype.getSignatureKey = function (dateString) {
        var kDate = this.dependencies.hmac('AWS4' + this.credentials.secretAccessKey, dateString, 'buffer');
        var kRegion = this.dependencies.hmac(kDate, this.region, 'buffer');
        var kService = this.dependencies.hmac(kRegion, this.service, 'buffer');
        return this.dependencies.hmac(kService, 'aws4_request', 'buffer');
    };
    /**
     * Utility method for converting a map of headers to a string for signing.
     */
    SigV4RequestSigner.createHeadersString = function (headers) {
        return Object.keys(headers)
            .map(function (header) { return header + ":" + headers[header] + "\n"; })
            .join();
    };
    /**
     * Utility method for converting a map of query parameters to a string with the parameter names sorted.
     */
    SigV4RequestSigner.createQueryString = function (queryParams) {
        return Object.keys(queryParams)
            .sort()
            .map(function (key) { return key + "=" + queryParams[key]; })
            .join('&');
    };
    SigV4RequestSigner.DEFAULT_ALGORITHM = 'AWS4-HMAC-SHA256';
    SigV4RequestSigner.DEFAULT_SERVICE = 'kinesisvideo';
    return SigV4RequestSigner;
}());
exports.SigV4RequestSigner = SigV4RequestSigner;


/***/ }),

/***/ "./src/internal/utils.ts":
/*!*******************************!*\
  !*** ./src/internal/utils.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Validates that the given value is not null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNonNil(value, valueName) {
    if (value === null) {
        throw new Error(valueName + " cannot be null");
    }
    else if (value === undefined) {
        throw new Error(valueName + " cannot be undefined");
    }
    else if (value === '') {
        throw new Error(valueName + " cannot be empty");
    }
}
exports.validateValueNonNil = validateValueNonNil;
/**
 * Validates that the given value is null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNil(value, valueName) {
    if (value !== null && value !== undefined && value !== '') {
        throw new Error(valueName + " should be null");
    }
}
exports.validateValueNil = validateValueNil;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9LVlNXZWJSVEMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvUm9sZS50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvU2lnbmFsaW5nQ2xpZW50LnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvaW50ZXJuYWwvU2lnVjRSZXF1ZXN0U2lnbmVyLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbnRlcm5hbC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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Q0FBQyxLQUFVLEVBQUUsU0FBaUI7SUFDMUQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtRQUN2RCxNQUFNLElBQUksS0FBSyxDQUFJLFNBQVMsb0JBQWlCLENBQUMsQ0FBQztLQUNsRDtBQUNMLENBQUM7QUFKRCw0Q0FJQyIsImZpbGUiOiJrdnMtd2VicnRjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIi8qKlxuICogU2lnbmFsaW5nIGNsaWVudCByb2xlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgICBNQVNURVIgPSAnTUFTVEVSJyxcbiAgICBWSUVXRVIgPSAnVklFV0VSJyxcbn1cbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCB7IFJvbGUgfSBmcm9tICdrdnMtd2VicnRjL1JvbGUnO1xuaW1wb3J0IHsgUXVlcnlQYXJhbXMsIFNpZ1Y0UmVxdWVzdFNpZ25lciwgU2lnVjRSZXF1ZXN0U2lnbmVyRGVwZW5kZW5jaWVzIH0gZnJvbSAna3ZzLXdlYnJ0Yy9pbnRlcm5hbC9TaWdWNFJlcXVlc3RTaWduZXInO1xuaW1wb3J0IHsgdmFsaWRhdGVWYWx1ZU5pbCwgdmFsaWRhdGVWYWx1ZU5vbk5pbCB9IGZyb20gJ2t2cy13ZWJydGMvaW50ZXJuYWwvdXRpbHMnO1xuXG50eXBlIFdlYlNvY2tldENsaWVudERlcGVuZGVuY2llcyA9IFNpZ1Y0UmVxdWVzdFNpZ25lckRlcGVuZGVuY2llcztcblxuaW50ZXJmYWNlIFdlYlNvY2tldENsaWVudENvbmZpZyB7XG4gICAgY3JlZGVudGlhbHM6IEFXUy5DcmVkZW50aWFscztcbiAgICBjaGFubmVsTmFtZTogc3RyaW5nO1xuICAgIGNoYW5uZWxFbmRwb2ludDogc3RyaW5nO1xuICAgIHJlZ2lvbjogc3RyaW5nO1xuICAgIHJvbGU6IFJvbGU7XG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XG59XG5cbmVudW0gTWVzc2FnZVR5cGUge1xuICAgIFNEUF9BTlNXRVIgPSAnU0RQX0FOU1dFUicsXG4gICAgU0RQX09GRkVSID0gJ1NEUF9PRkZFUicsXG4gICAgSUNFX0NBTkRJREFURSA9ICdJQ0VfQ0FORElEQVRFJyxcbn1cblxuaW50ZXJmYWNlIFdlYlNvY2tldE1lc3NhZ2Uge1xuICAgIG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZTtcbiAgICBtZXNzYWdlUGF5bG9hZDogc3RyaW5nO1xuICAgIHNlbmRlckNsaWVudElkPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIENsaWVudCBmb3Igc2VuZGluZyBhbmQgcmVjZWl2aW5nIG1lc3NhZ2VzIGZyb20gYSBLVlMgU2lnbmFsaW5nIENoYW5uZWwuIFRoZSBjbGllbnQgY2FuIG9wZXJhdGUgYXMgZWl0aGVyIHRoZSAnTUFTVEVSJyBvciBhICdWSUVXRVInLlxuICpcbiAqIFR5cGljYWxseSwgdGhlICdNQVNURVInIGxpc3RlbnMgZm9yIElDRSBjYW5kaWRhdGVzIGFuZCBTRFAgb2ZmZXJzIGFuZCByZXNwb25kcyB3aXRoIGFuZCBTRFAgYW5zd2VyIGFuZCBpdHMgb3duIElDRSBjYW5kaWRhdGVzLlxuICpcbiAqIFR5cGljYWxseSwgdGhlICdWSUVXRVInIHNlbmRzIGFuIFNEUCBvZmZlciBhbmQgaXRzIElDRSBjYW5kaWRhdGVzIGFuZCB0aGVuIGxpc3RlbnMgZm9yIElDRSBjYW5kaWRhdGVzIGFuZCBTRFAgYW5zd2VycyBmcm9tIHRoZSAnTUFTVEVSJy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpZ25hbGluZ0NsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9DTElFTlRfSUQgPSAnTUFTVEVSJztcblxuICAgIHByaXZhdGUgd2Vic29ja2V0OiBXZWJTb2NrZXQgPSBudWxsO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdFNpZ25lcjogU2lnVjRSZXF1ZXN0U2lnbmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBXZWJTb2NrZXRDbGllbnRDb25maWc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWQ6IHsgW2NsaWVudElkOiBzdHJpbmddOiBvYmplY3RbXSB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSBoYXNSZWNlaXZlZFJlbW90ZVNEUEJ5Q2xpZW50SWQ6IHsgW2NsaWVudElkOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgU2lnbmFsaW5nQ2xpZW50LiBUaGUgY29ubmVjdGlvbiB3aXRoIHRoZSBzaWduYWxpbmcgc2VydmljZSBtdXN0IGJlIG9wZW5lZCB3aXRoIHRoZSAnb3BlbicgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7V2ViU29ja2V0Q2xpZW50Q29uZmlnfSBjb25maWcgLSBDb25maWd1cmF0aW9uIG9wdGlvbnMgYW5kIHBhcmFtZXRlcnMuXG4gICAgICogQHBhcmFtIHtXZWJTb2NrZXRDbGllbnREZXBlbmRlbmNpZXN9IFtkZXBlbmRlbmNpZXNdIC0gRGVwZW5kZW5jaWVzIHRoYXQgYXJlIG5lZWRlZCBmb3IgdGhlIFNpZ25hbGluZ0NsaWVudCB0byBmdW5jdGlvbiBwcm9wZXJseS4gSWYgYSByZXF1aXJlZCBkZXBlbmRlbmN5XG4gICAgICogaXMgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIGxvYWRlZCBmcm9tIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogV2ViU29ja2V0Q2xpZW50Q29uZmlnLCBkZXBlbmRlbmNpZXM/OiBXZWJTb2NrZXRDbGllbnREZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBWYWxpZGF0ZSBjb25maWdcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcsICdXZWJTb2NrZXRDbGllbnRDb25maWcnKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcucm9sZSwgJ3JvbGUnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5yb2xlID09PSBSb2xlLlZJRVdFUikge1xuICAgICAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY2xpZW50SWQsICdjbGllbnRJZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsaWRhdGVWYWx1ZU5pbChjb25maWcuY2xpZW50SWQsICdjbGllbnRJZCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNoYW5uZWxOYW1lLCAnY2hhbm5lbE5hbWUnKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcucmVnaW9uLCAncmVnaW9uJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNyZWRlbnRpYWxzLCAnY3JlZGVudGlhbHMnKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQsICdjcmVkZW50aWFscy5hY2Nlc3NLZXlJZCcpO1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXksICdjcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXknKTtcblxuICAgICAgICAvLyBHZXQgZGVwZW5kZW5jaWVzIGZyb20gY29uZmlnIG9yIGdsb2JhbCBzY29wZS4gVGhyb3duIGFuIGVycm9yIGlmIGFueSBkZXBlbmRlbmNpZXMgYXJlIG5vdCBmb3VuZC5cbiAgICAgICAgY29uc3QgZGVwZW5kZW5jaWVzV2l0aEdsb2JhbHM6IFBhcnRpYWw8V2ViU29ja2V0Q2xpZW50RGVwZW5kZW5jaWVzPiA9IHt9O1xuICAgICAgICBpZiAoZGVwZW5kZW5jaWVzICYmIGRlcGVuZGVuY2llcy5pc284NjAxKSB7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXNXaXRoR2xvYmFscy5pc284NjAxID0gZGVwZW5kZW5jaWVzLmlzbzg2MDE7XG4gICAgICAgIH0gZWxzZSBpZiAoQVdTICYmIEFXUy51dGlsICYmIEFXUy51dGlsLmRhdGUgJiYgQVdTLnV0aWwuZGF0ZS5pc284NjAxKSB7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXNXaXRoR2xvYmFscy5pc284NjAxID0gQVdTLnV0aWwuZGF0ZS5pc284NjAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU2lnbmFsaW5nQ2xpZW50LnRocm93TWlzc2luZ0RlcGVuZGVuY3lFcnJvcignQVdTLnV0aWwuZGF0ZS5pc284NjAxJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlcGVuZGVuY2llcyAmJiBkZXBlbmRlbmNpZXMuaG1hYykge1xuICAgICAgICAgICAgZGVwZW5kZW5jaWVzV2l0aEdsb2JhbHMuaG1hYyA9IGRlcGVuZGVuY2llcy5obWFjO1xuICAgICAgICB9IGVsc2UgaWYgKEFXUyAmJiBBV1MudXRpbCAmJiBBV1MudXRpbC5jcnlwdG8gJiYgQVdTLnV0aWwuY3J5cHRvLmhtYWMpIHtcbiAgICAgICAgICAgIGRlcGVuZGVuY2llc1dpdGhHbG9iYWxzLmhtYWMgPSBBV1MudXRpbC5jcnlwdG8uaG1hYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFNpZ25hbGluZ0NsaWVudC50aHJvd01pc3NpbmdEZXBlbmRlbmN5RXJyb3IoJ0FXUy51dGlsLmNyeXB0by5obWFjJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlcGVuZGVuY2llcyAmJiBkZXBlbmRlbmNpZXMuc2hhMjU2KSB7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXNXaXRoR2xvYmFscy5zaGEyNTYgPSBkZXBlbmRlbmNpZXMuc2hhMjU2O1xuICAgICAgICB9IGVsc2UgaWYgKEFXUyAmJiBBV1MudXRpbCAmJiBBV1MudXRpbC5jcnlwdG8gJiYgQVdTLnV0aWwuY3J5cHRvLnNoYTI1Nikge1xuICAgICAgICAgICAgZGVwZW5kZW5jaWVzV2l0aEdsb2JhbHMuc2hhMjU2ID0gQVdTLnV0aWwuY3J5cHRvLnNoYTI1NjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFNpZ25hbGluZ0NsaWVudC50aHJvd01pc3NpbmdEZXBlbmRlbmN5RXJyb3IoJ0FXUy51dGlsLmNyeXB0by5zaGEyNTYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdFNpZ25lciA9IG5ldyBTaWdWNFJlcXVlc3RTaWduZXIoZGVwZW5kZW5jaWVzV2l0aEdsb2JhbHMgYXMgU2lnVjRSZXF1ZXN0U2lnbmVyRGVwZW5kZW5jaWVzLCBjb25maWcucmVnaW9uLCBjb25maWcuY3JlZGVudGlhbHMpO1xuXG4gICAgICAgIC8vIEJpbmQgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgdGhpcy5vbk9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25FcnJvciA9IHRoaXMub25FcnJvci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UgPSB0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgY29ubmVjdGlvbiB3aXRoIHRoZSBzaWduYWxpbmcgc2VydmljZS4gTGlzdGVuIHRvIHRoZSAnb3BlbicgZXZlbnQgdG8gYmUgbm90aWZpZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBoYXMgYmVlbiBvcGVuZWQuXG4gICAgICpcbiAgICAgKiBBbiBlcnJvciBpcyB0aHJvd24gaWYgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeSBvcGVuIG9yIGJlaW5nIG9wZW5lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBpcyBhbHJlYWR5IG9wZW4gb3Igb3BlbmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcyA9IHtcbiAgICAgICAgICAgICdYLUFtei1DaGFubmVsTmFtZSc6IHRoaXMuY29uZmlnLmNoYW5uZWxOYW1lLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydYLUFtei1DbGllbnRJZCddID0gdGhpcy5jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMucmVxdWVzdFNpZ25lci5nZXRTaWduZWRVUkwodGhpcy5jb25maWcuY2hhbm5lbEVuZHBvaW50LCBxdWVyeVBhcmFtcywgdGhpcy5jb25maWcucm9sZSkpO1xuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLm9uT3Blbik7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uQ2xvc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgS1ZTIFNpZ25hbGluZyBTZXJ2aWNlLiBJZiBhbHJlYWR5IGNsb3NlZCBvciBjbG9zaW5nLCBubyBhY3Rpb24gaXMgdGFrZW4uIExpc3RlbiB0byB0aGUgJ2Nsb3NlJyBldmVudCB0byBiZSBub3RpZmllZCB3aGVuIHRoZVxuICAgICAqIGNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0LnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5DTE9TSU5HICYmIHRoaXMud2Vic29ja2V0LnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5DTE9TRUQpIHtcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyB0aGUgZ2l2ZW4gU0RQIG9mZmVyIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgb25seSB0aGUgJ1ZJRVdFUicgcm9sZSBzaG91bGQgc2VuZCBhbiBTRFAgb2ZmZXIuXG4gICAgICogQHBhcmFtIHtSVENTZXNzaW9uRGVzY3JpcHRpb259IHNkcE9mZmVyIC0gU0RQIG9mZmVyIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbmRTZHBPZmZlcihzZHBPZmZlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLlNEUF9PRkZFUiwgc2RwT2ZmZXIudG9KU09OKCksIHJlY2lwaWVudENsaWVudElkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyB0aGUgZ2l2ZW4gU0RQIGFuc3dlciB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBUeXBpY2FsbHksIG9ubHkgdGhlICdNQVNURVInIHJvbGUgc2hvdWxkIHNlbmQgYW4gU0RQIG9mZmVyLlxuICAgICAqIEBwYXJhbSB7UlRDU2Vzc2lvbkRlc2NyaXB0aW9ufSBzZHBBbnN3ZXIgLSBTRFAgYW5zd2VyIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbmRTZHBBbnN3ZXIoc2RwQW5zd2VyOiBSVENTZXNzaW9uRGVzY3JpcHRpb24sIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuU0RQX0FOU1dFUiwgc2RwQW5zd2VyLnRvSlNPTigpLCByZWNpcGllbnRDbGllbnRJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgdGhlIGdpdmVuIElDRSBjYW5kaWRhdGUgdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogVHlwaWNhbGx5LCBib3RoIHRoZSAnVklFV0VSJyByb2xlIGFuZCAnTUFTVEVSJyByb2xlIHNob3VsZCBzZW5kIElDRSBjYW5kaWRhdGVzLlxuICAgICAqIEBwYXJhbSB7UlRDSWNlQ2FuZGlkYXRlfSBpY2VDYW5kaWRhdGUgLSBJQ0UgY2FuZGlkYXRlIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbmRJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlOiBSVENJY2VDYW5kaWRhdGUsIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuSUNFX0NBTkRJREFURSwgaWNlQ2FuZGlkYXRlLnRvSlNPTigpLCByZWNpcGllbnRDbGllbnRJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBpcyBvcGVuIGFuZCB0aGF0IHRoZSByZWNpcGllbnQgY2xpZW50IGlkIGlzIHByZXNlbnQgaWYgc2VuZGluZyBhcyB0aGUgJ01BU1RFUicuIEVuY29kZXMgdGhlIGdpdmVuIG1lc3NhZ2UgcGF5bG9hZFxuICAgICAqIGFuZCBzZW5kcyB0aGUgbWVzc2FnZSB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZW5kTWVzc2FnZShhY3Rpb246IE1lc3NhZ2VUeXBlLCBtZXNzYWdlUGF5bG9hZDogb2JqZWN0LCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy53ZWJzb2NrZXQgPT09IG51bGwgfHwgdGhpcy53ZWJzb2NrZXQucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHNlbmQgbWVzc2FnZSBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZSBpcyBub3Qgb3Blbi4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbGlkYXRlUmVjaXBpZW50Q2xpZW50SWQocmVjaXBpZW50Q2xpZW50SWQpO1xuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LnNlbmQoXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VQYXlsb2FkOiBTaWduYWxpbmdDbGllbnQuc2VyaWFsaXplSlNPTk9iamVjdEFzQmFzZTY0U3RyaW5nKG1lc3NhZ2VQYXlsb2FkKSxcbiAgICAgICAgICAgICAgICByZWNpcGllbnRDbGllbnRJZDogcmVjaXBpZW50Q2xpZW50SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIFdlYlNvY2tldCBhbmQgcmVtb3ZlcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgY2xlYW51cFdlYlNvY2tldCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMub25PcGVuKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uRXJyb3IpO1xuICAgICAgICB0aGlzLndlYnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgJ29wZW4nIGV2ZW50IGhhbmRsZXIuIEZvcndhcmRzIHRoZSBldmVudCBvbiB0byBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbk9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCAnbWVzc2FnZScgZXZlbnQgaGFuZGxlci4gQXR0ZW1wdHMgdG8gcGFyc2UgdGhlIG1lc3NhZ2UgYW5kIGhhbmRsZSBpdCBhY2NvcmRpbmcgdG8gdGhlIG1lc3NhZ2UgdHlwZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uTWVzc2FnZShldmVudDogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IG1lc3NhZ2VUeXBlLCBtZXNzYWdlUGF5bG9hZCwgc2VuZGVyQ2xpZW50SWQgfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgYXMgV2ViU29ja2V0TWVzc2FnZTtcbiAgICAgICAgICAgIHN3aXRjaCAobWVzc2FnZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNEUF9PRkZFUjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzZHBPZmZlcicsIFNpZ25hbGluZ0NsaWVudC5wYXJzZUpTT05PYmplY3RGcm9tQmFzZTY0U3RyaW5nKG1lc3NhZ2VQYXlsb2FkKSwgc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRQZW5kaW5nSWNlQ2FuZGlkYXRlcyhzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNEUF9BTlNXRVI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc2RwQW5zd2VyJywgU2lnbmFsaW5nQ2xpZW50LnBhcnNlSlNPTk9iamVjdEZyb21CYXNlNjRTdHJpbmcobWVzc2FnZVBheWxvYWQpLCBzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFBlbmRpbmdJY2VDYW5kaWRhdGVzKHNlbmRlckNsaWVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuSUNFX0NBTkRJREFURTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0T3JRdWV1ZUljZUNhbmRpZGF0ZShTaWduYWxpbmdDbGllbnQucGFyc2VKU09OT2JqZWN0RnJvbUJhc2U2NFN0cmluZyhtZXNzYWdlUGF5bG9hZCksIHNlbmRlckNsaWVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpOyAvLyBUT0RPOiBJbXByb3ZlIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGdpdmVuIGJhc2U2NCBlbmNvZGVkIHN0cmluZyBhbmQgZGVjb2RlcyBpdCBpbnRvIGEgSlNPTiBvYmplY3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VKU09OT2JqZWN0RnJvbUJhc2U2NFN0cmluZyhiYXNlNjRFbmNvZGVkU3RyaW5nOiBzdHJpbmcpOiBvYmplY3Qge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShhdG9iKGJhc2U2NEVuY29kZWRTdHJpbmcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyB0aGUgZ2l2ZW4gSlNPTiBvYmplY3QgYW5kIGVuY29kZXMgaXQgaW50byBhIGJhc2U2NCBzdHJpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VyaWFsaXplSlNPTk9iamVjdEFzQmFzZTY0U3RyaW5nKG9iamVjdDogb2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGJ0b2EoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgYW4gU0RQIG9mZmVyIG9yIGFuc3dlciBoYXMgYWxyZWFkeSBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIGdpdmVuIGNsaWVudCwgdGhlbiB0aGUgZ2l2ZW4gSUNFIGNhbmRpZGF0ZSBpcyBlbWl0dGVkLiBPdGhlcndpc2UsIGl0IGlzIHF1ZXVlZCB1cCBmb3Igd2hlblxuICAgICAqIGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaXMgcmVjZWl2ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbWl0T3JRdWV1ZUljZUNhbmRpZGF0ZShpY2VDYW5kaWRhdGU6IG9iamVjdCwgY2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFjbGllbnRJZCkge1xuICAgICAgICAgICAgY2xpZW50SWQgPSBTaWduYWxpbmdDbGllbnQuREVGQVVMVF9DTElFTlRfSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzUmVjZWl2ZWRSZW1vdGVTRFBCeUNsaWVudElkW2NsaWVudElkXSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdpY2VDYW5kaWRhdGUnLCBpY2VDYW5kaWRhdGUsIGNsaWVudElkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZF0ucHVzaChpY2VDYW5kaWRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW55IHBlbmRpbmcgSUNFIGNhbmRpZGF0ZXMgZm9yIHRoZSBnaXZlbiBjbGllbnQgYW5kIHJlY29yZHMgdGhhdCBhbiBTRFAgb2ZmZXIgb3IgYW5zd2VyIGhhcyBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGVtaXRQZW5kaW5nSWNlQ2FuZGlkYXRlcyhjbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIWNsaWVudElkKSB7XG4gICAgICAgICAgICBjbGllbnRJZCA9IFNpZ25hbGluZ0NsaWVudC5ERUZBVUxUX0NMSUVOVF9JRDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhc1JlY2VpdmVkUmVtb3RlU0RQQnlDbGllbnRJZFtjbGllbnRJZF0gPSB0cnVlO1xuICAgICAgICBjb25zdCBwZW5kaW5nSWNlQ2FuZGlkYXRlcyA9IHRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkXTtcbiAgICAgICAgaWYgKCFwZW5kaW5nSWNlQ2FuZGlkYXRlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZF07XG4gICAgICAgIHBlbmRpbmdJY2VDYW5kaWRhdGVzLmZvckVhY2goaWNlQ2FuZGlkYXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnaWNlQ2FuZGlkYXRlJywgaWNlQ2FuZGlkYXRlLCBjbGllbnRJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgcmVjaXBpZW50IGNsaWVudCBpZCBpcyBudWxsIGFuZCB0aGUgY3VycmVudCByb2xlIGlzICdNQVNURVInIGFzIGFsbCBtZXNzYWdlcyBzZW50IGFzICdNQVNURVInIHNob3VsZCBoYXZlIGEgcmVjaXBpZW50IGNsaWVudCBpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUmVjaXBpZW50Q2xpZW50SWQocmVjaXBpZW50Q2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvbGUgPT09IFJvbGUuTUFTVEVSICYmICFyZWNpcGllbnRDbGllbnRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlY2lwaWVudCBjbGllbnQgaWQuIEFzIHRoZSBNQVNURVIsIGFsbCBtZXNzYWdlcyBtdXN0IGJlIHNlbnQgd2l0aCBhIHJlY2lwaWVudCBjbGllbnQgaWQuJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIgJiYgcmVjaXBpZW50Q2xpZW50SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCByZWNpcGllbnQgY2xpZW50IGlkLiBBcyB0aGUgVklFV0VSLCBtZXNzYWdlcyBtdXN0IG5vdCBiZSBzZW50IHdpdGggYSByZWNpcGllbnQgY2xpZW50IGlkLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhyb3cgYW4gZXJyb3Igd2l0aCBhIG1lc3NhZ2UgaW5kaWNhdGluZyB0aGF0IGEgZGVwZW5kZW5jeSB3aXRoIHRoZSBnaXZlbiBuYW1lIGlzIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyB0aHJvd01pc3NpbmdEZXBlbmRlbmN5RXJyb3IobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGxvY2F0ZSBcIiR7bmFtZX1cIi4gSXQgbXVzdCBiZSBwcm92aWRlZCBhcyBhIGRlcGVuZGVuY3kgb3IgYXMgYSBnbG9iYWwgdmFyaWFibGUuYCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogJ2Vycm9yJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXJyb3Igb250byBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkVycm9yKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogJ2Nsb3NlJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXJyb3Igb250byBsaXN0ZW5lcnMgYW5kIGNsZWFucyB1cCB0aGUgY29ubmVjdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xlYW51cFdlYlNvY2tldCgpO1xuICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gICAgfVxufVxuIiwiLyohXG5BbWF6b24gS2luZXNpcyBWaWRlbyBTdHJlYW1zIFdlYlJUQyBTREsgZm9yIEphdmFTY3JpcHRcbkNvcHlyaWdodCAyMDE5LTIwMTkgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuVGhpcyBwcm9kdWN0IGluY2x1ZGVzIHNvZnR3YXJlIGRldmVsb3BlZCBhdFxuQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLiAoaHR0cDovL2F3cy5hbWF6b24uY29tLykuXG4qL1xuZXhwb3J0IHsgUm9sZSB9IGZyb20gJ2t2cy13ZWJydGMvUm9sZSc7XG5leHBvcnQgeyBTaWduYWxpbmdDbGllbnQgfSBmcm9tICdrdnMtd2VicnRjL1NpZ25hbGluZ0NsaWVudCc7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gcHJvY2Vzcy5lbnYuUEFDS0FHRV9WRVJTSU9OO1xuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gJ2t2cy13ZWJydGMvUm9sZSc7XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5UGFyYW1zID0geyBbcXVlcnlQYXJhbTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIEhlYWRlcnMgPSB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpZ1Y0UmVxdWVzdFNpZ25lckRlcGVuZGVuY2llcyB7XG4gICAgaXNvODYwMTogdHlwZW9mIEFXUy51dGlsLmRhdGUuaXNvODYwMTtcbiAgICBobWFjOiB0eXBlb2YgQVdTLnV0aWwuY3J5cHRvLmhtYWM7XG4gICAgc2hhMjU2OiB0eXBlb2YgQVdTLnV0aWwuY3J5cHRvLnNoYTI1Njtcbn1cblxuLyoqXG4gKiBVdGlsaXR5IGNsYXNzIGZvciBTaWdWNCBzaWduaW5nIHJlcXVlc3RzLiBUaGUgQVdTIFNESyBjYW5ub3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlIGJlY2F1c2UgaXQgZG9lcyBub3QgaGF2ZSBzdXBwb3J0IGZvciBXZWJTb2NrZXQgZW5kcG9pbnRzLlxuICovXG5leHBvcnQgY2xhc3MgU2lnVjRSZXF1ZXN0U2lnbmVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0FMR09SSVRITSA9ICdBV1M0LUhNQUMtU0hBMjU2JztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1NFUlZJQ0UgPSAna2luZXNpc3ZpZGVvJztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVwZW5kZW5jaWVzOiBTaWdWNFJlcXVlc3RTaWduZXJEZXBlbmRlbmNpZXM7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZWdpb246IHN0cmluZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBBV1MuQ3JlZGVudGlhbHM7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXJ2aWNlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIGRlcGVuZGVuY2llczogU2lnVjRSZXF1ZXN0U2lnbmVyRGVwZW5kZW5jaWVzLFxuICAgICAgICByZWdpb246IHN0cmluZyxcbiAgICAgICAgY3JlZGVudGlhbHM6IEFXUy5DcmVkZW50aWFscyxcbiAgICAgICAgc2VydmljZTogc3RyaW5nID0gU2lnVjRSZXF1ZXN0U2lnbmVyLkRFRkFVTFRfU0VSVklDRSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5kZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXM7XG4gICAgICAgIHRoaXMucmVnaW9uID0gcmVnaW9uO1xuICAgICAgICB0aGlzLmNyZWRlbnRpYWxzID0gY3JlZGVudGlhbHM7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNpZ1Y0IHNpZ25lZCBXZWJTb2NrZXQgVVJMIGZvciB0aGUgZ2l2ZW4gaG9zdC9lbmRwb2ludCB3aXRoIHRoZSBnaXZlbiBxdWVyeSBwYXJhbXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgVGhlIFdlYlNvY2tldCBzZXJ2aWNlIGRvbWFpbiBuYW1lLiBUT0RPOiBUYWtlIGluIGEgY29tcGxldGUgZW5kcG9pbnQgKGUuZy4gd3NzOi8vaG9zdDpwb3J0L3BhdGgpIGFuZCBwYXJzZSBvdXQgdGhlIGhvc3RcbiAgICAgKiBAcGFyYW0gcXVlcnlQYXJhbXMgUXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlIGluIHRoZSBVUkwuXG4gICAgICogQHBhcmFtIHJvbGUgVE9ETzogUHJpdmF0ZSBCZXRhIE9ubHlcbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG5vdGU6IFF1ZXJ5IHBhcmFtZXRlcnMgc2hvdWxkIGJlIGluIGFscGhhYmV0aWNhbCBvcmRlci5cbiAgICAgKlxuICAgICAqIE5vdGUgZnJvbSBBV1MgZG9jczogXCJXaGVuIHlvdSBhZGQgdGhlIFgtQW16LVNlY3VyaXR5LVRva2VuIHBhcmFtZXRlciB0byB0aGUgcXVlcnkgc3RyaW5nLCBzb21lIHNlcnZpY2VzIHJlcXVpcmUgdGhhdCB5b3UgaW5jbHVkZSB0aGlzIHBhcmFtZXRlciBpbiB0aGVcbiAgICAgKiBjYW5vbmljYWwgKHNpZ25lZCkgcmVxdWVzdC4gRm9yIG90aGVyIHNlcnZpY2VzLCB5b3UgYWRkIHRoaXMgcGFyYW1ldGVyIGF0IHRoZSBlbmQsIGFmdGVyIHlvdSBjYWxjdWxhdGUgdGhlIHNpZ25hdHVyZS4gRm9yIGRldGFpbHMsIHNlZSB0aGUgQVBJIHJlZmVyZW5jZVxuICAgICAqIGRvY3VtZW50YXRpb24gZm9yIHRoYXQgc2VydmljZS5cIiBLVlMgU2lnbmFsaW5nIFNlcnZpY2UgcmVxdWlyZXMgdGhhdCB0aGUgc2Vzc2lvbiB0b2tlbiBpcyBhZGRlZCB0byB0aGUgY2Fub25pY2FsIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBOb3RlIGZvciBQcml2YXRlIEJldGE6IFRoZSBtZXRob2QsIHBhdGgsIGFuZCBob3N0IHVzZWQgZm9yIHNpZ25pbmcgYXJlIHNwZWNpYWwgb3ZlcnJpZGVzIHVudGlsIGEgbG9uZy10ZXJtIGF1dGhlbnRpY2F0aW9uIHNvbHV0aW9uIGlzIGVzdGFibGlzaGVkLlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L0FQSS9zaWd2NC1xdWVyeS1zdHJpbmctYXV0aC5odG1sXG4gICAgICogQHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wcmVzdG9tYXRpb24vMjRiOTU5ZTUxMjUwYTg3MjNiOWE1YTRmNzBkY2FlMDhcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0U2lnbmVkVVJMKGVuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcywgcm9sZTogUm9sZSk6IHN0cmluZyB7XG4gICAgICAgIC8vIFByZXBhcmUgZGF0ZSBzdHJpbmdzXG4gICAgICAgIGNvbnN0IGRhdGV0aW1lU3RyaW5nID0gdGhpcy5kZXBlbmRlbmNpZXMuaXNvODYwMShuZXcgRGF0ZSgpKS5yZXBsYWNlKC9bOlxcLV18XFwuXFxkezN9L2csICcnKTtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGRhdGV0aW1lU3RyaW5nLnN1YnN0cigwLCA4KTtcblxuICAgICAgICAvLyBWYWxpZGF0ZSBhbmQgcGFyc2UgZW5kcG9pbnRcbiAgICAgICAgY29uc3QgcHJvdG9jb2wgPSAnd3NzJztcbiAgICAgICAgY29uc3QgdXJsUHJvdG9jb2wgPSBgJHtwcm90b2NvbH06Ly9gO1xuICAgICAgICBpZiAoIWVuZHBvaW50LnN0YXJ0c1dpdGgodXJsUHJvdG9jb2wpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuZHBvaW50ICcke2VuZHBvaW50fScgaXMgbm90IGEgc2VjdXJlIFdlYlNvY2tldCBlbmRwb2ludC4gSXQgc2hvdWxkIHN0YXJ0IHdpdGggJyR7dXJsUHJvdG9jb2x9Jy5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5kcG9pbnQuaW5jbHVkZXMoJz8nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbmRwb2ludCAnJHtlbmRwb2ludH0nIHNob3VsZCBub3QgY29udGFpbiBhbnkgcXVlcnkgcGFyYW1ldGVycy5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRoU3RhcnRJbmRleCA9IGVuZHBvaW50LmluZGV4T2YoJy8nLCB1cmxQcm90b2NvbC5sZW5ndGgpO1xuICAgICAgICBsZXQgaG9zdDtcbiAgICAgICAgbGV0IHBhdGg7XG4gICAgICAgIGlmIChwYXRoU3RhcnRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIGhvc3QgPSBlbmRwb2ludC5zdWJzdHJpbmcodXJsUHJvdG9jb2wubGVuZ3RoKTtcbiAgICAgICAgICAgIHBhdGggPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvc3QgPSBlbmRwb2ludC5zdWJzdHJpbmcodXJsUHJvdG9jb2wubGVuZ3RoLCBwYXRoU3RhcnRJbmRleCk7XG4gICAgICAgICAgICBwYXRoID0gZW5kcG9pbnQuc3Vic3RyaW5nKHBhdGhTdGFydEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25pbmdIb3N0ID0gJzYzeHF3ZG84ODAuZXhlY3V0ZS1hcGkudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20nOyAvLyBUT0RPOiBQcml2YXRlIEJldGEgT25seVxuICAgICAgICBjb25zdCBzaWduaW5nUGF0aCA9IHJvbGUgPT09IFJvbGUuTUFTVEVSID8gJy9wcm9kL3YxL2Nvbm5lY3QtYXMtbWFzdGVyJyA6ICcvcHJvZC92MS9jb25uZWN0LWFzLXZpZXdlcic7IC8vIFRPRE86IFByaXZhdGUgQmV0YSBPbmx5XG4gICAgICAgIGNvbnN0IHNpZ25lZEhlYWRlcnMgPSBbJ2hvc3QnXS5qb2luKCc7Jyk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBtZXRob2RcbiAgICAgICAgLy8gY29uc3QgbWV0aG9kID0gJ0dFVCc7IC8vIE1ldGhvZCBpcyBhbHdheXMgR0VUIGZvciBzaWduZWQgVVJMc1xuICAgICAgICBjb25zdCBzaWduaW5nTWV0aG9kID0gJ1BPU1QnOyAvLyBUT0RPOiBQcml2YXRlIEJldGEgT25seTsgTWV0aG9kIGlzIGFsd2F5cyBHRVQgZm9yIHNpZ25lZCBVUkxzXG5cbiAgICAgICAgLy8gUHJlcGFyZSBjYW5vbmljYWwgcXVlcnkgc3RyaW5nXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxTY29wZSA9IGRhdGVTdHJpbmcgKyAnLycgKyB0aGlzLnJlZ2lvbiArICcvJyArIHRoaXMuc2VydmljZSArICcvJyArICdhd3M0X3JlcXVlc3QnO1xuICAgICAgICBjb25zdCBjYW5vbmljYWxRdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5UGFyYW1zLCB7XG4gICAgICAgICAgICAnWC1BbXotQWxnb3JpdGhtJzogU2lnVjRSZXF1ZXN0U2lnbmVyLkRFRkFVTFRfQUxHT1JJVEhNLFxuICAgICAgICAgICAgJ1gtQW16LUNyZWRlbnRpYWwnOiBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jcmVkZW50aWFscy5hY2Nlc3NLZXlJZCArICcvJyArIGNyZWRlbnRpYWxTY29wZSksXG4gICAgICAgICAgICAnWC1BbXotRGF0ZSc6IGRhdGV0aW1lU3RyaW5nLFxuICAgICAgICAgICAgJ1gtQW16LVNpZ25lZEhlYWRlcnMnOiBzaWduZWRIZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNhbm9uaWNhbFF1ZXJ5UGFyYW1zLCB7XG4gICAgICAgICAgICAgICAgJ1gtQW16LVNlY3VyaXR5LVRva2VuJzogZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbFF1ZXJ5U3RyaW5nID0gU2lnVjRSZXF1ZXN0U2lnbmVyLmNyZWF0ZVF1ZXJ5U3RyaW5nKGNhbm9uaWNhbFF1ZXJ5UGFyYW1zKTtcblxuICAgICAgICAvLyBQcmVwYXJlIGNhbm9uaWNhbCBoZWFkZXJzXG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbEhlYWRlcnMgPSB7XG4gICAgICAgICAgICBob3N0OiBzaWduaW5nSG9zdCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2Fub25pY2FsSGVhZGVyc1N0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5jcmVhdGVIZWFkZXJzU3RyaW5nKGNhbm9uaWNhbEhlYWRlcnMpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgcGF5bG9hZCBoYXNoXG4gICAgICAgIGNvbnN0IHBheWxvYWRIYXNoID0gdGhpcy5kZXBlbmRlbmNpZXMuc2hhMjU2KCcnLCAnaGV4Jyk7XG5cbiAgICAgICAgLy8gQ29tYmluZSBjYW5vbmljYWwgcmVxdWVzdCBwYXJ0cyBpbnRvIGEgY2Fub25pY2FsIHJlcXVlc3Qgc3RyaW5nIGFuZCBoYXNoXG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbFJlcXVlc3QgPSBbc2lnbmluZ01ldGhvZCwgc2lnbmluZ1BhdGgsIGNhbm9uaWNhbFF1ZXJ5U3RyaW5nLCBjYW5vbmljYWxIZWFkZXJzU3RyaW5nLCBzaWduZWRIZWFkZXJzLCBwYXlsb2FkSGFzaF0uam9pbignXFxuJyk7XG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbFJlcXVlc3RIYXNoID0gdGhpcy5kZXBlbmRlbmNpZXMuc2hhMjU2KGNhbm9uaWNhbFJlcXVlc3QsICdoZXgnKTtcblxuICAgICAgICAvLyBDcmVhdGUgc2lnbmF0dXJlXG4gICAgICAgIGNvbnN0IHN0cmluZ1RvU2lnbiA9IFtTaWdWNFJlcXVlc3RTaWduZXIuREVGQVVMVF9BTEdPUklUSE0sIGRhdGV0aW1lU3RyaW5nLCBjcmVkZW50aWFsU2NvcGUsIGNhbm9uaWNhbFJlcXVlc3RIYXNoXS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc3Qgc2lnbmluZ0tleSA9IHRoaXMuZ2V0U2lnbmF0dXJlS2V5KGRhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSB0aGlzLmRlcGVuZGVuY2llcy5obWFjKHNpZ25pbmdLZXksIHN0cmluZ1RvU2lnbiwgJ2hleCcpO1xuXG4gICAgICAgIC8vIEFkZCBzaWduYXR1cmUgdG8gcXVlcnkgcGFyYW1zXG4gICAgICAgIGNvbnN0IHNpZ25lZFF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2Fub25pY2FsUXVlcnlQYXJhbXMsIHtcbiAgICAgICAgICAgICdYLUFtei1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzaWduZWQgVVJMXG4gICAgICAgIHJldHVybiBwcm90b2NvbCArICc6Ly8nICsgaG9zdCArIHBhdGggKyAnPycgKyBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlUXVlcnlTdHJpbmcoc2lnbmVkUXVlcnlQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBnZW5lcmF0aW5nIHRoZSBrZXkgdG8gdXNlIGZvciBjYWxjdWxhdGluZyB0aGUgc2lnbmF0dXJlLiBUaGlzIGNvbWJpbmVzIHRvZ2V0aGVyIHRoZSBkYXRlIHN0cmluZywgcmVnaW9uLCBzZXJ2aWNlIG5hbWUsIGFuZCBzZWNyZXRcbiAgICAgKiBhY2Nlc3Mga2V5LlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vZ2VuZXJhbC9sYXRlc3QvZ3Ivc2lndjQtY2FsY3VsYXRlLXNpZ25hdHVyZS5odG1sXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTaWduYXR1cmVLZXkoZGF0ZVN0cmluZzogc3RyaW5nKTogQnVmZmVyIHtcbiAgICAgICAgY29uc3Qga0RhdGUgPSB0aGlzLmRlcGVuZGVuY2llcy5obWFjKCdBV1M0JyArIHRoaXMuY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5LCBkYXRlU3RyaW5nLCAnYnVmZmVyJyk7XG4gICAgICAgIGNvbnN0IGtSZWdpb24gPSB0aGlzLmRlcGVuZGVuY2llcy5obWFjKGtEYXRlLCB0aGlzLnJlZ2lvbiwgJ2J1ZmZlcicpO1xuICAgICAgICBjb25zdCBrU2VydmljZSA9IHRoaXMuZGVwZW5kZW5jaWVzLmhtYWMoa1JlZ2lvbiwgdGhpcy5zZXJ2aWNlLCAnYnVmZmVyJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlcGVuZGVuY2llcy5obWFjKGtTZXJ2aWNlLCAnYXdzNF9yZXF1ZXN0JywgJ2J1ZmZlcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBjb252ZXJ0aW5nIGEgbWFwIG9mIGhlYWRlcnMgdG8gYSBzdHJpbmcgZm9yIHNpZ25pbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlSGVhZGVyc1N0cmluZyhoZWFkZXJzOiBIZWFkZXJzKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpXG4gICAgICAgICAgICAubWFwKGhlYWRlciA9PiBgJHtoZWFkZXJ9OiR7aGVhZGVyc1toZWFkZXJdfVxcbmApXG4gICAgICAgICAgICAuam9pbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBjb252ZXJ0aW5nIGEgbWFwIG9mIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYSBzdHJpbmcgd2l0aCB0aGUgcGFyYW1ldGVyIG5hbWVzIHNvcnRlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVRdWVyeVN0cmluZyhxdWVyeVBhcmFtczogUXVlcnlQYXJhbXMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpXG4gICAgICAgICAgICAuc29ydCgpXG4gICAgICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9PSR7cXVlcnlQYXJhbXNba2V5XX1gKVxuICAgICAgICAgICAgLmpvaW4oJyYnKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlcyB0aGF0IHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgbnVsbCwgdW5kZWZpbmVkLCBvciBlbXB0eSBzdHJpbmcgYW5kIHRocm93cyBhbiBlcnJvciBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZU5vbk5pbCh2YWx1ZTogYW55LCB2YWx1ZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBjYW5ub3QgYmUgbnVsbGApO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBjYW5ub3QgYmUgdW5kZWZpbmVkYCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIGVtcHR5YCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IHRoZSBnaXZlbiB2YWx1ZSBpcyBudWxsLCB1bmRlZmluZWQsIG9yIGVtcHR5IHN0cmluZyBhbmQgdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVZhbHVlTmlsKHZhbHVlOiBhbnksIHZhbHVlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZU5hbWV9IHNob3VsZCBiZSBudWxsYCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==