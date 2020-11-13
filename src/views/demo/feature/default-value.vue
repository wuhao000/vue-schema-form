<template>
  <div>
    <v-schema-form v-model="value"
                   :effects="effects"
                   :schema="schema"/>
    <pre>{{value}}</pre>
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
        age: null,
        note: ''
      },
      schema: {
        props: {'labelWidth': '120px'},
        fields: [{
          property: 'note',
          title: '提示文字',
          type: 'string',
          default: ''
        }, {
          type: 'grid',
          layout: [[12, 12, 12]],
          fields: [{
            property: 'number',
            title: '数值输入框',
            type: 'number',
            placeholder: '',
            props: {'extra': '个'},
            default: 0
          }, {
            property: 'select',
            title: '多选框',
            array: true,
            type: 'select',
            placeholder: '',
            default: []
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
      $('p1.fieldType').onFieldCreateOrChange((v) => {
        console.log(v);
      });
    }
  }
};
</script>
