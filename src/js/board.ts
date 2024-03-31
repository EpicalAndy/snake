import { Snake } from './snake.js'
import { Food } from './food.js'
export class Board {
  table: any;
  elm: any;
  border: any;
  fields: any;
  button: any;
  gameStarted: boolean;
  score: number;
  snake: any;
  food: any;
  game: any;

  constructor(x = 10, y = 10) {
    const rootElmSelector = '#game-place';
    this.elm = document.querySelector(rootElmSelector);
    const gameObjects = this.createGamePlace(x, y);

    this.table = gameObjects.table;
    this.border = gameObjects.border;
    this.fields = gameObjects.fields;
    this.button = gameObjects.button;
    this.gameStarted = false;
    this.score = 0;

    this.setCoordinates(this.fields, x, y);

    this.snake = new Snake(3, this);
    this.food = new Food(this);
  }

  createBorder() {
    let border;
    const borderClassName = 'border';

    border = document.createElement('div');
    border.classList.add(borderClassName);

    return border;
  }

  createGamePlace(x: number, y: number) {
    let rootElm = this.elm,
      table,
      border,
      fields,
      controls,
      button,
      score;

    controls = rootElm.appendChild(this.createControlsPlace());
    border = rootElm.appendChild(this.createBorder());
    fields = this.createFields(border, x, y);
    button = controls.appendChild(this.createGameButton());
    table = controls.appendChild(this.createScoreTable());

    return { table, border, fields, button };
  }

  createFields(border: any, x: number, y: number) {
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

  createControlsPlace() {
    let controls = document.createElement('div');

    controls.classList.add('game-controls');

    return controls;
  }

  createGameButton() {
    let button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.setAttribute('id', 'game-control');
    button.innerHTML = 'Начать';
    button.classList.add('game-button');

    return button;
  }

  createScoreTable() {
    let table = document.createElement('div');

    table.classList.add('score-table');
    table.innerHTML = '0';

    return table;
  }

  setCoordinates(fields: any, x: number, y: number) {
    let i = fields.length,
      curX,
      curY;

    while (i--) {
      curX = ((+i + 1) % +x) || 10;
      curY = +Math.trunc((+i) / +y) + 1;
      // window.console.log(`i = ${i}; y = ${y}; curX = ${+i % +y}`);

      fields[i].setAttribute('posX', curX);
      fields[i].setAttribute('posY', curY);
    }
  }

  addScore() {
    this.score += 1;
    window.console.log(this.score);
    this.table.innerHTML = this.score;
  }

  buttonActions() {
    if (this.gameStarted) {
      this.pauseGame();
    } else {
      this.startGame();
    }

    this.gameStarted = !this.gameStarted;
  }

  startGame() {
    this.game = setInterval(() => this.snake.move(), 500);
    this.button.innerHTML = 'Пауза';
  }

  pauseGame() {
    this.button.innerHTML = 'Продолжить';
    clearInterval(this.game)
  }

  endGame() {
    new Dialog({
      rootElm: this.elm,
      showCloseButton: true,
      title: 'Игра окончена',
      body: `Набрано очков: ${this.score}`
    });

    this.button.disabled = true;
    clearInterval(this.game);
  }

  eat() {
    this.food.eat();
    this.addScore()
  }
}
