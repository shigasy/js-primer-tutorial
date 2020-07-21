class NumberWrapper {
  constructor(value) {
    this._value = value;
  }

  get value() {
    console.log("getter");
    return this._value;
  }

  set value(newValue) {
    console.log("setter");
    this._value = newValue;
  }
}

const numberWrapper = new NumberWrapper(1);
console.log(numberWrapper.value);
numberWrapper.value = 42;
console.log(numberWrapper.value);

class ArrayWrapper {
  constructor(array = []) {
    this.array = array;
  }

  static of(...items) {
    // 静的メソッドにおけるthisはそのクラス自身を参照するため、thisとかける
    // thisはインスタンスを参照できないため、静的メソッドはクラスのインスタンスを作成する処理やクラスに関する処理を書くために利用される
    return new this(items);
  }

  get length() {
    return this.array.length;
  }
}

const arrayWrapperA = new ArrayWrapper([1, 2, 3]);
const arrayWrapperB = ArrayWrapper.of(1, 2, 3);
console.log(arrayWrapperA.length, arrayWrapperB.length);
