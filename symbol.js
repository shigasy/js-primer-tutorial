console.log(Symbol() === Symbol()); // => false
console.log(Symbol("a") === Symbol("a")); // => false

const obj = {};
const sym = Symbol("key");
const sym2 = Symbol("key");
// キーがキーがかぶらない
obj[sym] = "a";
obj[sym2] = "a";

console.log(obj); // => { [Symbol(key)]: 'a', [Symbol(key)]: 'a' }
