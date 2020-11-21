<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :schema="definition"
                     :props="props"></v-schema-form>
      <a-button @click="dialogVisible = true">查看数据</a-button>
    </a-layout-content>
    <a-cascader placeholder="请选择"
                :options="options"/>
    <a-modal v-model="dialogVisible">
      <pre>{{value}}</pre>
    </a-modal>
  </a-layout>
</template>
<script lang="tsx">
  import {SchemaForm} from '../../../main';
  import {getProps} from '../utils';
  import {SchemaFormField} from '../../../../types';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Vue {

    public dialogVisible = false;
    public options = [
      {
        value: 'zhejiang',
        label: '浙江',
        isLeaf: false,
        loading: false,
        children: [{
          label: '杭州', value: 'hz'
        }, {
          label: '温州', value: 'wz'
        }]
      }, {
        value: 'jiangsu',
        label: '江苏',
        isLeaf: false,
        loading: false,
        children: [{
          label: '南京', value: 'nj',
          children: [{
            label: '鼓楼区', value: 'gl'
          }, {
            label: '玄武区', value: 'xw'
          }]
        }, {
          label: '苏州', value: 'sz'
        }]
      }];
    public props = getProps();
    public value = {
      start: new Date(),
      end: new Date()
    };


    get definition(): SchemaFormField {
      return {
        fields: {
          '[start, end]': {
            type: 'daterange',
            title: '时间范围'
          },
          '[province,city,town]': {
            type: 'cascader',
            title: '省市区',
            placeholder: '请选择',
            enum: this.options
          }
        }
      };
    }

    public created() {
      SchemaForm.registerAntd();
    }
  }
</script>
