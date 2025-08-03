/******/ (() => { // webpackBootstrap
/*!*************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/store-locator.js ***!
  \*************************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var StoreLocatorManagement = /*#__PURE__*/function () {
  function StoreLocatorManagement() {
    _classCallCheck(this, StoreLocatorManagement);
  }
  return _createClass(StoreLocatorManagement, [{
    key: "init",
    value: function init() {
      $(document).on('click', '[data-bb-toggle="store-locator-show"]', function (event) {
        event.preventDefault();
        var $button = $(event.currentTarget);
        var $modalBody;
        if ($button.data('type') === 'update') {
          $modalBody = $('#update-store-locator-modal .modal-body');
        } else {
          $modalBody = $('#add-store-locator-modal .modal-body');
        }
        $modalBody.html('');
        $httpClient.make().get($button.data('load-form')).then(function (_ref) {
          var data = _ref.data;
          $modalBody.html(data.data);
          Botble.initResources();
          $modalBody.closest('.modal.fade').modal('show');
        });
      });
      var createOrUpdateStoreLocator = function createOrUpdateStoreLocator($button) {
        var $form = $button.closest('.modal-content').find('form');
        $httpClient.make().withButtonLoading($button).post($form.prop('action'), $form.serialize()).then(function (_ref2) {
          var data = _ref2.data;
          Botble.showSuccess(data.message);
          $('.store-locator-table').load("".concat(window.location.href, " .store-locator-table > *"));
          $button.closest('.modal.fade').modal('hide');
        });
      };
      $('#add-store-locator-modal').on('click', 'button[type="submit"]', function (event) {
        event.preventDefault();
        createOrUpdateStoreLocator($(event.currentTarget));
      });
      $('#update-store-locator-modal').on('click', 'button[type="submit"]', function (event) {
        event.preventDefault();
        createOrUpdateStoreLocator($(event.currentTarget));
      });
      $(document).on('click', '.btn-trigger-delete-store-locator', function (event) {
        event.preventDefault();
        $('#delete-store-locator-button').data('target', $(event.currentTarget).data('target'));
        $('#delete-store-locator-modal').modal('show');
      });
      $(document).on('click', '#delete-store-locator-button', function (event) {
        event.preventDefault();
        var $button = $(event.currentTarget);
        $httpClient.make().withButtonLoading($button).post($button.data('target')).then(function (_ref3) {
          var data = _ref3.data;
          Botble.showSuccess(data.message);
          $('.store-locator-table').load("".concat(window.location.href, " .store-locator-table > *"));
          $button.removeClass('button-loading');
          $button.closest('.modal.fade').modal('hide');
        });
      });
      $(document).on('click', '#change-primary-store-locator-button', function (event) {
        event.preventDefault();
        var $button = $(event.currentTarget);
        var $form = $button.closest('.modal-content').find('form');
        $httpClient.make().withButtonLoading($button).post($form.prop('action'), $form.serialize()).then(function (_ref4) {
          var data = _ref4.data;
          Botble.showSuccess(data.message);
          $('.store-locator-table').load("".concat(window.location.href, " .store-locator-table > *"));
          $button.removeClass('button-loading');
          $button.closest('.modal.fade').modal('hide');
        });
      });
    }
  }]);
}();
$(function () {
  new StoreLocatorManagement().init();
});
/******/ })()
;