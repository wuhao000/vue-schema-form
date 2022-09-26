import {PlusOutlined} from '@ant-design/icons-vue';
import {computed, defineComponent, inject, PropType, provide, watch} from 'vue';
import {SchemaFormField} from '../../../types';
import {FieldDefinition} from '../bean/field-definition';
import {transformFormProps} from '../config';
import {isEqual} from '../uform/utils';
import {SchemaFormObjectStoreKey} from '../utils/key';
import {DESKTOP, getButtonComponent, getFormComponent, getRowComponent, MOBILE} from '../utils/utils';
import {baseFieldComponentProps, useBaseFieldComponent} from './field-based-component';
import {getComponentType, getRealFields} from './utils';
import {TableStoreKey} from "../layout/table";

export default defineComponent({
  name: 'TableRow',
  inheritAttrs: false,
  props: {
    title: [Object, String],
    arrayIndex: Number,
    pathPrefix: Array,
    index: {type: Boolean as PropType<boolean>, default: false},
    field: {type: Object as PropType<FieldDefinition>, required: true},
    schemaPath: Array,
    inline: {type: Boolean, default: false},
    layoutType: [String, Object],
    layoutProps: Object,
    ...baseFieldComponentProps
  },
  emits: ['update:value', 'change'],
  setup(props, {emit, slots, attrs}) {
    const {currentValue, store, renderFormField} = useBaseFieldComponent(props, {emit});
    const tableStore = inject<{
      setValue: (v, index) => void
    }>(TableStoreKey);
    watch(() => currentValue.value, (value) => {
      emit('update:value', value);
      emit('change', value);
    }, {deep: true});
    watch(() => props.value, (value) => {
      tableStore.setValue(value, props.arrayIndex);
      if (!isEqual(value, currentValue.value)) {
        if (props.field.array) {
          currentValue.value = value || [];
        } else {
          currentValue.value = value || {};
        }
      } else if (!value) {
        currentValue.value = {};
      }
    }, {immediate: true, deep: true});
    return {
      currentValue
    };
  },
  render() {
    return undefined;
  }
});
