(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bdf39"],{"2dd5":function(e,t,n){"use strict";n.r(t);var a=n("8bbf");function r(e,t,n,r,c,o){var d=Object(a["resolveComponent"])("a-input"),l=Object(a["resolveComponent"])("d-form-item"),i=Object(a["resolveComponent"])("d-form"),b=Object(a["resolveComponent"])("a-form-item"),u=Object(a["resolveComponent"])("a-form");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",null,[Object(a["createVNode"])(i,{"label-width":"120px"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(l,{label:"aaa"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(d)]})),_:1}),Object(a["createVNode"])(l,{label:"bbb","label-col":{span:8},"wrapper-col":{span:16}},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(d)]})),_:1}),Object(a["createVNode"])(l,{label:"ccc","label-width":"180px"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(d)]})),_:1})]})),_:1}),Object(a["createVNode"])(i,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(l,{label:"aaa"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(d)]})),_:1})]})),_:1}),Object(a["createVNode"])(u,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(b,{label:"bbb"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(d)]})),_:1})]})),_:1})])}var c=n("98ce");Object(c["k"])();var o=Object(a["defineComponent"])({name:"Demo",setup:function(){var e=Object(a["ref"])(),t=Object(a["ref"])([]),n=Object(a["ref"])(null),r=Object(a["ref"])({timerange:["12:02-12:44","13:44-15:44"]});return{value:e,rangeValue:t,rangeValue2:n,rangeValue3:r,schema:{fields:{image:{type:c["e"].Picture,props:{action:"/api/business_entity/file/upload",data:{access_token:"90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20"}}},file:{type:c["e"].File,props:{action:"/api/business_entity/file/upload",data:{access_token:"90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20"}}},timerange:{title:"time",type:"timerange",array:!0,props:{format:"HH:mm",valueType:"string"}}}}}}}),d=n("6b0d"),l=n.n(d);const i=l()(o,[["render",r]]);var b=i,u={class:"markdown-body"},f=Object(a["createStaticVNode"])('<h1 id="表单组件-dform">表单组件 DForm</h1><h2 id="属性说明">属性说明</h2><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>labelWidth</td><td>标签宽度</td><td>number,string</td><td>无</td></tr><tr><td>disabled</td><td>禁用表单（禁止表单内所有输入组件）</td><td>boolean</td><td>无</td></tr></tbody></table>',3),m=Object(a["createTextVNode"])("\n"),p=Object(a["createTextVNode"])("\n"),s=Object(a["createTextVNode"])("\n  <template>\n  <div>\n    <d-form label-width=\"120px\">\n      <d-form-item label=\"aaa\">\n        <a-input/>\n      </d-form-item>\n      <d-form-item\n          label=\"bbb\"\n          :label-col=\"{span: 8}\"\n          :wrapper-col=\"{span: 16}\">\n        <a-input/>\n      </d-form-item>\n      <d-form-item\n          label=\"ccc\"\n          label-width=\"180px\">\n        <a-input/>\n      </d-form-item>\n    </d-form>\n    <d-form>\n      <d-form-item label=\"aaa\">\n        <a-input/>\n      </d-form-item>\n    </d-form>\n    <a-form>\n      <a-form-item label=\"bbb\">\n        <a-input/>\n      </a-form-item>\n    </a-form>\n  </div>\n</template>\n<script lang=\"ts\">\n  import {defineComponent, ref} from 'vue';\n  import {registerAntd, FieldTypes} from '../../schema-form';\n\n  registerAntd();\n  export default defineComponent({\n    name: 'Demo',\n    setup() {\n      const value = ref();\n      const rangeValue = ref([]);\n      const rangeValue2 = ref(null);\n      const rangeValue3 = ref({\n        timerange: ['12:02-12:44', '13:44-15:44']\n      });\n      return {\n        value,\n        rangeValue,\n        rangeValue2,\n        rangeValue3,\n        schema: {\n          fields: {\n            image: {\n              type: FieldTypes.Picture,\n              props: {\n                action: '/api/business_entity/file/upload',\n                data: {\n                  access_token: '90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20'\n                }\n              }\n            },\n            file: {\n              type: FieldTypes.File,\n              props: {\n                action: '/api/business_entity/file/upload',\n                data: {\n                  access_token: '90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20'\n                }\n              }\n            },\n            timerange: {\n              title: 'time',\n              type: 'timerange',\n              array: true,\n              props: {\n                format: 'HH:mm',\n                valueType: 'string'\n              }\n            }\n          }\n        }\n      };\n    }\n  });\n<\/script>\n\n"),j=Object(a["createTextVNode"])("\n"),O=Object(a["defineComponent"])({setup:function(e){return function(e,t){var n=Object(a["resolveComponent"])("code-container"),r=Object(a["resolveComponent"])("demo-wrapper");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",u,[f,Object(a["createElementVNode"])("pre",null,[Object(a["createVNode"])(r,null,{code:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(n,null,{default:Object(a["withCtx"])((function(){return[s]})),_:1})]})),default:Object(a["withCtx"])((function(){return[m,Object(a["createVNode"])(b),p,j]})),_:1})])])}}});const h=O;t["default"]=h}}]);
//# sourceMappingURL=chunk-2d0bdf39.dc363771.js.map