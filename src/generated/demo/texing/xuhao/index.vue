<template>
  <div class="markdown-body">
    <h1 id="表单项添加序号">表单项添加序号</h1>
<blockquote>
<p>设置表单属性index=true来启用序号
给表单项的标题前面加上序号，如果存在隐藏表单项，则显示的序号不连续</p>
</blockquote>
<h2 id="配置说明">配置说明</h2>
<p>设置schema的props属性inline的值为<strong>true</strong></p>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  import {registerAntd} from '../../../schema-form';
  // noinspection ES6UnusedImports
  import {SchemaFormField} from '../../../types';

  registerAntd();

  const schema: SchemaFormField = {
    props: {index: true},
    fields: [{
      property: 'a',
      title: '字符串1',
      type: 'string'
    }, {
      property: 'b',
      title: '字符串2',
      type: 'string'
    }, {
      property: 'c',
      title: '字符串3',
      type: 'string'
    }, {
      property: 'd',
      type: 'object',
      props: {
        index: false
      },
      title: '子表单',
      fields: [{
        property: 'e',
        title: '字符串4',
        type: 'string'
      }, {
        property: 'f',
        title: '字符串5',
        type: 'string'
      }]
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