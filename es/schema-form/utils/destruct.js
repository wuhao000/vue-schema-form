import { getDefaultValue } from "./utils";
export function getStructValue(parentValue, struct, vue, field) {
  if (field === void 0) {
    field = null;
  }

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
  } else if (typeof struct === 'object') {
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