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

const _ = {};

_.map = (list, iteratee) => {
  let new_array = [];
  for (let i = 0; i < list.length; i++) {
    new_array.push(iteratee(list[i], i, list));
  }
  return new_array;
};

_.filter = (list, predicate) => {
  let new_array = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i], i, list)) new_array.push(list[i]);
  }
  return new_array;
};

_.find = (list, predicate) => {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i], i, list)) return list[i];
  }
};

_.findIndex = (list, predicate) => {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i], i, list)) return i;
  }
  return -1;
};

_.identity = (value) => value;

const not = (v) => !v;

const beq = (a) => (b) => a === b;

const positive = (list) => _.find(list, _.identity);

const negativeIndex = (list) => _.findIndex(list, not);

_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
};

_.some = _.compose(not, not, positive);

_.every = _.compose(beq(-1), negativeIndex);

// _.some = (list) => {
//   return not(not(positive(list)));
// };

// _.every = (list) => {
//   return beq(-1)(negativeIndex(list));
// };

console.log(_.some([false, 1, 2, 0, true, false]));

console.log(_.every([true, 1, 2, 1, true, false]));

// console.log(
//   _.filter([false, 1, 2, 0, true, false], (value) => _.identity(value))
// );

// console.log(_.filter(users, (value, idx) => idx > 1));

// console.log(_.filter(users, (value, idx) => idx % 2 === 0));
