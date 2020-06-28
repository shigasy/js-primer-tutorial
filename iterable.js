const createRangeIterator = (end) => {
  let currentValue = 0;
  const iterator = new Object();

  iterator.next = () => {
    const value = currentValue++; // currentValue自体もここで＋される
    const done = currentValue > end;
    return (result = done ? { done } : { value, done });
  };

  return iterator;
};

const range = (end) => {
  const iterable = new Object();

  iterable[Symbol.iterator] = () => createRangeIterator(end);
  return iterable;
};

for (const val of range(3)) {
  console.log(val);
}
