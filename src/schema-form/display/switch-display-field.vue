<template>
  <span v-if="value">{{ onLabel ?? '是' }}</span>
  <span v-else>{{ offLabel ?? '否' }}</span>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SwitchDisplay'
});

defineProps({
  value: Boolean,
  onLabel: [String, Object],
  offLabel: [String, Object]
});
</script> 