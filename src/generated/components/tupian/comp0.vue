
<template>
  <div>
    {{ value }}
    <v-schema-form
        v-model:value="value"
        :schema="schema"/>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {FieldTypes, registerAntd} from '../../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'PictureComponentDemo',
    setup() {
      const value = ref('');
      return {
        value,
        schema: {
          fields: {
            file: {
              title: 'picture',
              type: FieldTypes.Picture,
              array: true,
              props: {
                action: 'http://localhost:3000/api/upload',
                valueType: 'object',
                mode: 'card',
                accept: '.jpg, .jpeg, .png',
                data: {
                  access_token: '90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20'
                }
              }
            }
          }
        }
      };
    }
  });
</script>
