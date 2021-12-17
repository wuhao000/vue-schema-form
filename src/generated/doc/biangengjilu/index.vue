<template>
  <div class="markdown-body">
    <h2 id="更新日志">更新日志</h2>
<h3 id="v316">v3.1.6</h3>
<p><code>2021.11.19</code>
🐛 修复对象数组元素移动时会导致数据错乱的问题
🌟 新增defineSchemaForm方法，除了可以提供类型支持，返回的副作用操作对象选择器参数支持代码提示（实验性特性）</p>
<h3 id="v315">v3.1.5</h3>
<p><code>2021.11.5</code></p>
<p>🐛 修复使用解构的组件默认值不生效的问题</p>
<p>🐛 解决antd组件年份选择的适配问题</p>
<p>🐛 解决antd组件日期时间选择适配的问题</p>
<p>🐛 解决分步布局下按下一步时校验失效的问题</p>
<h3 id="v314">v3.1.4</h3>
<p><code>2021.11.3</code></p>
<p>🐛 修复typescript类型</p>
<h3 id="v313">v3.1.3</h3>
<p><code>2021.11.2</code></p>
<p>🐛 修复嵌套布局下数据回填失效的问题</p>
<h3 id="v311">v3.1.1</h3>
<p><code>2021.11.1</code></p>
<p>🌟 表单项选项去除forDisplay,forArray,forInput,layout等属性，使用mode和arrayMode代替</p>
<p>🌟 副作用函数增加setStates用于代替enable,disable,editable,show,hide,readonly,required等方法，简化api</p>
<h3 id="v30172">v3.0.172</h3>
<p><code>2021.10.29</code></p>
<p>🌟 表单项支持显示序号</p>
<p>🌟 支持使用vue组件作为type</p>
<p>🌟 支持异步获取选项（enum）</p>
<h3 id="v013">v0.1.3</h3>
<p><code>2019.9.9</code></p>
<p>🌟 表单项定义增加默认值（default属性）</p>
<p>🌟 表单项为详情模式（editable为false）时，使用value操作赋值不会更新到表单的值对象</p>
</div>
</template>