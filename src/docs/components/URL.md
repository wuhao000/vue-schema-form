# URL

```vue
<template>
  <d-url v-model:value="value"/>
  <v-schema-form
    v-model:value="value2"
    :schema="schema"
  />
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {DUrl, registerAntd} from '../../schema-form';

  registerAntd();
  const value = ref('https://www')
  
  const value2 = ref();
  
  const schema = {
    fields: {
      text: {
        title: 'text',
        type: 'text'
      }
    }
  }
</script>
```
