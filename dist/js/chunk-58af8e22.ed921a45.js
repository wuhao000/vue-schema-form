(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58af8e22"],{5058:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ae-layout",{staticClass:"demo-wrapper"},[i("ae-layout-content",[i("v-schema-form",{attrs:{platform:e.platform,schema:e.optionFormDefinition},model:{value:e.options,callback:function(t){e.options=t},expression:"options"}}),i("v-schema-form",{staticClass:"demo-form",attrs:{disabled:e.options.disabled,loading:e.options.loading,editable:!e.options.displayMode,platform:e.platform,props:e.props,readonly:e.options.readonly,schema:e.definition},on:{cancel:e.onCancel,ok:e.onOk,reset:e.onReset},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),i("show-value",{attrs:{value:e.value}})],1)],1)},n=[],o=i("d225"),l=i("b0b4"),r=i("308d"),p=i("6bb5"),s=i("4e2b"),c=i("9ab4"),u=i("a7ab"),d=i("5c91"),b=i("2fe1"),y={radio:{type:"expand-select",enum:["1","2","3","4"],title:"Radio"},select:{type:"select",enum:["1","2","3","4"],title:"Select",required:!0},checkbox:{type:"expand-select",array:!0,enum:["1","2","3","4"],title:"Checkbox",required:!0},textarea:{type:"text",title:"TextArea"},number:{type:"number",title:"数字"},integer:{type:"integer",title:"整数"},boolean:{type:"boolean",title:"开关",displayValue:function(e){return e?"开":"关"}},boolean2:{type:"boolean",xType:"checkbox",title:"选择"},date:{type:"date",title:"日期选择"},daterange:{type:"daterange",default:["2018-12-19","2018-12-19"],title:"日期范围"},time:{type:"time",title:"时间"},upload1:{type:"upload",props:{listType:"card",action:"https://yapi.aegis-info.com/mock/126/upload"},title:"卡片上传文件"},upload2:{type:"upload",props:{listType:"picture",action:"https://yapi.aegis-info.com/mock/126/upload"},title:"图片上传"},upload3:{type:"upload",props:{listType:"dragger",action:"https://yapi.aegis-info.com/mock/126/upload"},title:"拖拽上传"},upload4:{type:"upload",props:{listType:"text",action:"https://yapi.aegis-info.com/mock/126/upload"},title:"普通上传文件"},range:{type:"range",props:{min:0,max:1024,range:!0},title:"范围选择"},transfer:{type:"transfer",enum:[{value:1,label:"选项1"},{value:2,label:"选项2"}],title:"穿梭框"},rating:{type:"rate",title:"等级"}},m="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567405580995&di=fbc97d869418de6f9bd14376f7a3eb7e&imgtype=0&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-9%2F20129181714587674.jpg",f=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(r["a"])(this,Object(p["a"])(t).apply(this,arguments)),e.checked=!1,e.value={radio:"1",upload1:m,upload2:m,upload3:m,upload4:m},e.year=[2019],e}return Object(s["a"])(t,e),Object(l["a"])(t,[{key:"definition",get:function(){return{fields:y}}}]),t}(u["a"]);f=c["b"]([Object(b["b"])({name:"SimpleEditDemo",components:{ShowValue:d["a"]}})],f);var g=f,h=g,v=i("2877"),w=Object(v["a"])(h,a,n,!1,null,null,null);t["a"]=w.exports},"9ff6":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("simple-edit-demo",{attrs:{platform:"desktop",init:e.register}})},n=[],o=i("d225"),l=i("b0b4"),r=i("308d"),p=i("6bb5"),s=i("4e2b"),c=i("9ab4"),u=i("ffb4"),d=i("5058"),b=i("8bbf"),y=i.n(b),m=i("2fe1"),f=function(e){function t(){return Object(o["a"])(this,t),Object(r["a"])(this,Object(p["a"])(t).apply(this,arguments))}return Object(s["a"])(t,e),Object(l["a"])(t,[{key:"register",value:function(){u["a"].registerElement()}}]),t}(y.a);f=c["b"]([Object(m["b"])({name:"DesktopEdit",components:{SimpleEditDemo:d["a"]}})],f);var g=f,h=g,v=i("2877"),w=Object(v["a"])(h,a,n,!1,null,null,null);t["default"]=w.exports},a7ab:function(e,t,i){"use strict";var a=i("d225"),n=i("b0b4"),o=i("308d"),l=i("6bb5"),r=i("4e2b"),p=i("9ab4"),s=i("ab3c"),c=i("8bbf"),u=i.n(c),d=i("2fe1"),b=i("60a3"),y=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(o["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.props=Object(s["b"])(),e.value=Object(s["c"])(),e.options={disabled:!1,loading:!1,readonly:!1,displayMode:!1,sticky:!1,mobile:!1},e.optionFormDefinition={title:"选项",props:{inline:!0,title:"选项"},fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"详情模式",type:"boolean",property:"displayMode"},{title:"固定模式",type:"boolean",property:"sticky"}]},e}return Object(r["a"])(t,e),Object(n["a"])(t,[{key:"created",value:function(){this.init&&this.init(),window.ondevicelight=function(){console.log(1)},window.ondevicemotion=function(){console.log(2)},window.ondeviceorientation=function(){console.log(3)},window.onresize=function(){console.log(window.outerHeight+"/"+window.outerWidth)}}},{key:"onOk",value:function(){this.$message.success("ok clicked")}},{key:"onReset",value:function(){this.$message.error("reset click")}},{key:"onCancel",value:function(){this.$message.warning("cancel clicked")}},{key:"definition",get:function(){return Object(s["a"])()}}]),t}(u.a);p["b"]([Object(b["b"])({type:String,default:"desktop"})],y.prototype,"platform",void 0),p["b"]([Object(b["b"])(Function)],y.prototype,"init",void 0),y=p["b"]([Object(d["b"])({name:"Base"})],y),t["a"]=y},ab3c:function(e,t,i){"use strict";i.d(t,"b",function(){return o}),i.d(t,"c",function(){return l}),i.d(t,"a",function(){return p});var a=i("8588"),n=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3}],o=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},l=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:new Date,end:new Date,year:new Date,month:new Date,time:window.moment(),select:1,multiSelect:[1,3],expandSelect:2,expandMultiSelect:[2,3],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},r={string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},text:{title:"多行文本",required:!0,type:"text"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200},double:{title:"小数",required:!0,type:"double"},date:{title:"日期",required:!0,type:"date"},dateRange:{title:"日期范围",required:!0,type:"daterange",processor:{getValue:function(e,t){return[e&&e["start"],e&&e["end"]]},setValue:function(e,t,i){i?(e["start"]=i[0],e["end"]=i[1]):(e["start"]=null,e["end"]=null)}}},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},select:{title:"单选",required:!0,type:"select",props:{options:n,clearable:!0}},image:{title:"图片",type:"picture"},expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:n}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:n}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:n}},subForm:{title:"子表单",type:a["g"].object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:a["g"].object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},p=function(){return{props:{section:!0,spaceBetweenSection:16},fields:r}}}}]);
//# sourceMappingURL=chunk-58af8e22.ed921a45.js.map