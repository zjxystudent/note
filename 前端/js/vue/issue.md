https://blog.csdn.net/good_good_xiu/article/details/118567249

https://blog.csdn.net/Rae_1999/article/details/124474387

reject 996:
https://github.com/996icu/996.ICU/blob/master/README_CN.md

# issue

## 实现echart动态上升的折线图

### 显示 randomData 方法不存在. 
![](../../../assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172440.png)

打个断点，发现在draw方法内，this指向的是组件，但在定时器中 this指向的是window 
![](../../../assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172733.png)
![](../../../assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172850.png)

箭头函数中的this指向是固定不变（定义函数时的指向），在vue中指向vue;

普通函数中的this指向是变化的（使用函数时的指向），谁调用的指向谁。
