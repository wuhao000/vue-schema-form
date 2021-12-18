import moment, {Moment} from 'moment';
import {computed, defineComponent, PropType, ref, watch} from 'vue';

const convertValue = (value: Date | number, format: string, mode: Mode): any => {
  if (!value) {
    return undefined;
  }
  if (mode === 'year') {
    const m = moment();
    m.set('year', value as number);
    return m;
  }
  if (typeof value === 'string') {
    return moment(value, format);
  } else if (typeof value === 'number') {
    return moment(value);
  } else {
    return moment(value);
  }
};

const convertValueBack = (value: Moment | undefined, mode: Mode): Date | number => {
  if (value === undefined || value === null) {
    return null;
  } else {
    if (mode === 'year') {
      return value.year();
    }
    return value.toDate();
  }
};

type Mode = 'year' | 'week' | 'month' | 'date' | 'datetime';

export default defineComponent({
  name: 'DDatePicker',
  props: {
    value: {
      type: [String, Object]
    },
    mode: {type: String as PropType<Mode>, default: 'date'}
  },
  emits: ['update:value', 'change'],
  setup: function(props, {emit}) {
    const currentValue = ref<Moment>(null);
    const datePickerRef = ref();
    const format = computed(() => {
      switch (props.mode) {
        case 'year':
          return 'YYYY';
        case 'date':
          return 'YYYY-MM-DD';
        case 'datetime':
          return 'YYYY-MM-DD HH:mm:ss';
      }
      return undefined;
    });
    watch(() => props.value, (value: any) => {
      const convertedValue = convertValue(value, format.value, props.mode);
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
      if (props.value !== undefined) {
        emit('update:value', val);
      }
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
      format,
      datePickerRef,
      updateCurrentValue(value) {
        currentValue.value = value;
      },
      onPanelChange: (value: Moment) => {
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
      format: this.format,
      open: this.open,
      'onUpdate:value': this.updateCurrentValue,
      onPanelChange: this.onPanelChange,
      onOpenChange: this.onOpenChange
    };
    if (this.mode !== 'datetime') {
      props.mode = this.realMode;
    }
    if (mode === 'week') {
      return <a-week-picker {...props}/>;
    }
    if (mode === 'month') {
      return <a-month-picker {...props}/>;
    }
    return <a-date-picker ref={'datePickerRef'} {...props as any}/>;
  }
});
