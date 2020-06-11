<template>
  <ae-layout class="bg-white wrapper">
    <ae-layout-content>
      <v-schema-form v-model="value"
                     :schema="schema"/>
      {{value}}
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';

  export default {
    data() {
      return {
        value: null,
        schema: {
          props: {
            labelWidth: '150px'
          },
          fields: {
            name: {
              type: 'string',
              array: true,
              title: '标题',
              props: {
                addBtnProps: {
                  text: true
                }
              }
            }
          }
        }
      };
    },
    beforeCreate() {
      SchemaForm.registerAntd();
    }
  };
</script>
