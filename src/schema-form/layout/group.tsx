import {defineComponent} from 'vue';

export default defineComponent({
  name: 'GroupLayout',
  inheritAttrs: false,
  render() {
    return this.$slots.default?.();
  }
})
