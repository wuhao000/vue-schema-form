<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form
          v-model:value="value"
          :props="props"
          :schema="definition"
          class="demo-form"></v-schema-form>
      <a-button @click="dialogVisible = true">查看数据</a-button>
    </a-layout-content>
    <a-modal v-model:visible="dialogVisible">
      <pre>{{ value }}</pre>
    </a-modal>
  </a-layout>
</template>
<script lang="tsx">
  import {computed, reactive, ref} from 'vue';
  import {registerAntd} from '../../../schema-form/antd';
  import {getProps} from '../../../docs/demo/utils';

  registerAntd();
  export default {
    name: 'DestructDemo',
    setup() {
      const dialogVisible = ref(false);
      const props = getProps();
      const value = reactive({
        start: new Date(),
        end: new Date()
      });
      const options = [
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
        }
      ];
      const definition = computed(() => {
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
              enum: options
            }
          }
        };
      });
      return {
        dialogVisible,
        options,
        props,
        value,
        definition
      };
    }
  };
</script>
