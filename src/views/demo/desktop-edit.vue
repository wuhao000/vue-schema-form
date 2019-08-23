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
                     :loading="options.loading"
                     :readonly="options.readonly"
                     :props="props"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {


    public created() {
      SchemaForm.registerAntd();
    }

  }
</script>
