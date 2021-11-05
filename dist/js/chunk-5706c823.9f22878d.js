(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5706c823"],{3557:function(e,t,n){"use strict";n.r(t);var o=n("8bbf"),r=n("98ce"),i=n("a7ab"),a=Object(o["defineComponent"])({setup:function(e){Object(r["k"])();var t=Object(i["b"])(),n=t.definition,a=t.value;return function(e,t){var r=Object(o["resolveComponent"])("v-schema-form"),i=Object(o["resolveComponent"])("a-layout-content"),c=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(c,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(r,{editable:!1,schema:Object(o["unref"])(n),value:Object(o["unref"])(a),class:"demo-form"},null,8,["schema","value"])]})),_:1})]})),_:1})}}});const c=a;var l=c,u={class:"markdown-body"},s=Object(o["createElementVNode"])("h1",{id:"表单详情"},"表单详情",-1),d=Object(o["createTextVNode"])("\n"),p=Object(o["createTextVNode"])("\n"),f=Object(o["createTextVNode"])('\n  \n<template>\n  <a-layout>\n    <a-layout-content>\n      <v-schema-form\n          :editable="false"\n          :schema="definition"\n          :value="value"\n          class="demo-form"/>\n    </a-layout-content>\n  </a-layout>\n</template>\n<script lang="ts" setup>\n  import {registerAntd} from \'../../../schema-form\';\n  import {useBaseDemo} from \'../../../views/demo/base\';\n  \n  registerAntd();\n  const {definition, value} = useBaseDemo();\n<\/script>\n\n'),b=Object(o["createTextVNode"])("\n"),m=Object(o["defineComponent"])({setup:function(e){return function(e,t){var n=Object(o["resolveComponent"])("code-container"),r=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",u,[s,Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(r,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[f]})),_:1})]})),default:Object(o["withCtx"])((function(){return[d,Object(o["createVNode"])(l),p,b]})),_:1})])])}}});const y=m;t["default"]=y},"380f":function(e,t,n){"use strict";n("b550"),n("edb9")},"5f12":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return l}));var o=n("98ce"),r=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3},{label:"选项4",value:4}],i=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},a=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:new Date,end:new Date,year:(new Date).getFullYear(),month:new Date,time:"12:24",timerange:["12:24","13:24"],select:4,multiSelect:[1,3],expandSelect:1,expandMultiSelect:[1,2],transfer:["1"],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},c={expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:r}},select:{title:"单选",required:!0,type:"select",props:{options:r,clearable:!0}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:r}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:r}},text:{title:"多行文本",required:!0,type:"text"},zh:{title:"仅限中文",required:!0,type:"text",format:"zh",default:"not chinese"},string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200,props:{min:100}},double:{title:"小数",required:!0,type:"double",props:{step:.1}},switch:{title:"开关",type:o["e"].Boolean},date:{title:"日期",required:!0,type:"date"},"[start, end]":{title:"日期范围",required:!0,type:"daterange"},year:{title:"年份",required:!0,type:"year"},time:{title:"时间",required:!0,type:"time"},timerange:{title:"时间范围",required:!0,type:o["e"].TimeRange},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},file:{title:"卡片上传文件",type:o["e"].File,props:{mode:"card"}},file2:{title:"拖拽上传文件",type:o["e"].File,props:{mode:"dragger"}},file3:{title:"普通上传文件",type:o["e"].File},image:{title:"图片",type:o["e"].Picture},transfer:{title:"穿梭框",type:o["e"].Transfer,enum:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},range:{title:"范围",type:o["e"].Range},rate:{title:"评分",type:o["e"].Rate},subForm:{title:"子表单",type:o["e"].Object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:o["e"].Object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},l=function(){return{props:{section:!0,spaceBetweenSection:16,labelWidth:120},fields:c}}},a7ab:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return c}));n("380f");var o=n("f64c"),r=n("8bbf"),i=n("5f12"),a={platform:{type:String,default:"desktop"},init:null},c=function(){var e=Object(i["b"])(),t=Object(r["ref"])(Object(i["c"])()),n=Object(r["ref"])({disabled:!1,loading:!1,readonly:!1,displayMode:!1,sticky:!1,mobile:!1}),a={props:{inline:!0},fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"详情模式",type:"boolean",property:"displayMode"},{title:"固定模式",type:"boolean",property:"sticky"}]},c=Object(i["a"])();return{options:n,props:e,value:t,definition:c,optionFormDefinition:a,onOk:function(){o["a"].success("ok clicked")},onReset:function(){o["a"].info("reset clicked")},onCancel:function(){console.log("aaa"),o["a"].error("cancel clicked")}}}},edb9:function(e,t,n){},f64c:function(e,t,n){"use strict";var o,r,i,a=n("c31d"),c=n("8bbf"),l=n("2fcd"),u=n("8fe6"),s=n("39b7"),d=n("e1b2"),p=n("0c35"),f=n("cf3f"),b=3,m=1,y="ant-message",j="move-up",v=function(){return document.body};function O(e){r?e(r):l["a"].newInstance({prefixCls:y,transitionName:j,style:{top:o},getContainer:v,maxCount:i},(function(t){r?e(r):(r=t,e(t))}))}var g={info:f["a"],success:p["a"],error:d["a"],warning:s["a"],loading:u["a"]};function w(e){var t=void 0!==e.duration?e.duration:b,n=g[e.type],o=n?Object(c["createVNode"])(n,null,null):"",i=e.key||m++,a=new Promise((function(n){var r=function(){return"function"===typeof e.onClose&&e.onClose(),n(!0)};O((function(n){n.notice({key:i,duration:t,style:e.style||{},class:e.class,content:function(){return Object(c["createVNode"])("div",{class:"".concat(y,"-custom-content").concat(e.type?" ".concat(y,"-").concat(e.type):"")},[e.icon||o,Object(c["createVNode"])("span",null,[e.content])])},onClose:r})}))})),l=function(){r&&r.removeNotice(i)};return l.then=function(e,t){return a.then(e,t)},l.promise=a,l}function x(e){return"[object Object]"===Object.prototype.toString.call(e)&&!!e.content}var h={open:w,config:function(e){void 0!==e.top&&(o=e.top,r=null),void 0!==e.duration&&(b=e.duration),void 0!==e.prefixCls&&(y=e.prefixCls),void 0!==e.getContainer&&(v=e.getContainer),void 0!==e.transitionName&&(j=e.transitionName,r=null),void 0!==e.maxCount&&(i=e.maxCount,r=null)},destroy:function(){r&&(r.destroy(),r=null)}};["success","info","warning","error","loading"].forEach((function(e){h[e]=function(t,n,o){return x(t)?h.open(Object(a["a"])(Object(a["a"])({},t),{type:e})):("function"===typeof n&&(o=n,n=void 0),h.open({content:t,duration:n,type:e,onClose:o}))}})),h.warn=h.warning,t["a"]=h}}]);
//# sourceMappingURL=chunk-5706c823.9f22878d.js.map