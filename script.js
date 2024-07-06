'use strict';
let playing = true; //the game is going
let player = 0;
let diceNumber;

const rollBtn = document.querySelector('.btn--roll');
const currentScore = document.querySelectorAll('.current-score');
// or const currentScore1 = document.getElementById('score--0'); ...used to select IDs instead of querySelector (NO NEED TO USE #)
const hold = document.querySelector('.btn--hold');
const score = document.querySelectorAll('.score'); //or we can use IDs here instead of the common class
const players = document.querySelectorAll('.player'); //also here we can use IDs instead
const diceEl = document.querySelector('.dice');
const reset = document.querySelector('.btn--new');

score[0].textContent = score[1].textContent = 0;
diceEl.classList.add('hidden');

console.log(score);

function switching(i, j) {
  if (diceNumber !== 1) {
    score[i].textContent =
      Number(score[i].textContent) + Number(currentScore[i].textContent);
    winning(player);
  }

  currentScore[i].textContent = 0; //or document.getElementById(`current--${player}`).textContent
  player = j;
  players[i].classList.remove('player--active'); // or classList.toggle
  players[j].classList.add('player--active'); // or classList.toggle
}

function switchActive() {
  if (player === 0) {
    switching(0, 1);
  } else if (player === 1) {
    switching(1, 0);
  }
  diceEl.classList.add('hidden');
}
function addingToCurrent(i) {
  if (diceNumber !== 1)
    currentScore[i].textContent =
      Number(currentScore[i].textContent) + diceNumber;
}

rollBtn.addEventListener('click', function () {
  if (playing) {
    console.log('dice is rolled');
    console.log(currentScore);
    diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceNumber}.png`; // manipulating the src attribute of an elemnt with javascript
    diceEl.classList.remove('hidden');

    player === 0 ? addingToCurrent(0) : addingToCurrent(1);
    if (diceNumber === 1) switchActive();
  }
});

hold.addEventListener('click', function () {
  if (playing) switchActive();
});

function winning(i) {
  if (Number(score[i].textContent) >= 100) {
    players[i].classList.add('player--winner');
    players[i].classList.remove('player--active');
    playing = false; //the game is over
  }
}

reset.addEventListener('click', function () {
  playing = true;
  player = 0;
  diceEl.classList.add('.hidden');
  score[0].textContent = score[1].textContent = 0;
  currentScore[0].textContent = currentScore[1].textContent = 0;
  players[0].classList.add('player--active');
  players[1].classList.remove('player--active');
  for (let i = 0; i < players.length; i++) {
    players[i].classList.remove('player--winner');
  }
});
//or we can declare an initliaization function called when resseting & also  at the start of code
