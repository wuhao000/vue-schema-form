function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Empty, { createEmpty } from "../empty";
import { DESKTOP, MOBILE, Mode } from "./utils";

function getEmptyDefinition(text) {
  return {
    component: createEmpty(text),
    getProps: function getProps(_) {
      return {};
    }
  };
}

var SchemaFormComponentDefinitions = [];
var DisplayComponentDefinitions = [];
var store = {
  display: {
    desktop: {},
    mobile: {}
  },
  edit: {
    desktop: {},
    mobile: {}
  }
};
export var registerDisplay = function registerDisplay(component, platforms, types, forArray, getProps, layout) {
  if (forArray === void 0) {
    forArray = null;
  }

  if (getProps === void 0) {
    getProps = function getProps() {
      return {};
    };
  }

  if (layout === void 0) {
    layout = false;
  }

  addComponent({
    component: component,
    platforms: platforms,
    types: types,
    forArray: forArray,
    getProps: getProps,
    forDisplay: true,
    layout: layout
  });
};
/**
 * 注册表单组件
 * @param {string | object} component 组件对象或组件名称
 * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile
 * @param {string | string[]} types 组件的类型
 * @param {boolean | null} forArray 是否为数组类型的数据组件（可选）,为null表示同时支持数组和非数组的数据格式
 * @param {(definition: IField, platform: Platform) => object} getProps 组件属性转换器（可选）
 */

export var register = function register(component, platforms, types, forArray, getProps) {
  if (forArray === void 0) {
    forArray = null;
  }

  if (getProps === void 0) {
    getProps = function getProps() {
      return {};
    };
  }

  addComponent({
    component: component,
    platforms: platforms,
    types: types,
    forArray: forArray,
    getProps: getProps,
    forDisplay: false,
    layout: false
  });
};
/**
 *
 * @param options
 */

export var registerLayout = function registerLayout(options) {
  addComponent({
    component: options.component,
    platforms: options.platforms,
    types: options.types,
    forArray: null,
    getProps: options.getProps,
    forDisplay: null,
    layout: true
  });
};
export var addComponent = function addComponent(options) {
  var finalOptions = {
    component: options.component,
    wrap: options.wrap,
    layout: options.layout,
    forArray: options.forArray !== undefined ? options.forArray : null,
    platforms: options.platforms,
    modelEvent: options.modelEvent
  };

  if (Array.isArray(options.types)) {
    options.types.forEach(function (type) {
      addComponent(_extends(finalOptions, {
        types: type,
        getProps: options.getProps,
        forDisplay: options.forDisplay
      }));
    });
  } else if (Array.isArray(options.platforms)) {
    options.platforms.forEach(function (platform) {
      addComponent(_extends(finalOptions, {
        platforms: platform,
        types: options.types,
        getProps: options.getProps,
        forDisplay: options.forDisplay
      }));
    });
  } else {
    var _getProps = options.getProps || function () {
      return {};
    };

    var def = _extends(finalOptions, {
      type: options.types,
      platform: options.platforms,
      getProps: function getProps(field) {
        var props = _getProps(field, options.platforms) || {};

        if (field.title && options.platforms === MOBILE && !props.labelNumber) {
          props.labelNumber = typeof field.title === 'string' ? field.title.length > 7 ? 7 : field.title.length : 7;
        }

        if (field.props) {
          _extends(props, field.props);
        }

        return props;
      }
    });

    var mode = options.forDisplay ? 'display' : 'edit';
    var typeDef = store[mode][options.platforms];

    if (!typeDef[options.types]) {
      typeDef[options.types] = {};
    }

    if (def.forArray) {
      typeDef[options.types][1] = def;
    } else if (def.forArray === false) {
      typeDef[options.types][2] = def;
    } else {
      typeDef[options.types][0] = def;
    }

    if (options.forDisplay) {
      DisplayComponentDefinitions.push(def);
    } else {
      SchemaFormComponentDefinitions.push(def);
    }

    if (options.layout && !options.forDisplay) {
      addComponent(_extends({}, options, {
        forDisplay: true
      }));
    }
  }
};
export var registerDesktop = function registerDesktop(component, types, forArray, getProps) {
  if (forArray === void 0) {
    forArray = null;
  }

  if (getProps === void 0) {
    getProps = null;
  }

  register(component, DESKTOP, types, forArray, getProps);
};
export var registerResponsiveComponent = function registerResponsiveComponent(component, types, forArray, getProps) {
  if (forArray === void 0) {
    forArray = null;
  }

  if (getProps === void 0) {
    getProps = null;
  }

  register(component, [MOBILE, DESKTOP], types, forArray, getProps);
};
export var MISSING_TYPES = [];

function searchStore(mode, platform, definition) {
  var type = definition.xType || definition.type;
  var typeDef = store[mode !== null && mode !== void 0 ? mode : 'edit'][platform !== null && platform !== void 0 ? platform : 'desktop'][type];

  if (!typeDef) {
    if (type && !MISSING_TYPES.includes(type)) {
      MISSING_TYPES.push(type);
    }

    return getEmptyDefinition("<\u4E0D\u652F\u6301\u7684\u7C7B\u578B" + type + ">");
  }

  if (definition.array) {
    var res = typeDef[1] || typeDef[0] || typeDef[2] || getEmptyDefinition('');

    if (res.component === Empty) {
      if (type) {
        console.warn("\u7C7B\u578B" + type + (definition.array ? '（数组）' : '') + "\u6CA1\u6709\u5BF9\u5E94\u7684" + (mode === 'display' ? '详情' : '编辑') + "\u7EC4\u4EF6");
      }
    }

    return res;
  } else {
    return typeDef[2] || typeDef[0];
  }
}

export var getComponent = function getComponent(platform, definition) {
  return searchStore(Mode.edit, platform, definition);
};
export var getDisplayComponent = function getDisplayComponent(platform, definition) {
  return searchStore(Mode.display, platform, definition);
};