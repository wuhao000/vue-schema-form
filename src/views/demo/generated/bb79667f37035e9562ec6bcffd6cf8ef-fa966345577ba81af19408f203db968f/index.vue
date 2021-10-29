<template>
  <div class="markdown-body">
    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;div&gt; {{ counter }} &lt;d-button @click="count"&gt;点击&lt;/d-button&gt;
          &lt;v-schema-form :actions="actions" :schema="schema"/&gt; &lt;/div&gt;
          &lt;/template&gt; &lt;script lang="ts"&gt; import {defineComponent, ref}
          from 'vue'; import {SchemaFormField} from '../../../../types'; import {DButton,
          registerAntd} from '../../../schema-form'; registerAntd(); export default
          defineComponent({ name: 'ButtonDemo', components: { DButton }, setup()
          { const counter = ref(0); const count = () =&gt; { counter.value++; };
          return { counter, count, actions: [{ action: () =&gt; { count() }, text:
          '提交' }], schema: { fields: { text: { type: 'string', props: { class: 'block',
          style: { width: '120px' } } } as SchemaFormField } } }; } }); &lt;/script&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>