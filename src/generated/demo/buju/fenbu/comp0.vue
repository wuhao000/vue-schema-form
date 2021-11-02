<template>
  <div>
    <v-schema-form
        v-model:value="value"
        :schema="schema"
        :effects="effects"
        @ok="onOk"
        @cancel="onCancel"/>
    <a-button @click="setValue">设置值</a-button>
  </div>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {registerAntd} from '../../../../schema-form';
  import {EffectsContext} from '../../../../../types';

  registerAntd();
  const onCancel = () => {
    console.log('cancel');
  };
  const onOk = () => {
    console.log('ok');
  };
  const effects = ($: EffectsContext) => {
    $('#steps').setFieldProps({
    });
  };
  const value = ref({
    placeholder: "请输入",
    name: "",
  });
  const setValue = () => {
    value.value = {
      unit: null,
      name: "新名称",
      type: 'Percentage',
      placeholder: '请重新输入'
    }
  };
  const schema = {
    props: {
      labelWidth: 120,
      labelPosition: 'left'
    },
    fields: [{
      type: 'steps',
      id: 'steps',
      property: '$steps',
      layout: [3, 2],
      props: {
        titles: ['基本信息', '高级设置']
      },
      fields: [
        {
          property: '$grid1',
          type: 'grid',
          layout: [12, 12],
          fields: [
            {
              property: 'name',
              required: true,
              title: '名称',
              type: 'string'
            }
          ]
        },
        {
          type: 'grid',
          property: '$grid2',
          layout: [12, 12],
          fields: [
            {
              property: 'switch',
              title: '开关',
              type: 'boolean',
              default: false
            }
          ]
        },
        {
          enum: [
            {label: '百分比', value: 'Percentage'},
            {label: '金额', value: 'Money'},
            {label: '进度', value: 'Progress'}
          ],
          property: 'type',
          title: '数值类型',
          type: 'select'
        },
        {
          property: 'unit',
          title: '单位',
          type: 'string'
        },
        {
          property: 'placeholder',
          title: '提示信息',
          type: 'string'
        }
      ]
    }]
  };
</script>
