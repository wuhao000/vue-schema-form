import { getMessage } from "../message";
import { format, isEmpty } from "../utils";
export var isValidateEmpty = function isValidateEmpty(value) {
  if (typeof value === 'object' && !(value instanceof Date)) {
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