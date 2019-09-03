<template>
  <ae-layout class="bg-white wrapper">
    <ae-layout-content>
      <a-schema-form inline
                     :value="value"
                     :schema="schema"></a-schema-form>
      <show-value :value="value"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import ShowValue from '@/views/demo/layout/show-value';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'LayoutInline',
    components: {ShowValue}
  })
  export default class LayoutInline extends Vue {
    public value = {};
    public schema = {
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
  }
</script>
