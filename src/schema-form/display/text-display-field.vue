<template>
  <pre>{{ value }}</pre>
</template>

<script setup lang="ts">
defineProps({
  value: [String, Number, Boolean, Object, Array]
});
</script> 