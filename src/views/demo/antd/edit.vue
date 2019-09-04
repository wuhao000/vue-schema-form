<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form inline
                     v-model="options"
                     :schema="optionFormDefinition"></v-schema-form>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :actions="actions"
                     :disabled="options.disabled"
                     :loading="options.loading"
                     :mode="options.displayMode ? 'display' : 'edit'"
                     :platform="options.mobile ? 'mobile' : 'desktop'"
                     :props="props"
                     :readonly="options.readonly"
                     :schema="definition"
                     :sticky="options.sticky"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></v-schema-form>
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

    public created() {
      SchemaForm.registerAntd();
    }

    public customAction($: EffectsContext) {
      const value = $.getValue();
      console.log($('subFormArray.?').toggle());
    }

  }
</script>
