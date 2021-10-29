<template>
  <div class="markdown-body">
    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;a-layout class="bg-white wrapper"&gt; &lt;a-layout-content&gt;
          &lt;v-schema-form v-model:value="value" :editable="editable" :schema="schema"&gt;&lt;/v-schema-form&gt;
          &lt;a-button @click="changeMode"&gt; {{ editable ? '详情' : '编辑' }} &lt;/a-button&gt;
          &lt;show-value :value="value"/&gt; &lt;/a-layout-content&gt; &lt;/a-layout&gt;
          &lt;/template&gt; &lt;script lang="tsx"&gt; import {registerAntd} from
          '../../../schema-form/antd'; import ShowValue from '../show-value'; import
          {defineComponent, ref} from 'vue'; registerAntd(); export default defineComponent({
          name: 'LayoutInline', components: {ShowValue}, setup() { const value =
          ref({}); const editable = ref(true); return { value, editable, schema:
          { props: { labelCol: {span: 2} }, fields: { textbox1: { type: 'text-box',
          title: '文本串联', layout: '%s元', fields: { a: { type: 'string' } } }, textbox2:
          { type: 'text-box', title: '文本串联', layout: '订%s元/票 退%s元/票 改%s元/票', fields:
          { text1: { type: 'number', default: 10, required: true }, text2: { type:
          'number', default: 20, required: true }, text3: { type: 'number', default:
          30, required: true } } } } }, changeMode() { editable.value = !editable.value;
          }, effects2($) { $('month').onFieldChange((v) =&gt; { console.log('month
          changed: ' + v); }); } }; } }); &lt;/script&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>