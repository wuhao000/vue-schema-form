<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;
    {{ value }}
    &lt;v-schema-form
        v-model:value="value"
        :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, ref} from 'vue';
  import {FieldTypes} from '../../../schema-form';
  import {registerAntd} from '../../../schema-form/antd';

  registerAntd();
  export default defineComponent({
    name: 'PictureComponentDemo',
    setup() {
      const value = ref('');
      return {
        value,
        schema: {
          fields: {
            file: {
              title: 'picture',
              type: FieldTypes.Picture,
              array: true,
              props: {
                action: 'http://localhost:3000/api/upload',
                valueType: 'object',
                mode: 'card',
                accept: '.jpg, .jpeg, .png',
                data: {
                  access_token: '90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20'
                }
              }
            }
          }
        }
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