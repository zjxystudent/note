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

## 获取dom 

### vue2 通过 ref 和this.$refs.xxx

### vue3 通过 ref 和 同名的const xxx=ref()