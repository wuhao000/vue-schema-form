<template>
  <div class="demo-box">
    <div class="demo-box-demo">
      <slot/>
    </div>
    <div class="demo-box-actions">
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
  </div>
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
  .demo-box {
    background: white;
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 0 16px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    transition: all .2s;
    .demo-box-demo {
      padding: 20px 24px;
      color: #000000d9;
      border-bottom: 1px solid #f0f0f0;
    }
    .demo-box-actions {
      display: flex;
      justify-content: center;
      padding: 12px 0;
      border-top: 1px dashed #f0f0f0;
      opacity: .7;
      transition: opacity .3s;
    }
  }
</style>
