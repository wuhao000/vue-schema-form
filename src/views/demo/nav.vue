<template>
  <a-menu
      :open-keys="openKeys"
      mode="inline"
      @open-change="onOpenChange">
    <a-sub-menu
        v-for="(items, key) in groups"
        :key="key"
        :title="key">
      <a-menu-item
          v-for="item in items"
          :key="item.path"
          @click="to(item.path)">
        {{ item.meta && item.meta.name }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';
  import demoRoutes from '../../router/demo';

  export default {
    name: 'DemoNav',
    setup() {
      const router = useRouter();
      const openKeys = ref([]);
      const groups: any = {};
      demoRoutes.forEach(route => {
        const key = route.meta && route.meta.tag as string || '其他';
        groups[key] = groups[key] || [];
        groups[key].push(route);
      });
      return {
        openKeys,
        groups,
        onOpenChange(keys) {
          const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1);
          if (Object.keys(groups).indexOf(latestOpenKey) === -1) {
            openKeys.value = keys;
          } else {
            openKeys.value = latestOpenKey ? [latestOpenKey] : [];
          }
        },
        to(path: string) {
          return router.push('/demo/' + path);
        }
      };
    }
  };
</script>
