<template>
  <div class="markdown-body">
    <h1 id="表单校验">表单校验</h1>
<demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout&gt;
    &lt;a-layout-content&gt;
      &lt;a-row&gt;
        &lt;a-col :span="12"&gt;
          &lt;v-schema-form
              v-model:value="value2"
              :actions="actions"
              :effects="effects"
              :props="props"
              :schema="definition"
              class="demo-form"
              @cancel="onCancel"
              @submit="onOk"
              @reset="onReset"/&gt;
        &lt;/a-col&gt;
      &lt;/a-row&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
  import {registerAntd} from '../../../schema-form';
  import {EffectsContext} from '../../../../types';
  import {useBaseDemo} from '../../../views/demo/base';
  import {message} from 'ant-design-vue';

  registerAntd();

  export default {
    name: 'Demo',
    setup(props) {
      const {definition, value} = useBaseDemo();
      return {
        definition,
        value,
        actions: ['submit', 'cancel', 'reset', {
          name: 'validate',
          text: '校验',
          action: async ($: EffectsContext) =&gt; {
            const res = await $.validate();
            if (res.length) {
              message.error(res[0].errors.join('、'));
              res[0].field.focus(true);
            }
          }
        }],
        value2: {
          string: '1111111'
        },
        effects($) {
          $.onValidate((errors) =&gt; {
            if (errors.length) {
              message.error('表单内容有错误，请检查');
              errors[0].field.focus();
            }
          });
        },
        onOk() {
          console.log('ok');
        },
        onCancel() {
          console.log('cancel');
        },
        onReset() {
          console.log('reset');
        }
      };
    }
  };
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>