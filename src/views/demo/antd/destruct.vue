<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :schema="definition"
                     :props="props"></a-schema-form>
      <d-button @click="dialogVisible = true">查看数据</d-button>
    </ae-layout-content>
    <d-cascader placeholder="请选择"
                :options="options"/>
    <ae-modal v-model="dialogVisible">
      <pre>{{value}}</pre>
    </ae-modal>
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


    get definition(): FormDescriptor {
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
