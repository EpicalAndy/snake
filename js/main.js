class Bord {

  constructor(x = 10, y = 10) {

    this.border = createBorder();
    this.fields = createFields(this.border, x, y);

    setCoordinates(this.fields, x, y);

    function createBorder() {
      let border;

      border = document.createElement('div');
      border.classList.add('border');

      document.body.appendChild(border);

      return border;
    }

    function createFields(border, x, y) {
      let i = x * y,
        field,
        fields = [];

      while (i--) {

        field = document.createElement('div');
        field.classList.add('field');

        border.appendChild(field);

        fields.push(field);
      }
      return fields;
    }

    function setCoordinates(fields, x, y) {
      let i = fields.length,
        curX,
        curY;

      while (i--) {
        curX = ((+i + 1) % +x) || 10;
        curY = +Math.trunc((+i) / +y) + 1;
        window.console.log(`i = ${i}; y = ${y}; curX = ${+i % +y}`);

        fields[i].setAttribute('posX', curX);
        fields[i].setAttribute('posY', curY);
      }
    }

    this.snake = new Snake(3);
    this.food = new Food();
  }

  startGame() {
      setInterval(() => this.snake.move(),500);
  }
}

class Snake extends Bord{

  constructor(snakeLength) {
    let posX = Math.round((Math.random() * (10 - snakeLength)) + snakeLength),
      posY = Math.round((Math.random() * (10 - snakeLength)) + 1);

    super();

    this.direction = 'r';

    this.snakeBody = {
      head: document.querySelector(`[posX = "${posX}"][posY = "${posY}"]`),
      tail: []
    };

    for (let i = snakeLength - 1, k = 1; k <= i; k++) {
      this.snakeBody.tail.push(document.querySelector(`[posX = "${posX - k}"][posY = "${posY}"]`))
    }

    this.snakeBody.head.classList.add('snake-head', 'snake-body');

    for (let i = this.snakeBody.tail.length; i--;) {
      this.snakeBody.tail[i].classList.add('snake-tail', 'snake-body');
    }

    window.console.log(`posX = ${posX}; posY = ${posY}; snakeBody.tail = ${this.snakeBody.tail.length}`);

    this.listenerDirection();
    // this.setSnakeDirection(this.getSnakeDirection());
  }

  listenerDirection() {
    window.addEventListener('keydown', this.getSnakeDirection.bind(this));
  }

  // Определяет направление движения змеи по нажатию клавиш. Запрещено движение в противоположном направлении
  getSnakeDirection(e) {
      window.console.log(`e.code = ${e.code}; e.code = ${e.keyCode}`);
      switch (e.keyCode) {
        // left
        case 37:
          if (this.direction !== 'r') {
            this.direction = 'l';
          }
          break;

        // up
        case 38:
          if (this.direction !== 'd') {
            this.direction = 'u';
          }
          break;

        // right
        case 39:
          if (this.direction !== 'l') {
            this.direction = 'r';
          }
          break;

        // down
        case 40:
          if (this.direction !== 'u') {
            this.direction = 'd';
          }
      }
  }

  // TODO Метод выглядит ужасно! Нужно от рефакторить!!!!
  move() {
    let newTail = document.querySelector('.snake-head'),
      oldHeadPos = {x: null, y: null},
      newHeadPos = {x: null, y: null},
      newHead;

    oldHeadPos.x = +this.snakeBody.head.getAttribute('posX');
    oldHeadPos.y = +this.snakeBody.head.getAttribute('posy');

    if (this.direction === 'r') {
      newHeadPos.x = oldHeadPos.x % 10 + 1;
      newHeadPos.y = oldHeadPos.y;
    }

    if (this.direction === 'l') {
      newHeadPos.x = (oldHeadPos.x - 1) || 10;
      newHeadPos.y = (oldHeadPos.y);
    }

    if (this.direction === 'u') {
      newHeadPos.x = oldHeadPos.x;
      newHeadPos.y = (oldHeadPos.y - 1) || 10;
    }

    if (this.direction === 'd') {
      newHeadPos.x = oldHeadPos.x;
      newHeadPos.y = oldHeadPos.y  % 10 + 1;
    }

      newTail.classList.remove('snake-head', 'snake-body');
      newTail.classList.add('snake-tail');
      this.snakeBody.tail.unshift(newTail);

      this.snakeBody.tail[this.snakeBody.tail.length - 1].classList.remove('snake-tail', 'snake-body');
      this.snakeBody.tail.pop();

      newHead = this.snakeBody.head = document.querySelector(`[posX = "${newHeadPos.x}"][posY = "${newHeadPos.y}"]`);
      newHead.classList.add('snake-body', 'snake-head');

      this.eatFood(newHead)

  }

  eatFood(snakeHead) {
    if (snakeHead && snakeHead.classList.contains('food')) {
      alert('Eat!');
      // this.food.removeFood();
    }
  }

  rotateHead() {

  }
}

class Food extends Bord{
  constructor() {
    let posX,
      posY,
      coordinates;

    super();

    for (let i = 100; i--;) {
      coordinates = generateCoordinates();
      this.food = document.querySelector(`[posX = "${coordinates.posX}"][posY = "${coordinates.posY}"]`);

      if (this.food.classList.contains('snake-body')) {
        continue;
      }

      this.food.classList.add('food');
      break;
    }

    function generateCoordinates() {
      posX = Math.round((Math.random() * (9)) + 1);
      posY = Math.round((Math.random() * (9)) + 1);

      return {posX, posY};
    }
  }

  removeFood() {
    this.food.classList.remove('food');
  }
}