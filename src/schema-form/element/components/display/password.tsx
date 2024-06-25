import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PasswordDisplay',
  props: {
    value: String
  },
  render() {
    return <span>{this.value}</span>;
  }
});
