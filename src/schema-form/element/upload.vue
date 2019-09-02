<template>
  <div>
    <el-upload v-bind="customProps"
               :class="'uploader--' + listType"
               :file-list="fileList">
      <div v-if="listType === 'dragger'">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <i v-if="listType === 'card' || listType === 'picture-card'"
         class="el-icon-plus"
         slot="default"></i>
      <div v-if="listType === 'card' || listType === 'picture-card'"
           slot="file"
           slot-scope="{file}">
        <img alt=""
             class="el-upload-list__item-thumbnail"
             :src="file.url">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!$attrs.disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <div v-if="listType === 'picture'">

        <img v-if="fileList.length"
             class="avatar"
             :src="fileList[0].url">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-if="listType === 'text'">
        <el-button size="small"
                   type="primary">点击上传
        </el-button>
      </div>
    </el-upload>
    <el-dialog :visible.sync="previewVisible">
      <img :src="previewUrl"/>
    </el-dialog>
  </div>
</template>
<script lang="tsx">
  import BaseUpload from '@/schema-form/common/base-upload';
  import Component from 'vue-class-component';

  @Component({
    name: 'ElementUpload'
  })
  export default class ElementUpload extends BaseUpload {

    get customProps() {
      const props = this.props;
      if (!props.onSuccess) {
        props.onSuccess = this.onSuccess;
      }
      return props;
    }

    public handlePictureCardPreview(file) {
      this.previewVisible = true;
      this.previewUrl = file.url;
    }

    public handleRemove(file) {
      if (this.fileList.includes(file)) {
        this.fileList.splice(this.fileList.indexOf(file), 1);
      }
    }

    public onSuccess(res, v, list) {
      if (res.code === 0) {
        const url = res.data.url;
        if (this.multiple) {
          this.fileList.push({url, name: v.name});
        } else {
          this.fileList = [{url, name: v.name}];
        }
      }
    }
  }
</script>
<style lang="less">
  .uploader--picture {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover {
        border-color: #409EFF;
      }
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
