# 布局基础

## 主轴方向 flex-direction
flex-direction 属性指定了内部元素是如何在 flex 容器中布局的，定义了主轴的方向 (正方向或反方向)。
> 文本方向，就如同古代书写从右到左，而现代从左向右。

### row

flex 容器的主轴被定义为与文本方向相同。主轴起点和主轴终点与内容方向相同。

### row-reverse

表现和 row 相同，但是置换了主轴起点和主轴终点

### column

flex 容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同

### column-reverse

表现和column相同，但是置换了主轴起点和主轴终点

![alt](../../assert/Excalidraw/%E5%B8%83%E5%B1%80/flex-dirction.excalidraw.svg)

> 请注意，值 `row` 和 `row-reverse` 受 `flex` 容器的方向性的影响。如果它的 `dir` 属性是 `ltr``，row` 表示从左到右定向的水平轴，而 `row-reverse` 表示从右到左; 如果 `dir` 属性是 `rtl`，`row` 表示从右到左定向的轴，而 `row-reverse` 表示从左到右。



## 换行方式 flex-wrap
flex-wrap 属性指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。
### nowrap

flex 的元素被摆放到到一行，这可能导致 flex 容器溢出。cross-start 会根据 flex-direction 的值等价于 start 或 before。为该属性的默认值。

### wrap

flex 元素 被打断到多个行中。cross-start 会根据 flex-direction 的值等价于 start 或before。cross-end 为确定的 cross-start 的另一端。

### wrap-reverse

和 wrap 的行为一样，但是 cross-start 和 cross-end 互换

## 收缩规则 flex-shrink

flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

# 对齐方式 

## 主轴项目 justify-content

对齐主轴上的项目，主轴是水平方向的。

### flex-start
从行首开始排列。每行第一个弹性元素与行首对齐，同时所有后续的弹性元素与前一个对齐。

### flex-end
从行尾开始排列。每行最后一个弹性元素与行尾对齐，其他元素将与后一个对齐。

### center
伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。

### space-between
在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。

### space-around
在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。

[](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
[MDN flex布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)