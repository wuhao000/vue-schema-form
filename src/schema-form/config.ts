import {Component} from 'vue';
import {CommonFormProps, Platform, PropsTransformer, SchemaFormComponentOptions} from '../../types';
import {FieldDefinition} from './bean/field-definition';
import {ComponentStore, globalComponentStore} from './utils/register';


export const getConfirmFunction = (platform: Platform) => {
  return platform === 'mobile' ? config.confirmFn.mobile : config.confirmFn.desktop;
};

const formItemPropTransform = {
  mobile: null,
  desktop: null
};

type SchemaFormBaseConfig = {
  defaultEmptyText: string;
  confirmFn: {
    mobile: (...args: any[]) => any;
    desktop: (...args: any[]) => any;
  };
  formItemPropTransform: {
    mobile: any;
    desktop: any;
  };
  getFormItemProps: (...args: any[]) => any;
}

export const config : SchemaFormBaseConfig = {
  defaultEmptyText: 'N/A',
  confirmFn: {
    mobile: null,
    desktop: null
  },
  formItemPropTransform,
  getFormItemProps: (component: Component, field: FieldDefinition, platform: Platform) => {
    if (platform === 'desktop') {
      return formItemPropTransform.desktop(component, field);
    }
    return formItemPropTransform.mobile(component, field);
  }
};

export const getDefaultEmptyText = () => {
  return config.defaultEmptyText;
};


export const propsTransformer: PropsTransformer = {
  mobile: {
    formProps: (props: CommonFormProps) => {
      return props;
    }
  },
  desktop: {
    formProps: (props: CommonFormProps) => {
      delete props.title;
      if (props.inline) {
        props.layout = 'inline';
      }
      delete props.inline;
      return props;
    }
  }
};

export const transformFormProps = (props: CommonFormProps, platform: Platform) => {
  const formPropsTransformer = platform === 'desktop' ? propsTransformer.desktop.formProps : propsTransformer.mobile.formProps;
  return formPropsTransformer(props);
};

function fixMode(options: SchemaFormComponentOptions) {
  if (!options.arrayMode) {
    options.arrayMode = 'single';
  }
  if (!options.mode) {
    options.mode = 'input';
  }
}

export const registerComponent = (
    options: SchemaFormComponentOptions,
    store?: ComponentStore) => {
  fixMode(options);
  const baseOptions = Object.assign({}, options);
  if (Array.isArray(options.types)) {
    options.types.forEach(types => {
      registerComponent(Object.assign(baseOptions, {types}), store);
    });
  } else if (Array.isArray(options.platforms)) {
    options.platforms.forEach(platforms => {
      registerComponent(Object.assign(baseOptions, {platforms}), store);
    });
  } else {
    const finalStore: ComponentStore = store || globalComponentStore;
    finalStore.addComponent(options);
  }
};
