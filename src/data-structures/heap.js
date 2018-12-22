class Heap {
    constructor() {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }
        this.heapContainer = [];
    }
    swap(indexOne, indexTwo) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }
    peek() {
        if (this.heapContainer.length === 0) {
            return null;
        }
        return this.heapContainer[0]
    }
    poll() {
        if (this.heapContainer.length === 0) {
            return null;
        }
        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }
        const item = this.heapContainer[0];
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();
        return item
    }
    heapifyDown(customStartIndex = 0) {
        let currentIndex = customStartIndex
        let nextIndex = null
        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(
                    this.rightChild(currentIndex),
                    this.leftChild(currentIndex)
                )
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex]
            )) {
                break;
            }
            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }
    heapifyUp(customStartIndex) {
        let currentIndex = customStartIndex || this.heapContainer.length - 1
        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(
                this.parent(currentIndex),
                this.heapContainer[currentIndex]
            )
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }
    getLeftChildIndex(parentIndex) {
        return (2 * parentIndex) + 1
    }
    getRightChildIndex(parentIndex) {
        return (2 * parentIndex) + 2
    }
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2)
    }
    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }
    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }
    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }
    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)]
    }
    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)]
    }
    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)]
    }
    add(item) {
        this.heapContainer.push(item)
        this.heapifyUp()
        return this
    }
    remove(item) {
        this.find(item).forEach(index => {
            if (index === (this.heapContainer.length - 1)) {
                this.heapContainer.pop()
            } else {
                this.heapContainer[index] = this.heapContainer.pop()
                const parentItem = this.parent(index)
                if (
                    this.hasLeftChild(index)
                    && (!parentItem || this.pairIsInCorrectOrder(
                        parentItem,
                        this.heapContainer[index]
                    ))
                ) {
                    this.heapifyDown(index)
                } else {
                    this.heapifyUp(index)
                }
            }
        })
        return this
    }
    find(item) {
        const foundItemIndices = [];
        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (item === this.heapContainer[itemIndex]) {
                foundItemIndices.push(itemIndex);
            }
        }
        return foundItemIndices;
    }
    isEmpty() {
        return !Boolean(this.heapContainer.length)
    }
}

class MinHeap extends Heap {
    pairIsInCorrectOrder(a, b) {
        return Boolean(a <= b)
    }
}

class MaxHeap extends Heap {
    pairIsInCorrectOrder(a, b) {
        return Boolean(a >= b)
    }
}

exports.MinHeap = MinHeap
exports.MaxHeap = MaxHeap