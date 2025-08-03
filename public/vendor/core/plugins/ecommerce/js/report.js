/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _Vue = Vue,
  nextTick = _Vue.nextTick;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    data: {
      type: Array,
      "default": function _default() {
        return [];
      },
      required: true
    }
  },
  data: function data() {
    return {
      chartData: this.data,
      chartInstance: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.renderChart();
    $event.on('revenue-chart:reload', function (data) {
      _this.chartData = data;
      _this.renderChart();
    });
  },
  methods: {
    renderChart: function renderChart() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var series, colors, labels, total;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_this2.chartData.length) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              series = [];
              colors = [];
              labels = [];
              total = 0;
              _this2.chartData.map(function (x) {
                total += parseFloat(x.value);
                labels.push(x.label);
                colors.push(x.color);
              });
              if (total === 0) {
                _this2.chartData.map(function () {
                  series.push(0);
                });
              } else {
                _this2.chartData.map(function (x) {
                  series.push(100 / total * parseFloat(x.value));
                });
              }
              if (_this2.chartInstance === null) {
                _this2.chartInstance = new ApexCharts(_this2.$refs.chartRef, {
                  series: series,
                  colors: colors,
                  chart: {
                    height: '250',
                    type: 'donut'
                  },
                  chartOptions: {
                    labels: labels
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '71%',
                        polygons: {
                          strokeWidth: 0
                        }
                      },
                      expandOnClick: true
                    }
                  },
                  states: {
                    hover: {
                      filter: {
                        type: 'darken',
                        value: 0.9
                      }
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  legend: {
                    show: false
                  },
                  tooltip: {
                    enabled: false
                  }
                });
                _this2.chartInstance.render();
              } else {
                _this2.chartInstance.updateOptions({
                  series: series,
                  colors: colors,
                  chartOptions: {
                    labels: labels
                  }
                });
              }
              if (jQuery && jQuery().tooltip) {
                $('[data-bs-toggle="tooltip"]').tooltip({
                  placement: 'top',
                  boundary: 'window'
                });
              }
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    url: {
      type: String,
      "default": null,
      required: true
    },
    date_from: {
      type: String,
      "default": null,
      required: true
    },
    date_to: {
      type: String,
      "default": null,
      required: true
    },
    format: {
      type: String,
      "default": 'dd/MM/yy',
      required: false
    },
    filters: {
      type: Array,
      "default": function _default() {
        return [];
      },
      required: false
    },
    filterDefault: {
      type: String,
      "default": '',
      required: false
    }
  },
  data: function data() {
    return {
      isLoading: true,
      earningSales: [],
      colors: ['#fe0000', '#fe0000'],
      chart: null,
      filtering: '',
      chartFromDate: null,
      chartToDate: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.setFiltering();
    this.chartFromDate = this.date_from;
    this.chartToDate = this.date_to;
    this.renderChart();
    $event.on('sales-report-chart:reload', function (data) {
      _this.chartFromDate = data.date_from;
      _this.chartToDate = data.date_to;
      _this.renderChart();
    });
  },
  methods: {
    setFiltering: function setFiltering() {
      var f = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (!f) {
        f = this.filterDefault;
      }
      if (this.filters.length) {
        var filter = this.filters.find(function (x) {
          return x.key == f;
        });
        if (filter) {
          this.filtering = filter.text;
        } else {
          this.filtering = f;
        }
      }
    },
    renderChart: function renderChart() {
      var _this2 = this;
      if (this.url) {
        axios.get(this.url + '?date_from=' + this.chartFromDate + '&date_to=' + this.chartToDate).then(function (res) {
          if (res.data.error) {
            Botble.showError(res.data.message);
          } else {
            _this2.earningSales = res.data.data.earningSales;
            var series = res.data.data.series;
            var colors = res.data.data.colors;
            var categories = res.data.data.dates;
            if (_this2.chart === null) {
              _this2.chart = new ApexCharts(_this2.$el.querySelector('.sales-reports-chart'), {
                series: series,
                chart: {
                  height: 350,
                  type: 'area',
                  toolbar: {
                    show: false
                  }
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },
                colors: colors,
                xaxis: {
                  type: 'datetime',
                  categories: categories
                },
                tooltip: {
                  x: {
                    format: _this2.format
                  }
                },
                noData: {
                  text: BotbleVariables.languages.tables.no_data
                }
              });
              _this2.chart.render();
            } else {
              _this2.chart.updateOptions({
                series: series,
                colors: colors,
                xaxis: {
                  type: 'datetime',
                  categories: categories
                }
              });
            }
          }
        });
      }
    },
    clickFilter: function clickFilter(filter, event) {
      var _this3 = this;
      event.preventDefault();
      this.setFiltering('...');
      var that = this;
      axios.get(that.url + '?date_from=' + this.chartFromDate + '&date_to=' + this.chartToDate, {
        params: {
          filter: filter
        }
      }).then(function (res) {
        if (res.data.error) {
          Botble.showError(res.data.message);
        } else {
          that.earningSales = res.data.data.earningSales;
          var options = {
            xaxis: {
              type: 'datetime',
              categories: res.data.data.dates
            },
            series: res.data.data.series
          };
          if (res.data.data.colors) {
            options.colors = res.data.data.colors;
          }
          _this3.chart.updateOptions(options);
        }
        _this3.setFiltering(filter);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=template&id=54809eeb":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=template&id=54809eeb ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var _hoisted_1 = {
  ref: "chartRef",
  "class": "revenue-chart"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, null, 512 /* NEED_PATCH */)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=template&id=33d4b412":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=template&id=33d4b412 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var _hoisted_1 = {
  key: 0,
  "class": "btn-group d-block text-end"
};
var _hoisted_2 = {
  "class": "btn btn-sm btn-secondary",
  href: "javascript:",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
};
var _hoisted_3 = {
  "class": "dropdown-menu float-end"
};
var _hoisted_4 = ["onClick"];
var _hoisted_5 = {
  key: 1,
  "class": "row px-3"
};
var _hoisted_6 = {
  "class": "col-12"
};
var _hoisted_7 = {
  "class": "list-unstyled"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [$props.filters.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_2, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fa fa-filter",
    "aria-hidden": "true"
  }, null, -1 /* HOISTED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.filtering), 1 /* TEXT */), _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fa fa-angle-down"
  }, null, -1 /* HOISTED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_3, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.filters, function (filter) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: filter.key
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: "#",
      onClick: function onClick($event) {
        return $options.clickFilter(filter.key, $event);
      }
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(filter.text), 9 /* TEXT, PROPS */, _hoisted_4)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "sales-reports-chart"
  }, null, -1 /* HOISTED */)), _ctx.earningSales.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.earningSales, function (earningSale) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: earningSale.text
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": "icon ti ti-circle-filled",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        color: earningSale.color
      })
    }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(earningSale.text), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "loading"
  }, null, -1 /* HOISTED */))]);
}

/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue":
/*!************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RevenueChart_vue_vue_type_template_id_54809eeb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RevenueChart.vue?vue&type=template&id=54809eeb */ "./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=template&id=54809eeb");
/* harmony import */ var _RevenueChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RevenueChart.vue?vue&type=script&lang=js */ "./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_RevenueChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_RevenueChart_vue_vue_type_template_id_54809eeb__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=script&lang=js":
/*!************************************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevenueChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevenueChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RevenueChart.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=template&id=54809eeb":
/*!******************************************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=template&id=54809eeb ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevenueChart_vue_vue_type_template_id_54809eeb__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevenueChart_vue_vue_type_template_id_54809eeb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RevenueChart.vue?vue&type=template&id=54809eeb */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue?vue&type=template&id=54809eeb");


/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue":
/*!*****************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SalesReportsChart_vue_vue_type_template_id_33d4b412__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalesReportsChart.vue?vue&type=template&id=33d4b412 */ "./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=template&id=33d4b412");
/* harmony import */ var _SalesReportsChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SalesReportsChart.vue?vue&type=script&lang=js */ "./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_SalesReportsChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SalesReportsChart_vue_vue_type_template_id_33d4b412__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SalesReportsChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SalesReportsChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SalesReportsChart.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=template&id=33d4b412":
/*!***********************************************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=template&id=33d4b412 ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SalesReportsChart_vue_vue_type_template_id_33d4b412__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SalesReportsChart_vue_vue_type_template_id_33d4b412__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SalesReportsChart.vue?vue&type=template&id=33d4b412 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue?vue&type=template&id=33d4b412");


/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/***/ ((module) => {

module.exports = Vue;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!******************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/report.js ***!
  \******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_SalesReportsChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/SalesReportsChart */ "./platform/plugins/ecommerce/resources/assets/js/components/SalesReportsChart.vue");
/* harmony import */ var _components_RevenueChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/RevenueChart */ "./platform/plugins/ecommerce/resources/assets/js/components/RevenueChart.vue");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


if (typeof vueApp !== 'undefined') {
  vueApp.booting(function (vue) {
    vue.component('sales-reports-chart', _components_SalesReportsChart__WEBPACK_IMPORTED_MODULE_0__["default"]);
    vue.component('revenue-chart', _components_RevenueChart__WEBPACK_IMPORTED_MODULE_1__["default"]);
  });
}
$(function () {
  if (!window.moment || !jQuery().daterangepicker) {
    return;
  }
  moment.locale($('html').attr('lang'));
  var $dateRange = $(document).find('.date-range-picker');
  var dateFormat = $dateRange.data('format') || 'YYYY-MM-DD';
  var startDate = $dateRange.data('start-date') || moment().subtract(29, 'days');
  var today = moment();
  var endDate = moment().endOf('month');
  if (endDate > today) {
    endDate = today;
  }
  var rangesTrans = BotbleVariables.languages.reports;
  var ranges = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, rangesTrans.today, [today, today]), rangesTrans.this_week, [moment().startOf('week'), today]), rangesTrans.last_7_days, [moment().subtract(6, 'days'), today]), rangesTrans.last_30_days, [moment().subtract(29, 'days'), today]), rangesTrans.this_month, [moment().startOf('month'), endDate]), rangesTrans.this_year, [moment().startOf('year'), moment().endOf('year')]);
  $dateRange.daterangepicker({
    ranges: ranges,
    alwaysShowCalendars: true,
    startDate: startDate,
    endDate: endDate,
    maxDate: endDate,
    opens: 'left',
    drops: 'auto',
    locale: {
      format: dateFormat
    },
    autoUpdateInput: false
  }, function (start, end, label) {
    $.ajax({
      url: $dateRange.data('href'),
      data: {
        date_from: start.format('YYYY-MM-DD'),
        date_to: end.format('YYYY-MM-DD'),
        predefined_range: label
      },
      type: 'GET',
      success: function success(data) {
        if (data.error) {
          Botble.showError(data.message);
        } else {
          if (!$('#report-stats-content').length) {
            var newUrl = new URL(window.location.href);
            newUrl.searchParams.set('date_from', start.format('YYYY-MM-DD'));
            newUrl.searchParams.set('date_to', end.format('YYYY-MM-DD'));
            history.pushState({
              urlPath: newUrl.href
            }, '', newUrl.href);
            window.location.reload();
          } else {
            $('.widget-item').each(function (key, widget) {
              var widgetEl = $(widget).prop('id');
              $("#".concat(widgetEl)).replaceWith($(data.data).find("#".concat(widgetEl)));
            });
          }
          if (window.LaravelDataTables) {
            Object.keys(window.LaravelDataTables).map(function (key) {
              var table = window.LaravelDataTables[key];
              var url = new URL(table.ajax.url());
              url.searchParams.set('date_from', start.format('YYYY-MM-DD'));
              url.searchParams.set('date_to', end.format('YYYY-MM-DD'));
              table.ajax.url(url.href).load();
            });
          }
        }
      },
      error: function error(data) {
        Botble.handleError(data);
      }
    });
  });
  $dateRange.on('apply.daterangepicker', function (ev, picker) {
    var $this = $(this);
    var formatValue = $this.data('format-value');
    if (!formatValue) {
      formatValue = '__from__ - __to__';
    }
    var value = formatValue.replace('__from__', picker.startDate.format(dateFormat)).replace('__to__', picker.endDate.format(dateFormat));
    $this.find('span').text(value);
  });
});
})();

/******/ })()
;