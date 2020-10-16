<template>
  <div>
    <div>
      <v-schema-form :schema="schema2"
                     v-model="value2"/>
    </div>
    <div>
      <d-button @click="addField">添加</d-button>
    </div>
    <div>
      <v-schema-form :schema="schema"
                     v-model="value"
                     platform="mobile"/>
    </div>
  </div>
</template>
<script lang="tsx">
import SchemaForm from '@/index';
import Vue from 'vue';
import {SchemaFormField} from 'v-schema-form-types';

SchemaForm.registerDisplayComponent(
    {
      props: {value: {}},
      render() {
        return <span>{this['value']?.toString()}</span>;
      }
    }, ['desktop'], ['boolean']);
export default Vue.extend({
  data() {
    return {
      value: {},
      value2: {},
      count: 1,
      dynamicFields: []
    };
  },
  computed: {
    schema2(this: any) {
      return {
        fields: {
          a: {
            title: '名称',
            type: 'string',
            rules: [{
              required: true, message: '请输入', trigger: 'blur'
            }]
          },
          b: {
            title: 'b',
            type: 'boolean',
            editable: false,
            default: true
          }
        }
      } as SchemaFormField;
    },
    schema() {
      const fields = [];
      fields.push({
        title: '标题',
        property: 'title',
        type: 'string'
      });
      this.dynamicFields.forEach(it => {
        fields.push(it);
      });
      return {
        fields
      };
    }
  },
  created() {
    SchemaForm.registerElement();
    SchemaForm.registerAntdMobile();
  },
  methods: {
    addField() {
      this.dynamicFields.push({
        property: 'title-' + this.count,
        title: '标题-' + this.count,
        type: 'string'
      });
      this.count++;
    }
  }
});
</script>
