/*
 * @Author       : 李才人
 * @Date         : 2020-06-20 14:50:37
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-18 10:27:17
 * @FilePath     : /femo-unity-chartd:/workspace/github/blog/JS/JavaScript重构技巧/js技巧/if_else.js
 */ 

/**
 * ! 三元运算符 
 * 
 */ 
// ~ 示例1 Before：
function saveCustomer(customer) {
  if (isCustomerValid(customer)) {
    database.save(customer)
  } else {
    alert('customer is invalid')
  }
}
// ~ 示例1 After 重构后代码：
function saveCustomer(customer) {
  return isCustomerValid(customer)
    ? database.save(customer)
    : alert('customer is invalid')
}
// ~ 示例1 After 使用 ES6：
const saveCustomer = customer => isCustomerValid(customer) ? database.save(customer) : alert('customer is invalid')  
const saveCustomer = customer => isCustomerValid(customer)
    ? database.save(customer) 
    : alert('customer is invalid')    

// ~ 示例2 Before
function customerValidation(customer) {
  if (!customer.email) {
    return error('email is require')
  } else if (!customer.login) {
    return error('login is required')
  } else if (!customer.name) {
    return error('name is required')
  } else {
    return customer
   }
}

// ~ 示例2 After
const customerValidation = customer =>
  !customer.email   ? error('email is required')
  : !customer.login ? error('login is required')
  : !customer.name  ? error('name is required')
                    : customer
// ~ 示例3 Before
function getEventTarget(evt) {
    if (!evt) {
        evt = window.event;
    }
    if (!evt) {
        return;
    }
    const target;
    if (evt.target) {
      target = evt.target;
    } else {
        target = evt.srcElement;
    }
    return target;
}
// ~ 示例3 After
function getEventTarget(evt) {
  evt = evt || window.event;
  return evt && (evt.target || evt.srcElement);
}

/**
 * ! 短路运算符
 */ 
// ~ 示例1 Before
if (isOnline) {
  makeReservation(user);
 }
 if (active&&loan){
  sendMoney();
 }
// ~ 示例1 After
isOnline && makeReservation(user);
active && loan && sendMoney();


/**
 * ! 函数委托
 */
// ~ Before
function itemDropped(item, location) {
    if (!item) {
        return false;
    } else if (outOfBounds(location)) {
        var error = outOfBounds;
        server.notify(item, error);
        items.resetAll();
        return false;
    } else {
         animateCanvas();
         server.notify(item, location);
         return true;
     }
}
// ~ After
const itemDropped = (item, location) => {
    const dropOut = function() {
        server.notify(item, outOfBounds);
        items.resetAll();
        return false;
    }

    const dropIn = function() {
        server.notify(item, location);
         animateCanvas();
         return true;
    }

    return !!item && (outOfBounds(location) ? dropOut() : dropIn());
}

/** 
 * ! 非分支策略
 * 
 * @ 此技巧尝试避免使用switch语句，相反是用键/值创建一个映射并使用一个函数访问作为参数传递的键的值。
 */
// ~ Before
const testSwitch = breed => {
  switch(breed){
    case 'border':
      return 'Border Collies are good boys and girls.';
      break;  
    case 'pitbull':
      return 'Pit Bulls are good boys and girls.';
      break;  
    case 'german':
      return 'German Shepherds are good boys and girls.';
        break;
      default:
        return 'Im default'
  }
}
 // ~ After
 const dogSwitch = breed => ({
  "border": "Border Collies are good boys and girls.",
  "pitbull": "Pit Bulls are good boys and girls.",
  "german": "German Shepherds are good boys and girls.",  
})[breed]||`I'm a hero`;

dogSwitch("border xxx")

/** 
 * ! 作为数据的函数
 * 
 * @ JS中函数是第一个类，所以使用它我们可以把代码分割成一个函数对象。
 */

 // ~ Before
 const calc = {
    run: function(op, n1, n2) {
      const result;
      if (op == "add") {
        result = n1 + n2;
      } else if (op == "sub" ) {
        result = n1 - n2;
      } else if (op == "mult" ) {
        result = n1 * n2;
      } else if (op == "div" ) {
        result = n1 / n2;
      }
      return result;
    }
}
calc.run("sub", 5, 3); //2
// ~ After
const calc = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mult: (a, b) => a * b,
    div: (a, b) => a / b,
    run: (fn, a, b) => fn && fn(a, b)
}
calc.run(calc.mult, 7, 4); //28 

/** 
 * ! 多态性
 * 
 * @ 多态性是对象具有多种形式的能力。OOP中多态性最常见的用法是使用父类引用来引用子类对象。
 */
 // ~ Before
 const bob = {
  name:'Bob',
  salary:1000,
  job_type:'DEVELOPER'
};

const mary = {
  name:'Mary',
  salary:1000,
  job_type:'QA'
};

const calc = (person) =>{
    if (people.job_type==='DEVELOPER') {
      return person.salary+9000*0.10;
    }
    if (people.job_type==='QA') {
      return person.salary+1000*0.60;
    }
}
 
console.log('Salary',calc(bob));
console.log('Salary',calc(mary));
// ~ After
const qaSalary  = base => base + 9000 * 0.10;
const devSalary = base => base + 1000 * 0.60;

//Add function to the object.
const bob = {
  name:'Bob',
  salary:1000,
  job_type:'DEVELOPER',
  calc: devSalary
};

const mary = {
  name:'Mary',
  salary:1000,
  job_type:'QA',
  calc: qaSalary
};

console.log('Salary',bob.calc(bob.salary));
console.log('Salary',mary.calc(mary.salary));

// @ 在构造 constructor() 中，在调用super()之前不能使用 this。