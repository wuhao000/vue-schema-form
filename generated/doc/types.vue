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
<code-wrapper :code="code1" :md="md1">
        <demo1/>
      </code-wrapper>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import CodeWrapper from '@/components/code-wrapper.vue';
  import demo0 from '@/doc/demo/types/demo1.vue';
  import md0 from '@/doc/demo/types/demo1.md';
  import demo1 from '@/doc/demo/types/demo2.vue';
  import md1 from '@/doc/demo/types/demo2.md';
  import md from '@/doc/types.md';
  import code0 from './demo/types/demo1.vue.txt';
  import code1 from './demo/types/demo2.vue.txt';

  export default {
    name: 'DocEffects',
    components: {CodeWrapper, demo0, demo1},
    data() {
      return {md, code0, code1, md0, md1};
    }
  };
</script>
