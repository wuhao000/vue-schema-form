<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form inline
                     v-model="options"
                     :schema="optionFormDefinition"></v-schema-form>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :schema="definition"
                     :disabled="options.disabled"
                     :loading="options.loading"
                     :readonly="options.readonly"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></v-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';


  SchemaForm.registerElement();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {
    public created() {
      SchemaForm.registerElement();
    }
  }
</script>
