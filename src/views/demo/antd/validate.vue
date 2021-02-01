<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <a-row>
        <a-col :span="12">
          <v-schema-form v-model="value2"
                         class="demo-form"
                         :actions="actions"
                         :effects="effects"
                         :props="props"
                         :schema="definition"
                         @cancel="onCancel"
                         @ok="onOk"
                         @reset="onReset"></v-schema-form>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';
  import {EffectsContext} from '../../../../types';

  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {

    public actions = ['submit', 'cancel', 'reset', {
      name: 'validate',
      text: '校验',
      action: async ($: EffectsContext) => {
        const res = await $.validate();
        if (res.length) {
          // @ts-ignore
          this.$message.error(res[0].errors.join('、'));
        }
      }
    }];

    public value2 = {
      string: '1111111'
    };

    public created() {
      SchemaForm.registerAntd();
    }

    public effects($: EffectsContext) {
      $.onValidate((errors) => {
        if (errors.length) {
          // @ts-ignore
          this.$message.error('表单内容有错误，请检查');
          errors[0].field.focus();
        }
      });
    }

    public value3 = {};

    public schema3 = {
      fields: [{
        title: '项目编号',
        property: 'item.id',
        type: 'string',
        required: true,
        placeholder: '2位行业编码+6位年月+3位数字编号',
        props: {
          textAlign: 'right'
        }
      }, {
        title: '项目名称',
        property: 'item.name',
        type: 'string',
        required: true,
        placeholder: '请输入项目名称',
        props: {textAlign: 'right'}
      }]
    };

  }
</script>
