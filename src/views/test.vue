<template>
  <div>
    {{value}}
  </div>
  <v-schema-form
      v-model:value="value"
      :context="ctx"/>
</template>
<script lang="tsx" setup>
  import {ref} from 'vue';
  import {defineSchemaForm, registerAntd} from '../schema-form';
  import ShowValue from './show-value.vue';

  registerAntd();

  const value = ref({
    title: ''
  });
  const ctx = defineSchemaForm({
    fields: {
      title: {
        type: 'string',
        title: '标题'
      },
      'b.aj': {
        type: 'string',
        title: '子标题'
      },
      showValue: {
        type: 'string',
        title: '小标题',
        depends: () => {
          return value.value.title === 'aaa';
        }
      },
      showValue2: {
        type: 'string',
        title: '小标题2',
        depends: value => {
          if (value.title === 'a') {
            return value.b.aj === 'bbb'
          }
          return false;
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
        },
        fields: {
          $a: {
            type: 'text',
            title: 'a'
          }
        }
      }
    }
  });
</script>
