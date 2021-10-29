import {defineComponent, ref, watch} from 'vue';
import {useBaseInput} from '../mixins';

export default defineComponent({
  name: 'InputComp',
  props: {
    value: {type: [String, Number]}
  },
  emits: ['update:value'],
  setup(props, ctx) {
    const {size} = useBaseInput(props, ctx);
    const localValue = ref(props.value);
    const onUpdate = (value) => {
      localValue.value = value;
      ctx.emit('update:value', value);
    };
    watch(() => props.value, (value) => {
      if (value !== localValue.value) {
        localValue.value = value;
      }
    });
    return {
      size, localValue, onUpdate
    };
  },
  render(ctx) {
    const props = {
      size: ctx.size,
      ...ctx.$attrs,
      ...ctx.$props,
      value: this.localValue,
      'onUpdate:value': this.onUpdate
    };
    return <a-input {...props} v-slots={this.$slots}/>;
  }
});
