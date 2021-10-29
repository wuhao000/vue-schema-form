
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
<script lang="ts">
  import {defineProps} from 'vue';
  import {registerAntd} from '../../../../schema-form';
  import {useBaseDemo} from '../../base';

  registerAntd();
  const props = defineProps();
  const {definition, value} = useBaseDemo(props);
</script>
