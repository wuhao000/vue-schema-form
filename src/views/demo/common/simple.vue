<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form v-model="options"
                     :platform="platform"
                     :schema="optionFormDefinition"></v-schema-form>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :disabled="options.disabled"
                     :loading="options.loading"
                     :mode="options.displayMode ? 'display' : 'edit'"
                     :platform="platform"
                     :props="props"
                     :readonly="options.readonly"
                     :schema="definition"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></v-schema-form>
      <show-value :value="value"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import {FormDescriptor, SchemaFormField} from '@/types/bean';
  import Base from '@/views/demo/base';
  import ShowValue from '@/views/demo/show-value';
  import Component from 'vue-class-component';

  const def: { [key: string]: SchemaFormField } = {
    radio: {
      type: 'expand-select',
      enum: [
        '1',
        '2',
        '3',
        '4'
      ],
      title: 'Radio'
    },
    select: {
      type: 'select',
      enum: [
        '1',
        '2',
        '3',
        '4'
      ],
      'title': 'Select',
      'required': true
    },
    checkbox: {
      type: 'expand-select',
      array: true,
      enum: [
        '1',
        '2',
        '3',
        '4'
      ],
      title: 'Checkbox',
      required: true
    },
    textarea: {
      type: 'text',
      title: 'TextArea'
    },
    number: {
      type: 'number',
      title: '数字'
    },
    integer: {
      type: 'integer',
      title: '整数'
    },
    boolean: {
      type: 'boolean',
      title: '开关',
      displayValue: (value) => {
        return value ? '开' : '关';
      }
    },
    boolean2: {
      type: 'boolean',
      xType: 'checkbox',
      title: '选择'
    },
    date: {
      'type': 'date',
      'title': '日期选择'
    },
    daterange: {
      type: 'daterange',
      default: [
        '2018-12-19',
        '2018-12-19'
      ],
      title: '日期范围'
    },
    time: {
      type: 'time',
      title: '时间'
    },
    upload1: {
      type: 'upload',
      props: {
        listType: 'card',
        action: 'https://yapi.aegis-info.com/mock/126/upload'
      },
      title: '卡片上传文件'
    },
    upload2: {
      type: 'upload',
      props: {
        listType: 'picture',
        action: 'https://yapi.aegis-info.com/mock/126/upload'
      },
      title: '图片上传'
    },
    upload3: {
      type: 'upload',
      props: {
        listType: 'dragger',
        action: 'https://yapi.aegis-info.com/mock/126/upload'
      },
      title: '拖拽上传'
    },
    upload4: {
      type: 'upload',
      props: {
        'listType': 'text',
        action: 'https://yapi.aegis-info.com/mock/126/upload'
      },
      title: '普通上传文件'
    },
    range: {
      type: 'range',
      props: {
        min: 0,
        max: 1024,
        range: true
      },
      title: '范围选择'
    },
    transfer: {
      type: 'transfer',
      enum: [
        {
          'value': 1,
          'label': '选项1'
        },
        {
          'value': 2,
          'label': '选项2'
        }
      ],
      title: '穿梭框'
    },
    rating: {
      type: 'rate',
      title: '等级'
    }
  };
  const imgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567405580995&di=fbc97d869418de6f9bd14376f7a3eb7e&imgtype=0&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-9%2F20129181714587674.jpg';
  @Component({
    name: 'SimpleEditDemo',
    components: {ShowValue}
  })
  export default class SimpleEditDemo extends Base {

    public checked = false;
    public value = {
      radio: '1',
      upload1: imgUrl,
      upload2: imgUrl,
      upload3: imgUrl,
      upload4: imgUrl
    };

    public year = [2019];


    get definition(): FormDescriptor {
      return {
        fields: def
      };
    }
  }
</script>
