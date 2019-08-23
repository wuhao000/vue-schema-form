<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form class="demo-form"
                     mode="display"
                     :definition="definition"
                     :props="props"
                     :value="value"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import {getFormDefinition, getValue} from '@/views/demo/utils';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {


    public created() {
      SchemaForm.registerAntd();
    }

  }
</script>
