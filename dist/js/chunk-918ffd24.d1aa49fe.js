(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-918ffd24"],{5902:function(e,t,n){"use strict";n.r(t);var o=n("8bbf");function r(e,t,n,r,c,a){var u=Object(o["resolveComponent"])("v-schema-form"),i=Object(o["resolveComponent"])("a-layout-content"),l=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(l,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,{props:e.props,schema:r.definition,value:e.value2,class:"demo-form",onCancel:e.onCancel,onOk:e.onOk},null,8,["props","schema","value","onCancel","onOk"])]})),_:1})]})),_:1})}var c=n("64e2"),a=n("98ce");Object(a["k"])();var u={name:"Demo",setup:function(){return{definition:Object(o["computed"])((function(){return Object(c["a"])()}))}}},i=n("6b0d"),l=n.n(i);const p=l()(u,[["render",r]]);var s=p,d={class:"markdown-body"},f=Object(o["createTextVNode"])("\n"),m=Object(o["createTextVNode"])("\n"),b=Object(o["createTextVNode"])('\n  \n<template>\n  <a-layout>\n    <a-layout-content>\n      <v-schema-form\n          :props="props"\n          :schema="definition"\n          :value="value2"\n          class="demo-form"\n          @cancel="onCancel"\n          @ok="onOk"></v-schema-form>\n    </a-layout-content>\n  </a-layout>\n</template>\n<script lang="tsx">\nimport {getSubFormDefinition} from \'../../../views/demo/utils/utils\';\nimport {computed} from \'vue\';\nimport {registerAntd} from \'../../../schema-form\';\n\nregisterAntd();\nexport default {\n  name: "Demo",\n  setup() {\n    return {\n      definition: computed(() => {\n        return getSubFormDefinition();\n      })\n    };\n  }\n};\n<\/script>\n\n'),O=Object(o["createTextVNode"])("\n"),j=Object(o["defineComponent"])({setup:function(e){return function(e,t){var n=Object(o["resolveComponent"])("code-container"),r=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",d,[Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(r,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[b]})),_:1})]})),default:Object(o["withCtx"])((function(){return[f,Object(o["createVNode"])(s),m,O]})),_:1})])])}}});const v=j;t["default"]=v},"64e2":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return r}));var o=function(){return{values:{input:"abc",switch:!1},valueArray:[{input:"abc"},{input:"def"}]}},r=function(){return{props:{labelCol:{span:2}},fields:{valueArray:{title:"子表单数组",type:"object",array:!0,fields:{input:{title:"数组文本",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}}}}}}]);
//# sourceMappingURL=chunk-918ffd24.d1aa49fe.js.map