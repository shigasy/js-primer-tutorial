"use strict";
// メソッドチェーン（classで拡張）（prototypeでビルトインオブジェクトを拡張するより、影響範囲を狭くできて良さそう）
// ベースオブジェクトがmyArrayであるため、thisはメソッドを実行した配列
// そのthisを返してあげれば、配列が返ってきて、その配列に対して、メソッドを実行できる。
// そのため、メソッドチェーンが可能になる。
// クラスだとプロトタイプメソッドの補完が効いて良い感じ！
class MyArray extends Array {
  repush(value) {
    if (arguments.length === 0) {
      return this;
    } else {
      this.push(value);
    }
    if (arguments.length > 1) {
      for (let i = 1; i < arguments.length; i++) {
        this.push(arguments[i]);
      }
      return this;
    } else {
      return this;
    }
  }
}
const myArray = new MyArray(1, 2); // => [1, 2]
myArray.repush(1);
console.log(myArray); // => [1, 2, 1]
myArray.repush(2).repush(3).repush(4, 4, 1);
console.log(myArray); // => [1, 2, 1, 2, 3, 4, 4, 1]

// メソッドチェーン（prototype拡張（理由がない限り非推奨））（昔良く使われていた？？）
// Arrayのprototypeにメソッドを拡張する感じ
// 全てのArrayに影響がでる
Array.prototype.repush2 = function (value) {
  if (arguments.length === 0) {
    return this;
  } else {
    this.push(value);
  }
  if (arguments.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      this.push(arguments[i]);
    }
    return this;
  } else {
    return this;
  }
};

const prototypeArray = [1, 2, 3]; // => [1, 2, 3]
prototypeArray.repush2(1).repush2(2);
console.log(prototypeArray); // => [1, 2, 3, 1, 2]

// ビルトインオブジェクト拡張2
Object.defineProperty(Array.prototype, "clear", {
  value() {
    return (this.length = 0);
  },
});

prototypeArray.clear();
console.log(prototypeArray);
