function sort (originList) {
  const array = [...originList];

  for (let i = 0; i < array.length; i += 1) {
    let currentIndex = i;

    while (
      array[currentIndex - 1] !== undefined
      && Boolean(array[currentIndex] < array[currentIndex - 1])
    ) {
      const tmp = array[currentIndex - 1];
      array[currentIndex - 1] = array[currentIndex];
      array[currentIndex] = tmp;
      // const index = currentIndex
      // [array[index], array[index - 1]] = [array[index - 1], array[index]]
      currentIndex -= 1;
    }
  }

  return array;
}

module.exports = sort