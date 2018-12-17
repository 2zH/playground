function quickSort (originList) {
  
  if (!originList.length) {
    return originList
  }
  
  const pivot = originList[0];
  const left = [];
  const right = [];
  
  originList.forEach(n => {
    if (n < pivot) {
      left.push(n)
    }
    if (n > pivot) {
      right.push(n)
    }
  });

  return quickSort(left)
    .concat(pivot)
    .concat(quickSort(right))
}

module.exports = quickSort