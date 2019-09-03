import AntdButton from '@/schema-form/antd/button.vue';
import InternalForm from '@/schema-form/internal/form';
import Card from '@/schema-form/layout/card';
import {Platform, SchemaFormField} from '@/types/bean';
import {LayoutOptions, SchemaFormComponent} from '@/types/form';
import {IField} from '@/uform/types';
import Vue from 'vue';
import AntdUpload from '../antd/upload.vue';
import PlainDisplayField from '../display/plain-display-field';
import SelectDisplayField from '../display/select-display-field';
import TimeDisplayField from '../display/time-display-field';
import ElExtCheckbox from '../element/checkbox-group';
import ElExtRadio from '../element/radio-group';
import ElExtSelect from '../element/select';
import ElementUpload from '../element/upload.vue';
import Empty from '../empty';
import GridLayout from '../layout/grid';
import TextBox from '../layout/text-box';

export const ASchemaForm = 'ASchemaForm';

export const enum Mode {
  edit = 'edit',
  display = 'display'
}

export const enum TYPES {
  button = 'button',
  cascader = 'cascader',
  transfer = 'transfer',
  rate = 'rate',
  upload = 'upload',
  daterange = 'daterange',
  url = 'url',
  string = 'string',
  datetime = 'datetime',
  year = 'year',
  month = 'month',
  time = 'time',
  select = 'select',
  date = 'date',
  integer = 'integer',
  number = 'number',
  double = 'double',
  boolean = 'boolean',
  expandSelect = 'expand-select',
  range = 'range',
  empty = 'empty',
  text = 'text',
  object = 'object'
}

const store: { [key: string]: { [key: string]: any } } = {
  display: {
    desktop: {},
    mobile: {}
  },
  edit: {
    desktop: {},
    mobile: {}
  }
};

export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';

const ComponentMap = {
  button: {
    element: 'el-button',
    antd: 'd-button'
  },
  row: {
    element: 'el-row',
    antd: 'd-row'
  },
  col: {
    element: 'el-col',
    antd: 'd-col'
  },
  form: {
    element: 'el-form',
    antd: 'd-form'
  },
  formItem: {
    element: 'el-form-item',
    antd: 'd-form-item'
  },
  alert: {
    element: 'el-alert',
    antd: 'a-alert'
  },
  layout: {
    element: 'el-container',
    antd: 'd-layout'
  },
  header: {
    element: 'el-header',
    antd: 'd-layout-header'
  },
  footer: {
    element: 'el-footer',
    antd: 'd-layout-footer'
  },
  sider: {
    element: 'el-aside',
    antd: 'd-layout-sider'
  },
  content: {
    element: 'el-main',
    antd: 'd-layout-content'
  }
};

export function swap(array, x, y) {
  array.splice(x, 1, ...array.splice(y, 1, array[x]));
}

export const LibComponents = {
  button: null,
  row: null,
  col: null,
  form: null,
  formItem: null,
  alert: null,
  layout: null,
  confirm: null,
  header: null,
  footer: null,
  sider: null,
  content: null
};

const SchemaFormComponentDefinitions: SchemaFormComponent[] = [];
const DisplayComponentDefinitions: SchemaFormComponent[] = [];

export const registerDisplay = (component: string | object,
                                platforms: Platform | Platform[],
                                types: string | string[],
                                forArray: boolean = null,
                                getProps: ((definition: IField, platform: Platform) => object) = () => ({}),
                                layout: boolean = false) => {
  addComponent({
    component, platforms, types, forArray, getProps, forDisplay: true, layout
  });
};

export const registerLayout = (options: {
  component: string | object,
  platforms: Platform | Platform[],
  types: string | string[],
  getProps?: ((definition: IField, platform: Platform) => object),
  layoutOptions: LayoutOptions
}) => {
  addComponent({
    component: options.component, platforms: options.platforms,
    types: options.types, forArray: null, getProps: options.getProps,
    forDisplay: null, layout: true,
    layoutOptions: options.layoutOptions
  });
};
export const register = (component: string | object,
                         platforms: Platform | Platform[],
                         types: string | string[],
                         forArray: boolean = null,
                         getProps: ((definition: IField, platform: Platform) => object) = () => ({})) => {
  addComponent({
    component, platforms, types, forArray, getProps, forDisplay: false, layout: false
  });
};

const addComponent = (options: {
  component: string | object,
  platforms: Platform | Platform[],
  types: string | string[],
  forArray: boolean,
  getProps: (definition: IField, platform: Platform) => object,
  forDisplay: boolean,
  layout: boolean,
  layoutOptions?: LayoutOptions
}) => {
  if (Array.isArray(options.types)) {
    options.types.forEach(type => {
      addComponent({
        component: options.component, platforms: options.platforms,
        types: type, forArray: options.forArray, getProps: options.getProps,
        forDisplay: options.forDisplay,
        layout: options.layout,
        layoutOptions: options.layoutOptions
      });
    });
  } else if (Array.isArray(options.platforms)) {
    options.platforms.forEach(platform => {
      addComponent({
        component: options.component,
        platforms: platform,
        types: options.types,
        forArray: options.forArray, getProps: options.getProps,
        forDisplay: options.forDisplay, layout: options.layout,
        layoutOptions: options.layoutOptions
      });
    });
  } else {
    const forArray = options.forArray !== undefined ? options.forArray : null;
    const getProps = options.getProps || (() => ({}));
    const def = {
      component: options.component,
      platform: options.platforms,
      type: options.types,
      forArray,
      layout: options.layout,
      getProps: (definition: IField) => {
        const props: any = getProps(definition, options.platforms as any) || {};
        if (definition.title && options.platforms === MOBILE && !props.labelNumber) {
          props.labelNumber = typeof definition.title === 'string' ? (definition.title.length > 7 ? 7 : definition.title.length) : 7;
        }
        if (definition.props) {
          Object.assign(props, definition.props);
        }
        return props;
      },
      layoutOptions: options.layoutOptions
    };
    const mode = options.forDisplay ? 'display' : 'edit';
    const typeDef = store[mode][options.platforms];
    if (!typeDef[options.types]) {
      typeDef[options.types] = {};
    }
    if (forArray) {
      typeDef[options.types][1] = def;
    } else if (forArray === false) {
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
      addComponent(Object.assign({}, options, {
        forDisplay: true
      }));
    }
  }
};

Vue.component('empty', Empty);

registerDisplay(TimeDisplayField, [DESKTOP, MOBILE], [TYPES.datetime, TYPES.date, TYPES.year, TYPES.month, TYPES.daterange, TYPES.time]);
registerDisplay(PlainDisplayField, [DESKTOP, MOBILE], [TYPES.string, TYPES.text, TYPES.url, TYPES.integer, TYPES.double, TYPES.number], false);
registerDisplay(SelectDisplayField, [DESKTOP, MOBILE], [TYPES.select, TYPES.expandSelect], null, field => {
  return {options: getOptions(field)};
});
register(InternalForm, [DESKTOP, MOBILE], TYPES.object, false, (definition, platform) => {
  return {
    platform,
    definition: {fields: definition.fields}
  };
});
registerDisplay(InternalForm, [DESKTOP, MOBILE], TYPES.object, false, (definition, platform) => {
  return {
    platform,
    definition: {fields: definition.fields}
  };
});

export function registerAntd() {
  console.debug('注册Ant Design Vue表单组件');
  Object.keys(ComponentMap).forEach(key => {
    LibComponents[key] = ComponentMap[key].antd;
  });
  LibComponents.confirm = aegis.AeModal.confirm;
  registerDesktop('d-range-picker', [TYPES.daterange], false);
  registerDesktop('d-input', [TYPES.string, TYPES.url], false);
  registerDesktop('d-textarea', [TYPES.text], false);
  registerDesktop('d-date-picker', [TYPES.date, TYPES.year, TYPES.month, TYPES.datetime], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerDesktop('d-time-picker', [TYPES.time], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerDesktop('d-input-number', [TYPES.double, TYPES.integer, TYPES.number], false);
  registerDesktop('d-switch', TYPES.boolean);
  registerDesktop('d-select', TYPES.select, null, field => {
    return {dropdownMatchSelectWidth: false, multiple: field.array, options: getOptions(field)};
  });
  registerDesktop(AntdButton, TYPES.button, null, field => {
    return {title: field.title};
  });
  registerDesktop(AntdUpload, TYPES.upload, null, def => {
    return {multiple: def.array};
  });
  registerDesktop('d-cascader', TYPES.cascader, false, def => {
    return {options: def.enum};
  });
  registerDesktop('d-checkbox-group', TYPES.expandSelect, true, field => {
    return {options: getOptions(field)};
  });
  registerDesktop('d-radio-group', TYPES.expandSelect, false, field => {
    return {options: getOptions(field)};
  });
  registerDesktop('d-color-picker', 'color');
  registerDesktop('d-rate', TYPES.rate);
  registerDesktop('d-transfer', TYPES.transfer, false, def => {
    const data = (def.props && def.props.dataSource) || def.enum || [];
    const dataSource = data.map((item: any) => {
      if (typeof item === 'string') {
        return {key: item, title: item};
      } else {
        return {
          key: (item.key || item.value).toString(),
          title: item.title || item.label,
          description: item.description || item.label,
          disabled: item.disabled || false
        };
      }
    });
    return {dataSource};
  });
  register('d-slider', DESKTOP, TYPES.range, false, () => {
    return {range: true};
  });
}

const registerDesktop = (component: string | object,
                         types: string | string[],
                         forArray: boolean = null,
                         getProps: ((definition: IField, platform: Platform) => object) = null) => {
  register(component, DESKTOP, types, forArray, getProps);
};

const registerMobile = (component: string | object,
                        types: string | string[],
                        forArray: boolean = null,
                        getProps: ((definition: IField, platform: Platform) => object) = null) => {
  register(component, MOBILE, types, forArray, getProps);
};

const registerResponsiveComponent = (component: string | object,
                                     types: string | string[],
                                     forArray: boolean = null,
                                     getProps: ((definition: IField, platform: Platform) => object) = null) => {
  register(component, [MOBILE, DESKTOP], types, forArray, getProps);
};

export function registerElement() {
  console.debug('注册ElementUI表单组件');
  Object.keys(ComponentMap).forEach(key => {
    LibComponents[key] = ComponentMap[key].element;
  });
  LibComponents.confirm = ELEMENT.MessageBox.confirm;
  Vue.component('el-ext-select', ElExtSelect);
  Vue.component('el-ext-checkbox', ElExtCheckbox);
  Vue.component('el-ext-radio', ElExtRadio);
  registerDesktop('el-transfer', TYPES.transfer, false, field => {
    const data = (field.enum || []).map(item => ({
      key: item.value,
      label: item.label,
      disabled: item.disabled
    }));
    return {data};
  });
  registerDesktop(ElementUpload, TYPES.upload, null, (field) => {
    return {multiple: field.array};
  });
  registerDesktop('el-input', [TYPES.string, TYPES.url], false);
  registerDesktop('el-input', [TYPES.text], false, () => {
    return {type: 'textarea'};
  });
  registerDesktop('el-time-picker', TYPES.time, false);
  registerDesktop('el-rate', TYPES.rate, false);
  registerDesktop('el-date-picker', [TYPES.date, TYPES.daterange, TYPES.year, TYPES.month, TYPES.datetime], false,
    (definition: IField) => ({type: definition.type.toLowerCase()}));
  registerDesktop('el-input-number', [TYPES.double, TYPES.integer, TYPES.number], false);
  registerDesktop('el-switch', [TYPES.boolean], false);
  registerDesktop('el-ext-select', [TYPES.select], null, definition => {
    return {multiple: definition.array, options: getOptions(definition)};
  });
  registerDesktop('el-slider', TYPES.range, false, (field) => {
    const props: any = {range: true};
    if (field.props && field.props.marks) {
      if (Array.isArray(field.props.marks)) {
        props.marks = field.props.marks.map(it => {
          if (typeof it === 'number') {
            return it.toString();
          } else {
            return it;
          }
        });
      } else if (typeof field.props.marks === 'object') {
        const marks: any = {};
        Object.keys(field.props.marks).forEach(key => {
          const value = field.props.marks[key];
          if (typeof value === 'number') {
            marks[key] = value.toString();
          } else {
            marks[key] = value;
          }
        });
        props.marks = marks;
      }
    }
    return props;
  });
  registerDesktop('el-ext-radio', [TYPES.expandSelect], false, field => {
    return {options: getOptions(field)};
  });
  registerDesktop('el-ext-checkbox', [TYPES.expandSelect], true, field => {
    return {options: getOptions(field)};
  });
}

export function registerAntdMobile() {
  console.debug('注册Ant Design Mobile表单组件');

  registerMobile('m-input', [TYPES.string, TYPES.url], false);
  registerMobile('m-date-picker-item', [TYPES.date, TYPES.datetime, TYPES.month, TYPES.year, TYPES.time], false,
    (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerMobile('m-input', [TYPES.integer, TYPES.double, TYPES.number], false,
    (definition: IField) => {
      return {type: definition.type.toLowerCase() === TYPES.double ? 'digit' : 'number', textAlign: 'right'};
    });
  registerMobile('m-textarea', [TYPES.text], false);
  registerMobile('m-switch-item', [TYPES.boolean], false);
  registerMobile('m-checkbox-popup-list', [TYPES.select], true, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-radio-popup-list', [TYPES.select], false, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-checkbox-list', [TYPES.expandSelect], true, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-radio-list', [TYPES.expandSelect], false, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-calendar-item', TYPES.daterange, false);
}

registerLayout({
  component: GridLayout, platforms: [DESKTOP, MOBILE], types: 'grid',
  layoutOptions: {
    wrapItems: true,
    wrapContainer: false
  }
});
registerLayout({
  component: Card,
  platforms: [DESKTOP],
  types: ['card'],
  layoutOptions: {
    wrapItems: true,
    wrapContainer: false
  }
});
registerLayout({
  component: TextBox,
  platforms: [DESKTOP, MOBILE],
  types: 'text-box',
  layoutOptions: {wrapItems: false, wrapContainer: true}
});

const EmptyDefinition = {
  component: 'empty',
  getProps: (_) => ({})
} as SchemaFormComponent;

function searchStore(mode: Mode, platform: Platform, definition: SchemaFormField): SchemaFormComponent {
  const typeDef = store[mode][platform][definition.type];
  if (!typeDef) {
    console.warn(`类型${definition.type}${definition.array ? '（数组）' : ''}没有对应的${mode === 'display' ? '详情' : '编辑'}组件`);
    return EmptyDefinition;
  }
  if (definition.array) {
    const res = typeDef[1] || typeDef[0] || typeDef[2] || EmptyDefinition;
    if (res.component === 'empty') {
      console.warn(`类型${definition.type}${definition.array ? '（数组）' : ''}没有对应的${mode === 'display' ? '详情' : '编辑'}组件`);
    }
    return res;
  } else {
    return typeDef[2] || typeDef[0];
  }
}

export const getComponent = (platform: Platform, definition: SchemaFormField): SchemaFormComponent => {
  return searchStore(Mode.edit, platform, definition);
};

export const getDisplayComponent = (platform: Platform, definition: SchemaFormField): SchemaFormComponent => {
  return searchStore(Mode.display, platform, definition);
};

export const getOptions = (field: IField) => {
  if (field.enum) {
    return field.enum;
  }
  if (field.props && field.props.options) {
    if (typeof field.props.options === 'function') {
      return field.props.options() || [];
    } else if (typeof field.props.options === 'object') {
      return field.props.options || [];
    }
  } else {
    return [];
  }
};

export const getDefaultValue = (field: IField) => {
  if (typeof field.destructPath.destruct !== 'string') {
    return null;
  } else if (field.type === TYPES.transfer) {
    return [];
  } else if (field.type === TYPES.range) {
    return [0, 0];
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


export const getFormComponent = (platform: Platform) => {
  return platform === DESKTOP ? LibComponents.form : 'm-list';
};

export const getRowComponent = () => {
  return LibComponents.row;
};

export const getColComponent = () => {
  return LibComponents.col;
};

export const getButtonComponent = () => {
  return LibComponents.button;
};

export const getAlertComponent = () => {
  return LibComponents.alert;
};

export const getOptionProperty = function getOptionProperty(option: any, property: string | ((option: any) => any)): any {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};

export function addRule(rules: any, field: IField, rule: any) {
  const type = field.type as any;
  let validateType = 'string';
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
    const options = getOptions(field);
    if (options.length) {
      validateType = typeof getOptionProperty(options[0], field.props && field.props.valueProperty || 'value');
    }
  } else if (type === TYPES.daterange) {
    validateType = 'array';
  }
  rule.type = validateType;
  rules.push(rule);
}

export const getConfirmFunction = (platform: Platform) => {
  return platform === 'mobile' ? antdm.Modal.confirm : LibComponents.confirm;
};
