/******/ (() => { // webpackBootstrap
/*!***************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/front-ecommerce.js ***!
  \***************************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _transformFormData = /*#__PURE__*/new WeakMap();
var _ajaxSearchProducts = /*#__PURE__*/new WeakMap();
var _ajaxFilterForm = /*#__PURE__*/new WeakMap();
var _initCategoriesDropdown = /*#__PURE__*/new WeakMap();
var Ecommerce = /*#__PURE__*/function () {
  function Ecommerce() {
    var _this = this;
    _classCallCheck(this, Ecommerce);
    _defineProperty(this, "quickSearchAjax", null);
    _defineProperty(this, "filterAjax", null);
    _defineProperty(this, "lastFilterFormData", null);
    _defineProperty(this, "lastFilterFormAction", null);
    _defineProperty(this, "filterTimeout", null);
    _classPrivateFieldInitSpec(this, _transformFormData, function (formData) {
      var data = [];
      var groupedData = {};
      var seenParams = {};

      // Group array parameters and handle duplicates
      formData.forEach(function (item) {
        if (!item.value) {
          return;
        }

        // Check if it's an array parameter (ends with [])
        if (item.name.endsWith('[]')) {
          var baseName = item.name.slice(0, -2);
          if (!groupedData[baseName]) {
            groupedData[baseName] = new Set();
          }
          // Use a Set to automatically remove duplicates
          groupedData[baseName].add(item.value);
        } else {
          // For non-array parameters, only keep the first occurrence
          if (!seenParams[item.name]) {
            seenParams[item.name] = true;
            data.push(item);
          }
        }
      });

      // Add grouped parameters as comma-separated values
      Object.keys(groupedData).forEach(function (key) {
        var values = Array.from(groupedData[key]);
        if (values.length > 0) {
          data.push({
            name: key,
            value: values.join(',')
          });
        }
      });
      return data;
    });
    _defineProperty(this, "highlightSearchKeywords", function ($element, phrase) {
      if (!phrase.trim()) {
        return;
      }
      var keywords = phrase.trim().split(/\s+/);
      var regex = new RegExp("(".concat(keywords.join('|'), ")"), 'gi');
      $element.html($element.text().replace(regex, '<span class="bb-quick-search-highlight">$1</span>'));
    });
    _classPrivateFieldInitSpec(this, _ajaxSearchProducts, function (form, url) {
      var button = form.find('button[type="submit"]');
      var input = form.find('input[name="q"]');
      var results = form.find('.bb-quick-search-results');
      if (!input.val()) {
        results.removeClass('show').html('');
        return;
      }
      _this.quickSearchAjax = $.ajax({
        type: 'GET',
        url: url || form.data('ajax-url'),
        data: form.serialize(),
        beforeSend: function beforeSend() {
          button.addClass('btn-loading');
          if (!url) {
            results.removeClass('show').html('');
          }
          if (_this.quickSearchAjax !== null) {
            _this.quickSearchAjax.abort();
          }
        },
        success: function success(_ref) {
          var error = _ref.error,
            message = _ref.message,
            data = _ref.data;
          if (error) {
            Theme.showError(message);
            return;
          }
          results.addClass('show');
          if (url) {
            results.find('.bb-quick-search-list').append($(data).find('.bb-quick-search-list').html());
          } else {
            results.html(data);
          }
          var that = _this;
          var searchPhrase = input.val();
          results.find('.bb-quick-search-item-name').each(function () {
            $(this).html($(this).text());
            if (searchPhrase) {
              that.highlightSearchKeywords($(this), searchPhrase);
            }
          });
          if (typeof Theme.lazyLoadInstance !== 'undefined') {
            Theme.lazyLoadInstance.update();
          }
        },
        complete: function complete() {
          return button.removeClass('btn-loading');
        }
      });
    });
    _classPrivateFieldInitSpec(this, _ajaxFilterForm, function (url, data, nextUrl) {
      var form = $('.bb-product-form-filter');

      // If a direct URL is provided without form data, reset the tracking variables
      if (url && !data) {
        _this.lastFilterFormData = null;
        _this.lastFilterFormAction = null;
      }

      // If data is an array, convert it to a proper format for AJAX
      var ajaxData = data;
      if (Array.isArray(data)) {
        // Convert to URLSearchParams to handle duplicates
        var params = new URLSearchParams();
        var paramsByName = {};

        // Group by name to prevent duplicates
        data.forEach(function (item) {
          if (item.name && item.value) {
            paramsByName[item.name] = item.value;
          }
        });

        // Add to URLSearchParams
        Object.keys(paramsByName).forEach(function (name) {
          params.set(name, paramsByName[name]);
        });

        // Convert to object for jQuery AJAX
        ajaxData = {};
        var _iterator = _createForOfIteratorHelper(params.entries()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];
            ajaxData[key] = value;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      _this.filterAjax = $.ajax({
        url: url,
        type: 'GET',
        data: ajaxData,
        beforeSend: function beforeSend() {
          document.dispatchEvent(new CustomEvent('ecommerce.product-filter.before', {
            detail: {
              data: ajaxData,
              element: form
            }
          }));
        },
        success: function success(data) {
          var message = data.message,
            error = data.error;
          if (error) {
            Theme.showError(message);
            _this.filterAjax = null;
            return;
          }

          // Ensure the URL doesn't have duplicate parameters
          var finalUrl = nextUrl || url;
          if (finalUrl.includes('?')) {
            var urlParts = finalUrl.split('?');
            var baseUrl = urlParts[0];
            var _params = new URLSearchParams(urlParts[1]);

            // Remove any duplicate parameters
            var uniqueParams = new URLSearchParams();
            var _iterator2 = _createForOfIteratorHelper(_params.entries()),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                  _key = _step2$value[0],
                  _value = _step2$value[1];
                if (!uniqueParams.has(_key)) {
                  uniqueParams.set(_key, _value);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            finalUrl = baseUrl + '?' + uniqueParams.toString();
          }
          window.history.pushState(data, null, finalUrl);
          document.dispatchEvent(new CustomEvent('ecommerce.product-filter.success', {
            detail: {
              data: data,
              element: form
            }
          }));

          // Reset filterAjax after successful request
          _this.filterAjax = null;
          if ($('.bb-product-price-filter').length) {
            EcommerceApp.initPriceFilter();
          }
        },
        error: function error(xhr) {
          // Don't show error for aborted requests
          if (xhr.statusText !== 'abort') {
            console.error('Filter request failed:', xhr);
            Theme.handleError(xhr);
          }
        },
        complete: function complete() {
          // Always reset the filter timeout and AJAX request
          _this.filterTimeout = null;
          _this.filterAjax = null;
          if (typeof Theme.lazyLoadInstance !== 'undefined') {
            Theme.lazyLoadInstance.update();
          }
          document.dispatchEvent(new CustomEvent('ecommerce.product-filter.completed', {
            detail: {
              element: form
            }
          }));
        }
      });
    });
    _classPrivateFieldInitSpec(this, _initCategoriesDropdown, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var makeRequest, initCategoriesDropdown, url;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            makeRequest = function makeRequest(url, beforeCallback, successCallback) {
              // Assuming url, beforeCallback, successCallback, and Theme.handleError are already defined

              // Call the beforeSend callback
              beforeCallback();
              fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  // Requesting JSON response
                  'Accept': 'application/json' // Requesting JSON response
                }
              }).then(function (response) {
                // Check if the response is okay and parse it as JSON
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              }).then(function (_ref3) {
                var error = _ref3.error,
                  data = _ref3.data;
                if (error) {
                  return;
                }

                // Call the success callback with the data
                successCallback(data);

                // Dispatch a custom event after successfully fetching the data
                document.dispatchEvent(new CustomEvent('ecommerce.categories-dropdown.success', {
                  detail: {
                    data: data
                  }
                }));
              })["catch"](function (error) {
                // Handle any errors that occur during the fetch
                Theme.handleError(error);
              });
            };
            initCategoriesDropdown = $(document).find('[data-bb-toggle="init-categories-dropdown"]');
            if (initCategoriesDropdown.length) {
              url = initCategoriesDropdown.first().data('url');
              makeRequest(url, function () {}, function (data) {
                initCategoriesDropdown.each(function (index, element) {
                  var currentTarget = $(element);
                  var target = $(currentTarget.data('bb-target'));
                  if (target.length) {
                    target.html(data.dropdown);
                  } else {
                    currentTarget.append(data.select);
                  }
                  if (typeof Theme.lazyLoadInstance !== 'undefined') {
                    Theme.lazyLoadInstance.update();
                  }
                });
              });
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    _defineProperty(this, "productQuantityToggle", function () {
      var $container = $('[data-bb-toggle="product-quantity"]');
      $container.on('click', '[data-bb-toggle="product-quantity-toggle"]', function (e) {
        var $currentTarget = $(e.currentTarget);
        var $calculation = $currentTarget.data('value');
        if (!$calculation) {
          return;
        }
        var $input = null;
        if ($calculation === 'plus') {
          $input = $currentTarget.prev();
        } else if ($calculation === 'minus') {
          $input = $currentTarget.next();
        }
        if (!$input) {
          return;
        }
        var $quantity = parseInt($input.val()) || 1;
        $input.val($calculation === 'plus' ? $quantity + 1 : $quantity === 1 ? 1 : $quantity - 1);
        document.dispatchEvent(new CustomEvent('ecommerce.cart.quantity.change', {
          detail: {
            element: $currentTarget,
            action: $calculation === '+' ? 'increase' : 'decrease'
          }
        }));
      });
    });
    _defineProperty(this, "onChangeProductAttribute", function () {
      if (!window.onBeforeChangeSwatches || typeof window.onBeforeChangeSwatches !== 'function') {
        /**
         * @param {Array<Number>} data
         * @param {jQuery} element
         */
        window.onBeforeChangeSwatches = function (data, element) {
          var form = element.closest('form');
          if (data) {
            form.find('button[type="submit"]').prop('disabled', true);
            form.find('button[data-bb-toggle="add-to-cart"]').prop('disabled', true);
          }
        };
      }
      if (!window.onChangeSwatchesSuccess || typeof window.onChangeSwatchesSuccess !== 'function') {
        /**
         * @param {{data: Object, error: Boolean, message: String}} response
         * @param {jQuery} element
         */
        window.onChangeSwatchesSuccess = function (response, element) {
          if (!response) {
            return;
          }
          var $product = $('.bb-product-detail');
          var $form = element.closest('form');
          var $button = $form.find('button[type="submit"]');
          var $quantity = $form.find('input[name="qty"]');
          var $available = $product.find('.number-items-available');
          var $sku = $product.find('[data-bb-value="product-sku"]');
          var error = response.error,
            data = response.data;
          if (error) {
            $button.prop('disabled', true);
            $quantity.prop('disabled', true);
            $form.find('input[name="id"]').val('');
            return;
          }
          $button.prop('disabled', false);
          $quantity.prop('disabled', false);
          $form.find('input[name="id"]').val(data.id);
          $product.find('[data-bb-value="product-price"]').text(data.display_sale_price);
          if (data.sale_price !== data.price) {
            $product.find('[data-bb-value="product-original-price"]').text(data.display_price).show();
          } else {
            $product.find('[data-bb-value="product-original-price"]').hide();
          }
          if (data.sku) {
            $sku.text(data.sku);
            $sku.closest('div').show();
          } else {
            $sku.closest('div').hide();
          }
          if (data.error_message) {
            $button.prop('disabled', true);
            $quantity.prop('disabled', true);
            $available.html("<span class='text-danger'>".concat(data.error_message, "</span>")).show();
          } else if (data.warning_message) {
            $available.html("<span class='text-warning fw-medium fs-6'>".concat(data.warning_message, "</span>")).show();
          } else if (data.success_message) {
            $available.html("<span class='text-success'>".concat(data.success_message, "</span>")).show();
          } else {
            $available.html('').hide();
          }
          $product.find('.bb-product-attribute-swatch-item').removeClass('disabled');
          $product.find('.bb-product-attribute-swatch-list select option').prop('disabled', false);
          var unavailableAttributeIds = data.unavailable_attribute_ids || [];
          if (unavailableAttributeIds.length) {
            unavailableAttributeIds.map(function (id) {
              var $swatchItem = $product.find(".bb-product-attribute-swatch-item[data-id=\"".concat(id, "\"]"));
              if ($swatchItem.length) {
                $swatchItem.addClass('disabled');
                $swatchItem.find('input').prop('checked', false);
              } else {
                $swatchItem = $product.find(".bb-product-attribute-swatch-list select option[data-id=\"".concat(id, "\"]"));
                if ($swatchItem.length) {
                  $swatchItem.prop('disabled', true);
                }
              }
            });
          }
          var imageHtml = '';
          var thumbHtml = '';
          var siteConfig = window.siteConfig || {};
          if (!data.image_with_sizes.origin.length) {
            data.image_with_sizes.origin.push(siteConfig.img_placeholder);
          } else {
            data.image_with_sizes.origin.forEach(function (item) {
              imageHtml += "\n                    <a href='".concat(item, "'>\n                        <img src='").concat(item, "' alt='").concat(data.name, "'>\n                    </a>\n                ");
            });
          }
          if (!data.image_with_sizes.thumb.length) {
            data.image_with_sizes.thumb.push(siteConfig.img_placeholder);
          } else {
            data.image_with_sizes.thumb.forEach(function (item) {
              thumbHtml += "\n                    <div>\n                        <img src='".concat(item, "' alt='").concat(data.name, "'>\n                    </div>\n                ");
            });
          }
          var $galleryImages = $product.find('.bb-product-gallery');
          $galleryImages.find('.bb-product-gallery-thumbnails').slick('unslick').html(thumbHtml);
          var $quickViewGalleryImages = $(document).find('.bb-quick-view-gallery-images');
          if ($quickViewGalleryImages.length) {
            $quickViewGalleryImages.slick('unslick').html(imageHtml);
          }
          $galleryImages.find('.bb-product-gallery-images').slick('unslick').html(imageHtml);
          if (typeof EcommerceApp !== 'undefined') {
            EcommerceApp.initProductGallery();
          }
        };
      }
    });
    _defineProperty(this, "handleUpdateCart", function (element) {
      var form;
      if (element) {
        form = $(element).closest('form');
      } else {
        form = $('form.cart-form');
      }
      $.ajax({
        type: 'POST',
        url: form.prop('action'),
        data: form.serialize(),
        success: function success(_ref4) {
          var error = _ref4.error,
            message = _ref4.message,
            data = _ref4.data;
          if (error) {
            Theme.showError(message);
          }
          _this.ajaxLoadCart(data);
        },
        error: function error(_error) {
          return Theme.handleError(_error);
        }
      });
    });
    _defineProperty(this, "ajaxLoadCart", function (data) {
      if (!data) {
        return;
      }
      var $cart = $('[data-bb-toggle="cart-content"]');
      if (data.count !== undefined) {
        $('[data-bb-value="cart-count"]').text(data.count);
      }
      if (data.total_price !== undefined) {
        $('[data-bb-value="cart-total-price"]').text(data.total_price);
      }
      if ($cart.length) {
        $cart.replaceWith(data.cart_content);
        _this.productQuantityToggle();
        if (typeof Theme.lazyLoadInstance !== 'undefined') {
          Theme.lazyLoadInstance.update();
        }
      }
    });
    $(document).on('click', '[data-bb-toggle="toggle-product-categories-tree"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      currentTarget.toggleClass('active');
      currentTarget.closest('.bb-product-filter-item').find('> .bb-product-filter-items').slideToggle().toggleClass('active');
    }).on('click', '[data-bb-toggle="toggle-filter-sidebar"]', function () {
      $('.bb-filter-offcanvas-area').toggleClass('offcanvas-opened');
      $('.body-overlay').toggleClass('opened');
    }).on('click', '.body-overlay', function () {
      $('.bb-filter-offcanvas-area').removeClass('offcanvas-opened');
      $('.body-overlay').removeClass('opened');
    }).on('submit', 'form.bb-product-form-filter', function (e) {
      e.preventDefault();
      var form = $(e.currentTarget);

      // Create a new FormData object
      var formData = _classPrivateFieldGet(_transformFormData, _this).call(_this, form.serializeArray());
      var url = form.prop('action');
      var nextUrl = url;

      // Use URLSearchParams to prevent duplicate parameters
      var searchParams = new URLSearchParams();

      // Group parameters by name to prevent duplicates
      var paramsByName = {};
      formData.forEach(function (item) {
        if (!paramsByName[item.name]) {
          paramsByName[item.name] = item.value;
        }
      });

      // Add parameters to URLSearchParams
      Object.keys(paramsByName).forEach(function (name) {
        if (paramsByName[name]) {
          searchParams.set(name, paramsByName[name]);
        }
      });

      // Build the URL
      var queryString = searchParams.toString();
      if (queryString) {
        nextUrl += "?".concat(queryString);
      }

      // Add timestamp to formData for AJAX but not for URL
      var formDataWithTimestamp = [].concat(_toConsumableArray(formData), [{
        name: '_',
        value: Date.now()
      }]);

      // Don't reload if URL is the same
      if (window.location.href === nextUrl) {
        return;
      }

      // Don't send duplicate requests with the same parameters and same action URL
      var formDataString = JSON.stringify(formData);
      var currentFormAction = form.prop('action');
      if (_this.lastFilterFormData === formDataString && _this.lastFilterFormAction === currentFormAction) {
        return;
      }
      _this.lastFilterFormData = formDataString;
      _this.lastFilterFormAction = currentFormAction;

      // Cancel any pending AJAX request
      if (_this.filterAjax) {
        _this.filterAjax.abort();
      }

      // Clear any pending timeout
      if (_this.filterTimeout) {
        clearTimeout(_this.filterTimeout);
      }

      // Add a small delay to prevent rapid-fire requests
      _this.filterTimeout = setTimeout(function () {
        _classPrivateFieldGet(_ajaxFilterForm, _this).call(_this, url, formDataWithTimestamp, nextUrl);
      }, 100);
    }).on('change', 'form.bb-product-form-filter input, form.bb-product-form-filter select', function (e) {
      var currentTarget = $(e.currentTarget);
      var form = currentTarget.closest('form');

      // Special handling for checkboxes with array notation
      if (currentTarget.attr('type') === 'checkbox' && currentTarget.attr('name') && currentTarget.attr('name').endsWith('[]')) {
        var baseName = currentTarget.attr('name').slice(0, -2);
        var checkboxes = form.find("input[name=\"".concat(currentTarget.attr('name'), "\"]")).filter(':checked');

        // Find or create the non-array input
        var singleInput = form.find("input[name=\"".concat(baseName, "\"]"));
        if (!singleInput.length) {
          // Create a hidden input with the base name
          form.append("<input type=\"hidden\" name=\"".concat(baseName, "\" value=\"\">"));
          singleInput = form.find("input[name=\"".concat(baseName, "\"]"));
        }

        // Collect values from checked checkboxes
        var values = checkboxes.map(function () {
          return $(this).val();
        }).get();

        // Set the comma-separated values
        singleInput.val(values.join(','));
      }
      form.trigger('submit');
    }).on('keyup', '.bb-form-quick-search input', function (e) {
      _classPrivateFieldGet(_ajaxSearchProducts, _this).call(_this, $(e.currentTarget).closest('form'));
    }).on('click', 'body', function (e) {
      if (!$(e.target).closest('.bb-form-quick-search').length) {
        $('.bb-quick-search-results').removeClass('show').html('');
      }
    }).on('click', '[data-bb-toggle="quick-shop"]', function (e) {
      var currentTarget = $(e.currentTarget);
      var modal = $('#quick-shop-modal');
      $.ajax({
        url: currentTarget.data('url'),
        type: 'GET',
        beforeSend: function beforeSend() {
          modal.find('.modal-body').html('');
          modal.modal('show');
          document.dispatchEvent(new CustomEvent('ecommerce.quick-shop.before-send', {
            detail: {
              element: currentTarget,
              modal: modal
            }
          }));
        },
        success: function success(_ref5) {
          var data = _ref5.data;
          modal.find('.modal-body').html(data);
        },
        error: function error(_error2) {
          return Theme.handleError(_error2);
        },
        complete: function complete() {
          document.dispatchEvent(new CustomEvent('ecommerce.quick-shop.completed', {
            detail: {
              element: currentTarget,
              modal: modal
            }
          }));
        }
      });
    }).on('click', '.bb-product-filter-link', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var form = currentTarget.closest('form');
      var parent = currentTarget.closest('.bb-product-filter');
      var categoryId = currentTarget.data('id');

      // Check if we have existing categories input
      var categoriesInput = form.find('input[name="categories"]');

      // If we don't have a single categories input, look for array notation
      if (!categoriesInput.length) {
        categoriesInput = form.find('input[name="categories[]"]');
      }
      parent.find('.bb-product-filter-link').removeClass('active');
      currentTarget.addClass('active');

      // Remove pagination parameters when changing categories
      form.find('input[name="page"]').remove();
      form.find('input[name="per-page"]').remove();
      if (categoriesInput.length && categoryId) {
        // If using array notation
        if (categoriesInput.attr('name') === 'categories[]') {
          categoriesInput.val(categoryId).trigger('change');
        } else {
          // If using comma-separated values
          categoriesInput.val(categoryId).trigger('change');
        }
      } else {
        if (!categoryId) {
          if (categoriesInput.length) {
            categoriesInput.val(null);
          }
        }
        form.prop('action', currentTarget.prop('href')).trigger('submit');
      }
    }).on('click', '.bb-product-filter-clear', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      _classPrivateFieldGet(_ajaxFilterForm, _this).call(_this, currentTarget.prop('href'));
    }).on('click', '.bb-product-filter-clear-all', function (e) {
      e.preventDefault();
      var form = $('.bb-product-form-filter');

      // Clear all inputs
      form.find('input[type="text"], input[type="hidden"], input[type="radio"], select').val(null);

      // Uncheck all checkboxes
      form.find('input[type="checkbox"]').prop('checked', false);
      form.trigger('submit');
    }).on('submit', 'form#cancel-order-form', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var modal = currentTarget.closest('.modal');
      var button = modal.find('button[type="submit"]');
      $.ajax({
        url: currentTarget.prop('action'),
        type: 'POST',
        data: currentTarget.serialize(),
        beforeSend: function beforeSend() {
          button.addClass('btn-loading');
        },
        success: function success(_ref6) {
          var error = _ref6.error,
            message = _ref6.message;
          if (error) {
            Theme.showError(message);
            return;
          }
          Theme.showSuccess(message);
          modal.modal('hide');
          setTimeout(function () {
            return window.location.reload();
          }, 1000);
        },
        error: function error(_error3) {
          return Theme.handleError(_error3);
        },
        complete: function complete() {
          return button.removeClass('btn-loading');
        }
      });
    }).on('click', '[data-bb-toggle="add-to-compare"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var url = currentTarget.hasClass('active') ? currentTarget.data('remove-url') : currentTarget.data('url');
      var data = {};
      if (currentTarget.hasClass('active')) {
        data = {
          _method: 'DELETE'
        };
      }
      $.ajax({
        url: url,
        method: 'POST',
        data: data,
        beforeSend: function beforeSend() {
          return currentTarget.addClass('btn-loading');
        },
        success: function success(_ref7) {
          var error = _ref7.error,
            message = _ref7.message,
            data = _ref7.data;
          if (error) {
            Theme.showError(message);
          } else {
            Theme.showSuccess(message);
            currentTarget.toggleClass('active');
            if (data.count !== undefined) {
              $('[data-bb-value="compare-count"]').text(data.count);
            }
            if (currentTarget.hasClass('active')) {
              document.dispatchEvent(new CustomEvent('ecommerce.compare.added', {
                detail: {
                  data: data,
                  element: currentTarget
                }
              }));
            } else {
              document.dispatchEvent(new CustomEvent('ecommerce.compare.removed', {
                detail: {
                  data: data,
                  element: currentTarget
                }
              }));
            }
          }
        },
        error: function error(_error4) {
          return Theme.handleError(_error4);
        },
        complete: function complete() {
          return currentTarget.removeClass('btn-loading');
        }
      });
    }).on('click', '[data-bb-toggle="remove-from-compare"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var table = currentTarget.closest('table');
      $.ajax({
        url: currentTarget.data('url'),
        method: 'POST',
        data: {
          _method: 'DELETE'
        },
        success: function success(_ref8) {
          var error = _ref8.error,
            message = _ref8.message,
            data = _ref8.data;
          if (error) {
            Theme.showError(message);
          } else {
            Theme.showSuccess(message);
            document.dispatchEvent(new CustomEvent('ecommerce.compare.removed', {
              detail: {
                data: data,
                element: currentTarget
              }
            }));
            if (data.count !== undefined) {
              $('[data-bb-value="compare-count"]').text(data.count);
            }
            if (data.count > 0) {
              table.find("td:nth-child(".concat(currentTarget.closest('td').index() + 1, ")")).remove();
            } else {
              window.location.reload();
            }
          }
        },
        error: function error(_error5) {
          return Theme.handleError(_error5);
        }
      });
    }).on('click', '[data-bb-toggle="add-to-wishlist"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var url = currentTarget.data('url');
      $.ajax({
        url: url,
        method: 'POST',
        beforeSend: function beforeSend() {
          return currentTarget.addClass('btn-loading');
        },
        success: function success(_ref9) {
          var error = _ref9.error,
            message = _ref9.message,
            data = _ref9.data;
          if (error) {
            Theme.showError(message);
          } else {
            if (data.count !== undefined) {
              $('[data-bb-value="wishlist-count"]').text(data.count);
            }
            Theme.showSuccess(message);
            document.dispatchEvent(new CustomEvent('ecommerce.wishlist.added', {
              detail: {
                data: data,
                element: currentTarget
              }
            }));
          }
        },
        error: function error(_error6) {
          return Theme.handleError(_error6);
        },
        complete: function complete() {
          return currentTarget.removeClass('btn-loading');
        }
      });
    }).on('click', '[data-bb-toggle="remove-from-wishlist"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      $.ajax({
        url: currentTarget.data('url'),
        method: 'POST',
        data: {
          _method: 'DELETE'
        },
        beforeSend: function beforeSend() {
          return currentTarget.addClass('btn-loading');
        },
        success: function success(_ref10) {
          var error = _ref10.error,
            message = _ref10.message,
            data = _ref10.data;
          if (error) {
            Theme.showError(message);
          } else {
            Theme.showSuccess(message);
            if (data.count !== undefined) {
              $('[data-bb-value="wishlist-count"]').text(data.count);
            }
            currentTarget.closest('tr').remove();
            if (data.count === 0) {
              window.location.reload();
            }
            document.dispatchEvent(new CustomEvent('ecommerce.wishlist.removed', {
              detail: {
                data: data,
                element: currentTarget
              }
            }));
          }
        },
        error: function error(_error7) {
          return Theme.handleError(_error7);
        },
        complete: function complete() {
          return currentTarget.removeClass('btn-loading');
        }
      });
    }).on('click', '[data-bb-toggle="add-to-cart"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var data = {
        id: currentTarget.data('id')
      };
      var quantity = currentTarget.closest('tr').find('input[name="qty"]');
      if (quantity) {
        data.qty = quantity.val();
      }
      $.ajax({
        url: currentTarget.data('url'),
        method: 'POST',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend() {
          return currentTarget.addClass('btn-loading');
        },
        success: function success(_ref11) {
          var error = _ref11.error,
            message = _ref11.message,
            data = _ref11.data;
          if (error) {
            Theme.showError(message);
            if (data.next_url !== undefined) {
              setTimeout(function () {
                window.location.href = data.next_url;
              }, 500);
            }
            return false;
          }
          if (data && data.next_url !== undefined) {
            window.location.href = data.next_url;
            return false;
          }
          var showSuccess = true;
          if (currentTarget.data('show-toast-on-success') !== undefined) {
            showSuccess = currentTarget.data('show-toast-on-success');
          }
          if (showSuccess) {
            Theme.showSuccess(message);
          }
          if (data.count !== undefined) {
            $('[data-bb-value="cart-count"]').text(data.count);
          }
          document.dispatchEvent(new CustomEvent('ecommerce.cart.added', {
            detail: {
              data: data,
              element: currentTarget
            }
          }));
        },
        error: function error(_error8) {
          return Theme.handleError(_error8);
        },
        complete: function complete() {
          return currentTarget.removeClass('btn-loading');
        }
      });
    }).on('click', '[data-bb-toggle="remove-from-cart"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      $.ajax({
        url: currentTarget.prop('href') || currentTarget.data('url'),
        method: 'GET',
        beforeSend: function beforeSend() {
          return currentTarget.addClass('btn-loading');
        },
        success: function success(_ref12) {
          var error = _ref12.error,
            message = _ref12.message,
            data = _ref12.data;
          if (error) {
            Theme.showError(message);
          } else {
            Theme.showSuccess(message);
            currentTarget.closest('tr').remove();
            if (data.count !== undefined) {
              $('[data-bb-value="cart-count"]').text(data.count);
            }
            if (data.count === 0) {
              window.location.reload();
            }
            document.dispatchEvent(new CustomEvent('ecommerce.cart.removed', {
              detail: {
                data: data,
                element: currentTarget
              }
            }));
          }
        },
        error: function error(_error9) {
          return Theme.handleError(_error9);
        },
        complete: function complete() {
          return currentTarget.removeClass('btn-loading');
        }
      });
    }).on('submit', '[data-bb-toggle="coupon-form"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var button = currentTarget.find('button[type="submit"]');
      $.ajax({
        url: currentTarget.prop('action'),
        type: 'POST',
        data: currentTarget.serialize(),
        beforeSend: function beforeSend() {
          return button.prop('disabled', true).addClass('btn-loading');
        },
        success: function success(_ref13) {
          var error = _ref13.error,
            message = _ref13.message,
            data = _ref13.data;
          if (error) {
            Theme.showError(message);
          } else {
            Theme.showSuccess(message);
            document.dispatchEvent(new CustomEvent('ecommerce.coupon.applied', {
              detail: {
                data: data,
                element: currentTarget
              }
            }));
          }
        },
        error: function error(_error10) {
          return Theme.handleError(_error10);
        },
        complete: function complete() {
          return button.prop('disabled', false).removeClass('btn-loading');
        }
      });
    }).on('click', '[data-bb-toggle="quick-view-product"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      $.ajax({
        url: currentTarget.data('url'),
        type: 'GET',
        beforeSend: function beforeSend() {
          return currentTarget.prop('disabled', true).addClass('btn-loading');
        },
        success: function success(_ref14) {
          var error = _ref14.error,
            message = _ref14.message,
            data = _ref14.data;
          if (error) {
            Theme.showError(message);
          } else {
            var quickViewModal = $('[data-bb-toggle="quick-view-modal"]');
            quickViewModal.modal('show');
            quickViewModal.find('.modal-body').html(data);
            document.dispatchEvent(new CustomEvent('ecommerce.quick-view.initialized', {
              detail: {
                data: data,
                element: currentTarget
              }
            }));
            setTimeout(function () {
              _this.initProductGallery(true);
            }, 100);
          }
        },
        error: function error(_error11) {
          return Theme.handleError(_error11);
        },
        complete: function complete() {
          return currentTarget.prop('disabled', false).removeClass('btn-loading');
        }
      });
    }).on('click', '[data-bb-toggle="product-form"] button[type="submit"]', function (e) {
      e.preventDefault();
      var currentTarget = $(e.currentTarget);
      var form = currentTarget.closest('form');
      var data = form.serializeArray();
      if (form.find('input[name="id"]').val() === '') {
        return;
      }
      data.push({
        name: 'checkout',
        value: currentTarget.prop('name') === 'checkout' ? 1 : 0
      });
      $.ajax({
        type: 'POST',
        url: form.prop('action'),
        data: data,
        beforeSend: function beforeSend() {
          currentTarget.prop('disabled', true).addClass('btn-loading');
        },
        success: function success(_ref15) {
          var error = _ref15.error,
            message = _ref15.message,
            data = _ref15.data;
          if (error) {
            Theme.showError(message);
            return;
          }
          Theme.showSuccess(message);
          form.find('input[name="qty"]').val(1);
          if (data.count !== undefined) {
            $('[data-bb-value="cart-count"]').text(data.count);
          }
          document.dispatchEvent(new CustomEvent('ecommerce.cart.added', {
            detail: {
              data: data,
              element: currentTarget
            }
          }));
        },
        error: function error(_error12) {
          return Theme.handleError(_error12);
        },
        complete: function complete() {
          return currentTarget.prop('disabled', false).removeClass('btn-loading');
        }
      });
    }).on('change', '[data-bb-toggle="product-form-filter-item"]', function (e) {
      var currentTarget = $(e.currentTarget);
      var $form = $('.bb-product-form-filter');
      var name = currentTarget.prop('name');
      var value = currentTarget.val();

      // Handle both array notation and comma-separated values
      if (name.endsWith('[]')) {
        var baseName = name.slice(0, -2);
        var $input = $form.find("input[name=\"".concat(baseName, "\"]"));

        // If we don't have a single input, create one
        if (!$input.length) {
          $form.append("<input type=\"hidden\" name=\"".concat(baseName, "\" value=\"\">"));
          $input = $form.find("input[name=\"".concat(baseName, "\"]"));
        }

        // Get current values as array and remove duplicates
        var currentValues = $input.val() ? $input.val().split(',') : [];

        // Use a Set to automatically remove duplicates
        var uniqueValues = new Set(currentValues);

        // Add the new value
        uniqueValues.add(value);

        // Convert back to array and set the comma-separated values
        $input.val(Array.from(uniqueValues).join(','));
      } else {
        // Regular input
        var _$input = $form.find("input[name=\"".concat(name, "\"]"));
        if (_$input.length) {
          _$input.val(value);
        }
      }
      $form.trigger('submit');
    });
    if ($('.bb-product-price-filter').length) {
      this.initPriceFilter();
    }
    _classPrivateFieldGet(_initCategoriesDropdown, this).call(this);
  }

  /**
   * @returns {boolean}
   */
  return _createClass(Ecommerce, [{
    key: "isRtl",
    value: function isRtl() {
      return document.body.getAttribute('dir') === 'rtl';
    }

    /**
     * @param {JQuery} element
     */
  }, {
    key: "initLightGallery",
    value: function initLightGallery(element) {
      if (!element.length) {
        return;
      }
      if (element.data('lightGallery')) {
        element.data('lightGallery').destroy(true);
      }
      element.lightGallery({
        selector: 'a',
        thumbnail: true,
        share: false,
        fullScreen: false,
        autoplay: false,
        autoplayControls: false,
        actualSize: false
      });
    }
  }, {
    key: "initProductGallery",
    value: function initProductGallery() {
      var _this2 = this;
      var onlyQuickView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!onlyQuickView) {
        var postMessageToPlayer = function postMessageToPlayer(player, command) {
          if (player == null || command == null) return;
          player.contentWindow.postMessage(JSON.stringify(command), '*');
        };
        var playPauseVideo = function playPauseVideo(slick, control) {
          var currentSlide, slideType, startTime, player, video;
          currentSlide = slick.find('.slick-current');
          slideType = currentSlide.data('provider');
          player = currentSlide.get(0);
          startTime = currentSlide.data('video-start');
          if (slideType === 'vimeo') {
            switch (control) {
              case 'play':
                if (startTime != null && startTime > 0 && !currentSlide.hasClass('started')) {
                  currentSlide.addClass('started');
                  postMessageToPlayer(player, {
                    method: 'setCurrentTime',
                    value: startTime
                  });
                }
                postMessageToPlayer(player, {
                  method: 'play',
                  value: 1
                });
                break;
              case 'pause':
                postMessageToPlayer(player, {
                  method: 'pause',
                  value: 1
                });
                break;
            }
          } else if (slideType === 'youtube') {
            switch (control) {
              case 'play':
                postMessageToPlayer(player, {
                  event: 'command',
                  func: 'mute'
                });
                postMessageToPlayer(player, {
                  event: 'command',
                  func: 'playVideo'
                });
                break;
              case 'pause':
                postMessageToPlayer(player, {
                  event: 'command',
                  func: 'pauseVideo'
                });
                break;
            }
          } else if (slideType === 'video') {
            video = currentSlide.children('video').get(0);
            if (video != null) {
              if (control === 'play') {
                video.play();
              } else {
                video.pause();
              }
            }
          }
        };
        var $gallery = $(document).find('.bb-product-gallery-images');
        if (!$gallery.length) {
          return;
        }
        var $thumbnails = $(document).find('.bb-product-gallery-thumbnails');
        $gallery.on('init', function (slick) {
          slick = $(slick.currentTarget);
          setTimeout(function () {
            playPauseVideo(slick, 'play');
          }, 1000);
        });
        $gallery.on('beforeChange', function (event, slick) {
          slick = $(slick.$slider);
          playPauseVideo(slick, 'pause');
        });
        $gallery.on('afterChange', function (event, slick) {
          slick = $(slick.$slider);
          playPauseVideo(slick, 'play');
        });
        $(document).on('click', '.bb-button-trigger-play-video', function (e) {
          var $button = $(e.currentTarget);
          var videoElement = document.getElementById($button.data('target'));
          videoElement.play();
          $button.closest('.bb-product-video').addClass('video-playing');
          videoElement.addEventListener('ended', function () {
            $button.closest('.bb-product-video').removeClass('video-playing');
            videoElement.currentTime = 0;
            videoElement.pause();
          });
        });
        if ($gallery.length) {
          $gallery.map(function (index, item) {
            var $item = $(item);
            if ($item.hasClass('slick-initialized')) {
              $item.slick('unslick');
            }
            $item.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: false,
              infinite: false,
              fade: true,
              lazyLoad: 'ondemand',
              asNavFor: '.bb-product-gallery-thumbnails',
              rtl: _this2.isRtl()
            });
          });
        }
        if ($thumbnails.length) {
          $thumbnails.slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: '.bb-product-gallery-images',
            focusOnSelect: true,
            infinite: false,
            rtl: this.isRtl(),
            vertical: $thumbnails.data('vertical') === 1,
            prevArrow: '<button class="slick-prev slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg></button>',
            nextArrow: '<button class="slick-next slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg></button>',
            responsive: [{
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
                vertical: false
              }
            }]
          });
        }
        this.initLightGallery($gallery);
        if (typeof Theme.lazyLoadInstance !== 'undefined') {
          Theme.lazyLoadInstance.update();
        }
      }
      var $quickViewGallery = $(document).find('.bb-quick-view-gallery-images');
      if ($quickViewGallery.length) {
        if ($quickViewGallery.hasClass('slick-initialized')) {
          $quickViewGallery.slick('unslick');
        }
        $quickViewGallery.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          adaptiveHeight: false,
          rtl: this.isRtl()
        });
      }
      this.initLightGallery($quickViewGallery);
    }
  }, {
    key: "initPriceFilter",
    value: function initPriceFilter() {
      if (typeof $.fn.slider === 'undefined') {
        throw new Error('jQuery UI slider is required for price filter');
      }
      var $priceFilter = $(document).find('.bb-product-price-filter');
      var $sliderRange = $priceFilter.find('.price-slider');
      var $rangeLabel = $priceFilter.find('.input-range-label');
      if ($priceFilter) {
        var $minPrice = $priceFilter.find('input[name="min_price"]');
        var $maxPrice = $priceFilter.find('input[name="max_price"]');
        var minPriceValue = $minPrice.val() || $sliderRange.data('min');
        var maxPriceValue = $maxPrice.val() || $sliderRange.data('max');
        $sliderRange.slider({
          range: true,
          min: $sliderRange.data('min'),
          max: $sliderRange.data('max'),
          values: [minPriceValue, maxPriceValue],
          slide: function slide(event, ui) {
            $rangeLabel.find('.from').text(EcommerceApp.formatPrice(ui.values[0]));
            $rangeLabel.find('.to').text(EcommerceApp.formatPrice(ui.values[1]));
          },
          change: function change(event, ui) {
            if (parseInt(minPriceValue) !== ui.values[0]) {
              $minPrice.val(ui.values[0]).trigger('change');
            }
            if (parseInt(maxPriceValue) !== ui.values[1]) {
              $maxPrice.val(ui.values[1]).trigger('change');
            }
          }
        });
        $rangeLabel.find('.from').text(this.formatPrice($sliderRange.slider('values', 0)));
        $rangeLabel.find('.to').text(this.formatPrice($sliderRange.slider('values', 1)));
      }
    }
  }, {
    key: "formatPrice",
    value: function formatPrice(price, numberAfterDot, x) {
      var currencies = window.currencies || {};
      if (!numberAfterDot) {
        numberAfterDot = currencies.number_after_dot !== undefined ? currencies.number_after_dot : 2;
      }
      var regex = '\\d(?=(\\d{' + (x || 3) + '})+$)';
      var priceUnit = '';
      if (currencies.show_symbol_or_title) {
        priceUnit = currencies.symbol || currencies.title || '';
      }
      if (currencies.display_big_money) {
        var label = '';
        if (price >= 1000000 && price < 1000000000) {
          price = price / 1000000;
          label = currencies.million;
        } else if (price >= 1000000000) {
          price = price / 1000000000;
          label = currencies.billion;
        }
        priceUnit = label + (priceUnit ? " ".concat(priceUnit) : '');
      }
      price = price.toFixed(Math.max(0, ~~numberAfterDot)).toString().split('.');
      price = price[0].toString().replace(new RegExp(regex, 'g'), "$&".concat(currencies.thousands_separator)) + (price[1] ? currencies.decimal_separator + price[1] : '');
      if (currencies.show_symbol_or_title) {
        price = currencies.is_prefix_symbol ? priceUnit + price : price + priceUnit;
      }
      return price;
    }
  }]);
}();
$(function () {
  window.EcommerceApp = new Ecommerce();
  EcommerceApp.productQuantityToggle();
  EcommerceApp.initProductGallery();
  EcommerceApp.onChangeProductAttribute();
  if ($('.bb-product-price-filter').length) {
    EcommerceApp.initPriceFilter();
  }
  document.addEventListener('ecommerce.quick-shop.completed', function () {
    EcommerceApp.productQuantityToggle();
  });
  document.addEventListener('ecommerce.cart.quantity.change', function (e) {
    var element = e.detail.element;
    EcommerceApp.handleUpdateCart(element);
  });
  document.addEventListener('ecommerce.product-filter.before', function () {
    var $wrapper = $('[data-bb-toggle="product-list"]').find('.bb-product-items-wrapper');
    if ($wrapper.length) {
      $wrapper.append('<div class="loading-spinner"></div>');
    }
  });
  document.addEventListener('ecommerce.product-filter.success', function (e) {
    var data = e.detail.data;
    var $productItemsWrapper = $('.bb-product-items-wrapper');
    if ($productItemsWrapper.length) {
      $productItemsWrapper.html(data.data);
    }
    if (data.additional) {
      var $defaultSidebar = $('.bb-shop-sidebar');
      var $sidebar = $('[data-bb-filter-sidebar]');
      if (!$sidebar.length) {
        $sidebar = $defaultSidebar;
      }

      // Store the current active filter link before replacing the sidebar
      var activeFilterLinks = {};
      $('.bb-product-filter-link.active').each(function () {
        var filterGroup = $(this).closest('.bb-product-filter').data('filter-group');
        if (filterGroup) {
          activeFilterLinks[filterGroup] = $(this).data('id');
        }
      });
      $sidebar.replaceWith(data.additional.filters_html);

      // Restore active state for filter links after sidebar is replaced
      Object.keys(activeFilterLinks).forEach(function (group) {
        var id = activeFilterLinks[group];
        $(".bb-product-filter[data-filter-group=\"".concat(group, "\"] .bb-product-filter-link[data-id=\"").concat(id, "\"]")).addClass('active');
      });
    }
    if ($(document).find('.bb-product-price-filter').length) {
      EcommerceApp.initPriceFilter();
    }
    if ($productItemsWrapper.length) {
      $('html, body').animate({
        scrollTop: $productItemsWrapper.offset().top - 120
      });
    }
    var $wrapper = $('[data-bb-toggle="product-list"]').find('.bb-product-items-wrapper');
    if ($wrapper.length) {
      $wrapper.find('.loading-spinner').remove();
    }
  });
  document.addEventListener('ecommerce.product-filter.completed', function () {
    if (typeof Theme.lazyLoadInstance !== 'undefined') {
      Theme.lazyLoadInstance.update();
    }
  });
});
/******/ })()
;