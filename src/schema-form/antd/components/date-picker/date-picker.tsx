import {DatePicker} from 'ant-design-vue';
import moment, {Moment} from 'moment';
import {computed, defineComponent, ref, watch} from 'vue';

const convertValue = (value: Date | number, format: string): any => {
  if (!value) {
    return undefined;
  }
  if (typeof value === 'string') {
    return moment(value, format);
  } else if (typeof value === 'number') {
    return moment(value);
  } else {
    return moment(value);
  }
};

const convertValueBack = (value: Moment | undefined): Date => {
  if (value === undefined || value === null) {
    return null;
  } else {
    return value.toDate();
  }
};

export default defineComponent({
  name: 'DDatePicker',
  props: {
    value: {},
    mode: {type: String, default: 'date'}
  },
  setup(props, {emit}) {
    const currentValue = ref<Moment>(null);

    const format = computed(() => {
      switch (props.mode) {
        case 'date':
          return 'YYYY-MM-DD';
        case 'datetime':
          return 'YYYY-MM-DD HH:mm:ss';
      }
    });
    watch(() => props.value, (value: any) => {
      const convertedValue = convertValue(value, format.value);
      if (currentValue.value === null || currentValue.value === undefined) {
        currentValue.value = convertedValue;
      } else if (!convertedValue) {
        currentValue.value = null;
      } else if (currentValue.value.toString() !== convertedValue.toString()) {
        currentValue.value = convertedValue;
      }
    }, {immediate: true});
    watch(() => currentValue.value, (value) => {
      const val = convertValueBack(value);
      if (props.value !== undefined) {
        emit('update:value', val);
      }
      emit('change', val);
    });
    return {
      currentValue, updateCurrentValue(value) {
        currentValue.value = value;
      },
      mode: props.mode
    };
  },
  render() {
    const {mode, currentValue} = this;
    const finalMode = mode === 'datetime' ? 'time' : mode;
    const props = {
      ...this.$attrs,
      value: currentValue,
      mode: finalMode,
      'onUpdate:value': this.updateCurrentValue
    };
    if (mode === 'week') {
      return <DatePicker.WeekPicker {...props}/>
    }
    if (mode === 'month') {
      return <DatePicker.MonthPicker {...props}/>;
    }
    // @ts-ignore
    return <DatePicker {...props}/>;
  }
});
