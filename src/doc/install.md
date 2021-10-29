# 安装使用

## CDN引入
```html
<link ref="stylesheet" href="https://public-file.aegis-info.com/schema-form/<version>/SchemaForm.css">
<script src="https://public-file.aegis-info.com/schema-form/<version>/SchemaForm.umd.min.js.gz"></script>
```

当前最新版本为<code>0.1.2</code>

## npm 安装

```bash
npm install v-schema-form
```

在main.ts中引入
```javascript
import SchemaForm from 'v-shema-form';
```

SchemaForm 具有以下方法：

### registerAntd

> 使用<code>ant-design-vue</code>组件库

推荐使用cdn引入组件库

### registerComponent 

> 注册自定义组件

方法签名如下

```javascript
/**
 * 注册表单组件
 * @param {string | object} component 组件对象或组件名称
 * @param {Platform | Platform[]} platforms 支持的平台 desktop,mobile
 * @param {string | string[]} types 组件的类型
 * @param {boolean | null} forArray 是否为数组类型的数据组件（可选）,为null表示同时支持数组和非数组的数据格式
 * @param {(definition: FieldDefinition, platform: Platform) => object} getProps 组件属性转换器（可选）
 */
(component: string | object,
 platforms: Platform | Platform[],
 types: string | string[],
 forArray: boolean = null,
 getProps: ((definition: FieldDefinition, platform: Platform) => object) = () => ({})) => void {
}
```
* 注意：注册的组件必须使用value来接收数据，并使用$emit('input', newValue)来触发数据更改

### registerDisplayComponent

> 注册详情展示组件

方法签名同<code>registerComponent</code>

* 详情组件使用value属性接收表单项的值

### registerLayout

> 注册布局组件

方法签名如下:

```javascript
/**
 * 
 * @param {component: string | object; platforms: Platform | Platform[]; types: string | string[]; getProps
?: (definition: FieldDefinition, platform: Platform) => object;} options 选项
 */
(options: {
  component: string | object,
  platforms: Platform | Platform[],
  types: string | string[],
  getProps?: ((definition: FieldDefinition, platform: Platform) => object)
}) => void {}
```


选项对象的属性说明如下

属性|属性说明
---|---
component|组件对象或组件名称
platforms|支持的平台（desktop,mobile）
types| 布局类型
getProps| 组件属性转换器（可选）
