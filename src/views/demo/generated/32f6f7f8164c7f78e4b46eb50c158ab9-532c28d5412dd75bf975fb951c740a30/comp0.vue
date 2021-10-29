<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form :props="props"
                     :schema="definition"
                     :value="value2"
                     class="demo-form"
                     platform="mobile"
                     @cancel="onCancel"
                     @ok="onOk"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
// import {registerVant} from 'v-schema-form-vant';
import {getSubFormDefinition, getSubFormValue} from '../utils';
import {computed} from 'vue';

// registerVant();
export default {
  setup() {
    return {
      definition: computed(() => {
        return getSubFormDefinition();
      }),
      value2: getSubFormValue()
    };
  }
};
</script>