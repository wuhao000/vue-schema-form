(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf4c8"],{"62b8":function(e,t,c){"use strict";c.r(t);var n=c("8bbf");function o(e,t,c,o,r,s){var a=Object(n["resolveComponent"])("v-schema-form");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createVNode"])(a,{effects:e.effects,schema:e.schema},null,8,["effects","schema"])])}var r=c("98ce");Object(r["k"])();var s=Object(n["defineComponent"])({name:"SelectDemo",setup:function(){return{schema:{fields:{text:{title:"select",type:"select",props:{showSearch:!0},events:{onSearch:function(e,t){this.trigger("search",t)}}},text2:{title:"select2",type:"select",props:{showSearch:!0}}}},effects:function(e){e("text").subscribe("search",(function(e){console.log("search",e)})),e("text").onFieldCreate((function(){setTimeout((function(){e("text").setEnum([{label:"a",value:"1"},{label:"b",value:"2"}])}),200)}))}}}}),a=c("6b0d"),l=c.n(a);const f=l()(s,[["render",o]]);var i=f,u={class:"markdown-body"},p=Object(n["createTextVNode"])(" <template> <div> <v-schema-form :effects=\"effects\" :schema=\"schema\"/> </div> </template> <script lang=\"ts\"> import {defineComponent} from 'vue'; import {EffectsContext, EffectsHandlers} from '../../../../types'; import {registerAntd} from '../../../schema-form'; registerAntd(); export default defineComponent({ name: 'SelectDemo', setup() { return { schema: { fields: { text: { title: 'select', type: 'select', props: { showSearch: true }, events: { onSearch(this: EffectsHandlers, $: EffectsContext, input) { this.trigger('search', input); } } }, text2: { title: 'select2', type: 'select', props: { showSearch: true } } } }, effects: ($: EffectsContext) => { $('text').subscribe('search', (v) => { console.log('search', v); }); $('text').onFieldCreate(() => { setTimeout(() => { $('text').setEnum([ {label: 'a', value: '1'}, {label: 'b', value: '2'} ]); }, 200); }); } }; } }); <\/script> "),m=Object(n["defineComponent"])({setup:function(e){return function(e,t){var c=Object(n["resolveComponent"])("code-container"),o=Object(n["resolveComponent"])("demo-wrapper");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",u,[Object(n["createVNode"])(o,null,{code:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])((function(){return[p]})),_:1})]})),default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i)]})),_:1})])}}});const b=m;t["default"]=b}}]);
//# sourceMappingURL=chunk-2d0cf4c8.92b79e21.js.map