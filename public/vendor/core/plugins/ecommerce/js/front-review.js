/******/ (() => { // webpackBootstrap
/*!************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/front-review.js ***!
  \************************************************************************/
$(function () {
  var $reviewListContainer = $('.review-list-container');
  var imagesReviewBuffer = [];
  var initLightGallery = function initLightGallery(element) {
    element.lightGallery({
      thumbnail: true
    });
  };
  var getReviewList = function getReviewList(url, successCallback) {
    if (!url) {
      return;
    }
    $.ajax({
      url: url,
      method: 'GET',
      beforeSend: function beforeSend() {
        $reviewListContainer.append('<div class="loading-spinner"></div>');
      },
      success: function success(_ref) {
        var data = _ref.data,
          message = _ref.message;
        $reviewListContainer.find('h4').text(message);
        $reviewListContainer.find('.review-list').html(data);
        if (typeof Theme.lazyLoadInstance !== 'undefined') {
          Theme.lazyLoadInstance.update();
        }
        initLightGallery($reviewListContainer.find('.review-images'));
        if (successCallback) {
          successCallback();
        }
      },
      complete: function complete() {
        $reviewListContainer.find('.loading-spinner').remove();
      }
    });
  };
  var loadPreviewImage = function loadPreviewImage(input) {
    var $uploadText = $('.image-upload__text');
    var maxFiles = $(input).data('max-files');
    var filesAmount = input.files.length;
    if (maxFiles) {
      if (filesAmount >= maxFiles) {
        $uploadText.closest('.image-upload__uploader-container').addClass('d-none');
      } else {
        $uploadText.closest('.image-upload__uploader-container').removeClass('d-none');
      }
      $uploadText.text(filesAmount + '/' + maxFiles);
    } else {
      $uploadText.text(filesAmount);
    }
    var viewerList = $('.image-viewer__list');
    var $template = $('#review-image-template').html();
    viewerList.find('.image-viewer__item').remove();
    if (filesAmount) {
      for (var i = filesAmount - 1; i >= 0; i--) {
        viewerList.prepend($template.replace('__id__', i));
      }
      var _loop = function _loop(j) {
        var reader = new FileReader();
        reader.onload = function (event) {
          viewerList.find('.image-viewer__item[data-id=' + j + ']').find('img').attr('src', event.target.result);
        };
        reader.readAsDataURL(input.files[j]);
      };
      for (var j = filesAmount - 1; j >= 0; j--) {
        _loop(j);
      }
    }
  };
  var setImagesFormReview = function setImagesFormReview(input) {
    var dT = new ClipboardEvent('').clipboardData || new DataTransfer();
    for (var _i = 0, _imagesReviewBuffer = imagesReviewBuffer; _i < _imagesReviewBuffer.length; _i++) {
      var file = _imagesReviewBuffer[_i];
      dT.items.add(file);
    }
    input.files = dT.files;
    loadPreviewImage(input);
  };
  if ($reviewListContainer.length) {
    initLightGallery($('.review-images'));
    getReviewList($reviewListContainer.data('ajax-url'));
  }
  $reviewListContainer.on('click', '.pagination a', function (e) {
    e.preventDefault();
    var url = $(e.currentTarget).prop('href');
    getReviewList(url, function () {
      $('html, body').animate({
        scrollTop: $reviewListContainer.offset().top - 130
      });
    });
  });
  $(document).on('submit', '.product-review-container form', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $form = $(e.currentTarget);
    var $button = $form.find('button[type="submit"]');
    $.ajax({
      type: 'POST',
      cache: false,
      url: $form.prop('action'),
      data: new FormData($form[0]),
      contentType: false,
      processData: false,
      beforeSend: function beforeSend() {
        $button.prop('disabled', true).addClass('loading');
      },
      success: function success(_ref2) {
        var error = _ref2.error,
          message = _ref2.message;
        if (!error) {
          $form.find('select').val(0);
          $form.find('textarea').val('');
          $form.find('input[type=file]').val('');
          $form.find('input.custom-field').val('');
          imagesReviewBuffer = [];
          Theme.showSuccess(message);
          getReviewList($reviewListContainer.data('ajax-url'), function () {
            if (!$('.review-list').length) {
              setTimeout(function () {
                return window.location.reload();
              }, 1000);
            }
          });
        } else {
          Theme.showError(message);
        }
      },
      error: function error(_error) {
        Theme.handleError(_error, $form);
      },
      complete: function complete() {
        $button.prop('disabled', false).removeClass('loading');
      }
    });
  });
  $(document).on('change', '.product-review-container form input[type=file]', function (event) {
    event.preventDefault();
    var input = this;
    var $input = $(input);
    var maxSize = $input.data('max-size');
    Object.keys(input.files).map(function (i) {
      if (maxSize && input.files[i].size / 1024 > maxSize) {
        var message = $input.data('max-size-message').replace('__attribute__', input.files[i].name).replace('__max__', maxSize);
        Theme.showError(message);
      } else {
        imagesReviewBuffer.push(input.files[i]);
      }
    });
    var filesAmount = imagesReviewBuffer.length;
    var maxFiles = $input.data('max-files');
    if (maxFiles && filesAmount > maxFiles) {
      imagesReviewBuffer.splice(filesAmount - maxFiles - 1, filesAmount - maxFiles);
    }
    setImagesFormReview(input);
  });
  $(document).on('click', '.product-review-container form .image-viewer__icon-remove', function (event) {
    event.preventDefault();
    var $this = $(event.currentTarget);
    var id = $this.closest('.image-viewer__item').data('id');
    imagesReviewBuffer.splice(id, 1);
    var input = $('.product-review-container form input[type=file]')[0];
    setImagesFormReview(input);
  });
  if (sessionStorage.reloadReviewsTab) {
    if ($('#product-detail-tabs a[href="#product-reviews"]').length) {
      new bootstrap.Tab($('#product-detail-tabs a[href="#product-reviews"]')[0]).show();
    }
    sessionStorage.reloadReviewsTab = false;
  }
});
/******/ })()
;