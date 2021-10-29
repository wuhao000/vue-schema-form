import {computed, PropType, ref, watch} from 'vue';

export const baseTimeRangePickerProps = {
  value: Array,
  valueType: {
    type: String as PropType<'string' | 'array'>,
    default: 'array'
  },
  separator: {
    type: String as PropType<string>,
    default: '-'
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  placeholder: {
    type: Array as PropType<string[]>,
    default: () => ['开始时间', '结束时间']
  },
  format: {
    type: String as PropType<string>,
    default: 'HH:mm:ss'
  }
};

export const useBaseTimeRangePicker = (props, {attrs, emit, convertValue, convertValueBack, valueProp}) => {
  const start = ref(null);
  const end = ref(null);
  watch(() => props.value, (value: any) => {
    const convertedValue = convertValue(value);
    if (!convertedValue) {
      start.value = null;
      end.value = null;
    } else if (start.value !== convertedValue[0] || end.value !== convertedValue[1]) {
      start.value = convertedValue[0];
      end.value = convertedValue[1];
    }
  }, {immediate: true});
  watch(() => [start.value, end.value], (v) => {
    const convertedValue = convertValueBack(v);
    emit(`update:${valueProp}`, convertedValue);
  }, {deep: true});
  const fieldProps = computed(() => {
    const localProps = {...attrs};
    delete localProps.value;
    delete localProps[`onUpdate:${valueProp}`];
    return localProps;
  });
  return {
    fieldProps,
    start,
    end
  };
};
