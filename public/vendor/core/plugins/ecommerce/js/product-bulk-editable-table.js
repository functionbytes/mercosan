/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***************************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/product-bulk-editable-table.js ***!
  \***************************************************************************************/


(function ($) {
  $(document).on('change', '[data-bb-toggle="product-bulk-change"]', function () {
    var _self = $(this);
    var tableElement = _self.closest('table');
    var id = _self.data('id');
    var value = _self.is(':checkbox') || _self.is(':radio') ? _self.is(':checked') ? '1' : '0' : _self.val();
    var column = _self.data('column');
    var targetElements = $("[data-target-id=\"".concat(id, "\"]"));
    if (targetElements.length > 0) {
      targetElements.hide();
      targetElements.each(function () {
        var _this = $(this);
        var targetValue = _this.data('target-value').toString();
        if (value === targetValue) {
          _this.show();
        }
      });
    }
    $httpClient.make().withLoading(tableElement[0]).put(_self.data('url'), {
      value: value,
      column: column
    }).then(function (_ref) {
      var data = _ref.data;
      Botble.showSuccess(data.message);
    });
  });
})(jQuery);
/******/ })()
;