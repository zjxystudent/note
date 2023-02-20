
# delete

用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。

## delete与内存释放

delete操作符一般是用于删除对象上的属性的；使用了delete操作符后，不会立刻就会释放这个属性的引用，而是将这个属性和这个对象解除绑定。

```javascript
var obj = {
    a: 1,
    b: { c: 1}
}
var new_obj = obj.b
delete obj.a
delete obj.b
console.log(obj) // {}
console.log(new_obj) // {c: 1}
```

通过上面的代码我们知道，没有其他变量指向obj的a属性的引用（而且它是一个原始值），而new_obj指向了obj的b属性的引用，当我们删除了obj的a属性和b属性之后，obj就变成了一个空对象，而obj本来b属性的引用此时还存在，因此它不会回收掉；从这个例子就可以看出：delete操作符和释放内存无关，它只是断开了对象和属性的引用关系。只有当没有其他变量指向你删除的属性的引用时，这个属性所处的内存区块才会被下一次垃圾回收时释放。

## .?、??、??=

## ?? 与 || 的区别

1. 相同点：

?? 和 || 的用法相同，都是前后是值，中间用符号连接，根据前面的值来判断最终是返回前面的值还是后面的值。

- One ?? Two
- One || Two

2. 不同点：

判断的方法不同：

- 使用 ?? 时，只有One为 null 或者 undefined 时才会返回 two;
- 使用 || 时，One会先转化为布尔值判断，为true时返回One , false 返回Two

```js
// ??
undefined ?? 2    // 2
null?? 2        // 2
0 ?? 2           // 0
""?? 2           // ""
true?? 2       // true
false?? 2       // false
// ||
undefined || 2   // 2
null|| 2       // 2
0 || 2           // 2
""|| 2           // 2
true|| 2       // true
false|| 2       // 2
```

## ?? 和 ?. 的区别

1. 空值合并操作符 ??

只有当左侧为null 或者undefined 时，才会返回右侧的值。

```js
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"
const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
const nullValue = null;
const emptyText = ""; // 空字符串，是一个假值，Boolean("") === false
const someNumber = 42;

const valA = nullValue ?? "valA 的默认值";
const valB = emptyText ?? "valB 的默认值";
const valC = someNumber ?? 0;

console.log(valA); // "valA 的默认值"
console.log(valB); // ""（空字符串虽然是假值，但不是 null 或者 undefined）
console.log(valC); // 42
```

2. 可选链操作符 ?.

可选链操作符 ?. 允许读取连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于. 链操作符，不同之处在于，在引用为空，即 null 或者 undefined 的情况下不会引起错误，该表达式短路返回值。

```js
const obj = { a: { b: [{ name: 'obj' }] } }

// 原本的写法
console.log(obj && obj.a && obj.a.b.length && obj.a.b[0].name)

// 可选链写法
console.log(obj?.a?.b?.[0]?.name); // obj
console.log(obj?.b?.c?.d) // undefined
```

例如上面的例子，?. 判断的对象是 nullish (null 或者 undefined) ，表达式就会短路，不再往后执行，返回 undefined

可以和 ?? 运算符结合使用：

```js
const obj = { a : { name: 'obj'} }

obj?.a?.b ?? 'hello world' // hello world
```

# 原型和原型链

## 原型链污染

# 函数作用域（scope）

# 立即调用函数表达式 IIFE

是一个在定义时就会立即执行的 JavaScript 函数
。

```js
(function () {
    statements
})();
```

这是一个被称为 [自执行匿名函数] (一个 JavaScript 函数 在定义后立即执行。)的设计模式，主要包含两部分。第一部分是包围在 圆括号运算符` () `里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。

第二部分再一次使用 () 创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。

示例
当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问。

```js
(function () {
    var name = "Barry";
})();
// 无法从外部访问变量 name
name // 抛出错误："Uncaught ReferenceError: name is not defined"
```

将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。

```js
var result = (function () {
    var name = "Barry";
    return name;
})();
// IIFE 执行后返回的结果：
result; // "Barry"
```

# 闭包（Closures）

「函数」和「函数内部能访问到的变量」的总和，就是一个闭包。
![alt](../../assert/Excalidraw/Drawing%202022-11-30%2010.21.18.excalidraw.svg)

「我听说闭包是需要函数套函数，然后 return 一个函数的呀！」

比如这样：

```text
function foo(){
  var local = 1
  function bar(){
    local++
    return local
  }
  return bar
}

var func = foo()
func()
```

这里面确实有闭包，local 变量和 bar 函数就组成了一个闭包（Closure）。

**为什么要函数套函数呢？**

是因为需要局部变量，所以才把 local 放在一个函数里，如果不把 local 放在一个函数里，local 就是一个全局变量了，达不到使用闭包的目的——隐藏变量（等会会讲）。

这也是为什么我上面要说「运行在一个立即执行函数中」。

有些人看到「闭包」这个名字，就一定觉得要用什么包起来才行。其实这是翻译问题，闭包的原文是 Closure，跟「包」没有任何关系。

所以函数套函数只是为了造出一个局部变量，跟闭包无关。

**为什么要 return bar 呢？**

因为如果不 return，你就无法使用这个闭包。把 return bar 改成 window.bar = bar 也是一样的，只要让外面可以访问到这个 bar 函数就行了。

所以 return bar 只是为了 bar 能被使用，也跟闭包无关。

## 闭包的作用

闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」。

假设我们在做一个游戏，在写其中关于「还剩几条命」的代码。

如果不用闭包，你可以直接用一个全局变量：

```text
window.lives = 30 // 还有三十条命
```

这样看起来很不妥。万一不小心把这个值改成 -1 了怎么办。所以我们不能让别人「直接访问」这个变量。怎么办呢？

用局部变量。

但是用局部变量别人又访问不到，怎么办呢？

暴露一个访问器（函数），让别人可以「间接访问」。

代码如下：

```text
!function(){

  var lives = 50

  window.奖励一条命 = function(){
    lives += 1
  }

  window.死一条命 = function(){
    lives -= 1
  }

}()
```

简明起见，我用了中文 :)

那么在其他的 JS 文件，就可以使用 window.奖励一条命() 来涨命，使用 window.死一条命() 来让角色掉一条命。

# 什么情况会引起内存泄漏(无法释放已经不使用的内存)？

虽然有垃圾回收机制但是我们编写代码操作不当还是会造成内存泄漏。

1. 意外的全局变量引起的内存泄漏。  
    原因：全局变量，不会被回收。  
    解决：使用严格模式避免。

2. 闭包引起的内存泄漏  
原因：由于ie浏览器的垃圾回收基于计数策略，如果两个对象之间形成了循环应用，那么这两个对象都无法回收
解决：将循环应用中的变量设为NULL
    <!-- 原因：闭包可以维持函数内局部变量，使其得不到释放。  
    解决：将事件处理函数定义在外部，解除闭包,或者在定义事件处理函数的外部函数中，删除对dom的引用。 -->

3. 没有清理的DOM元素引用  
    原因：虽然别的地方删除了，但是对象中还存在对dom的引用  
    解决：手动删除。

4. 被遗忘的定时器或者回调  
    原因：定时器中有dom的引用，即使dom删除了，但是定时器还在，所以内存中还是有这个dom。  
    解决：手动删除定时器和dom。

5. 子元素存在引用引起的内存泄漏  
    原因：div中的ul li 得到这个div，会间接引用某个得到的li，那么此时因为div间接引用li，即使li被清空，也还是在内存中，并且只要li不被删除，他的父元素都不会被删除。  
    解决：手动删除清空。

# 定时器

setInterval() ：按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。

setInterval(code,millisec,lang)
参数 描述
code 必需。要调用的函数或要执行的代码串。
millisec 必须。周期性执行或调用 code 之间的时间间隔，以毫秒计。
lang 可选。 JScript | VBScript | JavaScript

setTimeout(code,millisec,lang)：在指定的毫秒数后调用函数或计算表达式。

clearInterval（timer）

# 方法 Function

## 方法

### Function.prototype.call()

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
const test1=new Food('cheese', 5)
console.log(test1.name);
console.log(test1.price);
console.log(test1.category);
/* 
Expected output: "cheese"
Expected output: "5"
Expected output: "food" 
*/

 ```
# 函数提升

对于函数来说，只有函数声明会被提升到顶部，而函数表达式不会被提升。

```js
/* 函数声明 */

foo(); // "bar"

function foo() {
  console.log("bar");
}


/* 函数表达式 */

baz(); // 类型错误：baz 不是一个函数

var baz = function() {
  console.log("bar2");
};
```

# this

## 标准函数

在网页的全局上下文中调用函数时，this指向windows
this,指向方法使用时的上下文。
如果在全局函数中调用，则 this 在非严格模式下等于 window，在严格模式下等于 undefined
普通函数中的this指向是变化的（使用函数时的指向），谁调用的指向谁。

## 箭头函数

箭头函数中的 this 会保留定义该函数时的上下文zhi
this,指向方法定义时的上下文
箭头函数中的this指向是固定不变（定义函数时的指向），在vue中指向vue;

# proxy

用于创建一个**对象**的代理，从而实现[[vue#基本语义|基本操作]]的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```js
const proxy=new Proxy(target,handler);
```

- `target`参数表示所要拦截的目标对象。

- `handler`参数也是一个对象，用来定制拦截行为。

下面是 Proxy 支持的拦截操作一览，一共 13 种。

1. **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。

2. **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。

3. **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。

4. **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。

5. **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。

6. **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。

7. **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。

8. **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。

9. **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。

10. **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。

11. **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

12. **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。

13. **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 工作原理

创建代理对象时指定的[[概念#常规对象与异质对象|拦截函数]]，实际上时用自定义代理对象的内部方法和行为的，而不是用来指定被代理对象的内部方法和行为的。

## 实例：Web 服务的客户端

Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。

```javascript
const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
```

上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

```javascript
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl + '/' + propKey);
    }
  });
}
```

同理，Proxy 也可以用来实现数据库的 ORM 层

# Reflect

（1） 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

（2） 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

```javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

（3） 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

```javascript
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

（4）`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

```javascript
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

# Symbol

表示**独一无二**的值，属于JavaScript的原生数据类型之一，其他数据类型是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）。

Symbol 值通过`Symbol()`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

## 实例

### 消除魔术字符串

魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```javascript
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```

上面代码中，字符串`Triangle`就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

常用的消除魔术字符串的方法，就是把它写成一个变量。

```javascript
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

上面代码中，我们把`Triangle`写成`shapeType`对象的`triangle`属性，这样就消除了强耦合。

如果仔细分析，可以发现`shapeType.triangle`等于哪个值并不重要，只要确保不会跟其他`shapeType`属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```javascript
const shapeType = {
  triangle: Symbol()
};
```

上面代码中，除了将`shapeType.triangle`的值设为一个 Symbol，其他地方都不用修改。

***在typescript中可以用enum实现***

```ts
enum Role{
  ADMIN,
  VISITER,
  EMPLOYEE
}
```

### 模块的 Singleton 模式

Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。

对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？

很容易想到，可以把实例放到顶层对象`global`。

```javascript
// mod.js
function A() {
  this.foo = 'hello';
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;
```

然后，加载上面的`mod.js`。

```javascript
const a = require('./mod.js');
console.log(a.foo);
```

上面代码中，变量`a`任何时候加载的都是`A`的同一个实例。

但是，这里有一个问题，全局变量`global._foo`是可写的，任何文件都可以修改。

```javascript
global._foo = { foo: 'world' };

const a = require('./mod.js');
console.log(a.foo);
```

上面的代码，会使得加载`mod.js`的脚本都失真。

为了防止这种情况出现，我们就可以使用 Symbol。

```javascript
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
```

上面代码中，可以保证`global[FOO_KEY]`不会被无意间覆盖，但还是可以被改写。

```javascript
global[Symbol.for('foo')] = { foo: 'world' };

const a = require('./mod.js');
```

如果键名使用`Symbol`方法生成，那么外部将无法引用这个值，当然也就无法改写。

```javascript
// mod.js
const FOO_KEY = Symbol('foo');

// 后面代码相同 ……
```

上面代码将导致其他脚本都无法引用`FOO_KEY`。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的`FOO_KEY`都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。

# `...`扩展符

## 接受的参数限制于65000以下

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
<https://juejin.cn/post/7160449924209836039>

# 箭头函数

## 普通函数和箭头函数中的this

1.1 function函数
var a = 0;
function foo(){
    console.log(this);
    console.log(this.a);
}
foo(); // 1. window; 2. 0
1.2 箭头函数
// 在箭头函数中
var foo = () => {
    console.log(this);
    console.log(this.a)
};
foo();// 1. window; 2. 0

###

# issue

**在JavaScript语言中调用普通的函数和调用对象的静态方法哪个效率高**

调用普通函数的效率更高，因为它不需要访问对象的内部状态，

而调用对象的静态方法需要访问对象的内部状态，这会增加访问时间。

# 参考资料

1. [知乎《我不知道的JS之delete操作符》卢伟](https://zhuanlan.zhihu.com/p/149975274)
1. [详解JS中? ?和?. 和||的区别](https://www.jb51.net/article/251657.htm)
1. [Closurs-JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

1. [简书 《了解JS中的WeakMaps》 魂斗驴](https://www.jianshu.com/p/2cfb4d05e4c8)
1. javaScript高级程序设计（第4版）
1. [《ECMAScript 6 入门 》阮一峰](https://es6.ruanyifeng.com/#docs/symbol)
1. [JS-箭头函数中的this的指向](https://blog.csdn.net/zhq2005095/article/details/70666833)
