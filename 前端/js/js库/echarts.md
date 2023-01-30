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