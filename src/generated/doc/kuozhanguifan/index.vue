<template>
  <div class="markdown-body">
    <h1 id="form-schema-扩展规范">Form Schema 扩展规范</h1>
<h2 id="背景">背景</h2>
<p>通常使用type来描述组件类型，但是组件类型我们通常命名为数据的类型，如果一个数据类型想要使用不同的输入组件时，可以通过<code>xType</code>来指定</p>
<p>例如：<code>boolean</code> 类型通常对应的是<code>Switch</code>组件，但是如果想要使用复选框来作为输入组件时，就可以按如下内容配置：</p>
<pre><code-editor mode="json">
  {
  "type": "boolean",
  "xType": "checkbox"
}
</code-editor></pre>
<h2 id="表单校验描述">表单校验描述</h2>
<p>在表单场景中，校验是必不可少的，同样，为了描述字段的校验规则，我们使用<code>rules</code>来描述字段的校验规则：</p>
<pre><code-editor mode="json">
  {
  "type": "string",
  "rules": [
    {
      "pattern": "\\d+",
      "message": "必须是数字"
    }
  ]
}
</code-editor></pre>
<h2 id="表单组件属性描述">表单组件属性描述</h2>
<p>每个表单组件其实都会有自己的一套属性，有控制交互行为的，也有控制样式的，所以我们使用 <code>props</code> 来给传递给具体的表单 UI 组件：</p>
<pre><code-editor mode="json">
  {
  "type": "select",
  "props": {
    "multiple": true
  }
}
</code-editor></pre>
<h2 id="表单字段顺序描述">表单字段顺序描述</h2>
<p>因为 JSON Schema 描述对象型数据结构同样是使用对象结构来描述，但是想要映射到 UI 界面上，就会存在一个显示顺序的问题，对象 key 是无序的，所以，我们就扩展了 x-index 来控制字段顺序：</p>
<pre><code-editor mode="json">
  {
  "type": "object",
  "properties": {
    "aa": {
      "type": "string",
      "x-rules": [
        {
          "pattern": "\\d+",
          "message": "必须是数字"
        }
      ],
      "x-props": {
        "multiple": true
      },
      "x-index": 1
    },
    "bb": {
      "type": "string",
      "x-rules": [
        {
          "pattern": "\\d+",
          "message": "必须是数字"
        }
      ],
      "x-props": {
        "multiple": true
      },
      "x-index": 0
    }
  }
}
</code-editor></pre>
</div>
</template>