import { isArr, isObj, isStr } from "../types";
export var toArr = function toArr(val) {
  return isArr(val) ? val : val ? [val] : [];
};
export function each(val, iterator, revert) {
  if (isArr(val) || isStr(val)) {
    if (revert) {
      for (var i = val.length - 1; i >= 0; i--) {
        if (iterator(val[i], i) === false) {
          return;
        }
      }
    } else {
      for (var _i = 0, length = val.length; _i < length; _i++) {
        if (iterator(val[_i], _i) === false) {
          return;
        }
      }
    }
  } else if (isObj(val)) {
    var _key;

    for (_key in val) {
      if (Object.hasOwnProperty.call(val, _key)) {
        if (iterator(val[_key], _key) === false) {
          return;
        }
      }
    }
  }
}
export function map(val, iterator, revert) {
  var res = isArr(val) || isStr(val) ? [] : {};
  each(val, function (item, key) {
    var value = iterator(item, key);

    if (isArr(res)) {
      res.push(value);
    } else {
      res[key] = value;
    }
  }, revert);
  return res;
}
export function reduce(val, iterator, accumulator, revert) {
  var result = accumulator;
  each(val, function (item, key) {
    result = iterator(result, item, key);
  }, revert);
  return result;
}
export function every(val, iterator, revert) {
  var res = true;
  each(val, function (item, key) {
    if (!iterator(item, key)) {
      res = false;
      return false;
    }
  }, revert);
  return res;
}
export function some(val, iterator, revert) {
  var res = false;
  each(val, function (item, key) {
    if (iterator(item, key)) {
      res = true;
      return false;
    }
  }, revert);
  return res;
}
export function findIndex(val, iterator, revert) {
  var res = -1;
  each(val, function (item, key) {
    if (iterator(item, key)) {
      res = key;
      return false;
    }
  }, revert);
  return res;
}
export function find(val, iterator, revert) {
  var res;
  each(val, function (item, key) {
    if (iterator(item, key)) {
      res = item;
      return false;
    }
  }, revert);
  return res;
}
export function includes(val, searchElement, revert) {
  return some(val, function (item) {
    return item === searchElement;
  }, revert);
}