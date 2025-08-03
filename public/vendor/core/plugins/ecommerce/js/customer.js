/******/ (() => { // webpackBootstrap
/*!********************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/customer.js ***!
  \********************************************************************/
$(function () {
  $(document).on('click', '.verify-customer-email-button', function (event) {
    event.preventDefault();
    $('#confirm-verify-customer-email-button').data('action', $(event.currentTarget).prop('href'));
    $('#verify-customer-email-modal').modal('show');
  });
  $(document).on('click', '#confirm-verify-customer-email-button', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    _self.addClass('button-loading');
    $.ajax({
      type: 'POST',
      cache: false,
      url: _self.data('action'),
      success: function success(res) {
        if (!res.error) {
          Botble.showSuccess(res.message);
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          Botble.showError(res.message);
        }
        _self.removeClass('button-loading');
        _self.closest('.modal').modal('hide');
      },
      error: function error(res) {
        Botble.handleError(res);
        _self.removeClass('button-loading');
      }
    });
  });
});
/******/ })()
;