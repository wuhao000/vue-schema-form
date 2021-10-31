<template>
  <div>
    <v-schema-form :schema="schema"/>
  </div>
</template>
<script lang="ts">
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default {
    name: 'GridLayoutDemo',
    data() {
      return {
        schema: {
          props: {
            labelPosition: 'left'
          },
          fields: {
            $grid: {
              title: '高级选项',
              type: 'grid',
              layout: [12, {
                span: 10,
                push: 2
              }, 6, 12, 6],
              props: {
                gutter: 20
              },
              fields: {
                other: {
                  title: '其他0',
                  type: 'string'
                },
                other2: {
                  title: '其他2',
                  type: 'string'
                },
                other3: {
                  title: '其他2',
                  type: 'string'
                },
                other4: {
                  title: '其他2',
                  type: 'string'
                },
                other5: {
                  title: '其他2',
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
