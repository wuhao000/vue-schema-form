<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <ae-row>
        <ae-col :span="12">
          <v-schema-form v-model="value2"
                         class="demo-form"
                         :actions="actions"
                         :effects="effects"
                         :props="props"
                         :schema="definition"
                         @cancel="onCancel"
                         @ok="onOk"
                         @reset="onReset"></v-schema-form>
        </ae-col>
      </ae-row>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import {EffectsContext} from '@/types/form';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

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
  }
</script>
