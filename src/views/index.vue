<template>
  <ae-layout theme="light">
    <ae-layout-header></ae-layout-header>
    <ae-layout>
      <ae-layout-sider style="margin:10px;"
                       width="200px">
        <a-menu>
          <a-menu-item>安装</a-menu-item>
          <a-menu-item @click="to('/doc')">使用</a-menu-item>
          <a-menu-item-group v-for="(items, key) in groups"
                             :key="key"
                             :title="key">
            <a-menu-item v-for="item in items"
                         :key="item.path"
                         @click="to(item.path)">{{item.meta && item.meta.name}}
            </a-menu-item>
          </a-menu-item-group>
        </a-menu>
      </ae-layout-sider>
      <ae-layout-content style="margin: 10px 10px 10px 0;">
        <router-view/>
      </ae-layout-content>
    </ae-layout>
    <ae-layout-footer></ae-layout-footer>
  </ae-layout>
</template>
<script lang="ts">
  import {demoRoutes} from '@/router';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import HelloWorld from '../components/HelloWorld.vue';

  const options = [{
    label: '选项1',
    value: 1
  }, {
    label: '选项2',
    value: 2
  }, {
    label: '选项3',
    value: 3
  }];
  @Component({
    name: 'App',
    components: {
      HelloWorld
    }
  })
  export default class App extends Vue {
    private groups: object = {};

    public created() {
      const groups = {};
      demoRoutes.forEach(route => {
        const key = route.meta && route.meta.tag || '其他';
        groups[key] = groups[key] || [];
        groups[key].push(route);
      });
      this.groups = groups;
    }

    public to(path: string) {
      return this.$router.push('/demo/' + path);
    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 800px;
    margin: 60px auto 0;
  }
</style>
