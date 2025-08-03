/******/ (() => { // webpackBootstrap
/*!****************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/ecommerce-product-attributes.js ***!
  \****************************************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EcommerceProductAttribute = /*#__PURE__*/function () {
  function EcommerceProductAttribute() {
    _classCallCheck(this, EcommerceProductAttribute);
    this.template = $('#product_attribute_template').html();
    this.totalItem = $('.swatches-container .swatches-list tr').length;
    this.deletedItems = [];
    this.handleForm();
  }
  return _createClass(EcommerceProductAttribute, [{
    key: "addNewAttribute",
    value: function addNewAttribute() {
      var _self = this;
      var template = _self.template.replace(/__id__/gi, 0).replace(/__position__/gi, 0).replace(/__checked__/gi, _self.totalItem == 0 ? 'checked' : '').replace(/__title__/gi, '').replace(/__color__/gi, '').replace(/__image__/gi, '');
      $('.swatches-container .swatches-list').append(template);
      _self.totalItem++;
      Botble.initMediaIntegrate();
    }
  }, {
    key: "exportData",
    value: function exportData() {
      var data = [];
      $('.swatches-container .swatches-list tr').each(function (index, item) {
        var $current = $(item);
        data.push({
          id: $current.data('id'),
          is_default: $current.find('input[type=radio]').is(':checked') ? 1 : 0,
          order: $current.index(),
          title: $current.find('input[name="swatch-title"]').val(),
          color: $current.find('input[name="swatch-value"]').val(),
          image: $current.find('input[name="swatch-image"]').val()
        });
      });
      return data;
    }
  }, {
    key: "handleForm",
    value: function handleForm() {
      var _self = this;
      $('.swatches-container .swatches-list').sortable();
      $('body').on('submit', '.update-attribute-set-form', function () {
        var data = _self.exportData();
        $('#attributes').val(JSON.stringify(data));
        $('#deleted_attributes').val(JSON.stringify(_self.deletedItems));
      }).on('click', '.js-add-new-attribute', function (event) {
        event.preventDefault();
        _self.addNewAttribute();
        Botble.initColorPicker();
      }).on('click', '.swatches-container .swatches-list tr .remove-item', function (event) {
        event.preventDefault();
        var $item = $(event.currentTarget).closest('tr');
        _self.deletedItems.push($item.data('id'));
        $item.fadeOut('fast', function () {
          return $item.remove();
        });
      });
    }
  }]);
}();
$(window).on('load', function () {
  new EcommerceProductAttribute();
});
/******/ })()
;