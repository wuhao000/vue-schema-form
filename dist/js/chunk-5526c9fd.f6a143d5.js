(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5526c9fd"],{"380f":function(e,t,n){"use strict";n("b550"),n("edb9")},"5f12":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return l}));var o=n("98ce"),r=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3},{label:"选项4",value:4}],a=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},i=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:new Date,end:new Date,year:new Date,month:new Date,time:"12:24",timerange:["12:24","13:24"],select:4,multiSelect:[1,3],expandSelect:1,expandMultiSelect:[1,2],transfer:["1"],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},c={expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:r}},select:{title:"单选",required:!0,type:"select",props:{options:r,clearable:!0}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:r}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:r}},text:{title:"多行文本",required:!0,type:"text"},zh:{title:"仅限中文",required:!0,type:"text",format:"zh",default:"not chinese"},string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200},double:{title:"小数",required:!0,type:"double"},switch:{title:"开关",type:o["d"].Boolean},date:{title:"日期",required:!0,type:"date"},"[start, end]":{title:"日期范围",required:!0,type:"daterange"},year:{title:"年份",required:!0,type:"year"},time:{title:"时间",required:!0,type:"time"},timerange:{title:"时间范围",required:!0,type:o["d"].TimeRange},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},file:{title:"卡片上传文件",type:o["d"].File,props:{mode:"card"}},file2:{title:"拖拽上传文件",type:o["d"].File,props:{mode:"dragger"}},file3:{title:"普通上传文件",type:o["d"].File},image:{title:"图片",type:o["d"].Picture},transfer:{title:"穿梭框",type:o["d"].Transfer,enum:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},range:{title:"范围",type:o["d"].Range},rate:{title:"评分",type:o["d"].Rate},subForm:{title:"子表单",type:o["d"].Object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:o["d"].Object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},l=function(){return{props:{section:!0,spaceBetweenSection:16,labelWidth:120},fields:c}}},"8d0b":function(e,t,n){"use strict";n.r(t);var o=n("8bbf");function r(e,t,n,r,a,i){var c=Object(o["resolveComponent"])("v-schema-form"),l=Object(o["resolveComponent"])("a-col"),s=Object(o["resolveComponent"])("a-row"),u=Object(o["resolveComponent"])("a-layout-content"),d=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(d,{class:"demo-wrapper"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{span:12},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(c,{value:r.value2,"onUpdate:value":t[0]||(t[0]=function(e){return r.value2=e}),actions:r.actions,platform:"mobile",effects:r.effects,props:e.props,schema:r.definition,class:"demo-form",onCancel:r.onCancel,onOk:e.onOk,onReset:r.onReset},null,8,["value","actions","effects","props","schema","onCancel","onOk","onReset"])]})),_:1})]})),_:1})]})),_:1})]})),_:1})}n("380f");var a=n("f64c"),i=n("a34a"),c=n.n(i),l=n("9ab4"),s=n("98ce"),u=n("a7ab");Object(s["k"])();var d={name:"Demo",setup:function(e){var t=this,n=Object(u["b"])(),o=n.definition,r=n.value;return{definition:o,value:r,actions:["submit","cancel","reset",{name:"validate",text:"校验",action:function(e){return Object(l["a"])(t,void 0,void 0,c.a.mark((function t(){var n;return c.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.validate();case 2:n=t.sent,n.length&&(a["a"].error(n[0].errors.join("、")),n[0].field.focus(!0));case 4:case"end":return t.stop()}}),t)})))}}],value2:{string:"1111111"},effects:function(e){e.onValidate((function(e){e.length&&(a["a"].error("表单内容有错误，请检查"),e[0].field.focus())}))},onCancel:function(){console.log("cancel")},onReset:function(){console.log("reset")}}}},p=n("6b0d"),f=n.n(p);const b=f()(d,[["render",r]]);var m=b,y={class:"markdown-body"},v=Object(o["createTextVNode"])("\n"),O=Object(o["createTextVNode"])("\n"),j=Object(o["createTextVNode"])("\n  \n<template>\n  <a-layout class=\"demo-wrapper\">\n    <a-layout-content>\n      <a-row>\n        <a-col :span=\"12\">\n          <v-schema-form\n              v-model:value=\"value2\"\n              :actions=\"actions\"\n              platform=\"mobile\"\n              :effects=\"effects\"\n              :props=\"props\"\n              :schema=\"definition\"\n              class=\"demo-form\"\n              @cancel=\"onCancel\"\n              @ok=\"onOk\"\n              @reset=\"onReset\"></v-schema-form>\n        </a-col>\n      </a-row>\n    </a-layout-content>\n  </a-layout>\n</template>\n<script lang=\"tsx\">\n  import {message} from 'ant-design-vue';\n  import {EffectsContext} from '../../../../types';\n  import {registerAntdMobile} from '../../../schema-form';\n  import {useBaseDemo} from '../../../views/demo/base';\n\n  registerAntdMobile();\n\n  export default {\n    name: 'Demo',\n    setup(props) {\n      const {definition, value} = useBaseDemo();\n      return {\n        definition,\n        value,\n        actions: ['submit', 'cancel', 'reset', {\n          name: 'validate',\n          text: '校验',\n          action: async ($: EffectsContext) => {\n            const res = await $.validate();\n            if (res.length) {\n              message.error(res[0].errors.join('、'));\n              res[0].field.focus(true);\n            }\n          }\n        }],\n        value2: {\n          string: '1111111'\n        },\n        effects($) {\n          $.onValidate((errors) => {\n            if (errors.length) {\n              message.error('表单内容有错误，请检查');\n              errors[0].field.focus();\n            }\n          });\n        },\n        onCancel() {\n          console.log('cancel');\n        },\n        onReset() {\n          console.log('reset');\n        }\n      };\n    }\n  };\n<\/script>\n\n"),g=Object(o["createTextVNode"])("\n"),w=Object(o["defineComponent"])({setup:function(e){return function(e,t){var n=Object(o["resolveComponent"])("code-container"),r=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",y,[Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(r,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[j]})),_:1})]})),default:Object(o["withCtx"])((function(){return[v,Object(o["createVNode"])(m),O,g]})),_:1})])])}}});const x=w;t["default"]=x},a7ab:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return c}));n("380f");var o=n("f64c"),r=n("8bbf"),a=n("5f12"),i={platform:{type:String,default:"desktop"},init:null},c=function(){var e=Object(a["b"])(),t=Object(r["ref"])(Object(a["c"])()),n=Object(r["ref"])({disabled:!1,loading:!1,readonly:!1,displayMode:!1,sticky:!1,mobile:!1}),i={props:{inline:!0},fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"详情模式",type:"boolean",property:"displayMode"},{title:"固定模式",type:"boolean",property:"sticky"}]},c=Object(a["a"])();return{options:n,props:e,value:t,definition:c,optionFormDefinition:i,onOk:function(){o["a"].success("ok clicked")},onReset:function(){o["a"].info("reset clicked")},onCancel:function(){console.log("aaa"),o["a"].error("cancel clicked")}}}},edb9:function(e,t,n){},f64c:function(e,t,n){"use strict";var o,r,a,i=n("c31d"),c=n("8bbf"),l=n("2fcd"),s=n("8fe6"),u=n("39b7"),d=n("e1b2"),p=n("0c35"),f=n("cf3f"),b=3,m=1,y="ant-message",v="move-up",O=function(){return document.body};function j(e){r?e(r):l["a"].newInstance({prefixCls:y,transitionName:v,style:{top:o},getContainer:O,maxCount:a},(function(t){r?e(r):(r=t,e(t))}))}var g={info:f["a"],success:p["a"],error:d["a"],warning:u["a"],loading:s["a"]};function w(e){var t=void 0!==e.duration?e.duration:b,n=g[e.type],o=n?Object(c["createVNode"])(n,null,null):"",a=e.key||m++,i=new Promise((function(n){var r=function(){return"function"===typeof e.onClose&&e.onClose(),n(!0)};j((function(n){n.notice({key:a,duration:t,style:e.style||{},class:e.class,content:function(){return Object(c["createVNode"])("div",{class:"".concat(y,"-custom-content").concat(e.type?" ".concat(y,"-").concat(e.type):"")},[e.icon||o,Object(c["createVNode"])("span",null,[e.content])])},onClose:r})}))})),l=function(){r&&r.removeNotice(a)};return l.then=function(e,t){return i.then(e,t)},l.promise=i,l}function x(e){return"[object Object]"===Object.prototype.toString.call(e)&&!!e.content}var h={open:w,config:function(e){void 0!==e.top&&(o=e.top,r=null),void 0!==e.duration&&(b=e.duration),void 0!==e.prefixCls&&(y=e.prefixCls),void 0!==e.getContainer&&(O=e.getContainer),void 0!==e.transitionName&&(v=e.transitionName,r=null),void 0!==e.maxCount&&(a=e.maxCount,r=null)},destroy:function(){r&&(r.destroy(),r=null)}};["success","info","warning","error","loading"].forEach((function(e){h[e]=function(t,n,o){return x(t)?h.open(Object(i["a"])(Object(i["a"])({},t),{type:e})):("function"===typeof n&&(o=n,n=void 0),h.open({content:t,duration:n,type:e,onClose:o}))}})),h.warn=h.warning,t["a"]=h}}]);
//# sourceMappingURL=chunk-5526c9fd.f6a143d5.js.map