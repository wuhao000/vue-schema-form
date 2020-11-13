<template>
  <div style="padding: 25px;">
    <div v-if="md">
      <code v-html="md"
            class="markdown-body"></code>
    </div>
    <div class="demo-content">
      <slot/>
      <div class="clearfix">
        <img alt=""
             class="code-expand-icon"
             :src="showCode ? 'https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg' :
                    'https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg'"
             @click="toggleCode"/>
      </div>
    </div>
    <div style="padding: 10px 20px;">
      <pre v-hljs
           v-show="showCode"
           class="code-box-code markdown-body clearfix">
        <code v-text="code"></code>
      </pre>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Componlayoutent({
    name: 'CodeWrapper'
  })
  export default class CodeWrapper extends Vue {
    @Prop(String)
    public code: string;
    @Prop(String)
    public md: string;
    public showCode = false;


    public toggleCode() {
      return this.showCode = !this.showCode;
    }

  }
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
      position: absolute;
      right: 15px;
      bottom: 5px;
      float: right;
      height: 20px;
      cursor: pointer;
    }
  }

  .code-box-code {
    & > code {
      padding: 15px;
      max-height: 450px;
      font-size: 14px;
    }
  }
</style>
