/* 函数防抖解决的问题
 * 1、对于在事件触发 n 秒后，再执行的回调 => 只有事件触发了 n 秒之后，我才会去触发我的回调函数 => 本质上是延迟执行
 * 2、如果在这 n 秒内再次触发事件，则会重新开始计时。
 * 3、理解：一个点击事件，被触发后，不会立即去执行回调（通常情况下，立即执行）
 *    而防抖函数，只有经过 n 秒，才会去执行回调函数
 *    假使，我们连续触发同一个事件 10s,那么这个事件的最终回调函数执行时间是，10+n 秒 
 */


/* 
 * @fn: 需要防抖的回调函数 
 * @time: 事件触发后，延迟执行的时间
 * @triggleNow：首次触发事件，是否不需要防抖 (true/false)
*/


 function debounce(fn, time, triggleNow){
     var t = null
     var debounced = function() {
        //  因为我们返回的一个函数
        // 这里保留两个字段，提高方法的可扩展性
       var _self = this;
           args = arguments;
        
        if(t) {
            clearTimeout(t);
        }
       
        if(triggleNow) {
            var exec = !t;
            t = setTimeout(function(){
                t = null;
            }, time)
            if(exec) {
                fn.apply(_self,args)
            } 
        } else {
            t = setTimeout(function(){
                fn.apply(_self,args)
            }, time)
        }

     }
     debounced.remove = function() {
         clearTimeout(t);
         t = null;
     }

     return debounced
 }