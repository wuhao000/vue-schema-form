<template>
  <div class="markdown-body">
    <h1 id="安装使用">安装使用</h1>
<h2 id="cdn引入">CDN引入</h2>
<pre><code-editor mode="html">
  &lt;link ref="stylesheet" href="https://public-file.aegis-info.com/schema-form/&lt;version&gt;/SchemaForm.css"&gt;
&lt;script src="https://public-file.aegis-info.com/schema-form/&lt;version&gt;/SchemaForm.umd.min.js.gz"&gt;&lt;/script&gt;
</code-editor></pre>
<p>当前最新版本为<code>3.0.172</code></p>
<h2 id="npm-安装">npm 安装</h2>
<pre><code class="language-bash">npm install v-schema-form
</code></pre>
<p>在main.ts中引入</p>
<pre><code-editor mode="typescript">
  import SchemaForm, {registerAntd, registerAntdMobile, registerComponent} from 'v-shema-form';
</code-editor></pre>
<h3 id="registerantd">registerAntd</h3>
<blockquote>
<p>使用<code>ant-design-vue</code>组件库</p>
</blockquote>
<p>推荐使用cdn引入组件库</p>
<h3 id="registerantdmobile">registerAntdMobile</h3>
<blockquote>
<p>使用<code>antd-mobile-vue-next</code>组件库</p>
</blockquote>
<h3 id="registercomponent">registerComponent</h3>
<blockquote>
<p>注册自定义组件</p>
</blockquote>
<p>方法签名如下</p>
<pre><code-editor mode="typescript">
  import {ArrayMode} from './form';

/**
 * 注册表单组件
 * @param {string | object} component 组件对象或组件名称
 * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile
 * @param {string | string[]} types 组件的类型
 * @param {(definition: FieldDefinition, platform: Platform) =&gt; object} getProps 组件属性转换器（可选）
 */
(options: {
  component: string | object,
  platforms: Platform | Platform[],
  types: string | string[],
  /**
   * display 该组件可用于详情模式
   * input 该组件可用于输入模式
   * both 同时支持编辑和详情
   * render 仅用于渲染，不影响表单值, 例如button类型组件
   * layout 该组件为布局组件，为布局组件时，以上值均无效
   *
   */
  mode: 'display' | 'input' | 'both' | 'layout' | 'render',
  /**
   * array 该组件支持数组 （代替原来的array=true）
   * single 该组件不支持数组，仅支持单值输入，默认input仅支持single
   */
  arrayMode: 'array' | 'single' | 'both',
  getProps: ((definition: FieldDefinition, platform: Platform) =&gt; object)
}) =&gt; void {}
</code-editor></pre>
<ul>
<li>注意：注册的组件必须使用value来接收数据，并使用$emit('input', newValue)来触发数据更改</li>
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
<pre><code-editor mode="typescript">
  /**
 * 
 * @param {component: string | object; platforms: Platform | Platform[]; types: string | string[]; getProps
?: (definition: FieldDefinition, platform: Platform) =&gt; object;} options 选项
 */
(options: {
  component: string | object,
  platforms: Platform | Platform[],
  types: string | string[],
  getProps?: ((definition: FieldDefinition, platform: Platform) =&gt; object)
}) =&gt; void {}
</code-editor></pre>
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
</div>
</template>