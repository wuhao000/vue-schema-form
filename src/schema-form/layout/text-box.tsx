import {defineComponent} from 'vue';
import './text-box.less';

export default defineComponent({
  name: 'TextBox',
  props: {
    layout: {type: String, required: true}
  },
  setup(props, {slots}) {
    const getContent = () => {
      const layout = props.layout as any;
      let array = [];
      const fields = slots.default();
      const copyFields = [...fields];
      if (layout) {
        const split = layout.split('%s');
        split.forEach((item) => {
          if (item.length) {
            array.push(<span class="vf-layout-text-box--text">{item}</span>);
          }
          array.push(copyFields.splice(0, 1));
        });
      }
      if (copyFields.length) {
        array = array.concat(copyFields);
      }
      return array;
    };
    return {getContent};
  },
  render() {
    const content = this.getContent();
    console.log(this.$attrs.class);
    console.log(this.$attrs.style);
    return <div class="vf-layout-text-box">{content}</div>;
  }
});
