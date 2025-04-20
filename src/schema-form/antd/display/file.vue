<template>
  <span v-if="value">文件</span>
  <span v-else>{{ emptyText }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getDefaultEmptyText } from '../../';

defineOptions({
  name: 'FileDisplay'
});

const props = defineProps({
  value: {
    type: [Object, Array, String]
  }
});

const emptyText = computed(() => getDefaultEmptyText());
</script> 