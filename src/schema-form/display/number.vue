<template>
  <span v-if="extra">
    <a>{{ value }}</a>
    <span class="m-l-sm">{{ extra }}</span>
  </span>
  <a v-else>{{ value }}</a>
</template>

<script setup lang="ts">
defineOptions({
  name: 'NumberDisplay'
});

const props = defineProps({
  value: [Number, String, Object],
  extra: [String, Object]
});
</script> 