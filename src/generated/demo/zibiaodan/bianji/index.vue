<template>
  <div class="markdown-body">
    <demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          :props="props"
          :schema="definition"
          :value="value2"
          class="demo-form"
          @cancel="onCancel"
          @ok="onOk"&gt;&lt;/v-schema-form&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
import {getSubFormDefinition} from '../../../views/demo/utils/utils';
import {computed} from 'vue';
import {registerAntd} from '../../../schema-form';

registerAntd();
export default {
  name: "Demo",
  setup() {
    return {
      definition: computed(() =&gt; {
        return getSubFormDefinition();
      })
    };
  }
};
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>