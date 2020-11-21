<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      {{value}}
      <v-schema-form v-model="value"
                     class="demo-form"
                     ref="form"
                     :actions="actions"
                     :effects="formProps.effects"
                     :props="props"
                     :schema="definition"></v-schema-form>
      <el-button @click="setValue">赋值</el-button>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {SchemaForm} from '../../../main';
  import {getProps} from '../utils';
  import {EffectsContext, SchemaFormField} from '../../../../types';
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


    public definition: SchemaFormField = {
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

    public value: any = {
      id: 'abc'
    };

    get form(): any {
      return this.$refs.form;
    }

    public created() {
      SchemaForm.registerElement();
    }

    public setValue() {
      this.value.id = 'def';
      this.value.select = 2;
    }

    public setOptions() {
      const $ = this.form.context;
      $('select').setFieldProps({options: [{label: '1', value: '2'}]});
    }
  }
</script>
