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

function map(arr, iteratee) {
  let new_array = [];
  for (let i = 0; i < arr.length; i++) {
    new_array.push(iteratee(arr[i], i, arr));
  }
  return new_array;
}

console.log(L('n => n * 10')(10));

let test_datas = [1, 2, 3, 4, 5, 6];
console.log(map(test_datas, L('n => n * 2')));

console.log(
  map(test_datas, function (a) {
    return a * 2;
  })
);

let testFunction = (a) => a * 2;

console.log(map(test_datas, testFunction));

function L(str) {
  var splitted = str.split('=>');
  return new Function(splitted[0], 'return (' + splitted[1] + ');');
}

// 메모리제이션 기법
// L2 { 특정 str: new Function(아무개) } 형태로 저장해서 메모리에 담는 기법인데 신박하다.
// 함수를 객체와 같이 사용한 것을 눈여겨 보자. 즉 함수도 객체임을 알자
function L2(str) {
  if (L2[str]) return L2[str];
  var splitted = str.split('=>');
  return (L2[str] = new Function(splitted[0], 'return (' + splitted[1] + ');'));
}

// L과 L2의 차이가 무엇인가를 눈여겨보자
// L은 호출될 때마다 매번 새로운 익명함수를 생성한다.
// L2는 호출될 때 해당 str에 대해 익명함수가 존재하면 새로운 익명함수를 생성하지 않고 기존에 있는 것을 사용한다.
// 여기서 우리는 성능 차이를 확인할 수 있따. 대박

// 아래 처럼 유명 함수를 사용하면 자기 자신을 참조하는데 간편하다.
// 재귀함수와 같은 예시들이 존재한다.
var f1 = function f() {
  console.log(f);
};

f1();

f1 = function () {
  console.log(f1);
};

f1();
var f2 = f1;
f1 = 'hi~';

f2();

// 유명 함수는 내부 스코프에서만 접근이 가능하다.
var h1 = 1;
var hello = function h1() {
  console.log(h1);
};

h1 = 2;
hello();
console.log(hello.name);
console.log(hello.name === 'h1');

// 즉시 실행 & 유명함수 & 재귀함수를 사용한 버전
function flatten(arr) {
  return (function f(arr, new_array) {
    arr.forEach((element) => {
      Array.isArray(element) ? f(element, new_array) : new_array.push(element);
    });

    return new_array;
  })(arr, []);
}

console.log(flatten([1, 2, [3, 4, [5]]]));

// 단순히 재귀함수만 사용한 버전
function flatten2(arr, new_array) {
  arr.forEach((v) => {
    Array.isArray(v) ? flatten2(v, new_array) : new_array.push(v);
  });

  return new_array;
}

console.log(flatten2([1, 2, [3, 4, [5]]], []));

function flatten3(arr, new_array) {
  if (!new_array) return flatten3(arr, []);
  arr.forEach((v) => {
    Array.isArray(v) ? flatten3(v, new_array) : new_array.push(v);
  });

  return new_array;
}

console.log(flatten3([1, 2, [3, 4, [5]]]));
// 위 두 버전을 비교했을 때 단순히 재귀함수만 사용하는 버전은 사용자가 항상 두번 째 인자 값에
// 빈 배열을 넘겨주거나 if문을 사용해 빈 배열이 넘어왔는지 체크해야 한다.

// 함수 실행과 인자 그리고 점 다시 보기
function test(a, b, c) {
  console.log('a b c: ', a, b, c);
  // console.log('this: ', this);
  console.log('arguments: ', arguments);
}

test(10);

test(10, undefined);

test(10, 20, 30);

function test2(a, b) {
  b = 10;
  console.log(arguments);
}

test2(1);

test2(1, 2);

var obj1 = {
  0: 1,
  1: 2,
};
console.log(obj1);

var a = obj1[0];
var b = obj1[1];
b = 10;
console.log(obj1);
console.log(obj1[1]);
console.log(b);

// 함수의 인자는 변동되고 변수는 유지된다~?!!?
