
<template>
  <a-layout>
    <a-layout-content>
      <v-schema-form
          :props="props"
          :schema="definition"
          :value="value2"
          class="demo-form"
          @cancel="onCancel"
          @ok="onOk"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
import {getSubFormDefinition} from '../../../../views/demo/utils/utils';
import {computed} from 'vue';
import {registerAntd} from '../../../../schema-form';

registerAntd();
export default {
  name: "Demo",
  setup() {
    return {
      definition: computed(() => {
        return getSubFormDefinition();
      })
    };
  }
};
</script>
