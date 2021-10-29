import {computed, getCurrentInstance, inject} from 'vue';
import {SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';

export const useBaseInput = (props: any, ctx) => {
  const instance = getCurrentInstance();
  const store: SchemaFormStore = inject(SchemaFormStoreKey, undefined);
  const form: any = inject('form', undefined);
  const formField: any = inject('formField', undefined);
  if (formField) {
    formField.setControl(instance);
  }
  const size = computed(() => {
    return form?.value?.size ?? store?.props?.size;
  });
  const field = props.field || ctx.attrs.field;
  const editable = computed(() => {
    return store.editable && field.editable;
  });
  const disabled = computed(() => {
    return (props.disabled || ctx.attrs.disabled || form?.value?.disabled || store?.loading) ?? false;
  });
  return {
    store, field, editable, disabled, form, size, formField
  };
};
