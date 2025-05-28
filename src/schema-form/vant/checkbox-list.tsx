import { defineComponent, PropType, ref, watch } from 'vue';
import { SelectOption } from '../../types/form';
import BaseField from './base-field';

export default defineComponent({
  name: 'VmCheckboxList',
  props: {
    options: {
      type: Array as PropType<SelectOption[]>
    },
    value: Array
  },
  emits: ['update:value'],
  setup(props) {
    const localValue = ref();
    watch(() => props.value, v => {
      localValue.value = v;
    }, { immediate: true });
    return {
      localValue
    };
  },
  render() {
    return (
      <BaseField
        {...this.$attrs}
      >
        <van-checkbox-group
          v-model={[this.localValue, 'modelValue']}
          direction="horizontal"
        >
          {
            this.options.map(option => (
              <van-checkbox
                {...option}
                key={option.value}
                name={option.value}>
                {option.label}
              </van-checkbox>
            ))
          }
        </van-checkbox-group>
      </BaseField>
    );
  }
});


