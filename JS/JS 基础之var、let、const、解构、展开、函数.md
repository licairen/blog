### 引言

`JS `系列 var、let、const、解构、展开、函数 的总结。

`let`在很多方面与 `var` 是相似的，但是 `let` 可以帮助大家避免在 JavaScript 里常见一些问题。`const` 是对 `let` 的一个增强，它能阻止对一个变量再次赋值。 



### 一、`var` 声明

一直以来我们都是通过 `var` 关键字定义  JavaScript 变量。

```js
var num = 1;
```

定义了一个名为 `num` 值为 `1` 的变量。

我们也可以在函数内部定义变量：

```js
function f() {
    var message = "Hello, An!";

    return message;
}
```

并且我们也可以在其它函数内部访问相同的变量。

```js
function f() {
    var num = 10;
    return function g() {
        var b = num + 1;
        return b;
    }
}

var g = f();
g(); // 11;
```

上面的例子里，`g` 可以获取到 `f` 函数里定义的 `num` 变量。 每当  `g` 被调用时，它都可以访问到 `f` 里的 `num` 变量。 即使当 `g` 在 `f` 已经执行完后才被调用，它仍然可以访问及修改 `num` 。

```js
function f() {
    var num = 1;

    num = 2;
    var b = g();
    num = 3;

    return b;

    function g() {
        return num;
    }
}

f(); // 2
```



#### 作用域规则

对于熟悉其它语言的人来说，`var` 声明有些奇怪的作用域规则。 看下面的例子：

```js
function f(init) {
    if (init) {
        var x = 10;
    }

    return x;
}

f(true);  // 10
f(false); // undefined
```

在这个例子中，变量 `x` 是定义在 `if` 语句里面，但是我们却可以在语句的外面访问它。

 这是因为 `var` 声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问，包含它的代码块对此没有什么影响。 有些人称此为  **`var` 作用域或函数作用域** 。 函数参数也使用函数作用域。

这些作用域规则可能会引发一些错误。 其中之一就是，多次声明同一个变量并不会报错：

```js
function sumArr(arrList) {
    var sum = 0;
    for (var i = 0; i < arrList.length; i++) {
        var arr = arrList[i];
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
    }

    return sum;
}
```

这里很容易看出一些问题，里层的 `for` 循环会覆盖变量 `i`，因为所有 `i` 都引用相同的函数作用域内的变量。 有经验的开发者们很清楚，这些问题可能在代码审查时漏掉，引发无穷的麻烦。



#### 捕获变量怪异之处

快速的思考一下下面的代码会返回什么：

```js
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

介绍一下，`setTimeout `会在若干毫秒的延时后执行一个函数（等待其它代码执行完毕）。

好吧，看一下结果：

```js
10
10
10
10
10
10
10
10
10
10
```

很多 JavaScript 程序员对这种行为已经很熟悉了，但如果你很不解，你并不是一个人。 大多数人期望输出结果是这样：

```js
0
1
2
3
4
5
6
7
8
9
```

还记得我们上面提到的捕获变量吗？

> 我们传给 `setTimeout` 的每一个函数表达式实际上都引用了相同作用域里的同一个 `i`。

让我们花点时间思考一下这是为什么。 `setTimeout ` 在若干毫秒后执行一个函数，并且是在 `for` 循环结束后。`for ` 循环结束后，`i` 的值为 `10`。 所以当函数被调用的时候，它会打印出  `10`！

一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时`i`的值：

```js
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
```

这种奇怪的形式我们已经司空见惯了。 参数 `i` 会覆盖 `for` 循环里的 `i` ，但是因为我们起了同样的名字，所以我们不用怎么改 `for` 循环体里的代码。



### 二、`let` 声明

现在你已经知道了 `var` 存在一些问题，这恰好说明了为什么用 `let` 语句来声明变量。 除了名字不同外， `let` 与 `var` 的写法一致。

```js
let hello = "Hello，An!";
```

主要的区别不在语法上，而是语义，我们接下来会深入研究。



#### 块作用域

当用 `let` 声明一个变量，它使用的是词法作用域或块作用域。 不同于使用 `var` 声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或 `for` 循环之外是不能访问的。

```js
function f(input) {
    let a = 100;

    if (input) {
        // a 被正常引用
        let b = a + 1;
        return b;
    }

    return b;
}
```

这里我们定义了2个变量 `a` 和 `b` 。 `a` 的作用域是 `f` 函数体内，而 `b` 的作用域是 `if` 语句块里。

在 `catch` 语句里声明的变量也具有同样的作用域规则。

```js
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}

// Error: 'e' doesn't exist here
console.log(e);
```

拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写。 虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于 *暂时性死区*。 它只是用来说明我们不能在 `let` 语句之前访问它们：

```js
a++; 
// Uncaught ReferenceError: Cannot access 'a' before initialization
let a;
```

注意一点，我们仍然可以在一个拥有块作用域变量被声明前获取它。 只是我们不能在变量声明前去调用那个函数。

```js
function foo() {
    return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();
// Uncaught ReferenceError: Cannot access 'a' before initialization

let a;
```

关于暂时性死区的更多信息，查看这里[Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let).



#### 重定义及屏蔽

我们提过使用 `var` 声明时，它不在乎你声明多少次；你只会得到1个。

```js
function f(x) {
    var x;
    var x;

    if (true) {
        var x;
    }
}
```

在上面的例子里，所有 `x` 的声明实际上都引用一个相同的 `x`，并且这是完全有效的代码。 这经常会成为 bug 的来源。 好的是， `let` 声明就不会这么宽松了。

```js
let x = 10;
let x = 20; 
// Uncaught SyntaxError: Identifier 'x' has already been declared
```

并不是要求两个均是块级作用域的声明才会给出一个错误的警告。

```js
function f(x) {
    let x = 100; 
    // Uncaught SyntaxError: Identifier 'x' has already been declared
}

function g() {
    let x = 100;
    var x = 100; 
    // Uncaught SyntaxError: Identifier 'x' has already been declared
}
```

并不是说块级作用域变量不能用函数作用域变量来声明。 而是块级作用域变量需要在明显不同的块里声明。

```js
function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }

    return x;
}

f(false, 0); // 0
f(true, 0);  // 100
```

在一个嵌套作用域里引入一个新名字的行为称做 **屏蔽** 。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。 例如，假设我们现在用 `let` 重写之前的 `sumArr` 函数。

```js
function sumArr(arrList) {
    let sum = 0;
    for (let i = 0; i < arrList.length; i++) {
        var arr = arrList[i];
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
    }

    return sum;
}
```

此时将得到正确的结果，因为内层循环的 `i` 可以屏蔽掉外层循环的 `i` 。

通常来讲应该避免使用屏蔽，因为我们需要写出清晰的代码。 同时也有些场景适合利用它，你需要好好打算一下。



#### 块级作用域变量的获取

在我们最初谈及获取用 `var` 声明的变量时，我们简略地探究了一下在获取到了变量之后它的行为是怎样的。 直观地讲，每次进入一个作用域时，它创建了一个变量的环境。 就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。

```js
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity();
}
```

因为我们已经在 `city` 的环境里获取到了 `city` ，所以就算 `if` 语句执行结束后我们仍然可以访问它。

回想一下前面 `setTimeout` 的例子，我们最后需要使用立即执行的函数表达式来获取每次 `for` 循环迭代里的状态。 实际上，我们做的是为获取到的变量创建了一个新的变量环境。 

当 `let` 声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域。 这就是我们在使用立即执行的函数表达式时做的事，所以在 `setTimeout `例子里我们仅使用 `let` 声明就可以了。

```js
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}
```

会输出与预料一致的结果：

```js
0
1
2
3
4
5
6
7
8
9
```



### 三、`const` 声明

`const` 声明是声明变量的另一种方式。

```js
const numLivesForCat = 9;
```

它们与 `let` 声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 `let` 相同的作用域规则，但是不能对它们重新赋值。

这很好理解，它们引用的值是*不可变的*。

```js
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}

// Error
kitty = {
    name: "Danielle",
    numLives: numLivesForCat
};

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```

除非你使用特殊的方法去避免，实际上 `const` 变量的内部状态是可修改的。 



### 四、`let` vs. `const`

现在我们有两种作用域相似的声明方式，我们自然会问到底应该使用哪个。 与大多数泛泛的问题一样，答案是：依情况而定。

使用[最小特权原则](https://en.wikipedia.org/wiki/Principle_of_least_privilege)，所有变量除了你计划去修改的都应该使用`const`。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 `const`也可以让我们更容易的推测数据的流动。

跟据你的自己判断，如果合适的话，与团队成员商议一下。



### 五、解构



#### 解构数组

最简单的解构莫过于数组的解构赋值了：

```js
let input = [1, 2];
let [first, second] = input;
console.log(first); // 1
console.log(second); // 2
```

这创建了2个命名变量 `first` 和 `second`。 相当于使用了索引，但更为方便：

```js
first = input[0];
second = input[1];
```

解构作用于已声明的变量会更好：

```js
[first, second] = [second, first];
```

作用于函数参数：

```js
function f([first, second]) {
    console.log(first);
    console.log(second);
}
f(input);
```

你可以在数组里使用 `...` 语法创建剩余变量：

```js
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [ 2, 3, 4 ]
```

当然，由于是JavaScript, 你可以忽略你不关心的尾随元素：

```js
let [first] = [1, 2, 3, 4];
console.log(first); // 1
```

或其它元素：

```js
let [, second, , fourth] = [1, 2, 3, 4];
```



#### 对象解构

你也可以解构对象：

```js
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
```

这通过 `o.a` and `o.b` 创建了 `a` 和 `b` 。 注意，如果你不需要 `c` 你可以忽略它。

就像数组解构，你可以用没有声明的赋值：

```js
({ a, b } = { a: "baz", b: 101 });
```

注意，我们需要用括号将它括起来，因为 Javascript 通常会将以 `{` 起始的语句解析为一个块。

你可以在对象里使用 `...` 语法创建剩余变量：

```js
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```



### 六、展开

展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。 例如：

```js
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
```

这会令 `bothPlus` 的值为 `[0, 1, 2, 3, 4, 5]` 。 展开操作创建了 `first` 和 `second` 的一份浅拷贝。 它们不会被展开操作所改变。

你还可以展开对象：

```js
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

`search` 的值为 `{ food: "rich", price: "$$", ambiance: "noisy" }` 。 对象的展开比数组的展开要复杂的多。 像数组展开一样，它是从左至右进行处理，但结果仍为对象。 这就意味着出现在展开对象后面的属性会覆盖前面的属性。 因此，如果我们修改上面的例子，在结尾处进行展开的话：

```js
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };
```

那么，`defaults` 里的 `food` 属性会重写 `food: "rich"` ，在这里这并不是我们想要的结果。

对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 [自身的可枚举属性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。 大体上是说当你展开一个对象实例时，你会丢失其方法：

```js
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```


### 七、new、this、class、函数

#### this 与 new

**new 关键字**创建的对象**实际上是对新对象 this 的不断赋值，并将 `__proto__` 指向类的 prototype 所指向的对象**。

```js
var SuperType = function (name) {
    var nose = 'nose' // 私有属性
    function say () {} // 私有方法
    
    // 特权方法
    this.getName = function () {} 
    this.setName = function () {}
    
    this.mouse = 'mouse' // 对象公有属性
    this.listen = function () {} // 对象公有方法
    
    // 构造器
    this.setName(name)
}

SuperType.age = 10 // 类静态公有属性（对象不能访问）
SuperType.read = function () {} // 类静态公有方法（对象无法访问）

SuperType.prototype = { // 对象赋值（也可以一一赋值）
    isMan: 'true', // 公有属性
    write: function () {} // 公有方法
}

var instance = new SuperType()
```

![new](https://user-gold-cdn.xitu.io/2019/9/2/16ced998a7b06e7e?w=550&h=180&f=png&s=23875)

在函数调用前增加 `new`，相当于把 `SuperType` 当成一个构造函数（虽然它仅仅只是个函数），然后创建一个 {} 对象并把 `SuperType` 中的 `this` 指向那个对象，以便可以通过类似 `this.mouse` 的形式去设置一些东西，然后把这个对象返回。

**具体来讲，只要在函数调用前加上 `new` 操作符，你就可以把任何函数当做一个类的构造函数来用。**

##### 加 new

在上例中，我们可以看到：在构造函数内定义的 **私有变量或方法** ，以及类定义的 **静态公有属性及方法** ，在 **new** 的实例对象中都将 **无法访问** 。

##### 不加 new

如果你调用 `SuperType()` 时**没有**加 `new`，其中的 `this` 会指向某个全局且无用的东西（比如，`window` 或者 `undefined`），因此我们的代码会崩溃，或者做一些像设置 `window.mouse` 之类的傻事。

```js
let instance1 = SuperType(); 

console.log(instance1.mouse); 
// Uncaught TypeError: Cannot read property 'mouse' of undefined

console.log(window.mouse); 
// mouse
```

#### 函数、类

##### 函数

```js
function Bottle(name) {
  this.name = name;
}

// + new
let bottle = new Bottle('bottle'); // ✅ 有效： Bottle {name: "bottle"}
console.log(bottle.name) // bottle

// 不加 new
let bottle1 = Bottle('bottle');   // 🔴 这种调用方法让人很难理解
console.log(bottle1.name); // Uncaught TypeError: Cannot read property 'name' of undefined
console.log(window.name); // bottle
```
##### 类

```js
class Bottle {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log('Hello, ' + this.name);
  }
}

// + new
let bottle = new Bottle('bottle');
bottle.sayHello(); // ✅ 依然有效，打印：Hello, bottle

// 不加 new
let bottle1 = Bottle('bottle'); // 🔴 立即失败
// Uncaught TypeError: Class constructor Bottle cannot be invoked without 'new'
```

##### 对比使用

```js
let fun = new Fun();
// ✅ 如果 Fun 是个函数：有效
// ✅ 如果 Fun 是个类：依然有效

let fun1 = Fun(); // 我们忘记使用 `new`
// 😳 如果 Fun 是个长得像构造函数的方法：令人困惑的行为
// 🔴 如果 Fun 是个类：立即失败
```

即

|          | new Fun()                     | Fun                                 |
| -------- | ----------------------------- | ----------------------------------- |
| class    | ✅ `this` 是一个 `Person` 实例 | 🔴 `TypeError`                       |
| function | ✅ `this` 是一个 `Person` 实例 | 😳 `this` 是 `window` 或 `undefined` |

#### 使用 new 的怪异之处

##### return 无效

```js
function Bottle() {
  return 'Hello, AnGe';
}

Bottle(); // ✅ 'Hello, AnGe'
new Bottle(); // 😳 Bottle {}
```

##### 箭头函数

对于箭头函数，使用 `new` 会报错🔴

```js
const Bottle = () => {console.log('Hello, AnGe')};
new Bottle(); // Uncaught TypeError: Bottle is not a constructor
```

这个行为是遵循箭头函数的设计而刻意为之的。箭头函数的一个附带作用是它*没有*自己的 `this` 值 —— `this` 解析自离得最近的常规函数：

```js
function AnGe() {
    this.name = 'AnGe'
    return () => {console.log('Hello, ' + this.name)};
}
let anGe = new AnGe();
console.log(anGe()); // Hello, AnGe
```

所以**箭头函数没有自己的 this。**但这意味着它作为构造函数是完全无用的！

**总结：箭头函数**

- this 指向定义时的环境。
- **不可 new 实例化**。
- this 不可变。
- **没有 arguments 对象**。

##### 允许一个使用 `new` 调用的函数返回另一个对象以 **覆盖** `new` 的返回值

先看一个例子：

```js
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

var v1 = new Vector(0, 0);
var v2 = new Vector(0, 0); 

console.log(v1 === v2); // false
v1.x = 1;
console.log(v2); // Vector {x: 0, y: 0}
```

对于这个例子，一目了然，没什么可说的。

那么再看下面一个例子，思考一下为什么 `b === c` 为 `true` 喃😲：

```js
let zeroVector = null;
// 创建了一个懒变量 zeroVector = null;
function Vector(x, y) {
  if (zeroVector !== null) {
    // 复用同一个实例
    return zeroVector;
  }
  zeroVector = this;
  this.x = x;
  this.y = y;
}

var v1 = new Vector(0, 0);
var v2 = new Vector(0, 0); 

console.log(v1 === v2); // true
v1.x = 1;
console.log(v2); // Vector {x: 1, y: 0}
```

这是因为，JavaScript 允许一个使用 `new` 调用的函数返回另一个对象以 **覆盖** `new` 的返回值。这在我们利用诸如「对象池模式」来对组件进行复用时可能是有用的。

