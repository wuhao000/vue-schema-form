import chunk from 'lodash.chunk';
import {defineComponent, PropType} from 'vue';
import {useOptions} from "../../utils/utils";

export default defineComponent({
  name: 'DRadioGroup',
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
          <el-row>
            {
              c.map(o => (
                  <el-col span={this.span}>
                    <el-radio {...o}>{o.label}</el-radio>
                  </el-col>
              ))
            }
          </el-row>
      )) as any;
    } else {
      slots.default = () => this.localOptions.map(item => (
          <el-radio {...item}>{item.label}</el-radio>
      ))
    }
    return <el-radio-group {...props}
                           v-slots={slots}/>;
  }
});
