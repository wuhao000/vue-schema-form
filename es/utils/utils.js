import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
export var ASchemaForm = 'ASchemaForm';
export var Mode;

(function (Mode) {
  Mode["edit"] = "edit";
  Mode["display"] = "display";
})(Mode || (Mode = {}));

export var TYPES;

(function (TYPES) {
  TYPES["file"] = "file";
  TYPES["checkbox"] = "checkbox";
  TYPES["picture"] = "picture";
  TYPES["button"] = "button";
  TYPES["cascader"] = "cascader";
  TYPES["transfer"] = "transfer";
  TYPES["rate"] = "rate";
  TYPES["upload"] = "upload";
  TYPES["daterange"] = "daterange";
  TYPES["url"] = "url";
  TYPES["string"] = "string";
  TYPES["datetime"] = "datetime";
  TYPES["year"] = "year";
  TYPES["month"] = "month";
  TYPES["time"] = "time";
  TYPES["select"] = "select";
  TYPES["date"] = "date";
  TYPES["datetimerange"] = "datetimerange";
  TYPES["integer"] = "integer";
  TYPES["number"] = "number";
  TYPES["double"] = "double";
  TYPES["boolean"] = "boolean";
  TYPES["expandSelect"] = "expand-select";
  TYPES["range"] = "range";
  TYPES["empty"] = "empty";
  TYPES["text"] = "text";
  TYPES["password"] = "password";
  TYPES["object"] = "object";
  TYPES["plain"] = "plain";
  TYPES["timerange"] = "timerange";
})(TYPES || (TYPES = {}));

export var DESKTOP = 'desktop';
export var MOBILE = 'mobile';
export var ComponentMap = {
  checkbox: {
    element: 'el-checkbox',
    antd: window.aegis ? 'd-checkbox' : 'a-checkbox',
    antdm: 'm-checkbox-item',
    vant: 'van-checkbox'
  },
  button: {
    element: 'el-button',
    antd: window.aegis ? 'd-button' : 'a-button',
    antdm: 'm-button',
    vant: 'van-button'
  },
  row: {
    element: 'el-row',
    antd: 'a-row'
  },
  col: {
    element: 'el-col',
    antd: 'a-col'
  },
  form: {
    element: 'el-form',
    antd: 'd-form',
    antdm: 'm-list',
    vant: 'van-form'
  },
  formItem: {
    element: 'el-form-item',
    antd: 'd-form-item',
    antdm: 'm-list-item',
    vant: 'van-cell'
  },
  alert: {
    element: 'el-alert',
    antd: 'a-alert'
  },
  layout: {
    element: 'el-container',
    antd: 'a-layout'
  },
  header: {
    element: 'el-header',
    antd: 'a-layout-header'
  },
  footer: {
    element: 'el-footer',
    antd: 'a-layout-footer'
  },
  sider: {
    element: 'el-aside',
    antd: 'a-layout-sider'
  },
  content: {
    element: 'el-main',
    antd: 'a-layout-content'
  },
  icon: {
    element: 'el-ext-icon',
    antd: window.aegis ? 'd-icon' : 'a-icon'
  },
  popover: {
    element: 'el-popover',
    antd: 'a-popover'
  },
  icons: {
    element: {
      info: 'info',
      up: 'arrow-up',
      down: 'arrow-down'
    },
    antd: {
      info: 'info-circle',
      up: 'up',
      down: 'down'
    }
  }
};
export function swap(array, x, y) {
  array.splice.apply(array, [x, 1].concat(_toConsumableArray(array.splice(y, 1, array[x]))));
}
export var LibName = {
  desktop: 'antd',
  mobile: 'antdm'
};
export var MobileLibComponents = {
  icons: null,
  alert: null,
  button: null,
  col: null,
  confirm: null,
  content: null,
  footer: null,
  form: null,
  formItem: null,
  header: null,
  icon: null,
  layout: null,
  popover: null,
  row: null,
  sider: null
};
export var LibComponents = {
  icons: null,
  alert: null,
  button: null,
  col: null,
  confirm: null,
  content: null,
  footer: null,
  form: null,
  formItem: null,
  header: null,
  icon: null,
  layout: null,
  popover: null,
  row: null,
  sider: null
};
export var getOptions = function getOptions(field) {
  if (field.enum) {
    return field.enum;
  }

  if (field.props && field.props.options) {
    if (typeof field.props.options === 'function') {
      return field.props.options() || [];
    } else if (_typeof(field.props.options) === 'object') {
      return field.props.options || [];
    }
  } else {
    return [];
  }
};
export var getDefaultValue = function getDefaultValue(field) {
  if (field.component.getDefaultValue !== undefined) {
    return field.component.getDefaultValue(field);
  }

  if (field.type === TYPES.transfer) {
    return [];
  } else if (field.type === TYPES.range) {
    return [0, 0];
  } else if (typeof field.destructPath.destruct !== 'string') {
    return null;
  } else if (field.type === TYPES.object) {
    if (field.array) {
      return [{}];
    } else {
      return {};
    }
  } else {
    return field.array ? [] : null;
  }
};
export var getFormComponent = function getFormComponent(platform) {
  return platform === DESKTOP ? LibComponents.form : MobileLibComponents.form;
};
export var getRowComponent = function getRowComponent() {
  return LibComponents.row;
};
export var getColComponent = function getColComponent() {
  return LibComponents.col;
};
export var getButtonComponent = function getButtonComponent() {
  return LibComponents.button;
};
export var getAlertComponent = function getAlertComponent() {
  return LibComponents.alert;
};
export var getOptionProperty = function getOptionProperty(option, property) {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};
export function addRule(rules, field, rule) {
  var type = field.type;
  var validateType = 'string';

  if (field.array) {
    validateType = 'array';
  } else if (type === 'number') {
    validateType = 'number';
  } else if (type === TYPES.integer) {
    validateType = 'number';
  } else if (type === TYPES.double) {
    validateType = 'number';
  } else if (type === TYPES.object) {
    validateType = 'object';
  } else if (type === TYPES.date || type === TYPES.datetime || type === TYPES.year || type === TYPES.month) {
    validateType = 'date';
  } else if (type === TYPES.select || type === TYPES.expandSelect) {
    var options = getOptions(field);

    if (options.length) {
      validateType = _typeof(getOptionProperty(options[0], field.props && field.props.valueProperty || 'value'));
    }
  } else if (type === TYPES.daterange || type === TYPES.datetimerange) {
    validateType = 'array';
  }

  rule.type = validateType;
  rules.push(rule);
}
export var getConfirmFunction = function getConfirmFunction(platform) {
  return platform === 'mobile' ? antdm['Modal'].confirm : LibComponents.confirm;
};
export var isNull = function isNull(value) {
  return value === undefined || value === null;
};
export var isNotNull = function isNotNull(value) {
  return !isNull(value);
};