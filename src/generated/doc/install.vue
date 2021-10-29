<template>
  <a-layout class="bg-white" style="padding-bottom: 20px;">
    <a-layout-content>
      <a-layout-content class="demo-wrapper">
        <code class="markdown-body">
          <h1 id="安装使用">安装使用</h1>
<h2 id="cdn引入">CDN引入</h2>
<pre><code class="language-html">&lt;link ref=&quot;stylesheet&quot; href=&quot;https://public-file.aegis-info.com/schema-form/&lt;version&gt;/SchemaForm.css&quot;&gt;
&lt;script src=&quot;https://public-file.aegis-info.com/schema-form/&lt;version&gt;/SchemaForm.umd.min.js.gz&quot;&gt;&lt;/script&gt;</code></pre>
<p>当前最新版本为<code>0.1.2</code></p>
<h2 id="npm-安装">npm 安装</h2>
<pre><code class="language-bash">npm install v-schema-form</code></pre>
<p>在main.ts中引入</p>
<pre><code class="language-javascript">import SchemaForm from &#39;v-shema-form&#39;;</code></pre>
<p>SchemaForm 具有以下方法：</p>
<h3 id="registerantd">registerAntd</h3>
<blockquote>
<p>使用<code>ant-design-vue</code>组件库</p>
</blockquote>
<p>推荐使用cdn引入组件库</p>
<h3 id="registercomponent">registerComponent</h3>
<blockquote>
<p>注册自定义组件</p>
</blockquote>
<p>方法签名如下</p>
<pre><code class="language-javascript">/**
 * 注册表单组件
 * @param {string | object} component 组件对象或组件名称
 * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile
 * @param {string | string[]} types 组件的类型
 * @param {boolean | null} forArray 是否为数组类型的数据组件（可选）,为null表示同时支持数组和非数组的数据格式
 * @param {(definition: FieldDefinition, platform: Platform) =&gt; object} getProps 组件属性转换器（可选）
 */
(component: string | object,
 platforms: Platform | Platform[],
 types: string | string[],
 forArray: boolean = null,
 getProps: ((definition: FieldDefinition, platform: Platform) =&gt; object) = () =&gt; ({})) =&gt; void {
}</code></pre>
<ul>
<li>注意：注册的组件必须使用value来接收数据，并使用$emit(&#39;input&#39;, newValue)来触发数据更改</li>
</ul>
<h3 id="registerdisplaycomponent">registerDisplayComponent</h3>
<blockquote>
<p>注册详情展示组件</p>
</blockquote>
<p>方法签名同<code>registerComponent</code></p>
<ul>
<li>详情组件使用value属性接收表单项的值</li>
</ul>
<h3 id="registerlayout">registerLayout</h3>
<blockquote>
<p>注册布局组件</p>
</blockquote>
<p>方法签名如下:</p>
<pre><code class="language-javascript">/**
 * 
 * @param {component: string | object; platforms: Platform | Platform[]; types: string | string[]; getProps
?: (definition: FieldDefinition, platform: Platform) =&gt; object;} options 选项
 */
(options: {
  component: string | object,
  platforms: Platform | Platform[],
  types: string | string[],
  getProps?: ((definition: FieldDefinition, platform: Platform) =&gt; object)
}) =&gt; void {}</code></pre>
<p>选项对象的属性说明如下</p>
<table>
<thead>
<tr>
<th>属性</th>
<th>属性说明</th>
</tr>
</thead>
<tbody><tr>
<td>component</td>
<td>组件对象或组件名称</td>
</tr>
<tr>
<td>platforms</td>
<td>支持的平台（desktop,mobile）</td>
</tr>
<tr>
<td>types</td>
<td>布局类型</td>
</tr>
<tr>
<td>getProps</td>
<td>组件属性转换器（可选）</td>
</tr>
</tbody></table>

        </code>
      </a-layout-content>
      
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import CodeWrapper from '../../components/code-wrapper.vue';
  
  

  export default defineComponent({
    name: 'DocEffects',
    components: {CodeWrapper},
    setup() {
      return {};
    }
  });
</script>
