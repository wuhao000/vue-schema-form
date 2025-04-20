<template>
  <pre v-html="value"></pre>
</template>

<script setup lang="ts">
defineProps({
  value: [String, Object]
});
</script> 