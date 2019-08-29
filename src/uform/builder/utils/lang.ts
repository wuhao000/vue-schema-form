import { parseDestructPath } from '@/uform/utils';
import moment from 'moment';
import Arg from './arg';

export const isType = type => obj =>
  obj != null && Object.prototype.toString.call(obj) === `[object ${type}]`;

export const isFn = isType('Function');

export const isArray = Array.isArray || isType('Array');

export const isObj = isType('Object');

export const isStr = isType('String');

export const isNum = isType('Number');

export const isIter = obj => isArray(obj) || isObj(obj);

const replaceSingleDefault = v => {
  if (!isFlagValue(v)) { return v; }

  const { type, flag, value } = v;

  const now = moment(Date.now());
  const params = Arg.all();

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

const replaceDefault = declaredValue => {
  if (isArray(declaredValue)) {
    const v = [];
    for (let i = 0; i < declaredValue.length; i++) {
      const _v = replaceSingleDefault(declaredValue[i]);
      v.push(_v);
    }
    return v;
  } else {
    return replaceSingleDefault(declaredValue);
  }
};

const isFlagValue = o => {
  if (isArray(o)) {
    return o.some(i => isObj(i) && typeof i.flag !== 'undefined');
  } else {
    return isObj(o) && typeof o.flag !== 'undefined';
  }
};

export const getDefault = (v, path) => {
  const dPath = parseDestructPath(path).destruct || path;
  if (isArray(v) && isArray(dPath)) {
    return v.map(i => {
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

const normalizeDefault = (properties, _buf = {}) =>
  Object.keys(properties).reduce((buf, k) => {
    if (
      properties[k].properties &&
      Object.keys(properties[k].properties).length
    ) {
      buf[k] = {
        type: 'object',
        properties: {},
        ...properties[k]
      };
      normalizeDefault(properties[k].properties, buf[k].properties);
    } else {
      buf[k] = {
        ...properties[k],
        default: getDefault(properties[k].default, k)
      };
    }
    return buf;
  }, _buf);

export const normalizeSchema = schema => {
  if (!schema) { return null; }
  const { properties = {}, type = 'object' } = schema;
  const _properties = normalizeDefault(properties);

  return {
    type,
    ...schema,
    properties: _properties
  };
};
