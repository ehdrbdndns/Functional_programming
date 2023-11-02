function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

console.log(addMaker(10)(5));

var add3 = addMaker(3);
var add5 = addMaker(5);

console.log(add3(3));
console.log(add3(5));

console.log(add5(5));
console.log(add5(2));
