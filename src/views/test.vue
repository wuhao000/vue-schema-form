<template>
  <div>
    {{ value }}
  </div>
  <v-schema-form
      v-model:value="value"
      :context="ctx"/>
</template>
<script lang="tsx" setup>
  import { Modal } from 'ant-design-vue';
  import {ref} from 'vue';
  import {defineSchemaForm, registerAntd} from '../schema-form';
  import {message} from 'ant-design-vue';

  registerAntd({
    confirm: (content: string, title?: string, type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm') => {
      return new Promise((resolve, reject) => {
        Modal.confirm({
          content,
          title,
          type,
          onCancel: () => {
            reject();
          },
          onOk: () => {
            resolve(undefined);
          }
        });
      });
    },
    message
  });

  const value = ref({
    title: ''
  });
  const ctx = defineSchemaForm({
    fields: {
      title: {
        xType: 'select',
        title: (v) => '标题' + v.title,
        enum: [
          {label: 'a', value: 'aaa'},
          {label: 'b', value: 'bbb'},
        ]
      },
      'b.aj': {
        xType: 'select',
        title: '标题2',
        enum: (v) => {
          return [
            {label: 'c', value: 'ccc'},
            {label: 'd', value: 'ddd'},
          ];
        }
      },
      showValue: {
        xType: 'string',
        title: '小标题',
        visible: () => {
          return value.value.title === 'aaa';
        }
      },
      showValue2: {
        xType: 'string',
        title: '小标题2',
        visible: v => {
          if (v.title === 'aaa') {
            return v.b.aj === 'ccc';
          }
          return false;
        }
      },
      $grid: {
        xType: 'grid',
        layout: [12, [12, 13]],
        xProps: {
          colClass: ''
        }
      },
      $steps: {
        xType: 'steps',
        layout: [1, 2],
        xProps: {
          titles: ['1']
        },
        fields: {
          $a: {
            xType: 'text',
            title: 'a'
          }
        }
      }
    }
  });
</script>
