const fs = require("fs");

const syncFunction = () => {
  const readFileSync = fs.readFileSync("./date/file.md");
  console.log(`readFileSync ${readFileSync}`);
  const readFileSync3 = fs.readFileSync("./date/file.md");
  console.log(`readFileSync2 ${readFileSync3}`);
};

syncFunction(); // readFileSyncは同期的になるため、下の行にある----はsyncFunctionの処理が終わってからになる。そのため、async awaitより速度は落ちる。
console.log("--------------------------------------");
