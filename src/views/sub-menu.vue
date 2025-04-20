<template>
  <template
    v-for="(item, key) in menus"
    :key="item.path">
    <a-sub-menu
      v-if="item.children && item.children.length"
      :title="item.name">
      {{ title }}
      <sub-menu
        :menus="item.children" />
    </a-sub-menu>
    <a-menu-item
      v-else
      @click="to(item.path)">
      {{ item.name }}
    </a-menu-item>
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SubMenu',
  props: {
    menus: Array,
    title: [String, Object]
  },
  setup() {
    const router = useRouter();
    return {
      to(path: string) {
        return router.push(path);
      }
    };
  }
});
</script>
