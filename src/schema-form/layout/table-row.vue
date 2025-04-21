<template>
  <div
      class="table-row"
      @mouseenter="$emit('show-add', $el)"
      @mouseleave="$emit('hide-add')"
  >
    <slot />
    <div class="table-cell">
      <div
          v-if="showMoveDown"
          class="circle-btn"
          @click="$emit('move-down')">
        <component :is="DownIcon" />
        <span class="op-name" />
      </div>
      <div
          v-if="showMoveUp"
          class="circle-btn"
          @click="$emit('move-up')">
        <component :is="UpIcon" />
        <span class="op-name" />
      </div>
      <div
          class="circle-btn text-danger"
          @click="$emit('remove')">
        <component :is="DeleteIcon" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useBaseFieldComponent } from '../internal/field-based-component';
  import { LibComponents } from '../utils/utils';

  defineOptions({
    name: 'TableRow'
  });

  const props = defineProps({
    arrayIndex: Number,
    showMoveUp: Boolean,
    showMoveDown: Boolean,
    showRemove: {
      type: Boolean,
      default: true
    }
  });

  const emit = defineEmits(['add', 'remove', 'move-up', 'move-down', 'show-add', 'hide-add']);

  const { store } = useBaseFieldComponent(props, { emit });

  const UpIcon = computed(() => LibComponents.icons[store.platform].up);
  const DownIcon = computed(() => LibComponents.icons[store.platform].down);
  const DeleteIcon = computed(() => LibComponents.icons[store.platform].delete);
</script> 
