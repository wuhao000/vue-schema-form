function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isType = function isType(type) {
  return function (obj) {
    return obj != null && Object.prototype.toString.call(obj) === "[object ".concat(type, "]");
  };
}; // FIXME: isFn, isArr is incorrect


export var isFn = isType('Function');
export var isArr = Array.isArray || isType('Array');
export var isPlainObj = isType('Object');
export var isStr = isType('String');
export var isBool = isType('Boolean');
export var isNum = isType('Number');
export var isObj = function isObj(val) {
  return _typeof(val) === 'object';
};
export var isRegExp = isType('RegExp');