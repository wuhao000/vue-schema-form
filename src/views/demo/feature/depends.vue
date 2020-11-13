<template>
  <v-schema-form v-model="value"
                 :schema="schema"/>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import {SchemaFormField} from '../../../../types';

  export const familyInfoFields: SchemaFormField[] = [{
    property: 'hasChild',
    title: '有无子女',
    type: 'boolean',
    displayValue: (value) => {
      return value ? '有' : '无';
    }
  }, {
    property: 'name',
    title: '子女姓名',
    type: 'string',
    depends: (value) => {
      return value && value.hasChild;
    }
  }, {
    property: 'sex',
    title: '子女性别',
    type: 'BasicData',
    props: {type: 'sex'},
    depends: (value) => {
      return value && value.hasChild;
    }
  }, {
    property: 'birthday',
    title: '子女出生日期',
    type: 'date',
    depends: (value) => {
      return value && value.hasChild;
    }
  }];
  export default {
    data() {
      return {
        value: {
          detail: []
        },
        schema: {
          fields: {
            detail: {
              type: 'object',
              array: true,
              fields: familyInfoFields
            }
          }
        }
      };
    },
    created() {
      SchemaForm.registerAntd();
    }
  };
</script>
