import clone from 'lodash.clonedeep';
import get from 'lodash.get';
import uuid from 'uuid';
import {Component, isVNode, reactive, VNode} from 'vue';
import {
  DefaultPatternRule, FormFields, IFormPathMatcher, IRuleDescription, Path, Platform, SchemaFormComponent,
  SchemaFormComponentOptions, SchemaFormField, SchemaFormFieldType, SchemaFormStore, ShowFieldCondition, ValueProcessor
} from '../../../types';
import Empty from '../empty';
import {isArr, parseDestructPath} from '../uform/utils';
import regexp, {errorMessages} from '../uform/validator/regexp';
import {getStructValue} from '../utils/destruct';
import {setFieldValue} from '../utils/field';
import {splitPath} from '../utils/path';
import {globalComponentStore} from '../utils/register';
import {fixComponentDefinition, isNotNull, isNull, LibComponents, Mode} from '../utils/utils';
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

export function getRealFields(definition: SchemaFormField) {
  const fields = [];
  Object.keys(definition).forEach(key => {
    if (key.startsWith('$') && definition[key]) {
      const field = definition[key];
      field.property = key.substr(1)
      fields.push(field);
    }
  });
  const fieldsObject = definition.fields;
  if (typeof fieldsObject === 'object') {
    Object.keys(fieldsObject)
      .filter(key => fieldsObject[key])
      .forEach(key => {
        const field = fieldsObject[key];
        if (!field.property) {
          field.property = key;
        }
        fields.push(field);
      });
  } else if (Array.isArray(fieldsObject)){
    fields.push(...(fieldsObject as SchemaFormField[]).filter(it => isNotNull(it)));
  }
  fields.forEach(field => {
    if (!field.id) {
      field.id = uuid.v4();
    }
    if (!field.property) {
      throw new Error('表单字段必须设置property属性');
    }
  });
  return fields;
}

const EmptyDefinition = {
  component: Empty,
  mode: 'both',
  arrayMode: 'both',
  platform: 'desktop',
  getProps: () => ({})
} as SchemaFormComponent;

const missingTypes = [];

export function getComponentType(store: SchemaFormStore,
                                 definition: {
                                   type: string,
                                   editable?: boolean,
                                   array?: boolean
                                 }): SchemaFormComponent {
  const type = definition.type;
  const array = definition.array ?? false;
  const mode: Mode = (!store.editable || definition.editable === false) ? Mode.Display : Mode.Edit;
  const component: SchemaFormComponent = store.components.search(mode, store.platform, type, array)
    || globalComponentStore.search(mode, store.platform, type, array) || EmptyDefinition;
  if (component.component === Empty) {
    const typeStr = type + mode + store.platform + array;
    if (!missingTypes.includes(typeStr)) {
      console.warn(`类型${type}${array ? '（数组）' : ''}没有对应的${store.platform}${mode === 'display' ? '详情' : '编辑'}组件`);
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

function getComponent(field: SchemaFormField,
                      store: SchemaFormStore,
                      forDisplay = false,
                      platform: Platform = 'desktop'): SchemaFormComponent {
  const type = field.xType || field.type;
  if (field.slot) {
    return undefined;
  }
  if (typeof type === 'string') {
    return getComponentType(store, {
      type,
      editable: field.editable,
      array: field.array
    });
  }
  if (typeof type === 'function' || isVNode(type)) {
    return {
      component: type,
      platform,
      mode: forDisplay ? 'display' : 'input',
      arrayMode: 'single',
      layoutOptions: null,
      valueProp: 'value',
      wrap: true,
      getProps: () => {
        return {};
      }
    };
  }
  if (typeof type === 'object' && typeof type['render'] === 'function') {
    return {
      component: type,
      platform,
      mode: forDisplay ? 'display' : 'input',
      arrayMode: 'single',
      layoutOptions: null,
      valueProp: 'value',
      wrap: true,
      getProps: () => {
        return {};
      }
    };
  }
  return fixComponentDefinition(type as SchemaFormComponentOptions | SchemaFormComponentOptions[], !field.editable);
}

export function renderField(pathPrefix: string[] | null,
                            store: SchemaFormStore,
                            fieldDefinition: SchemaFormField,
                            currentValue: { [p: string]: any } | Array<{ [p: string]: any }>,
                            index: number, wrap: boolean, emit) {
  let value = null;
  if (fieldDefinition.property?.includes('.')) {
    value = getPropertyValueByPath(fieldDefinition.property.substr(0, fieldDefinition.property.lastIndexOf('.')), currentValue);
  } else {
    value = currentValue;
  }
  const newField = createField(currentValue, store, pathPrefix, fieldDefinition);
  const component = getComponent(fieldDefinition, store);
  const props: any = {
    wrap,
    field: newField,
    path: newField.path,
    disabled: newField.disabled || store.disabled || store.loading,
    definition: fieldDefinition,
    formValue: currentValue,
    'onUpdate:value': v => {
      setFieldValue(value, newField, v, emit);
    },
    key: `field-${fieldDefinition.property}-${index}`,
    index
  };
  props.value = getFieldValue(value, newField, component);
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
  public type: string | Component | SchemaFormComponentOptions | SchemaFormComponentOptions[] = null;
  public processor: ValueProcessor;
  public description?: string | VNode;
  public destructPath?: {
    path: string,
    destruct: any
  } = null;
  public display = false;
  public displayValue?: any = null;
  public editable = true;
  public errors?: string[] = null;
  public events?: { [key: string]: (...args: any[]) => any };
  public fields?: FormFields = null;
  public focus?: (event?: boolean) => any = null;
  public default?: V = null;
  public invalid?: boolean = false;
  public loading = false;
  public match?: (path: Path | IFormPathMatcher) => boolean = null;
  public name?: string = null;
  public onChange?: (fn: () => void) => void = null;
  public path?: string[] = null;
  public plainPath?: string = null;
  public pristine?: boolean = null;
  public props?: { [key: string]: any } = null;
  public required = false;
  public min?: number;
  public max?: number;
  public rules?: IRuleDescription[] = null;
  public setGetValue?: (value?: any) => any = null;
  public store?: SchemaFormStore = null;
  public valid = true;
  public validate?: (trigger?: string) => (boolean | Promise<unknown>) = null;
  public inputRef?: any;
  public value: V = null;
  public visible = true;
  public xType: SchemaFormFieldType = null;
  public slot?: string = null;
  public layoutType?: string | { [key: string]: unknown };
  public layoutProps?: { [key: string]: unknown };
  public placeholder?: string;

  constructor(definition: SchemaFormField,
              store: SchemaFormStore,
              pathPrefix: string[], currentValue: any) {
    this.placeholder = definition.placeholder;
    this.layoutType = definition.layoutType;
    this.layoutProps = definition.layoutProps;
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
    this.events = definition.events;
    this.editable = definition.editable === undefined ? true : definition.editable;
    this.name = definition.property;
    this.path = buildArrayPath(pathPrefix, definition);
    this.plainPath = buildArrayPath(pathPrefix, definition).join('.');
    this.destructPath = parseDestructPath(definition.property);
    this.props = reactive(Object.assign({}, definition.xProps || definition.props));
    this.visible = calcShowState(currentValue, definition);
    this.valid = true;
    this.displayValue = definition.displayValue;
    this.required = definition.required;
    this.min = definition.min;
    this.max = definition.max;
    this.fields = getRealFields(definition);
    this.description = definition.description;
    this.errors = [];
    this.default = definition.default;
    this.invalid = false;
    this.value = currentValue;
    this.setGetValue = null;
  }

  public getRules() {
    return getRulesFromProps(this.definition, this.required);
  }


  public generateEvents(): { [key: string]: (...args: any[]) => any } {

    const getEventMetadata = (event) => {
      return {event, path: this.plainPath, field: this};
    };

    const onFocus = (event, ...args) => {
      if (this.events?.onFocus) {
        this.events?.onFocus?.(this.store.context, event, ...args);
      } else if (this.props?.onBlur) {
        this.props?.onFocus?.(event, ...args);
      }
      const input = this.inputRef;
      let el: any;
      if (isVNode(input)) {
        el = input.el;
      } else {
        el = input;
      }
      if (el) {
        if (el.focus) {
          el.focus({preventScroll: false});
          if (event === true) {
            el.scrollIntoView({behavior: 'smooth'});
          }
        }
        this.store.context.trigger(SchemaFormEvents.fieldFocus, getEventMetadata(event));
      }
    };

    const onKeydown = (event, ...args) => {
      if (this.events?.onKeydown) {
        this.events?.onKeydown?.(this.store.context, event, ...args);
      } else if (this.props?.onKeydown) {
        this.props?.onKeydown?.(event, ...args);
      }
      this.store.context.trigger(SchemaFormEvents.fieldKeydown, getEventMetadata(event));
    };

    const onKeyup = (event, ...args) => {
      if (this.events?.onKeyup) {
        this.events?.onKeyup?.(this.store.context, event, ...args);
      } else if (this.props?.onKeyup) {
        this.props?.onKeyup?.(event, ...args);
      }
      this.store.context.trigger(SchemaFormEvents.fieldKeyup, getEventMetadata(event));
    };

    const onBlur = (event, ...args) => {
      if (this.events?.onBlur) {
        this.events?.onBlur?.(this.store.context, event, ...args);
      } else if (this.props?.onBlur) {
        this.props?.onBlur?.(event, ...args);
      }
      if (this.valid) {
        this.validate('blur');
      } else {
        this.validate();
      }
      this.store.context.trigger(SchemaFormEvents.fieldBlur, getEventMetadata(event));
    };

    const fieldEvents = {
      onBlur, onFocus, onKeydown, onKeyup
    };
    if (this.events) {
      const keys = Object.keys(fieldEvents);
      Object.keys(this.events).filter(it => !keys.includes(it)).forEach(eventKey => {
        fieldEvents[eventKey] = (...args) => {
          this.events[eventKey](this.store.context, ...args);
        };
      });
    }
    return fieldEvents;
  }

  public getComponent(forDisplay = false, platform: Platform = 'desktop'): SchemaFormComponent | undefined {
    return getComponent(this, this.store, forDisplay, platform);
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

const resolveRule = (rule: IRuleDescription | DefaultPatternRule): IRuleDescription => {
  if (typeof rule === 'string') {
    return {
      pattern: regexp[rule],
      message: errorMessages[rule]
    };
  } else {
    return rule;
  }
};

const getRulesFromProps = (field: SchemaFormField, required: boolean) => {
  const rules: IRuleDescription[] = [];
  if (isArr(field.rules)) {
    field.rules.forEach(rule => {
      rules.push(resolveRule(rule));
    });
  } else {
    resolveRule(field.rules);
  }
  if (required && !rules.some(rule => rule.required)) {
    rules.push({required: true, message: `${field.title ?? '该字段'}为必填项`});
  }
  if (field.format && !rules.some(rule => rule.format === field.format)) {
    rules.push({format: field.format, message: `${field.title ?? '字段'}格式不正确`});
  }
  if (isNotNull(field.min)) {
    if (['integer', 'double', 'number'].includes(field.type as string)) {
      rules.push({type: 'number', min: field.min, message: `${field.title}不能小于${field.min}`});
    } else if (['string', 'html', 'code', 'text'].includes(field.type as string)) {
      rules.push({type: 'string', min: field.min, message: `${field.title}长度不能小于${field.min}`});
    }
  }
  if (isNotNull(field.max)) {
    if (['integer', 'double', 'number'].includes(field.type as string)) {
      rules.push({type: 'number', max: field.max, message: `${field.title}不能大于${field.max}`});
    } else if (['string', 'text'].includes(field.type as string)) {
      rules.push({type: 'string', max: field.max, message: `${field.title}长度不能大于${field.max}`});
    }
  }
  return clone(rules);

};
export const getFieldValue = (value: any,
                              field: FieldDefinition,
                              component: SchemaFormComponent) => {
  if (component?.mode?.includes('layout')) {
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


export const isNullStructValue = (value, struct) => {
  if (isNull(value)) {
    return true;
  }
  if (struct === undefined) {
    return false;
  }
  if (typeof struct === 'string') {
    return false;
  }
  if (Array.isArray(struct)) {
    return !struct.some((s, index) => {
      return !isNullStructValue(value[index], s);
    });
  } else {
    return !Object.keys(struct).some(key => {
      return !isNullStructValue(value[key], struct[key]);
    });
  }
};
