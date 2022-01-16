import moment, {Moment} from 'moment';
import {defineComponent, ref, watch} from 'vue';
import {useBaseInput} from '../../../';
import {isNotNull} from '../../../utils/utils';

const convertValue = (value: Array<Date | number>): any => {
  if (!value) {
    return undefined;
  }
  return value.filter(it => isNotNull(it)).map(it => moment(it));
};

const convertValueBack = (value: Moment[] | undefined): Date[] => {
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
    }
  },
  setup(props, ctx) {
    const {emit} = ctx;
    const currentValue = ref<Moment[]>(null);
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
      return {
        ...ctx.attrs,
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
