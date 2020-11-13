<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form inline
                     v-model="options"
                     :schema="optionFormDefinition"></v-schema-form>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :actions="actions"
                     :disabled="options.disabled"
                     :loading="options.loading"
                     :editable="!options.displayMode"
                     :platform="options.mobile ? 'mobile' : 'desktop'"
                     :props="props"
                     :readonly="options.readonly"
                     :schema="definition"
                     :sticky="options.sticky"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import {EffectsContext} from 'v-schema-form-types';
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
