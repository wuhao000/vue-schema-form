<template>
  <ae-layout class="bg-white" style="padding-bottom: 20px;">
    <ae-layout-content>
      <ae-layout-content class="demo-wrapper">
        <code v-html="md"
              class="markdown-body"></code>
      </ae-layout-content>
      
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import CodeWrapper from '@/components/code-wrapper.vue';
  
  import md from '@/doc/change-log.md';
  

  export default {
    name: 'DocEffects',
    components: {CodeWrapper},
    data() {
      return {md};
    }
  };
</script>
