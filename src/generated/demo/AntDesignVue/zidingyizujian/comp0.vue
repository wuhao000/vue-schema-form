
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
      property: 'a',
      title: '字符串1',
      type: (props) => {
        return <a-input {...props}/>;
      }
    }, {
      property: 'b',
      title: '',
      type: <div>111111111</div>
    }, {
      property: 'c',
      title: '字符串3',
      type: 'select',
      enum: [
        {label: 'a', value: 1},
        {label: 'b', value: 2},
        {label: 'c', value: 3},
      ]
    }, {
      property: 'd',
      title: '选择2',
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
      title: '选择3',
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
      title: '选择4',
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
