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
            'property': 'TextNote_0.displayValue',
            'type': 'string',
            'default': null,
            'visible': false
          }, {
            'id': 'TextNote_0',
            'property': 'TextNote_0.value',
            'title': '提示文字',
            'array': false,
            'type': 'string',
            'placeholder': '',
            'props': {},
            'required': false,
            'default': ''
          }, {
            'property': 'InnerContactField_0.label',
            'type': 'string',
            'default': '内部联系人',
            'visible': false
          }, {
            'property': 'InnerContactField_0.fieldType',
            'type': 'string',
            'default': 'InnerContactField',
            'visible': false
          }, {
            'property': 'InnerContactField_0.displayValue',
            'type': 'string',
            'default': null,
            'visible': false
          }, {
            'id': 'InnerContactField_0',
            'property': 'InnerContactField_0.value',
            'title': '内部联系人',
            'array': false,
            'type': 'user',
            'placeholder': '',
            'props': {},
            'required': false
          }, {
            'property': 'DepartmentField_0.label',
            'type': 'string',
            'default': '部门',
            'visible': false
          }, {
            'property': 'DepartmentField_0.fieldType',
            'type': 'string',
            'default': 'DepartmentField',
            'visible': false
          }, {
            'property': 'DepartmentField_0.displayValue',
            'type': 'string',
            'default': null,
            'visible': false
          }, {
            'id': 'DepartmentField_0',
            'property': 'DepartmentField_0.value',
            'title': '部门',
            'array': true,
            'type': 'department',
            'placeholder': '',
            'props': {},
            'required': false,
            'default': []
          }, {
            'property': 'ExternalContactField_0.label',
            'type': 'string',
            'default': '外部联系人',
            'visible': false
          }, {
            'property': 'ExternalContactField_0.fieldType',
            'type': 'string',
            'default': 'ExternalContactField',
            'visible': false
          }, {
            'property': 'ExternalContactField_0.displayValue',
            'type': 'string',
            'default': null,
            'visible': false
          }, {
            'id': 'ExternalContactField_0',
            'property': 'ExternalContactField_0.value',
            'title': '外部联系人',
            'array': false,
            'type': 'user',
            'placeholder': '',
            'props': {},
            'required': false
          }, {
            'property': 'AreaField_0.label',
            'type': 'string',
            'default': '地区',
            'visible': false
          }, {
            'property': 'AreaField_0.fieldType',
            'type': 'string',
            'default': 'AreaField',
            'visible': false
          }, {
            'property': 'AreaField_0.displayValue',
            'type': 'string',
            'default': null,
            'visible': false
          }, {
            'id': 'AreaField_0',
            'property': 'AreaField_0.value',
            'title': '地区',
            'array': true,
            'type': 'area',
            'placeholder': '请选择',
            'props': {'type': 1},
            'required': false,
            'default': []
          }, {
            'property': 'Grid_0_NumberField_0.label',
            'type': 'string',
            'default': '数值输入框',
            'visible': false
          }, {
            'property': 'Grid_0_NumberField_0.fieldType',
            'type': 'string',
            'default': 'NumberField',
            'visible': false
          }, {
            'property': 'Grid_0_NumberField_0.displayValue',
            'type': 'string',
            'default': null,
            'visible': false
          }, {
            'property': 'Grid_0_MultiSelectField_0.label',
            'type': 'string',
            'default': '多选框',
            'visible': false
          }, {
            'property': 'Grid_0_MultiSelectField_0.fieldType',
            'type': 'string',
            'default': 'MultiSelectField',
            'visible': false
          }, {
            'property': 'Grid_0_MultiSelectField_0.displayValue',
            'type': 'string',
            'default': null,
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
              'id': 'Grid_0_MultiSelectField_0',
              'property': 'Grid_0_MultiSelectField_0.value',
              'title': '多选框',
              'array': true,
              'type': 'select',
              'placeholder': '',
              'props': {},
              'required': false,
              'default': []
            }]
          }, {
            'property': 'PhotoField_0.label',
            'type': 'string',
            'default': '图片',
            'visible': false
          }, {
            'property': 'PhotoField_0.fieldType',
            'type': 'string',
            'default': 'PhotoField',
            'visible': false
          }, {
            'property': 'PhotoField_0.displayValue',
            'type': 'string',
            'default': null,
            'visible': false
          }, {
            'id': 'PhotoField_0',
            'property': 'PhotoField_0.value',
            'title': '图片',
            'array': true,
            'type': 'picture',
            'placeholder': '',
            'props': {},
            'required': false,
            'default': []
          }, {
            'property': 'SubFormField_0.label',
            'type': 'string',
            'default': '子表单',
            'visible': false
          }, {
            'property': 'SubFormField_0.fieldType',
            'type': 'string',
            'default': 'SubFormField',
            'visible': false
          }, {'property': 'SubFormField_0.displayValue', 'type': 'string', 'default': null, 'visible': false}, {
            'id': 'SubFormField_0',
            'property': 'SubFormField_0.value',
            'title': '子表单',
            'array': true,
            'type': 'object',
            'props': {},
            'required': false,
            'default': [{
              'SubFormField_0_PhotoField_0': {'fieldType': 'PhotoField', 'label': '图片', 'value': []},
              'SubFormField_0_Attachment_0': {'fieldType': 'Attachment', 'label': '附件', 'value': []}
            }],
            'fields': [{
              'property': 'SubFormField_0_PhotoField_0.label',
              'type': 'string',
              'default': '图片',
              'visible': false
            }, {
              'property': 'SubFormField_0_PhotoField_0.fieldType',
              'type': 'string',
              'default': 'PhotoField',
              'visible': false
            }, {
              'property': 'SubFormField_0_PhotoField_0.displayValue',
              'type': 'string',
              'default': null,
              'visible': false
            }, {
              'id': 'SubFormField_0_PhotoField_0',
              'property': 'SubFormField_0_PhotoField_0.value',
              'title': '图片',
              'array': true,
              'type': 'picture',
              'placeholder': '',
              'props': {},
              'required': false,
              'default': []
            }, {
              'property': 'SubFormField_0_Attachment_0.label',
              'type': 'string',
              'default': '附件',
              'visible': false
            }, {
              'property': 'SubFormField_0_Attachment_0.fieldType',
              'type': 'string',
              'default': 'Attachment',
              'visible': false
            }, {
              'property': 'SubFormField_0_Attachment_0.displayValue',
              'type': 'string',
              'default': null,
              'visible': false
            }, {
              'id': 'SubFormField_0_Attachment_0',
              'property': 'SubFormField_0_Attachment_0.value',
              'title': '附件',
              'array': true,
              'type': 'file',
              'placeholder': '',
              'props': {},
              'required': false,
              'default': []
            }],
            'arrayComponent': 'block',
            'wrapperProps': {'showTitle': false}
          }]
        }
      };
    },
    created() {
      SchemaForm.registerAntd();
    },
    methods: {
      effects($) {
        $('p1.fieldType').onFieldCreateOrChange((v) => {
          console.log(v);
        });
      }
    }
  };
</script>
