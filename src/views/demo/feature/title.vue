<template>
  <div>
    <v-schema-form :schema="schema"
                   platform="mobile"
                   :effects="effects"/>
    <a-button @click="changeTitle">修改标题</a-button>
  </div>
</template>
<script lang="ts">
  import {EffectsContext} from 'v-schema-form-types';
  import Vue from 'vue';
  import SchemaForm from '../../../index';

  export default Vue.extend({
    data() {
      return {
        schema: {
          props: {
            title: '表单标题'
          },
          fields: {
            name: {
              title: '组件标题',
              type: 'string'
            }
          }
        },
        context: null
      };
    },
    created() {
      SchemaForm.registerAntd();
      SchemaForm.registerAntdMobile();
    },
    methods: {
      effects($: EffectsContext) {
        this.context = $;
      },
      changeTitle() {
        this.context('').setFieldProps((field) => {
          return {title: field.definition.props.title + '-new'};
        });
        this.context('name').setTitle('cccc');
      }
    }
  });
</script>
