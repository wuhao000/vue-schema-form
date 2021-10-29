import {ComputedRef} from 'vue';
import {FieldDefinition, SchemaFormStore} from './types/bean';

export const useBaseInput: (props, ctx) => {
  store: SchemaFormStore;
  field: FieldDefinition;
  editable: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  form: any;
  size: ComputedRef<string>;
  formField: any;
};
