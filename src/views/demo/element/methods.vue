<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form v-model="value"
                     class="demo-form"
                     ref="form"
                     :actions="actions"
                     :effects="formProps.effects"
                     :props="props"
                     :schema="definition"></v-schema-form>
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

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Vue {

    public actions = [{
      name: 'disabled',
      text: '禁用选择1',
      action: ($: EffectsContext) => {
        $('select').disable();
      }
    }, {
      name: 'disabled',
      text: '启用选择1',
      action: ($: EffectsContext) => {
        $('select').enable();
      }
    }];


    public definition: FormDescriptor = {
      fields: {
        select: {
          title: '选择1',
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

    public formProps = {
      effects: ($: EffectsContext) => {
      }
    };

    public props = getProps();

    public value = {};

    get form(): any {
      return this.$refs.form;
    }

    public created() {
      SchemaForm.registerElement();
    }

    public setOptions() {
      const $ = this.form.context;
      $('select').setFieldProps({options: [{label: '1', value: '2'}]});
    }
  }
</script>
