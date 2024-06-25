import {defineComponent} from 'vue';

export default defineComponent({
  name: 'RateDisplay',
  props: {
    value: Number
  },
  render() {
    const props = {
      ...this.$props,
      ...this.$attrs,
      modelValue: this.value,
      disabled: true
    }
    return <el-rate {...props} />;
  }
});
