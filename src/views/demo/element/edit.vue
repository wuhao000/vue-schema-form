<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
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
    </a-layout-content>
  </a-layout>
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
