<template>
  <div>
    <div style="width: 400px">
      <h2>用户登录</h2>
      <form :action="$route.path">
        <v-schema-form :schema="schema">
          <a-icon slot="usernamePrefix"
                  type="user"/>
          <a-icon slot="passwordPrefix"
                  type="lock"/>
        </v-schema-form>
        <a-button htmlType="submit">提交</a-button>
        <v-schema-form :schema="schema2">
          <a-icon slot="usernamePrefix"
                  type="phone"/>
          <a-icon slot="passwordPrefix"
                  type="mail"/>
        </v-schema-form>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import {registerAntd} from '@/schema-form/antd/register';
import {SchemaFormField} from '../../../../types';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LoginForm extends Vue {
  public schema2: SchemaFormField = {
    props: {
      size: 'large'
    },
    fields: {
      username: {
        title: '',
        type: 'string',
        placeholder: '手机号',
        required: true,
        slots: {
          prefix: 'usernamePrefix'
        }
      },
      $grid: {
        type: 'grid',
        layout: [16, 8],
        props: {
          gutter: 16
        },
        fields: {
          password: {
            title: '',
            type: 'string',
            required: true,
            placeholder: '验证码',
            slots: {
              prefix: 'passwordPrefix'
            }
          },
          $submit: {
            id: 'submit',
            type: 'button',
            wrapperProps: {noTitle: true},
            title: '获取验证码',
            props: {
              size: 'large', block: true,
              action: ($) => {
                console.log($('#submit'));
                $('#submit').setFieldProps({
                  loading: true,
                  title: '发送中'
                });
                let time = 60;
                const a = setInterval(() => {
                  $('#submit').setFieldProps({
                    loading: true,
                    title: time + '秒'
                  });
                  time--;
                }, 1000);
              }
            }
          }
        }
      }
    }
  };
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
