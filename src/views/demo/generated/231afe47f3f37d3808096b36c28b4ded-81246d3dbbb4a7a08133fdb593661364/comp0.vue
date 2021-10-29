<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
</template>
<script lang="ts">
  import {registerElement} from '../../../../element';
  import SimpleEditDemo from '../../common/simple.vue';

  export default {
    name: 'Demo',
    components: {
      SimpleEditDemo
    },
    setup() {
      return {
        register: () => {
          registerElement();
        }
      };
    }
  };
</script>
