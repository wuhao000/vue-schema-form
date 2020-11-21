function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { getDefaultValue } from "./utils";
export function getStructValue(parentValue, struct, vue) {
  var field = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (Array.isArray(struct)) {
    return struct.map(function (key) {
      return getStructValue(parentValue, key, vue);
    });
  } else if (typeof struct === 'string') {
    var v = parentValue && parentValue[struct];

    if (v === undefined && field) {
      var defaultValue = getDefaultValue(field);
      vue.$set(parentValue, struct, defaultValue);
      return defaultValue;
    }

    return v;
  } else if (_typeof(struct) === 'object') {
    var value = {};
    Object.keys(struct).forEach(function (key) {
      var destructValue = struct[key];

      if (typeof destructValue === 'string') {
        value[key] = parentValue === null || parentValue === void 0 ? void 0 : parentValue[destructValue];
      } else {
        value[key] = getStructValue(parentValue, destructValue, vue);
      }
    });
    return value;
  } else {
    return parentValue;
  }
}
export function setStructValue(parentValue, struct, structValue, vue) {
  if (typeof struct === 'string') {
    vue.$set(parentValue, struct, structValue);
  } else if (Array.isArray(struct)) {
    struct.forEach(function (key, index) {
      vue.$set(parentValue, key, structValue ? structValue[index] : undefined);
    });
  } else if (struct) {
    Object.keys(struct).forEach(function (key) {
      var destructValue = struct[key];

      if (typeof destructValue === 'string') {
        vue.$set(parentValue, destructValue, structValue[key]);
      } else {
        setStructValue(parentValue, destructValue, structValue[key], vue);
      }
    });
  }
}