import {ComputedRef} from 'vue';
import {FieldDefinition} from '../src/schema-form/bean/field-definition';
import {SchemaFormStore} from './bean';

export const useBaseInput: (props, ctx) => {
  store: SchemaFormStore;
  field: FieldDefinition;
  editable: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  form: any;
  size: ComputedRef<string>;
  formField: any;
};
