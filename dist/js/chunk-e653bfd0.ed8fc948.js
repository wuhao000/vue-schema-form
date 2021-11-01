(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e653bfd0"],{5078:function(e,t,n){"use strict";n.r(t);var o=n("8bbf");function r(e,t,n,r,c,a){var u=Object(o["resolveComponent"])("v-schema-form"),l=Object(o["resolveComponent"])("a-layout-content"),i=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(i,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,{props:e.props,schema:r.definition,value:r.value2,class:"demo-form",platform:"mobile",onCancel:e.onCancel,onOk:e.onOk},null,8,["props","schema","value","onCancel","onOk"])]})),_:1})]})),_:1})}var c=n("64e2"),a=n("98ce");Object(a["l"])();var u={name:"Demo",setup:function(){return{definition:Object(o["computed"])((function(){return Object(c["a"])()})),value2:Object(c["b"])()}}},l=n("6b0d"),i=n.n(l);const p=i()(u,[["render",r]]);var s=p,b={class:"markdown-body"},d=Object(o["createTextVNode"])("\n"),m=Object(o["createTextVNode"])("\n"),f=Object(o["createTextVNode"])('\n  \n<template>\n  <a-layout>\n    <a-layout-content>\n      <v-schema-form\n          :props="props"\n          :schema="definition"\n          :value="value2"\n          class="demo-form"\n          platform="mobile"\n          @cancel="onCancel"\n          @ok="onOk"></v-schema-form>\n    </a-layout-content>\n  </a-layout>\n</template>\n<script lang="tsx">\n  import {getSubFormDefinition, getSubFormValue} from \'../../../views/demo/utils/utils\';\n  import {computed} from \'vue\';\n  import {registerAntdMobile} from \'../../../schema-form\';\n\n  registerAntdMobile();\n  export default {\n    name: "Demo",\n    setup() {\n      return {\n        definition: computed(() => {\n          return getSubFormDefinition();\n        }),\n        value2: getSubFormValue()\n      };\n    }\n  };\n<\/script>\n\n'),O=Object(o["createTextVNode"])("\n"),j=Object(o["defineComponent"])({setup:function(e){return function(e,t){var n=Object(o["resolveComponent"])("code-container"),r=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",b,[Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(r,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[f]})),_:1})]})),default:Object(o["withCtx"])((function(){return[d,Object(o["createVNode"])(s),m,O]})),_:1})])])}}});const v=j;t["default"]=v},"64e2":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return r}));var o=function(){return{values:{input:"abc",switch:!1},valueArray:[{input:"abc"},{input:"def"}]}},r=function(){return{props:{labelCol:{span:2}},fields:{valueArray:{title:"子表单数组",type:"object",array:!0,fields:{input:{title:"数组文本",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}}}}}}]);
//# sourceMappingURL=chunk-e653bfd0.ed8fc948.js.map