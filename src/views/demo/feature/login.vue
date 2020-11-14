<template>
  <div>
    <div style="width: 400px">
      <h2>用户登录</h2>
      <form :action="$route.path">
        <v-schema-form
                       :schema="schema">
          <a-icon slot="usernamePrefix"
                  type="user"/>
          <a-icon slot="passwordPrefix"
                  type="lock"/>
        </v-schema-form>
        <a-button htmlType="submit">提交</a-button>
      </form>
    </div>
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
      props: {
        okProps: {
          block: true
        }
      },
      fields: {
        username: {
          title: '',
          type: 'string',
          slots: {
            prefix: 'usernamePrefix'
          }
        },
        password: {
          title: '',
          type: 'password',
          slots: {
            prefix: 'passwordPrefix'
          }
        }
      }
    };

    public created() {
      registerAntd();
    }

    public submit() {

    }
  }
</script>
<style lang="less" scoped>
</style>
