import {defineComponent} from 'vue';
import {baseTimeRangePickerProps, useBaseTimeRangePicker} from '../../../common/base-time-range-picker';
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
    const convertValue = (value: Array<string> | string): string[] => {
      if (!value) {
        return [null, null];
      }
      if (props.valueType === 'string') {
        return (value as string).split(props.separator as string).map(it => it);
      }
      return (value as string[]).map(it => it);
    };
    const convertValueBack = (value) => {
      if (props.valueType === 'string') {
        return value.join(props.separator);
      }
      return value;
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
            <d-time-picker {...this.fieldProps}
                           v-model={[this.start, 'value']}
                           allow-clear={this.clearable || this.$attrs.allowClear}
                           format={this.format}
                           placeholder={this.placeholder[0]}/>
            <span class="d-time-range-picker-separator">{this.separator}</span>
            <d-time-picker {...this.fieldProps}
                           v-model={[this.end, 'value']}
                           allow-clear={this.clearable || this.$attrs.allowClear}
                           format={this.format}
                           placeholder={this.placeholder[1]}/>
          </div>
        </div>
    );
  }
});
