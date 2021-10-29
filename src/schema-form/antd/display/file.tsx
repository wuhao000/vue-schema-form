import {defineComponent} from 'vue';
import {getDefaultEmptyText} from '../../';

export default defineComponent({
  name: 'FileDisplay',
  props: {
    value: {
      type: [Object, Array, String]
    }
  },
  render() {
    if (this.value) {
      return this.value;
    }
    return getDefaultEmptyText();
  }
});
