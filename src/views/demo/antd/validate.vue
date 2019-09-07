<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <ae-row>
        <ae-col :span="12">
          <v-schema-form v-model="value2"
                         class="demo-form"
                         :actions="actions"
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
        console.log(res);
      }
    }];

    public value2 = {
      string: '1111111'
    };

    public created() {
      SchemaForm.registerAntd();
    }

  }
</script>
