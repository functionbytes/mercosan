/******/ (() => { // webpackBootstrap
/*!************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/admin-review.js ***!
  \************************************************************************/
$(function () {
  var toggleReviewStatus = function toggleReviewStatus(url, button) {
    Botble.showButtonLoading(button);
    $httpClient.make().post(url).then(function (_ref) {
      var data = _ref.data;
      if (data.error) {
        Botble.showError(data.message);
        return;
      }
      Botble.showSuccess(data.message);
      $('#review-section-wrapper').load("".concat(window.location.href, " #review-section-wrapper > *"));
      button.closest('.modal').modal('hide');
    })["finally"](function () {
      return Botble.hideButtonLoading(button);
    });
  };
  var toggleEditReply = function toggleEditReply() {
    var $form = $('#review-section-wrapper form');
    $form.find('[data-bb-toggle="edit-reply"]').toggle();
    $form.find('[data-bs-target="#delete-review-reply-modal"]').toggle();
    $form.find('.reply-message').toggle();
    $form.find('.reply-form').toggle();
    $form.find('[data-bb-toggle="update-reply"]').toggle();
    $form.find('[data-bb-toggle="cancel-edit-reply"]').toggle();
  };
  $(document).on('click', '[data-bb-toggle="review-delete"]', function (event) {
    $('#confirm-delete-review-button').data('target', $(event.currentTarget).data('target')).data('next-url', $(event.currentTarget).data('next-url'));
    $('#delete-review-modal').modal('show');
  }).on('click', '#confirm-delete-review-button', function (event) {
    var _self = $(event.currentTarget);
    var url = _self.data('target');
    $httpClient.make().withButtonLoading(_self)["delete"](url).then(function (_ref2) {
      var data = _ref2.data;
      Botble.showSuccess(data.message);
      _self.closest('.modal').modal('hide');
      setTimeout(function () {
        return window.location.href = _self.data('next-url');
      }, 2000);
    })["finally"](function () {
      return Botble.hideButtonLoading(_self);
    });
  }).on('click', '[data-bb-toggle="review-unpublish"]', function (event) {
    var button = $(event.currentTarget);
    toggleReviewStatus(route('reviews.unpublish', button.data('id')), button);
  }).on('click', '[data-bb-toggle="review-publish"]', function (event) {
    var button = $(event.currentTarget);
    toggleReviewStatus(route('reviews.publish', button.data('id')), button);
  }).on('click', '[data-bb-toggle="review-reply-delete"]', function (event) {
    var currentTarget = $(event.currentTarget);
    var form = currentTarget.closest('form');
    $httpClient.make().withButtonLoading(currentTarget)["delete"](form.prop('action')).then(function (_ref3) {
      var data = _ref3.data;
      Botble.showSuccess(data.message);
      form.closest('.modal').modal('hide');
      setTimeout(function () {
        return window.location.reload();
      }, 2000);
    });
  }).on('click', '[data-bb-toggle="edit-reply"]', function (event) {
    var currentTarget = $(event.currentTarget);
    toggleEditReply(currentTarget);
  }).on('click', '[data-bb-toggle="cancel-edit-reply"]', function (event) {
    var currentTarget = $(event.currentTarget);
    toggleEditReply(currentTarget);
  });
});
/******/ })()
;