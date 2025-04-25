import { computed, defineComponent, provide, ref } from 'vue';
import { VFormStoreKey } from '../utils/key';

export default defineComponent({
  name: 'VForm',
  props: {
    value: [Object, Array]
  },
  setup(props) {
    const fields = ref([]);
    const localValue = ref(props.value);
    const store = {
      register: (fieldDef) => {
        if (!fieldDef.property) {
          console.error('Property is required');
          return;
        }
        const existsIndex = fields.value.findIndex(it => it.property === fieldDef.property);
        if (existsIndex >= 0) {
          fields.value.splice(existsIndex, 1, fieldDef);
        } else {
          fields.value.push(fieldDef);
        }
      }
    };
    provide(VFormStoreKey, store);
    const schema = computed(() => {
      return {
        fields: fields.value
      }
    })
    return {
      store, schema, localValue
    };
  },
  render() {
    return [<v-schema-form
      v-model={[this.localValue, 'value']}
      schema={this.schema} />, this.$slots?.default()]
  }
})
