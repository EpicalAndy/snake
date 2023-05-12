let border = new Board();

function runGame() {
  let button = document.getElementById('game-control');

  button.addEventListener('click', function () {
      border.buttonActions();
  })
}

runGame();
