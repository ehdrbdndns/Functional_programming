let _ = {};

_.map = (list, iteratee) => {
  let new_list = [];
  for (let i = 0; i < list.length; i++) {
    new_list.push(iteratee(list[i], i, list));
  }
  return new_list;
};

_.get = (list, index) => list[index];

function callWith(value) {
  return function (value2, func) {
    return func(value, value2);
  };
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

var callWith10 = callWith(10);
console.log(callWith10(20, add));

var callWith100 = callWith(100);
console.log(callWith100(50, sub));

console.log(
  callWith([1, 2, 3])(function (v) {
    return v * 10;
  }, _.map)
);

var callWithUsers = callWith([
  { id: 2, name: 'HA', age: 25 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
]);

console.log(callWithUsers(2, _.get));

var add10 = add.bind(this, 10, 20, 30);
console.log(add10());

Function.prototype.partial = function () {
  var fn = this,
    args = arguments;
  return function () {
    var arg = 0;
    var new_args = Array.prototype.slice.call(args);
    for (var i = 0; i < new_args.length && arg < new_args.length; i++) {
      if (new_args[i] === undefined) new_args[i] = arguments[arg++];
    }
    return fn.apply(this, new_args);
  };
};

function abc(a, b, c) {
  console.log(a, b, c);
}

var ac = abc.partial(undefined, 'b', undefined);
ac('c', 'f');
ac('a', 'b');
