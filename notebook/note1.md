## 大纲

| index | question   | answer                                                                               |
|-------|------------|--------------------------------------------------------------------------------------|
| 1     | token      | token就是符号                                                                            |
| 2     | expression | 表达式，总是能够返回一个值                                                                        |
| 3     | statement  | 语句，不一定有返回值，一个语句由1个或多个表达式组成                                                           |
| 4     | variable   | 变量，赋值语句给变量赋值                                                                         |
| 5     | 左右操作       | 例如:减法 左操作数-右操作数                                                                      |
| 6     | 一二三元       | [一二三元](#a)                                                                           |
| 7     | 算术运算       | [算术运算](#b)                                                                           |
| 8     | 逻辑运算       | [逻辑运算](#c)                                                                           |
| 9     | 布尔运算       | [布尔运算](#d)                                                                           |
| 10    | esm 符号绑定   | CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用，指向同一块内存（token binding）（注意：js 目前 有且仅有这一个地方是符号绑定） |
| 11    | syntax     | [syntax](https://www.runoob.com/js/js-syntax.html)                                   |

## <div id='a'>一二三元</div>

| 运算符 | 含义                           | 举例                             |
|-----|------------------------------|--------------------------------|
| 一元  | 一元运算符只有一个操作元                 | +a (注意：+1,-1这种不算运算符)  i++  !a  |
| 二元  | 二元运算符有两个操作元                  | a+b                            |
| 三元  | 条件元素运算符把两个结果中其中一个符合运算逻辑的值返回。 | `condition ? ifTrue : ifFalse` |                             |

## <div id='b'>算术运算</div>

> 算术运算符以二个数值（字面量或变量）作为操作数，并返回单个数值

| 操作符 | 	描述                  | 
|-----|----------------------|
| +   | 加法 - 相加运算符两侧的值	      |
| -   | 	减法 - 左操作数减去右操作数     |	
| *   | 	乘法 - 相乘操作符两侧的值      |	
| /   | 	除法 - 左操作数除以右操作数     |
| ％   | 	取余 - 左操作数除以右操作数的余数	 |
| ++  | 	自增: 操作数的值增加1        |	
| --  | 	自减: 操作数的值减少1        |

## <div id='c'>逻辑运算</div>

> 逻辑运算符典型的用法是用于布尔（逻辑）值运算，它们返回布尔值。

| 运算符  | 	描述	                            |
|------|---------------------------------|
| ==	  | 检查两个操作数的值是否相等，如果相等则条件为真。        |
| ===	 | 检查两个操作数的值和类型是否都相等，如果相等则条件为真。    |
| !=	  | 检查两个操作数的值是否相等，如果不相等则条件为真。       |
| !==	 | 不绝对等于（值和类型有一个不相等，或两个都不相等）       |
| \>   | 	检查左操作数的值是否大于右操作数的值，如果是则条件为真。   |
| <    | 	检查左操作数的值是否小于右操作数的值，如果是则条件为真。	  |
| \>=	 | 检查左操作数的值是否大于或等于右操作数的值，如果是则条件为真。 |
| <=	  | 检查左操作数的值是否小于或等于右操作数的值，如果是则条件为真。 |

### <div id='d'>布尔运算</div>

| 操作符            | 	描述	                                             |
|----------------|--------------------------------------------------|
| &&	            | 称为逻辑与运算符。当且仅当两个操作数都为真，条件才为真。                     |   
| &#124;&#124; 	 | 称为逻辑或操作符。如果任何两个操作数任何一个为真，条件为真。                   |
| ！	             | 称为逻辑非运算符。用来反转操作数的逻辑状态。如果条件为true，则逻辑非运算符将得到false。 |
| ??             | 空值合并运算符，如果 ?? 前面是 null 或 undefined，取后面的默认值。      |

### 图形学上的布尔运算

true -> 1 -> 全集

false -> 0 -> 空集

| 情况                         | 结果    | 解释          |
|----------------------------|-------|-------------|
| true && true               | true  | 全集和全集的交集是全集 |
| false  && false            | false | 空集和空集的交集是空集 |
| true  && false             | false | 全集和空集的交集是空集 |
| true  &#124;&#124; true    | true  | 全集和全集的并集是全集 |
| true  &#124;&#124; false   | false | 全集和空集的并集是空集 |
| false  &#124;&#124; false  | false | 空集和空集的并集是空集 |
