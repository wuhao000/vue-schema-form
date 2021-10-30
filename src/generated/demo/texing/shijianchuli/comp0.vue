
<template>
  <div>
    <v-schema-form
        v-model:value="value"
        :schema="schema"
        :effects="effects"/>
    <a-button @click="focus">焦点</a-button>
    <a-button @click="addContent">添加内容</a-button>
  </div>
</template>
<script lang="ts">
  import {defineComponent, reactive, ref} from 'vue';
  import {EffectsContext} from '../../../../../types';
  import {registerAntd} from '../../../../schema-form';
  import {message} from 'ant-design-vue';

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = reactive({
        fields: [
          {
            property: 'click',
            title: '点击事件监听',
            type: 'string',
            props: {
              onClick: () => {
                message.info('触发click事件');
              }
            }
          },
          {
            property: 'hover',
            title: '点击事件监听（获得副作用函数）',
            type: 'string',
            events: {
              onClick: ($) => {
                message.info('触发focus事件, 并获得副作用函数,切换上一个表单相的状态');
                $('click').enable(!$('click').isEnabled());
              }
            }
          },
          {
            property: 'keydown',
            title: '点击事件监听',
            type: 'string',
            events: {
              onKeydown: ($, e) => {
                message.info('触发keydown事件');
              }
            }
          },
        ],
        props: {
          labelWidth: '100px'
        }
      });
      const value = reactive({});
      const context = ref(null);
      const focus = () => {
        const field = context.value('name').fields()[0];
        field.inputRef.focus();
      };
      const effects = ($: EffectsContext) => {
        context.value = $;
        $('name').onFieldBlur((a, b) => {
          console.log('blur', a, b);
        });
        $('name').onFieldFocus((a, b) => {
          console.log('onFocus')
        });
      };
      const addContent = () => {
        focus();
        const field = context.value('name').fields()[0];
        const input = field.inputRef as HTMLInputElement;
        const caretIndex = input.selectionEnd;
        const content = 'abc';
        context.value('name').value(
            input.value.substr(0, caretIndex) + content + input.value.substr(caretIndex)
        );
        setTimeout(() => {
          input.setSelectionRange(caretIndex + content.length, caretIndex + content.length);
        }, 0);
      };
      registerAntd();

      return {
        schema,
        addContent,
        value,
        effects,
        focus
      };
    },
    data() {
      return {};
    },
    created() {
      registerAntd();
    },
    methods: {}
  });
</script>
