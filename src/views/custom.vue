<template>
  {{value}}
  <v-schema-form
      v-model:value="value"
      :schema="formDef.schema"
      :context="formDef.$"/>
</template>
<script lang="tsx" setup>
  import {ref} from 'vue';
  import {defineSchemaForm, registerAntd} from '../schema-form';
  import ShowValue from './show-value.vue';

  registerAntd();

  const value = ref({});
  const formDef = defineSchemaForm({
    fields: {
      title: {
        type: 'string',
        title: '标题'
      },
      showValue: {
        type: {
          component: () => <ShowValue value={value.value}/>,
          mode: 'layout'
        }
      },
      $grid: {
        type: 'grid',
        layout: [12, [12, 13]],
        xProps: {
          colClass: ''
        }
      },
      $steps: {
        type: 'steps',
        layout: [1, 2],
        xProps: {
          titles: ['1']
        }
      }
    }
  });
  formDef.$('title').onFieldCreateOrChange(v => {
    console.log(v);
  });
</script>
