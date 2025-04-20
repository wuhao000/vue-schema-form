<template>
  <span v-if="value">{{ value[0] ?? config.defaultEmptyText }} - {{ value[1] ?? config.defaultEmptyText }}</span>
  <span v-else>{{ config.defaultEmptyText }}</span>
</template>

<script setup lang="ts">
import { config } from '../config';

defineOptions({
  name: 'RangeDisplayField'
});

defineProps({
  value: Array
});
</script> 