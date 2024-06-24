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
    const convertValue = (value: string | Date) => {
      let format = props.format;
      if (typeof value === 'string' && /\d{2}:\d{2}/.test(value)) {
        format = 'HH:mm';
      }
      if (!value) {
        return undefined;
      }
      if (typeof value === 'string') {
        return dayjs(value, format);
      } else {
        return dayjs(value);
      }
    };
    const convertValueBack = (value: Dayjs) => {
      if (isNotNull(value)) {
        if (props.valueType === 'date') {
          return value.toDate();
        } else {
          return value.format(props.format as string);
        }
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
    const props = this.getProps();
    return <a-time-picker {...props}/>;
  }
});
