<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;div class="login-form"&gt;
      &lt;h2&gt;用户登录&lt;/h2&gt;
      &lt;a-tabs&gt;
        &lt;a-tab-pane
            key="a"
            tab="用户名登录"&gt;
          &lt;v-schema-form :schema="schema"&gt;
            &lt;template #usernamePrefix&gt;
              &lt;user-outlined/&gt;
            &lt;/template&gt;
            &lt;template #passwordPrefix&gt;
              &lt;lock-outlined/&gt;
            &lt;/template&gt;
          &lt;/v-schema-form&gt;
          &lt;a-button&gt;提交&lt;/a-button&gt;
        &lt;/a-tab-pane&gt;
        &lt;a-tab-pane
            key="b"
            tab="手机号登录"&gt;
          &lt;v-schema-form :schema="schema2"&gt;
            &lt;template #usernamePrefix&gt;
              &lt;phone-outlined/&gt;
            &lt;/template&gt;
            &lt;template #passwordPrefix&gt;
              &lt;mail-outlined/&gt;
            &lt;/template&gt;
          &lt;/v-schema-form&gt;
        &lt;/a-tab-pane&gt;
      &lt;/a-tabs&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {LockOutlined, MailOutlined, PhoneOutlined, UserOutlined} from '@ant-design/icons-vue';
  import {defineComponent, onBeforeUnmount, ref} from 'vue';
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    components: {
      UserOutlined,
      LockOutlined,
      PhoneOutlined,
      MailOutlined
    },
    props: {
      size: String
    },
    setup() {
      const timer = ref(null);
      onBeforeUnmount(() =&gt; {
        if (timer.value) {
          clearInterval(timer.value);
          timer.value = null;
        }
      });
      return {
        schema2: {
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
                  id: 'code',
                  type: 'button',
                  wrapperProps: {noTitle: true},
                  title: '获取验证码',
                  props: {
                    block: true,
                    action: ($) =&gt; {
                      $('#code').setFieldProps({
                        loading: true,
                        title: '发送中'
                      });
                      let time = 60;
                      timer.value = setInterval(() =&gt; {
                        $('#code').setFieldProps({
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
        },
        schema: {
          props: {
            size: 'large',
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
            },
            submit: {
              type: 'button',
              title: '',
              props: {
                title: '提交',
                block: true,
                action: () =&gt; {
                  console.log(1);
                }
              }
            }
          }
        }
      };
    }
  });
&lt;/script&gt;
&lt;style lang="less" scoped&gt;
  .login-form {
    width: 400px;
  }
&lt;/style&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>