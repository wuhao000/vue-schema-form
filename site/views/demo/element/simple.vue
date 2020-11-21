<template>
  <simple-edit-demo
      platform="desktop"
      :init="register"/>
</template>
<script lang="ts">
  import SimpleEditDemo from '../common/simple.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit',
    components: {SimpleEditDemo}
  })
  export default class DesktopEdit extends Vue {

    public register() {
      window.SchemaForm.registerElement();
    }

  }
</script>
