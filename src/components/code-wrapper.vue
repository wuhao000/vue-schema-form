<template>
  <div class="wrapper">
    <div v-if="md">
      <code
          class="markdown-body"
          v-html="md"/>
    </div>
    <div class="demo-content">
      <slot/>
      <div class="clearfix">
        <img
            :src="showCode ? 'https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg' :
                    'https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg'"
            alt="查看代码"
            class="code-expand-icon"
            title="查看代码"
            @click="toggleCode"/>
      </div>
    </div>
    <div class="p-t-b-sm pt-l-r">
      <pre
          v-show="showCode"
          class="clearfix code-box-code markdown-body">
        <code-editor
            :ref="setCodeEditorRef"
            :value="code"
            height="auto"/>
      </pre>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import CodeEditor from './code-editor.vue';

  export default defineComponent({
    name: 'CodeWrapper',
    components: {
      CodeEditor
    },
    props: {
      code: String,
      md: String
    },
    setup() {
      const showCode = ref(false);
      const codeEditorRef = ref(null);
      return {
        showCode,
        toggleCode() {
          showCode.value = !showCode.value;
          if (codeEditorRef.value) {
            codeEditorRef.value.refresh();
          }
        },
        setCodeEditorRef(el) {
          codeEditorRef.value = el;
        }
      };
    }
  });
</script>
<style lang="less">
  .demo-content {
    margin-bottom: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(238, 238, 238);
    border-image: initial;
    padding: 20px;
    overflow: auto;
    position: relative;

    .code-expand-icon {
      right: 15px;
      bottom: 5px;
      float: right;
      height: 20px;
      cursor: pointer;
    }
  }

  .code-box-code {
    background: rgba(27, 31, 35, 0.05);

    & > code {
      padding: 15px;
      max-height: 450px;
      font-size: 14px;
    }
  }
</style>
