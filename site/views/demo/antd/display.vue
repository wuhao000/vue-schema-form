<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form class="demo-form"
                     :editable="false"
                     :schema="definition"
                     :props="props"
                     :value="value"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {SchemaForm} from '../../../main';
  import Base from '../base';
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
