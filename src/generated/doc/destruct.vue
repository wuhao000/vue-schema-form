<template>
  <a-layout class="bg-white" style="padding-bottom: 20px;">
    <a-layout-content>
      <a-layout-content class="demo-wrapper">
        <code class="markdown-body">
          <h1 id="字段解构">字段解构</h1>
<p>字段解构是一个非常强大的特性，它可以对组件生产的值做解构转换，使得快速贴合服务端数据结构要求，无需再做二次转换 
字段解构主要是对 property 用 ES Deconstruction 语法做解构，需要注意的是，不支持...语法</p>

        </code>
      </a-layout-content>
      <code-wrapper :code="code0" :md="md0">
        <demo0/>
      </code-wrapper>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import CodeWrapper from '../../components/code-wrapper.vue';
  import demo0 from '../../doc/demo/destruct/destruct.vue';
  import code0 from './demo/destruct/destruct.vue.txt';

  export default defineComponent({
    name: 'DocEffects',
    components: {CodeWrapper, demo0},
    setup() {
      return {code0};
    }
  });
</script>
