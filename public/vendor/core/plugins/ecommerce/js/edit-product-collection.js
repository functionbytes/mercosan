/******/ (() => { // webpackBootstrap
/*!***********************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/edit-product-collection.js ***!
  \***********************************************************************************/
$(function () {
  var ajaxRequest;
  var hasAjaxSearchRequested = false;
  var loadRelationBoxes = function loadRelationBoxes() {
    var $wrapBody = $('.wrap-collection-products');
    if ($wrapBody.length) {
      $httpClient.make().withLoading($wrapBody).get($wrapBody.data('target')).then(function (_ref) {
        var data = _ref.data;
        if (data.error) {
          Botble.showError(data.message);
        } else {
          $wrapBody.html(data.data);
        }
      });
    }
  };
  loadRelationBoxes();
  $(document).on('click', '.list-search-data .selectable-item', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    var $input = _self.closest('.box-search-advance').find('input[type=hidden]');
    var existedValues = $input.val().split(',');
    $.each(existedValues, function (index, el) {
      existedValues[index] = parseInt(el);
    });
    if ($.inArray(_self.data('id'), existedValues) < 0) {
      if ($input.val()) {
        $input.val("".concat($input.val(), ",").concat(_self.data('id')));
      } else {
        $input.val(_self.data('id'));
      }
      var template = $(document).find('#selected_product_list_template').html();
      var productItem = template.replace(/__name__/gi, _self.data('name')).replace(/__id__/gi, _self.data('id')).replace(/__url__/gi, _self.data('url')).replace(/__image__/gi, _self.data('image')).replace(/__attributes__/gi, _self.find('a span').text());
      _self.closest('.box-search-advance').find('.list-selected-products').show();
      _self.closest('.box-search-advance').find('.list-selected-products').append(productItem);
    }
    _self.closest('.card').hide();
  });
  $(document).on('click', '[data-bb-toggle="product-search-advanced"]', function (event) {
    var _self = $(event.currentTarget);
    var $formBody = _self.closest('.box-search-advance').find('.card');
    $formBody.show();
    $formBody.addClass('active');
    if ($formBody.find('.card-body').length === 0) {
      $httpClient.make().withLoading($formBody).get(_self.data('bb-target')).then(function (_ref2) {
        var data = _ref2.data;
        if (data.error) {
          Botble.showError(data.message);
        } else {
          $formBody.html(data.data);
        }
      });
    }
  });
  $(document).on('keyup', '[data-bb-toggle="product-search-advanced"]', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    var $formBody = _self.closest('.box-search-advance').find('.card');
    setTimeout(function () {
      if (hasAjaxSearchRequested) {
        ajaxRequest.abort();
      }
      hasAjaxSearchRequested = true;
      ajaxRequest = $httpClient.make().withLoading($formBody).get(_self.data('bb-target'), {
        keyword: _self.val()
      }).then(function (_ref3) {
        var data = _ref3.data;
        if (data.error) {
          Botble.showError(data.message);
        } else {
          $formBody.html(data.data);
        }
        hasAjaxSearchRequested = false;
      })["catch"](function (error) {
        if (data.statusText !== 'abort') {
          Botble.handleError(error);
        }
      });
    }, 500);
  });
  $(document).on('click', '.box-search-advance .page-link', function (event) {
    event.preventDefault();
    var $searchBox = $(event.currentTarget).closest('.box-search-advance').find('[data-bb-toggle="product-search-advanced"]');
    if (!$searchBox.closest('.page-item').hasClass('disabled') && $searchBox.data('bb-target')) {
      var $formBody = $searchBox.closest('.box-search-advance').find('.card');
      $httpClient.make().withLoading($formBody).get($(event.currentTarget).prop('href'), {
        keyword: $searchBox.val()
      }).then(function (_ref4) {
        var data = _ref4.data;
        if (data.error) {
          Botble.showError(data.message);
        } else {
          $formBody.html(data.data);
        }
      });
    }
  });
  $(document).on('click', 'body', function (e) {
    var container = $('.box-search-advance');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.find('.card').hide();
    }
  });
  $(document).on('click', '[data-bb-toggle="product-delete-item"]', function (event) {
    event.preventDefault();
    var $input = $(event.currentTarget).closest('.box-search-advance').find('input[type=hidden]');
    var existedValues = $input.val().split(',');
    $.each(existedValues, function (index, el) {
      el = el.trim();
      if (!_.isEmpty(el)) {
        existedValues[index] = parseInt(el);
      }
    });
    var index = existedValues.indexOf($(event.currentTarget).data('bb-target'));
    if (index > -1) {
      existedValues.splice(index, 1);
    }
    $input.val(existedValues.join(','));
    if ($(event.currentTarget).closest('.list-selected-products').find('.list-group-item').length < 2) {
      $(event.currentTarget).closest('.list-selected-products').hide();
    }
    $(event.currentTarget).closest('.list-group-item').remove();
  });
});
/******/ })()
;