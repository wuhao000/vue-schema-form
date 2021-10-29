import {CommonFormProps, Platform, PropsTransformer, SchemaFormComponentOptions} from '../../types';
import {Component} from 'vue';
import {FieldDefinition} from './internal/utils';
import {ComponentStore, globalComponentStore} from './utils/register';


export const getConfirmFunction = (platform: Platform) => {
  return platform === 'mobile' ? config.confirmFn.mobile : config.confirmFn.desktop;
};

const formItemPropTransform = {
  mobile: null,
  desktop: null
};

export const config = {
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

export const registerComponent = (options: SchemaFormComponentOptions, store?: ComponentStore) => {
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
    if (options.layout && !options.forDisplay) {
      registerComponent(Object.assign({}, options, {forDisplay: true}));
    }
  }
};
