$(document).ready(function() {

  const title = document.querySelector('.title');
  const topRight = document.getElementById('topRight');
  const bottomRight = document.getElementById('bottomRight');
  const bottomLeft = document.getElementById('bottomLeft');
  const topLeft = document.getElementById('topLeft');
  const countButton = document.querySelector('#count');
  const startButton = document.querySelector('#start');
  const strictButton = document.querySelector('#strict');
  const onButton = document.querySelector('#on');
  const muteButton = document.querySelector('#mute');
  const sound1 = document.getElementById('sound1');
  const sound2 = document.getElementById('sound2');
  const sound3 = document.getElementById('sound3');
  const sound4 = document.getElementById('sound4');
  const error = document.getElementById('error');
  const blue = "#00006e";
  const red = "#6c0101";
  const yellow = "#a37400";
  const green = "#005900";
  const darkyellow = "#d29600";

  //game namespace/scope
  let game = {
    strict: false,
    on: false,
    mute: false,
    level: 0,
    gameSequence: [],
    playerSequence: [],
    flash: 0,
    computerRound: false,
    win: false,
    matched: false,

    init: function() {
      title.innerHTML = "SIMON";
      startButton.innerHTML = "START";
      topRight.addEventListener("click", game.topRightSelection);
      bottomRight.addEventListener("click", game.bottomRightSelection);
      bottomLeft.addEventListener("click", game.bottomLeftSelection);
      topLeft.addEventListener("click", game.topLeftSelection);
      strictButton.addEventListener("click", game.strictButtonSelection);
      onButton.addEventListener("click", game.onButtonSelection);
      muteButton.addEventListener("click", game.muteButtonSelection);
      startButton.addEventListener("click", game.startButtonSelection);
    },

    // Event listener topRight selection
    topRightSelection: function() {
      if (game.on) {
        game.playerSequence.push(1);
        game.checkForMatch();
        game.one();
        if (!game.win) {
          setTimeout(() => {
            game.clearColor;
          }, 300);
        }
      }
    },

    // Event listener bottomRight selection
    bottomRightSelection: function() {
      if (game.on) {
        game.playerSequence.push(2);
        game.checkForMatch();
        game.two();
        if (!game.win) {
          setTimeout(() => {
            game.clearColor;
          }, 300);
        }
      }
    },

    // Event listener bottomLeft selection
    bottomLeftSelection: function() {
      if (game.on) {
        game.playerSequence.push(3);
        game.checkForMatch();
        game.three();
        if (!game.win) {
          setTimeout(() => {
            game.clearColor;
          }, 300);
        }
      }
    },

    // Event listener topLeft selection
    topLeftSelection: function() {
      if (game.on) {
        game.playerSequence.push(4);
        game.checkForMatch();
        game.four();
        if (!game.win) {
          setTimeout(() => {
            game.clearColor;
          }, 300);
        }
      }
    },

    // Event listener onButton selection
    onButtonSelection: function() {
      if (onButton.checked) {
        game.on = true;
        countButton.innerHTML = "0";
      } else {
        game.on = false;
        countButton.innerHTML = "";
        game.clearColor();
        clearInterval(intervalId);
      }
    },

    // Event listener strictButton selection
    strictButtonSelection: function() {
      if (strictButton.checked) {
        game.strict = true;
      } else {
        game.strict = false;
      }
    },

    // Event listener muteButton selection
    muteButtonSelection: function() {
      if (muteButton.checked) {
        game.mute = true;
      } else {
        game.mute = false;
      }
    },

    // Event listener startButton selection
    startButtonSelection: function() {
      if (game.on || game.win) {
        game.play();
      }
    },

    // Starts the game
    play: function() {
      game.resetGame();
      game.level++;
      countButton.innerHTML = game.level;
      game.flash = 0;
      game.win = false;
      game.matched = true;

      for (let i = 0; i < 20; i++) {
        random = Math.floor(Math.random() * 4) + 1;
        game.gameSequence.push(random);
      }

      game.computerRound = true;
      intervalId = setInterval(game.gameRound, 800);
    },

    // Reset the game
    resetGame: function() {
      game.gameSequence = [];
      game.playerSequence = [];
      game.level = 0;
    },

    // Instructions if computer round or player round
    gameRound: function() {
      game.on = false;
      if (game.flash === game.level) {
        clearInterval(intervalId);
        game.computerRound = false;
        game.clearColor();
        game.on = true;
      }

      if (game.computerRound) {
        game.clearColor();
        setTimeout(() => {
          if (game.gameSequence[game.flash] === 1) game.one();
          if (game.gameSequence[game.flash] === 2) game.two();
          if (game.gameSequence[game.flash] === 3) game.three();
          if (game.gameSequence[game.flash] === 4) game.four();
          game.flash++;
        }, 200);
      }
    },

    // Light and sound if 1 in the game Sequence
    one: function() {
      if (!game.mute) {
        sound1.play();
      }
      topRight.style.backgroundColor = "darkblue";
    },

    // Light and sound if 2 in the game Sequence
    two: function() {
      if (!game.mute) {
        sound2.play();
      }
      bottomRight.style.backgroundColor = darkyellow;
    },

    // Light and sound if 3 in the game Sequence
    three: function() {
      if (!game.mute) {
        sound3.play();
      }
      bottomLeft.style.backgroundColor = "darkred";
    },

    // Light and sound if 4 in the game Sequence
    four: function() {
      if (!game.mute) {
        sound4.play();
      }
      topLeft.style.backgroundColor = "darkgreen";
    },

    // Clear initial colors
    clearColor: function() {
      topRight.style.backgroundColor = blue;
      bottomRight.style.backgroundColor = yellow;
      bottomLeft.style.backgroundColor = red;
      topLeft.style.backgroundColor = green;
    },

    // Flash colors
    flashColor: function() {
      topRight.style.backgroundColor = "darkblue";
      bottomRight.style.backgroundColor = darkyellow;
      bottomLeft.style.backgroundColor = "darkred";
      topLeft.style.backgroundColor = "darkgreen";
    },

    // Matched is true is the player has everything correct and false if the player selected something wrong
    checkForMatch: function() {
      if (game.gameSequence[game.playerSequence.length - 1] !== game.playerSequence[game.playerSequence.length - 1]) {
        game.matched = false;
      }

      if (game.playerSequence.length === 3 && game.matched) {
        game.winGame();
      }

      if (game.matched === false) {
        game.flashColor();
        countButton.innerHTML = "NO";
        setTimeout(() => {
          if (!game.mute) {
            error.play();
          }
        }, 500);

        setTimeout(() => {
          countButton.innerHTML = game.level;
          game.clearColor();

          if (game.strict) {
            game.play();
          } else {
            game.playerSequence = [];
            game.computerRound = true;
            game.matched = true;
            game.flash = 0;
            countButton.innerHTML = game.level;
            intervalId = setInterval(game.gameRound, 800);
          }
        }, 1100);
      }

      if (game.level === game.playerSequence.length && game.matched && !game.win) {
        game.level++;
        game.playerSequence = [];
        game.computerRound = true;
        game.flash = 0;
        countButton.innerHTML = game.level;
        intervalId = setInterval(game.gameRound, 800);
      }
    },

    // Play the computer sequence
    playComputerSequence: function() {
      game.playerSequence = [];
      game.computerRound = true;
      game.flash = 0;
      countButton.innerHTML = game.level;
      intervalId = setInterval(game.gameRound, 800);
    },

    // Win the game
    winGame: function() {
      game.flashColor();
      countButton.innerHTML = "WIN";
      game.on = false;
      game.win = true;
    },
  };

  game.init();

});
