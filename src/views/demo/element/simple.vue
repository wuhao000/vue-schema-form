<template>
  <simple-edit-demo
      platform="desktop"
      :init="register"/>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import SimpleEditDemo from '@/views/demo/common/simple.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit',
    components: {SimpleEditDemo}
  })
  export default class DesktopEdit extends Vue {

    public register() {
      SchemaForm.registerElement();
    }

  }
</script>
