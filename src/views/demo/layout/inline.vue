<template>
  <ae-layout class="bg-white wrapper">
    <ae-layout-content>
      <v-schema-form :editable="editable"
                     :schema="schema"
                     :value="value"></v-schema-form>
      <v-schema-form v-model="searchForm"
                     class="m-b"
                     :schema="searchFormDefinition">
        <d-form-item slot="search">
          <d-button>查询</d-button>
        </d-form-item>
      </v-schema-form>
      <v-schema-form v-model="value2"
                     :effects="effects2"
                     :schema="schema2">

      </v-schema-form>
      <d-button @click="changeMode">
        {{editable ? '详情' : '编辑'}}
      </d-button>
      <show-value :value="value"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import ShowValue from '@/views/demo/show-value';
  import {SchemaFormField} from 'v-schema-form-types';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'LayoutInline',
    components: {ShowValue}
  })
  export default class LayoutInline extends Vue {

    private editable = true;
    public schema = {
      props: {
        inline: true
      },
      fields: {
        aaa: {
          type: 'string',
          title: '字段1',
          notice: 'aaaaaaaa'
        },
        bbb: {
          type: 'number',
          title: '字段2'
        },
        ccc: {
          type: 'date',
          title: '字段3'
        },
        'ddd.ee': {
          type: 'date',
          title: '字段4'
        }
      }
    };
    public schema2 = {
      props: {inline: true},
      fields: {
        month: {
          type: 'month',
          title: '时间选择',
          processor: {
            getValue: (v) => {
              if (v && v.year && v.month) {
                return new Date(v.year, v.month - 1);
              }
            },
            setValue: (parentValue, field, fieldValue: Date) => {
              if (fieldValue) {
                parentValue.year = fieldValue.getFullYear();
                parentValue.month = fieldValue.getMonth() + 1;
              }
            }
          }
        },
        export: {
          type: 'button',
          title: '导出数据',
          wrapperProps: {
            noTitle: true
          },
          props: {
            icon: 'export',
            action: ($) => {
            }
          }
        }
      }
    };
    public searchForm = {};
    public searchFormDefinition: SchemaFormField = {
      type: 'object',
      props: {
        inline: true
      },
      fields: [{
        title: '关键字',
        type: 'string',
        property: 'keyword'
      }, {
        slot: 'search'
      }]
    };
    public value = {};
    public value2 = {
      year: 2019,
      month: 9
    };

    public beforeCreate() {
      SchemaForm.registerAntd();
      // SchemaForm.registerElement();
    }

    public changeMode() {
      this.editable = !this.editable;
    }

    public effects2($) {
      $('month').onFieldChange((v) => {
        console.log('month changed: ' + v);
      });
    }
  }
</script>
