import {PlusOutlined, UploadOutlined} from '@ant-design/icons-vue';
import {Upload} from 'ant-design-vue';
import {computed, defineComponent, ref} from 'vue';
import {useBaseInput} from '../';
import {AntUploadObject} from '../../../types';
import {baseUpdateProps, useBaseUpload} from '../common/base-upload';
import Button from './components/button';
import './upload.less';

export default defineComponent({
  name: 'DUpload',
  components: {
    [Upload.name]: Upload,
    [Upload.Dragger.name]: Upload.Dragger,
    PlusOutlined: PlusOutlined as any, UploadOutlined
  },
  props: {
    hint: String,
    ...baseUpdateProps
  },
  emits: ['change', 'preview', 'update:value'],
  setup(props, ctx) {
    const {fileList} = useBaseUpload(props, ctx);
    const previewVisible = ref(false);
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
    const uploadProps = Object.assign({}, ctx.attrs, props);
    const {size} = useBaseInput(props, ctx);
    const previewUrl = ref();
    return {
      size,
      listType,
      fileList,
      uploadProps,
      previewVisible,
      previewUrl,
      onChange(f: AntUploadObject) {
        if (!props.multiple && fileList.value.length > 1) {
          fileList.value = [f.file];
        }
        if (f.file.status && f.file.response?.code === 0) {
          const file = f.fileList.find(it => it.uid === f.file.uid);
          if (file) {
            file.url = f.file.response.data.url;
          }
        }
        ctx.emit('change', f);
      },
      onPreview(f) {
        previewUrl.value = f.url;
        previewVisible.value = true;
        ctx.emit('preview', f);
      },
      cancelPreview() {
        previewVisible.value = false;
      }
    };
  },
  render() {
    if (this.mode === 'dragger') {
      return <a-upload-dragger {...this.uploadProps}>
        <div class={{disabled: this.$attrs.disabled}}>
          <p class="ant-upload-drag-icon">
            <upload-outlined/>
          </p>
          <p class="ant-upload-text">点击或者拖动文件到虚线框内上传</p>
          <p class="ant-upload-hint">{this.hint}</p>
        </div>
      </a-upload-dragger>;
    } else {
      let content = null;
      if (this.listType === 'picture-card') {
        if (this.multiple || this.fileList.length === 0) {
          content = (
              <div class="ant-upload-select-btn">
                <plus-outlined/>
                <div class="ant-upload-text">选择文件</div>
              </div>
          );
        }
      } else if (this.listType === 'picture') {
        content = (
          <div class="ant-upload-image-wrapper">
            {
              this.fileList.length && this.fileList[0].url ? (
                  <img src={this.fileList[0].url}
                       alt=""
                       style="height: 100%;width: 100%;"/>
                )
                : (
                  <div class="ant-upload-plus">
                    <plus-outlined/>
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
        <>
          <a-upload {...this.uploadProps}
                    listType={this.listType}
                    v-model={[this.fileList, 'fileList']}
                    onChange={this.onChange}
                    onPreview={this.onPreview}
                    size={this.size}>
            {content}
            {this.$slots.default?.()}
          </a-upload>
          <a-modal visible={this.previewVisible}
                   footer={() => {
                     return <Button type="primary"
                                    onClick={() => {
                                      console.log('cliock');
                                      this.cancelPreview();
                                    }}>确定</Button>;
                   }}
                   onCancel={() => {
                     this.cancelPreview();
                   }}>
            <img alt="example"
                 style="width: 100%"
                 src={this.previewUrl}/>
          </a-modal>
        </>
      );
    }
  }
});
