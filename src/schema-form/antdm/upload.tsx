import { defineComponent } from 'vue';
import DUpload from '../antd/upload';
import { baseUpdateProps } from '../common/base-upload';

export default defineComponent({
  name: 'MUpload',
  props: {
    hint: String,
    capture: String,
    title: [String, Object],
    ...baseUpdateProps
  },
  emits: ['update:value'],
  render() {
    const isAndroid = window.navigator.userAgent.includes('Android') || this.capture !== undefined;
    return <m-list-item
      multipleLine={true}
      labelPlacement={top}
      v-slots={{
        default: () => this.title,
        control: () => {
          const el = <DUpload
            {...{...this.$props, ...this.$attrs}}
            showError={true}
            capture={this.capture}
            mode={'card'}
            style={{width: 'auto'}}
          />;
          if (isAndroid) {
            return <div>
              {el}
              <DUpload
                {...{...this.$props, ...this.$attrs}}
                value={undefined}
                multiple={false}
                onUpdate:value={(v) => {
                  if (Array.isArray(this.value)) {
                    this.$emit('update:value', [...this.value, v]);
                  } else {
                    this.$emit('update:value', v);
                  }
                }}
                class={'android-camera-fix'}
                capture={'camera'}
                showError={false}
                mode={'card'}
                style={{width: 'auto'}}
              />
            </div>;
          }
          return el;
        }
      }}
    />;
  }
});
