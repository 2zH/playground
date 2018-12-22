const bubbleSort = require('./algorithms/sorting/bubble-sort')
const selectionSort = require('./algorithms/sorting/selection-sort')
const insertionSort = require('./algorithms/sorting/insertion-sort')
const quickSort = require('./algorithms/sorting/quick-sort')
const countingSort = require('./algorithms/sorting/counting-sort')
const radixSort = require('./algorithms/sorting/radix-sort')
const heapSort = require('./algorithms/sorting/heap-sort')
const mergeSort = require('./algorithms/sorting/merge-sort')
const knuthMorrisPratt = require('./algorithms/string/knuth-morris-pratt')
const curry = require('./others/curry')
const destructuringArray = require('./others/destructuring-array')

describe('sorting', () => {
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
  
  test('heap sort', () => {
    const list = [1, 4, 5, 2, 3]
    expect(heapSort(list)).toEqual([1, 2, 3, 4, 5]);
  })
  
  test('merge sort', () => {
    const list = [1, 4, 5, 2, 3]
    expect(mergeSort(list)).toEqual([1, 2, 3, 4, 5]);
  })
})

test('KMP', () => {
  // expect(knuthMorrisPratt('', '')).toBe(0);
  // expect(knuthMorrisPratt('a', '')).toBe(0);
  // expect(knuthMorrisPratt('a', 'a')).toBe(0);
  // expect(knuthMorrisPratt('abcbcglx', 'abca')).toBe(-1);
  // expect(knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3);
  // expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
  // expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1);
  // expect(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
  expect(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
})

test('curry', () => {
  const foo = curry((a, b, c, d) => a + b + c + d)
  expect(foo(1).name).toBe('subCurry')
  expect(foo(1)(2)(3)(4)).toBe(10)
  expect(foo(1, 2)(3, 4)).toBe(10)
})

test('bind', () => {
  function addArguments(arg1, arg2) {
      this.sum = arg1 + arg2
      return this.sum
  }
  const addThirtySeven = addArguments.bind(null, 1)
  const addThirtySevenInstance = new addThirtySeven(2)
  expect(addThirtySeven(2)).toBe(3)
  expect(addThirtySevenInstance.sum).toBe(3)
  expect(addThirtySevenInstance instanceof addThirtySeven).toBe(true)
  expect(addThirtySevenInstance instanceof addArguments).toBe(true)
})

test('destructuringArray', () => {
  const array = [1, [2], 3, 4]
  const str = '[a, [b], c, d]'
  const expectResult = { a: 1, b: 2, c: 3, d: 4}
  expect(destructuringArray(array, str)).toEqual(expectResult)
  expect(destructuringArray([1, [2, [3]], 4], '[a, [b, [c]], d]')).toEqual(expectResult)
  expect(destructuringArray(array, '[a, b, c, d]')).toEqual({
    a: 1,
    b: [2],
    c: 3,
    d: 4
  })
})
