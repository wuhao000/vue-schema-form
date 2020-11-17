(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61a8263a"],{"094a":function(t,n,e){"use strict";var d=e("24ea"),a=e.n(d);a.a},"0d16":function(t,n,e){"use strict";var d=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{padding:"25px"}},[t.md?e("div",[e("code",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.md)}})]):t._e(),e("div",{staticClass:"demo-content"},[t._t("default"),e("div",{staticClass:"clearfix"},[e("img",{staticClass:"code-expand-icon",attrs:{alt:"",src:t.showCode?"https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg":"https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"},on:{click:t.toggleCode}})])],2),e("div",{staticStyle:{padding:"10px 20px"}},[e("pre",{directives:[{name:"hljs",rawName:"v-hljs"},{name:"show",rawName:"v-show",value:t.showCode,expression:"showCode"}],staticClass:"code-box-code markdown-body clearfix"},[t._v("      "),e("code",{domProps:{textContent:t._s(t.code)}}),t._v("\n    ")])])])},a=[],s=e("d225"),o=e("b0b4"),r=e("308d"),c=e("6bb5"),l=e("4e2b"),i=e("9ab4"),f=e("8bbf"),p=e.n(f),u=e("2fe1"),h=e("60a3"),b=function(t){function n(){var t;return Object(s["a"])(this,n),t=Object(r["a"])(this,Object(c["a"])(n).apply(this,arguments)),t.showCode=!1,t}return Object(l["a"])(n,t),Object(o["a"])(n,[{key:"toggleCode",value:function(){return this.showCode=!this.showCode}}]),n}(p.a);Object(i["b"])([Object(h["b"])(String)],b.prototype,"code",void 0),Object(i["b"])([Object(h["b"])(String)],b.prototype,"md",void 0),b=Object(i["b"])([Object(u["b"])({name:"CodeWrapper"})],b);var m=b,v=m,y=(e("094a"),e("2877")),g=Object(y["a"])(v,d,a,!1,null,null,null);n["a"]=g.exports},"20f4":function(t,n){t.exports='<h1 id="副作用处理">副作用处理</h1>\n<blockquote>\n<p>表单副作用，也就是由表单字段的内部事件所产生的联动，校验，异步逻辑，如何更好的管理和维护副作用逻辑，恰好就是rxjs的最大优势，所以，本方案采用了rxjs来管理副作用逻辑</p>\n</blockquote>\n<p>表单的API中包含的effects即为表单的副作用函数，这个effects是一个功能极为强大的回调函数，\n它接收了一个selector函数作为参数，我们可以用selector来选择表单内的任意一个或多个字段，\n对其做状态修改，即便存在异步逻辑，也是可以很方便的在各种异步环境下对字段的状态做修改，\n所以，我们的表单联动，是不限于时空的。</p>\n<p>effects示例</p>\n<pre><code class="language-javascript">const effects = ($: EffectsContext) =&gt; {\n  $(&#39;s1&#39;).onFieldChange(value =&gt; {\n     $(&#39;s2&#39;).value(value);\n  });\n  $(&#39;s1&#39;).onFieldChange(value =&gt; {\n    if (value !== &#39;3&#39;) {\n      $(&#39;s3&#39;, &#39;s4&#39;). hide();\n    } else {\n      $(&#39;s3&#39;, &#39;s4&#39;).show();\n    }\n  });\n}</code></pre>\n<h2 id="选择器操作">选择器操作</h2>\n<p>$函数接收一个或多个路径作为参数,返回一个 EffectsHandlers 对象，\nEffectsHandlers 对象具有以下方法，对匹配到的表单项进行操作：</p>\n<table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>方法描述</th>\n<th>方法参数</th>\n<th>方法返回值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>paths</td>\n<td>匹配到的所有表单项的路径（主要用于通配符匹配）</td>\n<td>-</td>\n<td>string[]</td>\n</tr>\n<tr>\n<td>hide</td>\n<td>隐藏匹配到的表单项</td>\n<td>-</td>\n<td>EffectsHandlers</td>\n</tr>\n<tr>\n<td>show</td>\n<td>显示匹配到的表单项</td>\n<td>-</td>\n<td>EffectsHandlers</td>\n</tr>\n<tr>\n<td>onFieldChange</td>\n<td>当匹配的表单项的值发生变化时回调</td>\n<td>value: 新的值<br /> path: 发生变化的表单项的路径</td>\n<td>EffectsHandlers</td>\n</tr>\n<tr>\n<td>onFieldCreate</td>\n<td>当表单项被创建时调用一次</td>\n<td>value: 表单项的值<br /> path: 表单项路径</td>\n<td>EffectsHandlers</td>\n</tr>\n<tr>\n<td>setEnum</td>\n<td>为支持选项的表单项设置选项内容</td>\n<td>options: 选项/array</td>\n<td>EffectsHandlers</td>\n</tr>\n<tr>\n<td>setFieldProps</td>\n<td>为匹配的表单项设置属性</td>\n<td>props: 属性对象/object/{属性名称: 属性值}/object</td>\n<td>EffectsHandlers</td>\n</tr>\n<tr>\n<td>toggle</td>\n<td>匹配到的表单项在显示与影藏之间切换</td>\n<td>-</td>\n<td>EffectsHandlers</td>\n</tr>\n<tr>\n<td>value</td>\n<td>当不传参时表示获取匹配的表单项的值（只匹配一个表单项时直接返回该表单项的值，<br />匹配多个时返回多个表单项值组成的数组），当传递一个参数时，表示对匹配的表单项赋值</td>\n<td>value: 要设置的值</td>\n<td>当不传参时，匹配到的表单项的值</td>\n</tr>\n<tr>\n<td>subscribe</td>\n<td>订阅事件</td>\n<td>event: 事件名称（详细见<a href=\'#events\'>事件</a>）,callback: 回调函数/(data) =&gt; any;</td>\n<td></td>\n</tr>\n</tbody></table>\n<h2 id="effectscontext-上挂载的方法">EffectsContext 上挂载的方法</h2>\n<table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>方法描述</th>\n<th>方法参数</th>\n<th>方法返回值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>validate</td>\n<td>触发表单校验</td>\n<td>;</td>\n<td></td>\n</tr>\n<tr>\n<td>submit</td>\n<td>提交表单（主要在表单提交前触发校验，实际的提交请在自定义的回调中完成）</td>\n<td>forceValidate: 是否强制校验</td>\n<td>boolean <br/> callback: 回调函数，value参数为表单当前那的值</td>\n</tr>\n<tr>\n<td>getValue</td>\n<td>获取表单当前的值</td>\n<td>-</td>\n<td></td>\n</tr>\n</tbody></table>\n<h2 id="支持的事件">支持的事件</h2>\n<table>\n<thead>\n<tr>\n<th>事件名称</th>\n<th>事件说明</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>fieldKeydown</td>\n<td>keydown事件</td>\n</tr>\n<tr>\n<td>fieldKeyup</td>\n<td>keyup事件</td>\n</tr>\n<tr>\n<td>fieldFocus</td>\n<td>focus事件</td>\n</tr>\n<tr>\n<td>fieldBlur</td>\n<td>blur事件</td>\n</tr>\n</tbody></table>\n<h2 id="示例">示例</h2>\n'},"24ea":function(t,n,e){},acb2:function(t,n,e){"use strict";e.r(n);var d=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ae-layout",{staticClass:"bg-white",staticStyle:{"padding-bottom":"20px"}},[e("ae-layout-content",[e("ae-layout-content",{staticClass:"demo-wrapper"},[e("code",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.md)}})]),e("code-wrapper",{attrs:{code:t.code0,md:t.md0}},[e("demo0")],1)],1)],1)},a=[],s=e("0d16"),o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ae-layout",{staticClass:"demo-wrapper"},[e("ae-layout-content",[e("v-schema-form",{attrs:{effects:t.effects,schema:t.schema}})],1)],1)},r=[],c=e("98ce"),l={name:"DemoEffects1",data:function(){return{schema:{props:{inline:!0},fields:{layout:{type:"grid",layout:[6,6],fields:{s1:{type:"string",title:"aa"},s2:{type:"string",title:"bb"}}}}}}},created:function(){c["a"].registerElement()},methods:{effects:function(t){t("s1").onFieldChange(function(n){t("s2").value(n)})}}},i=l,f=e("2877"),p=Object(f["a"])(i,o,r,!1,null,null,null),u=p.exports,h=e("c6e3"),b=e.n(h),m=e("20f4"),v=e.n(m),y="<template>\n  <ae-layout class=\"demo-wrapper\">\n    <ae-layout-content>\n      <v-schema-form :effects=\"effects\"\n                     :schema=\"schema\">\n      </v-schema-form>\n    </ae-layout-content>\n  </ae-layout>\n</template>\n<script lang=\"ts\">\n  import SchemaForm from '@/schema-form';\n  import {EffectsContext} from 'v-schema-form-types';\n\n  export default {\n    name: 'DemoEffects1',\n    data() {\n      return {\n        schema: {\n          props: {inline: true},\n          fields: {\n            layout: {\n              type: 'grid',\n              layout: [6, 6],\n              fields: {\n                s1: {\n                  type: 'string',\n                  title: 'aa'\n                },\n                s2: {\n                  type: 'string',\n                  title: 'bb'\n                }\n              }\n            }\n          }\n        }\n      };\n    },\n    created() {\n      SchemaForm.registerElement();\n    },\n    methods: {\n      effects($: EffectsContext) {\n        $('s1').onFieldChange(value => {\n          $('s2').value(value);\n        });\n      }\n    }\n  };\n<\/script>\n",g={name:"DocEffects",components:{CodeWrapper:s["a"],demo0:u},data:function(){return{md:v.a,code0:y,md0:b.a}}},w=g,C=Object(f["a"])(w,d,a,!1,null,null,null);n["default"]=C.exports},c6e3:function(t,n){t.exports="<blockquote>\n<p>下面的例子是实现aa在值改变的时候将bb的值设置为aa的值。</p>\n</blockquote>\n"}}]);
//# sourceMappingURL=chunk-61a8263a.2c5248ed.js.map