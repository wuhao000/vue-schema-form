<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content style="background: #f9f9f9;">
      <m-date-picker title="abbc"/>
      <a-schema-form v-model="value"
                     class="demo-form"
                     platform="mobile"
                     :definition="definition"
                     :props="props"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></a-schema-form>
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
