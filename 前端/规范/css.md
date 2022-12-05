# CSS 命名——BEM

## BEM 是什么

BEM 是一种 CSS 命名规范。

BEM 代表 “块（block），元素（element），修饰符（modifier）”。

在选择器中，由以下三种符号来表示扩展的关系：

```
-   中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
__  双下划线：双下划线用来连接块和块的子元素
_   单下划线：单下划线用来描述一个块或者块的子元素的一种状态
复制代码
```

## 使用 BEM 示例对比

### Block

如下面的例子，li.item 是列表的一个子元素

```arduino
/* 常规写法和BEM写法相同 */
.list
复制代码
```

### 元素(Element)

```html
/* 常规写法 */
<ul class="list">
  <li class="item">Pricing</li>
  <li class="item">Contact</li>
</ul>

/* BEM写法 */
<ul class="list">
  <li class="list__item">Pricing</li>
  <li class="list__item">Contact</li>
</ul>
复制代码
```

```css
/* 常规写法 */
.list{}
.list .item{}

/* BEM写法 */
.list{}
.list__item{}
复制代码
```

### 修饰符(modifier)

一个“修饰符”可以理解为一个块的特定状态！

```html
/* 常规写法 */
<ul class="list">
  <li class="item">Pricing</li>
  <li class="item">Contact</li>
</ul>

/* BEM写法 */
<ul class="list">
  <li class="list__item_active">Pricing</li>
  <li class="list__item">Contact</li>
</ul>
复制代码
```

```css
/* 常规写法 */
.list{}
.list .item{}
.list .item.active{}

/* BEM写法 */
.list{}
.list__item{}
.list__item_active{}
复制代码
```

## BEM 的好处

- 摆脱特异性的困扰
- 修复继承问题
- 停止担心命名

# css 命名几大原则

## 短命名比长命名会更好

因为短命名缩短书写时间，也减小了 css 文件大小！例如这个例子:

```css
//  推荐
.some-intro{...}

// 不推荐
.some-introduction{...}
复制代码
```

## 组合命名比单命名会更好

```css
// 不建议
.header{...}

//推荐
.cs-header{...}
复制代码
```

## 面向属性的命名和面向语义的命名

面向属性的命名指选择器的命名是跟着具体的 CSS 样式走的，与项目、页面、模块统统没有关系。例如，比较经典的清除浮动类名.clearfix:

```css
.clearfix:after { content : ''; display: table; clear: both; }
复制代码
```

面向语义的命名则是根据应用元素所处的上下文来命名的。例如:

```css
.header { background-color: #333; color: #fff; }
.logo {font-size: 0; color : transparent;}
复制代码
```

上述两种命名方式各有优缺点:

1.  面向属性

- **优点**:在于 CSS 的重用率高，性能最佳，即插即用，方便快捷，开发也极为迅速，因为它省去了大量在 HTML 和 CSS 文件之间切换的时间。
- **缺点**：在于由于属性单一，其适用场景有限，另外因为使用方便，易被过度使用，从而带来更高的维护成本。

2.  面向语义

- **优点**是应用场景广泛，可以实现非常精致的布局效果，扩展方便；
- **缺点**：在于代码啰唆，开发效率一般，因为所有 HTML 都需要命名，哪怕是一个 10 像素的间距。这就导致很多开发者要么选择直接使用标签选择器，要么就选择一个简单的类名，然后通过父子关系限定样式，结果带来了更糟糕的维护问题。

# 命名汇总推荐

## 状态

```sql
前一个    prev
后一个    next
当前的    current

显示的    show
隐藏的    hide
打开的    open
关闭的    close

选中的    selected
有效的    active
默认的    default
反转的    toggle

禁用的    disabled
危险的    danger
主要的    primary
成功的    success
提醒的    info
警告的    warning
出错的    error

大型的    lg
小型的    sm
超小的    xs
复制代码
```

## 布局

```css
文档    doc
头部    header(hd)
主体    body
尾部    footer(ft)
主栏    main
侧栏    side
容器    box/container
复制代码
```

## 通用部件

```css
列表    list
列表项  item
表格    table
表单    form
链接    link
标题    caption/heading/title
菜单    menu
集合    group
条      bar
内容    content
结果    result
复制代码
```

## 组件

```scss
按钮        button(btn)
字体        icon
下拉菜单    dropdown
工具栏      toolbar
分页        page
缩略图      thumbnail
警告框      alert
进度条      progress
导航条      navbar
导航        nav
子导航      subnav
面包屑      breadcrumb(crumb)
标签        label
徽章        badge
巨幕        jumbotron
面板        panel
洼地        well
标签页      tab
提示框      tooltip
弹出框      popover
轮播图      carousel
手风琴      collapse
定位浮标    affix
复制代码
```

## 语义化小部件

```scss
品牌        brand
标志        logo
额外部件    addon
版权        copyright
注册        regist(reg)
登录        login
搜索        search
热点        hot
帮助        help
信息        info
提示        tips
开关        toggle
新闻        news
广告        advertise(ad)
排行        top
下载        download
复制代码
```

## 功能部件

```arduino
左浮动    fl
右浮动    fr
清浮动    clear
复制代码
```

## 命名网站推荐

[codelf](https://link.juejin.cn/?target=https%3A%2F%2Funbug.github.io%2Fcodelf "https://unbug.github.io/codelf")
