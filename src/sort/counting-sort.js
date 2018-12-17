function sort (originList, range) {
  const rangeArray = Array.from(
    { length: range[1] - range[0] + 1 },
    (_, i) => i + range[0]
  );
  const tempList = rangeArray.map(() => []);
  
  originList.forEach(t => {
    const index = rangeArray.findIndex(n => n === t)
    tempList[index].push(t)
  });

  return tempList.reduce((a, b) => a.concat(b))
}

module.exports = sort