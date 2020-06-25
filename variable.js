const book = "javascript",
  category = "プログラミング";

console.log(book, category);
// ;を付けなくても動くが、基本的に；は付ける。暗黙的なモノに頼りきると、意図しない動作を引き起こしてしまうから。
// 変数の再代入は参照透過性（変数の値は最初に定義した値と常に同じ）というルールを壊すため、バグを発生させやすい要因となっている。基本的にconst

let bookTitle;

console.log(bookTitle); // undefined

bookTitle = "JavaScript Primer";

console.log(bookTitle);

var x = 1;
var x = 2;
// varは同じ変数名を再定義出来てしまう
// varには変数の巻き上げがあるから
// ECMAScriptは後方互換を重視するため、var自体の挙動は変更されなかった
console.log(x);

// let x = 1;
// let x = 2; //Identifier 'x' has already been declared
