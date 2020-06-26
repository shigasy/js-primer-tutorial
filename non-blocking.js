//  import fs from "fs"; mjsにして--experimental-modulesを付けて node 10+だったらこれでもいける
const fs = require("fs");

const data = fs.readFileSync("./date/file.md"); // ブロッキング
console.log(`ブロッキング（同期）1${data}`);
console.log(`ブロッキング（同期）2${data}`);

fs.readFile("./date/file.md", (err, data) => {
  if (err) throw err;
  console.log(`ノンブロッキング1（非同期）${data}`);
});
fs.readFile("./date/file.md", (err, data) => {
  if (err) throw err;
  console.log(`ノンブロッキング2（非同期）${data}`);
});
fs.readFile("./date/file.md", (err, data) => {
  if (err) throw err;
  console.log(`ノンブロッキング3（非同期）${data}`);
});
console.log(`ノンブロッキング4（非同期）${data}`);

fs.readFile("./date/file.md", (err, data) => {
  if (err) throw err;
  console.log(`ノンブロッキング3（非同期）${data}`);
});

const asyncFunction = () => {
  fs.readFile("./date/file.md", (err, data) => {
    if (err) throw err;
    console.log(`asyncFunction${data}`);
  });
};

const asyncFunction2 = () => {
  fs.readFile("./date/file.md", (err, data) => {
    if (err) throw err;
    console.log(`asyncFunction2${data}`);
  });
};

const syncFunction = () => {
  const data = fs.readFileSync("./date/file.md"); // ブロッキング
  console.log(`syncFunction`);
};
const syncFunction2 = () => {
  const data = fs.readFileSync("./date/file.md"); // ブロッキング
  console.log(`syncFunction2`);
};

const callFunction = () => {
  asyncFunction();
  asyncFunction2();
  syncFunction();
  syncFunction2();
};

callFunction();
const data10 = fs.readFileSync("./date/file.md"); // ブロッキング
console.log(`data10`);

// ! ノンブロッキング I/Oは処理を待たずに実行される。そのため、非常に効率良く・高速に処理をすることが可能。大量にアクセスが来ても処理能力が落ちない。だからWEBアプリケーション・サーバーでも使われる。フロントとバック両方同じ言語が使える（アイソモーフィック）もメリットの一つ。

const readFileEx = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) throw reject(err);

      resolve(data);
    });
  });
};

const asyncAwaitFunction = async () => {
  const awaitText = await readFileEx("./date/file.md");
  console.log(`await1 ${awaitText}`);
  const awaitText2 = await readFileEx("./date/file.md");
  console.log(`await2 ${awaitText2}`);
};

asyncAwaitFunction(); // async関数の中だけでブロッキング処理になり、その他の関数は動いて全体的にパフォーマンスが上がる
console.log("--------------------------------------");
