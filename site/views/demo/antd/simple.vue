<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
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
      window.SchemaForm.registerAntd();
    }

  }
</script>
