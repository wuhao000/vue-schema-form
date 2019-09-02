<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form inline
                     v-model="options"
                     :definition="optionFormDefinition"></a-schema-form>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :actions="actions"
                     :definition="definition"
                     :disabled="options.disabled"
                     :loading="options.loading"
                     :props="props"
                     :readonly="options.readonly"
                     :sticky="options.sticky"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></a-schema-form>
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


    public actions = [
      'submit', 'reset', 'cancel', {
        text: '切换显示', action: this.customAction
      }
    ];

    public customAction($: EffectsContext) {
      const value = $.getValue();
      console.log($('subFormArray.?').toggle());
    }

    public created() {
      SchemaForm.registerAntd();
    }

  }
</script>
