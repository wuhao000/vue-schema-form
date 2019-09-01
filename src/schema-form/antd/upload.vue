<template>
  <d-upload v-bind="props"
            v-if="listType !== 'dragger'"
            v-on="$listeners"
            :file-list="fileList">
    <div v-if="listType === 'card'"
         class="ant-upload-select-btn">
      <ae-icon size="lg"
               type="plus"/>
      <div class="ant-upload-text">选择文件</div>
    </div>
    <d-button v-else-if="listType === 'text'"
              :disabled="$attrs.disabled">选择文件
    </d-button>
    <slot/>
  </d-upload>
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
  import Vue from 'vue';

  export default Vue.extend({
    name: 'AntdUpload',
    props: {
      value: {type: [String, Array]},
      multiple: {type: Boolean, default: false},
      listType: String,
      hint: String
    },
    data() {
      return {
        fileList: []
      };
    },
    computed: {
      props() {
        const props: any = Object.assign({}, this.$attrs);
        if (this.listType === 'card') {
          props.listType = 'picture-card';
        } else if (this.listType === 'dragger') {
          delete props.listType;
        }
        return props;
      }
    }
  });
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
</style>
