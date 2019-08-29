<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form inline
                     v-model="options"
                     :definition="optionFormDefinition"></a-schema-form>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :definition="definition"
                     :disabled="options.disabled"
                     :effects="effects"
                     :loading="options.loading"
                     :props="props"
                     :readonly="options.readonly"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import {IField} from '@/uform/types';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {


    public effects = {
      onFieldChange: (field: IField, value, $) => {
        if (field.plainPath === 'string') {
          if (value === '2') {
            $('text').hide();
          } else {
            $('text').show();
          }
        }
      }
    };

    public created() {
      SchemaForm.registerAntd();
    }
  }
</script>
