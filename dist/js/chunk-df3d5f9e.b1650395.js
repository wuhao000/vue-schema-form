(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-df3d5f9e"],{"093f":function(e,t,n){"use strict";n.r(t);var o=n("8bbf"),i=n("98ce"),r=n("2ed4"),a=Object(o["defineComponent"])({setup:function(e){return Object(i["l"])(),function(e,t){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",null,[Object(o["createVNode"])(r["a"],{platform:"mobile",init:e.register},null,8,["init"])])}}});const l=a;var c=l,u={class:"markdown-body"},p=Object(o["createTextVNode"])("\n"),s=Object(o["createTextVNode"])("\n"),d=Object(o["createTextVNode"])('\n  \n<template>\n  <div>\n    <simple-edit-demo \n        platform="mobile"\n        :init="register"/>\n  </div>\n</template>\n<script lang="ts" setup>\n  import {registerAntdMobile} from \'../../../schema-form\';\n  // noinspection ES6UnusedImports\n  import SimpleEditDemo from \'../../../views/common/simple.vue\';\n\n  registerAntdMobile();\n<\/script>\n\n'),f=Object(o["createTextVNode"])("\n"),b=Object(o["defineComponent"])({setup:function(e){return function(e,t){var n=Object(o["resolveComponent"])("code-container"),i=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",u,[Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(i,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[d]})),_:1})]})),default:Object(o["withCtx"])((function(){return[p,Object(o["createVNode"])(c),s,f]})),_:1})])])}}});const m=b;t["default"]=m},"2ed4":function(e,t,n){"use strict";var o=n("8bbf");function i(e,t,n,i,r,a){var l=Object(o["resolveComponent"])("v-schema-form"),c=Object(o["resolveComponent"])("a-layout-content"),u=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(u,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(c,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{value:e.options,"onUpdate:value":t[0]||(t[0]=function(t){return e.options=t}),platform:e.platform,schema:e.optionFormDefinition},null,8,["value","platform","schema"]),Object(o["createVNode"])(l,{value:e.value,"onUpdate:value":t[1]||(t[1]=function(t){return e.value=t}),disabled:e.options.disabled,editable:!e.options.displayMode,loading:e.options.loading,platform:e.platform,props:e.props,readonly:e.options.readonly,schema:e.definition,class:"demo-form",onCancel:e.onCancel,onOk:e.onOk,onReset:e.onReset},null,8,["value","disabled","editable","loading","platform","props","readonly","schema","onCancel","onOk","onReset"])]})),_:1})]})),_:1})}var r=n("a7ab"),a=Object(o["defineComponent"])({name:"Demo",props:r["a"],setup:function(){var e=Object(r["b"])(),t=e.definition,n=e.value,o=e.options,i=e.onOk,a=e.optionFormDefinition,l=e.onReset,c=e.onCancel;return{definition:t,onOk:i,onCancel:c,onReset:l,optionFormDefinition:a,options:o,value:n}}}),l=n("6b0d"),c=n.n(l);const u=c()(a,[["render",i]]);t["a"]=u},"380f":function(e,t,n){"use strict";n("b550"),n("edb9")},"5f12":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return c}));var o=n("98ce"),i=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3},{label:"选项4",value:4}],r=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},a=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:new Date,end:new Date,year:(new Date).getFullYear(),month:new Date,time:"12:24",timerange:["12:24","13:24"],select:4,multiSelect:[1,3],expandSelect:1,expandMultiSelect:[1,2],transfer:["1"],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},l={expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:i}},select:{title:"单选",required:!0,type:"select",props:{options:i,clearable:!0}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:i}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:i}},text:{title:"多行文本",required:!0,type:"text"},zh:{title:"仅限中文",required:!0,type:"text",format:"zh",default:"not chinese"},string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200,props:{min:100}},double:{title:"小数",required:!0,type:"double",props:{step:.1}},switch:{title:"开关",type:o["e"].Boolean},date:{title:"日期",required:!0,type:"date"},"[start, end]":{title:"日期范围",required:!0,type:"daterange"},year:{title:"年份",required:!0,type:"year"},time:{title:"时间",required:!0,type:"time"},timerange:{title:"时间范围",required:!0,type:o["e"].TimeRange},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},file:{title:"卡片上传文件",type:o["e"].File,props:{mode:"card"}},file2:{title:"拖拽上传文件",type:o["e"].File,props:{mode:"dragger"}},file3:{title:"普通上传文件",type:o["e"].File},image:{title:"图片",type:o["e"].Picture},transfer:{title:"穿梭框",type:o["e"].Transfer,enum:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},range:{title:"范围",type:o["e"].Range},rate:{title:"评分",type:o["e"].Rate},subForm:{title:"子表单",type:o["e"].Object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:o["e"].Object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},c=function(){return{props:{section:!0,spaceBetweenSection:16,labelWidth:120},fields:l}}},a7ab:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return l}));n("380f");var o=n("f64c"),i=n("8bbf"),r=n("5f12"),a={platform:{type:String,default:"desktop"},init:null},l=function(){var e=Object(r["b"])(),t=Object(i["ref"])(Object(r["c"])()),n=Object(i["ref"])({disabled:!1,loading:!1,readonly:!1,displayMode:!1,sticky:!1,mobile:!1}),a={props:{inline:!0},fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"详情模式",type:"boolean",property:"displayMode"},{title:"固定模式",type:"boolean",property:"sticky"}]},l=Object(r["a"])();return{options:n,props:e,value:t,definition:l,optionFormDefinition:a,onOk:function(){o["a"].success("ok clicked")},onReset:function(){o["a"].info("reset clicked")},onCancel:function(){console.log("aaa"),o["a"].error("cancel clicked")}}}},edb9:function(e,t,n){},f64c:function(e,t,n){"use strict";var o,i,r,a=n("c31d"),l=n("8bbf"),c=n("2fcd"),u=n("8fe6"),p=n("39b7"),s=n("e1b2"),d=n("0c35"),f=n("cf3f"),b=3,m=1,y="ant-message",v="move-up",O=function(){return document.body};function j(e){i?e(i):c["a"].newInstance({prefixCls:y,transitionName:v,style:{top:o},getContainer:O,maxCount:r},(function(t){i?e(i):(i=t,e(t))}))}var g={info:f["a"],success:d["a"],error:s["a"],warning:p["a"],loading:u["a"]};function C(e){var t=void 0!==e.duration?e.duration:b,n=g[e.type],o=n?Object(l["createVNode"])(n,null,null):"",r=e.key||m++,a=new Promise((function(n){var i=function(){return"function"===typeof e.onClose&&e.onClose(),n(!0)};j((function(n){n.notice({key:r,duration:t,style:e.style||{},class:e.class,content:function(){return Object(l["createVNode"])("div",{class:"".concat(y,"-custom-content").concat(e.type?" ".concat(y,"-").concat(e.type):"")},[e.icon||o,Object(l["createVNode"])("span",null,[e.content])])},onClose:i})}))})),c=function(){i&&i.removeNotice(r)};return c.then=function(e,t){return a.then(e,t)},c.promise=a,c}function w(e){return"[object Object]"===Object.prototype.toString.call(e)&&!!e.content}var x={open:C,config:function(e){void 0!==e.top&&(o=e.top,i=null),void 0!==e.duration&&(b=e.duration),void 0!==e.prefixCls&&(y=e.prefixCls),void 0!==e.getContainer&&(O=e.getContainer),void 0!==e.transitionName&&(v=e.transitionName,i=null),void 0!==e.maxCount&&(r=e.maxCount,i=null)},destroy:function(){i&&(i.destroy(),i=null)}};["success","info","warning","error","loading"].forEach((function(e){x[e]=function(t,n,o){return w(t)?x.open(Object(a["a"])(Object(a["a"])({},t),{type:e})):("function"===typeof n&&(o=n,n=void 0),x.open({content:t,duration:n,type:e,onClose:o}))}})),x.warn=x.warning,t["a"]=x}}]);
//# sourceMappingURL=chunk-df3d5f9e.b1650395.js.map