var isType = function isType(type) {
  return function (obj) {
    return obj != null && Object.prototype.toString.call(obj) === "[object " + type + "]";
  };
}; // FIXME: isFn, isArr is incorrect


export var isFn = isType('Function');
export var isArr = Array.isArray || isType('Array');
export var isPlainObj = isType('Object');
export var isStr = isType('String');
export var isBool = isType('Boolean');
export var isNum = isType('Number');
export var isObj = function isObj(val) {
  return typeof val === 'object';
};
export var isRegExp = isType('RegExp');