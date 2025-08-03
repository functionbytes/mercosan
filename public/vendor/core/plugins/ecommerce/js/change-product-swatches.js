/******/ (() => { // webpackBootstrap
/*!***********************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/change-product-swatches.js ***!
  \***********************************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ChangeProductSwatches = /*#__PURE__*/function () {
  function ChangeProductSwatches() {
    _classCallCheck(this, ChangeProductSwatches);
    _defineProperty(this, "callAjax", function (attributes, $productAttributes, slugAttributes) {
      var updateUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var referenceProduct = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var _self = this;
      var formData = {
        attributes: attributes,
        _: +new Date()
      };
      if (referenceProduct) {
        formData.reference_product = referenceProduct;
      }
      var id = $productAttributes.prop('id');
      _self.xhr = $.ajax({
        url: $productAttributes.data('target'),
        type: 'GET',
        data: formData,
        beforeSend: function beforeSend() {
          if (window.onBeforeChangeSwatches && typeof window.onBeforeChangeSwatches === 'function') {
            window.onBeforeChangeSwatches(attributes, $productAttributes);
          }
        },
        success: function success(res) {
          if (window.onChangeSwatchesSuccess && typeof window.onChangeSwatchesSuccess === 'function') {
            window.onChangeSwatchesSuccess(res, $productAttributes);
          }
          var data = res.data,
            message = res.message;
          if (!data.error_message) {
            if (data.selected_attributes) {
              slugAttributes = {};
              $.each(data.selected_attributes, function (index, item) {
                slugAttributes[item.set_slug] = item.slug;
              });
            }
            var url = new URL(window.location);
            if (id) {
              _self.updateSelectingAttributes(slugAttributes, $('#' + id));
            }
            $.each(slugAttributes, function (name, value) {
              url.searchParams.set(name, value);
            });
            if (updateUrl && url != window.location.href) {
              window.history.pushState({
                formData: formData,
                data: res,
                product_attributes_id: id,
                slugAttributes: slugAttributes
              }, message, url);
            } else {
              window.history.replaceState({
                formData: formData,
                data: res,
                product_attributes_id: id,
                slugAttributes: slugAttributes
              }, message, url);
            }
          }
        },
        complete: function complete(res) {
          if (window.onChangeSwatchesComplete && typeof window.onChangeSwatchesComplete === 'function') {
            window.onChangeSwatchesComplete(res, $productAttributes);
          }
        },
        error: function error(res) {
          if (window.onChangeSwatchesError && typeof window.onChangeSwatchesError === 'function') {
            window.onChangeSwatchesError(res, $productAttributes);
          }
        }
      });
    });
    _defineProperty(this, "updateSelectingAttributes", function (slugAttributes, $el) {
      $.each(slugAttributes, function (key, slug) {
        var $parent = $el.find('.attribute-swatches-wrapper[data-slug="' + key + '"]');
        if ($parent.length) {
          if ($parent.data('type') === 'dropdown') {
            var selected = $parent.find('select option[data-slug="' + slug + '"]').val();
            $parent.find('select').val(selected);
          } else {
            $parent.find('input:checked').prop('checked', false);
            $parent.find('input[data-slug=' + slug + ']').prop('checked', true);
          }
        }
      });
    });
    _defineProperty(this, "parseParamsSearch", function (query) {
      var includeArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var pairs = query || window.location.search.substring(1);
      var re = /([^&=]+)=?([^&]*)/g;
      var decodeRE = /\+/g; // Regex for replacing addition symbol with a space
      var decode = function decode(str) {
        return decodeURIComponent(str.replace(decodeRE, ' '));
      };
      var params = {},
        e;
      while (e = re.exec(pairs)) {
        var k = decode(e[1]),
          v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
          if (includeArray) {
            k = k.substring(0, k.length - 2);
          }
          ;
          (params[k] || (params[k] = [])).push(v);
        } else params[k] = v;
      }
      return params;
    });
    this.xhr = null;
    this.handleEvents();
  }
  return _createClass(ChangeProductSwatches, [{
    key: "handleEvents",
    value: function handleEvents() {
      var _self = this;
      var $body = $('body');
      $body.on('click', '.product-attributes .visual-swatch label, .product-attributes .text-swatch label', function (e) {
        e.preventDefault();
        var $this = $(e.currentTarget);
        var $radio = $this.find('input[type=radio]');
        if ($radio.is(':checked')) {
          return;
        }
        $radio.prop('checked', true);
        if ($this.closest('.visual-swatch').find('input[type=radio]:checked').length < 1) {
          $radio.prop('checked', true);
        }
        $radio.trigger('change');
      });
      $body.off('change', '.product-attributes input, .product-attributes select').on('change', '.product-attributes input, .product-attributes select', function (event) {
        var $parent = $(event.currentTarget).closest('.product-attributes');
        _self.getProductVariation($parent);
      });
      if ($('.product-attribute-swatches').length) {
        window.addEventListener('popstate', function (e) {
          var _e$state;
          if ((_e$state = e.state) !== null && _e$state !== void 0 && _e$state.product_attributes_id) {
            var $el = $('#' + e.state.product_attributes_id);
            if (window.onChangeSwatchesSuccess && typeof window.onChangeSwatchesSuccess === 'function') {
              window.onChangeSwatchesSuccess(e.state.data, $el);
            }
            if (e.state.slugAttributes) {
              _self.updateSelectingAttributes(e.state.slugAttributes, $el);
            }
          } else {
            $('.product-attribute-swatches').each(function (i, el) {
              var params = _self.parseParamsSearch();
              var attributes = [];
              var slugAttributes = {};
              var $el = $(el);
              if (params && Object.keys(params).length) {
                $.each(params, function (key, slug) {
                  var $parent = $el.find('.attribute-swatches-wrapper[data-slug="' + key + '"]');
                  if ($parent.length) {
                    var value;
                    if ($parent.data('type') === 'dropdown') {
                      value = $parent.find('option[data-slug="' + slug + '"]').val();
                    } else {
                      value = $parent.find('input[data-slug="' + slug + '"]').val();
                    }
                    if (value) {
                      attributes.push(value);
                      slugAttributes[key] = value;
                    }
                  }
                });
              }
              _self.callAjax(attributes, $el, slugAttributes, false);
            });
          }
        }, false);
      }
    }
  }, {
    key: "getProductVariation",
    value: function getProductVariation($productAttributes) {
      var _self = this;
      var attributes = [];
      var slugAttributes = {};

      /**
       * Break current request
       */
      if (_self.xhr) {
        _self.xhr.abort();
        _self.xhr = null;
      }

      /**
       * Get attributes
       */
      var $attributeSwatches = $productAttributes.find('.attribute-swatches-wrapper');
      var referenceProduct = null;
      $attributeSwatches.each(function (index, el) {
        var $current = $(el);
        var $input;
        if ($current.data('type') === 'dropdown') {
          $input = $current.find('select option:selected');
        } else {
          $input = $current.find('input[type=radio]:checked');
        }
        var slug = $input.data('slug');
        var value = $input.val();
        if (value) {
          var setSlug = $current.find('.attribute-swatch').data('slug');
          slugAttributes[setSlug] = slug;
          attributes.push(value);
          referenceProduct = $input.data('reference-product');
        }
      });
      _self.callAjax(attributes, $productAttributes, slugAttributes, true, referenceProduct);
    }
  }]);
}();
$(function () {
  new ChangeProductSwatches();
});
/******/ })()
;