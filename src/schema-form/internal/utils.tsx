import FormField from './field';
import {getStructValue} from '../utils/destruct';
import {setFieldValue} from '../utils/field';
import {splitPath} from '../utils/path';
import {getComponent, getDisplayComponent} from '../utils/register';
import {getFormComponent, TYPES} from '../utils/utils';
import {clone, parseDestructPath, toArr} from '../../uform/utils';
import get from 'lodash.get';
import {
  Effects, EffectsContext,
  FormFields, FormProps,
  IField,
  Platform,
  SchemaFormComponent,
  SchemaFormField,
  ShowFieldCondition
} from 'v-schema-form-types';
import Vue, {VNode} from 'vue';

export interface SchemaFormStore {
  fields: { [key: string]: IField };
  effects?: Effects;
  props?: FormProps;
  disabled?: boolean;
  platform?: Platform;
  readonly?: boolean;
  loading?: boolean;
  inline?: boolean;
  slots?: { [key: string]: VNode[] | undefined };
  editable?: boolean;
  context?: EffectsContext | null;
}

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
  if (!definition.depends) {
    return definition.visible || definition.visible === null || definition.visible === undefined;
  } else {
    if (typeof definition.depends === 'function') {
      return definition.depends(currentValue);
    } else {
      return !definition.depends
        .map(condition => matchCondition(currentValue, condition))
        .some(it => !it);
    }
  }
}

export function getRealFields(fields: FormFields) {
  if (typeof fields === 'object') {
    return Object.keys(fields)
      .filter(key => fields[key])
      .map(key => ({
        property: key,
        ...fields[key]
      }));
  } else {
    return (fields as SchemaFormField[]).filter(it => it !== null && it !== undefined);
  }
}


export function getComponentType(store: SchemaFormStore,
                                 definition: SchemaFormField): SchemaFormComponent {
  let component: SchemaFormComponent = null;
  if (!store.editable || definition.editable === false) {
    component = getDisplayComponent(store.platform, definition);
  } else {
    component = getComponent(store.platform, definition);
  }
  if (component.component === 'empty') {
    console.warn(`类型${definition.type}${definition.array ? '（数组）' : ''}没有对应的${store.editable ? '编辑' : '详情'}组件`);
  }
  return component;
}


export function matchCondition(value: any, condition: ShowFieldCondition): boolean {
  if (!value) {
    return false;
  } else {
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
  }
  return true;
}

export function renderField(pathPrefix: string[] | null, store: SchemaFormStore,
                            field: SchemaFormField,
                            currentValue: { [p: string]: any } | Array<{ [p: string]: any }>,
                            index: number, wrap: boolean, h) {
  if (field.slot) {
    return store.slots[field.slot];
  }
  let value = null;
  if (field.property && field.property.includes('.')) {
    value = getPropertyValueByPath(field.property.substr(0, field.property.lastIndexOf('.')), currentValue);
  } else {
    value = currentValue;
  }
  if (field.type === TYPES.object) {
    if (!field.props) {
      field.props = {props: store.props};
    } else {
      field.props.props = store.props;
    }
    field.props.effects = store.effects;
  }
  const iField = createField(currentValue, store, pathPrefix, field);
  const component = getComponentType(store, field);
  const props = {
    value: getFieldValue(value, iField, component),
    wrap,
    field: iField,
    path: buildArrayPath(pathPrefix, field),
    disabled: iField.disabled || store.disabled,
    definition: field,
    formValue: currentValue
  };
  // @ts-ignore
  return <FormField props={props}
                    onInput={(v) => {
                      setFieldValue(value, iField, v);
                    }}
                    key={'field-' + field.property + '-' + index}/>;
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


export function createField(currentValue: any, store: SchemaFormStore, pathPrefix: string[],
                            definition: SchemaFormField): IField {
  const plainPath = buildArrayPath(pathPrefix, definition).join('.');
  const existsField: IField = store.fields[plainPath];
  if (existsField) {
    existsField.component = getComponentType(store, definition);
    return existsField;
  } else {
    const plainPath = buildArrayPath(pathPrefix, definition).join('.');
    return Vue.observable({
      id: definition.id,
      definition,
      disabled: false,
      enum: definition.enum || null,
      title: definition.title,
      array: definition.array,
      type: definition.type,
      component: getComponentType(store, definition),
      processor: definition.processor,
      display: true,
      editable: definition.editable === undefined ? true : definition.editable,
      name: definition.property,
      path: buildArrayPath(pathPrefix, definition),
      plainPath,
      destructPath: parseDestructPath(definition.property),
      props: Object.assign({}, definition.props),
      visible: calcShowState(currentValue, definition),
      valid: true,
      displayValue: definition.displayValue,
      required: definition.required,
      fields: definition.fields,
      effectErrors: [],
      errors: [],
      hiddenFromParent: false,
      initialValue: null,
      initialize: () => {
      },
      invalid: false,
      value: currentValue,
      setGetValue: null,
      rules: getRulesFromProps(definition)
    });
  }
}

const getRulesFromProps = (props: SchemaFormField) => {
  const rules = toArr(props.rules);
  if (props.required && !rules.some(rule => rule.required)) {
    rules.push({required: true});
  }
  return clone(rules);

};
export const getFieldValue = (value: any, field: IField<any>, component: SchemaFormComponent) => {
  if (component.layout) {
    return value;
  }
  if (field.processor) {
    return field.processor.getValue(value, field);
  } else {
    return getStructValue(value, field.destructPath!.destruct || field.name);
  }
};

export function hasListener(vue: Vue, event: string): boolean {
  return !!vue.$listeners[event];
}


export function getFormItemComponent(platform: Platform) {
  return getFormComponent(platform) + '-item';
}


export function searchSchema(path: string, def: SchemaFormField): SchemaFormField {
  if (!path) {
    return null;
  }
  const parts = path.split('.');
  let df: SchemaFormField = def;
  parts.forEach(part => {
    if (df.fields) {
      if (typeof df.fields === 'object') {
        df = df.fields[part];
      } else if (Array.isArray(df.fields)) {
        df = (df.fields as any[]).find(it => it.property === part);
      }
    } else {
      df = null;
    }
  });
  return df;
}


export enum SchemaFormEvents {
  fieldFocus = 'fieldFocus',
  fieldBlur = 'fieldBlur',
  fieldChange = 'fieldChange',
  fieldCreate = 'fieldCreate',
  validate = 'validate'
}

export const filterErros = (errors: any[]) => {
  return errors.filter(it => Array.isArray(it) && it.length > 0).flat()
    .concat(errors.filter(it => typeof it === 'object' && !Array.isArray(it) && it !== null));
};
