/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!************************************************************************!*\
  !*** ./platform/plugins/cookie-consent/resources/js/cookie-consent.js ***!
  \************************************************************************/


$(function () {
  window.botbleCookieConsent = function () {
    var COOKIE_NAME = $('div[data-site-cookie-name]').data('site-cookie-name');
    var COOKIE_DOMAIN = $('div[data-site-cookie-domain]').data('site-cookie-domain');
    var COOKIE_LIFETIME = $('div[data-site-cookie-lifetime]').data('site-cookie-lifetime');
    var SESSION_SECURE = $('div[data-site-session-secure]').data('site-session-secure');
    var $cookieDialog = $('.js-cookie-consent');
    var $cookieCategories = $('.cookie-consent__categories');
    var $customizeButton = $('.js-cookie-consent-customize');
    $cookieDialog.addClass('cookie-consent--visible');
    $cookieCategories.hide();
    function consentWithCookies() {
      var categories = {};
      $('.js-cookie-category:checked').each(function () {
        categories[$(this).val()] = true;
      });
      setCookie(COOKIE_NAME, JSON.stringify(categories), COOKIE_LIFETIME);
      hideCookieDialog();
    }
    function savePreferences() {
      consentWithCookies();
      $cookieCategories.slideUp();
      $customizeButton.removeClass('active');
    }
    function rejectAllCookies() {
      // Delete the cookie if it exists
      if (cookieExists(COOKIE_NAME)) {
        document.cookie = COOKIE_NAME + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + COOKIE_DOMAIN + '; path=/' + SESSION_SECURE;
      }

      // Update Google Analytics consent if available
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          'ad_storage': 'denied',
          'analytics_storage': 'denied'
        });
      }
      hideCookieDialog();
    }
    function cookieExists(name) {
      var cookie = getCookie(name);
      return cookie !== null && cookie !== undefined;
    }
    function getCookie(name) {
      var value = "; ".concat(document.cookie);
      var parts = value.split("; ".concat(name, "="));
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
      return null;
    }
    function hideCookieDialog() {
      $cookieDialog.hide();
    }
    function setCookie(name, value, expirationInDays) {
      var date = new Date();
      date.setTime(date.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';domain=' + COOKIE_DOMAIN + ';path=/' + SESSION_SECURE;
    }
    function toggleCustomizeView() {
      $cookieCategories.slideToggle();
      $customizeButton.toggleClass('active');
    }
    if (cookieExists(COOKIE_NAME)) {
      hideCookieDialog();
    }
    $(document).on('click', '.js-cookie-consent-agree', function () {
      consentWithCookies();
    });
    $(document).on('click', '.js-cookie-consent-reject', function () {
      rejectAllCookies();
    });
    $(document).on('click', '.js-cookie-consent-customize', function () {
      toggleCustomizeView();
    });
    $(document).on('click', '.js-cookie-consent-save', function () {
      savePreferences();
    });
    return {
      consentWithCookies: consentWithCookies,
      rejectAllCookies: rejectAllCookies,
      hideCookieDialog: hideCookieDialog,
      savePreferences: savePreferences
    };
  }();
});
/******/ })()
;