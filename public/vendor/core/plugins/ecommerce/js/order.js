/******/ (() => { // webpackBootstrap
/*!*****************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/order.js ***!
  \*****************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var OrderAdminManagement = /*#__PURE__*/function () {
  function OrderAdminManagement() {
    _classCallCheck(this, OrderAdminManagement);
  }
  return _createClass(OrderAdminManagement, [{
    key: "init",
    value: function init() {
      $(document).on('click', '.btn-confirm-order', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.closest('form').prop('action'), _self.closest('form').serialize()).then(function (_ref) {
          var data = _ref.data;
          if (!data.error) {
            $('#main-order-content').load("".concat(window.location.href, " #main-order-content > *"));
            _self.closest('div').remove();
            Botble.showSuccess(data.message);
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '.btn-trigger-resend-order-confirmation-modal', function (event) {
        event.preventDefault();
        $('#confirm-resend-confirmation-email-button').data('action', $(event.currentTarget).data('action'));
        $('#resend-order-confirmation-email-modal').modal('show');
      });
      $(document).on('click', '#confirm-resend-confirmation-email-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.data('action')).then(function (_ref2) {
          var data = _ref2.data;
          if (!data.error) {
            Botble.showSuccess(data.message);
          } else {
            Botble.showError(data.message);
          }
          $('#resend-order-confirmation-email-modal').modal('hide');
        });
      });
      $(document).on('click', '.btn-trigger-shipment', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var $formBody = $('.shipment-create-wrap');
        $formBody.slideToggle();
        if (!$formBody.hasClass('shipment-data-loaded')) {
          Botble.showLoading($formBody);
          $httpClient.make().get(_self.data('target')).then(function (_ref3) {
            var data = _ref3.data;
            if (data.error) {
              Botble.showError(data.message);
            } else {
              $formBody.html(data.data);
              $formBody.addClass('shipment-data-loaded');
              Botble.initResources();
            }
            Botble.hideLoading($formBody);
          });
        }
      });
      $(document).on('change', '#store_id', function (event) {
        var $formBody = $('.shipment-create-wrap');
        Botble.showLoading($formBody);
        $('#select-shipping-provider').load("".concat($('.btn-trigger-shipment').data('target'), "?view=true&store_id=").concat($(event.currentTarget).val(), " #select-shipping-provider > *"), function () {
          Botble.hideLoading($formBody);
          Botble.initResources();
        });
      });
      $(document).on('change', '.shipment-form-weight', function (event) {
        var $formBody = $('.shipment-create-wrap');
        Botble.showLoading($formBody);
        $('#select-shipping-provider').load("".concat($('.btn-trigger-shipment').data('target'), "?view=true&store_id=").concat($('#store_id').val(), "&weight=").concat($(event.currentTarget).val(), " #select-shipping-provider > *"), function () {
          Botble.hideLoading($formBody);
          Botble.initResources();
        });
      });
      $(document).on('click', '.table-shipping-select-options .clickable-row', function (event) {
        var _self = $(event.currentTarget);
        $('.input-hidden-shipping-method').val(_self.data('key'));
        $('.input-hidden-shipping-option').val(_self.data('option'));
        $('.input-show-shipping-method').val(_self.find('span.name').text());
      });
      $(document).on('click', '.btn-create-shipment', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.closest('form').prop('action'), _self.closest('form').serialize()).then(function (_ref4) {
          var data = _ref4.data;
          if (!data.error) {
            Botble.showSuccess(data.message);
            $('#main-order-content').load("".concat(window.location.href, " #main-order-content > *"));
            $('.btn-trigger-shipment').remove();
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '.btn-cancel-shipment', function (event) {
        event.preventDefault();
        $('#confirm-cancel-shipment-button').data('action', $(event.currentTarget).data('action'));
        $('#cancel-shipment-modal').modal('show');
      });
      $(document).on('click', '#confirm-cancel-shipment-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.data('action')).then(function (_ref5) {
          var data = _ref5.data;
          if (!data.error) {
            Botble.showSuccess(data.message);
            $('.carrier-status').addClass("carrier-status-".concat(data.data.status)).text(data.data.status_text);
            $('#cancel-shipment-modal').modal('hide');
            $('#order-history-wrapper').load("".concat(window.location.href, " #order-history-wrapper > *"));
            $('.shipment-actions-wrapper').remove();
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '.btn-close-shipment-panel', function (event) {
        event.preventDefault();
        $('.shipment-create-wrap').slideUp();
      });
      $(document).on('click', '.btn-trigger-update-shipping-address', function (event) {
        event.preventDefault();
        $('#update-shipping-address-modal').modal('show');
      });
      $(document).on('click', '.btn-trigger-update-tax-information', function (event) {
        event.preventDefault();
        $('#update-tax-information-modal').modal('show');
      });
      $(document).on('click', '#confirm-update-shipping-address-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var form = _self.closest('.modal-content').find('form');
        $httpClient.make().withLoading(form.find('.shipment-create-wrap')).withButtonLoading(_self).post(form.prop('action'), form.serialize()).then(function (_ref6) {
          var data = _ref6.data;
          if (!data.error) {
            Botble.showSuccess(data.message);
            $('#update-shipping-address-modal').modal('hide');
            $('.shipment-address-box-1').html(data.data.line);
            $('.shipping-address-info').html(data.data.detail);
            $('#select-shipping-provider').load("".concat($('.btn-trigger-shipment').data('target'), "?view=true #select-shipping-provider > *"), function () {
              Botble.initResources();
            });
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '#confirm-update-tax-information-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var form = _self.closest('.modal-content').find('form');
        $httpClient.make().withButtonLoading(_self).post(form.prop('action'), form.serialize()).then(function (_ref7) {
          var data = _ref7.data;
          if (data.error) {
            Botble.showError(data.message);
            return;
          }
          $('.text-infor-subdued.tax-info').html(data.data);
          $('#update-tax-information-modal').modal('hide');
          Botble.showSuccess(data.message);
        });
      });
      $(document).on('click', '.btn-update-order', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.closest('form').prop('action'), _self.closest('form').serialize()).then(function (_ref8) {
          var data = _ref8.data;
          if (!data.error) {
            Botble.showSuccess(data.message);
          } else {
            Botble.showError(data.message);
          }
          if (_self.closest('.modal')) {
            _self.closest('.modal').modal('hide');
            $('.page-body').load("".concat(window.location.href, " .page-body > *"));
          }
        });
      });
      $(document).on('click', '.btn-trigger-cancel-order', function (event) {
        event.preventDefault();
        $('#confirm-cancel-order-button').data('target', $(event.currentTarget).data('target'));
        $('#cancel-order-modal').modal('show');
      });
      $(document).on('click', '#confirm-cancel-order-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.data('target')).then(function (_ref9) {
          var data = _ref9.data;
          if (!data.error) {
            Botble.showSuccess(data.message);
            $('#main-order-content').load("".concat(window.location.href, " #main-order-content > *"));
            $('#cancel-order-modal').modal('hide');
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '.btn-trigger-confirm-payment', function (event) {
        event.preventDefault();
        $('#confirm-payment-order-button').data('target', $(event.currentTarget).data('target'));
        $('#confirm-payment-modal').modal('show');
      });
      $(document).on('click', '#confirm-payment-order-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.data('target')).then(function (_ref10) {
          var data = _ref10.data;
          if (!data.error) {
            Botble.showSuccess(data.message);
            $('#main-order-content').load("".concat(window.location.href, " #main-order-content > *"));
            $('#confirm-payment-modal').modal('hide');
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '.show-timeline-dropdown', function (event) {
        event.preventDefault();
        $($(event.currentTarget).data('target')).slideToggle();
      });
      $(document).on('keyup', '.input-sync-item', function (event) {
        var number = $(event.currentTarget).val();
        if (!number || isNaN(number)) {
          number = 0;
        }
        $(event.currentTarget).closest('body').find($(event.currentTarget).data('target')).text(Botble.numberFormat(parseFloat(number), 2));
      });
      $(document).on('click', '.btn-trigger-refund', function (event) {
        event.preventDefault();
        $('#confirm-refund-modal').modal('show');
      });
      $(document).on('change', '.j-refund-quantity', function () {
        var total_restock_items = 0;
        $.each($('.j-refund-quantity'), function (index, el) {
          var number = $(el).val();
          if (!number || isNaN(number)) {
            number = 0;
          }
          total_restock_items += parseFloat(number);
        });
        $('.total-restock-items').text(total_restock_items);
      });
      $(document).on('click', '#confirm-refund-payment-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var form = _self.closest('.modal-dialog').find('form');
        $httpClient.make().withButtonLoading(_self).post(form.prop('action'), form.serialize()).then(function (_ref11) {
          var data = _ref11.data;
          if (!data.error) {
            if (data.data && data.data.refund_redirect_url) {
              window.location.href = data.data.refund_redirect_url;
            } else {
              $('#main-order-content').load("".concat(window.location.href, " #main-order-content > *"));
              Botble.showSuccess(data.message);
              _self.closest('.modal').modal('hide');
            }
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '.btn-trigger-update-shipping-status', function (event) {
        event.preventDefault();
        $('#update-shipping-status-modal').modal('show');
      });
      $(document).on('click', '#confirm-update-shipping-status-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var form = _self.closest('.modal-dialog').find('form');
        $httpClient.make().withButtonLoading(_self).post(form.prop('action'), form.serialize()).then(function (_ref12) {
          var data = _ref12.data;
          if (!data.error) {
            $('#main-order-content').load("".concat(window.location.href, " #main-order-content > *"));
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
  new OrderAdminManagement().init();
});
/******/ })()
;