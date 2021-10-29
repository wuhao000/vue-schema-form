import {Component} from 'vue';
import {FieldDefinition, Platform} from './types/bean';
import {PropsTransformer} from './types/form';


interface Config {
  defaultEmptyText: string;
  confirmFn: {
    mobile: any;
    desktop: any;
  };
  formItemPropTransform: {
    mobile: any;
    desktop: any;
  };
  getFormItemProps: (component: Component, field: FieldDefinition, platform: Platform) => any;
}

export const config: Config;

export const getDefaultEmptyText: () => string;

export const propsTransformer: PropsTransformer;
