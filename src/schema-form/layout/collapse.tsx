import { defineComponent, ref } from 'vue';
import { LibComponents } from '../utils/utils';

export default defineComponent({
  name: 'DCollapse',
  props: {
    platform: String,
    defaultExpand: {
      type: Boolean,
      default: true
    },
    title: {
      type: [String, Object]
    }
  },
  setup(props) {
    const activeKey = ref(props.defaultExpand ? 'panel' : undefined);
    return {
      activeKey
    };
  },
  render() {
    const CollapseComponent = LibComponents['collapse'][this.platform];
    return <CollapseComponent
      v-model={[this.activeKey, 'activeKey']}
      onChange={() => {
        if (this.platform === 'desktop') {
          return;
        }
        if (this.activeKey === 'panel') {
          this.activeKey = undefined;
        } else {
          this.activeKey = 'panel';
        }
      }}
      key={'panel'}
      header={this.title}
      v-slots={this.$slots}
    />;
  }
});
