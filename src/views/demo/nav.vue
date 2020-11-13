<template>
  <a-menu mode="inline"
          :openKeys="openKeys"
          @openChange="onOpenChange">
    <a-sub-menu v-for="(items, key) in groups"
                :key="key"
                :title="key">
      <a-menu-item v-for="item in items"
                   :key="item.path"
                   @click="to(item.path)">{{item.meta && item.meta.name}}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
  import demoRoutes from '@/router/demo';
  import {getCurrentInstance, ref} from 'vue';

  export default {
    name: 'DemoNav',
    setup() {
      const groups = {};
      const openKeys = ref([]);
      demoRoutes.forEach(route => {
        const key = route.meta && route.meta.tag || '其他';
        groups[key] = groups[key] || [];
        groups[key].push(route);
      });
      const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1);
        if (Object.keys(groups).indexOf(latestOpenKey) === -1) {
          openKeys.value = keys;
        } else {
          openKeys.value = latestOpenKey ? [latestOpenKey] : [];
        }
      };
      const {ctx} = getCurrentInstance();
      const to = (path: string) => {
        return (ctx.$router as any).push('/demo/' + path);
      };
      return {groups, onOpenChange, to};
    }
  };
</script>
