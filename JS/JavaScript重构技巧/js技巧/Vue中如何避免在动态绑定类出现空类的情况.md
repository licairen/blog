<!--
 * @Author       : 李才人
 * @Date         : 2020-08-20 10:58:15
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-20 11:17:37
 * @FilePath     : /blog/JS/JavaScript重构技巧/js技巧/Vue中如何避免在动态绑定类出现空类的情况.md
-->
* 传递空字符串，这可能会导致 DOM 输出中的类为空。在三元运算符中，我们可以返回"null"，这可以确保 DOM 中没有空类🌟

###### 虚值

```javascript
> 下面这些是 JS 中的虚值。
> 因此，如果isBold是这些值中的任何一个，它将返回三元运算符的假的情况。

> false
> undefined
> null
> NaN
> 0
"" or '' or `` (empty string)
```
> Tips: 我们不能渲染空类，我们必须传递null或undefined
```
❌ <div :class="isBold ? 'bold' : ''">
    <div class>

✅<div :class="isBold ? 'bold' : null">
   <div>

```
###### 方案 1：使用空字符串 ''
> 
``` javascript
我们使用三元运算符根据isBold是true还是false来有条件地设置适当的类。
在下面示例中:
如果 isBold 是true，类就被设置为bold。
如果是false ，它将返回一个空字符串''。

html:
<div :class="isBold ? 'bold' : ''"></div>
js:
data() {
  return {
    isBold: false
  }
}
最终渲染的样子： <div class></div> ; 😱 啊！ 空的class

如果isBold为true，会被渲染为：<div class="bold"></div>

```

###### 方案 2：使用null or undefined

```javascript
html

<div :class="isBold ? 'bold' : null"></div>
<div :class="isBold ? 'bold' : undefined"></div>
js

data() {
  return {
    isBold: false
  }
}
最终渲染的样子： <div></div>

✅ Nice, 没有空的class
如果isBold为true，会被渲染为：
<div class="bold"></div>
```

###### 使用对象语法重构

```javascript
> 对于上面的事例，使用对象语法会更好一些：

<div :class="{ bold: isBold }"></div>
使用三元运算符的一个更好的场景是设置多个类。

<div :class="isActive ? 'underline bold' : null"></div>
```

###### 使用 && 设置类

```javascript
> 对于上面的事例，使用对象语法会更好一些：

<div :class="{ bold: isBold }"></div>
使用三元运算符的一个更好的场景是设置多个类。

<div :class="isActive ? 'underline bold' : null"></div>
```