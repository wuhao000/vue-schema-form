import {baseLayoutProps} from './base-layout';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TableLayout',
  props: {
    ...baseLayoutProps
  },
  render() {
    return <table>
        {this.$slots.default().map(row => {
          return <tr>
            {row}
          </tr>;
        })}
    </table>;
  }
});
