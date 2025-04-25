import { computed, defineComponent, inject, PropType, VNode, watch } from 'vue';
import { SchemaFormField } from '../../../types';
import { VFormStoreKey } from '../utils/key';

export default defineComponent({
  name: 'VFormItem',
  props: {
    title: [String, Object] as PropType<string | VNode>,
    prop: {
      type: String,
      required: true
    },
    enum: [Array],
    type: {
      type: String,
      required: true
    }
  },
  setup(props, {attrs}) {
    const store = inject(VFormStoreKey, undefined);
    if (!store) {
      throw new Error('VFormItem must be used within a VForm component');
    }
    const def = computed(() => {
      return {
        property: props.prop,
        type: props.type,
        title: props.title,
        enum: props.enum,
        xProps: {
          ...attrs
        }
      } as SchemaFormField;
    });
    watch(() => def.value, () => {
      store.register(def.value);
    }, {immediate: true})
    return {};
  }
});
