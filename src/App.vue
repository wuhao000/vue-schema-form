<template>
  <div id="app">
    <a-tabs v-model="activeTab">
      <a-tab-pane tab="桌面端查看"
                  :key="1">
        <a-schema-form v-model="form"
                       mode="display"
                       platform="desktop"
                       :definition="formDefinition"
                       :props="formProps"/>
      </a-tab-pane>
      <a-tab-pane tab="移动端查看"
                  :key="2">
        <a-schema-form v-model="form"
                       mode="display"
                       platform="mobile"
                       :definition="formDefinition"
                       :props="formProps"/>
      </a-tab-pane>
      <a-tab-pane tab="桌面端编辑"
                  :key="3">
        <a-schema-form v-model="form"
                       mode="edit"
                       platform="desktop"
                       :definition="formDefinition"
                       :props="formProps"/>
      </a-tab-pane>
      <a-tab-pane tab="移动端编辑"
                  :key="4">
        <a-schema-form v-model="form"
                       mode="edit"
                       platform="mobile"
                       :definition="formDefinition"
                       :props="formProps"/>
      </a-tab-pane>
      <a-tab-pane tab="查看数据"
                  :key="5">
        <pre>{{form}}</pre>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
  import {TYPES} from '@/schema-form/utils';
  import {FormDescriptor, Platform} from '@/types/bean';

  import Vue from 'vue';
  import Component from 'vue-class-component';
  import HelloWorld from './components/HelloWorld.vue';

  const options = [{
    label: '选项1',
    value: 1
  }, {
    label: '选项2',
    value: 2
  }, {
    label: '选项3',
    value: 3
  }];
  @Component({
    name: 'App',
    components: {
      HelloWorld
    }
  })
  export default class App extends Vue {

    public activeTab = 1;
    public form = {
      string: '111',
      text: 'abc',
      integer: '22',
      double: '0.2',
      url: 'http://www.aegis-info.com',
      datetime: new Date(),
      date: new Date(),
      time: moment(),
      select: 1,
      multiSelect: [1, 3],
      expandSelect: 2,
      expandMultiSelect: [2, 3]
    };
    public options: { platform: Platform, mode: string } = {
      platform: 'desktop',
      mode: 'display'
    };

    get formDefinition(): FormDescriptor {
      return {
        fields: [{
          title: '单行文本',
          property: 'string',
          type: 'string'
        }, {
          title: '多行文本',
          property: 'text',
          type: 'text'
        }, {
          title: '链接',
          property: 'url',
          type: 'url'
        }, {
          title: '整数',
          property: 'integer',
          type: 'integer'
        }, {
          title: '小数',
          property: 'double',
          type: 'double'
        }, {
          title: '日期',
          property: 'date',
          type: 'date'
        }, {
          title: '日期时间',
          property: 'datetime',
          type: 'datetime'
        }, {
          title: '时间',
          property: 'time',
          type: 'time'
        }, {
          title: '单选',
          property: 'select',
          type: 'select',
          props: {options}
        }, {
          title: '展开单选',
          property: 'expandSelect',
          type: 'expand-select',
          props: {options}
        }, {
          title: '多选',
          property: 'multiSelect',
          type: 'select',
          array: true,
          props: {options}
        }, {
          title: '展开多选',
          property: 'expandMultiSelect',
          type: 'expand-select',
          array: true,
          props: {options}
        }, {
          title: '子表单',
          property: 'values',
          type: TYPES.subForm,
          fields: [{
            title: '输入框',
            type: 'string',
            property: 'input'
          }],
          props: {
            addBtnText: '添加子表单', addBtnProps: {block: true}
          }
        }]
      };
    }

    get formProps() {
      return {'labelSuffix': ':', 'gutter': 40, labelWidth: 120};
    }

    get optionsDefinition() {
      return {
        fields: [{
          property: 'platform',
          type: 'expand-select',
          title: '平台',
          props: {options: [{label: '桌面端', value: 'desktop'}, {label: '移动端', value: 'mobile'}]}
        }, {
          property: 'mode',
          type: 'expand-select',
          title: '模式',
          props: {options: [{label: '编辑模式', value: 'edit'}, {label: '展示模式', value: 'display'}]}
        }]
      };
    }

  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 800px;
    margin: 60px auto 0;
  }
</style>
