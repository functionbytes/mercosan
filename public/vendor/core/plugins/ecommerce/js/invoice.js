/******/ (() => { // webpackBootstrap
/*!*******************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/invoice.js ***!
  \*******************************************************************/
$(function () {
  $(document).on('click', '.invoice-generate', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    var url = $(_self.find('span[data-trigger]')).data('url');
    $httpClient.make().withButtonLoading(_self).get(url).then(function (_ref) {
      var data = _ref.data;
      Botble.showSuccess(data.message);
      window.LaravelDataTables['botble-ecommerce-tables-invoice-table'].draw();
    });
  });
});
/******/ })()
;