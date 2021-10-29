import {DatePicker} from 'ant-design-vue';
import moment, {Moment} from 'moment';
import {computed, defineComponent, ref, watch} from 'vue';
import {useBaseInput} from '../../../';
import {isNotNull} from '../../../utils/utils';

const convertValue = (value: Array<Date | number>, format: string): any => {
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
    value: {},
    mode: {type: String, default: 'date'}
  },
  setup(props, ctx) {
    const {emit} = ctx;
    const currentValue = ref<Moment[]>(null);
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
      if (props.value !== undefined) {
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
    // @ts-ignore
    return <DatePicker.RangePicker {...this.getProps()}/>;
  }
});
