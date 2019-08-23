<template>
  <ae-layout theme="light">
    <ae-layout-header></ae-layout-header>
    <ae-layout>
      <ae-layout-sider style="margin:10px;"
                       width="200px">
        <a-menu>
          <a-menu-item>安装</a-menu-item>
          <a-menu-item @click="to('/doc')">使用</a-menu-item>
          <a-menu-item-group title="Element UI">
            <a-menu-item key="element-desktop-edit"
                         @click="to('/demo/element/edit')">编辑模式
            </a-menu-item>
            <a-menu-item key="element-desktop-detail"
                         @click="$router.push('/demo/element/display')">详情模式
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Ant Design Vue">
            <a-menu-item key="desktop-edit"
                         @click="to('/demo/desktop/edit')">编辑模式
            </a-menu-item>
            <a-menu-item key="desktop-detail"
                         @click="$router.push('/demo/desktop/display')">详情模式
            </a-menu-item>
            <a-menu-item key="desktop-validate"
                         @click="$router.push('/demo/desktop/validate')">表单校验
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="移动端示例">
            <a-menu-item key="mobile-edit"
                         @click="$router.push('/demo/mobile/edit')">编辑模式
            </a-menu-item>
            <a-menu-item key="mobile-display"
                         @click="$router.push('/demo/mobile/display')">详情模式
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

    public to(path: string) {
      return this.$router.push(path);
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
