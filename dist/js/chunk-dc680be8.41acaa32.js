(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc680be8"],{"76b0":function(e,t){function a(e,t){var a,l=-1,n=e.length;while(++l<n){var i=t(e[l]);void 0!==i&&(a=void 0===a?i:a+i)}return a}function l(e){return e}function n(e){return e&&e.length?a(e,l):0}e.exports=n},"93e5":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ae-layout",{staticClass:"bg-whte"},[a("ae-layout-content",{staticClass:"demo-wrapper"},[a("v-schema-form",{attrs:{effects:e.effects,schema:e.schema},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),a("v-schema-form",{attrs:{schema:e.schema2},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}}),a("show-value",{attrs:{value:e.value}}),a("el-button",{on:{click:e.setValue}},[e._v("赋值")])],1)],1)},n=[],i=a("d225"),r=a("b0b4"),s=a("308d"),c=a("6bb5"),u=a("4e2b"),o=a("9ab4"),d=a("98ce"),b=a("5c91"),p=a("76b0"),m=a.n(p),f=a("8bbf"),y=a.n(f),v=a("2fe1"),h=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.schema={props:{labelWidth:"150px"},fields:{text:{title:"字段1",type:"string",placeholder:"请输入",default:["abc","def"],arrayProps:{addBtnText:"添加文本",addBtnProps:{text:!0},showRemoveBtn:!1,maxLength:2},array:!0},text2:{type:"string",title:"text2"},select:{title:"字段2",type:"select",enum:[{label:"是",value:1},{label:"否",value:0}],default:0},date:{title:"日期",type:"date"},calc:{editable:!1,title:"工龄（自动计算）",type:"string",default:"111"},sub:{type:"object",title:"子表单",array:!0,arrayComponent:"block",fields:{num:{type:"number",title:"金额"}}},sum:{editable:!1,title:"总金额",description:"子表单金额的总和",value:0,type:"number"}}},e.schema2={props:{labelWidth:"70px"},fields:{mobileNo:{title:"来电号码",type:"string"},phoneMark:{type:"select",title:"来电类型",props:{valueProperty:"code",labelProperty:"name"}},name:{title:"姓名",type:"string"},gender:{type:"select",title:"性别",enum:[{label:"男",value:"1"},{label:"女",value:"0"}]},identifyType:{type:"select",title:"证件类型",props:{valueProperty:"code",labelProperty:"name"}},identifyNumber:{title:"证件号码",type:"string"},licenseNumber:{title:"执业证号",type:"string"},lawFirm:{type:"string",title:"所属律所"},enterpriseId:{type:"string",title:"单位",visible:!1},job:{type:"string",title:"职业",visible:!1},address:{type:"string",title:"地址",visible:!1}}},e.value={text:["ef"]},e.value2={id:"abc",callerType:1,mobileNo:"",phoneMark:"normal",callTimes:1,name:"",gender:"1",identifyType:"residentIdentityCard",identifyNumber:"",licenseNumber:"",lawFirm:"",enterpriseId:"",job:"",address:"",extendAttributes:{}},e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"created",value:function(){d["a"].registerElement()}},{key:"effects",value:function(e){e("date").onFieldCreateOrChange(function(t){if(t){var a=12*((new Date).getFullYear()-t.getFullYear())+(new Date).getMonth()-t.getMonth(),l=Math.floor(a/12),n=a%12;e("calc").value(l+"年"+n+"个月")}else e("calc").value("-")}),e("sub.?.num").onFieldCreateOrChange(function(t){e("sum").value(m()(e("sub.?.num").value()))})}},{key:"setValue",value:function(){this.value={text:["a","b","c"],text2:"abc"},this.value2={address:"",callTime:"0",callTimes:"1",callerType:1,enterpriseId:"",firstCallTimes:"0",gender:"1",id:"a78e393f46f74dc29211a3a6c7b1d730",identifyNumber:"",identifyType:"residentIdentityCard",job:"",lawFirm:"",licenseNumber:"",mobileNo:"",name:"afdsa",phoneMark:""}}}]),t}(y.a);h=Object(o["b"])([Object(v["b"])({name:"default",components:{ShowValue:b["a"]}})],h);var g=h,w=g,x=a("2877"),k=Object(x["a"])(w,l,n,!1,null,"5c022ec9",null);t["default"]=k.exports}}]);
//# sourceMappingURL=chunk-dc680be8.41acaa32.js.map