<template>
  <span>{{ value }}</span>
</template>

<script setup lang="ts">
defineProps({
  value: [String, Number, Boolean, Object, Array]
});
</script> 