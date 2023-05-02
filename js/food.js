/*jslint
    es6
*/



class Food {
  constructor(context) {
    this.border = context;

    this.createFood();
  }

  createFood() {
    let posX,
      posY,
      coordinates;

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

  eat() {
    this.food.classList.remove('food');

    this.createFood();
  }
}
