(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d07208f"],{"63d5":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ae-layout",{staticClass:"demo-wrapper"},[n("ae-layout-content",[n("v-schema-form",{staticClass:"demo-form",attrs:{platform:"mobile",schema:e.definition,props:e.props,value:e.value2},on:{ok:e.onOk,cancel:e.onCancel}})],1)],1)},r=[],o=n("d225"),a=n("b0b4"),l=n("308d"),c=n("6bb5"),u=n("4e2b"),s=n("9ab4"),p=n("ffb4"),d=n("a7ab"),b=n("ccb6"),f=n("2fe1"),y=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(l["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.value2=Object(b["b"])(),e}return Object(u["a"])(t,e),Object(a["a"])(t,[{key:"created",value:function(){p["a"].registerAntd()}},{key:"definition",get:function(){return Object(b["a"])()}}]),t}(d["a"]);y=Object(s["b"])([Object(f["b"])({name:"DesktopEdit"})],y);var m=y,w=m,g=n("2877"),v=Object(g["a"])(w,i,r,!1,null,null,null);t["default"]=v.exports},a7ab:function(e,t,n){"use strict";var i=n("d225"),r=n("b0b4"),o=n("308d"),a=n("6bb5"),l=n("4e2b"),c=n("9ab4"),u=n("ab3c"),s=n("8bbf"),p=n.n(s),d=n("2fe1"),b=n("60a3"),f=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(o["a"])(this,Object(a["a"])(t).apply(this,arguments)),e.props=Object(u["b"])(),e.value=Object(u["c"])(),e.options={disabled:!1,loading:!1,readonly:!1,displayMode:!1,sticky:!1,mobile:!1},e.optionFormDefinition={title:"选项",props:{inline:!0,title:"选项"},fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"详情模式",type:"boolean",property:"displayMode"},{title:"固定模式",type:"boolean",property:"sticky"}]},e}return Object(l["a"])(t,e),Object(r["a"])(t,[{key:"created",value:function(){this.init&&this.init(),window.ondevicelight=function(){console.log(1)},window.ondevicemotion=function(){console.log(2)},window.ondeviceorientation=function(){console.log(3)},window.onresize=function(){console.log(window.outerHeight+"/"+window.outerWidth)}}},{key:"onOk",value:function(){this.$message.success("ok clicked")}},{key:"onReset",value:function(){this.$message.error("reset click")}},{key:"onCancel",value:function(){this.$message.warning("cancel clicked")}},{key:"definition",get:function(){return Object(u["a"])()}}]),t}(p.a);Object(c["b"])([Object(b["b"])({type:String,default:"desktop"})],f.prototype,"platform",void 0),Object(c["b"])([Object(b["b"])(Function)],f.prototype,"init",void 0),f=Object(c["b"])([Object(d["b"])({name:"Base"})],f),t["a"]=f},ab3c:function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return c});var i=n("8588"),r=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3}],o=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},a=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:"",end:"",year:new Date,month:new Date,time:window.moment(),select:1,multiSelect:[1,3],expandSelect:2,expandMultiSelect:[2,3],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},l={string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},text:{title:"多行文本",required:!0,type:"text"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200},double:{title:"小数",required:!0,type:"double"},date:{title:"日期",required:!0,type:"date"},"[start, end]":{title:"日期范围",required:!0,type:"daterange"},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},select:{title:"单选",required:!0,type:"select",props:{options:r,clearable:!0}},image:{title:"图片",type:"picture"},expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:r}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:r}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:r}},subForm:{title:"子表单",type:i["g"].object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:i["g"].object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},c=function(){return{props:{section:!0,spaceBetweenSection:16},fields:l}}},ccb6:function(e,t,n){"use strict";n.d(t,"b",function(){return i}),n.d(t,"a",function(){return r});var i=function(){return{values:{input:"abc",switch:!1},valueArray:[{input:"abc"},{input:"def"}]}},r=function(){return{fields:{valueArray:{title:"子表单数组",type:"object",array:!0,fields:{input:{title:"数组文本",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}}}}}}]);
//# sourceMappingURL=chunk-7d07208f.5e6bb388.js.map