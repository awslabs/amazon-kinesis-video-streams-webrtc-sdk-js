/* Amazon Kinesis Video Streams WebRTC SDK for JavaScript v2.3.1
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
})(Role || (exports.Role = Role = {}));


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
    SigV4RequestSigner.prototype.getSignedURL = function (endpoint_1, queryParams_1) {
        return tslib_1.__awaiter(this, arguments, Promise, function (endpoint, queryParams, date) {
            var datetimeString, dateString, protocol, urlProtocol, pathStartIndex, host, path, signedHeaders, method, credentialScope, canonicalQueryParams, canonicalQueryString, canonicalHeaders, canonicalHeadersString, payloadHash, canonicalRequest, canonicalRequestHash, stringToSign, signingKey, signature, _a, _b, signedQueryParams;
            if (date === void 0) { date = new Date(); }
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
    MessageType["STATUS_RESPONSE"] = "STATUS_RESPONSE";
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
                        /* istanbul ignore next */
                        this.websocket = new (WebSocket || __webpack_require__(/*! ws */ "./node_modules/ws/browser.js"))(signedURL);
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
     * @param {string} [correlationId] - Unique ID for this message. If this is present and there is an error,
     * Signaling will send a StatusResponse message describing the error. If this is not present, no error will be returned.
     */
    SignalingClient.prototype.sendSdpOffer = function (sdpOffer, recipientClientId, correlationId) {
        this.sendMessage(MessageType.SDP_OFFER, sdpOffer, recipientClientId, correlationId);
    };
    /**
     * Sends the given SDP answer to the signaling service.
     *
     * Typically, only the 'MASTER' role should send an SDP answer.
     * @param {RTCSessionDescription} sdpAnswer - SDP answer to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     * @param {string} [correlationId] - Unique ID for this message. If this is present and there is an error,
     * Signaling will send a StatusResponse message describing the error. If this is not present, no error will be returned.
     */
    SignalingClient.prototype.sendSdpAnswer = function (sdpAnswer, recipientClientId, correlationId) {
        this.sendMessage(MessageType.SDP_ANSWER, sdpAnswer, recipientClientId, correlationId);
    };
    /**
     * Sends the given ICE candidate to the signaling service.
     *
     * Typically, both the 'VIEWER' role and 'MASTER' role should send ICE candidates.
     * @param {RTCIceCandidate} iceCandidate - ICE candidate to send.
     * @param {string} [recipientClientId] - ID of the client to send the message to. Required for 'MASTER' role. Should not be present for 'VIEWER' role.
     * @param {string} [correlationId] - Unique ID for this message. If this is present and there is an error,
     * Signaling will send a StatusResponse message describing the error. If this is not present, no error will be returned.
     */
    SignalingClient.prototype.sendIceCandidate = function (iceCandidate, recipientClientId, correlationId) {
        this.sendMessage(MessageType.ICE_CANDIDATE, iceCandidate, recipientClientId, correlationId);
    };
    /**
     * Validates the WebSocket connection is open and that the recipient client id is present if sending as the 'MASTER'. Encodes the given message payload
     * and sends the message to the signaling service.
     */
    SignalingClient.prototype.sendMessage = function (action, messagePayload, recipientClientId, correlationId) {
        if (this.readyState !== ReadyState.OPEN) {
            throw new Error('Could not send message because the connection to the signaling service is not open.');
        }
        this.validateRecipientClientId(recipientClientId);
        this.validateCorrelationId(correlationId);
        this.websocket.send(JSON.stringify({
            action: action,
            messagePayload: SignalingClient.serializeJSONObjectAsBase64String(messagePayload),
            recipientClientId: recipientClientId || undefined,
            correlationId: correlationId || undefined,
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (e) {
            // For forwards compatibility we ignore messages that are not able to be parsed.
            // TODO: Consider how to make it easier for users to be aware of dropped messages.
            return;
        }
        try {
            parsedMessagePayload = SignalingClient.parseJSONObjectFromBase64String(parsedEventData.messagePayload);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (e) {
            // TODO: Consider how to make it easier for users to be aware of dropped messages.
        }
        var messageType = parsedEventData.messageType, senderClientId = parsedEventData.senderClientId, statusResponse = parsedEventData.statusResponse;
        if (!parsedMessagePayload && !statusResponse) {
            // TODO: Consider how to make it easier for users to be aware of dropped messages.
            return;
        }
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
            case MessageType.STATUS_RESPONSE:
                this.emit('statusResponse', statusResponse);
                return;
        }
    };
    /**
     * Takes the given base64 encoded string and decodes it into a JSON object.
     */
    SignalingClient.parseJSONObjectFromBase64String = function (base64EncodedString) {
        try {
            return JSON.parse(atob(base64EncodedString));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (e) {
            return JSON.parse(Buffer.from(base64EncodedString, 'base64').toString());
        }
    };
    /**
     * Takes the given JSON object and encodes it into a base64 string.
     */
    SignalingClient.serializeJSONObjectAsBase64String = function (object) {
        try {
            return btoa(JSON.stringify(object));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (e) {
            return Buffer.from(JSON.stringify(object)).toString('base64');
        }
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
     * Throws an error if the correlationId does not fit the constraints mentioned in {@link https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis4.html the documentation}.
     */
    SignalingClient.prototype.validateCorrelationId = function (correlationId) {
        if (correlationId && !/^[a-zA-Z0-9_.-]{1,256}$/.test(correlationId)) {
            throw new Error('Correlation id does not fit the constraint!');
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
exports.validateValueNonNil = validateValueNonNil;
exports.validateValueNil = validateValueNil;
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
/**
 * Validates that the given value is null, undefined, or empty string and throws an error if the condition is not met.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateValueNil(value, valueName) {
    if (value !== null && value !== undefined && value !== '') {
        throw new Error("".concat(valueName, " should be null"));
    }
}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values)
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

/***/ "./node_modules/ws/browser.js":
/*!************************************!*\
  !*** ./node_modules/ws/browser.js ***!
  \************************************/
/***/ ((module) => {



module.exports = function () {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};


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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
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
exports.VERSION = "2.3.1";

})();

window.KVSWebRTC = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZzLXdlYnJ0Yy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNB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QXVDLFlBQVksS0FBSyxPQUFPO0FBQ2hHO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLDZDQUE2QztBQUM3QztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6TmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1BBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7O0VBTUU7QUFDRixnRUFBOEI7QUFBckIsaUdBQUk7QUFDYixpR0FBb0Q7QUFBM0Msa0lBQWU7QUFDeEIsMEdBQTBEO0FBQWpELDJJQUFrQjtBQUMzQixxRkFBNEM7QUFBbkMsc0hBQVc7QUFDcEIsMkZBQWdEO0FBQXZDLDRIQUFhO0FBRVQsZUFBTyxHQUFHLE9BQTJCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvUXVlcnlQYXJhbXMudHMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL1JlcXVlc3RTaWduZXIudHMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL1JvbGUudHMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL1NpZ1Y0UmVxdWVzdFNpZ25lci50cyIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvLi9zcmMvU2lnbmFsaW5nQ2xpZW50LnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbnRlcm5hbC9EYXRlUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vc3JjL2ludGVybmFsL3V0aWxzLnRzIiwid2VicGFjazovL0tWU1dlYlJUQy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDLy4vbm9kZV9tb2R1bGVzL3dzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vS1ZTV2ViUlRDL2V4dGVybmFsIHdpbmRvdyBcImNyeXB0b1wiIiwid2VicGFjazovL0tWU1dlYlJUQy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9LVlNXZWJSVEMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0tWU1dlYlJUQy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0tWU1dlYlJUQy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0tWU1dlYlJUQy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwiZXhwb3J0IHR5cGUgUXVlcnlQYXJhbXMgPSB7IFtxdWVyeVBhcmFtOiBzdHJpbmddOiBzdHJpbmcgfTtcbiIsImltcG9ydCB7IFF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi9RdWVyeVBhcmFtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNpZ25lciB7XG4gICAgZ2V0U2lnbmVkVVJMOiAoc2lnbmFsaW5nRW5kcG9pbnQ6IHN0cmluZywgcXVlcnlQYXJhbXM6IFF1ZXJ5UGFyYW1zLCBkYXRlPzogRGF0ZSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xufVxuIiwiLyoqXG4gKiBTaWduYWxpbmcgY2xpZW50IHJvbGUuXG4gKi9cbmV4cG9ydCBlbnVtIFJvbGUge1xuICAgIE1BU1RFUiA9ICdNQVNURVInLFxuICAgIFZJRVdFUiA9ICdWSUVXRVInLFxufVxuIiwiaW1wb3J0IGNyeXB0byBmcm9tICdpc29tb3JwaGljLXdlYmNyeXB0byc7XG5cbmltcG9ydCB7IFF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi9RdWVyeVBhcmFtcyc7XG5pbXBvcnQgeyBSZXF1ZXN0U2lnbmVyIH0gZnJvbSAnLi9SZXF1ZXN0U2lnbmVyJztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi9TaWduYWxpbmdDbGllbnQnO1xuaW1wb3J0IHsgdmFsaWRhdGVWYWx1ZU5vbk5pbCB9IGZyb20gJy4vaW50ZXJuYWwvdXRpbHMnO1xuXG50eXBlIEhlYWRlcnMgPSB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB9O1xuXG4vKipcbiAqIFV0aWxpdHkgY2xhc3MgZm9yIFNpZ1Y0IHNpZ25pbmcgcmVxdWVzdHMuIFRoZSBBV1MgU0RLIGNhbm5vdCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UgYmVjYXVzZSBpdCBkb2VzIG5vdCBoYXZlIHN1cHBvcnQgZm9yIFdlYlNvY2tldCBlbmRwb2ludHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaWdWNFJlcXVlc3RTaWduZXIgaW1wbGVtZW50cyBSZXF1ZXN0U2lnbmVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0FMR09SSVRITSA9ICdBV1M0LUhNQUMtU0hBMjU2JztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1NFUlZJQ0UgPSAna2luZXNpc3ZpZGVvJztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVnaW9uOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjcmVkZW50aWFsczogQ3JlZGVudGlhbHM7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXJ2aWNlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocmVnaW9uOiBzdHJpbmcsIGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscywgc2VydmljZTogc3RyaW5nID0gU2lnVjRSZXF1ZXN0U2lnbmVyLkRFRkFVTFRfU0VSVklDRSkge1xuICAgICAgICB0aGlzLnJlZ2lvbiA9IHJlZ2lvbjtcbiAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGNyZWRlbnRpYWxzO1xuICAgICAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBTaWdWNCBzaWduZWQgV2ViU29ja2V0IFVSTCBmb3IgdGhlIGdpdmVuIGhvc3QvZW5kcG9pbnQgd2l0aCB0aGUgZ2l2ZW4gcXVlcnkgcGFyYW1zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVuZHBvaW50IFRoZSBXZWJTb2NrZXQgc2VydmljZSBlbmRwb2ludCBpbmNsdWRpbmcgcHJvdG9jb2wsIGhvc3RuYW1lLCBhbmQgcGF0aCAoaWYgYXBwbGljYWJsZSkuXG4gICAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zIFF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSBpbiB0aGUgVVJMLlxuICAgICAqIEBwYXJhbSBkYXRlIERhdGUgdG8gdXNlIGZvciByZXF1ZXN0IHNpZ25pbmcuIERlZmF1bHRzIHRvIE5PVy5cbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG5vdGU6IFF1ZXJ5IHBhcmFtZXRlcnMgc2hvdWxkIGJlIGluIGFscGhhYmV0aWNhbCBvcmRlci5cbiAgICAgKlxuICAgICAqIE5vdGUgZnJvbSBBV1MgZG9jczogXCJXaGVuIHlvdSBhZGQgdGhlIFgtQW16LVNlY3VyaXR5LVRva2VuIHBhcmFtZXRlciB0byB0aGUgcXVlcnkgc3RyaW5nLCBzb21lIHNlcnZpY2VzIHJlcXVpcmUgdGhhdCB5b3UgaW5jbHVkZSB0aGlzIHBhcmFtZXRlciBpbiB0aGVcbiAgICAgKiBjYW5vbmljYWwgKHNpZ25lZCkgcmVxdWVzdC4gRm9yIG90aGVyIHNlcnZpY2VzLCB5b3UgYWRkIHRoaXMgcGFyYW1ldGVyIGF0IHRoZSBlbmQsIGFmdGVyIHlvdSBjYWxjdWxhdGUgdGhlIHNpZ25hdHVyZS4gRm9yIGRldGFpbHMsIHNlZSB0aGUgQVBJIHJlZmVyZW5jZVxuICAgICAqIGRvY3VtZW50YXRpb24gZm9yIHRoYXQgc2VydmljZS5cIiBLVlMgU2lnbmFsaW5nIFNlcnZpY2UgcmVxdWlyZXMgdGhhdCB0aGUgc2Vzc2lvbiB0b2tlbiBpcyBhZGRlZCB0byB0aGUgY2Fub25pY2FsIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25TMy9sYXRlc3QvQVBJL3NpZ3Y0LXF1ZXJ5LXN0cmluZy1hdXRoLmh0bWxcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3ByZXN0b21hdGlvbi8yNGI5NTllNTEyNTBhODcyM2I5YTVhNGY3MGRjYWUwOFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRTaWduZWRVUkwoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnlQYXJhbXM6IFF1ZXJ5UGFyYW1zLCBkYXRlOiBEYXRlID0gbmV3IERhdGUoKSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIC8vIFJlZnJlc2ggY3JlZGVudGlhbHNcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNyZWRlbnRpYWxzLmdldFByb21pc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlZGVudGlhbHMuZ2V0UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwodGhpcy5jcmVkZW50aWFscy5hY2Nlc3NLZXlJZCwgJ2NyZWRlbnRpYWxzLmFjY2Vzc0tleUlkJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwodGhpcy5jcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXksICdjcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXknKTtcblxuICAgICAgICAvLyBQcmVwYXJlIGRhdGUgc3RyaW5nc1xuICAgICAgICBjb25zdCBkYXRldGltZVN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5nZXREYXRlVGltZVN0cmluZyhkYXRlKTtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5nZXREYXRlU3RyaW5nKGRhdGUpO1xuXG4gICAgICAgIC8vIFZhbGlkYXRlIGFuZCBwYXJzZSBlbmRwb2ludFxuICAgICAgICBjb25zdCBwcm90b2NvbCA9ICd3c3MnO1xuICAgICAgICBjb25zdCB1cmxQcm90b2NvbCA9IGAke3Byb3RvY29sfTovL2A7XG4gICAgICAgIGlmICghZW5kcG9pbnQuc3RhcnRzV2l0aCh1cmxQcm90b2NvbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRW5kcG9pbnQgJyR7ZW5kcG9pbnR9JyBpcyBub3QgYSBzZWN1cmUgV2ViU29ja2V0IGVuZHBvaW50LiBJdCBzaG91bGQgc3RhcnQgd2l0aCAnJHt1cmxQcm90b2NvbH0nLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmRwb2ludC5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuZHBvaW50ICcke2VuZHBvaW50fScgc2hvdWxkIG5vdCBjb250YWluIGFueSBxdWVyeSBwYXJhbWV0ZXJzLmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdGhTdGFydEluZGV4ID0gZW5kcG9pbnQuaW5kZXhPZignLycsIHVybFByb3RvY29sLmxlbmd0aCk7XG4gICAgICAgIGxldCBob3N0O1xuICAgICAgICBsZXQgcGF0aDtcbiAgICAgICAgaWYgKHBhdGhTdGFydEluZGV4IDwgMCkge1xuICAgICAgICAgICAgaG9zdCA9IGVuZHBvaW50LnN1YnN0cmluZyh1cmxQcm90b2NvbC5sZW5ndGgpO1xuICAgICAgICAgICAgcGF0aCA9ICcvJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvc3QgPSBlbmRwb2ludC5zdWJzdHJpbmcodXJsUHJvdG9jb2wubGVuZ3RoLCBwYXRoU3RhcnRJbmRleCk7XG4gICAgICAgICAgICBwYXRoID0gZW5kcG9pbnQuc3Vic3RyaW5nKHBhdGhTdGFydEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25lZEhlYWRlcnMgPSBbJ2hvc3QnXS5qb2luKCc7Jyk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBtZXRob2RcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ0dFVCc7IC8vIE1ldGhvZCBpcyBhbHdheXMgR0VUIGZvciBzaWduZWQgVVJMc1xuXG4gICAgICAgIC8vIFByZXBhcmUgY2Fub25pY2FsIHF1ZXJ5IHN0cmluZ1xuICAgICAgICBjb25zdCBjcmVkZW50aWFsU2NvcGUgPSBkYXRlU3RyaW5nICsgJy8nICsgdGhpcy5yZWdpb24gKyAnLycgKyB0aGlzLnNlcnZpY2UgKyAnLycgKyAnYXdzNF9yZXF1ZXN0JztcbiAgICAgICAgY29uc3QgY2Fub25pY2FsUXVlcnlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeVBhcmFtcywge1xuICAgICAgICAgICAgJ1gtQW16LUFsZ29yaXRobSc6IFNpZ1Y0UmVxdWVzdFNpZ25lci5ERUZBVUxUX0FMR09SSVRITSxcbiAgICAgICAgICAgICdYLUFtei1DcmVkZW50aWFsJzogdGhpcy5jcmVkZW50aWFscy5hY2Nlc3NLZXlJZCArICcvJyArIGNyZWRlbnRpYWxTY29wZSxcbiAgICAgICAgICAgICdYLUFtei1EYXRlJzogZGF0ZXRpbWVTdHJpbmcsXG4gICAgICAgICAgICAnWC1BbXotRXhwaXJlcyc6ICcyOTknLFxuICAgICAgICAgICAgJ1gtQW16LVNpZ25lZEhlYWRlcnMnOiBzaWduZWRIZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNhbm9uaWNhbFF1ZXJ5UGFyYW1zLCB7XG4gICAgICAgICAgICAgICAgJ1gtQW16LVNlY3VyaXR5LVRva2VuJzogdGhpcy5jcmVkZW50aWFscy5zZXNzaW9uVG9rZW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYW5vbmljYWxRdWVyeVN0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5jcmVhdGVRdWVyeVN0cmluZyhjYW5vbmljYWxRdWVyeVBhcmFtcyk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBjYW5vbmljYWwgaGVhZGVyc1xuICAgICAgICBjb25zdCBjYW5vbmljYWxIZWFkZXJzID0ge1xuICAgICAgICAgICAgaG9zdCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2Fub25pY2FsSGVhZGVyc1N0cmluZyA9IFNpZ1Y0UmVxdWVzdFNpZ25lci5jcmVhdGVIZWFkZXJzU3RyaW5nKGNhbm9uaWNhbEhlYWRlcnMpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgcGF5bG9hZCBoYXNoXG4gICAgICAgIGNvbnN0IHBheWxvYWRIYXNoID0gYXdhaXQgU2lnVjRSZXF1ZXN0U2lnbmVyLnNoYTI1NignJyk7XG5cbiAgICAgICAgLy8gQ29tYmluZSBjYW5vbmljYWwgcmVxdWVzdCBwYXJ0cyBpbnRvIGEgY2Fub25pY2FsIHJlcXVlc3Qgc3RyaW5nIGFuZCBoYXNoXG4gICAgICAgIGNvbnN0IGNhbm9uaWNhbFJlcXVlc3QgPSBbbWV0aG9kLCBwYXRoLCBjYW5vbmljYWxRdWVyeVN0cmluZywgY2Fub25pY2FsSGVhZGVyc1N0cmluZywgc2lnbmVkSGVhZGVycywgcGF5bG9hZEhhc2hdLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zdCBjYW5vbmljYWxSZXF1ZXN0SGFzaCA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5zaGEyNTYoY2Fub25pY2FsUmVxdWVzdCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHNpZ25hdHVyZVxuICAgICAgICBjb25zdCBzdHJpbmdUb1NpZ24gPSBbU2lnVjRSZXF1ZXN0U2lnbmVyLkRFRkFVTFRfQUxHT1JJVEhNLCBkYXRldGltZVN0cmluZywgY3JlZGVudGlhbFNjb3BlLCBjYW5vbmljYWxSZXF1ZXN0SGFzaF0uam9pbignXFxuJyk7XG4gICAgICAgIGNvbnN0IHNpZ25pbmdLZXkgPSBhd2FpdCB0aGlzLmdldFNpZ25hdHVyZUtleShkYXRlU3RyaW5nKTtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgU2lnVjRSZXF1ZXN0U2lnbmVyLnRvSGV4KGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKHNpZ25pbmdLZXksIHN0cmluZ1RvU2lnbikpO1xuXG4gICAgICAgIC8vIEFkZCBzaWduYXR1cmUgdG8gcXVlcnkgcGFyYW1zXG4gICAgICAgIGNvbnN0IHNpZ25lZFF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY2Fub25pY2FsUXVlcnlQYXJhbXMsIHtcbiAgICAgICAgICAgICdYLUFtei1TaWduYXR1cmUnOiBzaWduYXR1cmUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzaWduZWQgVVJMXG4gICAgICAgIHJldHVybiBwcm90b2NvbCArICc6Ly8nICsgaG9zdCArIHBhdGggKyAnPycgKyBTaWdWNFJlcXVlc3RTaWduZXIuY3JlYXRlUXVlcnlTdHJpbmcoc2lnbmVkUXVlcnlQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciBnZW5lcmF0aW5nIHRoZSBrZXkgdG8gdXNlIGZvciBjYWxjdWxhdGluZyB0aGUgc2lnbmF0dXJlLiBUaGlzIGNvbWJpbmVzIHRvZ2V0aGVyIHRoZSBkYXRlIHN0cmluZywgcmVnaW9uLCBzZXJ2aWNlIG5hbWUsIGFuZCBzZWNyZXRcbiAgICAgKiBhY2Nlc3Mga2V5LlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vZ2VuZXJhbC9sYXRlc3QvZ3Ivc2lndjQtY2FsY3VsYXRlLXNpZ25hdHVyZS5odG1sXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRTaWduYXR1cmVLZXkoZGF0ZVN0cmluZzogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICBjb25zdCBrRGF0ZSA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKCdBV1M0JyArIHRoaXMuY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5LCBkYXRlU3RyaW5nKTtcbiAgICAgICAgY29uc3Qga1JlZ2lvbiA9IGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKGtEYXRlLCB0aGlzLnJlZ2lvbik7XG4gICAgICAgIGNvbnN0IGtTZXJ2aWNlID0gYXdhaXQgU2lnVjRSZXF1ZXN0U2lnbmVyLmhtYWMoa1JlZ2lvbiwgdGhpcy5zZXJ2aWNlKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IFNpZ1Y0UmVxdWVzdFNpZ25lci5obWFjKGtTZXJ2aWNlLCAnYXdzNF9yZXF1ZXN0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIGNvbnZlcnRpbmcgYSBtYXAgb2YgaGVhZGVycyB0byBhIHN0cmluZyBmb3Igc2lnbmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVIZWFkZXJzU3RyaW5nKGhlYWRlcnM6IEhlYWRlcnMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaGVhZGVycylcbiAgICAgICAgICAgIC5tYXAoKGhlYWRlcikgPT4gYCR7aGVhZGVyfToke2hlYWRlcnNbaGVhZGVyXX1cXG5gKVxuICAgICAgICAgICAgLmpvaW4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3IgY29udmVydGluZyBhIG1hcCBvZiBxdWVyeSBwYXJhbWV0ZXJzIHRvIGEgc3RyaW5nIHdpdGggdGhlIHBhcmFtZXRlciBuYW1lcyBzb3J0ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXM6IFF1ZXJ5UGFyYW1zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxuICAgICAgICAgICAgLnNvcnQoKVxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5UGFyYW1zW2tleV0pfWApXG4gICAgICAgICAgICAuam9pbignJicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBkYXRldGltZSBzdHJpbmcgZm9yIHRoZSBnaXZlbiBkYXRlIHRvIHVzZSBmb3Igc2lnbmluZy4gRm9yIGV4YW1wbGU6IFwiMjAxOTA5MjdUMTY1MjEwWlwiXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBnZXREYXRlVGltZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwuXFxkezN9WiQvLCAnWicpXG4gICAgICAgICAgICAucmVwbGFjZSgvWzpcXC1dL2csICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgZGF0ZSBzdHJpbmcgZm9yIHRoZSBnaXZlbiBkYXRlIHRvIHVzZSBmb3Igc2lnbmluZy4gRm9yIGV4YW1wbGU6IFwiMjAxOTA5MjdcIlxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGF0ZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVRpbWVTdHJpbmcoZGF0ZSkuc3Vic3RyaW5nKDAsIDgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHNoYTI1NihtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoeyBuYW1lOiAnU0hBLTI1NicgfSwgdGhpcy50b1VpbnQ4QXJyYXkobWVzc2FnZSkpO1xuICAgICAgICByZXR1cm4gdGhpcy50b0hleChoYXNoQnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBobWFjKGtleTogc3RyaW5nIHwgQXJyYXlCdWZmZXIsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICAgICAgY29uc3Qga2V5QnVmZmVyID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZycgPyB0aGlzLnRvVWludDhBcnJheShrZXkpLmJ1ZmZlciA6IGtleTtcbiAgICAgICAgY29uc3QgbWVzc2FnZUJ1ZmZlciA9IHRoaXMudG9VaW50OEFycmF5KG1lc3NhZ2UpLmJ1ZmZlcjtcbiAgICAgICAgY29uc3QgY3J5cHRvS2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICAgICAgICAncmF3JyxcbiAgICAgICAgICAgIGtleUJ1ZmZlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnSE1BQycsXG4gICAgICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU0hBLTI1NicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIFsnc2lnbiddLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYXdhaXQgY3J5cHRvLnN1YnRsZS5zaWduKHsgbmFtZTogJ0hNQUMnLCBoYXNoOiB7IG5hbWU6ICdTSEEtMjU2JyB9IH0sIGNyeXB0b0tleSwgbWVzc2FnZUJ1ZmZlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90ZSB0aGF0IHRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3Qgd29yayB3aXRoIHR3by1ieXRlIGNoYXJhY3RlcnMuXG4gICAgICogSG93ZXZlciwgbm8gaW5wdXRzIGludG8gYSBzaWduZWQgc2lnbmFsaW5nIHNlcnZpY2UgcmVxdWVzdCBzaG91bGQgaGF2ZSB0d28tYnl0ZSBjaGFyYWN0ZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHRvVWludDhBcnJheShpbnB1dDogc3RyaW5nKTogVWludDhBcnJheSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihpbnB1dC5sZW5ndGgpO1xuICAgICAgICBjb25zdCBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIHN0ckxlbiA9IGlucHV0Lmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgICAgICBidWZWaWV3W2ldID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmVmlldztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0b0hleChidWZmZXI6IEFycmF5QnVmZmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuaW1wb3J0IHsgUXVlcnlQYXJhbXMgfSBmcm9tICcuL1F1ZXJ5UGFyYW1zJztcbmltcG9ydCB7IFJlcXVlc3RTaWduZXIgfSBmcm9tICcuL1JlcXVlc3RTaWduZXInO1xuaW1wb3J0IHsgUm9sZSB9IGZyb20gJy4vUm9sZSc7XG5pbXBvcnQgeyBTaWdWNFJlcXVlc3RTaWduZXIgfSBmcm9tICcuL1NpZ1Y0UmVxdWVzdFNpZ25lcic7XG5pbXBvcnQgRGF0ZVByb3ZpZGVyIGZyb20gJy4vaW50ZXJuYWwvRGF0ZVByb3ZpZGVyJztcbmltcG9ydCB7IHZhbGlkYXRlVmFsdWVOaWwsIHZhbGlkYXRlVmFsdWVOb25OaWwgfSBmcm9tICcuL2ludGVybmFsL3V0aWxzJztcblxuLyoqXG4gKiBBIHBhcnRpYWwgY29weSBvZiB0aGUgY3JlZGVudGlhbHMgZnJvbSB0aGUgQVdTIFNESyBmb3IgSlM6IGh0dHBzOi8vZ2l0aHViLmNvbS9hd3MvYXdzLXNkay1qcy9ibG9iL21hc3Rlci9saWIvY3JlZGVudGlhbHMuZC50c1xuICogVGhlIGludGVyZmFjZSBpcyBjb3BpZWQgaGVyZSBzbyB0aGF0IGEgZGVwZW5kZW5jeSBvbiB0aGUgQVdTIFNESyBmb3IgSlMgaXMgbm90IG5lZWRlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDcmVkZW50aWFscyB7XG4gICAgYWNjZXNzS2V5SWQ6IHN0cmluZztcbiAgICBzZWNyZXRBY2Nlc3NLZXk6IHN0cmluZztcbiAgICBzZXNzaW9uVG9rZW4/OiBzdHJpbmc7XG4gICAgZ2V0UHJvbWlzZT8oKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaWduYWxpbmdDbGllbnRDb25maWcge1xuICAgIGNoYW5uZWxBUk46IHN0cmluZztcbiAgICBjaGFubmVsRW5kcG9pbnQ6IHN0cmluZztcbiAgICBjcmVkZW50aWFscz86IENyZWRlbnRpYWxzO1xuICAgIHJlZ2lvbjogc3RyaW5nO1xuICAgIHJlcXVlc3RTaWduZXI/OiBSZXF1ZXN0U2lnbmVyO1xuICAgIHJvbGU6IFJvbGU7XG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XG4gICAgc3lzdGVtQ2xvY2tPZmZzZXQ/OiBudW1iZXI7XG59XG5cbmVudW0gTWVzc2FnZVR5cGUge1xuICAgIFNEUF9BTlNXRVIgPSAnU0RQX0FOU1dFUicsXG4gICAgU0RQX09GRkVSID0gJ1NEUF9PRkZFUicsXG4gICAgSUNFX0NBTkRJREFURSA9ICdJQ0VfQ0FORElEQVRFJyxcbiAgICBTVEFUVVNfUkVTUE9OU0UgPSAnU1RBVFVTX1JFU1BPTlNFJyxcbn1cblxuZW51bSBSZWFkeVN0YXRlIHtcbiAgICBDT05ORUNUSU5HLFxuICAgIE9QRU4sXG4gICAgQ0xPU0lORyxcbiAgICBDTE9TRUQsXG59XG5cbmludGVyZmFjZSBXZWJTb2NrZXRNZXNzYWdlIHtcbiAgICBtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGU7XG4gICAgbWVzc2FnZVBheWxvYWQ/OiBzdHJpbmc7XG4gICAgc2VuZGVyQ2xpZW50SWQ/OiBzdHJpbmc7XG4gICAgc3RhdHVzUmVzcG9uc2U/OiBTdGF0dXNSZXNwb25zZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0dXNSZXNwb25zZSB7XG4gICAgY29ycmVsYXRpb25JZDogJ3N0cmluZyc7XG4gICAgc3VjY2VzczogJ2Jvb2xlYW4nO1xuICAgIGVycm9yVHlwZT86ICdzdHJpbmcnO1xuICAgIHN0YXR1c0NvZGU/OiAnc3RyaW5nJztcbiAgICBkZXNjcmlwdGlvbj86ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIENsaWVudCBmb3Igc2VuZGluZyBhbmQgcmVjZWl2aW5nIG1lc3NhZ2VzIGZyb20gYSBLVlMgU2lnbmFsaW5nIENoYW5uZWwuIFRoZSBjbGllbnQgY2FuIG9wZXJhdGUgYXMgZWl0aGVyIHRoZSAnTUFTVEVSJyBvciBhICdWSUVXRVInLlxuICpcbiAqIFR5cGljYWxseSwgdGhlICdNQVNURVInIGxpc3RlbnMgZm9yIElDRSBjYW5kaWRhdGVzIGFuZCBTRFAgb2ZmZXJzIGFuZCByZXNwb25kcyB3aXRoIGFuZCBTRFAgYW5zd2VyIGFuZCBpdHMgb3duIElDRSBjYW5kaWRhdGVzLlxuICpcbiAqIFR5cGljYWxseSwgdGhlICdWSUVXRVInIHNlbmRzIGFuIFNEUCBvZmZlciBhbmQgaXRzIElDRSBjYW5kaWRhdGVzIGFuZCB0aGVuIGxpc3RlbnMgZm9yIElDRSBjYW5kaWRhdGVzIGFuZCBTRFAgYW5zd2VycyBmcm9tIHRoZSAnTUFTVEVSJy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpZ25hbGluZ0NsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9DTElFTlRfSUQgPSAnTUFTVEVSJztcblxuICAgIHByaXZhdGUgd2Vic29ja2V0OiBXZWJTb2NrZXQgPSBudWxsO1xuICAgIHByaXZhdGUgcmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ0xPU0VEO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdFNpZ25lcjogUmVxdWVzdFNpZ25lcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogU2lnbmFsaW5nQ2xpZW50Q29uZmlnO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkOiB7IFtjbGllbnRJZDogc3RyaW5nXTogb2JqZWN0W10gfSA9IHt9O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaGFzUmVjZWl2ZWRSZW1vdGVTRFBCeUNsaWVudElkOiB7IFtjbGllbnRJZDogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSBkYXRlUHJvdmlkZXI6IERhdGVQcm92aWRlcjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgU2lnbmFsaW5nQ2xpZW50LiBUaGUgY29ubmVjdGlvbiB3aXRoIHRoZSBzaWduYWxpbmcgc2VydmljZSBtdXN0IGJlIG9wZW5lZCB3aXRoIHRoZSAnb3BlbicgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7U2lnbmFsaW5nQ2xpZW50Q29uZmlnfSBjb25maWcgLSBDb25maWd1cmF0aW9uIG9wdGlvbnMgYW5kIHBhcmFtZXRlcnMuXG4gICAgICogaXMgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIGxvYWRlZCBmcm9tIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogU2lnbmFsaW5nQ2xpZW50Q29uZmlnKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gVmFsaWRhdGUgY29uZmlnXG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLCAnU2lnbmFsaW5nQ2xpZW50Q29uZmlnJyk7XG4gICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLnJvbGUsICdyb2xlJyk7XG4gICAgICAgIGlmIChjb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNsaWVudElkLCAnY2xpZW50SWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbGlkYXRlVmFsdWVOaWwoY29uZmlnLmNsaWVudElkLCAnY2xpZW50SWQnKTtcbiAgICAgICAgfVxuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5jaGFubmVsQVJOLCAnY2hhbm5lbEFSTicpO1xuICAgICAgICB2YWxpZGF0ZVZhbHVlTm9uTmlsKGNvbmZpZy5yZWdpb24sICdyZWdpb24nKTtcbiAgICAgICAgdmFsaWRhdGVWYWx1ZU5vbk5pbChjb25maWcuY2hhbm5lbEVuZHBvaW50LCAnY2hhbm5lbEVuZHBvaW50Jyk7XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSB7IC4uLmNvbmZpZyB9OyAvLyBDb3B5IGNvbmZpZyB0byBuZXcgb2JqZWN0IGZvciBpbW11dGFiaWxpdHkuXG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXF1ZXN0U2lnbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RTaWduZXIgPSBjb25maWcucmVxdWVzdFNpZ25lcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbGlkYXRlVmFsdWVOb25OaWwoY29uZmlnLmNyZWRlbnRpYWxzLCAnY3JlZGVudGlhbHMnKTtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFNpZ25lciA9IG5ldyBTaWdWNFJlcXVlc3RTaWduZXIoY29uZmlnLnJlZ2lvbiwgY29uZmlnLmNyZWRlbnRpYWxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0ZVByb3ZpZGVyID0gbmV3IERhdGVQcm92aWRlcihjb25maWcuc3lzdGVtQ2xvY2tPZmZzZXQgfHwgMCk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudCBoYW5kbGVyc1xuICAgICAgICB0aGlzLm9uT3BlbiA9IHRoaXMub25PcGVuLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25NZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIHNpZ25hbGluZyBzZXJ2aWNlLiBMaXN0ZW4gdG8gdGhlICdvcGVuJyBldmVudCB0byBiZSBub3RpZmllZCB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIG9wZW5lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gUmVhZHlTdGF0ZS5DTE9TRUQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IGlzIGFscmVhZHkgb3Blbiwgb3BlbmluZywgb3IgY2xvc2luZycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ09OTkVDVElORztcblxuICAgICAgICAvLyBUaGUgcHJvY2VzcyBvZiBvcGVuaW5nIHRoZSBjb25uZWN0aW9uIGlzIGFzeW5jaHJvbm91cyB2aWEgcHJvbWlzZXMsIGJ1dCB0aGUgaW50ZXJhY3Rpb24gbW9kZWwgaXMgdG8gaGFuZGxlIGFzeW5jaHJvbm91cyBhY3Rpb25zIHZpYSBldmVudHMuXG4gICAgICAgIC8vIFRoZXJlZm9yZSwgd2UganVzdCBraWNrIG9mZiB0aGUgYXN5bmNocm9ub3VzIHByb2Nlc3MgYW5kIHRoZW4gcmV0dXJuIGFuZCBsZXQgaXQgZmlyZSBldmVudHMuXG4gICAgICAgIHRoaXMuYXN5bmNPcGVuKClcbiAgICAgICAgICAgIC50aGVuKClcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB0aGlzLm9uRXJyb3IoZXJyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXN5bmNocm9ub3VzIGltcGxlbWVudGF0aW9uIG9mIGBvcGVuYC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGFzeW5jT3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFF1ZXJ5UGFyYW1zID0ge1xuICAgICAgICAgICAgJ1gtQW16LUNoYW5uZWxBUk4nOiB0aGlzLmNvbmZpZy5jaGFubmVsQVJOLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydYLUFtei1DbGllbnRJZCddID0gdGhpcy5jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2lnbmVkVVJMID0gYXdhaXQgdGhpcy5yZXF1ZXN0U2lnbmVyLmdldFNpZ25lZFVSTCh0aGlzLmNvbmZpZy5jaGFubmVsRW5kcG9pbnQsIHF1ZXJ5UGFyYW1zLCB0aGlzLmRhdGVQcm92aWRlci5nZXREYXRlKCkpO1xuXG4gICAgICAgIC8vIElmIHNvbWV0aGluZyBjYXVzZWQgdGhlIHN0YXRlIHRvIGNoYW5nZSBmcm9tIENPTk5FQ1RJTkcsIHRoZW4gZG9uJ3QgY3JlYXRlIHRoZSBXZWJTb2NrZXQgaW5zdGFuY2UuXG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFJlYWR5U3RhdGUuQ09OTkVDVElORykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgKFdlYlNvY2tldCB8fCByZXF1aXJlKCd3cycpKShzaWduZWRVUkwpO1xuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLm9uT3Blbik7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uQ2xvc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgS1ZTIFNpZ25hbGluZyBTZXJ2aWNlLiBJZiBhbHJlYWR5IGNsb3NlZCBvciBjbG9zaW5nLCBubyBhY3Rpb24gaXMgdGFrZW4uIExpc3RlbiB0byB0aGUgJ2Nsb3NlJyBldmVudCB0byBiZSBub3RpZmllZCB3aGVuIHRoZVxuICAgICAqIGNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkNMT1NJTkc7XG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gUmVhZHlTdGF0ZS5DTE9TRUQpIHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgdGhlIGdpdmVuIFNEUCBvZmZlciB0byB0aGUgc2lnbmFsaW5nIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBUeXBpY2FsbHksIG9ubHkgdGhlICdWSUVXRVInIHJvbGUgc2hvdWxkIHNlbmQgYW4gU0RQIG9mZmVyLlxuICAgICAqIEBwYXJhbSB7UlRDU2Vzc2lvbkRlc2NyaXB0aW9ufSBzZHBPZmZlciAtIFNEUCBvZmZlciB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbY29ycmVsYXRpb25JZF0gLSBVbmlxdWUgSUQgZm9yIHRoaXMgbWVzc2FnZS4gSWYgdGhpcyBpcyBwcmVzZW50IGFuZCB0aGVyZSBpcyBhbiBlcnJvcixcbiAgICAgKiBTaWduYWxpbmcgd2lsbCBzZW5kIGEgU3RhdHVzUmVzcG9uc2UgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBlcnJvci4gSWYgdGhpcyBpcyBub3QgcHJlc2VudCwgbm8gZXJyb3Igd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VuZFNkcE9mZmVyKHNkcE9mZmVyOiBSVENTZXNzaW9uRGVzY3JpcHRpb24sIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nLCBjb3JyZWxhdGlvbklkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoTWVzc2FnZVR5cGUuU0RQX09GRkVSLCBzZHBPZmZlciwgcmVjaXBpZW50Q2xpZW50SWQsIGNvcnJlbGF0aW9uSWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIHRoZSBnaXZlbiBTRFAgYW5zd2VyIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgb25seSB0aGUgJ01BU1RFUicgcm9sZSBzaG91bGQgc2VuZCBhbiBTRFAgYW5zd2VyLlxuICAgICAqIEBwYXJhbSB7UlRDU2Vzc2lvbkRlc2NyaXB0aW9ufSBzZHBBbnN3ZXIgLSBTRFAgYW5zd2VyIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWNpcGllbnRDbGllbnRJZF0gLSBJRCBvZiB0aGUgY2xpZW50IHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uIFJlcXVpcmVkIGZvciAnTUFTVEVSJyByb2xlLiBTaG91bGQgbm90IGJlIHByZXNlbnQgZm9yICdWSUVXRVInIHJvbGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtjb3JyZWxhdGlvbklkXSAtIFVuaXF1ZSBJRCBmb3IgdGhpcyBtZXNzYWdlLiBJZiB0aGlzIGlzIHByZXNlbnQgYW5kIHRoZXJlIGlzIGFuIGVycm9yLFxuICAgICAqIFNpZ25hbGluZyB3aWxsIHNlbmQgYSBTdGF0dXNSZXNwb25zZSBtZXNzYWdlIGRlc2NyaWJpbmcgdGhlIGVycm9yLiBJZiB0aGlzIGlzIG5vdCBwcmVzZW50LCBubyBlcnJvciB3aWxsIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZW5kU2RwQW5zd2VyKHNkcEFuc3dlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLCByZWNpcGllbnRDbGllbnRJZD86IHN0cmluZywgY29ycmVsYXRpb25JZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKE1lc3NhZ2VUeXBlLlNEUF9BTlNXRVIsIHNkcEFuc3dlciwgcmVjaXBpZW50Q2xpZW50SWQsIGNvcnJlbGF0aW9uSWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIHRoZSBnaXZlbiBJQ0UgY2FuZGlkYXRlIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKlxuICAgICAqIFR5cGljYWxseSwgYm90aCB0aGUgJ1ZJRVdFUicgcm9sZSBhbmQgJ01BU1RFUicgcm9sZSBzaG91bGQgc2VuZCBJQ0UgY2FuZGlkYXRlcy5cbiAgICAgKiBAcGFyYW0ge1JUQ0ljZUNhbmRpZGF0ZX0gaWNlQ2FuZGlkYXRlIC0gSUNFIGNhbmRpZGF0ZSB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVjaXBpZW50Q2xpZW50SWRdIC0gSUQgb2YgdGhlIGNsaWVudCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLiBSZXF1aXJlZCBmb3IgJ01BU1RFUicgcm9sZS4gU2hvdWxkIG5vdCBiZSBwcmVzZW50IGZvciAnVklFV0VSJyByb2xlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbY29ycmVsYXRpb25JZF0gLSBVbmlxdWUgSUQgZm9yIHRoaXMgbWVzc2FnZS4gSWYgdGhpcyBpcyBwcmVzZW50IGFuZCB0aGVyZSBpcyBhbiBlcnJvcixcbiAgICAgKiBTaWduYWxpbmcgd2lsbCBzZW5kIGEgU3RhdHVzUmVzcG9uc2UgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBlcnJvci4gSWYgdGhpcyBpcyBub3QgcHJlc2VudCwgbm8gZXJyb3Igd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VuZEljZUNhbmRpZGF0ZShpY2VDYW5kaWRhdGU6IFJUQ0ljZUNhbmRpZGF0ZSwgcmVjaXBpZW50Q2xpZW50SWQ/OiBzdHJpbmcsIGNvcnJlbGF0aW9uSWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShNZXNzYWdlVHlwZS5JQ0VfQ0FORElEQVRFLCBpY2VDYW5kaWRhdGUsIHJlY2lwaWVudENsaWVudElkLCBjb3JyZWxhdGlvbklkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIGlzIG9wZW4gYW5kIHRoYXQgdGhlIHJlY2lwaWVudCBjbGllbnQgaWQgaXMgcHJlc2VudCBpZiBzZW5kaW5nIGFzIHRoZSAnTUFTVEVSJy4gRW5jb2RlcyB0aGUgZ2l2ZW4gbWVzc2FnZSBwYXlsb2FkXG4gICAgICogYW5kIHNlbmRzIHRoZSBtZXNzYWdlIHRvIHRoZSBzaWduYWxpbmcgc2VydmljZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbmRNZXNzYWdlKGFjdGlvbjogTWVzc2FnZVR5cGUsIG1lc3NhZ2VQYXlsb2FkOiBvYmplY3QsIHJlY2lwaWVudENsaWVudElkPzogc3RyaW5nLCBjb3JyZWxhdGlvbklkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFJlYWR5U3RhdGUuT1BFTikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3Qgc2VuZCBtZXNzYWdlIGJlY2F1c2UgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHNpZ25hbGluZyBzZXJ2aWNlIGlzIG5vdCBvcGVuLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsaWRhdGVSZWNpcGllbnRDbGllbnRJZChyZWNpcGllbnRDbGllbnRJZCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVDb3JyZWxhdGlvbklkKGNvcnJlbGF0aW9uSWQpO1xuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LnNlbmQoXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VQYXlsb2FkOiBTaWduYWxpbmdDbGllbnQuc2VyaWFsaXplSlNPTk9iamVjdEFzQmFzZTY0U3RyaW5nKG1lc3NhZ2VQYXlsb2FkKSxcbiAgICAgICAgICAgICAgICByZWNpcGllbnRDbGllbnRJZDogcmVjaXBpZW50Q2xpZW50SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGNvcnJlbGF0aW9uSWQ6IGNvcnJlbGF0aW9uSWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIFdlYlNvY2tldCBhbmQgcmVtb3ZlcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgY2xlYW51cFdlYlNvY2tldCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMud2Vic29ja2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMub25PcGVuKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlKTtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uRXJyb3IpO1xuICAgICAgICB0aGlzLndlYnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XG4gICAgICAgIHRoaXMud2Vic29ja2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgJ29wZW4nIGV2ZW50IGhhbmRsZXIuIEZvcndhcmRzIHRoZSBldmVudCBvbiB0byBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbk9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuT1BFTjtcbiAgICAgICAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2ViU29ja2V0ICdtZXNzYWdlJyBldmVudCBoYW5kbGVyLiBBdHRlbXB0cyB0byBwYXJzZSB0aGUgbWVzc2FnZSBhbmQgaGFuZGxlIGl0IGFjY29yZGluZyB0byB0aGUgbWVzc2FnZSB0eXBlLlxuICAgICAqL1xuICAgIHByaXZhdGUgb25NZXNzYWdlKGV2ZW50OiBNZXNzYWdlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcnNlZEV2ZW50RGF0YTogV2ViU29ja2V0TWVzc2FnZTtcbiAgICAgICAgbGV0IHBhcnNlZE1lc3NhZ2VQYXlsb2FkOiBvYmplY3Q7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYXJzZWRFdmVudERhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpIGFzIFdlYlNvY2tldE1lc3NhZ2U7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIEZvciBmb3J3YXJkcyBjb21wYXRpYmlsaXR5IHdlIGlnbm9yZSBtZXNzYWdlcyB0aGF0IGFyZSBub3QgYWJsZSB0byBiZSBwYXJzZWQuXG4gICAgICAgICAgICAvLyBUT0RPOiBDb25zaWRlciBob3cgdG8gbWFrZSBpdCBlYXNpZXIgZm9yIHVzZXJzIHRvIGJlIGF3YXJlIG9mIGRyb3BwZWQgbWVzc2FnZXMuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhcnNlZE1lc3NhZ2VQYXlsb2FkID0gU2lnbmFsaW5nQ2xpZW50LnBhcnNlSlNPTk9iamVjdEZyb21CYXNlNjRTdHJpbmcocGFyc2VkRXZlbnREYXRhLm1lc3NhZ2VQYXlsb2FkKTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ETzogQ29uc2lkZXIgaG93IHRvIG1ha2UgaXQgZWFzaWVyIGZvciB1c2VycyB0byBiZSBhd2FyZSBvZiBkcm9wcGVkIG1lc3NhZ2VzLlxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZVR5cGUsIHNlbmRlckNsaWVudElkLCBzdGF0dXNSZXNwb25zZSB9ID0gcGFyc2VkRXZlbnREYXRhO1xuICAgICAgICBpZiAoIXBhcnNlZE1lc3NhZ2VQYXlsb2FkICYmICFzdGF0dXNSZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gVE9ETzogQ29uc2lkZXIgaG93IHRvIG1ha2UgaXQgZWFzaWVyIGZvciB1c2VycyB0byBiZSBhd2FyZSBvZiBkcm9wcGVkIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChtZXNzYWdlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5TRFBfT0ZGRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzZHBPZmZlcicsIHBhcnNlZE1lc3NhZ2VQYXlsb2FkLCBzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UGVuZGluZ0ljZUNhbmRpZGF0ZXMoc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuU0RQX0FOU1dFUjpcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3NkcEFuc3dlcicsIHBhcnNlZE1lc3NhZ2VQYXlsb2FkLCBzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UGVuZGluZ0ljZUNhbmRpZGF0ZXMoc2VuZGVyQ2xpZW50SWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuSUNFX0NBTkRJREFURTpcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRPclF1ZXVlSWNlQ2FuZGlkYXRlKHBhcnNlZE1lc3NhZ2VQYXlsb2FkLCBzZW5kZXJDbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5TVEFUVVNfUkVTUE9OU0U6XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzdGF0dXNSZXNwb25zZScsIHN0YXR1c1Jlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyB0aGUgZ2l2ZW4gYmFzZTY0IGVuY29kZWQgc3RyaW5nIGFuZCBkZWNvZGVzIGl0IGludG8gYSBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBwYXJzZUpTT05PYmplY3RGcm9tQmFzZTY0U3RyaW5nKGJhc2U2NEVuY29kZWRTdHJpbmc6IHN0cmluZyk6IG9iamVjdCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShhdG9iKGJhc2U2NEVuY29kZWRTdHJpbmcpKTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoQnVmZmVyLmZyb20oYmFzZTY0RW5jb2RlZFN0cmluZywgJ2Jhc2U2NCcpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGdpdmVuIEpTT04gb2JqZWN0IGFuZCBlbmNvZGVzIGl0IGludG8gYSBiYXNlNjQgc3RyaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHNlcmlhbGl6ZUpTT05PYmplY3RBc0Jhc2U2NFN0cmluZyhvYmplY3Q6IG9iamVjdCk6IHN0cmluZyB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYnRvYShKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaGFzIGFscmVhZHkgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSBnaXZlbiBjbGllbnQsIHRoZW4gdGhlIGdpdmVuIElDRSBjYW5kaWRhdGUgaXMgZW1pdHRlZC4gT3RoZXJ3aXNlLCBpdCBpcyBxdWV1ZWQgdXAgZm9yIHdoZW5cbiAgICAgKiBhbiBTRFAgb2ZmZXIgb3IgYW5zd2VyIGlzIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZW1pdE9yUXVldWVJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlOiBvYmplY3QsIGNsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNsaWVudElkS2V5ID0gY2xpZW50SWQgfHwgU2lnbmFsaW5nQ2xpZW50LkRFRkFVTFRfQ0xJRU5UX0lEO1xuICAgICAgICBpZiAodGhpcy5oYXNSZWNlaXZlZFJlbW90ZVNEUEJ5Q2xpZW50SWRbY2xpZW50SWRLZXldKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2ljZUNhbmRpZGF0ZScsIGljZUNhbmRpZGF0ZSwgY2xpZW50SWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkS2V5XS5wdXNoKGljZUNhbmRpZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbnkgcGVuZGluZyBJQ0UgY2FuZGlkYXRlcyBmb3IgdGhlIGdpdmVuIGNsaWVudCBhbmQgcmVjb3JkcyB0aGF0IGFuIFNEUCBvZmZlciBvciBhbnN3ZXIgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgY2xpZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZW1pdFBlbmRpbmdJY2VDYW5kaWRhdGVzKGNsaWVudElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNsaWVudElkS2V5ID0gY2xpZW50SWQgfHwgU2lnbmFsaW5nQ2xpZW50LkRFRkFVTFRfQ0xJRU5UX0lEO1xuICAgICAgICB0aGlzLmhhc1JlY2VpdmVkUmVtb3RlU0RQQnlDbGllbnRJZFtjbGllbnRJZEtleV0gPSB0cnVlO1xuICAgICAgICBjb25zdCBwZW5kaW5nSWNlQ2FuZGlkYXRlcyA9IHRoaXMucGVuZGluZ0ljZUNhbmRpZGF0ZXNCeUNsaWVudElkW2NsaWVudElkS2V5XTtcbiAgICAgICAgaWYgKCFwZW5kaW5nSWNlQ2FuZGlkYXRlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBlbmRpbmdJY2VDYW5kaWRhdGVzQnlDbGllbnRJZFtjbGllbnRJZEtleV07XG4gICAgICAgIHBlbmRpbmdJY2VDYW5kaWRhdGVzLmZvckVhY2goKGljZUNhbmRpZGF0ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdpY2VDYW5kaWRhdGUnLCBpY2VDYW5kaWRhdGUsIGNsaWVudElkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSByZWNpcGllbnQgY2xpZW50IGlkIGlzIG51bGwgYW5kIHRoZSBjdXJyZW50IHJvbGUgaXMgJ01BU1RFUicgYXMgYWxsIG1lc3NhZ2VzIHNlbnQgYXMgJ01BU1RFUicgc2hvdWxkIGhhdmUgYSByZWNpcGllbnQgY2xpZW50IGlkLlxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVSZWNpcGllbnRDbGllbnRJZChyZWNpcGllbnRDbGllbnRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb25maWcucm9sZSA9PT0gUm9sZS5WSUVXRVIgJiYgcmVjaXBpZW50Q2xpZW50SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCByZWNpcGllbnQgY2xpZW50IGlkLiBBcyB0aGUgVklFV0VSLCBtZXNzYWdlcyBtdXN0IG5vdCBiZSBzZW50IHdpdGggYSByZWNpcGllbnQgY2xpZW50IGlkLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjb3JyZWxhdGlvbklkIGRvZXMgbm90IGZpdCB0aGUgY29uc3RyYWludHMgbWVudGlvbmVkIGluIHtAbGluayBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20va2luZXNpc3ZpZGVvc3RyZWFtcy13ZWJydGMtZGcvbGF0ZXN0L2Rldmd1aWRlL2t2c3dlYnJ0Yy13ZWJzb2NrZXQtYXBpczQuaHRtbCB0aGUgZG9jdW1lbnRhdGlvbn0uXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUNvcnJlbGF0aW9uSWQoY29ycmVsYXRpb25JZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoY29ycmVsYXRpb25JZCAmJiAhL15bYS16QS1aMC05Xy4tXXsxLDI1Nn0kLy50ZXN0KGNvcnJlbGF0aW9uSWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvcnJlbGF0aW9uIGlkIGRvZXMgbm90IGZpdCB0aGUgY29uc3RyYWludCEnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICdlcnJvcicgZXZlbnQgaGFuZGxlci4gRm9yd2FyZHMgdGhlIGVycm9yIG9udG8gbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHByaXZhdGUgb25FcnJvcihlcnJvcjogRXJyb3IgfCBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICdjbG9zZScgZXZlbnQgaGFuZGxlci4gRm9yd2FyZHMgdGhlIGVycm9yIG9udG8gbGlzdGVuZXJzIGFuZCBjbGVhbnMgdXAgdGhlIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkNMT1NFRDtcbiAgICAgICAgdGhpcy5jbGVhbnVwV2ViU29ja2V0KCk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFByb3ZpZGVzIGRhdGVzIHdpdGggYW4gb2Zmc2V0IHRvIGFjY291bnQgZm9yIGxvY2FsIGNsb2NrIHNrZXcuXG4gKlxuICogVW5mb3J0dW5hdGVseSwgV2ViU29ja2V0cyBpbiB0aGUgd2ViIGRvIG5vdCBwcm92aWRlIGFueSBvZiB0aGUgY29ubmVjdGlvbiBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gZGV0ZXJtaW5lIHRoZSBjbG9jayBza2V3IGZyb20gYSBmYWlsZWQgY29ubmVjdGlvbiByZXF1ZXN0LlxuICogVGhlcmVmb3JlLCBhIGhhcmQgY29kZWQgb2Zmc2V0IGlzIHVzZWQgdGhhdCBpcyBwcm92aWRlZCBmcm9tIHRoZSBBV1MgU0RLLlxuICpcbiAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0phdmFTY3JpcHRTREsvbGF0ZXN0L0FXUy9Db25maWcuaHRtbCNjb3JyZWN0Q2xvY2tTa2V3LXByb3BlcnR5fVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUHJvdmlkZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2xvY2tPZmZzZXRNczogbnVtYmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNsb2NrT2Zmc2V0TXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNsb2NrT2Zmc2V0TXMgPSBjbG9ja09mZnNldE1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZSB3aXRoIGFueSBjb25maWd1cmVkIGNsb2NrIG9mZnNldCBhcHBsaWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXREYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5ub3coKSArIHRoaXMuY2xvY2tPZmZzZXRNcyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IG51bGwsIHVuZGVmaW5lZCwgb3IgZW1wdHkgc3RyaW5nIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVOb25OaWwodmFsdWU6IGFueSwgdmFsdWVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIG51bGxgKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlTmFtZX0gY2Fubm90IGJlIHVuZGVmaW5lZGApO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZU5hbWV9IGNhbm5vdCBiZSBlbXB0eWApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgZ2l2ZW4gdmFsdWUgaXMgbnVsbCwgdW5kZWZpbmVkLCBvciBlbXB0eSBzdHJpbmcgYW5kIHRocm93cyBhbiBlcnJvciBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZU5pbCh2YWx1ZTogYW55LCB2YWx1ZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWVOYW1lfSBzaG91bGQgYmUgbnVsbGApO1xuICAgIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NyZWF0ZUJpbmRpbmcobywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnd3MgZG9lcyBub3Qgd29yayBpbiB0aGUgYnJvd3Nlci4gQnJvd3NlciBjbGllbnRzIG11c3QgdXNlIHRoZSBuYXRpdmUgJyArXG4gICAgICAnV2ViU29ja2V0IG9iamVjdCdcbiAgKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImNyeXB0b1wiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIVxuQW1hem9uIEtpbmVzaXMgVmlkZW8gU3RyZWFtcyBXZWJSVEMgU0RLIGZvciBKYXZhU2NyaXB0XG5Db3B5cmlnaHQgMjAxOS0yMDE5IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cblRoaXMgcHJvZHVjdCBpbmNsdWRlcyBzb2Z0d2FyZSBkZXZlbG9wZWQgYXRcbkFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gKGh0dHA6Ly9hd3MuYW1hem9uLmNvbS8pLlxuKi9cbmV4cG9ydCB7IFJvbGUgfSBmcm9tICcuL1JvbGUnO1xuZXhwb3J0IHsgU2lnbmFsaW5nQ2xpZW50IH0gZnJvbSAnLi9TaWduYWxpbmdDbGllbnQnO1xuZXhwb3J0IHsgU2lnVjRSZXF1ZXN0U2lnbmVyIH0gZnJvbSAnLi9TaWdWNFJlcXVlc3RTaWduZXInO1xuZXhwb3J0IHsgUXVlcnlQYXJhbXMgfSBmcm9tICcuL1F1ZXJ5UGFyYW1zJztcbmV4cG9ydCB7IFJlcXVlc3RTaWduZXIgfSBmcm9tICcuL1JlcXVlc3RTaWduZXInO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IHByb2Nlc3MuZW52LlBBQ0tBR0VfVkVSU0lPTjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==