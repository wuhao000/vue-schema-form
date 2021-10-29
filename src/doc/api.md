## V Schema Form 属性

属性|名称|类型|默认值|说明
---|---|---|---|---
disabled|禁用| boolean|false|禁用表单内所有输入组件以及按钮
loading|加载中状态|boolean|false|表单内所有输入组件禁用，提交按钮为加载中状态
actions|表单的操作定义|Action[]|
platform|平台|desktop<br/>mobile|desktop|
editable|是否编辑模式|boolean|true|false时为详情模式
effects|副作用函数|Effects|()=>{}|
schema|表单布局对象|SchemaFormField||
value|输入的值|object或object[]|支持v-model
title|表单标题|VNode<br/>string|支持slot
inline|是否线性布局|boolean|false|
sticky|是否固定底部按钮|boolean|

## 插槽 （slots）
 
插槽名称| 插槽说明
---|---
title | 表单标题
header | 渲染在表单标题之后和内容之前
footer | 渲染在表单内容之后

<div id="field-def">

## 表单字段定义

属性|名称|类型|默认值|说明
---|---|---|---|---
title|字段标签|string|
property|关联的属性名称|string
type|字段类型|string
array|字段值是否数组类型|boolean|false
required|字段是否必填|boolean|false
placeholder|表单项值为空时的占位信息|string
layoutType|布局类型|string或object| |
layoutProps|布局组件的选项|object| |
arrayComponent|数组组件（可选，当array=true时有效）|string或object||
arrayProps|数组组件的属性|object||
layout|布局描述（当layoutType不为空时有效）|object||
enum|枚举选项，选项类型的字段有效（select,expand-select,cascader,transfer）|any[]||
depends|依赖显示的条件，支持条件选项或函数，当函数返回false时不显示该字段,使用副作用函数设置可见性后失效| ShowFieldCondition[] 或 ((value: any) => boolean)||
notice|提示信息| string||
fields|当字段类型为object或为布局类型时，子表单的字段列表|FormFields||
displayValue|当表单模式为详情模式时显示的内容|string 或 VNode 或 ((value: any) => any)|
rules|表单项校验规则（async-validator）|any[]||
min|数值输入组件的最小值|number||
max|数值输入组件的最大值| number||
placeholder|输入内容为空时的占位文字|string||;
span|栅格布局下的栅格数(设置后该表单项以栅格组件包装，如果相邻的字段也设置了该属性，则会纳入同一行)|number||
props|表单输入组件的自定义属性|SchemaFormFieldProps;
wrapperProps|表单项包装组件的属性|object||
slot|表单项渲染使用插槽，当指定插槽时所有的属性将无效，直接使用插槽内容渲染|string||
visible|是否可见|boolean||
processor|自定数据转换器|ValueProcessor||

</div>



### Action 说明

类型 string { name: string; text: string; props?: object; action?: ($) => {} }

当类型为string时，支持的值有ok，cancel，reset，分别表示提交、取消、重置操作，
当类型为object时，表示定义一个操作按钮，
text为按钮的文本，
props为按钮属性，
action为按钮点击回调,回调函数使用EffectsContext对象作为参数

