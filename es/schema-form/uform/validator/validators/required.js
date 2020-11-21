function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { getMessage } from "../message";
import { format, isEmpty } from "../utils";
export var isValidateEmpty = function isValidateEmpty(value) {
  if (_typeof(value) === 'object' && !(value instanceof Date)) {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (!isValidateEmpty(value[key])) {
          return false;
        }
      }
    }

    return true;
  } else {
    return isEmpty(value);
  }
};
export default (function (value, rule, values, name) {
  if (rule.required) {
    return isValidateEmpty(value) ? format(rule.message || getMessage('required'), name) : '';
  }
});