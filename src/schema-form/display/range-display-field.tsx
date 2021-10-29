import {defineComponent} from 'vue';
import {config} from '../config';

export default defineComponent({
  name: 'RangeDisplayField',
  props: {
    value: Array
  },
  render() {
    if (this.value) {
      return (this.value[0] ?? config.defaultEmptyText) + ' - ' + (this.value[1] ?? config.defaultEmptyText);
    }
    return config.defaultEmptyText;
  }
});
