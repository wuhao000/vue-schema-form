function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import createMatcher from 'dot-match';
import { resolveFieldPath, isStr, isFn, isArr, reduce } from "./utils";

var matchWithFilter = function matchWithFilter(result, filter, payload) {
  if (isFn(filter)) {
    return result && filter(payload);
  }

  return result;
};

var wildcardRE = /\*/;
export var FormPath = {
  match: function match(pattern, isRealPath, filter) {
    pattern = pattern + '';
    var match = createMatcher(pattern);

    if (isFn(isRealPath)) {
      filter = isRealPath;
      isRealPath = false;
    }

    var matcher = function matcher(payload) {
      if (payload && payload.fieldState) {
        return matchWithFilter(match(resolveFieldPath(isRealPath ? payload.fieldState.path : payload.fieldState.name)), filter, payload.fieldState);
      } else if (payload && payload.name && payload.path) {
        return matchWithFilter(match(resolveFieldPath(isRealPath ? payload.path : payload.name)), filter, payload);
      } else if (isStr(payload)) {
        return matchWithFilter(match(resolveFieldPath(payload)), filter, {
          name: payload
        });
      } else if (isArr(payload)) {
        return matchWithFilter(match(payload), filter, {
          path: payload
        });
      }

      return false;
    };

    matcher.hasWildcard = wildcardRE.test(pattern);
    matcher.pattern = pattern;
    return matcher;
  },
  exclude: function exclude(matcher) {
    return function (path) {
      return isFn(matcher) ? !matcher(path) : isStr(matcher) ? !FormPath.match(matcher)(path) : false;
    };
  },
  transform: function transform(path, regexp, calllback) {
    var args = reduce(resolveFieldPath(path), function (buf, key) {
      return new RegExp(regexp).test(key) ? buf.concat(key) : buf;
    }, []);
    return calllback.apply(void 0, _toConsumableArray(args));
  }
};