function createCounter() {
  let count = 0;

  // これがクロージャーという性質
  // 外側のスコープにある変数への参照を保持できる
  function increment() {
    count = count + 1;
    return count;
  }
  return increment;
}

const counter = createCounter();
console.log(typeof counter); // => function
counter(); // => 1
counter(); // => 2
const secondCounter = createCounter();
secondCounter(); // => 1
secondCounter(); // => 2
console.log(counter(), secondCounter()); // => 3 3

// プライベート変数にする使い方（外からcount自体を操作出来ない）
// グローバルに定義する変数をへらす
function privateVariable() {
  let count = 0;
  return () => {
    count++;
    return `${count}:`;
  };
}
const con = privateVariable();
con();
con();
console.log(con());

// 高階関数 & 部分適用で、nの状態を保持
function greaterThen(n) {
  return (m) => {
    return m > n;
  };
}
const greaterThen5 = greaterThen(5);
console.log(greaterThen5(4)); // => false
console.log(greaterThen5(6)); // => true
