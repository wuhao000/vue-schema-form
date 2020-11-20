import { PATH_SEPARATOR } from '../../utils/path';
import { isFn } from '../types';
import { getIn, setIn } from './accessor';
import { each, toArr } from './array';
import { isEmpty } from './isEmpty';
var numberRE = /^\d+$/;
var VIRTUAL_BOXES = {};
export var getSchemaNodeFromPath = function getSchemaNodeFromPath(schema, path) {
  var res = schema;
  var suc = 0;
  var copyPath = toArr(path);

  for (var i = 0; i < copyPath.length; i++) {
    var key = copyPath[i];

    if (res && !isEmpty(res.properties)) {
      res = res.properties[key];
      suc++;
    } else if (res && !isEmpty(res.items) && numberRE.test(key)) {
      res = res.items;
      suc++;
    }
  }

  return suc === copyPath.length ? res : undefined;
};
export var schemaIs = function schemaIs(schema, type) {
  return (schema === null || schema === void 0 ? void 0 : schema.type) === type;
};
export var isVirtualBox = function isVirtualBox(name) {
  return !!VIRTUAL_BOXES[name];
};
export var registerVirtualboxFlag = function registerVirtualboxFlag(name) {
  VIRTUAL_BOXES[name] = true;
};

var isVirtualBoxSchema = function isVirtualBoxSchema(schema) {
  return isVirtualBox(schema.type) || isVirtualBox(schema['x-component']);
};

var schemaTraverse = function schemaTraverse(schema, callback) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var schemaPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (schema) {
    if (isVirtualBoxSchema(schema)) {
      path = path.slice(0, path.length - 1);
    }

    callback(schema, {
      path: path,
      schemaPath: schemaPath
    });

    if (schemaIs(schema, 'object') || schema.properties) {
      each(schema.properties, function (subSchema, key) {
        schemaTraverse(subSchema, callback, path.concat(key), schemaPath.concat(key));
      });
    } else if (schemaIs(schema, 'array') || schema.items) {
      if (schema.items) {
        callback(schema.items, function (key) {
          schemaTraverse(schema.items, callback, path.concat(key), schemaPath.concat(key));
        }, path);
      }
    }
  }
};

export var calculateSchemaInitialValues = function calculateSchemaInitialValues(schema, initialValues, callback) {
  initialValues = initialValues || schema.default || {};
  schemaTraverse(schema, function (subSchema, $path, parentPath) {
    var defaultValue = subSchema.default;

    if (isFn($path) && parentPath) {
      each(toArr(getIn(initialValues, parentPath)), function (value, index) {
        $path(index);
      });
    } else if ($path) {
      var isVirtualBoxInstance = isVirtualBoxSchema(subSchema);

      var _name = isVirtualBoxInstance ? $path.schemaPath.join(PATH_SEPARATOR) : $path.path.join(PATH_SEPARATOR);

      var path = isVirtualBoxInstance ? $path.schemaPath : $path.path;
      var schemaPath = $path.schemaPath;
      var initialValue = getIn(initialValues, _name);

      var _value = !isEmpty(initialValue) ? initialValue : defaultValue;

      if (!isEmpty(_value)) {
        setIn(initialValues, _name, _value);
      }

      if (callback && isFn(callback)) {
        var newPath = {
          name: _name,
          path: path,
          schemaPath: schemaPath
        };
        callback(newPath, subSchema, _value);
      }
    }
  });
  return initialValues;
};