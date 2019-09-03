<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form class="demo-form"
                     mode="display"
                     platform="mobile"
                     :schema="definition"
                     :props="props"
                     :value="value"></a-schema-form>
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
