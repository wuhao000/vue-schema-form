<template>
  <router-view/>
</template>
<script lang="tsx">
  import {Options, Vue} from 'vue-class-component';

  @Options({
    name: 'DemoIndex'
  })
  export default class DemoIndex extends Vue {
  }
</script>
