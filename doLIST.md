# 将listen1重构 实现Android

# 在GitHub上，放置封装好的flutter工具库

# 使用vue将工具库这些用网页呈现

# 将echart中的示例，手打一次，可以在看到图时大概知道用哪个方法，能在文档中找到



# https://www.netfly.tv/

js 中使用`...`扩展符,数量较大在65000以上时进行push会出错，
由于
```
const item=[]
const Items=new Array(1000000)
item.push(...Items)
```
等同于

```

var item = [];
var Items = new Array(1000000);
item.push.apply(item, Items);
```
apply() 接受参数的有上限的65000
https://juejin.cn/post/7160449924209836039