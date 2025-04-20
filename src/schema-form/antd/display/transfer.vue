<template>
  <span v-if="value && value.length > 0">{{ displayText }}</span>
  <span v-else>{{ emptyText }}</span>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { getDefaultEmptyText } from '../../';

defineOptions({
  name: 'TransferDisplay'
});

const props = defineProps({
  value: Array as PropType<Array<any>>,
  dataSource: {
    type: Array as PropType<Array<any>>, 
    default: () => ([])
  }
});

const emptyText = computed(() => getDefaultEmptyText());

const displayText = computed(() => {
  if (!props.value || props.value.length === 0) {
    return emptyText.value;
  }
  return props.dataSource
    .filter(it => props.value.includes(it.key))
    .map(it => it.title)
    .join('、');
});
</script> 