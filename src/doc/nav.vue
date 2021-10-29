<template>
  <a-menu>
    <a-menu-item
key="introduction"
                 @click="to('readme')">
什么是VSchemaForm
    </a-menu-item>
    <a-menu-item
key="install"
                 @click="to('install')">
安装使用
    </a-menu-item>
    <a-menu-item
key="apis"
                 @click="to('api')">
接口说明
    </a-menu-item>
    <a-menu-item-group title="功能">
      <a-menu-item
key="types"
                   @click="to('types')">
内置类型
      </a-menu-item>
      <a-menu-item
key="effects"
                   @click="to('effects')">
副作用函数
      </a-menu-item>
      <a-menu-item
key="destruct"
                   @click="to('destruct')">
解构数据
      </a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>
<script lang="ts">


import {useRouter} from 'vue-router';

export default {
  name: 'DemoNav',
  setup() {
    const router = useRouter();
    return {
      to(path: string) {
        return router.push('/doc/' + path);
      }
    };
  }
};

</script>
