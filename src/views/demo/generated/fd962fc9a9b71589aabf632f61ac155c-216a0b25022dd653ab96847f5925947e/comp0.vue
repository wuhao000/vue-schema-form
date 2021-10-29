<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form :editable="false"
                     :schema="definition"
                     :value="value"
                     class="demo-form"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import {registerAntd} from '../../../../schema-form';
  import {useBaseDemo} from '../../base';

  registerAntd();
  export default defineComponent({
    setup(props, ctx) {
      const {definition, value} = useBaseDemo(props, ctx);
      return {definition, value};
    }
  });
</script>
