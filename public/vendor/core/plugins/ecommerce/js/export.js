/******/ (() => { // webpackBootstrap
/*!******************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/export.js ***!
  \******************************************************************/
$(function () {
  var isExporting = false;
  $(document).on('click', '[data-bb-toggle="data-export"]', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    $httpClient.make().withButtonLoading(_self).withLoading(_self.closest('.card')).withResponseType('blob').post(_self.attr('href')).then(function (_ref) {
      var data = _ref.data;
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(data);
      a.href = url;
      a.download = _self.data('filename');
      document.body.append(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  });
});
/******/ })()
;