function sort (originList) {
  let swapped = false;
  const array = [...originList];
  
  for (let i = 1; 1 < array.length; i +=1) {
    swapped = false;
    for (let j = 0; j < array.length - i; j += 1) {
      if (array[j + 1] < array[j]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }

    if (!swapped) {
      return array;
    }
  }

  return array
}

module.exports = sort