/*
  @Prop([Array, Object])
  public value: { [key: string]: any } | Array<{ [key: string]: any }>;
  @Prop(Array)
  public pathPrefix: string[];
  public currentValue: { [key: string]: any } | Array<{ [key: string]: any }> = null;
  @Inject()
  public store: SchemaFormStore;

 */

import {SchemaFormStoreKey} from '../utils/key';
import {renderField} from './utils';
import {SchemaFormField, SchemaFormStore} from '../../../types';
import {inject, Ref, ref } from 'vue';

export const baseFieldComponentProps = {
  value: [Object, Array],
  pathPrefix: Array
};

export const useBaseFieldComponent = (props, ctx) => {
  const currentValue: Ref<{ [key: string]: any } | Array<{ [key: string]: any }>> = ref(null);
  const store: SchemaFormStore = inject(SchemaFormStoreKey);
  return {
    currentValue, store,
    renderFormField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number, wrap: boolean) {
      return renderField(props.pathPrefix, store, field, currentValue, index, wrap, ctx.emit);
    }
  };
};
