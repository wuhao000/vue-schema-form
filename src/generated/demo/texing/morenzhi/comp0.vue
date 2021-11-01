
<template>
  <div>
    <v-schema-form
        v-model:value="value"
        :schema="schema"/>
    <show-value :value="value"/>
  </div>
</template>
<script lang="ts">
  import {defineComponent, reactive, ref} from 'vue';
  import {SchemaFormField} from '../../../../../types';
  import {FieldTypes, registerAntd} from '../../../../schema-form';

  registerAntd();

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = {
        props: {
          labelWidth: 140
        },
        fields: {
          name: {
            type: FieldTypes.String,
            title: '名称',
            default: 'abc'
          },
          select: {
            type: 'select',
            title: '单选',
            enum: [
              {label: '选项1', value: '1'},
              {label: '选项2', value: '2'},
            ],
            default: '2'
          },
          names: {
            type: 'string',
            title: '多个名称',
            array: true,
            default: ['a', 'b']
          },
          b: {
            type: 'object',
            fields: {
              c: {
                type: FieldTypes.String,
                title: '子表单名称',
                default: 'aaa'
              }
            }
          }
        }
      };
      const value = reactive({});

      return {
        schema,
        value,
      };
    }
  });
</script>
