const map = new Map();

map.set(1, "1の数");
map.set(2, "2の数");

// プロパティだから()が不必要
console.log(map.size); // => 2
// iterableなオブジェクト（iteratorを返す）だから for...ofで反復処理可能
for (const [key, value] of map) {
  console.log(typeof key); // => number 数値型も可能 mapだから
  console.log(key, value); // 1 1の数
}
map.forEach((value, key) => {
  console.log(`${key}, ${value}`);
});

map.set(1, "1の数が上書き"); // => 後から書いたものに上書きされる
console.log(map.get(1)); // => 1の数が上書き

const map2 = new Map([
  ["key", "value"],
  ["key2", "value2"],
]);
map2.forEach((value, key) => {
  console.log(`${key}, ${value}`);
});
