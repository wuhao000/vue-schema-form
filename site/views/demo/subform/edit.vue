<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form :props="props"
                     :schema="definition"
                     :value="value2"
                     class="demo-form"
                     @cancel="onCancel"
                     @ok="onOk"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {SchemaForm} from '../../../main';
  import {getSubFormDefinition, getSubFormValue} from '../subform/utils';
  import Component from 'vue-class-component';
  import Base from '../base';

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
