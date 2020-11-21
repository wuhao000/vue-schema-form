# 副作用处理

> 表单副作用，也就是由表单字段的内部事件所产生的联动，校验，异步逻辑，如何更好的管理和维护副作用逻辑，恰好就是rxjs的最大优势，所以，本方案采用了rxjs来管理副作用逻辑

表单的API中包含的effects即为表单的副作用函数，这个effects是一个功能极为强大的回调函数，
它接收了一个selector函数作为参数，我们可以用selector来选择表单内的任意一个或多个字段，
对其做状态修改，即便存在异步逻辑，也是可以很方便的在各种异步环境下对字段的状态做修改，
所以，我们的表单联动，是不限于时空的。

effects示例

``` javascript
const effects = ($: EffectsContext) => {
  $('s1').onFieldChange(value => {
     $('s2').value(value);
  });
  $('s1').onFieldChange(value => {
    if (value !== '3') {
      $('s3', 's4'). hide();
    } else {
      $('s3', 's4').show();
    }
  });
}
```
## 选择器操作

$函数接收一个或多个路径作为参数,返回一个 EffectsHandlers 对象，
EffectsHandlers 对象具有以下方法，对匹配到的表单项进行操作：

方法名|方法描述|方法参数|方法返回值
---|---|---|---
paths|匹配到的所有表单项的路径（主要用于通配符匹配）|-|string[]
hide|隐藏匹配到的表单项|-|EffectsHandlers
show|显示匹配到的表单项|-|EffectsHandlers
onFieldChange|当匹配的表单项的值发生变化时回调|value: 新的值<br /> path: 发生变化的表单项的路径|EffectsHandlers
onFieldCreate|当表单项被创建时调用一次|value: 表单项的值<br /> path: 表单项路径| EffectsHandlers
setEnum|为支持选项的表单项设置选项内容|options: 选项/array | EffectsHandlers
setFieldProps|为匹配的表单项设置属性|props: 属性对象/object/{属性名称: 属性值}/object | EffectsHandlers
toggle|匹配到的表单项在显示与影藏之间切换|-|EffectsHandlers
value|当不传参时表示获取匹配的表单项的值（只匹配一个表单项时直接返回该表单项的值，<br />匹配多个时返回多个表单项值组成的数组），当传递一个参数时，表示对匹配的表单项赋值|value: 要设置的值|当不传参时，匹配到的表单项的值
subscribe|订阅事件|event: 事件名称（详细见<a href='#events'>事件</a>）,callback: 回调函数/(data) => any;

## EffectsContext 上挂载的方法

方法名|方法描述|方法参数|方法返回值
---|---|---|---
validate|触发表单校验|;
submit|提交表单（主要在表单提交前触发校验，实际的提交请在自定义的回调中完成）|forceValidate: 是否强制校验|boolean <br/> callback: 回调函数，value参数为表单当前那的值|
getValue|获取表单当前的值|-


## 支持的事件
事件名称|事件说明
---|---
fieldKeydown|keydown事件
fieldKeyup|keyup事件
fieldFocus|focus事件
fieldBlur|blur事件

## 示例




