<template>
  <div id="app">
    <a-schema-form v-model="options"
                   :definition="optionsDefinition"
                   :platform="options.platform"
                   :props="formProps"></a-schema-form>
    {{form}}
    <a-schema-form v-model="form"
                   :definition="formDefinition"
                   :mode="options.mode"
                   :platform="options.platform"/>
  </div>
</template>

<script lang="ts">
  import {FormDescriptor, Platform} from '@/types/bean';

  import Vue from 'vue';
  import Component from 'vue-class-component';
  import HelloWorld from './components/HelloWorld.vue';

  @Component({
    name: 'App',
    components: {
      HelloWorld
    }
  })
  export default class App extends Vue {

    public form = {
      string: '111',
      text: 'abc',
      integer: '22',
      double: '0.2',
      datetime: new Date(),
      date: new Date(),
      time: null
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
          props: {options: [{label: '1', value: 1}, {label: '2', value: 2}]}
        }, {
          title: '展开单选',
          property: 'expand-select',
          type: 'expand-select',
          props: {options: [{label: '1', value: 1}, {label: '2', value: 2}]}
        }, {
          title: '多选',
          property: 'select',
          type: 'select',
          array: true,
          props: {options: [{label: '1', value: 1}, {label: '2', value: 2}]}
        }, {
          title: '展开多选',
          property: 'expand-select-array',
          type: 'expand-select',
          array: true,
          props: {options: [{label: '1', value: 1}, {label: '2', value: 2}]}
        }, {
          title: '子表单',
          property: 'values',
          type: 'SubForm',
          properties: [{
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
      return {'labelSuffix': ':', 'gutter': 40};
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
