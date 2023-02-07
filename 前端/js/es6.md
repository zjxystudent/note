# proxy

用于创建一个**对象**的代理，从而实现[[vue#基本语义|基本操作]]的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```js
const proxy=new Proxy(target,handler);
```

- `target`参数表示所要拦截的目标对象。

- `handler`参数也是一个对象，用来定制拦截行为。
 
下面是 Proxy 支持的拦截操作一览，一共 13 种。

1. **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。

2.   **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。

3.   **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。

4.   **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。

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

# Map

Map保存键值对，并记住key的原始插入顺序

## Map和Object的区别

### key

- Object中的key必须是**原始**数据类型。它们可以是字符串，数字，符号，甚至是bigInt。即使您添加非原始key（例如Object或Array），它们也将被转换为String。但是，您仍然可以检索它们。

- 使用Map，您可以将任何**数据类型**（例如Object，Array等）用作key,其内部使用SameValueZero比较操作，等同与使用严格对象相等的标准来检测键的匹配性。
   
**SameValueZero 比较也可能导致意想不到的冲突：**
   
  ```javascript
const m = new Map(); 
const a = 0/"", // NaN 
	  b = 0/"", // NaN 
	  pz = +0,
	  nz = -0; 
	  alert(a === b); // false 
	  alert(pz === nz); // true 
	  m.set(a, "foo"); 
	  m.set(pz, "bar"); 
	  alert(m.get(b)); // foo 
	  alert(m.get(nz)); // bar
```

- 即使你能添加一个Object作为在一个key的**Object**，你只能做一次。如果将多个key添加为Object，则仅保留最后一个。但是对于**Map**，情况并非如此。

***SameValueZero** 是 ECMAScript 规范新增的相等性比较算法。关于 ECMAScript 的相 等性比较，ECMAScript 规范内部定义，语言中不能使用可以，参考 MDN 文档中的文章“Equality Comparisons and Sameness”。*

### Method

-   对于Object，可以使用此表示法设置和获取值`obj[number]`，但对于Map，我们应使用的方法`get(), set(), has()`等。您可以在[MDN文档中](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FMap)阅读有关这些方法的更多信息。

- Map实例会维护键值对的插入顺序，可以 执行迭代操作

## 基本API

### 构造函数

```javascript
//空映射
const m=new Map();

//传入可迭代对象（包含键值对数组）初始化
const m1=new Map([
["key1","val1"],
["key2","val2"],
["key3","val3"],
])

// 映射期待的键/值对，无论是否提供 
const m3 = new Map([[]]);
alert(m3.has(undefined)); // true 
alert(m3.get(undefined)); // undefined
```

# WeakMap

WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。其中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。

WeakMap对key是弱引用，不影响垃圾回收的工作。一旦key被垃圾回收器回收，那么对应的键和值就访问不到了。所以WeakMap经常用于存储那些只有当key所引用的对象存在时（没有被回收）才有价值的信息。 ^354e2c

## 差异

-   **它们只能包含作为Object的key**

原始数据类型不允许作为key。如果您使用原始值，则会引发错误`TypeError: Invalid value used as weak map key`。之所以只允许Object作为key是因为从不对原始值进行垃圾回收。如果确实允许使用原始值作为key，那么您根本不会从WeakMap中受益。

-   **您需要知道key才能获得其价值**

由于引用Weak，因此WeakMap不包含可迭代项或获取key列表的方法。此外，您也无法访问WeakMap的大小。由于这些属性，WeakMap有时被称为黑匣子。

## 实例

### 在Chrome中Map和WeakMap内存消耗情况

```javascript
function Obj(){
    this.val = new Array(10000000).join(",,,");
}

window.obj = new Obj();
let map = new Map();
map.set(window.obj, 1);
//Take a memory snapshot here

// Run the following code after the initial memory snapshot
delete window.obj
1234
//1234 is needed to avoid logging the obj in console
```
![[Chrome中Map内存消耗情况图.svg]]

***解释** 如您在上面的示例中看到的，即使在运行`delete window.obj`该变量之后，也尚未对其进行垃圾回收。这是因为即使在`obj`中删除了`window`对的引用，也没有删除Map中的引用。垃圾回收器无法释放内存，`obj`因为Map中仍然存在引用。要在Map中删除参考，您必须使用`map.clear()`或删除key`map.delete(window.obj)`。这将导致垃圾回收器释放内存。*

```javascript
function Obj(){
    this.val = new Array(10000000).join(",,,");
}

window.obj = new Obj();
let map = new WeakMap();
map.set(window.obj, 1);
//Take a memory snapshot here

// Run the following code after the initial memory snapshot
delete window.obj
1234
//1234 is needed to avoid logging the obj in console
```

![[Chrome中WeakMap内存消耗情况图.svg]]
***解释** 与Map示例相反，只要您运行`delete window.obj`，该变量就会被垃圾回收。当在`obj`中删除对的引用时`window`，垃圾回收器未找到`obj`对它的其他引用，因此释放了分配给它的内存。即使我们确实有一个WeakMap引用了`obj`，垃圾回收器仍然最终释放了内存。这是因为如前所述，WeakMap中的引用是“**Weak**”的。*

### 添加其他数据

WeakMap允许您将其他数据添加到属于另一个或第三方代码的Object中。使用WeakMap的特殊“Weak”链接功能，我们可以确保与该外来Object关联的数据仅在该Object处于活动状态时才存在。

```javascript
weakMap.set(alienObject, "newly found secret about aliens");
// if the alienObject dies, newly found secret about aliens will also be destroyed automatically
```

### 缓存数据

使用WeakMap，您可以将先前计算的结果与Object相关联，而不必担心内存管理。以下示例将计算结果缓存在`cache`WeakMap中。一旦将Object从引用中删除，则内存也将被释放。

```javascript
// 📁 cache.js
let cache = new WeakMap();
// compute and remember the result
function compute(obj) {
  if (!cache.has(obj)) {
    let result = obj.name + " is " + obj.age + " years old.";
    cache.set(obj, result);
    return [result,'computed'];
  }
return [cache.get(obj),'cached'];
}
// 📁 main.js
let obj = {name:'John',age:16};
let result1 = compute(obj);
let result2 = compute(obj);
console.log(result1);
//["John is 16 years old.", "computed"]
console.log(result2);
//["John is 16 years old.", "cached"]
delete obj;
//Memory is cleared as soon as obj reference is removed
```

# Set

## 方法

### forEach

在调用forEach 遍历Set集合时，如果一个值已经被访问过了，但改制被删除并重新添加到集合，如果此次遍历没有结束，该值会被重新访问。

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

# 参考资料

1. [简书 《了解JS中的WeakMaps》 魂斗驴  ](https://www.jianshu.com/p/2cfb4d05e4c8)
2. javaScript高级程序设计（第4版）
2. [《ECMAScript 6 入门 》阮一峰](https://es6.ruanyifeng.com/#docs/symbol)