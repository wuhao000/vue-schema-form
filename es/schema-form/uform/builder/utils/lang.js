function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { parseDestructPath } from "../../utils";
import moment from 'moment';
import Arg from "./arg";
export var isType = function isType(type) {
  return function (obj) {
    return obj != null && Object.prototype.toString.call(obj) === "[object " + type + "]";
  };
};
export var isFn = isType('Function');
export var isArray = Array.isArray || isType('Array');
export var isObj = isType('Object');
export var isStr = isType('String');
export var isNum = isType('Number');
export var isIter = function isIter(obj) {
  return isArray(obj) || isObj(obj);
};

var replaceSingleDefault = function replaceSingleDefault(v) {
  if (!isFlagValue(v)) {
    return v;
  }

  var type = v.type,
      flag = v.flag,
      value = v.value;
  var now = moment(Date.now());
  var params = Arg.all();

  if (flag === 'weekRange') {
    if (type === 'pastStart') {
      return now.subtract(value, 'weeks').format('YYYY-MM-DD');
    } else if (type === 'future') {
      return now.add(value, 'weeks').format('YYYY-MM-DD');
    } else if (type === 'specify') {
      return value;
    }
  } else if (flag === 'date') {
    if (type === 'past') {
      return now.subtract(value, 'days').format('YYYY-MM-DD');
    } else if (type === 'future') {
      return now.add(value, 'days').format('YYYY-MM-DD');
    } else if (type === 'now') {
      return now.format('YYYY-MM-DD');
    } else if (type === 'specify') {
      return value;
    } else if (type === 'url') {
      return params[value];
    }
  } else if (flag === 'time') {
    if (type === 'specify') {
      return value;
    } else if (type === 'now') {
      return now.format('HH:MM:SS');
    } else if (type === 'url') {
      return params[value];
    }
  } else if (flag === 'month') {
    if (type === 'past') {
      return now.subtract(value, 'months').format('YYYY-MM');
    } else if (type === 'future') {
      return now.add(value, 'months').format('YYYY-MM');
    } else if (type === 'now') {
      return now.format('YYYY-MM');
    } else if (type === 'specify') {
      return value;
    } else if (type === 'url') {
      return params[value];
    }
  } else if (type === 'specify') {
    return value;
  } else if (type === 'url') {
    return params[value];
  }
};

var replaceDefault = function replaceDefault(declaredValue) {
  if (isArray(declaredValue)) {
    var v = [];

    for (var i = 0; i < declaredValue.length; i++) {
      var _v = replaceSingleDefault(declaredValue[i]);

      v.push(_v);
    }

    return v;
  } else {
    return replaceSingleDefault(declaredValue);
  }
};

var isFlagValue = function isFlagValue(o) {
  if (isArray(o)) {
    return o.some(function (i) {
      return isObj(i) && typeof i.flag !== 'undefined';
    });
  } else {
    return isObj(o) && typeof o.flag !== 'undefined';
  }
};

export var getDefault = function getDefault(v, path) {
  var dPath = parseDestructPath(path).destruct || path;

  if (isArray(v) && isArray(dPath)) {
    return v.map(function (i) {
      if (isFlagValue(i)) {
        i = replaceDefault(i);
      }

      return i;
    });
  } else if (isFlagValue(v)) {
    return replaceDefault(v);
  } else {
    return v;
  }
};

var normalizeDefault = function normalizeDefault(properties, _buf) {
  if (_buf === void 0) {
    _buf = {};
  }

  return Object.keys(properties).reduce(function (buf, k) {
    if (properties[k].properties && Object.keys(properties[k].properties).length) {
      buf[k] = _extends({
        type: 'object',
        properties: {}
      }, properties[k]);
      normalizeDefault(properties[k].properties, buf[k].properties);
    } else {
      buf[k] = _extends({}, properties[k], {
        default: getDefault(properties[k].default, k)
      });
    }

    return buf;
  }, _buf);
};

export var normalizeSchema = function normalizeSchema(schema) {
  if (!schema) {
    return null;
  }

  var _schema$properties = schema.properties,
      properties = _schema$properties === void 0 ? {} : _schema$properties,
      _schema$type = schema.type,
      type = _schema$type === void 0 ? 'object' : _schema$type;

  var _properties = normalizeDefault(properties);

  return _extends({
    type: type
  }, schema, {
    properties: _properties
  });
};