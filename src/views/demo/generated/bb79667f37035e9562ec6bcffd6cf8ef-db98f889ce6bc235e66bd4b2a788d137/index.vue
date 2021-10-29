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
    &lt;show-value
        name="bool1" 
        :value="value?.bool"/&gt;
    &lt;show-value 
        name="bool2" 
        :value="value?.bool2"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, ref} from 'vue';
  import {SchemaFormField} from '../../../../types';
  import {registerAntd} from '../../../schema-form';
  import ShowValue from '../show-value';

  registerAntd();
  export default defineComponent({
    name: 'CheckboxDemo',
    components: {ShowValue},
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