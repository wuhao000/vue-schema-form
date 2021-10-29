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
  import {SchemaFormField} from '../../../../types';
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
            array: {
              title: '高级选项',
              type: 'object',
              array: true,
              props: {
                title: '高级选项',
                class: 'm-t'
              },
              arrayProps: {
                deleteBtnProps: {
                  width: '100px'
                }
              },
              fields: {
                $grid: {
                  type: 'grid',
                  layout: [8, 8, 8],
                  props: {
                    gutter: 20
                  },
                  fields: {
                    a: {
                      type: 'string'
                    },
                    b: {
                      type: 'string'
                    },
                    c: {
                      type: 'string'
                    }
                  }
                }
              }
            } as SchemaFormField
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