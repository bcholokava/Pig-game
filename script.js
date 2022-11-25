"use strict";

// Selecting Elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const current0EL = document.querySelector("#current--0");
const current1EL = document.querySelector("#current--1");
const diceEL = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--actove");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};
// let activePlayer1 = 1;

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1) Generating a random Dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2) Display the dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // 3) Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0EL.textContent = currentScore; // CHANANGE LATER
    } else {
      //Switch to next Player
      switchPlayer();
    }
  }
});

//  User Holds score
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1) Add curent score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    //   scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2) Check if players is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switching the players
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
