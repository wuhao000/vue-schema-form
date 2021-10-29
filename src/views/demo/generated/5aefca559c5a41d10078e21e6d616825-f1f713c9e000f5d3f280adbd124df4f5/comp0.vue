<template>
  <div>
    <v-schema-form :schema="schema"/>
  </div>
</template>
<script lang="ts">
  import {SchemaFormField} from '../../../../../types';
  import {registerAntd} from '../../../../schema-form';

  registerAntd();
  export default {
    data() {
      return {
        schema: {
          props: {
            labelWidth: 120,
            labelPosition: 'left'
          },
          fields: {
            array: {
              title: '高级选项',
              type: 'object',
              array: true,
              props: {
                title: '高级选项',
                class: 'm-t'
              },
              arrayProps: {
                deleteBtnProps: {
                  width: '100px'
                }
              },
              fields: {
                $grid: {
                  type: 'grid',
                  layout: [8, 8, 8],
                  props: {
                    gutter: 20
                  },
                  fields: {
                    a: {
                      type: 'string'
                    },
                    b: {
                      type: 'string'
                    },
                    c: {
                      type: 'string'
                    }
                  }
                }
              }
            } as SchemaFormField
          }
        }
      };
    }
  };
</script>