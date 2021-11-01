<template>
  <div>
    <v-schema-form :schema="schema"/>
  </div>
</template>
<script lang="ts" setup>
  import {registerAntd} from '../../../../schema-form';
  // noinspection ES6UnusedImports
  import {SchemaFormField} from '../../../../types';

  registerAntd();

  const schema: SchemaFormField = {
    props: {index: true},
    fields: [{
      property: 'a',
      title: '字符串1',
      type: 'string'
    }, {
      property: 'b',
      title: '字符串2',
      type: 'string'
    }, {
      property: 'c',
      title: '字符串3',
      type: 'string'
    }, {
      property: 'd',
      type: 'object',
      props: {
        index: false
      },
      title: '子表单',
      fields: [{
        property: 'e',
        title: '字符串4',
        type: 'string'
      }, {
        property: 'f',
        title: '字符串5',
        type: 'string'
      }]
    }]
  }
</script>
