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
            {...{...(this.$props as unknown as Record<string, unknown>), ...this.$attrs}}
            value={this.value}
            onUpdate:value={v => {
              this.$emit('update:value', v);
            }}
            showError={true}
            capture={this.capture}
            mode={'card'}
            style={{width: 'auto'}}
          />;
          if (isAndroid) {
            return <div class={'d-upload-android-fix'}>
              {el}
              <DUpload
                {...{...(this.$props as unknown as Record<string, unknown>), ...this.$attrs}}
                value={undefined}
                multiple={false}
                onUpdate:value={(v) => {
                  if (!v) {
                    return;
                  }
                  if (this.multiple) {
                    this.$emit('update:value', [...(this.value as Array<unknown> ?? []), v]);
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
