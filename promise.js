function asyncTask() {
  return Math.random() > 0.5 ? Promise.resolve("成功") : Promise.reject("失敗");
}

asyncTask()
  .then(
    (value) => console.log(value) // => 成功
  )
  .catch(
    (value) => console.log(value) // => 失敗
  );

const rejectedPromise = Promise.reject(new Error("ERROR"));

rejectedPromise
  .then(() => {
    // 呼び出されない
  })
  .then(() => {
    // 呼び出されない
  })
  .catch((error) => {
    console.log(error.message);
  })
  .then(() => {
    console.log("errorをキャッチした後に呼ばれる");
  });

// catchした後、呼び出されるのは成功時の処理だが、Promiseインスタンスのrejectメソッドを使って返しすとPromiseチェーンはエラーのまま処理を継続できる
function main() {
  return Promise.reject(new Error("エラー"));
}
main()
  .catch((error) => {
    return Promise.reject(error);
  })
  .then(() => {
    console.log("出力されない");
  })
  .catch(() => {
    console.log("メイン処理失敗");
  })
  .then(() => {
    console.log("ここはrejectメソッドが返されていない");
  });

Promise.resolve(1)
  .then((value) => {
    console.log(value);
    // 次のコールバック関数へ引数として渡される
    return value * 2;
  })
  .then((value) => {
    console.log(value);
  })
  .then((value) => {
    // 値を返さない場合はundefinedを返すのと同じ
    console.log(value);
  });

const promiseAll = Promise.all([asyncTask(), asyncTask()]);
promiseAll
  .then(([asyncTask1, asyncTask2]) => {
    console.log(asyncTask1);
    console.log(asyncTask2);
  })
  .catch(([asyncTask1, asyncTask2]) => {
    console.log(asyncTask1);
    console.log(asyncTask2);
  });
