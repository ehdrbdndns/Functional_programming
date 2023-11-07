let obj = { a: 1, b: 2 };
obj.c = 3;
obj['d'] = 4;
let e = 'e';
obj[e] = 5;
function f() {
  return 'f';
}
obj[f()] = 6;

// console.log(obj);

let obj2 = { ' aaa ': 1 };
obj2[' bbb '] = 2;
// console.log(obj2);

let obj3 = { 'my-name#is': 1 };
// console.log(obj3);

let obj4 = { 1: 10 };
obj4[2] = 20;
obj4['2'] = 30;

// {} 안에서는 코드를 실행할 수 없음
// obj4 = { (1 ? "true" : "false"): 1 }; -> error
// [] 안에서는 코드를 실행할 수 있음
obj4[true ? '3' : '4'] = 3; // -> obj4[3] = 3;

// console.log(obj4);

let obj5 = { [true ? 1 : 2]: 1 };
// console.log(obj5);

// 함수를 객체처럼 사용..
let obj8 = () => {};

obj8.a = 1;
obj8.b = 2;
// console.log(obj8);
// console.log(obj8.a + obj8.b);

// 호이스팅 예시
obj9.a = 1;
obj9.b = 2;
// console.log(obj9.a + obj9.b);
function obj9() {}

let obj10 = [];
obj10.a = 1;
// console.log(obj10);
// console.log(obj10.length);

obj10[1] = 0;
obj10[2] = 1;
// console.log(obj10);
// console.log(obj10[0]);
// console.log(obj10.length);

var l = 100000;
var list = [];
for (let i = 0; i < l; i++) {
  list.push(i);
}
// 3ms ~ 4.8ms

var l = 100000;
var list = [];
for (let i = 0; i < l; i++) {
  list[list.length] = i;
}
// 2.3ms ~ 3.4ms

var list = [];
list.length = l;
for (let i = 0; i < l; i++) {
  list[i] = i;
}
// 1.6ms ~ 2.2ms

var list = Array(l);
for (let i = 0; i < l; i++) {
  list[i] = i;
}
// 1.5ms ~ 1.97ms

// 변수 선언과 함수 선언의 차이
// 변수 선언은 선언과 초기화가 동시에 이루어지지 않음
// 함수 선언은 선언과 초기화가 동시에 이루어짐

// console.log(add1);

// console.log(add2);

function add1(a, b) {
  return a + b;
}

const add2 = function (a, b) {
  return a + b;
};

// 아래 처럼 value 함수는 함수선언이기 때문에 선언과 동시에 초기화가 이루어진다.
// 이와 같은 호스팅 기법을 사용해 비교적 복잡한 코드를 하단부에 정의하고 실행부 코드는 위에 깔끔하게 유지함!
// 그러나 아래와 같은 기법은 모 스타일 가이드에서는 추천하지 않음
function add(a, b) {
  return value() ? a + b : new Error();

  function value() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

// console.log(add(1, '@'));
// console.log(add(1, 2));

function f1() {
  return (function (a) {
    console.log(a);
  })(100);
}

!(function (a) {
  console.log(a);
})(1);

var pj = new (function () {
  this.name = 'PJ';
  this.age = 28;
  this.constructor.prototype.hi = function () {
    console.log('hi');
  };
})();

console.log(pj);
pj.hi();

var a = function (a) {
  console.log(this, a);
}.call([1], 1);

var a2 = eval('1 + 10');
console.log(a2);

var add = new Function('a, b', 'return a + b;');
console.log(add(1, 2));

function L(str) {
  var splitted = str.split('=>');
  return new Function(splitted[0], 'return (' + splitted[1] + ');');
}

function map(arr, iteratee) {
  let new_array = [];
  for (let i = 0; i < arr.length; i++) {
    new_array.push(iteratee(arr[i], i, arr));
  }
  return new_array;
}

console.log(L('n => n *10')(10));

let test_datas = [1, 2, 3, 4, 5, 6];
console.log(map(test_datas, L('n => n * 2')));

console.log(
  map(test_datas, function (a) {
    return a * 2;
  })
);

let testFunction = (a) => a * 2;

console.log(map(test_datas, testFunction));
