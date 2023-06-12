<https://blog.csdn.net/good_good_xiu/article/details/118567249>

<https://blog.csdn.net/Rae_1999/article/details/124474387>

reject 996:
<https://github.com/996icu/996.ICU/blob/master/README_CN.md>

# ISSUE

##

### 🚩markdowm

<https://markdown.com.cn/cheat-sheet.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95>

基本的软件工程技术，包括软件设计、编程、数据库管理、网络技术、系统分析和设计等。此外，你还需要掌握前端开发技术，如HTML、CSS、JavaScript、Ajax、jQuery等，以及一些前端框架，如AngularJS、ReactJS等

### ❓win10中cmd输入python打开应用商店解决方法

win10菜单搜索【管理应用执行别名】关闭下面两个按钮【应用安装程序】

### 🚩Windows 设置环境变量（cmd）

查看 set path

所有的在cmd命令行下对环境变量的修改只对当前窗口有效，不是永久性的修改。也就是说当关闭此cmd命令行窗口后，将不再起作用。

```cmd
path=%path%;C:\python3.7
```

```powershell
path=%path%;C:\python3.7\Scripts
```


## JS

### ❓ vue-router中 beforeEnter 和 beforeRouteEnter 的区别

- beforeEnter 在路由上直接配置的
- beforeRouteEnter写在组件内
- beforeEnter是在路由被激活之前调用，而beforeRouteEnter是在组件实例化之前调用，因此beforeRouteEnter可以访问组件实例，而beforeEnter不能。

### ❓ 在实现echart里面动态上升折线图的案例时,显示 randomData 方法不存在

打个断点，发现在draw方法内，this指向的是组件，但在定时器中 this指向的是window

![Alt text](assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172733.png)
![Alt text](assert/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-02-09%20172850.png)

### ❓ 在JavaScript语言中调用普通的函数和调用对象的静态方法哪个效率高

调用普通函数的效率更高，因为它不需要访问对象的内部状态，
而调用对象的静态方法需要访问对象的内部状态，这会增加访问时间。

### ❓`<input type="file">`文件上传后，修改内容再次上传，控制台报错`net：ERR_UPLOAD_FILE_CHANGED`，network，Request请求头显示黄色感叹号，并提示 Provisional headers are shown

通过f12对源代码打断点，同名文件二次上传，@clicked方法没有被调用，

- 文件修改后file的本地文件已经丢失
- 此文件已经变为另一个文件，如果没有其他用户操作（例如重新上传此文件），我们不能访问此文件，否则将是安全问题

解决方法：将input的value设置为空

```js
this.$refs.xxx.value = "";
```

### ❓ web图片拖入页面，显示图片；禁止图片拖动

1. 禁止整个页面的拖动
```js
//main.js
document.ondragover = function (event) { return false; };
document.ondrop = function (event) { return false; };
```

```html
<!-- index.html -->
<body ondragover='return false' ondrop='return false'></body>
```
2. 禁止vue组件拖动
```html
<div @dragover.prevent @drop.prevent></div>
```


### 🚩模糊查询

<https://www.jianshu.com/p/4cd4f74a0b20>

### 🚩vue中data,method 命名重复

重复的命名会覆盖掉，判断顺序为props,methods,data,computed,watch.

### 🚩vue中reactive重新赋值

通过Object.assign()

```js
const obj=reactive({a:0,b:1})
Object.assign(obj,{a:1,b:2})
```

### 🚩获取文字的宽度

``` JS
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
ctx.font = '14px helvetica';
const headNameWidth = ctx.measureText(column.displayName).width
 ```

### 🚩object 值比较

通过JSON.stringify()

### 🚩文件选择框
```js
/**
 * @typedef UseFileDialogOptions
 * @property {boolean=} multiple
 * @property {string=} accept
 * @property {string=} capture
 * @property {boolean=} webkitdirectory
 */
/**
 * 
 * @param {{onChange?:(event)=>void,options?:UseFileDialogOptions}} param0 
 * @returns 
 */
export function useFileDialog({ onChange, options }) {
    const dom = window.document;
    const _input = dom.createElement('input');
    _input.type = 'file';
    let fileList = [];

    _input.onchange = (event) => {
        const result = event.target;
        // @ts-ignore
        fileList = result.files;
        onChange && onChange(event);
    };
    /**
     * 
     * @param {UseFileDialogOptions=} localOption 
     * @returns 
     */
    const open = (localOption) => {
        const _option = { ...options, ...localOption };
        if (_option.multiple) { _input.multiple = _option.multiple; };
        if (_option.accept) { _input.accept = _option.accept; };
        if (_option.capture) { _input.capture = _option.capture; };
        if (_option.webkitdirectory) { _input.webkitdirectory = _option.webkitdirectory; }
        _input.click();
    };
    const reset = () => { _input.value = ''; fileList = []; };
    return { fileList, open, reset };
}
```

### 监听元素大小变化

```js
        const observer = new ResizeObserver(([tableWrapperDom, ...entries]) => {
            if (!tableWrapperDom) { return; };
            tableMaxHeight.value = tableWrapperDom.contentRect.height;
        });
        onMounted(() => { observer.observe(tableWrapperRef.value); });
        onUnmounted(() => { observer.disconnect(); });
```