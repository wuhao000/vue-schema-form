import {ElTimePicker} from 'element-plus';
import dayjs from 'dayjs';
import {defineComponent, ref, watch} from 'vue';
import {baseTimeRangePickerProps, useBaseTimeRangePicker} from '../../../common/base-time-range-picker';
import DTimePicker from './time-picker';
import './time-range-picker.less';

export default defineComponent({
  name: 'DTimeRangePicker',
  components: {
    DTimePicker
  },
  inheritAttrs: false,
  props: {
    ...baseTimeRangePickerProps,
    modelValue: Array
  },
  setup(props, {attrs, emit}) {
    const convertValue = (value: Array<string> | string): Array<Date | string> => {
      if (!value) {
        return [null, null];
      }
      if (props.valueType === 'string') {
        return (value as string).split(props.separator).map(it => dayjs(it, props.format).toDate());
      }
      return (value as string[]).map(it => dayjs(it, props.format).toDate());
    };
    const convertValueBack = (value: Date[]): Array<string> | string => {
      if (props.valueType === 'string') {
        return value.map(it => dayjs(it).format(props.format)).join(props.separator);
      }
      return value.map(it => dayjs(it).format(props.format));
    };
    const {
      fieldProps,
      start,
      end
    } = useBaseTimeRangePicker(props,
        {emit, attrs, convertValue, convertValueBack, valueProp: 'modelValue'});
    const stateValue = ref([start.value, end.value]);
    watch(() => start.value, v => {
      stateValue.value[0] = v;
    });
    watch(() => end.value, v => {
      stateValue.value[1] = v;
    });
    watch(() => stateValue.value, v => {
      if (v[0] !== start.value) {
        start.value = v[0]
      }
      if (v[1] !== end.value) {
        end.value = v[1];
      }
    });
    return {
      fieldProps,
      start,
      end,
      stateValue
    };
  },
  render() {
    return (
        <div class="d-time-range-picker">
          <div>
            <el-time-picker {...this.fieldProps}
                            v-model={[this.stateValue, 'modelValue']}
                            allow-clear={this.clearable || this.$attrs.allowClear}
                            format={this.format}
                            is-range
                            range-separator="-"
                            placeholder={this.placeholder}/>
          </div>
        </div>
    );
  }
});
