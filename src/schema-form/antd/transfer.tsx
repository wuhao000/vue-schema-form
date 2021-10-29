import {Transfer} from 'ant-design-vue';
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'Transfer',
  props: {
    value: Array
  },
  emits: ['update:value'],
  render() {
    const props: any = {
      ...this.$attrs, targetKeys: this.value, onChange: (value) => {
        this.$emit('update:value', value);
      }
    };
    return <Transfer {...props}/>;
  }
});
