import {FieldDefinition} from '../bean/field-definition';
import {isRef, unref} from 'vue';
import {setStructValue} from './destruct';

export const setFieldValue = (parentValue: { [key: string]: unknown }, field: FieldDefinition, fieldValue: any, emit) => {
  const value = isRef(fieldValue) ? unref(fieldValue) : fieldValue;
  if (field.getComponent()?.mode === 'layout' || !field.plainPath) {
    return;
  }
  if (field.processor) {
    field.processor.setValue(parentValue, field, value);
  } else {
    setStructValue(parentValue, field.destructPath.destruct || field.name, value);
  }
};
