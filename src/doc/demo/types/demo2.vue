<template>
  <v-schema-form :schema="schema"
                 :value="value"></v-schema-form>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';

  export default {
    name: 'TypesDemo1',
    data() {
      return {
        value: [{
          s1: '1',
          s3: '4'
        }],
        schema: {
          array: true,
          arrayComponent: 'block',
          arrayProps: {
            addText: '增加一项',
            removeText: '删除'
          },
          props: {
            labelWidth: '80px'
          },
          fields: {
            s1: {
              type: 'string',
              title: '字段1'
            },
            s2: {
              type: 'string',
              title: '字段2'
            }
          }
        }
      };
    },
    created() {
      SchemaForm.registerElement();
    }
  };
</script>
