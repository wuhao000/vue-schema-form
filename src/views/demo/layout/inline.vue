<template>
  <ae-layout class="bg-white wrapper">
    <ae-layout-content>
      <v-schema-form :schema="schema"
                     :value="value"></v-schema-form>
      <show-value :value="value"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import ShowValue from '@/views/demo/show-value';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'LayoutInline',
    components: {ShowValue}
  })
  export default class LayoutInline extends Vue {
    public schema = {
      props: {
        inline: true
      },
      fields: {
        aaa: {
          type: 'string',
          title: '字段1'
        },
        bbb: {
          type: 'number',
          title: '字段2'
        },
        ccc: {
          type: 'date',
          title: '字段3'
        }
      }
    };
    public value = {};
  }
</script>
