<template>
  <ae-layout theme="light">
    <ae-layout-header style="background: white;">
      <banner/>
    </ae-layout-header>
    <ae-layout>
      <ae-layout-sider style="margin: 10px;overflow:auto;"
                       width="200px">
        <router-view name="nav"/>
      </ae-layout-sider>
      <ae-layout-content style="margin: 10px 10px 10px 0;">
        <router-view/>
      </ae-layout-content>
    </ae-layout>
    <ae-layout-footer></ae-layout-footer>
  </ae-layout>
</template>
<script lang="ts">
  import Banner from '@/views/banner.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'App',
    components: {Banner}
  })
  export default class App extends Vue {

  }
</script>
<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 800px;
    margin: 60px auto 0;
  }
  .wrapper {
    padding: 15px;
  }
  .bg-white {
    background: white;
  }
</style>
