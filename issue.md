https://blog.csdn.net/good_good_xiu/article/details/118567249

https://blog.csdn.net/Rae_1999/article/details/124474387

reject 996:
https://github.com/996icu/996.ICU/blob/master/README_CN.md

# ❓ beforeEnter 和 beforeRouteEnter 的区别
- beforeEnter 在路由上直接配置的
- beforeRouteEnter写在组件内
- beforeEnter是在路由被激活之前调用，而beforeRouteEnter是在组件实例化之前调用，因此beforeRouteEnter可以访问组件实例，而beforeEnter不能。

# ❓ 在实现echart里面动态上升折线图的案例时,显示 randomData 方法不存在. 
![](../../../assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172440.png)

打个断点，发现在draw方法内，this指向的是组件，但在定时器中 this指向的是window 
![](../../../assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172733.png)
![](../../../assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172850.png)


