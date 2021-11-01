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
  import {registerAntd} from '../../../schema-form';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../../../views/common/simple.vue';
  import {SchemaFormField} from '../../../types';

  registerAntd();

  const value = ref({})

  const schema: SchemaFormField = {
    fields: [{
      property: 'a',
      title: '我是自定义组件',
      type: (props) =&gt; {
        return &lt;a-input {...props}/&gt;;
      }
    }, {
      property: 'b',
      title: '我也是自定义组件',
      type: &lt;div&gt;111111111&lt;/div&gt;
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