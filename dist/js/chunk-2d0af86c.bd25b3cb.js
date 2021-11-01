(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0af86c"],{"0f66":function(e,n,t){"use strict";t.r(n);var r=t("8bbf");function c(e,n,t,c,o,a){var p=Object(r["resolveComponent"])("v-schema-form");return Object(r["openBlock"])(),Object(r["createBlock"])(p,{value:e.value,"onUpdate:value":n[0]||(n[0]=function(n){return e.value=n}),schema:e.schema},null,8,["value","schema"])}var o=t("98ce");Object(o["k"])();var a=Object(r["defineComponent"])({name:"Demo",setup:function(){var e=Object(r["ref"])({}),n=function(){e.value={a:"aaa",b:"bbb",name:"cccccccc"}},t=Object(r["computed"])((function(){for(var e=[],n=0;n<20;n++)e.push({label:"第"+n,value:n});return e}));return{options:t,setValue:n,value:e,schema:{fields:[{type:"grid",layout:[[4,4],[6,{span:6,offset:2},6],[12]],props:{gutter:20},fields:[{property:"a",title:"a",type:"string"},{property:"b",title:"b",type:"string"},{property:"c",title:"c",type:"string"},{property:"d",title:"d",type:"string"},{property:"e",title:"e",type:"string"},{property:"f",title:"f",type:"string"}]}]}}}}),p=t("6b0d"),i=t.n(p);const l=i()(a,[["render",c]]);var s=l,u={class:"markdown-body"},d=Object(r["createTextVNode"])("\n"),f=Object(r["createTextVNode"])("\n"),b=Object(r["createTextVNode"])("\n  \n<template>\n  <v-schema-form\n      v-model:value=\"value\"\n      :schema=\"schema\"/>\n</template>\n<script lang=\"ts\">\n  import {computed, defineComponent, ref} from 'vue';\n  import {registerAntd} from '../../schema-form';\n\n  registerAntd();\n  export default defineComponent({\n    name: 'Demo',\n    setup() {\n      const value = ref({});\n      const setValue = () => {\n        value.value = {\n          a: 'aaa',\n          b: 'bbb',\n          name: 'cccccccc'\n        };\n      };\n      const options = computed(() => {\n        const array = [];\n        for (let i = 0; i < 20; i++) {\n          array.push(\n              {label: '第' + i, value: i}\n          );\n        }\n        return array;\n      });\n      return {\n        options,\n        setValue,\n        value,\n        schema: {\n          fields: [\n            {\n              type: 'grid',\n              layout: [[4, 4], [6, {span: 6, offset: 2}, 6], [12]],\n              props: {gutter: 20},\n              fields: [\n                {\n                  property: 'a',\n                  title: 'a',\n                  type: 'string'\n                },\n                {\n                  property: 'b',\n                  title: 'b',\n                  type: 'string'\n                },\n                {\n                  property: 'c',\n                  title: 'c',\n                  type: 'string'\n                },\n                {\n                  property: 'd',\n                  title: 'd',\n                  type: 'string'\n                },\n                {\n                  property: 'e',\n                  title: 'e',\n                  type: 'string'\n                },\n                {\n                  property: 'f',\n                  title: 'f',\n                  type: 'string'\n                }\n              ]\n            }\n          ]\n        }\n      };\n    }\n  });\n<\/script>\n\n"),m=Object(r["createTextVNode"])("\n"),y=Object(r["defineComponent"])({setup:function(e){return function(e,n){var t=Object(r["resolveComponent"])("code-container"),c=Object(r["resolveComponent"])("demo-wrapper");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",u,[Object(r["createElementVNode"])("pre",null,[Object(r["createVNode"])(c,null,{code:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(t,null,{default:Object(r["withCtx"])((function(){return[b]})),_:1})]})),default:Object(r["withCtx"])((function(){return[d,Object(r["createVNode"])(s),f,m]})),_:1})])])}}});const v=y;n["default"]=v}}]);
//# sourceMappingURL=chunk-2d0af86c.bd25b3cb.js.map