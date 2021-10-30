<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form
          v-model:value="options"
          :platform="platform"
          :schema="optionFormDefinition"
      />
      <v-schema-form
          v-model:value="value"
          :disabled="options.disabled"
          :editable="!options.displayMode"
          :loading="options.loading"
          :platform="platform"
          :props="props"
          :readonly="options.readonly"
          :schema="definition"
          class="demo-form"
          @cancel="onCancel"
          @ok="onOk"
          @reset="onReset"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import {baseDemoProps, useBaseDemo} from '../demo/base';

  export default defineComponent({
    name: 'Demo',
    props: baseDemoProps,
    setup(props) {
      const {definition, value, options, onOk, optionFormDefinition, onReset, onCancel} = useBaseDemo();
      return {
        definition, onOk, onCancel, onReset, optionFormDefinition, options, value
      };
    }
  });
</script>
