<template>
  <div class="markdown-body">
    <h1 id="按钮">按钮</h1>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;a-space&gt;
    &lt;d-button&gt;默认&lt;/d-button&gt;
    &lt;d-button type="danger"&gt;警告&lt;/d-button&gt;
    &lt;d-button type="ghost"&gt;Ghost&lt;/d-button&gt;
    &lt;d-button type="dashed"&gt;Dashed&lt;/d-button&gt;
    &lt;d-button type="link"&gt;链接&lt;/d-button&gt;  
  &lt;/a-space&gt;
  &lt;div&gt;
    &lt;a-space&gt;
      &lt;d-button text&gt;文本按钮&lt;/d-button&gt;
      &lt;d-button text type="danger"&gt;文本按钮&lt;/d-button&gt;
    &lt;/a-space&gt;  
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  import {DButton} from '../../schema-form';
&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
<p>111222</p>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>