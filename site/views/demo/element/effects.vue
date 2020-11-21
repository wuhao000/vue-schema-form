<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :editable="false"
                     ref="form"
                     :schema="definition"
                     :effects="formProps.effects"
                     :props="props"></v-schema-form>
      <a-button @click="setOptions">设置选项</a-button>
      <a-button @click="setValue">设置值</a-button>
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

    public definition: SchemaFormField = {
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

    public formProps = {
      effects: ($: EffectsContext) => {
        $('select').onFieldCreateOrChange((value) => {
          if (value === 1) {
            $('text').hide();
            $('select2').show();
            $('select2').setEnum([{label: '特殊选项1', value: 5}]);
          } else if (value === 2) {
            $('text').show();
            $('select2').hide();
          }
        });
      }
    };

    public props = getProps();

    public value = {};

    get form(): any {
      return this.$refs.form;
    }

    public setValue() {
      this.value = {
        select: 1
      };
    }

    public created() {
      SchemaForm.registerElement();
    }

    public setOptions() {
      const $ = this.form.store.context;
      $('select').setFieldProps({options: [{label: '1', value: '2'}]});
    }
  }
</script>
