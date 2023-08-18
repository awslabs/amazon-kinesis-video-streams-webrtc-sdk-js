/* Amazon Kinesis Video Streams WebRTC SDK for JavaScript v2.1.0
Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

This product includes software developed at
Amazon Web Services, Inc. (http://aws.amazon.com/).

License at kvs-webrtc.LICENSE */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

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
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

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

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
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

  checkListener(listener);

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
    m = _getMaxListeners(target);
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
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
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
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

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

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./src/QueryParams.ts":
/*!****************************!*\
  !*** ./src/QueryParams.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/RequestSigner.ts":
/*!******************************!*\
  !*** ./src/RequestSigner.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Role.ts":
/*!*********************!*\
  !*** ./src/Role.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
/**
 * Signaling client role.
 */
var Role;
(function (Role) {
    Role["MASTER"] = "MASTER";
    Role["VIEWER"] = "VIEWER";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./src/SigV4RequestSigner.ts":
/*!***********************************!*\
  !*** ./src/SigV4RequestSigner.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SigV4RequestSigner = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var isomorphic_webcrypto_1 = tslib_1.__importDefault(__webpack_require__(/*! isomorphic-webcrypto */ "isomorphic-webcrypto"));
var utils_1 = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
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
     * @param endpoint The WebSocket service endpoint including protocol, hostname, and path (if applicable).
     * @param queryParams Query parameters to include in the URL.
     * @param date Date to use for request signing. Defaults to NOW.
     *
     * Implementation note: Query parameters should be in alphabetical order.
     *
     * Note from AWS docs: "When you add the X-Amz-Security-Token parameter to the query string, some services require that you include this parameter in the
     * canonical (signed) request. For other services, you add this parameter at the end, after you calculate the signature. For details, see the API reference
     * documentation for that service." KVS Signaling Service requires that the session token is added to the canonical request.
     *
     * @see https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
     * @see https://gist.github.com/prestomation/24b959e51250a8723b9a5a4f70dcae08
     */
    SigV4RequestSigner.prototype.getSignedURL = function (endpoint, queryParams, date) {
        if (date === void 0) { date = new Date(); }
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var datetimeString, dateString, protocol, urlProtocol, pathStartIndex, host, path, signedHeaders, method, credentialScope, canonicalQueryParams, canonicalQueryString, canonicalHeaders, canonicalHeadersString, payloadHash, canonicalRequest, canonicalRequestHash, stringToSign, signingKey, signature, _a, _b, signedQueryParams;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(typeof this.credentials.getPromise === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.credentials.getPromise()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        (0, utils_1.validateValueNonNil)(this.credentials.accessKeyId, 'credentials.accessKeyId');
                        (0, utils_1.validateValueNonNil)(this.credentials.secretAccessKey, 'credentials.secretAccessKey');
                        datetimeString = SigV4RequestSigner.getDateTimeString(date);
                        dateString = SigV4RequestSigner.getDateString(date);
                        protocol = 'wss';
                        urlProtocol = "".concat(protocol, "://");
                        if (!endpoint.startsWith(urlProtocol)) {
                            throw new Error("Endpoint '".concat(endpoint, "' is not a secure WebSocket endpoint. It should start with '").concat(urlProtocol, "'."));
                        }
                        if (endpoint.includes('?')) {
                            throw new Error("Endpoint '".concat(endpoint, "' should not contain any query parameters."));
                        }
                        pathStartIndex = endpoint.indexOf('/', urlProtocol.length);
                        if (pathStartIndex < 0) {
                            host = endpoint.substring(urlProtocol.length);
                            path = '/';
                        }
                        else {
                            host = endpoint.substring(urlProtocol.length, pathStartIndex);
                            path = endpoint.substring(pathStartIndex);
                        }
                        signedHeaders = ['host'].join(';');
                        method = 'GET';
                        credentialScope = dateString + '/' + this.region + '/' + this.service + '/' + 'aws4_request';
                        canonicalQueryParams = Object.assign({}, queryParams, {
                            'X-Amz-Algorithm': SigV4RequestSigner.DEFAULT_ALGORITHM,
                            'X-Amz-Credential': this.credentials.accessKeyId + '/' + credentialScope,
                            'X-Amz-Date': datetimeString,
                            'X-Amz-Expires': '299',
                            'X-Amz-SignedHeaders': signedHeaders,
                        });
                        if (this.credentials.sessionToken) {
                            Object.assign(canonicalQueryParams, {
                                'X-Amz-Security-Token': this.credentials.sessionToken,
                            });
                        }
                        canonicalQueryString = SigV4RequestSigner.createQueryString(canonicalQueryParams);
                        canonicalHeaders = {
                            host: host,
                        };
                        canonicalHeadersString = SigV4RequestSigner.createHeadersString(canonicalHeaders);
                        return [4 /*yield*/, SigV4RequestSigner.sha256('')];
                    case 3:
                        payloadHash = _c.sent();
                        canonicalRequest = [method, path, canonicalQueryString, canonicalHeadersString, signedHeaders, payloadHash].join('\n');
                        return [4 /*yield*/, SigV4RequestSigner.sha256(canonicalRequest)];
                    case 4:
                        canonicalRequestHash = _c.sent();
                        stringToSign = [SigV4RequestSigner.DEFAULT_ALGORITHM, datetimeString, credentialScope, canonicalRequestHash].join('\n');
                        return [4 /*yield*/, this.getSignatureKey(dateString)];
                    case 5:
                        signingKey = _c.sent();
                        _b = (_a = SigV4RequestSigner).toHex;
                        return [4 /*yield*/, SigV4RequestSigner.hmac(signingKey, stringToSign)];
                    case 6: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 7:
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
            .map(function (header) { return "".concat(header, ":").concat(headers[header], "\n"); })
            .join();
    };
    /**
     * Utility method for converting a map of query parameters to a string with the parameter names sorted.
     */
    SigV4RequestSigner.createQueryString = function (queryParams) {
        return Object.keys(queryParams)
            .sort()
            .map(function (key) { return "".concat(key, "=").concat(encodeURIComponent(queryParams[key])); })
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
                    case 0: return [4 /*yield*/, isomorphic_webcrypto_1.default.subtle.digest({ name: 'SHA-256' }, this.toUint8Array(message))];
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
                        messageBuffer = this.toUint8Array(message).buffer;
                        return [4 /*yield*/, isomorphic_webcrypto_1.default.subtle.importKey('raw', keyBuffer, {
                                name: 'HMAC',
                                hash: {
                                    name: 'SHA-256',
                                },
                            }, false, ['sign'])];
                    case 1:
                        cryptoKey = _a.sent();
                        return [4 /*yield*/, isomorphic_webcrypto_1.default.subtle.sign({ name: 'HMAC', hash: { name: 'SHA-256' } }, cryptoKey, messageBuffer)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Note that this implementation does not work with two-byte characters.
     * However, no inputs into a signed signaling service request should have two-byte characters.
     */
    SigV4RequestSigner.toUint8Array = function (input) {
        var buf = new ArrayBuffer(input.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = input.length; i < strLen; i++) {
            bufView[i] = input.charCodeAt(i);
        }
        return bufView;
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

/***/ "./src/SignalingClient.ts":
/*!********************************!*\
  !*** ./src/SignalingClient.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalingClient = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var Role_1 = __webpack_require__(/*! ./Role */ "./src/Role.ts");
var SigV4RequestSigner_1 = __webpack_require__(/*! ./SigV4RequestSigner */ "./src/SigV4RequestSigner.ts");
var DateProvider_1 = tslib_1.__importDefault(__webpack_require__(/*! ./internal/DateProvider */ "./src/internal/DateProvider.ts"));
var utils_1 = __webpack_require__(/*! ./internal/utils */ "./src/internal/utils.ts");
var MessageType;
(function (MessageType) {
    MessageType["SDP_ANSWER"] = "SDP_ANSWER";
    MessageType["SDP_OFFER"] = "SDP_OFFER";
    MessageType["ICE_CANDIDATE"] = "ICE_CANDIDATE";
})(MessageType || (MessageType = {}));
var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["CONNECTING"] = 0] = "CONNECTING";
    ReadyState[ReadyState["OPEN"] = 1] = "OPEN";
    ReadyState[ReadyState["CLOSING"] = 2] = "CLOSING";
    ReadyState[ReadyState["CLOSED"] = 3] = "CLOSED";
})(ReadyState || (ReadyState = {}));
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
     * @param {SignalingClientConfig} config - Configuration options and parameters.
     * is not provided, it will be loaded from the global scope.
     */
    function SignalingClient(config) {
        var _this = _super.call(this) || this;
        _this.websocket = null;
        _this.readyState = ReadyState.CLOSED;
        _this.pendingIceCandidatesByClientId = {};
        _this.hasReceivedRemoteSDPByClientId = {};
        // Validate config
        (0, utils_1.validateValueNonNil)(config, 'SignalingClientConfig');
        (0, utils_1.validateValueNonNil)(config.role, 'role');
        if (config.role === Role_1.Role.VIEWER) {
            (0, utils_1.validateValueNonNil)(config.clientId, 'clientId');
        }
        else {
            (0, utils_1.validateValueNil)(config.clientId, 'clientId');
        }
        (0, utils_1.validateValueNonNil)(config.channelARN, 'channelARN');
        (0, utils_1.validateValueNonNil)(config.region, 'region');
        (0, utils_1.validateValueNonNil)(config.channelEndpoint, 'channelEndpoint');
        _this.config = tslib_1.__assign({}, config); // Copy config to new object for immutability.
        if (config.requestSigner) {
            _this.requestSigner = config.requestSigner;
        }
        else {
            (0, utils_1.validateValueNonNil)(config.credentials, 'credentials');
            _this.requestSigner = new SigV4RequestSigner_1.SigV4RequestSigner(config.region, config.credentials);
        }
        _this.dateProvider = new DateProvider_1.default(config.systemClockOffset || 0);
        // Bind event handlers
        _this.onOpen = _this.onOpen.bind(_this);
        _this.onMessage = _this.onMessage.bind(_this);
        _this.onError = _this.onError.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }
    /**
     * Opens the connection with the signaling service. Listen to the 'open' event to be notified when the connection has been opened.
     */
    SignalingClient.prototype.open = function () {
        var _this = this;
        if (this.readyState !== ReadyState.CLOSED) {
            throw new Error('Client is already open, opening, or closing');
        }
        this.readyState = ReadyState.CONNECTING;
        // The process of opening the connection is asynchronous via promises, but the interaction model is to handle asynchronous actions via events.
        // Therefore, we just kick off the asynchronous process and then return and let it fire events.
        this.asyncOpen()
            .then()
            .catch(function (err) { return _this.onError(err); });
    };
    /**
     * Asynchronous implementation of `open`.
     */
    SignalingClient.prototype.asyncOpen = function () {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var queryParams, signedURL;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = {
                            'X-Amz-ChannelARN': this.config.channelARN,
                        };
                        if (this.config.role === Role_1.Role.VIEWER) {
                            queryParams['X-Amz-ClientId'] = this.config.clientId;
                        }
                        return [4 /*yield*/, this.requestSigner.getSignedURL(this.config.channelEndpoint, queryParams, this.dateProvider.getDate())];
                    case 1:
                        signedURL = _a.sent();
                        // If something caused the state to change from CONNECTING, then don't create the WebSocket instance.
                        if (this.readyState !== ReadyState.CONNECTING) {
                            return [2 /*return*/];
                        }
                        this.websocket = new WebSocket(signedURL);
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
        if (this.websocket !== null) {
            this.readyState = ReadyState.CLOSING;
            this.websocket.close();
        }
        else if (this.readyState !== ReadyState.CLOSED) {
            this.onClose();
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
        if (this.readyState !== ReadyState.OPEN) {
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
        this.readyState = ReadyState.OPEN;
        this.emit('open');
    };
    /**
     * WebSocket 'message' event handler. Attempts to parse the message and handle it according to the message type.
     */
    SignalingClient.prototype.onMessage = function (event) {
        var parsedEventData;
        var parsedMessagePayload;
        try {
            parsedEventData = JSON.parse(event.data);
            parsedMessagePayload = SignalingClient.parseJSONObjectFromBase64String(parsedEventData.messagePayload);
        }
        catch (e) {
            // For forwards compatibility we ignore messages that are not able to be parsed.
            // TODO: Consider how to make it easier for users to be aware of dropped messages.
            return;
        }
        var messageType = parsedEventData.messageType, senderClientId = parsedEventData.senderClientId;
        switch (messageType) {
            case MessageType.SDP_OFFER:
                this.emit('sdpOffer', parsedMessagePayload, senderClientId);
                this.emitPendingIceCandidates(senderClientId);
                return;
            case MessageType.SDP_ANSWER:
                this.emit('sdpAnswer', parsedMessagePayload, senderClientId);
                this.emitPendingIceCandidates(senderClientId);
                return;
            case MessageType.ICE_CANDIDATE:
                this.emitOrQueueIceCandidate(parsedMessagePayload, senderClientId);
                return;
        }
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
        var clientIdKey = clientId || SignalingClient.DEFAULT_CLIENT_ID;
        if (this.hasReceivedRemoteSDPByClientId[clientIdKey]) {
            this.emit('iceCandidate', iceCandidate, clientId);
        }
        else {
            if (!this.pendingIceCandidatesByClientId[clientIdKey]) {
                this.pendingIceCandidatesByClientId[clientIdKey] = [];
            }
            this.pendingIceCandidatesByClientId[clientIdKey].push(iceCandidate);
        }
    };
    /**
     * Emits any pending ICE candidates for the given client and records that an SDP offer or answer has been received from the client.
     */
    SignalingClient.prototype.emitPendingIceCandidates = function (clientId) {
        var _this = this;
        var clientIdKey = clientId || SignalingClient.DEFAULT_CLIENT_ID;
        this.hasReceivedRemoteSDPByClientId[clientIdKey] = true;
        var pendingIceCandidates = this.pendingIceCandidatesByClientId[clientIdKey];
        if (!pendingIceCandidates) {
            return;
        }
        delete this.pendingIceCandidatesByClientId[clientIdKey];
        pendingIceCandidates.forEach(function (iceCandidate) {
            _this.emit('iceCandidate', iceCandidate, clientId);
        });
    };
    /**
     * Throws an error if the recipient client id is null and the current role is 'MASTER' as all messages sent as 'MASTER' should have a recipient client id.
     */
    SignalingClient.prototype.validateRecipientClientId = function (recipientClientId) {
        if (this.config.role === Role_1.Role.VIEWER && recipientClientId) {
            throw new Error('Unexpected recipient client id. As the VIEWER, messages must not be sent with a recipient client id.');
        }
    };
    /**
     * 'error' event handler. Forwards the error onto listeners.
     */
    SignalingClient.prototype.onError = function (error) {
        this.emit('error', error);
    };
    /**
     * 'close' event handler. Forwards the error onto listeners and cleans up the connection.
     */
    SignalingClient.prototype.onClose = function () {
        this.readyState = ReadyState.CLOSED;
        this.cleanupWebSocket();
        this.emit('close');
    };
    SignalingClient.DEFAULT_CLIENT_ID = 'MASTER';
    return SignalingClient;
}(events_1.EventEmitter));
exports.SignalingClient = SignalingClient;


/***/ }),

/***/ "./src/internal/DateProvider.ts":
/*!**************************************!*\
  !*** ./src/internal/DateProvider.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Provides dates with an offset to account for local clock skew.
 *
 * Unfortunately, WebSockets in the web do not provide any of the connection information needed to determine the clock skew from a failed connection request.
 * Therefore, a hard coded offset is used that is provided from the AWS SDK.
 *
 * See {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#correctClockSkew-property}
 */
var DateProvider = /** @class */ (function () {
    function DateProvider(clockOffsetMs) {
        this.clockOffsetMs = clockOffsetMs;
    }
    /**
     * Gets the current date with any configured clock offset applied.
     */
    DateProvider.prototype.getDate = function () {
        return new Date(Date.now() + this.clockOffsetMs);
    };
    return DateProvider;
}());
exports["default"] = DateProvider;


/***/ }),

/***/ "./src/internal/utils.ts":
/*!*******************************!*\
  !*** ./src/internal/utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateValueNil = exports.validateValueNonNil = void 0;
/**
 * Validates that the given value is not null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNonNil(value, valueName) {
    if (value === null) {
        throw new Error("".concat(valueName, " cannot be null"));
    }
    else if (value === undefined) {
        throw new Error("".concat(valueName, " cannot be undefined"));
    }
    else if (value === '') {
        throw new Error("".concat(valueName, " cannot be empty"));
    }
}
exports.validateValueNonNil = validateValueNonNil;
/**
 * Validates that the given value is null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNil(value, valueName) {
    if (value !== null && value !== undefined && value !== '') {
        throw new Error("".concat(valueName, " should be null"));
    }
}
exports.validateValueNil = validateValueNil;


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "isomorphic-webcrypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["crypto"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERSION = exports.RequestSigner = exports.QueryParams = exports.SigV4RequestSigner = exports.SignalingClient = exports.Role = void 0;
/*!
Amazon Kinesis Video Streams WebRTC SDK for JavaScript
Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

This product includes software developed at
Amazon Web Services, Inc. (http://aws.amazon.com/).
*/
var Role_1 = __webpack_require__(/*! ./Role */ "./src/Role.ts");
Object.defineProperty(exports, "Role", ({ enumerable: true, get: function () { return Role_1.Role; } }));
var SignalingClient_1 = __webpack_require__(/*! ./SignalingClient */ "./src/SignalingClient.ts");
Object.defineProperty(exports, "SignalingClient", ({ enumerable: true, get: function () { return SignalingClient_1.SignalingClient; } }));
var SigV4RequestSigner_1 = __webpack_require__(/*! ./SigV4RequestSigner */ "./src/SigV4RequestSigner.ts");
Object.defineProperty(exports, "SigV4RequestSigner", ({ enumerable: true, get: function () { return SigV4RequestSigner_1.SigV4RequestSigner; } }));
var QueryParams_1 = __webpack_require__(/*! ./QueryParams */ "./src/QueryParams.ts");
Object.defineProperty(exports, "QueryParams", ({ enumerable: true, get: function () { return QueryParams_1.QueryParams; } }));
var RequestSigner_1 = __webpack_require__(/*! ./RequestSigner */ "./src/RequestSigner.ts");
Object.defineProperty(exports, "RequestSigner", ({ enumerable: true, get: function () { return RequestSigner_1.RequestSigner; } }));
exports.VERSION = "2.1.0";

})();

window.KVSWebRTC = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZzLXdlYnJ0Yy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNB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QSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7Ozs7OztFQU1FO0FBQ0YsZ0VBQThCO0FBQXJCLGlHQUFJO0FBQ2IsaUdBQW9EO0FBQTNDLGtJQUFlO0FBQ3hCLDBHQUEwRDtBQUFqRCwySUFBa0I7QUFDM0IscUZBQTRDO0FBQW5DLHNIQUFXO0FBQ3BCLDJGQUFnRDtBQUF2Qyw0SEFBYTtBQUVULGVBQU8sR0FBRyxPQUEyQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL1F1ZXJ5UGFyYW1zLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9SZXF1ZXN0U2lnbmVyLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9Sb2xlLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9TaWdWNFJlcXVlc3RTaWduZXIudHMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL1NpZ25hbGluZ0NsaWVudC50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvaW50ZXJuYWwvRGF0ZVByb3ZpZGVyLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbnRlcm5hbC91dGlscy50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovL0tWU1dlYlJUQy9leHRlcm5hbCB3aW5kb3cgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsImV4cG9ydCB0eXBlIFF1ZXJ5UGFyYW1zID0geyBbcXVlcnlQYXJhbTogc3RyaW5nXTogc3RyaW5nIH07XG4iLCJpbXBvcnQgeyBRdWVyeVBhcmFtcyB9IGZyb20gJy4vUXVlcnlQYXJhbXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTaWduZXIge1xuICAgIGdldFNpZ25lZFVSTDogKHNpZ25hbGluZ0VuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcywgZGF0ZT86IERhdGUpID0+IFByb21pc2U8c3RyaW5nPjtcbn1cbiIsIi8qKlxuICogU2lnbmFsaW5nIGNsaWVudCByb2xlLlxuICovXG5leHBvcnQgZW51bSBSb2xlIHtcbiAgICBNQVNURVIgPSAnTUFTVEVSJyxcbiAgICBWSUVXRVIgPSAnVklFV0VSJyxcbn1cbiIsImltcG9ydCBjcnlwdG8gZnJvbSAnaXNvbW9ycGhpYy13ZWJjcnlwdG8nO1xuXG5pbXBvcnQgeyBRdWVyeVBhcmFtcyB9IGZyb20gJy4vUXVlcnlQYXJhbXMnO1xuaW1wb3J0IHsgUmVxdWVzdFNpZ25lciB9IGZyb20gJy4vUmVxdWVzdFNpZ25lcic7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4vU2lnbmFsaW5nQ2xpZW50JztcbmltcG9ydCB7IHZhbGlkYXRlVmFsdWVOb25OaWwgfSBmcm9tICcuL2ludGVybmFsL3V0aWxzJztcblxudHlwZSBIZWFkZXJzID0geyBbaGVhZGVyOiBzdHJpbmddOiBzdHJpbmcgfTtcblxuLyoqXG4gKiBVdGlsaXR5IGNsYXNzIGZvciBTaWdWNCBzaWduaW5nIHJlcXVlc3RzLiBUaGUgQVdTIFNESyBjYW5ub3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlIGJlY2F1c2UgaXQgZG9lcyBub3QgaGF2ZSBzdXBwb3J0IGZvciBXZWJTb2NrZXQgZW5kcG9pbnRzLlxuICovXG5leHBvcnQgY2xhc3MgU2lnVjRSZXF1ZXN0U2lnbmVyIGltcGxlbWVudHMgUmVxdWVzdFNpZ25lciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9BTEdPUklUSE0gPSAnQVdTNC1ITUFDLVNIQTI1Nic7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9TRVJWSUNFID0gJ2tpbmVzaXN2aWRlbyc7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlZ2lvbjogc3RyaW5nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VydmljZTogc3RyaW5nO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJlZ2lvbjogc3RyaW5nLCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMsIHNlcnZpY2U6IHN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5ERUZBVUxUX1NFUlZJQ0UpIHtcbiAgICAgICAgdGhpcy5yZWdpb24gPSByZWdpb247XG4gICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscztcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU2lnVjQgc2lnbmVkIFdlYlNvY2tldCBVUkwgZm9yIHRoZSBnaXZlbiBob3N0L2VuZHBvaW50IHdpdGggdGhlIGdpdmVuIHF1ZXJ5IHBhcmFtcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBUaGUgV2ViU29ja2V0IHNlcnZpY2UgZW5kcG9pbnQgaW5jbHVkaW5nIHByb3RvY29sLCBob3N0bmFtZSwgYW5kIHBhdGggKGlmIGFwcGxpY2FibGUpLlxuICAgICAqIEBwYXJhbSBxdWVyeVBhcmFtcyBRdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgaW4gdGhlIFVSTC5cbiAgICAgKiBAcGFyYW0gZGF0ZSBEYXRlIHRvIHVzZSBmb3IgcmVxdWVzdCBzaWduaW5nLiBEZWZhdWx0cyB0byBOT1cuXG4gICAgICpcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBub3RlOiBRdWVyeSBwYXJhbWV0ZXJzIHNob3VsZCBiZSBpbiBhbHBoYWJldGljYWwgb3JkZXIuXG4gICAgICpcbiAgICAgKiBOb3RlIGZyb20gQVdTIGRvY3M6IFwiV2hlbiB5b3UgYWRkIHRoZSBYLUFtei1TZWN1cml0eS1Ub2tlbiBwYXJhbWV0ZXIgdG8gdGhlIHF1ZXJ5IHN0cmluZywgc29tZSBzZXJ2aWNlcyByZXF1aXJlIHRoYXQgeW91IGluY2x1ZGUgdGhpcyBwYXJhbWV0ZXIgaW4gdGhlXG4gICAgICogY2Fub25pY2FsIChzaWduZWQpIHJlcXVlc3QuIEZvciBvdGhlciBzZXJ2aWNlcywgeW91IGFkZCB0aGlzIHBhcmFtZXRlciBhdCB0aGUgZW5kLCBhZnRlciB5b3UgY2FsY3VsYXRlIHRoZSBzaWduYXR1cmUuIEZvciBkZXRhaWxzLCBzZWUgdGhlIEFQSSByZWZlcmVuY2VcbiAgICAgKiBkb2N1bWVudGF0aW9uIGZvciB0aGF0IHNlcnZpY2UuXCIgS1ZTIFNpZ25hbGluZyBTZXJ2aWNlIHJlcXVpcmVzIHRoYXQgdGhlIHNlc3Npb24gdG9rZW4gaXMgYWRkZWQgdG8gdGhlIGNhbm9uaWNhbCByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L0FQSS9zaWd2NC1xdWVyeS1zdHJpbmctYXV0aC5odG1sXG4gICAgICogQHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wcmVzdG9tYXRpb24vMjRiOTU5ZTUxMjUwYTg3MjNiOWE1YTRmNzBkY2FlMDhcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2lnbmVkVVJMKGVuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiBRdWVyeVBhcmFtcywgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICAvLyBSZWZyZXNoIGNyZWRlbnRpYWxzXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jcmVkZW50aWFscy5nZXRQcm9taXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNyZWRlbnRpYWxzLmdldFByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKHRoaXMuY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQsICdjcmVkZW50aWFscy5hY2Nlc3NLZXlJZCcpO1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKHRoaXMuY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5LCAnY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5Jyk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBkYXRlIHN0cmluZ3NcbiAgICAgICAgY29uc3QgZGF0ZXRpbWVTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuZ2V0RGF0ZVRpbWVTdHJpbmcoZGF0ZSk7XG4gICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuZ2V0RGF0ZVN0cmluZyhkYXRlKTtcblxuICAgICAgICAvLyBWYWxpZGF0ZSBhbmQgcGFyc2UgZW5kcG9pbnRcbiAgICAgICAgY29uc3QgcHJvdG9jb2wgPSAnd3NzJztcbiAgICAgICAgY29uc3QgdXJsUHJvdG9jb2wgPSBgJHtwcm90b2NvbH06Ly9gO1xuICAgICAgICBpZiAoIWVuZHBvaW50LnN0YXJ0c1dpdGgodXJsUHJvdG9jb2wpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuZHBvaW50ICcke2VuZHBvaW50fScgaXMgbm90IGEgc2VjdXJlIFdlYlNvY2tldCBlbmRwb2ludC4gSXQgc2hvdWxkIHN0YXJ0IHdpdGggJyR7dXJsUHJvdG9jb2x9Jy5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5kcG9pbnQuaW5jbHVkZXMoJz8nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbmRwb2ludCAnJHtlbmRwb2ludH0nIHNob3VsZCBub3QgY29udGFpbiBhbnkgcXVlcnkgcGFyYW1ldGVycy5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRoU3RhcnRJbmRleCA9IGVuZHBvaW50LmluZGV4T2YoJy8nLCB1cmxQcm90b2NvbC5sZW5ndGgpO1xuICAgICAgICBsZXQgaG9zdDtcbiAgICAgICAgbGV0IHBhdGg7XG4gICAgICAgIGlmIChwYXRoU3RhcnRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIGhvc3QgPSBlbmRwb2ludC5zdWJzdHJpbmcodXJsUHJvdG9jb2wubGVuZ3RoKTtcbiAgICAgICAgICAgIHBhdGggPSAnLyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob3N0ID0gZW5kcG9pbnQuc3Vic3RyaW5nKHVybFByb3RvY29sLmxlbmd0aCwgcGF0aFN0YXJ0SW5kZXgpO1xuICAgICAgICAgICAgcGF0aCA9IGVuZHBvaW50LnN1YnN0cmluZyhwYXRoU3RhcnRJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaWduZWRIZWFkZXJzID0gWydob3N0J10uam9pbignOycpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgbWV0aG9kXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdHRVQnOyAvLyBNZXRob2QgaXMgYWx3YXlzIEdFVCBmb3Igc2lnbmVkIFVSTHNcblxuICAgICAgICAvLyBQcmVwYXJlIGNhbm9uaWNhbCBxdWVyeSBzdHJpbmdcbiAgICAgICAgY29uc3QgY3JlZGVudGlhbFNjb3BlID0gZGF0ZVN0cmluZyArICcvJyArIHRoaXMucmVnaW9uICsgJy8nICsgdGhpcy5zZXJ2aWNlICsgJy8nICsgJ2F3czRfcmVxdWVzdCc7XG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbFF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnlQYXJhbXMsIHtcbiAgICAgICAgICAgICdYLUFtei1BbGdvcml0aG0nOiBTaWdWNFJlcXVlc3RTaWduZXIuREVGQVVMVF9BTEdPUklUSE0sXG4gICAgICAgICAgICAnWC1BbXotQ3JlZGVudGlhbCc6IHRoaXMuY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQgKyAnLycgKyBjcmVkZW50aWFsU2NvcGUsXG4gICAgICAgICAgICAnWC1BbXotRGF0ZSc6IGRhdGV0aW1lU3RyaW5nLFxuICAgICAgICAgICAgJ1gtQW16LUV4cGlyZXMnOiAnMjk5JyxcbiAgICAgICAgICAgICdYLUFtei1TaWduZWRIZWFkZXJzJzogc2lnbmVkSGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbikge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjYW5vbmljYWxRdWVyeVBhcmFtcywge1xuICAgICAgICAgICAgICAgICdYLUFtei1TZWN1cml0eS1Ub2tlbic6IHRoaXMuY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2Fub25pY2FsUXVlcnlTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlUXVlcnlTdHJpbmcoY2Fub25pY2FsUXVlcnlQYXJhbXMpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgY2Fub25pY2FsIGhlYWRlcnNcbiAgICAgICAgY29uc3QgY2Fub25pY2FsSGVhZGVycyA9IHtcbiAgICAgICAgICAgIGhvc3QsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbEhlYWRlcnNTdHJpbmcgPSBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlSGVhZGVyc1N0cmluZyhjYW5vbmljYWxIZWFkZXJzKTtcblxuICAgICAgICAvLyBQcmVwYXJlIHBheWxvYWQgaGFzaFxuICAgICAgICBjb25zdCBwYXlsb2FkSGFzaCA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5zaGEyNTYoJycpO1xuXG4gICAgICAgIC8vIENvbWJpbmUgY2Fub25pY2FsIHJlcXVlc3QgcGFydHMgaW50byBhIGNhbm9uaWNhbCByZXF1ZXN0IHN0cmluZyBhbmQgaGFzaFxuICAgICAgICBjb25zdCBjYW5vbmljYWxSZXF1ZXN0ID0gW21ldGhvZCwgcGF0aCwgY2Fub25pY2FsUXVlcnlTdHJpbmcsIGNhbm9uaWNhbEhlYWRlcnNTdHJpbmcsIHNpZ25lZEhlYWRlcnMsIHBheWxvYWRIYXNoXS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc3QgY2Fub25pY2FsUmVxdWVzdEhhc2ggPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuc2hhMjU2KGNhbm9uaWNhbFJlcXVlc3QpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzaWduYXR1cmVcbiAgICAgICAgY29uc3Qgc3RyaW5nVG9TaWduID0gW1NpZ1Y0UmVxdWVzdFNpZ25lci5ERUZBVUxUX0FMR09SSVRITSwgZGF0ZXRpbWVTdHJpbmcsIGNyZWRlbnRpYWxTY29wZSwgY2Fub25pY2FsUmVxdWVzdEhhc2hdLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zdCBzaWduaW5nS2V5ID0gYXdhaXQgdGhpcy5nZXRTaWduYXR1cmVLZXkoZGF0ZVN0cmluZyk7XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci50b0hleChhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhzaWduaW5nS2V5LCBzdHJpbmdUb1NpZ24pKTtcblxuICAgICAgICAvLyBBZGQgc2lnbmF0dXJlIHRvIHF1ZXJ5IHBhcmFtc1xuICAgICAgICBjb25zdCBzaWduZWRRdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNhbm9uaWNhbFF1ZXJ5UGFyYW1zLCB7XG4gICAgICAgICAgICAnWC1BbXotU2lnbmF0dXJlJzogc2lnbmF0dXJlLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgc2lnbmVkIFVSTFxuICAgICAgICByZXR1cm4gcHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyBwYXRoICsgJz8nICsgU2lnVjRSZXF1ZXN0U2lnbmVyLmNyZWF0ZVF1ZXJ5U3RyaW5nKHNpZ25lZFF1ZXJ5UGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3IgZ2VuZXJhdGluZyB0aGUga2V5IHRvIHVzZSBmb3IgY2FsY3VsYXRpbmcgdGhlIHNpZ25hdHVyZS4gVGhpcyBjb21iaW5lcyB0b2dldGhlciB0aGUgZGF0ZSBzdHJpbmcsIHJlZ2lvbiwgc2VydmljZSBuYW1lLCBhbmQgc2VjcmV0XG4gICAgICogYWNjZXNzIGtleS5cbiAgICAgKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2dlbmVyYWwvbGF0ZXN0L2dyL3NpZ3Y0LWNhbGN1bGF0ZS1zaWduYXR1cmUuaHRtbFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZ2V0U2lnbmF0dXJlS2V5KGRhdGVTdHJpbmc6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICAgICAgY29uc3Qga0RhdGUgPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYygnQVdTNCcgKyB0aGlzLmNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleSwgZGF0ZVN0cmluZyk7XG4gICAgICAgIGNvbnN0IGtSZWdpb24gPSBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhrRGF0ZSwgdGhpcy5yZWdpb24pO1xuICAgICAgICBjb25zdCBrU2VydmljZSA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKGtSZWdpb24sIHRoaXMuc2VydmljZSk7XG4gICAgICAgIHJldHVybiBhd2FpdCBTaWdWNFJlcXVlc3RTaWduZXIuaG1hYyhrU2VydmljZSwgJ2F3czRfcmVxdWVzdCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBjb252ZXJ0aW5nIGEgbWFwIG9mIGhlYWRlcnMgdG8gYSBzdHJpbmcgZm9yIHNpZ25pbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlSGVhZGVyc1N0cmluZyhoZWFkZXJzOiBIZWFkZXJzKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpXG4gICAgICAgICAgICAubWFwKGhlYWRlciA9PiBgJHtoZWFkZXJ9OiR7aGVhZGVyc1toZWFkZXJdfVxcbmApXG4gICAgICAgICAgICAuam9pbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBjb252ZXJ0aW5nIGEgbWFwIG9mIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYSBzdHJpbmcgd2l0aCB0aGUgcGFyYW1ldGVyIG5hbWVzIHNvcnRlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVRdWVyeVN0cmluZyhxdWVyeVBhcmFtczogUXVlcnlQYXJhbXMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpXG4gICAgICAgICAgICAuc29ydCgpXG4gICAgICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5UGFyYW1zW2tleV0pfWApXG4gICAgICAgICAgICAuam9pbignJicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBkYXRldGltZSBzdHJpbmcgZm9yIHRoZSBnaXZlbiBkYXRlIHRvIHVzZSBmb3Igc2lnbmluZy4gRm9yIGV4YW1wbGU6IFwiMjAxOTA5MjdUMTY1MjEwWlwiXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBnZXREYXRlVGltZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwuXFxkezN9WiQvLCAnWicpXG4gICAgICAgICAgICAucmVwbGFjZSgvWzpcXC1dL2csICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgZGF0ZSBzdHJpbmcgZm9yIHRoZSBnaXZlbiBkYXRlIHRvIHVzZSBmb3Igc2lnbmluZy4gRm9yIGV4YW1wbGU6IFwiMjAxOTA5MjdcIlxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGF0ZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVRpbWVTdHJpbmcoZGF0ZSkuc3Vic3RyaW5nKDAsIDgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHNoYTI1NihtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoeyBuYW1lOiAnU0hBLTI1NicgfSwgdGhpcy50b1VpbnQ4QXJyYXkobWVzc2FnZSkpO1xuICAgICAgICByZXR1cm4gdGhpcy50b0hleChoYXNoQnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBobWFjKGtleTogc3RyaW5nIHwgQXJyYXlCdWZmZXIsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICAgICAgY29uc3Qga2V5QnVmZmVyID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZycgPyB0aGlzLnRvVWludDhBcnJheShrZXkpLmJ1ZmZlciA6IGtleTtcbiAgICAgICAgY29uc3QgbWVzc2FnZUJ1ZmZlciA9IHRoaXMudG9VaW50OEFycmF5KG1lc3NhZ2UpLmJ1ZmZlcjtcbiAgICAgICAgY29uc3QgY3J5cHRvS2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICAgICAgICAncmF3JyxcbiAgICAgICAgICAgIGtleUJ1ZmZlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnSE1BQycsXG4gICAgICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU0hBLTI1NicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIFsnc2lnbiddLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYXdhaXQgY3J5cHRvLnN1YnRsZS5zaWduKHsgbmFtZTogJ0hNQUMnLCBoYXNoOiB7IG5hbWU6ICdTSEEtMjU2JyB9IH0sIGNyeXB0b0tleSwgbWVzc2FnZUJ1ZmZlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90ZSB0aGF0IHRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3Qgd29yayB3aXRoIHR3by1ieXRlIGNoYXJhY3RlcnMuXG4gICAgICogSG93ZXZlciwgbm8gaW5wdXRzIGludG8gYSBzaWduZWQgc2lnbmFsaW5nIHNlcnZpY2UgcmVxdWVzdCBzaG91bGQgaGF2ZSB0d28tYnl0ZSBjaGFyYWN0ZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHRvVWludDhBcnJheShpbnB1dDogc3RyaW5nKTogVWludDhBcnJheSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihpbnB1dC5sZW5ndGgpO1xuICAgICAgICBjb25zdCBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIHN0ckxlbiA9IGlucHV0Lmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgICAgICBidWZWaWV3W2ldID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmVmlldztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0b0hleChidWZmZXI6IEFycmF5QnVmZmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIC5tYXAoYiA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCB7IFF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi9RdWVyeVBhcmFtcyc7XG5pbXBvcnQgeyBSZXF1ZXN0U2lnbmVyIH0gZnJvbSAnLi9SZXF1ZXN0U2lnbmVyJztcbmltcG9ydCB7IFJvbGUgfSBmcm9tICcuL1JvbGUnO1xuaW1wb3J0IHsgU2lnVjRSZXF1ZXN0U2lnbmVyIH0gZnJvbSAnLi9TaWdWNFJlcXVlc3RTaWduZXInO1xuaW1wb3J0IERhdGVQcm92aWRlciBmcm9tICcuL2ludGVybmFsL0RhdGVQcm92aWRlcic7XG5pbXBvcnQgeyB2YWxpZGF0ZVZhbHVlTmlsLCB2YWxpZGF0ZVZhbHVlTm9uTmlsIH0gZnJvbSAnLi9pbnRlcm5hbC91dGlscyc7XG5cbi8qKlxuICogQSBwYXJ0aWFsIGNvcHkgb2YgdGhlIGNyZWRlbnRpYWxzIGZyb20gdGhlIEFXUyBTREsgZm9yIEpTOiBodHRwczovL2dpdGh1Yi5jb20vYXdzL2F3cy1zZGstanMvYmxvYi9tYXN0ZXIvbGliL2NyZWRlbnRpYWxzLmQudHNcbiAqIFRoZSBpbnRlcmZhY2UgaXMgY29waWVkIGhlcmUgc28gdGhhdCBhIGRlcGVuZGVuY3kgb24gdGhlIEFXUyBTREsgZm9yIEpTIGlzIG5vdCBuZWVkZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlZGVudGlhbHMge1xuICAgIGFjY2Vzc0tleUlkOiBzdHJpbmc7XG4gICAgc2VjcmV0QWNjZXNzS2V5OiBzdHJpbmc7XG4gICAgc2Vzc2lvblRva2VuPzogc3RyaW5nO1xuICAgIGdldFByb21pc2U/KCk6IFByb21pc2U8dm9pZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmFsaW5nQ2xpZW50Q29uZmlnIHtcbiAgICBjaGFubmVsQVJOOiBzdHJpbmc7XG4gICAgY2hhbm5lbEVuZHBvaW50OiBzdHJpbmc7XG4gICAgY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscztcbiAgICByZWdpb246IHN0cmluZztcbiAgICByZXF1ZXN0U2lnbmVyPzogUmVxdWVzdFNpZ25lcjtcbiAgICByb2xlOiBSb2xlO1xuICAgIGNsaWVudElkPzogc3RyaW5nO1xuICAgIHN5c3RlbUNsb2NrT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5lbnVtIE1lc3NhZ2VUeXBlIHtcbiAgICBTRFBfQU5TV0VSID0gJ1NEUF9BTlNXRVInLFxuICAgIFNEUF9PRkZFUiA9ICdTRFBfT0ZGRVInLFxuICAgIElDRV9DQU5ESURBVEUgPSAnSUNFX0NBTkRJREFURScsXG59XG5cbmVudW0gUmVhZHlTdGF0ZSB7XG4gICAgQ09OTkVDVElORyxcbiAgICBPUEVOLFxuICAgIENMT1NJTkcsXG4gICAgQ0xPU0VELFxufVxuXG5pbnRlcmZhY2UgV2ViU29ja2V0TWVzc2FnZSB7XG4gICAgbWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlO1xuICAgIG1lc3NhZ2VQYXlsb2FkOiBzdHJpbmc7XG4gICAgc2VuZGVyQ2xpZW50SWQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ2xpZW50IGZvciBzZW5kaW5nIGFuZCByZWNlaXZpbmcgbWVzc2FnZXMgZnJvbSBhIEtWUyBTaWduYWxpbmcgQ2hhbm5lbC4gVGhlIGNsaWVudCBjYW4gb3BlcmF0ZSBhcyBlaXRoZXIgdGhlICdNQVNURVInIG9yIGEgJ1ZJRVdFUicuXG4gKlxuICogVHlwaWNhbGx5LCB0aGUgJ01BU1RFUicgbGlzdGVucyBmb3IgSUNFIGNhbmRpZGF0ZXMgYW5kIFNEUCBvZmZlcnMgYW5kIHJlc3BvbmRzIHdpdGggYW5kIFNEUCBhbnN3ZXIgYW5kIGl0cyBvd24gSUNFIGNhbmRpZGF0ZXMuXG4gKlxuICogVHlwaWNhbGx5LCB0aGUgJ1ZJRVdFUicgc2VuZHMgYW4gU0RQIG9mZmVyIGFuZCBpdHMgSUNFIGNhbmRpZGF0ZXMgYW5kIHRoZW4gbGlzdGVucyBmb3IgSUNFIGNhbmRpZGF0ZXMgYW5kIFNEUCBhbnN3ZXJzIGZyb20gdGhlICdNQVNURVInLlxuICovXG5leHBvcnQgY2xhc3MgU2lnbmFsaW5nQ2xpZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX0NMSUVOVF9JRCA9ICdNQVNURVInO1xuXG4gICAgcHJpdmF0ZSB3ZWJzb2NrZXQ6IFdlYlNvY2tldCA9IG51bGw7XG4gICAgcHJpdmF0ZSByZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5DTE9TRUQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0U2lnbmVyOiBSZXF1ZXN0U2lnbmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBTaWduYWxpbmdDbGllbnRDb25maWc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nSWNlQ2FuZGlkYXRlc0J5Q2xpZW50SWQ6IHsgW2NsaWVudElkOiBzdHJpbmddOiBvYmplY3RbXSB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSBoYXNSZWNlaXZlZFJlbW90ZVNEUEJ5Q2xpZW50SWQ6IHsgW2NsaWVudElkOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRhdGVQcm92aWRlcjogRGF0ZVByb3ZpZGVyO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBTaWduYWxpbmdDbGllbnQuIFRoZSBjb25uZWN0aW9uIHdpdGggdGhlIHNpZ25hbGluZyBzZXJ2aWNlIG11c3QgYmUgb3BlbmVkIHdpdGggdGhlICdvcGVuJyBtZXRob2QuXG4gICAgICogQHBhcmFtIHtTaWduYWxpbmdDbGllbnRDb25maWd9IGNvbmZpZyAtIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBhbmQgcGFyYW1ldGVycy5cbiAgICAgKiBpcyBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgbG9hZGVkIGZyb20gdGhlIGdsb2JhbCBzY29wZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBTaWduYWxpbmdDbGllbnRDb25maWcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBWYWxpZGF0ZSBjb25maWdcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcsICdTaWduYWxpbmdDbGllbnRDb25maWcnKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcucm9sZSwgJ3JvbGUnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5yb2xlID09PSBSb2xlLlZJRVdFUikge1xuICAgICAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY2xpZW50SWQsICdjbGllbnRJZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsaWRhdGVWYWx1ZU5pbChjb25maWcuY2xpZW50SWQsICdjbGllbnRJZCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNoYW5uZWxBUk4sICdjaGFubmVsQVJOJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLnJlZ2lvbiwgJ3JlZ2lvbicpO1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jaGFubmVsRW5kcG9pbnQsICdjaGFubmVsRW5kcG9pbnQnKTtcblxuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgLi4uY29uZmlnIH07IC8vIENvcHkgY29uZmlnIHRvIG5ldyBvYmplY3QgZm9yIGltbXV0YWJpbGl0eS5cblxuICAgICAgICBpZiAoY29uZmlnLnJlcXVlc3RTaWduZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFNpZ25lciA9IGNvbmZpZy5yZXF1ZXN0U2lnbmVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY3JlZGVudGlhbHMsICdjcmVkZW50aWFscycpO1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0U2lnbmVyID0gbmV3IFNpZ1Y0UmVxdWVzdFNpZ25lcihjb25maWcucmVnaW9uLCBjb25maWcuY3JlZGVudGlhbHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRlUHJvdmlkZXIgPSBuZXcgRGF0ZVByb3ZpZGVyKGNvbmZpZy5zeXN0ZW1DbG9ja09mZnNldCB8fCAwKTtcblxuICAgICAgICAvLyBCaW5kIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIHRoaXMub25PcGVuID0gdGhpcy5vbk9wZW4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uRXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuIExpc3RlbiB0byB0aGUgJ29wZW4nIGV2ZW50IHRvIGJlIG5vdGlmaWVkIHdoZW4gdGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gb3BlbmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBSZWFkeVN0YXRlLkNMT1NFRCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbGllbnQgaXMgYWxyZWFkeSBvcGVuLCBvcGVuaW5nLCBvciBjbG9zaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5DT05ORUNUSU5HO1xuXG4gICAgICAgIC8vIFRoZSBwcm9jZXNzIG9mIG9wZW5pbmcgdGhlIGNvbm5lY3Rpb24gaXMgYXN5bmNocm9ub3VzIHZpYSBwcm9taXNlcywgYnV0IHRoZSBpbnRlcmFjdGlvbiBtb2RlbCBpcyB0byBoYW5kbGUgYXN5bmNocm9ub3VzIGFjdGlvbnMgdmlhIGV2ZW50cy5cbiAgICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBqdXN0IGtpY2sgb2ZmIHRoZSBhc3luY2hyb25vdXMgcHJvY2VzcyBhbmQgdGhlbiByZXR1cm4gYW5kIGxldCBpdCBmaXJlIGV2ZW50cy5cbiAgICAgICAgdGhpcy5hc3luY09wZW4oKVxuICAgICAgICAgICAgLnRoZW4oKVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLm9uRXJyb3IoZXJyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXN5bmNocm9ub3VzIGltcGxlbWVudGF0aW9uIG9mIGBvcGVuYC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGFzeW5jT3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFF1ZXJ5UGFyYW1zID0ge1xuICAgICAgICAgICAgJ1gtQW16LUNoYW5uZWxBUk4nOiB0aGlzLmNvbmZpZy5jaGFubmVsQVJOLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydYLUFtei1DbGllbnRJZCddID0gdGhpcy5jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2lnbmVkVVJMID0gYXdhaXQgdGhpcy5yZXF1ZXN0U2lnbmVyLmdldFNpZ25lZFVSTCh0aGlzLmNvbmZpZy5jaGFubmVsRW5kcG9pbnQsIHF1ZXJ5UGFyYW1zLCB0aGlzLmRhdGVQcm92aWRlci5nZXREYXRlKCkpO1xuXG4gICAgICAgIC8vIElmIHNvbWV0aGluZyBjYXVzZWQgdGhlIHN0YXRlIHRvIGNoYW5nZSBmcm9tIENPTk5FQ1RJTkcsIHRoZW4gZG9uJ3QgY3JlYXRlIHRoZSBXZWJTb2NrZXQgaW5zdGFuY2UuXG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFJlYWR5U3RhdGUuQ09OTkVDVElORykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHNpZ25lZFVSTCk7XG5cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMub25PcGVuKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uRXJyb3IpO1xuICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBLVlMgU2lnbmFsaW5nIFNlcnZpY2UuIElmIGFscmVhZHkgY2xvc2VkIG9yIGNsb3NpbmcsIG5vIGFjdGlvbiBpcyB0YWtlbi4gTGlzdGVuIHRvIHRoZSAnY2xvc2UnIGV2ZW50IHRvIGJlIG5vdGlmaWVkIHdoZW4gdGhlXG4gICAgICogY29ubmVjdGlvbiBoYXMgYmVlbiBjbG9zZWQuXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy53ZWJzb2NrZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ0xPU0lORztcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBSZWFkeVN0YXRlLkNMT1NFRCkge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyB0aGUgZ2l2ZW4gU0RQIG9mZmVyIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgb25seSB0aGUgJ1ZJRVdFUicgcm9sZSBzaG91bGQgc2VuZCBhbiBTRFAgb2ZmZXIuXG4gICAgICogQHBhcmFtIHtSVENTZXNzaW9uRGVzY3JpcHRpb259IHNkcE9mZmVyIC0gU0RQIG9mZmVyIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbmRTZHBPZmZlcihzZHBPZmZlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLlNEUF9PRkZFUiwgc2RwT2ZmZXIudG9KU09OKCksIHJlY2lwaWVudENsaWVudElkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyB0aGUgZ2l2ZW4gU0RQIGFuc3dlciB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBUeXBpY2FsbHksIG9ubHkgdGhlICdNQVNURVInIHJvbGUgc2hvdWxkIHNlbmQgYW4gU0RQIGFuc3dlci5cbiAgICAgKiBAcGFyYW0ge1JUQ1Nlc3Npb25EZXNjcmlwdGlvbn0gc2RwQW5zd2VyIC0gU0RQIGFuc3dlciB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZW5kU2RwQW5zd2VyKHNkcEFuc3dlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLlNEUF9BTlNXRVIsIHNkcEFuc3dlci50b0pTT04oKSwgcmVjaXBpZW50Q2xpZW50SWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIHRoZSBnaXZlbiBJQ0UgY2FuZGlkYXRlIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgYm90aCB0aGUgJ1ZJRVdFUicgcm9sZSBhbmQgJ01BU1RFUicgcm9sZSBzaG91bGQgc2VuZCBJQ0UgY2FuZGlkYXRlcy5cbiAgICAgKiBAcGFyYW0ge1JUQ0ljZUNhbmRpZGF0ZX0gaWNlQ2FuZGlkYXRlIC0gSUNFIGNhbmRpZGF0ZSB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZW5kSWNlQ2FuZGlkYXRlKGljZUNhbmRpZGF0ZTogUlRDSWNlQ2FuZGlkYXRlLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLklDRV9DQU5ESURBVEUsIGljZUNhbmRpZGF0ZS50b0pTT04oKSwgcmVjaXBpZW50Q2xpZW50SWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gaXMgb3BlbiBhbmQgdGhhdCB0aGUgcmVjaXBpZW50IGNsaWVudCBpZCBpcyBwcmVzZW50IGlmIHNlbmRpbmcgYXMgdGhlICdNQVNURVInLiBFbmNvZGVzIHRoZSBnaXZlbiBtZXNzYWdlIHBheWxvYWRcbiAgICAgKiBhbmQgc2VuZHMgdGhlIG1lc3NhZ2UgdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UoYWN0aW9uOiBNZXNzYWdlVHlwZSwgbWVzc2FnZVBheWxvYWQ6IG9iamVjdCwgcmVjaXBpZW50Q2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gUmVhZHlTdGF0ZS5PUEVOKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBzZW5kIG1lc3NhZ2UgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UgaXMgbm90IG9wZW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudENsaWVudElkKHJlY2lwaWVudENsaWVudElkKTtcblxuICAgICAgICB0aGlzLndlYnNvY2tldC5zZW5kKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgICAgICBtZXNzYWdlUGF5bG9hZDogU2lnbmFsaW5nQ2xpZW50LnNlcmlhbGl6ZUpTT05PYmplY3RBc0Jhc2U2NFN0cmluZyhtZXNzYWdlUGF5bG9hZCksXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50Q2xpZW50SWQ6IHJlY2lwaWVudENsaWVudElkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBXZWJTb2NrZXQgYW5kIHJlbW92ZXMgdGhlIHJlZmVyZW5jZSB0byB0aGUgV2ViU29ja2V0IG9iamVjdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNsZWFudXBXZWJTb2NrZXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLndlYnNvY2tldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2Vic29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLm9uT3Blbik7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uQ2xvc2UpO1xuICAgICAgICB0aGlzLndlYnNvY2tldCA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2ViU29ja2V0ICdvcGVuJyBldmVudCBoYW5kbGVyLiBGb3J3YXJkcyB0aGUgZXZlbnQgb24gdG8gbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgb25PcGVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLk9QRU47XG4gICAgICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCAnbWVzc2FnZScgZXZlbnQgaGFuZGxlci4gQXR0ZW1wdHMgdG8gcGFyc2UgdGhlIG1lc3NhZ2UgYW5kIGhhbmRsZSBpdCBhY2NvcmRpbmcgdG8gdGhlIG1lc3NhZ2UgdHlwZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uTWVzc2FnZShldmVudDogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGxldCBwYXJzZWRFdmVudERhdGE6IFdlYlNvY2tldE1lc3NhZ2U7XG4gICAgICAgIGxldCBwYXJzZWRNZXNzYWdlUGF5bG9hZDogb2JqZWN0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFyc2VkRXZlbnREYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKSBhcyBXZWJTb2NrZXRNZXNzYWdlO1xuICAgICAgICAgICAgcGFyc2VkTWVzc2FnZVBheWxvYWQgPSBTaWduYWxpbmdDbGllbnQucGFyc2VKU09OT2JqZWN0RnJvbUJhc2U2NFN0cmluZyhwYXJzZWRFdmVudERhdGEubWVzc2FnZVBheWxvYWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBGb3IgZm9yd2FyZHMgY29tcGF0aWJpbGl0eSB3ZSBpZ25vcmUgbWVzc2FnZXMgdGhhdCBhcmUgbm90IGFibGUgdG8gYmUgcGFyc2VkLlxuICAgICAgICAgICAgLy8gVE9ETzogQ29uc2lkZXIgaG93IHRvIG1ha2UgaXQgZWFzaWVyIGZvciB1c2VycyB0byBiZSBhd2FyZSBvZiBkcm9wcGVkIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZVR5cGUsIHNlbmRlckNsaWVudElkIH0gPSBwYXJzZWRFdmVudERhdGE7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuU0RQX09GRkVSOlxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc2RwT2ZmZXInLCBwYXJzZWRNZXNzYWdlUGF5bG9hZCwgc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFBlbmRpbmdJY2VDYW5kaWRhdGVzKHNlbmRlckNsaWVudElkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNEUF9BTlNXRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzZHBBbnN3ZXInLCBwYXJzZWRNZXNzYWdlUGF5bG9hZCwgc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFBlbmRpbmdJY2VDYW5kaWRhdGVzKHNlbmRlckNsaWVudElkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLklDRV9DQU5ESURBVEU6XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0T3JRdWV1ZUljZUNhbmRpZGF0ZShwYXJzZWRNZXNzYWdlUGF5bG9hZCwgc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VzIHRoZSBnaXZlbiBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgYW5kIGRlY29kZXMgaXQgaW50byBhIEpTT04gb2JqZWN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlSlNPTk9iamVjdEZyb21CYXNlNjRTdHJpbmcoYmFzZTY0RW5jb2RlZFN0cmluZzogc3RyaW5nKTogb2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYXRvYihiYXNlNjRFbmNvZGVkU3RyaW5nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGdpdmVuIEpTT04gb2JqZWN0IGFuZCBlbmNvZGVzIGl0IGludG8gYSBiYXNlNjQgc3RyaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHNlcmlhbGl6ZUpTT05PYmplY3RBc0Jhc2U2NFN0cmluZyhvYmplY3Q6IG9iamVjdCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBidG9hKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaGFzIGFscmVhZHkgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSBnaXZlbiBjbGllbnQsIHRoZW4gdGhlIGdpdmVuIElDRSBjYW5kaWRhdGUgaXMgZW1pdHRlZC4gT3RoZXJ3aXNlLCBpdCBpcyBxdWV1ZWQgdXAgZm9yIHdoZW5cbiAgICAgKiBhbiBTRFAgb2ZmZXIgb3IgYW5zd2VyIGlzIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZW1pdE9yUXVldWVJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlOiBvYmplY3QsIGNsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNsaWVudElkS2V5ID0gY2xpZW50SWQgfHwgU2lnbmFsaW5nQ2xpZW50LkRFRkFVTFRfQ0xJRU5UX0lEO1xuICAgICAgICBpZiAodGhpcy5oYXNSZWNlaXZlZFJlbW90ZVNEUEJ5Q2xpZW50SWRbY2xpZW50SWRLZXldKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2ljZUNhbmRpZGF0ZScsIGljZUNhbmRpZGF0ZSwgY2xpZW50SWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkS2V5XS5wdXNoKGljZUNhbmRpZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbnkgcGVuZGluZyBJQ0UgY2FuZGlkYXRlcyBmb3IgdGhlIGdpdmVuIGNsaWVudCBhbmQgcmVjb3JkcyB0aGF0IGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgY2xpZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZW1pdFBlbmRpbmdJY2VDYW5kaWRhdGVzKGNsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNsaWVudElkS2V5ID0gY2xpZW50SWQgfHwgU2lnbmFsaW5nQ2xpZW50LkRFRkFVTFRfQ0xJRU5UX0lEO1xuICAgICAgICB0aGlzLmhhc1JlY2VpdmVkUmVtb3RlU0RQQnlDbGllbnRJZFtjbGllbnRJZEtleV0gPSB0cnVlO1xuICAgICAgICBjb25zdCBwZW5kaW5nSWNlQ2FuZGlkYXRlcyA9IHRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkS2V5XTtcbiAgICAgICAgaWYgKCFwZW5kaW5nSWNlQ2FuZGlkYXRlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV07XG4gICAgICAgIHBlbmRpbmdJY2VDYW5kaWRhdGVzLmZvckVhY2goaWNlQ2FuZGlkYXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnaWNlQ2FuZGlkYXRlJywgaWNlQ2FuZGlkYXRlLCBjbGllbnRJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgcmVjaXBpZW50IGNsaWVudCBpZCBpcyBudWxsIGFuZCB0aGUgY3VycmVudCByb2xlIGlzICdNQVNURVInIGFzIGFsbCBtZXNzYWdlcyBzZW50IGFzICdNQVNURVInIHNob3VsZCBoYXZlIGEgcmVjaXBpZW50IGNsaWVudCBpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUmVjaXBpZW50Q2xpZW50SWQocmVjaXBpZW50Q2xpZW50SWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvbGUgPT09IFJvbGUuVklFV0VSICYmIHJlY2lwaWVudENsaWVudElkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgcmVjaXBpZW50IGNsaWVudCBpZC4gQXMgdGhlIFZJRVdFUiwgbWVzc2FnZXMgbXVzdCBub3QgYmUgc2VudCB3aXRoIGEgcmVjaXBpZW50IGNsaWVudCBpZC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICdlcnJvcicgZXZlbnQgaGFuZGxlci4gRm9yd2FyZHMgdGhlIGVycm9yIG9udG8gbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgb25FcnJvcihlcnJvcjogRXJyb3IgfCBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICdjbG9zZScgZXZlbnQgaGFuZGxlci4gRm9yd2FyZHMgdGhlIGVycm9yIG9udG8gbGlzdGVuZXJzIGFuZCBjbGVhbnMgdXAgdGhlIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkNMT1NFRDtcbiAgICAgICAgdGhpcy5jbGVhbnVwV2ViU29ja2V0KCk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFByb3ZpZGVzIGRhdGVzIHdpdGggYW4gb2Zmc2V0IHRvIGFjY291bnQgZm9yIGxvY2FsIGNsb2NrIHNrZXcuXG4gKlxuICogVW5mb3J0dW5hdGVseSwgV2ViU29ja2V0cyBpbiB0aGUgd2ViIGRvIG5vdCBwcm92aWRlIGFueSBvZiB0aGUgY29ubmVjdGlvbiBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gZGV0ZXJtaW5lIHRoZSBjbG9jayBza2V3IGZyb20gYSBmYWlsZWQgY29ubmVjdGlvbiByZXF1ZXN0LlxuICogVGhlcmVmb3JlLCBhIGhhcmQgY29kZWQgb2Zmc2V0IGlzIHVzZWQgdGhhdCBpcyBwcm92aWRlZCBmcm9tIHRoZSBBV1MgU0RLLlxuICpcbiAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0phdmFTY3JpcHRTREsvbGF0ZXN0L0FXUy9Db25maWcuaHRtbCNjb3JyZWN0Q2xvY2tTa2V3LXByb3BlcnR5fVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUHJvdmlkZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2xvY2tPZmZzZXRNczogbnVtYmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNsb2NrT2Zmc2V0TXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNsb2NrT2Zmc2V0TXMgPSBjbG9ja09mZnNldE1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZSB3aXRoIGFueSBjb25maWd1cmVkIGNsb2NrIG9mZnNldCBhcHBsaWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXREYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5ub3coKSArIHRoaXMuY2xvY2tPZmZzZXRNcyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IG51bGwsIHVuZGVmaW5lZCwgb3IgZW1wdHkgc3RyaW5nIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVOb25OaWwodmFsdWU6IGFueSwgdmFsdWVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIG51bGxgKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIHVuZGVmaW5lZGApO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZU5hbWV9IGNhbm5vdCBiZSBlbXB0eWApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgZ2l2ZW4gdmFsdWUgaXMgbnVsbCwgdW5kZWZpbmVkLCBvciBlbXB0eSBzdHJpbmcgYW5kIHRocm93cyBhbiBlcnJvciBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZU5pbCh2YWx1ZTogYW55LCB2YWx1ZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBzaG91bGQgYmUgbnVsbGApO1xuICAgIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NyZWF0ZUJpbmRpbmcobywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiY3J5cHRvXCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyohXG5BbWF6b24gS2luZXNpcyBWaWRlbyBTdHJlYW1zIFdlYlJUQyBTREsgZm9yIEphdmFTY3JpcHRcbkNvcHlyaWdodCAyMDE5LTIwMTkgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuVGhpcyBwcm9kdWN0IGluY2x1ZGVzIHNvZnR3YXJlIGRldmVsb3BlZCBhdFxuQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLiAoaHR0cDovL2F3cy5hbWF6b24uY29tLykuXG4qL1xuZXhwb3J0IHsgUm9sZSB9IGZyb20gJy4vUm9sZSc7XG5leHBvcnQgeyBTaWduYWxpbmdDbGllbnQgfSBmcm9tICcuL1NpZ25hbGluZ0NsaWVudCc7XG5leHBvcnQgeyBTaWdWNFJlcXVlc3RTaWduZXIgfSBmcm9tICcuL1NpZ1Y0UmVxdWVzdFNpZ25lcic7XG5leHBvcnQgeyBRdWVyeVBhcmFtcyB9IGZyb20gJy4vUXVlcnlQYXJhbXMnO1xuZXhwb3J0IHsgUmVxdWVzdFNpZ25lciB9IGZyb20gJy4vUmVxdWVzdFNpZ25lcic7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gcHJvY2Vzcy5lbnYuUEFDS0FHRV9WRVJTSU9OO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9