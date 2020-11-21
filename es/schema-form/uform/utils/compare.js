function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { isArr, isFn } from "../types";
var isArray = isArr;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

/* eslint-disable */
function equal(a, b, filter) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) {
    return true;
  }

  if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
    var arrA = isArray(a);
    var arrB = isArray(b);
    var i;
    var length;

    var _key;

    if (arrA && arrB) {
      length = a.length;

      if (length !== b.length) {
        return false;
      }

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i], filter)) {
          return false;
        }
      }

      return true;
    }

    if (arrA !== arrB) {
      return false;
    }

    var dateA = a instanceof Date;
    var dateB = b instanceof Date;

    if (dateA !== dateB) {
      return false;
    }

    if (dateA && dateB) {
      return a.getTime() === b.getTime();
    }

    var regexpA = a instanceof RegExp;
    var regexpB = b instanceof RegExp;

    if (regexpA !== regexpB) {
      return false;
    }

    if (regexpA && regexpB) {
      return a.toString() === b.toString();
    }

    var urlA = a instanceof URL;
    var urlB = b instanceof URL;

    if (urlA && urlB) {
      return a.href === b.href;
    }

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) {
      return false;
    }

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) {
        return false;
      }
    } // end fast-deep-equal
    // Custom handling for React


    for (i = length; i-- !== 0;) {
      _key = keys[i];

      if (_key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        if (isFn(filter)) {
          if (filter({
            a: a[_key],
            b: b[_key]
          }, _key)) {
            if (!equal(a[_key], b[_key], filter)) {
              return false;
            }
          }
        } else {
          // all other properties should be traversed as usual
          if (!equal(a[_key], b[_key], filter)) {
            return false;
          }
        }
      }
    } // fast-deep-equal index.js 2.0.1


    return true;
  }

  if (a && b && typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }

  return a !== a && b !== b;
} // end fast-deep-equal


export var isEqual = function exportedEqual(a, b, filter) {
  try {
    return equal(a, b, filter);
  } catch (error) {
    var _error$message;

    if (((_error$message = error.message) === null || _error$message === void 0 ? void 0 : _error$message.match(/stack|recursion/i)) || error.number === -2146828260) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
};