<template>
  <div>
    <v-schema-form :schema="schema">
      <a-icon slot="usernamePrefix"
              type="user"/>
    </v-schema-form>
  </div>
</template>
<script lang="ts">
  import {registerAntd} from '@/schema-form/antd/register';
  import {SchemaFormField} from 'types';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class LoginForm extends Vue {
    public schema: SchemaFormField = {
      fields: {
        username: {
          title: '',
          type: 'string'
        },
        password: {
          title: '',
          type: 'password',
          slots: {
            prefix: 'usernamePrefix'
          }
        }
      }
    };

    public created() {
      registerAntd();
    }
  }
</script>
<style lang="less" scoped>
</style>
