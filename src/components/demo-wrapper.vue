<template>
  <a-card class="demo-wrapper">
    <slot/>
    <div class="ant-card-actions">
        <a
            :title="showCode ? '收起代码' : '查看代码'"
            @click="toggle">
          <codepen-circle-outlined v-if="showCode"/>
          <codepen-outlined v-else/>
        </a>
    </div>
    <div v-if="showCode">
      <slot name="code"/>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
  // noinspection ES6UnusedImports
  import {CodepenOutlined, CodepenCircleOutlined} from '@ant-design/icons-vue';
  import {ref} from 'vue';

  const showCode = ref(false);

  const toggle = () => {
    showCode.value = !showCode.value;
  };
</script>
<style lang="less" scoped>
  .ant-card-actions {
    padding: 10px 16px;
    text-align: center;
  }
</style>
