
<template>
  <a-layout>
    <a-layout-content class="demo-wrapper">
      <v-schema-form
          v-model:value="value"
          platform="mobile"
          :schema="schema"
          class="demo-form"
          @ok="onOk"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {registerAntdMobile, SchemaFormEvents} from '../../../../schema-form';

  registerAntdMobile();
  export default defineComponent({
    name: 'Demo',
    setup() {
      const value = ref([{
        basic: {
          aa: '1234',
          cc: {
            cc: '11'
          }
        }
      }]);
      return {
        schema: {
          type: 'object',
          array: true,
          arrayComponent: 'block',
          arrayProps: {
            addText: '这是定制的添加文案',
            removeText: '这是定制的删除文案',
            maxItems: 3
          },
          fields: {
            basic: {
              type: 'object',
              props: {
                labelWidth: '120px'
              },
              fields: {
                aa: {
                  type: 'string',
                  title: '字段1'
                },
                bb: {
                  type: 'string',
                  title: '字段2'
                },
                cc: {
                  type: 'object',
                  props: {
                    gutter: 10
                  },
                  fields: {
                    cc: {
                      type: 'string',
                      title: '字段3',
                    },
                    dd: {
                      type: 'string',
                      title: '字段4',
                    }
                  }
                }
              }
            }
          },
          title: '数组'
        },
        value,
        onOk() {
          console.log(value.value);
        }
      };
    }
  });
</script>
