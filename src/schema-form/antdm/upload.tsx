import {defineComponent} from 'vue';
import DUpload from '../antd/upload';
import {baseUpdateProps} from '../common/base-upload';

export default defineComponent({
  name: 'MUpload',
  props: {
    hint: String,
    title: [String, Object],
    ...baseUpdateProps
  },
  render() {
    return <m-list-item
        multipleLine={true}
        labelPlacement={top}
        v-slots={{
          default: () => this.title,
          control: () => <DUpload
              {...{...this.$props, ...this.$attrs}}
              showError={true}
              mode={"card"}
          />
        }}
    />;
  }
});
