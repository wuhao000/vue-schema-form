import {Component} from '@vue/runtime-core';
import {
  ArrayMode,
  DisplayComponentOptions,
  FieldDefinition,
  Platform,
  SchemaFormComponent,
  SchemaFormComponentOptions
} from '../../../types';
import {registerComponent} from '../config';
import {DESKTOP, fixComponentDefinition, MOBILE, Mode} from './utils';

interface StorePlatformComponents {
  desktop: {
    [key: string]: SchemaFormComponent[]
  };
  mobile: {
    [key: string]: SchemaFormComponent[]
  };
}

export class ComponentStore {

  public display: StorePlatformComponents = {
    desktop: {},
    mobile: {}
  };
  public edit: StorePlatformComponents = {
    desktop: {},
    mobile: {}
  };

  public addComponent(options: SchemaFormComponentOptions) {
    const mode = options.mode.includes('display') ? this.display : this.edit;
    const typeDef = mode[options.platforms as Platform];
    if (!typeDef[options.types as string]) {
      typeDef[options.types as string] = [];
    }
    const def: SchemaFormComponent = fixComponentDefinition(options, options.mode.includes('display'));
    typeDef[options.types as string].push(def);
  }

  public search(mode: Mode,
                platform: Platform,
                type: string,
                array?: boolean) {
    const typeDef = (mode === Mode.Display ? this.display : this.edit)[platform][type] as SchemaFormComponent[];
    if (!typeDef || typeDef.length === 0) {
      return;
    }
    let component = null;
    if (array) {
      component = typeDef.find(it => it.mode.includes('array') || it.mode.includes('singleOrArray'));
    } else if (array === false) {
      component = typeDef.find(it => it.mode.includes('single') || it.mode.includes('singleOrArray'));
    }
    if (!component) {
      component = typeDef[0];
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
    mode: [arrayMode ?? 'singleOrArray', 'display'],
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
                         arrayMode: ArrayMode = 'singleOrArray',
                         getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = () => ({})) => {
  registerComponent({
    component,
    platforms,
    types,
    mode: [arrayMode, 'input'],
    getProps
  });
};

export const registerDesktop = (
    component: string | Component,
    types: string | string[],
    arrayMode: ArrayMode = 'singleOrArray',
    getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, DESKTOP, types, arrayMode, getProps);
};

export const registerMobile = (
    component: string | Component,
    types: string | string[],
    arrayMode: ArrayMode = 'singleOrArray',
    getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, MOBILE, types, arrayMode, getProps);
};

const ALL_PLATFORMS = [MOBILE, DESKTOP];
export const registerResponsiveComponent = (
    component: string | Component,
    types: string | string[],
    arrayMode: ArrayMode = ['singleOrArray'],
    getProps: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown }) = null) => {
  register(component, ALL_PLATFORMS, types, arrayMode, getProps);
};
