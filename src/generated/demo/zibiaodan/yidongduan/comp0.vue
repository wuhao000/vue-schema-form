
<template>
  <a-layout>
    <a-layout-content>
      <v-schema-form
          :props="props"
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
  import {getSubFormDefinition, getSubFormValue} from '../../../../views/demo/utils/utils';
  import {computed} from 'vue';
  import {registerAntdMobile} from '../../../../schema-form';

  registerAntdMobile();
  export default {
    name: "Demo",
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
