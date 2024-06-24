import {PlusOutlined, UploadOutlined} from '@ant-design/icons-vue';
import {ElMessage, ElUpload} from 'element-plus';
import {Base64} from 'js-base64';
import omit from 'omit.js';
import {computed, defineComponent, ref} from 'vue';
import {baseUpdateProps, useBaseUpload} from '../../common/base-upload';
import {useBaseInput} from "../../";
import {isNotNull} from "../../utils/utils";
import Button from '../button';
import {UploadFile} from "element-plus/es/components/upload/src/upload";
import {UploaderFileListItem} from "vant";

export default defineComponent({
  name: 'DUpload',
  props: {
    hint: String,
    onPreview: Function,
    showError: Boolean,
    ...baseUpdateProps
  },
  emits: ['change', 'preview', 'update:value'],
  setup(props, ctx) {
    const {fileList} = useBaseUpload(props, ctx);
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
    const {size} = useBaseInput(props, ctx);
    const previewUrl = ref();
    return {
      size,
      listType,
      fileList,
      uploadProps,
      previewOpen,
      previewUrl,
      onChange(f: UploadFile) {
        if (!props.multiple && fileList.value.length > 1) {
          fileList.value = [f];
        }
        const response = f.response as { code: number; msg: string; data: UploaderFileListItem };
        if (f.status && isNotNull(response?.code)) {
          const code = response.code;
          if (code === 0) {
            const data = response.data;
            f.url = data.url;
            if (props.objectFields.length) {
              props.objectFields.forEach(f => {
                f[f] = data[f];
              });
            }
          } else {
            f.status = 'fail';
            f['error'] = response.msg;
            ElMessage.error({
              message: response.msg
            });
          }
        }
        ctx.emit('change', f);
      },
      localPreview(f: UploadFile) {
        if (props.onPreview) {
          props.onPreview(f);
        } else {
          const typeList = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
          if (f.raw.type.indexOf('image/') === 0) {
            previewUrl.value = f.url;
            if (previewUrl.value) {
              previewOpen.value = true;
              ctx.emit('preview', f);
            }
          } else if (typeList.includes(f.raw.type)) {
            window.open(`https://fileview.aegis-info.com/preview/onlinePreview?url=${encodeURIComponent(Base64.encode(f.url))}`);
          } else if (['application/pdf', 'text/plain', 'video/mpeg', 'audio/mpeg'].includes(f.raw.type)) {
            window.open(f.url);
          } else {
            ElMessage.info({
              message: '该文件不支持预览'
            });
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
    let content = null;
    if (this.mode === 'dragger') {
      content = [
        <el-icon class="el-icon--upload">
          <UploadOutlined/>
        </el-icon>,
        <div class="el-upload__text">
          拖拽文件至此或 <em>点击上传</em>
        </div>
      ];
    } else if (this.listType === 'picture-card') {
      content = (
          <div class="el-upload-select-btn">
            <el-icon><PlusOutlined/></el-icon>
          </div>
      );
    } else if (this.listType === 'picture') {
      content = (
          <div class="el-upload-image-wrapper">
            {
              this.fileList.length && this.fileList[0].url ? (
                      <img src={this.fileList[0].url}
                           alt=""
                           style="height: 100%;width: 100%;"/>
                  )
                  : (
                      <div class="el-upload-plus">
                        <PlusOutlined/>
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
    const a = <ElUpload/>
    return (
        <el-upload
            {...this.uploadProps}
            listType={this.listType}
            v-model:fileList={[this.fileList, 'fileList']}
            openFileDialogOnClick={true}
            drag={this.mode === 'dragger'}
            onChange={this.onChange}
            capture={undefined}
            onPreview={this.localPreview}
            size={this.size}>
          {content}
          {this.$slots.default?.()}
          <el-dialog open={this.previewOpen}
                     footer={<Button type="primary"
                                     onClick={() => {
                                       this.cancelPreview();
                                     }}>确定</Button>}
                     onCancel={() => {
                       this.cancelPreview();
                     }}>
            <img alt="example"
                 style="width: 100%"
                 src={this.previewUrl}/>
          </el-dialog>
        </el-upload>
    );
  }
});
