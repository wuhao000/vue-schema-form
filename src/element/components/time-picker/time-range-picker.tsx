import {ElTimePicker} from 'element-plus';
import moment from 'moment';
import {defineComponent} from 'vue';
import {baseTimeRangePickerProps, useBaseTimeRangePicker} from '../../../schema-form/common/base-time-range-picker';
import DTimePicker from './time-picker';
import './time-range-picker.less';

export default defineComponent({
  inheritAttrs: false,
  name: 'DTimeRangePicker',
  components: {
    DTimePicker
  },
  props: {
    ...baseTimeRangePickerProps
  },
  setup(props, {attrs, emit}) {
    const convertValue = (value: Array<string> | string): Array<Date | string> => {
      if (!value) {
        return [null, null];
      }
      if (props.valueType === 'string') {
        return (value as string).split(props.separator).map(it => moment(it, props.format).toDate());
      }
      return (value as string[]).map(it => moment(it, props.format).toDate());
    };
    const convertValueBack = (value: Date[]): Array<string> | string => {
      if (props.valueType === 'string') {
        return value.map(it => moment(it).format(props.format)).join(props.separator);
      }
      return value.map(it => moment(it).format(props.format));
    };
    const {
      fieldProps,
      start,
      end
    } = useBaseTimeRangePicker(props,
        {emit, attrs, convertValue, convertValueBack, valueProp: 'value'});
    return {
      fieldProps,
      start,
      end
    };
  },
  render() {
    return (
        <div class="d-time-range-picker">
          <div>
            <ElTimePicker {...this.fieldProps}
                          v-model={[this.start, 'modelValue']}
                          allow-clear={this.clearable || this.$attrs.allowClear}
                          format={this.format}
                          type="timerange"
                          placeholder={this.placeholder}/>
          </div>
        </div>
    );
  }
});
