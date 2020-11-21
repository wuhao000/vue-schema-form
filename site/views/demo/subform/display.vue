<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form class="demo-form"
                     :editable="false"
                     :schema="definition"
                     :props="props"
                     :value="value2"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import Base from '../base';
  import {getSubFormDefinition, getSubFormValue} from '../subform/utils';
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
      window.SchemaForm.registerAntd();
    }

  }
</script>
