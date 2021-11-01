<template>
  <div class="markdown-body">
    <h1 id="异步加载选项">异步加载选项</h1>
<blockquote>
<p>注意：异步方法为一次性执行，如果需要组件联动获取选项列表，请使用<code><a href="/doc/fuzuoyonghanshu">副作用函数</a></code></p>
</blockquote>
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
  import {registerAntd} from '../../../schema-form';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../../../views/common/simple.vue';
  import {SchemaFormField} from '../../../types';

  registerAntd();

  const value = ref({})

  const schema: SchemaFormField = {
    fields: [{
      property: 'c',
      title: '指定选项列表',
      type: 'select',
      enum: [
        {label: 'a', value: 1},
        {label: 'b', value: 2},
        {label: 'c', value: 3},
      ]
    }, {
      property: 'd',
      title: '通过方法返回列表',
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
      title: '调用方法异步加载选项',
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
      title: '异步加载选项',
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