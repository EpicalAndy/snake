let lastOrderNumber = 0;
export class SnakeTail {
  tail: Array<any> = [];

  constructor() {

  }

  addTail(data: any) {
    this.tail.push({
      order: this.getNextOrderNumber(),
      color: data.color
    })
  }
  getNextOrderNumber() {
    lastOrderNumber += 1;

    return lastOrderNumber;
  }
}