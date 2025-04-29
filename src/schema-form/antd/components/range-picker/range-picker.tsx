import dayjs, {Dayjs} from 'dayjs';
import {defineComponent, PropType, ref, watch} from 'vue';
import {useBaseInput} from '../../../';
import {isNotNull} from '../../../utils/utils';

const convertValue = (value: Array<Date | number>): any => {
  if (isNotNull(value)) {
    return value.filter(it => isNotNull(it)).map(it => dayjs(it));
  } else {
    return undefined;
  }
};

const convertValueBack = (value: Dayjs[] | undefined, format: string): Date[] | string[] => {
  if (isNotNull(value)) {
    if (format) {
      return value.map(it => it.format(format));
    }
    return value.map(it => it.toDate());
  } else {
    return undefined;
  }
};

export default defineComponent({
  name: 'DRangePicker',
  props: {
    value: {
      type: Array
    },
    placeholder: [String, Array] as PropType<string | string[]>,
    showTime: Boolean,
    format: String,
  },
  setup(props, ctx) {
    const {emit} = ctx;
    const currentValue = ref<Dayjs[]>(null);
    watch(() => props.value, (value: any) => {
      const convertedValue = convertValue(value);
      if (!currentValue.value) {
        currentValue.value = convertedValue;
      } else if (!convertedValue) {
        currentValue.value = [];
      } else {
        if (currentValue.value.toString() !== convertedValue.toString()) {
          currentValue.value = convertedValue;
        }
      }
    }, {immediate: true});
    watch(() => currentValue.value, (value) => {
      const val = convertValueBack(value, props.format);
      if (ctx.attrs['onUpdate:value']) {
        emit('update:value', val);
      }
      emit('change', val);
    });
    const {size} = useBaseInput(props, ctx);
    const updateCurrentValue = (value) => {
      currentValue.value = value;
    };
    const getProps = () => {
      const placeholder = typeof props.placeholder === 'string' ? [props.placeholder,
        props.placeholder] : props.placeholder;
      return {
        ...ctx.attrs,
        placeholder,
        showTime: props.showTime,
        size: size.value,
        value: currentValue.value,
        'onUpdate:value': updateCurrentValue
      };
    };
    return {getProps};
  },
  render() {
    return <a-range-picker {...this.getProps() as any}
                           v-slots={this.$slots}
    />;
  }
});
