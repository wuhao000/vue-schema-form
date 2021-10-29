<template>
  <div class="markdown-body">
    <p>fdsafdsa
fdsafdsa
fdsa</p>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;&lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  import './aaa.vue';
  import '../bbb.vue';
  import '../ccc.vue';
  import '../ddd.vue';
  import '../../eee.vue';
  const props = defineProps({

  });
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>
<pre><demo-wrapper>
<comp1></comp1>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;&lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  const props = defineProps({

  });
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>
<p>2222
222</p>

  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
  import  comp1 from './comp1.vue';
</script>