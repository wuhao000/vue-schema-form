function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isArr, isNum, isObj, isPlainObj, isStr } from "../types";
import { each, every, map } from "./array";
import { LRUMap } from "./lru";

function whitespace(c) {
  return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
}

function toString(val) {
  if (!val) {
    return '';
  }

  if (isArr(val)) {
    return val.join('.');
  }

  return isStr(val) ? val : '';
}

var PathCache = new LRUMap(1000);
export function getPathSegments(path) {
  if (isArr(path)) {
    return path;
  }

  if (isStr(path) && path) {
    var cached = PathCache.get(path);

    if (cached) {
      return cached;
    }

    var pathArr = path.split('.');
    var parts = [];

    for (var i = 0; i < pathArr.length; i++) {
      var p = pathArr[i];

      while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
        p = p.slice(0, -1) + '.';
        p += pathArr[++i];
      }

      parts.push(p);
    }

    PathCache.set(path, parts);
    return parts;
  }

  if (isNum(path)) {
    return [path];
  }

  return [];
}

var DestructTokenizer = /*#__PURE__*/function () {
  function DestructTokenizer(text, handlers) {
    _defineProperty(this, "EOF", void 0);

    _defineProperty(this, "declareNameEnd", void 0);

    _defineProperty(this, "declareNameStart", void 0);

    _defineProperty(this, "destructKey", void 0);

    _defineProperty(this, "destructKeyStart", void 0);

    _defineProperty(this, "handlers", void 0);

    _defineProperty(this, "index", void 0);

    _defineProperty(this, "nbraceCount", void 0);

    _defineProperty(this, "nbracketCount", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "text", void 0);

    this.text = text;
    this.index = 0;
    this.handlers = handlers;
    this.state = this.processNameStart;
    this.declareNameStart = 0;
    this.declareNameEnd = 0;
    this.nbraceCount = 0;
    this.nbracketCount = 0;
  }

  var _proto = DestructTokenizer.prototype;

  _proto.parse = function parse() {
    var char = '';
    var prev = '';
    var l = this.text.length;

    for (; this.index < l; this.index++) {
      char = this.text.charAt(this.index);
      this.EOF = l - 1 === this.index;
      this.state(char, prev);
      prev = char;
    }
  };

  _proto.getName = function getName() {
    return this.text.substring(this.declareNameStart, this.declareNameEnd);
  };

  _proto.processDestructKey = function processDestructKey(char, prev) {
    if (char === '}') {
      this.nbraceCount--;

      if (this.nbraceCount || this.nbracketCount) {
        this.state = this.processDestructStart;
      }

      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(this.destructKeyStart, this.index);
      }

      this.handlers.destructKey(this.destructKey);
      this.handlers.destructObjectEnd();

      if (!this.nbraceCount && !this.nbracketCount) {
        this.index = this.text.length;
      }
    } else if (char === ']') {
      this.nbracketCount--;

      if (this.nbraceCount || this.nbracketCount) {
        this.state = this.processDestructStart;
      }

      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(this.destructKeyStart, this.index);
      }

      this.handlers.destructKey(this.destructKey);
      this.handlers.destructArrayEnd();

      if (!this.nbraceCount && !this.nbracketCount) {
        this.index = this.text.length;
      }
    } else if (whitespace(char) || char === ':' || char === ',') {
      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(this.destructKeyStart, this.index);
      }

      if (!whitespace(char)) {
        this.state = this.processDestructStart;
        this.handlers.destructKey(this.destructKey, char === ':');
      }
    }
  };

  _proto.processDestructStart = function processDestructStart(char) {
    if (char === '{') {
      this.nbraceCount++;
      this.handlers.destructObjectStart();
    } else if (char === '[') {
      this.nbracketCount++;
      this.handlers.destructArrayStart();
    } else if (!whitespace(char)) {
      this.state = this.processDestructKey;
      this.destructKeyStart = this.index;
      this.index--;
    }
  };

  _proto.processName = function processName(char, prev) {
    if (whitespace(char)) {
      this.declareNameEnd = this.index;
      this.handlers.name(this.getName());
    } else if (this.EOF) {
      this.declareNameEnd = this.index + 1;
      this.handlers.name(this.getName());
    }
  };

  _proto.processNameStart = function processNameStart(char) {
    if (char === '{' || char === '[') {
      this.state = this.processDestructStart;
      this.index--;
    } else if (!whitespace(char)) {
      this.declareNameStart = this.index;
      this.state = this.processName;
    }
  };

  return DestructTokenizer;
}();

var parseDestruct = function parseDestruct(str) {
  if (!isStr(str)) {
    return str;
  }

  var destruct;
  var stack = [];
  var token = '';
  var realKey = '';
  var lastDestruct;
  var root;
  new DestructTokenizer(str, {
    name: function name(key) {
      root = key;
    },
    destructKey: function destructKey(key, readyReplace) {
      if (!key) {
        return;
      }

      token = key;

      if (readyReplace) {
        realKey = key;
        lastDestruct = destruct;
        return;
      }

      if (isArr(destruct)) {
        destruct.push(key);
      } else if (isPlainObj(destruct)) {
        destruct[realKey && lastDestruct === destruct ? realKey : key] = key;
      }

      realKey = '';
      lastDestruct = destruct;
    },
    destructArrayStart: function destructArrayStart() {
      if (!destruct) {
        root = [];
        destruct = root;
      } else {
        destruct = [];
      }

      var tail = stack[stack.length - 1];

      if (isPlainObj(tail)) {
        tail[token] = destruct;
      } else if (isArr(tail)) {
        tail.push(destruct);
      }

      stack.push(destruct);
    },
    destructObjectStart: function destructObjectStart() {
      if (!destruct) {
        root = {};
        destruct = root;
      } else {
        destruct = {};
      }

      var tail = stack[stack.length - 1];

      if (isPlainObj(tail)) {
        tail[token] = destruct;
      } else if (isArr(tail)) {
        tail.push(destruct);
      }

      stack.push(destruct);
    },
    destructArrayEnd: function destructArrayEnd() {
      stack.pop();
      destruct = stack[stack.length - 1];
    },
    destructObjectEnd: function destructObjectEnd() {
      stack.pop();
      destruct = stack[stack.length - 1];
    }
  }).parse();
  return root;
};

var traverse = function traverse(obj, callback) {
  var internalTraverse = function internalTraverse(internalObj, path) {
    if (isStr(internalObj)) {
      return callback(internalObj, internalObj);
    }

    each(internalObj, function (item, key) {
      var newPath = path.concat(key);

      if (isArr(item) || isPlainObj(item)) {
        internalTraverse(item, newPath);
      } else {
        callback(newPath, item);
      }
    });
  };

  return internalTraverse(obj, []);
};

var mapReduce = function mapReduce(obj, callback) {
  var internalTraverse = function internalTraverse(internalObj, path) {
    return map(internalObj, function (item, key) {
      var newPath = path.concat(key);

      if (isArr(item) || isPlainObj(item)) {
        return internalTraverse(item, newPath);
      } else {
        return callback(newPath, newPath.slice(0, newPath.length - 1).concat(item));
      }
    });
  };

  return internalTraverse(obj, []);
};

var parseDestructPath = function parseDestructPath(path) {
  var newPath = getPathSegments(path);
  var lastKey = newPath[newPath.length - 1];
  var startPath = newPath.slice(0, newPath.length - 1);
  var destruct = parseDestruct(lastKey);
  return {
    path: newPath,
    lastKey: lastKey,
    startPath: startPath,
    destruct: destruct === undefined ? lastKey : destruct
  };
};

var parsePaths = function parsePaths(path) {
  var result = [];
  var parsed = parseDestructPath(path);

  if (isStr(parsed.destruct)) {
    return path;
  } else if (parsed.destruct) {
    traverse(parsed.destruct, function (internalPath, key) {
      result.push({
        path: parsed.startPath.concat(internalPath),
        startPath: parsed.startPath,
        endPath: internalPath,
        key: key
      });
    });
    return result;
  } else {
    return path;
  }
};

var resolveGetIn = function resolveGetIn(get) {
  var cache = new Map();
  return function (obj, path, value) {
    var ast = null;

    if (!cache.get(path)) {
      ast = parseDestructPath(path);
      cache.set(path, ast);
    } else {
      ast = cache.get(path);
    }

    if (!isArr(ast.destruct) && !isPlainObj(ast.destruct)) {
      return get(obj, path, value);
    }

    return mapReduce(ast.destruct, function (mapPath, key) {
      return get(obj, ast.startPath.concat(key[key.length - 1]));
    });
  };
};

var resolveUpdateIn = function resolveUpdateIn(update, internalGetIn) {
  var cache = new Map();
  return function (obj, path, value, getSchema) {
    var paths = [];

    if (!cache.get(path)) {
      paths = parsePaths(path);
      cache.set(path, paths);
    } else {
      paths = cache.get(path);
    }

    if (!isArr(paths)) {
      return update(obj, path, value, getSchema);
    }

    if (paths && paths.length) {
      each(paths, function (_ref) {
        var mapPath = _ref.mapPath,
            key = _ref.key,
            startPath = _ref.startPath,
            endPath = _ref.endPath;
        update(obj, startPath.concat(key), internalGetIn(value, endPath), getSchema);
      });
    }

    return obj;
  };
};

var resolveExistIn = function resolveExistIn(has) {
  var cache = new Map();
  return function (obj, path) {
    var paths = [];

    if (!cache.get(path)) {
      paths = parsePaths(path);
      cache.set(path, paths);
    } else {
      paths = cache.get(path);
    }

    if (!isArr(paths)) {
      return has(obj, path);
    }

    if (paths && paths.length) {
      return every(paths, function (_ref2) {
        var startPath = _ref2.startPath,
            key = _ref2.key;
        return has(obj, startPath.concat(key));
      });
    }

    return false;
  };
};

function _getIn(obj, path, value) {
  if (!isObj(obj) || !path) {
    return obj;
  }

  var copyPath = toString(path);

  if (copyPath in obj) {
    return obj[copyPath];
  }

  var copyObj = obj;
  var pathArr = getPathSegments(copyPath);

  for (var i = 0; i < pathArr.length; i++) {
    if (!Object.prototype.propertyIsEnumerable.call(copyObj, pathArr[i])) {
      return value;
    }

    copyObj = copyObj[pathArr[i]];

    if (copyObj === undefined || copyObj === null) {
      // `obj` is either `undefined` or `null` so we want to stop the loop, and
      // if this is not the last bit of the path, and
      // if it did't return `undefined`
      // it would return `null` if `obj` is `null`
      // but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
      if (i !== pathArr.length - 1) {
        return value;
      }

      break;
    }
  }

  return copyObj;
}

function _setIn(obj, path, value, getSchema) {
  var copyObj = obj;

  if (!isObj(copyObj) || !path) {
    return;
  }

  var copyPath = toString(path);

  if (copyPath in copyObj) {
    copyObj[copyPath] = value;
    return;
  }

  var pathArr = getPathSegments(copyPath);

  for (var i = 0; i < pathArr.length; i++) {
    var p = pathArr[i];

    if (!isObj(copyObj[p])) {
      if (copyObj[p] === undefined && value === undefined) {
        return;
      }

      if (/^\d+$/.test(pathArr[i + 1 + ''])) {
        if (getSchema) {
          var schema = getSchema(pathArr.slice(0, i));

          if (!schema || schema.type === 'array') {
            copyObj[p] = [];
          } else {
            copyObj[p] = {};
          }
        } else {
          copyObj[p] = [];
        }
      } else {
        copyObj[p] = {};
      }
    }

    if (i === pathArr.length - 1) {
      copyObj[p] = value;
    }

    copyObj = copyObj[p];
  }
}

function _deleteIn(obj, path) {
  var copyObj = obj;

  if (!isObj(copyObj) || !path) {
    return;
  }

  var copyPath = toString(path);

  if (copyPath in copyObj) {
    delete copyObj[copyPath];
    return;
  }

  var pathArr = getPathSegments(copyPath);

  for (var i = 0; i < pathArr.length; i++) {
    var p = pathArr[i];

    if (i === pathArr.length - 1) {
      if (isArr(copyObj)) {
        copyObj.splice(p, 1);
      } else {
        delete copyObj[p];
      }

      return;
    }

    copyObj = copyObj[p];

    if (!isObj(copyObj)) {
      return;
    }
  }
}

function _existIn(obj, path) {
  if (!isObj(obj) || !path) {
    return false;
  }

  var copyPath = toString(path);

  if (copyPath in obj) {
    return true;
  }

  var copyObj = obj;
  var pathArr = getPathSegments(copyPath);

  for (var i = 0; i < pathArr.length; i++) {
    if (isObj(copyObj)) {
      if (!(pathArr[i] in copyObj)) {
        return false;
      }

      copyObj = copyObj[pathArr[i]];
    } else {
      return false;
    }
  }

  return true;
}

export var getIn = resolveGetIn(_getIn);
export var setIn = resolveUpdateIn(_setIn, getIn);
export var deleteIn = resolveUpdateIn(_deleteIn, getIn);
export var existIn = resolveExistIn(_existIn);
export { parseDestructPath, parseDestruct, parsePaths };