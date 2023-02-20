在vuex中实现对state的变化都是通过mutations，action就是一个装饰器在mutation外封装了一个异步。

mapGetters 辅助函数

 /**
     * 数组形式
     * 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
     * */
    ...mapState(["count", "name"]),


    /**
     * 对象形式
     */
    ...mapState({
      count, // 这种就是count:"count", 的简写
      count1: "count1",
      repeatCount: "count2", // 当组件中与vuex中的字符已经出现重复时，使用 repeatCount 来映射 store.state.count2
      count3: (state) => { // 映射 count3 为 store.state.conut3的值
        return state.count3
      },
      helloName: function (state) { // 为了能够使用 `this` 获取局部状态，必须使用常规函数，不能使用箭头函数
        return this.hello + state.name
      },
      addNumber: function (state) { // 为了能够使用 `this` 获取局部状态，必须使用常规函数，不能使用箭头函数
        return this.number + state.count
      }
    })
  },

  [](https://www.cnblogs.com/aidixie/p/14977850.html)