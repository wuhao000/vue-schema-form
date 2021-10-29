
<template>
  <div>
    <v-schema-form :schema="schema"/>
  </div>
</template>
<script lang="ts" setup>
  import {registerAntd} from '../../../../schema-form/antd';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../../common/simple.vue';
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
    }]
  }

</script>