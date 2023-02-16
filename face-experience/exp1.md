## cookie、session、 sessionStorage、localStorage的区别

#### localStorage 和 sessionStorage

- 共同点：
    + 存储大小5M
    + 都有同源策略限制
    + 仅在客户端中保存 不参与服务器通信

- 不同点：
    + 生命周期：
      + localStorage 存储的数据是永久性的 除非用户认为删除否则会一直存在
      + sessionStorage 与存储数据的脚本所在的标签页的有效期是相同的。
      一旦窗口或者标签页被关闭 那么所有通过sessionStorage存储的数据也
      会被删除
    + 作用域：   
      + localStorage 再同一个浏览器内 同源文档之间共享数据，可以互相读取、覆盖
      + sessionStorage 除了需要同意浏览器同源文档这一条件，还限定了同一窗口。

#### cookie 和 session

- cookie存储在客户端 session存储在服务端
- 单个cookie大小不超过4k，一般浏览器会限制一个站点最多保存20个cookie。
 session原则上没有限制（但是为了服务器性能考虑，一般不能存放太多）。
- cookie的存储方式是以ASCII码表示的字符串 session的存储方式可以是各种形式
- cookie安全性较低，他人可以通过分析本地的cookie进行cookie欺骗，session
  存储在服务器上，不存在敏感信息泄露的风险，安全性较高


## get和post的区别

## 浏览器缓存策略

## 打包优化

## 跨域

## 浏览器的渐进增强和优雅降级

## websocket

## 前端安全

## 闭包

## 堆栈

## js基本数据类型

## js内置对象

## 原型和原型链  特点  定义 原型通过什么方式传递

## promise 如何实现链式调用，如何返回不同的状态

async/await

promise 和 async/await的区别

## 事件循环

宏任务  微任务

## vue2的常见指令

## vue的修饰符  v-model的修饰符

## 多个路由指向同一个组件 如何页面动态刷新







