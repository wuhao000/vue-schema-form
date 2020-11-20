import { isFn } from '../types';
import { globalThisPolyfill } from './globalThis';
var NATIVE_KEYS = [['Map', function (map) {
  return new Map(map);
}], ['WeakMap', function (map) {
  return new WeakMap(map);
}], ['WeakSet', function (set) {
  return new WeakSet(set);
}], ['Set', function (set) {
  return new Set(set);
}], ['Date', function (date) {
  return new Date(date);
}], 'FileList', 'File', 'URL', 'RegExp', ['Promise', function (promise) {
  return new Promise(function (resolve, reject) {
    return promise.then(resolve, reject);
  });
}]];

var isNativeObject = function isNativeObject(values) {
  for (var i = 0; i < NATIVE_KEYS.length; i++) {
    var item = NATIVE_KEYS[i];

    if (Array.isArray(item) && item[0]) {
      if (globalThisPolyfill[item[0]] && values instanceof globalThisPolyfill[item[0]]) {
        return item[1] ? item[1] : item[0];
      }
    } else {
      if (globalThisPolyfill[item] && values instanceof globalThisPolyfill[item]) {
        return item;
      }
    }
  }
};

export var clone = function clone(values, filter) {
  if (values === null || values === undefined) {
    return values;
  }

  var nativeClone;

  if (Array.isArray(values)) {
    return values;
  } else if (isNativeObject(values)) {
    nativeClone = isNativeObject(values);
    return isFn(nativeClone) ? nativeClone(values) : values;
  } else {
    return values;
  }
};