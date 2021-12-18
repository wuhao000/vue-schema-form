import {defineComponent, PropType} from 'vue';
import {isNull} from '../../utils/utils';
import {useOptions} from './utils';


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
      type: String, default: 'label'
    },
    valueProperty: {
      type: String, default: 'value'
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
      allowClear: this.clearable ? true : this.$attrs.allowClear,
      options: this.localOptions
    };
    return <a-select {...props}/>;
  }
});
