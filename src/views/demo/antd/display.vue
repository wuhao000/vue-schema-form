<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form class="demo-form"
                     mode="display"
                     :schema="definition"
                     :props="props"
                     :value="value"></a-schema-form>
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
      SchemaForm.registerAntd();
      setTimeout(() => {
        this.value.string = '新的值';
      }, 3000);

    }

  }
</script>
