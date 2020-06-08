<template>
  <div>
    <simple-edit-demo :init="register"/>
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import SimpleEditDemo from '@/views/demo/common/simple.vue';
  import {Options, Vue} from 'vue-class-component';

  @Options({
    name: 'DesktopEdit',
    components: {SimpleEditDemo}
  })
  export default class DesktopEdit extends Vue {

    public register() {
      SchemaForm.registerAntd();
    }

  }
</script>
