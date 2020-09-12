# kun1024 前端代码碎片
## 函数防抖和节流

> **防抖函数和节流函数：** 两者都是优化高频率执行 js 代码的一种手段。
>
> js 中的一些事件，如 浏览器的 resize、scroll、鼠标的 mousemove、mouseover、input 输入框的 keypress 等事件在触发时，会不断地调用绑定在事件上的回调，极大地浪费资源，降低前端性能。为了优化体验，需要对这类事件进行调用次数的限制。

### 函数防抖

> 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

**1、Bug 版示例**

```js
btn.addEventListener('click',function(){ 
    setTimeout(function(){
        console.log('666')
    },3000)   
  })
```

问题：

```sh
# 当你第一次点击的时候，也是延迟执行回调（用户体验极差）
# 当你同时点击多次的时候，确实是，没有立即触发回调，
# 但是 当延时时间结束后，会立即执行，加载事件循环中的所有回调（只是延迟了所有事件的执行时间）
# 如下图：
```

---

![01](C:%5CUsers%5Cadmin%5CDesktop%5CWEB_JS_-Memento%5CREADME.assets%5C01.gif)

**2、优化版**

```js
// 上面的问题是因为，定时器没有重新开始计时，导致每次点击都向任务管理器添加了定时任务
// 下面我们，每次点击，都清除下，上一次的定时器

var t = null
btn.addEventListener('click',function(){ 
   clearTimeout(t)
   
   t= setTimeout(function(){
        console.log('666')
    },3000)   
  })
```

![02](C:%5CUsers%5Cadmin%5CDesktop%5CWEB_JS_-Memento%5CREADME.assets%5C02.gif)



上面的代码，就是一个简化版的 防抖函数，我们点击 btn  按钮的时候，会在最后一次触发事件，n 秒后，执行一次回调函数。比如：我们狂点按钮的时间是 10s，那么我们的回调函数，会在 10 + n 秒后 执行。



 