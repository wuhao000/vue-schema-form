<template>
  <div class="markdown-body">
    <demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout&gt;
    &lt;a-layout-content&gt;
      &lt;a-button @click="loadData"&gt;加载&lt;/a-button&gt;
      &lt;v-schema-form
          v-model:value="model"
          platform="mobile"
          :effects="effects"
          :schema="formDefinition"/&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, ref} from 'vue';
  import {EffectsContext} from '../../../../types';
  import {registerAntdMobile} from '../../../schema-form';

  registerAntdMobile();
  export default defineComponent({
    name: 'Demo',
    setup() {
      const getDefaultBean = () =&gt; {
        return {
          id: '',
          name: '',
          extras: {
            requirements: ''
          }
        };
      };
      const model = ref&lt;any&gt;(getDefaultBean());
      const loadData = () =&gt; {
        model.value = {
          id: 'd3cfdf4426eb4fb59bc1db906365e0f2',
          name: '前端开发工程师',
          type: 'post',
          code: '002',
          order: 0,
          color: '',
          extras: {
            usersToInterview: [],
            userToChooseResume: [],
            requirements: 'aaaaaaaaaaaa'
          }
        };
      };
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
      return {
        quickAddMode,
        effects,
        model,
        loadData,
        formDefinition: {
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
            type: 'button',
            title: 'abc',
            props: {
              action: () =&gt; {
                console.log(1);
                model.value.name = 'abc';
              }
            }
          }]
        }
      };
    }
  });
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>