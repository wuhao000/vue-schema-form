import {baseLayoutProps} from './base-layout';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TableLayout',
  props: {
    ...baseLayoutProps
  },
  render() {
    return <div>
      {this.fields}
    </div>;
  }
});
