## 属性 （props）

属性 | 名称 | 类型 | 默认值 | 说明
---|---|---|---|--- 
definition|表单内容定义|详见 <code><a href="#form-def">表单内容定义</a></code>| 
mode | 模式 | string, display 或 edit | edit | display: 详情模式，edit: 编辑模式
platform|平台| string, mobile 或 desktop | desktop | desktop: 桌面端, mobile: 移动端
value | 绑定的值对象 | object | | 支持v-model
props | 表单的属性 | object | {} | 与使用的组件库相关，使用ant-design-vue，则为a-form的属性，使用element-ui则为el-form的属性
rules | 校验规则 | object |  | 同Element UI的表单校验规则，当声明校验规则时，不再使用表单字段声明中的校验属性

## 事件 （listeners）

事件名称 | 事件说明
---|---
ok | 点击保存按钮时触发事件，保存按钮只在声明了ok事件监听时渲染
cancel | 点击取消按钮时触发事件，取消按钮只在声明了cancel事件监听时渲染
reset | 点击重置按钮时触发事件，重置按钮只在声明了reset事件监听时渲染
change | 当value发生变化时触发

 

## 插槽 （slots）
 
插槽名称| 插槽说明
---|---
header | 渲染在表单外之前的内容
footer | 渲染在表单外之后的内容
prepend | 渲染在表单内部最前面的内容
append | 渲染在表单内容最后面的内容
btns | 渲染底部按钮，代替默认的保存、取消、重置按钮



<div id="form-def">

## 表单内容定义

属性|名称|类型|说明
---|---|---|---
fields|表单字段|array|详见<code><a href="#field-def">表单字段定义</a></code>

</div>

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

</div>

## 内置的字段类型

字段类型|字段说明|Element组件|Ant Design Vue(必须同时使用aegis-ui-desktop)组件|Ant Design Mobile组件
---|---|---|---|---
string|单行文本|el-input|d-input|m-input
text|多行文本|el-input|d-textarea|m-textarea
select|单选或多选|el-select|d-select|非数组使用m-popup-radio-list,数组使用m-popup-checkbox-list
expand-select|展开选项的单选或多选|非数组使用el-radio-group,数组使用el-checkbox-group|非数组使用d-radio-group,数组使用d-checkbox-group|非数组使用m-radio-list,数组使用m-checkbox-list
integer|整数|el-input-number|d-input-number|m-input
double|小数|el-input-numberr|d-input-number|m-input
boolean|布尔|el-switch|d-switch|m-switch-item
date|日期|el-date-picker|d-date-picker|m-date-picker
datetime|日期时间|el-date-picker|d-date-picker|m-date-picker
object|子表单|el-form|d-form|m-list


