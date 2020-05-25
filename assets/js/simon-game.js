$(document).ready(function() {

  const topRight = document.querySelector('#top-right');
  const bottomRight = document.querySelector('#bottom-right');
  const bottomLeft = document.querySelector('#bottom-left');
  const topLeft = document.querySelector('#top-left');
  const countButton = document.querySelector('#count');
  const startButton = document.querySelector('#start');
  const strictButton = document.querySelector('#strict');
  const onButton = document.querySelector('#on');

  //game namespace/scope
  var game = {
    strict: false,
    on: true,
    level: 0,
    gameSeq: [],
    playerSeq: [],


    init: function() {
      strictButton.addEventListener('click', game.strictButtonSelection);
      onButton.addEventListener('click', game.onButtonSelection);
      startButton.addEventListener('click', game.startButtonSelection);
      countButton.innerHTML = game.level;
    },

    // Event listener onButton selection
    onButtonSelection: function() {
      if (onButton.checked == true) {
        game.on = true;
      } else {
        game.on = false;
      }
    },

    // Event listener strictButton selection
    strictButtonSelection: function() {
      if (strictButton.checked == true) {
        game.strict = true;
      } else {
        game.strict = false;
      }
    },

    // Event listener startButton selection
    startButtonSelection: function() {
      if (game.on == true) {
        game.play();
      }
    },

    play: function() {
      game.resetGame();
      game.level++;
      countButton.innerHTML = game.level;

      for (var i = 0; i < 20; i++) {
        random = Math.floor(Math.random() * 4) + 1
        game.gameSeq.push(random);
      }
      console.log(game.gameSeq);
      console.log(game.level);
    },

    resetGame: function() {
      gameSeq = [];
      playerSeq = [];
      level = 0;
    }
  }

  game.init();

});
