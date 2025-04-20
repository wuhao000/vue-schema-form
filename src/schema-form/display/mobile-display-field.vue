<template>
  <span>{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'DisplayField'
});

const props = defineProps({
  value: {
    type: [Object, String, Number, Boolean, Array]
  },
  title: {
    type: [String, Object]
  }
});

const displayValue = computed(() => {
  return props.value !== undefined && props.value !== null 
    ? props.value.toString() 
    : null;
});
</script> 