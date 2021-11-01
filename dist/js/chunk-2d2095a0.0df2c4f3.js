(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2095a0"],{a94f:function(e,n,t){"use strict";t.r(n);var o=t("8bbf");function c(e,n,t,c,a,r){var l=Object(o["resolveComponent"])("v-schema-form"),s=Object(o["resolveComponent"])("a-layout-content"),i=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(i,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(s,{class:"demo-wrapper"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=function(n){return e.value=n}),platform:"mobile",schema:e.schema,class:"demo-form",onOk:e.onOk},null,8,["value","schema","onOk"])]})),_:1})]})),_:1})}var a=t("98ce");Object(a["l"])();var r=Object(o["defineComponent"])({name:"Demo",setup:function(){var e=Object(o["ref"])([{basic:{aa:"1234",cc:{cc:"11"}}}]);return{schema:{type:"object",array:!0,arrayComponent:"block",arrayProps:{addText:"这是定制的添加文案",removeText:"这是定制的删除文案",maxItems:3},fields:{basic:{type:"object",props:{labelWidth:"120px"},fields:{aa:{type:"string",title:"字段1"},bb:{type:"string",title:"字段2"},cc:{type:"object",props:{gutter:10},fields:{cc:{type:"string",title:"字段3"},dd:{type:"string",title:"字段4"}}}}}},title:"数组"},value:e,onOk:function(){console.log(e.value)}}}}),l=t("6b0d"),s=t.n(l);const i=s()(r,[["render",c]]);var p=i,u={class:"markdown-body"},m=Object(o["createTextVNode"])("\n"),b=Object(o["createTextVNode"])("\n"),d=Object(o["createTextVNode"])("\n  \n<template>\n  <a-layout>\n    <a-layout-content class=\"demo-wrapper\">\n      <v-schema-form\n          v-model:value=\"value\"\n          platform=\"mobile\"\n          :schema=\"schema\"\n          class=\"demo-form\"\n          @ok=\"onOk\"/>\n    </a-layout-content>\n  </a-layout>\n</template>\n<script lang=\"ts\">\n  import {defineComponent, ref} from 'vue';\n  import {registerAntdMobile, SchemaFormEvents} from '../../../schema-form';\n\n  registerAntdMobile();\n  export default defineComponent({\n    name: 'Demo',\n    setup() {\n      const value = ref([{\n        basic: {\n          aa: '1234',\n          cc: {\n            cc: '11'\n          }\n        }\n      }]);\n      return {\n        schema: {\n          type: 'object',\n          array: true,\n          arrayComponent: 'block',\n          arrayProps: {\n            addText: '这是定制的添加文案',\n            removeText: '这是定制的删除文案',\n            maxItems: 3\n          },\n          fields: {\n            basic: {\n              type: 'object',\n              props: {\n                labelWidth: '120px'\n              },\n              fields: {\n                aa: {\n                  type: 'string',\n                  title: '字段1'\n                },\n                bb: {\n                  type: 'string',\n                  title: '字段2'\n                },\n                cc: {\n                  type: 'object',\n                  props: {\n                    gutter: 10\n                  },\n                  fields: {\n                    cc: {\n                      type: 'string',\n                      title: '字段3',\n                    },\n                    dd: {\n                      type: 'string',\n                      title: '字段4',\n                    }\n                  }\n                }\n              }\n            }\n          },\n          title: '数组'\n        },\n        value,\n        onOk() {\n          console.log(value.value);\n        }\n      };\n    }\n  });\n<\/script>\n\n"),f=Object(o["createTextVNode"])("\n"),j=Object(o["defineComponent"])({setup:function(e){return function(e,n){var t=Object(o["resolveComponent"])("code-container"),c=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",u,[Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(c,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(t,null,{default:Object(o["withCtx"])((function(){return[d]})),_:1})]})),default:Object(o["withCtx"])((function(){return[m,Object(o["createVNode"])(p),b,f]})),_:1})])])}}});const O=j;n["default"]=O}}]);
//# sourceMappingURL=chunk-2d2095a0.0df2c4f3.js.map