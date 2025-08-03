/******/ (() => { // webpackBootstrap
/*!************************************************************!*\
  !*** ./platform/plugins/location/resources/js/location.js ***!
  \************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Location = /*#__PURE__*/function () {
  function Location() {
    _classCallCheck(this, Location);
  }
  return _createClass(Location, [{
    key: "init",
    value: function init() {
      var country = 'select[data-type="country"]';
      var state = 'select[data-type="state"]';
      var city = 'select[data-type="city"]';
      $(document).on('change', country, function (e) {
        e.preventDefault();
        var $parent = getParent($(e.currentTarget));
        var $state = $parent.find(state);
        var $city = $parent.find(city);
        $state.find('option:not([value=""]):not([value="0"])').remove();
        $city.find('option:not([value=""]):not([value="0"])').remove();
        var $button = $(e.currentTarget).closest('form').find('button[type=submit], input[type=submit]');
        var countryId = $(e.currentTarget).val();
        if (countryId) {
          if ($state.length) {
            Location.getStates($state, countryId, $button);
            Location.getCities($city, null, $button, countryId);
          } else {
            Location.getCities($city, null, $button, countryId);
          }
        }
      });
      $(document).on('change', state, function (e) {
        e.preventDefault();
        var $parent = getParent($(e.currentTarget));
        var $city = $parent.find(city);
        if ($city.length) {
          $city.find('option:not([value=""]):not([value="0"])').remove();
          var stateId = $(e.currentTarget).val();
          var $button = $(e.currentTarget).closest('form').find('button[type=submit], input[type=submit]');
          if (stateId) {
            Location.getCities($city, stateId, $button);
          } else {
            var countryId = $parent.find(country).val();
            Location.getCities($city, null, $button, countryId);
          }
          stateFieldUsingSelect2();
        }
      });
      function stateFieldUsingSelect2() {
        if (jQuery().select2) {
          $(document).find('select[data-using-select2="true"]').each(function (index, input) {
            var options = {
              width: '100%',
              minimumInputLength: 0,
              ajax: {
                url: $(input).data('url'),
                dataType: 'json',
                delay: 250,
                type: 'GET',
                data: function data(params) {
                  return {
                    state_id: $(input).closest('form').find(state).val(),
                    k: params.term,
                    page: params.page || 1
                  };
                },
                processResults: function processResults(data, params) {
                  return {
                    results: $.map(data.data[0], function (item) {
                      return {
                        text: item.name,
                        id: item.id,
                        data: item
                      };
                    }),
                    pagination: {
                      more: params.page * 10 < data.total
                    }
                  };
                }
              }
            };
            var parent = $(input).closest('div[data-select2-dropdown-parent]') || $(input).closest('.modal');
            if (parent.length) {
              options.dropdownParent = parent;
              options.width = '100%';
              options.minimumResultsForSearch = -1;
            }
            $(input).select2(options);
          });
        }
      }
      stateFieldUsingSelect2();
      function getParent($el) {
        var $parent = $(document);
        var formParent = $el.data('form-parent');
        if (formParent && $(formParent).length) {
          $parent = $(formParent);
        }
        return $parent;
      }
    }
  }], [{
    key: "getStates",
    value: function getStates($el, countryId) {
      var $button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      $.ajax({
        url: $el.data('url'),
        data: {
          country_id: countryId
        },
        type: 'GET',
        beforeSend: function beforeSend() {
          $button && $button.prop('disabled', true);
        },
        success: function success(res) {
          if (res.error) {
            Botble.showError(res.message);
          } else {
            var options = '';
            $.each(res.data, function (index, item) {
              options += '<option value="' + (item.id || '') + '">' + item.name + '</option>';
            });
            $el.html(options);
          }
        },
        complete: function complete() {
          $button && $button.prop('disabled', false);
        }
      });
    }
  }, {
    key: "getCities",
    value: function getCities($el, stateId) {
      var $button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var countryId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      $.ajax({
        url: $el.data('url'),
        data: {
          state_id: stateId,
          country_id: countryId
        },
        type: 'GET',
        beforeSend: function beforeSend() {
          $button && $button.prop('disabled', true);
        },
        success: function success(res) {
          if (res.error) {
            Botble.showError(res.message);
          } else {
            var options = '';
            $.each(res.data, function (index, item) {
              options += '<option value="' + (item.id || '') + '">' + item.name + '</option>';
            });
            $el.html(options);
            $el.trigger('change');
          }
        },
        complete: function complete() {
          $button && $button.prop('disabled', false);
        }
      });
    }
  }]);
}();
$(function () {
  new Location().init();
});
/******/ })()
;