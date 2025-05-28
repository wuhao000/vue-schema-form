import { defineComponent } from 'vue';
import BaseField from './base-field';

export default defineComponent({
  name: 'VmSwitchItem',
  inheritAttrs: false,
  props: {
    value: Boolean
  },
  emits: ['update:value'],
  render() {
    return (
      <BaseField {...this.$attrs}>
        <van-switch
          {...this.$attrs}
          modelValue={this.value}
          onUpdate:modelValue={(v) => {
            this.$emit('update:value', v);
          }}
        />
      </BaseField>
    );
  }
});