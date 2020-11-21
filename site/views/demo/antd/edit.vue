<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <a-input-number :value="2"
                      @input="onInput"
                      @change="onChange"/>
      <v-schema-form inline
                     v-model="options"
                     :schema="optionFormDefinition"></v-schema-form>
      <a-row>
        <a-col :span="12">
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
        </a-col>
        <a-col :span="12">
          <show-value :modal="false"
                      :value="value"/>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import Base from '../base';
  import Component from 'vue-class-component';
  import {EffectsContext} from '../../../../types';
  import ShowValue from '../show-value';

  @Component({
    name: 'DesktopEdit',
    components: {ShowValue}
  })
  export default class DesktopEdit extends Base {


    public actions = [
      'submit', 'reset', 'cancel', {
        text: '切换显示', action: this.customAction
      }
    ];

    public created() {
      window.SchemaForm.registerAntd();
    }

    public customAction($: EffectsContext) {
      const value = $.getValue();
      console.log($('subFormArray.?').toggle());
    }

    public onInput(a) {
      console.log('input', a);
    }

    public onChange(b) {
      console.log('change', b);
    }
  }
</script>
