import {Rate} from 'ant-design-vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'RateDisplay',
  props: {
    value: {
      type: Number
    },
    disabled: Boolean
  },
  render() {
    const props = {value: this.value, disabled: true}
    return <Rate {...props}/>;
  }
});
