import InternalForm from '@/schema-form/internal/form';
import {Platform, SchemaFormField} from '@/types/bean';
import {IField} from '@/uform/types';
import Vue from 'vue';
import AntdUpload from './antd/upload.vue';
import PlainDisplayField from './display/plain-display-field';
import SelectDisplayField from './display/select-display-field';
import TimeDisplayField from './display/time-display-field';
import ElExtCheckbox from './element/checkbox-group';
import ElExtRadio from './element/radio-group';
import ElExtSelect from './element/select';
import Empty from './empty';

export const ASchemaForm = 'ASchemaForm';

export const enum Mode {
  edit = 'edit',
  display = 'display'
}

export const enum TYPES {
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

let formComponent = 'd-form';
let rowComponent = 'd-row';
let colComponent = 'd-col';
let buttonComponent = 'd-button';
let alertComponent = 'a-alert';
let confirmFunction = '$dconfirm';

export interface SchemaFormComponent {
  platform: Platform;
  type: string;
  component: string | object;
  forArray: boolean | null;
  getProps: (field: IField) => object;
}

const SchemaFormComponentDefinitions: SchemaFormComponent[] = [];
const DisplayComponentDefinitions: SchemaFormComponent[] = [];

export const registerDisplay = (component: string | object,
                                platform: Platform | Platform[],
                                type: string | string[],
                                forArray: boolean = null,
                                getProps: ((definition: IField, platform: Platform) => object) = () => ({})) => {
  addComponent(component, platform, type, forArray, getProps, true);
};
export const register = (component: string | object,
                         platform: Platform | Platform[],
                         types: string | string[],
                         forArray: boolean = null,
                         getProps: ((definition: IField, platform: Platform) => object) = () => ({})) => {
  addComponent(component, platform, types, forArray, getProps, false);
};

const addComponent = (component: string | object,
                      platforms: Platform | Platform[],
                      types: string | string[],
                      forArray: boolean | null = null,
                      getProps: (definition: IField, platform: Platform) => object = () => ({}),
                      forDisplay: boolean) => {
  if (Array.isArray(types)) {
    types.forEach(type => {
      addComponent(component, platforms, type, forArray, getProps, forDisplay);
    });
  } else if (Array.isArray(platforms)) {
    platforms.forEach(platform => {
      addComponent(component, platform, types, forArray, getProps, forDisplay);
    });
  } else {
    const def = {
      component,
      platform: platforms,
      type: types,
      forArray,
      getProps: (definition: IField) => {
        const props: any = getProps(definition, platforms) || {};
        if (definition.title && platforms === MOBILE) {
          props.labelNumber = definition.title.length > 7 ? 7 : definition.title.length;
        }
        if (definition.props) {
          Object.assign(props, definition.props);
        }
        return props;
      }
    };
    const mode = forDisplay ? 'display' : 'edit';
    const typeDef = store[mode][platforms];
    if (!typeDef[types]) {
      typeDef[types] = {};
    }
    if (forArray === true) {
      typeDef[types][1] = def;
    } else if (forArray === false) {
      typeDef[types][2] = def;
    } else {
      typeDef[types][0] = def;
    }
    if (forDisplay) {
      DisplayComponentDefinitions.push(def);
    } else {
      SchemaFormComponentDefinitions.push(def);
    }
  }
};

Vue.component('empty', Empty);

registerDisplay(TimeDisplayField, [DESKTOP, MOBILE], [TYPES.datetime, TYPES.date]);
registerDisplay(PlainDisplayField, [DESKTOP, MOBILE], [TYPES.string, TYPES.text, TYPES.url, TYPES.integer, TYPES.double, TYPES.number], false);
registerDisplay(SelectDisplayField, [DESKTOP, MOBILE], [TYPES.select, TYPES.expandSelect], null);
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
  console.info('注册Ant Design Vue表单组件');
  formComponent = 'd-form';
  rowComponent = 'd-row';
  colComponent = 'd-col';
  buttonComponent = 'd-button';
  alertComponent = 'a-alert';
  confirmFunction = '$dconfirm';
  register('d-range-picker', DESKTOP, [TYPES.daterange], false);
  register('d-input', DESKTOP, [TYPES.string, TYPES.url], false);
  register('d-textarea', DESKTOP, [TYPES.text], false);
  register('d-date-picker', DESKTOP, [TYPES.date, TYPES.year, TYPES.month, TYPES.datetime], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  register('d-time-picker', DESKTOP, [TYPES.time], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  register('d-input-number', DESKTOP, [TYPES.double, TYPES.integer, TYPES.number], false);
  register('d-switch', DESKTOP, TYPES.boolean);
  register('d-select', DESKTOP, TYPES.select, null, definition => {
    return {dropdownMatchSelectWidth: false, multiple: definition.array};
  });
  register(AntdUpload, DESKTOP, TYPES.upload, null, def => {
    return {multiple: def.array};
  });
  register('d-checkbox-group', DESKTOP, TYPES.expandSelect, true);
  register('d-radio-group', DESKTOP, TYPES.expandSelect, false);
  register('d-color-picker', DESKTOP, 'color');
  register('d-rate', DESKTOP, TYPES.rate);
  register('d-transfer', DESKTOP, TYPES.transfer, false, def => {
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

export function registerElement() {
  console.info('注册ElementUI表单组件');
  formComponent = 'el-form';
  rowComponent = 'el-row';
  colComponent = 'el-col';
  buttonComponent = 'el-button';
  alertComponent = 'el-alert';
  confirmFunction = '$confirm';
  Vue.component('el-ext-select', ElExtSelect);
  Vue.component('el-ext-checkbox', ElExtCheckbox);
  Vue.component('el-ext-radio', ElExtRadio);
  register('el-input', DESKTOP, [TYPES.string, TYPES.url], false);
  register('el-input', DESKTOP, [TYPES.text], false, () => {
    return {type: 'textarea'};
  });
  register('el-date-picker', DESKTOP, [TYPES.date, TYPES.year, TYPES.month, TYPES.datetime], false,
    (definition: IField) => ({type: definition.type.toLowerCase()}));
  register('el-input-number', DESKTOP, [TYPES.double, TYPES.integer, TYPES.number], false);
  register('el-switch', DESKTOP, [TYPES.boolean], false);
  register('el-ext-select', DESKTOP, [TYPES.select], null, definition => {
    return {multiple: definition.array};
  });
  register('el-ext-radio', DESKTOP, [TYPES.expandSelect], false);
  register('el-ext-checkbox', DESKTOP, [TYPES.expandSelect], true);
}

export function registerAntdMobile() {
  console.info('注册Ant Design Mobile表单组件');

  register('m-input', MOBILE, [TYPES.string, TYPES.url], false);
  register('m-date-picker-item', MOBILE, [TYPES.date, TYPES.datetime, TYPES.month, TYPES.year, TYPES.time], false,
    (definition: IField) => ({mode: definition.type.toLowerCase()}));
  register('m-input', MOBILE, [TYPES.integer, TYPES.double, TYPES.number], false,
    (definition: IField) => {
      return {type: definition.type.toLowerCase() === TYPES.double ? 'digit' : 'number', textAlign: 'right'};
    });
  register('m-textarea', MOBILE, [TYPES.text], false);
  register('m-switch-item', MOBILE, [TYPES.boolean], false);
  register('m-checkbox-popup-list', MOBILE, [TYPES.select], true);
  register('m-radio-popup-list', MOBILE, [TYPES.select], false);
  register('m-checkbox-list', MOBILE, [TYPES.expandSelect], true);
  register('m-radio-list', MOBILE, [TYPES.expandSelect], false);
}

const EmptyDefinition = {
  component: 'empty',
  getProps: (_) => ({})
} as SchemaFormComponent;

function searchStore(mode: Mode, platform: Platform, definition: SchemaFormField): SchemaFormComponent {
  const typeDef = store[mode][platform][definition.type];
  if (!typeDef) {
    return EmptyDefinition;
  }
  if (definition.array) {
    let res = EmptyDefinition;
    if (typeDef[2]) {
      res = typeDef[2];
    }
    return typeDef[1] || typeDef[0] || res;
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

export const getOptions = (definition: IField) => {
  if (definition.enum) {
    return definition.enum;
  }
  if (definition.props && definition.props.options) {
    if (typeof definition.props.options === 'function') {
      return definition.props.options() || [];
    } else if (typeof definition.props.options === 'object') {
      return definition.props.options || [];
    }
  } else {
    return [];
  }
};

export const getDefaultValue = (field: IField) => {
  if (typeof field.destructPath.destruct !== 'string') {
    return null;
  }
  if (field.type === TYPES.range) {
    return [];
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
  return platform === DESKTOP ? formComponent : 'm-list';
};

export const getRowComponent = () => {
  return rowComponent;
};

export const getColComponent = () => {
  return colComponent;
};

export const getButtonComponent = () => {
  return buttonComponent;
};

export const getAlertComponent = () => {
  return alertComponent;
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

export function addRule(rules: any, field: SchemaFormField, rule: any) {
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
  return platform === 'mobile' ? '$mconfirm' : confirmFunction;
};
