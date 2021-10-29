import {defineComponent} from 'vue';

export const MobileDisplayField = defineComponent({
  name: 'DisplayField',
  props: {
    value: {
      type: [Object, String, Number, Boolean, Array]
    },
    title: {
      type: [String, Object]
    }
  },
  render() {
    const {value} = this;
    return <span>{value !== undefined && value !== null ? value.toString() : null}</span>;
  }
});

export default MobileDisplayField;
