/******/ (() => { // webpackBootstrap
/*!*********************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/utilities.js ***!
  \*********************************************************************/
$(function () {
  if ($.fn.datepicker) {
    var $datePicker = $('#date_of_birth');
    var options = {
      format: 'yyyy-mm-dd',
      orientation: 'bottom'
    };
    var language = $datePicker.data('locale');
    if (language) {
      options.language = language;
    }
    var dateFormat = $datePicker.data('date-format');
    if (dateFormat) {
      options.format = dateFormat;
    }
    $datePicker.datepicker(options);
  }
  $('#avatar').on('change', function (event) {
    var input = event.currentTarget;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.userpic-avatar').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  });
});
/******/ })()
;