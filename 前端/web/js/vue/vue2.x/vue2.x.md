通过js的object.defineProperty()数据劫持,实现响应式，

v-model是标签外value的zi双向绑定，v-bind是标签内属性的单向绑定，同时都支持数据的动态变化。

# 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。
# 自定义指令 directives
如果想注册局部指令，组件中也接受一个 directives 的选项：
```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```
然后你可以在模板中任何元素上使用新的 v-focus property，如下：
``` html
<input v-focus>
```

## 钩子函数
>vue2与vue3有一定的差别

钩子函数里面通过vnode.context获取this

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

unbind：只调用一次，指令与元素解绑时调用。

### 钩子函数参数
- el：指令所绑定的元素，可以用来直接操作 DOM。
- binding：一个对象，包含以下 property：
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
  - name：指令名，不包括 v- 前缀。//*vue3删除*
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。//*vue3删除*
  - *`instance`：使用该指令的组件实例。//vue3添加*
  - *`dir`：指令的定义对象。//vue3添加*
- vnode：Vue 编译生成的虚拟节点。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
# 过滤器 filter

过滤器可以用在两个地方：双花括号插值和 v-bind 表达式
> vue3 中被删去

# 混合 mixin

vue2.x使用的是选项式API，混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

## Mixin和Vuex的区别？
上面一点说Mixin就是一个抽离公共部分的作用。在Vue中，Vuex状态管理似乎也是做的这一件事，它也是将组件之间可能共享的数据抽离出来。两者看似一样，实则还是有细微的区别，区别如下：

- Vuex公共状态管理，如果在一个组件中更改了Vuex中的某个数据，那么其它所有引用了Vuex中该数据的组件也会跟着变化。

- Mixin中的数据和方法都是独立的，组件之间使用后是互相不影响的。

## 短板

1. 不清晰的数据来源：当使用了多个 mixin 时，实例上的数据属性来自哪个 mixin 变得不清晰，这使追溯实现和理解组件行为变得困难。这也是我们推荐在组合式函数中使用 ref + 解构模式的理由：让属性的来源在消费组件时一目了然。

2. 命名空间冲突：多个来自不同作者的 mixin 可能会注册相同的属性名，造成命名冲突。若使用组合式函数，你可以通过在解构变量时对变量进行重命名来避免相同的键名。

3. 隐式的跨 mixin 交流：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。而一个组合式函数的返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。

## vue3中不推荐使用mixin的原因

通过组合式 API 解决了 mixins 的所有缺陷。

# 父子组件传参

## vuex

## prop emit

# vue3的区别

## 操作真实的dom节点获取组件实例 

### vue2 通过 ref 和this.$refs.xxx
1、使用this.$refs如果要在mouend()中使用，必须要在this.$nextTick(()=>{  } )   这里面实现，要不是找不到ref，原因是mouned（）之后，BOM节点还没有完全挂载上，于是找不到定义的ref。

2、可以直接在updata()的生命周期函数中使用，不用写this.$nextTick(()=>{  } ) 


3、在methods:{  } 方法中使用，也需要使用this.$nextTick(()=>{  } ) 等到页面完全渲染完毕之后在调用即可

### vue3 通过 ref 和 同名的const xxx=ref()