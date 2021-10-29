import {defineComponent} from 'vue';

export const MobileDisplayField = defineComponent({
  name: 'DisplayField',
  props: {
    value: {},
    title: {}
  },
  render() {
    const {value} = this;
    return <span>{value !== undefined && value !== null ? value.toString() : null}</span>;
  }
});

export default MobileDisplayField;
