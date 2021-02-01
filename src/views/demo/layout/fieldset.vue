<template>
  <div>
    <v-schema-form :schema="schema"/>
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  SchemaForm.registerAntd();

  export default {
    data() {
      return {
        schema: {
          fields: {
            name: {
              title: '名称',
              type: 'string'
            },
            $legend: {
              props: {
                title: '高级选项',
              },
              type: 'fieldset',
              fields: {
                other: {
                  title: '其他',
                  type: 'string'
                }
              }
            }
          }
        }
      };
    }
  };
</script>
