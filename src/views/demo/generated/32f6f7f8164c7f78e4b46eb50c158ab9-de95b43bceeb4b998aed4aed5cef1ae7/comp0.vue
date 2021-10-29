<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form :props="props"
                     :schema="definition"
                     :value="value2"
                     class="demo-form"
                     @cancel="onCancel"
                     @ok="onOk"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
import {getSubFormDefinition} from '../utils';
import {computed} from 'vue';


export default {
  setup() {
    return {
      definition: computed(() => {
        return getSubFormDefinition();
      })
    };
  }
};
</script>