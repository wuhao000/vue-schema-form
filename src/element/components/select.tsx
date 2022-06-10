import {ElOption, ElSelect} from 'element-plus';
import {defineComponent, PropType} from 'vue';
import {useOptions} from '../../schema-form/antd/components/utils';
import {isNull} from '../../schema-form/utils/utils';


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
    return <ElSelect {...props}>
      {
        this.localOptions.map(option => (
            <ElOption key={option.value} value={option.value}>
              {option.label}
            </ElOption>
        ))
      }
    </ElSelect>;
  }
});
