(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d5c4d"],{7064:function(e,t,r){"use strict";r.r(t);var o=r("8bbf");function a(e,t,r,a,n,c){var l=Object(o["resolveComponent"])("v-schema-form"),i=Object(o["resolveComponent"])("a-layout-content"),s=Object(o["resolveComponent"])("a-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(s,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{value:e.value,"onUpdate:value":t[0]||(t[0]=function(t){return e.value=t}),schema:e.schema,class:"demo-form",onOk:e.onOk},null,8,["value","schema","onOk"])]})),_:1})]})),_:1})}var n=r("98ce");Object(n["k"])();var c=Object(o["defineComponent"])({name:"Demo",setup:function(){var e=Object(o["ref"])([{basic:{aa:"1234",cc:{cc:"11"}}}]),t=Object(o["ref"])([{a:"1",b:"2"}]);return{value2:t,tableSchema:{type:"object",array:!0,arrayComponent:"table",fields:{a:{type:"string",title:"字段1"},b:{type:"string",title:"字段2"}}},schema:{props:{title:"对象列表",labelWidth:"120px",labelPosition:"left"},type:"object",array:!0,arrayComponent:"block",arrayProps:{addText:"这是定制的添加文案",removeText:"这是定制的删除文案",maxItems:3},fields:{basic:{type:"object",fields:{aa:{type:"string",title:"字段1"},bb:{type:"string",title:"字段2"},cc:{type:"object",props:{gutter:10},fields:{grid:{type:"grid",layout:[[8,8]],title:"字段3",props:{gutter:10},fields:{cc:{type:"string"},dd:{type:"string"}}},ee:{type:"object",array:!0,arrayComponent:"block",fields:{aa:{type:"string",title:"字段1"},bb:{type:"string",title:"字段2"},cc:{type:"object",props:{gutter:10},fields:{grid:{type:"grid",layout:[[8,8]],title:"字段3",props:{gutter:10},fields:{cc:{type:"string"},dd:{type:"string"}}}}}}}}}}}}},value:e,onOk:function(){console.log(e.value)}}}}),l=r("6b0d"),i=r.n(l);const s=i()(c,[["render",a]]);var p=s,u={class:"markdown-body"},d=Object(o["createElementVNode"])("h1",{id:"表单列表"},"表单列表",-1),b=Object(o["createTextVNode"])(" <template> <a-layout> <a-layout-content> <v-schema-form v-model:value=\"value\" :schema=\"schema\" class=\"demo-form\" @ok=\"onOk\"></v-schema-form> </a-layout-content> </a-layout> </template> <script lang=\"ts\"> import {registerAntd} from '../../../schema-form'; import {SchemaFormField} from '../../../../types'; import {defineComponent, ref} from 'vue'; registerAntd(); export default defineComponent({ name: 'Demo', setup() { const value = ref([{ basic: { aa: '1234', cc: { cc: '11' } } }]); const value2 = ref([{ a: '1', b: '2' }]); return { value2, tableSchema: { type: 'object', array: true, arrayComponent: 'table', fields: { a: { type: 'string', title: '字段1' }, b: { type: 'string', title: '字段2' } } }, schema: { props: { title: '对象列表', labelWidth: '120px', labelPosition: 'left' }, type: 'object', array: true, arrayComponent: 'block', arrayProps: { addText: '这是定制的添加文案', removeText: '这是定制的删除文案', maxItems: 3 }, fields: { basic: { type: 'object', fields: { aa: { type: 'string', title: '字段1' }, bb: { type: 'string', title: '字段2' }, cc: { type: 'object', props: { gutter: 10 }, fields: { grid: { type: 'grid', layout: [[8, 8]], title: '字段3', props: {gutter: 10}, fields: { cc: { type: 'string' }, dd: { type: 'string' } } }, ee: { type: 'object', array: true, arrayComponent: 'block', fields: { aa: { type: 'string', title: '字段1' }, bb: { type: 'string', title: '字段2' }, cc: { type: 'object', props: { gutter: 10 }, fields: { grid: { type: 'grid', layout: [[8, 8]], title: '字段3', props: {gutter: 10}, fields: { cc: { type: 'string' }, dd: { type: 'string' } } } } } } } } } } } } } as SchemaFormField, value, onOk() { console.log(value.value); } }; } }); <\/script> "),m=Object(o["defineComponent"])({setup:function(e){return function(e,t){var r=Object(o["resolveComponent"])("code-container"),a=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",u,[d,Object(o["createVNode"])(a,null,{code:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(r,null,{default:Object(o["withCtx"])((function(){return[b]})),_:1})]})),default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(p)]})),_:1})])}}});const y=m;t["default"]=y}}]);
//# sourceMappingURL=chunk-2d0d5c4d.dbe2abbe.js.map