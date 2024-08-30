import {defineComponent, PropType} from 'vue';
import {isNull, useOptions} from '../../utils/utils';


export default defineComponent({
  name: 'DSelect',
  props: {
    multiple: {
      type: Boolean as PropType<boolean>, default: false
    },
    options: {
      type: Array
    },
    clearable: {
      type: Boolean as PropType<boolean>, default: true
    },
    labelProperty: {
      type: [String, Function], default: 'label'
    },
    valueProperty: {
      type: [String, Function], default: 'value'
    },
    filterOption: {
      type: [Boolean, Function],
      default: () => {
        return (value, option) => {
          if (isNull(value) || value === '') {
            return true;
          }
          return option.label.toString().includes(value)
              || option.value.toString().includes(value);
        };
      }
    }
  },
  setup(props) {
    const {options: localOptions} = useOptions(props);
    return {localOptions};
  },
  render() {
    const props: any = {
      ...this.$props,
      ...this.$attrs,
      mode: this.multiple ? 'multiple' : this.$attrs.mode,
      allowClear: this.clearable ? true : this.$attrs.allowClear
    };
    delete props.options;
    return <el-select {...props}>
      {
        this.localOptions.map(option => (
            <el-option key={option.value} value={option.value}>
              {option.label}
            </el-option>
        ))
      }
    </el-select>;
  }
});
