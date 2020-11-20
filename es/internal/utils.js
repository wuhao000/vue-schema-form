import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import get from 'lodash.get';
import uuid from 'uuid';
import { clone, parseDestructPath, toArr } from '../uform/utils';
import { getStructValue } from '../utils/destruct';
import { setFieldValue } from '../utils/field';
import { splitPath } from '../utils/path';
import { getComponent, getDisplayComponent } from '../utils/register';
import { getFormComponent, TYPES } from '../utils/utils';
import FormField from './field';
export function getPropertyValueByPath(property, currentValue, vue) {
  var propertyPath = splitPath(property);
  var tmp = currentValue;
  propertyPath.forEach(function (path) {
    if (!tmp[path]) {
      vue.$set(tmp, path, {});
    }

    tmp = tmp[path];
  });
  return get(currentValue, property);
}
export function calcShowState(currentValue, definition) {
  if (!definition.depends) {
    if (typeof definition.visible === 'boolean') {
      return definition.visible;
    }

    return definition.visible || definition.visible === null || definition.visible === undefined;
  } else {
    if (typeof definition.depends === 'function') {
      return definition.depends(currentValue);
    } else {
      return !definition.depends.map(function (condition) {
        return matchCondition(currentValue, condition);
      }).some(function (it) {
        return !it;
      });
    }
  }
}
export function getRealFields(fields) {
  if (_typeof(fields) === 'object') {
    return Object.keys(fields).filter(function (key) {
      return fields[key];
    }).map(function (key) {
      var field = fields[key];

      if (!field.id) {
        field.id = uuid.v4();
      }

      return _objectSpread({
        id: field.id,
        property: key
      }, fields[key]);
    });
  } else {
    return fields.filter(function (it) {
      return it !== null && it !== undefined;
    });
  }
}
export function getComponentType(store, definition) {
  var component = null;

  if (!store.editable || definition.editable === false) {
    component = getDisplayComponent(store.platform, definition);
  } else {
    component = getComponent(store.platform, definition);
  }

  return component;
}
export function matchCondition(value, condition) {
  if (!value) {
    return false;
  } else {
    var currentValue = value[condition.property];
    var compareValue = condition.value;

    if (currentValue === null || currentValue === undefined) {
      switch (condition.operator) {
        case 'in':
          return compareValue.includes(currentValue);

        case 'notIn':
          return !compareValue.includes(currentValue);
      }

      return false;
    } else {
      switch (condition.operator) {
        case '=':
          return compareValue.toString() === currentValue.toString();

        case '<':
          return parseFloat(currentValue) < parseFloat(compareValue);

        case '>':
          return parseFloat(currentValue) > parseFloat(compareValue);

        case '>=':
          return parseFloat(currentValue) >= parseFloat(compareValue);

        case '<=':
          return parseFloat(currentValue) <= parseFloat(compareValue);

        case 'in':
          return compareValue.includes(currentValue);

        case 'notIn':
          return !compareValue.includes(currentValue);
      }
    }
  }

  return true;
}
export function renderField(pathPrefix, store, field, currentValue, index, wrap, h, vue) {
  var _field$property;

  var value = null;

  if ((_field$property = field.property) === null || _field$property === void 0 ? void 0 : _field$property.includes('.')) {
    value = getPropertyValueByPath(field.property.substr(0, field.property.lastIndexOf('.')), currentValue, vue);
  } else {
    value = currentValue;
  }

  if (field.type === TYPES.object) {
    if (!field.props) {
      field.props = {
        props: store.props
      };
    } else {
      field.props.props = store.props;
    }

    field.props.effects = store.effects;
  }

  var iField = createField(currentValue, store, pathPrefix, field);
  var component = getComponentType(store, field);
  var props = {
    value: getFieldValue(value, iField, component, vue),
    wrap: wrap,
    field: iField,
    path: buildArrayPath(pathPrefix, field),
    disabled: iField.disabled || store.disabled,
    definition: field,
    formValue: currentValue
  }; // @ts-ignore

  return createVNode(FormField, {
    "props": props,
    "onInput": function onInput(v) {
      setFieldValue(value, iField, v, vue);
    },
    "key": 'field-' + field.property + '-' + index
  }, null);
}
export function buildArrayPath(pathPrefix, field) {
  if (pathPrefix) {
    return pathPrefix.concat(field.property);
  } else {
    if (field.property) {
      return field.property.split('.');
    }

    return [];
  }
}
export function createField(currentValue, store, pathPrefix, definition) {
  var plainPath = buildArrayPath(pathPrefix, definition).join('.');
  var existsField = store.fields[plainPath];

  if (existsField) {
    existsField.component = getComponentType(store, definition);
    existsField.definition = definition;

    if (existsField.fields !== definition.fields) {
      existsField.fields = definition.fields;
    }

    return existsField;
  } else {
    return Vue.observable({
      array: definition.array,
      component: getComponentType(store, definition),
      definition: definition,
      destructPath: parseDestructPath(definition.property),
      disabled: false,
      display: true,
      displayValue: definition.displayValue,
      editable: definition.editable === undefined ? true : definition.editable,
      effectErrors: [],
      enum: definition.enum || null,
      errors: [],
      fields: proxyFields(definition.fields),
      hiddenFromParent: false,
      id: definition.id,
      initialValue: null,
      initialize: function initialize() {},
      invalid: false,
      name: definition.property,
      path: buildArrayPath(pathPrefix, definition),
      plainPath: plainPath,
      processor: definition.processor,
      props: _extends({}, definition.props),
      required: definition.required,
      rules: getRulesFromProps(definition),
      setGetValue: null,
      store: store,
      title: definition.title,
      type: definition.type,
      valid: true,
      value: currentValue,
      visible: calcShowState(currentValue, definition)
    });
  }
}

var proxyFields = function proxyFields(fields) {
  if (fields) {
    if (Array.isArray(fields)) {
      fields.forEach(function (field, index) {
        fields[index] = proxyField(field);
      });
    } else {
      Object.keys(fields).forEach(function (key) {
        fields[key] = proxyField(fields[key]);
      });
    }
  }

  return fields;
};

var proxyField = function proxyField(field) {
  // return new Proxy(field, {
  //   get: (target, property) => {
  //     return target[property];
  //   }
  // });
  return field;
};

var getRulesFromProps = function getRulesFromProps(props) {
  var rules = toArr(props.rules);

  if (props.required && !rules.some(function (rule) {
    return rule.required;
  })) {
    rules.push({
      required: true
    });
  }

  return clone(rules);
};

export var getFieldValue = function getFieldValue(value, field, component, vue) {
  if (component.layout) {
    return value;
  }

  if (field.processor) {
    return field.processor.getValue(value, field);
  } else {
    return getStructValue(value, field.destructPath.destruct || field.name, vue, field);
  }
};
export function hasListener(vue, event) {
  return !!vue.$listeners[event];
}
export function getFormItemComponent(platform) {
  return getFormComponent(platform) + '-item';
}
export function searchSchema(path, def) {
  if (!path) {
    return null;
  }

  var parts = path.split('.');
  var df = def;
  parts.forEach(function (part) {
    if (df.fields) {
      if (_typeof(df.fields) === 'object') {
        df = df.fields[part];
      } else if (Array.isArray(df.fields)) {
        df = df.fields.find(function (it) {
          return it.property === part;
        });
      }
    } else {
      df = null;
    }
  });
  return df;
}
export var SchemaFormEvents;

(function (SchemaFormEvents) {
  SchemaFormEvents["fieldKeyup"] = "fieldKeyup";
  SchemaFormEvents["fieldKeydown"] = "fieldKeydown";
  SchemaFormEvents["fieldFocus"] = "fieldFocus";
  SchemaFormEvents["fieldBlur"] = "fieldBlur";
  SchemaFormEvents["fieldChange"] = "fieldChange";
  SchemaFormEvents["fieldCreate"] = "fieldCreate";
  SchemaFormEvents["validate"] = "validate";
})(SchemaFormEvents || (SchemaFormEvents = {}));

export var filterErros = function filterErros(errors) {
  return errors.filter(function (it) {
    return Array.isArray(it) && it.length > 0;
  }).flat().concat(errors.filter(function (it) {
    return _typeof(it) === 'object' && !Array.isArray(it) && it !== null;
  }));
};
export function getCurrentValue(value, defaultValue) {
  var cloneValue = clone(value);

  if (cloneValue !== undefined && cloneValue !== null) {
    return cloneValue;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  return null;
}