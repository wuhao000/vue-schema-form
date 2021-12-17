<template>
  <div class="markdown-body">
    <h1 id="详情模式">详情模式</h1>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        v-model:value="value"
        :editable="false"
        :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, ref} from 'vue';
  import {FieldTypes, registerAntd} from '../../../schema-form';

  registerAntd();

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = {
        props: {
          labelWidth: 140
        },
        fields: {
          name: {
            type: FieldTypes.String,
            title: '名称'
          },
          select: {
            type: 'select',
            title: '单选',
            enum: [
              {label: '选项1', value: '1'},
              {label: '选项2', value: '2'},
            ]
          }
        }
      };
      const value = ref({
        name: 'abc',
        select: '2'
      });

      return {
        schema,
        value,
      };
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