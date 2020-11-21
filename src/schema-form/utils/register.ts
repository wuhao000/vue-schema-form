import {IField, Platform, SchemaFormComponent, SchemaFormComponentOptions, SchemaFormField} from '../../../types';
import Empty, {createEmpty} from '../empty';
import {DESKTOP, MOBILE, Mode} from './utils';

function getEmptyDefinition(text: string) {
  return {
    component: createEmpty(text),
    getProps: (_) => ({})
  } as SchemaFormComponent;
}

const SchemaFormComponentDefinitions: SchemaFormComponent[] = [];
const DisplayComponentDefinitions: SchemaFormComponent[] = [];

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

/**
 * 注册表单组件
 * @param {string | object} component 组件对象或组件名称
 * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile
 * @param {string | string[]} types 组件的类型
 * @param {boolean | null} forArray 是否为数组类型的数据组件（可选）,为null表示同时支持数组和非数组的数据格式
 * @param {(definition: IField, platform: Platform) => object} getProps 组件属性转换器（可选）
 */
export const register = (component: string | object,
                         platforms: Platform | Platform[],
                         types: string | string[],
                         forArray: boolean = null,
                         getProps: ((definition: IField, platform: Platform) => object) = () => ({})) => {
  addComponent({
    component, platforms, types, forArray, getProps, forDisplay: false, layout: false
  });
};

export const addComponent = (options: SchemaFormComponentOptions) => {
  const finalOptions = {
    component: options.component,
    wrap: options.wrap,
    layout: options.layout,
    forArray: options.forArray !== undefined ? options.forArray : null,
    platforms: options.platforms,
    modelEvent: options.modelEvent
  };
  if (Array.isArray(options.types)) {
    options.types.forEach(type => {
      addComponent(Object.assign(finalOptions, {
        types: type,
        getProps: options.getProps,
        forDisplay: options.forDisplay
      }));
    });
  } else if (Array.isArray(options.platforms)) {
    options.platforms.forEach(platform => {
      addComponent(Object.assign(finalOptions, {
        platforms: platform,
        types: options.types,
        getProps: options.getProps,
        forDisplay: options.forDisplay
      }));
    });
  } else {
    const getProps = options.getProps || (() => ({}));
    const def: SchemaFormComponent = Object.assign(finalOptions, {
      type: options.types,
      platform: options.platforms,
      getProps: (field: IField) => {
        const props: any = getProps(field, options.platforms as any) || {};
        if (field.title && options.platforms === MOBILE && !props.labelNumber) {
          props.labelNumber = typeof field.title === 'string' ? (field.title.length > 7 ? 7 : field.title.length) : 7;
        }
        if (field.props) {
          Object.assign(props, field.props);
        }
        return props;
      }
    });
    const mode = options.forDisplay ? 'display' : 'edit';
    const typeDef = store[mode][options.platforms];
    if (!typeDef[options.types]) {
      typeDef[options.types] = {};
    }
    if (def.forArray) {
      typeDef[options.types][1] = def;
    } else if (def.forArray === false) {
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

export const registerDesktop = (component: string | object,
                                types: string | string[],
                                forArray: boolean = null,
                                getProps: ((definition: IField, platform: Platform) => object) = null) => {
  register(component, DESKTOP, types, forArray, getProps);
};

export const registerResponsiveComponent = (component: string | object,
                                            types: string | string[],
                                            forArray: boolean = null,
                                            getProps: ((definition: IField, platform: Platform) => object) = null) => {
  register(component, [MOBILE, DESKTOP], types, forArray, getProps);
};

export const MISSING_TYPES = [];

function searchStore(mode: Mode,
                     platform: Platform,
                     definition: SchemaFormField): SchemaFormComponent {
  const type = definition.xType || definition.type;
  const typeDef = store[mode ?? 'edit'][platform ?? 'desktop'][type];
  if (!typeDef) {
    if (type && !MISSING_TYPES.includes(type)) {
     MISSING_TYPES.push(type);
    }
    return getEmptyDefinition(`<不支持的类型${type}>`);
  }
  if (definition.array) {
    const res = typeDef[1] || typeDef[0] || typeDef[2] || getEmptyDefinition('');
    if (res.component === Empty) {
      if (type) {
        console.warn(`类型${type}${definition.array ? '（数组）' : ''}没有对应的${mode === 'display' ? '详情' : '编辑'}组件`);
      }
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
