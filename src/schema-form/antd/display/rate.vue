<template>
  <a-rate
      :value="value"
      :tooltips="tooltips"
      :disabled="true"
  />
</template>
<script setup lang="ts">

  defineOptions({
    name: 'RateDisplay',
    inheritAttrs: false
  });

  defineProps({
    value: {
      type: Number
    },
    tooltips: {
      type: Array
    }
  });
</script> 
