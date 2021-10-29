<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form :editable="false"
                     platform="mobile"
                     :props="props"
                     :schema="definition"
                     :value="value"
                     class="demo-form"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
// import {registerVant} from 'v-schema-form-vant';
import {useBaseDemo} from '../../base';
import {defineComponent} from 'vue';

// registerVant();
export default defineComponent({
  setup(props, ctx) {
    const {definition, value} = useBaseDemo(props, ctx);
    return {definition, value};
  }
});
</script>