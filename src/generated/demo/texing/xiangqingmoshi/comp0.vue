<template>
  <div>
    <v-schema-form
        v-model:value="value"
        :editable="false"
        :schema="schema"/>
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
            title: '名称'
          },
          select: {
            type: 'select',
            title: '单选',
            enum: [
              {label: '选项1', value: '1'},
              {label: '选项2', value: '2'},
            ]
          }
        }
      };
      const value = ref({
        name: 'abc',
        select: '2'
      });

      return {
        schema,
        value,
      };
    }
  });
</script>
