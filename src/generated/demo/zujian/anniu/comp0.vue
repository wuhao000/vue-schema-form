
<template>
  <div>
    {{ counter }}
    <d-button @click="count">点击</d-button>
    <v-schema-form
        :actions="actions"
        :schema="schema"/>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {SchemaFormField} from '../../../../../types';
  import {DButton, registerAntd} from '../../../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'ButtonDemo',
    components: {
      DButton
    },
    setup() {
      const counter = ref(0);
      const count = () => {
        counter.value++;
      };
      return {
        counter, count,
        actions: [{
          action: () => {
            count()
          },
          text: '提交'
        }],
        schema: {
          fields: {
            text: {
              type: 'string',
              props: {
                class: 'block',
                style: {
                  width: '120px'
                }
              }
            } as SchemaFormField
          }
        }
      };
    }
  });
</script>
