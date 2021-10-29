
<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form
          :editable="false"
          :props="props"
          :schema="definition"
          :value="value2"
          class="demo-form"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {registerAntd} from '../../../../schema-form/antd';
  import {getSubFormDefinition, getSubFormValue} from '../../utils/utils';
  import {ref} from 'vue';

  registerAntd();
  export default {
    name: 'Demo',
    setup() {
      const value2 = ref(getSubFormValue());
      return {
        definition: getSubFormDefinition(),
        value2
      };
    }
  };
</script>