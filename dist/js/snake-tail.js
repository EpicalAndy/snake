let lastOrderNumber = 0;
export class SnakeTail {
    constructor() {
        this.tail = [];
    }
    addTail(data) {
        this.tail.push(new TailPart({
            order: this.getNextOrderNumber(),
            color: data.color
        }));
        console.log(this.tail);
    }
    getNextOrderNumber() {
        lastOrderNumber += 1;
        return lastOrderNumber;
    }
}
class TailPart {
    constructor(data) {
        this.order = data.order;
        this.color = data.color;
    }
}
