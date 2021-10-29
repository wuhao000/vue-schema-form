import chunk from 'lodash.chunk';
import {defineComponent, PropType} from 'vue';
import {useOptions} from './utils';

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
          <a-row>
            {
              c.map(o => (
                  <a-col span={this.span}>
                    <a-radio {...o}>{o.label}</a-radio>
                  </a-col>
              ))
            }
          </a-row>
      ));
    } else {
      props.options = this.localOptions;
    }
    return <a-radio-group {...props}
                          v-slots={slots}/>;
  }
});
