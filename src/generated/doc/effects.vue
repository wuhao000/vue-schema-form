<template>
  <a-layout class="bg-white" style="padding-bottom: 20px;">
    <a-layout-content>
      <a-layout-content class="demo-wrapper">
        <code class="markdown-body">
          <h1 id="副作用处理">副作用处理</h1>
<blockquote>
<p>表单副作用，也就是由表单字段的内部事件所产生的联动，校验，异步逻辑，如何更好的管理和维护副作用逻辑，恰好就是rxjs的最大优势，所以，本方案采用了rxjs来管理副作用逻辑</p>
</blockquote>
<p>表单的API中包含的effects即为表单的副作用函数，这个effects是一个功能极为强大的回调函数，
它接收了一个selector函数作为参数，我们可以用selector来选择表单内的任意一个或多个字段，
对其做状态修改，即便存在异步逻辑，也是可以很方便的在各种异步环境下对字段的状态做修改，
所以，我们的表单联动，是不限于时空的。</p>
<p>effects示例</p>
<pre><code class="language-javascript">const effects = ($: EffectsContext) =&gt; {
  $(&#39;s1&#39;).onFieldChange(value =&gt; {
     $(&#39;s2&#39;).value(value);
  });
  $(&#39;s1&#39;).onFieldChange(value =&gt; {
    if (value !== &#39;3&#39;) {
      $(&#39;s3&#39;, &#39;s4&#39;). hide();
    } else {
      $(&#39;s3&#39;, &#39;s4&#39;).show();
    }
  });
}</code></pre>
<h2 id="选择器操作">选择器操作</h2>
<p>$函数接收一个或多个路径作为参数,返回一个 EffectsHandlers 对象，
EffectsHandlers 对象具有以下方法，对匹配到的表单项进行操作：</p>
<table>
<thead>
<tr>
<th>方法名</th>
<th>方法描述</th>
<th>方法参数</th>
<th>方法返回值</th>
</tr>
</thead>
<tbody><tr>
<td>disable</td>
<td>禁用表单项</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>enable</td>
<td>启用表单项</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>fields</td>
<td>获取匹配到的所有表单项</td>
<td>-</td>
<td>FieldDefinition[]</td>
</tr>
<tr>
<td>paths</td>
<td>匹配到的所有表单项的路径（主要用于通配符匹配）</td>
<td>-</td>
<td>string[]</td>
</tr>
<tr>
<td>hide</td>
<td>隐藏匹配到的表单项</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>show</td>
<td>显示匹配到的表单项</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>onFieldBlur</td>
<td>当匹配的表单项失去焦点时的回调</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>onFieldChange</td>
<td>当匹配的表单项的值发生变化时回调</td>
<td>value: 新的值<br /> path: 发生变化的表单项的路径</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>onFieldCreate</td>
<td>当表单项被创建时调用一次</td>
<td>value: 表单项的值<br /> path: 表单项路径</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>onFieldCreateOrChange</td>
<td>当表单项创建或者值发生变化时回调</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>onFieldFocus</td>
<td>当匹配的表单项获取到焦点时回调</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>setEnum</td>
<td>为支持选项的表单项设置选项内容</td>
<td>options: 选项/array</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>setFieldProps</td>
<td>为匹配的表单项设置属性</td>
<td>props: 属性对象/object/{属性名称: 属性值}/object</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>setTitle</td>
<td>修改表单项的名称</td>
<td>string:新的表单项名称</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>toggle</td>
<td>匹配到的表单项在显示与影藏之间切换</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>value</td>
<td>当不传参时表示获取匹配的表单项的值（只匹配一个表单项时直接返回该表单项的值，<br />匹配多个时返回多个表单项值组成的数组），当传递一个参数时，表示对匹配的表单项赋值</td>
<td>value: 要设置的值</td>
<td>当不传参时，匹配到的表单项的值</td>
</tr>
<tr>
<td>subscribe</td>
<td>订阅事件</td>
<td>event: 事件名称（详细见<a href='#events'>事件</a>）,callback: 回调函数/(data) =&gt; any;</td>
<td></td>
</tr>
</tbody></table>
<h2 id="effectscontext-上挂载的方法">EffectsContext 上挂载的方法</h2>
<table>
<thead>
<tr>
<th>方法名</th>
<th>方法描述</th>
<th>方法参数</th>
<th>方法返回值</th>
</tr>
</thead>
<tbody><tr>
<td>validate</td>
<td>触发表单校验</td>
<td>;</td>
<td></td>
</tr>
<tr>
<td>submit</td>
<td>提交表单（主要在表单提交前触发校验，实际的提交请在自定义的回调中完成）</td>
<td>forceValidate: 是否强制校验</td>
<td>boolean <br/> callback: 回调函数，value参数为表单当前那的值</td>
</tr>
<tr>
<td>getValue</td>
<td>获取表单当前的值</td>
<td>-</td>
<td></td>
</tr>
</tbody></table>
<h2 id="支持的事件">支持的事件</h2>
<table>
<thead>
<tr>
<th>事件名称</th>
<th>事件说明</th>
</tr>
</thead>
<tbody><tr>
<td>fieldKeydown</td>
<td>keydown事件</td>
</tr>
<tr>
<td>fieldKeyup</td>
<td>keyup事件</td>
</tr>
<tr>
<td>fieldFocus</td>
<td>focus事件</td>
</tr>
<tr>
<td>fieldBlur</td>
<td>blur事件</td>
</tr>
</tbody></table>
<h2 id="示例">示例</h2>

        </code>
      </a-layout-content>
      <code-wrapper :code="code0" :md="md0">
        <demo0/>
      </code-wrapper>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import CodeWrapper from '../../components/code-wrapper.vue';
  import demo0 from '../../doc/demo/effects/effects1.vue';
  import code0 from './demo/effects/effects1.vue.txt';

  export default defineComponent({
    name: 'DocEffects',
    components: {CodeWrapper, demo0},
    setup() {
      return {code0};
    }
  });
</script>
