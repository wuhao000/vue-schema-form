<template>
  <span v-if="value && options">
    <span v-if="hasVNodeLabels">{{ labels }}</span>
    <span v-else>{{ labels.join('、') }}</span>
  </span>
  <span v-else></span>
</template>

<script setup lang="ts">
import { computed, isVNode } from 'vue';
import { getOptionProperty } from '../utils/utils';

const props = defineProps({
  field: Object,
  value: [String, Number, Array, Object],
  options: Array
});

const valueProperty = computed(() => props.field.props.valueProperty || 'value');
const labelProperty = computed(() => props.field.props.labelProperty || 'label');
const options = computed(() => props.options || props.field.options);

const selected = computed(() => {
  if (!props.value || !options.value) return [];
  
  if (props.field.array) {
    return options.value.filter(it => {
      const val = props.value as Array<any>;
      return val.includes(getOptionProperty(it, valueProperty.value)) || val.includes(it);
    });
  } else {
    return options.value.filter(it => 
      props.value === getOptionProperty(it, valueProperty.value) || 
      props.value === it
    );
  }
});

const labels = computed(() => 
  selected.value.map(it => getOptionProperty(it, labelProperty.value))
);

const hasVNodeLabels = computed(() => 
  labels.value.some(it => isVNode(it))
);
</script> 