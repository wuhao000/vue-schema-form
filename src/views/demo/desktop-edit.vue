<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :definition="definition"
                     :props="props"
                     @reset="onReset"
                     @cancel="onCancel"
                     @ok="onOk"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';
  import SchemaForm from '@/index';
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
