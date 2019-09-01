<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :definition="definition"
                     :effects="effects"
                     :props="props"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import {FormDescriptor} from '@/types/bean';
  import {EffectsContext} from '@/types/form';
  import {getProps} from '@/views/demo/utils';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Vue {

    public definition: FormDescriptor = {
      fields: {
        select: {
          title: '选择',
          type: 'select',
          props: {options: [{label: '选项1', value: 1}, {label: '选项2', value: 2}]}
        },
        text: {
          title: '名称',
          visible: false,
          type: 'string'
        },
        select2: {
          title: '选择2',
          type: 'select',
          visible: false,
          props: {options: [{label: '选项1', value: 1}, {label: '选项2', value: 2}]}
        }
      }
    };

    public effects = ($: EffectsContext) => {
      $('select').onFieldChange((value) => {
        if (value === 1) {
          $('text').hide();
          $('select2').show();
          $('select2').setFieldProps({
            options: [{label: '特殊选项1', value: 5}]
          });
        } else {
          $('text').show();
          $('select2').hide();
        }
      });
    }

    public props = getProps();

    public value = {};

    public created() {
      SchemaForm.registerAntd();
    }
  }
</script>
