<template>
  <d-url v-model:value="value"/>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {DUrl, registerAntd} from '../../../schema-form';

  registerAntd();
  const value = ref('https://www')
</script>
