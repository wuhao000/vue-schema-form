<template>
  <div>
    <v-schema-form v-model="value"
                   :schema="schema"/>
    {{value}}
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import {SchemaFormField} from 'v-schema-form-types';
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        value: null,
        schema: {
          fields: {
            a: {
              type: 'object',
              fields: [{
                property: 'b.name',
                type: 'string',
                title: '标题'
              }, {
                property: 'b.value',
                type: 'string',
                title: '值'
              }, {
                property: 'c.d.e',
                type: 'select',
                props: {
                  options: [{
                    label: 'a', value: 1
                  }, {
                    label: 'b', value: 2
                  }]
                }
              }]
            }
          }
        } as SchemaFormField
      };
    },
    created() {
      SchemaForm.registerAntd();
    }
  });
</script>
