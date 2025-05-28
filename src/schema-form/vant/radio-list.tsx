import { defineComponent, PropType, ref, watch } from 'vue';
import { SelectOption } from '../../types/form';
import BaseField from './base-field';


export default defineComponent({
  name: 'VmRadioList',
  inheritAttrs: false,
  props: {
    options: {
      type: Array as PropType<SelectOption[]>
    },
    value: [String, Number, Boolean, Object]
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
        <van-radio-group
          v-model={[this.localValue, 'modelValue']}
          direction="horizontal"
        >
          {
            this.options.map(option => (
              <van-radio
                {...option}
                key={option.value}
                name={option.value}>
                {option.label}
              </van-radio>
            ))
          }
        </van-radio-group>
      </BaseField>
    );
  }
});


