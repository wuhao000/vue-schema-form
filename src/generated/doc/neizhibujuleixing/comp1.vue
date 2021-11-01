<template>
  <div>
    <v-schema-form
        :schema="schema"
        :effects="effects"
        @ok="onOk"
        @cancel="onCancel"/>
  </div>
</template>
<script lang="ts">
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default {
    name: 'StepsLayoutDemo',
    setup() {
      return {
        onCancel: () => {
          console.log('cancel');
        },
        onOk: () => {
          console.log('ok');
        },
        schema: {
          props: {
            labelWidth: 120,
            labelPosition: 'left'
          },
          fields: [{
            type: 'steps',
            id: 'steps',
            layout: [1, 1, 1],
            props: {
              titles: ['基本信息', '高级设置', '校验规则']
            },
            fields: [
              {
                property: 'name',
                title: '名称',
                type: 'string'
              },
              {
                property: 'date',
                title: '日期',
                type: 'date'
              },
              {
                property: 'integer',
                title: '数值',
                type: 'integer'
              }
            ]
          }]
        }
      };
    }
  };
</script>
