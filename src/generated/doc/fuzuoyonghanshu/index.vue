<template>
  <div class="markdown-body">
    <h1 id="副作用处理">副作用处理</h1>
<blockquote>
<p>表单副作用，也就是由表单字段的内部事件所产生的联动，校验，异步逻辑，如何更好的管理和维护副作用逻辑，恰好就是rxjs的最大优势，所以，本方案采用了rxjs来管理副作用逻辑</p>
</blockquote>
<p>表单的API中包含的effects即为表单的副作用函数，这个effects是一个功能极为强大的回调函数，
它接收了一个selector函数作为参数，我们可以用selector来选择表单内的任意一个或多个字段，
对其做状态修改，即便存在异步逻辑，也是可以很方便的在各种异步环境下对字段的状态做修改，
所以，我们的表单联动，是不限于时空的。</p>
<p>effects示例</p>
<blockquote>
<p>下面的例子是实现aa在值改变的时候将bb的值设置为aa的值。</p>
</blockquote>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;a-layout&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          :effects="effects"
          :schema="schema"&gt;
      &lt;/v-schema-form&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  import {EffectsContext} from '../../../types';
  import {registerAntd} from '../../schema-form';

  registerAntd();
  
  const schema = {
    props: {inline: true},
    fields: {
      layout: {
        type: 'grid',
        layout: [6, 6],
        fields: {
          s1: {
            type: 'string',
            title: 'aa'
          },
          s2: {
            type: 'string',
            title: 'bb'
          }
        }
      }
    }
  };
  const effects = ($: EffectsContext) =&gt; {
    $('s1').onFieldChange(value =&gt; {
      $('s2').value(value);
    });
  }
&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
<h2 id="选择器操作">选择器操作</h2>
<p>$函数接收一个或多个路径作为参数,返回一个 EffectsHandlers 对象，
EffectsHandlers 对象具有以下方法，对匹配到的表单项进行操作：</p>
<h3 id="状态操作函数">状态操作函数</h3>
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
<td>disabled: boolean //是否禁用，默认值true</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>enable</td>
<td>启用表单项</td>
<td>enable: boolean //是否启用，默认值true</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>editable</td>
<td>设置匹配到的表单项是否可编辑</td>
<td>editable: boolean //是否可编辑</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>hide</td>
<td>隐藏匹配到的表单项</td>
<td>hide: boolean //是否隐藏，默认值true</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>required</td>
<td>设置匹配到的表单项的必填状态</td>
<td>required: boolean // 是否必填</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>show</td>
<td>显示匹配到的表单项</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>toggle</td>
<td>匹配到的表单项在显示与影藏之间切换</td>
<td>-</td>
<td>EffectsHandlers</td>
</tr>
</tbody></table>
<h3 id="事件函数">事件函数</h3>
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
<td>isEnabled</td>
<td>匹配到的表单项是否禁用状态</td>
<td>-</td>
<td>当匹配到多个表单项时，只有全部启用才返回true，反之返回false</td>
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
<td>value: 新的值<br> path: 发生变化的表单项的路径</td>
<td>EffectsHandlers</td>
</tr>
<tr>
<td>onFieldCreate</td>
<td>当表单项被创建时调用一次</td>
<td>value: 表单项的值<br> path: 表单项路径</td>
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
<td>subscribe</td>
<td>订阅事件</td>
<td>event: 事件名称（详细见<a href="#events">事件</a>）,callback: 回调函数/(data) =&gt; any;</td>
<td></td>
</tr>
<tr>
<td>trigger</td>
<td>匹配到的表单项触发指定事件</td>
<td>event: string //触发的事件名称</td>
<td>EffectsHandlers</td>
</tr>
</tbody></table>
<h3 id="属性值事件函数">属性/值事件函数</h3>
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
<td>setDisplayValue</td>
<td>当匹配到的字段为非编辑模式时，设置指定的显示内容</td>
<td>displayValue: string,number,VNode //显示的内容</td>
<td></td>
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
<td>value</td>
<td>当不传参时表示获取匹配的表单项的值（只匹配一个表单项时直接返回该表单项的值，<br>匹配多个时返回多个表单项值组成的数组），当传递一个参数时，表示对匹配的表单项赋值</td>
<td>value: 要设置的值</td>
<td>当不传参时，匹配到的表单项的值</td>
</tr>
</tbody></table>
<h3 id="匹配操作函数">匹配操作函数</h3>
<table>
<thead>
<tr>
<th>方法名</th>
<th>方法描述</th>
<th>方法参数</th>
<th>方法返回值</th>
<th>备注</th>
</tr>
</thead>
<tbody><tr>
<td>fields</td>
<td>获取匹配到的所有表单项</td>
<td>-</td>
<td>FieldDefinition[]</td>
<td></td>
</tr>
<tr>
<td>field</td>
<td>获取匹配到的唯一表单项，如果有多个，则返回null</td>
<td>-</td>
<td>FieldDefinition</td>
<td></td>
</tr>
<tr>
<td>paths</td>
<td>匹配到的所有表单项的路径（主要用于通配符匹配）</td>
<td>-</td>
<td>string[]</td>
<td></td>
</tr>
<tr>
<td>appendPath</td>
<td>在上一步的选择器上添加指定的子路径进行匹配</td>
<td>path: string //添加的子路径</td>
<td>EffectsHandlers</td>
<td>例如：$('a.b').appendPath('c') 等同于 $('a.b.c')</td>
</tr>
<tr>
<td>takePath</td>
<td>将路径按层级切割后取前面n层深度</td>
<td>n: number // 要获取的深度</td>
<td>EffectsHandlers</td>
<td>例如：$('a.b.c').takePath(2) 等同于 $('a.b')</td>
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
<td>boolean <br> callback: 回调函数，value参数为表单当前那的值</td>
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
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>