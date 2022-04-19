import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SwitchDisplay',
  props: {
    value: Boolean,
    onLabel: [String, Object],
    offLabel: [String, Object]
  },
  render() {
    if (this.value) {
      return this.onLabel ?? '是';
    } else {
      return this.offLabel ?? '否';
    }
  }
});
