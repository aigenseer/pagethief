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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/jszip/dist/jszip.min.js":
/*!**********************************************!*\
  !*** ./node_modules/jszip/dist/jszip.min.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, setImmediate) {var require;var require;/*!

JSZip v3.3.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(t){if(true)module.exports=t();else {}}(function(){return function s(a,o,h){function u(r,t){if(!o[r]){if(!a[r]){var e="function"==typeof require&&require;if(!t&&e)return require(r,!0);if(l)return l(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var n=o[r]={exports:{}};a[r][0].call(n.exports,function(t){var e=a[r][1][t];return u(e||t)},n,n.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,t=0;t<h.length;t++)u(h[t]);return u}({1:[function(t,e,r){"use strict";var c=t("./utils"),d=t("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(t){for(var e,r,i,n,s,a,o,h=[],u=0,l=t.length,f=l,d="string"!==c.getTypeOf(t);u<t.length;)f=l-u,i=d?(e=t[u++],r=u<l?t[u++]:0,u<l?t[u++]:0):(e=t.charCodeAt(u++),r=u<l?t.charCodeAt(u++):0,u<l?t.charCodeAt(u++):0),n=e>>2,s=(3&e)<<4|r>>4,a=1<f?(15&r)<<2|i>>6:64,o=2<f?63&i:64,h.push(p.charAt(n)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(t){var e,r,i,n,s,a,o=0,h=0,u="data:";if(t.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(t.charAt(t.length-1)===p.charAt(64)&&f--,t.charAt(t.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=d.uint8array?new Uint8Array(0|f):new Array(0|f);o<t.length;)e=p.indexOf(t.charAt(o++))<<2|(n=p.indexOf(t.charAt(o++)))>>4,r=(15&n)<<4|(s=p.indexOf(t.charAt(o++)))>>2,i=(3&s)<<6|(a=p.indexOf(t.charAt(o++))),l[h++]=e,64!==s&&(l[h++]=r),64!==a&&(l[h++]=i);return l}},{"./support":30,"./utils":32}],2:[function(t,e,r){"use strict";var i=t("./external"),n=t("./stream/DataWorker"),s=t("./stream/DataLengthProbe"),a=t("./stream/Crc32Probe");s=t("./stream/DataLengthProbe");function o(t,e,r,i,n){this.compressedSize=t,this.uncompressedSize=e,this.crc32=r,this.compression=i,this.compressedContent=n}o.prototype={getContentWorker:function(){var t=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")),e=this;return t.on("end",function(){if(this.streamInfo.data_length!==e.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),t},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(t,e,r){return t.pipe(new a).pipe(new s("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new s("compressedSize")).withStreamInfo("compression",e)},e.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,e,r){"use strict";var i=t("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(t){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},r.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,e,r){"use strict";var i=t("./utils");var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e){return void 0!==t&&t.length?"string"!==i.getTypeOf(t)?function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}(0|e,t,t.length,0):function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e.charCodeAt(a))];return-1^t}(0|e,t,t.length,0):0}},{"./utils":32}],5:[function(t,e,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(t,e,r){"use strict";var i=null;i="undefined"!=typeof Promise?Promise:t("lie"),e.exports={Promise:i}},{lie:37}],7:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,n=t("pako"),s=t("./utils"),a=t("./stream/GenericWorker"),o=i?"uint8array":"array";function h(t,e){a.call(this,"FlateWorker/"+t),this._pako=null,this._pakoAction=t,this._pakoOptions=e,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(t){this.meta=t.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,t.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},r.compressWorker=function(t){return new h("Deflate",t)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,e,r){"use strict";function A(t,e){var r,i="";for(r=0;r<e;r++)i+=String.fromCharCode(255&t),t>>>=8;return i}function i(t,e,r,i,n,s){var a,o,h=t.file,u=t.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),d=I.transformTo("string",O.utf8encode(h.name)),c=h.comment,p=I.transformTo("string",s(c)),m=I.transformTo("string",O.utf8encode(c)),_=d.length!==h.name.length,g=m.length!==c.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};e&&!r||(x.crc32=t.crc32,x.compressedSize=t.compressedSize,x.uncompressedSize=t.uncompressedSize);var S=0;e&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===n?(C=798,z|=function(t,e){var r=t;return t||(r=e?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(t){return 63&(t||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+d,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(i,4)+f+b+p}}var I=t("../utils"),n=t("../stream/GenericWorker"),O=t("../utf8"),B=t("../crc32"),R=t("../signature");function s(t,e,r,i){n.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=e,this.zipPlatform=r,this.encodeFileName=i,this.streamFiles=t,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,n),s.prototype.push=function(t){var e=t.meta.percent||0,r=this.entriesCount,i=this._sources.length;this.accumulate?this.contentBuffer.push(t):(this.bytesWritten+=t.data.length,n.prototype.push.call(this,{data:t.data,meta:{currentFile:this.currentFile,percent:r?(e+100*(r-i-1))/r:100}}))},s.prototype.openedSource=function(t){this.currentSourceOffset=this.bytesWritten,this.currentFile=t.file.name;var e=this.streamFiles&&!t.file.dir;if(e){var r=i(t,e,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(t){this.accumulate=!1;var e=this.streamFiles&&!t.file.dir,r=i(t,e,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),e)this.push({data:function(t){return R.DATA_DESCRIPTOR+A(t.crc32,4)+A(t.compressedSize,4)+A(t.uncompressedSize,4)}(t),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var t=this.bytesWritten,e=0;e<this.dirRecords.length;e++)this.push({data:this.dirRecords[e],meta:{percent:100}});var r=this.bytesWritten-t,i=function(t,e,r,i,n){var s=I.transformTo("string",n(i));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(t,2)+A(t,2)+A(e,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,t,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(t){this._sources.push(t);var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.closedSource(e.previous.streamInfo),e._sources.length?e.prepareNextSource():e.end()}),t.on("error",function(t){e.error(t)}),this},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(t){var e=this._sources;if(!n.prototype.error.call(this,t))return!1;for(var r=0;r<e.length;r++)try{e[r].error(t)}catch(t){}return!0},s.prototype.lock=function(){n.prototype.lock.call(this);for(var t=this._sources,e=0;e<t.length;e++)t[e].lock()},e.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,e,r){"use strict";var u=t("../compressions"),i=t("./ZipFileWorker");r.generateWorker=function(t,a,e){var o=new i(a.streamFiles,e,a.platform,a.encodeFileName),h=0;try{t.forEach(function(t,e){h++;var r=function(t,e){var r=t||e,i=u[r];if(!i)throw new Error(r+" is not a valid compression method !");return i}(e.options.compression,a.compression),i=e.options.compressionOptions||a.compressionOptions||{},n=e.dir,s=e.date;e._compressWorker(r,i).withStreamInfo("file",{name:t,dir:n,date:s,comment:e.comment||"",unixPermissions:e.unixPermissions,dosPermissions:e.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(t){o.error(t)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,e,r){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var t=new i;for(var e in this)"function"!=typeof this[e]&&(t[e]=this[e]);return t}}(i.prototype=t("./object")).loadAsync=t("./load"),i.support=t("./support"),i.defaults=t("./defaults"),i.version="3.2.0",i.loadAsync=function(t,e){return(new i).loadAsync(t,e)},i.external=t("./external"),e.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,e,r){"use strict";var i=t("./utils"),n=t("./external"),o=t("./utf8"),h=(i=t("./utils"),t("./zipEntries")),s=t("./stream/Crc32Probe"),u=t("./nodejsUtils");function l(i){return new n.Promise(function(t,e){var r=i.decompressed.getContentWorker().pipe(new s);r.on("error",function(t){e(t)}).on("end",function(){r.streamInfo.crc32!==i.decompressed.crc32?e(new Error("Corrupted zip : CRC32 mismatch")):t()}).resume()})}e.exports=function(t,s){var a=this;return s=i.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),u.isNode&&u.isStream(t)?n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",t,!0,s.optimizedBinaryString,s.base64).then(function(t){var e=new h(s);return e.load(t),e}).then(function(t){var e=[n.Promise.resolve(t)],r=t.files;if(s.checkCRC32)for(var i=0;i<r.length;i++)e.push(l(r[i]));return n.Promise.all(e)}).then(function(t){for(var e=t.shift(),r=e.files,i=0;i<r.length;i++){var n=r[i];a.file(n.fileNameStr,n.decompressed,{binary:!0,optimizedBinaryString:!0,date:n.date,dir:n.dir,comment:n.fileCommentStr.length?n.fileCommentStr:null,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions,createFolders:s.createFolders})}return e.zipComment.length&&(a.comment=e.zipComment),a})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../stream/GenericWorker");function s(t,e){n.call(this,"Nodejs stream input adapter for "+t),this._upstreamEnded=!1,this._bindStream(e)}i.inherits(s,n),s.prototype._bindStream=function(t){var e=this;(this._stream=t).pause(),t.on("data",function(t){e.push({data:t,meta:{percent:0}})}).on("error",function(t){e.isPaused?this.generatedError=t:e.error(t)}).on("end",function(){e.isPaused?e._upstreamEnded=!0:e.end()})},s.prototype.pause=function(){return!!n.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},e.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,e,r){"use strict";var n=t("readable-stream").Readable;function i(t,e,r){n.call(this,e),this._helper=t;var i=this;t.on("data",function(t,e){i.push(t)||i._helper.pause(),r&&r(e)}).on("error",function(t){i.emit("error",t)}).on("end",function(){i.push(null)})}t("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},e.exports=i},{"../utils":32,"readable-stream":16}],14:[function(t,e,r){"use strict";e.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(t,e){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(t,e);if("number"==typeof t)throw new Error('The "data" argument must not be a number');return new Buffer(t,e)},allocBuffer:function(t){if(Buffer.alloc)return Buffer.alloc(t);var e=new Buffer(t);return e.fill(0),e},isBuffer:function(t){return Buffer.isBuffer(t)},isStream:function(t){return t&&"function"==typeof t.on&&"function"==typeof t.pause&&"function"==typeof t.resume}}},{}],15:[function(t,e,r){"use strict";function s(t,e,r){var i,n=u.getTypeOf(e),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(t=g(t)),s.createFolders&&(i=_(t))&&b.call(this,i,!0);var a="string"===n&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(e instanceof d&&0===e.uncompressedSize||s.dir||!e||0===e.length)&&(s.base64=!1,s.binary=!0,e="",s.compression="STORE",n="string");var o=null;o=e instanceof d||e instanceof l?e:p.isNode&&p.isStream(e)?new m(t,e):u.prepareContent(t,e,s.binary,s.optimizedBinaryString,s.base64);var h=new c(t,o,s);this.files[t]=h}var n=t("./utf8"),u=t("./utils"),l=t("./stream/GenericWorker"),a=t("./stream/StreamHelper"),f=t("./defaults"),d=t("./compressedObject"),c=t("./zipObject"),o=t("./generate"),p=t("./nodejsUtils"),m=t("./nodejs/NodejsStreamInputAdapter"),_=function(t){"/"===t.slice(-1)&&(t=t.substring(0,t.length-1));var e=t.lastIndexOf("/");return 0<e?t.substring(0,e):""},g=function(t){return"/"!==t.slice(-1)&&(t+="/"),t},b=function(t,e){return e=void 0!==e?e:f.createFolders,t=g(t),this.files[t]||s.call(this,t,null,{dir:!0,createFolders:e}),this.files[t]};function h(t){return"[object RegExp]"===Object.prototype.toString.call(t)}var i={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(t){var e,r,i;for(e in this.files)this.files.hasOwnProperty(e)&&(i=this.files[e],(r=e.slice(this.root.length,e.length))&&e.slice(0,this.root.length)===this.root&&t(r,i))},filter:function(r){var i=[];return this.forEach(function(t,e){r(t,e)&&i.push(e)}),i},file:function(t,e,r){if(1!==arguments.length)return t=this.root+t,s.call(this,t,e,r),this;if(h(t)){var i=t;return this.filter(function(t,e){return!e.dir&&i.test(t)})}var n=this.files[this.root+t];return n&&!n.dir?n:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(t,e){return e.dir&&r.test(t)});var t=this.root+r,e=b.call(this,t),i=this.clone();return i.root=e.name,i},remove:function(r){r=this.root+r;var t=this.files[r];if(t||("/"!==r.slice(-1)&&(r+="/"),t=this.files[r]),t&&!t.dir)delete this.files[r];else for(var e=this.filter(function(t,e){return e.name.slice(0,r.length)===r}),i=0;i<e.length;i++)delete this.files[e[i].name];return this},generate:function(t){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(t){var e,r={};try{if((r=u.extend(t||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:n.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var i=r.comment||this.comment||"";e=o.generateWorker(this,r,i)}catch(t){(e=new l("error")).error(t)}return new a(e,r.type||"string",r.mimeType)},generateAsync:function(t,e){return this.generateInternalStream(t).accumulate(e)},generateNodeStream:function(t,e){return(t=t||{}).type||(t.type="nodebuffer"),this.generateInternalStream(t).toNodejsStream(e)}};e.exports=i},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,e,r){e.exports=t("stream")},{stream:void 0}],17:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t);for(var e=0;e<this.data.length;e++)t[e]=255&t[e]}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data[this.zero+t]},n.prototype.lastIndexOfSignature=function(t){for(var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===e&&this.data[s+1]===r&&this.data[s+2]===i&&this.data[s+3]===n)return s-this.zero;return-1},n.prototype.readAndCheckSignature=function(t){var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.readData(4);return e===s[0]&&r===s[1]&&i===s[2]&&n===s[3]},n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return[];var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],18:[function(t,e,r){"use strict";var i=t("../utils");function n(t){this.data=t,this.length=t.length,this.index=0,this.zero=0}n.prototype={checkOffset:function(t){this.checkIndex(this.index+t)},checkIndex:function(t){if(this.length<this.zero+t||t<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+t+"). Corrupted zip ?")},setIndex:function(t){this.checkIndex(t),this.index=t},skip:function(t){this.setIndex(this.index+t)},byteAt:function(t){},readInt:function(t){var e,r=0;for(this.checkOffset(t),e=this.index+t-1;e>=this.index;e--)r=(r<<8)+this.byteAt(e);return this.index+=t,r},readString:function(t){return i.transformTo("string",this.readData(t))},readData:function(t){},lastIndexOfSignature:function(t){},readAndCheckSignature:function(t){},readDate:function(){var t=this.readInt(4);return new Date(Date.UTC(1980+(t>>25&127),(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(31&t)<<1))}},e.exports=n},{"../utils":32}],19:[function(t,e,r){"use strict";var i=t("./Uint8ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data.charCodeAt(this.zero+t)},n.prototype.lastIndexOfSignature=function(t){return this.data.lastIndexOf(t)-this.zero},n.prototype.readAndCheckSignature=function(t){return t===this.readData(4)},n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],21:[function(t,e,r){"use strict";var i=t("./ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return new Uint8Array(0);var e=this.data.subarray(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./ArrayReader":17}],22:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../support"),s=t("./ArrayReader"),a=t("./StringReader"),o=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");e.exports=function(t){var e=i.getTypeOf(t);return i.checkSupport(e),"string"!==e||n.uint8array?"nodebuffer"===e?new o(t):n.uint8array?new h(i.transformTo("uint8array",t)):new s(i.transformTo("array",t)):new a(t)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,e,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../utils");function s(t){i.call(this,"ConvertWorker to "+t),this.destType=t}n.inherits(s,i),s.prototype.processChunk=function(t){this.push({data:n.transformTo(this.destType,t.data),meta:t.meta})},e.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../crc32");function s(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(s,i),s.prototype.processChunk=function(t){this.streamInfo.crc32=n(t.data,this.streamInfo.crc32||0),this.push(t)},e.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataLengthProbe for "+t),this.propName=t,this.withStreamInfo(t,0)}i.inherits(s,n),s.prototype.processChunk=function(t){if(t){var e=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=e+t.data.length}n.prototype.processChunk.call(this,t)},e.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataWorker");var e=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,t.then(function(t){e.dataIsReady=!0,e.data=t,e.max=t&&t.length||0,e.type=i.getTypeOf(t),e.isPaused||e._tickAndRepeat()},function(t){e.error(t)})}i.inherits(s,n),s.prototype.cleanUp=function(){n.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var t=null,e=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":t=this.data.substring(this.index,e);break;case"uint8array":t=this.data.subarray(this.index,e);break;case"array":case"nodebuffer":t=this.data.slice(this.index,e)}return this.index=e,this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})},e.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(t,e,r){"use strict";function i(t){this.name=t||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(t){this.emit("data",t)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(t){this.emit("error",t)}return!0},error:function(t){return!this.isFinished&&(this.isPaused?this.generatedError=t:(this.isFinished=!0,this.emit("error",t),this.previous&&this.previous.error(t),this.cleanUp()),!0)},on:function(t,e){return this._listeners[t].push(e),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(t,e){if(this._listeners[t])for(var r=0;r<this._listeners[t].length;r++)this._listeners[t][r].call(this,e)},pipe:function(t){return t.registerPrevious(this)},registerPrevious:function(t){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=t.streamInfo,this.mergeStreamInfo(),this.previous=t;var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.end()}),t.on("error",function(t){e.error(t)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var t=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),t=!0),this.previous&&this.previous.resume(),!t},flush:function(){},processChunk:function(t){this.push(t)},withStreamInfo:function(t,e){return this.extraStreamInfo[t]=e,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var t in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(t)&&(this.streamInfo[t]=this.extraStreamInfo[t])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var t="Worker "+this.name;return this.previous?this.previous+" -> "+t:t}},e.exports=i},{}],29:[function(t,e,r){"use strict";var h=t("../utils"),n=t("./ConvertWorker"),s=t("./GenericWorker"),u=t("../base64"),i=t("../support"),a=t("../external"),o=null;if(i.nodestream)try{o=t("../nodejs/NodejsStreamOutputAdapter")}catch(t){}function l(t,o){return new a.Promise(function(e,r){var i=[],n=t._internalType,s=t._outputType,a=t._mimeType;t.on("data",function(t,e){i.push(t),o&&o(e)}).on("error",function(t){i=[],r(t)}).on("end",function(){try{var t=function(t,e,r){switch(t){case"blob":return h.newBlob(h.transformTo("arraybuffer",e),r);case"base64":return u.encode(e);default:return h.transformTo(t,e)}}(s,function(t,e){var r,i=0,n=null,s=0;for(r=0;r<e.length;r++)s+=e[r].length;switch(t){case"string":return e.join("");case"array":return Array.prototype.concat.apply([],e);case"uint8array":for(n=new Uint8Array(s),r=0;r<e.length;r++)n.set(e[r],i),i+=e[r].length;return n;case"nodebuffer":return Buffer.concat(e);default:throw new Error("concat : unsupported type '"+t+"'")}}(n,i),a);e(t)}catch(t){r(t)}i=[]}).resume()})}function f(t,e,r){var i=e;switch(e){case"blob":case"arraybuffer":i="uint8array";break;case"base64":i="string"}try{this._internalType=i,this._outputType=e,this._mimeType=r,h.checkSupport(i),this._worker=t.pipe(new n(i)),t.lock()}catch(t){this._worker=new s("error"),this._worker.error(t)}}f.prototype={accumulate:function(t){return l(this,t)},on:function(t,e){var r=this;return"data"===t?this._worker.on(t,function(t){e.call(r,t.data,t.meta)}):this._worker.on(t,function(){h.delay(e,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(t){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},t)}},e.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,e,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var i=new ArrayBuffer(0);try{r.blob=0===new Blob([i],{type:"application/zip"}).size}catch(t){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);n.append(i),r.blob=0===n.getBlob("application/zip").size}catch(t){r.blob=!1}}}try{r.nodestream=!!t("readable-stream").Readable}catch(t){r.nodestream=!1}},{"readable-stream":16}],31:[function(t,e,s){"use strict";for(var o=t("./utils"),h=t("./support"),r=t("./nodejsUtils"),i=t("./stream/GenericWorker"),u=new Array(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;u[254]=u[254]=1;function a(){i.call(this,"utf-8 decode"),this.leftOver=null}function l(){i.call(this,"utf-8 encode")}s.utf8encode=function(t){return h.nodebuffer?r.newBufferFrom(t,"utf-8"):function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=h.uint8array?new Uint8Array(o):new Array(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e}(t)},s.utf8decode=function(t){return h.nodebuffer?o.transformTo("nodebuffer",t).toString("utf-8"):function(t){var e,r,i,n,s=t.length,a=new Array(2*s);for(e=r=0;e<s;)if((i=t[e++])<128)a[r++]=i;else if(4<(n=u[i]))a[r++]=65533,e+=n-1;else{for(i&=2===n?31:3===n?15:7;1<n&&e<s;)i=i<<6|63&t[e++],n--;1<n?a[r++]=65533:i<65536?a[r++]=i:(i-=65536,a[r++]=55296|i>>10&1023,a[r++]=56320|1023&i)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(t=o.transformTo(h.uint8array?"uint8array":"array",t))},o.inherits(a,i),a.prototype.processChunk=function(t){var e=o.transformTo(h.uint8array?"uint8array":"array",t.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=e;(e=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),e.set(r,this.leftOver.length)}else e=this.leftOver.concat(e);this.leftOver=null}var i=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}(e),n=e;i!==e.length&&(h.uint8array?(n=e.subarray(0,i),this.leftOver=e.subarray(i,e.length)):(n=e.slice(0,i),this.leftOver=e.slice(i,e.length))),this.push({data:s.utf8decode(n),meta:t.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,i),l.prototype.processChunk=function(t){this.push({data:s.utf8encode(t.data),meta:t.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,e,a){"use strict";var o=t("./support"),h=t("./base64"),r=t("./nodejsUtils"),i=t("set-immediate-shim"),u=t("./external");function n(t){return t}function l(t,e){for(var r=0;r<t.length;++r)e[r]=255&t.charCodeAt(r);return e}a.newBlob=function(e,r){a.checkSupport("blob");try{return new Blob([e],{type:r})}catch(t){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return i.append(e),i.getBlob(r)}catch(t){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(t,e,r){var i=[],n=0,s=t.length;if(s<=r)return String.fromCharCode.apply(null,t);for(;n<s;)"array"===e||"nodebuffer"===e?i.push(String.fromCharCode.apply(null,t.slice(n,Math.min(n+r,s)))):i.push(String.fromCharCode.apply(null,t.subarray(n,Math.min(n+r,s)))),n+=r;return i.join("")},stringifyByChar:function(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(t){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(t){return!1}}()}};function f(t){var e=65536,r=a.getTypeOf(t),i=!0;if("uint8array"===r?i=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(i=s.applyCanBeUsed.nodebuffer),i)for(;1<e;)try{return s.stringifyByChunk(t,r,e)}catch(t){e=Math.floor(e/2)}return s.stringifyByChar(t)}function d(t,e){for(var r=0;r<t.length;r++)e[r]=t[r];return e}a.applyFromCharCode=f;var c={};c.string={string:n,array:function(t){return l(t,new Array(t.length))},arraybuffer:function(t){return c.string.uint8array(t).buffer},uint8array:function(t){return l(t,new Uint8Array(t.length))},nodebuffer:function(t){return l(t,r.allocBuffer(t.length))}},c.array={string:f,array:n,arraybuffer:function(t){return new Uint8Array(t).buffer},uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(t)}},c.arraybuffer={string:function(t){return f(new Uint8Array(t))},array:function(t){return d(new Uint8Array(t),new Array(t.byteLength))},arraybuffer:n,uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(new Uint8Array(t))}},c.uint8array={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return t.buffer},uint8array:n,nodebuffer:function(t){return r.newBufferFrom(t)}},c.nodebuffer={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return c.nodebuffer.uint8array(t).buffer},uint8array:function(t){return d(t,new Uint8Array(t.length))},nodebuffer:n},a.transformTo=function(t,e){if(e=e||"",!t)return e;a.checkSupport(t);var r=a.getTypeOf(e);return c[r][t](e)},a.getTypeOf=function(t){return"string"==typeof t?"string":"[object Array]"===Object.prototype.toString.call(t)?"array":o.nodebuffer&&r.isBuffer(t)?"nodebuffer":o.uint8array&&t instanceof Uint8Array?"uint8array":o.arraybuffer&&t instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(t){if(!o[t.toLowerCase()])throw new Error(t+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(t){var e,r,i="";for(r=0;r<(t||"").length;r++)i+="\\x"+((e=t.charCodeAt(r))<16?"0":"")+e.toString(16).toUpperCase();return i},a.delay=function(t,e,r){i(function(){t.apply(r||null,e||[])})},a.inherits=function(t,e){function r(){}r.prototype=e.prototype,t.prototype=new r},a.extend=function(){var t,e,r={};for(t=0;t<arguments.length;t++)for(e in arguments[t])arguments[t].hasOwnProperty(e)&&void 0===r[e]&&(r[e]=arguments[t][e]);return r},a.prepareContent=function(r,t,i,n,s){return u.Promise.resolve(t).then(function(i){return o.blob&&(i instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(i)))&&"undefined"!=typeof FileReader?new u.Promise(function(e,r){var t=new FileReader;t.onload=function(t){e(t.target.result)},t.onerror=function(t){r(t.target.error)},t.readAsArrayBuffer(i)}):i}).then(function(t){var e=a.getTypeOf(t);return e?("arraybuffer"===e?t=a.transformTo("uint8array",t):"string"===e&&(s?t=h.decode(t):i&&!0!==n&&(t=function(t){return l(t,o.uint8array?new Uint8Array(t.length):new Array(t.length))}(t))),t):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),n=t("./utils"),s=t("./signature"),a=t("./zipEntry"),o=(t("./utf8"),t("./support"));function h(t){this.files=[],this.loadOptions=t}h.prototype={checkSignature:function(t){if(!this.reader.readAndCheckSignature(t)){this.reader.index-=4;var e=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+n.pretty(e)+", expected "+n.pretty(t)+")")}},isSignature:function(t,e){var r=this.reader.index;this.reader.setIndex(t);var i=this.reader.readString(4)===e;return this.reader.setIndex(r),i},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var t=this.reader.readData(this.zipCommentLength),e=o.uint8array?"uint8array":"array",r=n.transformTo(e,t);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var t,e,r,i=this.zip64EndOfCentralSize-44;0<i;)t=this.reader.readInt(2),e=this.reader.readInt(4),r=this.reader.readData(e),this.zip64ExtensibleData[t]={id:t,length:e,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var t,e;for(t=0;t<this.files.length;t++)e=this.files[t],this.reader.setIndex(e.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),e.readLocalPart(this.reader),e.handleUTF8(),e.processAttributes()},readCentralDir:function(){var t;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(t=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(t);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var t=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(t<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(t);var e=t;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){if(this.zip64=!0,(t=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(t),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var i=e-r;if(0<i)this.isSignature(e,s.CENTRAL_FILE_HEADER)||(this.reader.zero=i);else if(i<0)throw new Error("Corrupted zip: missing "+Math.abs(i)+" bytes.")},prepareReader:function(t){this.reader=i(t)},load:function(t){this.prepareReader(t),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},e.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),s=t("./utils"),n=t("./compressedObject"),a=t("./crc32"),o=t("./utf8"),h=t("./compressions"),u=t("./support");function l(t,e){this.options=t,this.loadOptions=e}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(t){var e,r;if(t.skip(22),this.fileNameLength=t.readInt(2),r=t.readInt(2),this.fileName=t.readData(this.fileNameLength),t.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(e=function(t){for(var e in h)if(h.hasOwnProperty(e)&&h[e].magic===t)return h[e];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new n(this.compressedSize,this.uncompressedSize,this.crc32,e,t.readData(this.compressedSize))},readCentralPart:function(t){this.versionMadeBy=t.readInt(2),t.skip(2),this.bitFlag=t.readInt(2),this.compressionMethod=t.readString(2),this.date=t.readDate(),this.crc32=t.readInt(4),this.compressedSize=t.readInt(4),this.uncompressedSize=t.readInt(4);var e=t.readInt(2);if(this.extraFieldsLength=t.readInt(2),this.fileCommentLength=t.readInt(2),this.diskNumberStart=t.readInt(2),this.internalFileAttributes=t.readInt(2),this.externalFileAttributes=t.readInt(4),this.localHeaderOffset=t.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");t.skip(e),this.readExtraFields(t),this.parseZIP64ExtraField(t),this.fileComment=t.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var t=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==t&&(this.dosPermissions=63&this.externalFileAttributes),3==t&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(t){if(this.extraFields[1]){var e=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(t){var e,r,i,n=t.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});t.index<n;)e=t.readInt(2),r=t.readInt(2),i=t.readData(r),this.extraFields[e]={id:e,length:r,value:i}},handleUTF8:function(){var t=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var e=this.findExtraFieldUnicodePath();if(null!==e)this.fileNameStr=e;else{var r=s.transformTo(t,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var i=this.findExtraFieldUnicodeComment();if(null!==i)this.fileCommentStr=i;else{var n=s.transformTo(t,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(n)}}},findExtraFieldUnicodePath:function(){var t=this.extraFields[28789];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileName)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null},findExtraFieldUnicodeComment:function(){var t=this.extraFields[25461];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileComment)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null}},e.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,e,r){"use strict";function i(t,e,r){this.name=t,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=e,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=t("./stream/StreamHelper"),n=t("./stream/DataWorker"),a=t("./utf8"),o=t("./compressedObject"),h=t("./stream/GenericWorker");i.prototype={internalStream:function(t){var e=null,r="string";try{if(!t)throw new Error("No output type specified.");var i="string"===(r=t.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),e=this._decompressWorker();var n=!this._dataBinary;n&&!i&&(e=e.pipe(new a.Utf8EncodeWorker)),!n&&i&&(e=e.pipe(new a.Utf8DecodeWorker))}catch(t){(e=new h("error")).error(t)}return new s(e,r,"")},async:function(t,e){return this.internalStream(t).accumulate(e)},nodeStream:function(t,e){return this.internalStream(t||"nodebuffer").toNodejsStream(e)},_compressWorker:function(t,e){if(this._data instanceof o&&this._data.compression.magic===t.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,t,e)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new n(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)i.prototype[u[f]]=l;e.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,l,e){(function(e){"use strict";var r,i,t=e.MutationObserver||e.WebKitMutationObserver;if(t){var n=0,s=new t(u),a=e.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=n=++n%2}}else if(e.setImmediate||void 0===e.MessageChannel)r="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var o=new e.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var t,e;i=!0;for(var r=h.length;r;){for(e=h,h=[],t=-1;++t<r;)e[t]();r=h.length}i=!1}l.exports=function(t){1!==h.push(t)||i||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(t,e,r){"use strict";var n=t("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],i=["PENDING"];function o(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=i,this.queue=[],this.outcome=void 0,t!==u&&c(this,t)}function h(t,e,r){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(e,r,i){n(function(){var t;try{t=r(i)}catch(t){return l.reject(e,t)}t===e?l.reject(e,new TypeError("Cannot resolve promise with itself")):l.resolve(e,t)})}function d(t){var e=t&&t.then;if(t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof e)return function(){e.apply(t,arguments)}}function c(e,t){var r=!1;function i(t){r||(r=!0,l.reject(e,t))}function n(t){r||(r=!0,l.resolve(e,t))}var s=p(function(){t(n,i)});"error"===s.status&&i(s.value)}function p(t,e){var r={};try{r.value=t(e),r.status="success"}catch(t){r.status="error",r.value=t}return r}(e.exports=o).prototype.finally=function(e){if("function"!=typeof e)return this;var r=this.constructor;return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){throw t})})},o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){if("function"!=typeof t&&this.state===a||"function"!=typeof e&&this.state===s)return this;var r=new this.constructor(u);this.state!==i?f(r,this.state===a?t:e,this.outcome):this.queue.push(new h(r,t,e));return r},h.prototype.callFulfilled=function(t){l.resolve(this.promise,t)},h.prototype.otherCallFulfilled=function(t){f(this.promise,this.onFulfilled,t)},h.prototype.callRejected=function(t){l.reject(this.promise,t)},h.prototype.otherCallRejected=function(t){f(this.promise,this.onRejected,t)},l.resolve=function(t,e){var r=p(d,e);if("error"===r.status)return l.reject(t,r.value);var i=r.value;if(i)c(t,i);else{t.state=a,t.outcome=e;for(var n=-1,s=t.queue.length;++n<s;)t.queue[n].callFulfilled(e)}return t},l.reject=function(t,e){t.state=s,t.outcome=e;for(var r=-1,i=t.queue.length;++r<i;)t.queue[r].callRejected(e);return t},o.resolve=function(t){if(t instanceof this)return t;return l.resolve(new this(u),t)},o.reject=function(t){var e=new this(u);return l.reject(e,t)},o.all=function(t){var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);var s=new Array(i),a=0,e=-1,o=new this(u);for(;++e<i;)h(t[e],e);return o;function h(t,e){r.resolve(t).then(function(t){s[e]=t,++a!==i||n||(n=!0,l.resolve(o,s))},function(t){n||(n=!0,l.reject(o,t))})}},o.race=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var r=t.length,i=!1;if(!r)return this.resolve([]);var n=-1,s=new this(u);for(;++n<r;)a=t[n],e.resolve(a).then(function(t){i||(i=!0,l.resolve(s,t))},function(t){i||(i=!0,l.reject(s,t))});var a;return s}},{immediate:36}],38:[function(t,e,r){"use strict";var i={};(0,t("./lib/utils/common").assign)(i,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),e.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,e,r){"use strict";var a=t("./zlib/deflate"),o=t("./utils/common"),h=t("./utils/strings"),n=t("./zlib/messages"),s=t("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,d=0,c=8;function p(t){if(!(this instanceof p))return new p(t);this.options=o.assign({level:f,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},t||{});var e=this.options;e.raw&&0<e.windowBits?e.windowBits=-e.windowBits:e.gzip&&0<e.windowBits&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(r!==l)throw new Error(n[r]);if(e.header&&a.deflateSetHeader(this.strm,e.header),e.dictionary){var i;if(i="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===u.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,(r=a.deflateSetDictionary(this.strm,i))!==l)throw new Error(n[r]);this._dict_set=!0}}function i(t,e){var r=new p(e);if(r.push(t,!0),r.err)throw r.msg||n[r.err];return r.result}p.prototype.push=function(t,e){var r,i,n=this.strm,s=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:!0===e?4:0,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===u.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new o.Buf8(s),n.next_out=0,n.avail_out=s),1!==(r=a.deflate(n,i))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==n.avail_out&&(0!==n.avail_in||4!==i&&2!==i)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(n.output,n.next_out))):this.onData(o.shrinkBuf(n.output,n.next_out)))}while((0<n.avail_in||0===n.avail_out)&&1!==r);return 4===i?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==i||(this.onEnd(l),!(n.avail_out=0))},p.prototype.onData=function(t){this.chunks.push(t)},p.prototype.onEnd=function(t){t===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Deflate=p,r.deflate=i,r.deflateRaw=function(t,e){return(e=e||{}).raw=!0,i(t,e)},r.gzip=function(t,e){return(e=e||{}).gzip=!0,i(t,e)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,e,r){"use strict";var d=t("./zlib/inflate"),c=t("./utils/common"),p=t("./utils/strings"),m=t("./zlib/constants"),i=t("./zlib/messages"),n=t("./zlib/zstream"),s=t("./zlib/gzheader"),_=Object.prototype.toString;function a(t){if(!(this instanceof a))return new a(t);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&0<=e.windowBits&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(0<=e.windowBits&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),15<e.windowBits&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new n,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,e.windowBits);if(r!==m.Z_OK)throw new Error(i[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(t,e){var r=new a(e);if(r.push(t,!0),r.err)throw r.msg||i[r.err];return r.result}a.prototype.push=function(t,e){var r,i,n,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;i=e===~~e?e:!0===e?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof t?h.input=p.binstring2buf(t):"[object ArrayBuffer]"===_.call(t)?h.input=new Uint8Array(t):h.input=t,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new c.Buf8(u),h.next_out=0,h.avail_out=u),(r=d.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||i!==m.Z_FINISH&&i!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(n=p.utf8border(h.output,h.next_out),s=h.next_out-n,a=p.buf2string(h.output,n),h.next_out=s,h.avail_out=u-s,s&&c.arraySet(h.output,h.output,n,s,0),this.onData(a)):this.onData(c.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(i=m.Z_FINISH),i===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):i!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(t){this.chunks.push(t)},a.prototype.onEnd=function(t){t===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(t,e){return(e=e||{}).raw=!0,o(t,e)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var r=e.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}}return t},r.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,r,i,n){if(e.subarray&&t.subarray)t.set(e.subarray(r,r+i),n);else for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){var e,r,i,n,s,a;for(e=i=0,r=t.length;e<r;e++)i+=t[e].length;for(a=new Uint8Array(i),e=n=0,r=t.length;e<r;e++)s=t[e],a.set(s,n),n+=s.length;return a}},s={arraySet:function(t,e,r,i,n){for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){return[].concat.apply([],t)}};r.setTyped=function(t){t?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,n)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(i)},{}],42:[function(t,e,r){"use strict";var h=t("./common"),n=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var u=new h.Buf8(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function l(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&n))return String.fromCharCode.apply(null,h.shrinkBuf(t,e));for(var r="",i=0;i<e;i++)r+=String.fromCharCode(t[i]);return r}u[254]=u[254]=1,r.string2buf=function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=new h.Buf8(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e},r.buf2binstring=function(t){return l(t,t.length)},r.binstring2buf=function(t){for(var e=new h.Buf8(t.length),r=0,i=e.length;r<i;r++)e[r]=t.charCodeAt(r);return e},r.buf2string=function(t,e){var r,i,n,s,a=e||t.length,o=new Array(2*a);for(r=i=0;r<a;)if((n=t[r++])<128)o[i++]=n;else if(4<(s=u[n]))o[i++]=65533,r+=s-1;else{for(n&=2===s?31:3===s?15:7;1<s&&r<a;)n=n<<6|63&t[r++],s--;1<s?o[i++]=65533:n<65536?o[i++]=n:(n-=65536,o[i++]=55296|n>>10&1023,o[i++]=56320|1023&n)}return l(o,i)},r.utf8border=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}},{"./common":41}],43:[function(t,e,r){"use strict";e.exports=function(t,e,r,i){for(var n=65535&t|0,s=t>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(n=n+e[i++]|0)|0,--a;);n%=65521,s%=65521}return n|s<<16|0}},{}],44:[function(t,e,r){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,e,r){"use strict";var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}},{}],46:[function(t,e,r){"use strict";var h,d=t("../utils/common"),u=t("./trees"),c=t("./adler32"),p=t("./crc32"),i=t("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,n=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(t,e){return t.msg=i[e],e}function T(t){return(t<<1)-(4<t?9:0)}function D(t){for(var e=t.length;0<=--e;)t[e]=0}function F(t){var e=t.state,r=e.pending;r>t.avail_out&&(r=t.avail_out),0!==r&&(d.arraySet(t.output,e.pending_buf,e.pending_out,r,t.next_out),t.next_out+=r,e.pending_out+=r,t.total_out+=r,t.avail_out-=r,e.pending-=r,0===e.pending&&(e.pending_out=0))}function N(t,e){u._tr_flush_block(t,0<=t.block_start?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,F(t.strm)}function U(t,e){t.pending_buf[t.pending++]=e}function P(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function L(t,e){var r,i,n=t.max_chain_length,s=t.strstart,a=t.prev_length,o=t.nice_match,h=t.strstart>t.w_size-z?t.strstart-(t.w_size-z):0,u=t.window,l=t.w_mask,f=t.prev,d=t.strstart+S,c=u[s+a-1],p=u[s+a];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(u[(r=e)+a]===p&&u[r+a-1]===c&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<d);if(i=S-(d-s),s=d-S,a<i){if(t.match_start=e,o<=(a=i))break;c=u[s+a-1],p=u[s+a]}}}while((e=f[e&l])>h&&0!=--n);return a<=t.lookahead?a:t.lookahead}function j(t){var e,r,i,n,s,a,o,h,u,l,f=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=f+(f-z)){for(d.arraySet(t.window,t.window,f,f,0),t.match_start-=f,t.strstart-=f,t.block_start-=f,e=r=t.hash_size;i=t.head[--e],t.head[e]=f<=i?i-f:0,--r;);for(e=r=f;i=t.prev[--e],t.prev[e]=f<=i?i-f:0,--r;);n+=f}if(0===t.strm.avail_in)break;if(a=t.strm,o=t.window,h=t.strstart+t.lookahead,u=n,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,d.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=c(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),t.lookahead+=r,t.lookahead+t.insert>=x)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+x-1])&t.hash_mask,t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<x)););}while(t.lookahead<z&&0!==t.strm.avail_in)}function Z(t,e){for(var r,i;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==r&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r)),t.match_length>=x)if(i=u._tr_tally(t,t.strstart-t.match_start,t.match_length-x),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=x){for(t.match_length--;t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart,0!=--t.match_length;);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function W(t,e){for(var r,i,n;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=x-1,0!==r&&t.prev_length<t.max_lazy_match&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r),t.match_length<=5&&(1===t.strategy||t.match_length===x&&4096<t.strstart-t.match_start)&&(t.match_length=x-1)),t.prev_length>=x&&t.match_length<=t.prev_length){for(n=t.strstart+t.lookahead-x,i=u._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-x),t.lookahead-=t.prev_length-1,t.prev_length-=2;++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!=--t.prev_length;);if(t.match_available=0,t.match_length=x-1,t.strstart++,i&&(N(t,!1),0===t.strm.avail_out))return A}else if(t.match_available){if((i=u._tr_tally(t,0,t.window[t.strstart-1]))&&N(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return A}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=u._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function M(t,e,r,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=r,this.max_chain=i,this.func=n}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*w),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(k+1),this.heap=new d.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=n,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?C:E,t.adler=2===e.wrap?0:1,e.last_flush=l,u._tr_init(e),m):R(t,_)}function K(t){var e=G(t);return e===m&&function(t){t.window_size=2*t.w_size,D(t.head),t.max_lazy_match=h[t.level].max_lazy,t.good_match=h[t.level].good_length,t.nice_match=h[t.level].nice_length,t.max_chain_length=h[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=x-1,t.match_available=0,t.ins_h=0}(t.state),e}function Y(t,e,r,i,n,s){if(!t)return _;var a=1;if(e===g&&(e=6),i<0?(a=0,i=-i):15<i&&(a=2,i-=16),n<1||y<n||r!==v||i<8||15<i||e<0||9<e||s<0||b<s)return R(t,_);8===i&&(i=9);var o=new H;return(t.state=o).strm=t,o.wrap=a,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=s,o.method=r,K(t)}h=[new M(0,0,0,0,function(t,e){var r=65535;for(r>t.pending_buf_size-5&&(r=t.pending_buf_size-5);;){if(t.lookahead<=1){if(j(t),0===t.lookahead&&e===l)return A;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+r;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,N(t,!1),0===t.strm.avail_out))return A;if(t.strstart-t.block_start>=t.w_size-z&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):(t.strstart>t.block_start&&(N(t,!1),t.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(t,e){return Y(t,e,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?_:(t.state.gzhead=e,m):_},r.deflate=function(t,e){var r,i,n,s;if(!t||!t.state||5<e||e<0)return t?R(t,_):_;if(i=t.state,!t.output||!t.input&&0!==t.avail_in||666===i.status&&e!==f)return R(t,0===t.avail_out?-5:_);if(i.strm=t,r=i.last_flush,i.last_flush=e,i.status===C)if(2===i.wrap)t.adler=0,U(i,31),U(i,139),U(i,8),i.gzhead?(U(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),U(i,255&i.gzhead.time),U(i,i.gzhead.time>>8&255),U(i,i.gzhead.time>>16&255),U(i,i.gzhead.time>>24&255),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(U(i,255&i.gzhead.extra.length),U(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(t.adler=p(t.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(U(i,0),U(i,0),U(i,0),U(i,0),U(i,0),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,3),i.status=E);else{var a=v+(i.w_bits-8<<4)<<8;a|=(2<=i.strategy||i.level<2?0:i.level<6?1:6===i.level?2:3)<<6,0!==i.strstart&&(a|=32),a+=31-a%31,i.status=E,P(i,a),0!==i.strstart&&(P(i,t.adler>>>16),P(i,65535&t.adler)),t.adler=1}if(69===i.status)if(i.gzhead.extra){for(n=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending!==i.pending_buf_size));)U(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(73===i.status)if(i.gzhead.name){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.gzindex=0,i.status=91)}else i.status=91;if(91===i.status)if(i.gzhead.comment){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.status=103)}else i.status=103;if(103===i.status&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(t),i.pending+2<=i.pending_buf_size&&(U(i,255&t.adler),U(i,t.adler>>8&255),t.adler=0,i.status=E)):i.status=E),0!==i.pending){if(F(t),0===t.avail_out)return i.last_flush=-1,m}else if(0===t.avail_in&&T(e)<=T(r)&&e!==f)return R(t,-5);if(666===i.status&&0!==t.avail_in)return R(t,-5);if(0!==t.avail_in||0!==i.lookahead||e!==l&&666!==i.status){var o=2===i.strategy?function(t,e){for(var r;;){if(0===t.lookahead&&(j(t),0===t.lookahead)){if(e===l)return A;break}if(t.match_length=0,r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):3===i.strategy?function(t,e){for(var r,i,n,s,a=t.window;;){if(t.lookahead<=S){if(j(t),t.lookahead<=S&&e===l)return A;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=x&&0<t.strstart&&(i=a[n=t.strstart-1])===a[++n]&&i===a[++n]&&i===a[++n]){s=t.strstart+S;do{}while(i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&n<s);t.match_length=S-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=x?(r=u._tr_tally(t,1,t.match_length-x),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):h[i.level].func(i,e);if(o!==O&&o!==B||(i.status=666),o===A||o===O)return 0===t.avail_out&&(i.last_flush=-1),m;if(o===I&&(1===e?u._tr_align(i):5!==e&&(u._tr_stored_block(i,0,0,!1),3===e&&(D(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),F(t),0===t.avail_out))return i.last_flush=-1,m}return e!==f?m:i.wrap<=0?1:(2===i.wrap?(U(i,255&t.adler),U(i,t.adler>>8&255),U(i,t.adler>>16&255),U(i,t.adler>>24&255),U(i,255&t.total_in),U(i,t.total_in>>8&255),U(i,t.total_in>>16&255),U(i,t.total_in>>24&255)):(P(i,t.adler>>>16),P(i,65535&t.adler)),F(t),0<i.wrap&&(i.wrap=-i.wrap),0!==i.pending?m:1)},r.deflateEnd=function(t){var e;return t&&t.state?(e=t.state.status)!==C&&69!==e&&73!==e&&91!==e&&103!==e&&e!==E&&666!==e?R(t,_):(t.state=null,e===E?R(t,-3):m):_},r.deflateSetDictionary=function(t,e){var r,i,n,s,a,o,h,u,l=e.length;if(!t||!t.state)return _;if(2===(s=(r=t.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(t.adler=c(t.adler,e,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new d.Buf8(r.w_size),d.arraySet(u,e,l-r.w_size,r.w_size,0),e=u,l=r.w_size),a=t.avail_in,o=t.next_in,h=t.input,t.avail_in=l,t.next_in=0,t.input=e,j(r);r.lookahead>=x;){for(i=r.strstart,n=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[i+x-1])&r.hash_mask,r.prev[i&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=i,i++,--n;);r.strstart=i,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,t.next_in=o,t.input=h,t.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,e,r){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,e,r){"use strict";e.exports=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C;r=t.state,i=t.next_in,z=t.input,n=i+(t.avail_in-5),s=t.next_out,C=t.output,a=s-(e-t.avail_out),o=s+(t.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;t:do{p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=m[c&g];e:for(;;){if(c>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(c&(1<<y)-1)];continue e}if(32&y){r.mode=12;break t}t.msg="invalid literal/length code",r.mode=30;break t}w=65535&v,(y&=15)&&(p<y&&(c+=z[i++]<<p,p+=8),w+=c&(1<<y)-1,c>>>=y,p-=y),p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=_[c&b];r:for(;;){if(c>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(c&(1<<y)-1)];continue r}t.msg="invalid distance code",r.mode=30;break t}if(k=65535&v,p<(y&=15)&&(c+=z[i++]<<p,(p+=8)<y&&(c+=z[i++]<<p,p+=8)),h<(k+=c&(1<<y)-1)){t.msg="invalid distance too far back",r.mode=30;break t}if(c>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){t.msg="invalid distance too far back",r.mode=30;break t}if(S=d,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=d[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=d[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(i<n&&s<o);i-=w=p>>3,c&=(1<<(p-=w<<3))-1,t.next_in=i,t.next_out=s,t.avail_in=i<n?n-i+5:5-(i-n),t.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(t,e,r){"use strict";var I=t("../utils/common"),O=t("./adler32"),B=t("./crc32"),R=t("./inffast"),T=t("./inftrees"),D=1,F=2,N=0,U=-2,P=1,i=852,n=592;function L(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=P,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new I.Buf32(i),e.distcode=e.distdyn=new I.Buf32(n),e.sane=1,e.back=-1,N):U}function o(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,a(t)):U}function h(t,e){var r,i;return t&&t.state?(i=t.state,e<0?(r=0,e=-e):(r=1+(e>>4),e<48&&(e&=15)),e&&(e<8||15<e)?U:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=r,i.wbits=e,o(t))):U}function u(t,e){var r,i;return t?(i=new s,(t.state=i).window=null,(r=h(t,e))!==N&&(t.state=null),r):U}var l,f,d=!0;function j(t){if(d){var e;for(l=new I.Buf32(512),f=new I.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(T(D,t.lens,0,288,l,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;T(F,t.lens,0,32,f,0,t.work,{bits:5}),d=!1}t.lencode=l,t.lenbits=9,t.distcode=f,t.distbits=5}function Z(t,e,r,i){var n,s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),i>=s.wsize?(I.arraySet(s.window,e,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(i<(n=s.wsize-s.wnext)&&(n=i),I.arraySet(s.window,e,r-i,n,s.wnext),(i-=n)?(I.arraySet(s.window,e,r-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(t){return u(t,15)},r.inflateInit2=u,r.inflate=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return U;12===(r=t.state).mode&&(r.mode=13),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,f=o,d=h,x=N;t:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){t.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){t.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){t.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,t.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){t.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){t.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,i,s,c,k)),512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,r.length-=c),r.length))break t;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(65535&r.check)){t.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),t.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}t.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,2;t.adler=r.check=1,r.mode=12;case 12:if(5===e||6===e)break t;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==e)break;u>>>=2,l-=2;break t;case 2:r.mode=17;break;case 3:t.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){t.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===e)break t;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),h<c&&(c=h),0===c)break t;I.arraySet(n,i,s,c,a),o-=c,s+=c,h-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){t.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){t.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+c>r.nlen+r.ndist){t.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){t.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){t.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===e)break t;case 20:r.mode=21;case 21:if(6<=o&&258<=h){t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,R(t,d),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){t.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){t.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){t.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break t;if(c=d-h,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){t.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=n,p=a-r.offset,c=r.length;for(h<c&&(c=h),h-=c,r.length-=c;n[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break t;n[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break t;o--,u|=i[s++]<<l,l+=8}if(d-=h,t.total_out+=d,r.total+=d,d&&(t.adler=r.check=r.flags?B(r.check,n,d,a-d):O(r.check,n,d,a-d)),d=h,(r.flags?u:L(u))!==r.check){t.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(4294967295&r.total)){t.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break t;case 30:x=-3;break t;case 31:return-4;case 32:default:return U}return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,(r.wsize||d!==t.avail_out&&r.mode<30&&(r.mode<27||4!==e))&&Z(t,t.output,t.next_out,d-t.avail_out)?(r.mode=31,-4):(f-=t.avail_in,d-=t.avail_out,t.total_in+=f,t.total_out+=d,r.total+=d,r.wrap&&d&&(t.adler=r.check=r.flags?B(r.check,n,d,t.next_out-d):O(r.check,n,d,t.next_out-d)),t.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===d||4===e)&&x===N&&(x=-5),x)},r.inflateEnd=function(t){if(!t||!t.state)return U;var e=t.state;return e.window&&(e.window=null),t.state=null,N},r.inflateGetHeader=function(t,e){var r;return t&&t.state?0==(2&(r=t.state).wrap)?U:((r.head=e).done=!1,N):U},r.inflateSetDictionary=function(t,e){var r,i=e.length;return t&&t.state?0!==(r=t.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,e,i,0)!==r.check?-3:Z(t,e,i,i)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,e,r){"use strict";var D=t("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,r,i,n,s,a,o){var h,u,l,f,d,c,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<i;v++)O[e[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===t||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<i;v++)0!==e[r+v]&&(a[B[e[r+v]]++]=v);if(c=0===t?(A=R=a,19):1===t?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,d=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===t&&852<C||2===t&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<c?(m=0,a[v]):a[v]>c?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;n[d+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=e[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),d+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===t&&852<C||2===t&&592<C)return 1;n[l=E&f]=k<<24|x<<16|d-s|0}}return 0!==E&&(n[d+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(t,e,r){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,e,r){"use strict";var n=t("../utils/common"),o=0,h=1;function i(t){for(var e=t.length;0<=--e;)t[e]=0}var s=0,a=29,u=256,l=u+1+a,f=30,d=19,_=2*l+1,g=15,c=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));i(z);var C=new Array(2*f);i(C);var E=new Array(512);i(E);var A=new Array(256);i(A);var I=new Array(a);i(I);var O,B,R,T=new Array(f);function D(t,e,r,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=r,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function F(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function N(t){return t<256?E[t]:E[256+(t>>>7)]}function U(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function P(t,e,r){t.bi_valid>c-r?(t.bi_buf|=e<<t.bi_valid&65535,U(t,t.bi_buf),t.bi_buf=e>>c-t.bi_valid,t.bi_valid+=r-c):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=r)}function L(t,e,r){P(t,r[2*e],r[2*e+1])}function j(t,e){for(var r=0;r|=1&t,t>>>=1,r<<=1,0<--e;);return r>>>1}function Z(t,e,r){var i,n,s=new Array(g+1),a=0;for(i=1;i<=g;i++)s[i]=a=a+r[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=j(s[o]++,o))}}function W(t){var e;for(e=0;e<l;e++)t.dyn_ltree[2*e]=0;for(e=0;e<f;e++)t.dyn_dtree[2*e]=0;for(e=0;e<d;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*m]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function M(t){8<t.bi_valid?U(t,t.bi_buf):0<t.bi_valid&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function H(t,e,r,i){var n=2*e,s=2*r;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[r]}function G(t,e,r){for(var i=t.heap[r],n=r<<1;n<=t.heap_len&&(n<t.heap_len&&H(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!H(e,i,t.heap[n],t.depth));)t.heap[r]=t.heap[n],r=n,n<<=1;t.heap[r]=i}function K(t,e,r){var i,n,s,a,o=0;if(0!==t.last_lit)for(;i=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],n=t.pending_buf[t.l_buf+o],o++,0===i?L(t,n,e):(L(t,(s=A[n])+u+1,e),0!==(a=w[s])&&P(t,n-=I[s],a),L(t,s=N(--i),r),0!==(a=k[s])&&P(t,i-=T[s],a)),o<t.last_lit;);L(t,m,e)}function Y(t,e){var r,i,n,s=e.dyn_tree,a=e.stat_desc.static_tree,o=e.stat_desc.has_stree,h=e.stat_desc.elems,u=-1;for(t.heap_len=0,t.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(t.heap[++t.heap_len]=u=r,t.depth[r]=0):s[2*r+1]=0;for(;t.heap_len<2;)s[2*(n=t.heap[++t.heap_len]=u<2?++u:0)]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=a[2*n+1]);for(e.max_code=u,r=t.heap_len>>1;1<=r;r--)G(t,s,r);for(n=h;r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],G(t,s,1),i=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=i,s[2*n]=s[2*r]+s[2*i],t.depth[n]=(t.depth[r]>=t.depth[i]?t.depth[r]:t.depth[i])+1,s[2*r+1]=s[2*i+1]=n,t.heap[1]=n++,G(t,s,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t,e){var r,i,n,s,a,o,h=e.dyn_tree,u=e.max_code,l=e.stat_desc.static_tree,f=e.stat_desc.has_stree,d=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,m=0;for(s=0;s<=g;s++)t.bl_count[s]=0;for(h[2*t.heap[t.heap_max]+1]=0,r=t.heap_max+1;r<_;r++)p<(s=h[2*h[2*(i=t.heap[r])+1]+1]+1)&&(s=p,m++),h[2*i+1]=s,u<i||(t.bl_count[s]++,a=0,c<=i&&(a=d[i-c]),o=h[2*i],t.opt_len+=o*(s+a),f&&(t.static_len+=o*(l[2*i+1]+a)));if(0!==m){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(i=t.bl_count[s];0!==i;)u<(n=t.heap[--r])||(h[2*n+1]!==s&&(t.opt_len+=(s-h[2*n+1])*h[2*n],h[2*n+1]=s),i--)}}(t,e),Z(s,u,t.bl_count)}function X(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),e[2*(r+1)+1]=65535,i=0;i<=r;i++)n=a,a=e[2*(i+1)+1],++o<h&&n===a||(o<u?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[2*b]++):o<=10?t.bl_tree[2*v]++:t.bl_tree[2*y]++,s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4))}function V(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),i=0;i<=r;i++)if(n=a,a=e[2*(i+1)+1],!(++o<h&&n===a)){if(o<u)for(;L(t,n,t.bl_tree),0!=--o;);else 0!==n?(n!==s&&(L(t,n,t.bl_tree),o--),L(t,b,t.bl_tree),P(t,o-3,2)):o<=10?(L(t,v,t.bl_tree),P(t,o-3,3)):(L(t,y,t.bl_tree),P(t,o-11,7));s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4)}}i(T);var q=!1;function J(t,e,r,i){P(t,(s<<1)+(i?1:0),3),function(t,e,r,i){M(t),i&&(U(t,r),U(t,~r)),n.arraySet(t.pending_buf,t.window,e,r,t.pending),t.pending+=r}(t,e,r,!0)}r._tr_init=function(t){q||(function(){var t,e,r,i,n,s=new Array(g+1);for(i=r=0;i<a-1;i++)for(I[i]=r,t=0;t<1<<w[i];t++)A[r++]=i;for(A[r-1]=i,i=n=0;i<16;i++)for(T[i]=n,t=0;t<1<<k[i];t++)E[n++]=i;for(n>>=7;i<f;i++)for(T[i]=n<<7,t=0;t<1<<k[i]-7;t++)E[256+n++]=i;for(e=0;e<=g;e++)s[e]=0;for(t=0;t<=143;)z[2*t+1]=8,t++,s[8]++;for(;t<=255;)z[2*t+1]=9,t++,s[9]++;for(;t<=279;)z[2*t+1]=7,t++,s[7]++;for(;t<=287;)z[2*t+1]=8,t++,s[8]++;for(Z(z,l+1,s),t=0;t<f;t++)C[2*t+1]=5,C[2*t]=j(t,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,d,p)}(),q=!0),t.l_desc=new F(t.dyn_ltree,O),t.d_desc=new F(t.dyn_dtree,B),t.bl_desc=new F(t.bl_tree,R),t.bi_buf=0,t.bi_valid=0,W(t)},r._tr_stored_block=J,r._tr_flush_block=function(t,e,r,i){var n,s,a=0;0<t.level?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,r=4093624447;for(e=0;e<=31;e++,r>>>=1)if(1&r&&0!==t.dyn_ltree[2*e])return o;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return h;for(e=32;e<u;e++)if(0!==t.dyn_ltree[2*e])return h;return o}(t)),Y(t,t.l_desc),Y(t,t.d_desc),a=function(t){var e;for(X(t,t.dyn_ltree,t.l_desc.max_code),X(t,t.dyn_dtree,t.d_desc.max_code),Y(t,t.bl_desc),e=d-1;3<=e&&0===t.bl_tree[2*S[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),n=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=n&&(n=s)):n=s=r+5,r+4<=n&&-1!==e?J(t,e,r,i):4===t.strategy||s===n?(P(t,2+(i?1:0),3),K(t,z,C)):(P(t,4+(i?1:0),3),function(t,e,r,i){var n;for(P(t,e-257,5),P(t,r-1,5),P(t,i-4,4),n=0;n<i;n++)P(t,t.bl_tree[2*S[n]+1],3);V(t,t.dyn_ltree,e-1),V(t,t.dyn_dtree,r-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,a+1),K(t,t.dyn_ltree,t.dyn_dtree)),W(t),i&&M(t)},r._tr_tally=function(t,e,r){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&r,t.last_lit++,0===e?t.dyn_ltree[2*r]++:(t.matches++,e--,t.dyn_ltree[2*(A[r]+u+1)]++,t.dyn_dtree[2*N(e)]++),t.last_lit===t.lit_bufsize-1},r._tr_align=function(t){P(t,2,3),L(t,m,z),function(t){16===t.bi_valid?(U(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},{"../utils/common":41}],53:[function(t,e,r){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,e,r){"use strict";e.exports="function"==typeof setImmediate?setImmediate:function(){var t=[].slice.apply(arguments);t.splice(1,0,0),setTimeout.apply(null,t)}},{}]},{},[10])(10)});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
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



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
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



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
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



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var ContentServer_1 = __webpack_require__(/*! ../lib/class/ContentServer */ "./src/lib/class/ContentServer.ts");
var LoggerUtils_1 = __webpack_require__(/*! ../lib/utils/LoggerUtils */ "./src/lib/utils/LoggerUtils.ts");
var Thief_1 = __webpack_require__(/*! ../lib/class/Thief */ "./src/lib/class/Thief.ts");
var Builder_1 = __webpack_require__(/*! ../lib/class/Builder */ "./src/lib/class/Builder.ts");
window["pageThief"] = {
    zipBlob: null
};
var contentServer = new ContentServer_1.default();
setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
    var currentClient_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, contentServer.getCurrentClient()];
            case 1:
                currentClient_1 = _a.sent();
                if (currentClient_1 != null) {
                    currentClient_1.getCurrentPageDocumentParam(function (pageDocumentParam) { return __awaiter(void 0, void 0, void 0, function () {
                        var thief;
                        return __generator(this, function (_a) {
                            thief = new Thief_1.default(currentClient_1, pageDocumentParam);
                            thief.start(function () {
                                var builder = new Builder_1.default(thief);
                                builder.getBlob().then(function (zipBlob) {
                                    window.pageThief.zipBlob = zipBlob;
                                });
                            });
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                LoggerUtils_1.default.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }, 3000);


/***/ }),

/***/ "./src/lib/class/Builder.ts":
/*!**********************************!*\
  !*** ./src/lib/class/Builder.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSZip = __webpack_require__(/*! jszip */ "./node_modules/jszip/dist/jszip.min.js");
var Builder = /** @class */ (function () {
    function Builder(thief) {
        this.thief = thief;
        this.rootURL = this.thief.getStartPageDocument().getRootURL();
        this.tree = this.createFolder(this.rootURL.host);
    }
    Builder.prototype.getBlob = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.jsZip = new JSZip();
            var rootZipFolder = _this.jsZip.folder(_this.rootURL.hostname);
            for (var _i = 0, _a = _this.thief.getAssets(); _i < _a.length; _i++) {
                var asset = _a[_i];
                var hrefPart = _this.getHrefPartFromLink(asset.link);
                var folderNames = _this.getFolderNamesFromHrefPart(hrefPart);
                var folder = _this.createFolderRecurively(folderNames);
                _this.addFileToFolder(_this.getFilenameFromLink(asset.link), asset.data, asset.type, folder);
            }
            for (var _b = 0, _c = _this.thief.getPageDocuments(); _b < _c.length; _b++) {
                var pageDocument = _c[_b];
                var hrefPart = _this.getHrefPartFromLink(pageDocument.getRootHref());
                var folderNames = _this.getFolderNamesFromHrefPart(hrefPart);
                var folder = _this.createFolderRecurively(folderNames);
                console.log(folder);
                _this.addFileToFolder(_this.getFilenameFromLink(pageDocument.getRootHref()), pageDocument.getHTMLWithLocalLinks(), 'string', folder);
            }
            rootZipFolder = _this.buildZipFile(rootZipFolder, _this.tree);
            _this.jsZip.generateAsync({ type: "blob" }).then(resolve).catch(reject);
        });
    };
    Builder.prototype.getFilenameFromLink = function (link) {
        return link.split('/').pop();
    };
    Builder.prototype.getHrefPartFromLink = function (link) {
        return link.replace(this.rootURL.origin, "");
    };
    Builder.prototype.getFolderNamesFromHrefPart = function (hrefPart) {
        var folderNames = hrefPart.split('/').filter(function (s) { return s.length > 0; });
        folderNames.pop();
        return folderNames;
    };
    Builder.prototype.createFolder = function (folderName) {
        return {
            name: folderName,
            files: [],
            childrenFolders: {}
        };
    };
    Builder.prototype.createFolderRecurively = function (folderNames, parentFolder) {
        if (parentFolder === void 0) { parentFolder = this.tree; }
        if (folderNames.length > 0) {
            var folderName = folderNames.shift();
            if (!parentFolder.childrenFolders.hasOwnProperty(folderName)) {
                var folder = this.createFolder(folderName);
                parentFolder.childrenFolders[folderName] = folder;
            }
            return this.createFolderRecurively(folderNames, parentFolder.childrenFolders[folderName]);
        }
        return parentFolder;
    };
    Builder.prototype.addFileToFolder = function (filename, data, type, folder) {
        folder.files.push({
            name: filename,
            data: data
        });
    };
    Builder.prototype.buildZipFile = function (zipFolder, folder) {
        for (var _i = 0, _a = folder.files; _i < _a.length; _i++) {
            var file = _a[_i];
            zipFolder.file(file.name, file.data);
        }
        var childrenFolderNames = Object.keys(folder.childrenFolders);
        for (var _b = 0, childrenFolderNames_1 = childrenFolderNames; _b < childrenFolderNames_1.length; _b++) {
            var childrenFolderName = childrenFolderNames_1[_b];
            var childrenFolder = folder.childrenFolders[childrenFolderName];
            var childrenZipFolder = zipFolder.folder(childrenFolderName);
            childrenZipFolder = this.buildZipFile(childrenZipFolder, childrenFolder);
        }
        return zipFolder;
    };
    return Builder;
}());
exports.default = Builder;


/***/ }),

/***/ "./src/lib/class/ContentClient.ts":
/*!****************************************!*\
  !*** ./src/lib/class/ContentClient.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoggerUtils_1 = __webpack_require__(/*! ../utils/LoggerUtils */ "./src/lib/utils/LoggerUtils.ts");
var ContentTask = /** @class */ (function () {
    function ContentTask(id, param, onResultCallback) {
        this.param = null;
        this.id = id;
        this.param = param;
        this.onResultCallback = onResultCallback;
    }
    ContentTask.prototype.getID = function () {
        return this.id;
    };
    ContentTask.prototype.getParam = function () {
        return this.param;
    };
    ContentTask.prototype.setResult = function (result) {
        this.onResultCallback(result);
    };
    ContentTask.prototype.run = function (sendResponse) {
        sendResponse({ task: this.id, param: this.param });
    };
    return ContentTask;
}());
exports.ContentTask = ContentTask;
var ContentClient = /** @class */ (function () {
    function ContentClient(id, currentResponse) {
        this.taskQueue = [];
        this.currentTask = null;
        this.id = id;
        this.currentResponse = currentResponse;
    }
    ContentClient.prototype.startTask = function () {
        if (this.taskQueue.length > 0 && this.currentTask == null) {
            var task = this.taskQueue.shift();
            this.currentTask = task;
            LoggerUtils_1.default.log("Client %s start task %s with param:", this.id, this.currentTask.getID(), this.currentTask.getParam());
            this.currentTask.run(this.currentResponse);
        }
    };
    ContentClient.prototype.runTask = function (id, param, onResultCallback) {
        LoggerUtils_1.default.log("Client %s add task %s with param:", this.id, id, param);
        this.taskQueue.push(new ContentTask(id, param, onResultCallback));
        this.startTask();
    };
    ContentClient.prototype.responseTask = function (taskID, result, currentResponse) {
        LoggerUtils_1.default.log("Client %s response task %s with result ", this.id, taskID, result);
        this.currentTask.setResult(result);
        this.currentTask = null;
        this.currentResponse = currentResponse;
        this.startTask();
    };
    ContentClient.prototype.getCurrentPageDocumentParam = function (cb) {
        this.runTask("getCurrentPageDocumentParam", null, function (param) {
            cb(param);
        });
    };
    ContentClient.prototype.getData = function (link, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.runTask("getData", { link: link, type: type }, function (param) {
                resolve(param);
            });
        });
    };
    return ContentClient;
}());
exports.default = ContentClient;


/***/ }),

/***/ "./src/lib/class/ContentServer.ts":
/*!****************************************!*\
  !*** ./src/lib/class/ContentServer.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BrowserUtils_1 = __webpack_require__(/*! ../utils/BrowserUtils */ "./src/lib/utils/BrowserUtils.ts");
var BackgroundUtils_1 = __webpack_require__(/*! ../utils/BackgroundUtils */ "./src/lib/utils/BackgroundUtils.ts");
var ContentClient_1 = __webpack_require__(/*! ./ContentClient */ "./src/lib/class/ContentClient.ts");
var LoggerUtils_1 = __webpack_require__(/*! ../utils/LoggerUtils */ "./src/lib/utils/LoggerUtils.ts");
var ContentServer = /** @class */ (function () {
    function ContentServer() {
        this.client = {};
        this.onConnect = this.onConnect.bind(this);
        BackgroundUtils_1.default.onMessage(this.onConnect);
    }
    ContentServer.prototype.isNewClientID = function (clientID) {
        return !Object.keys(this.client).includes(clientID);
    };
    ContentServer.prototype.onConnect = function (response, sender, sendResponse) {
        if (response.task) {
            var clientID = sender.tab.id.toString();
            switch (response.task) {
                case "openConnection":
                    if (this.isNewClientID(clientID)) {
                        LoggerUtils_1.default.log("New client", clientID);
                        this.client[clientID] = new ContentClient_1.default(clientID, sendResponse);
                    }
                    break;
                default:
                    if (!this.isNewClientID(clientID)) {
                        LoggerUtils_1.default.log("Client response", response.param);
                        this.client[clientID].responseTask(response.task, response.param, sendResponse);
                    }
                    break;
            }
        }
        else {
            LoggerUtils_1.default.error("Response Task not found: " + JSON.stringify(response));
        }
    };
    ContentServer.prototype.getCurrentClient = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            BrowserUtils_1.default.getCurrentTabID(function (tabID) {
                var client = null;
                if (tabID != null && Object.keys(tabID)) {
                    client = _this.client[tabID];
                }
                else {
                    LoggerUtils_1.default.warn("Current client not found on ContentServer::getCurrentClient");
                }
                resolve(client);
            });
        });
    };
    return ContentServer;
}());
exports.default = ContentServer;


/***/ }),

/***/ "./src/lib/class/PageDocument.ts":
/*!***************************************!*\
  !*** ./src/lib/class/PageDocument.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");
var RegExUtils_1 = __webpack_require__(/*! ../utils/RegExUtils */ "./src/lib/utils/RegExUtils.ts");
var PageDocument = /** @class */ (function () {
    function PageDocument(pageDocumentParam) {
        this.html = pageDocumentParam.html;
        this.origin = pageDocumentParam.origin;
        this.href = pageDocumentParam.href;
    }
    PageDocument.prototype.getHTML = function () {
        return this.html;
    };
    PageDocument.prototype.getHTMLWithLocalLinks = function () {
        var html = this.html;
        var rootOrigin = this.getRootURL().origin;
        var pagelinks = this.getPageLinksFromCurrentOrigin();
        pagelinks = pagelinks.concat(this.getCssPageLinksFromCurrentOrigin());
        pagelinks = pagelinks.concat(this.getScriptPageLinksFromCurrentOrigin());
        pagelinks = pagelinks.concat(this.getImagePageLinksFromCurrentOrigin());
        for (var _i = 0, pagelinks_1 = pagelinks; _i < pagelinks_1.length; _i++) {
            var pageLink = pagelinks_1[_i];
            var localLink = pageLink.sourceLink.replace(rootOrigin, ".");
            html = html.replace(pageLink.sourceLink, localLink);
        }
        return html;
    };
    PageDocument.prototype.getRootHref = function () {
        return this.href;
    };
    PageDocument.prototype.getRootURL = function () {
        return this.getURLFromLink(this.getRootHref());
    };
    PageDocument.prototype.getExtensionOrigin = function () {
        return window.location.origin;
    };
    PageDocument.prototype.getAllLinksFromHTML = function () {
        var regExp = new RegExp("<a\\s+(?:[^>]*?\\s+)?href=([\"'])(.*?)\\1", "gm");
        return RegExUtils_1.default.getMatchList(this.html, regExp).map(function (match) {
            return match[2];
        });
    };
    PageDocument.prototype.getAllCSSLinksFromHTML = function () {
        var regExp = new RegExp("<link\\s+(?:[^>]*?\\s+)?href=([\"'])(.*?)\\1", "gm");
        return RegExUtils_1.default.getMatchList(this.html, regExp).map(function (match) {
            return match[2];
        });
    };
    PageDocument.prototype.getAllScriptLinksFromHTML = function () {
        var regExp = new RegExp("<script\\s+(?:[^>]*?\\s+)?src=([\"'])(.*?)\\1", "gm");
        return RegExUtils_1.default.getMatchList(this.html, regExp).map(function (match) {
            return match[2];
        });
    };
    PageDocument.prototype.getAllImageLinksFromHTML = function () {
        var regExp = new RegExp("<img\\s+(?:[^>]*?\\s+)?src=([\"'])(.*?)\\1", "gm");
        return RegExUtils_1.default.getMatchList(this.html, regExp).map(function (match) {
            return match[2];
        });
    };
    PageDocument.prototype.getURLFromLink = function (link) {
        link = link.replace(this.getExtensionOrigin(), "");
        if (!link.includes(this.origin)) {
            link = url.resolve(this.href, link);
        }
        return new URL(link);
    };
    PageDocument.prototype.getPageLinkFromLink = function (link) {
        return {
            sourceLink: link,
            url: this.getURLFromLink(link)
        };
    };
    PageDocument.prototype.getPageLinksFromLinks = function (links) {
        var pageLinks = [];
        for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
            var link = links_1[_i];
            pageLinks.push(this.getPageLinkFromLink(link));
        }
        return pageLinks;
    };
    PageDocument.prototype.getPageLinks = function () {
        var links = this.getAllLinksFromHTML();
        return this.getPageLinksFromLinks(links);
    };
    PageDocument.prototype.isURLfromCurrentOrigin = function (url) {
        return url.origin == this.origin;
    };
    PageDocument.prototype.filterPageLinksFromCurrentOrigin = function (pageLinks) {
        var _this = this;
        return pageLinks.filter(function (e) { return _this.isURLfromCurrentOrigin(e.url); });
    };
    PageDocument.prototype.getPageLinksFromCurrentOrigin = function () {
        var links = this.getAllLinksFromHTML();
        return this.filterPageLinksFromCurrentOrigin(this.getPageLinksFromLinks(links));
    };
    PageDocument.prototype.getCssPageLinks = function () {
        var cssLinks = this.getAllCSSLinksFromHTML();
        return this.getPageLinksFromLinks(cssLinks);
    };
    PageDocument.prototype.getCssPageLinksFromCurrentOrigin = function () {
        return this.filterPageLinksFromCurrentOrigin(this.getCssPageLinks());
    };
    PageDocument.prototype.getScriptPageLinks = function () {
        var scriptLinks = this.getAllScriptLinksFromHTML();
        return this.getPageLinksFromLinks(scriptLinks);
    };
    PageDocument.prototype.getScriptPageLinksFromCurrentOrigin = function () {
        return this.filterPageLinksFromCurrentOrigin(this.getScriptPageLinks());
    };
    PageDocument.prototype.getImagePageLinks = function () {
        var imageLinks = this.getAllImageLinksFromHTML();
        return this.getPageLinksFromLinks(imageLinks);
    };
    PageDocument.prototype.getImagePageLinksFromCurrentOrigin = function () {
        return this.filterPageLinksFromCurrentOrigin(this.getImagePageLinks());
    };
    return PageDocument;
}());
exports.default = PageDocument;


/***/ }),

/***/ "./src/lib/class/Thief.ts":
/*!********************************!*\
  !*** ./src/lib/class/Thief.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerUtils_1 = __webpack_require__(/*! ../utils/LoggerUtils */ "./src/lib/utils/LoggerUtils.ts");
var PageDocument_1 = __webpack_require__(/*! ./PageDocument */ "./src/lib/class/PageDocument.ts");
var HTMLUtils_1 = __webpack_require__(/*! ../utils/HTMLUtils */ "./src/lib/utils/HTMLUtils.ts");
var DEFAULT_THIEF_OPTIONS = {
    recursive: true,
    donwloadImages: true,
    downloadCSS: true,
    downloadScripts: true
};
var Thief = /** @class */ (function () {
    function Thief(contentClient, pageDocumentParam, options) {
        if (options === void 0) { options = {}; }
        this.pageDocuments = [];
        this.assets = [];
        this.assetQueue = [];
        this.linkBuckets = [];
        this.queueURL = [];
        this.finishCallback = function () { };
        this.options = Object.assign({}, DEFAULT_THIEF_OPTIONS, options);
        this.startPageDocument = new PageDocument_1.default(pageDocumentParam);
        this.contentClient = contentClient;
    }
    Thief.prototype.start = function (cb) {
        this.finishCallback = cb;
        LoggerUtils_1.default.log("Start download page with options", this.options);
        var pageLinks = this.startPageDocument.getPageLinksFromCurrentOrigin();
        this.addPageLinksToQueue(pageLinks);
        LoggerUtils_1.default.log("URL queue: %d", this.queueURL.length);
        this.fetchPages();
    };
    Thief.prototype.getStartPageDocument = function () {
        return this.startPageDocument;
    };
    Thief.prototype.getPageDocuments = function () {
        return this.pageDocuments;
    };
    Thief.prototype.getAssets = function () {
        return this.assets;
    };
    Thief.prototype.addPageLinksToQueue = function (pageLinks) {
        for (var _i = 0, pageLinks_1 = pageLinks; _i < pageLinks_1.length; _i++) {
            var pageLink = pageLinks_1[_i];
            // this.addLinkToQueue(pageLink.url.href, "string");
            this.addLinkToQueue(pageLink.url.origin + pageLink.url.pathname, "string");
        }
    };
    Thief.prototype.addLinkToQueue = function (link, type) {
        if (this.linkBuckets.indexOf(link) < 0) {
            this.linkBuckets.push(link);
            this.queueURL.push({ link: link, type: type });
        }
    };
    Thief.prototype.fetchPages = function () {
        var _this = this;
        if (this.queueURL.length > 0) {
            var task_1 = this.queueURL.shift();
            this.contentClient.getData(task_1.link, task_1.type).then(function (data) {
                if (data != null) {
                    var currentPageDocument = HTMLUtils_1.default.createPageDocument(task_1.link, data);
                    _this.pageDocuments.push(currentPageDocument);
                    if (_this.options.recursive) {
                        _this.addPageLinksToQueue(currentPageDocument.getPageLinksFromCurrentOrigin());
                    }
                }
                _this.fetchPages();
            }).catch(function () { return _this.fetchPages(); });
        }
        else {
            LoggerUtils_1.default.log("Finished download %d pages", this.pageDocuments.length);
            this.startFetchAssets();
        }
    };
    Thief.prototype.getAssetsQueueFromPageDocuments = function () {
        var assets = [];
        for (var _i = 0, _a = this.pageDocuments; _i < _a.length; _i++) {
            var pageDocument = _a[_i];
            if (this.options.downloadCSS) {
                assets = assets.concat(pageDocument.getCssPageLinksFromCurrentOrigin().map(function (pageLink) { return ({
                    link: pageLink.url.href,
                    type: 'arraybuffer'
                }); }));
            }
            if (this.options.downloadScripts) {
                assets = assets.concat(pageDocument.getScriptPageLinksFromCurrentOrigin().map(function (pageLink) { return ({
                    link: pageLink.url.href,
                    type: 'arraybuffer'
                }); }));
            }
            if (this.options.donwloadImages) {
                assets = assets.concat(pageDocument.getImagePageLinksFromCurrentOrigin().map(function (pageLink) { return ({
                    link: pageLink.url.href,
                    type: 'arraybuffer'
                }); }));
            }
        }
        var assetLinks = assets.map(function (asset) { return asset.link; });
        return assets.filter(function (asset, index) { return assetLinks.indexOf(asset.link) === index; });
    };
    Thief.prototype.startFetchAssets = function () {
        this.assetQueue = this.getAssetsQueueFromPageDocuments();
        LoggerUtils_1.default.log("Start download assets %d", this.assetQueue.length);
        this.fetchAssets();
    };
    Thief.prototype.fetchAssets = function () {
        var _this = this;
        if (this.assetQueue.length > 0) {
            var task_2 = this.assetQueue.shift();
            this.contentClient.getData(task_2.link, task_2.type).then(function (data) {
                if (data != null) {
                    _this.assets.push(__assign(__assign({}, task_2), { data: data }));
                }
                _this.fetchAssets();
            }).catch(function () { return _this.fetchAssets(); });
        }
        else {
            LoggerUtils_1.default.log("Finished to download %d assets", this.assets.length);
            this.finishCallback();
        }
    };
    return Thief;
}());
exports.default = Thief;


/***/ }),

/***/ "./src/lib/utils/BackgroundUtils.ts":
/*!******************************************!*\
  !*** ./src/lib/utils/BackgroundUtils.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoggerUtils_1 = __webpack_require__(/*! ./LoggerUtils */ "./src/lib/utils/LoggerUtils.ts");
var BackgroundUtils = /** @class */ (function () {
    function BackgroundUtils() {
    }
    BackgroundUtils.onMessage = function (onListen) {
        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
            LoggerUtils_1.default.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
            onListen(msg, sender, sendResponse);
            return true;
        });
    };
    return BackgroundUtils;
}());
exports.default = BackgroundUtils;


/***/ }),

/***/ "./src/lib/utils/BrowserUtils.ts":
/*!***************************************!*\
  !*** ./src/lib/utils/BrowserUtils.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BrowserUtils = /** @class */ (function () {
    function BrowserUtils() {
    }
    BrowserUtils.getCurrentTab = function (cb) {
        chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true }, function (tabs) {
            var tab = null;
            if (tabs && tabs.length > 0) {
                tab = tabs[0];
            }
            cb(tab);
        });
    };
    BrowserUtils.getCurrentTabID = function (cb) {
        BrowserUtils.getCurrentTab(function (tab) {
            var tabId = null;
            if (tab != null) {
                tabId = tab.id;
            }
            cb(tabId);
        });
    };
    BrowserUtils.getBackground = function () {
        return chrome.extension.getBackgroundPage();
    };
    return BrowserUtils;
}());
exports.default = BrowserUtils;


/***/ }),

/***/ "./src/lib/utils/HTMLUtils.ts":
/*!************************************!*\
  !*** ./src/lib/utils/HTMLUtils.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PageDocument_1 = __webpack_require__(/*! ../class/PageDocument */ "./src/lib/class/PageDocument.ts");
var PageDocumentUtils = /** @class */ (function () {
    function PageDocumentUtils() {
    }
    PageDocumentUtils.getPageDocumentParameterFromCurrentDocument = function () {
        return {
            html: document.documentElement.outerHTML,
            origin: window.location.origin,
            href: window.location.href,
        };
    };
    PageDocumentUtils.createPageDocumentParam = function (link, html) {
        var url = new URL(link);
        return {
            html: html,
            origin: url.origin,
            href: url.href,
        };
    };
    PageDocumentUtils.createPageDocument = function (link, html) {
        return new PageDocument_1.default(PageDocumentUtils.createPageDocumentParam(link, html));
    };
    PageDocumentUtils.getPageDocumentFromCurrentDocument = function () {
        return new PageDocument_1.default(PageDocumentUtils.getPageDocumentParameterFromCurrentDocument());
    };
    return PageDocumentUtils;
}());
exports.default = PageDocumentUtils;


/***/ }),

/***/ "./src/lib/utils/LoggerUtils.ts":
/*!**************************************!*\
  !*** ./src/lib/utils/LoggerUtils.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ACTIVE_LOGGING = true;
var LoggerUtils = /** @class */ (function () {
    function LoggerUtils() {
    }
    LoggerUtils.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (ACTIVE_LOGGING) {
            console.log.apply(console, args);
        }
    };
    LoggerUtils.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (ACTIVE_LOGGING) {
            console.warn.apply(console, args);
        }
    };
    LoggerUtils.error = function (error, throwError) {
        if (throwError === void 0) { throwError = false; }
        if (ACTIVE_LOGGING) {
            console.error(error);
            if (throwError) {
                throw error;
            }
        }
    };
    return LoggerUtils;
}());
exports.default = LoggerUtils;


/***/ }),

/***/ "./src/lib/utils/RegExUtils.ts":
/*!*************************************!*\
  !*** ./src/lib/utils/RegExUtils.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RegExUtils = /** @class */ (function () {
    function RegExUtils() {
    }
    RegExUtils.getMatchList = function (source, regExp) {
        var m;
        var matches = [];
        do {
            m = regExp.exec(source);
            if (m) {
                matches.push(m);
            }
        } while (m);
        return matches;
    };
    return RegExUtils;
}());
exports.default = RegExUtils;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc3ppcC9kaXN0L2pzemlwLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3B1bnljb2RlL3B1bnljb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXJsL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXJsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jbGFzcy9CdWlsZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY2xhc3MvQ29udGVudENsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NsYXNzL0NvbnRlbnRTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jbGFzcy9QYWdlRG9jdW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jbGFzcy9UaGllZi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL0JhY2tncm91bmRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL0Jyb3dzZXJVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL0hUTUxVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzL0xvZ2dlclV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMvUmVnRXhVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVk7O0FBRVosYUFBYSxtQkFBTyxDQUFDLG9EQUFXO0FBQ2hDLGNBQWMsbUJBQU8sQ0FBQyxnREFBUztBQUMvQixjQUFjLG1CQUFPLENBQUMsZ0RBQVM7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzV2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsUUFBUSxVQUFVOztBQUVsQjtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRkEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0pBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxHQUFHLElBQW9ELG9CQUFvQixLQUFLLEVBQThLLENBQUMsWUFBWSx5QkFBeUIsZ0JBQWdCLFVBQVUsVUFBVSwwQ0FBMEMsZ0JBQWdCLE9BQUMsT0FBTyxvQkFBb0IsOENBQThDLGtDQUFrQyxZQUFZLFlBQVksbUNBQW1DLGlCQUFpQixlQUFlLHNCQUFzQixvQkFBb0Isa0RBQWtELFdBQVcsWUFBWSxTQUFTLEVBQUUsbUJBQW1CLGFBQWEsMEdBQTBHLHFCQUFxQiwwRUFBMEUsV0FBVywrT0FBK08sa0JBQWtCLHNCQUFzQixrQ0FBa0MsK0ZBQStGLDJEQUEyRCx5SkFBeUosc0RBQXNELFdBQVcsa01BQWtNLFVBQVUsRUFBRSw0QkFBNEIscUJBQXFCLGFBQWEsNEdBQTRHLGdDQUFnQyxzQkFBc0IsdUdBQXVHLGFBQWEsNEJBQTRCLG1JQUFtSSw2QkFBNkIsNkdBQTZHLElBQUksZ0NBQWdDLHlQQUF5UCxvQ0FBb0MsNklBQTZJLGFBQWEsRUFBRSwrRkFBK0YscUJBQXFCLGFBQWEsa0NBQWtDLFNBQVMsd0NBQXdDLGtDQUFrQyw2QkFBNkIscUNBQXFDLHdCQUF3QixFQUFFLHdDQUF3QyxxQkFBcUIsYUFBYSxtQkFBbUIsaUJBQWlCLG1CQUFtQixNQUFNLEtBQUssSUFBSSxZQUFZLElBQUksaUNBQWlDLE9BQU8sU0FBUyxHQUFHLHdCQUF3Qix3RUFBd0UsY0FBYyxNQUFNLFlBQVksSUFBSSw0QkFBNEIsV0FBVyxxQ0FBcUMsY0FBYyxNQUFNLFlBQVksSUFBSSx1Q0FBdUMsV0FBVyxzQkFBc0IsRUFBRSxhQUFhLHFCQUFxQixhQUFhLHlLQUF5SyxHQUFHLHFCQUFxQixhQUFhLFdBQVcsMERBQTBELFdBQVcsRUFBRSxPQUFPLHFCQUFxQixhQUFhLHlMQUF5TCxnQkFBZ0Isa0dBQWtHLG9FQUFvRSxtR0FBbUcsOEJBQThCLDBGQUEwRixnQ0FBZ0MsK0NBQStDLG9DQUFvQyxvQ0FBb0MseUNBQXlDLEVBQUUsV0FBVyw4QkFBOEIsUUFBUSxtQkFBbUIsR0FBRyw4QkFBOEIsMEJBQTBCLCtCQUErQix5QkFBeUIsR0FBRyxFQUFFLGlEQUFpRCxxQkFBcUIsYUFBYSxnQkFBZ0IsV0FBVyxRQUFRLElBQUkseUNBQXlDLFNBQVMsd0JBQXdCLGdUQUFnVCw2Q0FBNkMsaUdBQWlHLFFBQVEsK0JBQStCLFlBQVksOENBQThDLFFBQVEsMENBQTBDLDRDQUE0QyxpQkFBaUIsK1FBQStRLFNBQVMsaUtBQWlLLDRIQUE0SCxzR0FBc0csb0JBQW9CLGlSQUFpUiw2Q0FBNkMsbUVBQW1FLHlHQUF5RyxrQkFBa0IsOERBQThELEdBQUcsc0NBQXNDLHdFQUF3RSxvQ0FBb0MsTUFBTSw4RUFBOEUsV0FBVyx3QkFBd0IsV0FBVyxFQUFFLHdCQUF3QixzQ0FBc0MsbUJBQW1CLDhHQUE4RyxrREFBa0QsaUJBQWlCLG9GQUFvRixVQUFVLGFBQWEsRUFBRSxvQkFBb0Isd0JBQXdCLFdBQVcsRUFBRSwwQkFBMEIsdUNBQXVDLHNCQUFzQiw4QkFBOEIsZ0NBQWdDLHlCQUF5QixlQUFlLDhCQUE4QixhQUFhLEVBQUUsZ0RBQWdELG1DQUFtQyxzRkFBc0YsaUVBQWlFLFdBQVcsYUFBYSxhQUFhLEVBQUUsMENBQTBDLDJJQUEySSwwQ0FBMEMsc0JBQXNCLFdBQVcsK0JBQStCLGtCQUFrQix3QkFBd0Isc0ZBQXNGLDJCQUEyQixXQUFXLE9BQU8sK0JBQStCLDRMQUE0TCwrQkFBK0Isb0JBQW9CLDRDQUE0QyxZQUFZLFdBQVcsUUFBUSxjQUFjLFVBQVUsU0FBUyw2QkFBNkIsNEJBQTRCLDRCQUE0QixXQUFXLGdCQUFnQixhQUFhLEVBQUUsdUZBQXVGLHFCQUFxQixhQUFhLGtEQUFrRCxpQ0FBaUMsNkRBQTZELElBQUksd0JBQXdCLElBQUksb0JBQW9CLGtCQUFrQixnRUFBZ0UsU0FBUyw4RkFBOEYsa0JBQWtCLDhDQUE4Qyw0R0FBNEcsVUFBVSxtQkFBbUIsU0FBUyxXQUFXLFVBQVUsRUFBRSx3Q0FBd0Msc0JBQXNCLGFBQWEsYUFBYSxxQ0FBcUMsc0lBQXNJLGFBQWEsc0RBQXNELFlBQVksNkRBQTZELFVBQVUsa0pBQWtKLDZCQUE2Qix3Q0FBd0MsRUFBRSx1RUFBdUUsc0JBQXNCLGFBQWEsd0lBQXdJLGNBQWMsbUNBQW1DLG9EQUFvRCx5QkFBeUIsS0FBSyxzQkFBc0IsNkZBQTZGLFdBQVcsRUFBRSx3QkFBd0IsV0FBVyx1QkFBdUIsRUFBRSw4RkFBOEYsNk1BQTZNLGVBQWUsbUJBQW1CLG1CQUFtQix1Q0FBdUMsNEJBQTRCLFdBQVcsb0JBQW9CLHdCQUF3QixtQkFBbUIsa0NBQWtDLFdBQVcsS0FBSyxXQUFXLHFDQUFxQywrTUFBK00sRUFBRSx1REFBdUQsR0FBRyxFQUFFLHNHQUFzRyxzQkFBc0IsYUFBYSxtREFBbUQsZ0JBQWdCLDZGQUE2RixvREFBb0QsV0FBVyxpREFBaUQsUUFBUSxhQUFhLFdBQVcsRUFBRSx5QkFBeUIsNENBQTRDLHNCQUFzQix1Q0FBdUMsRUFBRSw4QkFBOEIsZ0VBQWdFLCtCQUErQixpR0FBaUcsYUFBYSxFQUFFLDJDQUEyQyxzQkFBc0IsYUFBYSxvQ0FBb0Msa0JBQWtCLDhCQUE4QixXQUFXLDBCQUEwQixxQ0FBcUMseUJBQXlCLGtCQUFrQixzQkFBc0IsYUFBYSxFQUFFLHlEQUF5RCxzQkFBc0IsYUFBYSxFQUFFLG1DQUFtQyxzQkFBc0IsYUFBYSxXQUFXLDhEQUE4RCxzRUFBc0Usa0ZBQWtGLHVCQUF1Qix5QkFBeUIsdUNBQXVDLG9CQUFvQixtQkFBbUIsc0JBQXNCLDBCQUEwQixzQkFBc0IsNkZBQTZGLEdBQUcsc0JBQXNCLGFBQWEsa0JBQWtCLHVDQUF1QyxJQUFJLHNWQUFzVixpREFBaUQsdUtBQXVLLFdBQVcsc0lBQXNJLG1CQUFtQixnQkFBZ0IseVBBQXlQLGlEQUFpRCx5QkFBeUIsK0JBQStCLGVBQWUsb0NBQW9DLGlCQUFpQixnRkFBZ0YsdUJBQXVCLGlCQUFpQixjQUFjLDREQUE0RCxPQUFPLGdCQUFnQiw4RkFBOEYscUJBQXFCLFVBQVUsNEpBQTRKLG9CQUFvQixTQUFTLGtDQUFrQyxrQkFBa0IsSUFBSSxzQkFBc0IscUVBQXFFLFNBQVMsUUFBUSxpQ0FBaUMsd0JBQXdCLEVBQUUsOEJBQThCLHdCQUF3QixvQkFBb0Isa0JBQWtCLHlDQUF5Qyx3QkFBd0IsRUFBRSxrREFBa0QsdUJBQXVCLG9CQUFvQixjQUFjLG9CQUFvQixtRkFBbUYseUNBQXlDLG9DQUFvQyxNQUFNLFdBQVcsaUNBQWlDLFlBQVksc0JBQXNCLDhGQUE4RixvQ0FBb0MsV0FBVyxJQUFJLG9CQUFvQixFQUFFLHNKQUFzSix1S0FBdUssK0tBQStLLGtDQUFrQyw2QkFBNkIsU0FBUyw0QkFBNEIsNENBQTRDLDZCQUE2QixvREFBb0Qsa0NBQWtDLGNBQWMsaUZBQWlGLFlBQVksRUFBRSxnTkFBZ04sc0JBQXNCLHNCQUFzQixFQUFFLGNBQWMsc0JBQXNCLGFBQWEsd0JBQXdCLGNBQWMsZUFBZSxZQUFZLG1CQUFtQixrQkFBa0IsMkRBQTJELDhCQUE4Qiw4Q0FBOEMsZ0dBQWdHLEtBQUssdUdBQXVHLFNBQVMsK0NBQStDLCtGQUErRiw4Q0FBOEMsa0NBQWtDLHNDQUFzQyxtRUFBbUUsdUJBQXVCLGFBQWEsRUFBRSxnQ0FBZ0Msc0JBQXNCLGFBQWEsb0JBQW9CLGNBQWMsMERBQTBELGFBQWEsd0JBQXdCLDhCQUE4Qix3QkFBd0IsNklBQTZJLHNCQUFzQixnQ0FBZ0Msa0JBQWtCLDRCQUE0QixxQkFBcUIscUJBQXFCLFVBQVUseUNBQXlDLGNBQWMsNEJBQTRCLHVCQUF1Qix3QkFBd0IsZ0RBQWdELHVCQUF1QixtQ0FBbUMsb0NBQW9DLHFCQUFxQixzQkFBc0IsOEZBQThGLGFBQWEsRUFBRSxjQUFjLHNCQUFzQixhQUFhLDhCQUE4QixjQUFjLGVBQWUsNkRBQTZELG9CQUFvQixtRUFBbUUsdUJBQXVCLGFBQWEsRUFBRSxzQ0FBc0Msc0JBQXNCLGFBQWEsd0JBQXdCLGNBQWMsZUFBZSwyREFBMkQseUNBQXlDLDhDQUE4QywwQ0FBMEMsK0NBQStDLDRCQUE0QixrQ0FBa0Msb0JBQW9CLG1FQUFtRSx1QkFBdUIsYUFBYSxFQUFFLGdDQUFnQyxzQkFBc0IsYUFBYSx5QkFBeUIsY0FBYyxlQUFlLDZEQUE2RCxzREFBc0Qsc0VBQXNFLHVCQUF1QixhQUFhLEVBQUUsaUNBQWlDLHNCQUFzQixhQUFhLHFJQUFxSSxzQkFBc0IscUJBQXFCLDBLQUEwSyxFQUFFLHFIQUFxSCxzQkFBc0IsYUFBYSwrTEFBK0wsR0FBRyxzQkFBc0IsYUFBYSwyQ0FBMkMsY0FBYyxtREFBbUQscURBQXFELFdBQVcscURBQXFELEVBQUUsYUFBYSxFQUFFLG1DQUFtQyxzQkFBc0IsYUFBYSwyQ0FBMkMsYUFBYSx5REFBeUQsaUVBQWlFLHNFQUFzRSxhQUFhLEVBQUUsZ0RBQWdELHNCQUFzQixhQUFhLDJDQUEyQyxjQUFjLCtFQUErRSxxREFBcUQsTUFBTSx3Q0FBd0MsK0NBQStDLHNDQUFzQyxhQUFhLEVBQUUsbUNBQW1DLHNCQUFzQixhQUFhLDJDQUEyQyxjQUFjLDBCQUEwQixXQUFXLGtIQUFrSCxvR0FBb0csYUFBYSxXQUFXLEVBQUUsK0NBQStDLDhDQUE4QywrQkFBK0Isa0pBQWtKLHVDQUF1QyxxSkFBcUosOEJBQThCLDJDQUEyQyxpREFBaUQsMENBQTBDLGtCQUFrQixpREFBaUQsTUFBTSxvREFBb0QsTUFBTSw2REFBNkQsK0JBQStCLGFBQWEsNENBQTRDLEVBQUUsYUFBYSxFQUFFLG1DQUFtQyxzQkFBc0IsYUFBYSxjQUFjLHlDQUF5QyxpREFBaUQsdUVBQXVFLHdCQUF3QixvQkFBb0IsYUFBYSxpQkFBaUIsb0JBQW9CLGdCQUFnQiw0QkFBNEIsYUFBYSxJQUFJLG1EQUFtRCxTQUFTLHFCQUFxQixTQUFTLG1CQUFtQixnS0FBZ0ssa0JBQWtCLHVDQUF1QyxvQkFBb0IsaUZBQWlGLG9CQUFvQixrQ0FBa0MsNEJBQTRCLHVDQUF1QyxrQkFBa0IsZ0NBQWdDLDhCQUE4QixpRkFBaUYsb0VBQW9FLFdBQVcsK0JBQStCLGtCQUFrQix3QkFBd0IsUUFBUSwyQkFBMkIsV0FBVyxPQUFPLGtCQUFrQixtR0FBbUcsbUJBQW1CLDRDQUE0Qyx1QkFBdUIsNEdBQTRHLG1CQUFtQiwwQkFBMEIsYUFBYSw4QkFBOEIsNkRBQTZELDRCQUE0Qix1SEFBdUgsaUJBQWlCLGlGQUFpRixxREFBcUQscUJBQXFCLDBCQUEwQiwrQ0FBK0MsYUFBYSxHQUFHLHNCQUFzQixhQUFhLCtIQUErSCxvQkFBb0IsMkNBQTJDLFVBQVUsZ0JBQWdCLG1DQUFtQyx5REFBeUQsMEJBQTBCLGtCQUFrQix5QkFBeUIsVUFBVSxzQkFBc0IsSUFBSSxzQkFBc0IsVUFBVSw4REFBOEQsZ0NBQWdDLG1DQUFtQyxpQkFBaUIscUJBQXFCLFFBQVEsV0FBVyxtQkFBbUIsVUFBVSwrQkFBK0Isc0RBQXNELDZDQUE2QyxXQUFXLGlDQUFpQyxTQUFTLHlDQUF5Qyw4REFBOEQsU0FBUyxLQUFLLFNBQVMsS0FBSyxLQUFLLFdBQVcsRUFBRSxrQkFBa0IsUUFBUSxVQUFVLDRDQUE0QyxNQUFNLHdCQUF3QixJQUFJLGtIQUFrSCxTQUFTLG1EQUFtRCxhQUFhLHVCQUF1QixpQkFBaUIsa0JBQWtCLFdBQVcsK0NBQStDLHdCQUF3QiwrQkFBK0IsdUJBQXVCLE9BQU8sbUJBQW1CLHlEQUF5RCxrQkFBa0IsaUNBQWlDLDRCQUE0QixxSUFBcUksbUJBQW1CLDJDQUEyQyxLQUFLLGFBQWEsRUFBRSwrSUFBK0ksc0JBQXNCLGFBQWEsa1BBQWtQLEtBQUsseUJBQXlCLElBQUkseUJBQXlCLHVCQUF1QixPQUFPLFNBQVMsSUFBSSw2RkFBNkYseURBQXlELFNBQVMsWUFBWSxJQUFJLDZDQUE2QyxTQUFTLGlCQUFpQixFQUFFLHFCQUFxQixzQkFBc0IsYUFBYSxnSEFBZ0gsTUFBTSx3REFBd0QsZ0JBQWdCLGFBQWEsK0NBQStDLGFBQWEsNEJBQTRCLHlCQUF5QiwyREFBMkQsNkJBQTZCLFFBQVEsSUFBSSwySkFBMkosd0RBQXdELElBQUksNlFBQTZRLFNBQVMsSUFBSSwwQkFBMEIsZ0ZBQWdGLHdDQUF3QyxVQUFVLElBQUksNEJBQTRCLHVDQUF1QyxLQUFLLDJCQUEyQixTQUFTLHNCQUFzQix5RkFBeUYsc0ZBQXNGLHVEQUF1RCxzREFBc0QsOERBQThELHdDQUF3QyxpQkFBaUIsUUFBUSxxR0FBcUcsK0JBQStCLG1CQUFtQixvQkFBb0IsTUFBTSxpREFBaUQsc0JBQXNCLEtBQUsscUNBQXFDLFFBQVEsb0pBQW9KLGlDQUFpQyxFQUFFLDhCQUE4QixpREFBaUQseUNBQXlDLHNCQUFzQiwyRUFBMkUsV0FBVyxzQ0FBc0MsRUFBRSxzQkFBc0IsRUFBRSwyRUFBMkUsc0JBQXNCLGFBQWEsc0dBQXNHLGNBQWMsU0FBUyxnQkFBZ0IsWUFBWSxXQUFXLDZCQUE2QixTQUFTLHdCQUF3Qix1QkFBdUIsSUFBSSxxQkFBcUIsT0FBTyxFQUFFLFNBQVMsSUFBSSw2RkFBNkYsZ0NBQWdDLFNBQVMsc0RBQXNELE9BQU8saUNBQWlDLHdCQUF3QixpREFBaUQsS0FBSyxJQUFJLDZLQUE2SyxrQkFBa0IsNkJBQTZCLGlCQUFpQixXQUFXLGlDQUFpQyxTQUFTLGlCQUFpQixzQkFBc0IsSUFBSSxrRkFBa0YsU0FBUyxVQUFVLHlCQUF5QixJQUFJLGlGQUFpRixTQUFTLFVBQVUsS0FBSyxjQUFjLGtDQUFrQywyR0FBMkcsSUFBSSxLQUFLLGlDQUFpQyxTQUFTLGtCQUFrQiw0QkFBNEIsZ0JBQWdCLFlBQVksV0FBVyxjQUFjLFNBQVMsc0JBQXNCLFNBQVMsVUFBVSwyQkFBMkIsZ0NBQWdDLHlCQUF5QixxQ0FBcUMsd0JBQXdCLHFDQUFxQyx3QkFBd0IscUNBQXFDLFVBQVUseUNBQXlDLGdDQUFnQyx3QkFBd0IseUJBQXlCLHdCQUF3QiwyQkFBMkIsZ0JBQWdCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLG9EQUFvRCxzQ0FBc0MseUJBQXlCLHdCQUF3QiwyQ0FBMkMsZUFBZSwyQkFBMkIsZ0NBQWdDLHlCQUF5QixnQkFBZ0IscUNBQXFDLDJCQUEyQixlQUFlLDJCQUEyQixnQ0FBZ0MseUJBQXlCLHlDQUF5Qyx3QkFBd0IscUNBQXFDLGNBQWMsNkJBQTZCLHVCQUF1QixrQkFBa0IscUJBQXFCLGtCQUFrQix5QkFBeUIsd1BBQXdQLDRCQUE0QiwrRUFBK0UscUVBQXFFLGFBQWEsUUFBUSxpQkFBaUIsMEVBQTBFLFNBQVMseUJBQXlCLGFBQWEsdUJBQXVCLEVBQUUsMEJBQTBCLGNBQWMsMENBQTBDLHFCQUFxQixhQUFhLFFBQVEsbUJBQW1CLGdHQUFnRyxTQUFTLHNDQUFzQyw2Q0FBNkMsa0xBQWtMLHFCQUFxQixxQkFBcUIsbUJBQW1CLHVCQUF1QixrQkFBa0Isd0JBQXdCLElBQUksbUJBQW1CLHFCQUFxQixxSEFBcUgsc0VBQXNFLGdKQUFnSixHQUFHLEVBQUUsc0ZBQXNGLHNCQUFzQixhQUFhLGlIQUFpSCxjQUFjLGlDQUFpQyxhQUFhLDJCQUEyQiwwQ0FBMEMscUJBQXFCLGdDQUFnQywyR0FBMkcsMkJBQTJCLHdCQUF3Qix3QkFBd0Isb0NBQW9DLGlDQUFpQyxrQ0FBa0Msc1VBQXNVLDJHQUEyRyxtREFBbUQsdUNBQXVDLDJYQUEyWCw4Q0FBOEMsSUFBSSwwR0FBMEcsdUJBQXVCLDhDQUE4QywyT0FBMk8sMkJBQTJCLFFBQVEsUUFBUSxvQkFBb0IseUtBQXlLLDJCQUEyQixNQUFNLGdEQUFnRCx5REFBeUQsV0FBVyxpQkFBaUIsb0VBQW9FLDZOQUE2Tiw2QkFBNkIsZ0VBQWdFLDBRQUEwUSx3QkFBd0IsUUFBUSxnV0FBZ1csbUxBQW1MLHliQUF5YixtSkFBbUosZ0RBQWdELHFEQUFxRCxVQUFVLHVFQUF1RSw2RUFBNkUsMkJBQTJCLGlCQUFpQixrQkFBa0IsMkZBQTJGLGFBQWEsRUFBRSxpR0FBaUcsc0JBQXNCLGFBQWEsMklBQTJJLGdCQUFnQixrQ0FBa0MsYUFBYSx1QkFBdUIsMkJBQTJCLG9CQUFvQixpQ0FBaUMsMkJBQTJCLFFBQVEsaVVBQWlVLHlCQUF5QixrRUFBa0UsWUFBWSwrS0FBK0ssZ0hBQWdILDZCQUE2Qiw4TkFBOE4sbUJBQW1CLHlTQUF5UyxtSEFBbUgsOEJBQThCLG1EQUFtRCw0QkFBNEIsb09BQW9PLGtDQUFrQyx3QkFBd0IsbUNBQW1DLGlVQUFpVSw2QkFBNkIsMkNBQTJDLDBDQUEwQyxFQUFFLFVBQVUsb0VBQW9FLHVCQUF1Qix1QkFBdUIsd0NBQXdDLGtIQUFrSCxLQUFLLHVDQUF1QywrQkFBK0IsS0FBSyxxQ0FBcUMsb0RBQW9ELDBDQUEwQyxrQ0FBa0MsS0FBSyx3Q0FBd0MseURBQXlELHNDQUFzQyw4QkFBOEIsTUFBTSxpQkFBaUIsdUdBQXVHLFlBQVkseUNBQXlDLDhCQUE4QixNQUFNLGlCQUFpQiwwR0FBMEcsYUFBYSxhQUFhLEVBQUUsc0hBQXNILHNCQUFzQixhQUFhLGtCQUFrQixvTUFBb00sbUVBQW1FLGtJQUFrSSxhQUFhLDJCQUEyQixzQkFBc0IsSUFBSSxtREFBbUQsaURBQWlELHdFQUF3RSx3QkFBd0Isb0ZBQW9GLFNBQVMsNEJBQTRCLHFCQUFxQixxQkFBcUIsNENBQTRDLDBCQUEwQiw4REFBOEQsK0JBQStCLDJHQUEyRywrQkFBK0Isc0ZBQXNGLDhCQUE4QixvSEFBb0gsMkZBQTJGLDhGQUE4RixLQUFLLFdBQVcsd0JBQXdCLFlBQVksRUFBRSxtSEFBbUgsc0JBQXNCLGFBQWEsYUFBYSx1REFBdUQsTUFBTSxtREFBbUQsYUFBYSxpQkFBaUIsZUFBZSxnQkFBZ0IseUlBQXlJLHlDQUF5QyxnQ0FBZ0MsaUVBQWlFLDJDQUEyQyxZQUFZLGlCQUFpQixLQUFLLDJCQUEyQixpQ0FBaUMsd0JBQXdCLFNBQVMsYUFBYSxRQUFRLEtBQUssbUJBQW1CLEVBQUUsRUFBRSxrQkFBa0IsTUFBTSxRQUFRLFdBQVcsS0FBSyxzQkFBc0IsdUJBQXVCLGdIQUFnSCxFQUFFLEdBQUcsc0JBQXNCLGFBQWEscUJBQXFCLGNBQWMsUUFBUSw4Q0FBOEMsY0FBYywyRUFBMkUsZ0VBQWdFLGtCQUFrQix3TEFBd0wsa0JBQWtCLGFBQWEsTUFBTSxJQUFJLE9BQU8sU0FBUyxxQkFBcUIscUZBQXFGLEVBQUUsY0FBYyxnQkFBZ0IseUZBQXlGLHNCQUFzQixnQkFBZ0IsU0FBUyxjQUFjLHdCQUF3QixjQUFjLHlCQUF5QixtQkFBbUIsT0FBTyxFQUFFLCtCQUErQixnQkFBZ0IsU0FBUyxJQUFJLGdDQUFnQyxTQUFTLDJCQUEyQixTQUFTLDRDQUE0QyxvQ0FBb0MsdUJBQXVCLDZCQUE2QixzQ0FBc0MsU0FBUyxFQUFFLGFBQWEsc0NBQXNDLFFBQVEsRUFBRSxFQUFFLCtCQUErQix5QkFBeUIsZ0NBQWdDLDBGQUEwRiw4QkFBOEIsa0ZBQWtGLFNBQVMsdUNBQXVDLDBCQUEwQiw0Q0FBNEMsbUNBQW1DLHNDQUFzQyx5QkFBeUIsMkNBQTJDLGtDQUFrQyx5QkFBeUIsYUFBYSxpREFBaUQsY0FBYyxZQUFZLEtBQUssc0JBQXNCLDhCQUE4QixNQUFNLDZCQUE2QixTQUFTLHdCQUF3QixzQkFBc0IsOEJBQThCLE1BQU0sNEJBQTRCLFNBQVMsdUJBQXVCLDhCQUE4QixnQ0FBZ0Msc0JBQXNCLGtCQUFrQixxQkFBcUIsbUJBQW1CLFdBQVcsOEdBQThHLG9CQUFvQiw4QkFBOEIsMENBQTBDLEtBQUssTUFBTSxXQUFXLFNBQVMsZ0JBQWdCLDhCQUE4Qix5Q0FBeUMsYUFBYSx3QkFBd0IsR0FBRyxvQkFBb0IsV0FBVyw4R0FBOEcsb0JBQW9CLDhCQUE4Qix1QkFBdUIsS0FBSyxNQUFNLHNDQUFzQyx5QkFBeUIsYUFBYSx3QkFBd0IsRUFBRSxNQUFNLFVBQVUsRUFBRSxhQUFhLHNCQUFzQixhQUFhLFNBQVMsa0hBQWtILEVBQUUsd0ZBQXdGLHNCQUFzQixhQUFhLGlLQUFpSyxjQUFjLHdDQUF3Qyx1QkFBdUIsMkVBQTJFLE1BQU0sRUFBRSxtQkFBbUIsdU1BQXVNLG9GQUFvRiwrQkFBK0Isa0VBQWtFLE1BQU0sd05BQXdOLG1CQUFtQixnQkFBZ0IsZUFBZSw0Q0FBNEMsZ0JBQWdCLCtCQUErQiw2Q0FBNkMsdUJBQXVCLCtLQUErSyxHQUFHLDRJQUE0SSwyTEFBMkwsOENBQThDLG1IQUFtSCxnQ0FBZ0Msb0JBQW9CLCtCQUErQiwrSkFBK0osb0RBQW9ELGNBQWMsZ0JBQWdCLHNCQUFzQixjQUFjLGtCQUFrQixFQUFFLHNHQUFzRyxzQkFBc0IsYUFBYSwrTEFBK0wsY0FBYyx3Q0FBd0MsdUJBQXVCLG1DQUFtQyxNQUFNLEVBQUUsbUJBQW1CLHlWQUF5Viw2Q0FBNkMsb0NBQW9DLDREQUE0RCxnQkFBZ0IsZUFBZSw0Q0FBNEMsZ0JBQWdCLCtCQUErQixvRkFBb0YsdUJBQXVCLHNNQUFzTSxHQUFHLDhXQUE4VywrWEFBK1gsMkRBQTJELHNMQUFzTCxnQ0FBZ0Msb0JBQW9CLCtCQUErQixvS0FBb0ssb0RBQW9ELGNBQWMsZ0JBQWdCLFlBQVksRUFBRSxpSkFBaUosc0JBQXNCLGFBQWEsc0dBQXNHLHFCQUFxQixrREFBa0QsU0FBUyxFQUFFLGdCQUFnQixNQUFNLGtFQUFrRSxpREFBaUQsU0FBUywyQkFBMkIsaUVBQWlFLE9BQU8sNkJBQTZCLHFEQUFxRCxpQkFBaUIsSUFBSSxrQkFBa0IsMkJBQTJCLGdCQUFnQixxQkFBcUIsSUFBSSxtQkFBbUIseUNBQXlDLElBQUksa0NBQWtDLFVBQVUsSUFBSSw2QkFBNkIsWUFBWSxJQUFJLGtCQUFrQiwyQkFBMkIsOEJBQThCLHVCQUF1QixvSUFBb0ksZUFBZSxHQUFHLHNCQUFzQixhQUFhLDhCQUE4QixJQUFJLG9DQUFvQyxTQUFTLEtBQUssSUFBSSxrREFBa0QsU0FBUyxLQUFLLDhCQUE4QixNQUFNLHdEQUF3RCxnQkFBZ0Isb0dBQW9HLGlCQUFpQixJQUFJLGlDQUFpQyxTQUFTLHlDQUF5Qyw2QkFBNkIsUUFBUSxJQUFJLDJKQUEySiwwQkFBMEIsSUFBSSw2UUFBNlEsU0FBUyw2QkFBNkIscUJBQXFCLDZCQUE2Qiw4Q0FBOEMsSUFBSSx5QkFBeUIsU0FBUyw0QkFBNEIsMkNBQTJDLFVBQVUsSUFBSSw0QkFBNEIsdUNBQXVDLEtBQUssMkJBQTJCLFNBQVMsc0JBQXNCLHlGQUF5RixjQUFjLDRCQUE0QixNQUFNLGlEQUFpRCxzQkFBc0IsS0FBSyxzQ0FBc0MsRUFBRSxjQUFjLHNCQUFzQixhQUFhLDRCQUE0Qix5Q0FBeUMsTUFBTSxFQUFFLHFCQUFxQix5QkFBeUIsRUFBRSxrQkFBa0Isa0JBQWtCLEdBQUcsc0JBQXNCLGFBQWEsV0FBVywrWEFBK1gsR0FBRyxzQkFBc0IsYUFBYSxpQkFBaUIsbUJBQW1CLE1BQU0sS0FBSyxJQUFJLFlBQVksSUFBSSxpQ0FBaUMsT0FBTyxTQUFTLEdBQUcsNEJBQTRCLGNBQWMsTUFBTSxZQUFZLElBQUksNEJBQTRCLFlBQVksR0FBRyxzQkFBc0IsYUFBYSw4TUFBOE0sZ0JBQWdCLG9CQUFvQixjQUFjLHVCQUF1QixjQUFjLG1CQUFtQixPQUFPLFFBQVEsY0FBYywwQkFBMEIsaU5BQWlOLGdCQUFnQixxSEFBcUgsZ0JBQWdCLDZCQUE2QixnQkFBZ0Isc0VBQXNFLGdCQUFnQiw2TEFBNkwsb0VBQW9FLEdBQUcsK0RBQStELFNBQVMsSUFBSSxtSkFBbUosd0JBQXdCLGtDQUFrQyxzQkFBc0IsNEJBQTRCLG9DQUFvQyxjQUFjLG1DQUFtQyxHQUFHLCtEQUErRCx3R0FBd0csdUNBQXVDLEVBQUUsVUFBVSx1Q0FBdUMsRUFBRSxLQUFLLDZCQUE2QixzWkFBc1osc0tBQXNLLEdBQUcsMENBQTBDLGdCQUFnQixhQUFhLEVBQUUsa0JBQWtCLHNDQUFzQyx5QkFBeUIsOFhBQThYLHFCQUFxQiwrS0FBK0ssRUFBRSxhQUFhLGlKQUFpSix3RUFBd0UsOENBQThDLHNJQUFzSSxnQkFBZ0IsZUFBZSxFQUFFLGtCQUFrQixzQ0FBc0MseUJBQXlCLHllQUF5ZSx3SUFBd0ksb0xBQW9MLEVBQUUsa0dBQWtHLDJCQUEyQixpSEFBaUgsb0RBQW9ELHlOQUF5TixzQkFBc0IsbUZBQW1GLGFBQWEsOG5DQUE4bkMsY0FBYyxNQUFNLDZNQUE2TSxjQUFjLFdBQVcsMEJBQTBCLDZTQUE2UyxZQUFZLHdCQUF3QixlQUFlLFFBQVEsOEdBQThHLGFBQWEsWUFBWSx1ZUFBdWUsK0JBQStCLFlBQVksc0RBQXNELEVBQUUsbUJBQW1CLHdDQUF3Qyx5QkFBeUIsc0NBQXNDLHNCQUFzQixrSEFBa0gsaUZBQWlGLG9IQUFvSCwwTkFBME4sdUJBQXVCLHlGQUF5Riw0REFBNEQseUJBQXlCLFlBQVksNENBQTRDLHlHQUF5RyxtckJBQW1yQixLQUFLLDJCQUEyQixxTEFBcUwsb0NBQW9DLGdCQUFnQiwwTUFBME0sZ0RBQWdELDBJQUEwSSxpQkFBaUIsbUNBQW1DLFlBQVksR0FBRyxtS0FBbUssSUFBSSxNQUFNLG9GQUFvRixhQUFhLDhHQUE4RyxpQkFBaUIsc0NBQXNDLFlBQVksR0FBRyxtS0FBbUssSUFBSSxNQUFNLDBGQUEwRixhQUFhLG1HQUFtRyxrQkFBa0IsaU1BQWlNLGlEQUFpRCx5REFBeUQsaURBQWlELDJEQUEyRCxtQ0FBbUMsV0FBVyxFQUFFLDRDQUE0QyxrQkFBa0IsTUFBTSxrSUFBa0ksMEdBQTBHLG1DQUFtQyw0QkFBNEIsRUFBRSxtQkFBbUIsdUNBQXVDLHlCQUF5QiwwR0FBMEcsZUFBZSxJQUFJLDJHQUEyRyxnRkFBZ0YsbVBBQW1QLDBHQUEwRywyQkFBMkIseUZBQXlGLG1NQUFtTSw2U0FBNlMsMEJBQTBCLE1BQU0sa0lBQWtJLHNDQUFzQywrQkFBK0IseUJBQXlCLHVFQUF1RSxnUkFBZ1IsZUFBZSxFQUFFLHFDQUFxQyx5SEFBeUgsRUFBRSxrQ0FBa0MsOExBQThMLG9EQUFvRCxFQUFFLDhFQUE4RSxzQkFBc0IsYUFBYSxxQkFBcUIsd0lBQXdJLEdBQUcsc0JBQXNCLGFBQWEsd0JBQXdCLHNEQUFzRCx5UEFBeVAsS0FBSyxxREFBcUQsUUFBUSxFQUFFLHdEQUF3RCxLQUFLLFlBQVksY0FBYyw0QkFBNEIsV0FBVyxTQUFTLFVBQVUsUUFBUSw4Q0FBOEMsUUFBUSw2SEFBNkgsUUFBUSxFQUFFLDRDQUE0QyxjQUFjLDRCQUE0QixXQUFXLHdDQUF3QyxRQUFRLHdGQUF3RixnREFBZ0QsUUFBUSwwQkFBMEIsc0JBQXNCLGdEQUFnRCxRQUFRLGtCQUFrQixlQUFlLFNBQVMsa0JBQWtCLEVBQUUsV0FBVyxhQUFhLHNCQUFzQixTQUFTLGtCQUFrQixFQUFFLFlBQVksV0FBVyxrQkFBa0IsRUFBRSxZQUFZLG9CQUFvQixTQUFTLGtCQUFrQixFQUFFLFVBQVUsS0FBSyxJQUFJLGdEQUFnRCx3Q0FBd0MsS0FBSyxVQUFVLG1EQUFtRCxFQUFFLHdDQUF3QyxPQUFPLE9BQU8sZ0JBQWdCLHlJQUF5SSxHQUFHLHNCQUFzQixhQUFhLCtIQUErSCxjQUFjLDhEQUE4RCxhQUFhLCtmQUErZixjQUFjLE1BQU0sMFFBQTBRLGNBQWMsTUFBTSxtRUFBbUUsZ0JBQWdCLFFBQVEsbUtBQW1LLGdCQUFnQixRQUFRLDhFQUE4RSxhQUFhLGNBQWMsTUFBTSxNQUFNLDZDQUE2QyxNQUFNLGVBQWUsS0FBSyxNQUFNLGVBQWUsS0FBSyxNQUFNLGVBQWUsS0FBSyxNQUFNLGVBQWUsaUNBQWlDLE9BQU8sTUFBTSxLQUFLLGVBQWUsNEJBQTRCLE9BQU8sT0FBTyxrREFBa0Qsb0JBQW9CLGdCQUFnQixrWUFBa1ksa0ZBQWtGLGVBQWUsMENBQTBDLDJIQUEySCw4REFBOEQsMElBQTBJLFFBQVEsZ0JBQWdCLHNCQUFzQixVQUFVLE1BQU0sS0FBSyxLQUFLLEVBQUUsaUJBQWlCLHNCQUFzQix3QkFBd0IsMEVBQTBFLE1BQU0sNkVBQTZFLHlDQUF5QyxNQUFNLGNBQWMsNkNBQTZDLE1BQU0sZ0RBQWdELG1CQUFtQixzQ0FBc0MsTUFBTSx1REFBdUQsTUFBTSxZQUFZLEtBQUssRUFBRSxpQkFBaUIsc0JBQXNCLCtCQUErQiw2Q0FBNkMsTUFBTSxrQkFBa0IsMkNBQTJDLE1BQU0sOEdBQThHLFlBQVksS0FBSyxFQUFFLGlCQUFpQixzQkFBc0IseUlBQXlJLFlBQVksS0FBSyxFQUFFLGlCQUFpQixzQkFBc0IsOEhBQThILHdCQUF3QixLQUFLLEtBQUssRUFBRSxpQkFBaUIsc0JBQXNCLGdIQUFnSCxpQ0FBaUMsU0FBUyxvUUFBb1Esb0JBQW9CLHdCQUF3QixpQkFBaUIsUUFBUSxtRkFBbUYsRUFBRSwrREFBK0QsZ0NBQWdDLG9CQUFvQix3QkFBd0IsaUJBQWlCLFFBQVEsc0ZBQXNGLEVBQUUsK0RBQStELG1DQUFtQyxTQUFTLHVCQUF1QixLQUFLLEtBQUssRUFBRSxpQkFBaUIsc0JBQXNCLHdCQUF3QixzQ0FBc0MsTUFBTSxNQUFNLDhFQUE4RSxNQUFNLGFBQWEsS0FBSyxFQUFFLGlCQUFpQixzQkFBc0IscUNBQXFDLHlHQUF5Ryw0QkFBNEIsZ0NBQWdDLG1CQUFtQiwwQkFBMEIsTUFBTSxLQUFLLElBQUksRUFBRSxpQkFBaUIsc0JBQXNCLG1DQUFtQyxpQkFBaUIsTUFBTSxxQ0FBcUMsWUFBWSxRQUFRLGlCQUFpQixNQUFNLDRDQUE0QyxZQUFZLE1BQU0sNEJBQTRCLEtBQUssRUFBRSxpQkFBaUIsc0JBQXNCLDhCQUE4QiwrQ0FBK0MsTUFBTSxrREFBa0Qsa0JBQWtCLHVCQUF1Qix1Q0FBdUMsc0RBQXNELE1BQU0sVUFBVSxNQUFNLGFBQWEsS0FBSyxFQUFFLGlCQUFpQixzQkFBc0IsbUhBQW1ILHNEQUFzRCxNQUFNLG1CQUFtQixhQUFhLGVBQWUsRUFBRSxLQUFLLElBQUksRUFBRSxpQkFBaUIsc0JBQXNCLG9DQUFvQyxLQUFLLFVBQVUsdUJBQXVCLHFDQUFxQyxlQUFlLDZEQUE2RCwyQ0FBMkMsTUFBTSxtQkFBbUIsYUFBYSxzQkFBc0IsRUFBRSxLQUFLLHdFQUF3RSxFQUFFLGlCQUFpQixzQkFBc0IsdUNBQXVDLEtBQUssV0FBVyxVQUFVLElBQUksRUFBRSxpQkFBaUIsc0JBQXNCLDJCQUEyQiw0Q0FBNEMsTUFBTSx5Q0FBeUMsZ0JBQWdCLFVBQVUsSUFBSSxFQUFFLGlCQUFpQixzQkFBc0Isc0NBQXNDLEtBQUssVUFBVSxJQUFJLEVBQUUsaUJBQWlCLHNCQUFzQix5Q0FBeUMsNEJBQTRCLDRDQUE0QyxNQUFNLEtBQUssSUFBSSxxQkFBcUIscUJBQXFCLG9CQUFvQix1REFBdUQsTUFBTSxrQkFBa0IsZUFBZSxpRUFBaUUsOENBQThDLE1BQU0sd0NBQXdDLGdCQUFnQix5RUFBeUUsd0NBQXdDLE1BQU0sMkJBQTJCLGtCQUFrQix5QkFBeUIsaU1BQWlNLE1BQU0sYUFBYSx3RUFBd0UsRUFBRSxpQkFBaUIsc0JBQXNCLGtCQUFrQixnQkFBZ0IsNkVBQTZFLEVBQUUsaUJBQWlCLHNCQUFzQixzQkFBc0IsMkNBQTJDLFVBQVUsTUFBTSxTQUFTLG9CQUFvQixNQUFNLFNBQVMsOENBQThDLE1BQU0sdUJBQXVCLG9CQUFvQixjQUFjLElBQUksRUFBRSxpQkFBaUIsc0JBQXNCLG1FQUFtRSx5QkFBeUIsYUFBYSwwRUFBMEUsRUFBRSxpQkFBaUIsc0JBQXNCLGVBQWUsZ0JBQWdCLDhFQUE4RSxFQUFFLGlCQUFpQixzQkFBc0Isc0JBQXNCLCtCQUErQix3Q0FBd0MsTUFBTSxrQ0FBa0Msb0JBQW9CLGNBQWMsSUFBSSxFQUFFLGlCQUFpQixzQkFBc0IsbUVBQW1FLG9CQUFvQixnREFBZ0QsTUFBTSxVQUFVLHlCQUF5QixxQkFBcUIsbUNBQW1DLGdEQUFnRCxNQUFNLGlGQUFpRixpQ0FBaUMsZ0NBQWdDLGtCQUFrQixFQUFFLDBCQUEwQixNQUFNLHlCQUF5Qiw4QkFBOEIsTUFBTSxtQkFBbUIsS0FBSyxLQUFLLEVBQUUsaUJBQWlCLHNCQUFzQixxSUFBcUksdUNBQXVDLE1BQU0sTUFBTSxVQUFVLDRCQUE0QixLQUFLLEtBQUssRUFBRSxpQkFBaUIsc0JBQXNCLDZCQUE2Qix5Q0FBeUMsTUFBTSxNQUFNLFVBQVUsWUFBWSxRQUFRLGFBQWEsUUFBUSxpQkFBaUIseUJBQXlCLDhkQUE4ZCwwQkFBMEIseUJBQXlCLGNBQWMsZ0RBQWdELGtDQUFrQyxNQUFNLHFFQUFxRSxzQ0FBc0MsaUJBQWlCLHdJQUF3SSxvREFBb0QsRUFBRSxnRkFBZ0Ysc0JBQXNCLGFBQWEsc2JBQXNiLG9DQUFvQyxpSUFBaUksUUFBUSxNQUFNLFdBQVcsUUFBUSxJQUFJLGdCQUFnQixhQUFhLGVBQWUsS0FBSyxzRUFBc0UsUUFBUSxjQUFjLEtBQUsscUJBQXFCLE1BQU0sa0NBQWtDLGdDQUFnQyxlQUFlLEtBQUsscUJBQXFCLFFBQVEsSUFBSSxtQ0FBbUMsK0lBQStJLE1BQU0sRUFBRSx3RkFBd0YseUNBQXlDLEVBQUUsYUFBYSxJQUFJLE9BQU8sMENBQTBDLGVBQWUsWUFBWSxtQkFBbUIsbUNBQW1DLHlCQUF5QixXQUFXLCtDQUErQyw0QkFBNEIsb0RBQW9ELEVBQUUscUJBQXFCLHNCQUFzQixhQUFhLFdBQVcsNEtBQTRLLEdBQUcsc0JBQXNCLGFBQWEsbUNBQW1DLGNBQWMsbUJBQW1CLE9BQU8sUUFBUSx3VUFBd1UsS0FBSyxxQkFBcUIsS0FBSyxxQkFBcUIsS0FBSyxxQkFBcUIsS0FBSyxtQkFBbUIsS0FBSyx5QkFBeUIsc0JBQXNCLGlIQUFpSCxnQkFBZ0IsaURBQWlELGNBQWMsaUNBQWlDLGdCQUFnQixzRUFBc0Usa0JBQWtCLG9KQUFvSixrQkFBa0IscUJBQXFCLGdCQUFnQixZQUFZLDBCQUEwQixFQUFFLGFBQWEsa0JBQWtCLDZCQUE2QixRQUFRLEtBQUssdUJBQXVCLFFBQVEsS0FBSyxLQUFLLGVBQWUsNkJBQTZCLGNBQWMsTUFBTSxRQUFRLElBQUksdUJBQXVCLFFBQVEsSUFBSSx1QkFBdUIsUUFBUSxJQUFJLHFCQUFxQixtRUFBbUUsY0FBYyx1R0FBdUcsb0JBQW9CLGdCQUFnQiwwQ0FBMEMsa0JBQWtCLDJCQUEyQixpR0FBaUcsK0JBQStCLFlBQVksa0JBQWtCLGdCQUFnQix1QkFBdUIsd05BQXdOLEVBQUUsU0FBUyxnQkFBZ0Isa0dBQWtHLGtDQUFrQyxJQUFJLGtFQUFrRSxLQUFLLGFBQWEsZ0dBQWdHLGlDQUFpQyxLQUFLLGFBQWEsUUFBUSx3UEFBd1AsRUFBRSw2Q0FBNkMsMktBQTJLLFFBQVEsS0FBSyxvQkFBb0IsK0NBQStDLElBQUksd0tBQXdLLFVBQVUsR0FBRyxVQUFVLGtCQUFrQixLQUFLLHdEQUF3RCxXQUFXLFFBQVEsTUFBTSx3QkFBd0IsTUFBTSxxRkFBcUYsd0JBQXdCLGtCQUFrQixnQ0FBZ0MsOENBQThDLEtBQUssc01BQXNNLGtCQUFrQixnQ0FBZ0MsMkJBQTJCLEtBQUssMkNBQTJDLFlBQVksd0JBQXdCLEVBQUUsMElBQTBJLGlEQUFpRCxLQUFLLFNBQVMsb0JBQW9CLHdDQUF3Qyx1RkFBdUYsV0FBVyx1QkFBdUIsZUFBZSwrQkFBK0IsVUFBVSxNQUFNLG1CQUFtQixVQUFVLGFBQWEsbUJBQW1CLEtBQUssbUJBQW1CLFVBQVUsYUFBYSxVQUFVLElBQUksc0JBQXNCLFlBQVksaUJBQWlCLFFBQVEsS0FBSyxXQUFXLFFBQVEsT0FBTyx1QkFBdUIsS0FBSyxPQUFPLHVCQUF1QixLQUFLLE9BQU8sdUJBQXVCLEtBQUssT0FBTyx1QkFBdUIsbUJBQW1CLElBQUksNkJBQTZCLHNFQUFzRSwrSEFBK0gsMERBQTBELFlBQVksK0RBQStELG1CQUFtQixRQUFRLE1BQU0saURBQWlELDBFQUEwRSxTQUFTLElBQUkscUNBQXFDLFNBQVMsK0NBQStDLE1BQU0sK0ZBQStGLDhCQUE4QixLQUFLLGtDQUFrQyxvTEFBb0wsTUFBTSwyQ0FBMkMsSUFBSSwrQkFBK0IsMENBQTBDLDJGQUEyRiw2QkFBNkIsZ1JBQWdSLHlCQUF5Qiw4QkFBOEIsNElBQTRJLEtBQUssRUFBRSxxQkFBcUIsc0JBQXNCLGFBQWEscUJBQXFCLDZMQUE2TCxHQUFHLHNCQUFzQixhQUFhLGtFQUFrRSxnQ0FBZ0MsMENBQTBDLEdBQUcsRUFBRSxHQUFHLFdBQVcsRTs7Ozs7Ozs7Ozs7O0FDWjdzNkY7QUFDQSxDQUFDOztBQUVEO0FBQ0EsbUJBQW1CLEtBQTBCO0FBQzdDO0FBQ0Esa0JBQWtCLEtBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZLFNBQVM7QUFDckI7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksU0FBUztBQUNyQjtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxLQUFLO0FBQ0wsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQ0FBbUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCOztBQUV4Qix5Q0FBeUMscUJBQXFCOztBQUU5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9CQUFvQjs7QUFFdEQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixpQkFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxjQUFjLGlCQUFpQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixvQkFBb0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFFVTtBQUNaO0FBQ0EsRUFBRSxtQ0FBbUI7QUFDckI7QUFDQSxHQUFHO0FBQUEsb0dBQUM7QUFDSixFQUFFLE1BQU0sRUFhTjs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcGhCRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEZhOztBQUViLGlDQUFpQyxtQkFBTyxDQUFDLDBEQUFVO0FBQ25ELHFDQUFxQyxtQkFBTyxDQUFDLDBEQUFVOzs7Ozs7Ozs7Ozs7QUNIdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUM3QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG9CQUFvQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDbkNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50c1wiKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKiFcblxuSlNaaXAgdjMuMy4wIC0gQSBKYXZhU2NyaXB0IGNsYXNzIGZvciBnZW5lcmF0aW5nIGFuZCByZWFkaW5nIHppcCBmaWxlc1xuPGh0dHA6Ly9zdHVhcnRrLmNvbS9qc3ppcD5cblxuKGMpIDIwMDktMjAxNiBTdHVhcnQgS25pZ2h0bGV5IDxzdHVhcnQgW2F0XSBzdHVhcnRrLmNvbT5cbkR1YWwgbGljZW5jZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIG9yIEdQTHYzLiBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9TdHVrL2pzemlwL21hc3Rlci9MSUNFTlNFLm1hcmtkb3duLlxuXG5KU1ppcCB1c2VzIHRoZSBsaWJyYXJ5IHBha28gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIDpcbmh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvcGFrby9ibG9iL21hc3Rlci9MSUNFTlNFXG4qL1xuXG4hZnVuY3Rpb24odCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9dCgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSx0KTtlbHNleyhcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPXQoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIHMoYSxvLGgpe2Z1bmN0aW9uIHUocix0KXtpZighb1tyXSl7aWYoIWFbcl0pe3ZhciBlPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIXQmJmUpcmV0dXJuIGUociwhMCk7aWYobClyZXR1cm4gbChyLCEwKTt2YXIgaT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3IrXCInXCIpO3Rocm93IGkuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixpfXZhciBuPW9bcl09e2V4cG9ydHM6e319O2Fbcl1bMF0uY2FsbChuLmV4cG9ydHMsZnVuY3Rpb24odCl7dmFyIGU9YVtyXVsxXVt0XTtyZXR1cm4gdShlfHx0KX0sbixuLmV4cG9ydHMscyxhLG8saCl9cmV0dXJuIG9bcl0uZXhwb3J0c31mb3IodmFyIGw9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSx0PTA7dDxoLmxlbmd0aDt0KyspdShoW3RdKTtyZXR1cm4gdX0oezE6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgYz10KFwiLi91dGlsc1wiKSxkPXQoXCIuL3N1cHBvcnRcIikscD1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7ci5lbmNvZGU9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLHIsaSxuLHMsYSxvLGg9W10sdT0wLGw9dC5sZW5ndGgsZj1sLGQ9XCJzdHJpbmdcIiE9PWMuZ2V0VHlwZU9mKHQpO3U8dC5sZW5ndGg7KWY9bC11LGk9ZD8oZT10W3UrK10scj11PGw/dFt1KytdOjAsdTxsP3RbdSsrXTowKTooZT10LmNoYXJDb2RlQXQodSsrKSxyPXU8bD90LmNoYXJDb2RlQXQodSsrKTowLHU8bD90LmNoYXJDb2RlQXQodSsrKTowKSxuPWU+PjIscz0oMyZlKTw8NHxyPj40LGE9MTxmPygxNSZyKTw8MnxpPj42OjY0LG89MjxmPzYzJmk6NjQsaC5wdXNoKHAuY2hhckF0KG4pK3AuY2hhckF0KHMpK3AuY2hhckF0KGEpK3AuY2hhckF0KG8pKTtyZXR1cm4gaC5qb2luKFwiXCIpfSxyLmRlY29kZT1mdW5jdGlvbih0KXt2YXIgZSxyLGksbixzLGEsbz0wLGg9MCx1PVwiZGF0YTpcIjtpZih0LnN1YnN0cigwLHUubGVuZ3RoKT09PXUpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGl0IGxvb2tzIGxpa2UgYSBkYXRhIHVybC5cIik7dmFyIGwsZj0zKih0PXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csXCJcIikpLmxlbmd0aC80O2lmKHQuY2hhckF0KHQubGVuZ3RoLTEpPT09cC5jaGFyQXQoNjQpJiZmLS0sdC5jaGFyQXQodC5sZW5ndGgtMik9PT1wLmNoYXJBdCg2NCkmJmYtLSxmJTEhPTApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGJhZCBjb250ZW50IGxlbmd0aC5cIik7Zm9yKGw9ZC51aW50OGFycmF5P25ldyBVaW50OEFycmF5KDB8Zik6bmV3IEFycmF5KDB8Zik7bzx0Lmxlbmd0aDspZT1wLmluZGV4T2YodC5jaGFyQXQobysrKSk8PDJ8KG49cC5pbmRleE9mKHQuY2hhckF0KG8rKykpKT4+NCxyPSgxNSZuKTw8NHwocz1wLmluZGV4T2YodC5jaGFyQXQobysrKSkpPj4yLGk9KDMmcyk8PDZ8KGE9cC5pbmRleE9mKHQuY2hhckF0KG8rKykpKSxsW2grK109ZSw2NCE9PXMmJihsW2grK109ciksNjQhPT1hJiYobFtoKytdPWkpO3JldHVybiBsfX0se1wiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzJ9XSwyOltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9dChcIi4vZXh0ZXJuYWxcIiksbj10KFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiKSxzPXQoXCIuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmVcIiksYT10KFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiKTtzPXQoXCIuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmVcIik7ZnVuY3Rpb24gbyh0LGUscixpLG4pe3RoaXMuY29tcHJlc3NlZFNpemU9dCx0aGlzLnVuY29tcHJlc3NlZFNpemU9ZSx0aGlzLmNyYzMyPXIsdGhpcy5jb21wcmVzc2lvbj1pLHRoaXMuY29tcHJlc3NlZENvbnRlbnQ9bn1vLnByb3RvdHlwZT17Z2V0Q29udGVudFdvcmtlcjpmdW5jdGlvbigpe3ZhciB0PW5ldyBuKGkuUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29tcHJlc3NlZENvbnRlbnQpKS5waXBlKHRoaXMuY29tcHJlc3Npb24udW5jb21wcmVzc1dvcmtlcigpKS5waXBlKG5ldyBzKFwiZGF0YV9sZW5ndGhcIikpLGU9dGhpcztyZXR1cm4gdC5vbihcImVuZFwiLGZ1bmN0aW9uKCl7aWYodGhpcy5zdHJlYW1JbmZvLmRhdGFfbGVuZ3RoIT09ZS51bmNvbXByZXNzZWRTaXplKXRocm93IG5ldyBFcnJvcihcIkJ1ZyA6IHVuY29tcHJlc3NlZCBkYXRhIHNpemUgbWlzbWF0Y2hcIil9KSx0fSxnZXRDb21wcmVzc2VkV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKGkuUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29tcHJlc3NlZENvbnRlbnQpKS53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzZWRTaXplXCIsdGhpcy5jb21wcmVzc2VkU2l6ZSkud2l0aFN0cmVhbUluZm8oXCJ1bmNvbXByZXNzZWRTaXplXCIsdGhpcy51bmNvbXByZXNzZWRTaXplKS53aXRoU3RyZWFtSW5mbyhcImNyYzMyXCIsdGhpcy5jcmMzMikud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2lvblwiLHRoaXMuY29tcHJlc3Npb24pfX0sby5jcmVhdGVXb3JrZXJGcm9tPWZ1bmN0aW9uKHQsZSxyKXtyZXR1cm4gdC5waXBlKG5ldyBhKS5waXBlKG5ldyBzKFwidW5jb21wcmVzc2VkU2l6ZVwiKSkucGlwZShlLmNvbXByZXNzV29ya2VyKHIpKS5waXBlKG5ldyBzKFwiY29tcHJlc3NlZFNpemVcIikpLndpdGhTdHJlYW1JbmZvKFwiY29tcHJlc3Npb25cIixlKX0sZS5leHBvcnRzPW99LHtcIi4vZXh0ZXJuYWxcIjo2LFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiOjI1LFwiLi9zdHJlYW0vRGF0YUxlbmd0aFByb2JlXCI6MjYsXCIuL3N0cmVhbS9EYXRhV29ya2VyXCI6Mjd9XSwzOltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9dChcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIik7ci5TVE9SRT17bWFnaWM6XCJcXDBcXDBcIixjb21wcmVzc1dvcmtlcjpmdW5jdGlvbih0KXtyZXR1cm4gbmV3IGkoXCJTVE9SRSBjb21wcmVzc2lvblwiKX0sdW5jb21wcmVzc1dvcmtlcjpmdW5jdGlvbigpe3JldHVybiBuZXcgaShcIlNUT1JFIGRlY29tcHJlc3Npb25cIil9fSxyLkRFRkxBVEU9dChcIi4vZmxhdGVcIil9LHtcIi4vZmxhdGVcIjo3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4fV0sNDpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuL3V0aWxzXCIpO3ZhciBvPWZ1bmN0aW9uKCl7Zm9yKHZhciB0LGU9W10scj0wO3I8MjU2O3IrKyl7dD1yO2Zvcih2YXIgaT0wO2k8ODtpKyspdD0xJnQ/Mzk4ODI5MjM4NF50Pj4+MTp0Pj4+MTtlW3JdPXR9cmV0dXJuIGV9KCk7ZS5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHZvaWQgMCE9PXQmJnQubGVuZ3RoP1wic3RyaW5nXCIhPT1pLmdldFR5cGVPZih0KT9mdW5jdGlvbih0LGUscixpKXt2YXIgbj1vLHM9aStyO3RePS0xO2Zvcih2YXIgYT1pO2E8czthKyspdD10Pj4+OF5uWzI1NSYodF5lW2FdKV07cmV0dXJuLTFedH0oMHxlLHQsdC5sZW5ndGgsMCk6ZnVuY3Rpb24odCxlLHIsaSl7dmFyIG49byxzPWkrcjt0Xj0tMTtmb3IodmFyIGE9aTthPHM7YSsrKXQ9dD4+PjheblsyNTUmKHReZS5jaGFyQ29kZUF0KGEpKV07cmV0dXJuLTFedH0oMHxlLHQsdC5sZW5ndGgsMCk6MH19LHtcIi4vdXRpbHNcIjozMn1dLDU6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjtyLmJhc2U2ND0hMSxyLmJpbmFyeT0hMSxyLmRpcj0hMSxyLmNyZWF0ZUZvbGRlcnM9ITAsci5kYXRlPW51bGwsci5jb21wcmVzc2lvbj1udWxsLHIuY29tcHJlc3Npb25PcHRpb25zPW51bGwsci5jb21tZW50PW51bGwsci51bml4UGVybWlzc2lvbnM9bnVsbCxyLmRvc1Blcm1pc3Npb25zPW51bGx9LHt9XSw2OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9bnVsbDtpPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBQcm9taXNlP1Byb21pc2U6dChcImxpZVwiKSxlLmV4cG9ydHM9e1Byb21pc2U6aX19LHtsaWU6Mzd9XSw3OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50MTZBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQzMkFycmF5LG49dChcInBha29cIikscz10KFwiLi91dGlsc1wiKSxhPXQoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLG89aT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCI7ZnVuY3Rpb24gaCh0LGUpe2EuY2FsbCh0aGlzLFwiRmxhdGVXb3JrZXIvXCIrdCksdGhpcy5fcGFrbz1udWxsLHRoaXMuX3Bha29BY3Rpb249dCx0aGlzLl9wYWtvT3B0aW9ucz1lLHRoaXMubWV0YT17fX1yLm1hZ2ljPVwiXFxiXFwwXCIscy5pbmhlcml0cyhoLGEpLGgucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbih0KXt0aGlzLm1ldGE9dC5tZXRhLG51bGw9PT10aGlzLl9wYWtvJiZ0aGlzLl9jcmVhdGVQYWtvKCksdGhpcy5fcGFrby5wdXNoKHMudHJhbnNmb3JtVG8obyx0LmRhdGEpLCExKX0saC5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXthLnByb3RvdHlwZS5mbHVzaC5jYWxsKHRoaXMpLG51bGw9PT10aGlzLl9wYWtvJiZ0aGlzLl9jcmVhdGVQYWtvKCksdGhpcy5fcGFrby5wdXNoKFtdLCEwKX0saC5wcm90b3R5cGUuY2xlYW5VcD1mdW5jdGlvbigpe2EucHJvdG90eXBlLmNsZWFuVXAuY2FsbCh0aGlzKSx0aGlzLl9wYWtvPW51bGx9LGgucHJvdG90eXBlLl9jcmVhdGVQYWtvPWZ1bmN0aW9uKCl7dGhpcy5fcGFrbz1uZXcgblt0aGlzLl9wYWtvQWN0aW9uXSh7cmF3OiEwLGxldmVsOnRoaXMuX3Bha29PcHRpb25zLmxldmVsfHwtMX0pO3ZhciBlPXRoaXM7dGhpcy5fcGFrby5vbkRhdGE9ZnVuY3Rpb24odCl7ZS5wdXNoKHtkYXRhOnQsbWV0YTplLm1ldGF9KX19LHIuY29tcHJlc3NXb3JrZXI9ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBoKFwiRGVmbGF0ZVwiLHQpfSxyLnVuY29tcHJlc3NXb3JrZXI9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGgoXCJJbmZsYXRlXCIse30pfX0se1wiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi91dGlsc1wiOjMyLHBha286Mzh9XSw4OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gQSh0LGUpe3ZhciByLGk9XCJcIjtmb3Iocj0wO3I8ZTtyKyspaSs9U3RyaW5nLmZyb21DaGFyQ29kZSgyNTUmdCksdD4+Pj04O3JldHVybiBpfWZ1bmN0aW9uIGkodCxlLHIsaSxuLHMpe3ZhciBhLG8saD10LmZpbGUsdT10LmNvbXByZXNzaW9uLGw9cyE9PU8udXRmOGVuY29kZSxmPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixzKGgubmFtZSkpLGQ9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLE8udXRmOGVuY29kZShoLm5hbWUpKSxjPWguY29tbWVudCxwPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixzKGMpKSxtPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixPLnV0ZjhlbmNvZGUoYykpLF89ZC5sZW5ndGghPT1oLm5hbWUubGVuZ3RoLGc9bS5sZW5ndGghPT1jLmxlbmd0aCxiPVwiXCIsdj1cIlwiLHk9XCJcIix3PWguZGlyLGs9aC5kYXRlLHg9e2NyYzMyOjAsY29tcHJlc3NlZFNpemU6MCx1bmNvbXByZXNzZWRTaXplOjB9O2UmJiFyfHwoeC5jcmMzMj10LmNyYzMyLHguY29tcHJlc3NlZFNpemU9dC5jb21wcmVzc2VkU2l6ZSx4LnVuY29tcHJlc3NlZFNpemU9dC51bmNvbXByZXNzZWRTaXplKTt2YXIgUz0wO2UmJihTfD04KSxsfHwhXyYmIWd8fChTfD0yMDQ4KTt2YXIgej0wLEM9MDt3JiYoenw9MTYpLFwiVU5JWFwiPT09bj8oQz03OTgsenw9ZnVuY3Rpb24odCxlKXt2YXIgcj10O3JldHVybiB0fHwocj1lPzE2ODkzOjMzMjA0KSwoNjU1MzUmcik8PDE2fShoLnVuaXhQZXJtaXNzaW9ucyx3KSk6KEM9MjAsenw9ZnVuY3Rpb24odCl7cmV0dXJuIDYzJih0fHwwKX0oaC5kb3NQZXJtaXNzaW9ucykpLGE9ay5nZXRVVENIb3VycygpLGE8PD02LGF8PWsuZ2V0VVRDTWludXRlcygpLGE8PD01LGF8PWsuZ2V0VVRDU2Vjb25kcygpLzIsbz1rLmdldFVUQ0Z1bGxZZWFyKCktMTk4MCxvPDw9NCxvfD1rLmdldFVUQ01vbnRoKCkrMSxvPDw9NSxvfD1rLmdldFVUQ0RhdGUoKSxfJiYodj1BKDEsMSkrQShCKGYpLDQpK2QsYis9XCJ1cFwiK0Eodi5sZW5ndGgsMikrdiksZyYmKHk9QSgxLDEpK0EoQihwKSw0KSttLGIrPVwidWNcIitBKHkubGVuZ3RoLDIpK3kpO3ZhciBFPVwiXCI7cmV0dXJuIEUrPVwiXFxuXFwwXCIsRSs9QShTLDIpLEUrPXUubWFnaWMsRSs9QShhLDIpLEUrPUEobywyKSxFKz1BKHguY3JjMzIsNCksRSs9QSh4LmNvbXByZXNzZWRTaXplLDQpLEUrPUEoeC51bmNvbXByZXNzZWRTaXplLDQpLEUrPUEoZi5sZW5ndGgsMiksRSs9QShiLmxlbmd0aCwyKSx7ZmlsZVJlY29yZDpSLkxPQ0FMX0ZJTEVfSEVBREVSK0UrZitiLGRpclJlY29yZDpSLkNFTlRSQUxfRklMRV9IRUFERVIrQShDLDIpK0UrQShwLmxlbmd0aCwyKStcIlxcMFxcMFxcMFxcMFwiK0Eoeiw0KStBKGksNCkrZitiK3B9fXZhciBJPXQoXCIuLi91dGlsc1wiKSxuPXQoXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxPPXQoXCIuLi91dGY4XCIpLEI9dChcIi4uL2NyYzMyXCIpLFI9dChcIi4uL3NpZ25hdHVyZVwiKTtmdW5jdGlvbiBzKHQsZSxyLGkpe24uY2FsbCh0aGlzLFwiWmlwRmlsZVdvcmtlclwiKSx0aGlzLmJ5dGVzV3JpdHRlbj0wLHRoaXMuemlwQ29tbWVudD1lLHRoaXMuemlwUGxhdGZvcm09cix0aGlzLmVuY29kZUZpbGVOYW1lPWksdGhpcy5zdHJlYW1GaWxlcz10LHRoaXMuYWNjdW11bGF0ZT0hMSx0aGlzLmNvbnRlbnRCdWZmZXI9W10sdGhpcy5kaXJSZWNvcmRzPVtdLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldD0wLHRoaXMuZW50cmllc0NvdW50PTAsdGhpcy5jdXJyZW50RmlsZT1udWxsLHRoaXMuX3NvdXJjZXM9W119SS5pbmhlcml0cyhzLG4pLHMucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24odCl7dmFyIGU9dC5tZXRhLnBlcmNlbnR8fDAscj10aGlzLmVudHJpZXNDb3VudCxpPXRoaXMuX3NvdXJjZXMubGVuZ3RoO3RoaXMuYWNjdW11bGF0ZT90aGlzLmNvbnRlbnRCdWZmZXIucHVzaCh0KToodGhpcy5ieXRlc1dyaXR0ZW4rPXQuZGF0YS5sZW5ndGgsbi5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMse2RhdGE6dC5kYXRhLG1ldGE6e2N1cnJlbnRGaWxlOnRoaXMuY3VycmVudEZpbGUscGVyY2VudDpyPyhlKzEwMCooci1pLTEpKS9yOjEwMH19KSl9LHMucHJvdG90eXBlLm9wZW5lZFNvdXJjZT1mdW5jdGlvbih0KXt0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQ9dGhpcy5ieXRlc1dyaXR0ZW4sdGhpcy5jdXJyZW50RmlsZT10LmZpbGUubmFtZTt2YXIgZT10aGlzLnN0cmVhbUZpbGVzJiYhdC5maWxlLmRpcjtpZihlKXt2YXIgcj1pKHQsZSwhMSx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsdGhpcy56aXBQbGF0Zm9ybSx0aGlzLmVuY29kZUZpbGVOYW1lKTt0aGlzLnB1c2goe2RhdGE6ci5maWxlUmVjb3JkLG1ldGE6e3BlcmNlbnQ6MH19KX1lbHNlIHRoaXMuYWNjdW11bGF0ZT0hMH0scy5wcm90b3R5cGUuY2xvc2VkU291cmNlPWZ1bmN0aW9uKHQpe3RoaXMuYWNjdW11bGF0ZT0hMTt2YXIgZT10aGlzLnN0cmVhbUZpbGVzJiYhdC5maWxlLmRpcixyPWkodCxlLCEwLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCx0aGlzLnppcFBsYXRmb3JtLHRoaXMuZW5jb2RlRmlsZU5hbWUpO2lmKHRoaXMuZGlyUmVjb3Jkcy5wdXNoKHIuZGlyUmVjb3JkKSxlKXRoaXMucHVzaCh7ZGF0YTpmdW5jdGlvbih0KXtyZXR1cm4gUi5EQVRBX0RFU0NSSVBUT1IrQSh0LmNyYzMyLDQpK0EodC5jb21wcmVzc2VkU2l6ZSw0KStBKHQudW5jb21wcmVzc2VkU2l6ZSw0KX0odCksbWV0YTp7cGVyY2VudDoxMDB9fSk7ZWxzZSBmb3IodGhpcy5wdXNoKHtkYXRhOnIuZmlsZVJlY29yZCxtZXRhOntwZXJjZW50OjB9fSk7dGhpcy5jb250ZW50QnVmZmVyLmxlbmd0aDspdGhpcy5wdXNoKHRoaXMuY29udGVudEJ1ZmZlci5zaGlmdCgpKTt0aGlzLmN1cnJlbnRGaWxlPW51bGx9LHMucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMuYnl0ZXNXcml0dGVuLGU9MDtlPHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGg7ZSsrKXRoaXMucHVzaCh7ZGF0YTp0aGlzLmRpclJlY29yZHNbZV0sbWV0YTp7cGVyY2VudDoxMDB9fSk7dmFyIHI9dGhpcy5ieXRlc1dyaXR0ZW4tdCxpPWZ1bmN0aW9uKHQsZSxyLGksbil7dmFyIHM9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLG4oaSkpO3JldHVybiBSLkNFTlRSQUxfRElSRUNUT1JZX0VORCtcIlxcMFxcMFxcMFxcMFwiK0EodCwyKStBKHQsMikrQShlLDQpK0Eociw0KStBKHMubGVuZ3RoLDIpK3N9KHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGgscix0LHRoaXMuemlwQ29tbWVudCx0aGlzLmVuY29kZUZpbGVOYW1lKTt0aGlzLnB1c2goe2RhdGE6aSxtZXRhOntwZXJjZW50OjEwMH19KX0scy5wcm90b3R5cGUucHJlcGFyZU5leHRTb3VyY2U9ZnVuY3Rpb24oKXt0aGlzLnByZXZpb3VzPXRoaXMuX3NvdXJjZXMuc2hpZnQoKSx0aGlzLm9wZW5lZFNvdXJjZSh0aGlzLnByZXZpb3VzLnN0cmVhbUluZm8pLHRoaXMuaXNQYXVzZWQ/dGhpcy5wcmV2aW91cy5wYXVzZSgpOnRoaXMucHJldmlvdXMucmVzdW1lKCl9LHMucHJvdG90eXBlLnJlZ2lzdGVyUHJldmlvdXM9ZnVuY3Rpb24odCl7dGhpcy5fc291cmNlcy5wdXNoKHQpO3ZhciBlPXRoaXM7cmV0dXJuIHQub24oXCJkYXRhXCIsZnVuY3Rpb24odCl7ZS5wcm9jZXNzQ2h1bmsodCl9KSx0Lm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtlLmNsb3NlZFNvdXJjZShlLnByZXZpb3VzLnN0cmVhbUluZm8pLGUuX3NvdXJjZXMubGVuZ3RoP2UucHJlcGFyZU5leHRTb3VyY2UoKTplLmVuZCgpfSksdC5vbihcImVycm9yXCIsZnVuY3Rpb24odCl7ZS5lcnJvcih0KX0pLHRoaXN9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhbi5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJighdGhpcy5wcmV2aW91cyYmdGhpcy5fc291cmNlcy5sZW5ndGg/KHRoaXMucHJlcGFyZU5leHRTb3VyY2UoKSwhMCk6dGhpcy5wcmV2aW91c3x8dGhpcy5fc291cmNlcy5sZW5ndGh8fHRoaXMuZ2VuZXJhdGVkRXJyb3I/dm9pZCAwOih0aGlzLmVuZCgpLCEwKSl9LHMucHJvdG90eXBlLmVycm9yPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX3NvdXJjZXM7aWYoIW4ucHJvdG90eXBlLmVycm9yLmNhbGwodGhpcyx0KSlyZXR1cm4hMTtmb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrKyl0cnl7ZVtyXS5lcnJvcih0KX1jYXRjaCh0KXt9cmV0dXJuITB9LHMucHJvdG90eXBlLmxvY2s9ZnVuY3Rpb24oKXtuLnByb3RvdHlwZS5sb2NrLmNhbGwodGhpcyk7Zm9yKHZhciB0PXRoaXMuX3NvdXJjZXMsZT0wO2U8dC5sZW5ndGg7ZSsrKXRbZV0ubG9jaygpfSxlLmV4cG9ydHM9c30se1wiLi4vY3JjMzJcIjo0LFwiLi4vc2lnbmF0dXJlXCI6MjMsXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi4vdXRmOFwiOjMxLFwiLi4vdXRpbHNcIjozMn1dLDk6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgdT10KFwiLi4vY29tcHJlc3Npb25zXCIpLGk9dChcIi4vWmlwRmlsZVdvcmtlclwiKTtyLmdlbmVyYXRlV29ya2VyPWZ1bmN0aW9uKHQsYSxlKXt2YXIgbz1uZXcgaShhLnN0cmVhbUZpbGVzLGUsYS5wbGF0Zm9ybSxhLmVuY29kZUZpbGVOYW1lKSxoPTA7dHJ5e3QuZm9yRWFjaChmdW5jdGlvbih0LGUpe2grKzt2YXIgcj1mdW5jdGlvbih0LGUpe3ZhciByPXR8fGUsaT11W3JdO2lmKCFpKXRocm93IG5ldyBFcnJvcihyK1wiIGlzIG5vdCBhIHZhbGlkIGNvbXByZXNzaW9uIG1ldGhvZCAhXCIpO3JldHVybiBpfShlLm9wdGlvbnMuY29tcHJlc3Npb24sYS5jb21wcmVzc2lvbiksaT1lLm9wdGlvbnMuY29tcHJlc3Npb25PcHRpb25zfHxhLmNvbXByZXNzaW9uT3B0aW9uc3x8e30sbj1lLmRpcixzPWUuZGF0ZTtlLl9jb21wcmVzc1dvcmtlcihyLGkpLndpdGhTdHJlYW1JbmZvKFwiZmlsZVwiLHtuYW1lOnQsZGlyOm4sZGF0ZTpzLGNvbW1lbnQ6ZS5jb21tZW50fHxcIlwiLHVuaXhQZXJtaXNzaW9uczplLnVuaXhQZXJtaXNzaW9ucyxkb3NQZXJtaXNzaW9uczplLmRvc1Blcm1pc3Npb25zfSkucGlwZShvKX0pLG8uZW50cmllc0NvdW50PWh9Y2F0Y2godCl7by5lcnJvcih0KX1yZXR1cm4gb319LHtcIi4uL2NvbXByZXNzaW9uc1wiOjMsXCIuL1ppcEZpbGVXb3JrZXJcIjo4fV0sMTA6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKCl7aWYoISh0aGlzIGluc3RhbmNlb2YgaSkpcmV0dXJuIG5ldyBpO2lmKGFyZ3VtZW50cy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbnN0cnVjdG9yIHdpdGggcGFyYW1ldGVycyBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKTt0aGlzLmZpbGVzPXt9LHRoaXMuY29tbWVudD1udWxsLHRoaXMucm9vdD1cIlwiLHRoaXMuY2xvbmU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgaTtmb3IodmFyIGUgaW4gdGhpcylcImZ1bmN0aW9uXCIhPXR5cGVvZiB0aGlzW2VdJiYodFtlXT10aGlzW2VdKTtyZXR1cm4gdH19KGkucHJvdG90eXBlPXQoXCIuL29iamVjdFwiKSkubG9hZEFzeW5jPXQoXCIuL2xvYWRcIiksaS5zdXBwb3J0PXQoXCIuL3N1cHBvcnRcIiksaS5kZWZhdWx0cz10KFwiLi9kZWZhdWx0c1wiKSxpLnZlcnNpb249XCIzLjIuMFwiLGkubG9hZEFzeW5jPWZ1bmN0aW9uKHQsZSl7cmV0dXJuKG5ldyBpKS5sb2FkQXN5bmModCxlKX0saS5leHRlcm5hbD10KFwiLi9leHRlcm5hbFwiKSxlLmV4cG9ydHM9aX0se1wiLi9kZWZhdWx0c1wiOjUsXCIuL2V4dGVybmFsXCI6NixcIi4vbG9hZFwiOjExLFwiLi9vYmplY3RcIjoxNSxcIi4vc3VwcG9ydFwiOjMwfV0sMTE6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT10KFwiLi91dGlsc1wiKSxuPXQoXCIuL2V4dGVybmFsXCIpLG89dChcIi4vdXRmOFwiKSxoPShpPXQoXCIuL3V0aWxzXCIpLHQoXCIuL3ppcEVudHJpZXNcIikpLHM9dChcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIiksdT10KFwiLi9ub2RlanNVdGlsc1wiKTtmdW5jdGlvbiBsKGkpe3JldHVybiBuZXcgbi5Qcm9taXNlKGZ1bmN0aW9uKHQsZSl7dmFyIHI9aS5kZWNvbXByZXNzZWQuZ2V0Q29udGVudFdvcmtlcigpLnBpcGUobmV3IHMpO3Iub24oXCJlcnJvclwiLGZ1bmN0aW9uKHQpe2UodCl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7ci5zdHJlYW1JbmZvLmNyYzMyIT09aS5kZWNvbXByZXNzZWQuY3JjMzI/ZShuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIDogQ1JDMzIgbWlzbWF0Y2hcIikpOnQoKX0pLnJlc3VtZSgpfSl9ZS5leHBvcnRzPWZ1bmN0aW9uKHQscyl7dmFyIGE9dGhpcztyZXR1cm4gcz1pLmV4dGVuZChzfHx7fSx7YmFzZTY0OiExLGNoZWNrQ1JDMzI6ITEsb3B0aW1pemVkQmluYXJ5U3RyaW5nOiExLGNyZWF0ZUZvbGRlcnM6ITEsZGVjb2RlRmlsZU5hbWU6by51dGY4ZGVjb2RlfSksdS5pc05vZGUmJnUuaXNTdHJlYW0odCk/bi5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJKU1ppcCBjYW4ndCBhY2NlcHQgYSBzdHJlYW0gd2hlbiBsb2FkaW5nIGEgemlwIGZpbGUuXCIpKTppLnByZXBhcmVDb250ZW50KFwidGhlIGxvYWRlZCB6aXAgZmlsZVwiLHQsITAscy5vcHRpbWl6ZWRCaW5hcnlTdHJpbmcscy5iYXNlNjQpLnRoZW4oZnVuY3Rpb24odCl7dmFyIGU9bmV3IGgocyk7cmV0dXJuIGUubG9hZCh0KSxlfSkudGhlbihmdW5jdGlvbih0KXt2YXIgZT1bbi5Qcm9taXNlLnJlc29sdmUodCldLHI9dC5maWxlcztpZihzLmNoZWNrQ1JDMzIpZm9yKHZhciBpPTA7aTxyLmxlbmd0aDtpKyspZS5wdXNoKGwocltpXSkpO3JldHVybiBuLlByb21pc2UuYWxsKGUpfSkudGhlbihmdW5jdGlvbih0KXtmb3IodmFyIGU9dC5zaGlmdCgpLHI9ZS5maWxlcyxpPTA7aTxyLmxlbmd0aDtpKyspe3ZhciBuPXJbaV07YS5maWxlKG4uZmlsZU5hbWVTdHIsbi5kZWNvbXByZXNzZWQse2JpbmFyeTohMCxvcHRpbWl6ZWRCaW5hcnlTdHJpbmc6ITAsZGF0ZTpuLmRhdGUsZGlyOm4uZGlyLGNvbW1lbnQ6bi5maWxlQ29tbWVudFN0ci5sZW5ndGg/bi5maWxlQ29tbWVudFN0cjpudWxsLHVuaXhQZXJtaXNzaW9uczpuLnVuaXhQZXJtaXNzaW9ucyxkb3NQZXJtaXNzaW9uczpuLmRvc1Blcm1pc3Npb25zLGNyZWF0ZUZvbGRlcnM6cy5jcmVhdGVGb2xkZXJzfSl9cmV0dXJuIGUuemlwQ29tbWVudC5sZW5ndGgmJihhLmNvbW1lbnQ9ZS56aXBDb21tZW50KSxhfSl9fSx7XCIuL2V4dGVybmFsXCI6NixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIjoyNSxcIi4vdXRmOFwiOjMxLFwiLi91dGlsc1wiOjMyLFwiLi96aXBFbnRyaWVzXCI6MzN9XSwxMjpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuLi91dGlsc1wiKSxuPXQoXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKTtmdW5jdGlvbiBzKHQsZSl7bi5jYWxsKHRoaXMsXCJOb2RlanMgc3RyZWFtIGlucHV0IGFkYXB0ZXIgZm9yIFwiK3QpLHRoaXMuX3Vwc3RyZWFtRW5kZWQ9ITEsdGhpcy5fYmluZFN0cmVhbShlKX1pLmluaGVyaXRzKHMsbikscy5wcm90b3R5cGUuX2JpbmRTdHJlYW09ZnVuY3Rpb24odCl7dmFyIGU9dGhpczsodGhpcy5fc3RyZWFtPXQpLnBhdXNlKCksdC5vbihcImRhdGFcIixmdW5jdGlvbih0KXtlLnB1c2goe2RhdGE6dCxtZXRhOntwZXJjZW50OjB9fSl9KS5vbihcImVycm9yXCIsZnVuY3Rpb24odCl7ZS5pc1BhdXNlZD90aGlzLmdlbmVyYXRlZEVycm9yPXQ6ZS5lcnJvcih0KX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtlLmlzUGF1c2VkP2UuX3Vwc3RyZWFtRW5kZWQ9ITA6ZS5lbmQoKX0pfSxzLnByb3RvdHlwZS5wYXVzZT1mdW5jdGlvbigpe3JldHVybiEhbi5wcm90b3R5cGUucGF1c2UuY2FsbCh0aGlzKSYmKHRoaXMuX3N0cmVhbS5wYXVzZSgpLCEwKX0scy5wcm90b3R5cGUucmVzdW1lPWZ1bmN0aW9uKCl7cmV0dXJuISFuLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSYmKHRoaXMuX3Vwc3RyZWFtRW5kZWQ/dGhpcy5lbmQoKTp0aGlzLl9zdHJlYW0ucmVzdW1lKCksITApfSxlLmV4cG9ydHM9c30se1wiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4uL3V0aWxzXCI6MzJ9XSwxMzpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBuPXQoXCJyZWFkYWJsZS1zdHJlYW1cIikuUmVhZGFibGU7ZnVuY3Rpb24gaSh0LGUscil7bi5jYWxsKHRoaXMsZSksdGhpcy5faGVscGVyPXQ7dmFyIGk9dGhpczt0Lm9uKFwiZGF0YVwiLGZ1bmN0aW9uKHQsZSl7aS5wdXNoKHQpfHxpLl9oZWxwZXIucGF1c2UoKSxyJiZyKGUpfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKHQpe2kuZW1pdChcImVycm9yXCIsdCl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7aS5wdXNoKG51bGwpfSl9dChcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUuX3JlYWQ9ZnVuY3Rpb24oKXt0aGlzLl9oZWxwZXIucmVzdW1lKCl9LGUuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwicmVhZGFibGUtc3RyZWFtXCI6MTZ9XSwxNDpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO2UuZXhwb3J0cz17aXNOb2RlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBCdWZmZXIsbmV3QnVmZmVyRnJvbTpmdW5jdGlvbih0LGUpe2lmKEJ1ZmZlci5mcm9tJiZCdWZmZXIuZnJvbSE9PVVpbnQ4QXJyYXkuZnJvbSlyZXR1cm4gQnVmZmVyLmZyb20odCxlKTtpZihcIm51bWJlclwiPT10eXBlb2YgdCl0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcImRhdGFcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO3JldHVybiBuZXcgQnVmZmVyKHQsZSl9LGFsbG9jQnVmZmVyOmZ1bmN0aW9uKHQpe2lmKEJ1ZmZlci5hbGxvYylyZXR1cm4gQnVmZmVyLmFsbG9jKHQpO3ZhciBlPW5ldyBCdWZmZXIodCk7cmV0dXJuIGUuZmlsbCgwKSxlfSxpc0J1ZmZlcjpmdW5jdGlvbih0KXtyZXR1cm4gQnVmZmVyLmlzQnVmZmVyKHQpfSxpc1N0cmVhbTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgdC5vbiYmXCJmdW5jdGlvblwiPT10eXBlb2YgdC5wYXVzZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgdC5yZXN1bWV9fX0se31dLDE1OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcyh0LGUscil7dmFyIGksbj11LmdldFR5cGVPZihlKSxzPXUuZXh0ZW5kKHJ8fHt9LGYpO3MuZGF0ZT1zLmRhdGV8fG5ldyBEYXRlLG51bGwhPT1zLmNvbXByZXNzaW9uJiYocy5jb21wcmVzc2lvbj1zLmNvbXByZXNzaW9uLnRvVXBwZXJDYXNlKCkpLFwic3RyaW5nXCI9PXR5cGVvZiBzLnVuaXhQZXJtaXNzaW9ucyYmKHMudW5peFBlcm1pc3Npb25zPXBhcnNlSW50KHMudW5peFBlcm1pc3Npb25zLDgpKSxzLnVuaXhQZXJtaXNzaW9ucyYmMTYzODQmcy51bml4UGVybWlzc2lvbnMmJihzLmRpcj0hMCkscy5kb3NQZXJtaXNzaW9ucyYmMTYmcy5kb3NQZXJtaXNzaW9ucyYmKHMuZGlyPSEwKSxzLmRpciYmKHQ9Zyh0KSkscy5jcmVhdGVGb2xkZXJzJiYoaT1fKHQpKSYmYi5jYWxsKHRoaXMsaSwhMCk7dmFyIGE9XCJzdHJpbmdcIj09PW4mJiExPT09cy5iaW5hcnkmJiExPT09cy5iYXNlNjQ7ciYmdm9pZCAwIT09ci5iaW5hcnl8fChzLmJpbmFyeT0hYSksKGUgaW5zdGFuY2VvZiBkJiYwPT09ZS51bmNvbXByZXNzZWRTaXplfHxzLmRpcnx8IWV8fDA9PT1lLmxlbmd0aCkmJihzLmJhc2U2ND0hMSxzLmJpbmFyeT0hMCxlPVwiXCIscy5jb21wcmVzc2lvbj1cIlNUT1JFXCIsbj1cInN0cmluZ1wiKTt2YXIgbz1udWxsO289ZSBpbnN0YW5jZW9mIGR8fGUgaW5zdGFuY2VvZiBsP2U6cC5pc05vZGUmJnAuaXNTdHJlYW0oZSk/bmV3IG0odCxlKTp1LnByZXBhcmVDb250ZW50KHQsZSxzLmJpbmFyeSxzLm9wdGltaXplZEJpbmFyeVN0cmluZyxzLmJhc2U2NCk7dmFyIGg9bmV3IGModCxvLHMpO3RoaXMuZmlsZXNbdF09aH12YXIgbj10KFwiLi91dGY4XCIpLHU9dChcIi4vdXRpbHNcIiksbD10KFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxhPXQoXCIuL3N0cmVhbS9TdHJlYW1IZWxwZXJcIiksZj10KFwiLi9kZWZhdWx0c1wiKSxkPXQoXCIuL2NvbXByZXNzZWRPYmplY3RcIiksYz10KFwiLi96aXBPYmplY3RcIiksbz10KFwiLi9nZW5lcmF0ZVwiKSxwPXQoXCIuL25vZGVqc1V0aWxzXCIpLG09dChcIi4vbm9kZWpzL05vZGVqc1N0cmVhbUlucHV0QWRhcHRlclwiKSxfPWZ1bmN0aW9uKHQpe1wiL1wiPT09dC5zbGljZSgtMSkmJih0PXQuc3Vic3RyaW5nKDAsdC5sZW5ndGgtMSkpO3ZhciBlPXQubGFzdEluZGV4T2YoXCIvXCIpO3JldHVybiAwPGU/dC5zdWJzdHJpbmcoMCxlKTpcIlwifSxnPWZ1bmN0aW9uKHQpe3JldHVyblwiL1wiIT09dC5zbGljZSgtMSkmJih0Kz1cIi9cIiksdH0sYj1mdW5jdGlvbih0LGUpe3JldHVybiBlPXZvaWQgMCE9PWU/ZTpmLmNyZWF0ZUZvbGRlcnMsdD1nKHQpLHRoaXMuZmlsZXNbdF18fHMuY2FsbCh0aGlzLHQsbnVsbCx7ZGlyOiEwLGNyZWF0ZUZvbGRlcnM6ZX0pLHRoaXMuZmlsZXNbdF19O2Z1bmN0aW9uIGgodCl7cmV0dXJuXCJbb2JqZWN0IFJlZ0V4cF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KX12YXIgaT17bG9hZDpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpfSxmb3JFYWNoOmZ1bmN0aW9uKHQpe3ZhciBlLHIsaTtmb3IoZSBpbiB0aGlzLmZpbGVzKXRoaXMuZmlsZXMuaGFzT3duUHJvcGVydHkoZSkmJihpPXRoaXMuZmlsZXNbZV0sKHI9ZS5zbGljZSh0aGlzLnJvb3QubGVuZ3RoLGUubGVuZ3RoKSkmJmUuc2xpY2UoMCx0aGlzLnJvb3QubGVuZ3RoKT09PXRoaXMucm9vdCYmdChyLGkpKX0sZmlsdGVyOmZ1bmN0aW9uKHIpe3ZhciBpPVtdO3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24odCxlKXtyKHQsZSkmJmkucHVzaChlKX0pLGl9LGZpbGU6ZnVuY3Rpb24odCxlLHIpe2lmKDEhPT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiB0PXRoaXMucm9vdCt0LHMuY2FsbCh0aGlzLHQsZSxyKSx0aGlzO2lmKGgodCkpe3ZhciBpPXQ7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIWUuZGlyJiZpLnRlc3QodCl9KX12YXIgbj10aGlzLmZpbGVzW3RoaXMucm9vdCt0XTtyZXR1cm4gbiYmIW4uZGlyP246bnVsbH0sZm9sZGVyOmZ1bmN0aW9uKHIpe2lmKCFyKXJldHVybiB0aGlzO2lmKGgocikpcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIGUuZGlyJiZyLnRlc3QodCl9KTt2YXIgdD10aGlzLnJvb3QrcixlPWIuY2FsbCh0aGlzLHQpLGk9dGhpcy5jbG9uZSgpO3JldHVybiBpLnJvb3Q9ZS5uYW1lLGl9LHJlbW92ZTpmdW5jdGlvbihyKXtyPXRoaXMucm9vdCtyO3ZhciB0PXRoaXMuZmlsZXNbcl07aWYodHx8KFwiL1wiIT09ci5zbGljZSgtMSkmJihyKz1cIi9cIiksdD10aGlzLmZpbGVzW3JdKSx0JiYhdC5kaXIpZGVsZXRlIHRoaXMuZmlsZXNbcl07ZWxzZSBmb3IodmFyIGU9dGhpcy5maWx0ZXIoZnVuY3Rpb24odCxlKXtyZXR1cm4gZS5uYW1lLnNsaWNlKDAsci5sZW5ndGgpPT09cn0pLGk9MDtpPGUubGVuZ3RoO2krKylkZWxldGUgdGhpcy5maWxlc1tlW2ldLm5hbWVdO3JldHVybiB0aGlzfSxnZW5lcmF0ZTpmdW5jdGlvbih0KXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKX0sZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbTpmdW5jdGlvbih0KXt2YXIgZSxyPXt9O3RyeXtpZigocj11LmV4dGVuZCh0fHx7fSx7c3RyZWFtRmlsZXM6ITEsY29tcHJlc3Npb246XCJTVE9SRVwiLGNvbXByZXNzaW9uT3B0aW9uczpudWxsLHR5cGU6XCJcIixwbGF0Zm9ybTpcIkRPU1wiLGNvbW1lbnQ6bnVsbCxtaW1lVHlwZTpcImFwcGxpY2F0aW9uL3ppcFwiLGVuY29kZUZpbGVOYW1lOm4udXRmOGVuY29kZX0pKS50eXBlPXIudHlwZS50b0xvd2VyQ2FzZSgpLHIuY29tcHJlc3Npb249ci5jb21wcmVzc2lvbi50b1VwcGVyQ2FzZSgpLFwiYmluYXJ5c3RyaW5nXCI9PT1yLnR5cGUmJihyLnR5cGU9XCJzdHJpbmdcIiksIXIudHlwZSl0aHJvdyBuZXcgRXJyb3IoXCJObyBvdXRwdXQgdHlwZSBzcGVjaWZpZWQuXCIpO3UuY2hlY2tTdXBwb3J0KHIudHlwZSksXCJkYXJ3aW5cIiE9PXIucGxhdGZvcm0mJlwiZnJlZWJzZFwiIT09ci5wbGF0Zm9ybSYmXCJsaW51eFwiIT09ci5wbGF0Zm9ybSYmXCJzdW5vc1wiIT09ci5wbGF0Zm9ybXx8KHIucGxhdGZvcm09XCJVTklYXCIpLFwid2luMzJcIj09PXIucGxhdGZvcm0mJihyLnBsYXRmb3JtPVwiRE9TXCIpO3ZhciBpPXIuY29tbWVudHx8dGhpcy5jb21tZW50fHxcIlwiO2U9by5nZW5lcmF0ZVdvcmtlcih0aGlzLHIsaSl9Y2F0Y2godCl7KGU9bmV3IGwoXCJlcnJvclwiKSkuZXJyb3IodCl9cmV0dXJuIG5ldyBhKGUsci50eXBlfHxcInN0cmluZ1wiLHIubWltZVR5cGUpfSxnZW5lcmF0ZUFzeW5jOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbSh0KS5hY2N1bXVsYXRlKGUpfSxnZW5lcmF0ZU5vZGVTdHJlYW06ZnVuY3Rpb24odCxlKXtyZXR1cm4odD10fHx7fSkudHlwZXx8KHQudHlwZT1cIm5vZGVidWZmZXJcIiksdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKHQpLnRvTm9kZWpzU3RyZWFtKGUpfX07ZS5leHBvcnRzPWl9LHtcIi4vY29tcHJlc3NlZE9iamVjdFwiOjIsXCIuL2RlZmF1bHRzXCI6NSxcIi4vZ2VuZXJhdGVcIjo5LFwiLi9ub2RlanMvTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyXCI6MTIsXCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuL3N0cmVhbS9TdHJlYW1IZWxwZXJcIjoyOSxcIi4vdXRmOFwiOjMxLFwiLi91dGlsc1wiOjMyLFwiLi96aXBPYmplY3RcIjozNX1dLDE2OltmdW5jdGlvbih0LGUscil7ZS5leHBvcnRzPXQoXCJzdHJlYW1cIil9LHtzdHJlYW06dm9pZCAwfV0sMTc6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT10KFwiLi9EYXRhUmVhZGVyXCIpO2Z1bmN0aW9uIG4odCl7aS5jYWxsKHRoaXMsdCk7Zm9yKHZhciBlPTA7ZTx0aGlzLmRhdGEubGVuZ3RoO2UrKyl0W2VdPTI1NSZ0W2VdfXQoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhuLGkpLG4ucHJvdG90eXBlLmJ5dGVBdD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5kYXRhW3RoaXMuemVybyt0XX0sbi5wcm90b3R5cGUubGFzdEluZGV4T2ZTaWduYXR1cmU9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXQuY2hhckNvZGVBdCgwKSxyPXQuY2hhckNvZGVBdCgxKSxpPXQuY2hhckNvZGVBdCgyKSxuPXQuY2hhckNvZGVBdCgzKSxzPXRoaXMubGVuZ3RoLTQ7MDw9czstLXMpaWYodGhpcy5kYXRhW3NdPT09ZSYmdGhpcy5kYXRhW3MrMV09PT1yJiZ0aGlzLmRhdGFbcysyXT09PWkmJnRoaXMuZGF0YVtzKzNdPT09bilyZXR1cm4gcy10aGlzLnplcm87cmV0dXJuLTF9LG4ucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZT1mdW5jdGlvbih0KXt2YXIgZT10LmNoYXJDb2RlQXQoMCkscj10LmNoYXJDb2RlQXQoMSksaT10LmNoYXJDb2RlQXQoMiksbj10LmNoYXJDb2RlQXQoMykscz10aGlzLnJlYWREYXRhKDQpO3JldHVybiBlPT09c1swXSYmcj09PXNbMV0mJmk9PT1zWzJdJiZuPT09c1szXX0sbi5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24odCl7aWYodGhpcy5jaGVja09mZnNldCh0KSwwPT09dClyZXR1cm5bXTt2YXIgZT10aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrdCk7cmV0dXJuIHRoaXMuaW5kZXgrPXQsZX0sZS5leHBvcnRzPW59LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0RhdGFSZWFkZXJcIjoxOH1dLDE4OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9dChcIi4uL3V0aWxzXCIpO2Z1bmN0aW9uIG4odCl7dGhpcy5kYXRhPXQsdGhpcy5sZW5ndGg9dC5sZW5ndGgsdGhpcy5pbmRleD0wLHRoaXMuemVybz0wfW4ucHJvdG90eXBlPXtjaGVja09mZnNldDpmdW5jdGlvbih0KXt0aGlzLmNoZWNrSW5kZXgodGhpcy5pbmRleCt0KX0sY2hlY2tJbmRleDpmdW5jdGlvbih0KXtpZih0aGlzLmxlbmd0aDx0aGlzLnplcm8rdHx8dDwwKXRocm93IG5ldyBFcnJvcihcIkVuZCBvZiBkYXRhIHJlYWNoZWQgKGRhdGEgbGVuZ3RoID0gXCIrdGhpcy5sZW5ndGgrXCIsIGFza2VkIGluZGV4ID0gXCIrdCtcIikuIENvcnJ1cHRlZCB6aXAgP1wiKX0sc2V0SW5kZXg6ZnVuY3Rpb24odCl7dGhpcy5jaGVja0luZGV4KHQpLHRoaXMuaW5kZXg9dH0sc2tpcDpmdW5jdGlvbih0KXt0aGlzLnNldEluZGV4KHRoaXMuaW5kZXgrdCl9LGJ5dGVBdDpmdW5jdGlvbih0KXt9LHJlYWRJbnQ6ZnVuY3Rpb24odCl7dmFyIGUscj0wO2Zvcih0aGlzLmNoZWNrT2Zmc2V0KHQpLGU9dGhpcy5pbmRleCt0LTE7ZT49dGhpcy5pbmRleDtlLS0pcj0ocjw8OCkrdGhpcy5ieXRlQXQoZSk7cmV0dXJuIHRoaXMuaW5kZXgrPXQscn0scmVhZFN0cmluZzpmdW5jdGlvbih0KXtyZXR1cm4gaS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLHRoaXMucmVhZERhdGEodCkpfSxyZWFkRGF0YTpmdW5jdGlvbih0KXt9LGxhc3RJbmRleE9mU2lnbmF0dXJlOmZ1bmN0aW9uKHQpe30scmVhZEFuZENoZWNrU2lnbmF0dXJlOmZ1bmN0aW9uKHQpe30scmVhZERhdGU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnJlYWRJbnQoNCk7cmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5ODArKHQ+PjI1JjEyNyksKHQ+PjIxJjE1KS0xLHQ+PjE2JjMxLHQ+PjExJjMxLHQ+PjUmNjMsKDMxJnQpPDwxKSl9fSxlLmV4cG9ydHM9bn0se1wiLi4vdXRpbHNcIjozMn1dLDE5OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9dChcIi4vVWludDhBcnJheVJlYWRlclwiKTtmdW5jdGlvbiBuKHQpe2kuY2FsbCh0aGlzLHQpfXQoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhuLGkpLG4ucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKHQpe3RoaXMuY2hlY2tPZmZzZXQodCk7dmFyIGU9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K3QpO3JldHVybiB0aGlzLmluZGV4Kz10LGV9LGUuZXhwb3J0cz1ufSx7XCIuLi91dGlsc1wiOjMyLFwiLi9VaW50OEFycmF5UmVhZGVyXCI6MjF9XSwyMDpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuL0RhdGFSZWFkZXJcIik7ZnVuY3Rpb24gbih0KXtpLmNhbGwodGhpcyx0KX10KFwiLi4vdXRpbHNcIikuaW5oZXJpdHMobixpKSxuLnByb3RvdHlwZS5ieXRlQXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZGF0YS5jaGFyQ29kZUF0KHRoaXMuemVybyt0KX0sbi5wcm90b3R5cGUubGFzdEluZGV4T2ZTaWduYXR1cmU9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZGF0YS5sYXN0SW5kZXhPZih0KS10aGlzLnplcm99LG4ucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZT1mdW5jdGlvbih0KXtyZXR1cm4gdD09PXRoaXMucmVhZERhdGEoNCl9LG4ucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKHQpe3RoaXMuY2hlY2tPZmZzZXQodCk7dmFyIGU9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K3QpO3JldHVybiB0aGlzLmluZGV4Kz10LGV9LGUuZXhwb3J0cz1ufSx7XCIuLi91dGlsc1wiOjMyLFwiLi9EYXRhUmVhZGVyXCI6MTh9XSwyMTpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuL0FycmF5UmVhZGVyXCIpO2Z1bmN0aW9uIG4odCl7aS5jYWxsKHRoaXMsdCl9dChcIi4uL3V0aWxzXCIpLmluaGVyaXRzKG4saSksbi5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24odCl7aWYodGhpcy5jaGVja09mZnNldCh0KSwwPT09dClyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMCk7dmFyIGU9dGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K3QpO3JldHVybiB0aGlzLmluZGV4Kz10LGV9LGUuZXhwb3J0cz1ufSx7XCIuLi91dGlsc1wiOjMyLFwiLi9BcnJheVJlYWRlclwiOjE3fV0sMjI6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT10KFwiLi4vdXRpbHNcIiksbj10KFwiLi4vc3VwcG9ydFwiKSxzPXQoXCIuL0FycmF5UmVhZGVyXCIpLGE9dChcIi4vU3RyaW5nUmVhZGVyXCIpLG89dChcIi4vTm9kZUJ1ZmZlclJlYWRlclwiKSxoPXQoXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIik7ZS5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPWkuZ2V0VHlwZU9mKHQpO3JldHVybiBpLmNoZWNrU3VwcG9ydChlKSxcInN0cmluZ1wiIT09ZXx8bi51aW50OGFycmF5P1wibm9kZWJ1ZmZlclwiPT09ZT9uZXcgbyh0KTpuLnVpbnQ4YXJyYXk/bmV3IGgoaS50cmFuc2Zvcm1UbyhcInVpbnQ4YXJyYXlcIix0KSk6bmV3IHMoaS50cmFuc2Zvcm1UbyhcImFycmF5XCIsdCkpOm5ldyBhKHQpfX0se1wiLi4vc3VwcG9ydFwiOjMwLFwiLi4vdXRpbHNcIjozMixcIi4vQXJyYXlSZWFkZXJcIjoxNyxcIi4vTm9kZUJ1ZmZlclJlYWRlclwiOjE5LFwiLi9TdHJpbmdSZWFkZXJcIjoyMCxcIi4vVWludDhBcnJheVJlYWRlclwiOjIxfV0sMjM6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjtyLkxPQ0FMX0ZJTEVfSEVBREVSPVwiUEtcdTAwMDNcdTAwMDRcIixyLkNFTlRSQUxfRklMRV9IRUFERVI9XCJQS1x1MDAwMVx1MDAwMlwiLHIuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EPVwiUEtcdTAwMDVcdTAwMDZcIixyLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1I9XCJQS1x1MDAwNlx1MDAwN1wiLHIuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EPVwiUEtcdTAwMDZcdTAwMDZcIixyLkRBVEFfREVTQ1JJUFRPUj1cIlBLXHUwMDA3XFxiXCJ9LHt9XSwyNDpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuL0dlbmVyaWNXb3JrZXJcIiksbj10KFwiLi4vdXRpbHNcIik7ZnVuY3Rpb24gcyh0KXtpLmNhbGwodGhpcyxcIkNvbnZlcnRXb3JrZXIgdG8gXCIrdCksdGhpcy5kZXN0VHlwZT10fW4uaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24odCl7dGhpcy5wdXNoKHtkYXRhOm4udHJhbnNmb3JtVG8odGhpcy5kZXN0VHlwZSx0LmRhdGEpLG1ldGE6dC5tZXRhfSl9LGUuZXhwb3J0cz1zfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyNTpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuL0dlbmVyaWNXb3JrZXJcIiksbj10KFwiLi4vY3JjMzJcIik7ZnVuY3Rpb24gcygpe2kuY2FsbCh0aGlzLFwiQ3JjMzJQcm9iZVwiKSx0aGlzLndpdGhTdHJlYW1JbmZvKFwiY3JjMzJcIiwwKX10KFwiLi4vdXRpbHNcIikuaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24odCl7dGhpcy5zdHJlYW1JbmZvLmNyYzMyPW4odC5kYXRhLHRoaXMuc3RyZWFtSW5mby5jcmMzMnx8MCksdGhpcy5wdXNoKHQpfSxlLmV4cG9ydHM9c30se1wiLi4vY3JjMzJcIjo0LFwiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjY6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT10KFwiLi4vdXRpbHNcIiksbj10KFwiLi9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHModCl7bi5jYWxsKHRoaXMsXCJEYXRhTGVuZ3RoUHJvYmUgZm9yIFwiK3QpLHRoaXMucHJvcE5hbWU9dCx0aGlzLndpdGhTdHJlYW1JbmZvKHQsMCl9aS5pbmhlcml0cyhzLG4pLHMucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbih0KXtpZih0KXt2YXIgZT10aGlzLnN0cmVhbUluZm9bdGhpcy5wcm9wTmFtZV18fDA7dGhpcy5zdHJlYW1JbmZvW3RoaXMucHJvcE5hbWVdPWUrdC5kYXRhLmxlbmd0aH1uLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsuY2FsbCh0aGlzLHQpfSxlLmV4cG9ydHM9c30se1wiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjc6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT10KFwiLi4vdXRpbHNcIiksbj10KFwiLi9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHModCl7bi5jYWxsKHRoaXMsXCJEYXRhV29ya2VyXCIpO3ZhciBlPXRoaXM7dGhpcy5kYXRhSXNSZWFkeT0hMSx0aGlzLmluZGV4PTAsdGhpcy5tYXg9MCx0aGlzLmRhdGE9bnVsbCx0aGlzLnR5cGU9XCJcIix0aGlzLl90aWNrU2NoZWR1bGVkPSExLHQudGhlbihmdW5jdGlvbih0KXtlLmRhdGFJc1JlYWR5PSEwLGUuZGF0YT10LGUubWF4PXQmJnQubGVuZ3RofHwwLGUudHlwZT1pLmdldFR5cGVPZih0KSxlLmlzUGF1c2VkfHxlLl90aWNrQW5kUmVwZWF0KCl9LGZ1bmN0aW9uKHQpe2UuZXJyb3IodCl9KX1pLmluaGVyaXRzKHMsbikscy5wcm90b3R5cGUuY2xlYW5VcD1mdW5jdGlvbigpe24ucHJvdG90eXBlLmNsZWFuVXAuY2FsbCh0aGlzKSx0aGlzLmRhdGE9bnVsbH0scy5wcm90b3R5cGUucmVzdW1lPWZ1bmN0aW9uKCl7cmV0dXJuISFuLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSYmKCF0aGlzLl90aWNrU2NoZWR1bGVkJiZ0aGlzLmRhdGFJc1JlYWR5JiYodGhpcy5fdGlja1NjaGVkdWxlZD0hMCxpLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsW10sdGhpcykpLCEwKX0scy5wcm90b3R5cGUuX3RpY2tBbmRSZXBlYXQ9ZnVuY3Rpb24oKXt0aGlzLl90aWNrU2NoZWR1bGVkPSExLHRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZHx8KHRoaXMuX3RpY2soKSx0aGlzLmlzRmluaXNoZWR8fChpLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsW10sdGhpcyksdGhpcy5fdGlja1NjaGVkdWxlZD0hMCkpfSxzLnByb3RvdHlwZS5fdGljaz1mdW5jdGlvbigpe2lmKHRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt2YXIgdD1udWxsLGU9TWF0aC5taW4odGhpcy5tYXgsdGhpcy5pbmRleCsxNjM4NCk7aWYodGhpcy5pbmRleD49dGhpcy5tYXgpcmV0dXJuIHRoaXMuZW5kKCk7c3dpdGNoKHRoaXMudHlwZSl7Y2FzZVwic3RyaW5nXCI6dD10aGlzLmRhdGEuc3Vic3RyaW5nKHRoaXMuaW5kZXgsZSk7YnJlYWs7Y2FzZVwidWludDhhcnJheVwiOnQ9dGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuaW5kZXgsZSk7YnJlYWs7Y2FzZVwiYXJyYXlcIjpjYXNlXCJub2RlYnVmZmVyXCI6dD10aGlzLmRhdGEuc2xpY2UodGhpcy5pbmRleCxlKX1yZXR1cm4gdGhpcy5pbmRleD1lLHRoaXMucHVzaCh7ZGF0YTp0LG1ldGE6e3BlcmNlbnQ6dGhpcy5tYXg/dGhpcy5pbmRleC90aGlzLm1heCoxMDA6MH19KX0sZS5leHBvcnRzPXN9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI4OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaSh0KXt0aGlzLm5hbWU9dHx8XCJkZWZhdWx0XCIsdGhpcy5zdHJlYW1JbmZvPXt9LHRoaXMuZ2VuZXJhdGVkRXJyb3I9bnVsbCx0aGlzLmV4dHJhU3RyZWFtSW5mbz17fSx0aGlzLmlzUGF1c2VkPSEwLHRoaXMuaXNGaW5pc2hlZD0hMSx0aGlzLmlzTG9ja2VkPSExLHRoaXMuX2xpc3RlbmVycz17ZGF0YTpbXSxlbmQ6W10sZXJyb3I6W119LHRoaXMucHJldmlvdXM9bnVsbH1pLnByb3RvdHlwZT17cHVzaDpmdW5jdGlvbih0KXt0aGlzLmVtaXQoXCJkYXRhXCIsdCl9LGVuZDpmdW5jdGlvbigpe2lmKHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt0aGlzLmZsdXNoKCk7dHJ5e3RoaXMuZW1pdChcImVuZFwiKSx0aGlzLmNsZWFuVXAoKSx0aGlzLmlzRmluaXNoZWQ9ITB9Y2F0Y2godCl7dGhpcy5lbWl0KFwiZXJyb3JcIix0KX1yZXR1cm4hMH0sZXJyb3I6ZnVuY3Rpb24odCl7cmV0dXJuIXRoaXMuaXNGaW5pc2hlZCYmKHRoaXMuaXNQYXVzZWQ/dGhpcy5nZW5lcmF0ZWRFcnJvcj10Oih0aGlzLmlzRmluaXNoZWQ9ITAsdGhpcy5lbWl0KFwiZXJyb3JcIix0KSx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLmVycm9yKHQpLHRoaXMuY2xlYW5VcCgpKSwhMCl9LG9uOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuX2xpc3RlbmVyc1t0XS5wdXNoKGUpLHRoaXN9LGNsZWFuVXA6ZnVuY3Rpb24oKXt0aGlzLnN0cmVhbUluZm89dGhpcy5nZW5lcmF0ZWRFcnJvcj10aGlzLmV4dHJhU3RyZWFtSW5mbz1udWxsLHRoaXMuX2xpc3RlbmVycz1bXX0sZW1pdDpmdW5jdGlvbih0LGUpe2lmKHRoaXMuX2xpc3RlbmVyc1t0XSlmb3IodmFyIHI9MDtyPHRoaXMuX2xpc3RlbmVyc1t0XS5sZW5ndGg7cisrKXRoaXMuX2xpc3RlbmVyc1t0XVtyXS5jYWxsKHRoaXMsZSl9LHBpcGU6ZnVuY3Rpb24odCl7cmV0dXJuIHQucmVnaXN0ZXJQcmV2aW91cyh0aGlzKX0scmVnaXN0ZXJQcmV2aW91czpmdW5jdGlvbih0KXtpZih0aGlzLmlzTG9ja2VkKXRocm93IG5ldyBFcnJvcihcIlRoZSBzdHJlYW0gJ1wiK3RoaXMrXCInIGhhcyBhbHJlYWR5IGJlZW4gdXNlZC5cIik7dGhpcy5zdHJlYW1JbmZvPXQuc3RyZWFtSW5mbyx0aGlzLm1lcmdlU3RyZWFtSW5mbygpLHRoaXMucHJldmlvdXM9dDt2YXIgZT10aGlzO3JldHVybiB0Lm9uKFwiZGF0YVwiLGZ1bmN0aW9uKHQpe2UucHJvY2Vzc0NodW5rKHQpfSksdC5vbihcImVuZFwiLGZ1bmN0aW9uKCl7ZS5lbmQoKX0pLHQub24oXCJlcnJvclwiLGZ1bmN0aW9uKHQpe2UuZXJyb3IodCl9KSx0aGlzfSxwYXVzZTpmdW5jdGlvbigpe3JldHVybiF0aGlzLmlzUGF1c2VkJiYhdGhpcy5pc0ZpbmlzaGVkJiYodGhpcy5pc1BhdXNlZD0hMCx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLnBhdXNlKCksITApfSxyZXN1bWU6ZnVuY3Rpb24oKXtpZighdGhpcy5pc1BhdXNlZHx8dGhpcy5pc0ZpbmlzaGVkKXJldHVybiExO3ZhciB0PXRoaXMuaXNQYXVzZWQ9ITE7cmV0dXJuIHRoaXMuZ2VuZXJhdGVkRXJyb3ImJih0aGlzLmVycm9yKHRoaXMuZ2VuZXJhdGVkRXJyb3IpLHQ9ITApLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMucmVzdW1lKCksIXR9LGZsdXNoOmZ1bmN0aW9uKCl7fSxwcm9jZXNzQ2h1bms6ZnVuY3Rpb24odCl7dGhpcy5wdXNoKHQpfSx3aXRoU3RyZWFtSW5mbzpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmV4dHJhU3RyZWFtSW5mb1t0XT1lLHRoaXMubWVyZ2VTdHJlYW1JbmZvKCksdGhpc30sbWVyZ2VTdHJlYW1JbmZvOmZ1bmN0aW9uKCl7Zm9yKHZhciB0IGluIHRoaXMuZXh0cmFTdHJlYW1JbmZvKXRoaXMuZXh0cmFTdHJlYW1JbmZvLmhhc093blByb3BlcnR5KHQpJiYodGhpcy5zdHJlYW1JbmZvW3RdPXRoaXMuZXh0cmFTdHJlYW1JbmZvW3RdKX0sbG9jazpmdW5jdGlvbigpe2lmKHRoaXMuaXNMb2NrZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0cmVhbSAnXCIrdGhpcytcIicgaGFzIGFscmVhZHkgYmVlbiB1c2VkLlwiKTt0aGlzLmlzTG9ja2VkPSEwLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMubG9jaygpfSx0b1N0cmluZzpmdW5jdGlvbigpe3ZhciB0PVwiV29ya2VyIFwiK3RoaXMubmFtZTtyZXR1cm4gdGhpcy5wcmV2aW91cz90aGlzLnByZXZpb3VzK1wiIC0+IFwiK3Q6dH19LGUuZXhwb3J0cz1pfSx7fV0sMjk6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaD10KFwiLi4vdXRpbHNcIiksbj10KFwiLi9Db252ZXJ0V29ya2VyXCIpLHM9dChcIi4vR2VuZXJpY1dvcmtlclwiKSx1PXQoXCIuLi9iYXNlNjRcIiksaT10KFwiLi4vc3VwcG9ydFwiKSxhPXQoXCIuLi9leHRlcm5hbFwiKSxvPW51bGw7aWYoaS5ub2Rlc3RyZWFtKXRyeXtvPXQoXCIuLi9ub2RlanMvTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlclwiKX1jYXRjaCh0KXt9ZnVuY3Rpb24gbCh0LG8pe3JldHVybiBuZXcgYS5Qcm9taXNlKGZ1bmN0aW9uKGUscil7dmFyIGk9W10sbj10Ll9pbnRlcm5hbFR5cGUscz10Ll9vdXRwdXRUeXBlLGE9dC5fbWltZVR5cGU7dC5vbihcImRhdGFcIixmdW5jdGlvbih0LGUpe2kucHVzaCh0KSxvJiZvKGUpfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKHQpe2k9W10scih0KX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0cnl7dmFyIHQ9ZnVuY3Rpb24odCxlLHIpe3N3aXRjaCh0KXtjYXNlXCJibG9iXCI6cmV0dXJuIGgubmV3QmxvYihoLnRyYW5zZm9ybVRvKFwiYXJyYXlidWZmZXJcIixlKSxyKTtjYXNlXCJiYXNlNjRcIjpyZXR1cm4gdS5lbmNvZGUoZSk7ZGVmYXVsdDpyZXR1cm4gaC50cmFuc2Zvcm1Ubyh0LGUpfX0ocyxmdW5jdGlvbih0LGUpe3ZhciByLGk9MCxuPW51bGwscz0wO2ZvcihyPTA7cjxlLmxlbmd0aDtyKyspcys9ZVtyXS5sZW5ndGg7c3dpdGNoKHQpe2Nhc2VcInN0cmluZ1wiOnJldHVybiBlLmpvaW4oXCJcIik7Y2FzZVwiYXJyYXlcIjpyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSxlKTtjYXNlXCJ1aW50OGFycmF5XCI6Zm9yKG49bmV3IFVpbnQ4QXJyYXkocykscj0wO3I8ZS5sZW5ndGg7cisrKW4uc2V0KGVbcl0saSksaSs9ZVtyXS5sZW5ndGg7cmV0dXJuIG47Y2FzZVwibm9kZWJ1ZmZlclwiOnJldHVybiBCdWZmZXIuY29uY2F0KGUpO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiY29uY2F0IDogdW5zdXBwb3J0ZWQgdHlwZSAnXCIrdCtcIidcIil9fShuLGkpLGEpO2UodCl9Y2F0Y2godCl7cih0KX1pPVtdfSkucmVzdW1lKCl9KX1mdW5jdGlvbiBmKHQsZSxyKXt2YXIgaT1lO3N3aXRjaChlKXtjYXNlXCJibG9iXCI6Y2FzZVwiYXJyYXlidWZmZXJcIjppPVwidWludDhhcnJheVwiO2JyZWFrO2Nhc2VcImJhc2U2NFwiOmk9XCJzdHJpbmdcIn10cnl7dGhpcy5faW50ZXJuYWxUeXBlPWksdGhpcy5fb3V0cHV0VHlwZT1lLHRoaXMuX21pbWVUeXBlPXIsaC5jaGVja1N1cHBvcnQoaSksdGhpcy5fd29ya2VyPXQucGlwZShuZXcgbihpKSksdC5sb2NrKCl9Y2F0Y2godCl7dGhpcy5fd29ya2VyPW5ldyBzKFwiZXJyb3JcIiksdGhpcy5fd29ya2VyLmVycm9yKHQpfX1mLnByb3RvdHlwZT17YWNjdW11bGF0ZTpmdW5jdGlvbih0KXtyZXR1cm4gbCh0aGlzLHQpfSxvbjpmdW5jdGlvbih0LGUpe3ZhciByPXRoaXM7cmV0dXJuXCJkYXRhXCI9PT10P3RoaXMuX3dvcmtlci5vbih0LGZ1bmN0aW9uKHQpe2UuY2FsbChyLHQuZGF0YSx0Lm1ldGEpfSk6dGhpcy5fd29ya2VyLm9uKHQsZnVuY3Rpb24oKXtoLmRlbGF5KGUsYXJndW1lbnRzLHIpfSksdGhpc30scmVzdW1lOmZ1bmN0aW9uKCl7cmV0dXJuIGguZGVsYXkodGhpcy5fd29ya2VyLnJlc3VtZSxbXSx0aGlzLl93b3JrZXIpLHRoaXN9LHBhdXNlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dvcmtlci5wYXVzZSgpLHRoaXN9LHRvTm9kZWpzU3RyZWFtOmZ1bmN0aW9uKHQpe2lmKGguY2hlY2tTdXBwb3J0KFwibm9kZXN0cmVhbVwiKSxcIm5vZGVidWZmZXJcIiE9PXRoaXMuX291dHB1dFR5cGUpdGhyb3cgbmV3IEVycm9yKHRoaXMuX291dHB1dFR5cGUrXCIgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIG1ldGhvZFwiKTtyZXR1cm4gbmV3IG8odGhpcyx7b2JqZWN0TW9kZTpcIm5vZGVidWZmZXJcIiE9PXRoaXMuX291dHB1dFR5cGV9LHQpfX0sZS5leHBvcnRzPWZ9LHtcIi4uL2Jhc2U2NFwiOjEsXCIuLi9leHRlcm5hbFwiOjYsXCIuLi9ub2RlanMvTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlclwiOjEzLFwiLi4vc3VwcG9ydFwiOjMwLFwiLi4vdXRpbHNcIjozMixcIi4vQ29udmVydFdvcmtlclwiOjI0LFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwzMDpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO2lmKHIuYmFzZTY0PSEwLHIuYXJyYXk9ITAsci5zdHJpbmc9ITAsci5hcnJheWJ1ZmZlcj1cInVuZGVmaW5lZFwiIT10eXBlb2YgQXJyYXlCdWZmZXImJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5LHIubm9kZWJ1ZmZlcj1cInVuZGVmaW5lZFwiIT10eXBlb2YgQnVmZmVyLHIudWludDhhcnJheT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSxcInVuZGVmaW5lZFwiPT10eXBlb2YgQXJyYXlCdWZmZXIpci5ibG9iPSExO2Vsc2V7dmFyIGk9bmV3IEFycmF5QnVmZmVyKDApO3RyeXtyLmJsb2I9MD09PW5ldyBCbG9iKFtpXSx7dHlwZTpcImFwcGxpY2F0aW9uL3ppcFwifSkuc2l6ZX1jYXRjaCh0KXt0cnl7dmFyIG49bmV3KHNlbGYuQmxvYkJ1aWxkZXJ8fHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXJ8fHNlbGYuTW96QmxvYkJ1aWxkZXJ8fHNlbGYuTVNCbG9iQnVpbGRlcik7bi5hcHBlbmQoaSksci5ibG9iPTA9PT1uLmdldEJsb2IoXCJhcHBsaWNhdGlvbi96aXBcIikuc2l6ZX1jYXRjaCh0KXtyLmJsb2I9ITF9fX10cnl7ci5ub2Rlc3RyZWFtPSEhdChcInJlYWRhYmxlLXN0cmVhbVwiKS5SZWFkYWJsZX1jYXRjaCh0KXtyLm5vZGVzdHJlYW09ITF9fSx7XCJyZWFkYWJsZS1zdHJlYW1cIjoxNn1dLDMxOltmdW5jdGlvbih0LGUscyl7XCJ1c2Ugc3RyaWN0XCI7Zm9yKHZhciBvPXQoXCIuL3V0aWxzXCIpLGg9dChcIi4vc3VwcG9ydFwiKSxyPXQoXCIuL25vZGVqc1V0aWxzXCIpLGk9dChcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksdT1uZXcgQXJyYXkoMjU2KSxuPTA7bjwyNTY7bisrKXVbbl09MjUyPD1uPzY6MjQ4PD1uPzU6MjQwPD1uPzQ6MjI0PD1uPzM6MTkyPD1uPzI6MTt1WzI1NF09dVsyNTRdPTE7ZnVuY3Rpb24gYSgpe2kuY2FsbCh0aGlzLFwidXRmLTggZGVjb2RlXCIpLHRoaXMubGVmdE92ZXI9bnVsbH1mdW5jdGlvbiBsKCl7aS5jYWxsKHRoaXMsXCJ1dGYtOCBlbmNvZGVcIil9cy51dGY4ZW5jb2RlPWZ1bmN0aW9uKHQpe3JldHVybiBoLm5vZGVidWZmZXI/ci5uZXdCdWZmZXJGcm9tKHQsXCJ1dGYtOFwiKTpmdW5jdGlvbih0KXt2YXIgZSxyLGksbixzLGE9dC5sZW5ndGgsbz0wO2ZvcihuPTA7bjxhO24rKyk1NTI5Nj09KDY0NTEyJihyPXQuY2hhckNvZGVBdChuKSkpJiZuKzE8YSYmNTYzMjA9PSg2NDUxMiYoaT10LmNoYXJDb2RlQXQobisxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhpLTU2MzIwKSxuKyspLG8rPXI8MTI4PzE6cjwyMDQ4PzI6cjw2NTUzNj8zOjQ7Zm9yKGU9aC51aW50OGFycmF5P25ldyBVaW50OEFycmF5KG8pOm5ldyBBcnJheShvKSxuPXM9MDtzPG87bisrKTU1Mjk2PT0oNjQ1MTImKHI9dC5jaGFyQ29kZUF0KG4pKSkmJm4rMTxhJiY1NjMyMD09KDY0NTEyJihpPXQuY2hhckNvZGVBdChuKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKGktNTYzMjApLG4rKykscjwxMjg/ZVtzKytdPXI6KHI8MjA0OD9lW3MrK109MTkyfHI+Pj42OihyPDY1NTM2P2VbcysrXT0yMjR8cj4+PjEyOihlW3MrK109MjQwfHI+Pj4xOCxlW3MrK109MTI4fHI+Pj4xMiY2MyksZVtzKytdPTEyOHxyPj4+NiY2MyksZVtzKytdPTEyOHw2MyZyKTtyZXR1cm4gZX0odCl9LHMudXRmOGRlY29kZT1mdW5jdGlvbih0KXtyZXR1cm4gaC5ub2RlYnVmZmVyP28udHJhbnNmb3JtVG8oXCJub2RlYnVmZmVyXCIsdCkudG9TdHJpbmcoXCJ1dGYtOFwiKTpmdW5jdGlvbih0KXt2YXIgZSxyLGksbixzPXQubGVuZ3RoLGE9bmV3IEFycmF5KDIqcyk7Zm9yKGU9cj0wO2U8czspaWYoKGk9dFtlKytdKTwxMjgpYVtyKytdPWk7ZWxzZSBpZig0PChuPXVbaV0pKWFbcisrXT02NTUzMyxlKz1uLTE7ZWxzZXtmb3IoaSY9Mj09PW4/MzE6Mz09PW4/MTU6NzsxPG4mJmU8czspaT1pPDw2fDYzJnRbZSsrXSxuLS07MTxuP2FbcisrXT02NTUzMzppPDY1NTM2P2FbcisrXT1pOihpLT02NTUzNixhW3IrK109NTUyOTZ8aT4+MTAmMTAyMyxhW3IrK109NTYzMjB8MTAyMyZpKX1yZXR1cm4gYS5sZW5ndGghPT1yJiYoYS5zdWJhcnJheT9hPWEuc3ViYXJyYXkoMCxyKTphLmxlbmd0aD1yKSxvLmFwcGx5RnJvbUNoYXJDb2RlKGEpfSh0PW8udHJhbnNmb3JtVG8oaC51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIix0KSl9LG8uaW5oZXJpdHMoYSxpKSxhLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24odCl7dmFyIGU9by50cmFuc2Zvcm1UbyhoLnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiLHQuZGF0YSk7aWYodGhpcy5sZWZ0T3ZlciYmdGhpcy5sZWZ0T3Zlci5sZW5ndGgpe2lmKGgudWludDhhcnJheSl7dmFyIHI9ZTsoZT1uZXcgVWludDhBcnJheShyLmxlbmd0aCt0aGlzLmxlZnRPdmVyLmxlbmd0aCkpLnNldCh0aGlzLmxlZnRPdmVyLDApLGUuc2V0KHIsdGhpcy5sZWZ0T3Zlci5sZW5ndGgpfWVsc2UgZT10aGlzLmxlZnRPdmVyLmNvbmNhdChlKTt0aGlzLmxlZnRPdmVyPW51bGx9dmFyIGk9ZnVuY3Rpb24odCxlKXt2YXIgcjtmb3IoKGU9ZXx8dC5sZW5ndGgpPnQubGVuZ3RoJiYoZT10Lmxlbmd0aCkscj1lLTE7MDw9ciYmMTI4PT0oMTkyJnRbcl0pOylyLS07cmV0dXJuIHI8MD9lOjA9PT1yP2U6cit1W3Rbcl1dPmU/cjplfShlKSxuPWU7aSE9PWUubGVuZ3RoJiYoaC51aW50OGFycmF5PyhuPWUuc3ViYXJyYXkoMCxpKSx0aGlzLmxlZnRPdmVyPWUuc3ViYXJyYXkoaSxlLmxlbmd0aCkpOihuPWUuc2xpY2UoMCxpKSx0aGlzLmxlZnRPdmVyPWUuc2xpY2UoaSxlLmxlbmd0aCkpKSx0aGlzLnB1c2goe2RhdGE6cy51dGY4ZGVjb2RlKG4pLG1ldGE6dC5tZXRhfSl9LGEucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7dGhpcy5sZWZ0T3ZlciYmdGhpcy5sZWZ0T3Zlci5sZW5ndGgmJih0aGlzLnB1c2goe2RhdGE6cy51dGY4ZGVjb2RlKHRoaXMubGVmdE92ZXIpLG1ldGE6e319KSx0aGlzLmxlZnRPdmVyPW51bGwpfSxzLlV0ZjhEZWNvZGVXb3JrZXI9YSxvLmluaGVyaXRzKGwsaSksbC5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKHQpe3RoaXMucHVzaCh7ZGF0YTpzLnV0ZjhlbmNvZGUodC5kYXRhKSxtZXRhOnQubWV0YX0pfSxzLlV0ZjhFbmNvZGVXb3JrZXI9bH0se1wiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzJ9XSwzMjpbZnVuY3Rpb24odCxlLGEpe1widXNlIHN0cmljdFwiO3ZhciBvPXQoXCIuL3N1cHBvcnRcIiksaD10KFwiLi9iYXNlNjRcIikscj10KFwiLi9ub2RlanNVdGlsc1wiKSxpPXQoXCJzZXQtaW1tZWRpYXRlLXNoaW1cIiksdT10KFwiLi9leHRlcm5hbFwiKTtmdW5jdGlvbiBuKHQpe3JldHVybiB0fWZ1bmN0aW9uIGwodCxlKXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoOysrcillW3JdPTI1NSZ0LmNoYXJDb2RlQXQocik7cmV0dXJuIGV9YS5uZXdCbG9iPWZ1bmN0aW9uKGUscil7YS5jaGVja1N1cHBvcnQoXCJibG9iXCIpO3RyeXtyZXR1cm4gbmV3IEJsb2IoW2VdLHt0eXBlOnJ9KX1jYXRjaCh0KXt0cnl7dmFyIGk9bmV3KHNlbGYuQmxvYkJ1aWxkZXJ8fHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXJ8fHNlbGYuTW96QmxvYkJ1aWxkZXJ8fHNlbGYuTVNCbG9iQnVpbGRlcik7cmV0dXJuIGkuYXBwZW5kKGUpLGkuZ2V0QmxvYihyKX1jYXRjaCh0KXt0aHJvdyBuZXcgRXJyb3IoXCJCdWcgOiBjYW4ndCBjb25zdHJ1Y3QgdGhlIEJsb2IuXCIpfX19O3ZhciBzPXtzdHJpbmdpZnlCeUNodW5rOmZ1bmN0aW9uKHQsZSxyKXt2YXIgaT1bXSxuPTAscz10Lmxlbmd0aDtpZihzPD1yKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsdCk7Zm9yKDtuPHM7KVwiYXJyYXlcIj09PWV8fFwibm9kZWJ1ZmZlclwiPT09ZT9pLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLHQuc2xpY2UobixNYXRoLm1pbihuK3IscykpKSk6aS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCx0LnN1YmFycmF5KG4sTWF0aC5taW4obityLHMpKSkpLG4rPXI7cmV0dXJuIGkuam9pbihcIlwiKX0sc3RyaW5naWZ5QnlDaGFyOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1cIlwiLHI9MDtyPHQubGVuZ3RoO3IrKyllKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHRbcl0pO3JldHVybiBlfSxhcHBseUNhbkJlVXNlZDp7dWludDhhcnJheTpmdW5jdGlvbigpe3RyeXtyZXR1cm4gby51aW50OGFycmF5JiYxPT09U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KDEpKS5sZW5ndGh9Y2F0Y2godCl7cmV0dXJuITF9fSgpLG5vZGVidWZmZXI6ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIG8ubm9kZWJ1ZmZlciYmMT09PVN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxyLmFsbG9jQnVmZmVyKDEpKS5sZW5ndGh9Y2F0Y2godCl7cmV0dXJuITF9fSgpfX07ZnVuY3Rpb24gZih0KXt2YXIgZT02NTUzNixyPWEuZ2V0VHlwZU9mKHQpLGk9ITA7aWYoXCJ1aW50OGFycmF5XCI9PT1yP2k9cy5hcHBseUNhbkJlVXNlZC51aW50OGFycmF5Olwibm9kZWJ1ZmZlclwiPT09ciYmKGk9cy5hcHBseUNhbkJlVXNlZC5ub2RlYnVmZmVyKSxpKWZvcig7MTxlOyl0cnl7cmV0dXJuIHMuc3RyaW5naWZ5QnlDaHVuayh0LHIsZSl9Y2F0Y2godCl7ZT1NYXRoLmZsb29yKGUvMil9cmV0dXJuIHMuc3RyaW5naWZ5QnlDaGFyKHQpfWZ1bmN0aW9uIGQodCxlKXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKyllW3JdPXRbcl07cmV0dXJuIGV9YS5hcHBseUZyb21DaGFyQ29kZT1mO3ZhciBjPXt9O2Muc3RyaW5nPXtzdHJpbmc6bixhcnJheTpmdW5jdGlvbih0KXtyZXR1cm4gbCh0LG5ldyBBcnJheSh0Lmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbih0KXtyZXR1cm4gYy5zdHJpbmcudWludDhhcnJheSh0KS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24odCl7cmV0dXJuIGwodCxuZXcgVWludDhBcnJheSh0Lmxlbmd0aCkpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKHQpe3JldHVybiBsKHQsci5hbGxvY0J1ZmZlcih0Lmxlbmd0aCkpfX0sYy5hcnJheT17c3RyaW5nOmYsYXJyYXk6bixhcnJheWJ1ZmZlcjpmdW5jdGlvbih0KXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkodCkuYnVmZmVyfSx1aW50OGFycmF5OmZ1bmN0aW9uKHQpe3JldHVybiBuZXcgVWludDhBcnJheSh0KX0sbm9kZWJ1ZmZlcjpmdW5jdGlvbih0KXtyZXR1cm4gci5uZXdCdWZmZXJGcm9tKHQpfX0sYy5hcnJheWJ1ZmZlcj17c3RyaW5nOmZ1bmN0aW9uKHQpe3JldHVybiBmKG5ldyBVaW50OEFycmF5KHQpKX0sYXJyYXk6ZnVuY3Rpb24odCl7cmV0dXJuIGQobmV3IFVpbnQ4QXJyYXkodCksbmV3IEFycmF5KHQuYnl0ZUxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpuLHVpbnQ4YXJyYXk6ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBVaW50OEFycmF5KHQpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKHQpe3JldHVybiByLm5ld0J1ZmZlckZyb20obmV3IFVpbnQ4QXJyYXkodCkpfX0sYy51aW50OGFycmF5PXtzdHJpbmc6ZixhcnJheTpmdW5jdGlvbih0KXtyZXR1cm4gZCh0LG5ldyBBcnJheSh0Lmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbih0KXtyZXR1cm4gdC5idWZmZXJ9LHVpbnQ4YXJyYXk6bixub2RlYnVmZmVyOmZ1bmN0aW9uKHQpe3JldHVybiByLm5ld0J1ZmZlckZyb20odCl9fSxjLm5vZGVidWZmZXI9e3N0cmluZzpmLGFycmF5OmZ1bmN0aW9uKHQpe3JldHVybiBkKHQsbmV3IEFycmF5KHQubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKHQpe3JldHVybiBjLm5vZGVidWZmZXIudWludDhhcnJheSh0KS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24odCl7cmV0dXJuIGQodCxuZXcgVWludDhBcnJheSh0Lmxlbmd0aCkpfSxub2RlYnVmZmVyOm59LGEudHJhbnNmb3JtVG89ZnVuY3Rpb24odCxlKXtpZihlPWV8fFwiXCIsIXQpcmV0dXJuIGU7YS5jaGVja1N1cHBvcnQodCk7dmFyIHI9YS5nZXRUeXBlT2YoZSk7cmV0dXJuIGNbcl1bdF0oZSl9LGEuZ2V0VHlwZU9mPWZ1bmN0aW9uKHQpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0P1wic3RyaW5nXCI6XCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpP1wiYXJyYXlcIjpvLm5vZGVidWZmZXImJnIuaXNCdWZmZXIodCk/XCJub2RlYnVmZmVyXCI6by51aW50OGFycmF5JiZ0IGluc3RhbmNlb2YgVWludDhBcnJheT9cInVpbnQ4YXJyYXlcIjpvLmFycmF5YnVmZmVyJiZ0IGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/XCJhcnJheWJ1ZmZlclwiOnZvaWQgMH0sYS5jaGVja1N1cHBvcnQ9ZnVuY3Rpb24odCl7aWYoIW9bdC50b0xvd2VyQ2FzZSgpXSl0aHJvdyBuZXcgRXJyb3IodCtcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm1cIil9LGEuTUFYX1ZBTFVFXzE2QklUUz02NTUzNSxhLk1BWF9WQUxVRV8zMkJJVFM9LTEsYS5wcmV0dHk9ZnVuY3Rpb24odCl7dmFyIGUscixpPVwiXCI7Zm9yKHI9MDtyPCh0fHxcIlwiKS5sZW5ndGg7cisrKWkrPVwiXFxcXHhcIisoKGU9dC5jaGFyQ29kZUF0KHIpKTwxNj9cIjBcIjpcIlwiKStlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO3JldHVybiBpfSxhLmRlbGF5PWZ1bmN0aW9uKHQsZSxyKXtpKGZ1bmN0aW9uKCl7dC5hcHBseShyfHxudWxsLGV8fFtdKX0pfSxhLmluaGVyaXRzPWZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gcigpe31yLnByb3RvdHlwZT1lLnByb3RvdHlwZSx0LnByb3RvdHlwZT1uZXcgcn0sYS5leHRlbmQ9ZnVuY3Rpb24oKXt2YXIgdCxlLHI9e307Zm9yKHQ9MDt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKWZvcihlIGluIGFyZ3VtZW50c1t0XSlhcmd1bWVudHNbdF0uaGFzT3duUHJvcGVydHkoZSkmJnZvaWQgMD09PXJbZV0mJihyW2VdPWFyZ3VtZW50c1t0XVtlXSk7cmV0dXJuIHJ9LGEucHJlcGFyZUNvbnRlbnQ9ZnVuY3Rpb24ocix0LGksbixzKXtyZXR1cm4gdS5Qcm9taXNlLnJlc29sdmUodCkudGhlbihmdW5jdGlvbihpKXtyZXR1cm4gby5ibG9iJiYoaSBpbnN0YW5jZW9mIEJsb2J8fC0xIT09W1wiW29iamVjdCBGaWxlXVwiLFwiW29iamVjdCBCbG9iXVwiXS5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpKSkpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcj9uZXcgdS5Qcm9taXNlKGZ1bmN0aW9uKGUscil7dmFyIHQ9bmV3IEZpbGVSZWFkZXI7dC5vbmxvYWQ9ZnVuY3Rpb24odCl7ZSh0LnRhcmdldC5yZXN1bHQpfSx0Lm9uZXJyb3I9ZnVuY3Rpb24odCl7cih0LnRhcmdldC5lcnJvcil9LHQucmVhZEFzQXJyYXlCdWZmZXIoaSl9KTppfSkudGhlbihmdW5jdGlvbih0KXt2YXIgZT1hLmdldFR5cGVPZih0KTtyZXR1cm4gZT8oXCJhcnJheWJ1ZmZlclwiPT09ZT90PWEudHJhbnNmb3JtVG8oXCJ1aW50OGFycmF5XCIsdCk6XCJzdHJpbmdcIj09PWUmJihzP3Q9aC5kZWNvZGUodCk6aSYmITAhPT1uJiYodD1mdW5jdGlvbih0KXtyZXR1cm4gbCh0LG8udWludDhhcnJheT9uZXcgVWludDhBcnJheSh0Lmxlbmd0aCk6bmV3IEFycmF5KHQubGVuZ3RoKSl9KHQpKSksdCk6dS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW4ndCByZWFkIHRoZSBkYXRhIG9mICdcIityK1wiJy4gSXMgaXQgaW4gYSBzdXBwb3J0ZWQgSmF2YVNjcmlwdCB0eXBlIChTdHJpbmcsIEJsb2IsIEFycmF5QnVmZmVyLCBldGMpID9cIikpfSl9fSx7XCIuL2Jhc2U2NFwiOjEsXCIuL2V4dGVybmFsXCI6NixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3VwcG9ydFwiOjMwLFwic2V0LWltbWVkaWF0ZS1zaGltXCI6NTR9XSwzMzpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuL3JlYWRlci9yZWFkZXJGb3JcIiksbj10KFwiLi91dGlsc1wiKSxzPXQoXCIuL3NpZ25hdHVyZVwiKSxhPXQoXCIuL3ppcEVudHJ5XCIpLG89KHQoXCIuL3V0ZjhcIiksdChcIi4vc3VwcG9ydFwiKSk7ZnVuY3Rpb24gaCh0KXt0aGlzLmZpbGVzPVtdLHRoaXMubG9hZE9wdGlvbnM9dH1oLnByb3RvdHlwZT17Y2hlY2tTaWduYXR1cmU6ZnVuY3Rpb24odCl7aWYoIXRoaXMucmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZSh0KSl7dGhpcy5yZWFkZXIuaW5kZXgtPTQ7dmFyIGU9dGhpcy5yZWFkZXIucmVhZFN0cmluZyg0KTt0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIG9yIGJ1ZzogdW5leHBlY3RlZCBzaWduYXR1cmUgKFwiK24ucHJldHR5KGUpK1wiLCBleHBlY3RlZCBcIituLnByZXR0eSh0KStcIilcIil9fSxpc1NpZ25hdHVyZTpmdW5jdGlvbih0LGUpe3ZhciByPXRoaXMucmVhZGVyLmluZGV4O3RoaXMucmVhZGVyLnNldEluZGV4KHQpO3ZhciBpPXRoaXMucmVhZGVyLnJlYWRTdHJpbmcoNCk9PT1lO3JldHVybiB0aGlzLnJlYWRlci5zZXRJbmRleChyKSxpfSxyZWFkQmxvY2tFbmRPZkNlbnRyYWw6ZnVuY3Rpb24oKXt0aGlzLmRpc2tOdW1iZXI9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0PXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2s9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzPXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5jZW50cmFsRGlyU2l6ZT10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuY2VudHJhbERpck9mZnNldD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuemlwQ29tbWVudExlbmd0aD10aGlzLnJlYWRlci5yZWFkSW50KDIpO3ZhciB0PXRoaXMucmVhZGVyLnJlYWREYXRhKHRoaXMuemlwQ29tbWVudExlbmd0aCksZT1vLnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiLHI9bi50cmFuc2Zvcm1UbyhlLHQpO3RoaXMuemlwQ29tbWVudD10aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKHIpfSxyZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3RoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5yZWFkZXIuc2tpcCg0KSx0aGlzLmRpc2tOdW1iZXI9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2s9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5jZW50cmFsRGlyU2l6ZT10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuY2VudHJhbERpck9mZnNldD10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuemlwNjRFeHRlbnNpYmxlRGF0YT17fTtmb3IodmFyIHQsZSxyLGk9dGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUtNDQ7MDxpOyl0PXRoaXMucmVhZGVyLnJlYWRJbnQoMiksZT10aGlzLnJlYWRlci5yZWFkSW50KDQpLHI9dGhpcy5yZWFkZXIucmVhZERhdGEoZSksdGhpcy56aXA2NEV4dGVuc2libGVEYXRhW3RdPXtpZDp0LGxlbmd0aDplLHZhbHVlOnJ9fSxyZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbExvY2F0b3I6ZnVuY3Rpb24oKXtpZih0aGlzLmRpc2tXaXRoWmlwNjRDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXI9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmRpc2tzQ291bnQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSwxPHRoaXMuZGlza3NDb3VudCl0aHJvdyBuZXcgRXJyb3IoXCJNdWx0aS12b2x1bWVzIHppcCBhcmUgbm90IHN1cHBvcnRlZFwiKX0scmVhZExvY2FsRmlsZXM6ZnVuY3Rpb24oKXt2YXIgdCxlO2Zvcih0PTA7dDx0aGlzLmZpbGVzLmxlbmd0aDt0KyspZT10aGlzLmZpbGVzW3RdLHRoaXMucmVhZGVyLnNldEluZGV4KGUubG9jYWxIZWFkZXJPZmZzZXQpLHRoaXMuY2hlY2tTaWduYXR1cmUocy5MT0NBTF9GSUxFX0hFQURFUiksZS5yZWFkTG9jYWxQYXJ0KHRoaXMucmVhZGVyKSxlLmhhbmRsZVVURjgoKSxlLnByb2Nlc3NBdHRyaWJ1dGVzKCl9LHJlYWRDZW50cmFsRGlyOmZ1bmN0aW9uKCl7dmFyIHQ7Zm9yKHRoaXMucmVhZGVyLnNldEluZGV4KHRoaXMuY2VudHJhbERpck9mZnNldCk7dGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKHMuQ0VOVFJBTF9GSUxFX0hFQURFUik7KSh0PW5ldyBhKHt6aXA2NDp0aGlzLnppcDY0fSx0aGlzLmxvYWRPcHRpb25zKSkucmVhZENlbnRyYWxQYXJ0KHRoaXMucmVhZGVyKSx0aGlzLmZpbGVzLnB1c2godCk7aWYodGhpcy5jZW50cmFsRGlyUmVjb3JkcyE9PXRoaXMuZmlsZXMubGVuZ3RoJiYwIT09dGhpcy5jZW50cmFsRGlyUmVjb3JkcyYmMD09PXRoaXMuZmlsZXMubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiBleHBlY3RlZCBcIit0aGlzLmNlbnRyYWxEaXJSZWNvcmRzK1wiIHJlY29yZHMgaW4gY2VudHJhbCBkaXIsIGdvdCBcIit0aGlzLmZpbGVzLmxlbmd0aCl9LHJlYWRFbmRPZkNlbnRyYWw6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLkNFTlRSQUxfRElSRUNUT1JZX0VORCk7aWYodDwwKXRocm93IXRoaXMuaXNTaWduYXR1cmUoMCxzLkxPQ0FMX0ZJTEVfSEVBREVSKT9uZXcgRXJyb3IoXCJDYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSA6IGlzIHRoaXMgYSB6aXAgZmlsZSA/IElmIGl0IGlzLCBzZWUgaHR0cHM6Ly9zdHVrLmdpdGh1Yi5pby9qc3ppcC9kb2N1bWVudGF0aW9uL2hvd3RvL3JlYWRfemlwLmh0bWxcIik6bmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnlcIik7dGhpcy5yZWFkZXIuc2V0SW5kZXgodCk7dmFyIGU9dDtpZih0aGlzLmNoZWNrU2lnbmF0dXJlKHMuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSx0aGlzLnJlYWRCbG9ja0VuZE9mQ2VudHJhbCgpLHRoaXMuZGlza051bWJlcj09PW4uTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydD09PW4uTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2s9PT1uLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuY2VudHJhbERpclJlY29yZHM9PT1uLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuY2VudHJhbERpclNpemU9PT1uLk1BWF9WQUxVRV8zMkJJVFN8fHRoaXMuY2VudHJhbERpck9mZnNldD09PW4uTUFYX1ZBTFVFXzMyQklUUyl7aWYodGhpcy56aXA2ND0hMCwodD10aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpKTwwKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgdGhlIFpJUDY0IGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSBsb2NhdG9yXCIpO2lmKHRoaXMucmVhZGVyLnNldEluZGV4KHQpLHRoaXMuY2hlY2tTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SKSx0aGlzLnJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsTG9jYXRvcigpLCF0aGlzLmlzU2lnbmF0dXJlKHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcixzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCkmJih0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXI9dGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcjwwKSl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIHRoZSBaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnlcIik7dGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyKSx0aGlzLmNoZWNrU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSx0aGlzLnJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsKCl9dmFyIHI9dGhpcy5jZW50cmFsRGlyT2Zmc2V0K3RoaXMuY2VudHJhbERpclNpemU7dGhpcy56aXA2NCYmKHIrPTIwLHIrPTEyK3RoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplKTt2YXIgaT1lLXI7aWYoMDxpKXRoaXMuaXNTaWduYXR1cmUoZSxzLkNFTlRSQUxfRklMRV9IRUFERVIpfHwodGhpcy5yZWFkZXIuemVybz1pKTtlbHNlIGlmKGk8MCl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBtaXNzaW5nIFwiK01hdGguYWJzKGkpK1wiIGJ5dGVzLlwiKX0scHJlcGFyZVJlYWRlcjpmdW5jdGlvbih0KXt0aGlzLnJlYWRlcj1pKHQpfSxsb2FkOmZ1bmN0aW9uKHQpe3RoaXMucHJlcGFyZVJlYWRlcih0KSx0aGlzLnJlYWRFbmRPZkNlbnRyYWwoKSx0aGlzLnJlYWRDZW50cmFsRGlyKCksdGhpcy5yZWFkTG9jYWxGaWxlcygpfX0sZS5leHBvcnRzPWh9LHtcIi4vcmVhZGVyL3JlYWRlckZvclwiOjIyLFwiLi9zaWduYXR1cmVcIjoyMyxcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcEVudHJ5XCI6MzR9XSwzNDpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPXQoXCIuL3JlYWRlci9yZWFkZXJGb3JcIikscz10KFwiLi91dGlsc1wiKSxuPXQoXCIuL2NvbXByZXNzZWRPYmplY3RcIiksYT10KFwiLi9jcmMzMlwiKSxvPXQoXCIuL3V0ZjhcIiksaD10KFwiLi9jb21wcmVzc2lvbnNcIiksdT10KFwiLi9zdXBwb3J0XCIpO2Z1bmN0aW9uIGwodCxlKXt0aGlzLm9wdGlvbnM9dCx0aGlzLmxvYWRPcHRpb25zPWV9bC5wcm90b3R5cGU9e2lzRW5jcnlwdGVkOmZ1bmN0aW9uKCl7cmV0dXJuIDE9PSgxJnRoaXMuYml0RmxhZyl9LHVzZVVURjg6ZnVuY3Rpb24oKXtyZXR1cm4gMjA0OD09KDIwNDgmdGhpcy5iaXRGbGFnKX0scmVhZExvY2FsUGFydDpmdW5jdGlvbih0KXt2YXIgZSxyO2lmKHQuc2tpcCgyMiksdGhpcy5maWxlTmFtZUxlbmd0aD10LnJlYWRJbnQoMikscj10LnJlYWRJbnQoMiksdGhpcy5maWxlTmFtZT10LnJlYWREYXRhKHRoaXMuZmlsZU5hbWVMZW5ndGgpLHQuc2tpcChyKSwtMT09PXRoaXMuY29tcHJlc3NlZFNpemV8fC0xPT09dGhpcy51bmNvbXByZXNzZWRTaXplKXRocm93IG5ldyBFcnJvcihcIkJ1ZyBvciBjb3JydXB0ZWQgemlwIDogZGlkbid0IGdldCBlbm91Z2ggaW5mb3JtYXRpb24gZnJvbSB0aGUgY2VudHJhbCBkaXJlY3RvcnkgKGNvbXByZXNzZWRTaXplID09PSAtMSB8fCB1bmNvbXByZXNzZWRTaXplID09PSAtMSlcIik7aWYobnVsbD09PShlPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSBpbiBoKWlmKGguaGFzT3duUHJvcGVydHkoZSkmJmhbZV0ubWFnaWM9PT10KXJldHVybiBoW2VdO3JldHVybiBudWxsfSh0aGlzLmNvbXByZXNzaW9uTWV0aG9kKSkpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCA6IGNvbXByZXNzaW9uIFwiK3MucHJldHR5KHRoaXMuY29tcHJlc3Npb25NZXRob2QpK1wiIHVua25vd24gKGlubmVyIGZpbGUgOiBcIitzLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsdGhpcy5maWxlTmFtZSkrXCIpXCIpO3RoaXMuZGVjb21wcmVzc2VkPW5ldyBuKHRoaXMuY29tcHJlc3NlZFNpemUsdGhpcy51bmNvbXByZXNzZWRTaXplLHRoaXMuY3JjMzIsZSx0LnJlYWREYXRhKHRoaXMuY29tcHJlc3NlZFNpemUpKX0scmVhZENlbnRyYWxQYXJ0OmZ1bmN0aW9uKHQpe3RoaXMudmVyc2lvbk1hZGVCeT10LnJlYWRJbnQoMiksdC5za2lwKDIpLHRoaXMuYml0RmxhZz10LnJlYWRJbnQoMiksdGhpcy5jb21wcmVzc2lvbk1ldGhvZD10LnJlYWRTdHJpbmcoMiksdGhpcy5kYXRlPXQucmVhZERhdGUoKSx0aGlzLmNyYzMyPXQucmVhZEludCg0KSx0aGlzLmNvbXByZXNzZWRTaXplPXQucmVhZEludCg0KSx0aGlzLnVuY29tcHJlc3NlZFNpemU9dC5yZWFkSW50KDQpO3ZhciBlPXQucmVhZEludCgyKTtpZih0aGlzLmV4dHJhRmllbGRzTGVuZ3RoPXQucmVhZEludCgyKSx0aGlzLmZpbGVDb21tZW50TGVuZ3RoPXQucmVhZEludCgyKSx0aGlzLmRpc2tOdW1iZXJTdGFydD10LnJlYWRJbnQoMiksdGhpcy5pbnRlcm5hbEZpbGVBdHRyaWJ1dGVzPXQucmVhZEludCgyKSx0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXM9dC5yZWFkSW50KDQpLHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9dC5yZWFkSW50KDQpLHRoaXMuaXNFbmNyeXB0ZWQoKSl0aHJvdyBuZXcgRXJyb3IoXCJFbmNyeXB0ZWQgemlwIGFyZSBub3Qgc3VwcG9ydGVkXCIpO3Quc2tpcChlKSx0aGlzLnJlYWRFeHRyYUZpZWxkcyh0KSx0aGlzLnBhcnNlWklQNjRFeHRyYUZpZWxkKHQpLHRoaXMuZmlsZUNvbW1lbnQ9dC5yZWFkRGF0YSh0aGlzLmZpbGVDb21tZW50TGVuZ3RoKX0scHJvY2Vzc0F0dHJpYnV0ZXM6ZnVuY3Rpb24oKXt0aGlzLnVuaXhQZXJtaXNzaW9ucz1udWxsLHRoaXMuZG9zUGVybWlzc2lvbnM9bnVsbDt2YXIgdD10aGlzLnZlcnNpb25NYWRlQnk+Pjg7dGhpcy5kaXI9ISEoMTYmdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzKSwwPT10JiYodGhpcy5kb3NQZXJtaXNzaW9ucz02MyZ0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMpLDM9PXQmJih0aGlzLnVuaXhQZXJtaXNzaW9ucz10aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXM+PjE2JjY1NTM1KSx0aGlzLmRpcnx8XCIvXCIhPT10aGlzLmZpbGVOYW1lU3RyLnNsaWNlKC0xKXx8KHRoaXMuZGlyPSEwKX0scGFyc2VaSVA2NEV4dHJhRmllbGQ6ZnVuY3Rpb24odCl7aWYodGhpcy5leHRyYUZpZWxkc1sxXSl7dmFyIGU9aSh0aGlzLmV4dHJhRmllbGRzWzFdLnZhbHVlKTt0aGlzLnVuY29tcHJlc3NlZFNpemU9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLnVuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDgpKSx0aGlzLmNvbXByZXNzZWRTaXplPT09cy5NQVhfVkFMVUVfMzJCSVRTJiYodGhpcy5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoOCkpLHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0PWUucmVhZEludCg4KSksdGhpcy5kaXNrTnVtYmVyU3RhcnQ9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmRpc2tOdW1iZXJTdGFydD1lLnJlYWRJbnQoNCkpfX0scmVhZEV4dHJhRmllbGRzOmZ1bmN0aW9uKHQpe3ZhciBlLHIsaSxuPXQuaW5kZXgrdGhpcy5leHRyYUZpZWxkc0xlbmd0aDtmb3IodGhpcy5leHRyYUZpZWxkc3x8KHRoaXMuZXh0cmFGaWVsZHM9e30pO3QuaW5kZXg8bjspZT10LnJlYWRJbnQoMikscj10LnJlYWRJbnQoMiksaT10LnJlYWREYXRhKHIpLHRoaXMuZXh0cmFGaWVsZHNbZV09e2lkOmUsbGVuZ3RoOnIsdmFsdWU6aX19LGhhbmRsZVVURjg6ZnVuY3Rpb24oKXt2YXIgdD11LnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiO2lmKHRoaXMudXNlVVRGOCgpKXRoaXMuZmlsZU5hbWVTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZU5hbWUpLHRoaXMuZmlsZUNvbW1lbnRTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZUNvbW1lbnQpO2Vsc2V7dmFyIGU9dGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoKCk7aWYobnVsbCE9PWUpdGhpcy5maWxlTmFtZVN0cj1lO2Vsc2V7dmFyIHI9cy50cmFuc2Zvcm1Ubyh0LHRoaXMuZmlsZU5hbWUpO3RoaXMuZmlsZU5hbWVTdHI9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShyKX12YXIgaT10aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQoKTtpZihudWxsIT09aSl0aGlzLmZpbGVDb21tZW50U3RyPWk7ZWxzZXt2YXIgbj1zLnRyYW5zZm9ybVRvKHQsdGhpcy5maWxlQ29tbWVudCk7dGhpcy5maWxlQ29tbWVudFN0cj10aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKG4pfX19LGZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGg6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmV4dHJhRmllbGRzWzI4Nzg5XTtpZih0KXt2YXIgZT1pKHQudmFsdWUpO3JldHVybiAxIT09ZS5yZWFkSW50KDEpP251bGw6YSh0aGlzLmZpbGVOYW1lKSE9PWUucmVhZEludCg0KT9udWxsOm8udXRmOGRlY29kZShlLnJlYWREYXRhKHQubGVuZ3RoLTUpKX1yZXR1cm4gbnVsbH0sZmluZEV4dHJhRmllbGRVbmljb2RlQ29tbWVudDpmdW5jdGlvbigpe3ZhciB0PXRoaXMuZXh0cmFGaWVsZHNbMjU0NjFdO2lmKHQpe3ZhciBlPWkodC52YWx1ZSk7cmV0dXJuIDEhPT1lLnJlYWRJbnQoMSk/bnVsbDphKHRoaXMuZmlsZUNvbW1lbnQpIT09ZS5yZWFkSW50KDQpP251bGw6by51dGY4ZGVjb2RlKGUucmVhZERhdGEodC5sZW5ndGgtNSkpfXJldHVybiBudWxsfX0sZS5leHBvcnRzPWx9LHtcIi4vY29tcHJlc3NlZE9iamVjdFwiOjIsXCIuL2NvbXByZXNzaW9uc1wiOjMsXCIuL2NyYzMyXCI6NCxcIi4vcmVhZGVyL3JlYWRlckZvclwiOjIyLFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMn1dLDM1OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaSh0LGUscil7dGhpcy5uYW1lPXQsdGhpcy5kaXI9ci5kaXIsdGhpcy5kYXRlPXIuZGF0ZSx0aGlzLmNvbW1lbnQ9ci5jb21tZW50LHRoaXMudW5peFBlcm1pc3Npb25zPXIudW5peFBlcm1pc3Npb25zLHRoaXMuZG9zUGVybWlzc2lvbnM9ci5kb3NQZXJtaXNzaW9ucyx0aGlzLl9kYXRhPWUsdGhpcy5fZGF0YUJpbmFyeT1yLmJpbmFyeSx0aGlzLm9wdGlvbnM9e2NvbXByZXNzaW9uOnIuY29tcHJlc3Npb24sY29tcHJlc3Npb25PcHRpb25zOnIuY29tcHJlc3Npb25PcHRpb25zfX12YXIgcz10KFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCIpLG49dChcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIiksYT10KFwiLi91dGY4XCIpLG89dChcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxoPXQoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO2kucHJvdG90eXBlPXtpbnRlcm5hbFN0cmVhbTpmdW5jdGlvbih0KXt2YXIgZT1udWxsLHI9XCJzdHJpbmdcIjt0cnl7aWYoIXQpdGhyb3cgbmV3IEVycm9yKFwiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLlwiKTt2YXIgaT1cInN0cmluZ1wiPT09KHI9dC50b0xvd2VyQ2FzZSgpKXx8XCJ0ZXh0XCI9PT1yO1wiYmluYXJ5c3RyaW5nXCIhPT1yJiZcInRleHRcIiE9PXJ8fChyPVwic3RyaW5nXCIpLGU9dGhpcy5fZGVjb21wcmVzc1dvcmtlcigpO3ZhciBuPSF0aGlzLl9kYXRhQmluYXJ5O24mJiFpJiYoZT1lLnBpcGUobmV3IGEuVXRmOEVuY29kZVdvcmtlcikpLCFuJiZpJiYoZT1lLnBpcGUobmV3IGEuVXRmOERlY29kZVdvcmtlcikpfWNhdGNoKHQpeyhlPW5ldyBoKFwiZXJyb3JcIikpLmVycm9yKHQpfXJldHVybiBuZXcgcyhlLHIsXCJcIil9LGFzeW5jOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuaW50ZXJuYWxTdHJlYW0odCkuYWNjdW11bGF0ZShlKX0sbm9kZVN0cmVhbTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmludGVybmFsU3RyZWFtKHR8fFwibm9kZWJ1ZmZlclwiKS50b05vZGVqc1N0cmVhbShlKX0sX2NvbXByZXNzV29ya2VyOmZ1bmN0aW9uKHQsZSl7aWYodGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8mJnRoaXMuX2RhdGEuY29tcHJlc3Npb24ubWFnaWM9PT10Lm1hZ2ljKXJldHVybiB0aGlzLl9kYXRhLmdldENvbXByZXNzZWRXb3JrZXIoKTt2YXIgcj10aGlzLl9kZWNvbXByZXNzV29ya2VyKCk7cmV0dXJuIHRoaXMuX2RhdGFCaW5hcnl8fChyPXIucGlwZShuZXcgYS5VdGY4RW5jb2RlV29ya2VyKSksby5jcmVhdGVXb3JrZXJGcm9tKHIsdCxlKX0sX2RlY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8/dGhpcy5fZGF0YS5nZXRDb250ZW50V29ya2VyKCk6dGhpcy5fZGF0YSBpbnN0YW5jZW9mIGg/dGhpcy5fZGF0YTpuZXcgbih0aGlzLl9kYXRhKX19O2Zvcih2YXIgdT1bXCJhc1RleHRcIixcImFzQmluYXJ5XCIsXCJhc05vZGVCdWZmZXJcIixcImFzVWludDhBcnJheVwiLFwiYXNBcnJheUJ1ZmZlclwiXSxsPWZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGY9MDtmPHUubGVuZ3RoO2YrKylpLnByb3RvdHlwZVt1W2ZdXT1sO2UuZXhwb3J0cz1pfSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiOjI3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCI6MjksXCIuL3V0ZjhcIjozMX1dLDM2OltmdW5jdGlvbih0LGwsZSl7KGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO3ZhciByLGksdD1lLk11dGF0aW9uT2JzZXJ2ZXJ8fGUuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtpZih0KXt2YXIgbj0wLHM9bmV3IHQodSksYT1lLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO3Mub2JzZXJ2ZShhLHtjaGFyYWN0ZXJEYXRhOiEwfSkscj1mdW5jdGlvbigpe2EuZGF0YT1uPSsrbiUyfX1lbHNlIGlmKGUuc2V0SW1tZWRpYXRlfHx2b2lkIDA9PT1lLk1lc3NhZ2VDaGFubmVsKXI9XCJkb2N1bWVudFwiaW4gZSYmXCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIGUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKT9mdW5jdGlvbigpe3ZhciB0PWUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe3UoKSx0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KSx0PW51bGx9LGUuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHQpfTpmdW5jdGlvbigpe3NldFRpbWVvdXQodSwwKX07ZWxzZXt2YXIgbz1uZXcgZS5NZXNzYWdlQ2hhbm5lbDtvLnBvcnQxLm9ubWVzc2FnZT11LHI9ZnVuY3Rpb24oKXtvLnBvcnQyLnBvc3RNZXNzYWdlKDApfX12YXIgaD1bXTtmdW5jdGlvbiB1KCl7dmFyIHQsZTtpPSEwO2Zvcih2YXIgcj1oLmxlbmd0aDtyOyl7Zm9yKGU9aCxoPVtdLHQ9LTE7Kyt0PHI7KWVbdF0oKTtyPWgubGVuZ3RofWk9ITF9bC5leHBvcnRzPWZ1bmN0aW9uKHQpezEhPT1oLnB1c2godCl8fGl8fHIoKX19KS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHt9XSwzNzpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBuPXQoXCJpbW1lZGlhdGVcIik7ZnVuY3Rpb24gdSgpe312YXIgbD17fSxzPVtcIlJFSkVDVEVEXCJdLGE9W1wiRlVMRklMTEVEXCJdLGk9W1wiUEVORElOR1wiXTtmdW5jdGlvbiBvKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcihcInJlc29sdmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTt0aGlzLnN0YXRlPWksdGhpcy5xdWV1ZT1bXSx0aGlzLm91dGNvbWU9dm9pZCAwLHQhPT11JiZjKHRoaXMsdCl9ZnVuY3Rpb24gaCh0LGUscil7dGhpcy5wcm9taXNlPXQsXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKHRoaXMub25GdWxmaWxsZWQ9ZSx0aGlzLmNhbGxGdWxmaWxsZWQ9dGhpcy5vdGhlckNhbGxGdWxmaWxsZWQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHImJih0aGlzLm9uUmVqZWN0ZWQ9cix0aGlzLmNhbGxSZWplY3RlZD10aGlzLm90aGVyQ2FsbFJlamVjdGVkKX1mdW5jdGlvbiBmKGUscixpKXtuKGZ1bmN0aW9uKCl7dmFyIHQ7dHJ5e3Q9cihpKX1jYXRjaCh0KXtyZXR1cm4gbC5yZWplY3QoZSx0KX10PT09ZT9sLnJlamVjdChlLG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVzb2x2ZSBwcm9taXNlIHdpdGggaXRzZWxmXCIpKTpsLnJlc29sdmUoZSx0KX0pfWZ1bmN0aW9uIGQodCl7dmFyIGU9dCYmdC50aGVuO2lmKHQmJihcIm9iamVjdFwiPT10eXBlb2YgdHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUpcmV0dXJuIGZ1bmN0aW9uKCl7ZS5hcHBseSh0LGFyZ3VtZW50cyl9fWZ1bmN0aW9uIGMoZSx0KXt2YXIgcj0hMTtmdW5jdGlvbiBpKHQpe3J8fChyPSEwLGwucmVqZWN0KGUsdCkpfWZ1bmN0aW9uIG4odCl7cnx8KHI9ITAsbC5yZXNvbHZlKGUsdCkpfXZhciBzPXAoZnVuY3Rpb24oKXt0KG4saSl9KTtcImVycm9yXCI9PT1zLnN0YXR1cyYmaShzLnZhbHVlKX1mdW5jdGlvbiBwKHQsZSl7dmFyIHI9e307dHJ5e3IudmFsdWU9dChlKSxyLnN0YXR1cz1cInN1Y2Nlc3NcIn1jYXRjaCh0KXtyLnN0YXR1cz1cImVycm9yXCIsci52YWx1ZT10fXJldHVybiByfShlLmV4cG9ydHM9bykucHJvdG90eXBlLmZpbmFsbHk9ZnVuY3Rpb24oZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSlyZXR1cm4gdGhpczt2YXIgcj10aGlzLmNvbnN0cnVjdG9yO3JldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24odCl7cmV0dXJuIHIucmVzb2x2ZShlKCkpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gdH0pfSxmdW5jdGlvbih0KXtyZXR1cm4gci5yZXNvbHZlKGUoKSkudGhlbihmdW5jdGlvbigpe3Rocm93IHR9KX0pfSxvLnByb3RvdHlwZS5jYXRjaD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50aGVuKG51bGwsdCl9LG8ucHJvdG90eXBlLnRoZW49ZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0JiZ0aGlzLnN0YXRlPT09YXx8XCJmdW5jdGlvblwiIT10eXBlb2YgZSYmdGhpcy5zdGF0ZT09PXMpcmV0dXJuIHRoaXM7dmFyIHI9bmV3IHRoaXMuY29uc3RydWN0b3IodSk7dGhpcy5zdGF0ZSE9PWk/ZihyLHRoaXMuc3RhdGU9PT1hP3Q6ZSx0aGlzLm91dGNvbWUpOnRoaXMucXVldWUucHVzaChuZXcgaChyLHQsZSkpO3JldHVybiByfSxoLnByb3RvdHlwZS5jYWxsRnVsZmlsbGVkPWZ1bmN0aW9uKHQpe2wucmVzb2x2ZSh0aGlzLnByb21pc2UsdCl9LGgucHJvdG90eXBlLm90aGVyQ2FsbEZ1bGZpbGxlZD1mdW5jdGlvbih0KXtmKHRoaXMucHJvbWlzZSx0aGlzLm9uRnVsZmlsbGVkLHQpfSxoLnByb3RvdHlwZS5jYWxsUmVqZWN0ZWQ9ZnVuY3Rpb24odCl7bC5yZWplY3QodGhpcy5wcm9taXNlLHQpfSxoLnByb3RvdHlwZS5vdGhlckNhbGxSZWplY3RlZD1mdW5jdGlvbih0KXtmKHRoaXMucHJvbWlzZSx0aGlzLm9uUmVqZWN0ZWQsdCl9LGwucmVzb2x2ZT1mdW5jdGlvbih0LGUpe3ZhciByPXAoZCxlKTtpZihcImVycm9yXCI9PT1yLnN0YXR1cylyZXR1cm4gbC5yZWplY3QodCxyLnZhbHVlKTt2YXIgaT1yLnZhbHVlO2lmKGkpYyh0LGkpO2Vsc2V7dC5zdGF0ZT1hLHQub3V0Y29tZT1lO2Zvcih2YXIgbj0tMSxzPXQucXVldWUubGVuZ3RoOysrbjxzOyl0LnF1ZXVlW25dLmNhbGxGdWxmaWxsZWQoZSl9cmV0dXJuIHR9LGwucmVqZWN0PWZ1bmN0aW9uKHQsZSl7dC5zdGF0ZT1zLHQub3V0Y29tZT1lO2Zvcih2YXIgcj0tMSxpPXQucXVldWUubGVuZ3RoOysrcjxpOyl0LnF1ZXVlW3JdLmNhbGxSZWplY3RlZChlKTtyZXR1cm4gdH0sby5yZXNvbHZlPWZ1bmN0aW9uKHQpe2lmKHQgaW5zdGFuY2VvZiB0aGlzKXJldHVybiB0O3JldHVybiBsLnJlc29sdmUobmV3IHRoaXModSksdCl9LG8ucmVqZWN0PWZ1bmN0aW9uKHQpe3ZhciBlPW5ldyB0aGlzKHUpO3JldHVybiBsLnJlamVjdChlLHQpfSxvLmFsbD1mdW5jdGlvbih0KXt2YXIgcj10aGlzO2lmKFwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSlyZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcihcIm11c3QgYmUgYW4gYXJyYXlcIikpO3ZhciBpPXQubGVuZ3RoLG49ITE7aWYoIWkpcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7dmFyIHM9bmV3IEFycmF5KGkpLGE9MCxlPS0xLG89bmV3IHRoaXModSk7Zm9yKDsrK2U8aTspaCh0W2VdLGUpO3JldHVybiBvO2Z1bmN0aW9uIGgodCxlKXtyLnJlc29sdmUodCkudGhlbihmdW5jdGlvbih0KXtzW2VdPXQsKythIT09aXx8bnx8KG49ITAsbC5yZXNvbHZlKG8scykpfSxmdW5jdGlvbih0KXtufHwobj0hMCxsLnJlamVjdChvLHQpKX0pfX0sby5yYWNlPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7aWYoXCJbb2JqZWN0IEFycmF5XVwiIT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpKXJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKFwibXVzdCBiZSBhbiBhcnJheVwiKSk7dmFyIHI9dC5sZW5ndGgsaT0hMTtpZighcilyZXR1cm4gdGhpcy5yZXNvbHZlKFtdKTt2YXIgbj0tMSxzPW5ldyB0aGlzKHUpO2Zvcig7KytuPHI7KWE9dFtuXSxlLnJlc29sdmUoYSkudGhlbihmdW5jdGlvbih0KXtpfHwoaT0hMCxsLnJlc29sdmUocyx0KSl9LGZ1bmN0aW9uKHQpe2l8fChpPSEwLGwucmVqZWN0KHMsdCkpfSk7dmFyIGE7cmV0dXJuIHN9fSx7aW1tZWRpYXRlOjM2fV0sMzg6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT17fTsoMCx0KFwiLi9saWIvdXRpbHMvY29tbW9uXCIpLmFzc2lnbikoaSx0KFwiLi9saWIvZGVmbGF0ZVwiKSx0KFwiLi9saWIvaW5mbGF0ZVwiKSx0KFwiLi9saWIvemxpYi9jb25zdGFudHNcIikpLGUuZXhwb3J0cz1pfSx7XCIuL2xpYi9kZWZsYXRlXCI6MzksXCIuL2xpYi9pbmZsYXRlXCI6NDAsXCIuL2xpYi91dGlscy9jb21tb25cIjo0MSxcIi4vbGliL3psaWIvY29uc3RhbnRzXCI6NDR9XSwzOTpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBhPXQoXCIuL3psaWIvZGVmbGF0ZVwiKSxvPXQoXCIuL3V0aWxzL2NvbW1vblwiKSxoPXQoXCIuL3V0aWxzL3N0cmluZ3NcIiksbj10KFwiLi96bGliL21lc3NhZ2VzXCIpLHM9dChcIi4vemxpYi96c3RyZWFtXCIpLHU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxsPTAsZj0tMSxkPTAsYz04O2Z1bmN0aW9uIHAodCl7aWYoISh0aGlzIGluc3RhbmNlb2YgcCkpcmV0dXJuIG5ldyBwKHQpO3RoaXMub3B0aW9ucz1vLmFzc2lnbih7bGV2ZWw6ZixtZXRob2Q6YyxjaHVua1NpemU6MTYzODQsd2luZG93Qml0czoxNSxtZW1MZXZlbDo4LHN0cmF0ZWd5OmQsdG86XCJcIn0sdHx8e30pO3ZhciBlPXRoaXMub3B0aW9ucztlLnJhdyYmMDxlLndpbmRvd0JpdHM/ZS53aW5kb3dCaXRzPS1lLndpbmRvd0JpdHM6ZS5nemlwJiYwPGUud2luZG93Qml0cyYmZS53aW5kb3dCaXRzPDE2JiYoZS53aW5kb3dCaXRzKz0xNiksdGhpcy5lcnI9MCx0aGlzLm1zZz1cIlwiLHRoaXMuZW5kZWQ9ITEsdGhpcy5jaHVua3M9W10sdGhpcy5zdHJtPW5ldyBzLHRoaXMuc3RybS5hdmFpbF9vdXQ9MDt2YXIgcj1hLmRlZmxhdGVJbml0Mih0aGlzLnN0cm0sZS5sZXZlbCxlLm1ldGhvZCxlLndpbmRvd0JpdHMsZS5tZW1MZXZlbCxlLnN0cmF0ZWd5KTtpZihyIT09bCl0aHJvdyBuZXcgRXJyb3IobltyXSk7aWYoZS5oZWFkZXImJmEuZGVmbGF0ZVNldEhlYWRlcih0aGlzLnN0cm0sZS5oZWFkZXIpLGUuZGljdGlvbmFyeSl7dmFyIGk7aWYoaT1cInN0cmluZ1wiPT10eXBlb2YgZS5kaWN0aW9uYXJ5P2guc3RyaW5nMmJ1ZihlLmRpY3Rpb25hcnkpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PXUuY2FsbChlLmRpY3Rpb25hcnkpP25ldyBVaW50OEFycmF5KGUuZGljdGlvbmFyeSk6ZS5kaWN0aW9uYXJ5LChyPWEuZGVmbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLGkpKSE9PWwpdGhyb3cgbmV3IEVycm9yKG5bcl0pO3RoaXMuX2RpY3Rfc2V0PSEwfX1mdW5jdGlvbiBpKHQsZSl7dmFyIHI9bmV3IHAoZSk7aWYoci5wdXNoKHQsITApLHIuZXJyKXRocm93IHIubXNnfHxuW3IuZXJyXTtyZXR1cm4gci5yZXN1bHR9cC5wcm90b3R5cGUucHVzaD1mdW5jdGlvbih0LGUpe3ZhciByLGksbj10aGlzLnN0cm0scz10aGlzLm9wdGlvbnMuY2h1bmtTaXplO2lmKHRoaXMuZW5kZWQpcmV0dXJuITE7aT1lPT09fn5lP2U6ITA9PT1lPzQ6MCxcInN0cmluZ1wiPT10eXBlb2YgdD9uLmlucHV0PWguc3RyaW5nMmJ1Zih0KTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT11LmNhbGwodCk/bi5pbnB1dD1uZXcgVWludDhBcnJheSh0KTpuLmlucHV0PXQsbi5uZXh0X2luPTAsbi5hdmFpbF9pbj1uLmlucHV0Lmxlbmd0aDtkb3tpZigwPT09bi5hdmFpbF9vdXQmJihuLm91dHB1dD1uZXcgby5CdWY4KHMpLG4ubmV4dF9vdXQ9MCxuLmF2YWlsX291dD1zKSwxIT09KHI9YS5kZWZsYXRlKG4saSkpJiZyIT09bClyZXR1cm4gdGhpcy5vbkVuZChyKSwhKHRoaXMuZW5kZWQ9ITApOzAhPT1uLmF2YWlsX291dCYmKDAhPT1uLmF2YWlsX2lufHw0IT09aSYmMiE9PWkpfHwoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz90aGlzLm9uRGF0YShoLmJ1ZjJiaW5zdHJpbmcoby5zaHJpbmtCdWYobi5vdXRwdXQsbi5uZXh0X291dCkpKTp0aGlzLm9uRGF0YShvLnNocmlua0J1ZihuLm91dHB1dCxuLm5leHRfb3V0KSkpfXdoaWxlKCgwPG4uYXZhaWxfaW58fDA9PT1uLmF2YWlsX291dCkmJjEhPT1yKTtyZXR1cm4gND09PWk/KHI9YS5kZWZsYXRlRW5kKHRoaXMuc3RybSksdGhpcy5vbkVuZChyKSx0aGlzLmVuZGVkPSEwLHI9PT1sKToyIT09aXx8KHRoaXMub25FbmQobCksIShuLmF2YWlsX291dD0wKSl9LHAucHJvdG90eXBlLm9uRGF0YT1mdW5jdGlvbih0KXt0aGlzLmNodW5rcy5wdXNoKHQpfSxwLnByb3RvdHlwZS5vbkVuZD1mdW5jdGlvbih0KXt0PT09bCYmKFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5yZXN1bHQ9dGhpcy5jaHVua3Muam9pbihcIlwiKTp0aGlzLnJlc3VsdD1vLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSx0aGlzLmNodW5rcz1bXSx0aGlzLmVycj10LHRoaXMubXNnPXRoaXMuc3RybS5tc2d9LHIuRGVmbGF0ZT1wLHIuZGVmbGF0ZT1pLHIuZGVmbGF0ZVJhdz1mdW5jdGlvbih0LGUpe3JldHVybihlPWV8fHt9KS5yYXc9ITAsaSh0LGUpfSxyLmd6aXA9ZnVuY3Rpb24odCxlKXtyZXR1cm4oZT1lfHx7fSkuZ3ppcD0hMCxpKHQsZSl9fSx7XCIuL3V0aWxzL2NvbW1vblwiOjQxLFwiLi91dGlscy9zdHJpbmdzXCI6NDIsXCIuL3psaWIvZGVmbGF0ZVwiOjQ2LFwiLi96bGliL21lc3NhZ2VzXCI6NTEsXCIuL3psaWIvenN0cmVhbVwiOjUzfV0sNDA6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgZD10KFwiLi96bGliL2luZmxhdGVcIiksYz10KFwiLi91dGlscy9jb21tb25cIikscD10KFwiLi91dGlscy9zdHJpbmdzXCIpLG09dChcIi4vemxpYi9jb25zdGFudHNcIiksaT10KFwiLi96bGliL21lc3NhZ2VzXCIpLG49dChcIi4vemxpYi96c3RyZWFtXCIpLHM9dChcIi4vemxpYi9nemhlYWRlclwiKSxfPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7ZnVuY3Rpb24gYSh0KXtpZighKHRoaXMgaW5zdGFuY2VvZiBhKSlyZXR1cm4gbmV3IGEodCk7dGhpcy5vcHRpb25zPWMuYXNzaWduKHtjaHVua1NpemU6MTYzODQsd2luZG93Qml0czowLHRvOlwiXCJ9LHR8fHt9KTt2YXIgZT10aGlzLm9wdGlvbnM7ZS5yYXcmJjA8PWUud2luZG93Qml0cyYmZS53aW5kb3dCaXRzPDE2JiYoZS53aW5kb3dCaXRzPS1lLndpbmRvd0JpdHMsMD09PWUud2luZG93Qml0cyYmKGUud2luZG93Qml0cz0tMTUpKSwhKDA8PWUud2luZG93Qml0cyYmZS53aW5kb3dCaXRzPDE2KXx8dCYmdC53aW5kb3dCaXRzfHwoZS53aW5kb3dCaXRzKz0zMiksMTU8ZS53aW5kb3dCaXRzJiZlLndpbmRvd0JpdHM8NDgmJjA9PSgxNSZlLndpbmRvd0JpdHMpJiYoZS53aW5kb3dCaXRzfD0xNSksdGhpcy5lcnI9MCx0aGlzLm1zZz1cIlwiLHRoaXMuZW5kZWQ9ITEsdGhpcy5jaHVua3M9W10sdGhpcy5zdHJtPW5ldyBuLHRoaXMuc3RybS5hdmFpbF9vdXQ9MDt2YXIgcj1kLmluZmxhdGVJbml0Mih0aGlzLnN0cm0sZS53aW5kb3dCaXRzKTtpZihyIT09bS5aX09LKXRocm93IG5ldyBFcnJvcihpW3JdKTt0aGlzLmhlYWRlcj1uZXcgcyxkLmluZmxhdGVHZXRIZWFkZXIodGhpcy5zdHJtLHRoaXMuaGVhZGVyKX1mdW5jdGlvbiBvKHQsZSl7dmFyIHI9bmV3IGEoZSk7aWYoci5wdXNoKHQsITApLHIuZXJyKXRocm93IHIubXNnfHxpW3IuZXJyXTtyZXR1cm4gci5yZXN1bHR9YS5wcm90b3R5cGUucHVzaD1mdW5jdGlvbih0LGUpe3ZhciByLGksbixzLGEsbyxoPXRoaXMuc3RybSx1PXRoaXMub3B0aW9ucy5jaHVua1NpemUsbD10aGlzLm9wdGlvbnMuZGljdGlvbmFyeSxmPSExO2lmKHRoaXMuZW5kZWQpcmV0dXJuITE7aT1lPT09fn5lP2U6ITA9PT1lP20uWl9GSU5JU0g6bS5aX05PX0ZMVVNILFwic3RyaW5nXCI9PXR5cGVvZiB0P2guaW5wdXQ9cC5iaW5zdHJpbmcyYnVmKHQpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PV8uY2FsbCh0KT9oLmlucHV0PW5ldyBVaW50OEFycmF5KHQpOmguaW5wdXQ9dCxoLm5leHRfaW49MCxoLmF2YWlsX2luPWguaW5wdXQubGVuZ3RoO2Rve2lmKDA9PT1oLmF2YWlsX291dCYmKGgub3V0cHV0PW5ldyBjLkJ1ZjgodSksaC5uZXh0X291dD0wLGguYXZhaWxfb3V0PXUpLChyPWQuaW5mbGF0ZShoLG0uWl9OT19GTFVTSCkpPT09bS5aX05FRURfRElDVCYmbCYmKG89XCJzdHJpbmdcIj09dHlwZW9mIGw/cC5zdHJpbmcyYnVmKGwpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PV8uY2FsbChsKT9uZXcgVWludDhBcnJheShsKTpsLHI9ZC5pbmZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sbykpLHI9PT1tLlpfQlVGX0VSUk9SJiYhMD09PWYmJihyPW0uWl9PSyxmPSExKSxyIT09bS5aX1NUUkVBTV9FTkQmJnIhPT1tLlpfT0spcmV0dXJuIHRoaXMub25FbmQociksISh0aGlzLmVuZGVkPSEwKTtoLm5leHRfb3V0JiYoMCE9PWguYXZhaWxfb3V0JiZyIT09bS5aX1NUUkVBTV9FTkQmJigwIT09aC5hdmFpbF9pbnx8aSE9PW0uWl9GSU5JU0gmJmkhPT1tLlpfU1lOQ19GTFVTSCl8fChcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvPyhuPXAudXRmOGJvcmRlcihoLm91dHB1dCxoLm5leHRfb3V0KSxzPWgubmV4dF9vdXQtbixhPXAuYnVmMnN0cmluZyhoLm91dHB1dCxuKSxoLm5leHRfb3V0PXMsaC5hdmFpbF9vdXQ9dS1zLHMmJmMuYXJyYXlTZXQoaC5vdXRwdXQsaC5vdXRwdXQsbixzLDApLHRoaXMub25EYXRhKGEpKTp0aGlzLm9uRGF0YShjLnNocmlua0J1ZihoLm91dHB1dCxoLm5leHRfb3V0KSkpKSwwPT09aC5hdmFpbF9pbiYmMD09PWguYXZhaWxfb3V0JiYoZj0hMCl9d2hpbGUoKDA8aC5hdmFpbF9pbnx8MD09PWguYXZhaWxfb3V0KSYmciE9PW0uWl9TVFJFQU1fRU5EKTtyZXR1cm4gcj09PW0uWl9TVFJFQU1fRU5EJiYoaT1tLlpfRklOSVNIKSxpPT09bS5aX0ZJTklTSD8ocj1kLmluZmxhdGVFbmQodGhpcy5zdHJtKSx0aGlzLm9uRW5kKHIpLHRoaXMuZW5kZWQ9ITAscj09PW0uWl9PSyk6aSE9PW0uWl9TWU5DX0ZMVVNIfHwodGhpcy5vbkVuZChtLlpfT0spLCEoaC5hdmFpbF9vdXQ9MCkpfSxhLnByb3RvdHlwZS5vbkRhdGE9ZnVuY3Rpb24odCl7dGhpcy5jaHVua3MucHVzaCh0KX0sYS5wcm90b3R5cGUub25FbmQ9ZnVuY3Rpb24odCl7dD09PW0uWl9PSyYmKFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5yZXN1bHQ9dGhpcy5jaHVua3Muam9pbihcIlwiKTp0aGlzLnJlc3VsdD1jLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSx0aGlzLmNodW5rcz1bXSx0aGlzLmVycj10LHRoaXMubXNnPXRoaXMuc3RybS5tc2d9LHIuSW5mbGF0ZT1hLHIuaW5mbGF0ZT1vLHIuaW5mbGF0ZVJhdz1mdW5jdGlvbih0LGUpe3JldHVybihlPWV8fHt9KS5yYXc9ITAsbyh0LGUpfSxyLnVuZ3ppcD1vfSx7XCIuL3V0aWxzL2NvbW1vblwiOjQxLFwiLi91dGlscy9zdHJpbmdzXCI6NDIsXCIuL3psaWIvY29uc3RhbnRzXCI6NDQsXCIuL3psaWIvZ3poZWFkZXJcIjo0NyxcIi4vemxpYi9pbmZsYXRlXCI6NDksXCIuL3psaWIvbWVzc2FnZXNcIjo1MSxcIi4vemxpYi96c3RyZWFtXCI6NTN9XSw0MTpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBpPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDE2QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBJbnQzMkFycmF5O3IuYXNzaWduPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7ZS5sZW5ndGg7KXt2YXIgcj1lLnNoaWZ0KCk7aWYocil7aWYoXCJvYmplY3RcIiE9dHlwZW9mIHIpdGhyb3cgbmV3IFR5cGVFcnJvcihyK1wibXVzdCBiZSBub24tb2JqZWN0XCIpO2Zvcih2YXIgaSBpbiByKXIuaGFzT3duUHJvcGVydHkoaSkmJih0W2ldPXJbaV0pfX1yZXR1cm4gdH0sci5zaHJpbmtCdWY9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5sZW5ndGg9PT1lP3Q6dC5zdWJhcnJheT90LnN1YmFycmF5KDAsZSk6KHQubGVuZ3RoPWUsdCl9O3ZhciBuPXthcnJheVNldDpmdW5jdGlvbih0LGUscixpLG4pe2lmKGUuc3ViYXJyYXkmJnQuc3ViYXJyYXkpdC5zZXQoZS5zdWJhcnJheShyLHIraSksbik7ZWxzZSBmb3IodmFyIHM9MDtzPGk7cysrKXRbbitzXT1lW3Irc119LGZsYXR0ZW5DaHVua3M6ZnVuY3Rpb24odCl7dmFyIGUscixpLG4scyxhO2ZvcihlPWk9MCxyPXQubGVuZ3RoO2U8cjtlKyspaSs9dFtlXS5sZW5ndGg7Zm9yKGE9bmV3IFVpbnQ4QXJyYXkoaSksZT1uPTAscj10Lmxlbmd0aDtlPHI7ZSsrKXM9dFtlXSxhLnNldChzLG4pLG4rPXMubGVuZ3RoO3JldHVybiBhfX0scz17YXJyYXlTZXQ6ZnVuY3Rpb24odCxlLHIsaSxuKXtmb3IodmFyIHM9MDtzPGk7cysrKXRbbitzXT1lW3Irc119LGZsYXR0ZW5DaHVua3M6ZnVuY3Rpb24odCl7cmV0dXJuW10uY29uY2F0LmFwcGx5KFtdLHQpfX07ci5zZXRUeXBlZD1mdW5jdGlvbih0KXt0PyhyLkJ1Zjg9VWludDhBcnJheSxyLkJ1ZjE2PVVpbnQxNkFycmF5LHIuQnVmMzI9SW50MzJBcnJheSxyLmFzc2lnbihyLG4pKTooci5CdWY4PUFycmF5LHIuQnVmMTY9QXJyYXksci5CdWYzMj1BcnJheSxyLmFzc2lnbihyLHMpKX0sci5zZXRUeXBlZChpKX0se31dLDQyOltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGg9dChcIi4vY29tbW9uXCIpLG49ITAscz0hMDt0cnl7U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLFswXSl9Y2F0Y2godCl7bj0hMX10cnl7U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KDEpKX1jYXRjaCh0KXtzPSExfWZvcih2YXIgdT1uZXcgaC5CdWY4KDI1NiksaT0wO2k8MjU2O2krKyl1W2ldPTI1Mjw9aT82OjI0ODw9aT81OjI0MDw9aT80OjIyNDw9aT8zOjE5Mjw9aT8yOjE7ZnVuY3Rpb24gbCh0LGUpe2lmKGU8NjU1MzcmJih0LnN1YmFycmF5JiZzfHwhdC5zdWJhcnJheSYmbikpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxoLnNocmlua0J1Zih0LGUpKTtmb3IodmFyIHI9XCJcIixpPTA7aTxlO2krKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHRbaV0pO3JldHVybiByfXVbMjU0XT11WzI1NF09MSxyLnN0cmluZzJidWY9ZnVuY3Rpb24odCl7dmFyIGUscixpLG4scyxhPXQubGVuZ3RoLG89MDtmb3Iobj0wO248YTtuKyspNTUyOTY9PSg2NDUxMiYocj10LmNoYXJDb2RlQXQobikpKSYmbisxPGEmJjU2MzIwPT0oNjQ1MTImKGk9dC5jaGFyQ29kZUF0KG4rMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsoaS01NjMyMCksbisrKSxvKz1yPDEyOD8xOnI8MjA0OD8yOnI8NjU1MzY/Mzo0O2ZvcihlPW5ldyBoLkJ1Zjgobyksbj1zPTA7czxvO24rKyk1NTI5Nj09KDY0NTEyJihyPXQuY2hhckNvZGVBdChuKSkpJiZuKzE8YSYmNTYzMjA9PSg2NDUxMiYoaT10LmNoYXJDb2RlQXQobisxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhpLTU2MzIwKSxuKyspLHI8MTI4P2VbcysrXT1yOihyPDIwNDg/ZVtzKytdPTE5MnxyPj4+Njoocjw2NTUzNj9lW3MrK109MjI0fHI+Pj4xMjooZVtzKytdPTI0MHxyPj4+MTgsZVtzKytdPTEyOHxyPj4+MTImNjMpLGVbcysrXT0xMjh8cj4+PjYmNjMpLGVbcysrXT0xMjh8NjMmcik7cmV0dXJuIGV9LHIuYnVmMmJpbnN0cmluZz1mdW5jdGlvbih0KXtyZXR1cm4gbCh0LHQubGVuZ3RoKX0sci5iaW5zdHJpbmcyYnVmPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1uZXcgaC5CdWY4KHQubGVuZ3RoKSxyPTAsaT1lLmxlbmd0aDtyPGk7cisrKWVbcl09dC5jaGFyQ29kZUF0KHIpO3JldHVybiBlfSxyLmJ1ZjJzdHJpbmc9ZnVuY3Rpb24odCxlKXt2YXIgcixpLG4scyxhPWV8fHQubGVuZ3RoLG89bmV3IEFycmF5KDIqYSk7Zm9yKHI9aT0wO3I8YTspaWYoKG49dFtyKytdKTwxMjgpb1tpKytdPW47ZWxzZSBpZig0PChzPXVbbl0pKW9baSsrXT02NTUzMyxyKz1zLTE7ZWxzZXtmb3IobiY9Mj09PXM/MzE6Mz09PXM/MTU6NzsxPHMmJnI8YTspbj1uPDw2fDYzJnRbcisrXSxzLS07MTxzP29baSsrXT02NTUzMzpuPDY1NTM2P29baSsrXT1uOihuLT02NTUzNixvW2krK109NTUyOTZ8bj4+MTAmMTAyMyxvW2krK109NTYzMjB8MTAyMyZuKX1yZXR1cm4gbChvLGkpfSxyLnV0Zjhib3JkZXI9ZnVuY3Rpb24odCxlKXt2YXIgcjtmb3IoKGU9ZXx8dC5sZW5ndGgpPnQubGVuZ3RoJiYoZT10Lmxlbmd0aCkscj1lLTE7MDw9ciYmMTI4PT0oMTkyJnRbcl0pOylyLS07cmV0dXJuIHI8MD9lOjA9PT1yP2U6cit1W3Rbcl1dPmU/cjplfX0se1wiLi9jb21tb25cIjo0MX1dLDQzOltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPWZ1bmN0aW9uKHQsZSxyLGkpe2Zvcih2YXIgbj02NTUzNSZ0fDAscz10Pj4+MTYmNjU1MzV8MCxhPTA7MCE9PXI7KXtmb3Ioci09YT0yZTM8cj8yZTM6cjtzPXMrKG49bitlW2krK118MCl8MCwtLWE7KTtuJT02NTUyMSxzJT02NTUyMX1yZXR1cm4gbnxzPDwxNnwwfX0se31dLDQ0OltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPXtaX05PX0ZMVVNIOjAsWl9QQVJUSUFMX0ZMVVNIOjEsWl9TWU5DX0ZMVVNIOjIsWl9GVUxMX0ZMVVNIOjMsWl9GSU5JU0g6NCxaX0JMT0NLOjUsWl9UUkVFUzo2LFpfT0s6MCxaX1NUUkVBTV9FTkQ6MSxaX05FRURfRElDVDoyLFpfRVJSTk86LTEsWl9TVFJFQU1fRVJST1I6LTIsWl9EQVRBX0VSUk9SOi0zLFpfQlVGX0VSUk9SOi01LFpfTk9fQ09NUFJFU1NJT046MCxaX0JFU1RfU1BFRUQ6MSxaX0JFU1RfQ09NUFJFU1NJT046OSxaX0RFRkFVTFRfQ09NUFJFU1NJT046LTEsWl9GSUxURVJFRDoxLFpfSFVGRk1BTl9PTkxZOjIsWl9STEU6MyxaX0ZJWEVEOjQsWl9ERUZBVUxUX1NUUkFURUdZOjAsWl9CSU5BUlk6MCxaX1RFWFQ6MSxaX1VOS05PV046MixaX0RFRkxBVEVEOjh9fSx7fV0sNDU6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1mdW5jdGlvbigpe2Zvcih2YXIgdCxlPVtdLHI9MDtyPDI1NjtyKyspe3Q9cjtmb3IodmFyIGk9MDtpPDg7aSsrKXQ9MSZ0PzM5ODgyOTIzODRedD4+PjE6dD4+PjE7ZVtyXT10fXJldHVybiBlfSgpO2UuZXhwb3J0cz1mdW5jdGlvbih0LGUscixpKXt2YXIgbj1vLHM9aStyO3RePS0xO2Zvcih2YXIgYT1pO2E8czthKyspdD10Pj4+OF5uWzI1NSYodF5lW2FdKV07cmV0dXJuLTFedH19LHt9XSw0NjpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBoLGQ9dChcIi4uL3V0aWxzL2NvbW1vblwiKSx1PXQoXCIuL3RyZWVzXCIpLGM9dChcIi4vYWRsZXIzMlwiKSxwPXQoXCIuL2NyYzMyXCIpLGk9dChcIi4vbWVzc2FnZXNcIiksbD0wLGY9NCxtPTAsXz0tMixnPS0xLGI9NCxuPTIsdj04LHk9OSxzPTI4NixhPTMwLG89MTksdz0yKnMrMSxrPTE1LHg9MyxTPTI1OCx6PVMreCsxLEM9NDIsRT0xMTMsQT0xLEk9MixPPTMsQj00O2Z1bmN0aW9uIFIodCxlKXtyZXR1cm4gdC5tc2c9aVtlXSxlfWZ1bmN0aW9uIFQodCl7cmV0dXJuKHQ8PDEpLSg0PHQ/OTowKX1mdW5jdGlvbiBEKHQpe2Zvcih2YXIgZT10Lmxlbmd0aDswPD0tLWU7KXRbZV09MH1mdW5jdGlvbiBGKHQpe3ZhciBlPXQuc3RhdGUscj1lLnBlbmRpbmc7cj50LmF2YWlsX291dCYmKHI9dC5hdmFpbF9vdXQpLDAhPT1yJiYoZC5hcnJheVNldCh0Lm91dHB1dCxlLnBlbmRpbmdfYnVmLGUucGVuZGluZ19vdXQscix0Lm5leHRfb3V0KSx0Lm5leHRfb3V0Kz1yLGUucGVuZGluZ19vdXQrPXIsdC50b3RhbF9vdXQrPXIsdC5hdmFpbF9vdXQtPXIsZS5wZW5kaW5nLT1yLDA9PT1lLnBlbmRpbmcmJihlLnBlbmRpbmdfb3V0PTApKX1mdW5jdGlvbiBOKHQsZSl7dS5fdHJfZmx1c2hfYmxvY2sodCwwPD10LmJsb2NrX3N0YXJ0P3QuYmxvY2tfc3RhcnQ6LTEsdC5zdHJzdGFydC10LmJsb2NrX3N0YXJ0LGUpLHQuYmxvY2tfc3RhcnQ9dC5zdHJzdGFydCxGKHQuc3RybSl9ZnVuY3Rpb24gVSh0LGUpe3QucGVuZGluZ19idWZbdC5wZW5kaW5nKytdPWV9ZnVuY3Rpb24gUCh0LGUpe3QucGVuZGluZ19idWZbdC5wZW5kaW5nKytdPWU+Pj44JjI1NSx0LnBlbmRpbmdfYnVmW3QucGVuZGluZysrXT0yNTUmZX1mdW5jdGlvbiBMKHQsZSl7dmFyIHIsaSxuPXQubWF4X2NoYWluX2xlbmd0aCxzPXQuc3Ryc3RhcnQsYT10LnByZXZfbGVuZ3RoLG89dC5uaWNlX21hdGNoLGg9dC5zdHJzdGFydD50Lndfc2l6ZS16P3Quc3Ryc3RhcnQtKHQud19zaXplLXopOjAsdT10LndpbmRvdyxsPXQud19tYXNrLGY9dC5wcmV2LGQ9dC5zdHJzdGFydCtTLGM9dVtzK2EtMV0scD11W3MrYV07dC5wcmV2X2xlbmd0aD49dC5nb29kX21hdGNoJiYobj4+PTIpLG8+dC5sb29rYWhlYWQmJihvPXQubG9va2FoZWFkKTtkb3tpZih1WyhyPWUpK2FdPT09cCYmdVtyK2EtMV09PT1jJiZ1W3JdPT09dVtzXSYmdVsrK3JdPT09dVtzKzFdKXtzKz0yLHIrKztkb3t9d2hpbGUodVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnM8ZCk7aWYoaT1TLShkLXMpLHM9ZC1TLGE8aSl7aWYodC5tYXRjaF9zdGFydD1lLG88PShhPWkpKWJyZWFrO2M9dVtzK2EtMV0scD11W3MrYV19fX13aGlsZSgoZT1mW2UmbF0pPmgmJjAhPS0tbik7cmV0dXJuIGE8PXQubG9va2FoZWFkP2E6dC5sb29rYWhlYWR9ZnVuY3Rpb24gaih0KXt2YXIgZSxyLGksbixzLGEsbyxoLHUsbCxmPXQud19zaXplO2Rve2lmKG49dC53aW5kb3dfc2l6ZS10Lmxvb2thaGVhZC10LnN0cnN0YXJ0LHQuc3Ryc3RhcnQ+PWYrKGYteikpe2ZvcihkLmFycmF5U2V0KHQud2luZG93LHQud2luZG93LGYsZiwwKSx0Lm1hdGNoX3N0YXJ0LT1mLHQuc3Ryc3RhcnQtPWYsdC5ibG9ja19zdGFydC09ZixlPXI9dC5oYXNoX3NpemU7aT10LmhlYWRbLS1lXSx0LmhlYWRbZV09Zjw9aT9pLWY6MCwtLXI7KTtmb3IoZT1yPWY7aT10LnByZXZbLS1lXSx0LnByZXZbZV09Zjw9aT9pLWY6MCwtLXI7KTtuKz1mfWlmKDA9PT10LnN0cm0uYXZhaWxfaW4pYnJlYWs7aWYoYT10LnN0cm0sbz10LndpbmRvdyxoPXQuc3Ryc3RhcnQrdC5sb29rYWhlYWQsdT1uLGw9dm9pZCAwLGw9YS5hdmFpbF9pbix1PGwmJihsPXUpLHI9MD09PWw/MDooYS5hdmFpbF9pbi09bCxkLmFycmF5U2V0KG8sYS5pbnB1dCxhLm5leHRfaW4sbCxoKSwxPT09YS5zdGF0ZS53cmFwP2EuYWRsZXI9YyhhLmFkbGVyLG8sbCxoKToyPT09YS5zdGF0ZS53cmFwJiYoYS5hZGxlcj1wKGEuYWRsZXIsbyxsLGgpKSxhLm5leHRfaW4rPWwsYS50b3RhbF9pbis9bCxsKSx0Lmxvb2thaGVhZCs9cix0Lmxvb2thaGVhZCt0Lmluc2VydD49eClmb3Iocz10LnN0cnN0YXJ0LXQuaW5zZXJ0LHQuaW5zX2g9dC53aW5kb3dbc10sdC5pbnNfaD0odC5pbnNfaDw8dC5oYXNoX3NoaWZ0XnQud2luZG93W3MrMV0pJnQuaGFzaF9tYXNrO3QuaW5zZXJ0JiYodC5pbnNfaD0odC5pbnNfaDw8dC5oYXNoX3NoaWZ0XnQud2luZG93W3MreC0xXSkmdC5oYXNoX21hc2ssdC5wcmV2W3MmdC53X21hc2tdPXQuaGVhZFt0Lmluc19oXSx0LmhlYWRbdC5pbnNfaF09cyxzKyssdC5pbnNlcnQtLSwhKHQubG9va2FoZWFkK3QuaW5zZXJ0PHgpKTspO313aGlsZSh0Lmxvb2thaGVhZDx6JiYwIT09dC5zdHJtLmF2YWlsX2luKX1mdW5jdGlvbiBaKHQsZSl7Zm9yKHZhciByLGk7Oyl7aWYodC5sb29rYWhlYWQ8eil7aWYoaih0KSx0Lmxvb2thaGVhZDx6JiZlPT09bClyZXR1cm4gQTtpZigwPT09dC5sb29rYWhlYWQpYnJlYWt9aWYocj0wLHQubG9va2FoZWFkPj14JiYodC5pbnNfaD0odC5pbnNfaDw8dC5oYXNoX3NoaWZ0XnQud2luZG93W3Quc3Ryc3RhcnQreC0xXSkmdC5oYXNoX21hc2sscj10LnByZXZbdC5zdHJzdGFydCZ0LndfbWFza109dC5oZWFkW3QuaW5zX2hdLHQuaGVhZFt0Lmluc19oXT10LnN0cnN0YXJ0KSwwIT09ciYmdC5zdHJzdGFydC1yPD10Lndfc2l6ZS16JiYodC5tYXRjaF9sZW5ndGg9TCh0LHIpKSx0Lm1hdGNoX2xlbmd0aD49eClpZihpPXUuX3RyX3RhbGx5KHQsdC5zdHJzdGFydC10Lm1hdGNoX3N0YXJ0LHQubWF0Y2hfbGVuZ3RoLXgpLHQubG9va2FoZWFkLT10Lm1hdGNoX2xlbmd0aCx0Lm1hdGNoX2xlbmd0aDw9dC5tYXhfbGF6eV9tYXRjaCYmdC5sb29rYWhlYWQ+PXgpe2Zvcih0Lm1hdGNoX2xlbmd0aC0tO3Quc3Ryc3RhcnQrKyx0Lmluc19oPSh0Lmluc19oPDx0Lmhhc2hfc2hpZnRedC53aW5kb3dbdC5zdHJzdGFydCt4LTFdKSZ0Lmhhc2hfbWFzayxyPXQucHJldlt0LnN0cnN0YXJ0JnQud19tYXNrXT10LmhlYWRbdC5pbnNfaF0sdC5oZWFkW3QuaW5zX2hdPXQuc3Ryc3RhcnQsMCE9LS10Lm1hdGNoX2xlbmd0aDspO3Quc3Ryc3RhcnQrK31lbHNlIHQuc3Ryc3RhcnQrPXQubWF0Y2hfbGVuZ3RoLHQubWF0Y2hfbGVuZ3RoPTAsdC5pbnNfaD10LndpbmRvd1t0LnN0cnN0YXJ0XSx0Lmluc19oPSh0Lmluc19oPDx0Lmhhc2hfc2hpZnRedC53aW5kb3dbdC5zdHJzdGFydCsxXSkmdC5oYXNoX21hc2s7ZWxzZSBpPXUuX3RyX3RhbGx5KHQsMCx0LndpbmRvd1t0LnN0cnN0YXJ0XSksdC5sb29rYWhlYWQtLSx0LnN0cnN0YXJ0Kys7aWYoaSYmKE4odCwhMSksMD09PXQuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiB0Lmluc2VydD10LnN0cnN0YXJ0PHgtMT90LnN0cnN0YXJ0OngtMSxlPT09Zj8oTih0LCEwKSwwPT09dC5zdHJtLmF2YWlsX291dD9POkIpOnQubGFzdF9saXQmJihOKHQsITEpLDA9PT10LnN0cm0uYXZhaWxfb3V0KT9BOkl9ZnVuY3Rpb24gVyh0LGUpe2Zvcih2YXIgcixpLG47Oyl7aWYodC5sb29rYWhlYWQ8eil7aWYoaih0KSx0Lmxvb2thaGVhZDx6JiZlPT09bClyZXR1cm4gQTtpZigwPT09dC5sb29rYWhlYWQpYnJlYWt9aWYocj0wLHQubG9va2FoZWFkPj14JiYodC5pbnNfaD0odC5pbnNfaDw8dC5oYXNoX3NoaWZ0XnQud2luZG93W3Quc3Ryc3RhcnQreC0xXSkmdC5oYXNoX21hc2sscj10LnByZXZbdC5zdHJzdGFydCZ0LndfbWFza109dC5oZWFkW3QuaW5zX2hdLHQuaGVhZFt0Lmluc19oXT10LnN0cnN0YXJ0KSx0LnByZXZfbGVuZ3RoPXQubWF0Y2hfbGVuZ3RoLHQucHJldl9tYXRjaD10Lm1hdGNoX3N0YXJ0LHQubWF0Y2hfbGVuZ3RoPXgtMSwwIT09ciYmdC5wcmV2X2xlbmd0aDx0Lm1heF9sYXp5X21hdGNoJiZ0LnN0cnN0YXJ0LXI8PXQud19zaXplLXomJih0Lm1hdGNoX2xlbmd0aD1MKHQsciksdC5tYXRjaF9sZW5ndGg8PTUmJigxPT09dC5zdHJhdGVneXx8dC5tYXRjaF9sZW5ndGg9PT14JiY0MDk2PHQuc3Ryc3RhcnQtdC5tYXRjaF9zdGFydCkmJih0Lm1hdGNoX2xlbmd0aD14LTEpKSx0LnByZXZfbGVuZ3RoPj14JiZ0Lm1hdGNoX2xlbmd0aDw9dC5wcmV2X2xlbmd0aCl7Zm9yKG49dC5zdHJzdGFydCt0Lmxvb2thaGVhZC14LGk9dS5fdHJfdGFsbHkodCx0LnN0cnN0YXJ0LTEtdC5wcmV2X21hdGNoLHQucHJldl9sZW5ndGgteCksdC5sb29rYWhlYWQtPXQucHJldl9sZW5ndGgtMSx0LnByZXZfbGVuZ3RoLT0yOysrdC5zdHJzdGFydDw9biYmKHQuaW5zX2g9KHQuaW5zX2g8PHQuaGFzaF9zaGlmdF50LndpbmRvd1t0LnN0cnN0YXJ0K3gtMV0pJnQuaGFzaF9tYXNrLHI9dC5wcmV2W3Quc3Ryc3RhcnQmdC53X21hc2tdPXQuaGVhZFt0Lmluc19oXSx0LmhlYWRbdC5pbnNfaF09dC5zdHJzdGFydCksMCE9LS10LnByZXZfbGVuZ3RoOyk7aWYodC5tYXRjaF9hdmFpbGFibGU9MCx0Lm1hdGNoX2xlbmd0aD14LTEsdC5zdHJzdGFydCsrLGkmJihOKHQsITEpLDA9PT10LnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1lbHNlIGlmKHQubWF0Y2hfYXZhaWxhYmxlKXtpZigoaT11Ll90cl90YWxseSh0LDAsdC53aW5kb3dbdC5zdHJzdGFydC0xXSkpJiZOKHQsITEpLHQuc3Ryc3RhcnQrKyx0Lmxvb2thaGVhZC0tLDA9PT10LnN0cm0uYXZhaWxfb3V0KXJldHVybiBBfWVsc2UgdC5tYXRjaF9hdmFpbGFibGU9MSx0LnN0cnN0YXJ0KyssdC5sb29rYWhlYWQtLX1yZXR1cm4gdC5tYXRjaF9hdmFpbGFibGUmJihpPXUuX3RyX3RhbGx5KHQsMCx0LndpbmRvd1t0LnN0cnN0YXJ0LTFdKSx0Lm1hdGNoX2F2YWlsYWJsZT0wKSx0Lmluc2VydD10LnN0cnN0YXJ0PHgtMT90LnN0cnN0YXJ0OngtMSxlPT09Zj8oTih0LCEwKSwwPT09dC5zdHJtLmF2YWlsX291dD9POkIpOnQubGFzdF9saXQmJihOKHQsITEpLDA9PT10LnN0cm0uYXZhaWxfb3V0KT9BOkl9ZnVuY3Rpb24gTSh0LGUscixpLG4pe3RoaXMuZ29vZF9sZW5ndGg9dCx0aGlzLm1heF9sYXp5PWUsdGhpcy5uaWNlX2xlbmd0aD1yLHRoaXMubWF4X2NoYWluPWksdGhpcy5mdW5jPW59ZnVuY3Rpb24gSCgpe3RoaXMuc3RybT1udWxsLHRoaXMuc3RhdHVzPTAsdGhpcy5wZW5kaW5nX2J1Zj1udWxsLHRoaXMucGVuZGluZ19idWZfc2l6ZT0wLHRoaXMucGVuZGluZ19vdXQ9MCx0aGlzLnBlbmRpbmc9MCx0aGlzLndyYXA9MCx0aGlzLmd6aGVhZD1udWxsLHRoaXMuZ3ppbmRleD0wLHRoaXMubWV0aG9kPXYsdGhpcy5sYXN0X2ZsdXNoPS0xLHRoaXMud19zaXplPTAsdGhpcy53X2JpdHM9MCx0aGlzLndfbWFzaz0wLHRoaXMud2luZG93PW51bGwsdGhpcy53aW5kb3dfc2l6ZT0wLHRoaXMucHJldj1udWxsLHRoaXMuaGVhZD1udWxsLHRoaXMuaW5zX2g9MCx0aGlzLmhhc2hfc2l6ZT0wLHRoaXMuaGFzaF9iaXRzPTAsdGhpcy5oYXNoX21hc2s9MCx0aGlzLmhhc2hfc2hpZnQ9MCx0aGlzLmJsb2NrX3N0YXJ0PTAsdGhpcy5tYXRjaF9sZW5ndGg9MCx0aGlzLnByZXZfbWF0Y2g9MCx0aGlzLm1hdGNoX2F2YWlsYWJsZT0wLHRoaXMuc3Ryc3RhcnQ9MCx0aGlzLm1hdGNoX3N0YXJ0PTAsdGhpcy5sb29rYWhlYWQ9MCx0aGlzLnByZXZfbGVuZ3RoPTAsdGhpcy5tYXhfY2hhaW5fbGVuZ3RoPTAsdGhpcy5tYXhfbGF6eV9tYXRjaD0wLHRoaXMubGV2ZWw9MCx0aGlzLnN0cmF0ZWd5PTAsdGhpcy5nb29kX21hdGNoPTAsdGhpcy5uaWNlX21hdGNoPTAsdGhpcy5keW5fbHRyZWU9bmV3IGQuQnVmMTYoMip3KSx0aGlzLmR5bl9kdHJlZT1uZXcgZC5CdWYxNigyKigyKmErMSkpLHRoaXMuYmxfdHJlZT1uZXcgZC5CdWYxNigyKigyKm8rMSkpLEQodGhpcy5keW5fbHRyZWUpLEQodGhpcy5keW5fZHRyZWUpLEQodGhpcy5ibF90cmVlKSx0aGlzLmxfZGVzYz1udWxsLHRoaXMuZF9kZXNjPW51bGwsdGhpcy5ibF9kZXNjPW51bGwsdGhpcy5ibF9jb3VudD1uZXcgZC5CdWYxNihrKzEpLHRoaXMuaGVhcD1uZXcgZC5CdWYxNigyKnMrMSksRCh0aGlzLmhlYXApLHRoaXMuaGVhcF9sZW49MCx0aGlzLmhlYXBfbWF4PTAsdGhpcy5kZXB0aD1uZXcgZC5CdWYxNigyKnMrMSksRCh0aGlzLmRlcHRoKSx0aGlzLmxfYnVmPTAsdGhpcy5saXRfYnVmc2l6ZT0wLHRoaXMubGFzdF9saXQ9MCx0aGlzLmRfYnVmPTAsdGhpcy5vcHRfbGVuPTAsdGhpcy5zdGF0aWNfbGVuPTAsdGhpcy5tYXRjaGVzPTAsdGhpcy5pbnNlcnQ9MCx0aGlzLmJpX2J1Zj0wLHRoaXMuYmlfdmFsaWQ9MH1mdW5jdGlvbiBHKHQpe3ZhciBlO3JldHVybiB0JiZ0LnN0YXRlPyh0LnRvdGFsX2luPXQudG90YWxfb3V0PTAsdC5kYXRhX3R5cGU9biwoZT10LnN0YXRlKS5wZW5kaW5nPTAsZS5wZW5kaW5nX291dD0wLGUud3JhcDwwJiYoZS53cmFwPS1lLndyYXApLGUuc3RhdHVzPWUud3JhcD9DOkUsdC5hZGxlcj0yPT09ZS53cmFwPzA6MSxlLmxhc3RfZmx1c2g9bCx1Ll90cl9pbml0KGUpLG0pOlIodCxfKX1mdW5jdGlvbiBLKHQpe3ZhciBlPUcodCk7cmV0dXJuIGU9PT1tJiZmdW5jdGlvbih0KXt0LndpbmRvd19zaXplPTIqdC53X3NpemUsRCh0LmhlYWQpLHQubWF4X2xhenlfbWF0Y2g9aFt0LmxldmVsXS5tYXhfbGF6eSx0Lmdvb2RfbWF0Y2g9aFt0LmxldmVsXS5nb29kX2xlbmd0aCx0Lm5pY2VfbWF0Y2g9aFt0LmxldmVsXS5uaWNlX2xlbmd0aCx0Lm1heF9jaGFpbl9sZW5ndGg9aFt0LmxldmVsXS5tYXhfY2hhaW4sdC5zdHJzdGFydD0wLHQuYmxvY2tfc3RhcnQ9MCx0Lmxvb2thaGVhZD0wLHQuaW5zZXJ0PTAsdC5tYXRjaF9sZW5ndGg9dC5wcmV2X2xlbmd0aD14LTEsdC5tYXRjaF9hdmFpbGFibGU9MCx0Lmluc19oPTB9KHQuc3RhdGUpLGV9ZnVuY3Rpb24gWSh0LGUscixpLG4scyl7aWYoIXQpcmV0dXJuIF87dmFyIGE9MTtpZihlPT09ZyYmKGU9NiksaTwwPyhhPTAsaT0taSk6MTU8aSYmKGE9MixpLT0xNiksbjwxfHx5PG58fHIhPT12fHxpPDh8fDE1PGl8fGU8MHx8OTxlfHxzPDB8fGI8cylyZXR1cm4gUih0LF8pOzg9PT1pJiYoaT05KTt2YXIgbz1uZXcgSDtyZXR1cm4odC5zdGF0ZT1vKS5zdHJtPXQsby53cmFwPWEsby5nemhlYWQ9bnVsbCxvLndfYml0cz1pLG8ud19zaXplPTE8PG8ud19iaXRzLG8ud19tYXNrPW8ud19zaXplLTEsby5oYXNoX2JpdHM9bis3LG8uaGFzaF9zaXplPTE8PG8uaGFzaF9iaXRzLG8uaGFzaF9tYXNrPW8uaGFzaF9zaXplLTEsby5oYXNoX3NoaWZ0PX5+KChvLmhhc2hfYml0cyt4LTEpL3gpLG8ud2luZG93PW5ldyBkLkJ1ZjgoMipvLndfc2l6ZSksby5oZWFkPW5ldyBkLkJ1ZjE2KG8uaGFzaF9zaXplKSxvLnByZXY9bmV3IGQuQnVmMTYoby53X3NpemUpLG8ubGl0X2J1ZnNpemU9MTw8bis2LG8ucGVuZGluZ19idWZfc2l6ZT00Km8ubGl0X2J1ZnNpemUsby5wZW5kaW5nX2J1Zj1uZXcgZC5CdWY4KG8ucGVuZGluZ19idWZfc2l6ZSksby5kX2J1Zj0xKm8ubGl0X2J1ZnNpemUsby5sX2J1Zj0zKm8ubGl0X2J1ZnNpemUsby5sZXZlbD1lLG8uc3RyYXRlZ3k9cyxvLm1ldGhvZD1yLEsodCl9aD1bbmV3IE0oMCwwLDAsMCxmdW5jdGlvbih0LGUpe3ZhciByPTY1NTM1O2ZvcihyPnQucGVuZGluZ19idWZfc2l6ZS01JiYocj10LnBlbmRpbmdfYnVmX3NpemUtNSk7Oyl7aWYodC5sb29rYWhlYWQ8PTEpe2lmKGoodCksMD09PXQubG9va2FoZWFkJiZlPT09bClyZXR1cm4gQTtpZigwPT09dC5sb29rYWhlYWQpYnJlYWt9dC5zdHJzdGFydCs9dC5sb29rYWhlYWQsdC5sb29rYWhlYWQ9MDt2YXIgaT10LmJsb2NrX3N0YXJ0K3I7aWYoKDA9PT10LnN0cnN0YXJ0fHx0LnN0cnN0YXJ0Pj1pKSYmKHQubG9va2FoZWFkPXQuc3Ryc3RhcnQtaSx0LnN0cnN0YXJ0PWksTih0LCExKSwwPT09dC5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEE7aWYodC5zdHJzdGFydC10LmJsb2NrX3N0YXJ0Pj10Lndfc2l6ZS16JiYoTih0LCExKSwwPT09dC5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9cmV0dXJuIHQuaW5zZXJ0PTAsZT09PWY/KE4odCwhMCksMD09PXQuc3RybS5hdmFpbF9vdXQ/TzpCKToodC5zdHJzdGFydD50LmJsb2NrX3N0YXJ0JiYoTih0LCExKSx0LnN0cm0uYXZhaWxfb3V0KSxBKX0pLG5ldyBNKDQsNCw4LDQsWiksbmV3IE0oNCw1LDE2LDgsWiksbmV3IE0oNCw2LDMyLDMyLFopLG5ldyBNKDQsNCwxNiwxNixXKSxuZXcgTSg4LDE2LDMyLDMyLFcpLG5ldyBNKDgsMTYsMTI4LDEyOCxXKSxuZXcgTSg4LDMyLDEyOCwyNTYsVyksbmV3IE0oMzIsMTI4LDI1OCwxMDI0LFcpLG5ldyBNKDMyLDI1OCwyNTgsNDA5NixXKV0sci5kZWZsYXRlSW5pdD1mdW5jdGlvbih0LGUpe3JldHVybiBZKHQsZSx2LDE1LDgsMCl9LHIuZGVmbGF0ZUluaXQyPVksci5kZWZsYXRlUmVzZXQ9SyxyLmRlZmxhdGVSZXNldEtlZXA9RyxyLmRlZmxhdGVTZXRIZWFkZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdCYmdC5zdGF0ZT8yIT09dC5zdGF0ZS53cmFwP186KHQuc3RhdGUuZ3poZWFkPWUsbSk6X30sci5kZWZsYXRlPWZ1bmN0aW9uKHQsZSl7dmFyIHIsaSxuLHM7aWYoIXR8fCF0LnN0YXRlfHw1PGV8fGU8MClyZXR1cm4gdD9SKHQsXyk6XztpZihpPXQuc3RhdGUsIXQub3V0cHV0fHwhdC5pbnB1dCYmMCE9PXQuYXZhaWxfaW58fDY2Nj09PWkuc3RhdHVzJiZlIT09ZilyZXR1cm4gUih0LDA9PT10LmF2YWlsX291dD8tNTpfKTtpZihpLnN0cm09dCxyPWkubGFzdF9mbHVzaCxpLmxhc3RfZmx1c2g9ZSxpLnN0YXR1cz09PUMpaWYoMj09PWkud3JhcCl0LmFkbGVyPTAsVShpLDMxKSxVKGksMTM5KSxVKGksOCksaS5nemhlYWQ/KFUoaSwoaS5nemhlYWQudGV4dD8xOjApKyhpLmd6aGVhZC5oY3JjPzI6MCkrKGkuZ3poZWFkLmV4dHJhPzQ6MCkrKGkuZ3poZWFkLm5hbWU/ODowKSsoaS5nemhlYWQuY29tbWVudD8xNjowKSksVShpLDI1NSZpLmd6aGVhZC50aW1lKSxVKGksaS5nemhlYWQudGltZT4+OCYyNTUpLFUoaSxpLmd6aGVhZC50aW1lPj4xNiYyNTUpLFUoaSxpLmd6aGVhZC50aW1lPj4yNCYyNTUpLFUoaSw5PT09aS5sZXZlbD8yOjI8PWkuc3RyYXRlZ3l8fGkubGV2ZWw8Mj80OjApLFUoaSwyNTUmaS5nemhlYWQub3MpLGkuZ3poZWFkLmV4dHJhJiZpLmd6aGVhZC5leHRyYS5sZW5ndGgmJihVKGksMjU1JmkuZ3poZWFkLmV4dHJhLmxlbmd0aCksVShpLGkuZ3poZWFkLmV4dHJhLmxlbmd0aD4+OCYyNTUpKSxpLmd6aGVhZC5oY3JjJiYodC5hZGxlcj1wKHQuYWRsZXIsaS5wZW5kaW5nX2J1ZixpLnBlbmRpbmcsMCkpLGkuZ3ppbmRleD0wLGkuc3RhdHVzPTY5KTooVShpLDApLFUoaSwwKSxVKGksMCksVShpLDApLFUoaSwwKSxVKGksOT09PWkubGV2ZWw/MjoyPD1pLnN0cmF0ZWd5fHxpLmxldmVsPDI/NDowKSxVKGksMyksaS5zdGF0dXM9RSk7ZWxzZXt2YXIgYT12KyhpLndfYml0cy04PDw0KTw8ODthfD0oMjw9aS5zdHJhdGVneXx8aS5sZXZlbDwyPzA6aS5sZXZlbDw2PzE6Nj09PWkubGV2ZWw/MjozKTw8NiwwIT09aS5zdHJzdGFydCYmKGF8PTMyKSxhKz0zMS1hJTMxLGkuc3RhdHVzPUUsUChpLGEpLDAhPT1pLnN0cnN0YXJ0JiYoUChpLHQuYWRsZXI+Pj4xNiksUChpLDY1NTM1JnQuYWRsZXIpKSx0LmFkbGVyPTF9aWYoNjk9PT1pLnN0YXR1cylpZihpLmd6aGVhZC5leHRyYSl7Zm9yKG49aS5wZW5kaW5nO2kuZ3ppbmRleDwoNjU1MzUmaS5nemhlYWQuZXh0cmEubGVuZ3RoKSYmKGkucGVuZGluZyE9PWkucGVuZGluZ19idWZfc2l6ZXx8KGkuZ3poZWFkLmhjcmMmJmkucGVuZGluZz5uJiYodC5hZGxlcj1wKHQuYWRsZXIsaS5wZW5kaW5nX2J1ZixpLnBlbmRpbmctbixuKSksRih0KSxuPWkucGVuZGluZyxpLnBlbmRpbmchPT1pLnBlbmRpbmdfYnVmX3NpemUpKTspVShpLDI1NSZpLmd6aGVhZC5leHRyYVtpLmd6aW5kZXhdKSxpLmd6aW5kZXgrKztpLmd6aGVhZC5oY3JjJiZpLnBlbmRpbmc+biYmKHQuYWRsZXI9cCh0LmFkbGVyLGkucGVuZGluZ19idWYsaS5wZW5kaW5nLW4sbikpLGkuZ3ppbmRleD09PWkuZ3poZWFkLmV4dHJhLmxlbmd0aCYmKGkuZ3ppbmRleD0wLGkuc3RhdHVzPTczKX1lbHNlIGkuc3RhdHVzPTczO2lmKDczPT09aS5zdGF0dXMpaWYoaS5nemhlYWQubmFtZSl7bj1pLnBlbmRpbmc7ZG97aWYoaS5wZW5kaW5nPT09aS5wZW5kaW5nX2J1Zl9zaXplJiYoaS5nemhlYWQuaGNyYyYmaS5wZW5kaW5nPm4mJih0LmFkbGVyPXAodC5hZGxlcixpLnBlbmRpbmdfYnVmLGkucGVuZGluZy1uLG4pKSxGKHQpLG49aS5wZW5kaW5nLGkucGVuZGluZz09PWkucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPWkuZ3ppbmRleDxpLmd6aGVhZC5uYW1lLmxlbmd0aD8yNTUmaS5nemhlYWQubmFtZS5jaGFyQ29kZUF0KGkuZ3ppbmRleCsrKTowLFUoaSxzKX13aGlsZSgwIT09cyk7aS5nemhlYWQuaGNyYyYmaS5wZW5kaW5nPm4mJih0LmFkbGVyPXAodC5hZGxlcixpLnBlbmRpbmdfYnVmLGkucGVuZGluZy1uLG4pKSwwPT09cyYmKGkuZ3ppbmRleD0wLGkuc3RhdHVzPTkxKX1lbHNlIGkuc3RhdHVzPTkxO2lmKDkxPT09aS5zdGF0dXMpaWYoaS5nemhlYWQuY29tbWVudCl7bj1pLnBlbmRpbmc7ZG97aWYoaS5wZW5kaW5nPT09aS5wZW5kaW5nX2J1Zl9zaXplJiYoaS5nemhlYWQuaGNyYyYmaS5wZW5kaW5nPm4mJih0LmFkbGVyPXAodC5hZGxlcixpLnBlbmRpbmdfYnVmLGkucGVuZGluZy1uLG4pKSxGKHQpLG49aS5wZW5kaW5nLGkucGVuZGluZz09PWkucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPWkuZ3ppbmRleDxpLmd6aGVhZC5jb21tZW50Lmxlbmd0aD8yNTUmaS5nemhlYWQuY29tbWVudC5jaGFyQ29kZUF0KGkuZ3ppbmRleCsrKTowLFUoaSxzKX13aGlsZSgwIT09cyk7aS5nemhlYWQuaGNyYyYmaS5wZW5kaW5nPm4mJih0LmFkbGVyPXAodC5hZGxlcixpLnBlbmRpbmdfYnVmLGkucGVuZGluZy1uLG4pKSwwPT09cyYmKGkuc3RhdHVzPTEwMyl9ZWxzZSBpLnN0YXR1cz0xMDM7aWYoMTAzPT09aS5zdGF0dXMmJihpLmd6aGVhZC5oY3JjPyhpLnBlbmRpbmcrMj5pLnBlbmRpbmdfYnVmX3NpemUmJkYodCksaS5wZW5kaW5nKzI8PWkucGVuZGluZ19idWZfc2l6ZSYmKFUoaSwyNTUmdC5hZGxlciksVShpLHQuYWRsZXI+PjgmMjU1KSx0LmFkbGVyPTAsaS5zdGF0dXM9RSkpOmkuc3RhdHVzPUUpLDAhPT1pLnBlbmRpbmcpe2lmKEYodCksMD09PXQuYXZhaWxfb3V0KXJldHVybiBpLmxhc3RfZmx1c2g9LTEsbX1lbHNlIGlmKDA9PT10LmF2YWlsX2luJiZUKGUpPD1UKHIpJiZlIT09ZilyZXR1cm4gUih0LC01KTtpZig2NjY9PT1pLnN0YXR1cyYmMCE9PXQuYXZhaWxfaW4pcmV0dXJuIFIodCwtNSk7aWYoMCE9PXQuYXZhaWxfaW58fDAhPT1pLmxvb2thaGVhZHx8ZSE9PWwmJjY2NiE9PWkuc3RhdHVzKXt2YXIgbz0yPT09aS5zdHJhdGVneT9mdW5jdGlvbih0LGUpe2Zvcih2YXIgcjs7KXtpZigwPT09dC5sb29rYWhlYWQmJihqKHQpLDA9PT10Lmxvb2thaGVhZCkpe2lmKGU9PT1sKXJldHVybiBBO2JyZWFrfWlmKHQubWF0Y2hfbGVuZ3RoPTAscj11Ll90cl90YWxseSh0LDAsdC53aW5kb3dbdC5zdHJzdGFydF0pLHQubG9va2FoZWFkLS0sdC5zdHJzdGFydCsrLHImJihOKHQsITEpLDA9PT10LnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gdC5pbnNlcnQ9MCxlPT09Zj8oTih0LCEwKSwwPT09dC5zdHJtLmF2YWlsX291dD9POkIpOnQubGFzdF9saXQmJihOKHQsITEpLDA9PT10LnN0cm0uYXZhaWxfb3V0KT9BOkl9KGksZSk6Mz09PWkuc3RyYXRlZ3k/ZnVuY3Rpb24odCxlKXtmb3IodmFyIHIsaSxuLHMsYT10LndpbmRvdzs7KXtpZih0Lmxvb2thaGVhZDw9Uyl7aWYoaih0KSx0Lmxvb2thaGVhZDw9UyYmZT09PWwpcmV0dXJuIEE7aWYoMD09PXQubG9va2FoZWFkKWJyZWFrfWlmKHQubWF0Y2hfbGVuZ3RoPTAsdC5sb29rYWhlYWQ+PXgmJjA8dC5zdHJzdGFydCYmKGk9YVtuPXQuc3Ryc3RhcnQtMV0pPT09YVsrK25dJiZpPT09YVsrK25dJiZpPT09YVsrK25dKXtzPXQuc3Ryc3RhcnQrUztkb3t9d2hpbGUoaT09PWFbKytuXSYmaT09PWFbKytuXSYmaT09PWFbKytuXSYmaT09PWFbKytuXSYmaT09PWFbKytuXSYmaT09PWFbKytuXSYmaT09PWFbKytuXSYmaT09PWFbKytuXSYmbjxzKTt0Lm1hdGNoX2xlbmd0aD1TLShzLW4pLHQubWF0Y2hfbGVuZ3RoPnQubG9va2FoZWFkJiYodC5tYXRjaF9sZW5ndGg9dC5sb29rYWhlYWQpfWlmKHQubWF0Y2hfbGVuZ3RoPj14PyhyPXUuX3RyX3RhbGx5KHQsMSx0Lm1hdGNoX2xlbmd0aC14KSx0Lmxvb2thaGVhZC09dC5tYXRjaF9sZW5ndGgsdC5zdHJzdGFydCs9dC5tYXRjaF9sZW5ndGgsdC5tYXRjaF9sZW5ndGg9MCk6KHI9dS5fdHJfdGFsbHkodCwwLHQud2luZG93W3Quc3Ryc3RhcnRdKSx0Lmxvb2thaGVhZC0tLHQuc3Ryc3RhcnQrKyksciYmKE4odCwhMSksMD09PXQuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiB0Lmluc2VydD0wLGU9PT1mPyhOKHQsITApLDA9PT10LnN0cm0uYXZhaWxfb3V0P086Qik6dC5sYXN0X2xpdCYmKE4odCwhMSksMD09PXQuc3RybS5hdmFpbF9vdXQpP0E6SX0oaSxlKTpoW2kubGV2ZWxdLmZ1bmMoaSxlKTtpZihvIT09TyYmbyE9PUJ8fChpLnN0YXR1cz02NjYpLG89PT1BfHxvPT09TylyZXR1cm4gMD09PXQuYXZhaWxfb3V0JiYoaS5sYXN0X2ZsdXNoPS0xKSxtO2lmKG89PT1JJiYoMT09PWU/dS5fdHJfYWxpZ24oaSk6NSE9PWUmJih1Ll90cl9zdG9yZWRfYmxvY2soaSwwLDAsITEpLDM9PT1lJiYoRChpLmhlYWQpLDA9PT1pLmxvb2thaGVhZCYmKGkuc3Ryc3RhcnQ9MCxpLmJsb2NrX3N0YXJ0PTAsaS5pbnNlcnQ9MCkpKSxGKHQpLDA9PT10LmF2YWlsX291dCkpcmV0dXJuIGkubGFzdF9mbHVzaD0tMSxtfXJldHVybiBlIT09Zj9tOmkud3JhcDw9MD8xOigyPT09aS53cmFwPyhVKGksMjU1JnQuYWRsZXIpLFUoaSx0LmFkbGVyPj44JjI1NSksVShpLHQuYWRsZXI+PjE2JjI1NSksVShpLHQuYWRsZXI+PjI0JjI1NSksVShpLDI1NSZ0LnRvdGFsX2luKSxVKGksdC50b3RhbF9pbj4+OCYyNTUpLFUoaSx0LnRvdGFsX2luPj4xNiYyNTUpLFUoaSx0LnRvdGFsX2luPj4yNCYyNTUpKTooUChpLHQuYWRsZXI+Pj4xNiksUChpLDY1NTM1JnQuYWRsZXIpKSxGKHQpLDA8aS53cmFwJiYoaS53cmFwPS1pLndyYXApLDAhPT1pLnBlbmRpbmc/bToxKX0sci5kZWZsYXRlRW5kPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiB0JiZ0LnN0YXRlPyhlPXQuc3RhdGUuc3RhdHVzKSE9PUMmJjY5IT09ZSYmNzMhPT1lJiY5MSE9PWUmJjEwMyE9PWUmJmUhPT1FJiY2NjYhPT1lP1IodCxfKToodC5zdGF0ZT1udWxsLGU9PT1FP1IodCwtMyk6bSk6X30sci5kZWZsYXRlU2V0RGljdGlvbmFyeT1mdW5jdGlvbih0LGUpe3ZhciByLGksbixzLGEsbyxoLHUsbD1lLmxlbmd0aDtpZighdHx8IXQuc3RhdGUpcmV0dXJuIF87aWYoMj09PShzPShyPXQuc3RhdGUpLndyYXApfHwxPT09cyYmci5zdGF0dXMhPT1DfHxyLmxvb2thaGVhZClyZXR1cm4gXztmb3IoMT09PXMmJih0LmFkbGVyPWModC5hZGxlcixlLGwsMCkpLHIud3JhcD0wLGw+PXIud19zaXplJiYoMD09PXMmJihEKHIuaGVhZCksci5zdHJzdGFydD0wLHIuYmxvY2tfc3RhcnQ9MCxyLmluc2VydD0wKSx1PW5ldyBkLkJ1Zjgoci53X3NpemUpLGQuYXJyYXlTZXQodSxlLGwtci53X3NpemUsci53X3NpemUsMCksZT11LGw9ci53X3NpemUpLGE9dC5hdmFpbF9pbixvPXQubmV4dF9pbixoPXQuaW5wdXQsdC5hdmFpbF9pbj1sLHQubmV4dF9pbj0wLHQuaW5wdXQ9ZSxqKHIpO3IubG9va2FoZWFkPj14Oyl7Zm9yKGk9ci5zdHJzdGFydCxuPXIubG9va2FoZWFkLSh4LTEpO3IuaW5zX2g9KHIuaW5zX2g8PHIuaGFzaF9zaGlmdF5yLndpbmRvd1tpK3gtMV0pJnIuaGFzaF9tYXNrLHIucHJldltpJnIud19tYXNrXT1yLmhlYWRbci5pbnNfaF0sci5oZWFkW3IuaW5zX2hdPWksaSsrLC0tbjspO3Iuc3Ryc3RhcnQ9aSxyLmxvb2thaGVhZD14LTEsaihyKX1yZXR1cm4gci5zdHJzdGFydCs9ci5sb29rYWhlYWQsci5ibG9ja19zdGFydD1yLnN0cnN0YXJ0LHIuaW5zZXJ0PXIubG9va2FoZWFkLHIubG9va2FoZWFkPTAsci5tYXRjaF9sZW5ndGg9ci5wcmV2X2xlbmd0aD14LTEsci5tYXRjaF9hdmFpbGFibGU9MCx0Lm5leHRfaW49byx0LmlucHV0PWgsdC5hdmFpbF9pbj1hLHIud3JhcD1zLG19LHIuZGVmbGF0ZUluZm89XCJwYWtvIGRlZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpXCJ9LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9hZGxlcjMyXCI6NDMsXCIuL2NyYzMyXCI6NDUsXCIuL21lc3NhZ2VzXCI6NTEsXCIuL3RyZWVzXCI6NTJ9XSw0NzpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO2UuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMudGV4dD0wLHRoaXMudGltZT0wLHRoaXMueGZsYWdzPTAsdGhpcy5vcz0wLHRoaXMuZXh0cmE9bnVsbCx0aGlzLmV4dHJhX2xlbj0wLHRoaXMubmFtZT1cIlwiLHRoaXMuY29tbWVudD1cIlwiLHRoaXMuaGNyYz0wLHRoaXMuZG9uZT0hMX19LHt9XSw0ODpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO2UuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciByLGksbixzLGEsbyxoLHUsbCxmLGQsYyxwLG0sXyxnLGIsdix5LHcsayx4LFMseixDO3I9dC5zdGF0ZSxpPXQubmV4dF9pbix6PXQuaW5wdXQsbj1pKyh0LmF2YWlsX2luLTUpLHM9dC5uZXh0X291dCxDPXQub3V0cHV0LGE9cy0oZS10LmF2YWlsX291dCksbz1zKyh0LmF2YWlsX291dC0yNTcpLGg9ci5kbWF4LHU9ci53c2l6ZSxsPXIud2hhdmUsZj1yLnduZXh0LGQ9ci53aW5kb3csYz1yLmhvbGQscD1yLmJpdHMsbT1yLmxlbmNvZGUsXz1yLmRpc3Rjb2RlLGc9KDE8PHIubGVuYml0cyktMSxiPSgxPDxyLmRpc3RiaXRzKS0xO3Q6ZG97cDwxNSYmKGMrPXpbaSsrXTw8cCxwKz04LGMrPXpbaSsrXTw8cCxwKz04KSx2PW1bYyZnXTtlOmZvcig7Oyl7aWYoYz4+Pj15PXY+Pj4yNCxwLT15LDA9PT0oeT12Pj4+MTYmMjU1KSlDW3MrK109NjU1MzUmdjtlbHNle2lmKCEoMTYmeSkpe2lmKDA9PSg2NCZ5KSl7dj1tWyg2NTUzNSZ2KSsoYyYoMTw8eSktMSldO2NvbnRpbnVlIGV9aWYoMzImeSl7ci5tb2RlPTEyO2JyZWFrIHR9dC5tc2c9XCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGVcIixyLm1vZGU9MzA7YnJlYWsgdH13PTY1NTM1JnYsKHkmPTE1KSYmKHA8eSYmKGMrPXpbaSsrXTw8cCxwKz04KSx3Kz1jJigxPDx5KS0xLGM+Pj49eSxwLT15KSxwPDE1JiYoYys9eltpKytdPDxwLHArPTgsYys9eltpKytdPDxwLHArPTgpLHY9X1tjJmJdO3I6Zm9yKDs7KXtpZihjPj4+PXk9dj4+PjI0LHAtPXksISgxNiYoeT12Pj4+MTYmMjU1KSkpe2lmKDA9PSg2NCZ5KSl7dj1fWyg2NTUzNSZ2KSsoYyYoMTw8eSktMSldO2NvbnRpbnVlIHJ9dC5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIixyLm1vZGU9MzA7YnJlYWsgdH1pZihrPTY1NTM1JnYscDwoeSY9MTUpJiYoYys9eltpKytdPDxwLChwKz04KTx5JiYoYys9eltpKytdPDxwLHArPTgpKSxoPChrKz1jJigxPDx5KS0xKSl7dC5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVhayB0fWlmKGM+Pj49eSxwLT15LCh5PXMtYSk8ayl7aWYobDwoeT1rLXkpJiZyLnNhbmUpe3QubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWsgdH1pZihTPWQsKHg9MCk9PT1mKXtpZih4Kz11LXkseTx3KXtmb3Iody09eTtDW3MrK109ZFt4KytdLC0teTspO3g9cy1rLFM9Q319ZWxzZSBpZihmPHkpe2lmKHgrPXUrZi15LCh5LT1mKTx3KXtmb3Iody09eTtDW3MrK109ZFt4KytdLC0teTspO2lmKHg9MCxmPHcpe2Zvcih3LT15PWY7Q1tzKytdPWRbeCsrXSwtLXk7KTt4PXMtayxTPUN9fX1lbHNlIGlmKHgrPWYteSx5PHcpe2Zvcih3LT15O0NbcysrXT1kW3grK10sLS15Oyk7eD1zLWssUz1DfWZvcig7Mjx3OylDW3MrK109U1t4KytdLENbcysrXT1TW3grK10sQ1tzKytdPVNbeCsrXSx3LT0zO3cmJihDW3MrK109U1t4KytdLDE8dyYmKENbcysrXT1TW3grK10pKX1lbHNle2Zvcih4PXMtaztDW3MrK109Q1t4KytdLENbcysrXT1DW3grK10sQ1tzKytdPUNbeCsrXSwyPCh3LT0zKTspO3cmJihDW3MrK109Q1t4KytdLDE8dyYmKENbcysrXT1DW3grK10pKX1icmVha319YnJlYWt9fXdoaWxlKGk8biYmczxvKTtpLT13PXA+PjMsYyY9KDE8PChwLT13PDwzKSktMSx0Lm5leHRfaW49aSx0Lm5leHRfb3V0PXMsdC5hdmFpbF9pbj1pPG4/bi1pKzU6NS0oaS1uKSx0LmF2YWlsX291dD1zPG8/by1zKzI1NzoyNTctKHMtbyksci5ob2xkPWMsci5iaXRzPXB9fSx7fV0sNDk6W2Z1bmN0aW9uKHQsZSxyKXtcInVzZSBzdHJpY3RcIjt2YXIgST10KFwiLi4vdXRpbHMvY29tbW9uXCIpLE89dChcIi4vYWRsZXIzMlwiKSxCPXQoXCIuL2NyYzMyXCIpLFI9dChcIi4vaW5mZmFzdFwiKSxUPXQoXCIuL2luZnRyZWVzXCIpLEQ9MSxGPTIsTj0wLFU9LTIsUD0xLGk9ODUyLG49NTkyO2Z1bmN0aW9uIEwodCl7cmV0dXJuKHQ+Pj4yNCYyNTUpKyh0Pj4+OCY2NTI4MCkrKCg2NTI4MCZ0KTw8OCkrKCgyNTUmdCk8PDI0KX1mdW5jdGlvbiBzKCl7dGhpcy5tb2RlPTAsdGhpcy5sYXN0PSExLHRoaXMud3JhcD0wLHRoaXMuaGF2ZWRpY3Q9ITEsdGhpcy5mbGFncz0wLHRoaXMuZG1heD0wLHRoaXMuY2hlY2s9MCx0aGlzLnRvdGFsPTAsdGhpcy5oZWFkPW51bGwsdGhpcy53Yml0cz0wLHRoaXMud3NpemU9MCx0aGlzLndoYXZlPTAsdGhpcy53bmV4dD0wLHRoaXMud2luZG93PW51bGwsdGhpcy5ob2xkPTAsdGhpcy5iaXRzPTAsdGhpcy5sZW5ndGg9MCx0aGlzLm9mZnNldD0wLHRoaXMuZXh0cmE9MCx0aGlzLmxlbmNvZGU9bnVsbCx0aGlzLmRpc3Rjb2RlPW51bGwsdGhpcy5sZW5iaXRzPTAsdGhpcy5kaXN0Yml0cz0wLHRoaXMubmNvZGU9MCx0aGlzLm5sZW49MCx0aGlzLm5kaXN0PTAsdGhpcy5oYXZlPTAsdGhpcy5uZXh0PW51bGwsdGhpcy5sZW5zPW5ldyBJLkJ1ZjE2KDMyMCksdGhpcy53b3JrPW5ldyBJLkJ1ZjE2KDI4OCksdGhpcy5sZW5keW49bnVsbCx0aGlzLmRpc3RkeW49bnVsbCx0aGlzLnNhbmU9MCx0aGlzLmJhY2s9MCx0aGlzLndhcz0wfWZ1bmN0aW9uIGEodCl7dmFyIGU7cmV0dXJuIHQmJnQuc3RhdGU/KGU9dC5zdGF0ZSx0LnRvdGFsX2luPXQudG90YWxfb3V0PWUudG90YWw9MCx0Lm1zZz1cIlwiLGUud3JhcCYmKHQuYWRsZXI9MSZlLndyYXApLGUubW9kZT1QLGUubGFzdD0wLGUuaGF2ZWRpY3Q9MCxlLmRtYXg9MzI3NjgsZS5oZWFkPW51bGwsZS5ob2xkPTAsZS5iaXRzPTAsZS5sZW5jb2RlPWUubGVuZHluPW5ldyBJLkJ1ZjMyKGkpLGUuZGlzdGNvZGU9ZS5kaXN0ZHluPW5ldyBJLkJ1ZjMyKG4pLGUuc2FuZT0xLGUuYmFjaz0tMSxOKTpVfWZ1bmN0aW9uIG8odCl7dmFyIGU7cmV0dXJuIHQmJnQuc3RhdGU/KChlPXQuc3RhdGUpLndzaXplPTAsZS53aGF2ZT0wLGUud25leHQ9MCxhKHQpKTpVfWZ1bmN0aW9uIGgodCxlKXt2YXIgcixpO3JldHVybiB0JiZ0LnN0YXRlPyhpPXQuc3RhdGUsZTwwPyhyPTAsZT0tZSk6KHI9MSsoZT4+NCksZTw0OCYmKGUmPTE1KSksZSYmKGU8OHx8MTU8ZSk/VToobnVsbCE9PWkud2luZG93JiZpLndiaXRzIT09ZSYmKGkud2luZG93PW51bGwpLGkud3JhcD1yLGkud2JpdHM9ZSxvKHQpKSk6VX1mdW5jdGlvbiB1KHQsZSl7dmFyIHIsaTtyZXR1cm4gdD8oaT1uZXcgcywodC5zdGF0ZT1pKS53aW5kb3c9bnVsbCwocj1oKHQsZSkpIT09TiYmKHQuc3RhdGU9bnVsbCkscik6VX12YXIgbCxmLGQ9ITA7ZnVuY3Rpb24gaih0KXtpZihkKXt2YXIgZTtmb3IobD1uZXcgSS5CdWYzMig1MTIpLGY9bmV3IEkuQnVmMzIoMzIpLGU9MDtlPDE0NDspdC5sZW5zW2UrK109ODtmb3IoO2U8MjU2Oyl0LmxlbnNbZSsrXT05O2Zvcig7ZTwyODA7KXQubGVuc1tlKytdPTc7Zm9yKDtlPDI4ODspdC5sZW5zW2UrK109ODtmb3IoVChELHQubGVucywwLDI4OCxsLDAsdC53b3JrLHtiaXRzOjl9KSxlPTA7ZTwzMjspdC5sZW5zW2UrK109NTtUKEYsdC5sZW5zLDAsMzIsZiwwLHQud29yayx7Yml0czo1fSksZD0hMX10LmxlbmNvZGU9bCx0LmxlbmJpdHM9OSx0LmRpc3Rjb2RlPWYsdC5kaXN0Yml0cz01fWZ1bmN0aW9uIFoodCxlLHIsaSl7dmFyIG4scz10LnN0YXRlO3JldHVybiBudWxsPT09cy53aW5kb3cmJihzLndzaXplPTE8PHMud2JpdHMscy53bmV4dD0wLHMud2hhdmU9MCxzLndpbmRvdz1uZXcgSS5CdWY4KHMud3NpemUpKSxpPj1zLndzaXplPyhJLmFycmF5U2V0KHMud2luZG93LGUsci1zLndzaXplLHMud3NpemUsMCkscy53bmV4dD0wLHMud2hhdmU9cy53c2l6ZSk6KGk8KG49cy53c2l6ZS1zLnduZXh0KSYmKG49aSksSS5hcnJheVNldChzLndpbmRvdyxlLHItaSxuLHMud25leHQpLChpLT1uKT8oSS5hcnJheVNldChzLndpbmRvdyxlLHItaSxpLDApLHMud25leHQ9aSxzLndoYXZlPXMud3NpemUpOihzLnduZXh0Kz1uLHMud25leHQ9PT1zLndzaXplJiYocy53bmV4dD0wKSxzLndoYXZlPHMud3NpemUmJihzLndoYXZlKz1uKSkpLDB9ci5pbmZsYXRlUmVzZXQ9byxyLmluZmxhdGVSZXNldDI9aCxyLmluZmxhdGVSZXNldEtlZXA9YSxyLmluZmxhdGVJbml0PWZ1bmN0aW9uKHQpe3JldHVybiB1KHQsMTUpfSxyLmluZmxhdGVJbml0Mj11LHIuaW5mbGF0ZT1mdW5jdGlvbih0LGUpe3ZhciByLGksbixzLGEsbyxoLHUsbCxmLGQsYyxwLG0sXyxnLGIsdix5LHcsayx4LFMseixDPTAsRT1uZXcgSS5CdWY4KDQpLEE9WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdO2lmKCF0fHwhdC5zdGF0ZXx8IXQub3V0cHV0fHwhdC5pbnB1dCYmMCE9PXQuYXZhaWxfaW4pcmV0dXJuIFU7MTI9PT0ocj10LnN0YXRlKS5tb2RlJiYoci5tb2RlPTEzKSxhPXQubmV4dF9vdXQsbj10Lm91dHB1dCxoPXQuYXZhaWxfb3V0LHM9dC5uZXh0X2luLGk9dC5pbnB1dCxvPXQuYXZhaWxfaW4sdT1yLmhvbGQsbD1yLmJpdHMsZj1vLGQ9aCx4PU47dDpmb3IoOzspc3dpdGNoKHIubW9kZSl7Y2FzZSBQOmlmKDA9PT1yLndyYXApe3IubW9kZT0xMzticmVha31mb3IoO2w8MTY7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH1pZigyJnIud3JhcCYmMzU2MTU9PT11KXtFW3IuY2hlY2s9MF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApLGw9dT0wLHIubW9kZT0yO2JyZWFrfWlmKHIuZmxhZ3M9MCxyLmhlYWQmJihyLmhlYWQuZG9uZT0hMSksISgxJnIud3JhcCl8fCgoKDI1NSZ1KTw8OCkrKHU+PjgpKSUzMSl7dC5tc2c9XCJpbmNvcnJlY3QgaGVhZGVyIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWlmKDghPSgxNSZ1KSl7dC5tc2c9XCJ1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFwiLHIubW9kZT0zMDticmVha31pZihsLT00LGs9OCsoMTUmKHU+Pj49NCkpLDA9PT1yLndiaXRzKXIud2JpdHM9aztlbHNlIGlmKGs+ci53Yml0cyl7dC5tc2c9XCJpbnZhbGlkIHdpbmRvdyBzaXplXCIsci5tb2RlPTMwO2JyZWFrfXIuZG1heD0xPDxrLHQuYWRsZXI9ci5jaGVjaz0xLHIubW9kZT01MTImdT8xMDoxMixsPXU9MDticmVhaztjYXNlIDI6Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9aWYoci5mbGFncz11LDghPSgyNTUmci5mbGFncykpe3QubXNnPVwidW5rbm93biBjb21wcmVzc2lvbiBtZXRob2RcIixyLm1vZGU9MzA7YnJlYWt9aWYoNTczNDQmci5mbGFncyl7dC5tc2c9XCJ1bmtub3duIGhlYWRlciBmbGFncyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9ci5oZWFkJiYoci5oZWFkLnRleHQ9dT4+OCYxKSw1MTImci5mbGFncyYmKEVbMF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApKSxsPXU9MCxyLm1vZGU9MztjYXNlIDM6Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9ci5oZWFkJiYoci5oZWFkLnRpbWU9dSksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LEVbMl09dT4+PjE2JjI1NSxFWzNdPXU+Pj4yNCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSw0LDApKSxsPXU9MCxyLm1vZGU9NDtjYXNlIDQ6Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9ci5oZWFkJiYoci5oZWFkLnhmbGFncz0yNTUmdSxyLmhlYWQub3M9dT4+OCksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSksbD11PTAsci5tb2RlPTU7Y2FzZSA1OmlmKDEwMjQmci5mbGFncyl7Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9ci5sZW5ndGg9dSxyLmhlYWQmJihyLmhlYWQuZXh0cmFfbGVuPXUpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDIsMCkpLGw9dT0wfWVsc2Ugci5oZWFkJiYoci5oZWFkLmV4dHJhPW51bGwpO3IubW9kZT02O2Nhc2UgNjppZigxMDI0JnIuZmxhZ3MmJihvPChjPXIubGVuZ3RoKSYmKGM9byksYyYmKHIuaGVhZCYmKGs9ci5oZWFkLmV4dHJhX2xlbi1yLmxlbmd0aCxyLmhlYWQuZXh0cmF8fChyLmhlYWQuZXh0cmE9bmV3IEFycmF5KHIuaGVhZC5leHRyYV9sZW4pKSxJLmFycmF5U2V0KHIuaGVhZC5leHRyYSxpLHMsYyxrKSksNTEyJnIuZmxhZ3MmJihyLmNoZWNrPUIoci5jaGVjayxpLGMscykpLG8tPWMscys9YyxyLmxlbmd0aC09Yyksci5sZW5ndGgpKWJyZWFrIHQ7ci5sZW5ndGg9MCxyLm1vZGU9NztjYXNlIDc6aWYoMjA0OCZyLmZsYWdzKXtpZigwPT09bylicmVhayB0O2ZvcihjPTA7az1pW3MrYysrXSxyLmhlYWQmJmsmJnIubGVuZ3RoPDY1NTM2JiYoci5oZWFkLm5hbWUrPVN0cmluZy5mcm9tQ2hhckNvZGUoaykpLGsmJmM8bzspO2lmKDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssaSxjLHMpKSxvLT1jLHMrPWMsaylicmVhayB0fWVsc2Ugci5oZWFkJiYoci5oZWFkLm5hbWU9bnVsbCk7ci5sZW5ndGg9MCxyLm1vZGU9ODtjYXNlIDg6aWYoNDA5NiZyLmZsYWdzKXtpZigwPT09bylicmVhayB0O2ZvcihjPTA7az1pW3MrYysrXSxyLmhlYWQmJmsmJnIubGVuZ3RoPDY1NTM2JiYoci5oZWFkLmNvbW1lbnQrPVN0cmluZy5mcm9tQ2hhckNvZGUoaykpLGsmJmM8bzspO2lmKDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssaSxjLHMpKSxvLT1jLHMrPWMsaylicmVhayB0fWVsc2Ugci5oZWFkJiYoci5oZWFkLmNvbW1lbnQ9bnVsbCk7ci5tb2RlPTk7Y2FzZSA5OmlmKDUxMiZyLmZsYWdzKXtmb3IoO2w8MTY7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH1pZih1IT09KDY1NTM1JnIuY2hlY2spKXt0Lm1zZz1cImhlYWRlciBjcmMgbWlzbWF0Y2hcIixyLm1vZGU9MzA7YnJlYWt9bD11PTB9ci5oZWFkJiYoci5oZWFkLmhjcmM9ci5mbGFncz4+OSYxLHIuaGVhZC5kb25lPSEwKSx0LmFkbGVyPXIuY2hlY2s9MCxyLm1vZGU9MTI7YnJlYWs7Y2FzZSAxMDpmb3IoO2w8MzI7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH10LmFkbGVyPXIuY2hlY2s9TCh1KSxsPXU9MCxyLm1vZGU9MTE7Y2FzZSAxMTppZigwPT09ci5oYXZlZGljdClyZXR1cm4gdC5uZXh0X291dD1hLHQuYXZhaWxfb3V0PWgsdC5uZXh0X2luPXMsdC5hdmFpbF9pbj1vLHIuaG9sZD11LHIuYml0cz1sLDI7dC5hZGxlcj1yLmNoZWNrPTEsci5tb2RlPTEyO2Nhc2UgMTI6aWYoNT09PWV8fDY9PT1lKWJyZWFrIHQ7Y2FzZSAxMzppZihyLmxhc3Qpe3U+Pj49NyZsLGwtPTcmbCxyLm1vZGU9Mjc7YnJlYWt9Zm9yKDtsPDM7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH1zd2l0Y2goci5sYXN0PTEmdSxsLT0xLDMmKHU+Pj49MSkpe2Nhc2UgMDpyLm1vZGU9MTQ7YnJlYWs7Y2FzZSAxOmlmKGoociksci5tb2RlPTIwLDYhPT1lKWJyZWFrO3U+Pj49MixsLT0yO2JyZWFrIHQ7Y2FzZSAyOnIubW9kZT0xNzticmVhaztjYXNlIDM6dC5tc2c9XCJpbnZhbGlkIGJsb2NrIHR5cGVcIixyLm1vZGU9MzB9dT4+Pj0yLGwtPTI7YnJlYWs7Y2FzZSAxNDpmb3IodT4+Pj03JmwsbC09NyZsO2w8MzI7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH1pZigoNjU1MzUmdSkhPSh1Pj4+MTZeNjU1MzUpKXt0Lm1zZz1cImludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHNcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5sZW5ndGg9NjU1MzUmdSxsPXU9MCxyLm1vZGU9MTUsNj09PWUpYnJlYWsgdDtjYXNlIDE1OnIubW9kZT0xNjtjYXNlIDE2OmlmKGM9ci5sZW5ndGgpe2lmKG88YyYmKGM9byksaDxjJiYoYz1oKSwwPT09YylicmVhayB0O0kuYXJyYXlTZXQobixpLHMsYyxhKSxvLT1jLHMrPWMsaC09YyxhKz1jLHIubGVuZ3RoLT1jO2JyZWFrfXIubW9kZT0xMjticmVhaztjYXNlIDE3OmZvcig7bDwxNDspe2lmKDA9PT1vKWJyZWFrIHQ7by0tLHUrPWlbcysrXTw8bCxsKz04fWlmKHIubmxlbj0yNTcrKDMxJnUpLHU+Pj49NSxsLT01LHIubmRpc3Q9MSsoMzEmdSksdT4+Pj01LGwtPTUsci5uY29kZT00KygxNSZ1KSx1Pj4+PTQsbC09NCwyODY8ci5ubGVufHwzMDxyLm5kaXN0KXt0Lm1zZz1cInRvbyBtYW55IGxlbmd0aCBvciBkaXN0YW5jZSBzeW1ib2xzXCIsci5tb2RlPTMwO2JyZWFrfXIuaGF2ZT0wLHIubW9kZT0xODtjYXNlIDE4OmZvcig7ci5oYXZlPHIubmNvZGU7KXtmb3IoO2w8Mzspe2lmKDA9PT1vKWJyZWFrIHQ7by0tLHUrPWlbcysrXTw8bCxsKz04fXIubGVuc1tBW3IuaGF2ZSsrXV09NyZ1LHU+Pj49MyxsLT0zfWZvcig7ci5oYXZlPDE5OylyLmxlbnNbQVtyLmhhdmUrK11dPTA7aWYoci5sZW5jb2RlPXIubGVuZHluLHIubGVuYml0cz03LFM9e2JpdHM6ci5sZW5iaXRzfSx4PVQoMCxyLmxlbnMsMCwxOSxyLmxlbmNvZGUsMCxyLndvcmssUyksci5sZW5iaXRzPVMuYml0cyx4KXt0Lm1zZz1cImludmFsaWQgY29kZSBsZW5ndGhzIHNldFwiLHIubW9kZT0zMDticmVha31yLmhhdmU9MCxyLm1vZGU9MTk7Y2FzZSAxOTpmb3IoO3IuaGF2ZTxyLm5sZW4rci5uZGlzdDspe2Zvcig7Zz0oQz1yLmxlbmNvZGVbdSYoMTw8ci5sZW5iaXRzKS0xXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEoKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH1pZihiPDE2KXU+Pj49XyxsLT1fLHIubGVuc1tyLmhhdmUrK109YjtlbHNle2lmKDE2PT09Yil7Zm9yKHo9XysyO2w8ejspe2lmKDA9PT1vKWJyZWFrIHQ7by0tLHUrPWlbcysrXTw8bCxsKz04fWlmKHU+Pj49XyxsLT1fLDA9PT1yLmhhdmUpe3QubXNnPVwiaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdFwiLHIubW9kZT0zMDticmVha31rPXIubGVuc1tyLmhhdmUtMV0sYz0zKygzJnUpLHU+Pj49MixsLT0yfWVsc2UgaWYoMTc9PT1iKXtmb3Ioej1fKzM7bDx6Oyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9bC09XyxrPTAsYz0zKyg3Jih1Pj4+PV8pKSx1Pj4+PTMsbC09M31lbHNle2Zvcih6PV8rNztsPHo7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH1sLT1fLGs9MCxjPTExKygxMjcmKHU+Pj49XykpLHU+Pj49NyxsLT03fWlmKHIuaGF2ZStjPnIubmxlbityLm5kaXN0KXt0Lm1zZz1cImludmFsaWQgYml0IGxlbmd0aCByZXBlYXRcIixyLm1vZGU9MzA7YnJlYWt9Zm9yKDtjLS07KXIubGVuc1tyLmhhdmUrK109a319aWYoMzA9PT1yLm1vZGUpYnJlYWs7aWYoMD09PXIubGVuc1syNTZdKXt0Lm1zZz1cImludmFsaWQgY29kZSAtLSBtaXNzaW5nIGVuZC1vZi1ibG9ja1wiLHIubW9kZT0zMDticmVha31pZihyLmxlbmJpdHM9OSxTPXtiaXRzOnIubGVuYml0c30seD1UKEQsci5sZW5zLDAsci5ubGVuLHIubGVuY29kZSwwLHIud29yayxTKSxyLmxlbmJpdHM9Uy5iaXRzLHgpe3QubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aHMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfWlmKHIuZGlzdGJpdHM9NixyLmRpc3Rjb2RlPXIuZGlzdGR5bixTPXtiaXRzOnIuZGlzdGJpdHN9LHg9VChGLHIubGVucyxyLm5sZW4sci5uZGlzdCxyLmRpc3Rjb2RlLDAsci53b3JrLFMpLHIuZGlzdGJpdHM9Uy5iaXRzLHgpe3QubXNnPVwiaW52YWxpZCBkaXN0YW5jZXMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfWlmKHIubW9kZT0yMCw2PT09ZSlicmVhayB0O2Nhc2UgMjA6ci5tb2RlPTIxO2Nhc2UgMjE6aWYoNjw9byYmMjU4PD1oKXt0Lm5leHRfb3V0PWEsdC5hdmFpbF9vdXQ9aCx0Lm5leHRfaW49cyx0LmF2YWlsX2luPW8sci5ob2xkPXUsci5iaXRzPWwsUih0LGQpLGE9dC5uZXh0X291dCxuPXQub3V0cHV0LGg9dC5hdmFpbF9vdXQscz10Lm5leHRfaW4saT10LmlucHV0LG89dC5hdmFpbF9pbix1PXIuaG9sZCxsPXIuYml0cywxMj09PXIubW9kZSYmKHIuYmFjaz0tMSk7YnJlYWt9Zm9yKHIuYmFjaz0wO2c9KEM9ci5sZW5jb2RlW3UmKDE8PHIubGVuYml0cyktMV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKChfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9aWYoZyYmMD09KDI0MCZnKSl7Zm9yKHY9Xyx5PWcsdz1iO2c9KEM9ci5sZW5jb2RlW3crKCh1JigxPDx2K3kpLTEpPj52KV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKHYrKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH11Pj4+PXYsbC09dixyLmJhY2srPXZ9aWYodT4+Pj1fLGwtPV8sci5iYWNrKz1fLHIubGVuZ3RoPWIsMD09PWcpe3IubW9kZT0yNjticmVha31pZigzMiZnKXtyLmJhY2s9LTEsci5tb2RlPTEyO2JyZWFrfWlmKDY0Jmcpe3QubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlXCIsci5tb2RlPTMwO2JyZWFrfXIuZXh0cmE9MTUmZyxyLm1vZGU9MjI7Y2FzZSAyMjppZihyLmV4dHJhKXtmb3Ioej1yLmV4dHJhO2w8ejspe2lmKDA9PT1vKWJyZWFrIHQ7by0tLHUrPWlbcysrXTw8bCxsKz04fXIubGVuZ3RoKz11JigxPDxyLmV4dHJhKS0xLHU+Pj49ci5leHRyYSxsLT1yLmV4dHJhLHIuYmFjays9ci5leHRyYX1yLndhcz1yLmxlbmd0aCxyLm1vZGU9MjM7Y2FzZSAyMzpmb3IoO2c9KEM9ci5kaXN0Y29kZVt1JigxPDxyLmRpc3RiaXRzKS0xXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEoKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH1pZigwPT0oMjQwJmcpKXtmb3Iodj1fLHk9Zyx3PWI7Zz0oQz1yLmRpc3Rjb2RlW3crKCh1JigxPDx2K3kpLTEpPj52KV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKHYrKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayB0O28tLSx1Kz1pW3MrK108PGwsbCs9OH11Pj4+PXYsbC09dixyLmJhY2srPXZ9aWYodT4+Pj1fLGwtPV8sci5iYWNrKz1fLDY0Jmcpe3QubXNnPVwiaW52YWxpZCBkaXN0YW5jZSBjb2RlXCIsci5tb2RlPTMwO2JyZWFrfXIub2Zmc2V0PWIsci5leHRyYT0xNSZnLHIubW9kZT0yNDtjYXNlIDI0OmlmKHIuZXh0cmEpe2Zvcih6PXIuZXh0cmE7bDx6Oyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9ci5vZmZzZXQrPXUmKDE8PHIuZXh0cmEpLTEsdT4+Pj1yLmV4dHJhLGwtPXIuZXh0cmEsci5iYWNrKz1yLmV4dHJhfWlmKHIub2Zmc2V0PnIuZG1heCl7dC5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVha31yLm1vZGU9MjU7Y2FzZSAyNTppZigwPT09aClicmVhayB0O2lmKGM9ZC1oLHIub2Zmc2V0PmMpe2lmKChjPXIub2Zmc2V0LWMpPnIud2hhdmUmJnIuc2FuZSl7dC5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVha31wPWM+ci53bmV4dD8oYy09ci53bmV4dCxyLndzaXplLWMpOnIud25leHQtYyxjPnIubGVuZ3RoJiYoYz1yLmxlbmd0aCksbT1yLndpbmRvd31lbHNlIG09bixwPWEtci5vZmZzZXQsYz1yLmxlbmd0aDtmb3IoaDxjJiYoYz1oKSxoLT1jLHIubGVuZ3RoLT1jO25bYSsrXT1tW3ArK10sLS1jOyk7MD09PXIubGVuZ3RoJiYoci5tb2RlPTIxKTticmVhaztjYXNlIDI2OmlmKDA9PT1oKWJyZWFrIHQ7blthKytdPXIubGVuZ3RoLGgtLSxyLm1vZGU9MjE7YnJlYWs7Y2FzZSAyNzppZihyLndyYXApe2Zvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIHQ7by0tLHV8PWlbcysrXTw8bCxsKz04fWlmKGQtPWgsdC50b3RhbF9vdXQrPWQsci50b3RhbCs9ZCxkJiYodC5hZGxlcj1yLmNoZWNrPXIuZmxhZ3M/QihyLmNoZWNrLG4sZCxhLWQpOk8oci5jaGVjayxuLGQsYS1kKSksZD1oLChyLmZsYWdzP3U6TCh1KSkhPT1yLmNoZWNrKXt0Lm1zZz1cImluY29ycmVjdCBkYXRhIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWw9dT0wfXIubW9kZT0yODtjYXNlIDI4OmlmKHIud3JhcCYmci5mbGFncyl7Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgdDtvLS0sdSs9aVtzKytdPDxsLGwrPTh9aWYodSE9PSg0Mjk0OTY3Mjk1JnIudG90YWwpKXt0Lm1zZz1cImluY29ycmVjdCBsZW5ndGggY2hlY2tcIixyLm1vZGU9MzA7YnJlYWt9bD11PTB9ci5tb2RlPTI5O2Nhc2UgMjk6eD0xO2JyZWFrIHQ7Y2FzZSAzMDp4PS0zO2JyZWFrIHQ7Y2FzZSAzMTpyZXR1cm4tNDtjYXNlIDMyOmRlZmF1bHQ6cmV0dXJuIFV9cmV0dXJuIHQubmV4dF9vdXQ9YSx0LmF2YWlsX291dD1oLHQubmV4dF9pbj1zLHQuYXZhaWxfaW49byxyLmhvbGQ9dSxyLmJpdHM9bCwoci53c2l6ZXx8ZCE9PXQuYXZhaWxfb3V0JiZyLm1vZGU8MzAmJihyLm1vZGU8Mjd8fDQhPT1lKSkmJloodCx0Lm91dHB1dCx0Lm5leHRfb3V0LGQtdC5hdmFpbF9vdXQpPyhyLm1vZGU9MzEsLTQpOihmLT10LmF2YWlsX2luLGQtPXQuYXZhaWxfb3V0LHQudG90YWxfaW4rPWYsdC50b3RhbF9vdXQrPWQsci50b3RhbCs9ZCxyLndyYXAmJmQmJih0LmFkbGVyPXIuY2hlY2s9ci5mbGFncz9CKHIuY2hlY2ssbixkLHQubmV4dF9vdXQtZCk6TyhyLmNoZWNrLG4sZCx0Lm5leHRfb3V0LWQpKSx0LmRhdGFfdHlwZT1yLmJpdHMrKHIubGFzdD82NDowKSsoMTI9PT1yLm1vZGU/MTI4OjApKygyMD09PXIubW9kZXx8MTU9PT1yLm1vZGU/MjU2OjApLCgwPT1mJiYwPT09ZHx8ND09PWUpJiZ4PT09TiYmKHg9LTUpLHgpfSxyLmluZmxhdGVFbmQ9ZnVuY3Rpb24odCl7aWYoIXR8fCF0LnN0YXRlKXJldHVybiBVO3ZhciBlPXQuc3RhdGU7cmV0dXJuIGUud2luZG93JiYoZS53aW5kb3c9bnVsbCksdC5zdGF0ZT1udWxsLE59LHIuaW5mbGF0ZUdldEhlYWRlcj1mdW5jdGlvbih0LGUpe3ZhciByO3JldHVybiB0JiZ0LnN0YXRlPzA9PSgyJihyPXQuc3RhdGUpLndyYXApP1U6KChyLmhlYWQ9ZSkuZG9uZT0hMSxOKTpVfSxyLmluZmxhdGVTZXREaWN0aW9uYXJ5PWZ1bmN0aW9uKHQsZSl7dmFyIHIsaT1lLmxlbmd0aDtyZXR1cm4gdCYmdC5zdGF0ZT8wIT09KHI9dC5zdGF0ZSkud3JhcCYmMTEhPT1yLm1vZGU/VToxMT09PXIubW9kZSYmTygxLGUsaSwwKSE9PXIuY2hlY2s/LTM6Wih0LGUsaSxpKT8oci5tb2RlPTMxLC00KTooci5oYXZlZGljdD0xLE4pOlV9LHIuaW5mbGF0ZUluZm89XCJwYWtvIGluZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpXCJ9LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9hZGxlcjMyXCI6NDMsXCIuL2NyYzMyXCI6NDUsXCIuL2luZmZhc3RcIjo0OCxcIi4vaW5mdHJlZXNcIjo1MH1dLDUwOltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIEQ9dChcIi4uL3V0aWxzL2NvbW1vblwiKSxGPVszLDQsNSw2LDcsOCw5LDEwLDExLDEzLDE1LDE3LDE5LDIzLDI3LDMxLDM1LDQzLDUxLDU5LDY3LDgzLDk5LDExNSwxMzEsMTYzLDE5NSwyMjcsMjU4LDAsMF0sTj1bMTYsMTYsMTYsMTYsMTYsMTYsMTYsMTYsMTcsMTcsMTcsMTcsMTgsMTgsMTgsMTgsMTksMTksMTksMTksMjAsMjAsMjAsMjAsMjEsMjEsMjEsMjEsMTYsNzIsNzhdLFU9WzEsMiwzLDQsNSw3LDksMTMsMTcsMjUsMzMsNDksNjUsOTcsMTI5LDE5MywyNTcsMzg1LDUxMyw3NjksMTAyNSwxNTM3LDIwNDksMzA3Myw0MDk3LDYxNDUsODE5MywxMjI4OSwxNjM4NSwyNDU3NywwLDBdLFA9WzE2LDE2LDE2LDE2LDE3LDE3LDE4LDE4LDE5LDE5LDIwLDIwLDIxLDIxLDIyLDIyLDIzLDIzLDI0LDI0LDI1LDI1LDI2LDI2LDI3LDI3LDI4LDI4LDI5LDI5LDY0LDY0XTtlLmV4cG9ydHM9ZnVuY3Rpb24odCxlLHIsaSxuLHMsYSxvKXt2YXIgaCx1LGwsZixkLGMscCxtLF8sZz1vLmJpdHMsYj0wLHY9MCx5PTAsdz0wLGs9MCx4PTAsUz0wLHo9MCxDPTAsRT0wLEE9bnVsbCxJPTAsTz1uZXcgRC5CdWYxNigxNiksQj1uZXcgRC5CdWYxNigxNiksUj1udWxsLFQ9MDtmb3IoYj0wO2I8PTE1O2IrKylPW2JdPTA7Zm9yKHY9MDt2PGk7disrKU9bZVtyK3ZdXSsrO2ZvcihrPWcsdz0xNTsxPD13JiYwPT09T1t3XTt3LS0pO2lmKHc8ayYmKGs9dyksMD09PXcpcmV0dXJuIG5bcysrXT0yMDk3MTUyMCxuW3MrK109MjA5NzE1MjAsby5iaXRzPTEsMDtmb3IoeT0xO3k8dyYmMD09PU9beV07eSsrKTtmb3Ioazx5JiYoaz15KSxiPXo9MTtiPD0xNTtiKyspaWYoejw8PTEsKHotPU9bYl0pPDApcmV0dXJuLTE7aWYoMDx6JiYoMD09PXR8fDEhPT13KSlyZXR1cm4tMTtmb3IoQlsxXT0wLGI9MTtiPDE1O2IrKylCW2IrMV09QltiXStPW2JdO2Zvcih2PTA7djxpO3YrKykwIT09ZVtyK3ZdJiYoYVtCW2Vbcit2XV0rK109dik7aWYoYz0wPT09dD8oQT1SPWEsMTkpOjE9PT10PyhBPUYsSS09MjU3LFI9TixULT0yNTcsMjU2KTooQT1VLFI9UCwtMSksYj15LGQ9cyxTPXY9RT0wLGw9LTEsZj0oQz0xPDwoeD1rKSktMSwxPT09dCYmODUyPEN8fDI9PT10JiY1OTI8QylyZXR1cm4gMTtmb3IoOzspe2ZvcihwPWItUyxfPWFbdl08Yz8obT0wLGFbdl0pOmFbdl0+Yz8obT1SW1QrYVt2XV0sQVtJK2Fbdl1dKToobT05NiwwKSxoPTE8PGItUyx5PXU9MTw8eDtuW2QrKEU+PlMpKyh1LT1oKV09cDw8MjR8bTw8MTZ8X3wwLDAhPT11Oyk7Zm9yKGg9MTw8Yi0xO0UmaDspaD4+PTE7aWYoMCE9PWg/KEUmPWgtMSxFKz1oKTpFPTAsdisrLDA9PS0tT1tiXSl7aWYoYj09PXcpYnJlYWs7Yj1lW3IrYVt2XV19aWYoazxiJiYoRSZmKSE9PWwpe2ZvcigwPT09UyYmKFM9ayksZCs9eSx6PTE8PCh4PWItUyk7eCtTPHcmJiEoKHotPU9beCtTXSk8PTApOyl4Kyssejw8PTE7aWYoQys9MTw8eCwxPT09dCYmODUyPEN8fDI9PT10JiY1OTI8QylyZXR1cm4gMTtuW2w9RSZmXT1rPDwyNHx4PDwxNnxkLXN8MH19cmV0dXJuIDAhPT1FJiYobltkK0VdPWItUzw8MjR8NjQ8PDE2fDApLG8uYml0cz1rLDB9fSx7XCIuLi91dGlscy9jb21tb25cIjo0MX1dLDUxOltmdW5jdGlvbih0LGUscil7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPXsyOlwibmVlZCBkaWN0aW9uYXJ5XCIsMTpcInN0cmVhbSBlbmRcIiwwOlwiXCIsXCItMVwiOlwiZmlsZSBlcnJvclwiLFwiLTJcIjpcInN0cmVhbSBlcnJvclwiLFwiLTNcIjpcImRhdGEgZXJyb3JcIixcIi00XCI6XCJpbnN1ZmZpY2llbnQgbWVtb3J5XCIsXCItNVwiOlwiYnVmZmVyIGVycm9yXCIsXCItNlwiOlwiaW5jb21wYXRpYmxlIHZlcnNpb25cIn19LHt9XSw1MjpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO3ZhciBuPXQoXCIuLi91dGlscy9jb21tb25cIiksbz0wLGg9MTtmdW5jdGlvbiBpKHQpe2Zvcih2YXIgZT10Lmxlbmd0aDswPD0tLWU7KXRbZV09MH12YXIgcz0wLGE9MjksdT0yNTYsbD11KzErYSxmPTMwLGQ9MTksXz0yKmwrMSxnPTE1LGM9MTYscD03LG09MjU2LGI9MTYsdj0xNyx5PTE4LHc9WzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMF0saz1bMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxM10seD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyLDMsN10sUz1bMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV0sej1uZXcgQXJyYXkoMioobCsyKSk7aSh6KTt2YXIgQz1uZXcgQXJyYXkoMipmKTtpKEMpO3ZhciBFPW5ldyBBcnJheSg1MTIpO2koRSk7dmFyIEE9bmV3IEFycmF5KDI1Nik7aShBKTt2YXIgST1uZXcgQXJyYXkoYSk7aShJKTt2YXIgTyxCLFIsVD1uZXcgQXJyYXkoZik7ZnVuY3Rpb24gRCh0LGUscixpLG4pe3RoaXMuc3RhdGljX3RyZWU9dCx0aGlzLmV4dHJhX2JpdHM9ZSx0aGlzLmV4dHJhX2Jhc2U9cix0aGlzLmVsZW1zPWksdGhpcy5tYXhfbGVuZ3RoPW4sdGhpcy5oYXNfc3RyZWU9dCYmdC5sZW5ndGh9ZnVuY3Rpb24gRih0LGUpe3RoaXMuZHluX3RyZWU9dCx0aGlzLm1heF9jb2RlPTAsdGhpcy5zdGF0X2Rlc2M9ZX1mdW5jdGlvbiBOKHQpe3JldHVybiB0PDI1Nj9FW3RdOkVbMjU2Kyh0Pj4+NyldfWZ1bmN0aW9uIFUodCxlKXt0LnBlbmRpbmdfYnVmW3QucGVuZGluZysrXT0yNTUmZSx0LnBlbmRpbmdfYnVmW3QucGVuZGluZysrXT1lPj4+OCYyNTV9ZnVuY3Rpb24gUCh0LGUscil7dC5iaV92YWxpZD5jLXI/KHQuYmlfYnVmfD1lPDx0LmJpX3ZhbGlkJjY1NTM1LFUodCx0LmJpX2J1ZiksdC5iaV9idWY9ZT4+Yy10LmJpX3ZhbGlkLHQuYmlfdmFsaWQrPXItYyk6KHQuYmlfYnVmfD1lPDx0LmJpX3ZhbGlkJjY1NTM1LHQuYmlfdmFsaWQrPXIpfWZ1bmN0aW9uIEwodCxlLHIpe1AodCxyWzIqZV0sclsyKmUrMV0pfWZ1bmN0aW9uIGoodCxlKXtmb3IodmFyIHI9MDtyfD0xJnQsdD4+Pj0xLHI8PD0xLDA8LS1lOyk7cmV0dXJuIHI+Pj4xfWZ1bmN0aW9uIFoodCxlLHIpe3ZhciBpLG4scz1uZXcgQXJyYXkoZysxKSxhPTA7Zm9yKGk9MTtpPD1nO2krKylzW2ldPWE9YStyW2ktMV08PDE7Zm9yKG49MDtuPD1lO24rKyl7dmFyIG89dFsyKm4rMV07MCE9PW8mJih0WzIqbl09aihzW29dKyssbykpfX1mdW5jdGlvbiBXKHQpe3ZhciBlO2ZvcihlPTA7ZTxsO2UrKyl0LmR5bl9sdHJlZVsyKmVdPTA7Zm9yKGU9MDtlPGY7ZSsrKXQuZHluX2R0cmVlWzIqZV09MDtmb3IoZT0wO2U8ZDtlKyspdC5ibF90cmVlWzIqZV09MDt0LmR5bl9sdHJlZVsyKm1dPTEsdC5vcHRfbGVuPXQuc3RhdGljX2xlbj0wLHQubGFzdF9saXQ9dC5tYXRjaGVzPTB9ZnVuY3Rpb24gTSh0KXs4PHQuYmlfdmFsaWQ/VSh0LHQuYmlfYnVmKTowPHQuYmlfdmFsaWQmJih0LnBlbmRpbmdfYnVmW3QucGVuZGluZysrXT10LmJpX2J1ZiksdC5iaV9idWY9MCx0LmJpX3ZhbGlkPTB9ZnVuY3Rpb24gSCh0LGUscixpKXt2YXIgbj0yKmUscz0yKnI7cmV0dXJuIHRbbl08dFtzXXx8dFtuXT09PXRbc10mJmlbZV08PWlbcl19ZnVuY3Rpb24gRyh0LGUscil7Zm9yKHZhciBpPXQuaGVhcFtyXSxuPXI8PDE7bjw9dC5oZWFwX2xlbiYmKG48dC5oZWFwX2xlbiYmSChlLHQuaGVhcFtuKzFdLHQuaGVhcFtuXSx0LmRlcHRoKSYmbisrLCFIKGUsaSx0LmhlYXBbbl0sdC5kZXB0aCkpOyl0LmhlYXBbcl09dC5oZWFwW25dLHI9bixuPDw9MTt0LmhlYXBbcl09aX1mdW5jdGlvbiBLKHQsZSxyKXt2YXIgaSxuLHMsYSxvPTA7aWYoMCE9PXQubGFzdF9saXQpZm9yKDtpPXQucGVuZGluZ19idWZbdC5kX2J1ZisyKm9dPDw4fHQucGVuZGluZ19idWZbdC5kX2J1ZisyKm8rMV0sbj10LnBlbmRpbmdfYnVmW3QubF9idWYrb10sbysrLDA9PT1pP0wodCxuLGUpOihMKHQsKHM9QVtuXSkrdSsxLGUpLDAhPT0oYT13W3NdKSYmUCh0LG4tPUlbc10sYSksTCh0LHM9TigtLWkpLHIpLDAhPT0oYT1rW3NdKSYmUCh0LGktPVRbc10sYSkpLG88dC5sYXN0X2xpdDspO0wodCxtLGUpfWZ1bmN0aW9uIFkodCxlKXt2YXIgcixpLG4scz1lLmR5bl90cmVlLGE9ZS5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsbz1lLnN0YXRfZGVzYy5oYXNfc3RyZWUsaD1lLnN0YXRfZGVzYy5lbGVtcyx1PS0xO2Zvcih0LmhlYXBfbGVuPTAsdC5oZWFwX21heD1fLHI9MDtyPGg7cisrKTAhPT1zWzIqcl0/KHQuaGVhcFsrK3QuaGVhcF9sZW5dPXU9cix0LmRlcHRoW3JdPTApOnNbMipyKzFdPTA7Zm9yKDt0LmhlYXBfbGVuPDI7KXNbMioobj10LmhlYXBbKyt0LmhlYXBfbGVuXT11PDI/Kyt1OjApXT0xLHQuZGVwdGhbbl09MCx0Lm9wdF9sZW4tLSxvJiYodC5zdGF0aWNfbGVuLT1hWzIqbisxXSk7Zm9yKGUubWF4X2NvZGU9dSxyPXQuaGVhcF9sZW4+PjE7MTw9cjtyLS0pRyh0LHMscik7Zm9yKG49aDtyPXQuaGVhcFsxXSx0LmhlYXBbMV09dC5oZWFwW3QuaGVhcF9sZW4tLV0sRyh0LHMsMSksaT10LmhlYXBbMV0sdC5oZWFwWy0tdC5oZWFwX21heF09cix0LmhlYXBbLS10LmhlYXBfbWF4XT1pLHNbMipuXT1zWzIqcl0rc1syKmldLHQuZGVwdGhbbl09KHQuZGVwdGhbcl0+PXQuZGVwdGhbaV0/dC5kZXB0aFtyXTp0LmRlcHRoW2ldKSsxLHNbMipyKzFdPXNbMippKzFdPW4sdC5oZWFwWzFdPW4rKyxHKHQscywxKSwyPD10LmhlYXBfbGVuOyk7dC5oZWFwWy0tdC5oZWFwX21heF09dC5oZWFwWzFdLGZ1bmN0aW9uKHQsZSl7dmFyIHIsaSxuLHMsYSxvLGg9ZS5keW5fdHJlZSx1PWUubWF4X2NvZGUsbD1lLnN0YXRfZGVzYy5zdGF0aWNfdHJlZSxmPWUuc3RhdF9kZXNjLmhhc19zdHJlZSxkPWUuc3RhdF9kZXNjLmV4dHJhX2JpdHMsYz1lLnN0YXRfZGVzYy5leHRyYV9iYXNlLHA9ZS5zdGF0X2Rlc2MubWF4X2xlbmd0aCxtPTA7Zm9yKHM9MDtzPD1nO3MrKyl0LmJsX2NvdW50W3NdPTA7Zm9yKGhbMip0LmhlYXBbdC5oZWFwX21heF0rMV09MCxyPXQuaGVhcF9tYXgrMTtyPF87cisrKXA8KHM9aFsyKmhbMiooaT10LmhlYXBbcl0pKzFdKzFdKzEpJiYocz1wLG0rKyksaFsyKmkrMV09cyx1PGl8fCh0LmJsX2NvdW50W3NdKyssYT0wLGM8PWkmJihhPWRbaS1jXSksbz1oWzIqaV0sdC5vcHRfbGVuKz1vKihzK2EpLGYmJih0LnN0YXRpY19sZW4rPW8qKGxbMippKzFdK2EpKSk7aWYoMCE9PW0pe2Rve2ZvcihzPXAtMTswPT09dC5ibF9jb3VudFtzXTspcy0tO3QuYmxfY291bnRbc10tLSx0LmJsX2NvdW50W3MrMV0rPTIsdC5ibF9jb3VudFtwXS0tLG0tPTJ9d2hpbGUoMDxtKTtmb3Iocz1wOzAhPT1zO3MtLSlmb3IoaT10LmJsX2NvdW50W3NdOzAhPT1pOyl1PChuPXQuaGVhcFstLXJdKXx8KGhbMipuKzFdIT09cyYmKHQub3B0X2xlbis9KHMtaFsyKm4rMV0pKmhbMipuXSxoWzIqbisxXT1zKSxpLS0pfX0odCxlKSxaKHMsdSx0LmJsX2NvdW50KX1mdW5jdGlvbiBYKHQsZSxyKXt2YXIgaSxuLHM9LTEsYT1lWzFdLG89MCxoPTcsdT00O2ZvcigwPT09YSYmKGg9MTM4LHU9MyksZVsyKihyKzEpKzFdPTY1NTM1LGk9MDtpPD1yO2krKyluPWEsYT1lWzIqKGkrMSkrMV0sKytvPGgmJm49PT1hfHwobzx1P3QuYmxfdHJlZVsyKm5dKz1vOjAhPT1uPyhuIT09cyYmdC5ibF90cmVlWzIqbl0rKyx0LmJsX3RyZWVbMipiXSsrKTpvPD0xMD90LmJsX3RyZWVbMip2XSsrOnQuYmxfdHJlZVsyKnldKysscz1uLHU9KG89MCk9PT1hPyhoPTEzOCwzKTpuPT09YT8oaD02LDMpOihoPTcsNCkpfWZ1bmN0aW9uIFYodCxlLHIpe3ZhciBpLG4scz0tMSxhPWVbMV0sbz0wLGg9Nyx1PTQ7Zm9yKDA9PT1hJiYoaD0xMzgsdT0zKSxpPTA7aTw9cjtpKyspaWYobj1hLGE9ZVsyKihpKzEpKzFdLCEoKytvPGgmJm49PT1hKSl7aWYobzx1KWZvcig7TCh0LG4sdC5ibF90cmVlKSwwIT0tLW87KTtlbHNlIDAhPT1uPyhuIT09cyYmKEwodCxuLHQuYmxfdHJlZSksby0tKSxMKHQsYix0LmJsX3RyZWUpLFAodCxvLTMsMikpOm88PTEwPyhMKHQsdix0LmJsX3RyZWUpLFAodCxvLTMsMykpOihMKHQseSx0LmJsX3RyZWUpLFAodCxvLTExLDcpKTtzPW4sdT0obz0wKT09PWE/KGg9MTM4LDMpOm49PT1hPyhoPTYsMyk6KGg9Nyw0KX19aShUKTt2YXIgcT0hMTtmdW5jdGlvbiBKKHQsZSxyLGkpe1AodCwoczw8MSkrKGk/MTowKSwzKSxmdW5jdGlvbih0LGUscixpKXtNKHQpLGkmJihVKHQsciksVSh0LH5yKSksbi5hcnJheVNldCh0LnBlbmRpbmdfYnVmLHQud2luZG93LGUscix0LnBlbmRpbmcpLHQucGVuZGluZys9cn0odCxlLHIsITApfXIuX3RyX2luaXQ9ZnVuY3Rpb24odCl7cXx8KGZ1bmN0aW9uKCl7dmFyIHQsZSxyLGksbixzPW5ldyBBcnJheShnKzEpO2ZvcihpPXI9MDtpPGEtMTtpKyspZm9yKElbaV09cix0PTA7dDwxPDx3W2ldO3QrKylBW3IrK109aTtmb3IoQVtyLTFdPWksaT1uPTA7aTwxNjtpKyspZm9yKFRbaV09bix0PTA7dDwxPDxrW2ldO3QrKylFW24rK109aTtmb3Iobj4+PTc7aTxmO2krKylmb3IoVFtpXT1uPDw3LHQ9MDt0PDE8PGtbaV0tNzt0KyspRVsyNTYrbisrXT1pO2ZvcihlPTA7ZTw9ZztlKyspc1tlXT0wO2Zvcih0PTA7dDw9MTQzOyl6WzIqdCsxXT04LHQrKyxzWzhdKys7Zm9yKDt0PD0yNTU7KXpbMip0KzFdPTksdCsrLHNbOV0rKztmb3IoO3Q8PTI3OTspelsyKnQrMV09Nyx0Kyssc1s3XSsrO2Zvcig7dDw9Mjg3Oyl6WzIqdCsxXT04LHQrKyxzWzhdKys7Zm9yKFooeixsKzEscyksdD0wO3Q8Zjt0KyspQ1syKnQrMV09NSxDWzIqdF09aih0LDUpO089bmV3IEQoeix3LHUrMSxsLGcpLEI9bmV3IEQoQyxrLDAsZixnKSxSPW5ldyBEKG5ldyBBcnJheSgwKSx4LDAsZCxwKX0oKSxxPSEwKSx0LmxfZGVzYz1uZXcgRih0LmR5bl9sdHJlZSxPKSx0LmRfZGVzYz1uZXcgRih0LmR5bl9kdHJlZSxCKSx0LmJsX2Rlc2M9bmV3IEYodC5ibF90cmVlLFIpLHQuYmlfYnVmPTAsdC5iaV92YWxpZD0wLFcodCl9LHIuX3RyX3N0b3JlZF9ibG9jaz1KLHIuX3RyX2ZsdXNoX2Jsb2NrPWZ1bmN0aW9uKHQsZSxyLGkpe3ZhciBuLHMsYT0wOzA8dC5sZXZlbD8oMj09PXQuc3RybS5kYXRhX3R5cGUmJih0LnN0cm0uZGF0YV90eXBlPWZ1bmN0aW9uKHQpe3ZhciBlLHI9NDA5MzYyNDQ0Nztmb3IoZT0wO2U8PTMxO2UrKyxyPj4+PTEpaWYoMSZyJiYwIT09dC5keW5fbHRyZWVbMiplXSlyZXR1cm4gbztpZigwIT09dC5keW5fbHRyZWVbMThdfHwwIT09dC5keW5fbHRyZWVbMjBdfHwwIT09dC5keW5fbHRyZWVbMjZdKXJldHVybiBoO2ZvcihlPTMyO2U8dTtlKyspaWYoMCE9PXQuZHluX2x0cmVlWzIqZV0pcmV0dXJuIGg7cmV0dXJuIG99KHQpKSxZKHQsdC5sX2Rlc2MpLFkodCx0LmRfZGVzYyksYT1mdW5jdGlvbih0KXt2YXIgZTtmb3IoWCh0LHQuZHluX2x0cmVlLHQubF9kZXNjLm1heF9jb2RlKSxYKHQsdC5keW5fZHRyZWUsdC5kX2Rlc2MubWF4X2NvZGUpLFkodCx0LmJsX2Rlc2MpLGU9ZC0xOzM8PWUmJjA9PT10LmJsX3RyZWVbMipTW2VdKzFdO2UtLSk7cmV0dXJuIHQub3B0X2xlbis9MyooZSsxKSs1KzUrNCxlfSh0KSxuPXQub3B0X2xlbiszKzc+Pj4zLChzPXQuc3RhdGljX2xlbiszKzc+Pj4zKTw9biYmKG49cykpOm49cz1yKzUscis0PD1uJiYtMSE9PWU/Sih0LGUscixpKTo0PT09dC5zdHJhdGVneXx8cz09PW4/KFAodCwyKyhpPzE6MCksMyksSyh0LHosQykpOihQKHQsNCsoaT8xOjApLDMpLGZ1bmN0aW9uKHQsZSxyLGkpe3ZhciBuO2ZvcihQKHQsZS0yNTcsNSksUCh0LHItMSw1KSxQKHQsaS00LDQpLG49MDtuPGk7bisrKVAodCx0LmJsX3RyZWVbMipTW25dKzFdLDMpO1YodCx0LmR5bl9sdHJlZSxlLTEpLFYodCx0LmR5bl9kdHJlZSxyLTEpfSh0LHQubF9kZXNjLm1heF9jb2RlKzEsdC5kX2Rlc2MubWF4X2NvZGUrMSxhKzEpLEsodCx0LmR5bl9sdHJlZSx0LmR5bl9kdHJlZSkpLFcodCksaSYmTSh0KX0sci5fdHJfdGFsbHk9ZnVuY3Rpb24odCxlLHIpe3JldHVybiB0LnBlbmRpbmdfYnVmW3QuZF9idWYrMip0Lmxhc3RfbGl0XT1lPj4+OCYyNTUsdC5wZW5kaW5nX2J1Zlt0LmRfYnVmKzIqdC5sYXN0X2xpdCsxXT0yNTUmZSx0LnBlbmRpbmdfYnVmW3QubF9idWYrdC5sYXN0X2xpdF09MjU1JnIsdC5sYXN0X2xpdCsrLDA9PT1lP3QuZHluX2x0cmVlWzIqcl0rKzoodC5tYXRjaGVzKyssZS0tLHQuZHluX2x0cmVlWzIqKEFbcl0rdSsxKV0rKyx0LmR5bl9kdHJlZVsyKk4oZSldKyspLHQubGFzdF9saXQ9PT10LmxpdF9idWZzaXplLTF9LHIuX3RyX2FsaWduPWZ1bmN0aW9uKHQpe1AodCwyLDMpLEwodCxtLHopLGZ1bmN0aW9uKHQpezE2PT09dC5iaV92YWxpZD8oVSh0LHQuYmlfYnVmKSx0LmJpX2J1Zj0wLHQuYmlfdmFsaWQ9MCk6ODw9dC5iaV92YWxpZCYmKHQucGVuZGluZ19idWZbdC5wZW5kaW5nKytdPTI1NSZ0LmJpX2J1Zix0LmJpX2J1Zj4+PTgsdC5iaV92YWxpZC09OCl9KHQpfX0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDF9XSw1MzpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO2UuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMuaW5wdXQ9bnVsbCx0aGlzLm5leHRfaW49MCx0aGlzLmF2YWlsX2luPTAsdGhpcy50b3RhbF9pbj0wLHRoaXMub3V0cHV0PW51bGwsdGhpcy5uZXh0X291dD0wLHRoaXMuYXZhaWxfb3V0PTAsdGhpcy50b3RhbF9vdXQ9MCx0aGlzLm1zZz1cIlwiLHRoaXMuc3RhdGU9bnVsbCx0aGlzLmRhdGFfdHlwZT0yLHRoaXMuYWRsZXI9MH19LHt9XSw1NDpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO2UuZXhwb3J0cz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBzZXRJbW1lZGlhdGU/c2V0SW1tZWRpYXRlOmZ1bmN0aW9uKCl7dmFyIHQ9W10uc2xpY2UuYXBwbHkoYXJndW1lbnRzKTt0LnNwbGljZSgxLDAsMCksc2V0VGltZW91dC5hcHBseShudWxsLHQpfX0se31dfSx7fSxbMTBdKSgxMCl9KTsiLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlIHYxLjQuMSBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0LyoqIERldGVjdCBmcmVlIHZhcmlhYmxlcyAqL1xuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmXG5cdFx0IWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdCFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoXG5cdFx0ZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwuc2VsZiA9PT0gZnJlZUdsb2JhbFxuXHQpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYHB1bnljb2RlYCBvYmplY3QuXG5cdCAqIEBuYW1lIHB1bnljb2RlXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKi9cblx0dmFyIHB1bnljb2RlLFxuXG5cdC8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblx0bWF4SW50ID0gMjE0NzQ4MzY0NywgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG5cdC8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cblx0YmFzZSA9IDM2LFxuXHR0TWluID0gMSxcblx0dE1heCA9IDI2LFxuXHRza2V3ID0gMzgsXG5cdGRhbXAgPSA3MDAsXG5cdGluaXRpYWxCaWFzID0gNzIsXG5cdGluaXRpYWxOID0gMTI4LCAvLyAweDgwXG5cdGRlbGltaXRlciA9ICctJywgLy8gJ1xceDJEJ1xuXG5cdC8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG5cdHJlZ2V4UHVueWNvZGUgPSAvXnhuLS0vLFxuXHRyZWdleE5vbkFTQ0lJID0gL1teXFx4MjAtXFx4N0VdLywgLy8gdW5wcmludGFibGUgQVNDSUkgY2hhcnMgKyBub24tQVNDSUkgY2hhcnNcblx0cmVnZXhTZXBhcmF0b3JzID0gL1tcXHgyRVxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG5cdCAqIGl0ZW0uXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG5cdCAqIGFkZHJlc3Nlcy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHRcdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdFx0fVxuXHRcdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdFx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG5cdCAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG5cdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHQgKiBtYXRjaGluZyBVVEYtMTYuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuXHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGFwdChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcblx0XHR2YXIgayA9IDA7XG5cdFx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0XHRkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG5cdFx0Zm9yICgvKiBubyBpbml0aWFsaXphdGlvbiAqLzsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdFx0Ly8gRG9uJ3QgdXNlIFVDUy0yXG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0XHQgICAgb3V0LFxuXHRcdCAgICBpID0gMCxcblx0XHQgICAgbiA9IGluaXRpYWxOLFxuXHRcdCAgICBiaWFzID0gaW5pdGlhbEJpYXMsXG5cdFx0ICAgIGJhc2ljLFxuXHRcdCAgICBqLFxuXHRcdCAgICBpbmRleCxcblx0XHQgICAgb2xkaSxcblx0XHQgICAgdyxcblx0XHQgICAgayxcblx0XHQgICAgZGlnaXQsXG5cdFx0ICAgIHQsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBiYXNlTWludXNUO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50czogbGV0IGBiYXNpY2AgYmUgdGhlIG51bWJlciBvZiBpbnB1dCBjb2RlXG5cdFx0Ly8gcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBkZWxpbWl0ZXIsIG9yIGAwYCBpZiB0aGVyZSBpcyBub25lLCB0aGVuIGNvcHlcblx0XHQvLyB0aGUgZmlyc3QgYmFzaWMgY29kZSBwb2ludHMgdG8gdGhlIG91dHB1dC5cblxuXHRcdGJhc2ljID0gaW5wdXQubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcblx0XHRpZiAoYmFzaWMgPCAwKSB7XG5cdFx0XHRiYXNpYyA9IDA7XG5cdFx0fVxuXG5cdFx0Zm9yIChqID0gMDsgaiA8IGJhc2ljOyArK2opIHtcblx0XHRcdC8vIGlmIGl0J3Mgbm90IGEgYmFzaWMgY29kZSBwb2ludFxuXHRcdFx0aWYgKGlucHV0LmNoYXJDb2RlQXQoaikgPj0gMHg4MCkge1xuXHRcdFx0XHRlcnJvcignbm90LWJhc2ljJyk7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaChpbnB1dC5jaGFyQ29kZUF0KGopKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGRlY29kaW5nIGxvb3A6IHN0YXJ0IGp1c3QgYWZ0ZXIgdGhlIGxhc3QgZGVsaW1pdGVyIGlmIGFueSBiYXNpYyBjb2RlXG5cdFx0Ly8gcG9pbnRzIHdlcmUgY29waWVkOyBzdGFydCBhdCB0aGUgYmVnaW5uaW5nIG90aGVyd2lzZS5cblxuXHRcdGZvciAoaW5kZXggPSBiYXNpYyA+IDAgPyBiYXNpYyArIDEgOiAwOyBpbmRleCA8IGlucHV0TGVuZ3RoOyAvKiBubyBmaW5hbCBleHByZXNzaW9uICovKSB7XG5cblx0XHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHRcdC8vIERlY29kZSBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyIGludG8gYGRlbHRhYCxcblx0XHRcdC8vIHdoaWNoIGdldHMgYWRkZWQgdG8gYGlgLiBUaGUgb3ZlcmZsb3cgY2hlY2tpbmcgaXMgZWFzaWVyXG5cdFx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdFx0Ly8gdmFsdWUgYXQgdGhlIGVuZCB0byBvYnRhaW4gYGRlbHRhYC5cblx0XHRcdGZvciAob2xkaSA9IGksIHcgPSAxLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblxuXHRcdFx0XHRpZiAoaW5kZXggPj0gaW5wdXRMZW5ndGgpIHtcblx0XHRcdFx0XHRlcnJvcignaW52YWxpZC1pbnB1dCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGlnaXQgPSBiYXNpY1RvRGlnaXQoaW5wdXQuY2hhckNvZGVBdChpbmRleCsrKSk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0ID49IGJhc2UgfHwgZGlnaXQgPiBmbG9vcigobWF4SW50IC0gaSkgLyB3KSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aSArPSBkaWdpdCAqIHc7XG5cdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA8IHQpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0aWYgKHcgPiBmbG9vcihtYXhJbnQgLyBiYXNlTWludXNUKSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dyAqPSBiYXNlTWludXNUO1xuXG5cdFx0XHR9XG5cblx0XHRcdG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdFx0YmlhcyA9IGFkYXB0KGkgLSBvbGRpLCBvdXQsIG9sZGkgPT0gMCk7XG5cblx0XHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0XHQvLyBpbmNyZW1lbnRpbmcgYG5gIGVhY2ggdGltZSwgc28gd2UnbGwgZml4IHRoYXQgbm93OlxuXHRcdFx0aWYgKGZsb29yKGkgLyBvdXQpID4gbWF4SW50IC0gbikge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRcdGkgJT0gb3V0O1xuXG5cdFx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0XG5cdFx0XHRvdXRwdXQuc3BsaWNlKGkrKywgMCwgbik7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdWNzMmVuY29kZShvdXRwdXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG5cdCAqIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHRcdHZhciBuLFxuXHRcdCAgICBkZWx0YSxcblx0XHQgICAgaGFuZGxlZENQQ291bnQsXG5cdFx0ICAgIGJhc2ljTGVuZ3RoLFxuXHRcdCAgICBiaWFzLFxuXHRcdCAgICBqLFxuXHRcdCAgICBtLFxuXHRcdCAgICBxLFxuXHRcdCAgICBrLFxuXHRcdCAgICB0LFxuXHRcdCAgICBjdXJyZW50VmFsdWUsXG5cdFx0ICAgIG91dHB1dCA9IFtdLFxuXHRcdCAgICAvKiogYGlucHV0TGVuZ3RoYCB3aWxsIGhvbGQgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyBpbiBgaW5wdXRgLiAqL1xuXHRcdCAgICBpbnB1dExlbmd0aCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50UGx1c09uZSxcblx0XHQgICAgYmFzZU1pbnVzVCxcblx0XHQgICAgcU1pbnVzVDtcblxuXHRcdC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIFVuaWNvZGVcblx0XHRpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG5cdFx0Ly8gQ2FjaGUgdGhlIGxlbmd0aFxuXHRcdGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3RhdGVcblx0XHRuID0gaW5pdGlhbE47XG5cdFx0ZGVsdGEgPSAwO1xuXHRcdGJpYXMgPSBpbml0aWFsQmlhcztcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHNcblx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoY3VycmVudFZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cblx0XHQvLyBgaGFuZGxlZENQQ291bnRgIGlzIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgdGhhdCBoYXZlIGJlZW4gaGFuZGxlZDtcblx0XHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cblx0XHQvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyAtIGlmIGl0IGlzIG5vdCBlbXB0eSAtIHdpdGggYSBkZWxpbWl0ZXJcblx0XHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRcdG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBlbmNvZGluZyBsb29wOlxuXHRcdHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG5cblx0XHRcdC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHRcblx0XHRcdC8vIGxhcmdlciBvbmU6XG5cdFx0XHRmb3IgKG0gPSBtYXhJbnQsIGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcblx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPixcblx0XHRcdC8vIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93XG5cdFx0XHRoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0XHRpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcblx0XHRcdG4gPSBtO1xuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09IG4pIHtcblx0XHRcdFx0XHQvLyBSZXByZXNlbnQgZGVsdGEgYXMgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlclxuXHRcdFx0XHRcdGZvciAocSA9IGRlbHRhLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblx0XHRcdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXHRcdFx0XHRcdFx0aWYgKHEgPCB0KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cU1pbnVzVCA9IHEgLSB0O1xuXHRcdFx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goXG5cdFx0XHRcdFx0XHRcdHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNULCAwKSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT0gYmFzaWNMZW5ndGgpO1xuXHRcdFx0XHRcdGRlbHRhID0gMDtcblx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCsrZGVsdGE7XG5cdFx0XHQrK247XG5cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dC5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzXG5cdCAqIHRvIFVuaWNvZGUuIE9ubHkgdGhlIFB1bnljb2RlZCBwYXJ0cyBvZiB0aGUgaW5wdXQgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS5cblx0ICogaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgb24gYSBzdHJpbmcgdGhhdCBoYXMgYWxyZWFkeSBiZWVuXG5cdCAqIGNvbnZlcnRlZCB0byBVbmljb2RlLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZWQgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBjb252ZXJ0IHRvIFVuaWNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBVbmljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBQdW55Y29kZVxuXHQgKiBzdHJpbmcuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b1VuaWNvZGUoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleFB1bnljb2RlLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/IGRlY29kZShzdHJpbmcuc2xpY2UoNCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBVbmljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIFB1bnljb2RlLiBPbmx5IHRoZSBub24tQVNDSUkgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHdpbGwgYmUgY29udmVydGVkLFxuXHQgKiBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCdzIGFscmVhZHkgaW5cblx0ICogQVNDSUkuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG8gY29udmVydCwgYXMgYVxuXHQgKiBVbmljb2RlIHN0cmluZy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFB1bnljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBkb21haW4gbmFtZSBvclxuXHQgKiBlbWFpbCBhZGRyZXNzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9BU0NJSShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4Tm9uQVNDSUkudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gJ3huLS0nICsgZW5jb2RlKHN0cmluZylcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG5cdHB1bnljb2RlID0ge1xuXHRcdC8qKlxuXHRcdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBTdHJpbmdcblx0XHQgKi9cblx0XHQndmVyc2lvbic6ICcxLjQuMScsXG5cdFx0LyoqXG5cdFx0ICogQW4gb2JqZWN0IG9mIG1ldGhvZHMgdG8gY29udmVydCBmcm9tIEphdmFTY3JpcHQncyBpbnRlcm5hbCBjaGFyYWN0ZXJcblx0XHQgKiByZXByZXNlbnRhdGlvbiAoVUNTLTIpIHRvIFVuaWNvZGUgY29kZSBwb2ludHMsIGFuZCBiYWNrLlxuXHRcdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIE9iamVjdFxuXHRcdCAqL1xuXHRcdCd1Y3MyJzoge1xuXHRcdFx0J2RlY29kZSc6IHVjczJkZWNvZGUsXG5cdFx0XHQnZW5jb2RlJzogdWNzMmVuY29kZVxuXHRcdH0sXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0XHQndG9Vbmljb2RlJzogdG9Vbmljb2RlXG5cdH07XG5cblx0LyoqIEV4cG9zZSBgcHVueWNvZGVgICovXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKCdwdW55Y29kZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHB1bnljb2RlO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMpIHtcblx0XHRcdC8vIGluIE5vZGUuanMsIGlvLmpzLCBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IHB1bnljb2RlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5wdW55Y29kZSA9IHB1bnljb2RlO1xuXHR9XG5cbn0odGhpcykpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSBzaW1wbGUgcGF0aCBVUkxcbiAgICBzaW1wbGVQYXRoUGF0dGVybiA9IC9eKFxcL1xcLz8oPyFcXC8pW15cXD9cXHNdKikoXFw/W15cXHNdKik/JC8sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyByZXNlcnZlZCBmb3IgZGVsaW1pdGluZyBVUkxzLlxuICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG4gICAgZGVsaW1zID0gWyc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0J10sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuICAgIHVud2lzZSA9IFsneycsICd9JywgJ3wnLCAnXFxcXCcsICdeJywgJ2AnXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWydcXCcnXS5jb25jYXQodW53aXNlKSxcbiAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgYXJlIG5ldmVyIGV2ZXIgYWxsb3dlZCBpbiBhIGhvc3RuYW1lLlxuICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2VcbiAgICAvLyBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgKmV4cGVjdGVkKiB0byBiZSBzZWVuLCBzbyB3ZSBmYXN0LXBhdGhcbiAgICAvLyB0aGVtLlxuICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIGhvc3RFbmRpbmdDaGFycyA9IFsnLycsICc/JywgJyMnXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIHV0aWwuaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCF1dGlsLmlzU3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuICB9XG5cbiAgLy8gQ29weSBjaHJvbWUsIElFLCBvcGVyYSBiYWNrc2xhc2gtaGFuZGxpbmcgYmVoYXZpb3IuXG4gIC8vIEJhY2sgc2xhc2hlcyBiZWZvcmUgdGhlIHF1ZXJ5IHN0cmluZyBnZXQgY29udmVydGVkIHRvIGZvcndhcmQgc2xhc2hlc1xuICAvLyBTZWU6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNTkxNlxuICB2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/JyksXG4gICAgICBzcGxpdHRlciA9XG4gICAgICAgICAgKHF1ZXJ5SW5kZXggIT09IC0xICYmIHF1ZXJ5SW5kZXggPCB1cmwuaW5kZXhPZignIycpKSA/ICc/JyA6ICcjJyxcbiAgICAgIHVTcGxpdCA9IHVybC5zcGxpdChzcGxpdHRlciksXG4gICAgICBzbGFzaFJlZ2V4ID0gL1xcXFwvZztcbiAgdVNwbGl0WzBdID0gdVNwbGl0WzBdLnJlcGxhY2Uoc2xhc2hSZWdleCwgJy8nKTtcbiAgdXJsID0gdVNwbGl0LmpvaW4oc3BsaXR0ZXIpO1xuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIGlmICghc2xhc2hlc0Rlbm90ZUhvc3QgJiYgdXJsLnNwbGl0KCcjJykubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gVHJ5IGZhc3QgcGF0aCByZWdleHBcbiAgICB2YXIgc2ltcGxlUGF0aCA9IHNpbXBsZVBhdGhQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gICAgaWYgKHNpbXBsZVBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHJlc3Q7XG4gICAgICB0aGlzLmhyZWYgPSByZXN0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMuc2VhcmNoLnN1YnN0cigxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55Y29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhdmUgbm9uLUFTQ0lJIGNoYXJhY3RlcnMsIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIEFTQ0lJLW9ubHkuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gcHVueWNvZGUudG9BU0NJSSh0aGlzLmhvc3RuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICBpZiAocmVzdC5pbmRleE9mKGFlKSA9PT0gLTEpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmICh1dGlsLmlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIHV0aWwuaXNPYmplY3QodGhpcy5xdWVyeSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnkpLmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmICh0aGlzLnNsYXNoZXMgfHxcbiAgICAgICghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29sW3Byb3RvY29sXSkgJiYgaG9zdCAhPT0gZmFsc2UpIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJyc7XG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaDtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlKHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmUocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIGlmICghc291cmNlKSByZXR1cm4gcmVsYXRpdmU7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlT2JqZWN0KHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlT2JqZWN0ID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIHZhciB0a2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICBmb3IgKHZhciB0ayA9IDA7IHRrIDwgdGtleXMubGVuZ3RoOyB0aysrKSB7XG4gICAgdmFyIHRrZXkgPSB0a2V5c1t0a107XG4gICAgcmVzdWx0W3RrZXldID0gdGhpc1t0a2V5XTtcbiAgfVxuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgdmFyIHJrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgIGZvciAodmFyIHJrID0gMDsgcmsgPCBya2V5cy5sZW5ndGg7IHJrKyspIHtcbiAgICAgIHZhciBya2V5ID0gcmtleXNbcmtdO1xuICAgICAgaWYgKHJrZXkgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtya2V5XSA9IHJlbGF0aXZlW3JrZXldO1xuICAgIH1cblxuICAgIC8vdXJsUGFyc2UgYXBwZW5kcyB0cmFpbGluZyAvIHRvIHVybHMgbGlrZSBodHRwOi8vd3d3LmV4YW1wbGUuY29tXG4gICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG4gICAgICAgIHJlc3VsdC5ob3N0bmFtZSAmJiAhcmVzdWx0LnBhdGhuYW1lKSB7XG4gICAgICByZXN1bHQucGF0aCA9IHJlc3VsdC5wYXRobmFtZSA9ICcvJztcbiAgICB9XG5cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcbiAgICAvLyBpZiBpdCdzIGEga25vd24gdXJsIHByb3RvY29sLCB0aGVuIGNoYW5naW5nXG4gICAgLy8gdGhlIHByb3RvY29sIGRvZXMgd2VpcmQgdGhpbmdzXG4gICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG4gICAgLy8gYW5kIGlmIHRoZXJlIHdhcyBhIHBhdGhcbiAgICAvLyB0byBiZWdpbiB3aXRoLCB0aGVuIHdlIE1VU1QgaGF2ZSBhIHBhdGguXG4gICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcbiAgICAvLyBiZWNhdXNlIHRoYXQncyBrbm93biB0byBiZSBob3N0bGVzcy5cbiAgICAvLyBhbnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYWJzb2x1dGUuXG4gICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICAgIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgICAgICB2YXIgayA9IGtleXNbdl07XG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChyZWxhdGl2ZS5zZWFyY2gpKSB7XG4gICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuICAgIC8vIGxpa2UgaHJlZj0nP2ZvbycuXG4gICAgLy8gUHV0IHRoaXMgYWZ0ZXIgdGhlIG90aGVyIHR3byBjYXNlcyBiZWNhdXNlIGl0IHNpbXBsaWZpZXMgdGhlIGJvb2xlYW5zXG4gICAgaWYgKHBzeWNob3RpYykge1xuICAgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBzcmNQYXRoLnNoaWZ0KCk7XG4gICAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgfHwgc3JjUGF0aC5sZW5ndGggPiAxKSAmJlxuICAgICAgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fCBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgfVxuICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGggfHwgcmVzdWx0LmF1dGg7XG4gIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzU3RyaW5nOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsT3JVbmRlZmluZWQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT0gbnVsbDtcbiAgfVxufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDb250ZW50U2VydmVyXzEgPSByZXF1aXJlKFwiLi4vbGliL2NsYXNzL0NvbnRlbnRTZXJ2ZXJcIik7XG52YXIgTG9nZ2VyVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi9saWIvdXRpbHMvTG9nZ2VyVXRpbHNcIik7XG52YXIgVGhpZWZfMSA9IHJlcXVpcmUoXCIuLi9saWIvY2xhc3MvVGhpZWZcIik7XG52YXIgQnVpbGRlcl8xID0gcmVxdWlyZShcIi4uL2xpYi9jbGFzcy9CdWlsZGVyXCIpO1xud2luZG93W1wicGFnZVRoaWVmXCJdID0ge1xuICAgIHppcEJsb2I6IG51bGxcbn07XG52YXIgY29udGVudFNlcnZlciA9IG5ldyBDb250ZW50U2VydmVyXzEuZGVmYXVsdCgpO1xuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXJyZW50Q2xpZW50XzEsIGVycm9yXzE7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjb250ZW50U2VydmVyLmdldEN1cnJlbnRDbGllbnQoKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgY3VycmVudENsaWVudF8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2xpZW50XzEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2xpZW50XzEuZ2V0Q3VycmVudFBhZ2VEb2N1bWVudFBhcmFtKGZ1bmN0aW9uIChwYWdlRG9jdW1lbnRQYXJhbSkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGllZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGllZiA9IG5ldyBUaGllZl8xLmRlZmF1bHQoY3VycmVudENsaWVudF8xLCBwYWdlRG9jdW1lbnRQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpZWYuc3RhcnQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVpbGRlciA9IG5ldyBCdWlsZGVyXzEuZGVmYXVsdCh0aGllZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0QmxvYigpLnRoZW4oZnVuY3Rpb24gKHppcEJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wYWdlVGhpZWYuemlwQmxvYiA9IHppcEJsb2I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgTG9nZ2VyVXRpbHNfMS5kZWZhdWx0LmVycm9yKGVycm9yXzEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyB9LCAzMDAwKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEpTWmlwID0gcmVxdWlyZShcImpzemlwXCIpO1xudmFyIEJ1aWxkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnVpbGRlcih0aGllZikge1xuICAgICAgICB0aGlzLnRoaWVmID0gdGhpZWY7XG4gICAgICAgIHRoaXMucm9vdFVSTCA9IHRoaXMudGhpZWYuZ2V0U3RhcnRQYWdlRG9jdW1lbnQoKS5nZXRSb290VVJMKCk7XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMuY3JlYXRlRm9sZGVyKHRoaXMucm9vdFVSTC5ob3N0KTtcbiAgICB9XG4gICAgQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLmpzWmlwID0gbmV3IEpTWmlwKCk7XG4gICAgICAgICAgICB2YXIgcm9vdFppcEZvbGRlciA9IF90aGlzLmpzWmlwLmZvbGRlcihfdGhpcy5yb290VVJMLmhvc3RuYW1lKTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBfdGhpcy50aGllZi5nZXRBc3NldHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYXNzZXQgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgdmFyIGhyZWZQYXJ0ID0gX3RoaXMuZ2V0SHJlZlBhcnRGcm9tTGluayhhc3NldC5saW5rKTtcbiAgICAgICAgICAgICAgICB2YXIgZm9sZGVyTmFtZXMgPSBfdGhpcy5nZXRGb2xkZXJOYW1lc0Zyb21IcmVmUGFydChocmVmUGFydCk7XG4gICAgICAgICAgICAgICAgdmFyIGZvbGRlciA9IF90aGlzLmNyZWF0ZUZvbGRlclJlY3VyaXZlbHkoZm9sZGVyTmFtZXMpO1xuICAgICAgICAgICAgICAgIF90aGlzLmFkZEZpbGVUb0ZvbGRlcihfdGhpcy5nZXRGaWxlbmFtZUZyb21MaW5rKGFzc2V0LmxpbmspLCBhc3NldC5kYXRhLCBhc3NldC50eXBlLCBmb2xkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IF90aGlzLnRoaWVmLmdldFBhZ2VEb2N1bWVudHMoKTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFnZURvY3VtZW50ID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgIHZhciBocmVmUGFydCA9IF90aGlzLmdldEhyZWZQYXJ0RnJvbUxpbmsocGFnZURvY3VtZW50LmdldFJvb3RIcmVmKCkpO1xuICAgICAgICAgICAgICAgIHZhciBmb2xkZXJOYW1lcyA9IF90aGlzLmdldEZvbGRlck5hbWVzRnJvbUhyZWZQYXJ0KGhyZWZQYXJ0KTtcbiAgICAgICAgICAgICAgICB2YXIgZm9sZGVyID0gX3RoaXMuY3JlYXRlRm9sZGVyUmVjdXJpdmVseShmb2xkZXJOYW1lcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZm9sZGVyKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRGaWxlVG9Gb2xkZXIoX3RoaXMuZ2V0RmlsZW5hbWVGcm9tTGluayhwYWdlRG9jdW1lbnQuZ2V0Um9vdEhyZWYoKSksIHBhZ2VEb2N1bWVudC5nZXRIVE1MV2l0aExvY2FsTGlua3MoKSwgJ3N0cmluZycsIGZvbGRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb290WmlwRm9sZGVyID0gX3RoaXMuYnVpbGRaaXBGaWxlKHJvb3RaaXBGb2xkZXIsIF90aGlzLnRyZWUpO1xuICAgICAgICAgICAgX3RoaXMuanNaaXAuZ2VuZXJhdGVBc3luYyh7IHR5cGU6IFwiYmxvYlwiIH0pLnRoZW4ocmVzb2x2ZSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCdWlsZGVyLnByb3RvdHlwZS5nZXRGaWxlbmFtZUZyb21MaW5rID0gZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgcmV0dXJuIGxpbmsuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICB9O1xuICAgIEJ1aWxkZXIucHJvdG90eXBlLmdldEhyZWZQYXJ0RnJvbUxpbmsgPSBmdW5jdGlvbiAobGluaykge1xuICAgICAgICByZXR1cm4gbGluay5yZXBsYWNlKHRoaXMucm9vdFVSTC5vcmlnaW4sIFwiXCIpO1xuICAgIH07XG4gICAgQnVpbGRlci5wcm90b3R5cGUuZ2V0Rm9sZGVyTmFtZXNGcm9tSHJlZlBhcnQgPSBmdW5jdGlvbiAoaHJlZlBhcnQpIHtcbiAgICAgICAgdmFyIGZvbGRlck5hbWVzID0gaHJlZlBhcnQuc3BsaXQoJy8nKS5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMubGVuZ3RoID4gMDsgfSk7XG4gICAgICAgIGZvbGRlck5hbWVzLnBvcCgpO1xuICAgICAgICByZXR1cm4gZm9sZGVyTmFtZXM7XG4gICAgfTtcbiAgICBCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVGb2xkZXIgPSBmdW5jdGlvbiAoZm9sZGVyTmFtZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogZm9sZGVyTmFtZSxcbiAgICAgICAgICAgIGZpbGVzOiBbXSxcbiAgICAgICAgICAgIGNoaWxkcmVuRm9sZGVyczoge31cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZUZvbGRlclJlY3VyaXZlbHkgPSBmdW5jdGlvbiAoZm9sZGVyTmFtZXMsIHBhcmVudEZvbGRlcikge1xuICAgICAgICBpZiAocGFyZW50Rm9sZGVyID09PSB2b2lkIDApIHsgcGFyZW50Rm9sZGVyID0gdGhpcy50cmVlOyB9XG4gICAgICAgIGlmIChmb2xkZXJOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgZm9sZGVyTmFtZSA9IGZvbGRlck5hbWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIXBhcmVudEZvbGRlci5jaGlsZHJlbkZvbGRlcnMuaGFzT3duUHJvcGVydHkoZm9sZGVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9sZGVyID0gdGhpcy5jcmVhdGVGb2xkZXIoZm9sZGVyTmFtZSk7XG4gICAgICAgICAgICAgICAgcGFyZW50Rm9sZGVyLmNoaWxkcmVuRm9sZGVyc1tmb2xkZXJOYW1lXSA9IGZvbGRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvbGRlclJlY3VyaXZlbHkoZm9sZGVyTmFtZXMsIHBhcmVudEZvbGRlci5jaGlsZHJlbkZvbGRlcnNbZm9sZGVyTmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJlbnRGb2xkZXI7XG4gICAgfTtcbiAgICBCdWlsZGVyLnByb3RvdHlwZS5hZGRGaWxlVG9Gb2xkZXIgPSBmdW5jdGlvbiAoZmlsZW5hbWUsIGRhdGEsIHR5cGUsIGZvbGRlcikge1xuICAgICAgICBmb2xkZXIuZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBmaWxlbmFtZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCdWlsZGVyLnByb3RvdHlwZS5idWlsZFppcEZpbGUgPSBmdW5jdGlvbiAoemlwRm9sZGVyLCBmb2xkZXIpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGZvbGRlci5maWxlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBmaWxlID0gX2FbX2ldO1xuICAgICAgICAgICAgemlwRm9sZGVyLmZpbGUoZmlsZS5uYW1lLCBmaWxlLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbkZvbGRlck5hbWVzID0gT2JqZWN0LmtleXMoZm9sZGVyLmNoaWxkcmVuRm9sZGVycyk7XG4gICAgICAgIGZvciAodmFyIF9iID0gMCwgY2hpbGRyZW5Gb2xkZXJOYW1lc18xID0gY2hpbGRyZW5Gb2xkZXJOYW1lczsgX2IgPCBjaGlsZHJlbkZvbGRlck5hbWVzXzEubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW5Gb2xkZXJOYW1lID0gY2hpbGRyZW5Gb2xkZXJOYW1lc18xW19iXTtcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbkZvbGRlciA9IGZvbGRlci5jaGlsZHJlbkZvbGRlcnNbY2hpbGRyZW5Gb2xkZXJOYW1lXTtcbiAgICAgICAgICAgIHZhciBjaGlsZHJlblppcEZvbGRlciA9IHppcEZvbGRlci5mb2xkZXIoY2hpbGRyZW5Gb2xkZXJOYW1lKTtcbiAgICAgICAgICAgIGNoaWxkcmVuWmlwRm9sZGVyID0gdGhpcy5idWlsZFppcEZpbGUoY2hpbGRyZW5aaXBGb2xkZXIsIGNoaWxkcmVuRm9sZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gemlwRm9sZGVyO1xuICAgIH07XG4gICAgcmV0dXJuIEJ1aWxkZXI7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnVpbGRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExvZ2dlclV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvTG9nZ2VyVXRpbHNcIik7XG52YXIgQ29udGVudFRhc2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGVudFRhc2soaWQsIHBhcmFtLCBvblJlc3VsdENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucGFyYW0gPSBudWxsO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcbiAgICAgICAgdGhpcy5vblJlc3VsdENhbGxiYWNrID0gb25SZXN1bHRDYWxsYmFjaztcbiAgICB9XG4gICAgQ29udGVudFRhc2sucHJvdG90eXBlLmdldElEID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9O1xuICAgIENvbnRlbnRUYXNrLnByb3RvdHlwZS5nZXRQYXJhbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW07XG4gICAgfTtcbiAgICBDb250ZW50VGFzay5wcm90b3R5cGUuc2V0UmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICB0aGlzLm9uUmVzdWx0Q2FsbGJhY2socmVzdWx0KTtcbiAgICB9O1xuICAgIENvbnRlbnRUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHRhc2s6IHRoaXMuaWQsIHBhcmFtOiB0aGlzLnBhcmFtIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRlbnRUYXNrO1xufSgpKTtcbmV4cG9ydHMuQ29udGVudFRhc2sgPSBDb250ZW50VGFzaztcbnZhciBDb250ZW50Q2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRlbnRDbGllbnQoaWQsIGN1cnJlbnRSZXNwb25zZSkge1xuICAgICAgICB0aGlzLnRhc2tRdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmN1cnJlbnRSZXNwb25zZSA9IGN1cnJlbnRSZXNwb25zZTtcbiAgICB9XG4gICAgQ29udGVudENsaWVudC5wcm90b3R5cGUuc3RhcnRUYXNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy50YXNrUXVldWUubGVuZ3RoID4gMCAmJiB0aGlzLmN1cnJlbnRUYXNrID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGhpcy50YXNrUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSB0YXNrO1xuICAgICAgICAgICAgTG9nZ2VyVXRpbHNfMS5kZWZhdWx0LmxvZyhcIkNsaWVudCAlcyBzdGFydCB0YXNrICVzIHdpdGggcGFyYW06XCIsIHRoaXMuaWQsIHRoaXMuY3VycmVudFRhc2suZ2V0SUQoKSwgdGhpcy5jdXJyZW50VGFzay5nZXRQYXJhbSgpKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sucnVuKHRoaXMuY3VycmVudFJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGVudENsaWVudC5wcm90b3R5cGUucnVuVGFzayA9IGZ1bmN0aW9uIChpZCwgcGFyYW0sIG9uUmVzdWx0Q2FsbGJhY2spIHtcbiAgICAgICAgTG9nZ2VyVXRpbHNfMS5kZWZhdWx0LmxvZyhcIkNsaWVudCAlcyBhZGQgdGFzayAlcyB3aXRoIHBhcmFtOlwiLCB0aGlzLmlkLCBpZCwgcGFyYW0pO1xuICAgICAgICB0aGlzLnRhc2tRdWV1ZS5wdXNoKG5ldyBDb250ZW50VGFzayhpZCwgcGFyYW0sIG9uUmVzdWx0Q2FsbGJhY2spKTtcbiAgICAgICAgdGhpcy5zdGFydFRhc2soKTtcbiAgICB9O1xuICAgIENvbnRlbnRDbGllbnQucHJvdG90eXBlLnJlc3BvbnNlVGFzayA9IGZ1bmN0aW9uICh0YXNrSUQsIHJlc3VsdCwgY3VycmVudFJlc3BvbnNlKSB7XG4gICAgICAgIExvZ2dlclV0aWxzXzEuZGVmYXVsdC5sb2coXCJDbGllbnQgJXMgcmVzcG9uc2UgdGFzayAlcyB3aXRoIHJlc3VsdCBcIiwgdGhpcy5pZCwgdGFza0lELCByZXN1bHQpO1xuICAgICAgICB0aGlzLmN1cnJlbnRUYXNrLnNldFJlc3VsdChyZXN1bHQpO1xuICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50UmVzcG9uc2UgPSBjdXJyZW50UmVzcG9uc2U7XG4gICAgICAgIHRoaXMuc3RhcnRUYXNrKCk7XG4gICAgfTtcbiAgICBDb250ZW50Q2xpZW50LnByb3RvdHlwZS5nZXRDdXJyZW50UGFnZURvY3VtZW50UGFyYW0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5ydW5UYXNrKFwiZ2V0Q3VycmVudFBhZ2VEb2N1bWVudFBhcmFtXCIsIG51bGwsIGZ1bmN0aW9uIChwYXJhbSkge1xuICAgICAgICAgICAgY2IocGFyYW0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRlbnRDbGllbnQucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbiAobGluaywgdHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMucnVuVGFzayhcImdldERhdGFcIiwgeyBsaW5rOiBsaW5rLCB0eXBlOiB0eXBlIH0sIGZ1bmN0aW9uIChwYXJhbSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocGFyYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRlbnRDbGllbnQ7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29udGVudENsaWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJyb3dzZXJVdGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL0Jyb3dzZXJVdGlsc1wiKTtcbnZhciBCYWNrZ3JvdW5kVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9CYWNrZ3JvdW5kVXRpbHNcIik7XG52YXIgQ29udGVudENsaWVudF8xID0gcmVxdWlyZShcIi4vQ29udGVudENsaWVudFwiKTtcbnZhciBMb2dnZXJVdGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL0xvZ2dlclV0aWxzXCIpO1xudmFyIENvbnRlbnRTZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGVudFNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSB7fTtcbiAgICAgICAgdGhpcy5vbkNvbm5lY3QgPSB0aGlzLm9uQ29ubmVjdC5iaW5kKHRoaXMpO1xuICAgICAgICBCYWNrZ3JvdW5kVXRpbHNfMS5kZWZhdWx0Lm9uTWVzc2FnZSh0aGlzLm9uQ29ubmVjdCk7XG4gICAgfVxuICAgIENvbnRlbnRTZXJ2ZXIucHJvdG90eXBlLmlzTmV3Q2xpZW50SUQgPSBmdW5jdGlvbiAoY2xpZW50SUQpIHtcbiAgICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyh0aGlzLmNsaWVudCkuaW5jbHVkZXMoY2xpZW50SUQpO1xuICAgIH07XG4gICAgQ29udGVudFNlcnZlci5wcm90b3R5cGUub25Db25uZWN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UudGFzaykge1xuICAgICAgICAgICAgdmFyIGNsaWVudElEID0gc2VuZGVyLnRhYi5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgc3dpdGNoIChyZXNwb25zZS50YXNrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5Db25uZWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTmV3Q2xpZW50SUQoY2xpZW50SUQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXJVdGlsc18xLmRlZmF1bHQubG9nKFwiTmV3IGNsaWVudFwiLCBjbGllbnRJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFtjbGllbnRJRF0gPSBuZXcgQ29udGVudENsaWVudF8xLmRlZmF1bHQoY2xpZW50SUQsIHNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTmV3Q2xpZW50SUQoY2xpZW50SUQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXJVdGlsc18xLmRlZmF1bHQubG9nKFwiQ2xpZW50IHJlc3BvbnNlXCIsIHJlc3BvbnNlLnBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50W2NsaWVudElEXS5yZXNwb25zZVRhc2socmVzcG9uc2UudGFzaywgcmVzcG9uc2UucGFyYW0sIHNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2dnZXJVdGlsc18xLmRlZmF1bHQuZXJyb3IoXCJSZXNwb25zZSBUYXNrIG5vdCBmb3VuZDogXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZW50U2VydmVyLnByb3RvdHlwZS5nZXRDdXJyZW50Q2xpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgQnJvd3NlclV0aWxzXzEuZGVmYXVsdC5nZXRDdXJyZW50VGFiSUQoZnVuY3Rpb24gKHRhYklEKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRhYklEICE9IG51bGwgJiYgT2JqZWN0LmtleXModGFiSUQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudCA9IF90aGlzLmNsaWVudFt0YWJJRF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXJVdGlsc18xLmRlZmF1bHQud2FybihcIkN1cnJlbnQgY2xpZW50IG5vdCBmb3VuZCBvbiBDb250ZW50U2VydmVyOjpnZXRDdXJyZW50Q2xpZW50XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsaWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGVudFNlcnZlcjtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBDb250ZW50U2VydmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgUmVnRXhVdGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL1JlZ0V4VXRpbHNcIik7XG52YXIgUGFnZURvY3VtZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhZ2VEb2N1bWVudChwYWdlRG9jdW1lbnRQYXJhbSkge1xuICAgICAgICB0aGlzLmh0bWwgPSBwYWdlRG9jdW1lbnRQYXJhbS5odG1sO1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHBhZ2VEb2N1bWVudFBhcmFtLm9yaWdpbjtcbiAgICAgICAgdGhpcy5ocmVmID0gcGFnZURvY3VtZW50UGFyYW0uaHJlZjtcbiAgICB9XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRIVE1MID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sO1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRIVE1MV2l0aExvY2FsTGlua3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBodG1sID0gdGhpcy5odG1sO1xuICAgICAgICB2YXIgcm9vdE9yaWdpbiA9IHRoaXMuZ2V0Um9vdFVSTCgpLm9yaWdpbjtcbiAgICAgICAgdmFyIHBhZ2VsaW5rcyA9IHRoaXMuZ2V0UGFnZUxpbmtzRnJvbUN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgcGFnZWxpbmtzID0gcGFnZWxpbmtzLmNvbmNhdCh0aGlzLmdldENzc1BhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luKCkpO1xuICAgICAgICBwYWdlbGlua3MgPSBwYWdlbGlua3MuY29uY2F0KHRoaXMuZ2V0U2NyaXB0UGFnZUxpbmtzRnJvbUN1cnJlbnRPcmlnaW4oKSk7XG4gICAgICAgIHBhZ2VsaW5rcyA9IHBhZ2VsaW5rcy5jb25jYXQodGhpcy5nZXRJbWFnZVBhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luKCkpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHBhZ2VsaW5rc18xID0gcGFnZWxpbmtzOyBfaSA8IHBhZ2VsaW5rc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHBhZ2VMaW5rID0gcGFnZWxpbmtzXzFbX2ldO1xuICAgICAgICAgICAgdmFyIGxvY2FsTGluayA9IHBhZ2VMaW5rLnNvdXJjZUxpbmsucmVwbGFjZShyb290T3JpZ2luLCBcIi5cIik7XG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKHBhZ2VMaW5rLnNvdXJjZUxpbmssIGxvY2FsTGluayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmdldFJvb3RIcmVmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ocmVmO1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRSb290VVJMID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVUkxGcm9tTGluayh0aGlzLmdldFJvb3RIcmVmKCkpO1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRFeHRlbnNpb25PcmlnaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRBbGxMaW5rc0Zyb21IVE1MID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIjxhXFxcXHMrKD86W14+XSo/XFxcXHMrKT9ocmVmPShbXFxcIiddKSguKj8pXFxcXDFcIiwgXCJnbVwiKTtcbiAgICAgICAgcmV0dXJuIFJlZ0V4VXRpbHNfMS5kZWZhdWx0LmdldE1hdGNoTGlzdCh0aGlzLmh0bWwsIHJlZ0V4cCkubWFwKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBhZ2VEb2N1bWVudC5wcm90b3R5cGUuZ2V0QWxsQ1NTTGlua3NGcm9tSFRNTCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCI8bGlua1xcXFxzKyg/OltePl0qP1xcXFxzKyk/aHJlZj0oW1xcXCInXSkoLio/KVxcXFwxXCIsIFwiZ21cIik7XG4gICAgICAgIHJldHVybiBSZWdFeFV0aWxzXzEuZGVmYXVsdC5nZXRNYXRjaExpc3QodGhpcy5odG1sLCByZWdFeHApLm1hcChmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaFsyXTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmdldEFsbFNjcmlwdExpbmtzRnJvbUhUTUwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKFwiPHNjcmlwdFxcXFxzKyg/OltePl0qP1xcXFxzKyk/c3JjPShbXFxcIiddKSguKj8pXFxcXDFcIiwgXCJnbVwiKTtcbiAgICAgICAgcmV0dXJuIFJlZ0V4VXRpbHNfMS5kZWZhdWx0LmdldE1hdGNoTGlzdCh0aGlzLmh0bWwsIHJlZ0V4cCkubWFwKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBhZ2VEb2N1bWVudC5wcm90b3R5cGUuZ2V0QWxsSW1hZ2VMaW5rc0Zyb21IVE1MID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIjxpbWdcXFxccysoPzpbXj5dKj9cXFxccyspP3NyYz0oW1xcXCInXSkoLio/KVxcXFwxXCIsIFwiZ21cIik7XG4gICAgICAgIHJldHVybiBSZWdFeFV0aWxzXzEuZGVmYXVsdC5nZXRNYXRjaExpc3QodGhpcy5odG1sLCByZWdFeHApLm1hcChmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaFsyXTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmdldFVSTEZyb21MaW5rID0gZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgbGluayA9IGxpbmsucmVwbGFjZSh0aGlzLmdldEV4dGVuc2lvbk9yaWdpbigpLCBcIlwiKTtcbiAgICAgICAgaWYgKCFsaW5rLmluY2x1ZGVzKHRoaXMub3JpZ2luKSkge1xuICAgICAgICAgICAgbGluayA9IHVybC5yZXNvbHZlKHRoaXMuaHJlZiwgbGluayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVUkwobGluayk7XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmdldFBhZ2VMaW5rRnJvbUxpbmsgPSBmdW5jdGlvbiAobGluaykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc291cmNlTGluazogbGluayxcbiAgICAgICAgICAgIHVybDogdGhpcy5nZXRVUkxGcm9tTGluayhsaW5rKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRQYWdlTGlua3NGcm9tTGlua3MgPSBmdW5jdGlvbiAobGlua3MpIHtcbiAgICAgICAgdmFyIHBhZ2VMaW5rcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGxpbmtzXzEgPSBsaW5rczsgX2kgPCBsaW5rc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGxpbmsgPSBsaW5rc18xW19pXTtcbiAgICAgICAgICAgIHBhZ2VMaW5rcy5wdXNoKHRoaXMuZ2V0UGFnZUxpbmtGcm9tTGluayhsaW5rKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZ2VMaW5rcztcbiAgICB9O1xuICAgIFBhZ2VEb2N1bWVudC5wcm90b3R5cGUuZ2V0UGFnZUxpbmtzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlua3MgPSB0aGlzLmdldEFsbExpbmtzRnJvbUhUTUwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUxpbmtzRnJvbUxpbmtzKGxpbmtzKTtcbiAgICB9O1xuICAgIFBhZ2VEb2N1bWVudC5wcm90b3R5cGUuaXNVUkxmcm9tQ3VycmVudE9yaWdpbiA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHVybC5vcmlnaW4gPT0gdGhpcy5vcmlnaW47XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmZpbHRlclBhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luID0gZnVuY3Rpb24gKHBhZ2VMaW5rcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gcGFnZUxpbmtzLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuaXNVUkxmcm9tQ3VycmVudE9yaWdpbihlLnVybCk7IH0pO1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRQYWdlTGlua3NGcm9tQ3VycmVudE9yaWdpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxpbmtzID0gdGhpcy5nZXRBbGxMaW5rc0Zyb21IVE1MKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlclBhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luKHRoaXMuZ2V0UGFnZUxpbmtzRnJvbUxpbmtzKGxpbmtzKSk7XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmdldENzc1BhZ2VMaW5rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNzc0xpbmtzID0gdGhpcy5nZXRBbGxDU1NMaW5rc0Zyb21IVE1MKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VMaW5rc0Zyb21MaW5rcyhjc3NMaW5rcyk7XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmdldENzc1BhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJQYWdlTGlua3NGcm9tQ3VycmVudE9yaWdpbih0aGlzLmdldENzc1BhZ2VMaW5rcygpKTtcbiAgICB9O1xuICAgIFBhZ2VEb2N1bWVudC5wcm90b3R5cGUuZ2V0U2NyaXB0UGFnZUxpbmtzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2NyaXB0TGlua3MgPSB0aGlzLmdldEFsbFNjcmlwdExpbmtzRnJvbUhUTUwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUxpbmtzRnJvbUxpbmtzKHNjcmlwdExpbmtzKTtcbiAgICB9O1xuICAgIFBhZ2VEb2N1bWVudC5wcm90b3R5cGUuZ2V0U2NyaXB0UGFnZUxpbmtzRnJvbUN1cnJlbnRPcmlnaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlclBhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luKHRoaXMuZ2V0U2NyaXB0UGFnZUxpbmtzKCkpO1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50LnByb3RvdHlwZS5nZXRJbWFnZVBhZ2VMaW5rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGltYWdlTGlua3MgPSB0aGlzLmdldEFsbEltYWdlTGlua3NGcm9tSFRNTCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlTGlua3NGcm9tTGlua3MoaW1hZ2VMaW5rcyk7XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnQucHJvdG90eXBlLmdldEltYWdlUGFnZUxpbmtzRnJvbUN1cnJlbnRPcmlnaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlclBhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luKHRoaXMuZ2V0SW1hZ2VQYWdlTGlua3MoKSk7XG4gICAgfTtcbiAgICByZXR1cm4gUGFnZURvY3VtZW50O1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFBhZ2VEb2N1bWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMb2dnZXJVdGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL0xvZ2dlclV0aWxzXCIpO1xudmFyIFBhZ2VEb2N1bWVudF8xID0gcmVxdWlyZShcIi4vUGFnZURvY3VtZW50XCIpO1xudmFyIEhUTUxVdGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL0hUTUxVdGlsc1wiKTtcbnZhciBERUZBVUxUX1RISUVGX09QVElPTlMgPSB7XG4gICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgIGRvbndsb2FkSW1hZ2VzOiB0cnVlLFxuICAgIGRvd25sb2FkQ1NTOiB0cnVlLFxuICAgIGRvd25sb2FkU2NyaXB0czogdHJ1ZVxufTtcbnZhciBUaGllZiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaGllZihjb250ZW50Q2xpZW50LCBwYWdlRG9jdW1lbnRQYXJhbSwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLnBhZ2VEb2N1bWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5hc3NldHMgPSBbXTtcbiAgICAgICAgdGhpcy5hc3NldFF1ZXVlID0gW107XG4gICAgICAgIHRoaXMubGlua0J1Y2tldHMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWV1ZVVSTCA9IFtdO1xuICAgICAgICB0aGlzLmZpbmlzaENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1RISUVGX09QVElPTlMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnN0YXJ0UGFnZURvY3VtZW50ID0gbmV3IFBhZ2VEb2N1bWVudF8xLmRlZmF1bHQocGFnZURvY3VtZW50UGFyYW0pO1xuICAgICAgICB0aGlzLmNvbnRlbnRDbGllbnQgPSBjb250ZW50Q2xpZW50O1xuICAgIH1cbiAgICBUaGllZi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5maW5pc2hDYWxsYmFjayA9IGNiO1xuICAgICAgICBMb2dnZXJVdGlsc18xLmRlZmF1bHQubG9nKFwiU3RhcnQgZG93bmxvYWQgcGFnZSB3aXRoIG9wdGlvbnNcIiwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdmFyIHBhZ2VMaW5rcyA9IHRoaXMuc3RhcnRQYWdlRG9jdW1lbnQuZ2V0UGFnZUxpbmtzRnJvbUN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5hZGRQYWdlTGlua3NUb1F1ZXVlKHBhZ2VMaW5rcyk7XG4gICAgICAgIExvZ2dlclV0aWxzXzEuZGVmYXVsdC5sb2coXCJVUkwgcXVldWU6ICVkXCIsIHRoaXMucXVldWVVUkwubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5mZXRjaFBhZ2VzKCk7XG4gICAgfTtcbiAgICBUaGllZi5wcm90b3R5cGUuZ2V0U3RhcnRQYWdlRG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0UGFnZURvY3VtZW50O1xuICAgIH07XG4gICAgVGhpZWYucHJvdG90eXBlLmdldFBhZ2VEb2N1bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VEb2N1bWVudHM7XG4gICAgfTtcbiAgICBUaGllZi5wcm90b3R5cGUuZ2V0QXNzZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hc3NldHM7XG4gICAgfTtcbiAgICBUaGllZi5wcm90b3R5cGUuYWRkUGFnZUxpbmtzVG9RdWV1ZSA9IGZ1bmN0aW9uIChwYWdlTGlua3MpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBwYWdlTGlua3NfMSA9IHBhZ2VMaW5rczsgX2kgPCBwYWdlTGlua3NfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBwYWdlTGluayA9IHBhZ2VMaW5rc18xW19pXTtcbiAgICAgICAgICAgIC8vIHRoaXMuYWRkTGlua1RvUXVldWUocGFnZUxpbmsudXJsLmhyZWYsIFwic3RyaW5nXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRMaW5rVG9RdWV1ZShwYWdlTGluay51cmwub3JpZ2luICsgcGFnZUxpbmsudXJsLnBhdGhuYW1lLCBcInN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVGhpZWYucHJvdG90eXBlLmFkZExpbmtUb1F1ZXVlID0gZnVuY3Rpb24gKGxpbmssIHR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMubGlua0J1Y2tldHMuaW5kZXhPZihsaW5rKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlua0J1Y2tldHMucHVzaChsaW5rKTtcbiAgICAgICAgICAgIHRoaXMucXVldWVVUkwucHVzaCh7IGxpbms6IGxpbmssIHR5cGU6IHR5cGUgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRoaWVmLnByb3RvdHlwZS5mZXRjaFBhZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5xdWV1ZVVSTC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgdGFza18xID0gdGhpcy5xdWV1ZVVSTC5zaGlmdCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q2xpZW50LmdldERhdGEodGFza18xLmxpbmssIHRhc2tfMS50eXBlKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFBhZ2VEb2N1bWVudCA9IEhUTUxVdGlsc18xLmRlZmF1bHQuY3JlYXRlUGFnZURvY3VtZW50KHRhc2tfMS5saW5rLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGFnZURvY3VtZW50cy5wdXNoKGN1cnJlbnRQYWdlRG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5yZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZFBhZ2VMaW5rc1RvUXVldWUoY3VycmVudFBhZ2VEb2N1bWVudC5nZXRQYWdlTGlua3NGcm9tQ3VycmVudE9yaWdpbigpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5mZXRjaFBhZ2VzKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5mZXRjaFBhZ2VzKCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nZ2VyVXRpbHNfMS5kZWZhdWx0LmxvZyhcIkZpbmlzaGVkIGRvd25sb2FkICVkIHBhZ2VzXCIsIHRoaXMucGFnZURvY3VtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydEZldGNoQXNzZXRzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRoaWVmLnByb3RvdHlwZS5nZXRBc3NldHNRdWV1ZUZyb21QYWdlRG9jdW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXNzZXRzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnBhZ2VEb2N1bWVudHM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFnZURvY3VtZW50ID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb3dubG9hZENTUykge1xuICAgICAgICAgICAgICAgIGFzc2V0cyA9IGFzc2V0cy5jb25jYXQocGFnZURvY3VtZW50LmdldENzc1BhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luKCkubWFwKGZ1bmN0aW9uIChwYWdlTGluaykgeyByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgbGluazogcGFnZUxpbmsudXJsLmhyZWYsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhcnJheWJ1ZmZlcidcbiAgICAgICAgICAgICAgICB9KTsgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb3dubG9hZFNjcmlwdHMpIHtcbiAgICAgICAgICAgICAgICBhc3NldHMgPSBhc3NldHMuY29uY2F0KHBhZ2VEb2N1bWVudC5nZXRTY3JpcHRQYWdlTGlua3NGcm9tQ3VycmVudE9yaWdpbigpLm1hcChmdW5jdGlvbiAocGFnZUxpbmspIHsgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIGxpbms6IHBhZ2VMaW5rLnVybC5ocmVmLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYXJyYXlidWZmZXInXG4gICAgICAgICAgICAgICAgfSk7IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG9ud2xvYWRJbWFnZXMpIHtcbiAgICAgICAgICAgICAgICBhc3NldHMgPSBhc3NldHMuY29uY2F0KHBhZ2VEb2N1bWVudC5nZXRJbWFnZVBhZ2VMaW5rc0Zyb21DdXJyZW50T3JpZ2luKCkubWFwKGZ1bmN0aW9uIChwYWdlTGluaykgeyByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgbGluazogcGFnZUxpbmsudXJsLmhyZWYsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhcnJheWJ1ZmZlcidcbiAgICAgICAgICAgICAgICB9KTsgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBhc3NldExpbmtzID0gYXNzZXRzLm1hcChmdW5jdGlvbiAoYXNzZXQpIHsgcmV0dXJuIGFzc2V0Lmxpbms7IH0pO1xuICAgICAgICByZXR1cm4gYXNzZXRzLmZpbHRlcihmdW5jdGlvbiAoYXNzZXQsIGluZGV4KSB7IHJldHVybiBhc3NldExpbmtzLmluZGV4T2YoYXNzZXQubGluaykgPT09IGluZGV4OyB9KTtcbiAgICB9O1xuICAgIFRoaWVmLnByb3RvdHlwZS5zdGFydEZldGNoQXNzZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFzc2V0UXVldWUgPSB0aGlzLmdldEFzc2V0c1F1ZXVlRnJvbVBhZ2VEb2N1bWVudHMoKTtcbiAgICAgICAgTG9nZ2VyVXRpbHNfMS5kZWZhdWx0LmxvZyhcIlN0YXJ0IGRvd25sb2FkIGFzc2V0cyAlZFwiLCB0aGlzLmFzc2V0UXVldWUubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5mZXRjaEFzc2V0cygpO1xuICAgIH07XG4gICAgVGhpZWYucHJvdG90eXBlLmZldGNoQXNzZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5hc3NldFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciB0YXNrXzIgPSB0aGlzLmFzc2V0UXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudENsaWVudC5nZXREYXRhKHRhc2tfMi5saW5rLCB0YXNrXzIudHlwZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXNzZXRzLnB1c2goX19hc3NpZ24oX19hc3NpZ24oe30sIHRhc2tfMiksIHsgZGF0YTogZGF0YSB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLmZldGNoQXNzZXRzKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5mZXRjaEFzc2V0cygpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZ2dlclV0aWxzXzEuZGVmYXVsdC5sb2coXCJGaW5pc2hlZCB0byBkb3dubG9hZCAlZCBhc3NldHNcIiwgdGhpcy5hc3NldHMubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRoaWVmO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRoaWVmO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTG9nZ2VyVXRpbHNfMSA9IHJlcXVpcmUoXCIuL0xvZ2dlclV0aWxzXCIpO1xudmFyIEJhY2tncm91bmRVdGlscyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYWNrZ3JvdW5kVXRpbHMoKSB7XG4gICAgfVxuICAgIEJhY2tncm91bmRVdGlscy5vbk1lc3NhZ2UgPSBmdW5jdGlvbiAob25MaXN0ZW4pIHtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChtc2csIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBMb2dnZXJVdGlsc18xLmRlZmF1bHQubG9nKFwiUmVjZWl2ZWQgJW8gZnJvbSAlbywgZnJhbWVcIiwgbXNnLCBzZW5kZXIudGFiLCBzZW5kZXIuZnJhbWVJZCk7XG4gICAgICAgICAgICBvbkxpc3Rlbihtc2csIHNlbmRlciwgc2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBCYWNrZ3JvdW5kVXRpbHM7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gQmFja2dyb3VuZFV0aWxzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQnJvd3NlclV0aWxzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyb3dzZXJVdGlscygpIHtcbiAgICB9XG4gICAgQnJvd3NlclV0aWxzLmdldEN1cnJlbnRUYWIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIHdpbmRvd1R5cGU6IFwibm9ybWFsXCIsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgIHZhciB0YWIgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRhYnMgJiYgdGFicy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGFiID0gdGFic1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNiKHRhYik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQnJvd3NlclV0aWxzLmdldEN1cnJlbnRUYWJJRCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICBCcm93c2VyVXRpbHMuZ2V0Q3VycmVudFRhYihmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgICB2YXIgdGFiSWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRhYiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGFiSWQgPSB0YWIuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYih0YWJJZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQnJvd3NlclV0aWxzLmdldEJhY2tncm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gQnJvd3NlclV0aWxzO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEJyb3dzZXJVdGlscztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBhZ2VEb2N1bWVudF8xID0gcmVxdWlyZShcIi4uL2NsYXNzL1BhZ2VEb2N1bWVudFwiKTtcbnZhciBQYWdlRG9jdW1lbnRVdGlscyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYWdlRG9jdW1lbnRVdGlscygpIHtcbiAgICB9XG4gICAgUGFnZURvY3VtZW50VXRpbHMuZ2V0UGFnZURvY3VtZW50UGFyYW1ldGVyRnJvbUN1cnJlbnREb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGh0bWw6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vdXRlckhUTUwsXG4gICAgICAgICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgICAgICBocmVmOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFBhZ2VEb2N1bWVudFV0aWxzLmNyZWF0ZVBhZ2VEb2N1bWVudFBhcmFtID0gZnVuY3Rpb24gKGxpbmssIGh0bWwpIHtcbiAgICAgICAgdmFyIHVybCA9IG5ldyBVUkwobGluayk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBodG1sOiBodG1sLFxuICAgICAgICAgICAgb3JpZ2luOiB1cmwub3JpZ2luLFxuICAgICAgICAgICAgaHJlZjogdXJsLmhyZWYsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBQYWdlRG9jdW1lbnRVdGlscy5jcmVhdGVQYWdlRG9jdW1lbnQgPSBmdW5jdGlvbiAobGluaywgaHRtbCkge1xuICAgICAgICByZXR1cm4gbmV3IFBhZ2VEb2N1bWVudF8xLmRlZmF1bHQoUGFnZURvY3VtZW50VXRpbHMuY3JlYXRlUGFnZURvY3VtZW50UGFyYW0obGluaywgaHRtbCkpO1xuICAgIH07XG4gICAgUGFnZURvY3VtZW50VXRpbHMuZ2V0UGFnZURvY3VtZW50RnJvbUN1cnJlbnREb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQYWdlRG9jdW1lbnRfMS5kZWZhdWx0KFBhZ2VEb2N1bWVudFV0aWxzLmdldFBhZ2VEb2N1bWVudFBhcmFtZXRlckZyb21DdXJyZW50RG9jdW1lbnQoKSk7XG4gICAgfTtcbiAgICByZXR1cm4gUGFnZURvY3VtZW50VXRpbHM7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUGFnZURvY3VtZW50VXRpbHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBBQ1RJVkVfTE9HR0lORyA9IHRydWU7XG52YXIgTG9nZ2VyVXRpbHMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9nZ2VyVXRpbHMoKSB7XG4gICAgfVxuICAgIExvZ2dlclV0aWxzLmxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQUNUSVZFX0xPR0dJTkcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMb2dnZXJVdGlscy53YXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBQ1RJVkVfTE9HR0lORykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMb2dnZXJVdGlscy5lcnJvciA9IGZ1bmN0aW9uIChlcnJvciwgdGhyb3dFcnJvcikge1xuICAgICAgICBpZiAodGhyb3dFcnJvciA9PT0gdm9pZCAwKSB7IHRocm93RXJyb3IgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoQUNUSVZFX0xPR0dJTkcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgaWYgKHRocm93RXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExvZ2dlclV0aWxzO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IExvZ2dlclV0aWxzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVnRXhVdGlscyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWdFeFV0aWxzKCkge1xuICAgIH1cbiAgICBSZWdFeFV0aWxzLmdldE1hdGNoTGlzdCA9IGZ1bmN0aW9uIChzb3VyY2UsIHJlZ0V4cCkge1xuICAgICAgICB2YXIgbTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgbSA9IHJlZ0V4cC5leGVjKHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAobSk7XG4gICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH07XG4gICAgcmV0dXJuIFJlZ0V4VXRpbHM7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUmVnRXhVdGlscztcbiJdLCJzb3VyY2VSb290IjoiIn0=