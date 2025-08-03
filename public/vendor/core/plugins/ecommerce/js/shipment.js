/******/ (() => { // webpackBootstrap
/*!********************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/shipment.js ***!
  \********************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ShipmentManagement = /*#__PURE__*/function () {
  function ShipmentManagement() {
    _classCallCheck(this, ShipmentManagement);
  }
  return _createClass(ShipmentManagement, [{
    key: "init",
    value: function init() {
      $(document).on('click', '[data-bb-toggle="update-shipping-status"]', function () {
        $('#update-shipping-status-modal').modal('show');
      });
      $(document).on('click', '[data-bb-toggle="update-shipping-cod-status"]', function () {
        $('#update-shipping-cod-status-modal').modal('show');
      });
      $(document).on('click', '#confirm-update-shipping-status-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var form = _self.closest('.modal-dialog').find('form');
        $httpClient.make().withButtonLoading(_self).post(form.prop('action'), form.serialize()).then(function (_ref) {
          var data = _ref.data;
          if (!data.error) {
            $('.page-body').load("".concat(window.location.href, " .page-body > *"));
            Botble.showSuccess(data.message);
            _self.closest('.modal').modal('hide');
          } else {
            Botble.showError(data.message);
          }
        });
      });
    }
  }]);
}();
$(function () {
  new ShipmentManagement().init();
});
/******/ })()
;