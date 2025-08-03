/******/ (() => { // webpackBootstrap
/*!***************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/tax.js ***!
  \***************************************************************/
$(function () {
  var spinner = "<div class='w-100 text-center py-3'><div class=\"spinner-border\" role=\"status\">\n        <span class=\"visually-hidden\">Loading...</span>\n    </div></div>";
  var table = 'ecommerce-tax-rule-table';
  var _table = '#' + table;
  var $modal = $('.create-tax-rule-form-modal');
  var $modalBody = $modal.find('.modal-body');
  var $modalTitle = $modal.find('.modal-title strong');
  var resetModal = function resetModal() {
    $modalBody.html(spinner);
    $modalTitle.text('...');
  };
  var setModal = function setModal(res) {
    $modalBody.html(res.data.html);
    $modalTitle.text(res.message || '...');
  };
  $modal.on('show.bs.modal', function () {
    resetModal();
  });
  $(document).off('click', '.create-tax-rule-item').on('click', '.create-tax-rule-item', function (e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    $modal.modal('show');
    $.ajax({
      url: $this.find('[data-action=create]').data('href'),
      success: function success(res) {
        if (res.error == false) {
          setModal(res);
          Botble.initResources();
        } else {
          Botble.showError(res.message);
        }
      },
      error: function error(res) {
        Botble.handleError(res);
      }
    });
  });
  $(document).on('click', _table + ' .btn-edit-item', function (e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    $modal.modal('show');
    $.ajax({
      url: $this.prop('href'),
      success: function success(res) {
        if (res.error == false) {
          setModal(res);
          Botble.initResources();
        } else {
          Botble.showError(res.message);
        }
      },
      error: function error(res) {
        Botble.handleError(res);
      }
    });
  });
  $(document).on('submit', '#ecommerce-tax-rule-form', function (e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    $.ajax({
      url: $this.prop('action'),
      method: 'POST',
      data: $this.serializeArray(),
      success: function success(res) {
        if (res.error == false) {
          if (window.LaravelDataTables && window.LaravelDataTables[table]) {
            LaravelDataTables[table].draw();
          }
          $modal.modal('hide');
        } else {
          Botble.showError(res.message);
        }
      },
      error: function error(res) {
        Botble.handleError(res);
      }
    });
  });
});
/******/ })()
;