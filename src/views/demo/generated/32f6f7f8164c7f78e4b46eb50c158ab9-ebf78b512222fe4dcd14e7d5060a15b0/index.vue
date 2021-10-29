<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          :editable="false"
          :props="props"
          :schema="definition"
          :value="value2"
          class="demo-form"&gt;&lt;/v-schema-form&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
  import {registerAntd} from '../../../schema-form/antd';
  import {getSubFormDefinition, getSubFormValue} from '../utils/utils';
  import {ref} from 'vue';

  registerAntd();
  export default {
    name: 'Demo',
    setup() {
      const value2 = ref(getSubFormValue());
      return {
        definition: getSubFormDefinition(),
        value2
      };
    }
  };
&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>