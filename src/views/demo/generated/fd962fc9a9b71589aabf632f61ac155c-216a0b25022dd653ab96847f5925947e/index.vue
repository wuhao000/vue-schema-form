<template>
  <div class="markdown-body">
     <h1 id="表单详情">表单详情</h1>

    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;a-layout class="demo-wrapper"&gt; &lt;a-layout-content&gt;
          &lt;v-schema-form :editable="false" :schema="definition" :value="value"
          class="demo-form"/&gt; &lt;/a-layout-content&gt; &lt;/a-layout&gt; &lt;/template&gt;
          &lt;script lang="ts"&gt; import {defineProps} from 'vue'; import {registerAntd}
          from '../../../schema-form'; import {useBaseDemo} from '../base'; registerAntd();
          const props = defineProps(); const {definition, value} = useBaseDemo(props);
          &lt;/script&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>