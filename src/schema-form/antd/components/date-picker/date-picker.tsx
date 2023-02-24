import dayjs, {Dayjs} from 'dayjs';
import {computed, defineComponent, PropType, ref, watch} from 'vue';

const convertValue = (value: Date | number, format: string, mode: Mode): any => {
  if (!value) {
    return undefined;
  }
  if (mode === 'year') {
    const m = dayjs();
    m.set('year', value as number);
    return m;
  }
  if (typeof value === 'string') {
    return dayjs(value, format);
  } else if (typeof value === 'number') {
    return dayjs(value);
  } else {
    return dayjs(value);
  }
};

const convertValueBack = (value: Dayjs | undefined, mode: Mode): Date | number => {
  if (value === undefined || value === null) {
    return null;
  } else {
    if (mode === 'year') {
      return value.year();
    }
    if (mode === 'month') {
      return value.set('date', 1).set('hour', 0)
          .set('minute', 0).set('seconds', 0)
          .set('milliseconds', 0)
          .toDate();
    }
    return value.toDate();
  }
};

type Mode = 'year' | 'week' | 'month' | 'date' | 'datetime';

export default defineComponent({
  name: 'DDatePicker',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Object, Number]
    },
    mode: {type: String as PropType<Mode>, default: 'date'},
    format: String
  },
  emits: ['update:value', 'change'],
  setup(props, {emit}) {
    const currentValue = ref<Dayjs>(null);
    const datePickerRef = ref();
    const localFormat = computed(() => {
      switch (props.mode) {
        case 'year':
          return 'YYYY';
        case 'date':
          return 'YYYY-MM-DD';
        case 'datetime':
          return props.format || 'YYYY-MM-DD HH:mm:ss';
      }
      return undefined;
    });
    watch(() => props.value, (value: any) => {
      const convertedValue = convertValue(value, localFormat.value, props.mode);
      if (currentValue.value === null || currentValue.value === undefined) {
        currentValue.value = convertedValue;
      } else if (!convertedValue) {
        currentValue.value = null;
      } else if (currentValue.value.toString() !== convertedValue.toString()) {
        currentValue.value = convertedValue;
      }
    }, {immediate: true});
    watch(() => currentValue.value, (value) => {
      const val = convertValueBack(value, props.mode);
      emit('update:value', val);
      emit('change', val);
    });
    const realMode = computed(() => {
      if (props.mode === 'datetime') {
        return undefined;
      }
      return props.mode;
    });
    const open = ref(false);
    return {
      realMode,
      currentValue,
      open,
      localFormat,
      datePickerRef,
      updateCurrentValue(value) {
        currentValue.value = value;
      },
      onPanelChange: (value: Dayjs) => {
        if (props.mode === 'year') {
          currentValue.value = value;
          open.value = false;
        }
      },
      onOpenChange: o => {
        open.value = o;
      }
    };
  },
  render() {
    const {mode, currentValue} = this;
    const props: any = {
      ...this.$attrs,
      value: currentValue,
      showTime: this.mode === 'datetime',
      format: this.localFormat,
      open: this.open,
      'onUpdate:value': this.updateCurrentValue,
      onPanelChange: this.onPanelChange,
      onOpenChange: this.onOpenChange
    };
    if (mode === 'week') {
      return <a-week-picker {...props}/>;
    }
    if (mode === 'month') {
      return <a-month-picker {...props}/>;
    }
    if (this.mode !== 'datetime' ) {
      props.picker = this.realMode;
    }
    return <a-date-picker ref={'datePickerRef'} {...props}/>;
  }
});
