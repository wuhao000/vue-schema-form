import {ElTimePicker} from 'element-plus';
import moment from 'moment';
import {defineComponent} from 'vue';
import {baseTimePickerProps, useBaseTimePicker} from '../../../schema-form/common/base-time-picker';
import {isNotNull} from '../../../schema-form/utils/utils';

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
        return moment(value, props.format as string).toDate();
      } else {
        return moment(value).toDate();
      }
    };
    const convertValueBack = (value: Date) => {
      if (isNotNull(value)) {
        return moment(value).format(props.format as string);
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
    return <ElTimePicker {...{
      ...this.getProps()
    }}/>;
  }
});
