
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
      title: '我是自定义组件',
      type: (props) => {
        return <a-input {...props}/>;
      }
    }, {
      property: 'b',
      title: '我也是自定义组件',
      type: <div>111111111</div>
    }]
  }
</script>
