通过js的object.defineProperty()数据劫持,实现响应式，

v-model是标签外value的zi双向绑定，v-bind是标签内属性的单向绑定，同时都支持数据的动态变化。

# 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

# 过滤器 filter

过滤器可以用在两个地方：双花括号插值和 v-bind 表达式
> vue3 中被删去

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