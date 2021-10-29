```vue
<template>
  <div>
    <div style="width: 400px">
      <h2>用户登录</h2>
      <a-tabs>
        <a-tab-pane key="a"
                    tab="用户名登录">
          <v-schema-form :schema="schema">
            <template v-slot:usernamePrefix>
              <user-outlined/>
            </template>
            <template v-slot:passwordPrefix>
              <lock-outlined/>
            </template>
          </v-schema-form>
          <a-button>提交</a-button>
        </a-tab-pane>
        <a-tab-pane key="b"
                    tab="手机号登录">
          <v-schema-form :schema="schema2">
            <template v-slot:usernamePrefix>
              <phone-outlined/>
            </template>
            <template v-slot:passwordPrefix>
              <mail-outlined/>
            </template>
          </v-schema-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts">
  import {LockOutlined, MailOutlined, PhoneOutlined, UserOutlined} from '@ant-design/icons-vue';
  import {defineComponent, onBeforeUnmount, ref} from 'vue';
  import {registerAntd} from '../../../schema-form/antd';

  registerAntd();
  export default defineComponent({
    components: {
      UserOutlined: UserOutlined as any,
      LockOutlined: LockOutlined as any,
      PhoneOutlined: PhoneOutlined as any,
      MailOutlined: MailOutlined as any
    },
    props: {
      size: String
    },
    setup() {
      const timer = ref(null);
      onBeforeUnmount(() => {
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
                    action: ($) => {
                      $('#code').setFieldProps({
                        loading: true,
                        title: '发送中'
                      });
                      let time = 60;
                      timer.value = setInterval(() => {
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
                action: () => {
                  console.log(1);
                }
              }
            }
          }
        }
      };
    }
  });
</script>
<style lang="less" scoped>
</style>
```