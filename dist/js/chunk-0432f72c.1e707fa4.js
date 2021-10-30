(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0432f72c"],{aa11:function(e,t,n){"use strict";n.r(t);var r=n("8bbf");function i(e,t,n,i,u,o){var l=Object(r["resolveComponent"])("v-schema-form"),a=Object(r["resolveComponent"])("a-layout-content"),p=Object(r["resolveComponent"])("a-layout");return Object(r["openBlock"])(),Object(r["createBlock"])(p,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(a,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{value:e.value,"onUpdate:value":t[0]||(t[0]=function(t){return e.value=t}),platform:"desktop",schema:e.schema,class:"basic-info-form bg-white",onOk:e.onSubmit},null,8,["value","schema","onOk"])]})),_:1})]})),_:1})}var u=n("98ce");Object(u["j"])();var o=Object(r["defineComponent"])({name:"BasicSetting",setup:function(){var e=Object(r["ref"])({});return{value:e,schema:{props:{labelWidth:150},fields:[{property:"string",required:!0,title:"必填校验",type:"string"},{property:"string2",required:!0,title:"长度校验",type:"string",min:10,default:"abcde"},{property:"string2",required:!0,title:"长度校验",type:"string",max:5,default:"abcdeefg"},{property:"number",required:!0,title:"最小值校验",type:"number",min:10,default:3},{property:"number",required:!0,title:"最大值校验",type:"number",max:5,default:10},{property:"email",required:!0,title:"邮箱校验",type:"string",default:"1234",rules:["email"]},{property:"idcard",required:!0,title:"身份证号校验",type:"string",default:"1234",rules:["idcard"]},{property:"ipv4",required:!0,title:"ipv4校验",type:"string",default:"1234",rules:["ipv4"]},{property:"ipv6",required:!0,title:"ipv4校验",type:"string",default:"1234",rules:["ipv6"]},{property:"phone",required:!0,title:"电话号码校验",type:"string",default:"1234",rules:["phone"]},{property:"url",required:!0,title:"链接地址校验",type:"string",default:"1234",rules:["url"]}]},onSubmit:function(){console.log("submit")}}}}),l=(n("f283"),n("6b0d")),a=n.n(l);const p=a()(o,[["render",i]]);var c=p,d={class:"markdown-body"},s=Object(r["createTextVNode"])("\n"),m=Object(r["createTextVNode"])("\n"),f=Object(r["createTextVNode"])("\n  \n<template>\n  <a-layout>\n    <a-layout-content>\n      <v-schema-form\n          v-model:value=\"value\"\n          platform=\"desktop\"\n          :schema=\"schema\"\n          class=\"basic-info-form bg-white\"\n          @ok=\"onSubmit\"/>\n    </a-layout-content>\n  </a-layout>\n</template>\n<script lang=\"ts\">\n  import {defineComponent, ref} from 'vue';\n  import {SchemaFormField} from '../../../../types';\n  import {registerAntd} from '../../../schema-form';\n\n  registerAntd();\n\n  export default defineComponent({\n    name: 'BasicSetting',\n    setup() {\n      const value = ref({});\n\n      return {\n        value,\n        schema: {\n          props: {\n            labelWidth: 150\n          },\n          fields: [{\n            property: 'string',\n            required: true,\n            title: '必填校验',\n            type: 'string'\n          }, {\n            property: 'string2',\n            required: true,\n            title: '长度校验',\n            type: 'string',\n            min: 10,\n            default: 'abcde'\n          }, {\n            property: 'string2',\n            required: true,\n            title: '长度校验',\n            type: 'string',\n            max: 5,\n            default: 'abcdeefg'\n          }, {\n            property: 'number',\n            required: true,\n            title: '最小值校验',\n            type: 'number',\n            min: 10,\n            default: 3\n          }, {\n            property: 'number',\n            required: true,\n            title: '最大值校验',\n            type: 'number',\n            max: 5,\n            default: 10\n          }, {\n            property: 'email',\n            required: true,\n            title: '邮箱校验',\n            type: 'string',\n            default: '1234',\n            rules: ['email']\n          }, {\n            property: 'idcard',\n            required: true,\n            title: '身份证号校验',\n            type: 'string',\n            default: '1234',\n            rules: ['idcard']\n          }, {\n            property: 'ipv4',\n            required: true,\n            title: 'ipv4校验',\n            type: 'string',\n            default: '1234',\n            rules: ['ipv4']\n          }, {\n            property: 'ipv6',\n            required: true,\n            title: 'ipv4校验',\n            type: 'string',\n            default: '1234',\n            rules: ['ipv6']\n          }, {\n            property: 'phone',\n            required: true,\n            title: '电话号码校验',\n            type: 'string',\n            default: '1234',\n            rules: ['phone']\n          }, {\n            property: 'url',\n            required: true,\n            title: '链接地址校验',\n            type: 'string',\n            default: '1234',\n            rules: ['url']\n          }]\n        } as SchemaFormField,\n        onSubmit: () => {\n          console.log('submit');\n        }\n      };\n    }\n  });\n<\/script>\n<style lang=\"less\">\n  .basic-info-form {\n    background-color: white;\n    padding: 30px;\n    max-width: 1000px;\n    margin: 0 auto;\n\n    .select-group-btn {\n      width: 100%;\n    }\n  }\n</style>\n\n"),b=Object(r["createTextVNode"])("\n"),y=Object(r["defineComponent"])({setup:function(e){return function(e,t){var n=Object(r["resolveComponent"])("code-container"),i=Object(r["resolveComponent"])("demo-wrapper");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",d,[Object(r["createElementVNode"])("pre",null,[Object(r["createVNode"])(i,null,{code:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(n,null,{default:Object(r["withCtx"])((function(){return[f]})),_:1})]})),default:Object(r["withCtx"])((function(){return[s,Object(r["createVNode"])(c),m,b]})),_:1})])])}}});const g=y;t["default"]=g},f283:function(e,t,n){"use strict";n("fad3")},fad3:function(e,t,n){}}]);
//# sourceMappingURL=chunk-0432f72c.1e707fa4.js.map