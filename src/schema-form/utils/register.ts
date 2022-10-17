import {Component} from '@vue/runtime-core';
import {
  ArrayMode,
  DisplayComponentOptions,
  Platform,
  SchemaFormComponent,
  SchemaFormComponentOptions,
  StorePlatformComponents
} from '../../../types';
import {FieldDefinition} from '../bean/field-definition';
import {registerComponent} from '../config';
import {DESKTOP, fixComponentDefinition, MOBILE, Mode} from './utils';


export class ComponentStore {

  public store: StorePlatformComponents = {
    desktop: {},
    mobile: {}
  };

  public addComponent(options: SchemaFormComponentOptions) {
    const typeDef = this.store[options.platforms as Platform];
    if (!typeDef[options.types as string]) {
      typeDef[options.types as string] = [];
    }
    const def: SchemaFormComponent = fixComponentDefinition(options, options.mode === 'display');
    typeDef[options.types as string].splice(0,0, def);
  }

  public search(mode: Mode,
                platform: Platform,
                type: string,
                array?: boolean) {
    const typeDef = this.store[platform][type] as SchemaFormComponent[];
    if (!typeDef || typeDef.length === 0) {
      return;
    }
    let filteredComponents = [];
    if (mode === 'edit') {
      filteredComponents = typeDef.filter(it => it.mode === 'input' || it.mode === 'both');
    } else if (mode === 'display') {
      filteredComponents = typeDef.filter(it => it.mode === 'display' || it.mode === 'both');
    }
    let component = null;
    if (array) {
      component = filteredComponents.find(it => ['array', 'both'].includes(it.arrayMode));
    } else if (array === false) {
      component = filteredComponents.find(it => ['single', 'both'].includes(it.arrayMode));
    }
    if (!component) {
      if (filteredComponents.length === 0) {
        return typeDef.find(it => ['layout', 'render'].includes(it.mode));
      }
      return filteredComponents[0];
    }
    return component;
  }
}

export const globalComponentStore = new ComponentStore();

export const registerDisplay = ({
                                  component,
                                  platforms,
                                  types,
                                  arrayMode,
                                  getProps = () => ({})
                                }: DisplayComponentOptions) => {
  registerComponent({
    component,
    platforms,
    types,
    mode: 'display',
    arrayMode: arrayMode || 'single',
    getProps
  });
};

/**
 * 注册表单组件
 * @param {string | object} component 组件对象或组件名称
 * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile
 * @param {string | string[]} types 组件的类型
 * @param {ArrayMode} arrayMode
 * @param {(definition: FieldDefinition, platform: Platform) => object} getProps 组件属性转换器（可选）
 */
export const register = (component: string | Component,
                         platforms: Platform | Platform[],
                         types: string | string[],
                         arrayMode: ArrayMode = 'both',
                         getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = () => ({})) => {
  registerComponent({
    component,
    platforms,
    types,
    arrayMode: arrayMode,
    getProps
  });
};

export const registerDesktop = (
  component: string | Component,
  types: string | string[],
  arrayMode: ArrayMode = 'both',
  getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, DESKTOP, types, arrayMode, getProps);
};

export const registerMobile = (
  component: string | Component,
  types: string | string[],
  arrayMode: ArrayMode = 'both',
  getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, MOBILE, types, arrayMode, getProps);
};

const ALL_PLATFORMS: Platform[] = [MOBILE, DESKTOP];
export const registerResponsiveComponent = (
  component: string | Component,
  types: string | string[],
  arrayMode: ArrayMode = 'both',
  getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, ALL_PLATFORMS, types, arrayMode, getProps);
};
