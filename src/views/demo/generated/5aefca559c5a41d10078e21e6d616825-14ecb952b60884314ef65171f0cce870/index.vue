<template>
  <div class="markdown-body">
    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;div&gt; &lt;v-schema-form :schema="schema"/&gt; &lt;/div&gt;
          &lt;/template&gt; &lt;script lang="ts"&gt; import {registerAntd} from '../../../schema-form';
          registerAntd(); export default { name: 'GridLayoutDemo', data() { return
          { schema: { props: { labelWidth: 120, labelPosition: 'left' }, fields:
          { name: { title: '名称', type: 'string' }, $grid: { title: '高级选项', type:
          'grid', layout: [12, 12], props: { title: '高级选项' }, fields: { other: {
          title: '其他', type: 'string' }, other2: { title: '其他2', type: 'string' }
          } } } } }; } }; &lt;/script&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>