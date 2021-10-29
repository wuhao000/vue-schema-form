```vue

<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
</template>
<script lang="ts" setup>
  import {registerAntdMobile} from '../../../schema-form/antdm/register';
  // noinspection ES6UnusedImports
  import SimpleEditDemo from '../common/simple.vue';

  registerAntdMobile();

</script>
```
