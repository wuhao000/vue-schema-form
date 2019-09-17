<template>
  <a-upload v-bind="props"
            v-if="listType !== 'dragger'"
            :file-list="fileList"
            @change="onChange"
            @preview="onPreview">
    <div v-if="listType === 'card' || listType === 'picture-card'"
         class="ant-upload-select-btn">
      <ae-icon size="lg"
               type="plus"/>
      <div class="ant-upload-text">选择文件</div>
    </div>
    <div v-else-if="listType === 'picture'">
      <img v-if="fileList.length"
           style="height: 180px;width:180px;"
           :src="fileList[0].thumbUrl"/>
      <div v-else class="ant-upload-plus">
        <ae-icon type="plus"></ae-icon>
      </div>
    </div>
    <d-button v-else-if="listType === 'text'"
              :disabled="$attrs.disabled">选择文件
    </d-button>
    <slot/>
  </a-upload>
  <a-upload-dragger v-else
                    v-bind="props"
                    v-on="$listeners">
    <div :class="{disabled : $attrs.disabled}">
      <p class="ant-upload-drag-icon">
        <a-icon type="upload"/>
      </p>
      <p class="ant-upload-text">点击或者拖动文件到虚线框内上传</p>
      <p v-text="hint"
         class="ant-upload-hint"></p>
    </div>
  </a-upload-dragger>
</template>
<script lang="ts">
  import BaseUpload from '../common/base-upload';
  import Component from 'vue-class-component';
  import {Prop} from 'vue-property-decorator';

  export interface AntUploadFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    status: 'uploading' | 'done' | 'removed' | 'error';
    thumbUrl: string;
    type: string;
    uid: string;
    response: {
      code: number;
      data: {
        url: string;
      }
    };
  }

  export interface AntUploadObject {
    file: AntUploadFile;
    fileList: AntUploadFile[];
  }

  @Component({
    name: 'AntdUpload'
  })
  export default class AntdUpload extends BaseUpload {
    @Prop(String)
    public hint: string;

    get urlProp() {
      return 'thumbUrl';
    }

    public onChange(f: AntUploadObject) {
      this.fileList = f.fileList;
      switch (f.file.status) {
        case 'done':
          if (f.file.response.code === 0) {
            const file = f.fileList.find(it => it.uid === f.file.uid);
            file.thumbUrl = f.file.response.data.url;
          }
          break;
        case 'removed':
          this.fileList.splice(this.fileList.indexOf(f.file), 1);
          break;
        case 'uploading':
          break;
      }
      this.$emit('change', f);
    }

    public onPreview(f) {
      this.$emit('preview', f);
    }
  }
</script>
<style lang="less">

  .ant-upload.ant-upload-select-picture-card:hover {
  }

  .ant-upload {
    &.ant-upload-disabled {
      cursor: not-allowed;

      &.ant-upload-select-picture-card {
        &:hover {
          border-color: #d9d9d9;
        }
      }

      .ant-upload-select-btn {
        i, .ant-upload-text {
          color: fade(#000, 25%);
        }
      }

      &.ant-upload-drag {
        p.ant-upload-drag-icon .anticon {
          color: fade(#000, 25%);
        }

        .ant-upload-text {
          color: fade(#000, 25%);
        }
      }
    }

    &.ant-upload-drag {
      p.ant-upload-drag-icon .anticon {
        color: fade(#000, 45%);
      }
    }
  }
  .ant-upload-plus {
    border: 1px solid #d9d9d9;
    cursor: pointer;
    width: 120px;
    border-radius: 4px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    & > i {
      font-size: 28px !important;
    }
  }
</style>
