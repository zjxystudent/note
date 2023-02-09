# echarts

## api

init(实例，theme?,opts?) 初始化

connect 将多个图表的图例关联
![../../assert/img/connect实现图.png]
disconnected

## option

```js
chart.setOption(option, notMerge, lazyUpdate);
```
- option 
- notMerge: 可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并
- lazyUpdate

其中 Canvas 的优势是**重绘快**，所以适合大数据量。而 SVG 的优势则是内存占用低，更适合移动端。我们这次新增的脏矩形优化，是希望把 Canvas 的大数据量重绘性能继续提升一个台阶。为更多场景提供更流畅的交互体验。