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
     * is not provided, it will be loaded from the global scope.
     */
    function SignalingClient(config) {
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
        utils_1.validateValueNonNil(config.channelARN, 'channelARN');
        utils_1.validateValueNonNil(config.region, 'region');
        utils_1.validateValueNonNil(config.credentials, 'credentials');
        utils_1.validateValueNonNil(config.credentials.accessKeyId, 'credentials.accessKeyId');
        utils_1.validateValueNonNil(config.credentials.secretAccessKey, 'credentials.secretAccessKey');
        _this.config = config;
        _this.requestSigner = new SigV4RequestSigner_1.SigV4RequestSigner(config.region, config.credentials);
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
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var queryParams, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.websocket !== null) {
                            throw new Error('Client is already open or opening');
                        }
                        queryParams = {
                            'X-Amz-ChannelARN': encodeURIComponent(this.config.channelARN),
                        };
                        if (this.config.role === Role_1.Role.VIEWER) {
                            queryParams['X-Amz-ClientId'] = this.config.clientId;
                        }
                        _a = this;
                        _b = WebSocket.bind;
                        return [4 /*yield*/, this.requestSigner.getSignedURL(this.config.channelEndpoint, queryParams, this.config.role)];
                    case 1:
                        _a.websocket = new (_b.apply(WebSocket, [void 0, _c.sent()]))();
                        this.websocket.addEventListener('open', this.onOpen);
                        this.websocket.addEventListener('message', this.onMessage);
                        this.websocket.addEventListener('error', this.onError);
                        this.websocket.addEventListener('close', this.onClose);
                        return [2 /*return*/];
                }
            });
        });
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
     * Typically, only the 'MASTER' role should send an SDP answer.
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var Role_1 = __webpack_require__(/*! kvs-webrtc/Role */ "./src/Role.ts");
/**
 * Utility class for SigV4 signing requests. The AWS SDK cannot be used for this purpose because it does not have support for WebSocket endpoints.
 */
var SigV4RequestSigner = /** @class */ (function () {
    function SigV4RequestSigner(region, credentials, service) {
        if (service === void 0) { service = SigV4RequestSigner.DEFAULT_SERVICE; }
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
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var date, datetimeString, dateString, protocol, urlProtocol, pathStartIndex, host, path, signingHost, signingPath, signedHeaders, signingMethod, credentialScope, canonicalQueryParams, canonicalQueryString, canonicalHeaders, canonicalHeadersString, payloadHash, canonicalRequest, canonicalRequestHash, stringToSign, signingKey, signature, _a, _b, signedQueryParams;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        date = new Date();
                        datetimeString = SigV4RequestSigner.getDateTimeString(date);
                        dateString = SigV4RequestSigner.getDateString(date);
                        protocol = 'wss';
                        urlProtocol = protocol + "://";
                        if (!endpoint.startsWith(urlProtocol)) {
                            throw new Error("Endpoint '" + endpoint + "' is not a secure WebSocket endpoint. It should start with '" + urlProtocol + "'.");
                        }
                        if (endpoint.includes('?')) {
                            throw new Error("Endpoint '" + endpoint + "' should not contain any query parameters.");
                        }
                        pathStartIndex = endpoint.indexOf('/', urlProtocol.length);
                        if (pathStartIndex < 0) {
                            host = endpoint.substring(urlProtocol.length);
                            path = '';
                        }
                        else {
                            host = endpoint.substring(urlProtocol.length, pathStartIndex);
                            path = endpoint.substring(pathStartIndex);
                        }
                        signingHost = 'gmarbhpqgi.execute-api.us-west-2.amazonaws.com';
                        signingPath = role === Role_1.Role.MASTER ? '/prod/v1/connect-as-master' : '/prod/v1/connect-as-viewer';
                        signedHeaders = ['host'].join(';');
                        signingMethod = 'POST';
                        credentialScope = dateString + '/' + this.region + '/' + this.service + '/' + 'aws4_request';
                        canonicalQueryParams = Object.assign({}, queryParams, {
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
                        canonicalQueryString = SigV4RequestSigner.createQueryString(canonicalQueryParams);
                        canonicalHeaders = {
                            host: signingHost,
                        };
                        canonicalHeadersString = SigV4RequestSigner.createHeadersString(canonicalHeaders);
                        return [4 /*yield*/, SigV4RequestSigner.sha256('')];
                    case 1:
                        payloadHash = _c.sent();
                        canonicalRequest = [signingMethod, signingPath, canonicalQueryString, canonicalHeadersString, signedHeaders, payloadHash].join('\n');
                        return [4 /*yield*/, SigV4RequestSigner.sha256(canonicalRequest)];
                    case 2:
                        canonicalRequestHash = _c.sent();
                        stringToSign = [SigV4RequestSigner.DEFAULT_ALGORITHM, datetimeString, credentialScope, canonicalRequestHash].join('\n');
                        return [4 /*yield*/, this.getSignatureKey(dateString)];
                    case 3:
                        signingKey = _c.sent();
                        _b = (_a = SigV4RequestSigner).toHex;
                        return [4 /*yield*/, SigV4RequestSigner.hmac(signingKey, stringToSign)];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 5:
                        signature = _c.sent();
                        signedQueryParams = Object.assign({}, canonicalQueryParams, {
                            'X-Amz-Signature': signature,
                        });
                        // Create signed URL
                        return [2 /*return*/, protocol + '://' + host + path + '?' + SigV4RequestSigner.createQueryString(signedQueryParams)];
                }
            });
        });
    };
    /**
     * Utility method for generating the key to use for calculating the signature. This combines together the date string, region, service name, and secret
     * access key.
     *
     * @see https://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
     */
    SigV4RequestSigner.prototype.getSignatureKey = function (dateString) {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var kDate, kRegion, kService;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SigV4RequestSigner.hmac('AWS4' + this.credentials.secretAccessKey, dateString)];
                    case 1:
                        kDate = _a.sent();
                        return [4 /*yield*/, SigV4RequestSigner.hmac(kDate, this.region)];
                    case 2:
                        kRegion = _a.sent();
                        return [4 /*yield*/, SigV4RequestSigner.hmac(kRegion, this.service)];
                    case 3:
                        kService = _a.sent();
                        return [4 /*yield*/, SigV4RequestSigner.hmac(kService, 'aws4_request')];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
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
    /**
     * Gets a datetime string for the given date to use for signing. For example: "20190927T165210Z"
     * @param date
     */
    SigV4RequestSigner.getDateTimeString = function (date) {
        return date
            .toISOString()
            .replace(/\.\d{3}Z$/, 'Z')
            .replace(/[:\-]/g, '');
    };
    /**
     * Gets a date string for the given date to use for signing. For example: "20190927"
     * @param date
     */
    SigV4RequestSigner.getDateString = function (date) {
        return this.getDateTimeString(date).substring(0, 8);
    };
    SigV4RequestSigner.sha256 = function (message) {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var hashBuffer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, crypto.subtle.digest('SHA-256', this.toUint8Array(message))];
                    case 1:
                        hashBuffer = _a.sent();
                        return [2 /*return*/, this.toHex(hashBuffer)];
                }
            });
        });
    };
    SigV4RequestSigner.hmac = function (key, message) {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var keyBuffer, messageBuffer, cryptoKey;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyBuffer = typeof key === 'string' ? this.toUint8Array(key).buffer : key;
                        messageBuffer = typeof message === 'string' ? this.toUint8Array(message).buffer : message;
                        return [4 /*yield*/, crypto.subtle.importKey('raw', keyBuffer, {
                                name: 'HMAC',
                                hash: {
                                    name: 'SHA-256',
                                },
                            }, false, ['sign'])];
                    case 1:
                        cryptoKey = _a.sent();
                        return [4 /*yield*/, crypto.subtle.sign('HMAC', cryptoKey, messageBuffer)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SigV4RequestSigner.toUint8Array = function (input) {
        return new TextEncoder().encode(input);
    };
    SigV4RequestSigner.toHex = function (buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(function (b) { return b.toString(16).padStart(2, '0'); })
            .join('');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9LVlNXZWJSVEMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvUm9sZS50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvU2lnbmFsaW5nQ2xpZW50LnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvaW50ZXJuYWwvU2lnVjRSZXF1ZXN0U2lnbmVyLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbnRlcm5hbC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUNuRDtBQUNMLENBQUM7QUFSRCxrREFRQztBQUVEOztHQUVHO0FBQ0gsOERBQThEO0FBQzlELFNBQWdCLGdCQUFnQixDQUFDLEtBQVUsRUFBRSxTQUFpQjtJQUMxRCxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUksU0FBUyxvQkFBaUIsQ0FBQyxDQUFDO0tBQ2xEO0FBQ0wsQ0FBQztBQUpELDRDQUlDIiwiZmlsZSI6Imt2cy13ZWJydGMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gJGdldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIFJlZmxlY3RBcHBseSh0aGlzLmxpc3RlbmVyLCB0aGlzLnRhcmdldCwgYXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiLyoqXG4gKiBTaWduYWxpbmcgY2xpZW50IHJvbGUuXG4gKi9cbmV4cG9ydCBlbnVtIFJvbGUge1xuICAgIE1BU1RFUiA9ICdNQVNURVInLFxuICAgIFZJRVdFUiA9ICdWSUVXRVInLFxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuaW1wb3J0IHsgUm9sZSB9IGZyb20gJ2t2cy13ZWJydGMvUm9sZSc7XG5pbXBvcnQgeyBRdWVyeVBhcmFtcywgU2lnVjRSZXF1ZXN0U2lnbmVyIH0gZnJvbSAna3ZzLXdlYnJ0Yy9pbnRlcm5hbC9TaWdWNFJlcXVlc3RTaWduZXInO1xuaW1wb3J0IHsgdmFsaWRhdGVWYWx1ZU5pbCwgdmFsaWRhdGVWYWx1ZU5vbk5pbCB9IGZyb20gJ2t2cy13ZWJydGMvaW50ZXJuYWwvdXRpbHMnO1xuXG5pbnRlcmZhY2UgV2ViU29ja2V0Q2xpZW50Q29uZmlnIHtcbiAgICBjcmVkZW50aWFsczogQVdTLkNyZWRlbnRpYWxzO1xuICAgIGNoYW5uZWxBUk46IHN0cmluZztcbiAgICBjaGFubmVsRW5kcG9pbnQ6IHN0cmluZztcbiAgICByZWdpb246IHN0cmluZztcbiAgICByb2xlOiBSb2xlO1xuICAgIGNsaWVudElkPzogc3RyaW5nO1xufVxuXG5lbnVtIE1lc3NhZ2VUeXBlIHtcbiAgICBTRFBfQU5TV0VSID0gJ1NEUF9BTlNXRVInLFxuICAgIFNEUF9PRkZFUiA9ICdTRFBfT0ZGRVInLFxuICAgIElDRV9DQU5ESURBVEUgPSAnSUNFX0NBTkRJREFURScsXG59XG5cbmludGVyZmFjZSBXZWJTb2NrZXRNZXNzYWdlIHtcbiAgICBtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGU7XG4gICAgbWVzc2FnZVBheWxvYWQ6IHN0cmluZztcbiAgICBzZW5kZXJDbGllbnRJZD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBDbGllbnQgZm9yIHNlbmRpbmcgYW5kIHJlY2VpdmluZyBtZXNzYWdlcyBmcm9tIGEgS1ZTIFNpZ25hbGluZyBDaGFubmVsLiBUaGUgY2xpZW50IGNhbiBvcGVyYXRlIGFzIGVpdGhlciB0aGUgJ01BU1RFUicgb3IgYSAnVklFV0VSJy5cbiAqXG4gKiBUeXBpY2FsbHksIHRoZSAnTUFTVEVSJyBsaXN0ZW5zIGZvciBJQ0UgY2FuZGlkYXRlcyBhbmQgU0RQIG9mZmVycyBhbmQgcmVzcG9uZHMgd2l0aCBhbmQgU0RQIGFuc3dlciBhbmQgaXRzIG93biBJQ0UgY2FuZGlkYXRlcy5cbiAqXG4gKiBUeXBpY2FsbHksIHRoZSAnVklFV0VSJyBzZW5kcyBhbiBTRFAgb2ZmZXIgYW5kIGl0cyBJQ0UgY2FuZGlkYXRlcyBhbmQgdGhlbiBsaXN0ZW5zIGZvciBJQ0UgY2FuZGlkYXRlcyBhbmQgU0RQIGFuc3dlcnMgZnJvbSB0aGUgJ01BU1RFUicuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaWduYWxpbmdDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfQ0xJRU5UX0lEID0gJ01BU1RFUic7XG5cbiAgICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0ID0gbnVsbDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlcXVlc3RTaWduZXI6IFNpZ1Y0UmVxdWVzdFNpZ25lcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogV2ViU29ja2V0Q2xpZW50Q29uZmlnO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkOiB7IFtjbGllbnRJZDogc3RyaW5nXTogb2JqZWN0W10gfSA9IHt9O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaGFzUmVjZWl2ZWRSZW1vdGVTRFBCeUNsaWVudElkOiB7IFtjbGllbnRJZDogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFNpZ25hbGluZ0NsaWVudC4gVGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2lnbmFsaW5nIHNlcnZpY2UgbXVzdCBiZSBvcGVuZWQgd2l0aCB0aGUgJ29wZW4nIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge1dlYlNvY2tldENsaWVudENvbmZpZ30gY29uZmlnIC0gQ29uZmlndXJhdGlvbiBvcHRpb25zIGFuZCBwYXJhbWV0ZXJzLlxuICAgICAqIGlzIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSBsb2FkZWQgZnJvbSB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IFdlYlNvY2tldENsaWVudENvbmZpZykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIFZhbGlkYXRlIGNvbmZpZ1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZywgJ1dlYlNvY2tldENsaWVudENvbmZpZycpO1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5yb2xlLCAncm9sZScpO1xuICAgICAgICBpZiAoY29uZmlnLnJvbGUgPT09IFJvbGUuVklFV0VSKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jbGllbnRJZCwgJ2NsaWVudElkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWxpZGF0ZVZhbHVlTmlsKGNvbmZpZy5jbGllbnRJZCwgJ2NsaWVudElkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY2hhbm5lbEFSTiwgJ2NoYW5uZWxBUk4nKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcucmVnaW9uLCAncmVnaW9uJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNyZWRlbnRpYWxzLCAnY3JlZGVudGlhbHMnKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQsICdjcmVkZW50aWFscy5hY2Nlc3NLZXlJZCcpO1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXksICdjcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXknKTtcblxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgICAgICB0aGlzLnJlcXVlc3RTaWduZXIgPSBuZXcgU2lnVjRSZXF1ZXN0U2lnbmVyKGNvbmZpZy5yZWdpb24sIGNvbmZpZy5jcmVkZW50aWFscyk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudCBoYW5kbGVyc1xuICAgICAgICB0aGlzLm9uT3BlbiA9IHRoaXMub25PcGVuLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25NZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIHNpZ25hbGluZyBzZXJ2aWNlLiBMaXN0ZW4gdG8gdGhlICdvcGVuJyBldmVudCB0byBiZSBub3RpZmllZCB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIG9wZW5lZC5cbiAgICAgKlxuICAgICAqIEFuIGVycm9yIGlzIHRocm93biBpZiB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IG9wZW4gb3IgYmVpbmcgb3BlbmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBvcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy53ZWJzb2NrZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IGlzIGFscmVhZHkgb3BlbiBvciBvcGVuaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFF1ZXJ5UGFyYW1zID0ge1xuICAgICAgICAgICAgJ1gtQW16LUNoYW5uZWxBUk4nOiBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuY2hhbm5lbEFSTiksXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb2xlID09PSBSb2xlLlZJRVdFUikge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ1gtQW16LUNsaWVudElkJ10gPSB0aGlzLmNvbmZpZy5jbGllbnRJZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndlYnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoYXdhaXQgdGhpcy5yZXF1ZXN0U2lnbmVyLmdldFNpZ25lZFVSTCh0aGlzLmNvbmZpZy5jaGFubmVsRW5kcG9pbnQsIHF1ZXJ5UGFyYW1zLCB0aGlzLmNvbmZpZy5yb2xlKSk7XG5cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMub25PcGVuKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uRXJyb3IpO1xuICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBLVlMgU2lnbmFsaW5nIFNlcnZpY2UuIElmIGFscmVhZHkgY2xvc2VkIG9yIGNsb3NpbmcsIG5vIGFjdGlvbiBpcyB0YWtlbi4gTGlzdGVuIHRvIHRoZSAnY2xvc2UnIGV2ZW50IHRvIGJlIG5vdGlmaWVkIHdoZW4gdGhlXG4gICAgICogY29ubmVjdGlvbiBoYXMgYmVlbiBjbG9zZWQuXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy53ZWJzb2NrZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy53ZWJzb2NrZXQucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0LkNMT1NJTkcgJiYgdGhpcy53ZWJzb2NrZXQucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0LkNMT1NFRCkge1xuICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIHRoZSBnaXZlbiBTRFAgb2ZmZXIgdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogVHlwaWNhbGx5LCBvbmx5IHRoZSAnVklFV0VSJyByb2xlIHNob3VsZCBzZW5kIGFuIFNEUCBvZmZlci5cbiAgICAgKiBAcGFyYW0ge1JUQ1Nlc3Npb25EZXNjcmlwdGlvbn0gc2RwT2ZmZXIgLSBTRFAgb2ZmZXIgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3JlY2lwaWVudENsaWVudElkXSAtIElEIG9mIHRoZSBjbGllbnQgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by4gUmVxdWlyZWQgZm9yICdNQVNURVInIHJvbGUuIFNob3VsZCBub3QgYmUgcHJlc2VudCBmb3IgJ1ZJRVdFUicgcm9sZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VuZFNkcE9mZmVyKHNkcE9mZmVyOiBSVENTZXNzaW9uRGVzY3JpcHRpb24sIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuU0RQX09GRkVSLCBzZHBPZmZlci50b0pTT04oKSwgcmVjaXBpZW50Q2xpZW50SWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIHRoZSBnaXZlbiBTRFAgYW5zd2VyIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgb25seSB0aGUgJ01BU1RFUicgcm9sZSBzaG91bGQgc2VuZCBhbiBTRFAgYW5zd2VyLlxuICAgICAqIEBwYXJhbSB7UlRDU2Vzc2lvbkRlc2NyaXB0aW9ufSBzZHBBbnN3ZXIgLSBTRFAgYW5zd2VyIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbmRTZHBBbnN3ZXIoc2RwQW5zd2VyOiBSVENTZXNzaW9uRGVzY3JpcHRpb24sIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuU0RQX0FOU1dFUiwgc2RwQW5zd2VyLnRvSlNPTigpLCByZWNpcGllbnRDbGllbnRJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgdGhlIGdpdmVuIElDRSBjYW5kaWRhdGUgdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogVHlwaWNhbGx5LCBib3RoIHRoZSAnVklFV0VSJyByb2xlIGFuZCAnTUFTVEVSJyByb2xlIHNob3VsZCBzZW5kIElDRSBjYW5kaWRhdGVzLlxuICAgICAqIEBwYXJhbSB7UlRDSWNlQ2FuZGlkYXRlfSBpY2VDYW5kaWRhdGUgLSBJQ0UgY2FuZGlkYXRlIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbmRJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlOiBSVENJY2VDYW5kaWRhdGUsIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuSUNFX0NBTkRJREFURSwgaWNlQ2FuZGlkYXRlLnRvSlNPTigpLCByZWNpcGllbnRDbGllbnRJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBpcyBvcGVuIGFuZCB0aGF0IHRoZSByZWNpcGllbnQgY2xpZW50IGlkIGlzIHByZXNlbnQgaWYgc2VuZGluZyBhcyB0aGUgJ01BU1RFUicuIEVuY29kZXMgdGhlIGdpdmVuIG1lc3NhZ2UgcGF5bG9hZFxuICAgICAqIGFuZCBzZW5kcyB0aGUgbWVzc2FnZSB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZW5kTWVzc2FnZShhY3Rpb246IE1lc3NhZ2VUeXBlLCBtZXNzYWdlUGF5bG9hZDogb2JqZWN0LCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy53ZWJzb2NrZXQgPT09IG51bGwgfHwgdGhpcy53ZWJzb2NrZXQucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHNlbmQgbWVzc2FnZSBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZSBpcyBub3Qgb3Blbi4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbGlkYXRlUmVjaXBpZW50Q2xpZW50SWQocmVjaXBpZW50Q2xpZW50SWQpO1xuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LnNlbmQoXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VQYXlsb2FkOiBTaWduYWxpbmdDbGllbnQuc2VyaWFsaXplSlNPTk9iamVjdEFzQmFzZTY0U3RyaW5nKG1lc3NhZ2VQYXlsb2FkKSxcbiAgICAgICAgICAgICAgICByZWNpcGllbnRDbGllbnRJZDogcmVjaXBpZW50Q2xpZW50SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIFdlYlNvY2tldCBhbmQgcmVtb3ZlcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgY2xlYW51cFdlYlNvY2tldCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMub25PcGVuKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uRXJyb3IpO1xuICAgICAgICB0aGlzLndlYnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgJ29wZW4nIGV2ZW50IGhhbmRsZXIuIEZvcndhcmRzIHRoZSBldmVudCBvbiB0byBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbk9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCAnbWVzc2FnZScgZXZlbnQgaGFuZGxlci4gQXR0ZW1wdHMgdG8gcGFyc2UgdGhlIG1lc3NhZ2UgYW5kIGhhbmRsZSBpdCBhY2NvcmRpbmcgdG8gdGhlIG1lc3NhZ2UgdHlwZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uTWVzc2FnZShldmVudDogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IG1lc3NhZ2VUeXBlLCBtZXNzYWdlUGF5bG9hZCwgc2VuZGVyQ2xpZW50SWQgfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgYXMgV2ViU29ja2V0TWVzc2FnZTtcbiAgICAgICAgICAgIHN3aXRjaCAobWVzc2FnZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNEUF9PRkZFUjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzZHBPZmZlcicsIFNpZ25hbGluZ0NsaWVudC5wYXJzZUpTT05PYmplY3RGcm9tQmFzZTY0U3RyaW5nKG1lc3NhZ2VQYXlsb2FkKSwgc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRQZW5kaW5nSWNlQ2FuZGlkYXRlcyhzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNEUF9BTlNXRVI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc2RwQW5zd2VyJywgU2lnbmFsaW5nQ2xpZW50LnBhcnNlSlNPTk9iamVjdEZyb21CYXNlNjRTdHJpbmcobWVzc2FnZVBheWxvYWQpLCBzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFBlbmRpbmdJY2VDYW5kaWRhdGVzKHNlbmRlckNsaWVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuSUNFX0NBTkRJREFURTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0T3JRdWV1ZUljZUNhbmRpZGF0ZShTaWduYWxpbmdDbGllbnQucGFyc2VKU09OT2JqZWN0RnJvbUJhc2U2NFN0cmluZyhtZXNzYWdlUGF5bG9hZCksIHNlbmRlckNsaWVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpOyAvLyBUT0RPOiBJbXByb3ZlIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGdpdmVuIGJhc2U2NCBlbmNvZGVkIHN0cmluZyBhbmQgZGVjb2RlcyBpdCBpbnRvIGEgSlNPTiBvYmplY3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VKU09OT2JqZWN0RnJvbUJhc2U2NFN0cmluZyhiYXNlNjRFbmNvZGVkU3RyaW5nOiBzdHJpbmcpOiBvYmplY3Qge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShhdG9iKGJhc2U2NEVuY29kZWRTdHJpbmcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyB0aGUgZ2l2ZW4gSlNPTiBvYmplY3QgYW5kIGVuY29kZXMgaXQgaW50byBhIGJhc2U2NCBzdHJpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VyaWFsaXplSlNPTk9iamVjdEFzQmFzZTY0U3RyaW5nKG9iamVjdDogb2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGJ0b2EoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgYW4gU0RQIG9mZmVyIG9yIGFuc3dlciBoYXMgYWxyZWFkeSBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIGdpdmVuIGNsaWVudCwgdGhlbiB0aGUgZ2l2ZW4gSUNFIGNhbmRpZGF0ZSBpcyBlbWl0dGVkLiBPdGhlcndpc2UsIGl0IGlzIHF1ZXVlZCB1cCBmb3Igd2hlblxuICAgICAqIGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaXMgcmVjZWl2ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbWl0T3JRdWV1ZUljZUNhbmRpZGF0ZShpY2VDYW5kaWRhdGU6IG9iamVjdCwgY2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFjbGllbnRJZCkge1xuICAgICAgICAgICAgY2xpZW50SWQgPSBTaWduYWxpbmdDbGllbnQuREVGQVVMVF9DTElFTlRfSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzUmVjZWl2ZWRSZW1vdGVTRFBCeUNsaWVudElkW2NsaWVudElkXSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdpY2VDYW5kaWRhdGUnLCBpY2VDYW5kaWRhdGUsIGNsaWVudElkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZF0ucHVzaChpY2VDYW5kaWRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW55IHBlbmRpbmcgSUNFIGNhbmRpZGF0ZXMgZm9yIHRoZSBnaXZlbiBjbGllbnQgYW5kIHJlY29yZHMgdGhhdCBhbiBTRFAgb2ZmZXIgb3IgYW5zd2VyIGhhcyBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGVtaXRQZW5kaW5nSWNlQ2FuZGlkYXRlcyhjbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIWNsaWVudElkKSB7XG4gICAgICAgICAgICBjbGllbnRJZCA9IFNpZ25hbGluZ0NsaWVudC5ERUZBVUxUX0NMSUVOVF9JRDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhc1JlY2VpdmVkUmVtb3RlU0RQQnlDbGllbnRJZFtjbGllbnRJZF0gPSB0cnVlO1xuICAgICAgICBjb25zdCBwZW5kaW5nSWNlQ2FuZGlkYXRlcyA9IHRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkXTtcbiAgICAgICAgaWYgKCFwZW5kaW5nSWNlQ2FuZGlkYXRlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZF07XG4gICAgICAgIHBlbmRpbmdJY2VDYW5kaWRhdGVzLmZvckVhY2goaWNlQ2FuZGlkYXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnaWNlQ2FuZGlkYXRlJywgaWNlQ2FuZGlkYXRlLCBjbGllbnRJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgcmVjaXBpZW50IGNsaWVudCBpZCBpcyBudWxsIGFuZCB0aGUgY3VycmVudCByb2xlIGlzICdNQVNURVInIGFzIGFsbCBtZXNzYWdlcyBzZW50IGFzICdNQVNURVInIHNob3VsZCBoYXZlIGEgcmVjaXBpZW50IGNsaWVudCBpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUmVjaXBpZW50Q2xpZW50SWQocmVjaXBpZW50Q2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvbGUgPT09IFJvbGUuTUFTVEVSICYmICFyZWNpcGllbnRDbGllbnRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlY2lwaWVudCBjbGllbnQgaWQuIEFzIHRoZSBNQVNURVIsIGFsbCBtZXNzYWdlcyBtdXN0IGJlIHNlbnQgd2l0aCBhIHJlY2lwaWVudCBjbGllbnQgaWQuJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIgJiYgcmVjaXBpZW50Q2xpZW50SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCByZWNpcGllbnQgY2xpZW50IGlkLiBBcyB0aGUgVklFV0VSLCBtZXNzYWdlcyBtdXN0IG5vdCBiZSBzZW50IHdpdGggYSByZWNpcGllbnQgY2xpZW50IGlkLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogJ2Vycm9yJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXJyb3Igb250byBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkVycm9yKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogJ2Nsb3NlJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXJyb3Igb250byBsaXN0ZW5lcnMgYW5kIGNsZWFucyB1cCB0aGUgY29ubmVjdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xlYW51cFdlYlNvY2tldCgpO1xuICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gICAgfVxufVxuIiwiLyohXG5BbWF6b24gS2luZXNpcyBWaWRlbyBTdHJlYW1zIFdlYlJUQyBTREsgZm9yIEphdmFTY3JpcHRcbkNvcHlyaWdodCAyMDE5LTIwMTkgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuVGhpcyBwcm9kdWN0IGluY2x1ZGVzIHNvZnR3YXJlIGRldmVsb3BlZCBhdFxuQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLiAoaHR0cDovL2F3cy5hbWF6b24uY29tLykuXG4qL1xuZXhwb3J0IHsgUm9sZSB9IGZyb20gJ2t2cy13ZWJydGMvUm9sZSc7XG5leHBvcnQgeyBTaWduYWxpbmdDbGllbnQgfSBmcm9tICdrdnMtd2VicnRjL1NpZ25hbGluZ0NsaWVudCc7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gcHJvY2Vzcy5lbnYuUEFDS0FHRV9WRVJTSU9OO1xuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gJ2t2cy13ZWJydGMvUm9sZSc7XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5UGFyYW1zID0geyBbcXVlcnlQYXJhbTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIEhlYWRlcnMgPSB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB9O1xuXG4vKipcbiAqIFV0aWxpdHkgY2xhc3MgZm9yIFNpZ1Y0IHNpZ25pbmcgcmVxdWVzdHMuIFRoZSBBV1MgU0RLIGNhbm5vdCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UgYmVjYXVzZSBpdCBkb2VzIG5vdCBoYXZlIHN1cHBvcnQgZm9yIFdlYlNvY2tldCBlbmRwb2ludHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaWdWNFJlcXVlc3RTaWduZXIge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfQUxHT1JJVEhNID0gJ0FXUzQtSE1BQy1TSEEyNTYnO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfU0VSVklDRSA9ICdraW5lc2lzdmlkZW8nO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSByZWdpb246IHN0cmluZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBBV1MuQ3JlZGVudGlhbHM7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXJ2aWNlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocmVnaW9uOiBzdHJpbmcsIGNyZWRlbnRpYWxzOiBBV1MuQ3JlZGVudGlhbHMsIHNlcnZpY2U6IHN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5ERUZBVUxUX1NFUlZJQ0UpIHtcbiAgICAgICAgdGhpcy5yZWdpb24gPSByZWdpb247XG4gICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscztcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU2lnVjQgc2lnbmVkIFdlYlNvY2tldCBVUkwgZm9yIHRoZSBnaXZlbiBob3N0L2VuZHBvaW50IHdpdGggdGhlIGdpdmVuIHF1ZXJ5IHBhcmFtcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBUaGUgV2ViU29ja2V0IHNlcnZpY2UgZG9tYWluIG5hbWUuIFRPRE86IFRha2UgaW4gYSBjb21wbGV0ZSBlbmRwb2ludCAoZS5nLiB3c3M6Ly9ob3N0OnBvcnQvcGF0aCkgYW5kIHBhcnNlIG91dCB0aGUgaG9zdFxuICAgICAqIEBwYXJhbSBxdWVyeVBhcmFtcyBRdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgaW4gdGhlIFVSTC5cbiAgICAgKiBAcGFyYW0gcm9sZSBUT0RPOiBQcml2YXRlIEJldGEgT25seVxuICAgICAqXG4gICAgICogSW1wbGVtZW50YXRpb24gbm90ZTogUXVlcnkgcGFyYW1ldGVycyBzaG91bGQgYmUgaW4gYWxwaGFiZXRpY2FsIG9yZGVyLlxuICAgICAqXG4gICAgICogTm90ZSBmcm9tIEFXUyBkb2NzOiBcIldoZW4geW91IGFkZCB0aGUgWC1BbXotU2VjdXJpdHktVG9rZW4gcGFyYW1ldGVyIHRvIHRoZSBxdWVyeSBzdHJpbmcsIHNvbWUgc2VydmljZXMgcmVxdWlyZSB0aGF0IHlvdSBpbmNsdWRlIHRoaXMgcGFyYW1ldGVyIGluIHRoZVxuICAgICAqIGNhbm9uaWNhbCAoc2lnbmVkKSByZXF1ZXN0LiBGb3Igb3RoZXIgc2VydmljZXMsIHlvdSBhZGQgdGhpcyBwYXJhbWV0ZXIgYXQgdGhlIGVuZCwgYWZ0ZXIgeW91IGNhbGN1bGF0ZSB0aGUgc2lnbmF0dXJlLiBGb3IgZGV0YWlscywgc2VlIHRoZSBBUEkgcmVmZXJlbmNlXG4gICAgICogZG9jdW1lbnRhdGlvbiBmb3IgdGhhdCBzZXJ2aWNlLlwiIEtWUyBTaWduYWxpbmcgU2VydmljZSByZXF1aXJlcyB0aGF0IHRoZSBzZXNzaW9uIHRva2VuIGlzIGFkZGVkIHRvIHRoZSBjYW5vbmljYWwgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIE5vdGUgZm9yIFByaXZhdGUgQmV0YTogVGhlIG1ldGhvZCwgcGF0aCwgYW5kIGhvc3QgdXNlZCBmb3Igc2lnbmluZyBhcmUgc3BlY2lhbCBvdmVycmlkZXMgdW50aWwgYSBsb25nLXRlcm0gYXV0aGVudGljYXRpb24gc29sdXRpb24gaXMgZXN0YWJsaXNoZWQuXG4gICAgICpcbiAgICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25TMy9sYXRlc3QvQVBJL3NpZ3Y0LXF1ZXJ5LXN0cmluZy1hdXRoLmh0bWxcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3ByZXN0b21hdGlvbi8yNGI5NTllNTEyNTBhODcyM2I5YTVhNGY3MGRjYWUwOFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRTaWduZWRVUkwoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnlQYXJhbXM6IFF1ZXJ5UGFyYW1zLCByb2xlOiBSb2xlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgLy8gUHJlcGFyZSBkYXRlIHN0cmluZ3NcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGRhdGV0aW1lU3RyaW5nID0gU2lnVjRSZXF1ZXN0U2lnbmVyLmdldERhdGVUaW1lU3RyaW5nKGRhdGUpO1xuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gU2lnVjRSZXF1ZXN0U2lnbmVyLmdldERhdGVTdHJpbmcoZGF0ZSk7XG5cbiAgICAgICAgLy8gVmFsaWRhdGUgYW5kIHBhcnNlIGVuZHBvaW50XG4gICAgICAgIGNvbnN0IHByb3RvY29sID0gJ3dzcyc7XG4gICAgICAgIGNvbnN0IHVybFByb3RvY29sID0gYCR7cHJvdG9jb2x9Oi8vYDtcbiAgICAgICAgaWYgKCFlbmRwb2ludC5zdGFydHNXaXRoKHVybFByb3RvY29sKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbmRwb2ludCAnJHtlbmRwb2ludH0nIGlzIG5vdCBhIHNlY3VyZSBXZWJTb2NrZXQgZW5kcG9pbnQuIEl0IHNob3VsZCBzdGFydCB3aXRoICcke3VybFByb3RvY29sfScuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZHBvaW50LmluY2x1ZGVzKCc/JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRW5kcG9pbnQgJyR7ZW5kcG9pbnR9JyBzaG91bGQgbm90IGNvbnRhaW4gYW55IHF1ZXJ5IHBhcmFtZXRlcnMuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0aFN0YXJ0SW5kZXggPSBlbmRwb2ludC5pbmRleE9mKCcvJywgdXJsUHJvdG9jb2wubGVuZ3RoKTtcbiAgICAgICAgbGV0IGhvc3Q7XG4gICAgICAgIGxldCBwYXRoO1xuICAgICAgICBpZiAocGF0aFN0YXJ0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBob3N0ID0gZW5kcG9pbnQuc3Vic3RyaW5nKHVybFByb3RvY29sLmxlbmd0aCk7XG4gICAgICAgICAgICBwYXRoID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob3N0ID0gZW5kcG9pbnQuc3Vic3RyaW5nKHVybFByb3RvY29sLmxlbmd0aCwgcGF0aFN0YXJ0SW5kZXgpO1xuICAgICAgICAgICAgcGF0aCA9IGVuZHBvaW50LnN1YnN0cmluZyhwYXRoU3RhcnRJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaWduaW5nSG9zdCA9ICdnbWFyYmhwcWdpLmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tJzsgLy8gVE9ETzogUHJpdmF0ZSBCZXRhIE9ubHlcbiAgICAgICAgY29uc3Qgc2lnbmluZ1BhdGggPSByb2xlID09PSBSb2xlLk1BU1RFUiA/ICcvcHJvZC92MS9jb25uZWN0LWFzLW1hc3RlcicgOiAnL3Byb2QvdjEvY29ubmVjdC1hcy12aWV3ZXInOyAvLyBUT0RPOiBQcml2YXRlIEJldGEgT25seVxuICAgICAgICBjb25zdCBzaWduZWRIZWFkZXJzID0gWydob3N0J10uam9pbignOycpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgbWV0aG9kXG4gICAgICAgIC8vIGNvbnN0IG1ldGhvZCA9ICdHRVQnOyAvLyBNZXRob2QgaXMgYWx3YXlzIEdFVCBmb3Igc2lnbmVkIFVSTHNcbiAgICAgICAgY29uc3Qgc2lnbmluZ01ldGhvZCA9ICdQT1NUJzsgLy8gVE9ETzogUHJpdmF0ZSBCZXRhIE9ubHk7IE1ldGhvZCBpcyBhbHdheXMgR0VUIGZvciBzaWduZWQgVVJMc1xuXG4gICAgICAgIC8vIFByZXBhcmUgY2Fub25pY2FsIHF1ZXJ5IHN0cmluZ1xuICAgICAgICBjb25zdCBjcmVkZW50aWFsU2NvcGUgPSBkYXRlU3RyaW5nICsgJy8nICsgdGhpcy5yZWdpb24gKyAnLycgKyB0aGlzLnNlcnZpY2UgKyAnLycgKyAnYXdzNF9yZXF1ZXN0JztcbiAgICAgICAgY29uc3QgY2Fub25pY2FsUXVlcnlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeVBhcmFtcywge1xuICAgICAgICAgICAgJ1gtQW16LUFsZ29yaXRobSc6IFNpZ1Y0UmVxdWVzdFNpZ25lci5ERUZBVUxUX0FMR09SSVRITSxcbiAgICAgICAgICAgICdYLUFtei1DcmVkZW50aWFsJzogZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQgKyAnLycgKyBjcmVkZW50aWFsU2NvcGUpLFxuICAgICAgICAgICAgJ1gtQW16LURhdGUnOiBkYXRldGltZVN0cmluZyxcbiAgICAgICAgICAgICdYLUFtei1TaWduZWRIZWFkZXJzJzogc2lnbmVkSGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbikge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjYW5vbmljYWxRdWVyeVBhcmFtcywge1xuICAgICAgICAgICAgICAgICdYLUFtei1TZWN1cml0eS1Ub2tlbic6IGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYW5vbmljYWxRdWVyeVN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5jcmVhdGVRdWVyeVN0cmluZyhjYW5vbmljYWxRdWVyeVBhcmFtcyk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBjYW5vbmljYWwgaGVhZGVyc1xuICAgICAgICBjb25zdCBjYW5vbmljYWxIZWFkZXJzID0ge1xuICAgICAgICAgICAgaG9zdDogc2lnbmluZ0hvc3QsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbEhlYWRlcnNTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlSGVhZGVyc1N0cmluZyhjYW5vbmljYWxIZWFkZXJzKTtcblxuICAgICAgICAvLyBQcmVwYXJlIHBheWxvYWQgaGFzaFxuICAgICAgICBjb25zdCBwYXlsb2FkSGFzaCA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5zaGEyNTYoJycpO1xuXG4gICAgICAgIC8vIENvbWJpbmUgY2Fub25pY2FsIHJlcXVlc3QgcGFydHMgaW50byBhIGNhbm9uaWNhbCByZXF1ZXN0IHN0cmluZyBhbmQgaGFzaFxuICAgICAgICBjb25zdCBjYW5vbmljYWxSZXF1ZXN0ID0gW3NpZ25pbmdNZXRob2QsIHNpZ25pbmdQYXRoLCBjYW5vbmljYWxRdWVyeVN0cmluZywgY2Fub25pY2FsSGVhZGVyc1N0cmluZywgc2lnbmVkSGVhZGVycywgcGF5bG9hZEhhc2hdLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zdCBjYW5vbmljYWxSZXF1ZXN0SGFzaCA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5zaGEyNTYoY2Fub25pY2FsUmVxdWVzdCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHNpZ25hdHVyZVxuICAgICAgICBjb25zdCBzdHJpbmdUb1NpZ24gPSBbU2lnVjRSZXF1ZXN0U2lnbmVyLkRFRkFVTFRfQUxHT1JJVEhNLCBkYXRldGltZVN0cmluZywgY3JlZGVudGlhbFNjb3BlLCBjYW5vbmljYWxSZXF1ZXN0SGFzaF0uam9pbignXFxuJyk7XG4gICAgICAgIGNvbnN0IHNpZ25pbmdLZXkgPSBhd2FpdCB0aGlzLmdldFNpZ25hdHVyZUtleShkYXRlU3RyaW5nKTtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgU2lnVjRSZXF1ZXN0U2lnbmVyLnRvSGV4KGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKHNpZ25pbmdLZXksIHN0cmluZ1RvU2lnbikpO1xuXG4gICAgICAgIC8vIEFkZCBzaWduYXR1cmUgdG8gcXVlcnkgcGFyYW1zXG4gICAgICAgIGNvbnN0IHNpZ25lZFF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2Fub25pY2FsUXVlcnlQYXJhbXMsIHtcbiAgICAgICAgICAgICdYLUFtei1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzaWduZWQgVVJMXG4gICAgICAgIHJldHVybiBwcm90b2NvbCArICc6Ly8nICsgaG9zdCArIHBhdGggKyAnPycgKyBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlUXVlcnlTdHJpbmcoc2lnbmVkUXVlcnlQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBnZW5lcmF0aW5nIHRoZSBrZXkgdG8gdXNlIGZvciBjYWxjdWxhdGluZyB0aGUgc2lnbmF0dXJlLiBUaGlzIGNvbWJpbmVzIHRvZ2V0aGVyIHRoZSBkYXRlIHN0cmluZywgcmVnaW9uLCBzZXJ2aWNlIG5hbWUsIGFuZCBzZWNyZXRcbiAgICAgKiBhY2Nlc3Mga2V5LlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vZ2VuZXJhbC9sYXRlc3QvZ3Ivc2lndjQtY2FsY3VsYXRlLXNpZ25hdHVyZS5odG1sXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRTaWduYXR1cmVLZXkoZGF0ZVN0cmluZzogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICBjb25zdCBrRGF0ZSA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKCdBV1M0JyArIHRoaXMuY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5LCBkYXRlU3RyaW5nKTtcbiAgICAgICAgY29uc3Qga1JlZ2lvbiA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKGtEYXRlLCB0aGlzLnJlZ2lvbik7XG4gICAgICAgIGNvbnN0IGtTZXJ2aWNlID0gYXdhaXQgU2lnVjRSZXF1ZXN0U2lnbmVyLmhtYWMoa1JlZ2lvbiwgdGhpcy5zZXJ2aWNlKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKGtTZXJ2aWNlLCAnYXdzNF9yZXF1ZXN0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIGNvbnZlcnRpbmcgYSBtYXAgb2YgaGVhZGVycyB0byBhIHN0cmluZyBmb3Igc2lnbmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVIZWFkZXJzU3RyaW5nKGhlYWRlcnM6IEhlYWRlcnMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaGVhZGVycylcbiAgICAgICAgICAgIC5tYXAoaGVhZGVyID0+IGAke2hlYWRlcn06JHtoZWFkZXJzW2hlYWRlcl19XFxuYClcbiAgICAgICAgICAgIC5qb2luKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIGNvbnZlcnRpbmcgYSBtYXAgb2YgcXVlcnkgcGFyYW1ldGVycyB0byBhIHN0cmluZyB3aXRoIHRoZSBwYXJhbWV0ZXIgbmFtZXMgc29ydGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcylcbiAgICAgICAgICAgIC5zb3J0KClcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IGAke2tleX09JHtxdWVyeVBhcmFtc1trZXldfWApXG4gICAgICAgICAgICAuam9pbignJicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBkYXRldGltZSBzdHJpbmcgZm9yIHRoZSBnaXZlbiBkYXRlIHRvIHVzZSBmb3Igc2lnbmluZy4gRm9yIGV4YW1wbGU6IFwiMjAxOTA5MjdUMTY1MjEwWlwiXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBnZXREYXRlVGltZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwuXFxkezN9WiQvLCAnWicpXG4gICAgICAgICAgICAucmVwbGFjZSgvWzpcXC1dL2csICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgZGF0ZSBzdHJpbmcgZm9yIHRoZSBnaXZlbiBkYXRlIHRvIHVzZSBmb3Igc2lnbmluZy4gRm9yIGV4YW1wbGU6IFwiMjAxOTA5MjdcIlxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGF0ZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVRpbWVTdHJpbmcoZGF0ZSkuc3Vic3RyaW5nKDAsIDgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHNoYTI1NihtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCB0aGlzLnRvVWludDhBcnJheShtZXNzYWdlKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRvSGV4KGhhc2hCdWZmZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGhtYWMoa2V5OiBzdHJpbmcgfCBBcnJheUJ1ZmZlciwgbWVzc2FnZTogc3RyaW5nIHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XG4gICAgICAgIGNvbnN0IGtleUJ1ZmZlciA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnID8gdGhpcy50b1VpbnQ4QXJyYXkoa2V5KS5idWZmZXIgOiBrZXk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VCdWZmZXIgPSB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgPyB0aGlzLnRvVWludDhBcnJheShtZXNzYWdlKS5idWZmZXIgOiBtZXNzYWdlO1xuICAgICAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcbiAgICAgICAgICAgICdyYXcnLFxuICAgICAgICAgICAga2V5QnVmZmVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdITUFDJyxcbiAgICAgICAgICAgICAgICBoYXNoOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdTSEEtMjU2JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgWydzaWduJ10sXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBhd2FpdCBjcnlwdG8uc3VidGxlLnNpZ24oJ0hNQUMnLCBjcnlwdG9LZXksIG1lc3NhZ2VCdWZmZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRvVWludDhBcnJheShpbnB1dDogc3RyaW5nKTogVWludDhBcnJheSB7XG4gICAgICAgIHJldHVybiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoaW5wdXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRvSGV4KGJ1ZmZlcjogQXJyYXlCdWZmZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShidWZmZXIpKVxuICAgICAgICAgICAgLm1hcChiID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IG51bGwsIHVuZGVmaW5lZCwgb3IgZW1wdHkgc3RyaW5nIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVOb25OaWwodmFsdWU6IGFueSwgdmFsdWVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIG51bGxgKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIHVuZGVmaW5lZGApO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZU5hbWV9IGNhbm5vdCBiZSBlbXB0eWApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgZ2l2ZW4gdmFsdWUgaXMgbnVsbCwgdW5kZWZpbmVkLCBvciBlbXB0eSBzdHJpbmcgYW5kIHRocm93cyBhbiBlcnJvciBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZU5pbCh2YWx1ZTogYW55LCB2YWx1ZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBzaG91bGQgYmUgbnVsbGApO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=