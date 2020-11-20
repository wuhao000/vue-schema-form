import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import merge from 'lodash.merge';
/**
 * 判断对象是否为空
 * @param {Object} obj 对象
 */

export var isEmptyObj = function isEmptyObj(obj) {
  if (!obj) {
    return true;
  }

  for (var i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      return false;
    }
  }

  return true;
};
/**
 * 将enums数组格式化成[{value: xxx, label: xxx}]形式
 * @param {Array} enums 需要格式化的数组
 */

export var wrapEnums = function wrapEnums(enums) {
  return enums.map(function (item) {
    return _typeof(item) === 'object' ? item : {
      value: item,
      label: item
    };
  });
};
/**
 * 初始化组件的属性默认值
 * @param {Array} propsList 属性数组
 * @param {Object} comp 组件数据
 */

/**
 * 根据组件id获取组件信息
 * @param {Array} componentIdList 组件的id list
 * @param {Array} schema 组件schema
 */

export var getCompDetailById = function getCompDetailById() {
  var componentIdList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _componentIdList = _toConsumableArray(componentIdList);

  var _componentId = _componentIdList.shift();

  var _schema$properties = schema.properties,
      properties = _schema$properties === void 0 ? {} : _schema$properties;

  if (!_componentIdList.length) {
    return properties[_componentId] ? _objectSpread({
      id: _componentId
    }, properties[_componentId]) : {};
  }

  return getCompDetailById(_componentIdList, properties[_componentId]);
};
/**
 * 补全回传的schema格式
 * @param {Object} schema
 * @param {Boolean} keepAll 保留所有字段
 */

export var wrapSubmitSchema = function wrapSubmitSchema(schema) {
  var keepAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!schema || _typeof(schema) !== 'object') {
    return {
      type: 'object',
      properties: {}
    };
  } // 深拷贝一份


  var result = JSON.parse(JSON.stringify(schema));

  if (!schema.type) {
    result.type = 'object';
  }

  if (!schema.properties) {
    result.properties = {};
  } // 以__id__为主键转换一次数据


  var newProperties = {};

  var loop = function loop(_newProperties, _properties) {
    Object.keys(_properties).forEach(function (key) {
      var item = JSON.parse(JSON.stringify(_properties[key]));
      var newKey = item.__id__ || key;

      if (!keepAll) {
        // 删除可视化配置产生的冗余字段
        Object.keys(item).forEach(function (itemKey) {
          if (['__id__', 'width', 'height', 'icon', 'iconWidth', 'iconHeight', 'iconUrl', 'id', 'active', 'placeholder'].indexOf(itemKey) > -1 || /^(x-props.)/gi.test(itemKey)) {
            delete item[itemKey];
          }
        });
      }

      _newProperties[newKey] = JSON.parse(JSON.stringify(item));

      if (item.properties) {
        _newProperties[newKey].properties = {};
        loop(_newProperties[newKey].properties, item.properties);
      }
    });
  };

  loop(newProperties, result.properties);
  result.properties = newProperties;
  return result;
};
/**
 * 根据schema获取有顺序的properties
 * @param {Object} schema
 * @param {String} containerId 相对容器id
 */

export var getOrderProperties = function getOrderProperties() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var containerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (containerId.length) {
    var id = containerId.shift();
    return getOrderProperties(schema.properties[id], containerId);
  }

  var _schema$properties2 = schema.properties,
      properties = _schema$properties2 === void 0 ? {} : _schema$properties2;

  if (isEmptyObj(properties)) {
    return [];
  }

  var newProperties = [];
  Object.keys(properties).forEach(function (key) {
    var item = properties[key];
    var index = item['x-index'];

    if (typeof index !== 'number') {
      newProperties.push(_objectSpread({}, item, {
        id: key,
        'x-index': newProperties.length
      }));
    }
  });
  Object.keys(properties).forEach(function (key) {
    var item = properties[key];
    var index = item['x-index'];

    if (typeof index === 'number') {
      if (!newProperties[index]) {
        var _key = index > newProperties.length + 1 ? newProperties.length : index;

        newProperties[_key] = _objectSpread({}, item, {
          id: key
        });
      } else {
        var _tempProperties = newProperties.slice(0, index);

        for (var i = index; i < newProperties.length; i++) {
          _tempProperties[i + 1] = _objectSpread({}, newProperties[i], {
            'x-index': i + 1
          });
        }

        _tempProperties[index] = _objectSpread({}, item, {
          id: key
        });
        newProperties = _tempProperties;
      }
    }
  });
  return newProperties;
};
export var initOrderProperties = function initOrderProperties() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var newProperties = getOrderProperties(schema);
  var properties = {};
  newProperties.forEach(function (item) {
    var newItem = _objectSpread({}, item);

    if (newItem.active) {
      delete newItem.active;
    }

    properties[item.id] = newItem;
  });

  var newShema = _objectSpread({}, schema, {
    properties: properties
  });

  return newShema;
};
export var flatObj = function flatObj() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // 深拷贝一份
  var result = JSON.parse(JSON.stringify(obj));

  var setValueByLoopObj = function setValueByLoopObj(_obj, arr, value) {
    var _key = arr.shift();

    if (!arr.length) {
      if (value && _typeof(value) === 'object') {
        if (Array.isArray(value)) {
          _obj[_key] = value;
        } else {
          var tempValue = _obj[_key] || {};
          _obj[_key] = merge({}, value, tempValue);
        }
      } else {
        _obj[_key] = value;
      }
    } else {
      _obj[_key] = _obj[_key] || {};
      setValueByLoopObj(_obj[_key], arr, value);
    }
  };

  Object.keys(obj).forEach(function (originKey) {
    var key = originKey.split('.');
    setValueByLoopObj(result, key, obj[originKey]);
  });
  return result;
}; // 校验schema id是否有重复的

export var checkRepeatId = function checkRepeatId() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var result = {};

  var loop = function loop(_schema) {
    var temp = {};
    var _schema$properties3 = _schema.properties,
        properties = _schema$properties3 === void 0 ? {} : _schema$properties3;
    Object.keys(properties).forEach(function (propKey) {
      var item = properties[propKey];
      var key = item.__id__ ? item.__id__ : propKey;

      if (!temp[key]) {
        temp[key] = item;
      } else {
        result[key] = item;
      }

      if (item.properties) {
        loop(item);
      }
    });
  };

  loop(schema);
  return !!Object.keys(result).length;
};
export var isLayoutWrapper = function isLayoutWrapper(comp) {
  return comp['x-props'] && comp['x-props']._extra && comp['x-props']._extra.__key__ === 'layout';
};