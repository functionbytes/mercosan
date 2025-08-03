/******/ (() => { // webpackBootstrap
/*!********************************************************************!*\
  !*** ./platform/packages/plugin-management/resources/js/plugin.js ***!
  \********************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PluginManagement = /*#__PURE__*/function () {
  function PluginManagement() {
    _classCallCheck(this, PluginManagement);
  }
  return _createClass(PluginManagement, [{
    key: "init",
    value: function init() {
      var _this = this;
      $(document).on('click', '.btn-trigger-remove-plugin', function (event) {
        event.preventDefault();
        $('#confirm-remove-plugin-button').data('url', $(event.currentTarget).data('url'));
        $('#remove-plugin-modal').modal('show');
      });
      $(document).on('click', '#confirm-remove-plugin-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self)["delete"](_self.data('url')).then(function (_ref) {
          var data = _ref.data;
          Botble.showSuccess(data.message);
          window.location.reload();
        })["finally"](function () {
          return $('#remove-plugin-modal').modal('hide');
        });
      });
      $(document).on('click', '.btn-trigger-update-plugin', function (event) {
        event.preventDefault();
        var currentTarget = $(event.currentTarget);
        var url = currentTarget.data('update-url');
        currentTarget.prop('disabled', true);
        $httpClient.make().withButtonLoading(currentTarget).post(url).then(function (_ref2) {
          var data = _ref2.data;
          Botble.showSuccess(data.message);
          setTimeout(function () {
            return window.location.reload();
          }, 2000);
        })["finally"](function () {
          return currentTarget.prop('disabled', false);
        });
      });
      $(document).on('click', '.btn-trigger-change-status', /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
          var _self, pluginName, changeStatusUrl;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                _self = $(event.currentTarget);
                pluginName = _self.data('plugin');
                changeStatusUrl = _self.data('change-status-url');
                if (!(_self.data('status') === 1)) {
                  _context.next = 10;
                  break;
                }
                Botble.showButtonLoading(_self);
                _context.next = 8;
                return _this.activateOrDeactivatePlugin(changeStatusUrl);
              case 8:
                Botble.hideButtonLoading(_self);
                return _context.abrupt("return");
              case 10:
                $httpClient.makeWithoutErrorHandler().withButtonLoading(_self).post(_self.data('check-requirement-url')).then(function () {
                  return _this.activateOrDeactivatePlugin(changeStatusUrl);
                })["catch"](function (e) {
                  var _e$response$data = e.response.data,
                    data = _e$response$data.data,
                    message = _e$response$data.message;
                  if (data && data.existing_plugins_on_marketplace) {
                    var $modal = $('#confirm-install-plugin-modal');
                    $modal.find('.modal-body #requirement-message').html(message);
                    $modal.find('input[name="plugin_name"]').val(pluginName);
                    $modal.find('input[name="ids"]').val(data.existing_plugins_on_marketplace);
                    $modal.modal('show');
                    return;
                  }
                  Botble.showError(message);
                });
              case 11:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
      if ($('button[data-check-update]').length) {
        this.checkUpdate();
      }
      this.handleFilters();
    }
  }, {
    key: "handleFilters",
    value: function handleFilters() {
      var search = $('[data-bb-toggle="change-search"]').val().toLowerCase();
      var status = $('[data-bb-toggle="change-filter-plugin-status"]:checked').val();
      $('button[data-bb-toggle="change-filter-plugin-status"]').each(function (index, element) {
        var status = $(element).data('value') || $(element).val();
        var $visiblePluginItems = status === 'all' ? $('.plugin-item:visible') : $(".plugin-item[data-status=\"".concat(status, "\"]:visible"));
        $("[data-bb-toggle=\"plugins-count\"][data-status=\"".concat(status, "\"]")).text($visiblePluginItems.length);
      });
      var applyFilters = function applyFilters() {
        var $pluginItems = $('.plugin-item');
        $pluginItems.each(function (index, element) {
          var $element = $(element);
          var name = $element.data('name').toLowerCase();
          var description = $element.data('description').toLowerCase();
          var author = $element.data('author').toLowerCase();
          var nameMatch = name.includes(search);
          var authorMatch = author.includes(search);
          var descriptionMatch = description.includes(search);
          var statusMatch = status === 'all' || $element.data('status') === status || status === 'updates-available' && $element.data('available-for-updates');
          if ((nameMatch || descriptionMatch || authorMatch) && statusMatch) {
            $element.show();
          } else {
            $element.hide();
          }
        });
        var $visiblePluginItems = $('.plugin-item:visible');
        if ($visiblePluginItems.length === 0) {
          $('.empty').show();
        } else {
          $('.empty').hide();
        }
      };
      $(document).on('keyup', '[data-bb-toggle="change-search"]', function (event) {
        event.preventDefault();
        search = $(event.currentTarget).val().toLowerCase();
        applyFilters();
      });
      $(document).on('change', 'input[data-bb-toggle="change-filter-plugin-status"]', function (event) {
        status = $(event.currentTarget).val();
        applyFilters();
      });
      $(document).on('click', 'button[data-bb-toggle="change-filter-plugin-status"]', function (event) {
        var newValue = $(event.target).data('value');
        $('[data-bb-toggle="status-filter-label"]').text($(event.target).text());
        $('.dropdown-item').removeClass('active');
        $(event.target).addClass('active');
        status = newValue;
        applyFilters();
      });
    }
  }, {
    key: "checkUpdate",
    value: function checkUpdate() {
      $httpClient.make().post($('button[data-check-update]').data('check-update-url')).then(function (_ref4) {
        var data = _ref4.data;
        if (!data.data) {
          return;
        }
        Object.keys(data.data).forEach(function (key) {
          var plugin = data.data[key];
          var $button = $("button[data-check-update=\"".concat(plugin.name, "\"]"));
          var url = $button.data('update-url').replace('__id__', plugin.id);
          $button.data('update-url', url).show();
          var $parent = $button.closest('.plugin-item');
          $parent.data('available-for-updates', true).trigger('change');
          $('[data-bb-toggle="plugins-count"][data-status="updates-available"]').text(data.data.length);
        });
      });
    }
  }, {
    key: "activateOrDeactivatePlugin",
    value: function () {
      var _activateOrDeactivatePlugin = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url) {
        var reload,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              reload = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
              return _context2.abrupt("return", $httpClient.make().put(url).then(function (_ref5) {
                var data = _ref5.data;
                Botble.showSuccess(data.message);
                if (reload) {
                  window.location.reload();
                }
              }));
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function activateOrDeactivatePlugin(_x2) {
        return _activateOrDeactivatePlugin.apply(this, arguments);
      }
      return activateOrDeactivatePlugin;
    }()
  }]);
}();
$(function () {
  new PluginManagement().init();
});
/******/ })()
;