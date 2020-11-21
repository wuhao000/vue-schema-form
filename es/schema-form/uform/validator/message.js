function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { getIn, each, globalThisPolyfill } from "./utils";
import locales from "./locale";
var self = globalThisPolyfill;

var getBrowserlanguage = function getBrowserlanguage() {
  if (!self.navigator) {
    return 'en';
  }

  return self.navigator.browserlanguage || self.navigator.language || 'en';
};

var LOCALE = {
  messages: {},
  lang: getBrowserlanguage()
};

var getMatchLang = function getMatchLang(lang) {
  var find = LOCALE.lang;
  each(LOCALE.messages, function (messages, key) {
    if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
      find = key;
      return false;
    }
  });
  return find;
};

export var setLocale = function setLocale(locale) {
  _extends(LOCALE.messages, locale);
};
export var setLanguage = function setLanguage(lang) {
  LOCALE.lang = lang;
};
export var getMessage = function getMessage(path) {
  return getIn(LOCALE.messages, "".concat(getMatchLang(LOCALE.lang), ".").concat(path)) || 'field is not valid,but not found error message.';
};
setLocale(locales);