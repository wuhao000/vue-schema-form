<template>
  <div id="app">
    <schema-form v-model="form"
                 style="width:800px;margin:0 auto;"
                 :definition="formDefinition"/>
  </div>
</template>

<script lang="ts">
  import {FormDescriptor} from '@/types/bean';

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

    public form = {};

    get formDefinition(): FormDescriptor {
      return {
        'platform': 'desktop',
        'props': {'labelSuffix': ':', 'gutter': 40},
        'fields': [{
          'title': '是否涉及法院案件',
          'property': 'hasCase',
          'span': 6,
          'required': true,
          'type': 'Select',
          'array': false,
          'depends': [],
          'props': {'options': [{'label': '是', 'value': 1}, {'label': '否', 'value': 0}]}
        }, {
          'title': '涉及案号',
          'property': 'caseNumber',
          'span': 6,
          'required': true,
          'type': 'String',
          'array': false,
          'depends': [{'operator': '=', 'property': 'hasCase', 'value': 1}],
          'props': {}
        }, {
          'title': '关联案号',
          'property': 'relatedCaseNumbers',
          'span': 12,
          'required': false,
          'type': 'String',
          'array': true,
          'depends': [{'operator': '=', 'property': 'hasCase', 'value': 1}],
          'props': {'addBtnText': '关联案号', 'addBtnProps': {'type': 'primary'}}
        }, {
          'title': '咨询类别',
          'property': 'consultType',
          'span': 6,
          'required': true,
          'type': 'Select',
          'array': false,
          'depends': [{'operator': '=', 'property': 'hasCase', 'value': 0}],
          'props': {
            'options': [{
              'id': '40288bee6c3c7c1c016c3d26769800ae',
              'name': '非诉咨询',
              'title': 'pub',
              'code': 'no_suit_consult',
              'orgi': 'ukewo',
              'ctype': 'layui-icon',
              'parentid': '40288bee6c3c7c1c016c3d25326700a9',
              'iconstr': '',
              'iconskin': '',
              'description': '',
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': true,
              'discode': false,
              'createtime': 1564394027000,
              'updatetime': null,
              'sortindex': 0,
              'dicid': '40288bee6c3c7c1c016c3d25326700a9',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c3d26bc0400b2',
              'name': '法律咨询',
              'title': 'pub',
              'code': 'law_consult',
              'orgi': 'ukewo',
              'ctype': 'layui-icon',
              'parentid': '40288bee6c3c7c1c016c3d25326700a9',
              'iconstr': '',
              'iconskin': '',
              'description': '',
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': true,
              'discode': false,
              'createtime': 1564394044000,
              'updatetime': null,
              'sortindex': 0,
              'dicid': '40288bee6c3c7c1c016c3d25326700a9',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }], 'labelProperty': 'name', 'valueProperty': 'code'
          }
        }, {
          'title': '咨询事项',
          'property': 'consultIssue',
          'span': 6,
          'required': true,
          'type': 'Select',
          'array': false,
          'depends': [{'operator': '=', 'property': 'hasCase', 'value': 0}, {
            'operator': '=',
            'property': 'consultType',
            'value': 'no_suit_consult'
          }],
          'props': {
            'options': [{
              'id': '40288bee6c3c7c1c016c3d3ac21100c3',
              'name': '立案咨询',
              'title': 'pub',
              'code': 'registration_consult',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c3d3823fb00be',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564395357000,
              'updatetime': 1564395357000,
              'sortindex': 1,
              'dicid': '40288bee6c3c7c1c016c3d3823fb00be',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c3d3ac21f00c4',
              'name': '诉费咨询',
              'title': 'pub',
              'code': 'expense_consult',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c3d3823fb00be',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564395357000,
              'updatetime': 1564395357000,
              'sortindex': 2,
              'dicid': '40288bee6c3c7c1c016c3d3823fb00be',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c3d3ac22b00c5',
              'name': '法院咨询',
              'title': 'pub',
              'code': 'court_consult',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c3d3823fb00be',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564395357000,
              'updatetime': 1564395357000,
              'sortindex': 3,
              'dicid': '40288bee6c3c7c1c016c3d3823fb00be',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c3d3ac23800c6',
              'name': '其他',
              'title': 'pub',
              'code': 'other_consult',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c3d3823fb00be',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564395357000,
              'updatetime': 1564395357000,
              'sortindex': 4,
              'dicid': '40288bee6c3c7c1c016c3d3823fb00be',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }], 'labelProperty': 'name', 'valueProperty': 'code'
          }
        }, {
          'title': '咨询事项',
          'property': 'consultIssue',
          'span': 6,
          'required': true,
          'type': 'Select',
          'array': false,
          'depends': [{'operator': '=', 'property': 'hasCase', 'value': 0}, {
            'operator': '=',
            'property': 'consultType',
            'value': 'law_consult'
          }],
          'props': {
            'options': [{
              'id': '40288bee6c3c7c1c016c40e13805011e',
              'name': '民事',
              'title': 'pub',
              'code': 'civil',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c40deed110116',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564456597000,
              'updatetime': 1564456597000,
              'sortindex': 1,
              'dicid': '40288bee6c3c7c1c016c40deed110116',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c40e13814011f',
              'name': '行政',
              'title': 'pub',
              'code': 'administration',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c40deed110116',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564456598000,
              'updatetime': 1564456598000,
              'sortindex': 2,
              'dicid': '40288bee6c3c7c1c016c40deed110116',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c40e138210120',
              'name': '刑事',
              'title': 'pub',
              'code': 'criminal',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c40deed110116',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564456598000,
              'updatetime': 1564456598000,
              'sortindex': 3,
              'dicid': '40288bee6c3c7c1c016c40deed110116',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c40e1382d0121',
              'name': '国家赔偿',
              'title': 'pub',
              'code': 'compensate',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c40deed110116',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564456598000,
              'updatetime': 1564456598000,
              'sortindex': 4,
              'dicid': '40288bee6c3c7c1c016c40deed110116',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c40e138390122',
              'name': '执行',
              'title': 'pub',
              'code': 'enforcement',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c40deed110116',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564456598000,
              'updatetime': 1564456598000,
              'sortindex': 5,
              'dicid': '40288bee6c3c7c1c016c40deed110116',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }, {
              'id': '40288bee6c3c7c1c016c40e138450123',
              'name': '其他',
              'title': 'pub',
              'code': 'other',
              'orgi': 'ukewo',
              'ctype': null,
              'parentid': '40288bee6c3c7c1c016c40deed110116',
              'iconstr': null,
              'iconskin': null,
              'description': null,
              'catetype': null,
              'memo': null,
              'creater': '4028cac3614cd2f901614cf8be1f0324',
              'haschild': false,
              'discode': false,
              'createtime': 1564456598000,
              'updatetime': 1564456598000,
              'sortindex': 6,
              'dicid': '40288bee6c3c7c1c016c40deed110116',
              'menutype': null,
              'rules': null,
              'module': null,
              'url': null,
              'mlevel': null,
              'defaultvalue': false
            }], 'labelProperty': 'name', 'valueProperty': 'code'
          }
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
    margin-top: 60px;
  }
</style>
