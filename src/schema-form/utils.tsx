import {Platform, SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import BaseArrayComponent from './base-array-component';
import PlainDisplayField from './display/plain-display-field';
import TimeDisplayField from './display/time-display-field';
import ElExtCheckbox from './element/checkbox-group';
import ElExtRadio from './element/radio-group';
import ElExtSelect from './element/select';
import Empty from './empty';

export const ASchemaForm = 'ASchemaForm';

const enum TYPES {
  url = 'url',
  string = 'string',
  datetime = 'datetime',
  time = 'time',
  select = 'select',
  date = 'date',
  integer = 'integer',
  double = 'double',
  boolean = 'boolean',
  expandSelect = 'expand-select',
  empty = 'empty',
  text = 'text'
}

const DESKTOP = 'desktop';
const MOBILE = 'mobile';

let formComponent = 'd-form';
let rowComponent = 'd-row';
let colComponent = 'd-col';
let buttonComponent = 'd-button';

export interface SchemaFormComponent {
  platform: Platform;
  type: string;
  component: string | object;
  forArray: boolean | null;
  getProps: (definition: SchemaFormField) => object;
}

const SchemaFormComponentDefinitions: SchemaFormComponent[] = [];
const DisplayComponentDefinitions: SchemaFormComponent[] = [];

export const registerDisplay = (component: string | object,
                                platform: Platform | Platform[],
                                type: string | string[],
                                forArray: boolean = null,
                                getProps: ((definition: SchemaFormField, platform: Platform) => object) = () => ({})) => {
  addComponent(component, platform, type, forArray, getProps, true);
};
export const register = (component: string,
                         platform: Platform | Platform[],
                         types: string | string[],
                         forArray: boolean = null,
                         getProps: ((definition: SchemaFormField, platform: Platform) => object) = () => ({})) => {
  addComponent(component, platform, types, forArray, getProps, false);
};

const addComponent = (component: string | object,
                      platforms: Platform | Platform[],
                      types: string | string[],
                      forArray: boolean = null,
                      getProps: (definition: SchemaFormField, platform: Platform) => object = () => ({}),
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
      getProps: (definition: SchemaFormField) => {
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
    if (forDisplay) {
      DisplayComponentDefinitions.push(def);
    } else {
      SchemaFormComponentDefinitions.push(def);
    }
  }
};

Vue.component('empty', Empty);
Vue.component('BaseArrayComponent', BaseArrayComponent);

registerDisplay(TimeDisplayField, [DESKTOP, MOBILE], ['datetime', 'date', 'time']);
registerDisplay(PlainDisplayField, [DESKTOP, MOBILE], ['string', 'text', 'url', 'integer', 'double'], false);
register(ASchemaForm, DESKTOP, ['SubForm', 'sub-form'], false, definition => {
  return {
    platform: DESKTOP,
    definition: {fields: definition.properties}
  };
});
register(ASchemaForm, MOBILE, ['SubForm', 'sub-form'], false, definition => {
  return {
    title: definition.title,
    platform: MOBILE,
    definition: {fields: definition.properties}
  };
});

export function registerAntd() {
  formComponent = 'd-form';
  rowComponent = 'd-row';
  colComponent = 'd-col';
  register('d-input', DESKTOP, [TYPES.string, TYPES.url]);
  register('d-textarea', DESKTOP, [TYPES.text]);
  register('d-date-picker', DESKTOP, [TYPES.date, TYPES.datetime], false, (definition: SchemaFormField) => ({mode: definition.type.toLowerCase()}));
  register('d-time-picker', DESKTOP, [TYPES.time], false, (definition: SchemaFormField) => ({mode: definition.type.toLowerCase()}));
  register('d-input-number', DESKTOP, [TYPES.double, TYPES.integer]);
  register('d-switch', DESKTOP, TYPES.boolean);
  register('d-select', DESKTOP, TYPES.select, null, definition => {
    return {dropdownMatchSelectWidth: false, multiple: definition.array};
  });
  register('d-checkbox-group', DESKTOP, TYPES.expandSelect, true);
  register('d-radio-group', DESKTOP, TYPES.expandSelect, false);
  register('d-color-picker', DESKTOP, 'color');
}

export function registerElement() {
  formComponent = 'el-form';
  rowComponent = 'el-row';
  colComponent = 'el-col';
  buttonComponent = 'el-button';
  Vue.component('el-ext-select', ElExtSelect);
  Vue.component('el-ext-checkbox', ElExtCheckbox);
  Vue.component('el-ext-radio', ElExtRadio);
  register('el-input', DESKTOP, [TYPES.string, TYPES.url], false);
  register('el-input', DESKTOP, [TYPES.text], false, definition => {
    return {type: 'textarea'};
  });
  register('el-date-picker', DESKTOP, [TYPES.datetime, TYPES.date, TYPES.time], false, (definition: SchemaFormField) => ({mode: definition.type.toLowerCase()}));
  register('el-input-number', DESKTOP, [TYPES.double, TYPES.integer], false);
  register('el-switch', DESKTOP, [TYPES.boolean], false);
  register('el-ext-select', DESKTOP, [TYPES.select], false);
  register('el-ext-radio', DESKTOP, [TYPES.expandSelect], false);
  register('el-ext-checkbox', DESKTOP, [TYPES.expandSelect], true);
}

export function registerAntdMobile() {
  register('m-input', MOBILE, [TYPES.string, TYPES.url], false);
  register('m-date-picker', MOBILE, [TYPES.date, TYPES.datetime, TYPES.time], false, (definition: SchemaFormField) => ({mode: definition.type.toLowerCase()}));
  register('m-input', MOBILE, [TYPES.integer, TYPES.double], false,
    (definition: SchemaFormField) => {
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

function search(components: SchemaFormComponent[], platform: Platform, definition: SchemaFormField): SchemaFormComponent {
  const matchedComponents = components.filter(it => it.platform === platform && it.type === definition.type);
  if (matchedComponents.length > 0) {
    const defaultArrayComponent: SchemaFormComponent = {
      component: 'base-array-component',
      forArray: true,
      type: null,
      platform: DESKTOP,
      getProps: () => {
        return Object.assign({
          component: matchedComponents[0].component,
          props: {title: definition.title}
        }, matchedComponents[0].getProps(definition));
      }
    };
    if (matchedComponents.length === 1) {
      if (definition.array && matchedComponents[0].forArray === false) {
        return defaultArrayComponent;
      }
      return matchedComponents[0];
    } else {
      if (definition.array) {
        return matchedComponents.find(it => it.forArray) || defaultArrayComponent;
      } else {
        return matchedComponents.find(it => !it.forArray) || EmptyDefinition;
      }
    }
  } else {
    return EmptyDefinition;
  }
}

export const getComponent = (platform: Platform, definition: SchemaFormField): SchemaFormComponent => {
  return search(SchemaFormComponentDefinitions, platform, definition);
};

export const getDisplayComponent = (platform: Platform, definition: SchemaFormField): SchemaFormComponent => {
  return search(DisplayComponentDefinitions, platform, definition);
};

export const getOptions = (definition: SchemaFormField) => {
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

export const getDefaultValue = (definition: SchemaFormField) => {
  return definition.array ? [] : null;
};


export const getFormComponent = (platform: Platform) => {
  return platform === 'desktop' ? formComponent : 'm-list';
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

export const getOptionProperty = function getOptionProperty(option: any, property: string | ((option: any) => any)): any {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};
