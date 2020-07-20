const map = new WeakMap();

let obj = {};

map.set(obj, "value");
console.log(map.get(obj)); // => value
obj = null;

// 参照先がnullになり、GCで解放されるように成ると、weakMap上でも消える
//（実際にどのタイイミングでメモリから解放されるかは、JavaScriptエンジンの実装に依存する）
console.log(map.get(obj)); // => undefined
