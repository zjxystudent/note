
# 响应
## reactive


# 错误处理

## try...catch

```js
utils.foo(()=>{
  try{
  //...
  }catch(e){
  //...
  }
})
```

## vue3

- callWithErrorHandling：处理同步方法的异常；
- callWithAsyncErrorHandling：处理异步方法的异常。

### callWithErrorHandling

```vue
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
```

