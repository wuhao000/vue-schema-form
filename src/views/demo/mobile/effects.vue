<template>
  <ae-layout>
    <ae-layout-content>
      <v-schema-form platform="mobile"
                     style="width: 800px"
                     :effects="effects"
                     :schema="schema"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import {EffectsContext} from '@/types/form';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'MobileEffects'
  })
  export default class MobileEffects extends Vue {

    public schema = {
      fields: {
        a: {
          type: 'text',
          title: 'a'
        },
        b: {
          type: 'select',
          title: 'b'
        },
        c: {
          type: 'select',
          array: true,
          title: 'c'
        }
      }
    };

    public effects($: EffectsContext) {
      setTimeout(() => {
        $('c').setFieldProps({loading: true});
        $('c').setEnum(['1', '2', '3']);
        $('c').setFieldProps({loading: false});
        $('b').setFieldProps({loading: true});
        $('b').setEnum(['1', '2', '3']);
        $('b').setFieldProps({loading: false});
      }, 3000);
    }
  }
</script>
