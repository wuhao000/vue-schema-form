<template>
  <div class="markdown-body">
    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;div&gt; &lt;v-schema-form v-model:value="value" :schema="schema"
          :effects="effects"/&gt; &lt;a-button @click="disableOrEnable"&gt;启用禁用&lt;/a-button&gt;
          &lt;a-button @click="editableOrReadonly"&gt;编辑/禁止编辑&lt;/a-button&gt; &lt;/div&gt;
          &lt;/template&gt; &lt;script lang="ts"&gt; import {defineComponent, reactive,
          ref, Ref} from 'vue'; import {EffectsContext, SchemaFormField} from '../../../../types';
          import {registerAntd} from '../../../schema-form'; export default defineComponent({
          name: 'Demo', setup() { const schema = reactive({ props: { labelWidth:
          '120px' }, fields: { name: { type: 'string', title: '名称', required: true,
          events: { change: (v) =&gt; { console.log(v); } } } as SchemaFormField,
          text: { type: 'autocomplete', title: '自动完成', props: { onSearch: v =&gt;
          { console.log(v); } } } } }); const value = reactive({ name: 'a' }); const
          context: Ref&lt;EffectsContext&gt; = ref(null); const enable = ref(true);
          const editable = ref(true); const effects = ($: EffectsContext) =&gt; {
          context.value = $; $('name').onFieldCreateOrChange((v) =&gt; { console.log(v);
          }); }; registerAntd(); const editableOrReadonly = () =&gt; { editable.value
          = !editable.value; context.value('name').editable(editable.value); }; const
          disableOrEnable = () =&gt; { enable.value = !enable.value; if (enable.value)
          { context.value('name').enable(); } else { context.value('name').disable();
          } }; return { disableOrEnable, editableOrReadonly, effects, schema, value
          }; }, created() { registerAntd(); } }); &lt;/script&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>