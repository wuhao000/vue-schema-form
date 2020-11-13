<template>
  <m-list-item multiple-line
               :title="title">
    <van-uploader v-model="fileList"
                  accept="*"
                  slot="extra"
                  :after-read="afterRead"></van-uploader>
  </m-list-item>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'AntdUpload'
  })
  export default class AntdUpload extends Vue {
    @Prop()
    public title: any;
    public fileList: any[] = [];

    @Watch('fileList')
    public fileListChanged(v) {
    }

    public afterRead(f, n) {
      console.log(f);
      console.log(n);
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
