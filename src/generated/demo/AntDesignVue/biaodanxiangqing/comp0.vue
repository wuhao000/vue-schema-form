
<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form
          :editable="false"
          :schema="definition"
          :value="value"
          class="demo-form"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
  import {registerAntd} from '../../../../schema-form';
  import {useBaseDemo} from '../../../../views/demo/base';
  
  registerAntd();
  const {definition, value} = useBaseDemo();
</script>
