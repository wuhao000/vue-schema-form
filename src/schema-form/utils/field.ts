import {getStructValue, setStructValue} from '@/schema-form/utils/destruct';
import {IField} from '@/uform/types';

export const setFieldValue = (parentValue: object, field: IField, v: any) => {
  if (field.processor) {
    field.processor.setValue(parentValue, field, v);
  } else {
    setStructValue(parentValue, field.destructPath.destruct || field.name, v);
  }
};

export const getFieldValue = (value: any, field: IField<any>) => {
  if (field.processor) {
    return field.processor.getValue(value, field);
  } else {
    return getStructValue(value, field.destructPath.destruct || field.name);
  }
};
