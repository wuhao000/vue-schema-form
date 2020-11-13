<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form class="demo-form"
                     :editable="false"
                     :schema="definition"
                     :props="props"
                     :value="value"></v-schema-form>
    </a-layout-content>
  </a-layout>
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
