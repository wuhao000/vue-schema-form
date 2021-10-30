<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        v-model:value="value"
        :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, ref} from 'vue';
  import {SchemaFormField} from '../../../../types';
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'CheckboxDemo',
    setup() {
      const value = ref();
      return {
        value,
        schema: {
          fields: {
            bool: {
              type: 'boolean',
              title: 'bool1',
              default: true,
              description: '这是一段描述信息'
            },
            bool2: {
              type: 'boolean',
              xType: 'checkbox',
              title: 'bool2',
              default: false
            }
          }
        } as SchemaFormField
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