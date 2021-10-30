(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0baaaf"],{"37d9":function(l,i,e){"use strict";e.r(i);var n=e("8bbf"),o={class:"markdown-body"},c=Object(n["createStaticVNode"])('<h1 id="vschemaform-是什么">VSchemaForm 是什么</h1><h2 id="背景">背景</h2><p>表单问题，不管是在 jQuery 时代，还是 Vue/React 时代， 都永远是前端工程师们的痛，但是这又是没办法的事情，业务需求多种多样， 对于中后台业务而言，表单页面和报表页面基本上是中后台业务的核心展现形式， 但是，如何帮助开发者更高效的开发表单，目前传统的表单开发方式：</p><ul><li>手动管理表单状态</li><li>手动收集表单数据</li><li>手动管理表单校验状态</li></ul><p>存在哪些问题？</p><ul><li>表单状态管理变得越来越难以维护，需要引入状态管理库</li><li>传统表单开发的数据结构往往都是扁平结构，没法很好的处理嵌套复杂数据的情况， 如果要处理，工作量会非常大</li><li>当业务有动态输出表单的需求的时候，不得不自己开发一个基于某种数据协议的动态输出表单的组件</li><li>当业务需要在可视化界面配置产出表单时，需要自己开发一个基于json的动态输出表单组件</li></ul><h2 id="方案">方案</h2><p>基于以上问题的探索，以及受到UForm的启发，研发了VSchemaForm的Vue表单解决方案：</p><ol><li>使用json描述表单内容</li><li>支持多平台（移动端和桌面端）</li><li>支持多个组件库（Element UI、Ant Design Vue、Antd Mobile Vue）</li><li>支持嵌套表单</li><li>支持任意数据的数组解构</li><li>支持复杂布局</li><li>支持副作用函数，统一处理表单内各项的数据联动</li><li>支持解构数据，减少自定义的数据转换</li><li>支持表单校验</li><li>支持扩展自定义的组件的作为输入组件，详情组件，布局组件等</li></ol>',9),t=[c];function a(l,i){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",o,t)}var r=e("6b0d"),u=e.n(r);const d={},p=u()(d,[["render",a]]);i["default"]=p}}]);
//# sourceMappingURL=chunk-2d0baaaf.bc040ed8.js.map