import dayjs from 'dayjs';
import {defineComponent} from 'vue';
import {baseTimePickerProps, useBaseTimePicker} from '../../../common/base-time-picker';
import {isNotNull} from '../../../utils/utils';

export default defineComponent({
  name: 'DTimePicker',
  inheritAttrs: false,
  props: {
    ...baseTimePickerProps,
    modelValue: [String, Date]
  },
  setup(props, {emit, attrs}) {
    const convertValue = (value: string) => {
      if (!value) {
        return undefined;
      }
      let format = props.format;
      if (typeof value === 'string' && /\d{2}:\d{2}/.test(value)) {
        format = 'HH:mm';
      }
      if (typeof value === 'string') {
        return dayjs(value, format).toDate();
      } else {
        return dayjs(value).toDate();
      }
    };
    const convertValueBack = (value: Date) => {
      if (isNotNull(value)) {
        return dayjs(value).format(props.format as string);
      }
      return value;
    };
    const {
      getProps,
      stateValue
    } = useBaseTimePicker(props, {emit, attrs, convertValue, convertValueBack, valueProp: 'modelValue'});
    return {
      getProps,
      stateValue
    };
  },
  render() {
    const props = this.getProps();
    return <el-time-picker {...props}/>;
  }
});
