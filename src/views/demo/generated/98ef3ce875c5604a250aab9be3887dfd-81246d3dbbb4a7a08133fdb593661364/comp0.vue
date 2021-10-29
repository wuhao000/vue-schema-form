<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
</template>
<script lang="ts">
import SimpleEditDemo from '../../common/simple.vue';
import {registerAntd} from '../../../../schema-form/antd';

export default {
  components: {
    SimpleEditDemo
  },
  setup() {
    return {
      register: () => {
        registerAntd();
      }
    }
  }
};
</script>