
<template>
  <a-space>
    <d-button>默认</d-button>
    <d-button type="danger">警告</d-button>
    <d-button type="ghost">Ghost</d-button>
    <d-button type="dashed">Dashed</d-button>
    <d-button type="link">链接</d-button>
  </a-space>
  <div>
    <a-space>
      <d-button text>文本按钮</d-button>
      <d-button
          text
          type="danger">文本按钮
      </d-button>
    </a-space>
  </div>
  <div>
    <v-schema-form :schema="schema"/>
  </div>
</template>
<script lang="ts" setup>
  import {DButton} from '../../../schema-form';
  import {registerAntd} from '../../../schema-form';
  import {message} from 'ant-design-vue';

  registerAntd();
  const schema = {
    fields: {
      button: {
        type: 'button',
        title: '这是一个按钮',
        events: {
          onClick: () => {
            message.info("点击了按钮");
          }
        }
      }
    }
  }
</script>
