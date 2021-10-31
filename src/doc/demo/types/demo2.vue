<template>
  <v-schema-form
      :schema="schema"
      :value="value"/>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import {registerAntd} from '../../../schema-form/antd/';

  registerAntd();
  export default defineComponent({
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
    }
  });
</script>
