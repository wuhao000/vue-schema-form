(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e540f64"],{a7ab:function(e,t,i){"use strict";var n=i("d225"),o=i("b0b4"),r=i("308d"),a=i("6bb5"),l=i("4e2b"),s=i("9ab4"),c=i("ab3c"),u=i("8bbf"),p=i.n(u),d=i("2fe1"),b=i("60a3"),y=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(r["a"])(this,Object(a["a"])(t).apply(this,arguments)),e.props=Object(c["b"])(),e.value=Object(c["c"])(),e.options={disabled:!1,loading:!1,readonly:!1,displayMode:!1,sticky:!1,mobile:!1},e.optionFormDefinition={title:"选项",props:{inline:!0,title:"选项"},fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"详情模式",type:"boolean",property:"displayMode"},{title:"固定模式",type:"boolean",property:"sticky"}]},e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"created",value:function(){this.init&&this.init(),window.ondevicelight=function(){console.log(1)},window.ondevicemotion=function(){console.log(2)},window.ondeviceorientation=function(){console.log(3)},window.onresize=function(){console.log(window.outerHeight+"/"+window.outerWidth)}}},{key:"onOk",value:function(){this.$message.success("ok clicked")}},{key:"onReset",value:function(){this.$message.error("reset click")}},{key:"onCancel",value:function(){this.$message.warning("cancel clicked")}},{key:"definition",get:function(){return Object(c["a"])()}}]),t}(p.a);Object(s["b"])([Object(b["b"])({type:String,default:"desktop"})],y.prototype,"platform",void 0),Object(s["b"])([Object(b["b"])(Function)],y.prototype,"init",void 0),y=Object(s["b"])([Object(d["b"])({name:"Base"})],y),t["a"]=y},ab3c:function(e,t,i){"use strict";i.d(t,"b",function(){return r}),i.d(t,"c",function(){return a}),i.d(t,"a",function(){return s});var n=i("8588"),o=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3}],r=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},a=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:"",end:"",year:new Date,month:new Date,time:window.moment(),select:1,multiSelect:[1,3],expandSelect:2,expandMultiSelect:[2,3],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},l={string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},text:{title:"多行文本",required:!0,type:"text"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200},double:{title:"小数",required:!0,type:"double"},date:{title:"日期",required:!0,type:"date"},"[start, end]":{title:"日期范围",required:!0,type:"daterange"},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},select:{title:"单选",required:!0,type:"select",props:{options:o,clearable:!0}},image:{title:"图片",type:"picture"},expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:o}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:o}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:o}},subForm:{title:"子表单",type:n["g"].object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:n["g"].object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},s=function(){return{props:{section:!0,spaceBetweenSection:16},fields:l}}},dab9:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ae-layout",{staticClass:"demo-wrapper"},[i("ae-layout-content",[i("v-schema-form",{staticClass:"demo-form",attrs:{editable:!1,schema:e.definition,props:e.props,value:e.value}})],1)],1)},o=[],r=i("d225"),a=i("b0b4"),l=i("308d"),s=i("6bb5"),c=i("4e2b"),u=i("9ab4"),p=i("ffb4"),d=i("a7ab"),b=i("2fe1"),y=function(e){function t(){return Object(r["a"])(this,t),Object(l["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),Object(a["a"])(t,[{key:"created",value:function(){var e=this;p["a"].registerAntd(),setTimeout(function(){e.value.string="新的值"},3e3)}}]),t}(d["a"]);y=Object(u["b"])([Object(b["b"])({name:"DesktopEdit"})],y);var f=y,m=f,w=i("2877"),g=Object(w["a"])(m,n,o,!1,null,null,null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-6e540f64.73aef7c5.js.map