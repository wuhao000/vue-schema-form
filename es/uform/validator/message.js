import _extends from "@babel/runtime/helpers/esm/extends";
import { getIn, each, globalThisPolyfill } from './utils';
import locales from './locale';
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