<template>
  <div class="markdown-body">
    <demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        v-model:value="value"
        :schema="schema"
        :effects="effects"/&gt;
    &lt;a-button @click="disableOrEnable"&gt;启用禁用&lt;/a-button&gt;
    &lt;a-button @click="editableOrReadonly"&gt;编辑/禁止编辑&lt;/a-button&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, reactive, ref, Ref} from 'vue';
  import {EffectsContext} from '../../../../types';
  import {FieldTypes, registerAntd} from '../../../schema-form';

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = reactive({
        props: {
          size: 'small',
          labelWidth: '120px'
        },
        fields: [{
          array: true,
          property: 'cols',
          max: 24,
          min: 1,
          title: '栅格布局',
          type: FieldTypes.Integer
        }]
      });
      const value = reactive({
        cols: []
      });
      const context: Ref&lt;EffectsContext&gt; = ref(null);
      const enable = ref(true);
      const editable = ref(true);
      const effects = ($: EffectsContext) =&gt; {
        context.value = $;
        $('cols').onFieldCreateOrChange((v) =&gt; {
          console.log(v);
        });
      };

      registerAntd();

      const editableOrReadonly = () =&gt; {
        editable.value = !editable.value;
        context.value('name').editable(editable.value);
      };
      const disableOrEnable = () =&gt; {
        enable.value = !enable.value;
        if (enable.value) {
          context.value('name').enable();
        } else {
          context.value('name').disable();
        }
      };
      return {
        disableOrEnable,
        editableOrReadonly,
        effects,
        schema,
        value
      };
    },
    created() {
      registerAntd();
    }
  });
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>