import {Rate} from 'ant-design-vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'RateDisplay',
  props: {
    value: {},
    disabled: Boolean
  },
  render() {
    const props = {value: this.value, disabled: true}
    // @ts-ignore
    return <Rate {...props}/>;
  }
});
