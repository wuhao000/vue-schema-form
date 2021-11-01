
<template>
  <a-layout class="bg-white wrapper">
    <a-layout-content>
      <v-schema-form
          v-model:value="value"
          :editable="editable"
          :schema="schema"></v-schema-form>
      <a-button @click="changeMode">
        {{ editable ? '详情' : '编辑' }}
      </a-button>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {registerAntd} from '../../../../schema-form';
  import {defineComponent, ref} from 'vue';

  
  registerAntd();

  export default defineComponent({
    name: 'LayoutInline',
    setup() {
      const value = ref({});
      const editable = ref(true);

      return {
        value, editable,
        schema: {
          props: {
            labelCol: {span: 2}
          },
          fields: {
            textbox1: {
              type: 'text-box',
              title: '文本串联',
              layout: '%s元',
              fields: {
                a: {
                  type: 'string'
                }
              }
            },
            textbox2: {
              type: 'text-box',
              title: '文本串联',
              layout: '订%s元/票 退%s元/票 改%s元/票',
              fields: {
                text1: {
                  type: 'number',
                  default: 10,
                  required: true
                },
                text2: {
                  type: 'number',
                  default: 20,
                  required: true
                },
                text3: {
                  type: 'number',
                  default: 30,
                  required: true
                }
              }
            }
          }
        },
        changeMode() {
          editable.value = !editable.value;
        },
        effects2($) {
          $('month').onFieldChange((v) => {
            console.log('month changed: ' + v);
          });
        }
      };
    }
  });
</script>
