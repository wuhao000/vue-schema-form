import { Toast } from 'antd-mobile-vue-next';
import omit from 'omit.js';
import { computed, defineComponent, inject, ref } from 'vue';
import { SchemaFormStoreKey } from '../utils/key';
import { useBaseInput } from '../mixins';
import { AntUploadFile, AntUploadObject, SchemaFormStore } from '../../../types';
import { baseUpdateProps, useBaseUpload } from '../common/base-upload';
import { config } from '../config';
import { isNotNull, LibComponents } from '../utils/utils';
import Button from './components/button';
import './upload.less';

export default defineComponent({
  name: 'DUpload',
  props: {
    hint: String,
    onPreview: Function,
    showError: Boolean,
    capture: String,
    ...baseUpdateProps
  },
  emits: ['change', 'preview', 'update:value'],
  setup(props, ctx) {
    const { fileList } = useBaseUpload(props, ctx);
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const previewOpen = ref(false);
    const listType = computed(() => {
      switch (props.mode) {
        case 'picture':
          return 'picture';
        case 'card':
          return 'picture-card';
        default:
          return 'text';
      }
    });
    const uploadProps = Object.assign({}, ctx.attrs, omit(props, ['value', 'onPreview']));
    const { size } = useBaseInput(props, ctx);
    const previewUrl = ref();
    return {
      size,
      listType,
      fileList,
      uploadProps,
      previewOpen,
      store,
      previewUrl,
      onChange(f: AntUploadObject) {
        if (!props.multiple && fileList.value.length > 1) {
          fileList.value = [f.file];
        }
        if (f.file.status === 'removed') {
          fileList.value = fileList.value.filter(it => it.uid !== f.file.uid);
        } else if (f.file.status && isNotNull(f.file.response?.code)) {
          const code = f.file.response.code;
          const file = f.fileList.find(it => it.uid === f.file.uid);
          if (file) {
            if (code === 0) {
              const data = f.file.response.data;
              file.url = data.url;
              if (props.objectFields.length) {
                props.objectFields.forEach(f => {
                  file[f] = data[f];
                });
              }
            } else {
              file.status = 'error';
              file.error = f.file.response.msg;
              file.name = f.file.response.msg;
              config.message.desktop.error(f.file.response.msg);
            }
          }
        }
        ctx.emit('change', f);
      },
      localPreview(f: AntUploadFile) {
        if (props.onPreview) {
          props.onPreview(f);
        } else if (f.url) {
          if (f.type?.startsWith('image/') || f.url.endsWith('.png') || f.url.endsWith('.jpg') || f.url.endsWith('.jpeg')) {
            previewUrl.value = f.url;
            if (previewUrl.value) {
              previewOpen.value = true;
              ctx.emit('preview', f);
            }
          } else if (['application/pdf', 'text/plain', 'video/mpeg', 'audio/mpeg'].includes(f.type)) {
            window.open(f.url);
          } else {
            Toast.info('该文件不支持预览');
            return;
          }
        }
      },
      cancelPreview() {
        previewOpen.value = false;
      }
    };
  },
  render() {
    if (this.mode === 'dragger') {
      const UploadIcon = LibComponents.icons.desktop.upload;
      return <a-upload-dragger {...this.uploadProps}>
        <div class={{ disabled: this.$attrs.disabled }}>
          <p class="ant-upload-drag-icon">
            <UploadIcon />
          </p>
          <p class="ant-upload-text">点击或者拖动文件到虚线框内上传</p>
          <p class="ant-upload-hint">{this.hint}</p>
        </div>
      </a-upload-dragger>;
    } else {

      const PlusIcon = LibComponents.icons[this.store.platform ?? 'desktop'].plus;
      const CameraIcon = LibComponents.icons[this.store.platform ?? 'desktop'].camera;
      let content = null;
      if (this.listType === 'picture-card') {
        content = (
            <div class="ant-upload-select-btn">
              {this.capture ? <CameraIcon /> : <PlusIcon />}
              <div class="ant-upload-text">{
                this.capture ? '拍照' : '选择文件'
              }</div>
            </div>
        );
      } else if (this.listType === 'picture') {
        content = (
            <div class="ant-upload-image-wrapper">
              {
                this.fileList.length && this.fileList[0].url ? (
                        <img src={this.fileList[0].url}
                             alt=""
                             style="height: 100%;width: 100%;" />
                    )
                    : (
                        <div class="ant-upload-plus">
                          <PlusIcon />
                        </div>
                    )
              }
            </div>
        );
      } else if (this.listType === 'text') {
        content = (
            <a-button
                disabled={this.$attrs.disabled}
                size={this.size}>选择文件
            </a-button>
        );
      }
      return (
          <a-upload {...this.uploadProps}
                    listType={this.listType}
                    v-model={[this.fileList, 'fileList']}
                    openFileDialogOnClick={true}
                    onChange={this.onChange}
                    capture={this.capture}
                    onPreview={this.localPreview}
                    size={this.size}>
            {content}
            {this.$slots.default?.()}
            <a-modal open={this.previewOpen}
                     footer={<Button type="primary"
                                     onClick={() => {
                                       this.cancelPreview();
                                     }}>确定</Button>}
                     onCancel={() => {
                       this.cancelPreview();
                     }}>
              <img alt="example"
                   style="width: 100%"
                   src={this.previewUrl} />
            </a-modal>
          </a-upload>
      );
    }
  }
});
