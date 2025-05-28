import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { createHourOptions } from './utils';
import BaseField from './base-field';

export default defineComponent({
  name: 'VmTimeRangePicker',
  props: {
    title: [String, Object],
    value: Array as PropType<string[]>
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const options = [
      // 第一列
      createHourOptions(24, '时'),
      // 第二列
      createHourOptions(60, '分'),
      [
        { label: '至', value: '-' }
      ],
      createHourOptions(24, '时'),
      createHourOptions(60, '分')
    ];
    const localValue = ref([]);

    watch(() => props.value, (v) => {
      const range: Array<number | string> = [null, null, '-', null, null];
      const start = v?.[0];
      const end = v?.[1];
      if (start) {
        const [startHour, startMinute] = start.split(':');
        range[0] = parseInt(startHour);
        range[1] = parseInt(startMinute);
      }
      if (end) {
        const [endHour, endMinute] = end.split(':');
        range[3] = parseInt(endHour);
        range[4] = parseInt(endMinute);
      }
      localValue.value = range;
    }, { immediate: true });

    const valueString = computed(() => {
      const v = localValue.value;
      return v[0] + ':' + v[1] + ' - ' + v[3] + ':' + v[4];
    });

    const show = ref(false);

    const onConfirm = () => {
      const v = localValue.value;
      const result = [
        v[0] + ':' + v[1], v[3] + ':' + v[4]
      ];
      if (props.value?.[0] !== result[0] || props.value?.[1] !== result[1]) {
        emit('update:value', result);
      }
      show.value = false;
    };

    const onCancel = () => {
      show.value = false;
    };

    return {
      options,
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
        <van-picker
          v-model={[this.localValue, 'modelValue']}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          columns={this.options}
          columnsFieldNames={
            { text: 'label' }
          }
          title={this.title}
        />
      </van-popup>
    ];
  }
});