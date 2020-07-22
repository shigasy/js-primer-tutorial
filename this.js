"use strict"; // => strictモードでないと、thisがundefinedの場合は、thisがグローバルオブジェクトを参照するように変換される問題がある

const obj = {
  text: "text",
  method() {
    return this.text;
  },
};

// ベースオブジェクトはメソッドから見て一つ左になる
const obj1 = {
  obj2: {
    obj3: {
      method() {
        return this;
      },
    },
  },
};
console.log(obj1.obj2.obj3.method() === obj1.obj2.obj3); // => true

// 関数やメソッドは
// ベースオブジェクトのthisを暗黙的に渡す
// 今回はobjのthisを渡す
console.log(obj.method()); // => text
const obj2 = obj.method; // ベースオブジェクトがない例のための代入

// try {
//   console.log(obj2()); // ベースオブジェクトがないため、thisはundefinedになる。そのため、undefined.textで、例外を投げる。
// } catch (error) {
//   console.log(error);
// }

// ==========
// bind, call, apply
// ==========
function say(message) {
  return `${message}: ${this.fullName}`;
}

const person = {
  fullName: "Brendan Eich",
};

// thisを明示的に指定して、関数を実行する方法もある
console.log(say.call(person, "メッセージ, call")); // thisを明示的に指定して関数を実行
const sayPerson = say.bind(person, "メッセージ, bind"); // bindで引数を束縛した関数を作る
console.log(sayPerson());
// ==========

// ==========
// コールバック関数 this
// ==========

const Prefixer = {
  prefix: "pre",
  prefixArray(strings) {
    // callback関数はcallback()のように呼ばれるため、コールバック関数におけるthisはundefinedになる
    // ベースオブジェクトがない
    // const callback = function (str) {
    //   return this.prefix + "-" + str;
    // };

    // * 対処法1 thisを一時変数へ代入
    // Prefixer.prefixArray()でthisがPrefixerという参照先を保存してcallback関数を実行する方法
    // const that = this;
    // const callback = function (str) {
    //   return that.prefix + "-" + str;
    // };
    // mapの第2引数にthisを渡すことも可能。

    // * 対処法2 Arrow Functionを使用する
    // ES2015ではthisを変えずにコールバック関数を定義する方法として、Arrow Functionが導入された
    const callback = (str) => {
      return this.prefix + "-" + str;
    };
    return strings.map(callback);
  },
};
console.log(Prefixer.prefixArray(["a", "b", "c"]));

// ==========

// ==========
// arrow function
// ==========

// Arrow Functionは自身の外側のスコープにあるもっとも近い関数のthisの値を静的に決める（thisを持たない）
const fn = () => {
  // この関数の外側には関数は存在しない
  // トップレベルのthisと同じ値
  return this;
};
console.log(fn() == exports); // グローバルオブジェクト ブラウザの場合、Window。 Node.jsの場合、トップレベルのthisはグローバルオブジェクトではない。exportsオブジェクトがthisに入っている
console.log(globalThis);

// arrow functionはthisをbindできない
// （arrow functionのthisが参照する自身の外側のスコープにある最も近い関数のthisの値をcallメソッドでは変更可能）
console.log(fn.call({}) === exports); // => true
