<template>
  <a-menu>
    <a-menu-item @click="to('readme')">什么是VSchemaForm</a-menu-item>
    <a-menu-item @click="to('install')">安装使用</a-menu-item>
    <a-menu-item key="types" @click="to('api')">接口说明</a-menu-item>
    <a-menu-item-group title="功能">
      <a-menu-item key="types" @click="to('types')">内置类型</a-menu-item>
      <a-menu-item key="effects" @click="to('effects')">副作用函数</a-menu-item>
      <a-menu-item key="destruct" @click="to('destruct')">解构数据</a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DemoNav'
  })
  export default class DemoNav extends Vue {
    public to(path: string) {
      return this.$router.push('/doc/' + path);
    }
  }
</script>
