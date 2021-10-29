<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
</template>
<script lang="ts">
  import {registerAntd} from '../../../../schema-form/antd';
  import SimpleEditDemo from '../../common/simple.vue';

  export default {
    name: 'Demo',
    components: {
      SimpleEditDemo
    },
    setup() {
      return {
        register: () => {
          registerAntd();
        }
      };
    }
  };
</script>