import { isObj, isStr, isFn } from '../utils';
import formatValidate from './format';
import requiredValidate from './required';
import patternValidate from './pattern';
import customValidate from './custom';
/*
 * rule : {
     format:"",
 *   required:true,
 *   message:"",
 *   pattern:"",
 *   validator(value,rule,callback,values){
 *   }
 * }
 *
**/

var batchInvoke = function batchInvoke() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.map(function (fn) {
      return Promise.resolve(fn.apply(void 0, args));
    });
  };
};

var batchValidate = function batchValidate(value, rule, values, name) {
  return Promise.all(batchInvoke(formatValidate, requiredValidate, patternValidate, customValidate)(value, rule, values, name));
};

export var validate = function validate(value, rule, values, name) {
  var newRule = isObj(rule) ? rule : isStr(rule) ? {
    format: rule
  } : isFn(rule) ? {
    validator: rule
  } : {};
  return batchValidate(value, newRule, values, name);
};