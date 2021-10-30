
<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
</template>
<script lang="ts" setup>
  import {registerAntd} from '../../../../schema-form';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../../../../views/common/simple.vue';

  registerAntd();
</script>
