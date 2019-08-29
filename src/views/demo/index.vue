<template>
  <router-view/>
</template>
<script lang="tsx">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DemoIndex'
  })
  export default class DemoIndex extends Vue {
  }
</script>
