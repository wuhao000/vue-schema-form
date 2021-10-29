<template>
  <div class="header-content">
    <a
        class="logo-wrapper"
        href="/">
      <div class="logo">
        V SCHEMA FORM
      </div>
    </a>
    <a-menu
        :active-key="activeKey"
        class="top-nav"
        mode="horizontal">
      <a-menu-item
          key="doc"
          @click="$router.push('/doc/readme')">
        文档
      </a-menu-item>
      <a-menu-item
          key="demo"
          @click="$router.push('/demo')">
        场景示例
      </a-menu-item>
      <a-menu-item
          key="components"
          @click="$router.push('/components')">
        组件
      </a-menu-item>
      <a-menu-item
          key="changelog"
          @click="$router.push('/doc/changelog')">
        更新记录
      </a-menu-item>
      <a-menu-item @click="toGithub">
        GitHub
        <svg
            fill="none"
            height="1em"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            style="margin-left: 4px; font-size: 10px;"
            viewBox="0 0 24 24"
            width="1em"
            xmlns="http://www.w3.org/2000/svg">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line
              x1="10"
              x2="21"
              y1="14"
              y2="3"></line>
        </svg>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script lang="ts">
  import {computed} from 'vue';
  import {useRoute} from 'vue-router';

  export default {
    name: 'AppBanner',
    setup() {
      const route = useRoute();
      const activeKey = computed(() => {
        if (route.path === '/doc/changelog') {
          return 'changelog';
        }
        if (route.path) {
          return route.path.split('/').filter(it => it.length > 0)[0];
        }
        return 'doc';
      });
      return {
        activeKey,
        toGithub() {
          window.open('https://github.com/wuhao000/vue-schema-form');
        }
      };
    }
  };
</script>
<style lang="less" scoped>
  .header-content {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 60px;
    margin: 0 30px;
    background: white;

    .logo-wrapper {
      font-size: 20px;
      font-weight: 300;
      text-transform: uppercase;
      text-decoration: none;
    }

    .top-nav {
      height: 100%;

      & > li {
        height: 100%;
        width: 86px;
        line-height: 60px;
        font-size: 16px;
        text-align: center;
        padding: 0;
      }
    }
  }

  .ant-menu-item {
    &.ant-menu-item-active, &.ant-menu-item-selected {
      color: blue;
    }

    &.ant-menu-item-selected {
      border-bottom-width: 3px;
    }

    &.ant-menu-item-active:not(.ant-menu-item-selected) {
      &:hover {
        border-bottom: 0;
      }
    }
  }
</style>
