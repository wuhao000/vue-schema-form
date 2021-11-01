
<template>
  <a-layout>
    <a-layout-content>
      <a-row>
        <a-col :span="12">
          <v-schema-form
              v-model:value="value2"
              :actions="actions"
              platform="mobile"
              :effects="effects"
              :props="props"
              :schema="definition"
              class="demo-form"
              @cancel="onCancel"
              @ok="onOk"
              @reset="onReset"></v-schema-form>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {message} from 'ant-design-vue';
  import {EffectsContext} from '../../../../../types';
  import {registerAntdMobile} from '../../../../schema-form';
  import {useBaseDemo} from '../../../../views/demo/base';

  registerAntdMobile();

  export default {
    name: 'Demo',
    setup() {
      const {definition, value} = useBaseDemo();
      return {
        definition,
        value,
        actions: ['submit', 'cancel', 'reset', {
          name: 'validate',
          text: '校验',
          action: async ($: EffectsContext) => {
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
          $.onValidate((errors) => {
            if (errors.length) {
              message.error('表单内容有错误，请检查');
              errors[0].field.focus();
            }
          });
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
</script>
