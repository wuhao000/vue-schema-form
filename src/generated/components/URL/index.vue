<template>
  <div class="markdown-body">
    <h1 id="url">URL</h1>
<demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;d-url v-model:value="value"/&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  import {ref} from 'vue';
  import {DUrl, registerAntd} from '../../schema-form';

  registerAntd();
  const value = ref('https://www')
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>