<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form class="demo-form"
                     mode="display"
                     :schema="definition"
                     :props="props"
                     :value="value"></v-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {

    public created() {
      SchemaForm.registerElement();
    }
  }
</script>
