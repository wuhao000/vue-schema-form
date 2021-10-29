<template>
  <div>
    <v-schema-form :schema="schema"/>
  </div>
</template>
<script lang="ts">
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
            name: {
              title: '名称',
              type: 'string'
            },
            $card: {
              title: '高级选项',
              type: 'card',
              props: {
                title: '高级选项'
              },
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