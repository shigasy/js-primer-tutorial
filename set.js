const set = new Set();

set.add("a");
set.add("b");
set.add("b");
console.log(set.has("a")); // => true
console.log(set.size); // => 2

// Setオブジェクトもiterableなオブジェクト
for (const value of set) {
  console.log(value);
}

set.clear(); // 全て削除 deleteで一つだけ削除
console.log(set.size); // => 0
