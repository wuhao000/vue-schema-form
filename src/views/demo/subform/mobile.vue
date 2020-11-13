<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form class="demo-form"
                     platform="mobile"
                     :schema="definition"
                     :props="props"
                     @ok="onOk"
                     @cancel="onCancel"
                     :value="value2"></v-schema-form>
    </a-layout-content>
  </a-layout>
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
