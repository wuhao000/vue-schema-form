<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form class="demo-form"
                     :editable="false"
                     :schema="definition"
                     :props="props"
                     :value="value2"></v-schema-form>
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
