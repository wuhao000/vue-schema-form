<template>
  <div>
    {{ value }}
  </div>
  <v-schema-form
      v-model:value="value"
      :context="ctx"/>
</template>
<script lang="tsx" setup>
  import {ref} from 'vue';
  import {defineSchemaForm, registerAntd} from '../schema-form';

  registerAntd();

  const value = ref({
    title: ''
  });
  const ctx = defineSchemaForm({
    fields: {
      title: {
        type: 'select',
        title: (v) => '标题' + v.title,
        enum: [
          {label: 'a', value: 'aaa'},
          {label: 'b', value: 'bbb'},
        ]
      },
      'b.aj': {
        type: 'select',
        title: '标题2',
        enum: (v) => {
          return [
            {label: 'c', value: 'ccc'},
            {label: 'd', value: 'ddd'},
          ];
        }
      },
      showValue: {
        type: 'string',
        title: '小标题',
        visible: () => {
          return value.value.title === 'aaa';
        }
      },
      showValue2: {
        type: 'string',
        title: '小标题2',
        visible: v => {
          if (v.title === 'aaa') {
            return v.b.aj === 'ccc';
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
