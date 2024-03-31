let lastOrderNumber = 0;
export class SnakeTail {
    constructor() {
        this.tail = [];
    }
    addTail(data) {
        this.tail.push({
            order: this.getNextOrderNumber(),
            color: data.color
        });
    }
    getNextOrderNumber() {
        lastOrderNumber += 1;
        return lastOrderNumber;
    }
}
