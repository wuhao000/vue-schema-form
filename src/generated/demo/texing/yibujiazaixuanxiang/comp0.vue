
<template>
  <div>
    <v-schema-form
        :value="value"
        :schema="schema"/>
  </div>
</template>
<script lang="tsx" setup>
  import {ref} from 'vue';
  import {registerAntd} from '../../../../schema-form';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../../../../views/common/simple.vue';
  import {SchemaFormField} from '../../../../types';

  registerAntd();

  const value = ref({})

  const schema: SchemaFormField = {
    fields: [{
      property: 'c',
      title: '指定选项列表',
      type: 'select',
      enum: [
        {label: 'a', value: 1},
        {label: 'b', value: 2},
        {label: 'c', value: 3},
      ]
    }, {
      property: 'd',
      title: '通过方法返回列表',
      type: 'select',
      enum: () => {
        return [
          {label: 'a', value: 1},
          {label: 'b', value: 2},
          {label: 'c', value: 3},
        ]
      }
    }, {
      property: 'e',
      title: '调用方法异步加载选项',
      type: 'select',
      enum: () => {
        return new Promise(resolve => {
          resolve([
            {label: 'a', value: 1},
            {label: 'b', value: 2},
            {label: 'c', value: 3},
          ]);
        })
      }
    }, {
      property: 'f',
      title: '异步加载选项',
      type: 'select',
      enum: new Promise(resolve => {
        resolve([
          {label: 'a', value: 1},
          {label: 'b', value: 2},
          {label: 'c', value: 3},
        ]);
      })
    }]
  }
</script>
