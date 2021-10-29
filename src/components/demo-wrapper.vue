<template>
  <a-card class="demo-wrapper">
    <slot/>
    <div class="ant-card-actions">
      <div v-if="showCode">
        <slot name="code"/>
      </div>
      <a @click="toggle">
        <codepen-outlined/>
        {{ showCode ? '收起代码' : '查看代码' }}
      </a>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
  // noinspection ES6UnusedImports
  import {CodepenOutlined} from '@ant-design/icons-vue';
  import {ref} from 'vue';

  const showCode = ref(false);

  const toggle = () => {
    showCode.value = !showCode.value;
  };
</script>
<style lang="less" scoped>
  .ant-card-actions {
    padding: 20px 16px;
  }
</style>
