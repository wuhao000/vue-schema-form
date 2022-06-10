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
      type: [String, Function], default: 'label'
    },
    valueProperty: {
      type: [String, Function], default: 'value'
    },
    /**
     * 多选模式下是否在下拉框下放展示收起按钮
     */
    showClose: Boolean,
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
    const selectProps: any = {
      ...this.$props,
      ...this.$attrs,
      mode: this.multiple ? 'multiple' : this.$attrs.mode,
      allowClear: this.clearable ? true : this.$attrs.allowClear,
      options: this.localOptions
    };
    const slots = {
      ...this.$slots
    };
    if (this.showClose) {
      slots.dropdownRender = ({menuNode, props}) => {
        const closeMenu = <a class="multiple-select-close-btn">收起</a>;
        if (this.$slots.dropdownRender) {
          return [this.$slots.dropdownRender({menuNode, props}), closeMenu];
        }
        return [menuNode, closeMenu];
      };
    }
    return <a-select
        v-slots={slots}
        {...selectProps}/>;
  }
});
