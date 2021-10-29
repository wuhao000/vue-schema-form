import {inject, PropType} from 'vue';
import {SchemaFormField, SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';

export const baseLayoutProps = {
  layout: {type: Array, required: true},
  fields: {type: [Array, Object] as PropType<any[]>},
  fieldDefinitions: {
    type: Array as PropType<SchemaFormField[]>
  }
};

export const useBaseLayout = (): { store: SchemaFormStore } => ({
  store: inject(SchemaFormStoreKey)
});
