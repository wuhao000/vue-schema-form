<template>
  <div>
<!--    <v-schema-form v-model="value"-->
<!--                   :schema="schema"/>-->
    <v-schema-form v-model="value2"
                   :editable="false"
                   :schema="schema2"/>
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import {SchemaFormField} from 'v-schema-form-types';
  import Vue from 'vue';

  const schema = {
    'props': {
      'section': true,
      'spaceBetweenSection': 16,
      labelWidth: '120px'
    },
    'fields': [
      {
        'id': 'd43ae355-55d7-43ff-bdb4-edf85aebef22',
        'property': 'd43ae355-55d7-43ff-bdb4-edf85aebef22.value',
        'title': '选择项目',
        'array': true,
        'type': 'basic-data',
        'placeholder': '请选择',
        'props': {
          'selectMode': 2,
          'type': 'project'
        },
        'required': true,
        'default': []
      },

      {
        'id': '1ff99b08-b798-418f-9c4c-eecdc74493b6',
        'property': '1ff99b08-b798-418f-9c4c-eecdc74493b6.value',
        'title': '版本',
        'array': false,
        'type': 'string',
        'placeholder': '请输入',
        'props': {},
        'required': true,
        'default': ''
      },

      {
        'id': '304e869b-7fc3-4ec9-975d-6f66a37700b5',
        'property': '304e869b-7fc3-4ec9-975d-6f66a37700b5.value',
        'title': '参与测试的团队',
        'array': true,
        'type': 'expand-select',
        'placeholder': '',
        'props': {},
        'required': true,
        'default': [],
        'enum': [
          {
            'value': '1',
            'label': '南京测试团队'
          },
          {
            'value': '2',
            'label': '北京测试团队'
          },
          {
            'value': '3',
            'label': '广州测试团队'
          }
        ]
      },

      {
        'id': '4b2601f5-b606-489b-be5e-b49f9402b577',
        'property': '4b2601f5-b606-489b-be5e-b49f9402b577.value',
        'title': '更新类型',
        'array': true,
        'type': 'expand-select',
        'placeholder': '',
        'props': {},
        'required': false,
        'default': [],
        'enum': [
          {
            'value': '1',
            'label': '新增功能'
          },
          {
            'value': '2',
            'label': '缺陷修复'
          },
          {
            'value': '3',
            'label': '性能优化'
          }
        ]
      },

      {
        'id': '0adf2aae-fe30-47bf-a8d8-2066953af768',
        'property': '0adf2aae-fe30-47bf-a8d8-2066953af768.value',
        'title': '紧急程度',
        'array': false,
        'type': 'select',
        'placeholder': '',
        'props': {},
        'required': true,
        'default': '',
        'enum': [
          {
            'value': 'bca0054d-daa3-4fc1-9876-f4bde85250f6',
            'label': '需要立即发布'
          },
          {
            'value': '63f9c8f5-7518-4b2b-84c4-4d174c0246c8',
            'label': '需要当日更新'
          },
          {
            'value': '61479636-afa1-4e46-9b71-eb00b08a9b18',
            'label': '随版本上线发布'
          },
          {
            'value': '3764758b-b233-4be1-b22a-a246d36c7885',
            'label': '非必须的发布'
          }
        ]
      },

      {
        'id': 'a7ee2ac0-7d58-42d7-b381-23aa0df6ba82',
        'property': 'a7ee2ac0-7d58-42d7-b381-23aa0df6ba82.value',
        'title': '更新内容',
        'array': false,
        'type': 'text',
        'placeholder': '请输入更新内容',
        'props': {
          'rows': 5
        },
        'required': true,
        'default': ''
      }
    ]
  };

  const value = {
    'd43ae355-55d7-43ff-bdb4-edf85aebef22': {
      'value': [
        'QD201903001'
      ]
    },
    '1ff99b08-b798-418f-9c4c-eecdc74493b6': {
      'value': '1.1'
    },
    '304e869b-7fc3-4ec9-975d-6f66a37700b5': {
      'value': [
        '1'
      ]
    },
    '4b2601f5-b606-489b-be5e-b49f9402b577': {
      'value': [
        '1'
      ]
    },
    '0adf2aae-fe30-47bf-a8d8-2066953af768': {
      'value': 'bca0054d-daa3-4fc1-9876-f4bde85250f6'
    },
    'a7ee2ac0-7d58-42d7-b381-23aa0df6ba82': {
      'value': '11111'
    }
  };

  export default Vue.extend({
    data() {
      return {
        value: null,
        value2: value,
        schema2: schema,
        schema: {
          fields: {
            a: {
              type: 'object',
              fields: [{
                property: 'b.name',
                type: 'string',
                title: '标题'
              }, {
                property: 'b.value',
                type: 'string',
                title: '值'
              }, {
                property: 'c.d.e',
                type: 'select',
                props: {
                  options: [{
                    label: 'a', value: 1
                  }, {
                    label: 'b', value: 2
                  }]
                }
              }]
            }
          }
        } as SchemaFormField
      };
    },
    created() {
      SchemaForm.registerAntd();
    }
  });
</script>



