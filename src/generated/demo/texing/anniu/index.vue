<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        :schema="schema"
        :actions="actions"
        @ok="onOk"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent} from 'vue';
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    setup() {
      return {
        actions: ['submit'],
        onOk: (v) =&gt; {
          console.log('aaa', v);
        },
        schema: {
          fields: {
            name: {
              type: 'string',
              title: '名称',
              required: true
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