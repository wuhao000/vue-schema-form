<template>
  <a-layout>
    <a-layout-content>
      <v-schema-form
          :effects="effects"
          :schema="schema">
      </v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
  import {EffectsContext} from '../../../../types';
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  
  const schema = {
    props: {inline: true},
    fields: {
      layout: {
        type: 'grid',
        layout: [6, 6],
        fields: {
          s1: {
            type: 'string',
            title: 'aa'
          },
          s2: {
            type: 'string',
            title: 'bb'
          }
        }
      }
    }
  };
  const effects = (ctx: EffectsContext) => {
    ctx('s1').onFieldChange(value => {
      ctx('s2').value(value);
    });
  }
</script>
