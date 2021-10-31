<template>
  <div class="markdown-body">
    <h1 id="表单详情">表单详情</h1>
<demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          :editable="false"
          :schema="definition"
          :value="value"
          class="demo-form"/&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  import {registerAntd} from '../../../schema-form';
  import {useBaseDemo} from '../../../views/demo/base';
  
  registerAntd();
  const {definition, value} = useBaseDemo();
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>