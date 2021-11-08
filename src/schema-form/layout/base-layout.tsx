import {inject, PropType} from 'vue';
import {SchemaFormField, SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';

export const baseLayoutProps = {
  layout: {type: Array, required: true},
  fieldDefinitions: {
    type: Array as PropType<SchemaFormField[]>
  }
};

export const useBaseLayout = (): { store: SchemaFormStore } => ({
  store: inject(SchemaFormStoreKey)
});
