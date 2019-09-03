<template>
  <a-menu>
    <a-menu-item @click="to('readme')">安装</a-menu-item>
    <a-menu-item @click="to('usage')">使用</a-menu-item>
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
