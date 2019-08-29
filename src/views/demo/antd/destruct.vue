<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <pre>{{value}}</pre>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :definition="definition"
                     :props="props"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import {FormDescriptor} from '@/types/bean';
  import {getProps} from '@/views/demo/utils';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Vue {

    public props = getProps();
    public value = {
      start: new Date(),
      end: new Date()
    };


    get definition(): FormDescriptor {
      return {
        fields: {
          '[start, end]': {
            type: 'daterange',
            title: '时间范围'
          }
        }
      };
    }


    public created() {
      SchemaForm.registerAntd();
    }
  }
</script>
