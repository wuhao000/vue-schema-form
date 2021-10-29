import {defineComponent} from 'vue';
import {getDefaultEmptyText} from '../../';

export default defineComponent({
  props: {
    value: {}
  },
  render() {
    if (this.value) {
      return this.value;
    }
    return getDefaultEmptyText();
  }
});
