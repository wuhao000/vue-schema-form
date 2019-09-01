<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form inline
                     v-model="options"
                     :definition="optionFormDefinition"></a-schema-form>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :definition="definition"
                     :disabled="options.disabled"
                     :loading="options.loading"
                     :props="props"
                     :readonly="options.readonly"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></a-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import {FormDescriptor} from '@/types/bean';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

  const def = {
    radio: {
      'type': 'expand-select',
      'enum': [
        '1',
        '2',
        '3',
        '4'
      ],
      'title': 'Radio'
    },
    select: {
      'type': 'select',
      'enum': [
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
      'type': 'text',
      'title': 'TextArea'
    },
    number: {
      type: 'number',
      title: '数字选择'
    },
    boolean: {
      'type': 'boolean',
      'title': '开关选择'
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
    upload: {
      type: 'upload',
      props: {
        listType: 'card'
      },
      title: '卡片上传文件'
    },
    upload2: {
      type: 'upload',
      props: {
        listType: 'dragger'
      },
      title: '图片上传'
    },
    upload3: {
      type: 'upload',
      props: {
        'listType': 'text'
      },
      title: '普通上传文件'
    },
    'range': {
      type: 'range',
      props: {
        min: 0,
        max: 1024,
        marks: {
          0: 0,
          1024: 1024
        },
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
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {

    public year = [2019];

    public fileList = [{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }];


    get definition(): FormDescriptor {
      return {
        fields: def
      };
    }

    public created() {
      SchemaForm.registerAntd();
    }
  }
</script>
