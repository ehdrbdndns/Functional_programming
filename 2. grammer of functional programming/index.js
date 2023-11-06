let obj = { a: 1, b: 2 };
obj.c = 3;
obj['d'] = 4;
let e = 'e';
obj[e] = 5;
function f() {
  return 'f';
}
obj[f()] = 6;

console.log(obj);

let obj2 = { ' aaa ': 1 };
obj2[' bbb '] = 2;
console.log(obj2);

let obj3 = { 'my-name#is': 1 };
console.log(obj3);

let obj4 = { 1: 10 };
obj4[2] = 20;
obj4['2'] = 30;

// {} 안에서는 코드를 실행할 수 없음
// obj4 = { (1 ? "true" : "false"): 1 }; -> error
// [] 안에서는 코드를 실행할 수 있음
obj4[true ? '3' : '4'] = 3; // -> obj4[3] = 3;

console.log(obj4);

let obj5 = { [true ? 1 : 2]: 1 };
console.log(obj5);

// 함수를 객체처럼 사용..
let obj8 = () => {};

obj8.a = 1;
obj8.b = 2;
console.log(obj8);
console.log(obj8.a + obj8.b);

// 호이스팅 예시
obj9.a = 1;
obj9.b = 2;
console.log(obj9.a + obj9.b);
function obj9() {}

let obj10 = [];
obj10.a = 1;
console.log(obj10);
console.log(obj10.length);

obj10[1] = 0;
obj10[2] = 1;
console.log(obj10);
console.log(obj10[0]);
console.log(obj10.length);

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
