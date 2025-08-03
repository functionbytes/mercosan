/******/ (() => { // webpackBootstrap
/*!************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/edit-product.js ***!
  \************************************************************************/
var _EcommerceProduct;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EcommerceProduct = /*#__PURE__*/function () {
  function EcommerceProduct() {
    _classCallCheck(this, EcommerceProduct);
    _defineProperty(this, "setProductVariationDefault", function () {
      $(document).on('click', '.table-hover-variants input[name=variation_default_id]', function (e) {
        var $this = $(e.currentTarget);
        var url = $this.data('url');
        if (url) {
          $.ajax({
            url: url,
            method: 'POST',
            success: function success(res) {
              if (res.error) {
                Botble.showError(res.message);
              } else {
                Botble.showSuccess(res.message);
              }
            },
            error: function error(res) {
              Botble.handleError(res);
            }
          });
        }
      });
    });
    this.$body = $('body');
    this.initElements();
    this.handleEvents();
    this.handleChangeSaleType();
    this.handleShipping();
    this.handleStorehouse();
    this.handleModifyAttributeSets();
    this.handleAddVariations();
    this.handleDeleteVariations();
    this.setProductVariationDefault();
    this.handleCalculateDiscountPercents();
    window.productAttributeSets = [];
    window.loadedProductAttributeSets = false;
    this.productAttributeSets();
    var pageSizeSelect2 = 50;
    $.fn.select2.amd.require(['select2/data/array', 'select2/utils'], function (ArrayData, Utils) {
      function CustomData($element, options) {
        CustomData.__super__.constructor.call(this, $element, options);
      }
      Utils.Extend(CustomData, ArrayData);
      CustomData.prototype.query = function (params, callback) {
        var $this = this;
        var results;
        if (params.term && params.term !== '') {
          results = _.filter($this.options.options.data, function (e) {
            return e.text.toUpperCase().indexOf(params.term.toUpperCase()) >= 0;
          });
        } else {
          results = $this.options.options.data;
        }
        if (!('page' in params)) {
          params.page = 1;
        }
        var data = {
          results: results.slice((params.page - 1) * pageSizeSelect2, params.page * pageSizeSelect2),
          pagination: {
            more: params.page * pageSizeSelect2 < results.length
          }
        };
        callback(data);
      };
      window.CustomDataApdapterSelect2 = CustomData;
    });
  }
  return _createClass(EcommerceProduct, [{
    key: "productAttributeSets",
    value: function productAttributeSets() {
      var url = $('.product-attribute-sets-url').data('url');
      if (url) {
        $.ajax({
          url: url,
          success: function success(res) {
            if (res.error === false) {
              window.productAttributeSets = res.data;
              window.loadedProductAttributeSets = true;
            } else {
              window.loadedProductAttributeSets = null;
            }
          },
          error: function error(res) {
            Botble.handleError(res);
          }
        });
      } else {
        window.loadedProductAttributeSets = true;
      }
    }
  }, {
    key: "handleEvents",
    value: function handleEvents() {
      var _self = this;
      _self.$body.on('click', '.select-all', function (event) {
        event.preventDefault();
        var $select = $($(event.currentTarget).attr('href'));
        $select.find('option').attr('selected', true);
        $select.trigger('change');
      });
      _self.$body.on('click', '.deselect-all', function (event) {
        event.preventDefault();
        var $select = $($(event.currentTarget).attr('href'));
        $select.find('option').removeAttr('selected');
        $select.trigger('change');
      });
      _self.$body.on('change', '#attribute_sets', function (event) {
        var $groupContainer = $('#attribute_set_group');
        var value = $(event.currentTarget).val();
        $groupContainer.find('.panel').hide();
        if (value) {
          _.forEach(value, function (value) {
            $groupContainer.find('.panel[data-id="' + value + '"]').show();
          });
        }
        $('.select2-select').select2();
      });
      $('#attribute_sets').trigger('change');
      _self.$body.on('change', '.is-variation-default input', function (event) {
        var $current = $(event.currentTarget);
        var isChecked = $current.is(':checked');
        $('.is-variation-default input').prop('checked', false);
        if (isChecked) {
          $current.prop('checked', true);
        }
      });
      $(document).on('change', '.table-check-all', function (event) {
        var $current = $(event.currentTarget);
        if ($current.prop('checked')) {
          $('.btn-trigger-delete-selected-variations').show();
        } else {
          $('.btn-trigger-delete-selected-variations').hide();
        }
      });
      $(document).on('change', '.checkboxes', function (event) {
        var $current = $(event.currentTarget);
        var $table = $current.closest('.table-hover-variants');
        if ($table.find('.checkboxes:checked').length > 0) {
          $('.btn-trigger-delete-selected-variations').show();
        } else {
          $('.btn-trigger-delete-selected-variations').hide();
        }
      });
      $(document).on('click', '.btn-trigger-delete-selected-variations', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        var ids = [];
        $('.table-hover-variants').find('.checkboxes:checked').each(function (i, el) {
          ids[i] = $(el).val();
        });
        if (ids.length === 0) {
          Botble.showError(BotbleVariables.languages.tables.please_select_record);
          return false;
        }
        $('#delete-selected-variations-button').data('href', $current.data('target'));
        $('#delete-variations-modal').modal('show');
      });
      $('#delete-selected-variations-button').off('click').on('click', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        $current.addClass('button-loading');
        var $table = $('.table-hover-variants');
        var ids = [];
        $table.find('.checkboxes:checked').each(function (i, el) {
          ids[i] = $(el).val();
        });
        $.ajax({
          url: $current.data('href'),
          type: 'POST',
          data: {
            _method: 'DELETE',
            ids: ids
          },
          success: function success(res) {
            if (res.error) {
              Botble.showError(res.message);
            } else {
              Botble.showSuccess(res.message);
              _self.afterDeleteVersion(res, $table);
              $('.btn-trigger-delete-selected-variations').hide();
              $current.closest('.modal').modal('hide');
              $table.find('.table-check-all').prop('checked', false).prop('indeterminate', false);
            }
          },
          error: function error(data) {
            Botble.handleError(data);
          },
          complete: function complete() {
            $current.removeClass('button-loading');
          }
        });
      });
    }
  }, {
    key: "afterDeleteVersion",
    value: function afterDeleteVersion(res, $table) {
      if (!$table) {
        $table = $('#product-variations-wrapper').find('table');
      }
      if (res.data.total_product_variations == 0) {
        var _self = this;
        $('#main-manage-product-type').load(window.location.href + ' #main-manage-product-type > *', function () {
          _self.initElements();
          _self.handleEvents();
        });
      } else if ($table.length) {
        window.LaravelDataTables && LaravelDataTables[$table.attr('id')] && LaravelDataTables[$table.attr('id')].draw();
      }
    }
  }, {
    key: "initElements",
    value: function initElements() {
      $('.select2-select').select2();
      $('.form-date-time').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        toolbarPlacement: 'bottom',
        showTodayButton: true,
        stepping: 1
      });
      $('#attribute_set_group .panel-collapse').on('shown.bs.collapse', function () {
        $('.select2-select').select2();
      });
      $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function () {
        $('.select2-select').select2();
      });
    }
  }, {
    key: "handleChangeSaleType",
    value: function handleChangeSaleType() {
      var _self = this;
      _self.$body.on('click', '.turn-on-schedule', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        var $group = $current.closest('.price-group');
        $current.hide();
        $group.find('.turn-off-schedule').show();
        $group.find('.detect-schedule').val(1);
        $group.find('.scheduled-time').show();
      });
      _self.$body.on('click', '.turn-off-schedule', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        var $group = $current.closest('.price-group');
        $current.hide();
        $group.find('.turn-on-schedule').show();
        $group.find('.detect-schedule').val(0);
        $group.find('.scheduled-time').hide();
      });
    }
  }, {
    key: "handleStorehouse",
    value: function handleStorehouse() {
      var _self = this;
      _self.$body.on('click', 'input.storehouse-management-status', function (event) {
        var $storehouseInfo = $('.storehouse-info');
        if ($(event.currentTarget).prop('checked') === true) {
          $storehouseInfo.show();
          $('.stock-status-wrapper').hide();
        } else {
          $storehouseInfo.hide();
          $('.stock-status-wrapper').show();
        }
      });
    }
  }, {
    key: "handleShipping",
    value: function handleShipping() {
      var _self = this;
      _self.$body.on('click', '.change-measurement .dropdown-menu a', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        var $parent = $current.closest('.change-measurement');
        var $input = $parent.find('input[type=hidden]');
        $input.val($current.attr('data-alias'));
        $parent.find('.dropdown-toggle .alias').html($current.attr('data-alias'));
      });
    }
  }, {
    key: "handleModifyAttributeSets",
    value: function handleModifyAttributeSets() {
      var _self = this;
      _self.$body.on('click', '#store-related-attributes-button', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        var attributeSets = [];
        $current.closest('.modal-content').find('.attribute-set-item:checked').each(function (index, item) {
          attributeSets[index] = $(item).val();
        });
        $.ajax({
          url: $current.data('target'),
          type: 'POST',
          data: {
            attribute_sets: attributeSets
          },
          beforeSend: function beforeSend() {
            $current.addClass('button-loading');
          },
          success: function success(res) {
            if (res.error) {
              Botble.showError(res.message);
            } else {
              Botble.showSuccess(res.message);
              $('#select-attribute-sets-modal').modal('hide');
              $('form').removeClass('dirty');
              window.location.reload();
            }
          },
          error: function error(data) {
            Botble.handleError(data);
          },
          complete: function complete() {
            $current.removeClass('button-loading');
          }
        });
      });
    }
  }, {
    key: "handleAddVariations",
    value: function handleAddVariations() {
      var _self = this;
      var createOrUpdateVariation = function createOrUpdateVariation($current) {
        var $form = $current.closest('.modal-content').find('.variation-form-wrapper form');
        var formData = new FormData($form[0]);
        formData = Botble.unmaskInputNumber($form, formData);
        $.ajax({
          url: $current.data('target'),
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: function beforeSend() {
            $current.addClass('button-loading');
          },
          success: function success(res) {
            if (res.error) {
              Botble.showError(res.message);
            } else {
              Botble.showSuccess(res.message);
              $current.closest('.modal.fade').modal('hide');
              var $table = $('#product-variations-wrapper').find('table');
              if ($table.length) {
                window.LaravelDataTables && LaravelDataTables[$table.attr('id')] && LaravelDataTables[$table.attr('id')].draw();
              }
            }
          },
          complete: function complete() {
            $current.removeClass('button-loading');
          },
          error: function error(data) {
            Botble.handleError(data);
          }
        });
      };
      _self.$body.on('click', '#store-product-variation-button', function (event) {
        event.preventDefault();
        createOrUpdateVariation($(event.currentTarget));
      });
      _self.$body.on('click', '#update-product-variation-button', function (event) {
        event.preventDefault();
        createOrUpdateVariation($(event.currentTarget));
      });
      $('#add-new-product-variation-modal').on('hidden.bs.modal', function () {
        $(this).find('.modal-content .variation-form-wrapper').remove();
      });
      $('#edit-product-variation-modal').on('hidden.bs.modal', function () {
        $(this).find('.modal-content .variation-form-wrapper').remove();
      });
      _self.$body.on('click', '[data-bb-toggle="generate-versions-button"]', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        var attributes = $current.closest('.modal-content').find('input[name="attributes[]"]:checked');
        $.ajax({
          url: $current.data('target'),
          type: 'POST',
          data: {
            attributes: attributes.map(function (index, item) {
              return $(item).val();
            }).get()
          },
          beforeSend: function beforeSend() {
            $current.addClass('button-loading');
          },
          success: function success(_ref) {
            var error = _ref.error,
              message = _ref.message;
            if (error) {
              Botble.showError(message);
            } else {
              Botble.showSuccess(message);
              $('#generate-versions-modal').modal('hide');
              window.LaravelDataTables[$('#product-variations-wrapper .dataTables_wrapper table').prop('id')].draw();
            }
          },
          complete: function complete() {
            $current.removeClass('button-loading');
          },
          error: function error(data) {
            Botble.handleError(data);
          }
        });
      });
      $(document).on('click', '.btn-trigger-add-new-product-variation', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        $('#add-new-product-variation-modal .modal-body .loading-spinner').show();
        $('#add-new-product-variation-modal .modal-body .variation-form-wrapper').remove();
        $('#add-new-product-variation-modal').modal('show');
        $.ajax({
          url: $current.data('load-form'),
          type: 'GET',
          success: function success(res) {
            if (res.error) {
              Botble.showError(res.message);
            } else {
              $('#add-new-product-variation-modal .modal-body .loading-spinner').hide();
              $('#add-new-product-variation-modal .modal-body').append(res.data);
              $('#add-new-product-variation-modal .select-attributes').map(function (index, el) {
                var data = productAttributeSets.find(function (item) {
                  return item.id === $(el).data('id');
                });
                if (data) {
                  data = data.attributes.map(function (item) {
                    return {
                      id: item.id,
                      text: item.title
                    };
                  });
                  Botble.select(el, {
                    data: data,
                    ajax: {},
                    dataAdapter: CustomDataApdapterSelect2,
                    dropdownParent: $('#add-new-product-variation-modal')
                  });
                }
              });
              _self.initElements();
              Botble.initResources();
              $('#store-product-variation-button').data('target', $current.data('target'));
              $('.list-gallery-media-images').each(function (index, item) {
                var $current = $(item);
                if ($current.data('ui-sortable')) {
                  $current.sortable('destroy');
                }
                $current.sortable();
              });
            }
          },
          error: function error(data) {
            Botble.handleError(data);
          }
        });
      });
      $(document).on('click', '.btn-trigger-edit-product-version', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        $('#update-product-variation-button').data('target', $(event.currentTarget).data('target'));
        $('#edit-product-variation-modal .modal-body .loading-spinner').show();
        $('#edit-product-variation-modal .modal-body .variation-form-wrapper').remove();
        $('#edit-product-variation-modal').modal('show');
        $.ajax({
          url: $current.data('load-form'),
          type: 'GET',
          success: function success(res) {
            if (res.error) {
              Botble.showError(res.message);
            } else {
              $('#edit-product-variation-modal .modal-body .loading-spinner').hide();
              $('#edit-product-variation-modal .modal-body').append(res.data);
              $('#edit-product-variation-modal .select-attributes').map(function (index, el) {
                var data = productAttributeSets.find(function (item) {
                  return item.id == $(el).data('id');
                });
                if (data) {
                  data = data.attributes.map(function (item, index) {
                    return {
                      id: item.id,
                      text: item.title
                    };
                  });
                  Botble.select(el, {
                    data: data,
                    ajax: {},
                    dataAdapter: CustomDataApdapterSelect2,
                    dropdownParent: $('#edit-product-variation-modal')
                  });
                }
              });
              _self.initElements();
              Botble.initResources();
              $('.list-gallery-media-images').each(function (index, item) {
                var $current = $(item);
                if ($current.data('ui-sortable')) {
                  $current.sortable('destroy');
                }
                $current.sortable();
              });
            }
          },
          error: function error(data) {
            Botble.handleError(data);
          }
        });
      });
      _self.$body.on('click', '.btn-trigger-add-attribute-to-simple-product', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        var addedAttributes = [];
        var addedAttributeSets = [];
        $.each($('.list-product-attribute-items-wrap .product-attribute-set-item'), function (index, el) {
          var val = $(el).find('.product-select-attribute-item').val();
          if (val !== '') {
            addedAttributes.push($(el).find('.product-select-attribute-item-value').val());
            addedAttributeSets.push(val);
          }
        });
        if (addedAttributes.length) {
          $.ajax({
            url: $current.data('target'),
            type: 'POST',
            data: {
              added_attributes: addedAttributes,
              added_attribute_sets: addedAttributeSets
            },
            beforeSend: function beforeSend() {
              $current.addClass('button-loading');
            },
            success: function success(res) {
              if (res.error) {
                Botble.showError(res.message);
              } else {
                $('form').removeClass('dirty');
                window.location.reload();
                Botble.showSuccess(res.message);
              }
            },
            complete: function complete() {
              $current.removeClass('button-loading');
            },
            error: function error(data) {
              Botble.handleError(data);
            }
          });
        }
      });
    }
  }, {
    key: "handleDeleteVariations",
    value: function handleDeleteVariations() {
      var _self = this;
      $(document).on('click', '.btn-trigger-delete-version', function (event) {
        event.preventDefault();
        $('#delete-version-button').data('target', $(event.currentTarget).data('target')).data('id', $(event.currentTarget).data('id'));
        $('#confirm-delete-version-modal').modal('show');
      });
      _self.$body.on('click', '#delete-version-button', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        $.ajax({
          url: $current.data('target'),
          type: 'POST',
          beforeSend: function beforeSend() {
            $current.addClass('button-loading');
          },
          success: function success(res) {
            if (res.error) {
              Botble.showError(res.message);
            } else {
              _self.afterDeleteVersion(res);
              $('#confirm-delete-version-modal').modal('hide');
              Botble.showSuccess(res.message);
            }
          },
          complete: function complete() {
            $current.removeClass('button-loading');
          },
          error: function error(data) {
            Botble.handleError(data);
          }
        });
      });
    }
  }, {
    key: "handleCalculateDiscountPercents",
    value: function handleCalculateDiscountPercents() {
      $(document).on('keyup', 'input[name="price"], input[name="sale_price"]', function () {
        var $salePriceInput = $('input[name="sale_price"]');
        var price = $('input[name="price"]').val();
        var salePrice = $salePriceInput.val();
        var discountPercent = 0;
        if (price && price !== '0' && salePrice >= 0) {
          price = parseInt(price.replace(/,/g, ''));
          salePrice = parseInt(salePrice.replace(/,/g, ''));
          if (salePrice < price) {
            discountPercent = 100 - Math.round(salePrice * 100 / price);
          }
        }
        var transText = $salePriceInput.data('sale-percent-text');
        $salePriceInput.closest('.input-group').siblings('small.form-hint').html(transText.replace(':percent', "<strong>".concat(discountPercent, "%</strong>")));
      });
    }
  }]);
}();
_EcommerceProduct = EcommerceProduct;
_defineProperty(EcommerceProduct, "tableInitComplete", function (table, settings) {
  if (!settings.oInit.paging) {
    return;
  }
  _EcommerceProduct.initHeaderFilterColumns(table, settings);
});
_defineProperty(EcommerceProduct, "initHeaderFilterColumns", function (table, settings) {
  var _self = _EcommerceProduct;
  if (!window.loadedProductAttributeSets) {
    if (window.loadedProductAttributeSets == null) {
      return;
    }
    setTimeout(function () {
      _self.initHeaderFilterColumns(table, settings);
    }, 1500);
    return;
  }
  var tr = document.createElement('tr');
  $(tr).prop('role', 'row').addClass('dataTable-custom-filter');
  var searchDelay = settings.searchDelay || 0;
  var _fnThrottle = $.fn.dataTable.util.throttle;
  var wrapper = $(settings.nTableWrapper);
  var searchFn = function searchFn(column, val) {
    searchDelay ? _fnThrottle(function () {
      column.search(val).draw();
    }, searchDelay)() : function () {
      column.search(val).draw();
    };
  };
  table.columns().every(function (index) {
    var column = this;
    var setting = column.settings()[0].aoColumns[index];
    var th = $(document.createElement('th')).appendTo($(tr));
    if (setting.searchable) {
      var _setting$search_data;
      if ((setting === null || setting === void 0 || (_setting$search_data = setting.search_data) === null || _setting$search_data === void 0 ? void 0 : _setting$search_data.type) == 'customSelect' && typeof window.CustomDataApdapterSelect2 !== 'undefined') {
        var select = $("<div><select class='form-select input-sm' data-placeholder='".concat(setting.search_data.placeholder || 'Select', "'></select></div>"));
        th.append(select);
        select = th.find('select');
        var attributeSet = productAttributeSets.find(function (item) {
          return item.id == setting.search_data.attribute_set_id;
        });
        var data = [{
          id: '',
          text: ''
        }];
        if (attributeSet) {
          data = data.concat(attributeSet.attributes.map(function (item, index) {
            return {
              id: item.id,
              text: item.title
            };
          }));
        }
        Botble.select(select, {
          data: data,
          width: '100%',
          dropdownAutoWidth: true,
          allowClear: true,
          ajax: {},
          dataAdapter: CustomDataApdapterSelect2
        });
        select.on('change', function () {
          searchFn(column, $(this).val() || '');
        });
      }
    }
    if (settings.oInit.responsive) {
      if (!column.responsiveHidden() || !column.visible()) {
        th.hide();
      }
    }
  });
  $(tr).appendTo(wrapper.find('thead'));
  if (settings.oInit.responsive) {
    var hideSearchInputs = function hideSearchInputs(columns) {
      for (var i = 0; i < columns.length; i++) {
        if (columns[i]) {
          wrapper.find('.dataTable-custom-filter th:eq(' + i + ')').show();
        } else {
          wrapper.find('.dataTable-custom-filter th:eq(' + i + ')').hide();
        }
      }
    };
    table.on('responsive-resize', function (e, dt, columns) {
      hideSearchInputs(columns);
    });
  }
});
$(function () {
  new EcommerceProduct();
  window.EcommerceProduct = EcommerceProduct;
  $('body').on('click', '.list-gallery-media-images .btn_remove_image', function (event) {
    event.preventDefault();
    $(event.currentTarget).closest('li').remove();
  });
  $(document).on('click', '.btn-trigger-select-product-attributes', function (event) {
    event.preventDefault();
    $('#store-related-attributes-button').data('target', $(event.currentTarget).data('target'));
    $('#select-attribute-sets-modal').modal('show');
  });
  $(document).on('click', '[data-bb-toggle="btn-trigger-generate-versions"]', function (event) {
    event.preventDefault();
    $('[data-bb-toggle="generate-versions-button"]').data('target', $(event.currentTarget).data('target'));
    $('#generate-versions-modal').modal('show');
  });
  $(document).on('click', '.btn-trigger-add-attribute', function (event) {
    event.preventDefault();
    $('.list-product-attribute-wrap').toggle();
    $('.list-product-attribute-values-wrap').toggle();
    var $this = $(event.currentTarget);
    $this.toggleClass('adding_attribute_enable text-warning');
    if ($this.hasClass('adding_attribute_enable')) {
      $('#is_added_attributes').val(1);
      if (!$('.list-product-attribute-items-wrap .product-attribute-set-item').length) {
        addAttributeSet();
      }
    } else {
      $('#is_added_attributes').val(0);
    }
    var toggleText = $this.data('toggle-text');
    $this.data('toggle-text', $this.text());
    $this.text(toggleText);
  });
  var handleChangeAttributeSet = function handleChangeAttributeSet() {
    var $options = $('.list-product-attribute-items-wrap .product-attribute-set-item select.product-select-attribute-item option');
    $.each($options, function (index, el) {
      var $el = $(el);
      var value = $el.prop('value');
      if (value !== $el.closest('select').val()) {
        if ($(".list-product-attribute-items-wrap .product-attribute-set-item select.product-select-attribute-item[data-set-id=".concat(value, "]")).length === 0) {
          $el.prop('disabled', false);
        } else {
          $el.prop('disabled', true);
        }
      }
    });
    var selectedItems = [];
    $.each($('select.product-select-attribute-item'), function (index, el) {
      if ($(el).val() !== '') {
        selectedItems.push(index);
      }
    });
    if (selectedItems.length) {
      $('.btn-trigger-add-attribute-to-simple-product').show();
    } else {
      $('.btn-trigger-add-attribute-to-simple-product').hide();
    }
  };
  $(document).on('change', '.product-select-attribute-item', function (event) {
    var $this = $(event.currentTarget);
    var $attrSetItem = $this.closest('.product-attribute-set-item');
    var selectedValue = $this.val();
    var $setSelect = $attrSetItem.find('.product-select-attribute-item');
    $setSelect.attr('data-set-id', $this.val());
    var $attributeValue = $attrSetItem.find('.product-select-attribute-item-value');
    $attributeValue.prop('name', 'added_attributes[' + selectedValue + ']');
    var data = productAttributeSets.find(function (item) {
      return item.id == selectedValue;
    });
    if (data !== null && data !== void 0 && data.attributes) {
      $attributeValue.empty().select2({
        data: data.attributes.map(function (item) {
          return {
            id: item.id,
            text: item.title
          };
        }),
        ajax: {},
        dataAdapter: CustomDataApdapterSelect2
      });
      handleChangeAttributeSet();
    }
  });
  var addAttributeSet = function addAttributeSet() {
    var $attributeItemTemplate = $('#attribute_item_wrap_template');
    var id = 'product-attribute-set-' + (Math.random() + 1).toString(36).substring(7);
    var html = $attributeItemTemplate.html();
    if (html) {
      html = html.replace('__id__', id);
    }
    var selectedValue = null;
    if ($('.list-product-attribute-items-wrap .product-attribute-set-item').length) {
      $.each($('.product-attribute-set-item .product-select-attribute-item option'), function (index, el) {
        var $el = $(el);
        var value = $el.prop('value');
        if (value !== $el.closest('select').val() && $el.prop('disabled') === false) {
          selectedValue = value;
          return false;
        }
      });
    }
    var $listDetailWrap = $('.list-product-attribute-items-wrap');
    $listDetailWrap.append(html);
    var $attributeSet = $('#' + id).find('.product-select-attribute-item');
    $attributeSet.select2({
      data: productAttributeSets.map(function (item) {
        return {
          id: item.id,
          text: item.title
        };
      })
    });
    if (selectedValue) {
      $attributeSet.val(selectedValue).trigger('change');
    } else {
      $attributeSet.trigger('change');
    }
    if ($listDetailWrap.find('.product-attribute-set-item').length == productAttributeSets.length) {
      $('.btn-trigger-add-attribute-item').hide();
    }
  };
  $(document).on('click', '.btn-trigger-add-attribute-item', function (event) {
    event.preventDefault();
    addAttributeSet();
    $('.product-set-item-delete-action').show();
    handleChangeAttributeSet();
  });
  $(document).on('click', '.product-set-item-delete-action button', function (event) {
    event.preventDefault();
    $(event.currentTarget).closest('.product-attribute-set-item').remove();
    var totalAttributeSets = $('.list-product-attribute-items-wrap .product-attribute-set-item').length;
    if (totalAttributeSets < 2) {
      $('.product-set-item-delete-action').hide();
    } else if (totalAttributeSets < productAttributeSets.length) {
      $('.btn-trigger-add-attribute-item').show();
    }
    handleChangeAttributeSet();
  });
  if (typeof RvMediaStandAlone != 'undefined') {
    new RvMediaStandAlone('.images-wrapper .btn-trigger-edit-product-image', {
      filter: 'image',
      view_in: 'all_media',
      onSelectFiles: function onSelectFiles(files, $el) {
        var firstItem = _.first(files);
        var $currentBox = $el.closest('.product-image-item-handler').find('.image-box');
        var $currentBoxList = $el.closest('.list-gallery-media-images');
        $currentBox.find('.image-data').val(firstItem.url);
        $currentBox.find('.preview_image').attr('src', firstItem.thumb).show();
        _.forEach(files, function (file, index) {
          if (!index) {
            return;
          }
          var template = $(document).find('#product_select_image_template').html();
          var imageBox = template.replace(/__name__/gi, $currentBox.find('.image-data').attr('name'));
          var $template = $('<li class="product-image-item-handler">' + imageBox + '</li>');
          $template.find('.image-data').val(file.url);
          $template.find('.preview_image').attr('src', file.thumb).show();
          $currentBoxList.append($template);
        });
      }
    });
  }
  $(document).on('click', '.btn-trigger-remove-product-image', function (event) {
    event.preventDefault();
    $(event.currentTarget).closest('.product-image-item-handler').remove();
    if ($('.list-gallery-media-images').find('.product-image-item-handler').length === 0) {
      $('.default-placeholder-product-image').show();
    }
  });
  $(document).on('click', '.list-search-data .selectable-item', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    var templateName = _self.closest('.box-search-advance').data('template');
    var $input = _self.closest('.box-search-advance').find('input[type=hidden]');
    if ($input.length && templateName !== 'selected-cross-sell-product-list-template') {
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
      }
    }
    var template = $(document).find("#".concat(templateName)).html();
    var productItem = template.replace(/__name__/gi, _self.data('name')).replace(/__id__/gi, _self.data('id')).replace(/__url__/gi, _self.data('url')).replace(/__image__/gi, _self.data('image')).replace(/__attributes__/gi, _self.find('a span').text());
    _self.closest('.box-search-advance').find('.list-selected-products').show();
    _self.closest('.box-search-advance').find('.list-selected-products').append(productItem);
    _self.closest('.card').hide();
  });
  $(document).on('click', '[data-bb-toggle="product-search-advanced"]', function (event) {
    var _self = $(event.currentTarget);
    var $formBody = _self.closest('.box-search-advance').find('.card');
    $formBody.show();
    $formBody.addClass('active');
    if ($formBody.find('.card-body').length === 0) {
      Botble.showLoading($formBody);
      $.ajax({
        url: _self.data('bb-target'),
        type: 'GET',
        success: function success(res) {
          if (res.error) {
            Botble.showError(res.message);
          } else {
            $formBody.html(res.data);
          }
        },
        error: function error(data) {
          Botble.handleError(data);
        },
        complete: function complete() {
          Botble.hideLoading($formBody);
        }
      });
    }
  });
  var ajaxRequest;
  var hasAjaxSearchRequested = false;
  $(document).on('keyup', '[data-bb-toggle="product-search-advanced"]', function (event) {
    event.preventDefault();
    var _self = $(event.currentTarget);
    var $formBody = _self.closest('.box-search-advance').find('.card');
    setTimeout(function () {
      Botble.showLoading($formBody);
      if (hasAjaxSearchRequested) {
        ajaxRequest.abort();
      }
      hasAjaxSearchRequested = true;
      ajaxRequest = $.ajax({
        url: _self.data('bb-target'),
        data: {
          keyword: _self.val()
        },
        type: 'GET',
        success: function success(res) {
          if (res.error) {
            Botble.showError(res.message);
          } else {
            $formBody.html(res.data);
          }
          hasAjaxSearchRequested = false;
        },
        error: function error(data) {
          if (data.statusText !== 'abort') {
            Botble.handleError(data);
          }
        },
        complete: function complete() {
          Botble.hideLoading($formBody);
        }
      });
    }, 500);
  });
  $(document).on('click', '.box-search-advance .page-link', function (event) {
    event.preventDefault();
    var $searchBox = $(event.currentTarget).closest('.box-search-advance').find('[data-bb-toggle="product-search-advanced"]');
    if (!$searchBox.closest('.page-item').hasClass('disabled') && $searchBox.data('bb-target')) {
      var $formBody = $searchBox.closest('.box-search-advance').find('.card');
      Botble.showLoading($formBody);
      $.ajax({
        url: $(event.currentTarget).prop('href'),
        data: {
          keyword: $searchBox.val()
        },
        type: 'GET',
        success: function success(res) {
          if (res.error) {
            Botble.showError(res.message);
          } else {
            $formBody.html(res.data);
          }
        },
        error: function error(data) {
          Botble.handleError(data);
        },
        complete: function complete() {
          Botble.hideLoading($formBody);
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
  var loadRelationBoxes = function loadRelationBoxes() {
    var $wrapBody = $('.wrap-relation-product');
    if ($wrapBody.length) {
      Botble.showLoading($wrapBody);
      $.ajax({
        url: $wrapBody.data('target'),
        type: 'GET',
        success: function success(res) {
          if (res.error) {
            Botble.showError(res.message);
          } else {
            $wrapBody.html(res.data);
            Botble.initResources();
          }
        },
        error: function error(data) {
          Botble.handleError(data);
        },
        complete: function complete() {
          Botble.hideLoading($wrapBody);
        }
      });
    }
  };
  $(function () {
    loadRelationBoxes();
  });
  $(document).on('click', '.digital_attachments_btn', function (e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    var $box = $this.closest('.product-type-digital-management');
    var $inputFile = $box.find('input[type=file]').last();
    $inputFile.trigger('click');
  });
  $(document).on('change', 'input[name^=product_files_input]', function (e) {
    var $this = $(e.currentTarget);
    var file = $this[0].files[0];
    if (file) {
      var $box = $this.closest('.product-type-digital-management');
      var id = $this.data('id');
      var $template = $('#digital_attachment_template').html();
      $template = $template.replace(/__id__/gi, id).replace(/__file_name__/gi, file.name).replace(/__file_size__/gi, humanFileSize(file.size));
      var newId = Math.floor(Math.random() * 26) + Date.now();
      $box.find('table tbody').append($template);
      $box.find('.digital_attachments_input').append("<input type=\"file\" name=\"product_files_input[]\" data-id=\"".concat(newId, "\">"));
    }
  });
  $(document).on('change', 'input.digital-attachment-checkbox', function (e) {
    var $this = $(e.currentTarget);
    var $tr = $this.closest('tr');
    if ($this.is(':checked')) {
      $tr.removeClass('detach');
    } else {
      $tr.addClass('detach');
    }
  });
  $(document).on('click', '.remove-attachment-input', function (e) {
    var $this = $(e.currentTarget);
    var $tr = $this.closest('tr');
    var id = $tr.data('id');
    $('input[data-id=' + id + ']').remove();
    $tr.fadeOut(300, function () {
      $(this).remove();
    });
  });
  $(document).on('click', '.digital_attachments_external_btn', function (e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    var $box = $this.closest('.product-type-digital-management');
    var id = Math.floor(Math.random() * 26) + Date.now();
    var $template = $('#digital_attachment_external_template').html();
    $template = $template.replace(/__id__/gi, id);
    $box.find('table tbody').append($template);
  });

  /**
   * Format bytes as human-readable text.
   *
   * @param bytes Number of bytes.
   * @param si True to use metric (SI) units, aka powers of 1000. False to use
   *           binary (IEC), aka powers of 1024.
   * @param dp Number of decimal places to display.
   *
   * @return Formatted string.
   */
  function humanFileSize(bytes) {
    var si = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var dp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    var r = Math.pow(10, dp);
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return Botble.numberFormat(bytes, dp, ',', '.') + ' ' + units[u];
  }
  $(document).on('click', '.btn-trigger-duplicate-product', function (e) {
    $('#confirm-duplicate-product-button').data('url', $(e.currentTarget).data('url'));
    $('#duplicate-product-modal').modal('show');
  }).on('click', '#confirm-duplicate-product-button', function (e) {
    var button = $(e.currentTarget);
    $.ajax({
      url: button.data('url'),
      type: 'POST',
      beforeSend: function beforeSend() {
        button.prop('disabled', true);
        button.addClass('button-loading');
      },
      success: function success(_ref2) {
        var error = _ref2.error,
          message = _ref2.message,
          data = _ref2.data;
        if (error) {
          Botble.showError(message);
          return;
        }
        Botble.showSuccess(message);
        $('#duplicate-product-modal').modal('hide');
        setTimeout(function () {
          return window.location.href = data.next_url;
        }, 1000);
      },
      error: function error(_error) {
        Botble.handleError(_error);
      },
      complete: function complete() {
        button.removeClass('button-loading');
        button.prop('disabled', false);
      }
    });
  });
});
/******/ })()
;