/*
 * @Author       : 李才人
 * @Date         : 2020-06-20 14:50:37
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-06-20 18:04:26
 * @FilePath     : /blog/JS/JavaScript重构技巧/函数function/Function.js
 */ 

/** 对象参数使用解构 */ 
// ~ Before
const greet = obj => `${obj.greeting}, ${obj.firstName}${obj.lastName}`;
// ~ After
const greet = ({ greeting, firstName, lastName }) => `${greeting}, ${firstName}${lastName}`;

/** 命名回调函数 */
// ~ Before
const arr = [1, 2, 3].map(a => a * 2);
// ~ After
const double = a => a * 2;
const arr = [1, 2, 3].map(double);

/** 
 * ! 让条件句具有描述性 
 * @ 对于复杂的条件判断， 我们可以单独使用函数来表示，会让条件语句更具描述性
 * @ 在条件语句中拥有一个命名函数比在拥有一堆布尔表达式要清晰得多
 */

// ~ Before
if (score === 100 ||
  remainingPlayers === 1 ||
  remainingPlayers === 0) {
  quitGame();
}
if (score === 100 || remainingPlayers === 1 || remainingPlayers === 0) quitGame();
// ~ After
const winnerExists = () => {
    return score === 100 ||
      remainingPlayers === 1 ||
      remainingPlayers === 0
}
const winnerExists = () => score === 100 || remainingPlayers === 1 || remainingPlayers === 0;

if (winnerExists()) quitGame();

/** 
 * ! 用 Map 或 Object替换 switch 语句
 *      @ 由于 switch语句很长，这样容易出错
 *      @ 许多switch语句可以用map或object替换
 */
// ~ Before
const getValue = (prop) => {
    switch (prop) {
      case 'a': {
        return 1;
      }
      case 'b': {
        return 2;
      }
      case 'c': {
        return 3;
      }
    }
}
const val = getValue('a');
// ~ After object
const obj = {
    a: 1,
    b: 2,
    c: 3
}
const val = obj['a']; 
// * 使用对象，我们仅仅需要一个对象就可以, 使用对象还有一个好处，就是对于键不必是有效的标识符号，这样这增加了更多的灵活性。

// ~ After map
const map = new Map([
    ['a', 1], 
    ['b', 2], 
    ['c', 3]
])
const val = map.get('a')

// * Map优于对象的一个好处是，我们可以将数字，布尔值或对象等其他值用作键。而对象只能将字符串或symbol作为键。

// 原文：https://levelup.gitconnected.com/javascript-refactoring-tips-making-functions-clearer-and-cleaner-c568c299cbb2

