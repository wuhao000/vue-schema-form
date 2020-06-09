<template>
  <a-layout theme="light">
    <a-layout-header style="background: white;">
      <banner/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200px">
        <router-view name="nav"/>
      </a-layout-sider>
      <a-layout-content id="main-content">
        <router-view/>
      </a-layout-content>
    </a-layout>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
  import Banner from '@/views/banner.vue';
  import {Options, Vue} from 'vue-class-component';

  @Options({
    name: 'App',
    components: {Banner}
  })
  export default class App extends Vue {

  }
</script>
<style lang="less">
  #app {
    font-family: 'Avenir/*', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 1200px;
    margin: 0 auto;
    height: 100%;
  }

  #main-content {
    padding: 20px;
  }

  .wrapper {
    padding: 15px;
  }

  .bg-white {
    background: white;
  }
</style>
