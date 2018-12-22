function sort (originList) {
  let spaces = Array.from({ length: 10 }, () => [])
  
  originList.forEach(n => {
    const index = n % 10
    spaces[index].push(n)
  })

  const secondList = spaces.reduce((a, b) => a.concat(b))
  spaces = spaces.map(() => [])

  secondList.forEach(n => {
    const index = Math.floor(n / 10)
    spaces[index].push(n)
  })

  return spaces.reduce((a, b) => a.concat(b))
}

module.exports = sort