(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c7cc4"],{"51c5":function(e,t,n){"use strict";n.r(t);var c=n("8bbf"),r=n("98ce"),o=Object(c["defineComponent"])({setup:function(e){Object(r["j"])();var t={props:{index:!0},fields:[{property:"a",title:"字符串1",type:"string"},{property:"b",title:"字符串2",type:"string"},{property:"c",title:"字符串3",type:"string"}]};return function(e,n){var r=Object(c["resolveComponent"])("v-schema-form");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createVNode"])(r,{schema:t})])}}});const i=o;var p=i,l={class:"markdown-body"},a=Object(c["createElementVNode"])("h1",{id:"表单项添加序号"},"表单项添加序号",-1),s=Object(c["createElementVNode"])("blockquote",null,[Object(c["createElementVNode"])("p",null,"给表单项的标题前面加上序号，如果存在隐藏表单项，则显示的序号不连续")],-1),d=Object(c["createElementVNode"])("h2",{id:"配置说明"},"配置说明",-1),m=Object(c["createElementVNode"])("p",null,[Object(c["createTextVNode"])("设置schema的props属性inline的值为"),Object(c["createElementVNode"])("strong",null,"true")],-1),b=Object(c["createTextVNode"])("\n"),u=Object(c["createTextVNode"])("\n"),j=Object(c["createTextVNode"])("\n  \n<template>\n  <div>\n    <v-schema-form :schema=\"schema\"/>\n  </div>\n</template>\n<script lang=\"ts\" setup>\n  import {registerAntd} from '../../../schema-form';\n  // noinspection ES6UnusedImports\n  import SimpleEditDemo from '../../../views/common/simple.vue';\n  import {SchemaFormField} from '../../../types';\n\n  registerAntd();\n\n  const schema: SchemaFormField = {\n    props: {index: true},\n    fields: [{\n      property: 'a',\n      title: '字符串1',\n      type: 'string'\n    }, {\n      property: 'b',\n      title: '字符串2',\n      type: 'string'\n    }, {\n      property: 'c',\n      title: '字符串3',\n      type: 'string'\n    }]\n  }\n<\/script>\n\n"),O=Object(c["createTextVNode"])("\n"),f=Object(c["defineComponent"])({setup:function(e){return function(e,t){var n=Object(c["resolveComponent"])("code-container"),r=Object(c["resolveComponent"])("demo-wrapper");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",l,[a,s,d,m,Object(c["createElementVNode"])("pre",null,[Object(c["createVNode"])(r,null,{code:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(n,null,{default:Object(c["withCtx"])((function(){return[j]})),_:1})]})),default:Object(c["withCtx"])((function(){return[b,Object(c["createVNode"])(p),u,O]})),_:1})])])}}});const h=f;t["default"]=h}}]);
//# sourceMappingURL=chunk-2d0c7cc4.6be3de2d.js.map