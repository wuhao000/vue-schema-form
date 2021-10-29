<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default {
    data() {
      return {
        schema: {
          props: {
            labelWidth: 120,
            labelPosition: 'left'
          },
          fields: {
            name: {
              title: '名称',
              type: 'string'
            },
            $card: {
              title: '高级选项',
              type: 'card',
              props: {
                title: '高级选项'
              },
              fields: {
                other: {
                  title: '其他',
                  type: 'string'
                }
              }
            }
          }
        }
      };
    }
  };
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>

  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>