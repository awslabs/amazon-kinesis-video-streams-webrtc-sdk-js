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
        utils_1.validateValueNonNil(config.channelName, 'channelName');
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
                            'X-Amz-ChannelName': this.config.channelName,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9LVlNXZWJSVEMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvUm9sZS50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvU2lnbmFsaW5nQ2xpZW50LnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvaW50ZXJuYWwvU2lnVjRSZXF1ZXN0U2lnbmVyLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbnRlcm5hbC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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UkQsa0RBUUM7QUFFRDs7R0FFRztBQUNILDhEQUE4RDtBQUM5RCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFVLEVBQUUsU0FBaUI7SUFDMUQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtRQUN2RCxNQUFNLElBQUksS0FBSyxDQUFJLFNBQVMsb0JBQWlCLENBQUMsQ0FBQztLQUNsRDtBQUNMLENBQUM7QUFKRCw0Q0FJQyIsImZpbGUiOiJrdnMtd2VicnRjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIi8qKlxuICogU2lnbmFsaW5nIGNsaWVudCByb2xlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgICBNQVNURVIgPSAnTUFTVEVSJyxcbiAgICBWSUVXRVIgPSAnVklFV0VSJyxcbn1cbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCB7IFJvbGUgfSBmcm9tICdrdnMtd2VicnRjL1JvbGUnO1xuaW1wb3J0IHsgUXVlcnlQYXJhbXMsIFNpZ1Y0UmVxdWVzdFNpZ25lciB9IGZyb20gJ2t2cy13ZWJydGMvaW50ZXJuYWwvU2lnVjRSZXF1ZXN0U2lnbmVyJztcbmltcG9ydCB7IHZhbGlkYXRlVmFsdWVOaWwsIHZhbGlkYXRlVmFsdWVOb25OaWwgfSBmcm9tICdrdnMtd2VicnRjL2ludGVybmFsL3V0aWxzJztcblxuaW50ZXJmYWNlIFdlYlNvY2tldENsaWVudENvbmZpZyB7XG4gICAgY3JlZGVudGlhbHM6IEFXUy5DcmVkZW50aWFscztcbiAgICBjaGFubmVsTmFtZTogc3RyaW5nO1xuICAgIGNoYW5uZWxFbmRwb2ludDogc3RyaW5nO1xuICAgIHJlZ2lvbjogc3RyaW5nO1xuICAgIHJvbGU6IFJvbGU7XG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XG59XG5cbmVudW0gTWVzc2FnZVR5cGUge1xuICAgIFNEUF9BTlNXRVIgPSAnU0RQX0FOU1dFUicsXG4gICAgU0RQX09GRkVSID0gJ1NEUF9PRkZFUicsXG4gICAgSUNFX0NBTkRJREFURSA9ICdJQ0VfQ0FORElEQVRFJyxcbn1cblxuaW50ZXJmYWNlIFdlYlNvY2tldE1lc3NhZ2Uge1xuICAgIG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZTtcbiAgICBtZXNzYWdlUGF5bG9hZDogc3RyaW5nO1xuICAgIHNlbmRlckNsaWVudElkPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIENsaWVudCBmb3Igc2VuZGluZyBhbmQgcmVjZWl2aW5nIG1lc3NhZ2VzIGZyb20gYSBLVlMgU2lnbmFsaW5nIENoYW5uZWwuIFRoZSBjbGllbnQgY2FuIG9wZXJhdGUgYXMgZWl0aGVyIHRoZSAnTUFTVEVSJyBvciBhICdWSUVXRVInLlxuICpcbiAqIFR5cGljYWxseSwgdGhlICdNQVNURVInIGxpc3RlbnMgZm9yIElDRSBjYW5kaWRhdGVzIGFuZCBTRFAgb2ZmZXJzIGFuZCByZXNwb25kcyB3aXRoIGFuZCBTRFAgYW5zd2VyIGFuZCBpdHMgb3duIElDRSBjYW5kaWRhdGVzLlxuICpcbiAqIFR5cGljYWxseSwgdGhlICdWSUVXRVInIHNlbmRzIGFuIFNEUCBvZmZlciBhbmQgaXRzIElDRSBjYW5kaWRhdGVzIGFuZCB0aGVuIGxpc3RlbnMgZm9yIElDRSBjYW5kaWRhdGVzIGFuZCBTRFAgYW5zd2VycyBmcm9tIHRoZSAnTUFTVEVSJy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpZ25hbGluZ0NsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9DTElFTlRfSUQgPSAnTUFTVEVSJztcblxuICAgIHByaXZhdGUgd2Vic29ja2V0OiBXZWJTb2NrZXQgPSBudWxsO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdFNpZ25lcjogU2lnVjRSZXF1ZXN0U2lnbmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBXZWJTb2NrZXRDbGllbnRDb25maWc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWQ6IHsgW2NsaWVudElkOiBzdHJpbmddOiBvYmplY3RbXSB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSBoYXNSZWNlaXZlZFJlbW90ZVNEUEJ5Q2xpZW50SWQ6IHsgW2NsaWVudElkOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgU2lnbmFsaW5nQ2xpZW50LiBUaGUgY29ubmVjdGlvbiB3aXRoIHRoZSBzaWduYWxpbmcgc2VydmljZSBtdXN0IGJlIG9wZW5lZCB3aXRoIHRoZSAnb3BlbicgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7V2ViU29ja2V0Q2xpZW50Q29uZmlnfSBjb25maWcgLSBDb25maWd1cmF0aW9uIG9wdGlvbnMgYW5kIHBhcmFtZXRlcnMuXG4gICAgICogaXMgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIGxvYWRlZCBmcm9tIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogV2ViU29ja2V0Q2xpZW50Q29uZmlnKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gVmFsaWRhdGUgY29uZmlnXG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLCAnV2ViU29ja2V0Q2xpZW50Q29uZmlnJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLnJvbGUsICdyb2xlJyk7XG4gICAgICAgIGlmIChjb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNsaWVudElkLCAnY2xpZW50SWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbGlkYXRlVmFsdWVOaWwoY29uZmlnLmNsaWVudElkLCAnY2xpZW50SWQnKTtcbiAgICAgICAgfVxuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jaGFubmVsTmFtZSwgJ2NoYW5uZWxOYW1lJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLnJlZ2lvbiwgJ3JlZ2lvbicpO1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jcmVkZW50aWFscywgJ2NyZWRlbnRpYWxzJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkLCAnY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQnKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5LCAnY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5Jyk7XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0U2lnbmVyID0gbmV3IFNpZ1Y0UmVxdWVzdFNpZ25lcihjb25maWcucmVnaW9uLCBjb25maWcuY3JlZGVudGlhbHMpO1xuXG4gICAgICAgIC8vIEJpbmQgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgdGhpcy5vbk9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25FcnJvciA9IHRoaXMub25FcnJvci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UgPSB0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgY29ubmVjdGlvbiB3aXRoIHRoZSBzaWduYWxpbmcgc2VydmljZS4gTGlzdGVuIHRvIHRoZSAnb3BlbicgZXZlbnQgdG8gYmUgbm90aWZpZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBoYXMgYmVlbiBvcGVuZWQuXG4gICAgICpcbiAgICAgKiBBbiBlcnJvciBpcyB0aHJvd24gaWYgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeSBvcGVuIG9yIGJlaW5nIG9wZW5lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgb3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBpcyBhbHJlYWR5IG9wZW4gb3Igb3BlbmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcyA9IHtcbiAgICAgICAgICAgICdYLUFtei1DaGFubmVsTmFtZSc6IHRoaXMuY29uZmlnLmNoYW5uZWxOYW1lLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydYLUFtei1DbGllbnRJZCddID0gdGhpcy5jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KGF3YWl0IHRoaXMucmVxdWVzdFNpZ25lci5nZXRTaWduZWRVUkwodGhpcy5jb25maWcuY2hhbm5lbEVuZHBvaW50LCBxdWVyeVBhcmFtcywgdGhpcy5jb25maWcucm9sZSkpO1xuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLm9uT3Blbik7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uQ2xvc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgS1ZTIFNpZ25hbGluZyBTZXJ2aWNlLiBJZiBhbHJlYWR5IGNsb3NlZCBvciBjbG9zaW5nLCBubyBhY3Rpb24gaXMgdGFrZW4uIExpc3RlbiB0byB0aGUgJ2Nsb3NlJyBldmVudCB0byBiZSBub3RpZmllZCB3aGVuIHRoZVxuICAgICAqIGNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0LnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5DTE9TSU5HICYmIHRoaXMud2Vic29ja2V0LnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5DTE9TRUQpIHtcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyB0aGUgZ2l2ZW4gU0RQIG9mZmVyIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgb25seSB0aGUgJ1ZJRVdFUicgcm9sZSBzaG91bGQgc2VuZCBhbiBTRFAgb2ZmZXIuXG4gICAgICogQHBhcmFtIHtSVENTZXNzaW9uRGVzY3JpcHRpb259IHNkcE9mZmVyIC0gU0RQIG9mZmVyIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbmRTZHBPZmZlcihzZHBPZmZlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLlNEUF9PRkZFUiwgc2RwT2ZmZXIudG9KU09OKCksIHJlY2lwaWVudENsaWVudElkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyB0aGUgZ2l2ZW4gU0RQIGFuc3dlciB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBUeXBpY2FsbHksIG9ubHkgdGhlICdNQVNURVInIHJvbGUgc2hvdWxkIHNlbmQgYW4gU0RQIGFuc3dlci5cbiAgICAgKiBAcGFyYW0ge1JUQ1Nlc3Npb25EZXNjcmlwdGlvbn0gc2RwQW5zd2VyIC0gU0RQIGFuc3dlciB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZW5kU2RwQW5zd2VyKHNkcEFuc3dlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLlNEUF9BTlNXRVIsIHNkcEFuc3dlci50b0pTT04oKSwgcmVjaXBpZW50Q2xpZW50SWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIHRoZSBnaXZlbiBJQ0UgY2FuZGlkYXRlIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgYm90aCB0aGUgJ1ZJRVdFUicgcm9sZSBhbmQgJ01BU1RFUicgcm9sZSBzaG91bGQgc2VuZCBJQ0UgY2FuZGlkYXRlcy5cbiAgICAgKiBAcGFyYW0ge1JUQ0ljZUNhbmRpZGF0ZX0gaWNlQ2FuZGlkYXRlIC0gSUNFIGNhbmRpZGF0ZSB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZW5kSWNlQ2FuZGlkYXRlKGljZUNhbmRpZGF0ZTogUlRDSWNlQ2FuZGlkYXRlLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLklDRV9DQU5ESURBVEUsIGljZUNhbmRpZGF0ZS50b0pTT04oKSwgcmVjaXBpZW50Q2xpZW50SWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gaXMgb3BlbiBhbmQgdGhhdCB0aGUgcmVjaXBpZW50IGNsaWVudCBpZCBpcyBwcmVzZW50IGlmIHNlbmRpbmcgYXMgdGhlICdNQVNURVInLiBFbmNvZGVzIHRoZSBnaXZlbiBtZXNzYWdlIHBheWxvYWRcbiAgICAgKiBhbmQgc2VuZHMgdGhlIG1lc3NhZ2UgdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UoYWN0aW9uOiBNZXNzYWdlVHlwZSwgbWVzc2FnZVBheWxvYWQ6IG9iamVjdCwgcmVjaXBpZW50Q2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ID09PSBudWxsIHx8IHRoaXMud2Vic29ja2V0LnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBzZW5kIG1lc3NhZ2UgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UgaXMgbm90IG9wZW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudENsaWVudElkKHJlY2lwaWVudENsaWVudElkKTtcblxuICAgICAgICB0aGlzLndlYnNvY2tldC5zZW5kKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgICAgICBtZXNzYWdlUGF5bG9hZDogU2lnbmFsaW5nQ2xpZW50LnNlcmlhbGl6ZUpTT05PYmplY3RBc0Jhc2U2NFN0cmluZyhtZXNzYWdlUGF5bG9hZCksXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50Q2xpZW50SWQ6IHJlY2lwaWVudENsaWVudElkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBXZWJTb2NrZXQgYW5kIHJlbW92ZXMgdGhlIHJlZmVyZW5jZSB0byB0aGUgV2ViU29ja2V0IG9iamVjdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNsZWFudXBXZWJTb2NrZXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLndlYnNvY2tldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2Vic29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLm9uT3Blbik7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uQ2xvc2UpO1xuICAgICAgICB0aGlzLndlYnNvY2tldCA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2ViU29ja2V0ICdvcGVuJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXZlbnQgb24gdG8gbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgb25PcGVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVtaXQoJ29wZW4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgJ21lc3NhZ2UnIGV2ZW50IGhhbmRsZXIuIEF0dGVtcHRzIHRvIHBhcnNlIHRoZSBtZXNzYWdlIGFuZCBoYW5kbGUgaXQgYWNjb3JkaW5nIHRvIHRoZSBtZXNzYWdlIHR5cGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbk1lc3NhZ2UoZXZlbnQ6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBtZXNzYWdlVHlwZSwgbWVzc2FnZVBheWxvYWQsIHNlbmRlckNsaWVudElkIH0gPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpIGFzIFdlYlNvY2tldE1lc3NhZ2U7XG4gICAgICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5TRFBfT0ZGRVI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc2RwT2ZmZXInLCBTaWduYWxpbmdDbGllbnQucGFyc2VKU09OT2JqZWN0RnJvbUJhc2U2NFN0cmluZyhtZXNzYWdlUGF5bG9hZCksIHNlbmRlckNsaWVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UGVuZGluZ0ljZUNhbmRpZGF0ZXMoc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5TRFBfQU5TV0VSOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3NkcEFuc3dlcicsIFNpZ25hbGluZ0NsaWVudC5wYXJzZUpTT05PYmplY3RGcm9tQmFzZTY0U3RyaW5nKG1lc3NhZ2VQYXlsb2FkKSwgc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRQZW5kaW5nSWNlQ2FuZGlkYXRlcyhzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLklDRV9DQU5ESURBVEU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdE9yUXVldWVJY2VDYW5kaWRhdGUoU2lnbmFsaW5nQ2xpZW50LnBhcnNlSlNPTk9iamVjdEZyb21CYXNlNjRTdHJpbmcobWVzc2FnZVBheWxvYWQpLCBzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gVE9ETzogSW1wcm92ZSBlcnJvciBoYW5kbGluZ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VzIHRoZSBnaXZlbiBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgYW5kIGRlY29kZXMgaXQgaW50byBhIEpTT04gb2JqZWN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlSlNPTk9iamVjdEZyb21CYXNlNjRTdHJpbmcoYmFzZTY0RW5jb2RlZFN0cmluZzogc3RyaW5nKTogb2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYXRvYihiYXNlNjRFbmNvZGVkU3RyaW5nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGdpdmVuIEpTT04gb2JqZWN0IGFuZCBlbmNvZGVzIGl0IGludG8gYSBiYXNlNjQgc3RyaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHNlcmlhbGl6ZUpTT05PYmplY3RBc0Jhc2U2NFN0cmluZyhvYmplY3Q6IG9iamVjdCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBidG9hKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaGFzIGFscmVhZHkgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSBnaXZlbiBjbGllbnQsIHRoZW4gdGhlIGdpdmVuIElDRSBjYW5kaWRhdGUgaXMgZW1pdHRlZC4gT3RoZXJ3aXNlLCBpdCBpcyBxdWV1ZWQgdXAgZm9yIHdoZW5cbiAgICAgKiBhbiBTRFAgb2ZmZXIgb3IgYW5zd2VyIGlzIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZW1pdE9yUXVldWVJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlOiBvYmplY3QsIGNsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICghY2xpZW50SWQpIHtcbiAgICAgICAgICAgIGNsaWVudElkID0gU2lnbmFsaW5nQ2xpZW50LkRFRkFVTFRfQ0xJRU5UX0lEO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc1JlY2VpdmVkUmVtb3RlU0RQQnlDbGllbnRJZFtjbGllbnRJZF0pIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnaWNlQ2FuZGlkYXRlJywgaWNlQ2FuZGlkYXRlLCBjbGllbnRJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRdLnB1c2goaWNlQ2FuZGlkYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtaXRzIGFueSBwZW5kaW5nIElDRSBjYW5kaWRhdGVzIGZvciB0aGUgZ2l2ZW4gY2xpZW50IGFuZCByZWNvcmRzIHRoYXQgYW4gU0RQIG9mZmVyIG9yIGFuc3dlciBoYXMgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSBjbGllbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbWl0UGVuZGluZ0ljZUNhbmRpZGF0ZXMoY2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFjbGllbnRJZCkge1xuICAgICAgICAgICAgY2xpZW50SWQgPSBTaWduYWxpbmdDbGllbnQuREVGQVVMVF9DTElFTlRfSUQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYXNSZWNlaXZlZFJlbW90ZVNEUEJ5Q2xpZW50SWRbY2xpZW50SWRdID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcGVuZGluZ0ljZUNhbmRpZGF0ZXMgPSB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZF07XG4gICAgICAgIGlmICghcGVuZGluZ0ljZUNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5wZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWRbY2xpZW50SWRdO1xuICAgICAgICBwZW5kaW5nSWNlQ2FuZGlkYXRlcy5mb3JFYWNoKGljZUNhbmRpZGF0ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2ljZUNhbmRpZGF0ZScsIGljZUNhbmRpZGF0ZSwgY2xpZW50SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJlY2lwaWVudCBjbGllbnQgaWQgaXMgbnVsbCBhbmQgdGhlIGN1cnJlbnQgcm9sZSBpcyAnTUFTVEVSJyBhcyBhbGwgbWVzc2FnZXMgc2VudCBhcyAnTUFTVEVSJyBzaG91bGQgaGF2ZSBhIHJlY2lwaWVudCBjbGllbnQgaWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVJlY2lwaWVudENsaWVudElkKHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb2xlID09PSBSb2xlLk1BU1RFUiAmJiAhcmVjaXBpZW50Q2xpZW50SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZWNpcGllbnQgY2xpZW50IGlkLiBBcyB0aGUgTUFTVEVSLCBhbGwgbWVzc2FnZXMgbXVzdCBiZSBzZW50IHdpdGggYSByZWNpcGllbnQgY2xpZW50IGlkLicpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnJvbGUgPT09IFJvbGUuVklFV0VSICYmIHJlY2lwaWVudENsaWVudElkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgcmVjaXBpZW50IGNsaWVudCBpZC4gQXMgdGhlIFZJRVdFUiwgbWVzc2FnZXMgbXVzdCBub3QgYmUgc2VudCB3aXRoIGEgcmVjaXBpZW50IGNsaWVudCBpZC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICdlcnJvcicgZXZlbnQgaGFuZGxlci4gRm9yd2FyZHMgdGhlIGVycm9yIG9udG8gbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgb25FcnJvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICdjbG9zZScgZXZlbnQgaGFuZGxlci4gRm9yd2FyZHMgdGhlIGVycm9yIG9udG8gbGlzdGVuZXJzIGFuZCBjbGVhbnMgdXAgdGhlIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFudXBXZWJTb2NrZXQoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjbG9zZScpO1xuICAgIH1cbn1cbiIsIi8qIVxuQW1hem9uIEtpbmVzaXMgVmlkZW8gU3RyZWFtcyBXZWJSVEMgU0RLIGZvciBKYXZhU2NyaXB0XG5Db3B5cmlnaHQgMjAxOS0yMDE5IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cblRoaXMgcHJvZHVjdCBpbmNsdWRlcyBzb2Z0d2FyZSBkZXZlbG9wZWQgYXRcbkFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gKGh0dHA6Ly9hd3MuYW1hem9uLmNvbS8pLlxuKi9cbmV4cG9ydCB7IFJvbGUgfSBmcm9tICdrdnMtd2VicnRjL1JvbGUnO1xuZXhwb3J0IHsgU2lnbmFsaW5nQ2xpZW50IH0gZnJvbSAna3ZzLXdlYnJ0Yy9TaWduYWxpbmdDbGllbnQnO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IHByb2Nlc3MuZW52LlBBQ0tBR0VfVkVSU0lPTjtcbiIsImltcG9ydCB7IFJvbGUgfSBmcm9tICdrdnMtd2VicnRjL1JvbGUnO1xuXG5leHBvcnQgdHlwZSBRdWVyeVBhcmFtcyA9IHsgW3F1ZXJ5UGFyYW06IHN0cmluZ106IHN0cmluZyB9O1xudHlwZSBIZWFkZXJzID0geyBbaGVhZGVyOiBzdHJpbmddOiBzdHJpbmcgfTtcblxuLyoqXG4gKiBVdGlsaXR5IGNsYXNzIGZvciBTaWdWNCBzaWduaW5nIHJlcXVlc3RzLiBUaGUgQVdTIFNESyBjYW5ub3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlIGJlY2F1c2UgaXQgZG9lcyBub3QgaGF2ZSBzdXBwb3J0IGZvciBXZWJTb2NrZXQgZW5kcG9pbnRzLlxuICovXG5leHBvcnQgY2xhc3MgU2lnVjRSZXF1ZXN0U2lnbmVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0FMR09SSVRITSA9ICdBV1M0LUhNQUMtU0hBMjU2JztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1NFUlZJQ0UgPSAna2luZXNpc3ZpZGVvJztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVnaW9uOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjcmVkZW50aWFsczogQVdTLkNyZWRlbnRpYWxzO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VydmljZTogc3RyaW5nO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJlZ2lvbjogc3RyaW5nLCBjcmVkZW50aWFsczogQVdTLkNyZWRlbnRpYWxzLCBzZXJ2aWNlOiBzdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuREVGQVVMVF9TRVJWSUNFKSB7XG4gICAgICAgIHRoaXMucmVnaW9uID0gcmVnaW9uO1xuICAgICAgICB0aGlzLmNyZWRlbnRpYWxzID0gY3JlZGVudGlhbHM7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNpZ1Y0IHNpZ25lZCBXZWJTb2NrZXQgVVJMIGZvciB0aGUgZ2l2ZW4gaG9zdC9lbmRwb2ludCB3aXRoIHRoZSBnaXZlbiBxdWVyeSBwYXJhbXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgVGhlIFdlYlNvY2tldCBzZXJ2aWNlIGRvbWFpbiBuYW1lLiBUT0RPOiBUYWtlIGluIGEgY29tcGxldGUgZW5kcG9pbnQgKGUuZy4gd3NzOi8vaG9zdDpwb3J0L3BhdGgpIGFuZCBwYXJzZSBvdXQgdGhlIGhvc3RcbiAgICAgKiBAcGFyYW0gcXVlcnlQYXJhbXMgUXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlIGluIHRoZSBVUkwuXG4gICAgICogQHBhcmFtIHJvbGUgVE9ETzogUHJpdmF0ZSBCZXRhIE9ubHlcbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG5vdGU6IFF1ZXJ5IHBhcmFtZXRlcnMgc2hvdWxkIGJlIGluIGFscGhhYmV0aWNhbCBvcmRlci5cbiAgICAgKlxuICAgICAqIE5vdGUgZnJvbSBBV1MgZG9jczogXCJXaGVuIHlvdSBhZGQgdGhlIFgtQW16LVNlY3VyaXR5LVRva2VuIHBhcmFtZXRlciB0byB0aGUgcXVlcnkgc3RyaW5nLCBzb21lIHNlcnZpY2VzIHJlcXVpcmUgdGhhdCB5b3UgaW5jbHVkZSB0aGlzIHBhcmFtZXRlciBpbiB0aGVcbiAgICAgKiBjYW5vbmljYWwgKHNpZ25lZCkgcmVxdWVzdC4gRm9yIG90aGVyIHNlcnZpY2VzLCB5b3UgYWRkIHRoaXMgcGFyYW1ldGVyIGF0IHRoZSBlbmQsIGFmdGVyIHlvdSBjYWxjdWxhdGUgdGhlIHNpZ25hdHVyZS4gRm9yIGRldGFpbHMsIHNlZSB0aGUgQVBJIHJlZmVyZW5jZVxuICAgICAqIGRvY3VtZW50YXRpb24gZm9yIHRoYXQgc2VydmljZS5cIiBLVlMgU2lnbmFsaW5nIFNlcnZpY2UgcmVxdWlyZXMgdGhhdCB0aGUgc2Vzc2lvbiB0b2tlbiBpcyBhZGRlZCB0byB0aGUgY2Fub25pY2FsIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBOb3RlIGZvciBQcml2YXRlIEJldGE6IFRoZSBtZXRob2QsIHBhdGgsIGFuZCBob3N0IHVzZWQgZm9yIHNpZ25pbmcgYXJlIHNwZWNpYWwgb3ZlcnJpZGVzIHVudGlsIGEgbG9uZy10ZXJtIGF1dGhlbnRpY2F0aW9uIHNvbHV0aW9uIGlzIGVzdGFibGlzaGVkLlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L0FQSS9zaWd2NC1xdWVyeS1zdHJpbmctYXV0aC5odG1sXG4gICAgICogQHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wcmVzdG9tYXRpb24vMjRiOTU5ZTUxMjUwYTg3MjNiOWE1YTRmNzBkY2FlMDhcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2lnbmVkVVJMKGVuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcywgcm9sZTogUm9sZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIC8vIFByZXBhcmUgZGF0ZSBzdHJpbmdzXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBkYXRldGltZVN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5nZXREYXRlVGltZVN0cmluZyhkYXRlKTtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5nZXREYXRlU3RyaW5nKGRhdGUpO1xuXG4gICAgICAgIC8vIFZhbGlkYXRlIGFuZCBwYXJzZSBlbmRwb2ludFxuICAgICAgICBjb25zdCBwcm90b2NvbCA9ICd3c3MnO1xuICAgICAgICBjb25zdCB1cmxQcm90b2NvbCA9IGAke3Byb3RvY29sfTovL2A7XG4gICAgICAgIGlmICghZW5kcG9pbnQuc3RhcnRzV2l0aCh1cmxQcm90b2NvbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRW5kcG9pbnQgJyR7ZW5kcG9pbnR9JyBpcyBub3QgYSBzZWN1cmUgV2ViU29ja2V0IGVuZHBvaW50LiBJdCBzaG91bGQgc3RhcnQgd2l0aCAnJHt1cmxQcm90b2NvbH0nLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmRwb2ludC5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuZHBvaW50ICcke2VuZHBvaW50fScgc2hvdWxkIG5vdCBjb250YWluIGFueSBxdWVyeSBwYXJhbWV0ZXJzLmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdGhTdGFydEluZGV4ID0gZW5kcG9pbnQuaW5kZXhPZignLycsIHVybFByb3RvY29sLmxlbmd0aCk7XG4gICAgICAgIGxldCBob3N0O1xuICAgICAgICBsZXQgcGF0aDtcbiAgICAgICAgaWYgKHBhdGhTdGFydEluZGV4IDwgMCkge1xuICAgICAgICAgICAgaG9zdCA9IGVuZHBvaW50LnN1YnN0cmluZyh1cmxQcm90b2NvbC5sZW5ndGgpO1xuICAgICAgICAgICAgcGF0aCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG9zdCA9IGVuZHBvaW50LnN1YnN0cmluZyh1cmxQcm90b2NvbC5sZW5ndGgsIHBhdGhTdGFydEluZGV4KTtcbiAgICAgICAgICAgIHBhdGggPSBlbmRwb2ludC5zdWJzdHJpbmcocGF0aFN0YXJ0SW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmluZ0hvc3QgPSAnZ21hcmJocHFnaS5leGVjdXRlLWFwaS51cy13ZXN0LTIuYW1hem9uYXdzLmNvbSc7IC8vIFRPRE86IFByaXZhdGUgQmV0YSBPbmx5XG4gICAgICAgIGNvbnN0IHNpZ25pbmdQYXRoID0gcm9sZSA9PT0gUm9sZS5NQVNURVIgPyAnL3Byb2QvdjEvY29ubmVjdC1hcy1tYXN0ZXInIDogJy9wcm9kL3YxL2Nvbm5lY3QtYXMtdmlld2VyJzsgLy8gVE9ETzogUHJpdmF0ZSBCZXRhIE9ubHlcbiAgICAgICAgY29uc3Qgc2lnbmVkSGVhZGVycyA9IFsnaG9zdCddLmpvaW4oJzsnKTtcblxuICAgICAgICAvLyBQcmVwYXJlIG1ldGhvZFxuICAgICAgICAvLyBjb25zdCBtZXRob2QgPSAnR0VUJzsgLy8gTWV0aG9kIGlzIGFsd2F5cyBHRVQgZm9yIHNpZ25lZCBVUkxzXG4gICAgICAgIGNvbnN0IHNpZ25pbmdNZXRob2QgPSAnUE9TVCc7IC8vIFRPRE86IFByaXZhdGUgQmV0YSBPbmx5OyBNZXRob2QgaXMgYWx3YXlzIEdFVCBmb3Igc2lnbmVkIFVSTHNcblxuICAgICAgICAvLyBQcmVwYXJlIGNhbm9uaWNhbCBxdWVyeSBzdHJpbmdcbiAgICAgICAgY29uc3QgY3JlZGVudGlhbFNjb3BlID0gZGF0ZVN0cmluZyArICcvJyArIHRoaXMucmVnaW9uICsgJy8nICsgdGhpcy5zZXJ2aWNlICsgJy8nICsgJ2F3czRfcmVxdWVzdCc7XG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbFF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnlQYXJhbXMsIHtcbiAgICAgICAgICAgICdYLUFtei1BbGdvcml0aG0nOiBTaWdWNFJlcXVlc3RTaWduZXIuREVGQVVMVF9BTEdPUklUSE0sXG4gICAgICAgICAgICAnWC1BbXotQ3JlZGVudGlhbCc6IGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkICsgJy8nICsgY3JlZGVudGlhbFNjb3BlKSxcbiAgICAgICAgICAgICdYLUFtei1EYXRlJzogZGF0ZXRpbWVTdHJpbmcsXG4gICAgICAgICAgICAnWC1BbXotU2lnbmVkSGVhZGVycyc6IHNpZ25lZEhlYWRlcnMsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5jcmVkZW50aWFscy5zZXNzaW9uVG9rZW4pIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY2Fub25pY2FsUXVlcnlQYXJhbXMsIHtcbiAgICAgICAgICAgICAgICAnWC1BbXotU2VjdXJpdHktVG9rZW4nOiBlbmNvZGVVUklDb21wb25lbnQodGhpcy5jcmVkZW50aWFscy5zZXNzaW9uVG9rZW4pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2Fub25pY2FsUXVlcnlTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlUXVlcnlTdHJpbmcoY2Fub25pY2FsUXVlcnlQYXJhbXMpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgY2Fub25pY2FsIGhlYWRlcnNcbiAgICAgICAgY29uc3QgY2Fub25pY2FsSGVhZGVycyA9IHtcbiAgICAgICAgICAgIGhvc3Q6IHNpZ25pbmdIb3N0LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjYW5vbmljYWxIZWFkZXJzU3RyaW5nID0gU2lnVjRSZXF1ZXN0U2lnbmVyLmNyZWF0ZUhlYWRlcnNTdHJpbmcoY2Fub25pY2FsSGVhZGVycyk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBwYXlsb2FkIGhhc2hcbiAgICAgICAgY29uc3QgcGF5bG9hZEhhc2ggPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuc2hhMjU2KCcnKTtcblxuICAgICAgICAvLyBDb21iaW5lIGNhbm9uaWNhbCByZXF1ZXN0IHBhcnRzIGludG8gYSBjYW5vbmljYWwgcmVxdWVzdCBzdHJpbmcgYW5kIGhhc2hcbiAgICAgICAgY29uc3QgY2Fub25pY2FsUmVxdWVzdCA9IFtzaWduaW5nTWV0aG9kLCBzaWduaW5nUGF0aCwgY2Fub25pY2FsUXVlcnlTdHJpbmcsIGNhbm9uaWNhbEhlYWRlcnNTdHJpbmcsIHNpZ25lZEhlYWRlcnMsIHBheWxvYWRIYXNoXS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc3QgY2Fub25pY2FsUmVxdWVzdEhhc2ggPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuc2hhMjU2KGNhbm9uaWNhbFJlcXVlc3QpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzaWduYXR1cmVcbiAgICAgICAgY29uc3Qgc3RyaW5nVG9TaWduID0gW1NpZ1Y0UmVxdWVzdFNpZ25lci5ERUZBVUxUX0FMR09SSVRITSwgZGF0ZXRpbWVTdHJpbmcsIGNyZWRlbnRpYWxTY29wZSwgY2Fub25pY2FsUmVxdWVzdEhhc2hdLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zdCBzaWduaW5nS2V5ID0gYXdhaXQgdGhpcy5nZXRTaWduYXR1cmVLZXkoZGF0ZVN0cmluZyk7XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci50b0hleChhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhzaWduaW5nS2V5LCBzdHJpbmdUb1NpZ24pKTtcblxuICAgICAgICAvLyBBZGQgc2lnbmF0dXJlIHRvIHF1ZXJ5IHBhcmFtc1xuICAgICAgICBjb25zdCBzaWduZWRRdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNhbm9uaWNhbFF1ZXJ5UGFyYW1zLCB7XG4gICAgICAgICAgICAnWC1BbXotU2lnbmF0dXJlJzogc2lnbmF0dXJlLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgc2lnbmVkIFVSTFxuICAgICAgICByZXR1cm4gcHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyBwYXRoICsgJz8nICsgU2lnVjRSZXF1ZXN0U2lnbmVyLmNyZWF0ZVF1ZXJ5U3RyaW5nKHNpZ25lZFF1ZXJ5UGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3IgZ2VuZXJhdGluZyB0aGUga2V5IHRvIHVzZSBmb3IgY2FsY3VsYXRpbmcgdGhlIHNpZ25hdHVyZS4gVGhpcyBjb21iaW5lcyB0b2dldGhlciB0aGUgZGF0ZSBzdHJpbmcsIHJlZ2lvbiwgc2VydmljZSBuYW1lLCBhbmQgc2VjcmV0XG4gICAgICogYWNjZXNzIGtleS5cbiAgICAgKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2dlbmVyYWwvbGF0ZXN0L2dyL3NpZ3Y0LWNhbGN1bGF0ZS1zaWduYXR1cmUuaHRtbFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZ2V0U2lnbmF0dXJlS2V5KGRhdGVTdHJpbmc6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICAgICAgY29uc3Qga0RhdGUgPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYygnQVdTNCcgKyB0aGlzLmNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleSwgZGF0ZVN0cmluZyk7XG4gICAgICAgIGNvbnN0IGtSZWdpb24gPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhrRGF0ZSwgdGhpcy5yZWdpb24pO1xuICAgICAgICBjb25zdCBrU2VydmljZSA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKGtSZWdpb24sIHRoaXMuc2VydmljZSk7XG4gICAgICAgIHJldHVybiBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhrU2VydmljZSwgJ2F3czRfcmVxdWVzdCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBjb252ZXJ0aW5nIGEgbWFwIG9mIGhlYWRlcnMgdG8gYSBzdHJpbmcgZm9yIHNpZ25pbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlSGVhZGVyc1N0cmluZyhoZWFkZXJzOiBIZWFkZXJzKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpXG4gICAgICAgICAgICAubWFwKGhlYWRlciA9PiBgJHtoZWFkZXJ9OiR7aGVhZGVyc1toZWFkZXJdfVxcbmApXG4gICAgICAgICAgICAuam9pbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBjb252ZXJ0aW5nIGEgbWFwIG9mIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYSBzdHJpbmcgd2l0aCB0aGUgcGFyYW1ldGVyIG5hbWVzIHNvcnRlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVRdWVyeVN0cmluZyhxdWVyeVBhcmFtczogUXVlcnlQYXJhbXMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpXG4gICAgICAgICAgICAuc29ydCgpXG4gICAgICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9PSR7cXVlcnlQYXJhbXNba2V5XX1gKVxuICAgICAgICAgICAgLmpvaW4oJyYnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgZGF0ZXRpbWUgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gZGF0ZSB0byB1c2UgZm9yIHNpZ25pbmcuIEZvciBleGFtcGxlOiBcIjIwMTkwOTI3VDE2NTIxMFpcIlxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGF0ZVRpbWVTdHJpbmcoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkYXRlXG4gICAgICAgICAgICAudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLlxcZHszfVokLywgJ1onKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1s6XFwtXS9nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGRhdGUgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gZGF0ZSB0byB1c2UgZm9yIHNpZ25pbmcuIEZvciBleGFtcGxlOiBcIjIwMTkwOTI3XCJcbiAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGdldERhdGVTdHJpbmcoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVUaW1lU3RyaW5nKGRhdGUpLnN1YnN0cmluZygwLCA4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBzaGEyNTYobWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgaGFzaEJ1ZmZlciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMjU2JywgdGhpcy50b1VpbnQ4QXJyYXkobWVzc2FnZSkpO1xuICAgICAgICByZXR1cm4gdGhpcy50b0hleChoYXNoQnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBobWFjKGtleTogc3RyaW5nIHwgQXJyYXlCdWZmZXIsIG1lc3NhZ2U6IHN0cmluZyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICBjb25zdCBrZXlCdWZmZXIgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyA/IHRoaXMudG9VaW50OEFycmF5KGtleSkuYnVmZmVyIDoga2V5O1xuICAgICAgICBjb25zdCBtZXNzYWdlQnVmZmVyID0gdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnID8gdGhpcy50b1VpbnQ4QXJyYXkobWVzc2FnZSkuYnVmZmVyIDogbWVzc2FnZTtcbiAgICAgICAgY29uc3QgY3J5cHRvS2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICAgICAgICAncmF3JyxcbiAgICAgICAgICAgIGtleUJ1ZmZlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnSE1BQycsXG4gICAgICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU0hBLTI1NicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIFsnc2lnbiddLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYXdhaXQgY3J5cHRvLnN1YnRsZS5zaWduKCdITUFDJywgY3J5cHRvS2V5LCBtZXNzYWdlQnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0b1VpbnQ4QXJyYXkoaW5wdXQ6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGlucHV0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0b0hleChidWZmZXI6IEFycmF5QnVmZmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIC5tYXAoYiA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogVmFsaWRhdGVzIHRoYXQgdGhlIGdpdmVuIHZhbHVlIGlzIG5vdCBudWxsLCB1bmRlZmluZWQsIG9yIGVtcHR5IHN0cmluZyBhbmQgdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVZhbHVlTm9uTmlsKHZhbHVlOiBhbnksIHZhbHVlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZU5hbWV9IGNhbm5vdCBiZSBudWxsYCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZU5hbWV9IGNhbm5vdCBiZSB1bmRlZmluZWRgKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBjYW5ub3QgYmUgZW1wdHlgKTtcbiAgICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgdGhlIGdpdmVuIHZhbHVlIGlzIG51bGwsIHVuZGVmaW5lZCwgb3IgZW1wdHkgc3RyaW5nIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVOaWwodmFsdWU6IGFueSwgdmFsdWVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gc2hvdWxkIGJlIG51bGxgKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9