import {FieldDefinition} from '../internal/utils';
import { isRef, unref } from 'vue';
import {setStructValue} from './destruct';

export const setFieldValue = (parentValue: { [key: string]: unknown }, field: FieldDefinition, fieldValue: any, emit) => {
  const value = isRef(fieldValue) ? unref(fieldValue) : fieldValue;
  if (field.getComponent().mode === 'layout') {
    return;
  }
  if (!field.plainPath) {
    emit('update:value', value);
    emit('change', value);
  } else if (field.processor) {
    field.processor.setValue(parentValue, field, value);
  } else {
    setStructValue(parentValue, field.destructPath.destruct || field.name, value);
  }
};
