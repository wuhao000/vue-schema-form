<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
</template>
<script lang="ts">
  import {registerAntdMobile} from '../../../../schema-form/antdm/register';
  import SimpleEditDemo from '../../common/simple.vue';

  export default {
    components: {
      SimpleEditDemo
    },
    setup() {
      return {
        register: () => {
          registerAntdMobile();
        }
      };
    }
  };
</script>