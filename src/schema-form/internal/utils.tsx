import clone from 'lodash.clonedeep';
import get from 'lodash.get';
import uuid from 'uuid';
import {isVNode, reactive, VNode} from 'vue';
import {
  FormFields,
  IFieldOptions,
  IFieldState,
  IFormPathMatcher,
  IRuleDescription,
  Path,
  Platform,
  SchemaFormComponent,
  SchemaFormComponentOptions,
  SchemaFormField,
  SchemaFormStore,
  ShowFieldCondition,
  ValueProcessor
} from '../../../types';
import Empty from '../empty';
import {parseDestructPath, toArr} from '../uform/utils';
import {getStructValue} from '../utils/destruct';
import {setFieldValue} from '../utils/field';
import {splitPath} from '../utils/path';
import {globalComponentStore} from '../utils/register';
import {FieldTypes, fixComponentDefinition, isNotNull, LibComponents, MOBILE, Mode} from '../utils/utils';
import FormField from './field';

export function getPropertyValueByPath(property: string, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
  const propertyPath = splitPath(property);
  let tmp = currentValue;
  propertyPath.forEach(path => {
    if (!tmp[path]) {
      tmp[path] = {};
    }
    tmp = tmp[path];
  });
  return get(currentValue, property);
}

export function calcShowState(currentValue, definition: SchemaFormField) {
  if (definition.depends) {
    if (typeof definition.depends === 'function') {
      return definition.depends(currentValue);
    } else {
      return !definition.depends
          .map(condition => matchCondition(currentValue, condition))
          .some(it => !it);
    }
  } else {
    return definition.visible || definition.visible === null || definition.visible === undefined;
  }
}

export function getRealFields(fields: FormFields) {
  if (typeof fields === 'object') {
    return Object.keys(fields)
        .filter(key => fields[key])
        .map(key => {
          const field = fields[key];
          if (!field.id) {
            field.id = uuid.v4();
          }
          return {
            id: field.id,
            property: key,
            ...fields[key]
          };
        });
  } else {
    return (fields as SchemaFormField[]).filter(it => it !== null && it !== undefined);
  }
}

const EmptyDefinition = {
  component: Empty,
  getProps: (_) => ({})
} as SchemaFormComponent;

const missingTypes = [];

export function getComponentType(store: SchemaFormStore,
                                 definition: {
                                   type: string,
                                   editable?: boolean,
                                   array?: boolean
                                 }): SchemaFormComponent {
  const type = definition.type;
  const mode: Mode = (!store.editable || definition.editable === false) ? Mode.Display : Mode.Edit;
  const component: SchemaFormComponent = store.components.search(mode, store.platform, type, definition.array)
      || globalComponentStore.search(mode, store.platform, type, definition.array) || EmptyDefinition;
  if (component.component === Empty) {
    const typeStr = type + mode + store.platform + definition.array;
    if (!missingTypes.includes(typeStr)) {
      console.warn(`类型${type}${definition.array ? '（数组）' : ''}没有对应的${store.platform}${mode === 'display' ? '详情' : '编辑'}组件`);
      missingTypes.push(typeStr);
    }
  }
  return component;
}


export function matchCondition(value: any, condition: ShowFieldCondition): boolean {
  if (!value) {
    return false;
  }
  const currentValue = value[condition.property];
  const compareValue = condition.value;
  if (currentValue === null || currentValue === undefined) {
    switch (condition.operator) {
      case 'in':
        return compareValue.includes(currentValue);
      case 'notIn':
        return !compareValue.includes(currentValue);
    }
    return false;
  } else {
    switch (condition.operator) {
      case '=':
        return compareValue.toString() === currentValue.toString();
      case '<':
        return parseFloat(currentValue) < parseFloat(compareValue);
      case '>':
        return parseFloat(currentValue) > parseFloat(compareValue);
      case '>=':
        return parseFloat(currentValue) >= parseFloat(compareValue);
      case '<=':
        return parseFloat(currentValue) <= parseFloat(compareValue);
      case 'in':
        return compareValue.includes(currentValue);
      case 'notIn':
        return !compareValue.includes(currentValue);
    }
  }
  return true;
}

export function renderField(pathPrefix: string[] | null,
                            store: SchemaFormStore,
                            field: SchemaFormField,
                            currentValue: { [p: string]: any } | Array<{ [p: string]: any }>,
                            index: number, wrap: boolean, emit) {
  let value = null;
  if (field.property?.includes('.')) {
    value = getPropertyValueByPath(field.property.substr(0, field.property.lastIndexOf('.')), currentValue);
  } else {
    value = currentValue;
  }
  if (field.type === FieldTypes.Object) {
    if (field.props) {
      field.props.props = store.props;
    } else {
      field.props = {props: store.props};
    }
    field.props.effects = store.effects;
  }
  const newField = createField(currentValue, store, pathPrefix, field);
  const type = field.xType || field.type;
  const component = field.slot ? undefined : (
      typeof type === 'string' ? getComponentType(store, {
        type,
        editable: field.editable,
        array: field.array
      }) : fixComponentDefinition(type, !field.editable)
  );
  const props: any = {
    wrap,
    field: newField,
    path: buildArrayPath(pathPrefix, field),
    disabled: newField.disabled || store.disabled || store.loading,
    definition: field,
    formValue: currentValue,
    'onUpdate:value': (v) => {
      setFieldValue(value, newField, v, emit);
    },
    key: `field-${field.property}-${index}`,
    index
  };
  if (!component || component.forInput) {
    props.value = getFieldValue(value, newField, component);
  }
  return <FormField {...props}/>;
}


export function buildArrayPath(pathPrefix: string[], field: SchemaFormField): string[] {
  if (pathPrefix) {
    return pathPrefix.concat(field.property);
  } else {
    if (field.property) {
      return field.property.split('.');
    }
    return [];
  }
}

export class FieldDefinition<V = any> {
  public id: string = null;
  public definition: SchemaFormField = null;
  public disabled = false;
  public enum: any[] | (() => any[] | Promise<any[]>) | Promise<any[]> = null;
  public title: any = null;
  public array = false;
  public type: string | SchemaFormComponentOptions | SchemaFormComponentOptions[] = null;
  public processor: ValueProcessor;
  public changeEditable?: (editable: boolean | ((name: string) => boolean)) => void = null;
  public description?: string | VNode;
  public destructPath?: {
    path: string,
    destruct: any
  } = null;
  public destructor?: () => void = null;
  public dirty?: boolean = null;
  public dirtyType?: string = null;
  public display = false;
  public displayValue?: any = null;
  public editable = true;
  public effectErrors?: string[] = null;
  public errors?: string[] = null;
  public fields?: FormFields = null;
  public focus?: (event?: boolean) => any = null;
  public hiddenFromParent?: boolean = null;
  public default?: V = null;
  public initialize?: (options: IFieldOptions) => void = null;
  public invalid?: boolean = false;
  public lastValidateValue?: V = null;
  public loading = false;
  public match?: (path: Path | IFormPathMatcher) => boolean = null;
  public name?: string = null;
  public notify?: (forceUpdate?: boolean) => void = null;
  public onChange?: (fn: () => void) => void = null;
  public path?: string[] = null;
  public pathEqual?: (path: Path | IFormPathMatcher) => boolean = null;
  public plainPath?: string = null;
  public pristine?: boolean = null;
  public props?: any = null;
  public publishState?: () => IFieldState = null;
  public required = false;
  public min?: number;
  public max?: number;
  public rules?: IRuleDescription[] = null;
  public setGetValue?: (value?: any) => any = null;
  public shownFromParent?: boolean = null;
  public syncContextValue?: () => void = null;
  public store?: SchemaFormStore = null;
  public updateState?: (fn: (state: IFieldState) => void) => void = null;
  public valid = true;
  public validate?: () => (boolean | Promise<unknown>) = null;
  public inputRef?: any;
  public value: V = null;
  public visible = true;
  public xType: string | SchemaFormComponentOptions = null;
  public slot?: string = null;
  public forInput? = true;

  constructor(definition: SchemaFormField,
              store: SchemaFormStore,
              pathPrefix: string[], currentValue: any) {
    this.array = definition.array;
    this.definition = definition;
    this.disabled = false;
    this.display = true;
    this.enum = definition.enum || null;
    this.id = definition.id;
    this.processor = definition.processor;
    this.slot = definition.slot;
    this.store = store;
    this.title = definition.title;
    this.type = definition.type;
    this.xType = definition.xType;
    this.editable = definition.editable === undefined ? true : definition.editable;
    this.name = definition.property;
    this.path = buildArrayPath(pathPrefix, definition);
    this.plainPath = buildArrayPath(pathPrefix, definition).join('.');
    this.destructPath = parseDestructPath(definition.property);
    this.props = Object.assign({}, definition.props);
    this.visible = calcShowState(currentValue, definition);
    this.valid = true;
    this.displayValue = definition.displayValue;
    this.required = definition.required;
    this.min = definition.min;
    this.max = definition.max;
    this.fields = proxyFields(definition.fields);
    this.effectErrors = [];
    this.description = definition.description;
    this.errors = [];
    this.hiddenFromParent = false;
    this.default = definition.default;
    this.initialize = () => {
      // default do nothing
    };
    this.invalid = false;
    this.value = currentValue;
    this.setGetValue = null;
  }

  public getRules() {
    return getRulesFromProps(this.definition, this.required);
  }

  public getComponent(forDisplay = false, platform: Platform = 'desktop'): SchemaFormComponent {
    const type = this.xType || this.type;
    if (typeof type === 'string') {
      return getComponentType(this.store, {
        type,
        editable: this.editable,
        array: this.array
      });
    }
    if (typeof type === 'function' || isVNode(type)) {
      return {
        component: type,
        platform: platform,
        type: '',
        forArray: false,
        forInput: !forDisplay,
        layoutOptions: null,
        valueProp: 'value',
        wrap: true,
        layout: null,
        getProps: () => {
          return {};
        }
      };
    }
    return fixComponentDefinition(type, forDisplay);
  }
}


export function createField(currentValue: any,
                            store: SchemaFormStore,
                            pathPrefix: string[],
                            definition: SchemaFormField): FieldDefinition {
  const plainPath = buildArrayPath(pathPrefix, definition).join('.');
  const existsField: FieldDefinition = store.fields[plainPath];
  if (existsField) {
    return existsField;
  } else {
    const field = new FieldDefinition(definition, store, pathPrefix, currentValue);
    return reactive(field) as FieldDefinition;
  }
}

const proxyFields = (fields: FormFields): FormFields => {
  if (fields) {
    if (Array.isArray(fields)) {
      fields.forEach((field, index) => {
        fields[index] = proxyField(field);
      });
    } else {
      Object.keys(fields).forEach(key => {
        fields[key] = proxyField(fields[key]);
      });
    }
  }
  return fields;
};

const proxyField = (field: SchemaFormField): SchemaFormField => {
  // return new Proxy(field, {
  //   get: (target, property) => {
  //     return target[property];
  //   }
  // });
  return field;
};

const getRulesFromProps = (field: SchemaFormField, required: boolean) => {
  const rules: IRuleDescription[] = toArr(field.rules);
  if (required && !rules.some(rule => rule.required)) {
    rules.push({required: true, message: `${field.title ?? '该字段'}为必填项`});
  }
  if (field.format && !rules.some(rule => rule.format === field.format)) {
    rules.push({format: field.format, message: `${field.title ?? '字段'}格式不正确`});
  }
  if (isNotNull(field.min)) {
    rules.push({min: field.min});
  }
  if (isNotNull(field.max)) {
    rules.push({max: field.max});
  }
  return clone(rules);

};
export const getFieldValue = (value: any, field: FieldDefinition, component: SchemaFormComponent) => {
  if (component?.layout) {
    return value;
  }
  if (field.processor) {
    return field.processor.getValue(value, field);
  } else {
    return getStructValue(value, field.destructPath.destruct || field.name);
  }
};

export const getFormItemComponent = (platform: Platform) => LibComponents.formItem[platform];

export const getSelectComponent = (platform: Platform) => LibComponents.select[platform];

export const getInputComponent = (platform: Platform) => LibComponents.input[platform];

export enum SchemaFormEvents {
  fieldKeyup = 'fieldKeyup',
  fieldKeydown = 'fieldKeydown',
  fieldFocus = 'fieldFocus',
  fieldBlur = 'fieldBlur',
  fieldChange = 'fieldChange',
  fieldCreate = 'fieldCreate',
  validate = 'validate'
}
