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

# ❓ 在JavaScript语言中调用普通的函数和调用对象的静态方法哪个效率高

调用普通函数的效率更高，因为它不需要访问对象的内部状态，
而调用对象的静态方法需要访问对象的内部状态，这会增加访问时间。

# 🚩
## markdowm
https://markdown.com.cn/cheat-sheet.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95
## 
基本的软件工程技术，包括软件设计、编程、数据库管理、网络技术、系统分析和设计等。此外，你还需要掌握前端开发技术，如HTML、CSS、JavaScript、Ajax、jQuery等，以及一些前端框架，如AngularJS、ReactJS等


# ❓win10中cmd输入python打开应用商店解决方法
win10菜单搜索【管理应用执行别名】关闭下面两个按钮【应用安装程序】

# 🚩Windows 设置环境变量（cmd）
查看 set path

所有的在cmd命令行下对环境变量的修改只对当前窗口有效，不是永久性的修改。也就是说当关闭此cmd命令行窗口后，将不再起作用。
```cmd
path=%path%;C:\python3.7
```
```powershell
path=%path%;C:\python3.7\Scripts
```
# ❓pip下载超时Read timed out.

# ❓`<input type="file"> `文件上传后，修改文件内容重新上传后，控制台报错<font style="color:red">net：ERR_UPLOAD_FILE_CHANGED</font>，network，Request请求头显示黄色感叹号，并提示 Provisional headers are shown

通过f12对源代码打断点，同名文件二次上传，@clicked方法没有被调用，

- 文件修改后file的本地文件已经丢失
- 此文件已经变为另一个文件，如果没有其他用户操作（例如重新上传此文件），我们不能访问此文件，否则将是安全问题

解决方法：将
```js
this.$refs.xxx.value = "";
```

# 🚩模糊查询
https://www.jianshu.com/p/4cd4f74a0b20

#