<template>
  <div style="padding: 25px;">
    <code-editor
        :value="code"
        height="auto"/>
  </div>
</template>
<script lang="ts" setup>
  import {useSlots} from 'vue';
  import CodeEditor from './code-editor.vue';

  const slots = useSlots();

  const code = slots.default?.()?.[0]?.children;
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
