不过你可能对浏览器的默认样式不太满意。没关系，只需选定那个元素，加一条 CSS 规则即可。就拿我们的无序列表 <ul>举个例子吧，它自带项目符号，不过要是你跟它有仇，你就可以这样移除它们：

li {
  list-style-type: none;
}
Copy to Clipboard
把上述代码加到你的 CSS 里面试一试！

欢迎参阅 MDN 上的 list-style-type 属性，看看到底有哪些值被支持。 list-style-type 页首提供互动性示例，您可以输入不同的值来瞅一瞅它们到底有什么用。关于每个值的详细描述都规规整整地列在下面。

CSS 为控制继承提供了五个特殊的通用属性值。每个 CSS 属性都接收这些值。

inherit
设置该属性会使子元素属性和父元素相同。实际上，就是“开启继承”。

initial
将应用于选定元素的属性值设置为该属性的初始值。

revert (en-US)
将应用于选定元素的属性值重置为浏览器的默认样式，而不是应用于该属性的默认值。在许多情况下，此值的作用类似于 unset。

revert-layer (en-US)
将应用于选定元素的属性值重置为在上一个层叠层中建立的值。

unset
将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial 一样



# less

& 内层选择器表示对父选择器的引用

```css
.demo{
  &-title{
    text-align:center;
  }
}
/* 编译成 */
.demo-title{
  text-align:center;
}
```

```css
.demo{
  &:after{
    text-align:center;
  }
}
/* 编译成 */
.demo:after{
  text-align:center;
}
```