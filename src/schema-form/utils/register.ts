import {Component} from '@vue/runtime-core';
import {
  DisplayComponentOptions,
  FieldDefinition,
  Platform,
  SchemaFormComponent,
  SchemaFormComponentOptions
} from '../../../types';
import {registerComponent} from '../config';
import {DESKTOP, fixComponentDefinition, MOBILE, Mode} from './utils';

export class ComponentStore {

  public display: { [key in 'desktop' | 'mobile']: any } = {
    desktop: {},
    mobile: {}
  };
  public edit = {
    desktop: {},
    mobile: {}
  };

  public addComponent(options: SchemaFormComponentOptions) {
    const forArray = options.forArray !== undefined ? options.forArray : null;
    const mode = options.forDisplay ? this.display : this.edit;
    const typeDef = mode[options.platforms as string];
    if (!typeDef[options.types]) {
      typeDef[options.types] = {};
    }
    const def: SchemaFormComponent = fixComponentDefinition(options, options.forDisplay);
    if (forArray) {
      typeDef[options.types][1] = def;
    } else if (forArray === false) {
      typeDef[options.types][2] = def;
    } else {
      typeDef[options.types][0] = def;
    }
  }

  public search(mode: Mode, platform: Platform, type: string, array?: boolean) {
    const typeDef = (mode === Mode.Display ? this.display : this.edit)[platform][type];
    if (!typeDef) {
      return;
    }
    if (array) {
      return typeDef[1] || typeDef[0] || typeDef[2];
    } else {
      return typeDef[2] || typeDef[0];
    }
  }
}

export const globalComponentStore = new ComponentStore();

export const registerDisplay = ({
                                  component,
                                  platforms,
                                  types,
                                  forArray = null,
                                  getProps = () => ({}),
                                  layout = false
                                }: DisplayComponentOptions) => {
  registerComponent({
    component, platforms, types, forArray, getProps, forDisplay: true, layout
  });
};

/**
 * 注册表单组件
 * @param {string | object} component 组件对象或组件名称
 * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile
 * @param {string | string[]} types 组件的类型
 * @param {boolean | null} forArray 是否为数组类型的数据组件（可选）,为null表示同时支持数组和非数组的数据格式
 * @param {(definition: FieldDefinition, platform: Platform) => object} getProps 组件属性转换器（可选）
 */
export const register = (component: string | Component,
                         platforms: Platform | Platform[],
                         types: string | string[],
                         forArray: boolean = null,
                         getProps: ((definition: FieldDefinition, platform: Platform) => {[key: string]: unknown}) = () => ({})) => {
  registerComponent({
    component, platforms, types, forArray, getProps, forDisplay: false, layout: false
  });
};

export const registerDesktop = (
  component: string | Component,
  types: string | string[],
  forArray: boolean = null,
  getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, DESKTOP, types, forArray, getProps);
};

export const registerMobile = (
  component: string | Component,
  types: string | string[],
  forArray: boolean = null,
  getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, MOBILE, types, forArray, getProps);
};

export const registerResponsiveComponent = (
  component: string | Component,
  types: string | string[],
  forArray: boolean = null,
  getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, [MOBILE, DESKTOP], types, forArray, getProps);
};
