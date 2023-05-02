class Bord {

  constructor(x = 10, y = 10) {
    let borderClassName = 'border',
    rootElmSelector = '#game-place',
    gameObjects = createGamePlace();

    this.table = gameObjects.table;
    this.border = gameObjects.border;
    this.fields = gameObjects.fields;
    this.button = gameObjects.button;
    this.gameStarted = false;
    this.score = 0;

    setCoordinates(this.fields, x, y);

    function createGamePlace() {
      let rootElm = document.querySelector(rootElmSelector),
        table,
        border,
        fields,
        controls,
        button,
        score;

      controls = rootElm.appendChild(createControlsPlace());
      border = rootElm.appendChild(createBorder());
      fields = createFields(border, x, y);
      button = controls.appendChild(createGameButton());
      table = controls.appendChild(createScoreTable());

      return {table, border, fields, button};
    }

    function createBorder() {
      let border;

      border = document.createElement('div');
      border.classList.add(borderClassName);

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

    function createControlsPlace() {
      let controls = document.createElement('div');

      controls.classList.add('game-controls');

      return controls;
    }

    function createGameButton() {
      let button = document.createElement('button');

      button.setAttribute('type', 'button');
      button.setAttribute('id', 'game-control');
      button.innerHTML = 'Начать';
      button.classList.add('game-button');

      return button;
    }

    function createScoreTable() {
      let table = document.createElement('div');

      table.classList.add('score-table');
      table.innerHTML = '0';

      return table;
    }

    function setCoordinates(fields, x, y) {
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

    this.snake = new Snake(3, this);
    this.food = new Food(this);
  }

  addScore() {
    this.score += 1;
    window.console.log(this.score);
    this.table.innerHTML = this.score;
  }

  buttonActions() {
    if (this.gameStarted) {
      this.pauseGame();
    }
    else {
      this.startGame();
    }

    this.gameStarted = !this.gameStarted;
  }

  startGame() {
      this.game = setInterval(() => this.snake.move(),500);
      this.button.innerHTML = 'Пауза';
  }

  pauseGame() {
    this.button.innerHTML = 'Продолжить';
    clearInterval(this.game)
  }

  endGame() {
    alert (`Игра окончена. Вы набрали: ${this.score}`);
    clearInterval(this.game);
  }

  eat() {
    this.food.eat();
    this.addScore()
  }
}
