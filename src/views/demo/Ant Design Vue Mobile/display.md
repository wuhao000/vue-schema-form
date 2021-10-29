```vue
<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form :editable="false"
                     :props="props"
                     :schema="definition"
                     :value="value"
                     class="demo-form"
                     platform="mobile"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {registerAntdMobile} from '../../../schema-form/antdm/register';
  import {defineComponent} from 'vue';
  import {useBaseDemo} from '../base';

  registerAntdMobile();
  export default defineComponent({
    setup(props, ctx) {
      const {definition, value} = useBaseDemo(props, ctx);
      return {definition, value};
    }
  });
</script>

```
