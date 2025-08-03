/******/ (() => { // webpackBootstrap
/*!********************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/shipping.js ***!
  \********************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ShippingManagement = /*#__PURE__*/function () {
  function ShippingManagement() {
    _classCallCheck(this, ShippingManagement);
  }
  return _createClass(ShippingManagement, [{
    key: "init",
    value: function init() {
      $(document).on('click', '.btn-confirm-delete-region-item-modal-trigger', function (event) {
        event.preventDefault();
        var $modal = $('#confirm-delete-region-item-modal');
        $modal.find('.region-item-label').text($(event.currentTarget).data('name'));
        $modal.find('#confirm-delete-region-item-button').data('id', $(event.currentTarget).data('id'));
        $modal.modal('show');
      });
      $(document).on('click', '#confirm-delete-region-item-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post($('div[data-delete-region-item-url]').data('delete-region-item-url'), {
          _method: 'DELETE',
          id: _self.data('id')
        }).then(function (_ref) {
          var data = _ref.data;
          if (!data.error) {
            $(".wrap-table-shipping-".concat(_self.data('id'))).remove();
            Botble.showSuccess(data.message);
          } else {
            Botble.showError(data.message);
          }
          $('#confirm-delete-region-item-modal').modal('hide');
          if ($('.wrapper-content .p-3').children().length < 1) {
            $('.wrapper-content').hide();
          }
        });
      });
      $(document).on('click', '.btn-confirm-delete-price-item-modal-trigger', function (event) {
        event.preventDefault();
        var $modal = $('#confirm-delete-price-item-modal');
        $modal.find('.region-price-item-label').text($(event.currentTarget).data('name'));
        $modal.find('#confirm-delete-price-item-button').data('id', $(event.currentTarget).data('id'));
        $modal.modal('show');
      });
      $(document).on('click', '#confirm-delete-price-item-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post($('div[data-delete-rule-item-url]').data('delete-rule-item-url'), {
          _method: 'DELETE',
          id: _self.data('id')
        }).then(function (_ref2) {
          var data = _ref2.data;
          if (!data.error) {
            $(".box-table-shipping-item-".concat(_self.data('id'))).remove();
            if (data.data.count === 0) {
              $(".wrap-table-shipping-".concat(data.data.shipping_id)).remove();
            }
            if (!$('.shipping-options-wrapper .shipping-option-item').length) {
              $('form').areYouSure({
                'silent': true
              });
              window.location.reload();
            }
            Botble.showSuccess(data.message);
          } else {
            Botble.showError(data.message);
          }
          $('#confirm-delete-price-item-modal').modal('hide');
        });
      });
      var saveRuleItem = function saveRuleItem($this, $form, method, shippingId) {
        $(document).find('.field-has-error').removeClass('field-has-error');
        var _self = $this;
        var formData = [];
        if (method !== 'POST') {
          formData._method = method;
        }
        $.each($form.serializeArray(), function (index, el) {
          if (el.name === 'from' || el.name === 'to' || el.name === 'price') {
            if (el.value) {
              el.value = parseFloat(el.value.replace(',', '')).toFixed(2);
            }
          }
          formData[el.name] = el.value;
        });
        if (shippingId) {
          formData.shipping_id = shippingId;
        }
        formData = Botble.unmaskInputNumber($form, formData);
        formData = $.extend({}, formData);
        $httpClient.make().withButtonLoading(_self).post($form.prop('action'), formData).then(function (_ref3) {
          var data = _ref3.data;
          if (!data.error) {
            var _data$data, _data$data2;
            Botble.showSuccess(data.message);
            if (data !== null && data !== void 0 && (_data$data = data.data) !== null && _data$data !== void 0 && (_data$data = _data$data.rule) !== null && _data$data !== void 0 && _data$data.shipping_id && data !== null && data !== void 0 && (_data$data2 = data.data) !== null && _data$data2 !== void 0 && _data$data2.html) {
              var $box = $(".wrap-table-shipping-".concat(data.data.rule.shipping_id));
              var $item = $box.find(".box-table-shipping-item-".concat(data.data.rule.id));
              if ($item.length) {
                $item.replaceWith(data.data.html);
              } else {
                $box.append(data.data.html);
              }
              $('.wrapper-content .empty').remove();
              Botble.initResources();
            }
          } else {
            Botble.showError(data.message);
          }
          if (shippingId) {
            _self.closest('.modal').modal('hide');
          }
        });
      };
      $(document).on('click', '.btn-save-rule', function (event) {
        event.preventDefault();
        var $this = $(event.currentTarget);
        saveRuleItem($this, $this.closest('form'), 'PUT', null);
      });
      $(document).on('change', '.select-rule-type', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var $box = _self.closest('form');
        var $option = _self.find('option:selected');
        if ($option.data('show-from-to')) {
          $box.find('.rule-from-to-inputs').show();
        } else {
          $box.find('.rule-from-to-inputs').hide();
        }
        $box.find('.unit-item-label').text($option.data('unit'));
        $box.find('.rule-from-to-label').text($option.data('text'));
      });
      $(document).on('keyup', '.input-sync-item', function (event) {
        var $this = $(event.currentTarget);
        var number = $this.val();
        if (!number || isNaN(number)) {
          number = 0;
        }
        $this.closest('.input-shipping-sync-wrapper').find($this.data('target')).text(Botble.numberFormat(parseFloat(number), 2));
      });
      $(document).on('keyup', '.input-sync-text-item', function (event) {
        var $this = $(event.currentTarget);
        $this.closest('.input-shipping-sync-wrapper').find($this.data('target')).text($this.val());
      });
      $(document).on('keyup', '.input-to-value-field', function (event) {
        var $this = $(event.currentTarget);
        var $parent = $this.closest('.input-shipping-sync-wrapper');
        if ($this.val()) {
          $parent.find('.rule-to-value-wrap').removeClass('hidden');
          $parent.find('.rule-to-value-missing').addClass('hidden');
        } else {
          $parent.find('.rule-to-value-wrap').addClass('hidden');
          $parent.find('.rule-to-value-missing').removeClass('hidden');
        }
      });
      $(document).on('click', '.btn-add-shipping-rule-trigger', function (event) {
        event.preventDefault();
        var $this = $(event.currentTarget);
        var $modal = $('#add-shipping-rule-item-modal');
        $('#add-shipping-rule-item-button').data('shipping-id', $this.data('shipping-id'));
        $modal.find('select[name=type] option[disabled]').prop('disabled', false);
        if (!$this.data('country')) {
          $modal.find('select[name=type] option[value=base_on_zip_code]').prop('disabled', true);
        }
        $modal.find('input[name=name]').val('');
        $modal.find('select[name=type]').val('').trigger('change');
        $modal.find('input[name=from]').val('0');
        $modal.find('input[name=to]').val('');
        $modal.find('input[name=price]').val('0');
        $modal.modal('show');
      });
      $(document).on('click', '.btn-shipping-rule-item-trigger', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var $modal = $('#form-shipping-rule-item-detail-modal');
        $modal.modal('show');
        $modal.find('.modal-title strong').html('');
        $modal.find('.modal-body').html("<div class='w-100 text-center py-3'><div class='spinner-border' role='status'>\n                    <span class='visually-hidden'>Loading...</span>\n                  </div></div>");
        $httpClient.make().withButtonLoading(_self).get(_self.data('url')).then(function (_ref4) {
          var data = _ref4.data;
          if (!data.error) {
            $modal.find('.modal-body').html(data.data.html);
            $modal.find('.modal-title strong').html(data.message);
            Botble.initResources();
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '#save-shipping-rule-item-detail-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var $modal = $('#form-shipping-rule-item-detail-modal');
        var $form = $modal.find('form');
        var allowedMethods = ['get', 'post', 'put', 'delete'];
        var method = $form.prop('method').toLowerCase();
        if (!allowedMethods.includes(method)) {
          Botble.showError('This method is not supported.');
          return;
        }
        var formData = new FormData($form[0]);
        formData = Botble.unmaskInputNumber($form, formData);
        $httpClient.make().withButtonLoading(_self)[method]($form.prop('action'), formData).then(function (_ref5) {
          var data = _ref5.data;
          if (!data.error) {
            var $table = $(".table-shipping-rule-".concat(data.data.shipping_rule_id));
            if ($table.find(".shipping-rule-item-".concat(data.data.id)).length) {
              $table.find(".shipping-rule-item-".concat(data.data.id)).replaceWith(data.data.html);
            } else {
              $table.prepend(data.data.html);
            }
            $modal.modal('hide');
            Botble.showSuccess(data.message);
          } else {
            Botble.showError(data.message);
          }
        });
      });
      $(document).on('click', '.btn-confirm-delete-rule-item-modal-trigger', function (event) {
        event.preventDefault();
        var $modal = $('#confirm-delete-shipping-rule-item-modal');
        $modal.find('.item-label').text($(event.currentTarget).data('name'));
        $modal.find('#confirm-delete-shipping-rule-item-button').data('url', $(event.currentTarget).data('section'));
        $modal.modal('show');
      });
      $(document).on('click', '#confirm-delete-shipping-rule-item-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $httpClient.make().withButtonLoading(_self).post(_self.data('url'), {
          _method: 'DELETE'
        }).then(function (_ref6) {
          var data = _ref6.data;
          if (!data.error) {
            var $table = $(".table-shipping-rule-".concat(data.data.shipping_rule_id));
            if ($table.find(".shipping-rule-item-".concat(data.data.id)).length) {
              $table.find(".shipping-rule-item-".concat(data.data.id)).fadeOut(500, function () {
                $(this).remove();
              });
            }
            Botble.showSuccess(data.message);
          } else {
            Botble.showError(data.message);
          }
          $('#confirm-delete-shipping-rule-item-modal').modal('hide');
        });
      });
      Botble.select($(document).find('.select-country-search'));
      $(document).on('click', '.btn-select-country', function (event) {
        event.preventDefault();
        $('#select-country-modal').modal('show');
      });
      $(document).on('click', '#add-shipping-region-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var $form = _self.closest('.modal-content').find('form');
        $httpClient.make().withButtonLoading(_self).post($form.prop('action'), $form.serialize()).then(function (_ref7) {
          var data = _ref7.data;
          Botble.showSuccess(data.message);
          $('.wrapper-content').load("".concat(window.location.href, " .wrapper-content > *"));
          $('#select-country-modal').modal('hide');
          $('.wrapper-content').show();
        });
      });
      $(document).on('click', '#add-shipping-rule-item-button', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        saveRuleItem(_self, _self.closest('.modal-content').find('form'), 'POST', _self.data('shipping-id'));
      });
      $(document).on('keyup', '.base-price-rule-item', function (event) {
        var _self = $(event.currentTarget);
        var basePrice = _self.val();
        if (!basePrice || isNaN(basePrice)) {
          basePrice = 0;
        }
        $.each($(document).find('.support-shipping .rule-adjustment-price-item'), function (index, item) {
          var adjustmentPrice = $(item).closest('tr').find('.shipping-price-district').val();
          if (!adjustmentPrice || isNaN(adjustmentPrice)) {
            adjustmentPrice = 0;
          }
          $(item).text(Botble.numberFormat(parseFloat(basePrice) + parseFloat(adjustmentPrice)), 2);
        });
      });
      $(document).on('change', 'select[name=shipping_rule_id].shipping-rule-id', function (e) {
        e.preventDefault();
        var _self = $(e.currentTarget);
        var $form = _self.closest('form');
        var $country = $form.find('select[data-type="country"]');
        var val = _self.find('option:selected').data('country');
        if ($country.length) {
          if ($country.val() !== val) {
            $country.val(val).trigger('change');
          }
        } else {
          $country = $form.find('input[name="country"]');
          if ($country.length && $country.val() !== val) {
            $country.val(val);
          }
        }
      });
      $(document).on('click', '.table-shipping-rule-items .shipping-rule-load-items', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var $table = _self.closest('.table-shipping-rule-items');
        loadRuleItems(_self.attr('href'), $table, _self);
      });
      $(document).on('click', '.table-shipping-rule-items a.page-link', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        var $table = _self.closest('.table-shipping-rule-items');
        loadRuleItems(_self.attr('href'), $table, _self);
      });
      $(document).on('change', '.table-shipping-rule-items .number-record .numb', function (e) {
        e.preventDefault();
        var $this = $(e.currentTarget);
        var perPage = $this.val();
        if (!isNaN(perPage) && perPage > 0) {
          var $table = $this.closest('.table-shipping-rule-items');
          var $th = $table.find('thead tr th[data-column][data-dir]');
          var data = {
            per_page: perPage
          };
          if ($th.length) {
            data.order_by = $th.data('column');
            data.order_dir = $th.data('dir') || 'DESC';
          }
          loadRuleItems($table.data('url'), $table, $this, data);
        } else {
          $this.val($this.attr('min') || 12).trigger('change');
        }
      });
      $(document).on('click', '.table-shipping-rule-items thead tr th[data-column]', function (e) {
        e.preventDefault();
        var _self = $(e.currentTarget);
        var orderBy = _self.data('column');
        var orderDir = _self.data('dir') || 'ASC';
        var $table = _self.closest('.table-shipping-rule-items');
        var $numb = $table.find('.number-record .numb');
        var perPage = $numb.val();
        orderDir = orderDir === 'ASC' ? 'DESC' : 'ASC';
        loadRuleItems($table.data('url'), $table, _self, {
          order_by: orderBy,
          order_dir: orderDir,
          per_page: perPage
        });
      });
      function loadRuleItems(url, $table, $button) {
        var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        $httpClient.make().withButtonLoading($button).get(url, data).then(function (_ref8) {
          var data = _ref8.data;
          if (!data.error) {
            $table.replaceWith(data.data.html);
          } else {
            Botble.showError(data.message);
          }
        });
      }
    }
  }]);
}();
$(function () {
  new ShippingManagement().init();
});
/******/ })()
;