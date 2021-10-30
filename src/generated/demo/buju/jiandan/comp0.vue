
<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form
          v-model:value="value"
          :props="props"
          :schema="schema"
          class="demo-form"
          @ok="() => {}"
          @reset="() => {}"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {registerAntd} from '../../../../schema-form';

  registerAntd();
  export default {
    name: "Demo",
    setup() {
      return {
        props: {
          labelCol: 8,
          wrapperCol: 6
        },
        schema: {
          fields: {
            aaa: {
              type: 'string',
              title: '字段1'
            },
            bbb: {
              type: 'number',
              title: '字段2'
            },
            ccc: {
              type: 'date',
              title: '字段3'
            }
          }
        },
        value: {}
      };
    }
  };
</script>
