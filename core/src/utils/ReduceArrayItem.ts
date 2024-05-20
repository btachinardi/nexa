export function reduceArrayItem<T>(array: T[], index: number, reducer: (item: T) => T): T[] {
  return [
    ...array.slice(0, index),
    reducer(array[index]),
    ...array.slice(index + 1),
  ];
}