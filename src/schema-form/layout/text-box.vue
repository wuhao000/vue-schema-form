<template>
  <div class="vf-layout-text-box">
    <template
        v-for="(item, index) in contentItems"
        :key="index">
      <span
          v-if="item.isText"
          class="vf-layout-text-box--text">{{ item.content }}</span>
      <component
          v-else
          :is="item.content" />
    </template>
  </div>
</template>
<script setup lang="ts">
  import { computed, useSlots } from 'vue';
  import './text-box.less';

  defineOptions({
    name: 'TextBox'
  });

  const props = defineProps({
    layout: {
      type: String,
      required: true
    }
  });

  const slots = useSlots();

  const contentItems = computed(() => {
    const layout = props.layout;
    const result = [];
    const fields = slots.default ? slots.default() : [];
    const copyFields = [...fields];

    if (layout) {
      const split = layout.split('%s');
      split.forEach((item) => {
        if (item.length) {
          result.push({
            isText: true,
            content: item
          });
        }
        if (copyFields.length > 0) {
          result.push({
            isText: false,
            content: copyFields.shift()
          });
        }
      });
    }

    // 添加剩余的字段
    while (copyFields.length) {
      result.push({
        isText: false,
        content: copyFields.shift()
      });
    }

    return result;
  });
</script> 
