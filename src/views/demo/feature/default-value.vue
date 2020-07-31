<template>
  <div>
    <v-schema-form v-model="value"
                   :effects="effects"
                   :schema="schema"/>
    <pre style="padding-left: 30px;">{{value}}</pre>
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import {SchemaFormField} from 'v-schema-form-types';

  export const familyInfoFields: SchemaFormField[] = [{
    property: 'name',
    title: '姓名',
    type: 'string',
    default: '张三'
  }, {
    property: 'age',
    title: '年龄',
    type: 'integer',
    default: 18,
    visible: false
  }, {
    property: 'sex',
    type: 'select',
    title: '性别',
    default: 1,
    enum: [{label: '男', value: 1}, {label: '女', value: 2}]
  }, {
    property: 'detail',
    type: 'object',
    fields: [{
      property: 'favorite.value',
      default: 'aa',
      type: 'string',
      title: '爱好'
    }, {
      property: 'favorite.fieldType',
      default: 'bb',
      type: 'string',
      visible: false
    }]
  }];
  export default {
    data() {
      return {
        value: {
          age: null
        },
        schema: {
          'props': {'labelWidth': '120px'},
          'fields': [{
            'property': 'TextNote_0.label',
            'type': 'string',
            'default': '提示文字',
            'visible': false
          }, {
            'property': 'TextNote_0.fieldType',
            'type': 'string',
            'default': 'TextNote',
            'visible': false
          }, {
            'type': 'grid',
            'layout': [[12, 12, 12]],
            'fields': [{
              'id': 'Grid_0_NumberField_0',
              'property': 'Grid_0_NumberField_0.value',
              'title': '数值输入框',
              'array': false,
              'type': 'number',
              'placeholder': '',
              'props': {'extra': '个'},
              'required': false,
              'default': 0
            }, {
              'id': 'Grid_0_NumberField_0',
              'property': 'Grid_0_NumberField_0.fieldType',
              'type': 'string',
              'default': 'NumberField'
            }]
          }]
        }
      };
    },
    created() {
      SchemaForm.registerAntd();
    },
    methods: {
      effects($) {
        $('TextNote_0.fieldType').onFieldCreateOrChange((v) => {
          console.log(v);
        });
      }
    }
  };
</script>
