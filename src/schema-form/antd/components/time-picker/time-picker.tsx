import dayjs, {Dayjs} from 'dayjs';
import {defineComponent} from 'vue';
import {baseTimePickerProps, useBaseTimePicker} from '../../../common/base-time-picker';
import {isNotNull} from '../../../utils/utils';

export default defineComponent({
  name: 'DTimePicker',
  inheritAttrs: false,
  props: {
    ...baseTimePickerProps
  },
  setup(props, {emit, attrs}) {
    const convertValue = (value: string) => {
      if (!value) {
        return undefined;
      }
      if (typeof value === 'string') {
        return dayjs(value, props.format as string);
      } else {
        return dayjs(value);
      }
    };
    const convertValueBack = (value: Dayjs) => {
      if (isNotNull(value)) {
        return value.format(props.format as string);
      }
      return value;
    };
    const {
      getProps,
      stateValue
    } = useBaseTimePicker(props, {emit, attrs, convertValue, convertValueBack, valueProp: 'value'});
    return {
      getProps,
      stateValue
    };
  },
  render() {
    return <a-time-picker {...{
      ...this.getProps()
    }}/>;
  }
});
