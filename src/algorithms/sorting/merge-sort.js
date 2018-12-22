function mergeSort (arr) {
    if (arr.length <= 1) {
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    const tmp = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            tmp.push(left.shift())
        } else {
            tmp.push(right.shift())
        }
    }
    return tmp.concat(left, right)
}

module.exports = mergeSort