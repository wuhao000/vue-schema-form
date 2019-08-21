import {Platform, SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import ElInputArray from './element/input-array';
import ElExtSelect from './element/select';
import Empty from './empty';

let formComponent = 'd-form';
let rowComponent = 'd-row';
let colComponent = 'd-col';

export interface SchemaFormComponent {
  platform: Platform;
  type: string;
  component: string | object;
  forArray: boolean;
  getProps: (definition: SchemaFormField) => object;
}

const SchemaFormComponentDefinitions: SchemaFormComponent[] = [];
const DisplayComponentDefinitions: SchemaFormComponent[] = [];

export const registerDisplay = (component: string | object,
                                platform: Platform,
                                type: string | string[],
                                forArray: boolean = null,
                                getProps: ((definition: SchemaFormField, platform: Platform) => object) = () => ({})) => {
  if (typeof type === 'string') {
    addComponent(component, platform, type, forArray, getProps, true);
  } else if (Array.isArray(type)) {
    type.forEach(t => {
      addComponent(component, platform, t, forArray, getProps, true);
    });
  }
};
export const register = (component: string,
                         platform: Platform,
                         type: string | string[],
                         forArray: boolean = null,
                         getProps: ((definition: SchemaFormField, platform: Platform) => object) = () => ({})) => {
  if (typeof type === 'string') {
    addComponent(component, platform, type, forArray, getProps, false);
  } else if (Array.isArray(type)) {
    type.forEach(t => {
      addComponent(component, platform, t, forArray, getProps, false);
    });
  }
};

const addComponent = (component: string | object,
                      platform: Platform,
                      type: string,
                      forArray: boolean = null,
                      getProps: (definition: SchemaFormField, platform: Platform) => object = () => ({}),
                      forDisplay: boolean) => {
  const def = {
    component,
    platform,
    type,
    forArray,
    getProps: (definition: SchemaFormField) => {
      const props: any = getProps(definition, platform) || {};
      if (definition.title && platform === 'mobile') {
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
};

Vue.component('empty', Empty);

export function registerAntd() {
  formComponent = 'd-form';
  rowComponent = 'd-row';
  colComponent = 'd-col';
  register('d-input', 'desktop', ['String', 'Url']);
  register('d-textarea', 'desktop', 'Text');
  register('d-date-picker', 'desktop', ['DateTime', 'Date', 'Time'], null, (definition: SchemaFormField) => ({mode: definition.type.toLowerCase()}));
  register('d-input-number', 'desktop', ['Double', 'Integer']);
  register('d-switch', 'desktop', 'Boolean');
  register('d-select', 'desktop', 'Select', null, definition => {
    return {dropdownMatchSelectWidth: false, multiple: definition.array};
  });
  register('d-checkbox-group', 'desktop', 'ExpandSelect', true);
  register('d-radio-group', 'desktop', 'ExpandSelect', false);
  register('d-color-picker', 'desktop', 'Color');
}

export function registerElement() {
  formComponent = 'el-form';
  rowComponent = 'el-row';
  colComponent = 'el-col';
  Vue.component('ElExtSelect', ElExtSelect);
  Vue.component('ElInputArray', ElInputArray);
  register('el-input', 'desktop', ['String', 'Url']);
  register('el-input', 'desktop', 'Text', null, definition => {
    return {type: 'textarea'};
  });
  register('el-input-array', 'desktop', ['String', 'Url'], true);
  register('el-input-array', 'desktop', 'Text', true, () => {
    return {type: 'textarea'};
  });
  register('el-date-picker', 'desktop', ['DateTime', 'Date', 'Time'], null, (definition: SchemaFormField) => ({mode: definition.type.toLowerCase()}));
  register('el-input-number', 'desktop', ['Double', 'Integer']);
  register('el-switch', 'desktop', 'Boolean');
  register('el-ext-select', 'desktop', 'Select', null);
  register('el-checkbox-group', 'desktop', 'ExpandSelect', true);
  register('el-radio-group', 'desktop', 'ExpandSelect', false);
}

export function registerAntdMobile() {
  register('m-input', 'mobile', ['String', 'Url']);
  register('m-date-picker', 'desktop', ['DateTime', 'Date', 'Time'], null, (definition: SchemaFormField) => ({mode: definition.type.toLowerCase()}));
  register('m-input', 'mobile', ['Double', 'Integer'], null,
    (definition: SchemaFormField) => {
      return {type: definition.type === 'Double' ? 'digit' : 'number', textAlign: 'right'};
    });
  register('m-textarea', 'mobile', 'Text');
  register('m-switch-item', 'mobile', 'Boolean');
  register('m-checkbox-popup-list', 'mobile', 'Select', true);
  register('m-radio-popup-list', 'mobile', 'Select', false);
  register('m-checkbox-list', 'mobile', 'ExpandSelect', true);
  register('m-radio-list', 'mobile', 'ExpandSelect', false);
}


function search(components: SchemaFormComponent[], platform: Platform, definition: SchemaFormField) {
  const matchedComponents = components.filter(it => it.platform === platform && it.type === definition.type);
  if (matchedComponents.length === 1) {
    return matchedComponents[0];
  } else if (matchedComponents.length > 1) {
    let def = null;
    if (definition.array) {
      def = matchedComponents.find(it => it.forArray === definition.array);
    } else {
      def = matchedComponents.find(it => !it.forArray);
    }
    return def || matchedComponents[0];
  } else {
    return {
      component: 'empty',
      getProps: (_) => ({})
    } as SchemaFormComponent;
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
  if (definition.type === 'Color') {
    return '';
  } else if (definition.array) {
    return [];
  } else {
    return null;
  }
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

export const getOptionProperty = function getOptionProperty(option: any, property: string | ((option: any) => any)): any {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};
