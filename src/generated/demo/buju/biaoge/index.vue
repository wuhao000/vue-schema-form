<template>
  <div class="markdown-body">
    <h1 id="表格布局">表格布局</h1>
<blockquote>
<p>表格布局的实现较为复杂，正在开发中……</p>
</blockquote>
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
&lt;script lang="ts" setup&gt;
  import {ref} from 'vue';
  import {registerAntd} from '../../../schema-form';
  import {SchemaFormField} from '../../../../types';

  registerAntd();
  const value = ref([{}])
  const schema: SchemaFormField = {
    props: {
      labelWidth: 100,
      labelPosition: 'left'
    },
    array: true,
    arrayComponent: 'table',
    fields: {
      name: {
        title: '0名称',
        type: 'string'
      },
      $grid: {
        type: 'grid',
        layout: [12, 12],
        props: {
          gutter: 20
        },
        fields: {
          other: {
            title: '其他',
            type: 'string'
          },
          other2: {
            title: '其他2',
            type: 'string'
          }
        }
      }
    }
  }
&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>