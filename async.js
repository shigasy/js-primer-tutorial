function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 1000 * Math.random());
  });
}
// リソースAとリソースBを順番に取得する
async function fetchAB() {
  const results = [];
  try {
    const responseA = await dummyFetch("/resource/A")
      .then((res) => {
        // Promiseインスタンス返ってくるから、then catchで繋げることも可能だが、awaitにした意味...となる
        console.log(res);
        const hoge = { ...res, hoge: "hogehoge" };
        console.log(hoge);
        return hoge;
      })
      .catch();
    console.log(responseA);
    results.push(responseA.body);
    const responseB = await dummyFetch("/resource/B");
    results.push(responseB.body);
  } catch (error) {
    console.error(error.message);
  }
  return results;
}
// リソースを取得して出力する
fetchAB().then((results) => {
  console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
