import {FieldDefinition} from '../bean/field-definition';
import {isRef, unref} from 'vue';
import {setStructValue} from './destruct';

export const setFieldValue = (parentValue: { [key: string]: unknown }, field: FieldDefinition, fieldValue: any, emit) => {
  const value = isRef(fieldValue) ? unref(fieldValue) : fieldValue;
  if (['layout', 'render'].includes(field.getComponent()?.mode)) {
    return;
  }
  if (!field.plainPath) {
    emit('update:value', value);
    return;
  }
  if (field.processor) {
    field.processor.setValue(parentValue, field, value);
  } else {
    const struct = field.destructPath.destruct || field.name
    if (struct) {
      setStructValue(parentValue, struct, value);
    } else {
      emit('update:value', value);
    }
  }
};
