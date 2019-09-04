<template>
  <ae-layout>
    <ae-layout-content>
      {{value}}
      <v-schema-form v-model="value"
                     platform="mobile"
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
        name: {
          title: '姓名',
          type: 'string',
          props: {
            textAlign: 'right'
          }
        }
      }
    };
    public value = {};

    public created() {
      setTimeout(() => {
        this.value = {
          name: '张三'
        };
      }, 1000);
    }

    public effects($: EffectsContext) {
      $('family.?.hasChild').onFieldChange((v, path) => {
        if (v) {
          $(path).show();
        } else {
          $('family.?.name', 'family.?.birthday').hide();
        }
      });
      setTimeout(() => {
        $('c').setFieldProps({loading: true});
        $('c').setEnum(['1', '2', '3']);
        $('c').setFieldProps({loading: false});
      }, 3000);
    }
  }
</script>
