import { computed, defineComponent, PropType, ref, watch } from 'vue';
import BaseField from './base-field';

export default defineComponent({
  name: 'VmTimePicker',
  props: {
    title: [String, Object],
    value: String
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const localValue = ref();

    watch(() => props.value, (v) => {
      const range: Array<number | string> = [null, null];
      if (v) {
        const [startHour, startMinute] = v.split(':');
        range[0] = parseInt(startHour);
        range[1] = parseInt(startMinute);
      }
      localValue.value = range;
    }, { immediate: true });

    const valueString = computed(() => {
      const v = localValue.value;
      return v[0] + ':' + v[1];
    });

    const show = ref(false);

    const onConfirm = () => {
      const v = localValue.value;
      const result = v[0] + ':' + v[1];
      if (props.value !== result) {
        emit('update:value', result);
      }
      show.value = false;
    };

    const onCancel = () => {
      show.value = false;
    };

    return {
      localValue,
      valueString,
      onConfirm,
      onCancel,
      show
    };
  },
  render() {
    return [
      <BaseField
        {...this.$attrs}
        title={this.title}
        onClick={() => {
          this.show = true;
        }}>
        {this.valueString}
      </BaseField>,
      <van-popup
        show={this.show}
        destroyOnClose
        position="bottom"
      >
        <van-time-picker
          v-model={[this.localValue, 'modelValue']}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          title={this.title}
        />
      </van-popup>
    ];
  }
});