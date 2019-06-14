let border = new Bord();


function runGame() {
  let button = document.getElementById('game-control');

  button.addEventListener('click', function () {
      border.startGame();
  })
}

runGame();