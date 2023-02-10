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

# getZr


> 因为这是私有 API，官方没开放过，自然就没有文档。目前你可以用，但不保证某个版本后就失效了（比如移除了、改名了、或者改变传参啊返回值啊什么的，而且这玩意儿因为是私有 API，所以可能甚至不会有 Breaking Changes Release Notes）。而用法也都是开发者们看源码自己总结出来的，毕竟是开源项目。