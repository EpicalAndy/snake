import { Board } from "./board.js";

let border = new Board();

function runGame() {
  let button = document.getElementById('game-control');

  button && button.addEventListener('click', function () {
      border.buttonActions();
  });
}

runGame();
