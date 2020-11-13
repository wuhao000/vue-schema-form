<template>
  <a-layout class="bg-white" style="padding-bottom: 20px;">
    <a-layout-content>
      <a-layout-content class="demo-wrapper">
        <code v-html="md"
              class="markdown-body"></code>
      </a-layout-content>
      
    </a-layout-content>
  </a-layout>
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
