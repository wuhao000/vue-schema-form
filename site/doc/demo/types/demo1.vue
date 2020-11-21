<template>
  <v-schema-form :schema="schema"></v-schema-form>
</template>
<script lang="ts">

  export default {
    name: 'TypesDemo1',
    data() {
      return {
        schema: {
          props: {
            labelWidth: '80px'
          },
          fields: {
            grid: {
              type: 'grid',
              layout: [12, 8, [6, 6, 12], 24],
              fields: {
                s1: {
                  type: 'string',
                  title: '字段1'
                },
                s2: {
                  type: 'string',
                  title: '字段2'
                },
                s3: {
                  type: 'string',
                  title: '字段3'
                },
                s4: {
                  type: 'string',
                  title: '字段4'
                },
                s5: {
                  type: 'string',
                  title: '字段5'
                },
                s6: {
                  type: 'string',
                  title: '字段6'
                }
              }
            }
          }
        }
      };
    },
    created() {
      window.SchemaForm.registerElement();
    }
  };
</script>
