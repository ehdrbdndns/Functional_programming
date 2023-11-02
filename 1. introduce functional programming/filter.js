function User(id, name, age) {
  this.getId = function () {
    return id;
  };
  this.getName = function () {
    return name;
  };
  this.getAge = function () {
    return age;
  };
}

var users = [
  { id: 1, name: 'ID', age: 32 },
  { id: 2, name: 'HA', age: 25 },
  { id: 3, name: 'BJ', age: 32 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
  { id: 6, name: 'JM', age: 32 },
  { id: 7, name: 'HI', age: 24 },
];

var users2 = [
  new User(1, 'ID', 32),
  new User(2, 'HA', 25),
  new User(3, 'BJ', 32),
  new User(4, 'PJ', 28),
  new User(5, 'JE', 27),
  new User(6, 'JM', 32),
  new User(7, 'HI', 24),
];

function filter(list, predicate) {
  var new_list = [];
  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

function map(list, iteratee) {
  let new_list = [];
  for (let i = 0; i < list.length; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}

function log_value(value) {
  console.log(value.length);
  return value;
}

const bValue = (key) => (obj) => obj[key];

const bValues = (key) => {
  let value = bValue(key);
  return (list) => map(list, value);
};

let ages = bValues('age');
let names = bValues('name');

function findBy(list, value, key) {
  let new_user = {};
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === value) {
      new_user = list[i];
      break;
    }
  }
  return new_user;
}

function find(list, predicate) {
  let new_user;
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      new_user = list[i];
      break;
    }
  }
  return new_user;
}

function bmatch1(key, value) {
  return function (obj) {
    return obj[key] === value;
  };
}

function test() {
  let a = 10;
  let test2 = function (b) {
    return a + b;
  };
  let changeA = function (v) {
    a = v;
  };

  return { test2, changeA };
}

let a = test();
console.log(a.test2(5));
a.changeA(100);
console.log(a.test2(5));

// console.log(find(users, bmatch1('name', 'BJ')));

// console.log(log_value(ages(filter(users, (user) => user.age < 30))));

// console.log(log_value(names(filter(users, (user) => user.age >= 30))));

// console.log(findBy(users, 'JM', 'name'));

// console.log(find(users2, (user) => user.getId() === 3).getName());
