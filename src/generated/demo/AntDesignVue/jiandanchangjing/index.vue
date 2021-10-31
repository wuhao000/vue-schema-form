<template>
  <div class="markdown-body">
    <h1 id="简单场景">简单场景</h1>
<blockquote>
<p>最简单的表单使用场景，只需要定义描述表单结构的schema即可</p>
</blockquote>
<demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;simple-edit-demo :init="register"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  import {registerAntd} from '../../../schema-form';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../../../views/common/simple.vue';

  registerAntd();
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>