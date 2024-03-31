/*jslint
    es6
*/

const colors = [ 'red', 'blue', 'green', 'aliceblue', 'orange', 'lime', 'purple', 'yellow', 'lightcoral', 'gray' ];

export class Food {
  border: any;
  color: string;
  food: any;
  constructor(context: any) {
    this.border = context;
    this.color = '';

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
      this.color = this.getRandomColor();
      this.food.style.backgroundColor = this.color;
      break;
    }

    function generateCoordinates() {
      posX = Math.round((Math.random() * (9)) + 1);
      posY = Math.round((Math.random() * (9)) + 1);

      return { posX, posY };
    }
  }

  getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
  }

  eat() {
    this.food.classList.remove('food');
    this.food.style.backgroundColor = '';

    this.createFood();
  }
}
