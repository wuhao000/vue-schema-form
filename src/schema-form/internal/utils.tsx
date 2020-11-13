import get from 'lodash.get';
import uuid from 'uuid';
import {
  FormFields,
  IField,
  Platform,
  SchemaFormComponent,
  SchemaFormField,
  SchemaFormStore,
  ShowFieldCondition
} from 'types';
import Vue from 'vue';
import {clone, parseDestructPath, toArr} from '../../uform/utils';
import {getStructValue} from '../utils/destruct';
import {setFieldValue} from '../utils/field';
import {splitPath} from '../utils/path';
import {getComponent, getDisplayComponent} from '../utils/register';
import {getFormComponent, TYPES} from '../utils/utils';
import FormField from './field';

export function getPropertyValueByPath(property: string,
                                       currentValue: { [p: string]: any } | Array<{ [p: string]: any }>,
                                       vue: any) {
  const propertyPath = splitPath(property);
  let tmp = currentValue;
  propertyPath.forEach(path => {
    if (!tmp[path]) {
      vue.$set(tmp, path, {});
    }
    tmp = tmp[path];
  });
  return get(currentValue, property);
}

export function calcShowState(currentValue, definition: SchemaFormField): boolean {
  if (!definition.depends) {
    if (typeof definition.visible === 'boolean') {
      return definition.visible;
    }
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


export function getComponentType(store: SchemaFormStore,
                                 definition: SchemaFormField): SchemaFormComponent {
  let component: SchemaFormComponent = null;
  if (!store.editable || definition.editable === false) {
    component = getDisplayComponent(store.platform, definition);
  } else {
    component = getComponent(store.platform, definition);
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

export function renderField(pathPrefix: string[] | null,
                            store: SchemaFormStore,
                            field: SchemaFormField,
                            currentValue: { [p: string]: any } | Array<{ [p: string]: any }>,
                            index: number, wrap: boolean, h, vue) {
  let value = null;
  if (field.property?.includes('.')) {
    value = getPropertyValueByPath(field.property.substr(0, field.property.lastIndexOf('.')),
        currentValue, vue);
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
    value: getFieldValue(value, iField, component, vue),
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
                      setFieldValue(value, iField, v, vue);
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
    existsField.definition = definition;
    if (existsField.fields !== definition.fields) {
      existsField.fields = definition.fields;
    }
    return existsField;
  } else {
    return Vue.observable({
      array: definition.array,
      component: getComponentType(store, definition),
      definition,
      destructPath: parseDestructPath(definition.property),
      disabled: false,
      display: true,
      displayValue: definition.displayValue,
      editable: definition.editable === undefined ? true : definition.editable,
      effectErrors: [],
      enum: definition.enum || null,
      errors: [],
      fields: proxyFields(definition.fields),
      hiddenFromParent: false,
      id: definition.id,
      initialValue: null,
      initialize: () => {
      },
      invalid: false,
      name: definition.property,
      path: buildArrayPath(pathPrefix, definition),
      plainPath,
      processor: definition.processor,
      props: Object.assign({}, definition.props),
      required: definition.required,
      rules: getRulesFromProps(definition),
      setGetValue: null,
      store,
      title: definition.title,
      type: definition.type,
      valid: true,
      value: currentValue,
      visible: calcShowState(currentValue, definition)
    });
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

const getRulesFromProps = (props: SchemaFormField) => {
  const rules = toArr(props.rules);
  if (props.required && !rules.some(rule => rule.required)) {
    rules.push({required: true});
  }
  return clone(rules);

};
export const getFieldValue = (value: any, field: IField<any>,
                              component: SchemaFormComponent, vue: any) => {
  if (component.layout) {
    return value;
  }
  if (field.processor) {
    return field.processor.getValue(value, field);
  } else {
    return getStructValue(value, field.destructPath!.destruct || field.name, vue, field);
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
  fieldKeyup = 'fieldKeyup',
  fieldKeydown = 'fieldKeydown',
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


export function getCurrentValue(value, defaultValue) {
  const cloneValue = clone(value);
  if (cloneValue !== undefined && cloneValue !== null) {
    return cloneValue;
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  return null;
}
