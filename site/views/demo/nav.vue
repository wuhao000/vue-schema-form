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
  import demoRoutes from '../../router/demo';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DemoNav'
  })
  export default class DemoNav extends Vue {
    private groups: object = {};
    public openKeys = [];

    public created() {
      const groups = {};
      demoRoutes.forEach(route => {
        const key = route.meta && route.meta.tag || '其他';
        groups[key] = groups[key] || [];
        groups[key].push(route);
      });
      this.groups = groups;
    }

    public onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (Object.keys(this.groups).indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }

    public to(path: string) {
      return this.$router.push('/demo/' + path);
    }

  }
</script>
