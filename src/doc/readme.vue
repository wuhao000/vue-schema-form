<template>
  <ae-layout>
    <ae-layout-content class="demo-wrapper">
      <code v-html="md"
            class="markdown-body"></code>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import '@/styles/github-markdown.less';

  import Vue from 'vue';
  import Component from 'vue-class-component';
  import md from './readme.md';

  @Component({
    name: 'ViewsReadme'
  })
  export default class ViewsReadme extends Vue {

    public md = md;
  }
</script>
