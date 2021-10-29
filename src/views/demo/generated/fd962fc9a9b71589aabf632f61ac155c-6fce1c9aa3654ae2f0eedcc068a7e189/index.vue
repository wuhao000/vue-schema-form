<template>
  <div class="markdown-body">
    <h1 id="自定义组件">自定义组件</h1>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        :value="value"
        :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="tsx" setup&gt;
  import {ref} from 'vue';
  import {registerAntd} from '../../../schema-form/antd';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../common/simple.vue';
  import {SchemaFormField} from '../../../types';

  registerAntd();

  const value = ref({})

  const schema: SchemaFormField = {
    fields: [{
      property: 'a',
      title: '字符串1',
      type: (props) =&gt; {
        return &lt;a-input {...props}/&gt;;
      }
    }, {
      property: 'b',
      title: '',
      type: &lt;div&gt;111111111&lt;/div&gt;
    }, {
      property: 'c',
      title: '字符串3',
      type: 'select',
      enum: [
        {label: 'a', value: 1},
        {label: 'b', value: 2},
        {label: 'c', value: 3},
      ]
    }, {
      property: 'd',
      title: '选择2',
      type: 'select',
      enum: () =&gt; {
        return [
          {label: 'a', value: 1},
          {label: 'b', value: 2},
          {label: 'c', value: 3},
        ]
      }
    }, {
      property: 'e',
      title: '选择3',
      type: 'select',
      enum: () =&gt; {
        return new Promise(resolve =&gt; {
          resolve([
            {label: 'a', value: 1},
            {label: 'b', value: 2},
            {label: 'c', value: 3},
          ]);
        })
      }
    }, {
      property: 'f',
      title: '选择4',
      type: 'select',
      enum: new Promise(resolve =&gt; {
        resolve([
          {label: 'a', value: 1},
          {label: 'b', value: 2},
          {label: 'c', value: 3},
        ]);
      })
    }]
  }

&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>