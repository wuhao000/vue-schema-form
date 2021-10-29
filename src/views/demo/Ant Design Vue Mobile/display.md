```vue

<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form
          :editable="false"
          :props="props"
          :schema="definition"
          :value="value"
          class="demo-form"
          platform="mobile"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
  import {registerAntdMobile} from '../../../schema-form/antdm/register';
  import {defineProps, defineEmits} from 'vue';
  import {useBaseDemo} from '../base';
  
  registerAntdMobile();
  const props = defineProps();
  const emits = defineEmits();
  const {definition, value} = useBaseDemo(props);
</script>

```
