const bubbleSort = require('./sort/bubble-sort')
const selectionSort = require('./sort/selection-sort')
const insertionSort = require('./sort/insertion-sort')
const quickSort = require('./sort/quick-sort')
const countingSort = require('./sort/counting-sort')
const radixSort = require('./sort/radix-sort')

test('bubble sort', () => {
  const list = [1, 4, 5, 2, 3]
  expect(bubbleSort(list)).toEqual([1, 2, 3, 4, 5]);
})

test('selection sort', () => {
  const list = [1, 4, 5, 2, 3]
  expect(selectionSort(list)).toEqual([1, 2, 3, 4, 5]);
})

test('insertion sort', () => {
  const list = [1, 4, 5, 2, 3]
  expect(insertionSort(list)).toEqual([1, 2, 3, 4, 5]);
})

test('quick sort', () => {
  const list = [1, 4, 5, 2, 3]
  expect(quickSort(list)).toEqual([1, 2, 3, 4, 5]);
})

test('counting sort', () => {
  const list = [1, 4, 5, 2, 3]
  expect(countingSort(list, [1, 5])).toEqual([1, 2, 3, 4, 5]);
})

test('radix sort', () => {
  const list = [1, 4, 5, 2, 3]
  expect(radixSort(list, [1, 5])).toEqual([1, 2, 3, 4, 5]);
})
