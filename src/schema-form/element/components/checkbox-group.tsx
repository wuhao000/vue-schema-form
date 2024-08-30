import {ElCheckbox, ElCheckboxGroup, ElCol, ElRow} from 'element-plus';
import chunk from 'lodash.chunk';
import {defineComponent, PropType} from 'vue';
import {useOptions} from "../../utils/utils";

export default defineComponent({
  name: 'DCheckboxGroup',
  props: {
    options: Array,
    span: Number as PropType<number>,
    labelProperty: {
      type: [String, Function], default: 'label'
    },
    valueProperty: {
      type: [String, Function], default: 'value'
    }
  },
  setup(props) {
    const {options: localOptions} = useOptions(props);
    return {localOptions};
  },
  render() {
    const props = {
      ...this.$attrs
    };
    const slots = {
      ...this.$slots
    };
    if (this.localOptions && this.span) {
      const cols = Math.abs(24 / (this.span as number));
      const chunks = chunk(this.localOptions, cols);
      slots.default = () => chunks.map(c => (
        <ElRow>
          {
            c.map(o => (
              <ElCol span={this.span}>
                <ElCheckbox {...o}>{o.label}</ElCheckbox>
              </ElCol>
            ))
          }
        </ElRow>
      )) as any;
    } else {
      slots.default = () => this.localOptions.map(o => (
        <ElCol span={this.span}>
          <ElCheckbox {...o}>{o.label}</ElCheckbox>
        </ElCol>
      )) as any;
    }
    return <ElCheckboxGroup {...props}
                            v-slots={slots}/>;
  }
});
