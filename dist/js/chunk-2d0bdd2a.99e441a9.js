(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bdd2a"],{"2e45":function(e,n,t){"use strict";t.r(n);var o=t("8bbf");function c(e,n,t,c,r,a){var l=Object(o["resolveComponent"])("v-schema-form");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",null,[Object(o["createVNode"])(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=function(n){return e.value=n}),schema:e.schema},null,8,["value","schema"])])}var r=t("98ce");Object(r["j"])();var a=Object(o["defineComponent"])({name:"CheckboxDemo",setup:function(){var e=Object(o["ref"])();return{value:e,schema:{fields:{bool:{type:"boolean",title:"bool1",default:!0,description:"这是一段描述信息"},bool2:{type:"boolean",xType:"checkbox",title:"bool2",default:!1}}}}}}),l=t("6b0d"),u=t.n(l);const d=u()(a,[["render",c]]);var b=d,i={class:"markdown-body"},m=Object(o["createTextVNode"])("\n"),p=Object(o["createTextVNode"])("\n"),s=Object(o["createTextVNode"])("\n  \n<template>\n  <div>\n    <v-schema-form\n        v-model:value=\"value\"\n        :schema=\"schema\"/>\n  </div>\n</template>\n<script lang=\"ts\">\n  import {defineComponent, ref} from 'vue';\n  import {SchemaFormField} from '../../../../types';\n  import {registerAntd} from '../../../schema-form';\n\n  registerAntd();\n  export default defineComponent({\n    name: 'CheckboxDemo',\n    setup() {\n      const value = ref();\n      return {\n        value,\n        schema: {\n          fields: {\n            bool: {\n              type: 'boolean',\n              title: 'bool1',\n              default: true,\n              description: '这是一段描述信息'\n            },\n            bool2: {\n              type: 'boolean',\n              xType: 'checkbox',\n              title: 'bool2',\n              default: false\n            }\n          }\n        } as SchemaFormField\n      };\n    }\n  });\n<\/script>\n\n"),f=Object(o["createTextVNode"])("\n"),v=Object(o["defineComponent"])({setup:function(e){return function(e,n){var t=Object(o["resolveComponent"])("code-container"),c=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",i,[Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(c,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(t,null,{default:Object(o["withCtx"])((function(){return[s]})),_:1})]})),default:Object(o["withCtx"])((function(){return[m,Object(o["createVNode"])(b),p,f]})),_:1})])])}}});const j=v;n["default"]=j}}]);
//# sourceMappingURL=chunk-2d0bdd2a.99e441a9.js.map