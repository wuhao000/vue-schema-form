<template>
  <div class="markdown-body">
    <h1 id="动态表单">动态表单</h1>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;a-layout&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          v-model:value="model"
          :effects="effects"
          :schema="schema"/&gt;
      &lt;show-value :value="model"/&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {registerAntd} from '../../../schema-form';
  import {EffectsContext} from '../../../../types';
  import {defineComponent, ref} from 'vue';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    setup() {
      const getDefaultBean = () =&gt; {
        return {
          name: '',
        };
      };
      const model = ref&lt;any&gt;(getDefaultBean());
      const quickAddMode = ref(false);
      const effects = ($: EffectsContext) =&gt; {
        if (!quickAddMode.value) {
          $('order', 'iconType', 'color', 'extras').show();
        }
        $('name').subscribe('fieldKeydown', (p) =&gt; {
          const e = p.event;
          if (e.key === 'Enter') {
            console.log('enter');
          }
        });
      };
      const schema = {
        props: {
          labelWidth: '150px',
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          rules: {
            name: [{required: true, message: '请输入名称'}],
            code: [{required: true, message: '请输入编码'}]
          }
        },
        fields: [{
          type: 'string',
          property: 'name',
          title: '名称'
        }, {
          type: 'integer',
          property: 'age',
          title: '年龄'
        }, {
          type: 'button',
          title: '',
          events: {
            onClick: () =&gt; {
              loadData();
            }
          },
          props: {
            title: '加载数据并添加一个字段'
          }
        }]
      };
      const loadData = () =&gt; {
        model.value = {
          name: '前端开发工程师',
          age: 22
        };
        schema.fields.push({
          type: 'date',
          property: 'birthday',
          title: '生日'
        })
      };
      return {
        quickAddMode,
        effects,
        model,
        loadData,
        schema
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