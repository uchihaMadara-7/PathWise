class minHeap {
    constructor() {
        /* array to maintain heap properties */
        this.heap = []
    }

    /* function to maintain heap properties when adding element at the end */
    heapifyUp() {
        let currentIndex = this.heap.length - 1;

        /* start from the last element added, go up the tree to maintain min-heap property */
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            /* if parent is larger, swap the current and parent */
            if (this.heap[currentIndex] < this.heap[parentIndex]) {
                [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
                currentIndex = parentIndex;
            }
            /* break if the min-heap property holds good */
            else break;
        }
    }

    /* function to maintain heap properties when adding element at the top */
    heapifyDown() {
        let currentIndex = 0;

        /* start from the top element, go down the tree to maintain min-heap property */
        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestIndex = currentIndex;

            /* if left child is small, mark it as smallest */
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftChildIndex;
            }

            /* if rigt child is small, mark it as smallest */
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightChildIndex;
            }

            /* if the current is still smallest, then break - property is maintained */
            if (currentIndex === smallestIndex) break;

            /* swap with smallest element and make current as smallest */
            [this.heap[smallestIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[smallestIndex]];
            currentIndex = smallestIndex;
        }
    }

    /* add element to heap */
    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    /* remove element from min-heap - smallest element */
    pop() {
        if (this.heap.length === 0) return null;

        const minValue = this.heap[0];
        const lastValue = this.heap.pop();

        /* if more than one element after removing last */
        if (this.heap.length > 1) {
            /* set element at top and do heapifyDown to maintain min-heap */
            this.heap[0] = lastValue;
            this.heapifyDown();
        }

        return minValue;
    }
}

export default minHeap;