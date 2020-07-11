// コールバック関数を使って、スコープを限定
const measureTask = (taskFn) => {
  const startTime = Date.now();
  taskFn();
  const endTime = Date.now();
  return endTime - startTime;
};

function doHeavyTask() {}

const time = measureTask(doHeavyTask);
console.log(time);
