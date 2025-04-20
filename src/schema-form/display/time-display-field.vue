<template>
  <span v-if="isRangeType && value">
    <span>{{ formatTime(value[0] as any, format) }}</span>
    <span> {{ separator || '~' }} </span>
    <span>{{ formatTime(value[1] as any, format) }}</span>
  </span>
  <span v-else>
    {{ formatTime(value as any, format) }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatTime } from '../utils/time';

const props = defineProps({
  value: [String, Number, Object, Array, Date],
  definition: Object,
  format: String,
  separator: String
});

const format = computed(() => {
  let fmt = props.format || 'YYYY-MM-DD HH:mm:ss';
  
  if (props.definition.type === 'date') {
    fmt = 'YYYY-MM-DD';
  } else if (props.definition.type === 'month') {
    fmt = 'YYYY-MM';
  } else if (props.definition.type === 'year') {
    fmt = 'YYYY';
  } else if (props.definition.type === 'daterange') {
    fmt = 'YYYY-MM-DD';
  } else if (props.definition.type === 'time') {
    fmt = 'HH:mm:ss';
  }
  
  return fmt;
});

const isRangeType = computed(() => 
  ['daterange', 'timerange'].includes(props.definition.type)
);
</script> 