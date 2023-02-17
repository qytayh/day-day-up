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

本质上都是TCP链接，并无差别，但是由于http的规定和浏览器/服务器的限制，导致他们在应用过程中会有些区别。

#### 参数位置
    
无论Get还是Post，用的都是同一个传输层协议，所以在传输上没有区别

当不携带参数时，两者醉的的区别就是方法名不同
```
POST /uri HTTP/1.1 \r\n
GET /uri HTTP/1.1 \r\n
```
一般get请求的参数放在url中，Post放在body中，但这只是约定，并不属于http规范，
相反的，我们可以再post请求的url中写入参数，或是在get请求的body中携带参数

#### 参数长度

http协议没有对body和url的长度限制，对url限制的大多数是浏览器和服务器的原因。（
这里限制的是整个url的长度，而不仅仅是参数值的长度）

服务器处理长url要消耗较多的资源，为了性能和安全考虑，会给url长度伽限制

#### 安全

从传输的角度来说，两者都是不安全的，http在网络上是明文传输的，只要在网络节点上
抓包，就能完整的获取数据报文，只有使用https才能加密安全

#### 数据包

对于get方式的请求，浏览器会把http header 和data一并发出去，服务器相应200

对于post，浏览器会先发送header，服务器相应100（continue）,浏览器再发送data
服务器响应200

并不是所有的浏览器都会在post中发送两次包，firefox只发送一次

## 浏览器缓存策略

浏览器缓存策略分为两种： 强缓存和协商缓存，并且缓存策略都是通过设置http header来实现的

#### 强缓存

不会向服务器发送请求，直接从缓存中读取资源，强缓存可以通过设置两种http header实现：
Expires和Cache-Control

- Expires

    缓存过期时间，用来指定资源到期的时间，是服务器具体的时间点
    
    Expires是http/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效
  - Cache-Control：
    
      http/1.1的产物，比如设置Cache-control：max-age=300，单位是s，代表5分钟
      内再次请求就会走强缓存
    
      ```
      public：所有内容都将被缓存（客户端/代理服务器/CDN等）
      private：只有客户端可以缓存，Cache-Control默认值
      no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
      no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
      max-age=xxx：缓存将在xxx秒后失效
      ```

> Cache-Control 优先级高于Expires

#### 协商缓存

协商缓存就是再强制缓存失效后，浏览器携带缓存标识向服务器发起请求，有服务器根据缓存标识
决定是否使用缓存的过程

协商缓存可以通过设置两种http header实现： Last-Modified和Etag

- Last-Modified：
    
    原理： 浏览器第一次访问资源时，服务器会在response头里添加Last-Modified时间点，
    这个时间点是服务器最后修改文件的时间点，然后浏览器第二次访问资源时，检测到缓存文件
    里有Last-Modified，就会在请求头里面加上if-Modified-Since,值为Last-Modified
    的值，服务器收到头里有if-Modified-Since，就会拿这个值和请求文件的最后修改时间做对比，
    如果没有变化，就返回304，如果小于最后修改时间，说明文件有更新，就会返回新的资源，
    状态码200（http1.0）

- ETag：
    
    原理：与Last-Modified类似，只是Last-Modified返回的是最后修改的时间点，而
    ETag是每次访问服务器都会返回一个新的token，第二次请求时，该值埋在请求头里的If-None-
    Match发送给服务器，服务器在比较新旧token是否一致，一致则返回304通知浏览器使用本地缓存，
    不一致则返回新的资源、新的ETag，状态码为200（http1.1）

## webpack 打包优化

- js代码压缩
    
    通过 `terser-webpack-plugin`来压缩丑化代码

- css代码压缩
    
  可以通过使用 `css-minimizer-webpack-plugin`进行压缩
    
- html文件代码压缩

    使用 `html-webpcak-plugin`
    
- 文件大小压缩

    对文件大小进行压缩，减少http传输过程中带宽的损耗

    使用 `compression-webpack-plugin`

    基本用法
    ```js
    new ComepressionPlugin({
      test: /\.(css|js)$/, // 哪些文件需要压缩
      threshold: 500, // 设置文件多大开始压缩
      minRatio: 0.7, // 至少压缩的比例
      algorithm: 'gzip', // 采用的压缩算法
    })
    ```
- 图片压缩

    一般来说在打包之后，一些图片文件的大小远比js或css文件要大，所以图片
    压缩很重要

    使用 `image-webpack-loader`

- tree shaking

  - js

    表述消除死代码，依赖于es module 的静态语法分析 
    
    在webpack实现tree shaking有两种不同的方案：

    - usedExports:通过标记某些模块是否被使用之后通过terser进行优化
    - sideEffects:跳过整个模块/文件，直接看该文件是否有副作用

  - css

    可以通过PurgeCss插件  `purgecss-plugin-webpack`

- 代码分离

  将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件
 
  默认情况下，所有的js代码在首页全部加载，就会影响首页的加载速度 

  代码分离可以分出更小的bundle，以及控制资源加载优先级，提高代码加载性能

  可以用过 `splitChunksPlugin` 来实现


## 跨域

跨域是由于浏览器的同源策略造成的，当协议、主机、端口中任意一项不同就会产生跨域

常用处理方案：

jsonp：利用的`<script>`标签没有同源策略的影响，只支持get

cors：后端设置响应头 Cores：*

proxy：

- 前端配置devServer
- 通过配置nginx实现代理

## 浏览器的渐进增强和优雅降级

渐进增强：在网站设计初期以ie为最低兼容对象，保证基本的功能情况下，再针对高级浏览器进行效果，交互等方面的改进和追加功能，以达到更好的用户体验。

优雅降级：一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

## websocket

## 前端安全

常见的攻击手段有

- XSS 跨站脚本攻击
- CSRF 跨站请求伪造
- SQL 注入攻击

## 闭包

闭包指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现。


使用场景： 

- 创建私有变量
- 延长变量的生命周期

## 堆栈

## js基本数据类型

number boolean string symbol bigInt undefined null

object

## js内置对象

- 值属性: 这些全局属性返回一个简单值，这些值没有自己的属性和方法
  - Infinity
  - NaN
  - undefined
  - globalThis
- 函数属性：全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后
  会将结果直接返回给调用者
  - eval()
  - uneval()
  - isFinite()
  - isNaN()
  - parseFloat()
  - parseInt()
  - decodeURI()
  - decodeURIComponent()
  - encodeURI()
  - encodeURIComponent()
- 基本对象：顾名思义，基本对象是定义或使用其他对象的基础。基本对象
  包括一般对象、函数对象和错误对象
  - Object
  - Function
  - Boolean
  - Symbol
  
  > 错误对象
  > 
  > 错误对象是一种特殊的基本对象。他们拥有基本的Error类型，同时也有多种具体的错误类型
  > 
  > - Error
  > - AggravateError
  > - EvalError
  > - InternalError
  > - RangeError
  > - ReferenceError
  > - SyntaxError
  > - TypeError
  > - URIError

- 数字和日期对象：用来表示数字、日期和执行数学计算的对象
  - Number
  - BigInt
  - Math
  - Date
- 字符串：用来表述和操作字符串的对象
  - String
  - RegExp
- 可索引的集合对象：这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。
  - Array
  - Int8Array
  - Uint8Array
  - Uint8ClampedArray
  - Int16Array
  - Uint16Array
  - Int32Array
  - Uint32Array
  - Float32Array
  - Float64Array
  - BigInt64Array
  - BigUint64Array
- 使用键的集合对象：这些集合对象在存储数据时会用到键，包括可迭代的Map和Set，支持按照插入顺序来迭代元素
  - Map
  - Set
  - WeakMap
  - WeakSet
- 结构化数据：这些对象用来表示和操作结构化的缓冲区数据，或使用JSON编码的数据
  - ArrayBuffer
  - SharedArrayBuffer
  - Atomics
  - DataView
  - JSON
- 控制抽象对象：控制抽象可以帮助，尤其是异步代码
  - Promise
  - Generator
  - GeneratorFunction
  - AsyncFunction
- 反射
  - Reflect
  - Proxy
- 国际化：ECMAScript核心的附加功能，用于支持多语言处理
  - Intl
  - Intl.Collator
  - Intl.DateTimeFormat
  - Intl.ListFormat
  - Intl.NumberFormat
  - Intl.PluralRules
  - Intl.RelativeTimeFormat
  - Intl.Locale
- WebAssembly
  - WebAssembly.Module
  - WebAssembly.Instance
  - WebAssembly.Memory
  - WebAssembly.Table
  - WebAssembly.CompileError
  - WebAssembly.LinkError
  - WebAssembly.RuntimeError
- 其他
  - arguments


## 原型和原型链  特点  定义 原型通过什么方式传递

__proto__ 和prototype分别是啥

__proto__和prototype都是JavaScript中的属性，它们在对象原型（prototype）链的中起着不同的作用。
prototype是函数对象独有的属性，它指向一个对象，该对象包含可以被该函数的实例继承的属性和方法。当使用new关键字创建一个实例时，
该实例的原型指向该函数的prototype属性，可以通过该原型访问和调用prototype中定义的方法和属性。
例如：
```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
console.log(`Hello, my name is ${this.name}.`);
};

const john = new Person('John');
john.sayHello(); // 输出 "Hello, my name is John.
```

在上述代码中，Person.prototype属性指向一个包含sayHello方法的对象。通过new关键字创建的Person实例的原型指向该对象，
从而使得实例可以访问和调用sayHello方法。

__proto__属性则是所有对象都具有的属性，它指向该对象的原型。当我们访问一个对象的属性时，如果该属性在该对象本身不存在，
JavaScript引擎会沿着原型链向上查找该属性。当查找到一个对象时，JavaScript引擎会访问该对象的__proto__属性，
以此继续向上查找，直到查找到属性或到达原型链的顶端为止。

例如：
```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
console.log(`Hello, my name is ${this.name}.`);
};

const john = new Person('John');
console.log(john.__proto__ === Person.prototype); // 输出 true
console.log(john.__proto__.__proto__ === Object.prototype); // 输出 true
console.log(john.__proto__.__proto__.__proto__ === null); // 输出 true
```

在上述代码中，john.__proto__属性指向Person.prototype，john.__proto__.__proto__指向Object.prototype，
john.__proto__.__proto__.__proto__指向null，因为Object.prototype是原型链的顶端，它的原型为null。

__proto__ 和 prototype 是 JavaScript 中两个非常重要的对象属性。
__proto__ 是每个对象都有的一个隐藏属性，它指向该对象的原型对象。原型对象是 JavaScript 中实现继承的机制，每个对象通过它的原型对象来共享属性和方法。
在 ES6 中，可以使用 Object.getPrototypeOf() 方法来获取对象的原型。

prototype 是函数对象所独有的属性，它也指向一个对象，这个对象通常包含了特定类型的所有实例共享的属性和方法。它的主要作用是作为构造函数使用时，
创建实例对象时的原型链的终点，以及实例调用方法时的查找路径。每个函数都有一个 prototype 属性，但只有在使用 new 操作符创建对象时，
才会将函数的 prototype 属性作为新对象的原型。在 ES6 中，可以使用 Object.setPrototypeOf() 方法来改变对象的原型。

总之，__proto__ 与原型链有关，而 prototype 与构造函数有关。了解它们的关系和作用，可以帮助我们更好地理解 JavaScript 中的继承和对象的创建。

## promise 如何实现链式调用，如何返回不同的状态

async/await

promise 和 async/await的区别

## 事件循环

宏任务  微任务

## vue2的常见指令

- v-once
- v-html
- v-bind
- v-if
- v-on
- 

## vue的修饰符  v-model的修饰符

- 事件修饰符
  - .stop
  - .prevent
  - .capture
  - .self
  - .once
  - .passive
- 按键修饰符
  - .enter
  - .tab
  - .delete
  - .esc
  - .space
  - .up
  - .down
  - .left
  - .right
- 系统修饰符
  - .ctrl
  - .alt
  - .shift
  - .meta
- 鼠标按钮修饰符
  - .left
  - .right
  - .middle

v-model修饰符
- .lazy
- .number
- .trim

## 多个路由指向同一个组件 如何页面动态刷新







