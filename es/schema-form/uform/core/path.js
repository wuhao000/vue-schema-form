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
    return calllback.apply(void 0, args);
  }
};