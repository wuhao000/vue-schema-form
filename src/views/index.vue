<template>
  <a-config-provider :locale="zh_CN">
    <router-view v-if="mobile"/>
    <a-layout
        v-else
        class="ant-pro-fixed-header ant-pro-fixed-sider root-layout"
        theme="light">
      <a-layout-header>
        <app-banner/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200px">
          <router-view name="nav"/>
        </a-layout-sider>
        <a-layout-content class="bg-white">
          <div style="height:100%;">
            <router-view/>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script lang="tsx" type="text/tsx">
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import {defineComponent, ref} from 'vue';
  import AppBanner from './banner.vue';

  export default defineComponent({
    name: 'HomePage',
    components: {
      AppBanner
    },
    setup() {
      const mobile = ref(false);
      if (window.location.pathname.indexOf('/mobile') === 0) {
        mobile.value = true;
      }
      return {
        zh_CN, mobile
      };
    }
  });
</script>
<style lang="less">
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .wrapper {
    padding: 15px;
  }

  .bg-white {
    background: white;
  }

  .ant-pro-fixed-header {
    & > .ant-layout-header {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 2;
    }

    & > .ant-layout {
      margin-top: 60px;
    }
  }

  .ant-pro-fixed-sider {
    height: 100%;
  }

  .ant-layout-sider {
    background: white;
  }

  .ant-layout {
    &.root-layout {
      & > .ant-layout-header {
        background: white;
      }

      & > .ant-layout {
        & > .ant-layout-sider {
          margin: 10px;
          overflow: auto;
        }

        & > .ant-layout-content {
          margin: 10px 10px 10px 0;

          & > div {
            background: white;
            padding: 10px 15px;
          }
        }
      }
    }
  }
</style>
