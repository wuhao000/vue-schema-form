import {SchemaFormStoreKey} from '../utils/key';
import {renderField} from './utils';
import {SchemaFormField, SchemaFormStore} from '../../../types';
import {inject, Ref, ref } from 'vue';

export const baseFieldComponentProps = {
  value: [Object, Array],
  pathPrefix: Array
};

export const useBaseFieldComponent = (props, {emit}) => {
  const currentValue: Ref<{ [key: string]: any } | Array<{ [key: string]: any }>> = ref(null);
  const store: SchemaFormStore = inject(SchemaFormStoreKey as any);
  return {
    currentValue, store,
    renderFormField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number,
                    wrap: boolean, arrayIndex: number) {
      return renderField(props.pathPrefix, store, field, currentValue, index, wrap, emit, arrayIndex);
    }
  };
};
