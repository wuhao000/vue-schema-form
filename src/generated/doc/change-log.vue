<template>
  <a-layout class="bg-white" style="padding-bottom: 20px;">
    <a-layout-content>
      <a-layout-content class="demo-wrapper">
        <code class="markdown-body">
          <h2 id="更新日志">更新日志</h2>
<h3 id="v013">v0.1.3</h3>
<p><code>2019.9.9</code></p>
<ul>
<li>表单项定义增加默认值（default属性）</li>
<li>表单项为详情模式（editable为false）时，使用value操作赋值不会更新到表单的值对象</li>
</ul>

        </code>
      </a-layout-content>
      
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import CodeWrapper from '../../components/code-wrapper.vue';
  
  

  export default defineComponent({
    name: 'DocEffects',
    components: {CodeWrapper},
    setup() {
      return {};
    }
  });
</script>
