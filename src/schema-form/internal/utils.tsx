import FormField from '@/schema-form/field';
import {getComponent, getDisplayComponent, TYPES} from '@/schema-form/utils';
import {getStructValue} from '@/schema-form/utils/destruct';
import {setFieldValue} from '@/schema-form/utils/field';
import {FormFields, FormProps, SchemaFormField, ShowFieldCondition} from '@/types/bean';
import {EffectsContext, SchemaFormComponent} from '@/types/form';
import {IField} from '@/uform/types';
import {parseDestructPath} from '@/uform/utils';
import get from 'lodash.get';
import Vue, {VNode} from 'vue';

export interface SchemaFormStore {
  fields: { [key: string]: IField };
  fieldNodes: VNode[];
  effects: EffectsContext;
  props: FormProps;
  disabled: boolean;
  platform: 'mobile' | 'desktop';
  mode: 'edit' | 'display';
  readonly: boolean;
  loading: boolean;
  inline: boolean;
}

export function getPropertyValueByPath(property: string, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
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


export function getComponentType(store: SchemaFormStore, definition: SchemaFormField, field: IField): SchemaFormComponent {
  let component: SchemaFormComponent = null;
  if (store.mode === 'display') {
    component = getDisplayComponent(store.platform, definition);
  } else {
    component = getComponent(store.platform, definition);
  }
  if (component.component === 'empty') {
    console.warn(`类型${field.type}${field.array ? '（数组）' : ''}没有对应的${store.mode === 'display' ? '展示' : '编辑'}组件`);
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


export function buildFieldPath(pathPrefix: string[], field: SchemaFormField): string[] {
  if (pathPrefix) {
    return pathPrefix.concat(field.property);
  } else {
    return [field.property];
  }
}

export function renderField(this: any, pathPrefix: string[], store: SchemaFormStore, field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number, wrap: boolean, h) {
  const {platform} = store;
  let value = null;
  if (field.property.includes('.')) {
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
  const component = getComponentType(store, field, iField);
  // @ts-ignore
  return <FormField
      component={component}
      value={getFieldValue(value, iField, component)}
      onInput={(v) => {
        setFieldValue(value, iField, v);
      }}
      wrap={wrap}
      field={iField}
      path={buildFieldPath(pathPrefix, field)}
      display={this.display}
      disabled={store.disabled}
      content={this.$slots[field.slot]}
      definition={field}
      key={'field-' + field.property + '-' + index}
      formValue={currentValue}
      platform={platform}/>;
}


export function buildArrayPath(pathPrefix: string[], field: SchemaFormField): string[] {
  if (pathPrefix) {
    return pathPrefix.concat(field.property);
  } else {
    return field.property.split('.');
  }
}


export function createField(currentValue: any, store: SchemaFormStore, pathPrefix: string[],
                            definition: SchemaFormField): IField {
  const plainPath = buildFieldPath(pathPrefix, definition).join('.');
  const existsField: IField = store.fields[plainPath];
  if (existsField) {
    existsField.display = store.mode === 'display';
    existsField.editable = !store.disabled && !store.readonly;
    return existsField;
  } else {
    return Vue.observable({
      title: definition.title,
      array: definition.array,
      type: definition.type,
      enum: definition.enum,
      processor: definition.processor,
      display: store.mode === 'display',
      editable: !store.disabled && !store.readonly,
      name: definition.property,
      path: buildArrayPath(pathPrefix, definition),
      plainPath: buildFieldPath(pathPrefix, definition).join('.'),
      destructPath: parseDestructPath(definition.property),
      props: Object.assign({}, definition.props),
      visible: calcShowState(currentValue, definition),
      required: definition.required,
      fields: definition.fields,
      effectErrors: [],
      errors: [],
      hiddenFromParent: false,
      initialValue: null,
      initialize: () => {
      },
      invalid: false,
      value: null
    });
  }
}

export const getFieldValue = (value: any, field: IField<any>, component: SchemaFormComponent) => {
  if (component.layout) {
    return value;
  }
  if (field.processor) {
    return field.processor.getValue(value, field);
  } else {
    return getStructValue(value, field.destructPath.destruct || field.name);
  }
};

export function hasListener(vue: Vue, event: string): boolean {
  return !!vue.$listeners[event];
}
