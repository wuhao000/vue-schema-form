
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
  import {defineProps} from 'vue';
  import {registerElement} from '../../../../element';
  import {useBaseDemo} from '../../../../views/demo/base';

  registerElement();

  const props = defineProps();
  const {definition, value} = useBaseDemo();
</script>
