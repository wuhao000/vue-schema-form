(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b7257"],{"1fd0":function(e,t,n){"use strict";n.r(t);var o=n("8bbf"),r={class:"markdown-body"},c=Object(o["createElementVNode"])("h1",{id:"安装使用"},"安装使用",-1),l=Object(o["createElementVNode"])("h2",{id:"cdn引入"},"CDN引入",-1),a=Object(o["createTextVNode"])('\n  <link ref="stylesheet" href="https://public-file.aegis-info.com/schema-form/<version>/SchemaForm.css">\n<script src="https://public-file.aegis-info.com/schema-form/<version>/SchemaForm.umd.min.js.gz"><\/script>\n'),i=Object(o["createElementVNode"])("p",null,[Object(o["createTextVNode"])("当前最新版本为"),Object(o["createElementVNode"])("code",null,"0.1.2")],-1),d=Object(o["createElementVNode"])("h2",{id:"npm-安装"},"npm 安装",-1),m=Object(o["createTextVNode"])("\n  npm install v-schema-form\n"),p=Object(o["createElementVNode"])("p",null,"在main.ts中引入",-1),b=Object(o["createTextVNode"])("\n  import SchemaForm from 'v-shema-form';\n"),s=Object(o["createElementVNode"])("p",null,"SchemaForm 具有以下方法：",-1),u=Object(o["createElementVNode"])("h3",{id:"registerantd"},"registerAntd",-1),f=Object(o["createElementVNode"])("blockquote",null,[Object(o["createElementVNode"])("p",null,[Object(o["createTextVNode"])("使用"),Object(o["createElementVNode"])("code",null,"ant-design-vue"),Object(o["createTextVNode"])("组件库")])],-1),j=Object(o["createElementVNode"])("p",null,"推荐使用cdn引入组件库",-1),O=Object(o["createElementVNode"])("h3",{id:"registercomponent"},"registerComponent",-1),N=Object(o["createElementVNode"])("blockquote",null,[Object(o["createElementVNode"])("p",null,"注册自定义组件")],-1),V=Object(o["createElementVNode"])("p",null,"方法签名如下",-1),h=Object(o["createTextVNode"])("\n  /**\n * 注册表单组件\n * @param {string | object} component 组件对象或组件名称\n * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile\n * @param {string | string[]} types 组件的类型\n * @param {boolean | null} forArray 是否为数组类型的数据组件（可选）,为null表示同时支持数组和非数组的数据格式\n * @param {(definition: FieldDefinition, platform: Platform) => object} getProps 组件属性转换器（可选）\n */\n(component: string | object,\n platforms: Platform | Platform[],\n types: string | string[],\n forArray: boolean = null,\n getProps: ((definition: FieldDefinition, platform: Platform) => object) = () => ({})) => void {\n}\n"),g=Object(o["createStaticVNode"])('<ul><li>注意：注册的组件必须使用value来接收数据，并使用$emit(&#39;input&#39;, newValue)来触发数据更改</li></ul><h3 id="registerdisplaycomponent">registerDisplayComponent</h3><blockquote><p>注册详情展示组件</p></blockquote><p>方法签名同<code>registerComponent</code></p><ul><li>详情组件使用value属性接收表单项的值</li></ul><h3 id="registerlayout">registerLayout</h3><blockquote><p>注册布局组件</p></blockquote><p>方法签名如下:</p>',8),E=Object(o["createTextVNode"])("\n  /**\n * \n * @param {component: string | object; platforms: Platform | Platform[]; types: string | string[]; getProps\n?: (definition: FieldDefinition, platform: Platform) => object;} options 选项\n */\n(options: {\n  component: string | object,\n  platforms: Platform | Platform[],\n  types: string | string[],\n  getProps?: ((definition: FieldDefinition, platform: Platform) => object)\n}) => void {}\n"),P=Object(o["createStaticVNode"])("<p>选项对象的属性说明如下</p><table><thead><tr><th>属性</th><th>属性说明</th></tr></thead><tbody><tr><td>component</td><td>组件对象或组件名称</td></tr><tr><td>platforms</td><td>支持的平台（desktop,mobile）</td></tr><tr><td>types</td><td>布局类型</td></tr><tr><td>getProps</td><td>组件属性转换器（可选）</td></tr></tbody></table>",2);function k(e,t){var n=Object(o["resolveComponent"])("code-editor");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",r,[c,l,Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[a]})),_:1})]),i,d,Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[m]})),_:1})]),p,Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[b]})),_:1})]),s,u,f,j,O,N,V,Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[h]})),_:1})]),g,Object(o["createElementVNode"])("pre",null,[Object(o["createVNode"])(n,null,{default:Object(o["withCtx"])((function(){return[E]})),_:1})]),P])}var y=n("6b0d"),v=n.n(y);const w={},x=v()(w,[["render",k]]);t["default"]=x}}]);
//# sourceMappingURL=chunk-2d0b7257.955f552b.js.map