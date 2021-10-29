<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <a-row>
        <a-col :span="12">
          <v-schema-form v-model:value="value2"
                         :actions="actions"
                         :effects="effects"
                         :props="props"
                         :schema="definition"
                         class="demo-form"
                         @cancel="onCancel"
                         @submit="onOk"
                         @reset="onReset"/>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">

import {registerAntd} from '../../../../schema-form/antd';
import {EffectsContext} from '../../../../../types';
import {useBaseDemo} from '../../base';
import {message} from 'ant-design-vue';
import {ref} from 'vue';

registerAntd();

export default {
  setup(props, ctx) {
    const {definition, value} = useBaseDemo(props, ctx);
    return {
      definition,
      value,
      actions: ['submit', 'cancel', 'reset', {
        name: 'validate',
        text: '校验',
        action: async ($: EffectsContext) => {
          const res = await $.validate();
          if (res.length) {
            // @ts-ignore
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
            // @ts-ignore
            message.error('表单内容有错误，请检查');
            errors[0].field.focus();
          }
        });
      },
      onOk() {

      },
      onCancel() {

      },
      onReset() {

      }
    };
  }
};
</script>