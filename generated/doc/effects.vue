<template>
  <a-layout class="bg-white" style="padding-bottom: 20px;">
    <a-layout-content>
      <a-layout-content class="demo-wrapper">
        <code v-html="md"
              class="markdown-body"></code>
      </a-layout-content>
      <code-wrapper :code="code0" :md="md0">
        <demo0/>
      </code-wrapper>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import CodeWrapper from '@/components/code-wrapper.vue';
  import demo0 from '@/doc/demo/effects/effects1.vue';
  import md0 from '@/doc/demo/effects/effects1.md';
  import md from '@/doc/effects.md';
  import code0 from './demo/effects/effects1.vue.txt';

  export default {
    name: 'DocEffects',
    components: {CodeWrapper, demo0},
    data() {
      return {md, code0, md0};
    }
  };
</script>
