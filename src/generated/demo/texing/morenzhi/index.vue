<template>
  <div class="markdown-body">
    <h1 id="默认值">默认值</h1>
<blockquote>
<p>使用选项的<code>default</code>属性来指定默认值</p>
</blockquote>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        v-model:value="value"
        :schema="schema"/&gt;
    &lt;show-value :value="value"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, reactive} from 'vue';
  import {FieldTypes, registerAntd} from '../../../schema-form';

  registerAntd();

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = {
        props: {
          labelWidth: 140
        },
        fields: {
          name: {
            type: FieldTypes.String,
            title: '名称',
            default: 'abc'
          },
          select: {
            type: 'select',
            title: '单选',
            enum: [
              {label: '选项1', value: '1'},
              {label: '选项2', value: '2'},
            ],
            default: '2'
          },
          names: {
            type: 'string',
            title: '多个名称',
            array: true,
            default: ['a', 'b']
          },
          b: {
            type: 'object',
            fields: {
              c: {
                type: FieldTypes.String,
                title: '子表单名称',
                default: 'aaa'
              }
            }
          }
        }
      };
      const value = reactive({});

      return {
        schema,
        value,
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