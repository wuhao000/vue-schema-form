<template>
  <m-list-item :title="title">
    <m-stepper v-bind="$attrs"
               slot="extra"
               :value="value"
               @input="onInput"></m-stepper>
  </m-list-item>
</template>
<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'StepperItem',
    props: {
      value: [Number, String],
      title: [String, Object]
    },
    methods: {
      onInput(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    }
  });
</script>
