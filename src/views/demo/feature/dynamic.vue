<template>
  <div>
    <div>
      <d-button @click="addField">添加</d-button>
    </div>
    <div>
      <v-schema-form :schema="schema"
                     v-model="value"
                     platform="mobile"/>
    </div>
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        value: {},
        count: 1,
        dynamicFields: []
      };
    },
    computed: {
      schema() {
        const fields = [];
        fields.push({
          title: '标题',
          property: 'title',
          type: 'string'
        });
        this.dynamicFields.forEach(it => {
          fields.push(it);
        });
        return {
          fields
        };
      }
    },
    created() {
      SchemaForm.registerAntdMobile();
    },
    methods: {
      addField() {
        this.dynamicFields.push({
          property: 'title-' + this.count,
          title: '标题-' + this.count,
          type: 'string'
        });
        this.count++;
      }
    }
  });
</script>
