# 路由守卫

## beforeEnter 和 beforeRouteEnter 的区别

beforeEnter 是直接在路由配置上定义的
``` js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
beforeRouteEnter 是定义在组件上的
```html
<template>
  <div>
    <!--  -->
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    //...
  },
  methods: {
    //...
  },
  beforeRouteLeave (to, from, next) {
    //...
  }
}
</script>
<style scoped>
</style>
```