<template>
  <a-layout>
    <a-layout-content>
      <v-schema-form v-model="value"
                     platform="mobile"
                     style="width: 800px"
                     :effects="effects"
                     :schema="schema"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {EffectsContext} from '../../../../types';
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
    }
  }
</script>
