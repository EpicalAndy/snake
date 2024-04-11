let lastOrderNumber = 0;
export class SnakeTail {
  tail: Array<TailPart> = [];

  constructor() {
  }

  addTail(data: any) {
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
  order: number;
  color: string
  constructor(data: ITailPart) {
    this.order = data.order;
    this.color = data.color
  }
}

interface ITailPart {
  order: number,
  color: string
}