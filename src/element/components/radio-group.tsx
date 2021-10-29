import {ElCol, ElRadio, ElRadioGroup, ElRow} from 'element-plus';
import chunk from 'lodash.chunk';
import {defineComponent, PropType} from 'vue';
import {useOptions} from '../../schema-form/antd/components/utils';

export default defineComponent({
  name: 'DRadioGroup',
  props: {
    options: Array,
    span: Number as PropType<number>,
    labelProperty: {
      type: String, default: 'label'
    },
    valueProperty: {
      type: String, default: 'value'
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
                    <ElRadio {...o}>{o.label}</ElRadio>
                  </ElCol>
              ))
            }
          </ElRow>
      ));
    } else {
      props.options = this.localOptions;
    }
    return <ElRadioGroup {...props}
                         v-slots={slots}/>;
  }
});
