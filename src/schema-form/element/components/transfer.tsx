import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'Transfer',
  props: {
    modelValue: Array,
    data: Array as PropType<any[]>
  },
  emits: ['update:modelValue'],
  render() {
    const dataSource = (this.data || []).map(it => {
      return {
        ...it,
        key: it.key ?? it.value,
        title: it.title ?? it.label
      };
    });
    const props: any = {
      ...this.$attrs,
      modelValue: this.modelValue,
      data: dataSource,
      'onUpdate:modelValue': (value) => {
        this.$emit('update:modelValue', value);
      }
    };
    return <el-transfer {...props}/>;
  }
});
