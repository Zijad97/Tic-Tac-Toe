"use strict";
const x = document.getElementById("x");
const o = document.getElementById("o");
const reset = document.getElementById("reset");
const fields = Array.from(document.getElementsByClassName("field"));
let board = ["", "", "", "", "", "", "", "", ""];
let initialPlayer = "X";
let currentPlayer = initialPlayer;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function fill(field, idx) {
  field.classList.remove("playerX");
  field.classList.remove("playerO");
  field.textContent = currentPlayer;
  board[idx] = currentPlayer;
  field.classList.add(`player${currentPlayer}`);
  field.disabled = true;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
function check() {
  let winner;
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" && b === "" && c === "") continue;
    if (a === b && c === b) {
      roundWon = true;
      winner = a;
      break;
    }
  }
  if (roundWon === true) {
    if (winner === "X") x.textContent++;
    if (winner === "O") o.textContent++;
    gameOver(true);
  }
}
function gameOver(status) {
  fields.forEach((field) => {
    field.disabled = status;
  });
}
fields.forEach((field, idx) => {
  field.addEventListener("click", function () {
    fill(field, idx);
    check();
  });
});
reset.addEventListener("click", function () {
  board = ["", "", "", "", "", "", "", "", ""];
  initialPlayer = initialPlayer === "X" ? "O" : "X";
  currentPlayer = initialPlayer;
  gameOver(false);
  fields.forEach((field) => {
    field.textContent = "";
  });
});
