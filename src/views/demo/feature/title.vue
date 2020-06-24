<template>
  <div>
    <v-schema-form :schema="schema"
                   :effects="effects"/>
    <d-button @click="changeTitle"></d-button>
  </div>
</template>
<script lang="ts">
  import {EffectsContext} from 'v-schema-form-types';
  import SchemaForm from '../../../index';
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        schema: {
          props: {
            title: '标题'
          }
        },
        context: null
      };
    },
    created() {
      SchemaForm.registerAntd();
    },
    methods: {
      effects($: EffectsContext) {
        this.context = $;
      },
      changeTitle() {
        this.context('').setFieldProps({title: 'bbb'});
      }
    }
  });
</script>
