<template>
  <ae-layout>
    <ae-layout-content class="demo-wrapper">
      <v-schema-form v-model="value"
                     class="demo-form"
                     :schema="schema"
                     :props="props"
                     @ok="onOk"></v-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import FormBlock from '@/schema-form/layout/form-block';
  import ShowValue from '@/views/demo/show-value';
  import axios from 'axios';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'AntdList',
    components: {ShowValue}
  })
  export default class AntdList extends Vue {

    public props = {
      labelCol: 9,
      wrapperCol: 6
    };
    public schema = {
      array: true,
      arrayComponent: FormBlock,
      arrayProps: {
        addText: '这是定制的添加文案',
        removeText: '这是定制的删除文案',
        maxItems: 3
      },
      fields: {
        basic: {
          type: 'object',
          props: {
            labelCol: 9,
            wrapperCol: 6
          },
          fields: {
            aa: {
              type: 'string',
              title: '字段1'
            },
            bb: {
              type: 'string',
              title: '字段2'
            },
            cc: {
              type: 'object',
              props: {
                gutter: 10
              },
              fields: {
                grid: {
                  type: 'grid',
                  layout: [8, 8],
                  title: '字段3',
                  props: {gutter: 10},
                  fields: {
                    cc: {
                      type: 'string'
                    },
                    dd: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      },
      title: '数组'
    };

    public value = [{
      basic: {
        aa: '1234'
      }
    }];

    public created() {
      SchemaForm.registerElement();
    }

    public onOk() {
      axios.post('http://aaa', this.value);
    }
  }
</script>
