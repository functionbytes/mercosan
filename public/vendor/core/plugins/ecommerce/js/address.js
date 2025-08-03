/******/ (() => { // webpackBootstrap
/*!*******************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/address.js ***!
  \*******************************************************************/
$(function () {
  $(document).on('click', '.btn-trigger-add-address', function (e) {
    e.preventDefault();
    $('#add-address-modal').modal('show');
  });
  $(document).on('click', '#confirm-add-address-button', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    Botble.showButtonLoading(_self);
    var form = _self.closest('.modal-content').find('form');
    var url = form.prop('action');
    var formData = form.serialize();
    $httpClient.make().post(url, formData).then(function (_ref) {
      var data = _ref.data;
      if (!data.error) {
        Botble.showNotice('success', data.message);
        $('#add-address-modal').modal('hide');
        form.get(0).reset();
        $('#address-histories').load($('.page-wrapper form.js-base-form').prop('action') + ' #address-histories > *');
      } else {
        Botble.showNotice('error', data.message);
      }
    })["finally"](function () {
      Botble.hideButtonLoading(_self);
    });
  });
  $(document).on('click', '.btn-trigger-edit-address', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    var $modal = $('#edit-address-modal');
    var $modalLoading = $modal.find('.modal-loading-block');
    var $modalFormContent = $('#edit-address-modal .modal-body .modal-form-content');
    $modalFormContent.html('');
    $modalLoading.removeClass('d-none');
    $modal.modal('show');
    Botble.showButtonLoading(_self);
    $httpClient.make().get(_self.data('section')).then(function (_ref2) {
      var data = _ref2.data;
      if (!data.error) {
        $modalLoading.addClass('d-none');
        $modalFormContent.html(data);
      } else {
        Botble.showNotice('error', data.message);
      }
    })["finally"](function () {
      Botble.hideButtonLoading(_self);
    });
  });
  $(document).on('click', '#confirm-edit-address-button', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    Botble.showButtonLoading(_self);
    var form = _self.closest('.modal-content').find('form');
    var url = form.prop('action');
    var formData = form.serialize();
    $httpClient.make().post(url, formData).then(function (_ref3) {
      var data = _ref3.data;
      if (!data.error) {
        Botble.showNotice('success', data.message);
        $('#edit-address-modal').modal('hide');
        form.get(0).reset();
        $('#address-histories').load($('.page-wrapper form.js-base-form').prop('action') + ' #address-histories > *');
      } else {
        Botble.showNotice('error', data.message);
      }
    })["finally"](function () {
      Botble.hideButtonLoading(_self);
    });
  });
  $(document).on('click', '.deleteDialog', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    $('.delete-crud-entry').data('section', _self.data('section'));
    $('.modal-confirm-delete').modal('show');
  });
  $('.delete-crud-entry').on('click', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    Botble.showButtonLoading(_self);
    var deleteURL = _self.data('section');
    $httpClient.make().post(deleteURL, {
      _method: 'DELETE'
    }).then(function (_ref4) {
      var data = _ref4.data;
      if (data.error) {
        Botble.showError(data.message);
      } else {
        Botble.showSuccess(data.message);
        var formAction = $('.page-wrapper form').prop('action');
        $('#address-histories').load(formAction + ' #address-histories > *');
      }
      _self.closest('.modal').modal('hide');
    })["finally"](function () {
      Botble.hideButtonLoading(_self);
    });
  });
});
/******/ })()
;