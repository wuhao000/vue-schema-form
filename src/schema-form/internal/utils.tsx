import _ from 'lodash';
import {v4} from 'uuid';
import {reactive} from 'vue';
import {
  Platform,
  SchemaFormComponent,
  SchemaFormField,
  SchemaFormStore,
  ShowFieldCondition
} from '../../../types';
import {FieldDefinition, getComponent} from '../bean/field-definition';
import Empty from '../empty';
import {getStructValue} from '../utils/destruct';
import {setFieldValue} from '../utils/field';
import {splitPath} from '../utils/path';
import {globalComponentStore} from '../utils/register';
import {isNotNull, isNull, LibComponents, Mode} from '../utils/utils';
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
  return _.get(currentValue, property);
}

export function calcEditable(definition: SchemaFormField,
                             currentValue: any,
                             field: FieldDefinition): boolean | undefined {
  if (isNull(definition.editable)) {
    return undefined
  }
  if (typeof definition.editable === 'function') {
    return definition.editable(currentValue, field);
  }
  return definition.editable;
}

export function calcShowState(definition: SchemaFormField,
                              currentValue: any,
                              field: FieldDefinition) {
  if (isNull(definition.visible)) {
    return undefined;
  }
  if (definition.visible) {
    if (typeof definition.visible === 'function') {
      return definition.visible(currentValue, field);
    } else if (Array.isArray(definition.visible)) {
      return !definition.visible
          .map(condition => matchCondition(currentValue, condition))
          .some(it => !it);
    } else {
      return true;
    }
  }
  return false;
}

export function getRealFields(definition: SchemaFormField | FieldDefinition) {
  const fields = [];
  Object.keys(definition).forEach(key => {
    if (key.startsWith('$') && definition[key]) {
      const field = definition[key];
      field.property = key.substring(1);
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
  } else if (Array.isArray(fieldsObject)) {
    fields.push(...(fieldsObject as SchemaFormField[]).filter(it => isNotNull(it)));
  }
  fields.forEach(field => {
    if (!field.id) {
      field.id = v4();
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
                                   editable?: boolean | ((value: any, field: FieldDefinition) => boolean),
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
      case 'nin':
        return !compareValue.includes(currentValue);
    }
    return false;
  } else {
    switch (condition.operator) {
      case '!=':
        return compareValue === currentValue;
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
      case 'nin':
        return !compareValue.includes(currentValue);
    }
  }
  return true;
}

export function renderField(pathPrefix: string[] | null,
                            store: SchemaFormStore,
                            fieldDefinition: SchemaFormField,
                            currentValue: { [p: string]: any } | Array<{ [p: string]: any }>,
                            index: number, wrap: boolean, emit) {
  let value = null;
  if (fieldDefinition.property?.includes('.')) {
    value = getPropertyValueByPath(fieldDefinition.property.substring(0, fieldDefinition.property.lastIndexOf('.')), currentValue);
  } else {
    value = currentValue;
  }
  const newField = createField(currentValue, store, pathPrefix, fieldDefinition);
  const component = getComponent(fieldDefinition, store);
  const props: any = {
    wrap,
    field: newField,
    path: newField.path,
    pathPrefix: component.mode === 'input' ? newField.path : pathPrefix,
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

export const isNoWrap = (inputFieldDef: SchemaFormComponent, definition: SchemaFormField, store: SchemaFormStore, field?: FieldDefinition) => {
  if (definition.array && typeof definition.arrayComponent === 'string') {
    const componentDef = getComponentType(store, {
      type: definition.arrayComponent
    });
    if (componentDef.layoutOptions.noWrap) {
      return true;
    }
  }
  return (definition?.wrapperProps?.noWrap ?? inputFieldDef.layoutOptions?.noWrap) ?? isNull(field?.title);
};
