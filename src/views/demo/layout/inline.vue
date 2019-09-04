<template>
  <ae-layout class="bg-white wrapper">
    <ae-layout-content>
      <v-schema-form :mode="mode"
                     :schema="schema"
                     :value="value"></v-schema-form>
      <v-schema-form v-model="searchForm"
                     class="m-b"
                     :schema="searchFormDefinition">
        <d-form-item slot="search">
          <d-button>查询</d-button>
        </d-form-item>
      </v-schema-form>
      <d-button @click="changeMode">
        {{mode === 'display' ? '编辑':'详情'}}
      </d-button>
      <show-value :value="value"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import {SchemaFormField} from '@/types/bean';
  import ShowValue from '@/views/demo/show-value';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'LayoutInline',
    components: {ShowValue}
  })
  export default class LayoutInline extends Vue {

    private mode = 'edit';
    public schema = {
      props: {
        inline: true
      },
      fields: {
        aaa: {
          type: 'string',
          title: '字段1'
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

    public beforeCreate() {
      SchemaForm.registerAntd();
    }

    public changeMode() {
      if (this.mode === 'display') {
        this.mode = 'edit';
      } else {
        this.mode = 'display';
      }
    }
  }
</script>
