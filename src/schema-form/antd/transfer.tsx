import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'Transfer',
  props: {
    value: Array,
    dataSource: Array as PropType<any[]>
  },
  emits: ['update:value'],
  render() {
    const dataSource = (this.dataSource || []).map(it => {
      return {
        ...it,
        key: it.key ?? it.value,
        title: it.title ?? it.label
      };
    });
    const props: any = {
      ...this.$attrs,
      targetKeys: this.value,
      dataSource,
      onChange: (value) => {
        this.$emit('update:value', value);
      }
    };
    return <a-transfer {...props}/>;
  }
});
