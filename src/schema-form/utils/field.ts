import {setStructValue} from './destruct';
import {IField} from 'v-schema-form-types';

export const setFieldValue = (parentValue: object, field: IField, v: any) => {
  if (field.component.layout) {
    return;
  }
  if (field.processor) {
    field.processor.setValue(parentValue, field, v);
  } else {
    setStructValue(parentValue, field.destructPath!.destruct || field.name, v);
  }
};
