import {defineComponent} from 'vue';
import './text-box.less';

export default defineComponent({
  name: 'TextBox',
  props: {
    layout: {type: String, required: true},
    fields: {type: [Array, Object], required: true}
  },
  setup(props) {
    const getContent = () => {
      const layout = props.layout as any;
      let array = [];
      const fields = props.fields as any;
      const copyFields = [].concat(fields);
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
    return <div class="vf-layout-text-box">{content}</div>;
  }
});
