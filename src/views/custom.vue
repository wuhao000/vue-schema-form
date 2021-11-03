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
      }
    ]
  };
</script>
