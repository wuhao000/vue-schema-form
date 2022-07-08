import dayjs, {Dayjs} from 'dayjs';
import {defineComponent, PropType, ref, watch} from 'vue';
import {useBaseInput} from '../../../';
import {isNotNull} from '../../../utils/utils';

const convertValue = (value: Array<Date | number>): any => {
  if (!value) {
    return undefined;
  }
  return value.filter(it => isNotNull(it)).map(it => dayjs(it));
};

const convertValueBack = (value: Dayjs[] | undefined): Date[] => {
  if (value !== undefined) {
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
    showTime: Boolean
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
      const val = convertValueBack(value);
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
