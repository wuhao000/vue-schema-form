<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form :editable="false"
                     :schema="definition"
                     :value="value"
                     class="demo-form"/&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent} from 'vue';
  import {registerElement} from '../../../element';
  import {useBaseDemo} from '../base';

  registerElement();
  export default defineComponent({
    setup(props, ctx) {
      const {definition, value} = useBaseDemo(props, ctx);
      return {definition, value};
    }
  });
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>

  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>