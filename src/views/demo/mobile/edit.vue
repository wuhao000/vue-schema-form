<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content style="background: #f9f9f9;">
      <v-schema-form v-model="value"
                     class="demo-form"
                     platform="mobile"
                     :schema="definition"
                     :props="props"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></v-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {
  }
</script>
