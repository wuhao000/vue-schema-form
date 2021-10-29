<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form :props="props"
                     :schema="definition"
                     :value="value2"
                     class="demo-form"
                     platform="mobile"
                     @cancel="onCancel"
                     @ok="onOk"&gt;&lt;/v-schema-form&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
// import {registerVant} from 'v-schema-form-vant';
import {getSubFormDefinition, getSubFormValue} from './utils';
import {computed} from 'vue';

// registerVant();
export default {
  setup() {
    return {
      definition: computed(() =&gt; {
        return getSubFormDefinition();
      }),
      value2: getSubFormValue()
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