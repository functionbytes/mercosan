/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./platform/core/base/resources/js/ckeditor-upload-adapter.js":
/*!********************************************************************!*\
  !*** ./platform/core/base/resources/js/ckeditor-upload-adapter.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Upload file adapter for Botble ckeditor
 */
var CKEditorUploadAdapter = /*#__PURE__*/function () {
  /**
   * Creates a new adapter instance.
   *
   */
  function CKEditorUploadAdapter(loader, url, t) {
    _classCallCheck(this, CKEditorUploadAdapter);
    /**
     * FileLoader instance to use during the upload.
     */
    this.loader = loader;

    /**
     * Upload URL.
     *
     * @member {String} #url
     */
    this.url = url;

    /**
     * Locale translation method.
     */
    this.t = t;
  }

  /**
   * Starts the upload process.
   *
   * @returns {Promise.<Object>}
   */
  return _createClass(CKEditorUploadAdapter, [{
    key: "upload",
    value: function upload() {
      var _this = this;
      return this.loader.file.then(function (file) {
        return new Promise(function (resolve, reject) {
          _this._initRequest();
          _this._initListeners(resolve, reject, file);
          _this._sendRequest(file);
        });
      });
    }

    /**
     * Aborts the upload process.
     *
     */
  }, {
    key: "abort",
    value: function abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }

    /**
     * Initializes the XMLHttpRequest object.
     *
     * @private
     */
  }, {
    key: "_initRequest",
    value: function _initRequest() {
      var xhr = this.xhr = new XMLHttpRequest();
      xhr.open('POST', this.url, true);
      xhr.responseType = 'json';
    }

    /**
     * Initializes XMLHttpRequest listeners.
     *
     * @private
     * @param {Function} resolve Callback function to be called when the request is successful.
     * @param {Function} reject Callback function to be called when the request cannot be completed.
     * @param {File} file File instance to be uploaded.
     */
  }, {
    key: "_initListeners",
    value: function _initListeners(resolve, reject, file) {
      var xhr = this.xhr;
      var loader = this.loader;
      var t = this.t;
      var genericError = t('Cannot upload file:') + " ".concat(file.name, ".");
      xhr.addEventListener('error', function () {
        return reject(genericError);
      });
      xhr.addEventListener('abort', function () {
        return reject();
      });
      xhr.addEventListener('load', function () {
        var response = xhr.response;
        if (!response || !response.uploaded) {
          return reject(response && response.error && response.error.message ? response.error.message : genericError);
        }
        resolve({
          "default": response.url
        });
      });

      // Upload progress when it's supported.
      /* istanbul ignore else */
      if (xhr.upload) {
        xhr.upload.addEventListener('progress', function (evt) {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total;
            loader.uploaded = evt.loaded;
          }
        });
      }
    }

    /**
     * Prepares the data and sends the request.
     *
     * @private
     * @param {File} file File instance to be uploaded.
     */
  }, {
    key: "_sendRequest",
    value: function _sendRequest(file) {
      // Prepare form data.
      var data = new FormData();
      data.append('upload', file);
      data.append('_token', $('meta[name="csrf-token"]').attr('content')); // laravel token

      // Send request.
      this.xhr.send(data);
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CKEditorUploadAdapter);

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
/*!***************************************************!*\
  !*** ./platform/core/base/resources/js/editor.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ckeditor_upload_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ckeditor-upload-adapter */ "./platform/core/base/resources/js/ckeditor-upload-adapter.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var EditorManagement = /*#__PURE__*/function () {
  function EditorManagement() {
    _classCallCheck(this, EditorManagement);
    this.CKEDITOR = {};
    this.ckEditorConfigCallbacks = [];
    this.ckEditorInitialCallbacks = [];
    this.ckFinderCallback = null;
    this.tinyMceConfigCallbacks = [];
    this.tinyMceInitialCallbacks = [];
    document.dispatchEvent(new CustomEvent('core-editor-init', {
      detail: this
    }));
  }
  return _createClass(EditorManagement, [{
    key: "ckEditorConfigUsing",
    value: function ckEditorConfigUsing(callback) {
      this.ckEditorConfigCallbacks.push(callback);
    }
  }, {
    key: "ckEditorInitialUsing",
    value: function ckEditorInitialUsing(callback) {
      this.ckEditorInitialCallbacks.push(callback);
    }
  }, {
    key: "ckEditorConfig",
    value: function ckEditorConfig(config) {
      var _iterator = _createForOfIteratorHelper(this.ckEditorConfigCallbacks),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var callback = _step.value;
          config = callback(config);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return config;
    }
  }, {
    key: "ckFinderUsing",
    value: function ckFinderUsing(callback) {
      this.ckFinderCallback = callback;
    }
  }, {
    key: "ckFinderInitial",
    value: function () {
      var _ckFinderInitial = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(editor, element) {
        var ckFileRepository, ckfinder, btnGalleries;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.ckFinderCallback) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return", this.ckFinderCallback(editor, element));
            case 2:
              ckFileRepository = editor.plugins.get('FileRepository');
              if (ckFileRepository && typeof RV_MEDIA_URL != 'undefined' && RV_MEDIA_URL.media_upload_from_editor) {
                ckFileRepository.createUploadAdapter = function (loader) {
                  return new _ckeditor_upload_adapter__WEBPACK_IMPORTED_MODULE_0__["default"](loader, RV_MEDIA_URL.media_upload_from_editor, editor.t);
                };
              }
              ckfinder = editor.commands.get('ckfinder');
              btnGalleries = $("#".concat(element)).parent().find('.btn_gallery[data-action="media-insert-ckeditor"]');
              if (ckfinder && btnGalleries.length) {
                ckfinder.execute = function () {
                  return btnGalleries.trigger('click');
                };
              } else {
                ckfinder.execute = function () {
                  return Botble.showError('Not available.');
                };
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function ckFinderInitial(_x, _x2) {
        return _ckFinderInitial.apply(this, arguments);
      }
      return ckFinderInitial;
    }()
  }, {
    key: "initCkEditor",
    value: function initCkEditor(element, extraConfig) {
      var _this = this;
      if (this.CKEDITOR[element] || !$('#' + element).is(':visible')) {
        return false;
      }
      var editor = document.querySelector('#' + element);
      var config = _objectSpread({
        fontSize: {
          options: [9, 10, 11, 12, 13, 'default', 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        },
        alignment: {
          options: ['left', 'right', 'center', 'justify']
        },
        heading: {
          options: [{
            model: 'paragraph',
            title: 'Paragraph',
            "class": 'ck-heading_paragraph'
          }, {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            "class": 'ck-heading_heading1'
          }, {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            "class": 'ck-heading_heading2'
          }, {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            "class": 'ck-heading_heading3'
          }, {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            "class": 'ck-heading_heading4'
          }, {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            "class": 'ck-heading_heading4'
          }, {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            "class": 'ck-heading_heading4'
          }]
        },
        placeholder: ' ',
        toolbar: {
          items: ['heading', '|', 'fontColor', 'fontSize', 'fontBackgroundColor', 'fontFamily', 'bold', 'italic', 'underline', 'link', 'strikethrough', 'bulletedList', 'numberedList', '|', 'alignment', 'direction', 'shortcode', 'outdent', 'indent', '|', 'htmlEmbed', 'imageInsert', 'ckfinder', 'blockQuote', 'insertTable', 'mediaEmbed', 'bootstrapGrid', 'undo', 'redo', 'findAndReplace', 'removeFormat', 'sourceEditing', 'codeBlock', 'fullScreen'],
          shouldNotGroupWhenFull: true
        },
        language: {
          ui: window.siteEditorLocale || 'en',
          content: window.siteEditorLocale || 'en'
        },
        image: {
          toolbar: ['imageTextAlternative', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', 'imageStyle:wrapText', 'imageStyle:breakText', 'toggleImageCaption', 'ImageResize'],
          upload: {
            types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg+xml']
          }
        },
        codeBlock: {
          languages: [{
            language: 'plaintext',
            label: 'Plain text'
          }, {
            language: 'c',
            label: 'C'
          }, {
            language: 'cs',
            label: 'C#'
          }, {
            language: 'cpp',
            label: 'C++'
          }, {
            language: 'css',
            label: 'CSS'
          }, {
            language: 'diff',
            label: 'Diff'
          }, {
            language: 'html',
            label: 'HTML'
          }, {
            language: 'java',
            label: 'Java'
          }, {
            language: 'javascript',
            label: 'JavaScript'
          }, {
            language: 'php',
            label: 'PHP'
          }, {
            language: 'python',
            label: 'Python'
          }, {
            language: 'ruby',
            label: 'Ruby'
          }, {
            language: 'typescript',
            label: 'TypeScript'
          }, {
            language: 'xml',
            label: 'XML'
          }, {
            language: 'dart',
            label: 'Dart',
            "class": 'language-dart'
          }]
        },
        link: {
          defaultProtocol: 'http://',
          decorators: {
            openInNewTab: {
              mode: 'manual',
              label: 'Open in a new tab',
              attributes: {
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }
          }
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
        },
        htmlSupport: {
          allow: [{
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true
          }]
        },
        mediaEmbed: {
          extraProviders: [{
            name: 'tiktok',
            url: '^.*https:\\/\\/(?:m|www|vm)?\\.?tiktok\\.com\\/((?:.*\\b(?:(?:usr|v|embed|user|video)\\/|\\?shareId=|\\&item_id=)(\\d+))|\\w+)',
            html: function html(match) {
              return "<iframe src=\"https://www.tiktok.com/embed/v2/".concat(match[1], "\" width=\"100%\" height=\"400\" frameborder=\"0\"></iframe>");
            }
          }]
        }
      }, extraConfig);
      config = this.ckEditorConfig(config);
      ClassicEditor.create(editor, config).then(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(editor) {
          var minHeight, className, timeout;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                // create function insert html
                editor.insertHtml = function (html) {
                  var viewFragment = editor.data.processor.toView(html);
                  var modelFragment = editor.data.toModel(viewFragment);
                  editor.model.insertContent(modelFragment);
                };
                window.editor = editor;
                _this.CKEDITOR[element] = editor;
                minHeight = $('#' + element).prop('rows') * 90;
                className = "ckeditor-".concat(element, "-inline");
                $(editor.ui.view.editable.element).addClass(className).after("\n                    <style>\n                        .ck-editor__editable_inline {\n                            min-height: ".concat(minHeight - 100, "px;\n                            max-height: ").concat(minHeight + 100, "px;\n                        }\n                    </style>\n                "));

                // debounce content for ajax ne

                editor.model.document.on('change:data', function () {
                  clearTimeout(timeout);
                  timeout = setTimeout(function () {
                    editor.updateSourceElement();
                  }, 150);
                });

                // insert media embed
                editor.commands._commands.get('mediaEmbed').execute = function (url) {
                  editor.execute('shortcode', "[media url=\"".concat(url, "\"][/media]"));
                };
                _context2.next = 10;
                return _this.ckEditorInitialUsing(editor);
              case 10:
                _context2.next = 12;
                return _this.ckFinderInitial(editor, element);
              case 12:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }())["catch"](function (error) {
        console.error(error);
      });
    }
  }, {
    key: "uploadImageFromEditor",
    value: function uploadImageFromEditor(blobInfo, callback) {
      var formData = new FormData();
      if (typeof blobInfo.blob === 'function') {
        formData.append('upload', blobInfo.blob(), blobInfo.filename());
      } else {
        formData.append('upload', blobInfo);
      }
      $httpClient.make().postForm(RV_MEDIA_URL.media_upload_from_editor, formData).then(function (_ref2) {
        var data = _ref2.data;
        if (data.uploaded) {
          callback(data.url);
        }
      });
    }
  }, {
    key: "tinyMceConfigUsing",
    value: function tinyMceConfigUsing(callback) {
      this.tinyMceConfigCallbacks.push(callback);
    }
  }, {
    key: "tinyMceInitialUsing",
    value: function tinyMceInitialUsing(callback) {
      this.tinyMceInitialCallbacks.push(callback);
    }
  }, {
    key: "tinyMceConfig",
    value: function tinyMceConfig(config) {
      var _iterator2 = _createForOfIteratorHelper(this.tinyMceConfigCallbacks),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var callback = _step2.value;
          config = callback(config);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return config;
    }
  }, {
    key: "tinyMceInitial",
    value: function () {
      var _tinyMceInitial = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(editor) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", editor);
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function tinyMceInitial(_x4) {
        return _tinyMceInitial.apply(this, arguments);
      }
      return tinyMceInitial;
    }()
  }, {
    key: "initTinyMce",
    value: function () {
      var _initTinyMce = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(element) {
        var _this2 = this;
        var options, tinymceInstance;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              options = {
                menubar: true,
                selector: "#".concat(element),
                min_height: $("#".concat(element)).prop('rows') * 110,
                resize: 'vertical',
                plugins: 'code autolink advlist visualchars link image media table charmap hr pagebreak nonbreaking anchor insertdatetime lists wordcount imagetools visualblocks',
                extended_valid_elements: 'input[id|name|value|type|class|style|required|placeholder|autocomplete|onclick]',
                toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link image table | alignleft aligncenter alignright alignjustify  | numlist bullist indent  |  visualblocks code',
                convert_urls: false,
                image_caption: true,
                image_advtab: true,
                image_title: true,
                placeholder: '',
                contextmenu: 'link image inserttable | cell row column deletetable',
                images_upload_url: RV_MEDIA_URL.media_upload_from_editor,
                automatic_uploads: true,
                block_unsupported_drop: false,
                file_picker_types: 'file image media',
                images_upload_handler: this.uploadImageFromEditor.bind(this),
                file_picker_callback: function file_picker_callback(callback) {
                  var $input = $('<input type="file" accept="image/*" />').click();
                  $input.on('change', function (e) {
                    _this2.uploadImageFromEditor(e.target.files[0], callback);
                  });
                },
                directionality: $('body').prop('dir') || 'ltr'
              };
              if (localStorage.getItem('themeMode') === 'dark') {
                options.skin = 'oxide-dark';
                options.content_css = 'dark';
              }
              options = this.tinyMceConfig(options);
              tinymceInstance = tinymce.init(options);
              _context4.next = 6;
              return this.tinyMceInitial(tinymceInstance);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function initTinyMce(_x5) {
        return _initTinyMce.apply(this, arguments);
      }
      return initTinyMce;
    }()
  }, {
    key: "initEditor",
    value: function initEditor(element, extraConfig, type) {
      if (!element.length) {
        return false;
      }
      var current = this;
      switch (type) {
        case 'ckeditor':
          $.each(element, function (index, item) {
            current.initCkEditor($(item).prop('id'), extraConfig);
          });
          break;
        case 'tinymce':
          $.each(element, function (index, item) {
            current.initTinyMce($(item).prop('id'));
          });
          break;
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;
      var $ckEditor = $(document).find('.editor-ckeditor');
      var $tinyMce = $(document).find('.editor-tinymce');
      var current = this;
      if ($ckEditor.length > 0) {
        current.initEditor($ckEditor, {}, 'ckeditor');
      }
      if ($tinyMce.length > 0) {
        current.initEditor($tinyMce, {}, 'tinymce');
      }
      $(document).off('click', '.show-hide-editor-btn').on('click', '.show-hide-editor-btn', function (event) {
        event.preventDefault();
        var editorInstance = $(event.currentTarget).data('result');
        var $result = $('#' + editorInstance);
        if ($result.hasClass('editor-ckeditor')) {
          var $editorActionItem = $('.editor-action-item');
          if (_this3.CKEDITOR[editorInstance] && typeof _this3.CKEDITOR[editorInstance] !== 'undefined') {
            _this3.CKEDITOR[editorInstance].destroy();
            _this3.CKEDITOR[editorInstance] = null;
            $editorActionItem.not('.action-show-hide-editor').hide();
          } else {
            current.initCkEditor(editorInstance, {}, 'ckeditor');
            $editorActionItem.not('.action-show-hide-editor').show();
          }
        } else if ($result.hasClass('editor-tinymce')) {
          tinymce.execCommand('mceToggleEditor', false, editorInstance);
        }
      });
      return this;
    }
  }]);
}();
$(function () {
  window.EDITOR = new EditorManagement().init();
  window.EditorManagement = window.EditorManagement || EditorManagement;
  $(document).on('shown.bs.modal', function () {
    window.EDITOR.init();
  });
});
})();

/******/ })()
;