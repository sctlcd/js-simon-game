$(document).ready(function() {

  const topRight = document.getElementById('topRight');
  const bottomRight = document.getElementById('bottomRight');
  const bottomLeft = document.getElementById('bottomLeft');
  const topLeft = document.getElementById('topLeft');
  const countButton = document.querySelector('#count');
  const startButton = document.querySelector('#start');
  const strictButton = document.querySelector('#strict');
  const onButton = document.querySelector('#on');
  const sound1 = document.getElementById('sound1');
  const sound2 = document.getElementById('sound2');
  const sound3 = document.getElementById('sound3');
  const sound4 = document.getElementById('sound4');

  //game namespace/scope
  let game = {
    strict: false,
    on: false,
    level: 0,
    gameSequence: [],
    playerSequence: [],
    flash: 0,
    computerRound: false,
    mute: false,
    win: false,
    matched: false,

    init: function() {
      // topRight.addEventListener('click', (event) => {
      // });

      topRight.addEventListener('click', game.topRightSelection);
      bottomRight.addEventListener('click', game.bottomRightSelection);
      bottomLeft.addEventListener('click', game.bottomLeftSelection);
      topLeft.addEventListener('click', game.topLeftSelection);
      strictButton.addEventListener('click', game.strictButtonSelection);
      onButton.addEventListener('click', game.onButtonSelection);
      startButton.addEventListener('click', game.startButtonSelection);
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
      if (onButton.checked === true) {
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
      if (strictButton.checked === true) {
        game.strict = true;
      } else {
        game.strict = false;
      }
    },

    // Event listener startButton selection
    startButtonSelection: function() {
      if (game.on || game.win) {
        game.play();
      }
    },

    // The game starts
    play: function() {
      game.resetGame();
      game.level++;
      countButton.innerHTML = game.level;
      game.flash = 0;
      game.win = false;
      game.matched = true;

      for (let i = 0; i < 20; i++) {
        random = Math.floor(Math.random() * 4) + 1
        game.gameSequence.push(random);
      }

      game.computerRound = true;
      intervalId = setInterval(game.gameRound, 1000);
      console.log("game.gameSequence: " + game.gameSequence);
      console.log("game.level: " + game.level);
    },

    // Reset the game
    resetGame: function() {
      game.gameSequence = [];
      game.playerSeq = [];
      game.level = 0;
    },

    // Instructions if computer round or player round
    gameRound: function() {

      game.on = false;
      if (game.flash === game.level){
        clearInterval(intervalId);
        game.computerRound = false;
        game.clearColor();
        game.on = true;
      }

      if (game.computerRound){
        game.clearColor();
        setTimeout( () => {
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
        game.mute = false;
        topRight.style.backgroundColor = "blue";
      },

      two: function() {
        if (!game.mute) {
          sound2.play();
        }
        game.mute = false;
        bottomRight.style.backgroundColor = "yellow";
      },

      three: function() {
        if (!game.mute) {
          sound3.play();
        }
        game.mute = false;
        bottomLeft.style.backgroundColor = "red";
      },

      four: function() {
        if (!game.mute) {
          sound4.play();
        }
        game.mute = false;
        topLeft.style.backgroundColor = "green";
      },

      clearColor: function() {
        topRight.style.backgroundColor = "darkblue";
        bottomRight.style.backgroundColor = "goldenrod";
        bottomLeft.style.backgroundColor = "darkred";
        topLeft.style.backgroundColor = "darkgreen";
      },

      flashColor: function() {
        topRight.style.backgroundColor = "blue";
        bottomRight.style.backgroundColor = "yellow";
        bottomLeft.style.backgroundColor = "red";
        topLeft.style.backgroundColor = "green";
      },

      //
      // matched is true is the player has everything correct and false if the player selected something wrong
      checkForMatch: function() {
        if (game.gameSequence[game.playerSequence.length - 1] !== game.playerSequence[game.playerSequence.length - 1 ]){
          game.matched = false;
        }
          console.log("game.matched: " + game.matched);
          console.log("game.flash: " + game.flash);
          console.log("game.gameSequence[game.playerSequence.length - 1]: " + game.gameSequence[game.playerSequence.length - 1]);
          console.log("game.playerSequence[game.playerSequence.length - 1 ]: " + game.playerSequence[game.playerSequence.length - 1 ]);
          console.log("game.playerSequence.length: " + game.playerSequence.length)

        if (game.playerSequence.length === 3 && game.matched) {
          console.log("game.win:" + game.win);
          game.winGame();
        }

        if (game.matched === false) {
          game.flashColor();
          countButton.innerHTML= "NO";
          setTimeout( () => {
            countButton.innerHTML = game.level;
            game.clearColor();
          }, 800)
          game.mute = true;
        }

          if (game.level === game.playerSequence.length && game.matched && !game.win) {
            game.level++;
            game.playerSequence = [];
            game.computerRound = true;
            game.flash = 0;
            countButton.innerHTML = game.level;
            intervalId = setInterval(game.gameRound, 800);
            console.log("game.playerSequence: " + game.playerSequence)
            console.log("game.playerSequence.length:" + game.playerSequence.length);
            console.log("game.computerRound:" + game.computerRound);

          }
      },

      winGame: function() {
        game.flashColor();
        countButton.innerHTML = "WIN!";
        game.on = false;
        game.win = true;
      },


    }

  game.init();

});
