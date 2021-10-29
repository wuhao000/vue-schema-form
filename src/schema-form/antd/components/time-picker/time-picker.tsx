import moment, {Moment} from 'moment';
import {defineComponent, ref, watch} from 'vue';
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
        return moment(value, props.format as string);
      } else {
        return moment(value);
      }
    };
    const convertValueBack = (value: Moment) => {
      if (isNotNull(value)) {
        return value.format(props.format as string);
      }
      return value;
    };
    const {
      getProps,
      stateValue
    } = useBaseTimePicker(props, {emit, attrs, convertValue, convertValueBack, valueProp: 'value'})
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
