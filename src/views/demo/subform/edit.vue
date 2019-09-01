<template>
  <ae-layout class="demo-wrapper">
    {{value2}}
    <ae-layout-content>
      <a-schema-form class="demo-form"
                     :definition="definition"
                     :props="props"
                     @ok="onOk"
                     @cancel="onCancel"
                     :value="value2"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import {getSubFormDefinition, getSubFormValue} from '@/views/demo/subform/utils';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {

    public value2: any = getSubFormValue();

    get definition() {
      return getSubFormDefinition();
    }

    public created() {
      SchemaForm.registerAntd();
    }

  }
</script>
