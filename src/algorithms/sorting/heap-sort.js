const { MinHeap } = require('../../data-structures/heap')

function heapSort (originalArray) {
    const sortedArray = [];
    const minHeap = new MinHeap();

    originalArray.forEach(minHeap.add.bind(minHeap));
    while (!minHeap.isEmpty()) {
        const nextMinElement = minHeap.poll();
        sortedArray.push(nextMinElement);
    }

    return sortedArray;
}

module.exports = heapSort