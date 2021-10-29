import {defineComponent, PropType} from 'vue';
import {getDefaultEmptyText} from '../../';

export default defineComponent({
  name: 'TransferDisplay',
  props: {
    value: Array as PropType<Array<any>>,
    dataSource: {type: Array as PropType<Array<any>>, default: () => ([])}
  },
  render() {
    if (!this.value || this.value.length === 0) {
      return getDefaultEmptyText();
    }
    return this.dataSource.filter(it => this.value.includes(it.key))
      .map(it => it.title).join('、');
  }
});
