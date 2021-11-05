(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c950d"],{"592e":function(e,n,t){"use strict";t.r(n);var o=t("8bbf"),l=Object(o["createElementVNode"])("h3",{class:"demo-h3"},"根据自定义组件的复杂解构",-1);function a(e,n,t,a,c,r){var u=Object(o["resolveComponent"])("v-schema-form"),i=Object(o["resolveComponent"])("a-layout-content"),d=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(d,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,{value:a.value,"onUpdate:value":n[0]||(n[0]=function(e){return a.value=e}),components:a.components,props:e.props,schema:a.definition,class:"demo-form"},null,8,["value","components","props","schema"]),Object(o["createElementVNode"])("div",null,[l,Object(o["createVNode"])(u,{value:a.value2,"onUpdate:value":n[1]||(n[1]=function(e){return a.value2=e}),components:a.components,schema:a.definition2},null,8,["value","components","schema"])])]})),_:1})]})),_:1})}var c=t("98ce"),r=function(e){return Object(o["createVNode"])("div",null,[Object(o["createVNode"])("pre",null,[JSON.stringify(e.value)])])},u={name:"Demo",setup:function(){Object(c["k"])();var e=Object(o["ref"])(),n=[{value:"zhejiang",label:"浙江",isLeaf:!1,loading:!1,children:[{label:"杭州",value:"hz"},{label:"温州",value:"wz"}]},{value:"jiangsu",label:"江苏",isLeaf:!1,loading:!1,children:[{label:"南京",value:"nj",children:[{label:"鼓楼区",value:"gl"},{label:"玄武区",value:"xw"}]},{label:"苏州",value:"sz"}]}],t=Object(o["ref"])(!1),l=Object(o["ref"])(null);return{value2:e,complexValue:l,components:[{component:r,platforms:"desktop",mode:"render",types:"complex"}],options:n,dialogVisible:t,value:{start:new Date(2020,0,1),end:new Date},definition2:{fields:{button:{type:"button",title:"点击上传复杂数据",wrapperProps:{noTitle:!0},props:{action:function(e){e("#complex").onFieldCreateOrChange((function(e){l.value=e})).value({aa:{bb:{cc:123,dd:[333,444],ee:"abcde"}}})}}},"{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}":{id:"complex",type:"complex",title:"复杂解构",required:!0}}},definition:Object(o["computed"])((function(){return{fields:{"[start, end]":{type:"daterange",title:"时间范围"},"[province,city,town]":{type:"cascader",title:"省市区",placeholder:"请选择",enum:n}}}}))}}},i=t("6b0d"),d=t.n(i);const s=d()(u,[["render",a]]);var p=s,m={class:"markdown-body"},b=Object(o["createElementVNode"])("h1",{id:"字段解构"},"字段解构",-1),f=Object(o["createElementVNode"])("blockquote",null,[Object(o["createElementVNode"])("p",null,"字段解构是一个非常强大的特性，它可以对组件生产的值做解构转换，使得快速贴合服务端数据结构要求，无需再做二次转换 字段解构主要是对 name 用 ES Deconstruction 语法做解构，需要注意的是，不支持...语法")],-1),v=Object(o["createElementVNode"])("h3",{id:"最常见的解构案例"},"最常见的解构案例",-1),j=Object(o["createElementVNode"])("blockquote",null,[Object(o["createElementVNode"])("p",null,"通常，我们使用日期范围组件的时候组件生产的值是一个数组，但是往往服务端都是以 startDate,endDate 的方式做存储，如果每次前端都花大量精力去转换的话，其实成本还是很高的。所以，我们可以借助字段解构，轻松解决该问题.")],-1),O=Object(o["createTextVNode"])("\n"),h=Object(o["createTextVNode"])("\n"),x=Object(o["createTextVNode"])("\n  <template>\n  <a-layout>\n    <a-layout-content>\n      <v-schema-form\n          v-model:value=\"value\"\n          :components=\"components\"\n          :props=\"props\"\n          :schema=\"definition\"\n          class=\"demo-form\"/>\n      <div>\n        <h3 class=\"demo-h3\">根据自定义组件的复杂解构</h3>\n        <v-schema-form\n            v-model:value=\"value2\"\n            :components=\"components\"\n            :schema=\"definition2\"/>\n      </div>\n    </a-layout-content>\n  </a-layout>\n</template>\n<script lang=\"tsx\">\n  import {EffectsContext, SchemaFormComponentOptions} from '../../../../types';\n  import {computed, ref} from 'vue';\n  import {registerAntd} from '../../../schema-form';\n\n  const complex = (props) => {\n    return <div>\n      <pre>\n        {JSON.stringify(props.value)}\n      </pre>\n    </div>;\n  };\n\n  export default {\n    name: 'Demo',\n    setup() {\n      registerAntd();\n      const value2 = ref<any>();\n      const options = [\n        {\n          value: 'zhejiang',\n          label: '浙江',\n          isLeaf: false,\n          loading: false,\n          children: [{\n            label: '杭州', value: 'hz'\n          }, {\n            label: '温州', value: 'wz'\n          }]\n        }, {\n          value: 'jiangsu',\n          label: '江苏',\n          isLeaf: false,\n          loading: false,\n          children: [{\n            label: '南京', value: 'nj',\n            children: [{\n              label: '鼓楼区', value: 'gl'\n            }, {\n              label: '玄武区', value: 'xw'\n            }]\n          }, {\n            label: '苏州', value: 'sz'\n          }]\n        }];\n      const dialogVisible = ref(false);\n      const complexValue = ref<any>(null);\n      return {\n        value2,\n        complexValue,\n        components: [{\n          component: complex,\n          platforms: 'desktop',\n          mode: 'render',\n          types: 'complex'\n        } as SchemaFormComponentOptions],\n        options,\n        dialogVisible,\n        value: {\n          start: new Date(2020, 0, 1),\n          end: new Date()\n        },\n        definition2: {\n          fields: {\n            button: {\n              type: 'button',\n              title: '点击上传复杂数据',\n              wrapperProps: {\n                noTitle: true\n              },\n              props: {\n                action: ($: EffectsContext) => {\n                  $('#complex').onFieldCreateOrChange((v) => {\n                    complexValue.value = v;\n                  }).value({\n                    'aa': {\n                      'bb': {\n                        'cc': 123,\n                        'dd': [\n                          333,\n                          444\n                        ],\n                        'ee': 'abcde'\n                      }\n                    }\n                  });\n                }\n              }\n            },\n            '{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}': {\n              id: 'complex',\n              type: 'complex',\n              title: '复杂解构',\n              required: true\n            }\n          }\n        },\n        definition: computed(() => {\n          return {\n            fields: {\n              '[start, end]': {\n                type: 'daterange',\n                title: '时间范围'\n              },\n              '[province,city,town]': {\n                type: 'cascader',\n                title: '省市区',\n                placeholder: '请选择',\n                enum: options\n              }\n            }\n          };\n        })\n      };\n    }\n  };\n<\/script>\n\n"),V=Object(o["createTextVNode"])("\n"),w=Object(o["defineComponent"])({setup:function(e){return function(e,n){var t=Object(o["resolveComponent"])("code-container"),l=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",m,[b,f,v,j,Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(l,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(t,null,{default:Object(o["withCtx"])((function(){return[x]})),_:1})]})),default:Object(o["withCtx"])((function(){return[O,Object(o["createVNode"])(p),h,V]})),_:1})])])}}});const y=w;n["default"]=y}}]);
//# sourceMappingURL=chunk-2d0c950d.88631871.js.map