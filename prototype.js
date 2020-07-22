// class構文なかったときの名残かな
// グローバルオブジェクトのプロパティCに関数式で生成したFunctionオブジェクトをセット
// 全ての「オブジェクト」は内部プロパティ[[Prototype]]を持つ。
// [[Prototype]]は仕様上、内部プロパティとされているが、実際に_proto_というプロパティ名でプログラムから扱える実装が多い(ChromeやFirefox)
// Cオブジェクトの__proto__プロパティはFunction.prototypeを参照する
const C = function (name) {
  this.name = name;
};
// let C = (name) => {
//   this.name = name;
// };
// const hoge = () => {};
// console.log(Number(num).prototype);
// console.log(Object(function () {}).prototype);
// console.log(hoge.length);
// console.log(Function(hoge).prototype);
// console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(() => {})));
console.log(typeof C);
console.log(C.prototype);
console.log(C.hasOwnProperty("toString")); // => false
console.log(Function.prototype.hasOwnProperty("toString")); // => true

// arrow functionだとエラー出た = arrow functionはprototypeプロパティを持たない。メソッドを実行するときは、暗黙的に変換されるはず => __proto__を参照しているものを追っていく
// C.__proto__.x = "xxx";
C.prototype.x = "xxx";
// console.log(C.x);
// console.log(C.__proto__);
// __proto__はコンストラクタ関数のprototypeを参照する（今回の場合、Function）
// console.log(C.__proto__ === Function.prototype);
// const fn = Function.prototype.constructor; // new演算子ってこういうことじゃないかな => そうだった。インスタンスの初期化処理をコンストラクタ関数で行う。それをnew演算子でインスタンス化する際に自動的に呼び出せる
// console.log(fn.prototype);
const c1 = new C("hoge");
const c2 = new C("huga");
console.log(c1.__proto__.x, c1.x); // 同じ意味 // xxx

C.prototype.y = "yyy";
C.prototype = { z: "zzz" };
console.log(c1.y); // => yyy
console.log(c1.z); // => undefined
const c3 = new C("piyo");
// 新しいものに取り替えると
