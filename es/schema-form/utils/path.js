var CACHE = {};
export var PATH_SEPARATOR = '.';
export var splitPath = function splitPath(path) {
  if (CACHE[path]) {
    return CACHE[path];
  } else {
    return path.split(PATH_SEPARATOR);
  }
};
export function match(paths, fields) {
  return paths.map(function (it) {
    if (typeof it === 'string') {
      return matchSinglePath(it, fields);
    } else {
      var field = findFieldPath(it, fields);
      return field ? [field] : [];
    }
  }).flat();
}
export function findFieldPath(def, fields) {
  var field = Object.values(fields).find(function (it) {
    return it.id === def.id;
  });
  return field && field.plainPath;
}
export function replaceLastPath(paths, last) {
  return paths.map(function (it) {
    var splits = splitPath(it);
    splits.splice.apply(splits, [splits.length - last.length, last.length].concat(last));
    return splits.join(PATH_SEPARATOR);
  });
}
export function appendPath(paths, suffix) {
  if (paths) {
    return paths.map(function (path) {
      return path + PATH_SEPARATOR + suffix;
    });
  } else {
    return [suffix];
  }
}
export function takePath(paths, to) {
  return paths.map(function (path) {
    return splitPath(path).slice(0, to).join(PATH_SEPARATOR);
  });
}
export function isPathMatchPatterns(field, patterns) {
  return patterns.some(function (it) {
    return isPathMatchPattern(field, it);
  });
}
export function isFuzzyPath(path) {
  return typeof path === 'string' && (path.includes('*') || path.includes('?'));
}

function isPathMatchPattern(origin, pattern) {
  if (isFuzzyPath(pattern)) {
    return matchPath(splitPath(pattern), splitPath(origin.plainPath));
  } else {
    if (pattern.startsWith('#')) {
      var id = pattern.substr(1);
      return origin.id === id;
    } else {
      return origin.plainPath === pattern;
    }
  }
}

export function matchSinglePath(path, fields) {
  if (isFuzzyPath(path)) {
    if (path.startsWith('#')) {
      throw new Error('ID匹配不允许包含模糊匹配字符');
    }

    var sp = splitPath(path);
    return Object.keys(fields).filter(function (it) {
      return matchPath(sp, splitPath(it));
    });
  } else {
    if (path.startsWith('#')) {
      var id = path.substr(1);
      return Object.keys(fields).filter(function (p) {
        return fields[p].id === id;
      });
    }

    if (!!fields[path]) {
      return [path];
    }

    return [];
  }
}

function matchPath(origin, path) {
  if (origin.length) {
    if (origin[0] === path[0] || origin[0] === '?' && !!path[0]) {
      return matchPath(origin.slice(1), path.slice(1));
    } else {
      return origin.length === 1 && origin[0] === '*' && path.length > 0;
    }
  } else if (origin.length === 0 && path.length === 0) {
    return true;
  }

  return false;
}