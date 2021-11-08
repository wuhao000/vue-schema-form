<template>
  <div>1</div>
</template>
<script lang="tsx" setup>
  import {SchemaFormField} from '../../types';
  import ShowValue from './show-value.vue';

  const schema: SchemaFormField = {
    fields: [
      {
        type: () => <ShowValue/>
      },
      {
        type: 'grid',
        layout: [12, [12, 13]],
        xProps: {
          colClass: ''
        }
      },
      {
        type: 'steps',
        layout: [1, 2],
        xProps: {
          titles: ['1']
        }
      }
    ]
  };
</script>
