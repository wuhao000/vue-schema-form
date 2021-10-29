<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <a-row :gutter="40">
        <a-col :span="12">
          <v-schema-form
v-model:value="options"
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
                         @reset="onReset"></v-schema-form>
        </a-col>
        <a-col :span="12">
          <show-value
:modal="false"
:value="value"/>
        </a-col>
      </a-row>
      <show-value :value="value"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import {baseDemoProps, useBaseDemo} from '../base';
  import ShowValue from '../show-value';

  export default defineComponent({
    name: 'Demo',
    components: {ShowValue},
    props: baseDemoProps,
    setup(props, ctx) {
      const {definition, value, options, onOk, optionFormDefinition, onReset, onCancel} = useBaseDemo(props);
      return {
        definition, onOk, onCancel, onReset, optionFormDefinition, options, value
      };
    }
  });
</script>
